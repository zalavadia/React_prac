// ============================================================================
// 03 — Props
// Level: BASE  |  Sequence: read this file, then the next number
// ============================================================================
//
// SIMPLE: Props = a parcel from parent to child. Like asking for salt from another table —
// the child does not invent it, the parent provides it. Props are READ-ONLY.
// The child does not change props; for new data the parent updates state (lifting).
//
// Syntax: <User name="Ada" age={30} /> → function User({ name, age }) { ... }
// Destructuring is common. Default props: name = "Guest".
// children = content between tags (deep dive in Q15).
//
// WHY: Understanding data flow is core to React. Without props, components are isolated toys.
// INTERVIEW: props immutable; one-way data flow; children prop.
// Use in a Vite + React 19 project — teaching file (do not run with node alone).
//
// ============================================================================

import { useState } from "react";

// -----------------------------------------------------------------------------
// Q1: Simple string prop
//
// Task:
// <Hello name="Jay" /> — show name inside Hello.
//
// In simple words:
// Attribute = prop. Like a function argument.
// -----------------------------------------------------------------------------
function Hello({ name }) {
  return <h2>Hello, {name}</h2>;
}
// use: <Hello name="Jay" />

// -----------------------------------------------------------------------------
// Q2: Number / boolean props
//
// Task:
// age={25} (curly — number). isPro={true} or just isPro.
//
// In simple words:
// Quotes = string. { } = JS value. Boolean shortcut: <Badge vip /> → vip is true.
// -----------------------------------------------------------------------------
function Profile({ age, isPro }) {
  return (
    <p>
      Age {age} — {isPro ? "Pro" : "Free"}
    </p>
  );
}
// use: <Profile age={25} isPro />

// -----------------------------------------------------------------------------
// Q3: Object / array props
//
// Task:
// Pass user={{ name: "Ada", city: "Pune" }}.
//
// In simple words:
// Complex data goes as object/array. Inline object is new ref every render —
// be careful with memo (16/17).
// -----------------------------------------------------------------------------
function UserCard({ user }) {
  return (
    <div>
      {user.name} · {user.city}
    </div>
  );
}
// use: <UserCard user={{ name: "Ada", city: "Pune" }} />

// -----------------------------------------------------------------------------
// Q4: Default parameter
//
// Task:
// name = "Guest" when prop is missing.
//
// In simple words:
// JS default params — work in React too.
// -----------------------------------------------------------------------------
function Welcome({ name = "Guest" }) {
  return <p>Welcome, {name}</p>;
}

// -----------------------------------------------------------------------------
// Q5: children prop
//
// Task:
// <Box>inner text</Box> — Box renders children.
//
// In simple words:
// children = content between opening/closing tags. Gold for wrapper components.
// -----------------------------------------------------------------------------
function Box({ children }) {
  return <div className="box">{children}</div>;
}
// use: <Box><p>Inside</p></Box>

// -----------------------------------------------------------------------------
// Q6: Props spread
//
// Task:
// const props = { title: "Hi", open: true }; <Modal {...props} />
//
// In simple words:
// Spread passes all keys. Handy but overuse = unclear API.
// -----------------------------------------------------------------------------
function Modal({ title, open }) {
  if (!open) return null;
  return <dialog open>{title}</dialog>;
}
// use: const p = { title: "Hi", open: true }; <Modal {...p} />

// -----------------------------------------------------------------------------
// Q7: [MID] Props are read-only
//
// Task:
// Do NOT do props.name = "x" in child. Wait for new prop from parent.
//
// In simple words:
// Mutation = bugs + breaks React assumptions. One-way: parent → child.
// Need change? Send callback prop upward (lifting — 14).
// -----------------------------------------------------------------------------
function Bad({ label }) {
  // label = "hack"; // ❌ do not do this
  return <span>{label}</span>;
}

function GoodParent() {
  const [label, setLabel] = useState("ok");
  return <button onClick={() => setLabel("changed")}>{label}</button>;
}

// -----------------------------------------------------------------------------
// Q8: [MID] Callback as prop
//
// Task:
// Child button calls onSave — parent passes handler.
//
// In simple words:
// Child tells parent about events. Data up, UI down — common pattern.
// -----------------------------------------------------------------------------
function SaveButton({ onSave }) {
  return <button onClick={onSave}>Save</button>;
}

function Editor() {
  function handleSave() {
    console.log("saved");
  }
  return <SaveButton onSave={handleSave} />;
}

// -----------------------------------------------------------------------------
// Q9: children — special prop (nested JSX)
//
// Task:
// Panel with title + children as separate slots — flexible wrapper.
//
// In simple words:
// children is an explicit prop — comes from <Panel>...</Panel>.
// Multiple slots later (header/footer props or compound components).
// -----------------------------------------------------------------------------
function PanelWrap({ title, children }) {
  return (
    <section>
      <h3>{title}</h3>
      <div>{children}</div>
    </section>
  );
}

// -----------------------------------------------------------------------------
// Q10: Default props — destructuring default
//
// Task:
// size = "md", variant = "primary" when parent does not send them.
//
// In simple words:
// JS default params = modern way. Old way: Component.defaultProps (deprecated feel).
// Default applies on undefined; not on null.
// -----------------------------------------------------------------------------
function Button({ label, size = "md", variant = "primary" }) {
  return (
    <button className={`btn btn-${size} btn-${variant}`}>{label}</button>
  );
}

// -----------------------------------------------------------------------------
// Q11: [MID] Prop drilling intro
//
// Task:
// Pass theme from App → Layout → Nav → Link — middle layers only forward.
//
// In simple words:
// Drilling = passing prop through every level when middle layers do not use it.
// A little is OK; very deep = Context (13) or rethink composition.
// -----------------------------------------------------------------------------
function ThemeLink({ theme, href, children }) {
  return (
    <a href={href} style={{ color: theme }}>
      {children}
    </a>
  );
}

function NavBar({ theme }) {
  return (
    <nav>
      <ThemeLink theme={theme} href="/">
        Home
      </ThemeLink>
    </nav>
  );
}

function AppShell({ theme }) {
  return (
    <div>
      <NavBar theme={theme} />
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q12: Spread props pass-through
//
// Task:
// Input wrapper — forward {...inputProps} to native input.
//
// In simple words:
// All valid input props from parent go down. Wrapper keeps its own props separate.
// Pick/omit carefully — do not forward unwanted props to DOM (security).
// -----------------------------------------------------------------------------
function TextField({ label, ...inputProps }) {
  return (
    <label>
      {label}
      <input {...inputProps} />
    </label>
  );
}
// use: <TextField label="Name" type="text" placeholder="Ada" />

// -----------------------------------------------------------------------------
// Q13: Boolean props shorthand
//
// Task:
// <Input disabled /> = disabled={true}. Explicit false is different.
//
// In simple words:
// In JSX, attribute without value = true. For false write disabled={false}.
// Interview: <Checkbox checked /> vs checked={isChecked}.
// -----------------------------------------------------------------------------
function SubmitBtn({ disabled, loading }) {
  return (
    <button disabled={disabled || loading}>
      {loading ? "..." : "Submit"}
    </button>
  );
}
// use: <SubmitBtn disabled />  <SubmitBtn loading={false} />

// -----------------------------------------------------------------------------
// Q14: Callback prop with argument up
//
// Task:
// ListItem click sends id to parent — onSelect(id).
//
// In simple words:
// Child sends data upward. Parent will update state.
// Arrow wrap: onClick={() => onSelect(id)} — bind id.
// -----------------------------------------------------------------------------
function ListItem({ id, label, onSelect }) {
  return (
    <li>
      <button type="button" onClick={() => onSelect(id)}>
        {label}
      </button>
    </li>
  );
}

function SelectList() {
  const [picked, setPicked] = useState(null);
  const items = [
    { id: 1, label: "Chai" },
    { id: 2, label: "Coffee" },
  ];
  return (
    <div>
      <ul>
        {items.map((item) => (
          <ListItem
            key={item.id}
            id={item.id}
            label={item.label}
            onSelect={setPicked}
          />
        ))}
      </ul>
      <p>Picked: {picked ?? "none"}</p>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q15: [MID] Render props light (function as child)
//
// Task:
// DataProvider gives children a function — {data => <UI />}.
//
// In simple words:
// "Render prop" = parent has data/logic, child decides UI.
// Less common after hooks; still appears in libraries.
// -----------------------------------------------------------------------------
function DataProvider({ value, children }) {
  return children(value);
}

function RenderPropDemo() {
  return (
    <DataProvider value={{ count: 42 }}>
      {(data) => <p>Count from provider: {data.count}</p>}
    </DataProvider>
  );
}

// -----------------------------------------------------------------------------
// Q16: Prop types mental model (no library required)
//
// Task:
// Think API: name string, age number, onSave function — wrong type = bug.
//
// In simple words:
// TypeScript / PropTypes runtime check — team chooses.
// Mental model: component = function with documented input shape.
// -----------------------------------------------------------------------------
function TypedUser({ name, age, onSave }) {
  // TS: interface { name: string; age: number; onSave: () => void }
  return (
    <div>
      <p>
        {name}, {age}
      </p>
      <button type="button" onClick={onSave}>
        Save
      </button>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q17: [MID] Mutating props — anti-pattern detail
//
// Task:
// props.items.push() ❌ — mutates parent's array. Copy/filter in parent.
//
// In simple words:
// Props may share reference. Child mutate = parent changes too — React gets confused.
// Breaks one-way flow. Always use immutable updates.
// -----------------------------------------------------------------------------
function ItemCount({ items }) {
  // ❌ items.push("new") — corrupts parent state
  return <p>{items.length} items</p>;
}

function ItemCountParent() {
  const [items, setItems] = useState(["a", "b"]);
  function addItem() {
    setItems([...items, "c"]); // update in parent ✅
  }
  return (
    <div>
      <ItemCount items={items} />
      <button type="button" onClick={addItem}>
        Add
      </button>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q18: key prop special — component does not receive it
//
// Task:
// <Row key={id} id={id} /> — props.key is undefined inside Row (React uses it).
//
// In simple words:
// key is for React — reconciliation. Do not access inside component.
// Need same data? Pass id as a separate prop.
// Interview trap: key={index} causes bugs on list reorder.
// -----------------------------------------------------------------------------
function Row({ id, label }) {
  return (
    <tr>
      <td>{id}</td>
      <td>{label}</td>
    </tr>
  );
}

function RowList({ rows }) {
  return (
    <tbody>
      {rows.map((row) => (
        <Row key={row.id} id={row.id} label={row.label} />
      ))}
    </tbody>
  );
}

// -----------------------------------------------------------------------------
// Q19: [ADV] Rest props omit pattern
//
// Task:
// const { className, ...rest } = props — forward only safe DOM props.
//
// In simple words:
// Do not send custom props (isLoading) to DOM — React warning.
// Destructure them out, then spread ...rest.
// -----------------------------------------------------------------------------
function FancyDiv({ isLoading, className, children, ...domProps }) {
  return (
    <div className={`fancy ${isLoading ? "loading" : ""} ${className}`} {...domProps}>
      {children}
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q20: [ADV] Optional chaining props
//
// Task:
// user?.name when user can be null — avoid crash.
//
// In simple words:
// Props can be undefined — defensive render. Fallback UI or skeleton.
// Ideally parent sends consistent shape.
// -----------------------------------------------------------------------------
function ProfileOptional({ user }) {
  if (!user) return <p>No user</p>;
  return (
    <p>
      {user.name} · {user.city ?? "Unknown city"}
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q21: [ADV] Props vs state boundary
//
// Task:
// Prop = external input. Local edit? copy to state (08 controlled pattern).
//
// In simple words:
// Child cannot edit props directly — create local draft state.
// On save, send new value to parent via callback.
// -----------------------------------------------------------------------------
function EditableLabel({ value, onChange }) {
  const [draft, setDraft] = useState(value);
  return (
    <div>
      <input value={draft} onChange={(e) => setDraft(e.target.value)} />
      <button type="button" onClick={() => onChange(draft)}>
        Apply
      </button>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q22: [ADV] Interview trap — spread unknown props
//
// Task:
// {...props} everything to DOM — custom props leak = warning / XSS surface.
//
// In simple words:
// Explicit API > blind spread. Whitelist props or use TypeScript strict.
// Common mistake in real-world UI library wrappers.
// -----------------------------------------------------------------------------
function SafeLink({ href, children, className }) {
  // ✅ only known props — no blind {...unknown}
  return (
    <a href={href} className={className} rel="noopener noreferrer">
      {children}
    </a>
  );
}

export {
  Hello,
  Profile,
  UserCard,
  Welcome,
  Box,
  Modal,
  Bad,
  SaveButton,
  Editor,
  PanelWrap,
  Button,
  ThemeLink,
  NavBar,
  AppShell,
  TextField,
  SubmitBtn,
  ListItem,
  SelectList,
  DataProvider,
  RenderPropDemo,
  TypedUser,
  ItemCount,
  ItemCountParent,
  Row,
  RowList,
  FancyDiv,
  ProfileOptional,
  EditableLabel,
  SafeLink,
};
