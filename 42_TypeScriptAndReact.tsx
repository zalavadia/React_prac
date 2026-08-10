// ============================================================================
// 42 — TypeScript + React
// Level: ADVANCED  |  Sequence: JS React solid, then this typing layer
// ============================================================================
//
// SIMPLE: TypeScript = type checker while you write code — wrong props passed?
// Compiler catches it. In React, props, events, refs, hooks — all typed.
//
// WHY: Fewer runtime bugs in big teams; autocomplete; safe refactors.
// INTERVIEW: FC vs plain fn, discriminated unions, generic List<T>, ref null.
// Use in Vite + React + TS project — teaching file.
// Optional: npm i zod (Q18 preview)
//
// ============================================================================

import {
  useState,
  useReducer,
  useRef,
  useEffect,
  useContext,
  useMemo,
  createContext,
  memo,
  lazy,
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
  type ChangeEvent,
  type FormEvent,
  type MouseEvent,
  type ButtonHTMLAttributes,
  type InputHTMLAttributes,
  type Ref,
} from "react";

// Zod preview — in Vite: npm i zod
import { z } from "zod";

// -----------------------------------------------------------------------------
// Q1: FC vs plain function typing props
//
// Task:
// React.FC used to inject optional children — now prefer plain fn + props type.
//
// In simple words:
// function Button(props: ButtonProps) — simple, explicit.
// React.FC<Props> legacy; generic children confusion — avoid in new code.
// -----------------------------------------------------------------------------
type ButtonProps = {
  label: string;
  onClick: () => void;
};

// ✅ preferred
function PlainButton({ label, onClick }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>;
}

// Legacy style (still seen)
const FCButton: React.FC<ButtonProps> = ({ label, onClick }) => (
  <button onClick={onClick}>{label}</button>
);

// -----------------------------------------------------------------------------
// Q2: Props interface + optional + children: React.ReactNode
//
// Task:
// interface CardProps { title: string; subtitle?: string; children: ReactNode }
//
// In simple words:
// ? = optional. ReactNode = string | number | element | fragment | null | array...
// JSX can have anything as children — ReactNode covers it.
// -----------------------------------------------------------------------------
interface CardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

function Card({ title, subtitle, children }: CardProps) {
  return (
    <article>
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
      {children}
    </article>
  );
}

// -----------------------------------------------------------------------------
// Q3: Event types — ChangeEvent, FormEvent, MouseEvent
//
// Task:
// In handler: e: ChangeEvent<HTMLInputElement> etc.
//
// In simple words:
// Generic element type tells you what e.target is.
// Form submit → FormEvent<HTMLFormElement>. Click → MouseEvent<HTMLButtonElement>.
// -----------------------------------------------------------------------------
function SearchForm() {
  const [q, setQ] = useState("");

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    setQ(e.target.value); // target typed as HTMLInputElement ✅
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("search", q);
  }

  function onLogoClick(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
  }

  return (
    <form onSubmit={onSubmit}>
      <input value={q} onChange={onChange} />
      <button type="button" onClick={onLogoClick}>
        Logo
      </button>
      <button type="submit">Go</button>
    </form>
  );
}

// -----------------------------------------------------------------------------
// Q4: useState — generic inference + explicit
//
// Task:
// useState(0) infers number. For union/null use explicit generic.
//
// In simple words:
// useState<User | null>(null) — TS knows when state can be null.
// Initial value inference is often enough — don't over-annotate.
// -----------------------------------------------------------------------------
type User = { id: number; name: string };

function UserPicker() {
  const [count, setCount] = useState(0); // inferred number
  const [user, setUser] = useState<User | null>(null); // explicit union

  function load() {
    setUser({ id: 1, name: "Jay" });
    setCount((c) => c + 1);
  }

  return (
    <button onClick={load}>
      {user?.name ?? "none"} ({count})
    </button>
  );
}

// -----------------------------------------------------------------------------
// Q5: useRef — HTML element types + null initial
//
// Task:
// useRef<HTMLInputElement>(null) — .current HTMLInputElement | null.
//
// In simple words:
// DOM ref → element type + null. Mutable box (no DOM) → useRef<number>(0).
// Guard with if (ref.current) before access — strict null checks.
// -----------------------------------------------------------------------------
function FocusField() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus(); // optional chaining ✅
  }, []);

  return <input ref={inputRef} />;
}

function TickRef() {
  const renders = useRef(0);
  renders.current += 1;
  return <span>Renders: {renders.current}</span>;
}

// -----------------------------------------------------------------------------
// Q6: useReducer — typed actions (discriminated union)
//
// Task:
// type Action = { type: "inc" } | { type: "set"; value: number }
//
// In simple words:
// Discriminant field "type" — switch narrows it.
// payload optional per action — type-safe dispatch.
// -----------------------------------------------------------------------------
type CounterState = { count: number };

type CounterAction =
  | { type: "inc" }
  | { type: "dec" }
  | { type: "set"; value: number }
  | { type: "reset" };

function counterReducer(state: CounterState, action: CounterAction): CounterState {
  switch (action.type) {
    case "inc":
      return { count: state.count + 1 };
    case "dec":
      return { count: state.count - 1 };
    case "set":
      return { count: action.value }; // action narrowed ✅
    case "reset":
      return { count: 0 };
    default: {
      const _exhaustive: never = action;
      return _exhaustive;
    }
  }
}

function TypedCounter() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });
  return (
    <div>
      {state.count}
      <button onClick={() => dispatch({ type: "inc" })}>+</button>
      <button onClick={() => dispatch({ type: "set", value: 10 })}>10</button>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q7: Component props with generics — List<T>
//
// Task:
// function List<T>({ items, render }: ListProps<T>)
//
// In simple words:
// Reusable list — caller decides item type. Can add keyof / extends constraints.
// -----------------------------------------------------------------------------
type ListProps<T> = {
  items: T[];
  renderItem: (item: T) => ReactNode;
  keyFn: (item: T) => string | number;
};

function List<T>({ items, renderItem, keyFn }: ListProps<T>) {
  return (
    <ul>
      {items.map((item) => (
        <li key={keyFn(item)}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}

function GenericListDemo() {
  return (
    <List
      items={[{ id: 1, name: "A" }]}
      keyFn={(u) => u.id}
      renderItem={(u) => u.name}
    />
  );
}

// -----------------------------------------------------------------------------
// Q8: Extending HTML attributes — ButtonHTMLAttributes
//
// Task:
// type Props = ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean }
//
// In simple words:
// Inherit native props (onClick, disabled, className) + add custom ones.
// ComponentPropsWithoutRef<"button"> is also a common shortcut.
// -----------------------------------------------------------------------------
type LoadingButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

function LoadingButton({ loading, children, disabled, ...rest }: LoadingButtonProps) {
  return (
    <button {...rest} disabled={disabled || loading}>
      {loading ? "..." : children}
    </button>
  );
}

type IconInputProps = InputHTMLAttributes<HTMLInputElement> & {
  icon?: ReactNode;
};

function IconInput({ icon, ...inputProps }: IconInputProps) {
  return (
    <label>
      {icon}
      <input {...inputProps} />
    </label>
  );
}

// -----------------------------------------------------------------------------
// Q9: Discriminated union props — variant
//
// Task:
// LinkButton = { variant: "link"; href: string } | { variant: "button"; onClick }
//
// In simple words:
// variant switch → TS forces correct fields per branch.
// Better than making everything optional — impossible states become compile errors.
// -----------------------------------------------------------------------------
type ActionLink =
  | { variant: "link"; href: string; label: string }
  | { variant: "button"; onClick: () => void; label: string };

function ActionControl(props: ActionLink) {
  if (props.variant === "link") {
    return <a href={props.href}>{props.label}</a>;
  }
  return <button onClick={props.onClick}>{props.label}</button>;
}

// -----------------------------------------------------------------------------
// Q10: Typing custom hooks return
//
// Task:
// Explicit return type OR inferred tuple/object.
//
// In simple words:
// Return type documents the API. Tuple [value, setter] as const is optional.
// Don't over-export internal types — only what hook consumers need.
// -----------------------------------------------------------------------------
type UseToggleReturn = {
  on: boolean;
  toggle: () => void;
  setOn: (v: boolean) => void;
};

function useToggle(initial = false): UseToggleReturn {
  const [on, setOn] = useState(initial);
  const toggle = () => setOn((v) => !v);
  return { on, toggle, setOn };
}

function ToggleDemo() {
  const { on, toggle } = useToggle();
  return <button onClick={toggle}>{on ? "ON" : "OFF"}</button>;
}

// -----------------------------------------------------------------------------
// Q11: Context — typed createContext + undefined guard
//
// Task:
// createContext<Auth | null>(null) + provider OR throw helper.
//
// In simple words:
// Default null → guard in consumer. Or separate useAuth hook throws if missing.
// undefined default also works — but null + named hook pattern is common.
// -----------------------------------------------------------------------------
type AuthContextValue = {
  user: User | null;
  login: (name: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const value = useMemo(
    () => ({
      user,
      login: (name: string) => setUser({ id: Date.now(), name }),
      logout: () => setUser(null),
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function ProfileChip() {
  const { user, logout } = useAuth();
  return user ? (
    <span>
      {user.name} <button onClick={logout}>out</button>
    </span>
  ) : (
    <span>Guest</span>
  );
}

// -----------------------------------------------------------------------------
// Q12: forwardRef / React 19 ref as prop typing
//
// Task:
// React 19: ref normal prop. forwardRef legacy typing still in codebases.
//
// In simple words:
// forwardRef<HTMLInputElement, Props>((props, ref) => ...)
// 19 style: function Input({ ref, ...props }: Props & { ref?: Ref<HTMLInputElement> })
// -----------------------------------------------------------------------------
type Input19Props = Omit<ComponentPropsWithoutRef<"input">, "ref"> & {
  ref?: Ref<HTMLInputElement>;
};

function Input19({ ref, ...rest }: Input19Props) {
  return <input ref={ref} {...rest} />;
}

type LegacyInputProps = { label: string } & ComponentPropsWithoutRef<"input">;

const LegacyInput = forwardRef<HTMLInputElement, LegacyInputProps>(
  function LegacyInput({ label, ...rest }, ref) {
    return (
      <label>
        {label}
        <input ref={ref} {...rest} />
      </label>
    );
  }
);

// -----------------------------------------------------------------------------
// Q13: as const / satisfies
//
// Task:
// as const → readonly literal tuple. satisfies → check shape, keep inference.
//
// In simple words:
// ROUTES as const — keyof typeof ROUTES typed keys.
// satisfies Record<string, string> — extra keys error, values stay literal.
// -----------------------------------------------------------------------------
const ROUTES = {
  home: "/",
  settings: "/settings",
} as const;

type RouteKey = keyof typeof ROUTES; // "home" | "settings"

const STATUS_COLORS = {
  ok: "green",
  err: "red",
} satisfies Record<string, string>;

function RouteLink({ name }: { name: RouteKey }) {
  return <a href={ROUTES[name]}>{name}</a>;
}

// -----------------------------------------------------------------------------
// Q14: Utility types — Pick Omit Partial Required for props
//
// Task:
// Derive internal types from public props — DRY.
//
// In simple words:
// Pick<User, "id" | "name"> — subset. Omit<User, "password"> — hide sensitive.
// Partial<Form> edit mode. Required<Pick<...>> force optional → required.
// -----------------------------------------------------------------------------
type FullUser = {
  id: number;
  name: string;
  email: string;
  password: string;
};

type PublicUser = Omit<FullUser, "password">;
type UserPreview = Pick<FullUser, "id" | "name">;
type UserPatch = Partial<Pick<FullUser, "name" | "email">>;

function UserBadge({ id, name }: UserPreview) {
  return (
    <span>
      #{id} {name}
    </span>
  );
}

// -----------------------------------------------------------------------------
// Q15: API response + loading/error state union
//
// Task:
// type State = idle | loading | success | error — discriminated.
//
// In simple words:
// Narrow via status field — data exists only in success (TS knows).
// Same pattern as file 12 fetch machine — now typed.
// -----------------------------------------------------------------------------
type ApiUser = { id: number; name: string };

type FetchState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: ApiUser }
  | { status: "error"; message: string };

function UserLoader() {
  const [state, setState] = useState<FetchState>({ status: "idle" });

  async function load() {
    setState({ status: "loading" });
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
      const data = (await res.json()) as ApiUser;
      setState({ status: "success", data });
    } catch (e) {
      setState({ status: "error", message: String(e) });
    }
  }

  if (state.status === "success") return <p>{state.data.name}</p>;
  if (state.status === "error") return <p>{state.message}</p>;
  return <button onClick={load}>Load user</button>;
}

// -----------------------------------------------------------------------------
// Q16: Children render props typing
//
// Task:
// children: (value: T) => ReactNode — function as child.
//
// In simple words:
// Render prop pattern typed — caller knows the data type.
// ReactNode return gives flexible UI.
// -----------------------------------------------------------------------------
type DataRenderProps<T> = {
  data: T;
  children: (item: T) => ReactNode;
};

function DataRender<T>({ data, children }: DataRenderProps<T>) {
  return <>{children(data)}</>;
}

function RenderPropDemo() {
  return (
    <DataRender data={{ score: 42 }}>
      {(d) => <strong>Score: {d.score}</strong>}
    </DataRender>
  );
}

// -----------------------------------------------------------------------------
// Q17: Polymorphic `as` prop pattern (simple)
//
// Task:
// <Text as="a" href="..."> — element type change, props merge typed.
//
// In simple words:
// ElementType + ComponentPropsWithoutRef<C> intersection — advanced but common lib pattern.
// -----------------------------------------------------------------------------
type PolymorphicProps<C extends ElementType> = {
  as?: C;
  children: ReactNode;
} & ComponentPropsWithoutRef<C>;

function Text<C extends ElementType = "span">({
  as,
  children,
  ...rest
}: PolymorphicProps<C>) {
  const Component = as ?? "span";
  return <Component {...rest}>{children}</Component>;
}

function PolymorphicDemo() {
  return (
    <>
      <Text>Default span</Text>
      <Text as="a" href="/home">
        Link
      </Text>
      <Text as="button" type="button" onClick={() => {}}>
        Btn
      </Text>
    </>
  );
}

// -----------------------------------------------------------------------------
// Q18: Zod infer — z.infer preview for forms
//
// Task:
// Schema single source → runtime validate + TS type.
//
// In simple words:
// npm i zod. Form schema define → type FormValues = z.infer<typeof Schema>.
// parse safe — invalid data caught at runtime, type at compile time.
// -----------------------------------------------------------------------------
const SignupSchema = z.object({
  email: z.string().email(),
  age: z.number().min(18),
});

type SignupValues = z.infer<typeof SignupSchema>;

function parseSignup(raw: unknown): SignupValues {
  return SignupSchema.parse(raw); // throws if invalid
}

function SignupPreview() {
  const [values] = useState<SignupValues>({ email: "a@b.com", age: 21 });
  return <span>{values.email}</span>;
}

// -----------------------------------------------------------------------------
// Q19: Strict tsconfig tips (comments)
//
// Task:
// Enable compilerOptions strict family.
//
// In simple words:
// "strict": true — null checks, implicit any off, etc.
// "noUncheckedIndexedAccess": true — arr[i] maybe undefined ✅ safer
// "jsx": "react-jsx" — Vite default
// skipLibCheck true speed; exactOptionalPropertyTypes advanced optional strict
// eslint @typescript-eslint consistent-type-imports — type-only imports
// -----------------------------------------------------------------------------
const tsconfigTips = [
  "strict: true",
  "noUncheckedIndexedAccess: true for safer indexing",
  "jsx: react-jsx",
  "prefer type-only imports for types",
] as const;

// -----------------------------------------------------------------------------
// Q20: Common TS errors — children, event target, ref null
//
// Task:
// Show fix patterns.
//
// In simple words:
// ❌ Props without children but JSX children pass → add children: ReactNode
// ❌ e.target.value on Event → ChangeEvent<HTMLInputElement>
// ❌ ref.current.focus() without null check → ?. or if guard
// ❌ useRef<number>() without initial → useRef<number>(0) or null generic
// -----------------------------------------------------------------------------
function FixedChildren({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}

function FixedInput() {
  const ref = useRef<HTMLInputElement>(null);
  function onChange(e: ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value);
  }
  function focus() {
    ref.current?.focus();
  }
  return <input ref={ref} onChange={onChange} onFocus={focus} />;
}

// -----------------------------------------------------------------------------
// Q21: Typing memo / lazy components
//
// Task:
// memo<Props>(fn). lazy(() => import(...)) return type Promise<{ default: Component }>
//
// In simple words:
// memo generic preserves props. lazy needs default export component.
// Suspense boundary with lazy child (file 21).
// -----------------------------------------------------------------------------
type ExpensiveProps = { n: number };

const Expensive = memo(function Expensive({ n }: ExpensiveProps) {
  return <div>{n * 2}</div>;
});

const LazyDashboard = lazy(() =>
  Promise.resolve({
    default: function Dashboard() {
      return <div>Lazy loaded</div>;
    },
  })
);

// -----------------------------------------------------------------------------
// Q22: Enum vs union string literals for variants
//
// Task:
// Prefer union "sm" | "md" | "lg" over enum (tree-shake, no reverse mapping).
//
// In simple words:
// enum Size { Sm, Md } — runtime object, awkward JSX.
// type Size = "sm" | "md" — idiomatic TS + React props.
// const enum rare — bundler inline, debugging harder.
// -----------------------------------------------------------------------------
type Size = "sm" | "md" | "lg";

type SizedBoxProps = {
  size: Size;
  children: ReactNode;
};

function SizedBox({ size, children }: SizedBoxProps) {
  const pad = { sm: 4, md: 8, lg: 16 }[size];
  return <div style={{ padding: pad }}>{children}</div>;
}

// enum example (discouraged for simple variants):
enum LegacySize {
  Sm = "sm",
  Md = "md",
}

// -----------------------------------------------------------------------------
// Q23: Index signatures vs Record
//
// Task:
// Record<string, T> typed dict. Index signature { [key: string]: T } similar.
//
// In simple words:
// Record<Keys, T> — known keys. Record<string, number> — open map.
// Index signature on interface allows extra props — use carefully with strict.
// -----------------------------------------------------------------------------
type LabelsByLocale = Record<string, string>;

const labels: LabelsByLocale = {
  en: "Hello",
  hi: "Namaste",
};

interface StringMap {
  [key: string]: string;
}

const alsoLabels: StringMap = labels;

function LocaleLabel({ code }: { code: string }) {
  return <span>{labels[code] ?? code}</span>;
}

// -----------------------------------------------------------------------------
// Q24: Typing useEffect cleanup
//
// Task:
// Return void | (() => void | undefined) — cleanup function optional.
//
// In simple words:
// Effect fn return type inferred. Explicit: useEffect((): void | (() => void) => ...)
// Cleanup is sync — don't return async fn (Promise void ≠ cleanup).
// AbortController typed with fetch cancel pattern.
// -----------------------------------------------------------------------------
function SubscribedWidget({ userId }: { userId: number }) {
  useEffect(() => {
    const ctrl = new AbortController();
    let alive = true;

    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
      signal: ctrl.signal,
    })
      .then((r) => r.json())
      .then((data) => {
        if (alive) console.log(data);
      })
      .catch(() => {});

    return () => {
      alive = false;
      ctrl.abort();
    };
  }, [userId]);

  return <div>User {userId}</div>;
}

// -----------------------------------------------------------------------------
// Q25: [ADV] Interview — interface vs type for props; never for props?
//
// Task:
// Nuanced answer worth knowing for interviews.
//
// In simple words:
// interface props — extend declare merge (rare for props). type — unions/intersections easier.
// Team convention > dogma. Both fine for component props.
// "never use type" outdated myth. "never use interface for unions" — union needs type.
// Props = object shape → either works. Consistency in team is important.
// eslint-react often no difference; pick one style guide.
// -----------------------------------------------------------------------------
type NeverForPropsMyth =
  "Both interface and type work for props; use type for unions/discriminated unions.";

interface ExtendableProps {
  id: string;
}
interface ExtendableProps {
  optional?: boolean; // declaration merge — interface only feature
}

type PropsUnion = { mode: "view" } | { mode: "edit"; onSave: () => void };

function ModePanel(props: PropsUnion) {
  if (props.mode === "edit") {
    return <button onClick={props.onSave}>Save</button>;
  }
  return <p>View only</p>;
}

// -----------------------------------------------------------------------------
// Quick revise: events generic element | ref null | discriminated unions
// generic List<T> | z.infer | strict tsconfig | interface vs type pragmatic
// -----------------------------------------------------------------------------

export {
  PlainButton,
  FCButton,
  Card,
  SearchForm,
  UserPicker,
  FocusField,
  TickRef,
  TypedCounter,
  List,
  GenericListDemo,
  LoadingButton,
  IconInput,
  ActionControl,
  ToggleDemo,
  AuthProvider,
  ProfileChip,
  Input19,
  LegacyInput,
  RouteLink,
  UserBadge,
  UserLoader,
  RenderPropDemo,
  Text,
  PolymorphicDemo,
  SignupPreview,
  parseSignup,
  tsconfigTips,
  FixedChildren,
  FixedInput,
  Expensive,
  LazyDashboard,
  SizedBox,
  LocaleLabel,
  SubscribedWidget,
  ModePanel,
  NeverForPropsMyth,
  SignupSchema,
};
