// ============================================================================
// 29 — React 19 Form Actions (action={fn}, formAction)
// Level: REACT19  |  Study order: do this file first, then the next in sequence
// ============================================================================
//
// SIMPLE: HTML form had action="/url" — browser POSTed.
// React 19 lets you use action={javascriptFunction}.
// On submit React passes FormData to the function (input name=... fields).
//
// Think restaurant order slip: every field name + value on the slip;
// waiter (action) takes slip to kitchen (server/API).
//
// formAction = different action on button/input — one form, multiple buttons,
// different jobs (Save vs Delete).
//
// WHY: Mid React interviews + base for Next.js forms.
// INTERVIEW: how to read FormData; progressive enhancement idea; formAction.
//
// ============================================================================

import { useState } from "react";

// -----------------------------------------------------------------------------
// Q1: Simplest — <form action={fn}>
//
// In simple words:
// fn can be async. Argument = FormData.
// Get field with formData.get('email') (name attribute required).
// No manual preventDefault on Action path.
// -----------------------------------------------------------------------------
async function subscribeAction(formData) {
  const email = formData.get("email");
  console.log("subscribe:", email);
  // await fetch('/api/subscribe', { method: 'POST', body: formData })
}

export function SubscribeForm() {
  return (
    <form action={subscribeAction}>
      <input name="email" type="email" required placeholder="you@mail.com" />
      <button type="submit">Subscribe</button>
    </form>
  );
}

// -----------------------------------------------------------------------------
// Q2: [MID] FormData — forgetting name attribute is bug #1
//
// In simple words:
// Without name= field does NOT appear in FormData.
// Controlled value={state} is separate topic; Action + FormData = uncontrolled-ish fields.
// -----------------------------------------------------------------------------
async function debugFormData(formData) {
  // See all entries (teaching)
  for (const [key, value] of formData.entries()) {
    console.log(key, value);
  }
}

export function DebugFieldsForm() {
  return (
    <form action={debugFormData}>
      <input name="title" defaultValue="Hello" />
      {/* name missing → not in FormData */}
      <input defaultValue="ghost" />
      <button type="submit">Dump</button>
    </form>
  );
}

// -----------------------------------------------------------------------------
// Q3: Multiple buttons — formAction
//
// In simple words:
// Common action on form; formAction={otherFn} on a button.
// Whichever button you click, its action runs.
// Intent (save vs delete) stays clean in separate functions.
// -----------------------------------------------------------------------------
async function saveDraft(formData) {
  console.log("save", formData.get("body"));
}

async function publishPost(formData) {
  console.log("publish", formData.get("body"));
}

export function PostFormTwoActions() {
  return (
    <form action={saveDraft}>
      <textarea name="body" defaultValue="Draft text" />
      <button type="submit">Save draft</button>
      <button type="submit" formAction={publishPost}>
        Publish
      </button>
    </form>
  );
}

// -----------------------------------------------------------------------------
// Q4: Validation inside Action + return value idea
//
// In simple words:
// Action can return something — useActionState turns it into state (file 30).
// Here simple: early return / throw. Error boundaries / hooks later.
// -----------------------------------------------------------------------------
async function loginAction(formData) {
  const user = String(formData.get("user") || "");
  const pass = String(formData.get("pass") || "");
  if (!user || !pass) {
    return { ok: false, error: "Empty fields" };
  }
  // await api.login(...)
  return { ok: true, error: null };
}

export function LoginFormActionOnly() {
  return (
    <form action={loginAction}>
      <input name="user" />
      <input name="pass" type="password" />
      <button type="submit">Login</button>
    </form>
  );
}

// -----------------------------------------------------------------------------
// Q5: [MID] Old onSubmit vs new action — when to use which?
//
// In simple words:
// onSubmit still valid — complex client validation, multi-step wizards.
// action = server/FormData-first flows, pending UX with React 19 hooks.
// Do not mix blindly; follow team convention.
// -----------------------------------------------------------------------------
export function OldStyleStillWorks() {
  const [status, setStatus] = useState("idle");

  async function onSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setStatus("saving");
    // await api(data)
    setStatus("done");
    console.log([...data.entries()], status);
  }

  return (
    <form onSubmit={onSubmit}>
      <input name="note" />
      <button type="submit">Save (legacy style)</button>
    </form>
  );
}

// -----------------------------------------------------------------------------
// Q6: Reset / defaultValue after submit
//
// In simple words:
// Uncontrolled inputs start at defaultValue.
// After successful Action need reset: key change or
// controlled reset pattern via useActionState (file 30).
// -----------------------------------------------------------------------------
export function FormWithKeyReset({ version }) {
  return (
    <form key={version} action={subscribeAction}>
      <input name="email" />
      <button type="submit">Go</button>
    </form>
  );
}

// -----------------------------------------------------------------------------
// Q7: file input + FormData
//
// In simple words:
// <input type="file" name="avatar" /> → formData.get('avatar') File object.
// Multipart upload natural fit in Action.
// -----------------------------------------------------------------------------
async function uploadAvatar(formData) {
  const file = formData.get("avatar");
  if (file && file instanceof File) {
    console.log(file.name, file.size);
  }
}

export function AvatarUploadForm() {
  return (
    <form action={uploadAvatar}>
      <input type="file" name="avatar" accept="image/*" />
      <button type="submit">Upload</button>
    </form>
  );
}

// -----------------------------------------------------------------------------
// Q8: [MID] Progressive enhancement (mental model)
//
// In simple words:
// Ideal: form works before JS too (server action / native action URL).
// SPA-only apps often require JS — still keep FormData mindset.
// Next.js Server Actions strengthen this story (file 38).
// -----------------------------------------------------------------------------
const progressiveIdea = {
  withoutJS: "browser posts to URL / server action endpoint",
  withJS: "React enhances — pending UI, no full reload",
};

// -----------------------------------------------------------------------------
// Q9: [MID] action + onSubmit on same form — trap
//
// Task:
// Do not blindly mix action={fn} and onSubmit={fn} on one form.
//
// In simple words:
// Both may fire — double submit / confusing flow.
// React 18 style onSubmit OR React 19 action — pick one pattern per form.
// Controlled live validation: onChange local; action enough for submit.
// Common bug: preventDefault in onSubmit + action too → race.
// -----------------------------------------------------------------------------
export function PickOnePatternForm() {
  async function saveAction(formData) {
    console.log("action path", formData.get("note"));
  }
  return (
    <form action={saveAction}>
      <input name="note" defaultValue="via action only" />
      <button type="submit">Save</button>
    </form>
  );
}

// -----------------------------------------------------------------------------
// Q10: Checkbox / radio FormData
//
// Task:
// Same name + different value for radios; checkbox only when checked.
//
// In simple words:
// formData.get('color') — selected radio value.
// Checkbox: formData.get('agree') === 'on' or null.
// React 18: manually read e.target.checked; Action path FormData is natural.
// Edge: unchecked checkbox missing from FormData — default false on server.
// -----------------------------------------------------------------------------
async function prefsAction(formData) {
  const color = formData.get("color");
  const agree = formData.get("agree") === "on";
  return { color, agree };
}

export function PrefsForm() {
  return (
    <form action={prefsAction}>
      <label>
        <input type="radio" name="color" value="red" defaultChecked /> Red
      </label>
      <label>
        <input type="radio" name="color" value="blue" /> Blue
      </label>
      <label>
        <input type="checkbox" name="agree" /> I agree
      </label>
      <button type="submit">Save prefs</button>
    </form>
  );
}

// -----------------------------------------------------------------------------
// Q11: [MID] Select + textarea FormData
//
// Task:
// name attribute on select/textarea; formData.get('field').
//
// In simple words:
// Controlled select was common in React 18 with value={state}.
// Action path: defaultValue + name — uncontrolled FormData submit.
// Multi-select: formData.getAll('tags') array values.
// -----------------------------------------------------------------------------
async function noteAction(formData) {
  const category = formData.get("category");
  const body = formData.get("body");
  const tags = formData.getAll("tags");
  return { category, body, tags };
}

export function NoteForm() {
  return (
    <form action={noteAction}>
      <select name="category" defaultValue="work">
        <option value="work">Work</option>
        <option value="personal">Personal</option>
      </select>
      <textarea name="body" defaultValue="Hello" />
      <button type="submit">Save note</button>
    </form>
  );
}

// -----------------------------------------------------------------------------
// Q12: Hidden fields + intent pattern
//
// Task:
// type="hidden" name="id" value={id} — give action context without UI.
//
// In simple words:
// Delete/edit buttons: hidden id + formAction or intent field.
// React 18: id in onClick closure; Action: hidden field safer (FormData serializable).
// Security: do not trust hidden id on server — verify auth + ownership.
// -----------------------------------------------------------------------------
async function deleteItemAction(formData) {
  const id = formData.get("id");
  console.log("delete", id);
}

export function DeleteItemForm({ itemId }) {
  return (
    <form action={deleteItemAction}>
      <input type="hidden" name="id" value={itemId} />
      <button type="submit">Delete</button>
    </form>
  );
}

// -----------------------------------------------------------------------------
// Q13: [MID] Controlled input + Action — mix carefully
//
// Task:
// If value={state} controlled, FormData gets that value — sync name + onChange.
//
// In simple words:
// Pure Action/uncontrolled: defaultValue + name, no value prop.
// Controlled + Action: possible but onChange updates state; submit FormData uses current DOM value.
// Trap: value={state} without onChange → stale FormData on submit.
// React 18 controlled forms: onSubmit + state; 19: mix only when team convention clear.
// -----------------------------------------------------------------------------
export function ControlledActionMix() {
  const [title, setTitle] = useState("");
  async function save(formData) {
    console.log("submitted", formData.get("title"));
  }
  return (
    <form action={save}>
      <input
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Save</button>
    </form>
  );
}

// -----------------------------------------------------------------------------
// Q14: formAction on input type="submit" image buttons
//
// Task:
// Multiple submit buttons — each can have different formAction.
//
// In simple words:
// Old HTML pattern; first-class in React 19.
// name/value from submit button also go to FormData (intent detection).
// React 18: check e.nativeEvent.submitter in one handler.
// -----------------------------------------------------------------------------
async function archiveAction(formData) {
  console.log("archive", formData.get("title"));
}

export function DualSubmitForm() {
  return (
    <form action={saveDraft}>
      <input name="title" defaultValue="Post" />
      <button type="submit">Save draft</button>
      <button type="submit" formAction={archiveAction}>
        Archive
      </button>
    </form>
  );
}

// -----------------------------------------------------------------------------
// Q15: [MID] Action throw vs return error
//
// Task:
// throw → error boundary / framework error UI; return { error } → useActionState friendly.
//
// In simple words:
// Pick one pattern in team — mixed throw/return is confusing UX.
// React 18 onSubmit: try/catch + setError manual.
// React 19: return { ok: false, error: '...' } with useActionState is clean.
// Server Actions: prefer return error object for form validation messages.
// -----------------------------------------------------------------------------
async function riskyAction(formData) {
  const x = formData.get("x");
  if (!x) return { ok: false, error: "Missing x" };
  return { ok: true, error: null };
}

export function ErrorReturnForm() {
  return (
    <form action={riskyAction}>
      <input name="x" />
      <button type="submit">Go</button>
    </form>
  );
}

// -----------------------------------------------------------------------------
// Q16: form encType multipart — file uploads
//
// Task:
// With file input FormData is naturally multipart; fetch body: formData.
//
// In simple words:
// Browser handles encType default with file input.
// React 18: FormData manually from onSubmit; same data auto in Action.
// Edge: empty file input — empty File or skip; server validate size/type.
// When NOT Action: chunked/resumable upload custom protocol → dedicated API.
// -----------------------------------------------------------------------------
async function uploadDocsAction(formData) {
  const doc = formData.get("doc");
  if (doc instanceof File && doc.size > 0) {
    console.log("upload", doc.name, doc.size);
  }
}

export function DocUploadForm() {
  return (
    <form action={uploadDocsAction}>
      <input type="file" name="doc" accept=".pdf" />
      <button type="submit">Upload</button>
    </form>
  );
}

// -----------------------------------------------------------------------------
// Q17: [MID] Action outside form — startTransition pattern
//
// Task:
// Action mental model beyond <form> — button onClick + transition.
//
// In simple words:
// Actions not limited to <form> — any async user intent.
// React 18: startTransition(async () => ...) bridge.
// React 19: useActionState also works with non-form triggers (advanced).
// Interview: "Action = async function handling user submission/intent".
// -----------------------------------------------------------------------------
export function NonFormActionIdea() {
  return (
    <p>
      Forms use action=; buttons can use useActionState wrapper or startTransition
      for same pending UX without form element.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q18: disabled submit while pending — without useActionState
//
// Task:
// Only action={fn} without hook — pending UI manually or useFormStatus child.
//
// In simple words:
// React 18: useState loading around submit.
// React 19 minimal: child SubmitButton with useFormStatus (file 31).
// Trap: action is slow but button enabled — double submit risk.
// -----------------------------------------------------------------------------
export function PendingViaChild() {
  return (
    <form action={saveDraft}>
      <input name="body" />
      <SubmitHint />
    </form>
  );
}

function SubmitHint() {
  // teaching: useFormStatus would go here (file 31)
  return <button type="submit">Save</button>;
}

// -----------------------------------------------------------------------------
// Q19: [ADV] formData.get vs getAll vs has
//
// Task:
// get = first value; getAll = all values; has = key exists?
//
// In simple words:
// Multi-checkbox same name → getAll.
// Missing field → get returns null — wrap with String() in validation.
// React 18 FormData same API — standard skill for Action path.
// Common bug: get('items') when you need array → use getAll.
// -----------------------------------------------------------------------------
async function cartFormAction(formData) {
  const hasCoupon = formData.has("coupon");
  const items = formData.getAll("itemId");
  return { hasCoupon, items };
}

export function CartFormFields() {
  return (
    <form action={cartFormAction}>
      <input type="hidden" name="itemId" value="a" />
      <input type="hidden" name="itemId" value="b" />
      <input name="coupon" placeholder="code" />
      <button type="submit">Checkout</button>
    </form>
  );
}

// -----------------------------------------------------------------------------
// Q20: [MID] Migration — how to move onSubmit form to Action?
//
// Task:
// Remove e.preventDefault; make handler action={async (fd) => ...}.
//
// In simple words:
// Step 1: FormData from e.currentTarget → formData arg direct.
// Step 2: loading state → useActionState / useFormStatus.
// Step 3: setError → return { error } from action.
// React 18 code still runs — migrate gradually file by file.
// -----------------------------------------------------------------------------
const migrateOnSubmitSteps = [
  "remove preventDefault",
  "move handler to action={fn}",
  "replace loading useState with useActionState isPending",
  "return errors instead of setError where possible",
];

// -----------------------------------------------------------------------------
// Q21: [ADV] Security — do not put secrets in client Action
//
// Task:
// Do not embed API secret in browser action function — it is visible.
//
// In simple words:
// Client Action → public API call with user token/session cookie OK.
// Server Action (file 38) → secrets safe on server.
// React 18 same rule — not React 19 specific, but say in interview.
// Validate/sanitize FormData on server — client validation is convenience only.
// -----------------------------------------------------------------------------
const actionSecurityNote =
  "Client actions run in browser — no secrets; server validates all inputs.";

// -----------------------------------------------------------------------------
// Q22: [ADV] Interview trap — action sync function?
//
// Task:
// Action can be async; sync also works but pending UX short/invisible.
//
// In simple words:
// Async await network — isPending true for meaningful time.
// Sync action: completes instantly — useFormStatus flash barely visible.
// React 18 onSubmit sync vs async same; 19 pending hooks shine for async.
// formAction null/undefined → native HTML submit behavior (full page) possible.
// -----------------------------------------------------------------------------
async function syncStyleAction(formData) {
  return { ok: true, val: formData.get("q") };
}

export function SyncActionForm() {
  return (
    <form action={syncStyleAction}>
      <input name="q" />
      <button type="submit">Quick</button>
    </form>
  );
}
