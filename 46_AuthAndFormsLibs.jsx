// ============================================================================
// 46 — Auth Patterns + React Hook Form + Zod
// Level: MID  |  Sequence: first 11 (context), 08 (forms), then this
// ============================================================================
//
// SIMPLE: Auth = who is logged in + protect routes. Token memory/localStorage/
// httpOnly cookie — tradeoffs. RHF = forms without re-render on every keystroke;
// Zod = schema validation TypeScript-friendly. zodResolver connects both.
//
// WHY: Real apps need login, protected pages, validated forms every day.
// INTERVIEW: token storage XSS; ProtectedRoute; RHF register vs Controller;
// server errors → setError.
// Use in Vite/React 19 project — teaching file.
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
// Task:
// Compare both storage strategies in interviews.
//
// In simple words:
// Memory (React state / module var): XSS can steal it if JS can read it,
// but token is lost on refresh — tab close = logout. Feels more secure in SPA
// if refresh token comes from httpOnly cookie.
// localStorage: persist across refresh; XSS = game over (document.cookie/localStorage
// readable by injected script). Never store refresh token in localStorage in prod
// if XSS risk exists.
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
// Task:
// user, login, logout, loading — tree-wide auth state.
//
// In simple words:
// createContext + Provider. Value stable via useMemo where possible.
// Children consume via useAuth(). Real app: fetch /me on bootstrap.
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
// Task:
// Credentials POST → token + user → context update.
//
// In simple words:
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
// Task:
// No auth → redirect to login; otherwise render children/outlet.
//
// In simple words:
// if (!user) return <Navigate to="/login" replace state={{ from: location }} />.
// Show spinner while bootstrapping — avoid flash redirect.
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
// Task:
// Auto attach Bearer token on every fetch.
//
// In simple words:
// Wrapper api.get/post — read token from memory or localStorage and set header.
// On 401 → refresh flow or logout. Centralize — don't write in every component.
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
// Task:
// Access expires → refresh endpoint → new access; fail → logout.
//
// In simple words:
// Refresh token in httpOnly cookie (server set) — JS cannot read it.
// POST /auth/refresh credentials:include → new access token JSON.
// Queue: on parallel 401, one refresh, other requests wait.
// Store new access in memory; if refresh rotates, cookie auto updates server side.
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
// Task:
// Authenticated + role check as separate layer.
//
// In simple words:
// ProtectedRoute = logged in. RoleRoute = user.role === 'admin'.
// Feature guard = subscription active. Compose nested routes.
// Unauthorized role → 403 page, don't send to login (already authed).
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
// Task:
// Show admin-only buttons conditionally on same page.
//
// In simple words:
// user?.role === 'admin' && <AdminTools />.
// Hiding UI ≠ security — API must authorize too. Client guard is for UX.
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
// Task:
// If came from protected redirect, send back to intended URL.
//
// In simple words:
// Login page: const from = location.state?.from?.pathname || '/dashboard'.
// navigate(from, { replace: true }) after success.
// Validate internal paths to avoid open redirect.
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
// Task:
// Explain prod token strategy without full backend.
//
// In simple words:
// Set-Cookie: refresh=...; HttpOnly; Secure; SameSite=Strict.
// Browser auto sends cookie — JS CANNOT read via document.cookie.
// Hard to steal refresh via XSS (access short-lived in memory).
// CSRF: SameSite + anti-CSRF token on POST. SPA + separate API domain = careful CORS.
// -----------------------------------------------------------------------------
const httpOnlyNote =
  "HttpOnly cookies hide refresh token from JS — preferred over localStorage for long-lived secrets.";

// -----------------------------------------------------------------------------
// Q11: XSS token theft note
//
// Task:
// Why localStorage is risky — interview security angle.
//
// In simple words:
// Attacker injected script: localStorage.getItem('access_token') → exfiltrate.
// Any innerHTML/dangerouslySetInnerHTML/eval/third-party script risk.
// Mitigate: CSP, sanitize, httpOnly refresh, short access TTL, rotate.
// Never put auth token in URL query (logs/referrer leak).
// -----------------------------------------------------------------------------
const xssNote =
  "XSS + localStorage token = full account takeover until expiry; prefer HttpOnly refresh + CSP.";

// =============================================================================
// PART B — REACT HOOK FORM + ZOD
// =============================================================================

// -----------------------------------------------------------------------------
// Q12: useForm basics
//
// Task:
// Create form instance — register, handleSubmit, formState.
//
// In simple words:
// const { register, handleSubmit, formState } = useForm({ defaultValues }).
// Uncontrolled-by-default — read DOM via refs; fewer re-renders vs pure controlled.
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
// Task:
// spread register('fieldName', rules) on input/select/textarea.
//
// In simple words:
// register returns { name, ref, onChange, onBlur }. name attribute auto.
// Validation rules inline or via resolver. defaultValues match field names.
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
// Task:
// No callback on invalid; async OK on valid.
//
// In simple words:
// handleSubmit(onValid, onInvalid). preventDefault automatic.
// Catch async submit errors yourself — RHF resets isSubmitting.
// Don't call e.preventDefault manually — wrap with handleSubmit.
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
// Task:
// Destructure formState for UI feedback.
//
// In simple words:
// errors.field?.message — show under input.
// isSubmitting — disable button during async submit.
// isDirty — unsaved changes warning. touchedFields — show errors after blur.
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
// Task:
// Connect non-native input to RHF.
//
// In simple words:
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
// Task:
// Call reset() after successful submit or edit cancel.
//
// In simple words:
// reset() — back to defaultValues. reset({ email: 'x@y.com' }) — new defaults.
// keepDirtyValues option. Edit form: fetch user → reset(fetched).
// key={user.id} remount alternative for heavy forms.
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
// Task:
// Set error on specific field when API returns 400.
//
// In simple words:
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
// Task:
// One field depends on another — live preview / conditional fields.
//
// In simple words:
// const role = watch('role'). watch() — entire form (careful perf).
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
// Task:
// Append/remove rows (phones, line items).
//
// In simple words:
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
// Task:
// Define fields + messages; parse/safeParse.
//
// In simple words:
// z.object({ email: z.string().email(), age: z.coerce.number().min(18) }).
// safeParse returns { success, data | error }. error.flatten() field errors.
// Reusable schemas share client/server (tRPC, API validation).
// -----------------------------------------------------------------------------
export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Min 8 characters"),
});

// -----------------------------------------------------------------------------
// Q22: refine / superRefine — cross-field rules
//
// Task:
// Password === confirm; custom business rules.
//
// In simple words:
// .refine(data => data.password === data.confirm, { message, path: ['confirm'] }).
// superRefine — multiple issues, ctx.addIssue. For complex validation.
// -----------------------------------------------------------------------------
export const signupSchema = z
  .object({
    password: z.string().min(8),
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, {
    message: "Passwords do not match",
    path: ["confirm"],
  });

// -----------------------------------------------------------------------------
// Q23: z.infer — TypeScript type from schema
//
// Task:
// Get form data type from schema (TS in comments).
//
// In simple words:
// type LoginInput = z.infer<typeof loginSchema>;
// // { email: string; password: string }
// JSDoc in JSX file: @typedef {z.infer<typeof loginSchema>} LoginInput
// Single source of truth — schema change → type follows in TS projects.
// -----------------------------------------------------------------------------
/** @typedef {z.infer<typeof loginSchema>} LoginInput */

// -----------------------------------------------------------------------------
// Q24: zodResolver — RHF + Zod bridge
//
// Task:
// useForm({ resolver: zodResolver(schema) }) — errors auto map.
//
// In simple words:
// Client validation from Zod; RHF errors object populate.
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
// Task:
// Full login form → API → AuthContext login → navigate.
//
// In simple words:
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
// Task:
// API fieldErrors object → loop setError.
//
// In simple words:
// Response { errors: { email: 'Taken', username: 'Too short' } }.
// Object.entries(map).forEach(([field, message]) => setError(field, { type: 'server', message })).
// Non-field errors → root. Zod on client first; server authoritative for duplicate email etc.
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
