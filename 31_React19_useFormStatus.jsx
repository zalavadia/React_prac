// ============================================================================
// 31 — React 19 useFormStatus (react-dom)
// Level: REACT19  |  Study in order: read this file first, then the next number
// ============================================================================
//
// SIMPLE: The parent form is submitting — the child button should know
// whether it is "pending" without prop drilling.
//
// useFormStatus() comes from react-dom; it reads the NEAREST parent <form> status.
// You get pending, data, method, and action fields.
//
// VERY IMPORTANT rule:
// Do NOT call this hook in the same component that renders the <form> —
// call it in a CHILD component that is INSIDE the form.
//
// Think of it this way: form = restaurant; useFormStatus = waiter who sees the kitchen light and
// says "order preparing" — the waiter is child staff standing outside the kitchen.
//
// WHY: Submit button UX without lifting state.
// INTERVIEW: why it does not work in the form component itself; react vs react-dom import.
//
// ============================================================================

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { useActionState } from "react";

// -----------------------------------------------------------------------------
// Q1: Child SubmitButton with pending
//
// In simple words:
// SubmitButton is a separate component — inside the form.
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
// Q2: [MID] Wrong place call — common bug
//
// In simple words:
// If you write useFormStatus directly inside ArticleForm (along with the form),
// pending is often always false / useless — because status is for the PARENT form,
// not your own form per this render tree rule.
// Fix: button (or any child) as a separate function component.
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
// Q3: pending + data — what is being submitted
//
// In simple words:
// data = FormData while submit is in-flight.
// In pending UI you can show "Saving: {title}".
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
// In simple words:
// method — get/post style info.
// action — function or URL the form is using.
// For debugging / conditional UI.
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
// In simple words:
// useActionState.isPending — for that hook's action.
// useFormStatus.pending — nearest form submission.
// Button only needs to show pending, not manage state — useFormStatus is enough.
// Need state + errors — useActionState (file 30) + status child combo.
// -----------------------------------------------------------------------------
const whenToUse = {
  useFormStatus: "child UI reflecting form pending/data",
  useActionState: "own the returned state machine",
};

// -----------------------------------------------------------------------------
// Q6: Nested forms? Don't.
//
// In simple words:
// Nested <form> is invalid in HTML.
// useFormStatus looks at nearest parent form — nesting causes confusion.
// One form, children components.
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
// In simple words:
// Fieldset disabled={pending} — all controls off.
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
// Q8: Import from 'react-dom' — remember
//
// In simple words:
// useFormStatus is NOT from react, it is from react-dom.
// Interview trap: wrong package.
// -----------------------------------------------------------------------------
// import { useFormStatus } from "react-dom"; // ✅
// import { useFormStatus } from "react"; // ❌

// -----------------------------------------------------------------------------
// Q9: formAction button — pending status
//
// Task:
// Button with formAction={otherFn} — useFormStatus tracks that submission.
//
// In simple words:
// Nearest form's active submission — which action is running.
// Press Publish and pending is true for that submit path.
// React 18: manually track which button clicked via state.
// Read status in child component — not in parent.
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
// Task:
// useFormStatus() outside form — no parent form → pending false / default.
//
// In simple words:
// Hook must be a form descendant (inside in DOM tree).
// If button is inside form via Portal it is generally OK (check form association in docs).
// React 18: N/A — hook did not exist; passed loading prop.
// Fix: move component inside <form> or pass pending prop explicitly.
// -----------------------------------------------------------------------------
export function OutsideFormTrap() {
  return (
    <div>
      <p>If the status component were outside the form here, pending would not work</p>
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
// Task:
// <SubmitSpinner /> — drop-in pending indicator in every form.
//
// In simple words:
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
// Task:
// When pending true use data?.get('field') — optional chaining.
//
// In simple words:
// data is null when not pending — check in UI.
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
// Task:
// Two separate forms — each SubmitButton reads its nearest form status.
//
// In simple words:
// Form A pending ≠ Form B pending — automatic isolation.
// React 18: separate loading state per form manually.
// Trap: one shared SubmitButton between two forms — ambiguous parent.
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
// Task:
// Parent: useActionState for state/errors; child: useFormStatus for button UX.
//
// In simple words:
// Complementary — state machine in parent; pending UI in child without props.
// React 18: lift isLoading to parent, pass to button.
// Both pending flags usually stay in sync for same form — redundant but clean separation.
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
// Task:
// On pending disable whole fieldset — prevent double entry.
//
// In simple words:
// Screen readers should know busy state visually + functionally.
// React 18: disabled={loading} on every input manually is tedious.
// Reuse child wrapper BusyFields pattern (Q7).
// Note: disabled fields sometimes skip in FormData — check browser behavior for your fields.
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
// Task:
// Old: const [loading,setLoading]=useState; <Btn loading={loading} />.
//
// In simple words:
// It worked — just boilerplate + prop layers.
// React 19 useFormStatus: colocate pending UI with button component.
// Migration: extract SubmitButton child, remove loading prop chain.
// When NOT: no form — for non-form buttons use useActionState.isPending.
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
// Task:
// useFormStatus().method — reflects form method attribute.
//
// In simple words:
// action={fn} in React apps is usually programmatic — method mostly feels like 'post'.
// Debugging: log method + action type in dev tools component.
// React 18: same HTML form attributes.
// For progressive enhancement native action URL, method matters.
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
// Task:
// <DSButton type="submit"> with useFormStatus inside — must be in form subtree.
//
// In simple words:
// Check Shadow DOM boundaries — rare breaks.
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
// Task:
// action={serverAction} on client form — pending tracked on client.
//
// In simple words:
// Network goes to server — pending true until response.
// React 18 + server: manual fetch pending.
// Slow server action: fieldset disable is critical — avoid double POST.
// Error display: useActionState state.error + useFormStatus pending combo.
// -----------------------------------------------------------------------------
const serverFormStatus =
  "useFormStatus tracks client-side submission lifecycle for server actions too.";

// -----------------------------------------------------------------------------
// Q20: Pending false immediately — sync action flash
//
// Task:
// Very fast sync action — pending UI blink barely visible.
//
// In simple words:
// Normal for trivial actions — do not over-engineer spinner.
// React 18 same — setLoading(true/false) invisible in sync code.
// UX: minimum 300ms spinner optional pattern (debate — artificial delay usually bad).
// Interview: pending is meaningful for async I/O bound actions.
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
// Task:
// Non-form async, useActionState.isPending alone is enough, no form element.
//
// In simple words:
// Click handler mutation without form — useActionState or useTransition.
// Parent needs pending of specific non-form action — status hook will not help.
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
// Task:
// Remember 4 traps: wrong import, wrong place, outside form, nested forms.
//
// In simple words:
// 1) react not react-dom 2) same component as form 3) not descendant 4) nested form invalid
// React 18 contrast: prop drilling loading state was the alternative.
// Fix always: extract child function component inside form.
// Bonus: calling useFormStatus in form component → pending stuck false classic bug.
// -----------------------------------------------------------------------------
export const useFormStatusTraps = [
  "import from react instead of react-dom",
  "call in same component that renders form",
  "component outside form tree",
  "invalid nested forms",
];
