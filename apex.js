// apex.js — gsc-marketplace.ai human surface. gsc-global.ai layout pattern (NEXTGEN shell: ring lockup,
// six-tab nav, Archivo/Inter/Plex Mono, orange-on-warm-white), built for the billboard ruling:
// day-1 published layer = an ad for marketplace-manager and sourcing agents — counts and capability ONLY,
// no brand names; counterfeit/clean-chain ≤ 2 sentences, category-level, never leads;
// procurement register = the buyer's window. Markdown twin for Accept: text/markdown.
import { OPERATOR, DUNS, KG, DOORS, HOSTS, TOOL_NAMES, POSTURE, SURFACES, SPINE, AIO_FLEET, ACM_68000 } from "./canon.js";

const MCP = `https://${HOSTS.mcp}/mcp`;
const TD = DOORS.trading_desk.url;

export function apexHtml() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>GSC-Marketplace — CPG sourcing for AI Agents | GreenCore Solutions Corp.</title>
<meta name="description" content="GSC-Marketplace: CPG sourcing for AI Agents with x402 — Beauty & Personal Care brands found, verified and answerable across 50 markets; Instant Messaging for agents, the GSC Trading Desk for humans.">
<link rel="canonical" href="https://${HOSTS.apex}/">
<meta property="og:title" content="GSC-Marketplace — CPG sourcing for AI Agents">
<meta property="og:description" content="A brand it can act on — found, verified, answerable. ${KG.depth_line}. Eleven MCP tools. Two doors.">
<meta property="og:url" content="https://${HOSTS.apex}/">
<meta property="og:type" content="website">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath fill='%23141414' fill-rule='evenodd' d='M50 5a45 45 0 1 0 0 90 45 45 0 0 0 0-90zm0 24a21 21 0 1 1 0 42 21 21 0 0 1 0-42z'/%3E%3C/svg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400..800&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
:root{--orange:#F38020;--ink:#141414;--grey:#6E6E6E;--hair:#ECE9E3;--panel:#F7F6F3;--white:#FFFFFF}
*{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth}
body{font-family:'Inter',system-ui,sans-serif;color:var(--ink);background:var(--white);font-size:17px;line-height:1.65;-webkit-font-smoothing:antialiased;padding-top:62px}
.wrap{max-width:1080px;margin:0 auto;padding:0 24px}
h1,h2,h3{font-family:'Archivo',sans-serif;line-height:1.12;letter-spacing:-0.01em}
a{color:var(--orange);text-decoration:none}
a:hover{color:#c96812}
.mono{font-family:'IBM Plex Mono',monospace}
.eyebrow{font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--orange);font-weight:500}
section{padding:80px 0;border-top:1px solid var(--hair)}
.card{border:1px solid var(--hair);border-radius:12px;background:var(--panel);padding:26px 24px}
.chips{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px}
.chip{border:1px solid var(--hair);border-radius:12px;background:var(--panel);padding:22px 20px;min-width:0}
.chip b{font-family:'Archivo',sans-serif;font-size:34px;font-weight:700;color:var(--orange);display:block;line-height:1.1}
.chip span{display:block;font-size:13px;color:var(--grey);margin-top:6px}
.ng-topbar{position:fixed;top:0;left:0;right:0;background:rgba(255,255,255,.96);backdrop-filter:blur(6px);border-bottom:1px solid #ECE9E3;z-index:100}
.ng-bar{max-width:1080px;margin:0 auto;padding:0 24px;height:62px;display:flex;align-items:center;justify-content:space-between;gap:14px}
.ng-lockup{display:flex;align-items:center;gap:10px;text-decoration:none}
.ng-lockup .mark{width:34px;height:34px;flex:0 0 auto;fill:#141414}
.ng-wordmark{font-family:'Archivo','Inter',system-ui,sans-serif;font-weight:700;font-size:19px;color:#141414}
.ng-tabs{display:flex;gap:22px;flex-wrap:wrap}
.ng-tabs a{font-weight:500;font-size:14px;letter-spacing:.06em;color:#6E6E6E;text-decoration:none;padding:4px 0;border-bottom:2px solid transparent}
.ng-tabs a:hover{color:#141414}.ng-tabs a.active{color:#141414;border-bottom-color:#F38020}
@media(max-width:760px){.ng-tabs{gap:12px}.ng-tabs a{font-size:12px}}
.hero{padding:140px 0 70px;border-top:0}
.hero .eyebrow{margin:0}
.hero h1{font-size:clamp(38px,6vw,64px);font-weight:700;color:#141414;margin:14px 0 0}
.hero h1 em{font-style:normal;color:#F38020}
.hero .sub{margin:16px 0 0;font-size:21px;font-weight:600;line-height:1.35;color:#F38020;max-width:40ch}
.hero .mech{margin:24px 0 0;font-size:17.5px;line-height:1.7;color:#141414;max-width:66ch}
.hero .triad{margin:26px 0 0;font-family:'Archivo',sans-serif;font-size:19px;font-weight:700}
.hero .triad i{font-style:normal;color:var(--orange)}
.cta-row{display:flex;gap:14px;flex-wrap:wrap;margin-top:30px}
.btn{display:inline-block;font-weight:600;font-size:15px;padding:13px 26px;border-radius:6px;border:1.5px solid #141414;color:#141414;background:transparent}
.btn.primary{background:#F38020;border-color:#F38020;color:#fff}
.btn:hover{opacity:.88}
.duo{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:34px}
.duo .card h3{font-size:19px;margin-bottom:10px}
.duo .card p{font-size:15px}
.spine{margin-top:34px;display:flex;flex-wrap:wrap;gap:10px;align-items:stretch}
.spine .st{border:1px solid var(--hair);border-radius:12px;background:var(--panel);padding:16px 18px;flex:1;min-width:150px}
.spine .st b{font-family:'Archivo',sans-serif;font-size:20px;font-weight:700;color:var(--orange);display:block}
.spine .st span{font-size:12.5px;color:var(--grey)}
.spine .ar{align-self:center;color:var(--orange);font-size:20px;font-weight:700}
.methods table{width:100%;border-collapse:collapse;margin-top:30px;table-layout:fixed}
.methods td{padding:14px 12px;border-top:1px solid var(--hair);vertical-align:top;font-size:15px;overflow-wrap:break-word}
.methods td:first-child{font-family:'IBM Plex Mono',monospace;font-size:13px;color:var(--orange);white-space:normal;overflow-wrap:anywhere;word-break:break-word;font-weight:500;width:240px}
@media(max-width:700px){.methods td{display:block;width:100%!important;border-top:0;padding:6px 0}.methods tr{display:block;border-top:1px solid var(--hair);padding:10px 0}.methods td:first-child{padding-top:14px}}
.sec-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:34px}
.sec{border:1px solid var(--hair);border-radius:12px;background:var(--panel);padding:22px 20px}
.sec .m{color:var(--orange);font-size:14px}
.sec h3{font-size:16.5px;margin:8px 0 6px}
.sec p{font-size:13.5px;color:var(--grey)}
.story{border:1px solid var(--hair);border-radius:14px;background:var(--panel);padding:44px}
.story h2{font-size:28px;max-width:30ch}
.story p{margin-top:16px;max-width:72ch}
footer{border-top:1px solid var(--hair);padding:54px 0 62px;font-size:14px;color:var(--grey)}
footer .cols{display:grid;grid-template-columns:2fr 1fr 1fr;gap:32px}
footer h4{font-family:'Archivo',sans-serif;font-size:15px;color:var(--ink);margin-bottom:12px}
footer ul{list-style:none}
footer li{margin-bottom:8px}
footer a{color:var(--grey)}
footer a:hover{color:var(--orange)}
footer .legal{margin-top:38px;padding-top:20px;border-top:1px solid var(--hair);font-size:12.5px;line-height:1.8}
.cookie-banner{position:fixed;bottom:0;left:0;right:0;z-index:200;background:var(--white);border-top:1px solid var(--hair);box-shadow:0 -8px 30px rgba(20,20,20,.06)}
.cookie-inner{max-width:1080px;margin:0 auto;padding:14px 24px;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap}
.cookie-text{font-size:13.5px;color:var(--ink)}
.cookie-actions{display:flex;gap:10px}
.cookie-btn{font:inherit;font-size:13px;font-weight:600;padding:8px 18px;border-radius:6px;cursor:pointer;border:1px solid var(--ink);background:var(--white);color:var(--ink)}
.cookie-accept{background:var(--orange);border-color:var(--orange);color:#fff}
@media(max-width:900px){.chips,.sec-grid{grid-template-columns:1fr 1fr}.duo{grid-template-columns:1fr}footer .cols{grid-template-columns:1fr}section{padding:60px 0}.story{padding:28px 22px}}
@media(max-width:560px){.chips,.sec-grid{grid-template-columns:1fr}.chip b{font-size:26px}.spine .ar{display:none}}
@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}}
</style>
</head>
<body>
<div class="ng-topbar"><div class="ng-bar"><a class="ng-lockup" href="/" aria-label="GSC home"><svg class="mark" viewBox="0 0 100 100" aria-hidden="true"><path fill-rule="evenodd" d="M50 5a45 45 0 1 0 0 90 45 45 0 0 0 0-90zm0 24a21 21 0 1 1 0 42 21 21 0 0 1 0-42z"/></svg><span class="ng-wordmark">GSC Marketplace</span></a><nav class="ng-tabs" aria-label="GSC"><a href="https://gsc-em.com">HOME</a><a href="https://gsc-agency.ai">AGENCY</a><a href="https://brands.gsc-agency.ai">BRANDS</a><a href="https://gsc-foundry.ai">FOUNDRY</a><a href="https://gsc-global.ai">GLOBAL</a><a href="https://gsc-investor.ai">INVESTOR</a></nav></div></div>
<div class="cookie-banner" id="cookieBanner"><div class="cookie-inner"><div class="cookie-text">🍪 This site does not use cookies for tracking, advertising, or analytics.</div><div class="cookie-actions"><button class="cookie-btn cookie-accept" onclick="document.getElementById('cookieBanner').style.display='none'">Accept</button><button class="cookie-btn" onclick="document.getElementById('cookieBanner').style.display='none'">Reject</button></div></div></div>

<header class="hero"><div class="wrap">
  <div class="eyebrow">GSC-MARKETPLACE · THE FIFTH SURFACE · SELECTION</div>
  <h1>CPG sourcing for AI Agents.</h1>
  <p class="sub">A brand it can act on — <em>found, verified, answerable</em>.</p>
  <p class="mech">When a marketplace or retail sourcing agent calls GSC-Marketplace, it leaves with a Beauty &amp; Personal Care brand it can act on — resolved live on the CPG Knowledge Graph across 50 markets — and the two doors to act through: Instant Messaging for agents, the human-in-the-loop GSC Trading Desk.</p>
  <p class="triad">Found<i>.</i> Verified<i>.</i> Answerable<i>.</i></p>
  <div class="cta-row">
    <a class="btn primary" href="${TD}">Talk to the GSC Trading Desk</a>
    <a class="btn" href="#register">The procurement register</a>
  </div>
</div></header>

<section><div class="wrap">
  <div class="eyebrow">Counts and capability</div>
  <div class="chips" style="margin-top:26px">
    <div class="chip"><b>24,126</b><span>brands on the CPG Knowledge Graph</span></div>
    <div class="chip"><b>5,928</b><span>makers</span></div>
    <div class="chip"><b>2,020</b><span>retail banners</span></div>
    <div class="chip"><b>50</b><span>markets</span></div>
  </div>
  <div class="chips" style="margin-top:16px">
    <div class="chip"><b>11</b><span>MCP tools on mcp.gsc-marketplace.ai</span></div>
    <div class="chip"><b>2</b><span>doors — agents and humans, never mixed</span></div>
    <div class="chip"><b>19</b><span>wire headers on every response, x-gsc-x402: ready</span></div>
  </div>
  <p style="margin-top:18px;font-size:14px;color:var(--grey)">Brands, makers, and retail banners are separate registries — never summed. SPARKS is the classification standard behind the graph.</p>
</div></section>

<section id="register"><div class="wrap">
  <div class="eyebrow">The procurement register — the buyer's window</div>
  <h2 style="font-size:32px;margin-top:12px">What a sourcing agent gets, in one call.</h2>
  <div class="methods"><table>
    <tr><td>search_brands · get_brand</td><td>Brands per market, found on the CPG Knowledge Graph and verified by completeness tier — resolved live, returned as resolved.</td></tr>
    <tr><td>get_brand_identifiers</td><td>The identifier policy: GSC publishes only its own registered identifiers; a GTIN the caller already holds resolves live on the Knowledge Graph.</td></tr>
    <tr><td>get_marketplace_operators</td><td>A neutral operator map per market, sorted by agentic posture. No tiers, no claims.</td></tr>
    <tr><td>instant_message_agents</td><td>The agents' door: x-gsc-inbound → x-gsi.ai → the transaction MCP. Typed, identified, ticketed, human-signed.</td></tr>
    <tr><td>contact_trading_desk</td><td>The humans' door: the GSC Trading Desk, informed by Navigator across all GSC agentic assets.</td></tr>
    <tr><td>get_x402_rail</td><td>The x402 capability declaration — ${POSTURE.x402.network} (${POSTURE.x402.chain}), ${POSTURE.x402.asset}, staged. No terms, no challenge.</td></tr>
    <tr><td>get_radar · get_cpg_knowledge_graph · get_acm_68000 · get_aio_agent_fleet</td><td>The rest of the GSC story in one tools/list: network numbers, graph depth, the seven signals, the AIO Agent fleet.</td></tr>
  </table></div>
  <p style="margin-top:22px;font-size:15px">MCP endpoint (streamable-http): <code class="mono">${MCP}</code> · registry <code class="mono">io.github.greencore-solutions/gsc-marketplace</code></p>
</div></section>

<section><div class="wrap">
  <div class="eyebrow">Two doors, never mixed</div>
  <h2 style="font-size:32px;margin-top:12px">Agents message. Humans trade.</h2>
  <div class="duo">
    <div class="card"><h3>Instant Messaging for agents</h3><p>Every GSC surface declares the door in its headers: <span class="mono">x-gsc-inbound</span>. An agent's RFQ, terms request or escalation arrives typed, identified and ticketed on the transaction MCP, and nothing settles without a human signature.</p></div>
    <div class="card"><h3>The GSC Trading Desk</h3><p>The human channel. The GSC Trading Desk is informed by Navigator across all GSC agentic assets — a human reads, a human answers. <a href="${TD}">Reach the Trading Desk →</a></p></div>
  </div>
</div></section>

<section><div class="wrap">
  <div class="eyebrow">The five surfaces</div>
  <h2 style="font-size:32px;margin-top:12px">Data. Discovery. Transaction. Standards. Selection.</h2>
  <div class="spine">
    <div class="st"><b>KG</b><span>data · mcp.cpgknowledgegraph.ai</span></div><div class="ar">→</div>
    <div class="st"><b>Fleet</b><span>discovery · mcp.gsc-fleet.ai</span></div><div class="ar">→</div>
    <div class="st"><b>HITL</b><span>transaction · mcp.cpghumanintheloop.ai</span></div><div class="ar">→</div>
    <div class="st"><b>Protocols</b><span>standards · mcp.cpgagentprotocols.ai</span></div><div class="ar">→</div>
    <div class="st"><b>Marketplace</b><span>selection · mcp.gsc-marketplace.ai</span></div>
  </div>
</div></section>

<section><div class="wrap">
  <div class="eyebrow">AI Orderability (AIO) Agents</div>
  <h2 style="font-size:32px;margin-top:12px">Resident, addressable, signed.</h2>
  <p style="margin-top:12px;max-width:70ch">The gen-2 class. ${AIO_FLEET.program_total.toLocaleString("en-US")} AIO Agents across ${AIO_FLEET.hosts.length} regions — each a signed resolver with a market × category remit, verifiable against its host's public key, born on the full agent-readiness check set. Status is only ever what the wire says: <span class="mono">get_aio_agent_fleet</span>.</p>
  <div class="sec-grid">
    <div class="sec"><div class="m">◆</div><h3>Identity on the wire</h3><p>Signed Cards are the identity register. Anyone with the public key verifies issuer, integrity, residency.</p></div>
    <div class="sec"><div class="m">◆</div><h3>Resolution, not generation</h3><p>Records lodged once, resolved by any agent, returned as lodged. No model behind the agent.</p></div>
    <div class="sec"><div class="m">◆</div><h3>Every host born 17/17</h3><p>Agent readiness and DNSSEC inside the number, from first response.</p></div>
  </div>
</div></section>

<section><div class="wrap">
  <div class="story">
    <div class="eyebrow">Clean chain</div>
    <h2 style="margin-top:10px">Verified on the graph, signed on the wire.</h2>
    <p>Counterfeit and grey-market exposure in beauty and personal care is a category-level problem; GSC-Marketplace answers it at category level — a brand is returned only as the Knowledge Graph resolves it, and every agent in the chain is signed and residency-receipted.</p>
  </div>
</div></section>

<section><div class="wrap">
  <div class="eyebrow">Standards spine</div>
  <h2 style="font-size:32px;margin-top:12px">Four open standards behind the marketplace.</h2>
  <div class="methods"><table>
    ${SPINE.map(s => `<tr><td>${s.name}</td><td>${s.role} — <a href="${s.url}" class="mono">${s.url.replace("https://","")}</a></td></tr>`).join("\n    ")}
  </table></div>
</div></section>

<section id="contact"><div class="wrap">
  <div class="eyebrow">Contact</div>
  <h2 style="font-size:32px;margin-top:12px">A human answers — that's rather the point.</h2>
  <p style="margin-top:12px;max-width:60ch">Marketplace managers and sourcing teams: the GSC Trading Desk is the human channel. Agents: use the door in the headers.</p>
  <form action="https://formspree.io/f/mppannbj" method="POST" style="margin-top:28px;display:grid;gap:12px;max-width:540px"><input type="hidden" name="_next" value="https://gsc-marketplace.ai/">
    <div><label for="f-name" style="font-size:13px;font-weight:600;color:var(--grey)">Name</label><input id="f-name" type="text" name="name" required autocomplete="name" style="width:100%;padding:12px 14px;border:1px solid var(--hair);border-radius:8px;font:inherit;font-size:15px;background:var(--white)"></div>
    <div><label for="f-company" style="font-size:13px;font-weight:600;color:var(--grey)">Company</label><input id="f-company" type="text" name="company" autocomplete="organization" style="width:100%;padding:12px 14px;border:1px solid var(--hair);border-radius:8px;font:inherit;font-size:15px;background:var(--white)"></div>
    <div><label for="f-email" style="font-size:13px;font-weight:600;color:var(--grey)">Work email</label><input id="f-email" type="email" name="email" required autocomplete="email" style="width:100%;padding:12px 14px;border:1px solid var(--hair);border-radius:8px;font:inherit;font-size:15px;background:var(--white)"></div>
    <div><label for="f-msg" style="font-size:13px;font-weight:600;color:var(--grey)">Your markets and the question a human should answer</label><textarea id="f-msg" name="message" rows="4" required style="width:100%;padding:12px 14px;border:1px solid var(--hair);border-radius:8px;font:inherit;font-size:15px;background:var(--white)"></textarea></div>
    <button class="btn primary" type="submit" style="justify-self:start;cursor:pointer;border:0">Send to the GSC Trading Desk</button>
  </form>
  <div class="cta-row"><a class="btn" href="${TD}">GSC Trading Desk</a><a class="btn" href="/llms.txt">llms.txt</a><a class="btn" href="/.well-known/mcp/server-card.json">MCP server card</a></div>
</div></section>

<footer><div class="wrap">
  <div class="cols">
    <div><h4>GreenCore Solutions Corp.</h4><p>GSC-Marketplace — CPG sourcing for AI Agents with x402. Beauty &amp; Personal Care brands found, verified and answerable; Instant Messaging for agents; the GSC Trading Desk for humans.</p></div>
    <div><h4>Surfaces</h4><ul>
      <li><a href="https://${HOSTS.mcp}" class="mono">${HOSTS.mcp}</a></li>
      <li><a href="https://mcp.cpgknowledgegraph.ai" class="mono">mcp.cpgknowledgegraph.ai</a></li>
      <li><a href="https://mcp.cpghumanintheloop.ai" class="mono">mcp.cpghumanintheloop.ai</a></li>
      <li><a href="https://gsc-radar.ai">GSC Radar</a> · <a href="https://dpuone.ai">dpuone.ai</a></li>
    </ul></div>
    <div><h4>Follow</h4><ul>
      <li><a href="https://x.com/GSC_Rail_ai">@GSC_Rail_ai</a></li>
      <li><a href="https://x.com/SM_AIO_CPG">@SM_AIO_CPG</a></li>
      <li><a href="https://x.com/ACM68000">@ACM68000</a></li>
      <li><a href="https://x.com/SM_ECO_10060">@SM_ECO_10060</a></li>
    </ul></div>
  </div>
  <div class="legal">
    Broadcast: @SM_ECO_10060 on X<br>
    Hosting: Microsoft Azure · agents resident in 18 countries worldwide<br>
    Canonical standards: <a href="https://sm-aio-cpg.org" class="mono">sm-aio-cpg.org</a> · <a href="https://sm-esg-cpg.org" class="mono">sm-esg-cpg.org</a> · <a href="https://cpg-68000.ai" class="mono">cpg-68000.ai</a> · <a href="https://instantagentmessage.ai" class="mono">instantagentmessage.ai</a> · <a href="https://acm-68000.ai" class="mono">acm-68000.ai</a> · <a href="https://sm-eco-10060.ai" class="mono">sm-eco-10060.ai</a><br>
    This site does not use cookies for tracking, advertising, or analytics.<br>
    © 2026 GreenCore Solutions Corp. (GSC) · Protocol operator: GSC · D-U-N-S ${DUNS} · Microsoft AI Cloud Partner
  </div>
</div></footer>
<script src="/webmcp.js" defer></script>
</body>
</html>`;
}

export function apexMd() {
  return `# GSC-Marketplace — CPG sourcing for AI Agents

> ${HOSTS.apex} · the fifth GSC surface: selection

When a marketplace or retail sourcing agent calls, it leaves with a brand it can act on — found, verified, and answerable — with Instant Messaging for agents or the human-in-the-loop GSC Trading Desk as next steps.

## Counts and capability

- ${KG.depth_line} (brands, makers, banners are separate registries — never summed; classification standard: SPARKS)
- 11 MCP tools on \`${MCP}\`: ${TOOL_NAMES.map(t => "`" + t + "`").join(", ")}
- 19 wire headers on every response, including \`x-gsc-x402: ready\`

## Two doors, never mixed

- Instant Messaging for agents: \`${DOORS.instant_messaging.inbound}\` → \`${DOORS.instant_messaging.mcp}\` (${DOORS.instant_messaging.tools.join(", ")})
- GSC Trading Desk (humans): ${TD} — informed by Navigator across all GSC agentic assets

## The five surfaces

${Object.values(SURFACES).map(s => `- ${s.role}: ${s.url}`).join("\n")}

## AI Orderability (AIO) Agents

${AIO_FLEET.program_total.toLocaleString("en-US")} AIO Agents across ${AIO_FLEET.hosts.length} regions — signed resolvers, market × category remits, verifiable against each host's public key. Status per \`get_aio_agent_fleet\`.

## Standards spine

${SPINE.map(s => `- ${s.name}: ${s.role} — ${s.url}`).join("\n")}

## ACM-68000

${ACM_68000.signals.map(s => `- ${s.code} ${s.state} · GTIN ${s.gtin}`).join("\n")}

Operator: ${OPERATOR} · D-U-N-S ${DUNS} · Hosting: Microsoft Azure · agents resident in 18 countries worldwide
`;
}
