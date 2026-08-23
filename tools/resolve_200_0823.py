import io, os, re
os.chdir(r"C:\GREENCORE\AIO\gsc-marketplace")
def rd(p): return io.open(p, encoding="utf-8").read()
def wr(p, s): io.open(p, "w", encoding="utf-8", newline="\n").write(s)
def rep(s, a, b, tag):
    assert a in s, (tag, a[:80]); return s.replace(a, b, 1)

# ---------- x402.js: route move + 200 twin + markdown derivation ----------
x = rd("x402.js")
# 1. the canonical 402 flow moves to /api (config move: same handler, same url var)
x = rep(x, '  app.get("/x402/resolve", async (req, res) => {\n    const url = `https://${APEX}/x402/resolve`;',
        '  app.get("/api", async (req, res) => {\n    const url = `https://${APEX}/api`;', "route move")
# 2. /x402/resolve → 200, body = the HTML twin byte-for-byte (same function), markdown derived mechanically
mount_anchor = '  app.get("/x402/receipt/:nonce", async (req, res) => {'
new_routes = r'''  // /x402/resolve — the document: 200, body = the HTML twin (html402, byte-preserved); Accept: text/markdown → mechanical derivation
  app.get("/x402/resolve", (req, res) => {
    const pr = paymentRequired(`https://${APEX}/api`);
    const html = html402(pr);
    ghost(res, "ACM-200", "ALLOW");
    if (/text\/markdown/i.test(req.headers.accept || "")) { const md = htmlToMd(html); res.set("x-markdown-tokens", String(Math.ceil(md.length / 4))); return res.type("text/markdown; charset=utf-8").send(md); }
    res.type("text/html; charset=utf-8").send(html);
  });
'''
x = rep(x, mount_anchor, new_routes + mount_anchor, "mount twin route")
# mechanical html → markdown (no copy: derived from the served HTML at request time)
helper = r'''
// Mechanical HTML → Markdown derivation of a served page (no authored copy).
function htmlToMd(html) {
  const un = (s) => s.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&");
  let b = (html.match(/<div class="container">([\s\S]*?)<\/div><script/) || [null, html])[1];
  b = b.replace(/<style[\s\S]*?<\/style>/g, "").replace(/<script[\s\S]*?<\/script>/g, "");
  b = b.replace(/<div class="surfaces">([\s\S]*?)<\/div>/g, (m, c) => "\n```\n" + un(c.replace(/<[^>]+>/g, "")) + "\n```\n");
  b = b.replace(/<table>[\s\S]*?<\/table>/g, (t) => {
    const rows = [...t.matchAll(/<tr>([\s\S]*?)<\/tr>/g)].map((r) => [...r[1].matchAll(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/g)].map((c) => un(c[1].replace(/<[^>]+>/g, "")).trim()));
    if (!rows.length) return "";
    return "\n| " + rows[0].join(" | ") + " |\n|" + rows[0].map(() => "---").join("|") + "|\n" + rows.slice(1).map((r) => "| " + r.join(" | ") + " |").join("\n") + "\n";
  });
  b = b.replace(/<h1>([\s\S]*?)<span class="host">([\s\S]*?)<\/span><\/h1>/g, (m, a, h) => `\n# ${un(a)}\n\n${un(h)}\n`);
  b = b.replace(/<h1>([\s\S]*?)<\/h1>/g, (m, a) => `\n# ${un(a.replace(/<[^>]+>/g, ""))}\n`);
  b = b.replace(/<h2>([\s\S]*?)<\/h2>/g, (m, a) => `\n## ${un(a.replace(/<[^>]+>/g, ""))}\n`);
  b = b.replace(/<h4>([\s\S]*?)<\/h4>/g, (m, a) => `\n**${un(a)}**\n`);
  b = b.replace(/<div class="badge">([\s\S]*?)<\/div>/g, (m, a) => `\n**${un(a)}**\n`);
  b = b.replace(/<a href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g, (m, href, t) => `[${un(t.replace(/<[^>]+>/g, ""))}](${href})`);
  b = b.replace(/<br\s*\/?>/g, "\n").replace(/<\/p>|<\/div>|<\/footer>/g, "\n").replace(/<[^>]+>/g, "");
  return un(b).replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim() + "\n";
}
'''
x = rep(x, "\n// ---------- mount ----------", helper + "\n// ---------- mount ----------", "helper")
wr("x402.js", x)

# ---------- kit.js: path-scoped OAuth Protected Resource Metadata (RFC 9728) ----------
k = rd("kit.js")
opr = [l for l in k.split("\n") if l.startswith('  app.get("/.well-known/oauth-protected-resource"')][0]
scoped = opr.replace('app.get("/.well-known/oauth-protected-resource"', 'app.get("/.well-known/oauth-protected-resource/x402/resolve"').replace("resource: `https://${H(req)}`", "resource: `https://${H(req)}/x402/resolve`")
assert scoped != opr and "/x402/resolve" in scoped
k = k.replace(opr, opr + "\n" + scoped, 1)
wr("kit.js", k)

# ---------- pointer sweep: /x402/resolve → /api in served machine strings ----------
KEEP = ['app.get("/x402/resolve"', "<h1>/x402/resolve<span", 'oauth-protected-resource/x402/resolve"', "resource: `https://${H(req)}/x402/resolve`", "// /x402/resolve — the document"]
def sweep(p):
    s = rd(p); out = []
    for line in s.split("\n"):
        if any(kp in line for kp in KEEP): out.append(line)
        else: out.append(line.replace("/x402/resolve", "/api"))
    wr(p, "\n".join(out))
for f in ["x402.js", "kit.js", "server.js", "canon.js"]: sweep(f)

# version
for f, a in (("canon.js", '"1.2.0"'), ("package.json", '"1.2.0"')):
    wr(f, rd(f).replace(a, '"1.2.1"', 1))
print("patched")
