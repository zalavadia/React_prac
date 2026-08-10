// ============================================================================
// 14 — Lifting State Up
// Level: MID  |  Sequence: read this file, then the next number
// ============================================================================
//
// SIMPLE: Two siblings need the same data — keep state in their common parent.
// Like the house thermostat in the living room; not every room with its own AC remote.
// Parent holds state, children read/change via props + callbacks.
//
// Pattern: const [x, setX] = useState in Parent; Child value={x} onChange={setX}.
// When to lift: shared sync. When not: only one child uses it — keep local.
//
// WHY: Single source of truth. Duplicate state sync bugs gone.
// INTERVIEW: where should state live; controlled child.
// Use in a Vite + React 19 project — teaching file.
//
// ============================================================================

import { useState } from "react";

// -----------------------------------------------------------------------------
// Q1: Two inputs synced via parent
//
// Task:
// Celsius parent state; two children display it.
//
// In simple words:
// Shared value up top. Children are dumb-ish display/editors.
// -----------------------------------------------------------------------------
function TempDisplay({ celsius }) {
  return <p>{celsius}°C</p>;
}

function TempInput({ celsius, onCelsiusChange }) {
  return (
    <input
      type="number"
      value={celsius}
      onChange={(e) => onCelsiusChange(Number(e.target.value))}
    />
  );
}

function TempApp() {
  const [celsius, setCelsius] = useState(25);
  return (
    <div>
      <TempInput celsius={celsius} onCelsiusChange={setCelsius} />
      <TempDisplay celsius={celsius} />
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q2: Accordion — only one open
//
// Task:
// openId in parent; panels open when id matches.
//
// In simple words:
// Mutual exclusion state naturally lifts to parent.
// -----------------------------------------------------------------------------
function Panel({ id, openId, onOpen, title, children }) {
  const open = openId === id;
  return (
    <div>
      <button onClick={() => onOpen(id)}>{title}</button>
      {open && <div>{children}</div>}
    </div>
  );
}

function Accordion() {
  const [openId, setOpenId] = useState(null);
  return (
    <>
      <Panel id="a" openId={openId} onOpen={setOpenId} title="A">
        AAA
      </Panel>
      <Panel id="b" openId={openId} onOpen={setOpenId} title="B">
        BBB
      </Panel>
    </>
  );
}

// -----------------------------------------------------------------------------
// Q3: List + detail selection
//
// Task:
// selectedId in parent; List click → Detail show.
//
// In simple words:
// Master-detail classic lift.
// -----------------------------------------------------------------------------
function List({ items, selectedId, onSelect }) {
  return (
    <ul>
      {items.map((it) => (
        <li key={it.id}>
          <button onClick={() => onSelect(it.id)}>
            {it.id === selectedId ? "→ " : ""}
            {it.name}
          </button>
        </li>
      ))}
    </ul>
  );
}

function Detail({ item }) {
  if (!item) return <p>Select one</p>;
  return <article>{item.name}</article>;
}

function MasterDetail() {
  const items = [
    { id: 1, name: "Ada" },
    { id: 2, name: "Lin" },
  ];
  const [selectedId, setSelectedId] = useState(null);
  const item = items.find((i) => i.id === selectedId);
  return (
    <div>
      <List items={items} selectedId={selectedId} onSelect={setSelectedId} />
      <Detail item={item} />
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q4: Don't lift too high
//
// Task:
// Hover state only in one card — not in parent App.
//
// In simple words:
// State as low as possible (colocate). Lift only when sharing is needed.
// -----------------------------------------------------------------------------
function Card() {
  const [hover, setHover] = useState(false); // local OK
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {hover ? "hot" : "cold"}
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q5: [MID] Derived state — don't duplicate
//
// Task:
// fullName = first + last — not separate state; compute in render.
//
// In simple words:
// Duplicate state sync hell. Keep source fields, derive the rest.
// -----------------------------------------------------------------------------
function NameForm() {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const fullName = `${first} ${last}`.trim();
  return (
    <div>
      <input value={first} onChange={(e) => setFirst(e.target.value)} />
      <input value={last} onChange={(e) => setLast(e.target.value)} />
      <p>{fullName}</p>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q6: Callback props naming
//
// Task:
// onX / setX clear names — child knows what parent expects.
//
// In simple words:
// Convention: onChange, onSubmit, onSelect. Readable API.
// -----------------------------------------------------------------------------
function SearchField({ value, onChange }) {
  return <input value={value} onChange={(e) => onChange(e.target.value)} />;
}

// -----------------------------------------------------------------------------
// Q7: [MID] Lift then maybe context
//
// Task:
// Same state deep in tree — lift + context (11).
//
// In simple words:
// First lift to parent. If props drilling hurts, use context. Don't skip steps.
// -----------------------------------------------------------------------------
// Parent state → props → if drilling pain → Context Provider

// -----------------------------------------------------------------------------
// Q8: Controlled vs internal state child
//
// Task:
// Sometimes child has optional value/onChange (controlled) or default local.
//
// In simple words:
// Flexible components: if value!=null controlled else self state.
// -----------------------------------------------------------------------------
function FlexibleInput({ value, onChange, defaultValue = "" }) {
  const [inner, setInner] = useState(defaultValue);
  const isControlled = value !== undefined;
  const v = isControlled ? value : inner;
  function handle(e) {
    if (!isControlled) setInner(e.target.value);
    onChange?.(e.target.value);
  }
  return <input value={v} onChange={handle} />;
}

// -----------------------------------------------------------------------------
// Q9: Syncing two inputs — Celsius & Fahrenheit
//
// Task:
// Parent has celsius state; F input converts and calls setCelsius.
//
// In simple words:
// Both inputs share one source of truth. Conversion in parent or handler.
// Don't duplicate F state — derive from C.
// -----------------------------------------------------------------------------
function FahrenheitInput({ celsius, onCelsiusChange }) {
  const fahrenheit = (celsius * 9) / 5 + 32;
  return (
    <input
      type="number"
      value={Math.round(fahrenheit * 100) / 100}
      onChange={(e) => {
        const f = Number(e.target.value);
        onCelsiusChange(((f - 32) * 5) / 9);
      }}
    />
  );
}

function TempConverter() {
  const [celsius, setCelsius] = useState(25);
  return (
    <div>
      <TempInput celsius={celsius} onCelsiusChange={setCelsius} />
      <FahrenheitInput celsius={celsius} onCelsiusChange={setCelsius} />
      <TempDisplay celsius={celsius} />
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q10: Controlled child — value + onChange required
//
// Task:
// Parent owns state; child only displays + notifies — "controlled component".
//
// In simple words:
// Core React forms pattern. Child does not keep its own state for value.
// Single source of truth in parent.
// -----------------------------------------------------------------------------
function ControlledInput({ value, onChange, label }) {
  return (
    <label>
      {label}
      <input value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}

function ControlledForm() {
  const [email, setEmail] = useState("");
  return <ControlledInput label="Email" value={email} onChange={setEmail} />;
}

// -----------------------------------------------------------------------------
// Q11: [MID] When lift vs colocate — decision tree
//
// Task:
// Only one child uses it → local. Two siblings sync → lift to parent.
//
// In simple words:
// State as low as possible = better performance + clarity.
// Lift only when share/sync is needed — don't lift too early.
// -----------------------------------------------------------------------------
function ColocateNote() {
  return <p>Try colocate first. Lift when sharing is needed.</p>;
}

// -----------------------------------------------------------------------------
// Q12: Prop drilling pain → context step
//
// Task:
// App → Layout → Page → Widget → Leaf same user prop — drilling.
//
// In simple words:
// 2-3 levels of props OK. 5+ same prop → consider context (11 file).
// Try lift first; context when drilling is unbearable.
// -----------------------------------------------------------------------------
function DrillingSketch({ user }) {
  return <Middle user={user} />;
}
function Middle({ user }) {
  return <Leaf user={user} />;
}
function Leaf({ user }) {
  return <span>{user?.name}</span>;
}

// -----------------------------------------------------------------------------
// Q13: Lifting filter state for shared list
//
// Task:
// query in parent; List + Count both use filtered items.
//
// In simple words:
// Search box and results in sync — natural lift candidate.
// -----------------------------------------------------------------------------
function FilterBar({ query, onQueryChange }) {
  return (
    <input value={query} onChange={(e) => onQueryChange(e.target.value)} />
  );
}

function ItemList({ items }) {
  return (
    <ul>
      {items.map((it) => (
        <li key={it}>{it}</li>
      ))}
    </ul>
  );
}

function FilterApp() {
  const all = ["apple", "banana", "apricot"];
  const [query, setQuery] = useState("");
  const filtered = all.filter((x) => x.includes(query.toLowerCase()));
  return (
    <div>
      <FilterBar query={query} onQueryChange={setQuery} />
      <ItemList items={filtered} />
      <p>{filtered.length} items</p>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q14: Inverse data flow — child notifies parent
//
// Task:
// onSubmit callback — child event, parent state update.
//
// In simple words:
// Data down (props), events up (callbacks). React one-way flow.
// Lifting = events up + state down combo.
// -----------------------------------------------------------------------------
function SubmitBtn({ onSubmit }) {
  return <button onClick={() => onSubmit("done")}>Submit</button>;
}

function ParentSubmit() {
  const [msg, setMsg] = useState("");
  return (
    <div>
      <SubmitBtn onSubmit={setMsg} />
      <p>{msg}</p>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q15: [MID] Don't lift derived values
//
// Task:
// items + filter → filteredItems compute in parent render, not separate state.
//
// In simple words:
// Only lift source state. Compute derived in parent or child.
// Duplicate filtered state = sync bug factory.
// -----------------------------------------------------------------------------
function DerivedFilterDemo() {
  const [items] = useState(["a", "b", "c"]);
  const [q, setQ] = useState("");
  const shown = items.filter((x) => x.includes(q)); // derived, not lifted state
  return (
    <div>
      <input value={q} onChange={(e) => setQ(e.target.value)} />
      <ItemList items={shown} />
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q16: Shared toggle — theme siblings
//
// Task:
// isDark in parent; Header + Content both get props.
//
// In simple words:
// Sharing UI mode = lift. Context when tree is very deep.
// -----------------------------------------------------------------------------
function Header({ dark }) {
  return <header style={{ background: dark ? "#222" : "#fff" }}>Header</header>;
}

function Content({ dark }) {
  return <main style={{ color: dark ? "#fff" : "#000" }}>Body</main>;
}

function ThemeLift() {
  const [dark, setDark] = useState(false);
  return (
    <div>
      <button onClick={() => setDark((d) => !d)}>Toggle</button>
      <Header dark={dark} />
      <Content dark={dark} />
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q17: Key reset vs lifting state
//
// Task:
// Form reset — parent key={formKey} bump vs lift reset handler.
//
// In simple words:
// Sometimes child local state OK; key change remounts for reset.
// Lift when multiple children need synced reset.
// -----------------------------------------------------------------------------
function ResettableForm({ keySeed }) {
  const [text, setText] = useState("");
  return (
    <input key={keySeed} value={text} onChange={(e) => setText(e.target.value)} />
  );
}

// -----------------------------------------------------------------------------
// Q18: [MID] Container / Presentational split
//
// Task:
// Smart parent state + dumb display children — lift enables this.
//
// In simple words:
// Container: data + handlers. Presentational: render from props only.
// Easy to test presentational — mock props.
// -----------------------------------------------------------------------------
function UserCard({ name, onEdit }) {
  return (
    <div>
      {name} <button onClick={onEdit}>Edit</button>
    </div>
  );
}

function UserContainer() {
  const [name, setName] = useState("Jay");
  return <UserCard name={name} onEdit={() => setName("Edited")} />;
}

// -----------------------------------------------------------------------------
// Q19: Lifting too high — global local state problem
//
// Task:
// Modal open state in App when only one branch uses it — over-lift.
//
// In simple words:
// App re-renders on every modal toggle — waste. Colocate modal state in section.
// Balance: share need vs blast radius.
// -----------------------------------------------------------------------------
function SectionWithModal() {
  const [open, setOpen] = useState(false); // OK here, not in App
  return (
    <div>
      <button onClick={() => setOpen(true)}>Open</button>
      <Modal open={open} onClose={() => setOpen(false)}>
        Hi
      </Modal>
    </div>
  );
}

function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div>
      {children}
      <button onClick={onClose}>×</button>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q20: Syncing checkbox group — all selected parent state
//
// Task:
// selectedIds Set/array in parent; each checkbox controlled.
//
// In simple words:
// Multi-select share = lift. Toggle one id → parent update → all sync.
// -----------------------------------------------------------------------------
function Checkbox({ id, checked, onToggle }) {
  return (
    <label>
      <input type="checkbox" checked={checked} onChange={() => onToggle(id)} />
      {id}
    </label>
  );
}

function CheckboxGroup() {
  const [selected, setSelected] = useState([]);
  const toggle = (id) =>
    setSelected((s) =>
      s.includes(id) ? s.filter((x) => x !== id) : [...s, id]
    );
  const ids = ["a", "b", "c"];
  return (
    <div>
      {ids.map((id) => (
        <Checkbox
          key={id}
          id={id}
          checked={selected.includes(id)}
          onToggle={toggle}
        />
      ))}
      <p>{selected.join(", ")}</p>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q21: [MID] URL as lifted state (concept)
//
// Task:
// selectedTab in parent + sync URL searchParams — share + bookmarkable.
//
// In simple words:
// Lifted state is not just the component tree — URL is also a "shared parent".
// React Router: useSearchParams as lift alternative.
// -----------------------------------------------------------------------------
function TabUrlNote() {
  return <p>Tab state in URL = lift + persistence free.</p>;
}

// -----------------------------------------------------------------------------
// Q22: Anti-pattern — mirroring props to state
//
// Task:
// const [v, setV] = useState(props.value) — out of sync when props change.
//
// In simple words:
// If controlled, use props directly. No local copy unless key reset.
// useEffect sync props→state = usually a smell.
// -----------------------------------------------------------------------------
function MirroringBad({ value }) {
  // ❌ const [v, setV] = useState(value); — ignores props update
  return <input value={value} readOnly />; // ✅ controlled from parent
}

export {
  TempApp,
  Accordion,
  MasterDetail,
  Card,
  NameForm,
  SearchField,
  FlexibleInput,
  TempConverter,
  ControlledForm,
  ColocateNote,
  DrillingSketch,
  FilterApp,
  ParentSubmit,
  DerivedFilterDemo,
  ThemeLift,
  UserContainer,
  SectionWithModal,
  CheckboxGroup,
  TabUrlNote,
  MirroringBad,
};
