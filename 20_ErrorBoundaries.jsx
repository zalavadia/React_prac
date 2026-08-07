// ============================================================================
// 20 — Error Boundaries
// Level: MID  |  Sequence: pehle yeh, phir agla number
// ============================================================================
//
// LAYMAN: Error boundary = safety net. Child tree render me crash → poori
// app white screen ki jagah fallback UI. Class component (ya library) se.
//
// Catch: render, lifecycle, constructors of children.
// NOT catch: event handlers, async, SSR, khud boundary errors — try/catch wahan.
//
// KYUN: Production resilience. Widget fail ≠ whole app die.
// INTERVIEW: what they catch / don't; class getDerivedStateFromError.
// Vite/React 19 project me use — teaching file. (class API yahan intentional)
//
// ============================================================================

import { Component, useEffect, useState } from "react";

// -----------------------------------------------------------------------------
// Q1: Basic class error boundary
//
// Kya karna hai:
// getDerivedStateFromError + componentDidCatch.
//
// Seedha matlab:
// hasError state → fallback. didCatch logging.
// -----------------------------------------------------------------------------
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.error("Boundary caught", error, info);
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? <p>Something broke.</p>;
    }
    return this.props.children;
  }
}

// -----------------------------------------------------------------------------
// Q2: Wrap risky widget
//
// Kya karna hai:
// <ErrorBoundary><Risky /></ErrorBoundary>
//
// Seedha matlab:
// Isolate blast radius. Baaki app chalega.
// -----------------------------------------------------------------------------
function Risky({ blow }) {
  if (blow) throw new Error("boom");
  return <p>OK</p>;
}

function Dashboard() {
  return (
    <div>
      <h1>Dash</h1>
      <ErrorBoundary fallback={<p>Widget failed</p>}>
        <Risky blow />
      </ErrorBoundary>
      <p>Still here</p>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q3: Reset by changing key
//
// Kya karna hai:
// key={resetId} boundary pe — remount clear error state.
//
// Seedha matlab:
// Retry UX: user "Try again" → key++.
// -----------------------------------------------------------------------------
function Recoverable() {
  const [resetId, setResetId] = useState(0);
  return (
    <div>
      <button onClick={() => setResetId((x) => x + 1)}>Try again</button>
      <ErrorBoundary key={resetId}>
        <Risky blow />
      </ErrorBoundary>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q4: Event handler errors NOT caught
//
// Kya karna hai:
// onClick me throw — boundary nahi pakdegi; try/catch.
//
// Seedha matlab:
// Interview classic. Handlers alag.
// -----------------------------------------------------------------------------
function ClickBomb() {
  return (
    <button
      onClick={() => {
        try {
          throw new Error("click boom");
        } catch (e) {
          console.error(e);
        }
      }}
    >
      Click
    </button>
  );
}

// -----------------------------------------------------------------------------
// Q5: [MID] Async errors NOT caught
//
// Kya karna hai:
// fetch().then throw — boundary nahi. Error state khud set.
//
// Seedha matlab:
// Data layer me error UI pattern (06/23).
// -----------------------------------------------------------------------------
function AsyncErrorDemo() {
  const [err, setErr] = useState(null);
  async function load() {
    try {
      throw new Error("network");
    } catch (e) {
      setErr(String(e));
    }
  }
  return (
    <div>
      <button onClick={load}>Load</button>
      {err && <p>{err}</p>}
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q6: Nested boundaries
//
// Kya karna hai:
// Page boundary + section boundary — granular fallbacks.
//
// Seedha matlab:
// Fine-grained UX: sidebar fail, main OK.
// -----------------------------------------------------------------------------
function Page() {
  return (
    <ErrorBoundary fallback={<p>Page crash</p>}>
      <ErrorBoundary fallback={<p>Side crash</p>}>
        <aside>Side</aside>
      </ErrorBoundary>
      <main>Main</main>
    </ErrorBoundary>
  );
}

// -----------------------------------------------------------------------------
// Q7: [MID] Logging service in didCatch
//
// Kya karna hai:
// Sentry/LogRocket style — componentDidCatch me report.
//
// Seedha matlab:
// Production observability. User ko friendly fallback.
// -----------------------------------------------------------------------------
class ReportingBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    // window.myLogger?.send(error, info);
    console.log("report", error.message, info.componentStack);
  }
  render() {
    if (this.state.hasError) return <p>Reported. Sorry.</p>;
    return this.props.children;
  }
}

// -----------------------------------------------------------------------------
// Q8: Libraries note
//
// Kya karna hai:
// react-error-boundary package — hooks-friendly API.
//
// Seedha matlab:
// Class boilerplate avoid karne ke liye team libs use karti.
// Concept same.
// -----------------------------------------------------------------------------
function Note() {
  return <p>Concept: isolate render errors with a boundary.</p>;
}

// -----------------------------------------------------------------------------
// Q9: getDerivedStateFromError — side effects mat
//
// Kya karna hai:
// Sirf state return karo; logging componentDidCatch me.
//
// Seedha matlab:
// getDerivedStateFromError pure hona chahiye — React rule.
// -----------------------------------------------------------------------------
class PureBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true }; // no fetch/log here
  }
  componentDidCatch(error, info) {
    console.error(error, info.componentStack);
  }
  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

// -----------------------------------------------------------------------------
// Q10: [MID] Custom fallback with error details (dev only)
//
// Kya karna hai:
// didCatch me error message state me (dev); prod me generic UI.
//
// Seedha matlab:
// User ko friendly; dev ko detail — env check se.
// -----------------------------------------------------------------------------
class DevFallbackBoundary extends Component {
  state = { hasError: false, msg: "" };
  static getDerivedStateFromError(error) {
    return { hasError: true, msg: error.message };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div>
          <p>Something went wrong.</p>
          {import.meta.env.DEV && <pre>{this.state.msg}</pre>}
        </div>
      );
    }
    return this.props.children;
  }
}

// -----------------------------------------------------------------------------
// Q11: componentStack se kaun crash hua
//
// Kya karna hai:
// info.componentStack logging me — Sentry ko bhejo.
//
// Seedha matlab:
// Stack batata kaun sa child component fail — debug fast.
// -----------------------------------------------------------------------------
class StackLogBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.log("componentStack:", info.componentStack);
  }
  render() {
    if (this.state.hasError) return <p>Logged with stack.</p>;
    return this.props.children;
  }
}

// -----------------------------------------------------------------------------
// Q12: [MID] useEffect throw — boundary pakdegi
//
// Kya karna hai:
// Effect ke andar throw → render phase me propagate → boundary catch.
//
// Seedha matlab:
// Async setTimeout throw nahi; sync throw effect me boundary tak ja sakta.
// -----------------------------------------------------------------------------
function EffectThrow({ bad }) {
  useEffect(() => {
    if (bad) throw new Error("effect sync throw");
  }, [bad]);
  return <p>Effect demo</p>;
}

// -----------------------------------------------------------------------------
// Q13: Render me conditional throw — classic catch
//
// Kya karna hai:
// if (!data) throw new Error — boundary fallback.
//
// Seedha matlab:
// Render/lifecycle errors — yahi boundary ka main job.
// -----------------------------------------------------------------------------
function RenderThrow({ data }) {
  if (!data) throw new Error("missing data");
  return <p>{data}</p>;
}

// -----------------------------------------------------------------------------
// Q14: [MID] SSR — error boundary server pe alag behavior
//
// Kya karna hai:
// Server render error → HTML error page; client hydrate alag.
//
// Seedha matlab:
// Boundary mostly client hydration/render; SSR errors often framework handle.
// -----------------------------------------------------------------------------
function SSRNote() {
  return (
    <p>
      SSR crash often whole response fail; client ErrorBoundary widget-level
      isolate karti hai.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q15: Boundary khud throw — parent boundary pakdegi
//
// Kya karna hai:
// Inner boundary render me crash → outer boundary fallback.
//
// Seedha matlab:
// Boundary apne errors catch nahi karti — parent ya white screen.
// -----------------------------------------------------------------------------
function OuterInnerDemo() {
  return (
    <ErrorBoundary fallback={<p>Outer caught</p>}>
      <ErrorBoundary fallback={<p>Inner caught</p>}>
        <Risky blow />
      </ErrorBoundary>
    </ErrorBoundary>
  );
}

// -----------------------------------------------------------------------------
// Q16: [MID] Granular boundaries — chart vs table alag
//
// Kya karna hai:
// Har widget apni boundary — ek fail, baaki dashboard live.
//
// Seedha matlab:
// Blast radius chhota = better UX + easier debug.
// -----------------------------------------------------------------------------
function WidgetGrid() {
  return (
    <div className="grid">
      <ErrorBoundary fallback={<p>Chart failed</p>}>
        <Risky blow={false} />
      </ErrorBoundary>
      <ErrorBoundary fallback={<p>Table failed</p>}>
        <Risky blow={false} />
      </ErrorBoundary>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q17: [ADV] React 19 — error overlay / use hook errors
//
// Kya karna hai:
// use() promise reject → nearest Suspense/boundary; dev overlay alag.
//
// Seedha matlab:
// React 19 me data errors Suspense boundary ke saath integrate ho rahe.
// -----------------------------------------------------------------------------
function React19Note() {
  return (
    <p>
      React 19: render errors + use() rejections — boundary/Suspense stack
      samjho; class boundary ab bhi render errors ke liye.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q18: [ADV] react-error-boundary — resetKeys prop
//
// Kya karna hai:
// resetKeys={[userId]} change → auto reset error state.
//
// Seedha matlab:
// Manual key++ ki jagah library prop — same remount idea.
// -----------------------------------------------------------------------------
function ResetKeysNote() {
  return (
    <p>
      react-error-boundary: resetKeys prop se boundary dubara try — key pattern
      automated.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q19: [ADV] try/catch render me — kaam nahi karta
//
// Kya karna hai:
// function App() { try { return Child } catch — ❌ child throw catch nahi.
//
// Seedha matlab:
// Render async nahi; child throw parent try se bypass — boundary chahiye.
// -----------------------------------------------------------------------------
function TryCatchLimit() {
  return (
    <p>
      Parent me try/catch child render throw nahi pakdega — ErrorBoundary use
      karo.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q20: [ADV] ErrorBoundary bahar, Suspense andar order
//
// Kya karna hai:
// ErrorBoundary wraps Suspense wraps Lazy — lazy fail + render fail dono.
//
// Seedha matlab:
// Suspense = loading; Boundary = error — outer boundary recommended.
// -----------------------------------------------------------------------------
function StackOrderNote() {
  return (
    <p>
      Pattern: ErrorBoundary → Suspense → LazyComponent. Import fail boundary
      pakdegi.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q21: [ADV] Logging — PII scrub before send
//
// Kya karna hai:
// didCatch me error.message safe; user input stack me mat bhejo raw.
//
// Seedha matlab:
// Production logging me GDPR/security — sanitize payload.
// -----------------------------------------------------------------------------
class SafeLogBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    const safe = {
      message: error.message?.slice(0, 200),
      stack: info.componentStack,
    };
    console.log("safe report", safe);
  }
  render() {
    if (this.state.hasError) return <p>Sorry, error reported.</p>;
    return this.props.children;
  }
}

// -----------------------------------------------------------------------------
// Q22: [ADV] Interview matrix — kya pakdega kya nahi
//
// Kya karna hai:
// Render/lifecycle ✅ | Events ❌ | Async ❌ | Boundary self ❌ | SSR ⚠️
//
// Seedha matlab:
// Ek table yahin yaad — interview me fast answer.
// -----------------------------------------------------------------------------
function CatchMatrix() {
  return (
    <table>
      <tbody>
        <tr><td>Render throw</td><td>✅ Boundary</td></tr>
        <tr><td>onClick throw</td><td>❌ try/catch</td></tr>
        <tr><td>fetch().then throw</td><td>❌ error state</td></tr>
        <tr><td>Boundary render throw</td><td>❌ parent boundary</td></tr>
      </tbody>
    </table>
  );
}

export {
  ErrorBoundary,
  Risky,
  Dashboard,
  Recoverable,
  ClickBomb,
  AsyncErrorDemo,
  Page,
  ReportingBoundary,
  Note,
  PureBoundary,
  DevFallbackBoundary,
  StackLogBoundary,
  EffectThrow,
  RenderThrow,
  SSRNote,
  OuterInnerDemo,
  WidgetGrid,
  React19Note,
  ResetKeysNote,
  TryCatchLimit,
  StackOrderNote,
  SafeLogBoundary,
  CatchMatrix,
};
