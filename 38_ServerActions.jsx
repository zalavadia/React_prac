// ============================================================================
// 38 — Server Actions ('use server')
// Level: REACT19  |  Sequence seekho: pehle yeh file, phir agla number
// ============================================================================
//
// LAYMAN: Server Action = function jo SERVER pe chalti, lekin CLIENT se
// call / form se trigger ho sakti.
//
// File ya function ke upar: 'use server'
// Form: action={serverAction} — progressive enhancement friendly (frameworks).
// Client: await serverAction(data) bhi (with rules).
//
// Socho remote control: button ghar me (client), TV kitchen me (server) channel badle.
// Network pe serialized call jati — magic nahi, RPC-ish.
//
// KYUN: Next.js + React 19 forms ka pair; mid interviews frequent.
// INTERVIEW: validation/auth zaroori; secrets; revalidate; vs API route.
//
// ============================================================================

// -----------------------------------------------------------------------------
// Q1: File-level 'use server'
//
// Seedha matlab:
// Poori file server actions export karti.
// Client components in actions ko import karke call / form pe laga sakte.
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
// Seedha matlab:
// Server Component ke andar async function with 'use server' pehli line.
// Closures: sirf serializable values close karo — heavy gotcha.
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
// Q3: Form me Server Action
//
// Seedha matlab:
// Client JS ke bina bhi framework POST handle kare (progressive).
// React 19 action={fn} model yahi pe power dikhata.
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
// Q4: [MID] Client Component se call
//
// Seedha matlab:
// 'use client' file action import karke onClick / await createPost().
// Returns serializable result. Errors handle try/catch.
// Still server pe execute — browser me source secrets nahi.
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
// Seedha matlab:
// Same hook (file 30) — action ab server function.
// pending UI client pe; mutation server pe.
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
// Seedha matlab:
// Client se koi bhi action hit kar sakta (tampered FormData).
// Server pe: session check, zod/yup validate, authorize resource.
// UI validation convenience; server validation security.
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
// Seedha matlab:
// Mutation ke baad stale page mat chhodo.
// revalidatePath / revalidateTag (Next) common.
// Other frameworks: apna cache invalidation.
// -----------------------------------------------------------------------------
const afterMutation = ["revalidatePath", "revalidateTag", "router.refresh()"];

// -----------------------------------------------------------------------------
// Q8: [MID] Server Action vs API Route
//
// Seedha matlab:
// Action: tight React/forms integration, typed imports, less boilerplate.
// API route: public HTTP API, webhooks, non-React clients.
// Dono valid — use-case choose.
// -----------------------------------------------------------------------------
const compare = {
  serverAction: "first-class for React forms/mutations in supported frameworks",
  apiRoute: "generic HTTP for any client",
};

// -----------------------------------------------------------------------------
// Q9: Errors & return values
//
// Seedha matlab:
// throw → error UI / boundary depending on setup.
// return { error: '...' } → useActionState friendly (no throw).
// Prefer consistent pattern in team.
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
// Seedha matlab:
// 1) Authenticate 2) Authorize 3) Validate input 4) No secret leak in returns
// 5) CSRF/framework protections samajh ke raho (Next docs).
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
// Kya karna hai:
// Browser DevTools se hidden field badlo — server pe zod schema validate.
//
// Seedha matlab:
// Client required attribute bypass ho sakta hai.
// React 18 API route same threat model.
// Never trust formData.get('role') === 'admin' bina session check.
// Return generic errors — leak internals mat karo.
// Rate limit destructive actions server-side.
// -----------------------------------------------------------------------------
const formTamperNote =
  "Treat all FormData as hostile — validate types, ranges, ownership on server.";

// -----------------------------------------------------------------------------
// Q12: Idempotent server actions
//
// Kya karna hai:
// Duplicate submit same idempotency key — double charge avoid.
//
// Seedha matlab:
// Network retry / double click → same action twice possible.
// React 19 isPending helps client; server still idempotent design.
// React 18 POST API same requirement.
// DB unique constraints + idempotency tokens payments me standard.
// Return same success response on replay OK.
// -----------------------------------------------------------------------------
const idempotentActions =
  "Design mutations idempotent where possible — retries and double-submit happen.";

// -----------------------------------------------------------------------------
// Q13: [MID] Server Action + redirect
//
// Kya karna hai:
// Login success → redirect('/') from server action (Next redirect() helper).
//
// Seedha matlab:
// Framework helpers throw special redirect — catch mat karo wrong.
// React 18 client router.navigate after fetch login manual.
// Progressive enhancement: form POST login redirect without JS possible.
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
// Kya karna hai:
// await cookies().set('session', token) — server-only APIs.
//
// Seedha matlab:
// HttpOnly cookies client JS se read nahi — security win.
// React 18 client login sets cookie via Set-Cookie header from API response manual.
// Server action colocates mutation + session update.
// Secrets stay off client bundle.
// -----------------------------------------------------------------------------
const sessionCookieNote =
  "Set HttpOnly session cookies inside server actions — not via client document.cookie for auth tokens.";

// -----------------------------------------------------------------------------
// Q15: [MID] Server Action vs fetch to API route — code compare
//
// Kya karna hai:
// Action: import { save } from './actions'; form action={save}.
// API: fetch('/api/save', { method:'POST', body }) + JSON parse.
//
// Seedha matlab:
// Action less boilerplate typed imports React apps me.
// API route public contract mobile app / third party ke liye.
// React 18 typically fetch API routes only.
// Both execute server logic — duplication avoid — shared service layer.
// -----------------------------------------------------------------------------
const actionVsFetchBoilerplate = {
  serverAction: "direct import + form action prop",
  apiRoute: "HTTP fetch + manual serialization + error parsing",
};

// -----------------------------------------------------------------------------
// Q16: Closure capture inline server action trap
//
// Kya karna hai:
// Inline 'use server' closure captures non-serializable value — build/runtime error.
//
// Seedha matlab:
// Capture productId string OK; capture DB connection object ❌.
// React 18 N/A — pattern new with inline actions.
// Prefer module-level 'use server' functions for clarity.
// Pass ids via FormData/hidden fields not closures when possible.
// -----------------------------------------------------------------------------
const closureTrap =
  "Inline server actions only close over serializable values — prefer module-level actions.";

// -----------------------------------------------------------------------------
// Q17: [MID] Optimistic UI + server action
//
// Kya karna hai:
// Client useOptimistic; action={serverFn}; fail pe rollback (file 32).
//
// Seedha matlab:
// Server action latency higher — optimistic UX valuable.
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
// Kya karna hai:
// Next Server Actions POST with origin checks / encrypted action ids — framework docs padho.
//
// Seedha matlab:
// Don't assume CSRF impossible — know your framework story.
// React 18 custom API routes need CSRF tokens if cookie auth.
// Same-site cookies + POST-only actions help.
// Interview: "rely on framework + still validate auth".
// -----------------------------------------------------------------------------
const csrfNote =
  "Understand framework CSRF protections for server actions — don't roll custom insecure POST.";

// -----------------------------------------------------------------------------
// Q19: [MID] Logging and observability
//
// Kya karna hai:
// Server action me structured logs — user id, action name, duration.
//
// Seedha matlab:
// Client console.log secrets ❌; server logs OK with care.
// React 18 API route handlers same observability.
// Correlate with request id tracing production debugging.
// Don't log raw passwords FormData se.
// -----------------------------------------------------------------------------
const serverActionLogging =
  "Log mutations server-side with correlation ids — never log secrets from FormData.";

// -----------------------------------------------------------------------------
// Q20: [ADV] When NOT Server Actions
//
// Kya karna hai:
// Public REST API products, webhooks Stripe, non-React mobile clients.
//
// Seedha matlab:
// Server Actions React-centric RPC — not universal HTTP API replacement.
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
// Kya karna hai:
// Import action in test; call with FormData; mock db module.
//
// Seedha matlab:
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
// Kya karna hai:
// 'use server', form/client call, validate auth, serializable returns, revalidate, CSRF awareness.
//
// Seedha matlab:
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
