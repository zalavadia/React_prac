// ============================================================================
// 21 — Suspense And Lazy
// Level: MID  |  Sequence: do this first, then the next file in sequence
// ============================================================================
//
// SIMPLE: lazy() = download component code later (code split) — like not
// making a heavy dessert until the guest orders. Suspense = waiting room
// UI (fallback) while that code/data is not ready yet.
//
// const Page = lazy(() => import("./Page"));
// <Suspense fallback={<Spinner/>}><Page/></Suspense>
//
// WHY: Smaller initial bundle; faster first paint. Common on routes.
// INTERVIEW: code splitting; Suspense boundaries; pair with error boundary.
// Vite/React 19 project — teaching file. (React 19 data Suspense is a separate depth)
//
// ============================================================================

import { lazy, Suspense, use, useState } from "react";

// -----------------------------------------------------------------------------
// Q1: React.lazy basic
//
// Task:
// lazy(() => import("./HeavyChart"))
//
// In simple words:
// Dynamic import → separate chunk. Loads on first visit.
// -----------------------------------------------------------------------------
const HeavyChart = lazy(() => import("./HeavyChart")); // path example

function Dashboard() {
  return (
    <Suspense fallback={<p>Loading chart...</p>}>
      <HeavyChart />
    </Suspense>
  );
}

// -----------------------------------------------------------------------------
// Q2: Route-level split sketch
//
// Task:
// Lazy-load each page — wrap Router with Suspense.
//
// In simple words:
// Biggest win: users load rarely-visited pages later.
// -----------------------------------------------------------------------------
const Settings = lazy(() => import("./Settings"));
const Profile = lazy(() => import("./Profile"));

function RoutesSketch({ page }) {
  return (
    <Suspense fallback={<p>Loading page...</p>}>
      {page === "settings" ? <Settings /> : <Profile />}
    </Suspense>
  );
}

// -----------------------------------------------------------------------------
// Q3: Nested Suspense
//
// Task:
// Page shell right away; inner widgets get their own fallback.
//
// In simple words:
// Granular spinners beat one big blank screen.
// -----------------------------------------------------------------------------
const WidgetA = lazy(() => import("./WidgetA"));
const WidgetB = lazy(() => import("./WidgetB"));

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Suspense fallback={<p>A...</p>}>
        <WidgetA />
      </Suspense>
      <Suspense fallback={<p>B...</p>}>
        <WidgetB />
      </Suspense>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q4: Conditional lazy mount
//
// Task:
// Load heavy panel only when tab opens.
//
// In simple words:
// Mount triggers import. Keep it unmounted when not needed.
// -----------------------------------------------------------------------------
function Tabs() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setOpen(true)}>Open editor</button>
      {open && (
        <Suspense fallback={<p>Loading editor...</p>}>
          <HeavyChart />
        </Suspense>
      )}
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q5: [MID] Error boundary + Suspense
//
// Task:
// Lazy import fail / render error — put boundary outside.
//
// In simple words:
// Suspense = wait. ErrorBoundary = fail. Stack both.
// -----------------------------------------------------------------------------
// <ErrorBoundary>
//   <Suspense fallback={<Spinner />}>
//     <LazyPage />
//   </Suspense>
// </ErrorBoundary>

// -----------------------------------------------------------------------------
// Q6: Named export lazy
//
// Task:
// lazy(() => import("./mod").then(m => ({ default: m.Chart })))
//
// In simple words:
// lazy expects default export. Named → remap.
// -----------------------------------------------------------------------------
const Chart = lazy(() =>
  import("./charts").then((m) => ({ default: m.Chart }))
);

// -----------------------------------------------------------------------------
// Q7: [MID] Prefetch on hover (pattern)
//
// Task:
// On link hover: import("./Page") — warm the cache.
//
// In simple words:
// Snappy UX. Router libs often built this in.
// -----------------------------------------------------------------------------
function PrefetchLink() {
  function warm() {
    import("./Settings");
  }
  return (
    <a href="/settings" onMouseEnter={warm}>
      Settings
    </a>
  );
}

// -----------------------------------------------------------------------------
// Q8: Fallback design tip
//
// Task:
// Reduce layout shift in fallback — skeleton same size.
//
// In simple words:
// Avoid CLS. Centered spinner OK on small widgets.
// -----------------------------------------------------------------------------
function SkeletonFallback() {
  return <div className="skeleton h-40" aria-busy="true" />;
}

// -----------------------------------------------------------------------------
// Q9: lazy only for default export — named remap
//
// Task:
// .then(m => ({ default: m.Named })) — Q6 recap practice.
//
// In simple words:
// Dynamic import expects default; wrap named exports.
// -----------------------------------------------------------------------------
const NamedPanel = lazy(() =>
  import("./panels").then((m) => ({ default: m.SettingsPanel }))
);

// -----------------------------------------------------------------------------
// Q10: [MID] Do not put Suspense boundary on every list item
//
// Task:
// One Suspense wraps the whole list; lazy items inside — one fallback.
//
// In simple words:
// Suspense per row = spinner spam; think about boundary level.
// -----------------------------------------------------------------------------
function LazyList({ ids }) {
  return (
    <Suspense fallback={<p>Loading items...</p>}>
      <ul>
        {ids.map((id) => (
          <LazyRow key={id} id={id} />
        ))}
      </ul>
    </Suspense>
  );
}
const LazyRow = lazy(() => import("./LazyRow"));

// -----------------------------------------------------------------------------
// Q11: startTransition + lazy route feel
//
// Task:
// Urgent tab click; route/lazy load in transition — UI stays responsive.
//
// In simple words:
// Heavy lazy mount is non-urgent — typing/input should not block.
// -----------------------------------------------------------------------------
function TransitionLazy({ showHeavy }) {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      {showHeavy ? <HeavyChart /> : <p>Light view</p>}
    </Suspense>
  );
}

// -----------------------------------------------------------------------------
// Q12: [MID] use() hook — read promise (React 19 data Suspense)
//
// Task:
// function Child({ dataPromise }) { const data = use(dataPromise); }
//
// In simple words:
// Promise throw/suspend → nearest Suspense fallback. RSC/CSR contrast.
// -----------------------------------------------------------------------------
function DataChild({ userPromise }) {
  const user = use(userPromise);
  return <p>{user.name}</p>;
}
function DataSuspenseDemo({ promise }) {
  return (
    <Suspense fallback={<p>Loading user...</p>}>
      <DataChild userPromise={promise} />
    </Suspense>
  );
}

// -----------------------------------------------------------------------------
// Q13: RSC vs client lazy contrast
//
// Task:
// Server Component = zero client bundle; lazy = client chunk split.
//
// In simple words:
// RSC data on server; lazy code-splitting on client — different problems.
// -----------------------------------------------------------------------------
function RSCContrast() {
  return (
    <p>
      RSC: server render + stream. lazy+Suspense: client JS chunk download.
      Both show "wait" UI but the mechanism is different.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q14: [MID] Suspense boundary placement — route vs widget
//
// Task:
// Route level: one big fallback; widget level: small skeletons.
//
// In simple words:
// What the user sees while waiting — granularity drives UX.
// -----------------------------------------------------------------------------
function PlacementDemo() {
  return (
    <Suspense fallback={<div className="page-skeleton" />}>
      <Home />
    </Suspense>
  );
}

// -----------------------------------------------------------------------------
// Q15: Preload — import() before component mount
//
// Task:
// Route config loader: () => import("./Page") — hover/route intent.
//
// In simple words:
// Lazy first render is slow; preload shortens Suspense time.
// -----------------------------------------------------------------------------
const PreloadedPage = lazy(() => import("./PreloadedPage"));
function PreloadOnIntent() {
  function intent() {
    import("./PreloadedPage");
  }
  return (
    <button onMouseEnter={intent} onFocus={intent}>
      Go (preloaded on hover)
    </button>
  );
}

// -----------------------------------------------------------------------------
// Q16: [MID] Error vs Suspense — different states
//
// Task:
// Suspense = pending; ErrorBoundary = rejected/render throw.
//
// In simple words:
// Stack both; do not mix them confused in one component.
// -----------------------------------------------------------------------------
function ErrorSuspenseStack() {
  return (
    // <ErrorBoundary fallback={<Err />}>
    //   <Suspense fallback={<Spin />}>
    //     <LazyOrUseData />
    //   </Suspense>
    // </ErrorBoundary>
    <p>Boundary outside, Suspense inside — loading vs error are separate UI.</p>
  );
}

// -----------------------------------------------------------------------------
// Q17: [ADV] Suspense for data fetching (CSR) limitations
//
// Task:
// Not every fetch is Suspense-friendly — need cache/resource layer.
//
// In simple words:
// TanStack Query suspense mode or custom resource — throw promise pattern.
// -----------------------------------------------------------------------------
function DataSuspenseLimit() {
  return (
    <p>
      Raw fetch in useEffect ≠ Suspense. Suspense works when resource cache throws
      the promise.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q18: [ADV] React Query suspense mode contrast
//
// Task:
// useQuery({ suspense: true }) — library handles boundary; Suspense fallback.
//
// In simple words:
// Manual use() vs RQ — same mental model, less boilerplate from the lib.
// -----------------------------------------------------------------------------
function RQContrast() {
  return (
    <p>
      React Query suspense: query pending suspends. Cache/retry handled by the lib.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q19: [ADV] Streaming SSR + Suspense
//
// Task:
// Server HTML shows fallback first; ready chunk streams in to replace.
//
// In simple words:
// Client lazy is different; SSR Suspense streams HTML — faster TTFB feel.
// -----------------------------------------------------------------------------
function StreamingNote() {
  return <p>SSR Suspense: shell first, slow data streams later.</p>;
}

// -----------------------------------------------------------------------------
// Q20: [ADV] lazy().then wrap + memo combo
//
// Task:
// const C = lazy(...); export default memo(C) — stable lazy child on re-render.
//
// In simple words:
// Code split + perf — lazy load once, memo on frequent parent renders.
// -----------------------------------------------------------------------------
const MemoLazy = lazy(() =>
  import("./Heavy").then((m) => ({ default: m.default }))
);

// -----------------------------------------------------------------------------
// Q21: [ADV] When not to use lazy
//
// Task:
// Critical above-fold, tiny components, always-needed shell — eager import.
//
// In simple words:
// Over-splitting = extra requests + Suspense flash. Profile bundle first.
// -----------------------------------------------------------------------------
function WhenNotLazy() {
  return (
    <ul>
      <li>Above-fold hero — eager</li>
      <li>Tiny icon — eager</li>
      <li>Rare admin page — lazy ✅</li>
    </ul>
  );
}

// -----------------------------------------------------------------------------
// Q22: [ADV] Interview — Suspense + lazy + use() in one answer
//
// Task:
// Code split (lazy), wait UI (Suspense), data (use), errors (Boundary).
//
// In simple words:
// Explain three layers — strong mid-level interview close.
// -----------------------------------------------------------------------------
function SuspenseInterview() {
  return (
    <ol>
      <li>lazy() — dynamic import, separate chunk</li>
      <li>Suspense — fallback on suspend</li>
      <li>use(promise) — data suspense React 19</li>
      <li>ErrorBoundary — separate fail case</li>
    </ol>
  );
}

export {
  Dashboard,
  RoutesSketch,
  Home,
  Tabs,
  Chart,
  PrefetchLink,
  SkeletonFallback,
  NamedPanel,
  LazyList,
  TransitionLazy,
  DataChild,
  DataSuspenseDemo,
  RSCContrast,
  PlacementDemo,
  PreloadOnIntent,
  ErrorSuspenseStack,
  DataSuspenseLimit,
  RQContrast,
  StreamingNote,
  MemoLazy,
  WhenNotLazy,
  SuspenseInterview,
};
