// x402.js — the live x402 test counterparty on gsc-marketplace.ai (CEO order 2026-08-23)
// /x402            open door (machine-doc register): teaches x402, shows the exchange, the Nineteen
// /x402/resolve    the single paid endpoint: unpaid → HTTP 402 (x402 v2 payload; HTML twin on browser Accept)
//                  paid → verify + settle via facilitator → HTTP 200 signed receipt (Ed25519, estate receipt key)
// /x402/receipt/:nonce  durable receipt — JSON for machines, HTML for humans; the nonce is the claim ticket
// Terms live in the 402 payload only. The receive address comes from config (X402_PAY_TO) and appears
// nowhere else. No wallet-connect, no checkout UI — the agent pays.
import crypto from "node:crypto";
import { BlobServiceClient } from "@azure/storage-blob";
import { DefaultAzureCredential } from "@azure/identity";
import { OPERATOR, DUNS, HOSTS, DOORS, SURFACES, TOOL_NAMES } from "./canon.js";

const APEX = HOSTS.apex;
const CFG = {
  payTo: (process.env.X402_PAY_TO || "").trim(),                         // treasury receive address — config only
  facilitator: (process.env.X402_FACILITATOR_URL || "").trim().replace(/\/$/, ""),
  facilitatorAuth: (process.env.X402_FACILITATOR_AUTH || "").trim(),     // optional "Header: value" pairs, \n-separated
  network: "eip155:8453",                                                // Base mainnet
  asset: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",                  // USDC on Base (6 decimals)
  amount: "5000",                                                         // US$0.005 in USDC base units — the terms, payload only
  assetName: "USD Coin", assetVersion: "2",
  receiptsAccount: (process.env.X402_RECEIPTS_ACCOUNT || "stgscmarketplace").trim(),
  receiptsContainer: "x402-receipts",
  keyPem: process.env.X402_RECEIPT_KEY_PEM || "",                        // PKCS8 Ed25519, Container App secret
  kid: "gsc-x402-receipts-2026-08",
  jwkX: process.env.X402_RECEIPT_JWK_X || "ABCF0WWST1yxgYdAFrnoBWh_5-b4nxk3xFchTKtVTxc",
};
export const configured = () => Boolean(CFG.payTo && CFG.facilitator && CFG.keyPem);
const b64u = (b) => Buffer.from(b).toString("base64url");
const b64json = (o) => Buffer.from(JSON.stringify(o)).toString("base64");
const unb64json = (s) => JSON.parse(Buffer.from(s, "base64").toString("utf8"));

// ---------- receipt signing ----------
function signReceipt(body) {
  const key = crypto.createPrivateKey(CFG.keyPem);
  const sortDeep = (v) => Array.isArray(v) ? v.map(sortDeep) : (v && typeof v === "object") ? Object.fromEntries(Object.keys(v).sort().map((k) => [k, sortDeep(v[k])])) : v;
  const canon = JSON.stringify(sortDeep(body));
  return { alg: "EdDSA", kid: CFG.kid, canonicalization: "JSON sorted keys, no whitespace, UTF-8", value: b64u(crypto.sign(null, Buffer.from(canon, "utf8"), key)) };
}
export const jwks = () => ({ keys: [{ kty: "OKP", crv: "Ed25519", kid: CFG.kid, x: CFG.jwkX, use: "sig", alg: "EdDSA" }] });

// ---------- durable store (managed identity, no keys) ----------
let container = null;
function store() {
  if (container) return container;
  const svc = new BlobServiceClient(`https://${CFG.receiptsAccount}.blob.core.windows.net`, new DefaultAzureCredential());
  container = svc.getContainerClient(CFG.receiptsContainer); return container;
}
async function putReceipt(nonce, obj) { await store().getBlockBlobClient(`${nonce}.json`).upload(JSON.stringify(obj), Buffer.byteLength(JSON.stringify(obj)), { blobHTTPHeaders: { blobContentType: "application/json" } }); }
async function getReceipt(nonce) {
  try { const dl = await store().getBlockBlobClient(`${nonce}.json`).download(); const chunks = []; for await (const c of dl.readableStreamBody) chunks.push(c); return JSON.parse(Buffer.concat(chunks).toString("utf8")); }
  catch (e) { if (e.statusCode === 404) return null; throw e; }
}

// ---------- the 402 ----------
const resourceDesc = "x402 test counterparty — prove your payment stack end to end with a real settlement on Base.";
export function paymentRequired(url) {
  return { x402Version: 2, error: "PAYMENT-SIGNATURE header is required",
    resource: { url, description: resourceDesc, mimeType: "application/json" },
    accepts: [{ scheme: "exact", network: CFG.network, amount: CFG.amount, asset: CFG.asset, payTo: CFG.payTo, maxTimeoutSeconds: 60, extra: { assetTransferMethod: "eip3009", name: CFG.assetName, version: CFG.assetVersion } }],
    extensions: {} };
}
// Facilitator auth. The credential is "Header: value" lines, OR a CDP key pair as lines
// "CDP-API-KEY-ID: …" + "CDP-API-KEY-SECRET: …" — CDP's facilitator takes a per-request JWT (2-minute life), minted here.
function authLines() { const m = {}; for (const line of CFG.facilitatorAuth.replace(/\n/g, "\n").split("\n")) { const k = line.indexOf(":"); if (k > 0) m[line.slice(0, k).trim()] = line.slice(k + 1).trim(); } return m; }
function cdpJwt(method, path) {
  // CDP key pair: either lines "CDP-API-KEY-ID"/"CDP-API-KEY-SECRET" inside the credential, or the bare secret as the credential plus X402_FACILITATOR_KEY_ID.
  const m = authLines(); const bare = CFG.facilitatorAuth.indexOf(":") < 0 ? CFG.facilitatorAuth : "";
  const id = m["CDP-API-KEY-ID"] || (process.env.X402_FACILITATOR_KEY_ID || "").trim(), secret = m["CDP-API-KEY-SECRET"] || bare; if (!id || !secret) return null;
  const u = new URL(CFG.facilitator); const now = Math.floor(Date.now() / 1000);
  const claims = { sub: id, iss: "cdp", aud: ["cdp_service"], nbf: now, exp: now + 120, uris: [`${method} ${u.host}${u.pathname}${path}`] };
  let key, alg, opts = {};
  const pem = secret.replace(/\n/g, "\n");
  if (/BEGIN (EC )?PRIVATE KEY/.test(pem)) { key = crypto.createPrivateKey(pem); alg = "ES256"; opts = { dsaEncoding: "ieee-p1363" }; }
  else { const raw = Buffer.from(secret, "base64"); const seed = raw.length === 64 ? raw.subarray(0, 32) : raw; key = crypto.createPrivateKey({ key: Buffer.concat([Buffer.from("302e020100300506032b657004220420", "hex"), seed]), format: "der", type: "pkcs8" }); alg = "EdDSA"; }
  const header = { alg, kid: id, typ: "JWT", nonce: crypto.randomBytes(16).toString("hex") };
  const signing = `${b64u(JSON.stringify(header))}.${b64u(JSON.stringify(claims))}`;
  const sig = alg === "ES256" ? crypto.sign("sha256", Buffer.from(signing), { key, ...opts }) : crypto.sign(null, Buffer.from(signing), key);
  return `${signing}.${b64u(sig)}`;
}
// Example terms for the door copy: the live payload minus the receive address (payTo lives in the 402 payload only).
function exampleTerms(url) { const pr = paymentRequired(url); pr.accepts = pr.accepts.map(({ payTo, ...rest }) => rest); return pr; }
function facHeaders(method = "POST", path = "") {
  const h = { "Content-Type": "application/json" };
  const jwt = cdpJwt(method, path);
  if (jwt) h["Authorization"] = `Bearer ${jwt}`; else for (const [k, v] of Object.entries(authLines())) h[k] = v;
  return h;
}
// Cached structural probe of the facilitator — reachable, and does it speak Base mainnet. No values exposed.
let facProbe = { checked_at: null };
export async function facilitatorState(force = false) {
  if (!configured()) return { state: "staged" };
  if (!force && facProbe.checked_at && Date.now() - Date.parse(facProbe.checked_at) < 300000) return facProbe;
  const mode = cdpJwt("GET", "/supported") ? "cdp-jwt" : "static-headers";
  const rawLines = CFG.facilitatorAuth.replace(/\n/g, "\n").split("\n").filter((l) => l.trim());
  const shape = { key_id_env_set: Boolean((process.env.X402_FACILITATOR_KEY_ID || "").trim()), lines: rawLines.length, header_names: rawLines.filter((l) => l.indexOf(":") > 0).map((l) => l.slice(0, l.indexOf(":")).trim()), colonless_lines: rawLines.filter((l) => l.indexOf(":") <= 0).map((l) => `${l.trim().length} chars`), url: CFG.facilitator };
  try {
    const r = await fetch(`${CFG.facilitator}/supported`, { method: "GET", headers: facHeaders("GET", "/supported"), signal: AbortSignal.timeout(20000) });
    const text = await r.text(); let j = {}; try { j = JSON.parse(text); } catch {}
    const kinds = Array.isArray(j.kinds) ? j.kinds : [];
    facProbe = { checked_at: new Date().toISOString(), reachable: r.status === 200, status: r.status, base_mainnet: kinds.some((k) => k.network === CFG.network && k.scheme === "exact"), mode, credential_shape: shape, networks: [...new Set(kinds.map((k) => k.network))].sort(), detail: r.status === 200 ? undefined : text.slice(0, 160) };
  } catch (e) { facProbe = { checked_at: new Date().toISOString(), reachable: false, status: null, base_mainnet: false, mode, credential_shape: shape, error: String(e.message || e).slice(0, 100) }; }
  return facProbe;
}
async function facilitator(path, body) {
  const r = await fetch(`${CFG.facilitator}${path}`, { method: "POST", headers: facHeaders("POST", path), body: JSON.stringify(body), signal: AbortSignal.timeout(45000) });
  const text = await r.text(); let j = null; try { j = JSON.parse(text); } catch { j = { raw: text.slice(0, 400) }; }
  return { status: r.status, body: j };
}

const nextSteps = (host) => ({
  agent_card: `https://${host}/.well-known/agent-card.json`,
  instant_messaging: { lane: "agents", declared: "x-gsc-inbound", inbound: DOORS.instant_messaging.inbound, mcp: DOORS.instant_messaging.mcp },
  trading_desk: { lane: "humans", name: DOORS.trading_desk.name, url: DOORS.trading_desk.url },
  surfaces: Object.fromEntries(Object.values(SURFACES).map((s) => [s.role, s.url])),
  marketplace_mcp: { url: `https://${HOSTS.mcp}/mcp`, tools: TOOL_NAMES },
});

// ---------- IA-MESSAGE on settlement (transaction MCP, submit_rfq — the desk's read-only row) ----------
async function emitSettlementMessage(receipt) {
  const args = { subject: `x402-settlement · ${receipt.nonce}`, details: JSON.stringify({ type: "x402-settlement", timestamp: receipt.timestamp, amount: receipt.amount, asset: receipt.asset, network: receipt.network, payer: receipt.payer, tx_hash: receipt.tx_hash, nonce: receipt.nonce, receipt_url: receipt.receipt_url }, null, 2),
    requester_name: `x402 payer ${receipt.payer}`, requester_contact: receipt.receipt_url, market: "FR" };
  try {
    const r = await fetch(DOORS.instant_messaging.mcp, { method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json, text/event-stream" }, body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "tools/call", params: { name: "submit_rfq", arguments: args } }), signal: AbortSignal.timeout(20000) });
    const t = await r.text(); const m = t.match(/HITL-\d{8}-[A-F0-9]{6}/); return m ? m[0] : null;
  } catch { return null; }
}

// ---------- HTML twins (machine-doc register) ----------
const CSS = `*{margin:0;padding:0;box-sizing:border-box}body{background:#faf8f3;color:#1a1a1a;font:16px/1.6 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;-webkit-font-smoothing:antialiased}.container{max-width:900px;margin:0 auto;padding:32px 24px 96px}.topbar{font-size:12px;color:#6b6b6b;letter-spacing:.04em;margin-bottom:14px}.eyebrow{text-transform:uppercase;letter-spacing:.14em;color:#6b6b6b;font-size:11px;font-weight:600;margin:0 0 10px}h1{font:700 28px/1.2 ui-monospace,SFMono-Regular,Menlo,monospace;margin:0 0 4px}h1 .host{display:block;font-size:14px;color:#c84a1e;font-weight:600;margin-top:6px}.badge{display:inline-block;font:700 11px/1 ui-monospace,monospace;letter-spacing:.08em;color:#f3eee0;background:#c84a1e;padding:5px 10px;border-radius:3px;margin:10px 0 4px}.subtitle{font-size:18px;color:#6b6b6b;font-style:italic;margin:8px 0 20px}h2{font-size:18px;font-weight:700;margin:34px 0 12px;padding-bottom:8px;border-bottom:2px solid #c84a1e}.meta{font-size:13px;color:#6b6b6b;margin:0 0 6px}.body{font-size:14px;color:#1a1a1a;margin:0 0 10px}table{width:100%;border-collapse:collapse;font-size:13px;margin:12px 0 24px}th,td{text-align:left;padding:10px 14px;border-bottom:1px solid #d4cfc1;vertical-align:top;overflow-wrap:anywhere}th{background:#f3eee0;font-weight:700;font-size:12px;text-transform:uppercase;letter-spacing:.04em}td.mono{font-family:ui-monospace,monospace;color:#c84a1e;font-weight:600}.surfaces{font-family:ui-monospace,monospace;font-size:12px;background:#1a1a1a;color:#f3eee0;padding:16px 20px;border-radius:4px;margin:12px 0 24px;white-space:pre;overflow-x:auto;line-height:1.8}footer{margin-top:64px;padding-top:28px;border-top:1px solid #d4cfc1;font-size:12px;color:#6b6b6b;line-height:1.7}footer a{color:#2455a3;text-decoration:none}.footer-brand{font-size:15px;font-weight:700;color:#1a1a1a;margin-bottom:8px}.cols{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:22px;margin:16px 0}.cols h4{font-size:11px;text-transform:uppercase;letter-spacing:.1em;margin-bottom:8px;color:#1a1a1a}.cols a{display:block;margin-bottom:5px}a{color:#2455a3;text-decoration:none}`;
const footer = () => `<footer><p class="footer-brand">GreenCore Solutions Corp.</p><p>Microsoft AI Cloud Partner · D-U-N-S ${DUNS}</p><p style="margin-top:6px">Broadcast: <a href="https://x.com/SM_ECO_10060">@SM_ECO_10060 on X</a></p><div class="cols"><div><h4>Estate</h4><a href="https://gsc-em.com/">gsc-em.com</a><a href="https://${APEX}/">gsc-marketplace.ai</a><a href="https://${HOSTS.mcp}/">mcp.gsc-marketplace.ai</a><a href="${DOORS.trading_desk.url}">gsc-navigator.ai</a><a href="https://dpuone.ai/">dpuone.ai — the ledger</a></div><div><h4>Follow</h4><a href="https://x.com/GSC_Rail_ai">@GSC_Rail_ai</a><a href="https://x.com/ACM68000">@ACM68000</a><a href="https://x.com/SM_AIO_CPG">@SM_AIO_CPG</a><a href="https://x.com/SM_ESG_CPG">@SM_ESG_CPG</a><a href="https://x.com/SM_ECO_10060">@SM_ECO_10060</a></div></div><p>Hosting: Microsoft Azure · agents resident in 18 countries worldwide</p><p style="margin-top:8px">Canonical standards: <a href="https://sm-aio-cpg.org/">sm-aio-cpg</a> · <a href="https://sm-esg-cpg.org/">sm-esg-cpg</a> · <a href="https://cpg-68000.ai/">cpg-68000</a> · <a href="https://instantagentmessage.ai/">instantagentmessage</a> · <a href="https://acm-68000.ai/">acm-68000</a></p><p style="margin-top:8px">This site does not use cookies for tracking, advertising, or analytics.</p><p style="margin-top:10px;color:#6b6b6b">© 2026 GreenCore Solutions Corp. (GSC) · Protocol operator: GSC</p></footer>`;
const shell = (title, inner) => `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title><link rel="canonical" href="https://${APEX}/x402"><style>${CSS}</style></head><body><div class="container">${inner}${footer()}</div><script src="/webmcp.js" defer></script></body></html>`;
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

const exchangeBlock = (ready) => `<div class="surfaces"><span style="color:#8b8378"># 1 · Ask for the resource — the server answers 402 with the terms (x402 v2)</span>
$ curl -i "https://${APEX}/x402/resolve"
HTTP/2 402
PAYMENT-REQUIRED: base64(JSON body below)
${ready ? esc(JSON.stringify(exampleTerms(`https://${APEX}/x402/resolve`), null, 2)) : "(the payload appears here once the rail is configured — the receive address lives in config only)"}
<span style="color:#8b8378"># the receive address (payTo) is stated in the live 402 payload only — never on this page</span>

<span style="color:#8b8378"># 2 · Your agent signs an EIP-3009 transferWithAuthorization for the exact amount and retries</span>
$ curl -i "https://${APEX}/x402/resolve" -H "PAYMENT-SIGNATURE: base64(PaymentPayload)"

<span style="color:#8b8378"># 3 · The server verifies and settles through the facilitator and answers 200 with a signed receipt</span>
HTTP/2 200
PAYMENT-RESPONSE: base64(SettlementResponse)
{ "confirmation": "x402 settlement confirmed — your stack works end to end", "nonce": "32 hex characters — the claim ticket", "receipt_url": "https://${APEX}/x402/receipt/ plus the nonce", "signature": { "alg": "EdDSA", "kid": "${CFG.kid}" } }</div>`;

export function doorHtml() {
  const ready = configured();
  return shell("x402 — the live x402 test endpoint | GSC-Marketplace", `
  <div class="topbar">Microsoft Azure · France Central · Paris</div>
  <p class="eyebrow">x402 · Agentic payments · GSC-Marketplace</p>
  <h1>x402<span class="host">${APEX}/x402</span></h1>
  <div class="badge">STATE: ${ready ? "RESOLVED · LIVE" : "STAGED · RAIL NOT CONFIGURED"}</div>
  <p class="subtitle">Agentic payments on GSC-Marketplace — a live x402 endpoint any AI Agent can settle against.</p>
  <p class="meta">Operated by GreenCore Solutions Corp. · Microsoft AI Cloud Partner · Open protocol</p>
  <h2>What x402 is</h2>
  <p class="body">x402 is an open payment protocol for the web's HTTP 402 status: a server answers a request with 402 and a machine-readable statement of terms; the client signs a transfer authorization; the server verifies and settles it and answers 200. The protocol is open, stewarded under the Linux Foundation, and transport-agnostic — an AI Agent pays without an account, a checkout, or a human in the loop.</p>
  <h2>What this endpoint does</h2>
  <p class="body">${APEX}/x402/resolve is the ecosystem's test counterparty. A developer points an x402-capable agent at it and proves the whole stack end to end with a real settlement on Base: the 402 challenge, the signed authorization, the facilitator settlement, and a signed receipt that verifies offline against this host's JWKS. The receipt resolves forever at /x402/receipt/ plus its nonce — the nonce is the claim ticket. Every settlement also emits an IA-MESSAGE to the transaction MCP, where it appears as a read-only desk row beside the RFQs.</p>
  <h2>The exchange</h2>
  ${exchangeBlock(ready)}
  <h2>The 402 challenge</h2>
  <p class="meta">The payload is protocol fact — it is the terms. Network ${CFG.network} (Base) · asset USDC (${CFG.asset}) · scheme exact · EIP-3009 transferWithAuthorization · 60-second window. Amount and receive address are stated in the payload only.</p>
  <h2>Machine Surfaces</h2>
  <p class="meta">/x402/resolve · /x402/receipt/{nonce} · /x402/jwks.json · /x402.json · /llms.txt · /.well-known/agent-card.json · /.well-known/mcp/server-card.json · /.well-known/ai-catalog.json</p>
  <h2>Identity Beacons</h2>
  <p class="meta">19 GSC headers (the Nineteen, gen-2 set) on every response, including x-gsc-x402: ready. Per-request x-gsc-timestamp and x-gsc-nonce regenerate as proof-of-liveness. Receipts are signed with key id ${CFG.kid}; the public key is at /x402/jwks.json.</p>`);
}
export function doorMd() { return `# x402 — the live x402 test endpoint\n\n> ${APEX}/x402 · Agentic payments on GSC-Marketplace — a live x402 endpoint any AI Agent can settle against.\n\nx402 is an open payment protocol (Linux Foundation) for HTTP 402: terms in the 402 payload, a signed EIP-3009 authorization from the client, facilitator settlement, 200 with a receipt.\n\n- Paid endpoint: https://${APEX}/x402/resolve (network ${CFG.network}, asset USDC, scheme exact; terms in the payload only)\n- Receipt: https://${APEX}/x402/receipt/{nonce} — JSON for machines, HTML for humans; signed (EdDSA, kid ${CFG.kid}); JWKS at /x402/jwks.json\n- Every settlement emits an IA-MESSAGE to ${DOORS.instant_messaging.mcp}\n\nOperated by GreenCore Solutions Corp. · D-U-N-S ${DUNS}\n`; }
export function doorJson() { return { surface: "x402 test endpoint", state: configured() ? "live" : "staged — rail not configured", paid_endpoint: `https://${APEX}/x402/resolve`, network: CFG.network, asset: { symbol: "USDC", contract: CFG.asset }, scheme: "exact", transfer: "eip3009", receipt: { pattern: `https://${APEX}/x402/receipt/{nonce}`, signature: { alg: "EdDSA", kid: CFG.kid, jwks: `https://${APEX}/x402/jwks.json` } }, ia_message: { on: "every settlement", mcp: DOORS.instant_messaging.mcp }, next_steps: nextSteps(APEX), operator: OPERATOR, duns: DUNS }; }

function html402(pr) {
  const a = pr.accepts[0];
  return shell("402 · Payment required | GSC-Marketplace x402", `
  <div class="topbar">Microsoft Azure · France Central · Paris</div>
  <p class="eyebrow">x402 · Agentic payments · GSC-Marketplace</p>
  <h1>/x402/resolve<span class="host">${APEX}</span></h1>
  <div class="badge">402 · PAYMENT REQUIRED</div>
  <p class="subtitle">Your agent pays this — there is no human checkout.</p>
  <p class="meta">Operated by GreenCore Solutions Corp. · The terms below are the 402 payload, rendered.</p>
  <h2>Terms (from the payload)</h2>
  <table><thead><tr><th>Field</th><th>Value</th></tr></thead><tbody>
    <tr><td class="mono">scheme</td><td>${a.scheme}</td></tr><tr><td class="mono">network</td><td>${a.network} (Base)</td></tr><tr><td class="mono">asset</td><td>${a.asset} (${a.extra.name})</td></tr><tr><td class="mono">amount</td><td>${a.amount} base units</td></tr><tr><td class="mono">payTo</td><td>${a.payTo}</td></tr><tr><td class="mono">maxTimeoutSeconds</td><td>${a.maxTimeoutSeconds}</td></tr><tr><td class="mono">transfer</td><td>${a.extra.assetTransferMethod} (transferWithAuthorization)</td></tr>
  </tbody></table>
  <h2>The exchange</h2>
  ${exchangeBlock(true)}
  <h2>Open doors</h2>
  <p class="meta"><a href="https://${APEX}/.well-known/agent-card.json">Agent card</a> · Instant Messaging for agents: ${DOORS.instant_messaging.inbound} (declared by x-gsc-inbound) · <a href="${DOORS.trading_desk.url}">GSC Trading Desk</a> · <a href="https://${APEX}/x402">the x402 door</a></p>`);
}
function htmlReceipt(r) {
  return shell(`x402 receipt ${r.nonce} | GSC-Marketplace`, `
  <div class="topbar">Microsoft Azure · France Central · Paris</div>
  <p class="eyebrow">x402 · Settlement receipt · GSC-Marketplace</p>
  <h1>Receipt<span class="host">${APEX}/x402/receipt/${esc(r.nonce)}</span></h1>
  <div class="badge">STATE: SETTLED · SIGNED</div>
  <p class="subtitle">${esc(r.confirmation)}</p>
  <p class="meta">Operated by GreenCore Solutions Corp. · The nonce is the claim ticket; this URL resolves forever.</p>
  <h2>Settlement</h2>
  <table><tbody>
    <tr><td class="mono">timestamp</td><td>${esc(r.timestamp)}</td></tr><tr><td class="mono">amount</td><td>${esc(r.amount)} base units ${esc(r.asset_symbol)}</td></tr><tr><td class="mono">network</td><td>${esc(r.network)}</td></tr><tr><td class="mono">payer</td><td>${esc(r.payer)}</td></tr><tr><td class="mono">tx_hash</td><td><a href="https://basescan.org/tx/${esc(r.tx_hash)}">${esc(r.tx_hash)}</a></td></tr><tr><td class="mono">nonce</td><td>${esc(r.nonce)}</td></tr><tr><td class="mono">ia_message</td><td>${esc(r.ia_message_ticket || "—")}</td></tr><tr><td class="mono">signature</td><td>EdDSA · kid ${esc(r.signature.kid)} · verify against <a href="/x402/jwks.json">/x402/jwks.json</a></td></tr>
  </tbody></table>
  <h2>Next steps</h2>
  <p class="meta"><a href="https://${APEX}/.well-known/agent-card.json">Agent card</a> · Instant Messaging for agents: ${DOORS.instant_messaging.inbound} · <a href="${DOORS.trading_desk.url}">GSC Trading Desk</a> · surfaces: ${Object.values(SURFACES).map((s) => `<a href="${s.url}">${s.role}</a>`).join(" · ")}</p>`);
}

// ---------- mount ----------
export function mountX402(app, ghost) {
  const wantsHtml = (req) => { const a = req.headers.accept || ""; return /text\/html/i.test(a) && !/application\/json/i.test(a.split(",")[0]); };
  app.get("/x402", (req, res) => { ghost(res); if (/text\/markdown/i.test(req.headers.accept || "")) return res.type("text/markdown; charset=utf-8").send(doorMd()); if (wantsHtml(req)) return res.type("text/html; charset=utf-8").send(doorHtml()); res.json(doorJson()); });
  app.get("/x402.json", async (req, res) => { ghost(res); res.json({ ...doorJson(), facilitator: await facilitatorState(req.query.probe === "now") }); });
  app.get("/x402/jwks.json", (req, res) => { ghost(res); res.json(jwks()); });

  app.get("/x402/resolve", async (req, res) => {
    const url = `https://${APEX}/x402/resolve`;
    if (!configured()) { ghost(res, "ACM-500", "SYSTEM_ERROR"); return res.status(503).json({ error: "x402 rail staged — not configured", signal: "ACM-500", state: "SYSTEM_ERROR", door: `https://${APEX}/x402`, next_steps: nextSteps(APEX) }); }
    const pr = paymentRequired(url);
    const sig = req.headers["payment-signature"] || req.headers["x-payment"];
    if (!sig) { ghost(res, "ACM-300", "CONDITIONAL"); res.set("PAYMENT-REQUIRED", b64json(pr)); res.status(402); if (wantsHtml(req)) return res.type("text/html; charset=utf-8").send(html402(pr)); return res.json(pr); }
    let payload; try { payload = unb64json(String(sig)); } catch { ghost(res, "ACM-300", "CONDITIONAL"); return res.status(402).json({ ...pr, error: "PAYMENT-SIGNATURE header is not valid base64 JSON" }); }
    const reqs = pr.accepts[0];
    const v = await facilitator("/verify", { x402Version: 2, paymentPayload: payload, paymentRequirements: reqs });
    if (v.status !== 200 || v.body?.isValid === false) { ghost(res, "ACM-300", "CONDITIONAL"); return res.status(402).json({ ...pr, error: `payment not valid: ${v.body?.invalidReason || v.body?.error || v.status}` }); }
    const s = await facilitator("/settle", { x402Version: 2, paymentPayload: payload, paymentRequirements: reqs });
    if (s.status !== 200 || s.body?.success === false) { ghost(res, "ACM-500", "SYSTEM_ERROR"); return res.status(502).json({ error: `settlement failed: ${s.body?.errorReason || s.body?.error || s.status}`, signal: "ACM-500", state: "SYSTEM_ERROR" }); }
    const nonce = crypto.randomBytes(12).toString("hex");
    const body = { confirmation: "x402 settlement confirmed — your stack works end to end", timestamp: new Date().toISOString(), amount: reqs.amount, asset: reqs.asset, asset_symbol: "USDC", network: reqs.network,
      payer: s.body.payer || payload?.payload?.authorization?.from || null, tx_hash: s.body.transaction || null, nonce, receipt_url: `https://${APEX}/x402/receipt/${nonce}`, issuer: OPERATOR, duns: DUNS };
    const signature = signReceipt(body);
    const ticket = await emitSettlementMessage(body);
    const receipt = { ...body, signature, ia_message_ticket: ticket, next_steps: nextSteps(APEX) };
    try { await putReceipt(nonce, receipt); } catch (e) { receipt.store_error = String(e.message || e).slice(0, 120); }
    ghost(res, "ACM-200", "ALLOW"); res.set("PAYMENT-RESPONSE", b64json({ success: true, transaction: receipt.tx_hash, network: reqs.network, payer: receipt.payer }));
    res.json(receipt);
  });

  app.get("/x402/receipt/:nonce", async (req, res) => {
    const n = String(req.params.nonce || ""); if (!/^[a-f0-9]{24}$/.test(n)) { ghost(res, "ACM-404", "NOT_FOUND"); return res.status(404).json({ error: "not_found", signal: "ACM-404", state: "NOT_FOUND" }); }
    let r = null; try { r = await getReceipt(n); } catch (e) { ghost(res, "ACM-500", "SYSTEM_ERROR"); return res.status(503).json({ error: "receipt store unavailable", detail: String(e.message || e).slice(0, 120) }); }
    if (!r) { ghost(res, "ACM-404", "NOT_FOUND"); return res.status(404).json({ error: "not_found", signal: "ACM-404", state: "NOT_FOUND", nonce: n }); }
    ghost(res); if (wantsHtml(req)) return res.type("text/html; charset=utf-8").send(htmlReceipt(r)); res.json(r);
  });
}
