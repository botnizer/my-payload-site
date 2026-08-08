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
