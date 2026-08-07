// ============================================================================
// 29 — React 19 Form Actions (action={fn}, formAction)
// Level: REACT19  |  Sequence seekho: pehle yeh file, phir agla number
// ============================================================================
//
// LAYMAN: HTML form me action="/url" hota tha — browser POST karta tha.
// React 19 me action={javascriptFunction} de sakte ho.
// Submit pe React function ko FormData deta hai (input name=... fields).
//
// Socho restaurant order slip: har field ka naam + value slip pe;
// waiter (action) slip le ke kitchen (server/API) bhejta hai.
//
// formAction = button/input pe alag action — ek form, multiple buttons,
// alag-alag kaam (Save vs Delete).
//
// KYUN: Mid React interviews + Next.js forms ka base.
// INTERVIEW: FormData kaise nikalte; progressive enhancement idea; formAction.
//
// ============================================================================

import { useState } from "react";

// -----------------------------------------------------------------------------
// Q1: Sabse simple — <form action={fn}>
//
// Seedha matlab:
// fn async ho sakti hai. Argument = FormData.
// formData.get('email') se field lo (name attribute zaroori).
// preventDefault manually zaroori nahi Action path me.
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
// Q2: [MID] FormData — name attribute bhoolna #1 bug
//
// Seedha matlab:
// Bina name= ke field FormData me NAHI aati.
// Controlled value={state} alag topic; Action + FormData = uncontrolled-ish fields.
// -----------------------------------------------------------------------------
async function debugFormData(formData) {
  // Saari entries dekhna (teaching)
  for (const [key, value] of formData.entries()) {
    console.log(key, value);
  }
}

export function DebugFieldsForm() {
  return (
    <form action={debugFormData}>
      <input name="title" defaultValue="Hello" />
      {/* name missing → FormData me nahi */}
      <input defaultValue="ghost" />
      <button type="submit">Dump</button>
    </form>
  );
}

// -----------------------------------------------------------------------------
// Q3: Multiple buttons — formAction
//
// Seedha matlab:
// form pe common action; kisi button pe formAction={otherFn}.
// Jo button dabao, uska action chalta hai.
// Intent (save vs delete) alag functions me clean rehta hai.
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
// Q4: Action ke andar validation + return value idea
//
// Seedha matlab:
// Action kuch return kar sakti hai — useActionState usse state banaata hai (file 30).
// Yahan simple: early return / throw. Error boundaries / hooks baad me.
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
// Q5: [MID] Purana onSubmit vs naya action — kab kya?
//
// Seedha matlab:
// onSubmit ab bhi valid — complex client validation, multi-step wizards.
// action = server/FormData-first flows, pending UX with React 19 hooks.
// Dono mix mat karo blindly; team convention follow.
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
// Seedha matlab:
// Uncontrolled inputs defaultValue pe start hote.
// Successful Action ke baad form reset chahiye to key change ya
// useActionState se controlled reset pattern (file 30).
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
// Seedha matlab:
// <input type="file" name="avatar" /> → formData.get('avatar') File object.
// Multipart upload Action me natural fit.
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
// Seedha matlab:
// Ideal: JS se pehle bhi form kaam kare (server action / native action URL).
// SPA-only apps me aksar JS required — phir bhi FormData mindset rakho.
// Next.js Server Actions is story ko strong banate hain (file 38).
// -----------------------------------------------------------------------------
const progressiveIdea = {
  withoutJS: "browser posts to URL / server action endpoint",
  withJS: "React enhances — pending UI, no full reload",
};

// -----------------------------------------------------------------------------
// Q9: [MID] action + onSubmit dono ek form pe — trap
//
// Kya karna hai:
// Ek form pe action={fn} aur onSubmit={fn} mat mix karo blindly.
//
// Seedha matlab:
// Dono fire ho sakte — double submit / confusing flow.
// React 18 style onSubmit YA React 19 action — pick one pattern per form.
// Controlled live validation: onChange local; submit ke liye action enough.
// Common bug: preventDefault onSubmit me + action bhi → race.
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
// Kya karna hai:
// name same + value alag radios; checkbox checked hone pe hi aata.
//
// Seedha matlab:
// formData.get('color') — selected radio value.
// Checkbox: formData.get('agree') === 'on' ya null.
// React 18: manually read e.target.checked; Action path FormData natural.
// Edge: unchecked checkbox FormData me missing — server pe default false socho.
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
// Kya karna hai:
// name attribute select/textarea pe; formData.get('field').
//
// Seedha matlab:
// Controlled select React 18 me value={state} common tha.
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
// Kya karna hai:
// type="hidden" name="id" value={id} — action ko context do bina UI ke.
//
// Seedha matlab:
// Delete/edit buttons: hidden id + formAction ya intent field.
// React 18: onClick me id closure; Action: hidden field safer (FormData serializable).
// Security: hidden id trust mat karo server pe — auth + ownership verify.
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
// Kya karna hai:
// value={state} controlled ho to FormData me wahi value aati — name + onChange sync.
//
// Seedha matlab:
// Pure Action/uncontrolled: defaultValue + name, no value prop.
// Controlled + Action: possible but onChange se state update; submit pe FormData current DOM value.
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
// Kya karna hai:
// Multiple submit buttons — har ek ka formAction alag ho sakta hai.
//
// Seedha matlab:
// HTML pattern purana hai; React 19 me first-class.
// name/value submit button se bhi FormData me aate (intent detection).
// React 18: ek handler me e.nativeEvent.submitter check karte the.
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
// Kya karna hai:
// throw → error boundary / framework error UI; return { error } → useActionState friendly.
//
// Seedha matlab:
// Team me ek pattern choose karo — mixed throw/return confusing UX.
// React 18 onSubmit: try/catch + setError manual.
// React 19: return { ok: false, error: '...' } with useActionState clean.
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
// Kya karna hai:
// File input ke saath FormData naturally multipart; fetch me body: formData.
//
// Seedha matlab:
// encType default browser handle karta file ke saath.
// React 18: FormData manually from onSubmit; same data Action me auto.
// Edge: empty file input — empty File ya skip; server validate size/type.
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
// Kya karna hai:
// Form ke bina bhi async "action" mental model — button onClick + transition.
//
// Seedha matlab:
// Actions sirf <form> tak limited nahi — any async user intent.
// React 18: startTransition(async () => ...) bridge.
// React 19: useActionState bhi non-form triggers ke saath use ho sakta (advanced).
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
// Kya karna hai:
// Sirf action={fn} without hook — pending UI manually ya useFormStatus child.
//
// Seedha matlab:
// React 18: useState loading around submit.
// React 19 minimal: child SubmitButton with useFormStatus (file 31).
// Trap: action slow hai par button enabled — double submit risk.
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
// Kya karna hai:
// get = first value; getAll = saari values; has = key exists?
//
// Seedha matlab:
// Multi-checkbox same name → getAll.
// Missing field → get returns null — String() wrap karo validation me.
// React 18 FormData same API — Action path me yeh standard skill.
// Common bug: get('items') jab array chahiye → getAll use karo.
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
// Q20: [MID] Migration — onSubmit form ko Action me kaise?
//
// Kya karna hai:
// e.preventDefault hatao; handler ko action={async (fd) => ...} banao.
//
// Seedha matlab:
// Step 1: FormData e.currentTarget se → formData arg direct.
// Step 2: loading state → useActionState / useFormStatus.
// Step 3: setError → return { error } from action.
// React 18 code chalta rahega — gradual file-by-file migrate karo.
// -----------------------------------------------------------------------------
const migrateOnSubmitSteps = [
  "remove preventDefault",
  "move handler to action={fn}",
  "replace loading useState with useActionState isPending",
  "return errors instead of setError where possible",
];

// -----------------------------------------------------------------------------
// Q21: [ADV] Security — client Action me secrets mat daalo
//
// Kya karna hai:
// Browser action function me API secret embed mat karo — visible hai.
//
// Seedha matlab:
// Client Action → public API call with user token/session cookie OK.
// Server Action (file 38) → secrets server pe safe.
// React 18 same rule — yeh React 19 specific nahi, par interview me bolo.
// Validate/sanitize FormData server pe — client validation convenience only.
// -----------------------------------------------------------------------------
const actionSecurityNote =
  "Client actions run in browser — no secrets; server validates all inputs.";

// -----------------------------------------------------------------------------
// Q22: [ADV] Interview trap — action sync function?
//
// Kya karna hai:
// Action async ho sakti hai; sync bhi chalegi lekin pending UX short/ invisible.
//
// Seedha matlab:
// Async await network — isPending true meaningful time tak.
// Sync action: turant complete — useFormStatus flash barely visible.
// React 18 onSubmit sync vs async same; 19 pending hooks async ke liye shine.
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
