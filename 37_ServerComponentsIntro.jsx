// ============================================================================
// 37 — Server Components Intro (RSC mental model)
// Level: REACT19  |  Study in order: read this file first, then the next number
// ============================================================================
//
// SIMPLE: Classic SPA — the entire React JS bundle goes to the browser; data is fetched in useEffect.
// Server Components (RSC) — some components render on the SERVER,
// the browser gets HTML/payload, and their JS does not go into the bundle.
//
// Think of a restaurant:
//   Server Component = prepare the dish in the kitchen and send the plate (heavy work on the server).
//   Client Component = interactive at the table (hooks, onClick, browser APIs).
//
// 'use client' = "CLIENT boundary from here downward".
// Put the directive at the TOP of the file. Once client = its imports join the client graph too.
//
// React 19 stabilizes and mainstreams this story (Next App Router, etc.).
//
// WHY: RSC vs client is almost standard in mid+ interviews.
// INTERVIEW: when to use 'use client'; secrets on server; children slot pattern.
//
// ============================================================================

// -----------------------------------------------------------------------------
// Q1: Default server vs client (Next-style mental model)
//
// In simple words:
// In App Router, default = Server Component.
// Need useState/onClick → add 'use client' to the file.
// In Vite-only CSR apps everything is client — RSC needs framework support.
// -----------------------------------------------------------------------------
// // app/page.js  (Server Component — NO 'use client')
// async function Page() {
//   const data = await db.posts(); // DB directly on server
//   return <ul>{data.map(...)}</ul>;
// }

// -----------------------------------------------------------------------------
// Q2: 'use client' boundary
//
// In simple words:
// Put the directive string at the very start of the file (before imports).
// Hooks + events are OK in that file.
// Server parent can import Client child; be careful the other way (server-only code).
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
// Q3: [MID] What is ALLOWED / DISALLOWED on the server
//
// In simple words:
// Server ✅: async component, await fetch/DB, secrets/env on server, heavy libs with zero bundle.
// Server ❌: useState, useEffect, browser DOM, onClick (needs client child).
// -----------------------------------------------------------------------------
const serverAllowed = ["async/await fetch", "DB access", "fs (careful)", "render static UI"];
const serverDenied = ["useState", "useEffect", "onClick", "window"];

// -----------------------------------------------------------------------------
// Q4: Composition — Server wraps Client
//
// In simple words:
// ServerComponent fetches data, gives ClientComponent serializable data in props.
// Do not send functions/classes in props (serialization boundary).
// -----------------------------------------------------------------------------
// // Server
// async function ProductPage() {
//   const product = await getProduct();
//   return <AddToCartButton productId={product.id} />; // client child
// }

// -----------------------------------------------------------------------------
// Q5: [MID] Children slot — Client shell, Server children
//
// In simple words:
// Powerful pattern: {children} from the Server come INSIDE a Client layout (state).
// Children render on server; client JS does not include children's code in the bundle (as server).
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
// In simple words:
// markdown parser on server → not in client bundle.
// Same lib imported in client component → bundle grows.
// Interview gold: "move heavy non-interactive work to the server".
// -----------------------------------------------------------------------------
const bundleRule =
  "If no interactivity needed, keep it a Server Component — ship less JS.";

// -----------------------------------------------------------------------------
// Q7: [MID] Data fetching — useEffect vs Server await
//
// In simple words:
// CSR: mount → loading → useEffect fetch → setState (waterfall is common).
// RSC: await on server → HTML already with data (fast first paint story).
// Client is still needed for live refetch / interactions.
// -----------------------------------------------------------------------------
export function CsrFetchContrast() {
  // teaching-only client pattern contrast
  // useEffect(() => { fetch('/api').then(...) }, []);
  return <p>Prefer server await for initial page data when using RSC framework</p>;
}

// -----------------------------------------------------------------------------
// Q8: Serializable props boundary
//
// In simple words:
// Server → Client props: string, number, plain objects/arrays, Map? limited —
// basically JSON-ish + a few special types (see docs).
// Be careful with Date; functions ❌; class instances ❌.
// -----------------------------------------------------------------------------
const serializable = ["string", "number", "plain objects", "arrays", "bigint (check)"];
const notSerializable = ["functions", "class instances", "server DB handles"];

// -----------------------------------------------------------------------------
// Q9: [MID] Secrets
//
// In simple words:
// API keys belong in Server Component / Server Actions.
// Do not blindly put NEXT_PUBLIC_ / leaked env in 'use client' files.
// RSC security win = do not send secrets to the browser.
// -----------------------------------------------------------------------------
const securityLine =
  "Server Components can touch secrets; never pass secrets as client props.";

// -----------------------------------------------------------------------------
// Q10: When NOT to force everything server
//
// In simple words:
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
// Task:
// Client file that imports server-only module — build error / accidental bundle.
//
// In simple words:
// 'use client' file imports go into the client bundle.
// Server Component can import Client — OK.
// Client importing fs/DB server module ❌.
// React 18: everything was client — this split is new.
// Fix: server actions / API boundaries; pass serializable props only.
// -----------------------------------------------------------------------------
const clientBoundaryRule =
  "use client marks boundary — its imports pull into client graph; don't import server secrets.";

// -----------------------------------------------------------------------------
// Q12: async Server Component pattern
//
// Task:
// async function Page() { const data = await db.query(); return <UI data={data} />; }
//
// In simple words:
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
// Task:
// recharts / leaflet → import in a 'use client' wrapper component on the server page.
//
// In simple words:
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
// Task:
// markdown-it server only → HTML string to client; no client JS parser.
//
// In simple words:
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
// Task:
// Directive must be before imports (except some bundlers allow comment block first — follow framework docs).
//
// In simple words:
// Next: "use client" first line typically.
// Wrong placement → treated as server → confusing hooks error.
// React 18 N/A.
// Common bug: directive after imports → not a client component.
// -----------------------------------------------------------------------------
const directivePlacement =
  "'use client' at file top before imports — wrong placement causes mysterious hook errors.";

// -----------------------------------------------------------------------------
// Q16: Context provider in Server Component?
//
// Task:
// Server can render <ThemeContext value> wrapping client children — value must be serializable.
//
// In simple words:
// Client consumers use useContext below the client boundary.
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
// Task:
// Static shell fast; dynamic holes Suspense stream — Next PPR direction.
//
// In simple words:
// React 18 Suspense client-side; RSC streaming server HTML chunks.
// Interview high-level: faster TTFB + progressive fill.
// Exact API is framework-specific — do not invent from memory.
// Fallback UI meaningful during stream.
// -----------------------------------------------------------------------------
const streamingNote =
  "RSC + Suspense enable streaming HTML; frameworks implement PPR/stream details.";

// -----------------------------------------------------------------------------
// Q18: [ADV] Anti-pattern — entire app 'use client'
//
// Task:
// Root layout client → RSC benefits mostly gone.
//
// In simple words:
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
// Task:
// process.env.SECRET server component OK; NEXT_PUBLIC_* client visible.
//
// In simple words:
// React 18 CRA/Vite: only VITE_* exposed — same security mindset.
// Never pass secret as prop to client child.
// Embed secret in server-side fetch only.
// Interview security win RSC vs CSR data fetching.
// -----------------------------------------------------------------------------
const envRscRule =
  "Server env secrets OK on server components; client only public prefixed env vars.";

// -----------------------------------------------------------------------------
// Q20: [ADV] CSR-only apps — RSC N/A
//
// Task:
// Vite + React DOM client — no Server Components without major framework add-on.
//
// In simple words:
// React 19 features useActionState etc. still work CSR.
// In interviews say the RSC mental model: "needs a framework like Next App Router".
// React 18 vs 19 CSR: Actions/hooks still upgrade value.
// Do not force RSC concepts where the stack does not support them.
// -----------------------------------------------------------------------------
export function CsrOnlyNote() {
  return (
    <p>Vite SPA: learn RSC conceptually for interviews; use React 19 client hooks locally.</p>
  );
}

// -----------------------------------------------------------------------------
// Q21: [MID] Children slot pattern recap + trap
//
// Task:
// Client Modal {children} with server content — children server-rendered through slot.
//
// In simple words:
// Powerful — modal is client, heavy list is server.
// Trap: pass server component as prop vs children — read Next composition rules.
// React 18 no equivalent slot server/client split.
// Improves bundle vs wrongly importing server list inside client modal file.
// -----------------------------------------------------------------------------
const childrenSlotTrap =
  "Pass server content as children into client shell — don't import server components into client files incorrectly.";

// -----------------------------------------------------------------------------
// Q22: [ADV] Interview — RSC rapid answers
//
// Task:
// Default server (Next), use client for hooks/events, serializable props, secrets server-side.
//
// In simple words:
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
