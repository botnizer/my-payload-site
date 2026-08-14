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

## Figma "Drive-Thru Page" build

`build-figma-drive-thru.mjs` generates `/drive-thru` from node `4:36578`
("Drive-Thru Page", Set B, 1440×10542).

Sections: Nav Bar, Hero (4:36686 slider + 4:36691 heading), Bottleneck Problem
(4:36692), product visual (4:36953), three alternating product bands —
High-Brightness Displays (4:36694), Integrated Audio Systems (4:36695), Smart
Media Players (4:36696) — AI-Powered Optimization (4:36697), ROI Calculator
(4:36698), Seamless Integration (4:36776), Success Stories (4:36777), CTA
(4:36834), Footer.

The Smart Media Players image is byte-identical to the already-uploaded
`fig-menu-board` asset, so it is reused rather than re-uploaded. Two of the
four AI-Optimization icons are the same glyphs as the Solutions page's
Platform Advantage cards (`zXkO4B`, `lO2Ca6`) and are reused as well.

### Deviations from the Figma frame

- **The ROI calculator does not calculate.** The design (4:36698) is a live
  widget whose Totals panel recomputes from the form inputs and a dilution
  slider. It is built as a static form showing the design's own figures;
  wiring it needs Webstudio variables and expressions.
- **The calculator's copy is placeholder** and reads as boilerplate from an
  equity-compensation template — "Maths is confusing. However, maths are a
  crucial part of your compensation", plus Totals rows labelled "Quantity of
  options" and "Total cost of outstanding shares". Carried over verbatim
  rather than invented; it needs real drive-thru copy.
- **Success Stories testimonials are lorem-style placeholder text**
  ("Blessing welcomed ladyship she met humoured sir breeding her."), both
  attributed to "Linda, Project Manager". Also verbatim from the design.
- **CTA "Waves" background art** replaced with a radial gradient, as on
  Solutions.
- Absolute insets rebuilt as responsive grids; the product bands alternate
  via `order` rather than fixed left/right coordinates.
- Hero uses the first slide of the 8-image `Slider`; no carousel behaviour.

## Figma "Digital Signage Page" build

`build-figma-digital-signage.mjs` generates `/digital-signage` from node
`4:36302` (Set B, 1440×8372).

Sections: Nav, Hero (4:36465), stat strip (4:36472), pictures collage +
intro (4:36574), three feature bands — Creative Studio (4:36471), Indoor
Menu Boards (4:36575), Outdoor Menu Boards (4:36573) — Drive-Thru
Optimization band (4:36473), the home page's Technical section (4:36478,
imported from `fig-gen.mjs`), ROI calculator (4:36479 + 4:36555, imported
from `fig-shared.mjs`), free-trial CTA (4:36556), Footer.

All three feature images are byte-identical to assets already in the
project (`fig-menu-board`, `fig-kiosk`, `fig-drive-thru`) and are reused,
as are two of the collage tiles (`dt-audio`, `dt-bright`).

### Deviations from the Figma frame

- **Collage rebuilt as a CSS grid.** The design (4:36574) hand-places five
  images; they are laid out as a responsive grid instead.
- The free-trial CTA's mockup (4:36564) is a single flattened export rather
  than the layered dashboard + phone composite.
- The ROI calculator carries the same caveats as on Drive-Thru: static, and
  its copy is equity-calculator placeholder text.
- The layer for the CTA heading is named "Heading 3 → Get Your 14 Days Free
  Trial" but renders the Ready-to-Transform headline; the rendered copy is
  what was built.

## Figma "About us" build

`build-figma-about.mjs` generates `/about` from node `4:37370` (Set B,
1440×7744): hero, The Art of Connection band, the Purpose / Vision / Mission
trio, Our Impact stats, Hear from Our CEO, the home page's `trust` band
(the design's "Trusted by / 100+ Businesses" logo wall is the same
component), and the free-trial CTA.

`get_design_context` on this frame returns ~65K characters and exceeds the
tool's token limit. It saves the payload to a file; the copy, image
constants and type styles were extracted from it with a Python script rather
than read whole — see the note under "Large design-context responses".

### Deviations from the Figma frame

- **The CEO quote is Lorem Ipsum** in the design and is carried over verbatim.
  It needs real copy.
- **The Art of Connection video does not play.** The design shows a video
  player; the file has no playable source, so the poster frame is used with
  the play glyph as a static overlay.
- The Our Impact figures are bare numbers in the design (`40`, `98.2`, `28`,
  `99.9`) with no unit — reproduced as-is; they most likely want `%`.
- The Our Purpose image and the CTA mockup are byte-identical to
  `fig-drive-thru` and `ds-cta` respectively and are reused.

## Figma Case Study builds

`build-figma-case-studies.mjs` generates `/case-studies` from node `4:37161`
(Set B, 1440×5178): billboard hero, dark intro strip, "Real Results from
Restaurant Leaders", the "Botnizer Talks" six-card grid, the reused trust
band, an image gallery and the free-trial CTA.

`build-figma-case-study-detail.mjs` generates `/case-studies/detail` from
node `4:36956` (Set B, 1440×6320): hero with a dated title bar, the
Overview / Objectives / Solutions article, the same gallery, the Results
band, a testimonial, Success Stories (the shared `caseStudies` cards) and
the CTA.

Both frames exceed the `get_design_context` token limit; their copy and
asset URLs were extracted from the saved payloads with a script.

### Deviations from the Figma frames

- **The six "Botnizer Talks" cards are three case studies shown twice.** The
  design repeats the same titles, solutions and results with different
  imagery, so the generator indexes the three-item `cases` array modulo 3
  rather than inventing three more.
- Several images in these frames are byte-identical to assets already in the
  project — the Case Study Detailed hero is `fig-case-1`, the gallery's night
  storefront is `ab-mcd`, and two "Botnizer Talks" tiles are `fig-case-2`
  and `fig-case-3`. All are reused rather than re-uploaded.
- "Read More" on the index cards links to `/case-studies/detail`; the design
  has no per-case destinations.
- The "Share" control in the detail hero is a static link — no share
  behaviour is specified in the design.

## Home page background video

The video lives **inside the hero section**, absolutely positioned and clipped
by the hero's own `overflow: hidden`, so it cannot reach any other part of the
page. Layer order within the hero: video (`z-index: 0`) → gradient scrim and
bottom fade (`1`) → copy (`2`). The page root is an ordinary opaque white page,
like every other.

An earlier version used a viewport-`fixed` layer at `z-index: -1` behind the
whole document. In theory the sections above it paint their own opaque
backgrounds and cover it; in practice it showed through at the foot of the
page. **Do not reintroduce it** — scoping the media to the section that uses it
removes a whole class of stacking bug and needs no cooperation from any other
section.

`HERO_VIDEO` at the top of `build-figma-home.mjs` holds the asset id
(`rVCSVikBmzJjovMSU9AY4`, the 2.8 MB Acrelec drive-thru teaser). Set it to
`null` and the same slot renders the still hero image instead, so the page is
never in a broken state.

**No `poster`.** A poster pointing at the old hero photo flashed a completely
different image for about a second on every load, before the first video frame
painted. Without one, the hero's own `#1A1A1A` covers that moment and reads as
the video fading up. Only add a poster if it is a frame *from this video*.

**Write the video's boolean props as `{true}`, not `"true"`, and use React's
camelCase names.** `autoplay="true"` stores as `type: "string"`; `muted` then
never reaches the DOM *property*, and browsers block autoplay on a video that
is not muted — so the background silently stays on the poster frame. Written
as `autoPlay={true} muted={true} loop={true} playsInline={true}` they store as
`type: "boolean"`. `src`/`poster` take `new AssetValue("<id>")` on a plain
`ws:element` and store as `type: "asset"`, same as on `$.Image`.

**Upload ceiling.** A 10.1 MB mp4 was rejected with `502 Bad Gateway`; 2.0 MB
and 2.9 MB both uploaded fine, so the limit sits somewhere between 3 and 10 MB.
Anything larger should be hosted externally and referenced by URL.

Note the sandbox's only ffmpeg is Playwright's build, compiled with
`--disable-everything` and just vp8/webm/png — it cannot even demux an mp4, so
video cannot be transcoded here without installing a full ffmpeg first.

### The header reads as black glass, not grey

A flat `rgba(0,0,0,0.55)` sheet over bright footage averages out to grey — it
veils the video rather than tinting it. Three things together fix that, and all
three are load-bearing:

| | |
| --- | --- |
| `background-image: linear-gradient(180deg, rgba(0,0,0,0.88) → 0.66 → 0.54)` | depth: deepest at the viewport edge, easing off toward the green rule |
| `backdrop-filter: blur(20px) saturate(170%)` | `saturate` is what keeps the footage's colour alive through the tint; blur alone just washes it neutral |
| `box-shadow: inset 0 1px 0 rgba(255,255,255,0.12), 0 10px 30px rgba(0,0,0,0.28)` | a lit top edge and lift off the page |

The net result is **darker** than the flat version, not lighter. That matters
because the header is shared: the same bar sits over white sections on the
other seven pages, where a more transparent treatment would drop the white
links to roughly 2.6:1 contrast. Verify all four properties survive a
re-insert — gradients, filter functions and multi-layer shadows are each
things the style pipeline could drop:

```
get-styles '{"instanceIds":["<header>"],"verbose":true}'
# expect backgroundColor + backgroundImage + backdropFilter (blur AND saturate)
# + boxShadow with 2 layers, the first inset
```

A genuinely transparent nav at the top that solidifies on scroll needs either a
Webstudio interaction or a CSS scroll-driven animation, and the latter needs
`@keyframes`, which cannot be declared from the `css` template.

## Navigation

`build-figma-home.mjs` exports a `ROUTES` map plus `EXPERIENCE_LINKS`,
`PRODUCT_LINKS` and `COMPANY_LINKS`. The nav dropdown and the footer columns
both read from those arrays, so the two cannot drift apart. Change a
destination in one place.

Self-Ordering Kiosk, NFC Google Review Cards and Digital Menu Board have no
page of their own — they exist only as cards in the Solutions offering grid,
so they deep-link to `/solutions#solutions` and `/digital-signage`.

### The "What we do" dropdown

The menu sits beside the logo: the header is `justify-content: flex-start`
with a `clamp(20px, 4vw, 56px)` gap, not `space-between` (which pushed the
whole menu to the far right of the bar).

**Webstudio's `css` template supports self-states but not descendant
combinators.** `&:hover { … }` on an element persists as a real `:hover`
state; `.panel { … }` and `&:hover .panel { … }` are silently dropped —
`insert-fragment` still returns `ok: true` and the rules never appear in
`get-styles`. So a parent cannot style a child on hover.

What it *does* keep, all verified by probe:

| Written | Stored as |
| --- | --- |
| `--menu-open: 0;` plus a `:hover` value | custom property, per state |
| `opacity: var(--menu-open)` | `{"type":"var"}` |
| `transform: translateY(var(--menu-y))` | var resolves *inside* the function |
| `visibility: var(--menu-vis)` | var on a keyword property |
| `transition-property/-duration/-delay` | layered lists |

That combination is what makes the reveal animatable. The trigger's `:hover`
and `:focus-within` flip a set of variables; the panel reads them and
transitions:

```
trigger: position: relative; padding-bottom: 26px; margin-bottom: -26px;
         --menu-open: 0; --menu-y: -10px; --menu-vis: hidden;
         --menu-delay: 220ms; --menu-rot: 0deg;
         &:hover, &:focus-within { --menu-open: 1; --menu-y: 0px;
                   --menu-vis: visible; --menu-delay: 0ms; --menu-rot: 180deg; }
panel:   top: 100%;  visibility: var(--menu-vis);
         opacity: var(--menu-open); transform: translateY(var(--menu-y));
         transition-delay: 0ms, 0ms, var(--menu-delay);
```

Three things are load-bearing:

1. **The trigger keeps its own `visibility`.** Putting `visibility: hidden` on
   the trigger would hide the panel by inheritance, but it would also make the
   trigger's padding non-hit-testable — reintroducing the gap bug below. Only
   the panel's visibility is driven, via the variable.
2. **`--menu-delay` is a variable, not a constant.** It holds `visibility` on
   for the length of the fade when closing and drops to `0ms` when opening, so
   the close animates instead of snapping.
3. **The trigger's `padding-bottom` and the panel having no `margin-top`.** Any
   gap between them is dead space belonging to neither element: the pointer
   leaves the trigger on the way down, `:hover` goes false and the panel closes
   before it can be reached. The padding stretches the hover target to the
   header's bottom edge (25px padding + 1px border), the negative margin stops
   that growing the nav row, and `top: 100%` resolves against the trigger's
   *padding* box so the panel lands flush.

The panel spans the full page width: the trigger is deliberately *not*
positioned, so the panel's containing block is the sticky header and
`left/right: 0` resolve edge to edge, with an inner wrapper holding the page
gutters and a 1300px max-width. Custom properties still reach it because they
inherit through the DOM regardless of what the panel is positioned against.

Nav links transition `color` to `#13C000` on hover. There is no chevron.

Caveat: the panel stays in the DOM when closed (`visibility: hidden`, not
removed), and at 1040px wide it needs a mobile treatment — hover is not
available on touch. Both belong to the mobile pass.

Note that **none of this can be verified with `get-styles`.** Declarations
store correctly even when the geometry or hit-testing is wrong. Check it by
hovering the published page.

## The page `<body>` is not part of any fragment

`insert-fragment` with `mode: "replace"` against a page root replaces the
**body's children**; the body element itself keeps its own styles, and no
generator touches them. Out of the box every page body had *zero* declarations
— including no margin reset — so the browser default `body { margin: 8px }`
left a white band around the page. It was invisible while the footer was white
and became obvious the moment the footer went charcoal.

Each page body is therefore set once, via `update-styles`, to
`margin: 0` on all four sides and `background-color: #242829`. The charcoal
also means overscroll and any short page show the footer colour rather than
white. These survive fragment re-inserts, so this is a one-time fix — but any
**new** page needs it applied.

### Two ways these tools report success while hiding the truth

Both cost real time in this session; check for them before believing a result.

- **`get-styles` paginates.** With several `instanceIds` it returns only the
  first page of declarations and an instance whose styles exist can look
  empty. Verify per instance, or follow `nextCursor`. The same applies to
  `list-texts` and `list-assets` — and to `Counter(...).most_common(n)` on the
  results, which silently drops the value you are looking for.
- **`update-styles` returns `ok: true` for a large batch it does not fully
  apply.** Fifty updates across ten instances landed about twenty. Apply per
  instance and verify per instance.

## Shared fragments

| Module | Exports | Used by |
| --- | --- | --- |
| `fig-gen.mjs` (copy of `build-figma-home.mjs`) | `nav`, `footer`, `offering`, `caseStudies`, `technical`, `hero`, `trust`, `vision`, `elevate`, `results` | every Figma page |
| `fig-shared.mjs` | JSX helpers, type/colour constants, `chip`, `iconCard`, `ctaForm`, `roiCalculator(heading, intro)` | Solutions, Drive-Thru, Digital Signage |

`build-figma-new-home.mjs` composes `/new-home` purely from `fig-gen.mjs`
exports. It exists so the page can be rebuilt whenever the shared nav or
footer changes — previously it was assembled ad hoc on the command line and
had no generator in the repo.

`fig-shared.mjs` was extracted after the Drive-Thru build; Solutions and
Drive-Thru were refactored onto it and verified to emit byte-identical
fragments, so no re-insert was needed.

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
| `/` | 65:49189 (Figma "New Home Page-updated") | built, published — **the site home page** |
| `/old-home` | QSR design export (not Figma) | built, published — superseded, kept for reference |
| `/contact` | 4:37561 (Set B) | built, published |
| `/solutions` | 4:35995 (Set B) | built, published |
| `/drive-thru` | 4:36578 (Set B) | built, published |
| `/digital-signage` | 4:36302 (Set B) | built, published |
| `/about` | 4:37370 (Set B) | built, published |
| `/case-studies` | 4:37161 (Set B) | built, published |
| `/case-studies/detail` | 4:36956 (Set B) | built, published |
| Mobile layouts (all pages) | 393px frames | **not built yet** |

All eight desktop pages from the Figma file are now built. `webstudio audit`
reports zero findings on every one of them; the remaining findings belong to
the untouched `/*` 404 page and to `/contact` (a pre-existing duplicate
`id="contact"` and an h1→h3 jump, both from the earlier build).

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
