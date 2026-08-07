// ============================================================================
// 22 — Routing Basics
// Level: MID  |  Sequence: pehle yeh, phir agla number
// ============================================================================
//
// LAYMAN: SPA me URL badlo bina full reload — React Router (ya similar).
// BrowserRouter, Routes, Route, Link, useParams, useNavigate, Outlet.
// Jaise mall me directories — alag floor, same building (ek HTML).
//
// Nested routes = layout share. Navigate programmatic (login ke baad).
//
// KYUN: Multi-page feel apps. Interview me routing basics expected.
// INTERVIEW: Link vs a; nested routes; params; protected route idea.
// Vite/React 19 project me use — teaching file (react-router v6 style API).
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
// Kya karna hai:
// / aur /about — Link se navigate (full reload nahi).
//
// Seedha matlab:
// <a href> reload. <Link to> client route.
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
// Kya karna hai:
// const { id } = useParams()
//
// Seedha matlab:
// Dynamic segment URL se padho.
// -----------------------------------------------------------------------------
function UserPage() {
  const { id } = useParams();
  return <h2>User {id}</h2>;
}
// <Route path="/users/:id" element={<UserPage />} />

// -----------------------------------------------------------------------------
// Q3: useNavigate programmatic
//
// Kya karna hai:
// login success → navigate("/dashboard")
//
// Seedha matlab:
// Button/handler se route change. replace option history clean.
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
// Kya karna hai:
// Parent layout Route; child routes; <Outlet /> jagah content.
//
// Seedha matlab:
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
// Kya karna hai:
// Agar !user → <Navigate to="/login" />
//
// Seedha matlab:
// Wrapper component auth check. Real apps me loader/token.
// -----------------------------------------------------------------------------
function PrivateRoute({ user, children }) {
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

// -----------------------------------------------------------------------------
// Q6: useSearchParams query string
//
// Kya karna hai:
// ?q=react padho/likho.
//
// Seedha matlab:
// Filters URL me — shareable/back button friendly.
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
// Kya karna hai:
// path="*" element={<NotFound />}
//
// Seedha matlab:
// Catch-all last. Unknown URLs handle.
// -----------------------------------------------------------------------------
function NotFound() {
  return <h1>404</h1>;
}
// <Route path="*" element={<NotFound />} />

// -----------------------------------------------------------------------------
// Q8: Index route
//
// Kya karna hai:
// Parent path pe default child — <Route index element={...} />
//
// Seedha matlab:
// /parent exact pe default panel.
// -----------------------------------------------------------------------------
// <Route path="/shop" element={<ShopLayout />}>
//   <Route index element={<Featured />} />
//   <Route path="cart" element={<Cart />} />
// </Route>

// -----------------------------------------------------------------------------
// Q9: NavLink — active class automatic
//
// Kya karna hai:
// NavLink to="/about" className={({ isActive }) => isActive ? "on" : ""}
//
// Seedha matlab:
// Link sirf navigate; NavLink current route highlight deta.
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
// Q10: [MID] Relative paths nested routes me
//
// Kya karna hai:
// Parent /admin; child path="users" → /admin/users (leading / mat).
//
// Seedha matlab:
// Nested Route paths relative — URL compose parent se.
// -----------------------------------------------------------------------------
function RelativeNestedNote() {
  return (
    <p>
      Nested child path="settings" under /app → /app/settings. Absolute path /
      se root.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q11: useLocation — pathname + state read
//
// Kya karna hai:
// const loc = useLocation(); loc.pathname, loc.state from navigate.
//
// Seedha matlab:
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
// Kya karna hai:
// navigate("/done", { state: { from: "checkout" } })
//
// Seedha matlab:
// Query string public; state object history me — refresh pe lost ho sakta.
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
// Kya karna hai:
// v6.4+ loader async — component ko data ready mile.
//
// Seedha matlab:
// useEffect fetch kam; router loader waterfall avoid helper.
// -----------------------------------------------------------------------------
function LoaderSketchNote() {
  return (
    <p>
      Route loader: data fetch route match pe — component render se pehle. Advanced
      44 me depth.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q14: [MID] Outlet context — parent se child ko data
//
// Kya karna hai:
// Outlet context={{ user }} — child useOutletContext().
//
// Seedha matlab:
// Layout shared data bina prop drill — nested routes ke liye.
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
// Kya karna hai:
// index element parent exact URL pe; path="" similar v6 semantics.
//
// Seedha matlab:
// /shop → Featured (index); /shop/cart → Cart. Default child clear.
// -----------------------------------------------------------------------------
function IndexVsEmptyNote() {
  return <p>Index route = parent URL pe default child bina extra segment.</p>;
}

// -----------------------------------------------------------------------------
// Q16: [MID] Protected route — Outlet wrapper pattern
//
// Kya karna hai:
// ProtectedLayout check auth; andar Outlet ya Navigate login.
//
// Seedha matlab:
// Har child route ek saath protect — DRY auth guard.
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
// Kya karna hai:
// Login success Link replace to dashboard — back button login pe na jaye.
//
// Seedha matlab:
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
// Kya karna hai:
// BrowserRouter = clean URLs (/about); HashRouter = #/about static host pe.
//
// Seedha matlab:
// Server config vs GitHub Pages — deployment decide karta.
// -----------------------------------------------------------------------------
function RouterModeNote() {
  return (
    <p>
      BrowserRouter: server fallback index.html chahiye. HashRouter: hash routing,
      server config easy.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q19: [ADV] Splat / catch-all segment
//
// Kya karna hai:
// path="/docs/*" — baaki path match; useParams se * part.
//
// Seedha matlab:
// Nested docs/files dynamic depth — splat flexible.
// -----------------------------------------------------------------------------
function DocsCatchAll() {
  const params = useParams();
  return <p>Docs path: {params["*"]}</p>;
}
// <Route path="/docs/*" element={<DocsCatchAll />} />

// -----------------------------------------------------------------------------
// Q20: [ADV] Scroll restoration basic
//
// Kya karna hai:
// Route change pe window.scrollTo(0,0) ya ScrollRestoration component.
//
// Seedha matlab:
// SPA me browser auto scroll top nahi — khud handle.
// -----------------------------------------------------------------------------
function ScrollTopOnNav() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// -----------------------------------------------------------------------------
// Q21: [ADV] Relative Link "../" nested me
//
// Kya karna hai:
// /admin/users/5/edit se Link to=".." → /admin/users/5
//
// Seedha matlab:
// Relative navigation — URL manually mat likho, router relative resolve.
// -----------------------------------------------------------------------------
function BackToList() {
  return <Link to="..">Back to list</Link>;
}

// -----------------------------------------------------------------------------
// Q22: [ADV] Interview — nested routes mental model
//
// Kya karna hai:
// Layout Route + Outlet + child paths + index + 404 last.
//
// Seedha matlab:
// Ek diagram bolke: URL tree = Route tree, Outlet = child slot.
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
