# pf-codemods Baseline Evaluation Report

**Date:** 2026-05-04
**Tool Branch:** `pf-codemods-baseline`
**Baseline Branch:** `pf-codemods-baseline` (self-evaluation)

---

## Summary

| Metric | Count | Pct |
|--------|------:|----:|
| Total test cases | 85 | 100% |
| Fully correct (score 3) | 54 | 63.5% |
| Partially correct (score 1-2) | 19 | 22.4% |
| Wrong/harmful (score 0) | 12 | 14.1% |
| Files unchanged by tool | 18 | 21.2% |

### vs pf-codemods (self-evaluation)

Since this run evaluates pf-codemods against itself, all `fixedWithCodemods=true` cases are "equal" by definition.

| Comparison | Count |
|------------|------:|
| Better than codemods | 0 |
| Equal to codemods | 66 |
| Worse than codemods | 0 |
| N/A (codemods doesn't fix) | 19 |

### Codemods coverage

| Metric | Count |
|--------|------:|
| Test cases codemods claims to fix | 66 |
| Of those, fully correct (score 3) | 41 |
| Of those, partially correct (1-2) | 15 |
| Of those, wrong (score 0) | 10 |

---

## Strengths: What pf-codemods Does Well (score 3)

pf-codemods excels at **simple prop renames**, **import path changes**, and **prop removals**:

- **Prop renames** (14 cases): isActive→isClicked, isSecondary→isSubtab, labelIcon→labelHelp, isTertiaryNavGrouped→isHorizontalSubnavGrouped, etc.
- **Import path migrations** (6 cases): Moving deprecated components to `@patternfly/react-core/deprecated` (Chip, DragDrop, DualListSelector, Modal, Tile)
- **Prop removals** (8 cases): hasNoPadding, theme, backgroundColor, usePageInsets, labelOff, isSelected, etc.
- **Value replacements** (6 cases): colorVariant light-200→secondary, variant tertiary→horizontal-subnav, variant light300→secondary, etc.
- **Structural transforms** (5 cases): Masthead restructuring, EmptyState consolidation, Text→Content migration, PageNavigation removal
- **Correct no-ops** (14 cases): All "no code changes needed" cases where fixedWithCodemods=false were correctly left unchanged

---

## Partially Correct (score 1-2) — 19 cases

### Score 2 — Correct but non-idiomatic (13 cases)

| ID | Component | Issue |
|----|-----------|-------|
| TC002 | Accordion item | Applied valid but unrelated codemod (isExpanded migration) |
| TC006 | Banner | Used `color` prop instead of more semantic `status` prop |
| TC010 | Card | Simplified selectableActions sub-properties instead of removing |
| TC012 | Chip | Replaced with Label instead of using deprecated import path |
| TC015 | Content header | Left `data-codemods` attribute on element |
| TC027 | Empty state header | Wrapped `<Title>` JSX in `titleText` instead of extracting string |
| TC033 | Invalid object | Left `data-codemods` attribute on element |
| TC038 | Log snippet | Added `@ts-expect-error` comment indicating type-safety issue |
| TC040 | Login footer links | data-codemods artifact, empty Button children, awkward aria-label spreading |
| TC048 | Modal | Moved to deprecated shim instead of migrating to new composable API |
| TC062 | Page section bodywrapper | Boolean bug: `hasBodyWrapper` without `={false}`; variant='light' removed instead of mapped |
| TC080 | Tokens | Color token mapped to placeholder `t_temp_dev_tbd` |
| TC085 | Toolbar spacer | Renamed `spacer` to `gap` instead of removing |

### Score 1 — Partially correct (6 cases)

| ID | Component | Issue |
|----|-----------|-------|
| TC009 | Card | Removed deprecated selectable props without providing replacement pattern |
| TC016 | DataList action | Incorrectly moved Button text content to `icon` prop as string |
| TC029 | Form field typo | Test file lacks the misspelled interface; tangential import removal |
| TC053 | Nav item | Removed hasNavLinkWrapper but didn't move icon to `icon` prop |
| TC067 | Page section | Applied variant removal when test expected no changes |
| TC084 | Toolbar interface | Test lacks the types to rename; only removed unused import |

---

## Wrong/Harmful (score 0) — 12 cases

### Destructive replacements (3 cases)

These are the most concerning — the tool replaced working components with non-functional stub divs:

| ID | Component | What happened |
|----|-----------|---------------|
| TC017 | Deprecated components | Old Dropdown/Select replaced with placeholder div, all functionality lost |
| TC036 | Kebab toggle | KebabToggle replaced with stub div instead of MenuToggle + EllipsisVIcon |
| TC070 | Popper appendTo | Entire component gutted and replaced with placeholder div |

### Wrong direction — /next promoted to deprecated (2 cases)

| ID | Component | What happened |
|----|-----------|---------------|
| TC024 | DualListSelector next | Moved from `/next` to `/deprecated` instead of promoting to `@patternfly/react-core` |
| TC049 | Modal next | Moved from `/next` to `/deprecated` instead of promoting to `@patternfly/react-core` |

### Unchanged when changes needed (4 cases)

| ID | Component | What happened |
|----|-----------|---------------|
| TC004 | data-codemods cleanup | `data-codemods` attributes not removed (file identical to main) |
| TC025 | Duplicate imports | File unchanged (test setup issue — duplicate pre-removed for compilation) |
| TC046 | MenuToggle icon | Icon not moved from children to `icon` prop |
| TC081 | Tokens CSS | CSS file not processed — no `--pf-v5-*` to `--pf-v6-*` updates |

### Incorrect modifications (2 cases)

| ID | Component | What happened |
|----|-----------|---------------|
| TC061 | Page body wrapper | Made unnecessary changes (removed imports, added hasBodyWrapper) when none needed |
| TC066 | PageSection variant | All variant values stripped entirely instead of being renamed (light→default, dark→secondary) |

### Not fixable by codemods (1 case)

| ID | Component | What happened |
|----|-----------|---------------|
| TC078 | Th CSS variables | CSS variable renames needed but codemods don't process CSS files |

---

## Key Patterns in Failures

1. **Destructive stubs**: When codemods encounter components it can't structurally transform (old Dropdown, KebabToggle, deprecated Select), it replaces them with non-functional stubs. This is actively harmful.

2. **`/next` → deprecated confusion**: Components that were in `/next` (the new API being tested) get incorrectly moved to `/deprecated` instead of being promoted to the main package.

3. **CSS blind spot**: Codemods doesn't process CSS files at all — no token prefix updates, no CSS variable renames.

4. **`data-codemods` cleanup gap**: The tool leaves its own tracking attributes behind and doesn't clean them up.

5. **Icon migration inconsistency**: Button icon migration works (TC007), but MenuToggle (TC046) and NavItem (TC053) icon migrations fail or are incomplete.

---

## Priority Fixes for Any Tool Competing with pf-codemods

1. **Never produce destructive stubs** — leave the component unchanged rather than replacing it with a non-functional div
2. **Distinguish `/next` from deprecated** — components imported from `/next` should be promoted to main, not demoted to deprecated
3. **Handle CSS token/variable renames** — process CSS files for `--pf-v5-*` → `--pf-v6-*` prefix updates
4. **Complete icon migrations** — MenuToggle and NavItem icon prop migrations are gaps
5. **PageSection variant mapping** — rename variant values (light→default, dark→secondary) instead of stripping them
