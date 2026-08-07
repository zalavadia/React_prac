// ============================================================================
// 46 — Auth Patterns + React Hook Form + Zod
// Level: MID  |  Sequence: pehle 11 (context), 08 (forms), phir yeh
// ============================================================================
//
// LAYMAN: Auth = kaun logged in hai + routes protect. Token memory/localStorage/
// httpOnly cookie — tradeoffs. RHF = forms bina har keystroke re-render;
// Zod = schema validation TypeScript-friendly. zodResolver dono jodta hai.
//
// KYUN: Real apps me login, protected pages, validated forms daily kaam.
// INTERVIEW: token storage XSS; ProtectedRoute; RHF register vs Controller;
// server errors → setError.
// Vite/React 19 project me use — teaching file.
//
// ============================================================================

import {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
  useEffect,
} from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
  Link,
  Outlet,
} from "react-router-dom";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// =============================================================================
// PART A — AUTH PATTERNS
// =============================================================================

// -----------------------------------------------------------------------------
// Q1: Token in memory vs localStorage — tradeoffs
//
// Kya karna hai:
// Dono storage strategies compare karo interview me.
//
// Seedha matlab:
// Memory (React state / module var): XSS se chori ho sakta hai JS read karke,
// lekin refresh pe token lost — tab close = logout. Zyada secure feel SPA me
// agar refresh token httpOnly cookie se aaye.
// localStorage: persist across refresh; XSS = game over (document.cookie/localStorage
// readable by injected script). Never store refresh token in localStorage prod me
// agar XSS risk hai.
// Best prod sketch: access token memory/short-lived; refresh httpOnly Secure cookie.
// -----------------------------------------------------------------------------
let memoryAccessToken = null;

export function setMemoryToken(token) {
  memoryAccessToken = token;
}

export function getMemoryToken() {
  return memoryAccessToken;
}

export function persistTokenLocal(token) {
  localStorage.setItem("access_token", token);
}

export function readTokenLocal() {
  return localStorage.getItem("access_token");
}

const tokenTradeoffs =
  "Memory = lost on refresh, slightly less persistent XSS window. localStorage = persists, XSS steals easily.";

// -----------------------------------------------------------------------------
// Q2: AuthContext provider
//
// Kya karna hai:
// user, login, logout, loading — tree-wide auth state.
//
// Seedha matlab:
// createContext + Provider. Value stable via useMemo where possible.
// Children useAuth() se consume. Real app: bootstrap me /me fetch.
// -----------------------------------------------------------------------------
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [bootstrapping, setBootstrapping] = useState(true);

  // sketch: on mount read token + fetch profile
  useEffect(() => {
    const t = readTokenLocal();
    if (t) {
      fetch("/api/me", { headers: { Authorization: `Bearer ${t}` } })
        .then((r) => (r.ok ? r.json() : null))
        .then((u) => setUser(u))
        .finally(() => setBootstrapping(false));
    } else {
      setBootstrapping(false);
    }
  }, []);

  const login = useCallback((profile, token) => {
    persistTokenLocal(token);
    setMemoryToken(token);
    setUser(profile);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("access_token");
    setMemoryToken(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, login, logout, bootstrapping, isAuthenticated: !!user }),
    [user, login, logout, bootstrapping]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}

// -----------------------------------------------------------------------------
// Q3: login / logout flow
//
// Kya karna hai:
// Credentials POST → token + user → context update.
//
// Seedha matlab:
// login({ email, password }) async → API → login(profile, token).
// logout clears storage + context. UI conditional on user.
// -----------------------------------------------------------------------------
async function fakeLoginApi(email, password) {
  await new Promise((r) => setTimeout(r, 200));
  if (email === "a@a.com" && password === "pass") {
    return { token: "fake-jwt", user: { id: 1, email, role: "user" } };
  }
  throw new Error("Invalid credentials");
}

export function LoginLogoutButtons() {
  const { user, login, logout } = useAuth();

  async function handleLogin() {
    const { token, user: profile } = await fakeLoginApi("a@a.com", "pass");
    login(profile, token);
  }

  if (user) {
    return (
      <p>
        Hi {user.email}{" "}
        <button type="button" onClick={logout}>
          Logout
        </button>
      </p>
    );
  }
  return <button type="button" onClick={handleLogin}>Login</button>;
}

// -----------------------------------------------------------------------------
// Q4: ProtectedRoute component
//
// Kya karna hai:
// Auth nahi → redirect login; warna children/outlet render.
//
// Seedha matlab:
// if (!user) return <Navigate to="/login" replace state={{ from: location }} />.
// bootstrapping pe spinner — flash redirect avoid.
// -----------------------------------------------------------------------------
export function ProtectedRoute({ children }) {
  const { isAuthenticated, bootstrapping } = useAuth();
  const location = useLocation();

  if (bootstrapping) return <p>Checking session…</p>;
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children ?? <Outlet />;
}

// -----------------------------------------------------------------------------
// Q5: Attach Authorization header (API client sketch)
//
// Kya karna hai:
// Har fetch me Bearer token auto attach.
//
// Seedha matlab:
// Wrapper api.get/post — token memory ya localStorage se padh ke header set.
// 401 aaye → refresh flow ya logout. Centralize — har component me mat likho.
// -----------------------------------------------------------------------------
export async function apiFetch(path, options = {}) {
  const token = getMemoryToken() ?? readTokenLocal();
  const headers = {
    ...options.headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
  const res = await fetch(path, { ...options, headers });
  if (res.status === 401) {
    // trigger refresh or logout — see Q6
    throw new Error("Unauthorized");
  }
  return res;
}

// -----------------------------------------------------------------------------
// Q6: Refresh token sketch
//
// Kya karna hai:
// Access expire → refresh endpoint → naya access; fail → logout.
//
// Seedha matlab:
// Refresh token httpOnly cookie me (server set) — JS read nahi kar sakta.
// POST /auth/refresh credentials:include → new access token JSON.
// Queue: parallel 401 pe ek refresh, baaki requests wait.
// Memory me naya access store; refresh rotate ho to cookie auto update server side.
// -----------------------------------------------------------------------------
let refreshPromise = null;

export async function refreshAccessToken() {
  if (!refreshPromise) {
    refreshPromise = fetch("/auth/refresh", { method: "POST", credentials: "include" })
      .then((r) => {
        if (!r.ok) throw new Error("refresh failed");
        return r.json();
      })
      .then(({ accessToken }) => {
        setMemoryToken(accessToken);
        return accessToken;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
}

// -----------------------------------------------------------------------------
// Q7: Route guards — role / feature flags
//
// Kya karna hai:
// Authenticated + role check alag layer.
//
// Seedha matlab:
// ProtectedRoute = logged in. RoleRoute = user.role === 'admin'.
// Feature guard = subscription active. Compose nested routes.
// Unauthorized role → 403 page, login pe mat bhejo (already authed).
// -----------------------------------------------------------------------------
export function RoleRoute({ role, children }) {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (user?.role !== role) return <Navigate to="/403" replace />;
  return children;
}

// -----------------------------------------------------------------------------
// Q8: Role-based UI (admin panel toggle)
//
// Kya karna hai:
// Same page pe admin-only buttons conditionally.
//
// Seedha matlab:
// user?.role === 'admin' && <AdminTools />.
// UI hide ≠ security — API bhi authorize kare. Client guard UX ke liye.
// -----------------------------------------------------------------------------
export function AdminPanel() {
  const { user } = useAuth();
  if (user?.role !== "admin") return null;
  return (
    <section>
      <h2>Admin</h2>
      <button type="button">Delete all</button>
    </section>
  );
}

// -----------------------------------------------------------------------------
// Q9: Redirect after login — location.state.from
//
// Kya karna hai:
// Protected redirect se aaye to wapas intended URL pe bhejo.
//
// Seedha matlab:
// Login page: const from = location.state?.from?.pathname || '/dashboard'.
// navigate(from, { replace: true }) after success.
// Open redirect se bachne ke liye internal paths validate karo.
// -----------------------------------------------------------------------------
export function LoginRedirectPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  async function onSuccess(profile, token) {
    login(profile, token);
    const from = location.state?.from?.pathname ?? "/dashboard";
    const safe = from.startsWith("/") && !from.startsWith("//") ? from : "/dashboard";
    navigate(safe, { replace: true });
  }

  return (
    <button type="button" onClick={() => onSuccess({ email: "a@a.com", role: "user" }, "t")}>
      Login & return
    </button>
  );
}

// -----------------------------------------------------------------------------
// Q10: Secure httpOnly cookies — comment note
//
// Kya karna hai:
// Prod token strategy explain karo bina full backend.
//
// Seedha matlab:
// Set-Cookie: refresh=...; HttpOnly; Secure; SameSite=Strict.
// Browser auto sends cookie — JS document.cookie se read NAHI.
// XSS se refresh chori mushkil (access short-lived memory me).
// CSRF: SameSite + anti-CSRF token POST pe. SPA + separate API domain = careful CORS.
// -----------------------------------------------------------------------------
const httpOnlyNote =
  "HttpOnly cookies hide refresh token from JS — preferred over localStorage for long-lived secrets.";

// -----------------------------------------------------------------------------
// Q11: XSS token theft note
//
// Kya karna hai:
// Kyun localStorage risky — interview security angle.
//
// Seedha matlab:
// Attacker injected script: localStorage.getItem('access_token') → exfiltrate.
// Any innerHTML/dangerouslySetInnerHTML/eval/third-party script risk.
// Mitigate: CSP, sanitize, httpOnly refresh, short access TTL, rotate.
// Auth token kabhi URL query me mat rakho (logs/referrer leak).
// -----------------------------------------------------------------------------
const xssNote =
  "XSS + localStorage token = full account takeover until expiry; prefer HttpOnly refresh + CSP.";

// =============================================================================
// PART B — REACT HOOK FORM + ZOD
// =============================================================================

// -----------------------------------------------------------------------------
// Q12: useForm basics
//
// Kya karna hai:
// Form instance banao — register, handleSubmit, formState.
//
// Seedha matlab:
// const { register, handleSubmit, formState } = useForm({ defaultValues }).
// Uncontrolled-by-default — refs se DOM read; kam re-renders vs pure controlled.
// mode: 'onBlur' | 'onChange' validation timing.
// -----------------------------------------------------------------------------
export function SimpleRhfForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { title: "" },
  });

  async function onSubmit(data) {
    await new Promise((r) => setTimeout(r, 300));
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("title", { required: "Title required" })} />
      {errors.title && <span>{errors.title.message}</span>}
      <button disabled={isSubmitting}>{isSubmitting ? "Saving…" : "Save"}</button>
    </form>
  );
}

// -----------------------------------------------------------------------------
// Q13: register — wiring native inputs
//
// Kya karna hai:
// spread register('fieldName', rules) on input/select/textarea.
//
// Seedha matlab:
// register returns { name, ref, onChange, onBlur }. name attribute auto.
// Validation rules inline ya resolver se. defaultValues match field names.
// Checkbox: register('agree') — value boolean via RHF v7 patterns.
// -----------------------------------------------------------------------------
export function RegisterDemo() {
  const { register, handleSubmit } = useForm({
    defaultValues: { email: "", agree: false },
  });
  return (
    <form onSubmit={handleSubmit(console.log)}>
      <input {...register("email", { required: true })} type="email" />
      <label>
        <input type="checkbox" {...register("agree")} /> I agree
      </label>
      <button type="submit">Go</button>
    </form>
  );
}

// -----------------------------------------------------------------------------
// Q14: handleSubmit — valid data callback
//
// Kya karna hai:
// Invalid pe callback nahi; valid pe async OK.
//
// Seedha matlab:
// handleSubmit(onValid, onInvalid). preventDefault automatic.
// Async submit errors khud catch — isSubmitting reset RHF karta hai.
// e.preventDefault manually mat — handleSubmit wrap karo.
// -----------------------------------------------------------------------------
export function HandleSubmitDemo() {
  const { register, handleSubmit } = useForm();

  function onValid(data) {
    console.log("valid", data);
  }
  function onInvalid(errs) {
    console.log("invalid", errs);
  }

  return (
    <form onSubmit={handleSubmit(onValid, onInvalid)}>
      <input {...register("name", { required: "Name needed" })} />
      <button type="submit">Submit</button>
    </form>
  );
}

// -----------------------------------------------------------------------------
// Q15: formState — errors, isSubmitting, isDirty, touchedFields
//
// Kya karna hai:
// Destructure formState for UI feedback.
//
// Seedha matlab:
// errors.field?.message — show under input.
// isSubmitting — disable button during async submit.
// isDirty — unsaved changes warning. touchedFields — blur ke baad errors dikhao.
// Proxy: formState subscribe — destructuring recommended fields explicitly.
// -----------------------------------------------------------------------------
export function FormStateDemo() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({ defaultValues: { bio: "" } });

  return (
    <form onSubmit={handleSubmit(async () => {})}>
      <textarea {...register("bio", { minLength: { value: 10, message: "Min 10" } })} />
      {errors.bio && <em>{errors.bio.message}</em>}
      <button disabled={isSubmitting || !isDirty}>
        {isSubmitting ? "Posting…" : "Post"}
      </button>
    </form>
  );
}

// -----------------------------------------------------------------------------
// Q16: Controller — controlled / third-party UI (MUI, react-select)
//
// Kya karna hai:
// Non-native input ko RHF se connect karo.
//
// Seedha matlab:
// <Controller name="color" control={control} render={({ field }) => (
//   <Select {...field} options={...} />
// )} />.
// field = { value, onChange, onBlur, ref, name }. Custom components need value/onChange.
// -----------------------------------------------------------------------------
export function ControllerDemo() {
  const { control, handleSubmit } = useForm({ defaultValues: { mood: "happy" } });

  return (
    <form onSubmit={handleSubmit(console.log)}>
      <Controller
        name="mood"
        control={control}
        rules={{ required: "Pick mood" }}
        render={({ field, fieldState }) => (
          <div>
            <select {...field}>
              <option value="happy">Happy</option>
              <option value="sad">Sad</option>
            </select>
            {fieldState.error && <span>{fieldState.error.message}</span>}
          </div>
        )}
      />
      <button type="submit">OK</button>
    </form>
  );
}

// -----------------------------------------------------------------------------
// Q17: reset — clear or preload form
//
// Kya karna hai:
// Successful submit ke baad ya edit cancel pe reset().
//
// Seedha matlab:
// reset() — defaultValues pe wapas. reset({ email: 'x@y.com' }) — new defaults.
// keepDirtyValues option. Edit form: fetch user → reset(fetched).
// key={user.id} remount alternative heavy forms me.
// -----------------------------------------------------------------------------
export function ResetDemo() {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { note: "" },
  });

  async function onSubmit(data) {
    await fakeSave(data);
    reset(); // back to empty
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("note")} />
      <button type="submit">Save</button>
      <button type="button" onClick={() => reset({ note: "draft restored" })}>
        Load draft
      </button>
    </form>
  );
}

async function fakeSave() {
  return true;
}

// -----------------------------------------------------------------------------
// Q18: setError — manual / server field errors
//
// Kya karna hai:
// API 400 pe specific field pe error set karo.
//
// Seedha matlab:
// setError('email', { type: 'server', message: 'Already taken' }).
// root/server level: setError('root', { message: 'Login failed' }).
// clearErrors('email') before retry. shouldFocus: true option.
// -----------------------------------------------------------------------------
export function SetErrorDemo() {
  const { register, handleSubmit, setError, formState: { errors } } = useForm();

  async function onSubmit(data) {
    const res = await fakeCheckEmail(data.email);
    if (res.taken) {
      setError("email", { type: "server", message: "Email already registered" });
      return;
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email")} />
      {errors.email && <p>{errors.email.message}</p>}
      {errors.root && <p>{errors.root.message}</p>}
      <button type="submit">Check</button>
    </form>
  );
}

async function fakeCheckEmail(email) {
  return { taken: email === "taken@test.com" };
}

// -----------------------------------------------------------------------------
// Q19: watch — reactive field values
//
// Kya karna hai:
// Ek field doosri pe depend — live preview / conditional fields.
//
// Seedha matlab:
// const role = watch('role'). watch() — poora form (careful perf).
// useWatch({ name: 'role' }) finer subscription. subscription less re-render than watch all.
// password confirm: watch('password') compare in validate function.
// -----------------------------------------------------------------------------
export function WatchDemo() {
  const { register, watch } = useForm({ defaultValues: { plan: "free", company: "" } });
  const plan = watch("plan");

  return (
    <form>
      <select {...register("plan")}>
        <option value="free">Free</option>
        <option value="pro">Pro</option>
      </select>
      {plan === "pro" && <input {...register("company", { required: true })} placeholder="Company" />}
    </form>
  );
}

// -----------------------------------------------------------------------------
// Q20: useFieldArray — dynamic list fields
//
// Kya karna hai:
// Append/remove rows (phones, line items).
//
// Seedha matlab:
// const { fields, append, remove } = useFieldArray({ control, name: 'phones' }).
// map fields with key={field.id} — NOT index. register(`phones.${index}.number`).
// defaultValues: { phones: [{ number: '' }] }.
// -----------------------------------------------------------------------------
const phonesSchema = z.object({
  phones: z.array(z.object({ number: z.string().min(8) })).min(1),
});

export function FieldArrayDemo() {
  const { register, control, handleSubmit } = useForm({
    defaultValues: { phones: [{ number: "" }] },
    resolver: zodResolver(phonesSchema),
  });
  const { fields, append, remove } = useFieldArray({ control, name: "phones" });

  return (
    <form onSubmit={handleSubmit(console.log)}>
      {fields.map((field, index) => (
        <div key={field.id}>
          <input {...register(`phones.${index}.number`)} placeholder="Phone" />
          <button type="button" onClick={() => remove(index)}>×</button>
        </div>
      ))}
      <button type="button" onClick={() => append({ number: "" })}>Add phone</button>
      <button type="submit">Save</button>
    </form>
  );
}

// -----------------------------------------------------------------------------
// Q21: Zod — z.object schema
//
// Kya karna hai:
// Fields + messages define; parse/safeParse.
//
// Seedha matlab:
// z.object({ email: z.string().email(), age: z.coerce.number().min(18) }).
// safeParse returns { success, data | error }. error.flatten() field errors.
// Reusable schemas share client/server (tRPC, API validation).
// -----------------------------------------------------------------------------
export const loginSchema = z.object({
  email: z.string().email("Valid email chahiye"),
  password: z.string().min(8, "Min 8 characters"),
});

// -----------------------------------------------------------------------------
// Q22: refine / superRefine — cross-field rules
//
// Kya karna hai:
// Password === confirm; custom business rules.
//
// Seedha matlab:
// .refine(data => data.password === data.confirm, { message, path: ['confirm'] }).
// superRefine — multiple issues, ctx.addIssue. Complex validation ke liye.
// -----------------------------------------------------------------------------
export const signupSchema = z
  .object({
    password: z.string().min(8),
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, {
    message: "Passwords match nahi",
    path: ["confirm"],
  });

// -----------------------------------------------------------------------------
// Q23: z.infer — TypeScript type from schema
//
// Kya karna hai:
// Schema se form data type nikalo (comments me TS).
//
// Seedha matlab:
// type LoginInput = z.infer<typeof loginSchema>;
// // { email: string; password: string }
// JSX file me JSDoc: @typedef {z.infer<typeof loginSchema>} LoginInput
// Single source of truth — schema change → type follows in TS projects.
// -----------------------------------------------------------------------------
/** @typedef {z.infer<typeof loginSchema>} LoginInput */

// -----------------------------------------------------------------------------
// Q24: zodResolver — RHF + Zod bridge
//
// Kya karna hai:
// useForm({ resolver: zodResolver(schema) }) — errors auto map.
//
// Seedha matlab:
// Client validation Zod se; RHF errors object populate.
// mode 'onChange' + zod = live Zod messages.
// Multiple schemas: discriminatedUnion for form variants.
// -----------------------------------------------------------------------------
export function ZodResolverDemo() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  return (
    <form onSubmit={handleSubmit(console.log)}>
      <input {...register("email")} />
      {errors.email && <span>{errors.email.message}</span>}
      <input type="password" {...register("password")} />
      {errors.password && <span>{errors.password.message}</span>}
      <button type="submit">Login</button>
    </form>
  );
}

// -----------------------------------------------------------------------------
// Q25: Combined login — RHF + Zod + Auth submit
//
// Kya karna hai:
// Full login form → API → AuthContext login → navigate.
//
// Seedha matlab:
// handleSubmit async → fakeLoginApi → login(user, token) → navigate(from).
// isSubmitting disable button. root error invalid credentials.
// -----------------------------------------------------------------------------
export function LoginFormFull() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(data) {
    try {
      const { token, user } = await fakeLoginApi(data.email, data.password);
      login(user, token);
      const from = location.state?.from?.pathname ?? "/dashboard";
      navigate(from, { replace: true });
    } catch {
      setError("root", { message: "Invalid email or password" });
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email")} autoComplete="email" />
      {errors.email && <p>{errors.email.message}</p>}
      <input type="password" {...register("password")} autoComplete="current-password" />
      {errors.password && <p>{errors.password.message}</p>}
      {errors.root && <p role="alert">{errors.root.message}</p>}
      <button disabled={isSubmitting}>{isSubmitting ? "Signing in…" : "Sign in"}</button>
    </form>
  );
}

// -----------------------------------------------------------------------------
// Q26: Server errors mapped to fields (400 validation payload)
//
// Kya karna hai:
// API fieldErrors object → loop setError.
//
// Seedha matlab:
// Response { errors: { email: 'Taken', username: 'Too short' } }.
// Object.entries(map).forEach(([field, message]) => setError(field, { type: 'server', message })).
// Non-field errors → root. Zod client pehle; server authoritative duplicate email etc.
// -----------------------------------------------------------------------------
export function mapServerErrors(setError, payload) {
  if (payload.errors) {
    Object.entries(payload.errors).forEach(([field, message]) => {
      setError(field, { type: "server", message: String(message) });
    });
  }
  if (payload.message) {
    setError("root", { message: payload.message });
  }
}

export function ServerErrorsForm() {
  const { register, handleSubmit, setError, formState: { errors } } = useForm({
    resolver: zodResolver(z.object({ username: z.string().min(3) })),
  });

  async function onSubmit(data) {
    const res = await fakeRegisterApi(data);
    if (!res.ok) {
      mapServerErrors(setError, res.body);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("username")} />
      {errors.username && <span>{errors.username.message}</span>}
      {errors.root && <span>{errors.root.message}</span>}
      <button type="submit">Register</button>
    </form>
  );
}

async function fakeRegisterApi(data) {
  if (data.username === "taken") {
    return { ok: false, body: { errors: { username: "Username taken" } } };
  }
  return { ok: true };
}

// =============================================================================
// PART C — WIRED APP SKETCH
// =============================================================================

function DashboardPage() {
  return <h1>Dashboard (protected)</h1>;
}

function LoginPageRoute() {
  return <LoginFormFull />;
}

export function AuthFormsApp() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          <LoginLogoutButtons />
        </nav>
        <Routes>
          <Route path="/login" element={<LoginPageRoute />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route path="/403" element={<p>Forbidden</p>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

// -----------------------------------------------------------------------------
// Quick revise map
// 11 context → 08 forms → 22 routing → 46 auth+RHF+Zod
// Security: Q10 httpOnly, Q11 XSS | Forms: Q12–20 RHF, Q21–24 Zod
// -----------------------------------------------------------------------------
