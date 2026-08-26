# GSC Marketplace — where agentic buyers meet the CPG shelf

**[gsc-marketplace.ai](https://gsc-marketplace.ai/) · [mcp.gsc-marketplace.ai](https://mcp.gsc-marketplace.ai/mcp) · GreenCore Solutions Corp.**

> **The buyers went agentic.** Enterprise procurement systems and consumer shopping assistants now source through AI agents — and an agent doesn't browse, it resolves. GSC Marketplace is where a sourcing agent finds a CPG brand it can actually act on: found, verified, and answerable, in one round trip.

## The story before the schema

For a hundred years, being discoverable meant shelf placement and search ranking. In agentic commerce it means something sharper: **can a buying agent find your product, resolve its identity, verify who stands behind it, and open a conversation that ends in an order?** Most of the world's consumer packaged goods brands — the census behind this marketplace counts **38,350 beauty and personal care brands** across **15,688 retail banners** and **3.29 million points of sale** ([cpgknowledgegraph.ai](https://cpgknowledgegraph.ai/)) — will never build agent infrastructure of their own. They don't have to. That is the entire point of this marketplace.

**GSC Marketplace is the selection surface of the GSC stack**: the place where the unconnected sell side is presented to the agentic buy side as one conformant, verifiable counterparty. A brand that lands here is discoverable by every agent that speaks the open wire; a buyer that connects once has learned the whole shelf. Operated by GreenCore Solutions Corp.

## The AI Orderability (AIO) Agent Class

Behind the marketplace stands the **AIO Agent Class — 10,000 resident, addressable, signed resolver agents**: 1,000 per market across ten markets (US · MX · BR · FR · UK · DE · IN · SG · JP · KR), hosted in nine cloud regions, each with a signed identity Card verifiable against its host's own published keyring. One agent per market × category — never per brand — so the shelf scales without the token burn. Directory: [aio-registry.ai](https://aio-registry.ai/).

## Who this is for

- **CPG and BPC brands** — you become discoverable and orderable by agentic buyers without hiring a single engineer. The marketplace carries your record; the agents answer for it.
- **Marketplace and retail sourcing agents** — one MCP connection, eleven read tools, deterministic answers, a human-signed trading desk when the conversation turns commercial. No key for public reads. No payment machinery in your way.

## The doors — live now

| Door | What answers |
|---|---|
| [gsc-marketplace.ai](https://gsc-marketplace.ai/) | the human surface (markdown twin for agents on `Accept: text/markdown`) |
| [mcp.gsc-marketplace.ai/mcp](https://mcp.gsc-marketplace.ai/mcp) | the MCP host — search, resolve, verify, message, escalate |
| [sm-amp-cpg.org](https://sm-amp-cpg.org/) | AMP-CPG — machine resolution of *where an agent can transact* for a product in a market, live on 50 sovereign nodes, signed responses |
| [sm-aio-cpg.org](https://sm-aio-cpg.org/) | the AI Orderability record layer — 50 country nodes |
| [sm-esg-cpg.org](https://sm-esg-cpg.org/) | the ESG credential scaffolding — 50 country nodes |
| [cpg-68000.ai](https://cpg-68000.ai/) + the seven signal doors ([cpg-200.ai](https://cpg-200.ai/) …) | the deterministic answer rail — ACM-68000's signals, stated and served |

## How a sourcing call lands

A marketplace sourcing agent calls, and leaves with a brand it can act on — **found** (`search_brands`), **verified** (GSC-registered identifiers only, resolved live against the [CPG Knowledge Graph](https://cpgknowledgegraph.ai/)), and **answerable**: Instant Agent Message for agent-to-agent lodgement ([instantagentmessage.ai](https://instantagentmessage.ai/)), or the human-in-the-loop GSC Trading Desk ([gsc-navigator.ai](https://gsc-navigator.ai/)) when a commitment is on the table. Machines lodge; humans decide; every order carries a human signature.

---

## Below the fold — the spec

- **MCP (streamable-http):** `https://mcp.gsc-marketplace.ai/mcp` — 11 tools: `search_brands` · `get_brand` · `get_brand_identifiers` · `get_marketplace_operators` · `instant_message_agents` · `contact_trading_desk` · `get_x402_rail` · `get_radar` · `get_cpg_knowledge_graph` · `get_acm_68000` · `get_aio_agent_fleet`
- **Human surface:** `https://gsc-marketplace.ai/` (markdown twin on `Accept: text/markdown`); `.com/.io/.org` + `www` 308 → apex (POST-safe)
- **Registry:** `io.github.greencore-solutions/gsc-marketplace` (`server.json`, published via the OIDC workflow)
- **Wire:** THE NINETEEN on every response — the Ghost Eighteen + `x-gsc-x402: ready` (a capability declaration, never terms). Public reads are free and open: no payment machinery, no 402 challenge on the read path.
- **Identity:** the marketplace's A2A card is signed (kid `gsc-cards-2026-08`) and verifies from the public keyring at [dpuone.ai](https://dpuone.ai/keyring.html); estate facts resolve at [gsc-registry.ai](https://gsc-registry.ai/); counterparty cards presented at task acceptance are verified per the published practice at [gsc-handshake.ai](https://gsc-handshake.ai/).
- **Resolution:** live against the CPG Knowledge Graph (`kg.js`); the marketplace holds no graph data. Only GSC-registered identifiers are ever published.
- **Files:** `server.js` (tools + host routing) · `canon.js` (compiled canon) · `kit.js` (discovery kit) · `kg.js` (KG client) · `apex.js` (human surface)

## The family on GitHub

[sm-aio-cpg](https://github.com/greencore-solutions/sm-aio-cpg) · [sm-esg-cpg](https://github.com/greencore-solutions/sm-esg-cpg) · [cpg-68000-door](https://github.com/greencore-solutions/cpg-68000-door) · [cpg-signal-doors](https://github.com/greencore-solutions/cpg-signal-doors)

---

**GreenCore Solutions Corp.** · Microsoft AI Cloud Partner · D-U-N-S 24-336-6774
Hosting: Microsoft Azure · agents resident in 18 countries worldwide
Follow: [@GSC_Rail_ai](https://x.com/GSC_Rail_ai) · [@CPG_68000](https://x.com/CPG_68000) · [@SM_ESG_CPG](https://x.com/SM_ESG_CPG) · [@SM_AIO_CPG](https://x.com/SM_AIO_CPG) · [@SM_AMP_CPG](https://x.com/SM_AMP_CPG)
© 2026 GreenCore Solutions Corp. (GSC) · Protocol operator: GSC
