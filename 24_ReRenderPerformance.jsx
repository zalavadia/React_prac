// ============================================================================
// 24 — Re-Render Performance
// Level: MID  |  Sequence: pehle yeh, phir agla number
// ============================================================================
//
// LAYMAN: Re-render = React function dubara chali UI update sochne. Har
// setState parent ke bacche bhi default dubara chalte — kabhi mehnga.
// Fix hierarchy: (1) state neeche lao (2) children split (3) memo/callback
// (4) virtualize long lists. Profile pehle, optimize baad.
//
// KYUN: Janky typing / laggy lists. Mid interview favorite.
// INTERVIEW: why child re-renders; state colocation; React DevTools Profiler.
// Vite/React 19 project me use — teaching file.
//
// ============================================================================

import { memo, useCallback, useDeferredValue, useMemo, useState, useTransition } from "react";

// -----------------------------------------------------------------------------
// Q1: State colocation
//
// Kya karna hai:
// Input state App se hata ke sirf SearchBox me.
//
// Seedha matlab:
// Typing pe poora tree mat roye — state jahan use.
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
// Kya karna hai:
// Parent state change pe pehle se create children identity same rehti.
//
// Seedha matlab:
// <Parent><Heavy /></Parent> — Parent re-render, Heavy props same → with
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
// Kya karna hai:
// Frequently changing value alag context — wide tree kam re-render.
//
// Seedha matlab:
// Theme (rare) vs mouse position (hot) mat mix.
// -----------------------------------------------------------------------------
// See 11_UseContext Q6 split state/dispatch

// -----------------------------------------------------------------------------
// Q4: Avoid creating heavy work in render
//
// Kya karna hai:
// Sort/filter — useMemo jab costly + frequent parent renders.
//
// Seedha matlab:
// 16 file. Yahan: pehle unnecessary renders hatao.
// -----------------------------------------------------------------------------
function List({ items, query }) {
  // prefer: fewer parent renders; then memoize filter if needed
  const shown = items.filter((i) => i.includes(query));
  return <ul>{shown.map((s) => <li key={s}>{s}</li>)}</ul>;
}

// -----------------------------------------------------------------------------
// Q5: [MID] Key that remounts too much
//
// Kya karna hai:
// key={Math.random()} — har baar remount = slow + state loss.
//
// Seedha matlab:
// Stable keys. Remount intentional ho tabhi key change.
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
// Kya karna hai:
// 10k rows — sirf viewport DOM (react-window etc).
//
// Seedha matlab:
// memo se 10k manage nahi. Virtualize.
// -----------------------------------------------------------------------------
function VirtualNote() {
  return <p>Long lists → windowing library, not only memo.</p>;
}

// -----------------------------------------------------------------------------
// Q7: Measure with Profiler mindset
//
// Kya karna hai:
// React DevTools Profiler — kaun render, kitna time.
//
// Seedha matlab:
// Guess mat. Evidence se optimize.
// -----------------------------------------------------------------------------
function Hint() {
  return <p>Profile → find hot components → fix cause.</p>;
}

// -----------------------------------------------------------------------------
// Q8: Cheap wins checklist
//
// Kya karna hai:
// Colocate state; memo expensive pure; stable callbacks; fewer context updates.
//
// Seedha matlab:
// Interview answer structure yahi order.
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
// Kya karna hai:
// DevTools → Components → settings → highlight re-renders.
//
// Seedha matlab:
// Kaun flash ho raha typing pe — visually pakdo, phir fix.
// -----------------------------------------------------------------------------
function DevToolsHint() {
  return <p>Highlight updates se unnecessary re-renders dikhte hain.</p>;
}

// -----------------------------------------------------------------------------
// Q10: [MID] Context — har consumer re-render jab value change
//
// Kya karna hai:
// Ek bada context object har render naya → sab consumers royein.
//
// Seedha matlab:
// Split context / memo value / selector pattern — 11 file cross-ref.
// -----------------------------------------------------------------------------
function ContextPerfNote() {
  return (
    <p>
      Context value reference change = sab subscribers re-render. State/dispatch
      alag karo.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q11: Inline object/array props — memo break
//
// Kya karna hai:
// Child memo hai par style={{ color: "red" }} har render naya object.
//
// Seedha matlab:
// Reference equality fail — memo useless. Stable ref ya useMemo style.
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
// Q12: [MID] useCallback — stable handler jab memo child ko pass
//
// Kya karna hai:
// const onClick = useCallback(() => {}, [deps]) — MemoRow ko pass.
//
// Seedha matlab:
// Callback har render naya → memo child phir render. Proof pehle Profiler se.
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
// Q13: startTransition — non-urgent update alag priority
//
// Kya karna hai:
// startTransition(() => setFiltered(huge)) — typing responsive rahe.
//
// Seedha matlab:
// Heavy filter/sort urgent nahi — transition se interruptible.
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
// Kya karna hai:
// Compiler stable props infer karega — manual memo kam pad sakta.
//
// Seedha matlab:
// Ab bhi: colocate state pehle; Compiler bonus, excuse nahi premature memo.
// -----------------------------------------------------------------------------
function CompilerNote() {
  return (
    <p>
      React Compiler: auto memoization research — abhi bhi measure + colocate
      state rule #1.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q15: Lifting state down — split heavy sibling
//
// Kya karna hai:
// Counter state alag component me; list parent me bina counter ke.
//
// Seedha matlab:
// Parent re-render se list bachao — state neeche lao.
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
// Q16: [MID] List item alag memo component
//
// Kya karna hai:
// Row memo + stable id props — sirf changed row render.
//
// Seedha matlab:
// Parent list re-render; rows same props → skip.
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
// Q17: [ADV] Profiler — commit duration read
//
// Kya karna hai:
// Record interaction → dekho kaun component ms le raha.
//
// Seedha matlab:
// Flamegraph se guess nahi — evidence based optimize.
// -----------------------------------------------------------------------------
function ProfilerNote() {
  return <p>Profiler: slow commit → us component ka cause fix (state/props).</p>;
}

// -----------------------------------------------------------------------------
// Q18: [ADV] useDeferredValue — search debounce alternative feel
//
// Kya karna hai:
// deferredQuery = useDeferredValue(query) — list ko deferred se filter.
//
// Seedha matlab:
// Input turant update; heavy list thodi der baad — smooth typing.
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
// Kya karna hai:
// Tab switch pe component hidden state — remount mat, defer updates.
//
// Seedha matlab:
// Performance pattern emerging — tabs preserve state cheaply.
// -----------------------------------------------------------------------------
function ActivityNote() {
  return (
    <p>
      React 19 Activity: hidden UI ko low priority — tabs me re-render kam.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q20: [ADV] Premature memo anti-pattern
//
// Kya karna hai:
// Har component memo/useCallback — complexity badho, gain zero.
//
// Seedha matlab:
// Profiler prove kare tab hi — default simple rakho.
// -----------------------------------------------------------------------------
function PrematureMemoNote() {
  return <p>memo sab pe mat — pehle colocate state, phir profile, phir memo.</p>;
}

// -----------------------------------------------------------------------------
// Q21: [ADV] Virtualization recap — react-window
//
// Kya karna hai:
// Fixed height list — sirf visible rows DOM me render.
//
// Seedha matlab:
// 10k items: memo se kaam nahi; windowing mandatory.
// -----------------------------------------------------------------------------
function VirtualListSketch() {
  return (
    <p>
      react-window: itemCount huge ho to DOM nodes kam — scroll viewport based.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q22: [ADV] Interview — slow render diagnose steps
//
// Kya karna hai:
// Highlight → Profiler → state location → props stable → memo last → virtualize.
//
// Seedha matlab:
// Ordered answer interview me strong — guess mat.
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
