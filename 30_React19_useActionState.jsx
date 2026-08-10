// ============================================================================
// 30 — React 19 useActionState
// Level: REACT19  |  Study order: do this file first, then the next in sequence
// ============================================================================
//
// SIMPLE: After form submit UI must show:
// "what result came back?", "what was before?", "is it pending now?"
//
// useActionState = all three in one hook.
// Old name in experimental was useFormState; React 19 renamed to useActionState.
//
// Think counter machine: remembers old number (previous state),
// press button (action), show new number, pending while processing.
//
// Signature (concept):
//   const [state, formAction, isPending] = useActionState(action, initialState, permalink?)
//   action(previousState, formData) → nextState
//
// WHY: #1 React 19 forms hook in interviews.
// INTERVIEW: why previous state is passed; isPending; error object return pattern.
//
// ============================================================================

import { useActionState } from "react";

// -----------------------------------------------------------------------------
// Q1: Basic counter with previous state
//
// In simple words:
// First arg of action = current state so far.
// Second = FormData (form fields).
// Return = new state bound to UI.
// -----------------------------------------------------------------------------
async function addOne(prevCount, _formData) {
  // simulate network
  await new Promise((r) => setTimeout(r, 300));
  return prevCount + 1;
}

export function CounterWithActionState() {
  const [count, formAction, isPending] = useActionState(addOne, 0);

  return (
    <form action={formAction}>
      <p>Count: {count}</p>
      <button type="submit" disabled={isPending}>
        {isPending ? "..." : "+1"}
      </button>
    </form>
  );
}

// -----------------------------------------------------------------------------
// Q2: [MID] Message form — success / error in state object
//
// In simple words:
// State is not only number — return object { error, message }.
// UI shows alert from object. Use prev to keep/clear old message.
// -----------------------------------------------------------------------------
async function sendMessage(prev, formData) {
  const text = String(formData.get("text") || "").trim();
  if (!text) {
    return { ...prev, error: "Empty message", ok: false };
  }
  // await api.send(text)
  return { message: text, error: null, ok: true };
}

export function MessageForm() {
  const [state, formAction, isPending] = useActionState(sendMessage, {
    message: "",
    error: null,
    ok: false,
  });

  return (
    <form action={formAction}>
      <input name="text" placeholder="Type..." />
      <button type="submit" disabled={isPending}>
        Send
      </button>
      {state.error && <p role="alert">{state.error}</p>}
      {state.ok && <p>Sent: {state.message}</p>}
    </form>
  );
}

// -----------------------------------------------------------------------------
// Q3: isPending — button disable + label
//
// In simple words:
// isPending true until action Promise settles.
// Built-in signal to stop double-submit — less separate useState('loading').
// -----------------------------------------------------------------------------
async function slowSave(prev, formData) {
  await new Promise((r) => setTimeout(r, 1000));
  return { last: formData.get("title"), savedAt: Date.now() };
}

export function SlowSaveForm() {
  const [state, formAction, isPending] = useActionState(slowSave, { last: null });

  return (
    <form action={formAction}>
      <input name="title" />
      <button disabled={isPending}>{isPending ? "Saving..." : "Save"}</button>
      <pre>{JSON.stringify(state)}</pre>
    </form>
  );
}

// -----------------------------------------------------------------------------
// Q4: [MID] Why is previous state important?
//
// In simple words:
// Sometimes new state depends on old (increment, append list).
// Sometimes on error keep old good data.
// Think action as pure function: (prev, formData) => next
// -----------------------------------------------------------------------------
async function appendTodo(prev, formData) {
  const title = String(formData.get("title") || "").trim();
  if (!title) return prev;
  return [...prev, { id: crypto.randomUUID(), title }];
}

export function TodoActionList() {
  const [todos, formAction, isPending] = useActionState(appendTodo, []);

  return (
    <div>
      <form action={formAction}>
        <input name="title" />
        <button disabled={isPending}>Add</button>
      </form>
      <ul>
        {todos.map((t) => (
          <li key={t.id}>{t.title}</li>
        ))}
      </ul>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q5: formAction on button too (same hook)
//
// In simple words:
// formAction from useActionState — form action= OR button formAction=
// Same pending/state pipeline both places.
// -----------------------------------------------------------------------------
async function like(prev) {
  return { ...prev, likes: prev.likes + 1 };
}
async function unlike(prev) {
  return { ...prev, likes: Math.max(0, prev.likes - 1) };
}

export function LikeUnlike() {
  const [state, formAction, isPending] = useActionState(like, { likes: 0 });
  // Note: unlike needs separate useActionState for separate action fn —
  // teaching: one formAction primarily binds to the hook's action.
  // Multiple actions → often separate hooks OR one action that branches on formData.
  return (
    <form action={formAction}>
      <span>{state.likes}</span>
      <button disabled={isPending}>Like</button>
    </form>
  );
}

// -----------------------------------------------------------------------------
// Q6: Branch inside ONE action via hidden/intent field
//
// In simple words:
// Practical pattern: formData.get('intent') === 'delete' | 'save'
// One useActionState, multiple buttons with name="intent" value=...
// -----------------------------------------------------------------------------
async function cartAction(prev, formData) {
  const intent = formData.get("intent");
  const id = formData.get("id");
  if (intent === "add") {
    return { ...prev, items: [...prev.items, id] };
  }
  if (intent === "clear") {
    return { ...prev, items: [] };
  }
  return prev;
}

export function CartIntentForm() {
  const [state, formAction] = useActionState(cartAction, { items: [] });
  return (
    <form action={formAction}>
      <button name="intent" value="add">
        Add
      </button>
      <input type="hidden" name="id" value="sku-1" />
      <button name="intent" value="clear">
        Clear
      </button>
      <p>Items: {state.items.join(", ")}</p>
    </form>
  );
}

// -----------------------------------------------------------------------------
// Q7: [MID] useActionState vs useState + onSubmit
//
// In simple words:
// useState: you sync pending/error/data yourself.
// useActionState: action return = source of truth; isPending free.
// Complex multi-field live validation → mix with local useState OK.
// -----------------------------------------------------------------------------
const compare = {
  useStateSubmit: "full control, more boilerplate",
  useActionState: "form-centric async state machine",
};

// -----------------------------------------------------------------------------
// Q8: Initial state + reset feel
//
// In simple words:
// initialState only seeds first render.
// "Form reset" = action returns empty object, or component key remount.
// -----------------------------------------------------------------------------
async function resettable(prev, formData) {
  if (formData.get("intent") === "reset") {
    return { name: "", note: "reset done" };
  }
  return { name: formData.get("name"), note: "saved" };
}

export function ResettableProfile() {
  const [state, formAction, isPending] = useActionState(resettable, {
    name: "",
    note: "idle",
  });
  return (
    <form action={formAction}>
      <input name="name" defaultValue={state.name || ""} />
      <button name="intent" value="save" disabled={isPending}>
        Save
      </button>
      <button name="intent" value="reset" type="submit">
        Reset state
      </button>
      <p>{state.note}</p>
    </form>
  );
}

// -----------------------------------------------------------------------------
// Q9: [MID] permalink arg (3rd param) — mental model
//
// Task:
// useActionState(action, initial, permalink?) — shareable URL state idea (frameworks).
//
// In simple words:
// Optional 3rd arg — some setups hydrate form state from URL.
// Plain Vite SPA often skip; check Next/docs if used.
// React 18 had no built-in equivalent — new optional surface.
// Trap: pass permalink without framework support — nothing happens.
// -----------------------------------------------------------------------------
const permalinkNote =
  "3rd arg optional — framework-dependent shareable form state; often omitted in SPA.";

// -----------------------------------------------------------------------------
// Q10: Action throw — error handling
//
// Task:
// throw new Error('...') vs return { error: '...' } — team convention.
//
// In simple words:
// throw → error boundary / unhandled depending on setup.
// return error object → show state.error in UI (preferred for forms).
// React 18: try/catch in onSubmit; same choice.
// useActionState: return pattern more predictable form UX.
// -----------------------------------------------------------------------------
async function throwOrReturn(prev, formData) {
  const fail = formData.get("fail") === "on";
  if (fail) return { ...prev, error: "Validation failed", ok: false };
  return { ...prev, error: null, ok: true };
}

export function ThrowOrReturnForm() {
  const [state, formAction, isPending] = useActionState(throwOrReturn, {
    error: null,
    ok: false,
  });
  return (
    <form action={formAction}>
      <label>
        <input type="checkbox" name="fail" /> Force fail
      </label>
      <button disabled={isPending}>Submit</button>
      {state.error && <p role="alert">{state.error}</p>}
    </form>
  );
}

// -----------------------------------------------------------------------------
// Q11: [MID] Optimistic + useActionState combo (file 32 link)
//
// Task:
// addOptimistic inside action; real state updated from action return.
//
// In simple words:
// useActionState = source of truth after settle.
// useOptimistic = instant overlay during pending.
// React 18: manual temp state + rollback on error.
// Order: optimistic call → await API → return new state OR keep prev on fail.
// -----------------------------------------------------------------------------
export function OptimisticActionStateIdea() {
  return (
    <p>
      Pattern: useOptimistic(state from useActionState) + action calls addOptimistic
      before await — see file 32 for full example.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q12: Multiple useActionState on one page
//
// Task:
// Separate forms / separate hooks — one hook binds one action function.
//
// In simple words:
// Two forms = two useActionState calls — do not mix state.
// React 18: separate useState blocks same idea.
// Trap: one formAction on two forms — both wrongly share same state machine.
// -----------------------------------------------------------------------------
async function profileAction(prev, formData) {
  return { name: formData.get("name") };
}
async function settingsAction(prev, formData) {
  return { theme: formData.get("theme") };
}

export function TwoFormsTwoHooks() {
  const [profile, profileActionFn] = useActionState(profileAction, { name: "" });
  const [settings, settingsActionFn] = useActionState(settingsAction, {
    theme: "light",
  });
  return (
    <div>
      <form action={profileActionFn}>
        <input name="name" />
        <button>Save profile</button>
        <p>{profile.name}</p>
      </form>
      <form action={settingsActionFn}>
        <select name="theme" defaultValue="light">
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
        <button>Save settings</button>
        <p>{settings.theme}</p>
      </form>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q13: [MID] Server Action as useActionState action (file 38)
//
// Task:
// action param = imported 'use server' function — pending on client, mutate on server.
//
// In simple words:
// Client component: useActionState(serverLogin, initial).
// React 18: onSubmit + fetch API route manually.
// Security: server function validates — prev state safe to assume on client.
// Migration: API route handler body → server action + same useActionState hook.
// -----------------------------------------------------------------------------
const serverActionCombo =
  "useActionState(serverFn, initial) — client pending UI, server mutation.";

// -----------------------------------------------------------------------------
// Q14: isPending vs form submitting — double guard
//
// Task:
// isPending + useFormStatus.pending — redundant on same form but OK.
//
// In simple words:
// isPending: for this hook's action.
// useFormStatus: nearest form submission (child).
// Same form usually same timing — pick one for simplicity.
// React 18: single loading boolean enough.
// -----------------------------------------------------------------------------
export function PendingBothSources() {
  const [state, formAction, isPending] = useActionState(slowSave, { last: null });
  return (
    <form action={formAction}>
      <input name="title" />
      <button disabled={isPending}>
        {isPending ? "Saving..." : "Save"}
      </button>
    </form>
  );
}

// -----------------------------------------------------------------------------
// Q15: [MID] Stale prev in rapid double submit
//
// Task:
// Two quick submits — action (prev) generally queued sequentially by React.
//
// In simple words:
// Functional prev in action reliable for increment-style updates.
// Network race separate — last response wins if you do not merge manually.
// React 18 useState functional updates same lesson.
// Guard: disabled={isPending} best first fix.
// Edge: parallel actions different hooks — independent state machines.
// -----------------------------------------------------------------------------
async function safeIncrement(prev) {
  await new Promise((r) => setTimeout(r, 200));
  return prev + 1;
}

export function SafeIncrementForm() {
  const [n, formAction, isPending] = useActionState(safeIncrement, 0);
  return (
    <form action={formAction}>
      <p>{n}</p>
      <button disabled={isPending}>+1</button>
    </form>
  );
}

// -----------------------------------------------------------------------------
// Q16: useActionState initial state type — object immutability
//
// Task:
// return { ...prev, field } — do not mutate prev.
//
// In simple words:
// prev.push(x); return prev ❌ — same reference, React may skip.
// return [...prev, x] ✅ arrays; spread objects ✅.
// React 18 useState same immutability rules.
// Common bug: prev.items.push(newItem) without new array reference.
// -----------------------------------------------------------------------------
async function immutableAppend(prev, formData) {
  const item = String(formData.get("item") || "");
  if (!item) return prev;
  return { ...prev, items: [...prev.items, item] };
}

export function ImmutableListForm() {
  const [state, formAction] = useActionState(immutableAppend, { items: [] });
  return (
    <form action={formAction}>
      <input name="item" />
      <button>Add</button>
      <ul>
        {state.items.map((x, i) => (
          <li key={i}>{x}</li>
        ))}
      </ul>
    </form>
  );
}

// -----------------------------------------------------------------------------
// Q17: [MID] useFormState → useActionState rename migration
//
// Task:
// Old blogs say useFormState — React 19 renamed to useActionState.
//
// In simple words:
// Same API shape [state, action, isPending] — only name changed.
// Codemods / search-replace during upgrade.
// Interview trap: say "useFormState" → correct to useActionState in 19.
// React 18 canary had experimental name — production 19 stable name.
// -----------------------------------------------------------------------------
const renameNote = "useFormState (old/canary) → useActionState (React 19 stable).";

// -----------------------------------------------------------------------------
// Q18: Action without FormData — button-only forms
//
// Task:
// Empty form or button only — formData empty; work from prev state.
//
// In simple words:
// incrementAction(prev, formData) — ignoring formData OK.
// React 18 onClick increment separate; form action works too.
// Hidden fields optional when server needs context.
// -----------------------------------------------------------------------------
async function tick(prev) {
  return prev + 1;
}

export function TickForm() {
  const [n, formAction, isPending] = useActionState(tick, 0);
  return (
    <form action={formAction}>
      <span>{n}</span>
      <button disabled={isPending}>Tick</button>
    </form>
  );
}

// -----------------------------------------------------------------------------
// Q19: [ADV] Custom wrapper hook pattern
//
// Task:
// useLoginForm() internally useActionState(loginAction, initial) — encapsulate.
//
// In simple words:
// Clean team API: const { state, formAction, isPending } = useLoginForm().
// React 18: useSubmitLogin custom hook with useState same idea.
// Rules: custom hook name use*; action function outside or module level.
// Test: action pure-ish (prev, fd) => next easy to unit test.
// -----------------------------------------------------------------------------
function useLoginForm() {
  async function login(prev, formData) {
    const email = String(formData.get("email") || "");
    if (!email.includes("@")) return { ...prev, error: "Bad email" };
    return { error: null, ok: true };
  }
  return useActionState(login, { error: null, ok: false });
}

export function LoginWrapperForm() {
  const [state, formAction, isPending] = useLoginForm();
  return (
    <form action={formAction}>
      <input name="email" type="email" />
      <button disabled={isPending}>Login</button>
      {state.error && <p>{state.error}</p>}
    </form>
  );
}

// -----------------------------------------------------------------------------
// Q20: [MID] When NOT useActionState
//
// Task:
// Non-form async (websocket), global store, TanStack Query — different tools.
//
// In simple words:
// Form submit centric flows = sweet spot.
// Real-time chat messages — Query/mutation better.
// React 18 useReducer + onSubmit still fine for complex wizards.
// Multi-step wizard with local-only steps — useState until final submit.
// -----------------------------------------------------------------------------
const whenNotUseActionState = [
  "non-form async workflows",
  "server cache via TanStack Query",
  "global Redux/Zustand mutations",
  "complex wizard mostly client-side",
];

// -----------------------------------------------------------------------------
// Q21: [ADV] Testing action function in isolation
//
// Task:
// await myAction(prev, fakeFormData) — without component render.
//
// In simple words:
// FormData in test: new FormData(); fd.append('x','1').
// Assert return value === expected next state.
// React 18: extract onSubmit handler similarly testable.
// Integration: RTL fireEvent submit with form — E2E optional.
// -----------------------------------------------------------------------------
async function testableAction(prev, formData) {
  const n = Number(formData.get("n") || 0);
  return prev + n;
}

export const testableActionExport = testableAction; // for unit tests

// -----------------------------------------------------------------------------
// Q22: [ADV] Interview — useActionState one-liner + traps
//
// Task:
// "[state, formAction, isPending] — action(prev, FormData) => nextState"
//
// In simple words:
// Trap 1: mutate prev — breaks immutability.
// Trap 2: useFormState name outdated.
// Trap 3: ignore isPending → double submit.
// Trap 4: return undefined — state becomes undefined; always return prev or next.
// React 18 contrast: manual loading/error states around onSubmit.
// -----------------------------------------------------------------------------
const useActionStateTraps = [
  "mutating prev",
  "wrong hook name useFormState in 19",
  "ignoring isPending",
  "returning undefined accidentally",
];
