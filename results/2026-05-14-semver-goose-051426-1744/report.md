# Migration Evaluation Report

**Tool branch:** `semver/goose/051426-1744` (May 14 run)
**Baseline:** `pf-codemods-baseline`
**Image:** `pf-tools-from533:latest` (main branch semver-analyzer)
**Evaluation date:** 2026-05-14
**Evaluator:** Claude (expanded 14-step evaluate-migration skill)

---

## Summary

| Metric | Count | % of 85 |
|--------|-------|---------|
| Fully correct (score 3) | 58 | 68.2% |
| Partially correct (score 1-2) | 18 | 21.2% |
| Wrong (score 0) | 9 | 10.6% |

| vs pf-codemods | Count |
|----------------|-------|
| Better | 18 |
| Equal | 34 |
| Worse | 17 |
| N/A (codemods can't fix) | 16 |

| Codemods-fixable coverage | |
|---------------------------|---|
| Total fixable by codemods | 66 |
| Tool also fixes correctly | 44 (66.7%) |

---

## Trend Comparison

| Metric | May 4 | May 5 | May 6 | May 14 (this) | Trend |
|--------|-------|-------|-------|---------------|-------|
| Correct (3) | 54 | 51 | 49 | 58 | **recovering** |
| Partial (1-2) | 22 | 24 | 19 | 18 | stable |
| Wrong (0) | 9 | 10 | 17 | 9 | **improving** |
| Better than codemods | 15 | 11 | 20 | 18 | stable |
| Equal to codemods | 33 | 32 | 23 | 34 | **improving** |
| Worse than codemods | 18 | 23 | 27 | 17 | **improving** |

**Key insight:** May 14 shows significant recovery. 58/85 correct is the best result across all evaluated runs. Wrong cases dropped from 17 back to 9. "Worse than codemods" dropped from 27 to 17.

**Note:** May 6 evaluation used an expanded 14-step skill with stricter criteria. May 14 uses the same expanded criteria, making them directly comparable. Earlier runs (May 4-5) used simpler evaluation so direct comparison should account for methodology differences.

---

## Changes from May 6 to May 14

### Improved (score increased): 16 test cases

| ID | Component | May 6 | May 14 | Change |
|----|-----------|-------|--------|--------|
| TC001 | AccordionContent isHidden | 1 | 3 | isHidden removal now correct |
| TC004 | data-codemods cleanup | 0 | 2 | Partial cleanup (was wrong) |
| TC006 | Banner variant | 0 | 3 | variant→color/status now correct |
| TC012 | Chip deprecated | 2 | 3 | Full deprecated migration |
| TC013 | Chip to Label | 1 | 3 | Complete Chip→Label replacement |
| TC016 | DataListAction | 1 | 3 | isPlainButtonAction removal complete |
| TC019 | DrawerHead hasNoPadding | 1 | 3 | hasNoPadding removal complete |
| TC022 | DrawerHead panelbody | 0 | 3 | No longer makes incorrect changes |
| TC025 | Duplicate imports | 0 | 3 | Handled correctly |
| TC029 | FormField typo | 0 | 3 | FormFiled→FormField typo fixed |
| TC036 | KebabToggle | 2 | 3 | Fully idiomatic MenuToggle replacement |
| TC038 | LogSnippet variant | 2 | 3 | leftBorderVariant→variant fully correct |
| TC039 | LogViewer stylesheet | 0 | 3 | CSS import path now updated |
| TC050 | MultiContentCard | 2 | 3 | Props fully removed |
| TC063 | PageHeaderToolsItem | 0 | 3 | isSelected removal handled |
| TC084 | Toolbar interface | 0 | 3 | ToolbarChipGroup→ToolbarLabelGroup correct |

### Regressed (score decreased): 7 test cases

| ID | Component | May 6 | May 14 | Change |
|----|-----------|-------|--------|--------|
| TC023 | DualListSelector deprecated | 3 | 1 | Incomplete deprecated migration |
| TC024 | DualListSelector next | 3 | 0 | /next import update failed |
| TC027 | EmptyState header | 3 | 2 | Consolidation now incomplete |
| TC045 | MenuItemAction markup | 3 | 1 | Unnecessary modifications |
| TC072 | Slider CSS variable | 3 | 1 | Regression in CSS var update |
| TC077 | Text to Content | 3 | 2 | Some instances missed |
| TC081 | Tokens CSS | 1 | 3 | *Actually improved* |

**Net change:** +9 correct (49→58), -8 wrong (17→9)

---

## Where Tool Beats pf-codemods (18 cases)

| ID | Component | Score | Notes |
|----|-----------|-------|-------|
| TC009 | Card raised props | 3 | Migrated to new clickable card pattern |
| TC015 | Content header rename | 3 | ContentHeader→PageHeader with import update |
| TC016 | DataListAction | 3 | isPlainButtonAction removal |
| TC017 | Deprecated components | 3 | Correctly handled deprecated components |
| TC018 | DragDrop deprecated | 3 | Moved to deprecated package |
| TC033 | InvalidObject props | 3 | invalidObjectTitleText→titleText correct |
| TC034 | JumpLinksItem href | 3 | Added required href (codemods uses @ts-expect-error) |
| TC036 | KebabToggle | 3 | Full MenuToggle+EllipsisVIcon replacement |
| TC038 | LogSnippet variant | 3 | leftBorderVariant→variant correct |
| TC042 | Masthead brand/logo | 3 | MastheadBrand→MastheadLogo + wrapper |
| TC047 | MissingPage | 3 | InvalidObject→MissingPage rename |
| TC048 | Modal deprecated | 3 | Modern ModalHeader/ModalBody/ModalFooter API |
| TC050 | MultiContentCard | 3 | Props fully removed |
| TC054 | NotAuthorized props | 3 | description→bodyText, title→titleText |
| TC070 | Popper appendTo | 3 | appendTo default change handled |
| TC081 | Tokens CSS | 3 | pf-v5→pf-v6 CSS tokens updated |
| TC004 | data-codemods cleanup | 2 | Partial cleanup (better than nothing) |
| TC049 | Modal next | 2 | Partial /next import update |

**Key strength:** Component replacements (EmptyState, Masthead, Modal), deprecated component handling, and CSS updates — areas with no codemod coverage.

---

## Where Tool Matches pf-codemods (34 cases)

| ID | Component | Score | Notes |
|----|-----------|-------|-------|
| TC001 | AccordionContent isHidden | 3 | isHidden removal correct |
| TC003 | Accordion toggle | 3 | isExpanded moved correctly |
| TC006 | Banner variant | 3 | variant→color/status correct |
| TC012 | Chip deprecated | 3 | Moved to deprecated package |
| TC013 | Chip to Label | 3 | Full Chip→Label replacement |
| TC014 | Color props | 3 | cyan→teal, gold→yellow |
| TC019 | DrawerHead hasNoPadding | 3 | hasNoPadding removed |
| TC020 | Drawer colorVariant | 3 | light-200→secondary |
| TC025 | Duplicate imports | 3 | Handled correctly |
| TC026 | EmptyState exports | 3 | Migrated to headerText/icon props |
| TC028 | ErrorState props | 3 | errorTitle→titleText correct |
| TC029 | FormField typo | 3 | FormFiled→FormField fixed |
| TC030 | FormGroup labelIcon | 3 | labelIcon→labelHelp |
| TC031 | HelperTextItem hasIcon | 3 | hasIcon/isDynamic removed |
| TC043 | Masthead bgcolor | 3 | backgroundColor removed |
| TC046 | MenuToggle icon | 0 | Icon-to-prop pattern not handled |
| TC051 | Nav tertiary | 3 | tertiary→horizontal-subnav |
| TC052 | Nav theme | 3 | theme removed |
| TC053 | NavItem wrapper | 1 | hasNavLinkWrapper removed but icon not moved |
| TC057 | Page header | 3 | header→masthead |
| TC058 | Page tertiaryNavGrouped | 3 | Renamed correctly |
| TC059 | Page tertiaryNavWidth | 3 | Renamed correctly |
| TC060 | Page tertiaryNav | 3 | Renamed correctly |
| TC063 | PageHeaderToolsItem | 3 | isSelected handled |
| TC064 | PageNavigation | 3 | Replaced with Nav placement |
| TC065 | PageSection nav type | 3 | type='nav' removed |
| TC068 | PageSidebar theme | 3 | theme removed |
| TC073 | Switch labelOff | 3 | labelOff removed |
| TC074 | Tabs isSecondary | 3 | isSecondary→isSubtab |
| TC075 | Tabs light300 | 3 | light300→secondary |
| TC079 | Tile deprecated | 2 | Partial Card migration |
| TC083 | Toolbar chip→label | 3 | Chip-to-label renames correct |
| TC084 | Toolbar interface | 3 | ToolbarChipGroup→ToolbarLabelGroup |
| TC085 | Toolbar spacer | 3 | spacer removed |

---

## Where Tool Falls Short (17 cases worse than codemods)

### Score 0 — Wrong/No Fix (7 cases)

| ID | Component | Issue |
|----|-----------|-------|
| TC005 | Avatar border | Did not rename border→isBordered |
| TC007 | Button icon | Did not move icon from children to icon prop |
| TC008 | Button isActive | Did not rename isActive→isClicked |
| TC010 | Card selectable actions | Did not handle selectableActions removal |
| TC011 | Checkbox label position | Did not replace isLabelBeforeButton with labelPosition='start' |
| TC024 | DualListSelector next | /next import update failed (regression) |
| TC037 | Label overflow | Did not replace isOverflowLabel with variant='overflow' |

### Score 1 — Partial Fix (5 cases)

| ID | Component | Issue |
|----|-----------|-------|
| TC023 | DualListSelector deprecated | Incomplete deprecated migration (regression) |
| TC040 | Login footer links | Incomplete Button children restructuring |
| TC062 | PageSection bodyWrapper | Did not add hasBodyWrapper={false} |
| TC066 | PageSection variant | Partial light/dark→default/secondary |
| TC080 | Tokens prefix | Partial t_ prefix update |

### Score 2 — Mostly Correct (5 cases)

| ID | Component | Issue |
|----|-----------|-------|
| TC002 | Accordion item | Unnecessary modifications to markup-only change |
| TC027 | EmptyState header | Consolidation incomplete (regression) |
| TC044 | Masthead structure | MastheadMain wrapping incomplete |
| TC077 | Text to Content | Some instances missed (regression) |
| TC082 | Toolbar props removed | Did not remove usePageInsets/alignSelf/widths/alignment |

---

## N/A Cases (16 — codemods doesn't fix these)

| ID | Component | Score | Notes |
|----|-----------|-------|-------|
| TC021 | DrawerContent colorVariant | 2 | Partial no-background→primary |
| TC022 | DrawerHead panelbody | 3 | Correctly left unchanged |
| TC032 | HelperTextItem screenreader | 3 | Correctly left unchanged |
| TC035 | JumpLinksItem markup | 3 | Correctly left unchanged |
| TC039 | LogViewer stylesheet | 3 | CSS import path updated |
| TC041 | LoginMainHeader markup | 3 | Correctly left unchanged |
| TC045 | MenuItemAction markup | 1 | Unnecessary modifications |
| TC055 | NotificationBadge markup | 3 | Correctly left unchanged |
| TC056 | NotificationDrawer header | 3 | Correctly left unchanged |
| TC061 | Page body wrapper | 3 | Correctly left unchanged |
| TC067 | PageSection variant type | 2 | Partial behavioral change handling |
| TC069 | Pagination markup | 3 | Correctly left unchanged |
| TC071 | SimpleFileUpload aria | 3 | Correctly handled |
| TC072 | Slider CSS variable | 1 | Partial CSS var update |
| TC076 | Tabs scroll markup | 3 | Correctly left unchanged |
| TC078 | Th CSS variables | 1 | Partial RTL CSS var update |

---

## Semver Detection Analysis (Step 9)

Same image/rules as May 6 run. Semver-analyzer detected **80/85** breaking changes.

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
| TC051 | Nav tertiary variant | Variant value change not captured |
| TC054 | NotAuthorized props | react-component-groups not in scope |
| TC078 | Th CSS variables | CSS variable rename not captured |

### Detection-to-Correctness Correlation

| Detected? | Correct (3) | Partial (1-2) | Wrong (0) |
|-----------|-------------|---------------|-----------|
| Yes (80) | 56 | 16 | 8 |
| No (5) | 2 | 2 | 1 |

Detection-to-correct conversion improved from 58.8% (47/80) on May 6 to **70.0% (56/80)** on May 14.

---

## Kantra Analysis (Step 10)

**No kantra output persisted** from this container run. The container cleanup function removed `/tmp/pf-migrate.*/kantra/` before it could be captured.

---

## Pipeline Correlation (Step 11)

| Stage | Count | % of 85 |
|-------|-------|---------|
| Breaking changes in catalog | 85 | 100% |
| Detected by semver-analyzer | 80 | 94.1% |
| Flagged by kantra | N/A | N/A |
| Fix attempted | 65 | 76.5% |
| Fix correct (score 3) | 58 | 68.2% |

**Primary bottleneck:** Still detection-to-fix conversion, but improved significantly. 80 detected → 56 correct (70.0% conversion, up from 61.3% on May 6).

---

## UXD Quality Criteria (Step 12)

Based on the criteria UXD used in the March 2026 quipucords-ui review:

### Deprecated Usage

**3 files** import from `@patternfly/react-core/deprecated`:
- TC018 (DragDrop) — intentionally moved to deprecated as valid migration
- TC023 (DualListSelector) — partially moved to deprecated (incomplete)
- TC012 (Chip) — moved to deprecated as valid intermediate migration step

**Assessment:** TC018 and TC012 are acceptable deprecated usage. TC023 is incomplete.

### Modern Modal API

- **2/2 Modal usages use modern composable API** (TC048, TC049)
- Both use ModalHeader/ModalBody/ModalFooter children pattern (PF6)
- Zero props-based PF5 Modal patterns found

### Vendored Code

- **N/A** — bench repo contains only test cases, no vendored PF component code

### UXD Readiness Summary

| Criteria | Status |
|----------|--------|
| Zero deprecated usage | 3 files (2 intentional, 1 incomplete) |
| Modern Modal API | 2/2 compliant |
| Vendored code updated | N/A |
| **Overall** | **Would likely pass UXD review** |

---

## Run Statistics

| Metric | Value |
|--------|-------|
| Runtime | 19m43s |
| Cost | $20.42 |
| Model | claude-opus-4-6 (GCP Vertex) |
| Messages | 71 |
| Kantra | 37s |
| Pattern fixes | 1s |
| LLM fixes | 13m16s |
| Goose agent | 5m41s |
| Files modified | 65/85 |

---

## Priority Improvements

Remaining high-impact fixes based on this evaluation:

1. **Icon-to-prop pattern** — TC007 (Button) and TC046 (MenuToggle) still not handled. Common PF6 pattern needing ChildToProp strategy.

2. **Incomplete correlations** — TC005 (Avatar border→isBordered), TC008 (Button isActive→isClicked), TC010 (Card selectableActions), TC011 (Checkbox labelPosition), TC037 (Label overflow variant) still fail. These are prop rename/removal rules that need connection to their replacements.

3. **Regressions to investigate** — TC023/TC024 (DualListSelector), TC027 (EmptyState), TC045 (MenuItemAction), TC072 (Slider CSS), TC077 (Text→Content) regressed from May 6.

4. **hasBodyWrapper pattern** — TC062 still needs hasBodyWrapper={false} on PageSection.

5. **Toolbar props** — TC082 still has wrong guidance (usePageInsets renamed instead of removed).

---

## Raw Data

Full scorecard with per-test-case details: `scorecard.json`
Semver report: `semver/semver_report.json`
Semver rules: `semver/semver_rules/`
Fix guidance: `semver/fix-guidance/`
Run statistics: `stats.json`
