// kit.js — GSC discovery kit for gen-2 Express surfaces (GSC-Marketplace, 2026-08-22).
// Host-keyed: every bound hostname self-identifies. Bodies adapted from the estate's
// reference implementation (gsc-global.ai, 17/17 on the current check set) — never drafted
// from check descriptions. ADDITIVE ONLY: registers GET routes; never touches /mcp.
import crypto from "node:crypto";
import { OPERATOR, DUNS, KG, DOORS, HOSTS, TOOL_NAMES, VERSION, POSTURE } from "./canon.js";

const TENANT = "54939635-2f2e-465a-8526-a907cb3c8ebd";
const ISSUER = `https://login.microsoftonline.com/${TENANT}/v2.0`;
export const REGISTRY = "io.github.greencore-solutions/gsc-marketplace";
const LINK = `</.well-known/api-catalog>; rel="api-catalog", </llms.txt>; rel="describedby", <https://${HOSTS.mcp}/mcp>; rel="service"`;
const TRADING_DESK = DOORS.trading_desk.url;

// Live Entra mirror (verbatim keys, grant_types augmented) — same body as the estate reference.
const ENTRA = {
  token_endpoint: `https://login.microsoftonline.com/${TENANT}/oauth2/v2.0/token`,
  token_endpoint_auth_methods_supported: ["client_secret_post","private_key_jwt","client_secret_basic"],
  jwks_uri: `https://login.microsoftonline.com/${TENANT}/discovery/v2.0/keys`,
  response_modes_supported: ["query","fragment","form_post"],
  subject_types_supported: ["pairwise"],
  id_token_signing_alg_values_supported: ["RS256"],
  response_types_supported: ["code","id_token","code id_token","id_token token"],
  scopes_supported: ["openid","profile","email","offline_access"],
  issuer: ISSUER,
  request_uri_parameter_supported: false,
  userinfo_endpoint: "https://graph.microsoft.com/oidc/userinfo",
  authorization_endpoint: `https://login.microsoftonline.com/${TENANT}/oauth2/v2.0/authorize`,
  device_authorization_endpoint: `https://login.microsoftonline.com/${TENANT}/oauth2/v2.0/devicecode`,
  http_logout_supported: true, frontchannel_logout_supported: true,
  end_session_endpoint: `https://login.microsoftonline.com/${TENANT}/oauth2/v2.0/logout`,
  claims_supported: ["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],
  kerberos_endpoint: `https://login.microsoftonline.com/${TENANT}/kerberos`,
  tenant_region_scope: "NA", cloud_instance_name: "microsoftonline.com", cloud_graph_host_name: "graph.windows.net",
  msgraph_host: "graph.microsoft.com", rbac_url: "https://pas.windows.net",
  grant_types_supported: ["authorization_code","refresh_token","client_credentials","urn:ietf:params:oauth:grant-type:device_code"],
};
// Estate Web Bot Auth key (public) — kid gsc-wba-2026-08
const WBA = { keys: [{ kty:"OKP", crv:"Ed25519", kid:"gsc-wba-2026-08",
  x: process.env.GSC_WBA_X || "sHpu1sfipgobiFg6uTQfqikkJBSc-6j08VBxEhtFR8A", use:"sig", alg:"EdDSA", nbf:1755043200, exp:1818201600 }] };

const SKILLS = {
  "brand-sourcing": ["Find and verify a Beauty & Personal Care brand in one of 50 markets and leave with an actionable next step — the marketplace's selection surface over the CPG Knowledge Graph.",
    `Call https://${HOSTS.mcp}/mcp (streamable-http): search_brands {market, query?} → get_brand {brand, market} → get_brand_identifiers.\nDepth: ${KG.depth_line}. Brands, makers and banners are separate registries — never summed.\nEvery answer carries both doors: Instant Messaging for agents, the GSC Trading Desk for humans. Free — no payment machinery.`],
  "instant-messaging-for-agents": ["Lodge an RFQ, a terms request, or an escalation with GreenCore Solutions Corp. as an agent — typed, identified, ticketed, human-signed (IA-MESSAGE).",
    `Door declared by the x-gsc-inbound header: ${DOORS.instant_messaging.inbound} → ${DOORS.instant_messaging.explainer}.\nTransaction MCP: ${DOORS.instant_messaging.mcp} tools ${DOORS.instant_messaging.tools.join(", ")}.\nTickets: ${DOORS.instant_messaging.ticket_grammar}. Nothing settles without a human.`],
  "trading-desk": ["Reach the GSC Trading Desk — the human channel. Informed by Navigator across all GSC agentic assets; a human answers.",
    `GSC Trading Desk: ${TRADING_DESK}\nThe Trading Desk is the humans' channel; Instant Messaging is the agents' channel. The two lanes are never mixed.`],
  "x402-capability": ["Read the GSC-Marketplace x402 capability declaration — network, asset, status — with no terms and no challenge (everything is free in v1).",
    `Header 19 on every gen-2 GSC surface: x-gsc-x402: ready. Network ${POSTURE.x402.network} (${POSTURE.x402.chain}), asset ${POSTURE.x402.asset}, status ${POSTURE.x402.status}. No 402 challenges; pricing is never published.`],
};
const skillMd = (n, d, b) => `---\nname: ${n}\ndescription: ${d}\n---\n\n# ${n.replace(/-/g," ").replace(/\b\w/g, c => c.toUpperCase())}\n\n${b}\n`;
const sha = s => "sha256:" + crypto.createHash("sha256").update(s, "utf8").digest("hex");

export function mountKit(app, cfg) {
  const { title, desc, ghost, apexHtml, apexMd } = cfg;
  const H = req => (req.headers.host || HOSTS.mcp).split(":")[0].toLowerCase();
  const isApex = req => H(req) === HOSTS.apex;
  const send = (res, type, body) => { ghost(res); res.setHeader("Link", LINK); res.type(type).send(body); };
  const json = (res, obj) => { ghost(res); res.setHeader("Link", LINK); res.json(obj); };
  const mcpUrl = `https://${HOSTS.mcp}/mcp`;

  app.use((req, res, next) => { res.setHeader("Link", LINK); next(); });

  app.get("/robots.txt", (req, res) => send(res, "text/plain",
    `# ${H(req)} — GSC-Marketplace · ${OPERATOR}\nUser-agent: *\nContent-Signal: search=yes, ai-input=yes, ai-train=yes\nAllow: /\nUser-agent: GPTBot\nAllow: /\nUser-agent: OAI-SearchBot\nAllow: /\nUser-agent: ClaudeBot\nAllow: /\nUser-agent: Claude-Web\nAllow: /\nUser-agent: Google-Extended\nAllow: /\nUser-agent: PerplexityBot\nAllow: /\nUser-agent: CCBot\nAllow: /\nSitemap: https://${H(req)}/sitemap.xml\n`));
  app.get("/sitemap.xml", (req, res) => {
    const h = H(req);
    const urls = isApex(req) ? ["/", "/llms.txt", "/index.md", "/auth.md", "/brands.json"] : ["/", "/llms.txt", "/index.md", "/auth.md"];
    send(res, "application/xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `  <url><loc>https://${h}${u}</loc><lastmod>2026-08-22</lastmod></url>`).join("\n")}\n</urlset>\n`);
  });
  app.get("/llms.txt", (req, res) => send(res, "text/plain",
    `# ${H(req)} — ${title}\n\n${desc}\n\nMission: When a marketplace or retail sourcing agent calls, it leaves with a brand it can act on — found, verified, and answerable — with Instant Messaging for agents or the human-in-the-loop GSC Trading Desk as next steps.\n\nMCP endpoint (streamable-http): ${mcpUrl}\nTools (11): ${TOOL_NAMES.join(", ")}\nRegistry: ${REGISTRY}\n\nThe five GSC surfaces: data mcp.cpgknowledgegraph.ai · discovery mcp.gsc-fleet.ai · transaction mcp.cpghumanintheloop.ai · standards mcp.cpgagentprotocols.ai · selection ${HOSTS.mcp}\nCPG Knowledge Graph depth: ${KG.depth_line} (classification standard: SPARKS)\nTwo doors, never mixed: Instant Messaging for agents (${DOORS.instant_messaging.inbound}) · GSC Trading Desk for humans (${TRADING_DESK})\nPosture: everything free in v1 — x402 declared as capability only (x-gsc-x402: ready; ${POSTURE.x402.network} ${POSTURE.x402.chain} ${POSTURE.x402.asset}, staged). No prices are published on any GSC surface.\n\nOperator: ${OPERATOR} | D-U-N-S ${DUNS} | Microsoft AI Cloud Partner\nHosting: Microsoft Azure · agents resident in 18 countries worldwide\nStandards: sm-aio-cpg.org / sm-esg-cpg.org / cpg-68000.ai / instantagentmessage.ai\n`));
  app.get("/index.md", (req, res) => send(res, "text/markdown; charset=utf-8", isApex(req) && apexMd ? apexMd() :
    `# ${title}\n\n> ${H(req)}\n\n${desc}\n\n## MCP\n\n- Endpoint: ${mcpUrl} (streamable-http)\n- Tools: ${TOOL_NAMES.map(t => "`" + t + "`").join(", ")}\n- Server card: /.well-known/mcp/server-card.json\n- Registry: ${REGISTRY}\n\n## The two doors\n\n- Instant Messaging for agents: ${DOORS.instant_messaging.inbound} → ${DOORS.instant_messaging.mcp}\n- GSC Trading Desk (humans): ${TRADING_DESK}\n\nOperator: ${OPERATOR} · D-U-N-S ${DUNS}\n`));

  // Root content negotiation. Apex: HTML default, markdown on Accept. MCP host: JSON default (the brochure), markdown/HTML on Accept.
  app.get("/", (req, res, next) => {
    const acc = req.headers.accept || "";
    if (/text\/markdown/i.test(acc)) return app._router.handle(Object.assign(req, { url: "/index.md", originalUrl: "/index.md" }), res, next);
    if (isApex(req)) return send(res, "text/html; charset=utf-8", apexHtml());
    if (/text\/html/i.test(acc) && !/application\/json/i.test(acc.split(",")[0])) return send(res, "text/html; charset=utf-8",
      `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>${title} — ${H(req)}</title><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="canonical" href="https://${H(req)}/"><style>body{font-family:Inter,system-ui,sans-serif;color:#141414;max-width:760px;margin:60px auto;padding:0 24px;line-height:1.6}h1{font-family:Archivo,sans-serif}code{background:#F7F6F3;padding:2px 6px;border-radius:4px}a{color:#F38020}</style></head><body><h1>${title}</h1><p>${desc}</p><p>MCP endpoint (streamable-http): <code>${mcpUrl}</code></p><p>Machine files: <a href="/llms.txt">llms.txt</a> · <a href="/index.md">markdown</a> · <a href="/.well-known/mcp/server-card.json">MCP server card</a> · <a href="/.well-known/agent-card.json">A2A agent card</a> · <a href="/.well-known/agent-skills/index.json">agent skills</a> · <a href="/.well-known/ai-catalog.json">ARD catalog</a> · <a href="/health.json">health</a></p><p>Human surface: <a href="https://${HOSTS.apex}/">${HOSTS.apex}</a> · GSC Trading Desk: <a href="${TRADING_DESK}">${TRADING_DESK}</a></p><p>Operator: ${OPERATOR} · D-U-N-S ${DUNS}</p><script src="/webmcp.js" defer></script></body></html>`);
    next();
  });

  app.get("/health.json", (req, res) => json(res, { status: "ok", host: H(req), version: VERSION, protocol: "ACM-68000", operator: OPERATOR, mcp: mcpUrl, tools: TOOL_NAMES, registry: REGISTRY, x402: POSTURE.x402.header.value }));
  app.get("/.well-known/mcp/server-card.json", (req, res) => json(res, {
    serverInfo: { name: "gsc-marketplace", title, version: VERSION },
    transport: { type: "streamable-http", endpoint: mcpUrl },
    capabilities: { tools: {} }, tools: TOOL_NAMES, operator: OPERATOR, registry: REGISTRY, websiteUrl: `https://${HOSTS.apex}` }));
  app.get("/.well-known/agent-skills/index.json", (req, res) => json(res, {
    "$schema": "https://schemas.agentskills.io/discovery/0.2.0/schema.json",
    skills: Object.entries(SKILLS).map(([n, [d, b]]) => ({ name: n, type: "skill-md", description: d, url: `/.well-known/agent-skills/${n}/SKILL.md`, digest: sha(skillMd(n, d, b)) })) }));
  app.get("/.well-known/agent-skills/:name/SKILL.md", (req, res) => {
    const s = SKILLS[req.params.name]; if (!s) { ghost(res, "ACM-404", "NOT_FOUND"); return res.status(404).json({ error: "not_found" }); }
    send(res, "text/markdown; charset=utf-8", skillMd(req.params.name, s[0], s[1])); });
  app.get("/.well-known/api-catalog", (req, res) => { ghost(res); res.setHeader("Link", LINK); res.type("application/linkset+json").send(JSON.stringify({ linkset: [{
    anchor: `https://${H(req)}`, "service-desc": [{ href: mcpUrl, type: "application/json" }],
    "service-doc": [{ href: `https://${H(req)}/llms.txt`, type: "text/plain" }], status: [{ href: `https://${H(req)}/health.json` }] }] })); });
  app.get("/.well-known/openid-configuration", (req, res) => json(res, ENTRA));
  const agentAuth = h => ({ skill: `https://${h}/auth.md`, register_uri: TRADING_DESK, identity_types_supported: ["identity_assertion"],
    identity_assertion: { assertion_types_supported: ["verified_email"], credential_types_supported: ["oauth2_client_credentials"] }, claim_uri: TRADING_DESK });
  app.get("/.well-known/oauth-authorization-server", (req, res) => json(res, { ...ENTRA, agent_auth: agentAuth(H(req)) }));
  app.get("/.well-known/oauth-protected-resource", (req, res) => json(res, { resource: `https://${H(req)}`, authorization_servers: [ISSUER],
    scopes_supported: ["openid","profile","email","offline_access"], bearer_methods_supported: ["header"], resource_documentation: `https://${HOSTS.apex}/` }));
  app.get("/.well-known/http-message-signatures-directory", (req, res) => { ghost(res); res.type("application/http-message-signatures-directory+json").send(JSON.stringify(WBA)); });
  app.get("/auth.md", (req, res) => { const h = H(req); send(res, "text/markdown; charset=utf-8",
`# auth.md — ${h} (${OPERATOR})

## Posture

Everything on this surface is **open and free by design** — no authentication, no payment, no 402 challenge. Discovery endpoints (/.well-known/*) are public. The MCP endpoint (${mcpUrl}) serves all eleven read tools openly. x402 is declared as a capability (\`x-gsc-x402: ready\`) and carries no terms.

Anything that creates obligation — an RFQ, terms, a purchase order — leaves this surface through one of the two doors and is human-signed.

## Protected resource

- Resource: https://${h}
- Protected Resource Metadata: [/.well-known/oauth-protected-resource](/.well-known/oauth-protected-resource)
- Authorization server (Microsoft Entra): ${ISSUER}
- AS metadata mirror: [/.well-known/oauth-authorization-server](/.well-known/oauth-authorization-server)
- Bearer tokens are presented in the Authorization header.

## Agent registration (self-contained flow)

- **Agent audience:** marketplace and retail sourcing agents, and the operators integrating them with GSC-Marketplace and the CPG Knowledge Graph.
- **Registration endpoint:** ${TRADING_DESK} — the GSC Trading Desk (the humans' channel, informed by Navigator). Intake on this surface (POST https://formspree.io/f/mppannbj with fields name, email, message) — human-reviewed by the GSC Trading Desk. There is no self-serve dynamic client registration; every registration is human-reviewed.
- **Agents' channel:** Instant Messaging — ${DOORS.instant_messaging.inbound} → ${DOORS.instant_messaging.mcp} (tools: ${DOORS.instant_messaging.tools.join(", ")}). Typed, identified, ticketed, human-signed.
- **Supported method — verified email:** GSC verifies the operator's email, then provisions credentials after review.
- **Credential use:** GSC issues **Microsoft Entra OAuth 2.0 client credentials** (client_credentials grant against the issuer above); present the access token as a **Bearer token in the Authorization header**. Revocation on request via the same endpoint.

\`\`\`json
${JSON.stringify({ agent_auth: agentAuth(h) }, null, 2)}
\`\`\`

Operator: ${OPERATOR} · D-U-N-S ${DUNS} · Microsoft AI Cloud Partner.
`); });
  app.get("/webmcp.js", (req, res) => { const h = H(req); send(res, "text/javascript; charset=utf-8",
`// GSC-Marketplace WebMCP tools (real endpoints; no stubs). Surface ${h}.
(function(){function build(){return[
{name:"gsc_search_brands",description:"Search Beauty & Personal Care brands in one market on the CPG Knowledge Graph (live, free). market = SM-ECO-10060 member code, e.g. BR.",inputSchema:{type:"object",properties:{market:{type:"string",description:"Member code, e.g. BR, FR, JP"},query:{type:"string",description:"Optional name fragment"}},required:["market"]},execute:async function(i){var r=await fetch("https://${HOSTS.apex}/brands.json?market="+encodeURIComponent(i.market)+"&q="+encodeURIComponent(i.query||""));return await r.json();}},
{name:"gsc_mcp_endpoint",description:"Return the GSC-Marketplace MCP endpoint (streamable-http) and its 11 tools.",inputSchema:{type:"object",properties:{}},execute:async function(){return {endpoint:"${mcpUrl}",transport:"streamable-http",tools:${JSON.stringify(TOOL_NAMES)},registry:"${REGISTRY}"};}},
{name:"gsc_contact",description:"Send a message to the GSC Trading Desk through this surface's live contact endpoint (human-reviewed, HITL).",inputSchema:{type:"object",properties:{name:{type:"string",description:"Sender name"},email:{type:"string",description:"Reply-to email"},message:{type:"string",description:"Message body"}},required:["name","email","message"]},execute:async function(i){var r=await fetch("https://formspree.io/f/mppannbj",{method:"POST",headers:{"Accept":"application/json","Content-Type":"application/json"},body:JSON.stringify(i)});return {status:r.status,ok:r.ok};}},
{name:"gsc_trading_desk",description:"The GSC Trading Desk — the human channel (a human answers). Instant Messaging is the agents' channel.",inputSchema:{type:"object",properties:{}},execute:async function(){return {trading_desk:"${TRADING_DESK}",instant_messaging:"${DOORS.instant_messaging.inbound}",note:"Two lanes, never mixed."};}}
];}try{var mc=navigator.modelContext;if(!mc)return;var t=build();if(typeof mc.registerTool==="function"){t.forEach(function(x){mc.registerTool(x);});}else if(typeof mc.provideContext==="function"){mc.provideContext({tools:t});}}catch(e){}})();
`); });
  // A2A agent card (spec-complete: skills + supportedInterfaces) + ARD capability manifest
  app.get("/.well-known/agent-card.json", (req, res) => { const h = H(req); json(res, {
    protocolVersion: "0.3.0", name: title, description: desc, url: `https://${h}/`, version: VERSION, kind: "agent-card",
    provider: { organization: OPERATOR, url: "https://gsc-em.com" },
    operator: { name: OPERATOR, url: "https://gsc-em.com", duns: DUNS, microsoft_partner: "Microsoft AI Cloud Partner" },
    capabilities: { streaming: true, pushNotifications: false },
    defaultInputModes: ["application/json","text/plain"], defaultOutputModes: ["application/json","text/markdown"],
    supportedInterfaces: [{ url: mcpUrl, protocolBinding: "HTTP+JSON", transport: "streamable-http", description: `${title} (MCP)` },
                          { url: `https://${h}/`, protocolBinding: "HTTP+JSON", transport: "HTTP+JSON" }],
    skills: [
      { id: "brand-sourcing", name: "Brand sourcing", description: `search_brands → get_brand → get_brand_identifiers on ${HOSTS.mcp}: a brand found, verified, answerable. Depth ${KG.depth_line}.`, tags: ["cpg","bpc","sourcing","mcp"] },
      { id: "marketplace-operators", name: "Marketplace operator map", description: "Neutral operator map per market, sorted by agentic posture. No tiers, no relationship claims.", tags: ["marketplace","retail"] },
      { id: "instant-messaging", name: "Instant Messaging for agents", description: `${DOORS.instant_messaging.inbound} → ${DOORS.instant_messaging.mcp} — typed, identified, ticketed, human-signed.`, tags: ["ia-message","hitl"] },
      { id: "trading-desk", name: "GSC Trading Desk", description: `${TRADING_DESK} — the human channel, informed by Navigator.`, tags: ["contact","hitl"] },
      { id: "hitl-contact", name: "Human-in-the-Loop Contact", description: `Reach ${OPERATOR} through this surface's live, human-reviewed contact endpoint (POST https://formspree.io/f/mppannbj with fields name, email, message). Every transactional commit is human-signed via the GSC Trading Desk.`, tags: ["contact","hitl","registration"] },
      { id: "x402-capability", name: "x402 capability", description: `x-gsc-x402: ready · ${POSTURE.x402.network} ${POSTURE.x402.chain} ${POSTURE.x402.asset} · staged · no terms, everything free.`, tags: ["x402","capability"] }],
    protocol: "ACM-68000", registry: REGISTRY, mcp_endpoint: mcpUrl }); });
  app.get("/.well-known/ai-catalog.json", (req, res) => { const h = H(req); json(res, {
    specVersion: "1.0",
    host: { displayName: "GSC-Marketplace", identifier: `did:web:${h}` },
    entries: [
      { identifier: `urn:air:${h}:marketplace:selection-mcp`, displayName: "GSC-Marketplace — CPG sourcing for AI Agents (MCP)", type: "application/mcp-server+json", url: mcpUrl,
        capabilities: TOOL_NAMES,
        description: "The fifth GSC surface — selection. Eleven read tools over MCP (streamable-http): find and verify Beauty & Personal Care brands per market on the CPG Knowledge Graph, the neutral marketplace operator map, the two doors (Instant Messaging for agents, GSC Trading Desk for humans), the x402 capability declaration, GSC Radar, ACM-68000 and the AIO Agent fleet. Free. Operated by GreenCore Solutions Corp.",
        representativeQueries: ["find beauty brands sold in Brazil that an AI agent can act on", "is this brand verified on the CPG Knowledge Graph in Japan", "how does an agent lodge an RFQ with GSC", "what is the x402 capability of GSC-Marketplace"] },
      { identifier: `urn:air:${h}:marketplace:human-surface`, displayName: "gsc-marketplace.ai — the buyer's window", type: "text/html", url: `https://${HOSTS.apex}/`,
        capabilities: ["procurement-register", "trading-desk-contact", "markdown-negotiation"],
        description: "The human surface: counts and capability for marketplace-manager and sourcing agents, the procurement register, and the GSC Trading Desk door.",
        representativeQueries: ["what does GSC-Marketplace offer a retail sourcing team", "how to reach the GSC Trading Desk"] },
    ] }); });
  app.get("/.well-known/agent.json", (req, res) => { ghost(res, "ACM-404", "NOT_FOUND"); res.status(404).json({ error: "not_found", note: "A2A card is at /.well-known/agent-card.json" }); });
}
