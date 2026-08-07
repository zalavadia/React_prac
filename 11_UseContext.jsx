// ============================================================================
// 11 — useContext
// Level: MID  |  Sequence: pehle yeh, phir agla number
// ============================================================================
//
// LAYMAN: Props drilling = parcel har floor pe haath se dena (App→A→B→C).
// Context = building ka intercom — theme/user seedha sunne wale ko.
// createContext → Provider value= → useContext(MyContext) child me.
//
// Overuse mat karo — har cheez global mat. Sirf "tree-wide" data: theme, auth, locale.
// Value object har render naya = consumers re-render (memo/split careful).
//
// KYUN: Clean architecture; avoid 10-level props.
// INTERVIEW: when context vs props vs redux; re-render cost.
// Vite/React 19 project me use — teaching file.
//
// ============================================================================

import {
  createContext,
  memo,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useState,
} from "react";

// -----------------------------------------------------------------------------
// Q1: Create + Provider + consume
//
// Kya karna hai:
// ThemeContext, Provider "dark", child useContext.
//
// Seedha matlab:
// Teen step: create, provide, consume. Bina Provider default.
// -----------------------------------------------------------------------------
const ThemeContext = createContext("light");

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>Theme: {theme}</button>;
}

function AppTheme() {
  return (
    <ThemeContext.Provider value="dark">
      <ThemedButton />
    </ThemeContext.Provider>
  );
}

// -----------------------------------------------------------------------------
// Q2: Dynamic theme toggle
//
// Kya karna hai:
// state theme + setTheme context value me.
//
// Seedha matlab:
// Value me { theme, toggle } — children update kar sakein.
// -----------------------------------------------------------------------------
const ThemeCtx = createContext(null);

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const value = { theme, toggle: () => setTheme((t) => (t === "light" ? "dark" : "light")) };
  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
}

function ToggleBtn() {
  const { theme, toggle } = useContext(ThemeCtx);
  return <button onClick={toggle}>{theme}</button>;
}

// -----------------------------------------------------------------------------
// Q3: Auth user context sketch
//
// Kya karna hai:
// user + login/logout provide.
//
// Seedha matlab:
// Auth classic context use-case. Real app me token/secure storage bhi.
// -----------------------------------------------------------------------------
const AuthCtx = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const login = (u) => setUser(u);
  const logout = () => setUser(null);
  return (
    <AuthCtx.Provider value={{ user, login, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}

function WhoAmI() {
  const { user, logout } = useContext(AuthCtx);
  if (!user) return <p>Guest</p>;
  return (
    <p>
      {user.name} <button onClick={logout}>Logout</button>
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q4: Custom hook wrapper
//
// Kya karna hai:
// useTheme() — context null pe throw (Provider bhool gaye).
//
// Seedha matlab:
// Better DX. Har consumer me null check mat.
// -----------------------------------------------------------------------------
function useTheme() {
  const ctx = useContext(ThemeCtx);
  if (!ctx) throw new Error("useTheme needs ThemeProvider");
  return ctx;
}

function SafeToggle() {
  const { theme, toggle } = useTheme();
  return <button onClick={toggle}>{theme}</button>;
}

// -----------------------------------------------------------------------------
// Q5: [MID] Memoize context value
//
// Kya karna hai:
// useMemo(() => ({ theme, toggle }), [theme]) — stable ref jab theme same.
//
// Seedha matlab:
// Inline object har render naya → sab consumers re-render. Memo help.
// -----------------------------------------------------------------------------
function MemoThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const value = useMemo(
    () => ({
      theme,
      toggle: () => setTheme((t) => (t === "light" ? "dark" : "light")),
    }),
    [theme]
  );
  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
}

// -----------------------------------------------------------------------------
// Q6: Split contexts (state vs dispatch)
//
// Kya karna hai:
// CountStateCtx + CountDispatchCtx — sirf button wale kam re-render.
//
// Seedha matlab:
// Advanced optimize: jo sirf dispatch use kare state change pe na roye.
// -----------------------------------------------------------------------------
const CountState = createContext(0);
const CountDispatch = createContext(() => {});

function CountProvider({ children }) {
  const [n, setN] = useState(0);
  return (
    <CountState.Provider value={n}>
      <CountDispatch.Provider value={setN}>{children}</CountDispatch.Provider>
    </CountState.Provider>
  );
}

// -----------------------------------------------------------------------------
// Q7: [MID] Default value vs Provider missing
//
// Kya karna hai:
// createContext(default) — Provider na ho to default.
//
// Seedha matlab:
// Default useful tests/storybook. Production me often null + throw hook.
// -----------------------------------------------------------------------------
const LocaleCtx = createContext("en");
function Label() {
  const locale = useContext(LocaleCtx);
  return <span>{locale}</span>;
}

// -----------------------------------------------------------------------------
// Q8: Props still better for local
//
// Kya karna hai:
// Parent→child ek level — props use karo, context overkill.
//
// Seedha matlab:
// Context = wide & rare change. Props = explicit & easy debug.
// -----------------------------------------------------------------------------
function LocalBetter({ title }) {
  return <h1>{title}</h1>; // props fine — context mat lao
}

// -----------------------------------------------------------------------------
// Q9: createContext default value trap
//
// Kya karna hai:
// createContext({ theme: "light" }) — Provider bhool gaye to default chalta.
//
// Seedha matlab:
// Default object har consumer ko milta — "working" lag sakta hai par bug hai.
// Production me null default + hook me throw safer.
// -----------------------------------------------------------------------------
const BadDefaultCtx = createContext({ count: 0, inc: () => {} });
function SilentBug() {
  const { count, inc } = useContext(BadDefaultCtx); // Provider nahi — default inc noop
  return <button onClick={inc}>{count}</button>; // click pe kuch nahi hoga
}

// -----------------------------------------------------------------------------
// Q10: Consumer (legacy) vs useContext
//
// Kya karna hai:
// <ThemeContext.Consumer>{(v) => ...}</ThemeContext.Consumer> — purana pattern.
//
// Seedha matlab:
// Interview me sunoge. Aaj useContext prefer — cleaner, hooks ke saath fit.
// Class components me Consumer ab bhi dikhega legacy code me.
// -----------------------------------------------------------------------------
function LegacyConsumerDemo() {
  return (
    <ThemeContext.Consumer>
      {(theme) => <span>Legacy: {theme}</span>}
    </ThemeContext.Consumer>
  );
}

// -----------------------------------------------------------------------------
// Q11: [MID] Performance — sab consumers re-render
//
// Kya karna hai:
// Provider value change → har useContext wala subtree re-render (memo ke bina).
//
// Seedha matlab:
// Context cheap nahi hai har cheez ke liye. Frequent updates (mouse move) mat do.
// Split context ya selector libraries jab scale ho.
// -----------------------------------------------------------------------------
function HeavyCtxProvider({ children }) {
  const [tick, setTick] = useState(0);
  const value = useMemo(() => ({ tick }), [tick]); // tick badle → sab consumers
  return (
    <ThemeCtx.Provider value={value}>
      <button onClick={() => setTick((t) => t + 1)}>tick</button>
      {children}
    </ThemeCtx.Provider>
  );
}

// -----------------------------------------------------------------------------
// Q12: Memo children under Provider
//
// Kya karna hai:
// React.memo child + stable context value → unnecessary re-render skip.
//
// Seedha matlab:
// Provider value identity stable ho to memo children bach sakte hain.
// Value har render naya object → memo bhi fail.
// -----------------------------------------------------------------------------
const MemoChild = memo(function MemoChild({ label }) {
  console.log("MemoChild render");
  return <span>{label}</span>;
});

function MemoChildrenDemo() {
  const [theme, setTheme] = useState("light");
  const value = useMemo(() => ({ theme, setTheme }), [theme]);
  return (
    <ThemeCtx.Provider value={value}>
      <MemoChild label="static label" />
    </ThemeCtx.Provider>
  );
}

// -----------------------------------------------------------------------------
// Q13: React 19 Provider syntax note
//
// Kya karna hai:
// React 19 me <ThemeContext value="dark"> — .Provider optional shorthand.
//
// Seedha matlab:
// Dono valid: <Ctx.Provider value={x}> ya <Ctx value={x}> (React 19+).
// Purane codebases me .Provider common — interview me dono jaano.
// -----------------------------------------------------------------------------
function React19ProviderNote() {
  // React 19+: <ThemeContext value="dark"><ThemedButton /></ThemeContext>
  return (
    <ThemeContext.Provider value="dark">
      <ThemedButton />
    </ThemeContext.Provider>
  );
}

// -----------------------------------------------------------------------------
// Q14: Context vs props decision
//
// Kya karna hai:
// 1-2 level + local data → props. Tree-wide + rare change → context.
//
// Seedha matlab:
// Props explicit, debug easy. Context implicit, coupling badhata hai.
// Redux/Zustand jab global + devtools + middleware chahiye.
// -----------------------------------------------------------------------------
function ContextVsPropsNote() {
  return (
    <p>
      Props = neighbour ko parcel. Context = building intercom. Redux = post office.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q15: [MID] Testing context
//
// Kya karna hai:
// Test me wrap: render(&lt;AuthProvider&gt;&lt;WhoAmI /&gt;&lt;/AuthProvider&gt;).
//
// Seedha matlab:
// Custom render helper banao jo default providers wrap kare.
// Mock Provider value={{ user: mockUser }} se isolated test.
// -----------------------------------------------------------------------------
function TestWrapper({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}
// test: render(<WhoAmI />, { wrapper: TestWrapper })

// -----------------------------------------------------------------------------
// Q16: Nested Providers
//
// Kya karna hai:
// ThemeProvider ke andar AuthProvider — dono alag context, order matter nahi.
//
// Seedha matlab:
// Compose multiple contexts like Russian dolls. Har ek apna value.
// Deep nesting messy ho to ek Provider combine karo (careful — re-render).
// -----------------------------------------------------------------------------
function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
}

// -----------------------------------------------------------------------------
// Q17: Context value me function stability
//
// Kya karna hai:
// toggle inline arrow har render naya → value memo ke bina unstable.
//
// Seedha matlab:
// useCallback toggle + useMemo value = stable bundle.
// Sirf theme change pe consumers update — toggle ref same rahe.
// -----------------------------------------------------------------------------
function StableToggleProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const toggle = useCallback(
    () => setTheme((t) => (t === "light" ? "dark" : "light")),
    []
  );
  const value = useMemo(() => ({ theme, toggle }), [theme, toggle]);
  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
}

// -----------------------------------------------------------------------------
// Q18: useContext outside Provider — null check
//
// Kya karna hai:
// createContext(null) + optional chaining vs throw in custom hook.
//
// Seedha matlab:
// null default = "Provider missing" detect karna easy.
// useTheme() throw = fail fast, better DX dev me.
// -----------------------------------------------------------------------------
function OptionalTheme() {
  const ctx = useContext(ThemeCtx);
  if (!ctx) return <p>No theme provider</p>;
  return <span>{ctx.theme}</span>;
}

// -----------------------------------------------------------------------------
// Q19: [MID] Selective re-render with split + memo
//
// Kya karna hai:
// CountDisplay sirf CountState; IncBtn sirf CountDispatch.
//
// Seedha matlab:
// Split contexts = built-in selector pattern. Display count change pe button na roye.
// -----------------------------------------------------------------------------
function CountDisplay() {
  const n = useContext(CountState);
  return <span>{n}</span>;
}

function IncBtn() {
  const setN = useContext(CountDispatch);
  return <button onClick={() => setN((x) => x + 1)}>+</button>;
}

// -----------------------------------------------------------------------------
// Q20: Context + useReducer combo sketch
//
// Kya karna hai:
// Provider value={{ state, dispatch }} — light Redux (see 12).
//
// Seedha matlab:
// Complex global state: reducer + context = scalable mid-size pattern.
// dispatch stable hota hai — split karke state alag context me rakho.
// -----------------------------------------------------------------------------
const StoreCtx = createContext(null);
function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(
    (s, a) => (a.type === "inc" ? { ...s, n: s.n + 1 } : s),
    { n: 0 }
  );
  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>;
}

// -----------------------------------------------------------------------------
// Q21: Updating context from deep child
//
// Kya karna hai:
// Child sirf dispatch/setter le — state mutate direct mat.
//
// Seedha matlab:
// Context me setTheme pass karo, theme direct overwrite mat.
// Immutable updates — React re-render trigger properly.
// -----------------------------------------------------------------------------
function DeepToggle() {
  const { toggle } = useTheme();
  return <button onClick={toggle}>Deep toggle</button>;
}

// -----------------------------------------------------------------------------
// Q22: [MID] Anti-pattern — context for everything
//
// Kya karna hai:
// Form field state global context me mat rakho — local/colocate better.
//
// Seedha matlab:
// Context overuse = hidden deps, hard debug, extra re-renders.
// Sirf genuinely shared / tree-wide data. Baaki props ya colocated state.
// -----------------------------------------------------------------------------
function ContextAntiPatternNote() {
  return <p>Har input ka value context me = pain. Local state pehle socho.</p>;
}

export {
  AppTheme,
  ThemeProvider,
  ToggleBtn,
  AuthProvider,
  WhoAmI,
  useTheme,
  SafeToggle,
  MemoThemeProvider,
  CountProvider,
  Label,
  LocalBetter,
  SilentBug,
  LegacyConsumerDemo,
  HeavyCtxProvider,
  MemoChildrenDemo,
  React19ProviderNote,
  ContextVsPropsNote,
  TestWrapper,
  AppProviders,
  StableToggleProvider,
  OptionalTheme,
  CountDisplay,
  IncBtn,
  StoreProvider,
  DeepToggle,
  ContextAntiPatternNote,
};
