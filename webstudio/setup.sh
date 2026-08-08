#!/usr/bin/env bash
#
# Connect a local folder to the Webstudio project via the Webstudio CLI.
#
# Usage:
#   WEBSTUDIO_SHARE_LINK='https://p-<project-id>.webstudio.botnizer.com/?authToken=<token>&mode=design' \
#     ./webstudio/setup.sh [target-folder]
#
#   # or pass the link as the second argument
#   ./webstudio/setup.sh ~/Desktop/webstudio-qsr 'https://p-...?authToken=...'
#
# Default target folder: ~/Desktop/webstudio-qsr
#
# The share link contains a credential. Do not commit it, and prefer passing it
# through the environment over typing it into a shared shell history.

set -euo pipefail

TARGET_DIR="${1:-$HOME/Desktop/webstudio-qsr}"
SHARE_LINK="${2:-${WEBSTUDIO_SHARE_LINK:-}}"

if [[ -z "$SHARE_LINK" ]]; then
  echo "error: no share link given." >&2
  echo "       set WEBSTUDIO_SHARE_LINK or pass it as the second argument." >&2
  exit 1
fi

# The CLI reads the origin from the share link's host, so a self-hosted
# instance needs that host reachable from this machine before anything else.
ORIGIN_HOST="$(printf '%s' "$SHARE_LINK" | sed -E 's#^https?://##; s#/.*##')"
BASE_HOST="${ORIGIN_HOST#*.}"

echo "==> target folder : $TARGET_DIR"
echo "==> project host  : $ORIGIN_HOST"
echo "==> api host      : $BASE_HOST"

# Node's built-in fetch ignores HTTPS_PROXY unless told otherwise (Node >= 22.21),
# so the CLI fails behind a proxy even when curl to the same host succeeds.
# No-op on machines with no proxy configured.
export NODE_USE_ENV_PROXY=1

mkdir -p "$TARGET_DIR"
cd "$TARGET_DIR"

if [[ ! -f package.json ]]; then
  npm init -y >/dev/null
fi

echo "==> installing webstudio CLI"
npm install --save-dev webstudio@latest

echo "==> linking project"
npx webstudio link --link "$SHARE_LINK"

echo "==> verifying API access"
npx webstudio permissions

echo "==> syncing project"
npx webstudio sync

cat <<EOF

Linked. The folder is $TARGET_DIR.

Credentials live in the CLI's own config, outside this folder:
  \$HOME/.config/webstudio-nodejs/webstudio-config.json   (macOS/Linux)
Only .webstudio/config.json (the project id) is written into the folder.

Next:
  npx webstudio build --template ssg    # generate a static build
  npx webstudio preview                 # serve the generated build locally
  npx webstudio publish deploy          # publish to staging/production
  npx webstudio connect claude          # write .mcp.json for Claude Code
EOF
