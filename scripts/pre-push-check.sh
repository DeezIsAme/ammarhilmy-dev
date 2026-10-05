#!/usr/bin/env bash
# Pre-push guard for the portfolio repository.
#
# Confirms that nothing internal or generated is about to be published:
#   - node_modules / .next must not be tracked
#   - the internal working documents must not be tracked
#   - the duplicate root photo must not be tracked
#   - the local CodeGraph index must not be tracked
#
# Usage: bash scripts/pre-push-check.sh   (run from anywhere)

cd "$(dirname "$0")/.." || exit 1

TMP="${TMPDIR:-/tmp}/porto-prepush"
mkdir -p "$TMP"

git ls-files > "$TMP/tracked.txt"
git status --porcelain > "$TMP/status.txt"
git log --oneline > "$TMP/log.txt"

TRACKED=$(wc -l < "$TMP/tracked.txt")
DIRTY=$(wc -l < "$TMP/status.txt")
LEAKS=$(grep -cE '^(node_modules|\.next)/' "$TMP/tracked.txt")

echo "Repository state"
echo "  tracked files      : $TRACKED"
echo "  uncommitted changes: $DIRTY"
echo "  node_modules/.next : $LEAKS tracked (must be 0)"
echo

FAIL=0
echo "Must NOT be tracked:"
for f in WEB-PORTO-SPEC.md WEB-PORTO-PLAN.md DSC05785-removebg-preview.png next-env.d.ts .codegraph; do
  if git ls-files --error-unmatch "$f" > /dev/null 2>&1; then
    printf '  %-34s TRACKED  <-- fix this\n' "$f"
    FAIL=1
  else
    printf '  %-34s absent\n' "$f"
  fi
done

if [ "$LEAKS" -ne 0 ]; then
  echo
  echo "node_modules or .next is tracked. Remove it with:"
  echo "  git rm -r --cached node_modules .next"
  FAIL=1
fi

echo
echo "Recent commits:"
sed 's/^/  /' "$TMP/log.txt" | head -5

echo
if [ "$FAIL" -eq 0 ] && [ "$LEAKS" -eq 0 ]; then
  echo "PASS — safe to push."
  exit 0
fi

echo "FAIL — resolve the items above before pushing."
exit 1
