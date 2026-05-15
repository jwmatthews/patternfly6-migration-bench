# Rule Analysis: May 6 Semver+Goose Migration Run

**Run**: `semver/goose/050626-2037`
**Analysis date**: 2026-05-15 (updated)
**Results directory**: `results/2026-05-06-semver-goose-050626-2037`
**Score**: 49 correct (57.6%), 19 partial, 17 wrong out of 85 test cases

## 1. Summary by Root Cause

| Root Cause | Count | % | Description |
|---|---|---|---|
| correct | 49 | 57.6% | Rules and tool both work correctly |
| incomplete_correlation | 12 | 14.1% | Related rules exist but aren't connected -- tool removes without replacing |
| wrong_guidance | 6 | 7.1% | Fix guidance maps to an incorrect target |
| missing_rule | 5 | 5.9% | No rule or fix-strategy exists for this breaking change |
| rule_quality | 6 | 7.1% | Rule exists but guidance too vague for the tool to act on |
| tool_behavior | 4 | 4.7% | Rule and guidance are correct but the tool didn't follow them |
| strategy_gap | 3 | 3.5% | The strategy type can't express the needed fix |

## 2. Priority Fixes -- Wrong Guidance

These 6 rules actively cause incorrect output. They are the highest-value fixes.

### WG-1: TC037 -- Label.isOverflowLabel (score 0)

- **Rule**: `semver-...-label-isoverflowlabel-renamed`
- **Current strategy**: `Rename from: isOverflowLabel to: isClickable`
- **Correct fix**: Replace `isOverflowLabel` with `variant='overflow'`
- **Root cause**: The semver analyzer saw `isOverflowLabel` removed and `isClickable` added in the same interface diff. It incorrectly inferred a rename. These are unrelated -- `isClickable` is a new prop, not a replacement for `isOverflowLabel`.
- **Fix**: Change strategy to a prop-to-variant mapping: remove `isOverflowLabel`, add `variant='overflow'`.

### WG-2: TC082 -- Toolbar.usePageInsets (score 0, affects multiple props)

- **Rule**: `semver-...-toolbar-usepageinsets-renamed`
- **Current strategy**: `Rename from: usePageInsets to: hasNoPadding`
- **Correct fix**: REMOVE `usePageInsets` entirely. Also remove `alignSelf`, `widths` from ToolbarItem.
- **Root cause**: Analyzer saw `usePageInsets` removed and `hasNoPadding` added and inferred a rename. They are semantically different props (page-level insets vs. padding control).
- **Fix**: Change strategy to `RemoveProp`. The `widths` RemoveProp (line 39012 in fix-strategies.json) is correct.
- **Related**: `alignment` on ToolbarToggleGroup is also wrongly mapped: `Rename from: alignment to: columnGap` (line 7441). The `alignment` prop should be removed, not renamed.

### WG-3: TC006 -- Banner.variant (score 0)

- **Rule**: `semver-...-banner-variant-removed`
- **Current strategy**: `RemoveProp component: Banner prop: variant`
- **Correct fix**: Replace `variant` with `color` (or `status`). E.g., `variant="warning" -> color="gold"` or `status="warning"`.
- **Root cause**: The rule only says "remove" -- it doesn't link to the replacement props. A separate rule (`banner-color-signature-changed-group-2`) knows about the new `color` and `status` props but they aren't connected.
- **Fix**: Change strategy to a value-mapping replacement. Both `color` and `status` are valid targets.

### WG-4: TC008 -- Button.isActive (score 0)

- **Rule**: `semver-...-button-isactive-removed`
- **Current strategy**: `RemoveProp component: Button prop: isActive`
- **Correct fix**: Rename `isActive` to `isClicked`
- **Root cause**: Analyzer detected the removal of `isActive` but didn't connect it to the addition of `isClicked`. The `isClicked` prop appears in `hamburgervariant-signature-changed-group-9` as a new addition, but there's no rename link.
- **Fix**: Change strategy to `Rename from: isActive to: isClicked` on Button.

### WG-5: TC021 -- DrawerContent colorVariant no-background (score 1)

- **Rule**: `sd-prop-value-drawercontent-colorvariant-no-background`
- **Current strategy**: `PropValueChange from: no-background` -- the `to` field is MISSING
- **Correct fix**: Replace `colorVariant='no-background'` with `colorVariant='primary'`
- **Fix**: Add `"to": "primary"` to the strategy entry.

### WG-6: TC066 -- PageSection variant light/dark (score 1)

- **Rule**: `sd-prop-value-pagesection-variant-light`
- **Current strategy**: `PropValueChange from: light, replacement: secondary`
- **Issues**: (a) Uses `replacement` field instead of standard `to` field. (b) Value is wrong: `light` should map to `default`, not `secondary`. `dark`/`darker` correctly map to `secondary`.
- **Fix**: Correct mapping: `light -> default`, keep `dark -> secondary`, `darker -> secondary`.

## 3. Priority Fixes -- Missing Rules

### MR-1: TC039 -- LogViewer CSS import path (score 0)

- **Missing**: No rule to update LogViewer CSS import from `@patternfly/react-core` dist to `@patternfly/react-log-viewer`.
- **What exists**: CSS class rename rules (`pf-v5-c-log-viewer -> pf-v6-c-log-viewer`) and dead-class warnings, but nothing for the import path change.
- **Needed**: `ImportPathChange` strategy for the CSS stylesheet path.

### MR-2: TC004 -- data-codemods cleanup (score 0)

- **Missing**: No rule for removing `data-codemods` attributes.
- **Mitigation**: Test design limitation per breaking-changes.json notes. Pre-placed `data-codemods` attributes may not be detectable. Consider marking N/A or scoring 2 (not 0) per the expected-outcome guidance.

### MR-3: TC025 -- Duplicate imports (score 0)

- **Missing**: No rule for de-duplicating import specifiers.
- **Mitigation**: Test design limitation -- TypeScript prevents actual duplicate imports. Should be marked N/A.

### MR-4: TC038 -- LogSnippet leftBorderVariant (score 2, partial)

- **Missing**: No rules for `@patternfly/react-component-groups` components. The semver analyzer only covers `@patternfly/react-core` packages.
- **Needed**: `Rename leftBorderVariant -> variant` on LogSnippet.
- **Note**: This partially succeeded via LLM knowledge (fragile).

### MR-5: TC050 -- MultiContentCard props (score 2, partial)

- **Missing**: Same package gap as TC038 -- no react-component-groups rules.
- **Needed**: `RemoveProp leftBorderVariant` and `RemoveProp withHeaderBorder` on MultiContentCard.

## 4. Priority Fixes -- Incomplete Correlations

The most common failure pattern: semver correctly detects the removal of an old prop AND the addition of its replacement, but the two rules are separate and unlinked.

### IC-1: TC005 -- Avatar.border -> isBordered (score 1)

- **Existing**: `RemoveProp component: Avatar prop: border` (line 32405 in fix-strategies.json)
- **Separate**: `Avatar.isBordered signature-changed` rule exists (line 11215)
- **Missing link**: No connection says `border -> isBordered`.
- **Fix**: Change RemoveProp to `Rename from: border to: isBordered`.

### IC-2: TC011 -- Checkbox.isLabelBeforeButton -> labelPosition (score 0)

- **Existing**: `RemoveProp component: Checkbox prop: isLabelBeforeButton`
- **Missing link**: No rule connects this to `labelPosition='start'`.
- **Fix**: Create mapping: remove `isLabelBeforeButton`, add `labelPosition='start'`.

### IC-3: TC029 -- FormFiledGroupHeaderTitleTextObject typo (score 0)

- **Existing rules**: `semver-formfiledgroupheadertitletextobject-component-import-deprecated` (strategy: LlmAssisted, no details) and `PropTypeChange from: FormFiledGroupHeaderTitleTextObject` (NO `to` value).
- **Missing**: Neither rule explicitly says "rename FormFiledGroupHeaderTitleTextObject to FormFieldGroupHeaderTitleTextObject" (fix the "Filed" typo to "Field").
- **Fix**: Add `Rename from: FormFiledGroupHeaderTitleTextObject to: FormFieldGroupHeaderTitleTextObject`.

### IC-4: TC084 -- ToolbarChipGroup/ToolbarChip interface rename (score 0)

- **Existing rules**: API rules correctly say "replace ToolbarChipGroup with ToolbarLabelGroup" in message text (lines 12580-12602 in API yaml).
- **Fix-strategy**: `semver-toolbarchip-component-import-deprecated` is just `LlmAssisted` with no specifics.
- **Missing**: No explicit `Rename` strategy connecting `ToolbarChipGroup -> ToolbarLabelGroup` and `ToolbarChip -> ToolbarLabel`.
- **Fix**: Add `Rename` strategies for both interfaces.

### IC-5: TC010 -- Card selectableActions (score 0)

- **Existing**: FamilyMigration for Card shows target_structure with selectableActions on CardHeader.
- **Missing**: No specific rule to remove selectableActions for basic clickable cards.
- **Fix**: Add `RemoveProp` for `CardHeader.selectableActions` with context about clickable card simplification.

### IC-6: TC053 -- NavItem hasNavLinkWrapper + icon (score 1)

- **Existing**: `RemoveProp component: NavItem prop: hasNavLinkWrapper` (line 10368)
- **Missing**: No rule to move icon children to the `icon` prop on NavItem.
- **Fix**: Add a `ChildToProp` strategy: `{ component: NavItem, childPattern: icon, targetProp: icon }`.

### IC-7: TC062 -- PageSection hasBodyWrapper (score 0)

- **Existing**: FamilyMigration for Page shows `hasBodyWrapper` on PageSection in target_structure.
- **Missing**: No explicit rule saying "add `hasBodyWrapper={false}` to PageSection".
- **Fix**: Add an `AddProp` strategy: `{ component: PageSection, prop: hasBodyWrapper, value: false }`.

### IC-8: TC044 -- Masthead structure wrapping (score 1)

- **Existing**: FamilyMigration for Masthead shows correct target_structure (MastheadMain wrapping MastheadToggle + MastheadBrand).
- **Issue**: The FamilyMigration is too complex for partial application. Tool renamed MastheadBrand->MastheadLogo but didn't complete the wrapping in MastheadMain.
- **Fix**: Break the FamilyMigration into smaller sequential steps, or add a dedicated `CompositionChange` rule for the MastheadMain wrapper.

### IC-9: TC040 -- LoginMainFooterLinksItem (score 1)

- **Existing**: FamilyMigration target_structure shows LoginMainFooterLinksItem but without Button children pattern detail.
- **Missing**: No `CompositionChange` strategy explaining that props should move to a Button child.
- **Fix**: Add explicit `CompositionChange` strategy with before/after code showing the prop-to-children migration.

## 5. Priority Fixes -- Strategy Gaps

### SG-1: TC007 -- Button icon to prop (score 0)

- **Vocabulary**: `ChildToProp` strategy exists (line 14772 in fix-strategies.json).
- **Missing**: No `ChildToProp` entry for Button's icon. Need: `{ strategy: ChildToProp, component: Button, childPattern: "icon element", targetProp: icon }`.

### SG-2: TC046 -- MenuToggle icon to prop (score 0)

- **Same gap as SG-1**: No `ChildToProp` entry for MenuToggle's icon.
- **Fix**: Add `{ strategy: ChildToProp, component: MenuToggle, childPattern: "icon element", targetProp: icon }`.

### SG-3: TC063 -- PageHeaderToolsItem isSelected (score 0)

- **Test design issue**: Test uses a placeholder div instead of the actual PageHeaderToolsItem component, making it undetectable by any static analysis tool.
- **Recommendation**: Redesign test case or mark N/A.

## 6. Rule Quality Issues

### RQ-1: TC001 -- AccordionContent.isHidden (score 1)

- **Rule**: `RemoveProp component: AccordionContent prop: isHidden`
- **Guidance**: fix-guidance says `strategy: find_alternative, confidence: low` with message "check the library's migration guide"
- **Issue**: Too vague. The fix is simply "remove isHidden -- visibility is now automatic based on AccordionItem's isExpanded".
- **Fix**: Update fix_description to state the specific behavior: no replacement needed.

### RQ-2: TC002 -- AccordionItem markup (score 1)

- **Issue**: Tool detected AccordionItem changes and made unnecessary partial modifications. The FamilyMigration for Accordion is too broad.
- **Fix**: Add explicit "no code change needed for AccordionItem markup changes" guidance.

### RQ-3: TC012/TC013 -- Chip deprecated + Chip to Label (scores 2, 1)

- **Existing**: `sd-deprecated-moved-chip-to-deprecated` with `LlmAssisted` strategy.
- **Issue**: TC012 moved Chip to deprecated (acceptable) but didn't guide toward preferred Label replacement. TC013 partially replaced but missed instances.
- **Fix**: Add explicit before/after examples showing complete Chip->Label and ChipGroup->LabelGroup replacement with prop mappings.

### RQ-4: TC019 -- DrawerHead hasNoPadding (score 1)

- **Rule**: `RemoveProp component: DrawerHead prop: hasNoPadding` (correct strategy)
- **Guidance**: fix-guidance says `find_alternative` with low confidence instead of "just remove it."
- **Fix**: Update fix_description: "Remove hasNoPadding from DrawerHead. No replacement is needed."

### RQ-5: TC022 -- DrawerHead panelbody markup (score 0)

- **Issue**: No code change needed (internal markup change) but the tool made incorrect modifications.
- **Fix**: Add "no code change needed" guidance for this internal markup change. Consider a `NoAction` strategy for markup-only changes.

### RQ-6: TC080/TC081 -- Tokens (scores 2, 1)

- **Rule**: `semver-patternfly-react-tokens-constant-removed-cssvariableprefix-combined` has `CssVariablePrefix` strategy but NO from/to mapping data at all (line 203-205 in fix-strategies.json).
- **Issue**: The combined rule is essentially empty -- strategy type declared but no mappings.
- **Fix**: Populate with actual token rename mappings (e.g., `global_spacer_md -> t_global_spacer_md` for TC080, `--pf-v5-* -> --pf-v6-*` for TC081).

## 7. Tool Behavior Issues

### TB-1: TC067 -- PageSection variant type behavioral change (score 0)

- Rule correctly identifies that variant classes only apply when type is 'default'. Tool made incorrect changes to a file that needed no modification. Tool should distinguish behavioral changes from code-requiring changes.

### TB-2: TC079 -- Tile deprecated (score 1)

- Rules exist for deprecated import move and Card replacement. Tool attempted migration but produced incomplete output. Investigate tool's handling of the deprecated->Card replacement path.

### TB-3: TC036 -- KebabToggle (score 2)

- Rules exist (with specific migration message). Tool partially succeeded, replacing with MenuToggle but not fully idiomatic. LLM partially compensated for vague rule quality.

### TB-4: TC070 -- Popper appendTo (score 2)

- Behavioral change that needs no code changes in most cases. Tool partially addressed but implementation not fully idiomatic.

## 8. Validated Rules (49 correct, score 3)

TC003, TC009, TC014, TC015, TC017, TC018, TC020, TC023, TC024, TC026, TC027, TC028, TC030, TC031, TC032, TC033, TC034, TC035, TC042, TC043, TC045, TC047, TC048, TC049, TC051, TC052, TC054, TC055, TC056, TC057, TC058, TC059, TC060, TC061, TC064, TC065, TC068, TC069, TC071, TC072, TC073, TC074, TC075, TC076, TC077, TC078, TC083, TC085.

**Note**: TC015, TC028, TC033, TC034, TC047, TC054 succeed via LLM general knowledge (no semver rules from react-component-groups). These are fragile successes that could regress.

## 9. Actionable Summary

### Tier 1: Fix 6 wrong guidance entries (direct score improvement: ~18 points)

| # | ruleID pattern | Current | Correct | Test cases |
|---|---|---|---|---|
| 1 | label-isoverflowlabel-renamed | Rename to isClickable | PropValueChange: variant='overflow' | TC037 |
| 2 | button-isactive-removed | RemoveProp | Rename to isClicked | TC008 |
| 3 | banner-variant-removed | RemoveProp | PropReplace: variant->color with value map | TC006 |
| 4 | toolbar-usepageinsets-renamed | Rename to hasNoPadding | RemoveProp | TC082 |
| 5 | drawercontent-colorvariant-no-background | PropValueChange (no `to`) | Add `to: "primary"` | TC021 |
| 6 | pagesection-variant-light | PropValueChange light->secondary | light->default | TC066 |

### Tier 2: Connect 9 incomplete correlations (~15 points)

1. Avatar.border -> isBordered (TC005)
2. Checkbox.isLabelBeforeButton -> labelPosition='start' (TC011)
3. FormFiledGroupHeaderTitleTextObject -> FormFieldGroupHeaderTitleTextObject (TC029)
4. ToolbarChipGroup -> ToolbarLabelGroup, ToolbarChip -> ToolbarLabel (TC084)
5. Card selectableActions removal (TC010)
6. NavItem hasNavLinkWrapper + icon prop (TC053)
7. PageSection hasBodyWrapper={false} (TC062)
8. Masthead MastheadMain wrapping (TC044)
9. LoginMainFooterLinksItem Button children (TC040)

### Tier 3: Add 2 ChildToProp strategies (6 points)

1. Button icon (TC007)
2. MenuToggle icon (TC046)

### Tier 4: Add 3 missing rules (4 points)

1. LogViewer CSS import path (TC039)
2. LogSnippet leftBorderVariant -> variant (TC038)
3. MultiContentCard props removal (TC050)

### Tier 5: Fix 6 rule quality issues (~8 points)

1. AccordionContent.isHidden -- replace vague "find_alternative" with "just remove" (TC001)
2. AccordionItem markup -- add "no code change needed" (TC002)
3. Chip deprecated -- add Label/LabelGroup replacement examples (TC012, TC013)
4. DrawerHead.hasNoPadding -- "just remove, no replacement" (TC019)
5. DrawerHead panelbody -- "no code change needed" (TC022)
6. Tokens combined rule -- populate from/to mappings (TC080, TC081)

### Tier 6: Redesign 3 test cases

1. TC004 (data-codemods) -- mark N/A or adjust expected score
2. TC025 (duplicate imports) -- mark N/A
3. TC063 (PageHeaderToolsItem) -- uses placeholder div, undetectable

### Impact estimate

If Tiers 1-3 are implemented:
- Projected correct: ~63 (up from 49)
- Projected partial: ~10 (down from 19)
- Projected wrong: ~12 (down from 17)
- "Worse than codemods" should drop from 27 to ~14
