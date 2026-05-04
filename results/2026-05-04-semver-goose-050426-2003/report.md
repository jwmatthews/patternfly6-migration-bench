# Migration Evaluation Report: semver/goose/050426-2003

**Date:** 2026-05-04
**Tool Branch:** `semver/goose/050426-2003`
**Baseline Branch:** `pf-codemods-baseline`

## Summary

| Metric | Value |
|--------|-------|
| Total test cases | 85 |
| Fully correct (score 3) | 54 (63.5%) |
| Partially correct (score 1-2) | 22 (25.9%) |
| Wrong/harmful (score 0) | 9 (10.6%) |
| Files unchanged by tool | 17 |
| Better than pf-codemods | 15 |
| Equal to pf-codemods | 33 |
| Worse than pf-codemods | 18 |
| N/A (codemods doesn't fix) | 19 |
| Codemods-fixable total | 66 |
| Codemods-fixable matched (score 3) | 40/66 (60.6%) |

## Where Tool Beats pf-codemods (15 cases)

These are the tool's unique strengths — areas where it produces better output than the official codemod:

| ID | Component | Score | Notes |
|----|-----------|-------|-------|
| TC004 | data-codemods cleanup | 2 | Partially removed pre-placed data-codemods attributes (codemods left all) |
| TC009 | Card raised props | 3 | Added proper selectableActions pattern instead of just stripping old props |
| TC015 | ContentHeader rename | 3 | Clean rename without data-codemods marker |
| TC018 | DragDrop deprecated | 2 | Replaced with modern DragDropSort API (codemods just moves to /deprecated) |
| TC024 | DualListSelector next | 1 | Correct import path for /next promotion (codemods incorrectly moves to /deprecated) |
| TC033 | InvalidObject props | 3 | Full migration with component rename and clean output |
| TC036 | KebabToggle removed | 3 | Full MenuToggle+EllipsisVIcon replacement (codemods only had manual stubs) |
| TC038 | LogSnippet variant | 3 | Type-safe AlertVariant import instead of 'as any' cast |
| TC047 | MissingPage rename | 3 | Clean InvalidObject->MissingPage rename without markers |
| TC048 | Modal deprecated | 3 | Full new Modal API migration (codemods just moves to /deprecated) |
| TC049 | Modal next | 2 | Correct import path + API restructure (codemods incorrectly moves to /deprecated) |
| TC054 | NotAuthorized props | 3 | Clean rename with component name update |
| TC064 | PageNavigation removed | 3 | Clean removal with proper Nav placement |
| TC080 | Tokens prefix | 2 | Concrete color token mapping (codemods uses placeholder) |
| TC081 | CSS Tokens | 3 | Full CSS token mapping to PF6 design tokens (codemods leaves CSS unchanged) |

**Key strengths:**
- Full component migrations where codemods only moves to /deprecated (KebabToggle, Modal, Deprecated Dropdown)
- CSS token mapping that codemods doesn't attempt
- Cleaner output without data-codemods marker attributes
- Correct handling of /next import promotion where codemods gets it wrong

## Where Tool Matches pf-codemods (33 cases)

The tool achieves parity on these test cases:

TC001, TC003, TC006, TC014, TC016, TC019, TC020, TC021, TC025, TC026, TC028, TC030, TC031, TC042, TC043, TC046, TC050, TC051, TC052, TC053, TC057, TC058, TC059, TC060, TC063, TC065, TC068, TC073, TC074, TC075, TC083, TC084, TC085

These cover prop removals, prop renames, variant updates, and import path changes — the bread-and-butter of PF5->PF6 migration.

## Where Tool Falls Short (18 cases)

These are priority areas for improvement:

| ID | Component | Tool Score | Codemods Score | Issue |
|----|-----------|------------|----------------|-------|
| TC005 | Avatar border | 1 | 3 | Removed `border` without adding `isBordered` |
| TC007 | Button icon | 0 | 3 | Did not move icon children to `icon` prop |
| TC008 | Button isActive | 0 | 3 | Used className hack instead of `isClicked` rename |
| TC010 | Card selectable | 0 | 2 | Incorrectly removed `isClickable` |
| TC011 | Checkbox label | 1 | 3 | Removed prop without `labelPosition='start'` replacement |
| TC012 | Chip deprecated | 2 | 3 | Missing `variant='outline'` on Label |
| TC013 | Chip to Label | 1 | 3 | Missing `onClose` mapping and `variant='outline'` |
| TC023 | DualListSelector | 1 | 3 | Incomplete composable API rewrite |
| TC027 | EmptyState header | 1 | 2 | Title not moved to `titleText` prop |
| TC029 | FormField typo | 0 | 2 | File unchanged |
| TC037 | Label overflow | 0 | 3 | Used `isClickable` instead of `variant='overflow'` |
| TC040 | Login footer links | 1 | 3 | Renamed to non-existent component |
| TC044 | Masthead structure | 1 | 3 | MastheadToggle not moved inside MastheadMain |
| TC062 | PageSection bodywrapper | 1 | 2 | Missing `hasBodyWrapper={false}`, wrong variant mapping |
| TC066 | PageSection variant | 1 | 1 | `light` mapped to `secondary` instead of `default` |
| TC077 | Text to Content | 1 | 3 | Lost `ul`/`li` semantics for TextList/TextListItem |
| TC079 | Tile deprecated | 1 | 3 | Card replacement missing proper subcomponents |
| TC082 | Toolbar props | 0 | 3 | Replaced `usePageInsets` with non-existent `hasNoPadding` |

## Wrong Fixes (score 0) — 9 cases

| ID | Component | Issue |
|----|-----------|-------|
| TC007 | Button icon | File unchanged — icons not moved to `icon` prop |
| TC008 | Button isActive | Used `className='pf-m-active'` instead of `isClicked` |
| TC010 | Card selectable | Removed `isClickable` which is needed for clickable cards |
| TC029 | FormField typo | File unchanged |
| TC037 | Label overflow | Used `isClickable` instead of `variant='overflow'` |
| TC045 | MenuItemAction | Harmful: removed MenuContent wrapper unnecessarily |
| TC046 | MenuToggle icon | File unchanged — icon not moved to `icon` prop |
| TC063 | PageHeaderToolsItem | File unchanged (test case design limitation) |
| TC082 | Toolbar props | Replaced removed prop with non-existent `hasNoPadding` |

## Unchanged Files (17 files tool did not modify)

**Correctly unchanged (12):** TC022, TC025, TC032, TC035, TC039, TC041, TC055, TC056, TC061, TC069, TC071, TC076
These are test cases where no code changes were needed.

**Incorrectly unchanged (5):** TC007, TC029, TC046, TC063, TC084
TC084 is debatable — the interfaces aren't used in code so no change is arguably correct. TC063 has a design limitation.

## Trend Comparison vs. pf-codemods-baseline Self-Evaluation

Comparing against the previous scorecard (`2026-05-04-pf-codemods-baseline`):

### Improvements (14 test cases scored higher)

| ID | Component | Previous | Current | Delta |
|----|-----------|----------|---------|-------|
| TC009 | Card raised props | 1 | 3 | +2 |
| TC015 | ContentHeader rename | 2 | 3 | +1 |
| TC017 | Deprecated components | 1 | 3 | +2 |
| TC024 | DualListSelector next | 0 | 1 | +1 |
| TC025 | Duplicate imports | 0 | 3 | +3 |
| TC034 | JumpLinksItem href | 1 | 3 | +2 |
| TC036 | KebabToggle removed | 0 | 3 | +3 |
| TC038 | LogSnippet variant | 2 | 3 | +1 |
| TC048 | Modal deprecated | 2 | 3 | +1 |
| TC049 | Modal next | 0 | 2 | +2 |
| TC054 | NotAuthorized props | 2 | 3 | +1 |
| TC072 | Slider CSS variable | 0 | 1 | +1 |
| TC078 | Th CSS variables | 0 | 1 | +1 |
| TC081 | CSS Tokens | 0 | 3 | +3 |

### Regressions (21 test cases scored lower)

| ID | Component | Previous | Current | Delta |
|----|-----------|----------|---------|-------|
| TC005 | Avatar border | 3 | 1 | -2 |
| TC007 | Button icon | 3 | 0 | -3 |
| TC008 | Button isActive | 3 | 0 | -3 |
| TC010 | Card selectable | 2 | 0 | -2 |
| TC011 | Checkbox label | 3 | 1 | -2 |
| TC012 | Chip deprecated | 3 | 2 | -1 |
| TC013 | Chip to Label | 3 | 1 | -2 |
| TC018 | DragDrop deprecated | 3 | 2 | -1 |
| TC023 | DualListSelector | 3 | 1 | -2 |
| TC027 | EmptyState header | 2 | 1 | -1 |
| TC029 | FormField typo | 2 | 0 | -2 |
| TC037 | Label overflow | 3 | 0 | -3 |
| TC040 | Login footer links | 3 | 1 | -2 |
| TC044 | Masthead structure | 3 | 1 | -2 |
| TC045 | MenuItemAction | 3 | 0 | -3 |
| TC062 | PageSection bodywrapper | 2 | 1 | -1 |
| TC063 | PageHeaderToolsItem | 1 | 0 | -1 |
| TC070 | Popper appendTo | 3 | 2 | -1 |
| TC077 | Text to Content | 3 | 1 | -2 |
| TC079 | Tile deprecated | 3 | 1 | -2 |
| TC082 | Toolbar props | 3 | 0 | -3 |

## Top 3 Priority Fixes

1. **Prop rename pattern** — Several test cases (TC005, TC008, TC011, TC037) show the tool removing props without adding the correct PF6 replacement. The tool needs a mapping table for `border→isBordered`, `isActive→isClicked`, `isLabelBeforeButton→labelPosition='start'`, `isOverflowLabel→variant='overflow'`.

2. **Button/MenuToggle icon migration** — TC007 and TC046 are both unchanged. Moving icon children to the `icon` prop is a high-frequency pattern that needs dedicated handling.

3. **Component restructuring** — TC044 (Masthead), TC077 (Text→Content), TC079 (Tile→Card) show the tool struggling with structural changes that go beyond simple prop renames. These need component-level transformation rules.
