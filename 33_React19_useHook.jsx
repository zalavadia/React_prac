// ============================================================================
// 33 — React 19 `use` hook (promises + context)
// Level: REACT19  |  Study in order: read this file first, then the next number
// ============================================================================
//
// SIMPLE: `use` is a new hook that can read a Promise OR Context.
//
// use(promise) → Suspense fallback until the Promise resolves;
// reject → nearest Error Boundary.
// use(context) → like useContext, BUT it can also run in conditionals / loops
// (a special exception to the rules of hooks — only for `use`).
//
// Think of it this way: useState/useEffect "always top-level same order".
// `use` = "check a condition first if you want, then read context/promise".
//
// WHY: React 19 signature API; RSC + client data patterns.
// INTERVIEW: conditional use OK?; use vs useContext; Suspense pairing.
//
// ============================================================================

import { use, Suspense, createContext, useState } from "react";

// -----------------------------------------------------------------------------
// Q1: use(promise) + Suspense
//
// In simple words:
// In component render use(promise) — unwrap value.
// Parent Suspense boundary required otherwise error/hang feel.
// Keep promise identity stable (module cache / state) — new Promise every render = loop risk.
// -----------------------------------------------------------------------------
const cache = new Map();

function fetchUser(id) {
  const key = String(id);
  if (!cache.has(key)) {
    cache.set(
      key,
      new Promise((resolve) => {
        setTimeout(() => resolve({ id, name: "Ada " + id }), 500);
      })
    );
  }
  return cache.get(key);
}

function User({ id }) {
  const user = use(fetchUser(id));
  return <p>{user.name}</p>;
}

export function UserPage() {
  return (
    <Suspense fallback={<p>Loading user...</p>}>
      <User id={1} />
    </Suspense>
  );
}

// -----------------------------------------------------------------------------
// Q2: [MID] New Promise every render = bug
//
// In simple words:
// use(fetch()) directly in render without cache → infinite suspend.
// Fix: cache, lift promise, or framework loader (RSC fetch dedupe).
// -----------------------------------------------------------------------------
function BadUser() {
  // ❌ const user = use(fetch('/api')); // new promise every render
  return null;
}

// -----------------------------------------------------------------------------
// Q3: use(context) basic
//
// In simple words:
// createContext + Provider; child uses use(ThemeContext).
// useContext(ThemeContext) same value — use is more flexible in placement.
// -----------------------------------------------------------------------------
const ThemeContext = createContext("light");

function ThemedBox() {
  const theme = use(ThemeContext);
  return <div data-theme={theme}>Theme: {theme}</div>;
}

export function ThemeApp() {
  return (
    <ThemeContext value="dark">
      <ThemedBox />
    </ThemeContext>
  );
}

// -----------------------------------------------------------------------------
// Q4: [MID] Conditional use(context) — allowed
//
// In simple words:
// Normal hooks: useState inside if ❌
// use(context): inside if ✅ (React 19 design)
// Why useful: optional context read when prop is missing.
// -----------------------------------------------------------------------------
const LabelContext = createContext(null);

function Button({ label: labelProp }) {
  let label = labelProp;
  if (label == null) {
    label = use(LabelContext);
  }
  return <button>{label ?? "OK"}</button>;
}

export function ConditionalUseDemo() {
  return (
    <LabelContext value="From context">
      <Button />
      <Button label="Prop wins" />
    </LabelContext>
  );
}

// -----------------------------------------------------------------------------
// Q5: use(promise) conditional — carefully
//
// In simple words:
// Call use(promise) only when condition is true.
// Do not call on false branch — otherwise unnecessary Suspense.
// Rules: still don't call after early return inconsistently across renders
// in a way that breaks other hooks' order — other hooks still top-level!
// -----------------------------------------------------------------------------
function MaybeUser({ id, enabled }) {
  // other hooks FIRST, always:
  const [extra, setExtra] = useState("");
  if (!enabled) {
    return <p>Disabled {extra}</p>;
  }
  const user = use(fetchUser(id));
  return (
    <p onClick={() => setExtra("x")}>
      {user.name}
    </p>
  );
}

export function MaybeUserGate() {
  return (
    <Suspense fallback={<p>...</p>}>
      <MaybeUser id={2} enabled />
    </Suspense>
  );
}

// -----------------------------------------------------------------------------
// Q6: Error — rejected promise
//
// In simple words:
// use(rejectedPromise) → Error Boundary catch.
// Suspense only for pending; errors on boundary.
// -----------------------------------------------------------------------------
const failPromise = Promise.reject(new Error("boom"));
// Prevent unhandled rejection noise in some runtimes during module eval:
failPromise.catch(() => {});

function Failing() {
  use(failPromise);
  return null;
}

export function WithErrorBoundaryIdea() {
  // Wrap <Failing /> in your ErrorBoundary + Suspense in real app
  return (
    <Suspense fallback={<p>Loading</p>}>
      {/* <ErrorBoundary><Failing /></ErrorBoundary> */}
      <p>See Error Boundary docs for reject path</p>
    </Suspense>
  );
}

// -----------------------------------------------------------------------------
// Q7: [MID] use vs useContext — interview answer
//
// In simple words:
// Same context value.
// use → conditionals/loops allowed for THAT read.
// useContext → classic hook rules (top-level only).
// Only use can read a Promise.
// -----------------------------------------------------------------------------
const interview = {
  use: "promise unwrap + flexible context read",
  useContext: "context only, strict hook rules",
};

// -----------------------------------------------------------------------------
// Q8: Pass promise from Server Component (mental model)
//
// In simple words:
// Server Component fetches and passes Promise to child Client Component —
// client uses use(promise). RSC + use bridge.
// Detail: file 37.
// -----------------------------------------------------------------------------
// // Server: <Client userPromise={fetchUser(1)} />
// // Client: const user = use(userPromise);

// -----------------------------------------------------------------------------
// Q9: Hooks rules summary for this file
//
// In simple words:
// • useState/useEffect/etc — still top-level, same order
// • use() — exception for conditional context/promise
// • Do not hide other hooks behind the use() exception
// -----------------------------------------------------------------------------
const rules = [
  "Other hooks: always top-level",
  "use(context|promise): can be conditional",
  "Stable promise identity for use(promise)",
];

// -----------------------------------------------------------------------------
// Q10: [MID] use(promise) in loop — allowed but careful
//
// Task:
// items.map(id => <Row key={id} id={id} />) — Row uses use(fetchUser(id)).
//
// In simple words:
// Each Row uses its own cached promise — stable per id.
// React 18: useEffect per row fetch — waterfall is a common problem.
// Trap: new Promise.create every render in loop — suspend loop.
// Pattern: cache Map keyed by id (Q1 fetchUser).
// -----------------------------------------------------------------------------
function UserRow({ id }) {
  const user = use(fetchUser(id));
  return <li>{user.name}</li>;
}

export function UserList({ ids }) {
  return (
    <Suspense fallback={<p>Loading users...</p>}>
      <ul>
        {ids.map((id) => (
          <UserRow key={id} id={id} />
        ))}
      </ul>
    </Suspense>
  );
}

// -----------------------------------------------------------------------------
// Q11: Preload / warm cache before Suspense
//
// Task:
// Call fetchUser(id) before component render — seed promise in cache.
//
// In simple words:
// Prefetch on hover → click feels like instant use(promise) resolve.
// React 18: queryClient.prefetchQuery same idea (TanStack).
// use() needs Suspense boundary ancestor — prefetch doesn't remove boundary.
// Edge: prefetch fail — Error Boundary on use().
// -----------------------------------------------------------------------------
export function PreloadPattern({ id }) {
  // teaching: onMouseEnter={() => fetchUser(id)} to warm cache
  return (
    <Suspense fallback={<p>...</p>}>
      <User id={id} />
    </Suspense>
  );
}

// -----------------------------------------------------------------------------
// Q12: [MID] use(Context) in loop — conditional per item
//
// Task:
// Optional context per row — if (needsTheme) use(ThemeContext) allowed pattern variant.
//
// In simple words:
// Normal useContext in loop ❌ breaks rules if conditional per iteration inconsistently.
// use() exception — still design carefully; do not mix hook order with other hooks.
// React 18: pass theme prop instead to avoid conditional context read.
// Prefer explicit props when simple — use() power when condition is real.
// -----------------------------------------------------------------------------
function MaybeThemed({ useTheme }) {
  let theme = "light";
  if (useTheme) {
    theme = use(ThemeContext);
  }
  return <span data-theme={theme}>Box</span>;
}

export function MaybeThemedDemo() {
  return (
    <ThemeContext value="dark">
      <MaybeThemed useTheme />
      <MaybeThemed useTheme={false} />
    </ThemeContext>
  );
}

// -----------------------------------------------------------------------------
// Q13: use vs useContext — migration note
//
// Task:
// Existing useContext code — replace only when conditional read is needed.
//
// In simple words:
// useContext top-level reads — no rush to migrate all.
// React 19: use(Context) new provider syntax compatible (file 36).
// Interview: "same value; use allows conditional; useContext stricter rules".
// Both work for unconditional read — team pick one style.
// -----------------------------------------------------------------------------
const useVsUseContextMigration =
  "Keep useContext for simple reads; adopt use() when conditional context/promise needed.";

// -----------------------------------------------------------------------------
// Q14: [ADV] Promise cache invalidation
//
// Task:
// User refresh button — cache.delete(key); create new Promise; remount or key bump.
//
// In simple words:
// Stale use(promise) cache → wrong data until invalidate.
// React 18 Query: invalidateQueries built-in.
// Pattern: key={version} on Suspense child to reset subtree.
// refetch = new promise reference + state version increment.
// -----------------------------------------------------------------------------
export function RefreshUser({ id, version }) {
  return (
    <Suspense key={version} fallback={<p>Loading...</p>}>
      <User id={id} />
    </Suspense>
  );
}

// -----------------------------------------------------------------------------
// Q15: [MID] use(promise) without Suspense — trap
//
// Task:
// Missing boundary → React error / hang depending on setup.
//
// In simple words:
// Always wrap consuming tree in <Suspense fallback={...}>.
// React 18 Suspense for lazy only common; 19 use(promise) extends Suspense data.
// Read dev error message — "A component suspended while rendering..."
// Nested Suspense for granular loading UI.
// -----------------------------------------------------------------------------
export function MissingSuspenseTrap() {
  // ❌ <User id={1} /> without Suspense parent
  return (
    <Suspense fallback={<p>Need this wrapper</p>}>
      <User id={1} />
    </Suspense>
  );
}

// -----------------------------------------------------------------------------
// Q16: Context default + use() read
//
// Task:
// createContext(null) — when Provider is missing default is null; read with use().
//
// In simple words:
// if (ctx === null) fallback UI — optional context pattern.
// React 18 useContext same default behavior.
// use() conditional: only call when you know provider might exist — still tricky.
// Explicit optional prop often clearer than magic default.
// -----------------------------------------------------------------------------
const OptionalCtx = createContext(null);

function OptionalConsumer() {
  const value = use(OptionalCtx);
  return <p>{value ?? "no provider"}</p>;
}

export function OptionalContextDemo() {
  return <OptionalConsumer />;
}

// -----------------------------------------------------------------------------
// Q17: [MID] Client Component use(promise) from Server prop
//
// Task:
// Server: const p = fetchUser(); return <Client userPromise={p} />.
//
// In simple words:
// Client: 'use client'; function C({ userPromise }) { const u = use(userPromise); }
// React 18: no RSC — fetch in useEffect instead.
// Serialization: promise special RSC channel — not manual in CSR.
// Waterfall avoid: server await vs pass promise to client parallel strategies.
// -----------------------------------------------------------------------------
const rscPromiseBridge =
  "Server creates promise → Client use(promise) with Suspense — see file 37.";

// -----------------------------------------------------------------------------
// Q18: use() after early return — hooks order trap
//
// Task:
// Other hooks (useState) always first; then conditional return; then use().
//
// In simple words:
// MaybeUser Q5 pattern — useState top, then if (!enabled) return, then use(promise).
// ❌ use() first, then useState — flipping order breaks rules.
// use() exception ≠ all hooks rules gone.
// React 18: no use() — classic rules only.
// -----------------------------------------------------------------------------
export function HooksOrderReminder() {
  return (
    <p>
      Other hooks first (always same order); then conditional return; then use() if needed.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q19: [ADV] Error boundary + Suspense stacking
//
// Task:
// ErrorBoundary wraps Suspense wraps DataComponent — order matters for UX.
//
// In simple words:
// Pending → Suspense fallback; reject → Error Boundary UI.
// React 18 Error Boundary same — no promise unwrap built-in.
// resetKeys on boundary to retry after use(promise) fail.
// Log rejected promise reason in boundary componentDidCatch equivalent.
// -----------------------------------------------------------------------------
export function BoundaryStackNote() {
  return (
    <p>
      Typical: ErrorBoundary outside Suspense outside component calling use(promise).
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q20: [MID] When NOT use(promise)
//
// Task:
// Client-only CSR without appetite for Suspense — useEffect + useState familiar path.
//
// In simple words:
// TanStack Query mature caching/refetch — team already invested.
// Highly dynamic refetch intervals — Query devtools are better.
// use(promise) sweet spot: RSC bridge + Suspense-first apps.
// React 18 onClick fetch doesn't need use().
// -----------------------------------------------------------------------------
const whenNotUseHook = [
  "no Suspense boundaries in app",
  "TanStack Query already standard",
  "simple one-off useEffect fetch",
];

// -----------------------------------------------------------------------------
// Q21: [ADV] Testing components with use(promise)
//
// Task:
// In test pass resolved promise: use(Promise.resolve({ name: 'Test' })).
//
// In simple words:
// Wrap in Suspense in test renderer.
// Reject path: Promise.reject + Error Boundary test helper.
// React 18: mock fetch + waitFor — different pattern.
// Stable resolved promise per test — new each render breaks.
// -----------------------------------------------------------------------------
function TestUser({ userPromise }) {
  const user = use(userPromise);
  return <p>{user.name}</p>;
}

export function TestingUsePromiseDemo() {
  const resolved = Promise.resolve({ name: "Test User" });
  return (
    <Suspense fallback={null}>
      <TestUser userPromise={resolved} />
    </Suspense>
  );
}

// -----------------------------------------------------------------------------
// Q22: [ADV] Interview traps — use() checklist
//
// Task:
// 5 traps: new promise each render, no Suspense, wrong hook order, useContext conditional confusion, stale cache.
//
// In simple words:
// React 18 contrast: useEffect fetch vs Suspense use(promise).
// use() reads promises AND context — not replacement for all data fetching.
// "Can I use hooks in if?" — only use(), not useState.
// Official name is `use` not useHook — file name is teaching shorthand.
// -----------------------------------------------------------------------------
export const useHookInterviewTraps = [
  "new Promise every render → infinite suspend",
  "missing Suspense boundary",
  "use() before other hooks / inconsistent order",
  "thinking all hooks can be conditional",
  "stale promise cache without invalidation",
];
