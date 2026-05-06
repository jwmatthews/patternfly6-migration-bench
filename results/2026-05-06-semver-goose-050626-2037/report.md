# Migration Evaluation Report

**Tool branch:** `semver/goose/050626-2037`
**Baseline branch:** `pf-codemods-baseline`
**Run date:** 2026-05-06
**Previous run:** `semver/goose/050526-1644` (2026-05-05)

## Summary

| Metric | Current | Previous | Delta |
|--------|---------|----------|-------|
| **Correct (3)** | 50/85 (59%) | 51/85 (60%) | -1 |
| **Partial (1-2)** | 26/85 (31%) | 24/85 (28%) | +2 |
| **Wrong (0)** | 9/85 (11%) | 10/85 (12%) | -1 |
| **Better than codemods** | 13 | 11 | +2 |
| **Equal to codemods** | 34 | 32 | +2 |
| **Worse than codemods** | 19 | 23 | -4 |
| **Codemods-fixable matched** | 37/66 (56%) | 38/66 (58%) | -1 |

**Overall assessment:** Roughly flat vs. previous run — 10 improvements and 11 regressions nearly cancel out (+1 net point). The tool gained ground on Accordion migrations and reduced "worse than codemods" count by 4, but introduced new regressions in several previously-working cases.

## Where Tool Beats pf-codemods (13 cases)

| TC | Component | Notes |
|----|-----------|-------|
| TC009 | Card raised props | Proper PF6 selectable card pattern with CardHeader selectableActions |
| TC015 | ContentHeader rename | Clean rename without data-codemods markers |
| TC027 | EmptyState header | Plain string titleText, cleaner than codemods' Title wrapper |
| TC033 | InvalidObject props | Rename to MissingPage + prop renames, no markers |
| TC036 | KebabToggle | Full new Dropdown API migration (codemods only stubs) |
| TC038 | LogSnippet variant | Used AlertVariant.danger enum (codemods used type cast) |
| TC042 | Masthead brand/logo | Full restructure with MastheadMain, MastheadLogo |
| TC047 | MissingPage rename | Clean rename without data-codemods markers |
| TC048 | Modal deprecated | Migrated to new Modal API (codemods only moved to /deprecated) |
| TC054 | NotAuthorized props | Renamed to UnauthorizedAccess with prop renames |
| TC060 | Page tertiaryNav | Renamed prop AND Nav variant in one pass |
| TC080 | Tokens prefix | Correct PF6 token names (codemods used placeholder) |
| TC081 | Tokens CSS | Updated CSS tokens (codemods left unchanged) |

**Unique strengths:**
- Full component API migrations (TC017, TC048, TC036) — the tool replaces deprecated APIs with modern PF6 equivalents, not just import-path shuffling
- Clean output without data-codemods marker attributes
- Token migrations (TC080, TC081) show improvement over codemods' placeholder approach

## Where Tool Matches pf-codemods (34 cases)

TC001, TC003, TC004, TC012, TC014, TC018, TC020, TC023, TC024, TC025, TC026, TC028, TC030, TC031, TC043, TC049, TC051, TC052, TC053, TC057, TC058, TC059, TC063, TC064, TC065, TC068, TC073, TC074, TC075, TC077, TC079, TC083, TC084, TC085

Strong parity on prop renames, import path changes, and simple prop removals.

## Where Tool Falls Short (19 cases)

| TC | Component | Issue | Severity |
|----|-----------|-------|----------|
| TC006 | Banner variant | Removed variant without adding color/status replacement | Wrong (0) |
| TC007 | Button icon | No changes — icon not moved to icon prop | Wrong (0) |
| TC010 | Card selectable | No changes — selectableActions not updated | Wrong (0) |
| TC022 | DrawerHead | Added unwanted DrawerActions/DrawerCloseButton | Wrong (0) |
| TC029 | FormField typo | No changes | Wrong (0) |
| TC037 | Label overflow | Used isClickable instead of variant='overflow' | Wrong (0) |
| TC046 | MenuToggle icon | No changes — icon not moved to icon prop | Wrong (0) |
| TC082 | Toolbar props | Replaced usePageInsets with non-existent hasNoPadding | Wrong (0) |
| TC005 | Avatar border | Removed border without adding isBordered | Partial (1) |
| TC008 | Button isActive | Removed isActive instead of renaming to isClicked | Partial (1) |
| TC011 | Checkbox label | Removed isLabelBeforeButton without labelPosition='start' | Partial (1) |
| TC013 | Chip to Label | onClick not mapped to onClose | Partial (2) |
| TC016 | DataList action | Removed DataListItemCells beyond scope | Partial (1) |
| TC019 | Drawer padding | Added unrequested DrawerActions/DrawerCloseButton | Partial (2) |
| TC021 | DrawerContent color | Used 'default' instead of 'primary' | Partial (1) |
| TC040 | Login footer | Used raw `<a>` instead of PF6 Button | Partial (1) |
| TC044 | Masthead structure | MastheadToggle not moved inside MastheadMain | Partial (1) |
| TC050 | MultiContentCard | Replaced withHeaderBorder with withDividers (not valid) | Partial (2) |
| TC062 | PageSection body | Applied wrong transformation (variant vs hasBodyWrapper) | Partial (1) |
| TC066 | PageSection variant | variant='light' mapped to 'secondary' not 'default' | Partial (1) |

**Pattern: "Remove without replace"** — The most common failure mode is removing a deprecated prop without adding its PF6 replacement (TC005, TC006, TC008, TC011, TC021). The tool recognizes props need to change but doesn't always know the correct replacement value.

**Pattern: "Icon-to-prop migration"** — The tool consistently misses the PF6 pattern of moving icons from children to the `icon` prop (TC007, TC046).

**Pattern: "Wrong replacement value"** — Some cases get the right transformation type but wrong value (TC037 isClickable vs overflow, TC066 secondary vs default, TC082 hasNoPadding vs removal).

## Unchanged Files (18 total)

### Correctly unchanged (13) — fixedWithCodemods=false, no changes needed:
TC032, TC035, TC039, TC041, TC045, TC055, TC056, TC061, TC069, TC071, TC076 (+ TC004, TC063 edge cases)

### Should have changed but didn't (5):
| TC | Component | What was needed |
|----|-----------|-----------------|
| TC007 | Button icon | Move icon from children to icon prop |
| TC010 | Card selectable | Simplify selectableActions |
| TC025 | Duplicate imports | Design limitation — unevaluable |
| TC029 | FormField typo | Rename misspelled interface |
| TC046 | MenuToggle icon | Move icon from children to icon prop |

## Trend: Improvements vs Previous Run

### Improvements (10 test cases, +13 points)

| TC | Component | Previous | Current | Change |
|----|-----------|----------|---------|--------|
| TC001 | Accordion isHidden | 1 | 3 | +2 |
| TC002 | Accordion markup | 1 | 2 | +1 |
| TC003 | Accordion toggle | 1 | 3 | +2 |
| TC005 | Avatar border | 0 | 1 | +1 |
| TC008 | Button isActive | 0 | 1 | +1 |
| TC045 | MenuItemAction | 1 | 3 | +2 |
| TC053 | NavItem wrapper | 1 | 2 | +1 |
| TC063 | PageHeaderTools | 2 | 3 | +1 |
| TC080 | Tokens prefix | 2 | 3 | +1 |
| TC084 | Toolbar interface | 0 | 1 | +1 |

**Notable:** Accordion test cases (TC001, TC003) jumped from 1→3, showing significant improvement in handling `isHidden` removal and `isExpanded` migration.

### Regressions (11 test cases, -12 points)

| TC | Component | Previous | Current | Change |
|----|-----------|----------|---------|--------|
| TC016 | DataList action | 2 | 1 | -1 |
| TC024 | DualListSelector next | 3 | 2 | -1 |
| TC025 | Duplicate imports | 2 | 0 | -2 |
| TC036 | KebabToggle | 3 | 2 | -1 |
| TC040 | Login footer | 2 | 1 | -1 |
| TC044 | Masthead structure | 2 | 1 | -1 |
| TC049 | Modal next | 3 | 2 | -1 |
| TC050 | MultiContentCard | 3 | 2 | -1 |
| TC070 | Popper appendTo | 3 | 2 | -1 |
| TC079 | Tile deprecated | 3 | 2 | -1 |
| TC082 | Toolbar props | 1 | 0 | -1 |

**Notable:** Many regressions are from score 3→2, often due to the tool now making additional changes beyond what's needed (TC050 adding withDividers, TC070 rewriting Select, TC079 using invalid Card props).

## Top 3 Priority Fixes

1. **"Remove without replace" pattern** (TC005, TC006, TC008, TC011, TC021) — When removing deprecated props, the tool must add the PF6 replacement prop, not just strip the old one. This accounts for 5 worse-than-codemods cases.

2. **Icon-to-prop migration** (TC007, TC046) — Implement detection and transformation of icons passed as children to the `icon` prop pattern. Two completely missed migrations.

3. **Variant value mapping** (TC066, TC062) — Fix `variant='light'→'default'` mapping (currently maps to 'secondary'). Fix `hasBodyWrapper={false}` vs variant confusion.
