# Webstudio CLI connection

Connects a local working folder to the Webstudio project behind the share link
so the project can be synced, built, published, and driven over MCP from the CLI.

- Project id: `613132d8-0f0f-4042-8000-05266a036da6`
- Project host: `p-613132d8-0f0f-4042-8000-05266a036da6.webstudio.botnizer.com`
- API origin: `https://webstudio.botnizer.com` (self-hosted Webstudio)
- CLI: [`webstudio`](https://www.npmjs.com/package/webstudio) — v0.288.0 at the
  time of writing, binaries `webstudio` and `webstudio-cli`

## Quick start

```bash
export WEBSTUDIO_SHARE_LINK='https://p-613132d8-0f0f-4042-8000-05266a036da6.webstudio.botnizer.com/?authToken=<token>&mode=design'
./webstudio/setup.sh ~/Desktop/webstudio-qsr
```

That creates the folder, installs the CLI locally, links it to the project,
verifies API access, and pulls the first sync.

Doing it by hand is four commands:

```bash
mkdir -p ~/Desktop/webstudio-qsr && cd ~/Desktop/webstudio-qsr
npm init -y && npm install --save-dev webstudio@latest
npx webstudio link --link "$WEBSTUDIO_SHARE_LINK"
npx webstudio sync
```

## Where the token ends up

`webstudio link` does not keep the token in the project folder. It writes:

| Path | Contents |
| --- | --- |
| `~/.config/webstudio-nodejs/webstudio-config.json` | `{ "<projectId>": { "origin": ..., "token": ... } }` |
| `<folder>/.webstudio/config.json` | `{ "projectId": "..." }` only |

So the working folder is safe to keep under version control as long as
`.webstudio/` and `node_modules/` are ignored (both are, in this repo's
`.gitignore`). The share link itself is a credential — keep it out of commits,
issues, and CI logs.

## Commands worth knowing

| Command | What it does |
| --- | --- |
| `npx webstudio permissions` | Shows API/role/publish/domain capability for the token — the fastest connectivity check |
| `npx webstudio sync` | Pulls the current build into the folder |
| `npx webstudio build --template ssg` | Generates a project build (other templates: `docker`, `vercel`, `netlify`, `react-router`, …) |
| `npx webstudio preview` | Builds and serves the generated project for visual checks |
| `npx webstudio publish deploy` | Publishes to staging or production |
| `npx webstudio import` | Imports a synced project bundle into another project |
| `npx webstudio connect claude` | Writes `.mcp.json` so Claude Code can drive the project over MCP |
| `npx webstudio man project-editing` | Long-form manual for programmatic editing |

## Network requirement

The CLI talks to `https://webstudio.botnizer.com` (not to the `p-<id>.` host —
that one only serves the builder UI). Any machine or sandbox running the CLI
needs egress to that host on 443.

In a restricted environment the failure looks like this:

```
API returned text/plain instead of JSON from https://webstudio.botnizer.com/trpc/api.projects.permissions?...
HTTP status: 403 Forbidden.
Response preview: Host not in allowlist: webstudio.botnizer.com.
```

`webstudio link` still succeeds there, because linking only parses the URL and
writes the credential to disk — the first command that actually needs the API
(`permissions`, `sync`, `build`, `publish`) is where it fails. Fix it by adding
`webstudio.botnizer.com` to the environment's network egress allowlist, not by
disabling TLS verification or bypassing the proxy.

### Behind an HTTP proxy

Node's built-in `fetch` does not read `HTTPS_PROXY` on its own, so the CLI can
fail with that same allowlist error while `curl` to the identical host
succeeds. Run it with `NODE_USE_ENV_PROXY=1` (Node >= 22.21); `setup.sh`
exports this already.

## Known issue: `sync` is refused by this instance

`webstudio sync` fails against `webstudio.botnizer.com` with:

```
x  This version of the Webstudio CLI is incompatible with the current API.
```

**Updating the CLI does not fix this**, and the message is misleading. What
actually happens: `sync` makes a single request to
`build.loadProjectBundleByProjectId`, and the server answers `412` with

```json
{"apiCompatibility":{"reason":"clientVersionUnsupported","target":"cli",
 "action":{"type":"updateCli"}}}
```

Probing that endpoint directly shows the gate keys off the **client identity
header, not the version number**:

| Request | Result |
| --- | --- |
| no `x-webstudio-client` header | `200`, full project bundle |
| `x-webstudio-client: cli`, version `0.288.0` (npm latest) | `412` |
| `x-webstudio-client: cli`, version `0.289.0` / `0.300.0` / `1.0.0` / `999.0.0` | `412` |
| `x-webstudio-client-version` alone, no client header | `200` |

Since no version value is accepted, this is a server-side configuration on the
self-hosted instance rejecting CLI clients for that procedure — it needs fixing
on the Webstudio deployment, not in this folder.

### What works despite that

Only the bundle-download path is gated. Verified working against the live
project:

- `webstudio permissions` — role `builders`; permits `view, edit, build, api`;
  `canPublishProjectDomain: true`, `canPublish: false`
- `webstudio meta.index`, `webstudio list-pages --json` and the rest of the MCP
  tool surface (this is the path for editing the project programmatically)
- `webstudio publish list --json`, `webstudio domains list --json`

So the project can be read and edited over MCP without `sync`. Note that
`webstudio build` consumes the synced bundle, so it stays blocked until the
server-side gate is lifted.

## Design export

The `QSR_Digital_Transformation_Website.zip` export that accompanies this setup
contains a single-page design (`Botnizer Home.dc.html` + `support.js`), brand
tokens under `figma/`, and the image/video assets under `assets/` and
`uploads/`. It is not a Webstudio project bundle, so it cannot be fed to
`webstudio import`, which expects the output of `webstudio sync`. To land that
design in the project, rebuild it in the builder (or via the MCP editing tools
after `webstudio connect claude`) and upload the assets from `assets/`.

The brand values it carries, for reference:

| Token | Value |
| --- | --- |
| Vibrant green (primary CTA) | `#0F9300` |
| Royal blue (headings, nav) | `#003EF6` |
| Electric purple (accents) | `#8827FF` |
| Charcoal black | `#242829` |
| Dark gray | `#464A4B` |
| Warm orange | `#FFAB5B` |
| Body text | `#333333` |
| Display font | Fira Sans |
| Body font | Poppins |

## Home page build

`build-home-page.mjs` generates the Webstudio JSX for the QSR home page from
the design export's own data arrays (stations, products, differentiators,
services, case studies, form needs) and writes `insert-fragment` input files.

```bash
cd ~/Desktop/webstudio-qsr
node build-home-page.mjs <parentInstanceId>
npx webstudio insert-fragment --input-file .temp/full.json --dry-run
npx webstudio insert-fragment --input-file .temp/full.json
```

`.temp/full.json` replaces the page body with the whole page in one commit
(`header` / `main` / `footer`), which is what keeps the `main` landmark check
passing. The per-section files are useful for iterating on one band at a time.

Structure: sticky header, hero, trust bar, five lane stations, hardware
showcase, four in-restaurant products, four differentiators, six services,
three case studies, quote form, footer. Brand palette and Fira Sans / Open
Sans come from `figma/brand-schema.css` in the export.

Layout is fluid rather than breakpoint-based — `clamp()` on type and section
padding, `auto-fit` grids, wrapping nav — so it holds up from mobile to
desktop without per-breakpoint overrides. Webstudio's three default
breakpoints therefore carry no declarations, which the audit reports as
`unused-breakpoint` (info).

### Assets

`upload-assets` resolves paths against `.webstudio/assets/`, so copy files
there first. The instance rejects large uploads: `station-ordering-board.png`
(2.0 MB) uploaded fine, `hero-drive-thru.mp4` (10.1 MB) returned `502 Bad
Gateway`. The hero therefore uses a gradient rather than the design's video —
either raise the upload limit on the instance or transcode the video below the
limit and add it to the hero.

### Verification

`webstudio screenshot --path` and `webstudio preview` both need the generated
local build, which needs `sync` — still blocked by the server-side gate above.
So the page was verified with `webstudio audit` plus `list-texts` / 
`list-instances` read-backs rather than pixels. Audit findings on `/` are
clear; the remaining warnings belong to the untouched 404 page.

Screenshots need an explicit browser in a headless sandbox:
`WEBSTUDIO_BROWSER_PATH=/path/to/chromium`.
