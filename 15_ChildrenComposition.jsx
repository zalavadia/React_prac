// ============================================================================
// 15 — Children Composition
// Level: MID  |  Sequence: read this file, then the next number
// ============================================================================
//
// SIMPLE: children = whatever you put inside the box. Card, Modal, Layout —
// shell fixed, content flexible. Composition > inheritance (React way).
//
// <Modal><Form /></Modal> → Modal({ children }). slots: header/footer props
// or multiple props as elements. cloneElement rare — prefer explicit props.
//
// WHY: Flexible UI libraries. Avoid prop explosion "title, body, footer...".
// INTERVIEW: composition vs config props; containership.
// Use in a Vite + React 19 project — teaching file.
//
// ============================================================================

import { useEffect, useState } from "react";

// -----------------------------------------------------------------------------
// Q1: Basic children wrapper
//
// Task:
// FancyBox renders children.
//
// In simple words:
// Reusable chrome around unknown content.
// -----------------------------------------------------------------------------
function FancyBox({ children }) {
  return <div className="fancy">{children}</div>;
}

// -----------------------------------------------------------------------------
// Q2: Layout slots via props
//
// Task:
// sidebar + children main.
//
// In simple words:
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
// Task:
// open + onClose + children body.
//
// In simple words:
// Modal doesn't know if inside is Form or Text — children.
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
// Task:
// Sometimes wrap link styled as button — children / component prop.
//
// In simple words:
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
// Task:
// <Data>{(data) => <pre>...</pre>}</Data>
//
// In simple words:
// Parent gives data, child decides UI. Popular before hooks; now custom hooks.
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
// Task:
// Tabs + Tabs.Panel API feel — related pieces.
//
// In simple words:
// Implicit state share (context). Nice DX for libraries.
// -----------------------------------------------------------------------------
function Tabs({ children }) {
  const [active, setActive] = useState(0);
  return (
    <div>
      {/* real impl maps children / context — concept here */}
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
// Task:
// Inject extra props into children — prefer context or render prop.
//
// In simple words:
// cloneElement magic = brittle. Explicit is better.
// -----------------------------------------------------------------------------
// React.cloneElement(child, { extra }) // last resort

// -----------------------------------------------------------------------------
// Q8: [MID] Conditional children / empty
//
// Task:
// List empty → EmptyState as children pattern.
//
// In simple words:
// Parent structure, consumer passes empty UI.
// -----------------------------------------------------------------------------
function ListBox({ items, empty, children }) {
  if (!items.length) return empty ?? <p>Nothing</p>;
  return <ul>{items.map((it) => children(it))}</ul>;
}

// -----------------------------------------------------------------------------
// Q9: React.Children utilities (light)
//
// Task:
// React.Children.count(children), map, toArray — slot validation.
//
// In simple words:
// In compound components you can check which children are allowed.
// Don't overuse — explicit props often clearer.
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
// Task:
// React.cloneElement(child, { isActive }) — magic props inject.
//
// In simple words:
// Fragile: assumes child type, overrides clash. Prefer context/render prop.
// Radix asChild uses cloneElement internally — OK at library level.
// -----------------------------------------------------------------------------
// function InjectActive({ children, active }) {
//   return React.cloneElement(children, { "data-active": active });
// }

// -----------------------------------------------------------------------------
// Q11: [MID] Multiple slot props pattern
//
// Task:
// header, footer, actions as separate props — pass in JSX.
//
// In simple words:
// Avoid config props explosion. Named slots readable.
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
// Task:
// Tabs.List + Tabs.Panel — shared activeIndex via context.
//
// In simple words:
// Library API feel: related components as one family.
// Parent Tabs holds state; children consume context (see 11).
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
// Task:
// <Mouse>{(pos) => ...}</Mouse> vs const pos = useMouse() — hooks win usually.
//
// In simple words:
// Render prop = flexibility + composition. Hooks = same reuse, cleaner tree.
// Legacy libs use render props; modern code prefers custom hooks.
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
// Task:
// <Button asChild><a href="/">Link</a></Button> — merge styles, render child.
//
// In simple words:
// Button skips its own <button> — clone child and merge props (Radix style).
// Simple version: children pass through with className merge.
// -----------------------------------------------------------------------------
function StyledWrapper({ className, children }) {
  // light asChild-ish: consumer picks element, wrapper adds class
  return <div className={`styled ${className ?? ""}`}>{children}</div>;
}

// -----------------------------------------------------------------------------
// Q15: Composition over config props
//
// Task:
// <Modal title="" body="" footer="" /> ❌ vs children composition ✅
//
// In simple words:
// Pass each section as its own component — flexible order, custom layout.
// Config props get rigid in complex UI.
// -----------------------------------------------------------------------------
function ConfigVsComposeNote() {
  return <p>Composition = consumer control. Config = library decides structure.</p>;
}

// -----------------------------------------------------------------------------
// Q16: Fragment as children wrapper
//
// Task:
// <>
//   <Header /><Body />
// </> — multiple children without extra DOM.
//
// In simple words:
// children is an array when multiple. Fragment groups them.
// Modal children can have many elements OK.
// -----------------------------------------------------------------------------
function MultiChildModal({ children }) {
  return <div className="modal-body">{children}</div>;
}

// -----------------------------------------------------------------------------
// Q17: [MID] Inversion — parent doesn't know child type
//
// Task:
// Layout children can be anything — Form, Chart, Text.
//
// In simple words:
// Open/closed principle. Shell stable, content pluggable.
// Core React design philosophy.
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
// Task:
// icon={<Icon />} prop vs children — semantic clarity.
//
// In simple words:
// Single main content → children. Secondary pieces → named props (icon, suffix).
// API design: don't confuse the consumer.
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
// Task:
// items.map(it => children(it)) — ListBox pattern (Q8).
//
// In simple words:
// Parent iterates, consumer gives template per item.
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
// Task:
// Deep JSX tree → Shell.Sidebar, Shell.Main subcomponents.
//
// In simple words:
// Keep composition readable. Compound namespacing (Tabs.Panel) boosts DX.
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
// Task:
// Modal children to document.body via portal — same composition API.
//
// In simple words:
// Consumer <Modal><Form/></Modal> — portal handled inside. API stays clean.
// Hide implementation detail — preserve composition.
// -----------------------------------------------------------------------------
function PortalModal({ open, children }) {
  if (!open) return null;
  // createPortal(children, document.body) in real impl
  return <div className="portal-modal">{children}</div>;
}

// -----------------------------------------------------------------------------
// Q22: Polymorphic component light sketch
//
// Task:
// as="a" | as="button" — consumer picks element type (advanced composition).
//
// In simple words:
// Common in design systems. Related to asChild — type flexibility.
// Simple start: pass children, don't wrap.
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
