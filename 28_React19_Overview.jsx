// ============================================================================
// 28 — React 19 Overview (Dec 2024+)
// Level: REACT19  |  Sequence seekho: pehle yeh file, phir agla number
// ============================================================================
//
// LAYMAN: React 18 = Concurrent features + Suspense mature hua.
// React 19 = "form + async + less boilerplate" ka major release (Dec 2024).
// Socho: pehle submit pe manually loading state, error, disable button —
// ab Actions + useActionState / useFormStatus se yeh pattern built-in.
//
// Badi picture:
//   1) Actions — async function jo form/event se chalaye; pending/error track easy
//   2) New hooks — useActionState, useFormStatus, useOptimistic, use()
//   3) ref ab normal prop (forwardRef mostly legacy)
//   4) Document metadata (<title>, <meta>) component tree se
//   5) Context as provider — <ThemeContext> seedha, .Provider optional
//   6) Server Components / Server Actions mental model (Next.js etc. me common)
//
// React 19.2 extras (brief):
//   • useEffectEvent — effect ke andar "latest props/state" wala event helper;
//     deps silence karne ke liye ANDHA mat use karo (file 39).
//   • Activity — UI ko hide/show + state preserve style patterns (frameworks explore).
//
// KYUN: Mid interviews me "React 19 me kya naya?" almost fixed sawal.
// INTERVIEW: Actions vs purana onSubmit; use() rules; forwardRef kab tak.
//
// ============================================================================

import { useState, useTransition, useActionState } from "react";

// -----------------------------------------------------------------------------
// Q1: React 18 vs 19 — seedha farq
//
// Seedha matlab:
// 18 ne concurrent + Suspense + automatic batching diya.
// 19 ne forms/async UX + DX (developer experience) simplify kiya.
// Tumhara mental model: "UI update" same; "async form flow" naya shortcut.
// -----------------------------------------------------------------------------
// React 18 typical form flow (idea):
//   onSubmit → e.preventDefault → setLoading(true) → await api → setError/setData → setLoading(false)
// React 19 Action flow (idea):
//   action={async (formData) => { ... }}  + hooks pending/error handle karte hain

// -----------------------------------------------------------------------------
// Q2: [MID] Actions concept kya hai?
//
// Seedha matlab:
// Action = function jo "user ne kuch submit/trigger kiya" handle kare —
// aksar async. Form ke action={fn} pe FormData milta hai.
// React pending state samajh sakta hai (transitions / useActionState).
// Yeh sirf form nahi — startTransition + async bhi Action-style soch.
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
// Q3: useTransition se Action-ish pending (18 style bridge)
//
// Seedha matlab:
// React 19 se pehle bhi isPending + startTransition se async UX milta tha.
// 19 me forms ke liye dedicated hooks zyada clean hain — lekin idea same:
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
// Q4: Migration notes — kya toot sakta hai?
//
// Seedha matlab:
// • PropTypes remove path / strictness — types ke liye TypeScript prefer.
// • Some deprecated APIs cleanup (check upgrade guide).
// • forwardRef ab zaroori nahi libraries update hone tak.
// • react-dom/client createRoot pehle se 18 me tha — wahi rakho.
// • Third-party libs jo purane React pe band hain — peerDeps check karo.
// Practical: pehle 18.3 pe deprecations fix, phir 19.
// -----------------------------------------------------------------------------
const migrationChecklist = [
  "Fix React 18.3 deprecation warnings first",
  "Upgrade react + react-dom together",
  "Test forms, Suspense, error boundaries",
  "Check libraries for React 19 support",
  "Adopt Actions gradually — old onSubmit still works",
];

// -----------------------------------------------------------------------------
// Q5: [MID] Kyun Actions mid interview me poochte hain?
//
// Seedha matlab:
// Interviewer dekhna chahta hai: tum loading/error/optimistic UI
// manually spaghetti to nahi bana rahe. React 19 = pattern ko pehchano.
// "action vs onSubmit" jawab: dono chal sakte; Action FormData + pending UX better fit.
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
// Seedha matlab:
// useActionState(action, initialState) → [state, formAction, isPending]
// Form me formAction do; submit ke baad naya state milta hai.
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
// Seedha matlab:
// Default RSC world me components SERVER pe render (zero bundle).
// Interactivity chahiye → 'use client'.
// React 19 docs + Next App Router is mental model ko mainstream banata hai.
// -----------------------------------------------------------------------------
// // Server Component (no 'use client') — fetch OK, no useState
// // Client Component — 'use client' — hooks OK

// -----------------------------------------------------------------------------
// Q8: [MID] React 19.2 — useEffectEvent & Activity (overview only)
//
// Seedha matlab:
// useEffectEvent(fn) = effect ke andar latest values padhne wala event;
// dependency array se "har render pe effect dubara" avoid — LEKIN
// "deps hata do quietly" ka shortcut NAHI. File 39 me rules.
// Activity = offscreen/hidden UI patterns; framework/docs follow karo.
// -----------------------------------------------------------------------------
const react192Extras = {
  useEffectEvent: "stable event from effect; not a deps escape hatch",
  Activity: "hide/show with preserved semantics — see React 19.2 notes",
};

// -----------------------------------------------------------------------------
// Q9: Practice roadmap is folder me
//
// Seedha matlab:
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
// Kya karna hai:
// use(promise) Suspense ke saath; use(context) conditional bhi chal sakta.
//
// Seedha matlab:
// React 19 ka naya hook — useContext ka flexible cousin + Promise unwrap.
// Normal hooks rules use() ke liye exception; baaki hooks top-level hi.
// Interview trap: har render naya Promise mat banao — infinite suspend.
// -----------------------------------------------------------------------------
const useHookTeaser = {
  promise: "use(cachedPromise) inside Suspense boundary",
  context: "use(ThemeContext) — conditionals allowed for use() only",
  react18: "useContext only; no use(promise) built-in",
};

// -----------------------------------------------------------------------------
// Q11: useOptimistic teaser (file 32)
//
// Kya karna hai:
// UI turant update dikhao; server confirm ke baad real state sync.
//
// Seedha matlab:
// WhatsApp message send feel — pehle list me dikhao, fail pe rollback.
// React 18 me manually optimistic state + rollback likhna padta tha.
// Kab NAHI: payment, irreversible delete, inventory-critical flows.
// -----------------------------------------------------------------------------
const optimisticTeaser =
  "useOptimistic(baseState, updateFn) — temporary overlay until real state catches up.";

// -----------------------------------------------------------------------------
// Q12: [MID] ref as prop — forwardRef legacy (file 34)
//
// Kya karna hai:
// React 19 me ref normal prop; forwardRef mostly library compat ke liye.
//
// Seedha matlab:
// React 18: function component pe ref ke liye forwardRef zaroori tha.
// React 19: function Input({ ref }) { return <input ref={ref} /> }
// Migration: purani libs forwardRef use karti hain — dono chalte hain.
// Common bug: ref accept kiya but child me attach nahi kiya → parent.current null.
// -----------------------------------------------------------------------------
const refPropNote = {
  react18: "forwardRef(function (props, ref) { ... })",
  react19: "ref is a regular prop on function components",
};

// -----------------------------------------------------------------------------
// Q13: Document metadata in tree (file 35)
//
// Kya karna hai:
// Component ke andar <title>, <meta> likho — React head me hoist karta hai.
//
// Seedha matlab:
// React 18 SPA: useEffect me document.title ya react-helmet.
// React 19: declarative <title> in JSX — SSR/RSC friendly.
// Trap: do components alag title set karein → single page-level owner rakho.
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
// Kya karna hai:
// <ThemeContext value="dark"> — .Provider wrapper optional ab.
//
// Seedha matlab:
// React 18: <ThemeContext.Provider value={...}>
// React 19: <ThemeContext value={...}> — same read API (useContext / use).
// Performance trap same: inline value={{}} har render naya reference.
// -----------------------------------------------------------------------------
const contextProviderNote =
  "<Context value> in 19; .Provider legacy-ok; watch value referential equality.";

// -----------------------------------------------------------------------------
// Q15: Server Components one-liner (file 37)
//
// Kya karna hai:
// Default server render; interactivity ke liye 'use client' boundary.
//
// Seedha matlab:
// Server: async fetch, DB, secrets — zero client bundle for that code.
// Client: useState, onClick, browser APIs.
// Vite-only CSR app me RSC nahi — framework (Next App Router) chahiye.
// When NOT: highly interactive UI, optimistic updates → client islands.
// -----------------------------------------------------------------------------
const rscOneLiner =
  "Server = data + static; Client = interactivity; 'use client' at file top.";

// -----------------------------------------------------------------------------
// Q16: [MID] Server Actions one-liner (file 38)
//
// Kya karna hai:
// 'use server' function — client/form se trigger, server pe execute.
//
// Seedha matlab:
// Form action={serverAction} — progressive enhancement friendly.
// Security MUST: auth, validate, authorize — client FormData tamper ho sakta.
// vs API route: public HTTP / webhooks ke liye API route better.
// -----------------------------------------------------------------------------
const serverActionOneLiner =
  "Server Actions = RPC-ish mutations; always validate on server.";

// -----------------------------------------------------------------------------
// Q17: React Compiler overview (file 39)
//
// Kya karna hai:
// Build-time auto-memoization — useMemo/useCallback kam manually.
//
// Seedha matlab:
// Compiler pure render assume karta hai — impure render (Math.random in render) break.
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
// Kya karna hai:
// useFormStatus react-dom se; form ke CHILD component me call karo.
//
// Seedha matlab:
// React 18: isPending manually lift karna padta tha parent se button tak.
// React 19: child me useFormStatus() — prop drilling band.
// Common bug #1: form wale component me seedha call → pending false rehta.
// Common bug #2: import from 'react' instead of 'react-dom'.
// -----------------------------------------------------------------------------
const formStatusTrap =
  "useFormStatus in child of <form>; import from react-dom.";

// -----------------------------------------------------------------------------
// Q19: Automatic batching — 18 vs 19 same story
//
// Kya karna hai:
// Multiple setState ek event me → ek re-render (18+ already).
//
// Seedha matlab:
// React 18 ne automatic batching mature kiya (events, timeouts, promises).
// React 19 is pe build karta — Actions/transitions alag layer hain.
// Interview: batching ≠ Actions; don't confuse the two.
// -----------------------------------------------------------------------------
const batchingNote =
  "18+ batches setState in events/async; 19 adds Actions layer on top.";

// -----------------------------------------------------------------------------
// Q20: [ADV] Strict Mode + Actions dev behavior
//
// Kya karna hai:
// Dev me effects double-invoke — Actions idempotent rakho jahan possible.
//
// Seedha matlab:
// Strict Mode dev me setup/cleanup dubara — side effects pakadne ke liye.
// Action jo DB write kare bina guard ke → dev me double insert risk (rare path).
// Production me double nahi. Server Actions me framework CSRF + idempotency socho.
// React 18 vs 19: Strict Mode same philosophy; Actions naya surface area.
// -----------------------------------------------------------------------------
const strictActionsNote =
  "Write idempotent actions where possible; dev Strict Mode still doubles effects.";

// -----------------------------------------------------------------------------
// Q21: [MID] Kab React 19 features adopt NAHI karna?
//
// Kya karna hai:
// Purana stable app, libs React 19 support nahi, team RSC ready nahi.
//
// Seedha matlab:
// onSubmit + useState ab bhi valid — migration forced nahi.
// Server Actions bina Next/RSC framework ke conceptual hi rehte.
// Compiler opt-in — pehle measure, phir adopt.
// Small SPA Vite: Actions client-side useful; RSC optional.
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
// Kya karna hai:
// Ek minute me bolo: Actions, hooks, ref, metadata, context, RSC, compiler.
//
// Seedha matlab:
// Actions = async form/event handlers + pending UX.
// useActionState = form state machine; useFormStatus = child pending UI.
// useOptimistic = instant UI + rollback; use() = promise/context flexible read.
// ref prop; <title> in tree; <Context value>; RSC + Server Actions; Compiler + EffectEvent.
// Migration: 18.3 deprecations fix → upgrade together → test forms/Suspense.
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
