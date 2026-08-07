// ============================================================================
// 26 — Reconciliation And Keys
// Level: MID  |  Sequence: pehle yeh, phir agla number
// ============================================================================
//
// LAYMAN: Reconciliation = React purane virtual tree ko naye se milata hai —
// kaun same, kaun naya, kaun delete. Diff clever, perfect nahi.
// Same position + same type → update. Alag type → replace.
// key batata list me "yeh wahi item hai" even if order badla.
//
// Galat keys = galat state reuse (input me dusra naam chipak). Index key
// reorder/delete pe classic bug. key change = remount intentional.
//
// KYUN: Deep "React kaise sochta" interview. Bugs samajh aate.
// INTERVIEW: diffing heuristic; keys role; remount via key.
// Vite/React 19 project me use — teaching file.
//
// ============================================================================

import { Fragment, useState } from "react";

// -----------------------------------------------------------------------------
// Q1: Type change remounts
//
// Kya karna hai:
// Conditional <div> vs <span> same jagah — state reset.
//
// Seedha matlab:
// Alag type = React destroy + create. State fly hoti.
// -----------------------------------------------------------------------------
function TypeSwap() {
  const [asDiv, setAsDiv] = useState(true);
  return (
    <div>
      <button onClick={() => setAsDiv(!asDiv)}>Swap</button>
      {asDiv ? <CounterWrap tag="div" /> : <CounterWrap tag="span" />}
    </div>
  );
}

function CounterWrap({ tag: Tag }) {
  const [n, setN] = useState(0);
  return (
    <Tag>
      <button onClick={() => setN(n + 1)}>{n}</button>
    </Tag>
  );
}

// -----------------------------------------------------------------------------
// Q2: Same type preserves state
//
// Kya karna hai:
// Dono branches <div><Counter/></div> — counter zinda.
//
// Seedha matlab:
// Heuristic: type match → update props, keep instance.
// -----------------------------------------------------------------------------
function SameType({ mode }) {
  return (
    <div>
      {mode === "a" ? <Counter label="A" /> : <Counter label="B" />}
    </div>
  );
}

function Counter({ label }) {
  const [n, setN] = useState(0);
  return (
    <button onClick={() => setN(n + 1)}>
      {label}:{n}
    </button>
  );
}

// -----------------------------------------------------------------------------
// Q3: Force remount with key
//
// Kya karna hai:
// <Counter key={userId} /> user change pe fresh state.
//
// Seedha matlab:
// key identity. Change key = nayi component identity.
// -----------------------------------------------------------------------------
function UserCounter({ userId }) {
  return <Counter key={userId} label={String(userId)} />;
}

// -----------------------------------------------------------------------------
// Q4: Index key reorder bug demo idea
//
// Kya karna hai:
// List inputs with key={index}; reverse list — values jump.
//
// Seedha matlab:
// React position pe match. Item move ≠ state move with index keys.
// -----------------------------------------------------------------------------
function IndexBug() {
  const [items, setItems] = useState(["Ada", "Lin"]);
  return (
    <div>
      <button onClick={() => setItems([...items].reverse())}>Reverse</button>
      {items.map((name, i) => (
        <input key={i} defaultValue={name} />
      ))}
      {/* Fix: key={stableId} */}
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q5: [MID] Stable id keys correct reorder
//
// Kya karna hai:
// key={id}; reverse — each input apna value rakhe.
//
// Seedha matlab:
// Reconciliation item track karti keys se.
// -----------------------------------------------------------------------------
function IdKeys() {
  const [items, setItems] = useState([
    { id: "a", name: "Ada" },
    { id: "b", name: "Lin" },
  ]);
  return (
    <div>
      <button onClick={() => setItems([...items].reverse())}>Reverse</button>
      {items.map((it) => (
        <input key={it.id} defaultValue={it.name} />
      ))}
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q6: List insert middle
//
// Kya karna hai:
// Keys se React jaane kaun shift, kaun naya.
//
// Seedha matlab:
// Bina keys warning + inefficient/wrong updates.
// -----------------------------------------------------------------------------
function Insert() {
  const [rows, setRows] = useState([{ id: 1, t: "one" }]);
  function addFront() {
    setRows([{ id: Date.now(), t: "new" }, ...rows]);
  }
  return (
    <div>
      <button onClick={addFront}>Add front</button>
      <ul>
        {rows.map((r) => (
          <li key={r.id}>{r.t}</li>
        ))}
      </ul>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q7: [MID] Don't use array index when list is dynamic
//
// Kya karna hai:
// Static docs list OK-ish; todos/filters → ids.
//
// Seedha matlab:
// Rule of thumb interview me bolo.
// -----------------------------------------------------------------------------
function Rule() {
  return <p>Dynamic lists → stable unique keys, not index.</p>;
}

// -----------------------------------------------------------------------------
// Q8: Reconciliation is not deep magic optimize always
//
// Kya karna hai:
// React enough smart; pehle structure + keys sahi.
//
// Seedha matlab:
// Manual DOM diff mat socho. Declare UI for state.
// -----------------------------------------------------------------------------
function Mindset() {
  return <p>Describe UI for state; keys help React match list items.</p>;
}

// -----------------------------------------------------------------------------
// Q9: Fiber mental model — light version
//
// Kya karna hai:
// Har component = fiber node; work unit reconcile karta tree walk.
//
// Seedha matlab:
// Deep mat jao — bas: React tree traverse karke diff apply karta hai.
// -----------------------------------------------------------------------------
function FiberNote() {
  return (
    <p>
      Fiber: reconcile unit. Same type update props; different type replace node.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q10: [MID] Same component — alag position pe move
//
// Kya karna hai:
// Counter pehle div me, baad span me — same type parent change? position matter.
//
// Seedha matlab:
// Tree position + type decide reuse; sirf component name same kaafi nahi hamesha.
// -----------------------------------------------------------------------------
function MoveCounter({ onTop }) {
  return onTop ? (
    <div>
      <Counter label="top" />
      <p>rest</p>
    </div>
  ) : (
    <div>
      <p>rest</p>
      <Counter label="bottom" />
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q11: Fragment list me key — <> nahi, <Fragment key>
//
// Kya karna hai:
// map me Fragment key={id} wrap — shorthand <> key nahi de sakta.
//
// Seedha matlab:
// Grouped siblings list me bhi stable key chahiye.
// -----------------------------------------------------------------------------
function FragmentList({ pairs }) {
  return (
    <ul>
      {pairs.map(([id, a, b]) => (
        <Fragment key={id}>
          <li>{a}</li>
          <li>{b}</li>
        </Fragment>
      ))}
    </ul>
  );
}

// -----------------------------------------------------------------------------
// Q12: [MID] key component pe vs DOM element pe
//
// Kya karna hai:
// <Row key={id} /> — Row instance track; inner DOM React manage.
//
// Seedha matlab:
// key list direct child pe — wrapper component pe lagao, andar mat chhupao wrong.
// -----------------------------------------------------------------------------
function KeyOnComponent({ items }) {
  return items.map((it) => <Counter key={it.id} label={it.name} />);
}

// -----------------------------------------------------------------------------
// Q13: Props update — remount nahi, re-render haan
//
// Kya karna hai:
// Same Counter, label prop change — state (n) preserve.
//
// Seedha matlab:
// Reconciliation update = props patch; state tab tak jab tak type+key same.
// -----------------------------------------------------------------------------
function PropUpdateDemo() {
  const [label, setLabel] = useState("A");
  return (
    <div>
      <button onClick={() => setLabel(label === "A" ? "B" : "A")}>Toggle label</button>
      <Counter label={label} />
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q14: [MID] Conditional same slot — key se force fresh
//
// Kya karna hai:
// {edit ? <Form key="edit" /> : <Form key="view" />} — mode switch reset.
//
// Seedha matlab:
// Same component type same jagah — bina key state bleed; key se intentional remount.
// -----------------------------------------------------------------------------
function EditViewSwitch({ editing }) {
  return editing ? (
    <Counter key="edit" label="edit mode" />
  ) : (
    <Counter key="view" label="view mode" />
  );
}

// -----------------------------------------------------------------------------
// Q15: Children array — explicit keys
//
// Kya karna hai:
// [a, b, c] map ya array literal — har child stable key.
//
// Seedha matlab:
// Dynamic children bina keys — warning + wrong reuse.
// -----------------------------------------------------------------------------
function ChildArray({ parts }) {
  return (
    <div>
      {parts.map((p) => (
        <span key={p.id}>{p.text}</span>
      ))}
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q16: [MID] key={undefined} / missing — index fallback nahi, warning
//
// Kya karna hai:
// List me key hamesha unique stable do — React warn karega missing pe.
//
// Seedha matlab:
// Dev console check — keys discipline production bugs rokti.
// -----------------------------------------------------------------------------
function KeyWarningNote() {
  return <p>Missing keys: dev warning, reconcile inefficient/wrong state reuse.</p>;
}

// -----------------------------------------------------------------------------
// Q17: [ADV] O(n) heuristic — same level siblings only
//
// Kya karna hai:
// React cross-level move detect nahi perfect — structure stable rakho.
//
// Seedha matlab:
// Interview: diff linear same depth — isliye keys + stable structure matter.
// -----------------------------------------------------------------------------
function HeuristicNote() {
  return (
    <p>
      Reconciliation O(n) same-level pass — deep tree me type/key galat = expensive
      wrong updates.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q18: [ADV] memo bail-out — same props skip reconcile subtree?
//
// Kya karna hai:
// memo child — props shallow same → React skip render attempt.
//
// Seedha matlab:
// Reconciliation se alag — memo render phase shortcut; keys alag concept.
// -----------------------------------------------------------------------------
function MemoReconcileNote() {
  return (
    <p>
      React.memo: props same ho to re-render skip — reconciliation se pehle bail-out.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q19: [ADV] Portal — reconcile logical tree, DOM alag
//
// Kya karna hai:
// Portal child parent ke saath reconcile; DOM body pe paint.
//
// Seedha matlab:
// Fiber tree me parent link same — keys/rules yahan bhi apply.
// -----------------------------------------------------------------------------
function PortalReconcileNote() {
  return <p>Portal: reconcile React tree me; DOM placement alag — keys normal kaam.</p>;
}

// -----------------------------------------------------------------------------
// Q20: [ADV] Suspense boundary — suspended subtree replace
//
// Kya karna hai:
// Suspend pe fallback dikhe; resume pe prior state often preserve.
//
// Seedha matlab:
// Remount vs resume Suspense specific — key change pe full remount.
// -----------------------------------------------------------------------------
function SuspenseKeyNote() {
  return (
    <p>
      Suspense + key change = fresh subtree. Bina key suspend/resume state often
      intact.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q21: [ADV] Identity vs position — interview story
//
// Kya karna hai:
// key = identity; index = position guess — reorder pe index fail.
//
// Seedha matlab:
// "React item track karta key se, position se nahi" — one-liner.
// -----------------------------------------------------------------------------
function IdentityNote() {
  return <p>Keys identify items across renders; index identifies slot — reorder pe farq.</p>;
}

// -----------------------------------------------------------------------------
// Q22: [ADV] Intentional remount — key patterns summary
//
// Kya karna hai:
// userId change, form reset, mode switch — key={id} remount toolbox.
//
// Seedha matlab:
// Bug fix (stable id) vs feature (reset via key) — dono valid use cases.
// -----------------------------------------------------------------------------
function KeyInterview() {
  return (
    <ol>
      <li>Same type + same key → update props, keep state</li>
      <li>Different type → replace, state loss</li>
      <li>Stable unique keys in dynamic lists</li>
      <li>Index keys bad on reorder/delete</li>
      <li>key change = intentional remount / reset</li>
    </ol>
  );
}

export {
  TypeSwap,
  SameType,
  UserCounter,
  IndexBug,
  IdKeys,
  Insert,
  Rule,
  Mindset,
  FiberNote,
  MoveCounter,
  FragmentList,
  KeyOnComponent,
  PropUpdateDemo,
  EditViewSwitch,
  ChildArray,
  KeyWarningNote,
  HeuristicNote,
  MemoReconcileNote,
  PortalReconcileNote,
  SuspenseKeyNote,
  IdentityNote,
  KeyInterview,
};
