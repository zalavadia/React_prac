// ============================================================================
// 10 — useRef
// Level: MID  |  Sequence: pehle yeh, phir agla number
// ============================================================================
//
// LAYMAN: useRef = dabba jiski value badalne pe RE-RENDER nahi. Do kaam:
// 1) DOM node pakadna (input.focus())
// 2) Mutable box — previous value, timer id, "latest" callback
//
// ref.current padho/likho. JSX me ref={inputRef}. State = UI; ref = memory.
//
// KYUN: Focus, measure DOM, avoid stale closures without re-render spam.
// INTERVIEW: ref vs state; when not to put UI data in ref.
// Vite/React 19 project me use — teaching file.
//
// ============================================================================

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

// -----------------------------------------------------------------------------
// Q1: Focus input on mount
//
// Kya karna hai:
// inputRef + useEffect me .focus()
//
// Seedha matlab:
// DOM API chahiye to ref. querySelector avoid in React.
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
// Kya karna hai:
// bottomRef.current.scrollIntoView()
//
// Seedha matlab:
// Chat apps — naya message pe scroll. Ref = target element.
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
// Kya karna hai:
// intervalRef.current = setInterval... clear pe use.
//
// Seedha matlab:
// Timer id UI me nahi — ref perfect. State banane se extra render.
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
// Kya karna hai:
// prevRef.current = count after render; compare.
//
// Seedha matlab:
// "Pehle kya tha?" — ref me save, render pe dikhao.
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
// Kya karna hai:
// boxRef — document click agar bahar to close.
//
// Seedha matlab:
// Dropdown/modal pattern. contains(target) check.
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
// Kya karna hai:
// cbRef.current = onMessage; interval/socket purana closure avoid.
//
// Seedha matlab:
// Effect [] pe listener, lekin hamesha latest handler — ref bridge.
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
// Kya karna hai:
// defaultValue + ref.current.value submit pe.
//
// Seedha matlab:
// Har keystroke state nahi — performance/simple forms. (25 deep)
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
// Kya karna hai:
// count dikhana hai to useState, useRef nahi.
//
// Seedha matlab:
// ref.current++ se screen nahi badlegi. Rule: UI me dikhe → state.
// -----------------------------------------------------------------------------
function WrongVsRight() {
  const [count, setCount] = useState(0); // ✅
  // const countRef = useRef(0); countRef.current++; // ❌ UI stale
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}

// -----------------------------------------------------------------------------
// Q9: Callback ref pattern
//
// Kya karna hai:
// ref={(node) => { ... }} — mount/unmount pe node milega.
//
// Seedha matlab:
// Dynamic refs, measure on attach. useRef object se alag — function har attach pe call.
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
// Kya karna hai:
// height measure tooltip position — layoutEffect before paint.
//
// Seedha matlab:
// useEffect measure = user ko jump dikhe. LayoutEffect = sync DOM read/write.
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
// Q11: Ref mutable box — render count nahi badhta
//
// Kya karna hai:
// rendersRef.current++ har render pe — screen pe nahi dikhega.
//
// Seedha matlab:
// Debug/metrics ke liye. UI update chahiye to state use karo.
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
// Q12: forwardRef parent se child DOM
//
// Kya karna hai:
// const Input = forwardRef((props, ref) => <input ref={ref} {...props} />)
//
// Seedha matlab:
// Parent ko child ka DOM chahiye — focus(), measure. React 19 me ref prop bhi direct.
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
// Kya karna hai:
// function Input({ ref, ...props }) — forwardRef optional ho raha.
//
// Seedha matlab:
// ref ab normal prop bhi ban sakta hai React 19 me. forwardRef legacy support.
// -----------------------------------------------------------------------------
function RefAsPropNote({ ref }) {
  return <input ref={ref} placeholder="React 19 style" />;
}

// -----------------------------------------------------------------------------
// Q14: Instance var pattern — latest value
//
// Kya karna hai:
// latestQueryRef.current = query; async callback me padho.
//
// Seedha matlab:
// Stale closure fix bina re-subscribe. Effect/event me ref read karo.
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
// Kya karna hai:
// itemsRef.current = [] map me ref push — multiple nodes.
//
// Seedha matlab:
// List of refs kabhi chahiye. Usually key + single ref enough; pattern rare.
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
// Kya karna hai:
// ref={node => { refA.current = node; refB(node); }} — do refs ek element.
//
// Seedha matlab:
// Library + apna ref dono. Callback ref se merge.
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
// Kya karna hai:
// isSubmittingRef vs isSubmitting state — UI dikhe to state.
//
// Seedha matlab:
// Guard flag sirf logic me (double submit rok) → ref OK. Spinner → state.
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
// Kya karna hai:
// rafRef.current = requestAnimationFrame(...); cancel on cleanup.
//
// Seedha matlab:
// Timer jaisa — id UI me nahi. Ref me rakho, unmount pe cancel.
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
// Kya karna hai:
// ref + onFocus → ref.current.select()
//
// Seedha matlab:
// DOM imperative API — ref se natural fit.
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
// Kya karna hai:
// Cleanup me ref.current = null optional — usually React handle.
//
// Seedha matlab:
// Callback ref me node null aata detach pe. Object ref bhi clear hota detach pe.
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
// Kya karna hai:
// this.timerId in class = useRef in function — survives render, no re-render.
//
// Seedha matlab:
// Functional component me "instance fields" = refs. State = this.setState equivalent.
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
// Kya karna hai:
// useImperativeHandle(ref, () => ({ focus: () => ... })) — custom API expose.
//
// Seedha matlab:
// Parent ko poora DOM nahi, sirf methods. Modals, inputs library pattern.
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
// Kya karna hai:
// document.getElementById avoid — ref React way.
//
// Seedha matlab:
// SSR, testing, multiple roots me querySelector fragile. Ref scoped to component.
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
// Kya karna hai:
// prevPropsRef — effect me compare current vs prev.
//
// Seedha matlab:
// "Sirf badla tab react karo" — getDerivedStateFromProps smell, kabhi useful debug.
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
