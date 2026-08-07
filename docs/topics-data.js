const TOPICS = [
  {
    "level": "BASE",
    "items": [
      {
        "file": "01_WhatIsReactAndJSX.jsx",
        "title": "01 — What Is React And JSX",
        "kya": "React = kitchen me chef jo UI (screen) banata hai pieces (components) se.",
        "detail": "01 — What Is React And JSX\nLevel: BASE  |  Sequence: pehle yeh, phir agla number\n\nLAYMAN: React = kitchen me chef jo UI (screen) banata hai pieces (components) se.\nJSX = HTML jaisa dikhta hai, lekin JS ke andar likhte ho — jaise recipe card\njo code bhi hai. Browser JSX nahi samajhta; Vite/Babel ise JS me badal deta hai.\n\nReact kya karta hai: data badle → UI update. Tum manually DOM nahi chhedte.\nJSX me { } = JS expression daalna. className = HTML class (class reserved hai).\n\nKYUN: React samajhne ka pehla step. Bina JSX/component soch ke hooks confuse honge.\nINTERVIEW: JSX kya hai; virtual DOM idea; why className; one parent rule.\nVite/React 19 project me use — yeh teaching file hai, node se mat chalao.",
        "intro": "01 — What Is React And JSX\nLevel: BASE  |  Sequence: pehle yeh, phir agla number\n\nLAYMAN: React = kitchen me chef jo UI (screen) banata hai pieces (components) se.\nJSX = HTML jaisa dikhta hai, lekin JS ke andar likhte ho — jaise recipe card\njo code bhi hai. Browser JSX nahi samajhta; Vite/Babel ise JS me badal deta hai.\n\nReact kya karta hai: data badle → UI update. Tum manually DOM nahi chhedte.\nJSX me { } = JS expression daalna. className = HTML class (class reserved hai).\n\nKYUN: React samajhne ka pehla step. Bina JSX/component soch ke hooks confuse honge.\nINTERVIEW: JSX kya hai; virtual DOM idea; why className; one parent rule.\nVite/React 19 project me use — yeh teaching file hai, node se mat chalao.",
        "questions": [
          {
            "title": "Q1: Pehla JSX element",
            "explain": "Kya karna hai:\nEk simple <h1>Hello React</h1> return karo component se.\n\nSeedha matlab:\nComponent = function jo JSX return kare.\nYeh React ka \"dabba\" hai jo screen pe dikhega.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Hello() {\n  return <h1>Hello React</h1>;\n}"
          },
          {
            "title": "Q2: JS expression curly braces me",
            "explain": "Kya karna hai:\nname = \"Ada\". <p> me Hello, {name} dikhao.\n\nSeedha matlab:\n{ } ke andar koi bhi JS expression chalega (variable, 1+1, call).\nString concat ki zarurat nahi — JSX me seedha mix.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Greet() {\n  const name = \"Ada\";\n  return <p>Hello, {name}</p>;\n}"
          },
          {
            "title": "Q3: className (class nahi)",
            "explain": "Kya karna hai:\ndiv pe className=\"card\" lagao, andar text.\n\nSeedha matlab:\nJS me class keyword reserved hai.\nIsliye React me className use karte hain. CSS same rehti hai.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Card() {\n  return <div className=\"card\">Yeh ek card hai</div>;\n}"
          },
          {
            "title": "Q4: Self-closing tags",
            "explain": "Kya karna hai:\n<img /> aur <br /> self-close karo (JSX me zaruri).\n\nSeedha matlab:\nHTML me kabhi kabhi tag band nahi karte. JSX strict hai — band karo.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Avatar() {\n  return (\n    <div>\n      <img src=\"/me.png\" alt=\"profile\" />\n      <br />\n      <span>Profile</span>\n    </div>\n  );\n}"
          },
          {
            "title": "Q5: Ek parent rule (Fragment)",
            "explain": "Kya karna hai:\nDo siblings return karo bina extra div ke — <>...</> use karo.\n\nSeedha matlab:\nreturn me ek root chahiye. Extra div DOM gandha karta hai.\nFragment <> </> invisible wrapper hai.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function TwoLines() {\n  return (\n    <>\n      <p>Line 1</p>\n      <p>Line 2</p>\n    </>\n  );\n}"
          },
          {
            "title": "Q6: Nested JSX tree",
            "explain": "Kya karna hai:\nHeader + main + footer wala chhota layout banao.\n\nSeedha matlab:\nJSX = tree. Parent children wrap karta hai — HTML jaisa nesting.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Layout() {\n  return (\n    <div className=\"page\">\n      <header>Site</header>\n      <main>Content</main>\n      <footer>© 2026</footer>\n    </div>\n  );\n}"
          },
          {
            "title": "Q7: [MID] JSX behind the scenes (createElement soch)",
            "explain": "Kya karna hai:\nSamjho: <h1 className=\"t\">Hi</h1> ≈ React.createElement(\"h1\", { className: \"t\" }, \"Hi\")\n\nSeedha matlab:\nJSX sugar hai. Internally objects (elements) bante hain.\nInterview me: \"JSX HTML nahi, syntax sugar hai createElement ke liye.\"",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "// Conceptual — Vite/React project me JSX compile ho jata hai:\n// const el = <h1 className=\"t\">Hi</h1>;\n// // roughly → React.createElement(\"h1\", { className: \"t\" }, \"Hi\");"
          },
          {
            "title": "Q8: [MID] Inline style object",
            "explain": "Kya karna hai:\nstyle={{ color: \"tomato\", fontSize: 18 }} lagao (camelCase CSS).\n\nSeedha matlab:\nstyle = object, string nahi. font-size → fontSize.\nDouble { } : bahar JSX expression, andar object literal.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Styled() {\n  return <p style={{ color: \"tomato\", fontSize: 18 }}>Styled text</p>;\n}"
          },
          {
            "title": "Q9: Fragment with key (list me)",
            "explain": "Kya karna hai:\nmap me <> ki jagah <React.Fragment key={id}> use karo.\n\nSeedha matlab:\nShort <> me key nahi lag sakti. List me key zaroori — Fragment bhi key le sakta hai.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function ItemList({ items }) {\n  return (\n    <ul>\n      {items.map((item) => (\n        <Fragment key={item.id}>\n          <li>{item.title}</li>\n          <li className=\"meta\">{item.tag}</li>\n        </Fragment>\n      ))}\n    </ul>\n  );\n}"
          },
          {
            "title": "Q10: Expression vs statement trap",
            "explain": "Kya karna hai:\n{ if (x) ... } ❌ — ternary / && use karo.\n\nSeedha matlab:\n{ } me sirf expression chalega, statement nahi. if/for/let block nahi.\nInterview trap: \"JSX me if kaise?\" → ternary ya && ya bahar if.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function StatusBadge({ ok }) {\n  return (\n    <span>\n      {ok ? \"✅ Pass\" : \"❌ Fail\"}\n      {ok && <small> All good</small>}\n    </span>\n  );\n}"
          },
          {
            "title": "Q11: JSX injection safety (XSS)",
            "explain": "Kya karna hai:\nUser input seedha text me safe. dangerouslySetInnerHTML avoid unless trusted.\n\nSeedha matlab:\nReact default me text escape karta hai — <script> string render nahi chalega.\nHTML inject chahiye? dangerouslySetInnerHTML — sirf sanitized/trusted source se.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function UserComment({ text }) {\n  return <p>{text}</p>; // safe — React escapes HTML chars\n}\n// ❌ risky: <div dangerouslySetInnerHTML={{ __html: text }} />"
          },
          {
            "title": "Q12: createElement manually (no JSX)",
            "explain": "Kya karna hai:\nReact.createElement se same tree banao — JSX samajhne ke liye.\n\nSeedha matlab:\nJSX compile hoke createElement calls banta hai. Type, props, ...children.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function ManualHello() {\n  return React.createElement(\n    \"div\",\n    { className: \"wrap\" },\n    React.createElement(\"h1\", null, \"Hello\"),\n    React.createElement(\"p\", null, \"No JSX here\")\n  );\n}"
          },
          {
            "title": "Q13: children prop implicit",
            "explain": "Kya karna hai:\n<Card>yeh andar</Card> → Card ke andar {children} render.\n\nSeedha matlab:\nTags ke beech ka content automatically children prop ban jata hai.\nWrapper / layout components ka core pattern.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function CardWrap({ title, children }) {\n  return (\n    <div className=\"card\">\n      <h3>{title}</h3>\n      <div className=\"body\">{children}</div>\n    </div>\n  );\n}\n// use: <CardWrap title=\"Note\"><p>Body text</p></CardWrap>"
          },
          {
            "title": "Q14: Boolean rendering quirks (0, \"\", false)",
            "explain": "Kya karna hai:\n{count && <p>...</p>} — count 0 ho to screen pe \"0\" dikhega!\n\nSeedha matlab:\nfalse/null/undefined render nahi hote. 0 aur \"\" render hote hain.\nFix: count > 0 && ... ya !!count && ... ya ternary.\nInterview trap bahut common.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function CartHint({ count }) {\n  return (\n    <div>\n      {count > 0 && <p>You have {count} items</p>}\n      {Boolean(count) && <span>Non-zero cart</span>}\n    </div>\n  );\n}"
          },
          {
            "title": "Q15: [MID] Babel transform mental model",
            "explain": "Kya karna hai:\nSamjho Vite/Babel JSX ko JS me badalta hai before browser.\n\nSeedha matlab:\nBrowser JSX nahi samajhta. Build step: JSX → createElement (classic) ya jsx runtime (React 17+).\nDev me HMR; prod me minified bundle.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "// Before (you write):\n// const el = <h1 className=\"t\">Hi</h1>;\n// After (roughly, automatic JSX runtime):\n// import { jsx as _jsx } from \"react/jsx-runtime\";\n// const el = _jsx(\"h1\", { className: \"t\", children: \"Hi\" });"
          },
          {
            "title": "Q16: Deep nested JSX tree",
            "explain": "Kya karna hai:\nArticle > section > div > p nesting — readable indent rakho.\n\nSeedha matlab:\nJSX = tree structure. Har level parent ek child wrap karta hai.\nDeep nesting = split into components (02) — readability ke liye.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function ArticleBlock() {\n  return (\n    <article>\n      <header>\n        <h1>React Basics</h1>\n        <p className=\"subtitle\">JSX tree demo</p>\n      </header>\n      <section>\n        <div className=\"content\">\n          <p>Nested paragraph inside section.</p>\n        </div>\n      </section>\n      <footer>End</footer>\n    </article>\n  );\n}"
          },
          {
            "title": "Q17: Comments in JSX",
            "explain": "Kya karna hai:\n{/* yeh comment */} — HTML <!-- --> JSX expression me nahi.\n\nSeedha matlab:\nJSX ke andar comment bhi { } expression block me likho.\n// line comment JSX tag ke beech me break kar sakta hai — careful.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function WithComment() {\n  return (\n    <div>\n      {/* Sidebar placeholder — baad me component banega */}\n      <aside>Side</aside>\n      <main>Main</main>\n    </div>\n  );\n}"
          },
          {
            "title": "Q18: Spread attributes {...props}",
            "explain": "Kya karna hai:\nconst attrs = { id: \"x\", \"data-test\": \"btn\" }; <button {...attrs} />\n\nSeedha matlab:\nSpread se saari props ek saath pass. Override: pehle spread, baad me specific prop.\nHandy wrappers; overuse = unclear kaunsi prop allowed hai.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function SpreadButton({ label, ...rest }) {\n  return (\n    <button type=\"button\" {...rest}>\n      {label}\n    </button>\n  );\n}\n// use: <SpreadButton label=\"Go\" className=\"primary\" onClick={fn} />"
          },
          {
            "title": "Q19: [MID] htmlFor / tabIndex camelCase",
            "explain": "Kya karna hai:\n<label htmlFor=\"email\"> — HTML for reserved hai JS me.\n\nSeedha matlab:\nJSX attributes camelCase: htmlFor, tabIndex, aria-* as-is, onClick.\nDOM property names match karte hain mostly, HTML attribute names nahi always.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function LabelDemo() {\n  return (\n    <div>\n      <label htmlFor=\"email\">Email</label>\n      <input id=\"email\" tabIndex={1} />\n    </div>\n  );\n}"
          },
          {
            "title": "Q20: [ADV] null return — kuch mat dikhao",
            "explain": "Kya karna hai:\nCondition false ho to return null — empty render.\n\nSeedha matlab:\nComponent null/undefined return kar sakta hai — kuch paint nahi.\nUseful: permission gate, loading placeholder parent handle kare.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function AdminOnly({ isAdmin }) {\n  if (!isAdmin) return null;\n  return <p>Secret admin panel</p>;\n}"
          },
          {
            "title": "Q21: [ADV] Array of elements return",
            "explain": "Kya karna hai:\nmap se array of JSX return — har item pe key.\n\nSeedha matlab:\nReact array of elements render kar sakta hai — lekin key list me must.\nFragment ya single parent dono patterns valid.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function TagRow({ tags }) {\n  return (\n    <div className=\"tags\">\n      {tags.map((tag) => (\n        <span key={tag} className=\"tag\">\n          {tag}\n        </span>\n      ))}\n    </div>\n  );\n}"
          },
          {
            "title": "Q22: [ADV] Anti-pattern — huge inline JSX blob",
            "explain": "Kya karna hai:\n200-line return mat rakho — chhote components me todo.\n\nSeedha matlab:\nEk function ek kaam. JSX readable hona chahiye — extract Header, List, Footer.\nReal-world: file split + composition (02) se maintainable codebase.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function PageShell({ header, children, footer }) {\n  return (\n    <div className=\"page\">\n      <header>{header}</header>\n      <main>{children}</main>\n      <footer>{footer}</footer>\n    </div>\n  );\n}\n\nfunction GoodSplitPage() {\n  return (\n    <PageShell\n      header={<h1>Dashboard</h1>}\n      footer={<small>© App</small>}\n    >\n      <p>Main content alag component me bhi ho sakta hai.</p>\n    </PageShell>\n  );\n}"
          }
        ]
      },
      {
        "file": "02_FunctionalComponents.jsx",
        "title": "02 — Functional Components",
        "kya": "Component = kitchen ka station (chai counter, tandoor). Har station",
        "detail": "02 — Functional Components\nLevel: BASE  |  Sequence: pehle yeh, phir agla number\n\nLAYMAN: Component = kitchen ka station (chai counter, tandoor). Har station\napna kaam karta hai. Functional component = normal JS function jo JSX return kare.\nNaam Capital se start — <Button /> React ko batata hai yeh component hai, HTML tag nahi.\n\nEk file me kai components ho sakte hain. App = root jahan sab jodte ho.\nProps baad me (03). Abhi: function banao, return JSX, use karo.\n\nKYUN: React aaj functional components + hooks pe chalta hai. Class purani style.\nINTERVIEW: Why capital name; pure function soch; default vs named export.\nVite/React 19 project me use — teaching file.\n\n-----------------------------------------------------------------------------\nQ1: Simplest functional component\n\nKya karna hai:",
        "intro": "02 — Functional Components\nLevel: BASE  |  Sequence: pehle yeh, phir agla number\n\nLAYMAN: Component = kitchen ka station (chai counter, tandoor). Har station\napna kaam karta hai. Functional component = normal JS function jo JSX return kare.\nNaam Capital se start — <Button /> React ko batata hai yeh component hai, HTML tag nahi.\n\nEk file me kai components ho sakte hain. App = root jahan sab jodte ho.\nProps baad me (03). Abhi: function banao, return JSX, use karo.\n\nKYUN: React aaj functional components + hooks pe chalta hai. Class purani style.\nINTERVIEW: Why capital name; pure function soch; default vs named export.\nVite/React 19 project me use — teaching file.\n\n-----------------------------------------------------------------------------\nQ1: Simplest functional component\n\nKya karna hai:",
        "questions": [
          {
            "title": "Q1: Simplest functional component",
            "explain": "Kya karna hai:\nfunction Title() { return <h1>My App</h1> }\n\nSeedha matlab:\nFunction + return JSX = component. Bas itna.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Title() {\n  return <h1>My App</h1>;\n}"
          },
          {
            "title": "Q2: Arrow function component",
            "explain": "Kya karna hai:\nconst Subtitle = () => <p>Learn React</p>\n\nSeedha matlab:\nArrow bhi chalega. Short return me () optional wrapping.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const Subtitle = () => <p>Learn React</p>;"
          },
          {
            "title": "Q3: Component ke andar doosra component",
            "explain": "Kya karna hai:\nHeader me Logo use karo — composition.\n\nSeedha matlab:\nBade UI = chhote pieces jodna. Copy-paste mat karo — component reuse.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Logo() {\n  return <span className=\"logo\">⚛️ Prac</span>;\n}\n\nfunction Header() {\n  return (\n    <header>\n      <Logo />\n      <nav>Home</nav>\n    </header>\n  );\n}"
          },
          {
            "title": "Q4: Multiple returns? Early return pattern",
            "explain": "Kya karna hai:\nAgar loading true ho to <p>Loading...</p>, warna content.\n\nSeedha matlab:\nComponent me early return allowed — clean if/else.\n(Conditional rendering detail: 06)",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Panel({ loading }) {\n  if (loading) return <p>Loading...</p>;\n  return <p>Content ready</p>;\n}"
          },
          {
            "title": "Q5: Default export App pattern",
            "explain": "Kya karna hai:\nApp me Title + Subtitle render karo.\n\nSeedha matlab:\nApp usually root component. main.jsx me <App /> mount hota hai.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function App() {\n  return (\n    <div>\n      <Title />\n      <Subtitle />\n      <Header />\n    </div>\n  );\n}"
          },
          {
            "title": "Q6: [MID] Component = pure UI function soch",
            "explain": "Kya karna hai:\nSame props → same JSX. Side-effect render me mat daalo (alert, fetch).\n\nSeedha matlab:\nRender predictible hona chahiye. Effects ke liye useEffect (09).\nInterview: \"Don't cause side effects during render.\"",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function PurePrice({ amount }) {\n  // GOOD: sirf calculate + return\n  const tax = amount * 0.18;\n  return <p>Total: {amount + tax}</p>;\n  // BAD during render: fetch(...); localStorage.setItem(...)\n}"
          },
          {
            "title": "Q7: [MID] Named vs default export",
            "explain": "Kya karna hai:\nNamed export { Title } vs export default App — kab kya.\n\nSeedha matlab:\nDefault: ek main cheez file se. Named: kai pieces.\nTeam style follow karo; mix confuse karta hai.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Conceptual — teaching file me comments dekho.",
            "code": "// see teaching file comments"
          },
          {
            "title": "Q8: [MID] Component file organization",
            "explain": "Kya karna hai:\nEk component ek file (team rule) YA folder/index — project convention follow.\n\nSeedha matlab:\nButton.jsx, Button.module.css — colocate related files.\nBarrel export (index.js) se import clean: import { Button } from \"./ui\".",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "// components/Button/Button.jsx\n// components/Button/index.js  → export { default } from \"./Button\";"
          },
          {
            "title": "Q9: Composition — small pieces jodna",
            "explain": "Kya karna hai:\nPage = Sidebar + Content — har piece alag function.\n\nSeedha matlab:\nBada component copy-paste nahi — chhote reusable blocks.\nReal apps me composition > inheritance (React me inheritance rare).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Sidebar() {\n  return <aside>Menu</aside>;\n}\n\nfunction Content() {\n  return <main>Article body</main>;\n}\n\nfunction Page() {\n  return (\n    <div className=\"layout\">\n      <Sidebar />\n      <Content />\n    </div>\n  );\n}"
          },
          {
            "title": "Q10: props.children as composition slot",
            "explain": "Kya karna hai:\nCard wrapper children accept kare — parent decide kare andar kya.\n\nSeedha matlab:\nchildren = \"slot\" pattern. Layout components isi se flexible hote hain.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Card({ title, children }) {\n  return (\n    <div className=\"card\">\n      <h4>{title}</h4>\n      {children}\n    </div>\n  );\n}\n\nfunction CardDemo() {\n  return (\n    <Card title=\"Stats\">\n      <p>100 users</p>\n      <p>50 orders</p>\n    </Card>\n  );\n}"
          },
          {
            "title": "Q11: Kab component split karein?",
            "explain": "Kya karna hai:\nSame JSX do jagah copy? → extract. Alag responsibility? → naya component.\n\nSeedha matlab:\nRule of thumb: reuse, readability, testability. Har line pe mat todo.\nOver-splitting bhi confusing — balance.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function UserAvatar({ name }) {\n  return <span className=\"avatar\">{name[0]}</span>;\n}\n\nfunction UserRow({ name, role }) {\n  return (\n    <div className=\"row\">\n      <UserAvatar name={name} />\n      <span>{name}</span>\n      <span className=\"role\">{role}</span>\n    </div>\n  );\n}"
          },
          {
            "title": "Q12: displayName debugging ke liye",
            "explain": "Kya karna hai:\nAnonymous arrow ko displayName do — DevTools me naam dikhe.\n\nSeedha matlab:\nReact DevTools me component tree readable hota hai.\nHOC/wrapper me especially useful.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const Mystery = () => <span>?</span>;\nMystery.displayName = \"MysteryWidget\";"
          },
          {
            "title": "Q13: Fragment return — no extra DOM",
            "explain": "Kya karna hai:\nTable row jaisi jagah extra div nahi — <> return.\n\nSeedha matlab:\nDOM structure matter kare (CSS grid, table) — Fragment bachata hai.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function PairLines() {\n  return (\n    <>\n      <dt>Term</dt>\n      <dd>Definition</dd>\n    </>\n  );\n}"
          },
          {
            "title": "Q14: Conditional component type",
            "explain": "Kya karna hai:\nas prop se tag badlo — <Text as=\"h1\" /> vs as=\"p\".\n\nSeedha matlab:\nEk component multiple HTML elements render kar sakta hai.\nDesign systems me common — polymorphic component.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Text({ as: Tag = \"p\", children }) {\n  return <Tag>{children}</Tag>;\n}\n// use: <Text as=\"h1\">Title</Text>  <Text>Paragraph</Text>"
          },
          {
            "title": "Q15: Wrapper component pattern",
            "explain": "Kya karna hai:\nStyledBox — className + children wrap kare.\n\nSeedha matlab:\nShared styling/layout bina har jagah div repeat kiye.\nprops spread se onClick etc pass through (03).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function StyledBox({ className = \"\", children, ...rest }) {\n  return (\n    <div className={`box ${className}`} {...rest}>\n      {children}\n    </div>\n  );\n}"
          },
          {
            "title": "Q16: [MID] Render me side-effect anti-pattern",
            "explain": "Kya karna hai:\nRender ke dauran fetch/alert/localStorage MAT karo.\n\nSeedha matlab:\nSide effects = useEffect (09) ya event handlers.\nRender = sirf UI calculate. Violation = bugs + slow re-renders.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function SafeCounter({ count }) {\n  // ❌ render me: console.log(\"side effect every render\");\n  return <p>Count: {count}</p>;\n}"
          },
          {
            "title": "Q17: [MID] Component variable me store (careful)",
            "explain": "Kya karna hai:\nconst Widget = condition ? A : B; return <Widget /> — valid pattern.\n\nSeedha matlab:\nComponent reference variable me rakh ke render — dynamic choice.\nCapital letter variable = React component treat karega.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Icon({ big }) {\n  const Size = big ? BigIcon : SmallIcon;\n  return <Size />;\n}\n\nfunction BigIcon() {\n  return <span>🔵</span>;\n}\n\nfunction SmallIcon() {\n  return <span>•</span>;\n}"
          },
          {
            "title": "Q18: [ADV] Higher-order layout — children function nahi, JSX",
            "explain": "Kya karna hai:\nAuthGate — allowed false to fallback, warna children.\n\nSeedha matlab:\nWrapper decides render based on logic — composition + early return.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function AuthGate({ allowed, fallback, children }) {\n  if (!allowed) return fallback ?? <p>Login required</p>;\n  return children;\n}"
          },
          {
            "title": "Q19: [ADV] List of components pattern",
            "explain": "Kya karna hai:\nsections array me { id, Component } — map se render.\n\nSeedha matlab:\nConfig-driven UI. Dashboard tabs, wizard steps — data se component pick.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function SectionA() {\n  return <p>Section A</p>;\n}\n\nfunction SectionB() {\n  return <p>Section B</p>;\n}\n\nconst SECTIONS = [\n  { id: \"a\", Component: SectionA },\n  { id: \"b\", Component: SectionB },\n];\n\nfunction SectionList() {\n  return (\n    <div>\n      {SECTIONS.map(({ id, Component }) => (\n        <Component key={id} />\n      ))}\n    </div>\n  );\n}"
          },
          {
            "title": "Q20: [ADV] Memo-friendly — props stable rakho soch",
            "explain": "Kya karna hai:\nInline object/function har render naya — memo child ko confuse (16).\n\nSeedha matlab:\nfunction PriceRow({ style, onBuy }) — parent me inline {} / () => har bar new ref.\nAbhi basics; memo baad me — lekin component design me yaad rakho.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function PriceRow({ label, price }) {\n  return (\n    <p>\n      {label}: ₹{price}\n    </p>\n  );\n}\n\nfunction PriceList() {\n  const items = [\n    { label: \"Chai\", price: 20 },\n    { label: \"Samosa\", price: 15 },\n  ];\n  return (\n    <div>\n      {items.map((item) => (\n        <PriceRow key={item.label} {...item} />\n      ))}\n    </div>\n  );\n}"
          },
          {
            "title": "Q21: [ADV] Single responsibility component",
            "explain": "Kya karna hai:\nFetch + UI + form ek function me mat ghusao — split karo.\n\nSeedha matlab:\nReal-world: UserList (display) + useUsers (data hook 11) alag.\nTest aur reuse easy hota hai.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function TodoItem({ text, done }) {\n  return (\n    <li style={{ textDecoration: done ? \"line-through\" : \"none\" }}>{text}</li>\n  );\n}\n\nfunction TodoList({ items }) {\n  return (\n    <ul>\n      {items.map((t) => (\n        <TodoItem key={t.id} text={t.text} done={t.done} />\n      ))}\n    </ul>\n  );\n}"
          },
          {
            "title": "Q22: [ADV] Interview trap — lowercase = DOM tag",
            "explain": "Kya karna hai:\nfunction button() {} → <button /> HTML, <Button /> component.\n\nSeedha matlab:\nLowercase name = built-in DOM element. Capital = custom component.\nBug: component import galat / typo → silent wrong element.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function CustomButton({ children }) {\n  return <button type=\"button\" className=\"custom\">{children}</button>;\n}\n\nfunction ButtonTrapDemo() {\n  return (\n    <div>\n      <CustomButton>Works</CustomButton>\n      {/* <button> lowercase = DOM, <CustomButton> = our component */}\n    </div>\n  );\n}"
          }
        ]
      },
      {
        "file": "03_Props.jsx",
        "title": "03 — Props",
        "kya": "Props = parent se child ko parcel. Jaise thali me namak alag table se",
        "detail": "03 — Props\nLevel: BASE  |  Sequence: pehle yeh, phir agla number\n\nLAYMAN: Props = parent se child ko parcel. Jaise thali me namak alag table se\nmaanga — child khud invent nahi karta, parent deta hai. Props READ-ONLY hain.\nChild props change nahi karta; naya data chahiye to parent state badle (lifting).\n\nSyntax: <User name=\"Ada\" age={30} /> → function User({ name, age }) { ... }\nDestructuring common hai. Default props: name = \"Guest\".\nchildren = tags ke beech wala content (15 me deep).\n\nKYUN: Data flow samajhna React ka core. Bina props ke components isolated toys.\nINTERVIEW: props immutable; one-way data flow; children prop.\nVite/React 19 project me use — teaching file.",
        "intro": "03 — Props\nLevel: BASE  |  Sequence: pehle yeh, phir agla number\n\nLAYMAN: Props = parent se child ko parcel. Jaise thali me namak alag table se\nmaanga — child khud invent nahi karta, parent deta hai. Props READ-ONLY hain.\nChild props change nahi karta; naya data chahiye to parent state badle (lifting).\n\nSyntax: <User name=\"Ada\" age={30} /> → function User({ name, age }) { ... }\nDestructuring common hai. Default props: name = \"Guest\".\nchildren = tags ke beech wala content (15 me deep).\n\nKYUN: Data flow samajhna React ka core. Bina props ke components isolated toys.\nINTERVIEW: props immutable; one-way data flow; children prop.\nVite/React 19 project me use — teaching file.",
        "questions": [
          {
            "title": "Q1: Simple string prop",
            "explain": "Kya karna hai:\n<Hello name=\"Jay\" /> — Hello me name dikhao.\n\nSeedha matlab:\nAttribute = prop. Function arg jaisa.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Hello({ name }) {\n  return <h2>Hello, {name}</h2>;\n}\n// use: <Hello name=\"Jay\" />"
          },
          {
            "title": "Q2: Number / boolean props",
            "explain": "Kya karna hai:\nage={25} (curly — number). isPro={true} ya sirf isPro.\n\nSeedha matlab:\nQuotes = string. { } = JS value. Boolean shortcut: <Badge vip /> → vip true.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Profile({ age, isPro }) {\n  return (\n    <p>\n      Age {age} — {isPro ? \"Pro\" : \"Free\"}\n    </p>\n  );\n}\n// use: <Profile age={25} isPro />"
          },
          {
            "title": "Q3: Object / array props",
            "explain": "Kya karna hai:\nuser={{ name: \"Ada\", city: \"Pune\" }} pass karo.\n\nSeedha matlab:\nComplex data object/array se jaata hai. Inline object har render naya ref —\nmemo ke sath careful (16/17).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function UserCard({ user }) {\n  return (\n    <div>\n      {user.name} · {user.city}\n    </div>\n  );\n}\n// use: <UserCard user={{ name: \"Ada\", city: \"Pune\" }} />"
          },
          {
            "title": "Q4: Default parameter",
            "explain": "Kya karna hai:\nname = \"Guest\" jab prop na aaye.\n\nSeedha matlab:\nJS default params — React me bhi kaam.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Welcome({ name = \"Guest\" }) {\n  return <p>Welcome, {name}</p>;\n}"
          },
          {
            "title": "Q5: children prop",
            "explain": "Kya karna hai:\n<Box>andar ka text</Box> — Box children render kare.\n\nSeedha matlab:\nchildren = opening/closing tag ke beech. Wrapper components ke liye gold.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Box({ children }) {\n  return <div className=\"box\">{children}</div>;\n}\n// use: <Box><p>Inside</p></Box>"
          },
          {
            "title": "Q6: Props spread",
            "explain": "Kya karna hai:\nconst props = { title: \"Hi\", open: true }; <Modal {...props} />\n\nSeedha matlab:\nSpread saari keys pass. Handy lekin overuse = unclear API.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Modal({ title, open }) {\n  if (!open) return null;\n  return <dialog open>{title}</dialog>;\n}\n// use: const p = { title: \"Hi\", open: true }; <Modal {...p} />"
          },
          {
            "title": "Q7: [MID] Props are read-only",
            "explain": "Kya karna hai:\nChild me props.name = \"x\" MAT karo. Parent se naya prop aaye.\n\nSeedha matlab:\nMutation = bugs + React assumptions tootna. One-way: parent → child.\nChange chahiye? Callback prop upar bhejo (lifting — 14).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Bad({ label }) {\n  // label = \"hack\"; // ❌ mat karo\n  return <span>{label}</span>;\n}\n\nfunction GoodParent() {\n  const [label, setLabel] = useState(\"ok\");\n  return <button onClick={() => setLabel(\"changed\")}>{label}</button>;\n}"
          },
          {
            "title": "Q8: [MID] Callback as prop",
            "explain": "Kya karna hai:\nChild button pe onSave call kare — parent handler pass kare.\n\nSeedha matlab:\nChild event parent ko batata hai. Data upar, UI neeche — common pattern.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function SaveButton({ onSave }) {\n  return <button onClick={onSave}>Save</button>;\n}\n\nfunction Editor() {\n  function handleSave() {\n    console.log(\"saved\");\n  }\n  return <SaveButton onSave={handleSave} />;\n}"
          },
          {
            "title": "Q9: children — special prop (nested JSX)",
            "explain": "Kya karna hai:\nPanel title + children alag slots — flexible wrapper.\n\nSeedha matlab:\nchildren explicit prop hai — <Panel>...</Panel> se aata hai.\nMultiple slots baad me (header/footer props ya compound components).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function PanelWrap({ title, children }) {\n  return (\n    <section>\n      <h3>{title}</h3>\n      <div>{children}</div>\n    </section>\n  );\n}"
          },
          {
            "title": "Q10: Default props — destructuring default",
            "explain": "Kya karna hai:\nsize = \"md\", variant = \"primary\" jab parent na bheje.\n\nSeedha matlab:\nJS default params modern way. Purani: Component.defaultProps (deprecated feel).\nundefined pe default lagta hai; null pe nahi.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Button({ label, size = \"md\", variant = \"primary\" }) {\n  return (\n    <button className={`btn btn-${size} btn-${variant}`}>{label}</button>\n  );\n}"
          },
          {
            "title": "Q11: [MID] Prop drilling intro",
            "explain": "Kya karna hai:\nApp → Layout → Nav → Link tak theme pass — beech ke sirf forward.\n\nSeedha matlab:\nDrilling = har level pe prop pass jab beech wale use nahi karte.\nThoda OK; bahut deep = Context (13) ya composition rethink.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function ThemeLink({ theme, href, children }) {\n  return (\n    <a href={href} style={{ color: theme }}>\n      {children}\n    </a>\n  );\n}\n\nfunction NavBar({ theme }) {\n  return (\n    <nav>\n      <ThemeLink theme={theme} href=\"/\">\n        Home\n      </ThemeLink>\n    </nav>\n  );\n}\n\nfunction AppShell({ theme }) {\n  return (\n    <div>\n      <NavBar theme={theme} />\n    </div>\n  );\n}"
          },
          {
            "title": "Q12: Spread props pass-through",
            "explain": "Kya karna hai:\nInput wrapper — {...inputProps} native input pe forward.\n\nSeedha matlab:\nParent se saari valid input props neeche. Wrapper apne props alag rakhe.\nPick/omit careful — security me unwanted props mat forward (DOM).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function TextField({ label, ...inputProps }) {\n  return (\n    <label>\n      {label}\n      <input {...inputProps} />\n    </label>\n  );\n}\n// use: <TextField label=\"Name\" type=\"text\" placeholder=\"Ada\" />"
          },
          {
            "title": "Q13: Boolean props shorthand",
            "explain": "Kya karna hai:\n<Input disabled /> = disabled={true}. Explicit false alag.\n\nSeedha matlab:\nJSX me attribute bina value = true. false ke liye disabled={false} likho.\nInterview: <Checkbox checked /> vs checked={isChecked}.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function SubmitBtn({ disabled, loading }) {\n  return (\n    <button disabled={disabled || loading}>\n      {loading ? \"...\" : \"Submit\"}\n    </button>\n  );\n}\n// use: <SubmitBtn disabled />  <SubmitBtn loading={false} />"
          },
          {
            "title": "Q14: Callback prop with argument up",
            "explain": "Kya karna hai:\nListItem click pe id parent ko bheje — onSelect(id).\n\nSeedha matlab:\nChild data upar batata hai. Parent state update karega.\nArrow wrap: onClick={() => onSelect(id)} — id bind.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function ListItem({ id, label, onSelect }) {\n  return (\n    <li>\n      <button type=\"button\" onClick={() => onSelect(id)}>\n        {label}\n      </button>\n    </li>\n  );\n}\n\nfunction SelectList() {\n  const [picked, setPicked] = useState(null);\n  const items = [\n    { id: 1, label: \"Chai\" },\n    { id: 2, label: \"Coffee\" },\n  ];\n  return (\n    <div>\n      <ul>\n        {items.map((item) => (\n          <ListItem\n            key={item.id}\n            id={item.id}\n            label={item.label}\n            onSelect={setPicked}\n          />\n        ))}\n      </ul>\n      <p>Picked: {picked ?? \"none\"}</p>\n    </div>\n  );\n}"
          },
          {
            "title": "Q15: [MID] Render props light (function as child)",
            "explain": "Kya karna hai:\nDataProvider children ko function de — {data => <UI />}.\n\nSeedha matlab:\n\"Render prop\" = parent data/logic, child decide UI kaise.\nHooks aane ke baad kam common; phir bhi libraries me dikhega.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function DataProvider({ value, children }) {\n  return children(value);\n}\n\nfunction RenderPropDemo() {\n  return (\n    <DataProvider value={{ count: 42 }}>\n      {(data) => <p>Count from provider: {data.count}</p>}\n    </DataProvider>\n  );\n}"
          },
          {
            "title": "Q16: Prop types mental model (no library required)",
            "explain": "Kya karna hai:\nSocho API: name string, age number, onSave function — galat type = bug.\n\nSeedha matlab:\nTypeScript / PropTypes runtime check — team choose kare.\nMental model: component = function with documented input shape.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function TypedUser({ name, age, onSave }) {\n  // TS me: interface { name: string; age: number; onSave: () => void }\n  return (\n    <div>\n      <p>\n        {name}, {age}\n      </p>\n      <button type=\"button\" onClick={onSave}>\n        Save\n      </button>\n    </div>\n  );\n}"
          },
          {
            "title": "Q17: [MID] Mutating props — anti-pattern detail",
            "explain": "Kya karna hai:\nprops.items.push() ❌ — parent ka array mutate. Copy/filter parent me.\n\nSeedha matlab:\nProps reference share ho sakta hai. Child mutate = parent bhi change — React confuse.\nOne-way flow tod deta hai. Immutable updates hamesha.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function ItemCount({ items }) {\n  // ❌ items.push(\"new\") — parent state corrupt\n  return <p>{items.length} items</p>;\n}\n\nfunction ItemCountParent() {\n  const [items, setItems] = useState([\"a\", \"b\"]);\n  function addItem() {\n    setItems([...items, \"c\"]); // parent me update ✅\n  }\n  return (\n    <div>\n      <ItemCount items={items} />\n      <button type=\"button\" onClick={addItem}>\n        Add\n      </button>\n    </div>\n  );\n}"
          },
          {
            "title": "Q18: key prop special — component ko nahi milti",
            "explain": "Kya karna hai:\n<Row key={id} id={id} /> — Row me props.key undefined (React use karta hai).\n\nSeedha matlab:\nkey React ke liye hai — reconciliation. Component ke andar access mat karo.\nSame data chahiye? id alag prop pass karo.\nInterview trap: key={index} list reorder pe bugs.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Row({ id, label }) {\n  return (\n    <tr>\n      <td>{id}</td>\n      <td>{label}</td>\n    </tr>\n  );\n}\n\nfunction RowList({ rows }) {\n  return (\n    <tbody>\n      {rows.map((row) => (\n        <Row key={row.id} id={row.id} label={row.label} />\n      ))}\n    </tbody>\n  );\n}"
          },
          {
            "title": "Q19: [ADV] Rest props omit pattern",
            "explain": "Kya karna hai:\nconst { className, ...rest } = props — sirf safe DOM props forward.\n\nSeedha matlab:\nCustom props (isLoading) DOM pe mat bhejo — React warning.\nDestructure karke alag karo, phir ...rest spread.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function FancyDiv({ isLoading, className, children, ...domProps }) {\n  return (\n    <div className={`fancy ${isLoading ? \"loading\" : \"\"} ${className}`} {...domProps}>\n      {children}\n    </div>\n  );\n}"
          },
          {
            "title": "Q20: [ADV] Optional chaining props",
            "explain": "Kya karna hai:\nuser?.name jab user null ho sakta hai — crash avoid.\n\nSeedha matlab:\nProps kabhi undefined — defensive render. Fallback UI ya skeleton.\nParent ko ideally consistent shape bhejna better.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function ProfileOptional({ user }) {\n  if (!user) return <p>No user</p>;\n  return (\n    <p>\n      {user.name} · {user.city ?? \"Unknown city\"}\n    </p>\n  );\n}"
          },
          {
            "title": "Q21: [ADV] Props vs state boundary",
            "explain": "Kya karna hai:\nProp = external input. Local edit? copy to state (08 controlled pattern).\n\nSeedha matlab:\nChild props directly edit nahi kar sakta — local draft state banao.\nSave pe callback se parent ko naya value bhejo.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function EditableLabel({ value, onChange }) {\n  const [draft, setDraft] = useState(value);\n  return (\n    <div>\n      <input value={draft} onChange={(e) => setDraft(e.target.value)} />\n      <button type=\"button\" onClick={() => onChange(draft)}>\n        Apply\n      </button>\n    </div>\n  );\n}"
          },
          {
            "title": "Q22: [ADV] Interview trap — spread unknown props",
            "explain": "Kya karna hai:\n{...props} sab kuch DOM pe — custom props leak = warning / XSS surface.\n\nSeedha matlab:\nExplicit API > blind spread. Whitelist props ya TypeScript strict.\nReal-world: UI library wrappers me common mistake.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function SafeLink({ href, children, className }) {\n  // ✅ sirf known props — no blind {...unknown}\n  return (\n    <a href={href} className={className} rel=\"noopener noreferrer\">\n      {children}\n    </a>\n  );\n}"
          }
        ]
      },
      {
        "file": "04_UseState.jsx",
        "title": "04 — useState",
        "kya": "useState = dabbe me value + \"dabba badalne wala button\".",
        "detail": "04 — useState\nLevel: BASE  |  Sequence: pehle yeh, phir agla number\n\nLAYMAN: useState = dabbe me value + \"dabba badalne wala button\".\nJaise chai counter: cups = 0, har order pe cups++. Screen khud update.\nconst [count, setCount] = useState(0) — count padho, setCount se likho.\n\nsetCount(5) direct. setCount(c => c + 1) jab purani value pe depend.\nObject/array update: naya copy banao (spread), mutate mat karo.\n\nKYUN: Interactive UI ka dil. Bina state ke sirf static page.\nINTERVIEW: async batching; functional updater; don't mutate state.\nVite/React 19 project me use — teaching file.",
        "intro": "04 — useState\nLevel: BASE  |  Sequence: pehle yeh, phir agla number\n\nLAYMAN: useState = dabbe me value + \"dabba badalne wala button\".\nJaise chai counter: cups = 0, har order pe cups++. Screen khud update.\nconst [count, setCount] = useState(0) — count padho, setCount se likho.\n\nsetCount(5) direct. setCount(c => c + 1) jab purani value pe depend.\nObject/array update: naya copy banao (spread), mutate mat karo.\n\nKYUN: Interactive UI ka dil. Bina state ke sirf static page.\nINTERVIEW: async batching; functional updater; don't mutate state.\nVite/React 19 project me use — teaching file.",
        "questions": [
          {
            "title": "Q1: Counter basics",
            "explain": "Kya karna hai:\ncount 0 se start, button pe +1.\n\nSeedha matlab:\nsetCount se UI dubara paint. Direct count++ kaam nahi — React nahi sunega.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Counter() {\n  const [count, setCount] = useState(0);\n  return (\n    <button onClick={() => setCount(count + 1)}>Count: {count}</button>\n  );\n}"
          },
          {
            "title": "Q2: Toggle boolean",
            "explain": "Kya karna hai:\nisOpen true/false flip — Show/Hide.\n\nSeedha matlab:\nBoolean state = lights switch. UI conditional (06) se jodna.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Toggle() {\n  const [isOpen, setIsOpen] = useState(false);\n  return (\n    <div>\n      <button onClick={() => setIsOpen(!isOpen)}>\n        {isOpen ? \"Hide\" : \"Show\"}\n      </button>\n      {isOpen && <p>Secret panel</p>}\n    </div>\n  );\n}"
          },
          {
            "title": "Q3: String input state (preview)",
            "explain": "Kya karna hai:\nname state, input pe setName — controlled feel (08 deep).\n\nSeedha matlab:\nHar keystroke pe state = source of truth.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function NameBox() {\n  const [name, setName] = useState(\"\");\n  return (\n    <div>\n      <input value={name} onChange={(e) => setName(e.target.value)} />\n      <p>Hi, {name || \"stranger\"}</p>\n    </div>\n  );\n}"
          },
          {
            "title": "Q4: Functional updater",
            "explain": "Kya karna hai:\nsetCount(c => c + 1) teen baar ek click pe — sahi +3.\n\nSeedha matlab:\ncount + 1 teen baar stale value use kar sakta hai.\nUpdater hamesha latest pe chalta hai.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function TripleAdd() {\n  const [count, setCount] = useState(0);\n  function addThree() {\n    setCount((c) => c + 1);\n    setCount((c) => c + 1);\n    setCount((c) => c + 1);\n  }\n  return <button onClick={addThree}>{count}</button>;\n}"
          },
          {
            "title": "Q5: Object state — immutable update",
            "explain": "Kya karna hai:\nuser = { name, age }. Sirf age badlo — spread se naya object.\n\nSeedha matlab:\nuser.age++ ❌. setUser({ ...user, age: user.age + 1 }) ✅",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function UserAge() {\n  const [user, setUser] = useState({ name: \"Ada\", age: 30 });\n  return (\n    <button\n      onClick={() => setUser({ ...user, age: user.age + 1 })}\n    >\n      {user.name} is {user.age}\n    </button>\n  );\n}"
          },
          {
            "title": "Q6: Array state — add item",
            "explain": "Kya karna hai:\ntodos me naya item push bina mutate.\n\nSeedha matlab:\nsetTodos([...todos, \"new\"]) ya filter/map se naya array.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function TodoAdd() {\n  const [todos, setTodos] = useState([\"milk\"]);\n  return (\n    <div>\n      <button onClick={() => setTodos([...todos, \"bread\"])}>Add bread</button>\n      <ul>\n        {todos.map((t) => (\n          <li key={t}>{t}</li>\n        ))}\n      </ul>\n    </div>\n  );\n}"
          },
          {
            "title": "Q7: [MID] Lazy initial state",
            "explain": "Kya karna hai:\nuseState(() => heavyCompute()) — function form jab init mehengi ho.\n\nSeedha matlab:\nuseState(heavy()) har render pe chalega. useState(() => heavy()) ek baar.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function ExpensiveInit() {\n  const [data] = useState(() => {\n    // socho: localStorage parse / big calc — ek baar\n    return { ready: true };\n  });\n  return <pre>{JSON.stringify(data)}</pre>;\n}"
          },
          {
            "title": "Q8: [MID] Multiple related states vs one object",
            "explain": "Kya karna hai:\nform fields alag useState YA ek object — tradeoff.\n\nSeedha matlab:\nRelated fields object me theek. Bahut independent → alag states.\nComplex logic → useReducer (12).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function FormBits() {\n  const [email, setEmail] = useState(\"\");\n  const [password, setPassword] = useState(\"\");\n  return (\n    <>\n      <input value={email} onChange={(e) => setEmail(e.target.value)} />\n      <input\n        type=\"password\"\n        value={password}\n        onChange={(e) => setPassword(e.target.value)}\n      />\n    </>\n  );\n}"
          },
          {
            "title": "Q9: [MID] Batching — ek event me multiple setState",
            "explain": "Kya karna hai:\nEk click pe setA + setB — React 18 me ek hi re-render (auto batch).\n\nSeedha matlab:\nPehle sync handlers me batch hota tha; ab async/timeouts me bhi (18+).\nPerformance win — har set pe paint nahi.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function BatchDemo() {\n  const [a, setA] = useState(0);\n  const [b, setB] = useState(0);\n  function bumpBoth() {\n    setA((x) => x + 1);\n    setB((x) => x + 1);\n    // React batches → usually 1 re-render\n  }\n  return (\n    <button type=\"button\" onClick={bumpBoth}>\n      a={a} b={b}\n    </button>\n  );\n}"
          },
          {
            "title": "Q10: Stale state trap",
            "explain": "Kya karna hai:\nsetCount(count + 1) do baar fast — +1 hi hoga, +2 nahi.\n\nSeedha matlab:\ncount closure purani value pakad sakta hai. Functional updater use karo.\nInterview classic: \"Why +1 twice gives +1?\"",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function StaleTrap() {\n  const [count, setCount] = useState(0);\n  function doubleBad() {\n    setCount(count + 1);\n    setCount(count + 1); // dono same stale count use — +1 total\n  }\n  function doubleGood() {\n    setCount((c) => c + 1);\n    setCount((c) => c + 1); // +2 total ✅\n  }\n  return (\n    <div>\n      <p>{count}</p>\n      <button type=\"button\" onClick={doubleBad}>\n        Bad +2?\n      </button>\n      <button type=\"button\" onClick={doubleGood}>\n        Good +2\n      </button>\n    </div>\n  );\n}"
          },
          {
            "title": "Q11: Lazy init recap — expensive only once",
            "explain": "Kya karna hai:\nuseState(readFromStorage) vs useState(() => readFromStorage()).\n\nSeedha matlab:\nDirect call = har render pe function chalega (React ignore karega result lekin cost hai).\nLazy function = init render pe ek baar.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function LazyStorage() {\n  const [token] = useState(() => {\n    // imagine: JSON.parse(localStorage.getItem(\"t\") ?? \"null\")\n    return \"cached-once\";\n  });\n  return <code>{token}</code>;\n}"
          },
          {
            "title": "Q12: [MID] Derived state anti-pattern",
            "explain": "Kya karna hai:\nprops se aaya data ko useState me copy MAT karo sync ke liye.\n\nSeedha matlab:\nfullName = first + last — render me calculate karo, alag state nahi.\nprops → state copy = out of sync bugs jab parent update kare.\nException: user edit draft (08) — intentional local copy.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function FullName({ first, last }) {\n  const fullName = `${first} ${last}`.trim(); // derived — no extra state\n  return <p>{fullName}</p>;\n}"
          },
          {
            "title": "Q13: Reset state with key",
            "explain": "Kya karna hai:\nForm reset — parent key={userId} badle to child fresh state.\n\nSeedha matlab:\nkey change = React naya component maan ke state zero se.\nuseEffect ke bina \"reset on prop change\" ka clean trick.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function UserForm({ userId }) {\n  const [note, setNote] = useState(\"\");\n  return (\n    <input\n      value={note}\n      onChange={(e) => setNote(e.target.value)}\n      placeholder={`Notes for user ${userId}`}\n    />\n  );\n}\n\nfunction UserFormReset() {\n  const [userId, setUserId] = useState(1);\n  return (\n    <div>\n      <button type=\"button\" onClick={() => setUserId((u) => u + 1)}>\n        Switch user\n      </button>\n      <UserForm key={userId} userId={userId} />\n    </div>\n  );\n}"
          },
          {
            "title": "Q14: Updater chain — sequential updates",
            "explain": "Kya karna hai:\nTeen functional updater ek saath — order guaranteed latest pe.\n\nSeedha matlab:\nsetS(s => ...); setS(s => ...); — queue me jate hain, chain chalti hai.\nDirect setS(s+1) mix with functional — still prefer all functional if chained.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function ChainAdd() {\n  const [n, setN] = useState(0);\n  function addFive() {\n    setN((v) => v + 1);\n    setN((v) => v + 1);\n    setN((v) => v + 1);\n    setN((v) => v + 1);\n    setN((v) => v + 1);\n  }\n  return (\n    <button type=\"button\" onClick={addFive}>\n      {n}\n    </button>\n  );\n}"
          },
          {
            "title": "Q15: Array update — remove / toggle immutable",
            "explain": "Kya karna hai:\nfilter se delete, map se toggle done flag.\n\nSeedha matlab:\nsplice/mutate ❌. Naya array return = React change detect kare.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function TodoToggle() {\n  const [todos, setTodos] = useState([\n    { id: 1, text: \"milk\", done: false },\n    { id: 2, text: \"eggs\", done: false },\n  ]);\n  function toggle(id) {\n    setTodos((list) =>\n      list.map((t) => (t.id === id ? { ...t, done: !t.done } : t))\n    );\n  }\n  function remove(id) {\n    setTodos((list) => list.filter((t) => t.id !== id));\n  }\n  return (\n    <ul>\n      {todos.map((t) => (\n        <li key={t.id}>\n          <button type=\"button\" onClick={() => toggle(t.id)}>\n            {t.done ? \"☑\" : \"☐\"} {t.text}\n          </button>\n          <button type=\"button\" onClick={() => remove(t.id)}>\n            ×\n          </button>\n        </li>\n      ))}\n    </ul>\n  );\n}"
          },
          {
            "title": "Q16: Object nested immutable update",
            "explain": "Kya karna hai:\nuser.address.city badlo — spread at each level.\n\nSeedha matlab:\nShallow spread ek level. Nested = { ...user, address: { ...user.address, city: \"Mumbai\" } }.\nDeep trees ke liye Immer ya normalized state (12).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function NestedUser() {\n  const [user, setUser] = useState({\n    name: \"Ada\",\n    address: { city: \"Pune\", pin: 411001 },\n  });\n  function moveCity() {\n    setUser({\n      ...user,\n      address: { ...user.address, city: \"Mumbai\" },\n    });\n  }\n  return (\n    <button type=\"button\" onClick={moveCity}>\n      {user.name} lives in {user.address.city}\n    </button>\n  );\n}"
          },
          {
            "title": "Q17: [MID] When NOT useState",
            "explain": "Kya karna hai:\nDerived values, ref for DOM, server data → fetch + state / cache (TanStack Query).\n\nSeedha matlab:\nHar cheez state nahi: const total = price * qty — calculate in render.\nFrequent DOM read? useRef (10). Complex transitions → useReducer (12).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function CartLine({ price, qty }) {\n  const total = price * qty; // derived — useState waste\n  return (\n    <p>\n      ₹{price} × {qty} = ₹{total}\n    </p>\n  );\n}"
          },
          {
            "title": "Q18: [MID] SSR hydration note",
            "explain": "Kya karna hai:\nServer HTML + client useState initial match — warna hydration mismatch.\n\nSeedha matlab:\ntypeof window check se random initial mat do SSR pe.\nDate.now()/Math.random() first render server vs client alag → warning.\nClient-only state: useEffect me set after mount (09).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function HydrationSafe() {\n  const [mounted, setMounted] = useState(false);\n  // useEffect(() => setMounted(true), []); // real pattern — 09\n  return <p>{mounted ? \"Client ready\" : \"SSR shell\"}</p>;\n}"
          },
          {
            "title": "Q19: [ADV] React 19 useActionState contrast (brief)",
            "explain": "Kya karna hai:\nForm pending/error state — pehle manual useState; 19 me useActionState option.\n\nSeedha matlab:\nManual: const [pending, setPending] = useState(false) around submit.\nReact 19: action + useActionState form async ko simplify karta hai.\nCore useState ab bhi har jagah valid — yeh extra tool.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function ManualFormPending() {\n  const [pending, setPending] = useState(false);\n  const [error, setError] = useState(null);\n  async function submit(e) {\n    e.preventDefault();\n    setPending(true);\n    setError(null);\n    try {\n      // await save()\n    } catch (err) {\n      setError(err.message);\n    } finally {\n      setPending(false);\n    }\n  }\n  return (\n    <form onSubmit={submit}>\n      <button type=\"submit\" disabled={pending}>\n        {pending ? \"Saving...\" : \"Save\"}\n      </button>\n      {error && <p>{error}</p>}\n    </form>\n  );\n}"
          },
          {
            "title": "Q20: [ADV] State initializer with argument pattern",
            "explain": "Kya karna hai:\nFactory: useState(() => createInitial(userId)) — lazy + dynamic init.\n\nSeedha matlab:\nInit function zero-arg hota hai usually. Dynamic init ke liye closure ya key reset (Q13).\nuserId change pe state sync? key={userId} preferred over effect sync.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function ScoreBoard({ gameId }) {\n  const [score, setScore] = useState(() => 0);\n  return (\n    <p>\n      Game {gameId}: {score}{\" \"}\n      <button type=\"button\" onClick={() => setScore((s) => s + 1)}>\n        +1\n      </button>\n    </p>\n  );\n}"
          },
          {
            "title": "Q21: [ADV] Anti-pattern — too many useState calls",
            "explain": "Kya karna hai:\n15 alag useState related form me — object ya useReducer consider karo.\n\nSeedha matlab:\nRelated updates ek saath? Object/reducer se atomic update.\nSimple 2-3 fields? Alag useState clean hai — over-unify mat karo.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function SimpleForm() {\n  const [form, setForm] = useState({ name: \"\", email: \"\" });\n  function update(field, value) {\n    setForm((f) => ({ ...f, [field]: value }));\n  }\n  return (\n    <>\n      <input\n        value={form.name}\n        onChange={(e) => update(\"name\", e.target.value)}\n      />\n      <input\n        value={form.email}\n        onChange={(e) => update(\"email\", e.target.value)}\n      />\n    </>\n  );\n}"
          },
          {
            "title": "Q22: [ADV] Interview — setState async feel",
            "explain": "Kya karna hai:\nsetCount(5); console.log(count) — abhi purana count dikhega.\n\nSeedha matlab:\nsetState request schedule karta hai — turant variable update nahi.\nNaya value chahiye? functional updater ya useEffect on count (09).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function AsyncFeel() {\n  const [count, setCount] = useState(0);\n  function logAfterSet() {\n    setCount(99);\n    console.log(count); // still old — not 99 yet\n  }\n  return (\n    <button type=\"button\" onClick={logAfterSet}>\n      UI count: {count}\n    </button>\n  );\n}"
          }
        ]
      },
      {
        "file": "05_EventsHandling.jsx",
        "title": "05 — Events Handling",
        "kya": "Event = user ne kuch kiya — click, type, submit. React sunta hai",
        "detail": "05 — Events Handling\nLevel: BASE  |  Sequence: pehle yeh, phir agla number\n\nLAYMAN: Event = user ne kuch kiya — click, type, submit. React sunta hai\nonClick, onChange, onSubmit (camelCase). Handler = function jo reaction de.\n\nHTML: onclick=\"...\". React: onClick={handler} — function pass, call mat karo\njab tak args na chahiye: onClick={() => doX(id)}.\nevent.preventDefault() forms pe page refresh rokta hai.\n\nKYUN: UI tab zinda jab events pe state badle.\nINTERVIEW: synthetic events; pass vs call; preventDefault.\nVite/React 19 project me use — teaching file.",
        "intro": "05 — Events Handling\nLevel: BASE  |  Sequence: pehle yeh, phir agla number\n\nLAYMAN: Event = user ne kuch kiya — click, type, submit. React sunta hai\nonClick, onChange, onSubmit (camelCase). Handler = function jo reaction de.\n\nHTML: onclick=\"...\". React: onClick={handler} — function pass, call mat karo\njab tak args na chahiye: onClick={() => doX(id)}.\nevent.preventDefault() forms pe page refresh rokta hai.\n\nKYUN: UI tab zinda jab events pe state badle.\nINTERVIEW: synthetic events; pass vs call; preventDefault.\nVite/React 19 project me use — teaching file.",
        "questions": [
          {
            "title": "Q1: onClick basic",
            "explain": "Kya karna hai:\nButton click pe alert / console.\n\nSeedha matlab:\nonClick={fn} — reference. onClick={fn()} turant call — galat (usually).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function ClickMe() {\n  function handleClick() {\n    console.log(\"clicked\");\n  }\n  return <button onClick={handleClick}>Click</button>;\n}"
          },
          {
            "title": "Q2: Inline arrow with arg",
            "explain": "Kya karna hai:\nList item id pass karke delete.\n\nSeedha matlab:\nExtra arg chahiye to () => handler(id). Warna event object milta hai.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Item({ id, onDelete }) {\n  return <button onClick={() => onDelete(id)}>Delete {id}</button>;\n}"
          },
          {
            "title": "Q3: onChange input",
            "explain": "Kya karna hai:\ne.target.value se state update.\n\nSeedha matlab:\nHar change pe naya value. Controlled input ka heart.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function TypeBox() {\n  const [text, setText] = useState(\"\");\n  return (\n    <input\n      value={text}\n      onChange={(e) => setText(e.target.value)}\n      placeholder=\"Type...\"\n    />\n  );\n}"
          },
          {
            "title": "Q4: Form onSubmit + preventDefault",
            "explain": "Kya karna hai:\nForm submit pe page reload mat hone do; data log karo.\n\nSeedha matlab:\nBrowser default = full reload. SPA me preventDefault zaroori.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function LoginForm() {\n  const [email, setEmail] = useState(\"\");\n  function handleSubmit(e) {\n    e.preventDefault();\n    console.log(\"submit\", email);\n  }\n  return (\n    <form onSubmit={handleSubmit}>\n      <input value={email} onChange={(e) => setEmail(e.target.value)} />\n      <button type=\"submit\">Login</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q5: onMouseEnter / leave",
            "explain": "Kya karna hai:\nHover pe highlight state.\n\nSeedha matlab:\nMouse events bhi same pattern — handler + setState.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function HoverCard() {\n  const [hot, setHot] = useState(false);\n  return (\n    <div\n      onMouseEnter={() => setHot(true)}\n      onMouseLeave={() => setHot(false)}\n      style={{ background: hot ? \"#ffe08a\" : \"#eee\" }}\n    >\n      Hover me\n    </div>\n  );\n}"
          },
          {
            "title": "Q6: Stop propagation (bubbling)",
            "explain": "Kya karna hai:\nInner click pe outer click fire na ho — e.stopPropagation().\n\nSeedha matlab:\nEvents bubble parent tak. Kabhi andar wala alag behave kare.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function NestedClicks() {\n  return (\n    <div onClick={() => console.log(\"outer\")}>\n      <button\n        onClick={(e) => {\n          e.stopPropagation();\n          console.log(\"inner only\");\n        }}\n      >\n        Inner\n      </button>\n    </div>\n  );\n}"
          },
          {
            "title": "Q7: [MID] Disabled + loading click guard",
            "explain": "Kya karna hai:\nSaving true jab button disabled / ignore extra clicks.\n\nSeedha matlab:\nDouble submit rokna — UX + safety. disabled={saving}.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function SaveOnce() {\n  const [saving, setSaving] = useState(false);\n  async function save() {\n    if (saving) return;\n    setSaving(true);\n    // await api...\n    setSaving(false);\n  }\n  return (\n    <button onClick={save} disabled={saving}>\n      {saving ? \"Saving...\" : \"Save\"}\n    </button>\n  );\n}"
          },
          {
            "title": "Q8: [MID] Keyboard onKeyDown",
            "explain": "Kya karna hai:\nEnter pe search trigger.\n\nSeedha matlab:\nAccessibility + power users. e.key === \"Enter\".",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function SearchBox({ onSearch }) {\n  const [q, setQ] = useState(\"\");\n  return (\n    <input\n      value={q}\n      onChange={(e) => setQ(e.target.value)}\n      onKeyDown={(e) => {\n        if (e.key === \"Enter\") onSearch(q);\n      }}\n    />\n  );\n}"
          },
          {
            "title": "Q9: [MID] Synthetic events",
            "explain": "Kya karna hai:\nReact event object native jaisa dikhta hai — wrapper hai cross-browser ke liye.\n\nSeedha matlab:\ne.preventDefault(), e.target same API feel. React 17+ listener root pe attach.\nNative e.nativeEvent se underlying event (rare need).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function SyntheticDemo() {\n  function handleClick(e) {\n    e.preventDefault();\n    console.log(e.type, e.target.tagName); // SyntheticBaseEvent\n  }\n  return (\n    <a href=\"/go\" onClick={handleClick}>\n      Link\n    </a>\n  );\n}"
          },
          {
            "title": "Q10: Event pooling legacy note",
            "explain": "Kya karna hai:\nReact 16 aur pehle: async me e.persist() chahiye tha — ab nahi.\n\nSeedha matlab:\nPurane tutorials me \"pooling\" dikhega — React 17+ me removed.\nInterview: \"Can I use event async?\" — Modern React: yes, no persist needed.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function AsyncEventOk() {\n  async function handleClick(e) {\n    console.log(e.type); // safe in React 17+\n    await new Promise((r) => setTimeout(r, 100));\n    console.log(\"after await\", e.type); // still ok — no e.persist()\n  }\n  return <button type=\"button\" onClick={handleClick}>Async click</button>;\n}"
          },
          {
            "title": "Q11: preventDefault vs stopPropagation",
            "explain": "Kya karna hai:\nLink click: preventDefault = navigate roko. stopPropagation = bubble roko.\n\nSeedha matlab:\nDono alag kaam. Form submit → preventDefault. Modal inner click → stopPropagation.\nKabhi dono chahiye; confuse mat karo.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function PreventVsStop() {\n  return (\n    <div onClick={() => console.log(\"card click\")}>\n      <a\n        href=\"#\"\n        onClick={(e) => {\n          e.preventDefault(); // hash change / nav roko\n          e.stopPropagation(); // card handler fire na ho\n          console.log(\"link only\");\n        }}\n      >\n        Action\n      </a>\n    </div>\n  );\n}"
          },
          {
            "title": "Q12: onClick vs onMouseDown",
            "explain": "Kya karna hai:\nMouseDown pehle fire — drag/select se pehle action chahiye to mousedown.\n\nSeedha matlab:\nClick = mousedown + mouseup same element. UI feel alag ho sakta hai.\nExample: color picker instant — onMouseDown. Normal buttons — onClick.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function DownVsClick() {\n  const [msg, setMsg] = useState(\"\");\n  return (\n    <div>\n      <button\n        type=\"button\"\n        onMouseDown={() => setMsg(\"down first\")}\n        onClick={() => setMsg(\"click after\")}\n      >\n        Press me\n      </button>\n      <p>{msg}</p>\n    </div>\n  );\n}"
          },
          {
            "title": "Q13: Keyboard — Escape close pattern",
            "explain": "Kya karna hai:\nonKeyDown me e.key === \"Escape\" → modal band.\n\nSeedha matlab:\nAccessibility: keyboard users bhi same UX. Tab focus alag topic (a11y).\ne.key preferred over keyCode (deprecated).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function EscapeModal({ open, onClose }) {\n  if (!open) return null;\n  return (\n    <div\n      role=\"dialog\"\n      tabIndex={-1}\n      onKeyDown={(e) => {\n        if (e.key === \"Escape\") onClose();\n      }}\n    >\n      <p>Press Escape</p>\n      <button type=\"button\" onClick={onClose}>\n        Close\n      </button>\n    </div>\n  );\n}\n\nfunction EscapeDemo() {\n  const [open, setOpen] = useState(false);\n  return (\n    <div>\n      <button type=\"button\" onClick={() => setOpen(true)}>\n        Open\n      </button>\n      <EscapeModal open={open} onClose={() => setOpen(false)} />\n    </div>\n  );\n}"
          },
          {
            "title": "Q14: Form submit — button type matters",
            "explain": "Kya karna hai:\n<button type=\"submit\"> form submit. type=\"button\" se accidental submit nahi.\n\nSeedha matlab:\nDefault button type inside form = submit (HTML). Extra buttons → type=\"button\".\nInterview trap: \"Why page reloads?\" — submit without preventDefault.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function MultiButtonForm() {\n  const [log, setLog] = useState(\"\");\n  function handleSubmit(e) {\n    e.preventDefault();\n    setLog(\"submitted\");\n  }\n  return (\n    <form onSubmit={handleSubmit}>\n      <button type=\"button\" onClick={() => setLog(\"draft saved\")}>\n        Save draft\n      </button>\n      <button type=\"submit\">Publish</button>\n      <p>{log}</p>\n    </form>\n  );\n}"
          },
          {
            "title": "Q15: Passing multiple args to handler",
            "explain": "Kya karna hai:\nonClick={() => moveItem(id, direction)} — curry ya inline arrow.\n\nSeedha matlab:\nHandler signature fix ho to bind/curry: const onMove = (id) => (dir) => ...\nInline arrow sabse readable beginners ke liye.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function MoveRow({ id, label, onMove }) {\n  return (\n    <div>\n      {label}\n      <button type=\"button\" onClick={() => onMove(id, \"up\")}>\n        ↑\n      </button>\n      <button type=\"button\" onClick={() => onMove(id, \"down\")}>\n        ↓\n      </button>\n    </div>\n  );\n}\n\nfunction MoveList() {\n  const [order, setOrder] = useState([\"a\", \"b\", \"c\"]);\n  function move(id, dir) {\n    setOrder((items) => {\n      const i = items.indexOf(id);\n      if (i < 0) return items;\n      const j = dir === \"up\" ? i - 1 : i + 1;\n      if (j < 0 || j >= items.length) return items;\n      const next = [...items];\n      [next[i], next[j]] = [next[j], next[i]];\n      return next;\n    });\n  }\n  return (\n    <div>\n      {order.map((id) => (\n        <MoveRow key={id} id={id} label={id} onMove={move} />\n      ))}\n    </div>\n  );\n}"
          },
          {
            "title": "Q16: [MID] Stale closure in event handler",
            "explain": "Kya karna hai:\nsetTimeout me purana count — functional setState ya ref fix (10).\n\nSeedha matlab:\nHandler banate waqt closure capture hota hai. Async delay = stale value risk.\nFix: setCount(c => c + 1) ya countRef.current.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function StaleHandler() {\n  const [count, setCount] = useState(0);\n  function delayedBad() {\n    setTimeout(() => {\n      setCount(count + 1); // stale count inside timeout\n    }, 1000);\n  }\n  function delayedGood() {\n    setTimeout(() => {\n      setCount((c) => c + 1); // always fresh ✅\n    }, 1000);\n  }\n  return (\n    <div>\n      <p>{count}</p>\n      <button type=\"button\" onClick={delayedBad}>\n        Bad delay +1\n      </button>\n      <button type=\"button\" onClick={delayedGood}>\n        Good delay +1\n      </button>\n    </div>\n  );\n}"
          },
          {
            "title": "Q17: [MID] Event delegation mental model",
            "explain": "Kya karna hai:\nReact 17+ root pe listeners — har button pe alag native listener nahi lagta feel.\n\nSeedha matlab:\nDelegation = kam memory, dynamic list friendly. React internally optimize karta hai.\nTumhein usually kuch extra nahi karna — samajh interview ke liye.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function DelegatedList({ items, onPick }) {\n  return (\n    <ul\n      onClick={(e) => {\n        const li = e.target.closest(\"[data-id]\");\n        if (li) onPick(li.dataset.id);\n      }}\n    >\n      {items.map((id) => (\n        <li key={id} data-id={id}>\n          Item {id}\n        </li>\n      ))}\n    </ul>\n  );\n}"
          },
          {
            "title": "Q18: onBlur / onFocus — field touch tracking",
            "explain": "Kya karna hai:\nBlur pe \"touched\" true — validation message dikhao.\n\nSeedha matlab:\nChange = har keystroke. Blur = user field chhod gaya — UX validation timing.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function TouchedField() {\n  const [value, setValue] = useState(\"\");\n  const [touched, setTouched] = useState(false);\n  const showError = touched && value.length < 3;\n  return (\n    <div>\n      <input\n        value={value}\n        onChange={(e) => setValue(e.target.value)}\n        onBlur={() => setTouched(true)}\n      />\n      {showError && <small>Min 3 chars</small>}\n    </div>\n  );\n}"
          },
          {
            "title": "Q19: [ADV] Custom event payload object",
            "explain": "Kya karna hai:\nonChange({ name, value }) — native event se zyada app-specific API.\n\nSeedha matlab:\nDesign system components native event expose na kare — simpler parent API.\nTradeoff: flexibility vs convenience.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Field({ name, value, onChange }) {\n  return (\n    <input\n      value={value}\n      onChange={(e) => onChange({ name, value: e.target.value })}\n    />\n  );\n}\n\nfunction FieldForm() {\n  const [fields, setFields] = useState({ city: \"\" });\n  function handleChange({ name, value }) {\n    setFields((f) => ({ ...f, [name]: value }));\n  }\n  return <Field name=\"city\" value={fields.city} onChange={handleChange} />;\n}"
          },
          {
            "title": "Q20: [ADV] Passive scroll / touch — rare",
            "explain": "Kya karna hai:\npreventDefault scroll pe block ho sakta hai — mostly native feel chhod do.\n\nSeedha matlab:\nTouch/wheel listeners me browser passive default — React me usually issue nahi.\nCustom drag scroll library banate waqt dhyaan.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function ScrollBox() {\n  return (\n    <div style={{ overflow: \"auto\", height: 80 }} onScroll={() => {}}>\n      Long content line<br />Line 2<br />Line 3<br />Line 4\n    </div>\n  );\n}"
          },
          {
            "title": "Q21: [ADV] onDoubleClick pattern",
            "explain": "Kya karna hai:\nDouble click edit mode — single vs double alag handlers.\n\nSeedha matlab:\nTiming: double-click delay ke beech do single click fire ho sakte — design careful.\nAlternative: explicit Edit button — clearer UX.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function DoubleEdit() {\n  const [editing, setEditing] = useState(false);\n  const [text, setText] = useState(\"Double-click me\");\n  if (editing) {\n    return (\n      <input\n        autoFocus\n        value={text}\n        onChange={(e) => setText(e.target.value)}\n        onBlur={() => setEditing(false)}\n      />\n    );\n  }\n  return (\n    <span onDoubleClick={() => setEditing(true)}>{text}</span>\n  );\n}"
          },
          {
            "title": "Q22: [ADV] Anti-pattern — inline handler har render naya",
            "explain": "Kya karna hai:\nonClick={() => ...} har render new function — memo child ko tod sakta hai (16).\n\nSeedha matlab:\nSimple apps me fine. Heavy lists + React.memo → useCallback (17) ya stable handler.\nPremature useCallback bhi cost — profile pe optimize karo.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function MemoRow({ label, onClick }) {\n  return (\n    <button type=\"button\" onClick={onClick}>\n      {label}\n    </button>\n  );\n}\n\nfunction InlineHandlerList() {\n  const items = [\"x\", \"y\", \"z\"];\n  function pick(item) {\n    console.log(item);\n  }\n  return (\n    <div>\n      {items.map((item) => (\n        <MemoRow\n          key={item}\n          label={item}\n          onClick={() => pick(item)} // new fn each render — memo help limited\n        />\n      ))}\n    </div>\n  );\n}"
          }
        ]
      },
      {
        "file": "06_ConditionalRendering.jsx",
        "title": "06 — Conditional Rendering",
        "kya": "Kabhi UI dikhao, kabhi mat dikhao — jaise fridge light: door khuli",
        "detail": "06 — Conditional Rendering\nLevel: BASE  |  Sequence: pehle yeh, phir agla number\n\nLAYMAN: Kabhi UI dikhao, kabhi mat dikhao — jaise fridge light: door khuli\nto on. React me if/return, && , ternary (? :) se decide.\n\n&& : left truthy ho to right dikhao. Careful: 0 && <X /> → 0 screen pe!\nTernary: A ? <Yes /> : <No />. null return = kuch mat dikhao.\n\nKYUN: Loading, error, empty, auth — har real app conditional.\nINTERVIEW: && pitfall with 0; early return; null vs false.\nVite/React 19 project me use — teaching file.\n\n-----------------------------------------------------------------------------\nQ1: Ternary Show / Hide\n\nKya karna hai:\nloggedIn ? <Dash /> : <Login />",
        "intro": "06 — Conditional Rendering\nLevel: BASE  |  Sequence: pehle yeh, phir agla number\n\nLAYMAN: Kabhi UI dikhao, kabhi mat dikhao — jaise fridge light: door khuli\nto on. React me if/return, && , ternary (? :) se decide.\n\n&& : left truthy ho to right dikhao. Careful: 0 && <X /> → 0 screen pe!\nTernary: A ? <Yes /> : <No />. null return = kuch mat dikhao.\n\nKYUN: Loading, error, empty, auth — har real app conditional.\nINTERVIEW: && pitfall with 0; early return; null vs false.\nVite/React 19 project me use — teaching file.\n\n-----------------------------------------------------------------------------\nQ1: Ternary Show / Hide\n\nKya karna hai:\nloggedIn ? <Dash /> : <Login />",
        "questions": [
          {
            "title": "Q1: Ternary Show / Hide",
            "explain": "Kya karna hai:\nloggedIn ? <Dash /> : <Login />\n\nSeedha matlab:\nDo clear branches. Readable for A vs B.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Gate({ loggedIn }) {\n  return loggedIn ? <p>Dashboard</p> : <p>Please login</p>;\n}"
          },
          {
            "title": "Q2: && short show",
            "explain": "Kya karna hai:\nunread > 0 && <Badge />\n\nSeedha matlab:\nSirf \"maybe show\" ke liye. Else branch nahi.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Inbox({ unread }) {\n  return (\n    <div>\n      Inbox\n      {unread > 0 && <span className=\"badge\">{unread}</span>}\n    </div>\n  );\n}"
          },
          {
            "title": "Q3: Early return loading",
            "explain": "Kya karna hai:\nif (loading) return <Spinner />; return <Data />\n\nSeedha matlab:\nNested ternary avoid. Guard clauses clean.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function UserProfile({ loading, user }) {\n  if (loading) return <p>Loading...</p>;\n  if (!user) return <p>No user</p>;\n  return <h2>{user.name}</h2>;\n}"
          },
          {
            "title": "Q4: return null",
            "explain": "Kya karna hai:\nFeature flag off → component kuch render na kare.\n\nSeedha matlab:\nnull = DOM me kuch nahi. Valid React return.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function BetaBanner({ enabled }) {\n  if (!enabled) return null;\n  return <aside>Beta feature!</aside>;\n}"
          },
          {
            "title": "Q5: [MID] && with number 0 pitfall",
            "explain": "Kya karna hai:\ncount && <p>{count}</p> — count 0 pe \"0\" dikhega!\n\nSeedha matlab:\n0 falsy hai lekin React 0 render karta hai. Fix: count > 0 && ...",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function CartCount({ count }) {\n  // BAD: {count && <span>{count}</span>}  → shows 0\n  return <div>{count > 0 && <span>{count} items</span>}</div>;\n}"
          },
          {
            "title": "Q6: Multi-state UI machine (simple)",
            "explain": "Kya karna hai:\nstatus: idle | loading | error | success — switch UI.\n\nSeedha matlab:\nReal fetch UIs yahi pattern. Enum-like string status.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function FetchUI({ status, data, error }) {\n  if (status === \"loading\") return <p>Loading...</p>;\n  if (status === \"error\") return <p>Error: {error}</p>;\n  if (status === \"success\") return <pre>{JSON.stringify(data)}</pre>;\n  return <p>Idle — click fetch</p>;\n}"
          },
          {
            "title": "Q7: Toggle with conditional class",
            "explain": "Kya karna hai:\nisActive ? \"tab on\" : \"tab\" className.\n\nSeedha matlab:\nConditional styling bhi rendering ka cousin.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Tab({ isActive, label }) {\n  return (\n    <button className={isActive ? \"tab on\" : \"tab\"}>{label}</button>\n  );\n}"
          },
          {
            "title": "Q8: [MID] Element variables",
            "explain": "Kya karna hai:\nlet content = ...; ifs se set; return <div>{content}</div>\n\nSeedha matlab:\nComplex conditions JSX se pehle resolve — readable.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Message({ type }) {\n  let content;\n  if (type === \"ok\") content = <p className=\"ok\">Saved</p>;\n  else if (type === \"warn\") content = <p className=\"warn\">Check</p>;\n  else content = <p>Info</p>;\n  return <div>{content}</div>;\n}"
          },
          {
            "title": "Q9: Empty string && pitfall",
            "explain": "Kya karna hai:\nname && <Greeting /> — name \"\" ho to kuch nahi, lekin pattern samjho.\n\nSeedha matlab:\n\"\" falsy hai, render nahi hota — 0 se alag. Still explicit check safe.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Greeting({ name }) {\n  return <div>{name ? <p>Hi {name}</p> : <p>Guest</p>}</div>;\n}"
          },
          {
            "title": "Q10: null vs false vs undefined",
            "explain": "Kya karna hai:\nreturn false / null / undefined — teeno screen pe kuch nahi.\n\nSeedha matlab:\nReact inhe skip karta hai. false common in && chains by accident nahi.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function NothingReturns({ show }) {\n  if (!show) return null; // preferred over false\n  return <p>Visible</p>;\n}"
          },
          {
            "title": "Q11: Switch statement UI",
            "explain": "Kya karna hai:\nswitch (role) { case \"admin\": return <Admin />; ... }\n\nSeedha matlab:\nBahut branches ho to switch readable. Default case zaroor.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function RolePanel({ role }) {\n  switch (role) {\n    case \"admin\":\n      return <p>Admin panel</p>;\n    case \"editor\":\n      return <p>Editor panel</p>;\n    default:\n      return <p>Guest view</p>;\n  }\n}"
          },
          {
            "title": "Q12: Enum map object pattern",
            "explain": "Kya karna hai:\nconst VIEWS = { list: <List />, grid: <Grid /> }; return VIEWS[mode]\n\nSeedha matlab:\nStatus/type → component map. Switch se chhota jab simple mapping ho.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const STATUS_UI = {\n  idle: <p>Start karo</p>,\n  loading: <p>Loading...</p>,\n  done: <p>Done!</p>,\n};\n\nfunction StatusFromMap({ status }) {\n  return <div>{STATUS_UI[status] ?? STATUS_UI.idle}</div>;\n}"
          },
          {
            "title": "Q13: Empty state conditional",
            "explain": "Kya karna hai:\nitems.length === 0 ? <Empty /> : <List items={items} />\n\nSeedha matlab:\nEmpty list alag UI — sirf \"kuch nahi\" mat dikhao blank screen.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function ItemPanel({ items }) {\n  if (items.length === 0) {\n    return <p className=\"empty\">Koi item nahi — add karo!</p>;\n  }\n  return (\n    <ul>\n      {items.map((it) => (\n        <li key={it.id}>{it.name}</li>\n      ))}\n    </ul>\n  );\n}"
          },
          {
            "title": "Q14: Error state with retry",
            "explain": "Kya karna hai:\nerror ? <ErrorBox onRetry={refetch} /> : children\n\nSeedha matlab:\nError branch me action do — user stuck na rahe.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function DataShell({ error, onRetry, children }) {\n  if (error) {\n    return (\n      <div>\n        <p>Fail: {error}</p>\n        <button onClick={onRetry}>Retry</button>\n      </div>\n    );\n  }\n  return children;\n}"
          },
          {
            "title": "Q15: Nested ternary avoid",
            "explain": "Kya karna hai:\na ? b ? c : d : e — mat likho; early return ya variables use karo.\n\nSeedha matlab:\nNested ternary padhna mushkil. Guard clauses ya Q8 jaisa pattern.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function NestedAvoid({ loading, error, data }) {\n  if (loading) return <p>Loading...</p>;\n  if (error) return <p>Error</p>;\n  if (!data) return <p>No data</p>;\n  return <p>{data.title}</p>;\n}"
          },
          {
            "title": "Q16: Boolean coercion pitfall",
            "explain": "Kya karna hai:\n!!value && <Badge /> ya Boolean(value) && ...\n\nSeedha matlab:\nObject/array truthy hain — empty [] bhi show karwa sakta hai galat UI.\nExplicit length/count check better.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function HasItems({ items }) {\n  return <div>{items.length > 0 && <span>{items.length} items</span>}</div>;\n}"
          },
          {
            "title": "Q17: Conditional children wrapper",
            "explain": "Kya karna hai:\nshow ? <Card>{children}</Card> : children — layout wrap optional.\n\nSeedha matlab:\nKabhi sirf wrapper conditional; content same rahe.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function MaybeCard({ framed, children }) {\n  if (!framed) return children;\n  return <div className=\"card\">{children}</div>;\n}"
          },
          {
            "title": "Q18: [MID] Exclusive UI — tabs ek time pe ek",
            "explain": "Kya karna hai:\nactiveTab state; sirf matching panel render.\n\nSeedha matlab:\nSab panels DOM me mat rakho hidden CSS se — heavy panels unmount karo.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Tabs({ tabs, activeId }) {\n  const active = tabs.find((t) => t.id === activeId);\n  return (\n    <div>\n      <nav>{tabs.map((t) => <button key={t.id}>{t.label}</button>)}</nav>\n      {active && <section>{active.content}</section>}\n    </div>\n  );\n}"
          },
          {
            "title": "Q19: [MID] CSS hidden vs conditional unmount",
            "explain": "Kya karna hai:\ndisplay:none se hide vs {open && <Modal />} — state preserve?\n\nSeedha matlab:\nHidden = DOM me rahe, state/form values bache. Unmount = wipe + less DOM.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function PreserveOrWipe({ open }) {\n  // Hidden: <div style={{ display: open ? \"block\" : \"none\" }}><Form /></div>\n  // Unmount: {open && <Form />} — form reset on close\n  return open ? <form><input placeholder=\"Draft\" /></form> : null;\n}"
          },
          {
            "title": "Q20: [MID] Animation mount tip",
            "explain": "Kya karna hai:\nenter animation ke liye pehle mount, phir class add — ya CSS @keyframes on mount.\n\nSeedha matlab:\nConditional render se element naya aata hai — transition libraries isi pe kaam karti.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function FadeIn({ show }) {\n  return show ? <div className=\"fade-in\">Hello!</div> : null;\n}"
          },
          {
            "title": "Q21: [ADV] Exclusive UI state machine",
            "explain": "Kya karna hai:\nview: \"list\" | \"detail\" | \"edit\" — ek hi view render, baaki null.\n\nSeedha matlab:\nMultiple booleans (showList && !showEdit) messy. Ek enum string clean.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function ViewRouter({ view, item }) {\n  if (view === \"list\") return <ul><li>Items...</li></ul>;\n  if (view === \"detail\") return <article>{item?.title}</article>;\n  if (view === \"edit\") return <form><input defaultValue={item?.title} /></form>;\n  return null;\n}"
          },
          {
            "title": "Q22: [ADV] Accessibility — aria-hidden vs unmount",
            "explain": "Kya karna hai:\nOff-screen content: aria-hidden=\"true\" vs remove from DOM.\n\nSeedha matlab:\nScreen readers: hidden still in tab order bad. Modal close → unmount + focus return.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function AccessibleModal({ open, onClose }) {\n  if (!open) return null;\n  return (\n    <div role=\"dialog\" aria-modal=\"true\">\n      <p>Modal content</p>\n      <button onClick={onClose}>Close</button>\n    </div>\n  );\n}"
          },
          {
            "title": "Q23: Optional chaining in conditions",
            "explain": "Kya karna hai:\nuser?.isAdmin && <AdminTools />\n\nSeedha matlab:\nNull user pe crash nahi. Still && pitfall: 0/\"\" check alag se.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function AdminTools({ user }) {\n  return <div>{user?.isAdmin && <button>Delete all</button>}</div>;\n}"
          },
          {
            "title": "Q24: Fragment with conditional",
            "explain": "Kya karna hai:\nreturn ( <> {a && <A />} {b && <B />} </> );\n\nSeedha matlab:\nExtra wrapper div nahi chahiye to Fragment. Multiple conditional siblings OK.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function MultiConditional({ showA, showB }) {\n  return (\n    <>\n      {showA && <p>A</p>}\n      {showB && <p>B</p>}\n    </>\n  );\n}"
          }
        ]
      },
      {
        "file": "07_ListsAndKeys.jsx",
        "title": "07 — Lists And Keys",
        "kya": "List = thali me kai bowls. map() se array → JSX items.",
        "detail": "07 — Lists And Keys\nLevel: BASE  |  Sequence: pehle yeh, phir agla number\n\nLAYMAN: List = thali me kai bowls. map() se array → JSX items.\nkey = har item ka naam tag — React ko pata chale kaun moved/added/deleted.\nBina sahi key ke React confuse — galat state, flicker, bugs.\n\nkey={index} last resort — list reorder/delete pe toot sakti hai.\nStable id (db id, uuid) best. key prop child ko props me nahi milta.\n\nKYUN: Har dashboard/table/feed list pe chalta hai.\nINTERVIEW: why keys; index as key problem; reconciliation (26).\nVite/React 19 project me use — teaching file.",
        "intro": "07 — Lists And Keys\nLevel: BASE  |  Sequence: pehle yeh, phir agla number\n\nLAYMAN: List = thali me kai bowls. map() se array → JSX items.\nkey = har item ka naam tag — React ko pata chale kaun moved/added/deleted.\nBina sahi key ke React confuse — galat state, flicker, bugs.\n\nkey={index} last resort — list reorder/delete pe toot sakti hai.\nStable id (db id, uuid) best. key prop child ko props me nahi milta.\n\nKYUN: Har dashboard/table/feed list pe chalta hai.\nINTERVIEW: why keys; index as key problem; reconciliation (26).\nVite/React 19 project me use — teaching file.",
        "questions": [
          {
            "title": "Q1: map se list",
            "explain": "Kya karna hai:\nfruits.map(f => <li key={f}>{f}</li>)\n\nSeedha matlab:\nArray → elements. return me { } ke andar map.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function FruitList() {\n  const fruits = [\"Mango\", \"Apple\", \"Banana\"];\n  return (\n    <ul>\n      {fruits.map((f) => (\n        <li key={f}>{f}</li>\n      ))}\n    </ul>\n  );\n}"
          },
          {
            "title": "Q2: Objects with id keys",
            "explain": "Kya karna hai:\nusers pe key={user.id}\n\nSeedha matlab:\nReal data me unique id. Name duplicate ho sakta — id nahi.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function UserList() {\n  const users = [\n    { id: 1, name: \"Ada\" },\n    { id: 2, name: \"Lin\" },\n  ];\n  return (\n    <ul>\n      {users.map((u) => (\n        <li key={u.id}>{u.name}</li>\n      ))}\n    </ul>\n  );\n}"
          },
          {
            "title": "Q3: Dynamic add + key",
            "explain": "Kya karna hai:\nButton se item add; list update.\n\nSeedha matlab:\nState array + map. key stable rakho (id counter).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function DynamicList() {\n  const [items, setItems] = useState([\n    { id: 1, text: \"One\" },\n  ]);\n  const [nextId, setNextId] = useState(2);\n  function add() {\n    setItems([...items, { id: nextId, text: `Item ${nextId}` }]);\n    setNextId(nextId + 1);\n  }\n  return (\n    <div>\n      <button onClick={add}>Add</button>\n      <ul>\n        {items.map((it) => (\n          <li key={it.id}>{it.text}</li>\n        ))}\n      </ul>\n    </div>\n  );\n}"
          },
          {
            "title": "Q4: Filter list (derived)",
            "explain": "Kya karna hai:\nActive todos hi dikhao — filter + map.\n\nSeedha matlab:\nRender me derived list theek. Alag state mat banao sync ke liye.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function ActiveTodos({ todos }) {\n  const active = todos.filter((t) => !t.done);\n  return (\n    <ul>\n      {active.map((t) => (\n        <li key={t.id}>{t.text}</li>\n      ))}\n    </ul>\n  );\n}"
          },
          {
            "title": "Q5: Delete by id",
            "explain": "Kya karna hai:\nfilter se item hatao; key id pe.\n\nSeedha matlab:\nSahi key → React baaki items ki state preserve.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Removable() {\n  const [items, setItems] = useState([\n    { id: \"a\", text: \"A\" },\n    { id: \"b\", text: \"B\" },\n  ]);\n  return (\n    <ul>\n      {items.map((it) => (\n        <li key={it.id}>\n          {it.text}\n          <button onClick={() => setItems(items.filter((x) => x.id !== it.id))}>\n            x\n          </button>\n        </li>\n      ))}\n    </ul>\n  );\n}"
          },
          {
            "title": "Q6: [MID] Index as key — kab problem",
            "explain": "Kya karna hai:\nReorder list with inputs — index key pe input value galat chipak sakti.\n\nSeedha matlab:\nIndex = position. Item move → React sochta same position same component.\nStatic never-reorder list pe index OK-ish; prefer id.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function IndexKeyWarning() {\n  // Prefer: key={item.id} not key={index}\n  const items = [\"x\", \"y\"];\n  return (\n    <ul>\n      {items.map((text, index) => (\n        <li key={index}>{text}</li>\n      ))}\n    </ul>\n  );\n}"
          },
          {
            "title": "Q7: Nested lists",
            "explain": "Kya karna hai:\nCategories → products; dono levels pe unique keys.\n\nSeedha matlab:\nKey sibling list me unique. Alag lists me same id OK.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Catalog({ categories }) {\n  return (\n    <div>\n      {categories.map((cat) => (\n        <section key={cat.id}>\n          <h3>{cat.name}</h3>\n          <ul>\n            {cat.products.map((p) => (\n              <li key={p.id}>{p.title}</li>\n            ))}\n          </ul>\n        </section>\n      ))}\n    </div>\n  );\n}"
          },
          {
            "title": "Q8: [MID] key helps remount",
            "explain": "Kya karna hai:\nForm reset: key={userId} change → component remount, state wipe.\n\nSeedha matlab:\nTrick: key change = React purana destroy, naya bana. Intentional reset.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Editor({ userId }) {\n  return <UserForm key={userId} userId={userId} />;\n}\n\nfunction UserForm({ userId }) {\n  const [draft, setDraft] = useState(\"\");\n  return (\n    <input\n      value={draft}\n      onChange={(e) => setDraft(e.target.value)}\n      placeholder={`Edit user ${userId}`}\n    />\n  );\n}"
          },
          {
            "title": "Q9: Empty list UX",
            "explain": "Kya karna hai:\nitems.length === 0 pe friendly message + CTA button.\n\nSeedha matlab:\nBlank ul mat chhodo — user ko next step batao.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function EmptyTodos({ todos, onAdd }) {\n  if (todos.length === 0) {\n    return (\n      <div>\n        <p>Abhi koi todo nahi</p>\n        <button onClick={onAdd}>Pehla todo banao</button>\n      </div>\n    );\n  }\n  return (\n    <ul>\n      {todos.map((t) => (\n        <li key={t.id}>{t.text}</li>\n      ))}\n    </ul>\n  );\n}"
          },
          {
            "title": "Q10: Index key kab OK hai",
            "explain": "Kya karna hai:\nStatic list — kabhi reorder/delete nahi, sirf display.\n\nSeedha matlab:\n[\"Mon\",\"Tue\",\"Wed\"] jaisa fixed — index theek. Input/state wali list me nahi.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Weekdays() {\n  const days = [\"Mon\", \"Tue\", \"Wed\", \"Thu\", \"Fri\"];\n  return (\n    <ul>\n      {days.map((d, i) => (\n        <li key={i}>{d}</li>\n      ))}\n    </ul>\n  );\n}"
          },
          {
            "title": "Q11: [MID] Reorder bug with index keys",
            "explain": "Kya karna hai:\nList reorder + checkbox — index key pe galat item checked reh sakta.\n\nSeedha matlab:\nReact position = identity samajhta hai index se. Reorder = wrong state reuse.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function ReorderBugDemo() {\n  const [items, setItems] = useState([\n    { id: \"a\", label: \"Apple\" },\n    { id: \"b\", label: \"Banana\" },\n  ]);\n  function reverse() {\n    setItems([...items].reverse());\n  }\n  return (\n    <div>\n      <button onClick={reverse}>Reverse</button>\n      <ul>\n        {items.map((it) => (\n          <li key={it.id}>\n            <input type=\"checkbox\" /> {it.label}\n          </li>\n        ))}\n      </ul>\n    </div>\n  );\n}"
          },
          {
            "title": "Q12: Fragment with key in list",
            "explain": "Kya karna hai:\nmap me <Fragment key={id}> ya <React.Fragment key={id}>.\n\nSeedha matlab:\nFragment pe key tab jab ek item multiple top-level nodes return kare.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function PairedRows({ rows }) {\n  return (\n    <dl>\n      {rows.map((r) => (\n        <Fragment key={r.id}>\n          <dt>{r.term}</dt>\n          <dd>{r.def}</dd>\n        </Fragment>\n      ))}\n    </dl>\n  );\n}"
          },
          {
            "title": "Q13: Sort list — key id same rehna chahiye",
            "explain": "Kya karna hai:\nsort() se order badle, key={item.id} mat badlo.\n\nSeedha matlab:\nSort = reorder, not new items. Stable id → React sahi move karta hai.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function SortedNames({ names }) {\n  const sorted = [...names].sort((a, b) => a.localeCompare(b));\n  return (\n    <ul>\n      {sorted.map((n) => (\n        <li key={n.id}>{n.text}</li>\n      ))}\n    </ul>\n  );\n}"
          },
          {
            "title": "Q14: Filter + map — keys source array se",
            "explain": "Kya karna hai:\nfiltered.map — key original item.id, index nahi.\n\nSeedha matlab:\nFiltered list me bhi stable id. Index filter ke baad shift ho sakta hai.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function DoneTodos({ todos }) {\n  const done = todos.filter((t) => t.done);\n  return (\n    <ul>\n      {done.map((t) => (\n        <li key={t.id}>{t.text}</li>\n      ))}\n    </ul>\n  );\n}"
          },
          {
            "title": "Q15: Duplicate keys warning",
            "explain": "Kya karna hai:\nDo items same key={1} — React warn, unpredictable behavior.\n\nSeedha matlab:\nKeys sibling me unique honi chahiye. Duplicate = reconciliation toot-ti hai.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function UniqueKeyRule({ items }) {\n  // BAD: key={items[0].category} if categories repeat\n  return (\n    <ul>\n      {items.map((it) => (\n        <li key={it.id}>{it.name}</li>\n      ))}\n    </ul>\n  );\n}"
          },
          {
            "title": "Q16: Inline list creation anti-pattern",
            "explain": "Kya karna hai:\n{[1,2,3].map(...)} render me — har render naya array (minor perf).\n\nSeedha matlab:\nChhota OK; bada data state/props se lao. keys still needed.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function InlineList() {\n  return (\n    <ul>\n      {[1, 2, 3].map((n) => (\n        <li key={n}>Item {n}</li>\n      ))}\n    </ul>\n  );\n}"
          },
          {
            "title": "Q17: [MID] Virtualization mention",
            "explain": "Kya karna hai:\n10,000 rows — poora map slow; react-window sirf visible render.\n\nSeedha matlab:\nKeys concept same — visible slice me bhi stable id. DOM me sab mat daalo.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function BigListNote({ items }) {\n  // Real app: <FixedSizeList itemKey={(i) => items[i].id} ... />\n  const visible = items.slice(0, 50);\n  return (\n    <ul>\n      {visible.map((it) => (\n        <li key={it.id}>{it.text}</li>\n      ))}\n    </ul>\n  );\n}"
          },
          {
            "title": "Q18: List + conditional empty inside map",
            "explain": "Kya karna hai:\nitems.map me null return skip — filter pehle better.\n\nSeedha matlab:\nmap me null OK lekin filter + map zyada clear for hidden items.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function VisibleOnly({ items }) {\n  return (\n    <ul>\n      {items\n        .filter((it) => !it.hidden)\n        .map((it) => (\n          <li key={it.id}>{it.text}</li>\n        ))}\n    </ul>\n  );\n}"
          },
          {
            "title": "Q19: Composite key fallback",
            "explain": "Kya karna hai:\nNo id? key={`${catId}-${sku}`} — better than index if stable combo.\n\nSeedha matlab:\nLast resort composite. Random Math.random() key mat — har render remount.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function CompositeKey({ categoryId, products }) {\n  return (\n    <ul>\n      {products.map((p) => (\n        <li key={`${categoryId}-${p.sku}`}>{p.name}</li>\n      ))}\n    </ul>\n  );\n}"
          },
          {
            "title": "Q20: key prop child ko nahi milta",
            "explain": "Kya karna hai:\n<Row key={id} id={id} /> — Row ke andar props.key undefined.\n\nSeedha matlab:\nkey React internal hai. Chahiye to id alag prop pass karo.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Row({ id, label }) {\n  return <tr data-id={id}><td>{label}</td></tr>;\n}\n\nfunction Table({ rows }) {\n  return (\n    <table>\n      <tbody>\n        {rows.map((r) => (\n          <Row key={r.id} id={r.id} label={r.label} />\n        ))}\n      </tbody>\n    </table>\n  );\n}"
          },
          {
            "title": "Q21: [ADV] key remount reset state — deep",
            "explain": "Kya karna hai:\n<ChatRoom key={roomId} /> — room change = purana chat state wipe.\n\nSeedha matlab:\nuseEffect reset se behtar jab poora subtree fresh chahiye.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function ChatRoom({ roomId }) {\n  const [draft, setDraft] = useState(\"\");\n  return (\n    <input\n      value={draft}\n      onChange={(e) => setDraft(e.target.value)}\n      placeholder={`Room ${roomId}`}\n    />\n  );\n}\n\nfunction ChatSwitcher({ roomId }) {\n  return <ChatRoom key={roomId} roomId={roomId} />;\n}"
          },
          {
            "title": "Q22: Spread new array on update",
            "explain": "Kya karna hai:\nsetItems([...items, newOne]) — mutate mat karo items.push.\n\nSeedha matlab:\nImmutable update → React detect change. Same reference → skip re-render bug.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function AppendItem() {\n  const [items, setItems] = useState([{ id: 1, text: \"First\" }]);\n  function add() {\n    setItems([...items, { id: Date.now(), text: \"New\" }]);\n  }\n  return (\n    <div>\n      <button onClick={add}>Add</button>\n      <ul>\n        {items.map((it) => (\n          <li key={it.id}>{it.text}</li>\n        ))}\n      </ul>\n    </div>\n  );\n}"
          },
          {
            "title": "Q23: List item component extract",
            "explain": "Kya karna hai:\nmap callback lambada lambi na — <TodoItem key={t.id} todo={t} />.\n\nSeedha matlab:\nkey parent map pe. Child me key pass karne ki zaroorat nahi.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function TodoItem({ todo }) {\n  return <li>{todo.text}</li>;\n}\n\nfunction TodoList({ todos }) {\n  return (\n    <ul>\n      {todos.map((t) => (\n        <TodoItem key={t.id} todo={t} />\n      ))}\n    </ul>\n  );\n}"
          },
          {
            "title": "Q24: [ADV] Index key + async load reorder",
            "explain": "Kya karna hai:\nData load hone pe order badle — index keys = flash wrong content.\n\nSeedha matlab:\nServer id aate hi key switch karo. Temp id bhi stable rakho load tak.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function AsyncList({ items }) {\n  return (\n    <ul>\n      {items.map((it) => (\n        <li key={it.id ?? it.tempId}>{it.name}</li>\n      ))}\n    </ul>\n  );\n}"
          }
        ]
      },
      {
        "file": "08_FormsControlled.jsx",
        "title": "08 — Forms Controlled",
        "kya": "Controlled input = React state boss hai. Input dikhata hai jo state",
        "detail": "08 — Forms Controlled\nLevel: BASE  |  Sequence: pehle yeh, phir agla number\n\nLAYMAN: Controlled input = React state boss hai. Input dikhata hai jo state\nkehti hai. Har type pe onChange → setState → dubara value={state}.\nUncontrolled = DOM apna rakhe (ref) — 25 me compare.\n\nForm: saari fields state (ya ek object), submit pe preventDefault + validate.\nselect, checkbox, radio bhi value/checked + onChange.\n\nKYUN: Validation, disable button, live preview — controlled se asaan.\nINTERVIEW: controlled vs uncontrolled; single source of truth.\nVite/React 19 project me use — teaching file.",
        "intro": "08 — Forms Controlled\nLevel: BASE  |  Sequence: pehle yeh, phir agla number\n\nLAYMAN: Controlled input = React state boss hai. Input dikhata hai jo state\nkehti hai. Har type pe onChange → setState → dubara value={state}.\nUncontrolled = DOM apna rakhe (ref) — 25 me compare.\n\nForm: saari fields state (ya ek object), submit pe preventDefault + validate.\nselect, checkbox, radio bhi value/checked + onChange.\n\nKYUN: Validation, disable button, live preview — controlled se asaan.\nINTERVIEW: controlled vs uncontrolled; single source of truth.\nVite/React 19 project me use — teaching file.",
        "questions": [
          {
            "title": "Q1: Single controlled input",
            "explain": "Kya karna hai:\nvalue + onChange pair.\n\nSeedha matlab:\nBina value={state} controlled nahi. Bina onChange read-only feel.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function ControlledInput() {\n  const [value, setValue] = useState(\"\");\n  return (\n    <input value={value} onChange={(e) => setValue(e.target.value)} />\n  );\n}"
          },
          {
            "title": "Q2: Multi-field form object",
            "explain": "Kya karna hai:\nform = { name, email }; name se update.\n\nSeedha matlab:\ne.target.name + computed key: setForm({ ...form, [name]: value })",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Signup() {\n  const [form, setForm] = useState({ name: \"\", email: \"\" });\n  function onChange(e) {\n    const { name, value } = e.target;\n    setForm({ ...form, [name]: value });\n  }\n  return (\n    <form\n      onSubmit={(e) => {\n        e.preventDefault();\n        console.log(form);\n      }}\n    >\n      <input name=\"name\" value={form.name} onChange={onChange} />\n      <input name=\"email\" value={form.email} onChange={onChange} />\n      <button type=\"submit\">Sign up</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q3: Checkbox controlled",
            "explain": "Kya karna hai:\nchecked={agree} onChange → setAgree(e.target.checked)\n\nSeedha matlab:\nCheckbox pe value nahi — checked boolean.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Terms() {\n  const [agree, setAgree] = useState(false);\n  return (\n    <label>\n      <input\n        type=\"checkbox\"\n        checked={agree}\n        onChange={(e) => setAgree(e.target.checked)}\n      />\n      I agree\n    </label>\n  );\n}"
          },
          {
            "title": "Q4: Select dropdown",
            "explain": "Kya karna hai:\n<select value={city} onChange=...>\n\nSeedha matlab:\nSame controlled pattern. Options children.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function CitySelect() {\n  const [city, setCity] = useState(\"pune\");\n  return (\n    <select value={city} onChange={(e) => setCity(e.target.value)}>\n      <option value=\"pune\">Pune</option>\n      <option value=\"delhi\">Delhi</option>\n    </select>\n  );\n}"
          },
          {
            "title": "Q5: Textarea",
            "explain": "Kya karna hai:\n<textarea value={bio} onChange=...> — children text HTML style mat.\n\nSeedha matlab:\nReact me textarea bhi value prop se control.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Bio() {\n  const [bio, setBio] = useState(\"\");\n  return (\n    <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={4} />\n  );\n}"
          },
          {
            "title": "Q6: Simple validation + disable submit",
            "explain": "Kya karna hai:\nemail me @ nahi to button disabled.\n\nSeedha matlab:\nDerived: const valid = email.includes(\"@\"). State alag mat rakhna sync ke liye.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function EmailForm() {\n  const [email, setEmail] = useState(\"\");\n  const valid = email.includes(\"@\");\n  return (\n    <form\n      onSubmit={(e) => {\n        e.preventDefault();\n        if (!valid) return;\n        console.log(email);\n      }}\n    >\n      <input value={email} onChange={(e) => setEmail(e.target.value)} />\n      <button type=\"submit\" disabled={!valid}>\n        Submit\n      </button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q7: [MID] Radio group",
            "explain": "Kya karna hai:\nsame name, checked={plan === \"pro\"}, value set on change.\n\nSeedha matlab:\nEk state string = selected radio.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function PlanPicker() {\n  const [plan, setPlan] = useState(\"free\");\n  return (\n    <div>\n      <label>\n        <input\n          type=\"radio\"\n          checked={plan === \"free\"}\n          onChange={() => setPlan(\"free\")}\n        />\n        Free\n      </label>\n      <label>\n        <input\n          type=\"radio\"\n          checked={plan === \"pro\"}\n          onChange={() => setPlan(\"pro\")}\n        />\n        Pro\n      </label>\n    </div>\n  );\n}"
          },
          {
            "title": "Q8: [MID] Reset form",
            "explain": "Kya karna hai:\nsetForm(initial) se clear.\n\nSeedha matlab:\nControlled me reset = state wapas initial. DOM reset() optional.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const INITIAL = { title: \"\", body: \"\" };\n\nfunction NoteForm() {\n  const [form, setForm] = useState(INITIAL);\n  return (\n    <form\n      onSubmit={(e) => {\n        e.preventDefault();\n        console.log(form);\n        setForm(INITIAL);\n      }}\n    >\n      <input\n        value={form.title}\n        onChange={(e) => setForm({ ...form, title: e.target.value })}\n      />\n      <button type=\"button\" onClick={() => setForm(INITIAL)}>\n        Reset\n      </button>\n      <button type=\"submit\">Save</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q9: Number input controlled",
            "explain": "Kya karna hai:\ntype=\"number\" value={qty} — parseInt/Number on change.\n\nSeedha matlab:\nvalue string hoti hai input se. Math ke liye number me convert.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function QtyInput() {\n  const [qty, setQty] = useState(1);\n  return (\n    <input\n      type=\"number\"\n      value={qty}\n      onChange={(e) => setQty(Number(e.target.value) || 0)}\n    />\n  );\n}"
          },
          {
            "title": "Q10: Multi checkbox (array state)",
            "explain": "Kya karna hai:\nchecked={selected.includes(id)} toggle array add/remove.\n\nSeedha matlab:\nMultiple select — string[] state. Har box alag id.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Toppings() {\n  const [selected, setSelected] = useState([]);\n  const options = [\"cheese\", \"olive\", \"corn\"];\n  function toggle(opt) {\n    setSelected((prev) =>\n      prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]\n    );\n  }\n  return (\n    <div>\n      {options.map((opt) => (\n        <label key={opt}>\n          <input\n            type=\"checkbox\"\n            checked={selected.includes(opt)}\n            onChange={() => toggle(opt)}\n          />\n          {opt}\n        </label>\n      ))}\n    </div>\n  );\n}"
          },
          {
            "title": "Q11: Validation UX — inline error",
            "explain": "Kya karna hai:\ntouched state; blur pe error dikhao, type karte hi clear.\n\nSeedha matlab:\nSubmit pe hi error = rude. Field-level feedback better UX.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function InlineError() {\n  const [email, setEmail] = useState(\"\");\n  const [touched, setTouched] = useState(false);\n  const error = touched && !email.includes(\"@\") ? \"Valid email daalo\" : \"\";\n  return (\n    <div>\n      <input\n        value={email}\n        onChange={(e) => setEmail(e.target.value)}\n        onBlur={() => setTouched(true)}\n      />\n      {error && <span className=\"err\">{error}</span>}\n    </div>\n  );\n}"
          },
          {
            "title": "Q12: Submit disabled until valid",
            "explain": "Kya karna hai:\nconst canSubmit = name.trim() && password.length >= 8;\n\nSeedha matlab:\nDerived flag — alag isValid state sync mat. Button disabled={!canSubmit}.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function SecureSignup() {\n  const [name, setName] = useState(\"\");\n  const [password, setPassword] = useState(\"\");\n  const canSubmit = name.trim().length > 0 && password.length >= 8;\n  return (\n    <form onSubmit={(e) => e.preventDefault()}>\n      <input value={name} onChange={(e) => setName(e.target.value)} />\n      <input\n        type=\"password\"\n        value={password}\n        onChange={(e) => setPassword(e.target.value)}\n      />\n      <button type=\"submit\" disabled={!canSubmit}>\n        Join\n      </button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q13: FormData vs controlled sketch",
            "explain": "Kya karna hai:\nonSubmit: new FormData(e.target) — uncontrolled bulk submit.\n\nSeedha matlab:\nSimple forms OK. Live validation / disable button ke liye controlled better.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function FormDataSketch() {\n  function submit(e) {\n    e.preventDefault();\n    const fd = new FormData(e.target);\n    console.log(Object.fromEntries(fd));\n  }\n  return (\n    <form onSubmit={submit}>\n      <input name=\"title\" defaultValue=\"\" />\n      <button type=\"submit\">Send</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q14: File input — uncontrolled note",
            "explain": "Kya karna hai:\ntype=\"file\" — value set karna restricted; ref ya FormData use.\n\nSeedha matlab:\nControlled file rare. onChange me file object state me rakho agar chahiye.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function FileUpload() {\n  const [file, setFile] = useState(null);\n  return (\n    <input\n      type=\"file\"\n      onChange={(e) => setFile(e.target.files?.[0] ?? null)}\n    />\n  );\n}"
          },
          {
            "title": "Q15: [MID] Nested form state",
            "explain": "Kya karna hai:\nform = { user: { name, addr: { city } } } — spread deep update.\n\nSeedha matlab:\nNested path: setForm({ ...form, user: { ...form.user, name: v } }). Ya reducer.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function NestedAddress() {\n  const [form, setForm] = useState({\n    user: { name: \"\", addr: { city: \"\" } },\n  });\n  return (\n    <input\n      value={form.user.addr.city}\n      onChange={(e) =>\n        setForm({\n          ...form,\n          user: {\n            ...form.user,\n            addr: { ...form.user.addr, city: e.target.value },\n          },\n        })\n      }\n    />\n  );\n}"
          },
          {
            "title": "Q16: Select multiple",
            "explain": "Kya karna hai:\n<select multiple value={tags} onChange> — value array.\n\nSeedha matlab:\nCtrl+click multi. selectedOptions se array bhi bana sakte ho.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function MultiSelect() {\n  const [tags, setTags] = useState([\"js\"]);\n  return (\n    <select\n      multiple\n      value={tags}\n      onChange={(e) =>\n        setTags([...e.target.selectedOptions].map((o) => o.value))\n      }\n    >\n      <option value=\"js\">JS</option>\n      <option value=\"react\">React</option>\n      <option value=\"css\">CSS</option>\n    </select>\n  );\n}"
          },
          {
            "title": "Q17: Controlled vs defaultValue mix mat",
            "explain": "Kya karna hai:\nEk input pe value + defaultValue dono mat — pick one pattern.\n\nSeedha matlab:\nSwitch controlled/uncontrolled mid-life = warning. Consistent raho.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function ControlledOnly() {\n  const [text, setText] = useState(\"\");\n  return <input value={text} onChange={(e) => setText(e.target.value)} />;\n}"
          },
          {
            "title": "Q18: onSubmit preventDefault zaroori",
            "explain": "Kya karna hai:\nform submit pe page reload roko; apna handler chalao.\n\nSeedha matlab:\nBina preventDefault browser navigate/reload. SPA me hamesha roko.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function SafeSubmit() {\n  const [msg, setMsg] = useState(\"\");\n  return (\n    <form\n      onSubmit={(e) => {\n        e.preventDefault();\n        console.log(msg);\n      }}\n    >\n      <input value={msg} onChange={(e) => setMsg(e.target.value)} />\n      <button type=\"submit\">Go</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q19: Read-only controlled display",
            "explain": "Kya karna hai:\nvalue={computed} readOnly — user edit nahi, still controlled.\n\nSeedha matlab:\nSummary field, slug preview — state se derive, input dikhao.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function SlugPreview() {\n  const [title, setTitle] = useState(\"\");\n  const slug = title.toLowerCase().replace(/\\s+/g, \"-\");\n  return (\n    <div>\n      <input value={title} onChange={(e) => setTitle(e.target.value)} />\n      <input value={slug} readOnly />\n    </div>\n  );\n}"
          },
          {
            "title": "Q20: [MID] React 19 form actions contrast",
            "explain": "Kya karna hai:\n<form action={async (fd) => { \"use server\" }} /> vs onSubmit + useState.\n\nSeedha matlab:\nActions = submit flow declarative, pending state useFormStatus se. Classic controlled ab bhi valid.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function ClassicVsActionNote() {\n  const [pending, setPending] = useState(false);\n  async function handleSubmit(e) {\n    e.preventDefault();\n    setPending(true);\n    // await save...\n    setPending(false);\n  }\n  return (\n    <form onSubmit={handleSubmit}>\n      <button disabled={pending}>{pending ? \"Saving...\" : \"Save\"}</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q21: Input name for FormData",
            "explain": "Kya karna hai:\nHar field name=\"fieldName\" — FormData me key aati hai.\n\nSeedha matlab:\nControlled me bhi name rakho agar progressive enhancement / FormData mix ho.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function NamedFields() {\n  const [form, setForm] = useState({ title: \"\", body: \"\" });\n  return (\n    <form>\n      <input\n        name=\"title\"\n        value={form.title}\n        onChange={(e) => setForm({ ...form, title: e.target.value })}\n      />\n    </form>\n  );\n}"
          },
          {
            "title": "Q22: Max length live counter",
            "explain": "Kya karna hai:\nmaxLength={100} + {text.length}/100 dikhao.\n\nSeedha matlab:\nControlled se live feedback easy — derived count render me.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function BioCounter() {\n  const [text, setText] = useState(\"\");\n  const max = 100;\n  return (\n    <div>\n      <textarea\n        value={text}\n        maxLength={max}\n        onChange={(e) => setText(e.target.value)}\n      />\n      <span>\n        {text.length}/{max}\n      </span>\n    </div>\n  );\n}"
          },
          {
            "title": "Q23: Pattern HTML + JS double validate",
            "explain": "Kya karna hai:\npattern=\"[0-9]+\" browser hint + JS me bhi check submit pe.\n\nSeedha matlab:\nHTML validation UX help; trust mat — server + JS bhi.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function PhoneField() {\n  const [phone, setPhone] = useState(\"\");\n  const valid = /^\\d{10}$/.test(phone);\n  return (\n    <input\n      value={phone}\n      pattern=\"\\d{10}\"\n      onChange={(e) => setPhone(e.target.value)}\n      aria-invalid={!valid && phone.length > 0}\n    />\n  );\n}"
          },
          {
            "title": "Q24: Fieldset disabled group",
            "explain": "Kya karna hai:\n<fieldset disabled={loading}> — saari fields ek saath off.\n\nSeedha matlab:\nSubmit ke dauran form lock — har input pe alag disabled mat lagao.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function LoadingForm({ loading }) {\n  const [email, setEmail] = useState(\"\");\n  return (\n    <fieldset disabled={loading}>\n      <input value={email} onChange={(e) => setEmail(e.target.value)} />\n      <button type=\"submit\">{loading ? \"...\" : \"Submit\"}</button>\n    </fieldset>\n  );\n}"
          }
        ]
      },
      {
        "file": "09_UseEffect.jsx",
        "title": "09 — useEffect",
        "kya": "useEffect = \"paint ke baad yeh extra kaam karo\" — fetch, timer,",
        "detail": "09 — useEffect\nLevel: MID  |  Sequence: pehle yeh, phir agla number\n\nLAYMAN: useEffect = \"paint ke baad yeh extra kaam karo\" — fetch, timer,\ndocument.title, event listener. Render pure rakho; side effects yahan.\n\nuseEffect(fn, deps):\n  [] = mount pe ek baar (strict mode dev me 2x — 27).\n  [x] = x change pe dubara.\n  no deps = har render pe (rare, careful).\nCleanup return () => {...} — unmount / pehle deps change pe (clearInterval).\n\nKYUN: Data fetch, sync bahar duniya — React ka official door.\nINTERVIEW: deps array; cleanup; infinite loop; race conditions.\nVite/React 19 project me use — teaching file.",
        "intro": "09 — useEffect\nLevel: MID  |  Sequence: pehle yeh, phir agla number\n\nLAYMAN: useEffect = \"paint ke baad yeh extra kaam karo\" — fetch, timer,\ndocument.title, event listener. Render pure rakho; side effects yahan.\n\nuseEffect(fn, deps):\n  [] = mount pe ek baar (strict mode dev me 2x — 27).\n  [x] = x change pe dubara.\n  no deps = har render pe (rare, careful).\nCleanup return () => {...} — unmount / pehle deps change pe (clearInterval).\n\nKYUN: Data fetch, sync bahar duniya — React ka official door.\nINTERVIEW: deps array; cleanup; infinite loop; race conditions.\nVite/React 19 project me use — teaching file.",
        "questions": [
          {
            "title": "Q1: document.title sync",
            "explain": "Kya karna hai:\ncount badle to title update.\n\nSeedha matlab:\nBrowser API = side effect. Effect me karo, render me nahi.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function TitleCounter() {\n  const [count, setCount] = useState(0);\n  useEffect(() => {\n    document.title = `Count: ${count}`;\n  }, [count]);\n  return <button onClick={() => setCount(count + 1)}>{count}</button>;\n}"
          },
          {
            "title": "Q2: Mount-only fetch sketch",
            "explain": "Kya karna hai:\n[] deps — load pe data lao.\n\nSeedha matlab:\nEmpty deps ≈ componentDidMount feel. Cleanup me abort useful.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Users() {\n  const [users, setUsers] = useState([]);\n  useEffect(() => {\n    let cancelled = false;\n    fetch(\"/api/users\")\n      .then((r) => r.json())\n      .then((data) => {\n        if (!cancelled) setUsers(data);\n      });\n    return () => {\n      cancelled = true;\n    };\n  }, []);\n  return <pre>{JSON.stringify(users)}</pre>;\n}"
          },
          {
            "title": "Q3: Cleanup interval",
            "explain": "Kya karna hai:\nsetInterval + clearInterval return me.\n\nSeedha matlab:\nBina cleanup memory leak / setState on unmounted.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Clock() {\n  const [t, setT] = useState(0);\n  useEffect(() => {\n    const id = setInterval(() => setT((x) => x + 1), 1000);\n    return () => clearInterval(id);\n  }, []);\n  return <p>{t}s</p>;\n}"
          },
          {
            "title": "Q4: Deps — search when query changes",
            "explain": "Kya karna hai:\nquery change pe naya search effect.\n\nSeedha matlab:\nMissing dep = stale bug. Extra dep = extra runs. ESLint exhaustive-deps.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Search({ query }) {\n  const [results, setResults] = useState([]);\n  useEffect(() => {\n    if (!query) {\n      setResults([]);\n      return;\n    }\n    let alive = true;\n    fetch(`/api/search?q=${query}`)\n      .then((r) => r.json())\n      .then((data) => {\n        if (alive) setResults(data);\n      });\n    return () => {\n      alive = false;\n    };\n  }, [query]);\n  return <ul>{results.map((r) => <li key={r.id}>{r.title}</li>)}</ul>;\n}"
          },
          {
            "title": "Q5: [MID] Infinite loop trap",
            "explain": "Kya karna hai:\nEffect me setState + missing/wrong deps → loop.\n\nSeedha matlab:\nuseEffect(() => setX(x+1)) bina soch → infinite. Deps samjho.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function LoopWarning() {\n  const [n, setN] = useState(0);\n  // BAD: useEffect(() => setN(n + 1)); // har render → dubara effect\n  // OK: user event pe setN, ya [someExternal]\n  return <p>{n}</p>;\n}"
          },
          {
            "title": "Q6: Event listener subscribe",
            "explain": "Kya karna hai:\nwindow resize pe width state; cleanup removeEventListener.\n\nSeedha matlab:\nSubscribe/unsubscribe pair = classic cleanup.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function WindowWidth() {\n  const [w, setW] = useState(window.innerWidth);\n  useEffect(() => {\n    function onResize() {\n      setW(window.innerWidth);\n    }\n    window.addEventListener(\"resize\", onResize);\n    return () => window.removeEventListener(\"resize\", onResize);\n  }, []);\n  return <p>Width: {w}</p>;\n}"
          },
          {
            "title": "Q7: [MID] Syncing props → state (careful)",
            "explain": "Kya karna hai:\nKabhi prop change pe local draft reset — effect se.\n\nSeedha matlab:\nOften key={id} remount better. Effect sync smell ho sakta — soch ke use.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Draft({ savedText }) {\n  const [text, setText] = useState(savedText);\n  useEffect(() => {\n    setText(savedText);\n  }, [savedText]);\n  return <textarea value={text} onChange={(e) => setText(e.target.value)} />;\n}"
          },
          {
            "title": "Q8: [MID] Race: slow response overwrite",
            "explain": "Kya karna hai:\nFast typing: purani fetch late aake naya result overwrite na kare.\n\nSeedha matlab:\ncancelled flag / AbortController. Interview favorite.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function RaceSafeSearch({ q }) {\n  const [data, setData] = useState(null);\n  useEffect(() => {\n    const ac = new AbortController();\n    fetch(`/api?q=${q}`, { signal: ac.signal })\n      .then((r) => r.json())\n      .then(setData)\n      .catch((err) => {\n        if (err.name !== \"AbortError\") console.error(err);\n      });\n    return () => ac.abort();\n  }, [q]);\n  return <pre>{JSON.stringify(data)}</pre>;\n}"
          },
          {
            "title": "Q9: No deps — har render pe run",
            "explain": "Kya karna hai:\nuseEffect(() => {...}) — deps array hi nahi.\n\nSeedha matlab:\nHar paint ke baad chalega. Rare; usually bug ya logging. Avoid unless sure.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function EveryRenderLog({ value }) {\n  useEffect(() => {\n    console.log(\"rendered with\", value);\n  });\n  return <p>{value}</p>;\n}"
          },
          {
            "title": "Q10: Empty deps [] — mount once",
            "explain": "Kya karna hai:\nAnalytics init, one-time setup — [].\n\nSeedha matlab:\nSirf mount + cleanup unmount. Props/state andar use mat karo bina deps ke.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function AnalyticsInit() {\n  useEffect(() => {\n    console.log(\"track page view\");\n  }, []);\n  return null;\n}"
          },
          {
            "title": "Q11: Full deps — sab external values list",
            "explain": "Kya karna hai:\n[userId, filter] — dono change pe effect dubara.\n\nSeedha matlab:\nESLint exhaustive-deps follow karo. Missing = stale closure bug.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function UserPosts({ userId, filter }) {\n  const [posts, setPosts] = useState([]);\n  useEffect(() => {\n    fetch(`/api/users/${userId}?f=${filter}`)\n      .then((r) => r.json())\n      .then(setPosts);\n  }, [userId, filter]);\n  return <pre>{JSON.stringify(posts)}</pre>;\n}"
          },
          {
            "title": "Q12: Cleanup before re-run",
            "explain": "Kya karna hai:\ndeps change → pehle cleanup, phir naya effect body.\n\nSeedha matlab:\nPurana subscription/timer band, naya start. Order guaranteed.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function DebouncedLog({ text }) {\n  useEffect(() => {\n    const id = setTimeout(() => console.log(text), 500);\n    return () => clearTimeout(id);\n  }, [text]);\n  return null;\n}"
          },
          {
            "title": "Q13: [MID] Strict Mode double mount",
            "explain": "Kya karna hai:\nDev me React mount → unmount → mount dubara — cleanup test.\n\nSeedha matlab:\nEffect 2x run ho sakta dev me. Cleanup sahi ho to OK. Prod me ek baar.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function StrictModeSafe() {\n  useEffect(() => {\n    const sub = { dispose: () => {} };\n    return () => sub.dispose();\n  }, []);\n  return <p>Strict-safe effect</p>;\n}"
          },
          {
            "title": "Q14: Derived state — effect mat",
            "explain": "Kya karna hai:\nfullName = first + last render me — useEffect se setFullName mat.\n\nSeedha matlab:\nJo props/state se compute ho sakta render me — wahi karo. Extra effect = lag.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function FullName({ first, last }) {\n  const fullName = `${first} ${last}`.trim();\n  return <p>{fullName}</p>;\n}"
          },
          {
            "title": "Q15: When NOT to use effect — event handler",
            "explain": "Kya karna hai:\nButton click pe POST — onClick me karo, useEffect me mat.\n\nSeedha matlab:\nUser action = event. Mount/sync external = effect. Confuse mat karo.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function SaveButton({ data }) {\n  function save() {\n    fetch(\"/api/save\", { method: \"POST\", body: JSON.stringify(data) });\n  }\n  return <button onClick={save}>Save</button>;\n}"
          },
          {
            "title": "Q16: Fetch with loading/error states",
            "explain": "Kya karna hai:\neffect me setLoading true → fetch → setData/setError → finally setLoading false.\n\nSeedha matlab:\nClassic pattern. Race guard bhi rakho (Q8 jaisa).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function FetchWithStates({ id }) {\n  const [data, setData] = useState(null);\n  const [loading, setLoading] = useState(true);\n  const [error, setError] = useState(null);\n  useEffect(() => {\n    let alive = true;\n    setLoading(true);\n    fetch(`/api/item/${id}`)\n      .then((r) => r.json())\n      .then((d) => {\n        if (alive) setData(d);\n      })\n      .catch((e) => {\n        if (alive) setError(String(e));\n      })\n      .finally(() => {\n        if (alive) setLoading(false);\n      });\n    return () => {\n      alive = false;\n    };\n  }, [id]);\n  if (loading) return <p>Loading...</p>;\n  if (error) return <p>{error}</p>;\n  return <pre>{JSON.stringify(data)}</pre>;\n}"
          },
          {
            "title": "Q17: localStorage sync effect",
            "explain": "Kya karna hai:\ntheme state change → localStorage.setItem in effect.\n\nSeedha matlab:\nBrowser storage = external system. Effect ya event dono OK; effect for sync after render.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function ThemeSync({ theme }) {\n  useEffect(() => {\n    localStorage.setItem(\"theme\", theme);\n  }, [theme]);\n  return <p>Theme: {theme}</p>;\n}"
          },
          {
            "title": "Q18: [MID] Sync external store contrast",
            "explain": "Kya karna hai:\nuseSyncExternalStore for subscribe API — raw effect + listener se behtar.\n\nSeedha matlab:\nwindow matchMedia, Redux subscribe — official hook tearing avoid karta hai.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function ExternalStoreNote() {\n  // useSyncExternalStore(subscribe, getSnapshot) — see React docs\n  const [w, setW] = useState(window.innerWidth);\n  useEffect(() => {\n    const fn = () => setW(window.innerWidth);\n    window.addEventListener(\"resize\", fn);\n    return () => window.removeEventListener(\"resize\", fn);\n  }, []);\n  return <p>{w}px</p>;\n}"
          },
          {
            "title": "Q19: Object dep — stabilize or fields",
            "explain": "Kya karna hai:\ndeps me [config] — har render naya object = effect loop.\n\nSeedha matlab:\nPrimitive fields deps me lo, ya useMemo config. Reference equality matter.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function ConfigFetch({ url, page }) {\n  const [data, setData] = useState(null);\n  useEffect(() => {\n    fetch(`${url}?page=${page}`).then((r) => r.json()).then(setData);\n  }, [url, page]);\n  return <pre>{JSON.stringify(data)}</pre>;\n}"
          },
          {
            "title": "Q20: Timer reset on dep change",
            "explain": "Kya karna hai:\ncountdown restarts jab seconds prop badle — cleanup clearTimeout.\n\nSeedha matlab:\nNaya dep = purana timer band, naya start. Leak mat chhodo.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Countdown({ seconds }) {\n  const [left, setLeft] = useState(seconds);\n  useEffect(() => {\n    setLeft(seconds);\n    const id = setInterval(() => setLeft((s) => s - 1), 1000);\n    return () => clearInterval(id);\n  }, [seconds]);\n  return <p>{left}s</p>;\n}"
          },
          {
            "title": "Q21: [ADV] Effect vs event — form submit",
            "explain": "Kya karna hai:\ndata change pe auto-save effect? Usually blur/submit event better.\n\nSeedha matlab:\nHar keystroke effect = spam. Debounced effect ya explicit save button prefer.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function AutoSaveNote({ draft }) {\n  useEffect(() => {\n    const id = setTimeout(() => {\n      if (draft) localStorage.setItem(\"draft\", draft);\n    }, 1000);\n    return () => clearTimeout(id);\n  }, [draft]);\n  return <textarea defaultValue={draft} />;\n}"
          },
          {
            "title": "Q22: AbortController cleanup pattern",
            "explain": "Kya karna hai:\nreturn () => ac.abort() — in-flight fetch cancel.\n\nSeedha matlab:\nUnmount ya dep change pe purani request band. Network + setState race fix.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function AbortFetch({ query }) {\n  const [result, setResult] = useState(null);\n  useEffect(() => {\n    const ac = new AbortController();\n    fetch(`/api?q=${query}`, { signal: ac.signal })\n      .then((r) => r.json())\n      .then(setResult)\n      .catch(() => {});\n    return () => ac.abort();\n  }, [query]);\n  return <pre>{JSON.stringify(result)}</pre>;\n}"
          },
          {
            "title": "Q23: [ADV] Layout measurement — useLayoutEffect note",
            "explain": "Kya karna hai:\nDOM measure before paint — useLayoutEffect; flicker avoid.\n\nSeedha matlab:\nuseEffect = after paint (flash ho sakta). Layout sync = layoutEffect. Rare need.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function MeasureNote() {\n  const ref = useRef(null);\n  useEffect(() => {\n    if (ref.current) console.log(ref.current.offsetHeight);\n  }, []);\n  return <div ref={ref}>Measure me</div>;\n}"
          },
          {
            "title": "Q24: Conditional effect early return",
            "explain": "Kya karna hai:\nif (!enabled) return; inside effect — subscribe mat jab off.\n\nSeedha matlab:\nenabled dep me rakho. Off pe cleanup still chalega previous run ka.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function ConditionalSub({ enabled, channel }) {\n  useEffect(() => {\n    if (!enabled) return;\n    const handler = () => {};\n    document.addEventListener(channel, handler);\n    return () => document.removeEventListener(channel, handler);\n  }, [enabled, channel]);\n  return null;\n}"
          }
        ]
      },
      {
        "file": "10_UseRef.jsx",
        "title": "10 — useRef",
        "kya": "useRef = dabba jiski value badalne pe RE-RENDER nahi. Do kaam:",
        "detail": "10 — useRef\nLevel: MID  |  Sequence: pehle yeh, phir agla number\n\nLAYMAN: useRef = dabba jiski value badalne pe RE-RENDER nahi. Do kaam:\n1) DOM node pakadna (input.focus())\n2) Mutable box — previous value, timer id, \"latest\" callback\n\nref.current padho/likho. JSX me ref={inputRef}. State = UI; ref = memory.\n\nKYUN: Focus, measure DOM, avoid stale closures without re-render spam.\nINTERVIEW: ref vs state; when not to put UI data in ref.\nVite/React 19 project me use — teaching file.",
        "intro": "10 — useRef\nLevel: MID  |  Sequence: pehle yeh, phir agla number\n\nLAYMAN: useRef = dabba jiski value badalne pe RE-RENDER nahi. Do kaam:\n1) DOM node pakadna (input.focus())\n2) Mutable box — previous value, timer id, \"latest\" callback\n\nref.current padho/likho. JSX me ref={inputRef}. State = UI; ref = memory.\n\nKYUN: Focus, measure DOM, avoid stale closures without re-render spam.\nINTERVIEW: ref vs state; when not to put UI data in ref.\nVite/React 19 project me use — teaching file.",
        "questions": [
          {
            "title": "Q1: Focus input on mount",
            "explain": "Kya karna hai:\ninputRef + useEffect me .focus()\n\nSeedha matlab:\nDOM API chahiye to ref. querySelector avoid in React.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Autofocus() {\n  const inputRef = useRef(null);\n  useEffect(() => {\n    inputRef.current?.focus();\n  }, []);\n  return <input ref={inputRef} placeholder=\"Focused\" />;\n}"
          },
          {
            "title": "Q2: Scroll into view",
            "explain": "Kya karna hai:\nbottomRef.current.scrollIntoView()\n\nSeedha matlab:\nChat apps — naya message pe scroll. Ref = target element.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function ChatEnd() {\n  const endRef = useRef(null);\n  function jump() {\n    endRef.current?.scrollIntoView({ behavior: \"smooth\" });\n  }\n  return (\n    <div>\n      <button onClick={jump}>Jump to end</button>\n      <div style={{ height: 400 }}>...messages...</div>\n      <div ref={endRef} />\n    </div>\n  );\n}"
          },
          {
            "title": "Q3: Store interval id",
            "explain": "Kya karna hai:\nintervalRef.current = setInterval... clear pe use.\n\nSeedha matlab:\nTimer id UI me nahi — ref perfect. State banane se extra render.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Stopwatch() {\n  const [ms, setMs] = useState(0);\n  const idRef = useRef(null);\n  function start() {\n    if (idRef.current) return;\n    idRef.current = setInterval(() => setMs((m) => m + 100), 100);\n  }\n  function stop() {\n    clearInterval(idRef.current);\n    idRef.current = null;\n  }\n  return (\n    <div>\n      {ms}ms\n      <button onClick={start}>Start</button>\n      <button onClick={stop}>Stop</button>\n    </div>\n  );\n}"
          },
          {
            "title": "Q4: Previous value track",
            "explain": "Kya karna hai:\nprevRef.current = count after render; compare.\n\nSeedha matlab:\n\"Pehle kya tha?\" — ref me save, render pe dikhao.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function PrevCount() {\n  const [count, setCount] = useState(0);\n  const prev = useRef(count);\n  useEffect(() => {\n    prev.current = count;\n  }, [count]);\n  return (\n    <button onClick={() => setCount(count + 1)}>\n      now {count}, was {prev.current}\n    </button>\n  );\n}"
          },
          {
            "title": "Q5: [MID] Click outside to close",
            "explain": "Kya karna hai:\nboxRef — document click agar bahar to close.\n\nSeedha matlab:\nDropdown/modal pattern. contains(target) check.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Menu() {\n  const [open, setOpen] = useState(false);\n  const boxRef = useRef(null);\n  useEffect(() => {\n    function onDoc(e) {\n      if (boxRef.current && !boxRef.current.contains(e.target)) {\n        setOpen(false);\n      }\n    }\n    document.addEventListener(\"mousedown\", onDoc);\n    return () => document.removeEventListener(\"mousedown\", onDoc);\n  }, []);\n  return (\n    <div ref={boxRef}>\n      <button onClick={() => setOpen(!open)}>Menu</button>\n      {open && <div className=\"dropdown\">Item</div>}\n    </div>\n  );\n}"
          },
          {
            "title": "Q6: [MID] Ref for latest callback (stale fix)",
            "explain": "Kya karna hai:\ncbRef.current = onMessage; interval/socket purana closure avoid.\n\nSeedha matlab:\nEffect [] pe listener, lekin hamesha latest handler — ref bridge.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Socketish({ onMessage }) {\n  const cbRef = useRef(onMessage);\n  useEffect(() => {\n    cbRef.current = onMessage;\n  }, [onMessage]);\n  useEffect(() => {\n    const id = setInterval(() => {\n      cbRef.current(\"tick\");\n    }, 1000);\n    return () => clearInterval(id);\n  }, []);\n  return null;\n}"
          },
          {
            "title": "Q7: Uncontrolled input read on submit",
            "explain": "Kya karna hai:\ndefaultValue + ref.current.value submit pe.\n\nSeedha matlab:\nHar keystroke state nahi — performance/simple forms. (25 deep)",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function UncontrolledName() {\n  const ref = useRef(null);\n  function submit(e) {\n    e.preventDefault();\n    console.log(ref.current.value);\n  }\n  return (\n    <form onSubmit={submit}>\n      <input ref={ref} defaultValue=\"Ada\" />\n      <button type=\"submit\">Go</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q8: Don't use ref for visible UI state",
            "explain": "Kya karna hai:\ncount dikhana hai to useState, useRef nahi.\n\nSeedha matlab:\nref.current++ se screen nahi badlegi. Rule: UI me dikhe → state.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function WrongVsRight() {\n  const [count, setCount] = useState(0); // ✅\n  // const countRef = useRef(0); countRef.current++; // ❌ UI stale\n  return <button onClick={() => setCount(count + 1)}>{count}</button>;\n}"
          },
          {
            "title": "Q9: Callback ref pattern",
            "explain": "Kya karna hai:\nref={(node) => { ... }} — mount/unmount pe node milega.\n\nSeedha matlab:\nDynamic refs, measure on attach. useRef object se alag — function har attach pe call.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function CallbackRefDemo() {\n  function setRef(node) {\n    if (node) node.classList.add(\"mounted\");\n  }\n  return <div ref={setRef}>Hello</div>;\n}"
          },
          {
            "title": "Q10: Measure layout — useLayoutEffect contrast",
            "explain": "Kya karna hai:\nheight measure tooltip position — layoutEffect before paint.\n\nSeedha matlab:\nuseEffect measure = user ko jump dikhe. LayoutEffect = sync DOM read/write.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function TooltipMeasure() {\n  const boxRef = useRef(null);\n  const [h, setH] = useState(0);\n  useEffect(() => {\n    if (boxRef.current) setH(boxRef.current.offsetHeight);\n  }, []);\n  return (\n    <div ref={boxRef}>\n      Content\n      <span style={{ top: h }}>Tip</span>\n    </div>\n  );\n}"
          },
          {
            "title": "Q11: Ref mutable box — render count nahi badhta",
            "explain": "Kya karna hai:\nrendersRef.current++ har render pe — screen pe nahi dikhega.\n\nSeedha matlab:\nDebug/metrics ke liye. UI update chahiye to state use karo.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function RenderCount() {\n  const renders = useRef(0);\n  renders.current += 1;\n  const [n, setN] = useState(0);\n  return (\n    <button onClick={() => setN(n + 1)}>\n      clicks {n} (renders ~{renders.current})\n    </button>\n  );\n}"
          },
          {
            "title": "Q12: forwardRef parent se child DOM",
            "explain": "Kya karna hai:\nconst Input = forwardRef((props, ref) => <input ref={ref} {...props} />)\n\nSeedha matlab:\nParent ko child ka DOM chahiye — focus(), measure. React 19 me ref prop bhi direct.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const FancyInput = forwardRef(function FancyInput(props, ref) {\n  return <input ref={ref} className=\"fancy\" {...props} />;\n});\n\nfunction FocusChild() {\n  const ref = useRef(null);\n  return (\n    <>\n      <FancyInput ref={ref} />\n      <button onClick={() => ref.current?.focus()}>Focus</button>\n    </>\n  );\n}"
          },
          {
            "title": "Q13: [MID] React 19 ref as prop note",
            "explain": "Kya karna hai:\nfunction Input({ ref, ...props }) — forwardRef optional ho raha.\n\nSeedha matlab:\nref ab normal prop bhi ban sakta hai React 19 me. forwardRef legacy support.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function RefAsPropNote({ ref }) {\n  return <input ref={ref} placeholder=\"React 19 style\" />;\n}"
          },
          {
            "title": "Q14: Instance var pattern — latest value",
            "explain": "Kya karna hai:\nlatestQueryRef.current = query; async callback me padho.\n\nSeedha matlab:\nStale closure fix bina re-subscribe. Effect/event me ref read karo.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function LatestQuery({ query }) {\n  const latest = useRef(query);\n  latest.current = query;\n  useEffect(() => {\n    const id = setTimeout(() => {\n      console.log(\"search\", latest.current);\n    }, 300);\n    return () => clearTimeout(id);\n  }, [query]);\n  return null;\n}"
          },
          {
            "title": "Q15: Ref hold DOM collection",
            "explain": "Kya karna hai:\nitemsRef.current = [] map me ref push — multiple nodes.\n\nSeedha matlab:\nList of refs kabhi chahiye. Usually key + single ref enough; pattern rare.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function ItemRefs({ items }) {\n  const refs = useRef([]);\n  refs.current = [];\n  return (\n    <ul>\n      {items.map((it, i) => (\n        <li\n          key={it.id}\n          ref={(el) => {\n            refs.current[i] = el;\n          }}\n        >\n          {it.text}\n        </li>\n      ))}\n    </ul>\n  );\n}"
          },
          {
            "title": "Q16: Merge refs utility sketch",
            "explain": "Kya karna hai:\nref={node => { refA.current = node; refB(node); }} — do refs ek element.\n\nSeedha matlab:\nLibrary + apna ref dono. Callback ref se merge.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function MergeRefInput() {\n  const localRef = useRef(null);\n  function mergedRef(node) {\n    localRef.current = node;\n  }\n  return <input ref={mergedRef} />;\n}"
          },
          {
            "title": "Q17: [ADV] Instance vars vs state",
            "explain": "Kya karna hai:\nisSubmittingRef vs isSubmitting state — UI dikhe to state.\n\nSeedha matlab:\nGuard flag sirf logic me (double submit rok) → ref OK. Spinner → state.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function SubmitGuard() {\n  const busyRef = useRef(false);\n  const [msg, setMsg] = useState(\"\");\n  async function submit() {\n    if (busyRef.current) return;\n    busyRef.current = true;\n    setMsg(\"Saving...\");\n    await new Promise((r) => setTimeout(r, 500));\n    busyRef.current = false;\n    setMsg(\"Done\");\n  }\n  return (\n    <div>\n      <button onClick={submit}>Save</button>\n      <p>{msg}</p>\n    </div>\n  );\n}"
          },
          {
            "title": "Q18: Ref for animation frame id",
            "explain": "Kya karna hai:\nrafRef.current = requestAnimationFrame(...); cancel on cleanup.\n\nSeedha matlab:\nTimer jaisa — id UI me nahi. Ref me rakho, unmount pe cancel.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function RafDemo() {\n  const rafRef = useRef(null);\n  const boxRef = useRef(null);\n  function animate() {\n    if (boxRef.current) boxRef.current.style.opacity = String(Math.random());\n    rafRef.current = requestAnimationFrame(animate);\n  }\n  function stop() {\n    cancelAnimationFrame(rafRef.current);\n  }\n  return (\n    <div>\n      <div ref={boxRef}>Animate</div>\n      <button onClick={animate}>Start</button>\n      <button onClick={stop}>Stop</button>\n    </div>\n  );\n}"
          },
          {
            "title": "Q19: Textarea select all on focus",
            "explain": "Kya karna hai:\nref + onFocus → ref.current.select()\n\nSeedha matlab:\nDOM imperative API — ref se natural fit.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function SelectOnFocus() {\n  const ref = useRef(null);\n  return (\n    <input\n      ref={ref}\n      defaultValue=\"select me\"\n      onFocus={() => ref.current?.select()}\n    />\n  );\n}"
          },
          {
            "title": "Q20: Ref null on unmount",
            "explain": "Kya karna hai:\nCleanup me ref.current = null optional — usually React handle.\n\nSeedha matlab:\nCallback ref me node null aata detach pe. Object ref bhi clear hota detach pe.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function RefLifecycle() {\n  const ref = useRef(null);\n  useEffect(() => {\n    return () => {\n      // ref.current already null-ish after unmount in many cases\n    };\n  }, []);\n  return <div ref={ref}>Mounted</div>;\n}"
          },
          {
            "title": "Q21: [ADV] Class instance vars analogy",
            "explain": "Kya karna hai:\nthis.timerId in class = useRef in function — survives render, no re-render.\n\nSeedha matlab:\nFunctional component me \"instance fields\" = refs. State = this.setState equivalent.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function ClassAnalogyTimer() {\n  const tickRef = useRef(0);\n  const idRef = useRef(null);\n  function start() {\n    idRef.current = setInterval(() => {\n      tickRef.current += 1;\n    }, 1000);\n  }\n  return <button onClick={start}>Start (check ref in devtools)</button>;\n}"
          },
          {
            "title": "Q22: Imperative handle sketch",
            "explain": "Kya karna hai:\nuseImperativeHandle(ref, () => ({ focus: () => ... })) — custom API expose.\n\nSeedha matlab:\nParent ko poora DOM nahi, sirf methods. Modals, inputs library pattern.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const ExposedInput = forwardRef(function ExposedInput(props, ref) {\n  const inner = useRef(null);\n  useImperativeHandle(ref, () => ({\n    focus: () => inner.current?.focus(),\n  }));\n  return <input ref={inner} {...props} />;\n});"
          },
          {
            "title": "Q23: Ref vs querySelector",
            "explain": "Kya karna hai:\ndocument.getElementById avoid — ref React way.\n\nSeedha matlab:\nSSR, testing, multiple roots me querySelector fragile. Ref scoped to component.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function NoQuerySelector() {\n  const btnRef = useRef(null);\n  return (\n    <button ref={btnRef} onClick={() => btnRef.current?.blur()}>\n      Blur self\n    </button>\n  );\n}"
          },
          {
            "title": "Q24: Copy previous props pattern",
            "explain": "Kya karna hai:\nprevPropsRef — effect me compare current vs prev.\n\nSeedha matlab:\n\"Sirf badla tab react karo\" — getDerivedStateFromProps smell, kabhi useful debug.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
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
        "kya": "Props drilling = parcel har floor pe haath se dena (App→A→B→C).",
        "detail": "11 — useContext\nLevel: MID  |  Sequence: pehle yeh, phir agla number\n\nLAYMAN: Props drilling = parcel har floor pe haath se dena (App→A→B→C).\nContext = building ka intercom — theme/user seedha sunne wale ko.\ncreateContext → Provider value= → useContext(MyContext) child me.\n\nOveruse mat karo — har cheez global mat. Sirf \"tree-wide\" data: theme, auth, locale.\nValue object har render naya = consumers re-render (memo/split careful).\n\nKYUN: Clean architecture; avoid 10-level props.\nINTERVIEW: when context vs props vs redux; re-render cost.\nVite/React 19 project me use — teaching file.",
        "intro": "11 — useContext\nLevel: MID  |  Sequence: pehle yeh, phir agla number\n\nLAYMAN: Props drilling = parcel har floor pe haath se dena (App→A→B→C).\nContext = building ka intercom — theme/user seedha sunne wale ko.\ncreateContext → Provider value= → useContext(MyContext) child me.\n\nOveruse mat karo — har cheez global mat. Sirf \"tree-wide\" data: theme, auth, locale.\nValue object har render naya = consumers re-render (memo/split careful).\n\nKYUN: Clean architecture; avoid 10-level props.\nINTERVIEW: when context vs props vs redux; re-render cost.\nVite/React 19 project me use — teaching file.",
        "questions": [
          {
            "title": "Q1: Create + Provider + consume",
            "explain": "Kya karna hai:\nThemeContext, Provider \"dark\", child useContext.\n\nSeedha matlab:\nTeen step: create, provide, consume. Bina Provider default.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const ThemeContext = createContext(\"light\");\n\nfunction ThemedButton() {\n  const theme = useContext(ThemeContext);\n  return <button className={theme}>Theme: {theme}</button>;\n}\n\nfunction AppTheme() {\n  return (\n    <ThemeContext.Provider value=\"dark\">\n      <ThemedButton />\n    </ThemeContext.Provider>\n  );\n}"
          },
          {
            "title": "Q2: Dynamic theme toggle",
            "explain": "Kya karna hai:\nstate theme + setTheme context value me.\n\nSeedha matlab:\nValue me { theme, toggle } — children update kar sakein.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const ThemeCtx = createContext(null);\n\nfunction ThemeProvider({ children }) {\n  const [theme, setTheme] = useState(\"light\");\n  const value = { theme, toggle: () => setTheme((t) => (t === \"light\" ? \"dark\" : \"light\")) };\n  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;\n}\n\nfunction ToggleBtn() {\n  const { theme, toggle } = useContext(ThemeCtx);\n  return <button onClick={toggle}>{theme}</button>;\n}"
          },
          {
            "title": "Q3: Auth user context sketch",
            "explain": "Kya karna hai:\nuser + login/logout provide.\n\nSeedha matlab:\nAuth classic context use-case. Real app me token/secure storage bhi.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const AuthCtx = createContext(null);\n\nfunction AuthProvider({ children }) {\n  const [user, setUser] = useState(null);\n  const login = (u) => setUser(u);\n  const logout = () => setUser(null);\n  return (\n    <AuthCtx.Provider value={{ user, login, logout }}>\n      {children}\n    </AuthCtx.Provider>\n  );\n}\n\nfunction WhoAmI() {\n  const { user, logout } = useContext(AuthCtx);\n  if (!user) return <p>Guest</p>;\n  return (\n    <p>\n      {user.name} <button onClick={logout}>Logout</button>\n    </p>\n  );\n}"
          },
          {
            "title": "Q4: Custom hook wrapper",
            "explain": "Kya karna hai:\nuseTheme() — context null pe throw (Provider bhool gaye).\n\nSeedha matlab:\nBetter DX. Har consumer me null check mat.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function useTheme() {\n  const ctx = useContext(ThemeCtx);\n  if (!ctx) throw new Error(\"useTheme needs ThemeProvider\");\n  return ctx;\n}\n\nfunction SafeToggle() {\n  const { theme, toggle } = useTheme();\n  return <button onClick={toggle}>{theme}</button>;\n}"
          },
          {
            "title": "Q5: [MID] Memoize context value",
            "explain": "Kya karna hai:\nuseMemo(() => ({ theme, toggle }), [theme]) — stable ref jab theme same.\n\nSeedha matlab:\nInline object har render naya → sab consumers re-render. Memo help.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function MemoThemeProvider({ children }) {\n  const [theme, setTheme] = useState(\"light\");\n  const value = useMemo(\n    () => ({\n      theme,\n      toggle: () => setTheme((t) => (t === \"light\" ? \"dark\" : \"light\")),\n    }),\n    [theme]\n  );\n  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;\n}"
          },
          {
            "title": "Q6: Split contexts (state vs dispatch)",
            "explain": "Kya karna hai:\nCountStateCtx + CountDispatchCtx — sirf button wale kam re-render.\n\nSeedha matlab:\nAdvanced optimize: jo sirf dispatch use kare state change pe na roye.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const CountState = createContext(0);\nconst CountDispatch = createContext(() => {});\n\nfunction CountProvider({ children }) {\n  const [n, setN] = useState(0);\n  return (\n    <CountState.Provider value={n}>\n      <CountDispatch.Provider value={setN}>{children}</CountDispatch.Provider>\n    </CountState.Provider>\n  );\n}"
          },
          {
            "title": "Q7: [MID] Default value vs Provider missing",
            "explain": "Kya karna hai:\ncreateContext(default) — Provider na ho to default.\n\nSeedha matlab:\nDefault useful tests/storybook. Production me often null + throw hook.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const LocaleCtx = createContext(\"en\");\nfunction Label() {\n  const locale = useContext(LocaleCtx);\n  return <span>{locale}</span>;\n}"
          },
          {
            "title": "Q8: Props still better for local",
            "explain": "Kya karna hai:\nParent→child ek level — props use karo, context overkill.\n\nSeedha matlab:\nContext = wide & rare change. Props = explicit & easy debug.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function LocalBetter({ title }) {\n  return <h1>{title}</h1>; // props fine — context mat lao\n}"
          },
          {
            "title": "Q9: createContext default value trap",
            "explain": "Kya karna hai:\ncreateContext({ theme: \"light\" }) — Provider bhool gaye to default chalta.\n\nSeedha matlab:\nDefault object har consumer ko milta — \"working\" lag sakta hai par bug hai.\nProduction me null default + hook me throw safer.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const BadDefaultCtx = createContext({ count: 0, inc: () => {} });\nfunction SilentBug() {\n  const { count, inc } = useContext(BadDefaultCtx); // Provider nahi — default inc noop\n  return <button onClick={inc}>{count}</button>; // click pe kuch nahi hoga\n}"
          },
          {
            "title": "Q10: Consumer (legacy) vs useContext",
            "explain": "Kya karna hai:\n<ThemeContext.Consumer>{(v) => ...}</ThemeContext.Consumer> — purana pattern.\n\nSeedha matlab:\nInterview me sunoge. Aaj useContext prefer — cleaner, hooks ke saath fit.\nClass components me Consumer ab bhi dikhega legacy code me.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function LegacyConsumerDemo() {\n  return (\n    <ThemeContext.Consumer>\n      {(theme) => <span>Legacy: {theme}</span>}\n    </ThemeContext.Consumer>\n  );\n}"
          },
          {
            "title": "Q11: [MID] Performance — sab consumers re-render",
            "explain": "Kya karna hai:\nProvider value change → har useContext wala subtree re-render (memo ke bina).\n\nSeedha matlab:\nContext cheap nahi hai har cheez ke liye. Frequent updates (mouse move) mat do.\nSplit context ya selector libraries jab scale ho.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function HeavyCtxProvider({ children }) {\n  const [tick, setTick] = useState(0);\n  const value = useMemo(() => ({ tick }), [tick]); // tick badle → sab consumers\n  return (\n    <ThemeCtx.Provider value={value}>\n      <button onClick={() => setTick((t) => t + 1)}>tick</button>\n      {children}\n    </ThemeCtx.Provider>\n  );\n}"
          },
          {
            "title": "Q12: Memo children under Provider",
            "explain": "Kya karna hai:\nReact.memo child + stable context value → unnecessary re-render skip.\n\nSeedha matlab:\nProvider value identity stable ho to memo children bach sakte hain.\nValue har render naya object → memo bhi fail.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const MemoChild = memo(function MemoChild({ label }) {\n  console.log(\"MemoChild render\");\n  return <span>{label}</span>;\n});\n\nfunction MemoChildrenDemo() {\n  const [theme, setTheme] = useState(\"light\");\n  const value = useMemo(() => ({ theme, setTheme }), [theme]);\n  return (\n    <ThemeCtx.Provider value={value}>\n      <MemoChild label=\"static label\" />\n    </ThemeCtx.Provider>\n  );\n}"
          },
          {
            "title": "Q13: React 19 Provider syntax note",
            "explain": "Kya karna hai:\nReact 19 me <ThemeContext value=\"dark\"> — .Provider optional shorthand.\n\nSeedha matlab:\nDono valid: <Ctx.Provider value={x}> ya <Ctx value={x}> (React 19+).\nPurane codebases me .Provider common — interview me dono jaano.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function React19ProviderNote() {\n  // React 19+: <ThemeContext value=\"dark\"><ThemedButton /></ThemeContext>\n  return (\n    <ThemeContext.Provider value=\"dark\">\n      <ThemedButton />\n    </ThemeContext.Provider>\n  );\n}"
          },
          {
            "title": "Q14: Context vs props decision",
            "explain": "Kya karna hai:\n1-2 level + local data → props. Tree-wide + rare change → context.\n\nSeedha matlab:\nProps explicit, debug easy. Context implicit, coupling badhata hai.\nRedux/Zustand jab global + devtools + middleware chahiye.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function ContextVsPropsNote() {\n  return (\n    <p>\n      Props = neighbour ko parcel. Context = building intercom. Redux = post office.\n    </p>\n  );\n}"
          },
          {
            "title": "Q15: [MID] Testing context",
            "explain": "Kya karna hai:\nTest me wrap: render(&lt;AuthProvider&gt;&lt;WhoAmI /&gt;&lt;/AuthProvider&gt;).\n\nSeedha matlab:\nCustom render helper banao jo default providers wrap kare.\nMock Provider value={{ user: mockUser }} se isolated test.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function TestWrapper({ children }) {\n  return <AuthProvider>{children}</AuthProvider>;\n}\n// test: render(<WhoAmI />, { wrapper: TestWrapper })"
          },
          {
            "title": "Q16: Nested Providers",
            "explain": "Kya karna hai:\nThemeProvider ke andar AuthProvider — dono alag context, order matter nahi.\n\nSeedha matlab:\nCompose multiple contexts like Russian dolls. Har ek apna value.\nDeep nesting messy ho to ek Provider combine karo (careful — re-render).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function AppProviders({ children }) {\n  return (\n    <ThemeProvider>\n      <AuthProvider>{children}</AuthProvider>\n    </ThemeProvider>\n  );\n}"
          },
          {
            "title": "Q17: Context value me function stability",
            "explain": "Kya karna hai:\ntoggle inline arrow har render naya → value memo ke bina unstable.\n\nSeedha matlab:\nuseCallback toggle + useMemo value = stable bundle.\nSirf theme change pe consumers update — toggle ref same rahe.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function StableToggleProvider({ children }) {\n  const [theme, setTheme] = useState(\"light\");\n  const toggle = useCallback(\n    () => setTheme((t) => (t === \"light\" ? \"dark\" : \"light\")),\n    []\n  );\n  const value = useMemo(() => ({ theme, toggle }), [theme, toggle]);\n  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;\n}"
          },
          {
            "title": "Q18: useContext outside Provider — null check",
            "explain": "Kya karna hai:\ncreateContext(null) + optional chaining vs throw in custom hook.\n\nSeedha matlab:\nnull default = \"Provider missing\" detect karna easy.\nuseTheme() throw = fail fast, better DX dev me.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function OptionalTheme() {\n  const ctx = useContext(ThemeCtx);\n  if (!ctx) return <p>No theme provider</p>;\n  return <span>{ctx.theme}</span>;\n}"
          },
          {
            "title": "Q19: [MID] Selective re-render with split + memo",
            "explain": "Kya karna hai:\nCountDisplay sirf CountState; IncBtn sirf CountDispatch.\n\nSeedha matlab:\nSplit contexts = built-in selector pattern. Display count change pe button na roye.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function CountDisplay() {\n  const n = useContext(CountState);\n  return <span>{n}</span>;\n}\n\nfunction IncBtn() {\n  const setN = useContext(CountDispatch);\n  return <button onClick={() => setN((x) => x + 1)}>+</button>;\n}"
          },
          {
            "title": "Q20: Context + useReducer combo sketch",
            "explain": "Kya karna hai:\nProvider value={{ state, dispatch }} — light Redux (see 12).\n\nSeedha matlab:\nComplex global state: reducer + context = scalable mid-size pattern.\ndispatch stable hota hai — split karke state alag context me rakho.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const StoreCtx = createContext(null);\nfunction StoreProvider({ children }) {\n  const [state, dispatch] = useReducer(\n    (s, a) => (a.type === \"inc\" ? { ...s, n: s.n + 1 } : s),\n    { n: 0 }\n  );\n  const value = useMemo(() => ({ state, dispatch }), [state]);\n  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>;\n}"
          },
          {
            "title": "Q21: Updating context from deep child",
            "explain": "Kya karna hai:\nChild sirf dispatch/setter le — state mutate direct mat.\n\nSeedha matlab:\nContext me setTheme pass karo, theme direct overwrite mat.\nImmutable updates — React re-render trigger properly.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function DeepToggle() {\n  const { toggle } = useTheme();\n  return <button onClick={toggle}>Deep toggle</button>;\n}"
          },
          {
            "title": "Q22: [MID] Anti-pattern — context for everything",
            "explain": "Kya karna hai:\nForm field state global context me mat rakho — local/colocate better.\n\nSeedha matlab:\nContext overuse = hidden deps, hard debug, extra re-renders.\nSirf genuinely shared / tree-wide data. Baaki props ya colocated state.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function ContextAntiPatternNote() {\n  return <p>Har input ka value context me = pain. Local state pehle socho.</p>;\n}"
          }
        ]
      },
      {
        "file": "12_UseReducer.jsx",
        "title": "12 — useReducer",
        "kya": "useState chhote dabbe. useReducer = kitchen manager jo ORDER (action)",
        "detail": "12 — useReducer\nLevel: MID  |  Sequence: pehle yeh, phir agla number\n\nLAYMAN: useState chhote dabbe. useReducer = kitchen manager jo ORDER (action)\nsunke state recipe (reducer) se naya state banata hai.\ndispatch({ type: \"add\", payload }) → reducer(state, action) → nextState.\n\nJab: kai related fields, complex transitions, next state purane pe depend,\nya \"event → how state changes\" clear document karna ho (Redux jaisa mini).\n\nKYUN: Forms/wizards/game logic clean. Testable pure reducer.\nINTERVIEW: when useReducer vs useState; pure reducer; immer optional.\nVite/React 19 project me use — teaching file.",
        "intro": "12 — useReducer\nLevel: MID  |  Sequence: pehle yeh, phir agla number\n\nLAYMAN: useState chhote dabbe. useReducer = kitchen manager jo ORDER (action)\nsunke state recipe (reducer) se naya state banata hai.\ndispatch({ type: \"add\", payload }) → reducer(state, action) → nextState.\n\nJab: kai related fields, complex transitions, next state purane pe depend,\nya \"event → how state changes\" clear document karna ho (Redux jaisa mini).\n\nKYUN: Forms/wizards/game logic clean. Testable pure reducer.\nINTERVIEW: when useReducer vs useState; pure reducer; immer optional.\nVite/React 19 project me use — teaching file.",
        "questions": [
          {
            "title": "Q1: Counter with reducer",
            "explain": "Kya karna hai:\nINC / DEC / RESET actions.\n\nSeedha matlab:\nSaari update logic ek jagah. UI sirf dispatch.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function counterReducer(state, action) {\n  switch (action.type) {\n    case \"inc\":\n      return state + 1;\n    case \"dec\":\n      return state - 1;\n    case \"reset\":\n      return 0;\n    default:\n      return state;\n  }\n}\n\nfunction CounterR() {\n  const [count, dispatch] = useReducer(counterReducer, 0);\n  return (\n    <div>\n      {count}\n      <button onClick={() => dispatch({ type: \"inc\" })}>+</button>\n      <button onClick={() => dispatch({ type: \"dec\" })}>-</button>\n      <button onClick={() => dispatch({ type: \"reset\" })}>0</button>\n    </div>\n  );\n}"
          },
          {
            "title": "Q2: Todo list reducer",
            "explain": "Kya karna hai:\nadd / toggle / remove.\n\nSeedha matlab:\nArray updates immutable. action.payload me data.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function todosReducer(state, action) {\n  switch (action.type) {\n    case \"add\":\n      return [...state, { id: action.id, text: action.text, done: false }];\n    case \"toggle\":\n      return state.map((t) =>\n        t.id === action.id ? { ...t, done: !t.done } : t\n      );\n    case \"remove\":\n      return state.filter((t) => t.id !== action.id);\n    default:\n      return state;\n  }\n}\n\nfunction Todos() {\n  const [todos, dispatch] = useReducer(todosReducer, []);\n  return (\n    <div>\n      <button\n        onClick={() =>\n          dispatch({ type: \"add\", id: Date.now(), text: \"New\" })\n        }\n      >\n        Add\n      </button>\n      <ul>\n        {todos.map((t) => (\n          <li key={t.id}>\n            <button onClick={() => dispatch({ type: \"toggle\", id: t.id })}>\n              {t.done ? \"✓\" : \"○\"} {t.text}\n            </button>\n          </li>\n        ))}\n      </ul>\n    </div>\n  );\n}"
          },
          {
            "title": "Q3: Form object reducer",
            "explain": "Kya karna hai:\nfield update action + reset.\n\nSeedha matlab:\nKai fields — ek reducer vs kai useState. Related → reducer nice.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function formReducer(state, action) {\n  switch (action.type) {\n    case \"change\":\n      return { ...state, [action.name]: action.value };\n    case \"reset\":\n      return action.initial;\n    default:\n      return state;\n  }\n}\n\nfunction ProfileForm() {\n  const initial = { name: \"\", city: \"\" };\n  const [form, dispatch] = useReducer(formReducer, initial);\n  return (\n    <form>\n      <input\n        name=\"name\"\n        value={form.name}\n        onChange={(e) =>\n          dispatch({ type: \"change\", name: \"name\", value: e.target.value })\n        }\n      />\n      <button\n        type=\"button\"\n        onClick={() => dispatch({ type: \"reset\", initial })}\n      >\n        Reset\n      </button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q4: Lazy init",
            "explain": "Kya karna hai:\nuseReducer(reducer, arg, initFn)\n\nSeedha matlab:\nHeavy initial state ek baar — init(arg) se banao.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function init(count) {\n  return { count, history: [] };\n}\nfunction lazyReducer(state, action) {\n  if (action.type === \"inc\") {\n    return { count: state.count + 1, history: [...state.history, state.count] };\n  }\n  return state;\n}\nfunction LazyCounter() {\n  const [state, dispatch] = useReducer(lazyReducer, 10, init);\n  return (\n    <button onClick={() => dispatch({ type: \"inc\" })}>{state.count}</button>\n  );\n}"
          },
          {
            "title": "Q5: [MID] Finite state machine feel",
            "explain": "Kya karna hai:\nstatus: idle→loading→success|error; invalid transitions ignore.\n\nSeedha matlab:\nReducer rules enforce — random setStatus bugs kam.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function fetchReducer(state, action) {\n  switch (action.type) {\n    case \"start\":\n      return state.status === \"loading\"\n        ? state\n        : { status: \"loading\", data: null, error: null };\n    case \"ok\":\n      return { status: \"success\", data: action.data, error: null };\n    case \"fail\":\n      return { status: \"error\", data: null, error: action.error };\n    default:\n      return state;\n  }\n}\n\nfunction FetchMachine() {\n  const [state, dispatch] = useReducer(fetchReducer, {\n    status: \"idle\",\n    data: null,\n    error: null,\n  });\n  async function load() {\n    dispatch({ type: \"start\" });\n    try {\n      const data = await fetch(\"/api\").then((r) => r.json());\n      dispatch({ type: \"ok\", data });\n    } catch (error) {\n      dispatch({ type: \"fail\", error: String(error) });\n    }\n  }\n  return (\n    <div>\n      <button onClick={load}>Load</button>\n      <p>{state.status}</p>\n    </div>\n  );\n}"
          },
          {
            "title": "Q6: [MID] useReducer + context = light Redux",
            "explain": "Kya karna hai:\nProvider me state+dispatch; children dispatch actions.\n\nSeedha matlab:\nMid apps me Redux se pehle yeh pattern. Scale carefully.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "// See 11_UseContext split pattern — pair with useReducer for store-like API."
          },
          {
            "title": "Q7: Immer-style note (concept)",
            "explain": "Kya karna hai:\nSamjho: mutate draft libraries exist; core React me spread/map.\n\nSeedha matlab:\nInterview: reducer must be pure — no fetch inside reducer.\nSide effects dispatch ke BAAD / effect me.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function pureReducer(state, action) {\n  // ✅ return new state only\n  // ❌ fetch(); localStorage.setItem — yahan mat\n  if (action.type === \"tick\") return { ...state, n: state.n + 1 };\n  return state;\n}"
          },
          {
            "title": "Q8: Prefer useState when simple",
            "explain": "Kya karna hai:\nEk boolean toggle — useState kaafi.\n\nSeedha matlab:\nOver-engineer mat. Complexity aaye tab reducer.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "// const [on, setOn] = useState(false); // simple → state"
          },
          {
            "title": "Q9: Complex nested state reducer",
            "explain": "Kya karna hai:\nstate = { user: { name, prefs: { theme } } } — nested update immutable.\n\nSeedha matlab:\nSpread chain lamba ho to immer socho. Core React me manual spread.\nRelated nested fields ek reducer me clean.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function nestedReducer(state, action) {\n  switch (action.type) {\n    case \"setTheme\":\n      return {\n        ...state,\n        user: {\n          ...state.user,\n          prefs: { ...state.user.prefs, theme: action.theme },\n        },\n      };\n    default:\n      return state;\n  }\n}\n\nfunction NestedProfile() {\n  const [state, dispatch] = useReducer(nestedReducer, {\n    user: { name: \"Jay\", prefs: { theme: \"light\" } },\n  });\n  return (\n    <button\n      onClick={() => dispatch({ type: \"setTheme\", theme: \"dark\" })}\n    >\n      {state.user.prefs.theme}\n    </button>\n  );\n}"
          },
          {
            "title": "Q10: Immer sketch (concept)",
            "explain": "Kya karna hai:\ndraft.user.prefs.theme = \"dark\"; return draft — immer produce() wrap.\n\nSeedha matlab:\nInterview: \"immer se mutate likho, immutable output milega.\"\nReducer ke andar produce(state, draft => { draft.n++ }) — optional lib.\nCore interview: spread bhi acceptable answer.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "// import { produce } from \"immer\";\n// const next = produce(state, draft => { draft.items.push(x); });"
          },
          {
            "title": "Q11: Init function deep dive",
            "explain": "Kya karna hai:\nuseReducer(reducer, props.initialCount, (n) => ({ count: n, log: [] }))\n\nSeedha matlab:\nInit sirf FIRST mount pe chalta — re-mount pe arg change ignore (usually).\nlocalStorage se hydrate karna common init use-case.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function readStoredCount(key, fallback) {\n  const raw = localStorage.getItem(key);\n  return raw != null ? Number(raw) : fallback;\n}\nfunction persistedInit(n) {\n  return { count: readStoredCount(\"count\", n), history: [] };\n}"
          },
          {
            "title": "Q12: [MID] dispatch stability",
            "explain": "Kya karna hai:\ndispatch function reference mount se stable — deps me safe.\n\nSeedha matlab:\nuseEffect(() => { dispatch({ type: \"tick\" }) }, [dispatch]) — OK.\nsetState jaisa stable identity — context me pass karo bina memo ke.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function StableDispatchDemo() {\n  const [state, dispatch] = useReducer(counterReducer, 0);\n  // dispatch identity stable across renders\n  return <button onClick={() => dispatch({ type: \"inc\" })}>{state}</button>;\n}"
          },
          {
            "title": "Q13: Reducer purity rules",
            "explain": "Kya karna hai:\nReducer me: no fetch, no Date.now side effect, no mutate state arg.\n\nSeedha matlab:\nPure (state, action) => newState — same input same output.\nSide effects action handler / useEffect me. Test reducer alag easily.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function impureBad(state, action) {\n  // ❌ state.items.push(action.item); return state; — mutate\n  // ❌ fetch(\"/api\"); — side effect\n  if (action.type === \"add\") return [...state, action.item];\n  return state;\n}"
          },
          {
            "title": "Q14: Middleware-ish wrapper sketch",
            "explain": "Kya karna hai:\nfunction logger(reducer) { return (s,a) => { console.log(a); return reducer(s,a) } }\n\nSeedha matlab:\nHigher-order reducer — Redux middleware idea mini.\nuseReducer(logger(myReducer), init) — debug / analytics wrap.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function withLogger(reducer) {\n  return (state, action) => {\n    console.log(\"action\", action.type);\n    return reducer(state, action);\n  };\n}\n\nfunction LoggedCounter() {\n  const [count, dispatch] = useReducer(withLogger(counterReducer), 0);\n  return <button onClick={() => dispatch({ type: \"inc\" })}>{count}</button>;\n}"
          },
          {
            "title": "Q15: useReducer vs useState — when which",
            "explain": "Kya karna hai:\n1 field toggle → useState. 5+ related fields + transitions → reducer.\n\nSeedha matlab:\nuseState: simple, kam boilerplate. useReducer: event→state map clear.\nNext state purane pe complex depend → reducer shine.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function WhenWhichNote() {\n  return (\n    <p>\n      Simple bool → useState. Wizard steps / cart / FSM → useReducer.\n    </p>\n  );\n}"
          },
          {
            "title": "Q16: Action creators",
            "explain": "Kya karna hai:\nconst inc = () => ({ type: \"inc\" }); dispatch(inc());\n\nSeedha matlab:\nTypos kam — type string ek jagah. Components clean.\nRedux me standard; local useReducer me bhi helpful bade apps me.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const incAction = () => ({ type: \"inc\" });\nconst decAction = () => ({ type: \"dec\" });\n\nfunction ActionCreatorCounter() {\n  const [count, dispatch] = useReducer(counterReducer, 0);\n  return (\n    <div>\n      {count}\n      <button onClick={() => dispatch(incAction())}>+</button>\n      <button onClick={() => dispatch(decAction())}>-</button>\n    </div>\n  );\n}"
          },
          {
            "title": "Q17: [MID] TypeScript-ish action unions (comments)",
            "explain": "Kya karna hai:\ntype Action = { type: \"inc\" } | { type: \"add\"; text: string }\n\nSeedha matlab:\nDiscriminated union — switch exhaustive. payload typed per action.\nJS me comments se document; TS me compiler help karta hai.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "// /** @typedef {{ type: \"toggle\"; id: number }} ToggleAction */\n// /** @typedef {{ type: \"add\"; text: string; id: number }} AddAction */\n// /** @typedef {ToggleAction | AddAction} TodoAction */"
          },
          {
            "title": "Q18: Batch related updates one dispatch",
            "explain": "Kya karna hai:\naction { type: \"loginSuccess\", user, token } — ek dispatch multiple fields.\n\nSeedha matlab:\nKai setState calls vs ek reducer action — atomic update, ek re-render.\nRace / half-updated state bugs kam.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function authReducer(state, action) {\n  switch (action.type) {\n    case \"loginSuccess\":\n      return { ...state, user: action.user, token: action.token, status: \"in\" };\n    case \"logout\":\n      return { user: null, token: null, status: \"out\" };\n    default:\n      return state;\n  }\n}"
          },
          {
            "title": "Q19: Default case return state",
            "explain": "Kya karna hai:\nswitch default: return state — unknown action ignore.\n\nSeedha matlab:\nKabhi default throw karte hain dev me — typo catch. Prod me often return state.\nRedux Toolkit me extraReducers alag pattern.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function strictReducer(state, action) {\n  switch (action.type) {\n    case \"inc\":\n      return state + 1;\n    default:\n      throw new Error(`Unknown action: ${action.type}`);\n  }\n}"
          },
          {
            "title": "Q20: [MID] useReducer + lazy init + localStorage",
            "explain": "Kya karna hai:\ninit reads storage once; reducer updates; effect persists (optional).\n\nSeedha matlab:\nHeavy init ek baar. Re-render pe init dubara nahi.\nCustom hook usePersistedReducer bana sakte ho.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function PersistedCounter() {\n  const [state, dispatch] = useReducer(lazyReducer, 0, persistedInit);\n  return (\n    <button onClick={() => dispatch({ type: \"inc\" })}>{state.count}</button>\n  );\n}"
          },
          {
            "title": "Q21: Replacing multiple useState with one reducer",
            "explain": "Kya karna hai:\nloading, data, error teen useState → ek fetchReducer (Q5 jaisa).\n\nSeedha matlab:\nRelated async states sync rehna easy. Ek action invalidates doosra field.\nsetLoading(true); setError(null) — do calls vs dispatch({ type: \"start\" }).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function FetchStateNote() {\n  return <p>Async trio (loading/data/error) = classic reducer win.</p>;\n}"
          },
          {
            "title": "Q22: Testing reducer in isolation",
            "explain": "Kya karna hai:\nexpect(todosReducer([], { type: \"add\", id: 1, text: \"x\" })).toEqual([...])\n\nSeedha matlab:\nPure reducer = unit test bina React render ke. Fast, reliable.\nComponent test alag; business logic reducer me rakho.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "// test(\"toggle\", () => {\n//   const s = [{ id: 1, done: false }];\n//   expect(todosReducer(s, { type: \"toggle\", id: 1 })[0].done).toBe(true);\n// });"
          }
        ]
      },
      {
        "file": "13_CustomHooks.jsx",
        "title": "13 — Custom Hooks",
        "kya": "Custom hook = apna kitchen gadget. useX naam, andar built-in hooks.",
        "detail": "13 — Custom Hooks\nLevel: MID  |  Sequence: pehle yeh, phir agla number\n\nLAYMAN: Custom hook = apna kitchen gadget. useX naam, andar built-in hooks.\nLogic reuse: localStorage sync, fetch, form — copy-paste mat, hook nikaalo.\n\nRules of Hooks apply: top level, sirf React functions me.\nReturn jo chahiye: value, tuple [val, set], ya object { data, error }.\n\nKYUN: DRY + testable units. Libraries khud custom hooks hain.\nINTERVIEW: rules of hooks; extract when; naming use*.\nVite/React 19 project me use — teaching file.",
        "intro": "13 — Custom Hooks\nLevel: MID  |  Sequence: pehle yeh, phir agla number\n\nLAYMAN: Custom hook = apna kitchen gadget. useX naam, andar built-in hooks.\nLogic reuse: localStorage sync, fetch, form — copy-paste mat, hook nikaalo.\n\nRules of Hooks apply: top level, sirf React functions me.\nReturn jo chahiye: value, tuple [val, set], ya object { data, error }.\n\nKYUN: DRY + testable units. Libraries khud custom hooks hain.\nINTERVIEW: rules of hooks; extract when; naming use*.\nVite/React 19 project me use — teaching file.",
        "questions": [
          {
            "title": "Q1: useToggle",
            "explain": "Kya karna hai:\nboolean + toggle function return.\n\nSeedha matlab:\nChhota reusable pattern. Har jagah useState mat dohrao.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function useToggle(initial = false) {\n  const [on, setOn] = useState(initial);\n  const toggle = () => setOn((v) => !v);\n  return [on, toggle];\n}\n\nfunction MenuBtn() {\n  const [open, toggle] = useToggle();\n  return <button onClick={toggle}>{open ? \"Open\" : \"Closed\"}</button>;\n}"
          },
          {
            "title": "Q2: useLocalStorage",
            "explain": "Kya karna hai:\nkey se read/write; state sync.\n\nSeedha matlab:\nPersist preference. SSR careful (window check) — yahan client assume.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function useLocalStorage(key, initial) {\n  const [value, setValue] = useState(() => {\n    const raw = localStorage.getItem(key);\n    return raw != null ? JSON.parse(raw) : initial;\n  });\n  useEffect(() => {\n    localStorage.setItem(key, JSON.stringify(value));\n  }, [key, value]);\n  return [value, setValue];\n}\n\nfunction ThemeRemember() {\n  const [theme, setTheme] = useLocalStorage(\"theme\", \"light\");\n  return (\n    <button onClick={() => setTheme(theme === \"light\" ? \"dark\" : \"light\")}>\n      {theme}\n    </button>\n  );\n}"
          },
          {
            "title": "Q3: useFetch sketch",
            "explain": "Kya karna hai:\nurl → { data, error, loading }\n\nSeedha matlab:\nData fetching pattern encapsulate. Abort cleanup.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function useFetch(url) {\n  const [data, setData] = useState(null);\n  const [error, setError] = useState(null);\n  const [loading, setLoading] = useState(true);\n  useEffect(() => {\n    let alive = true;\n    setLoading(true);\n    fetch(url)\n      .then((r) => r.json())\n      .then((d) => {\n        if (alive) {\n          setData(d);\n          setError(null);\n        }\n      })\n      .catch((e) => {\n        if (alive) setError(e);\n      })\n      .finally(() => {\n        if (alive) setLoading(false);\n      });\n    return () => {\n      alive = false;\n    };\n  }, [url]);\n  return { data, error, loading };\n}"
          },
          {
            "title": "Q4: useDocumentTitle",
            "explain": "Kya karna hai:\ntitle string effect.\n\nSeedha matlab:\nOne-liner side effect hooks — readable App.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function useDocumentTitle(title) {\n  useEffect(() => {\n    document.title = title;\n  }, [title]);\n}\n\nfunction Page() {\n  useDocumentTitle(\"Dashboard\");\n  return <h1>Dashboard</h1>;\n}"
          },
          {
            "title": "Q5: [MID] useDebouncedValue",
            "explain": "Kya karna hai:\nvalue change → wait ms → debounced return (search).\n\nSeedha matlab:\nTypeahead: API spam kam. Timer cleanup.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function useDebouncedValue(value, ms = 300) {\n  const [debounced, setDebounced] = useState(value);\n  useEffect(() => {\n    const id = setTimeout(() => setDebounced(value), ms);\n    return () => clearTimeout(id);\n  }, [value, ms]);\n  return debounced;\n}\n\nfunction SearchBox() {\n  const [q, setQ] = useState(\"\");\n  const dq = useDebouncedValue(q, 400);\n  useEffect(() => {\n    if (dq) console.log(\"search\", dq);\n  }, [dq]);\n  return <input value={q} onChange={(e) => setQ(e.target.value)} />;\n}"
          },
          {
            "title": "Q6: [MID] Hook composing hooks",
            "explain": "Kya karna hai:\nuseAuthHeaders ke upar useApi — hooks nest OK.\n\nSeedha matlab:\nComposition > inheritance. Custom hooks milake badi feature.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function useOnline() {\n  const [online, setOnline] = useState(navigator.onLine);\n  useEffect(() => {\n    const on = () => setOnline(true);\n    const off = () => setOnline(false);\n    window.addEventListener(\"online\", on);\n    window.addEventListener(\"offline\", off);\n    return () => {\n      window.removeEventListener(\"online\", on);\n      window.removeEventListener(\"offline\", off);\n    };\n  }, []);\n  return online;\n}\n\nfunction useSafeFetch(url) {\n  const online = useOnline();\n  const result = useFetch(online ? url : \"\");\n  return { ...result, online };\n}"
          },
          {
            "title": "Q7: Return stable callbacks",
            "explain": "Kya karna hai:\nuseCallback se returned functions stable (deps sahi).\n\nSeedha matlab:\nChild memoized ho to matter. Warna optional.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function useCounter(start = 0) {\n  const [n, setN] = useState(start);\n  const inc = useCallback(() => setN((x) => x + 1), []);\n  const reset = useCallback(() => setN(start), [start]);\n  return { n, inc, reset };\n}"
          },
          {
            "title": "Q8: Don't conditionally call hooks",
            "explain": "Kya karna hai:\nif (x) useSomething() — FORBIDDEN.\n\nSeedha matlab:\nRules of Hooks. Conditional logic hook KE ANDAR.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Bad() {\n  // if ( Cond) useToggle(); // ❌\n  const [on, toggle] = useToggle(); // ✅ always\n  return on ? <button onClick={toggle}>on</button> : null;\n}"
          },
          {
            "title": "Q9: Rules of Hooks — top level only",
            "explain": "Kya karna hai:\nHooks loop / nested function / class me mat call karo.\n\nSeedha matlab:\nReact hook order fixed rakhta hai. Break rules = random bugs.\nCustom hooks me bhi same rules — wo bhi hooks hain.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function GoodRules() {\n  const [a, setA] = useState(0);\n  // for (let i = 0; i < 3; i++) useState(i); // ❌ loop me mat\n  return <button onClick={() => setA(a + 1)}>{a}</button>;\n}"
          },
          {
            "title": "Q10: Return tuple vs object",
            "explain": "Kya karna hai:\n[value, setValue] vs { value, setValue, reset } — API design.\n\nSeedha matlab:\nTuple = useState jaisa familiar, order matter. Object = named, extensible.\n3+ returns → object better. Destructure rename easy object me.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function useNamedCounter(initial = 0) {\n  const [n, setN] = useState(initial);\n  const reset = () => setN(initial);\n  return { n, setN, reset }; // object API\n}\n\nfunction TupleVsObjectDemo() {\n  const [on, toggle] = useToggle(); // tuple\n  const { n, reset } = useNamedCounter(5); // object\n  return (\n    <div>\n      <button onClick={toggle}>{String(on)}</button>\n      <button onClick={reset}>{n}</button>\n    </div>\n  );\n}"
          },
          {
            "title": "Q11: [MID] useLocalStorage SSR trap",
            "explain": "Kya karna hai:\ntypeof window !== \"undefined\" check lazy init me.\n\nSeedha matlab:\nSSR pe localStorage nahi — crash. Lazy initializer me guard.\nHydration mismatch: server default vs client stored value — flash possible.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function useLocalStorageSafe(key, initial) {\n  const [value, setValue] = useState(() => {\n    if (typeof window === \"undefined\") return initial;\n    const raw = localStorage.getItem(key);\n    return raw != null ? JSON.parse(raw) : initial;\n  });\n  useEffect(() => {\n    if (typeof window !== \"undefined\") {\n      localStorage.setItem(key, JSON.stringify(value));\n    }\n  }, [key, value]);\n  return [value, setValue];\n}"
          },
          {
            "title": "Q12: useFetch — AbortController cleanup",
            "explain": "Kya karna hai:\nconst ctrl = new AbortController(); fetch(url, { signal: ctrl.signal })\n\nSeedha matlab:\nUnmount / url change pe purana request cancel — race condition fix.\nalive flag bhi chalega; AbortController zyada proper.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function useFetchAbort(url) {\n  const [data, setData] = useState(null);\n  const [loading, setLoading] = useState(true);\n  useEffect(() => {\n    const ctrl = new AbortController();\n    setLoading(true);\n    fetch(url, { signal: ctrl.signal })\n      .then((r) => r.json())\n      .then(setData)\n      .catch((e) => {\n        if (e.name !== \"AbortError\") console.error(e);\n      })\n      .finally(() => setLoading(false));\n    return () => ctrl.abort();\n  }, [url]);\n  return { data, loading };\n}"
          },
          {
            "title": "Q13: Naming — must start with use*",
            "explain": "Kya karna hai:\nfunction getTheme() { useContext(...) } — ❌ Rules of Hooks break.\n\nSeedha matlab:\nuse prefix = linter + React samjhe hook hai. Call sirf components/hooks se.\nfetchData() me useState mat — rename useFetchData.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function useWindowWidth() {\n  const [w, setW] = useState(window.innerWidth);\n  useEffect(() => {\n    const onResize = () => setW(window.innerWidth);\n    window.addEventListener(\"resize\", onResize);\n    return () => window.removeEventListener(\"resize\", onResize);\n  }, []);\n  return w;\n}"
          },
          {
            "title": "Q14: [MID] Stale closure in custom hook",
            "explain": "Kya karna hai:\nuseEffect(() => { setInterval(() => setCount(count+1), 1000) }, []) — stale count.\n\nSeedha matlab:\nFunctional update setCount(c => c+1) ya count deps me.\nCustom hooks me bhi wahi closure rules — extract matlab bug-free karo.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function useStaleAwareCounter(start = 0) {\n  const [count, setCount] = useState(start);\n  const tick = useCallback(() => setCount((c) => c + 1), []); // functional — safe\n  return { count, tick };\n}"
          },
          {
            "title": "Q15: Composing hooks — useAuth + useFetch",
            "explain": "Kya karna hai:\nuseUserPosts() { const { token } = useAuth(); return useFetch(`/posts?token=${token}`) }\n\nSeedha matlab:\nHooks nest freely. Badi feature chhoti hooks se banao.\nShared logic extract — component slim.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function useAuthToken() {\n  const [token] = useLocalStorage(\"token\", null);\n  return token;\n}\n\nfunction useUserPosts() {\n  const token = useAuthToken();\n  return useFetch(token ? `/api/posts?token=${token}` : null);\n}"
          },
          {
            "title": "Q16: Testing hooks note",
            "explain": "Kya karna hai:\n@testing-library/react renderHook(() => useToggle()) — act() wrap updates.\n\nSeedha matlab:\nHooks ko component ke andar test karo ya renderHook use karo.\nProvider wrap zaroori agar hook context use kare.\nPure logic alag function me = test aur easy.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "// const { result } = renderHook(() => useToggle(true));\n// act(() => result.current[1]()); // toggle"
          },
          {
            "title": "Q17: Extract when — duplicate logic 2+ jagah",
            "explain": "Kya karna hai:\nSame useEffect copy-paste do components me → hook banao.\n\nSeedha matlab:\nEk baar use ho raha — mat banao (YAGNI). Do jagah = extract socho.\nHook = behavior reuse, UI nahi.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function useMediaQuery(query) {\n  const [matches, setMatches] = useState(() =>\n    window.matchMedia(query).matches\n  );\n  useEffect(() => {\n    const mq = window.matchMedia(query);\n    const fn = () => setMatches(mq.matches);\n    mq.addEventListener(\"change\", fn);\n    return () => mq.removeEventListener(\"change\", fn);\n  }, [query]);\n  return matches;\n}"
          },
          {
            "title": "Q18: [MID] Hook returning stable object — useMemo",
            "explain": "Kya karna hai:\nreturn { data, loading, refetch } — har render naya object → consumer memo fail.\n\nSeedha matlab:\nuseMemo return object jab consumer memoized ho. Warna often OK.\nrefetch = useCallback stable rakho.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function useFetchStable(url) {\n  const { data, error, loading } = useFetch(url);\n  const refetch = useCallback(() => {\n    /* trigger re-fetch pattern */\n  }, [url]);\n  return useMemo(\n    () => ({ data, error, loading, refetch }),\n    [data, error, loading, refetch]\n  );\n}"
          },
          {
            "title": "Q19: usePrevious hook pattern",
            "explain": "Kya karna hai:\nref me last value; effect me update after render.\n\nSeedha matlab:\n\"Pehle value kya thi?\" animations / diff ke liye.\nClassic custom hook interview question.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function usePrevious(value) {\n  const ref = useRef();\n  useEffect(() => {\n    ref.current = value;\n  }, [value]);\n  return ref.current;\n}"
          },
          {
            "title": "Q20: useEventListener reusable hook",
            "explain": "Kya karna hai:\nuseEventListener(\"keydown\", handler, window) — add/remove cleanup.\n\nSeedha matlab:\nEvent listener boilerplate ek jagah. handler ref pattern stale avoid.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function useEventListener(event, handler, target = window) {\n  const saved = useRef(handler);\n  useEffect(() => {\n    saved.current = handler;\n  }, [handler]);\n  useEffect(() => {\n    const fn = (e) => saved.current(e);\n    target.addEventListener(event, fn);\n    return () => target.removeEventListener(event, fn);\n  }, [event, target]);\n}"
          },
          {
            "title": "Q21: [MID] Custom hook parameters — primitives vs objects",
            "explain": "Kya karna hai:\nuseFetch({ url, method }) — object arg har render naya → effect rerun risk.\n\nSeedha matlab:\nPrimitive deps stable. Object pass karo to parent memoize ya flatten args.\nHook API design matter karta hai bugs ke liye.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function useFetchOpts(url, method = \"GET\") {\n  return useFetch(url); // primitives as deps — predictable\n}"
          },
          {
            "title": "Q22: Don't share mutable refs between hook instances",
            "explain": "Kya karna hai:\nModule-level let cache = {} — do components share = bug.\n\nSeedha matlab:\nHar hook call apna useRef/useState. Global mutable state hook me mat.\nSingleton cache alag pattern — document clearly.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function useIdGenerator() {\n  const idRef = useRef(0);\n  const next = useCallback(() => {\n    idRef.current += 1;\n    return idRef.current;\n  }, []);\n  return next;\n}"
          }
        ]
      },
      {
        "file": "14_LiftingStateUp.jsx",
        "title": "14 — Lifting State Up",
        "kya": "Do siblings ko same data chahiye — state unke common parent me rakho.",
        "detail": "14 — Lifting State Up\nLevel: MID  |  Sequence: pehle yeh, phir agla number\n\nLAYMAN: Do siblings ko same data chahiye — state unke common parent me rakho.\nJaise ghar ka thermostat living room me; har room apna AC remote nahi.\nParent state rakhe, children props + callbacks se padhein/badlein.\n\nPattern: const [x, setX] = useState in Parent; Child value={x} onChange={setX}.\nKab lift: shared sync. Kab mat: sirf ek child use kare — local rakh.\n\nKYUN: Single source of truth. Duplicate state sync bugs khatam.\nINTERVIEW: where should state live; controlled child.\nVite/React 19 project me use — teaching file.",
        "intro": "14 — Lifting State Up\nLevel: MID  |  Sequence: pehle yeh, phir agla number\n\nLAYMAN: Do siblings ko same data chahiye — state unke common parent me rakho.\nJaise ghar ka thermostat living room me; har room apna AC remote nahi.\nParent state rakhe, children props + callbacks se padhein/badlein.\n\nPattern: const [x, setX] = useState in Parent; Child value={x} onChange={setX}.\nKab lift: shared sync. Kab mat: sirf ek child use kare — local rakh.\n\nKYUN: Single source of truth. Duplicate state sync bugs khatam.\nINTERVIEW: where should state live; controlled child.\nVite/React 19 project me use — teaching file.",
        "questions": [
          {
            "title": "Q1: Two inputs synced via parent",
            "explain": "Kya karna hai:\nCelsius parent state; do children dikhayein.\n\nSeedha matlab:\nShared value upar. Children dumb-ish display/editors.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function TempDisplay({ celsius }) {\n  return <p>{celsius}°C</p>;\n}\n\nfunction TempInput({ celsius, onCelsiusChange }) {\n  return (\n    <input\n      type=\"number\"\n      value={celsius}\n      onChange={(e) => onCelsiusChange(Number(e.target.value))}\n    />\n  );\n}\n\nfunction TempApp() {\n  const [celsius, setCelsius] = useState(25);\n  return (\n    <div>\n      <TempInput celsius={celsius} onCelsiusChange={setCelsius} />\n      <TempDisplay celsius={celsius} />\n    </div>\n  );\n}"
          },
          {
            "title": "Q2: Accordion — only one open",
            "explain": "Kya karna hai:\nopenId parent me; panels id match pe open.\n\nSeedha matlab:\nMutual exclusion state naturally lifts to parent.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Panel({ id, openId, onOpen, title, children }) {\n  const open = openId === id;\n  return (\n    <div>\n      <button onClick={() => onOpen(id)}>{title}</button>\n      {open && <div>{children}</div>}\n    </div>\n  );\n}\n\nfunction Accordion() {\n  const [openId, setOpenId] = useState(null);\n  return (\n    <>\n      <Panel id=\"a\" openId={openId} onOpen={setOpenId} title=\"A\">\n        AAA\n      </Panel>\n      <Panel id=\"b\" openId={openId} onOpen={setOpenId} title=\"B\">\n        BBB\n      </Panel>\n    </>\n  );\n}"
          },
          {
            "title": "Q3: List + detail selection",
            "explain": "Kya karna hai:\nselectedId parent; List click → Detail show.\n\nSeedha matlab:\nMaster-detail classic lift.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function List({ items, selectedId, onSelect }) {\n  return (\n    <ul>\n      {items.map((it) => (\n        <li key={it.id}>\n          <button onClick={() => onSelect(it.id)}>\n            {it.id === selectedId ? \"→ \" : \"\"}\n            {it.name}\n          </button>\n        </li>\n      ))}\n    </ul>\n  );\n}\n\nfunction Detail({ item }) {\n  if (!item) return <p>Select one</p>;\n  return <article>{item.name}</article>;\n}\n\nfunction MasterDetail() {\n  const items = [\n    { id: 1, name: \"Ada\" },\n    { id: 2, name: \"Lin\" },\n  ];\n  const [selectedId, setSelectedId] = useState(null);\n  const item = items.find((i) => i.id === selectedId);\n  return (\n    <div>\n      <List items={items} selectedId={selectedId} onSelect={setSelectedId} />\n      <Detail item={item} />\n    </div>\n  );\n}"
          },
          {
            "title": "Q4: Don't lift too high",
            "explain": "Kya karna hai:\nHover state sirf ek card me — parent App me mat.\n\nSeedha matlab:\nState jitna neeche ho sake utna better (colocate). Lift jab share zaroori.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Card() {\n  const [hover, setHover] = useState(false); // local OK\n  return (\n    <div\n      onMouseEnter={() => setHover(true)}\n      onMouseLeave={() => setHover(false)}\n    >\n      {hover ? \"hot\" : \"cold\"}\n    </div>\n  );\n}"
          },
          {
            "title": "Q5: [MID] Derived state — don't duplicate",
            "explain": "Kya karna hai:\nfullName = first + last — alag state mat; render me compute.\n\nSeedha matlab:\nDuplicate state sync hell. Source fields rakho, derive baaki.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function NameForm() {\n  const [first, setFirst] = useState(\"\");\n  const [last, setLast] = useState(\"\");\n  const fullName = `${first} ${last}`.trim();\n  return (\n    <div>\n      <input value={first} onChange={(e) => setFirst(e.target.value)} />\n      <input value={last} onChange={(e) => setLast(e.target.value)} />\n      <p>{fullName}</p>\n    </div>\n  );\n}"
          },
          {
            "title": "Q6: Callback props naming",
            "explain": "Kya karna hai:\nonX / setX clear names — child ko pata parent expect kya.\n\nSeedha matlab:\nConvention: onChange, onSubmit, onSelect. Readable API.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function SearchField({ value, onChange }) {\n  return <input value={value} onChange={(e) => onChange(e.target.value)} />;\n}"
          },
          {
            "title": "Q7: [MID] Lift then maybe context",
            "explain": "Kya karna hai:\nBohot deep tree me same state — lift + context (11).\n\nSeedha matlab:\nPehle lift parent. Props drilling pain ho to context. Steps skip mat.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "// Parent state → props → if drilling pain → Context Provider"
          },
          {
            "title": "Q8: Controlled vs internal state child",
            "explain": "Kya karna hai:\nKabhi child optional value/onChange (controlled) ya default local.\n\nSeedha matlab:\nFlexible components: if value!=null controlled else self state.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function FlexibleInput({ value, onChange, defaultValue = \"\" }) {\n  const [inner, setInner] = useState(defaultValue);\n  const isControlled = value !== undefined;\n  const v = isControlled ? value : inner;\n  function handle(e) {\n    if (!isControlled) setInner(e.target.value);\n    onChange?.(e.target.value);\n  }\n  return <input value={v} onChange={handle} />;\n}"
          },
          {
            "title": "Q9: Syncing two inputs — Celsius & Fahrenheit",
            "explain": "Kya karna hai:\nParent me celsius state; F input convert karke setCelsius call.\n\nSeedha matlab:\nDono inputs ek source of truth share. Conversion parent ya handler me.\nDuplicate F state mat — derive from C.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function FahrenheitInput({ celsius, onCelsiusChange }) {\n  const fahrenheit = (celsius * 9) / 5 + 32;\n  return (\n    <input\n      type=\"number\"\n      value={Math.round(fahrenheit * 100) / 100}\n      onChange={(e) => {\n        const f = Number(e.target.value);\n        onCelsiusChange(((f - 32) * 5) / 9);\n      }}\n    />\n  );\n}\n\nfunction TempConverter() {\n  const [celsius, setCelsius] = useState(25);\n  return (\n    <div>\n      <TempInput celsius={celsius} onCelsiusChange={setCelsius} />\n      <FahrenheitInput celsius={celsius} onCelsiusChange={setCelsius} />\n      <TempDisplay celsius={celsius} />\n    </div>\n  );\n}"
          },
          {
            "title": "Q10: Controlled child — value + onChange required",
            "explain": "Kya karna hai:\nParent owns state; child sirf display + notify — \"controlled component\".\n\nSeedha matlab:\nReact forms ka core pattern. Child apna state nahi rakhta value ke liye.\nSingle source of truth parent me.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function ControlledInput({ value, onChange, label }) {\n  return (\n    <label>\n      {label}\n      <input value={value} onChange={(e) => onChange(e.target.value)} />\n    </label>\n  );\n}\n\nfunction ControlledForm() {\n  const [email, setEmail] = useState(\"\");\n  return <ControlledInput label=\"Email\" value={email} onChange={setEmail} />;\n}"
          },
          {
            "title": "Q11: [MID] When lift vs colocate — decision tree",
            "explain": "Kya karna hai:\nSirf ek child use kare → local. Do siblings sync → lift parent.\n\nSeedha matlab:\nState jitna neeche utna better performance + clarity.\nLift sirf jab share/sync zaroori ho — premature lift mat.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function ColocateNote() {\n  return <p>Pehle colocate try karo. Share need aaye tab lift.</p>;\n}"
          },
          {
            "title": "Q12: Prop drilling pain → context step",
            "explain": "Kya karna hai:\nApp → Layout → Page → Widget → Leaf same user prop — drilling.\n\nSeedha matlab:\n2-3 level props OK. 5+ same prop → context consider (11 file).\nLift pehle try; drilling unbearable ho to context.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function DrillingSketch({ user }) {\n  return <Middle user={user} />;\n}\nfunction Middle({ user }) {\n  return <Leaf user={user} />;\n}\nfunction Leaf({ user }) {\n  return <span>{user?.name}</span>;\n}"
          },
          {
            "title": "Q13: Lifting filter state for shared list",
            "explain": "Kya karna hai:\nquery parent me; List + Count dono filtered items use karein.\n\nSeedha matlab:\nSearch box aur results sync — natural lift candidate.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function FilterBar({ query, onQueryChange }) {\n  return (\n    <input value={query} onChange={(e) => onQueryChange(e.target.value)} />\n  );\n}\n\nfunction ItemList({ items }) {\n  return (\n    <ul>\n      {items.map((it) => (\n        <li key={it}>{it}</li>\n      ))}\n    </ul>\n  );\n}\n\nfunction FilterApp() {\n  const all = [\"apple\", \"banana\", \"apricot\"];\n  const [query, setQuery] = useState(\"\");\n  const filtered = all.filter((x) => x.includes(query.toLowerCase()));\n  return (\n    <div>\n      <FilterBar query={query} onQueryChange={setQuery} />\n      <ItemList items={filtered} />\n      <p>{filtered.length} items</p>\n    </div>\n  );\n}"
          },
          {
            "title": "Q14: Inverse data flow — child notifies parent",
            "explain": "Kya karna hai:\nonSubmit callback — child event, parent state update.\n\nSeedha matlab:\nData down (props), events up (callbacks). React one-way flow.\nLifting = events up + state down combo.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function SubmitBtn({ onSubmit }) {\n  return <button onClick={() => onSubmit(\"done\")}>Submit</button>;\n}\n\nfunction ParentSubmit() {\n  const [msg, setMsg] = useState(\"\");\n  return (\n    <div>\n      <SubmitBtn onSubmit={setMsg} />\n      <p>{msg}</p>\n    </div>\n  );\n}"
          },
          {
            "title": "Q15: [MID] Don't lift derived values",
            "explain": "Kya karna hai:\nitems + filter → filteredItems compute in parent render, alag state mat.\n\nSeedha matlab:\nSirf source state lift karo. Derived parent ya child me compute.\nDuplicate filtered state = sync bug factory.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function DerivedFilterDemo() {\n  const [items] = useState([\"a\", \"b\", \"c\"]);\n  const [q, setQ] = useState(\"\");\n  const shown = items.filter((x) => x.includes(q)); // derived, not lifted state\n  return (\n    <div>\n      <input value={q} onChange={(e) => setQ(e.target.value)} />\n      <ItemList items={shown} />\n    </div>\n  );\n}"
          },
          {
            "title": "Q16: Shared toggle — theme siblings",
            "explain": "Kya karna hai:\nisDark parent; Header + Content dono props se.\n\nSeedha matlab:\nUI mode share karna = lift. Context tab jab tree bahut deep.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Header({ dark }) {\n  return <header style={{ background: dark ? \"#222\" : \"#fff\" }}>Header</header>;\n}\n\nfunction Content({ dark }) {\n  return <main style={{ color: dark ? \"#fff\" : \"#000\" }}>Body</main>;\n}\n\nfunction ThemeLift() {\n  const [dark, setDark] = useState(false);\n  return (\n    <div>\n      <button onClick={() => setDark((d) => !d)}>Toggle</button>\n      <Header dark={dark} />\n      <Content dark={dark} />\n    </div>\n  );\n}"
          },
          {
            "title": "Q17: Key reset vs lifting state",
            "explain": "Kya karna hai:\nForm reset — parent key={formKey} bump vs lift reset handler.\n\nSeedha matlab:\nKabhi child local state OK; reset ke liye key change se remount.\nLift jab multiple children sync reset chahiye.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function ResettableForm({ keySeed }) {\n  const [text, setText] = useState(\"\");\n  return (\n    <input key={keySeed} value={text} onChange={(e) => setText(e.target.value)} />\n  );\n}"
          },
          {
            "title": "Q18: [MID] Container / Presentational split",
            "explain": "Kya karna hai:\nSmart parent state + dumb display children — lift enables this.\n\nSeedha matlab:\nContainer: data + handlers. Presentational: props se render only.\nTest presentational easy — mock props.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function UserCard({ name, onEdit }) {\n  return (\n    <div>\n      {name} <button onClick={onEdit}>Edit</button>\n    </div>\n  );\n}\n\nfunction UserContainer() {\n  const [name, setName] = useState(\"Jay\");\n  return <UserCard name={name} onEdit={() => setName(\"Edited\")} />;\n}"
          },
          {
            "title": "Q19: Lifting too high — global local state problem",
            "explain": "Kya karna hai:\nModal open state App me jab sirf ek branch use kare — over-lift.\n\nSeedha matlab:\nApp re-render har modal toggle pe — waste. Colocate modal state section me.\nBalance: share need vs blast radius.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function SectionWithModal() {\n  const [open, setOpen] = useState(false); // yahan OK, App me mat\n  return (\n    <div>\n      <button onClick={() => setOpen(true)}>Open</button>\n      <Modal open={open} onClose={() => setOpen(false)}>\n        Hi\n      </Modal>\n    </div>\n  );\n}\n\nfunction Modal({ open, onClose, children }) {\n  if (!open) return null;\n  return (\n    <div>\n      {children}\n      <button onClick={onClose}>×</button>\n    </div>\n  );\n}"
          },
          {
            "title": "Q20: Syncing checkbox group — all selected parent state",
            "explain": "Kya karna hai:\nselectedIds Set/array parent; each checkbox controlled.\n\nSeedha matlab:\nMulti-select share = lift. Toggle one id → parent update → all sync.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Checkbox({ id, checked, onToggle }) {\n  return (\n    <label>\n      <input type=\"checkbox\" checked={checked} onChange={() => onToggle(id)} />\n      {id}\n    </label>\n  );\n}\n\nfunction CheckboxGroup() {\n  const [selected, setSelected] = useState([]);\n  const toggle = (id) =>\n    setSelected((s) =>\n      s.includes(id) ? s.filter((x) => x !== id) : [...s, id]\n    );\n  const ids = [\"a\", \"b\", \"c\"];\n  return (\n    <div>\n      {ids.map((id) => (\n        <Checkbox\n          key={id}\n          id={id}\n          checked={selected.includes(id)}\n          onToggle={toggle}\n        />\n      ))}\n      <p>{selected.join(\", \")}</p>\n    </div>\n  );\n}"
          },
          {
            "title": "Q21: [MID] URL as lifted state (concept)",
            "explain": "Kya karna hai:\nselectedTab parent me + sync URL searchParams — share + bookmarkable.\n\nSeedha matlab:\nLifted state sirf component tree nahi — URL bhi \"shared parent\".\nReact Router: useSearchParams lift alternative.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function TabUrlNote() {\n  return <p>Tab state URL me = lift + persistence free.</p>;\n}"
          },
          {
            "title": "Q22: Anti-pattern — mirroring props to state",
            "explain": "Kya karna hai:\nconst [v, setV] = useState(props.value) — props change pe out of sync.\n\nSeedha matlab:\nControlled ho to props hi use karo. Local copy mat unless key reset.\nuseEffect sync props→state = usually smell.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function MirroringBad({ value }) {\n  // ❌ const [v, setV] = useState(value); — props update ignore\n  return <input value={value} readOnly />; // ✅ controlled from parent\n}"
          }
        ]
      },
      {
        "file": "15_ChildrenComposition.jsx",
        "title": "15 — Children Composition",
        "kya": "children = dabbe ke andar jo bhi daal do. Card, Modal, Layout —",
        "detail": "15 — Children Composition\nLevel: MID  |  Sequence: pehle yeh, phir agla number\n\nLAYMAN: children = dabbe ke andar jo bhi daal do. Card, Modal, Layout —\nshell fixed, content flexible. Composition > inheritance (React way).\n\n<Modal><Form /></Modal> → Modal({ children }). slots: header/footer props\nya multiple props as elements. cloneElement rare — prefer explicit props.\n\nKYUN: Flexible UI libraries. Avoid prop explosion \"title, body, footer...\".\nINTERVIEW: composition vs config props; containership.\nVite/React 19 project me use — teaching file.",
        "intro": "15 — Children Composition\nLevel: MID  |  Sequence: pehle yeh, phir agla number\n\nLAYMAN: children = dabbe ke andar jo bhi daal do. Card, Modal, Layout —\nshell fixed, content flexible. Composition > inheritance (React way).\n\n<Modal><Form /></Modal> → Modal({ children }). slots: header/footer props\nya multiple props as elements. cloneElement rare — prefer explicit props.\n\nKYUN: Flexible UI libraries. Avoid prop explosion \"title, body, footer...\".\nINTERVIEW: composition vs config props; containership.\nVite/React 19 project me use — teaching file.",
        "questions": [
          {
            "title": "Q1: Basic children wrapper",
            "explain": "Kya karna hai:\nFancyBox children render.\n\nSeedha matlab:\nReusable chrome around unknown content.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function FancyBox({ children }) {\n  return <div className=\"fancy\">{children}</div>;\n}"
          },
          {
            "title": "Q2: Layout slots via props",
            "explain": "Kya karna hai:\nsidebar + children main.\n\nSeedha matlab:\nNamed \"slots\" as props — clear structure.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Shell({ sidebar, children }) {\n  return (\n    <div className=\"shell\">\n      <aside>{sidebar}</aside>\n      <main>{children}</main>\n    </div>\n  );\n}\n\nfunction AppShell() {\n  return (\n    <Shell sidebar={<nav>Links</nav>}>\n      <h1>Page</h1>\n    </Shell>\n  );\n}"
          },
          {
            "title": "Q3: Modal with children",
            "explain": "Kya karna hai:\nopen + onClose + children body.\n\nSeedha matlab:\nModal na jaane andar Form hai ya Text — children.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Modal({ open, onClose, children }) {\n  if (!open) return null;\n  return (\n    <div className=\"overlay\">\n      <div className=\"modal\">\n        {children}\n        <button onClick={onClose}>Close</button>\n      </div>\n    </div>\n  );\n}"
          },
          {
            "title": "Q4: Button asChild-ish pattern (simple)",
            "explain": "Kya karna hai:\nSometimes wrap link styled as button — children / component prop.\n\nSeedha matlab:\nComposition lets consumer choose <a> vs <button>.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Button({ children, onClick }) {\n  return (\n    <button className=\"btn\" onClick={onClick}>\n      {children}\n    </button>\n  );\n}"
          },
          {
            "title": "Q5: [MID] Children as function (render prop)",
            "explain": "Kya karna hai:\n<Data>{(data) => <pre>...</pre>}</Data>\n\nSeedha matlab:\nParent data de, child decide UI. Hooks se pehle popular; ab custom hooks.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Mouse({ children }) {\n  const [pos, setPos] = useState({ x: 0, y: 0 });\n  return (\n    <div\n      onMouseMove={(e) => setPos({ x: e.clientX, y: e.clientY })}\n    >\n      {children(pos)}\n    </div>\n  );\n}\n// use: <Mouse>{(p) => <p>{p.x},{p.y}</p>}</Mouse>"
          },
          {
            "title": "Q6: Compound components sketch",
            "explain": "Kya karna hai:\nTabs + Tabs.Panel API feel — related pieces.\n\nSeedha matlab:\nImplicit state share (context). Nice DX for libraries.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Tabs({ children }) {\n  const [active, setActive] = useState(0);\n  return (\n    <div>\n      {/* real impl maps children / context — concept yahan */}\n      <p>Active tab: {active}</p>\n      <button onClick={() => setActive(0)}>0</button>\n      <button onClick={() => setActive(1)}>1</button>\n      {children}\n    </div>\n  );\n}"
          },
          {
            "title": "Q7: Avoid cloneElement when possible",
            "explain": "Kya karna hai:\nExtra props children pe inject karna — prefer context ya render prop.\n\nSeedha matlab:\ncloneElement magic = brittle. Explicit better.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "// React.cloneElement(child, { extra }) // last resort"
          },
          {
            "title": "Q8: [MID] Conditional children / empty",
            "explain": "Kya karna hai:\nList empty → EmptyState as children pattern.\n\nSeedha matlab:\nParent structure, consumer empty UI pass kare.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function ListBox({ items, empty, children }) {\n  if (!items.length) return empty ?? <p>Nothing</p>;\n  return <ul>{items.map((it) => children(it))}</ul>;\n}"
          },
          {
            "title": "Q9: React.Children utilities (light)",
            "explain": "Kya karna hai:\nReact.Children.count(children), map, toArray — slot validation.\n\nSeedha matlab:\nCompound components me kaunse children allowed check kar sakte ho.\nOveruse mat — explicit props often clearer.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function CountChildren({ children }) {\n  const n = Array.isArray(children) ? children.length : children ? 1 : 0;\n  return (\n    <div>\n      <p>{n} child(ren)</p>\n      {children}\n    </div>\n  );\n}"
          },
          {
            "title": "Q10: cloneElement caution — implicit prop injection",
            "explain": "Kya karna hai:\nReact.cloneElement(child, { isActive }) — magic props inject.\n\nSeedha matlab:\nFragile: child type assume, overrides clash. Context/render prop prefer.\nRadix asChild internally cloneElement use karta — library level OK.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "// function InjectActive({ children, active }) {\n//   return React.cloneElement(children, { \"data-active\": active });\n// }"
          },
          {
            "title": "Q11: [MID] Multiple slot props pattern",
            "explain": "Kya karna hai:\nheader, footer, actions alag props — JSX me pass.\n\nSeedha matlab:\nConfig props explosion avoid. Named slots readable.\n<Card header={<h2/>} footer={<Btn/>}>body</Card>",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Card({ header, footer, children }) {\n  return (\n    <article>\n      <header>{header}</header>\n      <div>{children}</div>\n      <footer>{footer}</footer>\n    </article>\n  );\n}\n\nfunction CardDemo() {\n  return (\n    <Card header={<h2>Title</h2>} footer={<button>OK</button>}>\n      Content here\n    </Card>\n  );\n}"
          },
          {
            "title": "Q12: Compound Tabs — context share sketch",
            "explain": "Kya karna hai:\nTabs.List + Tabs.Panel — shared activeIndex via context.\n\nSeedha matlab:\nLibrary API feel: related components ek family.\nParent Tabs state hold; children consume context (see 11).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function TabList({ labels, active, onSelect }) {\n  return (\n    <div role=\"tablist\">\n      {labels.map((l, i) => (\n        <button key={l} onClick={() => onSelect(i)} aria-selected={active === i}>\n          {l}\n        </button>\n      ))}\n    </div>\n  );\n}\n\nfunction TabPanels({ panels, active }) {\n  return <div>{panels[active]}</div>;\n}\n\nfunction TabsCompound() {\n  const [active, setActive] = useState(0);\n  const labels = [\"One\", \"Two\"];\n  const panels = [<p key=\"1\">Panel 1</p>, <p key=\"2\">Panel 2</p>];\n  return (\n    <div>\n      <TabList labels={labels} active={active} onSelect={setActive} />\n      <TabPanels panels={panels} active={active} />\n    </div>\n  );\n}"
          },
          {
            "title": "Q13: Render props vs hooks",
            "explain": "Kya karna hai:\n<Mouse>{(pos) => ...}</Mouse> vs const pos = useMouse() — hooks win usually.\n\nSeedha matlab:\nRender prop = flexibility + composition. Hooks = same reuse, cleaner tree.\nLegacy libs me render props common; custom hook modern prefer.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function DataLoader({ url, children }) {\n  const [data, setData] = useState(null);\n  useEffect(() => {\n    fetch(url)\n      .then((r) => r.json())\n      .then(setData)\n      .catch(() => setData(null));\n  }, [url]);\n  return children({ data, loading: !data });\n}"
          },
          {
            "title": "Q14: [MID] asChild pattern (light)",
            "explain": "Kya karna hai:\n<Button asChild><a href=\"/\">Link</a></Button> — styles merge, child render.\n\nSeedha matlab:\nButton apna <button> nahi — child clone karke props merge (Radix style).\nSimple version: children pass through with className merge.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function StyledWrapper({ className, children }) {\n  // light asChild-ish: consumer picks element, wrapper adds class\n  return <div className={`styled ${className ?? \"\"}`}>{children}</div>;\n}"
          },
          {
            "title": "Q15: Composition over config props",
            "explain": "Kya karna hai:\n<Modal title=\"\" body=\"\" footer=\"\" /> ❌ vs children composition ✅\n\nSeedha matlab:\nHar section alag component pass — flexible order, custom layout.\nConfig props rigid ho jaate hain complex UI me.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function ConfigVsComposeNote() {\n  return <p>Composition = consumer control. Config = library decides structure.</p>;\n}"
          },
          {
            "title": "Q16: Fragment as children wrapper",
            "explain": "Kya karna hai:\n<>\n  <Header /><Body />\n</> — multiple children without extra DOM.\n\nSeedha matlab:\nchildren array hota hai multiple ho to. Fragment group karta hai.\nModal children me kai elements OK.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function MultiChildModal({ children }) {\n  return <div className=\"modal-body\">{children}</div>;\n}"
          },
          {
            "title": "Q17: [MID] Inversion — parent doesn't know child type",
            "explain": "Kya karna hai:\nLayout children kuch bhi ho sakta — Form, Chart, Text.\n\nSeedha matlab:\nOpen/closed principle. Shell stable, content pluggable.\nReact design philosophy core.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function PageLayout({ children }) {\n  return (\n    <div className=\"page\">\n      <nav>Nav</nav>\n      {children}\n    </div>\n  );\n}"
          },
          {
            "title": "Q18: Explicit component prop vs children",
            "explain": "Kya karna hai:\nicon={<Icon />} prop vs children — semantic clarity.\n\nSeedha matlab:\nSingle main content → children. Secondary pieces → named props (icon, suffix).\nAPI design: consumer ko confuse mat karo.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function InputField({ label, icon, suffix, ...inputProps }) {\n  return (\n    <label>\n      {label}\n      <span>\n        {icon}\n        <input {...inputProps} />\n        {suffix}\n      </span>\n    </label>\n  );\n}"
          },
          {
            "title": "Q19: Children.map for list render prop",
            "explain": "Kya karna hai:\nitems.map(it => children(it)) — ListBox pattern (Q8).\n\nSeedha matlab:\nParent iteration, consumer template deta hai per item.\nRender prop + list combo common.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Table({ rows, children }) {\n  return (\n    <table>\n      <tbody>\n        {rows.map((row) => (\n          <tr key={row.id}>{children(row)}</tr>\n        ))}\n      </tbody>\n    </table>\n  );\n}"
          },
          {
            "title": "Q20: [MID] Avoid nesting hell — extract subcomponents",
            "explain": "Kya karna hai:\nDeep JSX tree → Shell.Sidebar, Shell.Main subcomponents.\n\nSeedha matlab:\nComposition readable rakho. Compound namespacing (Tabs.Panel) DX boost.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function ShellSidebar({ children }) {\n  return <aside>{children}</aside>;\n}\nfunction ShellMain({ children }) {\n  return <main>{children}</main>;\n}\nShell.Sidebar = ShellSidebar;\nShell.Main = ShellMain;"
          },
          {
            "title": "Q21: Portal + children composition",
            "explain": "Kya karna hai:\nModal children ko document.body pe portal — composition same API.\n\nSeedha matlab:\nConsumer <Modal><Form/></Modal> — andar portal handle. API clean.\nImplementation detail hide — composition preserve.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function PortalModal({ open, children }) {\n  if (!open) return null;\n  // createPortal(children, document.body) in real impl\n  return <div className=\"portal-modal\">{children}</div>;\n}"
          },
          {
            "title": "Q22: Polymorphic component light sketch",
            "explain": "Kya karna hai:\nas=\"a\" | as=\"button\" — element type consumer choose (advanced composition).\n\nSeedha matlab:\nDesign systems me common. asChild se related — type flexibility.\nSimple start: children pass karo, wrap mat karo.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function PolymorphicNote() {\n  return <p>as prop / asChild = same HTML tag flexibility, different API.</p>;\n}"
          }
        ]
      },
      {
        "file": "16_UseMemoUseCallback.jsx",
        "title": "16 — useMemo / useCallback",
        "kya": "useMemo = mehengi cooking pehle se tiffin me — deps same to dubara",
        "detail": "16 — useMemo And useCallback\nLevel: MID  |  Sequence: pehle yeh, phir agla number\n\nLAYMAN: useMemo = mehengi cooking pehle se tiffin me — deps same to dubara\nmat paka. useCallback = function ka same reference rakh (deps same).\n\nDono OPTIMIZATION tools — pehle sahi code, phir measure, phir memoize.\nOveruse = complexity + kabhi kabhi slower (deps compare cost).\n\nKYUN: Heavy calc; stable fn for memo children / effect deps.\nINTERVIEW: referential equality; when NOT to memoize; deps mistakes.\nVite/React 19 project me use — teaching file.",
        "intro": "16 — useMemo And useCallback\nLevel: MID  |  Sequence: pehle yeh, phir agla number\n\nLAYMAN: useMemo = mehengi cooking pehle se tiffin me — deps same to dubara\nmat paka. useCallback = function ka same reference rakh (deps same).\n\nDono OPTIMIZATION tools — pehle sahi code, phir measure, phir memoize.\nOveruse = complexity + kabhi kabhi slower (deps compare cost).\n\nKYUN: Heavy calc; stable fn for memo children / effect deps.\nINTERVIEW: referential equality; when NOT to memoize; deps mistakes.\nVite/React 19 project me use — teaching file.",
        "questions": [
          {
            "title": "Q1: useMemo heavy filter",
            "explain": "Kya karna hai:\nbigList filter jab query change.\n\nSeedha matlab:\nHar parent keystroke pe O(n) save — jab list genuinely badi.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function FilteredList({ items, query }) {\n  const filtered = useMemo(() => {\n    return items.filter((it) =>\n      it.name.toLowerCase().includes(query.toLowerCase())\n    );\n  }, [items, query]);\n  return (\n    <ul>\n      {filtered.map((it) => (\n        <li key={it.id}>{it.name}</li>\n      ))}\n    </ul>\n  );\n}"
          },
          {
            "title": "Q2: useCallback stable handler",
            "explain": "Kya karna hai:\nonSelect = useCallback(..., [deps]) memo child ke liye.\n\nSeedha matlab:\nInline () => onSelect(id) har render naya. Callback + memo = skip render.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function ParentList({ items }) {\n  const [selected, setSelected] = useState(null);\n  const onSelect = useCallback((id) => setSelected(id), []);\n  return (\n    <ul>\n      {items.map((it) => (\n        <Row key={it.id} item={it} onSelect={onSelect} />\n      ))}\n      <p>Selected: {selected}</p>\n    </ul>\n  );\n}\n\nfunction Row({ item, onSelect }) {\n  return <li onClick={() => onSelect(item.id)}>{item.name}</li>;\n}"
          },
          {
            "title": "Q3: Don't memo trivial math",
            "explain": "Kya karna hai:\ntotal = a+b — useMemo waste.\n\nSeedha matlab:\nCheap calc pehle se sasta. Premature optimization avoid.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Sum({ a, b }) {\n  const total = a + b; // ✅ no useMemo needed\n  return <p>{total}</p>;\n}"
          },
          {
            "title": "Q4: Object/array dependency trap",
            "explain": "Kya karna hai:\nuseMemo(() => ({...}), [user.id]) — poora user object mat deps me befikr.\n\nSeedha matlab:\nNaya object literal parent se → memo toot. Stabilize parent ya pick fields.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Card({ userId }) {\n  const options = useMemo(() => ({ id: userId, mode: \"view\" }), [userId]);\n  return <pre>{JSON.stringify(options)}</pre>;\n}"
          },
          {
            "title": "Q5: [MID] useMemo for context value (see 11)",
            "explain": "Kya karna hai:\nProvider value object memoize.\n\nSeedha matlab:\nContext consumers tabhi re-render jab value identity change.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "// const value = useMemo(() => ({ n, setN }), [n]);"
          },
          {
            "title": "Q6: [MID] useCallback deps must be right",
            "explain": "Kya karna hai:\nCallback me use hone wali values deps me.\n\nSeedha matlab:\nMissing dep = stale bug. Extra = identity churn. Same rules as useEffect.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Search({ query, onResults }) {\n  const run = useCallback(() => {\n    onResults(query);\n  }, [query, onResults]);\n  return <button onClick={run}>Search</button>;\n}"
          },
          {
            "title": "Q7: Derived data vs state",
            "explain": "Kya karna hai:\nsorted = useMemo(() => [...items].sort(), [items])\n\nSeedha matlab:\nSorted alag state mat — derive + optional memo.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Sorted({ items }) {\n  const sorted = useMemo(\n    () => [...items].sort((a, b) => a.localeCompare(b)),\n    [items]\n  );\n  return <ul>{sorted.map((s) => <li key={s}>{s}</li>)}</ul>;\n}"
          },
          {
            "title": "Q8: [MID] React Compiler note",
            "explain": "Kya karna hai:\nNaye setups me compiler auto memo — phir bhi concept samjho interview ke liye.\n\nSeedha matlab:\nManual useMemo/useCallback ab bhi legacy + intentional optimize me.\nYeh file teaching — pehle mental model.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Concept() {\n  return <p>Measure first, memo second.</p>;\n}"
          },
          {
            "title": "Q9: When useMemo helps — expensive calc",
            "explain": "Kya karna hai:\n10k items sort/filter — deps [items, sortKey] pe memo.\n\nSeedha matlab:\nMeasurable slow render → memo try. DevTools Profiler se verify.\nMicro lists pe memo overhead > savings.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function HeavySort({ items, keyName }) {\n  const sorted = useMemo(() => {\n    return [...items].sort((a, b) => a[keyName].localeCompare(b[keyName]));\n  }, [items, keyName]);\n  return <ul>{sorted.map((it) => <li key={it.id}>{it[keyName]}</li>)}</ul>;\n}"
          },
          {
            "title": "Q10: When useMemo hurts — cheap + always new deps",
            "explain": "Kya karna hai:\nuseMemo(() => x + 1, [x]) jab x har render change — waste.\n\nSeedha matlab:\nMemo cost: memory + deps compare. Kabhi slower bana deta hai.\nPremature optimization = complexity bina gain.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function CheapPlus({ x }) {\n  return <p>{x + 1}</p>; // useMemo mat — sasta hai\n}"
          },
          {
            "title": "Q11: [MID] Referential equality explained",
            "explain": "Kya karna hai:\n{} === {} false — har render naya object, memo child fail.\n\nSeedha matlab:\nJS reference compare. useMemo/useCallback same reference preserve karte hain.\nReact.memo bhi shallow reference check karta hai props pe.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function RefEqualityDemo() {\n  const a = { n: 1 };\n  const b = { n: 1 };\n  const same = a === b; // false — interview classic\n  return <p>{String(same)}</p>;\n}"
          },
          {
            "title": "Q12: useCallback empty deps pitfall",
            "explain": "Kya karna hai:\nuseCallback(() => doThing(id), []) — id stale reh jayega.\n\nSeedha matlab:\nMissing dep = bug. ESLint exhaustive-deps suno.\nFunctional update ya ref pattern jab intentional stable chahiye.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function StaleCallback({ id }) {\n  const log = useCallback(() => console.log(id), [id]); // id deps me\n  return <button onClick={log}>Log {id}</button>;\n}"
          },
          {
            "title": "Q13: useMemo for stable object to memo child",
            "explain": "Kya karna hai:\nconst config = useMemo(() => ({ theme, size }), [theme, size])\n\nSeedha matlab:\nMemo child ko object prop pass — memoize object warna useless.\nPair pattern: memo + useMemo/useCallback.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function ConfigChild({ config }) {\n  return <span>{config.theme}</span>;\n}\n\nfunction ConfigParent() {\n  const [theme, setTheme] = useState(\"light\");\n  const config = useMemo(() => ({ theme, size: \"md\" }), [theme]);\n  return (\n    <div>\n      <button onClick={() => setTheme(\"dark\")}>toggle</button>\n      <ConfigChild config={config} />\n    </div>\n  );\n}"
          },
          {
            "title": "Q14: [MID] React 19 Compiler — auto memoization",
            "explain": "Kya karna hai:\nCompiler analyze karke khud memo insert — manual kam ho sakta hai.\n\nSeedha matlab:\nConcept ab bhi interview me: referential equality, deps samjho.\nLegacy code + edge cases me manual useMemo/useCallback rahega.\n\"Measure first\" rule compiler ke baad bhi valid.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function CompilerNote() {\n  return (\n    <p>\n      React Compiler = auto optimize. Manual memo = intentional hot paths.\n    </p>\n  );\n}"
          },
          {
            "title": "Q15: useMemo !== only on render",
            "explain": "Kya karna hai:\nExpensive init bhi: useMemo(() => buildGraph(data), [data])\n\nSeedha matlab:\nLazy init useState(() => ...) bhi option first mount ke liye.\nuseMemo jab data change pe rebuild chahiye.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function GraphView({ data }) {\n  const graph = useMemo(() => data.map((d) => ({ ...d, score: d.v * 2 })), [data]);\n  return <pre>{JSON.stringify(graph)}</pre>;\n}"
          },
          {
            "title": "Q16: Inline function in JSX — when OK",
            "explain": "Kya karna hai:\nonClick={() => setX(1)} — cheap child, no memo → fine.\n\nSeedha matlab:\nHar jagah useCallback mat lagao. Memo child + list row tab matter.\nReadability > micro-opt usually.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function InlineOk() {\n  const [n, setN] = useState(0);\n  return <button onClick={() => setN(1)}>{n}</button>;\n}"
          },
          {
            "title": "Q17: [MID] useCallback for effect dependency stability",
            "explain": "Kya karna hai:\nconst load = useCallback(...); useEffect(() => { load() }, [load]);\n\nSeedha matlab:\nEffect ko stable fn chahiye warna infinite loop / extra runs.\nAlternative: logic effect ke andar inline.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function EffectStable({ userId }) {\n  const load = useCallback(async () => {\n    /* fetch user userId */\n  }, [userId]);\n  useEffect(() => {\n    load();\n  }, [load]);\n  return null;\n}"
          },
          {
            "title": "Q18: Memoizing children JSX — usually wrong",
            "explain": "Kya karna hai:\nuseMemo(() => <Expensive />, []) — rare, often smell.\n\nSeedha matlab:\nComponent memo wrap better than memo JSX element.\nchildren element har render naya — parent memo strategy socho.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function MemoJsxNote() {\n  return <p>useMemo JSX ke liye last resort — React.memo component pe.</p>;\n}"
          },
          {
            "title": "Q19: Deps array reference — items prop",
            "explain": "Kya karna hai:\nParent har render items={[...]} naya array → useMemo rerun.\n\nSeedha matlab:\nStabilize data source parent me. Redux/state same ref jab data same.\nMemo downstream tabhi kaam jab upstream stable.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function StableItemsParent() {\n  const [items] = useState([{ id: 1, name: \"a\" }]); // stable ref\n  return <FilteredList items={items} query=\"\" />;\n}"
          },
          {
            "title": "Q20: [MID] Premature optimization checklist",
            "explain": "Kya karna hai:\n1) Profile 2) Bottleneck confirm 3) Memo targeted 4) Re-profile.\n\nSeedha matlab:\nBina measure memo = guesswork. Interview: \"default no memo until proven slow.\"\nReadable code pehle, optimize baad me.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function OptChecklist() {\n  return <ol><li>Profile</li><li>Prove slow</li><li>Memo surgical</li></ol>;\n}"
          },
          {
            "title": "Q21: useMemo + useCallback together in list",
            "explain": "Kya karna hai:\nParent: filtered useMemo, onToggle useCallback, Row memo.\n\nSeedha matlab:\nFull stack optimization pattern — sirf big lists me worth.\nEk piece missing → poora chain fail.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function OptimizedList({ todos }) {\n  const [filter, setFilter] = useState(\"\");\n  const shown = useMemo(\n    () => todos.filter((t) => t.text.includes(filter)),\n    [todos, filter]\n  );\n  const onToggle = useCallback((id) => {\n    /* dispatch toggle */\n  }, []);\n  return (\n    <ul>\n      {shown.map((t) => (\n        <MemoRow key={t.id} todo={t} onToggle={onToggle} />\n      ))}\n    </ul>\n  );\n}\n\nconst MemoRow = memo(function MemoRow({ todo, onToggle }) {\n  return (\n    <li>\n      <button onClick={() => onToggle(todo.id)}>{todo.text}</button>\n    </li>\n  );\n});"
          },
          {
            "title": "Q22: Breaking memo with inline object spread",
            "explain": "Kya karna hai:\n<Child {...objectLit} /> har render naya spread object.\n\nSeedha matlab:\nPick primitives ya memoize props object.\nspread + inline = referential death.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function SpreadTrap() {\n  const [n, setN] = useState(0);\n  const props = useMemo(() => ({ label: \"hi\", n }), [n]);\n  return (\n    <div>\n      <button onClick={() => setN(n + 1)}>{n}</button>\n      <ExpensiveChild {...props} />\n    </div>\n  );\n}\n\nconst ExpensiveChild = memo(function ExpensiveChild({ label }) {\n  return <span>{label}</span>;\n});"
          }
        ]
      },
      {
        "file": "17_ReactMemo.jsx",
        "title": "17 — React.memo",
        "kya": "React.memo = child se kehna \"agar meri props same dikhein to",
        "detail": "17 — React.memo\nLevel: MID  |  Sequence: pehle yeh, phir agla number\n\nLAYMAN: React.memo = child se kehna \"agar meri props same dikhein to\ndubara mat paint\". Parent re-render pe default children bhi re-render.\nmemo shallow compare props — skip jab equal.\n\nKaam tab: expensive child + parent aksar re-render + props stable.\nProps me naya object/fn har baar → memo fail (useCallback/useMemo saath).\n\nKYUN: List rows, pure presentational widgets optimize.\nINTERVIEW: shallow compare; memo + callback duo; when useless.\nVite/React 19 project me use — teaching file.",
        "intro": "17 — React.memo\nLevel: MID  |  Sequence: pehle yeh, phir agla number\n\nLAYMAN: React.memo = child se kehna \"agar meri props same dikhein to\ndubara mat paint\". Parent re-render pe default children bhi re-render.\nmemo shallow compare props — skip jab equal.\n\nKaam tab: expensive child + parent aksar re-render + props stable.\nProps me naya object/fn har baar → memo fail (useCallback/useMemo saath).\n\nKYUN: List rows, pure presentational widgets optimize.\nINTERVIEW: shallow compare; memo + callback duo; when useless.\nVite/React 19 project me use — teaching file.",
        "questions": [
          {
            "title": "Q1: Wrap pure component",
            "explain": "Kya karna hai:\nexport default memo(function Expensive({ label }) ...)\n\nSeedha matlab:\nSame label → skip render. Parent counter badle to bhi.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const Expensive = memo(function Expensive({ label }) {\n  console.log(\"Expensive render\", label);\n  return <div>{label}</div>;\n});\n\nfunction Parent() {\n  const [n, setN] = useState(0);\n  return (\n    <div>\n      <button onClick={() => setN(n + 1)}>{n}</button>\n      <Expensive label=\"static\" />\n    </div>\n  );\n}"
          },
          {
            "title": "Q2: Memo breaks on inline object",
            "explain": "Kya karna hai:\nstyle={{}} har render naya → child re-render.\n\nSeedha matlab:\nReferential inequality. Hoist style or memoize.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const Box = memo(function Box({ style }) {\n  console.log(\"Box\");\n  return <div style={style}>Box</div>;\n});\n\nfunction BreakMemo() {\n  const [n, setN] = useState(0);\n  return (\n    <div>\n      <button onClick={() => setN(n + 1)}>{n}</button>\n      {/* BAD: <Box style={{ color: \"red\" }} /> */}\n      <Box style={staticStyle} />\n    </div>\n  );\n}\nconst staticStyle = { color: \"red\" };"
          },
          {
            "title": "Q3: memo + useCallback",
            "explain": "Kya karna hai:\nonClick stable pass to memo child.\n\nSeedha matlab:\nDuo classic interview answer.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const Item = memo(function Item({ onClick, text }) {\n  return <button onClick={onClick}>{text}</button>;\n});\n\nfunction List() {\n  const [n, setN] = useState(0);\n  const save = useCallback(() => console.log(\"save\"), []);\n  return (\n    <div>\n      <button onClick={() => setN(n + 1)}>{n}</button>\n      <Item text=\"Save\" onClick={save} />\n    </div>\n  );\n}"
          },
          {
            "title": "Q4: Custom compare (rare)",
            "explain": "Kya karna hai:\nmemo(Comp, (prev, next) => prev.id === next.id)\n\nSeedha matlab:\ntrue return = props equal = SKIP. Easy galat — default shallow usually enough.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const Row = memo(\n  function Row({ user }) {\n    return <div>{user.name}</div>;\n  },\n  (prev, next) => prev.user.id === next.user.id\n);"
          },
          {
            "title": "Q5: [MID] Children prop often breaks memo",
            "explain": "Kya karna hai:\n<Memo><span/></Memo> — children naya element har baar.\n\nSeedha matlab:\nElement objects naye. Composition + memo careful.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const Frame = memo(function Frame({ children }) {\n  console.log(\"Frame\");\n  return <div>{children}</div>;\n});"
          },
          {
            "title": "Q6: When NOT to memo",
            "explain": "Kya karna hai:\nCheap component / props hamesha change — mat wrap.\n\nSeedha matlab:\nCompare cost + mental load. Profile pehle.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Cheap({ t }) {\n  return <span>{t}</span>; // memo optional / skip\n}"
          },
          {
            "title": "Q7: [MID] memo is not useMemo",
            "explain": "Kya karna hai:\nReact.memo = component. useMemo = value. Alag tools.\n\nSeedha matlab:\nInterview confusion common — clear rakho.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "// memo(Component) vs useMemo(() => value, deps)"
          },
          {
            "title": "Q8: List of memo rows",
            "explain": "Kya karna hai:\nParent filter state; unchanged rows skip with memo + stable props.\n\nSeedha matlab:\nBig lists me meaningful. Virtualization alag topic.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const TodoRow = memo(function TodoRow({ todo, onToggle }) {\n  return (\n    <li>\n      <button onClick={() => onToggle(todo.id)}>{todo.text}</button>\n    </li>\n  );\n});"
          },
          {
            "title": "Q9: Shallow compare — what memo checks",
            "explain": "Kya karna hai:\nprevProps.a === nextProps.a — top level only, nested object fields nahi.\n\nSeedha matlab:\nuser object same ref but user.name change → memo skip (shallow pass).\nDeep compare mat — custom areEqual ya immutable data.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const ShallowDemo = memo(function ShallowDemo({ user }) {\n  return <span>{user.name}</span>;\n});"
          },
          {
            "title": "Q10: Custom areEqual — when useful",
            "explain": "Kya karna hai:\nmemo(Row, (prev, next) => prev.item.id === next.item.id)\n\nSeedha matlab:\ntrue return = SKIP render (props \"equal\"). Ulta lagta hai — dhyan se.\nSirf jab id same pe poora row same maan sakte ho.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const ItemRow = memo(\n  function ItemRow({ item }) {\n    return <div>{item.label}</div>;\n  },\n  (prev, next) => prev.item.id === next.item.id\n);"
          },
          {
            "title": "Q11: [MID] Children problem deep dive",
            "explain": "Kya karna hai:\n<MemoParent><div>{dynamic}</div></MemoParent> — children har render naya.\n\nSeedha matlab:\nJSX children = prop. Element create hota hai har render.\nFix: memo leaf, children hoist, ya composition restructure.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function ChildrenProblemParent() {\n  const [n, setN] = useState(0);\n  return (\n    <div>\n      <button onClick={() => setN(n + 1)}>{n}</button>\n      <Frame>\n        <span>child {n}</span>\n      </Frame>\n    </div>\n  );\n}"
          },
          {
            "title": "Q12: memo + useCallback full combo demo",
            "explain": "Kya karna hai:\nMemoListItem + stable onClick + stable item ref from normalized store.\n\nSeedha matlab:\nTeen piece: memo child, useCallback handler, stable data refs.\nInterview \"golden trio\" list optimization ke liye.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const MemoListItem = memo(function MemoListItem({ id, onPick }) {\n  return <button onClick={() => onPick(id)}>{id}</button>;\n});\n\nfunction MemoComboList() {\n  const [sel, setSel] = useState(null);\n  const onPick = useCallback((id) => setSel(id), []);\n  const ids = [1, 2, 3];\n  return (\n    <ul>\n      {ids.map((id) => (\n        <MemoListItem key={id} id={id} onPick={onPick} />\n      ))}\n      <p>{sel}</p>\n    </ul>\n  );\n}"
          },
          {
            "title": "Q13: When memo useless — props always change",
            "explain": "Kya karna hai:\n<Clock time={Date.now()} /> — har render naya time, memo zero benefit.\n\nSeedha matlab:\nAgar koi prop har baar change ho — skip memo entirely.\nCompare overhead bina gain.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Clock({ time }) {\n  return <time>{time}</time>; // memo mat — time har tick change\n}"
          },
          {
            "title": "Q14: [MID] memo on component using context",
            "explain": "Kya karna hai:\nmemo child context consume kare — context change pe render hoga anyway.\n\nSeedha matlab:\nmemo sirf props compare karta hai. Context update = re-render forced.\nContext split (11) + memo combo socho.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function ContextConsumerMemoNote() {\n  return <p>Context change beats memo — props equal bhi render hoga.</p>;\n}"
          },
          {
            "title": "Q15: Default export memo pattern",
            "explain": "Kya karna hai:\nexport default memo(MyComponent) — HOC wrap.\n\nSeedha matlab:\ndisplayName set karo debug ke liye: MemoComp.displayName = \"MyComponent\"\nNamed export bhi common teaching files me.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const NamedMemo = memo(function NamedMemo({ v }) {\n  return <em>{v}</em>;\n});\nNamedMemo.displayName = \"NamedMemo\";"
          },
          {
            "title": "Q16: Primitive props — memo works great",
            "explain": "Kya karna hai:\nlabel string, count number — shallow equal easy true.\n\nSeedha matlab:\nPresentational dumb components with primitives = memo sweet spot.\nParent state unrelated field change → child skip.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const Label = memo(function Label({ text }) {\n  return <label>{text}</label>;\n});\n\nfunction PrimitiveMemoParent() {\n  const [a, setA] = useState(0);\n  const [b] = useState(\"static\");\n  return (\n    <div>\n      <button onClick={() => setA(a + 1)}>{a}</button>\n      <Label text={b} />\n    </div>\n  );\n}"
          },
          {
            "title": "Q17: [MID] memo vs shouldComponentUpdate legacy",
            "explain": "Kya karna hai:\nClass: shouldComponentUpdate return false. Functional: memo equivalent.\n\nSeedha matlab:\nInterview bridge question class → hooks era.\nPureComponent bhi shallow compare — same idea.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function LegacyBridgeNote() {\n  return <p>PureComponent / memo = shallow props compare skip render.</p>;\n}"
          },
          {
            "title": "Q18: Passing unstable default prop",
            "explain": "Kya karna hai:\nitems = [] default param — har render naya array module level se bachao.\n\nSeedha matlab:\nconst EMPTY = []; function C({ items = EMPTY }) — stable default.\nInline [] default har call naya — subtle memo break parent me bhi.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const EMPTY_ARR = [];\nfunction ListWithDefault({ items = EMPTY_ARR }) {\n  return <ul>{items.map((x) => <li key={x}>{x}</li>)}</ul>;\n}"
          },
          {
            "title": "Q19: Double memo — usually pointless",
            "explain": "Kya karna hai:\nmemo(memo(Comp)) — redundant wrap.\n\nSeedha matlab:\nEk baar kaafi. Nested memo koi extra benefit nahi.\nHOC chain me alag baat — par double memo same component silly.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function DoubleMemoNote() {\n  return <p>memo(memo(X)) = waste. Ek layer enough.</p>;\n}"
          },
          {
            "title": "Q20: [MID] Profiler verify memo working",
            "explain": "Kya karna hai:\nReact DevTools Profiler — \"MemoChild (Memo)\" skipped renders dekho.\n\nSeedha matlab:\nAssume mat karo memo kaam kar raha — measure.\nGray = skipped in profiler (React 18+).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function ProfilerNote() {\n  return <p>Profiler se confirm karo memo actually skip kar raha hai.</p>;\n}"
          },
          {
            "title": "Q21: State inside memo component",
            "explain": "Kya karna hai:\nmemo child apna useState — parent re-render pe bhi child state safe.\n\nSeedha matlab:\nSkip render = child function dubara nahi chalti — local state preserved.\nProps same → internal state intact. Important interview point.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const StatefulMemo = memo(function StatefulMemo({ seed }) {\n  const [n, setN] = useState(seed);\n  return <button onClick={() => setN(n + 1)}>{n}</button>;\n});"
          },
          {
            "title": "Q22: Anti-pattern — memo everything",
            "explain": "Kya karna hai:\nHar chhoti component memo — bundle + compare cost, readability down.\n\nSeedha matlab:\nTarget hot paths: big lists, heavy charts, frequent parent updates.\nDefault: no memo. Add surgically with profiler proof.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function MemoEverythingNote() {\n  return <p>Sab pe memo = overkill. Expensive + stable props pe focus.</p>;\n}"
          }
        ]
      },
      {
        "file": "18_UseLayoutEffect.jsx",
        "title": "18 — useLayoutEffect",
        "kya": "useEffect = paint KE BAAD kaam (user flash dekh sakta).",
        "detail": "18 — useLayoutEffect\nLevel: MID  |  Sequence: pehle yeh, phir agla number\n\nLAYMAN: useEffect = paint KE BAAD kaam (user flash dekh sakta).\nuseLayoutEffect = DOM update ke baad, BROWSER PAINT SE PEHLE sync.\nJaise measure karke position set — flash avoid.\n\nDefault prefer useEffect. useLayoutEffect blocking — jyada use = jank.\nSSR: useLayoutEffect warning — client-only measure patterns.\n\nKYUN: Tooltip position, scroll lock measure, avoid flicker.\nINTERVIEW: effect vs layoutEffect timing; when necessary.\nVite/React 19 project me use — teaching file.",
        "intro": "18 — useLayoutEffect\nLevel: MID  |  Sequence: pehle yeh, phir agla number\n\nLAYMAN: useEffect = paint KE BAAD kaam (user flash dekh sakta).\nuseLayoutEffect = DOM update ke baad, BROWSER PAINT SE PEHLE sync.\nJaise measure karke position set — flash avoid.\n\nDefault prefer useEffect. useLayoutEffect blocking — jyada use = jank.\nSSR: useLayoutEffect warning — client-only measure patterns.\n\nKYUN: Tooltip position, scroll lock measure, avoid flicker.\nINTERVIEW: effect vs layoutEffect timing; when necessary.\nVite/React 19 project me use — teaching file.",
        "questions": [
          {
            "title": "Q1: Measure DOM before paint",
            "explain": "Kya karna hai:\nref height padh ke state — layoutEffect me.\n\nSeedha matlab:\nuseEffect me measure → pehle galat frame flash ho sakta.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Measure() {\n  const ref = useRef(null);\n  const [h, setH] = useState(0);\n  useLayoutEffect(() => {\n    setH(ref.current.getBoundingClientRect().height);\n  }, []);\n  return (\n    <div>\n      <div ref={ref}>Content</div>\n      <p>Height: {h}</p>\n    </div>\n  );\n}"
          },
          {
            "title": "Q2: Tooltip position",
            "explain": "Kya karna hai:\nAnchor rect → tooltip top/left set before paint.\n\nSeedha matlab:\nClassic layoutEffect use-case.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Tooltip({ anchorRef, text }) {\n  const tipRef = useRef(null);\n  const [pos, setPos] = useState({ top: 0, left: 0 });\n  useLayoutEffect(() => {\n    const r = anchorRef.current.getBoundingClientRect();\n    setPos({ top: r.bottom + 8, left: r.left });\n  }, [anchorRef, text]);\n  return (\n    <div\n      ref={tipRef}\n      style={{ position: \"fixed\", top: pos.top, left: pos.left }}\n    >\n      {text}\n    </div>\n  );\n}"
          },
          {
            "title": "Q3: Prefer useEffect for data fetch",
            "explain": "Kya karna hai:\nFetch layoutEffect me mat — UI block.\n\nSeedha matlab:\nNetwork = async = useEffect. Rule of thumb.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Users() {\n  const [users, setUsers] = useState([]);\n  useEffect(() => {\n    fetch(\"/api/users\")\n      .then((r) => r.json())\n      .then(setUsers);\n  }, []);\n  return <pre>{JSON.stringify(users)}</pre>;\n}"
          },
          {
            "title": "Q4: Sync scroll position",
            "explain": "Kya karna hai:\nRestore scrollY before paint — kam flicker.\n\nSeedha matlab:\nVisual sync → layoutEffect candidate.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function RestoreScroll({ y }) {\n  useLayoutEffect(() => {\n    window.scrollTo(0, y);\n  }, [y]);\n  return null;\n}"
          },
          {
            "title": "Q5: [MID] setState in layoutEffect still re-render",
            "explain": "Kya karna hai:\nMeasure → setState → extra render pehle paint — intentional.\n\nSeedha matlab:\nDouble render cost accept for correct first paint.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Box() {\n  const ref = useRef(null);\n  const [w, setW] = useState(0);\n  useLayoutEffect(() => {\n    setW(ref.current.offsetWidth);\n  });\n  return <div ref={ref}>w={w}</div>;\n}"
          },
          {
            "title": "Q6: Cleanup same as useEffect",
            "explain": "Kya karna hai:\nreturn () => cleanup — listeners etc.\n\nSeedha matlab:\nTiming alag; cleanup API same.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function LockScroll() {\n  useLayoutEffect(() => {\n    const prev = document.body.style.overflow;\n    document.body.style.overflow = \"hidden\";\n    return () => {\n      document.body.style.overflow = prev;\n    };\n  }, []);\n  return <p>Modal open — scroll locked</p>;\n}"
          },
          {
            "title": "Q7: [MID] SSR warning awareness",
            "explain": "Kya karna hai:\nServer pe layoutEffect nahi chalta — hydrate mismatch careful.\n\nSeedha matlab:\nMeasure-only after mount. Initial render safe default.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function ClientOnlyMeasure() {\n  const [ready, setReady] = useState(false);\n  useLayoutEffect(() => setReady(true), []);\n  if (!ready) return null;\n  return <Measure />;\n}"
          },
          {
            "title": "Q8: Decision cheat",
            "explain": "Kya karna hai:\nFlicker/measure/DOM read-write sync? layout. Else effect.\n\nSeedha matlab:\nInterview one-liner yahi.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function CheatSheet() {\n  return (\n    <p>\n      useEffect = after paint · useLayoutEffect = before paint (rare)\n    </p>\n  );\n}"
          },
          {
            "title": "Q9: Paint blocking explained",
            "explain": "Kya karna hai:\nuseLayoutEffect browser ko paint rokta hai jab tak sync work khatam na ho.\n\nSeedha matlab:\nLamba layoutEffect = jank, FPS drop. Chhota sync DOM tweak OK.\nDefault useEffect — paint pehle, user responsive feel.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function PaintBlockNote() {\n  return <p>layoutEffect sync = main thread block until done.</p>;\n}"
          },
          {
            "title": "Q10: Flicker fix — measure then setState",
            "explain": "Kya karna hai:\nTooltip pehle (0,0) paint hota useEffect me → flash. layoutEffect me fix.\n\nSeedha matlab:\nUser ko wrong frame nahi dikhega. Measure → correct pos → phir paint.\nClassic interview before/after example.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function FlickerTooltip({ show, anchorRef }) {\n  const [style, setStyle] = useState({ opacity: 0 });\n  useLayoutEffect(() => {\n    if (!show || !anchorRef.current) return;\n    const r = anchorRef.current.getBoundingClientRect();\n    setStyle({ position: \"fixed\", top: r.bottom, left: r.left, opacity: 1 });\n  }, [show, anchorRef]);\n  if (!show) return null;\n  return <div style={style}>Tip</div>;\n}"
          },
          {
            "title": "Q11: [MID] useEffect vs useLayoutEffect timing diagram",
            "explain": "Kya karna hai:\nRender → DOM commit → layoutEffect → paint → useEffect.\n\nSeedha matlab:\nDOM ready dono me. layout paint se pehle; effect paint ke baad.\nRead layout → write DOM sync = layoutEffect territory.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function TimingNote() {\n  return (\n    <p>\n      Order: commit DOM → useLayoutEffect → browser paint → useEffect\n    </p>\n  );\n}"
          },
          {
            "title": "Q12: Auto-focus input without flash",
            "explain": "Kya karna hai:\nModal open → input focus layoutEffect me — pehle frame unfocused avoid.\n\nSeedha matlab:\nUX polish. User focus jump paint se pehle ho jaye.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function AutoFocusInput({ open }) {\n  const ref = useRef(null);\n  useLayoutEffect(() => {\n    if (open) ref.current?.focus();\n  }, [open]);\n  if (!open) return null;\n  return <input ref={ref} placeholder=\"Focused\" />;\n}"
          },
          {
            "title": "Q13: DOM measurement for animation start",
            "explain": "Kya karna hai:\nElement height measure → animate to height layoutEffect me start.\n\nSeedha matlab:\nExpand/collapse animation wrong start = flicker. Measure first frame sync.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function MeasuredExpand({ open, children }) {\n  const ref = useRef(null);\n  const [height, setHeight] = useState(0);\n  useLayoutEffect(() => {\n    if (ref.current) setHeight(ref.current.scrollHeight);\n  }, [open, children]);\n  return (\n    <div style={{ height: open ? height : 0, overflow: \"hidden\" }}>\n      <div ref={ref}>{children}</div>\n    </div>\n  );\n}"
          },
          {
            "title": "Q14: [MID] SSR warning — suppressHydration / client-only",
            "explain": "Kya karna hai:\nServer: layoutEffect skip. Client mount ke baad measure — mismatch avoid.\n\nSeedha matlab:\n\"useLayoutEffect does nothing on the server\" warning normal SSR me.\nClientOnlyMeasure pattern (Q7) ya dynamic import ssr:false.\nInitial HTML safe defaults; measure post-hydrate.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function SsrSafeMeasure() {\n  const [mounted, setMounted] = useState(false);\n  useLayoutEffect(() => setMounted(true), []);\n  if (!mounted) return <div style={{ minHeight: 40 }}>Loading...</div>;\n  return <Measure />;\n}"
          },
          {
            "title": "Q15: When NOT useLayoutEffect — subscriptions",
            "explain": "Kya karna hai:\nwindow resize listener — useEffect OK, paint block mat karo.\n\nSeedha matlab:\nListeners, fetch, timers = useEffect. DOM visual sync = layoutEffect.\nRule of thumb yaad rakho interview me.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function ResizeListener() {\n  const [w, setW] = useState(window.innerWidth);\n  useEffect(() => {\n    const fn = () => setW(window.innerWidth);\n    window.addEventListener(\"resize\", fn);\n    return () => window.removeEventListener(\"resize\", fn);\n  }, []);\n  return <p>{w}px</p>;\n}"
          },
          {
            "title": "Q16: Read then write DOM — forced reflow",
            "explain": "Kya karna hai:\noffsetHeight read → style.width set — ek layoutEffect batch me.\n\nSeedha matlab:\nuseEffect me read/write = extra layout thrashing possible.\nSync read-write layoutEffect me = ek forced layout, controlled.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function ReadWriteSync() {\n  const ref = useRef(null);\n  useLayoutEffect(() => {\n    const el = ref.current;\n    if (!el) return;\n    const w = el.offsetWidth;\n    el.style.maxWidth = `${w / 2}px`;\n  }, []);\n  return <div ref={ref}>Resize me</div>;\n}"
          },
          {
            "title": "Q17: [MID] Double render with layoutEffect setState",
            "explain": "Kya karna hai:\nRender 1 → layoutEffect setState → Render 2 → paint.\n\nSeedha matlab:\nCost accept karte hain correct visual ke liye.\nReact 18 batching se better but still 2 commits possible.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function DoubleRenderNote() {\n  return <p>layoutEffect setState = extra render before paint — intentional.</p>;\n}"
          },
          {
            "title": "Q18: Tooltip vs popover positioning libs",
            "explain": "Kya karna hai:\nFloating UI / Popper — internally layoutEffect or similar sync measure.\n\nSeedha matlab:\nManual tooltip = layoutEffect. Libraries handle edge cases.\nInterview: know WHY libs use sync measure.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function PopperNote() {\n  return <p>Position libs = measure + flip + shift — sync layout critical.</p>;\n}"
          },
          {
            "title": "Q19: useLayoutEffect dependency changes",
            "explain": "Kya karna hai:\nanchor move pe tooltip reposition — deps [anchorRef, open].\n\nSeedha matlab:\nHar relevant change pe re-measure before paint.\nMissing dep = stale position flash.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function FollowAnchor({ anchorRef, open }) {\n  const [pos, setPos] = useState({ x: 0, y: 0 });\n  useLayoutEffect(() => {\n    if (!open || !anchorRef.current) return;\n    const r = anchorRef.current.getBoundingClientRect();\n    setPos({ x: r.left, y: r.bottom });\n  }, [open, anchorRef]);\n  if (!open) return null;\n  return <div style={{ position: \"fixed\", left: pos.x, top: pos.y }}>▾</div>;\n}"
          },
          {
            "title": "Q20: [MID] useInsertionEffect — CSS-in-JS note",
            "explain": "Kya karna hai:\nStyled-components inject styles BEFORE layoutEffect — even earlier.\n\nSeedha matlab:\nTimeline: insertionEffect → layoutEffect → paint → effect.\nCSS inject order ke liye — rare interview deep dive.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function InsertionEffectNote() {\n  return <p>useInsertionEffect = styles inject, layout se bhi pehle.</p>;\n}"
          },
          {
            "title": "Q21: Avoid layoutEffect for logging/analytics",
            "explain": "Kya karna hai:\nconsole.log / track() — useEffect, paint block mat.\n\nSeedha matlab:\nNon-visual side effects paint ke baad theek. User wait nahi karega analytics.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function AnalyticsOnMount({ id }) {\n  useEffect(() => {\n    console.log(\"view\", id);\n  }, [id]);\n  return null;\n}"
          },
          {
            "title": "Q22: Decision flowchart recap",
            "explain": "Kya karna hai:\nDOM measure/read/write visual sync? → layoutEffect. Else → useEffect.\n\nSeedha matlab:\nFlicker complaint + DOM measure = first fix to try.\n95% cases useEffect enough — layoutEffect surgical tool.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function LayoutDecision() {\n  return (\n    <ul>\n      <li>Visual flicker? → useLayoutEffect</li>\n      <li>Fetch/log/timer? → useEffect</li>\n      <li>SSR? → client-only measure</li>\n    </ul>\n  );\n}"
          }
        ]
      },
      {
        "file": "19_Portals.jsx",
        "title": "19 — Portals",
        "kya": "Portal = React tree me child yahan, DOM me kahin aur (body pe",
        "detail": "19 — Portals\nLevel: MID  |  Sequence: pehle yeh, phir agla number\n\nLAYMAN: Portal = React tree me child yahan, DOM me kahin aur (body pe\nmodal). Jaise kitchen order counter pe, dish table pe serve.\ncreatePortal(jsx, domNode) — events ab bhi React tree se bubble (logical).\n\nUse: modals, tooltips, toasts — overflow:hidden parent se bachna.\n\nKYUN: CSS stacking/overflow issues fix without breaking component tree.\nINTERVIEW: why portals; event bubbling through portals.\nVite/React 19 project me use — teaching file.",
        "intro": "19 — Portals\nLevel: MID  |  Sequence: pehle yeh, phir agla number\n\nLAYMAN: Portal = React tree me child yahan, DOM me kahin aur (body pe\nmodal). Jaise kitchen order counter pe, dish table pe serve.\ncreatePortal(jsx, domNode) — events ab bhi React tree se bubble (logical).\n\nUse: modals, tooltips, toasts — overflow:hidden parent se bachna.\n\nKYUN: CSS stacking/overflow issues fix without breaking component tree.\nINTERVIEW: why portals; event bubbling through portals.\nVite/React 19 project me use — teaching file.",
        "questions": [
          {
            "title": "Q1: Modal via portal to document.body",
            "explain": "Kya karna hai:\ncreatePortal(<dialog/>, document.body)\n\nSeedha matlab:\nModal DOM root pe — z-index/overflow safe.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Modal({ children, onClose }) {\n  return createPortal(\n    <div className=\"overlay\" onClick={onClose}>\n      <div className=\"modal\" onClick={(e) => e.stopPropagation()}>\n        {children}\n      </div>\n    </div>,\n    document.body\n  );\n}"
          },
          {
            "title": "Q2: Conditional portal",
            "explain": "Kya karna hai:\nopen tabhi portal mount.\n\nSeedha matlab:\nBand modal = portal unmount. Cleanup natural.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function App() {\n  const [open, setOpen] = useState(false);\n  return (\n    <div>\n      <button onClick={() => setOpen(true)}>Open</button>\n      {open && (\n        <Modal onClose={() => setOpen(false)}>\n          <p>Hello portal</p>\n        </Modal>\n      )}\n    </div>\n  );\n}"
          },
          {
            "title": "Q3: Toast container",
            "explain": "Kya karna hai:\nFixed corner portal for toasts.\n\nSeedha matlab:\nApp kahin se toast — DOM ek jagah.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Toast({ message }) {\n  return createPortal(\n    <div className=\"toast\">{message}</div>,\n    document.body\n  );\n}"
          },
          {
            "title": "Q4: Target node by id",
            "explain": "Kya karna hai:\ndocument.getElementById(\"modal-root\")\n\nSeedha matlab:\nindex.html me <div id=\"modal-root\"> alag root common pattern.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function PortalToRoot({ children }) {\n  const node = document.getElementById(\"modal-root\") || document.body;\n  return createPortal(children, node);\n}"
          },
          {
            "title": "Q5: [MID] Events bubble in React tree",
            "explain": "Kya karna hai:\nParent onClick portal child click pe fire ho sakta (React 17+ delegation).\n\nSeedha matlab:\nDOM alag, React parentage same. stopPropagation samajh ke use.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function ParentClick() {\n  return (\n    <div onClick={() => console.log(\"parent\")}>\n      <Modal onClose={() => {}}>\n        <button>Click — parent may hear in React tree</button>\n      </Modal>\n    </div>\n  );\n}"
          },
          {
            "title": "Q6: Focus trap note (a11y)",
            "explain": "Kya karna hai:\nPortal modal pe focus trap / Escape close — a11y zaroori.\n\nSeedha matlab:\nPortal sirf DOM move; accessibility alag kaam.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function A11yModal({ onClose, children }) {\n  useEffect(() => {\n    function onKey(e) {\n      if (e.key === \"Escape\") onClose();\n    }\n    window.addEventListener(\"keydown\", onKey);\n    return () => window.removeEventListener(\"keydown\", onKey);\n  }, [onClose]);\n  return createPortal(\n    <div role=\"dialog\" aria-modal=\"true\">\n      {children}\n    </div>,\n    document.body\n  );\n}"
          },
          {
            "title": "Q7: [MID] SSR: document check",
            "explain": "Kya karna hai:\ntypeof document === \"undefined\" pe null.\n\nSeedha matlab:\nServer pe body nahi. Client mount ke baad portal.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function SafePortal({ children }) {\n  const [ready, setReady] = useState(false);\n  useEffect(() => setReady(true), []);\n  if (!ready) return null;\n  return createPortal(children, document.body);\n}"
          },
          {
            "title": "Q8: Tooltip portal",
            "explain": "Kya karna hai:\nOverflow hidden card se tooltip bahar.\n\nSeedha matlab:\nSame reason as modal — escape clipping.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Tip({ text }) {\n  return createPortal(<div className=\"tip\">{text}</div>, document.body);\n}"
          },
          {
            "title": "Q9: Nested portal — modal ke andar tooltip",
            "explain": "Kya karna hai:\nOuter modal body pe; inner tooltip bhi body pe alag portal.\n\nSeedha matlab:\nDono DOM alag jagah, React tree parent-child. Nested portals valid.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function NestedPortalModal({ open, onClose }) {\n  if (!open) return null;\n  return createPortal(\n    <div className=\"overlay\">\n      <div className=\"modal\">\n        <p>Modal content</p>\n        {createPortal(<div className=\"tip\">Nested tip</div>, document.body)}\n        <button onClick={onClose}>Close</button>\n      </div>\n    </div>,\n    document.body\n  );\n}"
          },
          {
            "title": "Q10: [MID] DOM stopPropagation vs React bubble",
            "explain": "Kya karna hai:\ne.stopPropagation() DOM pe; React synthetic parent onClick alag rule.\n\nSeedha matlab:\nPortal DOM bahar hai par React tree me andar — dono layers samjho.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function BubbleDemo() {\n  return (\n    <div onClick={() => console.log(\"React parent\")}>\n      <Modal onClose={() => {}}>\n        <button onClick={(e) => e.stopPropagation()}>Stop DOM only</button>\n      </Modal>\n    </div>\n  );\n}"
          },
          {
            "title": "Q11: Body scroll lock jab modal open",
            "explain": "Kya karna hai:\nopen pe document.body.style.overflow = \"hidden\"; close pe restore.\n\nSeedha matlab:\nPortal scroll trap nahi karta — scroll lock khud karo.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function ScrollLockModal({ open, onClose, children }) {\n  useEffect(() => {\n    if (!open) return;\n    const prev = document.body.style.overflow;\n    document.body.style.overflow = \"hidden\";\n    return () => {\n      document.body.style.overflow = prev;\n    };\n  }, [open]);\n  if (!open) return null;\n  return createPortal(\n    <div className=\"overlay\" onClick={onClose}>\n      <div className=\"modal\" onClick={(e) => e.stopPropagation()}>\n        {children}\n      </div>\n    </div>,\n    document.body\n  );\n}"
          },
          {
            "title": "Q12: [MID] Focus trap — tab loop modal ke andar",
            "explain": "Kya karna hai:\nModal open pe pehla focusable element focus; Tab last se first pe loop.\n\nSeedha matlab:\nKeyboard users bahar na bhatak jayein — a11y must.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function FocusTrapModal({ onClose, children }) {\n  const modalRef = useRef(null);\n  useEffect(() => {\n    const el = modalRef.current;\n    if (!el) return;\n    const focusables = el.querySelectorAll(\n      'button, [href], input, select, textarea, [tabindex]:not([tabindex=\"-1\"])'\n    );\n    focusables[0]?.focus();\n    function onKey(e) {\n      if (e.key !== \"Tab\" || focusables.length === 0) return;\n      const first = focusables[0];\n      const last = focusables[focusables.length - 1];\n      if (e.shiftKey && document.activeElement === first) {\n        e.preventDefault();\n        last.focus();\n      } else if (!e.shiftKey && document.activeElement === last) {\n        e.preventDefault();\n        first.focus();\n      }\n    }\n    el.addEventListener(\"keydown\", onKey);\n    return () => el.removeEventListener(\"keydown\", onKey);\n  }, []);\n  return createPortal(\n    <div ref={modalRef} role=\"dialog\" aria-modal=\"true\">\n      {children}\n      <button onClick={onClose}>Close</button>\n    </div>,\n    document.body\n  );\n}"
          },
          {
            "title": "Q13: Close pe focus wapas trigger button pe",
            "explain": "Kya karna hai:\nopen se pehle document.activeElement save; close pe .focus() restore.\n\nSeedha matlab:\nScreen reader / keyboard flow natural rahe.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function ReturnFocusModal({ open, onClose, triggerRef }) {\n  const prevFocus = useRef(null);\n  useEffect(() => {\n    if (open) {\n      prevFocus.current = document.activeElement;\n    } else {\n      prevFocus.current?.focus?.();\n    }\n  }, [open]);\n  if (!open) return null;\n  return createPortal(\n    <div role=\"dialog\">\n      <p>Modal</p>\n      <button onClick={onClose}>Done</button>\n    </div>,\n    document.body\n  );\n}"
          },
          {
            "title": "Q14: [MID] aria-hidden background jab modal open",
            "explain": "Kya karna hai:\n#root pe aria-hidden=\"true\" jab modal; cleanup pe hatao.\n\nSeedha matlab:\nAssistive tech sirf modal sunegi — background \"mute\".",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function AriaHiddenModal({ open, onClose, children }) {\n  useEffect(() => {\n    const root = document.getElementById(\"root\");\n    if (!open || !root) return;\n    root.setAttribute(\"aria-hidden\", \"true\");\n    return () => root.removeAttribute(\"aria-hidden\");\n  }, [open]);\n  if (!open) return null;\n  return createPortal(\n    <div role=\"dialog\" aria-modal=\"true\">\n      {children}\n      <button onClick={onClose}>Close</button>\n    </div>,\n    document.body\n  );\n}"
          },
          {
            "title": "Q15: Multiple modals — z-index stacking",
            "explain": "Kya karna hai:\nHar modal ka apna z-index level; confirm dialog modal ke upar.\n\nSeedha matlab:\nPortal same body pe — order + z-index se stack manage.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function StackedModals() {\n  const [confirm, setConfirm] = useState(false);\n  return (\n    <>\n      {createPortal(\n        <div style={{ zIndex: 1000 }} className=\"modal\">Main modal</div>,\n        document.body\n      )}\n      {confirm &&\n        createPortal(\n          <div style={{ zIndex: 1100 }} className=\"modal\">\n            Sure?\n            <button onClick={() => setConfirm(false)}>OK</button>\n          </div>,\n          document.body\n        )}\n    </>\n  );\n}"
          },
          {
            "title": "Q16: [MID] Portal target ref se (dynamic container)",
            "explain": "Kya karna hai:\nuseRef + useEffect se container node ready; tab createPortal.\n\nSeedha matlab:\ngetElementById fixed nahi — component apna mount point bana sakta.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function DynamicPortalTarget({ children }) {\n  const ref = useRef(null);\n  const [node, setNode] = useState(null);\n  useEffect(() => setNode(ref.current), []);\n  return (\n    <>\n      <div ref={ref} id=\"dynamic-portal-root\" />\n      {node && createPortal(children, node)}\n    </>\n  );\n}"
          },
          {
            "title": "Q17: Tooltip portal — overflow clip se bachna",
            "explain": "Kya karna hai:\nCard overflow:hidden; tooltip createPortal se body pe fixed position.\n\nSeedha matlab:\nPosition calculate karo (getBoundingClientRect); render portal me.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function TooltipPortal({ anchorRef, text, show }) {\n  const [pos, setPos] = useState({ top: 0, left: 0 });\n  useEffect(() => {\n    if (!show || !anchorRef.current) return;\n    const r = anchorRef.current.getBoundingClientRect();\n    setPos({ top: r.bottom + 4, left: r.left });\n  }, [show, anchorRef]);\n  if (!show) return null;\n  return createPortal(\n    <div className=\"tip\" style={{ position: \"fixed\", ...pos }}>\n      {text}\n    </div>,\n    document.body\n  );\n}"
          },
          {
            "title": "Q18: [ADV] React 17+ event delegation root pe",
            "explain": "Kya karna hai:\ndocument pe nahi — React root pe delegate; portal events tree me bubble.\n\nSeedha matlab:\nInterview: portal DOM alag, React hierarchy same — isliye parent onClick fire.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function DelegationNote() {\n  return (\n    <p>\n      React 17+: events root container se attach — portal child ka click React\n      parent tak bubble ho sakta hai.\n    </p>\n  );\n}"
          },
          {
            "title": "Q19: [ADV] SSR hydration — portal server pe null",
            "explain": "Kya karna hai:\nServer HTML me portal content nahi; client mount ke baad inject.\n\nSeedha matlab:\nHydration mismatch avoid — client-only portal pattern (Q7 jaisa).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function HydrationSafePortal({ children }) {\n  const [mounted, setMounted] = useState(false);\n  useEffect(() => setMounted(true), []);\n  if (!mounted) return null;\n  return createPortal(children, document.body);\n}"
          },
          {
            "title": "Q20: [ADV] Nested portal unmount order",
            "explain": "Kya karna hai:\nParent modal unmount → andar ke nested portals bhi cleanup.\n\nSeedha matlab:\nReact unmount tree order follow — nested portal DOM nodes bhi hatao.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function UnmountOrderDemo() {\n  const [open, setOpen] = useState(true);\n  return (\n    <div>\n      <button onClick={() => setOpen(false)}>Close all</button>\n      {open && (\n        <NestedPortalModal open onClose={() => setOpen(false)} />\n      )}\n    </div>\n  );\n}"
          },
          {
            "title": "Q21: [ADV] Portal vs position:fixed — kab kya?",
            "explain": "Kya karna hai:\nFixed + high z-index kabhi kaafi; portal jab ancestor transform/overflow clip.\n\nSeedha matlab:\nInterview: stacking context / overflow:hidden parent → portal zaroori.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function PortalVsFixed() {\n  return (\n    <p>\n      position:fixed kaafi jab parent clip na kare; portal jab modal DOM hierarchy\n      se bahar chahiye.\n    </p>\n  );\n}"
          },
          {
            "title": "Q22: [ADV] Interview — portal checklist bolke sunao",
            "explain": "Kya karna hai:\ncreatePortal, events, SSR guard, focus trap, scroll lock, aria-modal.\n\nSeedha matlab:\nMid interview answer: DOM escape + React tree preserve + a11y alag kaam.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function PortalChecklist() {\n  return (\n    <ol>\n      <li>createPortal(jsx, domNode)</li>\n      <li>Events React tree me bubble</li>\n      <li>SSR: client-only mount</li>\n      <li>Focus trap + return focus + Escape</li>\n      <li>Scroll lock + aria-hidden background</li>\n    </ol>\n  );\n}"
          }
        ]
      },
      {
        "file": "20_ErrorBoundaries.jsx",
        "title": "20 — Error Boundaries",
        "kya": "Error boundary = safety net. Child tree render me crash → poori",
        "detail": "20 — Error Boundaries\nLevel: MID  |  Sequence: pehle yeh, phir agla number\n\nLAYMAN: Error boundary = safety net. Child tree render me crash → poori\napp white screen ki jagah fallback UI. Class component (ya library) se.\n\nCatch: render, lifecycle, constructors of children.\nNOT catch: event handlers, async, SSR, khud boundary errors — try/catch wahan.\n\nKYUN: Production resilience. Widget fail ≠ whole app die.\nINTERVIEW: what they catch / don't; class getDerivedStateFromError.\nVite/React 19 project me use — teaching file. (class API yahan intentional)",
        "intro": "20 — Error Boundaries\nLevel: MID  |  Sequence: pehle yeh, phir agla number\n\nLAYMAN: Error boundary = safety net. Child tree render me crash → poori\napp white screen ki jagah fallback UI. Class component (ya library) se.\n\nCatch: render, lifecycle, constructors of children.\nNOT catch: event handlers, async, SSR, khud boundary errors — try/catch wahan.\n\nKYUN: Production resilience. Widget fail ≠ whole app die.\nINTERVIEW: what they catch / don't; class getDerivedStateFromError.\nVite/React 19 project me use — teaching file. (class API yahan intentional)",
        "questions": [
          {
            "title": "Q1: Basic class error boundary",
            "explain": "Kya karna hai:\ngetDerivedStateFromError + componentDidCatch.\n\nSeedha matlab:\nhasError state → fallback. didCatch logging.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "class ErrorBoundary extends Component {\n  constructor(props) {\n    super(props);\n    this.state = { hasError: false };\n  }\n  static getDerivedStateFromError() {\n    return { hasError: true };\n  }\n  componentDidCatch(error, info) {\n    console.error(\"Boundary caught\", error, info);\n  }\n  render() {\n    if (this.state.hasError) {\n      return this.props.fallback ?? <p>Something broke.</p>;\n    }\n    return this.props.children;\n  }\n}"
          },
          {
            "title": "Q2: Wrap risky widget",
            "explain": "Kya karna hai:\n<ErrorBoundary><Risky /></ErrorBoundary>\n\nSeedha matlab:\nIsolate blast radius. Baaki app chalega.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Risky({ blow }) {\n  if (blow) throw new Error(\"boom\");\n  return <p>OK</p>;\n}\n\nfunction Dashboard() {\n  return (\n    <div>\n      <h1>Dash</h1>\n      <ErrorBoundary fallback={<p>Widget failed</p>}>\n        <Risky blow />\n      </ErrorBoundary>\n      <p>Still here</p>\n    </div>\n  );\n}"
          },
          {
            "title": "Q3: Reset by changing key",
            "explain": "Kya karna hai:\nkey={resetId} boundary pe — remount clear error state.\n\nSeedha matlab:\nRetry UX: user \"Try again\" → key++.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Recoverable() {\n  const [resetId, setResetId] = useState(0);\n  return (\n    <div>\n      <button onClick={() => setResetId((x) => x + 1)}>Try again</button>\n      <ErrorBoundary key={resetId}>\n        <Risky blow />\n      </ErrorBoundary>\n    </div>\n  );\n}"
          },
          {
            "title": "Q4: Event handler errors NOT caught",
            "explain": "Kya karna hai:\nonClick me throw — boundary nahi pakdegi; try/catch.\n\nSeedha matlab:\nInterview classic. Handlers alag.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function ClickBomb() {\n  return (\n    <button\n      onClick={() => {\n        try {\n          throw new Error(\"click boom\");\n        } catch (e) {\n          console.error(e);\n        }\n      }}\n    >\n      Click\n    </button>\n  );\n}"
          },
          {
            "title": "Q5: [MID] Async errors NOT caught",
            "explain": "Kya karna hai:\nfetch().then throw — boundary nahi. Error state khud set.\n\nSeedha matlab:\nData layer me error UI pattern (06/23).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function AsyncErrorDemo() {\n  const [err, setErr] = useState(null);\n  async function load() {\n    try {\n      throw new Error(\"network\");\n    } catch (e) {\n      setErr(String(e));\n    }\n  }\n  return (\n    <div>\n      <button onClick={load}>Load</button>\n      {err && <p>{err}</p>}\n    </div>\n  );\n}"
          },
          {
            "title": "Q6: Nested boundaries",
            "explain": "Kya karna hai:\nPage boundary + section boundary — granular fallbacks.\n\nSeedha matlab:\nFine-grained UX: sidebar fail, main OK.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Page() {\n  return (\n    <ErrorBoundary fallback={<p>Page crash</p>}>\n      <ErrorBoundary fallback={<p>Side crash</p>}>\n        <aside>Side</aside>\n      </ErrorBoundary>\n      <main>Main</main>\n    </ErrorBoundary>\n  );\n}"
          },
          {
            "title": "Q7: [MID] Logging service in didCatch",
            "explain": "Kya karna hai:\nSentry/LogRocket style — componentDidCatch me report.\n\nSeedha matlab:\nProduction observability. User ko friendly fallback.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "class ReportingBoundary extends Component {\n  state = { hasError: false };\n  static getDerivedStateFromError() {\n    return { hasError: true };\n  }\n  componentDidCatch(error, info) {\n    // window.myLogger?.send(error, info);\n    console.log(\"report\", error.message, info.componentStack);\n  }\n  render() {\n    if (this.state.hasError) return <p>Reported. Sorry.</p>;\n    return this.props.children;\n  }\n}"
          },
          {
            "title": "Q8: Libraries note",
            "explain": "Kya karna hai:\nreact-error-boundary package — hooks-friendly API.\n\nSeedha matlab:\nClass boilerplate avoid karne ke liye team libs use karti.\nConcept same.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Note() {\n  return <p>Concept: isolate render errors with a boundary.</p>;\n}"
          },
          {
            "title": "Q9: getDerivedStateFromError — side effects mat",
            "explain": "Kya karna hai:\nSirf state return karo; logging componentDidCatch me.\n\nSeedha matlab:\ngetDerivedStateFromError pure hona chahiye — React rule.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "class PureBoundary extends Component {\n  state = { hasError: false };\n  static getDerivedStateFromError() {\n    return { hasError: true }; // no fetch/log here\n  }\n  componentDidCatch(error, info) {\n    console.error(error, info.componentStack);\n  }\n  render() {\n    return this.state.hasError ? this.props.fallback : this.props.children;\n  }\n}"
          },
          {
            "title": "Q10: [MID] Custom fallback with error details (dev only)",
            "explain": "Kya karna hai:\ndidCatch me error message state me (dev); prod me generic UI.\n\nSeedha matlab:\nUser ko friendly; dev ko detail — env check se.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "class DevFallbackBoundary extends Component {\n  state = { hasError: false, msg: \"\" };\n  static getDerivedStateFromError(error) {\n    return { hasError: true, msg: error.message };\n  }\n  render() {\n    if (this.state.hasError) {\n      return (\n        <div>\n          <p>Something went wrong.</p>\n          {import.meta.env.DEV && <pre>{this.state.msg}</pre>}\n        </div>\n      );\n    }\n    return this.props.children;\n  }\n}"
          },
          {
            "title": "Q11: componentStack se kaun crash hua",
            "explain": "Kya karna hai:\ninfo.componentStack logging me — Sentry ko bhejo.\n\nSeedha matlab:\nStack batata kaun sa child component fail — debug fast.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "class StackLogBoundary extends Component {\n  state = { hasError: false };\n  static getDerivedStateFromError() {\n    return { hasError: true };\n  }\n  componentDidCatch(error, info) {\n    console.log(\"componentStack:\", info.componentStack);\n  }\n  render() {\n    if (this.state.hasError) return <p>Logged with stack.</p>;\n    return this.props.children;\n  }\n}"
          },
          {
            "title": "Q12: [MID] useEffect throw — boundary pakdegi",
            "explain": "Kya karna hai:\nEffect ke andar throw → render phase me propagate → boundary catch.\n\nSeedha matlab:\nAsync setTimeout throw nahi; sync throw effect me boundary tak ja sakta.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function EffectThrow({ bad }) {\n  useEffect(() => {\n    if (bad) throw new Error(\"effect sync throw\");\n  }, [bad]);\n  return <p>Effect demo</p>;\n}"
          },
          {
            "title": "Q13: Render me conditional throw — classic catch",
            "explain": "Kya karna hai:\nif (!data) throw new Error — boundary fallback.\n\nSeedha matlab:\nRender/lifecycle errors — yahi boundary ka main job.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function RenderThrow({ data }) {\n  if (!data) throw new Error(\"missing data\");\n  return <p>{data}</p>;\n}"
          },
          {
            "title": "Q14: [MID] SSR — error boundary server pe alag behavior",
            "explain": "Kya karna hai:\nServer render error → HTML error page; client hydrate alag.\n\nSeedha matlab:\nBoundary mostly client hydration/render; SSR errors often framework handle.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function SSRNote() {\n  return (\n    <p>\n      SSR crash often whole response fail; client ErrorBoundary widget-level\n      isolate karti hai.\n    </p>\n  );\n}"
          },
          {
            "title": "Q15: Boundary khud throw — parent boundary pakdegi",
            "explain": "Kya karna hai:\nInner boundary render me crash → outer boundary fallback.\n\nSeedha matlab:\nBoundary apne errors catch nahi karti — parent ya white screen.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function OuterInnerDemo() {\n  return (\n    <ErrorBoundary fallback={<p>Outer caught</p>}>\n      <ErrorBoundary fallback={<p>Inner caught</p>}>\n        <Risky blow />\n      </ErrorBoundary>\n    </ErrorBoundary>\n  );\n}"
          },
          {
            "title": "Q16: [MID] Granular boundaries — chart vs table alag",
            "explain": "Kya karna hai:\nHar widget apni boundary — ek fail, baaki dashboard live.\n\nSeedha matlab:\nBlast radius chhota = better UX + easier debug.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function WidgetGrid() {\n  return (\n    <div className=\"grid\">\n      <ErrorBoundary fallback={<p>Chart failed</p>}>\n        <Risky blow={false} />\n      </ErrorBoundary>\n      <ErrorBoundary fallback={<p>Table failed</p>}>\n        <Risky blow={false} />\n      </ErrorBoundary>\n    </div>\n  );\n}"
          },
          {
            "title": "Q17: [ADV] React 19 — error overlay / use hook errors",
            "explain": "Kya karna hai:\nuse() promise reject → nearest Suspense/boundary; dev overlay alag.\n\nSeedha matlab:\nReact 19 me data errors Suspense boundary ke saath integrate ho rahe.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function React19Note() {\n  return (\n    <p>\n      React 19: render errors + use() rejections — boundary/Suspense stack\n      samjho; class boundary ab bhi render errors ke liye.\n    </p>\n  );\n}"
          },
          {
            "title": "Q18: [ADV] react-error-boundary — resetKeys prop",
            "explain": "Kya karna hai:\nresetKeys={[userId]} change → auto reset error state.\n\nSeedha matlab:\nManual key++ ki jagah library prop — same remount idea.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function ResetKeysNote() {\n  return (\n    <p>\n      react-error-boundary: resetKeys prop se boundary dubara try — key pattern\n      automated.\n    </p>\n  );\n}"
          },
          {
            "title": "Q19: [ADV] try/catch render me — kaam nahi karta",
            "explain": "Kya karna hai:\nfunction App() { try { return Child } catch — ❌ child throw catch nahi.\n\nSeedha matlab:\nRender async nahi; child throw parent try se bypass — boundary chahiye.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function TryCatchLimit() {\n  return (\n    <p>\n      Parent me try/catch child render throw nahi pakdega — ErrorBoundary use\n      karo.\n    </p>\n  );\n}"
          },
          {
            "title": "Q20: [ADV] ErrorBoundary bahar, Suspense andar order",
            "explain": "Kya karna hai:\nErrorBoundary wraps Suspense wraps Lazy — lazy fail + render fail dono.\n\nSeedha matlab:\nSuspense = loading; Boundary = error — outer boundary recommended.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function StackOrderNote() {\n  return (\n    <p>\n      Pattern: ErrorBoundary → Suspense → LazyComponent. Import fail boundary\n      pakdegi.\n    </p>\n  );\n}"
          },
          {
            "title": "Q21: [ADV] Logging — PII scrub before send",
            "explain": "Kya karna hai:\ndidCatch me error.message safe; user input stack me mat bhejo raw.\n\nSeedha matlab:\nProduction logging me GDPR/security — sanitize payload.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "class SafeLogBoundary extends Component {\n  state = { hasError: false };\n  static getDerivedStateFromError() {\n    return { hasError: true };\n  }\n  componentDidCatch(error, info) {\n    const safe = {\n      message: error.message?.slice(0, 200),\n      stack: info.componentStack,\n    };\n    console.log(\"safe report\", safe);\n  }\n  render() {\n    if (this.state.hasError) return <p>Sorry, error reported.</p>;\n    return this.props.children;\n  }\n}"
          },
          {
            "title": "Q22: [ADV] Interview matrix — kya pakdega kya nahi",
            "explain": "Kya karna hai:\nRender/lifecycle ✅ | Events ❌ | Async ❌ | Boundary self ❌ | SSR ⚠️\n\nSeedha matlab:\nEk table yahin yaad — interview me fast answer.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function CatchMatrix() {\n  return (\n    <table>\n      <tbody>\n        <tr><td>Render throw</td><td>✅ Boundary</td></tr>\n        <tr><td>onClick throw</td><td>❌ try/catch</td></tr>\n        <tr><td>fetch().then throw</td><td>❌ error state</td></tr>\n        <tr><td>Boundary render throw</td><td>❌ parent boundary</td></tr>\n      </tbody>\n    </table>\n  );\n}"
          }
        ]
      },
      {
        "file": "21_SuspenseAndLazy.jsx",
        "title": "21 — Suspense And Lazy",
        "kya": "lazy() = component ka code baad me download (code split) — jaise",
        "detail": "21 — Suspense And Lazy\nLevel: MID  |  Sequence: pehle yeh, phir agla number\n\nLAYMAN: lazy() = component ka code baad me download (code split) — jaise\nheavy dessert pehle mat banao jab guest order kare. Suspense = waiting room\nUI (fallback) jab woh code/data ready nahi.\n\nconst Page = lazy(() => import(\"./Page\"));\n<Suspense fallback={<Spinner/>}><Page/></Suspense>\n\nKYUN: Chhoti initial bundle; faster first paint. Routes pe common.\nINTERVIEW: code splitting; Suspense boundaries; error boundary saath.\nVite/React 19 project me use — teaching file. (React 19 data Suspense alag depth)",
        "intro": "21 — Suspense And Lazy\nLevel: MID  |  Sequence: pehle yeh, phir agla number\n\nLAYMAN: lazy() = component ka code baad me download (code split) — jaise\nheavy dessert pehle mat banao jab guest order kare. Suspense = waiting room\nUI (fallback) jab woh code/data ready nahi.\n\nconst Page = lazy(() => import(\"./Page\"));\n<Suspense fallback={<Spinner/>}><Page/></Suspense>\n\nKYUN: Chhoti initial bundle; faster first paint. Routes pe common.\nINTERVIEW: code splitting; Suspense boundaries; error boundary saath.\nVite/React 19 project me use — teaching file. (React 19 data Suspense alag depth)",
        "questions": [
          {
            "title": "Q1: React.lazy basic",
            "explain": "Kya karna hai:\nlazy(() => import(\"./HeavyChart\"))\n\nSeedha matlab:\nDynamic import → alag chunk. Pehli visit pe load.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const HeavyChart = lazy(() => import(\"./HeavyChart\")); // path example\n\nfunction Dashboard() {\n  return (\n    <Suspense fallback={<p>Loading chart...</p>}>\n      <HeavyChart />\n    </Suspense>\n  );\n}"
          },
          {
            "title": "Q2: Route-level split sketch",
            "explain": "Kya karna hai:\nHar page lazy — Router me Suspense wrap.\n\nSeedha matlab:\nBiggest win: users rarely-visited pages baad me.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const Settings = lazy(() => import(\"./Settings\"));\nconst Profile = lazy(() => import(\"./Profile\"));\n\nfunction RoutesSketch({ page }) {\n  return (\n    <Suspense fallback={<p>Loading page...</p>}>\n      {page === \"settings\" ? <Settings /> : <Profile />}\n    </Suspense>\n  );\n}"
          },
          {
            "title": "Q3: Nested Suspense",
            "explain": "Kya karna hai:\nPage shell turant; andar widgets alag fallback.\n\nSeedha matlab:\nGranular spinners > ek bada blank.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const WidgetA = lazy(() => import(\"./WidgetA\"));\nconst WidgetB = lazy(() => import(\"./WidgetB\"));\n\nfunction Home() {\n  return (\n    <div>\n      <h1>Home</h1>\n      <Suspense fallback={<p>A...</p>}>\n        <WidgetA />\n      </Suspense>\n      <Suspense fallback={<p>B...</p>}>\n        <WidgetB />\n      </Suspense>\n    </div>\n  );\n}"
          },
          {
            "title": "Q4: Conditional lazy mount",
            "explain": "Kya karna hai:\nTab open hone pe hi heavy panel load.\n\nSeedha matlab:\nMount = import trigger. Band rakho jab zarurat nahi.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Tabs() {\n  const [open, setOpen] = useState(false);\n  return (\n    <div>\n      <button onClick={() => setOpen(true)}>Open editor</button>\n      {open && (\n        <Suspense fallback={<p>Loading editor...</p>}>\n          <HeavyChart />\n        </Suspense>\n      )}\n    </div>\n  );\n}"
          },
          {
            "title": "Q5: [MID] Error boundary + Suspense",
            "explain": "Kya karna hai:\nLazy import fail / render error — boundary bahar.\n\nSeedha matlab:\nSuspense = wait. ErrorBoundary = fail. Dono stack.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "// <ErrorBoundary>\n//   <Suspense fallback={<Spinner />}>\n//     <LazyPage />\n//   </Suspense>\n// </ErrorBoundary>"
          },
          {
            "title": "Q6: Named export lazy",
            "explain": "Kya karna hai:\nlazy(() => import(\"./mod\").then(m => ({ default: m.Chart })))\n\nSeedha matlab:\nlazy expects default export. Named → remap.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const Chart = lazy(() =>\n  import(\"./charts\").then((m) => ({ default: m.Chart }))\n);"
          },
          {
            "title": "Q7: [MID] Prefetch on hover (pattern)",
            "explain": "Kya karna hai:\nLink hover pe import(\"./Page\") — cache warm.\n\nSeedha matlab:\nUX snappy. Router libs often built-in.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function PrefetchLink() {\n  function warm() {\n    import(\"./Settings\");\n  }\n  return (\n    <a href=\"/settings\" onMouseEnter={warm}>\n      Settings\n    </a>\n  );\n}"
          },
          {
            "title": "Q8: Fallback design tip",
            "explain": "Kya karna hai:\nFallback layout shift kam — skeleton same size.\n\nSeedha matlab:\nCLS avoid. Spinner center OK chhote widgets pe.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function SkeletonFallback() {\n  return <div className=\"skeleton h-40\" aria-busy=\"true\" />;\n}"
          },
          {
            "title": "Q9: lazy sirf default export — named remap",
            "explain": "Kya karna hai:\n.then(m => ({ default: m.Named })) — Q6 recap practice.\n\nSeedha matlab:\nDynamic import default expect karta; named ko wrap karo.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const NamedPanel = lazy(() =>\n  import(\"./panels\").then((m) => ({ default: m.SettingsPanel }))\n);"
          },
          {
            "title": "Q10: [MID] Suspense boundary list ke har item pe mat",
            "explain": "Kya karna hai:\nEk Suspense poori list wrap; andar lazy items — ek fallback.\n\nSeedha matlab:\nHar row alag Suspense = spinner spam; boundary level socho.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function LazyList({ ids }) {\n  return (\n    <Suspense fallback={<p>Loading items...</p>}>\n      <ul>\n        {ids.map((id) => (\n          <LazyRow key={id} id={id} />\n        ))}\n      </ul>\n    </Suspense>\n  );\n}\nconst LazyRow = lazy(() => import(\"./LazyRow\"));"
          },
          {
            "title": "Q11: startTransition + lazy route feel",
            "explain": "Kya karna hai:\nUrgent tab click; transition me route/lazy load — UI responsive.\n\nSeedha matlab:\nHeavy lazy mount non-urgent — typing/input block na ho.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function TransitionLazy({ showHeavy }) {\n  return (\n    <Suspense fallback={<p>Loading...</p>}>\n      {showHeavy ? <HeavyChart /> : <p>Light view</p>}\n    </Suspense>\n  );\n}"
          },
          {
            "title": "Q12: [MID] use() hook — promise read (React 19 data Suspense)",
            "explain": "Kya karna hai:\nfunction Child({ dataPromise }) { const data = use(dataPromise); }\n\nSeedha matlab:\nPromise throw/suspend → nearest Suspense fallback. RSC/CSR contrast.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function DataChild({ userPromise }) {\n  const user = use(userPromise);\n  return <p>{user.name}</p>;\n}\nfunction DataSuspenseDemo({ promise }) {\n  return (\n    <Suspense fallback={<p>Loading user...</p>}>\n      <DataChild userPromise={promise} />\n    </Suspense>\n  );\n}"
          },
          {
            "title": "Q13: RSC vs client lazy contrast",
            "explain": "Kya karna hai:\nServer Component = zero client bundle; lazy = client chunk split.\n\nSeedha matlab:\nRSC data server pe; lazy code-splitting client pe — alag problems.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function RSCContrast() {\n  return (\n    <p>\n      RSC: server render + stream. lazy+Suspense: client JS chunk download.\n      Dono \"wait\" UI but mechanism alag.\n    </p>\n  );\n}"
          },
          {
            "title": "Q14: [MID] Suspense boundary placement — route vs widget",
            "explain": "Kya karna hai:\nRoute level ek bada fallback; widget level chhote skeletons.\n\nSeedha matlab:\nUser ko kya dikhe jab wait — granularity UX decide karti.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function PlacementDemo() {\n  return (\n    <Suspense fallback={<div className=\"page-skeleton\" />}>\n      <Home />\n    </Suspense>\n  );\n}"
          },
          {
            "title": "Q15: Preload — component mount se pehle import()",
            "explain": "Kya karna hai:\nRoute config me loader: () => import(\"./Page\") — hover/route intent.\n\nSeedha matlab:\nLazy first render slow; preload se Suspense time kam.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const PreloadedPage = lazy(() => import(\"./PreloadedPage\"));\nfunction PreloadOnIntent() {\n  function intent() {\n    import(\"./PreloadedPage\");\n  }\n  return (\n    <button onMouseEnter={intent} onFocus={intent}>\n      Go (preloaded on hover)\n    </button>\n  );\n}"
          },
          {
            "title": "Q16: [MID] Error vs Suspense — alag states",
            "explain": "Kya karna hai:\nSuspense = pending; ErrorBoundary = rejected/render throw.\n\nSeedha matlab:\nDono stack karo; ek component me mix mat confuse.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function ErrorSuspenseStack() {\n  return (\n    // <ErrorBoundary fallback={<Err />}>\n    //   <Suspense fallback={<Spin />}>\n    //     <LazyOrUseData />\n    //   </Suspense>\n    // </ErrorBoundary>\n    <p>Boundary bahar, Suspense andar — loading vs error alag UI.</p>\n  );\n}"
          },
          {
            "title": "Q17: [ADV] Suspense for data fetching (CSR) limitations",
            "explain": "Kya karna hai:\nHar fetch Suspense-friendly nahi — cache/resource layer chahiye.\n\nSeedha matlab:\nTanStack Query suspense mode ya custom resource — throw promise pattern.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function DataSuspenseLimit() {\n  return (\n    <p>\n      Raw fetch in useEffect ≠ Suspense. Resource cache promise throw kare tab\n      Suspense kaam karta.\n    </p>\n  );\n}"
          },
          {
            "title": "Q18: [ADV] React Query suspense mode contrast",
            "explain": "Kya karna hai:\nuseQuery({ suspense: true }) — library boundary handle; fallback Suspense.\n\nSeedha matlab:\nManual use() vs RQ — same mental model, less boilerplate lib se.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function RQContrast() {\n  return (\n    <p>\n      React Query suspense: query pending pe suspend. Cache/retry lib sambhalti.\n    </p>\n  );\n}"
          },
          {
            "title": "Q19: [ADV] Streaming SSR + Suspense",
            "explain": "Kya karna hai:\nServer HTML me fallback first; ready chunk stream replace.\n\nSeedha matlab:\nClient lazy alag; SSR Suspense HTML stream — faster TTFB feel.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function StreamingNote() {\n  return <p>SSR Suspense: shell pehle, slow data baad me stream.</p>;\n}"
          },
          {
            "title": "Q20: [ADV] lazy().then wrap + memo combo",
            "explain": "Kya karna hai:\nconst C = lazy(...); export default memo(C) — re-render lazy child stable.\n\nSeedha matlab:\nCode split + perf — lazy load once, memo frequent parent renders.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const MemoLazy = lazy(() =>\n  import(\"./Heavy\").then((m) => ({ default: m.default }))\n);"
          },
          {
            "title": "Q21: [ADV] Kab lazy mat use karo",
            "explain": "Kya karna hai:\nCritical above-fold, tiny components, always-needed shell — eager import.\n\nSeedha matlab:\nOver-splitting = extra requests + Suspense flash. Profile bundle pehle.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function WhenNotLazy() {\n  return (\n    <ul>\n      <li>Above-fold hero — eager</li>\n      <li>Tiny icon — eager</li>\n      <li>Rare admin page — lazy ✅</li>\n    </ul>\n  );\n}"
          },
          {
            "title": "Q22: [ADV] Interview — Suspense + lazy + use() ek answer",
            "explain": "Kya karna hai:\nCode split (lazy), wait UI (Suspense), data (use), errors (Boundary).\n\nSeedha matlab:\nTeen layer bolke sunao — mid interview strong close.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function SuspenseInterview() {\n  return (\n    <ol>\n      <li>lazy() — dynamic import, alag chunk</li>\n      <li>Suspense — suspend pe fallback</li>\n      <li>use(promise) — data suspense React 19</li>\n      <li>ErrorBoundary — fail case alag</li>\n    </ol>\n  );\n}"
          }
        ]
      },
      {
        "file": "22_RoutingBasics.jsx",
        "title": "22 — Routing Basics",
        "kya": "SPA me URL badlo bina full reload — React Router (ya similar).",
        "detail": "22 — Routing Basics\nLevel: MID  |  Sequence: pehle yeh, phir agla number\n\nLAYMAN: SPA me URL badlo bina full reload — React Router (ya similar).\nBrowserRouter, Routes, Route, Link, useParams, useNavigate, Outlet.\nJaise mall me directories — alag floor, same building (ek HTML).\n\nNested routes = layout share. Navigate programmatic (login ke baad).\n\nKYUN: Multi-page feel apps. Interview me routing basics expected.\nINTERVIEW: Link vs a; nested routes; params; protected route idea.\nVite/React 19 project me use — teaching file (react-router v6 style API).",
        "intro": "22 — Routing Basics\nLevel: MID  |  Sequence: pehle yeh, phir agla number\n\nLAYMAN: SPA me URL badlo bina full reload — React Router (ya similar).\nBrowserRouter, Routes, Route, Link, useParams, useNavigate, Outlet.\nJaise mall me directories — alag floor, same building (ek HTML).\n\nNested routes = layout share. Navigate programmatic (login ke baad).\n\nKYUN: Multi-page feel apps. Interview me routing basics expected.\nINTERVIEW: Link vs a; nested routes; params; protected route idea.\nVite/React 19 project me use — teaching file (react-router v6 style API).",
        "questions": [
          {
            "title": "Q1: Basic Routes + Link",
            "explain": "Kya karna hai:\n/ aur /about — Link se navigate (full reload nahi).\n\nSeedha matlab:\n<a href> reload. <Link to> client route.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Home() {\n  return <h1>Home</h1>;\n}\nfunction About() {\n  return <h1>About</h1>;\n}\n\nfunction AppRoutes() {\n  return (\n    <BrowserRouter>\n      <nav>\n        <Link to=\"/\">Home</Link>\n        <Link to=\"/about\">About</Link>\n      </nav>\n      <Routes>\n        <Route path=\"/\" element={<Home />} />\n        <Route path=\"/about\" element={<About />} />\n      </Routes>\n    </BrowserRouter>\n  );\n}"
          },
          {
            "title": "Q2: useParams — /users/:id",
            "explain": "Kya karna hai:\nconst { id } = useParams()\n\nSeedha matlab:\nDynamic segment URL se padho.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function UserPage() {\n  const { id } = useParams();\n  return <h2>User {id}</h2>;\n}\n// <Route path=\"/users/:id\" element={<UserPage />} />"
          },
          {
            "title": "Q3: useNavigate programmatic",
            "explain": "Kya karna hai:\nlogin success → navigate(\"/dashboard\")\n\nSeedha matlab:\nButton/handler se route change. replace option history clean.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Login() {\n  const navigate = useNavigate();\n  function onOk() {\n    navigate(\"/dashboard\", { replace: true });\n  }\n  return <button onClick={onOk}>Login</button>;\n}"
          },
          {
            "title": "Q4: Nested layout + Outlet",
            "explain": "Kya karna hai:\nParent layout Route; child routes; <Outlet /> jagah content.\n\nSeedha matlab:\nShared nav/sidebar. Children plug into outlet.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function AdminLayout() {\n  return (\n    <div>\n      <aside>Admin nav</aside>\n      <Outlet />\n    </div>\n  );\n}\n// <Route path=\"/admin\" element={<AdminLayout />}>\n//   <Route path=\"users\" element={<Users />} />\n// </Route>"
          },
          {
            "title": "Q5: [MID] Protected route idea",
            "explain": "Kya karna hai:\nAgar !user → <Navigate to=\"/login\" />\n\nSeedha matlab:\nWrapper component auth check. Real apps me loader/token.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function PrivateRoute({ user, children }) {\n  if (!user) return <Navigate to=\"/login\" replace />;\n  return children;\n}"
          },
          {
            "title": "Q6: useSearchParams query string",
            "explain": "Kya karna hai:\n?q=react padho/likho.\n\nSeedha matlab:\nFilters URL me — shareable/back button friendly.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function SearchPage() {\n  const [params, setParams] = useSearchParams();\n  const q = params.get(\"q\") ?? \"\";\n  return (\n    <input\n      value={q}\n      onChange={(e) => setParams({ q: e.target.value })}\n    />\n  );\n}"
          },
          {
            "title": "Q7: [MID] 404 Not Found route",
            "explain": "Kya karna hai:\npath=\"*\" element={<NotFound />}\n\nSeedha matlab:\nCatch-all last. Unknown URLs handle.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function NotFound() {\n  return <h1>404</h1>;\n}\n// <Route path=\"*\" element={<NotFound />} />"
          },
          {
            "title": "Q8: Index route",
            "explain": "Kya karna hai:\nParent path pe default child — <Route index element={...} />\n\nSeedha matlab:\n/parent exact pe default panel.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "// <Route path=\"/shop\" element={<ShopLayout />}>\n//   <Route index element={<Featured />} />\n//   <Route path=\"cart\" element={<Cart />} />\n// </Route>"
          },
          {
            "title": "Q9: NavLink — active class automatic",
            "explain": "Kya karna hai:\nNavLink to=\"/about\" className={({ isActive }) => isActive ? \"on\" : \"\"}\n\nSeedha matlab:\nLink sirf navigate; NavLink current route highlight deta.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Nav() {\n  return (\n    <nav>\n      <NavLink to=\"/\" end>\n        Home\n      </NavLink>\n      <NavLink\n        to=\"/about\"\n        className={({ isActive }) => (isActive ? \"nav-active\" : \"\")}\n      >\n        About\n      </NavLink>\n    </nav>\n  );\n}"
          },
          {
            "title": "Q10: [MID] Relative paths nested routes me",
            "explain": "Kya karna hai:\nParent /admin; child path=\"users\" → /admin/users (leading / mat).\n\nSeedha matlab:\nNested Route paths relative — URL compose parent se.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function RelativeNestedNote() {\n  return (\n    <p>\n      Nested child path=\"settings\" under /app → /app/settings. Absolute path /\n      se root.\n    </p>\n  );\n}"
          },
          {
            "title": "Q11: useLocation — pathname + state read",
            "explain": "Kya karna hai:\nconst loc = useLocation(); loc.pathname, loc.state from navigate.\n\nSeedha matlab:\nURL + hidden state (flash message) — shareable vs private data.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function FlashBanner() {\n  const loc = useLocation();\n  const msg = loc.state?.flash;\n  return msg ? <p className=\"flash\">{msg}</p> : null;\n}"
          },
          {
            "title": "Q12: [MID] navigate with state pass",
            "explain": "Kya karna hai:\nnavigate(\"/done\", { state: { from: \"checkout\" } })\n\nSeedha matlab:\nQuery string public; state object history me — refresh pe lost ho sakta.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function GoDone() {\n  const navigate = useNavigate();\n  return (\n    <button\n      onClick={() =>\n        navigate(\"/done\", { state: { flash: \"Order placed!\" } })\n      }\n    >\n      Finish\n    </button>\n  );\n}"
          },
          {
            "title": "Q13: Route loader sketch (data before render idea)",
            "explain": "Kya karna hai:\nv6.4+ loader async — component ko data ready mile.\n\nSeedha matlab:\nuseEffect fetch kam; router loader waterfall avoid helper.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function LoaderSketchNote() {\n  return (\n    <p>\n      Route loader: data fetch route match pe — component render se pehle. Advanced\n      44 me depth.\n    </p>\n  );\n}"
          },
          {
            "title": "Q14: [MID] Outlet context — parent se child ko data",
            "explain": "Kya karna hai:\nOutlet context={{ user }} — child useOutletContext().\n\nSeedha matlab:\nLayout shared data bina prop drill — nested routes ke liye.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function LayoutWithContext() {\n  const user = { name: \"Jay\" };\n  return (\n    <div>\n      <header>Hi {user.name}</header>\n      <Outlet context={{ user }} />\n    </div>\n  );\n}"
          },
          {
            "title": "Q15: Index route vs path=\"\"",
            "explain": "Kya karna hai:\nindex element parent exact URL pe; path=\"\" similar v6 semantics.\n\nSeedha matlab:\n/shop → Featured (index); /shop/cart → Cart. Default child clear.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function IndexVsEmptyNote() {\n  return <p>Index route = parent URL pe default child bina extra segment.</p>;\n}"
          },
          {
            "title": "Q16: [MID] Protected route — Outlet wrapper pattern",
            "explain": "Kya karna hai:\nProtectedLayout check auth; andar Outlet ya Navigate login.\n\nSeedha matlab:\nHar child route ek saath protect — DRY auth guard.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function ProtectedLayout({ user }) {\n  if (!user) return <Navigate to=\"/login\" replace />;\n  return <Outlet />;\n}\n// <Route element={<ProtectedLayout user={user} />}>\n//   <Route path=\"/dashboard\" element={<Dash />} />\n// </Route>"
          },
          {
            "title": "Q17: Link replace — history stack clean",
            "explain": "Kya karna hai:\nLogin success Link replace to dashboard — back button login pe na jaye.\n\nSeedha matlab:\nreplace={true} same as navigate replace option.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function ReplaceLink() {\n  return (\n    <Link to=\"/home\" replace>\n      Go home (no back to here)\n    </Link>\n  );\n}"
          },
          {
            "title": "Q18: [ADV] BrowserRouter vs HashRouter",
            "explain": "Kya karna hai:\nBrowserRouter = clean URLs (/about); HashRouter = #/about static host pe.\n\nSeedha matlab:\nServer config vs GitHub Pages — deployment decide karta.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function RouterModeNote() {\n  return (\n    <p>\n      BrowserRouter: server fallback index.html chahiye. HashRouter: hash routing,\n      server config easy.\n    </p>\n  );\n}"
          },
          {
            "title": "Q19: [ADV] Splat / catch-all segment",
            "explain": "Kya karna hai:\npath=\"/docs/*\" — baaki path match; useParams se * part.\n\nSeedha matlab:\nNested docs/files dynamic depth — splat flexible.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function DocsCatchAll() {\n  const params = useParams();\n  return <p>Docs path: {params[\"*\"]}</p>;\n}\n// <Route path=\"/docs/*\" element={<DocsCatchAll />} />"
          },
          {
            "title": "Q20: [ADV] Scroll restoration basic",
            "explain": "Kya karna hai:\nRoute change pe window.scrollTo(0,0) ya ScrollRestoration component.\n\nSeedha matlab:\nSPA me browser auto scroll top nahi — khud handle.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function ScrollTopOnNav() {\n  const { pathname } = useLocation();\n  useEffect(() => {\n    window.scrollTo(0, 0);\n  }, [pathname]);\n  return null;\n}"
          },
          {
            "title": "Q21: [ADV] Relative Link \"../\" nested me",
            "explain": "Kya karna hai:\n/admin/users/5/edit se Link to=\"..\" → /admin/users/5\n\nSeedha matlab:\nRelative navigation — URL manually mat likho, router relative resolve.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function BackToList() {\n  return <Link to=\"..\">Back to list</Link>;\n}"
          },
          {
            "title": "Q22: [ADV] Interview — nested routes mental model",
            "explain": "Kya karna hai:\nLayout Route + Outlet + child paths + index + 404 last.\n\nSeedha matlab:\nEk diagram bolke: URL tree = Route tree, Outlet = child slot.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function RoutingInterview() {\n  return (\n    <ol>\n      <li>BrowserRouter — history API</li>\n      <li>Routes/Route — path → element</li>\n      <li>Nested: layout + Outlet + relative paths</li>\n      <li>Params, search, navigate, NavLink active</li>\n      <li>Protected wrapper + 404 path=\"*\"</li>\n    </ol>\n  );\n}"
          }
        ]
      },
      {
        "file": "23_DataFetchingPatterns.jsx",
        "title": "23 — Data Fetching Patterns",
        "kya": "Server se data lana — loading, success, error teen states.",
        "detail": "23 — Data Fetching Patterns\nLevel: MID  |  Sequence: pehle yeh, phir agla number\n\nLAYMAN: Server se data lana — loading, success, error teen states.\nPattern 1: useEffect + fetch + useState (classic).\nPattern 2: custom useFetch. Pattern 3: libs (React Query/SWR) — cache, retry.\nRace, cleanup, stale — pehle cover (09). Yahan UI patterns jodna.\n\nKYUN: Har real app fetch karti. Interview me race + loading UI poochte.\nINTERVIEW: where to fetch; caching; waterfalls; parallel requests.\nVite/React 19 project me use — teaching file.",
        "intro": "23 — Data Fetching Patterns\nLevel: MID  |  Sequence: pehle yeh, phir agla number\n\nLAYMAN: Server se data lana — loading, success, error teen states.\nPattern 1: useEffect + fetch + useState (classic).\nPattern 2: custom useFetch. Pattern 3: libs (React Query/SWR) — cache, retry.\nRace, cleanup, stale — pehle cover (09). Yahan UI patterns jodna.\n\nKYUN: Har real app fetch karti. Interview me race + loading UI poochte.\nINTERVIEW: where to fetch; caching; waterfalls; parallel requests.\nVite/React 19 project me use — teaching file.",
        "questions": [
          {
            "title": "Q1: Classic status triad",
            "explain": "Kya karna hai:\nidle/loading/success/error UI.\n\nSeedha matlab:\nEk status string ya flags — user ko feedback.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function UsersClassic() {\n  const [status, setStatus] = useState(\"idle\");\n  const [data, setData] = useState(null);\n  const [error, setError] = useState(null);\n\n  async function load() {\n    setStatus(\"loading\");\n    setError(null);\n    try {\n      const res = await fetch(\"/api/users\");\n      if (!res.ok) throw new Error(\"HTTP \" + res.status);\n      const json = await res.json();\n      setData(json);\n      setStatus(\"success\");\n    } catch (e) {\n      setError(String(e));\n      setStatus(\"error\");\n    }\n  }\n\n  useEffect(() => {\n    load();\n  }, []);\n\n  if (status === \"loading\") return <p>Loading...</p>;\n  if (status === \"error\") return <p>{error}</p>;\n  return <pre>{JSON.stringify(data)}</pre>;\n}"
          },
          {
            "title": "Q2: Parallel fetches",
            "explain": "Kya karna hai:\nPromise.all([fetchA, fetchB])\n\nSeedha matlab:\nWaterfall mat banao jab independent. Parallel = tez.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Parallel() {\n  const [bundle, setBundle] = useState(null);\n  useEffect(() => {\n    Promise.all([\n      fetch(\"/api/user\").then((r) => r.json()),\n      fetch(\"/api/posts\").then((r) => r.json()),\n    ]).then(([user, posts]) => setBundle({ user, posts }));\n  }, []);\n  return <pre>{JSON.stringify(bundle)}</pre>;\n}"
          },
          {
            "title": "Q3: Dependent fetch (waterfall unavoidable)",
            "explain": "Kya karna hai:\nPehle user, phir user.id se posts.\n\nSeedha matlab:\nKabhi serial zaroori. UI me staged loading OK.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Dependent() {\n  const [posts, setPosts] = useState([]);\n  useEffect(() => {\n    let alive = true;\n    (async () => {\n      const user = await fetch(\"/api/me\").then((r) => r.json());\n      const posts = await fetch(`/api/users/${user.id}/posts`).then((r) =>\n        r.json()\n      );\n      if (alive) setPosts(posts);\n    })();\n    return () => {\n      alive = false;\n    };\n  }, []);\n  return <ul>{posts.map((p) => <li key={p.id}>{p.title}</li>)}</ul>;\n}"
          },
          {
            "title": "Q4: AbortController cancel",
            "explain": "Kya karna hai:\ncleanup me abort — unmount / dep change.\n\nSeedha matlab:\nRace + wasted network dono kam.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function AbortFetch({ id }) {\n  const [data, setData] = useState(null);\n  useEffect(() => {\n    const ac = new AbortController();\n    fetch(`/api/items/${id}`, { signal: ac.signal })\n      .then((r) => r.json())\n      .then(setData)\n      .catch((e) => {\n        if (e.name !== \"AbortError\") console.error(e);\n      });\n    return () => ac.abort();\n  }, [id]);\n  return <pre>{JSON.stringify(data)}</pre>;\n}"
          },
          {
            "title": "Q5: [MID] Stale-while-revalidate sketch",
            "explain": "Kya karna hai:\nPurana data dikhao, peeche refresh, phir update.\n\nSeedha matlab:\nSWR/RQ idea. UX snappy. Cache key.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const cache = new Map();\nfunction useSWRLite(key, fetcher) {\n  const [data, setData] = useState(() => cache.get(key));\n  useEffect(() => {\n    let alive = true;\n    fetcher(key).then((fresh) => {\n      cache.set(key, fresh);\n      if (alive) setData(fresh);\n    });\n    return () => {\n      alive = false;\n    };\n  }, [key, fetcher]);\n  return data;\n}"
          },
          {
            "title": "Q6: Optimistic UI sketch",
            "explain": "Kya karna hai:\nLike button — pehle UI +1, fail pe rollback.\n\nSeedha matlab:\nFast feel. Error handling zaroori.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Like({ initial }) {\n  const [likes, setLikes] = useState(initial);\n  async function like() {\n    const prev = likes;\n    setLikes(prev + 1);\n    try {\n      await fetch(\"/api/like\", { method: \"POST\" });\n    } catch {\n      setLikes(prev);\n    }\n  }\n  return <button onClick={like}>{likes} ♥</button>;\n}"
          },
          {
            "title": "Q7: [MID] Don't fetch in render",
            "explain": "Kya karna hai:\nComponent body me fetch() mat — infinite / duplicate.\n\nSeedha matlab:\nEffect, event, loader, or lib. Render pure.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Bad() {\n  // fetch(\"/api\"); // ❌ render phase\n  return null;\n}"
          },
          {
            "title": "Q8: Loading skeletons vs spinner",
            "explain": "Kya karna hai:\nList shape reserve — skeleton.\n\nSeedha matlab:\nPerceived performance. Layout shift kam.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function UserList({ loading, users }) {\n  if (loading) {\n    return (\n      <div>\n        <div className=\"skeleton\" />\n        <div className=\"skeleton\" />\n      </div>\n    );\n  }\n  return (\n    <ul>\n      {users.map((u) => (\n        <li key={u.id}>{u.name}</li>\n      ))}\n    </ul>\n  );\n}"
          },
          {
            "title": "Q9: Fetch on button — user-triggered load",
            "explain": "Kya karna hai:\nMount pe auto nahi; button click pe load() — intentional fetch.\n\nSeedha matlab:\nSearch/submit jaisa — empty deps effect ki jagah event driven.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function FetchOnClick() {\n  const [data, setData] = useState(null);\n  const [loading, setLoading] = useState(false);\n  async function load() {\n    setLoading(true);\n    const json = await fetch(\"/api/items\").then((r) => r.json());\n    setData(json);\n    setLoading(false);\n  }\n  return (\n    <div>\n      <button onClick={load} disabled={loading}>\n        {loading ? \"...\" : \"Load\"}\n      </button>\n      <pre>{JSON.stringify(data)}</pre>\n    </div>\n  );\n}"
          },
          {
            "title": "Q10: [MID] Race condition — purana response ignore",
            "explain": "Kya karna hai:\nid change fast — pehli slow response baad me aaye to setState mat.\n\nSeedha matlab:\nRequest id / ignore flag — stale data screen pe mat dikhao.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function RaceSafe({ id }) {\n  const [item, setItem] = useState(null);\n  useEffect(() => {\n    let ignore = false;\n    fetch(`/api/items/${id}`)\n      .then((r) => r.json())\n      .then((data) => {\n        if (!ignore) setItem(data);\n      });\n    return () => {\n      ignore = true;\n    };\n  }, [id]);\n  return <pre>{JSON.stringify(item)}</pre>;\n}"
          },
          {
            "title": "Q11: Dedupe — same key concurrent request ek hi",
            "explain": "Kya karna hai:\ninflight Map — do component same fetch kare to ek promise share.\n\nSeedha matlab:\nDouble mount / StrictMode — network waste kam.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const inflight = new Map();\nfunction fetchDeduped(url) {\n  if (inflight.has(url)) return inflight.get(url);\n  const p = fetch(url)\n    .then((r) => r.json())\n    .finally(() => inflight.delete(url));\n  inflight.set(url, p);\n  return p;\n}"
          },
          {
            "title": "Q12: [MID] React Query contrast — cache + staleTime",
            "explain": "Kya karna hai:\nuseQuery key se cache; refetch on window focus default.\n\nSeedha matlab:\nManual useState+effect vs lib — interview me tradeoffs bolo.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function RQContrastNote() {\n  return (\n    <p>\n      React Query: queryKey cache, staleTime, retry, dedupe built-in. Manual =\n      sab khud.\n    </p>\n  );\n}"
          },
          {
            "title": "Q13: Cache invalidation sketch",
            "explain": "Kya karna hai:\nPOST success ke baad cache.delete(key) ya queryClient.invalidate.\n\nSeedha matlab:\nMutate ke baad purana data mat dikhao — refresh trigger.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function invalidate(key) {\n  cache.delete(key);\n}"
          },
          {
            "title": "Q14: [MID] Suspense fetch — use() + resource pattern",
            "explain": "Kya karna hai:\nCache me pending promise; component use(resource.read()) suspend.\n\nSeedha matlab:\nReact 19 data Suspense — throw promise while pending (lib ya custom).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function createResource(promise) {\n  let status = \"pending\";\n  let result;\n  const suspender = promise.then(\n    (r) => {\n      status = \"success\";\n      result = r;\n    },\n    (e) => {\n      status = \"error\";\n      result = e;\n    }\n  );\n  return {\n    read() {\n      if (status === \"pending\") throw suspender;\n      if (status === \"error\") throw result;\n      return result;\n    },\n  };\n}"
          },
          {
            "title": "Q15: Polling — setInterval + cleanup",
            "explain": "Kya karna hai:\nuseEffect me interval; return clearInterval — unmount safe.\n\nSeedha matlab:\nLive dashboard — polling band jab component gayab.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function PollStatus() {\n  const [status, setStatus] = useState(\"...\");\n  useEffect(() => {\n    const id = setInterval(() => {\n      fetch(\"/api/status\")\n        .then((r) => r.json())\n        .then((d) => setStatus(d.text));\n    }, 5000);\n    return () => clearInterval(id);\n  }, []);\n  return <p>{status}</p>;\n}"
          },
          {
            "title": "Q16: [MID] Retry with backoff sketch",
            "explain": "Kya karna hai:\nFail pe 1s, 2s, 4s wait — max 3 try phir error UI.\n\nSeedha matlab:\nFlaky network — user ko turant give up mat dikhao.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "async function fetchWithRetry(url, tries = 3) {\n  for (let i = 0; i < tries; i++) {\n    try {\n      const res = await fetch(url);\n      if (!res.ok) throw new Error(String(res.status));\n      return res.json();\n    } catch (e) {\n      if (i === tries - 1) throw e;\n      await new Promise((r) => setTimeout(r, 1000 * 2 ** i));\n    }\n  }\n}"
          },
          {
            "title": "Q17: [ADV] Waterfall vs parallel — diagram bolke",
            "explain": "Kya karna hai:\nSerial: A→B→C time sum. Parallel: max(A,B,C).\n\nSeedha matlab:\nIndependent calls Promise.all; dependent unavoidable serial.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function WaterfallNote() {\n  return (\n    <p>\n      Waterfall: user wait then posts wait. Parallel: dono ek saath — jab\n      independent ho tab.\n    </p>\n  );\n}"
          },
          {
            "title": "Q18: [ADV] SWR revalidate on focus",
            "explain": "Kya karna hai:\nTab wapas aao → background refetch; purana data dikhte reh.\n\nSeedha matlab:\nstale-while-revalidate UX — SWR/RQ default behavior idea.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function SWRFocusNote() {\n  return (\n    <p>\n      SWR: cache dikhao, window focus pe revalidate — data fresh bina blank\n      screen.\n    </p>\n  );\n}"
          },
          {
            "title": "Q19: [ADV] Server state vs UI state split",
            "explain": "Kya karna hai:\nAPI data → query cache; modal open → useState local.\n\nSeedha matlab:\nSab ek object me mat — server state lib, UI state component me.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function StateSplitNote() {\n  return (\n    <p>\n      Server state (remote, cacheable) alag; UI state (tabs, inputs) local —\n      mix mat karo ek giant store me unnecessarily.\n    </p>\n  );\n}"
          },
          {
            "title": "Q20: [ADV] Prefetch route data on hover",
            "explain": "Kya karna hai:\nLink hover → queryClient.prefetchQuery ya fetch warm cache.\n\nSeedha matlab:\nNavigation feel instant — data pehle se ready.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function PrefetchDataNote() {\n  return <p>Hover intent pe prefetch — click tak data cache me.</p>;\n}"
          },
          {
            "title": "Q21: [ADV] Fetch kahan — effect vs event vs loader",
            "explain": "Kya karna hai:\nMount data → effect/loader; user action → event; render → ❌\n\nSeedha matlab:\nInterview golden rule: render pure, side effects controlled jagah.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function WhereFetchNote() {\n  return (\n    <ol>\n      <li>Mount/page data: useEffect or route loader</li>\n      <li>Button/search: event handler</li>\n      <li>Render body: never</li>\n    </ol>\n  );\n}"
          },
          {
            "title": "Q22: [ADV] Interview — fetch patterns ek minute me",
            "explain": "Kya karna hai:\nTriad UI, race cleanup, parallel, SWR mental model, RQ note, Suspense use().\n\nSeedha matlab:\nMid interview checklist — yahi file ka summary.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function FetchInterview() {\n  return (\n    <ol>\n      <li>loading/success/error triad</li>\n      <li>AbortController + ignore flag (race)</li>\n      <li>Promise.all parallel; serial jab dependent</li>\n      <li>SWR: stale show + background refresh</li>\n      <li>React Query: cache keys, invalidation</li>\n      <li>Suspense: use() / resource throw promise</li>\n    </ol>\n  );\n}"
          }
        ]
      },
      {
        "file": "24_ReRenderPerformance.jsx",
        "title": "24 — Re-render Performance",
        "kya": "Re-render = React function dubara chali UI update sochne. Har",
        "detail": "24 — Re-Render Performance\nLevel: MID  |  Sequence: pehle yeh, phir agla number\n\nLAYMAN: Re-render = React function dubara chali UI update sochne. Har\nsetState parent ke bacche bhi default dubara chalte — kabhi mehnga.\nFix hierarchy: (1) state neeche lao (2) children split (3) memo/callback\n(4) virtualize long lists. Profile pehle, optimize baad.\n\nKYUN: Janky typing / laggy lists. Mid interview favorite.\nINTERVIEW: why child re-renders; state colocation; React DevTools Profiler.\nVite/React 19 project me use — teaching file.",
        "intro": "24 — Re-Render Performance\nLevel: MID  |  Sequence: pehle yeh, phir agla number\n\nLAYMAN: Re-render = React function dubara chali UI update sochne. Har\nsetState parent ke bacche bhi default dubara chalte — kabhi mehnga.\nFix hierarchy: (1) state neeche lao (2) children split (3) memo/callback\n(4) virtualize long lists. Profile pehle, optimize baad.\n\nKYUN: Janky typing / laggy lists. Mid interview favorite.\nINTERVIEW: why child re-renders; state colocation; React DevTools Profiler.\nVite/React 19 project me use — teaching file.",
        "questions": [
          {
            "title": "Q1: State colocation",
            "explain": "Kya karna hai:\nInput state App se hata ke sirf SearchBox me.\n\nSeedha matlab:\nTyping pe poora tree mat roye — state jahan use.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function SearchBox() {\n  const [q, setQ] = useState(\"\");\n  return <input value={q} onChange={(e) => setQ(e.target.value)} />;\n}\n\nfunction Page() {\n  return (\n    <div>\n      <SearchBox />\n      <ExpensiveStatic />\n    </div>\n  );\n}\n\nconst ExpensiveStatic = memo(function ExpensiveStatic() {\n  console.log(\"static\");\n  return <div>Heavy but static</div>;\n});"
          },
          {
            "title": "Q2: Children as props trick",
            "explain": "Kya karna hai:\nParent state change pe pehle se create children identity same rehti.\n\nSeedha matlab:\n<Parent><Heavy /></Parent> — Parent re-render, Heavy props same → with\nstructure can skip (pattern). Detail: composition.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Parent({ children }) {\n  const [n, setN] = useState(0);\n  return (\n    <div>\n      <button onClick={() => setN(n + 1)}>{n}</button>\n      {children}\n    </div>\n  );\n}\n// use: <Parent><ExpensiveStatic /></Parent>"
          },
          {
            "title": "Q3: Split context (again)",
            "explain": "Kya karna hai:\nFrequently changing value alag context — wide tree kam re-render.\n\nSeedha matlab:\nTheme (rare) vs mouse position (hot) mat mix.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "// See 11_UseContext Q6 split state/dispatch"
          },
          {
            "title": "Q4: Avoid creating heavy work in render",
            "explain": "Kya karna hai:\nSort/filter — useMemo jab costly + frequent parent renders.\n\nSeedha matlab:\n16 file. Yahan: pehle unnecessary renders hatao.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function List({ items, query }) {\n  // prefer: fewer parent renders; then memoize filter if needed\n  const shown = items.filter((i) => i.includes(query));\n  return <ul>{shown.map((s) => <li key={s}>{s}</li>)}</ul>;\n}"
          },
          {
            "title": "Q5: [MID] Key that remounts too much",
            "explain": "Kya karna hai:\nkey={Math.random()} — har baar remount = slow + state loss.\n\nSeedha matlab:\nStable keys. Remount intentional ho tabhi key change.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function BadKey({ items }) {\n  return (\n    <ul>\n      {items.map((it) => (\n        <li key={it.id}>{it.name}</li>\n      ))}\n    </ul>\n  );\n}"
          },
          {
            "title": "Q6: [MID] Windowing / virtualization note",
            "explain": "Kya karna hai:\n10k rows — sirf viewport DOM (react-window etc).\n\nSeedha matlab:\nmemo se 10k manage nahi. Virtualize.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function VirtualNote() {\n  return <p>Long lists → windowing library, not only memo.</p>;\n}"
          },
          {
            "title": "Q7: Measure with Profiler mindset",
            "explain": "Kya karna hai:\nReact DevTools Profiler — kaun render, kitna time.\n\nSeedha matlab:\nGuess mat. Evidence se optimize.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Hint() {\n  return <p>Profile → find hot components → fix cause.</p>;\n}"
          },
          {
            "title": "Q8: Cheap wins checklist",
            "explain": "Kya karna hai:\nColocate state; memo expensive pure; stable callbacks; fewer context updates.\n\nSeedha matlab:\nInterview answer structure yahi order.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Checklist() {\n  return (\n    <ol>\n      <li>Colocate state</li>\n      <li>Split components</li>\n      <li>memo / useCallback where proven</li>\n      <li>Virtualize huge lists</li>\n    </ol>\n  );\n}"
          },
          {
            "title": "Q9: React DevTools — \"Highlight updates\" ON",
            "explain": "Kya karna hai:\nDevTools → Components → settings → highlight re-renders.\n\nSeedha matlab:\nKaun flash ho raha typing pe — visually pakdo, phir fix.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function DevToolsHint() {\n  return <p>Highlight updates se unnecessary re-renders dikhte hain.</p>;\n}"
          },
          {
            "title": "Q10: [MID] Context — har consumer re-render jab value change",
            "explain": "Kya karna hai:\nEk bada context object har render naya → sab consumers royein.\n\nSeedha matlab:\nSplit context / memo value / selector pattern — 11 file cross-ref.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function ContextPerfNote() {\n  return (\n    <p>\n      Context value reference change = sab subscribers re-render. State/dispatch\n      alag karo.\n    </p>\n  );\n}"
          },
          {
            "title": "Q11: Inline object/array props — memo break",
            "explain": "Kya karna hai:\nChild memo hai par style={{ color: \"red\" }} har render naya object.\n\nSeedha matlab:\nReference equality fail — memo useless. Stable ref ya useMemo style.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const MemoChild = memo(function MemoChild({ config }) {\n  console.log(\"MemoChild render\");\n  return <span>{config.label}</span>;\n});\nfunction InlinePropTrap() {\n  const [n, setN] = useState(0);\n  return (\n    <div>\n      <button onClick={() => setN(n + 1)}>{n}</button>\n      <MemoChild config={{ label: \"Hi\" }} />\n    </div>\n  );\n}"
          },
          {
            "title": "Q12: [MID] useCallback — stable handler jab memo child ko pass",
            "explain": "Kya karna hai:\nconst onClick = useCallback(() => {}, [deps]) — MemoRow ko pass.\n\nSeedha matlab:\nCallback har render naya → memo child phir render. Proof pehle Profiler se.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function StableHandlerParent() {\n  const [n, setN] = useState(0);\n  const onSave = useCallback(() => console.log(\"save\"), []);\n  return (\n    <div>\n      <button onClick={() => setN(n + 1)}>{n}</button>\n      <MemoChild config={{ label: \"save\", onClick: onSave }} />\n    </div>\n  );\n}"
          },
          {
            "title": "Q13: startTransition — non-urgent update alag priority",
            "explain": "Kya karna hai:\nstartTransition(() => setFiltered(huge)) — typing responsive rahe.\n\nSeedha matlab:\nHeavy filter/sort urgent nahi — transition se interruptible.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function TransitionFilter({ items }) {\n  const [q, setQ] = useState(\"\");\n  const [filtered, setFiltered] = useState(items);\n  const [pending, startTransition] = useTransition();\n  function onChange(e) {\n    const v = e.target.value;\n    setQ(v);\n    startTransition(() => {\n      setFiltered(items.filter((i) => i.includes(v)));\n    });\n  }\n  return (\n    <div>\n      <input value={q} onChange={onChange} />\n      {pending && <span>...</span>}\n      <ul>{filtered.map((s) => <li key={s}>{s}</li>)}</ul>\n    </div>\n  );\n}"
          },
          {
            "title": "Q14: [MID] React Compiler — future auto memo note",
            "explain": "Kya karna hai:\nCompiler stable props infer karega — manual memo kam pad sakta.\n\nSeedha matlab:\nAb bhi: colocate state pehle; Compiler bonus, excuse nahi premature memo.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function CompilerNote() {\n  return (\n    <p>\n      React Compiler: auto memoization research — abhi bhi measure + colocate\n      state rule #1.\n    </p>\n  );\n}"
          },
          {
            "title": "Q15: Lifting state down — split heavy sibling",
            "explain": "Kya karna hai:\nCounter state alag component me; list parent me bina counter ke.\n\nSeedha matlab:\nParent re-render se list bachao — state neeche lao.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function CounterIsland() {\n  const [n, setN] = useState(0);\n  return <button onClick={() => setN(n + 1)}>{n}</button>;\n}\nfunction SplitLayout() {\n  return (\n    <div>\n      <CounterIsland />\n      <ExpensiveStatic />\n    </div>\n  );\n}"
          },
          {
            "title": "Q16: [MID] List item alag memo component",
            "explain": "Kya karna hai:\nRow memo + stable id props — sirf changed row render.\n\nSeedha matlab:\nParent list re-render; rows same props → skip.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const Row = memo(function Row({ item }) {\n  return <li>{item}</li>;\n});\nfunction MemoList({ items }) {\n  return (\n    <ul>\n      {items.map((item) => (\n        <Row key={item} item={item} />\n      ))}\n    </ul>\n  );\n}"
          },
          {
            "title": "Q17: [ADV] Profiler — commit duration read",
            "explain": "Kya karna hai:\nRecord interaction → dekho kaun component ms le raha.\n\nSeedha matlab:\nFlamegraph se guess nahi — evidence based optimize.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function ProfilerNote() {\n  return <p>Profiler: slow commit → us component ka cause fix (state/props).</p>;\n}"
          },
          {
            "title": "Q18: [ADV] useDeferredValue — search debounce alternative feel",
            "explain": "Kya karna hai:\ndeferredQuery = useDeferredValue(query) — list ko deferred se filter.\n\nSeedha matlab:\nInput turant update; heavy list thodi der baad — smooth typing.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function DeferredSearch({ items }) {\n  const [q, setQ] = useState(\"\");\n  const deferredQ = useDeferredValue(q);\n  const shown = useMemo(\n    () => items.filter((i) => i.includes(deferredQ)),\n    [items, deferredQ]\n  );\n  return (\n    <div>\n      <input value={q} onChange={(e) => setQ(e.target.value)} />\n      <ul>{shown.map((s) => <li key={s}>{s}</li>)}</ul>\n    </div>\n  );\n}"
          },
          {
            "title": "Q19: [ADV] Activity / Offscreen (React 19+) — hide without unmount cost",
            "explain": "Kya karna hai:\nTab switch pe component hidden state — remount mat, defer updates.\n\nSeedha matlab:\nPerformance pattern emerging — tabs preserve state cheaply.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function ActivityNote() {\n  return (\n    <p>\n      React 19 Activity: hidden UI ko low priority — tabs me re-render kam.\n    </p>\n  );\n}"
          },
          {
            "title": "Q20: [ADV] Premature memo anti-pattern",
            "explain": "Kya karna hai:\nHar component memo/useCallback — complexity badho, gain zero.\n\nSeedha matlab:\nProfiler prove kare tab hi — default simple rakho.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function PrematureMemoNote() {\n  return <p>memo sab pe mat — pehle colocate state, phir profile, phir memo.</p>;\n}"
          },
          {
            "title": "Q21: [ADV] Virtualization recap — react-window",
            "explain": "Kya karna hai:\nFixed height list — sirf visible rows DOM me render.\n\nSeedha matlab:\n10k items: memo se kaam nahi; windowing mandatory.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function VirtualListSketch() {\n  return (\n    <p>\n      react-window: itemCount huge ho to DOM nodes kam — scroll viewport based.\n    </p>\n  );\n}"
          },
          {
            "title": "Q22: [ADV] Interview — slow render diagnose steps",
            "explain": "Kya karna hai:\nHighlight → Profiler → state location → props stable → memo last → virtualize.\n\nSeedha matlab:\nOrdered answer interview me strong — guess mat.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function PerfInterview() {\n  return (\n    <ol>\n      <li>DevTools highlight + Profiler</li>\n      <li>State colocate / lift down</li>\n      <li>Context split, inline props fix</li>\n      <li>useTransition / useDeferredValue</li>\n      <li>memo/useCallback if proven</li>\n      <li>Virtualize long lists</li>\n    </ol>\n  );\n}"
          }
        ]
      },
      {
        "file": "25_ControlledVsUncontrolled.jsx",
        "title": "25 — Controlled vs Uncontrolled",
        "kya": "Controlled = React state steering wheel (value + onChange).",
        "detail": "25 — Controlled Vs Uncontrolled\nLevel: MID  |  Sequence: pehle yeh, phir agla number\n\nLAYMAN: Controlled = React state steering wheel (value + onChange).\nUncontrolled = DOM apna value rakhe; tum ref se kabhi-kabhi padho\n(defaultValue). Jaise autopilot vs kabhi speedo check.\n\nControlled: validation, disable submit, sync fields — easy.\nUncontrolled: kam re-renders, simple one-shot forms, file input often.\nMix mat confuse karo — value + defaultValue saath = warning.\n\nKYUN: Form design decision. Interview me clear farq chahiye.\nINTERVIEW: when each; file inputs; converting between.\nVite/React 19 project me use — teaching file.",
        "intro": "25 — Controlled Vs Uncontrolled\nLevel: MID  |  Sequence: pehle yeh, phir agla number\n\nLAYMAN: Controlled = React state steering wheel (value + onChange).\nUncontrolled = DOM apna value rakhe; tum ref se kabhi-kabhi padho\n(defaultValue). Jaise autopilot vs kabhi speedo check.\n\nControlled: validation, disable submit, sync fields — easy.\nUncontrolled: kam re-renders, simple one-shot forms, file input often.\nMix mat confuse karo — value + defaultValue saath = warning.\n\nKYUN: Form design decision. Interview me clear farq chahiye.\nINTERVIEW: when each; file inputs; converting between.\nVite/React 19 project me use — teaching file.",
        "questions": [
          {
            "title": "Q1: Controlled text",
            "explain": "Kya karna hai:\nvalue={state} onChange setState.\n\nSeedha matlab:\nSource of truth React. Har keystroke re-render.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Controlled() {\n  const [name, setName] = useState(\"\");\n  return <input value={name} onChange={(e) => setName(e.target.value)} />;\n}"
          },
          {
            "title": "Q2: Uncontrolled text",
            "explain": "Kya karna hai:\ndefaultValue + ref; submit pe ref.current.value.\n\nSeedha matlab:\nSource of truth DOM. React sirf mount pe seed.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Uncontrolled() {\n  const ref = useRef(null);\n  function submit(e) {\n    e.preventDefault();\n    console.log(ref.current.value);\n  }\n  return (\n    <form onSubmit={submit}>\n      <input ref={ref} defaultValue=\"Ada\" />\n      <button type=\"submit\">Go</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q3: File input — usually uncontrolled",
            "explain": "Kya karna hai:\n<input type=\"file\" ref={fileRef} /> — value control limited.\n\nSeedha matlab:\nSecurity: path set nahi kar sakte. FileList ref/onChange se.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function FilePicker() {\n  const ref = useRef(null);\n  function onSubmit(e) {\n    e.preventDefault();\n    const file = ref.current.files?.[0];\n    console.log(file?.name);\n  }\n  return (\n    <form onSubmit={onSubmit}>\n      <input type=\"file\" ref={ref} />\n      <button type=\"submit\">Upload</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q4: Don't mix value and defaultValue",
            "explain": "Kya karna hai:\nEk input pe dono mat.\n\nSeedha matlab:\nReact warning. Pick one mode.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function MixedBad() {\n  // <input value={x} defaultValue=\"y\" /> // ❌\n  return null;\n}"
          },
          {
            "title": "Q5: [MID] Controlled checkbox vs uncontrolled",
            "explain": "Kya karna hai:\nchecked + onChange vs defaultChecked.\n\nSeedha matlab:\nSame dichotomy. Form libs often controlled.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Checks() {\n  const [on, setOn] = useState(false);\n  return (\n    <>\n      <input type=\"checkbox\" checked={on} onChange={(e) => setOn(e.target.checked)} />\n      <input type=\"checkbox\" defaultChecked />\n    </>\n  );\n}"
          },
          {
            "title": "Q6: When controlled shines",
            "explain": "Kya karna hai:\nInstant search filter, char counter, sibling sync fields.\n\nSeedha matlab:\nUI derived from every keystroke → controlled.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function CharCount() {\n  const [t, setT] = useState(\"\");\n  return (\n    <div>\n      <textarea value={t} onChange={(e) => setT(e.target.value)} />\n      <p>{t.length}/200</p>\n    </div>\n  );\n}"
          },
          {
            "title": "Q7: [MID] Hybrid: read uncontrolled into state on submit only",
            "explain": "Kya karna hai:\nForm uncontrolled during typing; submit pe state/API.\n\nSeedha matlab:\nPerformance + simplicity middle ground.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Hybrid() {\n  const [submitted, setSubmitted] = useState(\"\");\n  const ref = useRef(null);\n  return (\n    <form\n      onSubmit={(e) => {\n        e.preventDefault();\n        setSubmitted(ref.current.value);\n      }}\n    >\n      <input ref={ref} defaultValue=\"\" />\n      <button type=\"submit\">Save</button>\n      <p>Last: {submitted}</p>\n    </form>\n  );\n}"
          },
          {
            "title": "Q8: Decision cheat sheet",
            "explain": "Kya karna hai:\nNeed live React logic? Controlled. One-shot / file? Uncontrolled OK.\n\nSeedha matlab:\nInterview closing line.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Cheat() {\n  return (\n    <p>\n      Live sync/validate → controlled. Simple/ref/file → uncontrolled.\n    </p>\n  );\n}"
          },
          {
            "title": "Q9: Controlled select — value + onChange",
            "explain": "Kya karna hai:\nselect value={city} onChange — option list state driven.\n\nSeedha matlab:\nDropdown bhi controlled — empty string placeholder option common.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function ControlledSelect() {\n  const [city, setCity] = useState(\"mumbai\");\n  return (\n    <select value={city} onChange={(e) => setCity(e.target.value)}>\n      <option value=\"mumbai\">Mumbai</option>\n      <option value=\"delhi\">Delhi</option>\n    </select>\n  );\n}"
          },
          {
            "title": "Q10: [MID] Uncontrolled radio group — ref ya FormData",
            "explain": "Kya karna hai:\nname same radios; submit pe FormData se value read.\n\nSeedha matlab:\nRadio group controlled bhi ho sakta; simple form me uncontrolled OK.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function RadioForm() {\n  function submit(e) {\n    e.preventDefault();\n    const fd = new FormData(e.target);\n    console.log(fd.get(\"plan\"));\n  }\n  return (\n    <form onSubmit={submit}>\n      <label>\n        <input type=\"radio\" name=\"plan\" value=\"free\" defaultChecked /> Free\n      </label>\n      <label>\n        <input type=\"radio\" name=\"plan\" value=\"pro\" /> Pro\n      </label>\n      <button type=\"submit\">Go</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q11: Controlled textarea — same as input",
            "explain": "Kya karna hai:\nvalue={text} onChange — multiline bhi React state.\n\nSeedha matlab:\ndefaultValue textarea pe bhi — pick one mode.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function ControlledTextarea() {\n  const [bio, setBio] = useState(\"\");\n  return (\n    <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={4} />\n  );\n}"
          },
          {
            "title": "Q12: [MID] React Hook Form — mostly uncontrolled register()",
            "explain": "Kya karna hai:\nregister(\"email\") ref-based; validation lib handle — kam re-renders.\n\nSeedha matlab:\nLib contrast: RHF uncontrolled default; Formik often controlled state heavy.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function RHFNote() {\n  return (\n    <p>\n      React Hook Form: register ref se — controlled jahan zaroor (watch fields).\n      Performance win uncontrolled pe.\n    </p>\n  );\n}"
          },
          {
            "title": "Q13: Formik contrast — controlled field state",
            "explain": "Kya karna hai:\nvalues + setFieldValue — har keystroke form state update.\n\nSeedha matlab:\nSimple forms OK; bade forms me re-render cost — RHF alternative.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function FormikNote() {\n  return <p>Formik: central values object — controlled feel, predictable validation.</p>;\n}"
          },
          {
            "title": "Q14: [MID] Controlled se uncontrolled switch — remount key",
            "explain": "Kya karna hai:\nmode change pe input key={mode} — DOM fresh, warning avoid.\n\nSeedha matlab:\nRuntime switch risky — remount se clean slate.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function ModeSwitch({ controlled }) {\n  const [v, setV] = useState(\"\");\n  const ref = useRef(null);\n  if (controlled) {\n    return (\n      <input key=\"c\" value={v} onChange={(e) => setV(e.target.value)} />\n    );\n  }\n  return <input key=\"u\" defaultValue=\"seed\" ref={ref} />;\n}"
          },
          {
            "title": "Q15: defaultValue sirf first mount pe",
            "explain": "Kya karna hai:\ndefaultValue change prop se update nahi — controlled use karo agar sync chahiye.\n\nSeedha matlab:\nParent se prop change → uncontrolled input stale rehta.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function DefaultValueOnce() {\n  return (\n    <p>\n      defaultValue ek baar set — baad me parent prop change DOM me reflect nahi.\n    </p>\n  );\n}"
          },
          {
            "title": "Q16: [MID] Multiple file inputs — refs array",
            "explain": "Kya karna hai:\nfiles[0], files[1] alag ref — multi upload uncontrolled natural.\n\nSeedha matlab:\nFile value controlled nahi ho sakta security se — ref/onChange FileList.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function MultiFile() {\n  const a = useRef(null);\n  const b = useRef(null);\n  function submit(e) {\n    e.preventDefault();\n    console.log(a.current.files[0], b.current.files[0]);\n  }\n  return (\n    <form onSubmit={submit}>\n      <input type=\"file\" ref={a} />\n      <input type=\"file\" ref={b} />\n      <button type=\"submit\">Upload</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q17: [ADV] readOnly vs disabled controlled",
            "explain": "Kya karna hai:\nreadOnly: value dikhe submit ho; disabled: form me skip often.\n\nSeedha matlab:\nUX + a11y — disabled fields grey; readOnly edit block display OK.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function ReadOnlyField() {\n  const [code] = useState(\"INV-001\");\n  return <input value={code} readOnly />;\n}"
          },
          {
            "title": "Q18: [ADV] Custom input — value + onChange contract",
            "explain": "Kya karna hai:\nMyInput { value, onChange } — parent controlled rakhe.\n\nSeedha matlab:\nNative jaisa API — form libs isi pattern pe built.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function MyInput({ value, onChange, label }) {\n  return (\n    <label>\n      {label}\n      <input value={value} onChange={(e) => onChange(e.target.value)} />\n    </label>\n  );\n}"
          },
          {
            "title": "Q19: [ADV] useImperativeHandle — uncontrolled reset",
            "explain": "Kya karna hai:\nref se .reset() expose — parent imperative clear.\n\nSeedha matlab:\nMostly declarative prefer; kabhi lib/integration ke liye imperative.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function ImperativeNote() {\n  return (\n    <p>\n      useImperativeHandle: child ref pe reset/focus expose — uncontrolled forms\n      me kabhi useful.\n    </p>\n  );\n}"
          },
          {
            "title": "Q20: [ADV] Autocomplete / combobox controlled pain",
            "explain": "Kya karna hai:\nTyping + selection + async options — controlled state complex.\n\nSeedha matlab:\nIsliye Downshift/Radix — ya lib use karo, khud har keystroke handle heavy.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function AutocompleteNote() {\n  return (\n    <p>\n      Combobox controlled: input value + highlighted index + selected item — lib\n      recommend.\n    </p>\n  );\n}"
          },
          {
            "title": "Q21: [ADV] Native form submit vs fully controlled",
            "explain": "Kya karna hai:\naction + FormData native; ya preventDefault + controlled state API.\n\nSeedha matlab:\nReact 19 Actions native form bhi — controlled mix carefully.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function NativeSubmitNote() {\n  return (\n    <p>\n      Native submit FormData (uncontrolled friendly) vs controlled gather state\n      manually — pick form size/complexity se.\n    </p>\n  );\n}"
          },
          {
            "title": "Q22: [ADV] Interview — controlled vs uncontrolled decision tree",
            "explain": "Kya karna hai:\nLive validate/sync → controlled. Performance/simple/file → uncontrolled. Mix mat.\n\nSeedha matlab:\nFile always special; libs contrast bolo — strong close.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function ControlledInterview() {\n  return (\n    <ol>\n      <li>Live UI from value? → controlled</li>\n      <li>One-shot submit / file? → uncontrolled + ref/FormData</li>\n      <li>value + defaultValue together? → ❌</li>\n      <li>RHF uncontrolled vs Formik controlled — tradeoff</li>\n    </ol>\n  );\n}"
          }
        ]
      },
      {
        "file": "26_ReconciliationAndKeys.jsx",
        "title": "26 — Reconciliation And Keys",
        "kya": "Reconciliation = React purane virtual tree ko naye se milata hai —",
        "detail": "26 — Reconciliation And Keys\nLevel: MID  |  Sequence: pehle yeh, phir agla number\n\nLAYMAN: Reconciliation = React purane virtual tree ko naye se milata hai —\nkaun same, kaun naya, kaun delete. Diff clever, perfect nahi.\nSame position + same type → update. Alag type → replace.\nkey batata list me \"yeh wahi item hai\" even if order badla.\n\nGalat keys = galat state reuse (input me dusra naam chipak). Index key\nreorder/delete pe classic bug. key change = remount intentional.\n\nKYUN: Deep \"React kaise sochta\" interview. Bugs samajh aate.\nINTERVIEW: diffing heuristic; keys role; remount via key.\nVite/React 19 project me use — teaching file.",
        "intro": "26 — Reconciliation And Keys\nLevel: MID  |  Sequence: pehle yeh, phir agla number\n\nLAYMAN: Reconciliation = React purane virtual tree ko naye se milata hai —\nkaun same, kaun naya, kaun delete. Diff clever, perfect nahi.\nSame position + same type → update. Alag type → replace.\nkey batata list me \"yeh wahi item hai\" even if order badla.\n\nGalat keys = galat state reuse (input me dusra naam chipak). Index key\nreorder/delete pe classic bug. key change = remount intentional.\n\nKYUN: Deep \"React kaise sochta\" interview. Bugs samajh aate.\nINTERVIEW: diffing heuristic; keys role; remount via key.\nVite/React 19 project me use — teaching file.",
        "questions": [
          {
            "title": "Q1: Type change remounts",
            "explain": "Kya karna hai:\nConditional <div> vs <span> same jagah — state reset.\n\nSeedha matlab:\nAlag type = React destroy + create. State fly hoti.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function TypeSwap() {\n  const [asDiv, setAsDiv] = useState(true);\n  return (\n    <div>\n      <button onClick={() => setAsDiv(!asDiv)}>Swap</button>\n      {asDiv ? <CounterWrap tag=\"div\" /> : <CounterWrap tag=\"span\" />}\n    </div>\n  );\n}\n\nfunction CounterWrap({ tag: Tag }) {\n  const [n, setN] = useState(0);\n  return (\n    <Tag>\n      <button onClick={() => setN(n + 1)}>{n}</button>\n    </Tag>\n  );\n}"
          },
          {
            "title": "Q2: Same type preserves state",
            "explain": "Kya karna hai:\nDono branches <div><Counter/></div> — counter zinda.\n\nSeedha matlab:\nHeuristic: type match → update props, keep instance.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function SameType({ mode }) {\n  return (\n    <div>\n      {mode === \"a\" ? <Counter label=\"A\" /> : <Counter label=\"B\" />}\n    </div>\n  );\n}\n\nfunction Counter({ label }) {\n  const [n, setN] = useState(0);\n  return (\n    <button onClick={() => setN(n + 1)}>\n      {label}:{n}\n    </button>\n  );\n}"
          },
          {
            "title": "Q3: Force remount with key",
            "explain": "Kya karna hai:\n<Counter key={userId} /> user change pe fresh state.\n\nSeedha matlab:\nkey identity. Change key = nayi component identity.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function UserCounter({ userId }) {\n  return <Counter key={userId} label={String(userId)} />;\n}"
          },
          {
            "title": "Q4: Index key reorder bug demo idea",
            "explain": "Kya karna hai:\nList inputs with key={index}; reverse list — values jump.\n\nSeedha matlab:\nReact position pe match. Item move ≠ state move with index keys.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function IndexBug() {\n  const [items, setItems] = useState([\"Ada\", \"Lin\"]);\n  return (\n    <div>\n      <button onClick={() => setItems([...items].reverse())}>Reverse</button>\n      {items.map((name, i) => (\n        <input key={i} defaultValue={name} />\n      ))}\n      {/* Fix: key={stableId} */}\n    </div>\n  );\n}"
          },
          {
            "title": "Q5: [MID] Stable id keys correct reorder",
            "explain": "Kya karna hai:\nkey={id}; reverse — each input apna value rakhe.\n\nSeedha matlab:\nReconciliation item track karti keys se.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function IdKeys() {\n  const [items, setItems] = useState([\n    { id: \"a\", name: \"Ada\" },\n    { id: \"b\", name: \"Lin\" },\n  ]);\n  return (\n    <div>\n      <button onClick={() => setItems([...items].reverse())}>Reverse</button>\n      {items.map((it) => (\n        <input key={it.id} defaultValue={it.name} />\n      ))}\n    </div>\n  );\n}"
          },
          {
            "title": "Q6: List insert middle",
            "explain": "Kya karna hai:\nKeys se React jaane kaun shift, kaun naya.\n\nSeedha matlab:\nBina keys warning + inefficient/wrong updates.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Insert() {\n  const [rows, setRows] = useState([{ id: 1, t: \"one\" }]);\n  function addFront() {\n    setRows([{ id: Date.now(), t: \"new\" }, ...rows]);\n  }\n  return (\n    <div>\n      <button onClick={addFront}>Add front</button>\n      <ul>\n        {rows.map((r) => (\n          <li key={r.id}>{r.t}</li>\n        ))}\n      </ul>\n    </div>\n  );\n}"
          },
          {
            "title": "Q7: [MID] Don't use array index when list is dynamic",
            "explain": "Kya karna hai:\nStatic docs list OK-ish; todos/filters → ids.\n\nSeedha matlab:\nRule of thumb interview me bolo.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Rule() {\n  return <p>Dynamic lists → stable unique keys, not index.</p>;\n}"
          },
          {
            "title": "Q8: Reconciliation is not deep magic optimize always",
            "explain": "Kya karna hai:\nReact enough smart; pehle structure + keys sahi.\n\nSeedha matlab:\nManual DOM diff mat socho. Declare UI for state.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Mindset() {\n  return <p>Describe UI for state; keys help React match list items.</p>;\n}"
          },
          {
            "title": "Q9: Fiber mental model — light version",
            "explain": "Kya karna hai:\nHar component = fiber node; work unit reconcile karta tree walk.\n\nSeedha matlab:\nDeep mat jao — bas: React tree traverse karke diff apply karta hai.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function FiberNote() {\n  return (\n    <p>\n      Fiber: reconcile unit. Same type update props; different type replace node.\n    </p>\n  );\n}"
          },
          {
            "title": "Q10: [MID] Same component — alag position pe move",
            "explain": "Kya karna hai:\nCounter pehle div me, baad span me — same type parent change? position matter.\n\nSeedha matlab:\nTree position + type decide reuse; sirf component name same kaafi nahi hamesha.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function MoveCounter({ onTop }) {\n  return onTop ? (\n    <div>\n      <Counter label=\"top\" />\n      <p>rest</p>\n    </div>\n  ) : (\n    <div>\n      <p>rest</p>\n      <Counter label=\"bottom\" />\n    </div>\n  );\n}"
          },
          {
            "title": "Q11: Fragment list me key — <> nahi, <Fragment key>",
            "explain": "Kya karna hai:\nmap me Fragment key={id} wrap — shorthand <> key nahi de sakta.\n\nSeedha matlab:\nGrouped siblings list me bhi stable key chahiye.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function FragmentList({ pairs }) {\n  return (\n    <ul>\n      {pairs.map(([id, a, b]) => (\n        <Fragment key={id}>\n          <li>{a}</li>\n          <li>{b}</li>\n        </Fragment>\n      ))}\n    </ul>\n  );\n}"
          },
          {
            "title": "Q12: [MID] key component pe vs DOM element pe",
            "explain": "Kya karna hai:\n<Row key={id} /> — Row instance track; inner DOM React manage.\n\nSeedha matlab:\nkey list direct child pe — wrapper component pe lagao, andar mat chhupao wrong.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function KeyOnComponent({ items }) {\n  return items.map((it) => <Counter key={it.id} label={it.name} />);\n}"
          },
          {
            "title": "Q13: Props update — remount nahi, re-render haan",
            "explain": "Kya karna hai:\nSame Counter, label prop change — state (n) preserve.\n\nSeedha matlab:\nReconciliation update = props patch; state tab tak jab tak type+key same.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function PropUpdateDemo() {\n  const [label, setLabel] = useState(\"A\");\n  return (\n    <div>\n      <button onClick={() => setLabel(label === \"A\" ? \"B\" : \"A\")}>Toggle label</button>\n      <Counter label={label} />\n    </div>\n  );\n}"
          },
          {
            "title": "Q14: [MID] Conditional same slot — key se force fresh",
            "explain": "Kya karna hai:\n{edit ? <Form key=\"edit\" /> : <Form key=\"view\" />} — mode switch reset.\n\nSeedha matlab:\nSame component type same jagah — bina key state bleed; key se intentional remount.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function EditViewSwitch({ editing }) {\n  return editing ? (\n    <Counter key=\"edit\" label=\"edit mode\" />\n  ) : (\n    <Counter key=\"view\" label=\"view mode\" />\n  );\n}"
          },
          {
            "title": "Q15: Children array — explicit keys",
            "explain": "Kya karna hai:\n[a, b, c] map ya array literal — har child stable key.\n\nSeedha matlab:\nDynamic children bina keys — warning + wrong reuse.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function ChildArray({ parts }) {\n  return (\n    <div>\n      {parts.map((p) => (\n        <span key={p.id}>{p.text}</span>\n      ))}\n    </div>\n  );\n}"
          },
          {
            "title": "Q16: [MID] key={undefined} / missing — index fallback nahi, warning",
            "explain": "Kya karna hai:\nList me key hamesha unique stable do — React warn karega missing pe.\n\nSeedha matlab:\nDev console check — keys discipline production bugs rokti.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function KeyWarningNote() {\n  return <p>Missing keys: dev warning, reconcile inefficient/wrong state reuse.</p>;\n}"
          },
          {
            "title": "Q17: [ADV] O(n) heuristic — same level siblings only",
            "explain": "Kya karna hai:\nReact cross-level move detect nahi perfect — structure stable rakho.\n\nSeedha matlab:\nInterview: diff linear same depth — isliye keys + stable structure matter.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function HeuristicNote() {\n  return (\n    <p>\n      Reconciliation O(n) same-level pass — deep tree me type/key galat = expensive\n      wrong updates.\n    </p>\n  );\n}"
          },
          {
            "title": "Q18: [ADV] memo bail-out — same props skip reconcile subtree?",
            "explain": "Kya karna hai:\nmemo child — props shallow same → React skip render attempt.\n\nSeedha matlab:\nReconciliation se alag — memo render phase shortcut; keys alag concept.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function MemoReconcileNote() {\n  return (\n    <p>\n      React.memo: props same ho to re-render skip — reconciliation se pehle bail-out.\n    </p>\n  );\n}"
          },
          {
            "title": "Q19: [ADV] Portal — reconcile logical tree, DOM alag",
            "explain": "Kya karna hai:\nPortal child parent ke saath reconcile; DOM body pe paint.\n\nSeedha matlab:\nFiber tree me parent link same — keys/rules yahan bhi apply.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function PortalReconcileNote() {\n  return <p>Portal: reconcile React tree me; DOM placement alag — keys normal kaam.</p>;\n}"
          },
          {
            "title": "Q20: [ADV] Suspense boundary — suspended subtree replace",
            "explain": "Kya karna hai:\nSuspend pe fallback dikhe; resume pe prior state often preserve.\n\nSeedha matlab:\nRemount vs resume Suspense specific — key change pe full remount.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function SuspenseKeyNote() {\n  return (\n    <p>\n      Suspense + key change = fresh subtree. Bina key suspend/resume state often\n      intact.\n    </p>\n  );\n}"
          },
          {
            "title": "Q21: [ADV] Identity vs position — interview story",
            "explain": "Kya karna hai:\nkey = identity; index = position guess — reorder pe index fail.\n\nSeedha matlab:\n\"React item track karta key se, position se nahi\" — one-liner.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function IdentityNote() {\n  return <p>Keys identify items across renders; index identifies slot — reorder pe farq.</p>;\n}"
          },
          {
            "title": "Q22: [ADV] Intentional remount — key patterns summary",
            "explain": "Kya karna hai:\nuserId change, form reset, mode switch — key={id} remount toolbox.\n\nSeedha matlab:\nBug fix (stable id) vs feature (reset via key) — dono valid use cases.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function KeyInterview() {\n  return (\n    <ol>\n      <li>Same type + same key → update props, keep state</li>\n      <li>Different type → replace, state loss</li>\n      <li>Stable unique keys in dynamic lists</li>\n      <li>Index keys bad on reorder/delete</li>\n      <li>key change = intentional remount / reset</li>\n    </ol>\n  );\n}"
          }
        ]
      },
      {
        "file": "27_StrictModeAndEffects.jsx",
        "title": "27 — Strict Mode And Effects",
        "kya": "StrictMode = development teacher jo double-check karta. DEV me",
        "detail": "27 — StrictMode And Effects\nLevel: MID  |  Sequence: pehle yeh, phir agla number\n\nLAYMAN: StrictMode = development teacher jo double-check karta. DEV me\neffects mount → cleanup → dubara mount — yeh dekhne ke liye tumhara cleanup\nsahi hai (warna prod me leak/bug chhup jaye).\n\n<React.StrictMode> wrap App. Production me double invoke nahi.\n\"Mera useEffect 2 baar kyun?\" → often StrictMode, bug nahi (agar cleanup OK).\n\nKYUN: Fragile effects jaldi pakadna. Interview me double-mount explain.\nINTERVIEW: why effects run twice in dev; idempotent setup/cleanup.\nVite/React 19 project me use — teaching file.",
        "intro": "27 — StrictMode And Effects\nLevel: MID  |  Sequence: pehle yeh, phir agla number\n\nLAYMAN: StrictMode = development teacher jo double-check karta. DEV me\neffects mount → cleanup → dubara mount — yeh dekhne ke liye tumhara cleanup\nsahi hai (warna prod me leak/bug chhup jaye).\n\n<React.StrictMode> wrap App. Production me double invoke nahi.\n\"Mera useEffect 2 baar kyun?\" → often StrictMode, bug nahi (agar cleanup OK).\n\nKYUN: Fragile effects jaldi pakadna. Interview me double-mount explain.\nINTERVIEW: why effects run twice in dev; idempotent setup/cleanup.\nVite/React 19 project me use — teaching file.",
        "questions": [
          {
            "title": "Q1: Wrap app in StrictMode",
            "explain": "Kya karna hai:\nmain.jsx me <StrictMode><App/></StrictMode>\n\nSeedha matlab:\nExtra checks sirf DEV. Prod bundle behavior normal.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Root() {\n  return (\n    <StrictMode>\n      <App />\n    </StrictMode>\n  );\n}\n\nfunction App() {\n  return <p>App</p>;\n}"
          },
          {
            "title": "Q2: Effect double-invoke demo mindset",
            "explain": "Kya karna hai:\nconsole.log mount/cleanup — DEV me mount, cleanup, mount.\n\nSeedha matlab:\nReact jaan-bujh ke. Cleanup likho jaise prod me bhi unmount ho.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Probe() {\n  useEffect(() => {\n    console.log(\"mount/setup\");\n    return () => console.log(\"cleanup\");\n  }, []);\n  return <p>Check console in DEV</p>;\n}"
          },
          {
            "title": "Q3: Subscription must cleanup",
            "explain": "Kya karna hai:\naddEventListener + remove in cleanup — double safe.\n\nSeedha matlab:\nBina remove StrictMode me 2 listeners chipak sakte feel.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Width() {\n  const [w, setW] = useState(window.innerWidth);\n  useEffect(() => {\n    const fn = () => setW(window.innerWidth);\n    window.addEventListener(\"resize\", fn);\n    return () => window.removeEventListener(\"resize\", fn);\n  }, []);\n  return <p>{w}</p>;\n}"
          },
          {
            "title": "Q4: Fetch with cancel / ignore flag",
            "explain": "Kya karna hai:\nDouble fetch DEV me OK; aborted/cancelled pe setState mat.\n\nSeedha matlab:\nStrictMode 2 requests fire kar sakta — design resilient.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function User({ id }) {\n  const [user, setUser] = useState(null);\n  useEffect(() => {\n    let ignore = false;\n    fetch(`/api/users/${id}`)\n      .then((r) => r.json())\n      .then((data) => {\n        if (!ignore) setUser(data);\n      });\n    return () => {\n      ignore = true;\n    };\n  }, [id]);\n  return <pre>{JSON.stringify(user)}</pre>;\n}"
          },
          {
            "title": "Q5: [MID] Don't \"fix\" by removing StrictMode",
            "explain": "Kya karna hai:\nDouble call se irritate → Mode hataana galat fix.\n\nSeedha matlab:\nCleanup/idempotent banao. Mode friend hai.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Note() {\n  return <p>Fix effects, don't delete StrictMode.</p>;\n}"
          },
          {
            "title": "Q6: Idempotent setup",
            "explain": "Kya karna hai:\nSetup do baar chale to bhi sahi state (connect once via ref guard if needed).\n\nSeedha matlab:\nExternal systems: connect/disconnect pair clear.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function FakeSocket() {\n  useEffect(() => {\n    const socket = { open: true };\n    console.log(\"connect\");\n    return () => {\n      socket.open = false;\n      console.log(\"disconnect\");\n    };\n  }, []);\n  return <p>socket</p>;\n}"
          },
          {
            "title": "Q7: [MID] setState in effect + StrictMode",
            "explain": "Kya karna hai:\nExtra setup/cleanup/setup — state end me consistent hona chahiye.\n\nSeedha matlab:\nRace flags. Final UI ek hi sahi data.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Consistent() {\n  const [n, setN] = useState(0);\n  useEffect(() => {\n    setN(1);\n  }, []);\n  return <p>{n}</p>;\n}"
          },
          {
            "title": "Q8: What StrictMode also checks (concept)",
            "explain": "Kya karna hai:\nDeprecated APIs, unsafe side effects in render — warnings.\n\nSeedha matlab:\nSirf effects double nahi — broader DEV safety net.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Concept() {\n  return (\n    <ul>\n      <li>DEV-only double invoke effects</li>\n      <li>Warn on legacy patterns</li>\n      <li>Prod: no double mount tax</li>\n    </ul>\n  );\n}"
          },
          {
            "title": "Q9: Production — double invoke nahi hota",
            "explain": "Kya karna hai:\nStrictMode DEV-only behavior; prod build me effect ek baar normal.\n\nSeedha matlab:\n\"Prod me 2 baar\" report = bug likely real, StrictMode nahi.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function ProdNote() {\n  return (\n    <p>\n      StrictMode double mount/cleanup sirf development. Production = single\n      mount cycle.\n    </p>\n  );\n}"
          },
          {
            "title": "Q10: [MID] Impure render detect — StrictMode extra render",
            "explain": "Kya karna hai:\nRender me Math.random() / Date.now() — DEV me inconsistent UI dikhega.\n\nSeedha matlab:\nRender pure hona chahiye — StrictMode impure patterns expose karta.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function ImpureRenderBad() {\n  // const id = Math.random(); // ❌ impure render\n  const id = useRef(Math.random()).current; // ✅ stable via ref\n  return <p>{id}</p>;\n}"
          },
          {
            "title": "Q11: Legacy StrictMode — findDOMNode etc warnings",
            "explain": "Kya karna hai:\nPurane APIs pe warn — migrate to refs.\n\nSeedha matlab:\nStrictMode sirf effects double nahi — unsafe APIs bhi flag.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function LegacyNote() {\n  return <p>Legacy StrictMode: deprecated lifecycle/API warnings extra.</p>;\n}"
          },
          {
            "title": "Q12: [MID] Refs double mount pe persist nahi — fresh instance",
            "explain": "Kya karna hai:\nuseRef initial value dubara mount pe reset — state bhi fresh.\n\nSeedha matlab:\nDouble invoke = full unmount/remount sim — ref/state dono reset DEV cycle me.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function RefResetDemo() {\n  const ref = useRef({ count: 0 });\n  ref.current.count += 1;\n  return <p>Ref ticks this mount: {ref.current.count}</p>;\n}"
          },
          {
            "title": "Q13: setInterval / setTimeout — cleanup mandatory",
            "explain": "Kya karna hai:\nclearInterval/clearTimeout cleanup me — double mount pe duplicate timer na bane.\n\nSeedha matlab:\nBina cleanup 2 timers DEV me — prod unmount pe leak.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function TimerDemo() {\n  const [n, setN] = useState(0);\n  useEffect(() => {\n    const id = setInterval(() => setN((x) => x + 1), 1000);\n    return () => clearInterval(id);\n  }, []);\n  return <p>{n}</p>;\n}"
          },
          {
            "title": "Q14: [MID] Analytics — double fire guard ref se",
            "explain": "Kya karna hai:\ntrackPageView — StrictMode double mount pe duplicate event na bhejo (idempotent).\n\nSeedha matlab:\nExternal side effect dedupe ya accept DEV double — prod single.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function AnalyticsPage() {\n  const sent = useRef(false);\n  useEffect(() => {\n    if (sent.current) return;\n    sent.current = true;\n    console.log(\"page_view\");\n  }, []);\n  return <p>Page</p>;\n}"
          },
          {
            "title": "Q15: useLayoutEffect bhi DEV double pattern",
            "explain": "Kya karna hai:\nLayout effect me DOM measure — cleanup symmetric rakho.\n\nSeedha matlab:\nuseEffect vs useLayoutEffect dono StrictMode simulate — cleanup pair zaroori.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function LayoutProbe() {\n  useLayoutEffect(() => {\n    console.log(\"layout measure\");\n    return () => console.log(\"layout cleanup\");\n  }, []);\n  return <p>Layout</p>;\n}"
          },
          {
            "title": "Q16: [MID] Global singleton — module level side effect danger",
            "explain": "Kya karna hai:\nlet socket = connect() module top pe — double import/init issues.\n\nSeedha matlab:\nSide effects effect me + cleanup; module scope global state careful.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function SingletonNote() {\n  return (\n    <p>\n      Module-level singleton + StrictMode remount = surprising double init — effect\n      encapsulation prefer.\n    </p>\n  );\n}"
          },
          {
            "title": "Q17: [ADV] React 19 StrictMode — concurrent features alignment",
            "explain": "Kya karna hai:\nStricter checks continue; Actions/use patterns ke saath same cleanup rules.\n\nSeedha matlab:\nVersion upgrade pe StrictMode hataana fix nahi — effects idempotent rakho.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function React19StrictNote() {\n  return <p>React 19: StrictMode still DEV teacher — new APIs same cleanup discipline.</p>;\n}"
          },
          {
            "title": "Q18: [ADV] findDOMNode / string refs — warnings",
            "explain": "Kya karna hai:\nuseRef DOM node pe migrate — StrictMode warn karega legacy pe.\n\nSeedha matlab:\nModern code me issue kam; interview me legacy mention suno.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function FindDOMNote() {\n  return <p>findDOMNode deprecated — StrictMode DEV warnings push refs migration.</p>;\n}"
          },
          {
            "title": "Q19: [ADV] useInsertionEffect — CSS-in-JS StrictMode safe",
            "explain": "Kya karna hai:\nStyles inject before layout — cleanup styles remove.\n\nSeedha matlab:\nLibrary authors ke liye; same mount/cleanup/mount DEV cycle apply.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function InsertionNote() {\n  return <p>useInsertionEffect: inject/cleanup styles — StrictMode double safe pattern.</p>;\n}"
          },
          {
            "title": "Q20: [ADV] Testing — StrictMode wrapper tests me",
            "explain": "Kya karna hai:\nrender(&lt;StrictMode&gt;&lt;App/&gt;&lt;/StrictMode&gt;) — cleanup bugs pakdo tests me.\n\nSeedha matlab:\nTest utils StrictMode optional — integration tests me helpful.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function TestStrictNote() {\n  return <p>Tests me StrictMode wrap karke double-invoke cleanup verify kar sakte ho.</p>;\n}"
          },
          {
            "title": "Q21: [ADV] AbortController + StrictMode fetch",
            "explain": "Kya karna hai:\nMount cleanup abort — double fetch fire ho sakta DEV; ek response win.\n\nSeedha matlab:\nignore flag ya abort — duplicate setState race na ho.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function StrictFetch({ id }) {\n  const [data, setData] = useState(null);\n  useEffect(() => {\n    const ac = new AbortController();\n    fetch(`/api/${id}`, { signal: ac.signal })\n      .then((r) => r.json())\n      .then(setData)\n      .catch((e) => {\n        if (e.name !== \"AbortError\") console.error(e);\n      });\n    return () => ac.abort();\n  }, [id]);\n  return <pre>{JSON.stringify(data)}</pre>;\n}"
          },
          {
            "title": "Q22: [ADV] Interview — junior ko double effect explain",
            "explain": "Kya karna hai:\nDEV rehearsal for cleanup; prod single; fix effect not remove StrictMode.\n\nSeedha matlab:\n30 sec answer: kyun, kya expect, kaise fix — interview gold.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function StrictInterview() {\n  return (\n    <ol>\n      <li>StrictMode = DEV-only extra checks</li>\n      <li>Effects: mount → cleanup → mount simulate</li>\n      <li>Cleanup sahi ho to final state OK</li>\n      <li>Prod me double tax nahi</li>\n      <li>StrictMode hataana = symptom hide, fix nahi</li>\n    </ol>\n  );\n}"
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
        "kya": "React 18 = Concurrent features + Suspense mature hua.",
        "detail": "28 — React 19 Overview (Dec 2024+)\nLevel: REACT19  |  Sequence seekho: pehle yeh file, phir agla number\n\nLAYMAN: React 18 = Concurrent features + Suspense mature hua.\nReact 19 = \"form + async + less boilerplate\" ka major release (Dec 2024).\nSocho: pehle submit pe manually loading state, error, disable button —\nab Actions + useActionState / useFormStatus se yeh pattern built-in.\n\nBadi picture:\n  1) Actions — async function jo form/event se chalaye; pending/error track easy\n  2) New hooks — useActionState, useFormStatus, useOptimistic, use()\n  3) ref ab normal prop (forwardRef mostly legacy)\n  4) Document metadata (<title>, <meta>) component tree se\n  5) Context as provider — <ThemeContext> seedha, .Provider optional\n  6) Server Components / Server Actions mental model (Next.js etc. me common)\n\nReact 19.2 extras (brief):\n  • useEffectEvent — effect ke andar \"latest props/state\" wala event helper;\n    deps silence karne ke liye ANDHA mat use karo (file 39).\n  • Activity — UI ko hide/show + state preserve style patterns (frameworks explore).",
        "intro": "28 — React 19 Overview (Dec 2024+)\nLevel: REACT19  |  Sequence seekho: pehle yeh file, phir agla number\n\nLAYMAN: React 18 = Concurrent features + Suspense mature hua.\nReact 19 = \"form + async + less boilerplate\" ka major release (Dec 2024).\nSocho: pehle submit pe manually loading state, error, disable button —\nab Actions + useActionState / useFormStatus se yeh pattern built-in.\n\nBadi picture:\n  1) Actions — async function jo form/event se chalaye; pending/error track easy\n  2) New hooks — useActionState, useFormStatus, useOptimistic, use()\n  3) ref ab normal prop (forwardRef mostly legacy)\n  4) Document metadata (<title>, <meta>) component tree se\n  5) Context as provider — <ThemeContext> seedha, .Provider optional\n  6) Server Components / Server Actions mental model (Next.js etc. me common)\n\nReact 19.2 extras (brief):\n  • useEffectEvent — effect ke andar \"latest props/state\" wala event helper;\n    deps silence karne ke liye ANDHA mat use karo (file 39).\n  • Activity — UI ko hide/show + state preserve style patterns (frameworks explore).",
        "questions": [
          {
            "title": "Q1: React 18 vs 19 — seedha farq",
            "explain": "Seedha matlab:\n18 ne concurrent + Suspense + automatic batching diya.\n19 ne forms/async UX + DX (developer experience) simplify kiya.\nTumhara mental model: \"UI update\" same; \"async form flow\" naya shortcut.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "// React 18 typical form flow (idea):\n//   onSubmit → e.preventDefault → setLoading(true) → await api → setError/setData → setLoading(false)\n// React 19 Action flow (idea):\n//   action={async (formData) => { ... }}  + hooks pending/error handle karte hain"
          },
          {
            "title": "Q2: [MID] Actions concept kya hai?",
            "explain": "Seedha matlab:\nAction = function jo \"user ne kuch submit/trigger kiya\" handle kare —\naksar async. Form ke action={fn} pe FormData milta hai.\nReact pending state samajh sakta hai (transitions / useActionState).\nYeh sirf form nahi — startTransition + async bhi Action-style soch.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "async function saveNameAction(formData) {\n  const name = formData.get(\"name\");\n  // await saveToServer(name)\n  return { ok: true, name };\n}\n\nexport function NameFormClassicAction() {\n  return (\n    <form action={saveNameAction}>\n      <input name=\"name\" placeholder=\"Your name\" />\n      <button type=\"submit\">Save</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q3: useTransition se Action-ish pending (18 style bridge)",
            "explain": "Seedha matlab:\nReact 19 se pehle bhi isPending + startTransition se async UX milta tha.\n19 me forms ke liye dedicated hooks zyada clean hain — lekin idea same:\n\"urgent UI\" vs \"transition UI\".",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function SaveWithTransition() {\n  const [isPending, startTransition] = useTransition();\n  const [msg, setMsg] = useState(\"\");\n\n  function handleSave() {\n    startTransition(async () => {\n      // await api.save()\n      setMsg(\"Saved!\");\n    });\n  }\n\n  return (\n    <button onClick={handleSave} disabled={isPending}>\n      {isPending ? \"Saving...\" : \"Save\"}\n      {msg}\n    </button>\n  );\n}"
          },
          {
            "title": "Q4: Migration notes — kya toot sakta hai?",
            "explain": "Seedha matlab:\n• PropTypes remove path / strictness — types ke liye TypeScript prefer.\n• Some deprecated APIs cleanup (check upgrade guide).\n• forwardRef ab zaroori nahi libraries update hone tak.\n• react-dom/client createRoot pehle se 18 me tha — wahi rakho.\n• Third-party libs jo purane React pe band hain — peerDeps check karo.\nPractical: pehle 18.3 pe deprecations fix, phir 19.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const migrationChecklist = [\n  \"Fix React 18.3 deprecation warnings first\",\n  \"Upgrade react + react-dom together\",\n  \"Test forms, Suspense, error boundaries\",\n  \"Check libraries for React 19 support\",\n  \"Adopt Actions gradually — old onSubmit still works\",\n];"
          },
          {
            "title": "Q5: [MID] Kyun Actions mid interview me poochte hain?",
            "explain": "Seedha matlab:\nInterviewer dekhna chahta hai: tum loading/error/optimistic UI\nmanually spaghetti to nahi bana rahe. React 19 = pattern ko pehchano.\n\"action vs onSubmit\" jawab: dono chal sakte; Action FormData + pending UX better fit.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function WhyActionsMatter() {\n  // Teaching-only: compare mental models\n  const oldWay = \"preventDefault + many useStates\";\n  const newWay = \"action + useActionState / useFormStatus\";\n  return <p>{oldWay} → {newWay}</p>;\n}"
          },
          {
            "title": "Q6: useActionState teaser (detail file 30)",
            "explain": "Seedha matlab:\nuseActionState(action, initialState) → [state, formAction, isPending]\nForm me formAction do; submit ke baad naya state milta hai.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "async function incrementAction(prev, formData) {\n  return prev + 1;\n}\n\nexport function CounterActionTeaser() {\n  const [count, formAction, isPending] = useActionState(incrementAction, 0);\n  return (\n    <form action={formAction}>\n      <p>Count: {count}</p>\n      <button disabled={isPending}>+1</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q7: Client vs Server Components (teaser — file 37)",
            "explain": "Seedha matlab:\nDefault RSC world me components SERVER pe render (zero bundle).\nInteractivity chahiye → 'use client'.\nReact 19 docs + Next App Router is mental model ko mainstream banata hai.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "// // Server Component (no 'use client') — fetch OK, no useState\n// // Client Component — 'use client' — hooks OK"
          },
          {
            "title": "Q8: [MID] React 19.2 — useEffectEvent & Activity (overview only)",
            "explain": "Seedha matlab:\nuseEffectEvent(fn) = effect ke andar latest values padhne wala event;\ndependency array se \"har render pe effect dubara\" avoid — LEKIN\n\"deps hata do quietly\" ka shortcut NAHI. File 39 me rules.\nActivity = offscreen/hidden UI patterns; framework/docs follow karo.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const react192Extras = {\n  useEffectEvent: \"stable event from effect; not a deps escape hatch\",\n  Activity: \"hide/show with preserved semantics — see React 19.2 notes\",\n};"
          },
          {
            "title": "Q9: Practice roadmap is folder me",
            "explain": "Seedha matlab:\n29 forms action → 30 useActionState → 31 useFormStatus → 32 optimistic\n→ 33 use() → 34 ref prop → 35 metadata → 36 context provider\n→ 37 RSC → 38 server actions → 39 compiler + EffectEvent → 40 interview dump",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export const react19StudyOrder = [\n  29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,\n];"
          },
          {
            "title": "Q10: [MID] use() hook teaser — promise + context (file 33)",
            "explain": "Kya karna hai:\nuse(promise) Suspense ke saath; use(context) conditional bhi chal sakta.\n\nSeedha matlab:\nReact 19 ka naya hook — useContext ka flexible cousin + Promise unwrap.\nNormal hooks rules use() ke liye exception; baaki hooks top-level hi.\nInterview trap: har render naya Promise mat banao — infinite suspend.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const useHookTeaser = {\n  promise: \"use(cachedPromise) inside Suspense boundary\",\n  context: \"use(ThemeContext) — conditionals allowed for use() only\",\n  react18: \"useContext only; no use(promise) built-in\",\n};"
          },
          {
            "title": "Q11: useOptimistic teaser (file 32)",
            "explain": "Kya karna hai:\nUI turant update dikhao; server confirm ke baad real state sync.\n\nSeedha matlab:\nWhatsApp message send feel — pehle list me dikhao, fail pe rollback.\nReact 18 me manually optimistic state + rollback likhna padta tha.\nKab NAHI: payment, irreversible delete, inventory-critical flows.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const optimisticTeaser =\n  \"useOptimistic(baseState, updateFn) — temporary overlay until real state catches up.\";"
          },
          {
            "title": "Q12: [MID] ref as prop — forwardRef legacy (file 34)",
            "explain": "Kya karna hai:\nReact 19 me ref normal prop; forwardRef mostly library compat ke liye.\n\nSeedha matlab:\nReact 18: function component pe ref ke liye forwardRef zaroori tha.\nReact 19: function Input({ ref }) { return <input ref={ref} /> }\nMigration: purani libs forwardRef use karti hain — dono chalte hain.\nCommon bug: ref accept kiya but child me attach nahi kiya → parent.current null.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const refPropNote = {\n  react18: \"forwardRef(function (props, ref) { ... })\",\n  react19: \"ref is a regular prop on function components\",\n};"
          },
          {
            "title": "Q13: Document metadata in tree (file 35)",
            "explain": "Kya karna hai:\nComponent ke andar <title>, <meta> likho — React head me hoist karta hai.\n\nSeedha matlab:\nReact 18 SPA: useEffect me document.title ya react-helmet.\nReact 19: declarative <title> in JSX — SSR/RSC friendly.\nTrap: do components alag title set karein → single page-level owner rakho.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function PageTitleDemo() {\n  return (\n    <>\n      <title>Dashboard — MyApp</title>\n      <meta name=\"description\" content=\"User dashboard\" />\n      <h1>Dashboard</h1>\n    </>\n  );\n}"
          },
          {
            "title": "Q14: [MID] Context as Provider syntax (file 36)",
            "explain": "Kya karna hai:\n<ThemeContext value=\"dark\"> — .Provider wrapper optional ab.\n\nSeedha matlab:\nReact 18: <ThemeContext.Provider value={...}>\nReact 19: <ThemeContext value={...}> — same read API (useContext / use).\nPerformance trap same: inline value={{}} har render naya reference.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const contextProviderNote =\n  \"<Context value> in 19; .Provider legacy-ok; watch value referential equality.\";"
          },
          {
            "title": "Q15: Server Components one-liner (file 37)",
            "explain": "Kya karna hai:\nDefault server render; interactivity ke liye 'use client' boundary.\n\nSeedha matlab:\nServer: async fetch, DB, secrets — zero client bundle for that code.\nClient: useState, onClick, browser APIs.\nVite-only CSR app me RSC nahi — framework (Next App Router) chahiye.\nWhen NOT: highly interactive UI, optimistic updates → client islands.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const rscOneLiner =\n  \"Server = data + static; Client = interactivity; 'use client' at file top.\";"
          },
          {
            "title": "Q16: [MID] Server Actions one-liner (file 38)",
            "explain": "Kya karna hai:\n'use server' function — client/form se trigger, server pe execute.\n\nSeedha matlab:\nForm action={serverAction} — progressive enhancement friendly.\nSecurity MUST: auth, validate, authorize — client FormData tamper ho sakta.\nvs API route: public HTTP / webhooks ke liye API route better.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const serverActionOneLiner =\n  \"Server Actions = RPC-ish mutations; always validate on server.\";"
          },
          {
            "title": "Q17: React Compiler overview (file 39)",
            "explain": "Kya karna hai:\nBuild-time auto-memoization — useMemo/useCallback kam manually.\n\nSeedha matlab:\nCompiler pure render assume karta hai — impure render (Math.random in render) break.\nReact 18: manual React.memo / useMemo everywhere when measured.\nReact 19+: compiler opt-in reduces NEED, not understanding of referential equality.\nWhen NOT to rely: compiler off, edge libs, intentional manual memo.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const compilerNote = {\n  does: \"auto-memoize safe derived values and components\",\n  doesNot: \"fix fetch-in-render, mutating props, bad architecture\",\n};"
          },
          {
            "title": "Q18: [MID] useFormStatus import trap (file 31)",
            "explain": "Kya karna hai:\nuseFormStatus react-dom se; form ke CHILD component me call karo.\n\nSeedha matlab:\nReact 18: isPending manually lift karna padta tha parent se button tak.\nReact 19: child me useFormStatus() — prop drilling band.\nCommon bug #1: form wale component me seedha call → pending false rehta.\nCommon bug #2: import from 'react' instead of 'react-dom'.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const formStatusTrap =\n  \"useFormStatus in child of <form>; import from react-dom.\";"
          },
          {
            "title": "Q19: Automatic batching — 18 vs 19 same story",
            "explain": "Kya karna hai:\nMultiple setState ek event me → ek re-render (18+ already).\n\nSeedha matlab:\nReact 18 ne automatic batching mature kiya (events, timeouts, promises).\nReact 19 is pe build karta — Actions/transitions alag layer hain.\nInterview: batching ≠ Actions; don't confuse the two.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const batchingNote =\n  \"18+ batches setState in events/async; 19 adds Actions layer on top.\";"
          },
          {
            "title": "Q20: [ADV] Strict Mode + Actions dev behavior",
            "explain": "Kya karna hai:\nDev me effects double-invoke — Actions idempotent rakho jahan possible.\n\nSeedha matlab:\nStrict Mode dev me setup/cleanup dubara — side effects pakadne ke liye.\nAction jo DB write kare bina guard ke → dev me double insert risk (rare path).\nProduction me double nahi. Server Actions me framework CSRF + idempotency socho.\nReact 18 vs 19: Strict Mode same philosophy; Actions naya surface area.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const strictActionsNote =\n  \"Write idempotent actions where possible; dev Strict Mode still doubles effects.\";"
          },
          {
            "title": "Q21: [MID] Kab React 19 features adopt NAHI karna?",
            "explain": "Kya karna hai:\nPurana stable app, libs React 19 support nahi, team RSC ready nahi.\n\nSeedha matlab:\nonSubmit + useState ab bhi valid — migration forced nahi.\nServer Actions bina Next/RSC framework ke conceptual hi rehte.\nCompiler opt-in — pehle measure, phir adopt.\nSmall SPA Vite: Actions client-side useful; RSC optional.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const whenNotAdopt = [\n  \"libs lack React 19 peerDeps\",\n  \"no framework RSC support needed\",\n  \"team not trained on Actions/security model\",\n  \"working forms — gradual migration OK\",\n];"
          },
          {
            "title": "Q22: [ADV] Interview rapid-fire — React 19 cheat sheet",
            "explain": "Kya karna hai:\nEk minute me bolo: Actions, hooks, ref, metadata, context, RSC, compiler.\n\nSeedha matlab:\nActions = async form/event handlers + pending UX.\nuseActionState = form state machine; useFormStatus = child pending UI.\nuseOptimistic = instant UI + rollback; use() = promise/context flexible read.\nref prop; <title> in tree; <Context value>; RSC + Server Actions; Compiler + EffectEvent.\nMigration: 18.3 deprecations fix → upgrade together → test forms/Suspense.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export const react19InterviewCheatSheet = {\n  actions: \"async fn on form/event; FormData; pending hooks\",\n  useActionState: \"[state, formAction, isPending]\",\n  useFormStatus: \"react-dom; child of form only\",\n  useOptimistic: \"temporary UI until real state syncs\",\n  useHook: \"promise (Suspense) + context (conditional OK)\",\n  refAsProp: \"forwardRef mostly legacy in 19\",\n  metadata: \"<title>/<meta> in component tree\",\n  contextProvider: \"<Context value> replaces .Provider\",\n  rsc: \"server default; use client for hooks/events\",\n  serverActions: \"use server; validate auth on server\",\n  compiler: \"auto-memo; still follow Rules of React\",\n  effectEvent: \"latest values in effect events — not deps escape\",\n};"
          }
        ]
      },
      {
        "file": "29_React19_FormActions.jsx",
        "title": "29 — Form Actions",
        "kya": "HTML form me action=\"/url\" hota tha — browser POST karta tha.",
        "detail": "29 — React 19 Form Actions (action={fn}, formAction)\nLevel: REACT19  |  Sequence seekho: pehle yeh file, phir agla number\n\nLAYMAN: HTML form me action=\"/url\" hota tha — browser POST karta tha.\nReact 19 me action={javascriptFunction} de sakte ho.\nSubmit pe React function ko FormData deta hai (input name=... fields).\n\nSocho restaurant order slip: har field ka naam + value slip pe;\nwaiter (action) slip le ke kitchen (server/API) bhejta hai.\n\nformAction = button/input pe alag action — ek form, multiple buttons,\nalag-alag kaam (Save vs Delete).\n\nKYUN: Mid React interviews + Next.js forms ka base.\nINTERVIEW: FormData kaise nikalte; progressive enhancement idea; formAction.",
        "intro": "29 — React 19 Form Actions (action={fn}, formAction)\nLevel: REACT19  |  Sequence seekho: pehle yeh file, phir agla number\n\nLAYMAN: HTML form me action=\"/url\" hota tha — browser POST karta tha.\nReact 19 me action={javascriptFunction} de sakte ho.\nSubmit pe React function ko FormData deta hai (input name=... fields).\n\nSocho restaurant order slip: har field ka naam + value slip pe;\nwaiter (action) slip le ke kitchen (server/API) bhejta hai.\n\nformAction = button/input pe alag action — ek form, multiple buttons,\nalag-alag kaam (Save vs Delete).\n\nKYUN: Mid React interviews + Next.js forms ka base.\nINTERVIEW: FormData kaise nikalte; progressive enhancement idea; formAction.",
        "questions": [
          {
            "title": "Q1: Sabse simple — <form action={fn}>",
            "explain": "Seedha matlab:\nfn async ho sakti hai. Argument = FormData.\nformData.get('email') se field lo (name attribute zaroori).\npreventDefault manually zaroori nahi Action path me.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "async function subscribeAction(formData) {\n  const email = formData.get(\"email\");\n  console.log(\"subscribe:\", email);\n  // await fetch('/api/subscribe', { method: 'POST', body: formData })\n}\n\nexport function SubscribeForm() {\n  return (\n    <form action={subscribeAction}>\n      <input name=\"email\" type=\"email\" required placeholder=\"you@mail.com\" />\n      <button type=\"submit\">Subscribe</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q2: [MID] FormData — name attribute bhoolna #1 bug",
            "explain": "Seedha matlab:\nBina name= ke field FormData me NAHI aati.\nControlled value={state} alag topic; Action + FormData = uncontrolled-ish fields.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "async function debugFormData(formData) {\n  // Saari entries dekhna (teaching)\n  for (const [key, value] of formData.entries()) {\n    console.log(key, value);\n  }\n}\n\nexport function DebugFieldsForm() {\n  return (\n    <form action={debugFormData}>\n      <input name=\"title\" defaultValue=\"Hello\" />\n      {/* name missing → FormData me nahi */}\n      <input defaultValue=\"ghost\" />\n      <button type=\"submit\">Dump</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q3: Multiple buttons — formAction",
            "explain": "Seedha matlab:\nform pe common action; kisi button pe formAction={otherFn}.\nJo button dabao, uska action chalta hai.\nIntent (save vs delete) alag functions me clean rehta hai.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "async function saveDraft(formData) {\n  console.log(\"save\", formData.get(\"body\"));\n}\n\nasync function publishPost(formData) {\n  console.log(\"publish\", formData.get(\"body\"));\n}\n\nexport function PostFormTwoActions() {\n  return (\n    <form action={saveDraft}>\n      <textarea name=\"body\" defaultValue=\"Draft text\" />\n      <button type=\"submit\">Save draft</button>\n      <button type=\"submit\" formAction={publishPost}>\n        Publish\n      </button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q4: Action ke andar validation + return value idea",
            "explain": "Seedha matlab:\nAction kuch return kar sakti hai — useActionState usse state banaata hai (file 30).\nYahan simple: early return / throw. Error boundaries / hooks baad me.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "async function loginAction(formData) {\n  const user = String(formData.get(\"user\") || \"\");\n  const pass = String(formData.get(\"pass\") || \"\");\n  if (!user || !pass) {\n    return { ok: false, error: \"Empty fields\" };\n  }\n  // await api.login(...)\n  return { ok: true, error: null };\n}\n\nexport function LoginFormActionOnly() {\n  return (\n    <form action={loginAction}>\n      <input name=\"user\" />\n      <input name=\"pass\" type=\"password\" />\n      <button type=\"submit\">Login</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q5: [MID] Purana onSubmit vs naya action — kab kya?",
            "explain": "Seedha matlab:\nonSubmit ab bhi valid — complex client validation, multi-step wizards.\naction = server/FormData-first flows, pending UX with React 19 hooks.\nDono mix mat karo blindly; team convention follow.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function OldStyleStillWorks() {\n  const [status, setStatus] = useState(\"idle\");\n\n  async function onSubmit(e) {\n    e.preventDefault();\n    const data = new FormData(e.currentTarget);\n    setStatus(\"saving\");\n    // await api(data)\n    setStatus(\"done\");\n    console.log([...data.entries()], status);\n  }\n\n  return (\n    <form onSubmit={onSubmit}>\n      <input name=\"note\" />\n      <button type=\"submit\">Save (legacy style)</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q6: Reset / defaultValue after submit",
            "explain": "Seedha matlab:\nUncontrolled inputs defaultValue pe start hote.\nSuccessful Action ke baad form reset chahiye to key change ya\nuseActionState se controlled reset pattern (file 30).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function FormWithKeyReset({ version }) {\n  return (\n    <form key={version} action={subscribeAction}>\n      <input name=\"email\" />\n      <button type=\"submit\">Go</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q7: file input + FormData",
            "explain": "Seedha matlab:\n<input type=\"file\" name=\"avatar\" /> → formData.get('avatar') File object.\nMultipart upload Action me natural fit.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "async function uploadAvatar(formData) {\n  const file = formData.get(\"avatar\");\n  if (file && file instanceof File) {\n    console.log(file.name, file.size);\n  }\n}\n\nexport function AvatarUploadForm() {\n  return (\n    <form action={uploadAvatar}>\n      <input type=\"file\" name=\"avatar\" accept=\"image/*\" />\n      <button type=\"submit\">Upload</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q8: [MID] Progressive enhancement (mental model)",
            "explain": "Seedha matlab:\nIdeal: JS se pehle bhi form kaam kare (server action / native action URL).\nSPA-only apps me aksar JS required — phir bhi FormData mindset rakho.\nNext.js Server Actions is story ko strong banate hain (file 38).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const progressiveIdea = {\n  withoutJS: \"browser posts to URL / server action endpoint\",\n  withJS: \"React enhances — pending UI, no full reload\",\n};"
          },
          {
            "title": "Q9: [MID] action + onSubmit dono ek form pe — trap",
            "explain": "Kya karna hai:\nEk form pe action={fn} aur onSubmit={fn} mat mix karo blindly.\n\nSeedha matlab:\nDono fire ho sakte — double submit / confusing flow.\nReact 18 style onSubmit YA React 19 action — pick one pattern per form.\nControlled live validation: onChange local; submit ke liye action enough.\nCommon bug: preventDefault onSubmit me + action bhi → race.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function PickOnePatternForm() {\n  async function saveAction(formData) {\n    console.log(\"action path\", formData.get(\"note\"));\n  }\n  return (\n    <form action={saveAction}>\n      <input name=\"note\" defaultValue=\"via action only\" />\n      <button type=\"submit\">Save</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q10: Checkbox / radio FormData",
            "explain": "Kya karna hai:\nname same + value alag radios; checkbox checked hone pe hi aata.\n\nSeedha matlab:\nformData.get('color') — selected radio value.\nCheckbox: formData.get('agree') === 'on' ya null.\nReact 18: manually read e.target.checked; Action path FormData natural.\nEdge: unchecked checkbox FormData me missing — server pe default false socho.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "async function prefsAction(formData) {\n  const color = formData.get(\"color\");\n  const agree = formData.get(\"agree\") === \"on\";\n  return { color, agree };\n}\n\nexport function PrefsForm() {\n  return (\n    <form action={prefsAction}>\n      <label>\n        <input type=\"radio\" name=\"color\" value=\"red\" defaultChecked /> Red\n      </label>\n      <label>\n        <input type=\"radio\" name=\"color\" value=\"blue\" /> Blue\n      </label>\n      <label>\n        <input type=\"checkbox\" name=\"agree\" /> I agree\n      </label>\n      <button type=\"submit\">Save prefs</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q11: [MID] Select + textarea FormData",
            "explain": "Kya karna hai:\nname attribute select/textarea pe; formData.get('field').\n\nSeedha matlab:\nControlled select React 18 me value={state} common tha.\nAction path: defaultValue + name — uncontrolled FormData submit.\nMulti-select: formData.getAll('tags') array values.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "async function noteAction(formData) {\n  const category = formData.get(\"category\");\n  const body = formData.get(\"body\");\n  const tags = formData.getAll(\"tags\");\n  return { category, body, tags };\n}\n\nexport function NoteForm() {\n  return (\n    <form action={noteAction}>\n      <select name=\"category\" defaultValue=\"work\">\n        <option value=\"work\">Work</option>\n        <option value=\"personal\">Personal</option>\n      </select>\n      <textarea name=\"body\" defaultValue=\"Hello\" />\n      <button type=\"submit\">Save note</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q12: Hidden fields + intent pattern",
            "explain": "Kya karna hai:\ntype=\"hidden\" name=\"id\" value={id} — action ko context do bina UI ke.\n\nSeedha matlab:\nDelete/edit buttons: hidden id + formAction ya intent field.\nReact 18: onClick me id closure; Action: hidden field safer (FormData serializable).\nSecurity: hidden id trust mat karo server pe — auth + ownership verify.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "async function deleteItemAction(formData) {\n  const id = formData.get(\"id\");\n  console.log(\"delete\", id);\n}\n\nexport function DeleteItemForm({ itemId }) {\n  return (\n    <form action={deleteItemAction}>\n      <input type=\"hidden\" name=\"id\" value={itemId} />\n      <button type=\"submit\">Delete</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q13: [MID] Controlled input + Action — mix carefully",
            "explain": "Kya karna hai:\nvalue={state} controlled ho to FormData me wahi value aati — name + onChange sync.\n\nSeedha matlab:\nPure Action/uncontrolled: defaultValue + name, no value prop.\nControlled + Action: possible but onChange se state update; submit pe FormData current DOM value.\nTrap: value={state} without onChange → stale FormData on submit.\nReact 18 controlled forms: onSubmit + state; 19: mix only when team convention clear.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function ControlledActionMix() {\n  const [title, setTitle] = useState(\"\");\n  async function save(formData) {\n    console.log(\"submitted\", formData.get(\"title\"));\n  }\n  return (\n    <form action={save}>\n      <input\n        name=\"title\"\n        value={title}\n        onChange={(e) => setTitle(e.target.value)}\n      />\n      <button type=\"submit\">Save</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q14: formAction on input type=\"submit\" image buttons",
            "explain": "Kya karna hai:\nMultiple submit buttons — har ek ka formAction alag ho sakta hai.\n\nSeedha matlab:\nHTML pattern purana hai; React 19 me first-class.\nname/value submit button se bhi FormData me aate (intent detection).\nReact 18: ek handler me e.nativeEvent.submitter check karte the.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "async function archiveAction(formData) {\n  console.log(\"archive\", formData.get(\"title\"));\n}\n\nexport function DualSubmitForm() {\n  return (\n    <form action={saveDraft}>\n      <input name=\"title\" defaultValue=\"Post\" />\n      <button type=\"submit\">Save draft</button>\n      <button type=\"submit\" formAction={archiveAction}>\n        Archive\n      </button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q15: [MID] Action throw vs return error",
            "explain": "Kya karna hai:\nthrow → error boundary / framework error UI; return { error } → useActionState friendly.\n\nSeedha matlab:\nTeam me ek pattern choose karo — mixed throw/return confusing UX.\nReact 18 onSubmit: try/catch + setError manual.\nReact 19: return { ok: false, error: '...' } with useActionState clean.\nServer Actions: prefer return error object for form validation messages.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "async function riskyAction(formData) {\n  const x = formData.get(\"x\");\n  if (!x) return { ok: false, error: \"Missing x\" };\n  return { ok: true, error: null };\n}\n\nexport function ErrorReturnForm() {\n  return (\n    <form action={riskyAction}>\n      <input name=\"x\" />\n      <button type=\"submit\">Go</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q16: form encType multipart — file uploads",
            "explain": "Kya karna hai:\nFile input ke saath FormData naturally multipart; fetch me body: formData.\n\nSeedha matlab:\nencType default browser handle karta file ke saath.\nReact 18: FormData manually from onSubmit; same data Action me auto.\nEdge: empty file input — empty File ya skip; server validate size/type.\nWhen NOT Action: chunked/resumable upload custom protocol → dedicated API.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "async function uploadDocsAction(formData) {\n  const doc = formData.get(\"doc\");\n  if (doc instanceof File && doc.size > 0) {\n    console.log(\"upload\", doc.name, doc.size);\n  }\n}\n\nexport function DocUploadForm() {\n  return (\n    <form action={uploadDocsAction}>\n      <input type=\"file\" name=\"doc\" accept=\".pdf\" />\n      <button type=\"submit\">Upload</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q17: [MID] Action outside form — startTransition pattern",
            "explain": "Kya karna hai:\nForm ke bina bhi async \"action\" mental model — button onClick + transition.\n\nSeedha matlab:\nActions sirf <form> tak limited nahi — any async user intent.\nReact 18: startTransition(async () => ...) bridge.\nReact 19: useActionState bhi non-form triggers ke saath use ho sakta (advanced).\nInterview: \"Action = async function handling user submission/intent\".",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function NonFormActionIdea() {\n  return (\n    <p>\n      Forms use action=; buttons can use useActionState wrapper or startTransition\n      for same pending UX without form element.\n    </p>\n  );\n}"
          },
          {
            "title": "Q18: disabled submit while pending — without useActionState",
            "explain": "Kya karna hai:\nSirf action={fn} without hook — pending UI manually ya useFormStatus child.\n\nSeedha matlab:\nReact 18: useState loading around submit.\nReact 19 minimal: child SubmitButton with useFormStatus (file 31).\nTrap: action slow hai par button enabled — double submit risk.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function PendingViaChild() {\n  return (\n    <form action={saveDraft}>\n      <input name=\"body\" />\n      <SubmitHint />\n    </form>\n  );\n}\n\nfunction SubmitHint() {\n  // teaching: useFormStatus would go here (file 31)\n  return <button type=\"submit\">Save</button>;\n}"
          },
          {
            "title": "Q19: [ADV] formData.get vs getAll vs has",
            "explain": "Kya karna hai:\nget = first value; getAll = saari values; has = key exists?\n\nSeedha matlab:\nMulti-checkbox same name → getAll.\nMissing field → get returns null — String() wrap karo validation me.\nReact 18 FormData same API — Action path me yeh standard skill.\nCommon bug: get('items') jab array chahiye → getAll use karo.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "async function cartFormAction(formData) {\n  const hasCoupon = formData.has(\"coupon\");\n  const items = formData.getAll(\"itemId\");\n  return { hasCoupon, items };\n}\n\nexport function CartFormFields() {\n  return (\n    <form action={cartFormAction}>\n      <input type=\"hidden\" name=\"itemId\" value=\"a\" />\n      <input type=\"hidden\" name=\"itemId\" value=\"b\" />\n      <input name=\"coupon\" placeholder=\"code\" />\n      <button type=\"submit\">Checkout</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q20: [MID] Migration — onSubmit form ko Action me kaise?",
            "explain": "Kya karna hai:\ne.preventDefault hatao; handler ko action={async (fd) => ...} banao.\n\nSeedha matlab:\nStep 1: FormData e.currentTarget se → formData arg direct.\nStep 2: loading state → useActionState / useFormStatus.\nStep 3: setError → return { error } from action.\nReact 18 code chalta rahega — gradual file-by-file migrate karo.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const migrateOnSubmitSteps = [\n  \"remove preventDefault\",\n  \"move handler to action={fn}\",\n  \"replace loading useState with useActionState isPending\",\n  \"return errors instead of setError where possible\",\n];"
          },
          {
            "title": "Q21: [ADV] Security — client Action me secrets mat daalo",
            "explain": "Kya karna hai:\nBrowser action function me API secret embed mat karo — visible hai.\n\nSeedha matlab:\nClient Action → public API call with user token/session cookie OK.\nServer Action (file 38) → secrets server pe safe.\nReact 18 same rule — yeh React 19 specific nahi, par interview me bolo.\nValidate/sanitize FormData server pe — client validation convenience only.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const actionSecurityNote =\n  \"Client actions run in browser — no secrets; server validates all inputs.\";"
          },
          {
            "title": "Q22: [ADV] Interview trap — action sync function?",
            "explain": "Kya karna hai:\nAction async ho sakti hai; sync bhi chalegi lekin pending UX short/ invisible.\n\nSeedha matlab:\nAsync await network — isPending true meaningful time tak.\nSync action: turant complete — useFormStatus flash barely visible.\nReact 18 onSubmit sync vs async same; 19 pending hooks async ke liye shine.\nformAction null/undefined → native HTML submit behavior (full page) possible.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "async function syncStyleAction(formData) {\n  return { ok: true, val: formData.get(\"q\") };\n}\n\nexport function SyncActionForm() {\n  return (\n    <form action={syncStyleAction}>\n      <input name=\"q\" />\n      <button type=\"submit\">Quick</button>\n    </form>\n  );\n}"
          }
        ]
      },
      {
        "file": "30_React19_useActionState.jsx",
        "title": "30 — useActionState",
        "kya": "Form submit ke baad UI ko batana padta hai:",
        "detail": "30 — React 19 useActionState\nLevel: REACT19  |  Sequence seekho: pehle yeh file, phir agla number\n\nLAYMAN: Form submit ke baad UI ko batana padta hai:\n\"kya result aaya?\", \"pehle kya tha?\", \"abhi pending hai kya?\"\n\nuseActionState = yeh teen cheezein ek hook me.\nPehle naam experimental me useFormState tha; React 19 me useActionState.\n\nSocho counter machine: purana number yaad (previous state),\nbutton dabao (action), naya number dikhao, process hone tak pending.\n\nSignature (concept):\n  const [state, formAction, isPending] = useActionState(action, initialState, permalink?)\n  action(previousState, formData) → nextState\n\nKYUN: React 19 forms ka #1 hook interview me.\nINTERVIEW: previous state kyun milta; isPending; error object return pattern.",
        "intro": "30 — React 19 useActionState\nLevel: REACT19  |  Sequence seekho: pehle yeh file, phir agla number\n\nLAYMAN: Form submit ke baad UI ko batana padta hai:\n\"kya result aaya?\", \"pehle kya tha?\", \"abhi pending hai kya?\"\n\nuseActionState = yeh teen cheezein ek hook me.\nPehle naam experimental me useFormState tha; React 19 me useActionState.\n\nSocho counter machine: purana number yaad (previous state),\nbutton dabao (action), naya number dikhao, process hone tak pending.\n\nSignature (concept):\n  const [state, formAction, isPending] = useActionState(action, initialState, permalink?)\n  action(previousState, formData) → nextState\n\nKYUN: React 19 forms ka #1 hook interview me.\nINTERVIEW: previous state kyun milta; isPending; error object return pattern.",
        "questions": [
          {
            "title": "Q1: Basic counter with previous state",
            "explain": "Seedha matlab:\naction ka pehla arg = abhi tak ka state.\nDusra = FormData (form fields).\nReturn = naya state jo UI me bind hoga.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "async function addOne(prevCount, _formData) {\n  // simulate network\n  await new Promise((r) => setTimeout(r, 300));\n  return prevCount + 1;\n}\n\nexport function CounterWithActionState() {\n  const [count, formAction, isPending] = useActionState(addOne, 0);\n\n  return (\n    <form action={formAction}>\n      <p>Count: {count}</p>\n      <button type=\"submit\" disabled={isPending}>\n        {isPending ? \"...\" : \"+1\"}\n      </button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q2: [MID] Message form — success / error in state object",
            "explain": "Seedha matlab:\nState sirf number nahi — object { error, message } return karo.\nUI us object se alert dikhaye. prev use karke purana message rakho/clear.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "async function sendMessage(prev, formData) {\n  const text = String(formData.get(\"text\") || \"\").trim();\n  if (!text) {\n    return { ...prev, error: \"Empty message\", ok: false };\n  }\n  // await api.send(text)\n  return { message: text, error: null, ok: true };\n}\n\nexport function MessageForm() {\n  const [state, formAction, isPending] = useActionState(sendMessage, {\n    message: \"\",\n    error: null,\n    ok: false,\n  });\n\n  return (\n    <form action={formAction}>\n      <input name=\"text\" placeholder=\"Type...\" />\n      <button type=\"submit\" disabled={isPending}>\n        Send\n      </button>\n      {state.error && <p role=\"alert\">{state.error}</p>}\n      {state.ok && <p>Sent: {state.message}</p>}\n    </form>\n  );\n}"
          },
          {
            "title": "Q3: isPending — button disable + label",
            "explain": "Seedha matlab:\nisPending true jab tak action Promise settle na ho.\nDouble-submit rokne ka built-in signal — alag useState('loading') kam.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "async function slowSave(prev, formData) {\n  await new Promise((r) => setTimeout(r, 1000));\n  return { last: formData.get(\"title\"), savedAt: Date.now() };\n}\n\nexport function SlowSaveForm() {\n  const [state, formAction, isPending] = useActionState(slowSave, { last: null });\n\n  return (\n    <form action={formAction}>\n      <input name=\"title\" />\n      <button disabled={isPending}>{isPending ? \"Saving...\" : \"Save\"}</button>\n      <pre>{JSON.stringify(state)}</pre>\n    </form>\n  );\n}"
          },
          {
            "title": "Q4: [MID] Previous state kyun important?",
            "explain": "Seedha matlab:\nKabhi naya state purane pe depend karta (increment, append list).\nKabhi error pe purana good data preserve.\nAction pure function socho: (prev, formData) => next",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "async function appendTodo(prev, formData) {\n  const title = String(formData.get(\"title\") || \"\").trim();\n  if (!title) return prev;\n  return [...prev, { id: crypto.randomUUID(), title }];\n}\n\nexport function TodoActionList() {\n  const [todos, formAction, isPending] = useActionState(appendTodo, []);\n\n  return (\n    <div>\n      <form action={formAction}>\n        <input name=\"title\" />\n        <button disabled={isPending}>Add</button>\n      </form>\n      <ul>\n        {todos.map((t) => (\n          <li key={t.id}>{t.title}</li>\n        ))}\n      </ul>\n    </div>\n  );\n}"
          },
          {
            "title": "Q5: formAction button pe bhi (same hook)",
            "explain": "Seedha matlab:\nuseActionState se mila formAction — form action= YA button formAction=\nDono jagah same pending/state pipeline.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "async function like(prev) {\n  return { ...prev, likes: prev.likes + 1 };\n}\nasync function unlike(prev) {\n  return { ...prev, likes: Math.max(0, prev.likes - 1) };\n}\n\nexport function LikeUnlike() {\n  const [state, formAction, isPending] = useActionState(like, { likes: 0 });\n  // Note: unlike alag useActionState mangta for separate action fn —\n  // teaching: ek formAction primarily binds to the hook's action.\n  // Multiple actions → often separate hooks OR one action that branches on formData.\n  return (\n    <form action={formAction}>\n      <span>{state.likes}</span>\n      <button disabled={isPending}>Like</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q6: Branch inside ONE action via hidden/intent field",
            "explain": "Seedha matlab:\nPractical pattern: formData.get('intent') === 'delete' | 'save'\nEk useActionState, multiple buttons with name=\"intent\" value=...",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "async function cartAction(prev, formData) {\n  const intent = formData.get(\"intent\");\n  const id = formData.get(\"id\");\n  if (intent === \"add\") {\n    return { ...prev, items: [...prev.items, id] };\n  }\n  if (intent === \"clear\") {\n    return { ...prev, items: [] };\n  }\n  return prev;\n}\n\nexport function CartIntentForm() {\n  const [state, formAction] = useActionState(cartAction, { items: [] });\n  return (\n    <form action={formAction}>\n      <button name=\"intent\" value=\"add\">\n        Add\n      </button>\n      <input type=\"hidden\" name=\"id\" value=\"sku-1\" />\n      <button name=\"intent\" value=\"clear\">\n        Clear\n      </button>\n      <p>Items: {state.items.join(\", \")}</p>\n    </form>\n  );\n}"
          },
          {
            "title": "Q7: [MID] useActionState vs useState + onSubmit",
            "explain": "Seedha matlab:\nuseState: tum pending/error/data khud sync karte.\nuseActionState: action return = source of truth; isPending free.\nComplex multi-field live validation → mix with local useState OK.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const compare = {\n  useStateSubmit: \"full control, more boilerplate\",\n  useActionState: \"form-centric async state machine\",\n};"
          },
          {
            "title": "Q8: Initial state + reset feel",
            "explain": "Seedha matlab:\ninitialState sirf pehli render pe seed.\n\"Form reset\" = action se empty object return, ya component key remount.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "async function resettable(prev, formData) {\n  if (formData.get(\"intent\") === \"reset\") {\n    return { name: \"\", note: \"reset done\" };\n  }\n  return { name: formData.get(\"name\"), note: \"saved\" };\n}\n\nexport function ResettableProfile() {\n  const [state, formAction, isPending] = useActionState(resettable, {\n    name: \"\",\n    note: \"idle\",\n  });\n  return (\n    <form action={formAction}>\n      <input name=\"name\" defaultValue={state.name || \"\"} />\n      <button name=\"intent\" value=\"save\" disabled={isPending}>\n        Save\n      </button>\n      <button name=\"intent\" value=\"reset\" type=\"submit\">\n        Reset state\n      </button>\n      <p>{state.note}</p>\n    </form>\n  );\n}"
          },
          {
            "title": "Q9: [MID] permalink arg (3rd param) — mental model",
            "explain": "Kya karna hai:\nuseActionState(action, initial, permalink?) — shareable URL state idea (frameworks).\n\nSeedha matlab:\nOptional 3rd arg — some setups me form state URL se hydrate ho sakta.\nPlain Vite SPA me often skip; Next/docs me dekho agar use ho.\nReact 18 me aisa built-in nahi tha — naya optional surface.\nTrap: permalink pass karo bina framework support — kuch nahi hoga.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const permalinkNote =\n  \"3rd arg optional — framework-dependent shareable form state; often omitted in SPA.\";"
          },
          {
            "title": "Q10: Action me throw — error handling",
            "explain": "Kya karna hai:\nthrow new Error('...') vs return { error: '...' } — team convention.\n\nSeedha matlab:\nthrow → error boundary / unhandled depending on setup.\nreturn error object → UI me state.error dikhao (preferred forms me).\nReact 18: try/catch in onSubmit; same choice.\nuseActionState: return pattern zyada predictable form UX.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "async function throwOrReturn(prev, formData) {\n  const fail = formData.get(\"fail\") === \"on\";\n  if (fail) return { ...prev, error: \"Validation failed\", ok: false };\n  return { ...prev, error: null, ok: true };\n}\n\nexport function ThrowOrReturnForm() {\n  const [state, formAction, isPending] = useActionState(throwOrReturn, {\n    error: null,\n    ok: false,\n  });\n  return (\n    <form action={formAction}>\n      <label>\n        <input type=\"checkbox\" name=\"fail\" /> Force fail\n      </label>\n      <button disabled={isPending}>Submit</button>\n      {state.error && <p role=\"alert\">{state.error}</p>}\n    </form>\n  );\n}"
          },
          {
            "title": "Q11: [MID] Optimistic + useActionState combo (file 32 link)",
            "explain": "Kya karna hai:\nAction ke andar addOptimistic; real state action return se update.\n\nSeedha matlab:\nuseActionState = source of truth after settle.\nuseOptimistic = instant overlay during pending.\nReact 18: manual temp state + rollback on error.\nOrder: optimistic call → await API → return new state OR keep prev on fail.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function OptimisticActionStateIdea() {\n  return (\n    <p>\n      Pattern: useOptimistic(state from useActionState) + action calls addOptimistic\n      before await — see file 32 for full example.\n    </p>\n  );\n}"
          },
          {
            "title": "Q12: Multiple useActionState ek page pe",
            "explain": "Kya karna hai:\nAlag forms / alag hooks — ek hook ek action function bind.\n\nSeedha matlab:\nDo forms = do useActionState calls — state mix mat karo.\nReact 18: alag useState blocks same idea.\nTrap: ek formAction do forms pe — dono same state machine share karenge wrongly.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "async function profileAction(prev, formData) {\n  return { name: formData.get(\"name\") };\n}\nasync function settingsAction(prev, formData) {\n  return { theme: formData.get(\"theme\") };\n}\n\nexport function TwoFormsTwoHooks() {\n  const [profile, profileActionFn] = useActionState(profileAction, { name: \"\" });\n  const [settings, settingsActionFn] = useActionState(settingsAction, {\n    theme: \"light\",\n  });\n  return (\n    <div>\n      <form action={profileActionFn}>\n        <input name=\"name\" />\n        <button>Save profile</button>\n        <p>{profile.name}</p>\n      </form>\n      <form action={settingsActionFn}>\n        <select name=\"theme\" defaultValue=\"light\">\n          <option value=\"light\">Light</option>\n          <option value=\"dark\">Dark</option>\n        </select>\n        <button>Save settings</button>\n        <p>{settings.theme}</p>\n      </form>\n    </div>\n  );\n}"
          },
          {
            "title": "Q13: [MID] Server Action as useActionState action (file 38)",
            "explain": "Kya karna hai:\naction param = imported 'use server' function — pending client, mutate server.\n\nSeedha matlab:\nClient component: useActionState(serverLogin, initial).\nReact 18: onSubmit + fetch API route manually.\nSecurity: server function validates — prev state client pe safe assume.\nMigration: API route handler body → server action + same useActionState hook.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const serverActionCombo =\n  \"useActionState(serverFn, initial) — client pending UI, server mutation.\";"
          },
          {
            "title": "Q14: isPending vs form submitting — double guard",
            "explain": "Kya karna hai:\nisPending + useFormStatus.pending — same form pe redundant but OK.\n\nSeedha matlab:\nisPending: is hook ke action ke liye.\nuseFormStatus: nearest form submission (child).\nSame form pe usually same timing — pick one for simplicity.\nReact 18: single loading boolean enough.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function PendingBothSources() {\n  const [state, formAction, isPending] = useActionState(slowSave, { last: null });\n  return (\n    <form action={formAction}>\n      <input name=\"title\" />\n      <button disabled={isPending}>\n        {isPending ? \"Saving...\" : \"Save\"}\n      </button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q15: [MID] Stale prev in rapid double submit",
            "explain": "Kya karna hai:\nDo submit jaldi — action (prev) sequential React queue karta hai generally.\n\nSeedha matlab:\nFunctional prev in action reliable for increment-style updates.\nNetwork race alag — last response wins agar tum manually merge na karo.\nReact 18 useState functional updates same lesson.\nGuard: disabled={isPending} best first fix.\nEdge: parallel actions different hooks — independent state machines.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "async function safeIncrement(prev) {\n  await new Promise((r) => setTimeout(r, 200));\n  return prev + 1;\n}\n\nexport function SafeIncrementForm() {\n  const [n, formAction, isPending] = useActionState(safeIncrement, 0);\n  return (\n    <form action={formAction}>\n      <p>{n}</p>\n      <button disabled={isPending}>+1</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q16: useActionState initial state type — object immutability",
            "explain": "Kya karna hai:\nreturn { ...prev, field } — prev mutate mat karo.\n\nSeedha matlab:\nprev.push(x); return prev ❌ — same reference, React skip kar sakta.\nreturn [...prev, x] ✅ arrays; spread objects ✅.\nReact 18 useState same immutability rules.\nCommon bug: prev.items.push(newItem) without new array reference.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "async function immutableAppend(prev, formData) {\n  const item = String(formData.get(\"item\") || \"\");\n  if (!item) return prev;\n  return { ...prev, items: [...prev.items, item] };\n}\n\nexport function ImmutableListForm() {\n  const [state, formAction] = useActionState(immutableAppend, { items: [] });\n  return (\n    <form action={formAction}>\n      <input name=\"item\" />\n      <button>Add</button>\n      <ul>\n        {state.items.map((x, i) => (\n          <li key={i}>{x}</li>\n        ))}\n      </ul>\n    </form>\n  );\n}"
          },
          {
            "title": "Q17: [MID] useFormState → useActionState rename migration",
            "explain": "Kya karna hai:\nPurane blogs useFormState likhte hain — React 19 me useActionState.\n\nSeedha matlab:\nSame API shape [state, action, isPending] — sirf naam change.\nCodemods / search-replace during upgrade.\nInterview trap: \"useFormState\" bol dein → correct to useActionState in 19.\nReact 18 canary me experimental naam tha — production 19 stable name.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const renameNote = \"useFormState (old/canary) → useActionState (React 19 stable).\";"
          },
          {
            "title": "Q18: Action without FormData — button-only forms",
            "explain": "Kya karna hai:\nKhali form ya sirf button — formData empty; prev state se kaam chalao.\n\nSeedha matlab:\nincrementAction(prev, formData) — formData ignore OK.\nReact 18 onClick increment alag; form action se bhi ho sakta.\nHidden fields optional jab server ko context chahiye.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "async function tick(prev) {\n  return prev + 1;\n}\n\nexport function TickForm() {\n  const [n, formAction, isPending] = useActionState(tick, 0);\n  return (\n    <form action={formAction}>\n      <span>{n}</span>\n      <button disabled={isPending}>Tick</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q19: [ADV] Custom wrapper hook pattern",
            "explain": "Kya karna hai:\nuseLoginForm() internally useActionState(loginAction, initial) — encapsulate.\n\nSeedha matlab:\nTeam API clean: const { state, formAction, isPending } = useLoginForm().\nReact 18: useSubmitLogin custom hook with useState same idea.\nRules: custom hook name use*; action function bahar ya module level.\nTest: action pure-ish (prev, fd) => next easy to unit test.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function useLoginForm() {\n  async function login(prev, formData) {\n    const email = String(formData.get(\"email\") || \"\");\n    if (!email.includes(\"@\")) return { ...prev, error: \"Bad email\" };\n    return { error: null, ok: true };\n  }\n  return useActionState(login, { error: null, ok: false });\n}\n\nexport function LoginWrapperForm() {\n  const [state, formAction, isPending] = useLoginForm();\n  return (\n    <form action={formAction}>\n      <input name=\"email\" type=\"email\" />\n      <button disabled={isPending}>Login</button>\n      {state.error && <p>{state.error}</p>}\n    </form>\n  );\n}"
          },
          {
            "title": "Q20: [MID] When NOT useActionState",
            "explain": "Kya karna hai:\nNon-form async (websocket), global store, TanStack Query — alag tools.\n\nSeedha matlab:\nForm submit centric flows = sweet spot.\nReal-time chat messages — Query/mutation better.\nReact 18 useReducer + onSubmit ab bhi fine for complex wizards.\nMulti-step wizard with local-only steps — useState until final submit.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const whenNotUseActionState = [\n  \"non-form async workflows\",\n  \"server cache via TanStack Query\",\n  \"global Redux/Zustand mutations\",\n  \"complex wizard mostly client-side\",\n];"
          },
          {
            "title": "Q21: [ADV] Testing action function in isolation",
            "explain": "Kya karna hai:\nawait myAction(prev, fakeFormData) — component render without.\n\nSeedha matlab:\nFormData test me: new FormData(); fd.append('x','1').\nAssert return value === expected next state.\nReact 18: extract onSubmit handler similarly testable.\nIntegration: RTL fireEvent submit with form — E2E optional.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "async function testableAction(prev, formData) {\n  const n = Number(formData.get(\"n\") || 0);\n  return prev + n;\n}\n\nexport const testableActionExport = testableAction; // for unit tests"
          },
          {
            "title": "Q22: [ADV] Interview — useActionState one-liner + traps",
            "explain": "Kya karna hai:\n\"[state, formAction, isPending] — action(prev, FormData) => nextState\"\n\nSeedha matlab:\nTrap 1: action me prev mutate — immutability break.\nTrap 2: useFormState naam outdated.\nTrap 3: isPending ignore → double submit.\nTrap 4: return undefined — state become undefined; always return prev or next.\nReact 18 contrast: manual loading/error states around onSubmit.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const useActionStateTraps = [\n  \"mutating prev\",\n  \"wrong hook name useFormState in 19\",\n  \"ignoring isPending\",\n  \"returning undefined accidentally\",\n];"
          }
        ]
      },
      {
        "file": "31_React19_useFormStatus.jsx",
        "title": "31 — useFormStatus",
        "kya": "Parent form submit ho raha hai — child button ko pata chalna chahiye",
        "detail": "31 — React 19 useFormStatus (react-dom)\nLevel: REACT19  |  Sequence seekho: pehle yeh file, phir agla number\n\nLAYMAN: Parent form submit ho raha hai — child button ko pata chalna chahiye\n\"pending hai kya?\" bina prop drilling ke.\n\nuseFormStatus() = react-dom se; NEAREST parent <form> ki status.\npending, data, method, action — yeh fields milti hain.\n\nBAHUT IMPORTANT rule:\nYeh hook USI component me mat call karo jo <form> khud render karta —\nCHILD component me call karo jo form ke ANDAR ho.\n\nSocho: form = restaurant; useFormStatus = waiter jo kitchen light dekh kar\n\"order preparing\" bolta — waiter kitchen ke bahar khada child staff hai.\n\nKYUN: Submit button UX bina state lift kiye.\nINTERVIEW: kyun form wale component me kaam nahi; react vs react-dom import.",
        "intro": "31 — React 19 useFormStatus (react-dom)\nLevel: REACT19  |  Sequence seekho: pehle yeh file, phir agla number\n\nLAYMAN: Parent form submit ho raha hai — child button ko pata chalna chahiye\n\"pending hai kya?\" bina prop drilling ke.\n\nuseFormStatus() = react-dom se; NEAREST parent <form> ki status.\npending, data, method, action — yeh fields milti hain.\n\nBAHUT IMPORTANT rule:\nYeh hook USI component me mat call karo jo <form> khud render karta —\nCHILD component me call karo jo form ke ANDAR ho.\n\nSocho: form = restaurant; useFormStatus = waiter jo kitchen light dekh kar\n\"order preparing\" bolta — waiter kitchen ke bahar khada child staff hai.\n\nKYUN: Submit button UX bina state lift kiye.\nINTERVIEW: kyun form wale component me kaam nahi; react vs react-dom import.",
        "questions": [
          {
            "title": "Q1: Child SubmitButton with pending",
            "explain": "Seedha matlab:\nSubmitButton alag component — form ke andar.\npending true → disable + \"Saving...\"",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function SubmitButton() {\n  const { pending } = useFormStatus();\n  return (\n    <button type=\"submit\" disabled={pending}>\n      {pending ? \"Saving...\" : \"Save\"}\n    </button>\n  );\n}\n\nasync function saveAction(formData) {\n  await new Promise((r) => setTimeout(r, 800));\n  console.log(\"saved\", formData.get(\"title\"));\n}\n\nexport function ArticleForm() {\n  return (\n    <form action={saveAction}>\n      <input name=\"title\" />\n      <SubmitButton />\n    </form>\n  );\n}"
          },
          {
            "title": "Q2: [MID] Galat jagah call — common bug",
            "explain": "Seedha matlab:\nAgar useFormStatus ko ArticleForm ke andar seedha likho (form ke saath),\npending aksar hamesha false / useless — kyunki status PARENT form ki hoti,\nkhud ke form ki nahi is render tree rule se.\nFix: button (ya koi child) alag function component.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function WrongPlaceDemo_DoNotCopy() {\n  // ❌ Don't: const { pending } = useFormStatus(); here with <form> below\n  return (\n    <form action={saveAction}>\n      <input name=\"title\" />\n      {/* ✅ Do: child component */}\n      <SubmitButton />\n    </form>\n  );\n}"
          },
          {
            "title": "Q3: pending + data — kya submit ho raha",
            "explain": "Seedha matlab:\ndata = FormData jab submit in-flight.\nPending UI me \"Saving: {title}\" dikha sakte.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function StatusLine() {\n  const { pending, data } = useFormStatus();\n  if (!pending) return null;\n  const title = data?.get(\"title\");\n  return <p>Saving{title ? `: ${title}` : \"...\"}</p>;\n}\n\nexport function FormWithStatusLine() {\n  return (\n    <form action={saveAction}>\n      <input name=\"title\" />\n      <StatusLine />\n      <SubmitButton />\n    </form>\n  );\n}"
          },
          {
            "title": "Q4: method & action fields",
            "explain": "Seedha matlab:\nmethod — get/post style info.\naction — function ya URL jo form use kar raha.\nDebugging / conditional UI ke liye.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function DebugStatus() {\n  const status = useFormStatus();\n  return (\n    <pre>\n      {JSON.stringify(\n        {\n          pending: status.pending,\n          method: status.method,\n          hasData: Boolean(status.data),\n          actionType: typeof status.action,\n        },\n        null,\n        2\n      )}\n    </pre>\n  );\n}\n\nexport function FormDebug() {\n  return (\n    <form action={saveAction}>\n      <input name=\"title\" />\n      <DebugStatus />\n      <SubmitButton />\n    </form>\n  );\n}"
          },
          {
            "title": "Q5: [MID] useFormStatus vs useActionState isPending",
            "explain": "Seedha matlab:\nuseActionState.isPending — us hook ke action ke liye.\nuseFormStatus.pending — nearest form submission.\nButton sirf pending dikhani hai, state manage nahi — useFormStatus enough.\nState + errors chahiye — useActionState (file 30) + status child combo.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const whenToUse = {\n  useFormStatus: \"child UI reflecting form pending/data\",\n  useActionState: \"own the returned state machine\",\n};"
          },
          {
            "title": "Q6: Nested forms? Don't.",
            "explain": "Seedha matlab:\nHTML me nested <form> invalid.\nuseFormStatus nearest parent form dekhta — nesting se confusion.\nEk form, children components.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function OneFormManyChildren() {\n  return (\n    <form action={saveAction}>\n      <fieldset>\n        <input name=\"title\" />\n      </fieldset>\n      <StatusLine />\n      <SubmitButton />\n    </form>\n  );\n}"
          },
          {
            "title": "Q7: Disable whole fieldset while pending",
            "explain": "Seedha matlab:\nFieldset disabled={pending} — saari controls band.\nAccessibility-friendly busy state.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function BusyFields({ children }) {\n  const { pending } = useFormStatus();\n  return <fieldset disabled={pending}>{children}</fieldset>;\n}\n\nexport function FormBusyFieldset() {\n  return (\n    <form action={saveAction}>\n      <BusyFields>\n        <input name=\"title\" />\n        <input name=\"slug\" />\n      </BusyFields>\n      <SubmitButton />\n    </form>\n  );\n}"
          },
          {
            "title": "Q8: Import from 'react-dom' — yaad rakho",
            "explain": "Seedha matlab:\nuseFormStatus react se NAHI, react-dom se.\nInterview trap: galat package.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "// import { useFormStatus } from \"react-dom\"; // ✅\n// import { useFormStatus } from \"react\"; // ❌"
          },
          {
            "title": "Q9: formAction button — pending status",
            "explain": "Kya karna hai:\nButton pe formAction={otherFn} — useFormStatus us submission ko track kare.\n\nSeedha matlab:\nNearest form ki active submission — kaun sa action chal raha.\nPublish dabao to pending true for that submit path.\nReact 18: manually track which button clicked via state.\nChild component me status read — parent me mat.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "async function publishAction(formData) {\n  await new Promise((r) => setTimeout(r, 600));\n  console.log(\"publish\", formData.get(\"title\"));\n}\n\nfunction PublishButton() {\n  const { pending } = useFormStatus();\n  return (\n    <button type=\"submit\" formAction={publishAction} disabled={pending}>\n      {pending ? \"Publishing...\" : \"Publish\"}\n    </button>\n  );\n}\n\nexport function FormWithFormActionButton() {\n  return (\n    <form action={saveAction}>\n      <input name=\"title\" />\n      <SubmitButton />\n      <PublishButton />\n    </form>\n  );\n}"
          },
          {
            "title": "Q10: [MID] useFormStatus outside form — trap",
            "explain": "Kya karna hai:\nForm ke bahar useFormStatus() — no parent form → pending false / default.\n\nSeedha matlab:\nHook ko form descendant hona chahiye (DOM tree me andar).\nPortal me form ke andar button ho to generally OK (same form association check docs).\nReact 18: N/A — hook nahi tha; loading prop pass karte the.\nFix: move component inside <form> or pass pending prop explicitly.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function OutsideFormTrap() {\n  return (\n    <div>\n      <p>Status component yahan form ke bahar hota to pending kaam nahi karta</p>\n      <form action={saveAction}>\n        <input name=\"title\" />\n        <SubmitButton />\n      </form>\n    </div>\n  );\n}"
          },
          {
            "title": "Q11: Spinner component reusable pattern",
            "explain": "Kya karna hai:\n<SubmitSpinner /> — har form me drop-in pending indicator.\n\nSeedha matlab:\nDesign system button wrapper with useFormStatus inside.\nReact 18: <Button loading={loading} /> prop from parent state.\nMust render INSIDE form — document in Storybook stories correctly.\naria-busy={pending} accessibility bonus.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function SubmitSpinner() {\n  const { pending } = useFormStatus();\n  if (!pending) return null;\n  return <span aria-live=\"polite\">Working…</span>;\n}\n\nexport function FormWithSpinner() {\n  return (\n    <form action={saveAction}>\n      <input name=\"title\" />\n      <SubmitSpinner />\n      <SubmitButton />\n    </form>\n  );\n}"
          },
          {
            "title": "Q12: [MID] data FormData — types during pending",
            "explain": "Kya karna hai:\npending true pe data?.get('field') — optional chaining.\n\nSeedha matlab:\ndata null jab not pending — UI me check karo.\nShow \"Saving draft: {title}\" during flight.\nReact 18: e.currentTarget FormData in submit handler once.\nEdge: file inputs in data — File object available during pending.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function SavingPreview() {\n  const { pending, data } = useFormStatus();\n  if (!pending || !data) return null;\n  const title = data.get(\"title\");\n  const slug = data.get(\"slug\");\n  return (\n    <p>\n      Saving {String(title)} ({String(slug)})\n    </p>\n  );\n}\n\nexport function FormSavingPreview() {\n  return (\n    <form action={saveAction}>\n      <input name=\"title\" defaultValue=\"My post\" />\n      <input name=\"slug\" defaultValue=\"my-post\" />\n      <SavingPreview />\n      <SubmitButton />\n    </form>\n  );\n}"
          },
          {
            "title": "Q13: Multiple forms on page — isolated status",
            "explain": "Kya karna hai:\nDo alag forms — har SubmitButton apne nearest form ki status dekhe.\n\nSeedha matlab:\nForm A pending ≠ Form B pending — automatic isolation.\nReact 18: separate loading state per form manually.\nTrap: ek shared SubmitButton do forms ke beech — ambiguous parent.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function TwoFormsIsolated() {\n  return (\n    <div>\n      <form action={saveAction}>\n        <input name=\"title\" placeholder=\"Form A\" />\n        <SubmitButton />\n      </form>\n      <form action={publishAction}>\n        <input name=\"title\" placeholder=\"Form B\" />\n        <PublishButton />\n      </form>\n    </div>\n  );\n}"
          },
          {
            "title": "Q14: [MID] useFormStatus + useActionState together",
            "explain": "Kya karna hai:\nParent: useActionState for state/errors; child: useFormStatus for button UX.\n\nSeedha matlab:\nComplementary — state machine parent; pending UI child without props.\nReact 18: lift isLoading to parent, pass to button.\nDono pending usually sync for same form — redundant but clean separation.\nInterview: \"status hook for presentation; action state for data\".",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "async function combinedSave(prev, formData) {\n  await new Promise((r) => setTimeout(r, 500));\n  return { saved: formData.get(\"title\"), error: null };\n}\n\nfunction CombinedSubmit() {\n  const { pending } = useFormStatus();\n  return (\n    <button type=\"submit\" disabled={pending}>\n      {pending ? \"...\" : \"Save\"}\n    </button>\n  );\n}\n\nexport function CombinedForm() {\n  const [state, formAction] = useActionState(combinedSave, {\n    saved: null,\n    error: null,\n  });\n  return (\n    <form action={formAction}>\n      <input name=\"title\" />\n      <CombinedSubmit />\n      {state.saved && <p>Saved: {state.saved}</p>}\n    </form>\n  );\n}"
          },
          {
            "title": "Q15: fieldset disabled={pending} — a11y",
            "explain": "Kya karna hai:\npending pe poora fieldset disable — double entry roko.\n\nSeedha matlab:\nScreen readers ko busy state pata chale visually + functionally.\nReact 18: disabled={loading} har input pe manually tedious.\nChild wrapper BusyFields pattern (Q7) reuse karo.\nNote: disabled fields FormData me sometimes skip — check browser behavior for your fields.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function A11yBusyWrapper({ children }) {\n  const { pending } = useFormStatus();\n  return (\n    <fieldset disabled={pending} aria-busy={pending}>\n      {children}\n    </fieldset>\n  );\n}\n\nexport function A11yBusyForm() {\n  return (\n    <form action={saveAction}>\n      <A11yBusyWrapper>\n        <input name=\"title\" />\n        <textarea name=\"body\" />\n      </A11yBusyWrapper>\n      <SubmitButton />\n    </form>\n  );\n}"
          },
          {
            "title": "Q16: [MID] React 18 pattern contrast — prop drilling loading",
            "explain": "Kya karna hai:\nPurana: const [loading,setLoading]=useState; <Btn loading={loading} />.\n\nSeedha matlab:\nKaam karta tha — bas boilerplate + prop layers.\nReact 19 useFormStatus: colocate pending UI with button component.\nMigration: extract SubmitButton child, remove loading prop chain.\nWhen NOT: form hi nahi — non-form buttons ke liye useActionState.isPending.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function LegacyStyleButton({ loading }) {\n  return (\n    <button type=\"submit\" disabled={loading}>\n      {loading ? \"Saving...\" : \"Save\"}\n    </button>\n  );\n}\n\nexport function LegacyStyleForm() {\n  const [loading, setLoading] = useState(false);\n  async function onSubmit(e) {\n    e.preventDefault();\n    setLoading(true);\n    await saveAction(new FormData(e.currentTarget));\n    setLoading(false);\n  }\n  return (\n    <form onSubmit={onSubmit}>\n      <input name=\"title\" />\n      <LegacyStyleButton loading={loading} />\n    </form>\n  );\n}"
          },
          {
            "title": "Q17: method field — get vs post mental model",
            "explain": "Kya karna hai:\nuseFormStatus().method — form method attribute reflect.\n\nSeedha matlab:\naction={fn} React apps me usually programmatic — method mostly 'post' feel.\nDebugging: log method + action type in dev tools component.\nReact 18: same HTML form attributes.\nProgressive enhancement native action URL pe method matter karta.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function MethodDebug() {\n  const { method, pending } = useFormStatus();\n  return (\n    <small>\n      method={method} pending={String(pending)}\n    </small>\n  );\n}\n\nexport function FormMethodDebug() {\n  return (\n    <form action={saveAction} method=\"post\">\n      <input name=\"title\" />\n      <MethodDebug />\n      <SubmitButton />\n    </form>\n  );\n}"
          },
          {
            "title": "Q18: [ADV] Custom element / design system integration",
            "explain": "Kya karna hai:\n<DSButton type=\"submit\"> ke andar useFormStatus — must be in form subtree.\n\nSeedha matlab:\nShadow DOM boundaries check karo — rare breaks.\nReact 18: loading prop API on design system.\nReact 19: internal useFormStatus in DS SubmitButton implementation.\nExport DS component docs: \"must be child of form\".",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function DesignSystemNote() {\n  return (\n    <p>\n      Design system SubmitButton should call useFormStatus internally and document\n      that it must render inside a form.\n    </p>\n  );\n}"
          },
          {
            "title": "Q19: [MID] Server Action form — useFormStatus still works",
            "explain": "Kya karna hai:\naction={serverAction} client form — pending client pe track hota hai.\n\nSeedha matlab:\nNetwork server tak jaati — pending true until response.\nReact 18 + server: manual fetch pending.\nSlow server action: fieldset disable critical — double POST avoid.\nError display: useActionState state.error + useFormStatus pending combo.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const serverFormStatus =\n  \"useFormStatus tracks client-side submission lifecycle for server actions too.\";"
          },
          {
            "title": "Q20: Pending false immediately — sync action flash",
            "explain": "Kya karna hai:\nBahut fast sync action — pending UI blink barely visible.\n\nSeedha matlab:\nNormal for trivial actions — don't over-engineer spinner.\nReact 18 same — setLoading(true/false) sync code me invisible.\nUX: minimum 300ms spinner optional pattern (debate — artificial delay usually bad).\nInterview: pending meaningful for async I/O bound actions.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "async function instantAction(formData) {\n  return formData.get(\"x\");\n}\n\nfunction InstantSubmit() {\n  const { pending } = useFormStatus();\n  return <button disabled={pending}>{pending ? \"...\" : \"Go\"}</button>;\n}\n\nexport function InstantForm() {\n  return (\n    <form action={instantAction}>\n      <input name=\"x\" defaultValue=\"1\" />\n      <InstantSubmit />\n    </form>\n  );\n}"
          },
          {
            "title": "Q21: [ADV] When NOT useFormStatus",
            "explain": "Kya karna hai:\nNon-form async, useActionState.isPending enough alone, no form element.\n\nSeedha matlab:\nClick handler mutation without form — useActionState or useTransition.\nParent needs pending of specific non-form action — status hook won't help.\nReact 18: local useState always.\nMultiple coordinated pending flags — broader state machine.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const whenNotFormStatus = [\n  \"no form element involved\",\n  \"only parent owns action via useActionState — isPending enough\",\n  \"global app loading overlay\",\n];"
          },
          {
            "title": "Q22: [ADV] Interview traps checklist",
            "explain": "Kya karna hai:\n4 traps yaad: wrong import, wrong place, outside form, nested forms.\n\nSeedha matlab:\n1) react not react-dom 2) same component as form 3) not descendant 4) nested form invalid\nReact 18 contrast: prop drilling loading state was the alternative.\nFix always: extract child function component inside form.\nBonus: useFormStatus form component me call → pending stuck false classic bug.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export const useFormStatusTraps = [\n  \"import from react instead of react-dom\",\n  \"call in same component that renders form\",\n  \"component outside form tree\",\n  \"invalid nested forms\",\n];"
          }
        ]
      },
      {
        "file": "32_React19_useOptimistic.jsx",
        "title": "32 — useOptimistic",
        "kya": "Optimistic UI = pehle UI me success dikhao, API baad me confirm.",
        "detail": "32 — React 19 useOptimistic\nLevel: REACT19  |  Sequence seekho: pehle yeh file, phir agla number\n\nLAYMAN: Optimistic UI = pehle UI me success dikhao, API baad me confirm.\nJaise WhatsApp double-tick se pehle message list me aa jata.\nAgar API fail → rollback (purani state).\n\nuseOptimistic(state, updateFn) → [optimisticState, addOptimistic]\nReal state (useState / action state) source of truth.\nOptimistic = temporary overlay jab tak real state catch-up na kare.\n\nKYUN: Mid interviews me \"optimistic update kaise?\" classic.\nINTERVIEW: rollback kab; action ke saath combo; race conditions.",
        "intro": "32 — React 19 useOptimistic\nLevel: REACT19  |  Sequence seekho: pehle yeh file, phir agla number\n\nLAYMAN: Optimistic UI = pehle UI me success dikhao, API baad me confirm.\nJaise WhatsApp double-tick se pehle message list me aa jata.\nAgar API fail → rollback (purani state).\n\nuseOptimistic(state, updateFn) → [optimisticState, addOptimistic]\nReal state (useState / action state) source of truth.\nOptimistic = temporary overlay jab tak real state catch-up na kare.\n\nKYUN: Mid interviews me \"optimistic update kaise?\" classic.\nINTERVIEW: rollback kab; action ke saath combo; race conditions.",
        "questions": [
          {
            "title": "Q1: Like button — turant +1, phir server",
            "explain": "Seedha matlab:\nsetOptimistic(likes + 1) turant.\nawait api — success pe real setLikes; fail pe real state wapas dikhegi\njab optimistic settle hota (React real state se sync).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "async function fakeLikeApi(ok = true) {\n  await new Promise((r) => setTimeout(r, 500));\n  if (!ok) throw new Error(\"network\");\n}\n\nexport function LikeOptimistic() {\n  const [likes, setLikes] = useState(0);\n  const [optimisticLikes, setOptimisticLikes] = useOptimistic(\n    likes,\n    (current, next) => next\n  );\n\n  async function onLike() {\n    setOptimisticLikes(likes + 1);\n    try {\n      await fakeLikeApi(true);\n      setLikes((n) => n + 1);\n    } catch {\n      // real likes unchanged → UI rollback to `likes`\n    }\n  }\n\n  return (\n    <button onClick={onLike}>\n      Likes: {optimisticLikes}\n    </button>\n  );\n}"
          },
          {
            "title": "Q2: [MID] Todo add — list me pehle dikhao",
            "explain": "Seedha matlab:\nupdateFn (current, optimisticValue) => newOptimisticState\nYahan optimisticValue = naya todo object.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function OptimisticTodos() {\n  const [todos, setTodos] = useState([{ id: \"1\", title: \"Learn React\" }]);\n  const [optimisticTodos, addOptimisticTodo] = useOptimistic(\n    todos,\n    (current, newTodo) => [...current, newTodo]\n  );\n\n  async function addTodo(formData) {\n    const title = String(formData.get(\"title\") || \"\").trim();\n    if (!title) return;\n    const temp = { id: \"temp-\" + Date.now(), title, pending: true };\n    addOptimisticTodo(temp);\n    // await api.create\n    const saved = { id: crypto.randomUUID(), title, pending: false };\n    setTodos((list) => [...list, saved]);\n  }\n\n  return (\n    <div>\n      <form action={addTodo}>\n        <input name=\"title\" />\n        <button type=\"submit\">Add</button>\n      </form>\n      <ul>\n        {optimisticTodos.map((t) => (\n          <li key={t.id} style={{ opacity: t.pending ? 0.5 : 1 }}>\n            {t.title}\n          </li>\n        ))}\n      </ul>\n    </div>\n  );\n}"
          },
          {
            "title": "Q3: Rollback idea jab API fail",
            "explain": "Seedha matlab:\nOptimistic sirf tab tak jeeta jab base state update na ho.\nFail → setTodos mat karo; optimistic automatically base pe aa jata\n(action/transition complete hone ke baad).\nUser ko error toast dikhana alag — UX zaroori.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function AddWithPossibleFail() {\n  const [items, setItems] = useState([]);\n  const [error, setError] = useState(null);\n  const [optimistic, addOptimistic] = useOptimistic(items, (cur, item) => [\n    ...cur,\n    item,\n  ]);\n\n  async function onAdd(formData) {\n    setError(null);\n    const title = String(formData.get(\"title\") || \"\");\n    addOptimistic({ id: \"tmp\", title });\n    try {\n      await fakeLikeApi(false); // force fail for demo\n      setItems((x) => [...x, { id: crypto.randomUUID(), title }]);\n    } catch (e) {\n      setError(\"Could not add — rolled back\");\n    }\n  }\n\n  return (\n    <form action={onAdd}>\n      <input name=\"title\" />\n      <button>Add</button>\n      {error && <p>{error}</p>}\n      <ul>\n        {optimistic.map((i) => (\n          <li key={i.id}>{i.title}</li>\n        ))}\n      </ul>\n    </form>\n  );\n}"
          },
          {
            "title": "Q4: [MID] useOptimistic + Actions / startTransition",
            "explain": "Seedha matlab:\nDocs often optimistic updates ko Transition/Action ke andar expect karte.\nForm action={fn} me addOptimistic call common pattern.\nBahar random setState timing se weird flashes ho sakte.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function OptimisticInsideAction() {\n  const [name, setName] = useState(\"Ada\");\n  const [optimisticName, setOptimisticName] = useOptimistic(name);\n\n  async function renameAction(formData) {\n    const next = String(formData.get(\"name\") || \"\");\n    setOptimisticName(next);\n    // await api.rename(next)\n    setName(next);\n  }\n\n  return (\n    <form action={renameAction}>\n      <p>Hello, {optimisticName}</p>\n      <input name=\"name\" defaultValue={name} />\n      <button type=\"submit\">Rename</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q5: updateFn complex merge",
            "explain": "Seedha matlab:\nDoosra arg kuch bhi — id, patch, reducer-style action.\nupdateFn pure rakho: (current, msg) => nextOptimistic",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function OptimisticCart() {\n  const [cart, setCart] = useState({ qty: 1 });\n  const [optCart, send] = useOptimistic(cart, (current, delta) => ({\n    qty: current.qty + delta,\n  }));\n\n  async function bump(delta) {\n    send(delta);\n    // await api\n    setCart((c) => ({ qty: c.qty + delta }));\n  }\n\n  return (\n    <div>\n      <p>Qty: {optCart.qty}</p>\n      <button onClick={() => bump(1)}>+1</button>\n      <button onClick={() => bump(-1)}>-1</button>\n    </div>\n  );\n}"
          },
          {
            "title": "Q6: [MID] Race — double click fast",
            "explain": "Seedha matlab:\nDo optimistic updates overlap → careful design (disable pending, queue, id).\nMid answer: pending flag / useFormStatus / ignore stale responses.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function GuardDoubleSubmit() {\n  const [n, setN] = useState(0);\n  const [opt, setOpt] = useOptimistic(n, (_c, v) => v);\n  const inflight = useRef(false);\n\n  async function inc() {\n    if (inflight.current) return;\n    inflight.current = true;\n    setOpt(n + 1);\n    try {\n      await fakeLikeApi(true);\n      setN((x) => x + 1);\n    } finally {\n      inflight.current = false;\n    }\n  }\n\n  return <button onClick={inc}>{opt}</button>;\n}"
          },
          {
            "title": "Q7: Kab optimistic NAHI?",
            "explain": "Seedha matlab:\nPayment, irreversible delete, stock \"last item\" — pehle server confirm better.\nOptimistic = low-risk, reversible, social-ish actions.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const whenNot = [\"payments\", \"permissions changes\", \"inventory-critical buys\"];"
          },
          {
            "title": "Q8: Interview one-liner",
            "explain": "Seedha matlab:\n\"useOptimistic temporary UI dikhata jab tak real state update na ho;\nfail pe base state rollback; Actions ke saath best.\"",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const interviewLine =\n  \"Optimistic = instant UI; server confirms; failure rolls back to source state.\";"
          },
          {
            "title": "Q9: useOptimistic with useActionState — full pattern sketch",
            "explain": "Kya karna hai:\nconst [state, action, pending] = useActionState(...); const [opt, addOpt] = useOptimistic(state, fn).\n\nSeedha matlab:\nReal state = useActionState return after action completes.\nOptimistic overlay during pending transition.\nReact 18: temp useState + revert on catch manually.\nAction start: addOptimistic(next); await; return final state updates base.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "async function renameServer(prev, formData) {\n  await new Promise((r) => setTimeout(r, 400));\n  const next = String(formData.get(\"name\") || prev);\n  return next;\n}\n\nexport function OptimisticWithActionState() {\n  const [name, formAction, isPending] = useActionState(renameServer, \"Ada\");\n  const [optimisticName, setOptimisticName] = useOptimistic(name);\n\n  async function optimisticRename(formData) {\n    const next = String(formData.get(\"name\") || name);\n    setOptimisticName(next);\n    // formAction dispatches to useActionState pipeline\n    return formAction(formData);\n  }\n\n  return (\n    <form action={optimisticRename}>\n      <p>Hello, {optimisticName}</p>\n      <input name=\"name\" defaultValue={name} />\n      <button disabled={isPending}>Rename</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q10: [MID] updateFn signature — (currentState, optimisticValue)",
            "explain": "Kya karna hai:\nDoosra arg kuch bhi pass karo — id, delta, whole object.\n\nSeedha matlab:\nupdateFn pure function — side effects mat.\nReact 18 manual: setItems([...items, temp]) same logic inline.\nComplex: (cur, { type, payload }) => reducer style merge.\nTrap: mutate current inside updateFn — breaks React assumptions.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function OptimisticReducerStyle() {\n  const [count, setCount] = useState(0);\n  const [opt, dispatch] = useOptimistic(count, (cur, action) => {\n    if (action.type === \"inc\") return cur + 1;\n    if (action.type === \"dec\") return cur - 1;\n    return cur;\n  });\n\n  async function inc() {\n    dispatch({ type: \"inc\" });\n    await fakeLikeApi(true);\n    setCount((c) => c + 1);\n  }\n\n  return (\n    <button onClick={inc}>\n      {opt}\n    </button>\n  );\n}"
          },
          {
            "title": "Q11: Pending flag on optimistic items UI",
            "explain": "Kya karna hai:\nTemp item { pending: true } — opacity/style se dikhao.\n\nSeedha matlab:\nUser ko pata optimistic hai — honest UX.\nReact 18: same visual pattern with temp ids.\nServer confirm ke baad pending: false real id se replace.\nEdge: duplicate temp ids — use unique temp keys.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function PendingVisualTodos() {\n  const [todos, setTodos] = useState([]);\n  const [optTodos, addOpt] = useOptimistic(todos, (cur, t) => [...cur, t]);\n\n  async function add(formData) {\n    const title = String(formData.get(\"title\") || \"\");\n    const temp = { id: \"tmp-\" + Date.now(), title, pending: true };\n    addOpt(temp);\n    await fakeLikeApi(true);\n    setTodos((list) => [...list, { id: crypto.randomUUID(), title, pending: false }]);\n  }\n\n  return (\n    <form action={add}>\n      <input name=\"title\" />\n      <button>Add</button>\n      <ul>\n        {optTodos.map((t) => (\n          <li key={t.id} style={{ opacity: t.pending ? 0.6 : 1 }}>\n            {t.title} {t.pending ? \"(saving)\" : \"\"}\n          </li>\n        ))}\n      </ul>\n    </form>\n  );\n}"
          },
          {
            "title": "Q12: [MID] React 18 manual optimistic — contrast code idea",
            "explain": "Kya karna hai:\nconst [display, setDisplay]=useState(real); onClick: setDisplay(opt); fetch; catch revert.\n\nSeedha matlab:\nManual revert: setDisplay(realSnapshot) on fail.\nuseOptimistic: base state unchanged on fail → auto rollback to base.\nLess bug-prone — no forgotten revert branch.\nMigration: replace temp display state with useOptimistic(realState).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const react18ManualOptimistic =\n  \"temp useState + try/catch revert → 19 useOptimistic(baseState) auto-syncs on failure.\";"
          },
          {
            "title": "Q13: startTransition + useOptimistic",
            "explain": "Kya karna hai:\nDocs recommend optimistic updates inside transition/action context.\n\nSeedha matlab:\nForm action={fn} already transition-like for updates.\nRandom setState outside → UI flash / tearing possible in edge cases.\nReact 18 startTransition + manual optimistic same pairing advice.\nuseTransition isPending alag hai useOptimistic se — dono combine ho sakte.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function TransitionOptimisticNote() {\n  return (\n    <p>\n      Call addOptimistic inside form action or startTransition callback — keeps updates\n      concurrent-friendly.\n    </p>\n  );\n}"
          },
          {
            "title": "Q14: [MID] Stale closure in onLike — trap",
            "explain": "Kya karna hai:\nsetOptimisticLikes(likes + 1) — likes stale ho sakta rapid clicks me.\n\nSeedha matlab:\nFunctional base update better: setOptimisticLikes(c => c + 1) pattern nahi — useOptimistic send current+delta.\nGuard inflight ref (Q6) ya disable while pending.\nReact 18 same stale closure in async handlers.\nFix: useOptimistic updateFn (current, delta) => current + delta.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function StaleClosureLikeFix() {\n  const [likes, setLikes] = useState(0);\n  const [optLikes, addLike] = useOptimistic(likes, (current, delta) => current + delta);\n\n  async function onLike() {\n    addLike(1);\n    await fakeLikeApi(true);\n    setLikes((n) => n + 1);\n  }\n\n  return <button onClick={onLike}>Likes: {optLikes}</button>;\n}"
          },
          {
            "title": "Q15: Delete optimistic — remove from list before server",
            "explain": "Kya karna hai:\naddOptimistic filter out id; fail pe item wapas base list se aayega.\n\nSeedha matlab:\nupdateFn: (cur, id) => cur.filter(x => x.id !== id)\nFail → don't update base → optimistic reverts showing item again + error toast.\nReact 18: optimistic filter + restore array on catch.\nWhen NOT: irreversible delete UX — wait for server confirm.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function OptimisticDelete() {\n  const [items, setItems] = useState([\n    { id: \"1\", title: \"A\" },\n    { id: \"2\", title: \"B\" },\n  ]);\n  const [optItems, markDeleted] = useOptimistic(items, (cur, id) =>\n    cur.filter((x) => x.id !== id)\n  );\n\n  async function remove(id) {\n    markDeleted(id);\n    try {\n      await fakeLikeApi(true);\n      setItems((list) => list.filter((x) => x.id !== id));\n    } catch {\n      // rollback automatic\n    }\n  }\n\n  return (\n    <ul>\n      {optItems.map((i) => (\n        <li key={i.id}>\n          {i.title}{\" \"}\n          <button type=\"button\" onClick={() => remove(i.id)}>\n            Del\n          </button>\n        </li>\n      ))}\n    </ul>\n  );\n}"
          },
          {
            "title": "Q16: [MID] useOptimistic without second arg",
            "explain": "Kya karna hai:\nuseOptimistic(state) — setOptimistic(next) directly sets optimistic value.\n\nSeedha matlab:\nShorthand jab poora next state pass ho (rename string).\nFile Q4 OptimisticInsideAction example.\nReact 18: setTempState(next) equivalent.\nupdateFn wala form zyada flexible lists/carts ke liye.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function ShorthandOptimistic() {\n  const [label, setLabel] = useState(\"Draft\");\n  const [optLabel, setOptLabel] = useOptimistic(label);\n\n  async function save(formData) {\n    const next = String(formData.get(\"label\") || \"\");\n    setOptLabel(next);\n    await fakeLikeApi(true);\n    setLabel(next);\n  }\n\n  return (\n    <form action={save}>\n      <p>{optLabel}</p>\n      <input name=\"label\" defaultValue={label} />\n      <button>Save</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q17: Multiple optimistic fields — one base state object",
            "explain": "Kya karna hai:\nBase { name, qty }; optimistic overlay whole object or field patches.\n\nSeedha matlab:\nupdateFn merge patches: (cur, patch) => ({ ...cur, ...patch })\nReact 18: clone object manually for temp view.\nKeep base updates atomic on server success.\nEdge: partial fail — which fields rollback? design per field or whole object.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function OptimisticObjectPatch() {\n  const [cart, setCart] = useState({ name: \"Bag\", qty: 1 });\n  const [optCart, patch] = useOptimistic(cart, (cur, p) => ({ ...cur, ...p }));\n\n  async function rename(formData) {\n    const name = String(formData.get(\"name\") || \"\");\n    patch({ name });\n    await fakeLikeApi(true);\n    setCart((c) => ({ ...c, name }));\n  }\n\n  return (\n    <form action={rename}>\n      <p>\n        {optCart.name} × {optCart.qty}\n      </p>\n      <input name=\"name\" defaultValue={cart.name} />\n      <button>Rename</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q18: [ADV] Race — out-of-order server responses",
            "explain": "Kya karna hai:\nRequest A slow, B fast — B then A arrive → stale overwrite risk on base state.\n\nSeedha matlab:\nOptimistic rollback base pe — base update me request id / abort controller.\nReact 18: ignore stale responses with counter ref.\nuseOptimistic doesn't replace response ordering guards on setState.\nPattern: if (reqId !== latestRef.current) return prev;",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function RaceGuardNote() {\n  return (\n    <p>\n      useOptimistic handles failed optimistic overlay; still guard setState/base updates\n      against out-of-order network responses with ids or AbortController.\n    </p>\n  );\n}"
          },
          {
            "title": "Q19: [MID] When NOT useOptimistic — expand",
            "explain": "Kya karna hai:\nFinancial confirm, legal consent, medical doses — server truth first.\n\nSeedha matlab:\nLow-risk social UI = good fit (likes, comments, todo add).\nHigh-risk = spinner until server OK — user trust matters.\nReact 18 same guidance — optimistic is product decision.\nMisleading success worse than short wait.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const whenNotOptimisticExpanded = [\n  \"payments & money\",\n  \"irreversible deletes without undo\",\n  \"inventory last-item purchase\",\n  \"compliance/audit trails\",\n  \"medical or safety critical\",\n];"
          },
          {
            "title": "Q20: Server Action + useOptimistic (file 38 link)",
            "explain": "Kya karna hai:\nClient form action server fn — optimistic client pe, mutation server pe.\n\nSeedha matlab:\naddOptimistic before await serverAction(formData).\nServer fail return → base unchanged → rollback + show error.\nReact 18: optimistic client + fetch API route same architecture.\nRSC: optimistic always client-side hook — 'use client' required.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const serverOptimistic =\n  \"Optimistic UI runs in client components; server action confirms mutation.\";"
          },
          {
            "title": "Q21: [ADV] Testing optimistic flows",
            "explain": "Kya karna hai:\nMock slow API; assert UI shows optimistic then final; mock fail assert rollback.\n\nSeedha matlab:\nRTL: click → expect temp text → resolve promise → expect final.\nFail path: reject promise → expect original list count.\nReact 18 tests same structure — hook reduces manual revert code to test.\nFlaky tests if timing — use fake timers or controllable promises.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function TestingOptimisticNote() {\n  return <p>Test success and failure paths — optimistic should match base after fail.</p>;\n}"
          },
          {
            "title": "Q22: [ADV] Interview answer template",
            "explain": "Kya karna hai:\nDefine optimistic UI → useOptimistic(base, updateFn) → rollback on unchanged base.\n\nSeedha matlab:\nvs React 18: manual temp state + revert.\nvs useActionState: action state is truth; optimistic is overlay.\nTraps: high-risk flows; stale races on base; forget error toast on rollback.\nPair with Actions/transitions; disable double submit.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export const optimisticInterviewTemplate = {\n  definition: \"show success before server confirms; rollback if base unchanged\",\n  api: \"useOptimistic(baseState, updateFn) → [optimistic, addOptimistic]\",\n  react18: \"manual temp state + try/catch revert\",\n  traps: [\"high-risk domains\", \"out-of-order responses\", \"missing error UX on rollback\"],\n};"
          }
        ]
      },
      {
        "file": "33_React19_useHook.jsx",
        "title": "33 — use() Hook",
        "kya": "`use` = naya hook jo Promise YA Context padh sakta hai.",
        "detail": "33 — React 19 `use` hook (promises + context)\nLevel: REACT19  |  Sequence seekho: pehle yeh file, phir agla number\n\nLAYMAN: `use` = naya hook jo Promise YA Context padh sakta hai.\n\nuse(promise) → Promise resolve hone tak Suspense fallback;\nreject → nearest Error Boundary.\nuse(context) → useContext jaisa, LEKIN conditional / loops me bhi chal sakta\n(hooks rules ka special exception — sirf `use` ke liye).\n\nSocho: useState/useEffect \"hamesha top-level same order\".\n`use` = \"jab chaho pehle condition check, phir context/promise padho\".\n\nKYUN: React 19 ka signature API; RSC + client data patterns.\nINTERVIEW: conditional use OK?; use vs useContext; Suspense pairing.",
        "intro": "33 — React 19 `use` hook (promises + context)\nLevel: REACT19  |  Sequence seekho: pehle yeh file, phir agla number\n\nLAYMAN: `use` = naya hook jo Promise YA Context padh sakta hai.\n\nuse(promise) → Promise resolve hone tak Suspense fallback;\nreject → nearest Error Boundary.\nuse(context) → useContext jaisa, LEKIN conditional / loops me bhi chal sakta\n(hooks rules ka special exception — sirf `use` ke liye).\n\nSocho: useState/useEffect \"hamesha top-level same order\".\n`use` = \"jab chaho pehle condition check, phir context/promise padho\".\n\nKYUN: React 19 ka signature API; RSC + client data patterns.\nINTERVIEW: conditional use OK?; use vs useContext; Suspense pairing.",
        "questions": [
          {
            "title": "Q1: use(promise) + Suspense",
            "explain": "Seedha matlab:\nComponent render me use(promise) — unwrap value.\nParent Suspense boundary zaroori warna error/hang feel.\nPromise identity stable rakho (module cache / state) — har render naya Promise = loop risk.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const cache = new Map();\n\nfunction fetchUser(id) {\n  const key = String(id);\n  if (!cache.has(key)) {\n    cache.set(\n      key,\n      new Promise((resolve) => {\n        setTimeout(() => resolve({ id, name: \"Ada \" + id }), 500);\n      })\n    );\n  }\n  return cache.get(key);\n}\n\nfunction User({ id }) {\n  const user = use(fetchUser(id));\n  return <p>{user.name}</p>;\n}\n\nexport function UserPage() {\n  return (\n    <Suspense fallback={<p>Loading user...</p>}>\n      <User id={1} />\n    </Suspense>\n  );\n}"
          },
          {
            "title": "Q2: [MID] Har render pe naya Promise = bug",
            "explain": "Seedha matlab:\nuse(fetch()) seedha render me bina cache → infinite suspend.\nFix: cache, lift promise, ya framework loader (RSC fetch dedupe).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function BadUser() {\n  // ❌ const user = use(fetch('/api')); // new promise every render\n  return null;\n}"
          },
          {
            "title": "Q3: use(context) basic",
            "explain": "Seedha matlab:\ncreateContext + Provider; child me use(ThemeContext).\nuseContext(ThemeContext) bhi same value — use zyada flexible jagah.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const ThemeContext = createContext(\"light\");\n\nfunction ThemedBox() {\n  const theme = use(ThemeContext);\n  return <div data-theme={theme}>Theme: {theme}</div>;\n}\n\nexport function ThemeApp() {\n  return (\n    <ThemeContext value=\"dark\">\n      <ThemedBox />\n    </ThemeContext>\n  );\n}"
          },
          {
            "title": "Q4: [MID] Conditional use(context) — allowed",
            "explain": "Seedha matlab:\nNormal hooks: if ke andar useState ❌\nuse(context): if ke andar ✅ (React 19 design)\nKyun useful: optional context read jab prop missing ho.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const LabelContext = createContext(null);\n\nfunction Button({ label: labelProp }) {\n  let label = labelProp;\n  if (label == null) {\n    label = use(LabelContext);\n  }\n  return <button>{label ?? \"OK\"}</button>;\n}\n\nexport function ConditionalUseDemo() {\n  return (\n    <LabelContext value=\"From context\">\n      <Button />\n      <Button label=\"Prop wins\" />\n    </LabelContext>\n  );\n}"
          },
          {
            "title": "Q5: use(promise) conditional — carefully",
            "explain": "Seedha matlab:\nCondition true hone pe hi use(promise) call.\nFalse branch pe call mat karo — warna unnecessary Suspense.\nRules: still don't call after early return inconsistently across renders\nin a way that breaks other hooks' order — other hooks still top-level!",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function MaybeUser({ id, enabled }) {\n  // other hooks FIRST, always:\n  const [extra, setExtra] = useState(\"\");\n  if (!enabled) {\n    return <p>Disabled {extra}</p>;\n  }\n  const user = use(fetchUser(id));\n  return (\n    <p onClick={() => setExtra(\"x\")}>\n      {user.name}\n    </p>\n  );\n}\n\nexport function MaybeUserGate() {\n  return (\n    <Suspense fallback={<p>...</p>}>\n      <MaybeUser id={2} enabled />\n    </Suspense>\n  );\n}"
          },
          {
            "title": "Q6: Error — rejected promise",
            "explain": "Seedha matlab:\nuse(rejectedPromise) → Error Boundary catch.\nSuspense sirf pending; errors boundary pe.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const failPromise = Promise.reject(new Error(\"boom\"));\n// Prevent unhandled rejection noise in some runtimes during module eval:\nfailPromise.catch(() => {});\n\nfunction Failing() {\n  use(failPromise);\n  return null;\n}\n\nexport function WithErrorBoundaryIdea() {\n  // Wrap <Failing /> in your ErrorBoundary + Suspense in real app\n  return (\n    <Suspense fallback={<p>Loading</p>}>\n      {/* <ErrorBoundary><Failing /></ErrorBoundary> */}\n      <p>See Error Boundary docs for reject path</p>\n    </Suspense>\n  );\n}"
          },
          {
            "title": "Q7: [MID] use vs useContext — interview answer",
            "explain": "Seedha matlab:\nSame context value.\nuse → conditionals/loops allowed for THAT read.\nuseContext → classic hook rules (top-level only).\nPromise padhna sirf use se.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const interview = {\n  use: \"promise unwrap + flexible context read\",\n  useContext: \"context only, strict hook rules\",\n};"
          },
          {
            "title": "Q8: Server Component se promise pass (mental model)",
            "explain": "Seedha matlab:\nServer Component fetch karke Promise child Client Component ko prop —\nclient me use(promise). RSC + use bridge.\nDetail: file 37.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "// // Server: <Client userPromise={fetchUser(1)} />\n// // Client: const user = use(userPromise);"
          },
          {
            "title": "Q9: Hooks rules summary for this file",
            "explain": "Seedha matlab:\n• useState/useEffect/etc — ab bhi top-level, same order\n• use() — exception for conditional context/promise\n• Baaki hooks ko use() ke exception ke peeche mat chhupao",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const rules = [\n  \"Other hooks: always top-level\",\n  \"use(context|promise): can be conditional\",\n  \"Stable promise identity for use(promise)\",\n];"
          },
          {
            "title": "Q10: [MID] use(promise) in loop — allowed but careful",
            "explain": "Kya karna hai:\nitems.map(id => <Row key={id} id={id} />) — Row me use(fetchUser(id)).\n\nSeedha matlab:\nHar Row apna cached promise use kare — stable per id.\nReact 18: useEffect per row fetch — waterfall common problem.\nTrap: loop me har render naya Promise.create — suspend loop.\nPattern: cache Map keyed by id (Q1 fetchUser).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function UserRow({ id }) {\n  const user = use(fetchUser(id));\n  return <li>{user.name}</li>;\n}\n\nexport function UserList({ ids }) {\n  return (\n    <Suspense fallback={<p>Loading users...</p>}>\n      <ul>\n        {ids.map((id) => (\n          <UserRow key={id} id={id} />\n        ))}\n      </ul>\n    </Suspense>\n  );\n}"
          },
          {
            "title": "Q11: Preload / warm cache before Suspense",
            "explain": "Kya karna hai:\nComponent render se pehle fetchUser(id) call — promise cache me seed.\n\nSeedha matlab:\nHover pe prefetch → click pe instant use(promise) resolve feel.\nReact 18: queryClient.prefetchQuery same idea (TanStack).\nuse() needs Suspense boundary ancestor — prefetch doesn't remove boundary.\nEdge: prefetch fail — Error Boundary on use().",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function PreloadPattern({ id }) {\n  // teaching: onMouseEnter={() => fetchUser(id)} to warm cache\n  return (\n    <Suspense fallback={<p>...</p>}>\n      <User id={id} />\n    </Suspense>\n  );\n}"
          },
          {
            "title": "Q12: [MID] use(Context) in loop — conditional per item",
            "explain": "Kya karna hai:\nOptional context per row — if (needsTheme) use(ThemeContext) allowed pattern variant.\n\nSeedha matlab:\nNormal useContext loop me ❌ rules break if conditional per iteration inconsistently.\nuse() exception — still design carefully; don't mix hook order other hooks ke saath.\nReact 18: pass theme prop instead to avoid conditional context read.\nPrefer explicit props when simple — use() power jab condition real ho.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function MaybeThemed({ useTheme }) {\n  let theme = \"light\";\n  if (useTheme) {\n    theme = use(ThemeContext);\n  }\n  return <span data-theme={theme}>Box</span>;\n}\n\nexport function MaybeThemedDemo() {\n  return (\n    <ThemeContext value=\"dark\">\n      <MaybeThemed useTheme />\n      <MaybeThemed useTheme={false} />\n    </ThemeContext>\n  );\n}"
          },
          {
            "title": "Q13: use vs useContext — migration note",
            "explain": "Kya karna hai:\nExisting code useContext — replace only when conditional read chahiye.\n\nSeedha matlab:\nuseContext top-level reads — no rush to migrate all.\nReact 19: use(Context) new provider syntax compatible (file 36).\nInterview: \"same value; use allows conditional; useContext stricter rules\".\nBoth work for unconditional read — team pick one style.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const useVsUseContextMigration =\n  \"Keep useContext for simple reads; adopt use() when conditional context/promise needed.\";"
          },
          {
            "title": "Q14: [ADV] Promise cache invalidation",
            "explain": "Kya karna hai:\nUser refresh button — cache.delete(key); new Promise create; remount or key bump.\n\nSeedha matlab:\nStale use(promise) cache → wrong data until invalidate.\nReact 18 Query: invalidateQueries built-in.\nPattern: key={version} on Suspense child to reset subtree.\nrefetch = new promise reference + state version increment.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function RefreshUser({ id, version }) {\n  return (\n    <Suspense key={version} fallback={<p>Loading...</p>}>\n      <User id={id} />\n    </Suspense>\n  );\n}"
          },
          {
            "title": "Q15: [MID] use(promise) without Suspense — trap",
            "explain": "Kya karna hai:\nBoundary missing → React error / hang depending on setup.\n\nSeedha matlab:\nAlways wrap consuming tree in <Suspense fallback={...}>.\nReact 18 Suspense for lazy only common; 19 use(promise) extends Suspense data.\nDev error message padho — \"A component suspended while rendering...\"\nNested Suspense for granular loading UI.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function MissingSuspenseTrap() {\n  // ❌ <User id={1} /> without Suspense parent\n  return (\n    <Suspense fallback={<p>Need this wrapper</p>}>\n      <User id={1} />\n    </Suspense>\n  );\n}"
          },
          {
            "title": "Q16: Context default + use() read",
            "explain": "Kya karna hai:\ncreateContext(null) — Provider missing pe default null; use() se read.\n\nSeedha matlab:\nif (ctx === null) fallback UI — optional context pattern.\nReact 18 useContext same default behavior.\nuse() conditional: only call when you know provider might exist — still tricky.\nExplicit optional prop often clearer than magic default.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const OptionalCtx = createContext(null);\n\nfunction OptionalConsumer() {\n  const value = use(OptionalCtx);\n  return <p>{value ?? \"no provider\"}</p>;\n}\n\nexport function OptionalContextDemo() {\n  return <OptionalConsumer />;\n}"
          },
          {
            "title": "Q17: [MID] Client Component use(promise) from Server prop",
            "explain": "Kya karna hai:\nServer: const p = fetchUser(); return <Client userPromise={p} />.\n\nSeedha matlab:\nClient: 'use client'; function C({ userPromise }) { const u = use(userPromise); }\nReact 18: no RSC — fetch in useEffect instead.\nSerialization: promise special RSC channel — not manual in CSR.\nWaterfall avoid: server await vs pass promise to client parallel strategies.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const rscPromiseBridge =\n  \"Server creates promise → Client use(promise) with Suspense — see file 37.\";"
          },
          {
            "title": "Q18: use() after early return — hooks order trap",
            "explain": "Kya karna hai:\nOther hooks (useState) hamesha pehle; phir conditional return; phir use().\n\nSeedha matlab:\nMaybeUser Q5 pattern — useState top, then if (!enabled) return, then use(promise).\n❌ use() pehle, phir useState — order flip breaks rules.\nuse() exception ≠ all hooks rules gone.\nReact 18: no use() — classic rules only.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function HooksOrderReminder() {\n  return (\n    <p>\n      Other hooks first (always same order); then conditional return; then use() if needed.\n    </p>\n  );\n}"
          },
          {
            "title": "Q19: [ADV] Error boundary + Suspense stacking",
            "explain": "Kya karna hai:\nErrorBoundary wraps Suspense wraps DataComponent — order matters for UX.\n\nSeedha matlab:\nPending → Suspense fallback; reject → Error Boundary UI.\nReact 18 Error Boundary same — no promise unwrap built-in.\nresetKeys on boundary to retry after use(promise) fail.\nLog rejected promise reason in boundary componentDidCatch equivalent.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function BoundaryStackNote() {\n  return (\n    <p>\n      Typical: ErrorBoundary outside Suspense outside component calling use(promise).\n    </p>\n  );\n}"
          },
          {
            "title": "Q20: [MID] When NOT use(promise)",
            "explain": "Kya karna hai:\nClient-only CSR without Suspense appetite — useEffect + useState familiar path.\n\nSeedha matlab:\nTanStack Query mature caching/refetch — team already invested.\nHighly dynamic refetch intervals — Query devtools better.\nuse(promise) sweet spot: RSC bridge + Suspense-first apps.\nReact 18 onClick fetch doesn't need use().",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const whenNotUseHook = [\n  \"no Suspense boundaries in app\",\n  \"TanStack Query already standard\",\n  \"simple one-off useEffect fetch\",\n];"
          },
          {
            "title": "Q21: [ADV] Testing components with use(promise)",
            "explain": "Kya karna hai:\nTest me resolved promise pass: use(Promise.resolve({ name: 'Test' })).\n\nSeedha matlab:\nWrap in Suspense in test renderer.\nReject path: Promise.reject + Error Boundary test helper.\nReact 18: mock fetch + waitFor — different pattern.\nStable resolved promise per test — new each render breaks.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function TestUser({ userPromise }) {\n  const user = use(userPromise);\n  return <p>{user.name}</p>;\n}\n\nexport function TestingUsePromiseDemo() {\n  const resolved = Promise.resolve({ name: \"Test User\" });\n  return (\n    <Suspense fallback={null}>\n      <TestUser userPromise={resolved} />\n    </Suspense>\n  );\n}"
          },
          {
            "title": "Q22: [ADV] Interview traps — use() checklist",
            "explain": "Kya karna hai:\n5 traps: new promise each render, no Suspense, wrong hook order, useContext conditional confusion, cache stale.\n\nSeedha matlab:\nReact 18 contrast: useEffect fetch vs Suspense use(promise).\nuse() reads promises AND context — not replacement for all data fetching.\n\"Can I use hooks in if?\" — only use(), not useState.\nOfficial name is `use` not useHook — file name teaching shorthand.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export const useHookInterviewTraps = [\n  \"new Promise every render → infinite suspend\",\n  \"missing Suspense boundary\",\n  \"use() before other hooks / inconsistent order\",\n  \"thinking all hooks can be conditional\",\n  \"stale promise cache without invalidation\",\n];"
          }
        ]
      },
      {
        "file": "34_React19_RefAsProp.jsx",
        "title": "34 — Ref As Prop",
        "kya": "Pehle ref special tha — props me nahi milta tha.",
        "detail": "34 — React 19 ref as prop (forwardRef legacy)\nLevel: REACT19  |  Sequence seekho: pehle yeh file, phir agla number\n\nLAYMAN: Pehle ref special tha — props me nahi milta tha.\nIsliye forwardRef(function (props, ref) { ... }) likhna padta.\n\nReact 19: ref normal prop hai — function Component({ ref, ... }) {\n  return <input ref={ref} />\n}\n\nforwardRef ab bhi kaam karta (libraries / purana code) — naya code me\nusually zaroori nahi. Class components alag history.\n\nKYUN: Boilerplate kam; mid interviews \"forwardRef kyun tha?\" ab context.\nINTERVIEW: ref prop vs forwardRef; callback refs; useImperativeHandle.",
        "intro": "34 — React 19 ref as prop (forwardRef legacy)\nLevel: REACT19  |  Sequence seekho: pehle yeh file, phir agla number\n\nLAYMAN: Pehle ref special tha — props me nahi milta tha.\nIsliye forwardRef(function (props, ref) { ... }) likhna padta.\n\nReact 19: ref normal prop hai — function Component({ ref, ... }) {\n  return <input ref={ref} />\n}\n\nforwardRef ab bhi kaam karta (libraries / purana code) — naya code me\nusually zaroori nahi. Class components alag history.\n\nKYUN: Boilerplate kam; mid interviews \"forwardRef kyun tha?\" ab context.\nINTERVIEW: ref prop vs forwardRef; callback refs; useImperativeHandle.",
        "questions": [
          {
            "title": "Q1: React 19 style — ref as prop",
            "explain": "Seedha matlab:\nParent <Input ref={inputRef} />.\nChild function param me ref milta — DOM ko forward.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Input({ ref, placeholder }) {\n  return <input ref={ref} placeholder={placeholder} />;\n}\n\nexport function FocusDemo() {\n  const inputRef = useRef(null);\n\n  useEffect(() => {\n    inputRef.current?.focus();\n  }, []);\n\n  return <Input ref={inputRef} placeholder=\"Auto focus\" />;\n}"
          },
          {
            "title": "Q2: Purana forwardRef (legacy / library compat)",
            "explain": "Seedha matlab:\nSame behavior, extra wrap.\nNaye projects me prefer ref prop.\nPurani lib support ke liye forwardRef dekhna pad sakta.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const LegacyInput = forwardRef(function LegacyInput(props, ref) {\n  return <input ref={ref} {...props} />;\n});\n\nexport function LegacyFocusDemo() {\n  const ref = useRef(null);\n  return <LegacyInput ref={ref} placeholder=\"Legacy forwardRef\" />;\n}"
          },
          {
            "title": "Q3: [MID] ref function component pe bina forward / bina prop?",
            "explain": "Seedha matlab:\nReact 18 me warning / ignore — ref props me nahi aata tha.\nReact 19 me aata hai. Version matter karta interview me clear bolo.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const versionNote = {\n  react18: \"need forwardRef to pass ref to function components\",\n  react19: \"ref is a regular prop\",\n};"
          },
          {
            "title": "Q4: Callback ref",
            "explain": "Seedha matlab:\nref={(node) => { ... }} — mount pe node, unmount pe null.\nMeasuring DOM / third-party attach ke liye.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function CallbackRefMeasure() {\n  return (\n    <div\n      ref={(node) => {\n        if (node) {\n          console.log(\"width\", node.getBoundingClientRect().width);\n        }\n      }}\n    >\n      Measure me\n    </div>\n  );\n}"
          },
          {
            "title": "Q5: [MID] useImperativeHandle — parent ko limited API",
            "explain": "Seedha matlab:\nKabhi parent ko poora DOM nahi — sirf focus() / scrollTo().\nuseImperativeHandle(ref, () => ({ focus() { ... } }))\nReact 19: ref prop + useImperativeHandle combo.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function FancyInput({ ref }) {\n  const inner = useRef(null);\n  useImperativeHandle(ref, () => ({\n    focus: () => inner.current?.focus(),\n    clear: () => {\n      if (inner.current) inner.current.value = \"\";\n    },\n  }));\n  return <input ref={inner} />;\n}\n\nexport function ImperativeParent() {\n  const api = useRef(null);\n  return (\n    <div>\n      <FancyInput ref={api} />\n      <button onClick={() => api.current?.focus()}>Focus</button>\n      <button onClick={() => api.current?.clear()}>Clear</button>\n    </div>\n  );\n}"
          },
          {
            "title": "Q6: Multiple refs merge idea",
            "explain": "Seedha matlab:\nLibrary ko bhi ref chahiye + parent ko bhi — callback me dono set.\nYa tiny setRefs helper.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function setRefs(...refs) {\n  return (node) => {\n    for (const r of refs) {\n      if (typeof r === \"function\") r(node);\n      else if (r) r.current = node;\n    }\n  };\n}\n\nexport function MergeRefsDemo() {\n  const a = useRef(null);\n  const b = useRef(null);\n  return <input ref={setRefs(a, b)} />;\n}"
          },
          {
            "title": "Q7: ref on custom component — kya point karta?",
            "explain": "Seedha matlab:\nJab tak child ref ko DOM (ya imperative handle) pe na lagaye,\nparent.current null / useless.\nDocument karo: \"yeh component ref ko input pe forward karta\".",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Broken({ ref }) {\n  // ref accept kiya but kahin attach nahi ❌\n  return <input />;\n}\n\nfunction Fixed({ ref }) {\n  return <input ref={ref} />; // ✅\n}"
          },
          {
            "title": "Q8: [MID] Interview closer",
            "explain": "Seedha matlab:\n\"React 19 me forwardRef mostly legacy; ref prop standard.\nuseImperativeHandle se controlled escape hatch.\nRef updates commit phase — render me ref.current mat padho logic ke liye.\"",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const closer =\n  \"ref as prop in 19; forwardRef legacy; don't read ref during render for data flow.\";"
          },
          {
            "title": "Q9: ref prop name collision — 'ref' reserved feel",
            "explain": "Kya karna hai:\nProp naam ref rakho carefully — DOM ref forward ke liye; alag data ke liye inputRef use karo.\n\nSeedha matlab:\nReact 19 me ref special prop slot jaisa behave — forward to DOM.\nAgar product code me ref=\"something\" string chahiye tha — rename (conflict rare).\nReact 18 forwardRef alag param — collision kam tha.\nTypeScript: ComponentPropsWithRef types update in @types/react 19.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function LabeledInput({ ref, label }) {\n  return (\n    <label>\n      {label}\n      <input ref={ref} />\n    </label>\n  );\n}\n\nexport function RefPropLabelDemo() {\n  const r = useRef(null);\n  return <LabeledInput ref={r} label=\"Email\" />;\n}"
          },
          {
            "title": "Q10: [MID] TypeScript ref prop typing sketch",
            "explain": "Kya karna hai:\nProps me ref?: Ref<HTMLInputElement> — @types/react 19 helpers.\n\nSeedha matlab:\nforwardRef generic types ab optional simpler components me.\nReact 18: ForwardRefRenderFunction boilerplate types.\nMigration: remove forwardRef wrapper first, keep ref in props interface.\nLibraries publish both patterns during transition.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const tsRefNote =\n  \"React 19 types: ref on props directly; Ref<T> on function component props.\";"
          },
          {
            "title": "Q11: ref null on unmount — callback ref",
            "explain": "Kya karna hai:\nref={(node) => { ... }} — unmount pe node null aata hai.\n\nSeedha matlab:\nCleanup measure listeners jab node null.\nReact 18/19 same callback ref semantics.\nuseImperativeHandle parent ref stable — inner unmount separate lifecycle.\nTrap: ref callback inline har render new — re-run attach/detach; useCallback stabilize.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function CallbackRefCleanup() {\n  return (\n    <div\n      ref={(node) => {\n        if (node) {\n          node.dataset.mounted = \"1\";\n        }\n      }}\n    >\n      Callback ref mount marker\n    </div>\n  );\n}"
          },
          {
            "title": "Q12: [MID] forwardRef migration steps",
            "explain": "Kya karna hai:\n1) forwardRef hatao 2) ref ko props me lo 3) tests snapshot update.\n\nSeedha matlab:\nconst X = forwardRef(fn) → function X({ ref, ...props }).\nReact 18 lib consumers still pass ref — 19 native prop accepts.\nDeprecation warnings 18.3 — forwardRef still works 19.\nWhen NOT migrate yet: peer dep libs expecting forwardRef displayName hacks.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const forwardRefMigration = [\n  \"unwrap forwardRef to plain function\",\n  \"add ref to destructured props\",\n  \"forward ref to DOM or useImperativeHandle\",\n  \"keep forwardRef temporarily if lib API requires\",\n];"
          },
          {
            "title": "Q13: ref to class component — unchanged",
            "explain": "Kya karna hai:\nClass components pe ref = instance; function ref prop change unko affect nahi.\n\nSeedha matlab:\nReact 19 ref-as-prop = function components ke liye DX win.\nClass createRef/useRef attach instance — same as 18.\nMixed codebase: class leaf + function wrapper patterns coexist.\nNew code: function + ref prop preferred.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function ClassRefNote() {\n  return <p>Class component refs still point to class instance — unchanged in 19.</p>;\n}"
          },
          {
            "title": "Q14: [ADV] useImperativeHandle + ref prop together",
            "explain": "Kya karna hai:\nFancyInput({ ref }) { useImperativeHandle(ref, () => ({ focus })); ... }\n\nSeedha matlab:\nParent ko limited API — encapsulation.\nReact 18 forwardRef + useImperativeHandle classic pair.\nReact 19: ref prop replaces forwardRef only — imperative handle same.\nDon't expose entire DOM unless needed — maintenance boundary.\nReturn object stable-ish — new object each call usually OK for handles.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Meter({ ref }) {\n  const inner = useRef(null);\n  useImperativeHandle(ref, () => ({\n    fill: (pct) => {\n      if (inner.current) inner.current.style.width = pct + \"%\";\n    },\n  }));\n  return <div ref={inner} style={{ height: 8, background: \"#eee\", width: \"100%\" }} />;\n}\n\nexport function MeterParent() {\n  const api = useRef(null);\n  return (\n    <div>\n      <Meter ref={api} />\n      <button type=\"button\" onClick={() => api.current?.fill(75)}>\n        75%\n      </button>\n    </div>\n  );\n}"
          },
          {
            "title": "Q15: [MID] Reading ref.current during render — trap",
            "explain": "Kya karna hai:\nrender me if (ref.current) width = ... ❌ — layout flicker / rules.\n\nSeedha matlab:\nRef commit ke baad update — render phase me mat padho UI logic ke liye.\nReact 18 same rule — ref not reactive state.\nMeasure: useLayoutEffect ya callback ref.\nCompiler doesn't make ref.current reactive — still imperative escape hatch.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function NoRefDuringRender() {\n  const divRef = useRef(null);\n  // ❌ const w = divRef.current?.offsetWidth during render for display\n  useEffect(() => {\n    if (divRef.current) console.log(\"width after commit\", divRef.current.offsetWidth);\n  }, []);\n  return <div ref={divRef}>Measure in effect</div>;\n}"
          },
          {
            "title": "Q16: Third-party lib mergeRefs",
            "explain": "Kya karna hai:\nLib internal ref + parent ref — setRefs helper (Q6) ya mergeRefs util.\n\nSeedha matlab:\nreact-merge-refs package common in libs.\nReact 19 ref prop parent side same merge need.\nReact 18 forwardRef libs often merge inside.\nTrap: overwrite ref — last writer wins without merge.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function LibMergeRefsDemo() {\n  const parentRef = useRef(null);\n  const libRef = useRef(null);\n  return <input ref={setRefs(parentRef, libRef)} placeholder=\"merged\" />;\n}"
          },
          {
            "title": "Q17: [MID] ref on composite component — document contract",
            "explain": "Kya karna hai:\nJSDoc: \"@param ref forwarded to underlying <input />\"\n\nSeedha matlab:\nBroken component Q7 — accept ref but no attach = bug.\nDesign systems explicit: RefForwardedInput exports type.\nReact 18 forwardRef displayName for DevTools — ref prop components name function.\nTesting: parent ref.current focus() integration test.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function DocumentedInput({ ref, ...rest }) {\n  return <input ref={ref} {...rest} />;\n}\n\nexport function DocumentedParent() {\n  const r = useRef(null);\n  return <DocumentedInput ref={r} aria-label=\"documented\" />;\n}"
          },
          {
            "title": "Q18: String ref legacy — don't use",
            "explain": "Kya karna hai:\nref=\"myRef\" string refs removed long ago — useRef/createRef only.\n\nSeedha matlab:\nReact 19 assumes modern ref API.\nReact 18 already no string refs.\nInterview historical: string refs old class era.\nCallback ref + useRef cover all cases.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const stringRefNote = \"String refs dead — useRef or callback ref only.\";"
          },
          {
            "title": "Q19: [ADV] When NOT ref — state/props instead",
            "explain": "Kya karna hai:\nChild value read karne ke liye ref abuse mat karo — lift state up.\n\nSeedha matlab:\nref = imperative DOM/focus/scroll/measure — not data flow.\nReact 18 same anti-pattern.\nForm values: controlled state or FormData submit — ref.current.value scrape fragile.\nParent needs text → value/onChange props.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function PreferStateOverRef() {\n  const [text, setText] = useState(\"\");\n  return (\n    <input value={text} onChange={(e) => setText(e.target.value)} />\n  );\n}"
          },
          {
            "title": "Q20: [MID] Server Components — refs client-only",
            "explain": "Kya karna hai:\nref use karne wala component 'use client' hona chahiye.\n\nSeedha matlab:\nServer Component me ref meaningless — no DOM instance client-side lifecycle same way.\nPass ref to client child that wraps DOM element.\nReact 18 CSR everything client — RSC split naya concern.\nPattern: Server layout + Client input with ref for focus trap.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const rscRefNote = \"Refs attach in client components; server components don't use refs on DOM.\";"
          },
          {
            "title": "Q21: [ADV] Compiler + ref prop",
            "explain": "Kya karna hai:\nCompiler ref prop pass-through optimize kar sakta — still don't read during render.\n\nSeedha matlab:\nSimple forward ref components memoized automatically maybe.\nuseImperativeHandle deps careful — stale inner ref if deps wrong.\nReact 18 manual memo on forwardRef components common.\nRules of React purity still apply.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function CompilerRefNote() {\n  return <p>Compiler may memoize ref-forwarding components; refs remain imperative.</p>;\n}"
          },
          {
            "title": "Q22: [ADV] Interview — ref React 18 vs 19 summary",
            "explain": "Kya karna hai:\n18: forwardRef required for function components.\n19: ref regular prop; forwardRef legacy compat.\n\nSeedha matlab:\ncallback ref, useImperativeHandle unchanged semantically.\nTraps: not forwarding ref; reading ref in render; merge conflicts.\nMigration incremental; libs lag on typings.\nClass refs unchanged; DOM refs still useRef primary.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export const refInterviewSummary = {\n  react18: \"forwardRef(function Component(props, ref))\",\n  react19: \"function Component({ ref, ...props })\",\n  unchanged: [\"useRef\", \"callback refs\", \"useImperativeHandle semantics\"],\n  traps: [\"accept ref but not attach\", \"read ref during render\", \"forget mergeRefs with libs\"],\n};"
          }
        ]
      },
      {
        "file": "35_React19_DocumentMetadata.jsx",
        "title": "35 — Document Metadata",
        "kya": "Pehle React SPA me document.title = '...' useEffect me set karte,",
        "detail": "35 — React 19 Document Metadata (title / meta in tree)\nLevel: REACT19  |  Sequence seekho: pehle yeh file, phir agla number\n\nLAYMAN: Pehle React SPA me document.title = '...' useEffect me set karte,\nya react-helmet jaise libs.\n\nReact 19: component ke ANDAR seedha <title>, <meta>, <link> likho —\nReact unhe document <head> me hoist / manage karta hai.\n\nSocho har page component apna nameplate (title) le ke aata;\nReact reception pe laga deta.\n\nKYUN: Less effect soup; SSR/RSC friendly metadata story.\nINTERVIEW: client-only title vs RSC metadata; conflicting titles.",
        "intro": "35 — React 19 Document Metadata (title / meta in tree)\nLevel: REACT19  |  Sequence seekho: pehle yeh file, phir agla number\n\nLAYMAN: Pehle React SPA me document.title = '...' useEffect me set karte,\nya react-helmet jaise libs.\n\nReact 19: component ke ANDAR seedha <title>, <meta>, <link> likho —\nReact unhe document <head> me hoist / manage karta hai.\n\nSocho har page component apna nameplate (title) le ke aata;\nReact reception pe laga deta.\n\nKYUN: Less effect soup; SSR/RSC friendly metadata story.\nINTERVIEW: client-only title vs RSC metadata; conflicting titles.",
        "questions": [
          {
            "title": "Q1: Basic <title> inside page component",
            "explain": "Seedha matlab:\nRoute/page render → title tag component tree me.\nBrowser tab text update.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function AboutPage() {\n  return (\n    <>\n      <title>About — MyApp</title>\n      <h1>About</h1>\n      <p>We build things.</p>\n    </>\n  );\n}"
          },
          {
            "title": "Q2: <meta> description / og tags",
            "explain": "Seedha matlab:\nSEO + social previews ke liye meta.\nReal production me framework (Next Metadata API) bhi use hota —\nReact 19 built-in = foundation.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function ProductPage({ product }) {\n  return (\n    <>\n      <title>{product.name} — Shop</title>\n      <meta name=\"description\" content={product.blurb} />\n      <meta property=\"og:title\" content={product.name} />\n      <h1>{product.name}</h1>\n    </>\n  );\n}"
          },
          {
            "title": "Q3: [MID] Dynamic title with state",
            "explain": "Seedha matlab:\nTitle bhi render output — state badla, title re-render.\nuseEffect se document.title sync ki zaroorat kam.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function CartTitle({ count }) {\n  return (\n    <>\n      <title>{count ? `Cart (${count})` : \"Cart\"}</title>\n      <h1>Your cart</h1>\n    </>\n  );\n}\n\nexport function CartApp() {\n  const [count, setCount] = useState(2);\n  return (\n    <div>\n      <CartTitle count={count} />\n      <button onClick={() => setCount((c) => c + 1)}>Add</button>\n    </div>\n  );\n}"
          },
          {
            "title": "Q4: <link rel=\"stylesheet\"> / canonical idea",
            "explain": "Seedha matlab:\nlink tags bhi tree se declare.\nCareful: duplicate stylesheets — design system / bundler usually better.\ncanonical URL meta/link SEO pattern.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function Article({ slug, title }) {\n  return (\n    <>\n      <title>{title}</title>\n      <link rel=\"canonical\" href={`https://example.com/a/${slug}`} />\n      <article>\n        <h1>{title}</h1>\n      </article>\n    </>\n  );\n}"
          },
          {
            "title": "Q5: [MID] Conflict — do components title set karein?",
            "explain": "Seedha matlab:\nLast / deeper / framework precedence — environment pe depend.\nPractice: EK page-level owner for title; children random title mat chhodo.\nInterview: \"single source of truth for document title per route\".",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function NestedTitlesBad() {\n  return (\n    <>\n      <title>Parent</title>\n      <ChildAlsoSetsTitle />\n    </>\n  );\n}\n\nfunction ChildAlsoSetsTitle() {\n  return (\n    <>\n      <title>Child wins? depends</title>\n      <p>Prefer one owner</p>\n    </>\n  );\n}"
          },
          {
            "title": "Q6: Purana useEffect way (contrast)",
            "explain": "Seedha matlab:\nAb bhi chalega — lekin React 19 declarative metadata cleaner.\nSSR me effect late — title flash possible; tree metadata better story.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function OldTitleEffect() {\n  // useEffect(() => { document.title = 'Old way'; }, []);\n  return <p>Prefer &lt;title&gt; in React 19+</p>;\n}"
          },
          {
            "title": "Q7: [MID] Frameworks vs raw React 19",
            "explain": "Seedha matlab:\nNext.js App Router: export metadata / generateMetadata — first-class.\nVite SPA: React 19 title/meta tags helpful on client.\nJaano kaunsa environment — answer us hisaab se.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const environments = {\n  nextAppRouter: \"use Next metadata APIs primarily\",\n  spaVite: \"React 19 <title>/<meta> in components works client-side\",\n};"
          },
          {
            "title": "Q8: Accessibility — title meaningful",
            "explain": "Seedha matlab:\nTab me \"Document\" mat chhodo — page purpose clear.\nMulti-page app: unique titles help screen reader users switching tabs.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function GoodTitles() {\n  return (\n    <>\n      <title>Settings — Profile — MyApp</title>\n      <h1>Profile settings</h1>\n    </>\n  );\n}"
          },
          {
            "title": "Q9: [MID] Route change pe title update — SPA",
            "explain": "Kya karna hai:\nReact Router route element me <title> per page component.\n\nSeedha matlab:\nRoute render → title component tree me → tab update.\nReact 18: useEffect document.title on pathname change.\nReact 19: declarative title in each route component cleaner.\nTrap: layout + page dono title — ek owner decide (page wins usually).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function DashboardRouteTitle() {\n  return (\n    <>\n      <title>Dashboard — MyApp</title>\n      <h1>Dashboard</h1>\n    </>\n  );\n}"
          },
          {
            "title": "Q10: og:image / twitter cards",
            "explain": "Kya karna hai:\n<meta property=\"og:image\" content=\"https://...\" /> social share ke liye.\n\nSeedha matlab:\nAbsolute URL prefer — relative OG images break on shares.\nReact 18 react-helmet async similar tags.\nSSR/RSC: metadata first HTML response me hona best — crawlers.\nClient-only SPA: some bots weak JS — SSR still SEO win.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function SharePage({ imageUrl, title }) {\n  return (\n    <>\n      <title>{title}</title>\n      <meta property=\"og:title\" content={title} />\n      <meta property=\"og:image\" content={imageUrl} />\n      <meta name=\"twitter:card\" content=\"summary_large_image\" />\n      <h1>{title}</h1>\n    </>\n  );\n}"
          },
          {
            "title": "Q11: [MID] Multiple meta same name — trap",
            "explain": "Kya karna hai:\nDo <meta name=\"description\"> — precedence unclear; ek hi rakho.\n\nSeedha matlab:\nSame as duplicate title — single page-level SEO owner.\nReact 18 helmet override rules similar confusion.\nLayout default description + page override — framework merge rules padho.\nWhen NOT: random child components SEO tags chhodo.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function DuplicateMetaTrap() {\n  return (\n    <>\n      <meta name=\"description\" content=\"Layout default\" />\n      <meta name=\"description\" content=\"Page specific — avoid duplicate\" />\n      <p>Prefer one description owner per route</p>\n    </>\n  );\n}"
          },
          {
            "title": "Q12: lang attribute on html — who sets?",
            "explain": "Kya karna hai:\n<html lang=\"hi\"> usually root index.html ya framework layout.\n\nSeedha matlab:\nReact 19 title/meta hoist; html lang often static shell.\ni18n route: framework may set lang per locale.\nReact 18: same — rarely component tree se html lang.\na11y: lang helps screen readers pronunciation.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function LangNote() {\n  return <p>html lang typically set in root template, not every page component.</p>;\n}"
          },
          {
            "title": "Q13: [MID] useEffect document.title migration",
            "explain": "Kya karna hai:\nPurana: useEffect(() => { document.title = t }, [t]) → replace with <title>{t}</title>.\n\nSeedha matlab:\nRemove effect cleanup title restore hacks jab declarative use karo.\nReact 18 effect runs after paint — title flash possible.\nReact 19 tree metadata integrates with render commit story better.\nKeep effect for non-declarative APIs (analytics) only.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function MigratedTitle({ pageName }) {\n  return (\n    <>\n      <title>{pageName} — MyApp</title>\n      <h1>{pageName}</h1>\n    </>\n  );\n}"
          },
          {
            "title": "Q14: robots noindex page",
            "explain": "Kya karna hai:\n<meta name=\"robots\" content=\"noindex, nofollow\" /> staging/admin pages.\n\nSeedha matlab:\nComponent tree se declare — admin route component me.\nReact 18 helmet equivalent.\nSSR important — client-only late inject weaker for crawlers.\nDon't noindex production by mistake — env guard.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function StagingPage() {\n  return (\n    <>\n      <meta name=\"robots\" content=\"noindex, nofollow\" />\n      <title>Staging — internal</title>\n      <p>Not for Google</p>\n    </>\n  );\n}"
          },
          {
            "title": "Q15: [MID] Next.js generateMetadata vs React 19 <title>",
            "explain": "Kya karna hai:\nNext App Router me generateMetadata/export metadata often preferred.\n\nSeedha matlab:\nReact 19 <title> in client components works; Next adds static optimization.\nReact 18 Next: Head from next/head Pages router.\nAnswer interview by environment: \"Next metadata API vs raw React 19 tags\".\nDono goals same — correct head per route.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const nextVsReact19Meta = {\n  nextAppRouter: \"export metadata / generateMetadata primary\",\n  rawReact19: \"<title>/<meta> in component tree\",\n};"
          },
          {
            "title": "Q16: favicon link rel=\"icon\"",
            "explain": "Kya karna hai:\n<link rel=\"icon\" href=\"/favicon.ico\" /> — page or root once.\n\nSeedha matlab:\nUsually index.html once — har page duplicate avoid.\nPer-section favicon rare — dynamic route possible teaching only.\nReact 18 public folder static same.\nDuplicate link icons — browser picks one unpredictably.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function FaviconNote() {\n  return (\n    <>\n      <link rel=\"icon\" href=\"/favicon.ico\" />\n      <p>Set favicon once at app shell when possible</p>\n    </>\n  );\n}"
          },
          {
            "title": "Q17: [MID] Client navigation title delay",
            "explain": "Kya karna hai:\nSPA client route change — title updates on render, fast usually.\n\nSeedha matlab:\nSlow route lazy load — title updates when page component mounts.\nReact 18 same with effect title.\nSuspense fallback route — title from fallback or previous until resolve.\nUX: meaningful fallback title during load optional.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function LazyRouteTitleNote() {\n  return <p>Title updates when route component renders — after lazy chunk loads.</p>;\n}"
          },
          {
            "title": "Q18: Structured data JSON-LD — still script tag",
            "explain": "Kya karna hai:\nSEO rich results: <script type=\"application/ld+json\"> often in page still.\n\nSeedha matlab:\nReact 19 metadata tags cover title/meta/link — JSON-LD separate concern.\nReact 18 same — helmet or manual script.\ndangerouslySetInnerHTML careful — sanitize static JSON only.\nRSC: colocate JSON-LD server component near data.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function ArticleJsonLd({ article }) {\n  const json = JSON.stringify({\n    \"@context\": \"https://schema.org\",\n    \"@type\": \"Article\",\n    headline: article.title,\n  });\n  return (\n    <>\n      <title>{article.title}</title>\n      <script type=\"application/ld+json\">{json}</script>\n      <article>{article.title}</article>\n    </>\n  );\n}"
          },
          {
            "title": "Q19: [ADV] When NOT declarative metadata in React",
            "explain": "Kya karna hai:\nFully static site — build-time HTML head enough; no runtime React title needed.\n\nSeedha matlab:\nMarketing one-pager SSR pre-rendered — meta in template.\nReact 19 win = dynamic per-user/per-route titles in SPA/SSR apps.\nCMS-driven head — framework layer may centralize better than scattered tags.\nOver-tagging every child component — anti-pattern.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const whenNotTreeMetadata = [\n  \"static prebuilt HTML sufficient\",\n  \"framework central metadata API preferred\",\n  \"deep child components tagging randomly\",\n];"
          },
          {
            "title": "Q20: [MID] Hydration + title mismatch",
            "explain": "Kya karna hai:\nServer render title \"A\"; client first render title \"B\" — mismatch warning possible.\n\nSeedha matlab:\nInitial client render match server HTML head expectations.\nReact 18 hydration mismatch similar with effect-set title timing.\nUser-specific title: fetch on server or after mount consistently.\nDate in title — server/client TZ difference trap.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function HydrationTitleSafe({ userName }) {\n  return (\n    <>\n      <title>{userName ? `${userName} — MyApp` : \"MyApp\"}</title>\n      <h1>Hello {userName ?? \"guest\"}</h1>\n    </>\n  );\n}"
          },
          {
            "title": "Q21: [ADV] Priority / precedence mental model",
            "explain": "Kya karna hai:\nDeeper / later mounted title may override — exact rules implementation-dependent.\n\nSeedha matlab:\nDon't rely on \"child always wins\" — explicit architecture.\nReact 18 helmet prioritizeRegisteredMeta similar battles.\nSingle RouteHead component pattern team-wide.\nTesting: assert document.title in E2E after navigation.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function SingleOwnerPattern({ title, children }) {\n  return (\n    <>\n      <title>{title}</title>\n      {children}\n    </>\n  );\n}"
          },
          {
            "title": "Q22: [ADV] Interview — metadata React 18 vs 19",
            "explain": "Kya karna hai:\n18: useEffect + react-helmet; 19: <title>/<meta> in JSX tree hoist to head.\n\nSeedha matlab:\nBenefits: declarative, SSR friendly, less effect soup.\nTraps: duplicate tags, wrong owner, client-only SEO limits.\nFrameworks layer on top (Next metadata).\na11y unique titles per view still matter.\nlink canonical absolute URLs; OG images absolute.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export const metadataInterviewSummary = {\n  react18: \"useEffect document.title / react-helmet\",\n  react19: \"declarative title/meta/link in component tree\",\n  traps: [\"duplicate title/meta\", \"multiple owners\", \"client-only crawlers\", \"TZ mismatch in dynamic titles\"],\n  practices: [\"one head owner per route\", \"absolute OG URLs\", \"meaningful unique titles\"],\n};"
          }
        ]
      },
      {
        "file": "36_React19_ContextAsProvider.jsx",
        "title": "36 — Context As Provider",
        "kya": "Pehle hamesha:",
        "detail": "36 — React 19 Context as Provider\nLevel: REACT19  |  Sequence seekho: pehle yeh file, phir agla number\n\nLAYMAN: Pehle hamesha:\n  <ThemeContext.Provider value={...}>...</ThemeContext.Provider>\n\nReact 19: Context object KHUD provider ki tarah:\n  <ThemeContext value={...}>...</ThemeContext>\n\n.Provider ab bhi supported (compat). Naya style chhota + clean.\n\nSocho Context = dabba brand; pehle alag \"Provider sticker\" chipkana padta;\nab dabba khud shelf pe baith sakta hai.\n\nKYUN: Small DX change; interviews me \"seen React 19 notes?\" signal.\nINTERVIEW: value identity re-render; split contexts; use(context).",
        "intro": "36 — React 19 Context as Provider\nLevel: REACT19  |  Sequence seekho: pehle yeh file, phir agla number\n\nLAYMAN: Pehle hamesha:\n  <ThemeContext.Provider value={...}>...</ThemeContext.Provider>\n\nReact 19: Context object KHUD provider ki tarah:\n  <ThemeContext value={...}>...</ThemeContext>\n\n.Provider ab bhi supported (compat). Naya style chhota + clean.\n\nSocho Context = dabba brand; pehle alag \"Provider sticker\" chipkana padta;\nab dabba khud shelf pe baith sakta hai.\n\nKYUN: Small DX change; interviews me \"seen React 19 notes?\" signal.\nINTERVIEW: value identity re-render; split contexts; use(context).",
        "questions": [
          {
            "title": "Q1: Naya syntax — <ThemeContext value={...}>",
            "explain": "Seedha matlab:\nProvider wrapper alag naam se nahi — Context hi JSX tag.\nvalue prop same idea.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Themed() {\n  const theme = useContext(ThemeContext);\n  return <span>{theme}</span>;\n}\n\nexport function AppNewProviderStyle() {\n  return (\n    <ThemeContext value=\"dark\">\n      <Themed />\n    </ThemeContext>\n  );\n}"
          },
          {
            "title": "Q2: Purana .Provider — ab bhi OK",
            "explain": "Seedha matlab:\nLibraries / old code .Provider use karenge.\nDono samajhna migration ke liye.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function AppLegacyProvider() {\n  return (\n    <ThemeContext.Provider value=\"light\">\n      <Themed />\n    </ThemeContext.Provider>\n  );\n}"
          },
          {
            "title": "Q3: [MID] value={{}} har render — performance trap",
            "explain": "Seedha matlab:\nInline object value={{ user }} har render naya reference —\nconsumers re-render.\nFix: useState/useMemo value stable, ya context split, ya store bahar.\n(React Compiler baad me help kar sakta — file 39 — blind trust mat.)",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function AuthProvider({ children }) {\n  const [user, setUser] = useState(null);\n  // Better: const value = useMemo(() => ({ user, setUser }), [user]);\n  // Teaching shows the pitfall:\n  return (\n    <AuthContext value={{ user, setUser }}>\n      {children}\n    </AuthContext>\n  );\n}"
          },
          {
            "title": "Q4: Nested providers — nearest wins",
            "explain": "Seedha matlab:\nAndar wala Context value bahar wale ko override.\nTheme dark bahar, light andar section.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function NestedTheme() {\n  return (\n    <ThemeContext value=\"dark\">\n      <Themed />\n      <ThemeContext value=\"light\">\n        <Themed />\n      </ThemeContext>\n    </ThemeContext>\n  );\n}"
          },
          {
            "title": "Q5: use(Context) with new provider style",
            "explain": "Seedha matlab:\nFile 33: use(ThemeContext) conditional allowed.\nProvider syntax change se read API same.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function OptionalTheme({ forced }) {\n  if (forced) return <span>{forced}</span>;\n  const theme = use(ThemeContext);\n  return <span>{theme}</span>;\n}\n\nexport function UseWithProvider() {\n  return (\n    <ThemeContext value=\"dark\">\n      <OptionalTheme />\n      <OptionalTheme forced=\"system\" />\n    </ThemeContext>\n  );\n}"
          },
          {
            "title": "Q6: [MID] Default value tab jab Provider missing",
            "explain": "Seedha matlab:\ncreateContext(default) — agar koi Provider/Context wrapper nahi,\ndefault milta. Bug ya intentional optional theme.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function NoProvider() {\n  // ThemeContext default \"light\"\n  return <Themed />;\n}"
          },
          {
            "title": "Q7: Split context — state vs dispatch",
            "explain": "Seedha matlab:\nMid pattern: Frequency of change alag → alag contexts.\nTaaki button sirf dispatch subscribe kare, state change pe na re-render.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const CountStateContext = createContext(0);\nconst CountDispatchContext = createContext(() => {});\n\nexport function SplitCountProvider({ children }) {\n  const [count, setCount] = useState(0);\n  return (\n    <CountStateContext value={count}>\n      <CountDispatchContext value={setCount}>\n        {children}\n      </CountDispatchContext>\n    </CountStateContext>\n  );\n}\n\nfunction CountLabel() {\n  return <span>{useContext(CountStateContext)}</span>;\n}\nfunction IncButton() {\n  const setCount = useContext(CountDispatchContext);\n  return <button onClick={() => setCount((c) => c + 1)}>+</button>;\n}\n\nexport function SplitCountApp() {\n  return (\n    <SplitCountProvider>\n      <CountLabel />\n      <IncButton />\n    </SplitCountProvider>\n  );\n}"
          },
          {
            "title": "Q8: [MID] Interview one-liner",
            "explain": "Seedha matlab:\n\"React 19 me <MyContext value> = Provider; .Provider legacy-ok.\nRe-renders value identity se; split contexts jab heavy.\"",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const line =\n  \"<Context value={...}> in React 19; watch referential equality of value.\";"
          },
          {
            "title": "Q9: useMemo for stable context value",
            "explain": "Kya karna hai:\nconst value = useMemo(() => ({ user, setUser }), [user]) — re-render kam.\n\nSeedha matlab:\nQ3 trap fix — inline object har render new reference.\nReact 18 same performance pattern with .Provider.\nReact 19 syntax change only — performance rules unchanged.\nCompiler may help but explicit useMemo still valid.\nsetUser stable from useState — include user in deps.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function AuthProviderMemo({ children }) {\n  const [user, setUser] = useState(null);\n  const value = useMemo(() => ({ user, setUser }), [user]);\n  return <AuthContext value={value}>{children}</AuthContext>;\n}"
          },
          {
            "title": "Q10: [MID] Provider value primitive — stable",
            "explain": "Kya karna hai:\n<ThemeContext value=\"dark\"> — string primitive stable automatically.\n\nSeedha matlab:\nNo referential issue — consumers re-render jab value string change.\nReact 18 .Provider value=\"dark\" same.\nObjects/functions need memoization; primitives safe inline.\nInterview: \"inline object bad; inline string OK\".",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function PrimitiveThemeProvider({ children }) {\n  return <ThemeContext value=\"dark\">{children}</ThemeContext>;\n}"
          },
          {
            "title": "Q11: Context + use() conditional read recap",
            "explain": "Kya karna hai:\nOptionalTheme Q5 — use(ThemeContext) when prop missing.\n\nSeedha matlab:\nProvider syntax 19; read API use() flexible (file 33).\nReact 18 useContext unconditional only.\nMigration: provider syntax optional first; use() when needed.\nDon't conditional useContext — rules violation.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function ConditionalReadRecap() {\n  return (\n    <ThemeContext value=\"dark\">\n      <OptionalTheme />\n    </ThemeContext>\n  );\n}"
          },
          {
            "title": "Q12: [MID] Multiple contexts — avoid mega context",
            "explain": "Kya karna hai:\nEk context me 20 fields mat dalo — split by change frequency.\n\nSeedha matlab:\nQ7 split state/dispatch pattern scale karo.\nReact 18 same advice — not 19 specific.\nMega context → any field change → all consumers re-render.\nZustand/Redux when global complex — context for moderate tree sharing.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const avoidMegaContext =\n  \"Split contexts by update frequency; state vs dispatch pattern scales.\";"
          },
          {
            "title": "Q13: Default context + optional provider",
            "explain": "Kya karna hai:\ncreateContext('light') — App section bina provider ke default theme.\n\nSeedha matlab:\nIntentional default vs missing provider bug — document which.\nReact 18 .Provider optional same default behavior.\nTesting: render without provider assert default read.\nProduction: usually explicit provider at app root anyway.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function DefaultThemeSection() {\n  return (\n    <div>\n      <Themed />\n      <p>Uses default light when no provider wrapper</p>\n    </div>\n  );\n}"
          },
          {
            "title": "Q14: [ADV] Context as Provider — library compatibility",
            "explain": "Kya karna hai:\nOld lib docs .Provider — tum <Ctx value> use kar sakte ho same context object pe.\n\nSeedha matlab:\nSame createContext return supports both JSX forms in 19.\nMixed codebase during migration normal.\nPublish libs supporting both until major bump.\nTypeScript children + value props typed on Context object.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function LibCompatNote() {\n  return (\n    <ThemeContext.Provider value=\"light\">\n      <Themed />\n    </ThemeContext.Provider>\n  );\n}"
          },
          {
            "title": "Q15: [MID] React 18 → 19 provider syntax migration",
            "explain": "Kya karna hai:\nCodemod: .Provider → direct Context tag; value prop same.\n\nSeedha matlab:\nZero behavior change if value identity same.\nRead hooks unchanged useContext/use.\nSnapshot tests same HTML structure.\nOptional gradual — .Provider not removed.\nInterview: \"syntax sugar; perf rules unchanged\".",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const providerSyntaxMigration =\n  \"Replace <Ctx.Provider value={v}> with <Ctx value={v}> — optional gradual migration.\";"
          },
          {
            "title": "Q16: Consumer pattern legacy",
            "explain": "Kya karna hai:\nThemeContext.Consumer render props — purana; useContext/use prefer.\n\nSeedha matlab:\nReact 18/19 dono me kaam karta but verbose.\nNew code: useContext or use(Context).\nProvider syntax update doesn't affect Consumer API — still legacy.\nRemove Consumers during refactors.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function LegacyConsumerDemo() {\n  return (\n    <ThemeContext value=\"dark\">\n      <ThemeContext.Consumer>\n        {(theme) => <span>{theme}</span>}\n      </ThemeContext.Consumer>\n    </ThemeContext>\n  );\n}"
          },
          {
            "title": "Q17: [MID] Context + Server Components boundary",
            "explain": "Kya karna hai:\nServer Component se Client child ko context pass — Client provider wrap karo.\n\nSeedha matlab:\nContext consumer/client provider 'use client' side often.\nServer can't use useContext dynamically same as client interactive tree.\nPattern: ClientProviders wrapper at layout root.\nReact 18 CSR-only: no boundary issue.\nSerializable context value only across RSC — functions OK client-only provider.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function RscContextNote() {\n  return (\n    <p>\n      Wrap client subtree with Context provider; server components pass serializable props\n      into client providers when needed.\n    </p>\n  );\n}"
          },
          {
            "title": "Q18: [ADV] When NOT Context",
            "explain": "Kya karna hai:\nFrequent global updates, large app state, time-travel debug — Redux/Zustand.\n\nSeedha matlab:\nContext great moderate prop-drill fix — not full data layer always.\nReact 18 same guidance.\nForm local state, URL state (router), query cache — often better homes.\nContext hell = too many providers nested — flatten or external store.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const whenNotContext = [\n  \"high-frequency global updates\",\n  \"complex middleware/devtools needs\",\n  \"server cache (TanStack Query)\",\n  \"URL-driven state (router search params)\",\n];"
          },
          {
            "title": "Q19: [MID] Testing context providers",
            "explain": "Kya karna hai:\nTest wrapper: <ThemeContext value=\"dark\">{ui}</ThemeContext> — 19 syntax clean.\n\nSeedha matlab:\nRTL render with provider wrapper helper.\nReact 18 .Provider in tests identical value injection.\nDefault context test without wrapper for optional behavior.\nMock providers per test file — avoid global pollution.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function TestWrapper({ children }) {\n  return <ThemeContext value=\"test\">{children}</ThemeContext>;\n}"
          },
          {
            "title": "Q20: [ADV] Compiler + context value",
            "explain": "Kya karna hai:\nCompiler auto-memo partial — value={{}} trap manually fix still.\n\nSeedha matlab:\nDon't assume compiler fixes unstable object values always.\nReact 18 manual memo on value; 19 same + compiler assist possible.\nMeasure re-renders React DevTools profiler.\nSplit contexts beats heroic memo sometimes.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function CompilerContextNote() {\n  return <p>Compiler helps but unstable context value objects still warrant useMemo or split.</p>;\n}"
          },
          {
            "title": "Q21: [MID] Auth context common bug — new function in value",
            "explain": "Kya karna hai:\nvalue={{ login: () => {...}, user }} — login new ref every render.\n\nSeedha matlab:\nAll consumers re-render even if user unchanged.\nFix: useCallback login + useMemo value object.\nReact 18 identical bug with .Provider.\nSplit: AuthStateContext + AuthActionsContext (stable dispatch refs).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function AuthProviderBuggy({ children }) {\n  const [user, setUser] = useState(null);\n  // Buggy: new login fn each render\n  return (\n    <AuthContext value={{ user, login: () => setUser({ name: \"Ada\" }) }}>\n      {children}\n    </AuthContext>\n  );\n}"
          },
          {
            "title": "Q22: [ADV] Interview — Context React 19 summary",
            "explain": "Kya karna hai:\n<Ctx value> replaces .Provider; use/useContext read; value identity perf trap same.\n\nSeedha matlab:\nNot a state management revolution — DX + docs alignment.\nSplit contexts, memoized values, primitives safe inline.\nuse() conditional read paired with 19 provider syntax.\nTraps: inline objects/functions in value; mega context; missing provider confusion.\nMigration optional .Provider still works.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export const contextInterviewSummary = {\n  react19Syntax: \"<ThemeContext value={v}> children </ThemeContext>\",\n  legacySyntax: \"<ThemeContext.Provider value={v}> still OK\",\n  performance: \"stable value reference — useMemo/split contexts\",\n  readApi: \"useContext or use(Context) — conditional only with use()\",\n  traps: [\"inline object value\", \"unstable functions in value\", \"mega context re-renders\"],\n};"
          }
        ]
      },
      {
        "file": "37_ServerComponentsIntro.jsx",
        "title": "37 — Server Components Intro",
        "kya": "Classic SPA — SAARA React JS bundle browser me; data fetch useEffect.",
        "detail": "37 — Server Components Intro (RSC mental model)\nLevel: REACT19  |  Sequence seekho: pehle yeh file, phir agla number\n\nLAYMAN: Classic SPA — SAARA React JS bundle browser me; data fetch useEffect.\nServer Components (RSC) — kuch components SERVER pe render hote,\nHTML/payload browser ko milta, unka JS bundle me nahi aata.\n\nSocho restaurant:\n  Server Component = kitchen me dish ready karke plate bhejo (heavy work server).\n  Client Component = table pe interactive (hooks, onClick, browser APIs).\n\n'use client' = \"yahan se neeche CLIENT boundary\".\nFile ke TOP pe directive. Ek baar client = uske imports bhi client graph.\n\nReact 19 is story ko stabilize / mainstream document karta (Next App Router etc.).\n\nKYUN: Mid+ interviews me RSC vs client almost standard.\nINTERVIEW: kab 'use client'; secrets server pe; children slot pattern.",
        "intro": "37 — Server Components Intro (RSC mental model)\nLevel: REACT19  |  Sequence seekho: pehle yeh file, phir agla number\n\nLAYMAN: Classic SPA — SAARA React JS bundle browser me; data fetch useEffect.\nServer Components (RSC) — kuch components SERVER pe render hote,\nHTML/payload browser ko milta, unka JS bundle me nahi aata.\n\nSocho restaurant:\n  Server Component = kitchen me dish ready karke plate bhejo (heavy work server).\n  Client Component = table pe interactive (hooks, onClick, browser APIs).\n\n'use client' = \"yahan se neeche CLIENT boundary\".\nFile ke TOP pe directive. Ek baar client = uske imports bhi client graph.\n\nReact 19 is story ko stabilize / mainstream document karta (Next App Router etc.).\n\nKYUN: Mid+ interviews me RSC vs client almost standard.\nINTERVIEW: kab 'use client'; secrets server pe; children slot pattern.",
        "questions": [
          {
            "title": "Q1: Default server vs client (Next-style mental model)",
            "explain": "Seedha matlab:\nApp Router me default = Server Component.\nuseState/onClick chahiye → file me 'use client'.\nVite-only CSR app me sab client — RSC ke liye framework support chahiye.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "// // app/page.js  (Server Component — NO 'use client')\n// async function Page() {\n//   const data = await db.posts(); // server pe seedha DB\n//   return <ul>{data.map(...)}</ul>;\n// }"
          },
          {
            "title": "Q2: 'use client' boundary",
            "explain": "Seedha matlab:\nDirective string bilkul file start (imports se pehle).\nUs file me hooks + events OK.\nServer parent Client child import kar sakta; reverse me careful (server-only code).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "// \"use client\";\n//\n// import { useState } from \"react\";\n//\n// export function Counter() {\n//   const [n, setN] = useState(0);\n//   return <button onClick={() => setN(n + 1)}>{n}</button>;\n// }"
          },
          {
            "title": "Q3: [MID] Server pe kya ALLOWED / DISALLOWED",
            "explain": "Seedha matlab:\nServer ✅: async component, await fetch/DB, secrets/env server, heavy libs zero bundle.\nServer ❌: useState, useEffect, browser DOM, onClick (needs client child).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const serverAllowed = [\"async/await fetch\", \"DB access\", \"fs (careful)\", \"render static UI\"];\nconst serverDenied = [\"useState\", \"useEffect\", \"onClick\", \"window\"];"
          },
          {
            "title": "Q4: Composition — Server wraps Client",
            "explain": "Seedha matlab:\nServerComponent data laaye, ClientComponent ko props me serializable data de.\nFunctions/classes props me mat bhejo (serialization boundary).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "// // Server\n// async function ProductPage() {\n//   const product = await getProduct();\n//   return <AddToCartButton productId={product.id} />; // client child\n// }"
          },
          {
            "title": "Q5: [MID] Children slot — Client shell, Server children",
            "explain": "Seedha matlab:\nPowerful pattern: Client layout (state) ke ANDAR {children} Server se aaye.\nChildren server pe render; client JS children ka code bundle me nahi (as server).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "// \"use client\";\n// export function Modal({ children }) {\n//   const [open, setOpen] = useState(false);\n//   return open ? <div>{children}</div> : <button onClick={() => setOpen(true)}>Open</button>;\n// }\n//\n// // Server page:\n// // <Modal><ExpensiveServerChart /></Modal>"
          },
          {
            "title": "Q6: Bundle size intuition",
            "explain": "Seedha matlab:\nmarkdown parser server pe → client bundle me nahi.\nSame lib client component me import → bundle badha.\nInterview gold: \"move heavy non-interactive to server\".",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const bundleRule =\n  \"If no interactivity needed, keep it a Server Component — ship less JS.\";"
          },
          {
            "title": "Q7: [MID] Data fetching — useEffect vs Server await",
            "explain": "Seedha matlab:\nCSR: mount → loading → useEffect fetch → setState (waterfall common).\nRSC: await on server → HTML already with data (fast first paint story).\nClient still needed for live refetch / interactions.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function CsrFetchContrast() {\n  // teaching-only client pattern contrast\n  // useEffect(() => { fetch('/api').then(...) }, []);\n  return <p>Prefer server await for initial page data when using RSC framework</p>;\n}"
          },
          {
            "title": "Q8: Serializable props boundary",
            "explain": "Seedha matlab:\nServer → Client props: string, number, plain objects/arrays, Map? limited —\nbasically JSON-ish + few special types (docs).\nDate care; functions ❌; class instances ❌.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const serializable = [\"string\", \"number\", \"plain objects\", \"arrays\", \"bigint (check)\"];\nconst notSerializable = [\"functions\", \"class instances\", \"server DB handles\"];"
          },
          {
            "title": "Q9: [MID] Secrets",
            "explain": "Seedha matlab:\nAPI keys Server Component / Server Actions me.\n'use client' file me NEXT_PUBLIC_ / leaked env mat daalo blindly.\nRSC security win = secrets browser me na bhejo.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const securityLine =\n  \"Server Components can touch secrets; never pass secrets as client props.\";"
          },
          {
            "title": "Q10: When NOT to force everything server",
            "explain": "Seedha matlab:\nHighly interactive UI, optimistic updates, local device APIs → client.\nHybrid: server page shell + client islands.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export const hybridIdea = {\n  server: \"data + static structure\",\n  client: \"buttons, forms interactivity, local state\",\n};"
          },
          {
            "title": "Q11: [MID] 'use client' propagation — import graph",
            "explain": "Kya karna hai:\nClient file jo server-only module import kare — build error / accidental bundle.\n\nSeedha matlab:\n'use client' file ke imports client bundle me aate hain.\nServer Component can import Client — OK.\nClient importing fs/DB server module ❌.\nReact 18: sab client tha — yeh split naya.\nFix: server actions / API boundaries; pass serializable props only.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const clientBoundaryRule =\n  \"use client marks boundary — its imports pull into client graph; don't import server secrets.\";"
          },
          {
            "title": "Q12: async Server Component pattern",
            "explain": "Kya karna hai:\nasync function Page() { const data = await db.query(); return <UI data={data} />; }\n\nSeedha matlab:\nNo useEffect fetch on mount for initial data — await on server.\nReact 18 CSR: useEffect waterfall.\nSuspense boundaries stream partial HTML (framework dependent).\nError: try/catch server + error.tsx patterns in Next.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function AsyncServerPatternNote() {\n  return (\n    <p>\n      Server components can be async functions awaiting DB/API before render — zero client JS for that logic.\n    </p>\n  );\n}"
          },
          {
            "title": "Q13: [MID] Client-only libraries (charts, maps)",
            "explain": "Kya karna hai:\nrecharts / leaflet → 'use client' wrapper component import in server page.\n\nSeedha matlab:\nServer page shell + ClientChart data={serializable} props.\nReact 18: dynamic import ssr:false similar idea Pages router.\nBundle: chart lib client chunk — expected.\nWhen NOT client: static SVG server rendered — creative alternative.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function ClientChartWrapperNote() {\n  return (\n    <p>\n      Wrap third-party interactive libs in client components; server page passes data props.\n    </p>\n  );\n}"
          },
          {
            "title": "Q14: Zero bundle mental model — interview gold",
            "explain": "Kya karna hai:\nmarkdown-it server only → HTML string client ko; client JS parser nahi.\n\nSeedha matlab:\n\"Does this code need to run in browser?\" — no → server component candidate.\nReact 18: code split only reduces, still ships if imported client-side.\nRSC: module never in client bundle if only imported server-side.\nMeasure: analyze bundle before/after moving to server.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const zeroBundleLine =\n  \"Server-only imports never ship to browser bundle — stronger than lazy().\";"
          },
          {
            "title": "Q15: [MID] use client at file top — comments allowed?",
            "explain": "Kya karna hai:\nDirective must be before imports (except some bundlers allow comment block first — follow framework docs).\n\nSeedha matlab:\nNext: \"use client\" first line typically.\nWrong placement → treated as server → hooks error confusing.\nReact 18 N/A.\nCommon bug: directive after imports → not a client component.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const directivePlacement =\n  \"'use client' at file top before imports — wrong placement causes mysterious hook errors.\";"
          },
          {
            "title": "Q16: Server Component me context provider?",
            "explain": "Kya karna hai:\nServer can render <ThemeContext value> wrapping client children — value serializable.\n\nSeedha matlab:\nClient consumers useContext below client boundary.\nFunction values in context → client provider needed.\nReact 18 all client — no split.\nPattern: ClientProviders layout wraps {children} server pages.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function ServerProviderNote() {\n  return (\n    <p>\n      Server can render context wrapper with serializable values; functions belong in client providers.\n    </p>\n  );\n}"
          },
          {
            "title": "Q17: [MID] Partial Prerendering / streaming (conceptual)",
            "explain": "Kya karna hai:\nStatic shell fast; dynamic holes Suspense stream — Next PPR direction.\n\nSeedha matlab:\nReact 18 Suspense client-side; RSC streaming server HTML chunks.\nInterview high-level: faster TTFB + progressive fill.\nExact API framework-specific — don't invent from memory.\nFallback UI meaningful during stream.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const streamingNote =\n  \"RSC + Suspense enable streaming HTML; frameworks implement PPR/stream details.\";"
          },
          {
            "title": "Q18: [ADV] Anti-pattern — entire app 'use client'",
            "explain": "Kya karna hai:\nRoot layout client → RSC benefits mostly gone.\n\nSeedha matlab:\n\"use client\" at app root except providers = basically SPA in App Router.\nReact 18 equivalent — normal.\nFix: push client boundaries down to interactive leaves.\nServer pages for data; client islands for buttons/forms.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function AvoidRootClientNote() {\n  return <p>Keep use client at leaves — not root layout unless necessary.</p>;\n}"
          },
          {
            "title": "Q19: [MID] Environment variables RSC",
            "explain": "Kya karna hai:\nprocess.env.SECRET server component OK; NEXT_PUBLIC_* client visible.\n\nSeedha matlab:\nReact 18 CRA/Vite: only VITE_* exposed — same security mindset.\nNever pass secret as prop to client child.\nServer embed secret in fetch server-side only.\nInterview security win RSC vs CSR data fetching.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const envRscRule =\n  \"Server env secrets OK on server components; client only public prefixed env vars.\";"
          },
          {
            "title": "Q20: [ADV] CSR-only apps — RSC N/A",
            "explain": "Kya karna hai:\nVite + React DOM client — no Server Components without major framework add-on.\n\nSeedha matlab:\nReact 19 features useActionState etc. still work CSR.\nRSC mental model interview me bolo: \"needs framework like Next App Router\".\nReact 18 vs 19 CSR: Actions/hooks still upgrade value.\nDon't force RSC concepts where stack doesn't support.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function CsrOnlyNote() {\n  return (\n    <p>Vite SPA: learn RSC conceptually for interviews; use React 19 client hooks locally.</p>\n  );\n}"
          },
          {
            "title": "Q21: [MID] Children slot pattern recap + trap",
            "explain": "Kya karna hai:\nClient Modal {children} server content — children server-rendered through slot.\n\nSeedha matlab:\nPowerful — modal client, heavy list server.\nTrap: pass server component as prop vs children — Next composition rules padho.\nReact 18 no equivalent slot server/client split.\nImproves bundle vs importing server list inside client modal file wrongly.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const childrenSlotTrap =\n  \"Pass server content as children into client shell — don't import server components into client files incorrectly.\";"
          },
          {
            "title": "Q22: [ADV] Interview — RSC rapid answers",
            "explain": "Kya karna hai:\nDefault server (Next), use client for hooks/events, serializable props, secrets server-side.\n\nSeedha matlab:\nvs React 18 CSR: less client JS, server data colocated, hybrid islands.\nWhen NOT: no framework support, highly client-only app, whole app interactive.\nTraps: client imports server code; non-serializable props; root use client; secrets in client env.\nBundle: move heavy non-interactive code server-side.\nPair with Server Actions (file 38) for mutations.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export const rscInterviewSummary = {\n  default: \"Server Components in supported frameworks (Next App Router)\",\n  clientBoundary: \"'use client' for hooks, events, browser APIs\",\n  props: \"serializable only server → client\",\n  security: \"secrets and DB on server only\",\n  whenNot: [\"Vite CSR only stack\", \"fully interactive app\", \"no RSC framework\"],\n  traps: [\"client importing server modules\", \"non-serializable props\", \"use client at root\"],\n};"
          }
        ]
      },
      {
        "file": "38_ServerActions.jsx",
        "title": "38 — Server Actions",
        "kya": "Server Action = function jo SERVER pe chalti, lekin CLIENT se",
        "detail": "38 — Server Actions ('use server')\nLevel: REACT19  |  Sequence seekho: pehle yeh file, phir agla number\n\nLAYMAN: Server Action = function jo SERVER pe chalti, lekin CLIENT se\ncall / form se trigger ho sakti.\n\nFile ya function ke upar: 'use server'\nForm: action={serverAction} — progressive enhancement friendly (frameworks).\nClient: await serverAction(data) bhi (with rules).\n\nSocho remote control: button ghar me (client), TV kitchen me (server) channel badle.\nNetwork pe serialized call jati — magic nahi, RPC-ish.\n\nKYUN: Next.js + React 19 forms ka pair; mid interviews frequent.\nINTERVIEW: validation/auth zaroori; secrets; revalidate; vs API route.\n\n-----------------------------------------------------------------------------\nQ1: File-level 'use server'",
        "intro": "38 — Server Actions ('use server')\nLevel: REACT19  |  Sequence seekho: pehle yeh file, phir agla number\n\nLAYMAN: Server Action = function jo SERVER pe chalti, lekin CLIENT se\ncall / form se trigger ho sakti.\n\nFile ya function ke upar: 'use server'\nForm: action={serverAction} — progressive enhancement friendly (frameworks).\nClient: await serverAction(data) bhi (with rules).\n\nSocho remote control: button ghar me (client), TV kitchen me (server) channel badle.\nNetwork pe serialized call jati — magic nahi, RPC-ish.\n\nKYUN: Next.js + React 19 forms ka pair; mid interviews frequent.\nINTERVIEW: validation/auth zaroori; secrets; revalidate; vs API route.\n\n-----------------------------------------------------------------------------\nQ1: File-level 'use server'",
        "questions": [
          {
            "title": "Q1: File-level 'use server'",
            "explain": "Seedha matlab:\nPoori file server actions export karti.\nClient components in actions ko import karke call / form pe laga sakte.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "// \"use server\";\n//\n// export async function createPost(formData) {\n//   const title = formData.get(\"title\");\n//   await db.posts.insert({ title });\n// }"
          },
          {
            "title": "Q2: Inline / function-level 'use server'",
            "explain": "Seedha matlab:\nServer Component ke andar async function with 'use server' pehli line.\nClosures: sirf serializable values close karo — heavy gotcha.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "// // Server Component file:\n// export default function Page() {\n//   async function addItem(formData) {\n//     \"use server\";\n//     // await db...\n//   }\n//   return <form action={addItem}>...</form>;\n// }"
          },
          {
            "title": "Q3: Form me Server Action",
            "explain": "Seedha matlab:\nClient JS ke bina bhi framework POST handle kare (progressive).\nReact 19 action={fn} model yahi pe power dikhata.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "// import { createPost } from \"./actions\";\n//\n// export function NewPostForm() {\n//   return (\n//     <form action={createPost}>\n//       <input name=\"title\" />\n//       <button type=\"submit\">Create</button>\n//     </form>\n//   );\n// }"
          },
          {
            "title": "Q4: [MID] Client Component se call",
            "explain": "Seedha matlab:\n'use client' file action import karke onClick / await createPost().\nReturns serializable result. Errors handle try/catch.\nStill server pe execute — browser me source secrets nahi.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "// \"use client\";\n// import { createPost } from \"./actions\";\n//\n// export function ClientCreate() {\n//   return (\n//     <button\n//       onClick={async () => {\n//         await createPost(new FormData());\n//       }}\n//     >\n//       Create\n//     </button>\n//   );\n// }"
          },
          {
            "title": "Q5: useActionState + Server Action",
            "explain": "Seedha matlab:\nSame hook (file 30) — action ab server function.\npending UI client pe; mutation server pe.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "// \"use client\";\n// import { useActionState } from \"react\";\n// import { login } from \"./actions\";\n//\n// export function LoginForm() {\n//   const [state, formAction, pending] = useActionState(login, { error: null });\n//   return (\n//     <form action={formAction}>\n//       <input name=\"email\" />\n//       <button disabled={pending}>Login</button>\n//       {state.error}\n//     </form>\n//   );\n// }"
          },
          {
            "title": "Q6: [MID] Auth & validation — MUST",
            "explain": "Seedha matlab:\nClient se koi bhi action hit kar sakta (tampered FormData).\nServer pe: session check, zod/yup validate, authorize resource.\nUI validation convenience; server validation security.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "// \"use server\";\n// export async function deleteUser(formData) {\n//   const session = await getSession();\n//   if (!session?.isAdmin) throw new Error(\"Unauthorized\");\n//   const id = String(formData.get(\"id\"));\n//   // validate id...\n//   await db.users.delete(id);\n// }"
          },
          {
            "title": "Q7: revalidate / cache update (Next mental model)",
            "explain": "Seedha matlab:\nMutation ke baad stale page mat chhodo.\nrevalidatePath / revalidateTag (Next) common.\nOther frameworks: apna cache invalidation.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const afterMutation = [\"revalidatePath\", \"revalidateTag\", \"router.refresh()\"];"
          },
          {
            "title": "Q8: [MID] Server Action vs API Route",
            "explain": "Seedha matlab:\nAction: tight React/forms integration, typed imports, less boilerplate.\nAPI route: public HTTP API, webhooks, non-React clients.\nDono valid — use-case choose.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const compare = {\n  serverAction: \"first-class for React forms/mutations in supported frameworks\",\n  apiRoute: \"generic HTTP for any client\",\n};"
          },
          {
            "title": "Q9: Errors & return values",
            "explain": "Seedha matlab:\nthrow → error UI / boundary depending on setup.\nreturn { error: '...' } → useActionState friendly (no throw).\nPrefer consistent pattern in team.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "// export async function save(prev, formData) {\n//   \"use server\";\n//   try {\n//     await db.save(...);\n//     return { ok: true, error: null };\n//   } catch {\n//     return { ok: false, error: \"Failed\" };\n//   }\n// }"
          },
          {
            "title": "Q10: [MID] Security checklist interview answer",
            "explain": "Seedha matlab:\n1) Authenticate 2) Authorize 3) Validate input 4) No secret leak in returns\n5) CSRF/framework protections samajh ke raho (Next docs).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export const serverActionSecurity = [\n  \"authn\",\n  \"authz\",\n  \"validate input\",\n  \"safe return payloads\",\n  \"know framework CSRF story\",\n];"
          },
          {
            "title": "Q11: [MID] FormData tampering — server must re-validate",
            "explain": "Kya karna hai:\nBrowser DevTools se hidden field badlo — server pe zod schema validate.\n\nSeedha matlab:\nClient required attribute bypass ho sakta hai.\nReact 18 API route same threat model.\nNever trust formData.get('role') === 'admin' bina session check.\nReturn generic errors — leak internals mat karo.\nRate limit destructive actions server-side.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const formTamperNote =\n  \"Treat all FormData as hostile — validate types, ranges, ownership on server.\";"
          },
          {
            "title": "Q12: Idempotent server actions",
            "explain": "Kya karna hai:\nDuplicate submit same idempotency key — double charge avoid.\n\nSeedha matlab:\nNetwork retry / double click → same action twice possible.\nReact 19 isPending helps client; server still idempotent design.\nReact 18 POST API same requirement.\nDB unique constraints + idempotency tokens payments me standard.\nReturn same success response on replay OK.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const idempotentActions =\n  \"Design mutations idempotent where possible — retries and double-submit happen.\";"
          },
          {
            "title": "Q13: [MID] Server Action + redirect",
            "explain": "Kya karna hai:\nLogin success → redirect('/') from server action (Next redirect() helper).\n\nSeedha matlab:\nFramework helpers throw special redirect — catch mat karo wrong.\nReact 18 client router.navigate after fetch login manual.\nProgressive enhancement: form POST login redirect without JS possible.\nReturn vs redirect choose per UX.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function RedirectActionNote() {\n  return (\n    <p>\n      Frameworks expose redirect() inside server actions for post-login navigation — behavior varies by framework.\n    </p>\n  );\n}"
          },
          {
            "title": "Q14: Cookies / session in server action",
            "explain": "Kya karna hai:\nawait cookies().set('session', token) — server-only APIs.\n\nSeedha matlab:\nHttpOnly cookies client JS se read nahi — security win.\nReact 18 client login sets cookie via Set-Cookie header from API response manual.\nServer action colocates mutation + session update.\nSecrets stay off client bundle.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const sessionCookieNote =\n  \"Set HttpOnly session cookies inside server actions — not via client document.cookie for auth tokens.\";"
          },
          {
            "title": "Q15: [MID] Server Action vs fetch to API route — code compare",
            "explain": "Kya karna hai:\nAction: import { save } from './actions'; form action={save}.\nAPI: fetch('/api/save', { method:'POST', body }) + JSON parse.\n\nSeedha matlab:\nAction less boilerplate typed imports React apps me.\nAPI route public contract mobile app / third party ke liye.\nReact 18 typically fetch API routes only.\nBoth execute server logic — duplication avoid — shared service layer.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const actionVsFetchBoilerplate = {\n  serverAction: \"direct import + form action prop\",\n  apiRoute: \"HTTP fetch + manual serialization + error parsing\",\n};"
          },
          {
            "title": "Q16: Closure capture inline server action trap",
            "explain": "Kya karna hai:\nInline 'use server' closure captures non-serializable value — build/runtime error.\n\nSeedha matlab:\nCapture productId string OK; capture DB connection object ❌.\nReact 18 N/A — pattern new with inline actions.\nPrefer module-level 'use server' functions for clarity.\nPass ids via FormData/hidden fields not closures when possible.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const closureTrap =\n  \"Inline server actions only close over serializable values — prefer module-level actions.\";"
          },
          {
            "title": "Q17: [MID] Optimistic UI + server action",
            "explain": "Kya karna hai:\nClient useOptimistic; action={serverFn}; fail pe rollback (file 32).\n\nSeedha matlab:\nServer action latency higher — optimistic UX valuable.\nReact 18 optimistic + fetch API route same combo.\nClient component required for useOptimistic.\nServer returns error object not throw for form validation UX.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function OptimisticServerActionNote() {\n  return (\n    <p>\n      useOptimistic on client + server action on submit — rollback when server returns error without base update.\n    </p>\n  );\n}"
          },
          {
            "title": "Q18: [ADV] CSRF / framework protections",
            "explain": "Kya karna hai:\nNext Server Actions POST with origin checks / encrypted action ids — framework docs padho.\n\nSeedha matlab:\nDon't assume CSRF impossible — know your framework story.\nReact 18 custom API routes need CSRF tokens if cookie auth.\nSame-site cookies + POST-only actions help.\nInterview: \"rely on framework + still validate auth\".",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const csrfNote =\n  \"Understand framework CSRF protections for server actions — don't roll custom insecure POST.\";"
          },
          {
            "title": "Q19: [MID] Logging and observability",
            "explain": "Kya karna hai:\nServer action me structured logs — user id, action name, duration.\n\nSeedha matlab:\nClient console.log secrets ❌; server logs OK with care.\nReact 18 API route handlers same observability.\nCorrelate with request id tracing production debugging.\nDon't log raw passwords FormData se.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const serverActionLogging =\n  \"Log mutations server-side with correlation ids — never log secrets from FormData.\";"
          },
          {
            "title": "Q20: [ADV] When NOT Server Actions",
            "explain": "Kya karna hai:\nPublic REST API products, webhooks Stripe, non-React mobile clients.\n\nSeedha matlab:\nServer Actions React-centric RPC — not universal HTTP API replacement.\nReact 18 REST remains fine.\nFile uploads huge — dedicated storage API sometimes better.\nGraphQL federation — different layer.\nLong-running jobs — queue worker not synchronous action.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const whenNotServerActions = [\n  \"public HTTP API for third parties\",\n  \"webhooks from external services\",\n  \"long-running background jobs\",\n  \"non-React clients\",\n];"
          },
          {
            "title": "Q21: [MID] Testing server actions",
            "explain": "Kya karna hai:\nImport action in test; call with FormData; mock db module.\n\nSeedha matlab:\nUnit test server function like service layer.\nIntegration test with test DB optional.\nReact 18 API route supertest similar.\nClient form E2E separate layer.\nMock auth getSession in tests.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function TestingServerActionsNote() {\n  return <p>Test server actions by calling them directly with FormData and mocked db/auth modules.</p>;\n}"
          },
          {
            "title": "Q22: [ADV] Interview — Server Actions checklist",
            "explain": "Kya karna hai:\n'use server', form/client call, validate auth, serializable returns, revalidate, CSRF awareness.\n\nSeedha matlab:\nvs React 18: fetch + API routes → less boilerplate in React apps.\nvs API routes: not for public HTTP; Actions for app mutations.\nTraps: trust FormData; closure capture; secrets client-side; no revalidate after mutate.\nPair useActionState pending UI client-side.\nSecurity 5-point file Q10 + tampering + idempotency.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export const serverActionInterviewChecklist = {\n  define: \"'use server' async functions invoked from forms or client handlers\",\n  mustDo: [\"authenticate\", \"authorize\", \"validate input\", \"safe returns\", \"cache revalidation\"],\n  vsApiRoute: \"Actions for React app mutations; API routes for public HTTP\",\n  vsReact18: \"less fetch boilerplate; colocated with components\",\n  traps: [\"trusted FormData\", \"non-serializable closures\", \"missing revalidate\", \"no idempotency\"],\n};"
          }
        ]
      },
      {
        "file": "39_ReactCompilerAndEffectEvent.jsx",
        "title": "39 — Compiler And useEffectEvent",
        "kya": "Do alag tools, aksar ek saath discuss:",
        "detail": "39 — React Compiler + useEffectEvent (React 19.2)\nLevel: REACT19  |  Sequence seekho: pehle yeh file, phir agla number\n\nLAYMAN: Do alag tools, aksar ek saath discuss:\n\n1) React Compiler (aka React Forget) —\n   build-time tool jo automatically memoize soch (useMemo/useCallback/React.memo\n   manually kam). Abhi opt-in / ecosystem adopt — \"magic compiler on\" samajh ke\n   rules of React follow karo (pure render, etc.).\n\n2) useEffectEvent (React 19.2) —\n   Effect ke ANDAR aisa function jo HAMESHA latest props/state padhe,\n   lekin effect ko dubara run na karaye sirf un values ke change pe.\n   Ye \"stale closure\" vs \"too many effect runs\" tension solve karta.\n\n❌ GALAT use: dependency array khali rakhne / eslint suppress karne ka shortcut.\n✅ SAHI use: effect subscribe logic stable; event handler ke andar fresh values.\n\nKYUN: 19.2 interviews + \"compiler se memo hata do?\" nuance.\nINTERVIEW: EffectEvent ≠ missing dep fix; compiler constraints.",
        "intro": "39 — React Compiler + useEffectEvent (React 19.2)\nLevel: REACT19  |  Sequence seekho: pehle yeh file, phir agla number\n\nLAYMAN: Do alag tools, aksar ek saath discuss:\n\n1) React Compiler (aka React Forget) —\n   build-time tool jo automatically memoize soch (useMemo/useCallback/React.memo\n   manually kam). Abhi opt-in / ecosystem adopt — \"magic compiler on\" samajh ke\n   rules of React follow karo (pure render, etc.).\n\n2) useEffectEvent (React 19.2) —\n   Effect ke ANDAR aisa function jo HAMESHA latest props/state padhe,\n   lekin effect ko dubara run na karaye sirf un values ke change pe.\n   Ye \"stale closure\" vs \"too many effect runs\" tension solve karta.\n\n❌ GALAT use: dependency array khali rakhne / eslint suppress karne ka shortcut.\n✅ SAHI use: effect subscribe logic stable; event handler ke andar fresh values.\n\nKYUN: 19.2 interviews + \"compiler se memo hata do?\" nuance.\nINTERVIEW: EffectEvent ≠ missing dep fix; compiler constraints.",
        "questions": [
          {
            "title": "Q1: React Compiler — seedha matlab",
            "explain": "Seedha matlab:\nCompiler analyze karta: kaunsa JSX/calc cache ho sakta.\nTum manually React.memo har jagah nahi chipkate.\nPhir bhi: impure render (math.random during render), mutating props —\ncompiler + React dono naraz.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const compilerIdea = {\n  goal: \"auto-memoize safe values/components\",\n  stillRequired: \"pure components, immutable props/state updates\",\n  notMagic: \"won't fix bad architecture or fetch-in-render chaos\",\n};"
          },
          {
            "title": "Q2: [MID] Compiler aane se useMemo hata dein?",
            "explain": "Seedha matlab:\nGradually: measure, follow compiler docs/compatibility.\nManual memo ab bhi valid jab intentional / compiler off / edge cases.\nInterview: \"compiler reduces NEED, not understanding of referential equality\".",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function ExpensiveList({ items }) {\n  // Without compiler you might useMemo filtered list.\n  // With compiler, often plain derived value is fine IF pure:\n  const visible = items.filter((x) => x.active);\n  return (\n    <ul>\n      {visible.map((x) => (\n        <li key={x.id}>{x.name}</li>\n      ))}\n    </ul>\n  );\n}"
          },
          {
            "title": "Q3: Stale closure problem (why EffectEvent exists)",
            "explain": "Seedha matlab:\nEffect me handler [] deps ke saath — andar count PURANA.\ncount deps me daalo — effect har count pe re-subscribe (waste / bugs).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function StaleChatBad({ roomId }) {\n  const [messages, setMessages] = useState([]);\n  const [count, setCount] = useState(0);\n\n  useEffect(() => {\n    function onMessage(msg) {\n      // ❌ agar count yahan use aur deps [roomId] only → stale count\n      console.log(\"got\", msg, \"count was\", count);\n      setMessages((m) => [...m, msg]);\n    }\n    // fakeSubscribe(roomId, onMessage);\n    // return () => fakeUnsubscribe(roomId, onMessage);\n  }, [roomId, count]); // count se re-subscribe — sometimes unwanted\n\n  return (\n    <button onClick={() => setCount((c) => c + 1)}>\n      ping {count} / msgs {messages.length}\n    </button>\n  );\n}"
          },
          {
            "title": "Q4: useEffectEvent — latest values, stable effect deps",
            "explain": "Seedha matlab:\nonMessage = useEffectEvent((msg) => { ... use latest count ... })\nEffect sirf [roomId] pe subscribe.\nEvent function identity effect deps me NAHI dalni.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function ChatWithEffectEvent({ roomId }) {\n  const [messages, setMessages] = useState([]);\n  const [count, setCount] = useState(0);\n\n  const onMessage = useEffectEvent((msg) => {\n    // always latest count\n    console.log(\"count now\", count);\n    setMessages((m) => [...m, msg]);\n  });\n\n  useEffect(() => {\n    function handler(msg) {\n      onMessage(msg);\n    }\n    // subscribe(roomId, handler)\n    // return () => unsubscribe(roomId, handler)\n  }, [roomId]); // onMessage intentionally NOT a dep\n\n  return (\n    <button onClick={() => setCount((c) => c + 1)}>\n      {count} / {messages.length}\n    </button>\n  );\n}"
          },
          {
            "title": "Q5: [MID] DON'T use EffectEvent to silence eslint",
            "explain": "Seedha matlab:\nAgar data effect ke RUN trigger me hona chahiye (fetch id change),\nwoh dependency ME hona chahiye — EffectEvent me mat chhupao.\nEffectEvent = \"event fired later, read latest\".\nReactive input to effect = real dependency.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function FetchUser({ userId }) {\n  const [user, setUser] = useState(null);\n\n  // ✅ userId belongs in deps — effect must re-run when id changes\n  useEffect(() => {\n    let cancelled = false;\n    fetch(\"/api/users/\" + userId)\n      .then((r) => r.json())\n      .then((data) => {\n        if (!cancelled) setUser(data);\n      });\n    return () => {\n      cancelled = true;\n    };\n  }, [userId]);\n\n  return <pre>{JSON.stringify(user)}</pre>;\n}"
          },
          {
            "title": "Q6: Analytics click — EffectEvent-shaped thinking",
            "explain": "Seedha matlab:\nSubscribe once; jab event aaye tab latest theme/user padho.\nClassic EffectEvent fit.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function TrackClicks({ userId, theme }) {\n  const logClick = useEffectEvent((target) => {\n    console.log(\"click\", { userId, theme, target });\n  });\n\n  useEffect(() => {\n    function onClick(e) {\n      logClick(e.target?.tagName);\n    }\n    window.addEventListener(\"click\", onClick);\n    return () => window.removeEventListener(\"click\", onClick);\n  }, []);\n\n  return <p>Click anywhere (demo)</p>;\n}"
          },
          {
            "title": "Q7: React 19.2 Activity (brief)",
            "explain": "Seedha matlab:\nActivity = UI ko hide/show with better semantics than display:none hacks\n(state preserve / priority — follow current React 19.2 docs).\nOverview pehle file 28; yahan sirf yaad: \"exists, don't invent API from memory\".",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const activityNote =\n  \"Activity in 19.2: check official docs for hide/show + preserve patterns.\";"
          },
          {
            "title": "Q8: [MID] Compiler + Effects together",
            "explain": "Seedha matlab:\nCompiler re-renders kam kare; effects phir bhi sync external systems.\nEffects ko \"derive state\" ke liye mat use karo — calculate during render.\nEffectEvent external event/subscribe paths clean rakhe.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const together = {\n  compiler: \"render cost / referential stability\",\n  effects: \"sync with outside world\",\n  effectEvent: \"latest props inside those syncs without extra resubscribe\",\n};"
          },
          {
            "title": "Q9: Interview closer",
            "explain": "Seedha matlab:\n\"Compiler memoizes safely when code follows Rules of React.\nuseEffectEvent latest values in effect callbacks — NOT a deps escape hatch.\nMissing dep that should re-fire effect = still a bug.\"",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export const interviewCloser =\n  \"EffectEvent for non-reactive event reads; real reactive inputs stay in deps.\";"
          },
          {
            "title": "Q10: [MID] React Compiler — what breaks memo assumptions",
            "explain": "Kya karna hai:\nMutating props, context, or module vars during render — compiler can't save you.\n\nSeedha matlab:\nPure render: same props+state → same JSX output.\nReact 18 manual memo also fails with impure render.\nCompiler opt-in project config — not global React default yet.\neslint-plugin-react-compatibility follow during adoption.\nMeasure before deleting all useMemo.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const compilerBreaks = [\n  \"mutating props or state in place\",\n  \"reading mutable module globals in render\",\n  \"side effects during render\",\n  \"unstable external store reads without subscription\",\n];"
          },
          {
            "title": "Q11: Compiler vs React.memo — coexistence",
            "explain": "Kya karna hai:\nCompiler on hone pe bhi explicit memo harmful nahi — redundant ho sakta.\n\nSeedha matlab:\nLibrary components export memo for consumers without compiler.\nReact 18 libs still ship React.memo — valid.\nGradual adoption: enable compiler on app, profile, remove redundant memos.\nInterview: \"compiler reduces need, not knowledge\".",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function CompilerMemoCoexist() {\n  return <p>Manual memo and compiler can coexist during migration — profile before mass removal.</p>;\n}"
          },
          {
            "title": "Q12: [MID] useEffectEvent — NOT callable during render",
            "explain": "Kya karna hai:\nonMessage() render me mat bulao — sirf effect/subscription callback ke andar.\n\nSeedha matlab:\nEffectEvent function render phase me forbidden — rules similar event handler.\nReact 19.2 new — older versions lack hook.\nReact 18 workaround: ref holding latest callback manually (callback ref pattern).\nTrap: EffectEvent ko normal event handler ki tarah JSX onClick me mat daalo blindly.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function EffectEventRenderTrap() {\n  const log = useEffectEvent(() => {\n    console.log(\"only from effect/subscription\");\n  });\n  useEffect(() => {\n    const id = setInterval(() => log(), 5000);\n    return () => clearInterval(id);\n  }, []); // log is EffectEvent — intentionally not a dep\n  return <p>EffectEvent called from interval inside effect — OK</p>;\n}"
          },
          {
            "title": "Q13: Ref pattern before EffectEvent (React 18 style)",
            "explain": "Kya karna hai:\nlatestCallbackRef.current = fn; effect subscribes stable wrapper calling ref.current().\n\nSeedha matlab:\nManual latest ref pattern — EffectEvent replaces boilerplate.\nReact 18 codebase me yeh pattern common tha subscriptions me.\nMigration 19.2: replace ref callback bridge with useEffectEvent where fit.\nStill valid without 19.2 — don't block upgrade.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const react18LatestRefPattern =\n  \"useRef + assign latest handler each render + stable subscribe wrapper — EffectEvent replaces this.\";"
          },
          {
            "title": "Q14: [MID] EffectEvent vs useCallback deps",
            "explain": "Kya karna hai:\nuseCallback(fn, [many deps]) effect me pass → deps change → resubscribe.\n\nSeedha matlab:\nEffectEvent when values needed at event time not subscription time.\nuseCallback still fine normal JSX handlers ke liye.\nReact 18: useCallback + deps on handler passed to effect → same resubscribe issue.\nChoose: reactive deps → put in effect deps; non-reactive read → EffectEvent.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function EffectEventVsCallback() {\n  return (\n    <p>\n      useCallback for render handlers; useEffectEvent for handlers invoked from effects/subscriptions reading latest props.\n    </p>\n  );\n}"
          },
          {
            "title": "Q15: Activity API — when to look (19.2)",
            "explain": "Kya karna hai:\nHidden tabs preserving state — Activity component docs follow; don't invent API.\n\nSeedha matlab:\nAlternative display:none + keep mounted hacks possibly cleaner semantics.\nReact 18: conditional render loses state unless keep mounted manually.\nExact props/check official 19.2 release notes — interview say \"know it exists\".\nFramework integration may vary.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const activityWhen =\n  \"Use Activity for hide/show preserving UI state — verify current React 19.2 docs before production.\";"
          },
          {
            "title": "Q16: [MID] Compiler + Context unstable value",
            "explain": "Kya karna hai:\nCompiler context read optimize kar sakta but unstable Provider value still re-renders consumers.\n\nSeedha matlab:\nCompiler ≠ fix context value={{}} trap automatically always.\nReact 18 useMemo on provider value; 19 same (file 36).\nProfile before assuming compiler solved perf.\nSplit contexts structural fix.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function CompilerContextInteraction() {\n  return <p>Compiler optimizes some memoization; unstable context values still need architectural fixes.</p>;\n}"
          },
          {
            "title": "Q17: [ADV] EffectEvent in Strict Mode dev",
            "explain": "Kya karna hai:\nEffect double setup dev — subscription must cleanup; EffectEvent identity stable.\n\nSeedha matlab:\nReact 18 Strict Mode same double invoke.\nEffectEvent designed stable across renders — don't put in effect deps.\nVerify cleanup on unmount still runs.\nProduction single mount.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const effectEventStrict =\n  \"Strict Mode double effects in dev — ensure subscribe/unsubscribe idempotent; EffectEvent not in deps.\";"
          },
          {
            "title": "Q18: [MID] When NOT enable React Compiler yet",
            "explain": "Kya karna hai:\nLegacy code impure, incompatible libs, no time to fix eslint violations.\n\nSeedha matlab:\nOpt-in toolchain — Babel/plugin setup required.\nReact 18 apps run fine without compiler indefinitely.\nTeam bandwidth to fix purity violations first.\nLibraries may not be compiler-tested — check compatibility lists.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const whenNotCompiler = [\n  \"impure render patterns widespread\",\n  \"incompatible dependency libs\",\n  \"no CI time to fix compiler lint violations\",\n];"
          },
          {
            "title": "Q19: [ADV] derive during render vs EffectEvent",
            "explain": "Kya karna hai:\ndisplayed = props.a + props.b → render me; EffectEvent mat lagao.\n\nSeedha matlab:\nEffectEvent external event timing ke liye — websocket message, DOM event.\nReact 18: derive in render same rule.\nCompiler loves derived render values — effects se derive mat karo.\nMissing dep in effect fetch userId — EffectEvent WRONG fix; userId dep me hona chahiye (Q5).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function DeriveInRender({ a, b }) {\n  const sum = a + b;\n  return <p>{sum}</p>;\n}"
          },
          {
            "title": "Q20: [MID] Migration React 18 → 19.2 EffectEvent",
            "explain": "Kya karna hai:\nFind ref-bridge patterns in effects → replace with useEffectEvent stepwise.\n\nSeedha matlab:\nRequires react 19.2+ — feature detect / version check docs.\nReact 18 latestRef in subscription effects common migration target.\nDon't migrate effect deps that should stay reactive.\nTest subscription behavior after refactor thoroughly.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const effectEventMigration =\n  \"Replace latest-ref callback bridges in effects with useEffectEvent where reads are non-reactive.\";"
          },
          {
            "title": "Q21: [ADV] Compiler interview traps",
            "explain": "Kya karna hai:\n\"Compiler on so Rules of React optional?\" — NO. \"All useMemo delete?\" — measure first.\n\nSeedha matlab:\nCompiler doesn't remove need for keys, pure components, proper state design.\nReact 18 devs still need referential equality understanding debugging.\nThird-party memo expectations may remain.\nEdge SSR/hydration purity still matters.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export const compilerInterviewTraps = [\n  \"thinking compiler fixes impure render\",\n  \"removing all useMemo without profiling\",\n  \"ignoring Rules of React\",\n  \"assuming library components auto-compatible\",\n];"
          },
          {
            "title": "Q22: [ADV] Full stack answer — Compiler + EffectEvent + React 19 forms",
            "explain": "Kya karna hai:\nTie together: compiler reduces render cost; actions handle async forms; EffectEvent cleans subscriptions.\n\nSeedha matlab:\nOrthogonal tools — not replacements for each other.\nReact 18 upgrade path: 19 hooks first, compiler optional, EffectEvent when on 19.2.\nActivity exploratory 19.2.\nInterview close: purity + correct deps + Actions for forms + EffectEvent for effect events only.\nCommon bug: EffectEvent to hide fetch deps — still wrong.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
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
        "kya": "Yeh file RUNBOOK hai mid React interviews ke liye —",
        "detail": "40 — Mid-Level React Interview Questions (Hinglish dump) — 47 Qs\nLevel: INTERVIEW  |  Sequence seekho: pehle React19 files, phir yeh revise\n\nLAYMAN: Yeh file RUNBOOK hai mid React interviews ke liye —\nhooks rules, keys, batching, stale closures, Virtual DOM myth,\nuseEffect deps, performance, React 19 Actions vs purane submit handlers.\n\nHar Q: Seedha matlab + chhota code jahan useful.\n[MID] = typical mid-level depth. Ratta mat — soch ke bolo.\n\nKYUN: Ek jagah revise; baaki files me depth.\nINTERVIEW: Clear Hinglish/English mix OK — concepts precise.",
        "intro": "40 — Mid-Level React Interview Questions (Hinglish dump) — 47 Qs\nLevel: INTERVIEW  |  Sequence seekho: pehle React19 files, phir yeh revise\n\nLAYMAN: Yeh file RUNBOOK hai mid React interviews ke liye —\nhooks rules, keys, batching, stale closures, Virtual DOM myth,\nuseEffect deps, performance, React 19 Actions vs purane submit handlers.\n\nHar Q: Seedha matlab + chhota code jahan useful.\n[MID] = typical mid-level depth. Ratta mat — soch ke bolo.\n\nKYUN: Ek jagah revise; baaki files me depth.\nINTERVIEW: Clear Hinglish/English mix OK — concepts precise.",
        "questions": [
          {
            "title": "Q1: [MID] Rules of Hooks kya hain?",
            "explain": "Seedha matlab:\n1) Sirf React function components / custom hooks ke top-level pe call.\n2) Loops, conditions, nested functions me ordinary hooks mat.\n3) Order har render same rehna chahiye — React hooks list pe depend.\nException: React 19 ka `use()` conditional context/promise allow (file 33).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function BadHooks({ flag }) {\n  // if (flag) useState(0); // ❌\n  const [n, setN] = useState(0); // ✅ always\n  return <button onClick={() => setN(n + 1)}>{n}</button>;\n}"
          },
          {
            "title": "Q2: [MID] List me key kyun? index kab avoid?",
            "explain": "Seedha matlab:\nkey = identity across reorders. Galat key = state galat item pe chipak.\nindex key OK static list; avoid jab insert/delete/reorder + item state.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function TodoList({ todos }) {\n  return (\n    <ul>\n      {todos.map((t) => (\n        <li key={t.id}>{t.title}</li> // ✅ stable id\n      ))}\n    </ul>\n  );\n}"
          },
          {
            "title": "Q3: [MID] setState async / batching?",
            "explain": "Seedha matlab:\nReact 18+ mostly automatic batching — ek event me multiple setState\nek re-render. Turant purana state mat expect.\nNext value chahiye → functional updater setN(n => n+1).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function BatchDemo() {\n  const [a, setA] = useState(0);\n  const [b, setB] = useState(0);\n  function onClick() {\n    setA((x) => x + 1);\n    setB((x) => x + 1); // batched → usually 1 render\n  }\n  return (\n    <button onClick={onClick}>\n      {a},{b}\n    </button>\n  );\n}"
          },
          {
            "title": "Q4: [MID] Stale closure / stale state in setTimeout",
            "explain": "Seedha matlab:\nHandler ne purana count close kiya. setCount(count+1) stale ho sakta.\nFix: functional update, ya ref for latest, ya EffectEvent (19.2) patterns.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function StaleCounter() {\n  const [count, setCount] = useState(0);\n  function schedule() {\n    setTimeout(() => {\n      // setCount(count + 1); // ❌ may stale\n      setCount((c) => c + 1); // ✅\n    }, 1000);\n  }\n  return <button onClick={schedule}>{count}</button>;\n}"
          },
          {
            "title": "Q5: [MID] Virtual DOM myth — \"Virtual DOM fast isliye React fast\"?",
            "explain": "Seedha matlab:\nVDOM = UI ka JS object snapshot; diff se kam DOM updates decide.\nFast ka asli game: predictable update model, batching, concurrent,\navoiding unnecessary work — sirf \"VDOM magic\" nahi.\nSvelte/Solid bina classic VDOM bhi fast. Nuanced answer do.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const vdomAnswer =\n  \"VDOM is a strategy, not the only reason React apps feel fast; avoid unnecessary renders too.\";"
          },
          {
            "title": "Q6: [MID] useEffect deps — empty vs missing vs full",
            "explain": "Seedha matlab:\n[] = mount/unmount sync (subscribe once).\n[id] = jab id change, re-run.\nMissing dep = stale bug. Extra dep = extra runs.\nDerive during render jab ho sake — effect se state copy mat.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function UserEffect({ userId }) {\n  const [user, setUser] = useState(null);\n  useEffect(() => {\n    let alive = true;\n    fetch(\"/api/\" + userId)\n      .then((r) => r.json())\n      .then((u) => {\n        if (alive) setUser(u);\n      });\n    return () => {\n      alive = false;\n    };\n  }, [userId]);\n  return <pre>{JSON.stringify(user)}</pre>;\n}"
          },
          {
            "title": "Q7: [MID] Controlled vs uncontrolled input",
            "explain": "Seedha matlab:\nControlled: value + onChange (React state source).\nUncontrolled: defaultValue + ref / FormData (DOM source).\nReact 19 Actions often FormData/uncontrolled-friendly.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function Controlled({ value, onChange }) {\n  return <input value={value} onChange={(e) => onChange(e.target.value)} />;\n}"
          },
          {
            "title": "Q8: [MID] Lifting state up kab?",
            "explain": "Seedha matlab:\nJab do children same data share / sync. Parent owner.\nOver-lift mat karo — prop drilling → Context / composition.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function ParentLift() {\n  const [text, setText] = useState(\"\");\n  return (\n    <>\n      <input value={text} onChange={(e) => setText(e.target.value)} />\n      <p>{text}</p>\n    </>\n  );\n}"
          },
          {
            "title": "Q9: [MID] useMemo / useCallback kab?",
            "explain": "Seedha matlab:\nExpensive calc; ya referential equality for memoized child deps.\nDefault har jagah mat chipkao — measure / compiler (file 39).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function Filtered({ items, query }) {\n  const filtered = useMemo(\n    () => items.filter((x) => x.includes(query)),\n    [items, query]\n  );\n  return <div>{filtered.length}</div>;\n}"
          },
          {
            "title": "Q10: [MID] React.memo kya karta?",
            "explain": "Seedha matlab:\nShallow props compare — same props pe re-render skip (usually).\nParent re-render ≠ child re-render agar memo + stable props.\nCallbacks unstable → memo tod — useCallback / compiler.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export const Row = memo(function Row({ label }) {\n  return <div>{label}</div>;\n});"
          },
          {
            "title": "Q11: [MID] useRef vs useState",
            "explain": "Seedha matlab:\nref change re-render nahi karta. DOM handles, timers, latest values.\nState = UI me dikhana. Render ke dauran ref.current padh ke UI decide risky.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function TimerRef() {\n  const id = useRef(null);\n  const [tick, setTick] = useState(0);\n  useEffect(() => {\n    id.current = setInterval(() => setTick((t) => t + 1), 1000);\n    return () => clearInterval(id.current);\n  }, []);\n  return <span>{tick}</span>;\n}"
          },
          {
            "title": "Q12: [MID] Why cleanup in useEffect?",
            "explain": "Seedha matlab:\nSubscribe kiya to unsubscribe. Timers clear. Stale fetch ignore.\nStrict Mode dev me mount→unmount→remount — cleanup sahi hona chahiye.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function WatchWidth() {\n  const [w, setW] = useState(0);\n  useEffect(() => {\n    function onResize() {\n      setW(window.innerWidth);\n    }\n    window.addEventListener(\"resize\", onResize);\n    onResize();\n    return () => window.removeEventListener(\"resize\", onResize);\n  }, []);\n  return <span>{w}</span>;\n}"
          },
          {
            "title": "Q13: [MID] Keys + local state bug story",
            "explain": "Seedha matlab:\nDo inputs list — key=index, pehla delete → doosre ka text pehle pe aa sakta.\nStable id keys + remount via key={id} jab form reset chahiye.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function EditableList({ items, onRemove }) {\n  return items.map((item) => (\n    <div key={item.id}>\n      <input defaultValue={item.text} />\n      <button onClick={() => onRemove(item.id)}>x</button>\n    </div>\n  ));\n}"
          },
          {
            "title": "Q14: [MID] State updates with objects — mutate mat",
            "explain": "Seedha matlab:\nsetUser me user.name = x; setUser(user) — same reference, miss updates.\nNaya object: setUser({ ...user, name: x }).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function Profile() {\n  const [user, setUser] = useState({ name: \"Ada\", age: 30 });\n  return (\n    <button\n      onClick={() => setUser({ ...user, age: user.age + 1 })}\n    >\n      {user.name} {user.age}\n    </button>\n  );\n}"
          },
          {
            "title": "Q15: [MID] Context performance pain",
            "explain": "Seedha matlab:\nEk bada value object change → saare consumers re-render.\nSplit context; pass stable dispatch; children composition.\nReact 19: <Ctx value={...}> syntax (file 36) — problem same.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const tip = \"Split frequently-changing state from static config in context.\";"
          },
          {
            "title": "Q16: [MID] Error Boundaries kya catch karti?",
            "explain": "Seedha matlab:\nRender/lifecycle errors children me. Event handlers / async khud try/catch.\nSuspense alag (loading). Rejected use(promise) → boundary.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const errorBoundaryNote =\n  \"Boundaries catch render errors; not click handlers or setTimeout unless rethrown to render.\";"
          },
          {
            "title": "Q17: [MID] Concurrent / startTransition kab?",
            "explain": "Seedha matlab:\nUrgent: typing input. Non-urgent: filter huge list.\nstartTransition se input snappy, list peeche update.\nisPending se pending UI.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function SearchBig({ all }) {\n  const [q, setQ] = useState(\"\");\n  const [list, setList] = useState(all);\n  const [pending, startTransition] = useTransition();\n  return (\n    <>\n      <input\n        value={q}\n        onChange={(e) => {\n          const v = e.target.value;\n          setQ(v);\n          startTransition(() => {\n            setList(all.filter((x) => x.includes(v)));\n          });\n        }}\n      />\n      {pending ? \"...\" : list.length}\n    </>\n  );\n}"
          },
          {
            "title": "Q18: [MID] React 19 Actions vs old onSubmit handlers",
            "explain": "Seedha matlab:\nOld: onSubmit → preventDefault → manual loading/error state.\nNew: action={async (formData)=>...} + useActionState / useFormStatus.\nOld ab bhi valid. Actions = FormData-first + pending integration.\nServer Actions ('use server') mutations server pe (file 38).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "async function save(prev, formData) {\n  // await api\n  return { ok: true, title: formData.get(\"title\") };\n}\n\nexport function ActionVsSubmit() {\n  const [state, formAction, pending] = useActionState(save, { ok: false });\n  return (\n    <form action={formAction}>\n      <input name=\"title\" />\n      <button disabled={pending}>Save</button>\n      {state.ok && <p>Saved {state.title}</p>}\n    </form>\n  );\n}"
          },
          {
            "title": "Q19: [MID] useOptimistic one-liner",
            "explain": "Seedha matlab:\nPehle UI update, server baad me; fail pe base state pe rollback.\nLow-risk actions (likes). Payments pe conservative raho.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const optimisticLine =\n  \"Show success instantly; reconcile with server; roll back on failure.\";"
          },
          {
            "title": "Q20: [MID] use() hook rules",
            "explain": "Seedha matlab:\nuse(promise) Suspense; use(context) conditional OK.\nBaaki hooks top-level. Promise identity stable.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const useHookLine =\n  \"use unwraps promise/context; conditional OK for use; cache promises.\";"
          },
          {
            "title": "Q21: [MID] forwardRef ab?",
            "explain": "Seedha matlab:\nReact 19: ref normal prop. forwardRef legacy/compat.\nuseImperativeHandle limited parent API.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Input19({ ref, ...rest }) {\n  return <input ref={ref} {...rest} />;\n}"
          },
          {
            "title": "Q22: [MID] CSR fetch waterfall vs RSC",
            "explain": "Seedha matlab:\nClient mount → spinner → fetch → nested fetch = waterfall.\nServer Components await tree pe parallelize / closer to data.\nHybrid: server initial + client interactivity.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const rscLine =\n  \"RSC moves initial data work to server; client for interaction islands.\";"
          },
          {
            "title": "Q23: [MID] Why not put everything in useEffect?",
            "explain": "Seedha matlab:\nEffects = sync external system (DOM, network subscription, widgets).\nDerived values → render me calculate.\nReset state jab prop change → key remount pattern often cleaner.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function FullName({ first, last }) {\n  // ❌ useEffect sync full from first/last\n  const full = first + \" \" + last; // ✅\n  return <span>{full}</span>;\n}"
          },
          {
            "title": "Q24: [MID] Strict Mode double invoke — bug ya feature?",
            "explain": "Seedha matlab:\nDev me effects setup/cleanup/setup — impure effects pakadne ke liye.\nProduction me double nahi. Cleanup sahi likho.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const strictLine =\n  \"Dev double-mount finds missing cleanup; write effects idempotent.\";"
          },
          {
            "title": "Q25: [MID] Performance checklist (bolke sunao)",
            "explain": "Seedha matlab:\n1) Unnecessary state 2) State location 3) memo where measured\n4) virtualize long lists 5) code split 6) RSC/less JS\n7) images/network 8) avoid layout thrash in effects",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export const perfChecklist = [\n  \"cut state\",\n  \"lift only as needed\",\n  \"memo after measure\",\n  \"virtualize long lists\",\n  \"lazy routes\",\n  \"server components when available\",\n];"
          },
          {
            "title": "Q26: [MID] useFormStatus child-only rule",
            "explain": "Seedha matlab:\nreact-dom se; nearest parent form; form ke child component me call.\nSame component jo <form> likhe wahan mat.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const formStatusLine =\n  \"useFormStatus in child of form; import from react-dom.\";"
          },
          {
            "title": "Q27: [MID] useEffectEvent (19.2) — trap question",
            "explain": "Seedha matlab:\nLatest props in event inside effect WITHOUT adding them as deps.\nNOT for hiding required deps (fetch userId must stay in deps).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const effectEventLine =\n  \"EffectEvent = non-reactive read in effect events; not eslint-disable.\";"
          },
          {
            "title": "Q28: [MID] Controlled form + Action mix advice",
            "explain": "Seedha matlab:\nLive validation → local useState.\nSubmit mutation → action / server action.\nDon't fight FormData — name attributes rakho ya intentionally controlled.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const mixLine = \"Local state for UX; Actions for submit/mutation pipeline.\";"
          },
          {
            "title": "Q29: [MID] TypeScript — props typing basics",
            "explain": "Seedha matlab:\nExplicit props type/interface best practice. React.FC optional — children\nimplicit wala purana pattern avoid karo unless chahiye.\nOptional props: prop?: string. Union: variant: 'sm' | 'lg'.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "/** @typedef {{ label: string; onClick?: () => void; disabled?: boolean }} ButtonProps */\nfunction TypedButton({ label, onClick, disabled = false }) {\n  return (\n    <button type=\"button\" onClick={onClick} disabled={disabled}>\n      {label}\n    </button>\n  );\n}"
          },
          {
            "title": "Q30: [MID] TypeScript — events, useRef, generic list",
            "explain": "Seedha matlab:\nonChange: ChangeEvent<HTMLInputElement>. Ref: useRef<HTMLInputElement>(null).\nGeneric: function List<T>({ items, render }: { items: T[]; render: (x: T) => ReactNode })\nas const for literal unions. Discriminated unions for modal state.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function TypedInput() {\n  const inputRef = useRef(null);\n  const [text, setText] = useState(\"\");\n  return (\n    <input\n      ref={inputRef}\n      value={text}\n      onChange={(e) => setText(e.target.value)}\n    />\n  );\n}"
          },
          {
            "title": "Q31: [MID] Accessibility quick hits",
            "explain": "Seedha matlab:\nSemantic HTML pehle: button, nav, main, label htmlFor.\nIcon-only button → aria-label. Modal → focus trap + Esc close.\nKeyboard: Tab order logical; custom widgets → role + key handlers.\nColor contrast + don't rely on color alone. Live regions for toasts.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function A11yIconButton({ onClick, label }) {\n  return (\n    <button type=\"button\" aria-label={label} onClick={onClick}>\n      ×\n    </button>\n  );\n}"
          },
          {
            "title": "Q32: [MID] Zustand vs Context — kab kya?",
            "explain": "Seedha matlab:\nContext: theme, locale, auth shell — kam change, tree-wide read.\nZustand/Redux: frequent updates, many selectors, outside-React reads.\nContext har value change pe saare consumers re-render (split mat karo to).\nZustand = subscribe slice-wise → kam unnecessary renders.\nSmall app + simple global → Context OK. Cart/filters/realtime → store.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const zustandVsContext =\n  \"Context for low-churn config; Zustand when many components need selective fast updates.\";"
          },
          {
            "title": "Q33: [MID] React Hook Form + Zod",
            "explain": "Seedha matlab:\nRHF = uncontrolled default, register/ref, kam re-renders on keystroke.\nzodResolver(schema) → typed errors; schema single source of truth.\nServer errors → setError('root' | field). defaultValues reset ke liye.\nLarge forms: Controller sirf jahan controlled widget chahiye (MUI date).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const rhfZodPattern = `\nconst schema = z.object({ email: z.string().email(), age: z.coerce.number().min(18) });\nconst { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) });\n`;"
          },
          {
            "title": "Q34: [ADV] React Router loaders / data routers",
            "explain": "Seedha matlab:\nloader route enter pe data fetch — component render se pehle.\ndefer() + Suspense → critical fast, slow stream. action for mutations.\nshouldRevalidate control stale refetch. ErrorBoundary + errorElement.\nvs useEffect fetch: no spinner flash, parallel routes, redirect in loader.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const loaderLine =\n  \"Loader runs before render; defer splits critical vs slow; action handles form POST.\";"
          },
          {
            "title": "Q35: [ADV] startTransition vs useDeferredValue — deep",
            "explain": "Seedha matlab:\nstartTransition: YOU mark state update non-urgent (setState inside).\nuseDeferredValue: defer DISPLAY of already-urgent state (prop/value lag).\nTyping filter: setQ urgent + startTransition filter OR defer deferredQ.\ndeferredValue stale dikha sakta — isPending/deferred !== value check.\nDono concurrent; choose based on who owns the update.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function DeferredSearch({ query, items }) {\n  const deferredQuery = useDeferredValue(query);\n  const isStale = deferredQuery !== query;\n  const shown = useMemo(\n    () => items.filter((x) => x.includes(deferredQuery)),\n    [items, deferredQuery]\n  );\n  return (\n    <ul style={{ opacity: isStale ? 0.6 : 1 }}>\n      {shown.map((x) => (\n        <li key={x}>{x}</li>\n      ))}\n    </ul>\n  );\n}"
          },
          {
            "title": "Q36: [MID] Class lifecycle → hooks map",
            "explain": "Seedha matlab:\nconstructor/state init → useState initial\ncomponentDidMount → useEffect([], ...)\ncomponentDidUpdate → useEffect([deps], ...) — specific deps, not \"everything\"\ncomponentWillUnmount → useEffect return cleanup\nshouldComponentUpdate → React.memo / PureComponent\ngetDerivedStateFromProps → derive render me; key reset pattern\ncomponentDidCatch → Error Boundary class (still class-only API)",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const lifecycleMap = {\n  mount: \"useEffect(() => {}, [])\",\n  update: \"useEffect(() => {}, [dep])\",\n  unmount: \"useEffect(() => () => cleanup, [])\",\n  memo: \"memo(Component)\",\n  error: \"class ErrorBoundary\",\n};"
          },
          {
            "title": "Q37: [MID] Auth token storage — interview security",
            "explain": "Seedha matlab:\nlocalStorage XSS pe steal ho sakta — sensitive long-lived token avoid.\nhttpOnly Secure SameSite cookie = refresh token sweet spot (JS read nahi).\nAccess token memory-only / short TTL; BFF pattern extra layer.\nNever URL/hash me token. CSRF: SameSite + token header for cookie auth.\n\"localStorage easy\" ≠ production-safe answer bolo.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const authStorageLine =\n  \"httpOnly cookie for refresh; short-lived access in memory; localStorage = XSS risk.\";"
          },
          {
            "title": "Q38: [MID] React 19 Actions vs React Hook Form",
            "explain": "Seedha matlab:\nRHF: complex client validation, field-level UX, 50+ fields, MUI integration.\nActions: native form submit, FormData, server mutations, progressive enhancement.\nMix: RHF handleSubmit → build FormData → call server action.\nActions replace RHF nahi — overlap submit pipeline pe. Pick by form complexity.\nuseActionState pending vs RHF isSubmitting — similar mental model.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const actionsVsRhf =\n  \"RHF for rich client forms; Actions for server-first submit; combine when needed.\";"
          },
          {
            "title": "Q39: [MID] Testing Library — getByRole first",
            "explain": "Seedha matlab:\nQuery priority: getByRole > label > placeholder > text > testId (last resort).\ngetByRole('button', { name: /save/i }) = user + a11y aligned.\nuserEvent over fireEvent for realistic clicks/type.\nfindBy* async; waitFor transitions. within() scope nested widgets.\nImplementation details (class, internal state) test mat — behavior test.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const rtlQueryLine =\n  \"getByRole('textbox', { name: 'Email' }) beats getByTestId('email-input').\";"
          },
          {
            "title": "Q40: [MID] Hydration mismatch — kyun hota, fix?",
            "explain": "Seedha matlab:\nServer HTML ≠ client first render → React warn + re-render client side.\nCulprits: Date.now(), Math.random(), window/localStorage in render,\ninvalid HTML nesting (p inside p), browser extensions.\nFix: useEffect for client-only bits; suppressHydrationWarning sparingly on\nknown diffs (timestamp). SSR me same deterministic output ensure karo.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const hydrationLine =\n  \"Render same on server and client; defer browser-only values to useEffect.\";"
          },
          {
            "title": "Q41: [ADV] Keys + state — checkbox reorder horror story",
            "explain": "Seedha matlab:\nTodo list: checkbox + text, key={index}. Reorder/delete → checked state\ngalat row pe shift (React reused DOM node by wrong identity).\nFix: key={item.id}. Form reset per item: key={`${id}-${version}`}.\nAnti-pattern: key={Math.random()} — har render remount, state/focus lost.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function CheckableList({ items }) {\n  return items.map((item) => (\n    <label key={item.id}>\n      <input type=\"checkbox\" defaultChecked={item.done} />\n      {item.text}\n    </label>\n  ));\n}"
          },
          {
            "title": "Q42: [MID] Composition vs inheritance",
            "explain": "Seedha matlab:\nReact me inheritance avoid — components compose. children, render props,\nslots (header/footer props), compound components (Tabs.Tab).\n\"Is-a\" Button extends Input ❌. \"Has-a\" Card with actions prop ✅.\nHOC / wrappers legacy; hooks + composition preferred today.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Card({ title, children, footer }) {\n  return (\n    <section>\n      <h2>{title}</h2>\n      <div>{children}</div>\n      {footer}\n    </section>\n  );\n}"
          },
          {
            "title": "Q43: [ADV] Controlled forms at scale",
            "explain": "Seedha matlab:\n50 fields pure useState = prop drilling + re-render storm.\nPatterns: useReducer single form state; RHF register; Formik less common now.\nField components wrap register + error display. Schema validation (Zod).\nSplit wizard steps — unmount step = consider persist or keep mounted hidden.\nServer Actions per step vs one big submit — UX + validation boundaries.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const scaledFormLine =\n  \"RHF/reducer + schema + field components; avoid 50 useState hooks.\";"
          },
          {
            "title": "Q44: [MID] Performance profiling — interview answers",
            "explain": "Seedha matlab:\nReact DevTools Profiler: record interaction, flamegraph, \"why did this render?\"\nCommit duration rank karo — optimize slowest first. Don't memo blind.\nChrome Performance + React profiler combined for long tasks.\nLighthouse ≠ React perf; use for load metrics. Web Vitals INP/LCP.\nProduction build profile karo — dev Strict Mode double render misleading.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export const profilingSteps = [\n  \"reproduce slow interaction\",\n  \"Profiler record\",\n  \"find hot components\",\n  \"fix state location or memo after proof\",\n  \"re-profile\",\n];"
          },
          {
            "title": "Q45: [ADV] Fiber / reconciliation one-liners",
            "explain": "Seedha matlab:\nFiber = unit of work node (type, props, child/sibling, alternate).\nReconciliation = diff old vs new tree → minimal DOM ops.\nRender phase pure; commit phase DOM mutate + effects run.\nConcurrent: work interruptible, priorities, lanes. Not \"VDOM always fast.\"\nkey helps sibling identity; without key React index match kar sakta wrong.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const fiberLines = [\n  \"Fiber = work unit with alternate for double buffering\",\n  \"Render computes changes; commit applies to DOM\",\n  \"Keys tell React which list item is which identity\",\n];"
          },
          {
            "title": "Q46: [ADV] Suspense boundaries — design",
            "explain": "Seedha matlab:\nBoundary = loading fallback jab child suspend (lazy, use(promise), RSC stream).\nGranular boundaries: sidebar fast, main skeleton — ek poora page spinner mat.\nNested Suspense: outer coarse, inner fine. ErrorBoundary sibling/alternate tree.\nresetKeys remount on route change. Streaming SSR: shell first, holes fill later.\nDon't wrap everything — intentional UX per section.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const suspenseDesign =\n  \"Small boundaries near slow data; page-level spinner only when whole page waits.\";"
          },
          {
            "title": "Q47: [ADV] Server vs Client Component decision tree",
            "explain": "Seedha matlab:\nServer default (Next App Router): DB, secrets, heavy libs, zero JS to client.\nClient ('use client'): useState, useEffect, onClick, browser APIs, most 3rd party UI.\nPass serializable props only — functions/classes server→client nahi.\nComposition: Server wraps Client; children trick for slotting client inside server.\nBoundary cost: 'use client' file + imports bundle me aate hain — leaf pe rakho.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
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
        "kya": "Purane React me components CLASS the — class Counter extends Component.",
        "detail": "41 — Class Components (Legacy / Interview)\nLevel: ADVANCED  |  Sequence: hooks seekho pehle, phir yeh interview revise\n\nLAYMAN: Purane React me components CLASS the — class Counter extends Component.\nAb hooks wale function components standard hain, par interviews + legacy codebases\nme class lifecycle, setState, binding, Error Boundaries ab bhi poochte hain.\n\nKYUN: Samjho to hooks migration easy; Error Boundary ab bhi class-only core API.\nINTERVIEW: lifecycle order, setState batching, bind trap, PureComponent shallow compare.\nVite/React 19 project me use — teaching file. (class API yahan intentional)",
        "intro": "41 — Class Components (Legacy / Interview)\nLevel: ADVANCED  |  Sequence: hooks seekho pehle, phir yeh interview revise\n\nLAYMAN: Purane React me components CLASS the — class Counter extends Component.\nAb hooks wale function components standard hain, par interviews + legacy codebases\nme class lifecycle, setState, binding, Error Boundaries ab bhi poochte hain.\n\nKYUN: Samjho to hooks migration easy; Error Boundary ab bhi class-only core API.\nINTERVIEW: lifecycle order, setState batching, bind trap, PureComponent shallow compare.\nVite/React 19 project me use — teaching file. (class API yahan intentional)",
        "questions": [
          {
            "title": "Q1: Component vs PureComponent",
            "explain": "Kya karna hai:\nComponent har parent re-render pe child render (default).\nPureComponent shallow compare props/state — same refs → skip render.\n\nSeedha matlab:\nPureComponent = built-in shouldComponentUpdate with shallow compare.\nDeep nested object change detect nahi — mutation trap.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "class PlainChild extends Component {\n  render() {\n    console.log(\"PlainChild render\");\n    return <p>{this.props.label}</p>;\n  }\n}\n\nclass PureChild extends PureComponent {\n  render() {\n    console.log(\"PureChild render\");\n    return <p>{this.props.label}</p>;\n  }\n}\n\nclass ParentPlainPure extends Component {\n  state = { n: 0 };\n  render() {\n    return (\n      <div>\n        <button onClick={() => this.setState({ n: this.state.n + 1 })}>\n          bump {this.state.n}\n        </button>\n        <PlainChild label=\"same\" />\n        <PureChild label=\"same\" />\n      </div>\n    );\n  }\n}"
          },
          {
            "title": "Q2: render, constructor + super(props)",
            "explain": "Kya karna hai:\nconstructor me state/refs init; super(props) pehle — warna this undefined.\nrender() JSX return — required.\n\nSeedha matlab:\nClass field state = {} bhi chalega (modern). Constructor me bind bhi yahan.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "class Greeting extends Component {\n  constructor(props) {\n    super(props); // MUST before this.*\n    this.state = { clicks: 0 };\n  }\n  render() {\n    return (\n      <h1>\n        Hello {this.props.name}! Clicks: {this.state.clicks}\n      </h1>\n    );\n  }\n}"
          },
          {
            "title": "Q3: this.state + setState (object + functional)",
            "explain": "Kya karna hai:\nsetState({ partial }) merge hota hai. Functional: prevState => next.\n\nSeedha matlab:\nObject form async feel — do setState same tick me stale ho sakta.\nFunctional updater safe jab purani state pe depend.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "class CounterState extends Component {\n  state = { count: 0 };\n  inc = () => {\n    this.setState({ count: this.state.count + 1 }); // object\n    this.setState({ count: this.state.count + 1 }); // ❌ dono same base — +1 hi\n  };\n  incSafe = () => {\n    this.setState((prev) => ({ count: prev.count + 1 })); // ✅\n    this.setState((prev) => ({ count: prev.count + 1 })); // ✅ +2 total\n  };\n  render() {\n    return (\n      <div>\n        <p>{this.state.count}</p>\n        <button onClick={this.inc}>+1 object</button>\n        <button onClick={this.incSafe}>+2 functional</button>\n      </div>\n    );\n  }\n}"
          },
          {
            "title": "Q4: Binding — constructor bind vs arrow class fields",
            "explain": "Kya karna hai:\nthis.handleClick ko JSX me dena — bind zaroori warna this undefined.\n\nSeedha matlab:\n3 tareeke: constructor bind, arrow class field, ya render me arrow wrapper.\nArrow class field sabse clean modern class code me.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "class BindDemo extends Component {\n  // way 1 — constructor (legacy style)\n  constructor(props) {\n    super(props);\n    this.onClickBound = this.onClickBound.bind(this);\n  }\n  onClickBound() {\n    this.setState({ msg: \"bound in constructor\" });\n  }\n\n  // way 2 — arrow class field (auto-bound this)\n  onClickArrow = () => {\n    this.setState({ msg: \"arrow field\" });\n  };\n\n  state = { msg: \"\" };\n\n  render() {\n    return (\n      <div>\n        <p>{this.state.msg}</p>\n        <button onClick={this.onClickBound}>Constructor bind</button>\n        <button onClick={this.onClickArrow}>Arrow field</button>\n        {/* way 3 — inline arrow (new fn each render — usually OK) */}\n        <button onClick={() => this.setState({ msg: \"inline\" })}>Inline</button>\n      </div>\n    );\n  }\n}"
          },
          {
            "title": "Q5: props vs state",
            "explain": "Kya karna hai:\nprops = parent se read-only input. state = component ka khud ka data.\n\nSeedha matlab:\nprops mutate mat. state setState se. \"Smart vs dumb\" — class me bhi same idea.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "class UserCard extends Component {\n  state = { expanded: false };\n  render() {\n    const { name, role } = this.props; // read-only\n    return (\n      <div onClick={() => this.setState({ expanded: !this.state.expanded })}>\n        <strong>{name}</strong> — {role}\n        {this.state.expanded && <p>More details...</p>}\n      </div>\n    );\n  }\n}"
          },
          {
            "title": "Q6: componentDidMount fetch",
            "explain": "Kya karna hai:\nMount ke baad API call — DOM ready, good for initial data.\n\nSeedha matlab:\nHooks me useEffect(() => {}, []) same job. Cancel flag ya AbortController use karo.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "class UserFetch extends Component {\n  state = { user: null, loading: true };\n  componentDidMount() {\n    let cancelled = false;\n    fetch(\"https://jsonplaceholder.typicode.com/users/1\")\n      .then((r) => r.json())\n      .then((user) => {\n        if (!cancelled) this.setState({ user, loading: false });\n      });\n    this._cancel = () => {\n      cancelled = true;\n    };\n  }\n  componentWillUnmount() {\n    this._cancel?.();\n  }\n  render() {\n    if (this.state.loading) return <p>Loading...</p>;\n    return <p>{this.state.user?.name}</p>;\n  }\n}"
          },
          {
            "title": "Q7: componentDidUpdate + infinite loop trap",
            "explain": "Kya karna hai:\nprevProps/prevState compare karke conditional setState.\n\nSeedha matlab:\nHar update pe bina condition setState → infinite loop 💥\nHooks: useEffect deps galat = same trap.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "class SyncProp extends Component {\n  state = { mirror: \"\" };\n  componentDidUpdate(prevProps) {\n    if (prevProps.text !== this.props.text) {\n      this.setState({ mirror: this.props.text.toUpperCase() });\n    }\n    // ❌ this.setState({ mirror: this.props.text }); // har bar → loop\n  }\n  render() {\n    return <p>{this.state.mirror}</p>;\n  }\n}"
          },
          {
            "title": "Q8: componentWillUnmount cleanup",
            "explain": "Kya karna hai:\nTimers, subscriptions, listeners hatao — memory leak na ho.\n\nSeedha matlab:\ndidMount me subscribe → willUnmount me unsubscribe. Symmetric cleanup.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "class TimerClass extends Component {\n  state = { sec: 0 };\n  componentDidMount() {\n    this.id = setInterval(() => {\n      this.setState((s) => ({ sec: s.sec + 1 }));\n    }, 1000);\n  }\n  componentWillUnmount() {\n    clearInterval(this.id);\n  }\n  render() {\n    return <p>Seconds: {this.state.sec}</p>;\n  }\n}"
          },
          {
            "title": "Q9: shouldComponentUpdate",
            "explain": "Kya karna hai:\nManual render gate — return false skip render.\n\nSeedha matlab:\nPureComponent yeh automatically shallow karta hai.\nCustom deep compare rare — prefer immutable data + PureComponent/memo.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "class ManualSCU extends Component {\n  shouldComponentUpdate(nextProps, nextState) {\n    return nextProps.value !== this.props.value;\n  }\n  render() {\n    console.log(\"ManualSCU render\");\n    return <span>{this.props.value}</span>;\n  }\n}"
          },
          {
            "title": "Q10: getDerivedStateFromProps (rare, anti-pattern note)",
            "explain": "Kya karna hai:\nStatic method — props se state derive. Pure, no side effects.\n\nSeedha matlab:\n⚠️ Anti-pattern aksar: prop copy state me. Prefer controlled OR key remount.\nValid: UI state jo prop flip pe reset ho (rare).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "class DerivedDemo extends Component {\n  state = { draft: \"\" };\n  static getDerivedStateFromProps(nextProps, prevState) {\n    if (nextProps.resetToken !== prevState.lastToken) {\n      return { draft: \"\", lastToken: nextProps.resetToken };\n    }\n    return null; // no change\n  }\n  render() {\n    return (\n      <input\n        value={this.state.draft}\n        onChange={(e) => this.setState({ draft: e.target.value })}\n      />\n    );\n  }\n}"
          },
          {
            "title": "Q11: getSnapshotBeforeUpdate",
            "explain": "Kya karna hai:\nDOM update se PEHLE snapshot (scroll position). didUpdate me use.\n\nSeedha matlab:\nChat list scroll preserve. Return value → componentDidUpdate 3rd arg.\nHooks me ref + layout effect patterns common ab.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "class ChatList extends Component {\n  listRef = createRef();\n  getSnapshotBeforeUpdate(prevProps) {\n    const el = this.listRef.current;\n    if (prevProps.items.length < this.props.items.length && el) {\n      return el.scrollHeight - el.scrollTop;\n    }\n    return null;\n  }\n  componentDidUpdate(_prevProps, _prevState, snapshot) {\n    const el = this.listRef.current;\n    if (snapshot != null && el) {\n      el.scrollTop = el.scrollHeight - snapshot;\n    }\n  }\n  render() {\n    return (\n      <ul ref={this.listRef} style={{ height: 120, overflow: \"auto\" }}>\n        {this.props.items.map((m) => (\n          <li key={m.id}>{m.text}</li>\n        ))}\n      </ul>\n    );\n  }\n}"
          },
          {
            "title": "Q12: Error boundary as class",
            "explain": "Kya karna hai:\ngetDerivedStateFromError + componentDidCatch — sirf class (core API).\n\nSeedha matlab:\nRender/lifecycle errors pakadta. Events/async nahi — try/catch wahan.\nSee file 20 — yahan class syntax revise.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "class ClassErrorBoundary extends Component {\n  state = { hasError: false };\n  static getDerivedStateFromError() {\n    return { hasError: true };\n  }\n  componentDidCatch(error, info) {\n    console.error(\"ClassErrorBoundary\", error, info.componentStack);\n  }\n  render() {\n    if (this.state.hasError) return <p>Class boundary caught error.</p>;\n    return this.props.children;\n  }\n}\n\nfunction BuggyWidget({ crash }) {\n  if (crash) throw new Error(\"class boundary test\");\n  return <p>Widget OK</p>;\n}\n\nclass BoundaryDemo extends Component {\n  state = { crash: false };\n  render() {\n    return (\n      <ClassErrorBoundary>\n        <button onClick={() => this.setState({ crash: true })}>Crash</button>\n        <BuggyWidget crash={this.state.crash} />\n      </ClassErrorBoundary>\n    );\n  }\n}"
          },
          {
            "title": "Q13: defaultProps / propTypes mention",
            "explain": "Kya karna hai:\ndefaultProps static; propTypes runtime dev check (prop-types package).\n\nSeedha matlab:\nTS projects me PropTypes kam; default params / defaultProps ab bhi.\ndefaultProps function components pe deprecated direction — destructure defaults.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "class Avatar extends Component {\n  static defaultProps = {\n    size: 40,\n    alt: \"avatar\",\n  };\n  render() {\n    const { src, size, alt } = this.props;\n    return <img src={src} width={size} height={size} alt={alt} />;\n  }\n}\n// PropTypes (Vite me: npm i prop-types):\n// Avatar.propTypes = { src: PropTypes.string.isRequired, size: PropTypes.number };"
          },
          {
            "title": "Q14: refs — createRef vs callback ref",
            "explain": "Kya karna hai:\ncreateRef instance field; callback ref fn (legacy string refs mat use).\n\nSeedha matlab:\nFocus input: this.inputRef.current.focus(). Callback jab unmount/remount dynamic ho.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "class FocusInput extends Component {\n  inputRef = createRef();\n  componentDidMount() {\n    this.inputRef.current?.focus();\n  }\n  render() {\n    return <input ref={this.inputRef} placeholder=\"auto focus\" />;\n  }\n}\n\nclass CallbackRefDemo extends Component {\n  state = { h: 0 };\n  setRef = (node) => {\n    if (node) this.setState({ h: node.offsetHeight });\n  };\n  render() {\n    return (\n      <div>\n        <div ref={this.setRef} style={{ padding: 20, background: \"#eee\" }}>\n          Measure me\n        </div>\n        <p>Height: {this.state.h}px</p>\n      </div>\n    );\n  }\n}"
          },
          {
            "title": "Q15: Force update — when NOT to",
            "explain": "Kya karna hai:\nthis.forceUpdate() exists — almost never use.\n\nSeedha matlab:\nState/props change se render aana chahiye. forceUpdate = code smell.\nExternal mutable data? → state me copy ya subscription pattern.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "class ForceBad extends Component {\n  external = { n: 0 };\n  tick = () => {\n    this.external.n += 1;\n    this.forceUpdate(); // ❌ smell — use setState instead\n  };\n  render() {\n    return (\n      <button onClick={this.tick}>External: {this.external.n}</button>\n    );\n  }\n}"
          },
          {
            "title": "Q16: Lifecycle order — mount / update / unmount (comment diagram)",
            "explain": "Kya karna hai:\nYaad kar interview me bolne ke liye.\n\nSeedha matlab:\n\nMOUNT (parent → child):\n  constructor → getDerivedStateFromProps → render →\n  child... → componentDidMount (child first, parent last)\n\nUPDATE:\n  getDerivedStateFromProps → shouldComponentUpdate → render →\n  getSnapshotBeforeUpdate → DOM update → componentDidUpdate\n\nUNMOUNT:\n  componentWillUnmount (child first, parent last)\n\nReact 18+ Strict Mode DEV: mount/unmount/remount extra — cleanup test.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const lifecycleOrderNote =\n  \"Mount: construct→render→didMount. Update: derive→SCU→render→snapshot→didUpdate. Unmount: willUnmount.\";"
          },
          {
            "title": "Q17: Class → hooks migration map",
            "explain": "Kya karna hai:\nMental translation table — interview gold.\n\nSeedha matlab:\nconstructor state     → useState / useReducer initial\ncomponentDidMount       → useEffect(() => {}, [])\ncomponentDidUpdate      → useEffect(() => {}, [deps])\ncomponentWillUnmount    → useEffect return cleanup\nshouldComponentUpdate   → React.memo + compare OR useMemo\nthis.state              → useState/useReducer\nthis.props              → function props arg\ncontext                 → useContext\nrefs                    → useRef\ngetDerivedStateFromProps → derived during render / key remount\nError boundary          → still class (or lib)",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const migrationMap = {\n  componentDidMount: \"useEffect(fn, [])\",\n  componentDidUpdate: \"useEffect(fn, [deps])\",\n  componentWillUnmount: \"useEffect(() => cleanup, [])\",\n  shouldComponentUpdate: \"React.memo(Component, areEqual?)\",\n  state: \"useState / useReducer\",\n  context: \"useContext\",\n  refs: \"useRef\",\n};"
          },
          {
            "title": "Q18: Why industry moved to hooks",
            "explain": "Kya karna hai:\nConceptual — code me comment + chhota hook version.\n\nSeedha matlab:\n1) Logic reuse without HOC/render-prop nesting hell\n2) Related lifecycle split across methods → one useEffect cluster\n3) Classes: this binding confusion, bigger bundle, no compiler wins easy\n4) Concurrent features designed around functions\n5) Less boilerplate — same Counter 1/3 lines",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function HookCounter({ initial = 0 }) {\n  const [count, setCount] = useState(initial);\n  return <button onClick={() => setCount((c) => c + 1)}>{count}</button>;\n}"
          },
          {
            "title": "Q19: Mixed class parent + function child",
            "explain": "Kya karna hai:\nClass parent render me function child — normal React, no special API.\n\nSeedha matlab:\nLegacy screen class wrapper + new feature function components andar.\nGradual migration pattern real companies me.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function ModernButton({ label, onClick }) {\n  return <button onClick={onClick}>{label}</button>;\n}\n\nclass LegacyShell extends Component {\n  state = { count: 0 };\n  render() {\n    return (\n      <div className=\"legacy-shell\">\n        <h2>Class shell</h2>\n        <ModernButton\n          label={`Count ${this.state.count}`}\n          onClick={() => this.setState({ count: this.state.count + 1 })}\n        />\n      </div>\n    );\n  }\n}"
          },
          {
            "title": "Q20: setState batching in classes",
            "explain": "Kya karna hai:\nReact 18+ automatic batching — event handlers, promises, timeouts sab.\n\nSeedha matlab:\nMultiple setState → usually ek re-render. Functional updaters chain safe.\nflushSync force sync rare — perf hit.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "class BatchClass extends Component {\n  state = { a: 0, b: 0 };\n  onClick = () => {\n    this.setState({ a: this.state.a + 1 });\n    this.setState({ b: this.state.b + 1 });\n    // React 18+: typically 1 render after both\n  };\n  render() {\n    return (\n      <button onClick={this.onClick}>\n        {this.state.a},{this.state.b}\n      </button>\n    );\n  }\n}"
          },
          {
            "title": "Q21: Context in class — static contextType",
            "explain": "Kya karna hai:\nThemeContext assign static contextType; this.context read.\n\nSeedha matlab:\nHooks: useContext. Class: contextType OR Context.Consumer wrapper (verbose).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const ThemeContextClass = createContext(\"light\");\n\nclass ThemedPanel extends Component {\n  static contextType = ThemeContextClass;\n  render() {\n    const theme = this.context;\n    return <div data-theme={theme}>Panel theme: {theme}</div>;\n  }\n}\n\nclass ThemeProviderClass extends Component {\n  state = { theme: \"dark\" };\n  render() {\n    return (\n      <ThemeContextClass.Provider value={this.state.theme}>\n        <ThemedPanel />\n      </ThemeContextClass.Provider>\n    );\n  }\n}"
          },
          {
            "title": "Q22: [MID] Interview pitfalls — mutate state, forget bind",
            "explain": "Kya karna hai:\nCommon galatiyan dikhao + fix.\n\nSeedha matlab:\n❌ this.state.items.push(x); this.setState({ items: this.state.items })\n✅ this.setState({ items: [...this.state.items, x] })\n❌ <button onClick={this.handle}> — this undefined\n✅ arrow field ya bind",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "class PitfallDemo extends Component {\n  state = { items: [\"a\"] };\n  // ❌ handleBad() { this.setState(...) } without bind\n\n  handleGood = () => {\n    this.setState((prev) => ({\n      items: [...prev.items, \"b\"], // immutable ✅\n    }));\n  };\n  render() {\n    return (\n      <div>\n        <ul>\n          {this.state.items.map((x) => (\n            <li key={x}>{x}</li>\n          ))}\n        </ul>\n        <button onClick={this.handleGood}>Add immutable</button>\n      </div>\n    );\n  }\n}"
          },
          {
            "title": "Q23: PureComponent shallow compare demo",
            "explain": "Kya karna hai:\nSame object reference prop → PureChild skip render.\nNew object each time → render hoga.\n\nSeedha matlab:\nstyle={{ color: \"red\" }} har bar naya object — PureComponent faida zero.\nStable reference ya primitive props pass karo.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "class ShallowDemo extends Component {\n  state = { n: 0 };\n  config = { color: \"blue\" }; // stable ref ✅\n  render() {\n    return (\n      <div>\n        <button onClick={() => this.setState({ n: this.state.n + 1 })}>\n          parent {this.state.n}\n        </button>\n        <PureChild label=\"hi\" meta={this.config} />\n        <PureChild label=\"hi\" meta={{ color: \"red\" }} /> {/* new each render ❌ */}\n      </div>\n    );\n  }\n}"
          },
          {
            "title": "Q24: [ADV] Legacy UNSAFE_ lifecycle warning",
            "explain": "Kya karna hai:\nUNSAFE_componentWillMount/ReceiveProps/Update — deprecated paths.\n\nSeedha matlab:\nStrict Mode + future React me hata sakte. Migrate:\nwillMount → constructor / componentDidMount\nwillReceiveProps → getDerivedStateFromProps (careful) ya derived render\nwillUpdate → getSnapshotBeforeUpdate + didUpdate\nCodemods exist — interview me \"UNSAFE prefix = migrate\" bolo.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const unsafeLifecycleNote =\n  \"UNSAFE_* lifecycles = legacy; use getDerivedStateFromProps, getSnapshotBeforeUpdate, or hooks.\";"
          },
          {
            "title": "Q25: Counter — class vs function (mental conversion)",
            "explain": "Kya karna hai:\nSame counter dono style — side-by-side seekho.\n\nSeedha matlab:\nClass: state + bound handlers + lifecycle optional.\nFunction: useState one-liner. Behavior same — syntax different.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "class ClassCounter extends Component {\n  state = { count: 0 };\n  inc = () => this.setState((s) => ({ count: s.count + 1 }));\n  dec = () => this.setState((s) => ({ count: s.count - 1 }));\n  render() {\n    return (\n      <div>\n        Class: {this.state.count}\n        <button onClick={this.inc}>+</button>\n        <button onClick={this.dec}>-</button>\n      </div>\n    );\n  }\n}\n\nfunction FunctionCounter() {\n  const [count, setCount] = useState(0);\n  return (\n    <div>\n      Function: {count}\n      <button onClick={() => setCount((c) => c + 1)}>+</button>\n      <button onClick={() => setCount((c) => c - 1)}>-</button>\n    </div>\n  );\n}\n\nfunction CounterCompare() {\n  return (\n    <div>\n      <ClassCounter />\n      <FunctionCounter />\n    </div>\n  );\n}\n\n// -----------------------------------------------------------------------------\n// Quick revise: Error boundary class-only | bind this | setState merge/batch\n// PureComponent shallow | migrate map | UNSAFE avoid | hooks won new code\n// -----------------------------------------------------------------------------"
          }
        ]
      },
      {
        "file": "42_TypeScriptAndReact.tsx",
        "title": "42 — TypeScript + React",
        "kya": "TypeScript = code likhte waqt type checker — props galat pass?",
        "detail": "42 — TypeScript + React\nLevel: ADVANCED  |  Sequence: JS React solid, phir yeh typing layer\n\nLAYMAN: TypeScript = code likhte waqt type checker — props galat pass?\nCompiler pakad lega. React me props, events, refs, hooks sab typed.\n\nKYUN: Bade teams me fewer runtime bugs; autocomplete; refactor safe.\nINTERVIEW: FC vs plain fn, discriminated unions, generic List<T>, ref null.\nVite + React + TS project me use — teaching file.\nOptional: npm i zod (Q18 preview)",
        "intro": "42 — TypeScript + React\nLevel: ADVANCED  |  Sequence: JS React solid, phir yeh typing layer\n\nLAYMAN: TypeScript = code likhte waqt type checker — props galat pass?\nCompiler pakad lega. React me props, events, refs, hooks sab typed.\n\nKYUN: Bade teams me fewer runtime bugs; autocomplete; refactor safe.\nINTERVIEW: FC vs plain fn, discriminated unions, generic List<T>, ref null.\nVite + React + TS project me use — teaching file.\nOptional: npm i zod (Q18 preview)",
        "questions": [
          {
            "title": "Q1: FC vs plain function typing props",
            "explain": "Kya karna hai:\nReact.FC optional children inject karta tha — ab plain fn + props type prefer.\n\nSeedha matlab:\nfunction Button(props: ButtonProps) — simple, explicit.\nReact.FC<Props> legacy; generic children confusion — avoid in new code.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "type ButtonProps = {\n  label: string;\n  onClick: () => void;\n};\n\n// ✅ preferred\nfunction PlainButton({ label, onClick }: ButtonProps) {\n  return <button onClick={onClick}>{label}</button>;\n}\n\n// Legacy style (still seen)\nconst FCButton: React.FC<ButtonProps> = ({ label, onClick }) => (\n  <button onClick={onClick}>{label}</button>\n);"
          },
          {
            "title": "Q2: Props interface + optional + children: React.ReactNode",
            "explain": "Kya karna hai:\ninterface CardProps { title: string; subtitle?: string; children: ReactNode }\n\nSeedha matlab:\n? = optional. ReactNode = string | number | element | fragment | null | array...\nJSX me kuch bhi children ho sakta — ReactNode cover karta hai.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "interface CardProps {\n  title: string;\n  subtitle?: string;\n  children: ReactNode;\n}\n\nfunction Card({ title, subtitle, children }: CardProps) {\n  return (\n    <article>\n      <h2>{title}</h2>\n      {subtitle && <p>{subtitle}</p>}\n      {children}\n    </article>\n  );\n}"
          },
          {
            "title": "Q3: Event types — ChangeEvent, FormEvent, MouseEvent",
            "explain": "Kya karna hai:\nHandler me e: ChangeEvent<HTMLInputElement> etc.\n\nSeedha matlab:\nGeneric element type batata hai e.target kya hai.\nForm submit → FormEvent<HTMLFormElement>. Click → MouseEvent<HTMLButtonElement>.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function SearchForm() {\n  const [q, setQ] = useState(\"\");\n\n  function onChange(e: ChangeEvent<HTMLInputElement>) {\n    setQ(e.target.value); // target typed as HTMLInputElement ✅\n  }\n\n  function onSubmit(e: FormEvent<HTMLFormElement>) {\n    e.preventDefault();\n    console.log(\"search\", q);\n  }\n\n  function onLogoClick(e: MouseEvent<HTMLButtonElement>) {\n    e.preventDefault();\n  }\n\n  return (\n    <form onSubmit={onSubmit}>\n      <input value={q} onChange={onChange} />\n      <button type=\"button\" onClick={onLogoClick}>\n        Logo\n      </button>\n      <button type=\"submit\">Go</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q4: useState — generic inference + explicit",
            "explain": "Kya karna hai:\nuseState(0) infers number. Union/null ke liye explicit generic.\n\nSeedha matlab:\nuseState<User | null>(null) — TS samjhega state kab null.\nInitial value se infer often enough — over-annotate mat.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "type User = { id: number; name: string };\n\nfunction UserPicker() {\n  const [count, setCount] = useState(0); // inferred number\n  const [user, setUser] = useState<User | null>(null); // explicit union\n\n  function load() {\n    setUser({ id: 1, name: \"Jay\" });\n    setCount((c) => c + 1);\n  }\n\n  return (\n    <button onClick={load}>\n      {user?.name ?? \"none\"} ({count})\n    </button>\n  );\n}"
          },
          {
            "title": "Q5: useRef — HTML element types + null initial",
            "explain": "Kya karna hai:\nuseRef<HTMLInputElement>(null) — .current HTMLInputElement | null.\n\nSeedha matlab:\nDOM ref → element type + null. Mutable box (no DOM) → useRef<number>(0).\nAccess se pehle if (ref.current) guard — strict null checks.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function FocusField() {\n  const inputRef = useRef<HTMLInputElement>(null);\n\n  useEffect(() => {\n    inputRef.current?.focus(); // optional chaining ✅\n  }, []);\n\n  return <input ref={inputRef} />;\n}\n\nfunction TickRef() {\n  const renders = useRef(0);\n  renders.current += 1;\n  return <span>Renders: {renders.current}</span>;\n}"
          },
          {
            "title": "Q6: useReducer — typed actions (discriminated union)",
            "explain": "Kya karna hai:\ntype Action = { type: \"inc\" } | { type: \"set\"; value: number }\n\nSeedha matlab:\nDiscriminant field \"type\" — switch me narrow ho jata hai.\npayload optional per action — type-safe dispatch.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "type CounterState = { count: number };\n\ntype CounterAction =\n  | { type: \"inc\" }\n  | { type: \"dec\" }\n  | { type: \"set\"; value: number }\n  | { type: \"reset\" };\n\nfunction counterReducer(state: CounterState, action: CounterAction): CounterState {\n  switch (action.type) {\n    case \"inc\":\n      return { count: state.count + 1 };\n    case \"dec\":\n      return { count: state.count - 1 };\n    case \"set\":\n      return { count: action.value }; // action narrowed ✅\n    case \"reset\":\n      return { count: 0 };\n    default: {\n      const _exhaustive: never = action;\n      return _exhaustive;\n    }\n  }\n}\n\nfunction TypedCounter() {\n  const [state, dispatch] = useReducer(counterReducer, { count: 0 });\n  return (\n    <div>\n      {state.count}\n      <button onClick={() => dispatch({ type: \"inc\" })}>+</button>\n      <button onClick={() => dispatch({ type: \"set\", value: 10 })}>10</button>\n    </div>\n  );\n}"
          },
          {
            "title": "Q7: Component props with generics — List<T>",
            "explain": "Kya karna hai:\nfunction List<T>({ items, render }: ListProps<T>)\n\nSeedha matlab:\nReusable list — item type caller decide. keyof / extends constraints add kar sakte.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "type ListProps<T> = {\n  items: T[];\n  renderItem: (item: T) => ReactNode;\n  keyFn: (item: T) => string | number;\n};\n\nfunction List<T>({ items, renderItem, keyFn }: ListProps<T>) {\n  return (\n    <ul>\n      {items.map((item) => (\n        <li key={keyFn(item)}>{renderItem(item)}</li>\n      ))}\n    </ul>\n  );\n}\n\nfunction GenericListDemo() {\n  return (\n    <List\n      items={[{ id: 1, name: \"A\" }]}\n      keyFn={(u) => u.id}\n      renderItem={(u) => u.name}\n    />\n  );\n}"
          },
          {
            "title": "Q8: Extending HTML attributes — ButtonHTMLAttributes",
            "explain": "Kya karna hai:\ntype Props = ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean }\n\nSeedha matlab:\nNative props (onClick, disabled, className) inherit + custom add.\nComponentPropsWithoutRef<\"button\"> bhi common shortcut.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "type LoadingButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {\n  loading?: boolean;\n};\n\nfunction LoadingButton({ loading, children, disabled, ...rest }: LoadingButtonProps) {\n  return (\n    <button {...rest} disabled={disabled || loading}>\n      {loading ? \"...\" : children}\n    </button>\n  );\n}\n\ntype IconInputProps = InputHTMLAttributes<HTMLInputElement> & {\n  icon?: ReactNode;\n};\n\nfunction IconInput({ icon, ...inputProps }: IconInputProps) {\n  return (\n    <label>\n      {icon}\n      <input {...inputProps} />\n    </label>\n  );\n}"
          },
          {
            "title": "Q9: Discriminated union props — variant",
            "explain": "Kya karna hai:\nLinkButton = { variant: \"link\"; href: string } | { variant: \"button\"; onClick }\n\nSeedha matlab:\nvariant switch → TS force correct fields per branch.\nOptional everything se behtar — impossible states compile error.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "type ActionLink =\n  | { variant: \"link\"; href: string; label: string }\n  | { variant: \"button\"; onClick: () => void; label: string };\n\nfunction ActionControl(props: ActionLink) {\n  if (props.variant === \"link\") {\n    return <a href={props.href}>{props.label}</a>;\n  }\n  return <button onClick={props.onClick}>{props.label}</button>;\n}"
          },
          {
            "title": "Q10: Typing custom hooks return",
            "explain": "Kya karna hai:\nExplicit return type OR inferred tuple/object.\n\nSeedha matlab:\nReturn type document karta hai API. Tuple [value, setter] as const optional.\nOver-export internal types mat — hook consumer ko jo chahiye woh.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "type UseToggleReturn = {\n  on: boolean;\n  toggle: () => void;\n  setOn: (v: boolean) => void;\n};\n\nfunction useToggle(initial = false): UseToggleReturn {\n  const [on, setOn] = useState(initial);\n  const toggle = () => setOn((v) => !v);\n  return { on, toggle, setOn };\n}\n\nfunction ToggleDemo() {\n  const { on, toggle } = useToggle();\n  return <button onClick={toggle}>{on ? \"ON\" : \"OFF\"}</button>;\n}"
          },
          {
            "title": "Q11: Context — typed createContext + undefined guard",
            "explain": "Kya karna hai:\ncreateContext<Auth | null>(null) + provider OR throw helper.\n\nSeedha matlab:\nDefault null → consumer me guard. Ya separate useAuth hook throws if missing.\nundefined default bhi — but null + named hook pattern common.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "type AuthContextValue = {\n  user: User | null;\n  login: (name: string) => void;\n  logout: () => void;\n};\n\nconst AuthContext = createContext<AuthContextValue | null>(null);\n\nfunction useAuth(): AuthContextValue {\n  const ctx = useContext(AuthContext);\n  if (!ctx) throw new Error(\"useAuth must be inside AuthProvider\");\n  return ctx;\n}\n\nfunction AuthProvider({ children }: { children: ReactNode }) {\n  const [user, setUser] = useState<User | null>(null);\n  const value = useMemo(\n    () => ({\n      user,\n      login: (name: string) => setUser({ id: Date.now(), name }),\n      logout: () => setUser(null),\n    }),\n    [user]\n  );\n  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;\n}\n\nfunction ProfileChip() {\n  const { user, logout } = useAuth();\n  return user ? (\n    <span>\n      {user.name} <button onClick={logout}>out</button>\n    </span>\n  ) : (\n    <span>Guest</span>\n  );\n}"
          },
          {
            "title": "Q12: forwardRef / React 19 ref as prop typing",
            "explain": "Kya karna hai:\nReact 19: ref normal prop. forwardRef legacy typing still in codebases.\n\nSeedha matlab:\nforwardRef<HTMLInputElement, Props>((props, ref) => ...)\n19 style: function Input({ ref, ...props }: Props & { ref?: Ref<HTMLInputElement> })",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "type Input19Props = Omit<ComponentPropsWithoutRef<\"input\">, \"ref\"> & {\n  ref?: Ref<HTMLInputElement>;\n};\n\nfunction Input19({ ref, ...rest }: Input19Props) {\n  return <input ref={ref} {...rest} />;\n}\n\ntype LegacyInputProps = { label: string } & ComponentPropsWithoutRef<\"input\">;\n\nconst LegacyInput = forwardRef<HTMLInputElement, LegacyInputProps>(\n  function LegacyInput({ label, ...rest }, ref) {\n    return (\n      <label>\n        {label}\n        <input ref={ref} {...rest} />\n      </label>\n    );\n  }\n);"
          },
          {
            "title": "Q13: as const / satisfies",
            "explain": "Kya karna hai:\nas const → readonly literal tuple. satisfies → check shape, keep inference.\n\nSeedha matlab:\nROUTES as const — keyof typeof ROUTES typed keys.\nsatisfies Record<string, string> — extra keys error, values stay literal.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const ROUTES = {\n  home: \"/\",\n  settings: \"/settings\",\n} as const;\n\ntype RouteKey = keyof typeof ROUTES; // \"home\" | \"settings\"\n\nconst STATUS_COLORS = {\n  ok: \"green\",\n  err: \"red\",\n} satisfies Record<string, string>;\n\nfunction RouteLink({ name }: { name: RouteKey }) {\n  return <a href={ROUTES[name]}>{name}</a>;\n}"
          },
          {
            "title": "Q14: Utility types — Pick Omit Partial Required for props",
            "explain": "Kya karna hai:\nPublic props se internal derive — DRY.\n\nSeedha matlab:\nPick<User, \"id\" | \"name\"> — subset. Omit<User, \"password\"> — hide sensitive.\nPartial<Form> edit mode. Required<Pick<...>> force optional → required.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "type FullUser = {\n  id: number;\n  name: string;\n  email: string;\n  password: string;\n};\n\ntype PublicUser = Omit<FullUser, \"password\">;\ntype UserPreview = Pick<FullUser, \"id\" | \"name\">;\ntype UserPatch = Partial<Pick<FullUser, \"name\" | \"email\">>;\n\nfunction UserBadge({ id, name }: UserPreview) {\n  return (\n    <span>\n      #{id} {name}\n    </span>\n  );\n}"
          },
          {
            "title": "Q15: API response + loading/error state union",
            "explain": "Kya karna hai:\ntype State = idle | loading | success | error — discriminated.\n\nSeedha matlab:\nstatus field se narrow — data sirf success me exists (TS knows).\nSame pattern file 12 fetch machine — ab typed.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "type ApiUser = { id: number; name: string };\n\ntype FetchState =\n  | { status: \"idle\" }\n  | { status: \"loading\" }\n  | { status: \"success\"; data: ApiUser }\n  | { status: \"error\"; message: string };\n\nfunction UserLoader() {\n  const [state, setState] = useState<FetchState>({ status: \"idle\" });\n\n  async function load() {\n    setState({ status: \"loading\" });\n    try {\n      const res = await fetch(\"https://jsonplaceholder.typicode.com/users/1\");\n      const data = (await res.json()) as ApiUser;\n      setState({ status: \"success\", data });\n    } catch (e) {\n      setState({ status: \"error\", message: String(e) });\n    }\n  }\n\n  if (state.status === \"success\") return <p>{state.data.name}</p>;\n  if (state.status === \"error\") return <p>{state.message}</p>;\n  return <button onClick={load}>Load user</button>;\n}"
          },
          {
            "title": "Q16: Children render props typing",
            "explain": "Kya karna hai:\nchildren: (value: T) => ReactNode — function as child.\n\nSeedha matlab:\nRender prop pattern typed — caller ko data type pata.\nReactNode return flexible UI.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "type DataRenderProps<T> = {\n  data: T;\n  children: (item: T) => ReactNode;\n};\n\nfunction DataRender<T>({ data, children }: DataRenderProps<T>) {\n  return <>{children(data)}</>;\n}\n\nfunction RenderPropDemo() {\n  return (\n    <DataRender data={{ score: 42 }}>\n      {(d) => <strong>Score: {d.score}</strong>}\n    </DataRender>\n  );\n}"
          },
          {
            "title": "Q17: Polymorphic `as` prop pattern (simple)",
            "explain": "Kya karna hai:\n<Text as=\"a\" href=\"...\"> — element type change, props merge typed.\n\nSeedha matlab:\nElementType + ComponentPropsWithoutRef<C> intersection — advanced but common lib pattern.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "type PolymorphicProps<C extends ElementType> = {\n  as?: C;\n  children: ReactNode;\n} & ComponentPropsWithoutRef<C>;\n\nfunction Text<C extends ElementType = \"span\">({\n  as,\n  children,\n  ...rest\n}: PolymorphicProps<C>) {\n  const Component = as ?? \"span\";\n  return <Component {...rest}>{children}</Component>;\n}\n\nfunction PolymorphicDemo() {\n  return (\n    <>\n      <Text>Default span</Text>\n      <Text as=\"a\" href=\"/home\">\n        Link\n      </Text>\n      <Text as=\"button\" type=\"button\" onClick={() => {}}>\n        Btn\n      </Text>\n    </>\n  );\n}"
          },
          {
            "title": "Q18: Zod infer — z.infer preview for forms",
            "explain": "Kya karna hai:\nSchema single source → runtime validate + TS type.\n\nSeedha matlab:\nnpm i zod. Form schema define → type FormValues = z.infer<typeof Schema>.\nparse safe — invalid data runtime catch, type compile time.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const SignupSchema = z.object({\n  email: z.string().email(),\n  age: z.number().min(18),\n});\n\ntype SignupValues = z.infer<typeof SignupSchema>;\n\nfunction parseSignup(raw: unknown): SignupValues {\n  return SignupSchema.parse(raw); // throws if invalid\n}\n\nfunction SignupPreview() {\n  const [values] = useState<SignupValues>({ email: \"a@b.com\", age: 21 });\n  return <span>{values.email}</span>;\n}"
          },
          {
            "title": "Q19: Strict tsconfig tips (comments)",
            "explain": "Kya karna hai:\ncompilerOptions strict family enable karo.\n\nSeedha matlab:\n\"strict\": true — null checks, implicit any off, etc.\n\"noUncheckedIndexedAccess\": true — arr[i] maybe undefined ✅ safer\n\"jsx\": \"react-jsx\" — Vite default\nskipLibCheck true speed; exactOptionalPropertyTypes advanced optional strict\neslint @typescript-eslint consistent-type-imports — type-only imports",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const tsconfigTips = [\n  \"strict: true\",\n  \"noUncheckedIndexedAccess: true for safer indexing\",\n  \"jsx: react-jsx\",\n  \"prefer type-only imports for types\",\n] as const;"
          },
          {
            "title": "Q20: Common TS errors — children, event target, ref null",
            "explain": "Kya karna hai:\nFix patterns dikhao.\n\nSeedha matlab:\n❌ Props without children but JSX children pass → add children: ReactNode\n❌ e.target.value on Event → ChangeEvent<HTMLInputElement>\n❌ ref.current.focus() without null check → ?. or if guard\n❌ useRef<number>() without initial → useRef<number>(0) or null generic",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function FixedChildren({ children }: { children: ReactNode }) {\n  return <div>{children}</div>;\n}\n\nfunction FixedInput() {\n  const ref = useRef<HTMLInputElement>(null);\n  function onChange(e: ChangeEvent<HTMLInputElement>) {\n    console.log(e.target.value);\n  }\n  function focus() {\n    ref.current?.focus();\n  }\n  return <input ref={ref} onChange={onChange} onFocus={focus} />;\n}"
          },
          {
            "title": "Q21: Typing memo / lazy components",
            "explain": "Kya karna hai:\nmemo<Props>(fn). lazy(() => import(...)) return type Promise<{ default: Component }>\n\nSeedha matlab:\nmemo generic props preserve. lazy needs default export component.\nSuspense boundary lazy child ke saath (file 21).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "type ExpensiveProps = { n: number };\n\nconst Expensive = memo(function Expensive({ n }: ExpensiveProps) {\n  return <div>{n * 2}</div>;\n});\n\nconst LazyDashboard = lazy(() =>\n  Promise.resolve({\n    default: function Dashboard() {\n      return <div>Lazy loaded</div>;\n    },\n  })\n);"
          },
          {
            "title": "Q22: Enum vs union string literals for variants",
            "explain": "Kya karna hai:\nPrefer union \"sm\" | \"md\" | \"lg\" over enum (tree-shake, no reverse mapping).\n\nSeedha matlab:\nenum Size { Sm, Md } — runtime object, awkward JSX.\ntype Size = \"sm\" | \"md\" — idiomatic TS + React props.\nconst enum rare — bundler inline, debugging harder.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "type Size = \"sm\" | \"md\" | \"lg\";\n\ntype SizedBoxProps = {\n  size: Size;\n  children: ReactNode;\n};\n\nfunction SizedBox({ size, children }: SizedBoxProps) {\n  const pad = { sm: 4, md: 8, lg: 16 }[size];\n  return <div style={{ padding: pad }}>{children}</div>;\n}\n\n// enum example (discouraged for simple variants):\nenum LegacySize {\n  Sm = \"sm\",\n  Md = \"md\",\n}"
          },
          {
            "title": "Q23: Index signatures vs Record",
            "explain": "Kya karna hai:\nRecord<string, T> typed dict. Index signature { [key: string]: T } similar.\n\nSeedha matlab:\nRecord<Keys, T> — known keys. Record<string, number> — open map.\nIndex signature interface me extra props allow — use carefully with strict.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "type LabelsByLocale = Record<string, string>;\n\nconst labels: LabelsByLocale = {\n  en: \"Hello\",\n  hi: \"Namaste\",\n};\n\ninterface StringMap {\n  [key: string]: string;\n}\n\nconst alsoLabels: StringMap = labels;\n\nfunction LocaleLabel({ code }: { code: string }) {\n  return <span>{labels[code] ?? code}</span>;\n}"
          },
          {
            "title": "Q24: Typing useEffect cleanup",
            "explain": "Kya karna hai:\nReturn void | (() => void | undefined) — cleanup function optional.\n\nSeedha matlab:\nEffect fn return type inferred. Explicit: useEffect((): void | (() => void) => ...)\nCleanup sync — async fn return mat (Promise void ≠ cleanup).\nAbortController typed with fetch cancel pattern.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function SubscribedWidget({ userId }: { userId: number }) {\n  useEffect(() => {\n    const ctrl = new AbortController();\n    let alive = true;\n\n    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {\n      signal: ctrl.signal,\n    })\n      .then((r) => r.json())\n      .then((data) => {\n        if (alive) console.log(data);\n      })\n      .catch(() => {});\n\n    return () => {\n      alive = false;\n      ctrl.abort();\n    };\n  }, [userId]);\n\n  return <div>User {userId}</div>;\n}"
          },
          {
            "title": "Q25: [ADV] Interview — interface vs type for props; never for props?",
            "explain": "Kya karna hai:\nBolne layak nuanced answer.\n\nSeedha matlab:\ninterface props — extend declare merge (rare props). type — unions/intersections easier.\nTeam convention > dogma. Both fine for component props.\n\"never use type\" outdated myth. \"never use interface for unions\" — union needs type.\nProps = object shape → either works. Consistency team me important.\neslint-react often no difference; pick one style guide.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "type NeverForPropsMyth =\n  \"Both interface and type work for props; use type for unions/discriminated unions.\";\n\ninterface ExtendableProps {\n  id: string;\n}\ninterface ExtendableProps {\n  optional?: boolean; // declaration merge — interface only feature\n}\n\ntype PropsUnion = { mode: \"view\" } | { mode: \"edit\"; onSave: () => void };\n\nfunction ModePanel(props: PropsUnion) {\n  if (props.mode === \"edit\") {\n    return <button onClick={props.onSave}>Save</button>;\n  }\n  return <p>View only</p>;\n}\n\n// -----------------------------------------------------------------------------\n// Quick revise: events generic element | ref null | discriminated unions\n// generic List<T> | z.infer | strict tsconfig | interface vs type pragmatic\n// -----------------------------------------------------------------------------"
          }
        ]
      },
      {
        "file": "43_AccessibilityA11y.jsx",
        "title": "43 — Accessibility (a11y)",
        "kya": "a11y = sab users app use kar saken — keyboard-only, screen reader,",
        "detail": "43 — Accessibility (a11y) Deep Dive\nLevel: MID / ADV  |  Sequence: pehle 22 routing, phir yeh UI polish ke liye\n\nLAYMAN: a11y = sab users app use kar saken — keyboard-only, screen reader,\nlow vision, motor issues. Semantic HTML pehle; ARIA sirf jab native element\nkaafi na ho. Button ko button banao, div pe onClick mat.\n\nScreen reader = software jo page padhta hai (NVDA, VoiceOver, JAWS).\nFocus = keyboard cursor kahan hai — modal/route change pe manage karo.\n\nKYUN: Legal (WCAG), SEO, better UX sabke liye. Mid+ interviews me expected.\nINTERVIEW: button vs div; aria-* kab; focus trap; getByRole testing.\nVite/React 19 project me use — teaching file.",
        "intro": "43 — Accessibility (a11y) Deep Dive\nLevel: MID / ADV  |  Sequence: pehle 22 routing, phir yeh UI polish ke liye\n\nLAYMAN: a11y = sab users app use kar saken — keyboard-only, screen reader,\nlow vision, motor issues. Semantic HTML pehle; ARIA sirf jab native element\nkaafi na ho. Button ko button banao, div pe onClick mat.\n\nScreen reader = software jo page padhta hai (NVDA, VoiceOver, JAWS).\nFocus = keyboard cursor kahan hai — modal/route change pe manage karo.\n\nKYUN: Legal (WCAG), SEO, better UX sabke liye. Mid+ interviews me expected.\nINTERVIEW: button vs div; aria-* kab; focus trap; getByRole testing.\nVite/React 19 project me use — teaching file.",
        "questions": [
          {
            "title": "Q1: Semantic HTML pehle — div soup mat banao",
            "explain": "Kya karna hai:\nnav, main, header, footer, section, article, button, ul/li use karo.\n\nSeedha matlab:\nBrowser + screen reader ko structure free me milta hai. ARIA band-aid nahi.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function SemanticPage() {\n  return (\n    <>\n      <header>\n        <h1>Shop</h1>\n        <nav aria-label=\"Main\">\n          <ul>\n            <li>\n              <a href=\"/\">Home</a>\n            </li>\n          </ul>\n        </nav>\n      </header>\n      <main id=\"main-content\">\n        <article>\n          <h2>Featured product</h2>\n          <p>Description here.</p>\n        </article>\n      </main>\n      <footer>© 2026</footer>\n    </>\n  );\n}"
          },
          {
            "title": "Q2: button vs div onClick — keyboard + SR default",
            "explain": "Kya karna hai:\nClickable cheez ke liye <button> ya <a href>. Div tab jab role+keyboard add karo.\n\nSeedha matlab:\nNative button = Enter/Space, focusable, \"button\" announce. Div = kuch nahi.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function GoodButton() {\n  return <button type=\"button\">Save</button>;\n}\n\nfunction BadDivButton() {\n  // ❌ anti-pattern — avoid in real apps\n  return <div onClick={() => {}}>Save</div>;\n}\n\nfunction DivAsButtonIfYouMust() {\n  function onKeyDown(e) {\n    if (e.key === \"Enter\" || e.key === \" \") {\n      e.preventDefault();\n      // action\n    }\n  }\n  return (\n    <div\n      role=\"button\"\n      tabIndex={0}\n      onClick={() => {}}\n      onKeyDown={onKeyDown}\n    >\n      Save\n    </div>\n  );\n}"
          },
          {
            "title": "Q3: label + htmlFor — input ko name do",
            "explain": "Kya karna hai:\n<label htmlFor={id}> se input click area bada + SR label link.\n\nSeedha matlab:\nPlaceholder label nahi. Visible label best; nahi to aria-label.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function EmailField() {\n  const id = useId();\n  return (\n    <div>\n      <label htmlFor={id}>Email</label>\n      <input id={id} name=\"email\" type=\"email\" autoComplete=\"email\" />\n    </div>\n  );\n}"
          },
          {
            "title": "Q4: aria-label vs aria-labelledby",
            "explain": "Kya karna hai:\naria-label = hidden text string. aria-labelledby = existing element id(s).\n\nSeedha matlab:\nIcon-only button → aria-label=\"Close\". Dialog title id → aria-labelledby.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function IconClose({ onClose }) {\n  return (\n    <button type=\"button\" aria-label=\"Close dialog\" onClick={onClose}>\n      ×\n    </button>\n  );\n}\n\nfunction NamedByTitle({ titleId }) {\n  return (\n    <section aria-labelledby={titleId}>\n      <h2 id={titleId}>Settings</h2>\n    </section>\n  );\n}"
          },
          {
            "title": "Q5: aria-describedby — extra hint / error link",
            "explain": "Kya karna hai:\nInput + hint/error element id → aria-describedby={hintId}.\n\nSeedha matlab:\nSR label ke baad description padhta hai. Errors yahan attach karo.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function PasswordWithHint() {\n  const inputId = useId();\n  const hintId = useId();\n  return (\n    <>\n      <label htmlFor={inputId}>Password</label>\n      <input\n        id={inputId}\n        type=\"password\"\n        aria-describedby={hintId}\n      />\n      <p id={hintId}>At least 8 characters.</p>\n    </>\n  );\n}"
          },
          {
            "title": "Q6: aria-live polite vs assertive — dynamic announcements",
            "explain": "Kya karna hai:\nToast/status ke liye region: role=\"status\" (polite) ya role=\"alert\" (assertive).\n\nSeedha matlab:\npolite = current speech khatam, phir padho. assertive = turant interrupt.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function LiveStatus({ message }) {\n  return (\n    <p role=\"status\" aria-live=\"polite\" aria-atomic=\"true\">\n      {message}\n    </p>\n  );\n}\n\nfunction LiveAlert({ error }) {\n  if (!error) return null;\n  return (\n    <div role=\"alert\" aria-live=\"assertive\">\n      {error}\n    </div>\n  );\n}"
          },
          {
            "title": "Q7: [MID] role=\"dialog\" + focus trap basics",
            "explain": "Kya karna hai:\nModal open → focus andar; Tab loop; background inert (aria-modal).\n\nSeedha matlab:\nFocus trap = Tab se bahar na nikle jab tak close. Libraries (FocusTrap) bhi.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function SimpleModal({ open, onClose, title, children }) {\n  const dialogRef = useRef(null);\n  const titleId = useId();\n\n  useEffect(() => {\n    if (!open) return;\n    const prev = document.activeElement;\n    dialogRef.current?.focus();\n    return () => prev?.focus?.();\n  }, [open]);\n\n  if (!open) return null;\n\n  return (\n    <div\n      ref={dialogRef}\n      role=\"dialog\"\n      aria-modal=\"true\"\n      aria-labelledby={titleId}\n      tabIndex={-1}\n    >\n      <h2 id={titleId}>{title}</h2>\n      {children}\n      <button type=\"button\" onClick={onClose}>\n        Close\n      </button>\n    </div>\n  );\n}"
          },
          {
            "title": "Q8: Escape se modal close",
            "explain": "Kya karna hai:\nkeydown Escape → onClose. Focus wapas trigger pe.\n\nSeedha matlab:\nExpected keyboard pattern. onKeyDown document ya dialog pe.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function ModalWithEscape({ open, onClose, children }) {\n  useEffect(() => {\n    if (!open) return;\n    function onKey(e) {\n      if (e.key === \"Escape\") onClose();\n    }\n    document.addEventListener(\"keydown\", onKey);\n    return () => document.removeEventListener(\"keydown\", onKey);\n  }, [open, onClose]);\n\n  if (!open) return null;\n  return <div role=\"dialog\" aria-modal=\"true\">{children}</div>;\n}"
          },
          {
            "title": "Q9: tabIndex 0 vs -1",
            "explain": "Kya karna hai:\n0 = natural tab order me. -1 = programmatic focus only (modal container).\n\nSeedha matlab:\ntabIndex positive mat (tab order hack). Roving tabindex lists me common.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function RovingTabMenu({ items }) {\n  const [active, setActive] = useState(0);\n  return (\n    <ul role=\"menubar\">\n      {items.map((label, i) => (\n        <li key={label} role=\"none\">\n          <button\n            type=\"button\"\n            role=\"menuitem\"\n            tabIndex={i === active ? 0 : -1}\n            onFocus={() => setActive(i)}\n          >\n            {label}\n          </button>\n        </li>\n      ))}\n    </ul>\n  );\n}"
          },
          {
            "title": "Q10: Keyboard Enter / Space handlers",
            "explain": "Kya karna hai:\nCustom widgets pe Space default scroll roko; Enter/Space = activate.\n\nSeedha matlab:\nNative button/link pe zarurat nahi. role=\"button\" pe zaruri.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function CustomPressable({ onPress, children }) {\n  function handleKey(e) {\n    if (e.key === \"Enter\" || e.key === \" \") {\n      e.preventDefault();\n      onPress();\n    }\n  }\n  return (\n    <span role=\"button\" tabIndex={0} onKeyDown={handleKey} onClick={onPress}>\n      {children}\n    </span>\n  );\n}"
          },
          {
            "title": "Q11: Skip link — keyboard users ko main content jump",
            "explain": "Kya karna hai:\nPage top pe hidden link → #main-content. Focus pe visible.\n\nSeedha matlab:\nHar page pe nav repeat skip karo. CSS se off-screen until focus.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function SkipLink() {\n  return (\n    <a href=\"#main-content\" className=\"skip-link\">\n      Skip to main content\n    </a>\n  );\n}\n\n// CSS (global ya module):\n// .skip-link { position:absolute; left:-9999px; }\n// .skip-link:focus { left:1rem; top:1rem; z-index:9999; }"
          },
          {
            "title": "Q12: Heading hierarchy — ek h1, order mat todo",
            "explain": "Kya karna hai:\nPage me ek h1; sections h2, sub h3. Levels skip mat (h2→h4).\n\nSeedha matlab:\nSR users headings se navigate. Visual size CSS se, tag semantic rakho.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function HeadingOutline() {\n  return (\n    <main>\n      <h1>Dashboard</h1>\n      <section>\n        <h2>Recent orders</h2>\n        <h3>Today</h3>\n      </section>\n      <section>\n        <h2>Profile</h2>\n      </section>\n    </main>\n  );\n}"
          },
          {
            "title": "Q13: Alt text — decorative vs informative images",
            "explain": "Kya karna hai:\nMeaningful img → alt describe. Decorative → alt=\"\" (SR skip).\n\nSeedha matlab:\n\"image of\" mat likho. Button me text ho to redundant alt avoid.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function ProductCard({ name, decorative }) {\n  return (\n    <article>\n      {decorative ? (\n        <img src=\"/hero.png\" alt=\"\" role=\"presentation\" />\n      ) : (\n        <img src=\"/product.png\" alt={`${name} — front view`} />\n      )}\n      <h2>{name}</h2>\n    </article>\n  );\n}"
          },
          {
            "title": "Q14: [MID] Form errors — aria-invalid + aria-errormessage",
            "explain": "Kya karna hai:\nError pe aria-invalid=\"true\"; error span id → aria-errormessage.\n\nSeedha matlab:\nColor-only error mat. SR ko field invalid + message dono chahiye.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function FieldWithError({ label, value, onChange, error }) {\n  const inputId = useId();\n  const errorId = useId();\n  return (\n    <div>\n      <label htmlFor={inputId}>{label}</label>\n      <input\n        id={inputId}\n        value={value}\n        onChange={onChange}\n        aria-invalid={error ? \"true\" : undefined}\n        aria-errormessage={error ? errorId : undefined}\n      />\n      {error && (\n        <span id={errorId} role=\"alert\">\n          {error}\n        </span>\n      )}\n    </div>\n  );\n}"
          },
          {
            "title": "Q15: disabled vs aria-disabled",
            "explain": "Kya karna hai:\ndisabled = no focus, no events. aria-disabled = looks disabled, focusable (explain why).\n\nSeedha matlab:\nReal disabled best. aria-disabled tab jab tooltip se reason dena ho.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function SubmitRow({ canSubmit }) {\n  return (\n    <>\n      <button type=\"submit\" disabled={!canSubmit}>\n        Pay\n      </button>\n      {/* aria-disabled pattern — still focusable, block in handler */}\n      <button\n        type=\"button\"\n        aria-disabled={!canSubmit}\n        onClick={(e) => {\n          if (!canSubmit) return;\n          // pay\n        }}\n      >\n        Pay (soft disabled)\n      </button>\n    </>\n  );\n}"
          },
          {
            "title": "Q16: [MID] Focus management after route / modal close",
            "explain": "Kya karna hai:\nModal band → trigger focus. Route change → heading ya main focus (SPA).\n\nSeedha matlab:\nFocus kho gaya = keyboard user lost. useEffect me restore karo.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function RouteFocusMain() {\n  const mainRef = useRef(null);\n  useEffect(() => {\n    mainRef.current?.focus();\n  }, []); // pathname dep in real router\n  return (\n    <main ref={mainRef} tabIndex={-1} id=\"main-content\">\n      <h1>Page title</h1>\n    </main>\n  );\n}"
          },
          {
            "title": "Q17: prefers-reduced-motion — animation respect",
            "explain": "Kya karna hai:\nCSS @media (prefers-reduced-motion: reduce) { animation: none; }\n\nSeedha matlab:\nVestibular issues wale users ko motion kam. JS se matchMedia bhi.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function usePrefersReducedMotion() {\n  const [reduce, setReduce] = useState(false);\n  useEffect(() => {\n    const mq = window.matchMedia(\"(prefers-reduced-motion: reduce)\");\n    setReduce(mq.matches);\n    const fn = () => setReduce(mq.matches);\n    mq.addEventListener(\"change\", fn);\n    return () => mq.removeEventListener(\"change\", fn);\n  }, []);\n  return reduce;\n}\n\nfunction MotionSafeSpinner() {\n  const reduce = usePrefersReducedMotion();\n  return (\n    <span aria-hidden={reduce} className={reduce ? \"static-icon\" : \"spin\"} />\n  );\n}"
          },
          {
            "title": "Q18: Color contrast note (WCAG)",
            "explain": "Kya karna hai:\nText 4.5:1 (normal), 3:1 large. UI components 3:1. Don't rely on color alone.\n\nSeedha matlab:\nComment/design me contrast check. Error = icon + text, sirf red mat.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "// Design token example comment:\n// --text-on-bg: #1a1a1a on #ffffff → ~16:1 ✅\n// --muted-link: verify 4.5:1; use underline for links"
          },
          {
            "title": "Q19: Landmark roles — main, nav, complementary",
            "explain": "Kya karna hai:\nSemantic tags = landmarks auto. Missing pe role=\"navigation\" etc.\n\nSeedha matlab:\nSR landmark shortcut se jump. Ek main per page. Multiple nav = aria-label.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Landmarks() {\n  return (\n    <>\n      <nav aria-label=\"Primary\">...</nav>\n      <main>...</main>\n      <aside aria-label=\"Related links\">...</aside>\n    </>\n  );\n}"
          },
          {
            "title": "Q20: [ADV] Accessible custom checkbox / switch",
            "explain": "Kya karna hai:\nHidden native input + styled label; ya role=\"switch\" + aria-checked.\n\nSeedha matlab:\nNative <input type=\"checkbox\"> best. Custom me keyboard + checked state sync.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function AccessibleSwitch({ checked, onChange, label }) {\n  const id = useId();\n  return (\n    <label htmlFor={id} style={{ display: \"flex\", gap: 8 }}>\n      <input\n        id={id}\n        type=\"checkbox\"\n        role=\"switch\"\n        checked={checked}\n        onChange={(e) => onChange(e.target.checked)}\n        aria-checked={checked}\n      />\n      {label}\n    </label>\n  );\n}\n\nfunction CustomCheckbox({ checked, onChange, label }) {\n  const id = useId();\n  return (\n    <>\n      <input\n        id={id}\n        type=\"checkbox\"\n        className=\"sr-only\"\n        checked={checked}\n        onChange={(e) => onChange(e.target.checked)}\n      />\n      <label htmlFor={id}>{label}</label>\n    </>\n  );\n}"
          },
          {
            "title": "Q21: Screen-reader-only CSS (.sr-only / .visually-hidden)",
            "explain": "Kya karna hai:\nText visually hide, SR ko visible. Icon buttons ke extra context.\n\nSeedha matlab:\ndisplay:none / visibility:hidden SR se bhi chhupa deta — mat use.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const srOnlyStyles = {\n  position: \"absolute\",\n  width: 1,\n  height: 1,\n  padding: 0,\n  margin: -1,\n  overflow: \"hidden\",\n  clip: \"rect(0,0,0,0)\",\n  whiteSpace: \"nowrap\",\n  border: 0,\n};\n\nfunction SrOnlyExample() {\n  return (\n    <button type=\"button\">\n      <span aria-hidden>🔍</span>\n      <span style={srOnlyStyles}>Search products</span>\n    </button>\n  );\n}"
          },
          {
            "title": "Q22: [MID] Testing mindset — axe + RTL getByRole",
            "explain": "Kya karna hai:\neslint-plugin-jsx-a11y; jest-axe; query by role/name, not testId only.\n\nSeedha matlab:\ngetByRole('button', { name: /save/i }) = user + SR jaisa query.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "// import { render, screen } from '@testing-library/react';\n// import { axe, toHaveNoViolations } from 'jest-axe';\n// expect.extend(toHaveNoViolations);\n//\n// test('dialog accessible', async () => {\n//   const { container } = render(<SimpleModal open title=\"Hi\" />);\n//   expect(screen.getByRole('dialog')).toBeInTheDocument();\n//   expect(await axe(container)).toHaveNoViolations();\n// });\n\nfunction testingChecklist() {\n  return [\n    \"Tab through whole flow — focus visible?\",\n    \"Screen reader sample (VoiceOver/NVDA) once per feature\",\n    \"axe DevTools / jest-axe in CI\",\n    \"getByRole over getByTestId for a11y-critical UI\",\n  ];\n}"
          },
          {
            "title": "Q23: React 19 — aria-* props on custom components",
            "explain": "Kya karna hai:\n{...props} spread DOM tak; aria-* + id forward karo.\n\nSeedha matlab:\nWrapper Button me aria-label pass-through. Don't strip unknown aria-*.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Button({ children, ...props }) {\n  return (\n    <button type=\"button\" {...props}>\n      {children}\n    </button>\n  );\n}\n\n// Usage: <Button aria-expanded={open} aria-controls={panelId}>Menu</Button>\n\n// React 19: ref as prop on function components — focus management easier (file 34)."
          },
          {
            "title": "Q24: [ADV] Common anti-patterns — interview red flags",
            "explain": "Kya karna hai:\nYaad karo kya NA karna: div buttons, placeholder-only labels, positive tabIndex.\n\nSeedha matlab:\n\"We added aria everywhere\" without semantics = fail.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const a11yAntiPatterns = [\n  \"div/span onClick without role + keyboard\",\n  \"aria-label on every div (div soup + ARIA)\",\n  \"tabIndex={1} for 'important' buttons\",\n  \"color-only state (red border, no text)\",\n  \"autoplay video/audio without control\",\n  \"role='button' on <button> (redundant)\",\n  \"aria-hidden on focusable elements\",\n  \"preventDefault on Tab inside modal (broken trap)\",\n];"
          },
          {
            "title": "Q25: [MID] Interview checklist — quick answers",
            "explain": "Kya karna hai:\nRevise: first rule of ARIA, focus, live regions, testing.\n\nSeedha matlab:\n\"Can you use this with keyboard only?\" — hamesha demo ready soch.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const interviewA11yChecklist = {\n  firstRuleOfAria:\n    \"If native HTML element + attribute kaam kare, use that — ARIA last.\",\n  wcagLevels: \"A / AA (common product target) / AAA\",\n  focusVisible: \":focus-visible CSS — keyboard users ko dikhe, mouse spam na\",\n  hiddenContent:\n    \"aria-hidden=true decorative; never on interactive or main content\",\n  mobile: \"Touch targets ~44px; same semantics as desktop\",\n  legal: \"ADA, EAA (EU), Section 508 — know they exist\",\n};"
          }
        ]
      },
      {
        "file": "44_AdvancedRouting.jsx",
        "title": "44 — Advanced Routing",
        "kya": "Purana style = routes JSX me, data fetch useEffect me.",
        "detail": "44 — Advanced Routing (React Router v6.4+ Data APIs)\nLevel: MID / ADV  |  Sequence: pehle 22_RoutingBasics, phir yeh\n\nLAYMAN: Purana style = routes JSX me, data fetch useEffect me.\nData router = createBrowserRouter + RouterProvider — route config object,\nloader (pehle data), action (form submit), errorElement, defer/Suspense.\n\nRemix-style thinking: URL = source of truth; loader parallel; pending UI.\n\nKYUN: Less waterfall, better UX (skeleton), auth redirect in loader clean.\nINTERVIEW: loader vs useEffect; action vs onSubmit; useBlocker; useFetcher.\nVite/React 19 — import from react-router-dom.",
        "intro": "44 — Advanced Routing (React Router v6.4+ Data APIs)\nLevel: MID / ADV  |  Sequence: pehle 22_RoutingBasics, phir yeh\n\nLAYMAN: Purana style = routes JSX me, data fetch useEffect me.\nData router = createBrowserRouter + RouterProvider — route config object,\nloader (pehle data), action (form submit), errorElement, defer/Suspense.\n\nRemix-style thinking: URL = source of truth; loader parallel; pending UI.\n\nKYUN: Less waterfall, better UX (skeleton), auth redirect in loader clean.\nINTERVIEW: loader vs useEffect; action vs onSubmit; useBlocker; useFetcher.\nVite/React 19 — import from react-router-dom.",
        "questions": [
          {
            "title": "Q1: createBrowserRouter + RouterProvider (data router entry)",
            "explain": "Kya karna hai:\nrouter = createBrowserRouter([{ path, element, loader, ... }])\nRoot: <RouterProvider router={router} />\n\nSeedha matlab:\nConfig array/object — loaders/actions attach yahan. BrowserRouter+Routes optional alt.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const rootRouter = createBrowserRouter([\n  {\n    path: \"/\",\n    element: <RootLayout />,\n    errorElement: <RootError />,\n    children: [\n      { index: true, element: <HomePage /> },\n      { path: \"about\", element: <AboutPage /> },\n    ],\n  },\n]);\n\nfunction AppWithDataRouter() {\n  return <RouterProvider router={rootRouter} />;\n}\n\nfunction RootLayout() {\n  return (\n    <>\n      <nav>\n        <Link to=\"/\">Home</Link>\n        <Link to=\"/about\">About</Link>\n      </nav>\n      <Outlet />\n    </>\n  );\n}\nfunction HomePage() {\n  return <h1>Home</h1>;\n}\nfunction AboutPage() {\n  return <h1>About</h1>;\n}"
          },
          {
            "title": "Q2: Deep nested routes — tree of children",
            "explain": "Kya karna hai:\nParent path + child path join. /dashboard/settings/profile\n\nSeedha matlab:\nHar level pe layout + Outlet. URL reflects hierarchy.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const nestedRouter = createBrowserRouter([\n  {\n    path: \"/dashboard\",\n    element: <DashboardLayout />,\n    children: [\n      {\n        path: \"settings\",\n        element: <SettingsLayout />,\n        children: [\n          { index: true, element: <SettingsHome /> },\n          { path: \"profile\", element: <ProfileSettings /> },\n        ],\n      },\n    ],\n  },\n]);\n\nfunction DashboardLayout() {\n  return (\n    <div>\n      <h1>Dashboard</h1>\n      <Outlet />\n    </div>\n  );\n}\nfunction SettingsLayout() {\n  return (\n    <aside>\n      <NavLink to=\"profile\">Profile</NavLink>\n      <Outlet />\n    </aside>\n  );\n}\nfunction SettingsHome() {\n  return <p>Settings overview</p>;\n}\nfunction ProfileSettings() {\n  return <p>Profile form</p>;\n}"
          },
          {
            "title": "Q3: Layout routes — shared chrome without path segment",
            "explain": "Kya karna hai:\nParent sirf layout; child paths relative add hote hain.\n\nSeedha matlab:\n/shop + /shop/cart same ShopShell. Nav ek baar render.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "// { path: '/shop', element: <ShopShell />, children: [...] }"
          },
          {
            "title": "Q4: Index routes — parent exact URL default child",
            "explain": "Kya karna hai:\n{ index: true, element: <DefaultPanel /> } — path string nahi.\n\nSeedha matlab:\n/dashboard/settings exact pe SettingsHome; /profile alag child.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Conceptual — teaching file me comments dekho.",
            "code": "// see teaching file comments"
          },
          {
            "title": "Q5: [MID] Pathless layout route (layout without URL segment)",
            "explain": "Kya karna hai:\nParent path=\"\" — wraps siblings, URL me extra segment nahi.\n\nSeedha matlab:\nAuth wrapper ya analytics layout bina /auth prefix ke.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const pathlessRouter = createBrowserRouter([\n  {\n    path: \"/\",\n    element: <Outlet />,\n    children: [\n      {\n        element: <AuthShell />, // pathless layout\n        children: [\n          { path: \"login\", element: <LoginPage /> },\n          { path: \"register\", element: <RegisterPage /> },\n        ],\n      },\n    ],\n  },\n]);\n\nfunction AuthShell() {\n  return (\n    <div className=\"auth-card\">\n      <Outlet />\n    </div>\n  );\n}\nfunction LoginPage() {\n  return <h1>Login</h1>;\n}\nfunction RegisterPage() {\n  return <h1>Register</h1>;\n}"
          },
          {
            "title": "Q6: Loaders — fetch before render + useLoaderData",
            "explain": "Kya karna hai:\nexport async function loader() { return json(data); }\nComponent: const data = useLoaderData()\n\nSeedha matlab:\nRoute navigate → loader run → data ready → render. Waterfall kam.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "async function postsLoader() {\n  const posts = await fakePosts();\n  return json({ posts });\n}\n\nfunction PostsPage() {\n  const { posts } = useLoaderData();\n  return (\n    <ul>\n      {posts.map((p) => (\n        <li key={p.id}>{p.title}</li>\n      ))}\n    </ul>\n  );\n}\n\nconst postsRoute = {\n  path: \"posts\",\n  loader: postsLoader,\n  element: <PostsPage />,\n};"
          },
          {
            "title": "Q7: [ADV] defer + Await + Suspense — slow data non-blocking",
            "explain": "Kya karna hai:\nloader return defer({ fast: x, slow: promise })\nUI: <Suspense><Await resolve={slow}>...</Await></Suspense>\n\nSeedha matlab:\nCritical data turant; heavy stream baad me. Remix/React Router pattern.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "async function dashboardLoader() {\n  const user = await fakeUser();\n  const postsPromise = fakePosts();\n  return defer({ user, posts: postsPromise });\n}\n\nfunction DashboardDeferred() {\n  const { user, posts } = useLoaderData();\n  return (\n    <div>\n      <p>Hi {user.name}</p>\n      <Suspense fallback={<p>Loading posts…</p>}>\n        <Await resolve={posts}>\n          {(list) => (\n            <ul>\n              {list.map((p) => (\n                <li key={p.id}>{p.title}</li>\n              ))}\n            </ul>\n          )}\n        </Await>\n      </Suspense>\n    </div>\n  );\n}"
          },
          {
            "title": "Q8: Actions — Form method=\"post\" + useActionData",
            "explain": "Kya karna hai:\naction async ({ request }) { const fd = await request.formData(); ... return json({ ok }); }\n<Form method=\"post\"> + const result = useActionData()\n\nSeedha matlab:\nMutation route level — revalidation automatic. onSubmit fetch manual kam.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "async function contactAction({ request }) {\n  const fd = await request.formData();\n  const email = fd.get(\"email\");\n  if (!email) return json({ error: \"Email required\" }, { status: 400 });\n  return json({ ok: true, message: \"Sent!\" });\n}\n\nfunction ContactPage() {\n  const actionData = useActionData();\n  return (\n    <Form method=\"post\">\n      <input name=\"email\" type=\"email\" />\n      <button type=\"submit\">Send</button>\n      {actionData?.error && <p role=\"alert\">{actionData.error}</p>}\n      {actionData?.ok && <p>{actionData.message}</p>}\n    </Form>\n  );\n}"
          },
          {
            "title": "Q9: useNavigation — pending / submitting UI",
            "explain": "Kya karna hai:\nconst nav = useNavigation(); nav.state === 'loading' | 'submitting'\n\nSeedha matlab:\nGlobal spinner ya form disabled jab navigation chal rahi ho.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function GlobalPendingBar() {\n  const navigation = useNavigation();\n  const busy =\n    navigation.state === \"loading\" || navigation.state === \"submitting\";\n  if (!busy) return null;\n  return <div aria-live=\"polite\">Loading…</div>;\n}"
          },
          {
            "title": "Q10: errorElement + useRouteError",
            "explain": "Kya karna hai:\nRoute pe errorElement. Loader throw → boundary. useRouteError() detail.\n\nSeedha matlab:\ntry/catch har component me kam. Route-level error UI consistent.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function RootError() {\n  const error = useRouteError();\n  if (isRouteErrorResponse(error)) {\n    return (\n      <div>\n        <h1>{error.status}</h1>\n        <p>{error.statusText}</p>\n        <p>{error.data?.message}</p>\n      </div>\n    );\n  }\n  return (\n    <div>\n      <h1>Oops</h1>\n      <p>{error?.message ?? \"Unknown error\"}</p>\n    </div>\n  );\n}\n\nasync function riskyLoader() {\n  throw json({ message: \"Not found\" }, { status: 404 });\n}"
          },
          {
            "title": "Q11: [MID] Protected routes — loader redirect",
            "explain": "Kya karna hai:\nloader me token check → throw redirect('/login') ya return null + wrapper\n\nSeedha matlab:\nRender se pehle block — flash of protected content kam.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "async function protectedLoader() {\n  const user = await getSessionUser();\n  if (!user) throw redirect(\"/login\");\n  return json({ user });\n}\n\nasync function getSessionUser() {\n  return null; // teaching stub\n}"
          },
          {
            "title": "Q12: Auth context + RequireAuth wrapper (component guard)",
            "explain": "Kya karna hai:\nAuthProvider + RequireAuth children wrap. Loader + component dono pattern.\n\nSeedha matlab:\nClient-only auth state → wrapper OK. SSR/hydration → loader better.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const AuthContext = createContext(null);\n\nfunction AuthProvider({ children }) {\n  const [user, setUser] = useState(null);\n  return (\n    <AuthContext.Provider value={{ user, setUser }}>\n      {children}\n    </AuthContext.Provider>\n  );\n}\n\nfunction useAuth() {\n  return useContext(AuthContext);\n}\n\nfunction RequireAuth({ children }) {\n  const { user } = useAuth();\n  if (!user) return <Navigate to=\"/login\" replace />;\n  return children;\n}\n\nfunction ProtectedPage() {\n  return (\n    <RequireAuth>\n      <h1>Secret</h1>\n    </RequireAuth>\n  );\n}"
          },
          {
            "title": "Q13: Outlet context — parent → deep child data bina prop drill",
            "explain": "Kya karna hai:\nParent: <Outlet context={{ user }} />\nChild: const { user } = useOutletContext()\n\nSeedha matlab:\nLayout ne loader data — niche tabs ko context se do. Overuse mat.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function ParentWithContext() {\n  const { user } = useLoaderData();\n  return <Outlet context={{ user }} />;\n}\n\nfunction ChildUsesContext() {\n  const { user } = useOutletContext();\n  return <p>{user?.name}</p>;\n}"
          },
          {
            "title": "Q14: [MID] Search params advanced — multiple keys + setters",
            "explain": "Kya karna hai:\nuseSearchParams(); setParams(prev => { prev.set('sort','name'); return prev; })\n\nSeedha matlab:\nFilters pagination URL me — share/bookmark. Object shorthand bhi chalega.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function ProductFilters() {\n  const [params, setParams] = useSearchParams();\n  const q = params.get(\"q\") ?? \"\";\n  const sort = params.get(\"sort\") ?? \"newest\";\n\n  function updateSort(next) {\n    setParams((prev) => {\n      prev.set(\"sort\", next);\n      return prev;\n    });\n  }\n\n  return (\n    <div>\n      <input\n        value={q}\n        onChange={(e) =>\n          setParams({ q: e.target.value, sort })\n        }\n      />\n      <button type=\"button\" onClick={() => updateSort(\"price\")}>\n        Sort price\n      </button>\n    </div>\n  );\n}"
          },
          {
            "title": "Q15: Relative links — to=\"..\" / to=\"settings\"",
            "explain": "Kya karna hai:\nLink to=\"cart\" relative current route. \"..\" parent up.\n\nSeedha matlab:\nNested routes me full path hardcode mat. Route change safe.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function OrderDetailLinks() {\n  return (\n    <>\n      <Link to=\"..\">Back to orders</Link>\n      <Link to=\"invoice\">Invoice</Link>\n    </>\n  );\n}"
          },
          {
            "title": "Q16: useMatches + handle — breadcrumbs from route config",
            "explain": "Kya karna hai:\nRoute handle: { crumb: (data) => 'Posts' }. useMatches() map crumbs.\n\nSeedha matlab:\nMeta UI route tree se derive — duplicate titles kam.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function Breadcrumbs() {\n  const matches = useMatches();\n  const crumbs = matches\n    .filter((m) => m.handle?.crumb)\n    .map((m) => ({\n      label: m.handle.crumb(m.data),\n      pathname: m.pathname,\n    }));\n\n  return (\n    <nav aria-label=\"Breadcrumb\">\n      <ol>\n        {crumbs.map((c, i) => (\n          <li key={c.pathname}>\n            {i > 0 && \" / \"}\n            <Link to={c.pathname}>{c.label}</Link>\n          </li>\n        ))}\n      </ol>\n    </nav>\n  );\n}\n\n// Example route config snippet:\n// { path: 'posts', loader: postsLoader, handle: { crumb: () => 'Posts' }, element: <PostsPage /> }"
          },
          {
            "title": "Q17: Lazy route modules — code split per route",
            "explain": "Kya karna hai:\nconst Admin = lazy(() => import('./Admin')); route element: <Suspense><Admin/></Suspense>\n\nSeedha matlab:\nBundle chhota — admin tab load jab route hit. Router lazy + React.lazy pair.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const LazyAdmin = lazy(() =>\n  Promise.resolve({ default: () => <h1>Admin panel</h1> })\n);\n\nfunction LazyAdminRoute() {\n  return (\n    <Suspense fallback={<p>Loading admin…</p>}>\n      <LazyAdmin />\n    </Suspense>\n  );\n}"
          },
          {
            "title": "Q18: Scroll restoration note",
            "explain": "Kya karna hai:\nRouterProvider scroll restoration default on. Custom: ScrollRestoration component (RR 6.4+).\n\nSeedha matlab:\nSPA me back button pe scroll position ya top — product decision. Document karo.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "// import { ScrollRestoration } from 'react-router-dom';\n// Root layout: <ScrollRestoration getKey={(location) => location.pathname} />"
          },
          {
            "title": "Q19: Splat routes — catch-all *",
            "explain": "Kya karna hai:\npath: 'docs/*' — rest URL params me. splat / * param name version pe depend.\n\nSeedha matlab:\nCMS pages / file paths. 404 child ya splat handler.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function DocsCatchAll() {\n  const { \"*\": splat } = useParams();\n  return <p>Doc path: {splat}</p>;\n}\n\n// { path: 'docs/*', loader: ({ params }) => json({ '*': params['*'] }), element: <DocsCatchAll /> }\n// { path: '*', element: <NotFound /> } — global 404 last"
          },
          {
            "title": "Q20: handle export for breadcrumbs / meta (route module pattern)",
            "explain": "Kya karna hai:\nColocate: export async function loader() {}; export const handle = { crumb };\n\nSeedha matlab:\nRoute module ek file — loader, action, component, meta handle sab.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export const postsRouteHandle = {\n  crumb: (data) => data?.posts?.[0]?.title ?? \"Posts\",\n};"
          },
          {
            "title": "Q21: navigate relative — useNavigate({ relative: 'path' })",
            "explain": "Kya karna hai:\nnavigate('..', { relative: 'path' }) ya navigate('../sibling')\n\nSeedha matlab:\nProgrammatic same as relative Link. Form success → navigate('..').",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function useGoUp() {\n  const navigate = useNavigate();\n  return () => navigate(\"..\", { relative: \"path\" });\n}"
          },
          {
            "title": "Q22: [ADV] useBlocker — dirty form \"Leave page?\"",
            "explain": "Kya karna hai:\nconst blocker = useBlocker(whenDirty); blocker.state === 'blocked' → confirm UI\n\nSeedha matlab:\nUnsaved changes guard. UX: custom modal + blocker.proceed / reset.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function DirtyFormBlocker() {\n  const [dirty, setDirty] = useState(false);\n  const blocker = useBlocker(dirty);\n\n  return (\n    <div>\n      <input onChange={() => setDirty(true)} placeholder=\"Type to dirty\" />\n      {blocker.state === \"blocked\" && (\n        <div role=\"dialog\">\n          <p>Unsaved changes. Leave?</p>\n          <button type=\"button\" onClick={() => blocker.proceed()}>\n            Leave\n          </button>\n          <button type=\"button\" onClick={() => blocker.reset()}>\n            Stay\n          </button>\n        </div>\n      )}\n    </div>\n  );\n}"
          },
          {
            "title": "Q23: useFetcher — submit/load without navigation",
            "explain": "Kya karna hai:\nconst fetcher = useFetcher(); fetcher.submit(formData, { method: 'post', action: '/vote' })\n\nSeedha matlab:\nLike button, optimistic UI — page URL same. fetcher.state pending.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function LikeButton({ postId }) {\n  const fetcher = useFetcher();\n  const liked = fetcher.formData?.get(\"liked\") === \"true\";\n\n  return (\n    <fetcher.Form method=\"post\" action={`/posts/${postId}/like`}>\n      <input type=\"hidden\" name=\"liked\" value={String(!liked)} />\n      <button type=\"submit\" disabled={fetcher.state !== \"idle\"}>\n        {liked ? \"Unlike\" : \"Like\"}\n      </button>\n    </fetcher.Form>\n  );\n}"
          },
          {
            "title": "Q24: [ADV] Parallel loaders (Remix-style) — sibling routes",
            "explain": "Kya karna hai:\nParent + child loaders parallel jab sibling branches navigate.\n\nSeedha matlab:\nData router same level loaders run together — parent/child waterfall aware design.\nHeavy child → defer; siblings independent → parallel benefit.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const parallelRouter = createBrowserRouter([\n  {\n    path: \"/\",\n    loader: async () => json({ layout: await fakeUser() }),\n    element: <RootLayout />,\n    children: [\n      {\n        path: \"feed\",\n        loader: async () => json({ posts: await fakePosts() }),\n        element: <PostsPage />,\n      },\n      {\n        path: \"sidebar\",\n        loader: async () => json({ widgets: [] }),\n        element: <SidebarWidgets />,\n      },\n    ],\n  },\n]);\n\nfunction SidebarWidgets() {\n  const { widgets } = useLoaderData();\n  return <aside>{widgets.length} widgets</aside>;\n}"
          },
          {
            "title": "Q25: [MID] Interview quick hits — data router vs classic",
            "explain": "Kya karna hai:\nloader vs useEffect; action vs fetch POST; when useFetcher vs Form navigate.\n\nSeedha matlab:\nClassic RR = client-only routing. Data APIs = data coupling + pending states.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const routingInterviewNotes = {\n  loaderVsEffect:\n    \"Loader runs on navigation before paint; avoids loading spinner flash + race on fast nav.\",\n  actionVsOnSubmit:\n    \"Action tied to route; automatic revalidation of loaders on that route tree.\",\n  redirectVsNavigate:\n    \"throw redirect() in loader/action — server-style; Navigate component client guard.\",\n  useBlockerCaveat:\n    \"History API limits; not for hard browser close — beforeunload alag.\",\n  v7Note: \"React Router 7 merges Remix; data APIs stay core mental model.\",\n};\n\n// --- createRoutesFromElements alternative (JSX config) ---\nconst jsxRouter = createBrowserRouter(\n  createRoutesFromElements(\n    <Route path=\"/\" element={<RootLayout />} errorElement={<RootError />}>\n      <Route index element={<HomePage />} />\n      <Route path=\"about\" element={<AboutPage />} />\n      <Route path=\"posts\" loader={postsLoader} element={<PostsPage />} />\n      <Route path=\"contact\" action={contactAction} element={<ContactPage />} />\n    </Route>\n  )\n);\n\nfunction AppWithJsxRouter() {\n  return <RouterProvider router={jsxRouter} />;\n}"
          }
        ]
      },
      {
        "file": "45_ConcurrentTransitions.jsx",
        "title": "45 — Concurrent / Transitions",
        "kya": "Concurrent React = UI ko interrupt karke urgent kaam pehle dikhao.",
        "detail": "45 — Concurrent React: useTransition, useDeferredValue, startTransition\nLevel: MID–ADV  |  Sequence: pehle 24 (perf), phir yeh\n\nLAYMAN: Concurrent React = UI ko interrupt karke urgent kaam pehle dikhao.\nTyping snappy rahe; heavy filter/list peeche update ho — user ko lag nahi.\nuseTransition / startTransition = \"yeh update non-urgent hai\".\nuseDeferredValue = value ka thoda purana version dikhao jab naya slow ho.\n\nKYUN: Big lists, tab switches, search — input freeze mat karo.\nINTERVIEW: urgent vs transition; transition vs deferred; flushSync contrast;\ntransitions speed nahi badhate — responsiveness badhate hain.\nVite/React 19 project me use — teaching file.",
        "intro": "45 — Concurrent React: useTransition, useDeferredValue, startTransition\nLevel: MID–ADV  |  Sequence: pehle 24 (perf), phir yeh\n\nLAYMAN: Concurrent React = UI ko interrupt karke urgent kaam pehle dikhao.\nTyping snappy rahe; heavy filter/list peeche update ho — user ko lag nahi.\nuseTransition / startTransition = \"yeh update non-urgent hai\".\nuseDeferredValue = value ka thoda purana version dikhao jab naya slow ho.\n\nKYUN: Big lists, tab switches, search — input freeze mat karo.\nINTERVIEW: urgent vs transition; transition vs deferred; flushSync contrast;\ntransitions speed nahi badhate — responsiveness badhate hain.\nVite/React 19 project me use — teaching file.",
        "questions": [
          {
            "title": "Q1: useTransition — isPending + startTransition basics",
            "explain": "Kya karna hai:\nHook se non-urgent state updates wrap karo; pending UI dikhao.\n\nSeedha matlab:\n[isPending, startTransition] = useTransition().\nstartTransition(() => setHeavy(...)) — React input jaisa urgent pehle.\nisPending true jab transition abhi render complete nahi hua.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function SearchWithTransition({ allItems }) {\n  const [query, setQuery] = useState(\"\");\n  const [filtered, setFiltered] = useState(allItems);\n  const [isPending, startTransition] = useTransition();\n\n  function onChange(e) {\n    const q = e.target.value;\n    setQuery(q); // urgent — input turant update\n    startTransition(() => {\n      setFiltered(allItems.filter((item) => item.includes(q))); // non-urgent\n    });\n  }\n\n  return (\n    <div>\n      <input value={query} onChange={onChange} placeholder=\"Search...\" />\n      {isPending && <span aria-live=\"polite\">Updating…</span>}\n      <ul>\n        {filtered.map((item) => (\n          <li key={item}>{item}</li>\n        ))}\n      </ul>\n    </div>\n  );\n}"
          },
          {
            "title": "Q2: startTransition import from 'react' (non-hook)",
            "explain": "Kya karna hai:\nComponent ke bahar / callback me bina hook ke transition mark karo.\n\nSeedha matlab:\nuseTransition sirf component me. startTransition() kahi bhi —\nevent handler, utility, setTimeout ke andar.\nSame priority marking; isPending ke liye hook chahiye.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "let externalItems = [\"apple\", \"banana\", \"cherry\"];\n\nexport function applyFilterOutside(setFiltered, q) {\n  startTransition(() => {\n    setFiltered(externalItems.filter((x) => x.includes(q)));\n  });\n}\n\nexport function ExternalTransitionDemo() {\n  const [q, setQ] = useState(\"\");\n  const [list, setList] = useState(externalItems);\n  return (\n    <input\n      value={q}\n      onChange={(e) => {\n        const v = e.target.value;\n        setQ(v);\n        applyFilterOutside(setList, v);\n      }}\n    />\n  );\n}"
          },
          {
            "title": "Q3: useDeferredValue — defer slow re-render",
            "explain": "Kya karna hai:\nFast input state rakho; deferred copy se heavy child feed karo.\n\nSeedha matlab:\nconst deferredQuery = useDeferredValue(query).\nJab query change hoti hai, deferred thodi peeche reh sakti hai —\npurani value ke saath ek aur render (stale UI briefly OK).\nChild ko deferred prop do — parent me startTransition ki zaroorat kam.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function SlowList({ query }) {\n  const items = useMemo(() => {\n    const big = Array.from({ length: 8000 }, (_, i) => `row-${i}`);\n    return big.filter((r) => r.includes(query));\n  }, [query]);\n  return <p>{items.length} matches</p>;\n}\n\nexport function DeferredSearch() {\n  const [query, setQuery] = useState(\"\");\n  const deferredQuery = useDeferredValue(query);\n  const isStale = query !== deferredQuery;\n\n  return (\n    <div style={{ opacity: isStale ? 0.6 : 1 }}>\n      <input value={query} onChange={(e) => setQuery(e.target.value)} />\n      <SlowList query={deferredQuery} />\n    </div>\n  );\n}"
          },
          {
            "title": "Q4: Transition vs useDeferredValue — kab kya?",
            "explain": "Kya karna hai:\nDono non-urgent ka kaam; API alag — choose by shape of problem.\n\nSeedha matlab:\nuseTransition: tum khud setState wrap karte ho; isPending milta hai;\nmultiple state updates ek transition me.\nuseDeferredValue: ek value defer; child ko prop pass; \"stale\" visual easy.\nRule of thumb: state updates tum control → transition; prop/value lag → deferred.\nDono ek saath bhi (Q19).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const transitionVsDeferred =\n  \"Transition = mark updates non-urgent + pending flag. Deferred = lag behind on a value.\";"
          },
          {
            "title": "Q5: Urgent vs non-urgent updates",
            "explain": "Kya karna hai:\nTyping/click/scroll urgent; filter/chart/route change non-urgent.\n\nSeedha matlab:\nUrgent = user ko turant feedback chahiye (controlled input value).\nNon-urgent = thoda delay OK (10k list filter, tab content swap).\nGalat split = typing bhi transition me → input sluggish feel.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function UrgentNonUrgentSplit() {\n  const [text, setText] = useState(\"\");\n  const [count, setCount] = useState(0);\n  const [pending, startTransition] = useTransition();\n\n  function onType(e) {\n    setText(e.target.value); // urgent\n    startTransition(() => {\n      setCount(e.target.value.length); // non-urgent stats\n    });\n  }\n\n  return (\n    <>\n      <input value={text} onChange={onType} />\n      <small>{pending ? \"…\" : `${count} chars`}</small>\n    </>\n  );\n}"
          },
          {
            "title": "Q6: Search filter demo — full pattern",
            "explain": "Kya karna hai:\nInput urgent; filter + sort transition me; pending + stale styling.\n\nSeedha matlab:\nClassic interview demo. Expensive work transition ke andar.\nOptional: results pe opacity jab pending.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const CATALOG = Array.from({ length: 5000 }, (_, i) => `product-${i}`);\n\nexport function ProductSearch() {\n  const [q, setQ] = useState(\"\");\n  const [results, setResults] = useState(CATALOG);\n  const [isPending, startTransition] = useTransition();\n\n  function handleSearch(value) {\n    setQ(value);\n    startTransition(() => {\n      const next = CATALOG.filter((p) => p.includes(value)).sort();\n      setResults(next);\n    });\n  }\n\n  return (\n    <section>\n      <input value={q} onChange={(e) => handleSearch(e.target.value)} />\n      <div style={{ opacity: isPending ? 0.5 : 1 }}>\n        Showing {results.length} items\n      </div>\n    </section>\n  );\n}"
          },
          {
            "title": "Q7: Tab switch with deferred content",
            "explain": "Kya karna hai:\nTab click urgent; heavy panel deferred value se render.\n\nSeedha matlab:\ntab state turant change — highlight snappy.\ndeferredTab = useDeferredValue(tab) se slow panel render.\nPurana tab content briefly dikhe — acceptable for transitions.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const TAB_CONTENT = {\n  home: \"Light home\",\n  reports: Array.from({ length: 3000 }, (_, i) => `report-${i}`).join(\" \"),\n  settings: \"Settings form\",\n};\n\nfunction HeavyPanel({ tab }) {\n  const body = useMemo(() => TAB_CONTENT[tab] ?? \"\", [tab]);\n  return <div className=\"panel\">{typeof body === \"string\" ? body.slice(0, 200) : body}</div>;\n}\n\nexport function DeferredTabs() {\n  const [tab, setTab] = useState(\"home\");\n  const deferredTab = useDeferredValue(tab);\n  const stale = tab !== deferredTab;\n\n  return (\n    <div>\n      {[\"home\", \"reports\", \"settings\"].map((t) => (\n        <button key={t} onClick={() => setTab(t)} aria-pressed={tab === t}>\n          {t}\n        </button>\n      ))}\n      <div style={{ opacity: stale ? 0.5 : 1 }}>\n        <HeavyPanel tab={deferredTab} />\n      </div>\n    </div>\n  );\n}"
          },
          {
            "title": "Q8: Suspense + transition",
            "explain": "Kya karna hai:\nRoute/tab change transition me; Suspense fallback during suspend.\n\nSeedha matlab:\nTransition updates Suspense boundaries ko interruptible banate hain —\npurana UI dikhta rehta jab naya chunk/data load ho.\nstartTransition(() => setTab('slow')) + <Suspense fallback=...>.\nWithout transition, suspend = jarring replace.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function LazyChunk() {\n  // teaching: imagine React.lazy component suspending here\n  return <p>Loaded chunk content</p>;\n}\n\nexport function SuspenseTransitionTabs() {\n  const [tab, setTab] = useState(\"a\");\n  const [pending, startTransition] = useTransition();\n\n  return (\n    <div>\n      <button\n        onClick={() =>\n          startTransition(() => {\n            setTab(\"b\");\n          })\n        }\n      >\n        Go slow tab {pending && \"…\"}\n      </button>\n      <Suspense fallback={<p>Loading tab…</p>}>\n        <LazyChunk key={tab} />\n      </Suspense>\n    </div>\n  );\n}"
          },
          {
            "title": "Q9: useTransition with router-ish navigate idea",
            "explain": "Kya karna hai:\nProgrammatic navigation non-urgent mark — pending spinner on link.\n\nSeedha matlab:\nReact Router me direct integration nahi; pattern:\nstartTransition(() => navigate('/dashboard')).\nisPending se nav bar loading. Urgent: modal close; non-urgent: page swap.\nSame mental model SPA route changes ke liye.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function RouterishNavigate({ navigateFn }) {\n  const [isPending, startTransition] = useTransition();\n\n  function goDashboard() {\n    startTransition(() => {\n      navigateFn(\"/dashboard\"); // pretend useNavigate()\n    });\n  }\n\n  return (\n    <button onClick={goDashboard} disabled={isPending}>\n      {isPending ? \"Navigating…\" : \"Dashboard\"}\n    </button>\n  );\n}"
          },
          {
            "title": "Q10: isPending UI patterns",
            "explain": "Kya karna hai:\nSpinner, opacity, disabled button, aria-busy — consistent pending UX.\n\nSeedha matlab:\n1) Inline \"Updating…\" text (accessible aria-live).\n2) Results opacity 0.5 jab pending.\n3) Submit/nav button disabled + label change.\n4) Skeleton same layout — layout shift kam.\nisPending false jab transition commit ho chuka (not same as data fetch).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function PendingPatterns() {\n  const [isPending, startTransition] = useTransition();\n  const [page, setPage] = useState(1);\n\n  return (\n    <div aria-busy={isPending}>\n      <button\n        disabled={isPending}\n        onClick={() => startTransition(() => setPage((p) => p + 1))}\n      >\n        {isPending ? \"Loading page…\" : \"Next page\"}\n      </button>\n      <article style={{ opacity: isPending ? 0.6 : 1 }}>Page {page}</article>\n    </div>\n  );\n}"
          },
          {
            "title": "Q11: Concurrent features history (React 18+)",
            "explain": "Kya karna hai:\nTimeline samjho — interview \"since when\" questions.\n\nSeedha matlab:\nReact 18 (2022): createRoot, automatic batching, transitions, Suspense improvements.\nuseTransition / useDeferredValue / startTransition public API.\nReact 19: Actions often auto-transition; still same concurrent renderer core.\nLegacy createRoot nahi = no concurrent features fully.\nFiber (16+) ne foundation di; 18 ne concurrent rendering user-facing.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const concurrentHistory = [\n  \"React 16 Fiber — foundation\",\n  \"React 18 — createRoot, transitions, deferred values\",\n  \"React 19 — Actions wrap updates in transition by default (forms)\",\n];"
          },
          {
            "title": "Q12: Tearing — conceptual note",
            "explain": "Kya karna hai:\nExternal store + concurrent render = inconsistent UI briefly — samjho concept.\n\nSeedha matlab:\nTearing = screen ka ek hissa purana data, doosra naya (same render cycle mismatch).\nReact state/context generally safe. Problem: mutable external store bina sync.\nuseSyncExternalStore (18) fix pattern third-party stores ke liye.\nTransitions tearing ko zyada visible kar sakte agar store sync nahi.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const tearingNote =\n  \"Concurrent render can pause/resume; external mutable stores need useSyncExternalStore to avoid torn UI.\";"
          },
          {
            "title": "Q13: flushSync — when NOT concurrent",
            "explain": "Kya karna hai:\nKabhi turant DOM sync chahiye — flushSync urgent force karta hai.\n\nSeedha matlab:\nflushSync(() => setState()) — React abhi render + commit kare (sync).\nUse rare: third-party lib ko DOM measure immediately, focus after insert.\nOveruse = concurrent benefits kill + perf hit.\nTransition ke opposite — \"yeh wait mat karo\".",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function MeasureAfterUpdate() {\n  const [open, setOpen] = useState(false);\n  const ref = useRef(null);\n\n  function toggle() {\n    flushSync(() => setOpen(true));\n    // DOM ab updated — measure/focus safe\n    ref.current?.focus();\n  }\n\n  return open ? <input ref={ref} /> : <button onClick={toggle}>Open</button>;\n}"
          },
          {
            "title": "Q14: startTransition in event handler vs setTimeout",
            "explain": "Kya karna hai:\nDono jagah kaam; event me preferred; setTimeout me bhi valid.\n\nSeedha matlab:\nEvent handler: startTransition(() => setX) — React batching context me.\nsetTimeout: callback alag task — phir bhi startTransition wrap karo\ntaaki resulting setState transition priority me ho.\nTrap: setTimeout bina transition = low priority nahi, bas later run.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function EventVsTimeout() {\n  const [n, setN] = useState(0);\n  const [isPending, startTransition] = useTransition();\n\n  function onClickEvent() {\n    startTransition(() => setN((x) => x + 1));\n  }\n\n  function onClickDelayed() {\n    setTimeout(() => {\n      startTransition(() => setN((x) => x + 100));\n    }, 0);\n  }\n\n  return (\n    <>\n      <button onClick={onClickEvent}>+1 transition</button>\n      <button onClick={onClickDelayed}>+100 after timeout</button>\n      {isPending && \"pending\"} {n}\n    </>\n  );\n}"
          },
          {
            "title": "Q15: Nested transitions",
            "explain": "Kya karna hai:\nTransition ke andar transition — outer pending behavior samjho.\n\nSeedha matlab:\nNested startTransition usually outer transition me merge —\nek hi transition track (implementation detail, behavior: non-urgent).\nDeep nesting socho mat — ek meaningful transition boundary kaafi.\nisPending true if any transition in tree pending (same hook instance).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function NestedTransitions() {\n  const [a, setA] = useState(0);\n  const [b, setB] = useState(0);\n  const [pending, startTransition] = useTransition();\n\n  function run() {\n    startTransition(() => {\n      setA(1);\n      startTransition(() => {\n        setB(2);\n      });\n    });\n  }\n\n  return (\n    <button onClick={run}>\n      {pending ? \"…\" : `${a}-${b}`}\n    </button>\n  );\n}"
          },
          {
            "title": "Q16: Performance myth — transitions speed nahi badhate",
            "explain": "Kya karna hai:\nInterview trap: \"transition se filter fast ho gaya\" — galat.\n\nSeedha matlab:\nSame CPU work hota hai — bas scheduling alag: urgent pe interrupt.\n10k filter ab bhi 10k filter — virtualize / Web Worker alag topic.\nTransition = responsiveness (input smooth), not shorter Big-O.\nMeasure: INP, typing latency — not total filter ms alone.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const perfTruth =\n  \"Transitions improve perceived responsiveness by prioritizing urgent updates; they do not reduce total computation.\";"
          },
          {
            "title": "Q17: Interview traps (common wrong answers)",
            "explain": "Kya karna hai:\nGalat claims yaad rakho taaki avoid karo.\n\nSeedha matlab:\nTrap 1: \"Har setState ko transition\" — input sluggish.\nTrap 2: \"useDeferredValue same as debounce\" — no fixed delay; React scheduler.\nTrap 3: \"isPending = fetch loading\" — sirf transition render pending.\nTrap 4: \"Concurrent = parallel threads\" — mostly cooperative scheduling JS me.\nTrap 5: \"SSR me transitions matter same\" — mostly client hydration/interaction.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export const interviewTraps = [\n  \"Don't wrap typing state in transition\",\n  \"Deferred ≠ debounce (no fixed ms)\",\n  \"isPending ≠ useFetch loading\",\n  \"Concurrent ≠ multithreading by default\",\n];"
          },
          {
            "title": "Q18: React 19 Actions — automatic transitions note",
            "explain": "Kya karna hai:\nForm actions / useActionState updates often already transition priority.\n\nSeedha matlab:\nReact 19 me action dispatch ke updates transition me wrap hote hain —\nform pending state + UI responsive rehta.\nPurane onSubmit + manual setState me khud startTransition socho.\nFiles 29–31 dekho Actions detail. Manual transition ab bhi valid non-form UI.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "async function saveAction(prev, formData) {\n  await new Promise((r) => setTimeout(r, 300));\n  return { ok: true, name: formData.get(\"name\") };\n}\n\n// teaching note: useActionState(saveAction) in React 19 auto-transitions updates"
          },
          {
            "title": "Q19: useDeferredValue + memo list combo",
            "explain": "Kya karna hai:\nMemoized child + deferred prop — unnecessary re-render kam.\n\nSeedha matlab:\nconst MemoRows = memo(Rows).\n<MemoRows query={deferredQuery} /> — jab deferred same, memo skip.\nInput fast update; child tab jab deferred catch up.\nPair with useMemo inside child for heavy derive.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const MemoRows = memo(function Rows({ query, rows }) {\n  const visible = useMemo(\n    () => rows.filter((r) => r.includes(query)),\n    [rows, query]\n  );\n  return <ul>{visible.slice(0, 50).map((r) => <li key={r}>{r}</li>)}</ul>;\n});\n\nexport function DeferredMemoList({ rows }) {\n  const [q, setQ] = useState(\"\");\n  const deferredQ = useDeferredValue(q);\n  return (\n    <>\n      <input value={q} onChange={(e) => setQ(e.target.value)} />\n      <MemoRows query={deferredQ} rows={rows} />\n    </>\n  );\n}"
          },
          {
            "title": "Q20: useTransition error handling",
            "explain": "Kya karna hai:\nTransition ke andar throw/error — Error Boundary / recover pattern.\n\nSeedha matlab:\nRender me error transition ke baad bhi Error Boundary pakad sakti hai.\nEvent/async error transition se nahi bound — try/catch khud.\nRetry: error boundary reset + state rollback manually.\nSuspense + error boundary alag layers (file 20, 21).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "function BuggyTransitionChild({ crash }) {\n  if (crash) throw new Error(\"transition render failed\");\n  return <p>OK</p>;\n}\n\nexport function TransitionErrorDemo() {\n  const [crash, setCrash] = useState(false);\n  const [pending, startTransition] = useTransition();\n\n  return (\n    <>\n      <button\n        onClick={() =>\n          startTransition(() => {\n            setCrash(true);\n          })\n        }\n      >\n        Trigger {pending && \"…\"}\n      </button>\n      <BuggyTransitionChild crash={crash} />\n    </>\n  );\n}"
          },
          {
            "title": "Q21: Throttle / debounce vs transition",
            "explain": "Kya karna hai:\nTeeno alag tools — kab kaunsa.\n\nSeedha matlab:\nDebounce: fixed wait ke baad ek baar fire (API search 300ms).\nThrottle: max N calls per window (scroll handler).\nTransition: React render priority — no fixed timer; scheduler decide.\nAPI calls ke liye debounce; render heavy UI ke liye transition/deferred.\nCombine: debounce fetch + transition for local filter OK.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const compareSchedule =\n  \"Debounce/throttle = rate-limit events. Transition = prioritize which React updates render first.\";"
          },
          {
            "title": "Q22: Practical checklist — kab use karo",
            "explain": "Kya karna hai:\nDecision tree bolke sunao interview me.\n\nSeedha matlab:\n✓ Heavy list/filter on typing → transition or deferred\n✓ Tab/route swap with slow child → transition + Suspense\n✓ Need pending UI flag → useTransition\n✓ Value naturally flows as prop → useDeferredValue\n✗ Simple forms / few items — YAGNI\n✗ Network delay — use fetch pending, not isPending alone\n✗ Need exact delay — debounce, not deferred",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export const transitionChecklist = {\n  useTransition: \"you control multiple setStates + want isPending\",\n  useDeferredValue: \"single value lags; pass to memo child\",\n  neither: \"small tree, no jank measured\",\n  alsoConsider: \"virtualize list, useMemo, Web Worker for CPU\",\n};"
          },
          {
            "title": "Q23: Multiple setStates ek transition me",
            "explain": "Kya karna hai:\nEk startTransition me kai updates — ek pending, batched non-urgent.\n\nSeedha matlab:\nstartTransition(() => { setA(); setB(); setC(); }) — sab non-urgent batch.\nUrgent input alag rakho transition ke bahar.\nFunctional updaters transition ke andar safe.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function MultiStateTransition() {\n  const [query, setQuery] = useState(\"\");\n  const [page, setPage] = useState(1);\n  const [sort, setSort] = useState(\"asc\");\n  const [pending, startTransition] = useTransition();\n\n  function applyFilters(q) {\n    setQuery(q);\n    startTransition(() => {\n      setPage(1);\n      setSort(q.length > 3 ? \"desc\" : \"asc\");\n    });\n  }\n\n  return (\n    <div>\n      <input onChange={(e) => applyFilters(e.target.value)} value={query} />\n      {pending ? \"Applying…\" : `${sort} p${page}`}\n    </div>\n  );\n}"
          },
          {
            "title": "Q24: Stale UI visual — deferred vs pending",
            "explain": "Kya karna hai:\nquery !== deferredQuery se stale; isPending alag signal.\n\nSeedha matlab:\nDeferred: intentionally purani list dikhao jab naya render busy.\nisPending: transition chal raha — spinner/opacity.\nDono ek saath: opacity + \"Showing older results\" banner.\nUX honest raho — user samjhe data catching up hai.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function StaleVisualDemo() {\n  const [q, setQ] = useState(\"\");\n  const deferredQ = useDeferredValue(q);\n  const [pending, startTransition] = useTransition();\n\n  function onChange(e) {\n    const v = e.target.value;\n    setQ(v);\n    startTransition(() => {\n      /* imagine extra state sync */\n    });\n  }\n\n  const stale = q !== deferredQ;\n\n  return (\n    <div>\n      <input value={q} onChange={onChange} />\n      {stale && <p role=\"status\">Results may be outdated…</p>}\n      {pending && <p>Updating…</p>}\n      <SlowList query={deferredQ} />\n    </div>\n  );\n}"
          },
          {
            "title": "Q25: Concurrent rendering + Strict Mode / dev double render",
            "explain": "Kya karna hai:\nDev me extra renders transitions ko confuse mat karo debugging me.\n\nSeedha matlab:\nStrict Mode dev me double invoke — isPending flicker ho sakta briefly.\nProduction behavior pe focus. Profiler se transition marked renders dekho.\ncreateRoot required — ReactDOM.render legacy concurrent transitions limited.\nTeaching file: React 19 + createRoot assume.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const devNote =\n  \"Strict Mode dev double-mount can make pending states flicker; trust production profiling.\";\n\n// -----------------------------------------------------------------------------\n// Quick revise map\n// 24 perf → 45 transitions → 46 auth/forms → 47 zustand\n// Related: 21 Suspense, 29–31 Actions, 40 Q17 concurrent one-liner\n// -----------------------------------------------------------------------------"
          }
        ]
      },
      {
        "file": "46_AuthAndFormsLibs.jsx",
        "title": "46 — Auth + React Hook Form + Zod",
        "kya": "Auth = kaun logged in hai + routes protect. Token memory/localStorage/",
        "detail": "46 — Auth Patterns + React Hook Form + Zod\nLevel: MID  |  Sequence: pehle 11 (context), 08 (forms), phir yeh\n\nLAYMAN: Auth = kaun logged in hai + routes protect. Token memory/localStorage/\nhttpOnly cookie — tradeoffs. RHF = forms bina har keystroke re-render;\nZod = schema validation TypeScript-friendly. zodResolver dono jodta hai.\n\nKYUN: Real apps me login, protected pages, validated forms daily kaam.\nINTERVIEW: token storage XSS; ProtectedRoute; RHF register vs Controller;\nserver errors → setError.\nVite/React 19 project me use — teaching file.",
        "intro": "46 — Auth Patterns + React Hook Form + Zod\nLevel: MID  |  Sequence: pehle 11 (context), 08 (forms), phir yeh\n\nLAYMAN: Auth = kaun logged in hai + routes protect. Token memory/localStorage/\nhttpOnly cookie — tradeoffs. RHF = forms bina har keystroke re-render;\nZod = schema validation TypeScript-friendly. zodResolver dono jodta hai.\n\nKYUN: Real apps me login, protected pages, validated forms daily kaam.\nINTERVIEW: token storage XSS; ProtectedRoute; RHF register vs Controller;\nserver errors → setError.\nVite/React 19 project me use — teaching file.",
        "questions": [
          {
            "title": "Q1: Token in memory vs localStorage — tradeoffs",
            "explain": "Kya karna hai:\nDono storage strategies compare karo interview me.\n\nSeedha matlab:\nMemory (React state / module var): XSS se chori ho sakta hai JS read karke,\nlekin refresh pe token lost — tab close = logout. Zyada secure feel SPA me\nagar refresh token httpOnly cookie se aaye.\nlocalStorage: persist across refresh; XSS = game over (document.cookie/localStorage\nreadable by injected script). Never store refresh token in localStorage prod me\nagar XSS risk hai.\nBest prod sketch: access token memory/short-lived; refresh httpOnly Secure cookie.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "let memoryAccessToken = null;\n\nexport function setMemoryToken(token) {\n  memoryAccessToken = token;\n}\n\nexport function getMemoryToken() {\n  return memoryAccessToken;\n}\n\nexport function persistTokenLocal(token) {\n  localStorage.setItem(\"access_token\", token);\n}\n\nexport function readTokenLocal() {\n  return localStorage.getItem(\"access_token\");\n}\n\nconst tokenTradeoffs =\n  \"Memory = lost on refresh, slightly less persistent XSS window. localStorage = persists, XSS steals easily.\";"
          },
          {
            "title": "Q2: AuthContext provider",
            "explain": "Kya karna hai:\nuser, login, logout, loading — tree-wide auth state.\n\nSeedha matlab:\ncreateContext + Provider. Value stable via useMemo where possible.\nChildren useAuth() se consume. Real app: bootstrap me /me fetch.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const AuthContext = createContext(null);\n\nexport function AuthProvider({ children }) {\n  const [user, setUser] = useState(null);\n  const [bootstrapping, setBootstrapping] = useState(true);\n\n  // sketch: on mount read token + fetch profile\n  useEffect(() => {\n    const t = readTokenLocal();\n    if (t) {\n      fetch(\"/api/me\", { headers: { Authorization: `Bearer ${t}` } })\n        .then((r) => (r.ok ? r.json() : null))\n        .then((u) => setUser(u))\n        .finally(() => setBootstrapping(false));\n    } else {\n      setBootstrapping(false);\n    }\n  }, []);\n\n  const login = useCallback((profile, token) => {\n    persistTokenLocal(token);\n    setMemoryToken(token);\n    setUser(profile);\n  }, []);\n\n  const logout = useCallback(() => {\n    localStorage.removeItem(\"access_token\");\n    setMemoryToken(null);\n    setUser(null);\n  }, []);\n\n  const value = useMemo(\n    () => ({ user, login, logout, bootstrapping, isAuthenticated: !!user }),\n    [user, login, logout, bootstrapping]\n  );\n\n  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;\n}\n\nexport function useAuth() {\n  const ctx = useContext(AuthContext);\n  if (!ctx) throw new Error(\"useAuth must be inside AuthProvider\");\n  return ctx;\n}"
          },
          {
            "title": "Q3: login / logout flow",
            "explain": "Kya karna hai:\nCredentials POST → token + user → context update.\n\nSeedha matlab:\nlogin({ email, password }) async → API → login(profile, token).\nlogout clears storage + context. UI conditional on user.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "async function fakeLoginApi(email, password) {\n  await new Promise((r) => setTimeout(r, 200));\n  if (email === \"a@a.com\" && password === \"pass\") {\n    return { token: \"fake-jwt\", user: { id: 1, email, role: \"user\" } };\n  }\n  throw new Error(\"Invalid credentials\");\n}\n\nexport function LoginLogoutButtons() {\n  const { user, login, logout } = useAuth();\n\n  async function handleLogin() {\n    const { token, user: profile } = await fakeLoginApi(\"a@a.com\", \"pass\");\n    login(profile, token);\n  }\n\n  if (user) {\n    return (\n      <p>\n        Hi {user.email}{\" \"}\n        <button type=\"button\" onClick={logout}>\n          Logout\n        </button>\n      </p>\n    );\n  }\n  return <button type=\"button\" onClick={handleLogin}>Login</button>;\n}"
          },
          {
            "title": "Q4: ProtectedRoute component",
            "explain": "Kya karna hai:\nAuth nahi → redirect login; warna children/outlet render.\n\nSeedha matlab:\nif (!user) return <Navigate to=\"/login\" replace state={{ from: location }} />.\nbootstrapping pe spinner — flash redirect avoid.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function ProtectedRoute({ children }) {\n  const { isAuthenticated, bootstrapping } = useAuth();\n  const location = useLocation();\n\n  if (bootstrapping) return <p>Checking session…</p>;\n  if (!isAuthenticated) {\n    return <Navigate to=\"/login\" replace state={{ from: location }} />;\n  }\n  return children ?? <Outlet />;\n}"
          },
          {
            "title": "Q5: Attach Authorization header (API client sketch)",
            "explain": "Kya karna hai:\nHar fetch me Bearer token auto attach.\n\nSeedha matlab:\nWrapper api.get/post — token memory ya localStorage se padh ke header set.\n401 aaye → refresh flow ya logout. Centralize — har component me mat likho.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export async function apiFetch(path, options = {}) {\n  const token = getMemoryToken() ?? readTokenLocal();\n  const headers = {\n    ...options.headers,\n    ...(token ? { Authorization: `Bearer ${token}` } : {}),\n  };\n  const res = await fetch(path, { ...options, headers });\n  if (res.status === 401) {\n    // trigger refresh or logout — see Q6\n    throw new Error(\"Unauthorized\");\n  }\n  return res;\n}"
          },
          {
            "title": "Q6: Refresh token sketch",
            "explain": "Kya karna hai:\nAccess expire → refresh endpoint → naya access; fail → logout.\n\nSeedha matlab:\nRefresh token httpOnly cookie me (server set) — JS read nahi kar sakta.\nPOST /auth/refresh credentials:include → new access token JSON.\nQueue: parallel 401 pe ek refresh, baaki requests wait.\nMemory me naya access store; refresh rotate ho to cookie auto update server side.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "let refreshPromise = null;\n\nexport async function refreshAccessToken() {\n  if (!refreshPromise) {\n    refreshPromise = fetch(\"/auth/refresh\", { method: \"POST\", credentials: \"include\" })\n      .then((r) => {\n        if (!r.ok) throw new Error(\"refresh failed\");\n        return r.json();\n      })\n      .then(({ accessToken }) => {\n        setMemoryToken(accessToken);\n        return accessToken;\n      })\n      .finally(() => {\n        refreshPromise = null;\n      });\n  }\n  return refreshPromise;\n}"
          },
          {
            "title": "Q7: Route guards — role / feature flags",
            "explain": "Kya karna hai:\nAuthenticated + role check alag layer.\n\nSeedha matlab:\nProtectedRoute = logged in. RoleRoute = user.role === 'admin'.\nFeature guard = subscription active. Compose nested routes.\nUnauthorized role → 403 page, login pe mat bhejo (already authed).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function RoleRoute({ role, children }) {\n  const { user, isAuthenticated } = useAuth();\n  if (!isAuthenticated) return <Navigate to=\"/login\" replace />;\n  if (user?.role !== role) return <Navigate to=\"/403\" replace />;\n  return children;\n}"
          },
          {
            "title": "Q8: Role-based UI (admin panel toggle)",
            "explain": "Kya karna hai:\nSame page pe admin-only buttons conditionally.\n\nSeedha matlab:\nuser?.role === 'admin' && <AdminTools />.\nUI hide ≠ security — API bhi authorize kare. Client guard UX ke liye.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function AdminPanel() {\n  const { user } = useAuth();\n  if (user?.role !== \"admin\") return null;\n  return (\n    <section>\n      <h2>Admin</h2>\n      <button type=\"button\">Delete all</button>\n    </section>\n  );\n}"
          },
          {
            "title": "Q9: Redirect after login — location.state.from",
            "explain": "Kya karna hai:\nProtected redirect se aaye to wapas intended URL pe bhejo.\n\nSeedha matlab:\nLogin page: const from = location.state?.from?.pathname || '/dashboard'.\nnavigate(from, { replace: true }) after success.\nOpen redirect se bachne ke liye internal paths validate karo.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function LoginRedirectPage() {\n  const navigate = useNavigate();\n  const location = useLocation();\n  const { login } = useAuth();\n\n  async function onSuccess(profile, token) {\n    login(profile, token);\n    const from = location.state?.from?.pathname ?? \"/dashboard\";\n    const safe = from.startsWith(\"/\") && !from.startsWith(\"//\") ? from : \"/dashboard\";\n    navigate(safe, { replace: true });\n  }\n\n  return (\n    <button type=\"button\" onClick={() => onSuccess({ email: \"a@a.com\", role: \"user\" }, \"t\")}>\n      Login & return\n    </button>\n  );\n}"
          },
          {
            "title": "Q10: Secure httpOnly cookies — comment note",
            "explain": "Kya karna hai:\nProd token strategy explain karo bina full backend.\n\nSeedha matlab:\nSet-Cookie: refresh=...; HttpOnly; Secure; SameSite=Strict.\nBrowser auto sends cookie — JS document.cookie se read NAHI.\nXSS se refresh chori mushkil (access short-lived memory me).\nCSRF: SameSite + anti-CSRF token POST pe. SPA + separate API domain = careful CORS.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const httpOnlyNote =\n  \"HttpOnly cookies hide refresh token from JS — preferred over localStorage for long-lived secrets.\";"
          },
          {
            "title": "Q11: XSS token theft note",
            "explain": "Kya karna hai:\nKyun localStorage risky — interview security angle.\n\nSeedha matlab:\nAttacker injected script: localStorage.getItem('access_token') → exfiltrate.\nAny innerHTML/dangerouslySetInnerHTML/eval/third-party script risk.\nMitigate: CSP, sanitize, httpOnly refresh, short access TTL, rotate.\nAuth token kabhi URL query me mat rakho (logs/referrer leak).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const xssNote =\n  \"XSS + localStorage token = full account takeover until expiry; prefer HttpOnly refresh + CSP.\";"
          },
          {
            "title": "Q12: useForm basics",
            "explain": "Kya karna hai:\nForm instance banao — register, handleSubmit, formState.\n\nSeedha matlab:\nconst { register, handleSubmit, formState } = useForm({ defaultValues }).\nUncontrolled-by-default — refs se DOM read; kam re-renders vs pure controlled.\nmode: 'onBlur' | 'onChange' validation timing.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function SimpleRhfForm() {\n  const {\n    register,\n    handleSubmit,\n    formState: { errors, isSubmitting },\n  } = useForm({\n    defaultValues: { title: \"\" },\n  });\n\n  async function onSubmit(data) {\n    await new Promise((r) => setTimeout(r, 300));\n    console.log(data);\n  }\n\n  return (\n    <form onSubmit={handleSubmit(onSubmit)}>\n      <input {...register(\"title\", { required: \"Title required\" })} />\n      {errors.title && <span>{errors.title.message}</span>}\n      <button disabled={isSubmitting}>{isSubmitting ? \"Saving…\" : \"Save\"}</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q13: register — wiring native inputs",
            "explain": "Kya karna hai:\nspread register('fieldName', rules) on input/select/textarea.\n\nSeedha matlab:\nregister returns { name, ref, onChange, onBlur }. name attribute auto.\nValidation rules inline ya resolver se. defaultValues match field names.\nCheckbox: register('agree') — value boolean via RHF v7 patterns.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function RegisterDemo() {\n  const { register, handleSubmit } = useForm({\n    defaultValues: { email: \"\", agree: false },\n  });\n  return (\n    <form onSubmit={handleSubmit(console.log)}>\n      <input {...register(\"email\", { required: true })} type=\"email\" />\n      <label>\n        <input type=\"checkbox\" {...register(\"agree\")} /> I agree\n      </label>\n      <button type=\"submit\">Go</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q14: handleSubmit — valid data callback",
            "explain": "Kya karna hai:\nInvalid pe callback nahi; valid pe async OK.\n\nSeedha matlab:\nhandleSubmit(onValid, onInvalid). preventDefault automatic.\nAsync submit errors khud catch — isSubmitting reset RHF karta hai.\ne.preventDefault manually mat — handleSubmit wrap karo.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function HandleSubmitDemo() {\n  const { register, handleSubmit } = useForm();\n\n  function onValid(data) {\n    console.log(\"valid\", data);\n  }\n  function onInvalid(errs) {\n    console.log(\"invalid\", errs);\n  }\n\n  return (\n    <form onSubmit={handleSubmit(onValid, onInvalid)}>\n      <input {...register(\"name\", { required: \"Name needed\" })} />\n      <button type=\"submit\">Submit</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q15: formState — errors, isSubmitting, isDirty, touchedFields",
            "explain": "Kya karna hai:\nDestructure formState for UI feedback.\n\nSeedha matlab:\nerrors.field?.message — show under input.\nisSubmitting — disable button during async submit.\nisDirty — unsaved changes warning. touchedFields — blur ke baad errors dikhao.\nProxy: formState subscribe — destructuring recommended fields explicitly.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function FormStateDemo() {\n  const {\n    register,\n    handleSubmit,\n    formState: { errors, isSubmitting, isDirty },\n  } = useForm({ defaultValues: { bio: \"\" } });\n\n  return (\n    <form onSubmit={handleSubmit(async () => {})}>\n      <textarea {...register(\"bio\", { minLength: { value: 10, message: \"Min 10\" } })} />\n      {errors.bio && <em>{errors.bio.message}</em>}\n      <button disabled={isSubmitting || !isDirty}>\n        {isSubmitting ? \"Posting…\" : \"Post\"}\n      </button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q16: Controller — controlled / third-party UI (MUI, react-select)",
            "explain": "Kya karna hai:\nNon-native input ko RHF se connect karo.\n\nSeedha matlab:\n<Controller name=\"color\" control={control} render={({ field }) => (\n  <Select {...field} options={...} />\n)} />.\nfield = { value, onChange, onBlur, ref, name }. Custom components need value/onChange.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function ControllerDemo() {\n  const { control, handleSubmit } = useForm({ defaultValues: { mood: \"happy\" } });\n\n  return (\n    <form onSubmit={handleSubmit(console.log)}>\n      <Controller\n        name=\"mood\"\n        control={control}\n        rules={{ required: \"Pick mood\" }}\n        render={({ field, fieldState }) => (\n          <div>\n            <select {...field}>\n              <option value=\"happy\">Happy</option>\n              <option value=\"sad\">Sad</option>\n            </select>\n            {fieldState.error && <span>{fieldState.error.message}</span>}\n          </div>\n        )}\n      />\n      <button type=\"submit\">OK</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q17: reset — clear or preload form",
            "explain": "Kya karna hai:\nSuccessful submit ke baad ya edit cancel pe reset().\n\nSeedha matlab:\nreset() — defaultValues pe wapas. reset({ email: 'x@y.com' }) — new defaults.\nkeepDirtyValues option. Edit form: fetch user → reset(fetched).\nkey={user.id} remount alternative heavy forms me.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function ResetDemo() {\n  const { register, handleSubmit, reset } = useForm({\n    defaultValues: { note: \"\" },\n  });\n\n  async function onSubmit(data) {\n    await fakeSave(data);\n    reset(); // back to empty\n  }\n\n  return (\n    <form onSubmit={handleSubmit(onSubmit)}>\n      <input {...register(\"note\")} />\n      <button type=\"submit\">Save</button>\n      <button type=\"button\" onClick={() => reset({ note: \"draft restored\" })}>\n        Load draft\n      </button>\n    </form>\n  );\n}\n\nasync function fakeSave() {\n  return true;\n}"
          },
          {
            "title": "Q18: setError — manual / server field errors",
            "explain": "Kya karna hai:\nAPI 400 pe specific field pe error set karo.\n\nSeedha matlab:\nsetError('email', { type: 'server', message: 'Already taken' }).\nroot/server level: setError('root', { message: 'Login failed' }).\nclearErrors('email') before retry. shouldFocus: true option.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function SetErrorDemo() {\n  const { register, handleSubmit, setError, formState: { errors } } = useForm();\n\n  async function onSubmit(data) {\n    const res = await fakeCheckEmail(data.email);\n    if (res.taken) {\n      setError(\"email\", { type: \"server\", message: \"Email already registered\" });\n      return;\n    }\n  }\n\n  return (\n    <form onSubmit={handleSubmit(onSubmit)}>\n      <input {...register(\"email\")} />\n      {errors.email && <p>{errors.email.message}</p>}\n      {errors.root && <p>{errors.root.message}</p>}\n      <button type=\"submit\">Check</button>\n    </form>\n  );\n}\n\nasync function fakeCheckEmail(email) {\n  return { taken: email === \"taken@test.com\" };\n}"
          },
          {
            "title": "Q19: watch — reactive field values",
            "explain": "Kya karna hai:\nEk field doosri pe depend — live preview / conditional fields.\n\nSeedha matlab:\nconst role = watch('role'). watch() — poora form (careful perf).\nuseWatch({ name: 'role' }) finer subscription. subscription less re-render than watch all.\npassword confirm: watch('password') compare in validate function.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function WatchDemo() {\n  const { register, watch } = useForm({ defaultValues: { plan: \"free\", company: \"\" } });\n  const plan = watch(\"plan\");\n\n  return (\n    <form>\n      <select {...register(\"plan\")}>\n        <option value=\"free\">Free</option>\n        <option value=\"pro\">Pro</option>\n      </select>\n      {plan === \"pro\" && <input {...register(\"company\", { required: true })} placeholder=\"Company\" />}\n    </form>\n  );\n}"
          },
          {
            "title": "Q20: useFieldArray — dynamic list fields",
            "explain": "Kya karna hai:\nAppend/remove rows (phones, line items).\n\nSeedha matlab:\nconst { fields, append, remove } = useFieldArray({ control, name: 'phones' }).\nmap fields with key={field.id} — NOT index. register(`phones.${index}.number`).\ndefaultValues: { phones: [{ number: '' }] }.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const phonesSchema = z.object({\n  phones: z.array(z.object({ number: z.string().min(8) })).min(1),\n});\n\nexport function FieldArrayDemo() {\n  const { register, control, handleSubmit } = useForm({\n    defaultValues: { phones: [{ number: \"\" }] },\n    resolver: zodResolver(phonesSchema),\n  });\n  const { fields, append, remove } = useFieldArray({ control, name: \"phones\" });\n\n  return (\n    <form onSubmit={handleSubmit(console.log)}>\n      {fields.map((field, index) => (\n        <div key={field.id}>\n          <input {...register(`phones.${index}.number`)} placeholder=\"Phone\" />\n          <button type=\"button\" onClick={() => remove(index)}>×</button>\n        </div>\n      ))}\n      <button type=\"button\" onClick={() => append({ number: \"\" })}>Add phone</button>\n      <button type=\"submit\">Save</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q21: Zod — z.object schema",
            "explain": "Kya karna hai:\nFields + messages define; parse/safeParse.\n\nSeedha matlab:\nz.object({ email: z.string().email(), age: z.coerce.number().min(18) }).\nsafeParse returns { success, data | error }. error.flatten() field errors.\nReusable schemas share client/server (tRPC, API validation).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export const loginSchema = z.object({\n  email: z.string().email(\"Valid email chahiye\"),\n  password: z.string().min(8, \"Min 8 characters\"),\n});"
          },
          {
            "title": "Q22: refine / superRefine — cross-field rules",
            "explain": "Kya karna hai:\nPassword === confirm; custom business rules.\n\nSeedha matlab:\n.refine(data => data.password === data.confirm, { message, path: ['confirm'] }).\nsuperRefine — multiple issues, ctx.addIssue. Complex validation ke liye.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export const signupSchema = z\n  .object({\n    password: z.string().min(8),\n    confirm: z.string(),\n  })\n  .refine((d) => d.password === d.confirm, {\n    message: \"Passwords match nahi\",\n    path: [\"confirm\"],\n  });"
          },
          {
            "title": "Q23: z.infer — TypeScript type from schema",
            "explain": "Kya karna hai:\nSchema se form data type nikalo (comments me TS).\n\nSeedha matlab:\ntype LoginInput = z.infer<typeof loginSchema>;\n// { email: string; password: string }\nJSX file me JSDoc: @typedef {z.infer<typeof loginSchema>} LoginInput\nSingle source of truth — schema change → type follows in TS projects.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "/** @typedef {z.infer<typeof loginSchema>} LoginInput */"
          },
          {
            "title": "Q24: zodResolver — RHF + Zod bridge",
            "explain": "Kya karna hai:\nuseForm({ resolver: zodResolver(schema) }) — errors auto map.\n\nSeedha matlab:\nClient validation Zod se; RHF errors object populate.\nmode 'onChange' + zod = live Zod messages.\nMultiple schemas: discriminatedUnion for form variants.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function ZodResolverDemo() {\n  const {\n    register,\n    handleSubmit,\n    formState: { errors },\n  } = useForm({\n    resolver: zodResolver(loginSchema),\n    defaultValues: { email: \"\", password: \"\" },\n  });\n\n  return (\n    <form onSubmit={handleSubmit(console.log)}>\n      <input {...register(\"email\")} />\n      {errors.email && <span>{errors.email.message}</span>}\n      <input type=\"password\" {...register(\"password\")} />\n      {errors.password && <span>{errors.password.message}</span>}\n      <button type=\"submit\">Login</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q25: Combined login — RHF + Zod + Auth submit",
            "explain": "Kya karna hai:\nFull login form → API → AuthContext login → navigate.\n\nSeedha matlab:\nhandleSubmit async → fakeLoginApi → login(user, token) → navigate(from).\nisSubmitting disable button. root error invalid credentials.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function LoginFormFull() {\n  const { login } = useAuth();\n  const navigate = useNavigate();\n  const location = useLocation();\n\n  const {\n    register,\n    handleSubmit,\n    setError,\n    formState: { errors, isSubmitting },\n  } = useForm({\n    resolver: zodResolver(loginSchema),\n    defaultValues: { email: \"\", password: \"\" },\n  });\n\n  async function onSubmit(data) {\n    try {\n      const { token, user } = await fakeLoginApi(data.email, data.password);\n      login(user, token);\n      const from = location.state?.from?.pathname ?? \"/dashboard\";\n      navigate(from, { replace: true });\n    } catch {\n      setError(\"root\", { message: \"Invalid email or password\" });\n    }\n  }\n\n  return (\n    <form onSubmit={handleSubmit(onSubmit)}>\n      <input {...register(\"email\")} autoComplete=\"email\" />\n      {errors.email && <p>{errors.email.message}</p>}\n      <input type=\"password\" {...register(\"password\")} autoComplete=\"current-password\" />\n      {errors.password && <p>{errors.password.message}</p>}\n      {errors.root && <p role=\"alert\">{errors.root.message}</p>}\n      <button disabled={isSubmitting}>{isSubmitting ? \"Signing in…\" : \"Sign in\"}</button>\n    </form>\n  );\n}"
          },
          {
            "title": "Q26: Server errors mapped to fields (400 validation payload)",
            "explain": "Kya karna hai:\nAPI fieldErrors object → loop setError.\n\nSeedha matlab:\nResponse { errors: { email: 'Taken', username: 'Too short' } }.\nObject.entries(map).forEach(([field, message]) => setError(field, { type: 'server', message })).\nNon-field errors → root. Zod client pehle; server authoritative duplicate email etc.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function mapServerErrors(setError, payload) {\n  if (payload.errors) {\n    Object.entries(payload.errors).forEach(([field, message]) => {\n      setError(field, { type: \"server\", message: String(message) });\n    });\n  }\n  if (payload.message) {\n    setError(\"root\", { message: payload.message });\n  }\n}\n\nexport function ServerErrorsForm() {\n  const { register, handleSubmit, setError, formState: { errors } } = useForm({\n    resolver: zodResolver(z.object({ username: z.string().min(3) })),\n  });\n\n  async function onSubmit(data) {\n    const res = await fakeRegisterApi(data);\n    if (!res.ok) {\n      mapServerErrors(setError, res.body);\n    }\n  }\n\n  return (\n    <form onSubmit={handleSubmit(onSubmit)}>\n      <input {...register(\"username\")} />\n      {errors.username && <span>{errors.username.message}</span>}\n      {errors.root && <span>{errors.root.message}</span>}\n      <button type=\"submit\">Register</button>\n    </form>\n  );\n}\n\nasync function fakeRegisterApi(data) {\n  if (data.username === \"taken\") {\n    return { ok: false, body: { errors: { username: \"Username taken\" } } };\n  }\n  return { ok: true };\n}"
          }
        ]
      },
      {
        "file": "47_Zustand.jsx",
        "title": "47 — Zustand",
        "kya": "Zustand = chhota global store. create() se banana; component me",
        "detail": "47 — Zustand (State Management)\nLevel: MID  |  Sequence: pehle 11 (context), 12 (reducer), phir yeh\n\nLAYMAN: Zustand = chhota global store. create() se banana; component me\nuseStore(selector) se slice subscribe. Redux se kam boilerplate; Context se\nbetter perf jab fine-grained selectors ho. Client-only — React 19 me bhi.\n\nKYUN: Cart, UI prefs, auth snapshot — prop drilling / giant context avoid.\nINTERVIEW: selector stale traps; store component ke andar mat banao;\nvs Redux vs Context; persist + SSR hydrate caution.\nVite/React 19 project me use — teaching file (npm i zustand).",
        "intro": "47 — Zustand (State Management)\nLevel: MID  |  Sequence: pehle 11 (context), 12 (reducer), phir yeh\n\nLAYMAN: Zustand = chhota global store. create() se banana; component me\nuseStore(selector) se slice subscribe. Redux se kam boilerplate; Context se\nbetter perf jab fine-grained selectors ho. Client-only — React 19 me bhi.\n\nKYUN: Cart, UI prefs, auth snapshot — prop drilling / giant context avoid.\nINTERVIEW: selector stale traps; store component ke andar mat banao;\nvs Redux vs Context; persist + SSR hydrate caution.\nVite/React 19 project me use — teaching file (npm i zustand).",
        "questions": [
          {
            "title": "Q1: create store — minimal counter",
            "explain": "Kya karna hai:\ncreate((set) => ({ count, inc })) pattern.\n\nSeedha matlab:\nStore = hook + vanilla API. set(partial) ya set(fn) immer-style merge nahi —\nshallow merge top-level keys. get() current state read actions me.\nComponent: const count = useCounterStore(s => s.count).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export const useCounterStore = create((set) => ({\n  count: 0,\n  inc: () => set((s) => ({ count: s.count + 1 })),\n  dec: () => set((s) => ({ count: s.count - 1 })),\n}));\n\nexport function CounterView() {\n  const count = useCounterStore((s) => s.count);\n  const inc = useCounterStore((s) => s.inc);\n  return (\n    <button onClick={inc}>{count}</button>\n  );\n}"
          },
          {
            "title": "Q2: useStore selectors — sirf jo chahiye subscribe",
            "explain": "Kya karna hai:\n(s) => s.user.name — name change pe hi render (roughly).\n\nSeedha matlab:\nPoora store useStore() bina selector = har change pe re-render.\nSelector return value Object.is se compare — primitive best.\nDerived: (s) => s.items.length — length change pe render.\nMultiple fields: shallow compare (Q14) ya alag hooks.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export const useCartStore = create((set) => ({\n  items: [],\n  add: (item) => set((s) => ({ items: [...s.items, item] })),\n  total: () => 0, // bad as selector — function new each time; use getter Q17\n}));\n\nexport function CartBadge() {\n  const itemCount = useCartStore((s) => s.items.length);\n  return <span>{itemCount} items</span>;\n}"
          },
          {
            "title": "Q3: Avoid stale whole-store subscribe",
            "explain": "Kya karna hai:\nconst store = useStore() anti-pattern — har update pe render.\n\nSeedha matlab:\n❌ const { a, b } = useMyStore() — default selector = identity = full state.\n✅ const a = useMyStore(s => s.a).\nDebug: React DevTools + console.log render count.\nSplit components: CountDisplay vs Buttons alag selectors.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function BadWholeStore() {\n  // ❌ re-renders on ANY key change\n  const state = useCartStore();\n  return <span>{state.items.length}</span>;\n}\n\nexport function GoodSelector() {\n  const len = useCartStore((s) => s.items.length);\n  return <span>{len}</span>;\n}"
          },
          {
            "title": "Q4: set / get inside actions",
            "explain": "Kya karna hai:\ncreate((set, get) => ({ ... })) — get() se current state read.\n\nSeedha matlab:\nset({ partial }) merges shallow. set(fn) fn receives previous state.\nget().count — action me latest without closure stale (usually).\nreplace: true rare — poora state replace (persist rehydrate).\nOutside React: useCounterStore.getState().inc().",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export const useTodoStore = create((set, get) => ({\n  todos: [],\n  addTodo: (text) =>\n    set({ todos: [...get().todos, { id: crypto.randomUUID(), text, done: false }] }),\n  toggle: (id) =>\n    set({\n      todos: get().todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),\n    }),\n  clearDone: () => set({ todos: get().todos.filter((t) => !t.done) }),\n}));"
          },
          {
            "title": "Q5: Async actions in store",
            "explain": "Kya karna hai:\nfetch inside action; loading/error state store me.\n\nSeedha matlab:\nasync loadUsers() { set({ loading: true }); try { ... set({ users }) } finally { set({ loading: false }) } }.\nComponent sirf selectors — no useEffect fetch duplicate.\nRace: request id / abortController store me cancel previous.\nDon't forget error branch — set({ error: message }).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export const useUsersStore = create((set) => ({\n  users: [],\n  loading: false,\n  error: null,\n  loadUsers: async () => {\n    set({ loading: true, error: null });\n    try {\n      const res = await fetch(\"/api/users\");\n      if (!res.ok) throw new Error(\"Failed\");\n      const users = await res.json();\n      set({ users, loading: false });\n    } catch (e) {\n      set({ error: e.message, loading: false });\n    }\n  },\n}));\n\nexport function UserList() {\n  const users = useUsersStore((s) => s.users);\n  const loading = useUsersStore((s) => s.loading);\n  const load = useUsersStore((s) => s.loadUsers);\n  // useEffect(() => { load(); }, [load]); — stable action ref usually OK\n  if (loading) return <p>Loading…</p>;\n  return (\n    <ul>\n      {users.map((u) => (\n        <li key={u.id}>{u.name}</li>\n      ))}\n      <button onClick={load}>Reload</button>\n    </ul>\n  );\n}"
          },
          {
            "title": "Q6: Immer middleware — optional sketch",
            "explain": "Kya karna hai:\nNested mutate-style updates without spread hell.\n\nSeedha matlab:\nnpm i immer. create(immer((set) => ({ ... }))).\nset(state => { state.user.name = 'x' }) — immer draft mutate.\nTeaching file: comment-only full import:\nimport { immer } from 'zustand/middleware/immer'\ncreate(immer((set) => ({ nested: { x: 1 }, bump: () => set(s => { s.nested.x++ }) })))\nOptional — small flat state me spread kaafi.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const immerSketch =\n  \"create(immer(set => ({ ... }))) allows draft mutations; good for deep nested state.\";"
          },
          {
            "title": "Q7: persist middleware — localStorage survive refresh",
            "explain": "Kya karna hai:\nTheme/cart persist; partialize sensitive fields out.\n\nSeedha matlab:\nimport { persist } from 'zustand/middleware'\ncreate(persist((set)=>({ theme, setTheme }), { name: 'ui-storage', partialize: s => ({ theme: s.theme }) }))\nonRehydrateStorage callback — SSR mismatch handle (Q21).\nversion + migrate for schema changes.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export const useUiStore = create(\n  // persist wrapper — uncomment when zustand/middleware available:\n  // persist(\n  (set) => ({\n    sidebarOpen: true,\n    toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),\n  })\n  // , { name: \"ui-persist\" })\n);\n\n// Full persist example (comment reference):\n// export const useThemeStore = create(persist(\n//   (set) => ({ theme: 'light', setTheme: (t) => set({ theme: t }) }),\n//   { name: 'theme-v1' }\n// ));"
          },
          {
            "title": "Q8: Combine slices pattern — scale big stores",
            "explain": "Kya karna hai:\ncreateBearSlice + createFishSlice → create(persist(...combine)).\n\nSeedha matlab:\nconst createBearSlice = (set, get) => ({ bears: 0, eatFish: () => ... })\nexport const useBoundStore = create((...a) => ({ ...createBearSlice(...a), ...createFishSlice(...a) }))\nSlices team-wise split. TypeScript: SliceBear & SliceFish intersection.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const createBearSlice = (set, get) => ({\n  bears: 0,\n  addBear: () => set({ bears: get().bears + 1 }),\n});\n\nconst createFishSlice = (set, get) => ({\n  fishes: 0,\n  addFish: () => set({ fishes: get().fishes + 1 }),\n});\n\nexport const useBoundStore = create((set, get, api) => ({\n  ...createBearSlice(set, get, api),\n  ...createFishSlice(set, get, api),\n}));"
          },
          {
            "title": "Q9: TypeScript / JSDoc typing sketch",
            "explain": "Kya karna hai:\nJSX file me types comments se document karo.\n\nSeedha matlab:\nTS: type Store = { count: number; inc: () => void }\ncreate<Store>()((set) => ({ ... }))\nJSDoc: @typedef {{ count: number, inc: function(): void }} CounterStore\nSelector typed: useStore(s: CounterStore => s.count)",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "/**\n * @typedef {{ id: string, text: string, done: boolean }} Todo\n * @typedef {{ todos: Todo[], addTodo: function(string): void }} TodoStore\n */"
          },
          {
            "title": "Q10: Zustand vs Context + useReducer",
            "explain": "Kya karna hai:\nKab context enough; kab Zustand.\n\nSeedha matlab:\nContext: theme, locale, rare updates — simple, built-in.\nContext pain: frequent updates + many consumers = wide re-renders.\nuseReducer + context = Zustand jaisa dispatch pattern but same perf issue.\nZustand: fine selectors, less Provider nesting, devtools/persist ecosystem.\nSmall app / low churn → context OK. Growing client state → Zustand.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const vsContext =\n  \"Context broadcasts value changes to all consumers; Zustand selectors limit subscriptions.\";"
          },
          {
            "title": "Q11: Zustand vs Redux",
            "explain": "Kya karna hai:\nInterview compare — not always Redux better.\n\nSeedha matlab:\nRedux: strict flux, middleware ecosystem, large teams, RTK Query, time-travel.\nZustand: minimal API, less boilerplate, mutable-friendly actions, quick start.\nBoth client global state. Redux Toolkit ne gap kam kiya.\nEnterprise existing Redux → stay. Greenfield mid SPA → Zustand popular.\nServer state (React Query) alag — dono ke saath pair karo.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const vsRedux =\n  \"Redux = conventions + devtools depth at scale; Zustand = speed/simplicity for moderate global client state.\";"
          },
          {
            "title": "Q12: When NOT to use Zustand",
            "explain": "Kya karna hai:\nOver-engineering avoid — decision list.\n\nSeedha matlab:\n✗ Local UI state (modal open) — useState.\n✗ Server cache — TanStack Query / SWR.\n✗ Form fields — RHF local (file 46).\n✗ Rarely read config — context/props.\n✗ You need complex event sourcing audit — Redux maybe.\nGlobal ≠ always store — colocate first (file 24).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export const whenNotZustand = [\n  \"component-local UI\",\n  \"server fetched data cache\",\n  \"form field state\",\n  \"one-time prop drilling 2 levels\",\n];"
          },
          {
            "title": "Q13: subscribeWithSelector — vanilla subscribe fine-grained",
            "explain": "Kya karna hai:\nReact ke bahar listener jab specific key change.\n\nSeedha matlab:\ncreate(subscribeWithSelector((set)=>({ ... }))).\nuseStore.subscribe(s => s.count, (count, prev) => { analytics(count) }).\nNon-React widgets, router guards, logging. Unsubscribe return fn call.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export const useMetricsStore = create(\n  subscribeWithSelector((set) => ({\n    pageViews: 0,\n    bump: () => set((s) => ({ pageViews: s.pageViews + 1 })),\n  }))\n);\n\n// vanilla usage sketch:\n// useMetricsStore.subscribe((s) => s.pageViews, (pv) => console.log('pv', pv));"
          },
          {
            "title": "Q14: shallow compare — multiple fields one selector",
            "explain": "Kya karna hai:\nuseStore(s => ({ a: s.a, b: s.b }), shallow) — dono same ho to skip render.\n\nSeedha matlab:\nObject return bina shallow = new object every call = always re-render.\nimport { shallow } from 'zustand/shallow'.\nAlternative: useShallow hook (zustand v4.4+) same idea.\nPrefer separate selectors jab ho sake — simpler mental model.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export const useSettingsStore = create((set) => ({\n  fontSize: 14,\n  theme: \"light\",\n  setFontSize: (n) => set({ fontSize: n }),\n  setTheme: (t) => set({ theme: t }),\n}));\n\nexport function SettingsPreview() {\n  const { fontSize, theme } = useSettingsStore(\n    (s) => ({ fontSize: s.fontSize, theme: s.theme }),\n    shallow\n  );\n  return (\n    <p style={{ fontSize }}>\n      {theme} mode\n    </p>\n  );\n}"
          },
          {
            "title": "Q15: Reset store — tests / logout clear all",
            "explain": "Kya karna hai:\nInitial state snapshot; reset() action ya getState/setState trick.\n\nSeedha matlab:\nPattern: const initial = { ... }; create((set, get) => ({ ...initial, reset: () => set(initial) })).\nLogout: reset cart + user slice. Tests: beforeEach(() => store.getState().reset()).\npersist ke saath: clearStorage() from persist API bhi.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const initialSession = { user: null, token: null };\n\nexport const useSessionStore = create((set) => ({\n  ...initialSession,\n  setSession: (user, token) => set({ user, token }),\n  reset: () => set(initialSession),\n}));"
          },
          {
            "title": "Q16: Testing store outside React",
            "explain": "Kya karna hai:\ngetState / setState direct — unit test actions.\n\nSeedha matlab:\nuseCounterStore.setState({ count: 5 });\nuseCounterStore.getState().inc();\nexpect(useCounterStore.getState().count).toBe(6);\nNo render needed — pure action tests fast.\nComponent tests: render with real store; reset in beforeEach.\nMock store: inject via props/context wrapper if isolation chahiye (advanced).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function testCounterActions() {\n  useCounterStore.setState({ count: 0 });\n  useCounterStore.getState().inc();\n  return useCounterStore.getState().count; // 1\n}"
          },
          {
            "title": "Q17: Computed getters — derived state in store",
            "explain": "Kya karna hai:\ntotalPrice selector ya get().items.reduce in action.\n\nSeedha matlab:\nDon't store derived if easily computed — selector (s) => s.items.reduce(...).\nExpensive derive: memo in selector with reselect pattern or cache in action after mutation.\n❌ total: () => get().items.length as store field function — unstable selector.\n✅ selectTotal = (s) => s.items.reduce((n, i) => n + i.qty, 0).",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export const useShopStore = create((set) => ({\n  items: [{ id: 1, qty: 2, price: 10 }],\n  addQty: (id) =>\n    set((s) => ({\n      items: s.items.map((it) => (it.id === id ? { ...it, qty: it.qty + 1 } : it)),\n    })),\n}));\n\nexport function CartTotal() {\n  const total = useShopStore((s) =>\n    s.items.reduce((sum, it) => sum + it.qty * it.price, 0)\n  );\n  return <strong>Total: ${total}</strong>;\n}"
          },
          {
            "title": "Q18: Logger middleware sketch",
            "explain": "Kya karna hai:\nDev me har set pe prev/next log.\n\nSeedha matlab:\nconst log = (config) => (set, get, api) => config(\n  (...args) => { console.log('prev', get()); set(...args); console.log('next', get()); },\n  get, api\n);\ncreate(log((set)=>({ ... }))). Official devtools middleware bhi.\nProduction me strip — NODE_ENV check.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const loggerSketch =\n  \"Wrap set in middleware to log prev/next state; use zustand devtools in dev.\";"
          },
          {
            "title": "Q19: React 19 note — Zustand still client-only",
            "explain": "Kya karna hai:\nRSC / Server Components me store use mat karo.\n\nSeedha matlab:\n'use client' boundary me components jo useStore call karein.\nServer pe create() run mat — hydration mismatch + no window.\nReact 19 Actions / useActionState server mutations alag — store sync client side after.\nStore = client global UI/session snapshot, not server data source of truth.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const react19Note =\n  \"Mark store-consuming components 'use client'; server components cannot call useStore.\";"
          },
          {
            "title": "Q20: SSR + persist hydrate caution",
            "explain": "Kya karna hai:\nlocalStorage SSR pe nahi — flash wrong theme avoid.\n\nSeedha matlab:\nFirst client render = default state; after rehydrate jump — mismatch warning.\nFix: skip persist render until hydrated flag; or cookie for SSR-readable theme.\npersist.onFinishHydration(() => set({ hydrated: true })).\nNext.js: useEffect-only persist read or dynamic ssr:false component.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export const useHydratedUiStore = create((set) => ({\n  theme: \"light\",\n  hydrated: false,\n  setHydrated: () => set({ hydrated: true }),\n}));\n\n// persist config sketch:\n// onRehydrateStorage: () => (state) => state?.setHydrated?.()"
          },
          {
            "title": "Q21: Common bug — re-creating store inside component",
            "explain": "Kya karna hai:\ncreate() sirf module level — ek baar.\n\nSeedha matlab:\n❌ function Comp() { const useStore = create(...) — N stores, state lost, memory leak.\n✅ module scope export const useStore = create(...).\nFactory per test OK: createStore() helper module me, not in render.\nContext+create rare pattern for scoped store — advanced, default avoid.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "// BAD pattern (never):\n// function Bad() {\n//   const useLocal = create(() => ({ n: 0 }));\n//   return null;\n// }"
          },
          {
            "title": "Q22: Multiple stores vs single bound store",
            "explain": "Kya karna hai:\nDomain split — cart, auth, ui alag ya slices ek me.\n\nSeedha matlab:\nMultiple stores: clear boundaries, tree-shake imports, smaller tests.\nSingle bound: one devtools view, cross-slice actions easy (logout clears all).\nTeam preference — consistency > dogma. Avoid 20 micro-stores confusion.\nRelated data (user + permissions) ek store/slice me rakho.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "const multiStoreTip =\n  \"Split by domain (auth, cart, ui); combine slices when actions cross-cut often.\";"
          },
          {
            "title": "Q23: useStore outside component — getState / subscribe",
            "explain": "Kya karna hai:\nRouter loader, axios interceptor me token read.\n\nSeedha matlab:\nuseSessionStore.getState().token — no hook rules.\nSubscribe logout event: useSessionStore.subscribe(s => s.token, tok => { if (!tok) redirect }).\nKeep side effects out of store actions jab possible — or explicit init module.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export function attachAuthHeader(config) {\n  const token = useSessionStore.getState().token;\n  if (token) {\n    config.headers = { ...config.headers, Authorization: `Bearer ${token}` };\n  }\n  return config;\n}"
          },
          {
            "title": "Q24: Performance checklist + interview recap",
            "explain": "Kya karna hai:\nBolke sunao: selectors, shallow, colocate, server state separation.\n\nSeedha matlab:\n1) Narrow selectors 2) shallow for object picks 3) don't select functions inline new\n4) async + race handling 5) persist partial 6) reset tests 7) client boundary\n8) pair with React Query for API 9) devtools profile renders 10) module-level create\nTrap: \"Zustand replaces Redux always\" — nuance. \"Store for every useState\" — no.",
            "code": ""
          },
          {
            "title": "Example / Solution",
            "explain": "Working solution — padho; Vite project me try karo.",
            "code": "export const zustandChecklist = [\n  \"module-level create once\",\n  \"narrow selectors not whole store\",\n  \"shallow for multi-field object selector\",\n  \"server data in React Query not Zustand\",\n  \"persist + SSR hydrate carefully\",\n  \"reset store on logout/tests\",\n];\n\n// -----------------------------------------------------------------------------\n// Demo app wiring — bound store usage\n// -----------------------------------------------------------------------------\nexport function ZustandDemoApp() {\n  const bears = useBoundStore((s) => s.bears);\n  const fishes = useBoundStore((s) => s.fishes);\n  const addBear = useBoundStore((s) => s.addBear);\n  const addFish = useBoundStore((s) => s.addFish);\n\n  return (\n    <div>\n      <p>Bears: {bears} Fishes: {fishes}</p>\n      <button onClick={addBear}>+ bear</button>\n      <button onClick={addFish}>+ fish</button>\n      <CounterView />\n      <CartBadge />\n    </div>\n  );\n}\n\n// -----------------------------------------------------------------------------\n// Quick revise map\n// 11 context → 12 reducer → 47 zustand | 46 auth (overlap session store)\n// Middleware: Q6 immer, Q7 persist, Q13 subscribeWithSelector, Q18 logger\n// -----------------------------------------------------------------------------"
          }
        ]
      }
    ]
  }
];
