// ============================================================================
// 18 — useLayoutEffect
// Level: MID  |  Sequence: pehle yeh, phir agla number
// ============================================================================
//
// LAYMAN: useEffect = paint KE BAAD kaam (user flash dekh sakta).
// useLayoutEffect = DOM update ke baad, BROWSER PAINT SE PEHLE sync.
// Jaise measure karke position set — flash avoid.
//
// Default prefer useEffect. useLayoutEffect blocking — jyada use = jank.
// SSR: useLayoutEffect warning — client-only measure patterns.
//
// KYUN: Tooltip position, scroll lock measure, avoid flicker.
// INTERVIEW: effect vs layoutEffect timing; when necessary.
// Vite/React 19 project me use — teaching file.
//
// ============================================================================

import { useEffect, useLayoutEffect, useRef, useState } from "react";

// -----------------------------------------------------------------------------
// Q1: Measure DOM before paint
//
// Kya karna hai:
// ref height padh ke state — layoutEffect me.
//
// Seedha matlab:
// useEffect me measure → pehle galat frame flash ho sakta.
// -----------------------------------------------------------------------------
function Measure() {
  const ref = useRef(null);
  const [h, setH] = useState(0);
  useLayoutEffect(() => {
    setH(ref.current.getBoundingClientRect().height);
  }, []);
  return (
    <div>
      <div ref={ref}>Content</div>
      <p>Height: {h}</p>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q2: Tooltip position
//
// Kya karna hai:
// Anchor rect → tooltip top/left set before paint.
//
// Seedha matlab:
// Classic layoutEffect use-case.
// -----------------------------------------------------------------------------
function Tooltip({ anchorRef, text }) {
  const tipRef = useRef(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  useLayoutEffect(() => {
    const r = anchorRef.current.getBoundingClientRect();
    setPos({ top: r.bottom + 8, left: r.left });
  }, [anchorRef, text]);
  return (
    <div
      ref={tipRef}
      style={{ position: "fixed", top: pos.top, left: pos.left }}
    >
      {text}
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q3: Prefer useEffect for data fetch
//
// Kya karna hai:
// Fetch layoutEffect me mat — UI block.
//
// Seedha matlab:
// Network = async = useEffect. Rule of thumb.
// -----------------------------------------------------------------------------
function Users() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("/api/users")
      .then((r) => r.json())
      .then(setUsers);
  }, []);
  return <pre>{JSON.stringify(users)}</pre>;
}

// -----------------------------------------------------------------------------
// Q4: Sync scroll position
//
// Kya karna hai:
// Restore scrollY before paint — kam flicker.
//
// Seedha matlab:
// Visual sync → layoutEffect candidate.
// -----------------------------------------------------------------------------
function RestoreScroll({ y }) {
  useLayoutEffect(() => {
    window.scrollTo(0, y);
  }, [y]);
  return null;
}

// -----------------------------------------------------------------------------
// Q5: [MID] setState in layoutEffect still re-render
//
// Kya karna hai:
// Measure → setState → extra render pehle paint — intentional.
//
// Seedha matlab:
// Double render cost accept for correct first paint.
// -----------------------------------------------------------------------------
function Box() {
  const ref = useRef(null);
  const [w, setW] = useState(0);
  useLayoutEffect(() => {
    setW(ref.current.offsetWidth);
  });
  return <div ref={ref}>w={w}</div>;
}

// -----------------------------------------------------------------------------
// Q6: Cleanup same as useEffect
//
// Kya karna hai:
// return () => cleanup — listeners etc.
//
// Seedha matlab:
// Timing alag; cleanup API same.
// -----------------------------------------------------------------------------
function LockScroll() {
  useLayoutEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);
  return <p>Modal open — scroll locked</p>;
}

// -----------------------------------------------------------------------------
// Q7: [MID] SSR warning awareness
//
// Kya karna hai:
// Server pe layoutEffect nahi chalta — hydrate mismatch careful.
//
// Seedha matlab:
// Measure-only after mount. Initial render safe default.
// -----------------------------------------------------------------------------
function ClientOnlyMeasure() {
  const [ready, setReady] = useState(false);
  useLayoutEffect(() => setReady(true), []);
  if (!ready) return null;
  return <Measure />;
}

// -----------------------------------------------------------------------------
// Q8: Decision cheat
//
// Kya karna hai:
// Flicker/measure/DOM read-write sync? layout. Else effect.
//
// Seedha matlab:
// Interview one-liner yahi.
// -----------------------------------------------------------------------------
function CheatSheet() {
  return (
    <p>
      useEffect = after paint · useLayoutEffect = before paint (rare)
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q9: Paint blocking explained
//
// Kya karna hai:
// useLayoutEffect browser ko paint rokta hai jab tak sync work khatam na ho.
//
// Seedha matlab:
// Lamba layoutEffect = jank, FPS drop. Chhota sync DOM tweak OK.
// Default useEffect — paint pehle, user responsive feel.
// -----------------------------------------------------------------------------
function PaintBlockNote() {
  return <p>layoutEffect sync = main thread block until done.</p>;
}

// -----------------------------------------------------------------------------
// Q10: Flicker fix — measure then setState
//
// Kya karna hai:
// Tooltip pehle (0,0) paint hota useEffect me → flash. layoutEffect me fix.
//
// Seedha matlab:
// User ko wrong frame nahi dikhega. Measure → correct pos → phir paint.
// Classic interview before/after example.
// -----------------------------------------------------------------------------
function FlickerTooltip({ show, anchorRef }) {
  const [style, setStyle] = useState({ opacity: 0 });
  useLayoutEffect(() => {
    if (!show || !anchorRef.current) return;
    const r = anchorRef.current.getBoundingClientRect();
    setStyle({ position: "fixed", top: r.bottom, left: r.left, opacity: 1 });
  }, [show, anchorRef]);
  if (!show) return null;
  return <div style={style}>Tip</div>;
}

// -----------------------------------------------------------------------------
// Q11: [MID] useEffect vs useLayoutEffect timing diagram
//
// Kya karna hai:
// Render → DOM commit → layoutEffect → paint → useEffect.
//
// Seedha matlab:
// DOM ready dono me. layout paint se pehle; effect paint ke baad.
// Read layout → write DOM sync = layoutEffect territory.
// -----------------------------------------------------------------------------
function TimingNote() {
  return (
    <p>
      Order: commit DOM → useLayoutEffect → browser paint → useEffect
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q12: Auto-focus input without flash
//
// Kya karna hai:
// Modal open → input focus layoutEffect me — pehle frame unfocused avoid.
//
// Seedha matlab:
// UX polish. User focus jump paint se pehle ho jaye.
// -----------------------------------------------------------------------------
function AutoFocusInput({ open }) {
  const ref = useRef(null);
  useLayoutEffect(() => {
    if (open) ref.current?.focus();
  }, [open]);
  if (!open) return null;
  return <input ref={ref} placeholder="Focused" />;
}

// -----------------------------------------------------------------------------
// Q13: DOM measurement for animation start
//
// Kya karna hai:
// Element height measure → animate to height layoutEffect me start.
//
// Seedha matlab:
// Expand/collapse animation wrong start = flicker. Measure first frame sync.
// -----------------------------------------------------------------------------
function MeasuredExpand({ open, children }) {
  const ref = useRef(null);
  const [height, setHeight] = useState(0);
  useLayoutEffect(() => {
    if (ref.current) setHeight(ref.current.scrollHeight);
  }, [open, children]);
  return (
    <div style={{ height: open ? height : 0, overflow: "hidden" }}>
      <div ref={ref}>{children}</div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q14: [MID] SSR warning — suppressHydration / client-only
//
// Kya karna hai:
// Server: layoutEffect skip. Client mount ke baad measure — mismatch avoid.
//
// Seedha matlab:
// "useLayoutEffect does nothing on the server" warning normal SSR me.
// ClientOnlyMeasure pattern (Q7) ya dynamic import ssr:false.
// Initial HTML safe defaults; measure post-hydrate.
// -----------------------------------------------------------------------------
function SsrSafeMeasure() {
  const [mounted, setMounted] = useState(false);
  useLayoutEffect(() => setMounted(true), []);
  if (!mounted) return <div style={{ minHeight: 40 }}>Loading...</div>;
  return <Measure />;
}

// -----------------------------------------------------------------------------
// Q15: When NOT useLayoutEffect — subscriptions
//
// Kya karna hai:
// window resize listener — useEffect OK, paint block mat karo.
//
// Seedha matlab:
// Listeners, fetch, timers = useEffect. DOM visual sync = layoutEffect.
// Rule of thumb yaad rakho interview me.
// -----------------------------------------------------------------------------
function ResizeListener() {
  const [w, setW] = useState(window.innerWidth);
  useEffect(() => {
    const fn = () => setW(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return <p>{w}px</p>;
}

// -----------------------------------------------------------------------------
// Q16: Read then write DOM — forced reflow
//
// Kya karna hai:
// offsetHeight read → style.width set — ek layoutEffect batch me.
//
// Seedha matlab:
// useEffect me read/write = extra layout thrashing possible.
// Sync read-write layoutEffect me = ek forced layout, controlled.
// -----------------------------------------------------------------------------
function ReadWriteSync() {
  const ref = useRef(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const w = el.offsetWidth;
    el.style.maxWidth = `${w / 2}px`;
  }, []);
  return <div ref={ref}>Resize me</div>;
}

// -----------------------------------------------------------------------------
// Q17: [MID] Double render with layoutEffect setState
//
// Kya karna hai:
// Render 1 → layoutEffect setState → Render 2 → paint.
//
// Seedha matlab:
// Cost accept karte hain correct visual ke liye.
// React 18 batching se better but still 2 commits possible.
// -----------------------------------------------------------------------------
function DoubleRenderNote() {
  return <p>layoutEffect setState = extra render before paint — intentional.</p>;
}

// -----------------------------------------------------------------------------
// Q18: Tooltip vs popover positioning libs
//
// Kya karna hai:
// Floating UI / Popper — internally layoutEffect or similar sync measure.
//
// Seedha matlab:
// Manual tooltip = layoutEffect. Libraries handle edge cases.
// Interview: know WHY libs use sync measure.
// -----------------------------------------------------------------------------
function PopperNote() {
  return <p>Position libs = measure + flip + shift — sync layout critical.</p>;
}

// -----------------------------------------------------------------------------
// Q19: useLayoutEffect dependency changes
//
// Kya karna hai:
// anchor move pe tooltip reposition — deps [anchorRef, open].
//
// Seedha matlab:
// Har relevant change pe re-measure before paint.
// Missing dep = stale position flash.
// -----------------------------------------------------------------------------
function FollowAnchor({ anchorRef, open }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useLayoutEffect(() => {
    if (!open || !anchorRef.current) return;
    const r = anchorRef.current.getBoundingClientRect();
    setPos({ x: r.left, y: r.bottom });
  }, [open, anchorRef]);
  if (!open) return null;
  return <div style={{ position: "fixed", left: pos.x, top: pos.y }}>▾</div>;
}

// -----------------------------------------------------------------------------
// Q20: [MID] useInsertionEffect — CSS-in-JS note
//
// Kya karna hai:
// Styled-components inject styles BEFORE layoutEffect — even earlier.
//
// Seedha matlab:
// Timeline: insertionEffect → layoutEffect → paint → effect.
// CSS inject order ke liye — rare interview deep dive.
// -----------------------------------------------------------------------------
function InsertionEffectNote() {
  return <p>useInsertionEffect = styles inject, layout se bhi pehle.</p>;
}

// -----------------------------------------------------------------------------
// Q21: Avoid layoutEffect for logging/analytics
//
// Kya karna hai:
// console.log / track() — useEffect, paint block mat.
//
// Seedha matlab:
// Non-visual side effects paint ke baad theek. User wait nahi karega analytics.
// -----------------------------------------------------------------------------
function AnalyticsOnMount({ id }) {
  useEffect(() => {
    console.log("view", id);
  }, [id]);
  return null;
}

// -----------------------------------------------------------------------------
// Q22: Decision flowchart recap
//
// Kya karna hai:
// DOM measure/read/write visual sync? → layoutEffect. Else → useEffect.
//
// Seedha matlab:
// Flicker complaint + DOM measure = first fix to try.
// 95% cases useEffect enough — layoutEffect surgical tool.
// -----------------------------------------------------------------------------
function LayoutDecision() {
  return (
    <ul>
      <li>Visual flicker? → useLayoutEffect</li>
      <li>Fetch/log/timer? → useEffect</li>
      <li>SSR? → client-only measure</li>
    </ul>
  );
}

export {
  Measure,
  Tooltip,
  Users,
  RestoreScroll,
  Box,
  LockScroll,
  ClientOnlyMeasure,
  CheatSheet,
  PaintBlockNote,
  FlickerTooltip,
  TimingNote,
  AutoFocusInput,
  MeasuredExpand,
  SsrSafeMeasure,
  ResizeListener,
  ReadWriteSync,
  DoubleRenderNote,
  PopperNote,
  FollowAnchor,
  InsertionEffectNote,
  AnalyticsOnMount,
  LayoutDecision,
};
