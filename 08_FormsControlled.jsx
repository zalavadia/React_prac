// ============================================================================
// 08 — Forms Controlled
// Level: BASE  |  Sequence: pehle yeh, phir agla number
// ============================================================================
//
// LAYMAN: Controlled input = React state boss hai. Input dikhata hai jo state
// kehti hai. Har type pe onChange → setState → dubara value={state}.
// Uncontrolled = DOM apna rakhe (ref) — 25 me compare.
//
// Form: saari fields state (ya ek object), submit pe preventDefault + validate.
// select, checkbox, radio bhi value/checked + onChange.
//
// KYUN: Validation, disable button, live preview — controlled se asaan.
// INTERVIEW: controlled vs uncontrolled; single source of truth.
// Vite/React 19 project me use — teaching file.
//
// ============================================================================

import { useState } from "react";

// -----------------------------------------------------------------------------
// Q1: Single controlled input
//
// Kya karna hai:
// value + onChange pair.
//
// Seedha matlab:
// Bina value={state} controlled nahi. Bina onChange read-only feel.
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
// Kya karna hai:
// form = { name, email }; name se update.
//
// Seedha matlab:
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
// Kya karna hai:
// checked={agree} onChange → setAgree(e.target.checked)
//
// Seedha matlab:
// Checkbox pe value nahi — checked boolean.
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
// Kya karna hai:
// <select value={city} onChange=...>
//
// Seedha matlab:
// Same controlled pattern. Options children.
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
// Kya karna hai:
// <textarea value={bio} onChange=...> — children text HTML style mat.
//
// Seedha matlab:
// React me textarea bhi value prop se control.
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
// Kya karna hai:
// email me @ nahi to button disabled.
//
// Seedha matlab:
// Derived: const valid = email.includes("@"). State alag mat rakhna sync ke liye.
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
// Kya karna hai:
// same name, checked={plan === "pro"}, value set on change.
//
// Seedha matlab:
// Ek state string = selected radio.
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
// Kya karna hai:
// setForm(initial) se clear.
//
// Seedha matlab:
// Controlled me reset = state wapas initial. DOM reset() optional.
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
// Kya karna hai:
// type="number" value={qty} — parseInt/Number on change.
//
// Seedha matlab:
// value string hoti hai input se. Math ke liye number me convert.
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
// Kya karna hai:
// checked={selected.includes(id)} toggle array add/remove.
//
// Seedha matlab:
// Multiple select — string[] state. Har box alag id.
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
// Kya karna hai:
// touched state; blur pe error dikhao, type karte hi clear.
//
// Seedha matlab:
// Submit pe hi error = rude. Field-level feedback better UX.
// -----------------------------------------------------------------------------
function InlineError() {
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const error = touched && !email.includes("@") ? "Valid email daalo" : "";
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
// Kya karna hai:
// const canSubmit = name.trim() && password.length >= 8;
//
// Seedha matlab:
// Derived flag — alag isValid state sync mat. Button disabled={!canSubmit}.
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
// Kya karna hai:
// onSubmit: new FormData(e.target) — uncontrolled bulk submit.
//
// Seedha matlab:
// Simple forms OK. Live validation / disable button ke liye controlled better.
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
// Kya karna hai:
// type="file" — value set karna restricted; ref ya FormData use.
//
// Seedha matlab:
// Controlled file rare. onChange me file object state me rakho agar chahiye.
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
// Kya karna hai:
// form = { user: { name, addr: { city } } } — spread deep update.
//
// Seedha matlab:
// Nested path: setForm({ ...form, user: { ...form.user, name: v } }). Ya reducer.
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
// Kya karna hai:
// <select multiple value={tags} onChange> — value array.
//
// Seedha matlab:
// Ctrl+click multi. selectedOptions se array bhi bana sakte ho.
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
// Q17: Controlled vs defaultValue mix mat
//
// Kya karna hai:
// Ek input pe value + defaultValue dono mat — pick one pattern.
//
// Seedha matlab:
// Switch controlled/uncontrolled mid-life = warning. Consistent raho.
// -----------------------------------------------------------------------------
function ControlledOnly() {
  const [text, setText] = useState("");
  return <input value={text} onChange={(e) => setText(e.target.value)} />;
}

// -----------------------------------------------------------------------------
// Q18: onSubmit preventDefault zaroori
//
// Kya karna hai:
// form submit pe page reload roko; apna handler chalao.
//
// Seedha matlab:
// Bina preventDefault browser navigate/reload. SPA me hamesha roko.
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
// Kya karna hai:
// value={computed} readOnly — user edit nahi, still controlled.
//
// Seedha matlab:
// Summary field, slug preview — state se derive, input dikhao.
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
// Kya karna hai:
// <form action={async (fd) => { "use server" }} /> vs onSubmit + useState.
//
// Seedha matlab:
// Actions = submit flow declarative, pending state useFormStatus se. Classic controlled ab bhi valid.
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
// Kya karna hai:
// Har field name="fieldName" — FormData me key aati hai.
//
// Seedha matlab:
// Controlled me bhi name rakho agar progressive enhancement / FormData mix ho.
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
// Kya karna hai:
// maxLength={100} + {text.length}/100 dikhao.
//
// Seedha matlab:
// Controlled se live feedback easy — derived count render me.
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
// Kya karna hai:
// pattern="[0-9]+" browser hint + JS me bhi check submit pe.
//
// Seedha matlab:
// HTML validation UX help; trust mat — server + JS bhi.
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
// Kya karna hai:
// <fieldset disabled={loading}> — saari fields ek saath off.
//
// Seedha matlab:
// Submit ke dauran form lock — har input pe alag disabled mat lagao.
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
