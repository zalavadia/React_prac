// ============================================================================
// 15 — Children Composition
// Level: MID  |  Sequence: pehle yeh, phir agla number
// ============================================================================
//
// LAYMAN: children = dabbe ke andar jo bhi daal do. Card, Modal, Layout —
// shell fixed, content flexible. Composition > inheritance (React way).
//
// <Modal><Form /></Modal> → Modal({ children }). slots: header/footer props
// ya multiple props as elements. cloneElement rare — prefer explicit props.
//
// KYUN: Flexible UI libraries. Avoid prop explosion "title, body, footer...".
// INTERVIEW: composition vs config props; containership.
// Vite/React 19 project me use — teaching file.
//
// ============================================================================

import { useEffect, useState } from "react";

// -----------------------------------------------------------------------------
// Q1: Basic children wrapper
//
// Kya karna hai:
// FancyBox children render.
//
// Seedha matlab:
// Reusable chrome around unknown content.
// -----------------------------------------------------------------------------
function FancyBox({ children }) {
  return <div className="fancy">{children}</div>;
}

// -----------------------------------------------------------------------------
// Q2: Layout slots via props
//
// Kya karna hai:
// sidebar + children main.
//
// Seedha matlab:
// Named "slots" as props — clear structure.
// -----------------------------------------------------------------------------
function Shell({ sidebar, children }) {
  return (
    <div className="shell">
      <aside>{sidebar}</aside>
      <main>{children}</main>
    </div>
  );
}

function AppShell() {
  return (
    <Shell sidebar={<nav>Links</nav>}>
      <h1>Page</h1>
    </Shell>
  );
}

// -----------------------------------------------------------------------------
// Q3: Modal with children
//
// Kya karna hai:
// open + onClose + children body.
//
// Seedha matlab:
// Modal na jaane andar Form hai ya Text — children.
// -----------------------------------------------------------------------------
function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div className="overlay">
      <div className="modal">
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q4: Button asChild-ish pattern (simple)
//
// Kya karna hai:
// Sometimes wrap link styled as button — children / component prop.
//
// Seedha matlab:
// Composition lets consumer choose <a> vs <button>.
// -----------------------------------------------------------------------------
function Button({ children, onClick }) {
  return (
    <button className="btn" onClick={onClick}>
      {children}
    </button>
  );
}

// -----------------------------------------------------------------------------
// Q5: [MID] Children as function (render prop)
//
// Kya karna hai:
// <Data>{(data) => <pre>...</pre>}</Data>
//
// Seedha matlab:
// Parent data de, child decide UI. Hooks se pehle popular; ab custom hooks.
// -----------------------------------------------------------------------------
function Mouse({ children }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  return (
    <div
      onMouseMove={(e) => setPos({ x: e.clientX, y: e.clientY })}
    >
      {children(pos)}
    </div>
  );
}
// use: <Mouse>{(p) => <p>{p.x},{p.y}</p>}</Mouse>

// -----------------------------------------------------------------------------
// Q6: Compound components sketch
//
// Kya karna hai:
// Tabs + Tabs.Panel API feel — related pieces.
//
// Seedha matlab:
// Implicit state share (context). Nice DX for libraries.
// -----------------------------------------------------------------------------
function Tabs({ children }) {
  const [active, setActive] = useState(0);
  return (
    <div>
      {/* real impl maps children / context — concept yahan */}
      <p>Active tab: {active}</p>
      <button onClick={() => setActive(0)}>0</button>
      <button onClick={() => setActive(1)}>1</button>
      {children}
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q7: Avoid cloneElement when possible
//
// Kya karna hai:
// Extra props children pe inject karna — prefer context ya render prop.
//
// Seedha matlab:
// cloneElement magic = brittle. Explicit better.
// -----------------------------------------------------------------------------
// React.cloneElement(child, { extra }) // last resort

// -----------------------------------------------------------------------------
// Q8: [MID] Conditional children / empty
//
// Kya karna hai:
// List empty → EmptyState as children pattern.
//
// Seedha matlab:
// Parent structure, consumer empty UI pass kare.
// -----------------------------------------------------------------------------
function ListBox({ items, empty, children }) {
  if (!items.length) return empty ?? <p>Nothing</p>;
  return <ul>{items.map((it) => children(it))}</ul>;
}

// -----------------------------------------------------------------------------
// Q9: React.Children utilities (light)
//
// Kya karna hai:
// React.Children.count(children), map, toArray — slot validation.
//
// Seedha matlab:
// Compound components me kaunse children allowed check kar sakte ho.
// Overuse mat — explicit props often clearer.
// -----------------------------------------------------------------------------
function CountChildren({ children }) {
  const n = Array.isArray(children) ? children.length : children ? 1 : 0;
  return (
    <div>
      <p>{n} child(ren)</p>
      {children}
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q10: cloneElement caution — implicit prop injection
//
// Kya karna hai:
// React.cloneElement(child, { isActive }) — magic props inject.
//
// Seedha matlab:
// Fragile: child type assume, overrides clash. Context/render prop prefer.
// Radix asChild internally cloneElement use karta — library level OK.
// -----------------------------------------------------------------------------
// function InjectActive({ children, active }) {
//   return React.cloneElement(children, { "data-active": active });
// }

// -----------------------------------------------------------------------------
// Q11: [MID] Multiple slot props pattern
//
// Kya karna hai:
// header, footer, actions alag props — JSX me pass.
//
// Seedha matlab:
// Config props explosion avoid. Named slots readable.
// <Card header={<h2/>} footer={<Btn/>}>body</Card>
// -----------------------------------------------------------------------------
function Card({ header, footer, children }) {
  return (
    <article>
      <header>{header}</header>
      <div>{children}</div>
      <footer>{footer}</footer>
    </article>
  );
}

function CardDemo() {
  return (
    <Card header={<h2>Title</h2>} footer={<button>OK</button>}>
      Content here
    </Card>
  );
}

// -----------------------------------------------------------------------------
// Q12: Compound Tabs — context share sketch
//
// Kya karna hai:
// Tabs.List + Tabs.Panel — shared activeIndex via context.
//
// Seedha matlab:
// Library API feel: related components ek family.
// Parent Tabs state hold; children consume context (see 11).
// -----------------------------------------------------------------------------
function TabList({ labels, active, onSelect }) {
  return (
    <div role="tablist">
      {labels.map((l, i) => (
        <button key={l} onClick={() => onSelect(i)} aria-selected={active === i}>
          {l}
        </button>
      ))}
    </div>
  );
}

function TabPanels({ panels, active }) {
  return <div>{panels[active]}</div>;
}

function TabsCompound() {
  const [active, setActive] = useState(0);
  const labels = ["One", "Two"];
  const panels = [<p key="1">Panel 1</p>, <p key="2">Panel 2</p>];
  return (
    <div>
      <TabList labels={labels} active={active} onSelect={setActive} />
      <TabPanels panels={panels} active={active} />
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q13: Render props vs hooks
//
// Kya karna hai:
// <Mouse>{(pos) => ...}</Mouse> vs const pos = useMouse() — hooks win usually.
//
// Seedha matlab:
// Render prop = flexibility + composition. Hooks = same reuse, cleaner tree.
// Legacy libs me render props common; custom hook modern prefer.
// -----------------------------------------------------------------------------
function DataLoader({ url, children }) {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(url)
      .then((r) => r.json())
      .then(setData)
      .catch(() => setData(null));
  }, [url]);
  return children({ data, loading: !data });
}

// -----------------------------------------------------------------------------
// Q14: [MID] asChild pattern (light)
//
// Kya karna hai:
// <Button asChild><a href="/">Link</a></Button> — styles merge, child render.
//
// Seedha matlab:
// Button apna <button> nahi — child clone karke props merge (Radix style).
// Simple version: children pass through with className merge.
// -----------------------------------------------------------------------------
function StyledWrapper({ className, children }) {
  // light asChild-ish: consumer picks element, wrapper adds class
  return <div className={`styled ${className ?? ""}`}>{children}</div>;
}

// -----------------------------------------------------------------------------
// Q15: Composition over config props
//
// Kya karna hai:
// <Modal title="" body="" footer="" /> ❌ vs children composition ✅
//
// Seedha matlab:
// Har section alag component pass — flexible order, custom layout.
// Config props rigid ho jaate hain complex UI me.
// -----------------------------------------------------------------------------
function ConfigVsComposeNote() {
  return <p>Composition = consumer control. Config = library decides structure.</p>;
}

// -----------------------------------------------------------------------------
// Q16: Fragment as children wrapper
//
// Kya karna hai:
// <>
//   <Header /><Body />
// </> — multiple children without extra DOM.
//
// Seedha matlab:
// children array hota hai multiple ho to. Fragment group karta hai.
// Modal children me kai elements OK.
// -----------------------------------------------------------------------------
function MultiChildModal({ children }) {
  return <div className="modal-body">{children}</div>;
}

// -----------------------------------------------------------------------------
// Q17: [MID] Inversion — parent doesn't know child type
//
// Kya karna hai:
// Layout children kuch bhi ho sakta — Form, Chart, Text.
//
// Seedha matlab:
// Open/closed principle. Shell stable, content pluggable.
// React design philosophy core.
// -----------------------------------------------------------------------------
function PageLayout({ children }) {
  return (
    <div className="page">
      <nav>Nav</nav>
      {children}
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q18: Explicit component prop vs children
//
// Kya karna hai:
// icon={<Icon />} prop vs children — semantic clarity.
//
// Seedha matlab:
// Single main content → children. Secondary pieces → named props (icon, suffix).
// API design: consumer ko confuse mat karo.
// -----------------------------------------------------------------------------
function InputField({ label, icon, suffix, ...inputProps }) {
  return (
    <label>
      {label}
      <span>
        {icon}
        <input {...inputProps} />
        {suffix}
      </span>
    </label>
  );
}

// -----------------------------------------------------------------------------
// Q19: Children.map for list render prop
//
// Kya karna hai:
// items.map(it => children(it)) — ListBox pattern (Q8).
//
// Seedha matlab:
// Parent iteration, consumer template deta hai per item.
// Render prop + list combo common.
// -----------------------------------------------------------------------------
function Table({ rows, children }) {
  return (
    <table>
      <tbody>
        {rows.map((row) => (
          <tr key={row.id}>{children(row)}</tr>
        ))}
      </tbody>
    </table>
  );
}

// -----------------------------------------------------------------------------
// Q20: [MID] Avoid nesting hell — extract subcomponents
//
// Kya karna hai:
// Deep JSX tree → Shell.Sidebar, Shell.Main subcomponents.
//
// Seedha matlab:
// Composition readable rakho. Compound namespacing (Tabs.Panel) DX boost.
// -----------------------------------------------------------------------------
function ShellSidebar({ children }) {
  return <aside>{children}</aside>;
}
function ShellMain({ children }) {
  return <main>{children}</main>;
}
Shell.Sidebar = ShellSidebar;
Shell.Main = ShellMain;

// -----------------------------------------------------------------------------
// Q21: Portal + children composition
//
// Kya karna hai:
// Modal children ko document.body pe portal — composition same API.
//
// Seedha matlab:
// Consumer <Modal><Form/></Modal> — andar portal handle. API clean.
// Implementation detail hide — composition preserve.
// -----------------------------------------------------------------------------
function PortalModal({ open, children }) {
  if (!open) return null;
  // createPortal(children, document.body) in real impl
  return <div className="portal-modal">{children}</div>;
}

// -----------------------------------------------------------------------------
// Q22: Polymorphic component light sketch
//
// Kya karna hai:
// as="a" | as="button" — element type consumer choose (advanced composition).
//
// Seedha matlab:
// Design systems me common. asChild se related — type flexibility.
// Simple start: children pass karo, wrap mat karo.
// -----------------------------------------------------------------------------
function PolymorphicNote() {
  return <p>as prop / asChild = same HTML tag flexibility, different API.</p>;
}

export {
  FancyBox,
  Shell,
  AppShell,
  Modal,
  Button,
  Mouse,
  Tabs,
  ListBox,
  CountChildren,
  Card,
  CardDemo,
  TabList,
  TabPanels,
  TabsCompound,
  DataLoader,
  StyledWrapper,
  ConfigVsComposeNote,
  MultiChildModal,
  PageLayout,
  InputField,
  Table,
  PortalModal,
  PolymorphicNote,
};
