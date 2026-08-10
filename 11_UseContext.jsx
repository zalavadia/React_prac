// ============================================================================
// 11 — useContext
// Level: MID  |  Sequence: read this file, then the next number
// ============================================================================
//
// SIMPLE: Props drilling = handing a parcel floor by floor by hand (App→A→B→C).
// Context = building intercom — theme/user goes straight to whoever needs it.
// createContext → Provider value= → useContext(MyContext) in child.
//
// Don't overuse — don't make everything global. Only "tree-wide" data: theme, auth, locale.
// New value object every render = consumers re-render (be careful with memo/split).
//
// WHY: Clean architecture; avoid 10-level props.
// INTERVIEW: when context vs props vs redux; re-render cost.
// Use in a Vite + React 19 project — teaching file.
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
// Task:
// ThemeContext, Provider "dark", child useContext.
//
// In simple words:
// Three steps: create, provide, consume. Without Provider, default is used.
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
// Task:
// state theme + setTheme in context value.
//
// In simple words:
// Value has { theme, toggle } — children can update.
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
// Task:
// Provide user + login/logout.
//
// In simple words:
// Auth is a classic context use case. Real apps also need token/secure storage.
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
// Task:
// useTheme() — throw if context is null (forgot Provider).
//
// In simple words:
// Better DX. Don't null-check in every consumer.
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
// Task:
// useMemo(() => ({ theme, toggle }), [theme]) — stable ref when theme is same.
//
// In simple words:
// Inline object is new every render → all consumers re-render. Memo helps.
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
// Task:
// CountStateCtx + CountDispatchCtx — only buttons re-render less.
//
// In simple words:
// Advanced optimize: dispatch-only users don't re-render on state change.
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
// Task:
// createContext(default) — without Provider, default is used.
//
// In simple words:
// Default useful for tests/storybook. Production often uses null + throw in hook.
// -----------------------------------------------------------------------------
const LocaleCtx = createContext("en");
function Label() {
  const locale = useContext(LocaleCtx);
  return <span>{locale}</span>;
}

// -----------------------------------------------------------------------------
// Q8: Props still better for local
//
// Task:
// Parent→child one level — use props, context is overkill.
//
// In simple words:
// Context = wide & rare change. Props = explicit & easy to debug.
// -----------------------------------------------------------------------------
function LocalBetter({ title }) {
  return <h1>{title}</h1>; // props fine — don't bring in context
}

// -----------------------------------------------------------------------------
// Q9: createContext default value trap
//
// Task:
// createContext({ theme: "light" }) — if you forget Provider, default runs.
//
// In simple words:
// Default object goes to every consumer — can look "working" but is a bug.
// Production: null default + throw in hook is safer.
// -----------------------------------------------------------------------------
const BadDefaultCtx = createContext({ count: 0, inc: () => {} });
function SilentBug() {
  const { count, inc } = useContext(BadDefaultCtx); // no Provider — default inc is noop
  return <button onClick={inc}>{count}</button>; // click does nothing
}

// -----------------------------------------------------------------------------
// Q10: Consumer (legacy) vs useContext
//
// Task:
// <ThemeContext.Consumer>{(v) => ...}</ThemeContext.Consumer> — old pattern.
//
// In simple words:
// You may hear this in interviews. Today prefer useContext — cleaner, fits hooks.
// Legacy code still shows Consumer in class components.
// -----------------------------------------------------------------------------
function LegacyConsumerDemo() {
  return (
    <ThemeContext.Consumer>
      {(theme) => <span>Legacy: {theme}</span>}
    </ThemeContext.Consumer>
  );
}

// -----------------------------------------------------------------------------
// Q11: [MID] Performance — all consumers re-render
//
// Task:
// Provider value change → every useContext subtree re-renders (without memo).
//
// In simple words:
// Context is not cheap for everything. Don't put frequent updates (mouse move).
// Split context or use selector libraries when you scale.
// -----------------------------------------------------------------------------
function HeavyCtxProvider({ children }) {
  const [tick, setTick] = useState(0);
  const value = useMemo(() => ({ tick }), [tick]); // tick changes → all consumers
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
// Task:
// React.memo child + stable context value → skip unnecessary re-render.
//
// In simple words:
// If Provider value identity is stable, memo children can be saved.
// New object every render → memo fails too.
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
// Task:
// React 19: <ThemeContext value="dark"> — .Provider optional shorthand.
//
// In simple words:
// Both valid: <Ctx.Provider value={x}> or <Ctx value={x}> (React 19+).
// Older codebases use .Provider often — know both in interviews.
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
// Task:
// 1-2 level + local data → props. Tree-wide + rare change → context.
//
// In simple words:
// Props explicit, debug easy. Context implicit, increases coupling.
// Redux/Zustand when you want global + devtools + middleware.
// -----------------------------------------------------------------------------
function ContextVsPropsNote() {
  return (
    <p>
      Props = parcel to neighbour. Context = building intercom. Redux = post office.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q15: [MID] Testing context
//
// Task:
// In test wrap: render(&lt;AuthProvider&gt;&lt;WhoAmI /&gt;&lt;/AuthProvider&gt;).
//
// In simple words:
// Create a custom render helper that wraps default providers.
// Mock Provider value={{ user: mockUser }} for isolated test.
// -----------------------------------------------------------------------------
function TestWrapper({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}
// test: render(<WhoAmI />, { wrapper: TestWrapper })

// -----------------------------------------------------------------------------
// Q16: Nested Providers
//
// Task:
// ThemeProvider inside AuthProvider — separate contexts, order doesn't matter.
//
// In simple words:
// Compose multiple contexts like Russian dolls. Each has its own value.
// Deep nesting gets messy — combine into one Provider (careful — re-render).
// -----------------------------------------------------------------------------
function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
}

// -----------------------------------------------------------------------------
// Q17: Context value function stability
//
// Task:
// Inline arrow toggle is new every render → value unstable without memo.
//
// In simple words:
// useCallback toggle + useMemo value = stable bundle.
// Consumers update only on theme change — toggle ref stays same.
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
// Task:
// createContext(null) + optional chaining vs throw in custom hook.
//
// In simple words:
// null default = easy to detect "Provider missing".
// useTheme() throw = fail fast, better DX in dev.
// -----------------------------------------------------------------------------
function OptionalTheme() {
  const ctx = useContext(ThemeCtx);
  if (!ctx) return <p>No theme provider</p>;
  return <span>{ctx.theme}</span>;
}

// -----------------------------------------------------------------------------
// Q19: [MID] Selective re-render with split + memo
//
// Task:
// CountDisplay only CountState; IncBtn only CountDispatch.
//
// In simple words:
// Split contexts = built-in selector pattern. Button doesn't re-render on count change.
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
// Task:
// Provider value={{ state, dispatch }} — light Redux (see 12).
//
// In simple words:
// Complex global state: reducer + context = scalable mid-size pattern.
// dispatch is stable — split and keep state in a separate context.
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
// Task:
// Child only takes dispatch/setter — don't mutate state directly.
//
// In simple words:
// Pass setTheme in context, don't overwrite theme directly.
// Immutable updates — React re-render triggers properly.
// -----------------------------------------------------------------------------
function DeepToggle() {
  const { toggle } = useTheme();
  return <button onClick={toggle}>Deep toggle</button>;
}

// -----------------------------------------------------------------------------
// Q22: [MID] Anti-pattern — context for everything
//
// Task:
// Don't put form field state in global context — local/colocate is better.
//
// In simple words:
// Context overuse = hidden deps, hard debug, extra re-renders.
// Only genuinely shared / tree-wide data. Rest use props or colocated state.
// -----------------------------------------------------------------------------
function ContextAntiPatternNote() {
  return <p>Every input value in context = pain. Think local state first.</p>;
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
