// ============================================================================
// 13 — Custom Hooks
// Level: MID  |  Sequence: read this file, then the next number
// ============================================================================
//
// SIMPLE: Custom hook = your own kitchen gadget. Name it useX, use built-in hooks inside.
// Logic reuse: localStorage sync, fetch, form — don't copy-paste, extract a hook.
//
// Rules of Hooks apply: top level, only in React functions.
// Return what you need: value, tuple [val, set], or object { data, error }.
//
// WHY: DRY + testable units. Libraries are custom hooks themselves.
// INTERVIEW: rules of hooks; extract when; naming use*.
// Use in a Vite + React 19 project — teaching file.
//
// ============================================================================

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

// -----------------------------------------------------------------------------
// Q1: useToggle
//
// Task:
// Return boolean + toggle function.
//
// In simple words:
// Small reusable pattern. Don't repeat useState everywhere.
// -----------------------------------------------------------------------------
function useToggle(initial = false) {
  const [on, setOn] = useState(initial);
  const toggle = () => setOn((v) => !v);
  return [on, toggle];
}

function MenuBtn() {
  const [open, toggle] = useToggle();
  return <button onClick={toggle}>{open ? "Open" : "Closed"}</button>;
}

// -----------------------------------------------------------------------------
// Q2: useLocalStorage
//
// Task:
// Read/write by key; sync state.
//
// In simple words:
// Persist preference. SSR careful (window check) — here we assume client.
// -----------------------------------------------------------------------------
function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    const raw = localStorage.getItem(key);
    return raw != null ? JSON.parse(raw) : initial;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}

function ThemeRemember() {
  const [theme, setTheme] = useLocalStorage("theme", "light");
  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      {theme}
    </button>
  );
}

// -----------------------------------------------------------------------------
// Q3: useFetch sketch
//
// Task:
// url → { data, error, loading }
//
// In simple words:
// Encapsulate data fetching pattern. Abort cleanup.
// -----------------------------------------------------------------------------
function useFetch(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let alive = true;
    setLoading(true);
    fetch(url)
      .then((r) => r.json())
      .then((d) => {
        if (alive) {
          setData(d);
          setError(null);
        }
      })
      .catch((e) => {
        if (alive) setError(e);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [url]);
  return { data, error, loading };
}

// -----------------------------------------------------------------------------
// Q4: useDocumentTitle
//
// Task:
// title string effect.
//
// In simple words:
// One-liner side effect hooks — readable App.
// -----------------------------------------------------------------------------
function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

function Page() {
  useDocumentTitle("Dashboard");
  return <h1>Dashboard</h1>;
}

// -----------------------------------------------------------------------------
// Q5: [MID] useDebouncedValue
//
// Task:
// value change → wait ms → debounced return (search).
//
// In simple words:
// Typeahead: fewer API calls. Timer cleanup.
// -----------------------------------------------------------------------------
function useDebouncedValue(value, ms = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), ms);
    return () => clearTimeout(id);
  }, [value, ms]);
  return debounced;
}

function SearchBox() {
  const [q, setQ] = useState("");
  const dq = useDebouncedValue(q, 400);
  useEffect(() => {
    if (dq) console.log("search", dq);
  }, [dq]);
  return <input value={q} onChange={(e) => setQ(e.target.value)} />;
}

// -----------------------------------------------------------------------------
// Q6: [MID] Hook composing hooks
//
// Task:
// useApi on top of useAuthHeaders — hooks nest OK.
//
// In simple words:
// Composition > inheritance. Build big features from custom hooks.
// -----------------------------------------------------------------------------
function useOnline() {
  const [online, setOnline] = useState(navigator.onLine);
  useEffect(() => {
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, []);
  return online;
}

function useSafeFetch(url) {
  const online = useOnline();
  const result = useFetch(online ? url : "");
  return { ...result, online };
}

// -----------------------------------------------------------------------------
// Q7: Return stable callbacks
//
// Task:
// useCallback makes returned functions stable (correct deps).
//
// In simple words:
// Matters if child is memoized. Otherwise optional.
// -----------------------------------------------------------------------------
function useCounter(start = 0) {
  const [n, setN] = useState(start);
  const inc = useCallback(() => setN((x) => x + 1), []);
  const reset = useCallback(() => setN(start), [start]);
  return { n, inc, reset };
}

// -----------------------------------------------------------------------------
// Q8: Don't conditionally call hooks
//
// Task:
// if (x) useSomething() — FORBIDDEN.
//
// In simple words:
// Rules of Hooks. Conditional logic goes INSIDE the hook.
// -----------------------------------------------------------------------------
function Bad() {
  // if ( Cond) useToggle(); // ❌
  const [on, toggle] = useToggle(); // ✅ always
  return on ? <button onClick={toggle}>on</button> : null;
}

// -----------------------------------------------------------------------------
// Q9: Rules of Hooks — top level only
//
// Task:
// Don't call hooks in loop / nested function / class.
//
// In simple words:
// React keeps hook order fixed. Break rules = random bugs.
// Same rules in custom hooks — they are hooks too.
// -----------------------------------------------------------------------------
function GoodRules() {
  const [a, setA] = useState(0);
  // for (let i = 0; i < 3; i++) useState(i); // ❌ not in loop
  return <button onClick={() => setA(a + 1)}>{a}</button>;
}

// -----------------------------------------------------------------------------
// Q10: Return tuple vs object
//
// Task:
// [value, setValue] vs { value, setValue, reset } — API design.
//
// In simple words:
// Tuple = familiar like useState, order matters. Object = named, extensible.
// 3+ returns → object better. Easy to rename on destructure with object.
// -----------------------------------------------------------------------------
function useNamedCounter(initial = 0) {
  const [n, setN] = useState(initial);
  const reset = () => setN(initial);
  return { n, setN, reset }; // object API
}

function TupleVsObjectDemo() {
  const [on, toggle] = useToggle(); // tuple
  const { n, reset } = useNamedCounter(5); // object
  return (
    <div>
      <button onClick={toggle}>{String(on)}</button>
      <button onClick={reset}>{n}</button>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q11: [MID] useLocalStorage SSR trap
//
// Task:
// typeof window !== "undefined" check in lazy init.
//
// In simple words:
// No localStorage on SSR — crash. Guard in lazy initializer.
// Hydration mismatch: server default vs client stored value — flash possible.
// -----------------------------------------------------------------------------
function useLocalStorageSafe(key, initial) {
  const [value, setValue] = useState(() => {
    if (typeof window === "undefined") return initial;
    const raw = localStorage.getItem(key);
    return raw != null ? JSON.parse(raw) : initial;
  });
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);
  return [value, setValue];
}

// -----------------------------------------------------------------------------
// Q12: useFetch — AbortController cleanup
//
// Task:
// const ctrl = new AbortController(); fetch(url, { signal: ctrl.signal })
//
// In simple words:
// Cancel old request on unmount / url change — fixes race condition.
// alive flag also works; AbortController is more proper.
// -----------------------------------------------------------------------------
function useFetchAbort(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const ctrl = new AbortController();
    setLoading(true);
    fetch(url, { signal: ctrl.signal })
      .then((r) => r.json())
      .then(setData)
      .catch((e) => {
        if (e.name !== "AbortError") console.error(e);
      })
      .finally(() => setLoading(false));
    return () => ctrl.abort();
  }, [url]);
  return { data, loading };
}

// -----------------------------------------------------------------------------
// Q13: Naming — must start with use*
//
// Task:
// function getTheme() { useContext(...) } — ❌ Rules of Hooks break.
//
// In simple words:
// use prefix = linter + React know it's a hook. Call only from components/hooks.
// Don't put useState in fetchData() — rename to useFetchData.
// -----------------------------------------------------------------------------
function useWindowWidth() {
  const [w, setW] = useState(window.innerWidth);
  useEffect(() => {
    const onResize = () => setW(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return w;
}

// -----------------------------------------------------------------------------
// Q14: [MID] Stale closure in custom hook
//
// Task:
// useEffect(() => { setInterval(() => setCount(count+1), 1000) }, []) — stale count.
//
// In simple words:
// Functional update setCount(c => c+1) or put count in deps.
// Same closure rules in custom hooks — extract means make it bug-free.
// -----------------------------------------------------------------------------
function useStaleAwareCounter(start = 0) {
  const [count, setCount] = useState(start);
  const tick = useCallback(() => setCount((c) => c + 1), []); // functional — safe
  return { count, tick };
}

// -----------------------------------------------------------------------------
// Q15: Composing hooks — useAuth + useFetch
//
// Task:
// useUserPosts() { const { token } = useAuth(); return useFetch(`/posts?token=${token}`) }
//
// In simple words:
// Hooks nest freely. Build big features from small hooks.
// Extract shared logic — keep component slim.
// -----------------------------------------------------------------------------
function useAuthToken() {
  const [token] = useLocalStorage("token", null);
  return token;
}

function useUserPosts() {
  const token = useAuthToken();
  return useFetch(token ? `/api/posts?token=${token}` : null);
}

// -----------------------------------------------------------------------------
// Q16: Testing hooks note
//
// Task:
// @testing-library/react renderHook(() => useToggle()) — wrap updates in act().
//
// In simple words:
// Test hooks inside a component or use renderHook.
// Wrap Provider if hook uses context.
// Pure logic in separate function = even easier to test.
// -----------------------------------------------------------------------------
// const { result } = renderHook(() => useToggle(true));
// act(() => result.current[1]()); // toggle

// -----------------------------------------------------------------------------
// Q17: Extract when — duplicate logic 2+ places
//
// Task:
// Same useEffect copy-pasted in two components → make a hook.
//
// In simple words:
// Used once — don't make it (YAGNI). Used twice = consider extract.
// Hook = behavior reuse, not UI.
// -----------------------------------------------------------------------------
function useMediaQuery(query) {
  const [matches, setMatches] = useState(() =>
    window.matchMedia(query).matches
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const fn = () => setMatches(mq.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, [query]);
  return matches;
}

// -----------------------------------------------------------------------------
// Q18: [MID] Hook returning stable object — useMemo
//
// Task:
// return { data, loading, refetch } — new object every render → consumer memo fails.
//
// In simple words:
// useMemo return object when consumer is memoized. Otherwise often OK.
// Keep refetch stable with useCallback.
// -----------------------------------------------------------------------------
function useFetchStable(url) {
  const { data, error, loading } = useFetch(url);
  const refetch = useCallback(() => {
    /* trigger re-fetch pattern */
  }, [url]);
  return useMemo(
    () => ({ data, error, loading, refetch }),
    [data, error, loading, refetch]
  );
}

// -----------------------------------------------------------------------------
// Q19: usePrevious hook pattern
//
// Task:
// last value in ref; effect updates after render.
//
// In simple words:
// "What was the previous value?" — for animations / diff.
// Classic custom hook interview question.
// -----------------------------------------------------------------------------
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

// -----------------------------------------------------------------------------
// Q20: useEventListener reusable hook
//
// Task:
// useEventListener("keydown", handler, window) — add/remove cleanup.
//
// In simple words:
// Event listener boilerplate in one place. handler ref pattern avoids stale.
// -----------------------------------------------------------------------------
function useEventListener(event, handler, target = window) {
  const saved = useRef(handler);
  useEffect(() => {
    saved.current = handler;
  }, [handler]);
  useEffect(() => {
    const fn = (e) => saved.current(e);
    target.addEventListener(event, fn);
    return () => target.removeEventListener(event, fn);
  }, [event, target]);
}

// -----------------------------------------------------------------------------
// Q21: [MID] Custom hook parameters — primitives vs objects
//
// Task:
// useFetch({ url, method }) — object arg new every render → effect rerun risk.
//
// In simple words:
// Primitive deps stable. If you pass object, parent should memoize or flatten args.
// Hook API design matters for bugs.
// -----------------------------------------------------------------------------
function useFetchOpts(url, method = "GET") {
  return useFetch(url); // primitives as deps — predictable
}

// -----------------------------------------------------------------------------
// Q22: Don't share mutable refs between hook instances
//
// Task:
// Module-level let cache = {} — two components share = bug.
//
// In simple words:
// Each hook call gets its own useRef/useState. No global mutable state in hook.
// Singleton cache is a separate pattern — document clearly.
// -----------------------------------------------------------------------------
function useIdGenerator() {
  const idRef = useRef(0);
  const next = useCallback(() => {
    idRef.current += 1;
    return idRef.current;
  }, []);
  return next;
}

export {
  useToggle,
  MenuBtn,
  useLocalStorage,
  ThemeRemember,
  useFetch,
  useDocumentTitle,
  Page,
  useDebouncedValue,
  SearchBox,
  useOnline,
  useSafeFetch,
  useCounter,
  Bad,
  GoodRules,
  TupleVsObjectDemo,
  useLocalStorageSafe,
  useFetchAbort,
  useWindowWidth,
  useStaleAwareCounter,
  useUserPosts,
  useMediaQuery,
  useFetchStable,
  usePrevious,
  useEventListener,
  useFetchOpts,
  useIdGenerator,
};
