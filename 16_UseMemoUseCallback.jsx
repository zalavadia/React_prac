// ============================================================================
// 16 — useMemo And useCallback
// Level: MID  |  Sequence: pehle yeh, phir agla number
// ============================================================================
//
// LAYMAN: useMemo = mehengi cooking pehle se tiffin me — deps same to dubara
// mat paka. useCallback = function ka same reference rakh (deps same).
//
// Dono OPTIMIZATION tools — pehle sahi code, phir measure, phir memoize.
// Overuse = complexity + kabhi kabhi slower (deps compare cost).
//
// KYUN: Heavy calc; stable fn for memo children / effect deps.
// INTERVIEW: referential equality; when NOT to memoize; deps mistakes.
// Vite/React 19 project me use — teaching file.
//
// ============================================================================

import { memo, useCallback, useEffect, useMemo, useState } from "react";

// -----------------------------------------------------------------------------
// Q1: useMemo heavy filter
//
// Kya karna hai:
// bigList filter jab query change.
//
// Seedha matlab:
// Har parent keystroke pe O(n) save — jab list genuinely badi.
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
// Kya karna hai:
// onSelect = useCallback(..., [deps]) memo child ke liye.
//
// Seedha matlab:
// Inline () => onSelect(id) har render naya. Callback + memo = skip render.
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
// Kya karna hai:
// total = a+b — useMemo waste.
//
// Seedha matlab:
// Cheap calc pehle se sasta. Premature optimization avoid.
// -----------------------------------------------------------------------------
function Sum({ a, b }) {
  const total = a + b; // ✅ no useMemo needed
  return <p>{total}</p>;
}

// -----------------------------------------------------------------------------
// Q4: Object/array dependency trap
//
// Kya karna hai:
// useMemo(() => ({...}), [user.id]) — poora user object mat deps me befikr.
//
// Seedha matlab:
// Naya object literal parent se → memo toot. Stabilize parent ya pick fields.
// -----------------------------------------------------------------------------
function Card({ userId }) {
  const options = useMemo(() => ({ id: userId, mode: "view" }), [userId]);
  return <pre>{JSON.stringify(options)}</pre>;
}

// -----------------------------------------------------------------------------
// Q5: [MID] useMemo for context value (see 11)
//
// Kya karna hai:
// Provider value object memoize.
//
// Seedha matlab:
// Context consumers tabhi re-render jab value identity change.
// -----------------------------------------------------------------------------
// const value = useMemo(() => ({ n, setN }), [n]);

// -----------------------------------------------------------------------------
// Q6: [MID] useCallback deps must be right
//
// Kya karna hai:
// Callback me use hone wali values deps me.
//
// Seedha matlab:
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
// Kya karna hai:
// sorted = useMemo(() => [...items].sort(), [items])
//
// Seedha matlab:
// Sorted alag state mat — derive + optional memo.
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
// Kya karna hai:
// Naye setups me compiler auto memo — phir bhi concept samjho interview ke liye.
//
// Seedha matlab:
// Manual useMemo/useCallback ab bhi legacy + intentional optimize me.
// Yeh file teaching — pehle mental model.
// -----------------------------------------------------------------------------
function Concept() {
  return <p>Measure first, memo second.</p>;
}

// -----------------------------------------------------------------------------
// Q9: When useMemo helps — expensive calc
//
// Kya karna hai:
// 10k items sort/filter — deps [items, sortKey] pe memo.
//
// Seedha matlab:
// Measurable slow render → memo try. DevTools Profiler se verify.
// Micro lists pe memo overhead > savings.
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
// Kya karna hai:
// useMemo(() => x + 1, [x]) jab x har render change — waste.
//
// Seedha matlab:
// Memo cost: memory + deps compare. Kabhi slower bana deta hai.
// Premature optimization = complexity bina gain.
// -----------------------------------------------------------------------------
function CheapPlus({ x }) {
  return <p>{x + 1}</p>; // useMemo mat — sasta hai
}

// -----------------------------------------------------------------------------
// Q11: [MID] Referential equality explained
//
// Kya karna hai:
// {} === {} false — har render naya object, memo child fail.
//
// Seedha matlab:
// JS reference compare. useMemo/useCallback same reference preserve karte hain.
// React.memo bhi shallow reference check karta hai props pe.
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
// Kya karna hai:
// useCallback(() => doThing(id), []) — id stale reh jayega.
//
// Seedha matlab:
// Missing dep = bug. ESLint exhaustive-deps suno.
// Functional update ya ref pattern jab intentional stable chahiye.
// -----------------------------------------------------------------------------
function StaleCallback({ id }) {
  const log = useCallback(() => console.log(id), [id]); // id deps me
  return <button onClick={log}>Log {id}</button>;
}

// -----------------------------------------------------------------------------
// Q13: useMemo for stable object to memo child
//
// Kya karna hai:
// const config = useMemo(() => ({ theme, size }), [theme, size])
//
// Seedha matlab:
// Memo child ko object prop pass — memoize object warna useless.
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
// Kya karna hai:
// Compiler analyze karke khud memo insert — manual kam ho sakta hai.
//
// Seedha matlab:
// Concept ab bhi interview me: referential equality, deps samjho.
// Legacy code + edge cases me manual useMemo/useCallback rahega.
// "Measure first" rule compiler ke baad bhi valid.
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
// Kya karna hai:
// Expensive init bhi: useMemo(() => buildGraph(data), [data])
//
// Seedha matlab:
// Lazy init useState(() => ...) bhi option first mount ke liye.
// useMemo jab data change pe rebuild chahiye.
// -----------------------------------------------------------------------------
function GraphView({ data }) {
  const graph = useMemo(() => data.map((d) => ({ ...d, score: d.v * 2 })), [data]);
  return <pre>{JSON.stringify(graph)}</pre>;
}

// -----------------------------------------------------------------------------
// Q16: Inline function in JSX — when OK
//
// Kya karna hai:
// onClick={() => setX(1)} — cheap child, no memo → fine.
//
// Seedha matlab:
// Har jagah useCallback mat lagao. Memo child + list row tab matter.
// Readability > micro-opt usually.
// -----------------------------------------------------------------------------
function InlineOk() {
  const [n, setN] = useState(0);
  return <button onClick={() => setN(1)}>{n}</button>;
}

// -----------------------------------------------------------------------------
// Q17: [MID] useCallback for effect dependency stability
//
// Kya karna hai:
// const load = useCallback(...); useEffect(() => { load() }, [load]);
//
// Seedha matlab:
// Effect ko stable fn chahiye warna infinite loop / extra runs.
// Alternative: logic effect ke andar inline.
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
// Kya karna hai:
// useMemo(() => <Expensive />, []) — rare, often smell.
//
// Seedha matlab:
// Component memo wrap better than memo JSX element.
// children element har render naya — parent memo strategy socho.
// -----------------------------------------------------------------------------
function MemoJsxNote() {
  return <p>useMemo JSX ke liye last resort — React.memo component pe.</p>;
}

// -----------------------------------------------------------------------------
// Q19: Deps array reference — items prop
//
// Kya karna hai:
// Parent har render items={[...]} naya array → useMemo rerun.
//
// Seedha matlab:
// Stabilize data source parent me. Redux/state same ref jab data same.
// Memo downstream tabhi kaam jab upstream stable.
// -----------------------------------------------------------------------------
function StableItemsParent() {
  const [items] = useState([{ id: 1, name: "a" }]); // stable ref
  return <FilteredList items={items} query="" />;
}

// -----------------------------------------------------------------------------
// Q20: [MID] Premature optimization checklist
//
// Kya karna hai:
// 1) Profile 2) Bottleneck confirm 3) Memo targeted 4) Re-profile.
//
// Seedha matlab:
// Bina measure memo = guesswork. Interview: "default no memo until proven slow."
// Readable code pehle, optimize baad me.
// -----------------------------------------------------------------------------
function OptChecklist() {
  return <ol><li>Profile</li><li>Prove slow</li><li>Memo surgical</li></ol>;
}

// -----------------------------------------------------------------------------
// Q21: useMemo + useCallback together in list
//
// Kya karna hai:
// Parent: filtered useMemo, onToggle useCallback, Row memo.
//
// Seedha matlab:
// Full stack optimization pattern — sirf big lists me worth.
// Ek piece missing → poora chain fail.
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
// Kya karna hai:
// <Child {...objectLit} /> har render naya spread object.
//
// Seedha matlab:
// Pick primitives ya memoize props object.
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
