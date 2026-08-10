// ============================================================================
// 05 — Events Handling
// Level: BASE  |  Sequence: read this file, then the next number
// ============================================================================
//
// SIMPLE: Event = user did something — click, type, submit. React listens with
// onClick, onChange, onSubmit (camelCase). Handler = function that reacts.
//
// HTML: onclick="...". React: onClick={handler} — pass function, do not call
// unless you need args: onClick={() => doX(id)}.
// event.preventDefault() on forms stops page refresh.
//
// WHY: UI comes alive when events change state.
// INTERVIEW: synthetic events; pass vs call; preventDefault.
// Use in a Vite + React 19 project — teaching file (do not run with node alone).
//
// ============================================================================

import { useState } from "react";

// -----------------------------------------------------------------------------
// Q1: onClick basic
//
// Task:
// alert / console on button click.
//
// In simple words:
// onClick={fn} — reference. onClick={fn()} calls immediately — wrong (usually).
// -----------------------------------------------------------------------------
function ClickMe() {
  function handleClick() {
    console.log("clicked");
  }
  return <button onClick={handleClick}>Click</button>;
}

// -----------------------------------------------------------------------------
// Q2: Inline arrow with arg
//
// Task:
// Delete list item by passing id.
//
// In simple words:
// Need extra arg? Use () => handler(id). Otherwise you get the event object.
// -----------------------------------------------------------------------------
function Item({ id, onDelete }) {
  return <button onClick={() => onDelete(id)}>Delete {id}</button>;
}

// -----------------------------------------------------------------------------
// Q3: onChange input
//
// Task:
// Update state from e.target.value.
//
// In simple words:
// New value on every change. Heart of controlled input.
// -----------------------------------------------------------------------------
function TypeBox() {
  const [text, setText] = useState("");
  return (
    <input
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder="Type..."
    />
  );
}

// -----------------------------------------------------------------------------
// Q4: Form onSubmit + preventDefault
//
// Task:
// On form submit, prevent page reload; log data.
//
// In simple words:
// Browser default = full reload. preventDefault is required in SPAs.
// -----------------------------------------------------------------------------
function LoginForm() {
  const [email, setEmail] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    console.log("submit", email);
  }
  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
}

// -----------------------------------------------------------------------------
// Q5: onMouseEnter / leave
//
// Task:
// Highlight state on hover.
//
// In simple words:
// Mouse events follow same pattern — handler + setState.
// -----------------------------------------------------------------------------
function HoverCard() {
  const [hot, setHot] = useState(false);
  return (
    <div
      onMouseEnter={() => setHot(true)}
      onMouseLeave={() => setHot(false)}
      style={{ background: hot ? "#ffe08a" : "#eee" }}
    >
      Hover me
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q6: Stop propagation (bubbling)
//
// Task:
// Inner click should not fire outer click — e.stopPropagation().
//
// In simple words:
// Events bubble up to parent. Sometimes inner should behave differently.
// -----------------------------------------------------------------------------
function NestedClicks() {
  return (
    <div onClick={() => console.log("outer")}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          console.log("inner only");
        }}
      >
        Inner
      </button>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q7: [MID] Disabled + loading click guard
//
// Task:
// When saving is true, disable button / ignore extra clicks.
//
// In simple words:
// Stop double submit — UX + safety. disabled={saving}.
// -----------------------------------------------------------------------------
function SaveOnce() {
  const [saving, setSaving] = useState(false);
  async function save() {
    if (saving) return;
    setSaving(true);
    // await api...
    setSaving(false);
  }
  return (
    <button onClick={save} disabled={saving}>
      {saving ? "Saving..." : "Save"}
    </button>
  );
}

// -----------------------------------------------------------------------------
// Q8: [MID] Keyboard onKeyDown
//
// Task:
// Trigger search on Enter.
//
// In simple words:
// Accessibility + power users. e.key === "Enter".
// -----------------------------------------------------------------------------
function SearchBox({ onSearch }) {
  const [q, setQ] = useState("");
  return (
    <input
      value={q}
      onChange={(e) => setQ(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") onSearch(q);
      }}
    />
  );
}

// -----------------------------------------------------------------------------
// Q9: [MID] Synthetic events
//
// Task:
// React event object looks native — it is a wrapper for cross-browser support.
//
// In simple words:
// e.preventDefault(), e.target same API feel. React 17+ attaches listeners at root.
// Native e.nativeEvent for underlying event (rare need).
// -----------------------------------------------------------------------------
function SyntheticDemo() {
  function handleClick(e) {
    e.preventDefault();
    console.log(e.type, e.target.tagName); // SyntheticBaseEvent
  }
  return (
    <a href="/go" onClick={handleClick}>
      Link
    </a>
  );
}

// -----------------------------------------------------------------------------
// Q10: Event pooling legacy note
//
// Task:
// React 16 and earlier: async needed e.persist() — not anymore.
//
// In simple words:
// Old tutorials mention "pooling" — removed in React 17+.
// Interview: "Can I use event async?" — Modern React: yes, no persist needed.
// -----------------------------------------------------------------------------
function AsyncEventOk() {
  async function handleClick(e) {
    console.log(e.type); // safe in React 17+
    await new Promise((r) => setTimeout(r, 100));
    console.log("after await", e.type); // still ok — no e.persist()
  }
  return <button type="button" onClick={handleClick}>Async click</button>;
}

// -----------------------------------------------------------------------------
// Q11: preventDefault vs stopPropagation
//
// Task:
// Link click: preventDefault = stop navigate. stopPropagation = stop bubble.
//
// In simple words:
// They do different jobs. Form submit → preventDefault. Modal inner click → stopPropagation.
// Sometimes you need both; do not confuse them.
// -----------------------------------------------------------------------------
function PreventVsStop() {
  return (
    <div onClick={() => console.log("card click")}>
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault(); // stop hash change / nav
          e.stopPropagation(); // card handler should not fire
          console.log("link only");
        }}
      >
        Action
      </a>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q12: onClick vs onMouseDown
//
// Task:
// MouseDown fires first — use mousedown when you need action before drag/select.
//
// In simple words:
// Click = mousedown + mouseup on same element. UI feel can differ.
// Example: instant color picker — onMouseDown. Normal buttons — onClick.
// -----------------------------------------------------------------------------
function DownVsClick() {
  const [msg, setMsg] = useState("");
  return (
    <div>
      <button
        type="button"
        onMouseDown={() => setMsg("down first")}
        onClick={() => setMsg("click after")}
      >
        Press me
      </button>
      <p>{msg}</p>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q13: Keyboard — Escape close pattern
//
// Task:
// onKeyDown with e.key === "Escape" → close modal.
//
// In simple words:
// Accessibility: keyboard users get same UX. Tab focus is a separate topic (a11y).
// e.key preferred over keyCode (deprecated).
// -----------------------------------------------------------------------------
function EscapeModal({ open, onClose }) {
  if (!open) return null;
  return (
    <div
      role="dialog"
      tabIndex={-1}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
    >
      <p>Press Escape</p>
      <button type="button" onClick={onClose}>
        Close
      </button>
    </div>
  );
}

function EscapeDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button type="button" onClick={() => setOpen(true)}>
        Open
      </button>
      <EscapeModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q14: Form submit — button type matters
//
// Task:
// <button type="submit"> submits form. type="button" avoids accidental submit.
//
// In simple words:
// Default button type inside form = submit (HTML). Extra buttons → type="button".
// Interview trap: "Why page reloads?" — submit without preventDefault.
// -----------------------------------------------------------------------------
function MultiButtonForm() {
  const [log, setLog] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    setLog("submitted");
  }
  return (
    <form onSubmit={handleSubmit}>
      <button type="button" onClick={() => setLog("draft saved")}>
        Save draft
      </button>
      <button type="submit">Publish</button>
      <p>{log}</p>
    </form>
  );
}

// -----------------------------------------------------------------------------
// Q15: Passing multiple args to handler
//
// Task:
// onClick={() => moveItem(id, direction)} — curry or inline arrow.
//
// In simple words:
// Fixed handler signature? bind/curry: const onMove = (id) => (dir) => ...
// Inline arrow is most readable for beginners.
// -----------------------------------------------------------------------------
function MoveRow({ id, label, onMove }) {
  return (
    <div>
      {label}
      <button type="button" onClick={() => onMove(id, "up")}>
        ↑
      </button>
      <button type="button" onClick={() => onMove(id, "down")}>
        ↓
      </button>
    </div>
  );
}

function MoveList() {
  const [order, setOrder] = useState(["a", "b", "c"]);
  function move(id, dir) {
    setOrder((items) => {
      const i = items.indexOf(id);
      if (i < 0) return items;
      const j = dir === "up" ? i - 1 : i + 1;
      if (j < 0 || j >= items.length) return items;
      const next = [...items];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  }
  return (
    <div>
      {order.map((id) => (
        <MoveRow key={id} id={id} label={id} onMove={move} />
      ))}
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q16: [MID] Stale closure in event handler
//
// Task:
// setTimeout with old count — fix with functional setState or ref (10).
//
// In simple words:
// Handler captures closure when created. Async delay = stale value risk.
// Fix: setCount(c => c + 1) or countRef.current.
// -----------------------------------------------------------------------------
function StaleHandler() {
  const [count, setCount] = useState(0);
  function delayedBad() {
    setTimeout(() => {
      setCount(count + 1); // stale count inside timeout
    }, 1000);
  }
  function delayedGood() {
    setTimeout(() => {
      setCount((c) => c + 1); // always fresh ✅
    }, 1000);
  }
  return (
    <div>
      <p>{count}</p>
      <button type="button" onClick={delayedBad}>
        Bad delay +1
      </button>
      <button type="button" onClick={delayedGood}>
        Good delay +1
      </button>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q17: [MID] Event delegation mental model
//
// Task:
// React 17+ listeners on root — not a separate native listener on every button.
//
// In simple words:
// Delegation = less memory, friendly to dynamic lists. React optimizes internally.
// Usually nothing extra for you to do — understand for interviews.
// -----------------------------------------------------------------------------
function DelegatedList({ items, onPick }) {
  return (
    <ul
      onClick={(e) => {
        const li = e.target.closest("[data-id]");
        if (li) onPick(li.dataset.id);
      }}
    >
      {items.map((id) => (
        <li key={id} data-id={id}>
          Item {id}
        </li>
      ))}
    </ul>
  );
}

// -----------------------------------------------------------------------------
// Q18: onBlur / onFocus — field touch tracking
//
// Task:
// On blur set "touched" true — show validation message.
//
// In simple words:
// Change = every keystroke. Blur = user left field — UX validation timing.
// -----------------------------------------------------------------------------
function TouchedField() {
  const [value, setValue] = useState("");
  const [touched, setTouched] = useState(false);
  const showError = touched && value.length < 3;
  return (
    <div>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => setTouched(true)}
      />
      {showError && <small>Min 3 chars</small>}
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q19: [ADV] Custom event payload object
//
// Task:
// onChange({ name, value }) — app-specific API beyond native event.
//
// In simple words:
// Design system components may not expose native event — simpler parent API.
// Tradeoff: flexibility vs convenience.
// -----------------------------------------------------------------------------
function Field({ name, value, onChange }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange({ name, value: e.target.value })}
    />
  );
}

function FieldForm() {
  const [fields, setFields] = useState({ city: "" });
  function handleChange({ name, value }) {
    setFields((f) => ({ ...f, [name]: value }));
  }
  return <Field name="city" value={fields.city} onChange={handleChange} />;
}

// -----------------------------------------------------------------------------
// Q20: [ADV] Passive scroll / touch — rare
//
// Task:
// preventDefault on scroll may be blocked — usually leave native feel alone.
//
// In simple words:
// Touch/wheel listeners have passive default in browser — usually no issue in React.
// Watch out when building custom drag scroll libraries.
// -----------------------------------------------------------------------------
function ScrollBox() {
  return (
    <div style={{ overflow: "auto", height: 80 }} onScroll={() => {}}>
      Long content line<br />Line 2<br />Line 3<br />Line 4
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q21: [ADV] onDoubleClick pattern
//
// Task:
// Double click edit mode — separate single vs double handlers.
//
// In simple words:
// Timing: two single clicks may fire before double-click delay — design carefully.
// Alternative: explicit Edit button — clearer UX.
// -----------------------------------------------------------------------------
function DoubleEdit() {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState("Double-click me");
  if (editing) {
    return (
      <input
        autoFocus
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={() => setEditing(false)}
      />
    );
  }
  return (
    <span onDoubleClick={() => setEditing(true)}>{text}</span>
  );
}

// -----------------------------------------------------------------------------
// Q22: [ADV] Anti-pattern — inline handler new every render
//
// Task:
// onClick={() => ...} is new function every render — can break memo child (16).
//
// In simple words:
// Fine in simple apps. Heavy lists + React.memo → useCallback (17) or stable handler.
// Premature useCallback also has cost — optimize when profile shows need.
// -----------------------------------------------------------------------------
function MemoRow({ label, onClick }) {
  return (
    <button type="button" onClick={onClick}>
      {label}
    </button>
  );
}

function InlineHandlerList() {
  const items = ["x", "y", "z"];
  function pick(item) {
    console.log(item);
  }
  return (
    <div>
      {items.map((item) => (
        <MemoRow
          key={item}
          label={item}
          onClick={() => pick(item)} // new fn each render — memo help limited
        />
      ))}
    </div>
  );
}

export {
  ClickMe,
  Item,
  TypeBox,
  LoginForm,
  HoverCard,
  NestedClicks,
  SaveOnce,
  SearchBox,
  SyntheticDemo,
  AsyncEventOk,
  PreventVsStop,
  DownVsClick,
  EscapeModal,
  EscapeDemo,
  MultiButtonForm,
  MoveRow,
  MoveList,
  StaleHandler,
  DelegatedList,
  TouchedField,
  Field,
  FieldForm,
  ScrollBox,
  DoubleEdit,
  MemoRow,
  InlineHandlerList,
};
