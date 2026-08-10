// ============================================================================
// 09 — useEffect
// Level: MID  |  Sequence: read this file, then the next number
// ============================================================================
//
// SIMPLE: useEffect = "after paint, do this extra work" — fetch, timer,
// document.title, event listener. Keep render pure; side effects go here.
//
// useEffect(fn, deps):
//   [] = once on mount (strict mode dev runs 2x — see 27).
//   [x] = again when x changes.
//   no deps = every render (rare, be careful).
// Cleanup return () => {...} — on unmount / before deps change (clearInterval).
//
// WHY: Data fetch, sync with outside world — React's official side-effect door.
// INTERVIEW: deps array; cleanup; infinite loop; race conditions.
// Use in a Vite + React 19 project — teaching file (do not run with node alone).
//
// ============================================================================

import { useEffect, useRef, useState } from "react";

// -----------------------------------------------------------------------------
// Q1: document.title sync
//
// Task:
// Update title when count changes.
//
// In simple words:
// Browser API = side effect. Do it in effect, not in render.
// -----------------------------------------------------------------------------
function TitleCounter() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}

// -----------------------------------------------------------------------------
// Q2: Mount-only fetch sketch
//
// Task:
// [] deps — load data on mount.
//
// In simple words:
// Empty deps ≈ componentDidMount feel. Abort in cleanup is useful.
// -----------------------------------------------------------------------------
function Users() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    let cancelled = false;
    fetch("/api/users")
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled) setUsers(data);
      });
    return () => {
      cancelled = true;
    };
  }, []);
  return <pre>{JSON.stringify(users)}</pre>;
}

// -----------------------------------------------------------------------------
// Q3: Cleanup interval
//
// Task:
// setInterval + clearInterval in return.
//
// In simple words:
// Without cleanup: memory leak / setState on unmounted component.
// -----------------------------------------------------------------------------
function Clock() {
  const [t, setT] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setT((x) => x + 1), 1000);
    return () => clearInterval(id);
  }, []);
  return <p>{t}s</p>;
}

// -----------------------------------------------------------------------------
// Q4: Deps — search when query changes
//
// Task:
// New search effect when query changes.
//
// In simple words:
// Missing dep = stale bug. Extra dep = extra runs. ESLint exhaustive-deps.
// -----------------------------------------------------------------------------
function Search({ query }) {
  const [results, setResults] = useState([]);
  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }
    let alive = true;
    fetch(`/api/search?q=${query}`)
      .then((r) => r.json())
      .then((data) => {
        if (alive) setResults(data);
      });
    return () => {
      alive = false;
    };
  }, [query]);
  return <ul>{results.map((r) => <li key={r.id}>{r.title}</li>)}</ul>;
}

// -----------------------------------------------------------------------------
// Q5: [MID] Infinite loop trap
//
// Task:
// setState inside effect + missing/wrong deps → loop.
//
// In simple words:
// useEffect(() => setX(x+1)) without thought → infinite. Understand deps.
// -----------------------------------------------------------------------------
function LoopWarning() {
  const [n, setN] = useState(0);
  // BAD: useEffect(() => setN(n + 1)); // every render → effect again
  // OK: setN on user event, or [someExternal]
  return <p>{n}</p>;
}

// -----------------------------------------------------------------------------
// Q6: Event listener subscribe
//
// Task:
// window resize updates width state; cleanup removeEventListener.
//
// In simple words:
// Subscribe/unsubscribe pair = classic cleanup.
// -----------------------------------------------------------------------------
function WindowWidth() {
  const [w, setW] = useState(window.innerWidth);
  useEffect(() => {
    function onResize() {
      setW(window.innerWidth);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return <p>Width: {w}</p>;
}

// -----------------------------------------------------------------------------
// Q7: [MID] Syncing props → state (careful)
//
// Task:
// Sometimes reset local draft when prop changes — via effect.
//
// In simple words:
// Often key={id} remount is better. Effect sync can be a smell — use thoughtfully.
// -----------------------------------------------------------------------------
function Draft({ savedText }) {
  const [text, setText] = useState(savedText);
  useEffect(() => {
    setText(savedText);
  }, [savedText]);
  return <textarea value={text} onChange={(e) => setText(e.target.value)} />;
}

// -----------------------------------------------------------------------------
// Q8: [MID] Race: slow response overwrite
//
// Task:
// Fast typing: old fetch should not overwrite newer result when it arrives late.
//
// In simple words:
// cancelled flag / AbortController. Interview favorite.
// -----------------------------------------------------------------------------
function RaceSafeSearch({ q }) {
  const [data, setData] = useState(null);
  useEffect(() => {
    const ac = new AbortController();
    fetch(`/api?q=${q}`, { signal: ac.signal })
      .then((r) => r.json())
      .then(setData)
      .catch((err) => {
        if (err.name !== "AbortError") console.error(err);
      });
    return () => ac.abort();
  }, [q]);
  return <pre>{JSON.stringify(data)}</pre>;
}

// -----------------------------------------------------------------------------
// Q9: No deps — runs every render
//
// Task:
// useEffect(() => {...}) — no deps array.
//
// In simple words:
// Runs after every paint. Rare; usually bug or logging. Avoid unless sure.
// -----------------------------------------------------------------------------
function EveryRenderLog({ value }) {
  useEffect(() => {
    console.log("rendered with", value);
  });
  return <p>{value}</p>;
}

// -----------------------------------------------------------------------------
// Q10: Empty deps [] — mount once
//
// Task:
// Analytics init, one-time setup — [].
//
// In simple words:
// Only mount + cleanup on unmount. Do not use props/state inside without listing deps.
// -----------------------------------------------------------------------------
function AnalyticsInit() {
  useEffect(() => {
    console.log("track page view");
  }, []);
  return null;
}

// -----------------------------------------------------------------------------
// Q11: Full deps — list all external values
//
// Task:
// [userId, filter] — effect runs again when either changes.
//
// In simple words:
// Follow ESLint exhaustive-deps. Missing = stale closure bug.
// -----------------------------------------------------------------------------
function UserPosts({ userId, filter }) {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch(`/api/users/${userId}?f=${filter}`)
      .then((r) => r.json())
      .then(setPosts);
  }, [userId, filter]);
  return <pre>{JSON.stringify(posts)}</pre>;
}

// -----------------------------------------------------------------------------
// Q12: Cleanup before re-run
//
// Task:
// When deps change → cleanup first, then new effect body.
//
// In simple words:
// Old subscription/timer stops, new one starts. Order is guaranteed.
// -----------------------------------------------------------------------------
function DebouncedLog({ text }) {
  useEffect(() => {
    const id = setTimeout(() => console.log(text), 500);
    return () => clearTimeout(id);
  }, [text]);
  return null;
}

// -----------------------------------------------------------------------------
// Q13: [MID] Strict Mode double mount
//
// Task:
// Dev: React mount → unmount → mount again — tests cleanup.
//
// In simple words:
// Effect may run 2x in dev. With good cleanup it is OK. Prod runs once.
// -----------------------------------------------------------------------------
function StrictModeSafe() {
  useEffect(() => {
    const sub = { dispose: () => {} };
    return () => sub.dispose();
  }, []);
  return <p>Strict-safe effect</p>;
}

// -----------------------------------------------------------------------------
// Q14: Derived state — no effect
//
// Task:
// fullName = first + last in render — do not setFullName in useEffect.
//
// In simple words:
// If it can be computed from props/state in render — do that. Extra effect = lag.
// -----------------------------------------------------------------------------
function FullName({ first, last }) {
  const fullName = `${first} ${last}`.trim();
  return <p>{fullName}</p>;
}

// -----------------------------------------------------------------------------
// Q15: When NOT to use effect — event handler
//
// Task:
// POST on button click — do in onClick, not useEffect.
//
// In simple words:
// User action = event. Mount/sync external = effect. Do not confuse them.
// -----------------------------------------------------------------------------
function SaveButton({ data }) {
  function save() {
    fetch("/api/save", { method: "POST", body: JSON.stringify(data) });
  }
  return <button onClick={save}>Save</button>;
}

// -----------------------------------------------------------------------------
// Q16: Fetch with loading/error states
//
// Task:
// In effect: setLoading true → fetch → setData/setError → finally setLoading false.
//
// In simple words:
// Classic pattern. Keep race guard too (like Q8).
// -----------------------------------------------------------------------------
function FetchWithStates({ id }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    let alive = true;
    setLoading(true);
    fetch(`/api/item/${id}`)
      .then((r) => r.json())
      .then((d) => {
        if (alive) setData(d);
      })
      .catch((e) => {
        if (alive) setError(String(e));
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [id]);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return <pre>{JSON.stringify(data)}</pre>;
}

// -----------------------------------------------------------------------------
// Q17: localStorage sync effect
//
// Task:
// theme state change → localStorage.setItem in effect.
//
// In simple words:
// Browser storage = external system. Effect or event both OK; effect syncs after render.
// -----------------------------------------------------------------------------
function ThemeSync({ theme }) {
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);
  return <p>Theme: {theme}</p>;
}

// -----------------------------------------------------------------------------
// Q18: [MID] Sync external store contrast
//
// Task:
// useSyncExternalStore for subscribe API — better than raw effect + listener.
//
// In simple words:
// window matchMedia, Redux subscribe — official hook avoids tearing.
// -----------------------------------------------------------------------------
function ExternalStoreNote() {
  // useSyncExternalStore(subscribe, getSnapshot) — see React docs
  const [w, setW] = useState(window.innerWidth);
  useEffect(() => {
    const fn = () => setW(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return <p>{w}px</p>;
}

// -----------------------------------------------------------------------------
// Q19: Object dep — stabilize or use fields
//
// Task:
// deps [config] — new object every render = effect loop.
//
// In simple words:
// Put primitive fields in deps, or useMemo config. Reference equality matters.
// -----------------------------------------------------------------------------
function ConfigFetch({ url, page }) {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(`${url}?page=${page}`).then((r) => r.json()).then(setData);
  }, [url, page]);
  return <pre>{JSON.stringify(data)}</pre>;
}

// -----------------------------------------------------------------------------
// Q20: Timer reset on dep change
//
// Task:
// countdown restarts when seconds prop changes — cleanup clearTimeout.
//
// In simple words:
// New dep = stop old timer, start new. Do not leak.
// -----------------------------------------------------------------------------
function Countdown({ seconds }) {
  const [left, setLeft] = useState(seconds);
  useEffect(() => {
    setLeft(seconds);
    const id = setInterval(() => setLeft((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [seconds]);
  return <p>{left}s</p>;
}

// -----------------------------------------------------------------------------
// Q21: [ADV] Effect vs event — form submit
//
// Task:
// Auto-save on every data change in effect? Usually blur/submit event is better.
//
// In simple words:
// Effect on every keystroke = spam. Prefer debounced effect or explicit save button.
// -----------------------------------------------------------------------------
function AutoSaveNote({ draft }) {
  useEffect(() => {
    const id = setTimeout(() => {
      if (draft) localStorage.setItem("draft", draft);
    }, 1000);
    return () => clearTimeout(id);
  }, [draft]);
  return <textarea defaultValue={draft} />;
}

// -----------------------------------------------------------------------------
// Q22: AbortController cleanup pattern
//
// Task:
// return () => ac.abort() — cancel in-flight fetch.
//
// In simple words:
// On unmount or dep change stop old request. Fixes network + setState race.
// -----------------------------------------------------------------------------
function AbortFetch({ query }) {
  const [result, setResult] = useState(null);
  useEffect(() => {
    const ac = new AbortController();
    fetch(`/api?q=${query}`, { signal: ac.signal })
      .then((r) => r.json())
      .then(setResult)
      .catch(() => {});
    return () => ac.abort();
  }, [query]);
  return <pre>{JSON.stringify(result)}</pre>;
}

// -----------------------------------------------------------------------------
// Q23: [ADV] Layout measurement — useLayoutEffect note
//
// Task:
// Measure DOM before paint — useLayoutEffect; avoid flicker.
//
// In simple words:
// useEffect = after paint (may flash). Layout sync = layoutEffect. Rare need.
// -----------------------------------------------------------------------------
function MeasureNote() {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) console.log(ref.current.offsetHeight);
  }, []);
  return <div ref={ref}>Measure me</div>;
}

// -----------------------------------------------------------------------------
// Q24: Conditional effect early return
//
// Task:
// if (!enabled) return; inside effect — do not subscribe when off.
//
// In simple words:
// Put enabled in deps. Off still runs cleanup from previous run.
// -----------------------------------------------------------------------------
function ConditionalSub({ enabled, channel }) {
  useEffect(() => {
    if (!enabled) return;
    const handler = () => {};
    document.addEventListener(channel, handler);
    return () => document.removeEventListener(channel, handler);
  }, [enabled, channel]);
  return null;
}

export {
  TitleCounter,
  Users,
  Clock,
  Search,
  LoopWarning,
  WindowWidth,
  Draft,
  RaceSafeSearch,
  EveryRenderLog,
  AnalyticsInit,
  UserPosts,
  DebouncedLog,
  StrictModeSafe,
  FullName,
  SaveButton,
  FetchWithStates,
  ThemeSync,
  ExternalStoreNote,
  ConfigFetch,
  Countdown,
  AutoSaveNote,
  AbortFetch,
  MeasureNote,
  ConditionalSub,
};
