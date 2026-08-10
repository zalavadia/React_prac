// ============================================================================
// 32 — React 19 useOptimistic
// Level: REACT19  |  Study in order: read this file first, then the next number
// ============================================================================
//
// SIMPLE: Optimistic UI = show success in the UI first, then let the API confirm later.
// Like a WhatsApp message appearing in the list before the double tick.
// If the API fails → rollback (old state).
//
// useOptimistic(state, updateFn) → [optimisticState, addOptimistic]
// Real state (useState / action state) is the source of truth.
// Optimistic = a temporary overlay until real state catches up.
//
// WHY: "How do you do optimistic updates?" is a classic mid interview question.
// INTERVIEW: when to rollback; combo with actions; race conditions.
//
// ============================================================================

import { useState, useOptimistic, useRef, useActionState } from "react";

// -----------------------------------------------------------------------------
// Q1: Like button — instant +1, then server
//
// In simple words:
// setOptimistic(likes + 1) instantly.
// await api — on success real setLikes; on fail UI shows real state again
// when optimistic settles (React syncs with real state).
// -----------------------------------------------------------------------------
async function fakeLikeApi(ok = true) {
  await new Promise((r) => setTimeout(r, 500));
  if (!ok) throw new Error("network");
}

export function LikeOptimistic() {
  const [likes, setLikes] = useState(0);
  const [optimisticLikes, setOptimisticLikes] = useOptimistic(
    likes,
    (current, next) => next
  );

  async function onLike() {
    setOptimisticLikes(likes + 1);
    try {
      await fakeLikeApi(true);
      setLikes((n) => n + 1);
    } catch {
      // real likes unchanged → UI rollback to `likes`
    }
  }

  return (
    <button onClick={onLike}>
      Likes: {optimisticLikes}
    </button>
  );
}

// -----------------------------------------------------------------------------
// Q2: [MID] Todo add — show in list first
//
// In simple words:
// updateFn (current, optimisticValue) => newOptimisticState
// Here optimisticValue = new todo object.
// -----------------------------------------------------------------------------
export function OptimisticTodos() {
  const [todos, setTodos] = useState([{ id: "1", title: "Learn React" }]);
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (current, newTodo) => [...current, newTodo]
  );

  async function addTodo(formData) {
    const title = String(formData.get("title") || "").trim();
    if (!title) return;
    const temp = { id: "temp-" + Date.now(), title, pending: true };
    addOptimisticTodo(temp);
    // await api.create
    const saved = { id: crypto.randomUUID(), title, pending: false };
    setTodos((list) => [...list, saved]);
  }

  return (
    <div>
      <form action={addTodo}>
        <input name="title" />
        <button type="submit">Add</button>
      </form>
      <ul>
        {optimisticTodos.map((t) => (
          <li key={t.id} style={{ opacity: t.pending ? 0.5 : 1 }}>
            {t.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q3: Rollback idea when API fails
//
// In simple words:
// Optimistic only wins until base state updates.
// On fail → do not setTodos; optimistic automatically returns to base
// (after action/transition completes).
// Show user an error toast separately — UX matters.
// -----------------------------------------------------------------------------
export function AddWithPossibleFail() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [optimistic, addOptimistic] = useOptimistic(items, (cur, item) => [
    ...cur,
    item,
  ]);

  async function onAdd(formData) {
    setError(null);
    const title = String(formData.get("title") || "");
    addOptimistic({ id: "tmp", title });
    try {
      await fakeLikeApi(false); // force fail for demo
      setItems((x) => [...x, { id: crypto.randomUUID(), title }]);
    } catch (e) {
      setError("Could not add — rolled back");
    }
  }

  return (
    <form action={onAdd}>
      <input name="title" />
      <button>Add</button>
      {error && <p>{error}</p>}
      <ul>
        {optimistic.map((i) => (
          <li key={i.id}>{i.title}</li>
        ))}
      </ul>
    </form>
  );
}

// -----------------------------------------------------------------------------
// Q4: [MID] useOptimistic + Actions / startTransition
//
// In simple words:
// Docs often expect optimistic updates inside Transition/Action.
// Calling addOptimistic in form action={fn} is a common pattern.
// Random setState timing outside can cause weird flashes.
// -----------------------------------------------------------------------------
export function OptimisticInsideAction() {
  const [name, setName] = useState("Ada");
  const [optimisticName, setOptimisticName] = useOptimistic(name);

  async function renameAction(formData) {
    const next = String(formData.get("name") || "");
    setOptimisticName(next);
    // await api.rename(next)
    setName(next);
  }

  return (
    <form action={renameAction}>
      <p>Hello, {optimisticName}</p>
      <input name="name" defaultValue={name} />
      <button type="submit">Rename</button>
    </form>
  );
}

// -----------------------------------------------------------------------------
// Q5: updateFn complex merge
//
// In simple words:
// Second arg can be anything — id, patch, reducer-style action.
// Keep updateFn pure: (current, msg) => nextOptimistic
// -----------------------------------------------------------------------------
export function OptimisticCart() {
  const [cart, setCart] = useState({ qty: 1 });
  const [optCart, send] = useOptimistic(cart, (current, delta) => ({
    qty: current.qty + delta,
  }));

  async function bump(delta) {
    send(delta);
    // await api
    setCart((c) => ({ qty: c.qty + delta }));
  }

  return (
    <div>
      <p>Qty: {optCart.qty}</p>
      <button onClick={() => bump(1)}>+1</button>
      <button onClick={() => bump(-1)}>-1</button>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q6: [MID] Race — double click fast
//
// In simple words:
// Two optimistic updates overlap → careful design (disable pending, queue, id).
// Mid answer: pending flag / useFormStatus / ignore stale responses.
// -----------------------------------------------------------------------------
export function GuardDoubleSubmit() {
  const [n, setN] = useState(0);
  const [opt, setOpt] = useOptimistic(n, (_c, v) => v);
  const inflight = useRef(false);

  async function inc() {
    if (inflight.current) return;
    inflight.current = true;
    setOpt(n + 1);
    try {
      await fakeLikeApi(true);
      setN((x) => x + 1);
    } finally {
      inflight.current = false;
    }
  }

  return <button onClick={inc}>{opt}</button>;
}

// -----------------------------------------------------------------------------
// Q7: When NOT to use optimistic?
//
// In simple words:
// Payment, irreversible delete, stock "last item" — server confirm first is better.
// Optimistic = low-risk, reversible, social-ish actions.
// -----------------------------------------------------------------------------
const whenNot = ["payments", "permissions changes", "inventory-critical buys"];

// -----------------------------------------------------------------------------
// Q8: Interview one-liner
//
// In simple words:
// "useOptimistic shows temporary UI until real state updates;
// on fail rollback to base state; works best with Actions."
// -----------------------------------------------------------------------------
const interviewLine =
  "Optimistic = instant UI; server confirms; failure rolls back to source state.";

// -----------------------------------------------------------------------------
// Q9: useOptimistic with useActionState — full pattern sketch
//
// Task:
// const [state, action, pending] = useActionState(...); const [opt, addOpt] = useOptimistic(state, fn).
//
// In simple words:
// Real state = useActionState return after action completes.
// Optimistic overlay during pending transition.
// React 18: temp useState + revert on catch manually.
// Action start: addOptimistic(next); await; return final state updates base.
// -----------------------------------------------------------------------------
async function renameServer(prev, formData) {
  await new Promise((r) => setTimeout(r, 400));
  const next = String(formData.get("name") || prev);
  return next;
}

export function OptimisticWithActionState() {
  const [name, formAction, isPending] = useActionState(renameServer, "Ada");
  const [optimisticName, setOptimisticName] = useOptimistic(name);

  async function optimisticRename(formData) {
    const next = String(formData.get("name") || name);
    setOptimisticName(next);
    // formAction dispatches to useActionState pipeline
    return formAction(formData);
  }

  return (
    <form action={optimisticRename}>
      <p>Hello, {optimisticName}</p>
      <input name="name" defaultValue={name} />
      <button disabled={isPending}>Rename</button>
    </form>
  );
}

// -----------------------------------------------------------------------------
// Q10: [MID] updateFn signature — (currentState, optimisticValue)
//
// Task:
// Second argument can be anything you pass — id, delta, whole object.
//
// In simple words:
// updateFn is a pure function — no side effects.
// React 18 manual: setItems([...items, temp]) same logic inline.
// Complex: (cur, { type, payload }) => reducer style merge.
// Trap: mutate current inside updateFn — breaks React assumptions.
// -----------------------------------------------------------------------------
export function OptimisticReducerStyle() {
  const [count, setCount] = useState(0);
  const [opt, dispatch] = useOptimistic(count, (cur, action) => {
    if (action.type === "inc") return cur + 1;
    if (action.type === "dec") return cur - 1;
    return cur;
  });

  async function inc() {
    dispatch({ type: "inc" });
    await fakeLikeApi(true);
    setCount((c) => c + 1);
  }

  return (
    <button onClick={inc}>
      {opt}
    </button>
  );
}

// -----------------------------------------------------------------------------
// Q11: Pending flag on optimistic items UI
//
// Task:
// Temp item { pending: true } — show with opacity/style.
//
// In simple words:
// User knows it is optimistic — honest UX.
// React 18: same visual pattern with temp ids.
// After server confirm replace with pending: false and real id.
// Edge: duplicate temp ids — use unique temp keys.
// -----------------------------------------------------------------------------
export function PendingVisualTodos() {
  const [todos, setTodos] = useState([]);
  const [optTodos, addOpt] = useOptimistic(todos, (cur, t) => [...cur, t]);

  async function add(formData) {
    const title = String(formData.get("title") || "");
    const temp = { id: "tmp-" + Date.now(), title, pending: true };
    addOpt(temp);
    await fakeLikeApi(true);
    setTodos((list) => [...list, { id: crypto.randomUUID(), title, pending: false }]);
  }

  return (
    <form action={add}>
      <input name="title" />
      <button>Add</button>
      <ul>
        {optTodos.map((t) => (
          <li key={t.id} style={{ opacity: t.pending ? 0.6 : 1 }}>
            {t.title} {t.pending ? "(saving)" : ""}
          </li>
        ))}
      </ul>
    </form>
  );
}

// -----------------------------------------------------------------------------
// Q12: [MID] React 18 manual optimistic — contrast code idea
//
// Task:
// const [display, setDisplay]=useState(real); onClick: setDisplay(opt); fetch; catch revert.
//
// In simple words:
// Manual revert: setDisplay(realSnapshot) on fail.
// useOptimistic: base state unchanged on fail → auto rollback to base.
// Less bug-prone — no forgotten revert branch.
// Migration: replace temp display state with useOptimistic(realState).
// -----------------------------------------------------------------------------
const react18ManualOptimistic =
  "temp useState + try/catch revert → 19 useOptimistic(baseState) auto-syncs on failure.";

// -----------------------------------------------------------------------------
// Q13: startTransition + useOptimistic
//
// Task:
// Docs recommend optimistic updates inside transition/action context.
//
// In simple words:
// Form action={fn} is already transition-like for updates.
// Random setState outside → UI flash / tearing possible in edge cases.
// React 18 startTransition + manual optimistic same pairing advice.
// useTransition isPending is different from useOptimistic — both can combine.
// -----------------------------------------------------------------------------
export function TransitionOptimisticNote() {
  return (
    <p>
      Call addOptimistic inside form action or startTransition callback — keeps updates
      concurrent-friendly.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q14: [MID] Stale closure in onLike — trap
//
// Task:
// setOptimisticLikes(likes + 1) — likes can be stale on rapid clicks.
//
// In simple words:
// Functional base update better: not setOptimisticLikes(c => c + 1) pattern — useOptimistic send current+delta.
// Guard with inflight ref (Q6) or disable while pending.
// React 18 same stale closure in async handlers.
// Fix: useOptimistic updateFn (current, delta) => current + delta.
// -----------------------------------------------------------------------------
export function StaleClosureLikeFix() {
  const [likes, setLikes] = useState(0);
  const [optLikes, addLike] = useOptimistic(likes, (current, delta) => current + delta);

  async function onLike() {
    addLike(1);
    await fakeLikeApi(true);
    setLikes((n) => n + 1);
  }

  return <button onClick={onLike}>Likes: {optLikes}</button>;
}

// -----------------------------------------------------------------------------
// Q15: Delete optimistic — remove from list before server
//
// Task:
// addOptimistic filter out id; on fail item returns from base list.
//
// In simple words:
// updateFn: (cur, id) => cur.filter(x => x.id !== id)
// On fail → do not update base → optimistic reverts showing item again + error toast.
// React 18: optimistic filter + restore array on catch.
// When NOT: irreversible delete UX — wait for server confirm.
// -----------------------------------------------------------------------------
export function OptimisticDelete() {
  const [items, setItems] = useState([
    { id: "1", title: "A" },
    { id: "2", title: "B" },
  ]);
  const [optItems, markDeleted] = useOptimistic(items, (cur, id) =>
    cur.filter((x) => x.id !== id)
  );

  async function remove(id) {
    markDeleted(id);
    try {
      await fakeLikeApi(true);
      setItems((list) => list.filter((x) => x.id !== id));
    } catch {
      // rollback automatic
    }
  }

  return (
    <ul>
      {optItems.map((i) => (
        <li key={i.id}>
          {i.title}{" "}
          <button type="button" onClick={() => remove(i.id)}>
            Del
          </button>
        </li>
      ))}
    </ul>
  );
}

// -----------------------------------------------------------------------------
// Q16: [MID] useOptimistic without second arg
//
// Task:
// useOptimistic(state) — setOptimistic(next) directly sets optimistic value.
//
// In simple words:
// Shorthand when passing whole next state (rename string).
// File Q4 OptimisticInsideAction example.
// React 18: setTempState(next) equivalent.
// updateFn form is more flexible for lists/carts.
// -----------------------------------------------------------------------------
export function ShorthandOptimistic() {
  const [label, setLabel] = useState("Draft");
  const [optLabel, setOptLabel] = useOptimistic(label);

  async function save(formData) {
    const next = String(formData.get("label") || "");
    setOptLabel(next);
    await fakeLikeApi(true);
    setLabel(next);
  }

  return (
    <form action={save}>
      <p>{optLabel}</p>
      <input name="label" defaultValue={label} />
      <button>Save</button>
    </form>
  );
}

// -----------------------------------------------------------------------------
// Q17: Multiple optimistic fields — one base state object
//
// Task:
// Base { name, qty }; optimistic overlay whole object or field patches.
//
// In simple words:
// updateFn merge patches: (cur, patch) => ({ ...cur, ...patch })
// React 18: clone object manually for temp view.
// Keep base updates atomic on server success.
// Edge: partial fail — which fields rollback? design per field or whole object.
// -----------------------------------------------------------------------------
export function OptimisticObjectPatch() {
  const [cart, setCart] = useState({ name: "Bag", qty: 1 });
  const [optCart, patch] = useOptimistic(cart, (cur, p) => ({ ...cur, ...p }));

  async function rename(formData) {
    const name = String(formData.get("name") || "");
    patch({ name });
    await fakeLikeApi(true);
    setCart((c) => ({ ...c, name }));
  }

  return (
    <form action={rename}>
      <p>
        {optCart.name} × {optCart.qty}
      </p>
      <input name="name" defaultValue={cart.name} />
      <button>Rename</button>
    </form>
  );
}

// -----------------------------------------------------------------------------
// Q18: [ADV] Race — out-of-order server responses
//
// Task:
// Request A slow, B fast — B then A arrive → stale overwrite risk on base state.
//
// In simple words:
// Optimistic rollback to base — use request id / abort controller in base update.
// React 18: ignore stale responses with counter ref.
// useOptimistic doesn't replace response ordering guards on setState.
// Pattern: if (reqId !== latestRef.current) return prev;
// -----------------------------------------------------------------------------
export function RaceGuardNote() {
  return (
    <p>
      useOptimistic handles failed optimistic overlay; still guard setState/base updates
      against out-of-order network responses with ids or AbortController.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q19: [MID] When NOT useOptimistic — expand
//
// Task:
// Financial confirm, legal consent, medical doses — server truth first.
//
// In simple words:
// Low-risk social UI = good fit (likes, comments, todo add).
// High-risk = spinner until server OK — user trust matters.
// React 18 same guidance — optimistic is product decision.
// Misleading success is worse than a short wait.
// -----------------------------------------------------------------------------
const whenNotOptimisticExpanded = [
  "payments & money",
  "irreversible deletes without undo",
  "inventory last-item purchase",
  "compliance/audit trails",
  "medical or safety critical",
];

// -----------------------------------------------------------------------------
// Q20: Server Action + useOptimistic (file 38 link)
//
// Task:
// Client form action server fn — optimistic on client, mutation on server.
//
// In simple words:
// addOptimistic before await serverAction(formData).
// Server fail return → base unchanged → rollback + show error.
// React 18: optimistic client + fetch API route same architecture.
// RSC: optimistic always client-side hook — 'use client' required.
// -----------------------------------------------------------------------------
const serverOptimistic =
  "Optimistic UI runs in client components; server action confirms mutation.";

// -----------------------------------------------------------------------------
// Q21: [ADV] Testing optimistic flows
//
// Task:
// Mock slow API; assert UI shows optimistic then final; mock fail assert rollback.
//
// In simple words:
// RTL: click → expect temp text → resolve promise → expect final.
// Fail path: reject promise → expect original list count.
// React 18 tests same structure — hook reduces manual revert code to test.
// Flaky tests if timing — use fake timers or controllable promises.
// -----------------------------------------------------------------------------
export function TestingOptimisticNote() {
  return <p>Test success and failure paths — optimistic should match base after fail.</p>;
}

// -----------------------------------------------------------------------------
// Q22: [ADV] Interview answer template
//
// Task:
// Define optimistic UI → useOptimistic(base, updateFn) → rollback on unchanged base.
//
// In simple words:
// vs React 18: manual temp state + revert.
// vs useActionState: action state is truth; optimistic is overlay.
// Traps: high-risk flows; stale races on base; forget error toast on rollback.
// Pair with Actions/transitions; disable double submit.
// -----------------------------------------------------------------------------
export const optimisticInterviewTemplate = {
  definition: "show success before server confirms; rollback if base unchanged",
  api: "useOptimistic(baseState, updateFn) → [optimistic, addOptimistic]",
  react18: "manual temp state + try/catch revert",
  traps: ["high-risk domains", "out-of-order responses", "missing error UX on rollback"],
};
