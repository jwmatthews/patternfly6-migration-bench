# Semver-Analyzer Capability Corrections

This document identifies inaccuracies in an external description of semver-analyzer's capabilities and provides instructions for correction.

## Original Text Under Review

The text describes what semver-analyzer "does" and "cannot detect." The "does" section is accurate but incomplete. The "cannot detect" section is mostly wrong.

---

## Section 1: "What semver-analyzer does"

### Correction: Scope is understated

The original text says the analyzer works by "diffing the TypeScript declarations (.d.ts files)." This only describes the TD (Top-Down) pipeline. The analyzer has three pipelines:

- **TD pipeline**: Diffs `.d.ts` API surfaces (what the original text describes)
- **SD pipeline**: Deterministic AST-based analysis of `.tsx` source files — detects DOM changes, ARIA attributes, composition trees, CSS usage, prop defaults, and more
- **BU pipeline**: Optional LLM-based behavioral analysis via `--behavioral` flag

**Action**: Replace the opening sentence:

> The semver-analyzer generates migration rules by diffing the TypeScript declarations (.d.ts files) between PF5 and PF6 packages.

With:

> The semver-analyzer generates migration rules by comparing PF5 and PF6 packages across three pipelines: structural API diffing of `.d.ts` declarations (TD), deterministic source-level analysis of `.tsx` files for DOM, accessibility, composition, and CSS changes (SD), and optional LLM-based behavioral analysis (BU).

### Bullet points in "What it does"

The five existing bullets (removed/renamed exports, CSS variables, CSS classes, dependencies) are all correct. Add the following to reflect SD pipeline capabilities:

- DOM structure changes (root element, wrapper element, rendered HTML tags)
- ARIA attribute additions, removals, and changes
- OUIA data-attribute changes (e.g. `data-ouia-component-type`)
- Role attribute changes
- Component composition tree changes (parent-child relationships, edge strength)
- Prop default value changes
- Portal usage changes (`createPortal` added/removed)
- Context dependency changes (`useContext` added/removed)
- `forwardRef` and `memo` wrapper changes
- Conformance rule generation from composition edges

---

## Section 2: "What it cannot detect"

### Item 1: "Behavioral changes (how components render differently at runtime)"

**Verdict**: False. Remove or heavily qualify.

**Evidence**: The SD pipeline in `crates/ts/src/sd_pipeline.rs` detects many behavioral changes deterministically:
- Rendered elements and components (`rendered_elements`, `rendered_components` fields in `ComponentSourceProfile`)
- Portal usage changes
- Context dependency changes
- Prop default changes
- forwardRef/memo wrapper changes

The BU pipeline (`crates/llm/`) adds LLM-based behavioral analysis when `--behavioral` is passed.

**Action**: Replace with:

> Some dynamic behavioral changes that depend on internal state logic, computed props, or timing — where the change is not visible in the JSX AST or type signatures.

### Item 2: "Markup/DOM structure changes (internal component DOM tree changes)"

**Verdict**: False. Remove.

**Evidence**: `crates/ts/src/jsx_diff/mod.rs` diffs JSX render output. `ComponentSourceProfile` tracks `rendered_elements: BTreeMap<String, u32>` and `rendered_components: Vec<RenderedComponent>`. Changes are categorized under `SourceLevelCategory::DomStructure` and `SourceLevelCategory::RenderOutput`.

**Action**: Remove this bullet entirely. If a qualified version is needed:

> Deeply conditional DOM changes where element selection depends on runtime state that cannot be statically determined from the JSX AST.

### Item 3: "Prop value semantic changes where the type signature didn't change"

**Verdict**: True. Keep as-is.

**Evidence**: `crates/core/src/diff/compare.rs` performs structural type comparison only. If `variant: "primary" | "secondary"` keeps the same union type but the meaning of `"primary"` changes, the analyzer cannot detect that.

**Action**: No change needed.

### Item 4: "Changes that require understanding component composition patterns"

**Verdict**: False. Remove.

**Evidence**: `crates/ts/src/composition/mod.rs` builds full composition trees using family member identification, children slot tracing, BEM token analysis, rendered components, CSS structure, React context patterns, DOM nesting, and `cloneElement` threading. `EdgeStrength` (Allowed/Structural/Wrapper/Required) drives conformance rule generation. Composition changes are tracked via `CompositionChange`.

**Action**: Remove this bullet entirely. If a qualified version is needed:

> Implicit composition contracts that are not encoded in the source — for example, when a consumer is expected to nest components in a specific order but the library enforces this only through documentation, not code.

### Item 5: "Changes visible only in the rendered output (OUIA attributes, aria attributes, wrapper elements)"

**Verdict**: False. Remove.

**Evidence**: `ComponentSourceProfile` has dedicated fields:
- `aria_attributes: TrackedAttributes<(String, String)>`
- `role_attributes: TrackedAttributes<String>`
- `data_attributes: TrackedAttributes<(String, String)>` (covers OUIA)
- `rendered_elements: BTreeMap<String, u32>` (covers wrapper elements)

Dedicated diff functions exist: `diff_aria_attributes()`, `diff_role_attributes()`, `diff_data_attributes()`. Tests confirm detection (e.g. `baseline_aria_labelledby_changed`, OUIA component type changes).

**Action**: Remove this bullet entirely.

---

## Corrected Version (complete replacement)

### What semver-analyzer does

The semver-analyzer generates migration rules by comparing PF5 and PF6 packages across three pipelines: structural API diffing of `.d.ts` declarations (TD), deterministic source-level analysis of `.tsx` files for DOM, accessibility, composition, and CSS changes (SD), and optional LLM-based behavioral analysis (BU). It detects:

- Removed/renamed exports, props, interfaces, types, enums
- CSS variable renames (by comparing CSS custom property lists)
- CSS class renames (by comparing generated CSS class names)
- Dependency/peer-dependency changes (by comparing package.json)
- DOM structure changes (root elements, wrapper elements, rendered HTML tags)
- ARIA, role, and OUIA data-attribute changes
- Component composition tree changes (parent-child relationships, edge strength, conformance rules)
- Prop default value changes
- Portal, context, forwardRef, and memo usage changes

### What it cannot detect

- Prop value semantic changes where the type signature didn't change
- Dynamic behavioral changes that depend on runtime state, computed props, or timing not visible in the JSX AST
- Implicit composition contracts enforced only through documentation, not code
