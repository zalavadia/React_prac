// ============================================================================
// 33 — React 19 `use` hook (promises + context)
// Level: REACT19  |  Sequence seekho: pehle yeh file, phir agla number
// ============================================================================
//
// LAYMAN: `use` = naya hook jo Promise YA Context padh sakta hai.
//
// use(promise) → Promise resolve hone tak Suspense fallback;
// reject → nearest Error Boundary.
// use(context) → useContext jaisa, LEKIN conditional / loops me bhi chal sakta
// (hooks rules ka special exception — sirf `use` ke liye).
//
// Socho: useState/useEffect "hamesha top-level same order".
// `use` = "jab chaho pehle condition check, phir context/promise padho".
//
// KYUN: React 19 ka signature API; RSC + client data patterns.
// INTERVIEW: conditional use OK?; use vs useContext; Suspense pairing.
//
// ============================================================================

import { use, Suspense, createContext, useState } from "react";

// -----------------------------------------------------------------------------
// Q1: use(promise) + Suspense
//
// Seedha matlab:
// Component render me use(promise) — unwrap value.
// Parent Suspense boundary zaroori warna error/hang feel.
// Promise identity stable rakho (module cache / state) — har render naya Promise = loop risk.
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
// Q2: [MID] Har render pe naya Promise = bug
//
// Seedha matlab:
// use(fetch()) seedha render me bina cache → infinite suspend.
// Fix: cache, lift promise, ya framework loader (RSC fetch dedupe).
// -----------------------------------------------------------------------------
function BadUser() {
  // ❌ const user = use(fetch('/api')); // new promise every render
  return null;
}

// -----------------------------------------------------------------------------
// Q3: use(context) basic
//
// Seedha matlab:
// createContext + Provider; child me use(ThemeContext).
// useContext(ThemeContext) bhi same value — use zyada flexible jagah.
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
// Seedha matlab:
// Normal hooks: if ke andar useState ❌
// use(context): if ke andar ✅ (React 19 design)
// Kyun useful: optional context read jab prop missing ho.
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
// Seedha matlab:
// Condition true hone pe hi use(promise) call.
// False branch pe call mat karo — warna unnecessary Suspense.
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
// Seedha matlab:
// use(rejectedPromise) → Error Boundary catch.
// Suspense sirf pending; errors boundary pe.
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
// Seedha matlab:
// Same context value.
// use → conditionals/loops allowed for THAT read.
// useContext → classic hook rules (top-level only).
// Promise padhna sirf use se.
// -----------------------------------------------------------------------------
const interview = {
  use: "promise unwrap + flexible context read",
  useContext: "context only, strict hook rules",
};

// -----------------------------------------------------------------------------
// Q8: Server Component se promise pass (mental model)
//
// Seedha matlab:
// Server Component fetch karke Promise child Client Component ko prop —
// client me use(promise). RSC + use bridge.
// Detail: file 37.
// -----------------------------------------------------------------------------
// // Server: <Client userPromise={fetchUser(1)} />
// // Client: const user = use(userPromise);

// -----------------------------------------------------------------------------
// Q9: Hooks rules summary for this file
//
// Seedha matlab:
// • useState/useEffect/etc — ab bhi top-level, same order
// • use() — exception for conditional context/promise
// • Baaki hooks ko use() ke exception ke peeche mat chhupao
// -----------------------------------------------------------------------------
const rules = [
  "Other hooks: always top-level",
  "use(context|promise): can be conditional",
  "Stable promise identity for use(promise)",
];

// -----------------------------------------------------------------------------
// Q10: [MID] use(promise) in loop — allowed but careful
//
// Kya karna hai:
// items.map(id => <Row key={id} id={id} />) — Row me use(fetchUser(id)).
//
// Seedha matlab:
// Har Row apna cached promise use kare — stable per id.
// React 18: useEffect per row fetch — waterfall common problem.
// Trap: loop me har render naya Promise.create — suspend loop.
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
// Kya karna hai:
// Component render se pehle fetchUser(id) call — promise cache me seed.
//
// Seedha matlab:
// Hover pe prefetch → click pe instant use(promise) resolve feel.
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
// Kya karna hai:
// Optional context per row — if (needsTheme) use(ThemeContext) allowed pattern variant.
//
// Seedha matlab:
// Normal useContext loop me ❌ rules break if conditional per iteration inconsistently.
// use() exception — still design carefully; don't mix hook order other hooks ke saath.
// React 18: pass theme prop instead to avoid conditional context read.
// Prefer explicit props when simple — use() power jab condition real ho.
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
// Kya karna hai:
// Existing code useContext — replace only when conditional read chahiye.
//
// Seedha matlab:
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
// Kya karna hai:
// User refresh button — cache.delete(key); new Promise create; remount or key bump.
//
// Seedha matlab:
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
// Kya karna hai:
// Boundary missing → React error / hang depending on setup.
//
// Seedha matlab:
// Always wrap consuming tree in <Suspense fallback={...}>.
// React 18 Suspense for lazy only common; 19 use(promise) extends Suspense data.
// Dev error message padho — "A component suspended while rendering..."
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
// Kya karna hai:
// createContext(null) — Provider missing pe default null; use() se read.
//
// Seedha matlab:
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
// Kya karna hai:
// Server: const p = fetchUser(); return <Client userPromise={p} />.
//
// Seedha matlab:
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
// Kya karna hai:
// Other hooks (useState) hamesha pehle; phir conditional return; phir use().
//
// Seedha matlab:
// MaybeUser Q5 pattern — useState top, then if (!enabled) return, then use(promise).
// ❌ use() pehle, phir useState — order flip breaks rules.
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
// Kya karna hai:
// ErrorBoundary wraps Suspense wraps DataComponent — order matters for UX.
//
// Seedha matlab:
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
// Kya karna hai:
// Client-only CSR without Suspense appetite — useEffect + useState familiar path.
//
// Seedha matlab:
// TanStack Query mature caching/refetch — team already invested.
// Highly dynamic refetch intervals — Query devtools better.
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
// Kya karna hai:
// Test me resolved promise pass: use(Promise.resolve({ name: 'Test' })).
//
// Seedha matlab:
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
// Kya karna hai:
// 5 traps: new promise each render, no Suspense, wrong hook order, useContext conditional confusion, cache stale.
//
// Seedha matlab:
// React 18 contrast: useEffect fetch vs Suspense use(promise).
// use() reads promises AND context — not replacement for all data fetching.
// "Can I use hooks in if?" — only use(), not useState.
// Official name is `use` not useHook — file name teaching shorthand.
// -----------------------------------------------------------------------------
export const useHookInterviewTraps = [
  "new Promise every render → infinite suspend",
  "missing Suspense boundary",
  "use() before other hooks / inconsistent order",
  "thinking all hooks can be conditional",
  "stale promise cache without invalidation",
];
