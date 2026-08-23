// ============================================================
// gsc-marketplace — mcp.gsc-marketplace.ai + gsc-marketplace.ai  v1.0.0
// GreenCore Solutions Corp. · design of record C:\START_ME_UP_AIO\NG-3_MCP.md
//
// The fifth surface — SELECTION. Eleven read tools over MCP (streamable-http),
// resolved live against the CPG Knowledge Graph, returned as resolved. Both doors
// in every complete answer. Free: no payment machinery, no 402 challenge.
// One image, host-routed: the MCP host, the human apex, and the family TLDs
// (308 → apex, POST-safe). Born with THE NINETEEN (NG-5).
// ============================================================
import express from "express";
import crypto from "node:crypto";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { z } from "zod";
import { VERSION, OPERATOR, OPERATOR_URL, DUNS, HOSTS, MISSION, SURFACES, DOORS, POSTURE, KG, ACM_68000, RADAR, DEMO_BRAND, AIO_FLEET, SPINE, POSTURE_TAXONOMY, TOOL_NAMES, MEMBER_FORM } from "./canon.js";
import { kgCall } from "./kg.js";
import { mountKit, REGISTRY } from "./kit.js";
import { apexHtml, apexMd } from "./apex.js";
import { mountX402 } from "./x402.js";

const TITLE = "GSC-Marketplace";
const DESC = "CPG sourcing for AI Agents with x402 — Beauty & Personal Care brands found, verified and answerable across 50 markets on the CPG Knowledge Graph; Instant Messaging for agents, the GSC Trading Desk for humans. The fifth GSC surface: selection. Free.";
const JURISDICTION = "FR-ECO-10060"; // France Central — the node's SM-ECO-10060 member namespace form (CEO ruling 2026-08-22)

// ---------- THE NINETEEN (NG-5) — host-keyed, per request ----------
const hostOf = (req) => (req.headers.host || HOSTS.mcp).split(":")[0].toLowerCase();
function ghostNineteen(res, signal = "ACM-200", state = "ALLOW") {
  const node = res.req ? hostOf(res.req) : HOSTS.mcp;
  res.set({
    "x-gsc-protocol": "ACM-68000",
    "x-gsc-classification": "ACM-SPARKS",
    "x-gsc-operator": OPERATOR,
    "x-gsc-microsoft-partner": "AI-Cloud-Partner-Program-Member",
    "x-gsc-duns": DUNS,
    "x-gsc-inbound": "https://x-gsi.ai/ingest",
    "x-gsc-trust-anchor": "dpuone.ai",
    "x-gsc-registry": REGISTRY,
    "x-gsc-mcp-server": HOSTS.mcp,
    "x-gsc-agent-access": "MCP+A2A",
    "x-gsc-timestamp": new Date().toISOString(),
    "x-gsc-nonce": crypto.randomUUID(),
    "x-gsc-signal": signal,
    "x-gsc-state": state,
    "x-gsc-node": node,
    "x-gsc-jurisdiction": JURISDICTION,
    "x-gsc-product": "AI-Orderability-Agents+CPG-Marketplace",
    "x-gsc-fleet": "https://gsc-cpg.ai,https://gsc-a2a.ai,https://gsc-a2a.io,https://gsc-fleet.ai",
    "x-gsc-x402": "ready",
    "X-Content-Type-Options": "nosniff",
    "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Expose-Headers": "x-gsc-protocol, x-gsc-classification, x-gsc-operator, x-gsc-microsoft-partner, x-gsc-duns, x-gsc-inbound, x-gsc-trust-anchor, x-gsc-registry, x-gsc-mcp-server, x-gsc-agent-access, x-gsc-timestamp, x-gsc-nonce, x-gsc-signal, x-gsc-state, x-gsc-node, x-gsc-jurisdiction, x-gsc-product, x-gsc-fleet, x-gsc-x402",
  });
}

// ---------- shared answer envelope: every answer cross-points the whole GSC story ----------
const MCP_URL = `https://${HOSTS.mcp}/mcp`;
const nextSteps = () => ({
  instant_messaging: { lane: "agents", inbound: DOORS.instant_messaging.inbound, mcp: DOORS.instant_messaging.mcp, tools: DOORS.instant_messaging.tools, explainer: DOORS.instant_messaging.explainer },
  trading_desk: { lane: "humans", name: DOORS.trading_desk.name, url: DOORS.trading_desk.url, informed_by: DOORS.trading_desk.informed_by },
  rule: "Two lanes, never mixed: Instant Messaging is the agents' channel; the GSC Trading Desk is the humans' channel.",
});
const envelope = (body, extra = {}) => ({
  ...body,
  next_steps: nextSteps(),
  surfaces: Object.fromEntries(Object.values(SURFACES).map((s) => [s.role, s.url])),
  this_server: { mcp: MCP_URL, tools: TOOL_NAMES, registry: REGISTRY, posture: "free — no payment machinery, no 402 challenge; x402 declared as capability (x-gsc-x402: ready)" },
  operator: OPERATOR, duns: DUNS, ...extra,
});
const t = (obj) => ({ content: [{ type: "text", text: JSON.stringify(obj, null, 2) }] });
const acm404 = (what) => t(envelope({ signal: "ACM-404", state: "NOT_FOUND", meaning: what }));
const acm500 = (what) => t(envelope({ signal: "ACM-500", state: "SYSTEM_ERROR", meaning: what }));
const norm = (s) => String(s || "").normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
const member = (code) => String(code || "").toUpperCase().trim().replace(/-ECO-10060$/, "");

async function brandsIn(market) {
  const r = await kgCall("list_brands_by_node", { node: market });
  const list = Array.isArray(r.brands) ? r.brands : [];
  return { count: r.brand_count ?? list.length, brands: list };
}
async function marketBlock(market) {
  try {
    const m = await kgCall("node_market", { code: market });
    return { code: m.code, jurisdiction: m.jurisdiction, member: MEMBER_FORM(m.code), region: m.region, gs1_territory_gtin: m.gs1_gtin,
      supply: m.supply, demand: m.demand, kg_universe: m.kg_universe, rule: m.rule };
  } catch { return { code: market, member: MEMBER_FORM(market), note: "market detail unavailable from the KG at this moment" }; }
}
const isDemo = (b) => norm(b) === norm(DEMO_BRAND.name);

// ---------- the eleven tools ----------
function buildMcp() {
  const mcp = new McpServer({ name: "gsc-marketplace", version: VERSION });
  const MKT = z.string().min(2).max(16).describe("SM-ECO-10060 member code or namespace, e.g. BR or BR-ECO-10060");

  mcp.registerTool("search_brands", {
    title: "Search Beauty & Personal Care brands in a market",
    description: `${MISSION} Step 1 — FOUND: search the brands the CPG Knowledge Graph covers in one of 50 markets (live, free). Returns brand names from the graph's SPARKS depth surface; then call get_brand to verify, get_brand_identifiers for the identifier policy. Depth: ${KG.depth_line}. Brands, makers and banners are separate registries — never summed.`,
    inputSchema: { market: MKT, query: z.string().max(80).optional().describe("Optional name fragment (accent-insensitive)"), limit: z.number().int().min(1).max(200).optional().describe("Max results, default 50") },
  }, async ({ market, query, limit }) => {
    const m = member(market);
    try {
      const { count, brands } = await brandsIn(m);
      const q = norm(query);
      const hits = (q ? brands.filter((b) => norm(b).includes(q)) : brands);
      const out = hits.slice(0, limit || 50);
      return t(envelope({ signal: "ACM-200", state: "ALLOW", market: m, member: MEMBER_FORM(m), query: query || null,
        brands_in_market: count, matched: hits.length, returned: out.length, brands: out,
        demo_brand_note: `${DEMO_BRAND.name} (${DEMO_BRAND.surface}) is GSC's demo-flagged reference brand — excluded from hero counts; it answers via get_brand like any other.`,
        how_to_act: "get_brand {brand, market} → verified tier · get_brand_identifiers {brand} → identifier policy · then one of the two doors.",
        source: { tool: "list_brands_by_node", mcp: KG.mcp } }));
    } catch (e) { return acm500(`Knowledge Graph unavailable for market ${m}: ${e.message}`); }
  });

  mcp.registerTool("get_brand", {
    title: "Verify one brand in a market — found, verified, answerable",
    description: "Step 2 — VERIFIED: is the brand on the CPG Knowledge Graph for this market, and at what SPARKS completeness tier (100 = resolvable pack/size record held · 8 = registered, pending · floor = STANDARD default). Returns the market's supply/demand context and both doors to act. No prices, no stock, no terms — those go through the doors.",
    inputSchema: { brand: z.string().min(1).max(120).describe("Brand name as spelled on the graph"), market: MKT },
  }, async ({ brand, market }) => {
    const m = member(market);
    try {
      const { brands } = await brandsIn(m);
      const exact = brands.find((b) => norm(b) === norm(brand));
      const near = exact ? [] : brands.filter((b) => norm(b).includes(norm(brand))).slice(0, 10);
      let kernel = null;
      try { kernel = await kgCall("get_kernel", { brand: exact || brand, node: m }); } catch { kernel = null; }
      const found = Boolean(exact);
      const tier = kernel ? kernel.kernel : null;
      const body = {
        signal: found ? "ACM-200" : "ACM-404", state: found ? "ALLOW" : "NOT_FOUND",
        brand: exact || brand, market: m, member: MEMBER_FORM(m),
        found, verified: { tier, resolvable: kernel ? kernel.resolvable === true : false, meaning: kernel ? kernel.note : "tier unavailable", in_kg_entity_universe: kernel?.kg_universe?.in_kg_entity_universe ?? null },
        answerable: found ? "Yes — act through a door: Instant Messaging lodges an RFQ/terms/escalation as an agent; the GSC Trading Desk answers as humans." : "Not on the graph for this market. Try search_brands, another market, or lodge the brand with the GSC Trading Desk.",
        ...(isDemo(brand) ? { demo: DEMO_BRAND } : {}),
        ...(near.length ? { near_matches: near } : {}),
        market_context: await marketBlock(m),
        source: { tools: ["list_brands_by_node", "get_kernel", "node_market"], mcp: KG.mcp },
      };
      return t(envelope(body));
    } catch (e) { return acm500(`Knowledge Graph unavailable for market ${m}: ${e.message}`); }
  });

  mcp.registerTool("get_brand_identifiers", {
    title: "Brand identifier policy — what the marketplace publishes and how to resolve what you hold",
    description: "Step 3 — ANSWERABLE: GSC publishes ONLY its own GS1-registered identifiers (the 990832300xxx block) on any surface; third-party GTINs are never stored on the graph's entity universe and never appear here. A GTIN the caller already holds resolves live on the CPG Knowledge Graph (resolve_gtin, resolve_sparks, check_eligibility). The demo brand carries GSC's rail GTIN.",
    inputSchema: { brand: z.string().min(1).max(120).describe("Brand name"), market: MKT.optional() },
  }, async ({ brand, market }) => {
    const m = market ? member(market) : null;
    const body = {
      signal: "ACM-200", state: "ALLOW", brand, market: m, member: m ? MEMBER_FORM(m) : null,
      policy: {
        published_here: "Only GSC-registered identifiers (GS1 Canada GEPIR, D-U-N-S 24-336-6774). No third-party GTIN is ever published on a GSC surface.",
        resolve_what_you_hold: { tool: "resolve_gtin / resolve_sparks / check_eligibility", mcp: KG.mcp, input: "the 13/14-digit GTIN you already hold (zero-padded to 14 by the graph)" },
        territory: m ? { tool: "resolve_node", mcp: KG.mcp, code: m, note: "returns the market's GS1 territory license GTIN (GSC-registered)" } : null,
      },
      ...(isDemo(brand) ? { identifiers: [{ type: "GTIN", value: DEMO_BRAND.gtin, note: DEMO_BRAND.gtin_note, resolver: `https://mcp.cpgknowledgegraph.ai/resolve?gtin=${DEMO_BRAND.gtin}` }], demo: DEMO_BRAND } : { identifiers: [], note: "No GSC-registered identifier is bound to this brand on the marketplace. Resolve a GTIN you hold on the Knowledge Graph, or lodge the brand through a door." }),
      signals: { "ACM-300": "answerable, but not here — resolve on the Knowledge Graph", "ACM-451": "anything creating obligation — route to a human through a door" },
    };
    return t(envelope(body));
  });

  mcp.registerTool("get_marketplace_operators", {
    title: "Neutral marketplace operator map, sorted by agentic posture",
    description: "The demand side per market as the CPG Knowledge Graph publishes it (retail banners — public registry data), each carrying an agentic-posture field from a fixed taxonomy and sorted by it. Neutral by design: no tiers, no pursuit language, no relationship claims, no named individuals. Posture is wire evidence only; 'unassessed' means none collected yet.",
    inputSchema: { market: MKT.optional().describe("Omit for the 50-market summary") },
  }, async ({ market }) => {
    const order = POSTURE_TAXONOMY.map((p) => p.posture);
    try {
      if (market) {
        const m = member(market);
        const mk = await kgCall("node_market", { code: m });
        const banners = (mk?.demand?.top_parent_banners || []).map((b) => ({ operator: b.parent_banner, posture: "unassessed", evidence: null }));
        banners.sort((a, b) => order.indexOf(a.posture) - order.indexOf(b.posture) || a.operator.localeCompare(b.operator));
        return t(envelope({ signal: "ACM-200", state: "ALLOW", market: m, member: MEMBER_FORM(m), retail_banners_in_market: mk?.demand?.retailers ?? null,
          operators: banners, posture_taxonomy: POSTURE_TAXONOMY, sort: "by posture (taxonomy order), then name", neutrality: "no tiers · no pursuit language · no relationship claims · no named individuals",
          source: { tool: "node_market", mcp: KG.mcp, registry: "retail banners — the KG demand-side public registry" } }));
      }
      const cov = await kgCall("count_gtin_coverage", {});
      return t(envelope({ signal: "ACM-200", state: "ALLOW", markets: 50, retail_banners_total: KG.depth.banners, by_region: cov?.retailers_by_region || null,
        posture_taxonomy: POSTURE_TAXONOMY, how: "call with {market} for that market's operator map", neutrality: "no tiers · no pursuit language · no relationship claims · no named individuals",
        source: { tool: "count_gtin_coverage", mcp: KG.mcp } }));
    } catch (e) { return acm500(`Knowledge Graph unavailable: ${e.message}`); }
  });

  mcp.registerTool("instant_message_agents", {
    title: "Instant Messaging for agents — the agents' door",
    description: "How an agent lodges an RFQ, a terms request, or an escalation with GreenCore Solutions Corp. — typed, identified, ticketed, human-signed (IA-MESSAGE). Points at the existing door: the x-gsc-inbound address and the transaction MCP. No new write path here.",
    inputSchema: {},
  }, async () => t(envelope({ signal: "ACM-200", state: "ALLOW", door: DOORS.instant_messaging,
    call_shape: { endpoint: DOORS.instant_messaging.mcp, transport: "streamable-http", example: { jsonrpc: "2.0", id: 1, method: "tools/call", params: { name: "submit_rfq", arguments: { "…": "see tools/list on the transaction MCP for the schema" } } } },
    standard: SPINE.find((s) => s.name === "IA-MESSAGE") })));

  mcp.registerTool("contact_trading_desk", {
    title: "GSC Trading Desk — the humans' door",
    description: "The human channel. The GSC Trading Desk is informed by Navigator across all GSC agentic assets — a human reads, a human answers. Use it for anything a person should decide; agents use Instant Messaging.",
    inputSchema: {},
  }, async () => t(envelope({ signal: "ACM-200", state: "ALLOW", door: DOORS.trading_desk, what_to_bring: ["your market(s)", "the brand or category", "the question a human should answer"],
    guarantee: "Human-in-the-Loop on every purchase order." })));

  mcp.registerTool("get_x402_rail", {
    title: "x402 capability declaration",
    description: "What GSC-Marketplace declares about x402: network, asset, status — and nothing else. Capability, never terms: no price is published on any GSC surface, no 402 challenge is issued; everything here is free in v1.",
    inputSchema: {},
  }, async () => t(envelope({ signal: "ACM-200", state: "ALLOW", posture: POSTURE.v1, x402: POSTURE.x402, wire: "every gen-2 GSC response carries x-gsc-x402: ready (header 19 of the Ghost Nineteen)" })));

  mcp.registerTool("get_radar", {
    title: "GSC Radar — the network numbers bulletin",
    description: "The public network figures as GSC Radar publishes them (live JSON), macro numbers only.",
    inputSchema: {},
  }, async () => {
    try {
      const r = await fetch(RADAR.json, { signal: AbortSignal.timeout(8000) });
      const j = await r.json();
      return t(envelope({ signal: "ACM-200", state: "ALLOW", radar: RADAR, bulletin: j }));
    } catch (e) { return t(envelope({ signal: "ACM-300", state: "CONDITIONAL", radar: RADAR, meaning: `Read it at ${RADAR.json} — live fetch did not complete (${e.message}).` })); }
  });

  mcp.registerTool("get_cpg_knowledge_graph", {
    title: "The CPG Knowledge Graph — data surface",
    description: `${KG.depth_line}. The Beauty & Personal Care source of truth for AI agents, classified on SPARKS; 14 read tools over MCP; the data surface every marketplace answer resolves against.`,
    inputSchema: {},
  }, async () => t(envelope({ signal: "ACM-200", state: "ALLOW", knowledge_graph: KG })));

  mcp.registerTool("get_acm_68000", {
    title: "ACM-68000 — the seven procurement signals",
    description: "The deterministic signal protocol every GSC surface speaks: seven signals, GS1-anchored, append-only, non-substitutable. Canon resolves on acm-68000.ai / .org and the standards beacon; the gen-2 door is cpg-68000.ai.",
    inputSchema: {},
  }, async () => t(envelope({ signal: "ACM-200", state: "ALLOW", acm_68000: ACM_68000 })));

  mcp.registerTool("get_aio_agent_fleet", {
    title: "AI Orderability (AIO) Agents — the gen-2 fleet",
    description: "The AIO Agent class and its regional hosts: signed, resident, addressable resolvers with market × category remits — the NextGen identity register is the signed Card, verifiable against each host's jwks. Status is only what the wire says.",
    inputSchema: {},
  }, async () => t(envelope({ signal: "ACM-200", state: "ALLOW", aio_agent_fleet: AIO_FLEET, spine: SPINE })));

  return mcp;
}

// ---------- HTTP ----------
const app = express();
app.set("trust proxy", true);
app.use(express.json({ limit: "256kb" }));

// Family hosts → 308 to the canonical apex (method + body preserved). www.mcp is not a host.
const REDIRECT_HOSTS = new Set([`www.${HOSTS.apex}`, ...HOSTS.family.flatMap((h) => [h, `www.${h}`])]);
app.use((req, res, next) => {
  const h = hostOf(req);
  if (REDIRECT_HOSTS.has(h)) { ghostNineteen(res); return res.redirect(308, `https://${HOSTS.apex}${req.originalUrl || "/"}`); }
  next();
});

// Discovery kit (17-check set) + apex HTML/markdown — registered before /mcp and the JSON root.
mountKit(app, { title: TITLE, desc: DESC, ghost: ghostNineteen, apexHtml, apexMd });
// x402 — the live test endpoint (door free; /x402/resolve is the single paid endpoint)
mountX402(app, ghostNineteen);

// Public JSON for the WebMCP tool and humans: brands per market (same source as search_brands)
app.get("/brands.json", async (req, res) => {
  ghostNineteen(res);
  const m = member(req.query.market); const q = norm(req.query.q);
  if (!/^[A-Z]{2,4}$/.test(m)) { ghostNineteen(res, "ACM-404", "NOT_FOUND"); return res.status(404).json({ error: "market required", example: "/brands.json?market=BR&q=bio" }); }
  try { const { count, brands } = await brandsIn(m); const hits = q ? brands.filter((b) => norm(b).includes(q)) : brands;
    res.json({ market: m, member: MEMBER_FORM(m), brands_in_market: count, matched: hits.length, brands: hits.slice(0, 100), source: KG.mcp, next_steps: nextSteps() });
  } catch (e) { ghostNineteen(res, "ACM-500", "SYSTEM_ERROR"); res.status(502).json({ error: "knowledge graph unavailable", detail: e.message }); }
});

app.post("/mcp", async (req, res) => {
  ghostNineteen(res);
  try {
    const mcp = buildMcp();
    const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined });
    res.on("close", () => { transport.close(); mcp.close(); });
    await mcp.connect(transport);
    await transport.handleRequest(req, res, req.body);
  } catch (err) {
    console.error("MCP request error:", err.message);
    if (!res.headersSent) { ghostNineteen(res, "ACM-500", "SYSTEM_ERROR"); res.status(500).json({ jsonrpc: "2.0", error: { code: -32603, message: "Internal server error" }, id: null }); }
  }
});
app.get("/mcp", (req, res) => { ghostNineteen(res); res.status(405).json({ error: "Method not allowed. POST JSON-RPC to /mcp.", tools: TOOL_NAMES }); });

const bc = (handler) => (req, res) => { ghostNineteen(res); res.json(handler(req)); };
app.get("/health", bc((req) => ({ protocol: "ACM-68000", version: VERSION, status: "active", node: hostOf(req), role: "marketplace-selection-mcp", stateless: true, operator: OPERATOR, operator_url: OPERATOR_URL, tools: TOOL_NAMES, registry: REGISTRY, x402: "ready" })));
app.get("/mission.json", bc(() => ({ mission: MISSION, surfaces: SURFACES, doors: DOORS, posture: POSTURE })));
app.get("/tools.json", bc(() => ({ mcp: MCP_URL, transport: "streamable-http", tools: TOOL_NAMES, registry: REGISTRY })));
app.get("/spine.json", bc(() => ({ spine: SPINE, acm_68000: ACM_68000 })));
app.get("/aio-fleet.json", bc(() => AIO_FLEET));

// Root on the MCP host — the brochure JSON (the apex root is HTML via the kit)
app.get("/", bc((req) => ({
  service: "GSC-Marketplace",
  what: `GSC-MARKETPLACE v${VERSION} — THE SELECTION SURFACE. ${MISSION} ${KG.depth_line} on the CPG Knowledge Graph (classification standard: SPARKS). Eleven MCP tools: search_brands · get_brand · get_brand_identifiers · get_marketplace_operators · instant_message_agents · contact_trading_desk · get_x402_rail · get_radar · get_cpg_knowledge_graph · get_acm_68000 · get_aio_agent_fleet. Two doors, never mixed — Instant Messaging for agents, the GSC Trading Desk for humans. Everything free; x402 declared as capability (x-gsc-x402: ready). AI Orderability (AIO) Agents: ${AIO_FLEET.program_total} signed, resident resolvers across ${AIO_FLEET.hosts.length} regions. ACM-68000 protocol. GSC is a Microsoft AI Cloud Partner.`,
  mission: MISSION,
  operator: OPERATOR, operator_url: OPERATOR_URL, duns: DUNS, microsoft_partner: "Microsoft AI Cloud Partner",
  endpoint: `https://${hostOf(req)}`, version: VERSION, role: "marketplace-selection-mcp", stateless: true, posture: POSTURE.v1,
  mcp: { transport: "streamable-http", url: MCP_URL }, tools: TOOL_NAMES, registry: REGISTRY,
  human_surface: `https://${HOSTS.apex}/`,
  doors: DOORS, surfaces: SURFACES, knowledge_graph: KG, x402: POSTURE.x402, spine: SPINE,
  machine_surfaces: { health: `https://${hostOf(req)}/health`, mission: `https://${hostOf(req)}/mission.json`, tools: `https://${hostOf(req)}/tools.json`, spine: `https://${hostOf(req)}/spine.json`, aio_fleet: `https://${hostOf(req)}/aio-fleet.json`, agent_card: `https://${hostOf(req)}/.well-known/agent-card.json`, server_card: `https://${hostOf(req)}/.well-known/mcp/server-card.json`, ai_catalog: `https://${hostOf(req)}/.well-known/ai-catalog.json`, llms: `https://${hostOf(req)}/llms.txt` },
})));

// Honest 404 — shaped ACM-404, the Nineteen on it
app.use((req, res) => { ghostNineteen(res, "ACM-404", "NOT_FOUND"); res.status(404).json({ error: "not_found", signal: "ACM-404", state: "NOT_FOUND", node: hostOf(req), operator: OPERATOR, mcp: MCP_URL, trading_desk: DOORS.trading_desk.url }); });

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`GSC-Marketplace v${VERSION} listening on :${PORT}`));
