# Handoff prompt — Webstudio × Figma build

Paste everything below the line into a new session on branch
`claude/webstudio-publish-cli-hf7v20`.

---

## Task

Continue building the Botnizer website in Webstudio from the Figma design file.
Three pages are already live; six desktop pages and the mobile layouts remain.
Read `webstudio/README.md` in this repo first — it has the full command
reference and the failure modes already diagnosed. Do not re-derive them.

## Project facts

- Repo `botnizer/my-payload-site`, branch `claude/webstudio-publish-cli-hf7v20`
- Webstudio project id `613132d8-0f0f-4042-8000-05266a036da6`, self-hosted at
  `https://webstudio.botnizer.com`
- Figma file key `YcekX1kGhoti7ssk1sOlnr`
- Publish target: staging, project domain `web-botnizer-57ix6`
- Token role `builders` — `canPublishProjectDomain: true`, `canPublish: false`
  (staging publishes work, production does not)

## Setup (the container is ephemeral — this must be redone every session)

```bash
mkdir -p ~/Desktop/webstudio-qsr && cd ~/Desktop/webstudio-qsr
npm init -y && npm install --save-dev webstudio@latest
export NODE_USE_ENV_PROXY=1 NODE_EXTRA_CA_CERTS=/root/.ccr/ca-bundle.crt
npx webstudio link --link "<share link with authToken — ask the user>"
npx webstudio permissions        # connectivity check, should print role: builders
```

Copy `webstudio/build-figma-home.mjs` and `webstudio/build-figma-contact.mjs`
from the repo into that folder — they export the shared `nav`, `footer` and
`caseStudies` fragments that every page reuses.

## Gotchas already paid for — do not rediscover these

1. **`NODE_USE_ENV_PROXY=1` is mandatory.** Node's built-in fetch ignores
   `HTTPS_PROXY`, so the CLI reports `Host not in allowlist` while `curl` to
   the same host succeeds. Export it for every command.
2. **`webstudio sync` is refused server-side and cannot be fixed from here.**
   The instance rejects `x-webstudio-client: cli` on
   `build.loadProjectBundleByProjectId` regardless of version (even `999.0.0`),
   returning 412 with a misleading "update the CLI" message. Do not chase it.
   Consequence: `webstudio build`, `webstudio preview` and
   `screenshot --path` are all unavailable, because they consume the synced
   bundle. Verify with `webstudio audit` plus `list-texts` / `list-instances`
   read-backs instead.
3. **Screenshots need an explicit browser:**
   `WEBSTUDIO_BROWSER_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome`
4. **`upload-assets` resolves paths against `.webstudio/assets/`** — copy files
   there first and pass bare filenames.
5. **Upload size limit.** 2.0 MB uploads fine; a 10.1 MB mp4 returned
   `502 Bad Gateway`. Keep assets small.
6. **`publish status` takes `--job`, not `--job-id`.**
7. **`get_design_context` on a full page frame exceeds the token limit** (the
   Contact us frame was ~94K chars). The tool saves the payload to a file —
   extract copy, type styles and asset URLs from it with a Python script
   rather than reading it whole. Do not call `get_metadata` on page `0:1`; it
   returns 1.36M characters.
8. **Load the Figma design-to-code skill before `get_design_context`** — read
   the `skill://figma/figma-design-to-code/SKILL.md` MCP resource, and pass
   `skillNames: "resource:figma-design-to-code"`.

## Current state

Build version 23, published to `web-botnizer-57ix6`. The user has reviewed the
live pages and says they look mostly right.

| Webstudio page | pageId | root instanceId | Source |
| --- | --- | --- | --- |
| `/` Home | `psnMfrvtjylOD7HAIW7Fh` | `gAjzfwdgTVTr0bkZO_d9B` | QSR zip export, not Figma |
| `/new-home` | `Hc8FZ7Ii2-_uJ9OQnHuqi` | `-0LaMMjJQ_vQ6QCmYUzQQ` | Figma `65:49189` |
| `/contact` | `LeT9OotessIxvmc5_Kkol` | `jgMB3UgyIKyr-2P6vVmPR` | Figma `4:37561` |
| `/*` 404 | `DIu9Rvtd_945s7Pvo-Vky` | — | untouched, carries all open audit warnings |

Assets for the built pages are already uploaded to the project — run
`webstudio list-assets --json` before uploading anything, to avoid duplicates.

## Work remaining

### 1. Six desktop pages — build from Set B only

Each page exists in three revisions in the Figma file. **Set B is the one to
build.** Confirmed by the user.

| Page | Set B node | Mobile node (393px) |
| --- | --- | --- |
| Solutions | `4:35995` | `155:48909` |
| Digital Signage | `4:36302` | `164:7365` |
| Drive-Thru | `4:36578` | `174:28914` |
| Case Study | `4:37161` | `170:7779` |
| Case Study Detailed | `4:36956` | `164:48589` |
| About us | `4:37370` | `170:28649` |

(Already built: Home `65:49189` → mobile `133:7947`; Contact us `4:37561` →
mobile `170:49856`.)

Suggested order: Solutions first — it is the main nav destination — then
Drive-Thru and Digital Signage, then About us and the two Case Study pages.

### 2. Mobile layouts — a second pass, not a rebuild

Everything built so far is fluid (`clamp()` type, `auto-fit` grids), which
reflows but does not follow the 393px mobile frames. Real per-breakpoint
styling goes through `update-styles`, whose update items accept a `breakpoint`
field:

```json
{"updates":[{"instanceId":"...","property":"fontSize",
             "value":{"type":"unit","unit":"px","value":32},
             "breakpoint":"Mobile portrait"}]}
```

Project breakpoints: Base `vzMekpGkImDOQHYc8ki5A`, Tablet ≤991
`H-3y3MJf7cdkF1fB89agn`, Mobile landscape ≤767 `_ds7WAAYklI3so1QvUiKr`,
Mobile portrait ≤479 `3prRc3M2AaphAJiQDqQk0`.

So: capture the instance ids returned by `insert-fragment`, read the mobile
Figma frame, then write overrides against Mobile portrait / Mobile landscape.
Verify with `screenshot.responsive` and `verify-page-responsive`. Today all
three non-base breakpoints carry zero declarations, which the audit reports as
`unused-breakpoint`; that should disappear once this pass lands.

### 3. Tweaks requested by the user

The user reviewed the live pages and has changes to make. **Ask them for the
list before starting new pages** — fixes to shipped pages outrank new builds.

Known content issues already identified, worth confirming as part of that list:

- The Results section on `/new-home` uses the designer's placeholder copy
  ("Trade Foresight's powerful dataset…") — carried over verbatim from Figma.
- The footer paragraph on `/new-home` is Lorem Ipsum — also verbatim from Figma.
- On `/contact`, the "Why Partners Choose Botnizer" sentence trails off in the
  design at "…retail brands in KSA, Bahrain, and". It was completed as
  "KSA, Bahrain, and Qatar" — an inference, needs confirming.
- `/new-home` omits three things from the design: the nav mega-menu panel
  (needs a Webstudio interaction), the Technical section's decorative
  connector-line SVGs, and the footer social icons.
- `/` hero has no video: the design's 10 MB mp4 exceeds the upload limit.

## Conventions to follow so new pages match

- **One `insert-fragment` per page, `mode: "replace"` against the page root**,
  with the whole page as `header` + `main` + `footer`. Building section by
  section leaves the page without a `main` landmark and the audit flags it.
- Always `--dry-run` first, then commit.
- Generate the JSX from a Node script holding the content as data arrays
  (see `build-figma-home.mjs`) rather than hand-writing markup. It is far less
  error-prone and makes revisions cheap.
- Webstudio JSX: `ws.element` with `ws:tag`, `$.Image` with
  `src={new AssetValue("<assetId>")}`, styles via ``ws:style={css`...`}``.
  Escape `{`/`}` in text content.
- Type: Fira Sans throughout; Poppins for the Contact form and hero, matching
  the design. Palette: `#0F9300` primary green, `#15CA01` hero subhead,
  `#13C000` nav rule, `#333333` headings, `#464A4B` body, `#F1F1F1` cards,
  `#E6E9EE` borders, `#0033C3` / `#224EED` links.
- Set each page's `title` and `meta.description` (description goes under
  `values.meta.description`, not `values.description`).
- Run `webstudio audit --json` after each page; findings on `/*` are the
  untouched 404 page and can be ignored.

## Finishing each page

1. `webstudio audit` clean for the new path
2. Commit the generator script to `webstudio/` in the repo and push
3. Update the build-status table in `webstudio/README.md`
4. `webstudio publish deploy --target staging --json`, then
   `publish status --job <id>`
5. Tell the user what deviates from the Figma frame, explicitly

## Security note

The share link carries a live build credential. Keep it out of commits, PR
bodies and CI logs — pass it via `WEBSTUDIO_SHARE_LINK`. It has been pasted in
chat several times and the user has been asked to rotate it.
