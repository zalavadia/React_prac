// ============================================================================
// 26 — Reconciliation And Keys
// Level: MID  |  Sequence: do this first, then the next file in sequence
// ============================================================================
//
// SIMPLE: Reconciliation = React matches old virtual tree to new —
// what is same, new, or deleted. Diff is clever, not perfect.
// Same position + same type → update. Different type → replace.
// key tells React in a list "this is the same item" even if order changed.
//
// Wrong keys = wrong state reuse (wrong name stuck in input). Index key
// classic bug on reorder/delete. key change = intentional remount.
//
// WHY: Deep "how React thinks" interview. Bugs make sense.
// INTERVIEW: diffing heuristic; keys role; remount via key.
// Vite/React 19 project — teaching file.
//
// ============================================================================

import { Fragment, useState } from "react";

// -----------------------------------------------------------------------------
// Q1: Type change remounts
//
// Task:
// Conditional <div> vs <span> same spot — state resets.
//
// In simple words:
// Different type = React destroy + create. State is lost.
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
// Task:
// Both branches <div><Counter/></div> — counter survives.
//
// In simple words:
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
// Task:
// <Counter key={userId} /> fresh state on user change.
//
// In simple words:
// key is identity. Change key = new component identity.
// -----------------------------------------------------------------------------
function UserCounter({ userId }) {
  return <Counter key={userId} label={String(userId)} />;
}

// -----------------------------------------------------------------------------
// Q4: Index key reorder bug demo idea
//
// Task:
// List inputs with key={index}; reverse list — values jump.
//
// In simple words:
// React matches by position. Item move ≠ state move with index keys.
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
// Task:
// key={id}; reverse — each input keeps its value.
//
// In simple words:
// Reconciliation tracks items via keys.
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
// Task:
// Keys tell React what shifted vs what is new.
//
// In simple words:
// Without keys: warning + inefficient/wrong updates.
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
// Task:
// Static docs list OK-ish; todos/filters → ids.
//
// In simple words:
// Rule of thumb to say in interview.
// -----------------------------------------------------------------------------
function Rule() {
  return <p>Dynamic lists → stable unique keys, not index.</p>;
}

// -----------------------------------------------------------------------------
// Q8: Reconciliation is not deep magic optimize always
//
// Task:
// React is smart enough; first get structure + keys right.
//
// In simple words:
// Do not think manual DOM diff. Declare UI for state.
// -----------------------------------------------------------------------------
function Mindset() {
  return <p>Describe UI for state; keys help React match list items.</p>;
}

// -----------------------------------------------------------------------------
// Q9: Fiber mental model — light version
//
// Task:
// Each component = fiber node; work unit reconciles on tree walk.
//
// In simple words:
// Do not go too deep — React traverses tree and applies diff.
// -----------------------------------------------------------------------------
function FiberNote() {
  return (
    <p>
      Fiber: reconcile unit. Same type update props; different type replace node.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q10: [MID] Same component — move to different position
//
// Task:
// Counter first in div, later in span — same type parent change? position matters.
//
// In simple words:
// Tree position + type decide reuse; same component name alone is not always enough.
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
// Q11: Fragment list key — not <>, use <Fragment key>
//
// Task:
// In map wrap Fragment key={id} — shorthand <> cannot take key.
//
// In simple words:
// Grouped siblings in list still need stable key.
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
// Q12: [MID] key on component vs DOM element
//
// Task:
// <Row key={id} /> — tracks Row instance; inner DOM React manages.
//
// In simple words:
// key on list direct child — put on wrapper component, not hidden inside wrong.
// -----------------------------------------------------------------------------
function KeyOnComponent({ items }) {
  return items.map((it) => <Counter key={it.id} label={it.name} />);
}

// -----------------------------------------------------------------------------
// Q13: Props update — no remount, yes re-render
//
// Task:
// Same Counter, label prop change — state (n) preserved.
//
// In simple words:
// Reconciliation update = props patch; state while type+key same.
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
// Q14: [MID] Conditional same slot — key to force fresh
//
// Task:
// {edit ? <Form key="edit" /> : <Form key="view" />} — mode switch reset.
//
// In simple words:
// Same component type same spot — without key state bleeds; key for intentional remount.
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
// Task:
// [a, b, c] map or array literal — stable key per child.
//
// In simple words:
// Dynamic children without keys — warning + wrong reuse.
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
// Q16: [MID] key={undefined} / missing — not index fallback, warning
//
// Task:
// Always give unique stable key in list — React warns on missing.
//
// In simple words:
// Check dev console — key discipline prevents production bugs.
// -----------------------------------------------------------------------------
function KeyWarningNote() {
  return <p>Missing keys: dev warning, reconcile inefficient/wrong state reuse.</p>;
}

// -----------------------------------------------------------------------------
// Q17: [ADV] O(n) heuristic — same level siblings only
//
// Task:
// React does not perfectly detect cross-level move — keep structure stable.
//
// In simple words:
// Interview: diff is linear same depth — why keys + stable structure matter.
// -----------------------------------------------------------------------------
function HeuristicNote() {
  return (
    <p>
      Reconciliation O(n) same-level pass — wrong type/key in deep tree = expensive
      wrong updates.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q18: [ADV] memo bail-out — same props skip reconcile subtree?
//
// Task:
// memo child — props shallow same → React skip render attempt.
//
// In simple words:
// Separate from reconciliation — memo is render phase shortcut; keys are different.
// -----------------------------------------------------------------------------
function MemoReconcileNote() {
  return (
    <p>
      React.memo: skip re-render when props same — bail-out before reconciliation.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q19: [ADV] Portal — reconcile logical tree, DOM separate
//
// Task:
// Portal child reconciles with parent; paints on body DOM.
//
// In simple words:
// Same parent link in fiber tree — keys/rules apply here too.
// -----------------------------------------------------------------------------
function PortalReconcileNote() {
  return <p>Portal: reconcile in React tree; DOM placement separate — keys work normally.</p>;
}

// -----------------------------------------------------------------------------
// Q20: [ADV] Suspense boundary — suspended subtree replace
//
// Task:
// On suspend show fallback; on resume prior state often preserved.
//
// In simple words:
// Remount vs resume is Suspense-specific — key change means full remount.
// -----------------------------------------------------------------------------
function SuspenseKeyNote() {
  return (
    <p>
      Suspense + key change = fresh subtree. Without key change suspend/resume state often
      intact.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q21: [ADV] Identity vs position — interview story
//
// Task:
// key = identity; index = position guess — index fails on reorder.
//
// In simple words:
// "React tracks items by key, not by position" — one-liner.
// -----------------------------------------------------------------------------
function IdentityNote() {
  return <p>Keys identify items across renders; index identifies slot — difference on reorder.</p>;
}

// -----------------------------------------------------------------------------
// Q22: [ADV] Intentional remount — key patterns summary
//
// Task:
// userId change, form reset, mode switch — key={id} remount toolbox.
//
// In simple words:
// Bug fix (stable id) vs feature (reset via key) — both valid use cases.
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
