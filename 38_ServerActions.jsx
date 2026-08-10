// ============================================================================
// 38 — Server Actions ('use server')
// Level: REACT19  |  Study in order: read this file first, then the next number
// ============================================================================
//
// SIMPLE: A Server Action is a function that runs on the SERVER, but can be triggered from the CLIENT
// via a call or a form.
//
// At the top of a file or function: 'use server'
// Form: action={serverAction} — progressive enhancement friendly (frameworks).
// Client: await serverAction(data) as well (with rules).
//
// Think of a remote control: the button is at home (client), the TV in the kitchen (server) changes the channel.
// A serialized call goes over the network — not magic, more like RPC.
//
// WHY: Pairs with Next.js + React 19 forms; common in mid-level interviews.
// INTERVIEW: validation/auth required; secrets; revalidate; vs API route.
//
// ============================================================================

// -----------------------------------------------------------------------------
// Q1: File-level 'use server'
//
// In simple words:
// The whole file exports server actions.
// Client components can import actions and call them / attach to forms.
// -----------------------------------------------------------------------------
// "use server";
//
// export async function createPost(formData) {
//   const title = formData.get("title");
//   await db.posts.insert({ title });
// }

// -----------------------------------------------------------------------------
// Q2: Inline / function-level 'use server'
//
// In simple words:
// Inside a Server Component, async function with 'use server' as first line.
// Closures: only close over serializable values — heavy gotcha.
// -----------------------------------------------------------------------------
// // Server Component file:
// export default function Page() {
//   async function addItem(formData) {
//     "use server";
//     // await db...
//   }
//   return <form action={addItem}>...</form>;
// }

// -----------------------------------------------------------------------------
// Q3: Server Action in form
//
// In simple words:
// Framework can handle POST even without client JS (progressive).
// React 19 action={fn} model shows its power here.
// -----------------------------------------------------------------------------
// import { createPost } from "./actions";
//
// export function NewPostForm() {
//   return (
//     <form action={createPost}>
//       <input name="title" />
//       <button type="submit">Create</button>
//     </form>
//   );
// }

// -----------------------------------------------------------------------------
// Q4: [MID] Call from Client Component
//
// In simple words:
// 'use client' file imports action and uses onClick / await createPost().
// Returns serializable result. Errors handle try/catch.
// Still executes on server — no source secrets in browser.
// -----------------------------------------------------------------------------
// "use client";
// import { createPost } from "./actions";
//
// export function ClientCreate() {
//   return (
//     <button
//       onClick={async () => {
//         await createPost(new FormData());
//       }}
//     >
//       Create
//     </button>
//   );
// }

// -----------------------------------------------------------------------------
// Q5: useActionState + Server Action
//
// In simple words:
// Same hook (file 30) — action is now a server function.
// pending UI on client; mutation on server.
// -----------------------------------------------------------------------------
// "use client";
// import { useActionState } from "react";
// import { login } from "./actions";
//
// export function LoginForm() {
//   const [state, formAction, pending] = useActionState(login, { error: null });
//   return (
//     <form action={formAction}>
//       <input name="email" />
//       <button disabled={pending}>Login</button>
//       {state.error}
//     </form>
//   );
// }

// -----------------------------------------------------------------------------
// Q6: [MID] Auth & validation — MUST
//
// In simple words:
// Anyone can hit an action from the client (tampered FormData).
// On server: session check, zod/yup validate, authorize resource.
// UI validation is convenience; server validation is security.
// -----------------------------------------------------------------------------
// "use server";
// export async function deleteUser(formData) {
//   const session = await getSession();
//   if (!session?.isAdmin) throw new Error("Unauthorized");
//   const id = String(formData.get("id"));
//   // validate id...
//   await db.users.delete(id);
// }

// -----------------------------------------------------------------------------
// Q7: revalidate / cache update (Next mental model)
//
// In simple words:
// After mutation, do not leave a stale page.
// revalidatePath / revalidateTag (Next) common.
// Other frameworks: your own cache invalidation.
// -----------------------------------------------------------------------------
const afterMutation = ["revalidatePath", "revalidateTag", "router.refresh()"];

// -----------------------------------------------------------------------------
// Q8: [MID] Server Action vs API Route
//
// In simple words:
// Action: tight React/forms integration, typed imports, less boilerplate.
// API route: public HTTP API, webhooks, non-React clients.
// Both are valid — choose by use case.
// -----------------------------------------------------------------------------
const compare = {
  serverAction: "first-class for React forms/mutations in supported frameworks",
  apiRoute: "generic HTTP for any client",
};

// -----------------------------------------------------------------------------
// Q9: Errors & return values
//
// In simple words:
// throw → error UI / boundary depending on setup.
// return { error: '...' } → useActionState friendly (no throw).
// Prefer a consistent pattern on the team.
// -----------------------------------------------------------------------------
// export async function save(prev, formData) {
//   "use server";
//   try {
//     await db.save(...);
//     return { ok: true, error: null };
//   } catch {
//     return { ok: false, error: "Failed" };
//   }
// }

// -----------------------------------------------------------------------------
// Q10: [MID] Security checklist interview answer
//
// In simple words:
// 1) Authenticate 2) Authorize 3) Validate input 4) No secret leak in returns
// 5) Understand CSRF/framework protections (Next docs).
// -----------------------------------------------------------------------------
export const serverActionSecurity = [
  "authn",
  "authz",
  "validate input",
  "safe return payloads",
  "know framework CSRF story",
];

// -----------------------------------------------------------------------------
// Q11: [MID] FormData tampering — server must re-validate
//
// Task:
// Change hidden fields in Browser DevTools — validate with zod schema on server.
//
// In simple words:
// Client required attribute can be bypassed.
// React 18 API route same threat model.
// Never trust formData.get('role') === 'admin' without a session check.
// Return generic errors — do not leak internals.
// Rate limit destructive actions server-side.
// -----------------------------------------------------------------------------
const formTamperNote =
  "Treat all FormData as hostile — validate types, ranges, ownership on server.";

// -----------------------------------------------------------------------------
// Q12: Idempotent server actions
//
// Task:
// Duplicate submit same idempotency key — double charge avoid.
//
// In simple words:
// Network retry / double click → same action twice is possible.
// React 19 isPending helps on client; server still needs idempotent design.
// React 18 POST API same requirement.
// DB unique constraints + idempotency tokens standard in payments.
// Return same success response on replay OK.
// -----------------------------------------------------------------------------
const idempotentActions =
  "Design mutations idempotent where possible — retries and double-submit happen.";

// -----------------------------------------------------------------------------
// Q13: [MID] Server Action + redirect
//
// Task:
// Login success → redirect('/') from server action (Next redirect() helper).
//
// In simple words:
// Framework helpers throw a special redirect — do not catch it incorrectly.
// React 18 client router.navigate after fetch login manual.
// Progressive enhancement: form POST login redirect without JS is possible.
// Return vs redirect choose per UX.
// -----------------------------------------------------------------------------
export function RedirectActionNote() {
  return (
    <p>
      Frameworks expose redirect() inside server actions for post-login navigation — behavior varies by framework.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q14: Cookies / session in server action
//
// Task:
// await cookies().set('session', token) — server-only APIs.
//
// In simple words:
// HttpOnly cookies cannot be read by client JS — security win.
// React 18 client login sets cookie manually via Set-Cookie header from API response.
// Server action colocates mutation + session update.
// Secrets stay off client bundle.
// -----------------------------------------------------------------------------
const sessionCookieNote =
  "Set HttpOnly session cookies inside server actions — not via client document.cookie for auth tokens.";

// -----------------------------------------------------------------------------
// Q15: [MID] Server Action vs fetch to API route — code compare
//
// Task:
// Action: import { save } from './actions'; form action={save}.
// API: fetch('/api/save', { method:'POST', body }) + JSON parse.
//
// In simple words:
// Action has less boilerplate with typed imports in React apps.
// API route as public contract for mobile app / third party.
// React 18 typically fetch API routes only.
// Both execute server logic — avoid duplication — shared service layer.
// -----------------------------------------------------------------------------
const actionVsFetchBoilerplate = {
  serverAction: "direct import + form action prop",
  apiRoute: "HTTP fetch + manual serialization + error parsing",
};

// -----------------------------------------------------------------------------
// Q16: Closure capture inline server action trap
//
// Task:
// Inline 'use server' closure captures non-serializable value — build/runtime error.
//
// In simple words:
// Capturing productId string OK; capturing DB connection object ❌.
// React 18 N/A — pattern new with inline actions.
// Prefer module-level 'use server' functions for clarity.
// Pass ids via FormData/hidden fields not closures when possible.
// -----------------------------------------------------------------------------
const closureTrap =
  "Inline server actions only close over serializable values — prefer module-level actions.";

// -----------------------------------------------------------------------------
// Q17: [MID] Optimistic UI + server action
//
// Task:
// Client useOptimistic; action={serverFn}; rollback on fail (file 32).
//
// In simple words:
// Server action latency is higher — optimistic UX is valuable.
// React 18 optimistic + fetch API route same combo.
// Client component required for useOptimistic.
// Server returns error object not throw for form validation UX.
// -----------------------------------------------------------------------------
export function OptimisticServerActionNote() {
  return (
    <p>
      useOptimistic on client + server action on submit — rollback when server returns error without base update.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q18: [ADV] CSRF / framework protections
//
// Task:
// Next Server Actions POST with origin checks / encrypted action ids — read your framework docs.
//
// In simple words:
// Do not assume CSRF is impossible — know your framework story.
// React 18 custom API routes need CSRF tokens if cookie auth.
// Same-site cookies + POST-only actions help.
// Interview: "rely on framework + still validate auth".
// -----------------------------------------------------------------------------
const csrfNote =
  "Understand framework CSRF protections for server actions — don't roll custom insecure POST.";

// -----------------------------------------------------------------------------
// Q19: [MID] Logging and observability
//
// Task:
// Structured logs in server action — user id, action name, duration.
//
// In simple words:
// Client console.log secrets ❌; server logs OK with care.
// React 18 API route handlers same observability.
// Correlate with request id tracing production debugging.
// Do not log raw passwords from FormData.
// -----------------------------------------------------------------------------
const serverActionLogging =
  "Log mutations server-side with correlation ids — never log secrets from FormData.";

// -----------------------------------------------------------------------------
// Q20: [ADV] When NOT Server Actions
//
// Task:
// Public REST API products, webhooks Stripe, non-React mobile clients.
//
// In simple words:
// Server Actions are React-centric RPC — not a universal HTTP API replacement.
// React 18 REST remains fine.
// File uploads huge — dedicated storage API sometimes better.
// GraphQL federation — different layer.
// Long-running jobs — queue worker not synchronous action.
// -----------------------------------------------------------------------------
const whenNotServerActions = [
  "public HTTP API for third parties",
  "webhooks from external services",
  "long-running background jobs",
  "non-React clients",
];

// -----------------------------------------------------------------------------
// Q21: [MID] Testing server actions
//
// Task:
// Import action in test; call with FormData; mock db module.
//
// In simple words:
// Unit test server function like service layer.
// Integration test with test DB optional.
// React 18 API route supertest similar.
// Client form E2E separate layer.
// Mock auth getSession in tests.
// -----------------------------------------------------------------------------
export function TestingServerActionsNote() {
  return <p>Test server actions by calling them directly with FormData and mocked db/auth modules.</p>;
}

// -----------------------------------------------------------------------------
// Q22: [ADV] Interview — Server Actions checklist
//
// Task:
// 'use server', form/client call, validate auth, serializable returns, revalidate, CSRF awareness.
//
// In simple words:
// vs React 18: fetch + API routes → less boilerplate in React apps.
// vs API routes: not for public HTTP; Actions for app mutations.
// Traps: trust FormData; closure capture; secrets client-side; no revalidate after mutate.
// Pair useActionState pending UI client-side.
// Security 5-point file Q10 + tampering + idempotency.
// -----------------------------------------------------------------------------
export const serverActionInterviewChecklist = {
  define: "'use server' async functions invoked from forms or client handlers",
  mustDo: ["authenticate", "authorize", "validate input", "safe returns", "cache revalidation"],
  vsApiRoute: "Actions for React app mutations; API routes for public HTTP",
  vsReact18: "less fetch boilerplate; colocated with components",
  traps: ["trusted FormData", "non-serializable closures", "missing revalidate", "no idempotency"],
};
