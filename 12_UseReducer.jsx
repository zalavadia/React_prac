// ============================================================================
// 12 — useReducer
// Level: MID  |  Sequence: read this file, then the next number
// ============================================================================
//
// SIMPLE: useState is small boxes. useReducer = kitchen manager who hears ORDER (action)
// and builds new state from a recipe (reducer).
// dispatch({ type: "add", payload }) → reducer(state, action) → nextState.
//
// When: many related fields, complex transitions, next state depends on previous,
// or you want to clearly document "event → how state changes" (mini Redux).
//
// WHY: Forms/wizards/game logic stay clean. Testable pure reducer.
// INTERVIEW: when useReducer vs useState; pure reducer; immer optional.
// Use in a Vite + React 19 project — teaching file.
//
// ============================================================================

import { useReducer } from "react";

// -----------------------------------------------------------------------------
// Q1: Counter with reducer
//
// Task:
// INC / DEC / RESET actions.
//
// In simple words:
// All update logic in one place. UI only dispatches.
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
// Task:
// add / toggle / remove.
//
// In simple words:
// Array updates are immutable. Data goes in action.payload.
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
// Task:
// field update action + reset.
//
// In simple words:
// Many fields — one reducer vs many useState. Related fields → reducer is nice.
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
// Task:
// useReducer(reducer, arg, initFn)
//
// In simple words:
// Heavy initial state once — build with init(arg).
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
// Task:
// status: idle→loading→success|error; ignore invalid transitions.
//
// In simple words:
// Reducer rules enforce — fewer random setStatus bugs.
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
// Task:
// state+dispatch in Provider; children dispatch actions.
//
// In simple words:
// Mid apps use this pattern before Redux. Scale carefully.
// -----------------------------------------------------------------------------
// See 11_UseContext split pattern — pair with useReducer for store-like API.

// -----------------------------------------------------------------------------
// Q7: Immer-style note (concept)
//
// Task:
// Understand: mutate draft libraries exist; core React uses spread/map.
//
// In simple words:
// Interview: reducer must be pure — no fetch inside reducer.
// Side effects go AFTER dispatch / in effect.
// -----------------------------------------------------------------------------
function pureReducer(state, action) {
  // ✅ return new state only
  // ❌ fetch(); localStorage.setItem — not here
  if (action.type === "tick") return { ...state, n: state.n + 1 };
  return state;
}

// -----------------------------------------------------------------------------
// Q8: Prefer useState when simple
//
// Task:
// One boolean toggle — useState is enough.
//
// In simple words:
// Don't over-engineer. Use reducer when complexity grows.
// -----------------------------------------------------------------------------
// const [on, setOn] = useState(false); // simple → state

// -----------------------------------------------------------------------------
// Q9: Complex nested state reducer
//
// Task:
// state = { user: { name, prefs: { theme } } } — nested update immutable.
//
// In simple words:
// If spread chain gets long, consider immer. Core React uses manual spread.
// Related nested fields stay clean in one reducer.
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
// Task:
// draft.user.prefs.theme = "dark"; return draft — wrap with immer produce().
//
// In simple words:
// Interview: "write mutate with immer, get immutable output."
// Inside reducer: produce(state, draft => { draft.n++ }) — optional lib.
// Core interview: spread is also an acceptable answer.
// -----------------------------------------------------------------------------
// import { produce } from "immer";
// const next = produce(state, draft => { draft.items.push(x); });

// -----------------------------------------------------------------------------
// Q11: Init function deep dive
//
// Task:
// useReducer(reducer, props.initialCount, (n) => ({ count: n, log: [] }))
//
// In simple words:
// Init runs only on FIRST mount — arg change on re-mount is ignored (usually).
// Hydrating from localStorage is a common init use case.
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
// Task:
// dispatch function reference is stable from mount — safe in deps.
//
// In simple words:
// useEffect(() => { dispatch({ type: "tick" }) }, [dispatch]) — OK.
// Stable identity like setState — pass in context without memo.
// -----------------------------------------------------------------------------
function StableDispatchDemo() {
  const [state, dispatch] = useReducer(counterReducer, 0);
  // dispatch identity stable across renders
  return <button onClick={() => dispatch({ type: "inc" })}>{state}</button>;
}

// -----------------------------------------------------------------------------
// Q13: Reducer purity rules
//
// Task:
// In reducer: no fetch, no Date.now side effect, no mutate state arg.
//
// In simple words:
// Pure (state, action) => newState — same input same output.
// Side effects in action handler / useEffect. Test reducer separately easily.
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
// Task:
// function logger(reducer) { return (s,a) => { console.log(a); return reducer(s,a) } }
//
// In simple words:
// Higher-order reducer — mini Redux middleware idea.
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
// Task:
// 1 field toggle → useState. 5+ related fields + transitions → reducer.
//
// In simple words:
// useState: simple, less boilerplate. useReducer: clear event→state map.
// Complex depend on previous state → reducer shines.
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
// Task:
// const inc = () => ({ type: "inc" }); dispatch(inc());
//
// In simple words:
// Fewer typos — type string in one place. Components stay clean.
// Standard in Redux; helpful in local useReducer for big apps too.
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
// Task:
// type Action = { type: "inc" } | { type: "add"; text: string }
//
// In simple words:
// Discriminated union — exhaustive switch. payload typed per action.
// Document in JS with comments; TS compiler helps.
// -----------------------------------------------------------------------------
// /** @typedef {{ type: "toggle"; id: number }} ToggleAction */
// /** @typedef {{ type: "add"; text: string; id: number }} AddAction */
// /** @typedef {ToggleAction | AddAction} TodoAction */

// -----------------------------------------------------------------------------
// Q18: Batch related updates one dispatch
//
// Task:
// action { type: "loginSuccess", user, token } — one dispatch, multiple fields.
//
// In simple words:
// Many setState calls vs one reducer action — atomic update, one re-render.
// Fewer race / half-updated state bugs.
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
// Task:
// switch default: return state — ignore unknown action.
//
// In simple words:
// Sometimes default throws in dev — catches typos. Prod often returns state.
// Redux Toolkit uses extraReducers — different pattern.
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
// Task:
// init reads storage once; reducer updates; effect persists (optional).
//
// In simple words:
// Heavy init once. Init does not run again on re-render.
// You can build a custom usePersistedReducer hook.
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
// Task:
// loading, data, error three useState → one fetchReducer (like Q5).
//
// In simple words:
// Related async states stay in sync easily. One action invalidates another field.
// setLoading(true); setError(null) — two calls vs dispatch({ type: "start" }).
// -----------------------------------------------------------------------------
function FetchStateNote() {
  return <p>Async trio (loading/data/error) = classic reducer win.</p>;
}

// -----------------------------------------------------------------------------
// Q22: Testing reducer in isolation
//
// Task:
// expect(todosReducer([], { type: "add", id: 1, text: "x" })).toEqual([...])
//
// In simple words:
// Pure reducer = unit test without React render. Fast, reliable.
// Component test separate; keep business logic in reducer.
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
