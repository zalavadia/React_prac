// ============================================================================
// 21 — Suspense And Lazy
// Level: MID  |  Sequence: pehle yeh, phir agla number
// ============================================================================
//
// LAYMAN: lazy() = component ka code baad me download (code split) — jaise
// heavy dessert pehle mat banao jab guest order kare. Suspense = waiting room
// UI (fallback) jab woh code/data ready nahi.
//
// const Page = lazy(() => import("./Page"));
// <Suspense fallback={<Spinner/>}><Page/></Suspense>
//
// KYUN: Chhoti initial bundle; faster first paint. Routes pe common.
// INTERVIEW: code splitting; Suspense boundaries; error boundary saath.
// Vite/React 19 project me use — teaching file. (React 19 data Suspense alag depth)
//
// ============================================================================

import { lazy, Suspense, use, useState } from "react";

// -----------------------------------------------------------------------------
// Q1: React.lazy basic
//
// Kya karna hai:
// lazy(() => import("./HeavyChart"))
//
// Seedha matlab:
// Dynamic import → alag chunk. Pehli visit pe load.
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
// Kya karna hai:
// Har page lazy — Router me Suspense wrap.
//
// Seedha matlab:
// Biggest win: users rarely-visited pages baad me.
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
// Kya karna hai:
// Page shell turant; andar widgets alag fallback.
//
// Seedha matlab:
// Granular spinners > ek bada blank.
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
// Kya karna hai:
// Tab open hone pe hi heavy panel load.
//
// Seedha matlab:
// Mount = import trigger. Band rakho jab zarurat nahi.
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
// Kya karna hai:
// Lazy import fail / render error — boundary bahar.
//
// Seedha matlab:
// Suspense = wait. ErrorBoundary = fail. Dono stack.
// -----------------------------------------------------------------------------
// <ErrorBoundary>
//   <Suspense fallback={<Spinner />}>
//     <LazyPage />
//   </Suspense>
// </ErrorBoundary>

// -----------------------------------------------------------------------------
// Q6: Named export lazy
//
// Kya karna hai:
// lazy(() => import("./mod").then(m => ({ default: m.Chart })))
//
// Seedha matlab:
// lazy expects default export. Named → remap.
// -----------------------------------------------------------------------------
const Chart = lazy(() =>
  import("./charts").then((m) => ({ default: m.Chart }))
);

// -----------------------------------------------------------------------------
// Q7: [MID] Prefetch on hover (pattern)
//
// Kya karna hai:
// Link hover pe import("./Page") — cache warm.
//
// Seedha matlab:
// UX snappy. Router libs often built-in.
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
// Kya karna hai:
// Fallback layout shift kam — skeleton same size.
//
// Seedha matlab:
// CLS avoid. Spinner center OK chhote widgets pe.
// -----------------------------------------------------------------------------
function SkeletonFallback() {
  return <div className="skeleton h-40" aria-busy="true" />;
}

// -----------------------------------------------------------------------------
// Q9: lazy sirf default export — named remap
//
// Kya karna hai:
// .then(m => ({ default: m.Named })) — Q6 recap practice.
//
// Seedha matlab:
// Dynamic import default expect karta; named ko wrap karo.
// -----------------------------------------------------------------------------
const NamedPanel = lazy(() =>
  import("./panels").then((m) => ({ default: m.SettingsPanel }))
);

// -----------------------------------------------------------------------------
// Q10: [MID] Suspense boundary list ke har item pe mat
//
// Kya karna hai:
// Ek Suspense poori list wrap; andar lazy items — ek fallback.
//
// Seedha matlab:
// Har row alag Suspense = spinner spam; boundary level socho.
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
// Kya karna hai:
// Urgent tab click; transition me route/lazy load — UI responsive.
//
// Seedha matlab:
// Heavy lazy mount non-urgent — typing/input block na ho.
// -----------------------------------------------------------------------------
function TransitionLazy({ showHeavy }) {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      {showHeavy ? <HeavyChart /> : <p>Light view</p>}
    </Suspense>
  );
}

// -----------------------------------------------------------------------------
// Q12: [MID] use() hook — promise read (React 19 data Suspense)
//
// Kya karna hai:
// function Child({ dataPromise }) { const data = use(dataPromise); }
//
// Seedha matlab:
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
// Kya karna hai:
// Server Component = zero client bundle; lazy = client chunk split.
//
// Seedha matlab:
// RSC data server pe; lazy code-splitting client pe — alag problems.
// -----------------------------------------------------------------------------
function RSCContrast() {
  return (
    <p>
      RSC: server render + stream. lazy+Suspense: client JS chunk download.
      Dono "wait" UI but mechanism alag.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q14: [MID] Suspense boundary placement — route vs widget
//
// Kya karna hai:
// Route level ek bada fallback; widget level chhote skeletons.
//
// Seedha matlab:
// User ko kya dikhe jab wait — granularity UX decide karti.
// -----------------------------------------------------------------------------
function PlacementDemo() {
  return (
    <Suspense fallback={<div className="page-skeleton" />}>
      <Home />
    </Suspense>
  );
}

// -----------------------------------------------------------------------------
// Q15: Preload — component mount se pehle import()
//
// Kya karna hai:
// Route config me loader: () => import("./Page") — hover/route intent.
//
// Seedha matlab:
// Lazy first render slow; preload se Suspense time kam.
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
// Q16: [MID] Error vs Suspense — alag states
//
// Kya karna hai:
// Suspense = pending; ErrorBoundary = rejected/render throw.
//
// Seedha matlab:
// Dono stack karo; ek component me mix mat confuse.
// -----------------------------------------------------------------------------
function ErrorSuspenseStack() {
  return (
    // <ErrorBoundary fallback={<Err />}>
    //   <Suspense fallback={<Spin />}>
    //     <LazyOrUseData />
    //   </Suspense>
    // </ErrorBoundary>
    <p>Boundary bahar, Suspense andar — loading vs error alag UI.</p>
  );
}

// -----------------------------------------------------------------------------
// Q17: [ADV] Suspense for data fetching (CSR) limitations
//
// Kya karna hai:
// Har fetch Suspense-friendly nahi — cache/resource layer chahiye.
//
// Seedha matlab:
// TanStack Query suspense mode ya custom resource — throw promise pattern.
// -----------------------------------------------------------------------------
function DataSuspenseLimit() {
  return (
    <p>
      Raw fetch in useEffect ≠ Suspense. Resource cache promise throw kare tab
      Suspense kaam karta.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q18: [ADV] React Query suspense mode contrast
//
// Kya karna hai:
// useQuery({ suspense: true }) — library boundary handle; fallback Suspense.
//
// Seedha matlab:
// Manual use() vs RQ — same mental model, less boilerplate lib se.
// -----------------------------------------------------------------------------
function RQContrast() {
  return (
    <p>
      React Query suspense: query pending pe suspend. Cache/retry lib sambhalti.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q19: [ADV] Streaming SSR + Suspense
//
// Kya karna hai:
// Server HTML me fallback first; ready chunk stream replace.
//
// Seedha matlab:
// Client lazy alag; SSR Suspense HTML stream — faster TTFB feel.
// -----------------------------------------------------------------------------
function StreamingNote() {
  return <p>SSR Suspense: shell pehle, slow data baad me stream.</p>;
}

// -----------------------------------------------------------------------------
// Q20: [ADV] lazy().then wrap + memo combo
//
// Kya karna hai:
// const C = lazy(...); export default memo(C) — re-render lazy child stable.
//
// Seedha matlab:
// Code split + perf — lazy load once, memo frequent parent renders.
// -----------------------------------------------------------------------------
const MemoLazy = lazy(() =>
  import("./Heavy").then((m) => ({ default: m.default }))
);

// -----------------------------------------------------------------------------
// Q21: [ADV] Kab lazy mat use karo
//
// Kya karna hai:
// Critical above-fold, tiny components, always-needed shell — eager import.
//
// Seedha matlab:
// Over-splitting = extra requests + Suspense flash. Profile bundle pehle.
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
// Q22: [ADV] Interview — Suspense + lazy + use() ek answer
//
// Kya karna hai:
// Code split (lazy), wait UI (Suspense), data (use), errors (Boundary).
//
// Seedha matlab:
// Teen layer bolke sunao — mid interview strong close.
// -----------------------------------------------------------------------------
function SuspenseInterview() {
  return (
    <ol>
      <li>lazy() — dynamic import, alag chunk</li>
      <li>Suspense — suspend pe fallback</li>
      <li>use(promise) — data suspense React 19</li>
      <li>ErrorBoundary — fail case alag</li>
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
