// ============================================================================
// 23 — Data Fetching Patterns
// Level: MID  |  Sequence: pehle yeh, phir agla number
// ============================================================================
//
// LAYMAN: Server se data lana — loading, success, error teen states.
// Pattern 1: useEffect + fetch + useState (classic).
// Pattern 2: custom useFetch. Pattern 3: libs (React Query/SWR) — cache, retry.
// Race, cleanup, stale — pehle cover (09). Yahan UI patterns jodna.
//
// KYUN: Har real app fetch karti. Interview me race + loading UI poochte.
// INTERVIEW: where to fetch; caching; waterfalls; parallel requests.
// Vite/React 19 project me use — teaching file.
//
// ============================================================================

import { useEffect, useRef, useState } from "react";

// -----------------------------------------------------------------------------
// Q1: Classic status triad
//
// Kya karna hai:
// idle/loading/success/error UI.
//
// Seedha matlab:
// Ek status string ya flags — user ko feedback.
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
// Kya karna hai:
// Promise.all([fetchA, fetchB])
//
// Seedha matlab:
// Waterfall mat banao jab independent. Parallel = tez.
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
// Kya karna hai:
// Pehle user, phir user.id se posts.
//
// Seedha matlab:
// Kabhi serial zaroori. UI me staged loading OK.
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
// Kya karna hai:
// cleanup me abort — unmount / dep change.
//
// Seedha matlab:
// Race + wasted network dono kam.
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
// Kya karna hai:
// Purana data dikhao, peeche refresh, phir update.
//
// Seedha matlab:
// SWR/RQ idea. UX snappy. Cache key.
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
// Kya karna hai:
// Like button — pehle UI +1, fail pe rollback.
//
// Seedha matlab:
// Fast feel. Error handling zaroori.
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
// Kya karna hai:
// Component body me fetch() mat — infinite / duplicate.
//
// Seedha matlab:
// Effect, event, loader, or lib. Render pure.
// -----------------------------------------------------------------------------
function Bad() {
  // fetch("/api"); // ❌ render phase
  return null;
}

// -----------------------------------------------------------------------------
// Q8: Loading skeletons vs spinner
//
// Kya karna hai:
// List shape reserve — skeleton.
//
// Seedha matlab:
// Perceived performance. Layout shift kam.
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
// Kya karna hai:
// Mount pe auto nahi; button click pe load() — intentional fetch.
//
// Seedha matlab:
// Search/submit jaisa — empty deps effect ki jagah event driven.
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
// Q10: [MID] Race condition — purana response ignore
//
// Kya karna hai:
// id change fast — pehli slow response baad me aaye to setState mat.
//
// Seedha matlab:
// Request id / ignore flag — stale data screen pe mat dikhao.
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
// Q11: Dedupe — same key concurrent request ek hi
//
// Kya karna hai:
// inflight Map — do component same fetch kare to ek promise share.
//
// Seedha matlab:
// Double mount / StrictMode — network waste kam.
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
// Kya karna hai:
// useQuery key se cache; refetch on window focus default.
//
// Seedha matlab:
// Manual useState+effect vs lib — interview me tradeoffs bolo.
// -----------------------------------------------------------------------------
function RQContrastNote() {
  return (
    <p>
      React Query: queryKey cache, staleTime, retry, dedupe built-in. Manual =
      sab khud.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q13: Cache invalidation sketch
//
// Kya karna hai:
// POST success ke baad cache.delete(key) ya queryClient.invalidate.
//
// Seedha matlab:
// Mutate ke baad purana data mat dikhao — refresh trigger.
// -----------------------------------------------------------------------------
function invalidate(key) {
  cache.delete(key);
}

// -----------------------------------------------------------------------------
// Q14: [MID] Suspense fetch — use() + resource pattern
//
// Kya karna hai:
// Cache me pending promise; component use(resource.read()) suspend.
//
// Seedha matlab:
// React 19 data Suspense — throw promise while pending (lib ya custom).
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
// Kya karna hai:
// useEffect me interval; return clearInterval — unmount safe.
//
// Seedha matlab:
// Live dashboard — polling band jab component gayab.
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
// Kya karna hai:
// Fail pe 1s, 2s, 4s wait — max 3 try phir error UI.
//
// Seedha matlab:
// Flaky network — user ko turant give up mat dikhao.
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
// Q17: [ADV] Waterfall vs parallel — diagram bolke
//
// Kya karna hai:
// Serial: A→B→C time sum. Parallel: max(A,B,C).
//
// Seedha matlab:
// Independent calls Promise.all; dependent unavoidable serial.
// -----------------------------------------------------------------------------
function WaterfallNote() {
  return (
    <p>
      Waterfall: user wait then posts wait. Parallel: dono ek saath — jab
      independent ho tab.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q18: [ADV] SWR revalidate on focus
//
// Kya karna hai:
// Tab wapas aao → background refetch; purana data dikhte reh.
//
// Seedha matlab:
// stale-while-revalidate UX — SWR/RQ default behavior idea.
// -----------------------------------------------------------------------------
function SWRFocusNote() {
  return (
    <p>
      SWR: cache dikhao, window focus pe revalidate — data fresh bina blank
      screen.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q19: [ADV] Server state vs UI state split
//
// Kya karna hai:
// API data → query cache; modal open → useState local.
//
// Seedha matlab:
// Sab ek object me mat — server state lib, UI state component me.
// -----------------------------------------------------------------------------
function StateSplitNote() {
  return (
    <p>
      Server state (remote, cacheable) alag; UI state (tabs, inputs) local —
      mix mat karo ek giant store me unnecessarily.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q20: [ADV] Prefetch route data on hover
//
// Kya karna hai:
// Link hover → queryClient.prefetchQuery ya fetch warm cache.
//
// Seedha matlab:
// Navigation feel instant — data pehle se ready.
// -----------------------------------------------------------------------------
function PrefetchDataNote() {
  return <p>Hover intent pe prefetch — click tak data cache me.</p>;
}

// -----------------------------------------------------------------------------
// Q21: [ADV] Fetch kahan — effect vs event vs loader
//
// Kya karna hai:
// Mount data → effect/loader; user action → event; render → ❌
//
// Seedha matlab:
// Interview golden rule: render pure, side effects controlled jagah.
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
// Q22: [ADV] Interview — fetch patterns ek minute me
//
// Kya karna hai:
// Triad UI, race cleanup, parallel, SWR mental model, RQ note, Suspense use().
//
// Seedha matlab:
// Mid interview checklist — yahi file ka summary.
// -----------------------------------------------------------------------------
function FetchInterview() {
  return (
    <ol>
      <li>loading/success/error triad</li>
      <li>AbortController + ignore flag (race)</li>
      <li>Promise.all parallel; serial jab dependent</li>
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
