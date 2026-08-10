// ============================================================================
// 18 — useLayoutEffect
// Level: MID  |  Sequence: read this file, then the next number
// ============================================================================
//
// SIMPLE: useEffect = work AFTER paint (user may see a flash).
// useLayoutEffect = after DOM update, BEFORE browser paint, sync.
// Like measure then set position — avoid flash.
//
// Default prefer useEffect. useLayoutEffect is blocking — too much = jank.
// SSR: useLayoutEffect warning — client-only measure patterns.
//
// WHY: Tooltip position, scroll lock measure, avoid flicker.
// INTERVIEW: effect vs layoutEffect timing; when necessary.
// Use in a Vite + React 19 project — teaching file.
//
// ============================================================================

import { useEffect, useLayoutEffect, useRef, useState } from "react";

// -----------------------------------------------------------------------------
// Q1: Measure DOM before paint
//
// Task:
// Read ref height into state — in layoutEffect.
//
// In simple words:
// Measure in useEffect → wrong frame may flash first.
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
// Task:
// Anchor rect → set tooltip top/left before paint.
//
// In simple words:
// Classic layoutEffect use case.
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
// Task:
// Don't fetch in layoutEffect — blocks UI.
//
// In simple words:
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
// Task:
// Restore scrollY before paint — less flicker.
//
// In simple words:
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
// Task:
// Measure → setState → extra render before paint — intentional.
//
// In simple words:
// Accept double render cost for correct first paint.
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
// Task:
// return () => cleanup — listeners etc.
//
// In simple words:
// Different timing; same cleanup API.
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
// Task:
// layoutEffect doesn't run on server — hydrate mismatch careful.
//
// In simple words:
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
// Task:
// Flicker/measure/DOM read-write sync? layout. Else effect.
//
// In simple words:
// Interview one-liner.
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
// Task:
// useLayoutEffect blocks browser paint until sync work finishes.
//
// In simple words:
// Long layoutEffect = jank, FPS drop. Small sync DOM tweak OK.
// Default useEffect — paint first, user feels responsive.
// -----------------------------------------------------------------------------
function PaintBlockNote() {
  return <p>layoutEffect sync = main thread block until done.</p>;
}

// -----------------------------------------------------------------------------
// Q10: Flicker fix — measure then setState
//
// Task:
// Tooltip paints at (0,0) first in useEffect → flash. Fix in layoutEffect.
//
// In simple words:
// User won't see wrong frame. Measure → correct pos → then paint.
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
// Task:
// Render → DOM commit → layoutEffect → paint → useEffect.
//
// In simple words:
// DOM ready in both. layout before paint; effect after paint.
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
// Task:
// Modal open → focus input in layoutEffect — avoid unfocused first frame.
//
// In simple words:
// UX polish. Focus jump happens before paint.
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
// Task:
// Measure element height → start animate to height in layoutEffect.
//
// In simple words:
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
// Task:
// Server: layoutEffect skip. Measure after client mount — avoid mismatch.
//
// In simple words:
// "useLayoutEffect does nothing on the server" warning normal in SSR.
// ClientOnlyMeasure pattern (Q7) or dynamic import ssr:false.
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
// Task:
// window resize listener — useEffect OK, don't block paint.
//
// In simple words:
// Listeners, fetch, timers = useEffect. DOM visual sync = layoutEffect.
// Remember rule of thumb in interviews.
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
// Task:
// offsetHeight read → style.width set — batch in one layoutEffect.
//
// In simple words:
// read/write in useEffect = extra layout thrashing possible.
// Sync read-write in layoutEffect = one forced layout, controlled.
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
// Task:
// Render 1 → layoutEffect setState → Render 2 → paint.
//
// In simple words:
// We accept cost for correct visual.
// React 18 batching helps but still 2 commits possible.
// -----------------------------------------------------------------------------
function DoubleRenderNote() {
  return <p>layoutEffect setState = extra render before paint — intentional.</p>;
}

// -----------------------------------------------------------------------------
// Q18: Tooltip vs popover positioning libs
//
// Task:
// Floating UI / Popper — internally layoutEffect or similar sync measure.
//
// In simple words:
// Manual tooltip = layoutEffect. Libraries handle edge cases.
// Interview: know WHY libs use sync measure.
// -----------------------------------------------------------------------------
function PopperNote() {
  return <p>Position libs = measure + flip + shift — sync layout critical.</p>;
}

// -----------------------------------------------------------------------------
// Q19: useLayoutEffect dependency changes
//
// Task:
// Reposition tooltip when anchor moves — deps [anchorRef, open].
//
// In simple words:
// Re-measure before paint on every relevant change.
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
// Task:
// Styled-components inject styles BEFORE layoutEffect — even earlier.
//
// In simple words:
// Timeline: insertionEffect → layoutEffect → paint → effect.
// For CSS inject order — rare interview deep dive.
// -----------------------------------------------------------------------------
function InsertionEffectNote() {
  return <p>useInsertionEffect = inject styles, even before layout.</p>;
}

// -----------------------------------------------------------------------------
// Q21: Avoid layoutEffect for logging/analytics
//
// Task:
// console.log / track() — useEffect, don't block paint.
//
// In simple words:
// Non-visual side effects fine after paint. User shouldn't wait for analytics.
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
// Task:
// DOM measure/read/write visual sync? → layoutEffect. Else → useEffect.
//
// In simple words:
// Flicker complaint + DOM measure = first fix to try.
// 95% cases useEffect enough — layoutEffect is surgical tool.
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
