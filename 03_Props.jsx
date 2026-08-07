// ============================================================================
// 03 — Props
// Level: BASE  |  Sequence: pehle yeh, phir agla number
// ============================================================================
//
// LAYMAN: Props = parent se child ko parcel. Jaise thali me namak alag table se
// maanga — child khud invent nahi karta, parent deta hai. Props READ-ONLY hain.
// Child props change nahi karta; naya data chahiye to parent state badle (lifting).
//
// Syntax: <User name="Ada" age={30} /> → function User({ name, age }) { ... }
// Destructuring common hai. Default props: name = "Guest".
// children = tags ke beech wala content (15 me deep).
//
// KYUN: Data flow samajhna React ka core. Bina props ke components isolated toys.
// INTERVIEW: props immutable; one-way data flow; children prop.
// Vite/React 19 project me use — teaching file.
//
// ============================================================================

import { useState } from "react";

// -----------------------------------------------------------------------------
// Q1: Simple string prop
//
// Kya karna hai:
// <Hello name="Jay" /> — Hello me name dikhao.
//
// Seedha matlab:
// Attribute = prop. Function arg jaisa.
// -----------------------------------------------------------------------------
function Hello({ name }) {
  return <h2>Hello, {name}</h2>;
}
// use: <Hello name="Jay" />

// -----------------------------------------------------------------------------
// Q2: Number / boolean props
//
// Kya karna hai:
// age={25} (curly — number). isPro={true} ya sirf isPro.
//
// Seedha matlab:
// Quotes = string. { } = JS value. Boolean shortcut: <Badge vip /> → vip true.
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
// Kya karna hai:
// user={{ name: "Ada", city: "Pune" }} pass karo.
//
// Seedha matlab:
// Complex data object/array se jaata hai. Inline object har render naya ref —
// memo ke sath careful (16/17).
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
// Kya karna hai:
// name = "Guest" jab prop na aaye.
//
// Seedha matlab:
// JS default params — React me bhi kaam.
// -----------------------------------------------------------------------------
function Welcome({ name = "Guest" }) {
  return <p>Welcome, {name}</p>;
}

// -----------------------------------------------------------------------------
// Q5: children prop
//
// Kya karna hai:
// <Box>andar ka text</Box> — Box children render kare.
//
// Seedha matlab:
// children = opening/closing tag ke beech. Wrapper components ke liye gold.
// -----------------------------------------------------------------------------
function Box({ children }) {
  return <div className="box">{children}</div>;
}
// use: <Box><p>Inside</p></Box>

// -----------------------------------------------------------------------------
// Q6: Props spread
//
// Kya karna hai:
// const props = { title: "Hi", open: true }; <Modal {...props} />
//
// Seedha matlab:
// Spread saari keys pass. Handy lekin overuse = unclear API.
// -----------------------------------------------------------------------------
function Modal({ title, open }) {
  if (!open) return null;
  return <dialog open>{title}</dialog>;
}
// use: const p = { title: "Hi", open: true }; <Modal {...p} />

// -----------------------------------------------------------------------------
// Q7: [MID] Props are read-only
//
// Kya karna hai:
// Child me props.name = "x" MAT karo. Parent se naya prop aaye.
//
// Seedha matlab:
// Mutation = bugs + React assumptions tootna. One-way: parent → child.
// Change chahiye? Callback prop upar bhejo (lifting — 14).
// -----------------------------------------------------------------------------
function Bad({ label }) {
  // label = "hack"; // ❌ mat karo
  return <span>{label}</span>;
}

function GoodParent() {
  const [label, setLabel] = useState("ok");
  return <button onClick={() => setLabel("changed")}>{label}</button>;
}

// -----------------------------------------------------------------------------
// Q8: [MID] Callback as prop
//
// Kya karna hai:
// Child button pe onSave call kare — parent handler pass kare.
//
// Seedha matlab:
// Child event parent ko batata hai. Data upar, UI neeche — common pattern.
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
// Kya karna hai:
// Panel title + children alag slots — flexible wrapper.
//
// Seedha matlab:
// children explicit prop hai — <Panel>...</Panel> se aata hai.
// Multiple slots baad me (header/footer props ya compound components).
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
// Kya karna hai:
// size = "md", variant = "primary" jab parent na bheje.
//
// Seedha matlab:
// JS default params modern way. Purani: Component.defaultProps (deprecated feel).
// undefined pe default lagta hai; null pe nahi.
// -----------------------------------------------------------------------------
function Button({ label, size = "md", variant = "primary" }) {
  return (
    <button className={`btn btn-${size} btn-${variant}`}>{label}</button>
  );
}

// -----------------------------------------------------------------------------
// Q11: [MID] Prop drilling intro
//
// Kya karna hai:
// App → Layout → Nav → Link tak theme pass — beech ke sirf forward.
//
// Seedha matlab:
// Drilling = har level pe prop pass jab beech wale use nahi karte.
// Thoda OK; bahut deep = Context (13) ya composition rethink.
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
// Kya karna hai:
// Input wrapper — {...inputProps} native input pe forward.
//
// Seedha matlab:
// Parent se saari valid input props neeche. Wrapper apne props alag rakhe.
// Pick/omit careful — security me unwanted props mat forward (DOM).
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
// Kya karna hai:
// <Input disabled /> = disabled={true}. Explicit false alag.
//
// Seedha matlab:
// JSX me attribute bina value = true. false ke liye disabled={false} likho.
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
// Kya karna hai:
// ListItem click pe id parent ko bheje — onSelect(id).
//
// Seedha matlab:
// Child data upar batata hai. Parent state update karega.
// Arrow wrap: onClick={() => onSelect(id)} — id bind.
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
// Kya karna hai:
// DataProvider children ko function de — {data => <UI />}.
//
// Seedha matlab:
// "Render prop" = parent data/logic, child decide UI kaise.
// Hooks aane ke baad kam common; phir bhi libraries me dikhega.
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
// Kya karna hai:
// Socho API: name string, age number, onSave function — galat type = bug.
//
// Seedha matlab:
// TypeScript / PropTypes runtime check — team choose kare.
// Mental model: component = function with documented input shape.
// -----------------------------------------------------------------------------
function TypedUser({ name, age, onSave }) {
  // TS me: interface { name: string; age: number; onSave: () => void }
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
// Kya karna hai:
// props.items.push() ❌ — parent ka array mutate. Copy/filter parent me.
//
// Seedha matlab:
// Props reference share ho sakta hai. Child mutate = parent bhi change — React confuse.
// One-way flow tod deta hai. Immutable updates hamesha.
// -----------------------------------------------------------------------------
function ItemCount({ items }) {
  // ❌ items.push("new") — parent state corrupt
  return <p>{items.length} items</p>;
}

function ItemCountParent() {
  const [items, setItems] = useState(["a", "b"]);
  function addItem() {
    setItems([...items, "c"]); // parent me update ✅
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
// Q18: key prop special — component ko nahi milti
//
// Kya karna hai:
// <Row key={id} id={id} /> — Row me props.key undefined (React use karta hai).
//
// Seedha matlab:
// key React ke liye hai — reconciliation. Component ke andar access mat karo.
// Same data chahiye? id alag prop pass karo.
// Interview trap: key={index} list reorder pe bugs.
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
// Kya karna hai:
// const { className, ...rest } = props — sirf safe DOM props forward.
//
// Seedha matlab:
// Custom props (isLoading) DOM pe mat bhejo — React warning.
// Destructure karke alag karo, phir ...rest spread.
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
// Kya karna hai:
// user?.name jab user null ho sakta hai — crash avoid.
//
// Seedha matlab:
// Props kabhi undefined — defensive render. Fallback UI ya skeleton.
// Parent ko ideally consistent shape bhejna better.
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
// Kya karna hai:
// Prop = external input. Local edit? copy to state (08 controlled pattern).
//
// Seedha matlab:
// Child props directly edit nahi kar sakta — local draft state banao.
// Save pe callback se parent ko naya value bhejo.
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
// Kya karna hai:
// {...props} sab kuch DOM pe — custom props leak = warning / XSS surface.
//
// Seedha matlab:
// Explicit API > blind spread. Whitelist props ya TypeScript strict.
// Real-world: UI library wrappers me common mistake.
// -----------------------------------------------------------------------------
function SafeLink({ href, children, className }) {
  // ✅ sirf known props — no blind {...unknown}
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
