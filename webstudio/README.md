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

### Publishing

```bash
npx webstudio publish deploy --target staging --message "..." --json
npx webstudio publish status --job <jobId> --json      # note: --job, not --job-id
```

The share-link token has `canPublishProjectDomain: true` and `canPublish:
false`, so staging publishes to the project domain work and production does
not.

The API reports the project domain as a bare label (`web-botnizer-57ix6`)
without the host suffix the instance appends when serving published sites, and
`domains list` is empty until a custom domain is added. In a sandbox that means
the published URL cannot be derived or reached for screenshot verification
unless the publishing host is also on the egress allowlist.

## Figma "New Home Page" build

`build-figma-home.mjs` generates the `/new-home` page from the Figma design
`YcekX1kGhoti7ssk1sOlnr`, node `65:49189` ("New Home Page-updated", 1440×9603).

```bash
cd ~/Desktop/webstudio-qsr
node -e 'import("./build-figma-home.mjs").then(m => /* compose + write insert-fragment input */ 0)'
npx webstudio insert-fragment --input-file .temp/fig-page.json
```

Sections, in Figma node order: Nav Bar (65:49368), Hero (65:49366), Trust Bar
(65:49356), Vision (65:49352), Elevate your brand (65:49353/4), Offering items
(65:49357), Technical (65:49360), Results (65:49361), Case Study cards
(65:49362), Footer (65:49297).

Design values are taken from the Figma nodes: Fira Sans throughout, `#13C000`
nav rule, `#15CA01` hero subhead, `#0F9300` technical highlights, `#333333`
headings, `#464A4B` body, `#F1F1F1` offering cards, `#E6E9EE` stat borders,
`#0033C3` links.

### Deviations from the Figma file

- **Absolute positioning → flow layout.** The design positions most sections
  with absolute insets at a fixed 1440px width. These are rebuilt as
  `auto-fit` grids with `clamp()` type so the page is responsive; at 1440px it
  reads as designed, but element positions are not pixel-identical.
- **Technical section constellation.** The five integration nodes (Toast POS,
  NCR Aloha, Kitchen Display, Micros, CRM) are scattered around the logo at
  hand-placed coordinates with decorative connector line SVGs. They are
  rebuilt as a centred row; the `Left Lines` / `Right Lines` connector art is
  not included.
- **Nav mega-menu** is captured in the design as an open dropdown panel. Only
  the top bar is built; the panel needs a Webstudio interaction to drive it.
- **Social icons** in the footer are not included.
- **Hidden layers** in the frame (a "Tailored for the Modern Gentleman"
  menswear design, plus duplicate `BG` frames) are ignored — they are marked
  hidden in Figma.
- The Results body copy is the designer's placeholder ("Trade Foresight's
  powerful dataset…"), and the footer paragraph is Lorem Ipsum. Both are
  carried over verbatim rather than invented.

## Figma page inventory (file `YcekX1kGhoti7ssk1sOlnr`)

The design file holds three top-level Figma pages: `Botnizer Final Website
Design` (0:1), `Components` (4:31897), `Workshop` (4:31898). Note that
`get_metadata` on `0:1` returns ~1.36M characters — too large to read
directly; extract top-level frames from the saved tool output instead.

Each website page exists in two desktop revisions plus a mobile revision.
**Set B is the one to build from.**

| Page | Set A (older) | Set B — use this | Mobile (393px) |
| --- | --- | --- | --- |
| Home | 4:2759 / 4:3362 | 65:49189 (New Home Page-updated) | 133:7947 |
| Solutions | 4:24331 | 4:35995 | 155:48909 |
| Digital Signage | 4:24715 | 4:36302 | 164:7365 |
| Drive-Thru | 4:24991 | 4:36578 | 174:28914 |
| Case Study Detailed | 4:25516 | 4:36956 | 164:48589 |
| Case Study | 4:25721 | 4:37161 | 170:7779 |
| About us | 4:25937 | 4:37370 | 170:28649 |
| Contact us | 4:26147 | 4:37561 | 170:49856 |

### Build status

| Webstudio page | Source node | State |
| --- | --- | --- |
| `/` | QSR design export (not Figma) | built, published |
| `/new-home` | 65:49189 | built, published |
| `/contact` | 4:37561 (Set B) | built, published |
| `/solutions` | 4:35995 (Set B) | built, published |
| Digital Signage, Drive-Thru, Case Study, Case Study Detailed, About us | Set B | **not built yet** |
| Mobile layouts (all pages) | 393px frames | **not built yet** |

`build-figma-contact.mjs` generates `/contact` and reuses `nav`, `footer` and
`caseStudies` from `build-figma-home.mjs`, so shared chrome stays in one place.
Note the shared-fragment import is `./fig-gen.mjs` — copy `build-figma-home.mjs`
to that name in the working folder before running the other generators.

## Figma "Solutions Page" build

`build-figma-solutions.mjs` generates `/solutions` from node `4:35995`
("Solutions Page", Set B, 1440×7263).

Sections, in Figma node order: Nav Bar (4:36301), Hero (4:36103 slider +
4:36287 heading), Measurable Results (4:36284), Solution/offerings heading
(4:36107) + Offering items (4:36110), Solution Categories (4:36286), Platform
Advantage (4:36285), Success Stories (4:36290), CTA form (4:36112), Footer
(4:36229).

`Offering items` (4:36110) and the three Success Stories cards (4:36297-99) are
the *same* Figma components the home page uses, so the generator imports
`offering` and `caseStudies` from `fig-gen.mjs` rather than rebuilding them.

### Deviations from the Figma frame

- **CTA "Waves" background art** (4:36113, ~40 nested vector paths) is replaced
  with a radial gradient on `#111111`. The vectors are decorative.
- **Solution Categories radial gradient** is approximated with a CSS
  `radial-gradient`; the design uses an SVG `radialGradient` with a matrix
  transform.
- **Absolute insets → responsive grids**, as on the other Figma pages. The
  Platform Advantage row is a 4-up `auto-fit` grid rather than the design's
  hand-offset cards (the 4th card sits 4% lower than the other three).
- **Hero image** is the slider frame exported and transcoded to a 1600px-wide
  JPEG (239 KB). The design's `Slider` is an 8-image carousel; only the first
  slide is used, and there is no carousel behaviour — that needs a Webstudio
  interaction.
- The **"biggest operational challenge"** control is a text input with a
  placeholder; the design shows a select whose options are not in the file.
- The CTA band anchors as `#get-in-touch`, not `#contact` — the shared footer
  already owns `id="contact"`, and two of them is an audit error.

### Mobile approach

Pages so far are fluid (`clamp()` + `auto-fit` grids), which reflows but does
not follow the 393px mobile frames. Real per-breakpoint styling goes through
`update-styles`, whose update items accept a `breakpoint` field:

```json
{"updates":[{"instanceId":"...","property":"fontSize",
             "value":{"type":"unit","unit":"px","value":32},
             "breakpoint":"Mobile portrait"}]}
```

Project breakpoints: Base, Tablet (≤991), Mobile landscape (≤767), Mobile
portrait (≤479). So mobile is a second pass over the instance ids returned by
`insert-fragment`, not a change to the fragment itself. Verify with
`screenshot.responsive` / `verify-page-responsive`.

### Tool input shapes that are easy to get wrong

| Tool | Correct input | Wrong guess |
| --- | --- | --- |
| `upload-assets` | `{"assets":[{"name":"file.jpg"}]}` — array of **objects** with a `name`, resolved against `.webstudio/assets/` | `{"files":[...]}` or `{"assets":["file.jpg"]}` — both rejected |
| `update-page-settings` | `{"pageId":..,"values":{"title":..,"description":..}}` — the schema is **flat** | `values.meta.description` — silently accepted, returns `ok: true`, and drops the value |
| `update-page-settings` strings | `title`/`description` are stored as **JS expressions**, so the value must include its own quotes: `"\"My title\""` | a bare string |
| `screenshot.responsive` | needs `viewports` (1–8 objects) **and** a `url` or `path` | `{"pageId":...}` alone |
| `list-texts` | paginates at 20; page with `{"cursor":"20"}`. A `limit` key makes the call fail | `{"limit":500}` |

Because `title`/`description` are expression strings, generate them with
`json.dumps(s, ensure_ascii=False)` — with `ensure_ascii` left on, an em dash
lands in the page title as a literal `—`.

Verify settings actually persisted with `get-page` afterwards; the mutation
reports success either way.

### Large design-context responses

`get_design_context` on a full page frame can exceed the token limit (the
Contact us frame returned ~94K characters). The tool saves the payload to a
file; extract copy, type styles and asset URLs from it with a script rather
than reading it whole.
