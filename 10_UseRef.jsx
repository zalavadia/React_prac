// ============================================================================
// 10 — useRef
// Level: MID  |  Sequence: read this file, then the next number
// ============================================================================
//
// SIMPLE: useRef = a box whose value can change WITHOUT re-render. Two jobs:
// 1) Hold a DOM node (input.focus())
// 2) Mutable box — previous value, timer id, "latest" callback
//
// Read/write ref.current. JSX: ref={inputRef}. State = UI; ref = memory.
//
// WHY: Focus, measure DOM, avoid stale closures without re-render spam.
// INTERVIEW: ref vs state; when not to put UI data in ref.
// Use in a Vite + React 19 project — teaching file (do not run with node alone).
//
// ============================================================================

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

// -----------------------------------------------------------------------------
// Q1: Focus input on mount
//
// Task:
// inputRef + useEffect with .focus()
//
// In simple words:
// Need DOM API? Use ref. Avoid querySelector in React.
// -----------------------------------------------------------------------------
function Autofocus() {
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  return <input ref={inputRef} placeholder="Focused" />;
}

// -----------------------------------------------------------------------------
// Q2: Scroll into view
//
// Task:
// bottomRef.current.scrollIntoView()
//
// In simple words:
// Chat apps — scroll on new message. Ref = target element.
// -----------------------------------------------------------------------------
function ChatEnd() {
  const endRef = useRef(null);
  function jump() {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }
  return (
    <div>
      <button onClick={jump}>Jump to end</button>
      <div style={{ height: 400 }}>...messages...</div>
      <div ref={endRef} />
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q3: Store interval id
//
// Task:
// intervalRef.current = setInterval... use on clear.
//
// In simple words:
// Timer id is not UI — ref is perfect. State would cause extra render.
// -----------------------------------------------------------------------------
function Stopwatch() {
  const [ms, setMs] = useState(0);
  const idRef = useRef(null);
  function start() {
    if (idRef.current) return;
    idRef.current = setInterval(() => setMs((m) => m + 100), 100);
  }
  function stop() {
    clearInterval(idRef.current);
    idRef.current = null;
  }
  return (
    <div>
      {ms}ms
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q4: Previous value track
//
// Task:
// prevRef.current = count after render; compare.
//
// In simple words:
// "What was it before?" — save in ref, show on render.
// -----------------------------------------------------------------------------
function PrevCount() {
  const [count, setCount] = useState(0);
  const prev = useRef(count);
  useEffect(() => {
    prev.current = count;
  }, [count]);
  return (
    <button onClick={() => setCount(count + 1)}>
      now {count}, was {prev.current}
    </button>
  );
}

// -----------------------------------------------------------------------------
// Q5: [MID] Click outside to close
//
// Task:
// boxRef — document click outside closes menu.
//
// In simple words:
// Dropdown/modal pattern. Check contains(target).
// -----------------------------------------------------------------------------
function Menu() {
  const [open, setOpen] = useState(false);
  const boxRef = useRef(null);
  useEffect(() => {
    function onDoc(e) {
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);
  return (
    <div ref={boxRef}>
      <button onClick={() => setOpen(!open)}>Menu</button>
      {open && <div className="dropdown">Item</div>}
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q6: [MID] Ref for latest callback (stale fix)
//
// Task:
// cbRef.current = onMessage; interval/socket avoids old closure.
//
// In simple words:
// Effect with [] listener but always latest handler — ref bridge.
// -----------------------------------------------------------------------------
function Socketish({ onMessage }) {
  const cbRef = useRef(onMessage);
  useEffect(() => {
    cbRef.current = onMessage;
  }, [onMessage]);
  useEffect(() => {
    const id = setInterval(() => {
      cbRef.current("tick");
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return null;
}

// -----------------------------------------------------------------------------
// Q7: Uncontrolled input read on submit
//
// Task:
// defaultValue + ref.current.value on submit.
//
// In simple words:
// No state on every keystroke — performance/simple forms. (25 goes deeper)
// -----------------------------------------------------------------------------
function UncontrolledName() {
  const ref = useRef(null);
  function submit(e) {
    e.preventDefault();
    console.log(ref.current.value);
  }
  return (
    <form onSubmit={submit}>
      <input ref={ref} defaultValue="Ada" />
      <button type="submit">Go</button>
    </form>
  );
}

// -----------------------------------------------------------------------------
// Q8: Don't use ref for visible UI state
//
// Task:
// To show count on screen use useState, not useRef.
//
// In simple words:
// ref.current++ does not update screen. Rule: if it shows in UI → state.
// -----------------------------------------------------------------------------
function WrongVsRight() {
  const [count, setCount] = useState(0); // ✅
  // const countRef = useRef(0); countRef.current++; // ❌ UI stale
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}

// -----------------------------------------------------------------------------
// Q9: Callback ref pattern
//
// Task:
// ref={(node) => { ... }} — get node on mount/unmount.
//
// In simple words:
// Dynamic refs, measure on attach. Different from useRef object — function called each attach.
// -----------------------------------------------------------------------------
function CallbackRefDemo() {
  function setRef(node) {
    if (node) node.classList.add("mounted");
  }
  return <div ref={setRef}>Hello</div>;
}

// -----------------------------------------------------------------------------
// Q10: Measure layout — useLayoutEffect contrast
//
// Task:
// Measure height for tooltip position — layoutEffect before paint.
//
// In simple words:
// useEffect measure = user may see jump. LayoutEffect = sync DOM read/write.
// -----------------------------------------------------------------------------
function TooltipMeasure() {
  const boxRef = useRef(null);
  const [h, setH] = useState(0);
  useEffect(() => {
    if (boxRef.current) setH(boxRef.current.offsetHeight);
  }, []);
  return (
    <div ref={boxRef}>
      Content
      <span style={{ top: h }}>Tip</span>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q11: Ref mutable box — render count does not increase
//
// Task:
// rendersRef.current++ every render — not shown on screen.
//
// In simple words:
// For debug/metrics. Need UI update? Use state.
// -----------------------------------------------------------------------------
function RenderCount() {
  const renders = useRef(0);
  renders.current += 1;
  const [n, setN] = useState(0);
  return (
    <button onClick={() => setN(n + 1)}>
      clicks {n} (renders ~{renders.current})
    </button>
  );
}

// -----------------------------------------------------------------------------
// Q12: forwardRef parent to child DOM
//
// Task:
// const Input = forwardRef((props, ref) => <input ref={ref} {...props} />)
//
// In simple words:
// Parent needs child's DOM — focus(), measure. React 19 also allows ref as direct prop.
// -----------------------------------------------------------------------------
const FancyInput = forwardRef(function FancyInput(props, ref) {
  return <input ref={ref} className="fancy" {...props} />;
});

function FocusChild() {
  const ref = useRef(null);
  return (
    <>
      <FancyInput ref={ref} />
      <button onClick={() => ref.current?.focus()}>Focus</button>
    </>
  );
}

// -----------------------------------------------------------------------------
// Q13: [MID] React 19 ref as prop note
//
// Task:
// function Input({ ref, ...props }) — forwardRef becoming optional.
//
// In simple words:
// ref can be a normal prop in React 19. forwardRef still supported for legacy.
// -----------------------------------------------------------------------------
function RefAsPropNote({ ref }) {
  return <input ref={ref} placeholder="React 19 style" />;
}

// -----------------------------------------------------------------------------
// Q14: Instance var pattern — latest value
//
// Task:
// latestQueryRef.current = query; read in async callback.
//
// In simple words:
// Stale closure fix without re-subscribe. Read ref in effect/event.
// -----------------------------------------------------------------------------
function LatestQuery({ query }) {
  const latest = useRef(query);
  latest.current = query;
  useEffect(() => {
    const id = setTimeout(() => {
      console.log("search", latest.current);
    }, 300);
    return () => clearTimeout(id);
  }, [query]);
  return null;
}

// -----------------------------------------------------------------------------
// Q15: Ref hold DOM collection
//
// Task:
// itemsRef.current = [] push ref in map — multiple nodes.
//
// In simple words:
// List of refs sometimes needed. Usually key + single ref is enough; pattern is rare.
// -----------------------------------------------------------------------------
function ItemRefs({ items }) {
  const refs = useRef([]);
  refs.current = [];
  return (
    <ul>
      {items.map((it, i) => (
        <li
          key={it.id}
          ref={(el) => {
            refs.current[i] = el;
          }}
        >
          {it.text}
        </li>
      ))}
    </ul>
  );
}

// -----------------------------------------------------------------------------
// Q16: Merge refs utility sketch
//
// Task:
// ref={node => { refA.current = node; refB(node); }} — two refs one element.
//
// In simple words:
// Library + your ref both. Merge with callback ref.
// -----------------------------------------------------------------------------
function MergeRefInput() {
  const localRef = useRef(null);
  function mergedRef(node) {
    localRef.current = node;
  }
  return <input ref={mergedRef} />;
}

// -----------------------------------------------------------------------------
// Q17: [ADV] Instance vars vs state
//
// Task:
// isSubmittingRef vs isSubmitting state — if UI shows it, use state.
//
// In simple words:
// Guard flag for logic only (stop double submit) → ref OK. Spinner → state.
// -----------------------------------------------------------------------------
function SubmitGuard() {
  const busyRef = useRef(false);
  const [msg, setMsg] = useState("");
  async function submit() {
    if (busyRef.current) return;
    busyRef.current = true;
    setMsg("Saving...");
    await new Promise((r) => setTimeout(r, 500));
    busyRef.current = false;
    setMsg("Done");
  }
  return (
    <div>
      <button onClick={submit}>Save</button>
      <p>{msg}</p>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q18: Ref for animation frame id
//
// Task:
// rafRef.current = requestAnimationFrame(...); cancel on cleanup.
//
// In simple words:
// Like timer — id is not UI. Store in ref, cancel on unmount.
// -----------------------------------------------------------------------------
function RafDemo() {
  const rafRef = useRef(null);
  const boxRef = useRef(null);
  function animate() {
    if (boxRef.current) boxRef.current.style.opacity = String(Math.random());
    rafRef.current = requestAnimationFrame(animate);
  }
  function stop() {
    cancelAnimationFrame(rafRef.current);
  }
  return (
    <div>
      <div ref={boxRef}>Animate</div>
      <button onClick={animate}>Start</button>
      <button onClick={stop}>Stop</button>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q19: Textarea select all on focus
//
// Task:
// ref + onFocus → ref.current.select()
//
// In simple words:
// DOM imperative API — ref is a natural fit.
// -----------------------------------------------------------------------------
function SelectOnFocus() {
  const ref = useRef(null);
  return (
    <input
      ref={ref}
      defaultValue="select me"
      onFocus={() => ref.current?.select()}
    />
  );
}

// -----------------------------------------------------------------------------
// Q20: Ref null on unmount
//
// Task:
// Cleanup ref.current = null optional — React usually handles.
//
// In simple words:
// Callback ref gets node null on detach. Object ref clears on detach too.
// -----------------------------------------------------------------------------
function RefLifecycle() {
  const ref = useRef(null);
  useEffect(() => {
    return () => {
      // ref.current already null-ish after unmount in many cases
    };
  }, []);
  return <div ref={ref}>Mounted</div>;
}

// -----------------------------------------------------------------------------
// Q21: [ADV] Class instance vars analogy
//
// Task:
// this.timerId in class = useRef in function — survives render, no re-render.
//
// In simple words:
// In functional components "instance fields" = refs. State = this.setState equivalent.
// -----------------------------------------------------------------------------
function ClassAnalogyTimer() {
  const tickRef = useRef(0);
  const idRef = useRef(null);
  function start() {
    idRef.current = setInterval(() => {
      tickRef.current += 1;
    }, 1000);
  }
  return <button onClick={start}>Start (check ref in devtools)</button>;
}

// -----------------------------------------------------------------------------
// Q22: Imperative handle sketch
//
// Task:
// useImperativeHandle(ref, () => ({ focus: () => ... })) — expose custom API.
//
// In simple words:
// Parent gets methods, not full DOM. Modals, input library pattern.
// -----------------------------------------------------------------------------
const ExposedInput = forwardRef(function ExposedInput(props, ref) {
  const inner = useRef(null);
  useImperativeHandle(ref, () => ({
    focus: () => inner.current?.focus(),
  }));
  return <input ref={inner} {...props} />;
});

// -----------------------------------------------------------------------------
// Q23: Ref vs querySelector
//
// Task:
// Avoid document.getElementById — ref is the React way.
//
// In simple words:
// querySelector fragile with SSR, testing, multiple roots. Ref scoped to component.
// -----------------------------------------------------------------------------
function NoQuerySelector() {
  const btnRef = useRef(null);
  return (
    <button ref={btnRef} onClick={() => btnRef.current?.blur()}>
      Blur self
    </button>
  );
}

// -----------------------------------------------------------------------------
// Q24: Copy previous props pattern
//
// Task:
// prevPropsRef — compare current vs prev in effect.
//
// In simple words:
// "React only when changed" — getDerivedStateFromProps smell, sometimes useful for debug.
// -----------------------------------------------------------------------------
function PropChangeLog({ value }) {
  const prev = useRef(value);
  useEffect(() => {
    if (prev.current !== value) {
      console.log("changed", prev.current, "→", value);
    }
    prev.current = value;
  }, [value]);
  return <p>{value}</p>;
}

export {
  Autofocus,
  ChatEnd,
  Stopwatch,
  PrevCount,
  Menu,
  Socketish,
  UncontrolledName,
  WrongVsRight,
  CallbackRefDemo,
  TooltipMeasure,
  RenderCount,
  FocusChild,
  RefAsPropNote,
  LatestQuery,
  ItemRefs,
  MergeRefInput,
  SubmitGuard,
  RafDemo,
  SelectOnFocus,
  RefLifecycle,
  ClassAnalogyTimer,
  ExposedInput,
  NoQuerySelector,
  PropChangeLog,
};
