// ============================================================================
// 17 — React.memo
// Level: MID  |  Sequence: pehle yeh, phir agla number
// ============================================================================
//
// LAYMAN: React.memo = child se kehna "agar meri props same dikhein to
// dubara mat paint". Parent re-render pe default children bhi re-render.
// memo shallow compare props — skip jab equal.
//
// Kaam tab: expensive child + parent aksar re-render + props stable.
// Props me naya object/fn har baar → memo fail (useCallback/useMemo saath).
//
// KYUN: List rows, pure presentational widgets optimize.
// INTERVIEW: shallow compare; memo + callback duo; when useless.
// Vite/React 19 project me use — teaching file.
//
// ============================================================================

import { memo, useCallback, useState } from "react";

// -----------------------------------------------------------------------------
// Q1: Wrap pure component
//
// Kya karna hai:
// export default memo(function Expensive({ label }) ...)
//
// Seedha matlab:
// Same label → skip render. Parent counter badle to bhi.
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
// Kya karna hai:
// style={{}} har render naya → child re-render.
//
// Seedha matlab:
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
// Kya karna hai:
// onClick stable pass to memo child.
//
// Seedha matlab:
// Duo classic interview answer.
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
// Kya karna hai:
// memo(Comp, (prev, next) => prev.id === next.id)
//
// Seedha matlab:
// true return = props equal = SKIP. Easy galat — default shallow usually enough.
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
// Kya karna hai:
// <Memo><span/></Memo> — children naya element har baar.
//
// Seedha matlab:
// Element objects naye. Composition + memo careful.
// -----------------------------------------------------------------------------
const Frame = memo(function Frame({ children }) {
  console.log("Frame");
  return <div>{children}</div>;
});

// -----------------------------------------------------------------------------
// Q6: When NOT to memo
//
// Kya karna hai:
// Cheap component / props hamesha change — mat wrap.
//
// Seedha matlab:
// Compare cost + mental load. Profile pehle.
// -----------------------------------------------------------------------------
function Cheap({ t }) {
  return <span>{t}</span>; // memo optional / skip
}

// -----------------------------------------------------------------------------
// Q7: [MID] memo is not useMemo
//
// Kya karna hai:
// React.memo = component. useMemo = value. Alag tools.
//
// Seedha matlab:
// Interview confusion common — clear rakho.
// -----------------------------------------------------------------------------
// memo(Component) vs useMemo(() => value, deps)

// -----------------------------------------------------------------------------
// Q8: List of memo rows
//
// Kya karna hai:
// Parent filter state; unchanged rows skip with memo + stable props.
//
// Seedha matlab:
// Big lists me meaningful. Virtualization alag topic.
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
// Kya karna hai:
// prevProps.a === nextProps.a — top level only, nested object fields nahi.
//
// Seedha matlab:
// user object same ref but user.name change → memo skip (shallow pass).
// Deep compare mat — custom areEqual ya immutable data.
// -----------------------------------------------------------------------------
const ShallowDemo = memo(function ShallowDemo({ user }) {
  return <span>{user.name}</span>;
});

// -----------------------------------------------------------------------------
// Q10: Custom areEqual — when useful
//
// Kya karna hai:
// memo(Row, (prev, next) => prev.item.id === next.item.id)
//
// Seedha matlab:
// true return = SKIP render (props "equal"). Ulta lagta hai — dhyan se.
// Sirf jab id same pe poora row same maan sakte ho.
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
// Kya karna hai:
// <MemoParent><div>{dynamic}</div></MemoParent> — children har render naya.
//
// Seedha matlab:
// JSX children = prop. Element create hota hai har render.
// Fix: memo leaf, children hoist, ya composition restructure.
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
// Kya karna hai:
// MemoListItem + stable onClick + stable item ref from normalized store.
//
// Seedha matlab:
// Teen piece: memo child, useCallback handler, stable data refs.
// Interview "golden trio" list optimization ke liye.
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
// Kya karna hai:
// <Clock time={Date.now()} /> — har render naya time, memo zero benefit.
//
// Seedha matlab:
// Agar koi prop har baar change ho — skip memo entirely.
// Compare overhead bina gain.
// -----------------------------------------------------------------------------
function Clock({ time }) {
  return <time>{time}</time>; // memo mat — time har tick change
}

// -----------------------------------------------------------------------------
// Q14: [MID] memo on component using context
//
// Kya karna hai:
// memo child context consume kare — context change pe render hoga anyway.
//
// Seedha matlab:
// memo sirf props compare karta hai. Context update = re-render forced.
// Context split (11) + memo combo socho.
// -----------------------------------------------------------------------------
function ContextConsumerMemoNote() {
  return <p>Context change beats memo — props equal bhi render hoga.</p>;
}

// -----------------------------------------------------------------------------
// Q15: Default export memo pattern
//
// Kya karna hai:
// export default memo(MyComponent) — HOC wrap.
//
// Seedha matlab:
// displayName set karo debug ke liye: MemoComp.displayName = "MyComponent"
// Named export bhi common teaching files me.
// -----------------------------------------------------------------------------
const NamedMemo = memo(function NamedMemo({ v }) {
  return <em>{v}</em>;
});
NamedMemo.displayName = "NamedMemo";

// -----------------------------------------------------------------------------
// Q16: Primitive props — memo works great
//
// Kya karna hai:
// label string, count number — shallow equal easy true.
//
// Seedha matlab:
// Presentational dumb components with primitives = memo sweet spot.
// Parent state unrelated field change → child skip.
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
// Kya karna hai:
// Class: shouldComponentUpdate return false. Functional: memo equivalent.
//
// Seedha matlab:
// Interview bridge question class → hooks era.
// PureComponent bhi shallow compare — same idea.
// -----------------------------------------------------------------------------
function LegacyBridgeNote() {
  return <p>PureComponent / memo = shallow props compare skip render.</p>;
}

// -----------------------------------------------------------------------------
// Q18: Passing unstable default prop
//
// Kya karna hai:
// items = [] default param — har render naya array module level se bachao.
//
// Seedha matlab:
// const EMPTY = []; function C({ items = EMPTY }) — stable default.
// Inline [] default har call naya — subtle memo break parent me bhi.
// -----------------------------------------------------------------------------
const EMPTY_ARR = [];
function ListWithDefault({ items = EMPTY_ARR }) {
  return <ul>{items.map((x) => <li key={x}>{x}</li>)}</ul>;
}

// -----------------------------------------------------------------------------
// Q19: Double memo — usually pointless
//
// Kya karna hai:
// memo(memo(Comp)) — redundant wrap.
//
// Seedha matlab:
// Ek baar kaafi. Nested memo koi extra benefit nahi.
// HOC chain me alag baat — par double memo same component silly.
// -----------------------------------------------------------------------------
function DoubleMemoNote() {
  return <p>memo(memo(X)) = waste. Ek layer enough.</p>;
}

// -----------------------------------------------------------------------------
// Q20: [MID] Profiler verify memo working
//
// Kya karna hai:
// React DevTools Profiler — "MemoChild (Memo)" skipped renders dekho.
//
// Seedha matlab:
// Assume mat karo memo kaam kar raha — measure.
// Gray = skipped in profiler (React 18+).
// -----------------------------------------------------------------------------
function ProfilerNote() {
  return <p>Profiler se confirm karo memo actually skip kar raha hai.</p>;
}

// -----------------------------------------------------------------------------
// Q21: State inside memo component
//
// Kya karna hai:
// memo child apna useState — parent re-render pe bhi child state safe.
//
// Seedha matlab:
// Skip render = child function dubara nahi chalti — local state preserved.
// Props same → internal state intact. Important interview point.
// -----------------------------------------------------------------------------
const StatefulMemo = memo(function StatefulMemo({ seed }) {
  const [n, setN] = useState(seed);
  return <button onClick={() => setN(n + 1)}>{n}</button>;
});

// -----------------------------------------------------------------------------
// Q22: Anti-pattern — memo everything
//
// Kya karna hai:
// Har chhoti component memo — bundle + compare cost, readability down.
//
// Seedha matlab:
// Target hot paths: big lists, heavy charts, frequent parent updates.
// Default: no memo. Add surgically with profiler proof.
// -----------------------------------------------------------------------------
function MemoEverythingNote() {
  return <p>Sab pe memo = overkill. Expensive + stable props pe focus.</p>;
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
