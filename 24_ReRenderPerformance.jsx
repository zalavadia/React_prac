// ============================================================================
// 24 — Re-Render Performance
// Level: MID  |  Sequence: do this first, then the next file in sequence
// ============================================================================
//
// SIMPLE: Re-render = React runs the function again to update UI. Every
// setState in a parent re-runs children by default — sometimes expensive.
// Fix hierarchy: (1) move state down (2) split children (3) memo/callback
// (4) virtualize long lists. Profile first, optimize later.
//
// WHY: Janky typing / laggy lists. Mid interview favorite.
// INTERVIEW: why child re-renders; state colocation; React DevTools Profiler.
// Vite/React 19 project — teaching file.
//
// ============================================================================

import { memo, useCallback, useDeferredValue, useMemo, useState, useTransition } from "react";

// -----------------------------------------------------------------------------
// Q1: State colocation
//
// Task:
// Move input state out of App into SearchBox only.
//
// In simple words:
// Do not re-render whole tree on typing — state where it is used.
// -----------------------------------------------------------------------------
function SearchBox() {
  const [q, setQ] = useState("");
  return <input value={q} onChange={(e) => setQ(e.target.value)} />;
}

function Page() {
  return (
    <div>
      <SearchBox />
      <ExpensiveStatic />
    </div>
  );
}

const ExpensiveStatic = memo(function ExpensiveStatic() {
  console.log("static");
  return <div>Heavy but static</div>;
});

// -----------------------------------------------------------------------------
// Q2: Children as props trick
//
// Task:
// When parent state changes, pre-created children keep same identity.
//
// In simple words:
// <Parent><Heavy /></Parent> — Parent re-renders, Heavy props same → with
// structure can skip (pattern). Detail: composition.
// -----------------------------------------------------------------------------
function Parent({ children }) {
  const [n, setN] = useState(0);
  return (
    <div>
      <button onClick={() => setN(n + 1)}>{n}</button>
      {children}
    </div>
  );
}
// use: <Parent><ExpensiveStatic /></Parent>

// -----------------------------------------------------------------------------
// Q3: Split context (again)
//
// Task:
// Frequently changing value in separate context — fewer wide-tree re-renders.
//
// In simple words:
// Do not mix theme (rare) with mouse position (hot).
// -----------------------------------------------------------------------------
// See 11_UseContext Q6 split state/dispatch

// -----------------------------------------------------------------------------
// Q4: Avoid creating heavy work in render
//
// Task:
// Sort/filter — useMemo when costly + frequent parent renders.
//
// In simple words:
// File 16. Here: remove unnecessary renders first.
// -----------------------------------------------------------------------------
function List({ items, query }) {
  // prefer: fewer parent renders; then memoize filter if needed
  const shown = items.filter((i) => i.includes(query));
  return <ul>{shown.map((s) => <li key={s}>{s}</li>)}</ul>;
}

// -----------------------------------------------------------------------------
// Q5: [MID] Key that remounts too much
//
// Task:
// key={Math.random()} — remount every time = slow + state loss.
//
// In simple words:
// Stable keys. Change key only when remount is intentional.
// -----------------------------------------------------------------------------
function BadKey({ items }) {
  return (
    <ul>
      {items.map((it) => (
        <li key={it.id}>{it.name}</li>
      ))}
    </ul>
  );
}

// -----------------------------------------------------------------------------
// Q6: [MID] Windowing / virtualization note
//
// Task:
// 10k rows — only viewport DOM (react-window etc).
//
// In simple words:
// memo does not manage 10k. Virtualize.
// -----------------------------------------------------------------------------
function VirtualNote() {
  return <p>Long lists → windowing library, not only memo.</p>;
}

// -----------------------------------------------------------------------------
// Q7: Measure with Profiler mindset
//
// Task:
// React DevTools Profiler — who renders, how long.
//
// In simple words:
// Do not guess. Optimize from evidence.
// -----------------------------------------------------------------------------
function Hint() {
  return <p>Profile → find hot components → fix cause.</p>;
}

// -----------------------------------------------------------------------------
// Q8: Cheap wins checklist
//
// Task:
// Colocate state; memo expensive pure; stable callbacks; fewer context updates.
//
// In simple words:
// Interview answer structure in this order.
// -----------------------------------------------------------------------------
function Checklist() {
  return (
    <ol>
      <li>Colocate state</li>
      <li>Split components</li>
      <li>memo / useCallback where proven</li>
      <li>Virtualize huge lists</li>
    </ol>
  );
}

// -----------------------------------------------------------------------------
// Q9: React DevTools — "Highlight updates" ON
//
// Task:
// DevTools → Components → settings → highlight re-renders.
//
// In simple words:
// See what flashes on typing — catch it visually, then fix.
// -----------------------------------------------------------------------------
function DevToolsHint() {
  return <p>Highlight updates shows unnecessary re-renders.</p>;
}

// -----------------------------------------------------------------------------
// Q10: [MID] Context — every consumer re-renders when value changes
//
// Task:
// One big context object new every render → all consumers re-render.
//
// In simple words:
// Split context / memo value / selector pattern — see file 11 cross-ref.
// -----------------------------------------------------------------------------
function ContextPerfNote() {
  return (
    <p>
      Context value reference change = all subscribers re-render. Split state/dispatch.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q11: Inline object/array props — memo break
//
// Task:
// Child is memo but style={{ color: "red" }} is new object every render.
//
// In simple words:
// Reference equality fails — memo useless. Stable ref or useMemo style.
// -----------------------------------------------------------------------------
const MemoChild = memo(function MemoChild({ config }) {
  console.log("MemoChild render");
  return <span>{config.label}</span>;
});
function InlinePropTrap() {
  const [n, setN] = useState(0);
  return (
    <div>
      <button onClick={() => setN(n + 1)}>{n}</button>
      <MemoChild config={{ label: "Hi" }} />
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q12: [MID] useCallback — stable handler when passing to memo child
//
// Task:
// const onClick = useCallback(() => {}, [deps]) — pass to MemoRow.
//
// In simple words:
// New callback every render → memo child renders again. Prove with Profiler first.
// -----------------------------------------------------------------------------
function StableHandlerParent() {
  const [n, setN] = useState(0);
  const onSave = useCallback(() => console.log("save"), []);
  return (
    <div>
      <button onClick={() => setN(n + 1)}>{n}</button>
      <MemoChild config={{ label: "save", onClick: onSave }} />
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q13: startTransition — non-urgent update at lower priority
//
// Task:
// startTransition(() => setFiltered(huge)) — typing stays responsive.
//
// In simple words:
// Heavy filter/sort not urgent — transition makes it interruptible.
// -----------------------------------------------------------------------------
function TransitionFilter({ items }) {
  const [q, setQ] = useState("");
  const [filtered, setFiltered] = useState(items);
  const [pending, startTransition] = useTransition();
  function onChange(e) {
    const v = e.target.value;
    setQ(v);
    startTransition(() => {
      setFiltered(items.filter((i) => i.includes(v)));
    });
  }
  return (
    <div>
      <input value={q} onChange={onChange} />
      {pending && <span>...</span>}
      <ul>{filtered.map((s) => <li key={s}>{s}</li>)}</ul>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q14: [MID] React Compiler — future auto memo note
//
// Task:
// Compiler will infer stable props — less manual memo needed.
//
// In simple words:
// Still: colocate state first; Compiler is bonus, not excuse for premature memo.
// -----------------------------------------------------------------------------
function CompilerNote() {
  return (
    <p>
      React Compiler: auto memoization research — still measure + colocate
      state as rule #1.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q15: Lifting state down — split heavy sibling
//
// Task:
// Counter state in separate component; list in parent without counter.
//
// In simple words:
// Save list from parent re-render — move state down.
// -----------------------------------------------------------------------------
function CounterIsland() {
  const [n, setN] = useState(0);
  return <button onClick={() => setN(n + 1)}>{n}</button>;
}
function SplitLayout() {
  return (
    <div>
      <CounterIsland />
      <ExpensiveStatic />
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q16: [MID] List item as separate memo component
//
// Task:
// Row memo + stable id props — only changed row renders.
//
// In simple words:
// Parent list re-renders; rows with same props → skip.
// -----------------------------------------------------------------------------
const Row = memo(function Row({ item }) {
  return <li>{item}</li>;
});
function MemoList({ items }) {
  return (
    <ul>
      {items.map((item) => (
        <Row key={item} item={item} />
      ))}
    </ul>
  );
}

// -----------------------------------------------------------------------------
// Q17: [ADV] Profiler — read commit duration
//
// Task:
// Record interaction → see which component takes ms.
//
// In simple words:
// Evidence-based optimize, not flamegraph guesswork.
// -----------------------------------------------------------------------------
function ProfilerNote() {
  return <p>Profiler: slow commit → fix that component's cause (state/props).</p>;
}

// -----------------------------------------------------------------------------
// Q18: [ADV] useDeferredValue — search debounce alternative feel
//
// Task:
// deferredQuery = useDeferredValue(query) — filter list with deferred value.
//
// In simple words:
// Input updates immediately; heavy list slightly later — smooth typing.
// -----------------------------------------------------------------------------
function DeferredSearch({ items }) {
  const [q, setQ] = useState("");
  const deferredQ = useDeferredValue(q);
  const shown = useMemo(
    () => items.filter((i) => i.includes(deferredQ)),
    [items, deferredQ]
  );
  return (
    <div>
      <input value={q} onChange={(e) => setQ(e.target.value)} />
      <ul>{shown.map((s) => <li key={s}>{s}</li>)}</ul>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q19: [ADV] Activity / Offscreen (React 19+) — hide without unmount cost
//
// Task:
// Tab switch: component hidden state — no remount, defer updates.
//
// In simple words:
// Emerging performance pattern — tabs preserve state cheaply.
// -----------------------------------------------------------------------------
function ActivityNote() {
  return (
    <p>
      React 19 Activity: hidden UI at low priority — fewer re-renders in tabs.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q20: [ADV] Premature memo anti-pattern
//
// Task:
// memo/useCallback on every component — complexity up, gain zero.
//
// In simple words:
// Only after Profiler proves it — keep default simple.
// -----------------------------------------------------------------------------
function PrematureMemoNote() {
  return <p>Do not memo everything — colocate state first, profile, then memo.</p>;
}

// -----------------------------------------------------------------------------
// Q21: [ADV] Virtualization recap — react-window
//
// Task:
// Fixed height list — render only visible rows in DOM.
//
// In simple words:
// 10k items: memo is not enough; windowing is mandatory.
// -----------------------------------------------------------------------------
function VirtualListSketch() {
  return (
    <p>
      react-window: when itemCount is huge, fewer DOM nodes — scroll viewport based.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q22: [ADV] Interview — slow render diagnose steps
//
// Task:
// Highlight → Profiler → state location → props stable → memo last → virtualize.
//
// In simple words:
// Ordered answer is strong in interview — do not guess.
// -----------------------------------------------------------------------------
function PerfInterview() {
  return (
    <ol>
      <li>DevTools highlight + Profiler</li>
      <li>State colocate / lift down</li>
      <li>Context split, inline props fix</li>
      <li>useTransition / useDeferredValue</li>
      <li>memo/useCallback if proven</li>
      <li>Virtualize long lists</li>
    </ol>
  );
}

export {
  SearchBox,
  Page,
  ExpensiveStatic,
  Parent,
  List,
  BadKey,
  VirtualNote,
  Hint,
  Checklist,
  DevToolsHint,
  ContextPerfNote,
  InlinePropTrap,
  StableHandlerParent,
  TransitionFilter,
  CompilerNote,
  CounterIsland,
  SplitLayout,
  MemoList,
  ProfilerNote,
  DeferredSearch,
  ActivityNote,
  PrematureMemoNote,
  VirtualListSketch,
  PerfInterview,
};
