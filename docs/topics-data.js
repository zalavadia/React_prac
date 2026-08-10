const TOPICS = [
  {
    "level": "BASE",
    "items": [
      {
        "file": "01_WhatIsReactAndJSX.jsx",
        "title": "01 — What Is React And JSX",
        "kya": "React = a chef in the kitchen who builds the UI (screen) from pieces (components).",
        "detail": "01 — What Is React And JSX\nLevel: BASE  |  Sequence: read this file, then the next number\n\nSIMPLE: React = a chef in the kitchen who builds the UI (screen) from pieces (components).\nJSX = looks like HTML, but you write it inside JS — like a recipe card that is also code.\nThe browser does not understand JSX; Vite/Babel turns it into JS.\n\nWhat React does: data changes → UI updates. You do not touch the DOM manually.\nIn JSX, { } = insert a JS expression. className = HTML class (class is reserved in JS).\n\nWHY: First step to understanding React. Without JSX/component thinking, hooks will confuse you.\nINTERVIEW: What is JSX; virtual DOM idea; why className; one parent rule.\nUse in a Vite + React 19 project — teaching file (do not run with node alone).",
        "intro": "01 — What Is React And JSX\nLevel: BASE  |  Sequence: read this file, then the next number\n\nSIMPLE: React = a chef in the kitchen who builds the UI (screen) from pieces (components).\nJSX = looks like HTML, but you write it inside JS — like a recipe card that is also code.\nThe browser does not understand JSX; Vite/Babel turns it into JS.\n\nWhat React does: data changes → UI updates. You do not touch the DOM manually.\nIn JSX, { } = insert a JS expression. className = HTML class (class is reserved in JS).\n\nWHY: First step to understanding React. Without JSX/component thinking, hooks will confuse you.\nINTERVIEW: What is JSX; virtual DOM idea; why className; one parent rule.\nUse in a Vite + React 19 project — teaching file (do not run with node alone).",
        "questions": [
          {
            "title": "Q1: First JSX element",
            "explain": "Task:\nReturn a simple <h1>Hello React</h1> from a component.\n\nIn simple words:\nComponent = a function that returns JSX.\nThis is React's \"box\" that will show on the screen.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Hello() {\n  return <h1>Hello React</h1>;\n}"
          },
          {
            "title": "Q2: JS expression in curly braces",
            "explain": "Task:\nname = \"Ada\". Show Hello, {name} inside <p>.\n\nIn simple words:\nAny JS expression works inside { } (variable, 1+1, function call).\nNo string concat needed — mix directly in JSX.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Greet() {\n  const name = \"Ada\";\n  return <p>Hello, {name}</p>;\n}"
          },
          {
            "title": "Q3: className (not class)",
            "explain": "Task:\nPut className=\"card\" on a div, with text inside.\n\nIn simple words:\nThe class keyword is reserved in JS.\nSo React uses className. CSS stays the same.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Card() {\n  return <div className=\"card\">Yeh ek card hai</div>;\n}"
          },
          {
            "title": "Q4: Self-closing tags",
            "explain": "Task:\nSelf-close <img /> and <br /> (required in JSX).\n\nIn simple words:\nIn HTML you sometimes skip closing tags. JSX is strict — close them.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Avatar() {\n  return (\n    <div>\n      <img src=\"/me.png\" alt=\"profile\" />\n      <br />\n      <span>Profile</span>\n    </div>\n  );\n}"
          },
          {
            "title": "Q5: One parent rule (Fragment)",
            "explain": "Task:\nReturn two siblings without an extra div — use <>...</>.\n\nIn simple words:\nreturn needs one root. An extra div clutters the DOM.\nFragment <> </> is an invisible wrapper.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function TwoLines() {\n  return (\n    <>\n      <p>Line 1</p>\n      <p>Line 2</p>\n    </>\n  );\n}"
          },
          {
            "title": "Q6: Nested JSX tree",
            "explain": "Task:\nBuild a small layout with header + main + footer.\n\nIn simple words:\nJSX = a tree. Parent wraps children — like HTML nesting.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Layout() {\n  return (\n    <div className=\"page\">\n      <header>Site</header>\n      <main>Content</main>\n      <footer>© 2026</footer>\n    </div>\n  );\n}"
          },
          {
            "title": "Q7: [MID] JSX behind the scenes (createElement mental model)",
            "explain": "Task:\nUnderstand: <h1 className=\"t\">Hi</h1> ≈ React.createElement(\"h1\", { className: \"t\" }, \"Hi\")\n\nIn simple words:\nJSX is sugar. Internally objects (elements) are created.\nIn interviews: \"JSX is not HTML, it is syntax sugar for createElement.\"",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "// Conceptual — in a Vite/React project JSX compiles automatically:\n// const el = <h1 className=\"t\">Hi</h1>;\n// // roughly → React.createElement(\"h1\", { className: \"t\" }, \"Hi\");"
          },
          {
            "title": "Q8: [MID] Inline style object",
            "explain": "Task:\nApply style={{ color: \"tomato\", fontSize: 18 }} (camelCase CSS).\n\nIn simple words:\nstyle = object, not a string. font-size → fontSize.\nDouble { } : outer = JSX expression, inner = object literal.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Styled() {\n  return <p style={{ color: \"tomato\", fontSize: 18 }}>Styled text</p>;\n}"
          },
          {
            "title": "Q9: Fragment with key (in lists)",
            "explain": "Task:\nIn map, use <React.Fragment key={id}> instead of <>.\n\nIn simple words:\nShort <> cannot take a key. Lists need keys — Fragment can have a key too.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function ItemList({ items }) {\n  return (\n    <ul>\n      {items.map((item) => (\n        <Fragment key={item.id}>\n          <li>{item.title}</li>\n          <li className=\"meta\">{item.tag}</li>\n        </Fragment>\n      ))}\n    </ul>\n  );\n}"
          },
          {
            "title": "Q10: Expression vs statement trap",
            "explain": "Task:\n{ if (x) ... } ❌ — use ternary / && instead.\n\nIn simple words:\nOnly expressions go inside { }, not statements. No if/for/let blocks.\nInterview trap: \"How to use if in JSX?\" → ternary, &&, or if outside.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function StatusBadge({ ok }) {\n  return (\n    <span>\n      {ok ? \"✅ Pass\" : \"❌ Fail\"}\n      {ok && <small> All good</small>}\n    </span>\n  );\n}"
          },
          {
            "title": "Q11: JSX injection safety (XSS)",
            "explain": "Task:\nUser input as plain text is safe. Avoid dangerouslySetInnerHTML unless trusted.\n\nIn simple words:\nReact escapes text by default — a <script> string will not run.\nNeed HTML injection? dangerouslySetInnerHTML — only from sanitized/trusted source.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function UserComment({ text }) {\n  return <p>{text}</p>; // safe — React escapes HTML chars\n}\n// ❌ risky: <div dangerouslySetInnerHTML={{ __html: text }} />"
          },
          {
            "title": "Q12: createElement manually (no JSX)",
            "explain": "Task:\nBuild the same tree with React.createElement — to understand JSX.\n\nIn simple words:\nJSX compiles into createElement calls. Type, props, ...children.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function ManualHello() {\n  return React.createElement(\n    \"div\",\n    { className: \"wrap\" },\n    React.createElement(\"h1\", null, \"Hello\"),\n    React.createElement(\"p\", null, \"No JSX here\")\n  );\n}"
          },
          {
            "title": "Q13: children prop implicit",
            "explain": "Task:\n<Card>content inside</Card> → render {children} inside Card.\n\nIn simple words:\nContent between tags automatically becomes the children prop.\nCore pattern for wrapper / layout components.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function CardWrap({ title, children }) {\n  return (\n    <div className=\"card\">\n      <h3>{title}</h3>\n      <div className=\"body\">{children}</div>\n    </div>\n  );\n}\n// use: <CardWrap title=\"Note\"><p>Body text</p></CardWrap>"
          },
          {
            "title": "Q14: Boolean rendering quirks (0, \"\", false)",
            "explain": "Task:\n{count && <p>...</p>} — when count is 0, \"0\" shows on screen!\n\nIn simple words:\nfalse/null/undefined do not render. 0 and \"\" do render.\nFix: count > 0 && ... or !!count && ... or ternary.\nVery common interview trap.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function CartHint({ count }) {\n  return (\n    <div>\n      {count > 0 && <p>You have {count} items</p>}\n      {Boolean(count) && <span>Non-zero cart</span>}\n    </div>\n  );\n}"
          },
          {
            "title": "Q15: [MID] Babel transform mental model",
            "explain": "Task:\nUnderstand that Vite/Babel converts JSX to JS before the browser.\n\nIn simple words:\nBrowser does not understand JSX. Build step: JSX → createElement (classic) or jsx runtime (React 17+).\nDev has HMR; prod has minified bundle.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "// Before (you write):\n// const el = <h1 className=\"t\">Hi</h1>;\n// After (roughly, automatic JSX runtime):\n// import { jsx as _jsx } from \"react/jsx-runtime\";\n// const el = _jsx(\"h1\", { className: \"t\", children: \"Hi\" });"
          },
          {
            "title": "Q16: Deep nested JSX tree",
            "explain": "Task:\nArticle > section > div > p nesting — keep readable indent.\n\nIn simple words:\nJSX = tree structure. Each level wraps one child.\nDeep nesting = split into components (02) — for readability.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function ArticleBlock() {\n  return (\n    <article>\n      <header>\n        <h1>React Basics</h1>\n        <p className=\"subtitle\">JSX tree demo</p>\n      </header>\n      <section>\n        <div className=\"content\">\n          <p>Nested paragraph inside section.</p>\n        </div>\n      </section>\n      <footer>End</footer>\n    </article>\n  );\n}"
          },
          {
            "title": "Q17: Comments in JSX",
            "explain": "Task:\n{/* this comment */} — not HTML <!-- --> inside JSX expression.\n\nIn simple words:\nInside JSX, comments also go in a { } expression block.\n// line comments can break inside JSX tags — be careful.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function WithComment() {\n  return (\n    <div>\n      {/* Sidebar placeholder — will become a component later */}\n      <aside>Side</aside>\n      <main>Main</main>\n    </div>\n  );\n}"
          },
          {
            "title": "Q18: Spread attributes {...props}",
            "explain": "Task:\nconst attrs = { id: \"x\", \"data-test\": \"btn\" }; <button {...attrs} />\n\nIn simple words:\nSpread passes all props at once. Override: spread first, then specific prop.\nHandy for wrappers; overuse = unclear which props are allowed.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function SpreadButton({ label, ...rest }) {\n  return (\n    <button type=\"button\" {...rest}>\n      {label}\n    </button>\n  );\n}\n// use: <SpreadButton label=\"Go\" className=\"primary\" onClick={fn} />"
          },
          {
            "title": "Q19: [MID] htmlFor / tabIndex camelCase",
            "explain": "Task:\n<label htmlFor=\"email\"> — HTML for is reserved in JS.\n\nIn simple words:\nJSX attributes are camelCase: htmlFor, tabIndex, aria-* as-is, onClick.\nThey mostly match DOM property names, not always HTML attribute names.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function LabelDemo() {\n  return (\n    <div>\n      <label htmlFor=\"email\">Email</label>\n      <input id=\"email\" tabIndex={1} />\n    </div>\n  );\n}"
          },
          {
            "title": "Q20: [ADV] null return — show nothing",
            "explain": "Task:\nWhen condition is false, return null — empty render.\n\nIn simple words:\nComponent can return null/undefined — nothing is painted.\nUseful: permission gate, loading placeholder handled by parent.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function AdminOnly({ isAdmin }) {\n  if (!isAdmin) return null;\n  return <p>Secret admin panel</p>;\n}"
          },
          {
            "title": "Q21: [ADV] Array of elements return",
            "explain": "Task:\nReturn array of JSX from map — key on each item.\n\nIn simple words:\nReact can render an array of elements — but key is required in lists.\nFragment or single parent — both patterns are valid.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function TagRow({ tags }) {\n  return (\n    <div className=\"tags\">\n      {tags.map((tag) => (\n        <span key={tag} className=\"tag\">\n          {tag}\n        </span>\n      ))}\n    </div>\n  );\n}"
          },
          {
            "title": "Q22: [ADV] Anti-pattern — huge inline JSX blob",
            "explain": "Task:\nDo not keep a 200-line return — split into smaller components.\n\nIn simple words:\nOne function, one job. JSX should be readable — extract Header, List, Footer.\nReal-world: file split + composition (02) = maintainable codebase.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function PageShell({ header, children, footer }) {\n  return (\n    <div className=\"page\">\n      <header>{header}</header>\n      <main>{children}</main>\n      <footer>{footer}</footer>\n    </div>\n  );\n}\n\nfunction GoodSplitPage() {\n  return (\n    <PageShell\n      header={<h1>Dashboard</h1>}\n      footer={<small>© App</small>}\n    >\n      <p>Main content alag component me bhi ho sakta hai.</p>\n    </PageShell>\n  );\n}"
          }
        ]
      },
      {
        "file": "02_FunctionalComponents.jsx",
        "title": "02 — Functional Components",
        "kya": "Component = a station in the kitchen (tea counter, tandoor). Each station",
        "detail": "02 — Functional Components\nLevel: BASE  |  Sequence: read this file, then the next number\n\nSIMPLE: Component = a station in the kitchen (tea counter, tandoor). Each station\ndoes its own job. Functional component = a normal JS function that returns JSX.\nName starts with Capital — <Button /> tells React this is a component, not an HTML tag.\n\nOne file can have many components. App = root where you wire everything together.\nProps come later (03). For now: write a function, return JSX, use it.\n\nWHY: React today runs on functional components + hooks. Class components are the old style.\nINTERVIEW: Why capital name; pure function idea; default vs named export.\nUse in a Vite + React 19 project — teaching file (do not run with node alone).\n\n-----------------------------------------------------------------------------\nQ1: Simplest functional component\n\nTask:",
        "intro": "02 — Functional Components\nLevel: BASE  |  Sequence: read this file, then the next number\n\nSIMPLE: Component = a station in the kitchen (tea counter, tandoor). Each station\ndoes its own job. Functional component = a normal JS function that returns JSX.\nName starts with Capital — <Button /> tells React this is a component, not an HTML tag.\n\nOne file can have many components. App = root where you wire everything together.\nProps come later (03). For now: write a function, return JSX, use it.\n\nWHY: React today runs on functional components + hooks. Class components are the old style.\nINTERVIEW: Why capital name; pure function idea; default vs named export.\nUse in a Vite + React 19 project — teaching file (do not run with node alone).\n\n-----------------------------------------------------------------------------\nQ1: Simplest functional component\n\nTask:",
        "questions": [
          {
            "title": "Q1: Simplest functional component",
            "explain": "Task:\nfunction Title() { return <h1>My App</h1> }\n\nIn simple words:\nFunction + return JSX = component. That is all.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Title() {\n  return <h1>My App</h1>;\n}"
          },
          {
            "title": "Q2: Arrow function component",
            "explain": "Task:\nconst Subtitle = () => <p>Learn React</p>\n\nIn simple words:\nArrow functions work too. Short return can skip extra () wrapping.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const Subtitle = () => <p>Learn React</p>;"
          },
          {
            "title": "Q3: Component inside another component",
            "explain": "Task:\nUse Logo inside Header — composition.\n\nIn simple words:\nBig UI = join small pieces. Do not copy-paste — reuse components.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Logo() {\n  return <span className=\"logo\">⚛️ Prac</span>;\n}\n\nfunction Header() {\n  return (\n    <header>\n      <Logo />\n      <nav>Home</nav>\n    </header>\n  );\n}"
          },
          {
            "title": "Q4: Multiple returns? Early return pattern",
            "explain": "Task:\nIf loading is true, return <p>Loading...</p>, otherwise content.\n\nIn simple words:\nEarly return is allowed in components — clean if/else.\n(Conditional rendering detail: 06)",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Panel({ loading }) {\n  if (loading) return <p>Loading...</p>;\n  return <p>Content ready</p>;\n}"
          },
          {
            "title": "Q5: Default export App pattern",
            "explain": "Task:\nRender Title + Subtitle inside App.\n\nIn simple words:\nApp is usually the root component. main.jsx mounts <App />.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function App() {\n  return (\n    <div>\n      <Title />\n      <Subtitle />\n      <Header />\n    </div>\n  );\n}"
          },
          {
            "title": "Q6: [MID] Component = pure UI function mindset",
            "explain": "Task:\nSame props → same JSX. Do not put side effects in render (alert, fetch).\n\nIn simple words:\nRender should be predictable. Use useEffect (09) for effects.\nInterview: \"Don't cause side effects during render.\"",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function PurePrice({ amount }) {\n  // GOOD: only calculate + return\n  const tax = amount * 0.18;\n  return <p>Total: {amount + tax}</p>;\n  // BAD during render: fetch(...); localStorage.setItem(...)\n}"
          },
          {
            "title": "Q7: [MID] Named vs default export",
            "explain": "Task:\nNamed export { Title } vs export default App — when to use which.\n\nIn simple words:\nDefault: one main thing from a file. Named: many pieces.\nFollow team style; mixing both causes confusion.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Conceptual — see the comments in the teaching file.",
            "code": "// see teaching file comments"
          },
          {
            "title": "Q8: [MID] Component file organization",
            "explain": "Task:\nOne component per file (team rule) OR folder/index — follow project convention.\n\nIn simple words:\nButton.jsx, Button.module.css — colocate related files.\nBarrel export (index.js) keeps imports clean: import { Button } from \"./ui\".",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "// components/Button/Button.jsx\n// components/Button/index.js  → export { default } from \"./Button\";"
          },
          {
            "title": "Q9: Composition — join small pieces",
            "explain": "Task:\nPage = Sidebar + Content — each piece is a separate function.\n\nIn simple words:\nDo not copy-paste big components — use small reusable blocks.\nReal apps: composition > inheritance (inheritance is rare in React).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Sidebar() {\n  return <aside>Menu</aside>;\n}\n\nfunction Content() {\n  return <main>Article body</main>;\n}\n\nfunction Page() {\n  return (\n    <div className=\"layout\">\n      <Sidebar />\n      <Content />\n    </div>\n  );\n}"
          },
          {
            "title": "Q10: props.children as composition slot",
            "explain": "Task:\nCard wrapper accepts children — parent decides what goes inside.\n\nIn simple words:\nchildren = \"slot\" pattern. Layout components stay flexible this way.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Card({ title, children }) {\n  return (\n    <div className=\"card\">\n      <h4>{title}</h4>\n      {children}\n    </div>\n  );\n}\n\nfunction CardDemo() {\n  return (\n    <Card title=\"Stats\">\n      <p>100 users</p>\n      <p>50 orders</p>\n    </Card>\n  );\n}"
          },
          {
            "title": "Q11: When to split a component?",
            "explain": "Task:\nSame JSX copied in two places? → extract. Different responsibility? → new component.\n\nIn simple words:\nRule of thumb: reuse, readability, testability. Do not split every line.\nOver-splitting is also confusing — find balance.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function UserAvatar({ name }) {\n  return <span className=\"avatar\">{name[0]}</span>;\n}\n\nfunction UserRow({ name, role }) {\n  return (\n    <div className=\"row\">\n      <UserAvatar name={name} />\n      <span>{name}</span>\n      <span className=\"role\">{role}</span>\n    </div>\n  );\n}"
          },
          {
            "title": "Q12: displayName for debugging",
            "explain": "Task:\nGive anonymous arrow a displayName — name shows in DevTools.\n\nIn simple words:\nReact DevTools makes the component tree readable.\nEspecially useful for HOC/wrapper components.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const Mystery = () => <span>?</span>;\nMystery.displayName = \"MysteryWidget\";"
          },
          {
            "title": "Q13: Fragment return — no extra DOM",
            "explain": "Task:\nPlaces like table rows — no extra div — return <>.\n\nIn simple words:\nWhen DOM structure matters (CSS grid, table) — Fragment saves you.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function PairLines() {\n  return (\n    <>\n      <dt>Term</dt>\n      <dd>Definition</dd>\n    </>\n  );\n}"
          },
          {
            "title": "Q14: Conditional component type",
            "explain": "Task:\nChange tag with as prop — <Text as=\"h1\" /> vs as=\"p\".\n\nIn simple words:\nOne component can render multiple HTML elements.\nCommon in design systems — polymorphic component.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Text({ as: Tag = \"p\", children }) {\n  return <Tag>{children}</Tag>;\n}\n// use: <Text as=\"h1\">Title</Text>  <Text>Paragraph</Text>"
          },
          {
            "title": "Q15: Wrapper component pattern",
            "explain": "Task:\nStyledBox — wraps className + children.\n\nIn simple words:\nShared styling/layout without repeating div everywhere.\nPass through onClick etc with props spread (03).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function StyledBox({ className = \"\", children, ...rest }) {\n  return (\n    <div className={`box ${className}`} {...rest}>\n      {children}\n    </div>\n  );\n}"
          },
          {
            "title": "Q16: [MID] Side-effect anti-pattern in render",
            "explain": "Task:\nDo NOT fetch/alert/localStorage during render.\n\nIn simple words:\nSide effects = useEffect (09) or event handlers.\nRender = only calculate UI. Violation = bugs + slow re-renders.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function SafeCounter({ count }) {\n  // ❌ in render: console.log(\"side effect every render\");\n  return <p>Count: {count}</p>;\n}"
          },
          {
            "title": "Q17: [MID] Store component in a variable (careful)",
            "explain": "Task:\nconst Widget = condition ? A : B; return <Widget /> — valid pattern.\n\nIn simple words:\nStore component reference in variable — dynamic choice.\nCapital letter variable = React treats it as a component.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Icon({ big }) {\n  const Size = big ? BigIcon : SmallIcon;\n  return <Size />;\n}\n\nfunction BigIcon() {\n  return <span>🔵</span>;\n}\n\nfunction SmallIcon() {\n  return <span>•</span>;\n}"
          },
          {
            "title": "Q18: [ADV] Higher-order layout — children function no, JSX yes",
            "explain": "Task:\nAuthGate — if allowed is false, show fallback, else children.\n\nIn simple words:\nWrapper decides render based on logic — composition + early return.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function AuthGate({ allowed, fallback, children }) {\n  if (!allowed) return fallback ?? <p>Login required</p>;\n  return children;\n}"
          },
          {
            "title": "Q19: [ADV] List of components pattern",
            "explain": "Task:\nsections array with { id, Component } — render with map.\n\nIn simple words:\nConfig-driven UI. Dashboard tabs, wizard steps — pick component from data.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function SectionA() {\n  return <p>Section A</p>;\n}\n\nfunction SectionB() {\n  return <p>Section B</p>;\n}\n\nconst SECTIONS = [\n  { id: \"a\", Component: SectionA },\n  { id: \"b\", Component: SectionB },\n];\n\nfunction SectionList() {\n  return (\n    <div>\n      {SECTIONS.map(({ id, Component }) => (\n        <Component key={id} />\n      ))}\n    </div>\n  );\n}"
          },
          {
            "title": "Q20: [ADV] Memo-friendly — keep props stable mindset",
            "explain": "Task:\nInline object/function is new every render — confuses memo child (16).\n\nIn simple words:\nfunction PriceRow({ style, onBuy }) — parent inline {} / () => new ref every time.\nBasics for now; memo later — but remember in component design.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function PriceRow({ label, price }) {\n  return (\n    <p>\n      {label}: ₹{price}\n    </p>\n  );\n}\n\nfunction PriceList() {\n  const items = [\n    { label: \"Chai\", price: 20 },\n    { label: \"Samosa\", price: 15 },\n  ];\n  return (\n    <div>\n      {items.map((item) => (\n        <PriceRow key={item.label} {...item} />\n      ))}\n    </div>\n  );\n}"
          },
          {
            "title": "Q21: [ADV] Single responsibility component",
            "explain": "Task:\nDo not cram fetch + UI + form in one function — split them.\n\nIn simple words:\nReal-world: UserList (display) + useUsers (data hook 11) separate.\nTesting and reuse become easy.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function TodoItem({ text, done }) {\n  return (\n    <li style={{ textDecoration: done ? \"line-through\" : \"none\" }}>{text}</li>\n  );\n}\n\nfunction TodoList({ items }) {\n  return (\n    <ul>\n      {items.map((t) => (\n        <TodoItem key={t.id} text={t.text} done={t.done} />\n      ))}\n    </ul>\n  );\n}"
          },
          {
            "title": "Q22: [ADV] Interview trap — lowercase = DOM tag",
            "explain": "Task:\nfunction button() {} → <button /> is HTML, <Button /> is a component.\n\nIn simple words:\nLowercase name = built-in DOM element. Capital = custom component.\nBug: wrong import / typo → silent wrong element.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function CustomButton({ children }) {\n  return <button type=\"button\" className=\"custom\">{children}</button>;\n}\n\nfunction ButtonTrapDemo() {\n  return (\n    <div>\n      <CustomButton>Works</CustomButton>\n      {/* <button> lowercase = DOM, <CustomButton> = our component */}\n    </div>\n  );\n}"
          }
        ]
      },
      {
        "file": "03_Props.jsx",
        "title": "03 — Props",
        "kya": "Props = a parcel from parent to child. Like asking for salt from another table —",
        "detail": "03 — Props\nLevel: BASE  |  Sequence: read this file, then the next number\n\nSIMPLE: Props = a parcel from parent to child. Like asking for salt from another table —\nthe child does not invent it, the parent provides it. Props are READ-ONLY.\nThe child does not change props; for new data the parent updates state (lifting).\n\nSyntax: <User name=\"Ada\" age={30} /> → function User({ name, age }) { ... }\nDestructuring is common. Default props: name = \"Guest\".\nchildren = content between tags (deep dive in Q15).\n\nWHY: Understanding data flow is core to React. Without props, components are isolated toys.\nINTERVIEW: props immutable; one-way data flow; children prop.\nUse in a Vite + React 19 project — teaching file (do not run with node alone).",
        "intro": "03 — Props\nLevel: BASE  |  Sequence: read this file, then the next number\n\nSIMPLE: Props = a parcel from parent to child. Like asking for salt from another table —\nthe child does not invent it, the parent provides it. Props are READ-ONLY.\nThe child does not change props; for new data the parent updates state (lifting).\n\nSyntax: <User name=\"Ada\" age={30} /> → function User({ name, age }) { ... }\nDestructuring is common. Default props: name = \"Guest\".\nchildren = content between tags (deep dive in Q15).\n\nWHY: Understanding data flow is core to React. Without props, components are isolated toys.\nINTERVIEW: props immutable; one-way data flow; children prop.\nUse in a Vite + React 19 project — teaching file (do not run with node alone).",
        "questions": [
          {
            "title": "Q1: Simple string prop",
            "explain": "Task:\n<Hello name=\"Jay\" /> — show name inside Hello.\n\nIn simple words:\nAttribute = prop. Like a function argument.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Hello({ name }) {\n  return <h2>Hello, {name}</h2>;\n}\n// use: <Hello name=\"Jay\" />"
          },
          {
            "title": "Q2: Number / boolean props",
            "explain": "Task:\nage={25} (curly — number). isPro={true} or just isPro.\n\nIn simple words:\nQuotes = string. { } = JS value. Boolean shortcut: <Badge vip /> → vip is true.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Profile({ age, isPro }) {\n  return (\n    <p>\n      Age {age} — {isPro ? \"Pro\" : \"Free\"}\n    </p>\n  );\n}\n// use: <Profile age={25} isPro />"
          },
          {
            "title": "Q3: Object / array props",
            "explain": "Task:\nPass user={{ name: \"Ada\", city: \"Pune\" }}.\n\nIn simple words:\nComplex data goes as object/array. Inline object is new ref every render —\nbe careful with memo (16/17).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function UserCard({ user }) {\n  return (\n    <div>\n      {user.name} · {user.city}\n    </div>\n  );\n}\n// use: <UserCard user={{ name: \"Ada\", city: \"Pune\" }} />"
          },
          {
            "title": "Q4: Default parameter",
            "explain": "Task:\nname = \"Guest\" when prop is missing.\n\nIn simple words:\nJS default params — work in React too.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Welcome({ name = \"Guest\" }) {\n  return <p>Welcome, {name}</p>;\n}"
          },
          {
            "title": "Q5: children prop",
            "explain": "Task:\n<Box>inner text</Box> — Box renders children.\n\nIn simple words:\nchildren = content between opening/closing tags. Gold for wrapper components.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Box({ children }) {\n  return <div className=\"box\">{children}</div>;\n}\n// use: <Box><p>Inside</p></Box>"
          },
          {
            "title": "Q6: Props spread",
            "explain": "Task:\nconst props = { title: \"Hi\", open: true }; <Modal {...props} />\n\nIn simple words:\nSpread passes all keys. Handy but overuse = unclear API.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Modal({ title, open }) {\n  if (!open) return null;\n  return <dialog open>{title}</dialog>;\n}\n// use: const p = { title: \"Hi\", open: true }; <Modal {...p} />"
          },
          {
            "title": "Q7: [MID] Props are read-only",
            "explain": "Task:\nDo NOT do props.name = \"x\" in child. Wait for new prop from parent.\n\nIn simple words:\nMutation = bugs + breaks React assumptions. One-way: parent → child.\nNeed change? Send callback prop upward (lifting — 14).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Bad({ label }) {\n  // label = \"hack\"; // ❌ do not do this\n  return <span>{label}</span>;\n}\n\nfunction GoodParent() {\n  const [label, setLabel] = useState(\"ok\");\n  return <button onClick={() => setLabel(\"changed\")}>{label}</button>;\n}"
          },
          {
            "title": "Q8: [MID] Callback as prop",
            "explain": "Task:\nChild button calls onSave — parent passes handler.\n\nIn simple words:\nChild tells parent about events. Data up, UI down — common pattern.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function SaveButton({ onSave }) {\n  return <button onClick={onSave}>Save</button>;\n}\n\nfunction Editor() {\n  function handleSave() {\n    console.log(\"saved\");\n  }\n  return <SaveButton onSave={handleSave} />;\n}"
          },
          {
            "title": "Q9: children — special prop (nested JSX)",
            "explain": "Task:\nPanel with title + children as separate slots — flexible wrapper.\n\nIn simple words:\nchildren is an explicit prop — comes from <Panel>...</Panel>.\nMultiple slots later (header/footer props or compound components).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function PanelWrap({ title, children }) {\n  return (\n    <section>\n      <h3>{title}</h3>\n      <div>{children}</div>\n    </section>\n  );\n}"
          },
          {
            "title": "Q10: Default props — destructuring default",
            "explain": "Task:\nsize = \"md\", variant = \"primary\" when parent does not send them.\n\nIn simple words:\nJS default params = modern way. Old way: Component.defaultProps (deprecated feel).\nDefault applies on undefined; not on null.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Button({ label, size = \"md\", variant = \"primary\" }) {\n  return (\n    <button className={`btn btn-${size} btn-${variant}`}>{label}</button>\n  );\n}"
          },
          {
            "title": "Q11: [MID] Prop drilling intro",
            "explain": "Task:\nPass theme from App → Layout → Nav → Link — middle layers only forward.\n\nIn simple words:\nDrilling = passing prop through every level when middle layers do not use it.\nA little is OK; very deep = Context (13) or rethink composition.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function ThemeLink({ theme, href, children }) {\n  return (\n    <a href={href} style={{ color: theme }}>\n      {children}\n    </a>\n  );\n}\n\nfunction NavBar({ theme }) {\n  return (\n    <nav>\n      <ThemeLink theme={theme} href=\"/\">\n        Home\n      </ThemeLink>\n    </nav>\n  );\n}\n\nfunction AppShell({ theme }) {\n  return (\n    <div>\n      <NavBar theme={theme} />\n    </div>\n  );\n}"
          },
          {
            "title": "Q12: Spread props pass-through",
            "explain": "Task:\nInput wrapper — forward {...inputProps} to native input.\n\nIn simple words:\nAll valid input props from parent go down. Wrapper keeps its own props separate.\nPick/omit carefully — do not forward unwanted props to DOM (security).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function TextField({ label, ...inputProps }) {\n  return (\n    <label>\n      {label}\n      <input {...inputProps} />\n    </label>\n  );\n}\n// use: <TextField label=\"Name\" type=\"text\" placeholder=\"Ada\" />"
          },
          {
            "title": "Q13: Boolean props shorthand",
            "explain": "Task:\n<Input disabled /> = disabled={true}. Explicit false is different.\n\nIn simple words:\nIn JSX, attribute without value = true. For false write disabled={false}.\nInterview: <Checkbox checked /> vs checked={isChecked}.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function SubmitBtn({ disabled, loading }) {\n  return (\n    <button disabled={disabled || loading}>\n      {loading ? \"...\" : \"Submit\"}\n    </button>\n  );\n}\n// use: <SubmitBtn disabled />  <SubmitBtn loading={false} />"
          },
          {
            "title": "Q14: Callback prop with argument up",
            "explain": "Task:\nListItem click sends id to parent — onSelect(id).\n\nIn simple words:\nChild sends data upward. Parent will update state.\nArrow wrap: onClick={() => onSelect(id)} — bind id.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function ListItem({ id, label, onSelect }) {\n  return (\n    <li>\n      <button type=\"button\" onClick={() => onSelect(id)}>\n        {label}\n      </button>\n    </li>\n  );\n}\n\nfunction SelectList() {\n  const [picked, setPicked] = useState(null);\n  const items = [\n    { id: 1, label: \"Chai\" },\n    { id: 2, label: \"Coffee\" },\n  ];\n  return (\n    <div>\n      <ul>\n        {items.map((item) => (\n          <ListItem\n            key={item.id}\n            id={item.id}\n            label={item.label}\n            onSelect={setPicked}\n          />\n        ))}\n      </ul>\n      <p>Picked: {picked ?? \"none\"}</p>\n    </div>\n  );\n}"
          },
          {
            "title": "Q15: [MID] Render props light (function as child)",
            "explain": "Task:\nDataProvider gives children a function — {data => <UI />}.\n\nIn simple words:\n\"Render prop\" = parent has data/logic, child decides UI.\nLess common after hooks; still appears in libraries.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function DataProvider({ value, children }) {\n  return children(value);\n}\n\nfunction RenderPropDemo() {\n  return (\n    <DataProvider value={{ count: 42 }}>\n      {(data) => <p>Count from provider: {data.count}</p>}\n    </DataProvider>\n  );\n}"
          },
          {
            "title": "Q16: Prop types mental model (no library required)",
            "explain": "Task:\nThink API: name string, age number, onSave function — wrong type = bug.\n\nIn simple words:\nTypeScript / PropTypes runtime check — team chooses.\nMental model: component = function with documented input shape.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function TypedUser({ name, age, onSave }) {\n  // TS: interface { name: string; age: number; onSave: () => void }\n  return (\n    <div>\n      <p>\n        {name}, {age}\n      </p>\n      <button type=\"button\" onClick={onSave}>\n        Save\n      </button>\n    </div>\n  );\n}"
          },
          {
            "title": "Q17: [MID] Mutating props — anti-pattern detail",
            "explain": "Task:\nprops.items.push() ❌ — mutates parent's array. Copy/filter in parent.\n\nIn simple words:\nProps may share reference. Child mutate = parent changes too — React gets confused.\nBreaks one-way flow. Always use immutable updates.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function ItemCount({ items }) {\n  // ❌ items.push(\"new\") — corrupts parent state\n  return <p>{items.length} items</p>;\n}\n\nfunction ItemCountParent() {\n  const [items, setItems] = useState([\"a\", \"b\"]);\n  function addItem() {\n    setItems([...items, \"c\"]); // update in parent ✅\n  }\n  return (\n    <div>\n      <ItemCount items={items} />\n      <button type=\"button\" onClick={addItem}>\n        Add\n      </button>\n    </div>\n  );\n}"
          },
          {
            "title": "Q18: key prop special — component does not receive it",
            "explain": "Task:\n<Row key={id} id={id} /> — props.key is undefined inside Row (React uses it).\n\nIn simple words:\nkey is for React — reconciliation. Do not access inside component.\nNeed same data? Pass id as a separate prop.\nInterview trap: key={index} causes bugs on list reorder.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Row({ id, label }) {\n  return (\n    <tr>\n      <td>{id}</td>\n      <td>{label}</td>\n    </tr>\n  );\n}\n\nfunction RowList({ rows }) {\n  return (\n    <tbody>\n      {rows.map((row) => (\n        <Row key={row.id} id={row.id} label={row.label} />\n      ))}\n    </tbody>\n  );\n}"
          },
          {
            "title": "Q19: [ADV] Rest props omit pattern",
            "explain": "Task:\nconst { className, ...rest } = props — forward only safe DOM props.\n\nIn simple words:\nDo not send custom props (isLoading) to DOM — React warning.\nDestructure them out, then spread ...rest.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function FancyDiv({ isLoading, className, children, ...domProps }) {\n  return (\n    <div className={`fancy ${isLoading ? \"loading\" : \"\"} ${className}`} {...domProps}>\n      {children}\n    </div>\n  );\n}"
          },
          {
            "title": "Q20: [ADV] Optional chaining props",
            "explain": "Task:\nuser?.name when user can be null — avoid crash.\n\nIn simple words:\nProps can be undefined — defensive render. Fallback UI or skeleton.\nIdeally parent sends consistent shape.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function ProfileOptional({ user }) {\n  if (!user) return <p>No user</p>;\n  return (\n    <p>\n      {user.name} · {user.city ?? \"Unknown city\"}\n    </p>\n  );\n}"
          },
          {
            "title": "Q21: [ADV] Props vs state boundary",
            "explain": "Task:\nProp = external input. Local edit? copy to state (08 controlled pattern).\n\nIn simple words:\nChild cannot edit props directly — create local draft state.\nOn save, send new value to parent via callback.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function EditableLabel({ value, onChange }) {\n  const [draft, setDraft] = useState(value);\n  return (\n    <div>\n      <input value={draft} onChange={(e) => setDraft(e.target.value)} />\n      <button type=\"button\" onClick={() => onChange(draft)}>\n        Apply\n      </button>\n    </div>\n  );\n}"
          },
          {
            "title": "Q22: [ADV] Interview trap — spread unknown props",
            "explain": "Task:\n{...props} everything to DOM — custom props leak = warning / XSS surface.\n\nIn simple words:\nExplicit API > blind spread. Whitelist props or use TypeScript strict.\nCommon mistake in real-world UI library wrappers.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function SafeLink({ href, children, className }) {\n  // ✅ only known props — no blind {...unknown}\n  return (\n    <a href={href} className={className} rel=\"noopener noreferrer\">\n      {children}\n    </a>\n  );\n}"
          }
        ]
      },
      {
        "file": "04_UseState.jsx",
        "title": "04 — useState",
        "kya": "useState = a box with a value + a \"button to change the box\".",
        "detail": "04 — useState\nLevel: BASE  |  Sequence: read this file, then the next number\n\nSIMPLE: useState = a box with a value + a \"button to change the box\".\nLike a tea counter: cups = 0, each order cups++. The screen updates on its own.\nconst [count, setCount] = useState(0) — read count, write with setCount.\n\nsetCount(5) direct. setCount(c => c + 1) when you depend on the old value.\nObject/array update: make a new copy (spread), do not mutate.\n\nWHY: The heart of interactive UI. Without state you only have a static page.\nINTERVIEW: async batching; functional updater; don't mutate state.\nUse in a Vite + React 19 project — teaching file (do not run with node alone).",
        "intro": "04 — useState\nLevel: BASE  |  Sequence: read this file, then the next number\n\nSIMPLE: useState = a box with a value + a \"button to change the box\".\nLike a tea counter: cups = 0, each order cups++. The screen updates on its own.\nconst [count, setCount] = useState(0) — read count, write with setCount.\n\nsetCount(5) direct. setCount(c => c + 1) when you depend on the old value.\nObject/array update: make a new copy (spread), do not mutate.\n\nWHY: The heart of interactive UI. Without state you only have a static page.\nINTERVIEW: async batching; functional updater; don't mutate state.\nUse in a Vite + React 19 project — teaching file (do not run with node alone).",
        "questions": [
          {
            "title": "Q1: Counter basics",
            "explain": "Task:\nStart count at 0, +1 on button click.\n\nIn simple words:\nsetCount repaints the UI. Direct count++ does not work — React will not notice.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Counter() {\n  const [count, setCount] = useState(0);\n  return (\n    <button onClick={() => setCount(count + 1)}>Count: {count}</button>\n  );\n}"
          },
          {
            "title": "Q2: Toggle boolean",
            "explain": "Task:\nFlip isOpen true/false — Show/Hide.\n\nIn simple words:\nBoolean state = light switch. Connect to conditional UI (06).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Toggle() {\n  const [isOpen, setIsOpen] = useState(false);\n  return (\n    <div>\n      <button onClick={() => setIsOpen(!isOpen)}>\n        {isOpen ? \"Hide\" : \"Show\"}\n      </button>\n      {isOpen && <p>Secret panel</p>}\n    </div>\n  );\n}"
          },
          {
            "title": "Q3: String input state (preview)",
            "explain": "Task:\nname state, setName on input — controlled feel (08 goes deeper).\n\nIn simple words:\nEvery keystroke updates state = source of truth.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function NameBox() {\n  const [name, setName] = useState(\"\");\n  return (\n    <div>\n      <input value={name} onChange={(e) => setName(e.target.value)} />\n      <p>Hi, {name || \"stranger\"}</p>\n    </div>\n  );\n}"
          },
          {
            "title": "Q4: Functional updater",
            "explain": "Task:\nsetCount(c => c + 1) three times in one click — correct +3.\n\nIn simple words:\ncount + 1 three times may use stale value.\nUpdater always runs on the latest value.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function TripleAdd() {\n  const [count, setCount] = useState(0);\n  function addThree() {\n    setCount((c) => c + 1);\n    setCount((c) => c + 1);\n    setCount((c) => c + 1);\n  }\n  return <button onClick={addThree}>{count}</button>;\n}"
          },
          {
            "title": "Q5: Object state — immutable update",
            "explain": "Task:\nuser = { name, age }. Change only age — new object with spread.\n\nIn simple words:\nuser.age++ ❌. setUser({ ...user, age: user.age + 1 }) ✅",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function UserAge() {\n  const [user, setUser] = useState({ name: \"Ada\", age: 30 });\n  return (\n    <button\n      onClick={() => setUser({ ...user, age: user.age + 1 })}\n    >\n      {user.name} is {user.age}\n    </button>\n  );\n}"
          },
          {
            "title": "Q6: Array state — add item",
            "explain": "Task:\nAdd new item to todos without mutating.\n\nIn simple words:\nsetTodos([...todos, \"new\"]) or filter/map for new array.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function TodoAdd() {\n  const [todos, setTodos] = useState([\"milk\"]);\n  return (\n    <div>\n      <button onClick={() => setTodos([...todos, \"bread\"])}>Add bread</button>\n      <ul>\n        {todos.map((t) => (\n          <li key={t}>{t}</li>\n        ))}\n      </ul>\n    </div>\n  );\n}"
          },
          {
            "title": "Q7: [MID] Lazy initial state",
            "explain": "Task:\nuseState(() => heavyCompute()) — function form when init is expensive.\n\nIn simple words:\nuseState(heavy()) runs every render. useState(() => heavy()) runs once.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function ExpensiveInit() {\n  const [data] = useState(() => {\n    // imagine: localStorage parse / big calc — once\n    return { ready: true };\n  });\n  return <pre>{JSON.stringify(data)}</pre>;\n}"
          },
          {
            "title": "Q8: [MID] Multiple related states vs one object",
            "explain": "Task:\nForm fields: separate useState OR one object — tradeoff.\n\nIn simple words:\nRelated fields in one object is fine. Very independent → separate states.\nComplex logic → useReducer (12).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function FormBits() {\n  const [email, setEmail] = useState(\"\");\n  const [password, setPassword] = useState(\"\");\n  return (\n    <>\n      <input value={email} onChange={(e) => setEmail(e.target.value)} />\n      <input\n        type=\"password\"\n        value={password}\n        onChange={(e) => setPassword(e.target.value)}\n      />\n    </>\n  );\n}"
          },
          {
            "title": "Q9: [MID] Batching — multiple setState in one event",
            "explain": "Task:\nOne click with setA + setB — React 18 batches into one re-render (auto batch).\n\nIn simple words:\nUsed to batch only in sync handlers; now also in async/timeouts (18+).\nPerformance win — not a paint on every set.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function BatchDemo() {\n  const [a, setA] = useState(0);\n  const [b, setB] = useState(0);\n  function bumpBoth() {\n    setA((x) => x + 1);\n    setB((x) => x + 1);\n    // React batches → usually 1 re-render\n  }\n  return (\n    <button type=\"button\" onClick={bumpBoth}>\n      a={a} b={b}\n    </button>\n  );\n}"
          },
          {
            "title": "Q10: Stale state trap",
            "explain": "Task:\nsetCount(count + 1) twice quickly — only +1, not +2.\n\nIn simple words:\ncount closure may hold old value. Use functional updater.\nInterview classic: \"Why +1 twice gives +1?\"",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function StaleTrap() {\n  const [count, setCount] = useState(0);\n  function doubleBad() {\n    setCount(count + 1);\n    setCount(count + 1); // both use same stale count — +1 total\n  }\n  function doubleGood() {\n    setCount((c) => c + 1);\n    setCount((c) => c + 1); // +2 total ✅\n  }\n  return (\n    <div>\n      <p>{count}</p>\n      <button type=\"button\" onClick={doubleBad}>\n        Bad +2?\n      </button>\n      <button type=\"button\" onClick={doubleGood}>\n        Good +2\n      </button>\n    </div>\n  );\n}"
          },
          {
            "title": "Q11: Lazy init recap — expensive only once",
            "explain": "Task:\nuseState(readFromStorage) vs useState(() => readFromStorage()).\n\nIn simple words:\nDirect call = function runs every render (React ignores result but cost remains).\nLazy function = runs once on init render.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function LazyStorage() {\n  const [token] = useState(() => {\n    // imagine: JSON.parse(localStorage.getItem(\"t\") ?? \"null\")\n    return \"cached-once\";\n  });\n  return <code>{token}</code>;\n}"
          },
          {
            "title": "Q12: [MID] Derived state anti-pattern",
            "explain": "Task:\nDo NOT copy data from props into useState just to sync.\n\nIn simple words:\nfullName = first + last — calculate in render, not extra state.\nprops → state copy = out of sync bugs when parent updates.\nException: user edit draft (08) — intentional local copy.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function FullName({ first, last }) {\n  const fullName = `${first} ${last}`.trim(); // derived — no extra state\n  return <p>{fullName}</p>;\n}"
          },
          {
            "title": "Q13: Reset state with key",
            "explain": "Task:\nForm reset — parent changes key={userId} so child gets fresh state.\n\nIn simple words:\nkey change = React treats it as a new component, state starts from zero.\nClean trick to \"reset on prop change\" without useEffect.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function UserForm({ userId }) {\n  const [note, setNote] = useState(\"\");\n  return (\n    <input\n      value={note}\n      onChange={(e) => setNote(e.target.value)}\n      placeholder={`Notes for user ${userId}`}\n    />\n  );\n}\n\nfunction UserFormReset() {\n  const [userId, setUserId] = useState(1);\n  return (\n    <div>\n      <button type=\"button\" onClick={() => setUserId((u) => u + 1)}>\n        Switch user\n      </button>\n      <UserForm key={userId} userId={userId} />\n    </div>\n  );\n}"
          },
          {
            "title": "Q14: Updater chain — sequential updates",
            "explain": "Task:\nThree functional updaters at once — order guaranteed on latest value.\n\nIn simple words:\nsetS(s => ...); setS(s => ...); — queued, chain runs in order.\nDirect setS(s+1) mixed with functional — still prefer all functional if chained.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function ChainAdd() {\n  const [n, setN] = useState(0);\n  function addFive() {\n    setN((v) => v + 1);\n    setN((v) => v + 1);\n    setN((v) => v + 1);\n    setN((v) => v + 1);\n    setN((v) => v + 1);\n  }\n  return (\n    <button type=\"button\" onClick={addFive}>\n      {n}\n    </button>\n  );\n}"
          },
          {
            "title": "Q15: Array update — remove / toggle immutable",
            "explain": "Task:\nDelete with filter, toggle done flag with map.\n\nIn simple words:\nsplice/mutate ❌. Return new array = React detects change.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function TodoToggle() {\n  const [todos, setTodos] = useState([\n    { id: 1, text: \"milk\", done: false },\n    { id: 2, text: \"eggs\", done: false },\n  ]);\n  function toggle(id) {\n    setTodos((list) =>\n      list.map((t) => (t.id === id ? { ...t, done: !t.done } : t))\n    );\n  }\n  function remove(id) {\n    setTodos((list) => list.filter((t) => t.id !== id));\n  }\n  return (\n    <ul>\n      {todos.map((t) => (\n        <li key={t.id}>\n          <button type=\"button\" onClick={() => toggle(t.id)}>\n            {t.done ? \"☑\" : \"☐\"} {t.text}\n          </button>\n          <button type=\"button\" onClick={() => remove(t.id)}>\n            ×\n          </button>\n        </li>\n      ))}\n    </ul>\n  );\n}"
          },
          {
            "title": "Q16: Object nested immutable update",
            "explain": "Task:\nChange user.address.city — spread at each level.\n\nIn simple words:\nShallow spread covers one level. Nested = { ...user, address: { ...user.address, city: \"Mumbai\" } }.\nFor deep trees use Immer or normalized state (12).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function NestedUser() {\n  const [user, setUser] = useState({\n    name: \"Ada\",\n    address: { city: \"Pune\", pin: 411001 },\n  });\n  function moveCity() {\n    setUser({\n      ...user,\n      address: { ...user.address, city: \"Mumbai\" },\n    });\n  }\n  return (\n    <button type=\"button\" onClick={moveCity}>\n      {user.name} lives in {user.address.city}\n    </button>\n  );\n}"
          },
          {
            "title": "Q17: [MID] When NOT useState",
            "explain": "Task:\nDerived values, ref for DOM, server data → fetch + state / cache (TanStack Query).\n\nIn simple words:\nNot everything is state: const total = price * qty — calculate in render.\nFrequent DOM read? useRef (10). Complex transitions → useReducer (12).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function CartLine({ price, qty }) {\n  const total = price * qty; // derived — useState is waste\n  return (\n    <p>\n      ₹{price} × {qty} = ₹{total}\n    </p>\n  );\n}"
          },
          {
            "title": "Q18: [MID] SSR hydration note",
            "explain": "Task:\nServer HTML + client useState initial must match — else hydration mismatch.\n\nIn simple words:\nDo not use typeof window check for random initial on SSR.\nDate.now()/Math.random() differs server vs client first render → warning.\nClient-only state: set after mount in useEffect (09).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function HydrationSafe() {\n  const [mounted, setMounted] = useState(false);\n  // useEffect(() => setMounted(true), []); // real pattern — 09\n  return <p>{mounted ? \"Client ready\" : \"SSR shell\"}</p>;\n}"
          },
          {
            "title": "Q19: [ADV] React 19 useActionState contrast (brief)",
            "explain": "Task:\nForm pending/error state — used to be manual useState; React 19 has useActionState.\n\nIn simple words:\nManual: const [pending, setPending] = useState(false) around submit.\nReact 19: action + useActionState simplifies form async.\nCore useState still valid everywhere — this is an extra tool.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function ManualFormPending() {\n  const [pending, setPending] = useState(false);\n  const [error, setError] = useState(null);\n  async function submit(e) {\n    e.preventDefault();\n    setPending(true);\n    setError(null);\n    try {\n      // await save()\n    } catch (err) {\n      setError(err.message);\n    } finally {\n      setPending(false);\n    }\n  }\n  return (\n    <form onSubmit={submit}>\n      <button type=\"submit\" disabled={pending}>\n        {pending ? \"Saving...\" : \"Save\"}\n      </button>\n      {error && <p>{error}</p>}\n    </form>\n  );\n}"
          },
          {
            "title": "Q20: [ADV] State initializer with argument pattern",
            "explain": "Task:\nFactory: useState(() => createInitial(userId)) — lazy + dynamic init.\n\nIn simple words:\nInit function is usually zero-arg. For dynamic init use closure or key reset (Q13).\nState sync on userId change? key={userId} preferred over effect sync.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function ScoreBoard({ gameId }) {\n  const [score, setScore] = useState(() => 0);\n  return (\n    <p>\n      Game {gameId}: {score}{\" \"}\n      <button type=\"button\" onClick={() => setScore((s) => s + 1)}>\n        +1\n      </button>\n    </p>\n  );\n}"
          },
          {
            "title": "Q21: [ADV] Anti-pattern — too many useState calls",
            "explain": "Task:\n15 separate useState in related form — consider object or useReducer.\n\nIn simple words:\nRelated updates together? Object/reducer gives atomic update.\nSimple 2-3 fields? Separate useState is clean — do not over-unify.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function SimpleForm() {\n  const [form, setForm] = useState({ name: \"\", email: \"\" });\n  function update(field, value) {\n    setForm((f) => ({ ...f, [field]: value }));\n  }\n  return (\n    <>\n      <input\n        value={form.name}\n        onChange={(e) => update(\"name\", e.target.value)}\n      />\n      <input\n        value={form.email}\n        onChange={(e) => update(\"email\", e.target.value)}\n      />\n    </>\n  );\n}"
          },
          {
            "title": "Q22: [ADV] Interview — setState async feel",
            "explain": "Task:\nsetCount(5); console.log(count) — still shows old count.\n\nIn simple words:\nsetState schedules an update — variable does not change immediately.\nNeed new value? Use functional updater or useEffect on count (09).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function AsyncFeel() {\n  const [count, setCount] = useState(0);\n  function logAfterSet() {\n    setCount(99);\n    console.log(count); // still old — not 99 yet\n  }\n  return (\n    <button type=\"button\" onClick={logAfterSet}>\n      UI count: {count}\n    </button>\n  );\n}"
          }
        ]
      },
      {
        "file": "05_EventsHandling.jsx",
        "title": "05 — Events Handling",
        "kya": "Event = user did something — click, type, submit. React listens with",
        "detail": "05 — Events Handling\nLevel: BASE  |  Sequence: read this file, then the next number\n\nSIMPLE: Event = user did something — click, type, submit. React listens with\nonClick, onChange, onSubmit (camelCase). Handler = function that reacts.\n\nHTML: onclick=\"...\". React: onClick={handler} — pass function, do not call\nunless you need args: onClick={() => doX(id)}.\nevent.preventDefault() on forms stops page refresh.\n\nWHY: UI comes alive when events change state.\nINTERVIEW: synthetic events; pass vs call; preventDefault.\nUse in a Vite + React 19 project — teaching file (do not run with node alone).",
        "intro": "05 — Events Handling\nLevel: BASE  |  Sequence: read this file, then the next number\n\nSIMPLE: Event = user did something — click, type, submit. React listens with\nonClick, onChange, onSubmit (camelCase). Handler = function that reacts.\n\nHTML: onclick=\"...\". React: onClick={handler} — pass function, do not call\nunless you need args: onClick={() => doX(id)}.\nevent.preventDefault() on forms stops page refresh.\n\nWHY: UI comes alive when events change state.\nINTERVIEW: synthetic events; pass vs call; preventDefault.\nUse in a Vite + React 19 project — teaching file (do not run with node alone).",
        "questions": [
          {
            "title": "Q1: onClick basic",
            "explain": "Task:\nalert / console on button click.\n\nIn simple words:\nonClick={fn} — reference. onClick={fn()} calls immediately — wrong (usually).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function ClickMe() {\n  function handleClick() {\n    console.log(\"clicked\");\n  }\n  return <button onClick={handleClick}>Click</button>;\n}"
          },
          {
            "title": "Q2: Inline arrow with arg",
            "explain": "Task:\nDelete list item by passing id.\n\nIn simple words:\nNeed extra arg? Use () => handler(id). Otherwise you get the event object.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Item({ id, onDelete }) {\n  return <button onClick={() => onDelete(id)}>Delete {id}</button>;\n}"
          },
          {
            "title": "Q3: onChange input",
            "explain": "Task:\nUpdate state from e.target.value.\n\nIn simple words:\nNew value on every change. Heart of controlled input.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function TypeBox() {\n  const [text, setText] = useState(\"\");\n  return (\n    <input\n      value={text}\n      onChange={(e) => setText(e.target.value)}\n      placeholder=\"Type...\"\n    />\n  );\n}"
          },
          {
            "title": "Q4: Form onSubmit + preventDefault",
            "explain": "Task:\nOn form submit, prevent page reload; log data.\n\nIn simple words:\nBrowser default = full reload. preventDefault is required in SPAs.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function LoginForm() {\n  const [email, setEmail] = useState(\"\");\n  function handleSubmit(e) {\n    e.preventDefault();\n    console.log(\"submit\", email);\n  }\n  return (\n    <form onSubmit={handleSubmit}>\n      <input value={email} onChange={(e) => setEmail(e.target.value)} />\n      <button type=\"submit\">Login</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q5: onMouseEnter / leave",
            "explain": "Task:\nHighlight state on hover.\n\nIn simple words:\nMouse events follow same pattern — handler + setState.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function HoverCard() {\n  const [hot, setHot] = useState(false);\n  return (\n    <div\n      onMouseEnter={() => setHot(true)}\n      onMouseLeave={() => setHot(false)}\n      style={{ background: hot ? \"#ffe08a\" : \"#eee\" }}\n    >\n      Hover me\n    </div>\n  );\n}"
          },
          {
            "title": "Q6: Stop propagation (bubbling)",
            "explain": "Task:\nInner click should not fire outer click — e.stopPropagation().\n\nIn simple words:\nEvents bubble up to parent. Sometimes inner should behave differently.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function NestedClicks() {\n  return (\n    <div onClick={() => console.log(\"outer\")}>\n      <button\n        onClick={(e) => {\n          e.stopPropagation();\n          console.log(\"inner only\");\n        }}\n      >\n        Inner\n      </button>\n    </div>\n  );\n}"
          },
          {
            "title": "Q7: [MID] Disabled + loading click guard",
            "explain": "Task:\nWhen saving is true, disable button / ignore extra clicks.\n\nIn simple words:\nStop double submit — UX + safety. disabled={saving}.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function SaveOnce() {\n  const [saving, setSaving] = useState(false);\n  async function save() {\n    if (saving) return;\n    setSaving(true);\n    // await api...\n    setSaving(false);\n  }\n  return (\n    <button onClick={save} disabled={saving}>\n      {saving ? \"Saving...\" : \"Save\"}\n    </button>\n  );\n}"
          },
          {
            "title": "Q8: [MID] Keyboard onKeyDown",
            "explain": "Task:\nTrigger search on Enter.\n\nIn simple words:\nAccessibility + power users. e.key === \"Enter\".",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function SearchBox({ onSearch }) {\n  const [q, setQ] = useState(\"\");\n  return (\n    <input\n      value={q}\n      onChange={(e) => setQ(e.target.value)}\n      onKeyDown={(e) => {\n        if (e.key === \"Enter\") onSearch(q);\n      }}\n    />\n  );\n}"
          },
          {
            "title": "Q9: [MID] Synthetic events",
            "explain": "Task:\nReact event object looks native — it is a wrapper for cross-browser support.\n\nIn simple words:\ne.preventDefault(), e.target same API feel. React 17+ attaches listeners at root.\nNative e.nativeEvent for underlying event (rare need).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function SyntheticDemo() {\n  function handleClick(e) {\n    e.preventDefault();\n    console.log(e.type, e.target.tagName); // SyntheticBaseEvent\n  }\n  return (\n    <a href=\"/go\" onClick={handleClick}>\n      Link\n    </a>\n  );\n}"
          },
          {
            "title": "Q10: Event pooling legacy note",
            "explain": "Task:\nReact 16 and earlier: async needed e.persist() — not anymore.\n\nIn simple words:\nOld tutorials mention \"pooling\" — removed in React 17+.\nInterview: \"Can I use event async?\" — Modern React: yes, no persist needed.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function AsyncEventOk() {\n  async function handleClick(e) {\n    console.log(e.type); // safe in React 17+\n    await new Promise((r) => setTimeout(r, 100));\n    console.log(\"after await\", e.type); // still ok — no e.persist()\n  }\n  return <button type=\"button\" onClick={handleClick}>Async click</button>;\n}"
          },
          {
            "title": "Q11: preventDefault vs stopPropagation",
            "explain": "Task:\nLink click: preventDefault = stop navigate. stopPropagation = stop bubble.\n\nIn simple words:\nThey do different jobs. Form submit → preventDefault. Modal inner click → stopPropagation.\nSometimes you need both; do not confuse them.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function PreventVsStop() {\n  return (\n    <div onClick={() => console.log(\"card click\")}>\n      <a\n        href=\"#\"\n        onClick={(e) => {\n          e.preventDefault(); // stop hash change / nav\n          e.stopPropagation(); // card handler should not fire\n          console.log(\"link only\");\n        }}\n      >\n        Action\n      </a>\n    </div>\n  );\n}"
          },
          {
            "title": "Q12: onClick vs onMouseDown",
            "explain": "Task:\nMouseDown fires first — use mousedown when you need action before drag/select.\n\nIn simple words:\nClick = mousedown + mouseup on same element. UI feel can differ.\nExample: instant color picker — onMouseDown. Normal buttons — onClick.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function DownVsClick() {\n  const [msg, setMsg] = useState(\"\");\n  return (\n    <div>\n      <button\n        type=\"button\"\n        onMouseDown={() => setMsg(\"down first\")}\n        onClick={() => setMsg(\"click after\")}\n      >\n        Press me\n      </button>\n      <p>{msg}</p>\n    </div>\n  );\n}"
          },
          {
            "title": "Q13: Keyboard — Escape close pattern",
            "explain": "Task:\nonKeyDown with e.key === \"Escape\" → close modal.\n\nIn simple words:\nAccessibility: keyboard users get same UX. Tab focus is a separate topic (a11y).\ne.key preferred over keyCode (deprecated).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function EscapeModal({ open, onClose }) {\n  if (!open) return null;\n  return (\n    <div\n      role=\"dialog\"\n      tabIndex={-1}\n      onKeyDown={(e) => {\n        if (e.key === \"Escape\") onClose();\n      }}\n    >\n      <p>Press Escape</p>\n      <button type=\"button\" onClick={onClose}>\n        Close\n      </button>\n    </div>\n  );\n}\n\nfunction EscapeDemo() {\n  const [open, setOpen] = useState(false);\n  return (\n    <div>\n      <button type=\"button\" onClick={() => setOpen(true)}>\n        Open\n      </button>\n      <EscapeModal open={open} onClose={() => setOpen(false)} />\n    </div>\n  );\n}"
          },
          {
            "title": "Q14: Form submit — button type matters",
            "explain": "Task:\n<button type=\"submit\"> submits form. type=\"button\" avoids accidental submit.\n\nIn simple words:\nDefault button type inside form = submit (HTML). Extra buttons → type=\"button\".\nInterview trap: \"Why page reloads?\" — submit without preventDefault.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function MultiButtonForm() {\n  const [log, setLog] = useState(\"\");\n  function handleSubmit(e) {\n    e.preventDefault();\n    setLog(\"submitted\");\n  }\n  return (\n    <form onSubmit={handleSubmit}>\n      <button type=\"button\" onClick={() => setLog(\"draft saved\")}>\n        Save draft\n      </button>\n      <button type=\"submit\">Publish</button>\n      <p>{log}</p>\n    </form>\n  );\n}"
          },
          {
            "title": "Q15: Passing multiple args to handler",
            "explain": "Task:\nonClick={() => moveItem(id, direction)} — curry or inline arrow.\n\nIn simple words:\nFixed handler signature? bind/curry: const onMove = (id) => (dir) => ...\nInline arrow is most readable for beginners.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function MoveRow({ id, label, onMove }) {\n  return (\n    <div>\n      {label}\n      <button type=\"button\" onClick={() => onMove(id, \"up\")}>\n        ↑\n      </button>\n      <button type=\"button\" onClick={() => onMove(id, \"down\")}>\n        ↓\n      </button>\n    </div>\n  );\n}\n\nfunction MoveList() {\n  const [order, setOrder] = useState([\"a\", \"b\", \"c\"]);\n  function move(id, dir) {\n    setOrder((items) => {\n      const i = items.indexOf(id);\n      if (i < 0) return items;\n      const j = dir === \"up\" ? i - 1 : i + 1;\n      if (j < 0 || j >= items.length) return items;\n      const next = [...items];\n      [next[i], next[j]] = [next[j], next[i]];\n      return next;\n    });\n  }\n  return (\n    <div>\n      {order.map((id) => (\n        <MoveRow key={id} id={id} label={id} onMove={move} />\n      ))}\n    </div>\n  );\n}"
          },
          {
            "title": "Q16: [MID] Stale closure in event handler",
            "explain": "Task:\nsetTimeout with old count — fix with functional setState or ref (10).\n\nIn simple words:\nHandler captures closure when created. Async delay = stale value risk.\nFix: setCount(c => c + 1) or countRef.current.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function StaleHandler() {\n  const [count, setCount] = useState(0);\n  function delayedBad() {\n    setTimeout(() => {\n      setCount(count + 1); // stale count inside timeout\n    }, 1000);\n  }\n  function delayedGood() {\n    setTimeout(() => {\n      setCount((c) => c + 1); // always fresh ✅\n    }, 1000);\n  }\n  return (\n    <div>\n      <p>{count}</p>\n      <button type=\"button\" onClick={delayedBad}>\n        Bad delay +1\n      </button>\n      <button type=\"button\" onClick={delayedGood}>\n        Good delay +1\n      </button>\n    </div>\n  );\n}"
          },
          {
            "title": "Q17: [MID] Event delegation mental model",
            "explain": "Task:\nReact 17+ listeners on root — not a separate native listener on every button.\n\nIn simple words:\nDelegation = less memory, friendly to dynamic lists. React optimizes internally.\nUsually nothing extra for you to do — understand for interviews.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function DelegatedList({ items, onPick }) {\n  return (\n    <ul\n      onClick={(e) => {\n        const li = e.target.closest(\"[data-id]\");\n        if (li) onPick(li.dataset.id);\n      }}\n    >\n      {items.map((id) => (\n        <li key={id} data-id={id}>\n          Item {id}\n        </li>\n      ))}\n    </ul>\n  );\n}"
          },
          {
            "title": "Q18: onBlur / onFocus — field touch tracking",
            "explain": "Task:\nOn blur set \"touched\" true — show validation message.\n\nIn simple words:\nChange = every keystroke. Blur = user left field — UX validation timing.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function TouchedField() {\n  const [value, setValue] = useState(\"\");\n  const [touched, setTouched] = useState(false);\n  const showError = touched && value.length < 3;\n  return (\n    <div>\n      <input\n        value={value}\n        onChange={(e) => setValue(e.target.value)}\n        onBlur={() => setTouched(true)}\n      />\n      {showError && <small>Min 3 chars</small>}\n    </div>\n  );\n}"
          },
          {
            "title": "Q19: [ADV] Custom event payload object",
            "explain": "Task:\nonChange({ name, value }) — app-specific API beyond native event.\n\nIn simple words:\nDesign system components may not expose native event — simpler parent API.\nTradeoff: flexibility vs convenience.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Field({ name, value, onChange }) {\n  return (\n    <input\n      value={value}\n      onChange={(e) => onChange({ name, value: e.target.value })}\n    />\n  );\n}\n\nfunction FieldForm() {\n  const [fields, setFields] = useState({ city: \"\" });\n  function handleChange({ name, value }) {\n    setFields((f) => ({ ...f, [name]: value }));\n  }\n  return <Field name=\"city\" value={fields.city} onChange={handleChange} />;\n}"
          },
          {
            "title": "Q20: [ADV] Passive scroll / touch — rare",
            "explain": "Task:\npreventDefault on scroll may be blocked — usually leave native feel alone.\n\nIn simple words:\nTouch/wheel listeners have passive default in browser — usually no issue in React.\nWatch out when building custom drag scroll libraries.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function ScrollBox() {\n  return (\n    <div style={{ overflow: \"auto\", height: 80 }} onScroll={() => {}}>\n      Long content line<br />Line 2<br />Line 3<br />Line 4\n    </div>\n  );\n}"
          },
          {
            "title": "Q21: [ADV] onDoubleClick pattern",
            "explain": "Task:\nDouble click edit mode — separate single vs double handlers.\n\nIn simple words:\nTiming: two single clicks may fire before double-click delay — design carefully.\nAlternative: explicit Edit button — clearer UX.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function DoubleEdit() {\n  const [editing, setEditing] = useState(false);\n  const [text, setText] = useState(\"Double-click me\");\n  if (editing) {\n    return (\n      <input\n        autoFocus\n        value={text}\n        onChange={(e) => setText(e.target.value)}\n        onBlur={() => setEditing(false)}\n      />\n    );\n  }\n  return (\n    <span onDoubleClick={() => setEditing(true)}>{text}</span>\n  );\n}"
          },
          {
            "title": "Q22: [ADV] Anti-pattern — inline handler new every render",
            "explain": "Task:\nonClick={() => ...} is new function every render — can break memo child (16).\n\nIn simple words:\nFine in simple apps. Heavy lists + React.memo → useCallback (17) or stable handler.\nPremature useCallback also has cost — optimize when profile shows need.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function MemoRow({ label, onClick }) {\n  return (\n    <button type=\"button\" onClick={onClick}>\n      {label}\n    </button>\n  );\n}\n\nfunction InlineHandlerList() {\n  const items = [\"x\", \"y\", \"z\"];\n  function pick(item) {\n    console.log(item);\n  }\n  return (\n    <div>\n      {items.map((item) => (\n        <MemoRow\n          key={item}\n          label={item}\n          onClick={() => pick(item)} // new fn each render — memo help limited\n        />\n      ))}\n    </div>\n  );\n}"
          }
        ]
      },
      {
        "file": "06_ConditionalRendering.jsx",
        "title": "06 — Conditional Rendering",
        "kya": "Sometimes show UI, sometimes do not — like a fridge light: on when door opens.",
        "detail": "06 — Conditional Rendering\nLevel: BASE  |  Sequence: read this file, then the next number\n\nSIMPLE: Sometimes show UI, sometimes do not — like a fridge light: on when door opens.\nIn React use if/return, && , ternary (? :) to decide.\n\n&& : if left is truthy, show right. Careful: 0 && <X /> → 0 on screen!\nTernary: A ? <Yes /> : <No />. null return = show nothing.\n\nWHY: Loading, error, empty, auth — every real app uses conditionals.\nINTERVIEW: && pitfall with 0; early return; null vs false.\nUse in a Vite + React 19 project — teaching file (do not run with node alone).\n\n-----------------------------------------------------------------------------\nQ1: Ternary Show / Hide\n\nTask:\nloggedIn ? <Dash /> : <Login />",
        "intro": "06 — Conditional Rendering\nLevel: BASE  |  Sequence: read this file, then the next number\n\nSIMPLE: Sometimes show UI, sometimes do not — like a fridge light: on when door opens.\nIn React use if/return, && , ternary (? :) to decide.\n\n&& : if left is truthy, show right. Careful: 0 && <X /> → 0 on screen!\nTernary: A ? <Yes /> : <No />. null return = show nothing.\n\nWHY: Loading, error, empty, auth — every real app uses conditionals.\nINTERVIEW: && pitfall with 0; early return; null vs false.\nUse in a Vite + React 19 project — teaching file (do not run with node alone).\n\n-----------------------------------------------------------------------------\nQ1: Ternary Show / Hide\n\nTask:\nloggedIn ? <Dash /> : <Login />",
        "questions": [
          {
            "title": "Q1: Ternary Show / Hide",
            "explain": "Task:\nloggedIn ? <Dash /> : <Login />\n\nIn simple words:\nTwo clear branches. Readable for A vs B.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Gate({ loggedIn }) {\n  return loggedIn ? <p>Dashboard</p> : <p>Please login</p>;\n}"
          },
          {
            "title": "Q2: && short show",
            "explain": "Task:\nunread > 0 && <Badge />\n\nIn simple words:\nFor \"maybe show\" only. No else branch.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Inbox({ unread }) {\n  return (\n    <div>\n      Inbox\n      {unread > 0 && <span className=\"badge\">{unread}</span>}\n    </div>\n  );\n}"
          },
          {
            "title": "Q3: Early return loading",
            "explain": "Task:\nif (loading) return <Spinner />; return <Data />\n\nIn simple words:\nAvoid nested ternary. Guard clauses are clean.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function UserProfile({ loading, user }) {\n  if (loading) return <p>Loading...</p>;\n  if (!user) return <p>No user</p>;\n  return <h2>{user.name}</h2>;\n}"
          },
          {
            "title": "Q4: return null",
            "explain": "Task:\nFeature flag off → component renders nothing.\n\nIn simple words:\nnull = nothing in DOM. Valid React return.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function BetaBanner({ enabled }) {\n  if (!enabled) return null;\n  return <aside>Beta feature!</aside>;\n}"
          },
          {
            "title": "Q5: [MID] && with number 0 pitfall",
            "explain": "Task:\ncount && <p>{count}</p> — when count is 0, \"0\" shows on screen!\n\nIn simple words:\n0 is falsy but React renders 0. Fix: count > 0 && ...",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function CartCount({ count }) {\n  // BAD: {count && <span>{count}</span>}  → shows 0\n  return <div>{count > 0 && <span>{count} items</span>}</div>;\n}"
          },
          {
            "title": "Q6: Multi-state UI machine (simple)",
            "explain": "Task:\nstatus: idle | loading | error | success — switch UI.\n\nIn simple words:\nReal fetch UIs use this pattern. Enum-like string status.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function FetchUI({ status, data, error }) {\n  if (status === \"loading\") return <p>Loading...</p>;\n  if (status === \"error\") return <p>Error: {error}</p>;\n  if (status === \"success\") return <pre>{JSON.stringify(data)}</pre>;\n  return <p>Idle — click fetch</p>;\n}"
          },
          {
            "title": "Q7: Toggle with conditional class",
            "explain": "Task:\nisActive ? \"tab on\" : \"tab\" className.\n\nIn simple words:\nConditional styling is a cousin of conditional rendering.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Tab({ isActive, label }) {\n  return (\n    <button className={isActive ? \"tab on\" : \"tab\"}>{label}</button>\n  );\n}"
          },
          {
            "title": "Q8: [MID] Element variables",
            "explain": "Task:\nlet content = ...; set with ifs; return <div>{content}</div>\n\nIn simple words:\nResolve complex conditions before JSX — more readable.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Message({ type }) {\n  let content;\n  if (type === \"ok\") content = <p className=\"ok\">Saved</p>;\n  else if (type === \"warn\") content = <p className=\"warn\">Check</p>;\n  else content = <p>Info</p>;\n  return <div>{content}</div>;\n}"
          },
          {
            "title": "Q9: Empty string && pitfall",
            "explain": "Task:\nname && <Greeting /> — when name is \"\", understand the pattern.\n\nIn simple words:\n\"\" is falsy, does not render — unlike 0. Still, explicit check is safer.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Greeting({ name }) {\n  return <div>{name ? <p>Hi {name}</p> : <p>Guest</p>}</div>;\n}"
          },
          {
            "title": "Q10: null vs false vs undefined",
            "explain": "Task:\nreturn false / null / undefined — all three show nothing on screen.\n\nIn simple words:\nReact skips these. false is common in && chains but not by accident.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function NothingReturns({ show }) {\n  if (!show) return null; // preferred over false\n  return <p>Visible</p>;\n}"
          },
          {
            "title": "Q11: Switch statement UI",
            "explain": "Task:\nswitch (role) { case \"admin\": return <Admin />; ... }\n\nIn simple words:\nWhen many branches, switch is readable. Always include default case.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function RolePanel({ role }) {\n  switch (role) {\n    case \"admin\":\n      return <p>Admin panel</p>;\n    case \"editor\":\n      return <p>Editor panel</p>;\n    default:\n      return <p>Guest view</p>;\n  }\n}"
          },
          {
            "title": "Q12: Enum map object pattern",
            "explain": "Task:\nconst VIEWS = { list: <List />, grid: <Grid /> }; return VIEWS[mode]\n\nIn simple words:\nStatus/type → component map. Shorter than switch when mapping is simple.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const STATUS_UI = {\n  idle: <p>Get started</p>,\n  loading: <p>Loading...</p>,\n  done: <p>Done!</p>,\n};\n\nfunction StatusFromMap({ status }) {\n  return <div>{STATUS_UI[status] ?? STATUS_UI.idle}</div>;\n}"
          },
          {
            "title": "Q13: Empty state conditional",
            "explain": "Task:\nitems.length === 0 ? <Empty /> : <List items={items} />\n\nIn simple words:\nEmpty list needs its own UI — do not show a blank screen.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function ItemPanel({ items }) {\n  if (items.length === 0) {\n    return <p className=\"empty\">No items — add one!</p>;\n  }\n  return (\n    <ul>\n      {items.map((it) => (\n        <li key={it.id}>{it.name}</li>\n      ))}\n    </ul>\n  );\n}"
          },
          {
            "title": "Q14: Error state with retry",
            "explain": "Task:\nerror ? <ErrorBox onRetry={refetch} /> : children\n\nIn simple words:\nError branch should offer action — user should not get stuck.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function DataShell({ error, onRetry, children }) {\n  if (error) {\n    return (\n      <div>\n        <p>Fail: {error}</p>\n        <button onClick={onRetry}>Retry</button>\n      </div>\n    );\n  }\n  return children;\n}"
          },
          {
            "title": "Q15: Nested ternary avoid",
            "explain": "Task:\na ? b ? c : d : e — do not write this; use early return or variables.\n\nIn simple words:\nNested ternary is hard to read. Use guard clauses or Q8 pattern.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function NestedAvoid({ loading, error, data }) {\n  if (loading) return <p>Loading...</p>;\n  if (error) return <p>Error</p>;\n  if (!data) return <p>No data</p>;\n  return <p>{data.title}</p>;\n}"
          },
          {
            "title": "Q16: Boolean coercion pitfall",
            "explain": "Task:\n!!value && <Badge /> or Boolean(value) && ...\n\nIn simple words:\nObjects/arrays are truthy — empty [] can show wrong UI.\nExplicit length/count check is better.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function HasItems({ items }) {\n  return <div>{items.length > 0 && <span>{items.length} items</span>}</div>;\n}"
          },
          {
            "title": "Q17: Conditional children wrapper",
            "explain": "Task:\nshow ? <Card>{children}</Card> : children — optional layout wrap.\n\nIn simple words:\nSometimes only the wrapper is conditional; content stays the same.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function MaybeCard({ framed, children }) {\n  if (!framed) return children;\n  return <div className=\"card\">{children}</div>;\n}"
          },
          {
            "title": "Q18: [MID] Exclusive UI — one tab at a time",
            "explain": "Task:\nactiveTab state; render only matching panel.\n\nIn simple words:\nDo not keep all panels in DOM hidden with CSS — unmount heavy panels.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Tabs({ tabs, activeId }) {\n  const active = tabs.find((t) => t.id === activeId);\n  return (\n    <div>\n      <nav>{tabs.map((t) => <button key={t.id}>{t.label}</button>)}</nav>\n      {active && <section>{active.content}</section>}\n    </div>\n  );\n}"
          },
          {
            "title": "Q19: [MID] CSS hidden vs conditional unmount",
            "explain": "Task:\ndisplay:none to hide vs {open && <Modal />} — preserve state?\n\nIn simple words:\nHidden = stays in DOM, form values kept. Unmount = wipe + less DOM.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function PreserveOrWipe({ open }) {\n  // Hidden: <div style={{ display: open ? \"block\" : \"none\" }}><Form /></div>\n  // Unmount: {open && <Form />} — form reset on close\n  return open ? <form><input placeholder=\"Draft\" /></form> : null;\n}"
          },
          {
            "title": "Q20: [MID] Animation mount tip",
            "explain": "Task:\nFor enter animation: mount first, then add class — or CSS @keyframes on mount.\n\nIn simple words:\nConditional render creates new element — transition libraries work on this.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function FadeIn({ show }) {\n  return show ? <div className=\"fade-in\">Hello!</div> : null;\n}"
          },
          {
            "title": "Q21: [ADV] Exclusive UI state machine",
            "explain": "Task:\nview: \"list\" | \"detail\" | \"edit\" — render one view, others null.\n\nIn simple words:\nMultiple booleans (showList && !showEdit) gets messy. One enum string is clean.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function ViewRouter({ view, item }) {\n  if (view === \"list\") return <ul><li>Items...</li></ul>;\n  if (view === \"detail\") return <article>{item?.title}</article>;\n  if (view === \"edit\") return <form><input defaultValue={item?.title} /></form>;\n  return null;\n}"
          },
          {
            "title": "Q22: [ADV] Accessibility — aria-hidden vs unmount",
            "explain": "Task:\nOff-screen content: aria-hidden=\"true\" vs remove from DOM.\n\nIn simple words:\nScreen readers: hidden content still in tab order is bad. Modal close → unmount + return focus.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function AccessibleModal({ open, onClose }) {\n  if (!open) return null;\n  return (\n    <div role=\"dialog\" aria-modal=\"true\">\n      <p>Modal content</p>\n      <button onClick={onClose}>Close</button>\n    </div>\n  );\n}"
          },
          {
            "title": "Q23: Optional chaining in conditions",
            "explain": "Task:\nuser?.isAdmin && <AdminTools />\n\nIn simple words:\nNo crash on null user. Still watch && pitfall: check 0/\"\" separately.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function AdminTools({ user }) {\n  return <div>{user?.isAdmin && <button>Delete all</button>}</div>;\n}"
          },
          {
            "title": "Q24: Fragment with conditional",
            "explain": "Task:\nreturn ( <> {a && <A />} {b && <B />} </> );\n\nIn simple words:\nNo extra wrapper div needed — Fragment. Multiple conditional siblings OK.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function MultiConditional({ showA, showB }) {\n  return (\n    <>\n      {showA && <p>A</p>}\n      {showB && <p>B</p>}\n    </>\n  );\n}"
          }
        ]
      },
      {
        "file": "07_ListsAndKeys.jsx",
        "title": "07 — Lists And Keys",
        "kya": "List = many bowls on a tray. map() turns array → JSX items.",
        "detail": "07 — Lists And Keys\nLevel: BASE  |  Sequence: read this file, then the next number\n\nSIMPLE: List = many bowls on a tray. map() turns array → JSX items.\nkey = name tag for each item — React knows what moved/added/deleted.\nWithout correct keys React gets confused — wrong state, flicker, bugs.\n\nkey={index} is last resort — breaks on reorder/delete.\nStable id (db id, uuid) is best. key prop is not passed to child as props.\n\nWHY: Every dashboard/table/feed uses lists.\nINTERVIEW: why keys; index as key problem; reconciliation (26).\nUse in a Vite + React 19 project — teaching file (do not run with node alone).",
        "intro": "07 — Lists And Keys\nLevel: BASE  |  Sequence: read this file, then the next number\n\nSIMPLE: List = many bowls on a tray. map() turns array → JSX items.\nkey = name tag for each item — React knows what moved/added/deleted.\nWithout correct keys React gets confused — wrong state, flicker, bugs.\n\nkey={index} is last resort — breaks on reorder/delete.\nStable id (db id, uuid) is best. key prop is not passed to child as props.\n\nWHY: Every dashboard/table/feed uses lists.\nINTERVIEW: why keys; index as key problem; reconciliation (26).\nUse in a Vite + React 19 project — teaching file (do not run with node alone).",
        "questions": [
          {
            "title": "Q1: List with map",
            "explain": "Task:\nfruits.map(f => <li key={f}>{f}</li>)\n\nIn simple words:\nArray → elements. map goes inside { } in return.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function FruitList() {\n  const fruits = [\"Mango\", \"Apple\", \"Banana\"];\n  return (\n    <ul>\n      {fruits.map((f) => (\n        <li key={f}>{f}</li>\n      ))}\n    </ul>\n  );\n}"
          },
          {
            "title": "Q2: Objects with id keys",
            "explain": "Task:\nkey={user.id} on users.\n\nIn simple words:\nReal data has unique id. Names can duplicate — ids should not.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function UserList() {\n  const users = [\n    { id: 1, name: \"Ada\" },\n    { id: 2, name: \"Lin\" },\n  ];\n  return (\n    <ul>\n      {users.map((u) => (\n        <li key={u.id}>{u.name}</li>\n      ))}\n    </ul>\n  );\n}"
          },
          {
            "title": "Q3: Dynamic add + key",
            "explain": "Task:\nAdd item with button; update list.\n\nIn simple words:\nState array + map. Keep key stable (id counter).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function DynamicList() {\n  const [items, setItems] = useState([\n    { id: 1, text: \"One\" },\n  ]);\n  const [nextId, setNextId] = useState(2);\n  function add() {\n    setItems([...items, { id: nextId, text: `Item ${nextId}` }]);\n    setNextId(nextId + 1);\n  }\n  return (\n    <div>\n      <button onClick={add}>Add</button>\n      <ul>\n        {items.map((it) => (\n          <li key={it.id}>{it.text}</li>\n        ))}\n      </ul>\n    </div>\n  );\n}"
          },
          {
            "title": "Q4: Filter list (derived)",
            "explain": "Task:\nShow only active todos — filter + map.\n\nIn simple words:\nDerived list in render is fine. Do not create extra state just to sync.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function ActiveTodos({ todos }) {\n  const active = todos.filter((t) => !t.done);\n  return (\n    <ul>\n      {active.map((t) => (\n        <li key={t.id}>{t.text}</li>\n      ))}\n    </ul>\n  );\n}"
          },
          {
            "title": "Q5: Delete by id",
            "explain": "Task:\nRemove with filter; key on id.\n\nIn simple words:\nCorrect key → React preserves state on remaining items.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Removable() {\n  const [items, setItems] = useState([\n    { id: \"a\", text: \"A\" },\n    { id: \"b\", text: \"B\" },\n  ]);\n  return (\n    <ul>\n      {items.map((it) => (\n        <li key={it.id}>\n          {it.text}\n          <button onClick={() => setItems(items.filter((x) => x.id !== it.id))}>\n            x\n          </button>\n        </li>\n      ))}\n    </ul>\n  );\n}"
          },
          {
            "title": "Q6: [MID] Index as key — when it causes problems",
            "explain": "Task:\nReorder list with inputs — index key can stick wrong input value.\n\nIn simple words:\nIndex = position. Item moves → React thinks same position = same component.\nIndex OK-ish for static never-reorder list; prefer id.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function IndexKeyWarning() {\n  // Prefer: key={item.id} not key={index}\n  const items = [\"x\", \"y\"];\n  return (\n    <ul>\n      {items.map((text, index) => (\n        <li key={index}>{text}</li>\n      ))}\n    </ul>\n  );\n}"
          },
          {
            "title": "Q7: Nested lists",
            "explain": "Task:\nCategories → products; unique keys at both levels.\n\nIn simple words:\nKey unique among siblings. Same id in different lists is OK.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Catalog({ categories }) {\n  return (\n    <div>\n      {categories.map((cat) => (\n        <section key={cat.id}>\n          <h3>{cat.name}</h3>\n          <ul>\n            {cat.products.map((p) => (\n              <li key={p.id}>{p.title}</li>\n            ))}\n          </ul>\n        </section>\n      ))}\n    </div>\n  );\n}"
          },
          {
            "title": "Q8: [MID] key helps remount",
            "explain": "Task:\nForm reset: change key={userId} → component remounts, state wipes.\n\nIn simple words:\nTrick: key change = React destroys old, creates new. Intentional reset.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Editor({ userId }) {\n  return <UserForm key={userId} userId={userId} />;\n}\n\nfunction UserForm({ userId }) {\n  const [draft, setDraft] = useState(\"\");\n  return (\n    <input\n      value={draft}\n      onChange={(e) => setDraft(e.target.value)}\n      placeholder={`Edit user ${userId}`}\n    />\n  );\n}"
          },
          {
            "title": "Q9: Empty list UX",
            "explain": "Task:\nWhen items.length === 0, show friendly message + CTA button.\n\nIn simple words:\nDo not leave blank ul — tell user the next step.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function EmptyTodos({ todos, onAdd }) {\n  if (todos.length === 0) {\n    return (\n      <div>\n        <p>No todos yet</p>\n        <button onClick={onAdd}>Create first todo</button>\n      </div>\n    );\n  }\n  return (\n    <ul>\n      {todos.map((t) => (\n        <li key={t.id}>{t.text}</li>\n      ))}\n    </ul>\n  );\n}"
          },
          {
            "title": "Q10: When index key is OK",
            "explain": "Task:\nStatic list — never reorder/delete, display only.\n\nIn simple words:\n[\"Mon\",\"Tue\",\"Wed\"] fixed — index is fine. Not for lists with input/state.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Weekdays() {\n  const days = [\"Mon\", \"Tue\", \"Wed\", \"Thu\", \"Fri\"];\n  return (\n    <ul>\n      {days.map((d, i) => (\n        <li key={i}>{d}</li>\n      ))}\n    </ul>\n  );\n}"
          },
          {
            "title": "Q11: [MID] Reorder bug with index keys",
            "explain": "Task:\nList reorder + checkbox — wrong item may stay checked with index key.\n\nIn simple words:\nReact treats position as identity with index. Reorder = wrong state reuse.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function ReorderBugDemo() {\n  const [items, setItems] = useState([\n    { id: \"a\", label: \"Apple\" },\n    { id: \"b\", label: \"Banana\" },\n  ]);\n  function reverse() {\n    setItems([...items].reverse());\n  }\n  return (\n    <div>\n      <button onClick={reverse}>Reverse</button>\n      <ul>\n        {items.map((it) => (\n          <li key={it.id}>\n            <input type=\"checkbox\" /> {it.label}\n          </li>\n        ))}\n      </ul>\n    </div>\n  );\n}"
          },
          {
            "title": "Q12: Fragment with key in list",
            "explain": "Task:\nIn map use <Fragment key={id}> or <React.Fragment key={id}>.\n\nIn simple words:\nKey on Fragment when one item returns multiple top-level nodes.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function PairedRows({ rows }) {\n  return (\n    <dl>\n      {rows.map((r) => (\n        <Fragment key={r.id}>\n          <dt>{r.term}</dt>\n          <dd>{r.def}</dd>\n        </Fragment>\n      ))}\n    </dl>\n  );\n}"
          },
          {
            "title": "Q13: Sort list — key id should stay the same",
            "explain": "Task:\nChange order with sort(), keep key={item.id}, do not change key.\n\nIn simple words:\nSort = reorder, not new items. Stable id → React moves correctly.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function SortedNames({ names }) {\n  const sorted = [...names].sort((a, b) => a.localeCompare(b));\n  return (\n    <ul>\n      {sorted.map((n) => (\n        <li key={n.id}>{n.text}</li>\n      ))}\n    </ul>\n  );\n}"
          },
          {
            "title": "Q14: Filter + map — keys from source array",
            "explain": "Task:\nfiltered.map — key from original item.id, not index.\n\nIn simple words:\nStable id in filtered list too. Index shifts after filter.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function DoneTodos({ todos }) {\n  const done = todos.filter((t) => t.done);\n  return (\n    <ul>\n      {done.map((t) => (\n        <li key={t.id}>{t.text}</li>\n      ))}\n    </ul>\n  );\n}"
          },
          {
            "title": "Q15: Duplicate keys warning",
            "explain": "Task:\nTwo items with same key={1} — React warns, unpredictable behavior.\n\nIn simple words:\nKeys must be unique among siblings. Duplicate = broken reconciliation.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function UniqueKeyRule({ items }) {\n  // BAD: key={items[0].category} if categories repeat\n  return (\n    <ul>\n      {items.map((it) => (\n        <li key={it.id}>{it.name}</li>\n      ))}\n    </ul>\n  );\n}"
          },
          {
            "title": "Q16: Inline list creation anti-pattern",
            "explain": "Task:\n{[1,2,3].map(...)} in render — new array every render (minor perf).\n\nIn simple words:\nSmall lists OK; large data from state/props. keys still needed.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function InlineList() {\n  return (\n    <ul>\n      {[1, 2, 3].map((n) => (\n        <li key={n}>Item {n}</li>\n      ))}\n    </ul>\n  );\n}"
          },
          {
            "title": "Q17: [MID] Virtualization mention",
            "explain": "Task:\n10,000 rows — full map is slow; react-window renders only visible rows.\n\nIn simple words:\nSame key concept — stable id in visible slice too. Do not put all in DOM.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function BigListNote({ items }) {\n  // Real app: <FixedSizeList itemKey={(i) => items[i].id} ... />\n  const visible = items.slice(0, 50);\n  return (\n    <ul>\n      {visible.map((it) => (\n        <li key={it.id}>{it.text}</li>\n      ))}\n    </ul>\n  );\n}"
          },
          {
            "title": "Q18: List + conditional empty inside map",
            "explain": "Task:\nReturn null inside items.map to skip — filter first is better.\n\nIn simple words:\nnull in map is OK but filter + map is clearer for hidden items.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function VisibleOnly({ items }) {\n  return (\n    <ul>\n      {items\n        .filter((it) => !it.hidden)\n        .map((it) => (\n          <li key={it.id}>{it.text}</li>\n        ))}\n    </ul>\n  );\n}"
          },
          {
            "title": "Q19: Composite key fallback",
            "explain": "Task:\nNo id? key={`${catId}-${sku}`} — better than index if combo is stable.\n\nIn simple words:\nComposite as last resort. Never Math.random() key — remounts every render.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function CompositeKey({ categoryId, products }) {\n  return (\n    <ul>\n      {products.map((p) => (\n        <li key={`${categoryId}-${p.sku}`}>{p.name}</li>\n      ))}\n    </ul>\n  );\n}"
          },
          {
            "title": "Q20: key prop not received by child",
            "explain": "Task:\n<Row key={id} id={id} /> — props.key is undefined inside Row.\n\nIn simple words:\nkey is internal to React. Pass id as separate prop if you need it.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Row({ id, label }) {\n  return <tr data-id={id}><td>{label}</td></tr>;\n}\n\nfunction Table({ rows }) {\n  return (\n    <table>\n      <tbody>\n        {rows.map((r) => (\n          <Row key={r.id} id={r.id} label={r.label} />\n        ))}\n      </tbody>\n    </table>\n  );\n}"
          },
          {
            "title": "Q21: [ADV] key remount reset state — deep",
            "explain": "Task:\n<ChatRoom key={roomId} /> — room change wipes old chat state.\n\nIn simple words:\nBetter than useEffect reset when you want a fresh subtree.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function ChatRoom({ roomId }) {\n  const [draft, setDraft] = useState(\"\");\n  return (\n    <input\n      value={draft}\n      onChange={(e) => setDraft(e.target.value)}\n      placeholder={`Room ${roomId}`}\n    />\n  );\n}\n\nfunction ChatSwitcher({ roomId }) {\n  return <ChatRoom key={roomId} roomId={roomId} />;\n}"
          },
          {
            "title": "Q22: Spread new array on update",
            "explain": "Task:\nsetItems([...items, newOne]) — do not items.push.\n\nIn simple words:\nImmutable update → React detects change. Same reference → skip re-render bug.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function AppendItem() {\n  const [items, setItems] = useState([{ id: 1, text: \"First\" }]);\n  function add() {\n    setItems([...items, { id: Date.now(), text: \"New\" }]);\n  }\n  return (\n    <div>\n      <button onClick={add}>Add</button>\n      <ul>\n        {items.map((it) => (\n          <li key={it.id}>{it.text}</li>\n        ))}\n      </ul>\n    </div>\n  );\n}"
          },
          {
            "title": "Q23: List item component extract",
            "explain": "Task:\nDo not keep long map callback — <TodoItem key={t.id} todo={t} />.\n\nIn simple words:\nkey goes on parent map. Child does not need key passed inside.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function TodoItem({ todo }) {\n  return <li>{todo.text}</li>;\n}\n\nfunction TodoList({ todos }) {\n  return (\n    <ul>\n      {todos.map((t) => (\n        <TodoItem key={t.id} todo={t} />\n      ))}\n    </ul>\n  );\n}"
          },
          {
            "title": "Q24: [ADV] Index key + async load reorder",
            "explain": "Task:\nOrder changes when data loads — index keys = flash wrong content.\n\nIn simple words:\nSwitch to server id when it arrives. Keep temp id stable until then.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function AsyncList({ items }) {\n  return (\n    <ul>\n      {items.map((it) => (\n        <li key={it.id ?? it.tempId}>{it.name}</li>\n      ))}\n    </ul>\n  );\n}"
          }
        ]
      },
      {
        "file": "08_FormsControlled.jsx",
        "title": "08 — Forms Controlled",
        "kya": "Controlled input = React state is the boss. Input shows what state says.",
        "detail": "08 — Forms Controlled\nLevel: BASE  |  Sequence: read this file, then the next number\n\nSIMPLE: Controlled input = React state is the boss. Input shows what state says.\nEvery type: onChange → setState → value={state} again.\nUncontrolled = DOM keeps its own value (ref) — compare in 25.\n\nForm: all fields in state (or one object), submit with preventDefault + validate.\nselect, checkbox, radio also use value/checked + onChange.\n\nWHY: Validation, disable button, live preview — easier with controlled inputs.\nINTERVIEW: controlled vs uncontrolled; single source of truth.\nUse in a Vite + React 19 project — teaching file (do not run with node alone).",
        "intro": "08 — Forms Controlled\nLevel: BASE  |  Sequence: read this file, then the next number\n\nSIMPLE: Controlled input = React state is the boss. Input shows what state says.\nEvery type: onChange → setState → value={state} again.\nUncontrolled = DOM keeps its own value (ref) — compare in 25.\n\nForm: all fields in state (or one object), submit with preventDefault + validate.\nselect, checkbox, radio also use value/checked + onChange.\n\nWHY: Validation, disable button, live preview — easier with controlled inputs.\nINTERVIEW: controlled vs uncontrolled; single source of truth.\nUse in a Vite + React 19 project — teaching file (do not run with node alone).",
        "questions": [
          {
            "title": "Q1: Single controlled input",
            "explain": "Task:\nvalue + onChange pair.\n\nIn simple words:\nWithout value={state} it is not controlled. Without onChange it feels read-only.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function ControlledInput() {\n  const [value, setValue] = useState(\"\");\n  return (\n    <input value={value} onChange={(e) => setValue(e.target.value)} />\n  );\n}"
          },
          {
            "title": "Q2: Multi-field form object",
            "explain": "Task:\nform = { name, email }; update by name.\n\nIn simple words:\ne.target.name + computed key: setForm({ ...form, [name]: value })",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Signup() {\n  const [form, setForm] = useState({ name: \"\", email: \"\" });\n  function onChange(e) {\n    const { name, value } = e.target;\n    setForm({ ...form, [name]: value });\n  }\n  return (\n    <form\n      onSubmit={(e) => {\n        e.preventDefault();\n        console.log(form);\n      }}\n    >\n      <input name=\"name\" value={form.name} onChange={onChange} />\n      <input name=\"email\" value={form.email} onChange={onChange} />\n      <button type=\"submit\">Sign up</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q3: Checkbox controlled",
            "explain": "Task:\nchecked={agree} onChange → setAgree(e.target.checked)\n\nIn simple words:\nCheckbox uses checked boolean, not value.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Terms() {\n  const [agree, setAgree] = useState(false);\n  return (\n    <label>\n      <input\n        type=\"checkbox\"\n        checked={agree}\n        onChange={(e) => setAgree(e.target.checked)}\n      />\n      I agree\n    </label>\n  );\n}"
          },
          {
            "title": "Q4: Select dropdown",
            "explain": "Task:\n<select value={city} onChange=...>\n\nIn simple words:\nSame controlled pattern. Options as children.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function CitySelect() {\n  const [city, setCity] = useState(\"pune\");\n  return (\n    <select value={city} onChange={(e) => setCity(e.target.value)}>\n      <option value=\"pune\">Pune</option>\n      <option value=\"delhi\">Delhi</option>\n    </select>\n  );\n}"
          },
          {
            "title": "Q5: Textarea",
            "explain": "Task:\n<textarea value={bio} onChange=...> — not children text HTML style.\n\nIn simple words:\nIn React, textarea is also controlled with value prop.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Bio() {\n  const [bio, setBio] = useState(\"\");\n  return (\n    <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={4} />\n  );\n}"
          },
          {
            "title": "Q6: Simple validation + disable submit",
            "explain": "Task:\nIf email has no @, disable button.\n\nIn simple words:\nDerived: const valid = email.includes(\"@\"). Do not keep separate isValid state to sync.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function EmailForm() {\n  const [email, setEmail] = useState(\"\");\n  const valid = email.includes(\"@\");\n  return (\n    <form\n      onSubmit={(e) => {\n        e.preventDefault();\n        if (!valid) return;\n        console.log(email);\n      }}\n    >\n      <input value={email} onChange={(e) => setEmail(e.target.value)} />\n      <button type=\"submit\" disabled={!valid}>\n        Submit\n      </button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q7: [MID] Radio group",
            "explain": "Task:\nsame name, checked={plan === \"pro\"}, set value on change.\n\nIn simple words:\nOne state string = selected radio.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function PlanPicker() {\n  const [plan, setPlan] = useState(\"free\");\n  return (\n    <div>\n      <label>\n        <input\n          type=\"radio\"\n          checked={plan === \"free\"}\n          onChange={() => setPlan(\"free\")}\n        />\n        Free\n      </label>\n      <label>\n        <input\n          type=\"radio\"\n          checked={plan === \"pro\"}\n          onChange={() => setPlan(\"pro\")}\n        />\n        Pro\n      </label>\n    </div>\n  );\n}"
          },
          {
            "title": "Q8: [MID] Reset form",
            "explain": "Task:\nClear with setForm(initial).\n\nIn simple words:\nControlled reset = state back to initial. DOM reset() is optional.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const INITIAL = { title: \"\", body: \"\" };\n\nfunction NoteForm() {\n  const [form, setForm] = useState(INITIAL);\n  return (\n    <form\n      onSubmit={(e) => {\n        e.preventDefault();\n        console.log(form);\n        setForm(INITIAL);\n      }}\n    >\n      <input\n        value={form.title}\n        onChange={(e) => setForm({ ...form, title: e.target.value })}\n      />\n      <button type=\"button\" onClick={() => setForm(INITIAL)}>\n        Reset\n      </button>\n      <button type=\"submit\">Save</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q9: Number input controlled",
            "explain": "Task:\ntype=\"number\" value={qty} — parseInt/Number on change.\n\nIn simple words:\nInput value is string. Convert to number for math.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function QtyInput() {\n  const [qty, setQty] = useState(1);\n  return (\n    <input\n      type=\"number\"\n      value={qty}\n      onChange={(e) => setQty(Number(e.target.value) || 0)}\n    />\n  );\n}"
          },
          {
            "title": "Q10: Multi checkbox (array state)",
            "explain": "Task:\nchecked={selected.includes(id)} toggle array add/remove.\n\nIn simple words:\nMultiple select — string[] state. Each box has its own id.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Toppings() {\n  const [selected, setSelected] = useState([]);\n  const options = [\"cheese\", \"olive\", \"corn\"];\n  function toggle(opt) {\n    setSelected((prev) =>\n      prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]\n    );\n  }\n  return (\n    <div>\n      {options.map((opt) => (\n        <label key={opt}>\n          <input\n            type=\"checkbox\"\n            checked={selected.includes(opt)}\n            onChange={() => toggle(opt)}\n          />\n          {opt}\n        </label>\n      ))}\n    </div>\n  );\n}"
          },
          {
            "title": "Q11: Validation UX — inline error",
            "explain": "Task:\ntouched state; show error on blur, clear while typing.\n\nIn simple words:\nError only on submit feels rude. Field-level feedback is better UX.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function InlineError() {\n  const [email, setEmail] = useState(\"\");\n  const [touched, setTouched] = useState(false);\n  const error = touched && !email.includes(\"@\") ? \"Enter a valid email\" : \"\";\n  return (\n    <div>\n      <input\n        value={email}\n        onChange={(e) => setEmail(e.target.value)}\n        onBlur={() => setTouched(true)}\n      />\n      {error && <span className=\"err\">{error}</span>}\n    </div>\n  );\n}"
          },
          {
            "title": "Q12: Submit disabled until valid",
            "explain": "Task:\nconst canSubmit = name.trim() && password.length >= 8;\n\nIn simple words:\nDerived flag — do not sync separate isValid state. Button disabled={!canSubmit}.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function SecureSignup() {\n  const [name, setName] = useState(\"\");\n  const [password, setPassword] = useState(\"\");\n  const canSubmit = name.trim().length > 0 && password.length >= 8;\n  return (\n    <form onSubmit={(e) => e.preventDefault()}>\n      <input value={name} onChange={(e) => setName(e.target.value)} />\n      <input\n        type=\"password\"\n        value={password}\n        onChange={(e) => setPassword(e.target.value)}\n      />\n      <button type=\"submit\" disabled={!canSubmit}>\n        Join\n      </button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q13: FormData vs controlled sketch",
            "explain": "Task:\nonSubmit: new FormData(e.target) — uncontrolled bulk submit.\n\nIn simple words:\nSimple forms OK. Live validation / disable button needs controlled better.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function FormDataSketch() {\n  function submit(e) {\n    e.preventDefault();\n    const fd = new FormData(e.target);\n    console.log(Object.fromEntries(fd));\n  }\n  return (\n    <form onSubmit={submit}>\n      <input name=\"title\" defaultValue=\"\" />\n      <button type=\"submit\">Send</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q14: File input — uncontrolled note",
            "explain": "Task:\ntype=\"file\" — setting value is restricted; use ref or FormData.\n\nIn simple words:\nControlled file is rare. Store file object in state onChange if needed.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function FileUpload() {\n  const [file, setFile] = useState(null);\n  return (\n    <input\n      type=\"file\"\n      onChange={(e) => setFile(e.target.files?.[0] ?? null)}\n    />\n  );\n}"
          },
          {
            "title": "Q15: [MID] Nested form state",
            "explain": "Task:\nform = { user: { name, addr: { city } } } — spread for deep update.\n\nIn simple words:\nNested path: setForm({ ...form, user: { ...form.user, name: v } }). Or use reducer.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function NestedAddress() {\n  const [form, setForm] = useState({\n    user: { name: \"\", addr: { city: \"\" } },\n  });\n  return (\n    <input\n      value={form.user.addr.city}\n      onChange={(e) =>\n        setForm({\n          ...form,\n          user: {\n            ...form.user,\n            addr: { ...form.user.addr, city: e.target.value },\n          },\n        })\n      }\n    />\n  );\n}"
          },
          {
            "title": "Q16: Select multiple",
            "explain": "Task:\n<select multiple value={tags} onChange> — value is array.\n\nIn simple words:\nCtrl+click multi. Can also build array from selectedOptions.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function MultiSelect() {\n  const [tags, setTags] = useState([\"js\"]);\n  return (\n    <select\n      multiple\n      value={tags}\n      onChange={(e) =>\n        setTags([...e.target.selectedOptions].map((o) => o.value))\n      }\n    >\n      <option value=\"js\">JS</option>\n      <option value=\"react\">React</option>\n      <option value=\"css\">CSS</option>\n    </select>\n  );\n}"
          },
          {
            "title": "Q17: Controlled vs defaultValue mix do not",
            "explain": "Task:\nDo not put value + defaultValue on same input — pick one pattern.\n\nIn simple words:\nSwitching controlled/uncontrolled mid-life = warning. Stay consistent.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function ControlledOnly() {\n  const [text, setText] = useState(\"\");\n  return <input value={text} onChange={(e) => setText(e.target.value)} />;\n}"
          },
          {
            "title": "Q18: onSubmit preventDefault required",
            "explain": "Task:\nOn form submit stop page reload; run your handler.\n\nIn simple words:\nWithout preventDefault browser navigates/reloads. Always stop in SPAs.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function SafeSubmit() {\n  const [msg, setMsg] = useState(\"\");\n  return (\n    <form\n      onSubmit={(e) => {\n        e.preventDefault();\n        console.log(msg);\n      }}\n    >\n      <input value={msg} onChange={(e) => setMsg(e.target.value)} />\n      <button type=\"submit\">Go</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q19: Read-only controlled display",
            "explain": "Task:\nvalue={computed} readOnly — user cannot edit, still controlled.\n\nIn simple words:\nSummary field, slug preview — derive from state, show in input.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function SlugPreview() {\n  const [title, setTitle] = useState(\"\");\n  const slug = title.toLowerCase().replace(/\\s+/g, \"-\");\n  return (\n    <div>\n      <input value={title} onChange={(e) => setTitle(e.target.value)} />\n      <input value={slug} readOnly />\n    </div>\n  );\n}"
          },
          {
            "title": "Q20: [MID] React 19 form actions contrast",
            "explain": "Task:\n<form action={async (fd) => { \"use server\" }} /> vs onSubmit + useState.\n\nIn simple words:\nActions = declarative submit flow, pending state via useFormStatus. Classic controlled still valid.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function ClassicVsActionNote() {\n  const [pending, setPending] = useState(false);\n  async function handleSubmit(e) {\n    e.preventDefault();\n    setPending(true);\n    // await save...\n    setPending(false);\n  }\n  return (\n    <form onSubmit={handleSubmit}>\n      <button disabled={pending}>{pending ? \"Saving...\" : \"Save\"}</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q21: Input name for FormData",
            "explain": "Task:\nEach field name=\"fieldName\" — key appears in FormData.\n\nIn simple words:\nIn controlled forms keep name too if mixing FormData / progressive enhancement.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function NamedFields() {\n  const [form, setForm] = useState({ title: \"\", body: \"\" });\n  return (\n    <form>\n      <input\n        name=\"title\"\n        value={form.title}\n        onChange={(e) => setForm({ ...form, title: e.target.value })}\n      />\n    </form>\n  );\n}"
          },
          {
            "title": "Q22: Max length live counter",
            "explain": "Task:\nmaxLength={100} + show {text.length}/100.\n\nIn simple words:\nControlled makes live feedback easy — derived count in render.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function BioCounter() {\n  const [text, setText] = useState(\"\");\n  const max = 100;\n  return (\n    <div>\n      <textarea\n        value={text}\n        maxLength={max}\n        onChange={(e) => setText(e.target.value)}\n      />\n      <span>\n        {text.length}/{max}\n      </span>\n    </div>\n  );\n}"
          },
          {
            "title": "Q23: Pattern HTML + JS double validate",
            "explain": "Task:\npattern=\"[0-9]+\" browser hint + JS check on submit.\n\nIn simple words:\nHTML validation helps UX; do not trust it alone — server + JS too.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function PhoneField() {\n  const [phone, setPhone] = useState(\"\");\n  const valid = /^\\d{10}$/.test(phone);\n  return (\n    <input\n      value={phone}\n      pattern=\"\\d{10}\"\n      onChange={(e) => setPhone(e.target.value)}\n      aria-invalid={!valid && phone.length > 0}\n    />\n  );\n}"
          },
          {
            "title": "Q24: Fieldset disabled group",
            "explain": "Task:\n<fieldset disabled={loading}> — turn off all fields at once.\n\nIn simple words:\nLock form during submit — do not disable each input separately.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function LoadingForm({ loading }) {\n  const [email, setEmail] = useState(\"\");\n  return (\n    <fieldset disabled={loading}>\n      <input value={email} onChange={(e) => setEmail(e.target.value)} />\n      <button type=\"submit\">{loading ? \"...\" : \"Submit\"}</button>\n    </fieldset>\n  );\n}"
          }
        ]
      },
      {
        "file": "09_UseEffect.jsx",
        "title": "09 — useEffect",
        "kya": "useEffect = \"after paint, do this extra work\" — fetch, timer,",
        "detail": "09 — useEffect\nLevel: MID  |  Sequence: read this file, then the next number\n\nSIMPLE: useEffect = \"after paint, do this extra work\" — fetch, timer,\ndocument.title, event listener. Keep render pure; side effects go here.\n\nuseEffect(fn, deps):\n  [] = once on mount (strict mode dev runs 2x — see 27).\n  [x] = again when x changes.\n  no deps = every render (rare, be careful).\nCleanup return () => {...} — on unmount / before deps change (clearInterval).\n\nWHY: Data fetch, sync with outside world — React's official side-effect door.\nINTERVIEW: deps array; cleanup; infinite loop; race conditions.\nUse in a Vite + React 19 project — teaching file (do not run with node alone).",
        "intro": "09 — useEffect\nLevel: MID  |  Sequence: read this file, then the next number\n\nSIMPLE: useEffect = \"after paint, do this extra work\" — fetch, timer,\ndocument.title, event listener. Keep render pure; side effects go here.\n\nuseEffect(fn, deps):\n  [] = once on mount (strict mode dev runs 2x — see 27).\n  [x] = again when x changes.\n  no deps = every render (rare, be careful).\nCleanup return () => {...} — on unmount / before deps change (clearInterval).\n\nWHY: Data fetch, sync with outside world — React's official side-effect door.\nINTERVIEW: deps array; cleanup; infinite loop; race conditions.\nUse in a Vite + React 19 project — teaching file (do not run with node alone).",
        "questions": [
          {
            "title": "Q1: document.title sync",
            "explain": "Task:\nUpdate title when count changes.\n\nIn simple words:\nBrowser API = side effect. Do it in effect, not in render.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function TitleCounter() {\n  const [count, setCount] = useState(0);\n  useEffect(() => {\n    document.title = `Count: ${count}`;\n  }, [count]);\n  return <button onClick={() => setCount(count + 1)}>{count}</button>;\n}"
          },
          {
            "title": "Q2: Mount-only fetch sketch",
            "explain": "Task:\n[] deps — load data on mount.\n\nIn simple words:\nEmpty deps ≈ componentDidMount feel. Abort in cleanup is useful.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Users() {\n  const [users, setUsers] = useState([]);\n  useEffect(() => {\n    let cancelled = false;\n    fetch(\"/api/users\")\n      .then((r) => r.json())\n      .then((data) => {\n        if (!cancelled) setUsers(data);\n      });\n    return () => {\n      cancelled = true;\n    };\n  }, []);\n  return <pre>{JSON.stringify(users)}</pre>;\n}"
          },
          {
            "title": "Q3: Cleanup interval",
            "explain": "Task:\nsetInterval + clearInterval in return.\n\nIn simple words:\nWithout cleanup: memory leak / setState on unmounted component.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Clock() {\n  const [t, setT] = useState(0);\n  useEffect(() => {\n    const id = setInterval(() => setT((x) => x + 1), 1000);\n    return () => clearInterval(id);\n  }, []);\n  return <p>{t}s</p>;\n}"
          },
          {
            "title": "Q4: Deps — search when query changes",
            "explain": "Task:\nNew search effect when query changes.\n\nIn simple words:\nMissing dep = stale bug. Extra dep = extra runs. ESLint exhaustive-deps.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Search({ query }) {\n  const [results, setResults] = useState([]);\n  useEffect(() => {\n    if (!query) {\n      setResults([]);\n      return;\n    }\n    let alive = true;\n    fetch(`/api/search?q=${query}`)\n      .then((r) => r.json())\n      .then((data) => {\n        if (alive) setResults(data);\n      });\n    return () => {\n      alive = false;\n    };\n  }, [query]);\n  return <ul>{results.map((r) => <li key={r.id}>{r.title}</li>)}</ul>;\n}"
          },
          {
            "title": "Q5: [MID] Infinite loop trap",
            "explain": "Task:\nsetState inside effect + missing/wrong deps → loop.\n\nIn simple words:\nuseEffect(() => setX(x+1)) without thought → infinite. Understand deps.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function LoopWarning() {\n  const [n, setN] = useState(0);\n  // BAD: useEffect(() => setN(n + 1)); // every render → effect again\n  // OK: setN on user event, or [someExternal]\n  return <p>{n}</p>;\n}"
          },
          {
            "title": "Q6: Event listener subscribe",
            "explain": "Task:\nwindow resize updates width state; cleanup removeEventListener.\n\nIn simple words:\nSubscribe/unsubscribe pair = classic cleanup.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function WindowWidth() {\n  const [w, setW] = useState(window.innerWidth);\n  useEffect(() => {\n    function onResize() {\n      setW(window.innerWidth);\n    }\n    window.addEventListener(\"resize\", onResize);\n    return () => window.removeEventListener(\"resize\", onResize);\n  }, []);\n  return <p>Width: {w}</p>;\n}"
          },
          {
            "title": "Q7: [MID] Syncing props → state (careful)",
            "explain": "Task:\nSometimes reset local draft when prop changes — via effect.\n\nIn simple words:\nOften key={id} remount is better. Effect sync can be a smell — use thoughtfully.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Draft({ savedText }) {\n  const [text, setText] = useState(savedText);\n  useEffect(() => {\n    setText(savedText);\n  }, [savedText]);\n  return <textarea value={text} onChange={(e) => setText(e.target.value)} />;\n}"
          },
          {
            "title": "Q8: [MID] Race: slow response overwrite",
            "explain": "Task:\nFast typing: old fetch should not overwrite newer result when it arrives late.\n\nIn simple words:\ncancelled flag / AbortController. Interview favorite.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function RaceSafeSearch({ q }) {\n  const [data, setData] = useState(null);\n  useEffect(() => {\n    const ac = new AbortController();\n    fetch(`/api?q=${q}`, { signal: ac.signal })\n      .then((r) => r.json())\n      .then(setData)\n      .catch((err) => {\n        if (err.name !== \"AbortError\") console.error(err);\n      });\n    return () => ac.abort();\n  }, [q]);\n  return <pre>{JSON.stringify(data)}</pre>;\n}"
          },
          {
            "title": "Q9: No deps — runs every render",
            "explain": "Task:\nuseEffect(() => {...}) — no deps array.\n\nIn simple words:\nRuns after every paint. Rare; usually bug or logging. Avoid unless sure.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function EveryRenderLog({ value }) {\n  useEffect(() => {\n    console.log(\"rendered with\", value);\n  });\n  return <p>{value}</p>;\n}"
          },
          {
            "title": "Q10: Empty deps [] — mount once",
            "explain": "Task:\nAnalytics init, one-time setup — [].\n\nIn simple words:\nOnly mount + cleanup on unmount. Do not use props/state inside without listing deps.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function AnalyticsInit() {\n  useEffect(() => {\n    console.log(\"track page view\");\n  }, []);\n  return null;\n}"
          },
          {
            "title": "Q11: Full deps — list all external values",
            "explain": "Task:\n[userId, filter] — effect runs again when either changes.\n\nIn simple words:\nFollow ESLint exhaustive-deps. Missing = stale closure bug.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function UserPosts({ userId, filter }) {\n  const [posts, setPosts] = useState([]);\n  useEffect(() => {\n    fetch(`/api/users/${userId}?f=${filter}`)\n      .then((r) => r.json())\n      .then(setPosts);\n  }, [userId, filter]);\n  return <pre>{JSON.stringify(posts)}</pre>;\n}"
          },
          {
            "title": "Q12: Cleanup before re-run",
            "explain": "Task:\nWhen deps change → cleanup first, then new effect body.\n\nIn simple words:\nOld subscription/timer stops, new one starts. Order is guaranteed.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function DebouncedLog({ text }) {\n  useEffect(() => {\n    const id = setTimeout(() => console.log(text), 500);\n    return () => clearTimeout(id);\n  }, [text]);\n  return null;\n}"
          },
          {
            "title": "Q13: [MID] Strict Mode double mount",
            "explain": "Task:\nDev: React mount → unmount → mount again — tests cleanup.\n\nIn simple words:\nEffect may run 2x in dev. With good cleanup it is OK. Prod runs once.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function StrictModeSafe() {\n  useEffect(() => {\n    const sub = { dispose: () => {} };\n    return () => sub.dispose();\n  }, []);\n  return <p>Strict-safe effect</p>;\n}"
          },
          {
            "title": "Q14: Derived state — no effect",
            "explain": "Task:\nfullName = first + last in render — do not setFullName in useEffect.\n\nIn simple words:\nIf it can be computed from props/state in render — do that. Extra effect = lag.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function FullName({ first, last }) {\n  const fullName = `${first} ${last}`.trim();\n  return <p>{fullName}</p>;\n}"
          },
          {
            "title": "Q15: When NOT to use effect — event handler",
            "explain": "Task:\nPOST on button click — do in onClick, not useEffect.\n\nIn simple words:\nUser action = event. Mount/sync external = effect. Do not confuse them.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function SaveButton({ data }) {\n  function save() {\n    fetch(\"/api/save\", { method: \"POST\", body: JSON.stringify(data) });\n  }\n  return <button onClick={save}>Save</button>;\n}"
          },
          {
            "title": "Q16: Fetch with loading/error states",
            "explain": "Task:\nIn effect: setLoading true → fetch → setData/setError → finally setLoading false.\n\nIn simple words:\nClassic pattern. Keep race guard too (like Q8).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function FetchWithStates({ id }) {\n  const [data, setData] = useState(null);\n  const [loading, setLoading] = useState(true);\n  const [error, setError] = useState(null);\n  useEffect(() => {\n    let alive = true;\n    setLoading(true);\n    fetch(`/api/item/${id}`)\n      .then((r) => r.json())\n      .then((d) => {\n        if (alive) setData(d);\n      })\n      .catch((e) => {\n        if (alive) setError(String(e));\n      })\n      .finally(() => {\n        if (alive) setLoading(false);\n      });\n    return () => {\n      alive = false;\n    };\n  }, [id]);\n  if (loading) return <p>Loading...</p>;\n  if (error) return <p>{error}</p>;\n  return <pre>{JSON.stringify(data)}</pre>;\n}"
          },
          {
            "title": "Q17: localStorage sync effect",
            "explain": "Task:\ntheme state change → localStorage.setItem in effect.\n\nIn simple words:\nBrowser storage = external system. Effect or event both OK; effect syncs after render.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function ThemeSync({ theme }) {\n  useEffect(() => {\n    localStorage.setItem(\"theme\", theme);\n  }, [theme]);\n  return <p>Theme: {theme}</p>;\n}"
          },
          {
            "title": "Q18: [MID] Sync external store contrast",
            "explain": "Task:\nuseSyncExternalStore for subscribe API — better than raw effect + listener.\n\nIn simple words:\nwindow matchMedia, Redux subscribe — official hook avoids tearing.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function ExternalStoreNote() {\n  // useSyncExternalStore(subscribe, getSnapshot) — see React docs\n  const [w, setW] = useState(window.innerWidth);\n  useEffect(() => {\n    const fn = () => setW(window.innerWidth);\n    window.addEventListener(\"resize\", fn);\n    return () => window.removeEventListener(\"resize\", fn);\n  }, []);\n  return <p>{w}px</p>;\n}"
          },
          {
            "title": "Q19: Object dep — stabilize or use fields",
            "explain": "Task:\ndeps [config] — new object every render = effect loop.\n\nIn simple words:\nPut primitive fields in deps, or useMemo config. Reference equality matters.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function ConfigFetch({ url, page }) {\n  const [data, setData] = useState(null);\n  useEffect(() => {\n    fetch(`${url}?page=${page}`).then((r) => r.json()).then(setData);\n  }, [url, page]);\n  return <pre>{JSON.stringify(data)}</pre>;\n}"
          },
          {
            "title": "Q20: Timer reset on dep change",
            "explain": "Task:\ncountdown restarts when seconds prop changes — cleanup clearTimeout.\n\nIn simple words:\nNew dep = stop old timer, start new. Do not leak.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Countdown({ seconds }) {\n  const [left, setLeft] = useState(seconds);\n  useEffect(() => {\n    setLeft(seconds);\n    const id = setInterval(() => setLeft((s) => s - 1), 1000);\n    return () => clearInterval(id);\n  }, [seconds]);\n  return <p>{left}s</p>;\n}"
          },
          {
            "title": "Q21: [ADV] Effect vs event — form submit",
            "explain": "Task:\nAuto-save on every data change in effect? Usually blur/submit event is better.\n\nIn simple words:\nEffect on every keystroke = spam. Prefer debounced effect or explicit save button.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function AutoSaveNote({ draft }) {\n  useEffect(() => {\n    const id = setTimeout(() => {\n      if (draft) localStorage.setItem(\"draft\", draft);\n    }, 1000);\n    return () => clearTimeout(id);\n  }, [draft]);\n  return <textarea defaultValue={draft} />;\n}"
          },
          {
            "title": "Q22: AbortController cleanup pattern",
            "explain": "Task:\nreturn () => ac.abort() — cancel in-flight fetch.\n\nIn simple words:\nOn unmount or dep change stop old request. Fixes network + setState race.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function AbortFetch({ query }) {\n  const [result, setResult] = useState(null);\n  useEffect(() => {\n    const ac = new AbortController();\n    fetch(`/api?q=${query}`, { signal: ac.signal })\n      .then((r) => r.json())\n      .then(setResult)\n      .catch(() => {});\n    return () => ac.abort();\n  }, [query]);\n  return <pre>{JSON.stringify(result)}</pre>;\n}"
          },
          {
            "title": "Q23: [ADV] Layout measurement — useLayoutEffect note",
            "explain": "Task:\nMeasure DOM before paint — useLayoutEffect; avoid flicker.\n\nIn simple words:\nuseEffect = after paint (may flash). Layout sync = layoutEffect. Rare need.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function MeasureNote() {\n  const ref = useRef(null);\n  useEffect(() => {\n    if (ref.current) console.log(ref.current.offsetHeight);\n  }, []);\n  return <div ref={ref}>Measure me</div>;\n}"
          },
          {
            "title": "Q24: Conditional effect early return",
            "explain": "Task:\nif (!enabled) return; inside effect — do not subscribe when off.\n\nIn simple words:\nPut enabled in deps. Off still runs cleanup from previous run.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function ConditionalSub({ enabled, channel }) {\n  useEffect(() => {\n    if (!enabled) return;\n    const handler = () => {};\n    document.addEventListener(channel, handler);\n    return () => document.removeEventListener(channel, handler);\n  }, [enabled, channel]);\n  return null;\n}"
          }
        ]
      },
      {
        "file": "10_UseRef.jsx",
        "title": "10 — useRef",
        "kya": "useRef = a box whose value can change WITHOUT re-render. Two jobs:",
        "detail": "10 — useRef\nLevel: MID  |  Sequence: read this file, then the next number\n\nSIMPLE: useRef = a box whose value can change WITHOUT re-render. Two jobs:\n1) Hold a DOM node (input.focus())\n2) Mutable box — previous value, timer id, \"latest\" callback\n\nRead/write ref.current. JSX: ref={inputRef}. State = UI; ref = memory.\n\nWHY: Focus, measure DOM, avoid stale closures without re-render spam.\nINTERVIEW: ref vs state; when not to put UI data in ref.\nUse in a Vite + React 19 project — teaching file (do not run with node alone).",
        "intro": "10 — useRef\nLevel: MID  |  Sequence: read this file, then the next number\n\nSIMPLE: useRef = a box whose value can change WITHOUT re-render. Two jobs:\n1) Hold a DOM node (input.focus())\n2) Mutable box — previous value, timer id, \"latest\" callback\n\nRead/write ref.current. JSX: ref={inputRef}. State = UI; ref = memory.\n\nWHY: Focus, measure DOM, avoid stale closures without re-render spam.\nINTERVIEW: ref vs state; when not to put UI data in ref.\nUse in a Vite + React 19 project — teaching file (do not run with node alone).",
        "questions": [
          {
            "title": "Q1: Focus input on mount",
            "explain": "Task:\ninputRef + useEffect with .focus()\n\nIn simple words:\nNeed DOM API? Use ref. Avoid querySelector in React.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Autofocus() {\n  const inputRef = useRef(null);\n  useEffect(() => {\n    inputRef.current?.focus();\n  }, []);\n  return <input ref={inputRef} placeholder=\"Focused\" />;\n}"
          },
          {
            "title": "Q2: Scroll into view",
            "explain": "Task:\nbottomRef.current.scrollIntoView()\n\nIn simple words:\nChat apps — scroll on new message. Ref = target element.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function ChatEnd() {\n  const endRef = useRef(null);\n  function jump() {\n    endRef.current?.scrollIntoView({ behavior: \"smooth\" });\n  }\n  return (\n    <div>\n      <button onClick={jump}>Jump to end</button>\n      <div style={{ height: 400 }}>...messages...</div>\n      <div ref={endRef} />\n    </div>\n  );\n}"
          },
          {
            "title": "Q3: Store interval id",
            "explain": "Task:\nintervalRef.current = setInterval... use on clear.\n\nIn simple words:\nTimer id is not UI — ref is perfect. State would cause extra render.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Stopwatch() {\n  const [ms, setMs] = useState(0);\n  const idRef = useRef(null);\n  function start() {\n    if (idRef.current) return;\n    idRef.current = setInterval(() => setMs((m) => m + 100), 100);\n  }\n  function stop() {\n    clearInterval(idRef.current);\n    idRef.current = null;\n  }\n  return (\n    <div>\n      {ms}ms\n      <button onClick={start}>Start</button>\n      <button onClick={stop}>Stop</button>\n    </div>\n  );\n}"
          },
          {
            "title": "Q4: Previous value track",
            "explain": "Task:\nprevRef.current = count after render; compare.\n\nIn simple words:\n\"What was it before?\" — save in ref, show on render.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function PrevCount() {\n  const [count, setCount] = useState(0);\n  const prev = useRef(count);\n  useEffect(() => {\n    prev.current = count;\n  }, [count]);\n  return (\n    <button onClick={() => setCount(count + 1)}>\n      now {count}, was {prev.current}\n    </button>\n  );\n}"
          },
          {
            "title": "Q5: [MID] Click outside to close",
            "explain": "Task:\nboxRef — document click outside closes menu.\n\nIn simple words:\nDropdown/modal pattern. Check contains(target).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Menu() {\n  const [open, setOpen] = useState(false);\n  const boxRef = useRef(null);\n  useEffect(() => {\n    function onDoc(e) {\n      if (boxRef.current && !boxRef.current.contains(e.target)) {\n        setOpen(false);\n      }\n    }\n    document.addEventListener(\"mousedown\", onDoc);\n    return () => document.removeEventListener(\"mousedown\", onDoc);\n  }, []);\n  return (\n    <div ref={boxRef}>\n      <button onClick={() => setOpen(!open)}>Menu</button>\n      {open && <div className=\"dropdown\">Item</div>}\n    </div>\n  );\n}"
          },
          {
            "title": "Q6: [MID] Ref for latest callback (stale fix)",
            "explain": "Task:\ncbRef.current = onMessage; interval/socket avoids old closure.\n\nIn simple words:\nEffect with [] listener but always latest handler — ref bridge.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Socketish({ onMessage }) {\n  const cbRef = useRef(onMessage);\n  useEffect(() => {\n    cbRef.current = onMessage;\n  }, [onMessage]);\n  useEffect(() => {\n    const id = setInterval(() => {\n      cbRef.current(\"tick\");\n    }, 1000);\n    return () => clearInterval(id);\n  }, []);\n  return null;\n}"
          },
          {
            "title": "Q7: Uncontrolled input read on submit",
            "explain": "Task:\ndefaultValue + ref.current.value on submit.\n\nIn simple words:\nNo state on every keystroke — performance/simple forms. (25 goes deeper)",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function UncontrolledName() {\n  const ref = useRef(null);\n  function submit(e) {\n    e.preventDefault();\n    console.log(ref.current.value);\n  }\n  return (\n    <form onSubmit={submit}>\n      <input ref={ref} defaultValue=\"Ada\" />\n      <button type=\"submit\">Go</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q8: Don't use ref for visible UI state",
            "explain": "Task:\nTo show count on screen use useState, not useRef.\n\nIn simple words:\nref.current++ does not update screen. Rule: if it shows in UI → state.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function WrongVsRight() {\n  const [count, setCount] = useState(0); // ✅\n  // const countRef = useRef(0); countRef.current++; // ❌ UI stale\n  return <button onClick={() => setCount(count + 1)}>{count}</button>;\n}"
          },
          {
            "title": "Q9: Callback ref pattern",
            "explain": "Task:\nref={(node) => { ... }} — get node on mount/unmount.\n\nIn simple words:\nDynamic refs, measure on attach. Different from useRef object — function called each attach.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function CallbackRefDemo() {\n  function setRef(node) {\n    if (node) node.classList.add(\"mounted\");\n  }\n  return <div ref={setRef}>Hello</div>;\n}"
          },
          {
            "title": "Q10: Measure layout — useLayoutEffect contrast",
            "explain": "Task:\nMeasure height for tooltip position — layoutEffect before paint.\n\nIn simple words:\nuseEffect measure = user may see jump. LayoutEffect = sync DOM read/write.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function TooltipMeasure() {\n  const boxRef = useRef(null);\n  const [h, setH] = useState(0);\n  useEffect(() => {\n    if (boxRef.current) setH(boxRef.current.offsetHeight);\n  }, []);\n  return (\n    <div ref={boxRef}>\n      Content\n      <span style={{ top: h }}>Tip</span>\n    </div>\n  );\n}"
          },
          {
            "title": "Q11: Ref mutable box — render count does not increase",
            "explain": "Task:\nrendersRef.current++ every render — not shown on screen.\n\nIn simple words:\nFor debug/metrics. Need UI update? Use state.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function RenderCount() {\n  const renders = useRef(0);\n  renders.current += 1;\n  const [n, setN] = useState(0);\n  return (\n    <button onClick={() => setN(n + 1)}>\n      clicks {n} (renders ~{renders.current})\n    </button>\n  );\n}"
          },
          {
            "title": "Q12: forwardRef parent to child DOM",
            "explain": "Task:\nconst Input = forwardRef((props, ref) => <input ref={ref} {...props} />)\n\nIn simple words:\nParent needs child's DOM — focus(), measure. React 19 also allows ref as direct prop.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const FancyInput = forwardRef(function FancyInput(props, ref) {\n  return <input ref={ref} className=\"fancy\" {...props} />;\n});\n\nfunction FocusChild() {\n  const ref = useRef(null);\n  return (\n    <>\n      <FancyInput ref={ref} />\n      <button onClick={() => ref.current?.focus()}>Focus</button>\n    </>\n  );\n}"
          },
          {
            "title": "Q13: [MID] React 19 ref as prop note",
            "explain": "Task:\nfunction Input({ ref, ...props }) — forwardRef becoming optional.\n\nIn simple words:\nref can be a normal prop in React 19. forwardRef still supported for legacy.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function RefAsPropNote({ ref }) {\n  return <input ref={ref} placeholder=\"React 19 style\" />;\n}"
          },
          {
            "title": "Q14: Instance var pattern — latest value",
            "explain": "Task:\nlatestQueryRef.current = query; read in async callback.\n\nIn simple words:\nStale closure fix without re-subscribe. Read ref in effect/event.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function LatestQuery({ query }) {\n  const latest = useRef(query);\n  latest.current = query;\n  useEffect(() => {\n    const id = setTimeout(() => {\n      console.log(\"search\", latest.current);\n    }, 300);\n    return () => clearTimeout(id);\n  }, [query]);\n  return null;\n}"
          },
          {
            "title": "Q15: Ref hold DOM collection",
            "explain": "Task:\nitemsRef.current = [] push ref in map — multiple nodes.\n\nIn simple words:\nList of refs sometimes needed. Usually key + single ref is enough; pattern is rare.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function ItemRefs({ items }) {\n  const refs = useRef([]);\n  refs.current = [];\n  return (\n    <ul>\n      {items.map((it, i) => (\n        <li\n          key={it.id}\n          ref={(el) => {\n            refs.current[i] = el;\n          }}\n        >\n          {it.text}\n        </li>\n      ))}\n    </ul>\n  );\n}"
          },
          {
            "title": "Q16: Merge refs utility sketch",
            "explain": "Task:\nref={node => { refA.current = node; refB(node); }} — two refs one element.\n\nIn simple words:\nLibrary + your ref both. Merge with callback ref.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function MergeRefInput() {\n  const localRef = useRef(null);\n  function mergedRef(node) {\n    localRef.current = node;\n  }\n  return <input ref={mergedRef} />;\n}"
          },
          {
            "title": "Q17: [ADV] Instance vars vs state",
            "explain": "Task:\nisSubmittingRef vs isSubmitting state — if UI shows it, use state.\n\nIn simple words:\nGuard flag for logic only (stop double submit) → ref OK. Spinner → state.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function SubmitGuard() {\n  const busyRef = useRef(false);\n  const [msg, setMsg] = useState(\"\");\n  async function submit() {\n    if (busyRef.current) return;\n    busyRef.current = true;\n    setMsg(\"Saving...\");\n    await new Promise((r) => setTimeout(r, 500));\n    busyRef.current = false;\n    setMsg(\"Done\");\n  }\n  return (\n    <div>\n      <button onClick={submit}>Save</button>\n      <p>{msg}</p>\n    </div>\n  );\n}"
          },
          {
            "title": "Q18: Ref for animation frame id",
            "explain": "Task:\nrafRef.current = requestAnimationFrame(...); cancel on cleanup.\n\nIn simple words:\nLike timer — id is not UI. Store in ref, cancel on unmount.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function RafDemo() {\n  const rafRef = useRef(null);\n  const boxRef = useRef(null);\n  function animate() {\n    if (boxRef.current) boxRef.current.style.opacity = String(Math.random());\n    rafRef.current = requestAnimationFrame(animate);\n  }\n  function stop() {\n    cancelAnimationFrame(rafRef.current);\n  }\n  return (\n    <div>\n      <div ref={boxRef}>Animate</div>\n      <button onClick={animate}>Start</button>\n      <button onClick={stop}>Stop</button>\n    </div>\n  );\n}"
          },
          {
            "title": "Q19: Textarea select all on focus",
            "explain": "Task:\nref + onFocus → ref.current.select()\n\nIn simple words:\nDOM imperative API — ref is a natural fit.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function SelectOnFocus() {\n  const ref = useRef(null);\n  return (\n    <input\n      ref={ref}\n      defaultValue=\"select me\"\n      onFocus={() => ref.current?.select()}\n    />\n  );\n}"
          },
          {
            "title": "Q20: Ref null on unmount",
            "explain": "Task:\nCleanup ref.current = null optional — React usually handles.\n\nIn simple words:\nCallback ref gets node null on detach. Object ref clears on detach too.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function RefLifecycle() {\n  const ref = useRef(null);\n  useEffect(() => {\n    return () => {\n      // ref.current already null-ish after unmount in many cases\n    };\n  }, []);\n  return <div ref={ref}>Mounted</div>;\n}"
          },
          {
            "title": "Q21: [ADV] Class instance vars analogy",
            "explain": "Task:\nthis.timerId in class = useRef in function — survives render, no re-render.\n\nIn simple words:\nIn functional components \"instance fields\" = refs. State = this.setState equivalent.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function ClassAnalogyTimer() {\n  const tickRef = useRef(0);\n  const idRef = useRef(null);\n  function start() {\n    idRef.current = setInterval(() => {\n      tickRef.current += 1;\n    }, 1000);\n  }\n  return <button onClick={start}>Start (check ref in devtools)</button>;\n}"
          },
          {
            "title": "Q22: Imperative handle sketch",
            "explain": "Task:\nuseImperativeHandle(ref, () => ({ focus: () => ... })) — expose custom API.\n\nIn simple words:\nParent gets methods, not full DOM. Modals, input library pattern.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const ExposedInput = forwardRef(function ExposedInput(props, ref) {\n  const inner = useRef(null);\n  useImperativeHandle(ref, () => ({\n    focus: () => inner.current?.focus(),\n  }));\n  return <input ref={inner} {...props} />;\n});"
          },
          {
            "title": "Q23: Ref vs querySelector",
            "explain": "Task:\nAvoid document.getElementById — ref is the React way.\n\nIn simple words:\nquerySelector fragile with SSR, testing, multiple roots. Ref scoped to component.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function NoQuerySelector() {\n  const btnRef = useRef(null);\n  return (\n    <button ref={btnRef} onClick={() => btnRef.current?.blur()}>\n      Blur self\n    </button>\n  );\n}"
          },
          {
            "title": "Q24: Copy previous props pattern",
            "explain": "Task:\nprevPropsRef — compare current vs prev in effect.\n\nIn simple words:\n\"React only when changed\" — getDerivedStateFromProps smell, sometimes useful for debug.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function PropChangeLog({ value }) {\n  const prev = useRef(value);\n  useEffect(() => {\n    if (prev.current !== value) {\n      console.log(\"changed\", prev.current, \"→\", value);\n    }\n    prev.current = value;\n  }, [value]);\n  return <p>{value}</p>;\n}"
          }
        ]
      }
    ]
  },
  {
    "level": "MID",
    "items": [
      {
        "file": "11_UseContext.jsx",
        "title": "11 — useContext",
        "kya": "Props drilling = handing a parcel floor by floor by hand (App→A→B→C).",
        "detail": "11 — useContext\nLevel: MID  |  Sequence: read this file, then the next number\n\nSIMPLE: Props drilling = handing a parcel floor by floor by hand (App→A→B→C).\nContext = building intercom — theme/user goes straight to whoever needs it.\ncreateContext → Provider value= → useContext(MyContext) in child.\n\nDon't overuse — don't make everything global. Only \"tree-wide\" data: theme, auth, locale.\nNew value object every render = consumers re-render (be careful with memo/split).\n\nWHY: Clean architecture; avoid 10-level props.\nINTERVIEW: when context vs props vs redux; re-render cost.\nUse in a Vite + React 19 project — teaching file.",
        "intro": "11 — useContext\nLevel: MID  |  Sequence: read this file, then the next number\n\nSIMPLE: Props drilling = handing a parcel floor by floor by hand (App→A→B→C).\nContext = building intercom — theme/user goes straight to whoever needs it.\ncreateContext → Provider value= → useContext(MyContext) in child.\n\nDon't overuse — don't make everything global. Only \"tree-wide\" data: theme, auth, locale.\nNew value object every render = consumers re-render (be careful with memo/split).\n\nWHY: Clean architecture; avoid 10-level props.\nINTERVIEW: when context vs props vs redux; re-render cost.\nUse in a Vite + React 19 project — teaching file.",
        "questions": [
          {
            "title": "Q1: Create + Provider + consume",
            "explain": "Task:\nThemeContext, Provider \"dark\", child useContext.\n\nIn simple words:\nThree steps: create, provide, consume. Without Provider, default is used.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const ThemeContext = createContext(\"light\");\n\nfunction ThemedButton() {\n  const theme = useContext(ThemeContext);\n  return <button className={theme}>Theme: {theme}</button>;\n}\n\nfunction AppTheme() {\n  return (\n    <ThemeContext.Provider value=\"dark\">\n      <ThemedButton />\n    </ThemeContext.Provider>\n  );\n}"
          },
          {
            "title": "Q2: Dynamic theme toggle",
            "explain": "Task:\nstate theme + setTheme in context value.\n\nIn simple words:\nValue has { theme, toggle } — children can update.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const ThemeCtx = createContext(null);\n\nfunction ThemeProvider({ children }) {\n  const [theme, setTheme] = useState(\"light\");\n  const value = { theme, toggle: () => setTheme((t) => (t === \"light\" ? \"dark\" : \"light\")) };\n  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;\n}\n\nfunction ToggleBtn() {\n  const { theme, toggle } = useContext(ThemeCtx);\n  return <button onClick={toggle}>{theme}</button>;\n}"
          },
          {
            "title": "Q3: Auth user context sketch",
            "explain": "Task:\nProvide user + login/logout.\n\nIn simple words:\nAuth is a classic context use case. Real apps also need token/secure storage.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const AuthCtx = createContext(null);\n\nfunction AuthProvider({ children }) {\n  const [user, setUser] = useState(null);\n  const login = (u) => setUser(u);\n  const logout = () => setUser(null);\n  return (\n    <AuthCtx.Provider value={{ user, login, logout }}>\n      {children}\n    </AuthCtx.Provider>\n  );\n}\n\nfunction WhoAmI() {\n  const { user, logout } = useContext(AuthCtx);\n  if (!user) return <p>Guest</p>;\n  return (\n    <p>\n      {user.name} <button onClick={logout}>Logout</button>\n    </p>\n  );\n}"
          },
          {
            "title": "Q4: Custom hook wrapper",
            "explain": "Task:\nuseTheme() — throw if context is null (forgot Provider).\n\nIn simple words:\nBetter DX. Don't null-check in every consumer.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function useTheme() {\n  const ctx = useContext(ThemeCtx);\n  if (!ctx) throw new Error(\"useTheme needs ThemeProvider\");\n  return ctx;\n}\n\nfunction SafeToggle() {\n  const { theme, toggle } = useTheme();\n  return <button onClick={toggle}>{theme}</button>;\n}"
          },
          {
            "title": "Q5: [MID] Memoize context value",
            "explain": "Task:\nuseMemo(() => ({ theme, toggle }), [theme]) — stable ref when theme is same.\n\nIn simple words:\nInline object is new every render → all consumers re-render. Memo helps.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function MemoThemeProvider({ children }) {\n  const [theme, setTheme] = useState(\"light\");\n  const value = useMemo(\n    () => ({\n      theme,\n      toggle: () => setTheme((t) => (t === \"light\" ? \"dark\" : \"light\")),\n    }),\n    [theme]\n  );\n  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;\n}"
          },
          {
            "title": "Q6: Split contexts (state vs dispatch)",
            "explain": "Task:\nCountStateCtx + CountDispatchCtx — only buttons re-render less.\n\nIn simple words:\nAdvanced optimize: dispatch-only users don't re-render on state change.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const CountState = createContext(0);\nconst CountDispatch = createContext(() => {});\n\nfunction CountProvider({ children }) {\n  const [n, setN] = useState(0);\n  return (\n    <CountState.Provider value={n}>\n      <CountDispatch.Provider value={setN}>{children}</CountDispatch.Provider>\n    </CountState.Provider>\n  );\n}"
          },
          {
            "title": "Q7: [MID] Default value vs Provider missing",
            "explain": "Task:\ncreateContext(default) — without Provider, default is used.\n\nIn simple words:\nDefault useful for tests/storybook. Production often uses null + throw in hook.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const LocaleCtx = createContext(\"en\");\nfunction Label() {\n  const locale = useContext(LocaleCtx);\n  return <span>{locale}</span>;\n}"
          },
          {
            "title": "Q8: Props still better for local",
            "explain": "Task:\nParent→child one level — use props, context is overkill.\n\nIn simple words:\nContext = wide & rare change. Props = explicit & easy to debug.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function LocalBetter({ title }) {\n  return <h1>{title}</h1>; // props fine — don't bring in context\n}"
          },
          {
            "title": "Q9: createContext default value trap",
            "explain": "Task:\ncreateContext({ theme: \"light\" }) — if you forget Provider, default runs.\n\nIn simple words:\nDefault object goes to every consumer — can look \"working\" but is a bug.\nProduction: null default + throw in hook is safer.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const BadDefaultCtx = createContext({ count: 0, inc: () => {} });\nfunction SilentBug() {\n  const { count, inc } = useContext(BadDefaultCtx); // no Provider — default inc is noop\n  return <button onClick={inc}>{count}</button>; // click does nothing\n}"
          },
          {
            "title": "Q10: Consumer (legacy) vs useContext",
            "explain": "Task:\n<ThemeContext.Consumer>{(v) => ...}</ThemeContext.Consumer> — old pattern.\n\nIn simple words:\nYou may hear this in interviews. Today prefer useContext — cleaner, fits hooks.\nLegacy code still shows Consumer in class components.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function LegacyConsumerDemo() {\n  return (\n    <ThemeContext.Consumer>\n      {(theme) => <span>Legacy: {theme}</span>}\n    </ThemeContext.Consumer>\n  );\n}"
          },
          {
            "title": "Q11: [MID] Performance — all consumers re-render",
            "explain": "Task:\nProvider value change → every useContext subtree re-renders (without memo).\n\nIn simple words:\nContext is not cheap for everything. Don't put frequent updates (mouse move).\nSplit context or use selector libraries when you scale.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function HeavyCtxProvider({ children }) {\n  const [tick, setTick] = useState(0);\n  const value = useMemo(() => ({ tick }), [tick]); // tick changes → all consumers\n  return (\n    <ThemeCtx.Provider value={value}>\n      <button onClick={() => setTick((t) => t + 1)}>tick</button>\n      {children}\n    </ThemeCtx.Provider>\n  );\n}"
          },
          {
            "title": "Q12: Memo children under Provider",
            "explain": "Task:\nReact.memo child + stable context value → skip unnecessary re-render.\n\nIn simple words:\nIf Provider value identity is stable, memo children can be saved.\nNew object every render → memo fails too.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const MemoChild = memo(function MemoChild({ label }) {\n  console.log(\"MemoChild render\");\n  return <span>{label}</span>;\n});\n\nfunction MemoChildrenDemo() {\n  const [theme, setTheme] = useState(\"light\");\n  const value = useMemo(() => ({ theme, setTheme }), [theme]);\n  return (\n    <ThemeCtx.Provider value={value}>\n      <MemoChild label=\"static label\" />\n    </ThemeCtx.Provider>\n  );\n}"
          },
          {
            "title": "Q13: React 19 Provider syntax note",
            "explain": "Task:\nReact 19: <ThemeContext value=\"dark\"> — .Provider optional shorthand.\n\nIn simple words:\nBoth valid: <Ctx.Provider value={x}> or <Ctx value={x}> (React 19+).\nOlder codebases use .Provider often — know both in interviews.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function React19ProviderNote() {\n  // React 19+: <ThemeContext value=\"dark\"><ThemedButton /></ThemeContext>\n  return (\n    <ThemeContext.Provider value=\"dark\">\n      <ThemedButton />\n    </ThemeContext.Provider>\n  );\n}"
          },
          {
            "title": "Q14: Context vs props decision",
            "explain": "Task:\n1-2 level + local data → props. Tree-wide + rare change → context.\n\nIn simple words:\nProps explicit, debug easy. Context implicit, increases coupling.\nRedux/Zustand when you want global + devtools + middleware.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function ContextVsPropsNote() {\n  return (\n    <p>\n      Props = parcel to neighbour. Context = building intercom. Redux = post office.\n    </p>\n  );\n}"
          },
          {
            "title": "Q15: [MID] Testing context",
            "explain": "Task:\nIn test wrap: render(&lt;AuthProvider&gt;&lt;WhoAmI /&gt;&lt;/AuthProvider&gt;).\n\nIn simple words:\nCreate a custom render helper that wraps default providers.\nMock Provider value={{ user: mockUser }} for isolated test.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function TestWrapper({ children }) {\n  return <AuthProvider>{children}</AuthProvider>;\n}\n// test: render(<WhoAmI />, { wrapper: TestWrapper })"
          },
          {
            "title": "Q16: Nested Providers",
            "explain": "Task:\nThemeProvider inside AuthProvider — separate contexts, order doesn't matter.\n\nIn simple words:\nCompose multiple contexts like Russian dolls. Each has its own value.\nDeep nesting gets messy — combine into one Provider (careful — re-render).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function AppProviders({ children }) {\n  return (\n    <ThemeProvider>\n      <AuthProvider>{children}</AuthProvider>\n    </ThemeProvider>\n  );\n}"
          },
          {
            "title": "Q17: Context value function stability",
            "explain": "Task:\nInline arrow toggle is new every render → value unstable without memo.\n\nIn simple words:\nuseCallback toggle + useMemo value = stable bundle.\nConsumers update only on theme change — toggle ref stays same.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function StableToggleProvider({ children }) {\n  const [theme, setTheme] = useState(\"light\");\n  const toggle = useCallback(\n    () => setTheme((t) => (t === \"light\" ? \"dark\" : \"light\")),\n    []\n  );\n  const value = useMemo(() => ({ theme, toggle }), [theme, toggle]);\n  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;\n}"
          },
          {
            "title": "Q18: useContext outside Provider — null check",
            "explain": "Task:\ncreateContext(null) + optional chaining vs throw in custom hook.\n\nIn simple words:\nnull default = easy to detect \"Provider missing\".\nuseTheme() throw = fail fast, better DX in dev.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function OptionalTheme() {\n  const ctx = useContext(ThemeCtx);\n  if (!ctx) return <p>No theme provider</p>;\n  return <span>{ctx.theme}</span>;\n}"
          },
          {
            "title": "Q19: [MID] Selective re-render with split + memo",
            "explain": "Task:\nCountDisplay only CountState; IncBtn only CountDispatch.\n\nIn simple words:\nSplit contexts = built-in selector pattern. Button doesn't re-render on count change.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function CountDisplay() {\n  const n = useContext(CountState);\n  return <span>{n}</span>;\n}\n\nfunction IncBtn() {\n  const setN = useContext(CountDispatch);\n  return <button onClick={() => setN((x) => x + 1)}>+</button>;\n}"
          },
          {
            "title": "Q20: Context + useReducer combo sketch",
            "explain": "Task:\nProvider value={{ state, dispatch }} — light Redux (see 12).\n\nIn simple words:\nComplex global state: reducer + context = scalable mid-size pattern.\ndispatch is stable — split and keep state in a separate context.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const StoreCtx = createContext(null);\nfunction StoreProvider({ children }) {\n  const [state, dispatch] = useReducer(\n    (s, a) => (a.type === \"inc\" ? { ...s, n: s.n + 1 } : s),\n    { n: 0 }\n  );\n  const value = useMemo(() => ({ state, dispatch }), [state]);\n  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>;\n}"
          },
          {
            "title": "Q21: Updating context from deep child",
            "explain": "Task:\nChild only takes dispatch/setter — don't mutate state directly.\n\nIn simple words:\nPass setTheme in context, don't overwrite theme directly.\nImmutable updates — React re-render triggers properly.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function DeepToggle() {\n  const { toggle } = useTheme();\n  return <button onClick={toggle}>Deep toggle</button>;\n}"
          },
          {
            "title": "Q22: [MID] Anti-pattern — context for everything",
            "explain": "Task:\nDon't put form field state in global context — local/colocate is better.\n\nIn simple words:\nContext overuse = hidden deps, hard debug, extra re-renders.\nOnly genuinely shared / tree-wide data. Rest use props or colocated state.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function ContextAntiPatternNote() {\n  return <p>Every input value in context = pain. Think local state first.</p>;\n}"
          }
        ]
      },
      {
        "file": "12_UseReducer.jsx",
        "title": "12 — useReducer",
        "kya": "useState is small boxes. useReducer = kitchen manager who hears ORDER (action)",
        "detail": "12 — useReducer\nLevel: MID  |  Sequence: read this file, then the next number\n\nSIMPLE: useState is small boxes. useReducer = kitchen manager who hears ORDER (action)\nand builds new state from a recipe (reducer).\ndispatch({ type: \"add\", payload }) → reducer(state, action) → nextState.\n\nWhen: many related fields, complex transitions, next state depends on previous,\nor you want to clearly document \"event → how state changes\" (mini Redux).\n\nWHY: Forms/wizards/game logic stay clean. Testable pure reducer.\nINTERVIEW: when useReducer vs useState; pure reducer; immer optional.\nUse in a Vite + React 19 project — teaching file.",
        "intro": "12 — useReducer\nLevel: MID  |  Sequence: read this file, then the next number\n\nSIMPLE: useState is small boxes. useReducer = kitchen manager who hears ORDER (action)\nand builds new state from a recipe (reducer).\ndispatch({ type: \"add\", payload }) → reducer(state, action) → nextState.\n\nWhen: many related fields, complex transitions, next state depends on previous,\nor you want to clearly document \"event → how state changes\" (mini Redux).\n\nWHY: Forms/wizards/game logic stay clean. Testable pure reducer.\nINTERVIEW: when useReducer vs useState; pure reducer; immer optional.\nUse in a Vite + React 19 project — teaching file.",
        "questions": [
          {
            "title": "Q1: Counter with reducer",
            "explain": "Task:\nINC / DEC / RESET actions.\n\nIn simple words:\nAll update logic in one place. UI only dispatches.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function counterReducer(state, action) {\n  switch (action.type) {\n    case \"inc\":\n      return state + 1;\n    case \"dec\":\n      return state - 1;\n    case \"reset\":\n      return 0;\n    default:\n      return state;\n  }\n}\n\nfunction CounterR() {\n  const [count, dispatch] = useReducer(counterReducer, 0);\n  return (\n    <div>\n      {count}\n      <button onClick={() => dispatch({ type: \"inc\" })}>+</button>\n      <button onClick={() => dispatch({ type: \"dec\" })}>-</button>\n      <button onClick={() => dispatch({ type: \"reset\" })}>0</button>\n    </div>\n  );\n}"
          },
          {
            "title": "Q2: Todo list reducer",
            "explain": "Task:\nadd / toggle / remove.\n\nIn simple words:\nArray updates are immutable. Data goes in action.payload.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function todosReducer(state, action) {\n  switch (action.type) {\n    case \"add\":\n      return [...state, { id: action.id, text: action.text, done: false }];\n    case \"toggle\":\n      return state.map((t) =>\n        t.id === action.id ? { ...t, done: !t.done } : t\n      );\n    case \"remove\":\n      return state.filter((t) => t.id !== action.id);\n    default:\n      return state;\n  }\n}\n\nfunction Todos() {\n  const [todos, dispatch] = useReducer(todosReducer, []);\n  return (\n    <div>\n      <button\n        onClick={() =>\n          dispatch({ type: \"add\", id: Date.now(), text: \"New\" })\n        }\n      >\n        Add\n      </button>\n      <ul>\n        {todos.map((t) => (\n          <li key={t.id}>\n            <button onClick={() => dispatch({ type: \"toggle\", id: t.id })}>\n              {t.done ? \"✓\" : \"○\"} {t.text}\n            </button>\n          </li>\n        ))}\n      </ul>\n    </div>\n  );\n}"
          },
          {
            "title": "Q3: Form object reducer",
            "explain": "Task:\nfield update action + reset.\n\nIn simple words:\nMany fields — one reducer vs many useState. Related fields → reducer is nice.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function formReducer(state, action) {\n  switch (action.type) {\n    case \"change\":\n      return { ...state, [action.name]: action.value };\n    case \"reset\":\n      return action.initial;\n    default:\n      return state;\n  }\n}\n\nfunction ProfileForm() {\n  const initial = { name: \"\", city: \"\" };\n  const [form, dispatch] = useReducer(formReducer, initial);\n  return (\n    <form>\n      <input\n        name=\"name\"\n        value={form.name}\n        onChange={(e) =>\n          dispatch({ type: \"change\", name: \"name\", value: e.target.value })\n        }\n      />\n      <button\n        type=\"button\"\n        onClick={() => dispatch({ type: \"reset\", initial })}\n      >\n        Reset\n      </button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q4: Lazy init",
            "explain": "Task:\nuseReducer(reducer, arg, initFn)\n\nIn simple words:\nHeavy initial state once — build with init(arg).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function init(count) {\n  return { count, history: [] };\n}\nfunction lazyReducer(state, action) {\n  if (action.type === \"inc\") {\n    return { count: state.count + 1, history: [...state.history, state.count] };\n  }\n  return state;\n}\nfunction LazyCounter() {\n  const [state, dispatch] = useReducer(lazyReducer, 10, init);\n  return (\n    <button onClick={() => dispatch({ type: \"inc\" })}>{state.count}</button>\n  );\n}"
          },
          {
            "title": "Q5: [MID] Finite state machine feel",
            "explain": "Task:\nstatus: idle→loading→success|error; ignore invalid transitions.\n\nIn simple words:\nReducer rules enforce — fewer random setStatus bugs.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function fetchReducer(state, action) {\n  switch (action.type) {\n    case \"start\":\n      return state.status === \"loading\"\n        ? state\n        : { status: \"loading\", data: null, error: null };\n    case \"ok\":\n      return { status: \"success\", data: action.data, error: null };\n    case \"fail\":\n      return { status: \"error\", data: null, error: action.error };\n    default:\n      return state;\n  }\n}\n\nfunction FetchMachine() {\n  const [state, dispatch] = useReducer(fetchReducer, {\n    status: \"idle\",\n    data: null,\n    error: null,\n  });\n  async function load() {\n    dispatch({ type: \"start\" });\n    try {\n      const data = await fetch(\"/api\").then((r) => r.json());\n      dispatch({ type: \"ok\", data });\n    } catch (error) {\n      dispatch({ type: \"fail\", error: String(error) });\n    }\n  }\n  return (\n    <div>\n      <button onClick={load}>Load</button>\n      <p>{state.status}</p>\n    </div>\n  );\n}"
          },
          {
            "title": "Q6: [MID] useReducer + context = light Redux",
            "explain": "Task:\nstate+dispatch in Provider; children dispatch actions.\n\nIn simple words:\nMid apps use this pattern before Redux. Scale carefully.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "// See 11_UseContext split pattern — pair with useReducer for store-like API."
          },
          {
            "title": "Q7: Immer-style note (concept)",
            "explain": "Task:\nUnderstand: mutate draft libraries exist; core React uses spread/map.\n\nIn simple words:\nInterview: reducer must be pure — no fetch inside reducer.\nSide effects go AFTER dispatch / in effect.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function pureReducer(state, action) {\n  // ✅ return new state only\n  // ❌ fetch(); localStorage.setItem — not here\n  if (action.type === \"tick\") return { ...state, n: state.n + 1 };\n  return state;\n}"
          },
          {
            "title": "Q8: Prefer useState when simple",
            "explain": "Task:\nOne boolean toggle — useState is enough.\n\nIn simple words:\nDon't over-engineer. Use reducer when complexity grows.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "// const [on, setOn] = useState(false); // simple → state"
          },
          {
            "title": "Q9: Complex nested state reducer",
            "explain": "Task:\nstate = { user: { name, prefs: { theme } } } — nested update immutable.\n\nIn simple words:\nIf spread chain gets long, consider immer. Core React uses manual spread.\nRelated nested fields stay clean in one reducer.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function nestedReducer(state, action) {\n  switch (action.type) {\n    case \"setTheme\":\n      return {\n        ...state,\n        user: {\n          ...state.user,\n          prefs: { ...state.user.prefs, theme: action.theme },\n        },\n      };\n    default:\n      return state;\n  }\n}\n\nfunction NestedProfile() {\n  const [state, dispatch] = useReducer(nestedReducer, {\n    user: { name: \"Jay\", prefs: { theme: \"light\" } },\n  });\n  return (\n    <button\n      onClick={() => dispatch({ type: \"setTheme\", theme: \"dark\" })}\n    >\n      {state.user.prefs.theme}\n    </button>\n  );\n}"
          },
          {
            "title": "Q10: Immer sketch (concept)",
            "explain": "Task:\ndraft.user.prefs.theme = \"dark\"; return draft — wrap with immer produce().\n\nIn simple words:\nInterview: \"write mutate with immer, get immutable output.\"\nInside reducer: produce(state, draft => { draft.n++ }) — optional lib.\nCore interview: spread is also an acceptable answer.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "// import { produce } from \"immer\";\n// const next = produce(state, draft => { draft.items.push(x); });"
          },
          {
            "title": "Q11: Init function deep dive",
            "explain": "Task:\nuseReducer(reducer, props.initialCount, (n) => ({ count: n, log: [] }))\n\nIn simple words:\nInit runs only on FIRST mount — arg change on re-mount is ignored (usually).\nHydrating from localStorage is a common init use case.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function readStoredCount(key, fallback) {\n  const raw = localStorage.getItem(key);\n  return raw != null ? Number(raw) : fallback;\n}\nfunction persistedInit(n) {\n  return { count: readStoredCount(\"count\", n), history: [] };\n}"
          },
          {
            "title": "Q12: [MID] dispatch stability",
            "explain": "Task:\ndispatch function reference is stable from mount — safe in deps.\n\nIn simple words:\nuseEffect(() => { dispatch({ type: \"tick\" }) }, [dispatch]) — OK.\nStable identity like setState — pass in context without memo.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function StableDispatchDemo() {\n  const [state, dispatch] = useReducer(counterReducer, 0);\n  // dispatch identity stable across renders\n  return <button onClick={() => dispatch({ type: \"inc\" })}>{state}</button>;\n}"
          },
          {
            "title": "Q13: Reducer purity rules",
            "explain": "Task:\nIn reducer: no fetch, no Date.now side effect, no mutate state arg.\n\nIn simple words:\nPure (state, action) => newState — same input same output.\nSide effects in action handler / useEffect. Test reducer separately easily.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function impureBad(state, action) {\n  // ❌ state.items.push(action.item); return state; — mutate\n  // ❌ fetch(\"/api\"); — side effect\n  if (action.type === \"add\") return [...state, action.item];\n  return state;\n}"
          },
          {
            "title": "Q14: Middleware-ish wrapper sketch",
            "explain": "Task:\nfunction logger(reducer) { return (s,a) => { console.log(a); return reducer(s,a) } }\n\nIn simple words:\nHigher-order reducer — mini Redux middleware idea.\nuseReducer(logger(myReducer), init) — debug / analytics wrap.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function withLogger(reducer) {\n  return (state, action) => {\n    console.log(\"action\", action.type);\n    return reducer(state, action);\n  };\n}\n\nfunction LoggedCounter() {\n  const [count, dispatch] = useReducer(withLogger(counterReducer), 0);\n  return <button onClick={() => dispatch({ type: \"inc\" })}>{count}</button>;\n}"
          },
          {
            "title": "Q15: useReducer vs useState — when which",
            "explain": "Task:\n1 field toggle → useState. 5+ related fields + transitions → reducer.\n\nIn simple words:\nuseState: simple, less boilerplate. useReducer: clear event→state map.\nComplex depend on previous state → reducer shines.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function WhenWhichNote() {\n  return (\n    <p>\n      Simple bool → useState. Wizard steps / cart / FSM → useReducer.\n    </p>\n  );\n}"
          },
          {
            "title": "Q16: Action creators",
            "explain": "Task:\nconst inc = () => ({ type: \"inc\" }); dispatch(inc());\n\nIn simple words:\nFewer typos — type string in one place. Components stay clean.\nStandard in Redux; helpful in local useReducer for big apps too.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const incAction = () => ({ type: \"inc\" });\nconst decAction = () => ({ type: \"dec\" });\n\nfunction ActionCreatorCounter() {\n  const [count, dispatch] = useReducer(counterReducer, 0);\n  return (\n    <div>\n      {count}\n      <button onClick={() => dispatch(incAction())}>+</button>\n      <button onClick={() => dispatch(decAction())}>-</button>\n    </div>\n  );\n}"
          },
          {
            "title": "Q17: [MID] TypeScript-ish action unions (comments)",
            "explain": "Task:\ntype Action = { type: \"inc\" } | { type: \"add\"; text: string }\n\nIn simple words:\nDiscriminated union — exhaustive switch. payload typed per action.\nDocument in JS with comments; TS compiler helps.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "// /** @typedef {{ type: \"toggle\"; id: number }} ToggleAction */\n// /** @typedef {{ type: \"add\"; text: string; id: number }} AddAction */\n// /** @typedef {ToggleAction | AddAction} TodoAction */"
          },
          {
            "title": "Q18: Batch related updates one dispatch",
            "explain": "Task:\naction { type: \"loginSuccess\", user, token } — one dispatch, multiple fields.\n\nIn simple words:\nMany setState calls vs one reducer action — atomic update, one re-render.\nFewer race / half-updated state bugs.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function authReducer(state, action) {\n  switch (action.type) {\n    case \"loginSuccess\":\n      return { ...state, user: action.user, token: action.token, status: \"in\" };\n    case \"logout\":\n      return { user: null, token: null, status: \"out\" };\n    default:\n      return state;\n  }\n}"
          },
          {
            "title": "Q19: Default case return state",
            "explain": "Task:\nswitch default: return state — ignore unknown action.\n\nIn simple words:\nSometimes default throws in dev — catches typos. Prod often returns state.\nRedux Toolkit uses extraReducers — different pattern.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function strictReducer(state, action) {\n  switch (action.type) {\n    case \"inc\":\n      return state + 1;\n    default:\n      throw new Error(`Unknown action: ${action.type}`);\n  }\n}"
          },
          {
            "title": "Q20: [MID] useReducer + lazy init + localStorage",
            "explain": "Task:\ninit reads storage once; reducer updates; effect persists (optional).\n\nIn simple words:\nHeavy init once. Init does not run again on re-render.\nYou can build a custom usePersistedReducer hook.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function PersistedCounter() {\n  const [state, dispatch] = useReducer(lazyReducer, 0, persistedInit);\n  return (\n    <button onClick={() => dispatch({ type: \"inc\" })}>{state.count}</button>\n  );\n}"
          },
          {
            "title": "Q21: Replacing multiple useState with one reducer",
            "explain": "Task:\nloading, data, error three useState → one fetchReducer (like Q5).\n\nIn simple words:\nRelated async states stay in sync easily. One action invalidates another field.\nsetLoading(true); setError(null) — two calls vs dispatch({ type: \"start\" }).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function FetchStateNote() {\n  return <p>Async trio (loading/data/error) = classic reducer win.</p>;\n}"
          },
          {
            "title": "Q22: Testing reducer in isolation",
            "explain": "Task:\nexpect(todosReducer([], { type: \"add\", id: 1, text: \"x\" })).toEqual([...])\n\nIn simple words:\nPure reducer = unit test without React render. Fast, reliable.\nComponent test separate; keep business logic in reducer.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "// test(\"toggle\", () => {\n//   const s = [{ id: 1, done: false }];\n//   expect(todosReducer(s, { type: \"toggle\", id: 1 })[0].done).toBe(true);\n// });"
          }
        ]
      },
      {
        "file": "13_CustomHooks.jsx",
        "title": "13 — Custom Hooks",
        "kya": "Custom hook = your own kitchen gadget. Name it useX, use built-in hooks inside.",
        "detail": "13 — Custom Hooks\nLevel: MID  |  Sequence: read this file, then the next number\n\nSIMPLE: Custom hook = your own kitchen gadget. Name it useX, use built-in hooks inside.\nLogic reuse: localStorage sync, fetch, form — don't copy-paste, extract a hook.\n\nRules of Hooks apply: top level, only in React functions.\nReturn what you need: value, tuple [val, set], or object { data, error }.\n\nWHY: DRY + testable units. Libraries are custom hooks themselves.\nINTERVIEW: rules of hooks; extract when; naming use*.\nUse in a Vite + React 19 project — teaching file.",
        "intro": "13 — Custom Hooks\nLevel: MID  |  Sequence: read this file, then the next number\n\nSIMPLE: Custom hook = your own kitchen gadget. Name it useX, use built-in hooks inside.\nLogic reuse: localStorage sync, fetch, form — don't copy-paste, extract a hook.\n\nRules of Hooks apply: top level, only in React functions.\nReturn what you need: value, tuple [val, set], or object { data, error }.\n\nWHY: DRY + testable units. Libraries are custom hooks themselves.\nINTERVIEW: rules of hooks; extract when; naming use*.\nUse in a Vite + React 19 project — teaching file.",
        "questions": [
          {
            "title": "Q1: useToggle",
            "explain": "Task:\nReturn boolean + toggle function.\n\nIn simple words:\nSmall reusable pattern. Don't repeat useState everywhere.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function useToggle(initial = false) {\n  const [on, setOn] = useState(initial);\n  const toggle = () => setOn((v) => !v);\n  return [on, toggle];\n}\n\nfunction MenuBtn() {\n  const [open, toggle] = useToggle();\n  return <button onClick={toggle}>{open ? \"Open\" : \"Closed\"}</button>;\n}"
          },
          {
            "title": "Q2: useLocalStorage",
            "explain": "Task:\nRead/write by key; sync state.\n\nIn simple words:\nPersist preference. SSR careful (window check) — here we assume client.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function useLocalStorage(key, initial) {\n  const [value, setValue] = useState(() => {\n    const raw = localStorage.getItem(key);\n    return raw != null ? JSON.parse(raw) : initial;\n  });\n  useEffect(() => {\n    localStorage.setItem(key, JSON.stringify(value));\n  }, [key, value]);\n  return [value, setValue];\n}\n\nfunction ThemeRemember() {\n  const [theme, setTheme] = useLocalStorage(\"theme\", \"light\");\n  return (\n    <button onClick={() => setTheme(theme === \"light\" ? \"dark\" : \"light\")}>\n      {theme}\n    </button>\n  );\n}"
          },
          {
            "title": "Q3: useFetch sketch",
            "explain": "Task:\nurl → { data, error, loading }\n\nIn simple words:\nEncapsulate data fetching pattern. Abort cleanup.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function useFetch(url) {\n  const [data, setData] = useState(null);\n  const [error, setError] = useState(null);\n  const [loading, setLoading] = useState(true);\n  useEffect(() => {\n    let alive = true;\n    setLoading(true);\n    fetch(url)\n      .then((r) => r.json())\n      .then((d) => {\n        if (alive) {\n          setData(d);\n          setError(null);\n        }\n      })\n      .catch((e) => {\n        if (alive) setError(e);\n      })\n      .finally(() => {\n        if (alive) setLoading(false);\n      });\n    return () => {\n      alive = false;\n    };\n  }, [url]);\n  return { data, error, loading };\n}"
          },
          {
            "title": "Q4: useDocumentTitle",
            "explain": "Task:\ntitle string effect.\n\nIn simple words:\nOne-liner side effect hooks — readable App.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function useDocumentTitle(title) {\n  useEffect(() => {\n    document.title = title;\n  }, [title]);\n}\n\nfunction Page() {\n  useDocumentTitle(\"Dashboard\");\n  return <h1>Dashboard</h1>;\n}"
          },
          {
            "title": "Q5: [MID] useDebouncedValue",
            "explain": "Task:\nvalue change → wait ms → debounced return (search).\n\nIn simple words:\nTypeahead: fewer API calls. Timer cleanup.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function useDebouncedValue(value, ms = 300) {\n  const [debounced, setDebounced] = useState(value);\n  useEffect(() => {\n    const id = setTimeout(() => setDebounced(value), ms);\n    return () => clearTimeout(id);\n  }, [value, ms]);\n  return debounced;\n}\n\nfunction SearchBox() {\n  const [q, setQ] = useState(\"\");\n  const dq = useDebouncedValue(q, 400);\n  useEffect(() => {\n    if (dq) console.log(\"search\", dq);\n  }, [dq]);\n  return <input value={q} onChange={(e) => setQ(e.target.value)} />;\n}"
          },
          {
            "title": "Q6: [MID] Hook composing hooks",
            "explain": "Task:\nuseApi on top of useAuthHeaders — hooks nest OK.\n\nIn simple words:\nComposition > inheritance. Build big features from custom hooks.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function useOnline() {\n  const [online, setOnline] = useState(navigator.onLine);\n  useEffect(() => {\n    const on = () => setOnline(true);\n    const off = () => setOnline(false);\n    window.addEventListener(\"online\", on);\n    window.addEventListener(\"offline\", off);\n    return () => {\n      window.removeEventListener(\"online\", on);\n      window.removeEventListener(\"offline\", off);\n    };\n  }, []);\n  return online;\n}\n\nfunction useSafeFetch(url) {\n  const online = useOnline();\n  const result = useFetch(online ? url : \"\");\n  return { ...result, online };\n}"
          },
          {
            "title": "Q7: Return stable callbacks",
            "explain": "Task:\nuseCallback makes returned functions stable (correct deps).\n\nIn simple words:\nMatters if child is memoized. Otherwise optional.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function useCounter(start = 0) {\n  const [n, setN] = useState(start);\n  const inc = useCallback(() => setN((x) => x + 1), []);\n  const reset = useCallback(() => setN(start), [start]);\n  return { n, inc, reset };\n}"
          },
          {
            "title": "Q8: Don't conditionally call hooks",
            "explain": "Task:\nif (x) useSomething() — FORBIDDEN.\n\nIn simple words:\nRules of Hooks. Conditional logic goes INSIDE the hook.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Bad() {\n  // if ( Cond) useToggle(); // ❌\n  const [on, toggle] = useToggle(); // ✅ always\n  return on ? <button onClick={toggle}>on</button> : null;\n}"
          },
          {
            "title": "Q9: Rules of Hooks — top level only",
            "explain": "Task:\nDon't call hooks in loop / nested function / class.\n\nIn simple words:\nReact keeps hook order fixed. Break rules = random bugs.\nSame rules in custom hooks — they are hooks too.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function GoodRules() {\n  const [a, setA] = useState(0);\n  // for (let i = 0; i < 3; i++) useState(i); // ❌ not in loop\n  return <button onClick={() => setA(a + 1)}>{a}</button>;\n}"
          },
          {
            "title": "Q10: Return tuple vs object",
            "explain": "Task:\n[value, setValue] vs { value, setValue, reset } — API design.\n\nIn simple words:\nTuple = familiar like useState, order matters. Object = named, extensible.\n3+ returns → object better. Easy to rename on destructure with object.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function useNamedCounter(initial = 0) {\n  const [n, setN] = useState(initial);\n  const reset = () => setN(initial);\n  return { n, setN, reset }; // object API\n}\n\nfunction TupleVsObjectDemo() {\n  const [on, toggle] = useToggle(); // tuple\n  const { n, reset } = useNamedCounter(5); // object\n  return (\n    <div>\n      <button onClick={toggle}>{String(on)}</button>\n      <button onClick={reset}>{n}</button>\n    </div>\n  );\n}"
          },
          {
            "title": "Q11: [MID] useLocalStorage SSR trap",
            "explain": "Task:\ntypeof window !== \"undefined\" check in lazy init.\n\nIn simple words:\nNo localStorage on SSR — crash. Guard in lazy initializer.\nHydration mismatch: server default vs client stored value — flash possible.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function useLocalStorageSafe(key, initial) {\n  const [value, setValue] = useState(() => {\n    if (typeof window === \"undefined\") return initial;\n    const raw = localStorage.getItem(key);\n    return raw != null ? JSON.parse(raw) : initial;\n  });\n  useEffect(() => {\n    if (typeof window !== \"undefined\") {\n      localStorage.setItem(key, JSON.stringify(value));\n    }\n  }, [key, value]);\n  return [value, setValue];\n}"
          },
          {
            "title": "Q12: useFetch — AbortController cleanup",
            "explain": "Task:\nconst ctrl = new AbortController(); fetch(url, { signal: ctrl.signal })\n\nIn simple words:\nCancel old request on unmount / url change — fixes race condition.\nalive flag also works; AbortController is more proper.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function useFetchAbort(url) {\n  const [data, setData] = useState(null);\n  const [loading, setLoading] = useState(true);\n  useEffect(() => {\n    const ctrl = new AbortController();\n    setLoading(true);\n    fetch(url, { signal: ctrl.signal })\n      .then((r) => r.json())\n      .then(setData)\n      .catch((e) => {\n        if (e.name !== \"AbortError\") console.error(e);\n      })\n      .finally(() => setLoading(false));\n    return () => ctrl.abort();\n  }, [url]);\n  return { data, loading };\n}"
          },
          {
            "title": "Q13: Naming — must start with use*",
            "explain": "Task:\nfunction getTheme() { useContext(...) } — ❌ Rules of Hooks break.\n\nIn simple words:\nuse prefix = linter + React know it's a hook. Call only from components/hooks.\nDon't put useState in fetchData() — rename to useFetchData.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function useWindowWidth() {\n  const [w, setW] = useState(window.innerWidth);\n  useEffect(() => {\n    const onResize = () => setW(window.innerWidth);\n    window.addEventListener(\"resize\", onResize);\n    return () => window.removeEventListener(\"resize\", onResize);\n  }, []);\n  return w;\n}"
          },
          {
            "title": "Q14: [MID] Stale closure in custom hook",
            "explain": "Task:\nuseEffect(() => { setInterval(() => setCount(count+1), 1000) }, []) — stale count.\n\nIn simple words:\nFunctional update setCount(c => c+1) or put count in deps.\nSame closure rules in custom hooks — extract means make it bug-free.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function useStaleAwareCounter(start = 0) {\n  const [count, setCount] = useState(start);\n  const tick = useCallback(() => setCount((c) => c + 1), []); // functional — safe\n  return { count, tick };\n}"
          },
          {
            "title": "Q15: Composing hooks — useAuth + useFetch",
            "explain": "Task:\nuseUserPosts() { const { token } = useAuth(); return useFetch(`/posts?token=${token}`) }\n\nIn simple words:\nHooks nest freely. Build big features from small hooks.\nExtract shared logic — keep component slim.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function useAuthToken() {\n  const [token] = useLocalStorage(\"token\", null);\n  return token;\n}\n\nfunction useUserPosts() {\n  const token = useAuthToken();\n  return useFetch(token ? `/api/posts?token=${token}` : null);\n}"
          },
          {
            "title": "Q16: Testing hooks note",
            "explain": "Task:\n@testing-library/react renderHook(() => useToggle()) — wrap updates in act().\n\nIn simple words:\nTest hooks inside a component or use renderHook.\nWrap Provider if hook uses context.\nPure logic in separate function = even easier to test.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "// const { result } = renderHook(() => useToggle(true));\n// act(() => result.current[1]()); // toggle"
          },
          {
            "title": "Q17: Extract when — duplicate logic 2+ places",
            "explain": "Task:\nSame useEffect copy-pasted in two components → make a hook.\n\nIn simple words:\nUsed once — don't make it (YAGNI). Used twice = consider extract.\nHook = behavior reuse, not UI.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function useMediaQuery(query) {\n  const [matches, setMatches] = useState(() =>\n    window.matchMedia(query).matches\n  );\n  useEffect(() => {\n    const mq = window.matchMedia(query);\n    const fn = () => setMatches(mq.matches);\n    mq.addEventListener(\"change\", fn);\n    return () => mq.removeEventListener(\"change\", fn);\n  }, [query]);\n  return matches;\n}"
          },
          {
            "title": "Q18: [MID] Hook returning stable object — useMemo",
            "explain": "Task:\nreturn { data, loading, refetch } — new object every render → consumer memo fails.\n\nIn simple words:\nuseMemo return object when consumer is memoized. Otherwise often OK.\nKeep refetch stable with useCallback.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function useFetchStable(url) {\n  const { data, error, loading } = useFetch(url);\n  const refetch = useCallback(() => {\n    /* trigger re-fetch pattern */\n  }, [url]);\n  return useMemo(\n    () => ({ data, error, loading, refetch }),\n    [data, error, loading, refetch]\n  );\n}"
          },
          {
            "title": "Q19: usePrevious hook pattern",
            "explain": "Task:\nlast value in ref; effect updates after render.\n\nIn simple words:\n\"What was the previous value?\" — for animations / diff.\nClassic custom hook interview question.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function usePrevious(value) {\n  const ref = useRef();\n  useEffect(() => {\n    ref.current = value;\n  }, [value]);\n  return ref.current;\n}"
          },
          {
            "title": "Q20: useEventListener reusable hook",
            "explain": "Task:\nuseEventListener(\"keydown\", handler, window) — add/remove cleanup.\n\nIn simple words:\nEvent listener boilerplate in one place. handler ref pattern avoids stale.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function useEventListener(event, handler, target = window) {\n  const saved = useRef(handler);\n  useEffect(() => {\n    saved.current = handler;\n  }, [handler]);\n  useEffect(() => {\n    const fn = (e) => saved.current(e);\n    target.addEventListener(event, fn);\n    return () => target.removeEventListener(event, fn);\n  }, [event, target]);\n}"
          },
          {
            "title": "Q21: [MID] Custom hook parameters — primitives vs objects",
            "explain": "Task:\nuseFetch({ url, method }) — object arg new every render → effect rerun risk.\n\nIn simple words:\nPrimitive deps stable. If you pass object, parent should memoize or flatten args.\nHook API design matters for bugs.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function useFetchOpts(url, method = \"GET\") {\n  return useFetch(url); // primitives as deps — predictable\n}"
          },
          {
            "title": "Q22: Don't share mutable refs between hook instances",
            "explain": "Task:\nModule-level let cache = {} — two components share = bug.\n\nIn simple words:\nEach hook call gets its own useRef/useState. No global mutable state in hook.\nSingleton cache is a separate pattern — document clearly.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function useIdGenerator() {\n  const idRef = useRef(0);\n  const next = useCallback(() => {\n    idRef.current += 1;\n    return idRef.current;\n  }, []);\n  return next;\n}"
          }
        ]
      },
      {
        "file": "14_LiftingStateUp.jsx",
        "title": "14 — Lifting State Up",
        "kya": "Two siblings need the same data — keep state in their common parent.",
        "detail": "14 — Lifting State Up\nLevel: MID  |  Sequence: read this file, then the next number\n\nSIMPLE: Two siblings need the same data — keep state in their common parent.\nLike the house thermostat in the living room; not every room with its own AC remote.\nParent holds state, children read/change via props + callbacks.\n\nPattern: const [x, setX] = useState in Parent; Child value={x} onChange={setX}.\nWhen to lift: shared sync. When not: only one child uses it — keep local.\n\nWHY: Single source of truth. Duplicate state sync bugs gone.\nINTERVIEW: where should state live; controlled child.\nUse in a Vite + React 19 project — teaching file.",
        "intro": "14 — Lifting State Up\nLevel: MID  |  Sequence: read this file, then the next number\n\nSIMPLE: Two siblings need the same data — keep state in their common parent.\nLike the house thermostat in the living room; not every room with its own AC remote.\nParent holds state, children read/change via props + callbacks.\n\nPattern: const [x, setX] = useState in Parent; Child value={x} onChange={setX}.\nWhen to lift: shared sync. When not: only one child uses it — keep local.\n\nWHY: Single source of truth. Duplicate state sync bugs gone.\nINTERVIEW: where should state live; controlled child.\nUse in a Vite + React 19 project — teaching file.",
        "questions": [
          {
            "title": "Q1: Two inputs synced via parent",
            "explain": "Task:\nCelsius parent state; two children display it.\n\nIn simple words:\nShared value up top. Children are dumb-ish display/editors.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function TempDisplay({ celsius }) {\n  return <p>{celsius}°C</p>;\n}\n\nfunction TempInput({ celsius, onCelsiusChange }) {\n  return (\n    <input\n      type=\"number\"\n      value={celsius}\n      onChange={(e) => onCelsiusChange(Number(e.target.value))}\n    />\n  );\n}\n\nfunction TempApp() {\n  const [celsius, setCelsius] = useState(25);\n  return (\n    <div>\n      <TempInput celsius={celsius} onCelsiusChange={setCelsius} />\n      <TempDisplay celsius={celsius} />\n    </div>\n  );\n}"
          },
          {
            "title": "Q2: Accordion — only one open",
            "explain": "Task:\nopenId in parent; panels open when id matches.\n\nIn simple words:\nMutual exclusion state naturally lifts to parent.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Panel({ id, openId, onOpen, title, children }) {\n  const open = openId === id;\n  return (\n    <div>\n      <button onClick={() => onOpen(id)}>{title}</button>\n      {open && <div>{children}</div>}\n    </div>\n  );\n}\n\nfunction Accordion() {\n  const [openId, setOpenId] = useState(null);\n  return (\n    <>\n      <Panel id=\"a\" openId={openId} onOpen={setOpenId} title=\"A\">\n        AAA\n      </Panel>\n      <Panel id=\"b\" openId={openId} onOpen={setOpenId} title=\"B\">\n        BBB\n      </Panel>\n    </>\n  );\n}"
          },
          {
            "title": "Q3: List + detail selection",
            "explain": "Task:\nselectedId in parent; List click → Detail show.\n\nIn simple words:\nMaster-detail classic lift.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function List({ items, selectedId, onSelect }) {\n  return (\n    <ul>\n      {items.map((it) => (\n        <li key={it.id}>\n          <button onClick={() => onSelect(it.id)}>\n            {it.id === selectedId ? \"→ \" : \"\"}\n            {it.name}\n          </button>\n        </li>\n      ))}\n    </ul>\n  );\n}\n\nfunction Detail({ item }) {\n  if (!item) return <p>Select one</p>;\n  return <article>{item.name}</article>;\n}\n\nfunction MasterDetail() {\n  const items = [\n    { id: 1, name: \"Ada\" },\n    { id: 2, name: \"Lin\" },\n  ];\n  const [selectedId, setSelectedId] = useState(null);\n  const item = items.find((i) => i.id === selectedId);\n  return (\n    <div>\n      <List items={items} selectedId={selectedId} onSelect={setSelectedId} />\n      <Detail item={item} />\n    </div>\n  );\n}"
          },
          {
            "title": "Q4: Don't lift too high",
            "explain": "Task:\nHover state only in one card — not in parent App.\n\nIn simple words:\nState as low as possible (colocate). Lift only when sharing is needed.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Card() {\n  const [hover, setHover] = useState(false); // local OK\n  return (\n    <div\n      onMouseEnter={() => setHover(true)}\n      onMouseLeave={() => setHover(false)}\n    >\n      {hover ? \"hot\" : \"cold\"}\n    </div>\n  );\n}"
          },
          {
            "title": "Q5: [MID] Derived state — don't duplicate",
            "explain": "Task:\nfullName = first + last — not separate state; compute in render.\n\nIn simple words:\nDuplicate state sync hell. Keep source fields, derive the rest.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function NameForm() {\n  const [first, setFirst] = useState(\"\");\n  const [last, setLast] = useState(\"\");\n  const fullName = `${first} ${last}`.trim();\n  return (\n    <div>\n      <input value={first} onChange={(e) => setFirst(e.target.value)} />\n      <input value={last} onChange={(e) => setLast(e.target.value)} />\n      <p>{fullName}</p>\n    </div>\n  );\n}"
          },
          {
            "title": "Q6: Callback props naming",
            "explain": "Task:\nonX / setX clear names — child knows what parent expects.\n\nIn simple words:\nConvention: onChange, onSubmit, onSelect. Readable API.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function SearchField({ value, onChange }) {\n  return <input value={value} onChange={(e) => onChange(e.target.value)} />;\n}"
          },
          {
            "title": "Q7: [MID] Lift then maybe context",
            "explain": "Task:\nSame state deep in tree — lift + context (11).\n\nIn simple words:\nFirst lift to parent. If props drilling hurts, use context. Don't skip steps.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "// Parent state → props → if drilling pain → Context Provider"
          },
          {
            "title": "Q8: Controlled vs internal state child",
            "explain": "Task:\nSometimes child has optional value/onChange (controlled) or default local.\n\nIn simple words:\nFlexible components: if value!=null controlled else self state.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function FlexibleInput({ value, onChange, defaultValue = \"\" }) {\n  const [inner, setInner] = useState(defaultValue);\n  const isControlled = value !== undefined;\n  const v = isControlled ? value : inner;\n  function handle(e) {\n    if (!isControlled) setInner(e.target.value);\n    onChange?.(e.target.value);\n  }\n  return <input value={v} onChange={handle} />;\n}"
          },
          {
            "title": "Q9: Syncing two inputs — Celsius & Fahrenheit",
            "explain": "Task:\nParent has celsius state; F input converts and calls setCelsius.\n\nIn simple words:\nBoth inputs share one source of truth. Conversion in parent or handler.\nDon't duplicate F state — derive from C.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function FahrenheitInput({ celsius, onCelsiusChange }) {\n  const fahrenheit = (celsius * 9) / 5 + 32;\n  return (\n    <input\n      type=\"number\"\n      value={Math.round(fahrenheit * 100) / 100}\n      onChange={(e) => {\n        const f = Number(e.target.value);\n        onCelsiusChange(((f - 32) * 5) / 9);\n      }}\n    />\n  );\n}\n\nfunction TempConverter() {\n  const [celsius, setCelsius] = useState(25);\n  return (\n    <div>\n      <TempInput celsius={celsius} onCelsiusChange={setCelsius} />\n      <FahrenheitInput celsius={celsius} onCelsiusChange={setCelsius} />\n      <TempDisplay celsius={celsius} />\n    </div>\n  );\n}"
          },
          {
            "title": "Q10: Controlled child — value + onChange required",
            "explain": "Task:\nParent owns state; child only displays + notifies — \"controlled component\".\n\nIn simple words:\nCore React forms pattern. Child does not keep its own state for value.\nSingle source of truth in parent.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function ControlledInput({ value, onChange, label }) {\n  return (\n    <label>\n      {label}\n      <input value={value} onChange={(e) => onChange(e.target.value)} />\n    </label>\n  );\n}\n\nfunction ControlledForm() {\n  const [email, setEmail] = useState(\"\");\n  return <ControlledInput label=\"Email\" value={email} onChange={setEmail} />;\n}"
          },
          {
            "title": "Q11: [MID] When lift vs colocate — decision tree",
            "explain": "Task:\nOnly one child uses it → local. Two siblings sync → lift to parent.\n\nIn simple words:\nState as low as possible = better performance + clarity.\nLift only when share/sync is needed — don't lift too early.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function ColocateNote() {\n  return <p>Try colocate first. Lift when sharing is needed.</p>;\n}"
          },
          {
            "title": "Q12: Prop drilling pain → context step",
            "explain": "Task:\nApp → Layout → Page → Widget → Leaf same user prop — drilling.\n\nIn simple words:\n2-3 levels of props OK. 5+ same prop → consider context (11 file).\nTry lift first; context when drilling is unbearable.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function DrillingSketch({ user }) {\n  return <Middle user={user} />;\n}\nfunction Middle({ user }) {\n  return <Leaf user={user} />;\n}\nfunction Leaf({ user }) {\n  return <span>{user?.name}</span>;\n}"
          },
          {
            "title": "Q13: Lifting filter state for shared list",
            "explain": "Task:\nquery in parent; List + Count both use filtered items.\n\nIn simple words:\nSearch box and results in sync — natural lift candidate.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function FilterBar({ query, onQueryChange }) {\n  return (\n    <input value={query} onChange={(e) => onQueryChange(e.target.value)} />\n  );\n}\n\nfunction ItemList({ items }) {\n  return (\n    <ul>\n      {items.map((it) => (\n        <li key={it}>{it}</li>\n      ))}\n    </ul>\n  );\n}\n\nfunction FilterApp() {\n  const all = [\"apple\", \"banana\", \"apricot\"];\n  const [query, setQuery] = useState(\"\");\n  const filtered = all.filter((x) => x.includes(query.toLowerCase()));\n  return (\n    <div>\n      <FilterBar query={query} onQueryChange={setQuery} />\n      <ItemList items={filtered} />\n      <p>{filtered.length} items</p>\n    </div>\n  );\n}"
          },
          {
            "title": "Q14: Inverse data flow — child notifies parent",
            "explain": "Task:\nonSubmit callback — child event, parent state update.\n\nIn simple words:\nData down (props), events up (callbacks). React one-way flow.\nLifting = events up + state down combo.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function SubmitBtn({ onSubmit }) {\n  return <button onClick={() => onSubmit(\"done\")}>Submit</button>;\n}\n\nfunction ParentSubmit() {\n  const [msg, setMsg] = useState(\"\");\n  return (\n    <div>\n      <SubmitBtn onSubmit={setMsg} />\n      <p>{msg}</p>\n    </div>\n  );\n}"
          },
          {
            "title": "Q15: [MID] Don't lift derived values",
            "explain": "Task:\nitems + filter → filteredItems compute in parent render, not separate state.\n\nIn simple words:\nOnly lift source state. Compute derived in parent or child.\nDuplicate filtered state = sync bug factory.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function DerivedFilterDemo() {\n  const [items] = useState([\"a\", \"b\", \"c\"]);\n  const [q, setQ] = useState(\"\");\n  const shown = items.filter((x) => x.includes(q)); // derived, not lifted state\n  return (\n    <div>\n      <input value={q} onChange={(e) => setQ(e.target.value)} />\n      <ItemList items={shown} />\n    </div>\n  );\n}"
          },
          {
            "title": "Q16: Shared toggle — theme siblings",
            "explain": "Task:\nisDark in parent; Header + Content both get props.\n\nIn simple words:\nSharing UI mode = lift. Context when tree is very deep.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Header({ dark }) {\n  return <header style={{ background: dark ? \"#222\" : \"#fff\" }}>Header</header>;\n}\n\nfunction Content({ dark }) {\n  return <main style={{ color: dark ? \"#fff\" : \"#000\" }}>Body</main>;\n}\n\nfunction ThemeLift() {\n  const [dark, setDark] = useState(false);\n  return (\n    <div>\n      <button onClick={() => setDark((d) => !d)}>Toggle</button>\n      <Header dark={dark} />\n      <Content dark={dark} />\n    </div>\n  );\n}"
          },
          {
            "title": "Q17: Key reset vs lifting state",
            "explain": "Task:\nForm reset — parent key={formKey} bump vs lift reset handler.\n\nIn simple words:\nSometimes child local state OK; key change remounts for reset.\nLift when multiple children need synced reset.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function ResettableForm({ keySeed }) {\n  const [text, setText] = useState(\"\");\n  return (\n    <input key={keySeed} value={text} onChange={(e) => setText(e.target.value)} />\n  );\n}"
          },
          {
            "title": "Q18: [MID] Container / Presentational split",
            "explain": "Task:\nSmart parent state + dumb display children — lift enables this.\n\nIn simple words:\nContainer: data + handlers. Presentational: render from props only.\nEasy to test presentational — mock props.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function UserCard({ name, onEdit }) {\n  return (\n    <div>\n      {name} <button onClick={onEdit}>Edit</button>\n    </div>\n  );\n}\n\nfunction UserContainer() {\n  const [name, setName] = useState(\"Jay\");\n  return <UserCard name={name} onEdit={() => setName(\"Edited\")} />;\n}"
          },
          {
            "title": "Q19: Lifting too high — global local state problem",
            "explain": "Task:\nModal open state in App when only one branch uses it — over-lift.\n\nIn simple words:\nApp re-renders on every modal toggle — waste. Colocate modal state in section.\nBalance: share need vs blast radius.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function SectionWithModal() {\n  const [open, setOpen] = useState(false); // OK here, not in App\n  return (\n    <div>\n      <button onClick={() => setOpen(true)}>Open</button>\n      <Modal open={open} onClose={() => setOpen(false)}>\n        Hi\n      </Modal>\n    </div>\n  );\n}\n\nfunction Modal({ open, onClose, children }) {\n  if (!open) return null;\n  return (\n    <div>\n      {children}\n      <button onClick={onClose}>×</button>\n    </div>\n  );\n}"
          },
          {
            "title": "Q20: Syncing checkbox group — all selected parent state",
            "explain": "Task:\nselectedIds Set/array in parent; each checkbox controlled.\n\nIn simple words:\nMulti-select share = lift. Toggle one id → parent update → all sync.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Checkbox({ id, checked, onToggle }) {\n  return (\n    <label>\n      <input type=\"checkbox\" checked={checked} onChange={() => onToggle(id)} />\n      {id}\n    </label>\n  );\n}\n\nfunction CheckboxGroup() {\n  const [selected, setSelected] = useState([]);\n  const toggle = (id) =>\n    setSelected((s) =>\n      s.includes(id) ? s.filter((x) => x !== id) : [...s, id]\n    );\n  const ids = [\"a\", \"b\", \"c\"];\n  return (\n    <div>\n      {ids.map((id) => (\n        <Checkbox\n          key={id}\n          id={id}\n          checked={selected.includes(id)}\n          onToggle={toggle}\n        />\n      ))}\n      <p>{selected.join(\", \")}</p>\n    </div>\n  );\n}"
          },
          {
            "title": "Q21: [MID] URL as lifted state (concept)",
            "explain": "Task:\nselectedTab in parent + sync URL searchParams — share + bookmarkable.\n\nIn simple words:\nLifted state is not just the component tree — URL is also a \"shared parent\".\nReact Router: useSearchParams as lift alternative.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function TabUrlNote() {\n  return <p>Tab state in URL = lift + persistence free.</p>;\n}"
          },
          {
            "title": "Q22: Anti-pattern — mirroring props to state",
            "explain": "Task:\nconst [v, setV] = useState(props.value) — out of sync when props change.\n\nIn simple words:\nIf controlled, use props directly. No local copy unless key reset.\nuseEffect sync props→state = usually a smell.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function MirroringBad({ value }) {\n  // ❌ const [v, setV] = useState(value); — ignores props update\n  return <input value={value} readOnly />; // ✅ controlled from parent\n}"
          }
        ]
      },
      {
        "file": "15_ChildrenComposition.jsx",
        "title": "15 — Children Composition",
        "kya": "children = whatever you put inside the box. Card, Modal, Layout —",
        "detail": "15 — Children Composition\nLevel: MID  |  Sequence: read this file, then the next number\n\nSIMPLE: children = whatever you put inside the box. Card, Modal, Layout —\nshell fixed, content flexible. Composition > inheritance (React way).\n\n<Modal><Form /></Modal> → Modal({ children }). slots: header/footer props\nor multiple props as elements. cloneElement rare — prefer explicit props.\n\nWHY: Flexible UI libraries. Avoid prop explosion \"title, body, footer...\".\nINTERVIEW: composition vs config props; containership.\nUse in a Vite + React 19 project — teaching file.",
        "intro": "15 — Children Composition\nLevel: MID  |  Sequence: read this file, then the next number\n\nSIMPLE: children = whatever you put inside the box. Card, Modal, Layout —\nshell fixed, content flexible. Composition > inheritance (React way).\n\n<Modal><Form /></Modal> → Modal({ children }). slots: header/footer props\nor multiple props as elements. cloneElement rare — prefer explicit props.\n\nWHY: Flexible UI libraries. Avoid prop explosion \"title, body, footer...\".\nINTERVIEW: composition vs config props; containership.\nUse in a Vite + React 19 project — teaching file.",
        "questions": [
          {
            "title": "Q1: Basic children wrapper",
            "explain": "Task:\nFancyBox renders children.\n\nIn simple words:\nReusable chrome around unknown content.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function FancyBox({ children }) {\n  return <div className=\"fancy\">{children}</div>;\n}"
          },
          {
            "title": "Q2: Layout slots via props",
            "explain": "Task:\nsidebar + children main.\n\nIn simple words:\nNamed \"slots\" as props — clear structure.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Shell({ sidebar, children }) {\n  return (\n    <div className=\"shell\">\n      <aside>{sidebar}</aside>\n      <main>{children}</main>\n    </div>\n  );\n}\n\nfunction AppShell() {\n  return (\n    <Shell sidebar={<nav>Links</nav>}>\n      <h1>Page</h1>\n    </Shell>\n  );\n}"
          },
          {
            "title": "Q3: Modal with children",
            "explain": "Task:\nopen + onClose + children body.\n\nIn simple words:\nModal doesn't know if inside is Form or Text — children.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Modal({ open, onClose, children }) {\n  if (!open) return null;\n  return (\n    <div className=\"overlay\">\n      <div className=\"modal\">\n        {children}\n        <button onClick={onClose}>Close</button>\n      </div>\n    </div>\n  );\n}"
          },
          {
            "title": "Q4: Button asChild-ish pattern (simple)",
            "explain": "Task:\nSometimes wrap link styled as button — children / component prop.\n\nIn simple words:\nComposition lets consumer choose <a> vs <button>.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Button({ children, onClick }) {\n  return (\n    <button className=\"btn\" onClick={onClick}>\n      {children}\n    </button>\n  );\n}"
          },
          {
            "title": "Q5: [MID] Children as function (render prop)",
            "explain": "Task:\n<Data>{(data) => <pre>...</pre>}</Data>\n\nIn simple words:\nParent gives data, child decides UI. Popular before hooks; now custom hooks.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Mouse({ children }) {\n  const [pos, setPos] = useState({ x: 0, y: 0 });\n  return (\n    <div\n      onMouseMove={(e) => setPos({ x: e.clientX, y: e.clientY })}\n    >\n      {children(pos)}\n    </div>\n  );\n}\n// use: <Mouse>{(p) => <p>{p.x},{p.y}</p>}</Mouse>"
          },
          {
            "title": "Q6: Compound components sketch",
            "explain": "Task:\nTabs + Tabs.Panel API feel — related pieces.\n\nIn simple words:\nImplicit state share (context). Nice DX for libraries.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Tabs({ children }) {\n  const [active, setActive] = useState(0);\n  return (\n    <div>\n      {/* real impl maps children / context — concept here */}\n      <p>Active tab: {active}</p>\n      <button onClick={() => setActive(0)}>0</button>\n      <button onClick={() => setActive(1)}>1</button>\n      {children}\n    </div>\n  );\n}"
          },
          {
            "title": "Q7: Avoid cloneElement when possible",
            "explain": "Task:\nInject extra props into children — prefer context or render prop.\n\nIn simple words:\ncloneElement magic = brittle. Explicit is better.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "// React.cloneElement(child, { extra }) // last resort"
          },
          {
            "title": "Q8: [MID] Conditional children / empty",
            "explain": "Task:\nList empty → EmptyState as children pattern.\n\nIn simple words:\nParent structure, consumer passes empty UI.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function ListBox({ items, empty, children }) {\n  if (!items.length) return empty ?? <p>Nothing</p>;\n  return <ul>{items.map((it) => children(it))}</ul>;\n}"
          },
          {
            "title": "Q9: React.Children utilities (light)",
            "explain": "Task:\nReact.Children.count(children), map, toArray — slot validation.\n\nIn simple words:\nIn compound components you can check which children are allowed.\nDon't overuse — explicit props often clearer.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function CountChildren({ children }) {\n  const n = Array.isArray(children) ? children.length : children ? 1 : 0;\n  return (\n    <div>\n      <p>{n} child(ren)</p>\n      {children}\n    </div>\n  );\n}"
          },
          {
            "title": "Q10: cloneElement caution — implicit prop injection",
            "explain": "Task:\nReact.cloneElement(child, { isActive }) — magic props inject.\n\nIn simple words:\nFragile: assumes child type, overrides clash. Prefer context/render prop.\nRadix asChild uses cloneElement internally — OK at library level.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "// function InjectActive({ children, active }) {\n//   return React.cloneElement(children, { \"data-active\": active });\n// }"
          },
          {
            "title": "Q11: [MID] Multiple slot props pattern",
            "explain": "Task:\nheader, footer, actions as separate props — pass in JSX.\n\nIn simple words:\nAvoid config props explosion. Named slots readable.\n<Card header={<h2/>} footer={<Btn/>}>body</Card>",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Card({ header, footer, children }) {\n  return (\n    <article>\n      <header>{header}</header>\n      <div>{children}</div>\n      <footer>{footer}</footer>\n    </article>\n  );\n}\n\nfunction CardDemo() {\n  return (\n    <Card header={<h2>Title</h2>} footer={<button>OK</button>}>\n      Content here\n    </Card>\n  );\n}"
          },
          {
            "title": "Q12: Compound Tabs — context share sketch",
            "explain": "Task:\nTabs.List + Tabs.Panel — shared activeIndex via context.\n\nIn simple words:\nLibrary API feel: related components as one family.\nParent Tabs holds state; children consume context (see 11).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function TabList({ labels, active, onSelect }) {\n  return (\n    <div role=\"tablist\">\n      {labels.map((l, i) => (\n        <button key={l} onClick={() => onSelect(i)} aria-selected={active === i}>\n          {l}\n        </button>\n      ))}\n    </div>\n  );\n}\n\nfunction TabPanels({ panels, active }) {\n  return <div>{panels[active]}</div>;\n}\n\nfunction TabsCompound() {\n  const [active, setActive] = useState(0);\n  const labels = [\"One\", \"Two\"];\n  const panels = [<p key=\"1\">Panel 1</p>, <p key=\"2\">Panel 2</p>];\n  return (\n    <div>\n      <TabList labels={labels} active={active} onSelect={setActive} />\n      <TabPanels panels={panels} active={active} />\n    </div>\n  );\n}"
          },
          {
            "title": "Q13: Render props vs hooks",
            "explain": "Task:\n<Mouse>{(pos) => ...}</Mouse> vs const pos = useMouse() — hooks win usually.\n\nIn simple words:\nRender prop = flexibility + composition. Hooks = same reuse, cleaner tree.\nLegacy libs use render props; modern code prefers custom hooks.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function DataLoader({ url, children }) {\n  const [data, setData] = useState(null);\n  useEffect(() => {\n    fetch(url)\n      .then((r) => r.json())\n      .then(setData)\n      .catch(() => setData(null));\n  }, [url]);\n  return children({ data, loading: !data });\n}"
          },
          {
            "title": "Q14: [MID] asChild pattern (light)",
            "explain": "Task:\n<Button asChild><a href=\"/\">Link</a></Button> — merge styles, render child.\n\nIn simple words:\nButton skips its own <button> — clone child and merge props (Radix style).\nSimple version: children pass through with className merge.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function StyledWrapper({ className, children }) {\n  // light asChild-ish: consumer picks element, wrapper adds class\n  return <div className={`styled ${className ?? \"\"}`}>{children}</div>;\n}"
          },
          {
            "title": "Q15: Composition over config props",
            "explain": "Task:\n<Modal title=\"\" body=\"\" footer=\"\" /> ❌ vs children composition ✅\n\nIn simple words:\nPass each section as its own component — flexible order, custom layout.\nConfig props get rigid in complex UI.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function ConfigVsComposeNote() {\n  return <p>Composition = consumer control. Config = library decides structure.</p>;\n}"
          },
          {
            "title": "Q16: Fragment as children wrapper",
            "explain": "Task:\n<>\n  <Header /><Body />\n</> — multiple children without extra DOM.\n\nIn simple words:\nchildren is an array when multiple. Fragment groups them.\nModal children can have many elements OK.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function MultiChildModal({ children }) {\n  return <div className=\"modal-body\">{children}</div>;\n}"
          },
          {
            "title": "Q17: [MID] Inversion — parent doesn't know child type",
            "explain": "Task:\nLayout children can be anything — Form, Chart, Text.\n\nIn simple words:\nOpen/closed principle. Shell stable, content pluggable.\nCore React design philosophy.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function PageLayout({ children }) {\n  return (\n    <div className=\"page\">\n      <nav>Nav</nav>\n      {children}\n    </div>\n  );\n}"
          },
          {
            "title": "Q18: Explicit component prop vs children",
            "explain": "Task:\nicon={<Icon />} prop vs children — semantic clarity.\n\nIn simple words:\nSingle main content → children. Secondary pieces → named props (icon, suffix).\nAPI design: don't confuse the consumer.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function InputField({ label, icon, suffix, ...inputProps }) {\n  return (\n    <label>\n      {label}\n      <span>\n        {icon}\n        <input {...inputProps} />\n        {suffix}\n      </span>\n    </label>\n  );\n}"
          },
          {
            "title": "Q19: Children.map for list render prop",
            "explain": "Task:\nitems.map(it => children(it)) — ListBox pattern (Q8).\n\nIn simple words:\nParent iterates, consumer gives template per item.\nRender prop + list combo common.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Table({ rows, children }) {\n  return (\n    <table>\n      <tbody>\n        {rows.map((row) => (\n          <tr key={row.id}>{children(row)}</tr>\n        ))}\n      </tbody>\n    </table>\n  );\n}"
          },
          {
            "title": "Q20: [MID] Avoid nesting hell — extract subcomponents",
            "explain": "Task:\nDeep JSX tree → Shell.Sidebar, Shell.Main subcomponents.\n\nIn simple words:\nKeep composition readable. Compound namespacing (Tabs.Panel) boosts DX.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function ShellSidebar({ children }) {\n  return <aside>{children}</aside>;\n}\nfunction ShellMain({ children }) {\n  return <main>{children}</main>;\n}\nShell.Sidebar = ShellSidebar;\nShell.Main = ShellMain;"
          },
          {
            "title": "Q21: Portal + children composition",
            "explain": "Task:\nModal children to document.body via portal — same composition API.\n\nIn simple words:\nConsumer <Modal><Form/></Modal> — portal handled inside. API stays clean.\nHide implementation detail — preserve composition.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function PortalModal({ open, children }) {\n  if (!open) return null;\n  // createPortal(children, document.body) in real impl\n  return <div className=\"portal-modal\">{children}</div>;\n}"
          },
          {
            "title": "Q22: Polymorphic component light sketch",
            "explain": "Task:\nas=\"a\" | as=\"button\" — consumer picks element type (advanced composition).\n\nIn simple words:\nCommon in design systems. Related to asChild — type flexibility.\nSimple start: pass children, don't wrap.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function PolymorphicNote() {\n  return <p>as prop / asChild = same HTML tag flexibility, different API.</p>;\n}"
          }
        ]
      },
      {
        "file": "16_UseMemoUseCallback.jsx",
        "title": "16 — useMemo / useCallback",
        "kya": "useMemo = prep expensive cooking ahead in a tiffin — if deps same, don't",
        "detail": "16 — useMemo And useCallback\nLevel: MID  |  Sequence: read this file, then the next number\n\nSIMPLE: useMemo = prep expensive cooking ahead in a tiffin — if deps same, don't\ncook again. useCallback = keep the same function reference (deps same).\n\nBoth are OPTIMIZATION tools — first write correct code, then measure, then memoize.\nOveruse = complexity + sometimes slower (deps compare cost).\n\nWHY: Heavy calc; stable fn for memo children / effect deps.\nINTERVIEW: referential equality; when NOT to memoize; deps mistakes.\nUse in a Vite + React 19 project — teaching file.",
        "intro": "16 — useMemo And useCallback\nLevel: MID  |  Sequence: read this file, then the next number\n\nSIMPLE: useMemo = prep expensive cooking ahead in a tiffin — if deps same, don't\ncook again. useCallback = keep the same function reference (deps same).\n\nBoth are OPTIMIZATION tools — first write correct code, then measure, then memoize.\nOveruse = complexity + sometimes slower (deps compare cost).\n\nWHY: Heavy calc; stable fn for memo children / effect deps.\nINTERVIEW: referential equality; when NOT to memoize; deps mistakes.\nUse in a Vite + React 19 project — teaching file.",
        "questions": [
          {
            "title": "Q1: useMemo heavy filter",
            "explain": "Task:\nbigList filter when query changes.\n\nIn simple words:\nSave O(n) on every parent keystroke — when list is genuinely big.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function FilteredList({ items, query }) {\n  const filtered = useMemo(() => {\n    return items.filter((it) =>\n      it.name.toLowerCase().includes(query.toLowerCase())\n    );\n  }, [items, query]);\n  return (\n    <ul>\n      {filtered.map((it) => (\n        <li key={it.id}>{it.name}</li>\n      ))}\n    </ul>\n  );\n}"
          },
          {
            "title": "Q2: useCallback stable handler",
            "explain": "Task:\nonSelect = useCallback(..., [deps]) for memo child.\n\nIn simple words:\nInline () => onSelect(id) is new every render. Callback + memo = skip render.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function ParentList({ items }) {\n  const [selected, setSelected] = useState(null);\n  const onSelect = useCallback((id) => setSelected(id), []);\n  return (\n    <ul>\n      {items.map((it) => (\n        <Row key={it.id} item={it} onSelect={onSelect} />\n      ))}\n      <p>Selected: {selected}</p>\n    </ul>\n  );\n}\n\nfunction Row({ item, onSelect }) {\n  return <li onClick={() => onSelect(item.id)}>{item.name}</li>;\n}"
          },
          {
            "title": "Q3: Don't memo trivial math",
            "explain": "Task:\ntotal = a+b — useMemo is waste.\n\nIn simple words:\nCheap calc is already fast. Avoid premature optimization.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Sum({ a, b }) {\n  const total = a + b; // ✅ no useMemo needed\n  return <p>{total}</p>;\n}"
          },
          {
            "title": "Q4: Object/array dependency trap",
            "explain": "Task:\nuseMemo(() => ({...}), [user.id]) — don't put whole user object in deps carelessly.\n\nIn simple words:\nNew object literal from parent → memo breaks. Stabilize parent or pick fields.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Card({ userId }) {\n  const options = useMemo(() => ({ id: userId, mode: \"view\" }), [userId]);\n  return <pre>{JSON.stringify(options)}</pre>;\n}"
          },
          {
            "title": "Q5: [MID] useMemo for context value (see 11)",
            "explain": "Task:\nMemoize Provider value object.\n\nIn simple words:\nContext consumers re-render only when value identity changes.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "// const value = useMemo(() => ({ n, setN }), [n]);"
          },
          {
            "title": "Q6: [MID] useCallback deps must be right",
            "explain": "Task:\nValues used inside callback must be in deps.\n\nIn simple words:\nMissing dep = stale bug. Extra = identity churn. Same rules as useEffect.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Search({ query, onResults }) {\n  const run = useCallback(() => {\n    onResults(query);\n  }, [query, onResults]);\n  return <button onClick={run}>Search</button>;\n}"
          },
          {
            "title": "Q7: Derived data vs state",
            "explain": "Task:\nsorted = useMemo(() => [...items].sort(), [items])\n\nIn simple words:\nDon't keep sorted as separate state — derive + optional memo.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Sorted({ items }) {\n  const sorted = useMemo(\n    () => [...items].sort((a, b) => a.localeCompare(b)),\n    [items]\n  );\n  return <ul>{sorted.map((s) => <li key={s}>{s}</li>)}</ul>;\n}"
          },
          {
            "title": "Q8: [MID] React Compiler note",
            "explain": "Task:\nIn new setups compiler auto memoizes — still learn concept for interviews.\n\nIn simple words:\nManual useMemo/useCallback still in legacy + intentional optimize.\nThis file is teaching — build mental model first.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Concept() {\n  return <p>Measure first, memo second.</p>;\n}"
          },
          {
            "title": "Q9: When useMemo helps — expensive calc",
            "explain": "Task:\n10k items sort/filter — memo on deps [items, sortKey].\n\nIn simple words:\nMeasurable slow render → try memo. Verify with DevTools Profiler.\nOn tiny lists memo overhead > savings.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function HeavySort({ items, keyName }) {\n  const sorted = useMemo(() => {\n    return [...items].sort((a, b) => a[keyName].localeCompare(b[keyName]));\n  }, [items, keyName]);\n  return <ul>{sorted.map((it) => <li key={it.id}>{it[keyName]}</li>)}</ul>;\n}"
          },
          {
            "title": "Q10: When useMemo hurts — cheap + always new deps",
            "explain": "Task:\nuseMemo(() => x + 1, [x]) when x changes every render — waste.\n\nIn simple words:\nMemo cost: memory + deps compare. Can sometimes make things slower.\nPremature optimization = complexity without gain.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function CheapPlus({ x }) {\n  return <p>{x + 1}</p>; // skip useMemo — it's cheap\n}"
          },
          {
            "title": "Q11: [MID] Referential equality explained",
            "explain": "Task:\n{} === {} false — new object every render, memo child fails.\n\nIn simple words:\nJS reference compare. useMemo/useCallback preserve same reference.\nReact.memo also shallow reference check on props.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function RefEqualityDemo() {\n  const a = { n: 1 };\n  const b = { n: 1 };\n  const same = a === b; // false — interview classic\n  return <p>{String(same)}</p>;\n}"
          },
          {
            "title": "Q12: useCallback empty deps pitfall",
            "explain": "Task:\nuseCallback(() => doThing(id), []) — id stays stale.\n\nIn simple words:\nMissing dep = bug. Listen to ESLint exhaustive-deps.\nFunctional update or ref pattern when you want intentional stability.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function StaleCallback({ id }) {\n  const log = useCallback(() => console.log(id), [id]); // id in deps\n  return <button onClick={log}>Log {id}</button>;\n}"
          },
          {
            "title": "Q13: useMemo for stable object to memo child",
            "explain": "Task:\nconst config = useMemo(() => ({ theme, size }), [theme, size])\n\nIn simple words:\nPass object prop to memo child — memoize object or it's useless.\nPair pattern: memo + useMemo/useCallback.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function ConfigChild({ config }) {\n  return <span>{config.theme}</span>;\n}\n\nfunction ConfigParent() {\n  const [theme, setTheme] = useState(\"light\");\n  const config = useMemo(() => ({ theme, size: \"md\" }), [theme]);\n  return (\n    <div>\n      <button onClick={() => setTheme(\"dark\")}>toggle</button>\n      <ConfigChild config={config} />\n    </div>\n  );\n}"
          },
          {
            "title": "Q14: [MID] React 19 Compiler — auto memoization",
            "explain": "Task:\nCompiler analyzes and inserts memo itself — less manual work possible.\n\nIn simple words:\nConcept still in interviews: referential equality, understand deps.\nLegacy code + edge cases still need manual useMemo/useCallback.\n\"Measure first\" rule still valid after compiler.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function CompilerNote() {\n  return (\n    <p>\n      React Compiler = auto optimize. Manual memo = intentional hot paths.\n    </p>\n  );\n}"
          },
          {
            "title": "Q15: useMemo !== only on render",
            "explain": "Task:\nExpensive init too: useMemo(() => buildGraph(data), [data])\n\nIn simple words:\nLazy init useState(() => ...) also option for first mount.\nuseMemo when you need rebuild on data change.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function GraphView({ data }) {\n  const graph = useMemo(() => data.map((d) => ({ ...d, score: d.v * 2 })), [data]);\n  return <pre>{JSON.stringify(graph)}</pre>;\n}"
          },
          {
            "title": "Q16: Inline function in JSX — when OK",
            "explain": "Task:\nonClick={() => setX(1)} — cheap child, no memo → fine.\n\nIn simple words:\nDon't useCallback everywhere. Matters for memo child + list rows.\nReadability > micro-opt usually.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function InlineOk() {\n  const [n, setN] = useState(0);\n  return <button onClick={() => setN(1)}>{n}</button>;\n}"
          },
          {
            "title": "Q17: [MID] useCallback for effect dependency stability",
            "explain": "Task:\nconst load = useCallback(...); useEffect(() => { load() }, [load]);\n\nIn simple words:\nEffect needs stable fn or infinite loop / extra runs.\nAlternative: put logic inline inside effect.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function EffectStable({ userId }) {\n  const load = useCallback(async () => {\n    /* fetch user userId */\n  }, [userId]);\n  useEffect(() => {\n    load();\n  }, [load]);\n  return null;\n}"
          },
          {
            "title": "Q18: Memoizing children JSX — usually wrong",
            "explain": "Task:\nuseMemo(() => <Expensive />, []) — rare, often smell.\n\nIn simple words:\nWrap component with memo better than memo JSX element.\nchildren element new every render — rethink parent memo strategy.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function MemoJsxNote() {\n  return <p>useMemo for JSX is last resort — use React.memo on component.</p>;\n}"
          },
          {
            "title": "Q19: Deps array reference — items prop",
            "explain": "Task:\nParent items={[...]} new array every render → useMemo reruns.\n\nIn simple words:\nStabilize data source in parent. Redux/state same ref when data same.\nMemo downstream only works when upstream is stable.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function StableItemsParent() {\n  const [items] = useState([{ id: 1, name: \"a\" }]); // stable ref\n  return <FilteredList items={items} query=\"\" />;\n}"
          },
          {
            "title": "Q20: [MID] Premature optimization checklist",
            "explain": "Task:\n1) Profile 2) Confirm bottleneck 3) Memo targeted 4) Re-profile.\n\nIn simple words:\nMemo without measure = guesswork. Interview: \"default no memo until proven slow.\"\nReadable code first, optimize later.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function OptChecklist() {\n  return <ol><li>Profile</li><li>Prove slow</li><li>Memo surgical</li></ol>;\n}"
          },
          {
            "title": "Q21: useMemo + useCallback together in list",
            "explain": "Task:\nParent: filtered useMemo, onToggle useCallback, Row memo.\n\nIn simple words:\nFull stack optimization pattern — only worth it for big lists.\nOne missing piece → whole chain fails.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function OptimizedList({ todos }) {\n  const [filter, setFilter] = useState(\"\");\n  const shown = useMemo(\n    () => todos.filter((t) => t.text.includes(filter)),\n    [todos, filter]\n  );\n  const onToggle = useCallback((id) => {\n    /* dispatch toggle */\n  }, []);\n  return (\n    <ul>\n      {shown.map((t) => (\n        <MemoRow key={t.id} todo={t} onToggle={onToggle} />\n      ))}\n    </ul>\n  );\n}\n\nconst MemoRow = memo(function MemoRow({ todo, onToggle }) {\n  return (\n    <li>\n      <button onClick={() => onToggle(todo.id)}>{todo.text}</button>\n    </li>\n  );\n});"
          },
          {
            "title": "Q22: Breaking memo with inline object spread",
            "explain": "Task:\n<Child {...objectLit} /> new spread object every render.\n\nIn simple words:\nPick primitives or memoize props object.\nspread + inline = referential death.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function SpreadTrap() {\n  const [n, setN] = useState(0);\n  const props = useMemo(() => ({ label: \"hi\", n }), [n]);\n  return (\n    <div>\n      <button onClick={() => setN(n + 1)}>{n}</button>\n      <ExpensiveChild {...props} />\n    </div>\n  );\n}\n\nconst ExpensiveChild = memo(function ExpensiveChild({ label }) {\n  return <span>{label}</span>;\n});"
          }
        ]
      },
      {
        "file": "17_ReactMemo.jsx",
        "title": "17 — React.memo",
        "kya": "React.memo = tell child \"if my props look the same, don't",
        "detail": "17 — React.memo\nLevel: MID  |  Sequence: read this file, then the next number\n\nSIMPLE: React.memo = tell child \"if my props look the same, don't\npaint again\". Parent re-render by default re-renders children too.\nmemo shallow compares props — skip when equal.\n\nWorks when: expensive child + parent often re-renders + props stable.\nNew object/fn in props every time → memo fails (use useCallback/useMemo together).\n\nWHY: List rows, pure presentational widgets optimize.\nINTERVIEW: shallow compare; memo + callback duo; when useless.\nUse in a Vite + React 19 project — teaching file.",
        "intro": "17 — React.memo\nLevel: MID  |  Sequence: read this file, then the next number\n\nSIMPLE: React.memo = tell child \"if my props look the same, don't\npaint again\". Parent re-render by default re-renders children too.\nmemo shallow compares props — skip when equal.\n\nWorks when: expensive child + parent often re-renders + props stable.\nNew object/fn in props every time → memo fails (use useCallback/useMemo together).\n\nWHY: List rows, pure presentational widgets optimize.\nINTERVIEW: shallow compare; memo + callback duo; when useless.\nUse in a Vite + React 19 project — teaching file.",
        "questions": [
          {
            "title": "Q1: Wrap pure component",
            "explain": "Task:\nexport default memo(function Expensive({ label }) ...)\n\nIn simple words:\nSame label → skip render. Even when parent counter changes.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const Expensive = memo(function Expensive({ label }) {\n  console.log(\"Expensive render\", label);\n  return <div>{label}</div>;\n});\n\nfunction Parent() {\n  const [n, setN] = useState(0);\n  return (\n    <div>\n      <button onClick={() => setN(n + 1)}>{n}</button>\n      <Expensive label=\"static\" />\n    </div>\n  );\n}"
          },
          {
            "title": "Q2: Memo breaks on inline object",
            "explain": "Task:\nstyle={{}} new every render → child re-renders.\n\nIn simple words:\nReferential inequality. Hoist style or memoize.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const Box = memo(function Box({ style }) {\n  console.log(\"Box\");\n  return <div style={style}>Box</div>;\n});\n\nfunction BreakMemo() {\n  const [n, setN] = useState(0);\n  return (\n    <div>\n      <button onClick={() => setN(n + 1)}>{n}</button>\n      {/* BAD: <Box style={{ color: \"red\" }} /> */}\n      <Box style={staticStyle} />\n    </div>\n  );\n}\nconst staticStyle = { color: \"red\" };"
          },
          {
            "title": "Q3: memo + useCallback",
            "explain": "Task:\nPass stable onClick to memo child.\n\nIn simple words:\nClassic interview duo.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const Item = memo(function Item({ onClick, text }) {\n  return <button onClick={onClick}>{text}</button>;\n});\n\nfunction List() {\n  const [n, setN] = useState(0);\n  const save = useCallback(() => console.log(\"save\"), []);\n  return (\n    <div>\n      <button onClick={() => setN(n + 1)}>{n}</button>\n      <Item text=\"Save\" onClick={save} />\n    </div>\n  );\n}"
          },
          {
            "title": "Q4: Custom compare (rare)",
            "explain": "Task:\nmemo(Comp, (prev, next) => prev.id === next.id)\n\nIn simple words:\ntrue return = props equal = SKIP. Easy to get wrong — default shallow usually enough.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const Row = memo(\n  function Row({ user }) {\n    return <div>{user.name}</div>;\n  },\n  (prev, next) => prev.user.id === next.user.id\n);"
          },
          {
            "title": "Q5: [MID] Children prop often breaks memo",
            "explain": "Task:\n<Memo><span/></Memo> — children is new element every time.\n\nIn simple words:\nElement objects are new. Composition + memo needs care.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const Frame = memo(function Frame({ children }) {\n  console.log(\"Frame\");\n  return <div>{children}</div>;\n});"
          },
          {
            "title": "Q6: When NOT to memo",
            "explain": "Task:\nCheap component / props always change — don't wrap.\n\nIn simple words:\nCompare cost + mental load. Profile first.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Cheap({ t }) {\n  return <span>{t}</span>; // memo optional / skip\n}"
          },
          {
            "title": "Q7: [MID] memo is not useMemo",
            "explain": "Task:\nReact.memo = component. useMemo = value. Different tools.\n\nIn simple words:\nInterview confusion common — keep them clear.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "// memo(Component) vs useMemo(() => value, deps)"
          },
          {
            "title": "Q8: List of memo rows",
            "explain": "Task:\nParent filter state; unchanged rows skip with memo + stable props.\n\nIn simple words:\nMeaningful in big lists. Virtualization is a separate topic.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const TodoRow = memo(function TodoRow({ todo, onToggle }) {\n  return (\n    <li>\n      <button onClick={() => onToggle(todo.id)}>{todo.text}</button>\n    </li>\n  );\n});"
          },
          {
            "title": "Q9: Shallow compare — what memo checks",
            "explain": "Task:\nprevProps.a === nextProps.a — top level only, not nested object fields.\n\nIn simple words:\nuser object same ref but user.name change → memo skips (shallow pass).\nDon't deep compare — custom areEqual or immutable data.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const ShallowDemo = memo(function ShallowDemo({ user }) {\n  return <span>{user.name}</span>;\n});"
          },
          {
            "title": "Q10: Custom areEqual — when useful",
            "explain": "Task:\nmemo(Row, (prev, next) => prev.item.id === next.item.id)\n\nIn simple words:\ntrue return = SKIP render (props \"equal\"). Feels backwards — be careful.\nOnly when same id means whole row is same.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const ItemRow = memo(\n  function ItemRow({ item }) {\n    return <div>{item.label}</div>;\n  },\n  (prev, next) => prev.item.id === next.item.id\n);"
          },
          {
            "title": "Q11: [MID] Children problem deep dive",
            "explain": "Task:\n<MemoParent><div>{dynamic}</div></MemoParent> — children new every render.\n\nIn simple words:\nJSX children = prop. Element created every render.\nFix: memo leaf, hoist children, or restructure composition.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function ChildrenProblemParent() {\n  const [n, setN] = useState(0);\n  return (\n    <div>\n      <button onClick={() => setN(n + 1)}>{n}</button>\n      <Frame>\n        <span>child {n}</span>\n      </Frame>\n    </div>\n  );\n}"
          },
          {
            "title": "Q12: memo + useCallback full combo demo",
            "explain": "Task:\nMemoListItem + stable onClick + stable item ref from normalized store.\n\nIn simple words:\nThree pieces: memo child, useCallback handler, stable data refs.\nInterview \"golden trio\" for list optimization.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const MemoListItem = memo(function MemoListItem({ id, onPick }) {\n  return <button onClick={() => onPick(id)}>{id}</button>;\n});\n\nfunction MemoComboList() {\n  const [sel, setSel] = useState(null);\n  const onPick = useCallback((id) => setSel(id), []);\n  const ids = [1, 2, 3];\n  return (\n    <ul>\n      {ids.map((id) => (\n        <MemoListItem key={id} id={id} onPick={onPick} />\n      ))}\n      <p>{sel}</p>\n    </ul>\n  );\n}"
          },
          {
            "title": "Q13: When memo useless — props always change",
            "explain": "Task:\n<Clock time={Date.now()} /> — new time every render, memo zero benefit.\n\nIn simple words:\nIf any prop changes every time — skip memo entirely.\nCompare overhead with no gain.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Clock({ time }) {\n  return <time>{time}</time>; // skip memo — time changes every tick\n}"
          },
          {
            "title": "Q14: [MID] memo on component using context",
            "explain": "Task:\nmemo child consumes context — context change still forces render.\n\nIn simple words:\nmemo only compares props. Context update = forced re-render.\nThink context split (11) + memo combo.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function ContextConsumerMemoNote() {\n  return <p>Context change beats memo — will render even if props equal.</p>;\n}"
          },
          {
            "title": "Q15: Default export memo pattern",
            "explain": "Task:\nexport default memo(MyComponent) — HOC wrap.\n\nIn simple words:\nSet displayName for debug: MemoComp.displayName = \"MyComponent\"\nNamed export also common in teaching files.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const NamedMemo = memo(function NamedMemo({ v }) {\n  return <em>{v}</em>;\n});\nNamedMemo.displayName = \"NamedMemo\";"
          },
          {
            "title": "Q16: Primitive props — memo works great",
            "explain": "Task:\nlabel string, count number — shallow equal easy true.\n\nIn simple words:\nPresentational dumb components with primitives = memo sweet spot.\nParent unrelated field change → child skips.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const Label = memo(function Label({ text }) {\n  return <label>{text}</label>;\n});\n\nfunction PrimitiveMemoParent() {\n  const [a, setA] = useState(0);\n  const [b] = useState(\"static\");\n  return (\n    <div>\n      <button onClick={() => setA(a + 1)}>{a}</button>\n      <Label text={b} />\n    </div>\n  );\n}"
          },
          {
            "title": "Q17: [MID] memo vs shouldComponentUpdate legacy",
            "explain": "Task:\nClass: shouldComponentUpdate return false. Functional: memo equivalent.\n\nIn simple words:\nInterview bridge question class → hooks era.\nPureComponent also shallow compare — same idea.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function LegacyBridgeNote() {\n  return <p>PureComponent / memo = shallow props compare skip render.</p>;\n}"
          },
          {
            "title": "Q18: Passing unstable default prop",
            "explain": "Task:\nitems = [] default param — avoid new array every render from module level.\n\nIn simple words:\nconst EMPTY = []; function C({ items = EMPTY }) — stable default.\nInline [] default new every call — subtle memo break in parent too.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const EMPTY_ARR = [];\nfunction ListWithDefault({ items = EMPTY_ARR }) {\n  return <ul>{items.map((x) => <li key={x}>{x}</li>)}</ul>;\n}"
          },
          {
            "title": "Q19: Double memo — usually pointless",
            "explain": "Task:\nmemo(memo(Comp)) — redundant wrap.\n\nIn simple words:\nOnce is enough. Nested memo no extra benefit.\nHOC chain different story — but double memo same component is silly.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function DoubleMemoNote() {\n  return <p>memo(memo(X)) = waste. One layer enough.</p>;\n}"
          },
          {
            "title": "Q20: [MID] Profiler verify memo working",
            "explain": "Task:\nReact DevTools Profiler — see \"MemoChild (Memo)\" skipped renders.\n\nIn simple words:\nDon't assume memo works — measure.\nGray = skipped in profiler (React 18+).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function ProfilerNote() {\n  return <p>Use Profiler to confirm memo actually skips renders.</p>;\n}"
          },
          {
            "title": "Q21: State inside memo component",
            "explain": "Task:\nmemo child has its own useState — parent re-render, child state safe.\n\nIn simple words:\nSkip render = child function doesn't run again — local state preserved.\nProps same → internal state intact. Important interview point.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const StatefulMemo = memo(function StatefulMemo({ seed }) {\n  const [n, setN] = useState(seed);\n  return <button onClick={() => setN(n + 1)}>{n}</button>;\n});"
          },
          {
            "title": "Q22: Anti-pattern — memo everything",
            "explain": "Task:\nmemo every tiny component — bundle + compare cost, readability down.\n\nIn simple words:\nTarget hot paths: big lists, heavy charts, frequent parent updates.\nDefault: no memo. Add surgically with profiler proof.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function MemoEverythingNote() {\n  return <p>Memo on everything = overkill. Focus on expensive + stable props.</p>;\n}"
          }
        ]
      },
      {
        "file": "18_UseLayoutEffect.jsx",
        "title": "18 — useLayoutEffect",
        "kya": "useEffect = work AFTER paint (user may see a flash).",
        "detail": "18 — useLayoutEffect\nLevel: MID  |  Sequence: read this file, then the next number\n\nSIMPLE: useEffect = work AFTER paint (user may see a flash).\nuseLayoutEffect = after DOM update, BEFORE browser paint, sync.\nLike measure then set position — avoid flash.\n\nDefault prefer useEffect. useLayoutEffect is blocking — too much = jank.\nSSR: useLayoutEffect warning — client-only measure patterns.\n\nWHY: Tooltip position, scroll lock measure, avoid flicker.\nINTERVIEW: effect vs layoutEffect timing; when necessary.\nUse in a Vite + React 19 project — teaching file.",
        "intro": "18 — useLayoutEffect\nLevel: MID  |  Sequence: read this file, then the next number\n\nSIMPLE: useEffect = work AFTER paint (user may see a flash).\nuseLayoutEffect = after DOM update, BEFORE browser paint, sync.\nLike measure then set position — avoid flash.\n\nDefault prefer useEffect. useLayoutEffect is blocking — too much = jank.\nSSR: useLayoutEffect warning — client-only measure patterns.\n\nWHY: Tooltip position, scroll lock measure, avoid flicker.\nINTERVIEW: effect vs layoutEffect timing; when necessary.\nUse in a Vite + React 19 project — teaching file.",
        "questions": [
          {
            "title": "Q1: Measure DOM before paint",
            "explain": "Task:\nRead ref height into state — in layoutEffect.\n\nIn simple words:\nMeasure in useEffect → wrong frame may flash first.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Measure() {\n  const ref = useRef(null);\n  const [h, setH] = useState(0);\n  useLayoutEffect(() => {\n    setH(ref.current.getBoundingClientRect().height);\n  }, []);\n  return (\n    <div>\n      <div ref={ref}>Content</div>\n      <p>Height: {h}</p>\n    </div>\n  );\n}"
          },
          {
            "title": "Q2: Tooltip position",
            "explain": "Task:\nAnchor rect → set tooltip top/left before paint.\n\nIn simple words:\nClassic layoutEffect use case.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Tooltip({ anchorRef, text }) {\n  const tipRef = useRef(null);\n  const [pos, setPos] = useState({ top: 0, left: 0 });\n  useLayoutEffect(() => {\n    const r = anchorRef.current.getBoundingClientRect();\n    setPos({ top: r.bottom + 8, left: r.left });\n  }, [anchorRef, text]);\n  return (\n    <div\n      ref={tipRef}\n      style={{ position: \"fixed\", top: pos.top, left: pos.left }}\n    >\n      {text}\n    </div>\n  );\n}"
          },
          {
            "title": "Q3: Prefer useEffect for data fetch",
            "explain": "Task:\nDon't fetch in layoutEffect — blocks UI.\n\nIn simple words:\nNetwork = async = useEffect. Rule of thumb.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Users() {\n  const [users, setUsers] = useState([]);\n  useEffect(() => {\n    fetch(\"/api/users\")\n      .then((r) => r.json())\n      .then(setUsers);\n  }, []);\n  return <pre>{JSON.stringify(users)}</pre>;\n}"
          },
          {
            "title": "Q4: Sync scroll position",
            "explain": "Task:\nRestore scrollY before paint — less flicker.\n\nIn simple words:\nVisual sync → layoutEffect candidate.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function RestoreScroll({ y }) {\n  useLayoutEffect(() => {\n    window.scrollTo(0, y);\n  }, [y]);\n  return null;\n}"
          },
          {
            "title": "Q5: [MID] setState in layoutEffect still re-render",
            "explain": "Task:\nMeasure → setState → extra render before paint — intentional.\n\nIn simple words:\nAccept double render cost for correct first paint.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Box() {\n  const ref = useRef(null);\n  const [w, setW] = useState(0);\n  useLayoutEffect(() => {\n    setW(ref.current.offsetWidth);\n  });\n  return <div ref={ref}>w={w}</div>;\n}"
          },
          {
            "title": "Q6: Cleanup same as useEffect",
            "explain": "Task:\nreturn () => cleanup — listeners etc.\n\nIn simple words:\nDifferent timing; same cleanup API.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function LockScroll() {\n  useLayoutEffect(() => {\n    const prev = document.body.style.overflow;\n    document.body.style.overflow = \"hidden\";\n    return () => {\n      document.body.style.overflow = prev;\n    };\n  }, []);\n  return <p>Modal open — scroll locked</p>;\n}"
          },
          {
            "title": "Q7: [MID] SSR warning awareness",
            "explain": "Task:\nlayoutEffect doesn't run on server — hydrate mismatch careful.\n\nIn simple words:\nMeasure-only after mount. Initial render safe default.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function ClientOnlyMeasure() {\n  const [ready, setReady] = useState(false);\n  useLayoutEffect(() => setReady(true), []);\n  if (!ready) return null;\n  return <Measure />;\n}"
          },
          {
            "title": "Q8: Decision cheat",
            "explain": "Task:\nFlicker/measure/DOM read-write sync? layout. Else effect.\n\nIn simple words:\nInterview one-liner.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function CheatSheet() {\n  return (\n    <p>\n      useEffect = after paint · useLayoutEffect = before paint (rare)\n    </p>\n  );\n}"
          },
          {
            "title": "Q9: Paint blocking explained",
            "explain": "Task:\nuseLayoutEffect blocks browser paint until sync work finishes.\n\nIn simple words:\nLong layoutEffect = jank, FPS drop. Small sync DOM tweak OK.\nDefault useEffect — paint first, user feels responsive.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function PaintBlockNote() {\n  return <p>layoutEffect sync = main thread block until done.</p>;\n}"
          },
          {
            "title": "Q10: Flicker fix — measure then setState",
            "explain": "Task:\nTooltip paints at (0,0) first in useEffect → flash. Fix in layoutEffect.\n\nIn simple words:\nUser won't see wrong frame. Measure → correct pos → then paint.\nClassic interview before/after example.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function FlickerTooltip({ show, anchorRef }) {\n  const [style, setStyle] = useState({ opacity: 0 });\n  useLayoutEffect(() => {\n    if (!show || !anchorRef.current) return;\n    const r = anchorRef.current.getBoundingClientRect();\n    setStyle({ position: \"fixed\", top: r.bottom, left: r.left, opacity: 1 });\n  }, [show, anchorRef]);\n  if (!show) return null;\n  return <div style={style}>Tip</div>;\n}"
          },
          {
            "title": "Q11: [MID] useEffect vs useLayoutEffect timing diagram",
            "explain": "Task:\nRender → DOM commit → layoutEffect → paint → useEffect.\n\nIn simple words:\nDOM ready in both. layout before paint; effect after paint.\nRead layout → write DOM sync = layoutEffect territory.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function TimingNote() {\n  return (\n    <p>\n      Order: commit DOM → useLayoutEffect → browser paint → useEffect\n    </p>\n  );\n}"
          },
          {
            "title": "Q12: Auto-focus input without flash",
            "explain": "Task:\nModal open → focus input in layoutEffect — avoid unfocused first frame.\n\nIn simple words:\nUX polish. Focus jump happens before paint.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function AutoFocusInput({ open }) {\n  const ref = useRef(null);\n  useLayoutEffect(() => {\n    if (open) ref.current?.focus();\n  }, [open]);\n  if (!open) return null;\n  return <input ref={ref} placeholder=\"Focused\" />;\n}"
          },
          {
            "title": "Q13: DOM measurement for animation start",
            "explain": "Task:\nMeasure element height → start animate to height in layoutEffect.\n\nIn simple words:\nExpand/collapse animation wrong start = flicker. Measure first frame sync.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function MeasuredExpand({ open, children }) {\n  const ref = useRef(null);\n  const [height, setHeight] = useState(0);\n  useLayoutEffect(() => {\n    if (ref.current) setHeight(ref.current.scrollHeight);\n  }, [open, children]);\n  return (\n    <div style={{ height: open ? height : 0, overflow: \"hidden\" }}>\n      <div ref={ref}>{children}</div>\n    </div>\n  );\n}"
          },
          {
            "title": "Q14: [MID] SSR warning — suppressHydration / client-only",
            "explain": "Task:\nServer: layoutEffect skip. Measure after client mount — avoid mismatch.\n\nIn simple words:\n\"useLayoutEffect does nothing on the server\" warning normal in SSR.\nClientOnlyMeasure pattern (Q7) or dynamic import ssr:false.\nInitial HTML safe defaults; measure post-hydrate.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function SsrSafeMeasure() {\n  const [mounted, setMounted] = useState(false);\n  useLayoutEffect(() => setMounted(true), []);\n  if (!mounted) return <div style={{ minHeight: 40 }}>Loading...</div>;\n  return <Measure />;\n}"
          },
          {
            "title": "Q15: When NOT useLayoutEffect — subscriptions",
            "explain": "Task:\nwindow resize listener — useEffect OK, don't block paint.\n\nIn simple words:\nListeners, fetch, timers = useEffect. DOM visual sync = layoutEffect.\nRemember rule of thumb in interviews.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function ResizeListener() {\n  const [w, setW] = useState(window.innerWidth);\n  useEffect(() => {\n    const fn = () => setW(window.innerWidth);\n    window.addEventListener(\"resize\", fn);\n    return () => window.removeEventListener(\"resize\", fn);\n  }, []);\n  return <p>{w}px</p>;\n}"
          },
          {
            "title": "Q16: Read then write DOM — forced reflow",
            "explain": "Task:\noffsetHeight read → style.width set — batch in one layoutEffect.\n\nIn simple words:\nread/write in useEffect = extra layout thrashing possible.\nSync read-write in layoutEffect = one forced layout, controlled.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function ReadWriteSync() {\n  const ref = useRef(null);\n  useLayoutEffect(() => {\n    const el = ref.current;\n    if (!el) return;\n    const w = el.offsetWidth;\n    el.style.maxWidth = `${w / 2}px`;\n  }, []);\n  return <div ref={ref}>Resize me</div>;\n}"
          },
          {
            "title": "Q17: [MID] Double render with layoutEffect setState",
            "explain": "Task:\nRender 1 → layoutEffect setState → Render 2 → paint.\n\nIn simple words:\nWe accept cost for correct visual.\nReact 18 batching helps but still 2 commits possible.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function DoubleRenderNote() {\n  return <p>layoutEffect setState = extra render before paint — intentional.</p>;\n}"
          },
          {
            "title": "Q18: Tooltip vs popover positioning libs",
            "explain": "Task:\nFloating UI / Popper — internally layoutEffect or similar sync measure.\n\nIn simple words:\nManual tooltip = layoutEffect. Libraries handle edge cases.\nInterview: know WHY libs use sync measure.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function PopperNote() {\n  return <p>Position libs = measure + flip + shift — sync layout critical.</p>;\n}"
          },
          {
            "title": "Q19: useLayoutEffect dependency changes",
            "explain": "Task:\nReposition tooltip when anchor moves — deps [anchorRef, open].\n\nIn simple words:\nRe-measure before paint on every relevant change.\nMissing dep = stale position flash.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function FollowAnchor({ anchorRef, open }) {\n  const [pos, setPos] = useState({ x: 0, y: 0 });\n  useLayoutEffect(() => {\n    if (!open || !anchorRef.current) return;\n    const r = anchorRef.current.getBoundingClientRect();\n    setPos({ x: r.left, y: r.bottom });\n  }, [open, anchorRef]);\n  if (!open) return null;\n  return <div style={{ position: \"fixed\", left: pos.x, top: pos.y }}>▾</div>;\n}"
          },
          {
            "title": "Q20: [MID] useInsertionEffect — CSS-in-JS note",
            "explain": "Task:\nStyled-components inject styles BEFORE layoutEffect — even earlier.\n\nIn simple words:\nTimeline: insertionEffect → layoutEffect → paint → effect.\nFor CSS inject order — rare interview deep dive.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function InsertionEffectNote() {\n  return <p>useInsertionEffect = inject styles, even before layout.</p>;\n}"
          },
          {
            "title": "Q21: Avoid layoutEffect for logging/analytics",
            "explain": "Task:\nconsole.log / track() — useEffect, don't block paint.\n\nIn simple words:\nNon-visual side effects fine after paint. User shouldn't wait for analytics.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function AnalyticsOnMount({ id }) {\n  useEffect(() => {\n    console.log(\"view\", id);\n  }, [id]);\n  return null;\n}"
          },
          {
            "title": "Q22: Decision flowchart recap",
            "explain": "Task:\nDOM measure/read/write visual sync? → layoutEffect. Else → useEffect.\n\nIn simple words:\nFlicker complaint + DOM measure = first fix to try.\n95% cases useEffect enough — layoutEffect is surgical tool.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function LayoutDecision() {\n  return (\n    <ul>\n      <li>Visual flicker? → useLayoutEffect</li>\n      <li>Fetch/log/timer? → useEffect</li>\n      <li>SSR? → client-only measure</li>\n    </ul>\n  );\n}"
          }
        ]
      },
      {
        "file": "19_Portals.jsx",
        "title": "19 — Portals",
        "kya": "Portal = child lives in React tree here, but DOM renders somewhere else (body",
        "detail": "19 — Portals\nLevel: MID  |  Sequence: read this file, then the next number\n\nSIMPLE: Portal = child lives in React tree here, but DOM renders somewhere else (body\nfor modal). Like kitchen order at counter, dish served at table.\ncreatePortal(jsx, domNode) — events still bubble through React tree (logical).\n\nUse: modals, tooltips, toasts — escape overflow:hidden parent.\n\nWHY: CSS stacking/overflow issues fix without breaking component tree.\nINTERVIEW: why portals; event bubbling through portals.\nUse in a Vite + React 19 project — teaching file.",
        "intro": "19 — Portals\nLevel: MID  |  Sequence: read this file, then the next number\n\nSIMPLE: Portal = child lives in React tree here, but DOM renders somewhere else (body\nfor modal). Like kitchen order at counter, dish served at table.\ncreatePortal(jsx, domNode) — events still bubble through React tree (logical).\n\nUse: modals, tooltips, toasts — escape overflow:hidden parent.\n\nWHY: CSS stacking/overflow issues fix without breaking component tree.\nINTERVIEW: why portals; event bubbling through portals.\nUse in a Vite + React 19 project — teaching file.",
        "questions": [
          {
            "title": "Q1: Modal via portal to document.body",
            "explain": "Task:\ncreatePortal(<dialog/>, document.body)\n\nIn simple words:\nModal on DOM root — z-index/overflow safe.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Modal({ children, onClose }) {\n  return createPortal(\n    <div className=\"overlay\" onClick={onClose}>\n      <div className=\"modal\" onClick={(e) => e.stopPropagation()}>\n        {children}\n      </div>\n    </div>,\n    document.body\n  );\n}"
          },
          {
            "title": "Q2: Conditional portal",
            "explain": "Task:\nPortal mounts only when open.\n\nIn simple words:\nClosed modal = portal unmount. Cleanup natural.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function App() {\n  const [open, setOpen] = useState(false);\n  return (\n    <div>\n      <button onClick={() => setOpen(true)}>Open</button>\n      {open && (\n        <Modal onClose={() => setOpen(false)}>\n          <p>Hello portal</p>\n        </Modal>\n      )}\n    </div>\n  );\n}"
          },
          {
            "title": "Q3: Toast container",
            "explain": "Task:\nFixed corner portal for toasts.\n\nIn simple words:\nApp triggers toast from anywhere — DOM in one place.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Toast({ message }) {\n  return createPortal(\n    <div className=\"toast\">{message}</div>,\n    document.body\n  );\n}"
          },
          {
            "title": "Q4: Target node by id",
            "explain": "Task:\ndocument.getElementById(\"modal-root\")\n\nIn simple words:\nindex.html has <div id=\"modal-root\"> — common separate root pattern.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function PortalToRoot({ children }) {\n  const node = document.getElementById(\"modal-root\") || document.body;\n  return createPortal(children, node);\n}"
          },
          {
            "title": "Q5: [MID] Events bubble in React tree",
            "explain": "Task:\nParent onClick may fire on portal child click (React 17+ delegation).\n\nIn simple words:\nDOM different, React parentage same. Use stopPropagation knowingly.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function ParentClick() {\n  return (\n    <div onClick={() => console.log(\"parent\")}>\n      <Modal onClose={() => {}}>\n        <button>Click — parent may hear in React tree</button>\n      </Modal>\n    </div>\n  );\n}"
          },
          {
            "title": "Q6: Focus trap note (a11y)",
            "explain": "Task:\nPortal modal needs focus trap / Escape close — a11y required.\n\nIn simple words:\nPortal only moves DOM; accessibility is separate work.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function A11yModal({ onClose, children }) {\n  useEffect(() => {\n    function onKey(e) {\n      if (e.key === \"Escape\") onClose();\n    }\n    window.addEventListener(\"keydown\", onKey);\n    return () => window.removeEventListener(\"keydown\", onKey);\n  }, [onClose]);\n  return createPortal(\n    <div role=\"dialog\" aria-modal=\"true\">\n      {children}\n    </div>,\n    document.body\n  );\n}"
          },
          {
            "title": "Q7: [MID] SSR: document check",
            "explain": "Task:\ntypeof document === \"undefined\" → null.\n\nIn simple words:\nNo body on server. Portal after client mount.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function SafePortal({ children }) {\n  const [ready, setReady] = useState(false);\n  useEffect(() => setReady(true), []);\n  if (!ready) return null;\n  return createPortal(children, document.body);\n}"
          },
          {
            "title": "Q8: Tooltip portal",
            "explain": "Task:\nTooltip outside overflow hidden card.\n\nIn simple words:\nSame reason as modal — escape clipping.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Tip({ text }) {\n  return createPortal(<div className=\"tip\">{text}</div>, document.body);\n}"
          },
          {
            "title": "Q9: Nested portal — tooltip inside modal",
            "explain": "Task:\nOuter modal on body; inner tooltip also on body as separate portal.\n\nIn simple words:\nBoth DOM elsewhere, React tree parent-child. Nested portals valid.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function NestedPortalModal({ open, onClose }) {\n  if (!open) return null;\n  return createPortal(\n    <div className=\"overlay\">\n      <div className=\"modal\">\n        <p>Modal content</p>\n        {createPortal(<div className=\"tip\">Nested tip</div>, document.body)}\n        <button onClick={onClose}>Close</button>\n      </div>\n    </div>,\n    document.body\n  );\n}"
          },
          {
            "title": "Q10: [MID] DOM stopPropagation vs React bubble",
            "explain": "Task:\ne.stopPropagation() on DOM; React synthetic parent onClick different rule.\n\nIn simple words:\nPortal DOM is outside but inside React tree — understand both layers.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function BubbleDemo() {\n  return (\n    <div onClick={() => console.log(\"React parent\")}>\n      <Modal onClose={() => {}}>\n        <button onClick={(e) => e.stopPropagation()}>Stop DOM only</button>\n      </Modal>\n    </div>\n  );\n}"
          },
          {
            "title": "Q11: Body scroll lock when modal open",
            "explain": "Task:\nopen: document.body.style.overflow = \"hidden\"; close: restore.\n\nIn simple words:\nPortal doesn't trap scroll — lock scroll yourself.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function ScrollLockModal({ open, onClose, children }) {\n  useEffect(() => {\n    if (!open) return;\n    const prev = document.body.style.overflow;\n    document.body.style.overflow = \"hidden\";\n    return () => {\n      document.body.style.overflow = prev;\n    };\n  }, [open]);\n  if (!open) return null;\n  return createPortal(\n    <div className=\"overlay\" onClick={onClose}>\n      <div className=\"modal\" onClick={(e) => e.stopPropagation()}>\n        {children}\n      </div>\n    </div>,\n    document.body\n  );\n}"
          },
          {
            "title": "Q12: [MID] Focus trap — tab loop inside modal",
            "explain": "Task:\nModal open: focus first focusable element; Tab loops last to first.\n\nIn simple words:\nKeyboard users shouldn't wander outside — a11y must.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function FocusTrapModal({ onClose, children }) {\n  const modalRef = useRef(null);\n  useEffect(() => {\n    const el = modalRef.current;\n    if (!el) return;\n    const focusables = el.querySelectorAll(\n      'button, [href], input, select, textarea, [tabindex]:not([tabindex=\"-1\"])'\n    );\n    focusables[0]?.focus();\n    function onKey(e) {\n      if (e.key !== \"Tab\" || focusables.length === 0) return;\n      const first = focusables[0];\n      const last = focusables[focusables.length - 1];\n      if (e.shiftKey && document.activeElement === first) {\n        e.preventDefault();\n        last.focus();\n      } else if (!e.shiftKey && document.activeElement === last) {\n        e.preventDefault();\n        first.focus();\n      }\n    }\n    el.addEventListener(\"keydown\", onKey);\n    return () => el.removeEventListener(\"keydown\", onKey);\n  }, []);\n  return createPortal(\n    <div ref={modalRef} role=\"dialog\" aria-modal=\"true\">\n      {children}\n      <button onClick={onClose}>Close</button>\n    </div>,\n    document.body\n  );\n}"
          },
          {
            "title": "Q13: Return focus to trigger button on close",
            "explain": "Task:\nSave document.activeElement before open; .focus() restore on close.\n\nIn simple words:\nScreen reader / keyboard flow stays natural.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function ReturnFocusModal({ open, onClose, triggerRef }) {\n  const prevFocus = useRef(null);\n  useEffect(() => {\n    if (open) {\n      prevFocus.current = document.activeElement;\n    } else {\n      prevFocus.current?.focus?.();\n    }\n  }, [open]);\n  if (!open) return null;\n  return createPortal(\n    <div role=\"dialog\">\n      <p>Modal</p>\n      <button onClick={onClose}>Done</button>\n    </div>,\n    document.body\n  );\n}"
          },
          {
            "title": "Q14: [MID] aria-hidden background when modal open",
            "explain": "Task:\n#root aria-hidden=\"true\" when modal; remove on cleanup.\n\nIn simple words:\nAssistive tech only hears modal — background \"muted\".",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function AriaHiddenModal({ open, onClose, children }) {\n  useEffect(() => {\n    const root = document.getElementById(\"root\");\n    if (!open || !root) return;\n    root.setAttribute(\"aria-hidden\", \"true\");\n    return () => root.removeAttribute(\"aria-hidden\");\n  }, [open]);\n  if (!open) return null;\n  return createPortal(\n    <div role=\"dialog\" aria-modal=\"true\">\n      {children}\n      <button onClick={onClose}>Close</button>\n    </div>,\n    document.body\n  );\n}"
          },
          {
            "title": "Q15: Multiple modals — z-index stacking",
            "explain": "Task:\nEach modal its own z-index level; confirm dialog above modal.\n\nIn simple words:\nSame body portal — manage stack with order + z-index.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function StackedModals() {\n  const [confirm, setConfirm] = useState(false);\n  return (\n    <>\n      {createPortal(\n        <div style={{ zIndex: 1000 }} className=\"modal\">Main modal</div>,\n        document.body\n      )}\n      {confirm &&\n        createPortal(\n          <div style={{ zIndex: 1100 }} className=\"modal\">\n            Sure?\n            <button onClick={() => setConfirm(false)}>OK</button>\n          </div>,\n          document.body\n        )}\n    </>\n  );\n}"
          },
          {
            "title": "Q16: [MID] Portal target from ref (dynamic container)",
            "explain": "Task:\nuseRef + useEffect until container node ready; then createPortal.\n\nIn simple words:\nNot fixed getElementById — component can create its own mount point.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function DynamicPortalTarget({ children }) {\n  const ref = useRef(null);\n  const [node, setNode] = useState(null);\n  useEffect(() => setNode(ref.current), []);\n  return (\n    <>\n      <div ref={ref} id=\"dynamic-portal-root\" />\n      {node && createPortal(children, node)}\n    </>\n  );\n}"
          },
          {
            "title": "Q17: Tooltip portal — escape overflow clip",
            "explain": "Task:\nCard overflow:hidden; tooltip createPortal to body with fixed position.\n\nIn simple words:\nCalculate position (getBoundingClientRect); render in portal.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function TooltipPortal({ anchorRef, text, show }) {\n  const [pos, setPos] = useState({ top: 0, left: 0 });\n  useEffect(() => {\n    if (!show || !anchorRef.current) return;\n    const r = anchorRef.current.getBoundingClientRect();\n    setPos({ top: r.bottom + 4, left: r.left });\n  }, [show, anchorRef]);\n  if (!show) return null;\n  return createPortal(\n    <div className=\"tip\" style={{ position: \"fixed\", ...pos }}>\n      {text}\n    </div>,\n    document.body\n  );\n}"
          },
          {
            "title": "Q18: [ADV] React 17+ event delegation on root",
            "explain": "Task:\nNot on document — React root delegates; portal events bubble in tree.\n\nIn simple words:\nInterview: portal DOM different, React hierarchy same — parent onClick fires.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function DelegationNote() {\n  return (\n    <p>\n      React 17+: events attach from root container — portal child click can\n      bubble to React parent.\n    </p>\n  );\n}"
          },
          {
            "title": "Q19: [ADV] SSR hydration — portal null on server",
            "explain": "Task:\nServer HTML has no portal content; inject after client mount.\n\nIn simple words:\nAvoid hydration mismatch — client-only portal pattern (like Q7).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function HydrationSafePortal({ children }) {\n  const [mounted, setMounted] = useState(false);\n  useEffect(() => setMounted(true), []);\n  if (!mounted) return null;\n  return createPortal(children, document.body);\n}"
          },
          {
            "title": "Q20: [ADV] Nested portal unmount order",
            "explain": "Task:\nParent modal unmount → nested portals inside also cleanup.\n\nIn simple words:\nReact follows unmount tree order — nested portal DOM nodes removed too.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function UnmountOrderDemo() {\n  const [open, setOpen] = useState(true);\n  return (\n    <div>\n      <button onClick={() => setOpen(false)}>Close all</button>\n      {open && (\n        <NestedPortalModal open onClose={() => setOpen(false)} />\n      )}\n    </div>\n  );\n}"
          },
          {
            "title": "Q21: [ADV] Portal vs position:fixed — when which?",
            "explain": "Task:\nFixed + high z-index sometimes enough; portal when ancestor transform/overflow clip.\n\nIn simple words:\nInterview: stacking context / overflow:hidden parent → portal needed.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function PortalVsFixed() {\n  return (\n    <p>\n      position:fixed enough when parent doesn't clip; portal when modal must leave\n      DOM hierarchy.\n    </p>\n  );\n}"
          },
          {
            "title": "Q22: [ADV] Interview — portal checklist to recite",
            "explain": "Task:\ncreatePortal, events, SSR guard, focus trap, scroll lock, aria-modal.\n\nIn simple words:\nMid interview answer: DOM escape + React tree preserve + a11y separate work.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function PortalChecklist() {\n  return (\n    <ol>\n      <li>createPortal(jsx, domNode)</li>\n      <li>Events bubble in React tree</li>\n      <li>SSR: client-only mount</li>\n      <li>Focus trap + return focus + Escape</li>\n      <li>Scroll lock + aria-hidden background</li>\n    </ol>\n  );\n}"
          }
        ]
      },
      {
        "file": "20_ErrorBoundaries.jsx",
        "title": "20 — Error Boundaries",
        "kya": "Error boundary = safety net. Child tree crash during render → instead of",
        "detail": "20 — Error Boundaries\nLevel: MID  |  Sequence: read this file, then the next number\n\nSIMPLE: Error boundary = safety net. Child tree crash during render → instead of\nwhole app white screen, show fallback UI. Class component (or library).\n\nCatch: render, lifecycle, constructors of children.\nNOT catch: event handlers, async, SSR, boundary's own errors — use try/catch there.\n\nWHY: Production resilience. Widget fail ≠ whole app die.\nINTERVIEW: what they catch / don't; class getDerivedStateFromError.\nUse in a Vite + React 19 project — teaching file. (class API intentional here)",
        "intro": "20 — Error Boundaries\nLevel: MID  |  Sequence: read this file, then the next number\n\nSIMPLE: Error boundary = safety net. Child tree crash during render → instead of\nwhole app white screen, show fallback UI. Class component (or library).\n\nCatch: render, lifecycle, constructors of children.\nNOT catch: event handlers, async, SSR, boundary's own errors — use try/catch there.\n\nWHY: Production resilience. Widget fail ≠ whole app die.\nINTERVIEW: what they catch / don't; class getDerivedStateFromError.\nUse in a Vite + React 19 project — teaching file. (class API intentional here)",
        "questions": [
          {
            "title": "Q1: Basic class error boundary",
            "explain": "Task:\ngetDerivedStateFromError + componentDidCatch.\n\nIn simple words:\nhasError state → fallback. didCatch for logging.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "class ErrorBoundary extends Component {\n  constructor(props) {\n    super(props);\n    this.state = { hasError: false };\n  }\n  static getDerivedStateFromError() {\n    return { hasError: true };\n  }\n  componentDidCatch(error, info) {\n    console.error(\"Boundary caught\", error, info);\n  }\n  render() {\n    if (this.state.hasError) {\n      return this.props.fallback ?? <p>Something broke.</p>;\n    }\n    return this.props.children;\n  }\n}"
          },
          {
            "title": "Q2: Wrap risky widget",
            "explain": "Task:\n<ErrorBoundary><Risky /></ErrorBoundary>\n\nIn simple words:\nIsolate blast radius. Rest of app keeps running.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Risky({ blow }) {\n  if (blow) throw new Error(\"boom\");\n  return <p>OK</p>;\n}\n\nfunction Dashboard() {\n  return (\n    <div>\n      <h1>Dash</h1>\n      <ErrorBoundary fallback={<p>Widget failed</p>}>\n        <Risky blow />\n      </ErrorBoundary>\n      <p>Still here</p>\n    </div>\n  );\n}"
          },
          {
            "title": "Q3: Reset by changing key",
            "explain": "Task:\nkey={resetId} on boundary — remount clears error state.\n\nIn simple words:\nRetry UX: user \"Try again\" → key++.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Recoverable() {\n  const [resetId, setResetId] = useState(0);\n  return (\n    <div>\n      <button onClick={() => setResetId((x) => x + 1)}>Try again</button>\n      <ErrorBoundary key={resetId}>\n        <Risky blow />\n      </ErrorBoundary>\n    </div>\n  );\n}"
          },
          {
            "title": "Q4: Event handler errors NOT caught",
            "explain": "Task:\nthrow in onClick — boundary won't catch; use try/catch.\n\nIn simple words:\nInterview classic. Handlers are separate.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function ClickBomb() {\n  return (\n    <button\n      onClick={() => {\n        try {\n          throw new Error(\"click boom\");\n        } catch (e) {\n          console.error(e);\n        }\n      }}\n    >\n      Click\n    </button>\n  );\n}"
          },
          {
            "title": "Q5: [MID] Async errors NOT caught",
            "explain": "Task:\nfetch().then throw — boundary won't. Set error state yourself.\n\nIn simple words:\nData layer error UI pattern (06/23).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function AsyncErrorDemo() {\n  const [err, setErr] = useState(null);\n  async function load() {\n    try {\n      throw new Error(\"network\");\n    } catch (e) {\n      setErr(String(e));\n    }\n  }\n  return (\n    <div>\n      <button onClick={load}>Load</button>\n      {err && <p>{err}</p>}\n    </div>\n  );\n}"
          },
          {
            "title": "Q6: Nested boundaries",
            "explain": "Task:\nPage boundary + section boundary — granular fallbacks.\n\nIn simple words:\nFine-grained UX: sidebar fail, main OK.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Page() {\n  return (\n    <ErrorBoundary fallback={<p>Page crash</p>}>\n      <ErrorBoundary fallback={<p>Side crash</p>}>\n        <aside>Side</aside>\n      </ErrorBoundary>\n      <main>Main</main>\n    </ErrorBoundary>\n  );\n}"
          },
          {
            "title": "Q7: [MID] Logging service in didCatch",
            "explain": "Task:\nSentry/LogRocket style — report in componentDidCatch.\n\nIn simple words:\nProduction observability. User gets friendly fallback.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "class ReportingBoundary extends Component {\n  state = { hasError: false };\n  static getDerivedStateFromError() {\n    return { hasError: true };\n  }\n  componentDidCatch(error, info) {\n    // window.myLogger?.send(error, info);\n    console.log(\"report\", error.message, info.componentStack);\n  }\n  render() {\n    if (this.state.hasError) return <p>Reported. Sorry.</p>;\n    return this.props.children;\n  }\n}"
          },
          {
            "title": "Q8: Libraries note",
            "explain": "Task:\nreact-error-boundary package — hooks-friendly API.\n\nIn simple words:\nTeams use libs to avoid class boilerplate.\nConcept same.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Note() {\n  return <p>Concept: isolate render errors with a boundary.</p>;\n}"
          },
          {
            "title": "Q9: getDerivedStateFromError — no side effects",
            "explain": "Task:\nOnly return state; logging in componentDidCatch.\n\nIn simple words:\ngetDerivedStateFromError must be pure — React rule.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "class PureBoundary extends Component {\n  state = { hasError: false };\n  static getDerivedStateFromError() {\n    return { hasError: true }; // no fetch/log here\n  }\n  componentDidCatch(error, info) {\n    console.error(error, info.componentStack);\n  }\n  render() {\n    return this.state.hasError ? this.props.fallback : this.props.children;\n  }\n}"
          },
          {
            "title": "Q10: [MID] Custom fallback with error details (dev only)",
            "explain": "Task:\ndidCatch error message in state (dev); generic UI in prod.\n\nIn simple words:\nFriendly for user; detail for dev — check env.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "class DevFallbackBoundary extends Component {\n  state = { hasError: false, msg: \"\" };\n  static getDerivedStateFromError(error) {\n    return { hasError: true, msg: error.message };\n  }\n  render() {\n    if (this.state.hasError) {\n      return (\n        <div>\n          <p>Something went wrong.</p>\n          {import.meta.env.DEV && <pre>{this.state.msg}</pre>}\n        </div>\n      );\n    }\n    return this.props.children;\n  }\n}"
          },
          {
            "title": "Q11: componentStack — which component crashed",
            "explain": "Task:\ninfo.componentStack in logging — send to Sentry.\n\nIn simple words:\nStack shows which child failed — faster debug.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "class StackLogBoundary extends Component {\n  state = { hasError: false };\n  static getDerivedStateFromError() {\n    return { hasError: true };\n  }\n  componentDidCatch(error, info) {\n    console.log(\"componentStack:\", info.componentStack);\n  }\n  render() {\n    if (this.state.hasError) return <p>Logged with stack.</p>;\n    return this.props.children;\n  }\n}"
          },
          {
            "title": "Q12: [MID] useEffect throw — boundary catches",
            "explain": "Task:\nThrow inside effect → propagates to render phase → boundary catch.\n\nIn simple words:\nsetTimeout throw no; sync throw in effect can reach boundary.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function EffectThrow({ bad }) {\n  useEffect(() => {\n    if (bad) throw new Error(\"effect sync throw\");\n  }, [bad]);\n  return <p>Effect demo</p>;\n}"
          },
          {
            "title": "Q13: Render conditional throw — classic catch",
            "explain": "Task:\nif (!data) throw new Error — boundary fallback.\n\nIn simple words:\nRender/lifecycle errors — main job of boundary.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function RenderThrow({ data }) {\n  if (!data) throw new Error(\"missing data\");\n  return <p>{data}</p>;\n}"
          },
          {
            "title": "Q14: [MID] SSR — error boundary different behavior on server",
            "explain": "Task:\nServer render error → HTML error page; client hydrate different.\n\nIn simple words:\nBoundary mostly client hydration/render; SSR errors often handled by framework.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function SSRNote() {\n  return (\n    <p>\n      SSR crash often fails whole response; client ErrorBoundary isolates at widget\n      level.\n    </p>\n  );\n}"
          },
          {
            "title": "Q15: Boundary itself throws — parent boundary catches",
            "explain": "Task:\nInner boundary crash in render → outer boundary fallback.\n\nIn simple words:\nBoundary doesn't catch its own errors — parent or white screen.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function OuterInnerDemo() {\n  return (\n    <ErrorBoundary fallback={<p>Outer caught</p>}>\n      <ErrorBoundary fallback={<p>Inner caught</p>}>\n        <Risky blow />\n      </ErrorBoundary>\n    </ErrorBoundary>\n  );\n}"
          },
          {
            "title": "Q16: [MID] Granular boundaries — chart vs table separate",
            "explain": "Task:\nEach widget its own boundary — one fail, rest of dashboard live.\n\nIn simple words:\nSmaller blast radius = better UX + easier debug.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function WidgetGrid() {\n  return (\n    <div className=\"grid\">\n      <ErrorBoundary fallback={<p>Chart failed</p>}>\n        <Risky blow={false} />\n      </ErrorBoundary>\n      <ErrorBoundary fallback={<p>Table failed</p>}>\n        <Risky blow={false} />\n      </ErrorBoundary>\n    </div>\n  );\n}"
          },
          {
            "title": "Q17: [ADV] React 19 — error overlay / use hook errors",
            "explain": "Task:\nuse() promise reject → nearest Suspense/boundary; dev overlay separate.\n\nIn simple words:\nReact 19: data errors integrate with Suspense boundary.\nClass boundary still for render errors.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function React19Note() {\n  return (\n    <p>\n      React 19: render errors + use() rejections — understand boundary/Suspense\n      stack; class boundary still for render errors.\n    </p>\n  );\n}"
          },
          {
            "title": "Q18: [ADV] react-error-boundary — resetKeys prop",
            "explain": "Task:\nresetKeys={[userId]} change → auto reset error state.\n\nIn simple words:\nInstead of manual key++, library prop — same remount idea.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function ResetKeysNote() {\n  return (\n    <p>\n      react-error-boundary: resetKeys prop retries boundary — automated key\n      pattern.\n    </p>\n  );\n}"
          },
          {
            "title": "Q19: [ADV] try/catch in render — doesn't work",
            "explain": "Task:\nfunction App() { try { return Child } catch — ❌ child throw not caught.\n\nIn simple words:\nRender isn't async; child throw bypasses parent try — need ErrorBoundary.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function TryCatchLimit() {\n  return (\n    <p>\n      Parent try/catch won't catch child render throw — use ErrorBoundary.\n    </p>\n  );\n}"
          },
          {
            "title": "Q20: [ADV] ErrorBoundary outside, Suspense inside order",
            "explain": "Task:\nErrorBoundary wraps Suspense wraps Lazy — lazy fail + render fail both.\n\nIn simple words:\nSuspense = loading; Boundary = error — outer boundary recommended.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function StackOrderNote() {\n  return (\n    <p>\n      Pattern: ErrorBoundary → Suspense → LazyComponent. Import fail caught by\n      boundary.\n    </p>\n  );\n}"
          },
          {
            "title": "Q21: [ADV] Logging — PII scrub before send",
            "explain": "Task:\ndidCatch error.message safe; don't send raw user input in stack.\n\nIn simple words:\nProduction logging GDPR/security — sanitize payload.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "class SafeLogBoundary extends Component {\n  state = { hasError: false };\n  static getDerivedStateFromError() {\n    return { hasError: true };\n  }\n  componentDidCatch(error, info) {\n    const safe = {\n      message: error.message?.slice(0, 200),\n      stack: info.componentStack,\n    };\n    console.log(\"safe report\", safe);\n  }\n  render() {\n    if (this.state.hasError) return <p>Sorry, error reported.</p>;\n    return this.props.children;\n  }\n}"
          },
          {
            "title": "Q22: [ADV] Interview matrix — what catches what",
            "explain": "Task:\nRender/lifecycle ✅ | Events ❌ | Async ❌ | Boundary self ❌ | SSR ⚠️\n\nIn simple words:\nRemember this table — fast interview answer.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function CatchMatrix() {\n  return (\n    <table>\n      <tbody>\n        <tr><td>Render throw</td><td>✅ Boundary</td></tr>\n        <tr><td>onClick throw</td><td>❌ try/catch</td></tr>\n        <tr><td>fetch().then throw</td><td>❌ error state</td></tr>\n        <tr><td>Boundary render throw</td><td>❌ parent boundary</td></tr>\n      </tbody>\n    </table>\n  );\n}"
          }
        ]
      },
      {
        "file": "21_SuspenseAndLazy.jsx",
        "title": "21 — Suspense And Lazy",
        "kya": "lazy() = download component code later (code split) — like not",
        "detail": "21 — Suspense And Lazy\nLevel: MID  |  Sequence: do this first, then the next file in sequence\n\nSIMPLE: lazy() = download component code later (code split) — like not\nmaking a heavy dessert until the guest orders. Suspense = waiting room\nUI (fallback) while that code/data is not ready yet.\n\nconst Page = lazy(() => import(\"./Page\"));\n<Suspense fallback={<Spinner/>}><Page/></Suspense>\n\nWHY: Smaller initial bundle; faster first paint. Common on routes.\nINTERVIEW: code splitting; Suspense boundaries; pair with error boundary.\nVite/React 19 project — teaching file. (React 19 data Suspense is a separate depth)",
        "intro": "21 — Suspense And Lazy\nLevel: MID  |  Sequence: do this first, then the next file in sequence\n\nSIMPLE: lazy() = download component code later (code split) — like not\nmaking a heavy dessert until the guest orders. Suspense = waiting room\nUI (fallback) while that code/data is not ready yet.\n\nconst Page = lazy(() => import(\"./Page\"));\n<Suspense fallback={<Spinner/>}><Page/></Suspense>\n\nWHY: Smaller initial bundle; faster first paint. Common on routes.\nINTERVIEW: code splitting; Suspense boundaries; pair with error boundary.\nVite/React 19 project — teaching file. (React 19 data Suspense is a separate depth)",
        "questions": [
          {
            "title": "Q1: React.lazy basic",
            "explain": "Task:\nlazy(() => import(\"./HeavyChart\"))\n\nIn simple words:\nDynamic import → separate chunk. Loads on first visit.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const HeavyChart = lazy(() => import(\"./HeavyChart\")); // path example\n\nfunction Dashboard() {\n  return (\n    <Suspense fallback={<p>Loading chart...</p>}>\n      <HeavyChart />\n    </Suspense>\n  );\n}"
          },
          {
            "title": "Q2: Route-level split sketch",
            "explain": "Task:\nLazy-load each page — wrap Router with Suspense.\n\nIn simple words:\nBiggest win: users load rarely-visited pages later.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const Settings = lazy(() => import(\"./Settings\"));\nconst Profile = lazy(() => import(\"./Profile\"));\n\nfunction RoutesSketch({ page }) {\n  return (\n    <Suspense fallback={<p>Loading page...</p>}>\n      {page === \"settings\" ? <Settings /> : <Profile />}\n    </Suspense>\n  );\n}"
          },
          {
            "title": "Q3: Nested Suspense",
            "explain": "Task:\nPage shell right away; inner widgets get their own fallback.\n\nIn simple words:\nGranular spinners beat one big blank screen.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const WidgetA = lazy(() => import(\"./WidgetA\"));\nconst WidgetB = lazy(() => import(\"./WidgetB\"));\n\nfunction Home() {\n  return (\n    <div>\n      <h1>Home</h1>\n      <Suspense fallback={<p>A...</p>}>\n        <WidgetA />\n      </Suspense>\n      <Suspense fallback={<p>B...</p>}>\n        <WidgetB />\n      </Suspense>\n    </div>\n  );\n}"
          },
          {
            "title": "Q4: Conditional lazy mount",
            "explain": "Task:\nLoad heavy panel only when tab opens.\n\nIn simple words:\nMount triggers import. Keep it unmounted when not needed.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Tabs() {\n  const [open, setOpen] = useState(false);\n  return (\n    <div>\n      <button onClick={() => setOpen(true)}>Open editor</button>\n      {open && (\n        <Suspense fallback={<p>Loading editor...</p>}>\n          <HeavyChart />\n        </Suspense>\n      )}\n    </div>\n  );\n}"
          },
          {
            "title": "Q5: [MID] Error boundary + Suspense",
            "explain": "Task:\nLazy import fail / render error — put boundary outside.\n\nIn simple words:\nSuspense = wait. ErrorBoundary = fail. Stack both.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "// <ErrorBoundary>\n//   <Suspense fallback={<Spinner />}>\n//     <LazyPage />\n//   </Suspense>\n// </ErrorBoundary>"
          },
          {
            "title": "Q6: Named export lazy",
            "explain": "Task:\nlazy(() => import(\"./mod\").then(m => ({ default: m.Chart })))\n\nIn simple words:\nlazy expects default export. Named → remap.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const Chart = lazy(() =>\n  import(\"./charts\").then((m) => ({ default: m.Chart }))\n);"
          },
          {
            "title": "Q7: [MID] Prefetch on hover (pattern)",
            "explain": "Task:\nOn link hover: import(\"./Page\") — warm the cache.\n\nIn simple words:\nSnappy UX. Router libs often built this in.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function PrefetchLink() {\n  function warm() {\n    import(\"./Settings\");\n  }\n  return (\n    <a href=\"/settings\" onMouseEnter={warm}>\n      Settings\n    </a>\n  );\n}"
          },
          {
            "title": "Q8: Fallback design tip",
            "explain": "Task:\nReduce layout shift in fallback — skeleton same size.\n\nIn simple words:\nAvoid CLS. Centered spinner OK on small widgets.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function SkeletonFallback() {\n  return <div className=\"skeleton h-40\" aria-busy=\"true\" />;\n}"
          },
          {
            "title": "Q9: lazy only for default export — named remap",
            "explain": "Task:\n.then(m => ({ default: m.Named })) — Q6 recap practice.\n\nIn simple words:\nDynamic import expects default; wrap named exports.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const NamedPanel = lazy(() =>\n  import(\"./panels\").then((m) => ({ default: m.SettingsPanel }))\n);"
          },
          {
            "title": "Q10: [MID] Do not put Suspense boundary on every list item",
            "explain": "Task:\nOne Suspense wraps the whole list; lazy items inside — one fallback.\n\nIn simple words:\nSuspense per row = spinner spam; think about boundary level.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function LazyList({ ids }) {\n  return (\n    <Suspense fallback={<p>Loading items...</p>}>\n      <ul>\n        {ids.map((id) => (\n          <LazyRow key={id} id={id} />\n        ))}\n      </ul>\n    </Suspense>\n  );\n}\nconst LazyRow = lazy(() => import(\"./LazyRow\"));"
          },
          {
            "title": "Q11: startTransition + lazy route feel",
            "explain": "Task:\nUrgent tab click; route/lazy load in transition — UI stays responsive.\n\nIn simple words:\nHeavy lazy mount is non-urgent — typing/input should not block.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function TransitionLazy({ showHeavy }) {\n  return (\n    <Suspense fallback={<p>Loading...</p>}>\n      {showHeavy ? <HeavyChart /> : <p>Light view</p>}\n    </Suspense>\n  );\n}"
          },
          {
            "title": "Q12: [MID] use() hook — read promise (React 19 data Suspense)",
            "explain": "Task:\nfunction Child({ dataPromise }) { const data = use(dataPromise); }\n\nIn simple words:\nPromise throw/suspend → nearest Suspense fallback. RSC/CSR contrast.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function DataChild({ userPromise }) {\n  const user = use(userPromise);\n  return <p>{user.name}</p>;\n}\nfunction DataSuspenseDemo({ promise }) {\n  return (\n    <Suspense fallback={<p>Loading user...</p>}>\n      <DataChild userPromise={promise} />\n    </Suspense>\n  );\n}"
          },
          {
            "title": "Q13: RSC vs client lazy contrast",
            "explain": "Task:\nServer Component = zero client bundle; lazy = client chunk split.\n\nIn simple words:\nRSC data on server; lazy code-splitting on client — different problems.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function RSCContrast() {\n  return (\n    <p>\n      RSC: server render + stream. lazy+Suspense: client JS chunk download.\n      Both show \"wait\" UI but the mechanism is different.\n    </p>\n  );\n}"
          },
          {
            "title": "Q14: [MID] Suspense boundary placement — route vs widget",
            "explain": "Task:\nRoute level: one big fallback; widget level: small skeletons.\n\nIn simple words:\nWhat the user sees while waiting — granularity drives UX.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function PlacementDemo() {\n  return (\n    <Suspense fallback={<div className=\"page-skeleton\" />}>\n      <Home />\n    </Suspense>\n  );\n}"
          },
          {
            "title": "Q15: Preload — import() before component mount",
            "explain": "Task:\nRoute config loader: () => import(\"./Page\") — hover/route intent.\n\nIn simple words:\nLazy first render is slow; preload shortens Suspense time.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const PreloadedPage = lazy(() => import(\"./PreloadedPage\"));\nfunction PreloadOnIntent() {\n  function intent() {\n    import(\"./PreloadedPage\");\n  }\n  return (\n    <button onMouseEnter={intent} onFocus={intent}>\n      Go (preloaded on hover)\n    </button>\n  );\n}"
          },
          {
            "title": "Q16: [MID] Error vs Suspense — different states",
            "explain": "Task:\nSuspense = pending; ErrorBoundary = rejected/render throw.\n\nIn simple words:\nStack both; do not mix them confused in one component.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function ErrorSuspenseStack() {\n  return (\n    // <ErrorBoundary fallback={<Err />}>\n    //   <Suspense fallback={<Spin />}>\n    //     <LazyOrUseData />\n    //   </Suspense>\n    // </ErrorBoundary>\n    <p>Boundary outside, Suspense inside — loading vs error are separate UI.</p>\n  );\n}"
          },
          {
            "title": "Q17: [ADV] Suspense for data fetching (CSR) limitations",
            "explain": "Task:\nNot every fetch is Suspense-friendly — need cache/resource layer.\n\nIn simple words:\nTanStack Query suspense mode or custom resource — throw promise pattern.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function DataSuspenseLimit() {\n  return (\n    <p>\n      Raw fetch in useEffect ≠ Suspense. Suspense works when resource cache throws\n      the promise.\n    </p>\n  );\n}"
          },
          {
            "title": "Q18: [ADV] React Query suspense mode contrast",
            "explain": "Task:\nuseQuery({ suspense: true }) — library handles boundary; Suspense fallback.\n\nIn simple words:\nManual use() vs RQ — same mental model, less boilerplate from the lib.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function RQContrast() {\n  return (\n    <p>\n      React Query suspense: query pending suspends. Cache/retry handled by the lib.\n    </p>\n  );\n}"
          },
          {
            "title": "Q19: [ADV] Streaming SSR + Suspense",
            "explain": "Task:\nServer HTML shows fallback first; ready chunk streams in to replace.\n\nIn simple words:\nClient lazy is different; SSR Suspense streams HTML — faster TTFB feel.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function StreamingNote() {\n  return <p>SSR Suspense: shell first, slow data streams later.</p>;\n}"
          },
          {
            "title": "Q20: [ADV] lazy().then wrap + memo combo",
            "explain": "Task:\nconst C = lazy(...); export default memo(C) — stable lazy child on re-render.\n\nIn simple words:\nCode split + perf — lazy load once, memo on frequent parent renders.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const MemoLazy = lazy(() =>\n  import(\"./Heavy\").then((m) => ({ default: m.default }))\n);"
          },
          {
            "title": "Q21: [ADV] When not to use lazy",
            "explain": "Task:\nCritical above-fold, tiny components, always-needed shell — eager import.\n\nIn simple words:\nOver-splitting = extra requests + Suspense flash. Profile bundle first.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function WhenNotLazy() {\n  return (\n    <ul>\n      <li>Above-fold hero — eager</li>\n      <li>Tiny icon — eager</li>\n      <li>Rare admin page — lazy ✅</li>\n    </ul>\n  );\n}"
          },
          {
            "title": "Q22: [ADV] Interview — Suspense + lazy + use() in one answer",
            "explain": "Task:\nCode split (lazy), wait UI (Suspense), data (use), errors (Boundary).\n\nIn simple words:\nExplain three layers — strong mid-level interview close.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function SuspenseInterview() {\n  return (\n    <ol>\n      <li>lazy() — dynamic import, separate chunk</li>\n      <li>Suspense — fallback on suspend</li>\n      <li>use(promise) — data suspense React 19</li>\n      <li>ErrorBoundary — separate fail case</li>\n    </ol>\n  );\n}"
          }
        ]
      },
      {
        "file": "22_RoutingBasics.jsx",
        "title": "22 — Routing Basics",
        "kya": "In an SPA, change the URL without a full reload — React Router (or similar).",
        "detail": "22 — Routing Basics\nLevel: MID  |  Sequence: do this first, then the next file in sequence\n\nSIMPLE: In an SPA, change the URL without a full reload — React Router (or similar).\nBrowserRouter, Routes, Route, Link, useParams, useNavigate, Outlet.\nLike mall directories — different floors, same building (one HTML).\n\nNested routes = shared layout. Navigate programmatically (after login).\n\nWHY: Multi-page feel in apps. Interview expects routing basics.\nINTERVIEW: Link vs a; nested routes; params; protected route idea.\nVite/React 19 project — teaching file (react-router v6 style API).",
        "intro": "22 — Routing Basics\nLevel: MID  |  Sequence: do this first, then the next file in sequence\n\nSIMPLE: In an SPA, change the URL without a full reload — React Router (or similar).\nBrowserRouter, Routes, Route, Link, useParams, useNavigate, Outlet.\nLike mall directories — different floors, same building (one HTML).\n\nNested routes = shared layout. Navigate programmatically (after login).\n\nWHY: Multi-page feel in apps. Interview expects routing basics.\nINTERVIEW: Link vs a; nested routes; params; protected route idea.\nVite/React 19 project — teaching file (react-router v6 style API).",
        "questions": [
          {
            "title": "Q1: Basic Routes + Link",
            "explain": "Task:\n/ and /about — navigate with Link (no full reload).\n\nIn simple words:\n<a href> reloads. <Link to> is client-side routing.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Home() {\n  return <h1>Home</h1>;\n}\nfunction About() {\n  return <h1>About</h1>;\n}\n\nfunction AppRoutes() {\n  return (\n    <BrowserRouter>\n      <nav>\n        <Link to=\"/\">Home</Link>\n        <Link to=\"/about\">About</Link>\n      </nav>\n      <Routes>\n        <Route path=\"/\" element={<Home />} />\n        <Route path=\"/about\" element={<About />} />\n      </Routes>\n    </BrowserRouter>\n  );\n}"
          },
          {
            "title": "Q2: useParams — /users/:id",
            "explain": "Task:\nconst { id } = useParams()\n\nIn simple words:\nRead dynamic segment from the URL.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function UserPage() {\n  const { id } = useParams();\n  return <h2>User {id}</h2>;\n}\n// <Route path=\"/users/:id\" element={<UserPage />} />"
          },
          {
            "title": "Q3: useNavigate programmatic",
            "explain": "Task:\nlogin success → navigate(\"/dashboard\")\n\nIn simple words:\nChange route from button/handler. replace option keeps history clean.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Login() {\n  const navigate = useNavigate();\n  function onOk() {\n    navigate(\"/dashboard\", { replace: true });\n  }\n  return <button onClick={onOk}>Login</button>;\n}"
          },
          {
            "title": "Q4: Nested layout + Outlet",
            "explain": "Task:\nParent layout Route; child routes; <Outlet /> where content goes.\n\nIn simple words:\nShared nav/sidebar. Children plug into outlet.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function AdminLayout() {\n  return (\n    <div>\n      <aside>Admin nav</aside>\n      <Outlet />\n    </div>\n  );\n}\n// <Route path=\"/admin\" element={<AdminLayout />}>\n//   <Route path=\"users\" element={<Users />} />\n// </Route>"
          },
          {
            "title": "Q5: [MID] Protected route idea",
            "explain": "Task:\nIf !user → <Navigate to=\"/login\" />\n\nIn simple words:\nWrapper component checks auth. Real apps use loader/token.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function PrivateRoute({ user, children }) {\n  if (!user) return <Navigate to=\"/login\" replace />;\n  return children;\n}"
          },
          {
            "title": "Q6: useSearchParams query string",
            "explain": "Task:\nRead/write ?q=react.\n\nIn simple words:\nFilters in URL — shareable and back-button friendly.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function SearchPage() {\n  const [params, setParams] = useSearchParams();\n  const q = params.get(\"q\") ?? \"\";\n  return (\n    <input\n      value={q}\n      onChange={(e) => setParams({ q: e.target.value })}\n    />\n  );\n}"
          },
          {
            "title": "Q7: [MID] 404 Not Found route",
            "explain": "Task:\npath=\"*\" element={<NotFound />}\n\nIn simple words:\nCatch-all last. Handles unknown URLs.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function NotFound() {\n  return <h1>404</h1>;\n}\n// <Route path=\"*\" element={<NotFound />} />"
          },
          {
            "title": "Q8: Index route",
            "explain": "Task:\nDefault child on parent path — <Route index element={...} />\n\nIn simple words:\n/parent exact shows default panel.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "// <Route path=\"/shop\" element={<ShopLayout />}>\n//   <Route index element={<Featured />} />\n//   <Route path=\"cart\" element={<Cart />} />\n// </Route>"
          },
          {
            "title": "Q9: NavLink — active class automatic",
            "explain": "Task:\nNavLink to=\"/about\" className={({ isActive }) => isActive ? \"on\" : \"\"}\n\nIn simple words:\nLink only navigates; NavLink highlights current route.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Nav() {\n  return (\n    <nav>\n      <NavLink to=\"/\" end>\n        Home\n      </NavLink>\n      <NavLink\n        to=\"/about\"\n        className={({ isActive }) => (isActive ? \"nav-active\" : \"\")}\n      >\n        About\n      </NavLink>\n    </nav>\n  );\n}"
          },
          {
            "title": "Q10: [MID] Relative paths in nested routes",
            "explain": "Task:\nParent /admin; child path=\"users\" → /admin/users (no leading /).\n\nIn simple words:\nNested Route paths are relative — URL composes from parent.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function RelativeNestedNote() {\n  return (\n    <p>\n      Nested child path=\"settings\" under /app → /app/settings. Absolute path /\n      starts from root.\n    </p>\n  );\n}"
          },
          {
            "title": "Q11: useLocation — pathname + state read",
            "explain": "Task:\nconst loc = useLocation(); loc.pathname, loc.state from navigate.\n\nIn simple words:\nURL + hidden state (flash message) — shareable vs private data.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function FlashBanner() {\n  const loc = useLocation();\n  const msg = loc.state?.flash;\n  return msg ? <p className=\"flash\">{msg}</p> : null;\n}"
          },
          {
            "title": "Q12: [MID] navigate with state pass",
            "explain": "Task:\nnavigate(\"/done\", { state: { from: \"checkout\" } })\n\nIn simple words:\nQuery string is public; state object in history — may be lost on refresh.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function GoDone() {\n  const navigate = useNavigate();\n  return (\n    <button\n      onClick={() =>\n        navigate(\"/done\", { state: { flash: \"Order placed!\" } })\n      }\n    >\n      Finish\n    </button>\n  );\n}"
          },
          {
            "title": "Q13: Route loader sketch (data before render idea)",
            "explain": "Task:\nv6.4+ loader async — component gets data ready.\n\nIn simple words:\nLess useEffect fetch; router loader helps avoid waterfall.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function LoaderSketchNote() {\n  return (\n    <p>\n      Route loader: data fetch on route match — before component render. Advanced\n      depth in file 44.\n    </p>\n  );\n}"
          },
          {
            "title": "Q14: [MID] Outlet context — parent data to child",
            "explain": "Task:\nOutlet context={{ user }} — child useOutletContext().\n\nIn simple words:\nLayout shared data without prop drilling — for nested routes.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function LayoutWithContext() {\n  const user = { name: \"Jay\" };\n  return (\n    <div>\n      <header>Hi {user.name}</header>\n      <Outlet context={{ user }} />\n    </div>\n  );\n}"
          },
          {
            "title": "Q15: Index route vs path=\"\"",
            "explain": "Task:\nindex element on parent exact URL; path=\"\" similar v6 semantics.\n\nIn simple words:\n/shop → Featured (index); /shop/cart → Cart. Default child is clear.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function IndexVsEmptyNote() {\n  return <p>Index route = default child on parent URL without extra segment.</p>;\n}"
          },
          {
            "title": "Q16: [MID] Protected route — Outlet wrapper pattern",
            "explain": "Task:\nProtectedLayout checks auth; inside Outlet or Navigate to login.\n\nIn simple words:\nProtect all child routes at once — DRY auth guard.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function ProtectedLayout({ user }) {\n  if (!user) return <Navigate to=\"/login\" replace />;\n  return <Outlet />;\n}\n// <Route element={<ProtectedLayout user={user} />}>\n//   <Route path=\"/dashboard\" element={<Dash />} />\n// </Route>"
          },
          {
            "title": "Q17: Link replace — history stack clean",
            "explain": "Task:\nLogin success Link replace to dashboard — back button should not return to login.\n\nIn simple words:\nreplace={true} same as navigate replace option.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function ReplaceLink() {\n  return (\n    <Link to=\"/home\" replace>\n      Go home (no back to here)\n    </Link>\n  );\n}"
          },
          {
            "title": "Q18: [ADV] BrowserRouter vs HashRouter",
            "explain": "Task:\nBrowserRouter = clean URLs (/about); HashRouter = #/about on static host.\n\nIn simple words:\nServer config vs GitHub Pages — deployment decides.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function RouterModeNote() {\n  return (\n    <p>\n      BrowserRouter: server fallback to index.html needed. HashRouter: hash routing,\n      easier server config.\n    </p>\n  );\n}"
          },
          {
            "title": "Q19: [ADV] Splat / catch-all segment",
            "explain": "Task:\npath=\"/docs/*\" — match rest of path; useParams for * part.\n\nIn simple words:\nNested docs/files at dynamic depth — splat is flexible.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function DocsCatchAll() {\n  const params = useParams();\n  return <p>Docs path: {params[\"*\"]}</p>;\n}\n// <Route path=\"/docs/*\" element={<DocsCatchAll />} />"
          },
          {
            "title": "Q20: [ADV] Scroll restoration basic",
            "explain": "Task:\nOn route change: window.scrollTo(0,0) or ScrollRestoration component.\n\nIn simple words:\nIn SPA browser does not auto scroll to top — handle it yourself.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function ScrollTopOnNav() {\n  const { pathname } = useLocation();\n  useEffect(() => {\n    window.scrollTo(0, 0);\n  }, [pathname]);\n  return null;\n}"
          },
          {
            "title": "Q21: [ADV] Relative Link \"../\" in nested routes",
            "explain": "Task:\nFrom /admin/users/5/edit, Link to=\"..\" → /admin/users/5\n\nIn simple words:\nRelative navigation — do not write URL manually, router resolves relative paths.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function BackToList() {\n  return <Link to=\"..\">Back to list</Link>;\n}"
          },
          {
            "title": "Q22: [ADV] Interview — nested routes mental model",
            "explain": "Task:\nLayout Route + Outlet + child paths + index + 404 last.\n\nIn simple words:\nExplain with one diagram: URL tree = Route tree, Outlet = child slot.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function RoutingInterview() {\n  return (\n    <ol>\n      <li>BrowserRouter — history API</li>\n      <li>Routes/Route — path → element</li>\n      <li>Nested: layout + Outlet + relative paths</li>\n      <li>Params, search, navigate, NavLink active</li>\n      <li>Protected wrapper + 404 path=\"*\"</li>\n    </ol>\n  );\n}"
          }
        ]
      },
      {
        "file": "23_DataFetchingPatterns.jsx",
        "title": "23 — Data Fetching Patterns",
        "kya": "Fetch data from server — loading, success, error are three states.",
        "detail": "23 — Data Fetching Patterns\nLevel: MID  |  Sequence: do this first, then the next file in sequence\n\nSIMPLE: Fetch data from server — loading, success, error are three states.\nPattern 1: useEffect + fetch + useState (classic).\nPattern 2: custom useFetch. Pattern 3: libs (React Query/SWR) — cache, retry.\nRace, cleanup, stale — covered earlier (09). Here we tie UI patterns together.\n\nWHY: Every real app fetches. Interviews ask about race + loading UI.\nINTERVIEW: where to fetch; caching; waterfalls; parallel requests.\nVite/React 19 project — teaching file.",
        "intro": "23 — Data Fetching Patterns\nLevel: MID  |  Sequence: do this first, then the next file in sequence\n\nSIMPLE: Fetch data from server — loading, success, error are three states.\nPattern 1: useEffect + fetch + useState (classic).\nPattern 2: custom useFetch. Pattern 3: libs (React Query/SWR) — cache, retry.\nRace, cleanup, stale — covered earlier (09). Here we tie UI patterns together.\n\nWHY: Every real app fetches. Interviews ask about race + loading UI.\nINTERVIEW: where to fetch; caching; waterfalls; parallel requests.\nVite/React 19 project — teaching file.",
        "questions": [
          {
            "title": "Q1: Classic status triad",
            "explain": "Task:\nidle/loading/success/error UI.\n\nIn simple words:\nOne status string or flags — give user feedback.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function UsersClassic() {\n  const [status, setStatus] = useState(\"idle\");\n  const [data, setData] = useState(null);\n  const [error, setError] = useState(null);\n\n  async function load() {\n    setStatus(\"loading\");\n    setError(null);\n    try {\n      const res = await fetch(\"/api/users\");\n      if (!res.ok) throw new Error(\"HTTP \" + res.status);\n      const json = await res.json();\n      setData(json);\n      setStatus(\"success\");\n    } catch (e) {\n      setError(String(e));\n      setStatus(\"error\");\n    }\n  }\n\n  useEffect(() => {\n    load();\n  }, []);\n\n  if (status === \"loading\") return <p>Loading...</p>;\n  if (status === \"error\") return <p>{error}</p>;\n  return <pre>{JSON.stringify(data)}</pre>;\n}"
          },
          {
            "title": "Q2: Parallel fetches",
            "explain": "Task:\nPromise.all([fetchA, fetchB])\n\nIn simple words:\nDo not waterfall when independent. Parallel = faster.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Parallel() {\n  const [bundle, setBundle] = useState(null);\n  useEffect(() => {\n    Promise.all([\n      fetch(\"/api/user\").then((r) => r.json()),\n      fetch(\"/api/posts\").then((r) => r.json()),\n    ]).then(([user, posts]) => setBundle({ user, posts }));\n  }, []);\n  return <pre>{JSON.stringify(bundle)}</pre>;\n}"
          },
          {
            "title": "Q3: Dependent fetch (waterfall unavoidable)",
            "explain": "Task:\nFirst user, then posts by user.id.\n\nIn simple words:\nSometimes serial is required. Staged loading in UI is OK.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Dependent() {\n  const [posts, setPosts] = useState([]);\n  useEffect(() => {\n    let alive = true;\n    (async () => {\n      const user = await fetch(\"/api/me\").then((r) => r.json());\n      const posts = await fetch(`/api/users/${user.id}/posts`).then((r) =>\n        r.json()\n      );\n      if (alive) setPosts(posts);\n    })();\n    return () => {\n      alive = false;\n    };\n  }, []);\n  return <ul>{posts.map((p) => <li key={p.id}>{p.title}</li>)}</ul>;\n}"
          },
          {
            "title": "Q4: AbortController cancel",
            "explain": "Task:\nabort in cleanup — on unmount / dep change.\n\nIn simple words:\nReduces race conditions and wasted network.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function AbortFetch({ id }) {\n  const [data, setData] = useState(null);\n  useEffect(() => {\n    const ac = new AbortController();\n    fetch(`/api/items/${id}`, { signal: ac.signal })\n      .then((r) => r.json())\n      .then(setData)\n      .catch((e) => {\n        if (e.name !== \"AbortError\") console.error(e);\n      });\n    return () => ac.abort();\n  }, [id]);\n  return <pre>{JSON.stringify(data)}</pre>;\n}"
          },
          {
            "title": "Q5: [MID] Stale-while-revalidate sketch",
            "explain": "Task:\nShow old data, refresh in background, then update.\n\nIn simple words:\nSWR/RQ idea. Snappy UX. Cache key.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const cache = new Map();\nfunction useSWRLite(key, fetcher) {\n  const [data, setData] = useState(() => cache.get(key));\n  useEffect(() => {\n    let alive = true;\n    fetcher(key).then((fresh) => {\n      cache.set(key, fresh);\n      if (alive) setData(fresh);\n    });\n    return () => {\n      alive = false;\n    };\n  }, [key, fetcher]);\n  return data;\n}"
          },
          {
            "title": "Q6: Optimistic UI sketch",
            "explain": "Task:\nLike button — UI +1 first, rollback on fail.\n\nIn simple words:\nFast feel. Error handling is required.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Like({ initial }) {\n  const [likes, setLikes] = useState(initial);\n  async function like() {\n    const prev = likes;\n    setLikes(prev + 1);\n    try {\n      await fetch(\"/api/like\", { method: \"POST\" });\n    } catch {\n      setLikes(prev);\n    }\n  }\n  return <button onClick={like}>{likes} ♥</button>;\n}"
          },
          {
            "title": "Q7: [MID] Don't fetch in render",
            "explain": "Task:\nDo not fetch() in component body — infinite / duplicate.\n\nIn simple words:\nEffect, event, loader, or lib. Render stays pure.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Bad() {\n  // fetch(\"/api\"); // ❌ render phase\n  return null;\n}"
          },
          {
            "title": "Q8: Loading skeletons vs spinner",
            "explain": "Task:\nReserve list shape — skeleton.\n\nIn simple words:\nBetter perceived performance. Less layout shift.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function UserList({ loading, users }) {\n  if (loading) {\n    return (\n      <div>\n        <div className=\"skeleton\" />\n        <div className=\"skeleton\" />\n      </div>\n    );\n  }\n  return (\n    <ul>\n      {users.map((u) => (\n        <li key={u.id}>{u.name}</li>\n      ))}\n    </ul>\n  );\n}"
          },
          {
            "title": "Q9: Fetch on button — user-triggered load",
            "explain": "Task:\nNot auto on mount; load() on button click — intentional fetch.\n\nIn simple words:\nLike search/submit — event driven instead of empty-deps effect.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function FetchOnClick() {\n  const [data, setData] = useState(null);\n  const [loading, setLoading] = useState(false);\n  async function load() {\n    setLoading(true);\n    const json = await fetch(\"/api/items\").then((r) => r.json());\n    setData(json);\n    setLoading(false);\n  }\n  return (\n    <div>\n      <button onClick={load} disabled={loading}>\n        {loading ? \"...\" : \"Load\"}\n      </button>\n      <pre>{JSON.stringify(data)}</pre>\n    </div>\n  );\n}"
          },
          {
            "title": "Q10: [MID] Race condition — ignore stale response",
            "explain": "Task:\nid changes fast — do not setState if first slow response arrives late.\n\nIn simple words:\nRequest id / ignore flag — do not show stale data on screen.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function RaceSafe({ id }) {\n  const [item, setItem] = useState(null);\n  useEffect(() => {\n    let ignore = false;\n    fetch(`/api/items/${id}`)\n      .then((r) => r.json())\n      .then((data) => {\n        if (!ignore) setItem(data);\n      });\n    return () => {\n      ignore = true;\n    };\n  }, [id]);\n  return <pre>{JSON.stringify(item)}</pre>;\n}"
          },
          {
            "title": "Q11: Dedupe — same key concurrent request only once",
            "explain": "Task:\ninflight Map — two components same fetch share one promise.\n\nIn simple words:\nDouble mount / StrictMode — less network waste.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const inflight = new Map();\nfunction fetchDeduped(url) {\n  if (inflight.has(url)) return inflight.get(url);\n  const p = fetch(url)\n    .then((r) => r.json())\n    .finally(() => inflight.delete(url));\n  inflight.set(url, p);\n  return p;\n}"
          },
          {
            "title": "Q12: [MID] React Query contrast — cache + staleTime",
            "explain": "Task:\nuseQuery caches by key; refetch on window focus by default.\n\nIn simple words:\nManual useState+effect vs lib — explain tradeoffs in interview.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function RQContrastNote() {\n  return (\n    <p>\n      React Query: queryKey cache, staleTime, retry, dedupe built-in. Manual =\n      build it all yourself.\n    </p>\n  );\n}"
          },
          {
            "title": "Q13: Cache invalidation sketch",
            "explain": "Task:\nAfter POST success: cache.delete(key) or queryClient.invalidate.\n\nIn simple words:\nAfter mutate, do not show old data — trigger refresh.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function invalidate(key) {\n  cache.delete(key);\n}"
          },
          {
            "title": "Q14: [MID] Suspense fetch — use() + resource pattern",
            "explain": "Task:\nPending promise in cache; component use(resource.read()) suspends.\n\nIn simple words:\nReact 19 data Suspense — throw promise while pending (lib or custom).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function createResource(promise) {\n  let status = \"pending\";\n  let result;\n  const suspender = promise.then(\n    (r) => {\n      status = \"success\";\n      result = r;\n    },\n    (e) => {\n      status = \"error\";\n      result = e;\n    }\n  );\n  return {\n    read() {\n      if (status === \"pending\") throw suspender;\n      if (status === \"error\") throw result;\n      return result;\n    },\n  };\n}"
          },
          {
            "title": "Q15: Polling — setInterval + cleanup",
            "explain": "Task:\ninterval in useEffect; return clearInterval — safe on unmount.\n\nIn simple words:\nLive dashboard — stop polling when component is gone.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function PollStatus() {\n  const [status, setStatus] = useState(\"...\");\n  useEffect(() => {\n    const id = setInterval(() => {\n      fetch(\"/api/status\")\n        .then((r) => r.json())\n        .then((d) => setStatus(d.text));\n    }, 5000);\n    return () => clearInterval(id);\n  }, []);\n  return <p>{status}</p>;\n}"
          },
          {
            "title": "Q16: [MID] Retry with backoff sketch",
            "explain": "Task:\nOn fail: wait 1s, 2s, 4s — max 3 tries then error UI.\n\nIn simple words:\nFlaky network — do not give up immediately for the user.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "async function fetchWithRetry(url, tries = 3) {\n  for (let i = 0; i < tries; i++) {\n    try {\n      const res = await fetch(url);\n      if (!res.ok) throw new Error(String(res.status));\n      return res.json();\n    } catch (e) {\n      if (i === tries - 1) throw e;\n      await new Promise((r) => setTimeout(r, 1000 * 2 ** i));\n    }\n  }\n}"
          },
          {
            "title": "Q17: [ADV] Waterfall vs parallel — explain with diagram",
            "explain": "Task:\nSerial: A→B→C time sum. Parallel: max(A,B,C).\n\nIn simple words:\nIndependent calls: Promise.all; dependent: unavoidable serial.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function WaterfallNote() {\n  return (\n    <p>\n      Waterfall: user wait then posts wait. Parallel: both at once — when\n      independent.\n    </p>\n  );\n}"
          },
          {
            "title": "Q18: [ADV] SWR revalidate on focus",
            "explain": "Task:\nTab back → background refetch; keep showing old data.\n\nIn simple words:\nstale-while-revalidate UX — SWR/RQ default behavior idea.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function SWRFocusNote() {\n  return (\n    <p>\n      SWR: show cache, revalidate on window focus — fresh data without blank\n      screen.\n    </p>\n  );\n}"
          },
          {
            "title": "Q19: [ADV] Server state vs UI state split",
            "explain": "Task:\nAPI data → query cache; modal open → useState local.\n\nIn simple words:\nDo not put everything in one object — server state in lib, UI state in component.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function StateSplitNote() {\n  return (\n    <p>\n      Server state (remote, cacheable) separate; UI state (tabs, inputs) local —\n      do not mix unnecessarily in one giant store.\n    </p>\n  );\n}"
          },
          {
            "title": "Q20: [ADV] Prefetch route data on hover",
            "explain": "Task:\nLink hover → queryClient.prefetchQuery or fetch to warm cache.\n\nIn simple words:\nNavigation feels instant — data ready before click.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function PrefetchDataNote() {\n  return <p>Prefetch on hover intent — data in cache by click time.</p>;\n}"
          },
          {
            "title": "Q21: [ADV] Where to fetch — effect vs event vs loader",
            "explain": "Task:\nMount data → effect/loader; user action → event; render → ❌\n\nIn simple words:\nInterview golden rule: render pure, side effects in controlled places.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function WhereFetchNote() {\n  return (\n    <ol>\n      <li>Mount/page data: useEffect or route loader</li>\n      <li>Button/search: event handler</li>\n      <li>Render body: never</li>\n    </ol>\n  );\n}"
          },
          {
            "title": "Q22: [ADV] Interview — fetch patterns in one minute",
            "explain": "Task:\nTriad UI, race cleanup, parallel, SWR mental model, RQ note, Suspense use().\n\nIn simple words:\nMid interview checklist — summary of this file.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function FetchInterview() {\n  return (\n    <ol>\n      <li>loading/success/error triad</li>\n      <li>AbortController + ignore flag (race)</li>\n      <li>Promise.all parallel; serial when dependent</li>\n      <li>SWR: stale show + background refresh</li>\n      <li>React Query: cache keys, invalidation</li>\n      <li>Suspense: use() / resource throw promise</li>\n    </ol>\n  );\n}"
          }
        ]
      },
      {
        "file": "24_ReRenderPerformance.jsx",
        "title": "24 — Re-render Performance",
        "kya": "Re-render = React runs the function again to update UI. Every",
        "detail": "24 — Re-Render Performance\nLevel: MID  |  Sequence: do this first, then the next file in sequence\n\nSIMPLE: Re-render = React runs the function again to update UI. Every\nsetState in a parent re-runs children by default — sometimes expensive.\nFix hierarchy: (1) move state down (2) split children (3) memo/callback\n(4) virtualize long lists. Profile first, optimize later.\n\nWHY: Janky typing / laggy lists. Mid interview favorite.\nINTERVIEW: why child re-renders; state colocation; React DevTools Profiler.\nVite/React 19 project — teaching file.",
        "intro": "24 — Re-Render Performance\nLevel: MID  |  Sequence: do this first, then the next file in sequence\n\nSIMPLE: Re-render = React runs the function again to update UI. Every\nsetState in a parent re-runs children by default — sometimes expensive.\nFix hierarchy: (1) move state down (2) split children (3) memo/callback\n(4) virtualize long lists. Profile first, optimize later.\n\nWHY: Janky typing / laggy lists. Mid interview favorite.\nINTERVIEW: why child re-renders; state colocation; React DevTools Profiler.\nVite/React 19 project — teaching file.",
        "questions": [
          {
            "title": "Q1: State colocation",
            "explain": "Task:\nMove input state out of App into SearchBox only.\n\nIn simple words:\nDo not re-render whole tree on typing — state where it is used.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function SearchBox() {\n  const [q, setQ] = useState(\"\");\n  return <input value={q} onChange={(e) => setQ(e.target.value)} />;\n}\n\nfunction Page() {\n  return (\n    <div>\n      <SearchBox />\n      <ExpensiveStatic />\n    </div>\n  );\n}\n\nconst ExpensiveStatic = memo(function ExpensiveStatic() {\n  console.log(\"static\");\n  return <div>Heavy but static</div>;\n});"
          },
          {
            "title": "Q2: Children as props trick",
            "explain": "Task:\nWhen parent state changes, pre-created children keep same identity.\n\nIn simple words:\n<Parent><Heavy /></Parent> — Parent re-renders, Heavy props same → with\nstructure can skip (pattern). Detail: composition.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Parent({ children }) {\n  const [n, setN] = useState(0);\n  return (\n    <div>\n      <button onClick={() => setN(n + 1)}>{n}</button>\n      {children}\n    </div>\n  );\n}\n// use: <Parent><ExpensiveStatic /></Parent>"
          },
          {
            "title": "Q3: Split context (again)",
            "explain": "Task:\nFrequently changing value in separate context — fewer wide-tree re-renders.\n\nIn simple words:\nDo not mix theme (rare) with mouse position (hot).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "// See 11_UseContext Q6 split state/dispatch"
          },
          {
            "title": "Q4: Avoid creating heavy work in render",
            "explain": "Task:\nSort/filter — useMemo when costly + frequent parent renders.\n\nIn simple words:\nFile 16. Here: remove unnecessary renders first.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function List({ items, query }) {\n  // prefer: fewer parent renders; then memoize filter if needed\n  const shown = items.filter((i) => i.includes(query));\n  return <ul>{shown.map((s) => <li key={s}>{s}</li>)}</ul>;\n}"
          },
          {
            "title": "Q5: [MID] Key that remounts too much",
            "explain": "Task:\nkey={Math.random()} — remount every time = slow + state loss.\n\nIn simple words:\nStable keys. Change key only when remount is intentional.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function BadKey({ items }) {\n  return (\n    <ul>\n      {items.map((it) => (\n        <li key={it.id}>{it.name}</li>\n      ))}\n    </ul>\n  );\n}"
          },
          {
            "title": "Q6: [MID] Windowing / virtualization note",
            "explain": "Task:\n10k rows — only viewport DOM (react-window etc).\n\nIn simple words:\nmemo does not manage 10k. Virtualize.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function VirtualNote() {\n  return <p>Long lists → windowing library, not only memo.</p>;\n}"
          },
          {
            "title": "Q7: Measure with Profiler mindset",
            "explain": "Task:\nReact DevTools Profiler — who renders, how long.\n\nIn simple words:\nDo not guess. Optimize from evidence.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Hint() {\n  return <p>Profile → find hot components → fix cause.</p>;\n}"
          },
          {
            "title": "Q8: Cheap wins checklist",
            "explain": "Task:\nColocate state; memo expensive pure; stable callbacks; fewer context updates.\n\nIn simple words:\nInterview answer structure in this order.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Checklist() {\n  return (\n    <ol>\n      <li>Colocate state</li>\n      <li>Split components</li>\n      <li>memo / useCallback where proven</li>\n      <li>Virtualize huge lists</li>\n    </ol>\n  );\n}"
          },
          {
            "title": "Q9: React DevTools — \"Highlight updates\" ON",
            "explain": "Task:\nDevTools → Components → settings → highlight re-renders.\n\nIn simple words:\nSee what flashes on typing — catch it visually, then fix.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function DevToolsHint() {\n  return <p>Highlight updates shows unnecessary re-renders.</p>;\n}"
          },
          {
            "title": "Q10: [MID] Context — every consumer re-renders when value changes",
            "explain": "Task:\nOne big context object new every render → all consumers re-render.\n\nIn simple words:\nSplit context / memo value / selector pattern — see file 11 cross-ref.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function ContextPerfNote() {\n  return (\n    <p>\n      Context value reference change = all subscribers re-render. Split state/dispatch.\n    </p>\n  );\n}"
          },
          {
            "title": "Q11: Inline object/array props — memo break",
            "explain": "Task:\nChild is memo but style={{ color: \"red\" }} is new object every render.\n\nIn simple words:\nReference equality fails — memo useless. Stable ref or useMemo style.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const MemoChild = memo(function MemoChild({ config }) {\n  console.log(\"MemoChild render\");\n  return <span>{config.label}</span>;\n});\nfunction InlinePropTrap() {\n  const [n, setN] = useState(0);\n  return (\n    <div>\n      <button onClick={() => setN(n + 1)}>{n}</button>\n      <MemoChild config={{ label: \"Hi\" }} />\n    </div>\n  );\n}"
          },
          {
            "title": "Q12: [MID] useCallback — stable handler when passing to memo child",
            "explain": "Task:\nconst onClick = useCallback(() => {}, [deps]) — pass to MemoRow.\n\nIn simple words:\nNew callback every render → memo child renders again. Prove with Profiler first.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function StableHandlerParent() {\n  const [n, setN] = useState(0);\n  const onSave = useCallback(() => console.log(\"save\"), []);\n  return (\n    <div>\n      <button onClick={() => setN(n + 1)}>{n}</button>\n      <MemoChild config={{ label: \"save\", onClick: onSave }} />\n    </div>\n  );\n}"
          },
          {
            "title": "Q13: startTransition — non-urgent update at lower priority",
            "explain": "Task:\nstartTransition(() => setFiltered(huge)) — typing stays responsive.\n\nIn simple words:\nHeavy filter/sort not urgent — transition makes it interruptible.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function TransitionFilter({ items }) {\n  const [q, setQ] = useState(\"\");\n  const [filtered, setFiltered] = useState(items);\n  const [pending, startTransition] = useTransition();\n  function onChange(e) {\n    const v = e.target.value;\n    setQ(v);\n    startTransition(() => {\n      setFiltered(items.filter((i) => i.includes(v)));\n    });\n  }\n  return (\n    <div>\n      <input value={q} onChange={onChange} />\n      {pending && <span>...</span>}\n      <ul>{filtered.map((s) => <li key={s}>{s}</li>)}</ul>\n    </div>\n  );\n}"
          },
          {
            "title": "Q14: [MID] React Compiler — future auto memo note",
            "explain": "Task:\nCompiler will infer stable props — less manual memo needed.\n\nIn simple words:\nStill: colocate state first; Compiler is bonus, not excuse for premature memo.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function CompilerNote() {\n  return (\n    <p>\n      React Compiler: auto memoization research — still measure + colocate\n      state as rule #1.\n    </p>\n  );\n}"
          },
          {
            "title": "Q15: Lifting state down — split heavy sibling",
            "explain": "Task:\nCounter state in separate component; list in parent without counter.\n\nIn simple words:\nSave list from parent re-render — move state down.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function CounterIsland() {\n  const [n, setN] = useState(0);\n  return <button onClick={() => setN(n + 1)}>{n}</button>;\n}\nfunction SplitLayout() {\n  return (\n    <div>\n      <CounterIsland />\n      <ExpensiveStatic />\n    </div>\n  );\n}"
          },
          {
            "title": "Q16: [MID] List item as separate memo component",
            "explain": "Task:\nRow memo + stable id props — only changed row renders.\n\nIn simple words:\nParent list re-renders; rows with same props → skip.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const Row = memo(function Row({ item }) {\n  return <li>{item}</li>;\n});\nfunction MemoList({ items }) {\n  return (\n    <ul>\n      {items.map((item) => (\n        <Row key={item} item={item} />\n      ))}\n    </ul>\n  );\n}"
          },
          {
            "title": "Q17: [ADV] Profiler — read commit duration",
            "explain": "Task:\nRecord interaction → see which component takes ms.\n\nIn simple words:\nEvidence-based optimize, not flamegraph guesswork.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function ProfilerNote() {\n  return <p>Profiler: slow commit → fix that component's cause (state/props).</p>;\n}"
          },
          {
            "title": "Q18: [ADV] useDeferredValue — search debounce alternative feel",
            "explain": "Task:\ndeferredQuery = useDeferredValue(query) — filter list with deferred value.\n\nIn simple words:\nInput updates immediately; heavy list slightly later — smooth typing.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function DeferredSearch({ items }) {\n  const [q, setQ] = useState(\"\");\n  const deferredQ = useDeferredValue(q);\n  const shown = useMemo(\n    () => items.filter((i) => i.includes(deferredQ)),\n    [items, deferredQ]\n  );\n  return (\n    <div>\n      <input value={q} onChange={(e) => setQ(e.target.value)} />\n      <ul>{shown.map((s) => <li key={s}>{s}</li>)}</ul>\n    </div>\n  );\n}"
          },
          {
            "title": "Q19: [ADV] Activity / Offscreen (React 19+) — hide without unmount cost",
            "explain": "Task:\nTab switch: component hidden state — no remount, defer updates.\n\nIn simple words:\nEmerging performance pattern — tabs preserve state cheaply.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function ActivityNote() {\n  return (\n    <p>\n      React 19 Activity: hidden UI at low priority — fewer re-renders in tabs.\n    </p>\n  );\n}"
          },
          {
            "title": "Q20: [ADV] Premature memo anti-pattern",
            "explain": "Task:\nmemo/useCallback on every component — complexity up, gain zero.\n\nIn simple words:\nOnly after Profiler proves it — keep default simple.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function PrematureMemoNote() {\n  return <p>Do not memo everything — colocate state first, profile, then memo.</p>;\n}"
          },
          {
            "title": "Q21: [ADV] Virtualization recap — react-window",
            "explain": "Task:\nFixed height list — render only visible rows in DOM.\n\nIn simple words:\n10k items: memo is not enough; windowing is mandatory.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function VirtualListSketch() {\n  return (\n    <p>\n      react-window: when itemCount is huge, fewer DOM nodes — scroll viewport based.\n    </p>\n  );\n}"
          },
          {
            "title": "Q22: [ADV] Interview — slow render diagnose steps",
            "explain": "Task:\nHighlight → Profiler → state location → props stable → memo last → virtualize.\n\nIn simple words:\nOrdered answer is strong in interview — do not guess.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function PerfInterview() {\n  return (\n    <ol>\n      <li>DevTools highlight + Profiler</li>\n      <li>State colocate / lift down</li>\n      <li>Context split, inline props fix</li>\n      <li>useTransition / useDeferredValue</li>\n      <li>memo/useCallback if proven</li>\n      <li>Virtualize long lists</li>\n    </ol>\n  );\n}"
          }
        ]
      },
      {
        "file": "25_ControlledVsUncontrolled.jsx",
        "title": "25 — Controlled vs Uncontrolled",
        "kya": "Controlled = React state is the steering wheel (value + onChange).",
        "detail": "25 — Controlled Vs Uncontrolled\nLevel: MID  |  Sequence: do this first, then the next file in sequence\n\nSIMPLE: Controlled = React state is the steering wheel (value + onChange).\nUncontrolled = DOM keeps its own value; you read it sometimes via ref\n(defaultValue). Like autopilot vs checking the speedometer now and then.\n\nControlled: validation, disable submit, sync fields — easy.\nUncontrolled: fewer re-renders, simple one-shot forms, file input often.\nDo not mix and confuse — value + defaultValue together = warning.\n\nWHY: Form design decision. Interview wants clear difference.\nINTERVIEW: when each; file inputs; converting between.\nVite/React 19 project — teaching file.",
        "intro": "25 — Controlled Vs Uncontrolled\nLevel: MID  |  Sequence: do this first, then the next file in sequence\n\nSIMPLE: Controlled = React state is the steering wheel (value + onChange).\nUncontrolled = DOM keeps its own value; you read it sometimes via ref\n(defaultValue). Like autopilot vs checking the speedometer now and then.\n\nControlled: validation, disable submit, sync fields — easy.\nUncontrolled: fewer re-renders, simple one-shot forms, file input often.\nDo not mix and confuse — value + defaultValue together = warning.\n\nWHY: Form design decision. Interview wants clear difference.\nINTERVIEW: when each; file inputs; converting between.\nVite/React 19 project — teaching file.",
        "questions": [
          {
            "title": "Q1: Controlled text",
            "explain": "Task:\nvalue={state} onChange setState.\n\nIn simple words:\nSource of truth is React. Every keystroke re-renders.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Controlled() {\n  const [name, setName] = useState(\"\");\n  return <input value={name} onChange={(e) => setName(e.target.value)} />;\n}"
          },
          {
            "title": "Q2: Uncontrolled text",
            "explain": "Task:\ndefaultValue + ref; on submit read ref.current.value.\n\nIn simple words:\nSource of truth is DOM. React only seeds on mount.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Uncontrolled() {\n  const ref = useRef(null);\n  function submit(e) {\n    e.preventDefault();\n    console.log(ref.current.value);\n  }\n  return (\n    <form onSubmit={submit}>\n      <input ref={ref} defaultValue=\"Ada\" />\n      <button type=\"submit\">Go</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q3: File input — usually uncontrolled",
            "explain": "Task:\n<input type=\"file\" ref={fileRef} /> — value control limited.\n\nIn simple words:\nSecurity: cannot set path. FileList via ref/onChange.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function FilePicker() {\n  const ref = useRef(null);\n  function onSubmit(e) {\n    e.preventDefault();\n    const file = ref.current.files?.[0];\n    console.log(file?.name);\n  }\n  return (\n    <form onSubmit={onSubmit}>\n      <input type=\"file\" ref={ref} />\n      <button type=\"submit\">Upload</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q4: Don't mix value and defaultValue",
            "explain": "Task:\nDo not use both on one input.\n\nIn simple words:\nReact warning. Pick one mode.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function MixedBad() {\n  // <input value={x} defaultValue=\"y\" /> // ❌\n  return null;\n}"
          },
          {
            "title": "Q5: [MID] Controlled checkbox vs uncontrolled",
            "explain": "Task:\nchecked + onChange vs defaultChecked.\n\nIn simple words:\nSame dichotomy. Form libs often use controlled.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Checks() {\n  const [on, setOn] = useState(false);\n  return (\n    <>\n      <input type=\"checkbox\" checked={on} onChange={(e) => setOn(e.target.checked)} />\n      <input type=\"checkbox\" defaultChecked />\n    </>\n  );\n}"
          },
          {
            "title": "Q6: When controlled shines",
            "explain": "Task:\nInstant search filter, char counter, sibling sync fields.\n\nIn simple words:\nUI derived from every keystroke → controlled.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function CharCount() {\n  const [t, setT] = useState(\"\");\n  return (\n    <div>\n      <textarea value={t} onChange={(e) => setT(e.target.value)} />\n      <p>{t.length}/200</p>\n    </div>\n  );\n}"
          },
          {
            "title": "Q7: [MID] Hybrid: read uncontrolled into state on submit only",
            "explain": "Task:\nForm uncontrolled while typing; on submit push to state/API.\n\nIn simple words:\nMiddle ground: performance + simplicity.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Hybrid() {\n  const [submitted, setSubmitted] = useState(\"\");\n  const ref = useRef(null);\n  return (\n    <form\n      onSubmit={(e) => {\n        e.preventDefault();\n        setSubmitted(ref.current.value);\n      }}\n    >\n      <input ref={ref} defaultValue=\"\" />\n      <button type=\"submit\">Save</button>\n      <p>Last: {submitted}</p>\n    </form>\n  );\n}"
          },
          {
            "title": "Q8: Decision cheat sheet",
            "explain": "Task:\nNeed live React logic? Controlled. One-shot / file? Uncontrolled OK.\n\nIn simple words:\nInterview closing line.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Cheat() {\n  return (\n    <p>\n      Live sync/validate → controlled. Simple/ref/file → uncontrolled.\n    </p>\n  );\n}"
          },
          {
            "title": "Q9: Controlled select — value + onChange",
            "explain": "Task:\nselect value={city} onChange — option list driven by state.\n\nIn simple words:\nDropdown is controlled too — empty string placeholder option is common.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function ControlledSelect() {\n  const [city, setCity] = useState(\"mumbai\");\n  return (\n    <select value={city} onChange={(e) => setCity(e.target.value)}>\n      <option value=\"mumbai\">Mumbai</option>\n      <option value=\"delhi\">Delhi</option>\n    </select>\n  );\n}"
          },
          {
            "title": "Q10: [MID] Uncontrolled radio group — ref or FormData",
            "explain": "Task:\nSame name radios; read value from FormData on submit.\n\nIn simple words:\nRadio group can be controlled too; uncontrolled OK for simple forms.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function RadioForm() {\n  function submit(e) {\n    e.preventDefault();\n    const fd = new FormData(e.target);\n    console.log(fd.get(\"plan\"));\n  }\n  return (\n    <form onSubmit={submit}>\n      <label>\n        <input type=\"radio\" name=\"plan\" value=\"free\" defaultChecked /> Free\n      </label>\n      <label>\n        <input type=\"radio\" name=\"plan\" value=\"pro\" /> Pro\n      </label>\n      <button type=\"submit\">Go</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q11: Controlled textarea — same as input",
            "explain": "Task:\nvalue={text} onChange — multiline also uses React state.\n\nIn simple words:\ndefaultValue on textarea too — pick one mode.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function ControlledTextarea() {\n  const [bio, setBio] = useState(\"\");\n  return (\n    <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={4} />\n  );\n}"
          },
          {
            "title": "Q12: [MID] React Hook Form — mostly uncontrolled register()",
            "explain": "Task:\nregister(\"email\") ref-based; lib handles validation — fewer re-renders.\n\nIn simple words:\nLib contrast: RHF uncontrolled default; Formik often controlled and state heavy.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function RHFNote() {\n  return (\n    <p>\n      React Hook Form: register via ref — controlled where needed (watch fields).\n      Performance win on uncontrolled.\n    </p>\n  );\n}"
          },
          {
            "title": "Q13: Formik contrast — controlled field state",
            "explain": "Task:\nvalues + setFieldValue — every keystroke updates form state.\n\nIn simple words:\nOK for simple forms; re-render cost on big forms — RHF alternative.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function FormikNote() {\n  return <p>Formik: central values object — controlled feel, predictable validation.</p>;\n}"
          },
          {
            "title": "Q14: [MID] Switch controlled to uncontrolled — remount key",
            "explain": "Task:\nOn mode change: input key={mode} — fresh DOM, avoid warning.\n\nIn simple words:\nRuntime switch is risky — remount for clean slate.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function ModeSwitch({ controlled }) {\n  const [v, setV] = useState(\"\");\n  const ref = useRef(null);\n  if (controlled) {\n    return (\n      <input key=\"c\" value={v} onChange={(e) => setV(e.target.value)} />\n    );\n  }\n  return <input key=\"u\" defaultValue=\"seed\" ref={ref} />;\n}"
          },
          {
            "title": "Q15: defaultValue only on first mount",
            "explain": "Task:\ndefaultValue does not update from prop change — use controlled if sync needed.\n\nIn simple words:\nParent prop change → uncontrolled input stays stale.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function DefaultValueOnce() {\n  return (\n    <p>\n      defaultValue set once — later parent prop change does not reflect in DOM.\n    </p>\n  );\n}"
          },
          {
            "title": "Q16: [MID] Multiple file inputs — refs array",
            "explain": "Task:\nfiles[0], files[1] separate ref — multi upload naturally uncontrolled.\n\nIn simple words:\nFile value cannot be controlled for security — ref/onChange FileList.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function MultiFile() {\n  const a = useRef(null);\n  const b = useRef(null);\n  function submit(e) {\n    e.preventDefault();\n    console.log(a.current.files[0], b.current.files[0]);\n  }\n  return (\n    <form onSubmit={submit}>\n      <input type=\"file\" ref={a} />\n      <input type=\"file\" ref={b} />\n      <button type=\"submit\">Upload</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q17: [ADV] readOnly vs disabled controlled",
            "explain": "Task:\nreadOnly: value shows and submits; disabled: often skipped in form.\n\nIn simple words:\nUX + a11y — disabled fields grey; readOnly blocks edit but displays OK.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function ReadOnlyField() {\n  const [code] = useState(\"INV-001\");\n  return <input value={code} readOnly />;\n}"
          },
          {
            "title": "Q18: [ADV] Custom input — value + onChange contract",
            "explain": "Task:\nMyInput { value, onChange } — parent keeps it controlled.\n\nIn simple words:\nNative-like API — form libs built on this pattern.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function MyInput({ value, onChange, label }) {\n  return (\n    <label>\n      {label}\n      <input value={value} onChange={(e) => onChange(e.target.value)} />\n    </label>\n  );\n}"
          },
          {
            "title": "Q19: [ADV] useImperativeHandle — uncontrolled reset",
            "explain": "Task:\nExpose .reset() via ref — parent clears imperatively.\n\nIn simple words:\nPrefer declarative; sometimes useful for lib/integration.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function ImperativeNote() {\n  return (\n    <p>\n      useImperativeHandle: expose reset/focus on child ref — sometimes useful in\n      uncontrolled forms.\n    </p>\n  );\n}"
          },
          {
            "title": "Q20: [ADV] Autocomplete / combobox controlled pain",
            "explain": "Task:\nTyping + selection + async options — controlled state gets complex.\n\nIn simple words:\nWhy Downshift/Radix exist — or use a lib; handling every keystroke yourself is heavy.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function AutocompleteNote() {\n  return (\n    <p>\n      Combobox controlled: input value + highlighted index + selected item — lib\n      recommended.\n    </p>\n  );\n}"
          },
          {
            "title": "Q21: [ADV] Native form submit vs fully controlled",
            "explain": "Task:\naction + FormData native; or preventDefault + controlled state API.\n\nIn simple words:\nReact 19 Actions also support native form — mix controlled carefully.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function NativeSubmitNote() {\n  return (\n    <p>\n      Native submit FormData (uncontrolled friendly) vs controlled gather state\n      manually — pick by form size/complexity.\n    </p>\n  );\n}"
          },
          {
            "title": "Q22: [ADV] Interview — controlled vs uncontrolled decision tree",
            "explain": "Task:\nLive validate/sync → controlled. Performance/simple/file → uncontrolled. Do not mix.\n\nIn simple words:\nFile always special; mention lib contrast — strong close.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function ControlledInterview() {\n  return (\n    <ol>\n      <li>Live UI from value? → controlled</li>\n      <li>One-shot submit / file? → uncontrolled + ref/FormData</li>\n      <li>value + defaultValue together? → ❌</li>\n      <li>RHF uncontrolled vs Formik controlled — tradeoff</li>\n    </ol>\n  );\n}"
          }
        ]
      },
      {
        "file": "26_ReconciliationAndKeys.jsx",
        "title": "26 — Reconciliation And Keys",
        "kya": "Reconciliation = React matches old virtual tree to new —",
        "detail": "26 — Reconciliation And Keys\nLevel: MID  |  Sequence: do this first, then the next file in sequence\n\nSIMPLE: Reconciliation = React matches old virtual tree to new —\nwhat is same, new, or deleted. Diff is clever, not perfect.\nSame position + same type → update. Different type → replace.\nkey tells React in a list \"this is the same item\" even if order changed.\n\nWrong keys = wrong state reuse (wrong name stuck in input). Index key\nclassic bug on reorder/delete. key change = intentional remount.\n\nWHY: Deep \"how React thinks\" interview. Bugs make sense.\nINTERVIEW: diffing heuristic; keys role; remount via key.\nVite/React 19 project — teaching file.",
        "intro": "26 — Reconciliation And Keys\nLevel: MID  |  Sequence: do this first, then the next file in sequence\n\nSIMPLE: Reconciliation = React matches old virtual tree to new —\nwhat is same, new, or deleted. Diff is clever, not perfect.\nSame position + same type → update. Different type → replace.\nkey tells React in a list \"this is the same item\" even if order changed.\n\nWrong keys = wrong state reuse (wrong name stuck in input). Index key\nclassic bug on reorder/delete. key change = intentional remount.\n\nWHY: Deep \"how React thinks\" interview. Bugs make sense.\nINTERVIEW: diffing heuristic; keys role; remount via key.\nVite/React 19 project — teaching file.",
        "questions": [
          {
            "title": "Q1: Type change remounts",
            "explain": "Task:\nConditional <div> vs <span> same spot — state resets.\n\nIn simple words:\nDifferent type = React destroy + create. State is lost.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function TypeSwap() {\n  const [asDiv, setAsDiv] = useState(true);\n  return (\n    <div>\n      <button onClick={() => setAsDiv(!asDiv)}>Swap</button>\n      {asDiv ? <CounterWrap tag=\"div\" /> : <CounterWrap tag=\"span\" />}\n    </div>\n  );\n}\n\nfunction CounterWrap({ tag: Tag }) {\n  const [n, setN] = useState(0);\n  return (\n    <Tag>\n      <button onClick={() => setN(n + 1)}>{n}</button>\n    </Tag>\n  );\n}"
          },
          {
            "title": "Q2: Same type preserves state",
            "explain": "Task:\nBoth branches <div><Counter/></div> — counter survives.\n\nIn simple words:\nHeuristic: type match → update props, keep instance.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function SameType({ mode }) {\n  return (\n    <div>\n      {mode === \"a\" ? <Counter label=\"A\" /> : <Counter label=\"B\" />}\n    </div>\n  );\n}\n\nfunction Counter({ label }) {\n  const [n, setN] = useState(0);\n  return (\n    <button onClick={() => setN(n + 1)}>\n      {label}:{n}\n    </button>\n  );\n}"
          },
          {
            "title": "Q3: Force remount with key",
            "explain": "Task:\n<Counter key={userId} /> fresh state on user change.\n\nIn simple words:\nkey is identity. Change key = new component identity.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function UserCounter({ userId }) {\n  return <Counter key={userId} label={String(userId)} />;\n}"
          },
          {
            "title": "Q4: Index key reorder bug demo idea",
            "explain": "Task:\nList inputs with key={index}; reverse list — values jump.\n\nIn simple words:\nReact matches by position. Item move ≠ state move with index keys.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function IndexBug() {\n  const [items, setItems] = useState([\"Ada\", \"Lin\"]);\n  return (\n    <div>\n      <button onClick={() => setItems([...items].reverse())}>Reverse</button>\n      {items.map((name, i) => (\n        <input key={i} defaultValue={name} />\n      ))}\n      {/* Fix: key={stableId} */}\n    </div>\n  );\n}"
          },
          {
            "title": "Q5: [MID] Stable id keys correct reorder",
            "explain": "Task:\nkey={id}; reverse — each input keeps its value.\n\nIn simple words:\nReconciliation tracks items via keys.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function IdKeys() {\n  const [items, setItems] = useState([\n    { id: \"a\", name: \"Ada\" },\n    { id: \"b\", name: \"Lin\" },\n  ]);\n  return (\n    <div>\n      <button onClick={() => setItems([...items].reverse())}>Reverse</button>\n      {items.map((it) => (\n        <input key={it.id} defaultValue={it.name} />\n      ))}\n    </div>\n  );\n}"
          },
          {
            "title": "Q6: List insert middle",
            "explain": "Task:\nKeys tell React what shifted vs what is new.\n\nIn simple words:\nWithout keys: warning + inefficient/wrong updates.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Insert() {\n  const [rows, setRows] = useState([{ id: 1, t: \"one\" }]);\n  function addFront() {\n    setRows([{ id: Date.now(), t: \"new\" }, ...rows]);\n  }\n  return (\n    <div>\n      <button onClick={addFront}>Add front</button>\n      <ul>\n        {rows.map((r) => (\n          <li key={r.id}>{r.t}</li>\n        ))}\n      </ul>\n    </div>\n  );\n}"
          },
          {
            "title": "Q7: [MID] Don't use array index when list is dynamic",
            "explain": "Task:\nStatic docs list OK-ish; todos/filters → ids.\n\nIn simple words:\nRule of thumb to say in interview.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Rule() {\n  return <p>Dynamic lists → stable unique keys, not index.</p>;\n}"
          },
          {
            "title": "Q8: Reconciliation is not deep magic optimize always",
            "explain": "Task:\nReact is smart enough; first get structure + keys right.\n\nIn simple words:\nDo not think manual DOM diff. Declare UI for state.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Mindset() {\n  return <p>Describe UI for state; keys help React match list items.</p>;\n}"
          },
          {
            "title": "Q9: Fiber mental model — light version",
            "explain": "Task:\nEach component = fiber node; work unit reconciles on tree walk.\n\nIn simple words:\nDo not go too deep — React traverses tree and applies diff.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function FiberNote() {\n  return (\n    <p>\n      Fiber: reconcile unit. Same type update props; different type replace node.\n    </p>\n  );\n}"
          },
          {
            "title": "Q10: [MID] Same component — move to different position",
            "explain": "Task:\nCounter first in div, later in span — same type parent change? position matters.\n\nIn simple words:\nTree position + type decide reuse; same component name alone is not always enough.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function MoveCounter({ onTop }) {\n  return onTop ? (\n    <div>\n      <Counter label=\"top\" />\n      <p>rest</p>\n    </div>\n  ) : (\n    <div>\n      <p>rest</p>\n      <Counter label=\"bottom\" />\n    </div>\n  );\n}"
          },
          {
            "title": "Q11: Fragment list key — not <>, use <Fragment key>",
            "explain": "Task:\nIn map wrap Fragment key={id} — shorthand <> cannot take key.\n\nIn simple words:\nGrouped siblings in list still need stable key.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function FragmentList({ pairs }) {\n  return (\n    <ul>\n      {pairs.map(([id, a, b]) => (\n        <Fragment key={id}>\n          <li>{a}</li>\n          <li>{b}</li>\n        </Fragment>\n      ))}\n    </ul>\n  );\n}"
          },
          {
            "title": "Q12: [MID] key on component vs DOM element",
            "explain": "Task:\n<Row key={id} /> — tracks Row instance; inner DOM React manages.\n\nIn simple words:\nkey on list direct child — put on wrapper component, not hidden inside wrong.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function KeyOnComponent({ items }) {\n  return items.map((it) => <Counter key={it.id} label={it.name} />);\n}"
          },
          {
            "title": "Q13: Props update — no remount, yes re-render",
            "explain": "Task:\nSame Counter, label prop change — state (n) preserved.\n\nIn simple words:\nReconciliation update = props patch; state while type+key same.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function PropUpdateDemo() {\n  const [label, setLabel] = useState(\"A\");\n  return (\n    <div>\n      <button onClick={() => setLabel(label === \"A\" ? \"B\" : \"A\")}>Toggle label</button>\n      <Counter label={label} />\n    </div>\n  );\n}"
          },
          {
            "title": "Q14: [MID] Conditional same slot — key to force fresh",
            "explain": "Task:\n{edit ? <Form key=\"edit\" /> : <Form key=\"view\" />} — mode switch reset.\n\nIn simple words:\nSame component type same spot — without key state bleeds; key for intentional remount.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function EditViewSwitch({ editing }) {\n  return editing ? (\n    <Counter key=\"edit\" label=\"edit mode\" />\n  ) : (\n    <Counter key=\"view\" label=\"view mode\" />\n  );\n}"
          },
          {
            "title": "Q15: Children array — explicit keys",
            "explain": "Task:\n[a, b, c] map or array literal — stable key per child.\n\nIn simple words:\nDynamic children without keys — warning + wrong reuse.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function ChildArray({ parts }) {\n  return (\n    <div>\n      {parts.map((p) => (\n        <span key={p.id}>{p.text}</span>\n      ))}\n    </div>\n  );\n}"
          },
          {
            "title": "Q16: [MID] key={undefined} / missing — not index fallback, warning",
            "explain": "Task:\nAlways give unique stable key in list — React warns on missing.\n\nIn simple words:\nCheck dev console — key discipline prevents production bugs.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function KeyWarningNote() {\n  return <p>Missing keys: dev warning, reconcile inefficient/wrong state reuse.</p>;\n}"
          },
          {
            "title": "Q17: [ADV] O(n) heuristic — same level siblings only",
            "explain": "Task:\nReact does not perfectly detect cross-level move — keep structure stable.\n\nIn simple words:\nInterview: diff is linear same depth — why keys + stable structure matter.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function HeuristicNote() {\n  return (\n    <p>\n      Reconciliation O(n) same-level pass — wrong type/key in deep tree = expensive\n      wrong updates.\n    </p>\n  );\n}"
          },
          {
            "title": "Q18: [ADV] memo bail-out — same props skip reconcile subtree?",
            "explain": "Task:\nmemo child — props shallow same → React skip render attempt.\n\nIn simple words:\nSeparate from reconciliation — memo is render phase shortcut; keys are different.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function MemoReconcileNote() {\n  return (\n    <p>\n      React.memo: skip re-render when props same — bail-out before reconciliation.\n    </p>\n  );\n}"
          },
          {
            "title": "Q19: [ADV] Portal — reconcile logical tree, DOM separate",
            "explain": "Task:\nPortal child reconciles with parent; paints on body DOM.\n\nIn simple words:\nSame parent link in fiber tree — keys/rules apply here too.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function PortalReconcileNote() {\n  return <p>Portal: reconcile in React tree; DOM placement separate — keys work normally.</p>;\n}"
          },
          {
            "title": "Q20: [ADV] Suspense boundary — suspended subtree replace",
            "explain": "Task:\nOn suspend show fallback; on resume prior state often preserved.\n\nIn simple words:\nRemount vs resume is Suspense-specific — key change means full remount.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function SuspenseKeyNote() {\n  return (\n    <p>\n      Suspense + key change = fresh subtree. Without key change suspend/resume state often\n      intact.\n    </p>\n  );\n}"
          },
          {
            "title": "Q21: [ADV] Identity vs position — interview story",
            "explain": "Task:\nkey = identity; index = position guess — index fails on reorder.\n\nIn simple words:\n\"React tracks items by key, not by position\" — one-liner.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function IdentityNote() {\n  return <p>Keys identify items across renders; index identifies slot — difference on reorder.</p>;\n}"
          },
          {
            "title": "Q22: [ADV] Intentional remount — key patterns summary",
            "explain": "Task:\nuserId change, form reset, mode switch — key={id} remount toolbox.\n\nIn simple words:\nBug fix (stable id) vs feature (reset via key) — both valid use cases.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function KeyInterview() {\n  return (\n    <ol>\n      <li>Same type + same key → update props, keep state</li>\n      <li>Different type → replace, state loss</li>\n      <li>Stable unique keys in dynamic lists</li>\n      <li>Index keys bad on reorder/delete</li>\n      <li>key change = intentional remount / reset</li>\n    </ol>\n  );\n}"
          }
        ]
      },
      {
        "file": "27_StrictModeAndEffects.jsx",
        "title": "27 — Strict Mode And Effects",
        "kya": "StrictMode = development teacher that double-checks. In DEV,",
        "detail": "27 — StrictMode And Effects\nLevel: MID  |  Sequence: do this first, then the next file in sequence\n\nSIMPLE: StrictMode = development teacher that double-checks. In DEV,\neffects mount → cleanup → mount again — to see if your cleanup is correct\n(otherwise prod leak/bug stays hidden).\n\n<React.StrictMode> wrap App. Production does not double invoke.\n\"Why does my useEffect run twice?\" → often StrictMode, not a bug (if cleanup OK).\n\nWHY: Catch fragile effects early. Interview explains double mount.\nINTERVIEW: why effects run twice in dev; idempotent setup/cleanup.\nVite/React 19 project — teaching file.",
        "intro": "27 — StrictMode And Effects\nLevel: MID  |  Sequence: do this first, then the next file in sequence\n\nSIMPLE: StrictMode = development teacher that double-checks. In DEV,\neffects mount → cleanup → mount again — to see if your cleanup is correct\n(otherwise prod leak/bug stays hidden).\n\n<React.StrictMode> wrap App. Production does not double invoke.\n\"Why does my useEffect run twice?\" → often StrictMode, not a bug (if cleanup OK).\n\nWHY: Catch fragile effects early. Interview explains double mount.\nINTERVIEW: why effects run twice in dev; idempotent setup/cleanup.\nVite/React 19 project — teaching file.",
        "questions": [
          {
            "title": "Q1: Wrap app in StrictMode",
            "explain": "Task:\nmain.jsx: <StrictMode><App/></StrictMode>\n\nIn simple words:\nExtra checks DEV only. Prod bundle behavior normal.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Root() {\n  return (\n    <StrictMode>\n      <App />\n    </StrictMode>\n  );\n}\n\nfunction App() {\n  return <p>App</p>;\n}"
          },
          {
            "title": "Q2: Effect double-invoke demo mindset",
            "explain": "Task:\nconsole.log mount/cleanup — in DEV: mount, cleanup, mount.\n\nIn simple words:\nReact does this on purpose. Write cleanup as if prod unmounts too.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Probe() {\n  useEffect(() => {\n    console.log(\"mount/setup\");\n    return () => console.log(\"cleanup\");\n  }, []);\n  return <p>Check console in DEV</p>;\n}"
          },
          {
            "title": "Q3: Subscription must cleanup",
            "explain": "Task:\naddEventListener + remove in cleanup — safe even when doubled.\n\nIn simple words:\nWithout remove, StrictMode can feel like 2 listeners stuck.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Width() {\n  const [w, setW] = useState(window.innerWidth);\n  useEffect(() => {\n    const fn = () => setW(window.innerWidth);\n    window.addEventListener(\"resize\", fn);\n    return () => window.removeEventListener(\"resize\", fn);\n  }, []);\n  return <p>{w}</p>;\n}"
          },
          {
            "title": "Q4: Fetch with cancel / ignore flag",
            "explain": "Task:\nDouble fetch in DEV OK; no setState on aborted/cancelled.\n\nIn simple words:\nStrictMode can fire 2 requests — design resilient.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function User({ id }) {\n  const [user, setUser] = useState(null);\n  useEffect(() => {\n    let ignore = false;\n    fetch(`/api/users/${id}`)\n      .then((r) => r.json())\n      .then((data) => {\n        if (!ignore) setUser(data);\n      });\n    return () => {\n      ignore = true;\n    };\n  }, [id]);\n  return <pre>{JSON.stringify(user)}</pre>;\n}"
          },
          {
            "title": "Q5: [MID] Don't \"fix\" by removing StrictMode",
            "explain": "Task:\nIrritated by double call → removing Mode is wrong fix.\n\nIn simple words:\nMake cleanup/idempotent. Mode is your friend.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Note() {\n  return <p>Fix effects, don't delete StrictMode.</p>;\n}"
          },
          {
            "title": "Q6: Idempotent setup",
            "explain": "Task:\nSetup runs twice still OK (connect once via ref guard if needed).\n\nIn simple words:\nExternal systems: clear connect/disconnect pair.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function FakeSocket() {\n  useEffect(() => {\n    const socket = { open: true };\n    console.log(\"connect\");\n    return () => {\n      socket.open = false;\n      console.log(\"disconnect\");\n    };\n  }, []);\n  return <p>socket</p>;\n}"
          },
          {
            "title": "Q7: [MID] setState in effect + StrictMode",
            "explain": "Task:\nExtra setup/cleanup/setup — state should end consistent.\n\nIn simple words:\nRace flags. Final UI one correct data.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Consistent() {\n  const [n, setN] = useState(0);\n  useEffect(() => {\n    setN(1);\n  }, []);\n  return <p>{n}</p>;\n}"
          },
          {
            "title": "Q8: What StrictMode also checks (concept)",
            "explain": "Task:\nDeprecated APIs, unsafe side effects in render — warnings.\n\nIn simple words:\nNot only effects double — broader DEV safety net.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Concept() {\n  return (\n    <ul>\n      <li>DEV-only double invoke effects</li>\n      <li>Warn on legacy patterns</li>\n      <li>Prod: no double mount tax</li>\n    </ul>\n  );\n}"
          },
          {
            "title": "Q9: Production — double invoke does not happen",
            "explain": "Task:\nStrictMode DEV-only behavior; prod build effect runs once normally.\n\nIn simple words:\n\"Runs twice in prod\" report = likely real bug, not StrictMode.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function ProdNote() {\n  return (\n    <p>\n      StrictMode double mount/cleanup DEV only. Production = single\n      mount cycle.\n    </p>\n  );\n}"
          },
          {
            "title": "Q10: [MID] Impure render detect — StrictMode extra render",
            "explain": "Task:\nMath.random() / Date.now() in render — DEV shows inconsistent UI.\n\nIn simple words:\nRender must be pure — StrictMode exposes impure patterns.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function ImpureRenderBad() {\n  // const id = Math.random(); // ❌ impure render\n  const id = useRef(Math.random()).current; // ✅ stable via ref\n  return <p>{id}</p>;\n}"
          },
          {
            "title": "Q11: Legacy StrictMode — findDOMNode etc warnings",
            "explain": "Task:\nWarn on old APIs — migrate to refs.\n\nIn simple words:\nStrictMode not only doubles effects — also flags unsafe APIs.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function LegacyNote() {\n  return <p>Legacy StrictMode: deprecated lifecycle/API warnings extra.</p>;\n}"
          },
          {
            "title": "Q12: [MID] Refs do not persist on double mount — fresh instance",
            "explain": "Task:\nuseRef initial value resets on remount — state also fresh.\n\nIn simple words:\nDouble invoke = full unmount/remount sim — ref/state reset in DEV cycle.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function RefResetDemo() {\n  const ref = useRef({ count: 0 });\n  ref.current.count += 1;\n  return <p>Ref ticks this mount: {ref.current.count}</p>;\n}"
          },
          {
            "title": "Q13: setInterval / setTimeout — cleanup mandatory",
            "explain": "Task:\nclearInterval/clearTimeout in cleanup — no duplicate timer on double mount.\n\nIn simple words:\nWithout cleanup: 2 timers in DEV — leak on prod unmount.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function TimerDemo() {\n  const [n, setN] = useState(0);\n  useEffect(() => {\n    const id = setInterval(() => setN((x) => x + 1), 1000);\n    return () => clearInterval(id);\n  }, []);\n  return <p>{n}</p>;\n}"
          },
          {
            "title": "Q14: [MID] Analytics — double fire guard with ref",
            "explain": "Task:\ntrackPageView — no duplicate event on StrictMode double mount (idempotent).\n\nIn simple words:\nDedupe external side effect or accept DEV double — prod single.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function AnalyticsPage() {\n  const sent = useRef(false);\n  useEffect(() => {\n    if (sent.current) return;\n    sent.current = true;\n    console.log(\"page_view\");\n  }, []);\n  return <p>Page</p>;\n}"
          },
          {
            "title": "Q15: useLayoutEffect also DEV double pattern",
            "explain": "Task:\nDOM measure in layout effect — keep cleanup symmetric.\n\nIn simple words:\nuseEffect vs useLayoutEffect both StrictMode simulate — cleanup pair required.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function LayoutProbe() {\n  useLayoutEffect(() => {\n    console.log(\"layout measure\");\n    return () => console.log(\"layout cleanup\");\n  }, []);\n  return <p>Layout</p>;\n}"
          },
          {
            "title": "Q16: [MID] Global singleton — module level side effect danger",
            "explain": "Task:\nlet socket = connect() at module top — double import/init issues.\n\nIn simple words:\nSide effects in effect + cleanup; module scope global state needs care.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function SingletonNote() {\n  return (\n    <p>\n      Module-level singleton + StrictMode remount = surprising double init — prefer\n      effect encapsulation.\n    </p>\n  );\n}"
          },
          {
            "title": "Q17: [ADV] React 19 StrictMode — concurrent features alignment",
            "explain": "Task:\nStricter checks continue; same cleanup rules with Actions/use patterns.\n\nIn simple words:\nRemoving StrictMode on upgrade is not a fix — keep effects idempotent.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function React19StrictNote() {\n  return <p>React 19: StrictMode still DEV teacher — new APIs same cleanup discipline.</p>;\n}"
          },
          {
            "title": "Q18: [ADV] findDOMNode / string refs — warnings",
            "explain": "Task:\nMigrate to useRef on DOM node — StrictMode warns on legacy.\n\nIn simple words:\nLess issue in modern code; interview may mention legacy.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function FindDOMNote() {\n  return <p>findDOMNode deprecated — StrictMode DEV warnings push refs migration.</p>;\n}"
          },
          {
            "title": "Q19: [ADV] useInsertionEffect — CSS-in-JS StrictMode safe",
            "explain": "Task:\nInject styles before layout — cleanup removes styles.\n\nIn simple words:\nFor library authors; same mount/cleanup/mount DEV cycle applies.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function InsertionNote() {\n  return <p>useInsertionEffect: inject/cleanup styles — StrictMode double safe pattern.</p>;\n}"
          },
          {
            "title": "Q20: [ADV] Testing — StrictMode wrapper in tests",
            "explain": "Task:\nrender(&lt;StrictMode&gt;&lt;App/&gt;&lt;/StrictMode&gt;) — catch cleanup bugs in tests.\n\nIn simple words:\nTest utils StrictMode optional — helpful in integration tests.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function TestStrictNote() {\n  return <p>Wrap with StrictMode in tests to verify double-invoke cleanup.</p>;\n}"
          },
          {
            "title": "Q21: [ADV] AbortController + StrictMode fetch",
            "explain": "Task:\nAbort on mount cleanup — double fetch may fire in DEV; one response wins.\n\nIn simple words:\nignore flag or abort — no duplicate setState race.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function StrictFetch({ id }) {\n  const [data, setData] = useState(null);\n  useEffect(() => {\n    const ac = new AbortController();\n    fetch(`/api/${id}`, { signal: ac.signal })\n      .then((r) => r.json())\n      .then(setData)\n      .catch((e) => {\n        if (e.name !== \"AbortError\") console.error(e);\n      });\n    return () => ac.abort();\n  }, [id]);\n  return <pre>{JSON.stringify(data)}</pre>;\n}"
          },
          {
            "title": "Q22: [ADV] Interview — explain double effect to junior",
            "explain": "Task:\nDEV rehearsal for cleanup; prod single; fix effect not remove StrictMode.\n\nIn simple words:\n30 sec answer: why, what to expect, how to fix — interview gold.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function StrictInterview() {\n  return (\n    <ol>\n      <li>StrictMode = DEV-only extra checks</li>\n      <li>Effects: mount → cleanup → mount simulate</li>\n      <li>Good cleanup → final state OK</li>\n      <li>Prod has no double tax</li>\n      <li>Removing StrictMode = hide symptom, not fix</li>\n    </ol>\n  );\n}"
          }
        ]
      }
    ]
  },
  {
    "level": "REACT19",
    "items": [
      {
        "file": "28_React19_Overview.jsx",
        "title": "28 — React 19 Overview",
        "kya": "React 18 = Concurrent features + Suspense matured.",
        "detail": "28 — React 19 Overview (Dec 2024+)\nLevel: REACT19  |  Study order: do this file first, then the next in sequence\n\nSIMPLE: React 18 = Concurrent features + Suspense matured.\nReact 19 = major release for \"forms + async + less boilerplate\" (Dec 2024).\nThink: before submit you manually tracked loading, error, disabled button —\nnow Actions + useActionState / useFormStatus make that pattern built-in.\n\nBig picture:\n  1) Actions — async function from form/event; pending/error easier to track\n  2) New hooks — useActionState, useFormStatus, useOptimistic, use()\n  3) ref is now a normal prop (forwardRef mostly legacy)\n  4) Document metadata (<title>, <meta>) from component tree\n  5) Context as provider — <ThemeContext> directly, .Provider optional\n  6) Server Components / Server Actions mental model (common in Next.js etc.)\n\nReact 19.2 extras (brief):\n  • useEffectEvent — \"latest props/state\" event helper inside effect;\n    do NOT use blindly to silence deps (file 39).\n  • Activity — hide/show UI + preserve state style patterns (frameworks explore).",
        "intro": "28 — React 19 Overview (Dec 2024+)\nLevel: REACT19  |  Study order: do this file first, then the next in sequence\n\nSIMPLE: React 18 = Concurrent features + Suspense matured.\nReact 19 = major release for \"forms + async + less boilerplate\" (Dec 2024).\nThink: before submit you manually tracked loading, error, disabled button —\nnow Actions + useActionState / useFormStatus make that pattern built-in.\n\nBig picture:\n  1) Actions — async function from form/event; pending/error easier to track\n  2) New hooks — useActionState, useFormStatus, useOptimistic, use()\n  3) ref is now a normal prop (forwardRef mostly legacy)\n  4) Document metadata (<title>, <meta>) from component tree\n  5) Context as provider — <ThemeContext> directly, .Provider optional\n  6) Server Components / Server Actions mental model (common in Next.js etc.)\n\nReact 19.2 extras (brief):\n  • useEffectEvent — \"latest props/state\" event helper inside effect;\n    do NOT use blindly to silence deps (file 39).\n  • Activity — hide/show UI + preserve state style patterns (frameworks explore).",
        "questions": [
          {
            "title": "Q1: React 18 vs 19 — plain difference",
            "explain": "In simple words:\n18 gave concurrent + Suspense + automatic batching.\n19 simplified forms/async UX + DX (developer experience).\nYour mental model: \"UI update\" same; \"async form flow\" has new shortcuts.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "// React 18 typical form flow (idea):\n//   onSubmit → e.preventDefault → setLoading(true) → await api → setError/setData → setLoading(false)\n// React 19 Action flow (idea):\n//   action={async (formData) => { ... }}  + hooks handle pending/error"
          },
          {
            "title": "Q2: [MID] What is the Actions concept?",
            "explain": "In simple words:\nAction = function that handles \"user submitted/triggered something\" —\noften async. Form action={fn} receives FormData.\nReact can understand pending state (transitions / useActionState).\nNot only forms — startTransition + async is also Action-style thinking.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "async function saveNameAction(formData) {\n  const name = formData.get(\"name\");\n  // await saveToServer(name)\n  return { ok: true, name };\n}\n\nexport function NameFormClassicAction() {\n  return (\n    <form action={saveNameAction}>\n      <input name=\"name\" placeholder=\"Your name\" />\n      <button type=\"submit\">Save</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q3: useTransition for Action-ish pending (18 style bridge)",
            "explain": "In simple words:\nBefore React 19, isPending + startTransition already gave async UX.\n19 has dedicated form hooks that are cleaner — but idea same:\n\"urgent UI\" vs \"transition UI\".",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function SaveWithTransition() {\n  const [isPending, startTransition] = useTransition();\n  const [msg, setMsg] = useState(\"\");\n\n  function handleSave() {\n    startTransition(async () => {\n      // await api.save()\n      setMsg(\"Saved!\");\n    });\n  }\n\n  return (\n    <button onClick={handleSave} disabled={isPending}>\n      {isPending ? \"Saving...\" : \"Save\"}\n      {msg}\n    </button>\n  );\n}"
          },
          {
            "title": "Q4: Migration notes — what might break?",
            "explain": "In simple words:\n• PropTypes remove path / strictness — prefer TypeScript for types.\n• Some deprecated APIs cleanup (check upgrade guide).\n• forwardRef not required until libraries update.\n• react-dom/client createRoot was already in 18 — keep it.\n• Third-party libs locked to old React — check peerDeps.\nPractical: fix 18.3 deprecations first, then 19.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const migrationChecklist = [\n  \"Fix React 18.3 deprecation warnings first\",\n  \"Upgrade react + react-dom together\",\n  \"Test forms, Suspense, error boundaries\",\n  \"Check libraries for React 19 support\",\n  \"Adopt Actions gradually — old onSubmit still works\",\n];"
          },
          {
            "title": "Q5: [MID] Why do interviews ask about Actions?",
            "explain": "In simple words:\nInterviewer wants to see: you are not building loading/error/optimistic UI\nas manual spaghetti. React 19 = recognize the pattern.\n\"action vs onSubmit\" answer: both work; Action + FormData + pending UX is better fit.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function WhyActionsMatter() {\n  // Teaching-only: compare mental models\n  const oldWay = \"preventDefault + many useStates\";\n  const newWay = \"action + useActionState / useFormStatus\";\n  return <p>{oldWay} → {newWay}</p>;\n}"
          },
          {
            "title": "Q6: useActionState teaser (detail file 30)",
            "explain": "In simple words:\nuseActionState(action, initialState) → [state, formAction, isPending]\nPass formAction to form; after submit you get new state.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "async function incrementAction(prev, formData) {\n  return prev + 1;\n}\n\nexport function CounterActionTeaser() {\n  const [count, formAction, isPending] = useActionState(incrementAction, 0);\n  return (\n    <form action={formAction}>\n      <p>Count: {count}</p>\n      <button disabled={isPending}>+1</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q7: Client vs Server Components (teaser — file 37)",
            "explain": "In simple words:\nDefault RSC world: components render on SERVER (zero bundle).\nNeed interactivity → 'use client'.\nReact 19 docs + Next App Router mainstream this mental model.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "// // Server Component (no 'use client') — fetch OK, no useState\n// // Client Component — 'use client' — hooks OK"
          },
          {
            "title": "Q8: [MID] React 19.2 — useEffectEvent & Activity (overview only)",
            "explain": "In simple words:\nuseEffectEvent(fn) = event inside effect that reads latest values;\navoids \"effect runs every render\" from dependency array — BUT\nNOT a shortcut to \"quietly remove deps\". Rules in file 39.\nActivity = offscreen/hidden UI patterns; follow framework/docs.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const react192Extras = {\n  useEffectEvent: \"stable event from effect; not a deps escape hatch\",\n  Activity: \"hide/show with preserved semantics — see React 19.2 notes\",\n};"
          },
          {
            "title": "Q9: Practice roadmap in this folder",
            "explain": "In simple words:\n29 forms action → 30 useActionState → 31 useFormStatus → 32 optimistic\n→ 33 use() → 34 ref prop → 35 metadata → 36 context provider\n→ 37 RSC → 38 server actions → 39 compiler + EffectEvent → 40 interview dump",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export const react19StudyOrder = [\n  29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,\n];"
          },
          {
            "title": "Q10: [MID] use() hook teaser — promise + context (file 33)",
            "explain": "Task:\nuse(promise) with Suspense; use(context) can work conditionally.\n\nIn simple words:\nReact 19 new hook — flexible cousin of useContext + Promise unwrap.\nNormal hook rules have exception for use(); other hooks stay top-level.\nInterview trap: new Promise every render → infinite suspend.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const useHookTeaser = {\n  promise: \"use(cachedPromise) inside Suspense boundary\",\n  context: \"use(ThemeContext) — conditionals allowed for use() only\",\n  react18: \"useContext only; no use(promise) built-in\",\n};"
          },
          {
            "title": "Q11: useOptimistic teaser (file 32)",
            "explain": "Task:\nShow UI update immediately; sync real state after server confirm.\n\nIn simple words:\nWhatsApp send feel — show in list first, rollback on fail.\nReact 18: write optimistic state + rollback manually.\nWhen NOT: payment, irreversible delete, inventory-critical flows.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const optimisticTeaser =\n  \"useOptimistic(baseState, updateFn) — temporary overlay until real state catches up.\";"
          },
          {
            "title": "Q12: [MID] ref as prop — forwardRef legacy (file 34)",
            "explain": "Task:\nReact 19: ref is normal prop; forwardRef mostly for library compat.\n\nIn simple words:\nReact 18: forwardRef required for ref on function component.\nReact 19: function Input({ ref }) { return <input ref={ref} /> }\nMigration: old libs use forwardRef — both work.\nCommon bug: accept ref but do not attach in child → parent.current null.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const refPropNote = {\n  react18: \"forwardRef(function (props, ref) { ... })\",\n  react19: \"ref is a regular prop on function components\",\n};"
          },
          {
            "title": "Q13: Document metadata in tree (file 35)",
            "explain": "Task:\nWrite <title>, <meta> inside component — React hoists to head.\n\nIn simple words:\nReact 18 SPA: useEffect document.title or react-helmet.\nReact 19: declarative <title> in JSX — SSR/RSC friendly.\nTrap: two components set different title → keep single page-level owner.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function PageTitleDemo() {\n  return (\n    <>\n      <title>Dashboard — MyApp</title>\n      <meta name=\"description\" content=\"User dashboard\" />\n      <h1>Dashboard</h1>\n    </>\n  );\n}"
          },
          {
            "title": "Q14: [MID] Context as Provider syntax (file 36)",
            "explain": "Task:\n<ThemeContext value=\"dark\"> — .Provider wrapper optional now.\n\nIn simple words:\nReact 18: <ThemeContext.Provider value={...}>\nReact 19: <ThemeContext value={...}> — same read API (useContext / use).\nPerformance trap same: inline value={{}} new reference every render.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const contextProviderNote =\n  \"<Context value> in 19; .Provider legacy-ok; watch value referential equality.\";"
          },
          {
            "title": "Q15: Server Components one-liner (file 37)",
            "explain": "Task:\nDefault server render; 'use client' boundary for interactivity.\n\nIn simple words:\nServer: async fetch, DB, secrets — zero client bundle for that code.\nClient: useState, onClick, browser APIs.\nVite-only CSR app has no RSC — need framework (Next App Router).\nWhen NOT: highly interactive UI, optimistic updates → client islands.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const rscOneLiner =\n  \"Server = data + static; Client = interactivity; 'use client' at file top.\";"
          },
          {
            "title": "Q16: [MID] Server Actions one-liner (file 38)",
            "explain": "Task:\n'use server' function — trigger from client/form, execute on server.\n\nIn simple words:\nForm action={serverAction} — progressive enhancement friendly.\nSecurity MUST: auth, validate, authorize — client FormData can be tampered.\nvs API route: public HTTP / webhooks → API route better.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const serverActionOneLiner =\n  \"Server Actions = RPC-ish mutations; always validate on server.\";"
          },
          {
            "title": "Q17: React Compiler overview (file 39)",
            "explain": "Task:\nBuild-time auto-memoization — less manual useMemo/useCallback.\n\nIn simple words:\nCompiler assumes pure render — impure render (Math.random in render) breaks.\nReact 18: manual React.memo / useMemo everywhere when measured.\nReact 19+: compiler opt-in reduces NEED, not understanding of referential equality.\nWhen NOT to rely: compiler off, edge libs, intentional manual memo.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const compilerNote = {\n  does: \"auto-memoize safe derived values and components\",\n  doesNot: \"fix fetch-in-render, mutating props, bad architecture\",\n};"
          },
          {
            "title": "Q18: [MID] useFormStatus import trap (file 31)",
            "explain": "Task:\nuseFormStatus from react-dom; call in CHILD of form.\n\nIn simple words:\nReact 18: manually lift isPending from parent to button.\nReact 19: useFormStatus() in child — no prop drilling.\nCommon bug #1: call in form component itself → pending stays false.\nCommon bug #2: import from 'react' instead of 'react-dom'.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const formStatusTrap =\n  \"useFormStatus in child of <form>; import from react-dom.\";"
          },
          {
            "title": "Q19: Automatic batching — 18 vs 19 same story",
            "explain": "Task:\nMultiple setState in one event → one re-render (18+ already).\n\nIn simple words:\nReact 18 matured automatic batching (events, timeouts, promises).\nReact 19 builds on this — Actions/transitions are separate layer.\nInterview: batching ≠ Actions; don't confuse the two.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const batchingNote =\n  \"18+ batches setState in events/async; 19 adds Actions layer on top.\";"
          },
          {
            "title": "Q20: [ADV] Strict Mode + Actions dev behavior",
            "explain": "Task:\nDEV effects double-invoke — keep Actions idempotent where possible.\n\nIn simple words:\nStrict Mode runs setup/cleanup twice in dev — to catch side effects.\nAction that writes DB without guard → dev double insert risk (rare path).\nProduction does not double. Server Actions: think CSRF + idempotency.\nReact 18 vs 19: Strict Mode same philosophy; Actions new surface area.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const strictActionsNote =\n  \"Write idempotent actions where possible; dev Strict Mode still doubles effects.\";"
          },
          {
            "title": "Q21: [MID] When NOT to adopt React 19 features?",
            "explain": "Task:\nOld stable app, libs without React 19 support, team not RSC-ready.\n\nIn simple words:\nonSubmit + useState still valid — migration not forced.\nServer Actions stay conceptual without Next/RSC framework.\nCompiler opt-in — measure first, then adopt.\nSmall SPA Vite: Actions useful client-side; RSC optional.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const whenNotAdopt = [\n  \"libs lack React 19 peerDeps\",\n  \"no framework RSC support needed\",\n  \"team not trained on Actions/security model\",\n  \"working forms — gradual migration OK\",\n];"
          },
          {
            "title": "Q22: [ADV] Interview rapid-fire — React 19 cheat sheet",
            "explain": "Task:\nSay in one minute: Actions, hooks, ref, metadata, context, RSC, compiler.\n\nIn simple words:\nActions = async form/event handlers + pending UX.\nuseActionState = form state machine; useFormStatus = child pending UI.\nuseOptimistic = instant UI + rollback; use() = promise/context flexible read.\nref prop; <title> in tree; <Context value>; RSC + Server Actions; Compiler + EffectEvent.\nMigration: fix 18.3 deprecations → upgrade together → test forms/Suspense.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export const react19InterviewCheatSheet = {\n  actions: \"async fn on form/event; FormData; pending hooks\",\n  useActionState: \"[state, formAction, isPending]\",\n  useFormStatus: \"react-dom; child of form only\",\n  useOptimistic: \"temporary UI until real state syncs\",\n  useHook: \"promise (Suspense) + context (conditional OK)\",\n  refAsProp: \"forwardRef mostly legacy in 19\",\n  metadata: \"<title>/<meta> in component tree\",\n  contextProvider: \"<Context value> replaces .Provider\",\n  rsc: \"server default; use client for hooks/events\",\n  serverActions: \"use server; validate auth on server\",\n  compiler: \"auto-memo; still follow Rules of React\",\n  effectEvent: \"latest values in effect events — not deps escape\",\n};"
          }
        ]
      },
      {
        "file": "29_React19_FormActions.jsx",
        "title": "29 — Form Actions",
        "kya": "HTML form had action=\"/url\" — browser POSTed.",
        "detail": "29 — React 19 Form Actions (action={fn}, formAction)\nLevel: REACT19  |  Study order: do this file first, then the next in sequence\n\nSIMPLE: HTML form had action=\"/url\" — browser POSTed.\nReact 19 lets you use action={javascriptFunction}.\nOn submit React passes FormData to the function (input name=... fields).\n\nThink restaurant order slip: every field name + value on the slip;\nwaiter (action) takes slip to kitchen (server/API).\n\nformAction = different action on button/input — one form, multiple buttons,\ndifferent jobs (Save vs Delete).\n\nWHY: Mid React interviews + base for Next.js forms.\nINTERVIEW: how to read FormData; progressive enhancement idea; formAction.",
        "intro": "29 — React 19 Form Actions (action={fn}, formAction)\nLevel: REACT19  |  Study order: do this file first, then the next in sequence\n\nSIMPLE: HTML form had action=\"/url\" — browser POSTed.\nReact 19 lets you use action={javascriptFunction}.\nOn submit React passes FormData to the function (input name=... fields).\n\nThink restaurant order slip: every field name + value on the slip;\nwaiter (action) takes slip to kitchen (server/API).\n\nformAction = different action on button/input — one form, multiple buttons,\ndifferent jobs (Save vs Delete).\n\nWHY: Mid React interviews + base for Next.js forms.\nINTERVIEW: how to read FormData; progressive enhancement idea; formAction.",
        "questions": [
          {
            "title": "Q1: Simplest — <form action={fn}>",
            "explain": "In simple words:\nfn can be async. Argument = FormData.\nGet field with formData.get('email') (name attribute required).\nNo manual preventDefault on Action path.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "async function subscribeAction(formData) {\n  const email = formData.get(\"email\");\n  console.log(\"subscribe:\", email);\n  // await fetch('/api/subscribe', { method: 'POST', body: formData })\n}\n\nexport function SubscribeForm() {\n  return (\n    <form action={subscribeAction}>\n      <input name=\"email\" type=\"email\" required placeholder=\"you@mail.com\" />\n      <button type=\"submit\">Subscribe</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q2: [MID] FormData — forgetting name attribute is bug #1",
            "explain": "In simple words:\nWithout name= field does NOT appear in FormData.\nControlled value={state} is separate topic; Action + FormData = uncontrolled-ish fields.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "async function debugFormData(formData) {\n  // See all entries (teaching)\n  for (const [key, value] of formData.entries()) {\n    console.log(key, value);\n  }\n}\n\nexport function DebugFieldsForm() {\n  return (\n    <form action={debugFormData}>\n      <input name=\"title\" defaultValue=\"Hello\" />\n      {/* name missing → not in FormData */}\n      <input defaultValue=\"ghost\" />\n      <button type=\"submit\">Dump</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q3: Multiple buttons — formAction",
            "explain": "In simple words:\nCommon action on form; formAction={otherFn} on a button.\nWhichever button you click, its action runs.\nIntent (save vs delete) stays clean in separate functions.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "async function saveDraft(formData) {\n  console.log(\"save\", formData.get(\"body\"));\n}\n\nasync function publishPost(formData) {\n  console.log(\"publish\", formData.get(\"body\"));\n}\n\nexport function PostFormTwoActions() {\n  return (\n    <form action={saveDraft}>\n      <textarea name=\"body\" defaultValue=\"Draft text\" />\n      <button type=\"submit\">Save draft</button>\n      <button type=\"submit\" formAction={publishPost}>\n        Publish\n      </button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q4: Validation inside Action + return value idea",
            "explain": "In simple words:\nAction can return something — useActionState turns it into state (file 30).\nHere simple: early return / throw. Error boundaries / hooks later.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "async function loginAction(formData) {\n  const user = String(formData.get(\"user\") || \"\");\n  const pass = String(formData.get(\"pass\") || \"\");\n  if (!user || !pass) {\n    return { ok: false, error: \"Empty fields\" };\n  }\n  // await api.login(...)\n  return { ok: true, error: null };\n}\n\nexport function LoginFormActionOnly() {\n  return (\n    <form action={loginAction}>\n      <input name=\"user\" />\n      <input name=\"pass\" type=\"password\" />\n      <button type=\"submit\">Login</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q5: [MID] Old onSubmit vs new action — when to use which?",
            "explain": "In simple words:\nonSubmit still valid — complex client validation, multi-step wizards.\naction = server/FormData-first flows, pending UX with React 19 hooks.\nDo not mix blindly; follow team convention.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function OldStyleStillWorks() {\n  const [status, setStatus] = useState(\"idle\");\n\n  async function onSubmit(e) {\n    e.preventDefault();\n    const data = new FormData(e.currentTarget);\n    setStatus(\"saving\");\n    // await api(data)\n    setStatus(\"done\");\n    console.log([...data.entries()], status);\n  }\n\n  return (\n    <form onSubmit={onSubmit}>\n      <input name=\"note\" />\n      <button type=\"submit\">Save (legacy style)</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q6: Reset / defaultValue after submit",
            "explain": "In simple words:\nUncontrolled inputs start at defaultValue.\nAfter successful Action need reset: key change or\ncontrolled reset pattern via useActionState (file 30).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function FormWithKeyReset({ version }) {\n  return (\n    <form key={version} action={subscribeAction}>\n      <input name=\"email\" />\n      <button type=\"submit\">Go</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q7: file input + FormData",
            "explain": "In simple words:\n<input type=\"file\" name=\"avatar\" /> → formData.get('avatar') File object.\nMultipart upload natural fit in Action.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "async function uploadAvatar(formData) {\n  const file = formData.get(\"avatar\");\n  if (file && file instanceof File) {\n    console.log(file.name, file.size);\n  }\n}\n\nexport function AvatarUploadForm() {\n  return (\n    <form action={uploadAvatar}>\n      <input type=\"file\" name=\"avatar\" accept=\"image/*\" />\n      <button type=\"submit\">Upload</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q8: [MID] Progressive enhancement (mental model)",
            "explain": "In simple words:\nIdeal: form works before JS too (server action / native action URL).\nSPA-only apps often require JS — still keep FormData mindset.\nNext.js Server Actions strengthen this story (file 38).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const progressiveIdea = {\n  withoutJS: \"browser posts to URL / server action endpoint\",\n  withJS: \"React enhances — pending UI, no full reload\",\n};"
          },
          {
            "title": "Q9: [MID] action + onSubmit on same form — trap",
            "explain": "Task:\nDo not blindly mix action={fn} and onSubmit={fn} on one form.\n\nIn simple words:\nBoth may fire — double submit / confusing flow.\nReact 18 style onSubmit OR React 19 action — pick one pattern per form.\nControlled live validation: onChange local; action enough for submit.\nCommon bug: preventDefault in onSubmit + action too → race.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function PickOnePatternForm() {\n  async function saveAction(formData) {\n    console.log(\"action path\", formData.get(\"note\"));\n  }\n  return (\n    <form action={saveAction}>\n      <input name=\"note\" defaultValue=\"via action only\" />\n      <button type=\"submit\">Save</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q10: Checkbox / radio FormData",
            "explain": "Task:\nSame name + different value for radios; checkbox only when checked.\n\nIn simple words:\nformData.get('color') — selected radio value.\nCheckbox: formData.get('agree') === 'on' or null.\nReact 18: manually read e.target.checked; Action path FormData is natural.\nEdge: unchecked checkbox missing from FormData — default false on server.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "async function prefsAction(formData) {\n  const color = formData.get(\"color\");\n  const agree = formData.get(\"agree\") === \"on\";\n  return { color, agree };\n}\n\nexport function PrefsForm() {\n  return (\n    <form action={prefsAction}>\n      <label>\n        <input type=\"radio\" name=\"color\" value=\"red\" defaultChecked /> Red\n      </label>\n      <label>\n        <input type=\"radio\" name=\"color\" value=\"blue\" /> Blue\n      </label>\n      <label>\n        <input type=\"checkbox\" name=\"agree\" /> I agree\n      </label>\n      <button type=\"submit\">Save prefs</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q11: [MID] Select + textarea FormData",
            "explain": "Task:\nname attribute on select/textarea; formData.get('field').\n\nIn simple words:\nControlled select was common in React 18 with value={state}.\nAction path: defaultValue + name — uncontrolled FormData submit.\nMulti-select: formData.getAll('tags') array values.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "async function noteAction(formData) {\n  const category = formData.get(\"category\");\n  const body = formData.get(\"body\");\n  const tags = formData.getAll(\"tags\");\n  return { category, body, tags };\n}\n\nexport function NoteForm() {\n  return (\n    <form action={noteAction}>\n      <select name=\"category\" defaultValue=\"work\">\n        <option value=\"work\">Work</option>\n        <option value=\"personal\">Personal</option>\n      </select>\n      <textarea name=\"body\" defaultValue=\"Hello\" />\n      <button type=\"submit\">Save note</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q12: Hidden fields + intent pattern",
            "explain": "Task:\ntype=\"hidden\" name=\"id\" value={id} — give action context without UI.\n\nIn simple words:\nDelete/edit buttons: hidden id + formAction or intent field.\nReact 18: id in onClick closure; Action: hidden field safer (FormData serializable).\nSecurity: do not trust hidden id on server — verify auth + ownership.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "async function deleteItemAction(formData) {\n  const id = formData.get(\"id\");\n  console.log(\"delete\", id);\n}\n\nexport function DeleteItemForm({ itemId }) {\n  return (\n    <form action={deleteItemAction}>\n      <input type=\"hidden\" name=\"id\" value={itemId} />\n      <button type=\"submit\">Delete</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q13: [MID] Controlled input + Action — mix carefully",
            "explain": "Task:\nIf value={state} controlled, FormData gets that value — sync name + onChange.\n\nIn simple words:\nPure Action/uncontrolled: defaultValue + name, no value prop.\nControlled + Action: possible but onChange updates state; submit FormData uses current DOM value.\nTrap: value={state} without onChange → stale FormData on submit.\nReact 18 controlled forms: onSubmit + state; 19: mix only when team convention clear.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function ControlledActionMix() {\n  const [title, setTitle] = useState(\"\");\n  async function save(formData) {\n    console.log(\"submitted\", formData.get(\"title\"));\n  }\n  return (\n    <form action={save}>\n      <input\n        name=\"title\"\n        value={title}\n        onChange={(e) => setTitle(e.target.value)}\n      />\n      <button type=\"submit\">Save</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q14: formAction on input type=\"submit\" image buttons",
            "explain": "Task:\nMultiple submit buttons — each can have different formAction.\n\nIn simple words:\nOld HTML pattern; first-class in React 19.\nname/value from submit button also go to FormData (intent detection).\nReact 18: check e.nativeEvent.submitter in one handler.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "async function archiveAction(formData) {\n  console.log(\"archive\", formData.get(\"title\"));\n}\n\nexport function DualSubmitForm() {\n  return (\n    <form action={saveDraft}>\n      <input name=\"title\" defaultValue=\"Post\" />\n      <button type=\"submit\">Save draft</button>\n      <button type=\"submit\" formAction={archiveAction}>\n        Archive\n      </button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q15: [MID] Action throw vs return error",
            "explain": "Task:\nthrow → error boundary / framework error UI; return { error } → useActionState friendly.\n\nIn simple words:\nPick one pattern in team — mixed throw/return is confusing UX.\nReact 18 onSubmit: try/catch + setError manual.\nReact 19: return { ok: false, error: '...' } with useActionState is clean.\nServer Actions: prefer return error object for form validation messages.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "async function riskyAction(formData) {\n  const x = formData.get(\"x\");\n  if (!x) return { ok: false, error: \"Missing x\" };\n  return { ok: true, error: null };\n}\n\nexport function ErrorReturnForm() {\n  return (\n    <form action={riskyAction}>\n      <input name=\"x\" />\n      <button type=\"submit\">Go</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q16: form encType multipart — file uploads",
            "explain": "Task:\nWith file input FormData is naturally multipart; fetch body: formData.\n\nIn simple words:\nBrowser handles encType default with file input.\nReact 18: FormData manually from onSubmit; same data auto in Action.\nEdge: empty file input — empty File or skip; server validate size/type.\nWhen NOT Action: chunked/resumable upload custom protocol → dedicated API.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "async function uploadDocsAction(formData) {\n  const doc = formData.get(\"doc\");\n  if (doc instanceof File && doc.size > 0) {\n    console.log(\"upload\", doc.name, doc.size);\n  }\n}\n\nexport function DocUploadForm() {\n  return (\n    <form action={uploadDocsAction}>\n      <input type=\"file\" name=\"doc\" accept=\".pdf\" />\n      <button type=\"submit\">Upload</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q17: [MID] Action outside form — startTransition pattern",
            "explain": "Task:\nAction mental model beyond <form> — button onClick + transition.\n\nIn simple words:\nActions not limited to <form> — any async user intent.\nReact 18: startTransition(async () => ...) bridge.\nReact 19: useActionState also works with non-form triggers (advanced).\nInterview: \"Action = async function handling user submission/intent\".",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function NonFormActionIdea() {\n  return (\n    <p>\n      Forms use action=; buttons can use useActionState wrapper or startTransition\n      for same pending UX without form element.\n    </p>\n  );\n}"
          },
          {
            "title": "Q18: disabled submit while pending — without useActionState",
            "explain": "Task:\nOnly action={fn} without hook — pending UI manually or useFormStatus child.\n\nIn simple words:\nReact 18: useState loading around submit.\nReact 19 minimal: child SubmitButton with useFormStatus (file 31).\nTrap: action is slow but button enabled — double submit risk.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function PendingViaChild() {\n  return (\n    <form action={saveDraft}>\n      <input name=\"body\" />\n      <SubmitHint />\n    </form>\n  );\n}\n\nfunction SubmitHint() {\n  // teaching: useFormStatus would go here (file 31)\n  return <button type=\"submit\">Save</button>;\n}"
          },
          {
            "title": "Q19: [ADV] formData.get vs getAll vs has",
            "explain": "Task:\nget = first value; getAll = all values; has = key exists?\n\nIn simple words:\nMulti-checkbox same name → getAll.\nMissing field → get returns null — wrap with String() in validation.\nReact 18 FormData same API — standard skill for Action path.\nCommon bug: get('items') when you need array → use getAll.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "async function cartFormAction(formData) {\n  const hasCoupon = formData.has(\"coupon\");\n  const items = formData.getAll(\"itemId\");\n  return { hasCoupon, items };\n}\n\nexport function CartFormFields() {\n  return (\n    <form action={cartFormAction}>\n      <input type=\"hidden\" name=\"itemId\" value=\"a\" />\n      <input type=\"hidden\" name=\"itemId\" value=\"b\" />\n      <input name=\"coupon\" placeholder=\"code\" />\n      <button type=\"submit\">Checkout</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q20: [MID] Migration — how to move onSubmit form to Action?",
            "explain": "Task:\nRemove e.preventDefault; make handler action={async (fd) => ...}.\n\nIn simple words:\nStep 1: FormData from e.currentTarget → formData arg direct.\nStep 2: loading state → useActionState / useFormStatus.\nStep 3: setError → return { error } from action.\nReact 18 code still runs — migrate gradually file by file.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const migrateOnSubmitSteps = [\n  \"remove preventDefault\",\n  \"move handler to action={fn}\",\n  \"replace loading useState with useActionState isPending\",\n  \"return errors instead of setError where possible\",\n];"
          },
          {
            "title": "Q21: [ADV] Security — do not put secrets in client Action",
            "explain": "Task:\nDo not embed API secret in browser action function — it is visible.\n\nIn simple words:\nClient Action → public API call with user token/session cookie OK.\nServer Action (file 38) → secrets safe on server.\nReact 18 same rule — not React 19 specific, but say in interview.\nValidate/sanitize FormData on server — client validation is convenience only.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const actionSecurityNote =\n  \"Client actions run in browser — no secrets; server validates all inputs.\";"
          },
          {
            "title": "Q22: [ADV] Interview trap — action sync function?",
            "explain": "Task:\nAction can be async; sync also works but pending UX short/invisible.\n\nIn simple words:\nAsync await network — isPending true for meaningful time.\nSync action: completes instantly — useFormStatus flash barely visible.\nReact 18 onSubmit sync vs async same; 19 pending hooks shine for async.\nformAction null/undefined → native HTML submit behavior (full page) possible.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "async function syncStyleAction(formData) {\n  return { ok: true, val: formData.get(\"q\") };\n}\n\nexport function SyncActionForm() {\n  return (\n    <form action={syncStyleAction}>\n      <input name=\"q\" />\n      <button type=\"submit\">Quick</button>\n    </form>\n  );\n}"
          }
        ]
      },
      {
        "file": "30_React19_useActionState.jsx",
        "title": "30 — useActionState",
        "kya": "After form submit UI must show:",
        "detail": "30 — React 19 useActionState\nLevel: REACT19  |  Study order: do this file first, then the next in sequence\n\nSIMPLE: After form submit UI must show:\n\"what result came back?\", \"what was before?\", \"is it pending now?\"\n\nuseActionState = all three in one hook.\nOld name in experimental was useFormState; React 19 renamed to useActionState.\n\nThink counter machine: remembers old number (previous state),\npress button (action), show new number, pending while processing.\n\nSignature (concept):\n  const [state, formAction, isPending] = useActionState(action, initialState, permalink?)\n  action(previousState, formData) → nextState\n\nWHY: #1 React 19 forms hook in interviews.\nINTERVIEW: why previous state is passed; isPending; error object return pattern.",
        "intro": "30 — React 19 useActionState\nLevel: REACT19  |  Study order: do this file first, then the next in sequence\n\nSIMPLE: After form submit UI must show:\n\"what result came back?\", \"what was before?\", \"is it pending now?\"\n\nuseActionState = all three in one hook.\nOld name in experimental was useFormState; React 19 renamed to useActionState.\n\nThink counter machine: remembers old number (previous state),\npress button (action), show new number, pending while processing.\n\nSignature (concept):\n  const [state, formAction, isPending] = useActionState(action, initialState, permalink?)\n  action(previousState, formData) → nextState\n\nWHY: #1 React 19 forms hook in interviews.\nINTERVIEW: why previous state is passed; isPending; error object return pattern.",
        "questions": [
          {
            "title": "Q1: Basic counter with previous state",
            "explain": "In simple words:\nFirst arg of action = current state so far.\nSecond = FormData (form fields).\nReturn = new state bound to UI.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "async function addOne(prevCount, _formData) {\n  // simulate network\n  await new Promise((r) => setTimeout(r, 300));\n  return prevCount + 1;\n}\n\nexport function CounterWithActionState() {\n  const [count, formAction, isPending] = useActionState(addOne, 0);\n\n  return (\n    <form action={formAction}>\n      <p>Count: {count}</p>\n      <button type=\"submit\" disabled={isPending}>\n        {isPending ? \"...\" : \"+1\"}\n      </button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q2: [MID] Message form — success / error in state object",
            "explain": "In simple words:\nState is not only number — return object { error, message }.\nUI shows alert from object. Use prev to keep/clear old message.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "async function sendMessage(prev, formData) {\n  const text = String(formData.get(\"text\") || \"\").trim();\n  if (!text) {\n    return { ...prev, error: \"Empty message\", ok: false };\n  }\n  // await api.send(text)\n  return { message: text, error: null, ok: true };\n}\n\nexport function MessageForm() {\n  const [state, formAction, isPending] = useActionState(sendMessage, {\n    message: \"\",\n    error: null,\n    ok: false,\n  });\n\n  return (\n    <form action={formAction}>\n      <input name=\"text\" placeholder=\"Type...\" />\n      <button type=\"submit\" disabled={isPending}>\n        Send\n      </button>\n      {state.error && <p role=\"alert\">{state.error}</p>}\n      {state.ok && <p>Sent: {state.message}</p>}\n    </form>\n  );\n}"
          },
          {
            "title": "Q3: isPending — button disable + label",
            "explain": "In simple words:\nisPending true until action Promise settles.\nBuilt-in signal to stop double-submit — less separate useState('loading').",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "async function slowSave(prev, formData) {\n  await new Promise((r) => setTimeout(r, 1000));\n  return { last: formData.get(\"title\"), savedAt: Date.now() };\n}\n\nexport function SlowSaveForm() {\n  const [state, formAction, isPending] = useActionState(slowSave, { last: null });\n\n  return (\n    <form action={formAction}>\n      <input name=\"title\" />\n      <button disabled={isPending}>{isPending ? \"Saving...\" : \"Save\"}</button>\n      <pre>{JSON.stringify(state)}</pre>\n    </form>\n  );\n}"
          },
          {
            "title": "Q4: [MID] Why is previous state important?",
            "explain": "In simple words:\nSometimes new state depends on old (increment, append list).\nSometimes on error keep old good data.\nThink action as pure function: (prev, formData) => next",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "async function appendTodo(prev, formData) {\n  const title = String(formData.get(\"title\") || \"\").trim();\n  if (!title) return prev;\n  return [...prev, { id: crypto.randomUUID(), title }];\n}\n\nexport function TodoActionList() {\n  const [todos, formAction, isPending] = useActionState(appendTodo, []);\n\n  return (\n    <div>\n      <form action={formAction}>\n        <input name=\"title\" />\n        <button disabled={isPending}>Add</button>\n      </form>\n      <ul>\n        {todos.map((t) => (\n          <li key={t.id}>{t.title}</li>\n        ))}\n      </ul>\n    </div>\n  );\n}"
          },
          {
            "title": "Q5: formAction on button too (same hook)",
            "explain": "In simple words:\nformAction from useActionState — form action= OR button formAction=\nSame pending/state pipeline both places.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "async function like(prev) {\n  return { ...prev, likes: prev.likes + 1 };\n}\nasync function unlike(prev) {\n  return { ...prev, likes: Math.max(0, prev.likes - 1) };\n}\n\nexport function LikeUnlike() {\n  const [state, formAction, isPending] = useActionState(like, { likes: 0 });\n  // Note: unlike needs separate useActionState for separate action fn —\n  // teaching: one formAction primarily binds to the hook's action.\n  // Multiple actions → often separate hooks OR one action that branches on formData.\n  return (\n    <form action={formAction}>\n      <span>{state.likes}</span>\n      <button disabled={isPending}>Like</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q6: Branch inside ONE action via hidden/intent field",
            "explain": "In simple words:\nPractical pattern: formData.get('intent') === 'delete' | 'save'\nOne useActionState, multiple buttons with name=\"intent\" value=...",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "async function cartAction(prev, formData) {\n  const intent = formData.get(\"intent\");\n  const id = formData.get(\"id\");\n  if (intent === \"add\") {\n    return { ...prev, items: [...prev.items, id] };\n  }\n  if (intent === \"clear\") {\n    return { ...prev, items: [] };\n  }\n  return prev;\n}\n\nexport function CartIntentForm() {\n  const [state, formAction] = useActionState(cartAction, { items: [] });\n  return (\n    <form action={formAction}>\n      <button name=\"intent\" value=\"add\">\n        Add\n      </button>\n      <input type=\"hidden\" name=\"id\" value=\"sku-1\" />\n      <button name=\"intent\" value=\"clear\">\n        Clear\n      </button>\n      <p>Items: {state.items.join(\", \")}</p>\n    </form>\n  );\n}"
          },
          {
            "title": "Q7: [MID] useActionState vs useState + onSubmit",
            "explain": "In simple words:\nuseState: you sync pending/error/data yourself.\nuseActionState: action return = source of truth; isPending free.\nComplex multi-field live validation → mix with local useState OK.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const compare = {\n  useStateSubmit: \"full control, more boilerplate\",\n  useActionState: \"form-centric async state machine\",\n};"
          },
          {
            "title": "Q8: Initial state + reset feel",
            "explain": "In simple words:\ninitialState only seeds first render.\n\"Form reset\" = action returns empty object, or component key remount.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "async function resettable(prev, formData) {\n  if (formData.get(\"intent\") === \"reset\") {\n    return { name: \"\", note: \"reset done\" };\n  }\n  return { name: formData.get(\"name\"), note: \"saved\" };\n}\n\nexport function ResettableProfile() {\n  const [state, formAction, isPending] = useActionState(resettable, {\n    name: \"\",\n    note: \"idle\",\n  });\n  return (\n    <form action={formAction}>\n      <input name=\"name\" defaultValue={state.name || \"\"} />\n      <button name=\"intent\" value=\"save\" disabled={isPending}>\n        Save\n      </button>\n      <button name=\"intent\" value=\"reset\" type=\"submit\">\n        Reset state\n      </button>\n      <p>{state.note}</p>\n    </form>\n  );\n}"
          },
          {
            "title": "Q9: [MID] permalink arg (3rd param) — mental model",
            "explain": "Task:\nuseActionState(action, initial, permalink?) — shareable URL state idea (frameworks).\n\nIn simple words:\nOptional 3rd arg — some setups hydrate form state from URL.\nPlain Vite SPA often skip; check Next/docs if used.\nReact 18 had no built-in equivalent — new optional surface.\nTrap: pass permalink without framework support — nothing happens.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const permalinkNote =\n  \"3rd arg optional — framework-dependent shareable form state; often omitted in SPA.\";"
          },
          {
            "title": "Q10: Action throw — error handling",
            "explain": "Task:\nthrow new Error('...') vs return { error: '...' } — team convention.\n\nIn simple words:\nthrow → error boundary / unhandled depending on setup.\nreturn error object → show state.error in UI (preferred for forms).\nReact 18: try/catch in onSubmit; same choice.\nuseActionState: return pattern more predictable form UX.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "async function throwOrReturn(prev, formData) {\n  const fail = formData.get(\"fail\") === \"on\";\n  if (fail) return { ...prev, error: \"Validation failed\", ok: false };\n  return { ...prev, error: null, ok: true };\n}\n\nexport function ThrowOrReturnForm() {\n  const [state, formAction, isPending] = useActionState(throwOrReturn, {\n    error: null,\n    ok: false,\n  });\n  return (\n    <form action={formAction}>\n      <label>\n        <input type=\"checkbox\" name=\"fail\" /> Force fail\n      </label>\n      <button disabled={isPending}>Submit</button>\n      {state.error && <p role=\"alert\">{state.error}</p>}\n    </form>\n  );\n}"
          },
          {
            "title": "Q11: [MID] Optimistic + useActionState combo (file 32 link)",
            "explain": "Task:\naddOptimistic inside action; real state updated from action return.\n\nIn simple words:\nuseActionState = source of truth after settle.\nuseOptimistic = instant overlay during pending.\nReact 18: manual temp state + rollback on error.\nOrder: optimistic call → await API → return new state OR keep prev on fail.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function OptimisticActionStateIdea() {\n  return (\n    <p>\n      Pattern: useOptimistic(state from useActionState) + action calls addOptimistic\n      before await — see file 32 for full example.\n    </p>\n  );\n}"
          },
          {
            "title": "Q12: Multiple useActionState on one page",
            "explain": "Task:\nSeparate forms / separate hooks — one hook binds one action function.\n\nIn simple words:\nTwo forms = two useActionState calls — do not mix state.\nReact 18: separate useState blocks same idea.\nTrap: one formAction on two forms — both wrongly share same state machine.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "async function profileAction(prev, formData) {\n  return { name: formData.get(\"name\") };\n}\nasync function settingsAction(prev, formData) {\n  return { theme: formData.get(\"theme\") };\n}\n\nexport function TwoFormsTwoHooks() {\n  const [profile, profileActionFn] = useActionState(profileAction, { name: \"\" });\n  const [settings, settingsActionFn] = useActionState(settingsAction, {\n    theme: \"light\",\n  });\n  return (\n    <div>\n      <form action={profileActionFn}>\n        <input name=\"name\" />\n        <button>Save profile</button>\n        <p>{profile.name}</p>\n      </form>\n      <form action={settingsActionFn}>\n        <select name=\"theme\" defaultValue=\"light\">\n          <option value=\"light\">Light</option>\n          <option value=\"dark\">Dark</option>\n        </select>\n        <button>Save settings</button>\n        <p>{settings.theme}</p>\n      </form>\n    </div>\n  );\n}"
          },
          {
            "title": "Q13: [MID] Server Action as useActionState action (file 38)",
            "explain": "Task:\naction param = imported 'use server' function — pending on client, mutate on server.\n\nIn simple words:\nClient component: useActionState(serverLogin, initial).\nReact 18: onSubmit + fetch API route manually.\nSecurity: server function validates — prev state safe to assume on client.\nMigration: API route handler body → server action + same useActionState hook.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const serverActionCombo =\n  \"useActionState(serverFn, initial) — client pending UI, server mutation.\";"
          },
          {
            "title": "Q14: isPending vs form submitting — double guard",
            "explain": "Task:\nisPending + useFormStatus.pending — redundant on same form but OK.\n\nIn simple words:\nisPending: for this hook's action.\nuseFormStatus: nearest form submission (child).\nSame form usually same timing — pick one for simplicity.\nReact 18: single loading boolean enough.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function PendingBothSources() {\n  const [state, formAction, isPending] = useActionState(slowSave, { last: null });\n  return (\n    <form action={formAction}>\n      <input name=\"title\" />\n      <button disabled={isPending}>\n        {isPending ? \"Saving...\" : \"Save\"}\n      </button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q15: [MID] Stale prev in rapid double submit",
            "explain": "Task:\nTwo quick submits — action (prev) generally queued sequentially by React.\n\nIn simple words:\nFunctional prev in action reliable for increment-style updates.\nNetwork race separate — last response wins if you do not merge manually.\nReact 18 useState functional updates same lesson.\nGuard: disabled={isPending} best first fix.\nEdge: parallel actions different hooks — independent state machines.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "async function safeIncrement(prev) {\n  await new Promise((r) => setTimeout(r, 200));\n  return prev + 1;\n}\n\nexport function SafeIncrementForm() {\n  const [n, formAction, isPending] = useActionState(safeIncrement, 0);\n  return (\n    <form action={formAction}>\n      <p>{n}</p>\n      <button disabled={isPending}>+1</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q16: useActionState initial state type — object immutability",
            "explain": "Task:\nreturn { ...prev, field } — do not mutate prev.\n\nIn simple words:\nprev.push(x); return prev ❌ — same reference, React may skip.\nreturn [...prev, x] ✅ arrays; spread objects ✅.\nReact 18 useState same immutability rules.\nCommon bug: prev.items.push(newItem) without new array reference.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "async function immutableAppend(prev, formData) {\n  const item = String(formData.get(\"item\") || \"\");\n  if (!item) return prev;\n  return { ...prev, items: [...prev.items, item] };\n}\n\nexport function ImmutableListForm() {\n  const [state, formAction] = useActionState(immutableAppend, { items: [] });\n  return (\n    <form action={formAction}>\n      <input name=\"item\" />\n      <button>Add</button>\n      <ul>\n        {state.items.map((x, i) => (\n          <li key={i}>{x}</li>\n        ))}\n      </ul>\n    </form>\n  );\n}"
          },
          {
            "title": "Q17: [MID] useFormState → useActionState rename migration",
            "explain": "Task:\nOld blogs say useFormState — React 19 renamed to useActionState.\n\nIn simple words:\nSame API shape [state, action, isPending] — only name changed.\nCodemods / search-replace during upgrade.\nInterview trap: say \"useFormState\" → correct to useActionState in 19.\nReact 18 canary had experimental name — production 19 stable name.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const renameNote = \"useFormState (old/canary) → useActionState (React 19 stable).\";"
          },
          {
            "title": "Q18: Action without FormData — button-only forms",
            "explain": "Task:\nEmpty form or button only — formData empty; work from prev state.\n\nIn simple words:\nincrementAction(prev, formData) — ignoring formData OK.\nReact 18 onClick increment separate; form action works too.\nHidden fields optional when server needs context.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "async function tick(prev) {\n  return prev + 1;\n}\n\nexport function TickForm() {\n  const [n, formAction, isPending] = useActionState(tick, 0);\n  return (\n    <form action={formAction}>\n      <span>{n}</span>\n      <button disabled={isPending}>Tick</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q19: [ADV] Custom wrapper hook pattern",
            "explain": "Task:\nuseLoginForm() internally useActionState(loginAction, initial) — encapsulate.\n\nIn simple words:\nClean team API: const { state, formAction, isPending } = useLoginForm().\nReact 18: useSubmitLogin custom hook with useState same idea.\nRules: custom hook name use*; action function outside or module level.\nTest: action pure-ish (prev, fd) => next easy to unit test.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function useLoginForm() {\n  async function login(prev, formData) {\n    const email = String(formData.get(\"email\") || \"\");\n    if (!email.includes(\"@\")) return { ...prev, error: \"Bad email\" };\n    return { error: null, ok: true };\n  }\n  return useActionState(login, { error: null, ok: false });\n}\n\nexport function LoginWrapperForm() {\n  const [state, formAction, isPending] = useLoginForm();\n  return (\n    <form action={formAction}>\n      <input name=\"email\" type=\"email\" />\n      <button disabled={isPending}>Login</button>\n      {state.error && <p>{state.error}</p>}\n    </form>\n  );\n}"
          },
          {
            "title": "Q20: [MID] When NOT useActionState",
            "explain": "Task:\nNon-form async (websocket), global store, TanStack Query — different tools.\n\nIn simple words:\nForm submit centric flows = sweet spot.\nReal-time chat messages — Query/mutation better.\nReact 18 useReducer + onSubmit still fine for complex wizards.\nMulti-step wizard with local-only steps — useState until final submit.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const whenNotUseActionState = [\n  \"non-form async workflows\",\n  \"server cache via TanStack Query\",\n  \"global Redux/Zustand mutations\",\n  \"complex wizard mostly client-side\",\n];"
          },
          {
            "title": "Q21: [ADV] Testing action function in isolation",
            "explain": "Task:\nawait myAction(prev, fakeFormData) — without component render.\n\nIn simple words:\nFormData in test: new FormData(); fd.append('x','1').\nAssert return value === expected next state.\nReact 18: extract onSubmit handler similarly testable.\nIntegration: RTL fireEvent submit with form — E2E optional.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "async function testableAction(prev, formData) {\n  const n = Number(formData.get(\"n\") || 0);\n  return prev + n;\n}\n\nexport const testableActionExport = testableAction; // for unit tests"
          },
          {
            "title": "Q22: [ADV] Interview — useActionState one-liner + traps",
            "explain": "Task:\n\"[state, formAction, isPending] — action(prev, FormData) => nextState\"\n\nIn simple words:\nTrap 1: mutate prev — breaks immutability.\nTrap 2: useFormState name outdated.\nTrap 3: ignore isPending → double submit.\nTrap 4: return undefined — state becomes undefined; always return prev or next.\nReact 18 contrast: manual loading/error states around onSubmit.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const useActionStateTraps = [\n  \"mutating prev\",\n  \"wrong hook name useFormState in 19\",\n  \"ignoring isPending\",\n  \"returning undefined accidentally\",\n];"
          }
        ]
      },
      {
        "file": "31_React19_useFormStatus.jsx",
        "title": "31 — useFormStatus",
        "kya": "The parent form is submitting — the child button should know",
        "detail": "31 — React 19 useFormStatus (react-dom)\nLevel: REACT19  |  Study in order: read this file first, then the next number\n\nSIMPLE: The parent form is submitting — the child button should know\nwhether it is \"pending\" without prop drilling.\n\nuseFormStatus() comes from react-dom; it reads the NEAREST parent <form> status.\nYou get pending, data, method, and action fields.\n\nVERY IMPORTANT rule:\nDo NOT call this hook in the same component that renders the <form> —\ncall it in a CHILD component that is INSIDE the form.\n\nThink of it this way: form = restaurant; useFormStatus = waiter who sees the kitchen light and\nsays \"order preparing\" — the waiter is child staff standing outside the kitchen.\n\nWHY: Submit button UX without lifting state.\nINTERVIEW: why it does not work in the form component itself; react vs react-dom import.",
        "intro": "31 — React 19 useFormStatus (react-dom)\nLevel: REACT19  |  Study in order: read this file first, then the next number\n\nSIMPLE: The parent form is submitting — the child button should know\nwhether it is \"pending\" without prop drilling.\n\nuseFormStatus() comes from react-dom; it reads the NEAREST parent <form> status.\nYou get pending, data, method, and action fields.\n\nVERY IMPORTANT rule:\nDo NOT call this hook in the same component that renders the <form> —\ncall it in a CHILD component that is INSIDE the form.\n\nThink of it this way: form = restaurant; useFormStatus = waiter who sees the kitchen light and\nsays \"order preparing\" — the waiter is child staff standing outside the kitchen.\n\nWHY: Submit button UX without lifting state.\nINTERVIEW: why it does not work in the form component itself; react vs react-dom import.",
        "questions": [
          {
            "title": "Q1: Child SubmitButton with pending",
            "explain": "In simple words:\nSubmitButton is a separate component — inside the form.\npending true → disable + \"Saving...\"",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function SubmitButton() {\n  const { pending } = useFormStatus();\n  return (\n    <button type=\"submit\" disabled={pending}>\n      {pending ? \"Saving...\" : \"Save\"}\n    </button>\n  );\n}\n\nasync function saveAction(formData) {\n  await new Promise((r) => setTimeout(r, 800));\n  console.log(\"saved\", formData.get(\"title\"));\n}\n\nexport function ArticleForm() {\n  return (\n    <form action={saveAction}>\n      <input name=\"title\" />\n      <SubmitButton />\n    </form>\n  );\n}"
          },
          {
            "title": "Q2: [MID] Wrong place call — common bug",
            "explain": "In simple words:\nIf you write useFormStatus directly inside ArticleForm (along with the form),\npending is often always false / useless — because status is for the PARENT form,\nnot your own form per this render tree rule.\nFix: button (or any child) as a separate function component.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function WrongPlaceDemo_DoNotCopy() {\n  // ❌ Don't: const { pending } = useFormStatus(); here with <form> below\n  return (\n    <form action={saveAction}>\n      <input name=\"title\" />\n      {/* ✅ Do: child component */}\n      <SubmitButton />\n    </form>\n  );\n}"
          },
          {
            "title": "Q3: pending + data — what is being submitted",
            "explain": "In simple words:\ndata = FormData while submit is in-flight.\nIn pending UI you can show \"Saving: {title}\".",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function StatusLine() {\n  const { pending, data } = useFormStatus();\n  if (!pending) return null;\n  const title = data?.get(\"title\");\n  return <p>Saving{title ? `: ${title}` : \"...\"}</p>;\n}\n\nexport function FormWithStatusLine() {\n  return (\n    <form action={saveAction}>\n      <input name=\"title\" />\n      <StatusLine />\n      <SubmitButton />\n    </form>\n  );\n}"
          },
          {
            "title": "Q4: method & action fields",
            "explain": "In simple words:\nmethod — get/post style info.\naction — function or URL the form is using.\nFor debugging / conditional UI.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function DebugStatus() {\n  const status = useFormStatus();\n  return (\n    <pre>\n      {JSON.stringify(\n        {\n          pending: status.pending,\n          method: status.method,\n          hasData: Boolean(status.data),\n          actionType: typeof status.action,\n        },\n        null,\n        2\n      )}\n    </pre>\n  );\n}\n\nexport function FormDebug() {\n  return (\n    <form action={saveAction}>\n      <input name=\"title\" />\n      <DebugStatus />\n      <SubmitButton />\n    </form>\n  );\n}"
          },
          {
            "title": "Q5: [MID] useFormStatus vs useActionState isPending",
            "explain": "In simple words:\nuseActionState.isPending — for that hook's action.\nuseFormStatus.pending — nearest form submission.\nButton only needs to show pending, not manage state — useFormStatus is enough.\nNeed state + errors — useActionState (file 30) + status child combo.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const whenToUse = {\n  useFormStatus: \"child UI reflecting form pending/data\",\n  useActionState: \"own the returned state machine\",\n};"
          },
          {
            "title": "Q6: Nested forms? Don't.",
            "explain": "In simple words:\nNested <form> is invalid in HTML.\nuseFormStatus looks at nearest parent form — nesting causes confusion.\nOne form, children components.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function OneFormManyChildren() {\n  return (\n    <form action={saveAction}>\n      <fieldset>\n        <input name=\"title\" />\n      </fieldset>\n      <StatusLine />\n      <SubmitButton />\n    </form>\n  );\n}"
          },
          {
            "title": "Q7: Disable whole fieldset while pending",
            "explain": "In simple words:\nFieldset disabled={pending} — all controls off.\nAccessibility-friendly busy state.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function BusyFields({ children }) {\n  const { pending } = useFormStatus();\n  return <fieldset disabled={pending}>{children}</fieldset>;\n}\n\nexport function FormBusyFieldset() {\n  return (\n    <form action={saveAction}>\n      <BusyFields>\n        <input name=\"title\" />\n        <input name=\"slug\" />\n      </BusyFields>\n      <SubmitButton />\n    </form>\n  );\n}"
          },
          {
            "title": "Q8: Import from 'react-dom' — remember",
            "explain": "In simple words:\nuseFormStatus is NOT from react, it is from react-dom.\nInterview trap: wrong package.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "// import { useFormStatus } from \"react-dom\"; // ✅\n// import { useFormStatus } from \"react\"; // ❌"
          },
          {
            "title": "Q9: formAction button — pending status",
            "explain": "Task:\nButton with formAction={otherFn} — useFormStatus tracks that submission.\n\nIn simple words:\nNearest form's active submission — which action is running.\nPress Publish and pending is true for that submit path.\nReact 18: manually track which button clicked via state.\nRead status in child component — not in parent.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "async function publishAction(formData) {\n  await new Promise((r) => setTimeout(r, 600));\n  console.log(\"publish\", formData.get(\"title\"));\n}\n\nfunction PublishButton() {\n  const { pending } = useFormStatus();\n  return (\n    <button type=\"submit\" formAction={publishAction} disabled={pending}>\n      {pending ? \"Publishing...\" : \"Publish\"}\n    </button>\n  );\n}\n\nexport function FormWithFormActionButton() {\n  return (\n    <form action={saveAction}>\n      <input name=\"title\" />\n      <SubmitButton />\n      <PublishButton />\n    </form>\n  );\n}"
          },
          {
            "title": "Q10: [MID] useFormStatus outside form — trap",
            "explain": "Task:\nuseFormStatus() outside form — no parent form → pending false / default.\n\nIn simple words:\nHook must be a form descendant (inside in DOM tree).\nIf button is inside form via Portal it is generally OK (check form association in docs).\nReact 18: N/A — hook did not exist; passed loading prop.\nFix: move component inside <form> or pass pending prop explicitly.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function OutsideFormTrap() {\n  return (\n    <div>\n      <p>If the status component were outside the form here, pending would not work</p>\n      <form action={saveAction}>\n        <input name=\"title\" />\n        <SubmitButton />\n      </form>\n    </div>\n  );\n}"
          },
          {
            "title": "Q11: Spinner component reusable pattern",
            "explain": "Task:\n<SubmitSpinner /> — drop-in pending indicator in every form.\n\nIn simple words:\nDesign system button wrapper with useFormStatus inside.\nReact 18: <Button loading={loading} /> prop from parent state.\nMust render INSIDE form — document in Storybook stories correctly.\naria-busy={pending} accessibility bonus.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function SubmitSpinner() {\n  const { pending } = useFormStatus();\n  if (!pending) return null;\n  return <span aria-live=\"polite\">Working…</span>;\n}\n\nexport function FormWithSpinner() {\n  return (\n    <form action={saveAction}>\n      <input name=\"title\" />\n      <SubmitSpinner />\n      <SubmitButton />\n    </form>\n  );\n}"
          },
          {
            "title": "Q12: [MID] data FormData — types during pending",
            "explain": "Task:\nWhen pending true use data?.get('field') — optional chaining.\n\nIn simple words:\ndata is null when not pending — check in UI.\nShow \"Saving draft: {title}\" during flight.\nReact 18: e.currentTarget FormData in submit handler once.\nEdge: file inputs in data — File object available during pending.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function SavingPreview() {\n  const { pending, data } = useFormStatus();\n  if (!pending || !data) return null;\n  const title = data.get(\"title\");\n  const slug = data.get(\"slug\");\n  return (\n    <p>\n      Saving {String(title)} ({String(slug)})\n    </p>\n  );\n}\n\nexport function FormSavingPreview() {\n  return (\n    <form action={saveAction}>\n      <input name=\"title\" defaultValue=\"My post\" />\n      <input name=\"slug\" defaultValue=\"my-post\" />\n      <SavingPreview />\n      <SubmitButton />\n    </form>\n  );\n}"
          },
          {
            "title": "Q13: Multiple forms on page — isolated status",
            "explain": "Task:\nTwo separate forms — each SubmitButton reads its nearest form status.\n\nIn simple words:\nForm A pending ≠ Form B pending — automatic isolation.\nReact 18: separate loading state per form manually.\nTrap: one shared SubmitButton between two forms — ambiguous parent.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function TwoFormsIsolated() {\n  return (\n    <div>\n      <form action={saveAction}>\n        <input name=\"title\" placeholder=\"Form A\" />\n        <SubmitButton />\n      </form>\n      <form action={publishAction}>\n        <input name=\"title\" placeholder=\"Form B\" />\n        <PublishButton />\n      </form>\n    </div>\n  );\n}"
          },
          {
            "title": "Q14: [MID] useFormStatus + useActionState together",
            "explain": "Task:\nParent: useActionState for state/errors; child: useFormStatus for button UX.\n\nIn simple words:\nComplementary — state machine in parent; pending UI in child without props.\nReact 18: lift isLoading to parent, pass to button.\nBoth pending flags usually stay in sync for same form — redundant but clean separation.\nInterview: \"status hook for presentation; action state for data\".",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "async function combinedSave(prev, formData) {\n  await new Promise((r) => setTimeout(r, 500));\n  return { saved: formData.get(\"title\"), error: null };\n}\n\nfunction CombinedSubmit() {\n  const { pending } = useFormStatus();\n  return (\n    <button type=\"submit\" disabled={pending}>\n      {pending ? \"...\" : \"Save\"}\n    </button>\n  );\n}\n\nexport function CombinedForm() {\n  const [state, formAction] = useActionState(combinedSave, {\n    saved: null,\n    error: null,\n  });\n  return (\n    <form action={formAction}>\n      <input name=\"title\" />\n      <CombinedSubmit />\n      {state.saved && <p>Saved: {state.saved}</p>}\n    </form>\n  );\n}"
          },
          {
            "title": "Q15: fieldset disabled={pending} — a11y",
            "explain": "Task:\nOn pending disable whole fieldset — prevent double entry.\n\nIn simple words:\nScreen readers should know busy state visually + functionally.\nReact 18: disabled={loading} on every input manually is tedious.\nReuse child wrapper BusyFields pattern (Q7).\nNote: disabled fields sometimes skip in FormData — check browser behavior for your fields.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function A11yBusyWrapper({ children }) {\n  const { pending } = useFormStatus();\n  return (\n    <fieldset disabled={pending} aria-busy={pending}>\n      {children}\n    </fieldset>\n  );\n}\n\nexport function A11yBusyForm() {\n  return (\n    <form action={saveAction}>\n      <A11yBusyWrapper>\n        <input name=\"title\" />\n        <textarea name=\"body\" />\n      </A11yBusyWrapper>\n      <SubmitButton />\n    </form>\n  );\n}"
          },
          {
            "title": "Q16: [MID] React 18 pattern contrast — prop drilling loading",
            "explain": "Task:\nOld: const [loading,setLoading]=useState; <Btn loading={loading} />.\n\nIn simple words:\nIt worked — just boilerplate + prop layers.\nReact 19 useFormStatus: colocate pending UI with button component.\nMigration: extract SubmitButton child, remove loading prop chain.\nWhen NOT: no form — for non-form buttons use useActionState.isPending.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function LegacyStyleButton({ loading }) {\n  return (\n    <button type=\"submit\" disabled={loading}>\n      {loading ? \"Saving...\" : \"Save\"}\n    </button>\n  );\n}\n\nexport function LegacyStyleForm() {\n  const [loading, setLoading] = useState(false);\n  async function onSubmit(e) {\n    e.preventDefault();\n    setLoading(true);\n    await saveAction(new FormData(e.currentTarget));\n    setLoading(false);\n  }\n  return (\n    <form onSubmit={onSubmit}>\n      <input name=\"title\" />\n      <LegacyStyleButton loading={loading} />\n    </form>\n  );\n}"
          },
          {
            "title": "Q17: method field — get vs post mental model",
            "explain": "Task:\nuseFormStatus().method — reflects form method attribute.\n\nIn simple words:\naction={fn} in React apps is usually programmatic — method mostly feels like 'post'.\nDebugging: log method + action type in dev tools component.\nReact 18: same HTML form attributes.\nFor progressive enhancement native action URL, method matters.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function MethodDebug() {\n  const { method, pending } = useFormStatus();\n  return (\n    <small>\n      method={method} pending={String(pending)}\n    </small>\n  );\n}\n\nexport function FormMethodDebug() {\n  return (\n    <form action={saveAction} method=\"post\">\n      <input name=\"title\" />\n      <MethodDebug />\n      <SubmitButton />\n    </form>\n  );\n}"
          },
          {
            "title": "Q18: [ADV] Custom element / design system integration",
            "explain": "Task:\n<DSButton type=\"submit\"> with useFormStatus inside — must be in form subtree.\n\nIn simple words:\nCheck Shadow DOM boundaries — rare breaks.\nReact 18: loading prop API on design system.\nReact 19: internal useFormStatus in DS SubmitButton implementation.\nExport DS component docs: \"must be child of form\".",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function DesignSystemNote() {\n  return (\n    <p>\n      Design system SubmitButton should call useFormStatus internally and document\n      that it must render inside a form.\n    </p>\n  );\n}"
          },
          {
            "title": "Q19: [MID] Server Action form — useFormStatus still works",
            "explain": "Task:\naction={serverAction} on client form — pending tracked on client.\n\nIn simple words:\nNetwork goes to server — pending true until response.\nReact 18 + server: manual fetch pending.\nSlow server action: fieldset disable is critical — avoid double POST.\nError display: useActionState state.error + useFormStatus pending combo.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const serverFormStatus =\n  \"useFormStatus tracks client-side submission lifecycle for server actions too.\";"
          },
          {
            "title": "Q20: Pending false immediately — sync action flash",
            "explain": "Task:\nVery fast sync action — pending UI blink barely visible.\n\nIn simple words:\nNormal for trivial actions — do not over-engineer spinner.\nReact 18 same — setLoading(true/false) invisible in sync code.\nUX: minimum 300ms spinner optional pattern (debate — artificial delay usually bad).\nInterview: pending is meaningful for async I/O bound actions.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "async function instantAction(formData) {\n  return formData.get(\"x\");\n}\n\nfunction InstantSubmit() {\n  const { pending } = useFormStatus();\n  return <button disabled={pending}>{pending ? \"...\" : \"Go\"}</button>;\n}\n\nexport function InstantForm() {\n  return (\n    <form action={instantAction}>\n      <input name=\"x\" defaultValue=\"1\" />\n      <InstantSubmit />\n    </form>\n  );\n}"
          },
          {
            "title": "Q21: [ADV] When NOT useFormStatus",
            "explain": "Task:\nNon-form async, useActionState.isPending alone is enough, no form element.\n\nIn simple words:\nClick handler mutation without form — useActionState or useTransition.\nParent needs pending of specific non-form action — status hook will not help.\nReact 18: local useState always.\nMultiple coordinated pending flags — broader state machine.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const whenNotFormStatus = [\n  \"no form element involved\",\n  \"only parent owns action via useActionState — isPending enough\",\n  \"global app loading overlay\",\n];"
          },
          {
            "title": "Q22: [ADV] Interview traps checklist",
            "explain": "Task:\nRemember 4 traps: wrong import, wrong place, outside form, nested forms.\n\nIn simple words:\n1) react not react-dom 2) same component as form 3) not descendant 4) nested form invalid\nReact 18 contrast: prop drilling loading state was the alternative.\nFix always: extract child function component inside form.\nBonus: calling useFormStatus in form component → pending stuck false classic bug.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export const useFormStatusTraps = [\n  \"import from react instead of react-dom\",\n  \"call in same component that renders form\",\n  \"component outside form tree\",\n  \"invalid nested forms\",\n];"
          }
        ]
      },
      {
        "file": "32_React19_useOptimistic.jsx",
        "title": "32 — useOptimistic",
        "kya": "Optimistic UI = show success in the UI first, then let the API confirm later.",
        "detail": "32 — React 19 useOptimistic\nLevel: REACT19  |  Study in order: read this file first, then the next number\n\nSIMPLE: Optimistic UI = show success in the UI first, then let the API confirm later.\nLike a WhatsApp message appearing in the list before the double tick.\nIf the API fails → rollback (old state).\n\nuseOptimistic(state, updateFn) → [optimisticState, addOptimistic]\nReal state (useState / action state) is the source of truth.\nOptimistic = a temporary overlay until real state catches up.\n\nWHY: \"How do you do optimistic updates?\" is a classic mid interview question.\nINTERVIEW: when to rollback; combo with actions; race conditions.",
        "intro": "32 — React 19 useOptimistic\nLevel: REACT19  |  Study in order: read this file first, then the next number\n\nSIMPLE: Optimistic UI = show success in the UI first, then let the API confirm later.\nLike a WhatsApp message appearing in the list before the double tick.\nIf the API fails → rollback (old state).\n\nuseOptimistic(state, updateFn) → [optimisticState, addOptimistic]\nReal state (useState / action state) is the source of truth.\nOptimistic = a temporary overlay until real state catches up.\n\nWHY: \"How do you do optimistic updates?\" is a classic mid interview question.\nINTERVIEW: when to rollback; combo with actions; race conditions.",
        "questions": [
          {
            "title": "Q1: Like button — instant +1, then server",
            "explain": "In simple words:\nsetOptimistic(likes + 1) instantly.\nawait api — on success real setLikes; on fail UI shows real state again\nwhen optimistic settles (React syncs with real state).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "async function fakeLikeApi(ok = true) {\n  await new Promise((r) => setTimeout(r, 500));\n  if (!ok) throw new Error(\"network\");\n}\n\nexport function LikeOptimistic() {\n  const [likes, setLikes] = useState(0);\n  const [optimisticLikes, setOptimisticLikes] = useOptimistic(\n    likes,\n    (current, next) => next\n  );\n\n  async function onLike() {\n    setOptimisticLikes(likes + 1);\n    try {\n      await fakeLikeApi(true);\n      setLikes((n) => n + 1);\n    } catch {\n      // real likes unchanged → UI rollback to `likes`\n    }\n  }\n\n  return (\n    <button onClick={onLike}>\n      Likes: {optimisticLikes}\n    </button>\n  );\n}"
          },
          {
            "title": "Q2: [MID] Todo add — show in list first",
            "explain": "In simple words:\nupdateFn (current, optimisticValue) => newOptimisticState\nHere optimisticValue = new todo object.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function OptimisticTodos() {\n  const [todos, setTodos] = useState([{ id: \"1\", title: \"Learn React\" }]);\n  const [optimisticTodos, addOptimisticTodo] = useOptimistic(\n    todos,\n    (current, newTodo) => [...current, newTodo]\n  );\n\n  async function addTodo(formData) {\n    const title = String(formData.get(\"title\") || \"\").trim();\n    if (!title) return;\n    const temp = { id: \"temp-\" + Date.now(), title, pending: true };\n    addOptimisticTodo(temp);\n    // await api.create\n    const saved = { id: crypto.randomUUID(), title, pending: false };\n    setTodos((list) => [...list, saved]);\n  }\n\n  return (\n    <div>\n      <form action={addTodo}>\n        <input name=\"title\" />\n        <button type=\"submit\">Add</button>\n      </form>\n      <ul>\n        {optimisticTodos.map((t) => (\n          <li key={t.id} style={{ opacity: t.pending ? 0.5 : 1 }}>\n            {t.title}\n          </li>\n        ))}\n      </ul>\n    </div>\n  );\n}"
          },
          {
            "title": "Q3: Rollback idea when API fails",
            "explain": "In simple words:\nOptimistic only wins until base state updates.\nOn fail → do not setTodos; optimistic automatically returns to base\n(after action/transition completes).\nShow user an error toast separately — UX matters.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function AddWithPossibleFail() {\n  const [items, setItems] = useState([]);\n  const [error, setError] = useState(null);\n  const [optimistic, addOptimistic] = useOptimistic(items, (cur, item) => [\n    ...cur,\n    item,\n  ]);\n\n  async function onAdd(formData) {\n    setError(null);\n    const title = String(formData.get(\"title\") || \"\");\n    addOptimistic({ id: \"tmp\", title });\n    try {\n      await fakeLikeApi(false); // force fail for demo\n      setItems((x) => [...x, { id: crypto.randomUUID(), title }]);\n    } catch (e) {\n      setError(\"Could not add — rolled back\");\n    }\n  }\n\n  return (\n    <form action={onAdd}>\n      <input name=\"title\" />\n      <button>Add</button>\n      {error && <p>{error}</p>}\n      <ul>\n        {optimistic.map((i) => (\n          <li key={i.id}>{i.title}</li>\n        ))}\n      </ul>\n    </form>\n  );\n}"
          },
          {
            "title": "Q4: [MID] useOptimistic + Actions / startTransition",
            "explain": "In simple words:\nDocs often expect optimistic updates inside Transition/Action.\nCalling addOptimistic in form action={fn} is a common pattern.\nRandom setState timing outside can cause weird flashes.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function OptimisticInsideAction() {\n  const [name, setName] = useState(\"Ada\");\n  const [optimisticName, setOptimisticName] = useOptimistic(name);\n\n  async function renameAction(formData) {\n    const next = String(formData.get(\"name\") || \"\");\n    setOptimisticName(next);\n    // await api.rename(next)\n    setName(next);\n  }\n\n  return (\n    <form action={renameAction}>\n      <p>Hello, {optimisticName}</p>\n      <input name=\"name\" defaultValue={name} />\n      <button type=\"submit\">Rename</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q5: updateFn complex merge",
            "explain": "In simple words:\nSecond arg can be anything — id, patch, reducer-style action.\nKeep updateFn pure: (current, msg) => nextOptimistic",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function OptimisticCart() {\n  const [cart, setCart] = useState({ qty: 1 });\n  const [optCart, send] = useOptimistic(cart, (current, delta) => ({\n    qty: current.qty + delta,\n  }));\n\n  async function bump(delta) {\n    send(delta);\n    // await api\n    setCart((c) => ({ qty: c.qty + delta }));\n  }\n\n  return (\n    <div>\n      <p>Qty: {optCart.qty}</p>\n      <button onClick={() => bump(1)}>+1</button>\n      <button onClick={() => bump(-1)}>-1</button>\n    </div>\n  );\n}"
          },
          {
            "title": "Q6: [MID] Race — double click fast",
            "explain": "In simple words:\nTwo optimistic updates overlap → careful design (disable pending, queue, id).\nMid answer: pending flag / useFormStatus / ignore stale responses.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function GuardDoubleSubmit() {\n  const [n, setN] = useState(0);\n  const [opt, setOpt] = useOptimistic(n, (_c, v) => v);\n  const inflight = useRef(false);\n\n  async function inc() {\n    if (inflight.current) return;\n    inflight.current = true;\n    setOpt(n + 1);\n    try {\n      await fakeLikeApi(true);\n      setN((x) => x + 1);\n    } finally {\n      inflight.current = false;\n    }\n  }\n\n  return <button onClick={inc}>{opt}</button>;\n}"
          },
          {
            "title": "Q7: When NOT to use optimistic?",
            "explain": "In simple words:\nPayment, irreversible delete, stock \"last item\" — server confirm first is better.\nOptimistic = low-risk, reversible, social-ish actions.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const whenNot = [\"payments\", \"permissions changes\", \"inventory-critical buys\"];"
          },
          {
            "title": "Q8: Interview one-liner",
            "explain": "In simple words:\n\"useOptimistic shows temporary UI until real state updates;\non fail rollback to base state; works best with Actions.\"",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const interviewLine =\n  \"Optimistic = instant UI; server confirms; failure rolls back to source state.\";"
          },
          {
            "title": "Q9: useOptimistic with useActionState — full pattern sketch",
            "explain": "Task:\nconst [state, action, pending] = useActionState(...); const [opt, addOpt] = useOptimistic(state, fn).\n\nIn simple words:\nReal state = useActionState return after action completes.\nOptimistic overlay during pending transition.\nReact 18: temp useState + revert on catch manually.\nAction start: addOptimistic(next); await; return final state updates base.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "async function renameServer(prev, formData) {\n  await new Promise((r) => setTimeout(r, 400));\n  const next = String(formData.get(\"name\") || prev);\n  return next;\n}\n\nexport function OptimisticWithActionState() {\n  const [name, formAction, isPending] = useActionState(renameServer, \"Ada\");\n  const [optimisticName, setOptimisticName] = useOptimistic(name);\n\n  async function optimisticRename(formData) {\n    const next = String(formData.get(\"name\") || name);\n    setOptimisticName(next);\n    // formAction dispatches to useActionState pipeline\n    return formAction(formData);\n  }\n\n  return (\n    <form action={optimisticRename}>\n      <p>Hello, {optimisticName}</p>\n      <input name=\"name\" defaultValue={name} />\n      <button disabled={isPending}>Rename</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q10: [MID] updateFn signature — (currentState, optimisticValue)",
            "explain": "Task:\nSecond argument can be anything you pass — id, delta, whole object.\n\nIn simple words:\nupdateFn is a pure function — no side effects.\nReact 18 manual: setItems([...items, temp]) same logic inline.\nComplex: (cur, { type, payload }) => reducer style merge.\nTrap: mutate current inside updateFn — breaks React assumptions.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function OptimisticReducerStyle() {\n  const [count, setCount] = useState(0);\n  const [opt, dispatch] = useOptimistic(count, (cur, action) => {\n    if (action.type === \"inc\") return cur + 1;\n    if (action.type === \"dec\") return cur - 1;\n    return cur;\n  });\n\n  async function inc() {\n    dispatch({ type: \"inc\" });\n    await fakeLikeApi(true);\n    setCount((c) => c + 1);\n  }\n\n  return (\n    <button onClick={inc}>\n      {opt}\n    </button>\n  );\n}"
          },
          {
            "title": "Q11: Pending flag on optimistic items UI",
            "explain": "Task:\nTemp item { pending: true } — show with opacity/style.\n\nIn simple words:\nUser knows it is optimistic — honest UX.\nReact 18: same visual pattern with temp ids.\nAfter server confirm replace with pending: false and real id.\nEdge: duplicate temp ids — use unique temp keys.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function PendingVisualTodos() {\n  const [todos, setTodos] = useState([]);\n  const [optTodos, addOpt] = useOptimistic(todos, (cur, t) => [...cur, t]);\n\n  async function add(formData) {\n    const title = String(formData.get(\"title\") || \"\");\n    const temp = { id: \"tmp-\" + Date.now(), title, pending: true };\n    addOpt(temp);\n    await fakeLikeApi(true);\n    setTodos((list) => [...list, { id: crypto.randomUUID(), title, pending: false }]);\n  }\n\n  return (\n    <form action={add}>\n      <input name=\"title\" />\n      <button>Add</button>\n      <ul>\n        {optTodos.map((t) => (\n          <li key={t.id} style={{ opacity: t.pending ? 0.6 : 1 }}>\n            {t.title} {t.pending ? \"(saving)\" : \"\"}\n          </li>\n        ))}\n      </ul>\n    </form>\n  );\n}"
          },
          {
            "title": "Q12: [MID] React 18 manual optimistic — contrast code idea",
            "explain": "Task:\nconst [display, setDisplay]=useState(real); onClick: setDisplay(opt); fetch; catch revert.\n\nIn simple words:\nManual revert: setDisplay(realSnapshot) on fail.\nuseOptimistic: base state unchanged on fail → auto rollback to base.\nLess bug-prone — no forgotten revert branch.\nMigration: replace temp display state with useOptimistic(realState).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const react18ManualOptimistic =\n  \"temp useState + try/catch revert → 19 useOptimistic(baseState) auto-syncs on failure.\";"
          },
          {
            "title": "Q13: startTransition + useOptimistic",
            "explain": "Task:\nDocs recommend optimistic updates inside transition/action context.\n\nIn simple words:\nForm action={fn} is already transition-like for updates.\nRandom setState outside → UI flash / tearing possible in edge cases.\nReact 18 startTransition + manual optimistic same pairing advice.\nuseTransition isPending is different from useOptimistic — both can combine.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function TransitionOptimisticNote() {\n  return (\n    <p>\n      Call addOptimistic inside form action or startTransition callback — keeps updates\n      concurrent-friendly.\n    </p>\n  );\n}"
          },
          {
            "title": "Q14: [MID] Stale closure in onLike — trap",
            "explain": "Task:\nsetOptimisticLikes(likes + 1) — likes can be stale on rapid clicks.\n\nIn simple words:\nFunctional base update better: not setOptimisticLikes(c => c + 1) pattern — useOptimistic send current+delta.\nGuard with inflight ref (Q6) or disable while pending.\nReact 18 same stale closure in async handlers.\nFix: useOptimistic updateFn (current, delta) => current + delta.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function StaleClosureLikeFix() {\n  const [likes, setLikes] = useState(0);\n  const [optLikes, addLike] = useOptimistic(likes, (current, delta) => current + delta);\n\n  async function onLike() {\n    addLike(1);\n    await fakeLikeApi(true);\n    setLikes((n) => n + 1);\n  }\n\n  return <button onClick={onLike}>Likes: {optLikes}</button>;\n}"
          },
          {
            "title": "Q15: Delete optimistic — remove from list before server",
            "explain": "Task:\naddOptimistic filter out id; on fail item returns from base list.\n\nIn simple words:\nupdateFn: (cur, id) => cur.filter(x => x.id !== id)\nOn fail → do not update base → optimistic reverts showing item again + error toast.\nReact 18: optimistic filter + restore array on catch.\nWhen NOT: irreversible delete UX — wait for server confirm.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function OptimisticDelete() {\n  const [items, setItems] = useState([\n    { id: \"1\", title: \"A\" },\n    { id: \"2\", title: \"B\" },\n  ]);\n  const [optItems, markDeleted] = useOptimistic(items, (cur, id) =>\n    cur.filter((x) => x.id !== id)\n  );\n\n  async function remove(id) {\n    markDeleted(id);\n    try {\n      await fakeLikeApi(true);\n      setItems((list) => list.filter((x) => x.id !== id));\n    } catch {\n      // rollback automatic\n    }\n  }\n\n  return (\n    <ul>\n      {optItems.map((i) => (\n        <li key={i.id}>\n          {i.title}{\" \"}\n          <button type=\"button\" onClick={() => remove(i.id)}>\n            Del\n          </button>\n        </li>\n      ))}\n    </ul>\n  );\n}"
          },
          {
            "title": "Q16: [MID] useOptimistic without second arg",
            "explain": "Task:\nuseOptimistic(state) — setOptimistic(next) directly sets optimistic value.\n\nIn simple words:\nShorthand when passing whole next state (rename string).\nFile Q4 OptimisticInsideAction example.\nReact 18: setTempState(next) equivalent.\nupdateFn form is more flexible for lists/carts.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function ShorthandOptimistic() {\n  const [label, setLabel] = useState(\"Draft\");\n  const [optLabel, setOptLabel] = useOptimistic(label);\n\n  async function save(formData) {\n    const next = String(formData.get(\"label\") || \"\");\n    setOptLabel(next);\n    await fakeLikeApi(true);\n    setLabel(next);\n  }\n\n  return (\n    <form action={save}>\n      <p>{optLabel}</p>\n      <input name=\"label\" defaultValue={label} />\n      <button>Save</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q17: Multiple optimistic fields — one base state object",
            "explain": "Task:\nBase { name, qty }; optimistic overlay whole object or field patches.\n\nIn simple words:\nupdateFn merge patches: (cur, patch) => ({ ...cur, ...patch })\nReact 18: clone object manually for temp view.\nKeep base updates atomic on server success.\nEdge: partial fail — which fields rollback? design per field or whole object.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function OptimisticObjectPatch() {\n  const [cart, setCart] = useState({ name: \"Bag\", qty: 1 });\n  const [optCart, patch] = useOptimistic(cart, (cur, p) => ({ ...cur, ...p }));\n\n  async function rename(formData) {\n    const name = String(formData.get(\"name\") || \"\");\n    patch({ name });\n    await fakeLikeApi(true);\n    setCart((c) => ({ ...c, name }));\n  }\n\n  return (\n    <form action={rename}>\n      <p>\n        {optCart.name} × {optCart.qty}\n      </p>\n      <input name=\"name\" defaultValue={cart.name} />\n      <button>Rename</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q18: [ADV] Race — out-of-order server responses",
            "explain": "Task:\nRequest A slow, B fast — B then A arrive → stale overwrite risk on base state.\n\nIn simple words:\nOptimistic rollback to base — use request id / abort controller in base update.\nReact 18: ignore stale responses with counter ref.\nuseOptimistic doesn't replace response ordering guards on setState.\nPattern: if (reqId !== latestRef.current) return prev;",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function RaceGuardNote() {\n  return (\n    <p>\n      useOptimistic handles failed optimistic overlay; still guard setState/base updates\n      against out-of-order network responses with ids or AbortController.\n    </p>\n  );\n}"
          },
          {
            "title": "Q19: [MID] When NOT useOptimistic — expand",
            "explain": "Task:\nFinancial confirm, legal consent, medical doses — server truth first.\n\nIn simple words:\nLow-risk social UI = good fit (likes, comments, todo add).\nHigh-risk = spinner until server OK — user trust matters.\nReact 18 same guidance — optimistic is product decision.\nMisleading success is worse than a short wait.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const whenNotOptimisticExpanded = [\n  \"payments & money\",\n  \"irreversible deletes without undo\",\n  \"inventory last-item purchase\",\n  \"compliance/audit trails\",\n  \"medical or safety critical\",\n];"
          },
          {
            "title": "Q20: Server Action + useOptimistic (file 38 link)",
            "explain": "Task:\nClient form action server fn — optimistic on client, mutation on server.\n\nIn simple words:\naddOptimistic before await serverAction(formData).\nServer fail return → base unchanged → rollback + show error.\nReact 18: optimistic client + fetch API route same architecture.\nRSC: optimistic always client-side hook — 'use client' required.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const serverOptimistic =\n  \"Optimistic UI runs in client components; server action confirms mutation.\";"
          },
          {
            "title": "Q21: [ADV] Testing optimistic flows",
            "explain": "Task:\nMock slow API; assert UI shows optimistic then final; mock fail assert rollback.\n\nIn simple words:\nRTL: click → expect temp text → resolve promise → expect final.\nFail path: reject promise → expect original list count.\nReact 18 tests same structure — hook reduces manual revert code to test.\nFlaky tests if timing — use fake timers or controllable promises.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function TestingOptimisticNote() {\n  return <p>Test success and failure paths — optimistic should match base after fail.</p>;\n}"
          },
          {
            "title": "Q22: [ADV] Interview answer template",
            "explain": "Task:\nDefine optimistic UI → useOptimistic(base, updateFn) → rollback on unchanged base.\n\nIn simple words:\nvs React 18: manual temp state + revert.\nvs useActionState: action state is truth; optimistic is overlay.\nTraps: high-risk flows; stale races on base; forget error toast on rollback.\nPair with Actions/transitions; disable double submit.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export const optimisticInterviewTemplate = {\n  definition: \"show success before server confirms; rollback if base unchanged\",\n  api: \"useOptimistic(baseState, updateFn) → [optimistic, addOptimistic]\",\n  react18: \"manual temp state + try/catch revert\",\n  traps: [\"high-risk domains\", \"out-of-order responses\", \"missing error UX on rollback\"],\n};"
          }
        ]
      },
      {
        "file": "33_React19_useHook.jsx",
        "title": "33 — use() Hook",
        "kya": "`use` is a new hook that can read a Promise OR Context.",
        "detail": "33 — React 19 `use` hook (promises + context)\nLevel: REACT19  |  Study in order: read this file first, then the next number\n\nSIMPLE: `use` is a new hook that can read a Promise OR Context.\n\nuse(promise) → Suspense fallback until the Promise resolves;\nreject → nearest Error Boundary.\nuse(context) → like useContext, BUT it can also run in conditionals / loops\n(a special exception to the rules of hooks — only for `use`).\n\nThink of it this way: useState/useEffect \"always top-level same order\".\n`use` = \"check a condition first if you want, then read context/promise\".\n\nWHY: React 19 signature API; RSC + client data patterns.\nINTERVIEW: conditional use OK?; use vs useContext; Suspense pairing.",
        "intro": "33 — React 19 `use` hook (promises + context)\nLevel: REACT19  |  Study in order: read this file first, then the next number\n\nSIMPLE: `use` is a new hook that can read a Promise OR Context.\n\nuse(promise) → Suspense fallback until the Promise resolves;\nreject → nearest Error Boundary.\nuse(context) → like useContext, BUT it can also run in conditionals / loops\n(a special exception to the rules of hooks — only for `use`).\n\nThink of it this way: useState/useEffect \"always top-level same order\".\n`use` = \"check a condition first if you want, then read context/promise\".\n\nWHY: React 19 signature API; RSC + client data patterns.\nINTERVIEW: conditional use OK?; use vs useContext; Suspense pairing.",
        "questions": [
          {
            "title": "Q1: use(promise) + Suspense",
            "explain": "In simple words:\nIn component render use(promise) — unwrap value.\nParent Suspense boundary required otherwise error/hang feel.\nKeep promise identity stable (module cache / state) — new Promise every render = loop risk.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const cache = new Map();\n\nfunction fetchUser(id) {\n  const key = String(id);\n  if (!cache.has(key)) {\n    cache.set(\n      key,\n      new Promise((resolve) => {\n        setTimeout(() => resolve({ id, name: \"Ada \" + id }), 500);\n      })\n    );\n  }\n  return cache.get(key);\n}\n\nfunction User({ id }) {\n  const user = use(fetchUser(id));\n  return <p>{user.name}</p>;\n}\n\nexport function UserPage() {\n  return (\n    <Suspense fallback={<p>Loading user...</p>}>\n      <User id={1} />\n    </Suspense>\n  );\n}"
          },
          {
            "title": "Q2: [MID] New Promise every render = bug",
            "explain": "In simple words:\nuse(fetch()) directly in render without cache → infinite suspend.\nFix: cache, lift promise, or framework loader (RSC fetch dedupe).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function BadUser() {\n  // ❌ const user = use(fetch('/api')); // new promise every render\n  return null;\n}"
          },
          {
            "title": "Q3: use(context) basic",
            "explain": "In simple words:\ncreateContext + Provider; child uses use(ThemeContext).\nuseContext(ThemeContext) same value — use is more flexible in placement.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const ThemeContext = createContext(\"light\");\n\nfunction ThemedBox() {\n  const theme = use(ThemeContext);\n  return <div data-theme={theme}>Theme: {theme}</div>;\n}\n\nexport function ThemeApp() {\n  return (\n    <ThemeContext value=\"dark\">\n      <ThemedBox />\n    </ThemeContext>\n  );\n}"
          },
          {
            "title": "Q4: [MID] Conditional use(context) — allowed",
            "explain": "In simple words:\nNormal hooks: useState inside if ❌\nuse(context): inside if ✅ (React 19 design)\nWhy useful: optional context read when prop is missing.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const LabelContext = createContext(null);\n\nfunction Button({ label: labelProp }) {\n  let label = labelProp;\n  if (label == null) {\n    label = use(LabelContext);\n  }\n  return <button>{label ?? \"OK\"}</button>;\n}\n\nexport function ConditionalUseDemo() {\n  return (\n    <LabelContext value=\"From context\">\n      <Button />\n      <Button label=\"Prop wins\" />\n    </LabelContext>\n  );\n}"
          },
          {
            "title": "Q5: use(promise) conditional — carefully",
            "explain": "In simple words:\nCall use(promise) only when condition is true.\nDo not call on false branch — otherwise unnecessary Suspense.\nRules: still don't call after early return inconsistently across renders\nin a way that breaks other hooks' order — other hooks still top-level!",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function MaybeUser({ id, enabled }) {\n  // other hooks FIRST, always:\n  const [extra, setExtra] = useState(\"\");\n  if (!enabled) {\n    return <p>Disabled {extra}</p>;\n  }\n  const user = use(fetchUser(id));\n  return (\n    <p onClick={() => setExtra(\"x\")}>\n      {user.name}\n    </p>\n  );\n}\n\nexport function MaybeUserGate() {\n  return (\n    <Suspense fallback={<p>...</p>}>\n      <MaybeUser id={2} enabled />\n    </Suspense>\n  );\n}"
          },
          {
            "title": "Q6: Error — rejected promise",
            "explain": "In simple words:\nuse(rejectedPromise) → Error Boundary catch.\nSuspense only for pending; errors on boundary.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const failPromise = Promise.reject(new Error(\"boom\"));\n// Prevent unhandled rejection noise in some runtimes during module eval:\nfailPromise.catch(() => {});\n\nfunction Failing() {\n  use(failPromise);\n  return null;\n}\n\nexport function WithErrorBoundaryIdea() {\n  // Wrap <Failing /> in your ErrorBoundary + Suspense in real app\n  return (\n    <Suspense fallback={<p>Loading</p>}>\n      {/* <ErrorBoundary><Failing /></ErrorBoundary> */}\n      <p>See Error Boundary docs for reject path</p>\n    </Suspense>\n  );\n}"
          },
          {
            "title": "Q7: [MID] use vs useContext — interview answer",
            "explain": "In simple words:\nSame context value.\nuse → conditionals/loops allowed for THAT read.\nuseContext → classic hook rules (top-level only).\nOnly use can read a Promise.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const interview = {\n  use: \"promise unwrap + flexible context read\",\n  useContext: \"context only, strict hook rules\",\n};"
          },
          {
            "title": "Q8: Pass promise from Server Component (mental model)",
            "explain": "In simple words:\nServer Component fetches and passes Promise to child Client Component —\nclient uses use(promise). RSC + use bridge.\nDetail: file 37.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "// // Server: <Client userPromise={fetchUser(1)} />\n// // Client: const user = use(userPromise);"
          },
          {
            "title": "Q9: Hooks rules summary for this file",
            "explain": "In simple words:\n• useState/useEffect/etc — still top-level, same order\n• use() — exception for conditional context/promise\n• Do not hide other hooks behind the use() exception",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const rules = [\n  \"Other hooks: always top-level\",\n  \"use(context|promise): can be conditional\",\n  \"Stable promise identity for use(promise)\",\n];"
          },
          {
            "title": "Q10: [MID] use(promise) in loop — allowed but careful",
            "explain": "Task:\nitems.map(id => <Row key={id} id={id} />) — Row uses use(fetchUser(id)).\n\nIn simple words:\nEach Row uses its own cached promise — stable per id.\nReact 18: useEffect per row fetch — waterfall is a common problem.\nTrap: new Promise.create every render in loop — suspend loop.\nPattern: cache Map keyed by id (Q1 fetchUser).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function UserRow({ id }) {\n  const user = use(fetchUser(id));\n  return <li>{user.name}</li>;\n}\n\nexport function UserList({ ids }) {\n  return (\n    <Suspense fallback={<p>Loading users...</p>}>\n      <ul>\n        {ids.map((id) => (\n          <UserRow key={id} id={id} />\n        ))}\n      </ul>\n    </Suspense>\n  );\n}"
          },
          {
            "title": "Q11: Preload / warm cache before Suspense",
            "explain": "Task:\nCall fetchUser(id) before component render — seed promise in cache.\n\nIn simple words:\nPrefetch on hover → click feels like instant use(promise) resolve.\nReact 18: queryClient.prefetchQuery same idea (TanStack).\nuse() needs Suspense boundary ancestor — prefetch doesn't remove boundary.\nEdge: prefetch fail — Error Boundary on use().",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function PreloadPattern({ id }) {\n  // teaching: onMouseEnter={() => fetchUser(id)} to warm cache\n  return (\n    <Suspense fallback={<p>...</p>}>\n      <User id={id} />\n    </Suspense>\n  );\n}"
          },
          {
            "title": "Q12: [MID] use(Context) in loop — conditional per item",
            "explain": "Task:\nOptional context per row — if (needsTheme) use(ThemeContext) allowed pattern variant.\n\nIn simple words:\nNormal useContext in loop ❌ breaks rules if conditional per iteration inconsistently.\nuse() exception — still design carefully; do not mix hook order with other hooks.\nReact 18: pass theme prop instead to avoid conditional context read.\nPrefer explicit props when simple — use() power when condition is real.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function MaybeThemed({ useTheme }) {\n  let theme = \"light\";\n  if (useTheme) {\n    theme = use(ThemeContext);\n  }\n  return <span data-theme={theme}>Box</span>;\n}\n\nexport function MaybeThemedDemo() {\n  return (\n    <ThemeContext value=\"dark\">\n      <MaybeThemed useTheme />\n      <MaybeThemed useTheme={false} />\n    </ThemeContext>\n  );\n}"
          },
          {
            "title": "Q13: use vs useContext — migration note",
            "explain": "Task:\nExisting useContext code — replace only when conditional read is needed.\n\nIn simple words:\nuseContext top-level reads — no rush to migrate all.\nReact 19: use(Context) new provider syntax compatible (file 36).\nInterview: \"same value; use allows conditional; useContext stricter rules\".\nBoth work for unconditional read — team pick one style.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const useVsUseContextMigration =\n  \"Keep useContext for simple reads; adopt use() when conditional context/promise needed.\";"
          },
          {
            "title": "Q14: [ADV] Promise cache invalidation",
            "explain": "Task:\nUser refresh button — cache.delete(key); create new Promise; remount or key bump.\n\nIn simple words:\nStale use(promise) cache → wrong data until invalidate.\nReact 18 Query: invalidateQueries built-in.\nPattern: key={version} on Suspense child to reset subtree.\nrefetch = new promise reference + state version increment.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function RefreshUser({ id, version }) {\n  return (\n    <Suspense key={version} fallback={<p>Loading...</p>}>\n      <User id={id} />\n    </Suspense>\n  );\n}"
          },
          {
            "title": "Q15: [MID] use(promise) without Suspense — trap",
            "explain": "Task:\nMissing boundary → React error / hang depending on setup.\n\nIn simple words:\nAlways wrap consuming tree in <Suspense fallback={...}>.\nReact 18 Suspense for lazy only common; 19 use(promise) extends Suspense data.\nRead dev error message — \"A component suspended while rendering...\"\nNested Suspense for granular loading UI.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function MissingSuspenseTrap() {\n  // ❌ <User id={1} /> without Suspense parent\n  return (\n    <Suspense fallback={<p>Need this wrapper</p>}>\n      <User id={1} />\n    </Suspense>\n  );\n}"
          },
          {
            "title": "Q16: Context default + use() read",
            "explain": "Task:\ncreateContext(null) — when Provider is missing default is null; read with use().\n\nIn simple words:\nif (ctx === null) fallback UI — optional context pattern.\nReact 18 useContext same default behavior.\nuse() conditional: only call when you know provider might exist — still tricky.\nExplicit optional prop often clearer than magic default.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const OptionalCtx = createContext(null);\n\nfunction OptionalConsumer() {\n  const value = use(OptionalCtx);\n  return <p>{value ?? \"no provider\"}</p>;\n}\n\nexport function OptionalContextDemo() {\n  return <OptionalConsumer />;\n}"
          },
          {
            "title": "Q17: [MID] Client Component use(promise) from Server prop",
            "explain": "Task:\nServer: const p = fetchUser(); return <Client userPromise={p} />.\n\nIn simple words:\nClient: 'use client'; function C({ userPromise }) { const u = use(userPromise); }\nReact 18: no RSC — fetch in useEffect instead.\nSerialization: promise special RSC channel — not manual in CSR.\nWaterfall avoid: server await vs pass promise to client parallel strategies.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const rscPromiseBridge =\n  \"Server creates promise → Client use(promise) with Suspense — see file 37.\";"
          },
          {
            "title": "Q18: use() after early return — hooks order trap",
            "explain": "Task:\nOther hooks (useState) always first; then conditional return; then use().\n\nIn simple words:\nMaybeUser Q5 pattern — useState top, then if (!enabled) return, then use(promise).\n❌ use() first, then useState — flipping order breaks rules.\nuse() exception ≠ all hooks rules gone.\nReact 18: no use() — classic rules only.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function HooksOrderReminder() {\n  return (\n    <p>\n      Other hooks first (always same order); then conditional return; then use() if needed.\n    </p>\n  );\n}"
          },
          {
            "title": "Q19: [ADV] Error boundary + Suspense stacking",
            "explain": "Task:\nErrorBoundary wraps Suspense wraps DataComponent — order matters for UX.\n\nIn simple words:\nPending → Suspense fallback; reject → Error Boundary UI.\nReact 18 Error Boundary same — no promise unwrap built-in.\nresetKeys on boundary to retry after use(promise) fail.\nLog rejected promise reason in boundary componentDidCatch equivalent.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function BoundaryStackNote() {\n  return (\n    <p>\n      Typical: ErrorBoundary outside Suspense outside component calling use(promise).\n    </p>\n  );\n}"
          },
          {
            "title": "Q20: [MID] When NOT use(promise)",
            "explain": "Task:\nClient-only CSR without appetite for Suspense — useEffect + useState familiar path.\n\nIn simple words:\nTanStack Query mature caching/refetch — team already invested.\nHighly dynamic refetch intervals — Query devtools are better.\nuse(promise) sweet spot: RSC bridge + Suspense-first apps.\nReact 18 onClick fetch doesn't need use().",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const whenNotUseHook = [\n  \"no Suspense boundaries in app\",\n  \"TanStack Query already standard\",\n  \"simple one-off useEffect fetch\",\n];"
          },
          {
            "title": "Q21: [ADV] Testing components with use(promise)",
            "explain": "Task:\nIn test pass resolved promise: use(Promise.resolve({ name: 'Test' })).\n\nIn simple words:\nWrap in Suspense in test renderer.\nReject path: Promise.reject + Error Boundary test helper.\nReact 18: mock fetch + waitFor — different pattern.\nStable resolved promise per test — new each render breaks.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function TestUser({ userPromise }) {\n  const user = use(userPromise);\n  return <p>{user.name}</p>;\n}\n\nexport function TestingUsePromiseDemo() {\n  const resolved = Promise.resolve({ name: \"Test User\" });\n  return (\n    <Suspense fallback={null}>\n      <TestUser userPromise={resolved} />\n    </Suspense>\n  );\n}"
          },
          {
            "title": "Q22: [ADV] Interview traps — use() checklist",
            "explain": "Task:\n5 traps: new promise each render, no Suspense, wrong hook order, useContext conditional confusion, stale cache.\n\nIn simple words:\nReact 18 contrast: useEffect fetch vs Suspense use(promise).\nuse() reads promises AND context — not replacement for all data fetching.\n\"Can I use hooks in if?\" — only use(), not useState.\nOfficial name is `use` not useHook — file name is teaching shorthand.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export const useHookInterviewTraps = [\n  \"new Promise every render → infinite suspend\",\n  \"missing Suspense boundary\",\n  \"use() before other hooks / inconsistent order\",\n  \"thinking all hooks can be conditional\",\n  \"stale promise cache without invalidation\",\n];"
          }
        ]
      },
      {
        "file": "34_React19_RefAsProp.jsx",
        "title": "34 — Ref As Prop",
        "kya": "Before, ref was special — it did not come through props.",
        "detail": "34 — React 19 ref as prop (forwardRef legacy)\nLevel: REACT19  |  Study in order: read this file first, then the next number\n\nSIMPLE: Before, ref was special — it did not come through props.\nSo you had to write forwardRef(function (props, ref) { ... }).\n\nReact 19: ref is a normal prop — function Component({ ref, ... }) {\n  return <input ref={ref} />\n}\n\nforwardRef still works (libraries / old code) — in new code\nyou usually do not need it. Class components are a separate history.\n\nWHY: Less boilerplate; mid interviews now ask \"why did forwardRef exist?\" for context.\nINTERVIEW: ref prop vs forwardRef; callback refs; useImperativeHandle.",
        "intro": "34 — React 19 ref as prop (forwardRef legacy)\nLevel: REACT19  |  Study in order: read this file first, then the next number\n\nSIMPLE: Before, ref was special — it did not come through props.\nSo you had to write forwardRef(function (props, ref) { ... }).\n\nReact 19: ref is a normal prop — function Component({ ref, ... }) {\n  return <input ref={ref} />\n}\n\nforwardRef still works (libraries / old code) — in new code\nyou usually do not need it. Class components are a separate history.\n\nWHY: Less boilerplate; mid interviews now ask \"why did forwardRef exist?\" for context.\nINTERVIEW: ref prop vs forwardRef; callback refs; useImperativeHandle.",
        "questions": [
          {
            "title": "Q1: React 19 style — ref as prop",
            "explain": "In simple words:\nParent <Input ref={inputRef} />.\nChild gets ref in function params — forward to DOM.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Input({ ref, placeholder }) {\n  return <input ref={ref} placeholder={placeholder} />;\n}\n\nexport function FocusDemo() {\n  const inputRef = useRef(null);\n\n  useEffect(() => {\n    inputRef.current?.focus();\n  }, []);\n\n  return <Input ref={inputRef} placeholder=\"Auto focus\" />;\n}"
          },
          {
            "title": "Q2: Old forwardRef (legacy / library compat)",
            "explain": "In simple words:\nSame behavior, extra wrap.\nIn new projects, prefer ref prop.\nYou may still see forwardRef for older library support.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const LegacyInput = forwardRef(function LegacyInput(props, ref) {\n  return <input ref={ref} {...props} />;\n});\n\nexport function LegacyFocusDemo() {\n  const ref = useRef(null);\n  return <LegacyInput ref={ref} placeholder=\"Legacy forwardRef\" />;\n}"
          },
          {
            "title": "Q3: [MID] ref on function component without forwardRef / without prop?",
            "explain": "In simple words:\nReact 18 gave warning / ignore — ref did not come through props.\nReact 19 passes it through. Be clear about version in interviews.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const versionNote = {\n  react18: \"need forwardRef to pass ref to function components\",\n  react19: \"ref is a regular prop\",\n};"
          },
          {
            "title": "Q4: Callback ref",
            "explain": "In simple words:\nref={(node) => { ... }} — node on mount, null on unmount.\nFor measuring DOM / third-party attach.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function CallbackRefMeasure() {\n  return (\n    <div\n      ref={(node) => {\n        if (node) {\n          console.log(\"width\", node.getBoundingClientRect().width);\n        }\n      }}\n    >\n      Measure me\n    </div>\n  );\n}"
          },
          {
            "title": "Q5: [MID] useImperativeHandle — limited API for parent",
            "explain": "In simple words:\nSometimes parent does not need the whole DOM — only focus() / scrollTo().\nuseImperativeHandle(ref, () => ({ focus() { ... } }))\nReact 19: ref prop + useImperativeHandle combo.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function FancyInput({ ref }) {\n  const inner = useRef(null);\n  useImperativeHandle(ref, () => ({\n    focus: () => inner.current?.focus(),\n    clear: () => {\n      if (inner.current) inner.current.value = \"\";\n    },\n  }));\n  return <input ref={inner} />;\n}\n\nexport function ImperativeParent() {\n  const api = useRef(null);\n  return (\n    <div>\n      <FancyInput ref={api} />\n      <button onClick={() => api.current?.focus()}>Focus</button>\n      <button onClick={() => api.current?.clear()}>Clear</button>\n    </div>\n  );\n}"
          },
          {
            "title": "Q6: Multiple refs merge idea",
            "explain": "In simple words:\nLibrary also needs ref + parent also — set both in callback.\nOr a tiny setRefs helper.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function setRefs(...refs) {\n  return (node) => {\n    for (const r of refs) {\n      if (typeof r === \"function\") r(node);\n      else if (r) r.current = node;\n    }\n  };\n}\n\nexport function MergeRefsDemo() {\n  const a = useRef(null);\n  const b = useRef(null);\n  return <input ref={setRefs(a, b)} />;\n}"
          },
          {
            "title": "Q7: ref on custom component — what does it point to?",
            "explain": "In simple words:\nUntil the child attaches ref to DOM (or imperative handle),\nparent.current is null / useless.\nDocument: \"this component forwards ref to the input\".",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Broken({ ref }) {\n  // accepted ref but did not attach anywhere ❌\n  return <input />;\n}\n\nfunction Fixed({ ref }) {\n  return <input ref={ref} />; // ✅\n}"
          },
          {
            "title": "Q8: [MID] Interview closer",
            "explain": "In simple words:\n\"In React 19 forwardRef is mostly legacy; ref prop is standard.\nuseImperativeHandle as a controlled escape hatch.\nRef updates commit phase — do not read ref.current during render for logic.\"",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const closer =\n  \"ref as prop in 19; forwardRef legacy; don't read ref during render for data flow.\";"
          },
          {
            "title": "Q9: ref prop name collision — 'ref' reserved feel",
            "explain": "Task:\nName the prop ref carefully — for DOM ref forward; use inputRef for other data.\n\nIn simple words:\nIn React 19 ref behaves like a special prop slot — forward to DOM.\nIf product code needed ref=\"something\" string — rename (conflict rare).\nReact 18 forwardRef used a separate param — less collision.\nTypeScript: ComponentPropsWithRef types update in @types/react 19.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function LabeledInput({ ref, label }) {\n  return (\n    <label>\n      {label}\n      <input ref={ref} />\n    </label>\n  );\n}\n\nexport function RefPropLabelDemo() {\n  const r = useRef(null);\n  return <LabeledInput ref={r} label=\"Email\" />;\n}"
          },
          {
            "title": "Q10: [MID] TypeScript ref prop typing sketch",
            "explain": "Task:\nref in Props?: Ref<HTMLInputElement> — @types/react 19 helpers.\n\nIn simple words:\nforwardRef generic types are now optional in simpler components.\nReact 18: ForwardRefRenderFunction boilerplate types.\nMigration: remove forwardRef wrapper first, keep ref in props interface.\nLibraries publish both patterns during transition.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const tsRefNote =\n  \"React 19 types: ref on props directly; Ref<T> on function component props.\";"
          },
          {
            "title": "Q11: ref null on unmount — callback ref",
            "explain": "Task:\nref={(node) => { ... }} — node is null on unmount.\n\nIn simple words:\nClean up measure listeners when node is null.\nReact 18/19 same callback ref semantics.\nuseImperativeHandle parent ref stable — inner unmount separate lifecycle.\nTrap: inline ref callback is new every render — re-runs attach/detach; stabilize with useCallback.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function CallbackRefCleanup() {\n  return (\n    <div\n      ref={(node) => {\n        if (node) {\n          node.dataset.mounted = \"1\";\n        }\n      }}\n    >\n      Callback ref mount marker\n    </div>\n  );\n}"
          },
          {
            "title": "Q12: [MID] forwardRef migration steps",
            "explain": "Task:\n1) remove forwardRef 2) take ref in props 3) update test snapshots.\n\nIn simple words:\nconst X = forwardRef(fn) → function X({ ref, ...props }).\nReact 18 lib consumers still pass ref — 19 native prop accepts.\nDeprecation warnings 18.3 — forwardRef still works 19.\nWhen NOT migrate yet: peer dep libs expecting forwardRef displayName hacks.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const forwardRefMigration = [\n  \"unwrap forwardRef to plain function\",\n  \"add ref to destructured props\",\n  \"forward ref to DOM or useImperativeHandle\",\n  \"keep forwardRef temporarily if lib API requires\",\n];"
          },
          {
            "title": "Q13: ref to class component — unchanged",
            "explain": "Task:\nOn class components ref = instance; function ref prop change does not affect them.\n\nIn simple words:\nReact 19 ref-as-prop = DX win for function components.\nClass createRef/useRef attach instance — same as 18.\nMixed codebase: class leaf + function wrapper patterns coexist.\nNew code: function + ref prop preferred.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function ClassRefNote() {\n  return <p>Class component refs still point to class instance — unchanged in 19.</p>;\n}"
          },
          {
            "title": "Q14: [ADV] useImperativeHandle + ref prop together",
            "explain": "Task:\nFancyInput({ ref }) { useImperativeHandle(ref, () => ({ focus })); ... }\n\nIn simple words:\nLimited API for parent — encapsulation.\nReact 18 forwardRef + useImperativeHandle classic pair.\nReact 19: ref prop replaces forwardRef only — imperative handle same.\nDo not expose entire DOM unless needed — maintenance boundary.\nReturn object stable-ish — new object each call usually OK for handles.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Meter({ ref }) {\n  const inner = useRef(null);\n  useImperativeHandle(ref, () => ({\n    fill: (pct) => {\n      if (inner.current) inner.current.style.width = pct + \"%\";\n    },\n  }));\n  return <div ref={inner} style={{ height: 8, background: \"#eee\", width: \"100%\" }} />;\n}\n\nexport function MeterParent() {\n  const api = useRef(null);\n  return (\n    <div>\n      <Meter ref={api} />\n      <button type=\"button\" onClick={() => api.current?.fill(75)}>\n        75%\n      </button>\n    </div>\n  );\n}"
          },
          {
            "title": "Q15: [MID] Reading ref.current during render — trap",
            "explain": "Task:\nin render if (ref.current) width = ... ❌ — layout flicker / rules.\n\nIn simple words:\nRef updates after commit — do not read in render phase for UI logic.\nReact 18 same rule — ref not reactive state.\nMeasure: useLayoutEffect or callback ref.\nCompiler doesn't make ref.current reactive — still imperative escape hatch.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function NoRefDuringRender() {\n  const divRef = useRef(null);\n  // ❌ const w = divRef.current?.offsetWidth during render for display\n  useEffect(() => {\n    if (divRef.current) console.log(\"width after commit\", divRef.current.offsetWidth);\n  }, []);\n  return <div ref={divRef}>Measure in effect</div>;\n}"
          },
          {
            "title": "Q16: Third-party lib mergeRefs",
            "explain": "Task:\nLib internal ref + parent ref — setRefs helper (Q6) or mergeRefs util.\n\nIn simple words:\nreact-merge-refs package common in libs.\nReact 19 ref prop parent side same merge need.\nReact 18 forwardRef libs often merge inside.\nTrap: overwrite ref — last writer wins without merge.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function LibMergeRefsDemo() {\n  const parentRef = useRef(null);\n  const libRef = useRef(null);\n  return <input ref={setRefs(parentRef, libRef)} placeholder=\"merged\" />;\n}"
          },
          {
            "title": "Q17: [MID] ref on composite component — document contract",
            "explain": "Task:\nJSDoc: \"@param ref forwarded to underlying <input />\"\n\nIn simple words:\nBroken component Q7 — accept ref but no attach = bug.\nDesign systems explicit: RefForwardedInput exports type.\nReact 18 forwardRef displayName for DevTools — ref prop components name function.\nTesting: parent ref.current focus() integration test.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function DocumentedInput({ ref, ...rest }) {\n  return <input ref={ref} {...rest} />;\n}\n\nexport function DocumentedParent() {\n  const r = useRef(null);\n  return <DocumentedInput ref={r} aria-label=\"documented\" />;\n}"
          },
          {
            "title": "Q18: String ref legacy — don't use",
            "explain": "Task:\nref=\"myRef\" string refs removed long ago — useRef/createRef only.\n\nIn simple words:\nReact 19 assumes modern ref API.\nReact 18 already no string refs.\nInterview historical: string refs old class era.\nCallback ref + useRef cover all cases.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const stringRefNote = \"String refs dead — useRef or callback ref only.\";"
          },
          {
            "title": "Q19: [ADV] When NOT ref — state/props instead",
            "explain": "Task:\nDo not abuse ref to read child value — lift state up.\n\nIn simple words:\nref = imperative DOM/focus/scroll/measure — not data flow.\nReact 18 same anti-pattern.\nForm values: controlled state or FormData submit — scraping ref.current.value is fragile.\nParent needs text → value/onChange props.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function PreferStateOverRef() {\n  const [text, setText] = useState(\"\");\n  return (\n    <input value={text} onChange={(e) => setText(e.target.value)} />\n  );\n}"
          },
          {
            "title": "Q20: [MID] Server Components — refs client-only",
            "explain": "Task:\nComponent using ref should be 'use client'.\n\nIn simple words:\nRef is meaningless in Server Component — no DOM instance with same client-side lifecycle.\nPass ref to client child that wraps DOM element.\nReact 18 CSR everything client — RSC split is a new concern.\nPattern: Server layout + Client input with ref for focus trap.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const rscRefNote = \"Refs attach in client components; server components don't use refs on DOM.\";"
          },
          {
            "title": "Q21: [ADV] Compiler + ref prop",
            "explain": "Task:\nCompiler may optimize ref prop pass-through — still do not read during render.\n\nIn simple words:\nSimple forward ref components may be memoized automatically.\nBe careful with useImperativeHandle deps — stale inner ref if deps wrong.\nReact 18 manual memo on forwardRef components was common.\nRules of React purity still apply.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function CompilerRefNote() {\n  return <p>Compiler may memoize ref-forwarding components; refs remain imperative.</p>;\n}"
          },
          {
            "title": "Q22: [ADV] Interview — ref React 18 vs 19 summary",
            "explain": "Task:\n18: forwardRef required for function components.\n19: ref regular prop; forwardRef legacy compat.\n\nIn simple words:\ncallback ref, useImperativeHandle unchanged semantically.\nTraps: not forwarding ref; reading ref in render; merge conflicts.\nMigration incremental; libs lag on typings.\nClass refs unchanged; DOM refs still useRef primary.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export const refInterviewSummary = {\n  react18: \"forwardRef(function Component(props, ref))\",\n  react19: \"function Component({ ref, ...props })\",\n  unchanged: [\"useRef\", \"callback refs\", \"useImperativeHandle semantics\"],\n  traps: [\"accept ref but not attach\", \"read ref during render\", \"forget mergeRefs with libs\"],\n};"
          }
        ]
      },
      {
        "file": "35_React19_DocumentMetadata.jsx",
        "title": "35 — Document Metadata",
        "kya": "Before, in React SPAs we set document.title = '...' in useEffect,",
        "detail": "35 — React 19 Document Metadata (title / meta in tree)\nLevel: REACT19  |  Study in order: read this file first, then the next number\n\nSIMPLE: Before, in React SPAs we set document.title = '...' in useEffect,\nor used libraries like react-helmet.\n\nReact 19: write <title>, <meta>, <link> directly INSIDE the component —\nReact hoists and manages them in the document <head>.\n\nThink of each page component bringing its own nameplate (title);\nReact puts it up at the front desk.\n\nWHY: Less effect soup; SSR/RSC friendly metadata story.\nINTERVIEW: client-only title vs RSC metadata; conflicting titles.",
        "intro": "35 — React 19 Document Metadata (title / meta in tree)\nLevel: REACT19  |  Study in order: read this file first, then the next number\n\nSIMPLE: Before, in React SPAs we set document.title = '...' in useEffect,\nor used libraries like react-helmet.\n\nReact 19: write <title>, <meta>, <link> directly INSIDE the component —\nReact hoists and manages them in the document <head>.\n\nThink of each page component bringing its own nameplate (title);\nReact puts it up at the front desk.\n\nWHY: Less effect soup; SSR/RSC friendly metadata story.\nINTERVIEW: client-only title vs RSC metadata; conflicting titles.",
        "questions": [
          {
            "title": "Q1: Basic <title> inside page component",
            "explain": "In simple words:\nRoute/page render → title tag component tree me.\nBrowser tab text update.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function AboutPage() {\n  return (\n    <>\n      <title>About — MyApp</title>\n      <h1>About</h1>\n      <p>We build things.</p>\n    </>\n  );\n}"
          },
          {
            "title": "Q2: <meta> description / og tags",
            "explain": "In simple words:\nmeta for SEO + social previews.\nIn real production, frameworks (Next Metadata API) are also used —\nReact 19 built-in = foundation.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function ProductPage({ product }) {\n  return (\n    <>\n      <title>{product.name} — Shop</title>\n      <meta name=\"description\" content={product.blurb} />\n      <meta property=\"og:title\" content={product.name} />\n      <h1>{product.name}</h1>\n    </>\n  );\n}"
          },
          {
            "title": "Q3: [MID] Dynamic title with state",
            "explain": "In simple words:\nTitle is also render output — state changes, title re-renders.\nLess need to sync document.title with useEffect.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function CartTitle({ count }) {\n  return (\n    <>\n      <title>{count ? `Cart (${count})` : \"Cart\"}</title>\n      <h1>Your cart</h1>\n    </>\n  );\n}\n\nexport function CartApp() {\n  const [count, setCount] = useState(2);\n  return (\n    <div>\n      <CartTitle count={count} />\n      <button onClick={() => setCount((c) => c + 1)}>Add</button>\n    </div>\n  );\n}"
          },
          {
            "title": "Q4: <link rel=\"stylesheet\"> / canonical idea",
            "explain": "In simple words:\ndeclare link tags from the tree too.\nCareful: duplicate stylesheets — design system / bundler usually better.\ncanonical URL meta/link SEO pattern.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function Article({ slug, title }) {\n  return (\n    <>\n      <title>{title}</title>\n      <link rel=\"canonical\" href={`https://example.com/a/${slug}`} />\n      <article>\n        <h1>{title}</h1>\n      </article>\n    </>\n  );\n}"
          },
          {
            "title": "Q5: [MID] Conflict — what if two components set the title?",
            "explain": "In simple words:\nLast / deeper / framework precedence — depends on the environment.\nPractice: ONE page-level owner for title; do not leave random titles in children.\nInterview: \"single source of truth for document title per route\".",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function NestedTitlesBad() {\n  return (\n    <>\n      <title>Parent</title>\n      <ChildAlsoSetsTitle />\n    </>\n  );\n}\n\nfunction ChildAlsoSetsTitle() {\n  return (\n    <>\n      <title>Child wins? depends</title>\n      <p>Prefer one owner</p>\n    </>\n  );\n}"
          },
          {
            "title": "Q6: Old useEffect way (contrast)",
            "explain": "In simple words:\nIt still works — but React 19 declarative metadata is cleaner.\nIn SSR, effects run late — title flash possible; tree metadata is a better story.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function OldTitleEffect() {\n  // useEffect(() => { document.title = 'Old way'; }, []);\n  return <p>Prefer &lt;title&gt; in React 19+</p>;\n}"
          },
          {
            "title": "Q7: [MID] Frameworks vs raw React 19",
            "explain": "In simple words:\nNext.js App Router: export metadata / generateMetadata — first-class.\nVite SPA: React 19 title/meta tags helpful on client.\nKnow which environment you are in — answer accordingly.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const environments = {\n  nextAppRouter: \"use Next metadata APIs primarily\",\n  spaVite: \"React 19 <title>/<meta> in components works client-side\",\n};"
          },
          {
            "title": "Q8: Accessibility — title meaningful",
            "explain": "In simple words:\nDo not leave \"Document\" in the tab — make the page purpose clear.\nMulti-page app: unique titles help screen reader users switching tabs.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function GoodTitles() {\n  return (\n    <>\n      <title>Settings — Profile — MyApp</title>\n      <h1>Profile settings</h1>\n    </>\n  );\n}"
          },
          {
            "title": "Q9: [MID] Title update on route change — SPA",
            "explain": "Task:\n<title> per page component in React Router route element.\n\nIn simple words:\nRoute render → title in component tree → tab update.\nReact 18: useEffect document.title on pathname change.\nReact 19: declarative title in each route component cleaner.\nTrap: layout + page both set title — decide one owner (page usually wins).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function DashboardRouteTitle() {\n  return (\n    <>\n      <title>Dashboard — MyApp</title>\n      <h1>Dashboard</h1>\n    </>\n  );\n}"
          },
          {
            "title": "Q10: og:image / twitter cards",
            "explain": "Task:\n<meta property=\"og:image\" content=\"https://...\" /> for social share.\n\nIn simple words:\nAbsolute URL prefer — relative OG images break on shares.\nReact 18 react-helmet async similar tags.\nSSR/RSC: metadata in first HTML response is best — for crawlers.\nClient-only SPA: some bots weak JS — SSR still SEO win.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function SharePage({ imageUrl, title }) {\n  return (\n    <>\n      <title>{title}</title>\n      <meta property=\"og:title\" content={title} />\n      <meta property=\"og:image\" content={imageUrl} />\n      <meta name=\"twitter:card\" content=\"summary_large_image\" />\n      <h1>{title}</h1>\n    </>\n  );\n}"
          },
          {
            "title": "Q11: [MID] Multiple meta same name — trap",
            "explain": "Task:\nTwo <meta name=\"description\"> — precedence unclear; keep only one.\n\nIn simple words:\nSame as duplicate title — single page-level SEO owner.\nReact 18 helmet override rules similar confusion.\nLayout default description + page override — read your framework merge rules.\nWhen NOT: leave random SEO tags in child components.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function DuplicateMetaTrap() {\n  return (\n    <>\n      <meta name=\"description\" content=\"Layout default\" />\n      <meta name=\"description\" content=\"Page specific — avoid duplicate\" />\n      <p>Prefer one description owner per route</p>\n    </>\n  );\n}"
          },
          {
            "title": "Q12: lang attribute on html — who sets?",
            "explain": "Task:\n<html lang=\"en\"> usually in root index.html or framework layout.\n\nIn simple words:\nReact 19 title/meta hoist; html lang often static shell.\ni18n route: framework may set lang per locale.\nReact 18: same — rarely html lang from component tree.\na11y: lang helps screen readers pronunciation.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function LangNote() {\n  return <p>html lang typically set in root template, not every page component.</p>;\n}"
          },
          {
            "title": "Q13: [MID] useEffect document.title migration",
            "explain": "Task:\nOld pattern: useEffect(() => { document.title = t }, [t]) → replace with <title>{t}</title>.\n\nIn simple words:\nRemove effect cleanup title restore hacks when using declarative tags.\nReact 18 effect runs after paint — title flash possible.\nReact 19 tree metadata integrates with render commit story better.\nKeep effect for non-declarative APIs (analytics) only.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function MigratedTitle({ pageName }) {\n  return (\n    <>\n      <title>{pageName} — MyApp</title>\n      <h1>{pageName}</h1>\n    </>\n  );\n}"
          },
          {
            "title": "Q14: robots noindex page",
            "explain": "Task:\n<meta name=\"robots\" content=\"noindex, nofollow\" /> staging/admin pages.\n\nIn simple words:\nDeclare from component tree — in admin route component.\nReact 18 helmet equivalent.\nSSR important — client-only late inject weaker for crawlers.\nDon't noindex production by mistake — env guard.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function StagingPage() {\n  return (\n    <>\n      <meta name=\"robots\" content=\"noindex, nofollow\" />\n      <title>Staging — internal</title>\n      <p>Not for Google</p>\n    </>\n  );\n}"
          },
          {
            "title": "Q15: [MID] Next.js generateMetadata vs React 19 <title>",
            "explain": "Task:\nIn Next App Router generateMetadata/export metadata is often preferred.\n\nIn simple words:\nReact 19 <title> in client components works; Next adds static optimization.\nReact 18 Next: Head from next/head Pages router.\nAnswer interview by environment: \"Next metadata API vs raw React 19 tags\".\nBoth aim for the same goal — correct head per route.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const nextVsReact19Meta = {\n  nextAppRouter: \"export metadata / generateMetadata primary\",\n  rawReact19: \"<title>/<meta> in component tree\",\n};"
          },
          {
            "title": "Q16: favicon link rel=\"icon\"",
            "explain": "Task:\n<link rel=\"icon\" href=\"/favicon.ico\" /> — page or root once.\n\nIn simple words:\nUsually index.html once — avoid duplicate on every page.\nPer-section favicon rare — dynamic route possible teaching only.\nReact 18 public folder static same.\nDuplicate link icons — browser picks one unpredictably.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function FaviconNote() {\n  return (\n    <>\n      <link rel=\"icon\" href=\"/favicon.ico\" />\n      <p>Set favicon once at app shell when possible</p>\n    </>\n  );\n}"
          },
          {
            "title": "Q17: [MID] Client navigation title delay",
            "explain": "Task:\nSPA client route change — title updates on render, fast usually.\n\nIn simple words:\nSlow route lazy load — title updates when page component mounts.\nReact 18 same with effect title.\nSuspense fallback route — title from fallback or previous until resolve.\nUX: meaningful fallback title during load optional.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function LazyRouteTitleNote() {\n  return <p>Title updates when route component renders — after lazy chunk loads.</p>;\n}"
          },
          {
            "title": "Q18: Structured data JSON-LD — still script tag",
            "explain": "Task:\nSEO rich results: <script type=\"application/ld+json\"> often in page still.\n\nIn simple words:\nReact 19 metadata tags cover title/meta/link — JSON-LD separate concern.\nReact 18 same — helmet or manual script.\ndangerouslySetInnerHTML careful — sanitize static JSON only.\nRSC: colocate JSON-LD server component near data.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function ArticleJsonLd({ article }) {\n  const json = JSON.stringify({\n    \"@context\": \"https://schema.org\",\n    \"@type\": \"Article\",\n    headline: article.title,\n  });\n  return (\n    <>\n      <title>{article.title}</title>\n      <script type=\"application/ld+json\">{json}</script>\n      <article>{article.title}</article>\n    </>\n  );\n}"
          },
          {
            "title": "Q19: [ADV] When NOT declarative metadata in React",
            "explain": "Task:\nFully static site — build-time HTML head enough; no runtime React title needed.\n\nIn simple words:\nMarketing one-pager SSR pre-rendered — meta in template.\nReact 19 win = dynamic per-user/per-route titles in SPA/SSR apps.\nCMS-driven head — framework layer may centralize better than scattered tags.\nOver-tagging every child component — anti-pattern.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const whenNotTreeMetadata = [\n  \"static prebuilt HTML sufficient\",\n  \"framework central metadata API preferred\",\n  \"deep child components tagging randomly\",\n];"
          },
          {
            "title": "Q20: [MID] Hydration + title mismatch",
            "explain": "Task:\nServer render title \"A\"; client first render title \"B\" — mismatch warning possible.\n\nIn simple words:\nInitial client render match server HTML head expectations.\nReact 18 hydration mismatch similar with effect-set title timing.\nUser-specific title: fetch on server or after mount consistently.\nDate in title — server/client TZ difference trap.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function HydrationTitleSafe({ userName }) {\n  return (\n    <>\n      <title>{userName ? `${userName} — MyApp` : \"MyApp\"}</title>\n      <h1>Hello {userName ?? \"guest\"}</h1>\n    </>\n  );\n}"
          },
          {
            "title": "Q21: [ADV] Priority / precedence mental model",
            "explain": "Task:\nDeeper / later mounted title may override — exact rules implementation-dependent.\n\nIn simple words:\nDo not rely on \"child always wins\" — explicit architecture.\nReact 18 helmet prioritizeRegisteredMeta similar battles.\nSingle RouteHead component pattern team-wide.\nTesting: assert document.title in E2E after navigation.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function SingleOwnerPattern({ title, children }) {\n  return (\n    <>\n      <title>{title}</title>\n      {children}\n    </>\n  );\n}"
          },
          {
            "title": "Q22: [ADV] Interview — metadata React 18 vs 19",
            "explain": "Task:\n18: useEffect + react-helmet; 19: <title>/<meta> in JSX tree hoist to head.\n\nIn simple words:\nBenefits: declarative, SSR friendly, less effect soup.\nTraps: duplicate tags, wrong owner, client-only SEO limits.\nFrameworks layer on top (Next metadata).\na11y unique titles per view still matter.\nlink canonical absolute URLs; OG images absolute.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export const metadataInterviewSummary = {\n  react18: \"useEffect document.title / react-helmet\",\n  react19: \"declarative title/meta/link in component tree\",\n  traps: [\"duplicate title/meta\", \"multiple owners\", \"client-only crawlers\", \"TZ mismatch in dynamic titles\"],\n  practices: [\"one head owner per route\", \"absolute OG URLs\", \"meaningful unique titles\"],\n};"
          }
        ]
      },
      {
        "file": "36_React19_ContextAsProvider.jsx",
        "title": "36 — Context As Provider",
        "kya": "Before, you always wrote:",
        "detail": "36 — React 19 Context as Provider\nLevel: REACT19  |  Study in order: read this file first, then the next number\n\nSIMPLE: Before, you always wrote:\n  <ThemeContext.Provider value={...}>...</ThemeContext.Provider>\n\nReact 19: The Context object itself acts as the provider:\n  <ThemeContext value={...}>...</ThemeContext>\n\n.Provider is still supported (compat). The new style is shorter and cleaner.\n\nThink of Context as a branded box; before you had to stick on a separate \"Provider\" label;\nnow the box can sit on the shelf by itself.\n\nWHY: Small DX change; signals in interviews that you have seen React 19 notes.\nINTERVIEW: value identity re-render; split contexts; use(context).",
        "intro": "36 — React 19 Context as Provider\nLevel: REACT19  |  Study in order: read this file first, then the next number\n\nSIMPLE: Before, you always wrote:\n  <ThemeContext.Provider value={...}>...</ThemeContext.Provider>\n\nReact 19: The Context object itself acts as the provider:\n  <ThemeContext value={...}>...</ThemeContext>\n\n.Provider is still supported (compat). The new style is shorter and cleaner.\n\nThink of Context as a branded box; before you had to stick on a separate \"Provider\" label;\nnow the box can sit on the shelf by itself.\n\nWHY: Small DX change; signals in interviews that you have seen React 19 notes.\nINTERVIEW: value identity re-render; split contexts; use(context).",
        "questions": [
          {
            "title": "Q1: New syntax — <ThemeContext value={...}>",
            "explain": "In simple words:\nNo separate Provider wrapper name — the Context itself is the JSX tag.\nSame idea for the value prop.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Themed() {\n  const theme = useContext(ThemeContext);\n  return <span>{theme}</span>;\n}\n\nexport function AppNewProviderStyle() {\n  return (\n    <ThemeContext value=\"dark\">\n      <Themed />\n    </ThemeContext>\n  );\n}"
          },
          {
            "title": "Q2: Old .Provider — still OK",
            "explain": "In simple words:\nLibraries / old code will use .Provider.\nUnderstand both for migration.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function AppLegacyProvider() {\n  return (\n    <ThemeContext.Provider value=\"light\">\n      <Themed />\n    </ThemeContext.Provider>\n  );\n}"
          },
          {
            "title": "Q3: [MID] value={{}} every render — performance trap",
            "explain": "In simple words:\nInline object value={{ user }} creates a new reference every render —\nconsumers re-render.\nFix: stable value with useState/useMemo, or split context, or store outside.\n(React Compiler may help later — file 39 — do not blindly trust it.)",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function AuthProvider({ children }) {\n  const [user, setUser] = useState(null);\n  // Better: const value = useMemo(() => ({ user, setUser }), [user]);\n  // Teaching shows the pitfall:\n  return (\n    <AuthContext value={{ user, setUser }}>\n      {children}\n    </AuthContext>\n  );\n}"
          },
          {
            "title": "Q4: Nested providers — nearest wins",
            "explain": "In simple words:\nThe inner Context value overrides the outer one.\nTheme dark outside, light inside the section.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function NestedTheme() {\n  return (\n    <ThemeContext value=\"dark\">\n      <Themed />\n      <ThemeContext value=\"light\">\n        <Themed />\n      </ThemeContext>\n    </ThemeContext>\n  );\n}"
          },
          {
            "title": "Q5: use(Context) with new provider style",
            "explain": "In simple words:\nFile 33: use(ThemeContext) conditional allowed.\nRead API stays the same despite provider syntax change.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function OptionalTheme({ forced }) {\n  if (forced) return <span>{forced}</span>;\n  const theme = use(ThemeContext);\n  return <span>{theme}</span>;\n}\n\nexport function UseWithProvider() {\n  return (\n    <ThemeContext value=\"dark\">\n      <OptionalTheme />\n      <OptionalTheme forced=\"system\" />\n    </ThemeContext>\n  );\n}"
          },
          {
            "title": "Q6: [MID] Default value when Provider is missing",
            "explain": "In simple words:\ncreateContext(default) — if there is no Provider/Context wrapper,\nyou get the default. Bug or intentional optional theme.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function NoProvider() {\n  // ThemeContext default \"light\"\n  return <Themed />;\n}"
          },
          {
            "title": "Q7: Split context — state vs dispatch",
            "explain": "In simple words:\nMid pattern: different change frequency → different contexts.\nSo the button only subscribes to dispatch, not re-render on state change.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const CountStateContext = createContext(0);\nconst CountDispatchContext = createContext(() => {});\n\nexport function SplitCountProvider({ children }) {\n  const [count, setCount] = useState(0);\n  return (\n    <CountStateContext value={count}>\n      <CountDispatchContext value={setCount}>\n        {children}\n      </CountDispatchContext>\n    </CountStateContext>\n  );\n}\n\nfunction CountLabel() {\n  return <span>{useContext(CountStateContext)}</span>;\n}\nfunction IncButton() {\n  const setCount = useContext(CountDispatchContext);\n  return <button onClick={() => setCount((c) => c + 1)}>+</button>;\n}\n\nexport function SplitCountApp() {\n  return (\n    <SplitCountProvider>\n      <CountLabel />\n      <IncButton />\n    </SplitCountProvider>\n  );\n}"
          },
          {
            "title": "Q8: [MID] Interview one-liner",
            "explain": "In simple words:\n\"In React 19 <MyContext value> = Provider; .Provider legacy-ok.\nRe-renders follow value identity; split contexts when heavy.\"",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const line =\n  \"<Context value={...}> in React 19; watch referential equality of value.\";"
          },
          {
            "title": "Q9: useMemo for stable context value",
            "explain": "Task:\nconst value = useMemo(() => ({ user, setUser }), [user]) — fewer re-renders.\n\nIn simple words:\nQ3 trap fix — inline object is a new reference every render.\nReact 18 same performance pattern with .Provider.\nReact 19 syntax change only — performance rules unchanged.\nCompiler may help but explicit useMemo still valid.\nsetUser stable from useState — include user in deps.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function AuthProviderMemo({ children }) {\n  const [user, setUser] = useState(null);\n  const value = useMemo(() => ({ user, setUser }), [user]);\n  return <AuthContext value={value}>{children}</AuthContext>;\n}"
          },
          {
            "title": "Q10: [MID] Provider value primitive — stable",
            "explain": "Task:\n<ThemeContext value=\"dark\"> — string primitive stable automatically.\n\nIn simple words:\nNo referential issue — consumers re-render when the string value changes.\nReact 18 .Provider value=\"dark\" same.\nObjects/functions need memoization; primitives are safe inline.\nInterview: \"inline object bad; inline string OK\".",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function PrimitiveThemeProvider({ children }) {\n  return <ThemeContext value=\"dark\">{children}</ThemeContext>;\n}"
          },
          {
            "title": "Q11: Context + use() conditional read recap",
            "explain": "Task:\nOptionalTheme Q5 — use(ThemeContext) when prop missing.\n\nIn simple words:\nProvider syntax 19; read API use() flexible (file 33).\nReact 18 useContext unconditional only.\nMigration: provider syntax optional first; use() when needed.\nDon't conditional useContext — rules violation.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function ConditionalReadRecap() {\n  return (\n    <ThemeContext value=\"dark\">\n      <OptionalTheme />\n    </ThemeContext>\n  );\n}"
          },
          {
            "title": "Q12: [MID] Multiple contexts — avoid mega context",
            "explain": "Task:\nDo not put 20 fields in one context — split by change frequency.\n\nIn simple words:\nScale the Q7 split state/dispatch pattern.\nReact 18 same advice — not 19 specific.\nMega context → any field change → all consumers re-render.\nZustand/Redux when global complex — context for moderate tree sharing.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const avoidMegaContext =\n  \"Split contexts by update frequency; state vs dispatch pattern scales.\";"
          },
          {
            "title": "Q13: Default context + optional provider",
            "explain": "Task:\ncreateContext('light') — App section gets default theme without provider.\n\nIn simple words:\nIntentional default vs missing provider bug — document which.\nReact 18 .Provider optional same default behavior.\nTesting: render without provider assert default read.\nProduction: usually explicit provider at app root anyway.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function DefaultThemeSection() {\n  return (\n    <div>\n      <Themed />\n      <p>Uses default light when no provider wrapper</p>\n    </div>\n  );\n}"
          },
          {
            "title": "Q14: [ADV] Context as Provider — library compatibility",
            "explain": "Task:\nOld lib docs say .Provider — you can use <Ctx value> on the same context object.\n\nIn simple words:\nSame createContext return supports both JSX forms in 19.\nMixed codebase during migration normal.\nPublish libs supporting both until major bump.\nTypeScript children + value props typed on Context object.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function LibCompatNote() {\n  return (\n    <ThemeContext.Provider value=\"light\">\n      <Themed />\n    </ThemeContext.Provider>\n  );\n}"
          },
          {
            "title": "Q15: [MID] React 18 → 19 provider syntax migration",
            "explain": "Task:\nCodemod: .Provider → direct Context tag; value prop same.\n\nIn simple words:\nZero behavior change if value identity same.\nRead hooks unchanged useContext/use.\nSnapshot tests same HTML structure.\nOptional gradual — .Provider not removed.\nInterview: \"syntax sugar; perf rules unchanged\".",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const providerSyntaxMigration =\n  \"Replace <Ctx.Provider value={v}> with <Ctx value={v}> — optional gradual migration.\";"
          },
          {
            "title": "Q16: Consumer pattern legacy",
            "explain": "Task:\nThemeContext.Consumer render props — old; prefer useContext/use.\n\nIn simple words:\nWorks in React 18/19 but verbose.\nNew code: useContext or use(Context).\nProvider syntax update doesn't affect Consumer API — still legacy.\nRemove Consumers during refactors.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function LegacyConsumerDemo() {\n  return (\n    <ThemeContext value=\"dark\">\n      <ThemeContext.Consumer>\n        {(theme) => <span>{theme}</span>}\n      </ThemeContext.Consumer>\n    </ThemeContext>\n  );\n}"
          },
          {
            "title": "Q17: [MID] Context + Server Components boundary",
            "explain": "Task:\nPass context from Server Component to Client child — wrap with a Client provider.\n\nIn simple words:\nContext consumer/client provider often on the 'use client' side.\nServer can't use useContext dynamically same as client interactive tree.\nPattern: ClientProviders wrapper at layout root.\nReact 18 CSR-only: no boundary issue.\nSerializable context value only across RSC — functions OK client-only provider.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function RscContextNote() {\n  return (\n    <p>\n      Wrap client subtree with Context provider; server components pass serializable props\n      into client providers when needed.\n    </p>\n  );\n}"
          },
          {
            "title": "Q18: [ADV] When NOT Context",
            "explain": "Task:\nFrequent global updates, large app state, time-travel debug — Redux/Zustand.\n\nIn simple words:\nContext is great for moderate prop-drill fixes — not always a full data layer.\nReact 18 same guidance.\nForm local state, URL state (router), query cache — often better homes.\nContext hell = too many providers nested — flatten or use an external store.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const whenNotContext = [\n  \"high-frequency global updates\",\n  \"complex middleware/devtools needs\",\n  \"server cache (TanStack Query)\",\n  \"URL-driven state (router search params)\",\n];"
          },
          {
            "title": "Q19: [MID] Testing context providers",
            "explain": "Task:\nTest wrapper: <ThemeContext value=\"dark\">{ui}</ThemeContext> — 19 syntax clean.\n\nIn simple words:\nRTL render with provider wrapper helper.\nReact 18 .Provider in tests identical value injection.\nDefault context test without wrapper for optional behavior.\nMock providers per test file — avoid global pollution.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function TestWrapper({ children }) {\n  return <ThemeContext value=\"test\">{children}</ThemeContext>;\n}"
          },
          {
            "title": "Q20: [ADV] Compiler + context value",
            "explain": "Task:\nCompiler auto-memo is partial — still manually fix the value={{}} trap.\n\nIn simple words:\nDo not assume the compiler always fixes unstable object values.\nReact 18 manual memo on value; 19 same + compiler assist possible.\nMeasure re-renders React DevTools profiler.\nSplit contexts beats heroic memo sometimes.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function CompilerContextNote() {\n  return <p>Compiler helps but unstable context value objects still warrant useMemo or split.</p>;\n}"
          },
          {
            "title": "Q21: [MID] Auth context common bug — new function in value",
            "explain": "Task:\nvalue={{ login: () => {...}, user }} — login new ref every render.\n\nIn simple words:\nAll consumers re-render even if user unchanged.\nFix: useCallback login + useMemo value object.\nReact 18 identical bug with .Provider.\nSplit: AuthStateContext + AuthActionsContext (stable dispatch refs).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function AuthProviderBuggy({ children }) {\n  const [user, setUser] = useState(null);\n  // Buggy: new login fn each render\n  return (\n    <AuthContext value={{ user, login: () => setUser({ name: \"Ada\" }) }}>\n      {children}\n    </AuthContext>\n  );\n}"
          },
          {
            "title": "Q22: [ADV] Interview — Context React 19 summary",
            "explain": "Task:\n<Ctx value> replaces .Provider; use/useContext read; value identity perf trap same.\n\nIn simple words:\nNot a state management revolution — DX + docs alignment.\nSplit contexts, memoized values, primitives safe inline.\nuse() conditional read paired with 19 provider syntax.\nTraps: inline objects/functions in value; mega context; missing provider confusion.\nMigration optional .Provider still works.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export const contextInterviewSummary = {\n  react19Syntax: \"<ThemeContext value={v}> children </ThemeContext>\",\n  legacySyntax: \"<ThemeContext.Provider value={v}> still OK\",\n  performance: \"stable value reference — useMemo/split contexts\",\n  readApi: \"useContext or use(Context) — conditional only with use()\",\n  traps: [\"inline object value\", \"unstable functions in value\", \"mega context re-renders\"],\n};"
          }
        ]
      },
      {
        "file": "37_ServerComponentsIntro.jsx",
        "title": "37 — Server Components Intro",
        "kya": "Classic SPA — the entire React JS bundle goes to the browser; data is fetched in useEffect.",
        "detail": "37 — Server Components Intro (RSC mental model)\nLevel: REACT19  |  Study in order: read this file first, then the next number\n\nSIMPLE: Classic SPA — the entire React JS bundle goes to the browser; data is fetched in useEffect.\nServer Components (RSC) — some components render on the SERVER,\nthe browser gets HTML/payload, and their JS does not go into the bundle.\n\nThink of a restaurant:\n  Server Component = prepare the dish in the kitchen and send the plate (heavy work on the server).\n  Client Component = interactive at the table (hooks, onClick, browser APIs).\n\n'use client' = \"CLIENT boundary from here downward\".\nPut the directive at the TOP of the file. Once client = its imports join the client graph too.\n\nReact 19 stabilizes and mainstreams this story (Next App Router, etc.).\n\nWHY: RSC vs client is almost standard in mid+ interviews.\nINTERVIEW: when to use 'use client'; secrets on server; children slot pattern.",
        "intro": "37 — Server Components Intro (RSC mental model)\nLevel: REACT19  |  Study in order: read this file first, then the next number\n\nSIMPLE: Classic SPA — the entire React JS bundle goes to the browser; data is fetched in useEffect.\nServer Components (RSC) — some components render on the SERVER,\nthe browser gets HTML/payload, and their JS does not go into the bundle.\n\nThink of a restaurant:\n  Server Component = prepare the dish in the kitchen and send the plate (heavy work on the server).\n  Client Component = interactive at the table (hooks, onClick, browser APIs).\n\n'use client' = \"CLIENT boundary from here downward\".\nPut the directive at the TOP of the file. Once client = its imports join the client graph too.\n\nReact 19 stabilizes and mainstreams this story (Next App Router, etc.).\n\nWHY: RSC vs client is almost standard in mid+ interviews.\nINTERVIEW: when to use 'use client'; secrets on server; children slot pattern.",
        "questions": [
          {
            "title": "Q1: Default server vs client (Next-style mental model)",
            "explain": "In simple words:\nIn App Router, default = Server Component.\nNeed useState/onClick → add 'use client' to the file.\nIn Vite-only CSR apps everything is client — RSC needs framework support.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "// // app/page.js  (Server Component — NO 'use client')\n// async function Page() {\n//   const data = await db.posts(); // DB directly on server\n//   return <ul>{data.map(...)}</ul>;\n// }"
          },
          {
            "title": "Q2: 'use client' boundary",
            "explain": "In simple words:\nPut the directive string at the very start of the file (before imports).\nHooks + events are OK in that file.\nServer parent can import Client child; be careful the other way (server-only code).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "// \"use client\";\n//\n// import { useState } from \"react\";\n//\n// export function Counter() {\n//   const [n, setN] = useState(0);\n//   return <button onClick={() => setN(n + 1)}>{n}</button>;\n// }"
          },
          {
            "title": "Q3: [MID] What is ALLOWED / DISALLOWED on the server",
            "explain": "In simple words:\nServer ✅: async component, await fetch/DB, secrets/env on server, heavy libs with zero bundle.\nServer ❌: useState, useEffect, browser DOM, onClick (needs client child).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const serverAllowed = [\"async/await fetch\", \"DB access\", \"fs (careful)\", \"render static UI\"];\nconst serverDenied = [\"useState\", \"useEffect\", \"onClick\", \"window\"];"
          },
          {
            "title": "Q4: Composition — Server wraps Client",
            "explain": "In simple words:\nServerComponent fetches data, gives ClientComponent serializable data in props.\nDo not send functions/classes in props (serialization boundary).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "// // Server\n// async function ProductPage() {\n//   const product = await getProduct();\n//   return <AddToCartButton productId={product.id} />; // client child\n// }"
          },
          {
            "title": "Q5: [MID] Children slot — Client shell, Server children",
            "explain": "In simple words:\nPowerful pattern: {children} from the Server come INSIDE a Client layout (state).\nChildren render on server; client JS does not include children's code in the bundle (as server).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "// \"use client\";\n// export function Modal({ children }) {\n//   const [open, setOpen] = useState(false);\n//   return open ? <div>{children}</div> : <button onClick={() => setOpen(true)}>Open</button>;\n// }\n//\n// // Server page:\n// // <Modal><ExpensiveServerChart /></Modal>"
          },
          {
            "title": "Q6: Bundle size intuition",
            "explain": "In simple words:\nmarkdown parser on server → not in client bundle.\nSame lib imported in client component → bundle grows.\nInterview gold: \"move heavy non-interactive work to the server\".",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const bundleRule =\n  \"If no interactivity needed, keep it a Server Component — ship less JS.\";"
          },
          {
            "title": "Q7: [MID] Data fetching — useEffect vs Server await",
            "explain": "In simple words:\nCSR: mount → loading → useEffect fetch → setState (waterfall is common).\nRSC: await on server → HTML already with data (fast first paint story).\nClient is still needed for live refetch / interactions.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function CsrFetchContrast() {\n  // teaching-only client pattern contrast\n  // useEffect(() => { fetch('/api').then(...) }, []);\n  return <p>Prefer server await for initial page data when using RSC framework</p>;\n}"
          },
          {
            "title": "Q8: Serializable props boundary",
            "explain": "In simple words:\nServer → Client props: string, number, plain objects/arrays, Map? limited —\nbasically JSON-ish + a few special types (see docs).\nBe careful with Date; functions ❌; class instances ❌.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const serializable = [\"string\", \"number\", \"plain objects\", \"arrays\", \"bigint (check)\"];\nconst notSerializable = [\"functions\", \"class instances\", \"server DB handles\"];"
          },
          {
            "title": "Q9: [MID] Secrets",
            "explain": "In simple words:\nAPI keys belong in Server Component / Server Actions.\nDo not blindly put NEXT_PUBLIC_ / leaked env in 'use client' files.\nRSC security win = do not send secrets to the browser.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const securityLine =\n  \"Server Components can touch secrets; never pass secrets as client props.\";"
          },
          {
            "title": "Q10: When NOT to force everything server",
            "explain": "In simple words:\nHighly interactive UI, optimistic updates, local device APIs → client.\nHybrid: server page shell + client islands.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export const hybridIdea = {\n  server: \"data + static structure\",\n  client: \"buttons, forms interactivity, local state\",\n};"
          },
          {
            "title": "Q11: [MID] 'use client' propagation — import graph",
            "explain": "Task:\nClient file that imports server-only module — build error / accidental bundle.\n\nIn simple words:\n'use client' file imports go into the client bundle.\nServer Component can import Client — OK.\nClient importing fs/DB server module ❌.\nReact 18: everything was client — this split is new.\nFix: server actions / API boundaries; pass serializable props only.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const clientBoundaryRule =\n  \"use client marks boundary — its imports pull into client graph; don't import server secrets.\";"
          },
          {
            "title": "Q12: async Server Component pattern",
            "explain": "Task:\nasync function Page() { const data = await db.query(); return <UI data={data} />; }\n\nIn simple words:\nNo useEffect fetch on mount for initial data — await on server.\nReact 18 CSR: useEffect waterfall.\nSuspense boundaries stream partial HTML (framework dependent).\nError: try/catch server + error.tsx patterns in Next.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function AsyncServerPatternNote() {\n  return (\n    <p>\n      Server components can be async functions awaiting DB/API before render — zero client JS for that logic.\n    </p>\n  );\n}"
          },
          {
            "title": "Q13: [MID] Client-only libraries (charts, maps)",
            "explain": "Task:\nrecharts / leaflet → import in a 'use client' wrapper component on the server page.\n\nIn simple words:\nServer page shell + ClientChart data={serializable} props.\nReact 18: dynamic import ssr:false similar idea Pages router.\nBundle: chart lib client chunk — expected.\nWhen NOT client: static SVG server rendered — creative alternative.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function ClientChartWrapperNote() {\n  return (\n    <p>\n      Wrap third-party interactive libs in client components; server page passes data props.\n    </p>\n  );\n}"
          },
          {
            "title": "Q14: Zero bundle mental model — interview gold",
            "explain": "Task:\nmarkdown-it server only → HTML string to client; no client JS parser.\n\nIn simple words:\n\"Does this code need to run in browser?\" — no → server component candidate.\nReact 18: code split only reduces, still ships if imported client-side.\nRSC: module never in client bundle if only imported server-side.\nMeasure: analyze bundle before/after moving to server.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const zeroBundleLine =\n  \"Server-only imports never ship to browser bundle — stronger than lazy().\";"
          },
          {
            "title": "Q15: [MID] use client at file top — comments allowed?",
            "explain": "Task:\nDirective must be before imports (except some bundlers allow comment block first — follow framework docs).\n\nIn simple words:\nNext: \"use client\" first line typically.\nWrong placement → treated as server → confusing hooks error.\nReact 18 N/A.\nCommon bug: directive after imports → not a client component.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const directivePlacement =\n  \"'use client' at file top before imports — wrong placement causes mysterious hook errors.\";"
          },
          {
            "title": "Q16: Context provider in Server Component?",
            "explain": "Task:\nServer can render <ThemeContext value> wrapping client children — value must be serializable.\n\nIn simple words:\nClient consumers use useContext below the client boundary.\nFunction values in context → client provider needed.\nReact 18 all client — no split.\nPattern: ClientProviders layout wraps {children} server pages.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function ServerProviderNote() {\n  return (\n    <p>\n      Server can render context wrapper with serializable values; functions belong in client providers.\n    </p>\n  );\n}"
          },
          {
            "title": "Q17: [MID] Partial Prerendering / streaming (conceptual)",
            "explain": "Task:\nStatic shell fast; dynamic holes Suspense stream — Next PPR direction.\n\nIn simple words:\nReact 18 Suspense client-side; RSC streaming server HTML chunks.\nInterview high-level: faster TTFB + progressive fill.\nExact API is framework-specific — do not invent from memory.\nFallback UI meaningful during stream.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const streamingNote =\n  \"RSC + Suspense enable streaming HTML; frameworks implement PPR/stream details.\";"
          },
          {
            "title": "Q18: [ADV] Anti-pattern — entire app 'use client'",
            "explain": "Task:\nRoot layout client → RSC benefits mostly gone.\n\nIn simple words:\n\"use client\" at app root except providers = basically SPA in App Router.\nReact 18 equivalent — normal.\nFix: push client boundaries down to interactive leaves.\nServer pages for data; client islands for buttons/forms.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function AvoidRootClientNote() {\n  return <p>Keep use client at leaves — not root layout unless necessary.</p>;\n}"
          },
          {
            "title": "Q19: [MID] Environment variables RSC",
            "explain": "Task:\nprocess.env.SECRET server component OK; NEXT_PUBLIC_* client visible.\n\nIn simple words:\nReact 18 CRA/Vite: only VITE_* exposed — same security mindset.\nNever pass secret as prop to client child.\nEmbed secret in server-side fetch only.\nInterview security win RSC vs CSR data fetching.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const envRscRule =\n  \"Server env secrets OK on server components; client only public prefixed env vars.\";"
          },
          {
            "title": "Q20: [ADV] CSR-only apps — RSC N/A",
            "explain": "Task:\nVite + React DOM client — no Server Components without major framework add-on.\n\nIn simple words:\nReact 19 features useActionState etc. still work CSR.\nIn interviews say the RSC mental model: \"needs a framework like Next App Router\".\nReact 18 vs 19 CSR: Actions/hooks still upgrade value.\nDo not force RSC concepts where the stack does not support them.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function CsrOnlyNote() {\n  return (\n    <p>Vite SPA: learn RSC conceptually for interviews; use React 19 client hooks locally.</p>\n  );\n}"
          },
          {
            "title": "Q21: [MID] Children slot pattern recap + trap",
            "explain": "Task:\nClient Modal {children} with server content — children server-rendered through slot.\n\nIn simple words:\nPowerful — modal is client, heavy list is server.\nTrap: pass server component as prop vs children — read Next composition rules.\nReact 18 no equivalent slot server/client split.\nImproves bundle vs wrongly importing server list inside client modal file.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const childrenSlotTrap =\n  \"Pass server content as children into client shell — don't import server components into client files incorrectly.\";"
          },
          {
            "title": "Q22: [ADV] Interview — RSC rapid answers",
            "explain": "Task:\nDefault server (Next), use client for hooks/events, serializable props, secrets server-side.\n\nIn simple words:\nvs React 18 CSR: less client JS, server data colocated, hybrid islands.\nWhen NOT: no framework support, highly client-only app, whole app interactive.\nTraps: client imports server code; non-serializable props; root use client; secrets in client env.\nBundle: move heavy non-interactive code server-side.\nPair with Server Actions (file 38) for mutations.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export const rscInterviewSummary = {\n  default: \"Server Components in supported frameworks (Next App Router)\",\n  clientBoundary: \"'use client' for hooks, events, browser APIs\",\n  props: \"serializable only server → client\",\n  security: \"secrets and DB on server only\",\n  whenNot: [\"Vite CSR only stack\", \"fully interactive app\", \"no RSC framework\"],\n  traps: [\"client importing server modules\", \"non-serializable props\", \"use client at root\"],\n};"
          }
        ]
      },
      {
        "file": "38_ServerActions.jsx",
        "title": "38 — Server Actions",
        "kya": "A Server Action is a function that runs on the SERVER, but can be triggered from the CLIENT",
        "detail": "38 — Server Actions ('use server')\nLevel: REACT19  |  Study in order: read this file first, then the next number\n\nSIMPLE: A Server Action is a function that runs on the SERVER, but can be triggered from the CLIENT\nvia a call or a form.\n\nAt the top of a file or function: 'use server'\nForm: action={serverAction} — progressive enhancement friendly (frameworks).\nClient: await serverAction(data) as well (with rules).\n\nThink of a remote control: the button is at home (client), the TV in the kitchen (server) changes the channel.\nA serialized call goes over the network — not magic, more like RPC.\n\nWHY: Pairs with Next.js + React 19 forms; common in mid-level interviews.\nINTERVIEW: validation/auth required; secrets; revalidate; vs API route.\n\n-----------------------------------------------------------------------------\nQ1: File-level 'use server'",
        "intro": "38 — Server Actions ('use server')\nLevel: REACT19  |  Study in order: read this file first, then the next number\n\nSIMPLE: A Server Action is a function that runs on the SERVER, but can be triggered from the CLIENT\nvia a call or a form.\n\nAt the top of a file or function: 'use server'\nForm: action={serverAction} — progressive enhancement friendly (frameworks).\nClient: await serverAction(data) as well (with rules).\n\nThink of a remote control: the button is at home (client), the TV in the kitchen (server) changes the channel.\nA serialized call goes over the network — not magic, more like RPC.\n\nWHY: Pairs with Next.js + React 19 forms; common in mid-level interviews.\nINTERVIEW: validation/auth required; secrets; revalidate; vs API route.\n\n-----------------------------------------------------------------------------\nQ1: File-level 'use server'",
        "questions": [
          {
            "title": "Q1: File-level 'use server'",
            "explain": "In simple words:\nThe whole file exports server actions.\nClient components can import actions and call them / attach to forms.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "// \"use server\";\n//\n// export async function createPost(formData) {\n//   const title = formData.get(\"title\");\n//   await db.posts.insert({ title });\n// }"
          },
          {
            "title": "Q2: Inline / function-level 'use server'",
            "explain": "In simple words:\nInside a Server Component, async function with 'use server' as first line.\nClosures: only close over serializable values — heavy gotcha.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "// // Server Component file:\n// export default function Page() {\n//   async function addItem(formData) {\n//     \"use server\";\n//     // await db...\n//   }\n//   return <form action={addItem}>...</form>;\n// }"
          },
          {
            "title": "Q3: Server Action in form",
            "explain": "In simple words:\nFramework can handle POST even without client JS (progressive).\nReact 19 action={fn} model shows its power here.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "// import { createPost } from \"./actions\";\n//\n// export function NewPostForm() {\n//   return (\n//     <form action={createPost}>\n//       <input name=\"title\" />\n//       <button type=\"submit\">Create</button>\n//     </form>\n//   );\n// }"
          },
          {
            "title": "Q4: [MID] Call from Client Component",
            "explain": "In simple words:\n'use client' file imports action and uses onClick / await createPost().\nReturns serializable result. Errors handle try/catch.\nStill executes on server — no source secrets in browser.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "// \"use client\";\n// import { createPost } from \"./actions\";\n//\n// export function ClientCreate() {\n//   return (\n//     <button\n//       onClick={async () => {\n//         await createPost(new FormData());\n//       }}\n//     >\n//       Create\n//     </button>\n//   );\n// }"
          },
          {
            "title": "Q5: useActionState + Server Action",
            "explain": "In simple words:\nSame hook (file 30) — action is now a server function.\npending UI on client; mutation on server.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "// \"use client\";\n// import { useActionState } from \"react\";\n// import { login } from \"./actions\";\n//\n// export function LoginForm() {\n//   const [state, formAction, pending] = useActionState(login, { error: null });\n//   return (\n//     <form action={formAction}>\n//       <input name=\"email\" />\n//       <button disabled={pending}>Login</button>\n//       {state.error}\n//     </form>\n//   );\n// }"
          },
          {
            "title": "Q6: [MID] Auth & validation — MUST",
            "explain": "In simple words:\nAnyone can hit an action from the client (tampered FormData).\nOn server: session check, zod/yup validate, authorize resource.\nUI validation is convenience; server validation is security.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "// \"use server\";\n// export async function deleteUser(formData) {\n//   const session = await getSession();\n//   if (!session?.isAdmin) throw new Error(\"Unauthorized\");\n//   const id = String(formData.get(\"id\"));\n//   // validate id...\n//   await db.users.delete(id);\n// }"
          },
          {
            "title": "Q7: revalidate / cache update (Next mental model)",
            "explain": "In simple words:\nAfter mutation, do not leave a stale page.\nrevalidatePath / revalidateTag (Next) common.\nOther frameworks: your own cache invalidation.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const afterMutation = [\"revalidatePath\", \"revalidateTag\", \"router.refresh()\"];"
          },
          {
            "title": "Q8: [MID] Server Action vs API Route",
            "explain": "In simple words:\nAction: tight React/forms integration, typed imports, less boilerplate.\nAPI route: public HTTP API, webhooks, non-React clients.\nBoth are valid — choose by use case.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const compare = {\n  serverAction: \"first-class for React forms/mutations in supported frameworks\",\n  apiRoute: \"generic HTTP for any client\",\n};"
          },
          {
            "title": "Q9: Errors & return values",
            "explain": "In simple words:\nthrow → error UI / boundary depending on setup.\nreturn { error: '...' } → useActionState friendly (no throw).\nPrefer a consistent pattern on the team.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "// export async function save(prev, formData) {\n//   \"use server\";\n//   try {\n//     await db.save(...);\n//     return { ok: true, error: null };\n//   } catch {\n//     return { ok: false, error: \"Failed\" };\n//   }\n// }"
          },
          {
            "title": "Q10: [MID] Security checklist interview answer",
            "explain": "In simple words:\n1) Authenticate 2) Authorize 3) Validate input 4) No secret leak in returns\n5) Understand CSRF/framework protections (Next docs).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export const serverActionSecurity = [\n  \"authn\",\n  \"authz\",\n  \"validate input\",\n  \"safe return payloads\",\n  \"know framework CSRF story\",\n];"
          },
          {
            "title": "Q11: [MID] FormData tampering — server must re-validate",
            "explain": "Task:\nChange hidden fields in Browser DevTools — validate with zod schema on server.\n\nIn simple words:\nClient required attribute can be bypassed.\nReact 18 API route same threat model.\nNever trust formData.get('role') === 'admin' without a session check.\nReturn generic errors — do not leak internals.\nRate limit destructive actions server-side.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const formTamperNote =\n  \"Treat all FormData as hostile — validate types, ranges, ownership on server.\";"
          },
          {
            "title": "Q12: Idempotent server actions",
            "explain": "Task:\nDuplicate submit same idempotency key — double charge avoid.\n\nIn simple words:\nNetwork retry / double click → same action twice is possible.\nReact 19 isPending helps on client; server still needs idempotent design.\nReact 18 POST API same requirement.\nDB unique constraints + idempotency tokens standard in payments.\nReturn same success response on replay OK.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const idempotentActions =\n  \"Design mutations idempotent where possible — retries and double-submit happen.\";"
          },
          {
            "title": "Q13: [MID] Server Action + redirect",
            "explain": "Task:\nLogin success → redirect('/') from server action (Next redirect() helper).\n\nIn simple words:\nFramework helpers throw a special redirect — do not catch it incorrectly.\nReact 18 client router.navigate after fetch login manual.\nProgressive enhancement: form POST login redirect without JS is possible.\nReturn vs redirect choose per UX.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function RedirectActionNote() {\n  return (\n    <p>\n      Frameworks expose redirect() inside server actions for post-login navigation — behavior varies by framework.\n    </p>\n  );\n}"
          },
          {
            "title": "Q14: Cookies / session in server action",
            "explain": "Task:\nawait cookies().set('session', token) — server-only APIs.\n\nIn simple words:\nHttpOnly cookies cannot be read by client JS — security win.\nReact 18 client login sets cookie manually via Set-Cookie header from API response.\nServer action colocates mutation + session update.\nSecrets stay off client bundle.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const sessionCookieNote =\n  \"Set HttpOnly session cookies inside server actions — not via client document.cookie for auth tokens.\";"
          },
          {
            "title": "Q15: [MID] Server Action vs fetch to API route — code compare",
            "explain": "Task:\nAction: import { save } from './actions'; form action={save}.\nAPI: fetch('/api/save', { method:'POST', body }) + JSON parse.\n\nIn simple words:\nAction has less boilerplate with typed imports in React apps.\nAPI route as public contract for mobile app / third party.\nReact 18 typically fetch API routes only.\nBoth execute server logic — avoid duplication — shared service layer.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const actionVsFetchBoilerplate = {\n  serverAction: \"direct import + form action prop\",\n  apiRoute: \"HTTP fetch + manual serialization + error parsing\",\n};"
          },
          {
            "title": "Q16: Closure capture inline server action trap",
            "explain": "Task:\nInline 'use server' closure captures non-serializable value — build/runtime error.\n\nIn simple words:\nCapturing productId string OK; capturing DB connection object ❌.\nReact 18 N/A — pattern new with inline actions.\nPrefer module-level 'use server' functions for clarity.\nPass ids via FormData/hidden fields not closures when possible.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const closureTrap =\n  \"Inline server actions only close over serializable values — prefer module-level actions.\";"
          },
          {
            "title": "Q17: [MID] Optimistic UI + server action",
            "explain": "Task:\nClient useOptimistic; action={serverFn}; rollback on fail (file 32).\n\nIn simple words:\nServer action latency is higher — optimistic UX is valuable.\nReact 18 optimistic + fetch API route same combo.\nClient component required for useOptimistic.\nServer returns error object not throw for form validation UX.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function OptimisticServerActionNote() {\n  return (\n    <p>\n      useOptimistic on client + server action on submit — rollback when server returns error without base update.\n    </p>\n  );\n}"
          },
          {
            "title": "Q18: [ADV] CSRF / framework protections",
            "explain": "Task:\nNext Server Actions POST with origin checks / encrypted action ids — read your framework docs.\n\nIn simple words:\nDo not assume CSRF is impossible — know your framework story.\nReact 18 custom API routes need CSRF tokens if cookie auth.\nSame-site cookies + POST-only actions help.\nInterview: \"rely on framework + still validate auth\".",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const csrfNote =\n  \"Understand framework CSRF protections for server actions — don't roll custom insecure POST.\";"
          },
          {
            "title": "Q19: [MID] Logging and observability",
            "explain": "Task:\nStructured logs in server action — user id, action name, duration.\n\nIn simple words:\nClient console.log secrets ❌; server logs OK with care.\nReact 18 API route handlers same observability.\nCorrelate with request id tracing production debugging.\nDo not log raw passwords from FormData.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const serverActionLogging =\n  \"Log mutations server-side with correlation ids — never log secrets from FormData.\";"
          },
          {
            "title": "Q20: [ADV] When NOT Server Actions",
            "explain": "Task:\nPublic REST API products, webhooks Stripe, non-React mobile clients.\n\nIn simple words:\nServer Actions are React-centric RPC — not a universal HTTP API replacement.\nReact 18 REST remains fine.\nFile uploads huge — dedicated storage API sometimes better.\nGraphQL federation — different layer.\nLong-running jobs — queue worker not synchronous action.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const whenNotServerActions = [\n  \"public HTTP API for third parties\",\n  \"webhooks from external services\",\n  \"long-running background jobs\",\n  \"non-React clients\",\n];"
          },
          {
            "title": "Q21: [MID] Testing server actions",
            "explain": "Task:\nImport action in test; call with FormData; mock db module.\n\nIn simple words:\nUnit test server function like service layer.\nIntegration test with test DB optional.\nReact 18 API route supertest similar.\nClient form E2E separate layer.\nMock auth getSession in tests.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function TestingServerActionsNote() {\n  return <p>Test server actions by calling them directly with FormData and mocked db/auth modules.</p>;\n}"
          },
          {
            "title": "Q22: [ADV] Interview — Server Actions checklist",
            "explain": "Task:\n'use server', form/client call, validate auth, serializable returns, revalidate, CSRF awareness.\n\nIn simple words:\nvs React 18: fetch + API routes → less boilerplate in React apps.\nvs API routes: not for public HTTP; Actions for app mutations.\nTraps: trust FormData; closure capture; secrets client-side; no revalidate after mutate.\nPair useActionState pending UI client-side.\nSecurity 5-point file Q10 + tampering + idempotency.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export const serverActionInterviewChecklist = {\n  define: \"'use server' async functions invoked from forms or client handlers\",\n  mustDo: [\"authenticate\", \"authorize\", \"validate input\", \"safe returns\", \"cache revalidation\"],\n  vsApiRoute: \"Actions for React app mutations; API routes for public HTTP\",\n  vsReact18: \"less fetch boilerplate; colocated with components\",\n  traps: [\"trusted FormData\", \"non-serializable closures\", \"missing revalidate\", \"no idempotency\"],\n};"
          }
        ]
      },
      {
        "file": "39_ReactCompilerAndEffectEvent.jsx",
        "title": "39 — Compiler And useEffectEvent",
        "kya": "Two separate tools, often discussed together:",
        "detail": "39 — React Compiler + useEffectEvent (React 19.2)\nLevel: REACT19  |  Study in order: read this file first, then the next number\n\nSIMPLE: Two separate tools, often discussed together:\n\n1) React Compiler (aka React Forget) —\n   build-time tool that automatically thinks in terms of memoization (useMemo/useCallback/React.memo\n   less manually). Still opt-in / ecosystem adoption — understand \"magic compiler on\" and\n   still follow the rules of React (pure render, etc.).\n\n2) useEffectEvent (React 19.2) —\n   A function INSIDE an effect that ALWAYS reads the latest props/state,\n   but does not re-run the effect just because those values changed.\n   This solves the tension between \"stale closure\" and \"too many effect runs\".\n\n❌ WRONG use: a shortcut to keep an empty dependency array / suppress eslint.\n✅ CORRECT use: keep effect subscribe logic stable; use fresh values inside the event handler.\n\nWHY: 19.2 interviews + the nuance of \"can we remove memo because of the compiler?\".\nINTERVIEW: EffectEvent ≠ missing dep fix; compiler constraints.",
        "intro": "39 — React Compiler + useEffectEvent (React 19.2)\nLevel: REACT19  |  Study in order: read this file first, then the next number\n\nSIMPLE: Two separate tools, often discussed together:\n\n1) React Compiler (aka React Forget) —\n   build-time tool that automatically thinks in terms of memoization (useMemo/useCallback/React.memo\n   less manually). Still opt-in / ecosystem adoption — understand \"magic compiler on\" and\n   still follow the rules of React (pure render, etc.).\n\n2) useEffectEvent (React 19.2) —\n   A function INSIDE an effect that ALWAYS reads the latest props/state,\n   but does not re-run the effect just because those values changed.\n   This solves the tension between \"stale closure\" and \"too many effect runs\".\n\n❌ WRONG use: a shortcut to keep an empty dependency array / suppress eslint.\n✅ CORRECT use: keep effect subscribe logic stable; use fresh values inside the event handler.\n\nWHY: 19.2 interviews + the nuance of \"can we remove memo because of the compiler?\".\nINTERVIEW: EffectEvent ≠ missing dep fix; compiler constraints.",
        "questions": [
          {
            "title": "Q1: React Compiler — in simple words",
            "explain": "In simple words:\nThe compiler analyzes which JSX/calc can be cached.\nYou do not manually slap React.memo everywhere.\nStill: impure render (math.random during render), mutating props —\nboth the compiler and React will be unhappy.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const compilerIdea = {\n  goal: \"auto-memoize safe values/components\",\n  stillRequired: \"pure components, immutable props/state updates\",\n  notMagic: \"won't fix bad architecture or fetch-in-render chaos\",\n};"
          },
          {
            "title": "Q2: [MID] Should we remove useMemo when the compiler arrives?",
            "explain": "In simple words:\nGradually: measure, follow compiler docs/compatibility.\nManual memo is still valid when intentional / compiler off / edge cases.\nInterview: \"compiler reduces NEED, not understanding of referential equality\".",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function ExpensiveList({ items }) {\n  // Without compiler you might useMemo filtered list.\n  // With compiler, often plain derived value is fine IF pure:\n  const visible = items.filter((x) => x.active);\n  return (\n    <ul>\n      {visible.map((x) => (\n        <li key={x.id}>{x.name}</li>\n      ))}\n    </ul>\n  );\n}"
          },
          {
            "title": "Q3: Stale closure problem (why EffectEvent exists)",
            "explain": "In simple words:\nEffect handler with [] deps — count inside is OLD.\nPut count in deps — effect re-subscribes on every count change (waste / bugs).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function StaleChatBad({ roomId }) {\n  const [messages, setMessages] = useState([]);\n  const [count, setCount] = useState(0);\n\n  useEffect(() => {\n    function onMessage(msg) {\n      // ❌ if count is used here and deps are [roomId] only → stale count\n      console.log(\"got\", msg, \"count was\", count);\n      setMessages((m) => [...m, msg]);\n    }\n    // fakeSubscribe(roomId, onMessage);\n    // return () => fakeUnsubscribe(roomId, onMessage);\n  }, [roomId, count]); // count causes re-subscribe — sometimes unwanted\n\n  return (\n    <button onClick={() => setCount((c) => c + 1)}>\n      ping {count} / msgs {messages.length}\n    </button>\n  );\n}"
          },
          {
            "title": "Q4: useEffectEvent — latest values, stable effect deps",
            "explain": "In simple words:\nonMessage = useEffectEvent((msg) => { ... use latest count ... })\nEffect subscribes only on [roomId].\nDo NOT put the event function identity in effect deps.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function ChatWithEffectEvent({ roomId }) {\n  const [messages, setMessages] = useState([]);\n  const [count, setCount] = useState(0);\n\n  const onMessage = useEffectEvent((msg) => {\n    // always latest count\n    console.log(\"count now\", count);\n    setMessages((m) => [...m, msg]);\n  });\n\n  useEffect(() => {\n    function handler(msg) {\n      onMessage(msg);\n    }\n    // subscribe(roomId, handler)\n    // return () => unsubscribe(roomId, handler)\n  }, [roomId]); // onMessage intentionally NOT a dep\n\n  return (\n    <button onClick={() => setCount((c) => c + 1)}>\n      {count} / {messages.length}\n    </button>\n  );\n}"
          },
          {
            "title": "Q5: [MID] DON'T use EffectEvent to silence eslint",
            "explain": "In simple words:\nIf data should trigger the effect RUN (fetch id change),\nit belongs in the dependency array — do not hide it in EffectEvent.\nEffectEvent = \"event fired later, read latest\".\nReactive input to effect = real dependency.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function FetchUser({ userId }) {\n  const [user, setUser] = useState(null);\n\n  // ✅ userId belongs in deps — effect must re-run when id changes\n  useEffect(() => {\n    let cancelled = false;\n    fetch(\"/api/users/\" + userId)\n      .then((r) => r.json())\n      .then((data) => {\n        if (!cancelled) setUser(data);\n      });\n    return () => {\n      cancelled = true;\n    };\n  }, [userId]);\n\n  return <pre>{JSON.stringify(user)}</pre>;\n}"
          },
          {
            "title": "Q6: Analytics click — EffectEvent-shaped thinking",
            "explain": "In simple words:\nSubscribe once; when the event fires, read the latest theme/user.\nClassic EffectEvent fit.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function TrackClicks({ userId, theme }) {\n  const logClick = useEffectEvent((target) => {\n    console.log(\"click\", { userId, theme, target });\n  });\n\n  useEffect(() => {\n    function onClick(e) {\n      logClick(e.target?.tagName);\n    }\n    window.addEventListener(\"click\", onClick);\n    return () => window.removeEventListener(\"click\", onClick);\n  }, []);\n\n  return <p>Click anywhere (demo)</p>;\n}"
          },
          {
            "title": "Q7: React 19.2 Activity (brief)",
            "explain": "In simple words:\nActivity = hide/show UI with better semantics than display:none hacks\n(state preserve / priority — follow current React 19.2 docs).\nOverview in file 28 first; here just remember: \"exists, don't invent API from memory\".",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const activityNote =\n  \"Activity in 19.2: check official docs for hide/show + preserve patterns.\";"
          },
          {
            "title": "Q8: [MID] Compiler + Effects together",
            "explain": "In simple words:\nThe compiler reduces re-renders; effects still sync external systems.\nDo not use effects to \"derive state\" — calculate during render.\nEffectEvent keeps external event/subscribe paths clean.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const together = {\n  compiler: \"render cost / referential stability\",\n  effects: \"sync with outside world\",\n  effectEvent: \"latest props inside those syncs without extra resubscribe\",\n};"
          },
          {
            "title": "Q9: Interview closer",
            "explain": "In simple words:\n\"Compiler memoizes safely when code follows Rules of React.\nuseEffectEvent latest values in effect callbacks — NOT a deps escape hatch.\nMissing dep that should re-fire effect = still a bug.\"",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export const interviewCloser =\n  \"EffectEvent for non-reactive event reads; real reactive inputs stay in deps.\";"
          },
          {
            "title": "Q10: [MID] React Compiler — what breaks memo assumptions",
            "explain": "Task:\nMutating props, context, or module vars during render — compiler can't save you.\n\nIn simple words:\nPure render: same props+state → same JSX output.\nReact 18 manual memo also fails with impure render.\nCompiler opt-in project config — not global React default yet.\neslint-plugin-react-compatibility follow during adoption.\nMeasure before deleting all useMemo.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const compilerBreaks = [\n  \"mutating props or state in place\",\n  \"reading mutable module globals in render\",\n  \"side effects during render\",\n  \"unstable external store reads without subscription\",\n];"
          },
          {
            "title": "Q11: Compiler vs React.memo — coexistence",
            "explain": "Task:\nEven with compiler on, explicit memo is not harmful — may be redundant.\n\nIn simple words:\nLibrary components export memo for consumers without compiler.\nReact 18 libs still ship React.memo — valid.\nGradual adoption: enable compiler on app, profile, remove redundant memos.\nInterview: \"compiler reduces need, not knowledge\".",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function CompilerMemoCoexist() {\n  return <p>Manual memo and compiler can coexist during migration — profile before mass removal.</p>;\n}"
          },
          {
            "title": "Q12: [MID] useEffectEvent — NOT callable during render",
            "explain": "Task:\nDo not call onMessage() during render — only inside effect/subscription callback.\n\nIn simple words:\nCalling EffectEvent function during render is forbidden — rules similar to event handler.\nReact 19.2 new — older versions lack hook.\nReact 18 workaround: ref holding latest callback manually (callback ref pattern).\nTrap: do not blindly put EffectEvent on JSX onClick like a normal event handler.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function EffectEventRenderTrap() {\n  const log = useEffectEvent(() => {\n    console.log(\"only from effect/subscription\");\n  });\n  useEffect(() => {\n    const id = setInterval(() => log(), 5000);\n    return () => clearInterval(id);\n  }, []); // log is EffectEvent — intentionally not a dep\n  return <p>EffectEvent called from interval inside effect — OK</p>;\n}"
          },
          {
            "title": "Q13: Ref pattern before EffectEvent (React 18 style)",
            "explain": "Task:\nlatestCallbackRef.current = fn; effect subscribes stable wrapper calling ref.current().\n\nIn simple words:\nManual latest ref pattern — EffectEvent replaces boilerplate.\nThis pattern was common in React 18 codebases for subscriptions.\nMigration 19.2: replace ref callback bridge with useEffectEvent where fit.\nStill valid without 19.2 — don't block upgrade.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const react18LatestRefPattern =\n  \"useRef + assign latest handler each render + stable subscribe wrapper — EffectEvent replaces this.\";"
          },
          {
            "title": "Q14: [MID] EffectEvent vs useCallback deps",
            "explain": "Task:\nPass useCallback(fn, [many deps]) to effect → deps change → resubscribe.\n\nIn simple words:\nEffectEvent when values needed at event time not subscription time.\nuseCallback is still fine for normal JSX handlers.\nReact 18: useCallback + deps on handler passed to effect → same resubscribe issue.\nChoose: reactive deps → put in effect deps; non-reactive read → EffectEvent.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function EffectEventVsCallback() {\n  return (\n    <p>\n      useCallback for render handlers; useEffectEvent for handlers invoked from effects/subscriptions reading latest props.\n    </p>\n  );\n}"
          },
          {
            "title": "Q15: Activity API — when to look (19.2)",
            "explain": "Task:\nHidden tabs preserving state — follow Activity component docs; do not invent API.\n\nIn simple words:\nAlternative to display:none + keep mounted hacks possibly cleaner semantics.\nReact 18: conditional render loses state unless keep mounted manually.\nExact props/check official 19.2 release notes — interview say \"know it exists\".\nFramework integration may vary.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const activityWhen =\n  \"Use Activity for hide/show preserving UI state — verify current React 19.2 docs before production.\";"
          },
          {
            "title": "Q16: [MID] Compiler + Context unstable value",
            "explain": "Task:\nCompiler may optimize context read but unstable Provider value still re-renders consumers.\n\nIn simple words:\nCompiler ≠ fix context value={{}} trap automatically always.\nReact 18 useMemo on provider value; 19 same (file 36).\nProfile before assuming compiler solved perf.\nSplit contexts structural fix.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function CompilerContextInteraction() {\n  return <p>Compiler optimizes some memoization; unstable context values still need architectural fixes.</p>;\n}"
          },
          {
            "title": "Q17: [ADV] EffectEvent in Strict Mode dev",
            "explain": "Task:\nEffect double setup dev — subscription must cleanup; EffectEvent identity stable.\n\nIn simple words:\nReact 18 Strict Mode same double invoke.\nEffectEvent designed stable across renders — don't put in effect deps.\nVerify cleanup on unmount still runs.\nProduction single mount.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const effectEventStrict =\n  \"Strict Mode double effects in dev — ensure subscribe/unsubscribe idempotent; EffectEvent not in deps.\";"
          },
          {
            "title": "Q18: [MID] When NOT enable React Compiler yet",
            "explain": "Task:\nLegacy code impure, incompatible libs, no time to fix eslint violations.\n\nIn simple words:\nOpt-in toolchain — Babel/plugin setup required.\nReact 18 apps run fine without compiler indefinitely.\nTeam bandwidth to fix purity violations first.\nLibraries may not be compiler-tested — check compatibility lists.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const whenNotCompiler = [\n  \"impure render patterns widespread\",\n  \"incompatible dependency libs\",\n  \"no CI time to fix compiler lint violations\",\n];"
          },
          {
            "title": "Q19: [ADV] derive during render vs EffectEvent",
            "explain": "Task:\ndisplayed = props.a + props.b → in render; do not use EffectEvent.\n\nIn simple words:\nEffectEvent is for external event timing — websocket message, DOM event.\nReact 18: derive in render same rule.\nCompiler loves derived render values — do not derive from effects.\nMissing dep in effect fetch userId — EffectEvent is WRONG fix; userId must be in deps (Q5).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function DeriveInRender({ a, b }) {\n  const sum = a + b;\n  return <p>{sum}</p>;\n}"
          },
          {
            "title": "Q20: [MID] Migration React 18 → 19.2 EffectEvent",
            "explain": "Task:\nFind ref-bridge patterns in effects → replace with useEffectEvent stepwise.\n\nIn simple words:\nRequires react 19.2+ — feature detect / version check docs.\nReact 18 latestRef in subscription effects is a common migration target.\nDo not migrate effect deps that should stay reactive.\nTest subscription behavior after refactor thoroughly.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const effectEventMigration =\n  \"Replace latest-ref callback bridges in effects with useEffectEvent where reads are non-reactive.\";"
          },
          {
            "title": "Q21: [ADV] Compiler interview traps",
            "explain": "Task:\n\"Compiler on so Rules of React optional?\" — NO. \"All useMemo delete?\" — measure first.\n\nIn simple words:\nCompiler doesn't remove need for keys, pure components, proper state design.\nReact 18 devs still need referential equality understanding debugging.\nThird-party memo expectations may remain.\nEdge SSR/hydration purity still matters.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export const compilerInterviewTraps = [\n  \"thinking compiler fixes impure render\",\n  \"removing all useMemo without profiling\",\n  \"ignoring Rules of React\",\n  \"assuming library components auto-compatible\",\n];"
          },
          {
            "title": "Q22: [ADV] Full stack answer — Compiler + EffectEvent + React 19 forms",
            "explain": "Task:\nTie together: compiler reduces render cost; actions handle async forms; EffectEvent cleans subscriptions.\n\nIn simple words:\nOrthogonal tools — not replacements for each other.\nReact 18 upgrade path: 19 hooks first, compiler optional, EffectEvent when on 19.2.\nActivity exploratory 19.2.\nInterview close: purity + correct deps + Actions for forms + EffectEvent for effect events only.\nCommon bug: using EffectEvent to hide fetch deps — still wrong.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export const fullStackReact19_2Answer = {\n  compiler: \"build-time memoization — purity required\",\n  actions: \"forms/async UX — useActionState/useFormStatus\",\n  effectEvent: \"latest values in effect-driven events — not dep suppression\",\n  activity: \"hide/show state preserve — see 19.2 docs\",\n  migrationOrder: [\"React 19 core hooks\", \"optional compiler\", \"19.2 EffectEvent when ready\"],\n};"
          }
        ]
      }
    ]
  },
  {
    "level": "INTERVIEW",
    "items": [
      {
        "file": "40_MidLevelInterviewQuestions.jsx",
        "title": "40 — Mid-Level Interview Questions",
        "kya": "This file is a RUNBOOK for mid-level React interviews —",
        "detail": "40 — Mid-Level React Interview Questions (interview revision) — 47 Qs\nLevel: INTERVIEW  |  Study in order: read React 19 files first, then revise with this\n\nSIMPLE: This file is a RUNBOOK for mid-level React interviews —\nhooks rules, keys, batching, stale closures, Virtual DOM myth,\nuseEffect deps, performance, React 19 Actions vs old submit handlers.\n\nEach Q: in simple words + small code where useful.\n[MID] = typical mid-level depth. Do not memorize — explain with your own words.\n\nWHY: Revise in one place; other files go deeper.\nINTERVIEW: Use clear plain English — keep concepts precise.",
        "intro": "40 — Mid-Level React Interview Questions (interview revision) — 47 Qs\nLevel: INTERVIEW  |  Study in order: read React 19 files first, then revise with this\n\nSIMPLE: This file is a RUNBOOK for mid-level React interviews —\nhooks rules, keys, batching, stale closures, Virtual DOM myth,\nuseEffect deps, performance, React 19 Actions vs old submit handlers.\n\nEach Q: in simple words + small code where useful.\n[MID] = typical mid-level depth. Do not memorize — explain with your own words.\n\nWHY: Revise in one place; other files go deeper.\nINTERVIEW: Use clear plain English — keep concepts precise.",
        "questions": [
          {
            "title": "Q1: [MID] What are the Rules of Hooks?",
            "explain": "In simple words:\n1) Call only at the top level of React function components / custom hooks.\n2) Do not call ordinary hooks inside loops, conditions, or nested functions.\n3) Order must stay the same every render — React depends on the hooks list.\nException: React 19 `use()` allows conditional context/promise (file 33).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function BadHooks({ flag }) {\n  // if (flag) useState(0); // ❌\n  const [n, setN] = useState(0); // ✅ always\n  return <button onClick={() => setN(n + 1)}>{n}</button>;\n}"
          },
          {
            "title": "Q2: [MID] Why key in lists? When to avoid index?",
            "explain": "In simple words:\nkey = identity across reorders. Wrong key = state sticks to wrong item.\nindex key OK for static list; avoid when insert/delete/reorder + item state.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function TodoList({ todos }) {\n  return (\n    <ul>\n      {todos.map((t) => (\n        <li key={t.id}>{t.title}</li> // ✅ stable id\n      ))}\n    </ul>\n  );\n}"
          },
          {
            "title": "Q3: [MID] Is setState async / batching?",
            "explain": "In simple words:\nReact 18+ mostly automatic batching — multiple setState in one event\none re-render. Do not expect old state immediately.\nNeed next value → functional updater setN(n => n+1).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function BatchDemo() {\n  const [a, setA] = useState(0);\n  const [b, setB] = useState(0);\n  function onClick() {\n    setA((x) => x + 1);\n    setB((x) => x + 1); // batched → usually 1 render\n  }\n  return (\n    <button onClick={onClick}>\n      {a},{b}\n    </button>\n  );\n}"
          },
          {
            "title": "Q4: [MID] Stale closure / stale state in setTimeout",
            "explain": "In simple words:\nHandler closed over old count. setCount(count+1) can be stale.\nFix: functional update, or ref for latest, or EffectEvent (19.2) patterns.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function StaleCounter() {\n  const [count, setCount] = useState(0);\n  function schedule() {\n    setTimeout(() => {\n      // setCount(count + 1); // ❌ may stale\n      setCount((c) => c + 1); // ✅\n    }, 1000);\n  }\n  return <button onClick={schedule}>{count}</button>;\n}"
          },
          {
            "title": "Q5: [MID] Virtual DOM myth — \"React is fast because Virtual DOM is fast\"?",
            "explain": "In simple words:\nVDOM = JS object snapshot of UI; diff decides fewer DOM updates.\nThe real speed game: predictable update model, batching, concurrent,\navoiding unnecessary work — not just \"VDOM magic\".\nSvelte/Solid are fast without classic VDOM too. Give a nuanced answer.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const vdomAnswer =\n  \"VDOM is a strategy, not the only reason React apps feel fast; avoid unnecessary renders too.\";"
          },
          {
            "title": "Q6: [MID] useEffect deps — empty vs missing vs full",
            "explain": "In simple words:\n[] = mount/unmount sync (subscribe once).\n[id] = re-run when id changes.\nMissing dep = stale bug. Extra dep = extra runs.\nDerive during render when possible — do not copy state from effect.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function UserEffect({ userId }) {\n  const [user, setUser] = useState(null);\n  useEffect(() => {\n    let alive = true;\n    fetch(\"/api/\" + userId)\n      .then((r) => r.json())\n      .then((u) => {\n        if (alive) setUser(u);\n      });\n    return () => {\n      alive = false;\n    };\n  }, [userId]);\n  return <pre>{JSON.stringify(user)}</pre>;\n}"
          },
          {
            "title": "Q7: [MID] Controlled vs uncontrolled input",
            "explain": "In simple words:\nControlled: value + onChange (React state is source).\nUncontrolled: defaultValue + ref / FormData (DOM is source).\nReact 19 Actions often FormData/uncontrolled-friendly.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function Controlled({ value, onChange }) {\n  return <input value={value} onChange={(e) => onChange(e.target.value)} />;\n}"
          },
          {
            "title": "Q8: [MID] Lifting state up kab?",
            "explain": "In simple words:\nWhen two children share / sync the same data. Parent is owner.\nDo not over-lift — prop drilling → Context / composition.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function ParentLift() {\n  const [text, setText] = useState(\"\");\n  return (\n    <>\n      <input value={text} onChange={(e) => setText(e.target.value)} />\n      <p>{text}</p>\n    </>\n  );\n}"
          },
          {
            "title": "Q9: [MID] useMemo / useCallback kab?",
            "explain": "In simple words:\nExpensive calc; or referential equality for memoized child deps.\nDo not slap it everywhere by default — measure / compiler (file 39).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function Filtered({ items, query }) {\n  const filtered = useMemo(\n    () => items.filter((x) => x.includes(query)),\n    [items, query]\n  );\n  return <div>{filtered.length}</div>;\n}"
          },
          {
            "title": "Q10: [MID] What does React.memo do?",
            "explain": "In simple words:\nShallow props compare — skip re-render on same props (usually).\nParent re-render ≠ child re-render if memo + stable props.\nUnstable callbacks break memo — useCallback / compiler.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export const Row = memo(function Row({ label }) {\n  return <div>{label}</div>;\n});"
          },
          {
            "title": "Q11: [MID] useRef vs useState",
            "explain": "In simple words:\nref change does not re-render. DOM handles, timers, latest values.\nState = show in UI. Deciding UI by reading ref.current during render is risky.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function TimerRef() {\n  const id = useRef(null);\n  const [tick, setTick] = useState(0);\n  useEffect(() => {\n    id.current = setInterval(() => setTick((t) => t + 1), 1000);\n    return () => clearInterval(id.current);\n  }, []);\n  return <span>{tick}</span>;\n}"
          },
          {
            "title": "Q12: [MID] Why cleanup in useEffect?",
            "explain": "In simple words:\nIf you subscribe, unsubscribe. Clear timers. Ignore stale fetch.\nStrict Mode dev mount→unmount→remount — cleanup must be correct.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function WatchWidth() {\n  const [w, setW] = useState(0);\n  useEffect(() => {\n    function onResize() {\n      setW(window.innerWidth);\n    }\n    window.addEventListener(\"resize\", onResize);\n    onResize();\n    return () => window.removeEventListener(\"resize\", onResize);\n  }, []);\n  return <span>{w}</span>;\n}"
          },
          {
            "title": "Q13: [MID] Keys + local state bug story",
            "explain": "In simple words:\nTwo inputs in list — key=index, delete first → second's text may move to first.\nStable id keys + remount via key={id} when form reset is needed.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function EditableList({ items, onRemove }) {\n  return items.map((item) => (\n    <div key={item.id}>\n      <input defaultValue={item.text} />\n      <button onClick={() => onRemove(item.id)}>x</button>\n    </div>\n  ));\n}"
          },
          {
            "title": "Q14: [MID] State updates with objects — mutate mat",
            "explain": "In simple words:\nuser.name = x in setUser; setUser(user) — same reference, miss updates.\nNew object: setUser({ ...user, name: x }).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function Profile() {\n  const [user, setUser] = useState({ name: \"Ada\", age: 30 });\n  return (\n    <button\n      onClick={() => setUser({ ...user, age: user.age + 1 })}\n    >\n      {user.name} {user.age}\n    </button>\n  );\n}"
          },
          {
            "title": "Q15: [MID] Context performance pain",
            "explain": "In simple words:\nOne big value object change → all consumers re-render.\nSplit context; pass stable dispatch; children composition.\nReact 19: <Ctx value={...}> syntax (file 36) — problem same.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const tip = \"Split frequently-changing state from static config in context.\";"
          },
          {
            "title": "Q16: [MID] What do Error Boundaries catch?",
            "explain": "In simple words:\nRender/lifecycle errors in children. Event handlers / async need their own try/catch.\nSuspense is separate (loading). Rejected use(promise) → boundary.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const errorBoundaryNote =\n  \"Boundaries catch render errors; not click handlers or setTimeout unless rethrown to render.\";"
          },
          {
            "title": "Q17: [MID] Concurrent / startTransition kab?",
            "explain": "In simple words:\nUrgent: typing input. Non-urgent: filter huge list.\nstartTransition keeps input snappy, list updates behind.\nisPending for pending UI.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function SearchBig({ all }) {\n  const [q, setQ] = useState(\"\");\n  const [list, setList] = useState(all);\n  const [pending, startTransition] = useTransition();\n  return (\n    <>\n      <input\n        value={q}\n        onChange={(e) => {\n          const v = e.target.value;\n          setQ(v);\n          startTransition(() => {\n            setList(all.filter((x) => x.includes(v)));\n          });\n        }}\n      />\n      {pending ? \"...\" : list.length}\n    </>\n  );\n}"
          },
          {
            "title": "Q18: [MID] React 19 Actions vs old onSubmit handlers",
            "explain": "In simple words:\nOld: onSubmit → preventDefault → manual loading/error state.\nNew: action={async (formData)=>...} + useActionState / useFormStatus.\nOld is still valid. Actions = FormData-first + pending integration.\nServer Actions ('use server') run mutations on server (file 38).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "async function save(prev, formData) {\n  // await api\n  return { ok: true, title: formData.get(\"title\") };\n}\n\nexport function ActionVsSubmit() {\n  const [state, formAction, pending] = useActionState(save, { ok: false });\n  return (\n    <form action={formAction}>\n      <input name=\"title\" />\n      <button disabled={pending}>Save</button>\n      {state.ok && <p>Saved {state.title}</p>}\n    </form>\n  );\n}"
          },
          {
            "title": "Q19: [MID] useOptimistic one-liner",
            "explain": "In simple words:\nUpdate UI first, server later; on fail rollback to base state.\nLow-risk actions (likes). Be conservative with payments.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const optimisticLine =\n  \"Show success instantly; reconcile with server; roll back on failure.\";"
          },
          {
            "title": "Q20: [MID] use() hook rules",
            "explain": "In simple words:\nuse(promise) Suspense; use(context) conditional OK.\nOther hooks stay top-level. Promise identity must be stable.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const useHookLine =\n  \"use unwraps promise/context; conditional OK for use; cache promises.\";"
          },
          {
            "title": "Q21: [MID] forwardRef ab?",
            "explain": "In simple words:\nReact 19: ref is a normal prop. forwardRef is legacy/compat.\nuseImperativeHandle limited parent API.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Input19({ ref, ...rest }) {\n  return <input ref={ref} {...rest} />;\n}"
          },
          {
            "title": "Q22: [MID] CSR fetch waterfall vs RSC",
            "explain": "In simple words:\nClient mount → spinner → fetch → nested fetch = waterfall.\nServer Components parallelize on the tree / closer to data.\nHybrid: server initial + client interactivity.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const rscLine =\n  \"RSC moves initial data work to server; client for interaction islands.\";"
          },
          {
            "title": "Q23: [MID] Why not put everything in useEffect?",
            "explain": "In simple words:\nEffects = sync external system (DOM, network subscription, widgets).\nDerived values → calculate in render.\nReset state when prop changes → key remount pattern is often cleaner.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function FullName({ first, last }) {\n  // ❌ useEffect sync full from first/last\n  const full = first + \" \" + last; // ✅\n  return <span>{full}</span>;\n}"
          },
          {
            "title": "Q24: [MID] Strict Mode double invoke — bug or feature?",
            "explain": "In simple words:\nDev effects setup/cleanup/setup — to catch impure effects.\nNot double in production. Write cleanup correctly.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const strictLine =\n  \"Dev double-mount finds missing cleanup; write effects idempotent.\";"
          },
          {
            "title": "Q25: [MID] Performance checklist (bolke sunao)",
            "explain": "In simple words:\n1) Unnecessary state 2) State location 3) memo where measured\n4) virtualize long lists 5) code split 6) RSC/less JS\n7) images/network 8) avoid layout thrash in effects",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export const perfChecklist = [\n  \"cut state\",\n  \"lift only as needed\",\n  \"memo after measure\",\n  \"virtualize long lists\",\n  \"lazy routes\",\n  \"server components when available\",\n];"
          },
          {
            "title": "Q26: [MID] useFormStatus child-only rule",
            "explain": "In simple words:\nfrom react-dom; nearest parent form; call in child component of form.\nNot in the same component that renders <form>.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const formStatusLine =\n  \"useFormStatus in child of form; import from react-dom.\";"
          },
          {
            "title": "Q27: [MID] useEffectEvent (19.2) — trap question",
            "explain": "In simple words:\nLatest props in event inside effect WITHOUT adding them as deps.\nNOT for hiding required deps (fetch userId must stay in deps).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const effectEventLine =\n  \"EffectEvent = non-reactive read in effect events; not eslint-disable.\";"
          },
          {
            "title": "Q28: [MID] Controlled form + Action mix advice",
            "explain": "In simple words:\nLive validation → local useState.\nSubmit mutation → action / server action.\nDo not fight FormData — keep name attributes or intentionally controlled.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const mixLine = \"Local state for UX; Actions for submit/mutation pipeline.\";"
          },
          {
            "title": "Q29: [MID] TypeScript — props typing basics",
            "explain": "In simple words:\nExplicit props type/interface is best practice. React.FC optional — children\navoid the old implicit children pattern unless needed.\nOptional props: prop?: string. Union: variant: 'sm' | 'lg'.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "/** @typedef {{ label: string; onClick?: () => void; disabled?: boolean }} ButtonProps */\nfunction TypedButton({ label, onClick, disabled = false }) {\n  return (\n    <button type=\"button\" onClick={onClick} disabled={disabled}>\n      {label}\n    </button>\n  );\n}"
          },
          {
            "title": "Q30: [MID] TypeScript — events, useRef, generic list",
            "explain": "In simple words:\nonChange: ChangeEvent<HTMLInputElement>. Ref: useRef<HTMLInputElement>(null).\nGeneric: function List<T>({ items, render }: { items: T[]; render: (x: T) => ReactNode })\nas const for literal unions. Discriminated unions for modal state.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function TypedInput() {\n  const inputRef = useRef(null);\n  const [text, setText] = useState(\"\");\n  return (\n    <input\n      ref={inputRef}\n      value={text}\n      onChange={(e) => setText(e.target.value)}\n    />\n  );\n}"
          },
          {
            "title": "Q31: [MID] Accessibility quick hits",
            "explain": "In simple words:\nSemantic HTML first: button, nav, main, label htmlFor.\nIcon-only button → aria-label. Modal → focus trap + Esc close.\nKeyboard: Tab order logical; custom widgets → role + key handlers.\nColor contrast + don't rely on color alone. Live regions for toasts.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function A11yIconButton({ onClick, label }) {\n  return (\n    <button type=\"button\" aria-label={label} onClick={onClick}>\n      ×\n    </button>\n  );\n}"
          },
          {
            "title": "Q32: [MID] Zustand vs Context — when to use which?",
            "explain": "In simple words:\nContext: theme, locale, auth shell — low change, tree-wide read.\nZustand/Redux: frequent updates, many selectors, outside-React reads.\nContext re-renders all consumers on every value change (unless you split).\nZustand = subscribe slice-wise → fewer unnecessary renders.\nSmall app + simple global → Context OK. Cart/filters/realtime → store.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const zustandVsContext =\n  \"Context for low-churn config; Zustand when many components need selective fast updates.\";"
          },
          {
            "title": "Q33: [MID] React Hook Form + Zod",
            "explain": "In simple words:\nRHF = uncontrolled default, register/ref, fewer re-renders on keystroke.\nzodResolver(schema) → typed errors; schema single source of truth.\nServer errors → setError('root' | field). defaultValues for reset.\nLarge forms: Controller only where controlled widget is needed (MUI date).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const rhfZodPattern = `\nconst schema = z.object({ email: z.string().email(), age: z.coerce.number().min(18) });\nconst { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) });\n`;"
          },
          {
            "title": "Q34: [ADV] React Router loaders / data routers",
            "explain": "In simple words:\nloader fetches data on route enter — before component render.\ndefer() + Suspense → critical fast, slow stream. action for mutations.\nshouldRevalidate control stale refetch. ErrorBoundary + errorElement.\nvs useEffect fetch: no spinner flash, parallel routes, redirect in loader.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const loaderLine =\n  \"Loader runs before render; defer splits critical vs slow; action handles form POST.\";"
          },
          {
            "title": "Q35: [ADV] startTransition vs useDeferredValue — deep",
            "explain": "In simple words:\nstartTransition: YOU mark state update non-urgent (setState inside).\nuseDeferredValue: defer DISPLAY of already-urgent state (prop/value lag).\nTyping filter: setQ urgent + startTransition filter OR defer deferredQ.\ndeferredValue can look stale — check isPending/deferred !== value.\nBoth are concurrent features; choose based on who owns the update.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function DeferredSearch({ query, items }) {\n  const deferredQuery = useDeferredValue(query);\n  const isStale = deferredQuery !== query;\n  const shown = useMemo(\n    () => items.filter((x) => x.includes(deferredQuery)),\n    [items, deferredQuery]\n  );\n  return (\n    <ul style={{ opacity: isStale ? 0.6 : 1 }}>\n      {shown.map((x) => (\n        <li key={x}>{x}</li>\n      ))}\n    </ul>\n  );\n}"
          },
          {
            "title": "Q36: [MID] Class lifecycle → hooks map",
            "explain": "In simple words:\nconstructor/state init → useState initial\ncomponentDidMount → useEffect([], ...)\ncomponentDidUpdate → useEffect([deps], ...) — specific deps, not \"everything\"\ncomponentWillUnmount → useEffect return cleanup\nshouldComponentUpdate → React.memo / PureComponent\ngetDerivedStateFromProps → derive render me; key reset pattern\ncomponentDidCatch → Error Boundary class (still class-only API)",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const lifecycleMap = {\n  mount: \"useEffect(() => {}, [])\",\n  update: \"useEffect(() => {}, [dep])\",\n  unmount: \"useEffect(() => () => cleanup, [])\",\n  memo: \"memo(Component)\",\n  error: \"class ErrorBoundary\",\n};"
          },
          {
            "title": "Q37: [MID] Auth token storage — interview security",
            "explain": "In simple words:\nlocalStorage can be stolen via XSS — avoid sensitive long-lived tokens.\nhttpOnly Secure SameSite cookie = refresh token sweet spot (JS cannot read).\nAccess token memory-only / short TTL; BFF pattern extra layer.\nNever put token in URL/hash. CSRF: SameSite + token header for cookie auth.\nDo not say \"localStorage is easy\" as a production-safe answer.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const authStorageLine =\n  \"httpOnly cookie for refresh; short-lived access in memory; localStorage = XSS risk.\";"
          },
          {
            "title": "Q38: [MID] React 19 Actions vs React Hook Form",
            "explain": "In simple words:\nRHF: complex client validation, field-level UX, 50+ fields, MUI integration.\nActions: native form submit, FormData, server mutations, progressive enhancement.\nMix: RHF handleSubmit → build FormData → call server action.\nActions do not replace RHF — overlap on submit pipeline. Pick by form complexity.\nuseActionState pending vs RHF isSubmitting — similar mental model.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const actionsVsRhf =\n  \"RHF for rich client forms; Actions for server-first submit; combine when needed.\";"
          },
          {
            "title": "Q39: [MID] Testing Library — getByRole first",
            "explain": "In simple words:\nQuery priority: getByRole > label > placeholder > text > testId (last resort).\ngetByRole('button', { name: /save/i }) = user + a11y aligned.\nuserEvent over fireEvent for realistic clicks/type.\nfindBy* async; waitFor transitions. within() scope nested widgets.\nDo not test implementation details (class, internal state) — test behavior.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const rtlQueryLine =\n  \"getByRole('textbox', { name: 'Email' }) beats getByTestId('email-input').\";"
          },
          {
            "title": "Q40: [MID] Hydration mismatch — why does it happen, fix?",
            "explain": "In simple words:\nServer HTML ≠ client first render → React warns + re-renders client side.\nCulprits: Date.now(), Math.random(), window/localStorage in render,\ninvalid HTML nesting (p inside p), browser extensions.\nFix: useEffect for client-only bits; suppressHydrationWarning sparingly on\nknown diffs (timestamp). Ensure same deterministic output in SSR.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const hydrationLine =\n  \"Render same on server and client; defer browser-only values to useEffect.\";"
          },
          {
            "title": "Q41: [ADV] Keys + state — checkbox reorder horror story",
            "explain": "In simple words:\nTodo list: checkbox + text, key={index}. Reorder/delete → checked state\nshifts to wrong row (React reused DOM node by wrong identity).\nFix: key={item.id}. Form reset per item: key={`${id}-${version}`}.\nAnti-pattern: key={Math.random()} — remount every render, state/focus lost.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function CheckableList({ items }) {\n  return items.map((item) => (\n    <label key={item.id}>\n      <input type=\"checkbox\" defaultChecked={item.done} />\n      {item.text}\n    </label>\n  ));\n}"
          },
          {
            "title": "Q42: [MID] Composition vs inheritance",
            "explain": "In simple words:\nIn React avoid inheritance — components compose. children, render props,\nslots (header/footer props), compound components (Tabs.Tab).\n\"Is-a\" Button extends Input ❌. \"Has-a\" Card with actions prop ✅.\nHOC / wrappers are legacy; hooks + composition preferred today.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Card({ title, children, footer }) {\n  return (\n    <section>\n      <h2>{title}</h2>\n      <div>{children}</div>\n      {footer}\n    </section>\n  );\n}"
          },
          {
            "title": "Q43: [ADV] Controlled forms at scale",
            "explain": "In simple words:\n50 fields with pure useState = prop drilling + re-render storm.\nPatterns: useReducer single form state; RHF register; Formik less common now.\nField components wrap register + error display. Schema validation (Zod).\nSplit wizard steps — unmount step = consider persist or keep mounted hidden.\nServer Actions per step vs one big submit — UX + validation boundaries.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const scaledFormLine =\n  \"RHF/reducer + schema + field components; avoid 50 useState hooks.\";"
          },
          {
            "title": "Q44: [MID] Performance profiling — interview answers",
            "explain": "In simple words:\nReact DevTools Profiler: record interaction, flamegraph, \"why did this render?\"\nRank commit duration — optimize slowest first. Do not memo blindly.\nChrome Performance + React profiler combined for long tasks.\nLighthouse ≠ React perf; use for load metrics. Web Vitals INP/LCP.\nProfile production build — dev Strict Mode double render is misleading.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export const profilingSteps = [\n  \"reproduce slow interaction\",\n  \"Profiler record\",\n  \"find hot components\",\n  \"fix state location or memo after proof\",\n  \"re-profile\",\n];"
          },
          {
            "title": "Q45: [ADV] Fiber / reconciliation one-liners",
            "explain": "In simple words:\nFiber = unit of work node (type, props, child/sibling, alternate).\nReconciliation = diff old vs new tree → minimal DOM ops.\nRender phase pure; commit phase DOM mutate + effects run.\nConcurrent: work interruptible, priorities, lanes. Not \"VDOM always fast.\"\nkey helps sibling identity; without key React may match by index wrongly.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const fiberLines = [\n  \"Fiber = work unit with alternate for double buffering\",\n  \"Render computes changes; commit applies to DOM\",\n  \"Keys tell React which list item is which identity\",\n];"
          },
          {
            "title": "Q46: [ADV] Suspense boundaries — design",
            "explain": "In simple words:\nBoundary = loading fallback when child suspends (lazy, use(promise), RSC stream).\nGranular boundaries: sidebar fast, main skeleton — not one whole page spinner.\nNested Suspense: outer coarse, inner fine. ErrorBoundary sibling/alternate tree.\nresetKeys remount on route change. Streaming SSR: shell first, holes fill later.\nDon't wrap everything — intentional UX per section.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const suspenseDesign =\n  \"Small boundaries near slow data; page-level spinner only when whole page waits.\";"
          },
          {
            "title": "Q47: [ADV] Server vs Client Component decision tree",
            "explain": "In simple words:\nServer default (Next App Router): DB, secrets, heavy libs, zero JS to client.\nClient ('use client'): useState, useEffect, onClick, browser APIs, most 3rd party UI.\nPass serializable props only — no functions/classes server→client.\nComposition: Server wraps Client; children trick for slotting client inside server.\nBoundary cost: 'use client' file + imports go in bundle — keep at leaves.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const rscDecisionTree = `\nNeed interactivity/hooks/browser? → Client\nNeed DB/secrets/large dep server-side? → Server\nBoth? → Server parent fetches, pass data to Client child island\n`;\n\n// -----------------------------------------------------------------------------\n// Quick revise map (files)\n// 28 overview → 29-32 forms/optimistic → 33 use → 34 ref → 35 head\n// → 36 context → 37-38 RSC/actions → 39 compiler/EffectEvent → 40 this file (47 Qs)\n// -----------------------------------------------------------------------------\nexport const reviseOrder = [28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40];\n\n/** Total interview questions in this file (Q1–Q47). */\nexport const midLevelQuestionCount = 47;"
          }
        ]
      }
    ]
  },
  {
    "level": "ADVANCED",
    "items": [
      {
        "file": "41_ClassComponents.jsx",
        "title": "41 — Class Components (Legacy)",
        "kya": "In old React, components were CLASSES — class Counter extends Component.",
        "detail": "41 — Class Components (Legacy / Interview)\nLevel: ADVANCED  |  Sequence: learn hooks first, then use this for interview revision\n\nSIMPLE: In old React, components were CLASSES — class Counter extends Component.\nFunction components with hooks are standard now, but interviews and legacy codebases\nstill ask about class lifecycle, setState, binding, and Error Boundaries.\n\nWHY: Understanding this makes hooks migration easier; Error Boundary is still class-only in the core API.\nINTERVIEW: lifecycle order, setState batching, bind trap, PureComponent shallow compare.\nUse in Vite/React 19 project — teaching file. (class API intentional here)",
        "intro": "41 — Class Components (Legacy / Interview)\nLevel: ADVANCED  |  Sequence: learn hooks first, then use this for interview revision\n\nSIMPLE: In old React, components were CLASSES — class Counter extends Component.\nFunction components with hooks are standard now, but interviews and legacy codebases\nstill ask about class lifecycle, setState, binding, and Error Boundaries.\n\nWHY: Understanding this makes hooks migration easier; Error Boundary is still class-only in the core API.\nINTERVIEW: lifecycle order, setState batching, bind trap, PureComponent shallow compare.\nUse in Vite/React 19 project — teaching file. (class API intentional here)",
        "questions": [
          {
            "title": "Q1: Component vs PureComponent",
            "explain": "Task:\nComponent re-renders child on every parent re-render (default).\nPureComponent shallow compares props/state — same refs → skip render.\n\nIn simple words:\nPureComponent = built-in shouldComponentUpdate with shallow compare.\nDoes not detect deep nested object changes — mutation trap.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "class PlainChild extends Component {\n  render() {\n    console.log(\"PlainChild render\");\n    return <p>{this.props.label}</p>;\n  }\n}\n\nclass PureChild extends PureComponent {\n  render() {\n    console.log(\"PureChild render\");\n    return <p>{this.props.label}</p>;\n  }\n}\n\nclass ParentPlainPure extends Component {\n  state = { n: 0 };\n  render() {\n    return (\n      <div>\n        <button onClick={() => this.setState({ n: this.state.n + 1 })}>\n          bump {this.state.n}\n        </button>\n        <PlainChild label=\"same\" />\n        <PureChild label=\"same\" />\n      </div>\n    );\n  }\n}"
          },
          {
            "title": "Q2: render, constructor + super(props)",
            "explain": "Task:\nInitialize state/refs in constructor; call super(props) first — otherwise this is undefined.\nrender() must return JSX — required.\n\nIn simple words:\nClass field state = {} also works (modern). You can bind handlers in the constructor too.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "class Greeting extends Component {\n  constructor(props) {\n    super(props); // MUST before this.*\n    this.state = { clicks: 0 };\n  }\n  render() {\n    return (\n      <h1>\n        Hello {this.props.name}! Clicks: {this.state.clicks}\n      </h1>\n    );\n  }\n}"
          },
          {
            "title": "Q3: this.state + setState (object + functional)",
            "explain": "Task:\nsetState({ partial }) merges. Functional form: prevState => next.\n\nIn simple words:\nObject form feels async — two setState calls in the same tick can use stale state.\nFunctional updater is safe when you depend on previous state.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "class CounterState extends Component {\n  state = { count: 0 };\n  inc = () => {\n    this.setState({ count: this.state.count + 1 }); // object\n    this.setState({ count: this.state.count + 1 }); // ❌ both read same base — only +1 total\n  };\n  incSafe = () => {\n    this.setState((prev) => ({ count: prev.count + 1 })); // ✅\n    this.setState((prev) => ({ count: prev.count + 1 })); // ✅ +2 total\n  };\n  render() {\n    return (\n      <div>\n        <p>{this.state.count}</p>\n        <button onClick={this.inc}>+1 object</button>\n        <button onClick={this.incSafe}>+2 functional</button>\n      </div>\n    );\n  }\n}"
          },
          {
            "title": "Q4: Binding — constructor bind vs arrow class fields",
            "explain": "Task:\nPass this.handleClick to JSX — binding is required, otherwise this is undefined.\n\nIn simple words:\n3 ways: constructor bind, arrow class field, or arrow wrapper in render.\nArrow class field is the cleanest in modern class code.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "class BindDemo extends Component {\n  // way 1 — constructor (legacy style)\n  constructor(props) {\n    super(props);\n    this.onClickBound = this.onClickBound.bind(this);\n  }\n  onClickBound() {\n    this.setState({ msg: \"bound in constructor\" });\n  }\n\n  // way 2 — arrow class field (auto-bound this)\n  onClickArrow = () => {\n    this.setState({ msg: \"arrow field\" });\n  };\n\n  state = { msg: \"\" };\n\n  render() {\n    return (\n      <div>\n        <p>{this.state.msg}</p>\n        <button onClick={this.onClickBound}>Constructor bind</button>\n        <button onClick={this.onClickArrow}>Arrow field</button>\n        {/* way 3 — inline arrow (new fn each render — usually OK) */}\n        <button onClick={() => this.setState({ msg: \"inline\" })}>Inline</button>\n      </div>\n    );\n  }\n}"
          },
          {
            "title": "Q5: props vs state",
            "explain": "Task:\nprops = read-only input from parent. state = component's own data.\n\nIn simple words:\nDo not mutate props. Update state with setState. \"Smart vs dumb\" — same idea in classes.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "class UserCard extends Component {\n  state = { expanded: false };\n  render() {\n    const { name, role } = this.props; // read-only\n    return (\n      <div onClick={() => this.setState({ expanded: !this.state.expanded })}>\n        <strong>{name}</strong> — {role}\n        {this.state.expanded && <p>More details...</p>}\n      </div>\n    );\n  }\n}"
          },
          {
            "title": "Q6: componentDidMount fetch",
            "explain": "Task:\nAPI call after mount — DOM is ready, good for initial data.\n\nIn simple words:\nuseEffect(() => {}, []) does the same job in hooks. Use a cancel flag or AbortController.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "class UserFetch extends Component {\n  state = { user: null, loading: true };\n  componentDidMount() {\n    let cancelled = false;\n    fetch(\"https://jsonplaceholder.typicode.com/users/1\")\n      .then((r) => r.json())\n      .then((user) => {\n        if (!cancelled) this.setState({ user, loading: false });\n      });\n    this._cancel = () => {\n      cancelled = true;\n    };\n  }\n  componentWillUnmount() {\n    this._cancel?.();\n  }\n  render() {\n    if (this.state.loading) return <p>Loading...</p>;\n    return <p>{this.state.user?.name}</p>;\n  }\n}"
          },
          {
            "title": "Q7: componentDidUpdate + infinite loop trap",
            "explain": "Task:\nCompare prevProps/prevState and call setState conditionally.\n\nIn simple words:\nsetState on every update without a condition → infinite loop 💥\nHooks: wrong useEffect deps = same trap.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "class SyncProp extends Component {\n  state = { mirror: \"\" };\n  componentDidUpdate(prevProps) {\n    if (prevProps.text !== this.props.text) {\n      this.setState({ mirror: this.props.text.toUpperCase() });\n    }\n    // ❌ this.setState({ mirror: this.props.text }); // every time → loop\n  }\n  render() {\n    return <p>{this.state.mirror}</p>;\n  }\n}"
          },
          {
            "title": "Q8: componentWillUnmount cleanup",
            "explain": "Task:\nRemove timers, subscriptions, and listeners — avoid memory leaks.\n\nIn simple words:\nSubscribe in didMount → unsubscribe in willUnmount. Symmetric cleanup.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "class TimerClass extends Component {\n  state = { sec: 0 };\n  componentDidMount() {\n    this.id = setInterval(() => {\n      this.setState((s) => ({ sec: s.sec + 1 }));\n    }, 1000);\n  }\n  componentWillUnmount() {\n    clearInterval(this.id);\n  }\n  render() {\n    return <p>Seconds: {this.state.sec}</p>;\n  }\n}"
          },
          {
            "title": "Q9: shouldComponentUpdate",
            "explain": "Task:\nManual render gate — return false to skip render.\n\nIn simple words:\nPureComponent does this automatically with shallow compare.\nCustom deep compare is rare — prefer immutable data + PureComponent/memo.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "class ManualSCU extends Component {\n  shouldComponentUpdate(nextProps, nextState) {\n    return nextProps.value !== this.props.value;\n  }\n  render() {\n    console.log(\"ManualSCU render\");\n    return <span>{this.props.value}</span>;\n  }\n}"
          },
          {
            "title": "Q10: getDerivedStateFromProps (rare, anti-pattern note)",
            "explain": "Task:\nStatic method — derive state from props. Pure, no side effects.\n\nIn simple words:\n⚠️ Often an anti-pattern: copying props into state. Prefer controlled OR key remount.\nValid case: UI state that resets when a prop flips (rare).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "class DerivedDemo extends Component {\n  state = { draft: \"\" };\n  static getDerivedStateFromProps(nextProps, prevState) {\n    if (nextProps.resetToken !== prevState.lastToken) {\n      return { draft: \"\", lastToken: nextProps.resetToken };\n    }\n    return null; // no change\n  }\n  render() {\n    return (\n      <input\n        value={this.state.draft}\n        onChange={(e) => this.setState({ draft: e.target.value })}\n      />\n    );\n  }\n}"
          },
          {
            "title": "Q11: getSnapshotBeforeUpdate",
            "explain": "Task:\nSnapshot BEFORE DOM update (scroll position). Use in didUpdate.\n\nIn simple words:\nPreserve chat list scroll. Return value → componentDidUpdate 3rd arg.\nRef + layout effect patterns are more common in hooks now.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "class ChatList extends Component {\n  listRef = createRef();\n  getSnapshotBeforeUpdate(prevProps) {\n    const el = this.listRef.current;\n    if (prevProps.items.length < this.props.items.length && el) {\n      return el.scrollHeight - el.scrollTop;\n    }\n    return null;\n  }\n  componentDidUpdate(_prevProps, _prevState, snapshot) {\n    const el = this.listRef.current;\n    if (snapshot != null && el) {\n      el.scrollTop = el.scrollHeight - snapshot;\n    }\n  }\n  render() {\n    return (\n      <ul ref={this.listRef} style={{ height: 120, overflow: \"auto\" }}>\n        {this.props.items.map((m) => (\n          <li key={m.id}>{m.text}</li>\n        ))}\n      </ul>\n    );\n  }\n}"
          },
          {
            "title": "Q12: Error boundary as class",
            "explain": "Task:\ngetDerivedStateFromError + componentDidCatch — class only (core API).\n\nIn simple words:\nCatches render/lifecycle errors. Not events/async — use try/catch there.\nSee file 20 — class syntax revision here.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "class ClassErrorBoundary extends Component {\n  state = { hasError: false };\n  static getDerivedStateFromError() {\n    return { hasError: true };\n  }\n  componentDidCatch(error, info) {\n    console.error(\"ClassErrorBoundary\", error, info.componentStack);\n  }\n  render() {\n    if (this.state.hasError) return <p>Class boundary caught error.</p>;\n    return this.props.children;\n  }\n}\n\nfunction BuggyWidget({ crash }) {\n  if (crash) throw new Error(\"class boundary test\");\n  return <p>Widget OK</p>;\n}\n\nclass BoundaryDemo extends Component {\n  state = { crash: false };\n  render() {\n    return (\n      <ClassErrorBoundary>\n        <button onClick={() => this.setState({ crash: true })}>Crash</button>\n        <BuggyWidget crash={this.state.crash} />\n      </ClassErrorBoundary>\n    );\n  }\n}"
          },
          {
            "title": "Q13: defaultProps / propTypes mention",
            "explain": "Task:\ndefaultProps static; propTypes runtime dev check (prop-types package).\n\nIn simple words:\nPropTypes less common in TS projects; default params / defaultProps still used.\ndefaultProps on function components trending deprecated — use destructure defaults.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "class Avatar extends Component {\n  static defaultProps = {\n    size: 40,\n    alt: \"avatar\",\n  };\n  render() {\n    const { src, size, alt } = this.props;\n    return <img src={src} width={size} height={size} alt={alt} />;\n  }\n}\n// PropTypes (in Vite: npm i prop-types):\n// Avatar.propTypes = { src: PropTypes.string.isRequired, size: PropTypes.number };"
          },
          {
            "title": "Q14: refs — createRef vs callback ref",
            "explain": "Task:\ncreateRef as instance field; callback ref fn (do not use legacy string refs).\n\nIn simple words:\nFocus input: this.inputRef.current.focus(). Callback when unmount/remount is dynamic.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "class FocusInput extends Component {\n  inputRef = createRef();\n  componentDidMount() {\n    this.inputRef.current?.focus();\n  }\n  render() {\n    return <input ref={this.inputRef} placeholder=\"auto focus\" />;\n  }\n}\n\nclass CallbackRefDemo extends Component {\n  state = { h: 0 };\n  setRef = (node) => {\n    if (node) this.setState({ h: node.offsetHeight });\n  };\n  render() {\n    return (\n      <div>\n        <div ref={this.setRef} style={{ padding: 20, background: \"#eee\" }}>\n          Measure me\n        </div>\n        <p>Height: {this.state.h}px</p>\n      </div>\n    );\n  }\n}"
          },
          {
            "title": "Q15: Force update — when NOT to",
            "explain": "Task:\nthis.forceUpdate() exists — almost never use.\n\nIn simple words:\nRender should come from state/props change. forceUpdate = code smell.\nExternal mutable data? → copy into state or use subscription pattern.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "class ForceBad extends Component {\n  external = { n: 0 };\n  tick = () => {\n    this.external.n += 1;\n    this.forceUpdate(); // ❌ smell — use setState instead\n  };\n  render() {\n    return (\n      <button onClick={this.tick}>External: {this.external.n}</button>\n    );\n  }\n}"
          },
          {
            "title": "Q16: Lifecycle order — mount / update / unmount (comment diagram)",
            "explain": "Task:\nMemorize this for interviews.\n\nIn simple words:\n\nMOUNT (parent → child):\n  constructor → getDerivedStateFromProps → render →\n  child... → componentDidMount (child first, parent last)\n\nUPDATE:\n  getDerivedStateFromProps → shouldComponentUpdate → render →\n  getSnapshotBeforeUpdate → DOM update → componentDidUpdate\n\nUNMOUNT:\n  componentWillUnmount (child first, parent last)\n\nReact 18+ Strict Mode DEV: extra mount/unmount/remount — tests cleanup.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const lifecycleOrderNote =\n  \"Mount: construct→render→didMount. Update: derive→SCU→render→snapshot→didUpdate. Unmount: willUnmount.\";"
          },
          {
            "title": "Q17: Class → hooks migration map",
            "explain": "Task:\nMental translation table — interview gold.\n\nIn simple words:\nconstructor state     → useState / useReducer initial\ncomponentDidMount       → useEffect(() => {}, [])\ncomponentDidUpdate      → useEffect(() => {}, [deps])\ncomponentWillUnmount    → useEffect return cleanup\nshouldComponentUpdate   → React.memo + compare OR useMemo\nthis.state              → useState/useReducer\nthis.props              → function props arg\ncontext                 → useContext\nrefs                    → useRef\ngetDerivedStateFromProps → derived during render / key remount\nError boundary          → still class (or lib)",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const migrationMap = {\n  componentDidMount: \"useEffect(fn, [])\",\n  componentDidUpdate: \"useEffect(fn, [deps])\",\n  componentWillUnmount: \"useEffect(() => cleanup, [])\",\n  shouldComponentUpdate: \"React.memo(Component, areEqual?)\",\n  state: \"useState / useReducer\",\n  context: \"useContext\",\n  refs: \"useRef\",\n};"
          },
          {
            "title": "Q18: Why industry moved to hooks",
            "explain": "Task:\nConceptual — comment in code + small hook version.\n\nIn simple words:\n1) Logic reuse without HOC/render-prop nesting hell\n2) Related lifecycle split across methods → one useEffect cluster\n3) Classes: this binding confusion, bigger bundle, no compiler wins easy\n4) Concurrent features designed around functions\n5) Less boilerplate — same Counter 1/3 lines",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function HookCounter({ initial = 0 }) {\n  const [count, setCount] = useState(initial);\n  return <button onClick={() => setCount((c) => c + 1)}>{count}</button>;\n}"
          },
          {
            "title": "Q19: Mixed class parent + function child",
            "explain": "Task:\nClass parent renders function child — normal React, no special API.\n\nIn simple words:\nLegacy screen as class wrapper + new feature function components inside.\nGradual migration pattern in real companies.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function ModernButton({ label, onClick }) {\n  return <button onClick={onClick}>{label}</button>;\n}\n\nclass LegacyShell extends Component {\n  state = { count: 0 };\n  render() {\n    return (\n      <div className=\"legacy-shell\">\n        <h2>Class shell</h2>\n        <ModernButton\n          label={`Count ${this.state.count}`}\n          onClick={() => this.setState({ count: this.state.count + 1 })}\n        />\n      </div>\n    );\n  }\n}"
          },
          {
            "title": "Q20: setState batching in classes",
            "explain": "Task:\nReact 18+ automatic batching — event handlers, promises, timeouts all batched.\n\nIn simple words:\nMultiple setState → usually one re-render. Functional updaters chain safely.\nflushSync forces sync rarely — perf hit.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "class BatchClass extends Component {\n  state = { a: 0, b: 0 };\n  onClick = () => {\n    this.setState({ a: this.state.a + 1 });\n    this.setState({ b: this.state.b + 1 });\n    // React 18+: typically 1 render after both\n  };\n  render() {\n    return (\n      <button onClick={this.onClick}>\n        {this.state.a},{this.state.b}\n      </button>\n    );\n  }\n}"
          },
          {
            "title": "Q21: Context in class — static contextType",
            "explain": "Task:\nAssign ThemeContext to static contextType; read this.context.\n\nIn simple words:\nHooks: useContext. Class: contextType OR Context.Consumer wrapper (verbose).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const ThemeContextClass = createContext(\"light\");\n\nclass ThemedPanel extends Component {\n  static contextType = ThemeContextClass;\n  render() {\n    const theme = this.context;\n    return <div data-theme={theme}>Panel theme: {theme}</div>;\n  }\n}\n\nclass ThemeProviderClass extends Component {\n  state = { theme: \"dark\" };\n  render() {\n    return (\n      <ThemeContextClass.Provider value={this.state.theme}>\n        <ThemedPanel />\n      </ThemeContextClass.Provider>\n    );\n  }\n}"
          },
          {
            "title": "Q22: [MID] Interview pitfalls — mutate state, forget bind",
            "explain": "Task:\nShow common mistakes + fix.\n\nIn simple words:\n❌ this.state.items.push(x); this.setState({ items: this.state.items })\n✅ this.setState({ items: [...this.state.items, x] })\n❌ <button onClick={this.handle}> — this undefined\n✅ arrow field or bind",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "class PitfallDemo extends Component {\n  state = { items: [\"a\"] };\n  // ❌ handleBad() { this.setState(...) } without bind\n\n  handleGood = () => {\n    this.setState((prev) => ({\n      items: [...prev.items, \"b\"], // immutable ✅\n    }));\n  };\n  render() {\n    return (\n      <div>\n        <ul>\n          {this.state.items.map((x) => (\n            <li key={x}>{x}</li>\n          ))}\n        </ul>\n        <button onClick={this.handleGood}>Add immutable</button>\n      </div>\n    );\n  }\n}"
          },
          {
            "title": "Q23: PureComponent shallow compare demo",
            "explain": "Task:\nSame object reference prop → PureChild skips render.\nNew object each time → will render.\n\nIn simple words:\nstyle={{ color: \"red\" }} new object every time — PureComponent benefit zero.\nPass stable reference or primitive props.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "class ShallowDemo extends Component {\n  state = { n: 0 };\n  config = { color: \"blue\" }; // stable ref ✅\n  render() {\n    return (\n      <div>\n        <button onClick={() => this.setState({ n: this.state.n + 1 })}>\n          parent {this.state.n}\n        </button>\n        <PureChild label=\"hi\" meta={this.config} />\n        <PureChild label=\"hi\" meta={{ color: \"red\" }} /> {/* new each render ❌ */}\n      </div>\n    );\n  }\n}"
          },
          {
            "title": "Q24: [ADV] Legacy UNSAFE_ lifecycle warning",
            "explain": "Task:\nUNSAFE_componentWillMount/ReceiveProps/Update — deprecated paths.\n\nIn simple words:\nStrict Mode + future React may remove them. Migrate:\nwillMount → constructor / componentDidMount\nwillReceiveProps → getDerivedStateFromProps (careful) or derived render\nwillUpdate → getSnapshotBeforeUpdate + didUpdate\nCodemods exist — in interview say \"UNSAFE prefix = migrate\".",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const unsafeLifecycleNote =\n  \"UNSAFE_* lifecycles = legacy; use getDerivedStateFromProps, getSnapshotBeforeUpdate, or hooks.\";"
          },
          {
            "title": "Q25: Counter — class vs function (mental conversion)",
            "explain": "Task:\nSame counter both styles — learn side-by-side.\n\nIn simple words:\nClass: state + bound handlers + optional lifecycle.\nFunction: useState one-liner. Same behavior — different syntax.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "class ClassCounter extends Component {\n  state = { count: 0 };\n  inc = () => this.setState((s) => ({ count: s.count + 1 }));\n  dec = () => this.setState((s) => ({ count: s.count - 1 }));\n  render() {\n    return (\n      <div>\n        Class: {this.state.count}\n        <button onClick={this.inc}>+</button>\n        <button onClick={this.dec}>-</button>\n      </div>\n    );\n  }\n}\n\nfunction FunctionCounter() {\n  const [count, setCount] = useState(0);\n  return (\n    <div>\n      Function: {count}\n      <button onClick={() => setCount((c) => c + 1)}>+</button>\n      <button onClick={() => setCount((c) => c - 1)}>-</button>\n    </div>\n  );\n}\n\nfunction CounterCompare() {\n  return (\n    <div>\n      <ClassCounter />\n      <FunctionCounter />\n    </div>\n  );\n}\n\n// -----------------------------------------------------------------------------\n// Quick revise: Error boundary class-only | bind this | setState merge/batch\n// PureComponent shallow | migrate map | UNSAFE avoid | hooks won new code\n// -----------------------------------------------------------------------------"
          }
        ]
      },
      {
        "file": "42_TypeScriptAndReact.tsx",
        "title": "42 — TypeScript + React",
        "kya": "TypeScript = type checker while you write code — wrong props passed?",
        "detail": "42 — TypeScript + React\nLevel: ADVANCED  |  Sequence: JS React solid, then this typing layer\n\nSIMPLE: TypeScript = type checker while you write code — wrong props passed?\nCompiler catches it. In React, props, events, refs, hooks — all typed.\n\nWHY: Fewer runtime bugs in big teams; autocomplete; safe refactors.\nINTERVIEW: FC vs plain fn, discriminated unions, generic List<T>, ref null.\nUse in Vite + React + TS project — teaching file.\nOptional: npm i zod (Q18 preview)",
        "intro": "42 — TypeScript + React\nLevel: ADVANCED  |  Sequence: JS React solid, then this typing layer\n\nSIMPLE: TypeScript = type checker while you write code — wrong props passed?\nCompiler catches it. In React, props, events, refs, hooks — all typed.\n\nWHY: Fewer runtime bugs in big teams; autocomplete; safe refactors.\nINTERVIEW: FC vs plain fn, discriminated unions, generic List<T>, ref null.\nUse in Vite + React + TS project — teaching file.\nOptional: npm i zod (Q18 preview)",
        "questions": [
          {
            "title": "Q1: FC vs plain function typing props",
            "explain": "Task:\nReact.FC used to inject optional children — now prefer plain fn + props type.\n\nIn simple words:\nfunction Button(props: ButtonProps) — simple, explicit.\nReact.FC<Props> legacy; generic children confusion — avoid in new code.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "type ButtonProps = {\n  label: string;\n  onClick: () => void;\n};\n\n// ✅ preferred\nfunction PlainButton({ label, onClick }: ButtonProps) {\n  return <button onClick={onClick}>{label}</button>;\n}\n\n// Legacy style (still seen)\nconst FCButton: React.FC<ButtonProps> = ({ label, onClick }) => (\n  <button onClick={onClick}>{label}</button>\n);"
          },
          {
            "title": "Q2: Props interface + optional + children: React.ReactNode",
            "explain": "Task:\ninterface CardProps { title: string; subtitle?: string; children: ReactNode }\n\nIn simple words:\n? = optional. ReactNode = string | number | element | fragment | null | array...\nJSX can have anything as children — ReactNode covers it.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "interface CardProps {\n  title: string;\n  subtitle?: string;\n  children: ReactNode;\n}\n\nfunction Card({ title, subtitle, children }: CardProps) {\n  return (\n    <article>\n      <h2>{title}</h2>\n      {subtitle && <p>{subtitle}</p>}\n      {children}\n    </article>\n  );\n}"
          },
          {
            "title": "Q3: Event types — ChangeEvent, FormEvent, MouseEvent",
            "explain": "Task:\nIn handler: e: ChangeEvent<HTMLInputElement> etc.\n\nIn simple words:\nGeneric element type tells you what e.target is.\nForm submit → FormEvent<HTMLFormElement>. Click → MouseEvent<HTMLButtonElement>.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function SearchForm() {\n  const [q, setQ] = useState(\"\");\n\n  function onChange(e: ChangeEvent<HTMLInputElement>) {\n    setQ(e.target.value); // target typed as HTMLInputElement ✅\n  }\n\n  function onSubmit(e: FormEvent<HTMLFormElement>) {\n    e.preventDefault();\n    console.log(\"search\", q);\n  }\n\n  function onLogoClick(e: MouseEvent<HTMLButtonElement>) {\n    e.preventDefault();\n  }\n\n  return (\n    <form onSubmit={onSubmit}>\n      <input value={q} onChange={onChange} />\n      <button type=\"button\" onClick={onLogoClick}>\n        Logo\n      </button>\n      <button type=\"submit\">Go</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q4: useState — generic inference + explicit",
            "explain": "Task:\nuseState(0) infers number. For union/null use explicit generic.\n\nIn simple words:\nuseState<User | null>(null) — TS knows when state can be null.\nInitial value inference is often enough — don't over-annotate.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "type User = { id: number; name: string };\n\nfunction UserPicker() {\n  const [count, setCount] = useState(0); // inferred number\n  const [user, setUser] = useState<User | null>(null); // explicit union\n\n  function load() {\n    setUser({ id: 1, name: \"Jay\" });\n    setCount((c) => c + 1);\n  }\n\n  return (\n    <button onClick={load}>\n      {user?.name ?? \"none\"} ({count})\n    </button>\n  );\n}"
          },
          {
            "title": "Q5: useRef — HTML element types + null initial",
            "explain": "Task:\nuseRef<HTMLInputElement>(null) — .current HTMLInputElement | null.\n\nIn simple words:\nDOM ref → element type + null. Mutable box (no DOM) → useRef<number>(0).\nGuard with if (ref.current) before access — strict null checks.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function FocusField() {\n  const inputRef = useRef<HTMLInputElement>(null);\n\n  useEffect(() => {\n    inputRef.current?.focus(); // optional chaining ✅\n  }, []);\n\n  return <input ref={inputRef} />;\n}\n\nfunction TickRef() {\n  const renders = useRef(0);\n  renders.current += 1;\n  return <span>Renders: {renders.current}</span>;\n}"
          },
          {
            "title": "Q6: useReducer — typed actions (discriminated union)",
            "explain": "Task:\ntype Action = { type: \"inc\" } | { type: \"set\"; value: number }\n\nIn simple words:\nDiscriminant field \"type\" — switch narrows it.\npayload optional per action — type-safe dispatch.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "type CounterState = { count: number };\n\ntype CounterAction =\n  | { type: \"inc\" }\n  | { type: \"dec\" }\n  | { type: \"set\"; value: number }\n  | { type: \"reset\" };\n\nfunction counterReducer(state: CounterState, action: CounterAction): CounterState {\n  switch (action.type) {\n    case \"inc\":\n      return { count: state.count + 1 };\n    case \"dec\":\n      return { count: state.count - 1 };\n    case \"set\":\n      return { count: action.value }; // action narrowed ✅\n    case \"reset\":\n      return { count: 0 };\n    default: {\n      const _exhaustive: never = action;\n      return _exhaustive;\n    }\n  }\n}\n\nfunction TypedCounter() {\n  const [state, dispatch] = useReducer(counterReducer, { count: 0 });\n  return (\n    <div>\n      {state.count}\n      <button onClick={() => dispatch({ type: \"inc\" })}>+</button>\n      <button onClick={() => dispatch({ type: \"set\", value: 10 })}>10</button>\n    </div>\n  );\n}"
          },
          {
            "title": "Q7: Component props with generics — List<T>",
            "explain": "Task:\nfunction List<T>({ items, render }: ListProps<T>)\n\nIn simple words:\nReusable list — caller decides item type. Can add keyof / extends constraints.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "type ListProps<T> = {\n  items: T[];\n  renderItem: (item: T) => ReactNode;\n  keyFn: (item: T) => string | number;\n};\n\nfunction List<T>({ items, renderItem, keyFn }: ListProps<T>) {\n  return (\n    <ul>\n      {items.map((item) => (\n        <li key={keyFn(item)}>{renderItem(item)}</li>\n      ))}\n    </ul>\n  );\n}\n\nfunction GenericListDemo() {\n  return (\n    <List\n      items={[{ id: 1, name: \"A\" }]}\n      keyFn={(u) => u.id}\n      renderItem={(u) => u.name}\n    />\n  );\n}"
          },
          {
            "title": "Q8: Extending HTML attributes — ButtonHTMLAttributes",
            "explain": "Task:\ntype Props = ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean }\n\nIn simple words:\nInherit native props (onClick, disabled, className) + add custom ones.\nComponentPropsWithoutRef<\"button\"> is also a common shortcut.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "type LoadingButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {\n  loading?: boolean;\n};\n\nfunction LoadingButton({ loading, children, disabled, ...rest }: LoadingButtonProps) {\n  return (\n    <button {...rest} disabled={disabled || loading}>\n      {loading ? \"...\" : children}\n    </button>\n  );\n}\n\ntype IconInputProps = InputHTMLAttributes<HTMLInputElement> & {\n  icon?: ReactNode;\n};\n\nfunction IconInput({ icon, ...inputProps }: IconInputProps) {\n  return (\n    <label>\n      {icon}\n      <input {...inputProps} />\n    </label>\n  );\n}"
          },
          {
            "title": "Q9: Discriminated union props — variant",
            "explain": "Task:\nLinkButton = { variant: \"link\"; href: string } | { variant: \"button\"; onClick }\n\nIn simple words:\nvariant switch → TS forces correct fields per branch.\nBetter than making everything optional — impossible states become compile errors.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "type ActionLink =\n  | { variant: \"link\"; href: string; label: string }\n  | { variant: \"button\"; onClick: () => void; label: string };\n\nfunction ActionControl(props: ActionLink) {\n  if (props.variant === \"link\") {\n    return <a href={props.href}>{props.label}</a>;\n  }\n  return <button onClick={props.onClick}>{props.label}</button>;\n}"
          },
          {
            "title": "Q10: Typing custom hooks return",
            "explain": "Task:\nExplicit return type OR inferred tuple/object.\n\nIn simple words:\nReturn type documents the API. Tuple [value, setter] as const is optional.\nDon't over-export internal types — only what hook consumers need.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "type UseToggleReturn = {\n  on: boolean;\n  toggle: () => void;\n  setOn: (v: boolean) => void;\n};\n\nfunction useToggle(initial = false): UseToggleReturn {\n  const [on, setOn] = useState(initial);\n  const toggle = () => setOn((v) => !v);\n  return { on, toggle, setOn };\n}\n\nfunction ToggleDemo() {\n  const { on, toggle } = useToggle();\n  return <button onClick={toggle}>{on ? \"ON\" : \"OFF\"}</button>;\n}"
          },
          {
            "title": "Q11: Context — typed createContext + undefined guard",
            "explain": "Task:\ncreateContext<Auth | null>(null) + provider OR throw helper.\n\nIn simple words:\nDefault null → guard in consumer. Or separate useAuth hook throws if missing.\nundefined default also works — but null + named hook pattern is common.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "type AuthContextValue = {\n  user: User | null;\n  login: (name: string) => void;\n  logout: () => void;\n};\n\nconst AuthContext = createContext<AuthContextValue | null>(null);\n\nfunction useAuth(): AuthContextValue {\n  const ctx = useContext(AuthContext);\n  if (!ctx) throw new Error(\"useAuth must be inside AuthProvider\");\n  return ctx;\n}\n\nfunction AuthProvider({ children }: { children: ReactNode }) {\n  const [user, setUser] = useState<User | null>(null);\n  const value = useMemo(\n    () => ({\n      user,\n      login: (name: string) => setUser({ id: Date.now(), name }),\n      logout: () => setUser(null),\n    }),\n    [user]\n  );\n  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;\n}\n\nfunction ProfileChip() {\n  const { user, logout } = useAuth();\n  return user ? (\n    <span>\n      {user.name} <button onClick={logout}>out</button>\n    </span>\n  ) : (\n    <span>Guest</span>\n  );\n}"
          },
          {
            "title": "Q12: forwardRef / React 19 ref as prop typing",
            "explain": "Task:\nReact 19: ref normal prop. forwardRef legacy typing still in codebases.\n\nIn simple words:\nforwardRef<HTMLInputElement, Props>((props, ref) => ...)\n19 style: function Input({ ref, ...props }: Props & { ref?: Ref<HTMLInputElement> })",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "type Input19Props = Omit<ComponentPropsWithoutRef<\"input\">, \"ref\"> & {\n  ref?: Ref<HTMLInputElement>;\n};\n\nfunction Input19({ ref, ...rest }: Input19Props) {\n  return <input ref={ref} {...rest} />;\n}\n\ntype LegacyInputProps = { label: string } & ComponentPropsWithoutRef<\"input\">;\n\nconst LegacyInput = forwardRef<HTMLInputElement, LegacyInputProps>(\n  function LegacyInput({ label, ...rest }, ref) {\n    return (\n      <label>\n        {label}\n        <input ref={ref} {...rest} />\n      </label>\n    );\n  }\n);"
          },
          {
            "title": "Q13: as const / satisfies",
            "explain": "Task:\nas const → readonly literal tuple. satisfies → check shape, keep inference.\n\nIn simple words:\nROUTES as const — keyof typeof ROUTES typed keys.\nsatisfies Record<string, string> — extra keys error, values stay literal.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const ROUTES = {\n  home: \"/\",\n  settings: \"/settings\",\n} as const;\n\ntype RouteKey = keyof typeof ROUTES; // \"home\" | \"settings\"\n\nconst STATUS_COLORS = {\n  ok: \"green\",\n  err: \"red\",\n} satisfies Record<string, string>;\n\nfunction RouteLink({ name }: { name: RouteKey }) {\n  return <a href={ROUTES[name]}>{name}</a>;\n}"
          },
          {
            "title": "Q14: Utility types — Pick Omit Partial Required for props",
            "explain": "Task:\nDerive internal types from public props — DRY.\n\nIn simple words:\nPick<User, \"id\" | \"name\"> — subset. Omit<User, \"password\"> — hide sensitive.\nPartial<Form> edit mode. Required<Pick<...>> force optional → required.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "type FullUser = {\n  id: number;\n  name: string;\n  email: string;\n  password: string;\n};\n\ntype PublicUser = Omit<FullUser, \"password\">;\ntype UserPreview = Pick<FullUser, \"id\" | \"name\">;\ntype UserPatch = Partial<Pick<FullUser, \"name\" | \"email\">>;\n\nfunction UserBadge({ id, name }: UserPreview) {\n  return (\n    <span>\n      #{id} {name}\n    </span>\n  );\n}"
          },
          {
            "title": "Q15: API response + loading/error state union",
            "explain": "Task:\ntype State = idle | loading | success | error — discriminated.\n\nIn simple words:\nNarrow via status field — data exists only in success (TS knows).\nSame pattern as file 12 fetch machine — now typed.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "type ApiUser = { id: number; name: string };\n\ntype FetchState =\n  | { status: \"idle\" }\n  | { status: \"loading\" }\n  | { status: \"success\"; data: ApiUser }\n  | { status: \"error\"; message: string };\n\nfunction UserLoader() {\n  const [state, setState] = useState<FetchState>({ status: \"idle\" });\n\n  async function load() {\n    setState({ status: \"loading\" });\n    try {\n      const res = await fetch(\"https://jsonplaceholder.typicode.com/users/1\");\n      const data = (await res.json()) as ApiUser;\n      setState({ status: \"success\", data });\n    } catch (e) {\n      setState({ status: \"error\", message: String(e) });\n    }\n  }\n\n  if (state.status === \"success\") return <p>{state.data.name}</p>;\n  if (state.status === \"error\") return <p>{state.message}</p>;\n  return <button onClick={load}>Load user</button>;\n}"
          },
          {
            "title": "Q16: Children render props typing",
            "explain": "Task:\nchildren: (value: T) => ReactNode — function as child.\n\nIn simple words:\nRender prop pattern typed — caller knows the data type.\nReactNode return gives flexible UI.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "type DataRenderProps<T> = {\n  data: T;\n  children: (item: T) => ReactNode;\n};\n\nfunction DataRender<T>({ data, children }: DataRenderProps<T>) {\n  return <>{children(data)}</>;\n}\n\nfunction RenderPropDemo() {\n  return (\n    <DataRender data={{ score: 42 }}>\n      {(d) => <strong>Score: {d.score}</strong>}\n    </DataRender>\n  );\n}"
          },
          {
            "title": "Q17: Polymorphic `as` prop pattern (simple)",
            "explain": "Task:\n<Text as=\"a\" href=\"...\"> — element type change, props merge typed.\n\nIn simple words:\nElementType + ComponentPropsWithoutRef<C> intersection — advanced but common lib pattern.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "type PolymorphicProps<C extends ElementType> = {\n  as?: C;\n  children: ReactNode;\n} & ComponentPropsWithoutRef<C>;\n\nfunction Text<C extends ElementType = \"span\">({\n  as,\n  children,\n  ...rest\n}: PolymorphicProps<C>) {\n  const Component = as ?? \"span\";\n  return <Component {...rest}>{children}</Component>;\n}\n\nfunction PolymorphicDemo() {\n  return (\n    <>\n      <Text>Default span</Text>\n      <Text as=\"a\" href=\"/home\">\n        Link\n      </Text>\n      <Text as=\"button\" type=\"button\" onClick={() => {}}>\n        Btn\n      </Text>\n    </>\n  );\n}"
          },
          {
            "title": "Q18: Zod infer — z.infer preview for forms",
            "explain": "Task:\nSchema single source → runtime validate + TS type.\n\nIn simple words:\nnpm i zod. Form schema define → type FormValues = z.infer<typeof Schema>.\nparse safe — invalid data caught at runtime, type at compile time.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const SignupSchema = z.object({\n  email: z.string().email(),\n  age: z.number().min(18),\n});\n\ntype SignupValues = z.infer<typeof SignupSchema>;\n\nfunction parseSignup(raw: unknown): SignupValues {\n  return SignupSchema.parse(raw); // throws if invalid\n}\n\nfunction SignupPreview() {\n  const [values] = useState<SignupValues>({ email: \"a@b.com\", age: 21 });\n  return <span>{values.email}</span>;\n}"
          },
          {
            "title": "Q19: Strict tsconfig tips (comments)",
            "explain": "Task:\nEnable compilerOptions strict family.\n\nIn simple words:\n\"strict\": true — null checks, implicit any off, etc.\n\"noUncheckedIndexedAccess\": true — arr[i] maybe undefined ✅ safer\n\"jsx\": \"react-jsx\" — Vite default\nskipLibCheck true speed; exactOptionalPropertyTypes advanced optional strict\neslint @typescript-eslint consistent-type-imports — type-only imports",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const tsconfigTips = [\n  \"strict: true\",\n  \"noUncheckedIndexedAccess: true for safer indexing\",\n  \"jsx: react-jsx\",\n  \"prefer type-only imports for types\",\n] as const;"
          },
          {
            "title": "Q20: Common TS errors — children, event target, ref null",
            "explain": "Task:\nShow fix patterns.\n\nIn simple words:\n❌ Props without children but JSX children pass → add children: ReactNode\n❌ e.target.value on Event → ChangeEvent<HTMLInputElement>\n❌ ref.current.focus() without null check → ?. or if guard\n❌ useRef<number>() without initial → useRef<number>(0) or null generic",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function FixedChildren({ children }: { children: ReactNode }) {\n  return <div>{children}</div>;\n}\n\nfunction FixedInput() {\n  const ref = useRef<HTMLInputElement>(null);\n  function onChange(e: ChangeEvent<HTMLInputElement>) {\n    console.log(e.target.value);\n  }\n  function focus() {\n    ref.current?.focus();\n  }\n  return <input ref={ref} onChange={onChange} onFocus={focus} />;\n}"
          },
          {
            "title": "Q21: Typing memo / lazy components",
            "explain": "Task:\nmemo<Props>(fn). lazy(() => import(...)) return type Promise<{ default: Component }>\n\nIn simple words:\nmemo generic preserves props. lazy needs default export component.\nSuspense boundary with lazy child (file 21).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "type ExpensiveProps = { n: number };\n\nconst Expensive = memo(function Expensive({ n }: ExpensiveProps) {\n  return <div>{n * 2}</div>;\n});\n\nconst LazyDashboard = lazy(() =>\n  Promise.resolve({\n    default: function Dashboard() {\n      return <div>Lazy loaded</div>;\n    },\n  })\n);"
          },
          {
            "title": "Q22: Enum vs union string literals for variants",
            "explain": "Task:\nPrefer union \"sm\" | \"md\" | \"lg\" over enum (tree-shake, no reverse mapping).\n\nIn simple words:\nenum Size { Sm, Md } — runtime object, awkward JSX.\ntype Size = \"sm\" | \"md\" — idiomatic TS + React props.\nconst enum rare — bundler inline, debugging harder.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "type Size = \"sm\" | \"md\" | \"lg\";\n\ntype SizedBoxProps = {\n  size: Size;\n  children: ReactNode;\n};\n\nfunction SizedBox({ size, children }: SizedBoxProps) {\n  const pad = { sm: 4, md: 8, lg: 16 }[size];\n  return <div style={{ padding: pad }}>{children}</div>;\n}\n\n// enum example (discouraged for simple variants):\nenum LegacySize {\n  Sm = \"sm\",\n  Md = \"md\",\n}"
          },
          {
            "title": "Q23: Index signatures vs Record",
            "explain": "Task:\nRecord<string, T> typed dict. Index signature { [key: string]: T } similar.\n\nIn simple words:\nRecord<Keys, T> — known keys. Record<string, number> — open map.\nIndex signature on interface allows extra props — use carefully with strict.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "type LabelsByLocale = Record<string, string>;\n\nconst labels: LabelsByLocale = {\n  en: \"Hello\",\n  hi: \"Namaste\",\n};\n\ninterface StringMap {\n  [key: string]: string;\n}\n\nconst alsoLabels: StringMap = labels;\n\nfunction LocaleLabel({ code }: { code: string }) {\n  return <span>{labels[code] ?? code}</span>;\n}"
          },
          {
            "title": "Q24: Typing useEffect cleanup",
            "explain": "Task:\nReturn void | (() => void | undefined) — cleanup function optional.\n\nIn simple words:\nEffect fn return type inferred. Explicit: useEffect((): void | (() => void) => ...)\nCleanup is sync — don't return async fn (Promise void ≠ cleanup).\nAbortController typed with fetch cancel pattern.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function SubscribedWidget({ userId }: { userId: number }) {\n  useEffect(() => {\n    const ctrl = new AbortController();\n    let alive = true;\n\n    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {\n      signal: ctrl.signal,\n    })\n      .then((r) => r.json())\n      .then((data) => {\n        if (alive) console.log(data);\n      })\n      .catch(() => {});\n\n    return () => {\n      alive = false;\n      ctrl.abort();\n    };\n  }, [userId]);\n\n  return <div>User {userId}</div>;\n}"
          },
          {
            "title": "Q25: [ADV] Interview — interface vs type for props; never for props?",
            "explain": "Task:\nNuanced answer worth knowing for interviews.\n\nIn simple words:\ninterface props — extend declare merge (rare for props). type — unions/intersections easier.\nTeam convention > dogma. Both fine for component props.\n\"never use type\" outdated myth. \"never use interface for unions\" — union needs type.\nProps = object shape → either works. Consistency in team is important.\neslint-react often no difference; pick one style guide.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "type NeverForPropsMyth =\n  \"Both interface and type work for props; use type for unions/discriminated unions.\";\n\ninterface ExtendableProps {\n  id: string;\n}\ninterface ExtendableProps {\n  optional?: boolean; // declaration merge — interface only feature\n}\n\ntype PropsUnion = { mode: \"view\" } | { mode: \"edit\"; onSave: () => void };\n\nfunction ModePanel(props: PropsUnion) {\n  if (props.mode === \"edit\") {\n    return <button onClick={props.onSave}>Save</button>;\n  }\n  return <p>View only</p>;\n}\n\n// -----------------------------------------------------------------------------\n// Quick revise: events generic element | ref null | discriminated unions\n// generic List<T> | z.infer | strict tsconfig | interface vs type pragmatic\n// -----------------------------------------------------------------------------"
          }
        ]
      },
      {
        "file": "43_AccessibilityA11y.jsx",
        "title": "43 — Accessibility (a11y)",
        "kya": "a11y = all users can use the app — keyboard-only, screen reader,",
        "detail": "43 — Accessibility (a11y) Deep Dive\nLevel: MID / ADV  |  Sequence: file 22 routing first, then this for UI polish\n\nSIMPLE: a11y = all users can use the app — keyboard-only, screen reader,\nlow vision, motor issues. Semantic HTML first; ARIA only when a native element\nis not enough. Make a button a real button; do not use div with onClick.\n\nScreen reader = software that reads the page aloud (NVDA, VoiceOver, JAWS).\nFocus = where the keyboard cursor is — manage it on modal/route change.\n\nWHY: Legal (WCAG), SEO, better UX for everyone. Expected in mid+ interviews.\nINTERVIEW: button vs div; aria-* when; focus trap; getByRole testing.\nVite/React 19 project — teaching file.",
        "intro": "43 — Accessibility (a11y) Deep Dive\nLevel: MID / ADV  |  Sequence: file 22 routing first, then this for UI polish\n\nSIMPLE: a11y = all users can use the app — keyboard-only, screen reader,\nlow vision, motor issues. Semantic HTML first; ARIA only when a native element\nis not enough. Make a button a real button; do not use div with onClick.\n\nScreen reader = software that reads the page aloud (NVDA, VoiceOver, JAWS).\nFocus = where the keyboard cursor is — manage it on modal/route change.\n\nWHY: Legal (WCAG), SEO, better UX for everyone. Expected in mid+ interviews.\nINTERVIEW: button vs div; aria-* when; focus trap; getByRole testing.\nVite/React 19 project — teaching file.",
        "questions": [
          {
            "title": "Q1: Semantic HTML first — do not make div soup",
            "explain": "Task:\nUse nav, main, header, footer, section, article, button, ul/li.\n\nIn simple words:\nBrowser and screen reader get structure for free. ARIA is not a band-aid.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function SemanticPage() {\n  return (\n    <>\n      <header>\n        <h1>Shop</h1>\n        <nav aria-label=\"Main\">\n          <ul>\n            <li>\n              <a href=\"/\">Home</a>\n            </li>\n          </ul>\n        </nav>\n      </header>\n      <main id=\"main-content\">\n        <article>\n          <h2>Featured product</h2>\n          <p>Description here.</p>\n        </article>\n      </main>\n      <footer>© 2026</footer>\n    </>\n  );\n}"
          },
          {
            "title": "Q2: button vs div onClick — keyboard + SR default",
            "explain": "Task:\nFor clickable things use <button> or <a href>. Use div only when you add role+keyboard.\n\nIn simple words:\nNative button = Enter/Space, focusable, announces \"button\". Div = nothing.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function GoodButton() {\n  return <button type=\"button\">Save</button>;\n}\n\nfunction BadDivButton() {\n  // ❌ anti-pattern — avoid in real apps\n  return <div onClick={() => {}}>Save</div>;\n}\n\nfunction DivAsButtonIfYouMust() {\n  function onKeyDown(e) {\n    if (e.key === \"Enter\" || e.key === \" \") {\n      e.preventDefault();\n      // action\n    }\n  }\n  return (\n    <div\n      role=\"button\"\n      tabIndex={0}\n      onClick={() => {}}\n      onKeyDown={onKeyDown}\n    >\n      Save\n    </div>\n  );\n}"
          },
          {
            "title": "Q3: label + htmlFor — give the input a name",
            "explain": "Task:\n<label htmlFor={id}> makes a bigger click area + links the label for screen reader.\n\nIn simple words:\nPlaceholder is not a label. Visible label is best; otherwise use aria-label.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function EmailField() {\n  const id = useId();\n  return (\n    <div>\n      <label htmlFor={id}>Email</label>\n      <input id={id} name=\"email\" type=\"email\" autoComplete=\"email\" />\n    </div>\n  );\n}"
          },
          {
            "title": "Q4: aria-label vs aria-labelledby",
            "explain": "Task:\naria-label = hidden text string. aria-labelledby = existing element id(s).\n\nIn simple words:\nIcon-only button → aria-label=\"Close\". Dialog title id → aria-labelledby.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function IconClose({ onClose }) {\n  return (\n    <button type=\"button\" aria-label=\"Close dialog\" onClick={onClose}>\n      ×\n    </button>\n  );\n}\n\nfunction NamedByTitle({ titleId }) {\n  return (\n    <section aria-labelledby={titleId}>\n      <h2 id={titleId}>Settings</h2>\n    </section>\n  );\n}"
          },
          {
            "title": "Q5: aria-describedby — link extra hint / error",
            "explain": "Task:\nInput + hint/error element id → aria-describedby={hintId}.\n\nIn simple words:\nScreen reader reads description after the label. Attach errors here.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function PasswordWithHint() {\n  const inputId = useId();\n  const hintId = useId();\n  return (\n    <>\n      <label htmlFor={inputId}>Password</label>\n      <input\n        id={inputId}\n        type=\"password\"\n        aria-describedby={hintId}\n      />\n      <p id={hintId}>At least 8 characters.</p>\n    </>\n  );\n}"
          },
          {
            "title": "Q6: aria-live polite vs assertive — dynamic announcements",
            "explain": "Task:\nToast/status region: role=\"status\" (polite) or role=\"alert\" (assertive).\n\nIn simple words:\npolite = finish current speech, then read. assertive = interrupt right away.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function LiveStatus({ message }) {\n  return (\n    <p role=\"status\" aria-live=\"polite\" aria-atomic=\"true\">\n      {message}\n    </p>\n  );\n}\n\nfunction LiveAlert({ error }) {\n  if (!error) return null;\n  return (\n    <div role=\"alert\" aria-live=\"assertive\">\n      {error}\n    </div>\n  );\n}"
          },
          {
            "title": "Q7: [MID] role=\"dialog\" + focus trap basics",
            "explain": "Task:\nModal open → focus inside; Tab loop; background inert (aria-modal).\n\nIn simple words:\nFocus trap = Tab does not leave until close. Libraries (FocusTrap) help too.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function SimpleModal({ open, onClose, title, children }) {\n  const dialogRef = useRef(null);\n  const titleId = useId();\n\n  useEffect(() => {\n    if (!open) return;\n    const prev = document.activeElement;\n    dialogRef.current?.focus();\n    return () => prev?.focus?.();\n  }, [open]);\n\n  if (!open) return null;\n\n  return (\n    <div\n      ref={dialogRef}\n      role=\"dialog\"\n      aria-modal=\"true\"\n      aria-labelledby={titleId}\n      tabIndex={-1}\n    >\n      <h2 id={titleId}>{title}</h2>\n      {children}\n      <button type=\"button\" onClick={onClose}>\n        Close\n      </button>\n    </div>\n  );\n}"
          },
          {
            "title": "Q8: Close modal with Escape",
            "explain": "Task:\nkeydown Escape → onClose. Return focus to trigger.\n\nIn simple words:\nExpected keyboard pattern. onKeyDown on document or dialog.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function ModalWithEscape({ open, onClose, children }) {\n  useEffect(() => {\n    if (!open) return;\n    function onKey(e) {\n      if (e.key === \"Escape\") onClose();\n    }\n    document.addEventListener(\"keydown\", onKey);\n    return () => document.removeEventListener(\"keydown\", onKey);\n  }, [open, onClose]);\n\n  if (!open) return null;\n  return <div role=\"dialog\" aria-modal=\"true\">{children}</div>;\n}"
          },
          {
            "title": "Q9: tabIndex 0 vs -1",
            "explain": "Task:\n0 = in natural tab order. -1 = programmatic focus only (modal container).\n\nIn simple words:\nDo not use positive tabIndex (tab order hack). Roving tabindex is common in lists.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function RovingTabMenu({ items }) {\n  const [active, setActive] = useState(0);\n  return (\n    <ul role=\"menubar\">\n      {items.map((label, i) => (\n        <li key={label} role=\"none\">\n          <button\n            type=\"button\"\n            role=\"menuitem\"\n            tabIndex={i === active ? 0 : -1}\n            onFocus={() => setActive(i)}\n          >\n            {label}\n          </button>\n        </li>\n      ))}\n    </ul>\n  );\n}"
          },
          {
            "title": "Q10: Keyboard Enter / Space handlers",
            "explain": "Task:\nOn custom widgets stop Space default scroll; Enter/Space = activate.\n\nIn simple words:\nNot needed on native button/link. Required on role=\"button\".",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function CustomPressable({ onPress, children }) {\n  function handleKey(e) {\n    if (e.key === \"Enter\" || e.key === \" \") {\n      e.preventDefault();\n      onPress();\n    }\n  }\n  return (\n    <span role=\"button\" tabIndex={0} onKeyDown={handleKey} onClick={onPress}>\n      {children}\n    </span>\n  );\n}"
          },
          {
            "title": "Q11: Skip link — keyboard users jump to main content",
            "explain": "Task:\nHidden link at page top → #main-content. Visible on focus.\n\nIn simple words:\nSkip repeated nav on every page. CSS off-screen until focus.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function SkipLink() {\n  return (\n    <a href=\"#main-content\" className=\"skip-link\">\n      Skip to main content\n    </a>\n  );\n}\n\n// CSS (global or module):\n// .skip-link { position:absolute; left:-9999px; }\n// .skip-link:focus { left:1rem; top:1rem; z-index:9999; }"
          },
          {
            "title": "Q12: Heading hierarchy — one h1, do not break order",
            "explain": "Task:\nOne h1 per page; sections h2, sub h3. Do not skip levels (h2→h4).\n\nIn simple words:\nScreen reader users navigate by headings. Visual size from CSS; keep tags semantic.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function HeadingOutline() {\n  return (\n    <main>\n      <h1>Dashboard</h1>\n      <section>\n        <h2>Recent orders</h2>\n        <h3>Today</h3>\n      </section>\n      <section>\n        <h2>Profile</h2>\n      </section>\n    </main>\n  );\n}"
          },
          {
            "title": "Q13: Alt text — decorative vs informative images",
            "explain": "Task:\nMeaningful img → alt describes it. Decorative → alt=\"\" (screen reader skips).\n\nIn simple words:\nDo not write \"image of\". If button has text, avoid redundant alt.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function ProductCard({ name, decorative }) {\n  return (\n    <article>\n      {decorative ? (\n        <img src=\"/hero.png\" alt=\"\" role=\"presentation\" />\n      ) : (\n        <img src=\"/product.png\" alt={`${name} — front view`} />\n      )}\n      <h2>{name}</h2>\n    </article>\n  );\n}"
          },
          {
            "title": "Q14: [MID] Form errors — aria-invalid + aria-errormessage",
            "explain": "Task:\nOn error aria-invalid=\"true\"; error span id → aria-errormessage.\n\nIn simple words:\nDo not use color-only errors. Screen reader needs both invalid field and message.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function FieldWithError({ label, value, onChange, error }) {\n  const inputId = useId();\n  const errorId = useId();\n  return (\n    <div>\n      <label htmlFor={inputId}>{label}</label>\n      <input\n        id={inputId}\n        value={value}\n        onChange={onChange}\n        aria-invalid={error ? \"true\" : undefined}\n        aria-errormessage={error ? errorId : undefined}\n      />\n      {error && (\n        <span id={errorId} role=\"alert\">\n          {error}\n        </span>\n      )}\n    </div>\n  );\n}"
          },
          {
            "title": "Q15: disabled vs aria-disabled",
            "explain": "Task:\ndisabled = no focus, no events. aria-disabled = looks disabled, focusable (explain why).\n\nIn simple words:\nReal disabled is best. aria-disabled when you need a tooltip to explain why.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function SubmitRow({ canSubmit }) {\n  return (\n    <>\n      <button type=\"submit\" disabled={!canSubmit}>\n        Pay\n      </button>\n      {/* aria-disabled pattern — still focusable, block in handler */}\n      <button\n        type=\"button\"\n        aria-disabled={!canSubmit}\n        onClick={(e) => {\n          if (!canSubmit) return;\n          // pay\n        }}\n      >\n        Pay (soft disabled)\n      </button>\n    </>\n  );\n}"
          },
          {
            "title": "Q16: [MID] Focus management after route / modal close",
            "explain": "Task:\nModal close → focus trigger. Route change → focus heading or main (SPA).\n\nIn simple words:\nLost focus = keyboard user is lost. Restore in useEffect.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function RouteFocusMain() {\n  const mainRef = useRef(null);\n  useEffect(() => {\n    mainRef.current?.focus();\n  }, []); // pathname dep in real router\n  return (\n    <main ref={mainRef} tabIndex={-1} id=\"main-content\">\n      <h1>Page title</h1>\n    </main>\n  );\n}"
          },
          {
            "title": "Q17: prefers-reduced-motion — animation respect",
            "explain": "Task:\nCSS @media (prefers-reduced-motion: reduce) { animation: none; }\n\nIn simple words:\nLess motion for users with vestibular issues. matchMedia in JS works too.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function usePrefersReducedMotion() {\n  const [reduce, setReduce] = useState(false);\n  useEffect(() => {\n    const mq = window.matchMedia(\"(prefers-reduced-motion: reduce)\");\n    setReduce(mq.matches);\n    const fn = () => setReduce(mq.matches);\n    mq.addEventListener(\"change\", fn);\n    return () => mq.removeEventListener(\"change\", fn);\n  }, []);\n  return reduce;\n}\n\nfunction MotionSafeSpinner() {\n  const reduce = usePrefersReducedMotion();\n  return (\n    <span aria-hidden={reduce} className={reduce ? \"static-icon\" : \"spin\"} />\n  );\n}"
          },
          {
            "title": "Q18: Color contrast note (WCAG)",
            "explain": "Task:\nText 4.5:1 (normal), 3:1 large. UI components 3:1. Don't rely on color alone.\n\nIn simple words:\nCheck contrast in design/comments. Error = icon + text, not red alone.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "// Design token example comment:\n// --text-on-bg: #1a1a1a on #ffffff → ~16:1 ✅\n// --muted-link: verify 4.5:1; use underline for links"
          },
          {
            "title": "Q19: Landmark roles — main, nav, complementary",
            "explain": "Task:\nSemantic tags = landmarks auto. If missing use role=\"navigation\" etc.\n\nIn simple words:\nScreen reader jumps via landmark shortcuts. One main per page. Multiple nav = aria-label.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Landmarks() {\n  return (\n    <>\n      <nav aria-label=\"Primary\">...</nav>\n      <main>...</main>\n      <aside aria-label=\"Related links\">...</aside>\n    </>\n  );\n}"
          },
          {
            "title": "Q20: [ADV] Accessible custom checkbox / switch",
            "explain": "Task:\nHidden native input + styled label; or role=\"switch\" + aria-checked.\n\nIn simple words:\nNative <input type=\"checkbox\"> is best. Custom needs keyboard + checked state sync.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function AccessibleSwitch({ checked, onChange, label }) {\n  const id = useId();\n  return (\n    <label htmlFor={id} style={{ display: \"flex\", gap: 8 }}>\n      <input\n        id={id}\n        type=\"checkbox\"\n        role=\"switch\"\n        checked={checked}\n        onChange={(e) => onChange(e.target.checked)}\n        aria-checked={checked}\n      />\n      {label}\n    </label>\n  );\n}\n\nfunction CustomCheckbox({ checked, onChange, label }) {\n  const id = useId();\n  return (\n    <>\n      <input\n        id={id}\n        type=\"checkbox\"\n        className=\"sr-only\"\n        checked={checked}\n        onChange={(e) => onChange(e.target.checked)}\n      />\n      <label htmlFor={id}>{label}</label>\n    </>\n  );\n}"
          },
          {
            "title": "Q21: Screen-reader-only CSS (.sr-only / .visually-hidden)",
            "explain": "Task:\nHide text visually, keep visible to screen reader. Extra context for icon buttons.\n\nIn simple words:\ndisplay:none / visibility:hidden hides from screen reader too — do not use.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const srOnlyStyles = {\n  position: \"absolute\",\n  width: 1,\n  height: 1,\n  padding: 0,\n  margin: -1,\n  overflow: \"hidden\",\n  clip: \"rect(0,0,0,0)\",\n  whiteSpace: \"nowrap\",\n  border: 0,\n};\n\nfunction SrOnlyExample() {\n  return (\n    <button type=\"button\">\n      <span aria-hidden>🔍</span>\n      <span style={srOnlyStyles}>Search products</span>\n    </button>\n  );\n}"
          },
          {
            "title": "Q22: [MID] Testing mindset — axe + RTL getByRole",
            "explain": "Task:\neslint-plugin-jsx-a11y; jest-axe; query by role/name, not testId only.\n\nIn simple words:\ngetByRole('button', { name: /save/i }) = query like user + screen reader.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "// import { render, screen } from '@testing-library/react';\n// import { axe, toHaveNoViolations } from 'jest-axe';\n// expect.extend(toHaveNoViolations);\n//\n// test('dialog accessible', async () => {\n//   const { container } = render(<SimpleModal open title=\"Hi\" />);\n//   expect(screen.getByRole('dialog')).toBeInTheDocument();\n//   expect(await axe(container)).toHaveNoViolations();\n// });\n\nfunction testingChecklist() {\n  return [\n    \"Tab through whole flow — focus visible?\",\n    \"Screen reader sample (VoiceOver/NVDA) once per feature\",\n    \"axe DevTools / jest-axe in CI\",\n    \"getByRole over getByTestId for a11y-critical UI\",\n  ];\n}"
          },
          {
            "title": "Q23: React 19 — aria-* props on custom components",
            "explain": "Task:\n{...props} spread to DOM; forward aria-* + id.\n\nIn simple words:\nPass aria-label through wrapper Button. Do not strip unknown aria-*.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Button({ children, ...props }) {\n  return (\n    <button type=\"button\" {...props}>\n      {children}\n    </button>\n  );\n}\n\n// Usage: <Button aria-expanded={open} aria-controls={panelId}>Menu</Button>\n\n// React 19: ref as prop on function components — focus management easier (file 34)."
          },
          {
            "title": "Q24: [ADV] Common anti-patterns — interview red flags",
            "explain": "Task:\nRemember what NOT to do: div buttons, placeholder-only labels, positive tabIndex.\n\nIn simple words:\n\"We added aria everywhere\" without semantics = fail.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const a11yAntiPatterns = [\n  \"div/span onClick without role + keyboard\",\n  \"aria-label on every div (div soup + ARIA)\",\n  \"tabIndex={1} for 'important' buttons\",\n  \"color-only state (red border, no text)\",\n  \"autoplay video/audio without control\",\n  \"role='button' on <button> (redundant)\",\n  \"aria-hidden on focusable elements\",\n  \"preventDefault on Tab inside modal (broken trap)\",\n];"
          },
          {
            "title": "Q25: [MID] Interview checklist — quick answers",
            "explain": "Task:\nRevise: first rule of ARIA, focus, live regions, testing.\n\nIn simple words:\n\"Can you use this with keyboard only?\" — always think demo-ready.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const interviewA11yChecklist = {\n  firstRuleOfAria:\n    \"If a native HTML element/attribute works, use that — ARIA last.\",\n  wcagLevels: \"A / AA (common product target) / AAA\",\n  focusVisible: \":focus-visible CSS — show for keyboard users, not mouse spam\",\n  hiddenContent:\n    \"aria-hidden=true decorative; never on interactive or main content\",\n  mobile: \"Touch targets ~44px; same semantics as desktop\",\n  legal: \"ADA, EAA (EU), Section 508 — know they exist\",\n};"
          }
        ]
      },
      {
        "file": "44_AdvancedRouting.jsx",
        "title": "44 — Advanced Routing",
        "kya": "Old style = routes in JSX, data fetch in useEffect.",
        "detail": "44 — Advanced Routing (React Router v6.4+ Data APIs)\nLevel: MID / ADV  |  Sequence: read 22_RoutingBasics first, then this\n\nSIMPLE: Old style = routes in JSX, data fetch in useEffect.\nData router = createBrowserRouter + RouterProvider — route config object,\nloader (data first), action (form submit), errorElement, defer/Suspense.\n\nRemix-style thinking: URL = source of truth; loader parallel; pending UI.\n\nWHY: Less waterfall, better UX (skeleton), auth redirect in loader clean.\nINTERVIEW: loader vs useEffect; action vs onSubmit; useBlocker; useFetcher.\nVite/React 19 — import from react-router-dom.",
        "intro": "44 — Advanced Routing (React Router v6.4+ Data APIs)\nLevel: MID / ADV  |  Sequence: read 22_RoutingBasics first, then this\n\nSIMPLE: Old style = routes in JSX, data fetch in useEffect.\nData router = createBrowserRouter + RouterProvider — route config object,\nloader (data first), action (form submit), errorElement, defer/Suspense.\n\nRemix-style thinking: URL = source of truth; loader parallel; pending UI.\n\nWHY: Less waterfall, better UX (skeleton), auth redirect in loader clean.\nINTERVIEW: loader vs useEffect; action vs onSubmit; useBlocker; useFetcher.\nVite/React 19 — import from react-router-dom.",
        "questions": [
          {
            "title": "Q1: createBrowserRouter + RouterProvider (data router entry)",
            "explain": "Task:\nrouter = createBrowserRouter([{ path, element, loader, ... }])\nRoot: <RouterProvider router={router} />\n\nIn simple words:\nConfig array/object — attach loaders/actions here. BrowserRouter+Routes is an optional alternative.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const rootRouter = createBrowserRouter([\n  {\n    path: \"/\",\n    element: <RootLayout />,\n    errorElement: <RootError />,\n    children: [\n      { index: true, element: <HomePage /> },\n      { path: \"about\", element: <AboutPage /> },\n    ],\n  },\n]);\n\nfunction AppWithDataRouter() {\n  return <RouterProvider router={rootRouter} />;\n}\n\nfunction RootLayout() {\n  return (\n    <>\n      <nav>\n        <Link to=\"/\">Home</Link>\n        <Link to=\"/about\">About</Link>\n      </nav>\n      <Outlet />\n    </>\n  );\n}\nfunction HomePage() {\n  return <h1>Home</h1>;\n}\nfunction AboutPage() {\n  return <h1>About</h1>;\n}"
          },
          {
            "title": "Q2: Deep nested routes — tree of children",
            "explain": "Task:\nParent path + child path join. /dashboard/settings/profile\n\nIn simple words:\nLayout + Outlet at each level. URL reflects hierarchy.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const nestedRouter = createBrowserRouter([\n  {\n    path: \"/dashboard\",\n    element: <DashboardLayout />,\n    children: [\n      {\n        path: \"settings\",\n        element: <SettingsLayout />,\n        children: [\n          { index: true, element: <SettingsHome /> },\n          { path: \"profile\", element: <ProfileSettings /> },\n        ],\n      },\n    ],\n  },\n]);\n\nfunction DashboardLayout() {\n  return (\n    <div>\n      <h1>Dashboard</h1>\n      <Outlet />\n    </div>\n  );\n}\nfunction SettingsLayout() {\n  return (\n    <aside>\n      <NavLink to=\"profile\">Profile</NavLink>\n      <Outlet />\n    </aside>\n  );\n}\nfunction SettingsHome() {\n  return <p>Settings overview</p>;\n}\nfunction ProfileSettings() {\n  return <p>Profile form</p>;\n}"
          },
          {
            "title": "Q3: Layout routes — shared chrome without path segment",
            "explain": "Task:\nParent is layout only; child paths are added as relative paths.\n\nIn simple words:\n/shop + /shop/cart share the same ShopShell. Nav renders once.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "// { path: '/shop', element: <ShopShell />, children: [...] }"
          },
          {
            "title": "Q4: Index routes — parent exact URL default child",
            "explain": "Task:\n{ index: true, element: <DefaultPanel /> } — no path string.\n\nIn simple words:\n/dashboard/settings exactly shows SettingsHome; /profile is a separate child.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Conceptual — see the comments in the teaching file.",
            "code": "// see teaching file comments"
          },
          {
            "title": "Q5: [MID] Pathless layout route (layout without URL segment)",
            "explain": "Task:\nParent path=\"\" — wraps siblings, no extra segment in URL.\n\nIn simple words:\nAuth wrapper or analytics layout without a /auth prefix.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const pathlessRouter = createBrowserRouter([\n  {\n    path: \"/\",\n    element: <Outlet />,\n    children: [\n      {\n        element: <AuthShell />, // pathless layout\n        children: [\n          { path: \"login\", element: <LoginPage /> },\n          { path: \"register\", element: <RegisterPage /> },\n        ],\n      },\n    ],\n  },\n]);\n\nfunction AuthShell() {\n  return (\n    <div className=\"auth-card\">\n      <Outlet />\n    </div>\n  );\n}\nfunction LoginPage() {\n  return <h1>Login</h1>;\n}\nfunction RegisterPage() {\n  return <h1>Register</h1>;\n}"
          },
          {
            "title": "Q6: Loaders — fetch before render + useLoaderData",
            "explain": "Task:\nexport async function loader() { return json(data); }\nComponent: const data = useLoaderData()\n\nIn simple words:\nRoute navigate → loader run → data ready → render. Fewer waterfalls.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "async function postsLoader() {\n  const posts = await fakePosts();\n  return json({ posts });\n}\n\nfunction PostsPage() {\n  const { posts } = useLoaderData();\n  return (\n    <ul>\n      {posts.map((p) => (\n        <li key={p.id}>{p.title}</li>\n      ))}\n    </ul>\n  );\n}\n\nconst postsRoute = {\n  path: \"posts\",\n  loader: postsLoader,\n  element: <PostsPage />,\n};"
          },
          {
            "title": "Q7: [ADV] defer + Await + Suspense — slow data non-blocking",
            "explain": "Task:\nloader return defer({ fast: x, slow: promise })\nUI: <Suspense><Await resolve={slow}>...</Await></Suspense>\n\nIn simple words:\nCritical data right away; heavy data streams later. Remix/React Router pattern.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "async function dashboardLoader() {\n  const user = await fakeUser();\n  const postsPromise = fakePosts();\n  return defer({ user, posts: postsPromise });\n}\n\nfunction DashboardDeferred() {\n  const { user, posts } = useLoaderData();\n  return (\n    <div>\n      <p>Hi {user.name}</p>\n      <Suspense fallback={<p>Loading posts…</p>}>\n        <Await resolve={posts}>\n          {(list) => (\n            <ul>\n              {list.map((p) => (\n                <li key={p.id}>{p.title}</li>\n              ))}\n            </ul>\n          )}\n        </Await>\n      </Suspense>\n    </div>\n  );\n}"
          },
          {
            "title": "Q8: Actions — Form method=\"post\" + useActionData",
            "explain": "Task:\naction async ({ request }) { const fd = await request.formData(); ... return json({ ok }); }\n<Form method=\"post\"> + const result = useActionData()\n\nIn simple words:\nMutation at route level — automatic revalidation. Less manual onSubmit fetch.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "async function contactAction({ request }) {\n  const fd = await request.formData();\n  const email = fd.get(\"email\");\n  if (!email) return json({ error: \"Email required\" }, { status: 400 });\n  return json({ ok: true, message: \"Sent!\" });\n}\n\nfunction ContactPage() {\n  const actionData = useActionData();\n  return (\n    <Form method=\"post\">\n      <input name=\"email\" type=\"email\" />\n      <button type=\"submit\">Send</button>\n      {actionData?.error && <p role=\"alert\">{actionData.error}</p>}\n      {actionData?.ok && <p>{actionData.message}</p>}\n    </Form>\n  );\n}"
          },
          {
            "title": "Q9: useNavigation — pending / submitting UI",
            "explain": "Task:\nconst nav = useNavigation(); nav.state === 'loading' | 'submitting'\n\nIn simple words:\nGlobal spinner or form disabled while navigation is in progress.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function GlobalPendingBar() {\n  const navigation = useNavigation();\n  const busy =\n    navigation.state === \"loading\" || navigation.state === \"submitting\";\n  if (!busy) return null;\n  return <div aria-live=\"polite\">Loading…</div>;\n}"
          },
          {
            "title": "Q10: errorElement + useRouteError",
            "explain": "Task:\nAdd errorElement on route. Loader throw → boundary. useRouteError() detail.\n\nIn simple words:\nLess try/catch in every component. Route-level error UI stays consistent.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function RootError() {\n  const error = useRouteError();\n  if (isRouteErrorResponse(error)) {\n    return (\n      <div>\n        <h1>{error.status}</h1>\n        <p>{error.statusText}</p>\n        <p>{error.data?.message}</p>\n      </div>\n    );\n  }\n  return (\n    <div>\n      <h1>Oops</h1>\n      <p>{error?.message ?? \"Unknown error\"}</p>\n    </div>\n  );\n}\n\nasync function riskyLoader() {\n  throw json({ message: \"Not found\" }, { status: 404 });\n}"
          },
          {
            "title": "Q11: [MID] Protected routes — loader redirect",
            "explain": "Task:\nToken check in loader → throw redirect('/login') or return null + wrapper\n\nIn simple words:\nBlock before render — less flash of protected content.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "async function protectedLoader() {\n  const user = await getSessionUser();\n  if (!user) throw redirect(\"/login\");\n  return json({ user });\n}\n\nasync function getSessionUser() {\n  return null; // teaching stub\n}"
          },
          {
            "title": "Q12: Auth context + RequireAuth wrapper (component guard)",
            "explain": "Task:\nAuthProvider + RequireAuth wrap children. Both loader and component patterns.\n\nIn simple words:\nClient-only auth state → wrapper is OK. SSR/hydration → loader is better.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const AuthContext = createContext(null);\n\nfunction AuthProvider({ children }) {\n  const [user, setUser] = useState(null);\n  return (\n    <AuthContext.Provider value={{ user, setUser }}>\n      {children}\n    </AuthContext.Provider>\n  );\n}\n\nfunction useAuth() {\n  return useContext(AuthContext);\n}\n\nfunction RequireAuth({ children }) {\n  const { user } = useAuth();\n  if (!user) return <Navigate to=\"/login\" replace />;\n  return children;\n}\n\nfunction ProtectedPage() {\n  return (\n    <RequireAuth>\n      <h1>Secret</h1>\n    </RequireAuth>\n  );\n}"
          },
          {
            "title": "Q13: Outlet context — parent → deep child data without prop drilling",
            "explain": "Task:\nParent: <Outlet context={{ user }} />\nChild: const { user } = useOutletContext()\n\nIn simple words:\nLayout has loader data — pass to nested tabs via context. Do not overuse.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function ParentWithContext() {\n  const { user } = useLoaderData();\n  return <Outlet context={{ user }} />;\n}\n\nfunction ChildUsesContext() {\n  const { user } = useOutletContext();\n  return <p>{user?.name}</p>;\n}"
          },
          {
            "title": "Q14: [MID] Search params advanced — multiple keys + setters",
            "explain": "Task:\nuseSearchParams(); setParams(prev => { prev.set('sort','name'); return prev; })\n\nIn simple words:\nFilters and pagination in URL — share/bookmark. Object shorthand works too.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function ProductFilters() {\n  const [params, setParams] = useSearchParams();\n  const q = params.get(\"q\") ?? \"\";\n  const sort = params.get(\"sort\") ?? \"newest\";\n\n  function updateSort(next) {\n    setParams((prev) => {\n      prev.set(\"sort\", next);\n      return prev;\n    });\n  }\n\n  return (\n    <div>\n      <input\n        value={q}\n        onChange={(e) =>\n          setParams({ q: e.target.value, sort })\n        }\n      />\n      <button type=\"button\" onClick={() => updateSort(\"price\")}>\n        Sort price\n      </button>\n    </div>\n  );\n}"
          },
          {
            "title": "Q15: Relative links — to=\"..\" / to=\"settings\"",
            "explain": "Task:\nLink to=\"cart\" relative current route. \"..\" parent up.\n\nIn simple words:\nIn nested routes, do not hardcode full paths. Safe when routes change.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function OrderDetailLinks() {\n  return (\n    <>\n      <Link to=\"..\">Back to orders</Link>\n      <Link to=\"invoice\">Invoice</Link>\n    </>\n  );\n}"
          },
          {
            "title": "Q16: useMatches + handle — breadcrumbs from route config",
            "explain": "Task:\nRoute handle: { crumb: (data) => 'Posts' }. useMatches() map crumbs.\n\nIn simple words:\nDerive meta UI from route tree — fewer duplicate titles.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function Breadcrumbs() {\n  const matches = useMatches();\n  const crumbs = matches\n    .filter((m) => m.handle?.crumb)\n    .map((m) => ({\n      label: m.handle.crumb(m.data),\n      pathname: m.pathname,\n    }));\n\n  return (\n    <nav aria-label=\"Breadcrumb\">\n      <ol>\n        {crumbs.map((c, i) => (\n          <li key={c.pathname}>\n            {i > 0 && \" / \"}\n            <Link to={c.pathname}>{c.label}</Link>\n          </li>\n        ))}\n      </ol>\n    </nav>\n  );\n}\n\n// Example route config snippet:\n// { path: 'posts', loader: postsLoader, handle: { crumb: () => 'Posts' }, element: <PostsPage /> }"
          },
          {
            "title": "Q17: Lazy route modules — code split per route",
            "explain": "Task:\nconst Admin = lazy(() => import('./Admin')); route element: <Suspense><Admin/></Suspense>\n\nIn simple words:\nSmaller bundle — admin tab loads when route is hit. Router lazy + React.lazy pair.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const LazyAdmin = lazy(() =>\n  Promise.resolve({ default: () => <h1>Admin panel</h1> })\n);\n\nfunction LazyAdminRoute() {\n  return (\n    <Suspense fallback={<p>Loading admin…</p>}>\n      <LazyAdmin />\n    </Suspense>\n  );\n}"
          },
          {
            "title": "Q18: Scroll restoration note",
            "explain": "Task:\nRouterProvider scroll restoration default on. Custom: ScrollRestoration component (RR 6.4+).\n\nIn simple words:\nIn SPA, back button scroll position or top — product decision. Document it.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "// import { ScrollRestoration } from 'react-router-dom';\n// Root layout: <ScrollRestoration getKey={(location) => location.pathname} />"
          },
          {
            "title": "Q19: Splat routes — catch-all *",
            "explain": "Task:\npath: 'docs/*' — rest of URL in params. splat / * param name depends on version.\n\nIn simple words:\nCMS pages / file paths. 404 child or splat handler.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function DocsCatchAll() {\n  const { \"*\": splat } = useParams();\n  return <p>Doc path: {splat}</p>;\n}\n\n// { path: 'docs/*', loader: ({ params }) => json({ '*': params['*'] }), element: <DocsCatchAll /> }\n// { path: '*', element: <NotFound /> } — global 404 last"
          },
          {
            "title": "Q20: handle export for breadcrumbs / meta (route module pattern)",
            "explain": "Task:\nColocate: export async function loader() {}; export const handle = { crumb };\n\nIn simple words:\nRoute module is one file — loader, action, component, meta handle all together.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export const postsRouteHandle = {\n  crumb: (data) => data?.posts?.[0]?.title ?? \"Posts\",\n};"
          },
          {
            "title": "Q21: navigate relative — useNavigate({ relative: 'path' })",
            "explain": "Task:\nnavigate('..', { relative: 'path' }) or navigate('../sibling')\n\nIn simple words:\nProgrammatic same as relative Link. Form success → navigate('..').",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function useGoUp() {\n  const navigate = useNavigate();\n  return () => navigate(\"..\", { relative: \"path\" });\n}"
          },
          {
            "title": "Q22: [ADV] useBlocker — dirty form \"Leave page?\"",
            "explain": "Task:\nconst blocker = useBlocker(whenDirty); blocker.state === 'blocked' → confirm UI\n\nIn simple words:\nUnsaved changes guard. UX: custom modal + blocker.proceed / reset.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function DirtyFormBlocker() {\n  const [dirty, setDirty] = useState(false);\n  const blocker = useBlocker(dirty);\n\n  return (\n    <div>\n      <input onChange={() => setDirty(true)} placeholder=\"Type to dirty\" />\n      {blocker.state === \"blocked\" && (\n        <div role=\"dialog\">\n          <p>Unsaved changes. Leave?</p>\n          <button type=\"button\" onClick={() => blocker.proceed()}>\n            Leave\n          </button>\n          <button type=\"button\" onClick={() => blocker.reset()}>\n            Stay\n          </button>\n        </div>\n      )}\n    </div>\n  );\n}"
          },
          {
            "title": "Q23: useFetcher — submit/load without navigation",
            "explain": "Task:\nconst fetcher = useFetcher(); fetcher.submit(formData, { method: 'post', action: '/vote' })\n\nIn simple words:\nLike button, optimistic UI — page URL same. fetcher.state pending.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function LikeButton({ postId }) {\n  const fetcher = useFetcher();\n  const liked = fetcher.formData?.get(\"liked\") === \"true\";\n\n  return (\n    <fetcher.Form method=\"post\" action={`/posts/${postId}/like`}>\n      <input type=\"hidden\" name=\"liked\" value={String(!liked)} />\n      <button type=\"submit\" disabled={fetcher.state !== \"idle\"}>\n        {liked ? \"Unlike\" : \"Like\"}\n      </button>\n    </fetcher.Form>\n  );\n}"
          },
          {
            "title": "Q24: [ADV] Parallel loaders (Remix-style) — sibling routes",
            "explain": "Task:\nParent + child loaders run in parallel when sibling branches navigate.\n\nIn simple words:\nData router runs same-level loaders together — be aware of parent/child waterfall when designing.\nHeavy child → defer; siblings independent → parallel benefit.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const parallelRouter = createBrowserRouter([\n  {\n    path: \"/\",\n    loader: async () => json({ layout: await fakeUser() }),\n    element: <RootLayout />,\n    children: [\n      {\n        path: \"feed\",\n        loader: async () => json({ posts: await fakePosts() }),\n        element: <PostsPage />,\n      },\n      {\n        path: \"sidebar\",\n        loader: async () => json({ widgets: [] }),\n        element: <SidebarWidgets />,\n      },\n    ],\n  },\n]);\n\nfunction SidebarWidgets() {\n  const { widgets } = useLoaderData();\n  return <aside>{widgets.length} widgets</aside>;\n}"
          },
          {
            "title": "Q25: [MID] Interview quick hits — data router vs classic",
            "explain": "Task:\nloader vs useEffect; action vs fetch POST; when useFetcher vs Form navigate.\n\nIn simple words:\nClassic RR = client-only routing. Data APIs = data coupling + pending states.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const routingInterviewNotes = {\n  loaderVsEffect:\n    \"Loader runs on navigation before paint; avoids loading spinner flash + race on fast nav.\",\n  actionVsOnSubmit:\n    \"Action tied to route; automatic revalidation of loaders on that route tree.\",\n  redirectVsNavigate:\n    \"throw redirect() in loader/action — server-style; Navigate component client guard.\",\n  useBlockerCaveat:\n    \"History API limits; not for hard browser close — beforeunload alag.\",\n  v7Note: \"React Router 7 merges Remix; data APIs stay core mental model.\",\n};\n\n// --- createRoutesFromElements alternative (JSX config) ---\nconst jsxRouter = createBrowserRouter(\n  createRoutesFromElements(\n    <Route path=\"/\" element={<RootLayout />} errorElement={<RootError />}>\n      <Route index element={<HomePage />} />\n      <Route path=\"about\" element={<AboutPage />} />\n      <Route path=\"posts\" loader={postsLoader} element={<PostsPage />} />\n      <Route path=\"contact\" action={contactAction} element={<ContactPage />} />\n    </Route>\n  )\n);\n\nfunction AppWithJsxRouter() {\n  return <RouterProvider router={jsxRouter} />;\n}"
          }
        ]
      },
      {
        "file": "45_ConcurrentTransitions.jsx",
        "title": "45 — Concurrent / Transitions",
        "kya": "Concurrent React = interrupt the UI to show urgent work first.",
        "detail": "45 — Concurrent React: useTransition, useDeferredValue, startTransition\nLevel: MID–ADV  |  Sequence: after 24 (perf), then this\n\nSIMPLE: Concurrent React = interrupt the UI to show urgent work first.\nKeep typing snappy; heavy filter/list updates in the background — user feels no lag.\nuseTransition / startTransition = \"this update is non-urgent\".\nuseDeferredValue = show a slightly older version of the value when the new one is slow.\n\nWHY: Big lists, tab switches, search — don't freeze the input.\nINTERVIEW: urgent vs transition; transition vs deferred; flushSync contrast;\ntransitions don't increase speed — they improve responsiveness.\nUse in Vite/React 19 project — teaching file.",
        "intro": "45 — Concurrent React: useTransition, useDeferredValue, startTransition\nLevel: MID–ADV  |  Sequence: after 24 (perf), then this\n\nSIMPLE: Concurrent React = interrupt the UI to show urgent work first.\nKeep typing snappy; heavy filter/list updates in the background — user feels no lag.\nuseTransition / startTransition = \"this update is non-urgent\".\nuseDeferredValue = show a slightly older version of the value when the new one is slow.\n\nWHY: Big lists, tab switches, search — don't freeze the input.\nINTERVIEW: urgent vs transition; transition vs deferred; flushSync contrast;\ntransitions don't increase speed — they improve responsiveness.\nUse in Vite/React 19 project — teaching file.",
        "questions": [
          {
            "title": "Q1: useTransition — isPending + startTransition basics",
            "explain": "Task:\nWrap non-urgent state updates with the hook; show pending UI.\n\nIn simple words:\n[isPending, startTransition] = useTransition().\nstartTransition(() => setHeavy(...)) — React handles urgent things like input first.\nisPending is true when the transition render is not complete yet.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function SearchWithTransition({ allItems }) {\n  const [query, setQuery] = useState(\"\");\n  const [filtered, setFiltered] = useState(allItems);\n  const [isPending, startTransition] = useTransition();\n\n  function onChange(e) {\n    const q = e.target.value;\n    setQuery(q); // urgent — input updates immediately\n    startTransition(() => {\n      setFiltered(allItems.filter((item) => item.includes(q))); // non-urgent\n    });\n  }\n\n  return (\n    <div>\n      <input value={query} onChange={onChange} placeholder=\"Search...\" />\n      {isPending && <span aria-live=\"polite\">Updating…</span>}\n      <ul>\n        {filtered.map((item) => (\n          <li key={item}>{item}</li>\n        ))}\n      </ul>\n    </div>\n  );\n}"
          },
          {
            "title": "Q2: startTransition import from 'react' (non-hook)",
            "explain": "Task:\nMark a transition outside the component / in a callback without a hook.\n\nIn simple words:\nuseTransition only inside a component. startTransition() anywhere —\nevent handler, utility, inside setTimeout.\nSame priority marking; you need the hook for isPending.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "let externalItems = [\"apple\", \"banana\", \"cherry\"];\n\nexport function applyFilterOutside(setFiltered, q) {\n  startTransition(() => {\n    setFiltered(externalItems.filter((x) => x.includes(q)));\n  });\n}\n\nexport function ExternalTransitionDemo() {\n  const [q, setQ] = useState(\"\");\n  const [list, setList] = useState(externalItems);\n  return (\n    <input\n      value={q}\n      onChange={(e) => {\n        const v = e.target.value;\n        setQ(v);\n        applyFilterOutside(setList, v);\n      }}\n    />\n  );\n}"
          },
          {
            "title": "Q3: useDeferredValue — defer slow re-render",
            "explain": "Task:\nKeep fast input state; feed the heavy child with a deferred copy.\n\nIn simple words:\nconst deferredQuery = useDeferredValue(query).\nWhen query changes, deferred can lag slightly behind —\none more render with the old value (stale UI briefly OK).\nPass deferred prop to child — less need for startTransition in parent.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function SlowList({ query }) {\n  const items = useMemo(() => {\n    const big = Array.from({ length: 8000 }, (_, i) => `row-${i}`);\n    return big.filter((r) => r.includes(query));\n  }, [query]);\n  return <p>{items.length} matches</p>;\n}\n\nexport function DeferredSearch() {\n  const [query, setQuery] = useState(\"\");\n  const deferredQuery = useDeferredValue(query);\n  const isStale = query !== deferredQuery;\n\n  return (\n    <div style={{ opacity: isStale ? 0.6 : 1 }}>\n      <input value={query} onChange={(e) => setQuery(e.target.value)} />\n      <SlowList query={deferredQuery} />\n    </div>\n  );\n}"
          },
          {
            "title": "Q4: Transition vs useDeferredValue — when to use which?",
            "explain": "Task:\nBoth do non-urgent work; different APIs — choose by shape of problem.\n\nIn simple words:\nuseTransition: you wrap setState yourself; you get isPending;\nmultiple state updates in one transition.\nuseDeferredValue: defer one value; pass to child as prop; \"stale\" visual is easy.\nRule of thumb: you control state updates → transition; prop/value lag → deferred.\nBoth together too (Q19).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const transitionVsDeferred =\n  \"Transition = mark updates non-urgent + pending flag. Deferred = lag behind on a value.\";"
          },
          {
            "title": "Q5: Urgent vs non-urgent updates",
            "explain": "Task:\nTyping/click/scroll urgent; filter/chart/route change non-urgent.\n\nIn simple words:\nUrgent = user needs instant feedback (controlled input value).\nNon-urgent = a little delay OK (10k list filter, tab content swap).\nWrong split = typing also in transition → input feels sluggish.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function UrgentNonUrgentSplit() {\n  const [text, setText] = useState(\"\");\n  const [count, setCount] = useState(0);\n  const [pending, startTransition] = useTransition();\n\n  function onType(e) {\n    setText(e.target.value); // urgent\n    startTransition(() => {\n      setCount(e.target.value.length); // non-urgent stats\n    });\n  }\n\n  return (\n    <>\n      <input value={text} onChange={onType} />\n      <small>{pending ? \"…\" : `${count} chars`}</small>\n    </>\n  );\n}"
          },
          {
            "title": "Q6: Search filter demo — full pattern",
            "explain": "Task:\nInput urgent; filter + sort in transition; pending + stale styling.\n\nIn simple words:\nClassic interview demo. Expensive work inside the transition.\nOptional: results opacity when pending.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const CATALOG = Array.from({ length: 5000 }, (_, i) => `product-${i}`);\n\nexport function ProductSearch() {\n  const [q, setQ] = useState(\"\");\n  const [results, setResults] = useState(CATALOG);\n  const [isPending, startTransition] = useTransition();\n\n  function handleSearch(value) {\n    setQ(value);\n    startTransition(() => {\n      const next = CATALOG.filter((p) => p.includes(value)).sort();\n      setResults(next);\n    });\n  }\n\n  return (\n    <section>\n      <input value={q} onChange={(e) => handleSearch(e.target.value)} />\n      <div style={{ opacity: isPending ? 0.5 : 1 }}>\n        Showing {results.length} items\n      </div>\n    </section>\n  );\n}"
          },
          {
            "title": "Q7: Tab switch with deferred content",
            "explain": "Task:\nTab click urgent; render heavy panel with deferred value.\n\nIn simple words:\ntab state changes instantly — highlight stays snappy.\ndeferredTab = useDeferredValue(tab) for slow panel render.\nOld tab content shows briefly — acceptable for transitions.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const TAB_CONTENT = {\n  home: \"Light home\",\n  reports: Array.from({ length: 3000 }, (_, i) => `report-${i}`).join(\" \"),\n  settings: \"Settings form\",\n};\n\nfunction HeavyPanel({ tab }) {\n  const body = useMemo(() => TAB_CONTENT[tab] ?? \"\", [tab]);\n  return <div className=\"panel\">{typeof body === \"string\" ? body.slice(0, 200) : body}</div>;\n}\n\nexport function DeferredTabs() {\n  const [tab, setTab] = useState(\"home\");\n  const deferredTab = useDeferredValue(tab);\n  const stale = tab !== deferredTab;\n\n  return (\n    <div>\n      {[\"home\", \"reports\", \"settings\"].map((t) => (\n        <button key={t} onClick={() => setTab(t)} aria-pressed={tab === t}>\n          {t}\n        </button>\n      ))}\n      <div style={{ opacity: stale ? 0.5 : 1 }}>\n        <HeavyPanel tab={deferredTab} />\n      </div>\n    </div>\n  );\n}"
          },
          {
            "title": "Q8: Suspense + transition",
            "explain": "Task:\nRoute/tab change in transition; Suspense fallback during suspend.\n\nIn simple words:\nTransition updates make Suspense boundaries interruptible —\nold UI keeps showing while new chunk/data loads.\nstartTransition(() => setTab('slow')) + <Suspense fallback=...>.\nWithout transition, suspend = jarring replace.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function LazyChunk() {\n  // teaching: imagine React.lazy component suspending here\n  return <p>Loaded chunk content</p>;\n}\n\nexport function SuspenseTransitionTabs() {\n  const [tab, setTab] = useState(\"a\");\n  const [pending, startTransition] = useTransition();\n\n  return (\n    <div>\n      <button\n        onClick={() =>\n          startTransition(() => {\n            setTab(\"b\");\n          })\n        }\n      >\n        Go slow tab {pending && \"…\"}\n      </button>\n      <Suspense fallback={<p>Loading tab…</p>}>\n        <LazyChunk key={tab} />\n      </Suspense>\n    </div>\n  );\n}"
          },
          {
            "title": "Q9: useTransition with router-ish navigate idea",
            "explain": "Task:\nProgrammatic navigation non-urgent mark — pending spinner on link.\n\nIn simple words:\nNo direct integration in React Router; pattern:\nstartTransition(() => navigate('/dashboard')).\nisPending for nav bar loading. Urgent: modal close; non-urgent: page swap.\nSame mental model for SPA route changes.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function RouterishNavigate({ navigateFn }) {\n  const [isPending, startTransition] = useTransition();\n\n  function goDashboard() {\n    startTransition(() => {\n      navigateFn(\"/dashboard\"); // pretend useNavigate()\n    });\n  }\n\n  return (\n    <button onClick={goDashboard} disabled={isPending}>\n      {isPending ? \"Navigating…\" : \"Dashboard\"}\n    </button>\n  );\n}"
          },
          {
            "title": "Q10: isPending UI patterns",
            "explain": "Task:\nSpinner, opacity, disabled button, aria-busy — consistent pending UX.\n\nIn simple words:\n1) Inline \"Updating…\" text (accessible aria-live).\n2) Results opacity 0.5 when pending.\n3) Submit/nav button disabled + label change.\n4) Skeleton same layout — less layout shift.\nisPending false when transition has committed (not same as data fetch).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function PendingPatterns() {\n  const [isPending, startTransition] = useTransition();\n  const [page, setPage] = useState(1);\n\n  return (\n    <div aria-busy={isPending}>\n      <button\n        disabled={isPending}\n        onClick={() => startTransition(() => setPage((p) => p + 1))}\n      >\n        {isPending ? \"Loading page…\" : \"Next page\"}\n      </button>\n      <article style={{ opacity: isPending ? 0.6 : 1 }}>Page {page}</article>\n    </div>\n  );\n}"
          },
          {
            "title": "Q11: Concurrent features history (React 18+)",
            "explain": "Task:\nUnderstand the timeline — interview \"since when\" questions.\n\nIn simple words:\nReact 18 (2022): createRoot, automatic batching, transitions, Suspense improvements.\nuseTransition / useDeferredValue / startTransition public API.\nReact 19: Actions often auto-transition; still same concurrent renderer core.\nNo legacy createRoot = no concurrent features fully.\nFiber (16+) laid the foundation; 18 made concurrent rendering user-facing.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const concurrentHistory = [\n  \"React 16 Fiber — foundation\",\n  \"React 18 — createRoot, transitions, deferred values\",\n  \"React 19 — Actions wrap updates in transition by default (forms)\",\n];"
          },
          {
            "title": "Q12: Tearing — conceptual note",
            "explain": "Task:\nExternal store + concurrent render = inconsistent UI briefly — understand the concept.\n\nIn simple words:\nTearing = one part of screen has old data, another new (same render cycle mismatch).\nReact state/context generally safe. Problem: mutable external store without sync.\nuseSyncExternalStore (18) fix pattern for third-party stores.\nTransitions can make tearing more visible if store is not synced.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const tearingNote =\n  \"Concurrent render can pause/resume; external mutable stores need useSyncExternalStore to avoid torn UI.\";"
          },
          {
            "title": "Q13: flushSync — when NOT concurrent",
            "explain": "Task:\nSometimes need instant DOM sync — flushSync forces urgent.\n\nIn simple words:\nflushSync(() => setState()) — React renders + commits now (sync).\nUse rare: third-party lib needs to measure DOM immediately, focus after insert.\nOveruse = concurrent benefits kill + perf hit.\nOpposite of transition — \"don't wait for this\".",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function MeasureAfterUpdate() {\n  const [open, setOpen] = useState(false);\n  const ref = useRef(null);\n\n  function toggle() {\n    flushSync(() => setOpen(true));\n    // DOM is now updated — measure/focus safe\n    ref.current?.focus();\n  }\n\n  return open ? <input ref={ref} /> : <button onClick={toggle}>Open</button>;\n}"
          },
          {
            "title": "Q14: startTransition in event handler vs setTimeout",
            "explain": "Task:\nWorks in both places; preferred in event; also valid in setTimeout.\n\nIn simple words:\nEvent handler: startTransition(() => setX) — in React batching context.\nsetTimeout: callback is separate task — still wrap with startTransition\nso resulting setState has transition priority.\nTrap: setTimeout without transition = not low priority, just runs later.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function EventVsTimeout() {\n  const [n, setN] = useState(0);\n  const [isPending, startTransition] = useTransition();\n\n  function onClickEvent() {\n    startTransition(() => setN((x) => x + 1));\n  }\n\n  function onClickDelayed() {\n    setTimeout(() => {\n      startTransition(() => setN((x) => x + 100));\n    }, 0);\n  }\n\n  return (\n    <>\n      <button onClick={onClickEvent}>+1 transition</button>\n      <button onClick={onClickDelayed}>+100 after timeout</button>\n      {isPending && \"pending\"} {n}\n    </>\n  );\n}"
          },
          {
            "title": "Q15: Nested transitions",
            "explain": "Task:\nTransition inside transition — understand outer pending behavior.\n\nIn simple words:\nNested startTransition usually merges into outer transition —\none transition track (implementation detail, behavior: non-urgent).\nDon't think deep nesting — one meaningful transition boundary is enough.\nisPending true if any transition in tree pending (same hook instance).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function NestedTransitions() {\n  const [a, setA] = useState(0);\n  const [b, setB] = useState(0);\n  const [pending, startTransition] = useTransition();\n\n  function run() {\n    startTransition(() => {\n      setA(1);\n      startTransition(() => {\n        setB(2);\n      });\n    });\n  }\n\n  return (\n    <button onClick={run}>\n      {pending ? \"…\" : `${a}-${b}`}\n    </button>\n  );\n}"
          },
          {
            "title": "Q16: Performance myth — transitions don't increase speed",
            "explain": "Task:\nInterview trap: \"transition made filter fast\" — wrong.\n\nIn simple words:\nSame CPU work happens — just different scheduling: interrupt for urgent.\n10k filter is still 10k filter — virtualize / Web Worker is separate topic.\nTransition = responsiveness (input smooth), not shorter Big-O.\nMeasure: INP, typing latency — not total filter ms alone.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const perfTruth =\n  \"Transitions improve perceived responsiveness by prioritizing urgent updates; they do not reduce total computation.\";"
          },
          {
            "title": "Q17: Interview traps (common wrong answers)",
            "explain": "Task:\nRemember wrong claims so you avoid them.\n\nIn simple words:\nTrap 1: \"Every setState in transition\" — input sluggish.\nTrap 2: \"useDeferredValue same as debounce\" — no fixed delay; React scheduler.\nTrap 3: \"isPending = fetch loading\" — only transition render pending.\nTrap 4: \"Concurrent = parallel threads\" — mostly cooperative scheduling in JS.\nTrap 5: \"SSR transitions matter the same\" — mostly client hydration/interaction.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export const interviewTraps = [\n  \"Don't wrap typing state in transition\",\n  \"Deferred ≠ debounce (no fixed ms)\",\n  \"isPending ≠ useFetch loading\",\n  \"Concurrent ≠ multithreading by default\",\n];"
          },
          {
            "title": "Q18: React 19 Actions — automatic transitions note",
            "explain": "Task:\nForm actions / useActionState updates often already transition priority.\n\nIn simple words:\nIn React 19, action dispatch updates wrap in transition —\nform pending state + UI stays responsive.\nFor old onSubmit + manual setState, consider startTransition yourself.\nSee files 29–31 for Actions detail. Manual transition still valid for non-form UI.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "async function saveAction(prev, formData) {\n  await new Promise((r) => setTimeout(r, 300));\n  return { ok: true, name: formData.get(\"name\") };\n}\n\n// teaching note: useActionState(saveAction) in React 19 auto-transitions updates"
          },
          {
            "title": "Q19: useDeferredValue + memo list combo",
            "explain": "Task:\nMemoized child + deferred prop — fewer unnecessary re-renders.\n\nIn simple words:\nconst MemoRows = memo(Rows).\n<MemoRows query={deferredQuery} /> — when deferred same, memo skips.\nInput updates fast; child updates when deferred catches up.\nPair with useMemo inside child for heavy derive.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const MemoRows = memo(function Rows({ query, rows }) {\n  const visible = useMemo(\n    () => rows.filter((r) => r.includes(query)),\n    [rows, query]\n  );\n  return <ul>{visible.slice(0, 50).map((r) => <li key={r}>{r}</li>)}</ul>;\n});\n\nexport function DeferredMemoList({ rows }) {\n  const [q, setQ] = useState(\"\");\n  const deferredQ = useDeferredValue(q);\n  return (\n    <>\n      <input value={q} onChange={(e) => setQ(e.target.value)} />\n      <MemoRows query={deferredQ} rows={rows} />\n    </>\n  );\n}"
          },
          {
            "title": "Q20: useTransition error handling",
            "explain": "Task:\nThrow/error inside transition — Error Boundary / recover pattern.\n\nIn simple words:\nRender error — Error Boundary can still catch after transition.\nEvent/async error not bound to transition — try/catch yourself.\nRetry: error boundary reset + state rollback manually.\nSuspense + error boundary are separate layers (file 20, 21).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "function BuggyTransitionChild({ crash }) {\n  if (crash) throw new Error(\"transition render failed\");\n  return <p>OK</p>;\n}\n\nexport function TransitionErrorDemo() {\n  const [crash, setCrash] = useState(false);\n  const [pending, startTransition] = useTransition();\n\n  return (\n    <>\n      <button\n        onClick={() =>\n          startTransition(() => {\n            setCrash(true);\n          })\n        }\n      >\n        Trigger {pending && \"…\"}\n      </button>\n      <BuggyTransitionChild crash={crash} />\n    </>\n  );\n}"
          },
          {
            "title": "Q21: Throttle / debounce vs transition",
            "explain": "Task:\nThree different tools — when to use which.\n\nIn simple words:\nDebounce: fire once after a fixed wait (API search 300ms).\nThrottle: max N calls per window (scroll handler).\nTransition: React render priority — no fixed timer; scheduler decides.\nDebounce for API calls; transition/deferred for heavy UI render.\nCombine: debounce fetch + transition for local filter OK.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const compareSchedule =\n  \"Debounce/throttle = rate-limit events. Transition = prioritize which React updates render first.\";"
          },
          {
            "title": "Q22: Practical checklist — when to use",
            "explain": "Task:\nSay the decision tree in an interview.\n\nIn simple words:\n✓ Heavy list/filter on typing → transition or deferred\n✓ Tab/route swap with slow child → transition + Suspense\n✓ Need pending UI flag → useTransition\n✓ Value naturally flows as prop → useDeferredValue\n✗ Simple forms / few items — YAGNI\n✗ Network delay — use fetch pending, not isPending alone\n✗ Need exact delay — debounce, not deferred",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export const transitionChecklist = {\n  useTransition: \"you control multiple setStates + want isPending\",\n  useDeferredValue: \"single value lags; pass to memo child\",\n  neither: \"small tree, no jank measured\",\n  alsoConsider: \"virtualize list, useMemo, Web Worker for CPU\",\n};"
          },
          {
            "title": "Q23: Multiple setStates in one transition",
            "explain": "Task:\nMany updates in one startTransition — one pending, batched non-urgent.\n\nIn simple words:\nstartTransition(() => { setA(); setB(); setC(); }) — all non-urgent batch.\nKeep urgent input separate outside transition.\nFunctional updaters safe inside transition.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function MultiStateTransition() {\n  const [query, setQuery] = useState(\"\");\n  const [page, setPage] = useState(1);\n  const [sort, setSort] = useState(\"asc\");\n  const [pending, startTransition] = useTransition();\n\n  function applyFilters(q) {\n    setQuery(q);\n    startTransition(() => {\n      setPage(1);\n      setSort(q.length > 3 ? \"desc\" : \"asc\");\n    });\n  }\n\n  return (\n    <div>\n      <input onChange={(e) => applyFilters(e.target.value)} value={query} />\n      {pending ? \"Applying…\" : `${sort} p${page}`}\n    </div>\n  );\n}"
          },
          {
            "title": "Q24: Stale UI visual — deferred vs pending",
            "explain": "Task:\nstale from query !== deferredQuery; isPending is a separate signal.\n\nIn simple words:\nDeferred: intentionally show old list when new render is busy.\nisPending: transition running — spinner/opacity.\nBoth together: opacity + \"Showing older results\" banner.\nKeep UX honest — user understands data is catching up.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function StaleVisualDemo() {\n  const [q, setQ] = useState(\"\");\n  const deferredQ = useDeferredValue(q);\n  const [pending, startTransition] = useTransition();\n\n  function onChange(e) {\n    const v = e.target.value;\n    setQ(v);\n    startTransition(() => {\n      /* imagine extra state sync */\n    });\n  }\n\n  const stale = q !== deferredQ;\n\n  return (\n    <div>\n      <input value={q} onChange={onChange} />\n      {stale && <p role=\"status\">Results may be outdated…</p>}\n      {pending && <p>Updating…</p>}\n      <SlowList query={deferredQ} />\n    </div>\n  );\n}"
          },
          {
            "title": "Q25: Concurrent rendering + Strict Mode / dev double render",
            "explain": "Task:\nDon't let extra renders in dev confuse transitions while debugging.\n\nIn simple words:\nStrict Mode double invoke in dev — isPending may flicker briefly.\nFocus on production behavior. See transition marked renders in Profiler.\ncreateRoot required — ReactDOM.render legacy concurrent transitions limited.\nTeaching file: React 19 + createRoot assume.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const devNote =\n  \"Strict Mode dev double-mount can make pending states flicker; trust production profiling.\";\n\n// -----------------------------------------------------------------------------\n// Quick revise map\n// 24 perf → 45 transitions → 46 auth/forms → 47 zustand\n// Related: 21 Suspense, 29–31 Actions, 40 Q17 concurrent one-liner\n// -----------------------------------------------------------------------------"
          }
        ]
      },
      {
        "file": "46_AuthAndFormsLibs.jsx",
        "title": "46 — Auth + React Hook Form + Zod",
        "kya": "Auth = who is logged in + protect routes. Token memory/localStorage/",
        "detail": "46 — Auth Patterns + React Hook Form + Zod\nLevel: MID  |  Sequence: first 11 (context), 08 (forms), then this\n\nSIMPLE: Auth = who is logged in + protect routes. Token memory/localStorage/\nhttpOnly cookie — tradeoffs. RHF = forms without re-render on every keystroke;\nZod = schema validation TypeScript-friendly. zodResolver connects both.\n\nWHY: Real apps need login, protected pages, validated forms every day.\nINTERVIEW: token storage XSS; ProtectedRoute; RHF register vs Controller;\nserver errors → setError.\nUse in Vite/React 19 project — teaching file.",
        "intro": "46 — Auth Patterns + React Hook Form + Zod\nLevel: MID  |  Sequence: first 11 (context), 08 (forms), then this\n\nSIMPLE: Auth = who is logged in + protect routes. Token memory/localStorage/\nhttpOnly cookie — tradeoffs. RHF = forms without re-render on every keystroke;\nZod = schema validation TypeScript-friendly. zodResolver connects both.\n\nWHY: Real apps need login, protected pages, validated forms every day.\nINTERVIEW: token storage XSS; ProtectedRoute; RHF register vs Controller;\nserver errors → setError.\nUse in Vite/React 19 project — teaching file.",
        "questions": [
          {
            "title": "Q1: Token in memory vs localStorage — tradeoffs",
            "explain": "Task:\nCompare both storage strategies in interviews.\n\nIn simple words:\nMemory (React state / module var): XSS can steal it if JS can read it,\nbut token is lost on refresh — tab close = logout. Feels more secure in SPA\nif refresh token comes from httpOnly cookie.\nlocalStorage: persist across refresh; XSS = game over (document.cookie/localStorage\nreadable by injected script). Never store refresh token in localStorage in prod\nif XSS risk exists.\nBest prod sketch: access token memory/short-lived; refresh httpOnly Secure cookie.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "let memoryAccessToken = null;\n\nexport function setMemoryToken(token) {\n  memoryAccessToken = token;\n}\n\nexport function getMemoryToken() {\n  return memoryAccessToken;\n}\n\nexport function persistTokenLocal(token) {\n  localStorage.setItem(\"access_token\", token);\n}\n\nexport function readTokenLocal() {\n  return localStorage.getItem(\"access_token\");\n}\n\nconst tokenTradeoffs =\n  \"Memory = lost on refresh, slightly less persistent XSS window. localStorage = persists, XSS steals easily.\";"
          },
          {
            "title": "Q2: AuthContext provider",
            "explain": "Task:\nuser, login, logout, loading — tree-wide auth state.\n\nIn simple words:\ncreateContext + Provider. Value stable via useMemo where possible.\nChildren consume via useAuth(). Real app: fetch /me on bootstrap.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const AuthContext = createContext(null);\n\nexport function AuthProvider({ children }) {\n  const [user, setUser] = useState(null);\n  const [bootstrapping, setBootstrapping] = useState(true);\n\n  // sketch: on mount read token + fetch profile\n  useEffect(() => {\n    const t = readTokenLocal();\n    if (t) {\n      fetch(\"/api/me\", { headers: { Authorization: `Bearer ${t}` } })\n        .then((r) => (r.ok ? r.json() : null))\n        .then((u) => setUser(u))\n        .finally(() => setBootstrapping(false));\n    } else {\n      setBootstrapping(false);\n    }\n  }, []);\n\n  const login = useCallback((profile, token) => {\n    persistTokenLocal(token);\n    setMemoryToken(token);\n    setUser(profile);\n  }, []);\n\n  const logout = useCallback(() => {\n    localStorage.removeItem(\"access_token\");\n    setMemoryToken(null);\n    setUser(null);\n  }, []);\n\n  const value = useMemo(\n    () => ({ user, login, logout, bootstrapping, isAuthenticated: !!user }),\n    [user, login, logout, bootstrapping]\n  );\n\n  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;\n}\n\nexport function useAuth() {\n  const ctx = useContext(AuthContext);\n  if (!ctx) throw new Error(\"useAuth must be inside AuthProvider\");\n  return ctx;\n}"
          },
          {
            "title": "Q3: login / logout flow",
            "explain": "Task:\nCredentials POST → token + user → context update.\n\nIn simple words:\nlogin({ email, password }) async → API → login(profile, token).\nlogout clears storage + context. UI conditional on user.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "async function fakeLoginApi(email, password) {\n  await new Promise((r) => setTimeout(r, 200));\n  if (email === \"a@a.com\" && password === \"pass\") {\n    return { token: \"fake-jwt\", user: { id: 1, email, role: \"user\" } };\n  }\n  throw new Error(\"Invalid credentials\");\n}\n\nexport function LoginLogoutButtons() {\n  const { user, login, logout } = useAuth();\n\n  async function handleLogin() {\n    const { token, user: profile } = await fakeLoginApi(\"a@a.com\", \"pass\");\n    login(profile, token);\n  }\n\n  if (user) {\n    return (\n      <p>\n        Hi {user.email}{\" \"}\n        <button type=\"button\" onClick={logout}>\n          Logout\n        </button>\n      </p>\n    );\n  }\n  return <button type=\"button\" onClick={handleLogin}>Login</button>;\n}"
          },
          {
            "title": "Q4: ProtectedRoute component",
            "explain": "Task:\nNo auth → redirect to login; otherwise render children/outlet.\n\nIn simple words:\nif (!user) return <Navigate to=\"/login\" replace state={{ from: location }} />.\nShow spinner while bootstrapping — avoid flash redirect.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function ProtectedRoute({ children }) {\n  const { isAuthenticated, bootstrapping } = useAuth();\n  const location = useLocation();\n\n  if (bootstrapping) return <p>Checking session…</p>;\n  if (!isAuthenticated) {\n    return <Navigate to=\"/login\" replace state={{ from: location }} />;\n  }\n  return children ?? <Outlet />;\n}"
          },
          {
            "title": "Q5: Attach Authorization header (API client sketch)",
            "explain": "Task:\nAuto attach Bearer token on every fetch.\n\nIn simple words:\nWrapper api.get/post — read token from memory or localStorage and set header.\nOn 401 → refresh flow or logout. Centralize — don't write in every component.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export async function apiFetch(path, options = {}) {\n  const token = getMemoryToken() ?? readTokenLocal();\n  const headers = {\n    ...options.headers,\n    ...(token ? { Authorization: `Bearer ${token}` } : {}),\n  };\n  const res = await fetch(path, { ...options, headers });\n  if (res.status === 401) {\n    // trigger refresh or logout — see Q6\n    throw new Error(\"Unauthorized\");\n  }\n  return res;\n}"
          },
          {
            "title": "Q6: Refresh token sketch",
            "explain": "Task:\nAccess expires → refresh endpoint → new access; fail → logout.\n\nIn simple words:\nRefresh token in httpOnly cookie (server set) — JS cannot read it.\nPOST /auth/refresh credentials:include → new access token JSON.\nQueue: on parallel 401, one refresh, other requests wait.\nStore new access in memory; if refresh rotates, cookie auto updates server side.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "let refreshPromise = null;\n\nexport async function refreshAccessToken() {\n  if (!refreshPromise) {\n    refreshPromise = fetch(\"/auth/refresh\", { method: \"POST\", credentials: \"include\" })\n      .then((r) => {\n        if (!r.ok) throw new Error(\"refresh failed\");\n        return r.json();\n      })\n      .then(({ accessToken }) => {\n        setMemoryToken(accessToken);\n        return accessToken;\n      })\n      .finally(() => {\n        refreshPromise = null;\n      });\n  }\n  return refreshPromise;\n}"
          },
          {
            "title": "Q7: Route guards — role / feature flags",
            "explain": "Task:\nAuthenticated + role check as separate layer.\n\nIn simple words:\nProtectedRoute = logged in. RoleRoute = user.role === 'admin'.\nFeature guard = subscription active. Compose nested routes.\nUnauthorized role → 403 page, don't send to login (already authed).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function RoleRoute({ role, children }) {\n  const { user, isAuthenticated } = useAuth();\n  if (!isAuthenticated) return <Navigate to=\"/login\" replace />;\n  if (user?.role !== role) return <Navigate to=\"/403\" replace />;\n  return children;\n}"
          },
          {
            "title": "Q8: Role-based UI (admin panel toggle)",
            "explain": "Task:\nShow admin-only buttons conditionally on same page.\n\nIn simple words:\nuser?.role === 'admin' && <AdminTools />.\nHiding UI ≠ security — API must authorize too. Client guard is for UX.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function AdminPanel() {\n  const { user } = useAuth();\n  if (user?.role !== \"admin\") return null;\n  return (\n    <section>\n      <h2>Admin</h2>\n      <button type=\"button\">Delete all</button>\n    </section>\n  );\n}"
          },
          {
            "title": "Q9: Redirect after login — location.state.from",
            "explain": "Task:\nIf came from protected redirect, send back to intended URL.\n\nIn simple words:\nLogin page: const from = location.state?.from?.pathname || '/dashboard'.\nnavigate(from, { replace: true }) after success.\nValidate internal paths to avoid open redirect.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function LoginRedirectPage() {\n  const navigate = useNavigate();\n  const location = useLocation();\n  const { login } = useAuth();\n\n  async function onSuccess(profile, token) {\n    login(profile, token);\n    const from = location.state?.from?.pathname ?? \"/dashboard\";\n    const safe = from.startsWith(\"/\") && !from.startsWith(\"//\") ? from : \"/dashboard\";\n    navigate(safe, { replace: true });\n  }\n\n  return (\n    <button type=\"button\" onClick={() => onSuccess({ email: \"a@a.com\", role: \"user\" }, \"t\")}>\n      Login & return\n    </button>\n  );\n}"
          },
          {
            "title": "Q10: Secure httpOnly cookies — comment note",
            "explain": "Task:\nExplain prod token strategy without full backend.\n\nIn simple words:\nSet-Cookie: refresh=...; HttpOnly; Secure; SameSite=Strict.\nBrowser auto sends cookie — JS CANNOT read via document.cookie.\nHard to steal refresh via XSS (access short-lived in memory).\nCSRF: SameSite + anti-CSRF token on POST. SPA + separate API domain = careful CORS.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const httpOnlyNote =\n  \"HttpOnly cookies hide refresh token from JS — preferred over localStorage for long-lived secrets.\";"
          },
          {
            "title": "Q11: XSS token theft note",
            "explain": "Task:\nWhy localStorage is risky — interview security angle.\n\nIn simple words:\nAttacker injected script: localStorage.getItem('access_token') → exfiltrate.\nAny innerHTML/dangerouslySetInnerHTML/eval/third-party script risk.\nMitigate: CSP, sanitize, httpOnly refresh, short access TTL, rotate.\nNever put auth token in URL query (logs/referrer leak).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const xssNote =\n  \"XSS + localStorage token = full account takeover until expiry; prefer HttpOnly refresh + CSP.\";"
          },
          {
            "title": "Q12: useForm basics",
            "explain": "Task:\nCreate form instance — register, handleSubmit, formState.\n\nIn simple words:\nconst { register, handleSubmit, formState } = useForm({ defaultValues }).\nUncontrolled-by-default — read DOM via refs; fewer re-renders vs pure controlled.\nmode: 'onBlur' | 'onChange' validation timing.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function SimpleRhfForm() {\n  const {\n    register,\n    handleSubmit,\n    formState: { errors, isSubmitting },\n  } = useForm({\n    defaultValues: { title: \"\" },\n  });\n\n  async function onSubmit(data) {\n    await new Promise((r) => setTimeout(r, 300));\n    console.log(data);\n  }\n\n  return (\n    <form onSubmit={handleSubmit(onSubmit)}>\n      <input {...register(\"title\", { required: \"Title required\" })} />\n      {errors.title && <span>{errors.title.message}</span>}\n      <button disabled={isSubmitting}>{isSubmitting ? \"Saving…\" : \"Save\"}</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q13: register — wiring native inputs",
            "explain": "Task:\nspread register('fieldName', rules) on input/select/textarea.\n\nIn simple words:\nregister returns { name, ref, onChange, onBlur }. name attribute auto.\nValidation rules inline or via resolver. defaultValues match field names.\nCheckbox: register('agree') — value boolean via RHF v7 patterns.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function RegisterDemo() {\n  const { register, handleSubmit } = useForm({\n    defaultValues: { email: \"\", agree: false },\n  });\n  return (\n    <form onSubmit={handleSubmit(console.log)}>\n      <input {...register(\"email\", { required: true })} type=\"email\" />\n      <label>\n        <input type=\"checkbox\" {...register(\"agree\")} /> I agree\n      </label>\n      <button type=\"submit\">Go</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q14: handleSubmit — valid data callback",
            "explain": "Task:\nNo callback on invalid; async OK on valid.\n\nIn simple words:\nhandleSubmit(onValid, onInvalid). preventDefault automatic.\nCatch async submit errors yourself — RHF resets isSubmitting.\nDon't call e.preventDefault manually — wrap with handleSubmit.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function HandleSubmitDemo() {\n  const { register, handleSubmit } = useForm();\n\n  function onValid(data) {\n    console.log(\"valid\", data);\n  }\n  function onInvalid(errs) {\n    console.log(\"invalid\", errs);\n  }\n\n  return (\n    <form onSubmit={handleSubmit(onValid, onInvalid)}>\n      <input {...register(\"name\", { required: \"Name needed\" })} />\n      <button type=\"submit\">Submit</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q15: formState — errors, isSubmitting, isDirty, touchedFields",
            "explain": "Task:\nDestructure formState for UI feedback.\n\nIn simple words:\nerrors.field?.message — show under input.\nisSubmitting — disable button during async submit.\nisDirty — unsaved changes warning. touchedFields — show errors after blur.\nProxy: formState subscribe — destructuring recommended fields explicitly.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function FormStateDemo() {\n  const {\n    register,\n    handleSubmit,\n    formState: { errors, isSubmitting, isDirty },\n  } = useForm({ defaultValues: { bio: \"\" } });\n\n  return (\n    <form onSubmit={handleSubmit(async () => {})}>\n      <textarea {...register(\"bio\", { minLength: { value: 10, message: \"Min 10\" } })} />\n      {errors.bio && <em>{errors.bio.message}</em>}\n      <button disabled={isSubmitting || !isDirty}>\n        {isSubmitting ? \"Posting…\" : \"Post\"}\n      </button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q16: Controller — controlled / third-party UI (MUI, react-select)",
            "explain": "Task:\nConnect non-native input to RHF.\n\nIn simple words:\n<Controller name=\"color\" control={control} render={({ field }) => (\n  <Select {...field} options={...} />\n)} />.\nfield = { value, onChange, onBlur, ref, name }. Custom components need value/onChange.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function ControllerDemo() {\n  const { control, handleSubmit } = useForm({ defaultValues: { mood: \"happy\" } });\n\n  return (\n    <form onSubmit={handleSubmit(console.log)}>\n      <Controller\n        name=\"mood\"\n        control={control}\n        rules={{ required: \"Pick mood\" }}\n        render={({ field, fieldState }) => (\n          <div>\n            <select {...field}>\n              <option value=\"happy\">Happy</option>\n              <option value=\"sad\">Sad</option>\n            </select>\n            {fieldState.error && <span>{fieldState.error.message}</span>}\n          </div>\n        )}\n      />\n      <button type=\"submit\">OK</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q17: reset — clear or preload form",
            "explain": "Task:\nCall reset() after successful submit or edit cancel.\n\nIn simple words:\nreset() — back to defaultValues. reset({ email: 'x@y.com' }) — new defaults.\nkeepDirtyValues option. Edit form: fetch user → reset(fetched).\nkey={user.id} remount alternative for heavy forms.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function ResetDemo() {\n  const { register, handleSubmit, reset } = useForm({\n    defaultValues: { note: \"\" },\n  });\n\n  async function onSubmit(data) {\n    await fakeSave(data);\n    reset(); // back to empty\n  }\n\n  return (\n    <form onSubmit={handleSubmit(onSubmit)}>\n      <input {...register(\"note\")} />\n      <button type=\"submit\">Save</button>\n      <button type=\"button\" onClick={() => reset({ note: \"draft restored\" })}>\n        Load draft\n      </button>\n    </form>\n  );\n}\n\nasync function fakeSave() {\n  return true;\n}"
          },
          {
            "title": "Q18: setError — manual / server field errors",
            "explain": "Task:\nSet error on specific field when API returns 400.\n\nIn simple words:\nsetError('email', { type: 'server', message: 'Already taken' }).\nroot/server level: setError('root', { message: 'Login failed' }).\nclearErrors('email') before retry. shouldFocus: true option.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function SetErrorDemo() {\n  const { register, handleSubmit, setError, formState: { errors } } = useForm();\n\n  async function onSubmit(data) {\n    const res = await fakeCheckEmail(data.email);\n    if (res.taken) {\n      setError(\"email\", { type: \"server\", message: \"Email already registered\" });\n      return;\n    }\n  }\n\n  return (\n    <form onSubmit={handleSubmit(onSubmit)}>\n      <input {...register(\"email\")} />\n      {errors.email && <p>{errors.email.message}</p>}\n      {errors.root && <p>{errors.root.message}</p>}\n      <button type=\"submit\">Check</button>\n    </form>\n  );\n}\n\nasync function fakeCheckEmail(email) {\n  return { taken: email === \"taken@test.com\" };\n}"
          },
          {
            "title": "Q19: watch — reactive field values",
            "explain": "Task:\nOne field depends on another — live preview / conditional fields.\n\nIn simple words:\nconst role = watch('role'). watch() — entire form (careful perf).\nuseWatch({ name: 'role' }) finer subscription. subscription less re-render than watch all.\npassword confirm: watch('password') compare in validate function.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function WatchDemo() {\n  const { register, watch } = useForm({ defaultValues: { plan: \"free\", company: \"\" } });\n  const plan = watch(\"plan\");\n\n  return (\n    <form>\n      <select {...register(\"plan\")}>\n        <option value=\"free\">Free</option>\n        <option value=\"pro\">Pro</option>\n      </select>\n      {plan === \"pro\" && <input {...register(\"company\", { required: true })} placeholder=\"Company\" />}\n    </form>\n  );\n}"
          },
          {
            "title": "Q20: useFieldArray — dynamic list fields",
            "explain": "Task:\nAppend/remove rows (phones, line items).\n\nIn simple words:\nconst { fields, append, remove } = useFieldArray({ control, name: 'phones' }).\nmap fields with key={field.id} — NOT index. register(`phones.${index}.number`).\ndefaultValues: { phones: [{ number: '' }] }.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const phonesSchema = z.object({\n  phones: z.array(z.object({ number: z.string().min(8) })).min(1),\n});\n\nexport function FieldArrayDemo() {\n  const { register, control, handleSubmit } = useForm({\n    defaultValues: { phones: [{ number: \"\" }] },\n    resolver: zodResolver(phonesSchema),\n  });\n  const { fields, append, remove } = useFieldArray({ control, name: \"phones\" });\n\n  return (\n    <form onSubmit={handleSubmit(console.log)}>\n      {fields.map((field, index) => (\n        <div key={field.id}>\n          <input {...register(`phones.${index}.number`)} placeholder=\"Phone\" />\n          <button type=\"button\" onClick={() => remove(index)}>×</button>\n        </div>\n      ))}\n      <button type=\"button\" onClick={() => append({ number: \"\" })}>Add phone</button>\n      <button type=\"submit\">Save</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q21: Zod — z.object schema",
            "explain": "Task:\nDefine fields + messages; parse/safeParse.\n\nIn simple words:\nz.object({ email: z.string().email(), age: z.coerce.number().min(18) }).\nsafeParse returns { success, data | error }. error.flatten() field errors.\nReusable schemas share client/server (tRPC, API validation).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export const loginSchema = z.object({\n  email: z.string().email(\"Please enter a valid email\"),\n  password: z.string().min(8, \"Min 8 characters\"),\n});"
          },
          {
            "title": "Q22: refine / superRefine — cross-field rules",
            "explain": "Task:\nPassword === confirm; custom business rules.\n\nIn simple words:\n.refine(data => data.password === data.confirm, { message, path: ['confirm'] }).\nsuperRefine — multiple issues, ctx.addIssue. For complex validation.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export const signupSchema = z\n  .object({\n    password: z.string().min(8),\n    confirm: z.string(),\n  })\n  .refine((d) => d.password === d.confirm, {\n    message: \"Passwords do not match\",\n    path: [\"confirm\"],\n  });"
          },
          {
            "title": "Q23: z.infer — TypeScript type from schema",
            "explain": "Task:\nGet form data type from schema (TS in comments).\n\nIn simple words:\ntype LoginInput = z.infer<typeof loginSchema>;\n// { email: string; password: string }\nJSDoc in JSX file: @typedef {z.infer<typeof loginSchema>} LoginInput\nSingle source of truth — schema change → type follows in TS projects.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "/** @typedef {z.infer<typeof loginSchema>} LoginInput */"
          },
          {
            "title": "Q24: zodResolver — RHF + Zod bridge",
            "explain": "Task:\nuseForm({ resolver: zodResolver(schema) }) — errors auto map.\n\nIn simple words:\nClient validation from Zod; RHF errors object populate.\nmode 'onChange' + zod = live Zod messages.\nMultiple schemas: discriminatedUnion for form variants.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function ZodResolverDemo() {\n  const {\n    register,\n    handleSubmit,\n    formState: { errors },\n  } = useForm({\n    resolver: zodResolver(loginSchema),\n    defaultValues: { email: \"\", password: \"\" },\n  });\n\n  return (\n    <form onSubmit={handleSubmit(console.log)}>\n      <input {...register(\"email\")} />\n      {errors.email && <span>{errors.email.message}</span>}\n      <input type=\"password\" {...register(\"password\")} />\n      {errors.password && <span>{errors.password.message}</span>}\n      <button type=\"submit\">Login</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q25: Combined login — RHF + Zod + Auth submit",
            "explain": "Task:\nFull login form → API → AuthContext login → navigate.\n\nIn simple words:\nhandleSubmit async → fakeLoginApi → login(user, token) → navigate(from).\nisSubmitting disable button. root error invalid credentials.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function LoginFormFull() {\n  const { login } = useAuth();\n  const navigate = useNavigate();\n  const location = useLocation();\n\n  const {\n    register,\n    handleSubmit,\n    setError,\n    formState: { errors, isSubmitting },\n  } = useForm({\n    resolver: zodResolver(loginSchema),\n    defaultValues: { email: \"\", password: \"\" },\n  });\n\n  async function onSubmit(data) {\n    try {\n      const { token, user } = await fakeLoginApi(data.email, data.password);\n      login(user, token);\n      const from = location.state?.from?.pathname ?? \"/dashboard\";\n      navigate(from, { replace: true });\n    } catch {\n      setError(\"root\", { message: \"Invalid email or password\" });\n    }\n  }\n\n  return (\n    <form onSubmit={handleSubmit(onSubmit)}>\n      <input {...register(\"email\")} autoComplete=\"email\" />\n      {errors.email && <p>{errors.email.message}</p>}\n      <input type=\"password\" {...register(\"password\")} autoComplete=\"current-password\" />\n      {errors.password && <p>{errors.password.message}</p>}\n      {errors.root && <p role=\"alert\">{errors.root.message}</p>}\n      <button disabled={isSubmitting}>{isSubmitting ? \"Signing in…\" : \"Sign in\"}</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q26: Server errors mapped to fields (400 validation payload)",
            "explain": "Task:\nAPI fieldErrors object → loop setError.\n\nIn simple words:\nResponse { errors: { email: 'Taken', username: 'Too short' } }.\nObject.entries(map).forEach(([field, message]) => setError(field, { type: 'server', message })).\nNon-field errors → root. Zod on client first; server authoritative for duplicate email etc.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function mapServerErrors(setError, payload) {\n  if (payload.errors) {\n    Object.entries(payload.errors).forEach(([field, message]) => {\n      setError(field, { type: \"server\", message: String(message) });\n    });\n  }\n  if (payload.message) {\n    setError(\"root\", { message: payload.message });\n  }\n}\n\nexport function ServerErrorsForm() {\n  const { register, handleSubmit, setError, formState: { errors } } = useForm({\n    resolver: zodResolver(z.object({ username: z.string().min(3) })),\n  });\n\n  async function onSubmit(data) {\n    const res = await fakeRegisterApi(data);\n    if (!res.ok) {\n      mapServerErrors(setError, res.body);\n    }\n  }\n\n  return (\n    <form onSubmit={handleSubmit(onSubmit)}>\n      <input {...register(\"username\")} />\n      {errors.username && <span>{errors.username.message}</span>}\n      {errors.root && <span>{errors.root.message}</span>}\n      <button type=\"submit\">Register</button>\n    </form>\n  );\n}\n\nasync function fakeRegisterApi(data) {\n  if (data.username === \"taken\") {\n    return { ok: false, body: { errors: { username: \"Username taken\" } } };\n  }\n  return { ok: true };\n}"
          }
        ]
      },
      {
        "file": "47_Zustand.jsx",
        "title": "47 — Zustand",
        "kya": "Zustand = small global store. Create with create(); in components",
        "detail": "47 — Zustand (State Management)\nLevel: MID  |  Sequence: first 11 (context), 12 (reducer), then this\n\nSIMPLE: Zustand = small global store. Create with create(); in components\nsubscribe to a slice with useStore(selector). Less boilerplate than Redux;\nbetter performance than Context when you use fine-grained selectors.\nClient-only — even in React 19.\n\nWHY: Cart, UI prefs, auth snapshot — avoid prop drilling / giant context.\nINTERVIEW: selector stale traps; do not create store inside a component;\nvs Redux vs Context; persist + SSR hydrate caution.\nUse in Vite/React 19 project — teaching file (npm i zustand).",
        "intro": "47 — Zustand (State Management)\nLevel: MID  |  Sequence: first 11 (context), 12 (reducer), then this\n\nSIMPLE: Zustand = small global store. Create with create(); in components\nsubscribe to a slice with useStore(selector). Less boilerplate than Redux;\nbetter performance than Context when you use fine-grained selectors.\nClient-only — even in React 19.\n\nWHY: Cart, UI prefs, auth snapshot — avoid prop drilling / giant context.\nINTERVIEW: selector stale traps; do not create store inside a component;\nvs Redux vs Context; persist + SSR hydrate caution.\nUse in Vite/React 19 project — teaching file (npm i zustand).",
        "questions": [
          {
            "title": "Q1: create store — minimal counter",
            "explain": "Task:\ncreate((set) => ({ count, inc })) pattern.\n\nIn simple words:\nStore = hook + vanilla API. set(partial) or set(fn) is not immer-style merge —\nit shallow merges top-level keys. get() reads current state inside actions.\nComponent: const count = useCounterStore(s => s.count).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export const useCounterStore = create((set) => ({\n  count: 0,\n  inc: () => set((s) => ({ count: s.count + 1 })),\n  dec: () => set((s) => ({ count: s.count - 1 })),\n}));\n\nexport function CounterView() {\n  const count = useCounterStore((s) => s.count);\n  const inc = useCounterStore((s) => s.inc);\n  return (\n    <button onClick={inc}>{count}</button>\n  );\n}"
          },
          {
            "title": "Q2: useStore selectors — subscribe only to what you need",
            "explain": "Task:\n(s) => s.user.name — render only when name changes (roughly).\n\nIn simple words:\nFull store useStore() without selector = re-render on every change.\nSelector return value compared with Object.is — primitives work best.\nDerived: (s) => s.items.length — render when length changes.\nMultiple fields: shallow compare (Q14) or separate hooks.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export const useCartStore = create((set) => ({\n  items: [],\n  add: (item) => set((s) => ({ items: [...s.items, item] })),\n  total: () => 0, // bad as selector — function new each time; use getter Q17\n}));\n\nexport function CartBadge() {\n  const itemCount = useCartStore((s) => s.items.length);\n  return <span>{itemCount} items</span>;\n}"
          },
          {
            "title": "Q3: Avoid stale whole-store subscribe",
            "explain": "Task:\nconst store = useStore() anti-pattern — re-render on every update.\n\nIn simple words:\n❌ const { a, b } = useMyStore() — default selector = identity = full state.\n✅ const a = useMyStore(s => s.a).\nDebug: React DevTools + console.log render count.\nSplit components: CountDisplay vs Buttons with separate selectors.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function BadWholeStore() {\n  // ❌ re-renders on ANY key change\n  const state = useCartStore();\n  return <span>{state.items.length}</span>;\n}\n\nexport function GoodSelector() {\n  const len = useCartStore((s) => s.items.length);\n  return <span>{len}</span>;\n}"
          },
          {
            "title": "Q4: set / get inside actions",
            "explain": "Task:\ncreate((set, get) => ({ ... })) — get() reads current state.\n\nIn simple words:\nset({ partial }) merges shallow. set(fn) fn receives previous state.\nget().count — latest in action without closure stale (usually).\nreplace: true rare — replace entire state (persist rehydrate).\nOutside React: useCounterStore.getState().inc().",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export const useTodoStore = create((set, get) => ({\n  todos: [],\n  addTodo: (text) =>\n    set({ todos: [...get().todos, { id: crypto.randomUUID(), text, done: false }] }),\n  toggle: (id) =>\n    set({\n      todos: get().todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),\n    }),\n  clearDone: () => set({ todos: get().todos.filter((t) => !t.done) }),\n}));"
          },
          {
            "title": "Q5: Async actions in store",
            "explain": "Task:\nfetch inside action; loading/error state in store.\n\nIn simple words:\nasync loadUsers() { set({ loading: true }); try { ... set({ users }) } finally { set({ loading: false }) } }.\nComponents use only selectors — no duplicate useEffect fetch.\nRace: request id / abortController in store to cancel previous.\nDon't forget error branch — set({ error: message }).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export const useUsersStore = create((set) => ({\n  users: [],\n  loading: false,\n  error: null,\n  loadUsers: async () => {\n    set({ loading: true, error: null });\n    try {\n      const res = await fetch(\"/api/users\");\n      if (!res.ok) throw new Error(\"Failed\");\n      const users = await res.json();\n      set({ users, loading: false });\n    } catch (e) {\n      set({ error: e.message, loading: false });\n    }\n  },\n}));\n\nexport function UserList() {\n  const users = useUsersStore((s) => s.users);\n  const loading = useUsersStore((s) => s.loading);\n  const load = useUsersStore((s) => s.loadUsers);\n  // useEffect(() => { load(); }, [load]); — stable action ref usually OK\n  if (loading) return <p>Loading…</p>;\n  return (\n    <ul>\n      {users.map((u) => (\n        <li key={u.id}>{u.name}</li>\n      ))}\n      <button onClick={load}>Reload</button>\n    </ul>\n  );\n}"
          },
          {
            "title": "Q6: Immer middleware — optional sketch",
            "explain": "Task:\nNested mutate-style updates without spread hell.\n\nIn simple words:\nnpm i immer. create(immer((set) => ({ ... }))).\nset(state => { state.user.name = 'x' }) — immer draft mutate.\nTeaching file: comment-only full import:\nimport { immer } from 'zustand/middleware/immer'\ncreate(immer((set) => ({ nested: { x: 1 }, bump: () => set(s => { s.nested.x++ }) })))\nOptional — spread is enough for small flat state.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const immerSketch =\n  \"create(immer(set => ({ ... }))) allows draft mutations; good for deep nested state.\";"
          },
          {
            "title": "Q7: persist middleware — localStorage survive refresh",
            "explain": "Task:\nTheme/cart persist; partialize sensitive fields out.\n\nIn simple words:\nimport { persist } from 'zustand/middleware'\ncreate(persist((set)=>({ theme, setTheme }), { name: 'ui-storage', partialize: s => ({ theme: s.theme }) }))\nonRehydrateStorage callback — handle SSR mismatch (Q21).\nversion + migrate for schema changes.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export const useUiStore = create(\n  // persist wrapper — uncomment when zustand/middleware available:\n  // persist(\n  (set) => ({\n    sidebarOpen: true,\n    toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),\n  })\n  // , { name: \"ui-persist\" })\n);\n\n// Full persist example (comment reference):\n// export const useThemeStore = create(persist(\n//   (set) => ({ theme: 'light', setTheme: (t) => set({ theme: t }) }),\n//   { name: 'theme-v1' }\n// ));"
          },
          {
            "title": "Q8: Combine slices pattern — scale big stores",
            "explain": "Task:\ncreateBearSlice + createFishSlice → create(persist(...combine)).\n\nIn simple words:\nconst createBearSlice = (set, get) => ({ bears: 0, eatFish: () => ... })\nexport const useBoundStore = create((...a) => ({ ...createBearSlice(...a), ...createFishSlice(...a) }))\nSlices split by team. TypeScript: SliceBear & SliceFish intersection.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const createBearSlice = (set, get) => ({\n  bears: 0,\n  addBear: () => set({ bears: get().bears + 1 }),\n});\n\nconst createFishSlice = (set, get) => ({\n  fishes: 0,\n  addFish: () => set({ fishes: get().fishes + 1 }),\n});\n\nexport const useBoundStore = create((set, get, api) => ({\n  ...createBearSlice(set, get, api),\n  ...createFishSlice(set, get, api),\n}));"
          },
          {
            "title": "Q9: TypeScript / JSDoc typing sketch",
            "explain": "Task:\nDocument types with comments in the JSX file.\n\nIn simple words:\nTS: type Store = { count: number; inc: () => void }\ncreate<Store>()((set) => ({ ... }))\nJSDoc: @typedef {{ count: number, inc: function(): void }} CounterStore\nSelector typed: useStore(s: CounterStore => s.count)",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "/**\n * @typedef {{ id: string, text: string, done: boolean }} Todo\n * @typedef {{ todos: Todo[], addTodo: function(string): void }} TodoStore\n */"
          },
          {
            "title": "Q10: Zustand vs Context + useReducer",
            "explain": "Task:\nWhen context is enough; when Zustand.\n\nIn simple words:\nContext: theme, locale, rare updates — simple, built-in.\nContext pain: frequent updates + many consumers = wide re-renders.\nuseReducer + context = Zustand-like dispatch pattern but same perf issue.\nZustand: fine selectors, less Provider nesting, devtools/persist ecosystem.\nSmall app / low churn → context OK. Growing client state → Zustand.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const vsContext =\n  \"Context broadcasts value changes to all consumers; Zustand selectors limit subscriptions.\";"
          },
          {
            "title": "Q11: Zustand vs Redux",
            "explain": "Task:\nInterview compare — not always Redux better.\n\nIn simple words:\nRedux: strict flux, middleware ecosystem, large teams, RTK Query, time-travel.\nZustand: minimal API, less boilerplate, mutable-friendly actions, quick start.\nBoth client global state. Redux Toolkit narrowed the gap.\nEnterprise existing Redux → stay. Greenfield mid SPA → Zustand popular.\nServer state (React Query) is separate — pair with either one.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const vsRedux =\n  \"Redux = conventions + devtools depth at scale; Zustand = speed/simplicity for moderate global client state.\";"
          },
          {
            "title": "Q12: When NOT to use Zustand",
            "explain": "Task:\nAvoid over-engineering — decision list.\n\nIn simple words:\n✗ Local UI state (modal open) — useState.\n✗ Server cache — TanStack Query / SWR.\n✗ Form fields — RHF local (file 46).\n✗ Rarely read config — context/props.\n✗ You need complex event sourcing audit — Redux maybe.\nGlobal ≠ always store — colocate first (file 24).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export const whenNotZustand = [\n  \"component-local UI\",\n  \"server fetched data cache\",\n  \"form field state\",\n  \"one-time prop drilling 2 levels\",\n];"
          },
          {
            "title": "Q13: subscribeWithSelector — vanilla subscribe fine-grained",
            "explain": "Task:\nListener outside React when a specific key changes.\n\nIn simple words:\ncreate(subscribeWithSelector((set)=>({ ... }))).\nuseStore.subscribe(s => s.count, (count, prev) => { analytics(count) }).\nNon-React widgets, router guards, logging. Unsubscribe return fn call.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export const useMetricsStore = create(\n  subscribeWithSelector((set) => ({\n    pageViews: 0,\n    bump: () => set((s) => ({ pageViews: s.pageViews + 1 })),\n  }))\n);\n\n// vanilla usage sketch:\n// useMetricsStore.subscribe((s) => s.pageViews, (pv) => console.log('pv', pv));"
          },
          {
            "title": "Q14: shallow compare — multiple fields one selector",
            "explain": "Task:\nuseStore(s => ({ a: s.a, b: s.b }), shallow) — skip render when both are the same.\n\nIn simple words:\nObject return without shallow = new object every call = always re-render.\nimport { shallow } from 'zustand/shallow'.\nAlternative: useShallow hook (zustand v4.4+) same idea.\nPrefer separate selectors when possible — simpler mental model.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export const useSettingsStore = create((set) => ({\n  fontSize: 14,\n  theme: \"light\",\n  setFontSize: (n) => set({ fontSize: n }),\n  setTheme: (t) => set({ theme: t }),\n}));\n\nexport function SettingsPreview() {\n  const { fontSize, theme } = useSettingsStore(\n    (s) => ({ fontSize: s.fontSize, theme: s.theme }),\n    shallow\n  );\n  return (\n    <p style={{ fontSize }}>\n      {theme} mode\n    </p>\n  );\n}"
          },
          {
            "title": "Q15: Reset store — tests / logout clear all",
            "explain": "Task:\nInitial state snapshot; reset() action or getState/setState trick.\n\nIn simple words:\nPattern: const initial = { ... }; create((set, get) => ({ ...initial, reset: () => set(initial) })).\nLogout: reset cart + user slice. Tests: beforeEach(() => store.getState().reset()).\nWith persist: also clearStorage() from persist API.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const initialSession = { user: null, token: null };\n\nexport const useSessionStore = create((set) => ({\n  ...initialSession,\n  setSession: (user, token) => set({ user, token }),\n  reset: () => set(initialSession),\n}));"
          },
          {
            "title": "Q16: Testing store outside React",
            "explain": "Task:\ngetState / setState direct — unit test actions.\n\nIn simple words:\nuseCounterStore.setState({ count: 5 });\nuseCounterStore.getState().inc();\nexpect(useCounterStore.getState().count).toBe(6);\nNo render needed — pure action tests fast.\nComponent tests: render with real store; reset in beforeEach.\nMock store: inject via props/context wrapper if you need isolation (advanced).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function testCounterActions() {\n  useCounterStore.setState({ count: 0 });\n  useCounterStore.getState().inc();\n  return useCounterStore.getState().count; // 1\n}"
          },
          {
            "title": "Q17: Computed getters — derived state in store",
            "explain": "Task:\ntotalPrice selector or get().items.reduce in action.\n\nIn simple words:\nDon't store derived if easily computed — selector (s) => s.items.reduce(...).\nExpensive derive: memo in selector with reselect pattern or cache in action after mutation.\n❌ total: () => get().items.length as store field function — unstable selector.\n✅ selectTotal = (s) => s.items.reduce((n, i) => n + i.qty, 0).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export const useShopStore = create((set) => ({\n  items: [{ id: 1, qty: 2, price: 10 }],\n  addQty: (id) =>\n    set((s) => ({\n      items: s.items.map((it) => (it.id === id ? { ...it, qty: it.qty + 1 } : it)),\n    })),\n}));\n\nexport function CartTotal() {\n  const total = useShopStore((s) =>\n    s.items.reduce((sum, it) => sum + it.qty * it.price, 0)\n  );\n  return <strong>Total: ${total}</strong>;\n}"
          },
          {
            "title": "Q18: Logger middleware sketch",
            "explain": "Task:\nIn dev, log prev/next on every set.\n\nIn simple words:\nconst log = (config) => (set, get, api) => config(\n  (...args) => { console.log('prev', get()); set(...args); console.log('next', get()); },\n  get, api\n);\ncreate(log((set)=>({ ... }))). Official devtools middleware too.\nStrip in production — NODE_ENV check.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const loggerSketch =\n  \"Wrap set in middleware to log prev/next state; use zustand devtools in dev.\";"
          },
          {
            "title": "Q19: React 19 note — Zustand still client-only",
            "explain": "Task:\nDo not use store in RSC / Server Components.\n\nIn simple words:\nPut components that call useStore inside a 'use client' boundary.\nDo not run create() on the server — hydration mismatch + no window.\nReact 19 Actions / useActionState server mutations are separate — sync store on client side after.\nStore = client global UI/session snapshot, not server data source of truth.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const react19Note =\n  \"Mark store-consuming components 'use client'; server components cannot call useStore.\";"
          },
          {
            "title": "Q20: SSR + persist hydrate caution",
            "explain": "Task:\nlocalStorage is not on SSR — avoid flashing wrong theme.\n\nIn simple words:\nFirst client render = default state; after rehydrate jump — mismatch warning.\nFix: skip persist render until hydrated flag; or cookie for SSR-readable theme.\npersist.onFinishHydration(() => set({ hydrated: true })).\nNext.js: useEffect-only persist read or dynamic ssr:false component.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export const useHydratedUiStore = create((set) => ({\n  theme: \"light\",\n  hydrated: false,\n  setHydrated: () => set({ hydrated: true }),\n}));\n\n// persist config sketch:\n// onRehydrateStorage: () => (state) => state?.setHydrated?.()"
          },
          {
            "title": "Q21: Common bug — re-creating store inside component",
            "explain": "Task:\ncreate() only at module level — once.\n\nIn simple words:\n❌ function Comp() { const useStore = create(...) — N stores, state lost, memory leak.\n✅ module scope export const useStore = create(...).\nFactory per test OK: createStore() helper in module, not in render.\nContext+create rare pattern for scoped store — advanced, default avoid.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "// BAD pattern (never):\n// function Bad() {\n//   const useLocal = create(() => ({ n: 0 }));\n//   return null;\n// }"
          },
          {
            "title": "Q22: Multiple stores vs single bound store",
            "explain": "Task:\nDomain split — cart, auth, ui separate or slices in one store.\n\nIn simple words:\nMultiple stores: clear boundaries, tree-shake imports, smaller tests.\nSingle bound: one devtools view, cross-slice actions easy (logout clears all).\nTeam preference — consistency > dogma. Avoid 20 micro-stores confusion.\nKeep related data (user + permissions) in one store/slice.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "const multiStoreTip =\n  \"Split by domain (auth, cart, ui); combine slices when actions cross-cut often.\";"
          },
          {
            "title": "Q23: useStore outside component — getState / subscribe",
            "explain": "Task:\nRead token in router loader, axios interceptor.\n\nIn simple words:\nuseSessionStore.getState().token — no hook rules.\nSubscribe logout event: useSessionStore.subscribe(s => s.token, tok => { if (!tok) redirect }).\nKeep side effects out of store actions when possible — or explicit init module.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export function attachAuthHeader(config) {\n  const token = useSessionStore.getState().token;\n  if (token) {\n    config.headers = { ...config.headers, Authorization: `Bearer ${token}` };\n  }\n  return config;\n}"
          },
          {
            "title": "Q24: Performance checklist + interview recap",
            "explain": "Task:\nSay out loud: selectors, shallow, colocate, server state separation.\n\nIn simple words:\n1) Narrow selectors 2) shallow for object picks 3) don't select functions inline new\n4) async + race handling 5) persist partial 6) reset tests 7) client boundary\n8) pair with React Query for API 9) devtools profile renders 10) module-level create\nTrap: \"Zustand replaces Redux always\" — nuance. \"Store for every useState\" — no.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — read it, then try it in a Vite project.",
            "code": "export const zustandChecklist = [\n  \"module-level create once\",\n  \"narrow selectors not whole store\",\n  \"shallow for multi-field object selector\",\n  \"server data in React Query not Zustand\",\n  \"persist + SSR hydrate carefully\",\n  \"reset store on logout/tests\",\n];\n\n// -----------------------------------------------------------------------------\n// Demo app wiring — bound store usage\n// -----------------------------------------------------------------------------\nexport function ZustandDemoApp() {\n  const bears = useBoundStore((s) => s.bears);\n  const fishes = useBoundStore((s) => s.fishes);\n  const addBear = useBoundStore((s) => s.addBear);\n  const addFish = useBoundStore((s) => s.addFish);\n\n  return (\n    <div>\n      <p>Bears: {bears} Fishes: {fishes}</p>\n      <button onClick={addBear}>+ bear</button>\n      <button onClick={addFish}>+ fish</button>\n      <CounterView />\n      <CartBadge />\n    </div>\n  );\n}\n\n// -----------------------------------------------------------------------------\n// Quick revise map\n// 11 context → 12 reducer → 47 zustand | 46 auth (overlap session store)\n// Middleware: Q6 immer, Q7 persist, Q13 subscribeWithSelector, Q18 logger\n// -----------------------------------------------------------------------------"
          }
        ]
      }
    ]
  }
];
