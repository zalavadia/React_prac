// ============================================================================
// 27 — StrictMode And Effects
// Level: MID  |  Sequence: do this first, then the next file in sequence
// ============================================================================
//
// SIMPLE: StrictMode = development teacher that double-checks. In DEV,
// effects mount → cleanup → mount again — to see if your cleanup is correct
// (otherwise prod leak/bug stays hidden).
//
// <React.StrictMode> wrap App. Production does not double invoke.
// "Why does my useEffect run twice?" → often StrictMode, not a bug (if cleanup OK).
//
// WHY: Catch fragile effects early. Interview explains double mount.
// INTERVIEW: why effects run twice in dev; idempotent setup/cleanup.
// Vite/React 19 project — teaching file.
//
// ============================================================================

import { StrictMode, useEffect, useLayoutEffect, useRef, useState } from "react";

// -----------------------------------------------------------------------------
// Q1: Wrap app in StrictMode
//
// Task:
// main.jsx: <StrictMode><App/></StrictMode>
//
// In simple words:
// Extra checks DEV only. Prod bundle behavior normal.
// -----------------------------------------------------------------------------
function Root() {
  return (
    <StrictMode>
      <App />
    </StrictMode>
  );
}

function App() {
  return <p>App</p>;
}

// -----------------------------------------------------------------------------
// Q2: Effect double-invoke demo mindset
//
// Task:
// console.log mount/cleanup — in DEV: mount, cleanup, mount.
//
// In simple words:
// React does this on purpose. Write cleanup as if prod unmounts too.
// -----------------------------------------------------------------------------
function Probe() {
  useEffect(() => {
    console.log("mount/setup");
    return () => console.log("cleanup");
  }, []);
  return <p>Check console in DEV</p>;
}

// -----------------------------------------------------------------------------
// Q3: Subscription must cleanup
//
// Task:
// addEventListener + remove in cleanup — safe even when doubled.
//
// In simple words:
// Without remove, StrictMode can feel like 2 listeners stuck.
// -----------------------------------------------------------------------------
function Width() {
  const [w, setW] = useState(window.innerWidth);
  useEffect(() => {
    const fn = () => setW(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return <p>{w}</p>;
}

// -----------------------------------------------------------------------------
// Q4: Fetch with cancel / ignore flag
//
// Task:
// Double fetch in DEV OK; no setState on aborted/cancelled.
//
// In simple words:
// StrictMode can fire 2 requests — design resilient.
// -----------------------------------------------------------------------------
function User({ id }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    let ignore = false;
    fetch(`/api/users/${id}`)
      .then((r) => r.json())
      .then((data) => {
        if (!ignore) setUser(data);
      });
    return () => {
      ignore = true;
    };
  }, [id]);
  return <pre>{JSON.stringify(user)}</pre>;
}

// -----------------------------------------------------------------------------
// Q5: [MID] Don't "fix" by removing StrictMode
//
// Task:
// Irritated by double call → removing Mode is wrong fix.
//
// In simple words:
// Make cleanup/idempotent. Mode is your friend.
// -----------------------------------------------------------------------------
function Note() {
  return <p>Fix effects, don't delete StrictMode.</p>;
}

// -----------------------------------------------------------------------------
// Q6: Idempotent setup
//
// Task:
// Setup runs twice still OK (connect once via ref guard if needed).
//
// In simple words:
// External systems: clear connect/disconnect pair.
// -----------------------------------------------------------------------------
function FakeSocket() {
  useEffect(() => {
    const socket = { open: true };
    console.log("connect");
    return () => {
      socket.open = false;
      console.log("disconnect");
    };
  }, []);
  return <p>socket</p>;
}

// -----------------------------------------------------------------------------
// Q7: [MID] setState in effect + StrictMode
//
// Task:
// Extra setup/cleanup/setup — state should end consistent.
//
// In simple words:
// Race flags. Final UI one correct data.
// -----------------------------------------------------------------------------
function Consistent() {
  const [n, setN] = useState(0);
  useEffect(() => {
    setN(1);
  }, []);
  return <p>{n}</p>;
}

// -----------------------------------------------------------------------------
// Q8: What StrictMode also checks (concept)
//
// Task:
// Deprecated APIs, unsafe side effects in render — warnings.
//
// In simple words:
// Not only effects double — broader DEV safety net.
// -----------------------------------------------------------------------------
function Concept() {
  return (
    <ul>
      <li>DEV-only double invoke effects</li>
      <li>Warn on legacy patterns</li>
      <li>Prod: no double mount tax</li>
    </ul>
  );
}

// -----------------------------------------------------------------------------
// Q9: Production — double invoke does not happen
//
// Task:
// StrictMode DEV-only behavior; prod build effect runs once normally.
//
// In simple words:
// "Runs twice in prod" report = likely real bug, not StrictMode.
// -----------------------------------------------------------------------------
function ProdNote() {
  return (
    <p>
      StrictMode double mount/cleanup DEV only. Production = single
      mount cycle.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q10: [MID] Impure render detect — StrictMode extra render
//
// Task:
// Math.random() / Date.now() in render — DEV shows inconsistent UI.
//
// In simple words:
// Render must be pure — StrictMode exposes impure patterns.
// -----------------------------------------------------------------------------
function ImpureRenderBad() {
  // const id = Math.random(); // ❌ impure render
  const id = useRef(Math.random()).current; // ✅ stable via ref
  return <p>{id}</p>;
}

// -----------------------------------------------------------------------------
// Q11: Legacy StrictMode — findDOMNode etc warnings
//
// Task:
// Warn on old APIs — migrate to refs.
//
// In simple words:
// StrictMode not only doubles effects — also flags unsafe APIs.
// -----------------------------------------------------------------------------
function LegacyNote() {
  return <p>Legacy StrictMode: deprecated lifecycle/API warnings extra.</p>;
}

// -----------------------------------------------------------------------------
// Q12: [MID] Refs do not persist on double mount — fresh instance
//
// Task:
// useRef initial value resets on remount — state also fresh.
//
// In simple words:
// Double invoke = full unmount/remount sim — ref/state reset in DEV cycle.
// -----------------------------------------------------------------------------
function RefResetDemo() {
  const ref = useRef({ count: 0 });
  ref.current.count += 1;
  return <p>Ref ticks this mount: {ref.current.count}</p>;
}

// -----------------------------------------------------------------------------
// Q13: setInterval / setTimeout — cleanup mandatory
//
// Task:
// clearInterval/clearTimeout in cleanup — no duplicate timer on double mount.
//
// In simple words:
// Without cleanup: 2 timers in DEV — leak on prod unmount.
// -----------------------------------------------------------------------------
function TimerDemo() {
  const [n, setN] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setN((x) => x + 1), 1000);
    return () => clearInterval(id);
  }, []);
  return <p>{n}</p>;
}

// -----------------------------------------------------------------------------
// Q14: [MID] Analytics — double fire guard with ref
//
// Task:
// trackPageView — no duplicate event on StrictMode double mount (idempotent).
//
// In simple words:
// Dedupe external side effect or accept DEV double — prod single.
// -----------------------------------------------------------------------------
function AnalyticsPage() {
  const sent = useRef(false);
  useEffect(() => {
    if (sent.current) return;
    sent.current = true;
    console.log("page_view");
  }, []);
  return <p>Page</p>;
}

// -----------------------------------------------------------------------------
// Q15: useLayoutEffect also DEV double pattern
//
// Task:
// DOM measure in layout effect — keep cleanup symmetric.
//
// In simple words:
// useEffect vs useLayoutEffect both StrictMode simulate — cleanup pair required.
// -----------------------------------------------------------------------------
function LayoutProbe() {
  useLayoutEffect(() => {
    console.log("layout measure");
    return () => console.log("layout cleanup");
  }, []);
  return <p>Layout</p>;
}

// -----------------------------------------------------------------------------
// Q16: [MID] Global singleton — module level side effect danger
//
// Task:
// let socket = connect() at module top — double import/init issues.
//
// In simple words:
// Side effects in effect + cleanup; module scope global state needs care.
// -----------------------------------------------------------------------------
function SingletonNote() {
  return (
    <p>
      Module-level singleton + StrictMode remount = surprising double init — prefer
      effect encapsulation.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q17: [ADV] React 19 StrictMode — concurrent features alignment
//
// Task:
// Stricter checks continue; same cleanup rules with Actions/use patterns.
//
// In simple words:
// Removing StrictMode on upgrade is not a fix — keep effects idempotent.
// -----------------------------------------------------------------------------
function React19StrictNote() {
  return <p>React 19: StrictMode still DEV teacher — new APIs same cleanup discipline.</p>;
}

// -----------------------------------------------------------------------------
// Q18: [ADV] findDOMNode / string refs — warnings
//
// Task:
// Migrate to useRef on DOM node — StrictMode warns on legacy.
//
// In simple words:
// Less issue in modern code; interview may mention legacy.
// -----------------------------------------------------------------------------
function FindDOMNote() {
  return <p>findDOMNode deprecated — StrictMode DEV warnings push refs migration.</p>;
}

// -----------------------------------------------------------------------------
// Q19: [ADV] useInsertionEffect — CSS-in-JS StrictMode safe
//
// Task:
// Inject styles before layout — cleanup removes styles.
//
// In simple words:
// For library authors; same mount/cleanup/mount DEV cycle applies.
// -----------------------------------------------------------------------------
function InsertionNote() {
  return <p>useInsertionEffect: inject/cleanup styles — StrictMode double safe pattern.</p>;
}

// -----------------------------------------------------------------------------
// Q20: [ADV] Testing — StrictMode wrapper in tests
//
// Task:
// render(&lt;StrictMode&gt;&lt;App/&gt;&lt;/StrictMode&gt;) — catch cleanup bugs in tests.
//
// In simple words:
// Test utils StrictMode optional — helpful in integration tests.
// -----------------------------------------------------------------------------
function TestStrictNote() {
  return <p>Wrap with StrictMode in tests to verify double-invoke cleanup.</p>;
}

// -----------------------------------------------------------------------------
// Q21: [ADV] AbortController + StrictMode fetch
//
// Task:
// Abort on mount cleanup — double fetch may fire in DEV; one response wins.
//
// In simple words:
// ignore flag or abort — no duplicate setState race.
// -----------------------------------------------------------------------------
function StrictFetch({ id }) {
  const [data, setData] = useState(null);
  useEffect(() => {
    const ac = new AbortController();
    fetch(`/api/${id}`, { signal: ac.signal })
      .then((r) => r.json())
      .then(setData)
      .catch((e) => {
        if (e.name !== "AbortError") console.error(e);
      });
    return () => ac.abort();
  }, [id]);
  return <pre>{JSON.stringify(data)}</pre>;
}

// -----------------------------------------------------------------------------
// Q22: [ADV] Interview — explain double effect to junior
//
// Task:
// DEV rehearsal for cleanup; prod single; fix effect not remove StrictMode.
//
// In simple words:
// 30 sec answer: why, what to expect, how to fix — interview gold.
// -----------------------------------------------------------------------------
function StrictInterview() {
  return (
    <ol>
      <li>StrictMode = DEV-only extra checks</li>
      <li>Effects: mount → cleanup → mount simulate</li>
      <li>Good cleanup → final state OK</li>
      <li>Prod has no double tax</li>
      <li>Removing StrictMode = hide symptom, not fix</li>
    </ol>
  );
}

export {
  Root,
  App,
  Probe,
  Width,
  User,
  Note,
  FakeSocket,
  Consistent,
  Concept,
  ProdNote,
  ImpureRenderBad,
  LegacyNote,
  RefResetDemo,
  TimerDemo,
  AnalyticsPage,
  LayoutProbe,
  SingletonNote,
  React19StrictNote,
  FindDOMNote,
  InsertionNote,
  TestStrictNote,
  StrictFetch,
  StrictInterview,
};
