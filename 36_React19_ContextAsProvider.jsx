// ============================================================================
// 36 — React 19 Context as Provider
// Level: REACT19  |  Study in order: read this file first, then the next number
// ============================================================================
//
// SIMPLE: Before, you always wrote:
//   <ThemeContext.Provider value={...}>...</ThemeContext.Provider>
//
// React 19: The Context object itself acts as the provider:
//   <ThemeContext value={...}>...</ThemeContext>
//
// .Provider is still supported (compat). The new style is shorter and cleaner.
//
// Think of Context as a branded box; before you had to stick on a separate "Provider" label;
// now the box can sit on the shelf by itself.
//
// WHY: Small DX change; signals in interviews that you have seen React 19 notes.
// INTERVIEW: value identity re-render; split contexts; use(context).
//
// ============================================================================

import { createContext, useContext, useState, use, useMemo } from "react";

const ThemeContext = createContext("light");
const AuthContext = createContext({ user: null });

// -----------------------------------------------------------------------------
// Q1: New syntax — <ThemeContext value={...}>
//
// In simple words:
// No separate Provider wrapper name — the Context itself is the JSX tag.
// Same idea for the value prop.
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
// Q2: Old .Provider — still OK
//
// In simple words:
// Libraries / old code will use .Provider.
// Understand both for migration.
// -----------------------------------------------------------------------------
export function AppLegacyProvider() {
  return (
    <ThemeContext.Provider value="light">
      <Themed />
    </ThemeContext.Provider>
  );
}

// -----------------------------------------------------------------------------
// Q3: [MID] value={{}} every render — performance trap
//
// In simple words:
// Inline object value={{ user }} creates a new reference every render —
// consumers re-render.
// Fix: stable value with useState/useMemo, or split context, or store outside.
// (React Compiler may help later — file 39 — do not blindly trust it.)
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
// In simple words:
// The inner Context value overrides the outer one.
// Theme dark outside, light inside the section.
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
// In simple words:
// File 33: use(ThemeContext) conditional allowed.
// Read API stays the same despite provider syntax change.
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
// Q6: [MID] Default value when Provider is missing
//
// In simple words:
// createContext(default) — if there is no Provider/Context wrapper,
// you get the default. Bug or intentional optional theme.
// -----------------------------------------------------------------------------
export function NoProvider() {
  // ThemeContext default "light"
  return <Themed />;
}

// -----------------------------------------------------------------------------
// Q7: Split context — state vs dispatch
//
// In simple words:
// Mid pattern: different change frequency → different contexts.
// So the button only subscribes to dispatch, not re-render on state change.
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
// In simple words:
// "In React 19 <MyContext value> = Provider; .Provider legacy-ok.
// Re-renders follow value identity; split contexts when heavy."
// -----------------------------------------------------------------------------
const line =
  "<Context value={...}> in React 19; watch referential equality of value.";

// -----------------------------------------------------------------------------
// Q9: useMemo for stable context value
//
// Task:
// const value = useMemo(() => ({ user, setUser }), [user]) — fewer re-renders.
//
// In simple words:
// Q3 trap fix — inline object is a new reference every render.
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
// Task:
// <ThemeContext value="dark"> — string primitive stable automatically.
//
// In simple words:
// No referential issue — consumers re-render when the string value changes.
// React 18 .Provider value="dark" same.
// Objects/functions need memoization; primitives are safe inline.
// Interview: "inline object bad; inline string OK".
// -----------------------------------------------------------------------------
export function PrimitiveThemeProvider({ children }) {
  return <ThemeContext value="dark">{children}</ThemeContext>;
}

// -----------------------------------------------------------------------------
// Q11: Context + use() conditional read recap
//
// Task:
// OptionalTheme Q5 — use(ThemeContext) when prop missing.
//
// In simple words:
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
// Task:
// Do not put 20 fields in one context — split by change frequency.
//
// In simple words:
// Scale the Q7 split state/dispatch pattern.
// React 18 same advice — not 19 specific.
// Mega context → any field change → all consumers re-render.
// Zustand/Redux when global complex — context for moderate tree sharing.
// -----------------------------------------------------------------------------
const avoidMegaContext =
  "Split contexts by update frequency; state vs dispatch pattern scales.";

// -----------------------------------------------------------------------------
// Q13: Default context + optional provider
//
// Task:
// createContext('light') — App section gets default theme without provider.
//
// In simple words:
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
// Task:
// Old lib docs say .Provider — you can use <Ctx value> on the same context object.
//
// In simple words:
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
// Task:
// Codemod: .Provider → direct Context tag; value prop same.
//
// In simple words:
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
// Task:
// ThemeContext.Consumer render props — old; prefer useContext/use.
//
// In simple words:
// Works in React 18/19 but verbose.
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
// Task:
// Pass context from Server Component to Client child — wrap with a Client provider.
//
// In simple words:
// Context consumer/client provider often on the 'use client' side.
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
// Task:
// Frequent global updates, large app state, time-travel debug — Redux/Zustand.
//
// In simple words:
// Context is great for moderate prop-drill fixes — not always a full data layer.
// React 18 same guidance.
// Form local state, URL state (router), query cache — often better homes.
// Context hell = too many providers nested — flatten or use an external store.
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
// Task:
// Test wrapper: <ThemeContext value="dark">{ui}</ThemeContext> — 19 syntax clean.
//
// In simple words:
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
// Task:
// Compiler auto-memo is partial — still manually fix the value={{}} trap.
//
// In simple words:
// Do not assume the compiler always fixes unstable object values.
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
// Task:
// value={{ login: () => {...}, user }} — login new ref every render.
//
// In simple words:
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
// Task:
// <Ctx value> replaces .Provider; use/useContext read; value identity perf trap same.
//
// In simple words:
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
