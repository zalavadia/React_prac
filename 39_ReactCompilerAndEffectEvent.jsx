// ============================================================================
// 39 — React Compiler + useEffectEvent (React 19.2)
// Level: REACT19  |  Sequence seekho: pehle yeh file, phir agla number
// ============================================================================
//
// LAYMAN: Do alag tools, aksar ek saath discuss:
//
// 1) React Compiler (aka React Forget) —
//    build-time tool jo automatically memoize soch (useMemo/useCallback/React.memo
//    manually kam). Abhi opt-in / ecosystem adopt — "magic compiler on" samajh ke
//    rules of React follow karo (pure render, etc.).
//
// 2) useEffectEvent (React 19.2) —
//    Effect ke ANDAR aisa function jo HAMESHA latest props/state padhe,
//    lekin effect ko dubara run na karaye sirf un values ke change pe.
//    Ye "stale closure" vs "too many effect runs" tension solve karta.
//
// ❌ GALAT use: dependency array khali rakhne / eslint suppress karne ka shortcut.
// ✅ SAHI use: effect subscribe logic stable; event handler ke andar fresh values.
//
// KYUN: 19.2 interviews + "compiler se memo hata do?" nuance.
// INTERVIEW: EffectEvent ≠ missing dep fix; compiler constraints.
//
// ============================================================================

import { useState, useEffect, useEffectEvent } from "react";

// -----------------------------------------------------------------------------
// Q1: React Compiler — seedha matlab
//
// Seedha matlab:
// Compiler analyze karta: kaunsa JSX/calc cache ho sakta.
// Tum manually React.memo har jagah nahi chipkate.
// Phir bhi: impure render (math.random during render), mutating props —
// compiler + React dono naraz.
// -----------------------------------------------------------------------------
const compilerIdea = {
  goal: "auto-memoize safe values/components",
  stillRequired: "pure components, immutable props/state updates",
  notMagic: "won't fix bad architecture or fetch-in-render chaos",
};

// -----------------------------------------------------------------------------
// Q2: [MID] Compiler aane se useMemo hata dein?
//
// Seedha matlab:
// Gradually: measure, follow compiler docs/compatibility.
// Manual memo ab bhi valid jab intentional / compiler off / edge cases.
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
// Seedha matlab:
// Effect me handler [] deps ke saath — andar count PURANA.
// count deps me daalo — effect har count pe re-subscribe (waste / bugs).
// -----------------------------------------------------------------------------
export function StaleChatBad({ roomId }) {
  const [messages, setMessages] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    function onMessage(msg) {
      // ❌ agar count yahan use aur deps [roomId] only → stale count
      console.log("got", msg, "count was", count);
      setMessages((m) => [...m, msg]);
    }
    // fakeSubscribe(roomId, onMessage);
    // return () => fakeUnsubscribe(roomId, onMessage);
  }, [roomId, count]); // count se re-subscribe — sometimes unwanted

  return (
    <button onClick={() => setCount((c) => c + 1)}>
      ping {count} / msgs {messages.length}
    </button>
  );
}

// -----------------------------------------------------------------------------
// Q4: useEffectEvent — latest values, stable effect deps
//
// Seedha matlab:
// onMessage = useEffectEvent((msg) => { ... use latest count ... })
// Effect sirf [roomId] pe subscribe.
// Event function identity effect deps me NAHI dalni.
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
// Seedha matlab:
// Agar data effect ke RUN trigger me hona chahiye (fetch id change),
// woh dependency ME hona chahiye — EffectEvent me mat chhupao.
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
// Seedha matlab:
// Subscribe once; jab event aaye tab latest theme/user padho.
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
// Seedha matlab:
// Activity = UI ko hide/show with better semantics than display:none hacks
// (state preserve / priority — follow current React 19.2 docs).
// Overview pehle file 28; yahan sirf yaad: "exists, don't invent API from memory".
// -----------------------------------------------------------------------------
const activityNote =
  "Activity in 19.2: check official docs for hide/show + preserve patterns.";

// -----------------------------------------------------------------------------
// Q8: [MID] Compiler + Effects together
//
// Seedha matlab:
// Compiler re-renders kam kare; effects phir bhi sync external systems.
// Effects ko "derive state" ke liye mat use karo — calculate during render.
// EffectEvent external event/subscribe paths clean rakhe.
// -----------------------------------------------------------------------------
const together = {
  compiler: "render cost / referential stability",
  effects: "sync with outside world",
  effectEvent: "latest props inside those syncs without extra resubscribe",
};

// -----------------------------------------------------------------------------
// Q9: Interview closer
//
// Seedha matlab:
// "Compiler memoizes safely when code follows Rules of React.
// useEffectEvent latest values in effect callbacks — NOT a deps escape hatch.
// Missing dep that should re-fire effect = still a bug."
// -----------------------------------------------------------------------------
export const interviewCloser =
  "EffectEvent for non-reactive event reads; real reactive inputs stay in deps.";

// -----------------------------------------------------------------------------
// Q10: [MID] React Compiler — what breaks memo assumptions
//
// Kya karna hai:
// Mutating props, context, or module vars during render — compiler can't save you.
//
// Seedha matlab:
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
// Kya karna hai:
// Compiler on hone pe bhi explicit memo harmful nahi — redundant ho sakta.
//
// Seedha matlab:
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
// Kya karna hai:
// onMessage() render me mat bulao — sirf effect/subscription callback ke andar.
//
// Seedha matlab:
// EffectEvent function render phase me forbidden — rules similar event handler.
// React 19.2 new — older versions lack hook.
// React 18 workaround: ref holding latest callback manually (callback ref pattern).
// Trap: EffectEvent ko normal event handler ki tarah JSX onClick me mat daalo blindly.
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
// Kya karna hai:
// latestCallbackRef.current = fn; effect subscribes stable wrapper calling ref.current().
//
// Seedha matlab:
// Manual latest ref pattern — EffectEvent replaces boilerplate.
// React 18 codebase me yeh pattern common tha subscriptions me.
// Migration 19.2: replace ref callback bridge with useEffectEvent where fit.
// Still valid without 19.2 — don't block upgrade.
// -----------------------------------------------------------------------------
const react18LatestRefPattern =
  "useRef + assign latest handler each render + stable subscribe wrapper — EffectEvent replaces this.";

// -----------------------------------------------------------------------------
// Q14: [MID] EffectEvent vs useCallback deps
//
// Kya karna hai:
// useCallback(fn, [many deps]) effect me pass → deps change → resubscribe.
//
// Seedha matlab:
// EffectEvent when values needed at event time not subscription time.
// useCallback still fine normal JSX handlers ke liye.
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
// Kya karna hai:
// Hidden tabs preserving state — Activity component docs follow; don't invent API.
//
// Seedha matlab:
// Alternative display:none + keep mounted hacks possibly cleaner semantics.
// React 18: conditional render loses state unless keep mounted manually.
// Exact props/check official 19.2 release notes — interview say "know it exists".
// Framework integration may vary.
// -----------------------------------------------------------------------------
const activityWhen =
  "Use Activity for hide/show preserving UI state — verify current React 19.2 docs before production.";

// -----------------------------------------------------------------------------
// Q16: [MID] Compiler + Context unstable value
//
// Kya karna hai:
// Compiler context read optimize kar sakta but unstable Provider value still re-renders consumers.
//
// Seedha matlab:
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
// Kya karna hai:
// Effect double setup dev — subscription must cleanup; EffectEvent identity stable.
//
// Seedha matlab:
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
// Kya karna hai:
// Legacy code impure, incompatible libs, no time to fix eslint violations.
//
// Seedha matlab:
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
// Kya karna hai:
// displayed = props.a + props.b → render me; EffectEvent mat lagao.
//
// Seedha matlab:
// EffectEvent external event timing ke liye — websocket message, DOM event.
// React 18: derive in render same rule.
// Compiler loves derived render values — effects se derive mat karo.
// Missing dep in effect fetch userId — EffectEvent WRONG fix; userId dep me hona chahiye (Q5).
// -----------------------------------------------------------------------------
export function DeriveInRender({ a, b }) {
  const sum = a + b;
  return <p>{sum}</p>;
}

// -----------------------------------------------------------------------------
// Q20: [MID] Migration React 18 → 19.2 EffectEvent
//
// Kya karna hai:
// Find ref-bridge patterns in effects → replace with useEffectEvent stepwise.
//
// Seedha matlab:
// Requires react 19.2+ — feature detect / version check docs.
// React 18 latestRef in subscription effects common migration target.
// Don't migrate effect deps that should stay reactive.
// Test subscription behavior after refactor thoroughly.
// -----------------------------------------------------------------------------
const effectEventMigration =
  "Replace latest-ref callback bridges in effects with useEffectEvent where reads are non-reactive.";

// -----------------------------------------------------------------------------
// Q21: [ADV] Compiler interview traps
//
// Kya karna hai:
// "Compiler on so Rules of React optional?" — NO. "All useMemo delete?" — measure first.
//
// Seedha matlab:
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
// Kya karna hai:
// Tie together: compiler reduces render cost; actions handle async forms; EffectEvent cleans subscriptions.
//
// Seedha matlab:
// Orthogonal tools — not replacements for each other.
// React 18 upgrade path: 19 hooks first, compiler optional, EffectEvent when on 19.2.
// Activity exploratory 19.2.
// Interview close: purity + correct deps + Actions for forms + EffectEvent for effect events only.
// Common bug: EffectEvent to hide fetch deps — still wrong.
// -----------------------------------------------------------------------------
export const fullStackReact19_2Answer = {
  compiler: "build-time memoization — purity required",
  actions: "forms/async UX — useActionState/useFormStatus",
  effectEvent: "latest values in effect-driven events — not dep suppression",
  activity: "hide/show state preserve — see 19.2 docs",
  migrationOrder: ["React 19 core hooks", "optional compiler", "19.2 EffectEvent when ready"],
};
