// ============================================================================
// 34 — React 19 ref as prop (forwardRef legacy)
// Level: REACT19  |  Sequence seekho: pehle yeh file, phir agla number
// ============================================================================
//
// LAYMAN: Pehle ref special tha — props me nahi milta tha.
// Isliye forwardRef(function (props, ref) { ... }) likhna padta.
//
// React 19: ref normal prop hai — function Component({ ref, ... }) {
//   return <input ref={ref} />
// }
//
// forwardRef ab bhi kaam karta (libraries / purana code) — naya code me
// usually zaroori nahi. Class components alag history.
//
// KYUN: Boilerplate kam; mid interviews "forwardRef kyun tha?" ab context.
// INTERVIEW: ref prop vs forwardRef; callback refs; useImperativeHandle.
//
// ============================================================================

import { useRef, useEffect, useImperativeHandle, forwardRef } from "react";

// -----------------------------------------------------------------------------
// Q1: React 19 style — ref as prop
//
// Seedha matlab:
// Parent <Input ref={inputRef} />.
// Child function param me ref milta — DOM ko forward.
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
// Q2: Purana forwardRef (legacy / library compat)
//
// Seedha matlab:
// Same behavior, extra wrap.
// Naye projects me prefer ref prop.
// Purani lib support ke liye forwardRef dekhna pad sakta.
// -----------------------------------------------------------------------------
const LegacyInput = forwardRef(function LegacyInput(props, ref) {
  return <input ref={ref} {...props} />;
});

export function LegacyFocusDemo() {
  const ref = useRef(null);
  return <LegacyInput ref={ref} placeholder="Legacy forwardRef" />;
}

// -----------------------------------------------------------------------------
// Q3: [MID] ref function component pe bina forward / bina prop?
//
// Seedha matlab:
// React 18 me warning / ignore — ref props me nahi aata tha.
// React 19 me aata hai. Version matter karta interview me clear bolo.
// -----------------------------------------------------------------------------
const versionNote = {
  react18: "need forwardRef to pass ref to function components",
  react19: "ref is a regular prop",
};

// -----------------------------------------------------------------------------
// Q4: Callback ref
//
// Seedha matlab:
// ref={(node) => { ... }} — mount pe node, unmount pe null.
// Measuring DOM / third-party attach ke liye.
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
// Q5: [MID] useImperativeHandle — parent ko limited API
//
// Seedha matlab:
// Kabhi parent ko poora DOM nahi — sirf focus() / scrollTo().
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
// Seedha matlab:
// Library ko bhi ref chahiye + parent ko bhi — callback me dono set.
// Ya tiny setRefs helper.
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
// Q7: ref on custom component — kya point karta?
//
// Seedha matlab:
// Jab tak child ref ko DOM (ya imperative handle) pe na lagaye,
// parent.current null / useless.
// Document karo: "yeh component ref ko input pe forward karta".
// -----------------------------------------------------------------------------
function Broken({ ref }) {
  // ref accept kiya but kahin attach nahi ❌
  return <input />;
}

function Fixed({ ref }) {
  return <input ref={ref} />; // ✅
}

// -----------------------------------------------------------------------------
// Q8: [MID] Interview closer
//
// Seedha matlab:
// "React 19 me forwardRef mostly legacy; ref prop standard.
// useImperativeHandle se controlled escape hatch.
// Ref updates commit phase — render me ref.current mat padho logic ke liye."
// -----------------------------------------------------------------------------
const closer =
  "ref as prop in 19; forwardRef legacy; don't read ref during render for data flow.";

// -----------------------------------------------------------------------------
// Q9: ref prop name collision — 'ref' reserved feel
//
// Kya karna hai:
// Prop naam ref rakho carefully — DOM ref forward ke liye; alag data ke liye inputRef use karo.
//
// Seedha matlab:
// React 19 me ref special prop slot jaisa behave — forward to DOM.
// Agar product code me ref="something" string chahiye tha — rename (conflict rare).
// React 18 forwardRef alag param — collision kam tha.
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
// Kya karna hai:
// Props me ref?: Ref<HTMLInputElement> — @types/react 19 helpers.
//
// Seedha matlab:
// forwardRef generic types ab optional simpler components me.
// React 18: ForwardRefRenderFunction boilerplate types.
// Migration: remove forwardRef wrapper first, keep ref in props interface.
// Libraries publish both patterns during transition.
// -----------------------------------------------------------------------------
const tsRefNote =
  "React 19 types: ref on props directly; Ref<T> on function component props.";

// -----------------------------------------------------------------------------
// Q11: ref null on unmount — callback ref
//
// Kya karna hai:
// ref={(node) => { ... }} — unmount pe node null aata hai.
//
// Seedha matlab:
// Cleanup measure listeners jab node null.
// React 18/19 same callback ref semantics.
// useImperativeHandle parent ref stable — inner unmount separate lifecycle.
// Trap: ref callback inline har render new — re-run attach/detach; useCallback stabilize.
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
// Kya karna hai:
// 1) forwardRef hatao 2) ref ko props me lo 3) tests snapshot update.
//
// Seedha matlab:
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
// Kya karna hai:
// Class components pe ref = instance; function ref prop change unko affect nahi.
//
// Seedha matlab:
// React 19 ref-as-prop = function components ke liye DX win.
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
// Kya karna hai:
// FancyInput({ ref }) { useImperativeHandle(ref, () => ({ focus })); ... }
//
// Seedha matlab:
// Parent ko limited API — encapsulation.
// React 18 forwardRef + useImperativeHandle classic pair.
// React 19: ref prop replaces forwardRef only — imperative handle same.
// Don't expose entire DOM unless needed — maintenance boundary.
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
// Kya karna hai:
// render me if (ref.current) width = ... ❌ — layout flicker / rules.
//
// Seedha matlab:
// Ref commit ke baad update — render phase me mat padho UI logic ke liye.
// React 18 same rule — ref not reactive state.
// Measure: useLayoutEffect ya callback ref.
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
// Kya karna hai:
// Lib internal ref + parent ref — setRefs helper (Q6) ya mergeRefs util.
//
// Seedha matlab:
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
// Kya karna hai:
// JSDoc: "@param ref forwarded to underlying <input />"
//
// Seedha matlab:
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
// Kya karna hai:
// ref="myRef" string refs removed long ago — useRef/createRef only.
//
// Seedha matlab:
// React 19 assumes modern ref API.
// React 18 already no string refs.
// Interview historical: string refs old class era.
// Callback ref + useRef cover all cases.
// -----------------------------------------------------------------------------
const stringRefNote = "String refs dead — useRef or callback ref only.";

// -----------------------------------------------------------------------------
// Q19: [ADV] When NOT ref — state/props instead
//
// Kya karna hai:
// Child value read karne ke liye ref abuse mat karo — lift state up.
//
// Seedha matlab:
// ref = imperative DOM/focus/scroll/measure — not data flow.
// React 18 same anti-pattern.
// Form values: controlled state or FormData submit — ref.current.value scrape fragile.
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
// Kya karna hai:
// ref use karne wala component 'use client' hona chahiye.
//
// Seedha matlab:
// Server Component me ref meaningless — no DOM instance client-side lifecycle same way.
// Pass ref to client child that wraps DOM element.
// React 18 CSR everything client — RSC split naya concern.
// Pattern: Server layout + Client input with ref for focus trap.
// -----------------------------------------------------------------------------
const rscRefNote = "Refs attach in client components; server components don't use refs on DOM.";

// -----------------------------------------------------------------------------
// Q21: [ADV] Compiler + ref prop
//
// Kya karna hai:
// Compiler ref prop pass-through optimize kar sakta — still don't read during render.
//
// Seedha matlab:
// Simple forward ref components memoized automatically maybe.
// useImperativeHandle deps careful — stale inner ref if deps wrong.
// React 18 manual memo on forwardRef components common.
// Rules of React purity still apply.
// -----------------------------------------------------------------------------
export function CompilerRefNote() {
  return <p>Compiler may memoize ref-forwarding components; refs remain imperative.</p>;
}

// -----------------------------------------------------------------------------
// Q22: [ADV] Interview — ref React 18 vs 19 summary
//
// Kya karna hai:
// 18: forwardRef required for function components.
// 19: ref regular prop; forwardRef legacy compat.
//
// Seedha matlab:
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
