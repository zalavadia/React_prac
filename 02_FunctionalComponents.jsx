// ============================================================================
// 02 — Functional Components
// Level: BASE  |  Sequence: pehle yeh, phir agla number
// ============================================================================
//
// LAYMAN: Component = kitchen ka station (chai counter, tandoor). Har station
// apna kaam karta hai. Functional component = normal JS function jo JSX return kare.
// Naam Capital se start — <Button /> React ko batata hai yeh component hai, HTML tag nahi.
//
// Ek file me kai components ho sakte hain. App = root jahan sab jodte ho.
// Props baad me (03). Abhi: function banao, return JSX, use karo.
//
// KYUN: React aaj functional components + hooks pe chalta hai. Class purani style.
// INTERVIEW: Why capital name; pure function soch; default vs named export.
// Vite/React 19 project me use — teaching file.
//
// ============================================================================

// -----------------------------------------------------------------------------
// Q1: Simplest functional component
//
// Kya karna hai:
// function Title() { return <h1>My App</h1> }
//
// Seedha matlab:
// Function + return JSX = component. Bas itna.
// -----------------------------------------------------------------------------
function Title() {
  return <h1>My App</h1>;
}

// -----------------------------------------------------------------------------
// Q2: Arrow function component
//
// Kya karna hai:
// const Subtitle = () => <p>Learn React</p>
//
// Seedha matlab:
// Arrow bhi chalega. Short return me () optional wrapping.
// -----------------------------------------------------------------------------
const Subtitle = () => <p>Learn React</p>;

// -----------------------------------------------------------------------------
// Q3: Component ke andar doosra component
//
// Kya karna hai:
// Header me Logo use karo — composition.
//
// Seedha matlab:
// Bade UI = chhote pieces jodna. Copy-paste mat karo — component reuse.
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
// Kya karna hai:
// Agar loading true ho to <p>Loading...</p>, warna content.
//
// Seedha matlab:
// Component me early return allowed — clean if/else.
// (Conditional rendering detail: 06)
// -----------------------------------------------------------------------------
function Panel({ loading }) {
  if (loading) return <p>Loading...</p>;
  return <p>Content ready</p>;
}

// -----------------------------------------------------------------------------
// Q5: Default export App pattern
//
// Kya karna hai:
// App me Title + Subtitle render karo.
//
// Seedha matlab:
// App usually root component. main.jsx me <App /> mount hota hai.
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
// Q6: [MID] Component = pure UI function soch
//
// Kya karna hai:
// Same props → same JSX. Side-effect render me mat daalo (alert, fetch).
//
// Seedha matlab:
// Render predictible hona chahiye. Effects ke liye useEffect (09).
// Interview: "Don't cause side effects during render."
// -----------------------------------------------------------------------------
function PurePrice({ amount }) {
  // GOOD: sirf calculate + return
  const tax = amount * 0.18;
  return <p>Total: {amount + tax}</p>;
  // BAD during render: fetch(...); localStorage.setItem(...)
}

// -----------------------------------------------------------------------------
// Q7: [MID] Named vs default export
//
// Kya karna hai:
// Named export { Title } vs export default App — kab kya.
//
// Seedha matlab:
// Default: ek main cheez file se. Named: kai pieces.
// Team style follow karo; mix confuse karta hai.
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// Q8: [MID] Component file organization
//
// Kya karna hai:
// Ek component ek file (team rule) YA folder/index — project convention follow.
//
// Seedha matlab:
// Button.jsx, Button.module.css — colocate related files.
// Barrel export (index.js) se import clean: import { Button } from "./ui".
// -----------------------------------------------------------------------------
// components/Button/Button.jsx
// components/Button/index.js  → export { default } from "./Button";

// -----------------------------------------------------------------------------
// Q9: Composition — small pieces jodna
//
// Kya karna hai:
// Page = Sidebar + Content — har piece alag function.
//
// Seedha matlab:
// Bada component copy-paste nahi — chhote reusable blocks.
// Real apps me composition > inheritance (React me inheritance rare).
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
// Kya karna hai:
// Card wrapper children accept kare — parent decide kare andar kya.
//
// Seedha matlab:
// children = "slot" pattern. Layout components isi se flexible hote hain.
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
// Q11: Kab component split karein?
//
// Kya karna hai:
// Same JSX do jagah copy? → extract. Alag responsibility? → naya component.
//
// Seedha matlab:
// Rule of thumb: reuse, readability, testability. Har line pe mat todo.
// Over-splitting bhi confusing — balance.
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
// Q12: displayName debugging ke liye
//
// Kya karna hai:
// Anonymous arrow ko displayName do — DevTools me naam dikhe.
//
// Seedha matlab:
// React DevTools me component tree readable hota hai.
// HOC/wrapper me especially useful.
// -----------------------------------------------------------------------------
const Mystery = () => <span>?</span>;
Mystery.displayName = "MysteryWidget";

// -----------------------------------------------------------------------------
// Q13: Fragment return — no extra DOM
//
// Kya karna hai:
// Table row jaisi jagah extra div nahi — <> return.
//
// Seedha matlab:
// DOM structure matter kare (CSS grid, table) — Fragment bachata hai.
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
// Kya karna hai:
// as prop se tag badlo — <Text as="h1" /> vs as="p".
//
// Seedha matlab:
// Ek component multiple HTML elements render kar sakta hai.
// Design systems me common — polymorphic component.
// -----------------------------------------------------------------------------
function Text({ as: Tag = "p", children }) {
  return <Tag>{children}</Tag>;
}
// use: <Text as="h1">Title</Text>  <Text>Paragraph</Text>

// -----------------------------------------------------------------------------
// Q15: Wrapper component pattern
//
// Kya karna hai:
// StyledBox — className + children wrap kare.
//
// Seedha matlab:
// Shared styling/layout bina har jagah div repeat kiye.
// props spread se onClick etc pass through (03).
// -----------------------------------------------------------------------------
function StyledBox({ className = "", children, ...rest }) {
  return (
    <div className={`box ${className}`} {...rest}>
      {children}
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q16: [MID] Render me side-effect anti-pattern
//
// Kya karna hai:
// Render ke dauran fetch/alert/localStorage MAT karo.
//
// Seedha matlab:
// Side effects = useEffect (09) ya event handlers.
// Render = sirf UI calculate. Violation = bugs + slow re-renders.
// -----------------------------------------------------------------------------
function SafeCounter({ count }) {
  // ❌ render me: console.log("side effect every render");
  return <p>Count: {count}</p>;
}

// -----------------------------------------------------------------------------
// Q17: [MID] Component variable me store (careful)
//
// Kya karna hai:
// const Widget = condition ? A : B; return <Widget /> — valid pattern.
//
// Seedha matlab:
// Component reference variable me rakh ke render — dynamic choice.
// Capital letter variable = React component treat karega.
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
// Q18: [ADV] Higher-order layout — children function nahi, JSX
//
// Kya karna hai:
// AuthGate — allowed false to fallback, warna children.
//
// Seedha matlab:
// Wrapper decides render based on logic — composition + early return.
// -----------------------------------------------------------------------------
function AuthGate({ allowed, fallback, children }) {
  if (!allowed) return fallback ?? <p>Login required</p>;
  return children;
}

// -----------------------------------------------------------------------------
// Q19: [ADV] List of components pattern
//
// Kya karna hai:
// sections array me { id, Component } — map se render.
//
// Seedha matlab:
// Config-driven UI. Dashboard tabs, wizard steps — data se component pick.
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
// Q20: [ADV] Memo-friendly — props stable rakho soch
//
// Kya karna hai:
// Inline object/function har render naya — memo child ko confuse (16).
//
// Seedha matlab:
// function PriceRow({ style, onBuy }) — parent me inline {} / () => har bar new ref.
// Abhi basics; memo baad me — lekin component design me yaad rakho.
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
// Kya karna hai:
// Fetch + UI + form ek function me mat ghusao — split karo.
//
// Seedha matlab:
// Real-world: UserList (display) + useUsers (data hook 11) alag.
// Test aur reuse easy hota hai.
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
// Kya karna hai:
// function button() {} → <button /> HTML, <Button /> component.
//
// Seedha matlab:
// Lowercase name = built-in DOM element. Capital = custom component.
// Bug: component import galat / typo → silent wrong element.
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
