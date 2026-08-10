// ============================================================================
// 07 — Lists And Keys
// Level: BASE  |  Sequence: read this file, then the next number
// ============================================================================
//
// SIMPLE: List = many bowls on a tray. map() turns array → JSX items.
// key = name tag for each item — React knows what moved/added/deleted.
// Without correct keys React gets confused — wrong state, flicker, bugs.
//
// key={index} is last resort — breaks on reorder/delete.
// Stable id (db id, uuid) is best. key prop is not passed to child as props.
//
// WHY: Every dashboard/table/feed uses lists.
// INTERVIEW: why keys; index as key problem; reconciliation (26).
// Use in a Vite + React 19 project — teaching file (do not run with node alone).
//
// ============================================================================

import { Fragment, useState } from "react";

// -----------------------------------------------------------------------------
// Q1: List with map
//
// Task:
// fruits.map(f => <li key={f}>{f}</li>)
//
// In simple words:
// Array → elements. map goes inside { } in return.
// -----------------------------------------------------------------------------
function FruitList() {
  const fruits = ["Mango", "Apple", "Banana"];
  return (
    <ul>
      {fruits.map((f) => (
        <li key={f}>{f}</li>
      ))}
    </ul>
  );
}

// -----------------------------------------------------------------------------
// Q2: Objects with id keys
//
// Task:
// key={user.id} on users.
//
// In simple words:
// Real data has unique id. Names can duplicate — ids should not.
// -----------------------------------------------------------------------------
function UserList() {
  const users = [
    { id: 1, name: "Ada" },
    { id: 2, name: "Lin" },
  ];
  return (
    <ul>
      {users.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
}

// -----------------------------------------------------------------------------
// Q3: Dynamic add + key
//
// Task:
// Add item with button; update list.
//
// In simple words:
// State array + map. Keep key stable (id counter).
// -----------------------------------------------------------------------------
function DynamicList() {
  const [items, setItems] = useState([
    { id: 1, text: "One" },
  ]);
  const [nextId, setNextId] = useState(2);
  function add() {
    setItems([...items, { id: nextId, text: `Item ${nextId}` }]);
    setNextId(nextId + 1);
  }
  return (
    <div>
      <button onClick={add}>Add</button>
      <ul>
        {items.map((it) => (
          <li key={it.id}>{it.text}</li>
        ))}
      </ul>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q4: Filter list (derived)
//
// Task:
// Show only active todos — filter + map.
//
// In simple words:
// Derived list in render is fine. Do not create extra state just to sync.
// -----------------------------------------------------------------------------
function ActiveTodos({ todos }) {
  const active = todos.filter((t) => !t.done);
  return (
    <ul>
      {active.map((t) => (
        <li key={t.id}>{t.text}</li>
      ))}
    </ul>
  );
}

// -----------------------------------------------------------------------------
// Q5: Delete by id
//
// Task:
// Remove with filter; key on id.
//
// In simple words:
// Correct key → React preserves state on remaining items.
// -----------------------------------------------------------------------------
function Removable() {
  const [items, setItems] = useState([
    { id: "a", text: "A" },
    { id: "b", text: "B" },
  ]);
  return (
    <ul>
      {items.map((it) => (
        <li key={it.id}>
          {it.text}
          <button onClick={() => setItems(items.filter((x) => x.id !== it.id))}>
            x
          </button>
        </li>
      ))}
    </ul>
  );
}

// -----------------------------------------------------------------------------
// Q6: [MID] Index as key — when it causes problems
//
// Task:
// Reorder list with inputs — index key can stick wrong input value.
//
// In simple words:
// Index = position. Item moves → React thinks same position = same component.
// Index OK-ish for static never-reorder list; prefer id.
// -----------------------------------------------------------------------------
function IndexKeyWarning() {
  // Prefer: key={item.id} not key={index}
  const items = ["x", "y"];
  return (
    <ul>
      {items.map((text, index) => (
        <li key={index}>{text}</li>
      ))}
    </ul>
  );
}

// -----------------------------------------------------------------------------
// Q7: Nested lists
//
// Task:
// Categories → products; unique keys at both levels.
//
// In simple words:
// Key unique among siblings. Same id in different lists is OK.
// -----------------------------------------------------------------------------
function Catalog({ categories }) {
  return (
    <div>
      {categories.map((cat) => (
        <section key={cat.id}>
          <h3>{cat.name}</h3>
          <ul>
            {cat.products.map((p) => (
              <li key={p.id}>{p.title}</li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q8: [MID] key helps remount
//
// Task:
// Form reset: change key={userId} → component remounts, state wipes.
//
// In simple words:
// Trick: key change = React destroys old, creates new. Intentional reset.
// -----------------------------------------------------------------------------
function Editor({ userId }) {
  return <UserForm key={userId} userId={userId} />;
}

function UserForm({ userId }) {
  const [draft, setDraft] = useState("");
  return (
    <input
      value={draft}
      onChange={(e) => setDraft(e.target.value)}
      placeholder={`Edit user ${userId}`}
    />
  );
}

// -----------------------------------------------------------------------------
// Q9: Empty list UX
//
// Task:
// When items.length === 0, show friendly message + CTA button.
//
// In simple words:
// Do not leave blank ul — tell user the next step.
// -----------------------------------------------------------------------------
function EmptyTodos({ todos, onAdd }) {
  if (todos.length === 0) {
    return (
      <div>
        <p>No todos yet</p>
        <button onClick={onAdd}>Create first todo</button>
      </div>
    );
  }
  return (
    <ul>
      {todos.map((t) => (
        <li key={t.id}>{t.text}</li>
      ))}
    </ul>
  );
}

// -----------------------------------------------------------------------------
// Q10: When index key is OK
//
// Task:
// Static list — never reorder/delete, display only.
//
// In simple words:
// ["Mon","Tue","Wed"] fixed — index is fine. Not for lists with input/state.
// -----------------------------------------------------------------------------
function Weekdays() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  return (
    <ul>
      {days.map((d, i) => (
        <li key={i}>{d}</li>
      ))}
    </ul>
  );
}

// -----------------------------------------------------------------------------
// Q11: [MID] Reorder bug with index keys
//
// Task:
// List reorder + checkbox — wrong item may stay checked with index key.
//
// In simple words:
// React treats position as identity with index. Reorder = wrong state reuse.
// -----------------------------------------------------------------------------
function ReorderBugDemo() {
  const [items, setItems] = useState([
    { id: "a", label: "Apple" },
    { id: "b", label: "Banana" },
  ]);
  function reverse() {
    setItems([...items].reverse());
  }
  return (
    <div>
      <button onClick={reverse}>Reverse</button>
      <ul>
        {items.map((it) => (
          <li key={it.id}>
            <input type="checkbox" /> {it.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q12: Fragment with key in list
//
// Task:
// In map use <Fragment key={id}> or <React.Fragment key={id}>.
//
// In simple words:
// Key on Fragment when one item returns multiple top-level nodes.
// -----------------------------------------------------------------------------
function PairedRows({ rows }) {
  return (
    <dl>
      {rows.map((r) => (
        <Fragment key={r.id}>
          <dt>{r.term}</dt>
          <dd>{r.def}</dd>
        </Fragment>
      ))}
    </dl>
  );
}

// -----------------------------------------------------------------------------
// Q13: Sort list — key id should stay the same
//
// Task:
// Change order with sort(), keep key={item.id}, do not change key.
//
// In simple words:
// Sort = reorder, not new items. Stable id → React moves correctly.
// -----------------------------------------------------------------------------
function SortedNames({ names }) {
  const sorted = [...names].sort((a, b) => a.localeCompare(b));
  return (
    <ul>
      {sorted.map((n) => (
        <li key={n.id}>{n.text}</li>
      ))}
    </ul>
  );
}

// -----------------------------------------------------------------------------
// Q14: Filter + map — keys from source array
//
// Task:
// filtered.map — key from original item.id, not index.
//
// In simple words:
// Stable id in filtered list too. Index shifts after filter.
// -----------------------------------------------------------------------------
function DoneTodos({ todos }) {
  const done = todos.filter((t) => t.done);
  return (
    <ul>
      {done.map((t) => (
        <li key={t.id}>{t.text}</li>
      ))}
    </ul>
  );
}

// -----------------------------------------------------------------------------
// Q15: Duplicate keys warning
//
// Task:
// Two items with same key={1} — React warns, unpredictable behavior.
//
// In simple words:
// Keys must be unique among siblings. Duplicate = broken reconciliation.
// -----------------------------------------------------------------------------
function UniqueKeyRule({ items }) {
  // BAD: key={items[0].category} if categories repeat
  return (
    <ul>
      {items.map((it) => (
        <li key={it.id}>{it.name}</li>
      ))}
    </ul>
  );
}

// -----------------------------------------------------------------------------
// Q16: Inline list creation anti-pattern
//
// Task:
// {[1,2,3].map(...)} in render — new array every render (minor perf).
//
// In simple words:
// Small lists OK; large data from state/props. keys still needed.
// -----------------------------------------------------------------------------
function InlineList() {
  return (
    <ul>
      {[1, 2, 3].map((n) => (
        <li key={n}>Item {n}</li>
      ))}
    </ul>
  );
}

// -----------------------------------------------------------------------------
// Q17: [MID] Virtualization mention
//
// Task:
// 10,000 rows — full map is slow; react-window renders only visible rows.
//
// In simple words:
// Same key concept — stable id in visible slice too. Do not put all in DOM.
// -----------------------------------------------------------------------------
function BigListNote({ items }) {
  // Real app: <FixedSizeList itemKey={(i) => items[i].id} ... />
  const visible = items.slice(0, 50);
  return (
    <ul>
      {visible.map((it) => (
        <li key={it.id}>{it.text}</li>
      ))}
    </ul>
  );
}

// -----------------------------------------------------------------------------
// Q18: List + conditional empty inside map
//
// Task:
// Return null inside items.map to skip — filter first is better.
//
// In simple words:
// null in map is OK but filter + map is clearer for hidden items.
// -----------------------------------------------------------------------------
function VisibleOnly({ items }) {
  return (
    <ul>
      {items
        .filter((it) => !it.hidden)
        .map((it) => (
          <li key={it.id}>{it.text}</li>
        ))}
    </ul>
  );
}

// -----------------------------------------------------------------------------
// Q19: Composite key fallback
//
// Task:
// No id? key={`${catId}-${sku}`} — better than index if combo is stable.
//
// In simple words:
// Composite as last resort. Never Math.random() key — remounts every render.
// -----------------------------------------------------------------------------
function CompositeKey({ categoryId, products }) {
  return (
    <ul>
      {products.map((p) => (
        <li key={`${categoryId}-${p.sku}`}>{p.name}</li>
      ))}
    </ul>
  );
}

// -----------------------------------------------------------------------------
// Q20: key prop not received by child
//
// Task:
// <Row key={id} id={id} /> — props.key is undefined inside Row.
//
// In simple words:
// key is internal to React. Pass id as separate prop if you need it.
// -----------------------------------------------------------------------------
function Row({ id, label }) {
  return <tr data-id={id}><td>{label}</td></tr>;
}

function Table({ rows }) {
  return (
    <table>
      <tbody>
        {rows.map((r) => (
          <Row key={r.id} id={r.id} label={r.label} />
        ))}
      </tbody>
    </table>
  );
}

// -----------------------------------------------------------------------------
// Q21: [ADV] key remount reset state — deep
//
// Task:
// <ChatRoom key={roomId} /> — room change wipes old chat state.
//
// In simple words:
// Better than useEffect reset when you want a fresh subtree.
// -----------------------------------------------------------------------------
function ChatRoom({ roomId }) {
  const [draft, setDraft] = useState("");
  return (
    <input
      value={draft}
      onChange={(e) => setDraft(e.target.value)}
      placeholder={`Room ${roomId}`}
    />
  );
}

function ChatSwitcher({ roomId }) {
  return <ChatRoom key={roomId} roomId={roomId} />;
}

// -----------------------------------------------------------------------------
// Q22: Spread new array on update
//
// Task:
// setItems([...items, newOne]) — do not items.push.
//
// In simple words:
// Immutable update → React detects change. Same reference → skip re-render bug.
// -----------------------------------------------------------------------------
function AppendItem() {
  const [items, setItems] = useState([{ id: 1, text: "First" }]);
  function add() {
    setItems([...items, { id: Date.now(), text: "New" }]);
  }
  return (
    <div>
      <button onClick={add}>Add</button>
      <ul>
        {items.map((it) => (
          <li key={it.id}>{it.text}</li>
        ))}
      </ul>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q23: List item component extract
//
// Task:
// Do not keep long map callback — <TodoItem key={t.id} todo={t} />.
//
// In simple words:
// key goes on parent map. Child does not need key passed inside.
// -----------------------------------------------------------------------------
function TodoItem({ todo }) {
  return <li>{todo.text}</li>;
}

function TodoList({ todos }) {
  return (
    <ul>
      {todos.map((t) => (
        <TodoItem key={t.id} todo={t} />
      ))}
    </ul>
  );
}

// -----------------------------------------------------------------------------
// Q24: [ADV] Index key + async load reorder
//
// Task:
// Order changes when data loads — index keys = flash wrong content.
//
// In simple words:
// Switch to server id when it arrives. Keep temp id stable until then.
// -----------------------------------------------------------------------------
function AsyncList({ items }) {
  return (
    <ul>
      {items.map((it) => (
        <li key={it.id ?? it.tempId}>{it.name}</li>
      ))}
    </ul>
  );
}

export {
  FruitList,
  UserList,
  DynamicList,
  ActiveTodos,
  Removable,
  IndexKeyWarning,
  Catalog,
  Editor,
  EmptyTodos,
  Weekdays,
  ReorderBugDemo,
  PairedRows,
  SortedNames,
  DoneTodos,
  UniqueKeyRule,
  InlineList,
  BigListNote,
  VisibleOnly,
  CompositeKey,
  Table,
  ChatSwitcher,
  AppendItem,
  TodoList,
  AsyncList,
};
