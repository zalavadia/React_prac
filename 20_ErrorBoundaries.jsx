// ============================================================================
// 20 — Error Boundaries
// Level: MID  |  Sequence: read this file, then the next number
// ============================================================================
//
// SIMPLE: Error boundary = safety net. Child tree crash during render → instead of
// whole app white screen, show fallback UI. Class component (or library).
//
// Catch: render, lifecycle, constructors of children.
// NOT catch: event handlers, async, SSR, boundary's own errors — use try/catch there.
//
// WHY: Production resilience. Widget fail ≠ whole app die.
// INTERVIEW: what they catch / don't; class getDerivedStateFromError.
// Use in a Vite + React 19 project — teaching file. (class API intentional here)
//
// ============================================================================

import { Component, useEffect, useState } from "react";

// -----------------------------------------------------------------------------
// Q1: Basic class error boundary
//
// Task:
// getDerivedStateFromError + componentDidCatch.
//
// In simple words:
// hasError state → fallback. didCatch for logging.
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
// Task:
// <ErrorBoundary><Risky /></ErrorBoundary>
//
// In simple words:
// Isolate blast radius. Rest of app keeps running.
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
// Task:
// key={resetId} on boundary — remount clears error state.
//
// In simple words:
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
// Task:
// throw in onClick — boundary won't catch; use try/catch.
//
// In simple words:
// Interview classic. Handlers are separate.
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
// Task:
// fetch().then throw — boundary won't. Set error state yourself.
//
// In simple words:
// Data layer error UI pattern (06/23).
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
// Task:
// Page boundary + section boundary — granular fallbacks.
//
// In simple words:
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
// Task:
// Sentry/LogRocket style — report in componentDidCatch.
//
// In simple words:
// Production observability. User gets friendly fallback.
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
// Task:
// react-error-boundary package — hooks-friendly API.
//
// In simple words:
// Teams use libs to avoid class boilerplate.
// Concept same.
// -----------------------------------------------------------------------------
function Note() {
  return <p>Concept: isolate render errors with a boundary.</p>;
}

// -----------------------------------------------------------------------------
// Q9: getDerivedStateFromError — no side effects
//
// Task:
// Only return state; logging in componentDidCatch.
//
// In simple words:
// getDerivedStateFromError must be pure — React rule.
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
// Task:
// didCatch error message in state (dev); generic UI in prod.
//
// In simple words:
// Friendly for user; detail for dev — check env.
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
// Q11: componentStack — which component crashed
//
// Task:
// info.componentStack in logging — send to Sentry.
//
// In simple words:
// Stack shows which child failed — faster debug.
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
// Q12: [MID] useEffect throw — boundary catches
//
// Task:
// Throw inside effect → propagates to render phase → boundary catch.
//
// In simple words:
// setTimeout throw no; sync throw in effect can reach boundary.
// -----------------------------------------------------------------------------
function EffectThrow({ bad }) {
  useEffect(() => {
    if (bad) throw new Error("effect sync throw");
  }, [bad]);
  return <p>Effect demo</p>;
}

// -----------------------------------------------------------------------------
// Q13: Render conditional throw — classic catch
//
// Task:
// if (!data) throw new Error — boundary fallback.
//
// In simple words:
// Render/lifecycle errors — main job of boundary.
// -----------------------------------------------------------------------------
function RenderThrow({ data }) {
  if (!data) throw new Error("missing data");
  return <p>{data}</p>;
}

// -----------------------------------------------------------------------------
// Q14: [MID] SSR — error boundary different behavior on server
//
// Task:
// Server render error → HTML error page; client hydrate different.
//
// In simple words:
// Boundary mostly client hydration/render; SSR errors often handled by framework.
// -----------------------------------------------------------------------------
function SSRNote() {
  return (
    <p>
      SSR crash often fails whole response; client ErrorBoundary isolates at widget
      level.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q15: Boundary itself throws — parent boundary catches
//
// Task:
// Inner boundary crash in render → outer boundary fallback.
//
// In simple words:
// Boundary doesn't catch its own errors — parent or white screen.
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
// Q16: [MID] Granular boundaries — chart vs table separate
//
// Task:
// Each widget its own boundary — one fail, rest of dashboard live.
//
// In simple words:
// Smaller blast radius = better UX + easier debug.
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
// Task:
// use() promise reject → nearest Suspense/boundary; dev overlay separate.
//
// In simple words:
// React 19: data errors integrate with Suspense boundary.
// Class boundary still for render errors.
// -----------------------------------------------------------------------------
function React19Note() {
  return (
    <p>
      React 19: render errors + use() rejections — understand boundary/Suspense
      stack; class boundary still for render errors.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q18: [ADV] react-error-boundary — resetKeys prop
//
// Task:
// resetKeys={[userId]} change → auto reset error state.
//
// In simple words:
// Instead of manual key++, library prop — same remount idea.
// -----------------------------------------------------------------------------
function ResetKeysNote() {
  return (
    <p>
      react-error-boundary: resetKeys prop retries boundary — automated key
      pattern.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q19: [ADV] try/catch in render — doesn't work
//
// Task:
// function App() { try { return Child } catch — ❌ child throw not caught.
//
// In simple words:
// Render isn't async; child throw bypasses parent try — need ErrorBoundary.
// -----------------------------------------------------------------------------
function TryCatchLimit() {
  return (
    <p>
      Parent try/catch won't catch child render throw — use ErrorBoundary.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q20: [ADV] ErrorBoundary outside, Suspense inside order
//
// Task:
// ErrorBoundary wraps Suspense wraps Lazy — lazy fail + render fail both.
//
// In simple words:
// Suspense = loading; Boundary = error — outer boundary recommended.
// -----------------------------------------------------------------------------
function StackOrderNote() {
  return (
    <p>
      Pattern: ErrorBoundary → Suspense → LazyComponent. Import fail caught by
      boundary.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q21: [ADV] Logging — PII scrub before send
//
// Task:
// didCatch error.message safe; don't send raw user input in stack.
//
// In simple words:
// Production logging GDPR/security — sanitize payload.
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
// Q22: [ADV] Interview matrix — what catches what
//
// Task:
// Render/lifecycle ✅ | Events ❌ | Async ❌ | Boundary self ❌ | SSR ⚠️
//
// In simple words:
// Remember this table — fast interview answer.
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
