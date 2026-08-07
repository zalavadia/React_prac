// ============================================================================
// 25 — Controlled Vs Uncontrolled
// Level: MID  |  Sequence: pehle yeh, phir agla number
// ============================================================================
//
// LAYMAN: Controlled = React state steering wheel (value + onChange).
// Uncontrolled = DOM apna value rakhe; tum ref se kabhi-kabhi padho
// (defaultValue). Jaise autopilot vs kabhi speedo check.
//
// Controlled: validation, disable submit, sync fields — easy.
// Uncontrolled: kam re-renders, simple one-shot forms, file input often.
// Mix mat confuse karo — value + defaultValue saath = warning.
//
// KYUN: Form design decision. Interview me clear farq chahiye.
// INTERVIEW: when each; file inputs; converting between.
// Vite/React 19 project me use — teaching file.
//
// ============================================================================

import { useRef, useState } from "react";

// -----------------------------------------------------------------------------
// Q1: Controlled text
//
// Kya karna hai:
// value={state} onChange setState.
//
// Seedha matlab:
// Source of truth React. Har keystroke re-render.
// -----------------------------------------------------------------------------
function Controlled() {
  const [name, setName] = useState("");
  return <input value={name} onChange={(e) => setName(e.target.value)} />;
}

// -----------------------------------------------------------------------------
// Q2: Uncontrolled text
//
// Kya karna hai:
// defaultValue + ref; submit pe ref.current.value.
//
// Seedha matlab:
// Source of truth DOM. React sirf mount pe seed.
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
// Kya karna hai:
// <input type="file" ref={fileRef} /> — value control limited.
//
// Seedha matlab:
// Security: path set nahi kar sakte. FileList ref/onChange se.
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
// Kya karna hai:
// Ek input pe dono mat.
//
// Seedha matlab:
// React warning. Pick one mode.
// -----------------------------------------------------------------------------
function MixedBad() {
  // <input value={x} defaultValue="y" /> // ❌
  return null;
}

// -----------------------------------------------------------------------------
// Q5: [MID] Controlled checkbox vs uncontrolled
//
// Kya karna hai:
// checked + onChange vs defaultChecked.
//
// Seedha matlab:
// Same dichotomy. Form libs often controlled.
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
// Kya karna hai:
// Instant search filter, char counter, sibling sync fields.
//
// Seedha matlab:
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
// Kya karna hai:
// Form uncontrolled during typing; submit pe state/API.
//
// Seedha matlab:
// Performance + simplicity middle ground.
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
// Kya karna hai:
// Need live React logic? Controlled. One-shot / file? Uncontrolled OK.
//
// Seedha matlab:
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
// Kya karna hai:
// select value={city} onChange — option list state driven.
//
// Seedha matlab:
// Dropdown bhi controlled — empty string placeholder option common.
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
// Q10: [MID] Uncontrolled radio group — ref ya FormData
//
// Kya karna hai:
// name same radios; submit pe FormData se value read.
//
// Seedha matlab:
// Radio group controlled bhi ho sakta; simple form me uncontrolled OK.
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
// Kya karna hai:
// value={text} onChange — multiline bhi React state.
//
// Seedha matlab:
// defaultValue textarea pe bhi — pick one mode.
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
// Kya karna hai:
// register("email") ref-based; validation lib handle — kam re-renders.
//
// Seedha matlab:
// Lib contrast: RHF uncontrolled default; Formik often controlled state heavy.
// -----------------------------------------------------------------------------
function RHFNote() {
  return (
    <p>
      React Hook Form: register ref se — controlled jahan zaroor (watch fields).
      Performance win uncontrolled pe.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q13: Formik contrast — controlled field state
//
// Kya karna hai:
// values + setFieldValue — har keystroke form state update.
//
// Seedha matlab:
// Simple forms OK; bade forms me re-render cost — RHF alternative.
// -----------------------------------------------------------------------------
function FormikNote() {
  return <p>Formik: central values object — controlled feel, predictable validation.</p>;
}

// -----------------------------------------------------------------------------
// Q14: [MID] Controlled se uncontrolled switch — remount key
//
// Kya karna hai:
// mode change pe input key={mode} — DOM fresh, warning avoid.
//
// Seedha matlab:
// Runtime switch risky — remount se clean slate.
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
// Q15: defaultValue sirf first mount pe
//
// Kya karna hai:
// defaultValue change prop se update nahi — controlled use karo agar sync chahiye.
//
// Seedha matlab:
// Parent se prop change → uncontrolled input stale rehta.
// -----------------------------------------------------------------------------
function DefaultValueOnce() {
  return (
    <p>
      defaultValue ek baar set — baad me parent prop change DOM me reflect nahi.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q16: [MID] Multiple file inputs — refs array
//
// Kya karna hai:
// files[0], files[1] alag ref — multi upload uncontrolled natural.
//
// Seedha matlab:
// File value controlled nahi ho sakta security se — ref/onChange FileList.
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
// Kya karna hai:
// readOnly: value dikhe submit ho; disabled: form me skip often.
//
// Seedha matlab:
// UX + a11y — disabled fields grey; readOnly edit block display OK.
// -----------------------------------------------------------------------------
function ReadOnlyField() {
  const [code] = useState("INV-001");
  return <input value={code} readOnly />;
}

// -----------------------------------------------------------------------------
// Q18: [ADV] Custom input — value + onChange contract
//
// Kya karna hai:
// MyInput { value, onChange } — parent controlled rakhe.
//
// Seedha matlab:
// Native jaisa API — form libs isi pattern pe built.
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
// Kya karna hai:
// ref se .reset() expose — parent imperative clear.
//
// Seedha matlab:
// Mostly declarative prefer; kabhi lib/integration ke liye imperative.
// -----------------------------------------------------------------------------
function ImperativeNote() {
  return (
    <p>
      useImperativeHandle: child ref pe reset/focus expose — uncontrolled forms
      me kabhi useful.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q20: [ADV] Autocomplete / combobox controlled pain
//
// Kya karna hai:
// Typing + selection + async options — controlled state complex.
//
// Seedha matlab:
// Isliye Downshift/Radix — ya lib use karo, khud har keystroke handle heavy.
// -----------------------------------------------------------------------------
function AutocompleteNote() {
  return (
    <p>
      Combobox controlled: input value + highlighted index + selected item — lib
      recommend.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q21: [ADV] Native form submit vs fully controlled
//
// Kya karna hai:
// action + FormData native; ya preventDefault + controlled state API.
//
// Seedha matlab:
// React 19 Actions native form bhi — controlled mix carefully.
// -----------------------------------------------------------------------------
function NativeSubmitNote() {
  return (
    <p>
      Native submit FormData (uncontrolled friendly) vs controlled gather state
      manually — pick form size/complexity se.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q22: [ADV] Interview — controlled vs uncontrolled decision tree
//
// Kya karna hai:
// Live validate/sync → controlled. Performance/simple/file → uncontrolled. Mix mat.
//
// Seedha matlab:
// File always special; libs contrast bolo — strong close.
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
