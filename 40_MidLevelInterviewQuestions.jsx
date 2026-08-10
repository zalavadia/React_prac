// ============================================================================
// 40 — Mid-Level React Interview Questions (interview revision) — 47 Qs
// Level: INTERVIEW  |  Study in order: read React 19 files first, then revise with this
// ============================================================================
//
// SIMPLE: This file is a RUNBOOK for mid-level React interviews —
// hooks rules, keys, batching, stale closures, Virtual DOM myth,
// useEffect deps, performance, React 19 Actions vs old submit handlers.
//
// Each Q: in simple words + small code where useful.
// [MID] = typical mid-level depth. Do not memorize — explain with your own words.
//
// WHY: Revise in one place; other files go deeper.
// INTERVIEW: Use clear plain English — keep concepts precise.
//
// ============================================================================

import {
  useState,
  useEffect,
  useRef,
  useMemo,
  memo,
  useActionState,
  useTransition,
  useDeferredValue,
} from "react";

// -----------------------------------------------------------------------------
// Q1: [MID] What are the Rules of Hooks?
//
// In simple words:
// 1) Call only at the top level of React function components / custom hooks.
// 2) Do not call ordinary hooks inside loops, conditions, or nested functions.
// 3) Order must stay the same every render — React depends on the hooks list.
// Exception: React 19 `use()` allows conditional context/promise (file 33).
// -----------------------------------------------------------------------------
function BadHooks({ flag }) {
  // if (flag) useState(0); // ❌
  const [n, setN] = useState(0); // ✅ always
  return <button onClick={() => setN(n + 1)}>{n}</button>;
}

// -----------------------------------------------------------------------------
// Q2: [MID] Why key in lists? When to avoid index?
//
// In simple words:
// key = identity across reorders. Wrong key = state sticks to wrong item.
// index key OK for static list; avoid when insert/delete/reorder + item state.
// -----------------------------------------------------------------------------
export function TodoList({ todos }) {
  return (
    <ul>
      {todos.map((t) => (
        <li key={t.id}>{t.title}</li> // ✅ stable id
      ))}
    </ul>
  );
}

// -----------------------------------------------------------------------------
// Q3: [MID] Is setState async / batching?
//
// In simple words:
// React 18+ mostly automatic batching — multiple setState in one event
// one re-render. Do not expect old state immediately.
// Need next value → functional updater setN(n => n+1).
// -----------------------------------------------------------------------------
export function BatchDemo() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  function onClick() {
    setA((x) => x + 1);
    setB((x) => x + 1); // batched → usually 1 render
  }
  return (
    <button onClick={onClick}>
      {a},{b}
    </button>
  );
}

// -----------------------------------------------------------------------------
// Q4: [MID] Stale closure / stale state in setTimeout
//
// In simple words:
// Handler closed over old count. setCount(count+1) can be stale.
// Fix: functional update, or ref for latest, or EffectEvent (19.2) patterns.
// -----------------------------------------------------------------------------
export function StaleCounter() {
  const [count, setCount] = useState(0);
  function schedule() {
    setTimeout(() => {
      // setCount(count + 1); // ❌ may stale
      setCount((c) => c + 1); // ✅
    }, 1000);
  }
  return <button onClick={schedule}>{count}</button>;
}

// -----------------------------------------------------------------------------
// Q5: [MID] Virtual DOM myth — "React is fast because Virtual DOM is fast"?
//
// In simple words:
// VDOM = JS object snapshot of UI; diff decides fewer DOM updates.
// The real speed game: predictable update model, batching, concurrent,
// avoiding unnecessary work — not just "VDOM magic".
// Svelte/Solid are fast without classic VDOM too. Give a nuanced answer.
// -----------------------------------------------------------------------------
const vdomAnswer =
  "VDOM is a strategy, not the only reason React apps feel fast; avoid unnecessary renders too.";

// -----------------------------------------------------------------------------
// Q6: [MID] useEffect deps — empty vs missing vs full
//
// In simple words:
// [] = mount/unmount sync (subscribe once).
// [id] = re-run when id changes.
// Missing dep = stale bug. Extra dep = extra runs.
// Derive during render when possible — do not copy state from effect.
// -----------------------------------------------------------------------------
export function UserEffect({ userId }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    let alive = true;
    fetch("/api/" + userId)
      .then((r) => r.json())
      .then((u) => {
        if (alive) setUser(u);
      });
    return () => {
      alive = false;
    };
  }, [userId]);
  return <pre>{JSON.stringify(user)}</pre>;
}

// -----------------------------------------------------------------------------
// Q7: [MID] Controlled vs uncontrolled input
//
// In simple words:
// Controlled: value + onChange (React state is source).
// Uncontrolled: defaultValue + ref / FormData (DOM is source).
// React 19 Actions often FormData/uncontrolled-friendly.
// -----------------------------------------------------------------------------
export function Controlled({ value, onChange }) {
  return <input value={value} onChange={(e) => onChange(e.target.value)} />;
}

// -----------------------------------------------------------------------------
// Q8: [MID] Lifting state up kab?
//
// In simple words:
// When two children share / sync the same data. Parent is owner.
// Do not over-lift — prop drilling → Context / composition.
// -----------------------------------------------------------------------------
export function ParentLift() {
  const [text, setText] = useState("");
  return (
    <>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <p>{text}</p>
    </>
  );
}

// -----------------------------------------------------------------------------
// Q9: [MID] useMemo / useCallback kab?
//
// In simple words:
// Expensive calc; or referential equality for memoized child deps.
// Do not slap it everywhere by default — measure / compiler (file 39).
// -----------------------------------------------------------------------------
export function Filtered({ items, query }) {
  const filtered = useMemo(
    () => items.filter((x) => x.includes(query)),
    [items, query]
  );
  return <div>{filtered.length}</div>;
}

// -----------------------------------------------------------------------------
// Q10: [MID] What does React.memo do?
//
// In simple words:
// Shallow props compare — skip re-render on same props (usually).
// Parent re-render ≠ child re-render if memo + stable props.
// Unstable callbacks break memo — useCallback / compiler.
// -----------------------------------------------------------------------------
export const Row = memo(function Row({ label }) {
  return <div>{label}</div>;
});

// -----------------------------------------------------------------------------
// Q11: [MID] useRef vs useState
//
// In simple words:
// ref change does not re-render. DOM handles, timers, latest values.
// State = show in UI. Deciding UI by reading ref.current during render is risky.
// -----------------------------------------------------------------------------
export function TimerRef() {
  const id = useRef(null);
  const [tick, setTick] = useState(0);
  useEffect(() => {
    id.current = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id.current);
  }, []);
  return <span>{tick}</span>;
}

// -----------------------------------------------------------------------------
// Q12: [MID] Why cleanup in useEffect?
//
// In simple words:
// If you subscribe, unsubscribe. Clear timers. Ignore stale fetch.
// Strict Mode dev mount→unmount→remount — cleanup must be correct.
// -----------------------------------------------------------------------------
export function WatchWidth() {
  const [w, setW] = useState(0);
  useEffect(() => {
    function onResize() {
      setW(window.innerWidth);
    }
    window.addEventListener("resize", onResize);
    onResize();
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return <span>{w}</span>;
}

// -----------------------------------------------------------------------------
// Q13: [MID] Keys + local state bug story
//
// In simple words:
// Two inputs in list — key=index, delete first → second's text may move to first.
// Stable id keys + remount via key={id} when form reset is needed.
// -----------------------------------------------------------------------------
export function EditableList({ items, onRemove }) {
  return items.map((item) => (
    <div key={item.id}>
      <input defaultValue={item.text} />
      <button onClick={() => onRemove(item.id)}>x</button>
    </div>
  ));
}

// -----------------------------------------------------------------------------
// Q14: [MID] State updates with objects — mutate mat
//
// In simple words:
// user.name = x in setUser; setUser(user) — same reference, miss updates.
// New object: setUser({ ...user, name: x }).
// -----------------------------------------------------------------------------
export function Profile() {
  const [user, setUser] = useState({ name: "Ada", age: 30 });
  return (
    <button
      onClick={() => setUser({ ...user, age: user.age + 1 })}
    >
      {user.name} {user.age}
    </button>
  );
}

// -----------------------------------------------------------------------------
// Q15: [MID] Context performance pain
//
// In simple words:
// One big value object change → all consumers re-render.
// Split context; pass stable dispatch; children composition.
// React 19: <Ctx value={...}> syntax (file 36) — problem same.
// -----------------------------------------------------------------------------
const tip = "Split frequently-changing state from static config in context.";

// -----------------------------------------------------------------------------
// Q16: [MID] What do Error Boundaries catch?
//
// In simple words:
// Render/lifecycle errors in children. Event handlers / async need their own try/catch.
// Suspense is separate (loading). Rejected use(promise) → boundary.
// -----------------------------------------------------------------------------
const errorBoundaryNote =
  "Boundaries catch render errors; not click handlers or setTimeout unless rethrown to render.";

// -----------------------------------------------------------------------------
// Q17: [MID] Concurrent / startTransition kab?
//
// In simple words:
// Urgent: typing input. Non-urgent: filter huge list.
// startTransition keeps input snappy, list updates behind.
// isPending for pending UI.
// -----------------------------------------------------------------------------
export function SearchBig({ all }) {
  const [q, setQ] = useState("");
  const [list, setList] = useState(all);
  const [pending, startTransition] = useTransition();
  return (
    <>
      <input
        value={q}
        onChange={(e) => {
          const v = e.target.value;
          setQ(v);
          startTransition(() => {
            setList(all.filter((x) => x.includes(v)));
          });
        }}
      />
      {pending ? "..." : list.length}
    </>
  );
}

// -----------------------------------------------------------------------------
// Q18: [MID] React 19 Actions vs old onSubmit handlers
//
// In simple words:
// Old: onSubmit → preventDefault → manual loading/error state.
// New: action={async (formData)=>...} + useActionState / useFormStatus.
// Old is still valid. Actions = FormData-first + pending integration.
// Server Actions ('use server') run mutations on server (file 38).
// -----------------------------------------------------------------------------
async function save(prev, formData) {
  // await api
  return { ok: true, title: formData.get("title") };
}

export function ActionVsSubmit() {
  const [state, formAction, pending] = useActionState(save, { ok: false });
  return (
    <form action={formAction}>
      <input name="title" />
      <button disabled={pending}>Save</button>
      {state.ok && <p>Saved {state.title}</p>}
    </form>
  );
}

// -----------------------------------------------------------------------------
// Q19: [MID] useOptimistic one-liner
//
// In simple words:
// Update UI first, server later; on fail rollback to base state.
// Low-risk actions (likes). Be conservative with payments.
// -----------------------------------------------------------------------------
const optimisticLine =
  "Show success instantly; reconcile with server; roll back on failure.";

// -----------------------------------------------------------------------------
// Q20: [MID] use() hook rules
//
// In simple words:
// use(promise) Suspense; use(context) conditional OK.
// Other hooks stay top-level. Promise identity must be stable.
// -----------------------------------------------------------------------------
const useHookLine =
  "use unwraps promise/context; conditional OK for use; cache promises.";

// -----------------------------------------------------------------------------
// Q21: [MID] forwardRef ab?
//
// In simple words:
// React 19: ref is a normal prop. forwardRef is legacy/compat.
// useImperativeHandle limited parent API.
// -----------------------------------------------------------------------------
function Input19({ ref, ...rest }) {
  return <input ref={ref} {...rest} />;
}

// -----------------------------------------------------------------------------
// Q22: [MID] CSR fetch waterfall vs RSC
//
// In simple words:
// Client mount → spinner → fetch → nested fetch = waterfall.
// Server Components parallelize on the tree / closer to data.
// Hybrid: server initial + client interactivity.
// -----------------------------------------------------------------------------
const rscLine =
  "RSC moves initial data work to server; client for interaction islands.";

// -----------------------------------------------------------------------------
// Q23: [MID] Why not put everything in useEffect?
//
// In simple words:
// Effects = sync external system (DOM, network subscription, widgets).
// Derived values → calculate in render.
// Reset state when prop changes → key remount pattern is often cleaner.
// -----------------------------------------------------------------------------
export function FullName({ first, last }) {
  // ❌ useEffect sync full from first/last
  const full = first + " " + last; // ✅
  return <span>{full}</span>;
}

// -----------------------------------------------------------------------------
// Q24: [MID] Strict Mode double invoke — bug or feature?
//
// In simple words:
// Dev effects setup/cleanup/setup — to catch impure effects.
// Not double in production. Write cleanup correctly.
// -----------------------------------------------------------------------------
const strictLine =
  "Dev double-mount finds missing cleanup; write effects idempotent.";

// -----------------------------------------------------------------------------
// Q25: [MID] Performance checklist (bolke sunao)
//
// In simple words:
// 1) Unnecessary state 2) State location 3) memo where measured
// 4) virtualize long lists 5) code split 6) RSC/less JS
// 7) images/network 8) avoid layout thrash in effects
// -----------------------------------------------------------------------------
export const perfChecklist = [
  "cut state",
  "lift only as needed",
  "memo after measure",
  "virtualize long lists",
  "lazy routes",
  "server components when available",
];

// -----------------------------------------------------------------------------
// Q26: [MID] useFormStatus child-only rule
//
// In simple words:
// from react-dom; nearest parent form; call in child component of form.
// Not in the same component that renders <form>.
// -----------------------------------------------------------------------------
const formStatusLine =
  "useFormStatus in child of form; import from react-dom.";

// -----------------------------------------------------------------------------
// Q27: [MID] useEffectEvent (19.2) — trap question
//
// In simple words:
// Latest props in event inside effect WITHOUT adding them as deps.
// NOT for hiding required deps (fetch userId must stay in deps).
// -----------------------------------------------------------------------------
const effectEventLine =
  "EffectEvent = non-reactive read in effect events; not eslint-disable.";

// -----------------------------------------------------------------------------
// Q28: [MID] Controlled form + Action mix advice
//
// In simple words:
// Live validation → local useState.
// Submit mutation → action / server action.
// Do not fight FormData — keep name attributes or intentionally controlled.
// -----------------------------------------------------------------------------
const mixLine = "Local state for UX; Actions for submit/mutation pipeline.";

// -----------------------------------------------------------------------------
// Q29: [MID] TypeScript — props typing basics
//
// In simple words:
// Explicit props type/interface is best practice. React.FC optional — children
// avoid the old implicit children pattern unless needed.
// Optional props: prop?: string. Union: variant: 'sm' | 'lg'.
// -----------------------------------------------------------------------------
/** @typedef {{ label: string; onClick?: () => void; disabled?: boolean }} ButtonProps */
function TypedButton({ label, onClick, disabled = false }) {
  return (
    <button type="button" onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}

// -----------------------------------------------------------------------------
// Q30: [MID] TypeScript — events, useRef, generic list
//
// In simple words:
// onChange: ChangeEvent<HTMLInputElement>. Ref: useRef<HTMLInputElement>(null).
// Generic: function List<T>({ items, render }: { items: T[]; render: (x: T) => ReactNode })
// as const for literal unions. Discriminated unions for modal state.
// -----------------------------------------------------------------------------
export function TypedInput() {
  const inputRef = useRef(null);
  const [text, setText] = useState("");
  return (
    <input
      ref={inputRef}
      value={text}
      onChange={(e) => setText(e.target.value)}
    />
  );
}

// -----------------------------------------------------------------------------
// Q31: [MID] Accessibility quick hits
//
// In simple words:
// Semantic HTML first: button, nav, main, label htmlFor.
// Icon-only button → aria-label. Modal → focus trap + Esc close.
// Keyboard: Tab order logical; custom widgets → role + key handlers.
// Color contrast + don't rely on color alone. Live regions for toasts.
// -----------------------------------------------------------------------------
export function A11yIconButton({ onClick, label }) {
  return (
    <button type="button" aria-label={label} onClick={onClick}>
      ×
    </button>
  );
}

// -----------------------------------------------------------------------------
// Q32: [MID] Zustand vs Context — when to use which?
//
// In simple words:
// Context: theme, locale, auth shell — low change, tree-wide read.
// Zustand/Redux: frequent updates, many selectors, outside-React reads.
// Context re-renders all consumers on every value change (unless you split).
// Zustand = subscribe slice-wise → fewer unnecessary renders.
// Small app + simple global → Context OK. Cart/filters/realtime → store.
// -----------------------------------------------------------------------------
const zustandVsContext =
  "Context for low-churn config; Zustand when many components need selective fast updates.";

// -----------------------------------------------------------------------------
// Q33: [MID] React Hook Form + Zod
//
// In simple words:
// RHF = uncontrolled default, register/ref, fewer re-renders on keystroke.
// zodResolver(schema) → typed errors; schema single source of truth.
// Server errors → setError('root' | field). defaultValues for reset.
// Large forms: Controller only where controlled widget is needed (MUI date).
// -----------------------------------------------------------------------------
const rhfZodPattern = `
const schema = z.object({ email: z.string().email(), age: z.coerce.number().min(18) });
const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) });
`;

// -----------------------------------------------------------------------------
// Q34: [ADV] React Router loaders / data routers
//
// In simple words:
// loader fetches data on route enter — before component render.
// defer() + Suspense → critical fast, slow stream. action for mutations.
// shouldRevalidate control stale refetch. ErrorBoundary + errorElement.
// vs useEffect fetch: no spinner flash, parallel routes, redirect in loader.
// -----------------------------------------------------------------------------
const loaderLine =
  "Loader runs before render; defer splits critical vs slow; action handles form POST.";

// -----------------------------------------------------------------------------
// Q35: [ADV] startTransition vs useDeferredValue — deep
//
// In simple words:
// startTransition: YOU mark state update non-urgent (setState inside).
// useDeferredValue: defer DISPLAY of already-urgent state (prop/value lag).
// Typing filter: setQ urgent + startTransition filter OR defer deferredQ.
// deferredValue can look stale — check isPending/deferred !== value.
// Both are concurrent features; choose based on who owns the update.
// -----------------------------------------------------------------------------
export function DeferredSearch({ query, items }) {
  const deferredQuery = useDeferredValue(query);
  const isStale = deferredQuery !== query;
  const shown = useMemo(
    () => items.filter((x) => x.includes(deferredQuery)),
    [items, deferredQuery]
  );
  return (
    <ul style={{ opacity: isStale ? 0.6 : 1 }}>
      {shown.map((x) => (
        <li key={x}>{x}</li>
      ))}
    </ul>
  );
}

// -----------------------------------------------------------------------------
// Q36: [MID] Class lifecycle → hooks map
//
// In simple words:
// constructor/state init → useState initial
// componentDidMount → useEffect([], ...)
// componentDidUpdate → useEffect([deps], ...) — specific deps, not "everything"
// componentWillUnmount → useEffect return cleanup
// shouldComponentUpdate → React.memo / PureComponent
// getDerivedStateFromProps → derive render me; key reset pattern
// componentDidCatch → Error Boundary class (still class-only API)
// -----------------------------------------------------------------------------
const lifecycleMap = {
  mount: "useEffect(() => {}, [])",
  update: "useEffect(() => {}, [dep])",
  unmount: "useEffect(() => () => cleanup, [])",
  memo: "memo(Component)",
  error: "class ErrorBoundary",
};

// -----------------------------------------------------------------------------
// Q37: [MID] Auth token storage — interview security
//
// In simple words:
// localStorage can be stolen via XSS — avoid sensitive long-lived tokens.
// httpOnly Secure SameSite cookie = refresh token sweet spot (JS cannot read).
// Access token memory-only / short TTL; BFF pattern extra layer.
// Never put token in URL/hash. CSRF: SameSite + token header for cookie auth.
// Do not say "localStorage is easy" as a production-safe answer.
// -----------------------------------------------------------------------------
const authStorageLine =
  "httpOnly cookie for refresh; short-lived access in memory; localStorage = XSS risk.";

// -----------------------------------------------------------------------------
// Q38: [MID] React 19 Actions vs React Hook Form
//
// In simple words:
// RHF: complex client validation, field-level UX, 50+ fields, MUI integration.
// Actions: native form submit, FormData, server mutations, progressive enhancement.
// Mix: RHF handleSubmit → build FormData → call server action.
// Actions do not replace RHF — overlap on submit pipeline. Pick by form complexity.
// useActionState pending vs RHF isSubmitting — similar mental model.
// -----------------------------------------------------------------------------
const actionsVsRhf =
  "RHF for rich client forms; Actions for server-first submit; combine when needed.";

// -----------------------------------------------------------------------------
// Q39: [MID] Testing Library — getByRole first
//
// In simple words:
// Query priority: getByRole > label > placeholder > text > testId (last resort).
// getByRole('button', { name: /save/i }) = user + a11y aligned.
// userEvent over fireEvent for realistic clicks/type.
// findBy* async; waitFor transitions. within() scope nested widgets.
// Do not test implementation details (class, internal state) — test behavior.
// -----------------------------------------------------------------------------
const rtlQueryLine =
  "getByRole('textbox', { name: 'Email' }) beats getByTestId('email-input').";

// -----------------------------------------------------------------------------
// Q40: [MID] Hydration mismatch — why does it happen, fix?
//
// In simple words:
// Server HTML ≠ client first render → React warns + re-renders client side.
// Culprits: Date.now(), Math.random(), window/localStorage in render,
// invalid HTML nesting (p inside p), browser extensions.
// Fix: useEffect for client-only bits; suppressHydrationWarning sparingly on
// known diffs (timestamp). Ensure same deterministic output in SSR.
// -----------------------------------------------------------------------------
const hydrationLine =
  "Render same on server and client; defer browser-only values to useEffect.";

// -----------------------------------------------------------------------------
// Q41: [ADV] Keys + state — checkbox reorder horror story
//
// In simple words:
// Todo list: checkbox + text, key={index}. Reorder/delete → checked state
// shifts to wrong row (React reused DOM node by wrong identity).
// Fix: key={item.id}. Form reset per item: key={`${id}-${version}`}.
// Anti-pattern: key={Math.random()} — remount every render, state/focus lost.
// -----------------------------------------------------------------------------
export function CheckableList({ items }) {
  return items.map((item) => (
    <label key={item.id}>
      <input type="checkbox" defaultChecked={item.done} />
      {item.text}
    </label>
  ));
}

// -----------------------------------------------------------------------------
// Q42: [MID] Composition vs inheritance
//
// In simple words:
// In React avoid inheritance — components compose. children, render props,
// slots (header/footer props), compound components (Tabs.Tab).
// "Is-a" Button extends Input ❌. "Has-a" Card with actions prop ✅.
// HOC / wrappers are legacy; hooks + composition preferred today.
// -----------------------------------------------------------------------------
function Card({ title, children, footer }) {
  return (
    <section>
      <h2>{title}</h2>
      <div>{children}</div>
      {footer}
    </section>
  );
}

// -----------------------------------------------------------------------------
// Q43: [ADV] Controlled forms at scale
//
// In simple words:
// 50 fields with pure useState = prop drilling + re-render storm.
// Patterns: useReducer single form state; RHF register; Formik less common now.
// Field components wrap register + error display. Schema validation (Zod).
// Split wizard steps — unmount step = consider persist or keep mounted hidden.
// Server Actions per step vs one big submit — UX + validation boundaries.
// -----------------------------------------------------------------------------
const scaledFormLine =
  "RHF/reducer + schema + field components; avoid 50 useState hooks.";

// -----------------------------------------------------------------------------
// Q44: [MID] Performance profiling — interview answers
//
// In simple words:
// React DevTools Profiler: record interaction, flamegraph, "why did this render?"
// Rank commit duration — optimize slowest first. Do not memo blindly.
// Chrome Performance + React profiler combined for long tasks.
// Lighthouse ≠ React perf; use for load metrics. Web Vitals INP/LCP.
// Profile production build — dev Strict Mode double render is misleading.
// -----------------------------------------------------------------------------
export const profilingSteps = [
  "reproduce slow interaction",
  "Profiler record",
  "find hot components",
  "fix state location or memo after proof",
  "re-profile",
];

// -----------------------------------------------------------------------------
// Q45: [ADV] Fiber / reconciliation one-liners
//
// In simple words:
// Fiber = unit of work node (type, props, child/sibling, alternate).
// Reconciliation = diff old vs new tree → minimal DOM ops.
// Render phase pure; commit phase DOM mutate + effects run.
// Concurrent: work interruptible, priorities, lanes. Not "VDOM always fast."
// key helps sibling identity; without key React may match by index wrongly.
// -----------------------------------------------------------------------------
const fiberLines = [
  "Fiber = work unit with alternate for double buffering",
  "Render computes changes; commit applies to DOM",
  "Keys tell React which list item is which identity",
];

// -----------------------------------------------------------------------------
// Q46: [ADV] Suspense boundaries — design
//
// In simple words:
// Boundary = loading fallback when child suspends (lazy, use(promise), RSC stream).
// Granular boundaries: sidebar fast, main skeleton — not one whole page spinner.
// Nested Suspense: outer coarse, inner fine. ErrorBoundary sibling/alternate tree.
// resetKeys remount on route change. Streaming SSR: shell first, holes fill later.
// Don't wrap everything — intentional UX per section.
// -----------------------------------------------------------------------------
const suspenseDesign =
  "Small boundaries near slow data; page-level spinner only when whole page waits.";

// -----------------------------------------------------------------------------
// Q47: [ADV] Server vs Client Component decision tree
//
// In simple words:
// Server default (Next App Router): DB, secrets, heavy libs, zero JS to client.
// Client ('use client'): useState, useEffect, onClick, browser APIs, most 3rd party UI.
// Pass serializable props only — no functions/classes server→client.
// Composition: Server wraps Client; children trick for slotting client inside server.
// Boundary cost: 'use client' file + imports go in bundle — keep at leaves.
// -----------------------------------------------------------------------------
const rscDecisionTree = `
Need interactivity/hooks/browser? → Client
Need DB/secrets/large dep server-side? → Server
Both? → Server parent fetches, pass data to Client child island
`;

// -----------------------------------------------------------------------------
// Quick revise map (files)
// 28 overview → 29-32 forms/optimistic → 33 use → 34 ref → 35 head
// → 36 context → 37-38 RSC/actions → 39 compiler/EffectEvent → 40 this file (47 Qs)
// -----------------------------------------------------------------------------
export const reviseOrder = [28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40];

/** Total interview questions in this file (Q1–Q47). */
export const midLevelQuestionCount = 47;
