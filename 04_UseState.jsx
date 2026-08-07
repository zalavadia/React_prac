// ============================================================================
// 04 — useState
// Level: BASE  |  Sequence: pehle yeh, phir agla number
// ============================================================================
//
// LAYMAN: useState = dabbe me value + "dabba badalne wala button".
// Jaise chai counter: cups = 0, har order pe cups++. Screen khud update.
// const [count, setCount] = useState(0) — count padho, setCount se likho.
//
// setCount(5) direct. setCount(c => c + 1) jab purani value pe depend.
// Object/array update: naya copy banao (spread), mutate mat karo.
//
// KYUN: Interactive UI ka dil. Bina state ke sirf static page.
// INTERVIEW: async batching; functional updater; don't mutate state.
// Vite/React 19 project me use — teaching file.
//
// ============================================================================

import { useState } from "react";

// -----------------------------------------------------------------------------
// Q1: Counter basics
//
// Kya karna hai:
// count 0 se start, button pe +1.
//
// Seedha matlab:
// setCount se UI dubara paint. Direct count++ kaam nahi — React nahi sunega.
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
// Kya karna hai:
// isOpen true/false flip — Show/Hide.
//
// Seedha matlab:
// Boolean state = lights switch. UI conditional (06) se jodna.
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
// Kya karna hai:
// name state, input pe setName — controlled feel (08 deep).
//
// Seedha matlab:
// Har keystroke pe state = source of truth.
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
// Kya karna hai:
// setCount(c => c + 1) teen baar ek click pe — sahi +3.
//
// Seedha matlab:
// count + 1 teen baar stale value use kar sakta hai.
// Updater hamesha latest pe chalta hai.
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
// Kya karna hai:
// user = { name, age }. Sirf age badlo — spread se naya object.
//
// Seedha matlab:
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
// Kya karna hai:
// todos me naya item push bina mutate.
//
// Seedha matlab:
// setTodos([...todos, "new"]) ya filter/map se naya array.
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
// Kya karna hai:
// useState(() => heavyCompute()) — function form jab init mehengi ho.
//
// Seedha matlab:
// useState(heavy()) har render pe chalega. useState(() => heavy()) ek baar.
// -----------------------------------------------------------------------------
function ExpensiveInit() {
  const [data] = useState(() => {
    // socho: localStorage parse / big calc — ek baar
    return { ready: true };
  });
  return <pre>{JSON.stringify(data)}</pre>;
}

// -----------------------------------------------------------------------------
// Q8: [MID] Multiple related states vs one object
//
// Kya karna hai:
// form fields alag useState YA ek object — tradeoff.
//
// Seedha matlab:
// Related fields object me theek. Bahut independent → alag states.
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
// Q9: [MID] Batching — ek event me multiple setState
//
// Kya karna hai:
// Ek click pe setA + setB — React 18 me ek hi re-render (auto batch).
//
// Seedha matlab:
// Pehle sync handlers me batch hota tha; ab async/timeouts me bhi (18+).
// Performance win — har set pe paint nahi.
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
// Kya karna hai:
// setCount(count + 1) do baar fast — +1 hi hoga, +2 nahi.
//
// Seedha matlab:
// count closure purani value pakad sakta hai. Functional updater use karo.
// Interview classic: "Why +1 twice gives +1?"
// -----------------------------------------------------------------------------
function StaleTrap() {
  const [count, setCount] = useState(0);
  function doubleBad() {
    setCount(count + 1);
    setCount(count + 1); // dono same stale count use — +1 total
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
// Kya karna hai:
// useState(readFromStorage) vs useState(() => readFromStorage()).
//
// Seedha matlab:
// Direct call = har render pe function chalega (React ignore karega result lekin cost hai).
// Lazy function = init render pe ek baar.
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
// Kya karna hai:
// props se aaya data ko useState me copy MAT karo sync ke liye.
//
// Seedha matlab:
// fullName = first + last — render me calculate karo, alag state nahi.
// props → state copy = out of sync bugs jab parent update kare.
// Exception: user edit draft (08) — intentional local copy.
// -----------------------------------------------------------------------------
function FullName({ first, last }) {
  const fullName = `${first} ${last}`.trim(); // derived — no extra state
  return <p>{fullName}</p>;
}

// -----------------------------------------------------------------------------
// Q13: Reset state with key
//
// Kya karna hai:
// Form reset — parent key={userId} badle to child fresh state.
//
// Seedha matlab:
// key change = React naya component maan ke state zero se.
// useEffect ke bina "reset on prop change" ka clean trick.
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
// Kya karna hai:
// Teen functional updater ek saath — order guaranteed latest pe.
//
// Seedha matlab:
// setS(s => ...); setS(s => ...); — queue me jate hain, chain chalti hai.
// Direct setS(s+1) mix with functional — still prefer all functional if chained.
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
// Kya karna hai:
// filter se delete, map se toggle done flag.
//
// Seedha matlab:
// splice/mutate ❌. Naya array return = React change detect kare.
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
// Kya karna hai:
// user.address.city badlo — spread at each level.
//
// Seedha matlab:
// Shallow spread ek level. Nested = { ...user, address: { ...user.address, city: "Mumbai" } }.
// Deep trees ke liye Immer ya normalized state (12).
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
// Kya karna hai:
// Derived values, ref for DOM, server data → fetch + state / cache (TanStack Query).
//
// Seedha matlab:
// Har cheez state nahi: const total = price * qty — calculate in render.
// Frequent DOM read? useRef (10). Complex transitions → useReducer (12).
// -----------------------------------------------------------------------------
function CartLine({ price, qty }) {
  const total = price * qty; // derived — useState waste
  return (
    <p>
      ₹{price} × {qty} = ₹{total}
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q18: [MID] SSR hydration note
//
// Kya karna hai:
// Server HTML + client useState initial match — warna hydration mismatch.
//
// Seedha matlab:
// typeof window check se random initial mat do SSR pe.
// Date.now()/Math.random() first render server vs client alag → warning.
// Client-only state: useEffect me set after mount (09).
// -----------------------------------------------------------------------------
function HydrationSafe() {
  const [mounted, setMounted] = useState(false);
  // useEffect(() => setMounted(true), []); // real pattern — 09
  return <p>{mounted ? "Client ready" : "SSR shell"}</p>;
}

// -----------------------------------------------------------------------------
// Q19: [ADV] React 19 useActionState contrast (brief)
//
// Kya karna hai:
// Form pending/error state — pehle manual useState; 19 me useActionState option.
//
// Seedha matlab:
// Manual: const [pending, setPending] = useState(false) around submit.
// React 19: action + useActionState form async ko simplify karta hai.
// Core useState ab bhi har jagah valid — yeh extra tool.
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
// Kya karna hai:
// Factory: useState(() => createInitial(userId)) — lazy + dynamic init.
//
// Seedha matlab:
// Init function zero-arg hota hai usually. Dynamic init ke liye closure ya key reset (Q13).
// userId change pe state sync? key={userId} preferred over effect sync.
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
// Kya karna hai:
// 15 alag useState related form me — object ya useReducer consider karo.
//
// Seedha matlab:
// Related updates ek saath? Object/reducer se atomic update.
// Simple 2-3 fields? Alag useState clean hai — over-unify mat karo.
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
// Kya karna hai:
// setCount(5); console.log(count) — abhi purana count dikhega.
//
// Seedha matlab:
// setState request schedule karta hai — turant variable update nahi.
// Naya value chahiye? functional updater ya useEffect on count (09).
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
