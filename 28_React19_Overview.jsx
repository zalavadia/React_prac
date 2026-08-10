// ============================================================================
// 28 — React 19 Overview (Dec 2024+)
// Level: REACT19  |  Study order: do this file first, then the next in sequence
// ============================================================================
//
// SIMPLE: React 18 = Concurrent features + Suspense matured.
// React 19 = major release for "forms + async + less boilerplate" (Dec 2024).
// Think: before submit you manually tracked loading, error, disabled button —
// now Actions + useActionState / useFormStatus make that pattern built-in.
//
// Big picture:
//   1) Actions — async function from form/event; pending/error easier to track
//   2) New hooks — useActionState, useFormStatus, useOptimistic, use()
//   3) ref is now a normal prop (forwardRef mostly legacy)
//   4) Document metadata (<title>, <meta>) from component tree
//   5) Context as provider — <ThemeContext> directly, .Provider optional
//   6) Server Components / Server Actions mental model (common in Next.js etc.)
//
// React 19.2 extras (brief):
//   • useEffectEvent — "latest props/state" event helper inside effect;
//     do NOT use blindly to silence deps (file 39).
//   • Activity — hide/show UI + preserve state style patterns (frameworks explore).
//
// WHY: Mid interviews ask "What's new in React 19?" almost every time.
// INTERVIEW: Actions vs old onSubmit; use() rules; when forwardRef still matters.
//
// ============================================================================

import { useState, useTransition, useActionState } from "react";

// -----------------------------------------------------------------------------
// Q1: React 18 vs 19 — plain difference
//
// In simple words:
// 18 gave concurrent + Suspense + automatic batching.
// 19 simplified forms/async UX + DX (developer experience).
// Your mental model: "UI update" same; "async form flow" has new shortcuts.
// -----------------------------------------------------------------------------
// React 18 typical form flow (idea):
//   onSubmit → e.preventDefault → setLoading(true) → await api → setError/setData → setLoading(false)
// React 19 Action flow (idea):
//   action={async (formData) => { ... }}  + hooks handle pending/error

// -----------------------------------------------------------------------------
// Q2: [MID] What is the Actions concept?
//
// In simple words:
// Action = function that handles "user submitted/triggered something" —
// often async. Form action={fn} receives FormData.
// React can understand pending state (transitions / useActionState).
// Not only forms — startTransition + async is also Action-style thinking.
// -----------------------------------------------------------------------------
async function saveNameAction(formData) {
  const name = formData.get("name");
  // await saveToServer(name)
  return { ok: true, name };
}

export function NameFormClassicAction() {
  return (
    <form action={saveNameAction}>
      <input name="name" placeholder="Your name" />
      <button type="submit">Save</button>
    </form>
  );
}

// -----------------------------------------------------------------------------
// Q3: useTransition for Action-ish pending (18 style bridge)
//
// In simple words:
// Before React 19, isPending + startTransition already gave async UX.
// 19 has dedicated form hooks that are cleaner — but idea same:
// "urgent UI" vs "transition UI".
// -----------------------------------------------------------------------------
export function SaveWithTransition() {
  const [isPending, startTransition] = useTransition();
  const [msg, setMsg] = useState("");

  function handleSave() {
    startTransition(async () => {
      // await api.save()
      setMsg("Saved!");
    });
  }

  return (
    <button onClick={handleSave} disabled={isPending}>
      {isPending ? "Saving..." : "Save"}
      {msg}
    </button>
  );
}

// -----------------------------------------------------------------------------
// Q4: Migration notes — what might break?
//
// In simple words:
// • PropTypes remove path / strictness — prefer TypeScript for types.
// • Some deprecated APIs cleanup (check upgrade guide).
// • forwardRef not required until libraries update.
// • react-dom/client createRoot was already in 18 — keep it.
// • Third-party libs locked to old React — check peerDeps.
// Practical: fix 18.3 deprecations first, then 19.
// -----------------------------------------------------------------------------
const migrationChecklist = [
  "Fix React 18.3 deprecation warnings first",
  "Upgrade react + react-dom together",
  "Test forms, Suspense, error boundaries",
  "Check libraries for React 19 support",
  "Adopt Actions gradually — old onSubmit still works",
];

// -----------------------------------------------------------------------------
// Q5: [MID] Why do interviews ask about Actions?
//
// In simple words:
// Interviewer wants to see: you are not building loading/error/optimistic UI
// as manual spaghetti. React 19 = recognize the pattern.
// "action vs onSubmit" answer: both work; Action + FormData + pending UX is better fit.
// -----------------------------------------------------------------------------
export function WhyActionsMatter() {
  // Teaching-only: compare mental models
  const oldWay = "preventDefault + many useStates";
  const newWay = "action + useActionState / useFormStatus";
  return <p>{oldWay} → {newWay}</p>;
}

// -----------------------------------------------------------------------------
// Q6: useActionState teaser (detail file 30)
//
// In simple words:
// useActionState(action, initialState) → [state, formAction, isPending]
// Pass formAction to form; after submit you get new state.
// -----------------------------------------------------------------------------
async function incrementAction(prev, formData) {
  return prev + 1;
}

export function CounterActionTeaser() {
  const [count, formAction, isPending] = useActionState(incrementAction, 0);
  return (
    <form action={formAction}>
      <p>Count: {count}</p>
      <button disabled={isPending}>+1</button>
    </form>
  );
}

// -----------------------------------------------------------------------------
// Q7: Client vs Server Components (teaser — file 37)
//
// In simple words:
// Default RSC world: components render on SERVER (zero bundle).
// Need interactivity → 'use client'.
// React 19 docs + Next App Router mainstream this mental model.
// -----------------------------------------------------------------------------
// // Server Component (no 'use client') — fetch OK, no useState
// // Client Component — 'use client' — hooks OK

// -----------------------------------------------------------------------------
// Q8: [MID] React 19.2 — useEffectEvent & Activity (overview only)
//
// In simple words:
// useEffectEvent(fn) = event inside effect that reads latest values;
// avoids "effect runs every render" from dependency array — BUT
// NOT a shortcut to "quietly remove deps". Rules in file 39.
// Activity = offscreen/hidden UI patterns; follow framework/docs.
// -----------------------------------------------------------------------------
const react192Extras = {
  useEffectEvent: "stable event from effect; not a deps escape hatch",
  Activity: "hide/show with preserved semantics — see React 19.2 notes",
};

// -----------------------------------------------------------------------------
// Q9: Practice roadmap in this folder
//
// In simple words:
// 29 forms action → 30 useActionState → 31 useFormStatus → 32 optimistic
// → 33 use() → 34 ref prop → 35 metadata → 36 context provider
// → 37 RSC → 38 server actions → 39 compiler + EffectEvent → 40 interview dump
// -----------------------------------------------------------------------------
export const react19StudyOrder = [
  29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
];

// -----------------------------------------------------------------------------
// Q10: [MID] use() hook teaser — promise + context (file 33)
//
// Task:
// use(promise) with Suspense; use(context) can work conditionally.
//
// In simple words:
// React 19 new hook — flexible cousin of useContext + Promise unwrap.
// Normal hook rules have exception for use(); other hooks stay top-level.
// Interview trap: new Promise every render → infinite suspend.
// -----------------------------------------------------------------------------
const useHookTeaser = {
  promise: "use(cachedPromise) inside Suspense boundary",
  context: "use(ThemeContext) — conditionals allowed for use() only",
  react18: "useContext only; no use(promise) built-in",
};

// -----------------------------------------------------------------------------
// Q11: useOptimistic teaser (file 32)
//
// Task:
// Show UI update immediately; sync real state after server confirm.
//
// In simple words:
// WhatsApp send feel — show in list first, rollback on fail.
// React 18: write optimistic state + rollback manually.
// When NOT: payment, irreversible delete, inventory-critical flows.
// -----------------------------------------------------------------------------
const optimisticTeaser =
  "useOptimistic(baseState, updateFn) — temporary overlay until real state catches up.";

// -----------------------------------------------------------------------------
// Q12: [MID] ref as prop — forwardRef legacy (file 34)
//
// Task:
// React 19: ref is normal prop; forwardRef mostly for library compat.
//
// In simple words:
// React 18: forwardRef required for ref on function component.
// React 19: function Input({ ref }) { return <input ref={ref} /> }
// Migration: old libs use forwardRef — both work.
// Common bug: accept ref but do not attach in child → parent.current null.
// -----------------------------------------------------------------------------
const refPropNote = {
  react18: "forwardRef(function (props, ref) { ... })",
  react19: "ref is a regular prop on function components",
};

// -----------------------------------------------------------------------------
// Q13: Document metadata in tree (file 35)
//
// Task:
// Write <title>, <meta> inside component — React hoists to head.
//
// In simple words:
// React 18 SPA: useEffect document.title or react-helmet.
// React 19: declarative <title> in JSX — SSR/RSC friendly.
// Trap: two components set different title → keep single page-level owner.
// -----------------------------------------------------------------------------
export function PageTitleDemo() {
  return (
    <>
      <title>Dashboard — MyApp</title>
      <meta name="description" content="User dashboard" />
      <h1>Dashboard</h1>
    </>
  );
}

// -----------------------------------------------------------------------------
// Q14: [MID] Context as Provider syntax (file 36)
//
// Task:
// <ThemeContext value="dark"> — .Provider wrapper optional now.
//
// In simple words:
// React 18: <ThemeContext.Provider value={...}>
// React 19: <ThemeContext value={...}> — same read API (useContext / use).
// Performance trap same: inline value={{}} new reference every render.
// -----------------------------------------------------------------------------
const contextProviderNote =
  "<Context value> in 19; .Provider legacy-ok; watch value referential equality.";

// -----------------------------------------------------------------------------
// Q15: Server Components one-liner (file 37)
//
// Task:
// Default server render; 'use client' boundary for interactivity.
//
// In simple words:
// Server: async fetch, DB, secrets — zero client bundle for that code.
// Client: useState, onClick, browser APIs.
// Vite-only CSR app has no RSC — need framework (Next App Router).
// When NOT: highly interactive UI, optimistic updates → client islands.
// -----------------------------------------------------------------------------
const rscOneLiner =
  "Server = data + static; Client = interactivity; 'use client' at file top.";

// -----------------------------------------------------------------------------
// Q16: [MID] Server Actions one-liner (file 38)
//
// Task:
// 'use server' function — trigger from client/form, execute on server.
//
// In simple words:
// Form action={serverAction} — progressive enhancement friendly.
// Security MUST: auth, validate, authorize — client FormData can be tampered.
// vs API route: public HTTP / webhooks → API route better.
// -----------------------------------------------------------------------------
const serverActionOneLiner =
  "Server Actions = RPC-ish mutations; always validate on server.";

// -----------------------------------------------------------------------------
// Q17: React Compiler overview (file 39)
//
// Task:
// Build-time auto-memoization — less manual useMemo/useCallback.
//
// In simple words:
// Compiler assumes pure render — impure render (Math.random in render) breaks.
// React 18: manual React.memo / useMemo everywhere when measured.
// React 19+: compiler opt-in reduces NEED, not understanding of referential equality.
// When NOT to rely: compiler off, edge libs, intentional manual memo.
// -----------------------------------------------------------------------------
const compilerNote = {
  does: "auto-memoize safe derived values and components",
  doesNot: "fix fetch-in-render, mutating props, bad architecture",
};

// -----------------------------------------------------------------------------
// Q18: [MID] useFormStatus import trap (file 31)
//
// Task:
// useFormStatus from react-dom; call in CHILD of form.
//
// In simple words:
// React 18: manually lift isPending from parent to button.
// React 19: useFormStatus() in child — no prop drilling.
// Common bug #1: call in form component itself → pending stays false.
// Common bug #2: import from 'react' instead of 'react-dom'.
// -----------------------------------------------------------------------------
const formStatusTrap =
  "useFormStatus in child of <form>; import from react-dom.";

// -----------------------------------------------------------------------------
// Q19: Automatic batching — 18 vs 19 same story
//
// Task:
// Multiple setState in one event → one re-render (18+ already).
//
// In simple words:
// React 18 matured automatic batching (events, timeouts, promises).
// React 19 builds on this — Actions/transitions are separate layer.
// Interview: batching ≠ Actions; don't confuse the two.
// -----------------------------------------------------------------------------
const batchingNote =
  "18+ batches setState in events/async; 19 adds Actions layer on top.";

// -----------------------------------------------------------------------------
// Q20: [ADV] Strict Mode + Actions dev behavior
//
// Task:
// DEV effects double-invoke — keep Actions idempotent where possible.
//
// In simple words:
// Strict Mode runs setup/cleanup twice in dev — to catch side effects.
// Action that writes DB without guard → dev double insert risk (rare path).
// Production does not double. Server Actions: think CSRF + idempotency.
// React 18 vs 19: Strict Mode same philosophy; Actions new surface area.
// -----------------------------------------------------------------------------
const strictActionsNote =
  "Write idempotent actions where possible; dev Strict Mode still doubles effects.";

// -----------------------------------------------------------------------------
// Q21: [MID] When NOT to adopt React 19 features?
//
// Task:
// Old stable app, libs without React 19 support, team not RSC-ready.
//
// In simple words:
// onSubmit + useState still valid — migration not forced.
// Server Actions stay conceptual without Next/RSC framework.
// Compiler opt-in — measure first, then adopt.
// Small SPA Vite: Actions useful client-side; RSC optional.
// -----------------------------------------------------------------------------
const whenNotAdopt = [
  "libs lack React 19 peerDeps",
  "no framework RSC support needed",
  "team not trained on Actions/security model",
  "working forms — gradual migration OK",
];

// -----------------------------------------------------------------------------
// Q22: [ADV] Interview rapid-fire — React 19 cheat sheet
//
// Task:
// Say in one minute: Actions, hooks, ref, metadata, context, RSC, compiler.
//
// In simple words:
// Actions = async form/event handlers + pending UX.
// useActionState = form state machine; useFormStatus = child pending UI.
// useOptimistic = instant UI + rollback; use() = promise/context flexible read.
// ref prop; <title> in tree; <Context value>; RSC + Server Actions; Compiler + EffectEvent.
// Migration: fix 18.3 deprecations → upgrade together → test forms/Suspense.
// -----------------------------------------------------------------------------
export const react19InterviewCheatSheet = {
  actions: "async fn on form/event; FormData; pending hooks",
  useActionState: "[state, formAction, isPending]",
  useFormStatus: "react-dom; child of form only",
  useOptimistic: "temporary UI until real state syncs",
  useHook: "promise (Suspense) + context (conditional OK)",
  refAsProp: "forwardRef mostly legacy in 19",
  metadata: "<title>/<meta> in component tree",
  contextProvider: "<Context value> replaces .Provider",
  rsc: "server default; use client for hooks/events",
  serverActions: "use server; validate auth on server",
  compiler: "auto-memo; still follow Rules of React",
  effectEvent: "latest values in effect events — not deps escape",
};
