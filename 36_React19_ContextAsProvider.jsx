// ============================================================================
// 36 — React 19 Context as Provider
// Level: REACT19  |  Sequence seekho: pehle yeh file, phir agla number
// ============================================================================
//
// LAYMAN: Pehle hamesha:
//   <ThemeContext.Provider value={...}>...</ThemeContext.Provider>
//
// React 19: Context object KHUD provider ki tarah:
//   <ThemeContext value={...}>...</ThemeContext>
//
// .Provider ab bhi supported (compat). Naya style chhota + clean.
//
// Socho Context = dabba brand; pehle alag "Provider sticker" chipkana padta;
// ab dabba khud shelf pe baith sakta hai.
//
// KYUN: Small DX change; interviews me "seen React 19 notes?" signal.
// INTERVIEW: value identity re-render; split contexts; use(context).
//
// ============================================================================

import { createContext, useContext, useState, use, useMemo } from "react";

const ThemeContext = createContext("light");
const AuthContext = createContext({ user: null });

// -----------------------------------------------------------------------------
// Q1: Naya syntax — <ThemeContext value={...}>
//
// Seedha matlab:
// Provider wrapper alag naam se nahi — Context hi JSX tag.
// value prop same idea.
// -----------------------------------------------------------------------------
function Themed() {
  const theme = useContext(ThemeContext);
  return <span>{theme}</span>;
}

export function AppNewProviderStyle() {
  return (
    <ThemeContext value="dark">
      <Themed />
    </ThemeContext>
  );
}

// -----------------------------------------------------------------------------
// Q2: Purana .Provider — ab bhi OK
//
// Seedha matlab:
// Libraries / old code .Provider use karenge.
// Dono samajhna migration ke liye.
// -----------------------------------------------------------------------------
export function AppLegacyProvider() {
  return (
    <ThemeContext.Provider value="light">
      <Themed />
    </ThemeContext.Provider>
  );
}

// -----------------------------------------------------------------------------
// Q3: [MID] value={{}} har render — performance trap
//
// Seedha matlab:
// Inline object value={{ user }} har render naya reference —
// consumers re-render.
// Fix: useState/useMemo value stable, ya context split, ya store bahar.
// (React Compiler baad me help kar sakta — file 39 — blind trust mat.)
// -----------------------------------------------------------------------------
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  // Better: const value = useMemo(() => ({ user, setUser }), [user]);
  // Teaching shows the pitfall:
  return (
    <AuthContext value={{ user, setUser }}>
      {children}
    </AuthContext>
  );
}

// -----------------------------------------------------------------------------
// Q4: Nested providers — nearest wins
//
// Seedha matlab:
// Andar wala Context value bahar wale ko override.
// Theme dark bahar, light andar section.
// -----------------------------------------------------------------------------
export function NestedTheme() {
  return (
    <ThemeContext value="dark">
      <Themed />
      <ThemeContext value="light">
        <Themed />
      </ThemeContext>
    </ThemeContext>
  );
}

// -----------------------------------------------------------------------------
// Q5: use(Context) with new provider style
//
// Seedha matlab:
// File 33: use(ThemeContext) conditional allowed.
// Provider syntax change se read API same.
// -----------------------------------------------------------------------------
function OptionalTheme({ forced }) {
  if (forced) return <span>{forced}</span>;
  const theme = use(ThemeContext);
  return <span>{theme}</span>;
}

export function UseWithProvider() {
  return (
    <ThemeContext value="dark">
      <OptionalTheme />
      <OptionalTheme forced="system" />
    </ThemeContext>
  );
}

// -----------------------------------------------------------------------------
// Q6: [MID] Default value tab jab Provider missing
//
// Seedha matlab:
// createContext(default) — agar koi Provider/Context wrapper nahi,
// default milta. Bug ya intentional optional theme.
// -----------------------------------------------------------------------------
export function NoProvider() {
  // ThemeContext default "light"
  return <Themed />;
}

// -----------------------------------------------------------------------------
// Q7: Split context — state vs dispatch
//
// Seedha matlab:
// Mid pattern: Frequency of change alag → alag contexts.
// Taaki button sirf dispatch subscribe kare, state change pe na re-render.
// -----------------------------------------------------------------------------
const CountStateContext = createContext(0);
const CountDispatchContext = createContext(() => {});

export function SplitCountProvider({ children }) {
  const [count, setCount] = useState(0);
  return (
    <CountStateContext value={count}>
      <CountDispatchContext value={setCount}>
        {children}
      </CountDispatchContext>
    </CountStateContext>
  );
}

function CountLabel() {
  return <span>{useContext(CountStateContext)}</span>;
}
function IncButton() {
  const setCount = useContext(CountDispatchContext);
  return <button onClick={() => setCount((c) => c + 1)}>+</button>;
}

export function SplitCountApp() {
  return (
    <SplitCountProvider>
      <CountLabel />
      <IncButton />
    </SplitCountProvider>
  );
}

// -----------------------------------------------------------------------------
// Q8: [MID] Interview one-liner
//
// Seedha matlab:
// "React 19 me <MyContext value> = Provider; .Provider legacy-ok.
// Re-renders value identity se; split contexts jab heavy."
// -----------------------------------------------------------------------------
const line =
  "<Context value={...}> in React 19; watch referential equality of value.";

// -----------------------------------------------------------------------------
// Q9: useMemo for stable context value
//
// Kya karna hai:
// const value = useMemo(() => ({ user, setUser }), [user]) — re-render kam.
//
// Seedha matlab:
// Q3 trap fix — inline object har render new reference.
// React 18 same performance pattern with .Provider.
// React 19 syntax change only — performance rules unchanged.
// Compiler may help but explicit useMemo still valid.
// setUser stable from useState — include user in deps.
// -----------------------------------------------------------------------------
export function AuthProviderMemo({ children }) {
  const [user, setUser] = useState(null);
  const value = useMemo(() => ({ user, setUser }), [user]);
  return <AuthContext value={value}>{children}</AuthContext>;
}

// -----------------------------------------------------------------------------
// Q10: [MID] Provider value primitive — stable
//
// Kya karna hai:
// <ThemeContext value="dark"> — string primitive stable automatically.
//
// Seedha matlab:
// No referential issue — consumers re-render jab value string change.
// React 18 .Provider value="dark" same.
// Objects/functions need memoization; primitives safe inline.
// Interview: "inline object bad; inline string OK".
// -----------------------------------------------------------------------------
export function PrimitiveThemeProvider({ children }) {
  return <ThemeContext value="dark">{children}</ThemeContext>;
}

// -----------------------------------------------------------------------------
// Q11: Context + use() conditional read recap
//
// Kya karna hai:
// OptionalTheme Q5 — use(ThemeContext) when prop missing.
//
// Seedha matlab:
// Provider syntax 19; read API use() flexible (file 33).
// React 18 useContext unconditional only.
// Migration: provider syntax optional first; use() when needed.
// Don't conditional useContext — rules violation.
// -----------------------------------------------------------------------------
export function ConditionalReadRecap() {
  return (
    <ThemeContext value="dark">
      <OptionalTheme />
    </ThemeContext>
  );
}

// -----------------------------------------------------------------------------
// Q12: [MID] Multiple contexts — avoid mega context
//
// Kya karna hai:
// Ek context me 20 fields mat dalo — split by change frequency.
//
// Seedha matlab:
// Q7 split state/dispatch pattern scale karo.
// React 18 same advice — not 19 specific.
// Mega context → any field change → all consumers re-render.
// Zustand/Redux when global complex — context for moderate tree sharing.
// -----------------------------------------------------------------------------
const avoidMegaContext =
  "Split contexts by update frequency; state vs dispatch pattern scales.";

// -----------------------------------------------------------------------------
// Q13: Default context + optional provider
//
// Kya karna hai:
// createContext('light') — App section bina provider ke default theme.
//
// Seedha matlab:
// Intentional default vs missing provider bug — document which.
// React 18 .Provider optional same default behavior.
// Testing: render without provider assert default read.
// Production: usually explicit provider at app root anyway.
// -----------------------------------------------------------------------------
export function DefaultThemeSection() {
  return (
    <div>
      <Themed />
      <p>Uses default light when no provider wrapper</p>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q14: [ADV] Context as Provider — library compatibility
//
// Kya karna hai:
// Old lib docs .Provider — tum <Ctx value> use kar sakte ho same context object pe.
//
// Seedha matlab:
// Same createContext return supports both JSX forms in 19.
// Mixed codebase during migration normal.
// Publish libs supporting both until major bump.
// TypeScript children + value props typed on Context object.
// -----------------------------------------------------------------------------
export function LibCompatNote() {
  return (
    <ThemeContext.Provider value="light">
      <Themed />
    </ThemeContext.Provider>
  );
}

// -----------------------------------------------------------------------------
// Q15: [MID] React 18 → 19 provider syntax migration
//
// Kya karna hai:
// Codemod: .Provider → direct Context tag; value prop same.
//
// Seedha matlab:
// Zero behavior change if value identity same.
// Read hooks unchanged useContext/use.
// Snapshot tests same HTML structure.
// Optional gradual — .Provider not removed.
// Interview: "syntax sugar; perf rules unchanged".
// -----------------------------------------------------------------------------
const providerSyntaxMigration =
  "Replace <Ctx.Provider value={v}> with <Ctx value={v}> — optional gradual migration.";

// -----------------------------------------------------------------------------
// Q16: Consumer pattern legacy
//
// Kya karna hai:
// ThemeContext.Consumer render props — purana; useContext/use prefer.
//
// Seedha matlab:
// React 18/19 dono me kaam karta but verbose.
// New code: useContext or use(Context).
// Provider syntax update doesn't affect Consumer API — still legacy.
// Remove Consumers during refactors.
// -----------------------------------------------------------------------------
export function LegacyConsumerDemo() {
  return (
    <ThemeContext value="dark">
      <ThemeContext.Consumer>
        {(theme) => <span>{theme}</span>}
      </ThemeContext.Consumer>
    </ThemeContext>
  );
}

// -----------------------------------------------------------------------------
// Q17: [MID] Context + Server Components boundary
//
// Kya karna hai:
// Server Component se Client child ko context pass — Client provider wrap karo.
//
// Seedha matlab:
// Context consumer/client provider 'use client' side often.
// Server can't use useContext dynamically same as client interactive tree.
// Pattern: ClientProviders wrapper at layout root.
// React 18 CSR-only: no boundary issue.
// Serializable context value only across RSC — functions OK client-only provider.
// -----------------------------------------------------------------------------
export function RscContextNote() {
  return (
    <p>
      Wrap client subtree with Context provider; server components pass serializable props
      into client providers when needed.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q18: [ADV] When NOT Context
//
// Kya karna hai:
// Frequent global updates, large app state, time-travel debug — Redux/Zustand.
//
// Seedha matlab:
// Context great moderate prop-drill fix — not full data layer always.
// React 18 same guidance.
// Form local state, URL state (router), query cache — often better homes.
// Context hell = too many providers nested — flatten or external store.
// -----------------------------------------------------------------------------
const whenNotContext = [
  "high-frequency global updates",
  "complex middleware/devtools needs",
  "server cache (TanStack Query)",
  "URL-driven state (router search params)",
];

// -----------------------------------------------------------------------------
// Q19: [MID] Testing context providers
//
// Kya karna hai:
// Test wrapper: <ThemeContext value="dark">{ui}</ThemeContext> — 19 syntax clean.
//
// Seedha matlab:
// RTL render with provider wrapper helper.
// React 18 .Provider in tests identical value injection.
// Default context test without wrapper for optional behavior.
// Mock providers per test file — avoid global pollution.
// -----------------------------------------------------------------------------
export function TestWrapper({ children }) {
  return <ThemeContext value="test">{children}</ThemeContext>;
}

// -----------------------------------------------------------------------------
// Q20: [ADV] Compiler + context value
//
// Kya karna hai:
// Compiler auto-memo partial — value={{}} trap manually fix still.
//
// Seedha matlab:
// Don't assume compiler fixes unstable object values always.
// React 18 manual memo on value; 19 same + compiler assist possible.
// Measure re-renders React DevTools profiler.
// Split contexts beats heroic memo sometimes.
// -----------------------------------------------------------------------------
export function CompilerContextNote() {
  return <p>Compiler helps but unstable context value objects still warrant useMemo or split.</p>;
}

// -----------------------------------------------------------------------------
// Q21: [MID] Auth context common bug — new function in value
//
// Kya karna hai:
// value={{ login: () => {...}, user }} — login new ref every render.
//
// Seedha matlab:
// All consumers re-render even if user unchanged.
// Fix: useCallback login + useMemo value object.
// React 18 identical bug with .Provider.
// Split: AuthStateContext + AuthActionsContext (stable dispatch refs).
// -----------------------------------------------------------------------------
export function AuthProviderBuggy({ children }) {
  const [user, setUser] = useState(null);
  // Buggy: new login fn each render
  return (
    <AuthContext value={{ user, login: () => setUser({ name: "Ada" }) }}>
      {children}
    </AuthContext>
  );
}

// -----------------------------------------------------------------------------
// Q22: [ADV] Interview — Context React 19 summary
//
// Kya karna hai:
// <Ctx value> replaces .Provider; use/useContext read; value identity perf trap same.
//
// Seedha matlab:
// Not a state management revolution — DX + docs alignment.
// Split contexts, memoized values, primitives safe inline.
// use() conditional read paired with 19 provider syntax.
// Traps: inline objects/functions in value; mega context; missing provider confusion.
// Migration optional .Provider still works.
// -----------------------------------------------------------------------------
export const contextInterviewSummary = {
  react19Syntax: "<ThemeContext value={v}> children </ThemeContext>",
  legacySyntax: "<ThemeContext.Provider value={v}> still OK",
  performance: "stable value reference — useMemo/split contexts",
  readApi: "useContext or use(Context) — conditional only with use()",
  traps: ["inline object value", "unstable functions in value", "mega context re-renders"],
};
