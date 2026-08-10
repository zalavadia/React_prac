// ============================================================================
// 45 — Concurrent React: useTransition, useDeferredValue, startTransition
// Level: MID–ADV  |  Sequence: after 24 (perf), then this
// ============================================================================
//
// SIMPLE: Concurrent React = interrupt the UI to show urgent work first.
// Keep typing snappy; heavy filter/list updates in the background — user feels no lag.
// useTransition / startTransition = "this update is non-urgent".
// useDeferredValue = show a slightly older version of the value when the new one is slow.
//
// WHY: Big lists, tab switches, search — don't freeze the input.
// INTERVIEW: urgent vs transition; transition vs deferred; flushSync contrast;
// transitions don't increase speed — they improve responsiveness.
// Use in Vite/React 19 project — teaching file.
//
// ============================================================================

import {
  useState,
  useTransition,
  useDeferredValue,
  useMemo,
  memo,
  Suspense,
  startTransition,
  useRef,
} from "react";
import { flushSync } from "react-dom";

// -----------------------------------------------------------------------------
// Q1: useTransition — isPending + startTransition basics
//
// Task:
// Wrap non-urgent state updates with the hook; show pending UI.
//
// In simple words:
// [isPending, startTransition] = useTransition().
// startTransition(() => setHeavy(...)) — React handles urgent things like input first.
// isPending is true when the transition render is not complete yet.
// -----------------------------------------------------------------------------
export function SearchWithTransition({ allItems }) {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState(allItems);
  const [isPending, startTransition] = useTransition();

  function onChange(e) {
    const q = e.target.value;
    setQuery(q); // urgent — input updates immediately
    startTransition(() => {
      setFiltered(allItems.filter((item) => item.includes(q))); // non-urgent
    });
  }

  return (
    <div>
      <input value={query} onChange={onChange} placeholder="Search..." />
      {isPending && <span aria-live="polite">Updating…</span>}
      <ul>
        {filtered.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q2: startTransition import from 'react' (non-hook)
//
// Task:
// Mark a transition outside the component / in a callback without a hook.
//
// In simple words:
// useTransition only inside a component. startTransition() anywhere —
// event handler, utility, inside setTimeout.
// Same priority marking; you need the hook for isPending.
// -----------------------------------------------------------------------------
let externalItems = ["apple", "banana", "cherry"];

export function applyFilterOutside(setFiltered, q) {
  startTransition(() => {
    setFiltered(externalItems.filter((x) => x.includes(q)));
  });
}

export function ExternalTransitionDemo() {
  const [q, setQ] = useState("");
  const [list, setList] = useState(externalItems);
  return (
    <input
      value={q}
      onChange={(e) => {
        const v = e.target.value;
        setQ(v);
        applyFilterOutside(setList, v);
      }}
    />
  );
}

// -----------------------------------------------------------------------------
// Q3: useDeferredValue — defer slow re-render
//
// Task:
// Keep fast input state; feed the heavy child with a deferred copy.
//
// In simple words:
// const deferredQuery = useDeferredValue(query).
// When query changes, deferred can lag slightly behind —
// one more render with the old value (stale UI briefly OK).
// Pass deferred prop to child — less need for startTransition in parent.
// -----------------------------------------------------------------------------
function SlowList({ query }) {
  const items = useMemo(() => {
    const big = Array.from({ length: 8000 }, (_, i) => `row-${i}`);
    return big.filter((r) => r.includes(query));
  }, [query]);
  return <p>{items.length} matches</p>;
}

export function DeferredSearch() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const isStale = query !== deferredQuery;

  return (
    <div style={{ opacity: isStale ? 0.6 : 1 }}>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <SlowList query={deferredQuery} />
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q4: Transition vs useDeferredValue — when to use which?
//
// Task:
// Both do non-urgent work; different APIs — choose by shape of problem.
//
// In simple words:
// useTransition: you wrap setState yourself; you get isPending;
// multiple state updates in one transition.
// useDeferredValue: defer one value; pass to child as prop; "stale" visual is easy.
// Rule of thumb: you control state updates → transition; prop/value lag → deferred.
// Both together too (Q19).
// -----------------------------------------------------------------------------
const transitionVsDeferred =
  "Transition = mark updates non-urgent + pending flag. Deferred = lag behind on a value.";

// -----------------------------------------------------------------------------
// Q5: Urgent vs non-urgent updates
//
// Task:
// Typing/click/scroll urgent; filter/chart/route change non-urgent.
//
// In simple words:
// Urgent = user needs instant feedback (controlled input value).
// Non-urgent = a little delay OK (10k list filter, tab content swap).
// Wrong split = typing also in transition → input feels sluggish.
// -----------------------------------------------------------------------------
export function UrgentNonUrgentSplit() {
  const [text, setText] = useState("");
  const [count, setCount] = useState(0);
  const [pending, startTransition] = useTransition();

  function onType(e) {
    setText(e.target.value); // urgent
    startTransition(() => {
      setCount(e.target.value.length); // non-urgent stats
    });
  }

  return (
    <>
      <input value={text} onChange={onType} />
      <small>{pending ? "…" : `${count} chars`}</small>
    </>
  );
}

// -----------------------------------------------------------------------------
// Q6: Search filter demo — full pattern
//
// Task:
// Input urgent; filter + sort in transition; pending + stale styling.
//
// In simple words:
// Classic interview demo. Expensive work inside the transition.
// Optional: results opacity when pending.
// -----------------------------------------------------------------------------
const CATALOG = Array.from({ length: 5000 }, (_, i) => `product-${i}`);

export function ProductSearch() {
  const [q, setQ] = useState("");
  const [results, setResults] = useState(CATALOG);
  const [isPending, startTransition] = useTransition();

  function handleSearch(value) {
    setQ(value);
    startTransition(() => {
      const next = CATALOG.filter((p) => p.includes(value)).sort();
      setResults(next);
    });
  }

  return (
    <section>
      <input value={q} onChange={(e) => handleSearch(e.target.value)} />
      <div style={{ opacity: isPending ? 0.5 : 1 }}>
        Showing {results.length} items
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------
// Q7: Tab switch with deferred content
//
// Task:
// Tab click urgent; render heavy panel with deferred value.
//
// In simple words:
// tab state changes instantly — highlight stays snappy.
// deferredTab = useDeferredValue(tab) for slow panel render.
// Old tab content shows briefly — acceptable for transitions.
// -----------------------------------------------------------------------------
const TAB_CONTENT = {
  home: "Light home",
  reports: Array.from({ length: 3000 }, (_, i) => `report-${i}`).join(" "),
  settings: "Settings form",
};

function HeavyPanel({ tab }) {
  const body = useMemo(() => TAB_CONTENT[tab] ?? "", [tab]);
  return <div className="panel">{typeof body === "string" ? body.slice(0, 200) : body}</div>;
}

export function DeferredTabs() {
  const [tab, setTab] = useState("home");
  const deferredTab = useDeferredValue(tab);
  const stale = tab !== deferredTab;

  return (
    <div>
      {["home", "reports", "settings"].map((t) => (
        <button key={t} onClick={() => setTab(t)} aria-pressed={tab === t}>
          {t}
        </button>
      ))}
      <div style={{ opacity: stale ? 0.5 : 1 }}>
        <HeavyPanel tab={deferredTab} />
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q8: Suspense + transition
//
// Task:
// Route/tab change in transition; Suspense fallback during suspend.
//
// In simple words:
// Transition updates make Suspense boundaries interruptible —
// old UI keeps showing while new chunk/data loads.
// startTransition(() => setTab('slow')) + <Suspense fallback=...>.
// Without transition, suspend = jarring replace.
// -----------------------------------------------------------------------------
function LazyChunk() {
  // teaching: imagine React.lazy component suspending here
  return <p>Loaded chunk content</p>;
}

export function SuspenseTransitionTabs() {
  const [tab, setTab] = useState("a");
  const [pending, startTransition] = useTransition();

  return (
    <div>
      <button
        onClick={() =>
          startTransition(() => {
            setTab("b");
          })
        }
      >
        Go slow tab {pending && "…"}
      </button>
      <Suspense fallback={<p>Loading tab…</p>}>
        <LazyChunk key={tab} />
      </Suspense>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q9: useTransition with router-ish navigate idea
//
// Task:
// Programmatic navigation non-urgent mark — pending spinner on link.
//
// In simple words:
// No direct integration in React Router; pattern:
// startTransition(() => navigate('/dashboard')).
// isPending for nav bar loading. Urgent: modal close; non-urgent: page swap.
// Same mental model for SPA route changes.
// -----------------------------------------------------------------------------
export function RouterishNavigate({ navigateFn }) {
  const [isPending, startTransition] = useTransition();

  function goDashboard() {
    startTransition(() => {
      navigateFn("/dashboard"); // pretend useNavigate()
    });
  }

  return (
    <button onClick={goDashboard} disabled={isPending}>
      {isPending ? "Navigating…" : "Dashboard"}
    </button>
  );
}

// -----------------------------------------------------------------------------
// Q10: isPending UI patterns
//
// Task:
// Spinner, opacity, disabled button, aria-busy — consistent pending UX.
//
// In simple words:
// 1) Inline "Updating…" text (accessible aria-live).
// 2) Results opacity 0.5 when pending.
// 3) Submit/nav button disabled + label change.
// 4) Skeleton same layout — less layout shift.
// isPending false when transition has committed (not same as data fetch).
// -----------------------------------------------------------------------------
export function PendingPatterns() {
  const [isPending, startTransition] = useTransition();
  const [page, setPage] = useState(1);

  return (
    <div aria-busy={isPending}>
      <button
        disabled={isPending}
        onClick={() => startTransition(() => setPage((p) => p + 1))}
      >
        {isPending ? "Loading page…" : "Next page"}
      </button>
      <article style={{ opacity: isPending ? 0.6 : 1 }}>Page {page}</article>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q11: Concurrent features history (React 18+)
//
// Task:
// Understand the timeline — interview "since when" questions.
//
// In simple words:
// React 18 (2022): createRoot, automatic batching, transitions, Suspense improvements.
// useTransition / useDeferredValue / startTransition public API.
// React 19: Actions often auto-transition; still same concurrent renderer core.
// No legacy createRoot = no concurrent features fully.
// Fiber (16+) laid the foundation; 18 made concurrent rendering user-facing.
// -----------------------------------------------------------------------------
const concurrentHistory = [
  "React 16 Fiber — foundation",
  "React 18 — createRoot, transitions, deferred values",
  "React 19 — Actions wrap updates in transition by default (forms)",
];

// -----------------------------------------------------------------------------
// Q12: Tearing — conceptual note
//
// Task:
// External store + concurrent render = inconsistent UI briefly — understand the concept.
//
// In simple words:
// Tearing = one part of screen has old data, another new (same render cycle mismatch).
// React state/context generally safe. Problem: mutable external store without sync.
// useSyncExternalStore (18) fix pattern for third-party stores.
// Transitions can make tearing more visible if store is not synced.
// -----------------------------------------------------------------------------
const tearingNote =
  "Concurrent render can pause/resume; external mutable stores need useSyncExternalStore to avoid torn UI.";

// -----------------------------------------------------------------------------
// Q13: flushSync — when NOT concurrent
//
// Task:
// Sometimes need instant DOM sync — flushSync forces urgent.
//
// In simple words:
// flushSync(() => setState()) — React renders + commits now (sync).
// Use rare: third-party lib needs to measure DOM immediately, focus after insert.
// Overuse = concurrent benefits kill + perf hit.
// Opposite of transition — "don't wait for this".
// -----------------------------------------------------------------------------
export function MeasureAfterUpdate() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  function toggle() {
    flushSync(() => setOpen(true));
    // DOM is now updated — measure/focus safe
    ref.current?.focus();
  }

  return open ? <input ref={ref} /> : <button onClick={toggle}>Open</button>;
}

// -----------------------------------------------------------------------------
// Q14: startTransition in event handler vs setTimeout
//
// Task:
// Works in both places; preferred in event; also valid in setTimeout.
//
// In simple words:
// Event handler: startTransition(() => setX) — in React batching context.
// setTimeout: callback is separate task — still wrap with startTransition
// so resulting setState has transition priority.
// Trap: setTimeout without transition = not low priority, just runs later.
// -----------------------------------------------------------------------------
export function EventVsTimeout() {
  const [n, setN] = useState(0);
  const [isPending, startTransition] = useTransition();

  function onClickEvent() {
    startTransition(() => setN((x) => x + 1));
  }

  function onClickDelayed() {
    setTimeout(() => {
      startTransition(() => setN((x) => x + 100));
    }, 0);
  }

  return (
    <>
      <button onClick={onClickEvent}>+1 transition</button>
      <button onClick={onClickDelayed}>+100 after timeout</button>
      {isPending && "pending"} {n}
    </>
  );
}

// -----------------------------------------------------------------------------
// Q15: Nested transitions
//
// Task:
// Transition inside transition — understand outer pending behavior.
//
// In simple words:
// Nested startTransition usually merges into outer transition —
// one transition track (implementation detail, behavior: non-urgent).
// Don't think deep nesting — one meaningful transition boundary is enough.
// isPending true if any transition in tree pending (same hook instance).
// -----------------------------------------------------------------------------
export function NestedTransitions() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [pending, startTransition] = useTransition();

  function run() {
    startTransition(() => {
      setA(1);
      startTransition(() => {
        setB(2);
      });
    });
  }

  return (
    <button onClick={run}>
      {pending ? "…" : `${a}-${b}`}
    </button>
  );
}

// -----------------------------------------------------------------------------
// Q16: Performance myth — transitions don't increase speed
//
// Task:
// Interview trap: "transition made filter fast" — wrong.
//
// In simple words:
// Same CPU work happens — just different scheduling: interrupt for urgent.
// 10k filter is still 10k filter — virtualize / Web Worker is separate topic.
// Transition = responsiveness (input smooth), not shorter Big-O.
// Measure: INP, typing latency — not total filter ms alone.
// -----------------------------------------------------------------------------
const perfTruth =
  "Transitions improve perceived responsiveness by prioritizing urgent updates; they do not reduce total computation.";

// -----------------------------------------------------------------------------
// Q17: Interview traps (common wrong answers)
//
// Task:
// Remember wrong claims so you avoid them.
//
// In simple words:
// Trap 1: "Every setState in transition" — input sluggish.
// Trap 2: "useDeferredValue same as debounce" — no fixed delay; React scheduler.
// Trap 3: "isPending = fetch loading" — only transition render pending.
// Trap 4: "Concurrent = parallel threads" — mostly cooperative scheduling in JS.
// Trap 5: "SSR transitions matter the same" — mostly client hydration/interaction.
// -----------------------------------------------------------------------------
export const interviewTraps = [
  "Don't wrap typing state in transition",
  "Deferred ≠ debounce (no fixed ms)",
  "isPending ≠ useFetch loading",
  "Concurrent ≠ multithreading by default",
];

// -----------------------------------------------------------------------------
// Q18: React 19 Actions — automatic transitions note
//
// Task:
// Form actions / useActionState updates often already transition priority.
//
// In simple words:
// In React 19, action dispatch updates wrap in transition —
// form pending state + UI stays responsive.
// For old onSubmit + manual setState, consider startTransition yourself.
// See files 29–31 for Actions detail. Manual transition still valid for non-form UI.
// -----------------------------------------------------------------------------
async function saveAction(prev, formData) {
  await new Promise((r) => setTimeout(r, 300));
  return { ok: true, name: formData.get("name") };
}

// teaching note: useActionState(saveAction) in React 19 auto-transitions updates

// -----------------------------------------------------------------------------
// Q19: useDeferredValue + memo list combo
//
// Task:
// Memoized child + deferred prop — fewer unnecessary re-renders.
//
// In simple words:
// const MemoRows = memo(Rows).
// <MemoRows query={deferredQuery} /> — when deferred same, memo skips.
// Input updates fast; child updates when deferred catches up.
// Pair with useMemo inside child for heavy derive.
// -----------------------------------------------------------------------------
const MemoRows = memo(function Rows({ query, rows }) {
  const visible = useMemo(
    () => rows.filter((r) => r.includes(query)),
    [rows, query]
  );
  return <ul>{visible.slice(0, 50).map((r) => <li key={r}>{r}</li>)}</ul>;
});

export function DeferredMemoList({ rows }) {
  const [q, setQ] = useState("");
  const deferredQ = useDeferredValue(q);
  return (
    <>
      <input value={q} onChange={(e) => setQ(e.target.value)} />
      <MemoRows query={deferredQ} rows={rows} />
    </>
  );
}

// -----------------------------------------------------------------------------
// Q20: useTransition error handling
//
// Task:
// Throw/error inside transition — Error Boundary / recover pattern.
//
// In simple words:
// Render error — Error Boundary can still catch after transition.
// Event/async error not bound to transition — try/catch yourself.
// Retry: error boundary reset + state rollback manually.
// Suspense + error boundary are separate layers (file 20, 21).
// -----------------------------------------------------------------------------
function BuggyTransitionChild({ crash }) {
  if (crash) throw new Error("transition render failed");
  return <p>OK</p>;
}

export function TransitionErrorDemo() {
  const [crash, setCrash] = useState(false);
  const [pending, startTransition] = useTransition();

  return (
    <>
      <button
        onClick={() =>
          startTransition(() => {
            setCrash(true);
          })
        }
      >
        Trigger {pending && "…"}
      </button>
      <BuggyTransitionChild crash={crash} />
    </>
  );
}

// -----------------------------------------------------------------------------
// Q21: Throttle / debounce vs transition
//
// Task:
// Three different tools — when to use which.
//
// In simple words:
// Debounce: fire once after a fixed wait (API search 300ms).
// Throttle: max N calls per window (scroll handler).
// Transition: React render priority — no fixed timer; scheduler decides.
// Debounce for API calls; transition/deferred for heavy UI render.
// Combine: debounce fetch + transition for local filter OK.
// -----------------------------------------------------------------------------
const compareSchedule =
  "Debounce/throttle = rate-limit events. Transition = prioritize which React updates render first.";

// -----------------------------------------------------------------------------
// Q22: Practical checklist — when to use
//
// Task:
// Say the decision tree in an interview.
//
// In simple words:
// ✓ Heavy list/filter on typing → transition or deferred
// ✓ Tab/route swap with slow child → transition + Suspense
// ✓ Need pending UI flag → useTransition
// ✓ Value naturally flows as prop → useDeferredValue
// ✗ Simple forms / few items — YAGNI
// ✗ Network delay — use fetch pending, not isPending alone
// ✗ Need exact delay — debounce, not deferred
// -----------------------------------------------------------------------------
export const transitionChecklist = {
  useTransition: "you control multiple setStates + want isPending",
  useDeferredValue: "single value lags; pass to memo child",
  neither: "small tree, no jank measured",
  alsoConsider: "virtualize list, useMemo, Web Worker for CPU",
};

// -----------------------------------------------------------------------------
// Q23: Multiple setStates in one transition
//
// Task:
// Many updates in one startTransition — one pending, batched non-urgent.
//
// In simple words:
// startTransition(() => { setA(); setB(); setC(); }) — all non-urgent batch.
// Keep urgent input separate outside transition.
// Functional updaters safe inside transition.
// -----------------------------------------------------------------------------
export function MultiStateTransition() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("asc");
  const [pending, startTransition] = useTransition();

  function applyFilters(q) {
    setQuery(q);
    startTransition(() => {
      setPage(1);
      setSort(q.length > 3 ? "desc" : "asc");
    });
  }

  return (
    <div>
      <input onChange={(e) => applyFilters(e.target.value)} value={query} />
      {pending ? "Applying…" : `${sort} p${page}`}
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q24: Stale UI visual — deferred vs pending
//
// Task:
// stale from query !== deferredQuery; isPending is a separate signal.
//
// In simple words:
// Deferred: intentionally show old list when new render is busy.
// isPending: transition running — spinner/opacity.
// Both together: opacity + "Showing older results" banner.
// Keep UX honest — user understands data is catching up.
// -----------------------------------------------------------------------------
export function StaleVisualDemo() {
  const [q, setQ] = useState("");
  const deferredQ = useDeferredValue(q);
  const [pending, startTransition] = useTransition();

  function onChange(e) {
    const v = e.target.value;
    setQ(v);
    startTransition(() => {
      /* imagine extra state sync */
    });
  }

  const stale = q !== deferredQ;

  return (
    <div>
      <input value={q} onChange={onChange} />
      {stale && <p role="status">Results may be outdated…</p>}
      {pending && <p>Updating…</p>}
      <SlowList query={deferredQ} />
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q25: Concurrent rendering + Strict Mode / dev double render
//
// Task:
// Don't let extra renders in dev confuse transitions while debugging.
//
// In simple words:
// Strict Mode double invoke in dev — isPending may flicker briefly.
// Focus on production behavior. See transition marked renders in Profiler.
// createRoot required — ReactDOM.render legacy concurrent transitions limited.
// Teaching file: React 19 + createRoot assume.
// -----------------------------------------------------------------------------
const devNote =
  "Strict Mode dev double-mount can make pending states flicker; trust production profiling.";

// -----------------------------------------------------------------------------
// Quick revise map
// 24 perf → 45 transitions → 46 auth/forms → 47 zustand
// Related: 21 Suspense, 29–31 Actions, 40 Q17 concurrent one-liner
// -----------------------------------------------------------------------------
