// ============================================================================
// 37 — Server Components Intro (RSC mental model)
// Level: REACT19  |  Sequence seekho: pehle yeh file, phir agla number
// ============================================================================
//
// LAYMAN: Classic SPA — SAARA React JS bundle browser me; data fetch useEffect.
// Server Components (RSC) — kuch components SERVER pe render hote,
// HTML/payload browser ko milta, unka JS bundle me nahi aata.
//
// Socho restaurant:
//   Server Component = kitchen me dish ready karke plate bhejo (heavy work server).
//   Client Component = table pe interactive (hooks, onClick, browser APIs).
//
// 'use client' = "yahan se neeche CLIENT boundary".
// File ke TOP pe directive. Ek baar client = uske imports bhi client graph.
//
// React 19 is story ko stabilize / mainstream document karta (Next App Router etc.).
//
// KYUN: Mid+ interviews me RSC vs client almost standard.
// INTERVIEW: kab 'use client'; secrets server pe; children slot pattern.
//
// ============================================================================

// -----------------------------------------------------------------------------
// Q1: Default server vs client (Next-style mental model)
//
// Seedha matlab:
// App Router me default = Server Component.
// useState/onClick chahiye → file me 'use client'.
// Vite-only CSR app me sab client — RSC ke liye framework support chahiye.
// -----------------------------------------------------------------------------
// // app/page.js  (Server Component — NO 'use client')
// async function Page() {
//   const data = await db.posts(); // server pe seedha DB
//   return <ul>{data.map(...)}</ul>;
// }

// -----------------------------------------------------------------------------
// Q2: 'use client' boundary
//
// Seedha matlab:
// Directive string bilkul file start (imports se pehle).
// Us file me hooks + events OK.
// Server parent Client child import kar sakta; reverse me careful (server-only code).
// -----------------------------------------------------------------------------
// "use client";
//
// import { useState } from "react";
//
// export function Counter() {
//   const [n, setN] = useState(0);
//   return <button onClick={() => setN(n + 1)}>{n}</button>;
// }

// -----------------------------------------------------------------------------
// Q3: [MID] Server pe kya ALLOWED / DISALLOWED
//
// Seedha matlab:
// Server ✅: async component, await fetch/DB, secrets/env server, heavy libs zero bundle.
// Server ❌: useState, useEffect, browser DOM, onClick (needs client child).
// -----------------------------------------------------------------------------
const serverAllowed = ["async/await fetch", "DB access", "fs (careful)", "render static UI"];
const serverDenied = ["useState", "useEffect", "onClick", "window"];

// -----------------------------------------------------------------------------
// Q4: Composition — Server wraps Client
//
// Seedha matlab:
// ServerComponent data laaye, ClientComponent ko props me serializable data de.
// Functions/classes props me mat bhejo (serialization boundary).
// -----------------------------------------------------------------------------
// // Server
// async function ProductPage() {
//   const product = await getProduct();
//   return <AddToCartButton productId={product.id} />; // client child
// }

// -----------------------------------------------------------------------------
// Q5: [MID] Children slot — Client shell, Server children
//
// Seedha matlab:
// Powerful pattern: Client layout (state) ke ANDAR {children} Server se aaye.
// Children server pe render; client JS children ka code bundle me nahi (as server).
// -----------------------------------------------------------------------------
// "use client";
// export function Modal({ children }) {
//   const [open, setOpen] = useState(false);
//   return open ? <div>{children}</div> : <button onClick={() => setOpen(true)}>Open</button>;
// }
//
// // Server page:
// // <Modal><ExpensiveServerChart /></Modal>

// -----------------------------------------------------------------------------
// Q6: Bundle size intuition
//
// Seedha matlab:
// markdown parser server pe → client bundle me nahi.
// Same lib client component me import → bundle badha.
// Interview gold: "move heavy non-interactive to server".
// -----------------------------------------------------------------------------
const bundleRule =
  "If no interactivity needed, keep it a Server Component — ship less JS.";

// -----------------------------------------------------------------------------
// Q7: [MID] Data fetching — useEffect vs Server await
//
// Seedha matlab:
// CSR: mount → loading → useEffect fetch → setState (waterfall common).
// RSC: await on server → HTML already with data (fast first paint story).
// Client still needed for live refetch / interactions.
// -----------------------------------------------------------------------------
export function CsrFetchContrast() {
  // teaching-only client pattern contrast
  // useEffect(() => { fetch('/api').then(...) }, []);
  return <p>Prefer server await for initial page data when using RSC framework</p>;
}

// -----------------------------------------------------------------------------
// Q8: Serializable props boundary
//
// Seedha matlab:
// Server → Client props: string, number, plain objects/arrays, Map? limited —
// basically JSON-ish + few special types (docs).
// Date care; functions ❌; class instances ❌.
// -----------------------------------------------------------------------------
const serializable = ["string", "number", "plain objects", "arrays", "bigint (check)"];
const notSerializable = ["functions", "class instances", "server DB handles"];

// -----------------------------------------------------------------------------
// Q9: [MID] Secrets
//
// Seedha matlab:
// API keys Server Component / Server Actions me.
// 'use client' file me NEXT_PUBLIC_ / leaked env mat daalo blindly.
// RSC security win = secrets browser me na bhejo.
// -----------------------------------------------------------------------------
const securityLine =
  "Server Components can touch secrets; never pass secrets as client props.";

// -----------------------------------------------------------------------------
// Q10: When NOT to force everything server
//
// Seedha matlab:
// Highly interactive UI, optimistic updates, local device APIs → client.
// Hybrid: server page shell + client islands.
// -----------------------------------------------------------------------------
export const hybridIdea = {
  server: "data + static structure",
  client: "buttons, forms interactivity, local state",
};

// -----------------------------------------------------------------------------
// Q11: [MID] 'use client' propagation — import graph
//
// Kya karna hai:
// Client file jo server-only module import kare — build error / accidental bundle.
//
// Seedha matlab:
// 'use client' file ke imports client bundle me aate hain.
// Server Component can import Client — OK.
// Client importing fs/DB server module ❌.
// React 18: sab client tha — yeh split naya.
// Fix: server actions / API boundaries; pass serializable props only.
// -----------------------------------------------------------------------------
const clientBoundaryRule =
  "use client marks boundary — its imports pull into client graph; don't import server secrets.";

// -----------------------------------------------------------------------------
// Q12: async Server Component pattern
//
// Kya karna hai:
// async function Page() { const data = await db.query(); return <UI data={data} />; }
//
// Seedha matlab:
// No useEffect fetch on mount for initial data — await on server.
// React 18 CSR: useEffect waterfall.
// Suspense boundaries stream partial HTML (framework dependent).
// Error: try/catch server + error.tsx patterns in Next.
// -----------------------------------------------------------------------------
export function AsyncServerPatternNote() {
  return (
    <p>
      Server components can be async functions awaiting DB/API before render — zero client JS for that logic.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q13: [MID] Client-only libraries (charts, maps)
//
// Kya karna hai:
// recharts / leaflet → 'use client' wrapper component import in server page.
//
// Seedha matlab:
// Server page shell + ClientChart data={serializable} props.
// React 18: dynamic import ssr:false similar idea Pages router.
// Bundle: chart lib client chunk — expected.
// When NOT client: static SVG server rendered — creative alternative.
// -----------------------------------------------------------------------------
export function ClientChartWrapperNote() {
  return (
    <p>
      Wrap third-party interactive libs in client components; server page passes data props.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q14: Zero bundle mental model — interview gold
//
// Kya karna hai:
// markdown-it server only → HTML string client ko; client JS parser nahi.
//
// Seedha matlab:
// "Does this code need to run in browser?" — no → server component candidate.
// React 18: code split only reduces, still ships if imported client-side.
// RSC: module never in client bundle if only imported server-side.
// Measure: analyze bundle before/after moving to server.
// -----------------------------------------------------------------------------
const zeroBundleLine =
  "Server-only imports never ship to browser bundle — stronger than lazy().";

// -----------------------------------------------------------------------------
// Q15: [MID] use client at file top — comments allowed?
//
// Kya karna hai:
// Directive must be before imports (except some bundlers allow comment block first — follow framework docs).
//
// Seedha matlab:
// Next: "use client" first line typically.
// Wrong placement → treated as server → hooks error confusing.
// React 18 N/A.
// Common bug: directive after imports → not a client component.
// -----------------------------------------------------------------------------
const directivePlacement =
  "'use client' at file top before imports — wrong placement causes mysterious hook errors.";

// -----------------------------------------------------------------------------
// Q16: Server Component me context provider?
//
// Kya karna hai:
// Server can render <ThemeContext value> wrapping client children — value serializable.
//
// Seedha matlab:
// Client consumers useContext below client boundary.
// Function values in context → client provider needed.
// React 18 all client — no split.
// Pattern: ClientProviders layout wraps {children} server pages.
// -----------------------------------------------------------------------------
export function ServerProviderNote() {
  return (
    <p>
      Server can render context wrapper with serializable values; functions belong in client providers.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q17: [MID] Partial Prerendering / streaming (conceptual)
//
// Kya karna hai:
// Static shell fast; dynamic holes Suspense stream — Next PPR direction.
//
// Seedha matlab:
// React 18 Suspense client-side; RSC streaming server HTML chunks.
// Interview high-level: faster TTFB + progressive fill.
// Exact API framework-specific — don't invent from memory.
// Fallback UI meaningful during stream.
// -----------------------------------------------------------------------------
const streamingNote =
  "RSC + Suspense enable streaming HTML; frameworks implement PPR/stream details.";

// -----------------------------------------------------------------------------
// Q18: [ADV] Anti-pattern — entire app 'use client'
//
// Kya karna hai:
// Root layout client → RSC benefits mostly gone.
//
// Seedha matlab:
// "use client" at app root except providers = basically SPA in App Router.
// React 18 equivalent — normal.
// Fix: push client boundaries down to interactive leaves.
// Server pages for data; client islands for buttons/forms.
// -----------------------------------------------------------------------------
export function AvoidRootClientNote() {
  return <p>Keep use client at leaves — not root layout unless necessary.</p>;
}

// -----------------------------------------------------------------------------
// Q19: [MID] Environment variables RSC
//
// Kya karna hai:
// process.env.SECRET server component OK; NEXT_PUBLIC_* client visible.
//
// Seedha matlab:
// React 18 CRA/Vite: only VITE_* exposed — same security mindset.
// Never pass secret as prop to client child.
// Server embed secret in fetch server-side only.
// Interview security win RSC vs CSR data fetching.
// -----------------------------------------------------------------------------
const envRscRule =
  "Server env secrets OK on server components; client only public prefixed env vars.";

// -----------------------------------------------------------------------------
// Q20: [ADV] CSR-only apps — RSC N/A
//
// Kya karna hai:
// Vite + React DOM client — no Server Components without major framework add-on.
//
// Seedha matlab:
// React 19 features useActionState etc. still work CSR.
// RSC mental model interview me bolo: "needs framework like Next App Router".
// React 18 vs 19 CSR: Actions/hooks still upgrade value.
// Don't force RSC concepts where stack doesn't support.
// -----------------------------------------------------------------------------
export function CsrOnlyNote() {
  return (
    <p>Vite SPA: learn RSC conceptually for interviews; use React 19 client hooks locally.</p>
  );
}

// -----------------------------------------------------------------------------
// Q21: [MID] Children slot pattern recap + trap
//
// Kya karna hai:
// Client Modal {children} server content — children server-rendered through slot.
//
// Seedha matlab:
// Powerful — modal client, heavy list server.
// Trap: pass server component as prop vs children — Next composition rules padho.
// React 18 no equivalent slot server/client split.
// Improves bundle vs importing server list inside client modal file wrongly.
// -----------------------------------------------------------------------------
const childrenSlotTrap =
  "Pass server content as children into client shell — don't import server components into client files incorrectly.";

// -----------------------------------------------------------------------------
// Q22: [ADV] Interview — RSC rapid answers
//
// Kya karna hai:
// Default server (Next), use client for hooks/events, serializable props, secrets server-side.
//
// Seedha matlab:
// vs React 18 CSR: less client JS, server data colocated, hybrid islands.
// When NOT: no framework support, highly client-only app, whole app interactive.
// Traps: client imports server code; non-serializable props; root use client; secrets in client env.
// Bundle: move heavy non-interactive code server-side.
// Pair with Server Actions (file 38) for mutations.
// -----------------------------------------------------------------------------
export const rscInterviewSummary = {
  default: "Server Components in supported frameworks (Next App Router)",
  clientBoundary: "'use client' for hooks, events, browser APIs",
  props: "serializable only server → client",
  security: "secrets and DB on server only",
  whenNot: ["Vite CSR only stack", "fully interactive app", "no RSC framework"],
  traps: ["client importing server modules", "non-serializable props", "use client at root"],
};
