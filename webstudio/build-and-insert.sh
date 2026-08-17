#!/usr/bin/env bash
# Regenerate every page fragment and push it into the Webstudio project.
#
# Why this script exists: the generators are version-controlled here, but the CLI
# only works from the linked working folder (the one holding .webstudio/ and
# node_modules/). Running `node build-figma-*.mjs` in the repo writes .temp/
# JSON here, while `npx webstudio insert-fragment --input-file .temp/...` reads
# .temp/ from the working folder. Those are two different directories, and the
# working folder keeps stale JSON from previous runs — so the insert silently
# succeeds while pushing last week's markup. Always copy, generate and insert
# in the working folder, which is what this does.
#
#   ./webstudio/build-and-insert.sh                 # all pages
#   ./webstudio/build-and-insert.sh fig-new-home    # one page
#
# WORK_DIR can override the linked folder.
set -euo pipefail

SRC_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORK_DIR="${WORK_DIR:-$HOME/Desktop/webstudio-qsr}"

if [ ! -d "$WORK_DIR/.webstudio" ]; then
  echo "No linked Webstudio folder at $WORK_DIR — run webstudio/setup.sh first." >&2
  exit 1
fi

# fig-gen.mjs is the shared-fragment module the page generators import. It is a
# copy of build-figma-home.mjs, so it has to be refreshed alongside it.
cp "$SRC_DIR"/*.mjs "$WORK_DIR/"
cp "$SRC_DIR/build-figma-home.mjs" "$WORK_DIR/fig-gen.mjs"

declare -A PAGES=(
  [fig-new-home]=build-figma-new-home
  [fig-solutions]=build-figma-solutions
  [fig-drive-thru]=build-figma-drive-thru
  [fig-digital-signage]=build-figma-digital-signage
  [fig-about]=build-figma-about
  [fig-case-studies]=build-figma-case-studies
  [fig-case-study-detail]=build-figma-case-study-detail
  [fig-contact]=build-figma-contact
)

targets=("$@")
if [ ${#targets[@]} -eq 0 ]; then targets=("${!PAGES[@]}"); fi

cd "$WORK_DIR"
for t in "${targets[@]}"; do
  gen="${PAGES[$t]:-}"
  if [ -z "$gen" ]; then echo "Unknown page '$t'" >&2; exit 1; fi
  # Delete first so a generator that fails can never leave a stale file to insert.
  rm -f ".temp/$t.json"
  printf '%-24s ' "$t"
  node "$gen.mjs" >/dev/null
  npx webstudio insert-fragment --input-file ".temp/$t.json" --json \
    | python3 -c 'import json,sys; d=json.load(sys.stdin); print(("ok " if d.get("ok") else "FAIL ") + str(len(d.get("data",{}).get("instanceIds",[]))) + " instances")'
done
