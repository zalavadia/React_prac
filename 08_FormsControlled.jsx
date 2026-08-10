// ============================================================================
// 08 — Forms Controlled
// Level: BASE  |  Sequence: read this file, then the next number
// ============================================================================
//
// SIMPLE: Controlled input = React state is the boss. Input shows what state says.
// Every type: onChange → setState → value={state} again.
// Uncontrolled = DOM keeps its own value (ref) — compare in 25.
//
// Form: all fields in state (or one object), submit with preventDefault + validate.
// select, checkbox, radio also use value/checked + onChange.
//
// WHY: Validation, disable button, live preview — easier with controlled inputs.
// INTERVIEW: controlled vs uncontrolled; single source of truth.
// Use in a Vite + React 19 project — teaching file (do not run with node alone).
//
// ============================================================================

import { useState } from "react";

// -----------------------------------------------------------------------------
// Q1: Single controlled input
//
// Task:
// value + onChange pair.
//
// In simple words:
// Without value={state} it is not controlled. Without onChange it feels read-only.
// -----------------------------------------------------------------------------
function ControlledInput() {
  const [value, setValue] = useState("");
  return (
    <input value={value} onChange={(e) => setValue(e.target.value)} />
  );
}

// -----------------------------------------------------------------------------
// Q2: Multi-field form object
//
// Task:
// form = { name, email }; update by name.
//
// In simple words:
// e.target.name + computed key: setForm({ ...form, [name]: value })
// -----------------------------------------------------------------------------
function Signup() {
  const [form, setForm] = useState({ name: "", email: "" });
  function onChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log(form);
      }}
    >
      <input name="name" value={form.name} onChange={onChange} />
      <input name="email" value={form.email} onChange={onChange} />
      <button type="submit">Sign up</button>
    </form>
  );
}

// -----------------------------------------------------------------------------
// Q3: Checkbox controlled
//
// Task:
// checked={agree} onChange → setAgree(e.target.checked)
//
// In simple words:
// Checkbox uses checked boolean, not value.
// -----------------------------------------------------------------------------
function Terms() {
  const [agree, setAgree] = useState(false);
  return (
    <label>
      <input
        type="checkbox"
        checked={agree}
        onChange={(e) => setAgree(e.target.checked)}
      />
      I agree
    </label>
  );
}

// -----------------------------------------------------------------------------
// Q4: Select dropdown
//
// Task:
// <select value={city} onChange=...>
//
// In simple words:
// Same controlled pattern. Options as children.
// -----------------------------------------------------------------------------
function CitySelect() {
  const [city, setCity] = useState("pune");
  return (
    <select value={city} onChange={(e) => setCity(e.target.value)}>
      <option value="pune">Pune</option>
      <option value="delhi">Delhi</option>
    </select>
  );
}

// -----------------------------------------------------------------------------
// Q5: Textarea
//
// Task:
// <textarea value={bio} onChange=...> — not children text HTML style.
//
// In simple words:
// In React, textarea is also controlled with value prop.
// -----------------------------------------------------------------------------
function Bio() {
  const [bio, setBio] = useState("");
  return (
    <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={4} />
  );
}

// -----------------------------------------------------------------------------
// Q6: Simple validation + disable submit
//
// Task:
// If email has no @, disable button.
//
// In simple words:
// Derived: const valid = email.includes("@"). Do not keep separate isValid state to sync.
// -----------------------------------------------------------------------------
function EmailForm() {
  const [email, setEmail] = useState("");
  const valid = email.includes("@");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!valid) return;
        console.log(email);
      }}
    >
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <button type="submit" disabled={!valid}>
        Submit
      </button>
    </form>
  );
}

// -----------------------------------------------------------------------------
// Q7: [MID] Radio group
//
// Task:
// same name, checked={plan === "pro"}, set value on change.
//
// In simple words:
// One state string = selected radio.
// -----------------------------------------------------------------------------
function PlanPicker() {
  const [plan, setPlan] = useState("free");
  return (
    <div>
      <label>
        <input
          type="radio"
          checked={plan === "free"}
          onChange={() => setPlan("free")}
        />
        Free
      </label>
      <label>
        <input
          type="radio"
          checked={plan === "pro"}
          onChange={() => setPlan("pro")}
        />
        Pro
      </label>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q8: [MID] Reset form
//
// Task:
// Clear with setForm(initial).
//
// In simple words:
// Controlled reset = state back to initial. DOM reset() is optional.
// -----------------------------------------------------------------------------
const INITIAL = { title: "", body: "" };

function NoteForm() {
  const [form, setForm] = useState(INITIAL);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log(form);
        setForm(INITIAL);
      }}
    >
      <input
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <button type="button" onClick={() => setForm(INITIAL)}>
        Reset
      </button>
      <button type="submit">Save</button>
    </form>
  );
}

// -----------------------------------------------------------------------------
// Q9: Number input controlled
//
// Task:
// type="number" value={qty} — parseInt/Number on change.
//
// In simple words:
// Input value is string. Convert to number for math.
// -----------------------------------------------------------------------------
function QtyInput() {
  const [qty, setQty] = useState(1);
  return (
    <input
      type="number"
      value={qty}
      onChange={(e) => setQty(Number(e.target.value) || 0)}
    />
  );
}

// -----------------------------------------------------------------------------
// Q10: Multi checkbox (array state)
//
// Task:
// checked={selected.includes(id)} toggle array add/remove.
//
// In simple words:
// Multiple select — string[] state. Each box has its own id.
// -----------------------------------------------------------------------------
function Toppings() {
  const [selected, setSelected] = useState([]);
  const options = ["cheese", "olive", "corn"];
  function toggle(opt) {
    setSelected((prev) =>
      prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]
    );
  }
  return (
    <div>
      {options.map((opt) => (
        <label key={opt}>
          <input
            type="checkbox"
            checked={selected.includes(opt)}
            onChange={() => toggle(opt)}
          />
          {opt}
        </label>
      ))}
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q11: Validation UX — inline error
//
// Task:
// touched state; show error on blur, clear while typing.
//
// In simple words:
// Error only on submit feels rude. Field-level feedback is better UX.
// -----------------------------------------------------------------------------
function InlineError() {
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const error = touched && !email.includes("@") ? "Enter a valid email" : "";
  return (
    <div>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={() => setTouched(true)}
      />
      {error && <span className="err">{error}</span>}
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q12: Submit disabled until valid
//
// Task:
// const canSubmit = name.trim() && password.length >= 8;
//
// In simple words:
// Derived flag — do not sync separate isValid state. Button disabled={!canSubmit}.
// -----------------------------------------------------------------------------
function SecureSignup() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const canSubmit = name.trim().length > 0 && password.length >= 8;
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" disabled={!canSubmit}>
        Join
      </button>
    </form>
  );
}

// -----------------------------------------------------------------------------
// Q13: FormData vs controlled sketch
//
// Task:
// onSubmit: new FormData(e.target) — uncontrolled bulk submit.
//
// In simple words:
// Simple forms OK. Live validation / disable button needs controlled better.
// -----------------------------------------------------------------------------
function FormDataSketch() {
  function submit(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    console.log(Object.fromEntries(fd));
  }
  return (
    <form onSubmit={submit}>
      <input name="title" defaultValue="" />
      <button type="submit">Send</button>
    </form>
  );
}

// -----------------------------------------------------------------------------
// Q14: File input — uncontrolled note
//
// Task:
// type="file" — setting value is restricted; use ref or FormData.
//
// In simple words:
// Controlled file is rare. Store file object in state onChange if needed.
// -----------------------------------------------------------------------------
function FileUpload() {
  const [file, setFile] = useState(null);
  return (
    <input
      type="file"
      onChange={(e) => setFile(e.target.files?.[0] ?? null)}
    />
  );
}

// -----------------------------------------------------------------------------
// Q15: [MID] Nested form state
//
// Task:
// form = { user: { name, addr: { city } } } — spread for deep update.
//
// In simple words:
// Nested path: setForm({ ...form, user: { ...form.user, name: v } }). Or use reducer.
// -----------------------------------------------------------------------------
function NestedAddress() {
  const [form, setForm] = useState({
    user: { name: "", addr: { city: "" } },
  });
  return (
    <input
      value={form.user.addr.city}
      onChange={(e) =>
        setForm({
          ...form,
          user: {
            ...form.user,
            addr: { ...form.user.addr, city: e.target.value },
          },
        })
      }
    />
  );
}

// -----------------------------------------------------------------------------
// Q16: Select multiple
//
// Task:
// <select multiple value={tags} onChange> — value is array.
//
// In simple words:
// Ctrl+click multi. Can also build array from selectedOptions.
// -----------------------------------------------------------------------------
function MultiSelect() {
  const [tags, setTags] = useState(["js"]);
  return (
    <select
      multiple
      value={tags}
      onChange={(e) =>
        setTags([...e.target.selectedOptions].map((o) => o.value))
      }
    >
      <option value="js">JS</option>
      <option value="react">React</option>
      <option value="css">CSS</option>
    </select>
  );
}

// -----------------------------------------------------------------------------
// Q17: Controlled vs defaultValue mix do not
//
// Task:
// Do not put value + defaultValue on same input — pick one pattern.
//
// In simple words:
// Switching controlled/uncontrolled mid-life = warning. Stay consistent.
// -----------------------------------------------------------------------------
function ControlledOnly() {
  const [text, setText] = useState("");
  return <input value={text} onChange={(e) => setText(e.target.value)} />;
}

// -----------------------------------------------------------------------------
// Q18: onSubmit preventDefault required
//
// Task:
// On form submit stop page reload; run your handler.
//
// In simple words:
// Without preventDefault browser navigates/reloads. Always stop in SPAs.
// -----------------------------------------------------------------------------
function SafeSubmit() {
  const [msg, setMsg] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log(msg);
      }}
    >
      <input value={msg} onChange={(e) => setMsg(e.target.value)} />
      <button type="submit">Go</button>
    </form>
  );
}

// -----------------------------------------------------------------------------
// Q19: Read-only controlled display
//
// Task:
// value={computed} readOnly — user cannot edit, still controlled.
//
// In simple words:
// Summary field, slug preview — derive from state, show in input.
// -----------------------------------------------------------------------------
function SlugPreview() {
  const [title, setTitle] = useState("");
  const slug = title.toLowerCase().replace(/\s+/g, "-");
  return (
    <div>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <input value={slug} readOnly />
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q20: [MID] React 19 form actions contrast
//
// Task:
// <form action={async (fd) => { "use server" }} /> vs onSubmit + useState.
//
// In simple words:
// Actions = declarative submit flow, pending state via useFormStatus. Classic controlled still valid.
// -----------------------------------------------------------------------------
function ClassicVsActionNote() {
  const [pending, setPending] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    setPending(true);
    // await save...
    setPending(false);
  }
  return (
    <form onSubmit={handleSubmit}>
      <button disabled={pending}>{pending ? "Saving..." : "Save"}</button>
    </form>
  );
}

// -----------------------------------------------------------------------------
// Q21: Input name for FormData
//
// Task:
// Each field name="fieldName" — key appears in FormData.
//
// In simple words:
// In controlled forms keep name too if mixing FormData / progressive enhancement.
// -----------------------------------------------------------------------------
function NamedFields() {
  const [form, setForm] = useState({ title: "", body: "" });
  return (
    <form>
      <input
        name="title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
    </form>
  );
}

// -----------------------------------------------------------------------------
// Q22: Max length live counter
//
// Task:
// maxLength={100} + show {text.length}/100.
//
// In simple words:
// Controlled makes live feedback easy — derived count in render.
// -----------------------------------------------------------------------------
function BioCounter() {
  const [text, setText] = useState("");
  const max = 100;
  return (
    <div>
      <textarea
        value={text}
        maxLength={max}
        onChange={(e) => setText(e.target.value)}
      />
      <span>
        {text.length}/{max}
      </span>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q23: Pattern HTML + JS double validate
//
// Task:
// pattern="[0-9]+" browser hint + JS check on submit.
//
// In simple words:
// HTML validation helps UX; do not trust it alone — server + JS too.
// -----------------------------------------------------------------------------
function PhoneField() {
  const [phone, setPhone] = useState("");
  const valid = /^\d{10}$/.test(phone);
  return (
    <input
      value={phone}
      pattern="\d{10}"
      onChange={(e) => setPhone(e.target.value)}
      aria-invalid={!valid && phone.length > 0}
    />
  );
}

// -----------------------------------------------------------------------------
// Q24: Fieldset disabled group
//
// Task:
// <fieldset disabled={loading}> — turn off all fields at once.
//
// In simple words:
// Lock form during submit — do not disable each input separately.
// -----------------------------------------------------------------------------
function LoadingForm({ loading }) {
  const [email, setEmail] = useState("");
  return (
    <fieldset disabled={loading}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <button type="submit">{loading ? "..." : "Submit"}</button>
    </fieldset>
  );
}

export {
  ControlledInput,
  Signup,
  Terms,
  CitySelect,
  Bio,
  EmailForm,
  PlanPicker,
  NoteForm,
  QtyInput,
  Toppings,
  InlineError,
  SecureSignup,
  FormDataSketch,
  FileUpload,
  NestedAddress,
  MultiSelect,
  ControlledOnly,
  SafeSubmit,
  SlugPreview,
  ClassicVsActionNote,
  NamedFields,
  BioCounter,
  PhoneField,
  LoadingForm,
};
