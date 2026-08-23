// ============================================================
// canon.js — GSC-Marketplace compiled canon  v1.0.0
// GreenCore Solutions Corp. · design of record: C:\START_ME_UP_AIO\NG-3_MCP.md
// Only real things: every value here is a CEO ruling, a live-wire read
// (2026-08-22), or a pointer to the surface that answers live.
// ============================================================

export const VERSION = "1.1.1";
export const OPERATOR = "GreenCore Solutions Corp.";
export const OPERATOR_URL = "https://gsc-em.com";
export const DUNS = "24-336-6774";

export const HOSTS = {
  mcp: "mcp.gsc-marketplace.ai",
  apex: "gsc-marketplace.ai",
  family: ["gsc-marketplace.com", "gsc-marketplace.io", "gsc-marketplace.org"],
};

// The mission — canon, verbatim (NG-3 §1)
export const MISSION =
  "When a marketplace or retail sourcing agent calls, it leaves with a brand it can act on — found, verified, and answerable — with Instant Messaging for agents or the human-in-the-loop GSC Trading Desk as next steps.";

// The five surfaces (NG-3 §2)
export const SURFACES = {
  data: { role: "data", name: "CPG Knowledge Graph", url: "https://mcp.cpgknowledgegraph.ai", mcp: "https://mcp.cpgknowledgegraph.ai/mcp" },
  discovery: { role: "discovery", name: "GSC Carrier Fleet", url: "https://mcp.gsc-fleet.ai", mcp: "https://mcp.gsc-fleet.ai/mcp" },
  transaction: { role: "transaction", name: "CPG Human-in-the-Loop", url: "https://mcp.cpghumanintheloop.ai", mcp: "https://mcp.cpghumanintheloop.ai/mcp" },
  standards: { role: "standards", name: "CPG Agent Protocols", url: "https://mcp.cpgagentprotocols.ai", mcp: "https://mcp.cpgagentprotocols.ai/mcp" },
  selection: { role: "selection", name: "GSC-Marketplace", url: "https://mcp.gsc-marketplace.ai", mcp: "https://mcp.gsc-marketplace.ai/mcp" },
};

// The two doors — never mixed (NG-3 §4). Both in every complete answer.
export const DOORS = {
  instant_messaging: {
    lane: "agents",
    name: "Instant Messaging for agents (IA-MESSAGE)",
    declared_by: "x-gsc-inbound header on every GSC surface",
    inbound: "https://x-gsi.ai/ingest",
    explainer: "https://instantagentmessage.ai",
    mcp: "https://mcp.cpghumanintheloop.ai/mcp",
    tools: ["submit_rfq", "check_rfq_status", "request_terms", "escalate"],
    ticket_grammar: "HITL-YYYYMMDD-XXXXXX",
    guarantee: "Every message is typed, identified, ticketed, and human-signed. Nothing settles without a human.",
  },
  trading_desk: {
    lane: "humans",
    name: "GSC Trading Desk",
    url: "https://gsc-navigator.ai/",
    informed_by: "The GSC Trading Desk is informed by Navigator across all GSC agentic assets.",
    note: "Navigator is the intelligence layer, never the contact point. The Trading Desk is the human channel.",
  },
};

// Posture (NG-3 §3) + x402 capability (NG-5 header 19; NG-4 §4)
export const POSTURE = {
  v1: "Max discovery, everything FREE. No payment machinery, no HTTP 402 challenges. x402 is displayed as capability only.",
  x402: {
    protocol: "x402",
    header: { name: "x-gsc-x402", value: "ready" },
    network: "Base",
    chain: "eip155:8453",
    asset: "USDC",
    status: "staged",
    terms: "none published — pricing is never published on a GSC surface; a 402 response would carry terms if anything were ever priced, and nothing is",
    pay_to: "not published",
  },
};

// KG depth numbers — lead with these, verbatim (NG-3 §6). SPARKS named once.
export const KG = {
  name: "CPG Knowledge Graph",
  depth: { brands: 24126, makers: 5928, banners: 2020, markets: 50 },
  depth_line: "24,126 brands · 5,928 makers · 2,020 banners · 50 markets",
  classification_standard: "SPARKS",
  mcp: "https://mcp.cpgknowledgegraph.ai/mcp",
  tools: ["resolve_gtin","check_eligibility","get_signal_chain","count_gtin_coverage","resolve_scope","list_nodes","resolve_node","node_market","list_sku_types","list_brands_by_node","get_kernel","resolve_sparks","find_makers","find_retailers"],
  rule: "Brands, makers, and retail banners are separate registries — never summed.",
};

// ACM-68000 — the seven signals, as served on acm-68000.ai/signals.json (2026-08-22). GS1-anchored, append-only.
export const ACM_68000 = {
  protocol: "ACM-68000",
  parent_gtin: "990832300716",
  home: { ai: "https://acm-68000.ai", org: "https://acm-68000.org", beacon: "https://mcp.cpgagentprotocols.ai" },
  gen2_door: "https://cpg-68000.ai",
  signals: [
    { code: "ACM-000", state: "NOT_APPLICABLE", gtin: "990832300785", action: "No action required." },
    { code: "ACM-200", state: "ALLOW", gtin: "990832300778", action: "Execute the transaction." },
    { code: "ACM-300", state: "CONDITIONAL", gtin: "990832300761", action: "Evaluate before proceeding." },
    { code: "ACM-403", state: "RESTRICT", gtin: "990832300754", action: "Halt transaction." },
    { code: "ACM-404", state: "NOT_FOUND", gtin: "990832300747", action: "Abort transaction." },
    { code: "ACM-451", state: "ESCALATE", gtin: "990832300730", action: "Route to a human." },
    { code: "ACM-500", state: "SYSTEM_ERROR", gtin: "990832300723", action: "Retry or escalate." },
  ],
};

// GSC Radar — the network numbers bulletin (live JSON on the wire)
export const RADAR = { url: "https://gsc-radar.ai/", json: "https://gsc-radar.ai/radar.json" };

// The demo brand — first brand, demo-flagged, excluded from hero counts (NG-3 §6)
export const DEMO_BRAND = {
  name: "elyssah",
  surface: "https://elyssah.ai",
  record: "https://elyssah.ai/elyssah.json",
  flag: "demo — a proto-agentic Skin First beauty brand invented by GreenCore Solutions Corp. for case-study purposes (Contoso/Fabrikam tradition); the infrastructure is real",
  excluded_from_hero_counts: true,
  gtin: "990832300082",
  gtin_note: "GSC-registered rail GTIN (GSC Agent Rail Access License – BPC National Brand). The only identifier the marketplace publishes for this brand.",
};

// AIO Agent fleet — gen-2 program (NG-2). Status is only ever set from what is on the wire.
export const AIO_FLEET = {
  class: "AIO Agent — AI Orderability (AIO) Agents: resident, addressable, signed resolvers",
  program_total: 10000,
  per_host: 1000,
  identity: "signed Cards (Ed25519, key id gsc-aio-cards-2026-08) verifiable against each host's /.well-known/jwks.json — the NextGen identity register",
  unit_of_remit: "market × category (never a brand)",
  hosts: [
    { cc: "us", host: "us.gsc-marketplace.ai", jurisdiction: "US-ECO-10060", region: "South Central US", status: "live", cards: 1000, jwks: "https://us.gsc-marketplace.ai/.well-known/jwks.json", index: "https://us.gsc-marketplace.ai/index.json" },
    { cc: "mx", host: "mx.gsc-marketplace.ai", jurisdiction: "MX-ECO-10060", region: "South Central US (compute) · Mexico Central (Log Analytics) — Container Apps not GA in Mexico Central", status: "live", cards: 1000, jwks: "https://mx.gsc-marketplace.ai/.well-known/jwks.json", index: "https://mx.gsc-marketplace.ai/index.json" },
    { cc: "br", host: "br.gsc-marketplace.ai", jurisdiction: "BR-ECO-10060", region: "Brazil South", status: "live", cards: 1000, jwks: "https://br.gsc-marketplace.ai/.well-known/jwks.json", index: "https://br.gsc-marketplace.ai/index.json" },
    { cc: "fr", host: "fr.gsc-marketplace.ai", jurisdiction: "FR-ECO-10060", region: "France Central", status: "live", cards: 1000, jwks: "https://fr.gsc-marketplace.ai/.well-known/jwks.json", index: "https://fr.gsc-marketplace.ai/index.json" },
    { cc: "uk", host: "uk.gsc-marketplace.ai", jurisdiction: "UK-ECO-10060", region: "UK South", status: "live", cards: 1000, jwks: "https://uk.gsc-marketplace.ai/.well-known/jwks.json", index: "https://uk.gsc-marketplace.ai/index.json" },
    { cc: "de", host: "de.gsc-marketplace.ai", jurisdiction: "DE-ECO-10060", region: "Germany West Central", status: "live", cards: 1000, jwks: "https://de.gsc-marketplace.ai/.well-known/jwks.json", index: "https://de.gsc-marketplace.ai/index.json" },
    { cc: "in", host: "in.gsc-marketplace.ai", jurisdiction: "IN-ECO-10060", region: "Central India", status: "live", cards: 1000, jwks: "https://in.gsc-marketplace.ai/.well-known/jwks.json", index: "https://in.gsc-marketplace.ai/index.json" },
    { cc: "sg", host: "sg.gsc-marketplace.ai", jurisdiction: "SG-ECO-10060", region: "Southeast Asia", status: "live", cards: 1000, jwks: "https://sg.gsc-marketplace.ai/.well-known/jwks.json", index: "https://sg.gsc-marketplace.ai/index.json" },
    { cc: "jp", host: "jp.gsc-marketplace.ai", jurisdiction: "JP-ECO-10060", region: "Japan East", status: "live", cards: 1000, jwks: "https://jp.gsc-marketplace.ai/.well-known/jwks.json", index: "https://jp.gsc-marketplace.ai/index.json" },
    { cc: "kr", host: "kr.gsc-marketplace.ai", jurisdiction: "KR-ECO-10060", region: "Korea Central", status: "live", cards: 1000, jwks: "https://kr.gsc-marketplace.ai/.well-known/jwks.json", index: "https://kr.gsc-marketplace.ai/index.json" },
  ],
  status_line: "10 hosts live 2026-08-23 — 10,000 signed AIO Agents, verified per host (19 headers, slot extents, signatures, structural guards, agent-readiness scan)",
  program_total_all_classes: { aio_agents: 10000, gen1_carriers: 22597, total: 32597, label: "32,500+", live_truth: "https://mcp.gsc-fleet.ai/stats.json" },
  gen1_reference: { program: "22,500+ Carrier program", live_truth: "https://mcp.gsc-fleet.ai/stats.json", note: "gen-1 Carrier class is frozen; read its numbers from the fleet MCP, never from here" },
};

// Gen-2 standards spine
export const SPINE = [
  { name: "SM-AIO-CPG", role: "AI Orderability record layer — brand records lodged once, resolved by any agent, returned as lodged", url: "https://sm-aio-cpg.org" },
  { name: "SM-ESG-CPG", role: "ESG credential scaffolding — claim attribution, never certification", url: "https://sm-esg-cpg.org" },
  { name: "CPG-68000", role: "the seven-signal procurement protocol, gen-2 door (ACM-68000 canon continues to resolve)", url: "https://cpg-68000.ai" },
  { name: "IA-MESSAGE", role: "Instant Agent Message — typed, identified, ticketed, human-signed", url: "https://instantagentmessage.ai" },
];

// Marketplace operator map — agentic posture taxonomy. Neutral: no tiers, no pursuit language,
// no relationship claims, no named individuals. Names that appear come only from the KG's public
// demand-side registry (retail banners), never from anywhere else.
export const POSTURE_TAXONOMY = [
  { posture: "declared-mcp", meaning: "operator publishes an MCP endpoint or server card on its own surface" },
  { posture: "declared-a2a", meaning: "operator publishes an A2A agent card" },
  { posture: "observed-agent-traffic", meaning: "operator's agents have reached a GSC door (receipted in hitl.tickets)" },
  { posture: "unassessed", meaning: "no wire evidence collected yet" },
];

export const TOOL_NAMES = [
  "search_brands", "get_brand", "get_brand_identifiers", "get_marketplace_operators",
  "instant_message_agents", "contact_trading_desk", "get_x402_rail", "get_radar",
  "get_cpg_knowledge_graph", "get_acm_68000", "get_aio_agent_fleet",
];

// Member registry for the ten build regions + the SM-ECO-10060 namespace form (BR-ECO-10060)
export const MEMBER_FORM = (code) => `${String(code).toUpperCase()}-ECO-10060`;
