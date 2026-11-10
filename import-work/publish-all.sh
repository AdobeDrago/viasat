#!/bin/bash
# Upload media to DA, rewrite image URLs in DA bodies, publish pages. Token from env only.
set -e
cd "$(dirname "$0")"
REPO=..
B=https://admin.da.live/source/AdobeDrago/viasat
REF=${REF:-home-page}
for f in $REPO/media/*; do
  n=$(basename "$f")
  case "$n" in *.png) t=image/png;; *) t=image/jpeg;; esac
  curl -s -o /dev/null -w "asset $n %{http_code}\n" -X PUT -H "Authorization: Bearer $DA_TOKEN" -F "data=@$f;type=$t" "$B/assets/$n"
done
python3 ~/.claude/skills/eds-parity-rebuild/scripts/build.py --project . >/dev/null
sed -i '' 's#src="/media/#src="https://content.da.live/AdobeDrago/viasat/assets/#g' da/*.html
export PATH=$HOME/.local/node/bin:$PATH
node ~/.claude/skills/eds-parity-rebuild/scripts/publish.js --project . --yes --ref "$REF"
