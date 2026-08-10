// ============================================================================
// 22 — Routing Basics
// Level: MID  |  Sequence: do this first, then the next file in sequence
// ============================================================================
//
// SIMPLE: In an SPA, change the URL without a full reload — React Router (or similar).
// BrowserRouter, Routes, Route, Link, useParams, useNavigate, Outlet.
// Like mall directories — different floors, same building (one HTML).
//
// Nested routes = shared layout. Navigate programmatically (after login).
//
// WHY: Multi-page feel in apps. Interview expects routing basics.
// INTERVIEW: Link vs a; nested routes; params; protected route idea.
// Vite/React 19 project — teaching file (react-router v6 style API).
//
// ============================================================================

import { useEffect } from "react";
import {
  BrowserRouter,
  Link,
  NavLink,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

// -----------------------------------------------------------------------------
// Q1: Basic Routes + Link
//
// Task:
// / and /about — navigate with Link (no full reload).
//
// In simple words:
// <a href> reloads. <Link to> is client-side routing.
// -----------------------------------------------------------------------------
function Home() {
  return <h1>Home</h1>;
}
function About() {
  return <h1>About</h1>;
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

// -----------------------------------------------------------------------------
// Q2: useParams — /users/:id
//
// Task:
// const { id } = useParams()
//
// In simple words:
// Read dynamic segment from the URL.
// -----------------------------------------------------------------------------
function UserPage() {
  const { id } = useParams();
  return <h2>User {id}</h2>;
}
// <Route path="/users/:id" element={<UserPage />} />

// -----------------------------------------------------------------------------
// Q3: useNavigate programmatic
//
// Task:
// login success → navigate("/dashboard")
//
// In simple words:
// Change route from button/handler. replace option keeps history clean.
// -----------------------------------------------------------------------------
function Login() {
  const navigate = useNavigate();
  function onOk() {
    navigate("/dashboard", { replace: true });
  }
  return <button onClick={onOk}>Login</button>;
}

// -----------------------------------------------------------------------------
// Q4: Nested layout + Outlet
//
// Task:
// Parent layout Route; child routes; <Outlet /> where content goes.
//
// In simple words:
// Shared nav/sidebar. Children plug into outlet.
// -----------------------------------------------------------------------------
function AdminLayout() {
  return (
    <div>
      <aside>Admin nav</aside>
      <Outlet />
    </div>
  );
}
// <Route path="/admin" element={<AdminLayout />}>
//   <Route path="users" element={<Users />} />
// </Route>

// -----------------------------------------------------------------------------
// Q5: [MID] Protected route idea
//
// Task:
// If !user → <Navigate to="/login" />
//
// In simple words:
// Wrapper component checks auth. Real apps use loader/token.
// -----------------------------------------------------------------------------
function PrivateRoute({ user, children }) {
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

// -----------------------------------------------------------------------------
// Q6: useSearchParams query string
//
// Task:
// Read/write ?q=react.
//
// In simple words:
// Filters in URL — shareable and back-button friendly.
// -----------------------------------------------------------------------------
function SearchPage() {
  const [params, setParams] = useSearchParams();
  const q = params.get("q") ?? "";
  return (
    <input
      value={q}
      onChange={(e) => setParams({ q: e.target.value })}
    />
  );
}

// -----------------------------------------------------------------------------
// Q7: [MID] 404 Not Found route
//
// Task:
// path="*" element={<NotFound />}
//
// In simple words:
// Catch-all last. Handles unknown URLs.
// -----------------------------------------------------------------------------
function NotFound() {
  return <h1>404</h1>;
}
// <Route path="*" element={<NotFound />} />

// -----------------------------------------------------------------------------
// Q8: Index route
//
// Task:
// Default child on parent path — <Route index element={...} />
//
// In simple words:
// /parent exact shows default panel.
// -----------------------------------------------------------------------------
// <Route path="/shop" element={<ShopLayout />}>
//   <Route index element={<Featured />} />
//   <Route path="cart" element={<Cart />} />
// </Route>

// -----------------------------------------------------------------------------
// Q9: NavLink — active class automatic
//
// Task:
// NavLink to="/about" className={({ isActive }) => isActive ? "on" : ""}
//
// In simple words:
// Link only navigates; NavLink highlights current route.
// -----------------------------------------------------------------------------
function Nav() {
  return (
    <nav>
      <NavLink to="/" end>
        Home
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) => (isActive ? "nav-active" : "")}
      >
        About
      </NavLink>
    </nav>
  );
}

// -----------------------------------------------------------------------------
// Q10: [MID] Relative paths in nested routes
//
// Task:
// Parent /admin; child path="users" → /admin/users (no leading /).
//
// In simple words:
// Nested Route paths are relative — URL composes from parent.
// -----------------------------------------------------------------------------
function RelativeNestedNote() {
  return (
    <p>
      Nested child path="settings" under /app → /app/settings. Absolute path /
      starts from root.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q11: useLocation — pathname + state read
//
// Task:
// const loc = useLocation(); loc.pathname, loc.state from navigate.
//
// In simple words:
// URL + hidden state (flash message) — shareable vs private data.
// -----------------------------------------------------------------------------
function FlashBanner() {
  const loc = useLocation();
  const msg = loc.state?.flash;
  return msg ? <p className="flash">{msg}</p> : null;
}

// -----------------------------------------------------------------------------
// Q12: [MID] navigate with state pass
//
// Task:
// navigate("/done", { state: { from: "checkout" } })
//
// In simple words:
// Query string is public; state object in history — may be lost on refresh.
// -----------------------------------------------------------------------------
function GoDone() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() =>
        navigate("/done", { state: { flash: "Order placed!" } })
      }
    >
      Finish
    </button>
  );
}

// -----------------------------------------------------------------------------
// Q13: Route loader sketch (data before render idea)
//
// Task:
// v6.4+ loader async — component gets data ready.
//
// In simple words:
// Less useEffect fetch; router loader helps avoid waterfall.
// -----------------------------------------------------------------------------
function LoaderSketchNote() {
  return (
    <p>
      Route loader: data fetch on route match — before component render. Advanced
      depth in file 44.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q14: [MID] Outlet context — parent data to child
//
// Task:
// Outlet context={{ user }} — child useOutletContext().
//
// In simple words:
// Layout shared data without prop drilling — for nested routes.
// -----------------------------------------------------------------------------
function LayoutWithContext() {
  const user = { name: "Jay" };
  return (
    <div>
      <header>Hi {user.name}</header>
      <Outlet context={{ user }} />
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q15: Index route vs path=""
//
// Task:
// index element on parent exact URL; path="" similar v6 semantics.
//
// In simple words:
// /shop → Featured (index); /shop/cart → Cart. Default child is clear.
// -----------------------------------------------------------------------------
function IndexVsEmptyNote() {
  return <p>Index route = default child on parent URL without extra segment.</p>;
}

// -----------------------------------------------------------------------------
// Q16: [MID] Protected route — Outlet wrapper pattern
//
// Task:
// ProtectedLayout checks auth; inside Outlet or Navigate to login.
//
// In simple words:
// Protect all child routes at once — DRY auth guard.
// -----------------------------------------------------------------------------
function ProtectedLayout({ user }) {
  if (!user) return <Navigate to="/login" replace />;
  return <Outlet />;
}
// <Route element={<ProtectedLayout user={user} />}>
//   <Route path="/dashboard" element={<Dash />} />
// </Route>

// -----------------------------------------------------------------------------
// Q17: Link replace — history stack clean
//
// Task:
// Login success Link replace to dashboard — back button should not return to login.
//
// In simple words:
// replace={true} same as navigate replace option.
// -----------------------------------------------------------------------------
function ReplaceLink() {
  return (
    <Link to="/home" replace>
      Go home (no back to here)
    </Link>
  );
}

// -----------------------------------------------------------------------------
// Q18: [ADV] BrowserRouter vs HashRouter
//
// Task:
// BrowserRouter = clean URLs (/about); HashRouter = #/about on static host.
//
// In simple words:
// Server config vs GitHub Pages — deployment decides.
// -----------------------------------------------------------------------------
function RouterModeNote() {
  return (
    <p>
      BrowserRouter: server fallback to index.html needed. HashRouter: hash routing,
      easier server config.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q19: [ADV] Splat / catch-all segment
//
// Task:
// path="/docs/*" — match rest of path; useParams for * part.
//
// In simple words:
// Nested docs/files at dynamic depth — splat is flexible.
// -----------------------------------------------------------------------------
function DocsCatchAll() {
  const params = useParams();
  return <p>Docs path: {params["*"]}</p>;
}
// <Route path="/docs/*" element={<DocsCatchAll />} />

// -----------------------------------------------------------------------------
// Q20: [ADV] Scroll restoration basic
//
// Task:
// On route change: window.scrollTo(0,0) or ScrollRestoration component.
//
// In simple words:
// In SPA browser does not auto scroll to top — handle it yourself.
// -----------------------------------------------------------------------------
function ScrollTopOnNav() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// -----------------------------------------------------------------------------
// Q21: [ADV] Relative Link "../" in nested routes
//
// Task:
// From /admin/users/5/edit, Link to=".." → /admin/users/5
//
// In simple words:
// Relative navigation — do not write URL manually, router resolves relative paths.
// -----------------------------------------------------------------------------
function BackToList() {
  return <Link to="..">Back to list</Link>;
}

// -----------------------------------------------------------------------------
// Q22: [ADV] Interview — nested routes mental model
//
// Task:
// Layout Route + Outlet + child paths + index + 404 last.
//
// In simple words:
// Explain with one diagram: URL tree = Route tree, Outlet = child slot.
// -----------------------------------------------------------------------------
function RoutingInterview() {
  return (
    <ol>
      <li>BrowserRouter — history API</li>
      <li>Routes/Route — path → element</li>
      <li>Nested: layout + Outlet + relative paths</li>
      <li>Params, search, navigate, NavLink active</li>
      <li>Protected wrapper + 404 path="*"</li>
    </ol>
  );
}

export {
  AppRoutes,
  UserPage,
  Login,
  AdminLayout,
  PrivateRoute,
  SearchPage,
  NotFound,
  Nav,
  RelativeNestedNote,
  FlashBanner,
  GoDone,
  LoaderSketchNote,
  LayoutWithContext,
  IndexVsEmptyNote,
  ProtectedLayout,
  ReplaceLink,
  RouterModeNote,
  DocsCatchAll,
  ScrollTopOnNav,
  BackToList,
  RoutingInterview,
};
