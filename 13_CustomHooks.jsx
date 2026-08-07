// ============================================================================
// 13 — Custom Hooks
// Level: MID  |  Sequence: pehle yeh, phir agla number
// ============================================================================
//
// LAYMAN: Custom hook = apna kitchen gadget. useX naam, andar built-in hooks.
// Logic reuse: localStorage sync, fetch, form — copy-paste mat, hook nikaalo.
//
// Rules of Hooks apply: top level, sirf React functions me.
// Return jo chahiye: value, tuple [val, set], ya object { data, error }.
//
// KYUN: DRY + testable units. Libraries khud custom hooks hain.
// INTERVIEW: rules of hooks; extract when; naming use*.
// Vite/React 19 project me use — teaching file.
//
// ============================================================================

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

// -----------------------------------------------------------------------------
// Q1: useToggle
//
// Kya karna hai:
// boolean + toggle function return.
//
// Seedha matlab:
// Chhota reusable pattern. Har jagah useState mat dohrao.
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
// Kya karna hai:
// key se read/write; state sync.
//
// Seedha matlab:
// Persist preference. SSR careful (window check) — yahan client assume.
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
// Kya karna hai:
// url → { data, error, loading }
//
// Seedha matlab:
// Data fetching pattern encapsulate. Abort cleanup.
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
// Kya karna hai:
// title string effect.
//
// Seedha matlab:
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
// Kya karna hai:
// value change → wait ms → debounced return (search).
//
// Seedha matlab:
// Typeahead: API spam kam. Timer cleanup.
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
// Kya karna hai:
// useAuthHeaders ke upar useApi — hooks nest OK.
//
// Seedha matlab:
// Composition > inheritance. Custom hooks milake badi feature.
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
// Kya karna hai:
// useCallback se returned functions stable (deps sahi).
//
// Seedha matlab:
// Child memoized ho to matter. Warna optional.
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
// Kya karna hai:
// if (x) useSomething() — FORBIDDEN.
//
// Seedha matlab:
// Rules of Hooks. Conditional logic hook KE ANDAR.
// -----------------------------------------------------------------------------
function Bad() {
  // if ( Cond) useToggle(); // ❌
  const [on, toggle] = useToggle(); // ✅ always
  return on ? <button onClick={toggle}>on</button> : null;
}

// -----------------------------------------------------------------------------
// Q9: Rules of Hooks — top level only
//
// Kya karna hai:
// Hooks loop / nested function / class me mat call karo.
//
// Seedha matlab:
// React hook order fixed rakhta hai. Break rules = random bugs.
// Custom hooks me bhi same rules — wo bhi hooks hain.
// -----------------------------------------------------------------------------
function GoodRules() {
  const [a, setA] = useState(0);
  // for (let i = 0; i < 3; i++) useState(i); // ❌ loop me mat
  return <button onClick={() => setA(a + 1)}>{a}</button>;
}

// -----------------------------------------------------------------------------
// Q10: Return tuple vs object
//
// Kya karna hai:
// [value, setValue] vs { value, setValue, reset } — API design.
//
// Seedha matlab:
// Tuple = useState jaisa familiar, order matter. Object = named, extensible.
// 3+ returns → object better. Destructure rename easy object me.
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
// Kya karna hai:
// typeof window !== "undefined" check lazy init me.
//
// Seedha matlab:
// SSR pe localStorage nahi — crash. Lazy initializer me guard.
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
// Kya karna hai:
// const ctrl = new AbortController(); fetch(url, { signal: ctrl.signal })
//
// Seedha matlab:
// Unmount / url change pe purana request cancel — race condition fix.
// alive flag bhi chalega; AbortController zyada proper.
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
// Kya karna hai:
// function getTheme() { useContext(...) } — ❌ Rules of Hooks break.
//
// Seedha matlab:
// use prefix = linter + React samjhe hook hai. Call sirf components/hooks se.
// fetchData() me useState mat — rename useFetchData.
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
// Kya karna hai:
// useEffect(() => { setInterval(() => setCount(count+1), 1000) }, []) — stale count.
//
// Seedha matlab:
// Functional update setCount(c => c+1) ya count deps me.
// Custom hooks me bhi wahi closure rules — extract matlab bug-free karo.
// -----------------------------------------------------------------------------
function useStaleAwareCounter(start = 0) {
  const [count, setCount] = useState(start);
  const tick = useCallback(() => setCount((c) => c + 1), []); // functional — safe
  return { count, tick };
}

// -----------------------------------------------------------------------------
// Q15: Composing hooks — useAuth + useFetch
//
// Kya karna hai:
// useUserPosts() { const { token } = useAuth(); return useFetch(`/posts?token=${token}`) }
//
// Seedha matlab:
// Hooks nest freely. Badi feature chhoti hooks se banao.
// Shared logic extract — component slim.
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
// Kya karna hai:
// @testing-library/react renderHook(() => useToggle()) — act() wrap updates.
//
// Seedha matlab:
// Hooks ko component ke andar test karo ya renderHook use karo.
// Provider wrap zaroori agar hook context use kare.
// Pure logic alag function me = test aur easy.
// -----------------------------------------------------------------------------
// const { result } = renderHook(() => useToggle(true));
// act(() => result.current[1]()); // toggle

// -----------------------------------------------------------------------------
// Q17: Extract when — duplicate logic 2+ jagah
//
// Kya karna hai:
// Same useEffect copy-paste do components me → hook banao.
//
// Seedha matlab:
// Ek baar use ho raha — mat banao (YAGNI). Do jagah = extract socho.
// Hook = behavior reuse, UI nahi.
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
// Kya karna hai:
// return { data, loading, refetch } — har render naya object → consumer memo fail.
//
// Seedha matlab:
// useMemo return object jab consumer memoized ho. Warna often OK.
// refetch = useCallback stable rakho.
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
// Kya karna hai:
// ref me last value; effect me update after render.
//
// Seedha matlab:
// "Pehle value kya thi?" animations / diff ke liye.
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
// Kya karna hai:
// useEventListener("keydown", handler, window) — add/remove cleanup.
//
// Seedha matlab:
// Event listener boilerplate ek jagah. handler ref pattern stale avoid.
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
// Kya karna hai:
// useFetch({ url, method }) — object arg har render naya → effect rerun risk.
//
// Seedha matlab:
// Primitive deps stable. Object pass karo to parent memoize ya flatten args.
// Hook API design matter karta hai bugs ke liye.
// -----------------------------------------------------------------------------
function useFetchOpts(url, method = "GET") {
  return useFetch(url); // primitives as deps — predictable
}

// -----------------------------------------------------------------------------
// Q22: Don't share mutable refs between hook instances
//
// Kya karna hai:
// Module-level let cache = {} — do components share = bug.
//
// Seedha matlab:
// Har hook call apna useRef/useState. Global mutable state hook me mat.
// Singleton cache alag pattern — document clearly.
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
