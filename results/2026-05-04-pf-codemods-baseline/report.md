# pf-codemods Baseline Evaluation Report

**Date:** 2026-05-04
**Tool Branch:** `pf-codemods-baseline`
**Baseline Branch:** `pf-codemods-baseline` (self-evaluation)

## Summary

This is the **baseline self-evaluation** of pf-codemods. It establishes the reference scores that other migration tools will be compared against.

| Metric | Value |
|--------|-------|
| **Total test cases** | 85 |
| **Fully correct (3)** | 60 (70.6%) |
| **Partially correct (1-2)** | 17 (20.0%) |
| **Wrong/missing (0)** | 8 (9.4%) |
| **Files unchanged** | 18 |
| **Codemods-fixable total** | 66 |
| **Codemods-fixable matched (score 3)** | 46 (69.7%) |

### vs pf-codemods Comparison

Since this IS the pf-codemods baseline, all fixedWithCodemods=true cases are "equal" and all fixedWithCodemods=false cases are "n/a."

| vs-codemods | Count |
|-------------|-------|
| better | 0 |
| equal | 66 |
| worse | 0 |
| n/a | 19 |

## Score Distribution

### Fully Correct (score 3) — 60 test cases

These represent the gold standard for what pf-codemods handles well:

| ID | Component | Notes |
|----|-----------|-------|
| TC001 | Accordion content | isHidden prop removed |
| TC002 | Accordion item | isExpanded moved correctly (cross-fix from TC003) |
| TC003 | Accordion toggle | isExpanded moved to AccordionItem |
| TC005 | Avatar | border replaced with isBordered |
| TC006 | Banner | variant replaced with color |
| TC007 | Button | Icon moved to icon prop |
| TC008 | Button | isActive renamed to isClicked |
| TC011 | Checkbox | isLabelBeforeButton → labelPosition='start' |
| TC012 | Chip | Chip/ChipGroup → Label/LabelGroup |
| TC013 | Chip | Chip → Label with correct props |
| TC014 | Color props | cyan→teal, gold→yellow |
| TC016 | Data list action | isPlainButtonAction removed |
| TC018 | Drag drop | Imports moved to /deprecated |
| TC019 | Drawer | hasNoPadding removed |
| TC020 | Drawer | colorVariant light-200 → secondary |
| TC021 | Drawer content | colorVariant no-background removed |
| TC022 | Drawer head | No changes needed (correct) |
| TC023 | Dual list selector | Import moved to /deprecated |
| TC026 | Empty state | EmptyStateHeader/Icon removed, props on EmptyState |
| TC028 | Error state | Props renamed correctly |
| TC030 | Form group | labelIcon → labelHelp |
| TC031 | Helper text item | hasIcon and isDynamic removed |
| TC032 | Helper text item | No changes needed (correct) |
| TC033 | Invalid object | Props renamed correctly |
| TC035 | Jump links item | No changes needed (correct) |
| TC037 | Label | isOverflowLabel → variant='overflow' |
| TC039 | Log viewer | No changes needed (correct) |
| TC040 | Login footer links | Restructured with Button child |
| TC041 | Login main header | No changes needed (correct) |
| TC042 | Masthead | MastheadBrand → MastheadLogo |
| TC043 | Masthead | backgroundColor removed |
| TC044 | Masthead | Structure correctly reorganized |
| TC045 | Menu item action | No changes needed (correct) |
| TC047 | Missing page | InvalidObject → MissingPage |
| TC050 | Multi content card | Props removed correctly |
| TC051 | Nav | tertiary → horizontal-subnav |
| TC052 | Nav | theme removed |
| TC055 | Notification badge | No changes needed (correct) |
| TC056 | Notification drawer | No changes needed (correct) |
| TC057 | Page | header → masthead |
| TC058 | Page | isTertiaryNavGrouped renamed |
| TC059 | Page | isTertiaryNavWidthLimited renamed |
| TC060 | Page | tertiaryNav → horizontalSubnav |
| TC061 | Page | hasBodyWrapper={false} added (valid pattern) |
| TC064 | Page navigation | PageNavigation removed, Nav direct child |
| TC065 | Page section | type='nav' removed |
| TC068 | Page sidebar | theme removed |
| TC069 | Pagination | No changes needed (correct) |
| TC070 | Popper | No changes needed (correct) |
| TC071 | Simple file upload | No changes needed (correct) |
| TC073 | Switch | labelOff removed |
| TC074 | Tabs | isSecondary → isSubtab |
| TC075 | Tabs | light300 → secondary |
| TC076 | Tabs | No changes needed (correct) |
| TC077 | Text | Text/TextContent → Content |
| TC079 | Tile | Import moved to /deprecated |
| TC082 | Toolbar | usePageInsets removed |
| TC083 | Toolbar | chip-based props → label-based |
| TC084 | Toolbar | Interface imports cleaned up |
| TC085 | Toolbar | spacer → gap |

### Partially Correct (score 1-2) — 17 test cases

#### Score 2 — Correct but non-idiomatic (11 cases)

| ID | Component | Issue |
|----|-----------|-------|
| TC004 | All (data-codemods) | Pre-placed data-codemods attributes not removed (expected for meta-test) |
| TC010 | Card | selectableActions simplified but not fully removed |
| TC015 | Content header | data-codemods marker attribute left on PageHeader |
| TC027 | Empty state header | Title JSX wrapped in titleText instead of plain string |
| TC029 | Form field typo | Test doesn't exercise actual interface rename |
| TC038 | Log snippet | Uses 'as any' type cast on variant value |
| TC048 | Modal | Moved to /deprecated shim instead of new Modal API |
| TC054 | Not authorized | data-codemods marker left on renamed component |
| TC062 | Page section | Inconsistent hasBodyWrapper values; variant removed not mapped |
| TC067 | Page section | variant removed instead of mapped (acceptable per expectedOutcome) |
| TC080 | Tokens | Color token mapped to t_temp_dev_tbd placeholder |

#### Score 1 — Partially correct (6 cases)

| ID | Component | Issue |
|----|-----------|-------|
| TC009 | Card | Deprecated props removed but no replacement selectableActions pattern |
| TC017 | Deprecated components | Components stubbed, not properly migrated (manual workaround) |
| TC034 | Jump links item | @ts-expect-error instead of adding required href (manual workaround) |
| TC053 | Nav item | hasNavLinkWrapper removed but icon not moved to icon prop |
| TC063 | Page header tools | Uses placeholder div — test case design limitation |
| TC066 | Page section | variant values removed instead of mapped to PF6 equivalents |

### Wrong/Missing (score 0) — 8 test cases

| ID | Component | Issue | Root Cause |
|----|-----------|-------|------------|
| TC024 | Dual list selector next | Moved to /deprecated instead of keeping in core | Test case design: imports from core, not /next |
| TC025 | Duplicate imports | No changes made | Test case design: duplicate pre-removed for compilation |
| TC036 | Kebab toggle | Stubbed with non-functional placeholders | Manual workaround; pf-codemods can't handle KebabToggle removal |
| TC046 | Menu toggle | Icon not moved to icon prop | pf-codemods missed this transformation |
| TC049 | Modal next | Moved to /deprecated instead of keeping in core | Test case design: imports from core, not /next |
| TC072 | Slider step | CSS variable not updated (v5→v6) | pf-codemods doesn't handle CSS variable renames |
| TC078 | Th | CSS variables not updated (v5→v6) | pf-codemods doesn't handle CSS variable renames |
| TC081 | Tokens | CSS token variables not updated | pf-codemods doesn't handle CSS token updates |

## Analysis

### Root Causes for Non-Perfect Scores

**Test case design limitations (3 cases: TC024, TC025, TC049):**
These test cases cannot properly exercise the breaking change because TypeScript compilation constraints prevent the source from using the actual PF5 import path (e.g., `/next`). These should be redesigned.

**CSS variable/token handling (3 cases: TC072, TC078, TC081):**
pf-codemods does not handle CSS variable renames (`--pf-v5-*` → `--pf-v6-*`). This is a known gap — CSS migrations require separate tooling.

**Manual workarounds in baseline (3 cases: TC017, TC034, TC036):**
These were manually fixed to make the pf-codemods-baseline branch build. The stubs/workarounds are not pf-codemods output and score low. Any tool that properly migrates these would score "better."

**data-codemods artifacts (3 cases: TC004, TC015, TC054):**
pf-codemods leaves `data-codemods` marker attributes that ideally should be cleaned up. Minor issue.

**Incomplete transformations (3 cases: TC009, TC053, TC066):**
pf-codemods removes deprecated props but doesn't always add the full replacement pattern (e.g., Card selectableActions, NavItem icon prop, PageSection variant mapping).

### Opportunities for Other Tools to Beat pf-codemods

A migration tool can score "better" than pf-codemods in these areas:

1. **CSS variable/token migration** (TC072, TC078, TC081) — pf-codemods has zero coverage here
2. **Deprecated component replacement** (TC017, TC036) — replacing old Dropdown/KebabToggle with modern equivalents
3. **Required prop additions** (TC034) — adding required `href` to JumpLinksItem
4. **Complete prop replacements** (TC009, TC066) — adding replacement patterns after removing deprecated props
5. **Icon prop migration** (TC046, TC053) — moving icons from children to icon prop consistently
6. **Clean output** — avoiding data-codemods artifacts and 'as any' casts

## Trend Comparison

No previous scorecards found. This is the first evaluation run.
