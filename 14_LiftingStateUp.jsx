// ============================================================================
// 14 — Lifting State Up
// Level: MID  |  Sequence: pehle yeh, phir agla number
// ============================================================================
//
// LAYMAN: Do siblings ko same data chahiye — state unke common parent me rakho.
// Jaise ghar ka thermostat living room me; har room apna AC remote nahi.
// Parent state rakhe, children props + callbacks se padhein/badlein.
//
// Pattern: const [x, setX] = useState in Parent; Child value={x} onChange={setX}.
// Kab lift: shared sync. Kab mat: sirf ek child use kare — local rakh.
//
// KYUN: Single source of truth. Duplicate state sync bugs khatam.
// INTERVIEW: where should state live; controlled child.
// Vite/React 19 project me use — teaching file.
//
// ============================================================================

import { useState } from "react";

// -----------------------------------------------------------------------------
// Q1: Two inputs synced via parent
//
// Kya karna hai:
// Celsius parent state; do children dikhayein.
//
// Seedha matlab:
// Shared value upar. Children dumb-ish display/editors.
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
// Kya karna hai:
// openId parent me; panels id match pe open.
//
// Seedha matlab:
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
// Kya karna hai:
// selectedId parent; List click → Detail show.
//
// Seedha matlab:
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
// Kya karna hai:
// Hover state sirf ek card me — parent App me mat.
//
// Seedha matlab:
// State jitna neeche ho sake utna better (colocate). Lift jab share zaroori.
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
// Kya karna hai:
// fullName = first + last — alag state mat; render me compute.
//
// Seedha matlab:
// Duplicate state sync hell. Source fields rakho, derive baaki.
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
// Kya karna hai:
// onX / setX clear names — child ko pata parent expect kya.
//
// Seedha matlab:
// Convention: onChange, onSubmit, onSelect. Readable API.
// -----------------------------------------------------------------------------
function SearchField({ value, onChange }) {
  return <input value={value} onChange={(e) => onChange(e.target.value)} />;
}

// -----------------------------------------------------------------------------
// Q7: [MID] Lift then maybe context
//
// Kya karna hai:
// Bohot deep tree me same state — lift + context (11).
//
// Seedha matlab:
// Pehle lift parent. Props drilling pain ho to context. Steps skip mat.
// -----------------------------------------------------------------------------
// Parent state → props → if drilling pain → Context Provider

// -----------------------------------------------------------------------------
// Q8: Controlled vs internal state child
//
// Kya karna hai:
// Kabhi child optional value/onChange (controlled) ya default local.
//
// Seedha matlab:
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
// Kya karna hai:
// Parent me celsius state; F input convert karke setCelsius call.
//
// Seedha matlab:
// Dono inputs ek source of truth share. Conversion parent ya handler me.
// Duplicate F state mat — derive from C.
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
// Kya karna hai:
// Parent owns state; child sirf display + notify — "controlled component".
//
// Seedha matlab:
// React forms ka core pattern. Child apna state nahi rakhta value ke liye.
// Single source of truth parent me.
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
// Kya karna hai:
// Sirf ek child use kare → local. Do siblings sync → lift parent.
//
// Seedha matlab:
// State jitna neeche utna better performance + clarity.
// Lift sirf jab share/sync zaroori ho — premature lift mat.
// -----------------------------------------------------------------------------
function ColocateNote() {
  return <p>Pehle colocate try karo. Share need aaye tab lift.</p>;
}

// -----------------------------------------------------------------------------
// Q12: Prop drilling pain → context step
//
// Kya karna hai:
// App → Layout → Page → Widget → Leaf same user prop — drilling.
//
// Seedha matlab:
// 2-3 level props OK. 5+ same prop → context consider (11 file).
// Lift pehle try; drilling unbearable ho to context.
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
// Kya karna hai:
// query parent me; List + Count dono filtered items use karein.
//
// Seedha matlab:
// Search box aur results sync — natural lift candidate.
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
// Kya karna hai:
// onSubmit callback — child event, parent state update.
//
// Seedha matlab:
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
// Kya karna hai:
// items + filter → filteredItems compute in parent render, alag state mat.
//
// Seedha matlab:
// Sirf source state lift karo. Derived parent ya child me compute.
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
// Kya karna hai:
// isDark parent; Header + Content dono props se.
//
// Seedha matlab:
// UI mode share karna = lift. Context tab jab tree bahut deep.
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
// Kya karna hai:
// Form reset — parent key={formKey} bump vs lift reset handler.
//
// Seedha matlab:
// Kabhi child local state OK; reset ke liye key change se remount.
// Lift jab multiple children sync reset chahiye.
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
// Kya karna hai:
// Smart parent state + dumb display children — lift enables this.
//
// Seedha matlab:
// Container: data + handlers. Presentational: props se render only.
// Test presentational easy — mock props.
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
// Kya karna hai:
// Modal open state App me jab sirf ek branch use kare — over-lift.
//
// Seedha matlab:
// App re-render har modal toggle pe — waste. Colocate modal state section me.
// Balance: share need vs blast radius.
// -----------------------------------------------------------------------------
function SectionWithModal() {
  const [open, setOpen] = useState(false); // yahan OK, App me mat
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
// Kya karna hai:
// selectedIds Set/array parent; each checkbox controlled.
//
// Seedha matlab:
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
// Kya karna hai:
// selectedTab parent me + sync URL searchParams — share + bookmarkable.
//
// Seedha matlab:
// Lifted state sirf component tree nahi — URL bhi "shared parent".
// React Router: useSearchParams lift alternative.
// -----------------------------------------------------------------------------
function TabUrlNote() {
  return <p>Tab state URL me = lift + persistence free.</p>;
}

// -----------------------------------------------------------------------------
// Q22: Anti-pattern — mirroring props to state
//
// Kya karna hai:
// const [v, setV] = useState(props.value) — props change pe out of sync.
//
// Seedha matlab:
// Controlled ho to props hi use karo. Local copy mat unless key reset.
// useEffect sync props→state = usually smell.
// -----------------------------------------------------------------------------
function MirroringBad({ value }) {
  // ❌ const [v, setV] = useState(value); — props update ignore
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
