# tackle2-ui PF5→PF6 Migration Analysis

Analysis of a real-world PatternFly 5 to 6 migration to validate our benchmark coverage and semver rule quality.

## Source

**PR**: [konveyor/tackle2-ui #3246 — PF6 migration](https://github.com/konveyor/tackle2-ui/pull/3246)

- **Author**: Radoslaw Szwajkowski (assisted by Cursor / Claude Opus)
- **Merged**: 2026-05-14
- **Scope**: 250 files changed, 2,537 additions, 4,236 deletions across 32 commits
- **Approach**: pf-codemods first, then manual fixes and e2e test repairs

## What We Did

We analyzed every change in the PR to catalog the distinct PF5→PF6 migration patterns a real application requires, then cross-referenced those against two things:

1. **Our benchmark test cases** ([breaking-changes.json](../../breaking-changes.json)) — 85 minimal components exercising known PF6 breaking changes
2. **Our semver-generated rules** — static analysis rules produced by [semver-analyzer](https://github.com/shawn-hurley/semver-analyzer) and fix guidance consumed by [fix-engine-cli](https://github.com/shawn-hurley/fix-engine)

The goal is to answer: what does a real migration need that our tooling doesn't cover yet?

## Key Findings

### 88 distinct change types observed

| Category | Count |
|----------|-------|
| Component renames | 8 |
| Import path changes | 3 |
| Prop renames | 10 |
| Prop removals | 6 |
| Prop value changes | 7 |
| Structure changes | 5 |
| Interface/type renames | 5 |
| Token renames (JS) | 16 |
| CSS class prefix renames | 24+ component families |
| CSS utility class renames | 6 |
| CSS global token renames | 12 |
| CSS component variable renames | 15+ |
| Behavioral/markup changes | 9 |
| Package upgrades | 7 |

### Benchmark coverage

| Status | Count | % |
|--------|-------|---|
| Covered by benchmark | 38 | 43% |
| Partially covered | 12 | 14% |
| **Not covered (gaps)** | **38** | **43%** |

### Biggest gaps (by frequency in the PR)

1. **CSS class prefix rename** (pf-v5→pf-v6) — 200+ occurrences, 60+ files. Every PF app hits this. Not in benchmark.
2. **ToolbarGroup variant renames** (`button-group`→`action-group`, `icon-button-group`→`action-group-plain`) — 21 instances. Not in benchmark.
3. **Charts import path** (`@patternfly/react-charts` → `@patternfly/react-charts/victory`) — 4 files. Not in benchmark.
4. **Alignment value renames** (`alignRight`→`alignEnd`) — affects Toolbar and Pagination. Not in benchmark.
5. **global_palette_* token removal** — 8 tokens renamed or removed with no direct equivalent. Not in benchmark.
6. **Global CSS token restructuring** — non-trivial name mappings (e.g., `--pf-v5-global--danger-color--100` → `--pf-t--global--color--status--danger--default`). Not in benchmark.
7. **Behavioral changes** — Switch state detection, Button disabled attribute, OUIA prefix, DOM structure changes. 11 patterns not in benchmark.

## Results Files

| File | Description |
|------|-------------|
| [tackle2-ui-migration-analysis.md](tackle2-ui-migration-analysis.md) | Full narrative analysis — every change cataloged with benchmark mapping, gap analysis, and recommendations |
| [tackle2-ui-changes.json](tackle2-ui-changes.json) | Machine-readable catalog of all 88 changes with benchmark coverage status |
| [semver-rules-coverage-prompt.md](semver-rules-coverage-prompt.md) | Reusable prompt for cross-referencing these changes against semver rules (designed to re-run with updated rules) |
| [pr-3246.diff](pr-3246.diff) | Raw PR diff (14k lines) |

## Next Steps

### 1. Run the semver rules coverage analysis

The [semver-rules-coverage-prompt.md](semver-rules-coverage-prompt.md) is ready to execute against our current rules:

```
RULES_DIR=results/2026-05-05-semver-goose-050526-1644/semver
```

This will produce a detailed report mapping each of the 88 changes to specific ruleIDs and fix-strategy entries, identifying which rules are correct, which have wrong guidance, and which are missing entirely.

### 2. Expand the benchmark

Add test cases for the highest-impact gaps identified:
- ToolbarGroup variant value renames
- Charts import path change
- Alignment value renames
- Card isFlat removal
- MenuToggle splitButtonOptions structural change
- PageToggleButton isHamburgerButton

### 3. Improve semver rules

Use the coverage report to prioritize:
- Adding missing fix-strategies.json entries
- Correcting wrong guidance
- Evaluating whether new strategy types are needed

## Related

- [patternfly6-migration-bench](../../README.md) — the benchmark suite
- [breaking-changes.json](../../breaking-changes.json) — the 85 benchmark test cases
- [Semver rules](../2026-05-05-semver-goose-050526-1644/semver/) — current rule set under evaluation
- [pf-codemods baseline](../2026-05-04-pf-codemods-baseline/) — what the official PF migration tool achieves
