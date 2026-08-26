# Deploying the trades site to the Hostinger VPS

Target: `deepflowai-trades.co.uk` and `www.deepflowai-trades.co.uk` on VPS
**1174611** (`72.61.207.35`).

**Florida is not touched by any step here.** This stack has its own compose
project (`deepflow`), its own network, its own port and its own Caddy block
matched on hostname. Every command below is scoped to `-p deepflow`.

---

## 0. Before you start — read this bit

**What this repository is.** A static Vite/React marketing site, plus a small
Node server that serves the build and proxies one AI call. That is all it is.

**What it is not.** There is no database, no user accounts and no authentication
in this repository — so there is nothing of that kind to configure. The enquiry
pipeline (projects database, AI documents, outbound email, Vapi calls) lives in
the separate **command-centre** application. This site only POSTs to it.

**The dependency that will bite you.** The enquiry forms post to
`VITE_WEBHOOK_URL`, which in production is `https://admin.deepflowai.co.uk/api/intake`.
That hostname resolves to this VPS but is **not currently in Caddy's config**,
so it has no certificate and every request to it fails. Until you add a block for
it too, the site will deploy and look perfect, and the forms will show an honest
error when someone submits. Decide whether you want to fix that in the same
session.

---

## 1. Check the ground before changing anything

SSH in, then run this. It only reads.

```bash
# Is Caddy on the host, or in a container? This decides your config edit.
systemctl is-active caddy 2>/dev/null && echo "CADDY: host"
docker ps --format '{{.Names}}\t{{.Image}}' | grep -i caddy && echo "CADDY: docker"

# Where is Caddy's config, and what does it currently serve?
sudo cat /etc/caddy/Caddyfile 2>/dev/null | grep -E '^[a-z0-9*.-]+\s*(,|\{)' || true

# Is port 8090 free? If not, pick another and set DEEPFLOW_HOST_PORT.
sudo ss -tlnp | grep -E ':8090|:80|:443' || echo "8090 is free"

# What is already running, so you can tell later that you did not disturb it.
docker ps --format 'table {{.Names}}\t{{.Status}}\t{{.Ports}}'

# Room to build?
df -h / | tail -1
docker --version && docker compose version
```

Write down which Caddy you have. Everything after this depends on it.

---

## 2. Get the code and configure it

```bash
sudo mkdir -p /opt/deepflow && sudo chown "$USER" /opt/deepflow
cd /opt/deepflow
git clone https://github.com/colinc-deepflow/marketing-website.git .

cp .env.example .env
nano .env
```

Set these three:

```ini
VITE_WEBHOOK_URL=https://admin.deepflowai.co.uk/api/intake
DEEPFLOW_HOST_PORT=8090
GEMINI_API_KEY=          # leave blank unless you want the live demo on
```

```bash
chmod 600 .env            # readable only by you
grep -q '^\.env$' .gitignore && echo ".env is gitignored — good"
```

`VITE_WEBHOOK_URL` is compiled into the browser bundle, so **changing it later
means rebuilding**, not just restarting.

---

## 3. Build and start

```bash
cd /opt/deepflow
docker compose -p deepflow build            # ~1 minute
docker compose -p deepflow up -d

docker compose -p deepflow ps               # wait for "healthy", ~15s
```

If it does not reach healthy within a minute, stop and read
`docker compose -p deepflow logs`. Do not touch Caddy until this is healthy.

---

## 4. Prove it works before exposing it

```bash
curl -s http://127.0.0.1:8090/healthz; echo
# expect: {"status":"ok","uptime":...,"aiDemo":"disabled"}

curl -sI http://127.0.0.1:8090/ | head -1        # expect 200
curl -s http://127.0.0.1:8090/ | grep -c 'id="root"'   # expect 1

# The site must not be reachable from outside yet — loopback only.
curl -sS --max-time 5 http://72.61.207.35:8090/ && echo "EXPOSED — investigate" \
  || echo "correctly not publicly reachable"
```

---

## 5. Route the two domains — and only those two

Append `deploy/Caddyfile.deepflow-trades` to your Caddy config. **Append. Do not
replace the file** — Florida's block lives in it.

**Host Caddy:**

```bash
sudo cp /etc/caddy/Caddyfile /etc/caddy/Caddyfile.bak.$(date +%F-%H%M)   # rollback point
sudo tee -a /etc/caddy/Caddyfile < /opt/deepflow/deploy/Caddyfile.deepflow-trades
sudo mkdir -p /var/log/caddy
sudo caddy validate --config /etc/caddy/Caddyfile     # MUST pass before reloading
sudo systemctl reload caddy
```

**Dockerised Caddy** — edit the mounted Caddyfile the same way, then:

```bash
docker network connect deepflow_net <caddy-container>
# change the reverse_proxy line to: reverse_proxy deepflow-web:8080
docker exec <caddy-container> caddy validate --config /etc/caddy/Caddyfile
docker exec <caddy-container> caddy reload --config /etc/caddy/Caddyfile
```

`reload` is graceful — Florida keeps serving throughout. Never `restart` Caddy
when a `reload` will do.

---

## 6. Validate the deployment

```bash
# DNS still points here
dig +short deepflowai-trades.co.uk www.deepflowai-trades.co.uk

# Certificate issued (may take 10-30s on first request)
curl -sI https://deepflowai-trades.co.uk | head -1
curl -sI https://www.deepflowai-trades.co.uk | head -1
echo | openssl s_client -connect deepflowai-trades.co.uk:443 \
  -servername deepflowai-trades.co.uk 2>/dev/null \
  | openssl x509 -noout -subject -dates

# Florida is untouched — this is the check that matters most
curl -sI https://florida2028.com | head -1        # expect 200/301
docker ps --format 'table {{.Names}}\t{{.Status}}'

# The app itself
curl -s https://deepflowai-trades.co.uk/ | grep -c 'id="root"'
curl -sI https://deepflowai-trades.co.uk/pricing | head -1   # SPA fallback → 200
curl -sI https://deepflowai-trades.co.uk/ | grep -iE 'strict-transport|x-frame|x-content'

# Health route is hidden from the public
curl -sI https://deepflowai-trades.co.uk/healthz | head -1   # expect 404

# No secret in the bundle — this must print nothing
curl -s https://deepflowai-trades.co.uk/ \
  | grep -oE '/assets/[A-Za-z0-9._-]+\.js' | head -1 \
  | xargs -I{} curl -s https://deepflowai-trades.co.uk{} | grep -c 'AIza'
# expect: 0

# AI endpoint behaves (503 without a key, 200 with one)
curl -s -X POST -H 'Content-Type: application/json' \
  -d '{"scenario":"customer wants a fitted wardrobe quote"}' \
  https://deepflowai-trades.co.uk/api/ai/workflow-preview; echo

# Logs
docker compose -p deepflow logs --tail 30
sudo tail -5 /var/log/caddy/deepflow-trades.log
```

**Database connectivity:** there is nothing to check — this site has no database.
What you can check is the API it depends on:

```bash
curl -sI https://admin.deepflowai.co.uk/api/health | head -1
```

If that fails, the enquiry forms will show their error state. That is the
command-centre's Caddy block, not this one.

---

## 7. Rollback

**Undo the routing** (site goes dark, Florida unaffected):

```bash
sudo cp /etc/caddy/Caddyfile.bak.<timestamp> /etc/caddy/Caddyfile
sudo caddy validate --config /etc/caddy/Caddyfile && sudo systemctl reload caddy
```

**Stop the app** (leaves the image and config in place):

```bash
docker compose -p deepflow down
```

**Roll back to the previous build:**

```bash
cd /opt/deepflow
git log --oneline -5
git checkout <previous-commit-sha>
docker compose -p deepflow up -d --build
```

**Remove it entirely:**

```bash
docker compose -p deepflow down --rmi local
docker network rm deepflow_net 2>/dev/null
# then remove the appended block from the Caddyfile and reload
```

None of these touch Florida's containers, network, volumes or config. If
something goes wrong mid-deploy, the safe stopping point is always: revert the
Caddyfile, reload, and leave the container running or stopped as you like — with
no Caddy block, nothing routes to it.

---

## 8. Updating later

```bash
cd /opt/deepflow
git pull
docker compose -p deepflow up -d --build
docker compose -p deepflow ps        # confirm healthy
```

Caddy needs no changes for an update — only if the port or hostnames change.
