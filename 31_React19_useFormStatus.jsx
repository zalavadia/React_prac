// ============================================================================
// 31 — React 19 useFormStatus (react-dom)
// Level: REACT19  |  Sequence seekho: pehle yeh file, phir agla number
// ============================================================================
//
// LAYMAN: Parent form submit ho raha hai — child button ko pata chalna chahiye
// "pending hai kya?" bina prop drilling ke.
//
// useFormStatus() = react-dom se; NEAREST parent <form> ki status.
// pending, data, method, action — yeh fields milti hain.
//
// BAHUT IMPORTANT rule:
// Yeh hook USI component me mat call karo jo <form> khud render karta —
// CHILD component me call karo jo form ke ANDAR ho.
//
// Socho: form = restaurant; useFormStatus = waiter jo kitchen light dekh kar
// "order preparing" bolta — waiter kitchen ke bahar khada child staff hai.
//
// KYUN: Submit button UX bina state lift kiye.
// INTERVIEW: kyun form wale component me kaam nahi; react vs react-dom import.
//
// ============================================================================

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { useActionState } from "react";

// -----------------------------------------------------------------------------
// Q1: Child SubmitButton with pending
//
// Seedha matlab:
// SubmitButton alag component — form ke andar.
// pending true → disable + "Saving..."
// -----------------------------------------------------------------------------
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? "Saving..." : "Save"}
    </button>
  );
}

async function saveAction(formData) {
  await new Promise((r) => setTimeout(r, 800));
  console.log("saved", formData.get("title"));
}

export function ArticleForm() {
  return (
    <form action={saveAction}>
      <input name="title" />
      <SubmitButton />
    </form>
  );
}

// -----------------------------------------------------------------------------
// Q2: [MID] Galat jagah call — common bug
//
// Seedha matlab:
// Agar useFormStatus ko ArticleForm ke andar seedha likho (form ke saath),
// pending aksar hamesha false / useless — kyunki status PARENT form ki hoti,
// khud ke form ki nahi is render tree rule se.
// Fix: button (ya koi child) alag function component.
// -----------------------------------------------------------------------------
export function WrongPlaceDemo_DoNotCopy() {
  // ❌ Don't: const { pending } = useFormStatus(); here with <form> below
  return (
    <form action={saveAction}>
      <input name="title" />
      {/* ✅ Do: child component */}
      <SubmitButton />
    </form>
  );
}

// -----------------------------------------------------------------------------
// Q3: pending + data — kya submit ho raha
//
// Seedha matlab:
// data = FormData jab submit in-flight.
// Pending UI me "Saving: {title}" dikha sakte.
// -----------------------------------------------------------------------------
function StatusLine() {
  const { pending, data } = useFormStatus();
  if (!pending) return null;
  const title = data?.get("title");
  return <p>Saving{title ? `: ${title}` : "..."}</p>;
}

export function FormWithStatusLine() {
  return (
    <form action={saveAction}>
      <input name="title" />
      <StatusLine />
      <SubmitButton />
    </form>
  );
}

// -----------------------------------------------------------------------------
// Q4: method & action fields
//
// Seedha matlab:
// method — get/post style info.
// action — function ya URL jo form use kar raha.
// Debugging / conditional UI ke liye.
// -----------------------------------------------------------------------------
function DebugStatus() {
  const status = useFormStatus();
  return (
    <pre>
      {JSON.stringify(
        {
          pending: status.pending,
          method: status.method,
          hasData: Boolean(status.data),
          actionType: typeof status.action,
        },
        null,
        2
      )}
    </pre>
  );
}

export function FormDebug() {
  return (
    <form action={saveAction}>
      <input name="title" />
      <DebugStatus />
      <SubmitButton />
    </form>
  );
}

// -----------------------------------------------------------------------------
// Q5: [MID] useFormStatus vs useActionState isPending
//
// Seedha matlab:
// useActionState.isPending — us hook ke action ke liye.
// useFormStatus.pending — nearest form submission.
// Button sirf pending dikhani hai, state manage nahi — useFormStatus enough.
// State + errors chahiye — useActionState (file 30) + status child combo.
// -----------------------------------------------------------------------------
const whenToUse = {
  useFormStatus: "child UI reflecting form pending/data",
  useActionState: "own the returned state machine",
};

// -----------------------------------------------------------------------------
// Q6: Nested forms? Don't.
//
// Seedha matlab:
// HTML me nested <form> invalid.
// useFormStatus nearest parent form dekhta — nesting se confusion.
// Ek form, children components.
// -----------------------------------------------------------------------------
export function OneFormManyChildren() {
  return (
    <form action={saveAction}>
      <fieldset>
        <input name="title" />
      </fieldset>
      <StatusLine />
      <SubmitButton />
    </form>
  );
}

// -----------------------------------------------------------------------------
// Q7: Disable whole fieldset while pending
//
// Seedha matlab:
// Fieldset disabled={pending} — saari controls band.
// Accessibility-friendly busy state.
// -----------------------------------------------------------------------------
function BusyFields({ children }) {
  const { pending } = useFormStatus();
  return <fieldset disabled={pending}>{children}</fieldset>;
}

export function FormBusyFieldset() {
  return (
    <form action={saveAction}>
      <BusyFields>
        <input name="title" />
        <input name="slug" />
      </BusyFields>
      <SubmitButton />
    </form>
  );
}

// -----------------------------------------------------------------------------
// Q8: Import from 'react-dom' — yaad rakho
//
// Seedha matlab:
// useFormStatus react se NAHI, react-dom se.
// Interview trap: galat package.
// -----------------------------------------------------------------------------
// import { useFormStatus } from "react-dom"; // ✅
// import { useFormStatus } from "react"; // ❌

// -----------------------------------------------------------------------------
// Q9: formAction button — pending status
//
// Kya karna hai:
// Button pe formAction={otherFn} — useFormStatus us submission ko track kare.
//
// Seedha matlab:
// Nearest form ki active submission — kaun sa action chal raha.
// Publish dabao to pending true for that submit path.
// React 18: manually track which button clicked via state.
// Child component me status read — parent me mat.
// -----------------------------------------------------------------------------
async function publishAction(formData) {
  await new Promise((r) => setTimeout(r, 600));
  console.log("publish", formData.get("title"));
}

function PublishButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" formAction={publishAction} disabled={pending}>
      {pending ? "Publishing..." : "Publish"}
    </button>
  );
}

export function FormWithFormActionButton() {
  return (
    <form action={saveAction}>
      <input name="title" />
      <SubmitButton />
      <PublishButton />
    </form>
  );
}

// -----------------------------------------------------------------------------
// Q10: [MID] useFormStatus outside form — trap
//
// Kya karna hai:
// Form ke bahar useFormStatus() — no parent form → pending false / default.
//
// Seedha matlab:
// Hook ko form descendant hona chahiye (DOM tree me andar).
// Portal me form ke andar button ho to generally OK (same form association check docs).
// React 18: N/A — hook nahi tha; loading prop pass karte the.
// Fix: move component inside <form> or pass pending prop explicitly.
// -----------------------------------------------------------------------------
export function OutsideFormTrap() {
  return (
    <div>
      <p>Status component yahan form ke bahar hota to pending kaam nahi karta</p>
      <form action={saveAction}>
        <input name="title" />
        <SubmitButton />
      </form>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q11: Spinner component reusable pattern
//
// Kya karna hai:
// <SubmitSpinner /> — har form me drop-in pending indicator.
//
// Seedha matlab:
// Design system button wrapper with useFormStatus inside.
// React 18: <Button loading={loading} /> prop from parent state.
// Must render INSIDE form — document in Storybook stories correctly.
// aria-busy={pending} accessibility bonus.
// -----------------------------------------------------------------------------
function SubmitSpinner() {
  const { pending } = useFormStatus();
  if (!pending) return null;
  return <span aria-live="polite">Working…</span>;
}

export function FormWithSpinner() {
  return (
    <form action={saveAction}>
      <input name="title" />
      <SubmitSpinner />
      <SubmitButton />
    </form>
  );
}

// -----------------------------------------------------------------------------
// Q12: [MID] data FormData — types during pending
//
// Kya karna hai:
// pending true pe data?.get('field') — optional chaining.
//
// Seedha matlab:
// data null jab not pending — UI me check karo.
// Show "Saving draft: {title}" during flight.
// React 18: e.currentTarget FormData in submit handler once.
// Edge: file inputs in data — File object available during pending.
// -----------------------------------------------------------------------------
function SavingPreview() {
  const { pending, data } = useFormStatus();
  if (!pending || !data) return null;
  const title = data.get("title");
  const slug = data.get("slug");
  return (
    <p>
      Saving {String(title)} ({String(slug)})
    </p>
  );
}

export function FormSavingPreview() {
  return (
    <form action={saveAction}>
      <input name="title" defaultValue="My post" />
      <input name="slug" defaultValue="my-post" />
      <SavingPreview />
      <SubmitButton />
    </form>
  );
}

// -----------------------------------------------------------------------------
// Q13: Multiple forms on page — isolated status
//
// Kya karna hai:
// Do alag forms — har SubmitButton apne nearest form ki status dekhe.
//
// Seedha matlab:
// Form A pending ≠ Form B pending — automatic isolation.
// React 18: separate loading state per form manually.
// Trap: ek shared SubmitButton do forms ke beech — ambiguous parent.
// -----------------------------------------------------------------------------
export function TwoFormsIsolated() {
  return (
    <div>
      <form action={saveAction}>
        <input name="title" placeholder="Form A" />
        <SubmitButton />
      </form>
      <form action={publishAction}>
        <input name="title" placeholder="Form B" />
        <PublishButton />
      </form>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q14: [MID] useFormStatus + useActionState together
//
// Kya karna hai:
// Parent: useActionState for state/errors; child: useFormStatus for button UX.
//
// Seedha matlab:
// Complementary — state machine parent; pending UI child without props.
// React 18: lift isLoading to parent, pass to button.
// Dono pending usually sync for same form — redundant but clean separation.
// Interview: "status hook for presentation; action state for data".
// -----------------------------------------------------------------------------
async function combinedSave(prev, formData) {
  await new Promise((r) => setTimeout(r, 500));
  return { saved: formData.get("title"), error: null };
}

function CombinedSubmit() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? "..." : "Save"}
    </button>
  );
}

export function CombinedForm() {
  const [state, formAction] = useActionState(combinedSave, {
    saved: null,
    error: null,
  });
  return (
    <form action={formAction}>
      <input name="title" />
      <CombinedSubmit />
      {state.saved && <p>Saved: {state.saved}</p>}
    </form>
  );
}

// -----------------------------------------------------------------------------
// Q15: fieldset disabled={pending} — a11y
//
// Kya karna hai:
// pending pe poora fieldset disable — double entry roko.
//
// Seedha matlab:
// Screen readers ko busy state pata chale visually + functionally.
// React 18: disabled={loading} har input pe manually tedious.
// Child wrapper BusyFields pattern (Q7) reuse karo.
// Note: disabled fields FormData me sometimes skip — check browser behavior for your fields.
// -----------------------------------------------------------------------------
function A11yBusyWrapper({ children }) {
  const { pending } = useFormStatus();
  return (
    <fieldset disabled={pending} aria-busy={pending}>
      {children}
    </fieldset>
  );
}

export function A11yBusyForm() {
  return (
    <form action={saveAction}>
      <A11yBusyWrapper>
        <input name="title" />
        <textarea name="body" />
      </A11yBusyWrapper>
      <SubmitButton />
    </form>
  );
}

// -----------------------------------------------------------------------------
// Q16: [MID] React 18 pattern contrast — prop drilling loading
//
// Kya karna hai:
// Purana: const [loading,setLoading]=useState; <Btn loading={loading} />.
//
// Seedha matlab:
// Kaam karta tha — bas boilerplate + prop layers.
// React 19 useFormStatus: colocate pending UI with button component.
// Migration: extract SubmitButton child, remove loading prop chain.
// When NOT: form hi nahi — non-form buttons ke liye useActionState.isPending.
// -----------------------------------------------------------------------------
function LegacyStyleButton({ loading }) {
  return (
    <button type="submit" disabled={loading}>
      {loading ? "Saving..." : "Save"}
    </button>
  );
}

export function LegacyStyleForm() {
  const [loading, setLoading] = useState(false);
  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    await saveAction(new FormData(e.currentTarget));
    setLoading(false);
  }
  return (
    <form onSubmit={onSubmit}>
      <input name="title" />
      <LegacyStyleButton loading={loading} />
    </form>
  );
}

// -----------------------------------------------------------------------------
// Q17: method field — get vs post mental model
//
// Kya karna hai:
// useFormStatus().method — form method attribute reflect.
//
// Seedha matlab:
// action={fn} React apps me usually programmatic — method mostly 'post' feel.
// Debugging: log method + action type in dev tools component.
// React 18: same HTML form attributes.
// Progressive enhancement native action URL pe method matter karta.
// -----------------------------------------------------------------------------
function MethodDebug() {
  const { method, pending } = useFormStatus();
  return (
    <small>
      method={method} pending={String(pending)}
    </small>
  );
}

export function FormMethodDebug() {
  return (
    <form action={saveAction} method="post">
      <input name="title" />
      <MethodDebug />
      <SubmitButton />
    </form>
  );
}

// -----------------------------------------------------------------------------
// Q18: [ADV] Custom element / design system integration
//
// Kya karna hai:
// <DSButton type="submit"> ke andar useFormStatus — must be in form subtree.
//
// Seedha matlab:
// Shadow DOM boundaries check karo — rare breaks.
// React 18: loading prop API on design system.
// React 19: internal useFormStatus in DS SubmitButton implementation.
// Export DS component docs: "must be child of form".
// -----------------------------------------------------------------------------
export function DesignSystemNote() {
  return (
    <p>
      Design system SubmitButton should call useFormStatus internally and document
      that it must render inside a form.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q19: [MID] Server Action form — useFormStatus still works
//
// Kya karna hai:
// action={serverAction} client form — pending client pe track hota hai.
//
// Seedha matlab:
// Network server tak jaati — pending true until response.
// React 18 + server: manual fetch pending.
// Slow server action: fieldset disable critical — double POST avoid.
// Error display: useActionState state.error + useFormStatus pending combo.
// -----------------------------------------------------------------------------
const serverFormStatus =
  "useFormStatus tracks client-side submission lifecycle for server actions too.";

// -----------------------------------------------------------------------------
// Q20: Pending false immediately — sync action flash
//
// Kya karna hai:
// Bahut fast sync action — pending UI blink barely visible.
//
// Seedha matlab:
// Normal for trivial actions — don't over-engineer spinner.
// React 18 same — setLoading(true/false) sync code me invisible.
// UX: minimum 300ms spinner optional pattern (debate — artificial delay usually bad).
// Interview: pending meaningful for async I/O bound actions.
// -----------------------------------------------------------------------------
async function instantAction(formData) {
  return formData.get("x");
}

function InstantSubmit() {
  const { pending } = useFormStatus();
  return <button disabled={pending}>{pending ? "..." : "Go"}</button>;
}

export function InstantForm() {
  return (
    <form action={instantAction}>
      <input name="x" defaultValue="1" />
      <InstantSubmit />
    </form>
  );
}

// -----------------------------------------------------------------------------
// Q21: [ADV] When NOT useFormStatus
//
// Kya karna hai:
// Non-form async, useActionState.isPending enough alone, no form element.
//
// Seedha matlab:
// Click handler mutation without form — useActionState or useTransition.
// Parent needs pending of specific non-form action — status hook won't help.
// React 18: local useState always.
// Multiple coordinated pending flags — broader state machine.
// -----------------------------------------------------------------------------
const whenNotFormStatus = [
  "no form element involved",
  "only parent owns action via useActionState — isPending enough",
  "global app loading overlay",
];

// -----------------------------------------------------------------------------
// Q22: [ADV] Interview traps checklist
//
// Kya karna hai:
// 4 traps yaad: wrong import, wrong place, outside form, nested forms.
//
// Seedha matlab:
// 1) react not react-dom 2) same component as form 3) not descendant 4) nested form invalid
// React 18 contrast: prop drilling loading state was the alternative.
// Fix always: extract child function component inside form.
// Bonus: useFormStatus form component me call → pending stuck false classic bug.
// -----------------------------------------------------------------------------
export const useFormStatusTraps = [
  "import from react instead of react-dom",
  "call in same component that renders form",
  "component outside form tree",
  "invalid nested forms",
];
