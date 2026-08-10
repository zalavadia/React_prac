// ============================================================================
// 17 — React.memo
// Level: MID  |  Sequence: read this file, then the next number
// ============================================================================
//
// SIMPLE: React.memo = tell child "if my props look the same, don't
// paint again". Parent re-render by default re-renders children too.
// memo shallow compares props — skip when equal.
//
// Works when: expensive child + parent often re-renders + props stable.
// New object/fn in props every time → memo fails (use useCallback/useMemo together).
//
// WHY: List rows, pure presentational widgets optimize.
// INTERVIEW: shallow compare; memo + callback duo; when useless.
// Use in a Vite + React 19 project — teaching file.
//
// ============================================================================

import { memo, useCallback, useState } from "react";

// -----------------------------------------------------------------------------
// Q1: Wrap pure component
//
// Task:
// export default memo(function Expensive({ label }) ...)
//
// In simple words:
// Same label → skip render. Even when parent counter changes.
// -----------------------------------------------------------------------------
const Expensive = memo(function Expensive({ label }) {
  console.log("Expensive render", label);
  return <div>{label}</div>;
});

function Parent() {
  const [n, setN] = useState(0);
  return (
    <div>
      <button onClick={() => setN(n + 1)}>{n}</button>
      <Expensive label="static" />
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q2: Memo breaks on inline object
//
// Task:
// style={{}} new every render → child re-renders.
//
// In simple words:
// Referential inequality. Hoist style or memoize.
// -----------------------------------------------------------------------------
const Box = memo(function Box({ style }) {
  console.log("Box");
  return <div style={style}>Box</div>;
});

function BreakMemo() {
  const [n, setN] = useState(0);
  return (
    <div>
      <button onClick={() => setN(n + 1)}>{n}</button>
      {/* BAD: <Box style={{ color: "red" }} /> */}
      <Box style={staticStyle} />
    </div>
  );
}
const staticStyle = { color: "red" };

// -----------------------------------------------------------------------------
// Q3: memo + useCallback
//
// Task:
// Pass stable onClick to memo child.
//
// In simple words:
// Classic interview duo.
// -----------------------------------------------------------------------------
const Item = memo(function Item({ onClick, text }) {
  return <button onClick={onClick}>{text}</button>;
});

function List() {
  const [n, setN] = useState(0);
  const save = useCallback(() => console.log("save"), []);
  return (
    <div>
      <button onClick={() => setN(n + 1)}>{n}</button>
      <Item text="Save" onClick={save} />
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q4: Custom compare (rare)
//
// Task:
// memo(Comp, (prev, next) => prev.id === next.id)
//
// In simple words:
// true return = props equal = SKIP. Easy to get wrong — default shallow usually enough.
// -----------------------------------------------------------------------------
const Row = memo(
  function Row({ user }) {
    return <div>{user.name}</div>;
  },
  (prev, next) => prev.user.id === next.user.id
);

// -----------------------------------------------------------------------------
// Q5: [MID] Children prop often breaks memo
//
// Task:
// <Memo><span/></Memo> — children is new element every time.
//
// In simple words:
// Element objects are new. Composition + memo needs care.
// -----------------------------------------------------------------------------
const Frame = memo(function Frame({ children }) {
  console.log("Frame");
  return <div>{children}</div>;
});

// -----------------------------------------------------------------------------
// Q6: When NOT to memo
//
// Task:
// Cheap component / props always change — don't wrap.
//
// In simple words:
// Compare cost + mental load. Profile first.
// -----------------------------------------------------------------------------
function Cheap({ t }) {
  return <span>{t}</span>; // memo optional / skip
}

// -----------------------------------------------------------------------------
// Q7: [MID] memo is not useMemo
//
// Task:
// React.memo = component. useMemo = value. Different tools.
//
// In simple words:
// Interview confusion common — keep them clear.
// -----------------------------------------------------------------------------
// memo(Component) vs useMemo(() => value, deps)

// -----------------------------------------------------------------------------
// Q8: List of memo rows
//
// Task:
// Parent filter state; unchanged rows skip with memo + stable props.
//
// In simple words:
// Meaningful in big lists. Virtualization is a separate topic.
// -----------------------------------------------------------------------------
const TodoRow = memo(function TodoRow({ todo, onToggle }) {
  return (
    <li>
      <button onClick={() => onToggle(todo.id)}>{todo.text}</button>
    </li>
  );
});

// -----------------------------------------------------------------------------
// Q9: Shallow compare — what memo checks
//
// Task:
// prevProps.a === nextProps.a — top level only, not nested object fields.
//
// In simple words:
// user object same ref but user.name change → memo skips (shallow pass).
// Don't deep compare — custom areEqual or immutable data.
// -----------------------------------------------------------------------------
const ShallowDemo = memo(function ShallowDemo({ user }) {
  return <span>{user.name}</span>;
});

// -----------------------------------------------------------------------------
// Q10: Custom areEqual — when useful
//
// Task:
// memo(Row, (prev, next) => prev.item.id === next.item.id)
//
// In simple words:
// true return = SKIP render (props "equal"). Feels backwards — be careful.
// Only when same id means whole row is same.
// -----------------------------------------------------------------------------
const ItemRow = memo(
  function ItemRow({ item }) {
    return <div>{item.label}</div>;
  },
  (prev, next) => prev.item.id === next.item.id
);

// -----------------------------------------------------------------------------
// Q11: [MID] Children problem deep dive
//
// Task:
// <MemoParent><div>{dynamic}</div></MemoParent> — children new every render.
//
// In simple words:
// JSX children = prop. Element created every render.
// Fix: memo leaf, hoist children, or restructure composition.
// -----------------------------------------------------------------------------
function ChildrenProblemParent() {
  const [n, setN] = useState(0);
  return (
    <div>
      <button onClick={() => setN(n + 1)}>{n}</button>
      <Frame>
        <span>child {n}</span>
      </Frame>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q12: memo + useCallback full combo demo
//
// Task:
// MemoListItem + stable onClick + stable item ref from normalized store.
//
// In simple words:
// Three pieces: memo child, useCallback handler, stable data refs.
// Interview "golden trio" for list optimization.
// -----------------------------------------------------------------------------
const MemoListItem = memo(function MemoListItem({ id, onPick }) {
  return <button onClick={() => onPick(id)}>{id}</button>;
});

function MemoComboList() {
  const [sel, setSel] = useState(null);
  const onPick = useCallback((id) => setSel(id), []);
  const ids = [1, 2, 3];
  return (
    <ul>
      {ids.map((id) => (
        <MemoListItem key={id} id={id} onPick={onPick} />
      ))}
      <p>{sel}</p>
    </ul>
  );
}

// -----------------------------------------------------------------------------
// Q13: When memo useless — props always change
//
// Task:
// <Clock time={Date.now()} /> — new time every render, memo zero benefit.
//
// In simple words:
// If any prop changes every time — skip memo entirely.
// Compare overhead with no gain.
// -----------------------------------------------------------------------------
function Clock({ time }) {
  return <time>{time}</time>; // skip memo — time changes every tick
}

// -----------------------------------------------------------------------------
// Q14: [MID] memo on component using context
//
// Task:
// memo child consumes context — context change still forces render.
//
// In simple words:
// memo only compares props. Context update = forced re-render.
// Think context split (11) + memo combo.
// -----------------------------------------------------------------------------
function ContextConsumerMemoNote() {
  return <p>Context change beats memo — will render even if props equal.</p>;
}

// -----------------------------------------------------------------------------
// Q15: Default export memo pattern
//
// Task:
// export default memo(MyComponent) — HOC wrap.
//
// In simple words:
// Set displayName for debug: MemoComp.displayName = "MyComponent"
// Named export also common in teaching files.
// -----------------------------------------------------------------------------
const NamedMemo = memo(function NamedMemo({ v }) {
  return <em>{v}</em>;
});
NamedMemo.displayName = "NamedMemo";

// -----------------------------------------------------------------------------
// Q16: Primitive props — memo works great
//
// Task:
// label string, count number — shallow equal easy true.
//
// In simple words:
// Presentational dumb components with primitives = memo sweet spot.
// Parent unrelated field change → child skips.
// -----------------------------------------------------------------------------
const Label = memo(function Label({ text }) {
  return <label>{text}</label>;
});

function PrimitiveMemoParent() {
  const [a, setA] = useState(0);
  const [b] = useState("static");
  return (
    <div>
      <button onClick={() => setA(a + 1)}>{a}</button>
      <Label text={b} />
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q17: [MID] memo vs shouldComponentUpdate legacy
//
// Task:
// Class: shouldComponentUpdate return false. Functional: memo equivalent.
//
// In simple words:
// Interview bridge question class → hooks era.
// PureComponent also shallow compare — same idea.
// -----------------------------------------------------------------------------
function LegacyBridgeNote() {
  return <p>PureComponent / memo = shallow props compare skip render.</p>;
}

// -----------------------------------------------------------------------------
// Q18: Passing unstable default prop
//
// Task:
// items = [] default param — avoid new array every render from module level.
//
// In simple words:
// const EMPTY = []; function C({ items = EMPTY }) — stable default.
// Inline [] default new every call — subtle memo break in parent too.
// -----------------------------------------------------------------------------
const EMPTY_ARR = [];
function ListWithDefault({ items = EMPTY_ARR }) {
  return <ul>{items.map((x) => <li key={x}>{x}</li>)}</ul>;
}

// -----------------------------------------------------------------------------
// Q19: Double memo — usually pointless
//
// Task:
// memo(memo(Comp)) — redundant wrap.
//
// In simple words:
// Once is enough. Nested memo no extra benefit.
// HOC chain different story — but double memo same component is silly.
// -----------------------------------------------------------------------------
function DoubleMemoNote() {
  return <p>memo(memo(X)) = waste. One layer enough.</p>;
}

// -----------------------------------------------------------------------------
// Q20: [MID] Profiler verify memo working
//
// Task:
// React DevTools Profiler — see "MemoChild (Memo)" skipped renders.
//
// In simple words:
// Don't assume memo works — measure.
// Gray = skipped in profiler (React 18+).
// -----------------------------------------------------------------------------
function ProfilerNote() {
  return <p>Use Profiler to confirm memo actually skips renders.</p>;
}

// -----------------------------------------------------------------------------
// Q21: State inside memo component
//
// Task:
// memo child has its own useState — parent re-render, child state safe.
//
// In simple words:
// Skip render = child function doesn't run again — local state preserved.
// Props same → internal state intact. Important interview point.
// -----------------------------------------------------------------------------
const StatefulMemo = memo(function StatefulMemo({ seed }) {
  const [n, setN] = useState(seed);
  return <button onClick={() => setN(n + 1)}>{n}</button>;
});

// -----------------------------------------------------------------------------
// Q22: Anti-pattern — memo everything
//
// Task:
// memo every tiny component — bundle + compare cost, readability down.
//
// In simple words:
// Target hot paths: big lists, heavy charts, frequent parent updates.
// Default: no memo. Add surgically with profiler proof.
// -----------------------------------------------------------------------------
function MemoEverythingNote() {
  return <p>Memo on everything = overkill. Focus on expensive + stable props.</p>;
}

export {
  Expensive,
  Parent,
  Box,
  BreakMemo,
  Item,
  List,
  Row,
  Frame,
  Cheap,
  TodoRow,
  ShallowDemo,
  ItemRow,
  ChildrenProblemParent,
  MemoComboList,
  Clock,
  ContextConsumerMemoNote,
  NamedMemo,
  Label,
  PrimitiveMemoParent,
  LegacyBridgeNote,
  ListWithDefault,
  DoubleMemoNote,
  ProfilerNote,
  StatefulMemo,
  MemoEverythingNote,
};
