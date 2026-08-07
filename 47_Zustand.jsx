// ============================================================================
// 47 — Zustand (State Management)
// Level: MID  |  Sequence: pehle 11 (context), 12 (reducer), phir yeh
// ============================================================================
//
// LAYMAN: Zustand = chhota global store. create() se banana; component me
// useStore(selector) se slice subscribe. Redux se kam boilerplate; Context se
// better perf jab fine-grained selectors ho. Client-only — React 19 me bhi.
//
// KYUN: Cart, UI prefs, auth snapshot — prop drilling / giant context avoid.
// INTERVIEW: selector stale traps; store component ke andar mat banao;
// vs Redux vs Context; persist + SSR hydrate caution.
// Vite/React 19 project me use — teaching file (npm i zustand).
//
// ============================================================================

import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { shallow } from "zustand/shallow";

// -----------------------------------------------------------------------------
// Q1: create store — minimal counter
//
// Kya karna hai:
// create((set) => ({ count, inc })) pattern.
//
// Seedha matlab:
// Store = hook + vanilla API. set(partial) ya set(fn) immer-style merge nahi —
// shallow merge top-level keys. get() current state read actions me.
// Component: const count = useCounterStore(s => s.count).
// -----------------------------------------------------------------------------
export const useCounterStore = create((set) => ({
  count: 0,
  inc: () => set((s) => ({ count: s.count + 1 })),
  dec: () => set((s) => ({ count: s.count - 1 })),
}));

export function CounterView() {
  const count = useCounterStore((s) => s.count);
  const inc = useCounterStore((s) => s.inc);
  return (
    <button onClick={inc}>{count}</button>
  );
}

// -----------------------------------------------------------------------------
// Q2: useStore selectors — sirf jo chahiye subscribe
//
// Kya karna hai:
// (s) => s.user.name — name change pe hi render (roughly).
//
// Seedha matlab:
// Poora store useStore() bina selector = har change pe re-render.
// Selector return value Object.is se compare — primitive best.
// Derived: (s) => s.items.length — length change pe render.
// Multiple fields: shallow compare (Q14) ya alag hooks.
// -----------------------------------------------------------------------------
export const useCartStore = create((set) => ({
  items: [],
  add: (item) => set((s) => ({ items: [...s.items, item] })),
  total: () => 0, // bad as selector — function new each time; use getter Q17
}));

export function CartBadge() {
  const itemCount = useCartStore((s) => s.items.length);
  return <span>{itemCount} items</span>;
}

// -----------------------------------------------------------------------------
// Q3: Avoid stale whole-store subscribe
//
// Kya karna hai:
// const store = useStore() anti-pattern — har update pe render.
//
// Seedha matlab:
// ❌ const { a, b } = useMyStore() — default selector = identity = full state.
// ✅ const a = useMyStore(s => s.a).
// Debug: React DevTools + console.log render count.
// Split components: CountDisplay vs Buttons alag selectors.
// -----------------------------------------------------------------------------
export function BadWholeStore() {
  // ❌ re-renders on ANY key change
  const state = useCartStore();
  return <span>{state.items.length}</span>;
}

export function GoodSelector() {
  const len = useCartStore((s) => s.items.length);
  return <span>{len}</span>;
}

// -----------------------------------------------------------------------------
// Q4: set / get inside actions
//
// Kya karna hai:
// create((set, get) => ({ ... })) — get() se current state read.
//
// Seedha matlab:
// set({ partial }) merges shallow. set(fn) fn receives previous state.
// get().count — action me latest without closure stale (usually).
// replace: true rare — poora state replace (persist rehydrate).
// Outside React: useCounterStore.getState().inc().
// -----------------------------------------------------------------------------
export const useTodoStore = create((set, get) => ({
  todos: [],
  addTodo: (text) =>
    set({ todos: [...get().todos, { id: crypto.randomUUID(), text, done: false }] }),
  toggle: (id) =>
    set({
      todos: get().todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    }),
  clearDone: () => set({ todos: get().todos.filter((t) => !t.done) }),
}));

// -----------------------------------------------------------------------------
// Q5: Async actions in store
//
// Kya karna hai:
// fetch inside action; loading/error state store me.
//
// Seedha matlab:
// async loadUsers() { set({ loading: true }); try { ... set({ users }) } finally { set({ loading: false }) } }.
// Component sirf selectors — no useEffect fetch duplicate.
// Race: request id / abortController store me cancel previous.
// Don't forget error branch — set({ error: message }).
// -----------------------------------------------------------------------------
export const useUsersStore = create((set) => ({
  users: [],
  loading: false,
  error: null,
  loadUsers: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch("/api/users");
      if (!res.ok) throw new Error("Failed");
      const users = await res.json();
      set({ users, loading: false });
    } catch (e) {
      set({ error: e.message, loading: false });
    }
  },
}));

export function UserList() {
  const users = useUsersStore((s) => s.users);
  const loading = useUsersStore((s) => s.loading);
  const load = useUsersStore((s) => s.loadUsers);
  // useEffect(() => { load(); }, [load]); — stable action ref usually OK
  if (loading) return <p>Loading…</p>;
  return (
    <ul>
      {users.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
      <button onClick={load}>Reload</button>
    </ul>
  );
}

// -----------------------------------------------------------------------------
// Q6: Immer middleware — optional sketch
//
// Kya karna hai:
// Nested mutate-style updates without spread hell.
//
// Seedha matlab:
// npm i immer. create(immer((set) => ({ ... }))).
// set(state => { state.user.name = 'x' }) — immer draft mutate.
// Teaching file: comment-only full import:
// import { immer } from 'zustand/middleware/immer'
// create(immer((set) => ({ nested: { x: 1 }, bump: () => set(s => { s.nested.x++ }) })))
// Optional — small flat state me spread kaafi.
// -----------------------------------------------------------------------------
const immerSketch =
  "create(immer(set => ({ ... }))) allows draft mutations; good for deep nested state.";

// -----------------------------------------------------------------------------
// Q7: persist middleware — localStorage survive refresh
//
// Kya karna hai:
// Theme/cart persist; partialize sensitive fields out.
//
// Seedha matlab:
// import { persist } from 'zustand/middleware'
// create(persist((set)=>({ theme, setTheme }), { name: 'ui-storage', partialize: s => ({ theme: s.theme }) }))
// onRehydrateStorage callback — SSR mismatch handle (Q21).
// version + migrate for schema changes.
// -----------------------------------------------------------------------------
export const useUiStore = create(
  // persist wrapper — uncomment when zustand/middleware available:
  // persist(
  (set) => ({
    sidebarOpen: true,
    toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  })
  // , { name: "ui-persist" })
);

// Full persist example (comment reference):
// export const useThemeStore = create(persist(
//   (set) => ({ theme: 'light', setTheme: (t) => set({ theme: t }) }),
//   { name: 'theme-v1' }
// ));

// -----------------------------------------------------------------------------
// Q8: Combine slices pattern — scale big stores
//
// Kya karna hai:
// createBearSlice + createFishSlice → create(persist(...combine)).
//
// Seedha matlab:
// const createBearSlice = (set, get) => ({ bears: 0, eatFish: () => ... })
// export const useBoundStore = create((...a) => ({ ...createBearSlice(...a), ...createFishSlice(...a) }))
// Slices team-wise split. TypeScript: SliceBear & SliceFish intersection.
// -----------------------------------------------------------------------------
const createBearSlice = (set, get) => ({
  bears: 0,
  addBear: () => set({ bears: get().bears + 1 }),
});

const createFishSlice = (set, get) => ({
  fishes: 0,
  addFish: () => set({ fishes: get().fishes + 1 }),
});

export const useBoundStore = create((set, get, api) => ({
  ...createBearSlice(set, get, api),
  ...createFishSlice(set, get, api),
}));

// -----------------------------------------------------------------------------
// Q9: TypeScript / JSDoc typing sketch
//
// Kya karna hai:
// JSX file me types comments se document karo.
//
// Seedha matlab:
// TS: type Store = { count: number; inc: () => void }
// create<Store>()((set) => ({ ... }))
// JSDoc: @typedef {{ count: number, inc: function(): void }} CounterStore
// Selector typed: useStore(s: CounterStore => s.count)
// -----------------------------------------------------------------------------
/**
 * @typedef {{ id: string, text: string, done: boolean }} Todo
 * @typedef {{ todos: Todo[], addTodo: function(string): void }} TodoStore
 */

// -----------------------------------------------------------------------------
// Q10: Zustand vs Context + useReducer
//
// Kya karna hai:
// Kab context enough; kab Zustand.
//
// Seedha matlab:
// Context: theme, locale, rare updates — simple, built-in.
// Context pain: frequent updates + many consumers = wide re-renders.
// useReducer + context = Zustand jaisa dispatch pattern but same perf issue.
// Zustand: fine selectors, less Provider nesting, devtools/persist ecosystem.
// Small app / low churn → context OK. Growing client state → Zustand.
// -----------------------------------------------------------------------------
const vsContext =
  "Context broadcasts value changes to all consumers; Zustand selectors limit subscriptions.";

// -----------------------------------------------------------------------------
// Q11: Zustand vs Redux
//
// Kya karna hai:
// Interview compare — not always Redux better.
//
// Seedha matlab:
// Redux: strict flux, middleware ecosystem, large teams, RTK Query, time-travel.
// Zustand: minimal API, less boilerplate, mutable-friendly actions, quick start.
// Both client global state. Redux Toolkit ne gap kam kiya.
// Enterprise existing Redux → stay. Greenfield mid SPA → Zustand popular.
// Server state (React Query) alag — dono ke saath pair karo.
// -----------------------------------------------------------------------------
const vsRedux =
  "Redux = conventions + devtools depth at scale; Zustand = speed/simplicity for moderate global client state.";

// -----------------------------------------------------------------------------
// Q12: When NOT to use Zustand
//
// Kya karna hai:
// Over-engineering avoid — decision list.
//
// Seedha matlab:
// ✗ Local UI state (modal open) — useState.
// ✗ Server cache — TanStack Query / SWR.
// ✗ Form fields — RHF local (file 46).
// ✗ Rarely read config — context/props.
// ✗ You need complex event sourcing audit — Redux maybe.
// Global ≠ always store — colocate first (file 24).
// -----------------------------------------------------------------------------
export const whenNotZustand = [
  "component-local UI",
  "server fetched data cache",
  "form field state",
  "one-time prop drilling 2 levels",
];

// -----------------------------------------------------------------------------
// Q13: subscribeWithSelector — vanilla subscribe fine-grained
//
// Kya karna hai:
// React ke bahar listener jab specific key change.
//
// Seedha matlab:
// create(subscribeWithSelector((set)=>({ ... }))).
// useStore.subscribe(s => s.count, (count, prev) => { analytics(count) }).
// Non-React widgets, router guards, logging. Unsubscribe return fn call.
// -----------------------------------------------------------------------------
export const useMetricsStore = create(
  subscribeWithSelector((set) => ({
    pageViews: 0,
    bump: () => set((s) => ({ pageViews: s.pageViews + 1 })),
  }))
);

// vanilla usage sketch:
// useMetricsStore.subscribe((s) => s.pageViews, (pv) => console.log('pv', pv));

// -----------------------------------------------------------------------------
// Q14: shallow compare — multiple fields one selector
//
// Kya karna hai:
// useStore(s => ({ a: s.a, b: s.b }), shallow) — dono same ho to skip render.
//
// Seedha matlab:
// Object return bina shallow = new object every call = always re-render.
// import { shallow } from 'zustand/shallow'.
// Alternative: useShallow hook (zustand v4.4+) same idea.
// Prefer separate selectors jab ho sake — simpler mental model.
// -----------------------------------------------------------------------------
export const useSettingsStore = create((set) => ({
  fontSize: 14,
  theme: "light",
  setFontSize: (n) => set({ fontSize: n }),
  setTheme: (t) => set({ theme: t }),
}));

export function SettingsPreview() {
  const { fontSize, theme } = useSettingsStore(
    (s) => ({ fontSize: s.fontSize, theme: s.theme }),
    shallow
  );
  return (
    <p style={{ fontSize }}>
      {theme} mode
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q15: Reset store — tests / logout clear all
//
// Kya karna hai:
// Initial state snapshot; reset() action ya getState/setState trick.
//
// Seedha matlab:
// Pattern: const initial = { ... }; create((set, get) => ({ ...initial, reset: () => set(initial) })).
// Logout: reset cart + user slice. Tests: beforeEach(() => store.getState().reset()).
// persist ke saath: clearStorage() from persist API bhi.
// -----------------------------------------------------------------------------
const initialSession = { user: null, token: null };

export const useSessionStore = create((set) => ({
  ...initialSession,
  setSession: (user, token) => set({ user, token }),
  reset: () => set(initialSession),
}));

// -----------------------------------------------------------------------------
// Q16: Testing store outside React
//
// Kya karna hai:
// getState / setState direct — unit test actions.
//
// Seedha matlab:
// useCounterStore.setState({ count: 5 });
// useCounterStore.getState().inc();
// expect(useCounterStore.getState().count).toBe(6);
// No render needed — pure action tests fast.
// Component tests: render with real store; reset in beforeEach.
// Mock store: inject via props/context wrapper if isolation chahiye (advanced).
// -----------------------------------------------------------------------------
export function testCounterActions() {
  useCounterStore.setState({ count: 0 });
  useCounterStore.getState().inc();
  return useCounterStore.getState().count; // 1
}

// -----------------------------------------------------------------------------
// Q17: Computed getters — derived state in store
//
// Kya karna hai:
// totalPrice selector ya get().items.reduce in action.
//
// Seedha matlab:
// Don't store derived if easily computed — selector (s) => s.items.reduce(...).
// Expensive derive: memo in selector with reselect pattern or cache in action after mutation.
// ❌ total: () => get().items.length as store field function — unstable selector.
// ✅ selectTotal = (s) => s.items.reduce((n, i) => n + i.qty, 0).
// -----------------------------------------------------------------------------
export const useShopStore = create((set) => ({
  items: [{ id: 1, qty: 2, price: 10 }],
  addQty: (id) =>
    set((s) => ({
      items: s.items.map((it) => (it.id === id ? { ...it, qty: it.qty + 1 } : it)),
    })),
}));

export function CartTotal() {
  const total = useShopStore((s) =>
    s.items.reduce((sum, it) => sum + it.qty * it.price, 0)
  );
  return <strong>Total: ${total}</strong>;
}

// -----------------------------------------------------------------------------
// Q18: Logger middleware sketch
//
// Kya karna hai:
// Dev me har set pe prev/next log.
//
// Seedha matlab:
// const log = (config) => (set, get, api) => config(
//   (...args) => { console.log('prev', get()); set(...args); console.log('next', get()); },
//   get, api
// );
// create(log((set)=>({ ... }))). Official devtools middleware bhi.
// Production me strip — NODE_ENV check.
// -----------------------------------------------------------------------------
const loggerSketch =
  "Wrap set in middleware to log prev/next state; use zustand devtools in dev.";

// -----------------------------------------------------------------------------
// Q19: React 19 note — Zustand still client-only
//
// Kya karna hai:
// RSC / Server Components me store use mat karo.
//
// Seedha matlab:
// 'use client' boundary me components jo useStore call karein.
// Server pe create() run mat — hydration mismatch + no window.
// React 19 Actions / useActionState server mutations alag — store sync client side after.
// Store = client global UI/session snapshot, not server data source of truth.
// -----------------------------------------------------------------------------
const react19Note =
  "Mark store-consuming components 'use client'; server components cannot call useStore.";

// -----------------------------------------------------------------------------
// Q20: SSR + persist hydrate caution
//
// Kya karna hai:
// localStorage SSR pe nahi — flash wrong theme avoid.
//
// Seedha matlab:
// First client render = default state; after rehydrate jump — mismatch warning.
// Fix: skip persist render until hydrated flag; or cookie for SSR-readable theme.
// persist.onFinishHydration(() => set({ hydrated: true })).
// Next.js: useEffect-only persist read or dynamic ssr:false component.
// -----------------------------------------------------------------------------
export const useHydratedUiStore = create((set) => ({
  theme: "light",
  hydrated: false,
  setHydrated: () => set({ hydrated: true }),
}));

// persist config sketch:
// onRehydrateStorage: () => (state) => state?.setHydrated?.()

// -----------------------------------------------------------------------------
// Q21: Common bug — re-creating store inside component
//
// Kya karna hai:
// create() sirf module level — ek baar.
//
// Seedha matlab:
// ❌ function Comp() { const useStore = create(...) — N stores, state lost, memory leak.
// ✅ module scope export const useStore = create(...).
// Factory per test OK: createStore() helper module me, not in render.
// Context+create rare pattern for scoped store — advanced, default avoid.
// -----------------------------------------------------------------------------
// BAD pattern (never):
// function Bad() {
//   const useLocal = create(() => ({ n: 0 }));
//   return null;
// }

// -----------------------------------------------------------------------------
// Q22: Multiple stores vs single bound store
//
// Kya karna hai:
// Domain split — cart, auth, ui alag ya slices ek me.
//
// Seedha matlab:
// Multiple stores: clear boundaries, tree-shake imports, smaller tests.
// Single bound: one devtools view, cross-slice actions easy (logout clears all).
// Team preference — consistency > dogma. Avoid 20 micro-stores confusion.
// Related data (user + permissions) ek store/slice me rakho.
// -----------------------------------------------------------------------------
const multiStoreTip =
  "Split by domain (auth, cart, ui); combine slices when actions cross-cut often.";

// -----------------------------------------------------------------------------
// Q23: useStore outside component — getState / subscribe
//
// Kya karna hai:
// Router loader, axios interceptor me token read.
//
// Seedha matlab:
// useSessionStore.getState().token — no hook rules.
// Subscribe logout event: useSessionStore.subscribe(s => s.token, tok => { if (!tok) redirect }).
// Keep side effects out of store actions jab possible — or explicit init module.
// -----------------------------------------------------------------------------
export function attachAuthHeader(config) {
  const token = useSessionStore.getState().token;
  if (token) {
    config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
  }
  return config;
}

// -----------------------------------------------------------------------------
// Q24: Performance checklist + interview recap
//
// Kya karna hai:
// Bolke sunao: selectors, shallow, colocate, server state separation.
//
// Seedha matlab:
// 1) Narrow selectors 2) shallow for object picks 3) don't select functions inline new
// 4) async + race handling 5) persist partial 6) reset tests 7) client boundary
// 8) pair with React Query for API 9) devtools profile renders 10) module-level create
// Trap: "Zustand replaces Redux always" — nuance. "Store for every useState" — no.
// -----------------------------------------------------------------------------
export const zustandChecklist = [
  "module-level create once",
  "narrow selectors not whole store",
  "shallow for multi-field object selector",
  "server data in React Query not Zustand",
  "persist + SSR hydrate carefully",
  "reset store on logout/tests",
];

// -----------------------------------------------------------------------------
// Demo app wiring — bound store usage
// -----------------------------------------------------------------------------
export function ZustandDemoApp() {
  const bears = useBoundStore((s) => s.bears);
  const fishes = useBoundStore((s) => s.fishes);
  const addBear = useBoundStore((s) => s.addBear);
  const addFish = useBoundStore((s) => s.addFish);

  return (
    <div>
      <p>Bears: {bears} Fishes: {fishes}</p>
      <button onClick={addBear}>+ bear</button>
      <button onClick={addFish}>+ fish</button>
      <CounterView />
      <CartBadge />
    </div>
  );
}

// -----------------------------------------------------------------------------
// Quick revise map
// 11 context → 12 reducer → 47 zustand | 46 auth (overlap session store)
// Middleware: Q6 immer, Q7 persist, Q13 subscribeWithSelector, Q18 logger
// -----------------------------------------------------------------------------
