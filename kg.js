// kg.js — live client for the CPG Knowledge Graph MCP (streamable-http, session-bound).
// The marketplace never holds graph data; it resolves live and returns as resolved.
// No credentials: the KG's read tools are open. Results cached briefly to be a good citizen.
const KG_URL = "https://mcp.cpgknowledgegraph.ai/mcp";
const HDR = { "Content-Type": "application/json", "Accept": "application/json, text/event-stream" };
let session = null;
const cache = new Map();
const TTL_MS = 10 * 60 * 1000;

async function post(body, sid) {
  const h = { ...HDR };
  if (sid) h["Mcp-Session-Id"] = sid;
  const r = await fetch(KG_URL, { method: "POST", headers: h, body: JSON.stringify(body), signal: AbortSignal.timeout(25000) });
  const text = await r.text();
  return { status: r.status, sid: r.headers.get("mcp-session-id"), text };
}

function parse(text) {
  // SSE or plain JSON
  const lines = text.split("\n").map((l) => l.trim()).filter((l) => l.startsWith("{") || l.startsWith("data: {"));
  for (const l of lines) {
    const j = JSON.parse(l.replace(/^data:\s*/, ""));
    if (j.result || j.error) return j;
  }
  throw new Error("KG: no JSON-RPC result in response");
}

async function init() {
  const r = await post({ jsonrpc: "2.0", id: 1, method: "initialize", params: { protocolVersion: "2025-03-26", capabilities: {}, clientInfo: { name: "gsc-marketplace", version: "1.0.0" } } });
  if (!r.sid) throw new Error("KG: no session id on initialize");
  await post({ jsonrpc: "2.0", method: "notifications/initialized" }, r.sid);
  session = r.sid;
  return session;
}

export async function kgCall(name, args = {}) {
  const key = name + ":" + JSON.stringify(args);
  const hit = cache.get(key);
  if (hit && Date.now() - hit.t < TTL_MS) return hit.v;
  let sid = session || (await init());
  let r = await post({ jsonrpc: "2.0", id: 2, method: "tools/call", params: { name, arguments: args } }, sid);
  if (r.status === 404 || r.status === 400) { sid = await init(); r = await post({ jsonrpc: "2.0", id: 2, method: "tools/call", params: { name, arguments: args } }, sid); }
  const j = parse(r.text);
  if (j.error) throw new Error("KG error: " + JSON.stringify(j.error));
  const c = j.result && j.result.content && j.result.content[0];
  if (j.result && j.result.isError) throw new Error("KG tool error: " + (c && c.text ? c.text.slice(0, 300) : "unknown"));
  let v = c && c.text ? c.text : "";
  try { v = JSON.parse(v); } catch { /* leave as text */ }
  cache.set(key, { t: Date.now(), v });
  return v;
}
