// ============================================================================
// 16 — useMemo And useCallback
// Level: MID  |  Sequence: read this file, then the next number
// ============================================================================
//
// SIMPLE: useMemo = prep expensive cooking ahead in a tiffin — if deps same, don't
// cook again. useCallback = keep the same function reference (deps same).
//
// Both are OPTIMIZATION tools — first write correct code, then measure, then memoize.
// Overuse = complexity + sometimes slower (deps compare cost).
//
// WHY: Heavy calc; stable fn for memo children / effect deps.
// INTERVIEW: referential equality; when NOT to memoize; deps mistakes.
// Use in a Vite + React 19 project — teaching file.
//
// ============================================================================

import { memo, useCallback, useEffect, useMemo, useState } from "react";

// -----------------------------------------------------------------------------
// Q1: useMemo heavy filter
//
// Task:
// bigList filter when query changes.
//
// In simple words:
// Save O(n) on every parent keystroke — when list is genuinely big.
// -----------------------------------------------------------------------------
function FilteredList({ items, query }) {
  const filtered = useMemo(() => {
    return items.filter((it) =>
      it.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [items, query]);
  return (
    <ul>
      {filtered.map((it) => (
        <li key={it.id}>{it.name}</li>
      ))}
    </ul>
  );
}

// -----------------------------------------------------------------------------
// Q2: useCallback stable handler
//
// Task:
// onSelect = useCallback(..., [deps]) for memo child.
//
// In simple words:
// Inline () => onSelect(id) is new every render. Callback + memo = skip render.
// -----------------------------------------------------------------------------
function ParentList({ items }) {
  const [selected, setSelected] = useState(null);
  const onSelect = useCallback((id) => setSelected(id), []);
  return (
    <ul>
      {items.map((it) => (
        <Row key={it.id} item={it} onSelect={onSelect} />
      ))}
      <p>Selected: {selected}</p>
    </ul>
  );
}

function Row({ item, onSelect }) {
  return <li onClick={() => onSelect(item.id)}>{item.name}</li>;
}

// -----------------------------------------------------------------------------
// Q3: Don't memo trivial math
//
// Task:
// total = a+b — useMemo is waste.
//
// In simple words:
// Cheap calc is already fast. Avoid premature optimization.
// -----------------------------------------------------------------------------
function Sum({ a, b }) {
  const total = a + b; // ✅ no useMemo needed
  return <p>{total}</p>;
}

// -----------------------------------------------------------------------------
// Q4: Object/array dependency trap
//
// Task:
// useMemo(() => ({...}), [user.id]) — don't put whole user object in deps carelessly.
//
// In simple words:
// New object literal from parent → memo breaks. Stabilize parent or pick fields.
// -----------------------------------------------------------------------------
function Card({ userId }) {
  const options = useMemo(() => ({ id: userId, mode: "view" }), [userId]);
  return <pre>{JSON.stringify(options)}</pre>;
}

// -----------------------------------------------------------------------------
// Q5: [MID] useMemo for context value (see 11)
//
// Task:
// Memoize Provider value object.
//
// In simple words:
// Context consumers re-render only when value identity changes.
// -----------------------------------------------------------------------------
// const value = useMemo(() => ({ n, setN }), [n]);

// -----------------------------------------------------------------------------
// Q6: [MID] useCallback deps must be right
//
// Task:
// Values used inside callback must be in deps.
//
// In simple words:
// Missing dep = stale bug. Extra = identity churn. Same rules as useEffect.
// -----------------------------------------------------------------------------
function Search({ query, onResults }) {
  const run = useCallback(() => {
    onResults(query);
  }, [query, onResults]);
  return <button onClick={run}>Search</button>;
}

// -----------------------------------------------------------------------------
// Q7: Derived data vs state
//
// Task:
// sorted = useMemo(() => [...items].sort(), [items])
//
// In simple words:
// Don't keep sorted as separate state — derive + optional memo.
// -----------------------------------------------------------------------------
function Sorted({ items }) {
  const sorted = useMemo(
    () => [...items].sort((a, b) => a.localeCompare(b)),
    [items]
  );
  return <ul>{sorted.map((s) => <li key={s}>{s}</li>)}</ul>;
}

// -----------------------------------------------------------------------------
// Q8: [MID] React Compiler note
//
// Task:
// In new setups compiler auto memoizes — still learn concept for interviews.
//
// In simple words:
// Manual useMemo/useCallback still in legacy + intentional optimize.
// This file is teaching — build mental model first.
// -----------------------------------------------------------------------------
function Concept() {
  return <p>Measure first, memo second.</p>;
}

// -----------------------------------------------------------------------------
// Q9: When useMemo helps — expensive calc
//
// Task:
// 10k items sort/filter — memo on deps [items, sortKey].
//
// In simple words:
// Measurable slow render → try memo. Verify with DevTools Profiler.
// On tiny lists memo overhead > savings.
// -----------------------------------------------------------------------------
function HeavySort({ items, keyName }) {
  const sorted = useMemo(() => {
    return [...items].sort((a, b) => a[keyName].localeCompare(b[keyName]));
  }, [items, keyName]);
  return <ul>{sorted.map((it) => <li key={it.id}>{it[keyName]}</li>)}</ul>;
}

// -----------------------------------------------------------------------------
// Q10: When useMemo hurts — cheap + always new deps
//
// Task:
// useMemo(() => x + 1, [x]) when x changes every render — waste.
//
// In simple words:
// Memo cost: memory + deps compare. Can sometimes make things slower.
// Premature optimization = complexity without gain.
// -----------------------------------------------------------------------------
function CheapPlus({ x }) {
  return <p>{x + 1}</p>; // skip useMemo — it's cheap
}

// -----------------------------------------------------------------------------
// Q11: [MID] Referential equality explained
//
// Task:
// {} === {} false — new object every render, memo child fails.
//
// In simple words:
// JS reference compare. useMemo/useCallback preserve same reference.
// React.memo also shallow reference check on props.
// -----------------------------------------------------------------------------
function RefEqualityDemo() {
  const a = { n: 1 };
  const b = { n: 1 };
  const same = a === b; // false — interview classic
  return <p>{String(same)}</p>;
}

// -----------------------------------------------------------------------------
// Q12: useCallback empty deps pitfall
//
// Task:
// useCallback(() => doThing(id), []) — id stays stale.
//
// In simple words:
// Missing dep = bug. Listen to ESLint exhaustive-deps.
// Functional update or ref pattern when you want intentional stability.
// -----------------------------------------------------------------------------
function StaleCallback({ id }) {
  const log = useCallback(() => console.log(id), [id]); // id in deps
  return <button onClick={log}>Log {id}</button>;
}

// -----------------------------------------------------------------------------
// Q13: useMemo for stable object to memo child
//
// Task:
// const config = useMemo(() => ({ theme, size }), [theme, size])
//
// In simple words:
// Pass object prop to memo child — memoize object or it's useless.
// Pair pattern: memo + useMemo/useCallback.
// -----------------------------------------------------------------------------
function ConfigChild({ config }) {
  return <span>{config.theme}</span>;
}

function ConfigParent() {
  const [theme, setTheme] = useState("light");
  const config = useMemo(() => ({ theme, size: "md" }), [theme]);
  return (
    <div>
      <button onClick={() => setTheme("dark")}>toggle</button>
      <ConfigChild config={config} />
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q14: [MID] React 19 Compiler — auto memoization
//
// Task:
// Compiler analyzes and inserts memo itself — less manual work possible.
//
// In simple words:
// Concept still in interviews: referential equality, understand deps.
// Legacy code + edge cases still need manual useMemo/useCallback.
// "Measure first" rule still valid after compiler.
// -----------------------------------------------------------------------------
function CompilerNote() {
  return (
    <p>
      React Compiler = auto optimize. Manual memo = intentional hot paths.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q15: useMemo !== only on render
//
// Task:
// Expensive init too: useMemo(() => buildGraph(data), [data])
//
// In simple words:
// Lazy init useState(() => ...) also option for first mount.
// useMemo when you need rebuild on data change.
// -----------------------------------------------------------------------------
function GraphView({ data }) {
  const graph = useMemo(() => data.map((d) => ({ ...d, score: d.v * 2 })), [data]);
  return <pre>{JSON.stringify(graph)}</pre>;
}

// -----------------------------------------------------------------------------
// Q16: Inline function in JSX — when OK
//
// Task:
// onClick={() => setX(1)} — cheap child, no memo → fine.
//
// In simple words:
// Don't useCallback everywhere. Matters for memo child + list rows.
// Readability > micro-opt usually.
// -----------------------------------------------------------------------------
function InlineOk() {
  const [n, setN] = useState(0);
  return <button onClick={() => setN(1)}>{n}</button>;
}

// -----------------------------------------------------------------------------
// Q17: [MID] useCallback for effect dependency stability
//
// Task:
// const load = useCallback(...); useEffect(() => { load() }, [load]);
//
// In simple words:
// Effect needs stable fn or infinite loop / extra runs.
// Alternative: put logic inline inside effect.
// -----------------------------------------------------------------------------
function EffectStable({ userId }) {
  const load = useCallback(async () => {
    /* fetch user userId */
  }, [userId]);
  useEffect(() => {
    load();
  }, [load]);
  return null;
}

// -----------------------------------------------------------------------------
// Q18: Memoizing children JSX — usually wrong
//
// Task:
// useMemo(() => <Expensive />, []) — rare, often smell.
//
// In simple words:
// Wrap component with memo better than memo JSX element.
// children element new every render — rethink parent memo strategy.
// -----------------------------------------------------------------------------
function MemoJsxNote() {
  return <p>useMemo for JSX is last resort — use React.memo on component.</p>;
}

// -----------------------------------------------------------------------------
// Q19: Deps array reference — items prop
//
// Task:
// Parent items={[...]} new array every render → useMemo reruns.
//
// In simple words:
// Stabilize data source in parent. Redux/state same ref when data same.
// Memo downstream only works when upstream is stable.
// -----------------------------------------------------------------------------
function StableItemsParent() {
  const [items] = useState([{ id: 1, name: "a" }]); // stable ref
  return <FilteredList items={items} query="" />;
}

// -----------------------------------------------------------------------------
// Q20: [MID] Premature optimization checklist
//
// Task:
// 1) Profile 2) Confirm bottleneck 3) Memo targeted 4) Re-profile.
//
// In simple words:
// Memo without measure = guesswork. Interview: "default no memo until proven slow."
// Readable code first, optimize later.
// -----------------------------------------------------------------------------
function OptChecklist() {
  return <ol><li>Profile</li><li>Prove slow</li><li>Memo surgical</li></ol>;
}

// -----------------------------------------------------------------------------
// Q21: useMemo + useCallback together in list
//
// Task:
// Parent: filtered useMemo, onToggle useCallback, Row memo.
//
// In simple words:
// Full stack optimization pattern — only worth it for big lists.
// One missing piece → whole chain fails.
// -----------------------------------------------------------------------------
function OptimizedList({ todos }) {
  const [filter, setFilter] = useState("");
  const shown = useMemo(
    () => todos.filter((t) => t.text.includes(filter)),
    [todos, filter]
  );
  const onToggle = useCallback((id) => {
    /* dispatch toggle */
  }, []);
  return (
    <ul>
      {shown.map((t) => (
        <MemoRow key={t.id} todo={t} onToggle={onToggle} />
      ))}
    </ul>
  );
}

const MemoRow = memo(function MemoRow({ todo, onToggle }) {
  return (
    <li>
      <button onClick={() => onToggle(todo.id)}>{todo.text}</button>
    </li>
  );
});

// -----------------------------------------------------------------------------
// Q22: Breaking memo with inline object spread
//
// Task:
// <Child {...objectLit} /> new spread object every render.
//
// In simple words:
// Pick primitives or memoize props object.
// spread + inline = referential death.
// -----------------------------------------------------------------------------
function SpreadTrap() {
  const [n, setN] = useState(0);
  const props = useMemo(() => ({ label: "hi", n }), [n]);
  return (
    <div>
      <button onClick={() => setN(n + 1)}>{n}</button>
      <ExpensiveChild {...props} />
    </div>
  );
}

const ExpensiveChild = memo(function ExpensiveChild({ label }) {
  return <span>{label}</span>;
});

export {
  FilteredList,
  ParentList,
  Sum,
  Card,
  Search,
  Sorted,
  Concept,
  HeavySort,
  CheapPlus,
  RefEqualityDemo,
  StaleCallback,
  ConfigParent,
  CompilerNote,
  GraphView,
  InlineOk,
  EffectStable,
  MemoJsxNote,
  StableItemsParent,
  OptChecklist,
  OptimizedList,
  SpreadTrap,
};
