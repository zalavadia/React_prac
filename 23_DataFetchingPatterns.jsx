// ============================================================================
// 23 — Data Fetching Patterns
// Level: MID  |  Sequence: do this first, then the next file in sequence
// ============================================================================
//
// SIMPLE: Fetch data from server — loading, success, error are three states.
// Pattern 1: useEffect + fetch + useState (classic).
// Pattern 2: custom useFetch. Pattern 3: libs (React Query/SWR) — cache, retry.
// Race, cleanup, stale — covered earlier (09). Here we tie UI patterns together.
//
// WHY: Every real app fetches. Interviews ask about race + loading UI.
// INTERVIEW: where to fetch; caching; waterfalls; parallel requests.
// Vite/React 19 project — teaching file.
//
// ============================================================================

import { useEffect, useRef, useState } from "react";

// -----------------------------------------------------------------------------
// Q1: Classic status triad
//
// Task:
// idle/loading/success/error UI.
//
// In simple words:
// One status string or flags — give user feedback.
// -----------------------------------------------------------------------------
function UsersClassic() {
  const [status, setStatus] = useState("idle");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  async function load() {
    setStatus("loading");
    setError(null);
    try {
      const res = await fetch("/api/users");
      if (!res.ok) throw new Error("HTTP " + res.status);
      const json = await res.json();
      setData(json);
      setStatus("success");
    } catch (e) {
      setError(String(e));
      setStatus("error");
    }
  }

  useEffect(() => {
    load();
  }, []);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>{error}</p>;
  return <pre>{JSON.stringify(data)}</pre>;
}

// -----------------------------------------------------------------------------
// Q2: Parallel fetches
//
// Task:
// Promise.all([fetchA, fetchB])
//
// In simple words:
// Do not waterfall when independent. Parallel = faster.
// -----------------------------------------------------------------------------
function Parallel() {
  const [bundle, setBundle] = useState(null);
  useEffect(() => {
    Promise.all([
      fetch("/api/user").then((r) => r.json()),
      fetch("/api/posts").then((r) => r.json()),
    ]).then(([user, posts]) => setBundle({ user, posts }));
  }, []);
  return <pre>{JSON.stringify(bundle)}</pre>;
}

// -----------------------------------------------------------------------------
// Q3: Dependent fetch (waterfall unavoidable)
//
// Task:
// First user, then posts by user.id.
//
// In simple words:
// Sometimes serial is required. Staged loading in UI is OK.
// -----------------------------------------------------------------------------
function Dependent() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    let alive = true;
    (async () => {
      const user = await fetch("/api/me").then((r) => r.json());
      const posts = await fetch(`/api/users/${user.id}/posts`).then((r) =>
        r.json()
      );
      if (alive) setPosts(posts);
    })();
    return () => {
      alive = false;
    };
  }, []);
  return <ul>{posts.map((p) => <li key={p.id}>{p.title}</li>)}</ul>;
}

// -----------------------------------------------------------------------------
// Q4: AbortController cancel
//
// Task:
// abort in cleanup — on unmount / dep change.
//
// In simple words:
// Reduces race conditions and wasted network.
// -----------------------------------------------------------------------------
function AbortFetch({ id }) {
  const [data, setData] = useState(null);
  useEffect(() => {
    const ac = new AbortController();
    fetch(`/api/items/${id}`, { signal: ac.signal })
      .then((r) => r.json())
      .then(setData)
      .catch((e) => {
        if (e.name !== "AbortError") console.error(e);
      });
    return () => ac.abort();
  }, [id]);
  return <pre>{JSON.stringify(data)}</pre>;
}

// -----------------------------------------------------------------------------
// Q5: [MID] Stale-while-revalidate sketch
//
// Task:
// Show old data, refresh in background, then update.
//
// In simple words:
// SWR/RQ idea. Snappy UX. Cache key.
// -----------------------------------------------------------------------------
const cache = new Map();
function useSWRLite(key, fetcher) {
  const [data, setData] = useState(() => cache.get(key));
  useEffect(() => {
    let alive = true;
    fetcher(key).then((fresh) => {
      cache.set(key, fresh);
      if (alive) setData(fresh);
    });
    return () => {
      alive = false;
    };
  }, [key, fetcher]);
  return data;
}

// -----------------------------------------------------------------------------
// Q6: Optimistic UI sketch
//
// Task:
// Like button — UI +1 first, rollback on fail.
//
// In simple words:
// Fast feel. Error handling is required.
// -----------------------------------------------------------------------------
function Like({ initial }) {
  const [likes, setLikes] = useState(initial);
  async function like() {
    const prev = likes;
    setLikes(prev + 1);
    try {
      await fetch("/api/like", { method: "POST" });
    } catch {
      setLikes(prev);
    }
  }
  return <button onClick={like}>{likes} ♥</button>;
}

// -----------------------------------------------------------------------------
// Q7: [MID] Don't fetch in render
//
// Task:
// Do not fetch() in component body — infinite / duplicate.
//
// In simple words:
// Effect, event, loader, or lib. Render stays pure.
// -----------------------------------------------------------------------------
function Bad() {
  // fetch("/api"); // ❌ render phase
  return null;
}

// -----------------------------------------------------------------------------
// Q8: Loading skeletons vs spinner
//
// Task:
// Reserve list shape — skeleton.
//
// In simple words:
// Better perceived performance. Less layout shift.
// -----------------------------------------------------------------------------
function UserList({ loading, users }) {
  if (loading) {
    return (
      <div>
        <div className="skeleton" />
        <div className="skeleton" />
      </div>
    );
  }
  return (
    <ul>
      {users.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
}

// -----------------------------------------------------------------------------
// Q9: Fetch on button — user-triggered load
//
// Task:
// Not auto on mount; load() on button click — intentional fetch.
//
// In simple words:
// Like search/submit — event driven instead of empty-deps effect.
// -----------------------------------------------------------------------------
function FetchOnClick() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  async function load() {
    setLoading(true);
    const json = await fetch("/api/items").then((r) => r.json());
    setData(json);
    setLoading(false);
  }
  return (
    <div>
      <button onClick={load} disabled={loading}>
        {loading ? "..." : "Load"}
      </button>
      <pre>{JSON.stringify(data)}</pre>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q10: [MID] Race condition — ignore stale response
//
// Task:
// id changes fast — do not setState if first slow response arrives late.
//
// In simple words:
// Request id / ignore flag — do not show stale data on screen.
// -----------------------------------------------------------------------------
function RaceSafe({ id }) {
  const [item, setItem] = useState(null);
  useEffect(() => {
    let ignore = false;
    fetch(`/api/items/${id}`)
      .then((r) => r.json())
      .then((data) => {
        if (!ignore) setItem(data);
      });
    return () => {
      ignore = true;
    };
  }, [id]);
  return <pre>{JSON.stringify(item)}</pre>;
}

// -----------------------------------------------------------------------------
// Q11: Dedupe — same key concurrent request only once
//
// Task:
// inflight Map — two components same fetch share one promise.
//
// In simple words:
// Double mount / StrictMode — less network waste.
// -----------------------------------------------------------------------------
const inflight = new Map();
function fetchDeduped(url) {
  if (inflight.has(url)) return inflight.get(url);
  const p = fetch(url)
    .then((r) => r.json())
    .finally(() => inflight.delete(url));
  inflight.set(url, p);
  return p;
}

// -----------------------------------------------------------------------------
// Q12: [MID] React Query contrast — cache + staleTime
//
// Task:
// useQuery caches by key; refetch on window focus by default.
//
// In simple words:
// Manual useState+effect vs lib — explain tradeoffs in interview.
// -----------------------------------------------------------------------------
function RQContrastNote() {
  return (
    <p>
      React Query: queryKey cache, staleTime, retry, dedupe built-in. Manual =
      build it all yourself.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q13: Cache invalidation sketch
//
// Task:
// After POST success: cache.delete(key) or queryClient.invalidate.
//
// In simple words:
// After mutate, do not show old data — trigger refresh.
// -----------------------------------------------------------------------------
function invalidate(key) {
  cache.delete(key);
}

// -----------------------------------------------------------------------------
// Q14: [MID] Suspense fetch — use() + resource pattern
//
// Task:
// Pending promise in cache; component use(resource.read()) suspends.
//
// In simple words:
// React 19 data Suspense — throw promise while pending (lib or custom).
// -----------------------------------------------------------------------------
function createResource(promise) {
  let status = "pending";
  let result;
  const suspender = promise.then(
    (r) => {
      status = "success";
      result = r;
    },
    (e) => {
      status = "error";
      result = e;
    }
  );
  return {
    read() {
      if (status === "pending") throw suspender;
      if (status === "error") throw result;
      return result;
    },
  };
}

// -----------------------------------------------------------------------------
// Q15: Polling — setInterval + cleanup
//
// Task:
// interval in useEffect; return clearInterval — safe on unmount.
//
// In simple words:
// Live dashboard — stop polling when component is gone.
// -----------------------------------------------------------------------------
function PollStatus() {
  const [status, setStatus] = useState("...");
  useEffect(() => {
    const id = setInterval(() => {
      fetch("/api/status")
        .then((r) => r.json())
        .then((d) => setStatus(d.text));
    }, 5000);
    return () => clearInterval(id);
  }, []);
  return <p>{status}</p>;
}

// -----------------------------------------------------------------------------
// Q16: [MID] Retry with backoff sketch
//
// Task:
// On fail: wait 1s, 2s, 4s — max 3 tries then error UI.
//
// In simple words:
// Flaky network — do not give up immediately for the user.
// -----------------------------------------------------------------------------
async function fetchWithRetry(url, tries = 3) {
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(String(res.status));
      return res.json();
    } catch (e) {
      if (i === tries - 1) throw e;
      await new Promise((r) => setTimeout(r, 1000 * 2 ** i));
    }
  }
}

// -----------------------------------------------------------------------------
// Q17: [ADV] Waterfall vs parallel — explain with diagram
//
// Task:
// Serial: A→B→C time sum. Parallel: max(A,B,C).
//
// In simple words:
// Independent calls: Promise.all; dependent: unavoidable serial.
// -----------------------------------------------------------------------------
function WaterfallNote() {
  return (
    <p>
      Waterfall: user wait then posts wait. Parallel: both at once — when
      independent.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q18: [ADV] SWR revalidate on focus
//
// Task:
// Tab back → background refetch; keep showing old data.
//
// In simple words:
// stale-while-revalidate UX — SWR/RQ default behavior idea.
// -----------------------------------------------------------------------------
function SWRFocusNote() {
  return (
    <p>
      SWR: show cache, revalidate on window focus — fresh data without blank
      screen.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q19: [ADV] Server state vs UI state split
//
// Task:
// API data → query cache; modal open → useState local.
//
// In simple words:
// Do not put everything in one object — server state in lib, UI state in component.
// -----------------------------------------------------------------------------
function StateSplitNote() {
  return (
    <p>
      Server state (remote, cacheable) separate; UI state (tabs, inputs) local —
      do not mix unnecessarily in one giant store.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q20: [ADV] Prefetch route data on hover
//
// Task:
// Link hover → queryClient.prefetchQuery or fetch to warm cache.
//
// In simple words:
// Navigation feels instant — data ready before click.
// -----------------------------------------------------------------------------
function PrefetchDataNote() {
  return <p>Prefetch on hover intent — data in cache by click time.</p>;
}

// -----------------------------------------------------------------------------
// Q21: [ADV] Where to fetch — effect vs event vs loader
//
// Task:
// Mount data → effect/loader; user action → event; render → ❌
//
// In simple words:
// Interview golden rule: render pure, side effects in controlled places.
// -----------------------------------------------------------------------------
function WhereFetchNote() {
  return (
    <ol>
      <li>Mount/page data: useEffect or route loader</li>
      <li>Button/search: event handler</li>
      <li>Render body: never</li>
    </ol>
  );
}

// -----------------------------------------------------------------------------
// Q22: [ADV] Interview — fetch patterns in one minute
//
// Task:
// Triad UI, race cleanup, parallel, SWR mental model, RQ note, Suspense use().
//
// In simple words:
// Mid interview checklist — summary of this file.
// -----------------------------------------------------------------------------
function FetchInterview() {
  return (
    <ol>
      <li>loading/success/error triad</li>
      <li>AbortController + ignore flag (race)</li>
      <li>Promise.all parallel; serial when dependent</li>
      <li>SWR: stale show + background refresh</li>
      <li>React Query: cache keys, invalidation</li>
      <li>Suspense: use() / resource throw promise</li>
    </ol>
  );
}

export {
  UsersClassic,
  Parallel,
  Dependent,
  AbortFetch,
  useSWRLite,
  Like,
  Bad,
  UserList,
  FetchOnClick,
  RaceSafe,
  fetchDeduped,
  RQContrastNote,
  invalidate,
  createResource,
  PollStatus,
  fetchWithRetry,
  WaterfallNote,
  SWRFocusNote,
  StateSplitNote,
  PrefetchDataNote,
  WhereFetchNote,
  FetchInterview,
};
