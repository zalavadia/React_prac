// ============================================================================
// 09 — useEffect
// Level: MID  |  Sequence: pehle yeh, phir agla number
// ============================================================================
//
// LAYMAN: useEffect = "paint ke baad yeh extra kaam karo" — fetch, timer,
// document.title, event listener. Render pure rakho; side effects yahan.
//
// useEffect(fn, deps):
//   [] = mount pe ek baar (strict mode dev me 2x — 27).
//   [x] = x change pe dubara.
//   no deps = har render pe (rare, careful).
// Cleanup return () => {...} — unmount / pehle deps change pe (clearInterval).
//
// KYUN: Data fetch, sync bahar duniya — React ka official door.
// INTERVIEW: deps array; cleanup; infinite loop; race conditions.
// Vite/React 19 project me use — teaching file.
//
// ============================================================================

import { useEffect, useRef, useState } from "react";

// -----------------------------------------------------------------------------
// Q1: document.title sync
//
// Kya karna hai:
// count badle to title update.
//
// Seedha matlab:
// Browser API = side effect. Effect me karo, render me nahi.
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
// Kya karna hai:
// [] deps — load pe data lao.
//
// Seedha matlab:
// Empty deps ≈ componentDidMount feel. Cleanup me abort useful.
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
// Kya karna hai:
// setInterval + clearInterval return me.
//
// Seedha matlab:
// Bina cleanup memory leak / setState on unmounted.
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
// Kya karna hai:
// query change pe naya search effect.
//
// Seedha matlab:
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
// Kya karna hai:
// Effect me setState + missing/wrong deps → loop.
//
// Seedha matlab:
// useEffect(() => setX(x+1)) bina soch → infinite. Deps samjho.
// -----------------------------------------------------------------------------
function LoopWarning() {
  const [n, setN] = useState(0);
  // BAD: useEffect(() => setN(n + 1)); // har render → dubara effect
  // OK: user event pe setN, ya [someExternal]
  return <p>{n}</p>;
}

// -----------------------------------------------------------------------------
// Q6: Event listener subscribe
//
// Kya karna hai:
// window resize pe width state; cleanup removeEventListener.
//
// Seedha matlab:
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
// Kya karna hai:
// Kabhi prop change pe local draft reset — effect se.
//
// Seedha matlab:
// Often key={id} remount better. Effect sync smell ho sakta — soch ke use.
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
// Kya karna hai:
// Fast typing: purani fetch late aake naya result overwrite na kare.
//
// Seedha matlab:
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
// Q9: No deps — har render pe run
//
// Kya karna hai:
// useEffect(() => {...}) — deps array hi nahi.
//
// Seedha matlab:
// Har paint ke baad chalega. Rare; usually bug ya logging. Avoid unless sure.
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
// Kya karna hai:
// Analytics init, one-time setup — [].
//
// Seedha matlab:
// Sirf mount + cleanup unmount. Props/state andar use mat karo bina deps ke.
// -----------------------------------------------------------------------------
function AnalyticsInit() {
  useEffect(() => {
    console.log("track page view");
  }, []);
  return null;
}

// -----------------------------------------------------------------------------
// Q11: Full deps — sab external values list
//
// Kya karna hai:
// [userId, filter] — dono change pe effect dubara.
//
// Seedha matlab:
// ESLint exhaustive-deps follow karo. Missing = stale closure bug.
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
// Kya karna hai:
// deps change → pehle cleanup, phir naya effect body.
//
// Seedha matlab:
// Purana subscription/timer band, naya start. Order guaranteed.
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
// Kya karna hai:
// Dev me React mount → unmount → mount dubara — cleanup test.
//
// Seedha matlab:
// Effect 2x run ho sakta dev me. Cleanup sahi ho to OK. Prod me ek baar.
// -----------------------------------------------------------------------------
function StrictModeSafe() {
  useEffect(() => {
    const sub = { dispose: () => {} };
    return () => sub.dispose();
  }, []);
  return <p>Strict-safe effect</p>;
}

// -----------------------------------------------------------------------------
// Q14: Derived state — effect mat
//
// Kya karna hai:
// fullName = first + last render me — useEffect se setFullName mat.
//
// Seedha matlab:
// Jo props/state se compute ho sakta render me — wahi karo. Extra effect = lag.
// -----------------------------------------------------------------------------
function FullName({ first, last }) {
  const fullName = `${first} ${last}`.trim();
  return <p>{fullName}</p>;
}

// -----------------------------------------------------------------------------
// Q15: When NOT to use effect — event handler
//
// Kya karna hai:
// Button click pe POST — onClick me karo, useEffect me mat.
//
// Seedha matlab:
// User action = event. Mount/sync external = effect. Confuse mat karo.
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
// Kya karna hai:
// effect me setLoading true → fetch → setData/setError → finally setLoading false.
//
// Seedha matlab:
// Classic pattern. Race guard bhi rakho (Q8 jaisa).
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
// Kya karna hai:
// theme state change → localStorage.setItem in effect.
//
// Seedha matlab:
// Browser storage = external system. Effect ya event dono OK; effect for sync after render.
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
// Kya karna hai:
// useSyncExternalStore for subscribe API — raw effect + listener se behtar.
//
// Seedha matlab:
// window matchMedia, Redux subscribe — official hook tearing avoid karta hai.
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
// Q19: Object dep — stabilize or fields
//
// Kya karna hai:
// deps me [config] — har render naya object = effect loop.
//
// Seedha matlab:
// Primitive fields deps me lo, ya useMemo config. Reference equality matter.
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
// Kya karna hai:
// countdown restarts jab seconds prop badle — cleanup clearTimeout.
//
// Seedha matlab:
// Naya dep = purana timer band, naya start. Leak mat chhodo.
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
// Kya karna hai:
// data change pe auto-save effect? Usually blur/submit event better.
//
// Seedha matlab:
// Har keystroke effect = spam. Debounced effect ya explicit save button prefer.
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
// Kya karna hai:
// return () => ac.abort() — in-flight fetch cancel.
//
// Seedha matlab:
// Unmount ya dep change pe purani request band. Network + setState race fix.
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
// Kya karna hai:
// DOM measure before paint — useLayoutEffect; flicker avoid.
//
// Seedha matlab:
// useEffect = after paint (flash ho sakta). Layout sync = layoutEffect. Rare need.
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
// Kya karna hai:
// if (!enabled) return; inside effect — subscribe mat jab off.
//
// Seedha matlab:
// enabled dep me rakho. Off pe cleanup still chalega previous run ka.
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
