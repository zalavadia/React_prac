// ============================================================================
// 40 — Mid-Level React Interview Questions (Hinglish dump) — 47 Qs
// Level: INTERVIEW  |  Sequence seekho: pehle React19 files, phir yeh revise
// ============================================================================
//
// LAYMAN: Yeh file RUNBOOK hai mid React interviews ke liye —
// hooks rules, keys, batching, stale closures, Virtual DOM myth,
// useEffect deps, performance, React 19 Actions vs purane submit handlers.
//
// Har Q: Seedha matlab + chhota code jahan useful.
// [MID] = typical mid-level depth. Ratta mat — soch ke bolo.
//
// KYUN: Ek jagah revise; baaki files me depth.
// INTERVIEW: Clear Hinglish/English mix OK — concepts precise.
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
// Q1: [MID] Rules of Hooks kya hain?
//
// Seedha matlab:
// 1) Sirf React function components / custom hooks ke top-level pe call.
// 2) Loops, conditions, nested functions me ordinary hooks mat.
// 3) Order har render same rehna chahiye — React hooks list pe depend.
// Exception: React 19 ka `use()` conditional context/promise allow (file 33).
// -----------------------------------------------------------------------------
function BadHooks({ flag }) {
  // if (flag) useState(0); // ❌
  const [n, setN] = useState(0); // ✅ always
  return <button onClick={() => setN(n + 1)}>{n}</button>;
}

// -----------------------------------------------------------------------------
// Q2: [MID] List me key kyun? index kab avoid?
//
// Seedha matlab:
// key = identity across reorders. Galat key = state galat item pe chipak.
// index key OK static list; avoid jab insert/delete/reorder + item state.
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
// Q3: [MID] setState async / batching?
//
// Seedha matlab:
// React 18+ mostly automatic batching — ek event me multiple setState
// ek re-render. Turant purana state mat expect.
// Next value chahiye → functional updater setN(n => n+1).
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
// Seedha matlab:
// Handler ne purana count close kiya. setCount(count+1) stale ho sakta.
// Fix: functional update, ya ref for latest, ya EffectEvent (19.2) patterns.
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
// Q5: [MID] Virtual DOM myth — "Virtual DOM fast isliye React fast"?
//
// Seedha matlab:
// VDOM = UI ka JS object snapshot; diff se kam DOM updates decide.
// Fast ka asli game: predictable update model, batching, concurrent,
// avoiding unnecessary work — sirf "VDOM magic" nahi.
// Svelte/Solid bina classic VDOM bhi fast. Nuanced answer do.
// -----------------------------------------------------------------------------
const vdomAnswer =
  "VDOM is a strategy, not the only reason React apps feel fast; avoid unnecessary renders too.";

// -----------------------------------------------------------------------------
// Q6: [MID] useEffect deps — empty vs missing vs full
//
// Seedha matlab:
// [] = mount/unmount sync (subscribe once).
// [id] = jab id change, re-run.
// Missing dep = stale bug. Extra dep = extra runs.
// Derive during render jab ho sake — effect se state copy mat.
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
// Seedha matlab:
// Controlled: value + onChange (React state source).
// Uncontrolled: defaultValue + ref / FormData (DOM source).
// React 19 Actions often FormData/uncontrolled-friendly.
// -----------------------------------------------------------------------------
export function Controlled({ value, onChange }) {
  return <input value={value} onChange={(e) => onChange(e.target.value)} />;
}

// -----------------------------------------------------------------------------
// Q8: [MID] Lifting state up kab?
//
// Seedha matlab:
// Jab do children same data share / sync. Parent owner.
// Over-lift mat karo — prop drilling → Context / composition.
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
// Seedha matlab:
// Expensive calc; ya referential equality for memoized child deps.
// Default har jagah mat chipkao — measure / compiler (file 39).
// -----------------------------------------------------------------------------
export function Filtered({ items, query }) {
  const filtered = useMemo(
    () => items.filter((x) => x.includes(query)),
    [items, query]
  );
  return <div>{filtered.length}</div>;
}

// -----------------------------------------------------------------------------
// Q10: [MID] React.memo kya karta?
//
// Seedha matlab:
// Shallow props compare — same props pe re-render skip (usually).
// Parent re-render ≠ child re-render agar memo + stable props.
// Callbacks unstable → memo tod — useCallback / compiler.
// -----------------------------------------------------------------------------
export const Row = memo(function Row({ label }) {
  return <div>{label}</div>;
});

// -----------------------------------------------------------------------------
// Q11: [MID] useRef vs useState
//
// Seedha matlab:
// ref change re-render nahi karta. DOM handles, timers, latest values.
// State = UI me dikhana. Render ke dauran ref.current padh ke UI decide risky.
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
// Seedha matlab:
// Subscribe kiya to unsubscribe. Timers clear. Stale fetch ignore.
// Strict Mode dev me mount→unmount→remount — cleanup sahi hona chahiye.
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
// Seedha matlab:
// Do inputs list — key=index, pehla delete → doosre ka text pehle pe aa sakta.
// Stable id keys + remount via key={id} jab form reset chahiye.
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
// Seedha matlab:
// setUser me user.name = x; setUser(user) — same reference, miss updates.
// Naya object: setUser({ ...user, name: x }).
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
// Seedha matlab:
// Ek bada value object change → saare consumers re-render.
// Split context; pass stable dispatch; children composition.
// React 19: <Ctx value={...}> syntax (file 36) — problem same.
// -----------------------------------------------------------------------------
const tip = "Split frequently-changing state from static config in context.";

// -----------------------------------------------------------------------------
// Q16: [MID] Error Boundaries kya catch karti?
//
// Seedha matlab:
// Render/lifecycle errors children me. Event handlers / async khud try/catch.
// Suspense alag (loading). Rejected use(promise) → boundary.
// -----------------------------------------------------------------------------
const errorBoundaryNote =
  "Boundaries catch render errors; not click handlers or setTimeout unless rethrown to render.";

// -----------------------------------------------------------------------------
// Q17: [MID] Concurrent / startTransition kab?
//
// Seedha matlab:
// Urgent: typing input. Non-urgent: filter huge list.
// startTransition se input snappy, list peeche update.
// isPending se pending UI.
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
// Seedha matlab:
// Old: onSubmit → preventDefault → manual loading/error state.
// New: action={async (formData)=>...} + useActionState / useFormStatus.
// Old ab bhi valid. Actions = FormData-first + pending integration.
// Server Actions ('use server') mutations server pe (file 38).
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
// Seedha matlab:
// Pehle UI update, server baad me; fail pe base state pe rollback.
// Low-risk actions (likes). Payments pe conservative raho.
// -----------------------------------------------------------------------------
const optimisticLine =
  "Show success instantly; reconcile with server; roll back on failure.";

// -----------------------------------------------------------------------------
// Q20: [MID] use() hook rules
//
// Seedha matlab:
// use(promise) Suspense; use(context) conditional OK.
// Baaki hooks top-level. Promise identity stable.
// -----------------------------------------------------------------------------
const useHookLine =
  "use unwraps promise/context; conditional OK for use; cache promises.";

// -----------------------------------------------------------------------------
// Q21: [MID] forwardRef ab?
//
// Seedha matlab:
// React 19: ref normal prop. forwardRef legacy/compat.
// useImperativeHandle limited parent API.
// -----------------------------------------------------------------------------
function Input19({ ref, ...rest }) {
  return <input ref={ref} {...rest} />;
}

// -----------------------------------------------------------------------------
// Q22: [MID] CSR fetch waterfall vs RSC
//
// Seedha matlab:
// Client mount → spinner → fetch → nested fetch = waterfall.
// Server Components await tree pe parallelize / closer to data.
// Hybrid: server initial + client interactivity.
// -----------------------------------------------------------------------------
const rscLine =
  "RSC moves initial data work to server; client for interaction islands.";

// -----------------------------------------------------------------------------
// Q23: [MID] Why not put everything in useEffect?
//
// Seedha matlab:
// Effects = sync external system (DOM, network subscription, widgets).
// Derived values → render me calculate.
// Reset state jab prop change → key remount pattern often cleaner.
// -----------------------------------------------------------------------------
export function FullName({ first, last }) {
  // ❌ useEffect sync full from first/last
  const full = first + " " + last; // ✅
  return <span>{full}</span>;
}

// -----------------------------------------------------------------------------
// Q24: [MID] Strict Mode double invoke — bug ya feature?
//
// Seedha matlab:
// Dev me effects setup/cleanup/setup — impure effects pakadne ke liye.
// Production me double nahi. Cleanup sahi likho.
// -----------------------------------------------------------------------------
const strictLine =
  "Dev double-mount finds missing cleanup; write effects idempotent.";

// -----------------------------------------------------------------------------
// Q25: [MID] Performance checklist (bolke sunao)
//
// Seedha matlab:
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
// Seedha matlab:
// react-dom se; nearest parent form; form ke child component me call.
// Same component jo <form> likhe wahan mat.
// -----------------------------------------------------------------------------
const formStatusLine =
  "useFormStatus in child of form; import from react-dom.";

// -----------------------------------------------------------------------------
// Q27: [MID] useEffectEvent (19.2) — trap question
//
// Seedha matlab:
// Latest props in event inside effect WITHOUT adding them as deps.
// NOT for hiding required deps (fetch userId must stay in deps).
// -----------------------------------------------------------------------------
const effectEventLine =
  "EffectEvent = non-reactive read in effect events; not eslint-disable.";

// -----------------------------------------------------------------------------
// Q28: [MID] Controlled form + Action mix advice
//
// Seedha matlab:
// Live validation → local useState.
// Submit mutation → action / server action.
// Don't fight FormData — name attributes rakho ya intentionally controlled.
// -----------------------------------------------------------------------------
const mixLine = "Local state for UX; Actions for submit/mutation pipeline.";

// -----------------------------------------------------------------------------
// Q29: [MID] TypeScript — props typing basics
//
// Seedha matlab:
// Explicit props type/interface best practice. React.FC optional — children
// implicit wala purana pattern avoid karo unless chahiye.
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
// Seedha matlab:
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
// Seedha matlab:
// Semantic HTML pehle: button, nav, main, label htmlFor.
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
// Q32: [MID] Zustand vs Context — kab kya?
//
// Seedha matlab:
// Context: theme, locale, auth shell — kam change, tree-wide read.
// Zustand/Redux: frequent updates, many selectors, outside-React reads.
// Context har value change pe saare consumers re-render (split mat karo to).
// Zustand = subscribe slice-wise → kam unnecessary renders.
// Small app + simple global → Context OK. Cart/filters/realtime → store.
// -----------------------------------------------------------------------------
const zustandVsContext =
  "Context for low-churn config; Zustand when many components need selective fast updates.";

// -----------------------------------------------------------------------------
// Q33: [MID] React Hook Form + Zod
//
// Seedha matlab:
// RHF = uncontrolled default, register/ref, kam re-renders on keystroke.
// zodResolver(schema) → typed errors; schema single source of truth.
// Server errors → setError('root' | field). defaultValues reset ke liye.
// Large forms: Controller sirf jahan controlled widget chahiye (MUI date).
// -----------------------------------------------------------------------------
const rhfZodPattern = `
const schema = z.object({ email: z.string().email(), age: z.coerce.number().min(18) });
const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) });
`;

// -----------------------------------------------------------------------------
// Q34: [ADV] React Router loaders / data routers
//
// Seedha matlab:
// loader route enter pe data fetch — component render se pehle.
// defer() + Suspense → critical fast, slow stream. action for mutations.
// shouldRevalidate control stale refetch. ErrorBoundary + errorElement.
// vs useEffect fetch: no spinner flash, parallel routes, redirect in loader.
// -----------------------------------------------------------------------------
const loaderLine =
  "Loader runs before render; defer splits critical vs slow; action handles form POST.";

// -----------------------------------------------------------------------------
// Q35: [ADV] startTransition vs useDeferredValue — deep
//
// Seedha matlab:
// startTransition: YOU mark state update non-urgent (setState inside).
// useDeferredValue: defer DISPLAY of already-urgent state (prop/value lag).
// Typing filter: setQ urgent + startTransition filter OR defer deferredQ.
// deferredValue stale dikha sakta — isPending/deferred !== value check.
// Dono concurrent; choose based on who owns the update.
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
// Seedha matlab:
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
// Seedha matlab:
// localStorage XSS pe steal ho sakta — sensitive long-lived token avoid.
// httpOnly Secure SameSite cookie = refresh token sweet spot (JS read nahi).
// Access token memory-only / short TTL; BFF pattern extra layer.
// Never URL/hash me token. CSRF: SameSite + token header for cookie auth.
// "localStorage easy" ≠ production-safe answer bolo.
// -----------------------------------------------------------------------------
const authStorageLine =
  "httpOnly cookie for refresh; short-lived access in memory; localStorage = XSS risk.";

// -----------------------------------------------------------------------------
// Q38: [MID] React 19 Actions vs React Hook Form
//
// Seedha matlab:
// RHF: complex client validation, field-level UX, 50+ fields, MUI integration.
// Actions: native form submit, FormData, server mutations, progressive enhancement.
// Mix: RHF handleSubmit → build FormData → call server action.
// Actions replace RHF nahi — overlap submit pipeline pe. Pick by form complexity.
// useActionState pending vs RHF isSubmitting — similar mental model.
// -----------------------------------------------------------------------------
const actionsVsRhf =
  "RHF for rich client forms; Actions for server-first submit; combine when needed.";

// -----------------------------------------------------------------------------
// Q39: [MID] Testing Library — getByRole first
//
// Seedha matlab:
// Query priority: getByRole > label > placeholder > text > testId (last resort).
// getByRole('button', { name: /save/i }) = user + a11y aligned.
// userEvent over fireEvent for realistic clicks/type.
// findBy* async; waitFor transitions. within() scope nested widgets.
// Implementation details (class, internal state) test mat — behavior test.
// -----------------------------------------------------------------------------
const rtlQueryLine =
  "getByRole('textbox', { name: 'Email' }) beats getByTestId('email-input').";

// -----------------------------------------------------------------------------
// Q40: [MID] Hydration mismatch — kyun hota, fix?
//
// Seedha matlab:
// Server HTML ≠ client first render → React warn + re-render client side.
// Culprits: Date.now(), Math.random(), window/localStorage in render,
// invalid HTML nesting (p inside p), browser extensions.
// Fix: useEffect for client-only bits; suppressHydrationWarning sparingly on
// known diffs (timestamp). SSR me same deterministic output ensure karo.
// -----------------------------------------------------------------------------
const hydrationLine =
  "Render same on server and client; defer browser-only values to useEffect.";

// -----------------------------------------------------------------------------
// Q41: [ADV] Keys + state — checkbox reorder horror story
//
// Seedha matlab:
// Todo list: checkbox + text, key={index}. Reorder/delete → checked state
// galat row pe shift (React reused DOM node by wrong identity).
// Fix: key={item.id}. Form reset per item: key={`${id}-${version}`}.
// Anti-pattern: key={Math.random()} — har render remount, state/focus lost.
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
// Seedha matlab:
// React me inheritance avoid — components compose. children, render props,
// slots (header/footer props), compound components (Tabs.Tab).
// "Is-a" Button extends Input ❌. "Has-a" Card with actions prop ✅.
// HOC / wrappers legacy; hooks + composition preferred today.
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
// Seedha matlab:
// 50 fields pure useState = prop drilling + re-render storm.
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
// Seedha matlab:
// React DevTools Profiler: record interaction, flamegraph, "why did this render?"
// Commit duration rank karo — optimize slowest first. Don't memo blind.
// Chrome Performance + React profiler combined for long tasks.
// Lighthouse ≠ React perf; use for load metrics. Web Vitals INP/LCP.
// Production build profile karo — dev Strict Mode double render misleading.
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
// Seedha matlab:
// Fiber = unit of work node (type, props, child/sibling, alternate).
// Reconciliation = diff old vs new tree → minimal DOM ops.
// Render phase pure; commit phase DOM mutate + effects run.
// Concurrent: work interruptible, priorities, lanes. Not "VDOM always fast."
// key helps sibling identity; without key React index match kar sakta wrong.
// -----------------------------------------------------------------------------
const fiberLines = [
  "Fiber = work unit with alternate for double buffering",
  "Render computes changes; commit applies to DOM",
  "Keys tell React which list item is which identity",
];

// -----------------------------------------------------------------------------
// Q46: [ADV] Suspense boundaries — design
//
// Seedha matlab:
// Boundary = loading fallback jab child suspend (lazy, use(promise), RSC stream).
// Granular boundaries: sidebar fast, main skeleton — ek poora page spinner mat.
// Nested Suspense: outer coarse, inner fine. ErrorBoundary sibling/alternate tree.
// resetKeys remount on route change. Streaming SSR: shell first, holes fill later.
// Don't wrap everything — intentional UX per section.
// -----------------------------------------------------------------------------
const suspenseDesign =
  "Small boundaries near slow data; page-level spinner only when whole page waits.";

// -----------------------------------------------------------------------------
// Q47: [ADV] Server vs Client Component decision tree
//
// Seedha matlab:
// Server default (Next App Router): DB, secrets, heavy libs, zero JS to client.
// Client ('use client'): useState, useEffect, onClick, browser APIs, most 3rd party UI.
// Pass serializable props only — functions/classes server→client nahi.
// Composition: Server wraps Client; children trick for slotting client inside server.
// Boundary cost: 'use client' file + imports bundle me aate hain — leaf pe rakho.
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
