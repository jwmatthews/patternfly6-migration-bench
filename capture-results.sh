#!/usr/bin/env bash
set -eo pipefail

# capture-results.sh — After running the migration pipeline, capture all
# semver artifacts + kantra output into a results directory.
#
# Usage:
#   ./capture-results.sh <branch-name> <rules-temp-dir> [migration-temp-dir]
#
# Example:
#   ./capture-results.sh semver/goose/051526-0130 /tmp/pf-rules.abc123 /tmp/pf-migrate.xyz789

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [[ $# -lt 2 ]]; then
    echo "Usage: $0 <branch-name> <rules-temp-dir> [migration-temp-dir]"
    echo ""
    echo "Arguments:"
    echo "  branch-name       The git branch with migration output (e.g. semver/goose/051526-0130)"
    echo "  rules-temp-dir    Path to the rules temp dir (has semver_report.json, semver_rules/)"
    echo "  migration-temp-dir  Optional path to migration temp dir (has kantra/ output)"
    echo ""
    echo "The rules temp dir is printed by run.sh as 'Temp directory: /tmp/pf-rules.XXXXXX'"
    echo "The migration temp dir is printed as 'Temp dir: /tmp/pf-migrate.XXXXXX'"
    exit 1
fi

BRANCH="$1"
RULES_TEMP="$2"
MIGRATE_TEMP="${3:-}"

[[ -d "$RULES_TEMP" ]] || { echo "ERROR: Rules temp dir not found: $RULES_TEMP"; exit 1; }

# Create results directory
DATE_PREFIX="$(date +%Y-%m-%d)"
BRANCH_SLUG="$(echo "$BRANCH" | tr '/' '-')"
RESULTS_DIR="$SCRIPT_DIR/results/${DATE_PREFIX}-${BRANCH_SLUG}"

mkdir -p "$RESULTS_DIR/semver/semver_rules"
mkdir -p "$RESULTS_DIR/semver/fix-guidance"
mkdir -p "$RESULTS_DIR/semver/kantra"

echo "=== Capturing results ==="
echo "Branch:     $BRANCH"
echo "Rules from: $RULES_TEMP"
echo "Results to: $RESULTS_DIR"
echo ""

# 1. semver_report.json
if [[ -f "$RULES_TEMP/semver_report.json" ]]; then
    cp "$RULES_TEMP/semver_report.json" "$RESULTS_DIR/semver/"
    echo "[x] semver_report.json ($(du -h "$RULES_TEMP/semver_report.json" | cut -f1))"
else
    echo "[ ] semver_report.json — not found"
fi

# 2. semver_rules/
if [[ -d "$RULES_TEMP/semver_rules" ]]; then
    cp "$RULES_TEMP/semver_rules/"*.yaml "$RESULTS_DIR/semver/semver_rules/" 2>/dev/null || true
    COUNT=$(ls "$RESULTS_DIR/semver/semver_rules/"*.yaml 2>/dev/null | wc -l)
    echo "[x] semver_rules/ ($COUNT yaml files)"
else
    echo "[ ] semver_rules/ — not found"
fi

# 3. fix-guidance/
if [[ -d "$RULES_TEMP/semver_rules/fix-guidance" ]]; then
    cp -r "$RULES_TEMP/semver_rules/fix-guidance/"* "$RESULTS_DIR/semver/fix-guidance/" 2>/dev/null || true
    echo "[x] fix-guidance/ (from semver_rules/fix-guidance/)"
elif [[ -d "$RULES_TEMP/fix-guidance" ]]; then
    cp -r "$RULES_TEMP/fix-guidance/"* "$RESULTS_DIR/semver/fix-guidance/" 2>/dev/null || true
    echo "[x] fix-guidance/ (from fix-guidance/)"
else
    echo "[ ] fix-guidance/ — not found"
fi

# 4. kantra output
KANTRA_FOUND=false
if [[ -n "$MIGRATE_TEMP" && -d "$MIGRATE_TEMP/kantra" ]]; then
    cp -r "$MIGRATE_TEMP/kantra/"* "$RESULTS_DIR/semver/kantra/" 2>/dev/null || true
    KANTRA_FOUND=true
    echo "[x] kantra/ (from migration temp dir)"
elif [[ -d "$RULES_TEMP/kantra" ]]; then
    cp -r "$RULES_TEMP/kantra/"* "$RESULTS_DIR/semver/kantra/" 2>/dev/null || true
    KANTRA_FOUND=true
    echo "[x] kantra/ (from rules temp dir)"
fi

# Also check the bench dir for .pf-migration-logs with kantra output
if [[ "$KANTRA_FOUND" == false ]]; then
    if [[ -f "$SCRIPT_DIR/.pf-migration-logs/kantra.log" ]]; then
        cp "$SCRIPT_DIR/.pf-migration-logs/kantra.log" "$RESULTS_DIR/semver/kantra/" 2>/dev/null || true
        echo "[~] kantra/ (log only, from .pf-migration-logs/)"
    else
        echo "[ ] kantra/ — not found (pass migration-temp-dir as 3rd arg)"
    fi
fi

echo ""
echo "=== Done ==="
echo "Results directory: $RESULTS_DIR"
echo ""
echo "Next: run evaluate-migration in Claude Code:"
echo "  cd $(pwd)"
echo "  claude"
echo "  /evaluate-migration $BRANCH"
