// ============================================================================
// 27 — StrictMode And Effects
// Level: MID  |  Sequence: pehle yeh, phir agla number
// ============================================================================
//
// LAYMAN: StrictMode = development teacher jo double-check karta. DEV me
// effects mount → cleanup → dubara mount — yeh dekhne ke liye tumhara cleanup
// sahi hai (warna prod me leak/bug chhup jaye).
//
// <React.StrictMode> wrap App. Production me double invoke nahi.
// "Mera useEffect 2 baar kyun?" → often StrictMode, bug nahi (agar cleanup OK).
//
// KYUN: Fragile effects jaldi pakadna. Interview me double-mount explain.
// INTERVIEW: why effects run twice in dev; idempotent setup/cleanup.
// Vite/React 19 project me use — teaching file.
//
// ============================================================================

import { StrictMode, useEffect, useLayoutEffect, useRef, useState } from "react";

// -----------------------------------------------------------------------------
// Q1: Wrap app in StrictMode
//
// Kya karna hai:
// main.jsx me <StrictMode><App/></StrictMode>
//
// Seedha matlab:
// Extra checks sirf DEV. Prod bundle behavior normal.
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
// Kya karna hai:
// console.log mount/cleanup — DEV me mount, cleanup, mount.
//
// Seedha matlab:
// React jaan-bujh ke. Cleanup likho jaise prod me bhi unmount ho.
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
// Kya karna hai:
// addEventListener + remove in cleanup — double safe.
//
// Seedha matlab:
// Bina remove StrictMode me 2 listeners chipak sakte feel.
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
// Kya karna hai:
// Double fetch DEV me OK; aborted/cancelled pe setState mat.
//
// Seedha matlab:
// StrictMode 2 requests fire kar sakta — design resilient.
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
// Kya karna hai:
// Double call se irritate → Mode hataana galat fix.
//
// Seedha matlab:
// Cleanup/idempotent banao. Mode friend hai.
// -----------------------------------------------------------------------------
function Note() {
  return <p>Fix effects, don't delete StrictMode.</p>;
}

// -----------------------------------------------------------------------------
// Q6: Idempotent setup
//
// Kya karna hai:
// Setup do baar chale to bhi sahi state (connect once via ref guard if needed).
//
// Seedha matlab:
// External systems: connect/disconnect pair clear.
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
// Kya karna hai:
// Extra setup/cleanup/setup — state end me consistent hona chahiye.
//
// Seedha matlab:
// Race flags. Final UI ek hi sahi data.
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
// Kya karna hai:
// Deprecated APIs, unsafe side effects in render — warnings.
//
// Seedha matlab:
// Sirf effects double nahi — broader DEV safety net.
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
// Q9: Production — double invoke nahi hota
//
// Kya karna hai:
// StrictMode DEV-only behavior; prod build me effect ek baar normal.
//
// Seedha matlab:
// "Prod me 2 baar" report = bug likely real, StrictMode nahi.
// -----------------------------------------------------------------------------
function ProdNote() {
  return (
    <p>
      StrictMode double mount/cleanup sirf development. Production = single
      mount cycle.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q10: [MID] Impure render detect — StrictMode extra render
//
// Kya karna hai:
// Render me Math.random() / Date.now() — DEV me inconsistent UI dikhega.
//
// Seedha matlab:
// Render pure hona chahiye — StrictMode impure patterns expose karta.
// -----------------------------------------------------------------------------
function ImpureRenderBad() {
  // const id = Math.random(); // ❌ impure render
  const id = useRef(Math.random()).current; // ✅ stable via ref
  return <p>{id}</p>;
}

// -----------------------------------------------------------------------------
// Q11: Legacy StrictMode — findDOMNode etc warnings
//
// Kya karna hai:
// Purane APIs pe warn — migrate to refs.
//
// Seedha matlab:
// StrictMode sirf effects double nahi — unsafe APIs bhi flag.
// -----------------------------------------------------------------------------
function LegacyNote() {
  return <p>Legacy StrictMode: deprecated lifecycle/API warnings extra.</p>;
}

// -----------------------------------------------------------------------------
// Q12: [MID] Refs double mount pe persist nahi — fresh instance
//
// Kya karna hai:
// useRef initial value dubara mount pe reset — state bhi fresh.
//
// Seedha matlab:
// Double invoke = full unmount/remount sim — ref/state dono reset DEV cycle me.
// -----------------------------------------------------------------------------
function RefResetDemo() {
  const ref = useRef({ count: 0 });
  ref.current.count += 1;
  return <p>Ref ticks this mount: {ref.current.count}</p>;
}

// -----------------------------------------------------------------------------
// Q13: setInterval / setTimeout — cleanup mandatory
//
// Kya karna hai:
// clearInterval/clearTimeout cleanup me — double mount pe duplicate timer na bane.
//
// Seedha matlab:
// Bina cleanup 2 timers DEV me — prod unmount pe leak.
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
// Q14: [MID] Analytics — double fire guard ref se
//
// Kya karna hai:
// trackPageView — StrictMode double mount pe duplicate event na bhejo (idempotent).
//
// Seedha matlab:
// External side effect dedupe ya accept DEV double — prod single.
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
// Q15: useLayoutEffect bhi DEV double pattern
//
// Kya karna hai:
// Layout effect me DOM measure — cleanup symmetric rakho.
//
// Seedha matlab:
// useEffect vs useLayoutEffect dono StrictMode simulate — cleanup pair zaroori.
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
// Kya karna hai:
// let socket = connect() module top pe — double import/init issues.
//
// Seedha matlab:
// Side effects effect me + cleanup; module scope global state careful.
// -----------------------------------------------------------------------------
function SingletonNote() {
  return (
    <p>
      Module-level singleton + StrictMode remount = surprising double init — effect
      encapsulation prefer.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q17: [ADV] React 19 StrictMode — concurrent features alignment
//
// Kya karna hai:
// Stricter checks continue; Actions/use patterns ke saath same cleanup rules.
//
// Seedha matlab:
// Version upgrade pe StrictMode hataana fix nahi — effects idempotent rakho.
// -----------------------------------------------------------------------------
function React19StrictNote() {
  return <p>React 19: StrictMode still DEV teacher — new APIs same cleanup discipline.</p>;
}

// -----------------------------------------------------------------------------
// Q18: [ADV] findDOMNode / string refs — warnings
//
// Kya karna hai:
// useRef DOM node pe migrate — StrictMode warn karega legacy pe.
//
// Seedha matlab:
// Modern code me issue kam; interview me legacy mention suno.
// -----------------------------------------------------------------------------
function FindDOMNote() {
  return <p>findDOMNode deprecated — StrictMode DEV warnings push refs migration.</p>;
}

// -----------------------------------------------------------------------------
// Q19: [ADV] useInsertionEffect — CSS-in-JS StrictMode safe
//
// Kya karna hai:
// Styles inject before layout — cleanup styles remove.
//
// Seedha matlab:
// Library authors ke liye; same mount/cleanup/mount DEV cycle apply.
// -----------------------------------------------------------------------------
function InsertionNote() {
  return <p>useInsertionEffect: inject/cleanup styles — StrictMode double safe pattern.</p>;
}

// -----------------------------------------------------------------------------
// Q20: [ADV] Testing — StrictMode wrapper tests me
//
// Kya karna hai:
// render(&lt;StrictMode&gt;&lt;App/&gt;&lt;/StrictMode&gt;) — cleanup bugs pakdo tests me.
//
// Seedha matlab:
// Test utils StrictMode optional — integration tests me helpful.
// -----------------------------------------------------------------------------
function TestStrictNote() {
  return <p>Tests me StrictMode wrap karke double-invoke cleanup verify kar sakte ho.</p>;
}

// -----------------------------------------------------------------------------
// Q21: [ADV] AbortController + StrictMode fetch
//
// Kya karna hai:
// Mount cleanup abort — double fetch fire ho sakta DEV; ek response win.
//
// Seedha matlab:
// ignore flag ya abort — duplicate setState race na ho.
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
// Q22: [ADV] Interview — junior ko double effect explain
//
// Kya karna hai:
// DEV rehearsal for cleanup; prod single; fix effect not remove StrictMode.
//
// Seedha matlab:
// 30 sec answer: kyun, kya expect, kaise fix — interview gold.
// -----------------------------------------------------------------------------
function StrictInterview() {
  return (
    <ol>
      <li>StrictMode = DEV-only extra checks</li>
      <li>Effects: mount → cleanup → mount simulate</li>
      <li>Cleanup sahi ho to final state OK</li>
      <li>Prod me double tax nahi</li>
      <li>StrictMode hataana = symptom hide, fix nahi</li>
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
