// ============================================================================
// 02 — Functional Components
// Level: BASE  |  Sequence: read this file, then the next number
// ============================================================================
//
// SIMPLE: Component = a station in the kitchen (tea counter, tandoor). Each station
// does its own job. Functional component = a normal JS function that returns JSX.
// Name starts with Capital — <Button /> tells React this is a component, not an HTML tag.
//
// One file can have many components. App = root where you wire everything together.
// Props come later (03). For now: write a function, return JSX, use it.
//
// WHY: React today runs on functional components + hooks. Class components are the old style.
// INTERVIEW: Why capital name; pure function idea; default vs named export.
// Use in a Vite + React 19 project — teaching file (do not run with node alone).
//
// ============================================================================

// -----------------------------------------------------------------------------
// Q1: Simplest functional component
//
// Task:
// function Title() { return <h1>My App</h1> }
//
// In simple words:
// Function + return JSX = component. That is all.
// -----------------------------------------------------------------------------
function Title() {
  return <h1>My App</h1>;
}

// -----------------------------------------------------------------------------
// Q2: Arrow function component
//
// Task:
// const Subtitle = () => <p>Learn React</p>
//
// In simple words:
// Arrow functions work too. Short return can skip extra () wrapping.
// -----------------------------------------------------------------------------
const Subtitle = () => <p>Learn React</p>;

// -----------------------------------------------------------------------------
// Q3: Component inside another component
//
// Task:
// Use Logo inside Header — composition.
//
// In simple words:
// Big UI = join small pieces. Do not copy-paste — reuse components.
// -----------------------------------------------------------------------------
function Logo() {
  return <span className="logo">⚛️ Prac</span>;
}

function Header() {
  return (
    <header>
      <Logo />
      <nav>Home</nav>
    </header>
  );
}

// -----------------------------------------------------------------------------
// Q4: Multiple returns? Early return pattern
//
// Task:
// If loading is true, return <p>Loading...</p>, otherwise content.
//
// In simple words:
// Early return is allowed in components — clean if/else.
// (Conditional rendering detail: 06)
// -----------------------------------------------------------------------------
function Panel({ loading }) {
  if (loading) return <p>Loading...</p>;
  return <p>Content ready</p>;
}

// -----------------------------------------------------------------------------
// Q5: Default export App pattern
//
// Task:
// Render Title + Subtitle inside App.
//
// In simple words:
// App is usually the root component. main.jsx mounts <App />.
// -----------------------------------------------------------------------------
function App() {
  return (
    <div>
      <Title />
      <Subtitle />
      <Header />
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q6: [MID] Component = pure UI function mindset
//
// Task:
// Same props → same JSX. Do not put side effects in render (alert, fetch).
//
// In simple words:
// Render should be predictable. Use useEffect (09) for effects.
// Interview: "Don't cause side effects during render."
// -----------------------------------------------------------------------------
function PurePrice({ amount }) {
  // GOOD: only calculate + return
  const tax = amount * 0.18;
  return <p>Total: {amount + tax}</p>;
  // BAD during render: fetch(...); localStorage.setItem(...)
}

// -----------------------------------------------------------------------------
// Q7: [MID] Named vs default export
//
// Task:
// Named export { Title } vs export default App — when to use which.
//
// In simple words:
// Default: one main thing from a file. Named: many pieces.
// Follow team style; mixing both causes confusion.
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// Q8: [MID] Component file organization
//
// Task:
// One component per file (team rule) OR folder/index — follow project convention.
//
// In simple words:
// Button.jsx, Button.module.css — colocate related files.
// Barrel export (index.js) keeps imports clean: import { Button } from "./ui".
// -----------------------------------------------------------------------------
// components/Button/Button.jsx
// components/Button/index.js  → export { default } from "./Button";

// -----------------------------------------------------------------------------
// Q9: Composition — join small pieces
//
// Task:
// Page = Sidebar + Content — each piece is a separate function.
//
// In simple words:
// Do not copy-paste big components — use small reusable blocks.
// Real apps: composition > inheritance (inheritance is rare in React).
// -----------------------------------------------------------------------------
function Sidebar() {
  return <aside>Menu</aside>;
}

function Content() {
  return <main>Article body</main>;
}

function Page() {
  return (
    <div className="layout">
      <Sidebar />
      <Content />
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q10: props.children as composition slot
//
// Task:
// Card wrapper accepts children — parent decides what goes inside.
//
// In simple words:
// children = "slot" pattern. Layout components stay flexible this way.
// -----------------------------------------------------------------------------
function Card({ title, children }) {
  return (
    <div className="card">
      <h4>{title}</h4>
      {children}
    </div>
  );
}

function CardDemo() {
  return (
    <Card title="Stats">
      <p>100 users</p>
      <p>50 orders</p>
    </Card>
  );
}

// -----------------------------------------------------------------------------
// Q11: When to split a component?
//
// Task:
// Same JSX copied in two places? → extract. Different responsibility? → new component.
//
// In simple words:
// Rule of thumb: reuse, readability, testability. Do not split every line.
// Over-splitting is also confusing — find balance.
// -----------------------------------------------------------------------------
function UserAvatar({ name }) {
  return <span className="avatar">{name[0]}</span>;
}

function UserRow({ name, role }) {
  return (
    <div className="row">
      <UserAvatar name={name} />
      <span>{name}</span>
      <span className="role">{role}</span>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q12: displayName for debugging
//
// Task:
// Give anonymous arrow a displayName — name shows in DevTools.
//
// In simple words:
// React DevTools makes the component tree readable.
// Especially useful for HOC/wrapper components.
// -----------------------------------------------------------------------------
const Mystery = () => <span>?</span>;
Mystery.displayName = "MysteryWidget";

// -----------------------------------------------------------------------------
// Q13: Fragment return — no extra DOM
//
// Task:
// Places like table rows — no extra div — return <>.
//
// In simple words:
// When DOM structure matters (CSS grid, table) — Fragment saves you.
// -----------------------------------------------------------------------------
function PairLines() {
  return (
    <>
      <dt>Term</dt>
      <dd>Definition</dd>
    </>
  );
}

// -----------------------------------------------------------------------------
// Q14: Conditional component type
//
// Task:
// Change tag with as prop — <Text as="h1" /> vs as="p".
//
// In simple words:
// One component can render multiple HTML elements.
// Common in design systems — polymorphic component.
// -----------------------------------------------------------------------------
function Text({ as: Tag = "p", children }) {
  return <Tag>{children}</Tag>;
}
// use: <Text as="h1">Title</Text>  <Text>Paragraph</Text>

// -----------------------------------------------------------------------------
// Q15: Wrapper component pattern
//
// Task:
// StyledBox — wraps className + children.
//
// In simple words:
// Shared styling/layout without repeating div everywhere.
// Pass through onClick etc with props spread (03).
// -----------------------------------------------------------------------------
function StyledBox({ className = "", children, ...rest }) {
  return (
    <div className={`box ${className}`} {...rest}>
      {children}
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q16: [MID] Side-effect anti-pattern in render
//
// Task:
// Do NOT fetch/alert/localStorage during render.
//
// In simple words:
// Side effects = useEffect (09) or event handlers.
// Render = only calculate UI. Violation = bugs + slow re-renders.
// -----------------------------------------------------------------------------
function SafeCounter({ count }) {
  // ❌ in render: console.log("side effect every render");
  return <p>Count: {count}</p>;
}

// -----------------------------------------------------------------------------
// Q17: [MID] Store component in a variable (careful)
//
// Task:
// const Widget = condition ? A : B; return <Widget /> — valid pattern.
//
// In simple words:
// Store component reference in variable — dynamic choice.
// Capital letter variable = React treats it as a component.
// -----------------------------------------------------------------------------
function Icon({ big }) {
  const Size = big ? BigIcon : SmallIcon;
  return <Size />;
}

function BigIcon() {
  return <span>🔵</span>;
}

function SmallIcon() {
  return <span>•</span>;
}

// -----------------------------------------------------------------------------
// Q18: [ADV] Higher-order layout — children function no, JSX yes
//
// Task:
// AuthGate — if allowed is false, show fallback, else children.
//
// In simple words:
// Wrapper decides render based on logic — composition + early return.
// -----------------------------------------------------------------------------
function AuthGate({ allowed, fallback, children }) {
  if (!allowed) return fallback ?? <p>Login required</p>;
  return children;
}

// -----------------------------------------------------------------------------
// Q19: [ADV] List of components pattern
//
// Task:
// sections array with { id, Component } — render with map.
//
// In simple words:
// Config-driven UI. Dashboard tabs, wizard steps — pick component from data.
// -----------------------------------------------------------------------------
function SectionA() {
  return <p>Section A</p>;
}

function SectionB() {
  return <p>Section B</p>;
}

const SECTIONS = [
  { id: "a", Component: SectionA },
  { id: "b", Component: SectionB },
];

function SectionList() {
  return (
    <div>
      {SECTIONS.map(({ id, Component }) => (
        <Component key={id} />
      ))}
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q20: [ADV] Memo-friendly — keep props stable mindset
//
// Task:
// Inline object/function is new every render — confuses memo child (16).
//
// In simple words:
// function PriceRow({ style, onBuy }) — parent inline {} / () => new ref every time.
// Basics for now; memo later — but remember in component design.
// -----------------------------------------------------------------------------
function PriceRow({ label, price }) {
  return (
    <p>
      {label}: ₹{price}
    </p>
  );
}

function PriceList() {
  const items = [
    { label: "Chai", price: 20 },
    { label: "Samosa", price: 15 },
  ];
  return (
    <div>
      {items.map((item) => (
        <PriceRow key={item.label} {...item} />
      ))}
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q21: [ADV] Single responsibility component
//
// Task:
// Do not cram fetch + UI + form in one function — split them.
//
// In simple words:
// Real-world: UserList (display) + useUsers (data hook 11) separate.
// Testing and reuse become easy.
// -----------------------------------------------------------------------------
function TodoItem({ text, done }) {
  return (
    <li style={{ textDecoration: done ? "line-through" : "none" }}>{text}</li>
  );
}

function TodoList({ items }) {
  return (
    <ul>
      {items.map((t) => (
        <TodoItem key={t.id} text={t.text} done={t.done} />
      ))}
    </ul>
  );
}

// -----------------------------------------------------------------------------
// Q22: [ADV] Interview trap — lowercase = DOM tag
//
// Task:
// function button() {} → <button /> is HTML, <Button /> is a component.
//
// In simple words:
// Lowercase name = built-in DOM element. Capital = custom component.
// Bug: wrong import / typo → silent wrong element.
// -----------------------------------------------------------------------------
function CustomButton({ children }) {
  return <button type="button" className="custom">{children}</button>;
}

function ButtonTrapDemo() {
  return (
    <div>
      <CustomButton>Works</CustomButton>
      {/* <button> lowercase = DOM, <CustomButton> = our component */}
    </div>
  );
}

export {
  Title,
  Subtitle,
  Logo,
  Header,
  Panel,
  PurePrice,
  Sidebar,
  Content,
  Page,
  Card,
  CardDemo,
  UserAvatar,
  UserRow,
  Mystery,
  PairLines,
  Text,
  StyledBox,
  SafeCounter,
  Icon,
  AuthGate,
  SectionList,
  PriceRow,
  PriceList,
  TodoItem,
  TodoList,
  CustomButton,
  ButtonTrapDemo,
};
export default App;
