// ============================================================================
// 45 — Concurrent React: useTransition, useDeferredValue, startTransition
// Level: MID–ADV  |  Sequence: pehle 24 (perf), phir yeh
// ============================================================================
//
// LAYMAN: Concurrent React = UI ko interrupt karke urgent kaam pehle dikhao.
// Typing snappy rahe; heavy filter/list peeche update ho — user ko lag nahi.
// useTransition / startTransition = "yeh update non-urgent hai".
// useDeferredValue = value ka thoda purana version dikhao jab naya slow ho.
//
// KYUN: Big lists, tab switches, search — input freeze mat karo.
// INTERVIEW: urgent vs transition; transition vs deferred; flushSync contrast;
// transitions speed nahi badhate — responsiveness badhate hain.
// Vite/React 19 project me use — teaching file.
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
// Kya karna hai:
// Hook se non-urgent state updates wrap karo; pending UI dikhao.
//
// Seedha matlab:
// [isPending, startTransition] = useTransition().
// startTransition(() => setHeavy(...)) — React input jaisa urgent pehle.
// isPending true jab transition abhi render complete nahi hua.
// -----------------------------------------------------------------------------
export function SearchWithTransition({ allItems }) {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState(allItems);
  const [isPending, startTransition] = useTransition();

  function onChange(e) {
    const q = e.target.value;
    setQuery(q); // urgent — input turant update
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
// Kya karna hai:
// Component ke bahar / callback me bina hook ke transition mark karo.
//
// Seedha matlab:
// useTransition sirf component me. startTransition() kahi bhi —
// event handler, utility, setTimeout ke andar.
// Same priority marking; isPending ke liye hook chahiye.
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
// Kya karna hai:
// Fast input state rakho; deferred copy se heavy child feed karo.
//
// Seedha matlab:
// const deferredQuery = useDeferredValue(query).
// Jab query change hoti hai, deferred thodi peeche reh sakti hai —
// purani value ke saath ek aur render (stale UI briefly OK).
// Child ko deferred prop do — parent me startTransition ki zaroorat kam.
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
// Q4: Transition vs useDeferredValue — kab kya?
//
// Kya karna hai:
// Dono non-urgent ka kaam; API alag — choose by shape of problem.
//
// Seedha matlab:
// useTransition: tum khud setState wrap karte ho; isPending milta hai;
// multiple state updates ek transition me.
// useDeferredValue: ek value defer; child ko prop pass; "stale" visual easy.
// Rule of thumb: state updates tum control → transition; prop/value lag → deferred.
// Dono ek saath bhi (Q19).
// -----------------------------------------------------------------------------
const transitionVsDeferred =
  "Transition = mark updates non-urgent + pending flag. Deferred = lag behind on a value.";

// -----------------------------------------------------------------------------
// Q5: Urgent vs non-urgent updates
//
// Kya karna hai:
// Typing/click/scroll urgent; filter/chart/route change non-urgent.
//
// Seedha matlab:
// Urgent = user ko turant feedback chahiye (controlled input value).
// Non-urgent = thoda delay OK (10k list filter, tab content swap).
// Galat split = typing bhi transition me → input sluggish feel.
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
// Kya karna hai:
// Input urgent; filter + sort transition me; pending + stale styling.
//
// Seedha matlab:
// Classic interview demo. Expensive work transition ke andar.
// Optional: results pe opacity jab pending.
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
// Kya karna hai:
// Tab click urgent; heavy panel deferred value se render.
//
// Seedha matlab:
// tab state turant change — highlight snappy.
// deferredTab = useDeferredValue(tab) se slow panel render.
// Purana tab content briefly dikhe — acceptable for transitions.
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
// Kya karna hai:
// Route/tab change transition me; Suspense fallback during suspend.
//
// Seedha matlab:
// Transition updates Suspense boundaries ko interruptible banate hain —
// purana UI dikhta rehta jab naya chunk/data load ho.
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
// Kya karna hai:
// Programmatic navigation non-urgent mark — pending spinner on link.
//
// Seedha matlab:
// React Router me direct integration nahi; pattern:
// startTransition(() => navigate('/dashboard')).
// isPending se nav bar loading. Urgent: modal close; non-urgent: page swap.
// Same mental model SPA route changes ke liye.
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
// Kya karna hai:
// Spinner, opacity, disabled button, aria-busy — consistent pending UX.
//
// Seedha matlab:
// 1) Inline "Updating…" text (accessible aria-live).
// 2) Results opacity 0.5 jab pending.
// 3) Submit/nav button disabled + label change.
// 4) Skeleton same layout — layout shift kam.
// isPending false jab transition commit ho chuka (not same as data fetch).
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
// Kya karna hai:
// Timeline samjho — interview "since when" questions.
//
// Seedha matlab:
// React 18 (2022): createRoot, automatic batching, transitions, Suspense improvements.
// useTransition / useDeferredValue / startTransition public API.
// React 19: Actions often auto-transition; still same concurrent renderer core.
// Legacy createRoot nahi = no concurrent features fully.
// Fiber (16+) ne foundation di; 18 ne concurrent rendering user-facing.
// -----------------------------------------------------------------------------
const concurrentHistory = [
  "React 16 Fiber — foundation",
  "React 18 — createRoot, transitions, deferred values",
  "React 19 — Actions wrap updates in transition by default (forms)",
];

// -----------------------------------------------------------------------------
// Q12: Tearing — conceptual note
//
// Kya karna hai:
// External store + concurrent render = inconsistent UI briefly — samjho concept.
//
// Seedha matlab:
// Tearing = screen ka ek hissa purana data, doosra naya (same render cycle mismatch).
// React state/context generally safe. Problem: mutable external store bina sync.
// useSyncExternalStore (18) fix pattern third-party stores ke liye.
// Transitions tearing ko zyada visible kar sakte agar store sync nahi.
// -----------------------------------------------------------------------------
const tearingNote =
  "Concurrent render can pause/resume; external mutable stores need useSyncExternalStore to avoid torn UI.";

// -----------------------------------------------------------------------------
// Q13: flushSync — when NOT concurrent
//
// Kya karna hai:
// Kabhi turant DOM sync chahiye — flushSync urgent force karta hai.
//
// Seedha matlab:
// flushSync(() => setState()) — React abhi render + commit kare (sync).
// Use rare: third-party lib ko DOM measure immediately, focus after insert.
// Overuse = concurrent benefits kill + perf hit.
// Transition ke opposite — "yeh wait mat karo".
// -----------------------------------------------------------------------------
export function MeasureAfterUpdate() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  function toggle() {
    flushSync(() => setOpen(true));
    // DOM ab updated — measure/focus safe
    ref.current?.focus();
  }

  return open ? <input ref={ref} /> : <button onClick={toggle}>Open</button>;
}

// -----------------------------------------------------------------------------
// Q14: startTransition in event handler vs setTimeout
//
// Kya karna hai:
// Dono jagah kaam; event me preferred; setTimeout me bhi valid.
//
// Seedha matlab:
// Event handler: startTransition(() => setX) — React batching context me.
// setTimeout: callback alag task — phir bhi startTransition wrap karo
// taaki resulting setState transition priority me ho.
// Trap: setTimeout bina transition = low priority nahi, bas later run.
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
// Kya karna hai:
// Transition ke andar transition — outer pending behavior samjho.
//
// Seedha matlab:
// Nested startTransition usually outer transition me merge —
// ek hi transition track (implementation detail, behavior: non-urgent).
// Deep nesting socho mat — ek meaningful transition boundary kaafi.
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
// Q16: Performance myth — transitions speed nahi badhate
//
// Kya karna hai:
// Interview trap: "transition se filter fast ho gaya" — galat.
//
// Seedha matlab:
// Same CPU work hota hai — bas scheduling alag: urgent pe interrupt.
// 10k filter ab bhi 10k filter — virtualize / Web Worker alag topic.
// Transition = responsiveness (input smooth), not shorter Big-O.
// Measure: INP, typing latency — not total filter ms alone.
// -----------------------------------------------------------------------------
const perfTruth =
  "Transitions improve perceived responsiveness by prioritizing urgent updates; they do not reduce total computation.";

// -----------------------------------------------------------------------------
// Q17: Interview traps (common wrong answers)
//
// Kya karna hai:
// Galat claims yaad rakho taaki avoid karo.
//
// Seedha matlab:
// Trap 1: "Har setState ko transition" — input sluggish.
// Trap 2: "useDeferredValue same as debounce" — no fixed delay; React scheduler.
// Trap 3: "isPending = fetch loading" — sirf transition render pending.
// Trap 4: "Concurrent = parallel threads" — mostly cooperative scheduling JS me.
// Trap 5: "SSR me transitions matter same" — mostly client hydration/interaction.
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
// Kya karna hai:
// Form actions / useActionState updates often already transition priority.
//
// Seedha matlab:
// React 19 me action dispatch ke updates transition me wrap hote hain —
// form pending state + UI responsive rehta.
// Purane onSubmit + manual setState me khud startTransition socho.
// Files 29–31 dekho Actions detail. Manual transition ab bhi valid non-form UI.
// -----------------------------------------------------------------------------
async function saveAction(prev, formData) {
  await new Promise((r) => setTimeout(r, 300));
  return { ok: true, name: formData.get("name") };
}

// teaching note: useActionState(saveAction) in React 19 auto-transitions updates

// -----------------------------------------------------------------------------
// Q19: useDeferredValue + memo list combo
//
// Kya karna hai:
// Memoized child + deferred prop — unnecessary re-render kam.
//
// Seedha matlab:
// const MemoRows = memo(Rows).
// <MemoRows query={deferredQuery} /> — jab deferred same, memo skip.
// Input fast update; child tab jab deferred catch up.
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
// Kya karna hai:
// Transition ke andar throw/error — Error Boundary / recover pattern.
//
// Seedha matlab:
// Render me error transition ke baad bhi Error Boundary pakad sakti hai.
// Event/async error transition se nahi bound — try/catch khud.
// Retry: error boundary reset + state rollback manually.
// Suspense + error boundary alag layers (file 20, 21).
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
// Kya karna hai:
// Teeno alag tools — kab kaunsa.
//
// Seedha matlab:
// Debounce: fixed wait ke baad ek baar fire (API search 300ms).
// Throttle: max N calls per window (scroll handler).
// Transition: React render priority — no fixed timer; scheduler decide.
// API calls ke liye debounce; render heavy UI ke liye transition/deferred.
// Combine: debounce fetch + transition for local filter OK.
// -----------------------------------------------------------------------------
const compareSchedule =
  "Debounce/throttle = rate-limit events. Transition = prioritize which React updates render first.";

// -----------------------------------------------------------------------------
// Q22: Practical checklist — kab use karo
//
// Kya karna hai:
// Decision tree bolke sunao interview me.
//
// Seedha matlab:
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
// Q23: Multiple setStates ek transition me
//
// Kya karna hai:
// Ek startTransition me kai updates — ek pending, batched non-urgent.
//
// Seedha matlab:
// startTransition(() => { setA(); setB(); setC(); }) — sab non-urgent batch.
// Urgent input alag rakho transition ke bahar.
// Functional updaters transition ke andar safe.
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
// Kya karna hai:
// query !== deferredQuery se stale; isPending alag signal.
//
// Seedha matlab:
// Deferred: intentionally purani list dikhao jab naya render busy.
// isPending: transition chal raha — spinner/opacity.
// Dono ek saath: opacity + "Showing older results" banner.
// UX honest raho — user samjhe data catching up hai.
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
// Kya karna hai:
// Dev me extra renders transitions ko confuse mat karo debugging me.
//
// Seedha matlab:
// Strict Mode dev me double invoke — isPending flicker ho sakta briefly.
// Production behavior pe focus. Profiler se transition marked renders dekho.
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
