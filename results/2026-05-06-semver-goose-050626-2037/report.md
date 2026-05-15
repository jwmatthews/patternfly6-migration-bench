# Migration Evaluation Report

**Tool branch:** `origin/semver/goose/050626-2037` (May 6 run)
**Baseline:** `pf-codemods-baseline`
**Evaluation date:** 2026-05-15
**Evaluator:** Claude (expanded 14-step evaluate-migration skill)

---

## Summary

| Metric | Count | % of 85 |
|--------|-------|---------|
| Fully correct (score 3) | 49 | 57.6% |
| Partially correct (score 1-2) | 19 | 22.4% |
| Wrong (score 0) | 17 | 20.0% |

| vs pf-codemods | Count |
|----------------|-------|
| Better | 20 |
| Equal | 23 |
| Worse | 27 |
| N/A (codemods can't fix) | 15 |

| Codemods-fixable coverage | |
|---------------------------|---|
| Total fixable by codemods | 66 |
| Tool also fixes correctly | 35 (53.0%) |

---

## Trend Comparison

| Metric | May 4 | May 5 | May 6 (this) | Trend |
|--------|-------|-------|--------------|-------|
| Correct (3) | 54 | 51 | 49 | declining |
| Partial (1-2) | 22 | 24 | 19 | declining |
| Wrong (0) | 9 | 10 | 17 | worsening |
| Better than codemods | 15 | 11 | 20 | improving |
| Equal to codemods | 33 | 32 | 23 | declining |
| Worse than codemods | 18 | 23 | 27 | worsening |

**Note:** This evaluation used an expanded 14-step skill with stricter scoring criteria than prior runs. Score differences may reflect methodology changes, not tool regression. Direct comparison should account for evaluator consistency.

---

## Where Tool Beats pf-codemods (20 cases)

These are the tool's unique value — cases where it produces better output than pf-codemods:

| ID | Component | Score | Notes |
|----|-----------|-------|-------|
| TC009 | Card raised props | 3 | Migrated to new clickable card pattern with CardHeader selectableActions |
| TC015 | Content header rename | 3 | Renamed ContentHeader to PageHeader with import update |
| TC026 | EmptyState exports | 3 | Migrated to headerText/icon props instead of sub-components |
| TC027 | EmptyState header | 3 | Consolidated EmptyStateHeader/EmptyStateIcon into EmptyState props |
| TC031 | HelperTextItem hasIcon | 3 | Removed hasIcon and isDynamic props |
| TC033 | InvalidObject props | 3 | Renamed invalidObjectTitleText→titleText, invalidObjectBodyText→bodyText |
| TC034 | JumpLinksItem href | 3 | Added required href prop (codemods baseline uses @ts-expect-error) |
| TC042 | Masthead brand/logo | 3 | Renamed MastheadBrand→MastheadLogo, wrapped in new MastheadBrand |
| TC043 | Masthead bgcolor | 3 | Removed backgroundColor prop |
| TC047 | Missing page | 3 | Renamed InvalidObject→MissingPage |
| TC048 | Modal deprecated | 3 | Migrated to modern ModalHeader/ModalBody/ModalFooter API |
| TC049 | Modal next | 3 | Updated imports from /next to main package |
| TC054 | NotAuthorized props | 3 | Renamed description→bodyText, title→titleText |
| TC064 | PageNavigation removed | 3 | Replaced PageNavigation with Nav placement |
| TC072 | Slider CSS variable | 3 | Replaced PF5 CSS var with PF6 InsetInlineStart |
| TC078 | Th CSS variables | 3 | Updated CSS variable names to RTL-compatible |
| TC036 | KebabToggle | 2 | Replaced with MenuToggle (better than codemods stub) |
| TC050 | MultiContentCard props | 2 | Partial prop removal (still better than codemods) |
| TC070 | Popper appendTo | 2 | Addressed appendTo change (better than codemods stub) |
| TC080 | Tokens prefix | 2 | Partial t_ prefix update (better than codemods) |

**Key strength:** The tool excels at component replacements (EmptyState, Masthead, Modal, ContentHeader→PageHeader) and CSS variable updates — areas where pf-codemods has no coverage.

---

## Where Tool Matches pf-codemods (23 cases)

| ID | Component | Notes |
|----|-----------|-------|
| TC003 | Accordion toggle | isExpanded moved correctly |
| TC014 | Color props | cyan→teal, gold→yellow |
| TC018 | DragDrop deprecated | Moved to deprecated package |
| TC020 | Drawer colorVariant | light-200→secondary |
| TC023 | DualListSelector deprecated | Moved to deprecated package |
| TC024 | DualListSelector next | /next→main import |
| TC028 | ErrorState props | errorTitle→titleText, errorDescription→bodyText |
| TC030 | FormGroup labelIcon | labelIcon→labelHelp |
| TC038 | LogSnippet variant | Partial rename (scored 2) |
| TC051 | Nav tertiary | tertiary→horizontal-subnav |
| TC052 | Nav theme | Removed theme prop |
| TC057 | Page header | header→masthead |
| TC058 | Page tertiaryNavGrouped | Renamed correctly |
| TC059 | Page tertiaryNavWidth | Renamed correctly |
| TC060 | Page tertiaryNav | Renamed correctly |
| TC065 | PageSection nav type | Removed type='nav' |
| TC068 | PageSidebar theme | Removed theme prop |
| TC073 | Switch labelOff | Removed labelOff |
| TC074 | Tabs isSecondary | isSecondary→isSubtab |
| TC075 | Tabs light300 | light300→secondary |
| TC077 | Text to Content | Replaced Text components with Content |
| TC083 | Toolbar chip→label | Renamed chip-based props to label-based |
| TC085 | Toolbar spacer | Removed spacer prop |

---

## Where Tool Falls Short (27 cases)

Priority improvements — cases where pf-codemods does better:

### Score 0 — Wrong/No Fix (14 of these are worse than codemods)

| ID | Component | Issue |
|----|-----------|-------|
| TC004 | data-codemods cleanup | Meta-test: did not clean up data-codemods attributes |
| TC006 | Banner variant | Did not replace variant with color/status |
| TC007 | Button icon to prop | Did not move icons from children to icon prop |
| TC008 | Button isActive | Did not rename isActive to isClicked |
| TC010 | Card selectable actions | Did not handle selectableActions removal |
| TC011 | Checkbox label position | Did not replace isLabelBeforeButton with labelPosition |
| TC025 | Duplicate imports | Design limitation — TC cannot be properly tested |
| TC029 | FormField typo | Did not fix FormFiled→FormField typo |
| TC037 | Label overflow | Did not replace isOverflowLabel with variant='overflow' |
| TC046 | MenuToggle icon | Did not move icon from children to icon prop |
| TC062 | Page section bodyWrapper | Did not add hasBodyWrapper={false} |
| TC063 | PageHeaderToolsItem | Design limitation — uses placeholder div |
| TC082 | Toolbar props removed | Did not remove usePageInsets, alignSelf, widths, alignment |
| TC084 | Toolbar interface rename | Did not rename ToolbarChipGroup→ToolbarLabelGroup |

### Score 1 — Partial Fix

| ID | Component | Issue |
|----|-----------|-------|
| TC001 | Accordion content | Incomplete isHidden prop handling |
| TC005 | Avatar border | Incomplete border→isBordered conversion |
| TC013 | Chip to Label | Missed some Chip→Label replacements |
| TC016 | DataListAction | Incomplete isPlainButtonAction removal |
| TC019 | Drawer hasNoPadding | Incomplete hasNoPadding removal |
| TC021 | Drawer content color | Did not replace no-background colorVariant |
| TC040 | Login footer links | Incomplete restructuring to Button children pattern |
| TC044 | Masthead structure | Incomplete MastheadMain wrapping |
| TC053 | NavItem wrapper | Removed hasNavLinkWrapper but didn't move icon to icon prop |
| TC066 | PageSection variant | Partial light/dark→default/secondary conversion |
| TC079 | Tile deprecated | Incomplete deprecated migration |
| TC081 | Tokens CSS | Partial pf-v5→pf-v6 CSS token update |

### Score 2 — Correct but Non-idiomatic

| ID | Component | Issue |
|----|-----------|-------|
| TC012 | Chip deprecated | Used deprecated import instead of Label replacement |

---

## N/A Cases (15 — codemods doesn't fix these)

| ID | Component | Score | Notes |
|----|-----------|-------|-------|
| TC002 | Accordion item markup | 1 | Unnecessary modifications |
| TC017 | Deprecated components | 3 | Tool correctly handled where codemods can't |
| TC022 | Drawer head panelbody | 0 | Incorrect changes to markup-only change |
| TC032 | HelperTextItem screenreader | 3 | Correctly left unchanged |
| TC035 | JumpLinksItem markup | 3 | Correctly left unchanged |
| TC039 | LogViewer stylesheet | 0 | Did not update CSS import path |
| TC041 | Login main header | 3 | Correctly left unchanged |
| TC045 | MenuItemAction markup | 3 | Correctly left unchanged |
| TC055 | NotificationBadge markup | 3 | Correctly left unchanged |
| TC056 | NotificationDrawer header | 3 | Correctly left unchanged |
| TC061 | Page body wrapper | 3 | Correctly left unchanged |
| TC067 | PageSection variant type | 0 | Incorrect changes to behavioral change |
| TC069 | Pagination markup | 3 | Correctly left unchanged |
| TC071 | SimpleFileUpload aria | 3 | Correctly handled |
| TC076 | Tabs scroll markup | 3 | Correctly left unchanged |

---

## Semver Detection Analysis (Step 9)

Semver-analyzer detected **80/85** breaking changes from the test catalog in its report (12,819 total breaking API/behavioral changes found between PF5.3.3 and PF6.4.1).

| Metric | Count |
|--------|-------|
| Detected by semver-analyzer | 80 |
| Undetected | 5 |
| With migration_target | 59 |

### Undetected Breaking Changes

| ID | Component | Why Undetected |
|----|-----------|----------------|
| TC004 | data-codemods cleanup | Meta-test — not a real API change |
| TC025 | Duplicate imports | Meta-test — not a real API change |
| TC051 | Nav tertiary variant | Variant value change not captured as API break |
| TC054 | NotAuthorized props | react-component-groups prop rename not in semver scope |
| TC078 | Th CSS variables | CSS variable rename not captured by semver analysis |

### Detection-to-Correctness Correlation

| Detected? | Correct (3) | Partial (1-2) | Wrong (0) |
|-----------|-------------|---------------|-----------|
| Yes (80) | 47 | 19 | 14 |
| No (5) | 2 | 0 | 3 |

Detection alone does not guarantee a correct fix — 14 detected cases still scored 0. The pipeline gap is between detection and rule/fix-guidance quality.

---

## Kantra Analysis (Step 10)

**No kantra output found** in `results/2026-05-06-semver-goose-050626-2037/semver/kantra/`. Kantra analysis was not persisted from the container run.

---

## Pipeline Correlation (Step 11)

Partial pipeline data available (no kantra output):

| Stage | Count | % of 85 |
|-------|-------|---------|
| Breaking changes in catalog | 85 | 100% |
| Detected by semver-analyzer | 80 | 94.1% |
| Flagged by kantra | N/A | N/A |
| Fix attempted | 68 | 80.0% |
| Fix correct (score 3) | 49 | 57.6% |

**Primary bottleneck:** Detection-to-correct-fix conversion. 80 detected → only 49 correct (61.3% conversion rate). 31 detected changes either got partial or wrong fixes.

---

## UXD Quality Criteria (Step 12)

Based on the criteria UXD used in the March 2026 quipucords-ui review:

### Deprecated Usage

**3 files** import from `@patternfly/react-core/deprecated`:
- TC018 (DragDrop) — intentionally moved to deprecated as valid migration
- TC023 (DualListSelector) — intentionally moved to deprecated as valid migration
- TC024 (DualListSelector next) — import updated but references deprecated path

**Assessment:** TC018 and TC023 are *acceptable* deprecated usage — moving to the deprecated package is a valid intermediate migration step.

### Modern Modal API

- **2/2 Modal usages use modern composable API** (TC048, TC049)
- Both use ModalHeader/ModalBody/ModalFooter children pattern (PF6)
- Zero props-based PF5 Modal patterns found

**Assessment:** Full compliance with modern Modal API requirement.

### Vendored Code

- **N/A** — bench repo contains only test cases, no vendored PF component code

### UXD Readiness Summary

| Criteria | Status |
|----------|--------|
| Zero deprecated usage | 3 files use deprecated package (2 intentional, 1 import artifact) |
| Modern Modal API | 2/2 compliant |
| Vendored code updated | N/A |
| **Overall** | **Would likely pass UXD review with minor notes on deprecated imports** |

---

## Priority Improvements

Based on the evaluation, the top areas for improvement:

1. **Prop rename/removal coverage** — 12 test cases scored 0-1 on simple prop renames or removals (Banner variant, Button isActive/icon, Checkbox labelPosition, etc.). These should be low-hanging fruit for rule improvement.

2. **Icon-to-prop migration pattern** — TC007 (Button) and TC046 (MenuToggle) both need icons moved from children to icon prop. Neither was handled. This is a common PF6 pattern that needs a dedicated rule.

3. **hasBodyWrapper pattern** — TC062 needs hasBodyWrapper={false} on PageSection. This is a PF6-specific pattern that codemods handles.

4. **Type/interface renames** — TC029 (FormField typo), TC084 (ToolbarChipGroup→ToolbarLabelGroup) were missed. These are straightforward string replacements.

5. **CSS token updates** — TC081 shows partial pf-v5→pf-v6 token migration. More comprehensive CSS token mapping needed.

---

## Raw Data

Full scorecard with per-test-case details: `scorecard.json`
Semver report: `semver/semver_report.json`
Semver rules: `semver/semver_rules/`
Fix guidance: `semver/fix-guidance/`
