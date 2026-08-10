// ============================================================================
// 01 — What Is React And JSX
// Level: BASE  |  Sequence: read this file, then the next number
// ============================================================================
//
// SIMPLE: React = a chef in the kitchen who builds the UI (screen) from pieces (components).
// JSX = looks like HTML, but you write it inside JS — like a recipe card that is also code.
// The browser does not understand JSX; Vite/Babel turns it into JS.
//
// What React does: data changes → UI updates. You do not touch the DOM manually.
// In JSX, { } = insert a JS expression. className = HTML class (class is reserved in JS).
//
// WHY: First step to understanding React. Without JSX/component thinking, hooks will confuse you.
// INTERVIEW: What is JSX; virtual DOM idea; why className; one parent rule.
// Use in a Vite + React 19 project — teaching file (do not run with node alone).
//
// ============================================================================

import React, { Fragment } from "react";

// -----------------------------------------------------------------------------
// Q1: First JSX element
//
// Task:
// Return a simple <h1>Hello React</h1> from a component.
//
// In simple words:
// Component = a function that returns JSX.
// This is React's "box" that will show on the screen.
// -----------------------------------------------------------------------------
function Hello() {
  return <h1>Hello React</h1>;
}

// -----------------------------------------------------------------------------
// Q2: JS expression in curly braces
//
// Task:
// name = "Ada". Show Hello, {name} inside <p>.
//
// In simple words:
// Any JS expression works inside { } (variable, 1+1, function call).
// No string concat needed — mix directly in JSX.
// -----------------------------------------------------------------------------
function Greet() {
  const name = "Ada";
  return <p>Hello, {name}</p>;
}

// -----------------------------------------------------------------------------
// Q3: className (not class)
//
// Task:
// Put className="card" on a div, with text inside.
//
// In simple words:
// The class keyword is reserved in JS.
// So React uses className. CSS stays the same.
// -----------------------------------------------------------------------------
function Card() {
  return <div className="card">Yeh ek card hai</div>;
}

// -----------------------------------------------------------------------------
// Q4: Self-closing tags
//
// Task:
// Self-close <img /> and <br /> (required in JSX).
//
// In simple words:
// In HTML you sometimes skip closing tags. JSX is strict — close them.
// -----------------------------------------------------------------------------
function Avatar() {
  return (
    <div>
      <img src="/me.png" alt="profile" />
      <br />
      <span>Profile</span>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q5: One parent rule (Fragment)
//
// Task:
// Return two siblings without an extra div — use <>...</>.
//
// In simple words:
// return needs one root. An extra div clutters the DOM.
// Fragment <> </> is an invisible wrapper.
// -----------------------------------------------------------------------------
function TwoLines() {
  return (
    <>
      <p>Line 1</p>
      <p>Line 2</p>
    </>
  );
}

// -----------------------------------------------------------------------------
// Q6: Nested JSX tree
//
// Task:
// Build a small layout with header + main + footer.
//
// In simple words:
// JSX = a tree. Parent wraps children — like HTML nesting.
// -----------------------------------------------------------------------------
function Layout() {
  return (
    <div className="page">
      <header>Site</header>
      <main>Content</main>
      <footer>© 2026</footer>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q7: [MID] JSX behind the scenes (createElement mental model)
//
// Task:
// Understand: <h1 className="t">Hi</h1> ≈ React.createElement("h1", { className: "t" }, "Hi")
//
// In simple words:
// JSX is sugar. Internally objects (elements) are created.
// In interviews: "JSX is not HTML, it is syntax sugar for createElement."
// -----------------------------------------------------------------------------
// Conceptual — in a Vite/React project JSX compiles automatically:
// const el = <h1 className="t">Hi</h1>;
// // roughly → React.createElement("h1", { className: "t" }, "Hi");

// -----------------------------------------------------------------------------
// Q8: [MID] Inline style object
//
// Task:
// Apply style={{ color: "tomato", fontSize: 18 }} (camelCase CSS).
//
// In simple words:
// style = object, not a string. font-size → fontSize.
// Double { } : outer = JSX expression, inner = object literal.
// -----------------------------------------------------------------------------
function Styled() {
  return <p style={{ color: "tomato", fontSize: 18 }}>Styled text</p>;
}

// -----------------------------------------------------------------------------
// Q9: Fragment with key (in lists)
//
// Task:
// In map, use <React.Fragment key={id}> instead of <>.
//
// In simple words:
// Short <> cannot take a key. Lists need keys — Fragment can have a key too.
// -----------------------------------------------------------------------------
function ItemList({ items }) {
  return (
    <ul>
      {items.map((item) => (
        <Fragment key={item.id}>
          <li>{item.title}</li>
          <li className="meta">{item.tag}</li>
        </Fragment>
      ))}
    </ul>
  );
}

// -----------------------------------------------------------------------------
// Q10: Expression vs statement trap
//
// Task:
// { if (x) ... } ❌ — use ternary / && instead.
//
// In simple words:
// Only expressions go inside { }, not statements. No if/for/let blocks.
// Interview trap: "How to use if in JSX?" → ternary, &&, or if outside.
// -----------------------------------------------------------------------------
function StatusBadge({ ok }) {
  return (
    <span>
      {ok ? "✅ Pass" : "❌ Fail"}
      {ok && <small> All good</small>}
    </span>
  );
}

// -----------------------------------------------------------------------------
// Q11: JSX injection safety (XSS)
//
// Task:
// User input as plain text is safe. Avoid dangerouslySetInnerHTML unless trusted.
//
// In simple words:
// React escapes text by default — a <script> string will not run.
// Need HTML injection? dangerouslySetInnerHTML — only from sanitized/trusted source.
// -----------------------------------------------------------------------------
function UserComment({ text }) {
  return <p>{text}</p>; // safe — React escapes HTML chars
}
// ❌ risky: <div dangerouslySetInnerHTML={{ __html: text }} />

// -----------------------------------------------------------------------------
// Q12: createElement manually (no JSX)
//
// Task:
// Build the same tree with React.createElement — to understand JSX.
//
// In simple words:
// JSX compiles into createElement calls. Type, props, ...children.
// -----------------------------------------------------------------------------
function ManualHello() {
  return React.createElement(
    "div",
    { className: "wrap" },
    React.createElement("h1", null, "Hello"),
    React.createElement("p", null, "No JSX here")
  );
}

// -----------------------------------------------------------------------------
// Q13: children prop implicit
//
// Task:
// <Card>content inside</Card> → render {children} inside Card.
//
// In simple words:
// Content between tags automatically becomes the children prop.
// Core pattern for wrapper / layout components.
// -----------------------------------------------------------------------------
function CardWrap({ title, children }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <div className="body">{children}</div>
    </div>
  );
}
// use: <CardWrap title="Note"><p>Body text</p></CardWrap>

// -----------------------------------------------------------------------------
// Q14: Boolean rendering quirks (0, "", false)
//
// Task:
// {count && <p>...</p>} — when count is 0, "0" shows on screen!
//
// In simple words:
// false/null/undefined do not render. 0 and "" do render.
// Fix: count > 0 && ... or !!count && ... or ternary.
// Very common interview trap.
// -----------------------------------------------------------------------------
function CartHint({ count }) {
  return (
    <div>
      {count > 0 && <p>You have {count} items</p>}
      {Boolean(count) && <span>Non-zero cart</span>}
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q15: [MID] Babel transform mental model
//
// Task:
// Understand that Vite/Babel converts JSX to JS before the browser.
//
// In simple words:
// Browser does not understand JSX. Build step: JSX → createElement (classic) or jsx runtime (React 17+).
// Dev has HMR; prod has minified bundle.
// -----------------------------------------------------------------------------
// Before (you write):
// const el = <h1 className="t">Hi</h1>;
// After (roughly, automatic JSX runtime):
// import { jsx as _jsx } from "react/jsx-runtime";
// const el = _jsx("h1", { className: "t", children: "Hi" });

// -----------------------------------------------------------------------------
// Q16: Deep nested JSX tree
//
// Task:
// Article > section > div > p nesting — keep readable indent.
//
// In simple words:
// JSX = tree structure. Each level wraps one child.
// Deep nesting = split into components (02) — for readability.
// -----------------------------------------------------------------------------
function ArticleBlock() {
  return (
    <article>
      <header>
        <h1>React Basics</h1>
        <p className="subtitle">JSX tree demo</p>
      </header>
      <section>
        <div className="content">
          <p>Nested paragraph inside section.</p>
        </div>
      </section>
      <footer>End</footer>
    </article>
  );
}

// -----------------------------------------------------------------------------
// Q17: Comments in JSX
//
// Task:
// {/* this comment */} — not HTML <!-- --> inside JSX expression.
//
// In simple words:
// Inside JSX, comments also go in a { } expression block.
// // line comments can break inside JSX tags — be careful.
// -----------------------------------------------------------------------------
function WithComment() {
  return (
    <div>
      {/* Sidebar placeholder — will become a component later */}
      <aside>Side</aside>
      <main>Main</main>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q18: Spread attributes {...props}
//
// Task:
// const attrs = { id: "x", "data-test": "btn" }; <button {...attrs} />
//
// In simple words:
// Spread passes all props at once. Override: spread first, then specific prop.
// Handy for wrappers; overuse = unclear which props are allowed.
// -----------------------------------------------------------------------------
function SpreadButton({ label, ...rest }) {
  return (
    <button type="button" {...rest}>
      {label}
    </button>
  );
}
// use: <SpreadButton label="Go" className="primary" onClick={fn} />

// -----------------------------------------------------------------------------
// Q19: [MID] htmlFor / tabIndex camelCase
//
// Task:
// <label htmlFor="email"> — HTML for is reserved in JS.
//
// In simple words:
// JSX attributes are camelCase: htmlFor, tabIndex, aria-* as-is, onClick.
// They mostly match DOM property names, not always HTML attribute names.
// -----------------------------------------------------------------------------
function LabelDemo() {
  return (
    <div>
      <label htmlFor="email">Email</label>
      <input id="email" tabIndex={1} />
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q20: [ADV] null return — show nothing
//
// Task:
// When condition is false, return null — empty render.
//
// In simple words:
// Component can return null/undefined — nothing is painted.
// Useful: permission gate, loading placeholder handled by parent.
// -----------------------------------------------------------------------------
function AdminOnly({ isAdmin }) {
  if (!isAdmin) return null;
  return <p>Secret admin panel</p>;
}

// -----------------------------------------------------------------------------
// Q21: [ADV] Array of elements return
//
// Task:
// Return array of JSX from map — key on each item.
//
// In simple words:
// React can render an array of elements — but key is required in lists.
// Fragment or single parent — both patterns are valid.
// -----------------------------------------------------------------------------
function TagRow({ tags }) {
  return (
    <div className="tags">
      {tags.map((tag) => (
        <span key={tag} className="tag">
          {tag}
        </span>
      ))}
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q22: [ADV] Anti-pattern — huge inline JSX blob
//
// Task:
// Do not keep a 200-line return — split into smaller components.
//
// In simple words:
// One function, one job. JSX should be readable — extract Header, List, Footer.
// Real-world: file split + composition (02) = maintainable codebase.
// -----------------------------------------------------------------------------
function PageShell({ header, children, footer }) {
  return (
    <div className="page">
      <header>{header}</header>
      <main>{children}</main>
      <footer>{footer}</footer>
    </div>
  );
}

function GoodSplitPage() {
  return (
    <PageShell
      header={<h1>Dashboard</h1>}
      footer={<small>© App</small>}
    >
      <p>Main content alag component me bhi ho sakta hai.</p>
    </PageShell>
  );
}

export {
  Hello,
  Greet,
  Card,
  Avatar,
  TwoLines,
  Layout,
  Styled,
  ItemList,
  StatusBadge,
  UserComment,
  ManualHello,
  CardWrap,
  CartHint,
  ArticleBlock,
  WithComment,
  SpreadButton,
  LabelDemo,
  AdminOnly,
  TagRow,
  GoodSplitPage,
};
