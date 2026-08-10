// ============================================================================
// 04 — useState
// Level: BASE  |  Sequence: read this file, then the next number
// ============================================================================
//
// SIMPLE: useState = a box with a value + a "button to change the box".
// Like a tea counter: cups = 0, each order cups++. The screen updates on its own.
// const [count, setCount] = useState(0) — read count, write with setCount.
//
// setCount(5) direct. setCount(c => c + 1) when you depend on the old value.
// Object/array update: make a new copy (spread), do not mutate.
//
// WHY: The heart of interactive UI. Without state you only have a static page.
// INTERVIEW: async batching; functional updater; don't mutate state.
// Use in a Vite + React 19 project — teaching file (do not run with node alone).
//
// ============================================================================

import { useState } from "react";

// -----------------------------------------------------------------------------
// Q1: Counter basics
//
// Task:
// Start count at 0, +1 on button click.
//
// In simple words:
// setCount repaints the UI. Direct count++ does not work — React will not notice.
// -----------------------------------------------------------------------------
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>Count: {count}</button>
  );
}

// -----------------------------------------------------------------------------
// Q2: Toggle boolean
//
// Task:
// Flip isOpen true/false — Show/Hide.
//
// In simple words:
// Boolean state = light switch. Connect to conditional UI (06).
// -----------------------------------------------------------------------------
function Toggle() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "Hide" : "Show"}
      </button>
      {isOpen && <p>Secret panel</p>}
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q3: String input state (preview)
//
// Task:
// name state, setName on input — controlled feel (08 goes deeper).
//
// In simple words:
// Every keystroke updates state = source of truth.
// -----------------------------------------------------------------------------
function NameBox() {
  const [name, setName] = useState("");
  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <p>Hi, {name || "stranger"}</p>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q4: Functional updater
//
// Task:
// setCount(c => c + 1) three times in one click — correct +3.
//
// In simple words:
// count + 1 three times may use stale value.
// Updater always runs on the latest value.
// -----------------------------------------------------------------------------
function TripleAdd() {
  const [count, setCount] = useState(0);
  function addThree() {
    setCount((c) => c + 1);
    setCount((c) => c + 1);
    setCount((c) => c + 1);
  }
  return <button onClick={addThree}>{count}</button>;
}

// -----------------------------------------------------------------------------
// Q5: Object state — immutable update
//
// Task:
// user = { name, age }. Change only age — new object with spread.
//
// In simple words:
// user.age++ ❌. setUser({ ...user, age: user.age + 1 }) ✅
// -----------------------------------------------------------------------------
function UserAge() {
  const [user, setUser] = useState({ name: "Ada", age: 30 });
  return (
    <button
      onClick={() => setUser({ ...user, age: user.age + 1 })}
    >
      {user.name} is {user.age}
    </button>
  );
}

// -----------------------------------------------------------------------------
// Q6: Array state — add item
//
// Task:
// Add new item to todos without mutating.
//
// In simple words:
// setTodos([...todos, "new"]) or filter/map for new array.
// -----------------------------------------------------------------------------
function TodoAdd() {
  const [todos, setTodos] = useState(["milk"]);
  return (
    <div>
      <button onClick={() => setTodos([...todos, "bread"])}>Add bread</button>
      <ul>
        {todos.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q7: [MID] Lazy initial state
//
// Task:
// useState(() => heavyCompute()) — function form when init is expensive.
//
// In simple words:
// useState(heavy()) runs every render. useState(() => heavy()) runs once.
// -----------------------------------------------------------------------------
function ExpensiveInit() {
  const [data] = useState(() => {
    // imagine: localStorage parse / big calc — once
    return { ready: true };
  });
  return <pre>{JSON.stringify(data)}</pre>;
}

// -----------------------------------------------------------------------------
// Q8: [MID] Multiple related states vs one object
//
// Task:
// Form fields: separate useState OR one object — tradeoff.
//
// In simple words:
// Related fields in one object is fine. Very independent → separate states.
// Complex logic → useReducer (12).
// -----------------------------------------------------------------------------
function FormBits() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </>
  );
}

// -----------------------------------------------------------------------------
// Q9: [MID] Batching — multiple setState in one event
//
// Task:
// One click with setA + setB — React 18 batches into one re-render (auto batch).
//
// In simple words:
// Used to batch only in sync handlers; now also in async/timeouts (18+).
// Performance win — not a paint on every set.
// -----------------------------------------------------------------------------
function BatchDemo() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  function bumpBoth() {
    setA((x) => x + 1);
    setB((x) => x + 1);
    // React batches → usually 1 re-render
  }
  return (
    <button type="button" onClick={bumpBoth}>
      a={a} b={b}
    </button>
  );
}

// -----------------------------------------------------------------------------
// Q10: Stale state trap
//
// Task:
// setCount(count + 1) twice quickly — only +1, not +2.
//
// In simple words:
// count closure may hold old value. Use functional updater.
// Interview classic: "Why +1 twice gives +1?"
// -----------------------------------------------------------------------------
function StaleTrap() {
  const [count, setCount] = useState(0);
  function doubleBad() {
    setCount(count + 1);
    setCount(count + 1); // both use same stale count — +1 total
  }
  function doubleGood() {
    setCount((c) => c + 1);
    setCount((c) => c + 1); // +2 total ✅
  }
  return (
    <div>
      <p>{count}</p>
      <button type="button" onClick={doubleBad}>
        Bad +2?
      </button>
      <button type="button" onClick={doubleGood}>
        Good +2
      </button>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q11: Lazy init recap — expensive only once
//
// Task:
// useState(readFromStorage) vs useState(() => readFromStorage()).
//
// In simple words:
// Direct call = function runs every render (React ignores result but cost remains).
// Lazy function = runs once on init render.
// -----------------------------------------------------------------------------
function LazyStorage() {
  const [token] = useState(() => {
    // imagine: JSON.parse(localStorage.getItem("t") ?? "null")
    return "cached-once";
  });
  return <code>{token}</code>;
}

// -----------------------------------------------------------------------------
// Q12: [MID] Derived state anti-pattern
//
// Task:
// Do NOT copy data from props into useState just to sync.
//
// In simple words:
// fullName = first + last — calculate in render, not extra state.
// props → state copy = out of sync bugs when parent updates.
// Exception: user edit draft (08) — intentional local copy.
// -----------------------------------------------------------------------------
function FullName({ first, last }) {
  const fullName = `${first} ${last}`.trim(); // derived — no extra state
  return <p>{fullName}</p>;
}

// -----------------------------------------------------------------------------
// Q13: Reset state with key
//
// Task:
// Form reset — parent changes key={userId} so child gets fresh state.
//
// In simple words:
// key change = React treats it as a new component, state starts from zero.
// Clean trick to "reset on prop change" without useEffect.
// -----------------------------------------------------------------------------
function UserForm({ userId }) {
  const [note, setNote] = useState("");
  return (
    <input
      value={note}
      onChange={(e) => setNote(e.target.value)}
      placeholder={`Notes for user ${userId}`}
    />
  );
}

function UserFormReset() {
  const [userId, setUserId] = useState(1);
  return (
    <div>
      <button type="button" onClick={() => setUserId((u) => u + 1)}>
        Switch user
      </button>
      <UserForm key={userId} userId={userId} />
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q14: Updater chain — sequential updates
//
// Task:
// Three functional updaters at once — order guaranteed on latest value.
//
// In simple words:
// setS(s => ...); setS(s => ...); — queued, chain runs in order.
// Direct setS(s+1) mixed with functional — still prefer all functional if chained.
// -----------------------------------------------------------------------------
function ChainAdd() {
  const [n, setN] = useState(0);
  function addFive() {
    setN((v) => v + 1);
    setN((v) => v + 1);
    setN((v) => v + 1);
    setN((v) => v + 1);
    setN((v) => v + 1);
  }
  return (
    <button type="button" onClick={addFive}>
      {n}
    </button>
  );
}

// -----------------------------------------------------------------------------
// Q15: Array update — remove / toggle immutable
//
// Task:
// Delete with filter, toggle done flag with map.
//
// In simple words:
// splice/mutate ❌. Return new array = React detects change.
// -----------------------------------------------------------------------------
function TodoToggle() {
  const [todos, setTodos] = useState([
    { id: 1, text: "milk", done: false },
    { id: 2, text: "eggs", done: false },
  ]);
  function toggle(id) {
    setTodos((list) =>
      list.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }
  function remove(id) {
    setTodos((list) => list.filter((t) => t.id !== id));
  }
  return (
    <ul>
      {todos.map((t) => (
        <li key={t.id}>
          <button type="button" onClick={() => toggle(t.id)}>
            {t.done ? "☑" : "☐"} {t.text}
          </button>
          <button type="button" onClick={() => remove(t.id)}>
            ×
          </button>
        </li>
      ))}
    </ul>
  );
}

// -----------------------------------------------------------------------------
// Q16: Object nested immutable update
//
// Task:
// Change user.address.city — spread at each level.
//
// In simple words:
// Shallow spread covers one level. Nested = { ...user, address: { ...user.address, city: "Mumbai" } }.
// For deep trees use Immer or normalized state (12).
// -----------------------------------------------------------------------------
function NestedUser() {
  const [user, setUser] = useState({
    name: "Ada",
    address: { city: "Pune", pin: 411001 },
  });
  function moveCity() {
    setUser({
      ...user,
      address: { ...user.address, city: "Mumbai" },
    });
  }
  return (
    <button type="button" onClick={moveCity}>
      {user.name} lives in {user.address.city}
    </button>
  );
}

// -----------------------------------------------------------------------------
// Q17: [MID] When NOT useState
//
// Task:
// Derived values, ref for DOM, server data → fetch + state / cache (TanStack Query).
//
// In simple words:
// Not everything is state: const total = price * qty — calculate in render.
// Frequent DOM read? useRef (10). Complex transitions → useReducer (12).
// -----------------------------------------------------------------------------
function CartLine({ price, qty }) {
  const total = price * qty; // derived — useState is waste
  return (
    <p>
      ₹{price} × {qty} = ₹{total}
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q18: [MID] SSR hydration note
//
// Task:
// Server HTML + client useState initial must match — else hydration mismatch.
//
// In simple words:
// Do not use typeof window check for random initial on SSR.
// Date.now()/Math.random() differs server vs client first render → warning.
// Client-only state: set after mount in useEffect (09).
// -----------------------------------------------------------------------------
function HydrationSafe() {
  const [mounted, setMounted] = useState(false);
  // useEffect(() => setMounted(true), []); // real pattern — 09
  return <p>{mounted ? "Client ready" : "SSR shell"}</p>;
}

// -----------------------------------------------------------------------------
// Q19: [ADV] React 19 useActionState contrast (brief)
//
// Task:
// Form pending/error state — used to be manual useState; React 19 has useActionState.
//
// In simple words:
// Manual: const [pending, setPending] = useState(false) around submit.
// React 19: action + useActionState simplifies form async.
// Core useState still valid everywhere — this is an extra tool.
// -----------------------------------------------------------------------------
function ManualFormPending() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  async function submit(e) {
    e.preventDefault();
    setPending(true);
    setError(null);
    try {
      // await save()
    } catch (err) {
      setError(err.message);
    } finally {
      setPending(false);
    }
  }
  return (
    <form onSubmit={submit}>
      <button type="submit" disabled={pending}>
        {pending ? "Saving..." : "Save"}
      </button>
      {error && <p>{error}</p>}
    </form>
  );
}

// -----------------------------------------------------------------------------
// Q20: [ADV] State initializer with argument pattern
//
// Task:
// Factory: useState(() => createInitial(userId)) — lazy + dynamic init.
//
// In simple words:
// Init function is usually zero-arg. For dynamic init use closure or key reset (Q13).
// State sync on userId change? key={userId} preferred over effect sync.
// -----------------------------------------------------------------------------
function ScoreBoard({ gameId }) {
  const [score, setScore] = useState(() => 0);
  return (
    <p>
      Game {gameId}: {score}{" "}
      <button type="button" onClick={() => setScore((s) => s + 1)}>
        +1
      </button>
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q21: [ADV] Anti-pattern — too many useState calls
//
// Task:
// 15 separate useState in related form — consider object or useReducer.
//
// In simple words:
// Related updates together? Object/reducer gives atomic update.
// Simple 2-3 fields? Separate useState is clean — do not over-unify.
// -----------------------------------------------------------------------------
function SimpleForm() {
  const [form, setForm] = useState({ name: "", email: "" });
  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }
  return (
    <>
      <input
        value={form.name}
        onChange={(e) => update("name", e.target.value)}
      />
      <input
        value={form.email}
        onChange={(e) => update("email", e.target.value)}
      />
    </>
  );
}

// -----------------------------------------------------------------------------
// Q22: [ADV] Interview — setState async feel
//
// Task:
// setCount(5); console.log(count) — still shows old count.
//
// In simple words:
// setState schedules an update — variable does not change immediately.
// Need new value? Use functional updater or useEffect on count (09).
// -----------------------------------------------------------------------------
function AsyncFeel() {
  const [count, setCount] = useState(0);
  function logAfterSet() {
    setCount(99);
    console.log(count); // still old — not 99 yet
  }
  return (
    <button type="button" onClick={logAfterSet}>
      UI count: {count}
    </button>
  );
}

export {
  Counter,
  Toggle,
  NameBox,
  TripleAdd,
  UserAge,
  TodoAdd,
  ExpensiveInit,
  FormBits,
  BatchDemo,
  StaleTrap,
  LazyStorage,
  FullName,
  UserForm,
  UserFormReset,
  ChainAdd,
  TodoToggle,
  NestedUser,
  CartLine,
  HydrationSafe,
  ManualFormPending,
  ScoreBoard,
  SimpleForm,
  AsyncFeel,
};
