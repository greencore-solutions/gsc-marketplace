# DEPLOY — gsc-marketplace v1.0.0 (2026-08-22)

**Sub:** AIO Agents (`9e406344-81a4-4624-98de-a9c642a75d69`) · **RG:** `rg-aio-agents-fr` · **Env:** `aio-agents-env-fr` (France Central) · **ACR:** `gscemregistry` · **App:** `gsc-marketplace`
**Secrets:** NONE. Identity-based pull (system-assigned + AcrPull). No DSN, no registry password.

```
az acr build --registry gscemregistry --image gsc-marketplace:<ver> .
az acr repository show -n gscemregistry --image gsc-marketplace:<ver> --query digest -o tsv      # MANIFEST digest — pin this
az containerapp create -n gsc-marketplace -g rg-aio-agents-fr --environment aio-agents-env-fr \
  --image gscemregistry.azurecr.io/gsc-marketplace@sha256:<manifest> \
  --registry-server gscemregistry.azurecr.io --registry-identity system --system-assigned \
  --target-port 8080 --ingress external --min-replicas 1 --max-replicas 2 --cpu 0.25 --memory 0.5Gi
```
Hostnames (one app, host-routed): `mcp.gsc-marketplace.ai` · `gsc-marketplace.ai` · `www.gsc-marketplace.ai` · `gsc-marketplace.{com,io,org}` (+www).
DNS: Cloudflare, DNS-only, by token — apex A → env static IP + `asuid` TXT (HTTP-validated cert); subdomains CNAME → app FQDN + `asuid.<sub>` TXT (CNAME-validated cert); `_index/_a2a/_mcp._agents` SVCB+HTTPS. DNSSEC = portal click.
Verify: 19 `x-gsc-*` headers on every host · `tools/list` = 11 · every kit path real content-type · scanner 17/17.
Rollback: `az containerapp revision activate … --revision <anchor>`; anchors recorded in `C:\START_ME_UP_AIO\NG-0_LEDGER.md`.
Registry: `gh workflow run publish-mcp.yml` after the live remote passes wire-verify.
