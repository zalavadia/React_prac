// ============================================================================
// 34 — React 19 ref as prop (forwardRef legacy)
// Level: REACT19  |  Study in order: read this file first, then the next number
// ============================================================================
//
// SIMPLE: Before, ref was special — it did not come through props.
// So you had to write forwardRef(function (props, ref) { ... }).
//
// React 19: ref is a normal prop — function Component({ ref, ... }) {
//   return <input ref={ref} />
// }
//
// forwardRef still works (libraries / old code) — in new code
// you usually do not need it. Class components are a separate history.
//
// WHY: Less boilerplate; mid interviews now ask "why did forwardRef exist?" for context.
// INTERVIEW: ref prop vs forwardRef; callback refs; useImperativeHandle.
//
// ============================================================================

import { useRef, useEffect, useImperativeHandle, forwardRef } from "react";

// -----------------------------------------------------------------------------
// Q1: React 19 style — ref as prop
//
// In simple words:
// Parent <Input ref={inputRef} />.
// Child gets ref in function params — forward to DOM.
// -----------------------------------------------------------------------------
function Input({ ref, placeholder }) {
  return <input ref={ref} placeholder={placeholder} />;
}

export function FocusDemo() {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return <Input ref={inputRef} placeholder="Auto focus" />;
}

// -----------------------------------------------------------------------------
// Q2: Old forwardRef (legacy / library compat)
//
// In simple words:
// Same behavior, extra wrap.
// In new projects, prefer ref prop.
// You may still see forwardRef for older library support.
// -----------------------------------------------------------------------------
const LegacyInput = forwardRef(function LegacyInput(props, ref) {
  return <input ref={ref} {...props} />;
});

export function LegacyFocusDemo() {
  const ref = useRef(null);
  return <LegacyInput ref={ref} placeholder="Legacy forwardRef" />;
}

// -----------------------------------------------------------------------------
// Q3: [MID] ref on function component without forwardRef / without prop?
//
// In simple words:
// React 18 gave warning / ignore — ref did not come through props.
// React 19 passes it through. Be clear about version in interviews.
// -----------------------------------------------------------------------------
const versionNote = {
  react18: "need forwardRef to pass ref to function components",
  react19: "ref is a regular prop",
};

// -----------------------------------------------------------------------------
// Q4: Callback ref
//
// In simple words:
// ref={(node) => { ... }} — node on mount, null on unmount.
// For measuring DOM / third-party attach.
// -----------------------------------------------------------------------------
export function CallbackRefMeasure() {
  return (
    <div
      ref={(node) => {
        if (node) {
          console.log("width", node.getBoundingClientRect().width);
        }
      }}
    >
      Measure me
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q5: [MID] useImperativeHandle — limited API for parent
//
// In simple words:
// Sometimes parent does not need the whole DOM — only focus() / scrollTo().
// useImperativeHandle(ref, () => ({ focus() { ... } }))
// React 19: ref prop + useImperativeHandle combo.
// -----------------------------------------------------------------------------
function FancyInput({ ref }) {
  const inner = useRef(null);
  useImperativeHandle(ref, () => ({
    focus: () => inner.current?.focus(),
    clear: () => {
      if (inner.current) inner.current.value = "";
    },
  }));
  return <input ref={inner} />;
}

export function ImperativeParent() {
  const api = useRef(null);
  return (
    <div>
      <FancyInput ref={api} />
      <button onClick={() => api.current?.focus()}>Focus</button>
      <button onClick={() => api.current?.clear()}>Clear</button>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q6: Multiple refs merge idea
//
// In simple words:
// Library also needs ref + parent also — set both in callback.
// Or a tiny setRefs helper.
// -----------------------------------------------------------------------------
function setRefs(...refs) {
  return (node) => {
    for (const r of refs) {
      if (typeof r === "function") r(node);
      else if (r) r.current = node;
    }
  };
}

export function MergeRefsDemo() {
  const a = useRef(null);
  const b = useRef(null);
  return <input ref={setRefs(a, b)} />;
}

// -----------------------------------------------------------------------------
// Q7: ref on custom component — what does it point to?
//
// In simple words:
// Until the child attaches ref to DOM (or imperative handle),
// parent.current is null / useless.
// Document: "this component forwards ref to the input".
// -----------------------------------------------------------------------------
function Broken({ ref }) {
  // accepted ref but did not attach anywhere ❌
  return <input />;
}

function Fixed({ ref }) {
  return <input ref={ref} />; // ✅
}

// -----------------------------------------------------------------------------
// Q8: [MID] Interview closer
//
// In simple words:
// "In React 19 forwardRef is mostly legacy; ref prop is standard.
// useImperativeHandle as a controlled escape hatch.
// Ref updates commit phase — do not read ref.current during render for logic."
// -----------------------------------------------------------------------------
const closer =
  "ref as prop in 19; forwardRef legacy; don't read ref during render for data flow.";

// -----------------------------------------------------------------------------
// Q9: ref prop name collision — 'ref' reserved feel
//
// Task:
// Name the prop ref carefully — for DOM ref forward; use inputRef for other data.
//
// In simple words:
// In React 19 ref behaves like a special prop slot — forward to DOM.
// If product code needed ref="something" string — rename (conflict rare).
// React 18 forwardRef used a separate param — less collision.
// TypeScript: ComponentPropsWithRef types update in @types/react 19.
// -----------------------------------------------------------------------------
function LabeledInput({ ref, label }) {
  return (
    <label>
      {label}
      <input ref={ref} />
    </label>
  );
}

export function RefPropLabelDemo() {
  const r = useRef(null);
  return <LabeledInput ref={r} label="Email" />;
}

// -----------------------------------------------------------------------------
// Q10: [MID] TypeScript ref prop typing sketch
//
// Task:
// ref in Props?: Ref<HTMLInputElement> — @types/react 19 helpers.
//
// In simple words:
// forwardRef generic types are now optional in simpler components.
// React 18: ForwardRefRenderFunction boilerplate types.
// Migration: remove forwardRef wrapper first, keep ref in props interface.
// Libraries publish both patterns during transition.
// -----------------------------------------------------------------------------
const tsRefNote =
  "React 19 types: ref on props directly; Ref<T> on function component props.";

// -----------------------------------------------------------------------------
// Q11: ref null on unmount — callback ref
//
// Task:
// ref={(node) => { ... }} — node is null on unmount.
//
// In simple words:
// Clean up measure listeners when node is null.
// React 18/19 same callback ref semantics.
// useImperativeHandle parent ref stable — inner unmount separate lifecycle.
// Trap: inline ref callback is new every render — re-runs attach/detach; stabilize with useCallback.
// -----------------------------------------------------------------------------
export function CallbackRefCleanup() {
  return (
    <div
      ref={(node) => {
        if (node) {
          node.dataset.mounted = "1";
        }
      }}
    >
      Callback ref mount marker
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q12: [MID] forwardRef migration steps
//
// Task:
// 1) remove forwardRef 2) take ref in props 3) update test snapshots.
//
// In simple words:
// const X = forwardRef(fn) → function X({ ref, ...props }).
// React 18 lib consumers still pass ref — 19 native prop accepts.
// Deprecation warnings 18.3 — forwardRef still works 19.
// When NOT migrate yet: peer dep libs expecting forwardRef displayName hacks.
// -----------------------------------------------------------------------------
const forwardRefMigration = [
  "unwrap forwardRef to plain function",
  "add ref to destructured props",
  "forward ref to DOM or useImperativeHandle",
  "keep forwardRef temporarily if lib API requires",
];

// -----------------------------------------------------------------------------
// Q13: ref to class component — unchanged
//
// Task:
// On class components ref = instance; function ref prop change does not affect them.
//
// In simple words:
// React 19 ref-as-prop = DX win for function components.
// Class createRef/useRef attach instance — same as 18.
// Mixed codebase: class leaf + function wrapper patterns coexist.
// New code: function + ref prop preferred.
// -----------------------------------------------------------------------------
export function ClassRefNote() {
  return <p>Class component refs still point to class instance — unchanged in 19.</p>;
}

// -----------------------------------------------------------------------------
// Q14: [ADV] useImperativeHandle + ref prop together
//
// Task:
// FancyInput({ ref }) { useImperativeHandle(ref, () => ({ focus })); ... }
//
// In simple words:
// Limited API for parent — encapsulation.
// React 18 forwardRef + useImperativeHandle classic pair.
// React 19: ref prop replaces forwardRef only — imperative handle same.
// Do not expose entire DOM unless needed — maintenance boundary.
// Return object stable-ish — new object each call usually OK for handles.
// -----------------------------------------------------------------------------
function Meter({ ref }) {
  const inner = useRef(null);
  useImperativeHandle(ref, () => ({
    fill: (pct) => {
      if (inner.current) inner.current.style.width = pct + "%";
    },
  }));
  return <div ref={inner} style={{ height: 8, background: "#eee", width: "100%" }} />;
}

export function MeterParent() {
  const api = useRef(null);
  return (
    <div>
      <Meter ref={api} />
      <button type="button" onClick={() => api.current?.fill(75)}>
        75%
      </button>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q15: [MID] Reading ref.current during render — trap
//
// Task:
// in render if (ref.current) width = ... ❌ — layout flicker / rules.
//
// In simple words:
// Ref updates after commit — do not read in render phase for UI logic.
// React 18 same rule — ref not reactive state.
// Measure: useLayoutEffect or callback ref.
// Compiler doesn't make ref.current reactive — still imperative escape hatch.
// -----------------------------------------------------------------------------
export function NoRefDuringRender() {
  const divRef = useRef(null);
  // ❌ const w = divRef.current?.offsetWidth during render for display
  useEffect(() => {
    if (divRef.current) console.log("width after commit", divRef.current.offsetWidth);
  }, []);
  return <div ref={divRef}>Measure in effect</div>;
}

// -----------------------------------------------------------------------------
// Q16: Third-party lib mergeRefs
//
// Task:
// Lib internal ref + parent ref — setRefs helper (Q6) or mergeRefs util.
//
// In simple words:
// react-merge-refs package common in libs.
// React 19 ref prop parent side same merge need.
// React 18 forwardRef libs often merge inside.
// Trap: overwrite ref — last writer wins without merge.
// -----------------------------------------------------------------------------
export function LibMergeRefsDemo() {
  const parentRef = useRef(null);
  const libRef = useRef(null);
  return <input ref={setRefs(parentRef, libRef)} placeholder="merged" />;
}

// -----------------------------------------------------------------------------
// Q17: [MID] ref on composite component — document contract
//
// Task:
// JSDoc: "@param ref forwarded to underlying <input />"
//
// In simple words:
// Broken component Q7 — accept ref but no attach = bug.
// Design systems explicit: RefForwardedInput exports type.
// React 18 forwardRef displayName for DevTools — ref prop components name function.
// Testing: parent ref.current focus() integration test.
// -----------------------------------------------------------------------------
function DocumentedInput({ ref, ...rest }) {
  return <input ref={ref} {...rest} />;
}

export function DocumentedParent() {
  const r = useRef(null);
  return <DocumentedInput ref={r} aria-label="documented" />;
}

// -----------------------------------------------------------------------------
// Q18: String ref legacy — don't use
//
// Task:
// ref="myRef" string refs removed long ago — useRef/createRef only.
//
// In simple words:
// React 19 assumes modern ref API.
// React 18 already no string refs.
// Interview historical: string refs old class era.
// Callback ref + useRef cover all cases.
// -----------------------------------------------------------------------------
const stringRefNote = "String refs dead — useRef or callback ref only.";

// -----------------------------------------------------------------------------
// Q19: [ADV] When NOT ref — state/props instead
//
// Task:
// Do not abuse ref to read child value — lift state up.
//
// In simple words:
// ref = imperative DOM/focus/scroll/measure — not data flow.
// React 18 same anti-pattern.
// Form values: controlled state or FormData submit — scraping ref.current.value is fragile.
// Parent needs text → value/onChange props.
// -----------------------------------------------------------------------------
export function PreferStateOverRef() {
  const [text, setText] = useState("");
  return (
    <input value={text} onChange={(e) => setText(e.target.value)} />
  );
}

// -----------------------------------------------------------------------------
// Q20: [MID] Server Components — refs client-only
//
// Task:
// Component using ref should be 'use client'.
//
// In simple words:
// Ref is meaningless in Server Component — no DOM instance with same client-side lifecycle.
// Pass ref to client child that wraps DOM element.
// React 18 CSR everything client — RSC split is a new concern.
// Pattern: Server layout + Client input with ref for focus trap.
// -----------------------------------------------------------------------------
const rscRefNote = "Refs attach in client components; server components don't use refs on DOM.";

// -----------------------------------------------------------------------------
// Q21: [ADV] Compiler + ref prop
//
// Task:
// Compiler may optimize ref prop pass-through — still do not read during render.
//
// In simple words:
// Simple forward ref components may be memoized automatically.
// Be careful with useImperativeHandle deps — stale inner ref if deps wrong.
// React 18 manual memo on forwardRef components was common.
// Rules of React purity still apply.
// -----------------------------------------------------------------------------
export function CompilerRefNote() {
  return <p>Compiler may memoize ref-forwarding components; refs remain imperative.</p>;
}

// -----------------------------------------------------------------------------
// Q22: [ADV] Interview — ref React 18 vs 19 summary
//
// Task:
// 18: forwardRef required for function components.
// 19: ref regular prop; forwardRef legacy compat.
//
// In simple words:
// callback ref, useImperativeHandle unchanged semantically.
// Traps: not forwarding ref; reading ref in render; merge conflicts.
// Migration incremental; libs lag on typings.
// Class refs unchanged; DOM refs still useRef primary.
// -----------------------------------------------------------------------------
export const refInterviewSummary = {
  react18: "forwardRef(function Component(props, ref))",
  react19: "function Component({ ref, ...props })",
  unchanged: ["useRef", "callback refs", "useImperativeHandle semantics"],
  traps: ["accept ref but not attach", "read ref during render", "forget mergeRefs with libs"],
};
