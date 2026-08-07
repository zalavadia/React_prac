// ============================================================================
// 01 — What Is React And JSX
// Level: BASE  |  Sequence: pehle yeh, phir agla number
// ============================================================================
//
// LAYMAN: React = kitchen me chef jo UI (screen) banata hai pieces (components) se.
// JSX = HTML jaisa dikhta hai, lekin JS ke andar likhte ho — jaise recipe card
// jo code bhi hai. Browser JSX nahi samajhta; Vite/Babel ise JS me badal deta hai.
//
// React kya karta hai: data badle → UI update. Tum manually DOM nahi chhedte.
// JSX me { } = JS expression daalna. className = HTML class (class reserved hai).
//
// KYUN: React samajhne ka pehla step. Bina JSX/component soch ke hooks confuse honge.
// INTERVIEW: JSX kya hai; virtual DOM idea; why className; one parent rule.
// Vite/React 19 project me use — yeh teaching file hai, node se mat chalao.
//
// ============================================================================

import React, { Fragment } from "react";

// -----------------------------------------------------------------------------
// Q1: Pehla JSX element
//
// Kya karna hai:
// Ek simple <h1>Hello React</h1> return karo component se.
//
// Seedha matlab:
// Component = function jo JSX return kare.
// Yeh React ka "dabba" hai jo screen pe dikhega.
// -----------------------------------------------------------------------------
function Hello() {
  return <h1>Hello React</h1>;
}

// -----------------------------------------------------------------------------
// Q2: JS expression curly braces me
//
// Kya karna hai:
// name = "Ada". <p> me Hello, {name} dikhao.
//
// Seedha matlab:
// { } ke andar koi bhi JS expression chalega (variable, 1+1, call).
// String concat ki zarurat nahi — JSX me seedha mix.
// -----------------------------------------------------------------------------
function Greet() {
  const name = "Ada";
  return <p>Hello, {name}</p>;
}

// -----------------------------------------------------------------------------
// Q3: className (class nahi)
//
// Kya karna hai:
// div pe className="card" lagao, andar text.
//
// Seedha matlab:
// JS me class keyword reserved hai.
// Isliye React me className use karte hain. CSS same rehti hai.
// -----------------------------------------------------------------------------
function Card() {
  return <div className="card">Yeh ek card hai</div>;
}

// -----------------------------------------------------------------------------
// Q4: Self-closing tags
//
// Kya karna hai:
// <img /> aur <br /> self-close karo (JSX me zaruri).
//
// Seedha matlab:
// HTML me kabhi kabhi tag band nahi karte. JSX strict hai — band karo.
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
// Q5: Ek parent rule (Fragment)
//
// Kya karna hai:
// Do siblings return karo bina extra div ke — <>...</> use karo.
//
// Seedha matlab:
// return me ek root chahiye. Extra div DOM gandha karta hai.
// Fragment <> </> invisible wrapper hai.
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
// Kya karna hai:
// Header + main + footer wala chhota layout banao.
//
// Seedha matlab:
// JSX = tree. Parent children wrap karta hai — HTML jaisa nesting.
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
// Q7: [MID] JSX behind the scenes (createElement soch)
//
// Kya karna hai:
// Samjho: <h1 className="t">Hi</h1> ≈ React.createElement("h1", { className: "t" }, "Hi")
//
// Seedha matlab:
// JSX sugar hai. Internally objects (elements) bante hain.
// Interview me: "JSX HTML nahi, syntax sugar hai createElement ke liye."
// -----------------------------------------------------------------------------
// Conceptual — Vite/React project me JSX compile ho jata hai:
// const el = <h1 className="t">Hi</h1>;
// // roughly → React.createElement("h1", { className: "t" }, "Hi");

// -----------------------------------------------------------------------------
// Q8: [MID] Inline style object
//
// Kya karna hai:
// style={{ color: "tomato", fontSize: 18 }} lagao (camelCase CSS).
//
// Seedha matlab:
// style = object, string nahi. font-size → fontSize.
// Double { } : bahar JSX expression, andar object literal.
// -----------------------------------------------------------------------------
function Styled() {
  return <p style={{ color: "tomato", fontSize: 18 }}>Styled text</p>;
}

// -----------------------------------------------------------------------------
// Q9: Fragment with key (list me)
//
// Kya karna hai:
// map me <> ki jagah <React.Fragment key={id}> use karo.
//
// Seedha matlab:
// Short <> me key nahi lag sakti. List me key zaroori — Fragment bhi key le sakta hai.
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
// Kya karna hai:
// { if (x) ... } ❌ — ternary / && use karo.
//
// Seedha matlab:
// { } me sirf expression chalega, statement nahi. if/for/let block nahi.
// Interview trap: "JSX me if kaise?" → ternary ya && ya bahar if.
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
// Kya karna hai:
// User input seedha text me safe. dangerouslySetInnerHTML avoid unless trusted.
//
// Seedha matlab:
// React default me text escape karta hai — <script> string render nahi chalega.
// HTML inject chahiye? dangerouslySetInnerHTML — sirf sanitized/trusted source se.
// -----------------------------------------------------------------------------
function UserComment({ text }) {
  return <p>{text}</p>; // safe — React escapes HTML chars
}
// ❌ risky: <div dangerouslySetInnerHTML={{ __html: text }} />

// -----------------------------------------------------------------------------
// Q12: createElement manually (no JSX)
//
// Kya karna hai:
// React.createElement se same tree banao — JSX samajhne ke liye.
//
// Seedha matlab:
// JSX compile hoke createElement calls banta hai. Type, props, ...children.
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
// Kya karna hai:
// <Card>yeh andar</Card> → Card ke andar {children} render.
//
// Seedha matlab:
// Tags ke beech ka content automatically children prop ban jata hai.
// Wrapper / layout components ka core pattern.
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
// Kya karna hai:
// {count && <p>...</p>} — count 0 ho to screen pe "0" dikhega!
//
// Seedha matlab:
// false/null/undefined render nahi hote. 0 aur "" render hote hain.
// Fix: count > 0 && ... ya !!count && ... ya ternary.
// Interview trap bahut common.
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
// Kya karna hai:
// Samjho Vite/Babel JSX ko JS me badalta hai before browser.
//
// Seedha matlab:
// Browser JSX nahi samajhta. Build step: JSX → createElement (classic) ya jsx runtime (React 17+).
// Dev me HMR; prod me minified bundle.
// -----------------------------------------------------------------------------
// Before (you write):
// const el = <h1 className="t">Hi</h1>;
// After (roughly, automatic JSX runtime):
// import { jsx as _jsx } from "react/jsx-runtime";
// const el = _jsx("h1", { className: "t", children: "Hi" });

// -----------------------------------------------------------------------------
// Q16: Deep nested JSX tree
//
// Kya karna hai:
// Article > section > div > p nesting — readable indent rakho.
//
// Seedha matlab:
// JSX = tree structure. Har level parent ek child wrap karta hai.
// Deep nesting = split into components (02) — readability ke liye.
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
// Kya karna hai:
// {/* yeh comment */} — HTML <!-- --> JSX expression me nahi.
//
// Seedha matlab:
// JSX ke andar comment bhi { } expression block me likho.
// // line comment JSX tag ke beech me break kar sakta hai — careful.
// -----------------------------------------------------------------------------
function WithComment() {
  return (
    <div>
      {/* Sidebar placeholder — baad me component banega */}
      <aside>Side</aside>
      <main>Main</main>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q18: Spread attributes {...props}
//
// Kya karna hai:
// const attrs = { id: "x", "data-test": "btn" }; <button {...attrs} />
//
// Seedha matlab:
// Spread se saari props ek saath pass. Override: pehle spread, baad me specific prop.
// Handy wrappers; overuse = unclear kaunsi prop allowed hai.
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
// Kya karna hai:
// <label htmlFor="email"> — HTML for reserved hai JS me.
//
// Seedha matlab:
// JSX attributes camelCase: htmlFor, tabIndex, aria-* as-is, onClick.
// DOM property names match karte hain mostly, HTML attribute names nahi always.
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
// Q20: [ADV] null return — kuch mat dikhao
//
// Kya karna hai:
// Condition false ho to return null — empty render.
//
// Seedha matlab:
// Component null/undefined return kar sakta hai — kuch paint nahi.
// Useful: permission gate, loading placeholder parent handle kare.
// -----------------------------------------------------------------------------
function AdminOnly({ isAdmin }) {
  if (!isAdmin) return null;
  return <p>Secret admin panel</p>;
}

// -----------------------------------------------------------------------------
// Q21: [ADV] Array of elements return
//
// Kya karna hai:
// map se array of JSX return — har item pe key.
//
// Seedha matlab:
// React array of elements render kar sakta hai — lekin key list me must.
// Fragment ya single parent dono patterns valid.
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
// Kya karna hai:
// 200-line return mat rakho — chhote components me todo.
//
// Seedha matlab:
// Ek function ek kaam. JSX readable hona chahiye — extract Header, List, Footer.
// Real-world: file split + composition (02) se maintainable codebase.
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
