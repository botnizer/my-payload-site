# Handoff prompt — Webstudio × Figma build

Paste everything below the line into a new session on branch
`claude/botnizer-webstudio-build-pxdvh8`.

---

## Task

Continue building the Botnizer website in Webstudio from the Figma design file.
**All eight desktop pages are built and published.** What remains is the user's
tweak list and the mobile pass. Read `webstudio/README.md` first — it has the
full command reference and the failure modes already diagnosed. Do not
re-derive them.

## Project facts

- Repo `botnizer/my-payload-site`, branch `claude/botnizer-webstudio-build-pxdvh8`
- Webstudio project id `613132d8-0f0f-4042-8000-05266a036da6`, self-hosted at
  `https://webstudio.botnizer.com`
- Figma file key `YcekX1kGhoti7ssk1sOlnr`
- Publish target: staging, project domain `web-botnizer-57ix6`
- Token role `builders` — `canPublishProjectDomain: true`, `canPublish: false`

## Setup (the container is ephemeral — redo this every session)

```bash
mkdir -p ~/Desktop/webstudio-qsr && cd ~/Desktop/webstudio-qsr
npm init -y && npm install --save-dev webstudio@latest
export NODE_USE_ENV_PROXY=1 NODE_EXTRA_CA_CERTS=/root/.ccr/ca-bundle.crt
npx webstudio link --link "<share link with authToken — ask the user>"
npx webstudio permissions        # should print role: builders
```

Then copy the generators into that folder. **`build-figma-home.mjs` must be
copied as `fig-gen.mjs`** — that is the name every other generator imports:

```bash
cp <repo>/webstudio/build-figma-home.mjs ~/Desktop/webstudio-qsr/fig-gen.mjs
cp <repo>/webstudio/fig-shared.mjs <repo>/webstudio/build-figma-*.mjs ~/Desktop/webstudio-qsr/
```

## Gotchas already paid for — do not rediscover these

1. **`NODE_USE_ENV_PROXY=1` is mandatory.** Node's fetch ignores `HTTPS_PROXY`,
   so the CLI reports `Host not in allowlist` while `curl` succeeds.
2. **`webstudio sync` is refused server-side and cannot be fixed from here.**
   The instance rejects `x-webstudio-client: cli` regardless of version.
   Consequence: `build`, `preview` and `screenshot --path` are unavailable.
   Verify with `audit` plus `list-texts` read-backs instead.
3. **The published site is unreachable from the sandbox.** The `p-…` host 403s
   at the proxy and `web-botnizer-57ix6.*` does not resolve, so
   `screenshot.responsive` (which needs a `url` or `path`) cannot be used for
   visual checks. Publishing itself works fine.
4. **`upload-assets` takes objects:** `{"assets":[{"name":"file.jpg"}]}`,
   resolved against `.webstudio/assets/`. Bare strings and `{"files":…}` are
   both rejected.
5. **`update-page-settings` is flat:** `values.title` / `values.description`.
   `values.meta.description` returns `ok: true` and silently drops the value.
   Both are stored as JS expressions, so the string must carry its own quotes
   (`json.dumps(s, ensure_ascii=False)` — with `ensure_ascii` on, an em dash
   lands in the title as a literal `—`). Always confirm with `get-page`.
6. **`list-texts` paginates at 20**; page with `{"cursor":"20"}`. Passing
   `limit` makes the call fail.
7. **Upload size limit.** ~2 MB is fine; a 10.1 MB mp4 returned 502. Transcode
   large images (Pillow is not preinstalled — `pip install Pillow`).
8. **`get_design_context` on a full page frame exceeds the token limit** (the
   About us, Case Study and Case Study Detailed frames all did). The tool saves
   the payload to a file — extract copy and asset URLs with a Python script.
9. **Load the Figma design-to-code skill before `get_design_context`** — read
   `skill://figma/figma-design-to-code/SKILL.md` and pass
   `skillNames: "resource:figma-design-to-code"`.
10. **Check `list-assets` before uploading.** Many Figma images across pages are
    byte-identical to assets already in the project; compare file sizes.
11. **`publish status` takes `--job`, not `--job-id`.**

## Current state

Build version 44, published to `web-botnizer-57ix6`.

| Webstudio page | pageId | root instanceId | Source |
| --- | --- | --- | --- |
| `/` Home | `psnMfrvtjylOD7HAIW7Fh` | `gAjzfwdgTVTr0bkZO_d9B` | QSR zip export |
| `/new-home` | `Hc8FZ7Ii2-_uJ9OQnHuqi` | `-0LaMMjJQ_vQ6QCmYUzQQ` | Figma `65:49189` |
| `/contact` | `LeT9OotessIxvmc5_Kkol` | `jgMB3UgyIKyr-2P6vVmPR` | Figma `4:37561` |
| `/solutions` | `ZvsZMeSj8Ws9xKOAAMn5f` | `5JiRCfmpKTErOYaN3UNdP` | Figma `4:35995` |
| `/drive-thru` | `BfznHPQH58bvfo4CT9kY1` | `wzfl8B9ShdzugGYR0zNej` | Figma `4:36578` |
| `/digital-signage` | `E9fXaQRgWVkjh3dIeb8dH` | `cPTO5BAE8iaAZ23V4jSG9` | Figma `4:36302` |
| `/about` | `B0E3687aR3t8MApY5bTh1` | `pym2TcUsw3nospq1eInI1` | Figma `4:37370` |
| `/case-studies` | `dXLYFszV3_2o2q-NRFg4X` | `bsNoPbbJ50MqAAlz3bOAF` | Figma `4:37161` |
| `/case-studies/detail` | `BtzZjxxmjg4WCE-RhVsac` | `ea7QGk72H4mlward_X4A1` | Figma `4:36956` |
| `/*` 404 | `DIu9Rvtd_945s7Pvo-Vky` | `iV23KD9hDO2N0ohi5Y5Q6` | untouched |

Audit is clean on every built page. The open findings are on `/*` (untouched)
and `/contact` (pre-existing duplicate `id="contact"` plus an h1→h3 jump).

## Work remaining

### 1. The user's tweak list — ask for it first

The user deferred this once already ("tweaks later"). Ask again before starting
anything else. Known placeholder content carried over verbatim from the design,
all of which needs real copy:

| Page | Placeholder |
| --- | --- |
| `/new-home` | Results section is "Trade Foresight's powerful dataset…" |
| `/new-home`, and the shared footer on every page | Footer paragraph is Lorem Ipsum |
| `/solutions` | Measurable Results intro is the same Trade Foresight text |
| `/drive-thru`, `/digital-signage` | ROI calculator copy is equity-compensation boilerplate ("Maths is confusing… your generic package"), and the Totals rows are labelled "Quantity of options" / "Total cost of outstanding shares" |
| `/drive-thru` | Both Success Stories testimonials are lorem-style text, both attributed to "Linda, Project Manager" |
| `/about` | The CEO quote is Lorem Ipsum; the Our Impact figures have no unit (`40`, `98.2`, `28`, `99.9`) |
| `/contact` | "…retail brands in KSA, Bahrain, and" was completed as "and Qatar" — an inference, still unconfirmed |

Also unbuilt by design decision, worth confirming: the nav mega-menu panel
(needs a Webstudio interaction), the `/new-home` Technical connector-line SVGs,
footer social icons, the `/` hero video (10 MB, over the upload limit), the
drive-thru/digital-signage ROI calculators' arithmetic (needs Webstudio
variables + expressions), and the hero sliders (first slide only, no carousel).

### 2. Mobile pass — a second pass, not a rebuild

Everything is fluid (`clamp()` type, `auto-fit` grids), which reflows but does
not follow the 393px mobile frames. Per-breakpoint styling goes through
`update-styles`, whose update items accept a `breakpoint` field:

```json
{"updates":[{"instanceId":"...","property":"fontSize",
             "value":{"type":"unit","unit":"px","value":32},
             "breakpoint":"Mobile portrait"}]}
```

Breakpoints: Base `vzMekpGkImDOQHYc8ki5A`, Tablet ≤991 `H-3y3MJf7cdkF1fB89agn`,
Mobile landscape ≤767 `_ds7WAAYklI3so1QvUiKr`, Mobile portrait ≤479
`3prRc3M2AaphAJiQDqQk0`. All three non-base breakpoints currently carry zero
declarations, which the audit reports as `unused-breakpoint`.

Mobile Figma frames: Home `133:7947`, Contact `170:49856`, Solutions
`155:48909`, Digital Signage `164:7365`, Drive-Thru `174:28914`, Case Study
`170:7779`, Case Study Detailed `164:48589`, About us `170:28649`.

`insert-fragment` returns the instance ids it created, in document order —
capture them, or re-derive with `list-instances`, then write overrides.

### 3. Optional cleanup

- `/contact` has a duplicate `id="contact"` (audit error): the page's own CTA
  band and the shared footer both use it. The other pages solved this by
  anchoring their CTA as `#get-in-touch`.
- `/contact` also has an h1→h3 heading jump.

## Conventions to follow

- **One `insert-fragment` per page, `mode: "replace"` against the page root**,
  with the whole page as `header` + `main` + `footer`. Section-by-section
  leaves the page without a `main` landmark and the audit flags it.
- Always `--dry-run` first, then commit.
- Generate JSX from a Node script holding content as data arrays.
- Shared fragments live in `fig-gen.mjs` (nav, footer, offering, caseStudies,
  technical, trust, …) and `fig-shared.mjs` (helpers, `chip`, `iconCard`,
  `ctaForm`, `roiCalculator`). Import them; do not re-copy.
- Webstudio JSX: `ws.element` with `ws:tag`, `$.Image` with
  `src={new AssetValue("<assetId>")}`, styles via ``ws:style={css`...`}``.
  Escape `{`/`}` in text. `<figcaption>` must be a direct child of `<figure>`.
- Type: Fira Sans throughout; Poppins for forms, hero headings and CTAs.
  Palette: `#0F9300` primary green, `#15CA01` hero subhead, `#13C000` nav rule,
  `#333333` headings, `#464A4B` body, `#F1F1F1`/`#F9F9F9` cards, `#F6F8FF`
  product bands, `#E6E9EE` borders, `#0033C3`/`#224EED`/`#2859EC` links.
- Set each page's `title` and `description`, then verify with `get-page`.
- Run `webstudio audit --json` after each page.

## Finishing each page

1. `webstudio audit` clean for the new path
2. Commit the generator to `webstudio/` and push
3. Update the build-status table in `webstudio/README.md`
4. `webstudio publish deploy --target staging --json`, then
   `publish status --job <id>`
5. Tell the user what deviates from the Figma frame, explicitly

## Security note

The share link carries a live build credential. Keep it out of commits, PR
bodies and CI logs — pass it via `WEBSTUDIO_SHARE_LINK`. It has been pasted in
chat across several sessions and still needs rotating.
