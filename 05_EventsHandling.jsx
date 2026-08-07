// ============================================================================
// 05 — Events Handling
// Level: BASE  |  Sequence: pehle yeh, phir agla number
// ============================================================================
//
// LAYMAN: Event = user ne kuch kiya — click, type, submit. React sunta hai
// onClick, onChange, onSubmit (camelCase). Handler = function jo reaction de.
//
// HTML: onclick="...". React: onClick={handler} — function pass, call mat karo
// jab tak args na chahiye: onClick={() => doX(id)}.
// event.preventDefault() forms pe page refresh rokta hai.
//
// KYUN: UI tab zinda jab events pe state badle.
// INTERVIEW: synthetic events; pass vs call; preventDefault.
// Vite/React 19 project me use — teaching file.
//
// ============================================================================

import { useState } from "react";

// -----------------------------------------------------------------------------
// Q1: onClick basic
//
// Kya karna hai:
// Button click pe alert / console.
//
// Seedha matlab:
// onClick={fn} — reference. onClick={fn()} turant call — galat (usually).
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
// Kya karna hai:
// List item id pass karke delete.
//
// Seedha matlab:
// Extra arg chahiye to () => handler(id). Warna event object milta hai.
// -----------------------------------------------------------------------------
function Item({ id, onDelete }) {
  return <button onClick={() => onDelete(id)}>Delete {id}</button>;
}

// -----------------------------------------------------------------------------
// Q3: onChange input
//
// Kya karna hai:
// e.target.value se state update.
//
// Seedha matlab:
// Har change pe naya value. Controlled input ka heart.
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
// Kya karna hai:
// Form submit pe page reload mat hone do; data log karo.
//
// Seedha matlab:
// Browser default = full reload. SPA me preventDefault zaroori.
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
// Kya karna hai:
// Hover pe highlight state.
//
// Seedha matlab:
// Mouse events bhi same pattern — handler + setState.
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
// Kya karna hai:
// Inner click pe outer click fire na ho — e.stopPropagation().
//
// Seedha matlab:
// Events bubble parent tak. Kabhi andar wala alag behave kare.
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
// Kya karna hai:
// Saving true jab button disabled / ignore extra clicks.
//
// Seedha matlab:
// Double submit rokna — UX + safety. disabled={saving}.
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
// Kya karna hai:
// Enter pe search trigger.
//
// Seedha matlab:
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
// Kya karna hai:
// React event object native jaisa dikhta hai — wrapper hai cross-browser ke liye.
//
// Seedha matlab:
// e.preventDefault(), e.target same API feel. React 17+ listener root pe attach.
// Native e.nativeEvent se underlying event (rare need).
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
// Kya karna hai:
// React 16 aur pehle: async me e.persist() chahiye tha — ab nahi.
//
// Seedha matlab:
// Purane tutorials me "pooling" dikhega — React 17+ me removed.
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
// Kya karna hai:
// Link click: preventDefault = navigate roko. stopPropagation = bubble roko.
//
// Seedha matlab:
// Dono alag kaam. Form submit → preventDefault. Modal inner click → stopPropagation.
// Kabhi dono chahiye; confuse mat karo.
// -----------------------------------------------------------------------------
function PreventVsStop() {
  return (
    <div onClick={() => console.log("card click")}>
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault(); // hash change / nav roko
          e.stopPropagation(); // card handler fire na ho
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
// Kya karna hai:
// MouseDown pehle fire — drag/select se pehle action chahiye to mousedown.
//
// Seedha matlab:
// Click = mousedown + mouseup same element. UI feel alag ho sakta hai.
// Example: color picker instant — onMouseDown. Normal buttons — onClick.
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
// Kya karna hai:
// onKeyDown me e.key === "Escape" → modal band.
//
// Seedha matlab:
// Accessibility: keyboard users bhi same UX. Tab focus alag topic (a11y).
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
// Kya karna hai:
// <button type="submit"> form submit. type="button" se accidental submit nahi.
//
// Seedha matlab:
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
// Kya karna hai:
// onClick={() => moveItem(id, direction)} — curry ya inline arrow.
//
// Seedha matlab:
// Handler signature fix ho to bind/curry: const onMove = (id) => (dir) => ...
// Inline arrow sabse readable beginners ke liye.
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
// Kya karna hai:
// setTimeout me purana count — functional setState ya ref fix (10).
//
// Seedha matlab:
// Handler banate waqt closure capture hota hai. Async delay = stale value risk.
// Fix: setCount(c => c + 1) ya countRef.current.
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
// Kya karna hai:
// React 17+ root pe listeners — har button pe alag native listener nahi lagta feel.
//
// Seedha matlab:
// Delegation = kam memory, dynamic list friendly. React internally optimize karta hai.
// Tumhein usually kuch extra nahi karna — samajh interview ke liye.
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
// Kya karna hai:
// Blur pe "touched" true — validation message dikhao.
//
// Seedha matlab:
// Change = har keystroke. Blur = user field chhod gaya — UX validation timing.
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
// Kya karna hai:
// onChange({ name, value }) — native event se zyada app-specific API.
//
// Seedha matlab:
// Design system components native event expose na kare — simpler parent API.
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
// Kya karna hai:
// preventDefault scroll pe block ho sakta hai — mostly native feel chhod do.
//
// Seedha matlab:
// Touch/wheel listeners me browser passive default — React me usually issue nahi.
// Custom drag scroll library banate waqt dhyaan.
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
// Kya karna hai:
// Double click edit mode — single vs double alag handlers.
//
// Seedha matlab:
// Timing: double-click delay ke beech do single click fire ho sakte — design careful.
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
// Q22: [ADV] Anti-pattern — inline handler har render naya
//
// Kya karna hai:
// onClick={() => ...} har render new function — memo child ko tod sakta hai (16).
//
// Seedha matlab:
// Simple apps me fine. Heavy lists + React.memo → useCallback (17) ya stable handler.
// Premature useCallback bhi cost — profile pe optimize karo.
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
