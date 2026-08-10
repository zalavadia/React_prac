// ============================================================================
// 39 — React Compiler + useEffectEvent (React 19.2)
// Level: REACT19  |  Study in order: read this file first, then the next number
// ============================================================================
//
// SIMPLE: Two separate tools, often discussed together:
//
// 1) React Compiler (aka React Forget) —
//    build-time tool that automatically thinks in terms of memoization (useMemo/useCallback/React.memo
//    less manually). Still opt-in / ecosystem adoption — understand "magic compiler on" and
//    still follow the rules of React (pure render, etc.).
//
// 2) useEffectEvent (React 19.2) —
//    A function INSIDE an effect that ALWAYS reads the latest props/state,
//    but does not re-run the effect just because those values changed.
//    This solves the tension between "stale closure" and "too many effect runs".
//
// ❌ WRONG use: a shortcut to keep an empty dependency array / suppress eslint.
// ✅ CORRECT use: keep effect subscribe logic stable; use fresh values inside the event handler.
//
// WHY: 19.2 interviews + the nuance of "can we remove memo because of the compiler?".
// INTERVIEW: EffectEvent ≠ missing dep fix; compiler constraints.
//
// ============================================================================

import { useState, useEffect, useEffectEvent } from "react";

// -----------------------------------------------------------------------------
// Q1: React Compiler — in simple words
//
// In simple words:
// The compiler analyzes which JSX/calc can be cached.
// You do not manually slap React.memo everywhere.
// Still: impure render (math.random during render), mutating props —
// both the compiler and React will be unhappy.
// -----------------------------------------------------------------------------
const compilerIdea = {
  goal: "auto-memoize safe values/components",
  stillRequired: "pure components, immutable props/state updates",
  notMagic: "won't fix bad architecture or fetch-in-render chaos",
};

// -----------------------------------------------------------------------------
// Q2: [MID] Should we remove useMemo when the compiler arrives?
//
// In simple words:
// Gradually: measure, follow compiler docs/compatibility.
// Manual memo is still valid when intentional / compiler off / edge cases.
// Interview: "compiler reduces NEED, not understanding of referential equality".
// -----------------------------------------------------------------------------
export function ExpensiveList({ items }) {
  // Without compiler you might useMemo filtered list.
  // With compiler, often plain derived value is fine IF pure:
  const visible = items.filter((x) => x.active);
  return (
    <ul>
      {visible.map((x) => (
        <li key={x.id}>{x.name}</li>
      ))}
    </ul>
  );
}

// -----------------------------------------------------------------------------
// Q3: Stale closure problem (why EffectEvent exists)
//
// In simple words:
// Effect handler with [] deps — count inside is OLD.
// Put count in deps — effect re-subscribes on every count change (waste / bugs).
// -----------------------------------------------------------------------------
export function StaleChatBad({ roomId }) {
  const [messages, setMessages] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    function onMessage(msg) {
      // ❌ if count is used here and deps are [roomId] only → stale count
      console.log("got", msg, "count was", count);
      setMessages((m) => [...m, msg]);
    }
    // fakeSubscribe(roomId, onMessage);
    // return () => fakeUnsubscribe(roomId, onMessage);
  }, [roomId, count]); // count causes re-subscribe — sometimes unwanted

  return (
    <button onClick={() => setCount((c) => c + 1)}>
      ping {count} / msgs {messages.length}
    </button>
  );
}

// -----------------------------------------------------------------------------
// Q4: useEffectEvent — latest values, stable effect deps
//
// In simple words:
// onMessage = useEffectEvent((msg) => { ... use latest count ... })
// Effect subscribes only on [roomId].
// Do NOT put the event function identity in effect deps.
// -----------------------------------------------------------------------------
export function ChatWithEffectEvent({ roomId }) {
  const [messages, setMessages] = useState([]);
  const [count, setCount] = useState(0);

  const onMessage = useEffectEvent((msg) => {
    // always latest count
    console.log("count now", count);
    setMessages((m) => [...m, msg]);
  });

  useEffect(() => {
    function handler(msg) {
      onMessage(msg);
    }
    // subscribe(roomId, handler)
    // return () => unsubscribe(roomId, handler)
  }, [roomId]); // onMessage intentionally NOT a dep

  return (
    <button onClick={() => setCount((c) => c + 1)}>
      {count} / {messages.length}
    </button>
  );
}

// -----------------------------------------------------------------------------
// Q5: [MID] DON'T use EffectEvent to silence eslint
//
// In simple words:
// If data should trigger the effect RUN (fetch id change),
// it belongs in the dependency array — do not hide it in EffectEvent.
// EffectEvent = "event fired later, read latest".
// Reactive input to effect = real dependency.
// -----------------------------------------------------------------------------
export function FetchUser({ userId }) {
  const [user, setUser] = useState(null);

  // ✅ userId belongs in deps — effect must re-run when id changes
  useEffect(() => {
    let cancelled = false;
    fetch("/api/users/" + userId)
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled) setUser(data);
      });
    return () => {
      cancelled = true;
    };
  }, [userId]);

  return <pre>{JSON.stringify(user)}</pre>;
}

// -----------------------------------------------------------------------------
// Q6: Analytics click — EffectEvent-shaped thinking
//
// In simple words:
// Subscribe once; when the event fires, read the latest theme/user.
// Classic EffectEvent fit.
// -----------------------------------------------------------------------------
export function TrackClicks({ userId, theme }) {
  const logClick = useEffectEvent((target) => {
    console.log("click", { userId, theme, target });
  });

  useEffect(() => {
    function onClick(e) {
      logClick(e.target?.tagName);
    }
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  return <p>Click anywhere (demo)</p>;
}

// -----------------------------------------------------------------------------
// Q7: React 19.2 Activity (brief)
//
// In simple words:
// Activity = hide/show UI with better semantics than display:none hacks
// (state preserve / priority — follow current React 19.2 docs).
// Overview in file 28 first; here just remember: "exists, don't invent API from memory".
// -----------------------------------------------------------------------------
const activityNote =
  "Activity in 19.2: check official docs for hide/show + preserve patterns.";

// -----------------------------------------------------------------------------
// Q8: [MID] Compiler + Effects together
//
// In simple words:
// The compiler reduces re-renders; effects still sync external systems.
// Do not use effects to "derive state" — calculate during render.
// EffectEvent keeps external event/subscribe paths clean.
// -----------------------------------------------------------------------------
const together = {
  compiler: "render cost / referential stability",
  effects: "sync with outside world",
  effectEvent: "latest props inside those syncs without extra resubscribe",
};

// -----------------------------------------------------------------------------
// Q9: Interview closer
//
// In simple words:
// "Compiler memoizes safely when code follows Rules of React.
// useEffectEvent latest values in effect callbacks — NOT a deps escape hatch.
// Missing dep that should re-fire effect = still a bug."
// -----------------------------------------------------------------------------
export const interviewCloser =
  "EffectEvent for non-reactive event reads; real reactive inputs stay in deps.";

// -----------------------------------------------------------------------------
// Q10: [MID] React Compiler — what breaks memo assumptions
//
// Task:
// Mutating props, context, or module vars during render — compiler can't save you.
//
// In simple words:
// Pure render: same props+state → same JSX output.
// React 18 manual memo also fails with impure render.
// Compiler opt-in project config — not global React default yet.
// eslint-plugin-react-compatibility follow during adoption.
// Measure before deleting all useMemo.
// -----------------------------------------------------------------------------
const compilerBreaks = [
  "mutating props or state in place",
  "reading mutable module globals in render",
  "side effects during render",
  "unstable external store reads without subscription",
];

// -----------------------------------------------------------------------------
// Q11: Compiler vs React.memo — coexistence
//
// Task:
// Even with compiler on, explicit memo is not harmful — may be redundant.
//
// In simple words:
// Library components export memo for consumers without compiler.
// React 18 libs still ship React.memo — valid.
// Gradual adoption: enable compiler on app, profile, remove redundant memos.
// Interview: "compiler reduces need, not knowledge".
// -----------------------------------------------------------------------------
export function CompilerMemoCoexist() {
  return <p>Manual memo and compiler can coexist during migration — profile before mass removal.</p>;
}

// -----------------------------------------------------------------------------
// Q12: [MID] useEffectEvent — NOT callable during render
//
// Task:
// Do not call onMessage() during render — only inside effect/subscription callback.
//
// In simple words:
// Calling EffectEvent function during render is forbidden — rules similar to event handler.
// React 19.2 new — older versions lack hook.
// React 18 workaround: ref holding latest callback manually (callback ref pattern).
// Trap: do not blindly put EffectEvent on JSX onClick like a normal event handler.
// -----------------------------------------------------------------------------
export function EffectEventRenderTrap() {
  const log = useEffectEvent(() => {
    console.log("only from effect/subscription");
  });
  useEffect(() => {
    const id = setInterval(() => log(), 5000);
    return () => clearInterval(id);
  }, []); // log is EffectEvent — intentionally not a dep
  return <p>EffectEvent called from interval inside effect — OK</p>;
}

// -----------------------------------------------------------------------------
// Q13: Ref pattern before EffectEvent (React 18 style)
//
// Task:
// latestCallbackRef.current = fn; effect subscribes stable wrapper calling ref.current().
//
// In simple words:
// Manual latest ref pattern — EffectEvent replaces boilerplate.
// This pattern was common in React 18 codebases for subscriptions.
// Migration 19.2: replace ref callback bridge with useEffectEvent where fit.
// Still valid without 19.2 — don't block upgrade.
// -----------------------------------------------------------------------------
const react18LatestRefPattern =
  "useRef + assign latest handler each render + stable subscribe wrapper — EffectEvent replaces this.";

// -----------------------------------------------------------------------------
// Q14: [MID] EffectEvent vs useCallback deps
//
// Task:
// Pass useCallback(fn, [many deps]) to effect → deps change → resubscribe.
//
// In simple words:
// EffectEvent when values needed at event time not subscription time.
// useCallback is still fine for normal JSX handlers.
// React 18: useCallback + deps on handler passed to effect → same resubscribe issue.
// Choose: reactive deps → put in effect deps; non-reactive read → EffectEvent.
// -----------------------------------------------------------------------------
export function EffectEventVsCallback() {
  return (
    <p>
      useCallback for render handlers; useEffectEvent for handlers invoked from effects/subscriptions reading latest props.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q15: Activity API — when to look (19.2)
//
// Task:
// Hidden tabs preserving state — follow Activity component docs; do not invent API.
//
// In simple words:
// Alternative to display:none + keep mounted hacks possibly cleaner semantics.
// React 18: conditional render loses state unless keep mounted manually.
// Exact props/check official 19.2 release notes — interview say "know it exists".
// Framework integration may vary.
// -----------------------------------------------------------------------------
const activityWhen =
  "Use Activity for hide/show preserving UI state — verify current React 19.2 docs before production.";

// -----------------------------------------------------------------------------
// Q16: [MID] Compiler + Context unstable value
//
// Task:
// Compiler may optimize context read but unstable Provider value still re-renders consumers.
//
// In simple words:
// Compiler ≠ fix context value={{}} trap automatically always.
// React 18 useMemo on provider value; 19 same (file 36).
// Profile before assuming compiler solved perf.
// Split contexts structural fix.
// -----------------------------------------------------------------------------
export function CompilerContextInteraction() {
  return <p>Compiler optimizes some memoization; unstable context values still need architectural fixes.</p>;
}

// -----------------------------------------------------------------------------
// Q17: [ADV] EffectEvent in Strict Mode dev
//
// Task:
// Effect double setup dev — subscription must cleanup; EffectEvent identity stable.
//
// In simple words:
// React 18 Strict Mode same double invoke.
// EffectEvent designed stable across renders — don't put in effect deps.
// Verify cleanup on unmount still runs.
// Production single mount.
// -----------------------------------------------------------------------------
const effectEventStrict =
  "Strict Mode double effects in dev — ensure subscribe/unsubscribe idempotent; EffectEvent not in deps.";

// -----------------------------------------------------------------------------
// Q18: [MID] When NOT enable React Compiler yet
//
// Task:
// Legacy code impure, incompatible libs, no time to fix eslint violations.
//
// In simple words:
// Opt-in toolchain — Babel/plugin setup required.
// React 18 apps run fine without compiler indefinitely.
// Team bandwidth to fix purity violations first.
// Libraries may not be compiler-tested — check compatibility lists.
// -----------------------------------------------------------------------------
const whenNotCompiler = [
  "impure render patterns widespread",
  "incompatible dependency libs",
  "no CI time to fix compiler lint violations",
];

// -----------------------------------------------------------------------------
// Q19: [ADV] derive during render vs EffectEvent
//
// Task:
// displayed = props.a + props.b → in render; do not use EffectEvent.
//
// In simple words:
// EffectEvent is for external event timing — websocket message, DOM event.
// React 18: derive in render same rule.
// Compiler loves derived render values — do not derive from effects.
// Missing dep in effect fetch userId — EffectEvent is WRONG fix; userId must be in deps (Q5).
// -----------------------------------------------------------------------------
export function DeriveInRender({ a, b }) {
  const sum = a + b;
  return <p>{sum}</p>;
}

// -----------------------------------------------------------------------------
// Q20: [MID] Migration React 18 → 19.2 EffectEvent
//
// Task:
// Find ref-bridge patterns in effects → replace with useEffectEvent stepwise.
//
// In simple words:
// Requires react 19.2+ — feature detect / version check docs.
// React 18 latestRef in subscription effects is a common migration target.
// Do not migrate effect deps that should stay reactive.
// Test subscription behavior after refactor thoroughly.
// -----------------------------------------------------------------------------
const effectEventMigration =
  "Replace latest-ref callback bridges in effects with useEffectEvent where reads are non-reactive.";

// -----------------------------------------------------------------------------
// Q21: [ADV] Compiler interview traps
//
// Task:
// "Compiler on so Rules of React optional?" — NO. "All useMemo delete?" — measure first.
//
// In simple words:
// Compiler doesn't remove need for keys, pure components, proper state design.
// React 18 devs still need referential equality understanding debugging.
// Third-party memo expectations may remain.
// Edge SSR/hydration purity still matters.
// -----------------------------------------------------------------------------
export const compilerInterviewTraps = [
  "thinking compiler fixes impure render",
  "removing all useMemo without profiling",
  "ignoring Rules of React",
  "assuming library components auto-compatible",
];

// -----------------------------------------------------------------------------
// Q22: [ADV] Full stack answer — Compiler + EffectEvent + React 19 forms
//
// Task:
// Tie together: compiler reduces render cost; actions handle async forms; EffectEvent cleans subscriptions.
//
// In simple words:
// Orthogonal tools — not replacements for each other.
// React 18 upgrade path: 19 hooks first, compiler optional, EffectEvent when on 19.2.
// Activity exploratory 19.2.
// Interview close: purity + correct deps + Actions for forms + EffectEvent for effect events only.
// Common bug: using EffectEvent to hide fetch deps — still wrong.
// -----------------------------------------------------------------------------
export const fullStackReact19_2Answer = {
  compiler: "build-time memoization — purity required",
  actions: "forms/async UX — useActionState/useFormStatus",
  effectEvent: "latest values in effect-driven events — not dep suppression",
  activity: "hide/show state preserve — see 19.2 docs",
  migrationOrder: ["React 19 core hooks", "optional compiler", "19.2 EffectEvent when ready"],
};
