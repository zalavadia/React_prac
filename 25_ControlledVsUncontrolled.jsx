// ============================================================================
// 25 — Controlled Vs Uncontrolled
// Level: MID  |  Sequence: do this first, then the next file in sequence
// ============================================================================
//
// SIMPLE: Controlled = React state is the steering wheel (value + onChange).
// Uncontrolled = DOM keeps its own value; you read it sometimes via ref
// (defaultValue). Like autopilot vs checking the speedometer now and then.
//
// Controlled: validation, disable submit, sync fields — easy.
// Uncontrolled: fewer re-renders, simple one-shot forms, file input often.
// Do not mix and confuse — value + defaultValue together = warning.
//
// WHY: Form design decision. Interview wants clear difference.
// INTERVIEW: when each; file inputs; converting between.
// Vite/React 19 project — teaching file.
//
// ============================================================================

import { useRef, useState } from "react";

// -----------------------------------------------------------------------------
// Q1: Controlled text
//
// Task:
// value={state} onChange setState.
//
// In simple words:
// Source of truth is React. Every keystroke re-renders.
// -----------------------------------------------------------------------------
function Controlled() {
  const [name, setName] = useState("");
  return <input value={name} onChange={(e) => setName(e.target.value)} />;
}

// -----------------------------------------------------------------------------
// Q2: Uncontrolled text
//
// Task:
// defaultValue + ref; on submit read ref.current.value.
//
// In simple words:
// Source of truth is DOM. React only seeds on mount.
// -----------------------------------------------------------------------------
function Uncontrolled() {
  const ref = useRef(null);
  function submit(e) {
    e.preventDefault();
    console.log(ref.current.value);
  }
  return (
    <form onSubmit={submit}>
      <input ref={ref} defaultValue="Ada" />
      <button type="submit">Go</button>
    </form>
  );
}

// -----------------------------------------------------------------------------
// Q3: File input — usually uncontrolled
//
// Task:
// <input type="file" ref={fileRef} /> — value control limited.
//
// In simple words:
// Security: cannot set path. FileList via ref/onChange.
// -----------------------------------------------------------------------------
function FilePicker() {
  const ref = useRef(null);
  function onSubmit(e) {
    e.preventDefault();
    const file = ref.current.files?.[0];
    console.log(file?.name);
  }
  return (
    <form onSubmit={onSubmit}>
      <input type="file" ref={ref} />
      <button type="submit">Upload</button>
    </form>
  );
}

// -----------------------------------------------------------------------------
// Q4: Don't mix value and defaultValue
//
// Task:
// Do not use both on one input.
//
// In simple words:
// React warning. Pick one mode.
// -----------------------------------------------------------------------------
function MixedBad() {
  // <input value={x} defaultValue="y" /> // ❌
  return null;
}

// -----------------------------------------------------------------------------
// Q5: [MID] Controlled checkbox vs uncontrolled
//
// Task:
// checked + onChange vs defaultChecked.
//
// In simple words:
// Same dichotomy. Form libs often use controlled.
// -----------------------------------------------------------------------------
function Checks() {
  const [on, setOn] = useState(false);
  return (
    <>
      <input type="checkbox" checked={on} onChange={(e) => setOn(e.target.checked)} />
      <input type="checkbox" defaultChecked />
    </>
  );
}

// -----------------------------------------------------------------------------
// Q6: When controlled shines
//
// Task:
// Instant search filter, char counter, sibling sync fields.
//
// In simple words:
// UI derived from every keystroke → controlled.
// -----------------------------------------------------------------------------
function CharCount() {
  const [t, setT] = useState("");
  return (
    <div>
      <textarea value={t} onChange={(e) => setT(e.target.value)} />
      <p>{t.length}/200</p>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q7: [MID] Hybrid: read uncontrolled into state on submit only
//
// Task:
// Form uncontrolled while typing; on submit push to state/API.
//
// In simple words:
// Middle ground: performance + simplicity.
// -----------------------------------------------------------------------------
function Hybrid() {
  const [submitted, setSubmitted] = useState("");
  const ref = useRef(null);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(ref.current.value);
      }}
    >
      <input ref={ref} defaultValue="" />
      <button type="submit">Save</button>
      <p>Last: {submitted}</p>
    </form>
  );
}

// -----------------------------------------------------------------------------
// Q8: Decision cheat sheet
//
// Task:
// Need live React logic? Controlled. One-shot / file? Uncontrolled OK.
//
// In simple words:
// Interview closing line.
// -----------------------------------------------------------------------------
function Cheat() {
  return (
    <p>
      Live sync/validate → controlled. Simple/ref/file → uncontrolled.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q9: Controlled select — value + onChange
//
// Task:
// select value={city} onChange — option list driven by state.
//
// In simple words:
// Dropdown is controlled too — empty string placeholder option is common.
// -----------------------------------------------------------------------------
function ControlledSelect() {
  const [city, setCity] = useState("mumbai");
  return (
    <select value={city} onChange={(e) => setCity(e.target.value)}>
      <option value="mumbai">Mumbai</option>
      <option value="delhi">Delhi</option>
    </select>
  );
}

// -----------------------------------------------------------------------------
// Q10: [MID] Uncontrolled radio group — ref or FormData
//
// Task:
// Same name radios; read value from FormData on submit.
//
// In simple words:
// Radio group can be controlled too; uncontrolled OK for simple forms.
// -----------------------------------------------------------------------------
function RadioForm() {
  function submit(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    console.log(fd.get("plan"));
  }
  return (
    <form onSubmit={submit}>
      <label>
        <input type="radio" name="plan" value="free" defaultChecked /> Free
      </label>
      <label>
        <input type="radio" name="plan" value="pro" /> Pro
      </label>
      <button type="submit">Go</button>
    </form>
  );
}

// -----------------------------------------------------------------------------
// Q11: Controlled textarea — same as input
//
// Task:
// value={text} onChange — multiline also uses React state.
//
// In simple words:
// defaultValue on textarea too — pick one mode.
// -----------------------------------------------------------------------------
function ControlledTextarea() {
  const [bio, setBio] = useState("");
  return (
    <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={4} />
  );
}

// -----------------------------------------------------------------------------
// Q12: [MID] React Hook Form — mostly uncontrolled register()
//
// Task:
// register("email") ref-based; lib handles validation — fewer re-renders.
//
// In simple words:
// Lib contrast: RHF uncontrolled default; Formik often controlled and state heavy.
// -----------------------------------------------------------------------------
function RHFNote() {
  return (
    <p>
      React Hook Form: register via ref — controlled where needed (watch fields).
      Performance win on uncontrolled.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q13: Formik contrast — controlled field state
//
// Task:
// values + setFieldValue — every keystroke updates form state.
//
// In simple words:
// OK for simple forms; re-render cost on big forms — RHF alternative.
// -----------------------------------------------------------------------------
function FormikNote() {
  return <p>Formik: central values object — controlled feel, predictable validation.</p>;
}

// -----------------------------------------------------------------------------
// Q14: [MID] Switch controlled to uncontrolled — remount key
//
// Task:
// On mode change: input key={mode} — fresh DOM, avoid warning.
//
// In simple words:
// Runtime switch is risky — remount for clean slate.
// -----------------------------------------------------------------------------
function ModeSwitch({ controlled }) {
  const [v, setV] = useState("");
  const ref = useRef(null);
  if (controlled) {
    return (
      <input key="c" value={v} onChange={(e) => setV(e.target.value)} />
    );
  }
  return <input key="u" defaultValue="seed" ref={ref} />;
}

// -----------------------------------------------------------------------------
// Q15: defaultValue only on first mount
//
// Task:
// defaultValue does not update from prop change — use controlled if sync needed.
//
// In simple words:
// Parent prop change → uncontrolled input stays stale.
// -----------------------------------------------------------------------------
function DefaultValueOnce() {
  return (
    <p>
      defaultValue set once — later parent prop change does not reflect in DOM.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q16: [MID] Multiple file inputs — refs array
//
// Task:
// files[0], files[1] separate ref — multi upload naturally uncontrolled.
//
// In simple words:
// File value cannot be controlled for security — ref/onChange FileList.
// -----------------------------------------------------------------------------
function MultiFile() {
  const a = useRef(null);
  const b = useRef(null);
  function submit(e) {
    e.preventDefault();
    console.log(a.current.files[0], b.current.files[0]);
  }
  return (
    <form onSubmit={submit}>
      <input type="file" ref={a} />
      <input type="file" ref={b} />
      <button type="submit">Upload</button>
    </form>
  );
}

// -----------------------------------------------------------------------------
// Q17: [ADV] readOnly vs disabled controlled
//
// Task:
// readOnly: value shows and submits; disabled: often skipped in form.
//
// In simple words:
// UX + a11y — disabled fields grey; readOnly blocks edit but displays OK.
// -----------------------------------------------------------------------------
function ReadOnlyField() {
  const [code] = useState("INV-001");
  return <input value={code} readOnly />;
}

// -----------------------------------------------------------------------------
// Q18: [ADV] Custom input — value + onChange contract
//
// Task:
// MyInput { value, onChange } — parent keeps it controlled.
//
// In simple words:
// Native-like API — form libs built on this pattern.
// -----------------------------------------------------------------------------
function MyInput({ value, onChange, label }) {
  return (
    <label>
      {label}
      <input value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}

// -----------------------------------------------------------------------------
// Q19: [ADV] useImperativeHandle — uncontrolled reset
//
// Task:
// Expose .reset() via ref — parent clears imperatively.
//
// In simple words:
// Prefer declarative; sometimes useful for lib/integration.
// -----------------------------------------------------------------------------
function ImperativeNote() {
  return (
    <p>
      useImperativeHandle: expose reset/focus on child ref — sometimes useful in
      uncontrolled forms.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q20: [ADV] Autocomplete / combobox controlled pain
//
// Task:
// Typing + selection + async options — controlled state gets complex.
//
// In simple words:
// Why Downshift/Radix exist — or use a lib; handling every keystroke yourself is heavy.
// -----------------------------------------------------------------------------
function AutocompleteNote() {
  return (
    <p>
      Combobox controlled: input value + highlighted index + selected item — lib
      recommended.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q21: [ADV] Native form submit vs fully controlled
//
// Task:
// action + FormData native; or preventDefault + controlled state API.
//
// In simple words:
// React 19 Actions also support native form — mix controlled carefully.
// -----------------------------------------------------------------------------
function NativeSubmitNote() {
  return (
    <p>
      Native submit FormData (uncontrolled friendly) vs controlled gather state
      manually — pick by form size/complexity.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q22: [ADV] Interview — controlled vs uncontrolled decision tree
//
// Task:
// Live validate/sync → controlled. Performance/simple/file → uncontrolled. Do not mix.
//
// In simple words:
// File always special; mention lib contrast — strong close.
// -----------------------------------------------------------------------------
function ControlledInterview() {
  return (
    <ol>
      <li>Live UI from value? → controlled</li>
      <li>One-shot submit / file? → uncontrolled + ref/FormData</li>
      <li>value + defaultValue together? → ❌</li>
      <li>RHF uncontrolled vs Formik controlled — tradeoff</li>
    </ol>
  );
}

export {
  Controlled,
  Uncontrolled,
  FilePicker,
  MixedBad,
  Checks,
  CharCount,
  Hybrid,
  Cheat,
  ControlledSelect,
  RadioForm,
  ControlledTextarea,
  RHFNote,
  FormikNote,
  ModeSwitch,
  DefaultValueOnce,
  MultiFile,
  ReadOnlyField,
  MyInput,
  ImperativeNote,
  AutocompleteNote,
  NativeSubmitNote,
  ControlledInterview,
};
