---
name: evaluate-migration
description: Evaluate a PF5-to-PF6 migration tool's output against pf-codemods baseline. Takes a tool branch name as argument. Produces JSON scorecard and markdown report.
---

# Evaluate Migration

You are evaluating a PatternFly 5-to-6 migration tool's output. You have two branches to compare against: the original PF5 code on `main` and the pf-codemods baseline on `pf-codemods-baseline`.

## Arguments

The user passes a branch name as the argument: `/evaluate-migration <tool-branch>`

An optional `--baseline <branch>` flag overrides the pf-codemods baseline branch (default: `pf-codemods-baseline`).

## Process

### Step 1: Read the test case catalog

Read `breaking-changes.json` from the repo root. This contains all 85 test cases with their expected outcomes.

### Step 2: Verify branches exist

```bash
git branch --list <tool-branch>
git branch --list pf-codemods-baseline
```

If either branch is missing, tell the user and stop.

### Step 3: Evaluate each test case

For each entry in `breaking-changes.json`:

1. Get the original PF5 code: `git show main:<testFile>`
2. Get the tool's output: `git show <tool-branch>:<testFile>`
3. Get the pf-codemods output: `git show pf-codemods-baseline:<testFile>`

If a file doesn't exist on a branch (the tool didn't modify it), that's data — it means the tool left it unchanged.

### Step 4: Score each test case

Use parallel subagents in batches of ~10 test cases for speed. For each test case, evaluate:

**Correctness (0-3):**
- **0** — Wrong/harmful: the change introduces bugs, removes functionality, or uses an incorrect PF6 API
- **1** — Partially correct: addresses part of the breaking change but misses key aspects
- **2** — Correct but non-idiomatic: works but uses a deprecated shim or non-recommended pattern
- **3** — Fully correct: matches or exceeds the expected PF6 migration

**If the file is unchanged on the tool branch:**
- If `fixedWithCodemods` is true: score 0 (tool missed something codemods catches)
- If `fixedWithCodemods` is false and expectedOutcome says "no code changes needed": score 3
- If `fixedWithCodemods` is false and code changes ARE needed: score 0

**vs-codemods comparison:**
- **worse** — pf-codemods output is better
- **equal** — both produce equivalent results
- **better** — tool output is better than pf-codemods
- **n/a** — pf-codemods doesn't fix this (`fixedWithCodemods: false`)

### Step 5: Aggregate results

Create the results directory: `mkdir -p results/$(date +%Y-%m-%d)-<tool-branch-slug>`

Write `results/<date>-<branch>/scorecard.json`:
```json
{
  "runDate": "<date>",
  "toolBranch": "<tool-branch>",
  "baselineBranch": "pf-codemods-baseline",
  "summary": {
    "total": 85,
    "correct": "<count of score 3>",
    "partial": "<count of score 1-2>",
    "wrong": "<count of score 0>",
    "unchanged": "<count where tool did not modify file>",
    "betterThanCodemods": "<count>",
    "equalToCodemods": "<count>",
    "worseThanCodemods": "<count>",
    "codemodsFixableTotal": "<count where fixedWithCodemods is true>",
    "codemodsFixableMatched": "<count where fixedWithCodemods is true AND score >= 3>"
  },
  "testCases": [
    {
      "id": "TC001",
      "component": "Accordion content",
      "fixedWithCodemods": true,
      "correctness": 3,
      "vsCodemods": "equal",
      "issues": [],
      "notes": "isHidden prop correctly removed"
    }
  ]
}
```

### Step 6: Generate markdown report

Write `results/<date>-<branch>/report.md` with:

1. **Summary table** — overall scores
2. **Where tool beats pf-codemods** — unique value (vsCodemods == "better")
3. **Where tool matches pf-codemods** — parity achieved
4. **Where tool falls short** — priority improvements (vsCodemods == "worse")
5. **Unchanged files** — test cases the tool didn't touch
6. **Wrong fixes** — test cases scored 0

### Step 7: Trend comparison

If previous scorecards exist in `results/`, compare against the most recent one:
- Improvements (score went up)
- Regressions (score went down)
- New test cases covered

### Step 8: Print summary

Print a concise summary to the conversation:
- Overall score: X/85 correct
- vs pf-codemods: X better, Y equal, Z worse
- Top 3 priority fixes
- Link to full report

### Step 9: Semver report analysis (if present)

Check if `results/<date>-<branch>/semver/semver_report.json` exists. If so, analyze the report alongside the scorecard:

1. **Load semver_report.json** — this contains all breaking changes detected by semver-analyzer between the two PatternFly versions. Key fields per change:
   - `symbol`, `qualified_name`, `kind` (constant, interface, type_alias, etc.)
   - `change` (renamed, removed, modified, added)
   - `before`/`after`, `description`
   - `migration_target` (if present): `replacement_symbol`, `replacement_package`, `matching_members`

2. **Cross-reference against breaking-changes.json** — for each test case:
   - Search semver_report.json for changes matching the component and prop
   - Record whether semver-analyzer **detected** the breaking change (`detected: true/false`)
   - If detected, note the `change` type and whether `migration_target` was populated

3. **Add detection metrics to scorecard.json** — extend each test case entry with:
   ```json
   {
     "semverDetected": true,
     "semverChangeType": "removed",
     "semverHasMigrationTarget": true
   }
   ```

4. **Add detection summary to scorecard.json**:
   ```json
   {
     "semverDetection": {
       "detected": "<count>",
       "undetected": "<count>",
       "withMigrationTarget": "<count>"
     }
   }
   ```

5. **Add detection section to report.md**:
   - Detection rate: X/85 breaking changes found by semver-analyzer
   - Undetected changes: list components/props that semver missed entirely
   - Detection-to-correctness correlation: how often detection led to a correct fix

### Step 10: Kantra output analysis (if present)

Check if `results/<date>-<branch>/semver/kantra/` exists with `output.yaml` or `output.json`. If so, analyze the kantra violations:

1. **Load kantra output** — this is the static analysis report from running the generated semver rules against the target app. Each violation has:
   - `ruleID`: which semver rule triggered
   - `description`/`message`: what was detected
   - `incidents`: array of file:line locations where the violation was found
   - `category`, `effort`, `labels`

2. **Cross-reference against test cases** — for each test case:
   - Search kantra output for violations in the test case's file path
   - Record which rules triggered and how many incidents were found
   - Note if no violations were found for a test case that needed fixing

3. **Add kantra metrics to scorecard.json** — extend each test case entry with:
   ```json
   {
     "kantraViolationsFound": 2,
     "kantraRuleIDs": ["semver-...-rule-id-1", "semver-...-rule-id-2"]
   }
   ```

4. **Add kantra summary to scorecard.json**:
   ```json
   {
     "kantraAnalysis": {
       "totalViolations": "<count>",
       "testCasesWithViolations": "<count>",
       "testCasesWithoutViolations": "<count>",
       "uniqueRulesTriggered": "<count>"
     }
   }
   ```

5. **Add kantra section to report.md**:
   - Violation coverage: X/85 test cases had at least one kantra violation
   - Missed test cases: list files where kantra found no violations but fixes were needed
   - Over-matching: cases where kantra violations didn't correspond to actual needed changes
   - Rule-to-outcome correlation: how often having the right kantra violation led to a correct fix

### Step 11: Pipeline correlation analysis

If both semver report AND kantra data are present, add a pipeline correlation section to report.md:

1. **Full pipeline funnel**:
   - Semver detected → Kantra flagged → Rule+guidance applied → Correct fix
   - Show where the pipeline leaks: detection failures, rule gaps, fix failures

2. **Drop-off table**:
   | Stage | Count | % of 85 |
   |-------|-------|---------|
   | Breaking changes in catalog | 85 | 100% |
   | Detected by semver-analyzer | X | Y% |
   | Flagged by kantra | X | Y% |
   | Fix attempted | X | Y% |
   | Fix correct (score 3) | X | Y% |

### Step 12: UXD quality criteria

Evaluate the tool's output against the criteria UXD stakeholders used when reviewing our quipucords-ui migration (from the March 2026 review). These are the bar UXD holds us to — not just "does the code work" but "is it production-quality modern PF6 code."

For each file on the tool branch, check:

1. **Zero deprecated usage** — No deprecated PF5 imports, no deprecated component APIs, no `@deprecated` props still in use. Scan for:
   - Imports from deprecated paths (e.g., `@patternfly/react-core/deprecated`)
   - Props marked as deprecated in PF6 (e.g., `isOpen` on components that moved to `isExpanded`)
   - Components that have PF6 equivalents but the code still uses PF5 shimmed versions

2. **Modern Modal API** — If the code uses Modal, verify it uses the PF6 Modal API (composable pattern with `ModalHeader`, `ModalBody`, `ModalFooter` children) rather than the PF5 Modal API (props-based: `title`, `actions`, `isOpen` on the Modal element itself)

3. **Vendored code fully updated** — If the project has vendored/copied PF component code (common in large apps), check that vendored files also got migrated, not just the app's own source files. Look for leftover `pf-v5-` CSS class prefixes, old variable references, or PF5 patterns in files outside the standard `src/` tree.

Add to scorecard.json per test case:
```json
{
  "uxdQuality": {
    "hasDeprecatedUsage": false,
    "usesModernModalAPI": true,
    "vendoredCodeUpdated": "n/a"
  }
}
```

Add UXD quality summary to scorecard.json:
```json
{
  "uxdQuality": {
    "deprecatedFree": "<count of files with zero deprecated usage>",
    "modernModalAPI": "<count using modern API> / <count using Modal>",
    "vendoredIssues": "<count of vendored files with leftover PF5 patterns>"
  }
}
```

Add UXD quality section to report.md:
- **Deprecated usage**: X files still reference deprecated APIs (list them)
- **Modal API**: X/Y Modal usages use modern composable pattern
- **Vendored code**: X files with leftover PF5 patterns
- **UXD readiness**: summary of whether output would pass UXD review based on March 2026 criteria

### Step 13: Rule analysis (if semver data present)

Check if `results/<date>-<branch>/semver/` exists with `semver_rules/` and `fix-guidance/` subdirectories. If so, automatically run `/analyze-rules results/<date>-<branch>` to produce a root cause analysis of the rules and fix-guidance.

### Step 14: Print summary

Update the summary from Step 8 with additional data points (if available):
- Semver detection: X/85 breaking changes detected
- Kantra coverage: X/85 test cases had violations flagged
- Pipeline funnel: detected → flagged → attempted → correct
- Top 3 pipeline bottlenecks (where the most test cases drop off)
- UXD readiness: deprecated usage count, Modal API compliance, vendored code status
