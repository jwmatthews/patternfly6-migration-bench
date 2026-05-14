# tackle2-ui PF5→PF6 Migration Analysis

**Source**: [konveyor/tackle2-ui PR #3246](https://github.com/konveyor/tackle2-ui/pull/3246)
**Date**: 2026-05-14
**PR Stats**: 250 files changed, 2,537 additions, 4,236 deletions, 32 commits
**Author**: Radoslaw Szwajkowski (assisted by Cursor/Claude Opus)

## Summary

This document catalogs every distinct PF5→PF6 change observed in the tackle2-ui migration PR, maps each against the patternfly6-migration-bench test cases (TC001-TC085), and identifies gaps — real-world migration patterns not covered by our benchmark.

### High-Level Stats

| Metric | Count |
|--------|-------|
| Total distinct change types observed | 88 |
| Covered by benchmark test cases | 38 |
| Partially covered by benchmark | 12 |
| **NOT covered by benchmark (gaps)** | **38** |

### Change Categories

| Category | Distinct Patterns |
|----------|-------------------|
| Component renames | 8 |
| Import path changes | 3 |
| Prop renames | 10 |
| Prop removals | 6 |
| Prop value changes | 7 |
| Structure changes (component composition) | 5 |
| Interface/type renames | 5 |
| Token renames (JS) | 16 |
| CSS class prefix renames (pf-v5→pf-v6) | 24+ component families |
| CSS utility class renames | 6 |
| CSS variable renames (global tokens) | 12 |
| CSS variable renames (component tokens) | 15+ |
| Behavioral/markup changes | 9 |
| Package upgrades | 7 |

---

## Complete Change Catalog

Each entry has:
- **ID**: Unique identifier for this analysis
- **Change**: What changed
- **Benchmark**: TC number if covered, "GAP" if not, "PARTIAL" if partly covered

---

### A. Component Renames

| ID | Component | Before | After | Files | Benchmark |
|----|-----------|--------|-------|-------|-----------|
| A01 | Text → Content | `<Text>`, `<TextContent>` | `<Content>` | ~40 files, ~270 JSX replacements | **TC077** |
| A02 | TextVariants → ContentVariants | `TextVariants.p`, `.h3` | `ContentVariants.p`, `.h3` | ~5 files | **TC077** (partial — TC077 tests element rename, not variant enum) |
| A03 | TextList/TextListItem → Content | `<TextList component="dl">` | `<Content component="dl">` | 1 file | **TC077** (partial) |
| A04 | ToolbarChip → ToolbarLabel | `ToolbarChip` type | `ToolbarLabel` type | 4 files | **TC084** |
| A05 | ToolbarChipGroup → ToolbarLabelGroup | `ToolbarChipGroup` type | `ToolbarLabelGroup` type | 1 file | **TC084** |
| A06 | Chip → Label | `<Chip>` component | `<Label variant="outline">` | 1 file | **TC012, TC013** |
| A07 | ChipGroup → LabelGroup | `<ChipGroup>` | `<LabelGroup>` | 1 file | **TC013** |
| A08 | MastheadBrand → MastheadLogo | `<MastheadBrand>` (old) | `<MastheadLogo>` + new `<MastheadBrand>` wrapper | 1 file | **TC042** |

### B. Import Path Changes

| ID | Component | Before | After | Files | Benchmark |
|----|-----------|--------|-------|-------|-----------|
| B01 | Modal → deprecated | `@patternfly/react-core` | `@patternfly/react-core/deprecated` | ~31 files | **TC048** |
| B02 | Charts → /victory | `@patternfly/react-charts` | `@patternfly/react-charts/victory` | 4 files | **GAP** |
| B03 | DualListSelector → deprecated | `@patternfly/react-core` | `@patternfly/react-core/deprecated` | 1 file | **TC023** |

### C. Prop Renames

| ID | Component | Before | After | Files | Benchmark |
|----|-----------|--------|-------|-------|-----------|
| C01 | FormGroup | `labelIcon` | `labelHelp` | 1 file | **TC030** |
| C02 | Page | `header` | `masthead` | 1 file | **TC057** |
| C03 | ToolbarFilter | `chips` | `labels` | 4 files, 5 instances | **TC083** |
| C04 | ToolbarFilter | `deleteChip` | `deleteLabel` | 4 files, 5 instances | **TC083** |
| C05 | ToolbarFilter | `deleteChipGroup` | `deleteLabelGroup` | 2 files, 3 instances | **TC083** |
| C06 | MenuToggle | `splitButtonOptions` | `splitButtonItems` | 1 file | **GAP** |
| C07 | ToolbarGroup | `spacer` | `gap` | 1 file, 2 instances | **TC085** (spacer removal) |
| C08 | Label (was Chip) | `onClick` | `onClose` | 1 file | **PARTIAL** (TC013 covers Chip→Label but not onClick→onClose) |
| C09 | LabelGroup | `ouiaId` | `data-ouia-component-id` | 1 file | **GAP** |
| C10 | PageSectionVariants enum | `PageSectionVariants.light` | removed (use `hasBodyWrapper`) | ~10 files | **TC066** (partial — enum removal not explicit) |

### D. Prop Removals

| ID | Component | Prop Removed | Files | Benchmark |
|----|-----------|-------------|-------|-----------|
| D01 | PageSidebar | `theme` | 1 file | **TC068** |
| D02 | Nav | `theme` | 1 file | **TC052** |
| D03 | Card | `isFlat` | 1 file | **GAP** |
| D04 | ToolbarToggleGroup | `spaceItems` | 1 file | **GAP** |
| D05 | ToolbarItem | `widths` | 1 file | **TC082** |
| D06 | Switch | `labelOff` | (not observed in this PR — no Switch labelOff usage) | **TC073** (benchmark covers it but not exercised here) |

### E. Prop Value Changes

| ID | Component | Before | After | Files | Benchmark |
|----|-----------|--------|-------|-------|-----------|
| E01 | PageSection | `variant="light"` / `PageSectionVariants.light` | `hasBodyWrapper={false}` | ~35 instances | **TC066** |
| E02 | ToolbarGroup | `variant="button-group"` | `variant="action-group"` | 17 instances | **GAP** |
| E03 | ToolbarGroup | `variant="icon-button-group"` | `variant="action-group-plain"` | 4 instances | **GAP** |
| E04 | ToolbarItem/Group | `align: { default: "alignRight" }` | `align: { default: "alignEnd" }` | 2 instances | **GAP** |
| E05 | Label color | `"cyan"` | `"teal"` | 1 file | **TC014** |
| E06 | Pagination | `align: { default: "alignRight" }` | `align: { default: "alignEnd" }` | 1 file | **GAP** (same as E04, different component) |
| E07 | PageSection | plain `<PageSection>` | `<PageSection hasBodyWrapper={false}>` | many files | **TC062** |

### F. Structure Changes (Component Composition)

| ID | Component | Before | After | Files | Benchmark |
|----|-----------|--------|-------|-------|-----------|
| F01 | EmptyState | `<EmptyStateHeader>` + `<EmptyStateIcon>` as children | Props on `<EmptyState>`: `titleText`, `icon`, `headingLevel` | ~25 files | **TC026, TC027** |
| F02 | Button | Icon as children: `<Button><TrashIcon /></Button>` | Icon as prop: `<Button icon={<TrashIcon />} />` | 6 instances | **TC007** |
| F03 | Masthead | `<MastheadToggle>` as sibling of `<MastheadMain>` | `<MastheadToggle>` nested inside `<MastheadMain>` | 1 file | **TC044** |
| F04 | PageToggleButton | `<PageToggleButton><BarsIcon /></PageToggleButton>` | `<PageToggleButton isHamburgerButton />` | 1 file | **GAP** |
| F05 | EmptyStateIcon standalone | `<EmptyStateIcon icon={X} color="black" />` outside EmptyState | Removed — render icon directly | 1 file | **PARTIAL** (TC027 covers EmptyState context only) |

### G. Token/Variable Renames (JavaScript — @patternfly/react-tokens)

| ID | Before | After | Files | Benchmark |
|----|--------|-------|-------|-----------|
| G01 | `global_palette_black_1000` | `chart_color_black_500` | Constants.ts | **GAP** |
| G02 | `global_palette_blue_300` | `chart_color_blue_300` | Constants.ts, 2 chart files | **GAP** |
| G03 | `global_palette_green_300` | `chart_color_green_300` | Constants.ts | **GAP** |
| G04 | `global_palette_orange_300` | `chart_color_orange_300` | Constants.ts | **GAP** |
| G05 | `global_palette_black_500` | No equivalent — manual constant | Constants.ts | **GAP** |
| G06 | `global_palette_cyan_300` | No equivalent — manual constant (teal) | Constants.ts | **GAP** |
| G07 | `global_palette_gold_300` | No equivalent — manual constant | Constants.ts | **GAP** |
| G08 | `global_palette_purple_600` | No equivalent — manual constant | Constants.ts | **GAP** |
| G09 | `global_danger_color_100` | `t_global_color_status_danger_default` | StatusIcon.tsx | **TC080** (partial — covers `t_` prefix but not full naming) |
| G10 | `global_Color_dark_200` | `t_global_text_color_200` | StatusIcon.tsx | **TC080** (partial) |
| G11 | `global_disabled_color_200` | `t_global_text_color_disabled` | StatusIcon.tsx | **TC080** (partial) |
| G12 | `global_info_color_100` | `t_global_color_status_info_default` | StatusIcon.tsx | **TC080** (partial) |
| G13 | `global_info_color_200` | `t_global_color_status_info_200` | StatusIcon.tsx | **TC080** (partial) |
| G14 | `global_success_color_100` | `t_global_color_status_success_default` | StatusIcon.tsx | **TC080** (partial) |
| G15 | `global_danger_color_200` | Removed entirely (EmptyStateIcon color no longer used) | StateError.tsx | **GAP** |
| G16 | `global_palette_black_300` | `chart_color_black_200` | donut.tsx | **GAP** |

### H. CSS Class Prefix Renames (pf-v5-c-* → pf-v6-c-*)

These are all mechanical prefix swaps. The benchmark does not test CSS class renaming as a category.

| ID | Component | Example | Source Files | Benchmark |
|----|-----------|---------|-------------|-----------|
| H01 | All component classes | `pf-v5-c-button` → `pf-v6-c-button` | ~30 CSS/TSX files | **GAP** |
| H02 | Layout classes | `pf-v5-l-stack` → `pf-v6-l-stack` | ~5 files | **GAP** |
| H03 | Utility classes | `pf-v5-u-color-200` → `pf-v6-u-color-200` | ~8 files | **GAP** |
| H04 | SVG classes | `pf-v5-svg` → `pf-v6-svg` | Cypress + snapshots | **GAP** |

24+ distinct component class families affected (Button, Card, Modal, Table, Menu, Tabs, Nav, Drawer, EmptyState, Wizard, Switch, Form, Label, Badge, Breadcrumb, Content, Code Editor, Pagination, Progress, Description List, Popover, Spinner, Chart, Notification Drawer).

### I. CSS Variable Renames (Global Design Tokens)

PF6 changed the global token naming convention from `--pf-v5-global--*` to `--pf-t--global--*`.

| ID | Before | After | Files | Benchmark |
|----|--------|-------|-------|-----------|
| I01 | `--pf-v5-global--spacer--xl` | `--pf-t--global--spacer--xl` | 1 CSS file | **TC081** (partial) |
| I02 | `--pf-v5-global--spacer--md` | `--pf-t--global--spacer--md` | 2 CSS files | **TC081** (partial) |
| I03 | `--pf-v5-global--spacer--xs` | `--pf-t--global--spacer--xs` | 1 CSS file | **TC081** (partial) |
| I04 | `--pf-v5-global--spacer--lg` | `--pf-t--global--spacer--lg` | 5 files | **TC081** (partial) |
| I05 | `--pf-v5-global--spacer--sm` | `--pf-t--global--spacer--sm` | 1 CSS file | **TC081** (partial) |
| I06 | `--pf-v5-global--danger-color--100` | `--pf-t--global--color--status--danger--default` | 1 CSS file | **GAP** (non-trivial mapping) |
| I07 | `--pf-v5-global--BackgroundColor--100` | `--pf-t--global--background--color--primary--default` | 3 files | **GAP** (non-trivial mapping) |
| I08 | `--pf-v5-global--BorderColor--100` | `--pf-t--global--border--color--default` | 1 file | **GAP** (non-trivial mapping) |
| I09 | `--pf-v5-global--success-color--100` | `--pf-t--global--color--status--success--default` | 1 CSS file | **GAP** (non-trivial mapping) |
| I10 | `--pf-v5-global--warning-color--100` | `--pf-t--global--color--status--warning--default` | 1 CSS file | **GAP** (non-trivial mapping) |
| I11 | `--pf-v5-global--FontSize--md` | `--pf-t--global--font--size--body--default` | 2 files | **GAP** (non-trivial mapping) |
| I12 | `--pf-v5-global--FontSize--lg` | `--pf-t--global--font--size--body--lg` | 1 file | **GAP** (non-trivial mapping) |

Note: Spacer tokens (I01-I05) are straightforward prefix swaps. Color, background, border, and font-size tokens (I06-I12) involve **non-trivial name restructuring** — these are harder than simple find-and-replace.

### J. CSS Variable Renames (Component-Scoped)

| ID | Component | Before | After | Benchmark |
|----|-----------|--------|-------|-----------|
| J01 | Label | `--pf-v5-c-label__content--*` (6 vars) | `--pf-v6-c-label__content--*` | **GAP** (prefix swap) |
| J02 | Tabs | `--pf-v5-c-tabs__scroll-button--Width` | `--pf-v6-c-tabs__scroll-button--Width` | **GAP** |
| J03 | Code Editor | `--pf-v5-c-code-editor__code--Padding*` (4 vars) | `--pf-v6-c-code-editor__code--Padding*` | **GAP** |
| J04 | Modal Box | `--pf-v5-c-modal-box--*` (2 vars) | `--pf-v6-c-modal-box--*` | **GAP** |
| J05 | Toggle Group | `--pf-v5-c-toggle-group__button--FontSize` | `--pf-v6-c-toggle-group__button--FontSize` | **GAP** |
| J06 | Wizard | `--pf-v5-c-wizard__header--BackgroundColor` | `--pf-v6-c-wizard__header--BackgroundColor` | **GAP** |
| J07 | Expandable Section | `--pf-v5-c-expandable-section__toggle--Color` (2 vars) | `--pf-v6-*` | **GAP** |
| J08 | Popover | `--pf-v5-c-popover__*` (3 vars) | `--pf-v6-c-popover__*` | **GAP** |
| J09 | Description List | `--pf-v5-c-description-list__*--FontSize` (2 vars) | `--pf-v6-*` | **GAP** |
| J10 | Table | `--pf-v5-c-table--cell--PaddingLeft` | `--pf-v6-c-table--cell--PaddingLeft` | **GAP** |
| J11 | Switch | `--pf-v5-c-switch__input--focus*` | `--pf-v6-*` | **GAP** |
| J12 | Form Control | `--pf-v5-c-form-control--Width` | `--pf-v6-*` | **GAP** |
| J13 | Nav | `--pf-v5-c-nav__link--before--BorderColor` | `--pf-v6-c-nav__link--BorderColor` (structural!) | **GAP** (non-trivial) |
| J14 | Card | `--pf-v5-c-card--*` (2 vars) | `--pf-v6-c-card--*` | **GAP** |

### K. Behavioral / Markup Changes

| ID | Change | Description | Files | Benchmark |
|----|--------|-------------|-------|-----------|
| K01 | Menu portal rendering | Dropdown/kebab menus now render via Popper outside parent DOM | 7 Cypress functions rewritten | **TC070** (partial — TC070 covers appendTo default but not the Cypress/testing impact) |
| K02 | Switch state detection | `.pf-m-on`/`.pf-m-off` classes removed; use `:checked` on input | 3 Cypress functions | **GAP** |
| K03 | Button disabled attr | `pf-m-disabled` class → native `disabled` HTML attribute | 6 Cypress patterns | **GAP** |
| K04 | Button text wrapper | Text now in `<span class="pf-v6-c-button__text">` | Snapshots | **GAP** |
| K05 | Button icon wrapper | Icon now in `<span class="pf-v6-c-button__icon">` | Snapshots | **GAP** |
| K06 | aria-disabled removed | `aria-disabled="false"` no longer rendered on buttons | 18+ snapshot occurrences | **GAP** |
| K07 | OUIA type prefix | `PF5/*` → `PF6/*` (e.g., `PF5/Button` → `PF6/Button`) | All snapshots (89 occurrences) | **GAP** |
| K08 | Content semantic classes | `<p>` inside Content gets `pf-v6-c-content--p` class | Snapshots | **GAP** |
| K09 | EmptyState icon color | Inline `--pf-v5-c-empty-state__icon--Color` style removed | Snapshots | **GAP** |
| K10 | DatePicker button dedup | No longer renders duplicate date buttons | 1 Cypress test | **GAP** |
| K11 | Tab overflow handling | OUIA-based selectors; overflow tab discovery changed | Cypress | **GAP** |

### L. Package Changes

| ID | Package | Before | After | Benchmark |
|----|---------|--------|-------|-----------|
| L01 | @patternfly/patternfly | 5.4.2 | 6.4.0 | N/A |
| L02 | @patternfly/react-core | 5.4.14 | 6.4.3 | N/A |
| L03 | @patternfly/react-table | 5.4.16 | 6.4.3 | N/A |
| L04 | @patternfly/react-charts | 7.4.9 | 8.4.1 | N/A |
| L05 | @patternfly/react-code-editor | 5.4.18 | 6.4.3 | N/A |
| L06 | @patternfly/react-tokens | 5.4.1 | 6.4.0 | N/A |
| L07 | victory (NEW) | — | ^37.3.6 | **GAP** (new transitive dep) |

---

## Gap Analysis: Changes NOT Covered by Benchmark

### Priority 1: High-Frequency Real-World Changes Missing from Benchmark

These appeared frequently in the tackle2-ui migration and represent significant gaps:

| Gap | Change | Frequency in PR | Impact |
|-----|--------|----------------|--------|
| **CSS class prefix rename** (pf-v5-c/l/u → pf-v6) | All PF CSS classes changed prefix | 24+ component families, 60+ files | Pervasive — every app using PF CSS selectors is affected |
| **ToolbarGroup variant renames** | `button-group`→`action-group`, `icon-button-group`→`action-group-plain` | 21 instances | Common — most apps with toolbars |
| **Alignment value renames** | `alignRight`→`alignEnd`, `alignLeft`→`alignStart` | 2 instances | Moderate — any app using Toolbar alignment |
| **Charts /victory import path** | `@patternfly/react-charts` → `@patternfly/react-charts/victory` | 4 files | Any app using PF charts |
| **global_palette_* token removal** | Renamed to `chart_color_*` or removed entirely | 8 tokens, 4 files | Any app using PF color tokens |
| **Global CSS token restructuring** | `--pf-v5-global--danger-color--100` → `--pf-t--global--color--status--danger--default` (non-trivial mapping) | 7 distinct non-trivial mappings | Any app with custom CSS using PF global tokens |

### Priority 2: Behavioral/Markup Changes (Testing Impact)

These affect e2e tests and code that relies on PF's rendered DOM structure:

| Gap | Change | Impact |
|-----|--------|--------|
| **Switch state detection** | `.pf-m-on`/`.pf-m-off` → native `:checked` | Breaks all Switch state assertions |
| **Button disabled detection** | `pf-m-disabled` class → native `disabled` attr | Breaks disabled button assertions |
| **Button DOM structure** | Text/icon wrapped in `<span>` elements | Breaks snapshot tests, CSS targeting |
| **OUIA type prefix** | `PF5/*` → `PF6/*` | Breaks OUIA-based selectors |
| **aria-disabled removal** | `aria-disabled="false"` no longer rendered | Breaks accessibility assertions |
| **Content semantic classes** | `<p>` gets `pf-v6-c-content--p` | Changes CSS specificity |
| **EmptyState icon color** | Inline style removed | Breaks custom icon coloring |

### Priority 3: Specific API Changes

| Gap | Change | Notes |
|-----|--------|-------|
| **MenuToggle splitButtonOptions → splitButtonItems** | Prop rename + structural change (object → array) | Not just a rename |
| **Card isFlat removed** | Prop removal | Common pattern |
| **ToolbarToggleGroup spaceItems removed** | Prop removal | Related to but distinct from TC085 spacer |
| **PageToggleButton isHamburgerButton** | New prop replaces BarsIcon children | Component-specific |
| **LabelGroup ouiaId → data-ouia-component-id** | OUIA prop API change | Affects test infrastructure |
| **Component-scoped CSS variable renames** | 14 component families | Mechanical prefix swap but high volume |
| **Nav CSS variable structural rename** | `--before--BorderColor` → `--BorderColor` | Non-trivial — not just prefix change |
| **victory new dependency** | Required for PF6 charts | Package management |

---

## Benchmark Coverage Summary

### Test Cases Exercised in tackle2-ui

The following benchmark test cases correspond to changes actually observed in this PR:

| TC | Description | Observed in PR |
|----|-------------|----------------|
| TC007 | Button icons → icon prop | Yes, 6 instances |
| TC012 | Chip deprecated | Yes, moved to Label |
| TC013 | Chip → Label replacement | Yes |
| TC014 | Color cyan → teal | Yes |
| TC023 | DualListSelector deprecated | Yes |
| TC026 | EmptyStateHeader/Icon exports removed | Yes, ~15 files |
| TC027 | EmptyState header restructure | Yes, ~25 files |
| TC030 | FormGroup labelIcon → labelHelp | Yes |
| TC042 | MastheadBrand → MastheadLogo | Yes |
| TC044 | Masthead structure changes | Yes |
| TC048 | Modal deprecated | Yes, ~31 files |
| TC052 | Nav theme removed | Yes |
| TC057 | Page header → masthead | Yes |
| TC062 | PageSection hasBodyWrapper | Yes |
| TC066 | PageSection variant changes | Yes, ~35 instances |
| TC068 | PageSidebar theme removed | Yes |
| TC070 | Popper appendTo default (partial) | Yes (behavioral impact seen) |
| TC077 | Text → Content | Yes, ~40 files, largest single change |
| TC080 | Token t_ prefix (partial) | Yes, 6 tokens in StatusIcon |
| TC081 | CSS token updates (partial) | Yes, spacer tokens |
| TC082 | Toolbar props removed (partial) | Yes, widths removed |
| TC083 | Toolbar chip → label props | Yes, 4 files |
| TC084 | Toolbar interface rename | Yes, 4 files |
| TC085 | Toolbar spacer → gap | Yes |

### Test Cases NOT Exercised in tackle2-ui

These benchmark test cases cover PF changes that didn't appear in this PR (either the app didn't use the API, or the change wasn't needed):

TC001-TC003 (Accordion), TC004 (data-codemods), TC005 (Avatar), TC006 (Banner), TC008-TC011 (Button isActive, Card raised/selectable), TC015 (ContentHeader), TC016 (DataListAction), TC017 (deprecated components), TC018 (DragDrop), TC019-TC022 (Drawer), TC024 (DualListSelector next), TC025 (duplicate imports), TC028 (ErrorState), TC029 (FormFieldGroup typo), TC031-TC032 (HelperTextItem), TC033 (InvalidObject), TC034-TC035 (JumpLinksItem), TC036 (KebabToggle), TC037 (Label overflow), TC038 (LogSnippet), TC039 (LogViewer), TC040-TC041 (LoginMainFooter), TC043 (Masthead bgcolor), TC045 (MenuItemAction), TC046 (MenuToggle icon), TC047 (MissingPage), TC049 (Modal next), TC050 (MultiContentCard), TC051 (Nav tertiary), TC053 (NavItem wrapper), TC054 (NotAuthorized), TC055-TC056 (NotificationBadge/Drawer markup), TC058-TC061 (Page tertiary/body), TC063-TC065 (PageHeaderTools, PageNavigation, PageSection nav), TC067 (PageSection variant+type), TC069 (Pagination markup), TC071 (SimpleFileUpload), TC072 (Slider CSS), TC073 (Switch labelOff), TC074-TC076 (Tabs), TC078 (Th CSS), TC079 (Tile).

---

## Recommendations for Benchmark Expansion

### New Test Cases Needed (ordered by real-world impact)

1. **CSS class prefix migration** (pf-v5 → pf-v6) — Most pervasive change across any PF app. Add test cases covering CSS selectors in both `.css` files and inline `className` usage.

2. **ToolbarGroup variant renames** — `button-group` → `action-group`, `icon-button-group` → `action-group-plain`. High frequency (21 instances in tackle2-ui).

3. **Charts import path change** — `@patternfly/react-charts` → `@patternfly/react-charts/victory`. Every PF app using charts needs this.

4. **Alignment value renames** — `alignRight` → `alignEnd`, `alignLeft` → `alignStart`. Affects Toolbar, Pagination, and potentially other components.

5. **global_palette_* token removal** — Some renamed to `chart_color_*`, others removed with no equivalent. This is a hard migration problem.

6. **Global CSS token restructuring** — The non-trivial remapping (e.g., `--pf-v5-global--danger-color--100` → `--pf-t--global--color--status--danger--default`). TC081 covers the concept but not the specific hard mappings.

7. **MenuToggle splitButtonOptions → splitButtonItems** — Not just a rename; the data structure also changed (object with `items` key → flat array).

8. **Card isFlat removal** — Common prop, easy to miss.

9. **PageToggleButton isHamburgerButton** — Replaces BarsIcon children pattern.

10. **Behavioral/DOM changes** (for testing infrastructure):
    - Switch `.pf-m-on`/`.pf-m-off` → `:checked`
    - Button `pf-m-disabled` → native `disabled`
    - Button text/icon `<span>` wrappers
    - OUIA `PF5/*` → `PF6/*`

---

## Data for Follow-Up: Semver Rules Cross-Reference

The following unique change types from this analysis should be checked against the semver rules at `results/2026-05-05-semver-goose-050526-1644/semver/semver_rules/`:

### Changes likely covered by existing rules:
- Component renames (A01-A08)
- Prop renames (C01-C07)
- Prop removals (D01-D05)
- Import path changes (B01, B03)
- Token prefix changes (G09-G14)

### Changes likely NOT covered by existing rules (highest priority to check):
- ToolbarGroup variant value renames (E02, E03)
- Alignment value renames (E04, E06)
- Charts import path (B02)
- global_palette_* token removals/renames (G01-G08, G15-G16)
- CSS class prefix renames (H01-H04)
- Global CSS token restructuring with non-trivial name mapping (I06-I12)
- Component-scoped CSS variable renames (J01-J14)
- MenuToggle splitButtonOptions structural change (C06)
- Card isFlat removal (D03)
- ToolbarToggleGroup spaceItems removal (D04)
- All behavioral/markup changes (K01-K11)
