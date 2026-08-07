// ============================================================================
// 12 — useReducer
// Level: MID  |  Sequence: pehle yeh, phir agla number
// ============================================================================
//
// LAYMAN: useState chhote dabbe. useReducer = kitchen manager jo ORDER (action)
// sunke state recipe (reducer) se naya state banata hai.
// dispatch({ type: "add", payload }) → reducer(state, action) → nextState.
//
// Jab: kai related fields, complex transitions, next state purane pe depend,
// ya "event → how state changes" clear document karna ho (Redux jaisa mini).
//
// KYUN: Forms/wizards/game logic clean. Testable pure reducer.
// INTERVIEW: when useReducer vs useState; pure reducer; immer optional.
// Vite/React 19 project me use — teaching file.
//
// ============================================================================

import { useReducer } from "react";

// -----------------------------------------------------------------------------
// Q1: Counter with reducer
//
// Kya karna hai:
// INC / DEC / RESET actions.
//
// Seedha matlab:
// Saari update logic ek jagah. UI sirf dispatch.
// -----------------------------------------------------------------------------
function counterReducer(state, action) {
  switch (action.type) {
    case "inc":
      return state + 1;
    case "dec":
      return state - 1;
    case "reset":
      return 0;
    default:
      return state;
  }
}

function CounterR() {
  const [count, dispatch] = useReducer(counterReducer, 0);
  return (
    <div>
      {count}
      <button onClick={() => dispatch({ type: "inc" })}>+</button>
      <button onClick={() => dispatch({ type: "dec" })}>-</button>
      <button onClick={() => dispatch({ type: "reset" })}>0</button>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q2: Todo list reducer
//
// Kya karna hai:
// add / toggle / remove.
//
// Seedha matlab:
// Array updates immutable. action.payload me data.
// -----------------------------------------------------------------------------
function todosReducer(state, action) {
  switch (action.type) {
    case "add":
      return [...state, { id: action.id, text: action.text, done: false }];
    case "toggle":
      return state.map((t) =>
        t.id === action.id ? { ...t, done: !t.done } : t
      );
    case "remove":
      return state.filter((t) => t.id !== action.id);
    default:
      return state;
  }
}

function Todos() {
  const [todos, dispatch] = useReducer(todosReducer, []);
  return (
    <div>
      <button
        onClick={() =>
          dispatch({ type: "add", id: Date.now(), text: "New" })
        }
      >
        Add
      </button>
      <ul>
        {todos.map((t) => (
          <li key={t.id}>
            <button onClick={() => dispatch({ type: "toggle", id: t.id })}>
              {t.done ? "✓" : "○"} {t.text}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q3: Form object reducer
//
// Kya karna hai:
// field update action + reset.
//
// Seedha matlab:
// Kai fields — ek reducer vs kai useState. Related → reducer nice.
// -----------------------------------------------------------------------------
function formReducer(state, action) {
  switch (action.type) {
    case "change":
      return { ...state, [action.name]: action.value };
    case "reset":
      return action.initial;
    default:
      return state;
  }
}

function ProfileForm() {
  const initial = { name: "", city: "" };
  const [form, dispatch] = useReducer(formReducer, initial);
  return (
    <form>
      <input
        name="name"
        value={form.name}
        onChange={(e) =>
          dispatch({ type: "change", name: "name", value: e.target.value })
        }
      />
      <button
        type="button"
        onClick={() => dispatch({ type: "reset", initial })}
      >
        Reset
      </button>
    </form>
  );
}

// -----------------------------------------------------------------------------
// Q4: Lazy init
//
// Kya karna hai:
// useReducer(reducer, arg, initFn)
//
// Seedha matlab:
// Heavy initial state ek baar — init(arg) se banao.
// -----------------------------------------------------------------------------
function init(count) {
  return { count, history: [] };
}
function lazyReducer(state, action) {
  if (action.type === "inc") {
    return { count: state.count + 1, history: [...state.history, state.count] };
  }
  return state;
}
function LazyCounter() {
  const [state, dispatch] = useReducer(lazyReducer, 10, init);
  return (
    <button onClick={() => dispatch({ type: "inc" })}>{state.count}</button>
  );
}

// -----------------------------------------------------------------------------
// Q5: [MID] Finite state machine feel
//
// Kya karna hai:
// status: idle→loading→success|error; invalid transitions ignore.
//
// Seedha matlab:
// Reducer rules enforce — random setStatus bugs kam.
// -----------------------------------------------------------------------------
function fetchReducer(state, action) {
  switch (action.type) {
    case "start":
      return state.status === "loading"
        ? state
        : { status: "loading", data: null, error: null };
    case "ok":
      return { status: "success", data: action.data, error: null };
    case "fail":
      return { status: "error", data: null, error: action.error };
    default:
      return state;
  }
}

function FetchMachine() {
  const [state, dispatch] = useReducer(fetchReducer, {
    status: "idle",
    data: null,
    error: null,
  });
  async function load() {
    dispatch({ type: "start" });
    try {
      const data = await fetch("/api").then((r) => r.json());
      dispatch({ type: "ok", data });
    } catch (error) {
      dispatch({ type: "fail", error: String(error) });
    }
  }
  return (
    <div>
      <button onClick={load}>Load</button>
      <p>{state.status}</p>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q6: [MID] useReducer + context = light Redux
//
// Kya karna hai:
// Provider me state+dispatch; children dispatch actions.
//
// Seedha matlab:
// Mid apps me Redux se pehle yeh pattern. Scale carefully.
// -----------------------------------------------------------------------------
// See 11_UseContext split pattern — pair with useReducer for store-like API.

// -----------------------------------------------------------------------------
// Q7: Immer-style note (concept)
//
// Kya karna hai:
// Samjho: mutate draft libraries exist; core React me spread/map.
//
// Seedha matlab:
// Interview: reducer must be pure — no fetch inside reducer.
// Side effects dispatch ke BAAD / effect me.
// -----------------------------------------------------------------------------
function pureReducer(state, action) {
  // ✅ return new state only
  // ❌ fetch(); localStorage.setItem — yahan mat
  if (action.type === "tick") return { ...state, n: state.n + 1 };
  return state;
}

// -----------------------------------------------------------------------------
// Q8: Prefer useState when simple
//
// Kya karna hai:
// Ek boolean toggle — useState kaafi.
//
// Seedha matlab:
// Over-engineer mat. Complexity aaye tab reducer.
// -----------------------------------------------------------------------------
// const [on, setOn] = useState(false); // simple → state

// -----------------------------------------------------------------------------
// Q9: Complex nested state reducer
//
// Kya karna hai:
// state = { user: { name, prefs: { theme } } } — nested update immutable.
//
// Seedha matlab:
// Spread chain lamba ho to immer socho. Core React me manual spread.
// Related nested fields ek reducer me clean.
// -----------------------------------------------------------------------------
function nestedReducer(state, action) {
  switch (action.type) {
    case "setTheme":
      return {
        ...state,
        user: {
          ...state.user,
          prefs: { ...state.user.prefs, theme: action.theme },
        },
      };
    default:
      return state;
  }
}

function NestedProfile() {
  const [state, dispatch] = useReducer(nestedReducer, {
    user: { name: "Jay", prefs: { theme: "light" } },
  });
  return (
    <button
      onClick={() => dispatch({ type: "setTheme", theme: "dark" })}
    >
      {state.user.prefs.theme}
    </button>
  );
}

// -----------------------------------------------------------------------------
// Q10: Immer sketch (concept)
//
// Kya karna hai:
// draft.user.prefs.theme = "dark"; return draft — immer produce() wrap.
//
// Seedha matlab:
// Interview: "immer se mutate likho, immutable output milega."
// Reducer ke andar produce(state, draft => { draft.n++ }) — optional lib.
// Core interview: spread bhi acceptable answer.
// -----------------------------------------------------------------------------
// import { produce } from "immer";
// const next = produce(state, draft => { draft.items.push(x); });

// -----------------------------------------------------------------------------
// Q11: Init function deep dive
//
// Kya karna hai:
// useReducer(reducer, props.initialCount, (n) => ({ count: n, log: [] }))
//
// Seedha matlab:
// Init sirf FIRST mount pe chalta — re-mount pe arg change ignore (usually).
// localStorage se hydrate karna common init use-case.
// -----------------------------------------------------------------------------
function readStoredCount(key, fallback) {
  const raw = localStorage.getItem(key);
  return raw != null ? Number(raw) : fallback;
}
function persistedInit(n) {
  return { count: readStoredCount("count", n), history: [] };
}

// -----------------------------------------------------------------------------
// Q12: [MID] dispatch stability
//
// Kya karna hai:
// dispatch function reference mount se stable — deps me safe.
//
// Seedha matlab:
// useEffect(() => { dispatch({ type: "tick" }) }, [dispatch]) — OK.
// setState jaisa stable identity — context me pass karo bina memo ke.
// -----------------------------------------------------------------------------
function StableDispatchDemo() {
  const [state, dispatch] = useReducer(counterReducer, 0);
  // dispatch identity stable across renders
  return <button onClick={() => dispatch({ type: "inc" })}>{state}</button>;
}

// -----------------------------------------------------------------------------
// Q13: Reducer purity rules
//
// Kya karna hai:
// Reducer me: no fetch, no Date.now side effect, no mutate state arg.
//
// Seedha matlab:
// Pure (state, action) => newState — same input same output.
// Side effects action handler / useEffect me. Test reducer alag easily.
// -----------------------------------------------------------------------------
function impureBad(state, action) {
  // ❌ state.items.push(action.item); return state; — mutate
  // ❌ fetch("/api"); — side effect
  if (action.type === "add") return [...state, action.item];
  return state;
}

// -----------------------------------------------------------------------------
// Q14: Middleware-ish wrapper sketch
//
// Kya karna hai:
// function logger(reducer) { return (s,a) => { console.log(a); return reducer(s,a) } }
//
// Seedha matlab:
// Higher-order reducer — Redux middleware idea mini.
// useReducer(logger(myReducer), init) — debug / analytics wrap.
// -----------------------------------------------------------------------------
function withLogger(reducer) {
  return (state, action) => {
    console.log("action", action.type);
    return reducer(state, action);
  };
}

function LoggedCounter() {
  const [count, dispatch] = useReducer(withLogger(counterReducer), 0);
  return <button onClick={() => dispatch({ type: "inc" })}>{count}</button>;
}

// -----------------------------------------------------------------------------
// Q15: useReducer vs useState — when which
//
// Kya karna hai:
// 1 field toggle → useState. 5+ related fields + transitions → reducer.
//
// Seedha matlab:
// useState: simple, kam boilerplate. useReducer: event→state map clear.
// Next state purane pe complex depend → reducer shine.
// -----------------------------------------------------------------------------
function WhenWhichNote() {
  return (
    <p>
      Simple bool → useState. Wizard steps / cart / FSM → useReducer.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q16: Action creators
//
// Kya karna hai:
// const inc = () => ({ type: "inc" }); dispatch(inc());
//
// Seedha matlab:
// Typos kam — type string ek jagah. Components clean.
// Redux me standard; local useReducer me bhi helpful bade apps me.
// -----------------------------------------------------------------------------
const incAction = () => ({ type: "inc" });
const decAction = () => ({ type: "dec" });

function ActionCreatorCounter() {
  const [count, dispatch] = useReducer(counterReducer, 0);
  return (
    <div>
      {count}
      <button onClick={() => dispatch(incAction())}>+</button>
      <button onClick={() => dispatch(decAction())}>-</button>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q17: [MID] TypeScript-ish action unions (comments)
//
// Kya karna hai:
// type Action = { type: "inc" } | { type: "add"; text: string }
//
// Seedha matlab:
// Discriminated union — switch exhaustive. payload typed per action.
// JS me comments se document; TS me compiler help karta hai.
// -----------------------------------------------------------------------------
// /** @typedef {{ type: "toggle"; id: number }} ToggleAction */
// /** @typedef {{ type: "add"; text: string; id: number }} AddAction */
// /** @typedef {ToggleAction | AddAction} TodoAction */

// -----------------------------------------------------------------------------
// Q18: Batch related updates one dispatch
//
// Kya karna hai:
// action { type: "loginSuccess", user, token } — ek dispatch multiple fields.
//
// Seedha matlab:
// Kai setState calls vs ek reducer action — atomic update, ek re-render.
// Race / half-updated state bugs kam.
// -----------------------------------------------------------------------------
function authReducer(state, action) {
  switch (action.type) {
    case "loginSuccess":
      return { ...state, user: action.user, token: action.token, status: "in" };
    case "logout":
      return { user: null, token: null, status: "out" };
    default:
      return state;
  }
}

// -----------------------------------------------------------------------------
// Q19: Default case return state
//
// Kya karna hai:
// switch default: return state — unknown action ignore.
//
// Seedha matlab:
// Kabhi default throw karte hain dev me — typo catch. Prod me often return state.
// Redux Toolkit me extraReducers alag pattern.
// -----------------------------------------------------------------------------
function strictReducer(state, action) {
  switch (action.type) {
    case "inc":
      return state + 1;
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

// -----------------------------------------------------------------------------
// Q20: [MID] useReducer + lazy init + localStorage
//
// Kya karna hai:
// init reads storage once; reducer updates; effect persists (optional).
//
// Seedha matlab:
// Heavy init ek baar. Re-render pe init dubara nahi.
// Custom hook usePersistedReducer bana sakte ho.
// -----------------------------------------------------------------------------
function PersistedCounter() {
  const [state, dispatch] = useReducer(lazyReducer, 0, persistedInit);
  return (
    <button onClick={() => dispatch({ type: "inc" })}>{state.count}</button>
  );
}

// -----------------------------------------------------------------------------
// Q21: Replacing multiple useState with one reducer
//
// Kya karna hai:
// loading, data, error teen useState → ek fetchReducer (Q5 jaisa).
//
// Seedha matlab:
// Related async states sync rehna easy. Ek action invalidates doosra field.
// setLoading(true); setError(null) — do calls vs dispatch({ type: "start" }).
// -----------------------------------------------------------------------------
function FetchStateNote() {
  return <p>Async trio (loading/data/error) = classic reducer win.</p>;
}

// -----------------------------------------------------------------------------
// Q22: Testing reducer in isolation
//
// Kya karna hai:
// expect(todosReducer([], { type: "add", id: 1, text: "x" })).toEqual([...])
//
// Seedha matlab:
// Pure reducer = unit test bina React render ke. Fast, reliable.
// Component test alag; business logic reducer me rakho.
// -----------------------------------------------------------------------------
// test("toggle", () => {
//   const s = [{ id: 1, done: false }];
//   expect(todosReducer(s, { type: "toggle", id: 1 })[0].done).toBe(true);
// });

export {
  CounterR,
  Todos,
  ProfileForm,
  LazyCounter,
  FetchMachine,
  pureReducer,
  NestedProfile,
  StableDispatchDemo,
  LoggedCounter,
  WhenWhichNote,
  ActionCreatorCounter,
  authReducer,
  PersistedCounter,
  FetchStateNote,
};
