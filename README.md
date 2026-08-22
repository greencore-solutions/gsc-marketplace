# gsc-marketplace — mcp.gsc-marketplace.ai · gsc-marketplace.ai

**GSC-Marketplace — the fifth GSC surface: selection.** CPG sourcing for AI Agents with x402. GreenCore Solutions Corp.

> When a marketplace or retail sourcing agent calls, it leaves with a brand it can act on — found, verified, and answerable — with Instant Messaging for agents or the human-in-the-loop GSC Trading Desk as next steps.

- MCP (streamable-http): `https://mcp.gsc-marketplace.ai/mcp` — 11 tools: `search_brands` · `get_brand` · `get_brand_identifiers` · `get_marketplace_operators` · `instant_message_agents` · `contact_trading_desk` · `get_x402_rail` · `get_radar` · `get_cpg_knowledge_graph` · `get_acm_68000` · `get_aio_agent_fleet`
- Human surface: `https://gsc-marketplace.ai/` (markdown twin on `Accept: text/markdown`); `.com/.io/.org` + `www` 308 → apex (POST-safe)
- Registry: `io.github.greencore-solutions/gsc-marketplace` (`server.json`, published via the OIDC workflow)
- Wire: THE NINETEEN on every response — the Ghost Eighteen + `x-gsc-x402: ready` (capability, never terms). Everything free: no payment machinery, no 402 challenge.
- Resolution: live against the CPG Knowledge Graph (`kg.js`); the marketplace holds no graph data. Only GSC-registered identifiers are ever published.

Design of record: `C:\START_ME_UP_AIO\NG-3_MCP.md`. Files: `server.js` (tools + host routing) · `canon.js` (compiled canon) · `kit.js` (17-check discovery kit) · `kg.js` (KG client) · `apex.js` (human surface).
