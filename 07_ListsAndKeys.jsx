// ============================================================================
// 07 — Lists And Keys
// Level: BASE  |  Sequence: pehle yeh, phir agla number
// ============================================================================
//
// LAYMAN: List = thali me kai bowls. map() se array → JSX items.
// key = har item ka naam tag — React ko pata chale kaun moved/added/deleted.
// Bina sahi key ke React confuse — galat state, flicker, bugs.
//
// key={index} last resort — list reorder/delete pe toot sakti hai.
// Stable id (db id, uuid) best. key prop child ko props me nahi milta.
//
// KYUN: Har dashboard/table/feed list pe chalta hai.
// INTERVIEW: why keys; index as key problem; reconciliation (26).
// Vite/React 19 project me use — teaching file.
//
// ============================================================================

import { Fragment, useState } from "react";

// -----------------------------------------------------------------------------
// Q1: map se list
//
// Kya karna hai:
// fruits.map(f => <li key={f}>{f}</li>)
//
// Seedha matlab:
// Array → elements. return me { } ke andar map.
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
// Kya karna hai:
// users pe key={user.id}
//
// Seedha matlab:
// Real data me unique id. Name duplicate ho sakta — id nahi.
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
// Kya karna hai:
// Button se item add; list update.
//
// Seedha matlab:
// State array + map. key stable rakho (id counter).
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
// Kya karna hai:
// Active todos hi dikhao — filter + map.
//
// Seedha matlab:
// Render me derived list theek. Alag state mat banao sync ke liye.
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
// Kya karna hai:
// filter se item hatao; key id pe.
//
// Seedha matlab:
// Sahi key → React baaki items ki state preserve.
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
// Q6: [MID] Index as key — kab problem
//
// Kya karna hai:
// Reorder list with inputs — index key pe input value galat chipak sakti.
//
// Seedha matlab:
// Index = position. Item move → React sochta same position same component.
// Static never-reorder list pe index OK-ish; prefer id.
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
// Kya karna hai:
// Categories → products; dono levels pe unique keys.
//
// Seedha matlab:
// Key sibling list me unique. Alag lists me same id OK.
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
// Kya karna hai:
// Form reset: key={userId} change → component remount, state wipe.
//
// Seedha matlab:
// Trick: key change = React purana destroy, naya bana. Intentional reset.
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
// Kya karna hai:
// items.length === 0 pe friendly message + CTA button.
//
// Seedha matlab:
// Blank ul mat chhodo — user ko next step batao.
// -----------------------------------------------------------------------------
function EmptyTodos({ todos, onAdd }) {
  if (todos.length === 0) {
    return (
      <div>
        <p>Abhi koi todo nahi</p>
        <button onClick={onAdd}>Pehla todo banao</button>
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
// Q10: Index key kab OK hai
//
// Kya karna hai:
// Static list — kabhi reorder/delete nahi, sirf display.
//
// Seedha matlab:
// ["Mon","Tue","Wed"] jaisa fixed — index theek. Input/state wali list me nahi.
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
// Kya karna hai:
// List reorder + checkbox — index key pe galat item checked reh sakta.
//
// Seedha matlab:
// React position = identity samajhta hai index se. Reorder = wrong state reuse.
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
// Kya karna hai:
// map me <Fragment key={id}> ya <React.Fragment key={id}>.
//
// Seedha matlab:
// Fragment pe key tab jab ek item multiple top-level nodes return kare.
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
// Q13: Sort list — key id same rehna chahiye
//
// Kya karna hai:
// sort() se order badle, key={item.id} mat badlo.
//
// Seedha matlab:
// Sort = reorder, not new items. Stable id → React sahi move karta hai.
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
// Q14: Filter + map — keys source array se
//
// Kya karna hai:
// filtered.map — key original item.id, index nahi.
//
// Seedha matlab:
// Filtered list me bhi stable id. Index filter ke baad shift ho sakta hai.
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
// Kya karna hai:
// Do items same key={1} — React warn, unpredictable behavior.
//
// Seedha matlab:
// Keys sibling me unique honi chahiye. Duplicate = reconciliation toot-ti hai.
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
// Kya karna hai:
// {[1,2,3].map(...)} render me — har render naya array (minor perf).
//
// Seedha matlab:
// Chhota OK; bada data state/props se lao. keys still needed.
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
// Kya karna hai:
// 10,000 rows — poora map slow; react-window sirf visible render.
//
// Seedha matlab:
// Keys concept same — visible slice me bhi stable id. DOM me sab mat daalo.
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
// Kya karna hai:
// items.map me null return skip — filter pehle better.
//
// Seedha matlab:
// map me null OK lekin filter + map zyada clear for hidden items.
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
// Kya karna hai:
// No id? key={`${catId}-${sku}`} — better than index if stable combo.
//
// Seedha matlab:
// Last resort composite. Random Math.random() key mat — har render remount.
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
// Q20: key prop child ko nahi milta
//
// Kya karna hai:
// <Row key={id} id={id} /> — Row ke andar props.key undefined.
//
// Seedha matlab:
// key React internal hai. Chahiye to id alag prop pass karo.
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
// Kya karna hai:
// <ChatRoom key={roomId} /> — room change = purana chat state wipe.
//
// Seedha matlab:
// useEffect reset se behtar jab poora subtree fresh chahiye.
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
// Kya karna hai:
// setItems([...items, newOne]) — mutate mat karo items.push.
//
// Seedha matlab:
// Immutable update → React detect change. Same reference → skip re-render bug.
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
// Kya karna hai:
// map callback lambada lambi na — <TodoItem key={t.id} todo={t} />.
//
// Seedha matlab:
// key parent map pe. Child me key pass karne ki zaroorat nahi.
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
// Kya karna hai:
// Data load hone pe order badle — index keys = flash wrong content.
//
// Seedha matlab:
// Server id aate hi key switch karo. Temp id bhi stable rakho load tak.
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
