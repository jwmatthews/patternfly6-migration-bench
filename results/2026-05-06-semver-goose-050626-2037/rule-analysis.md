# Rule Analysis Report

**Results directory:** `results/2026-05-06-semver-goose-050626-2037`
**Run date:** 2026-05-06

## 1. Summary by Root Cause

| Root Cause | Count | % | Description |
|------------|-------|---|-------------|
| correct | 45 | 53% | Rules and tool both work |
| incomplete_correlation | 8 | 9% | Related rules exist but aren't connected |
| wrong_guidance | 8 | 9% | Fix guidance maps to incorrect target |
| missing_rule | 8 | 9% | No rule or fix-strategy exists |
| rule_quality | 5 | 6% | Rule too vague for LLM to act on |
| tool_behavior | 3 | 4% | Rule correct, tool didn't follow |
| test_design | 8 | 9% | Test case limitation (scores 0-3 regardless) |

**Note on "correct" with missing rules:** Several test cases scored 3 despite having NO semver rules (TC015, TC017, TC028, TC033, TC034, TC038, TC047, TC054). These succeeded through LLM general knowledge of PF6 changes — fragile successes that could regress if the LLM lacks domain knowledge.

## 2. Priority Fixes — Wrong Guidance (8 cases)

These are the highest-priority fixes because the rules actively cause incorrect output.

### TC037 — Label.isOverflowLabel (score 0)
- **Rule:** `semver-...-label-isoverflowlabel-renamed`
- **Current:** Rename strategy maps isOverflowLabel → isClickable
- **Correct:** isOverflowLabel → variant='overflow' (boolean prop becomes variant enum value)
- **Root cause:** Semver analyzer saw isOverflowLabel removed + isClickable added and naively mapped as rename
- **Fix:** Change strategy from Rename(to=isClickable) to PropToVariant mapping: isOverflowLabel={true} → variant='overflow'

### TC082 — Toolbar.usePageInsets (score 0)
- **Rule:** `semver-...-toolbar-usepageinsets-renamed`
- **Current:** Rename strategy maps usePageInsets → hasNoPadding
- **Correct:** usePageInsets should simply be removed (no replacement exists)
- **Root cause:** Semver analyzer misidentified a removal as a rename
- **Fix:** Reclassify as RemoveProp. Fix-guidance should say "Remove the usePageInsets prop"

### TC066/TC067 — PageSection.variant light→secondary (scores 1, 2)
- **Rules:** `sd-prop-value-pagesection-variant-light`, `sd-prop-value-pagesection-variant-dark`
- **Current:** Maps light→secondary, dark→secondary
- **Correct:** light→default (or remove variant), dark→secondary, darker→secondary
- **Fix:** Correct the light mapping to 'default'. The 'light' variant was the previous default appearance.

### TC021 — DrawerContent.colorVariant no-background (score 1)
- **Rule:** `sd-prop-value-drawercontent-colorvariant-no-background`
- **Current:** PropValueChange strategy has NO replacement value
- **Correct:** no-background → primary
- **Fix:** Add `"replacement": "primary"` to the strategy entry

### TC019/TC022 — Drawer family target_structure too prescriptive (scores 2, 0)
- **Rule:** `family:Drawer` FamilyMigration target_structure
- **Current:** Every DrawerHead in target_structure includes DrawerActions + DrawerCloseButton children
- **Correct:** DrawerActions/DrawerCloseButton are optional, only present when the original code had them
- **Fix:** Annotate optional vs required children in the target_structure, or add guard logic: "Do not add new child components unless present in original"

### TC016 — DataListAction.isPlainButtonAction (score 1)
- **Rule:** `family:DataList` target_structure + `find_alternative` guidance
- **Current:** find_alternative with low confidence + prescriptive family structure causes tool to restructure beyond needed
- **Fix:** Use explicit RemoveProp with guidance: "Simply remove isPlainButtonAction; no replacement needed"

### TC085 — Toolbar spacer→gap overgeneralization (score 2)
- **Rules:** `semver-...-toolbaritem-spacer-renamed`, `semver-...-toolbargroup-spacer-renamed`, `semver-...-toolbartogglegroup-spacer-renamed`
- **Current:** All three map spacer→gap uniformly
- **Correct:** ToolbarGroup/ToolbarToggleGroup: spacer→gap. ToolbarItem: spacer removed (no gap prop exists)
- **Fix:** Reclassify ToolbarItem.spacer as RemoveProp, not Rename

## 3. Priority Fixes — Missing Rules (8 cases)

### Children-to-prop pattern (TC007, TC046)
- **Components:** Button, MenuToggle
- **Need:** Rules detecting icon elements as JSX children and generating guidance to move them to the `icon` prop
- **Strategy needed:** ChildToProp (exists in vocabulary but no rules use it for these components)
- **Impact:** 2 score-0 cases

### CSS custom property name renames (TC072, TC078)
- **Components:** Slider, Th (table sticky column)
- **Need:** Rules mapping `--Left` → `--InsetInlineStart`, `--Right` → `--InsetInlineEnd`
- **Strategy needed:** CssVariableRename (not just prefix change)
- **Note:** JS token rename data already has correct mappings — auto-generate CSS property rules from it
- **Impact:** 2 score-1 cases

### Card selectableActions simplification (TC010)
- **Component:** CardHeader.selectableActions
- **Need:** Pattern rule that detects when selectableActions can be simplified for basic clickable cards
- **Impact:** 1 score-0 case

### data-codemods cleanup (TC004)
- **Not actionable** — this is a pf-codemods artifact, not a library API change. Score 2 is expected.

### Duplicate imports (TC025)
- **Not actionable** — test case design limitation (TypeScript prevents actual duplicate imports)

### @patternfly/react-component-groups coverage
- **Components missing:** ContentHeader, ErrorState, InvalidObject, LogSnippet, MultiContentCard, NotAuthorized
- **Currently:** All succeed via LLM knowledge (fragile)
- **Fix:** Extend semver-analyzer to cover this package
- **Impact:** 6+ test cases currently passing on LLM knowledge alone

## 4. Priority Fixes — Incomplete Correlations (8 cases)

The most common failure pattern: semver correctly detects BOTH the removal of an old prop AND the addition of its replacement, but they exist as separate, unlinked rules.

| TC | Old Prop (Remove rule) | New Prop (Add rule) | Needed Link |
|----|----------------------|---------------------|-------------|
| TC005 | Avatar.border removed | Avatar.isBordered added | border='dark' → isBordered={true} |
| TC006 | Banner.variant removed | Banner.color added | variant='gold' → color='yellow', etc. |
| TC008 | Button.isActive removed | Button.isClicked added | isActive → isClicked (rename) |
| TC011 | Checkbox.isLabelBeforeButton removed | Checkbox.labelPosition added | isLabelBeforeButton={true} → labelPosition='start' |
| TC002 | AccordionToggle.isExpanded removed | AccordionItem.isExpanded added | Move prop from child to parent |
| TC053 | NavItem.hasNavLinkWrapper removed | NavItem.icon added | Remove wrapper, move icon to prop |
| TC044 | MastheadToggle position change | MastheadMain wrapping required | MastheadToggle must be child of MastheadMain |
| TC079 | Tile removed | Card replacement | Tile props don't map 1:1 to Card props |

**Recommended fix:** Add a `RenameProp` or `MoveProp` strategy type that explicitly links prop removals to prop additions. For TC005, TC006, TC008, TC011 — these are direct renames with optional value mapping. For TC002, TC044 — these are structural moves needing a `MoveToParent` pattern.

## 5. Priority Fixes — Strategy Gaps

### PropToVariant
- **Need:** Strategy for boolean prop → variant enum value
- **Example:** Label.isOverflowLabel={true} → variant='overflow'
- **Current:** Incorrectly modeled as Rename

### MovesProp / PropRelocation
- **Need:** Strategy linking prop removal on one component to prop addition on another
- **Example:** AccordionToggle.isExpanded → AccordionItem.isExpanded
- **Current:** Two disconnected rules (RemoveProp + PropTypeChange)

### ComponentReplacement (with prop mapping)
- **Need:** Strategy that renames a component AND maps its props
- **Example:** Chip→Label with onClick→onClose, plus variant='outline'
- **Current:** Component rename exists but prop-level differences are not captured

## 6. Rule Quality Issues (5 cases)

| TC | Component | Issue | Fix |
|----|-----------|-------|-----|
| TC013 | Chip→Label | Component rename rule lacks prop mapping (onClick→onClose) | Add prop mappings to component replacement |
| TC036 | KebabToggle | "Significant breaking changes" with no specific replacement pattern | Add: "Replace with MenuToggle variant='plain' + EllipsisVIcon" |
| TC040 | LoginMainFooterLinksItem | "4 of 6 props removed" with no target structure | Add: "Children should use Button with component='a'" |
| TC084 | ToolbarChipGroup | manual_review instead of explicit rename | Upgrade to Rename: ToolbarChipGroup→ToolbarLabelGroup |
| TC062 | PageSection.hasBodyWrapper | PropTypeChange says "update call sites" without explaining when to add hasBodyWrapper={false} | Add explicit guidance about opting out of body wrapper |

## 7. Tool Behavior Issues (3 cases)

| TC | Score | Issue |
|----|-------|-------|
| TC049 | 2 | Modal /next — tool restructured beyond what was needed (imports already correct) |
| TC050 | 2 | MultiContentCard — tool replaced withHeaderBorder with withDividers (no rule exists; LLM guessed wrong) |
| TC070 | 2 | Popper appendTo — tool did full Select migration instead of no-op |

These are cases where the tool over-applied or guessed incorrectly. No rule changes needed.

## 8. Validated Rules (45 cases)

These rules and strategies work correctly:

**RemoveProp (simple removals):** TC001 (AccordionContent.isHidden), TC031 (HelperTextItem.hasIcon/isDynamic), TC043 (Masthead.backgroundColor), TC052 (Nav.theme), TC068 (PageSidebar.theme), TC073 (Switch.labelOff)

**Rename/PropValueChange:** TC003 (AccordionToggle.isExpanded→AccordionItem), TC014 (color cyan→teal, gold→yellow), TC020 (colorVariant light-200→secondary), TC030 (FormGroup.labelIcon→labelHelp), TC051 (Nav variant tertiary→horizontal-subnav), TC057-TC060 (Page prop renames), TC074 (Tabs isSecondary→isSubtab), TC075 (Tabs variant light300→secondary), TC083 (Toolbar chip→label renames)

**FamilyMigration/Composition:** TC009 (Card raised props), TC026-TC027 (EmptyState restructure), TC042 (Masthead brand/logo), TC064 (PageNavigation removal), TC077 (Text→Content)

**LlmAssisted (complex migrations):** TC017 (deprecated Dropdown→new API), TC023 (DualListSelector deprecated), TC048 (Modal→new API), TC018 (DragDrop deprecated)

**No changes needed (correctly left unchanged):** TC032, TC035, TC039, TC041, TC045, TC055, TC056, TC061, TC069, TC071, TC076

**Succeeded via LLM knowledge (no rules):** TC015, TC028, TC033, TC034, TC038, TC047, TC054, TC080

## 9. Actionable Summary

### Tier 1: Fix wrong guidance (8 cases, direct impact)
1. **Fix Label.isOverflowLabel mapping** — change from Rename(isClickable) to variant='overflow' (TC037, score 0→3)
2. **Fix Toolbar.usePageInsets** — change from Rename(hasNoPadding) to RemoveProp (TC082, score 0→3)
3. **Fix PageSection.variant light mapping** — light→default not secondary (TC066 score 1→3, TC067 score 2→3)
4. **Add DrawerContent colorVariant no-background replacement** — add "primary" (TC021, score 1→3)
5. **Fix Drawer family target_structure** — mark DrawerActions/DrawerCloseButton as optional (TC019 score 2→3, TC022 score 0→3)
6. **Fix ToolbarItem.spacer** — reclassify as RemoveProp not Rename(gap) (TC085, score 2→3)
7. **Fix DataListAction guidance** — use RemoveProp instead of find_alternative (TC016, score 1→3)

### Tier 2: Link incomplete correlations (8 cases)
8. **Create RenameProp links** for: Avatar.border→isBordered, Banner.variant→color, Button.isActive→isClicked, Checkbox.isLabelBeforeButton→labelPosition (TC005/TC006/TC008/TC011)
9. **Create MoveProp links** for: AccordionToggle.isExpanded→AccordionItem, MastheadToggle→MastheadMain (TC002/TC044)
10. **Add Tile→Card prop mapping** (TC079)
11. **Link NavItem.hasNavLinkWrapper removal to icon prop** (TC053)

### Tier 3: Add missing rules (4 cases with real impact)
12. **Add ChildToProp rules** for Button.icon and MenuToggle.icon (TC007/TC046, both score 0)
13. **Add CSS property name rename rules** from existing JS token data (TC072/TC078)

### Tier 4: Improve rule quality (5 cases)
14. **Add prop mappings to Chip→Label** replacement (TC013)
15. **Add specific replacement patterns** to KebabToggle, LoginMainFooterLinksItem, ToolbarChipGroup, PageSection.hasBodyWrapper rules (TC036/TC040/TC084/TC062)

### Tier 5: Extend coverage
16. **Add @patternfly/react-component-groups** to semver-analyzer (6+ test cases currently relying on LLM knowledge)

**Estimated impact of Tiers 1-3:** +22 points across 20 test cases, bringing projected score from 50/85 to ~60/85 correct.
