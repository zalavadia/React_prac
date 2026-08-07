// ============================================================================
// 30 — React 19 useActionState
// Level: REACT19  |  Sequence seekho: pehle yeh file, phir agla number
// ============================================================================
//
// LAYMAN: Form submit ke baad UI ko batana padta hai:
// "kya result aaya?", "pehle kya tha?", "abhi pending hai kya?"
//
// useActionState = yeh teen cheezein ek hook me.
// Pehle naam experimental me useFormState tha; React 19 me useActionState.
//
// Socho counter machine: purana number yaad (previous state),
// button dabao (action), naya number dikhao, process hone tak pending.
//
// Signature (concept):
//   const [state, formAction, isPending] = useActionState(action, initialState, permalink?)
//   action(previousState, formData) → nextState
//
// KYUN: React 19 forms ka #1 hook interview me.
// INTERVIEW: previous state kyun milta; isPending; error object return pattern.
//
// ============================================================================

import { useActionState } from "react";

// -----------------------------------------------------------------------------
// Q1: Basic counter with previous state
//
// Seedha matlab:
// action ka pehla arg = abhi tak ka state.
// Dusra = FormData (form fields).
// Return = naya state jo UI me bind hoga.
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
// Seedha matlab:
// State sirf number nahi — object { error, message } return karo.
// UI us object se alert dikhaye. prev use karke purana message rakho/clear.
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
// Seedha matlab:
// isPending true jab tak action Promise settle na ho.
// Double-submit rokne ka built-in signal — alag useState('loading') kam.
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
// Q4: [MID] Previous state kyun important?
//
// Seedha matlab:
// Kabhi naya state purane pe depend karta (increment, append list).
// Kabhi error pe purana good data preserve.
// Action pure function socho: (prev, formData) => next
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
// Q5: formAction button pe bhi (same hook)
//
// Seedha matlab:
// useActionState se mila formAction — form action= YA button formAction=
// Dono jagah same pending/state pipeline.
// -----------------------------------------------------------------------------
async function like(prev) {
  return { ...prev, likes: prev.likes + 1 };
}
async function unlike(prev) {
  return { ...prev, likes: Math.max(0, prev.likes - 1) };
}

export function LikeUnlike() {
  const [state, formAction, isPending] = useActionState(like, { likes: 0 });
  // Note: unlike alag useActionState mangta for separate action fn —
  // teaching: ek formAction primarily binds to the hook's action.
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
// Seedha matlab:
// Practical pattern: formData.get('intent') === 'delete' | 'save'
// Ek useActionState, multiple buttons with name="intent" value=...
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
// Seedha matlab:
// useState: tum pending/error/data khud sync karte.
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
// Seedha matlab:
// initialState sirf pehli render pe seed.
// "Form reset" = action se empty object return, ya component key remount.
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
// Kya karna hai:
// useActionState(action, initial, permalink?) — shareable URL state idea (frameworks).
//
// Seedha matlab:
// Optional 3rd arg — some setups me form state URL se hydrate ho sakta.
// Plain Vite SPA me often skip; Next/docs me dekho agar use ho.
// React 18 me aisa built-in nahi tha — naya optional surface.
// Trap: permalink pass karo bina framework support — kuch nahi hoga.
// -----------------------------------------------------------------------------
const permalinkNote =
  "3rd arg optional — framework-dependent shareable form state; often omitted in SPA.";

// -----------------------------------------------------------------------------
// Q10: Action me throw — error handling
//
// Kya karna hai:
// throw new Error('...') vs return { error: '...' } — team convention.
//
// Seedha matlab:
// throw → error boundary / unhandled depending on setup.
// return error object → UI me state.error dikhao (preferred forms me).
// React 18: try/catch in onSubmit; same choice.
// useActionState: return pattern zyada predictable form UX.
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
// Kya karna hai:
// Action ke andar addOptimistic; real state action return se update.
//
// Seedha matlab:
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
// Q12: Multiple useActionState ek page pe
//
// Kya karna hai:
// Alag forms / alag hooks — ek hook ek action function bind.
//
// Seedha matlab:
// Do forms = do useActionState calls — state mix mat karo.
// React 18: alag useState blocks same idea.
// Trap: ek formAction do forms pe — dono same state machine share karenge wrongly.
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
// Kya karna hai:
// action param = imported 'use server' function — pending client, mutate server.
//
// Seedha matlab:
// Client component: useActionState(serverLogin, initial).
// React 18: onSubmit + fetch API route manually.
// Security: server function validates — prev state client pe safe assume.
// Migration: API route handler body → server action + same useActionState hook.
// -----------------------------------------------------------------------------
const serverActionCombo =
  "useActionState(serverFn, initial) — client pending UI, server mutation.";

// -----------------------------------------------------------------------------
// Q14: isPending vs form submitting — double guard
//
// Kya karna hai:
// isPending + useFormStatus.pending — same form pe redundant but OK.
//
// Seedha matlab:
// isPending: is hook ke action ke liye.
// useFormStatus: nearest form submission (child).
// Same form pe usually same timing — pick one for simplicity.
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
// Kya karna hai:
// Do submit jaldi — action (prev) sequential React queue karta hai generally.
//
// Seedha matlab:
// Functional prev in action reliable for increment-style updates.
// Network race alag — last response wins agar tum manually merge na karo.
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
// Kya karna hai:
// return { ...prev, field } — prev mutate mat karo.
//
// Seedha matlab:
// prev.push(x); return prev ❌ — same reference, React skip kar sakta.
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
// Kya karna hai:
// Purane blogs useFormState likhte hain — React 19 me useActionState.
//
// Seedha matlab:
// Same API shape [state, action, isPending] — sirf naam change.
// Codemods / search-replace during upgrade.
// Interview trap: "useFormState" bol dein → correct to useActionState in 19.
// React 18 canary me experimental naam tha — production 19 stable name.
// -----------------------------------------------------------------------------
const renameNote = "useFormState (old/canary) → useActionState (React 19 stable).";

// -----------------------------------------------------------------------------
// Q18: Action without FormData — button-only forms
//
// Kya karna hai:
// Khali form ya sirf button — formData empty; prev state se kaam chalao.
//
// Seedha matlab:
// incrementAction(prev, formData) — formData ignore OK.
// React 18 onClick increment alag; form action se bhi ho sakta.
// Hidden fields optional jab server ko context chahiye.
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
// Kya karna hai:
// useLoginForm() internally useActionState(loginAction, initial) — encapsulate.
//
// Seedha matlab:
// Team API clean: const { state, formAction, isPending } = useLoginForm().
// React 18: useSubmitLogin custom hook with useState same idea.
// Rules: custom hook name use*; action function bahar ya module level.
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
// Kya karna hai:
// Non-form async (websocket), global store, TanStack Query — alag tools.
//
// Seedha matlab:
// Form submit centric flows = sweet spot.
// Real-time chat messages — Query/mutation better.
// React 18 useReducer + onSubmit ab bhi fine for complex wizards.
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
// Kya karna hai:
// await myAction(prev, fakeFormData) — component render without.
//
// Seedha matlab:
// FormData test me: new FormData(); fd.append('x','1').
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
// Kya karna hai:
// "[state, formAction, isPending] — action(prev, FormData) => nextState"
//
// Seedha matlab:
// Trap 1: action me prev mutate — immutability break.
// Trap 2: useFormState naam outdated.
// Trap 3: isPending ignore → double submit.
// Trap 4: return undefined — state become undefined; always return prev or next.
// React 18 contrast: manual loading/error states around onSubmit.
// -----------------------------------------------------------------------------
const useActionStateTraps = [
  "mutating prev",
  "wrong hook name useFormState in 19",
  "ignoring isPending",
  "returning undefined accidentally",
];
