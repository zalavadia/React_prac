// ============================================================================
// 44 — Advanced Routing (React Router v6.4+ Data APIs)
// Level: MID / ADV  |  Sequence: pehle 22_RoutingBasics, phir yeh
// ============================================================================
//
// LAYMAN: Purana style = routes JSX me, data fetch useEffect me.
// Data router = createBrowserRouter + RouterProvider — route config object,
// loader (pehle data), action (form submit), errorElement, defer/Suspense.
//
// Remix-style thinking: URL = source of truth; loader parallel; pending UI.
//
// KYUN: Less waterfall, better UX (skeleton), auth redirect in loader clean.
// INTERVIEW: loader vs useEffect; action vs onSubmit; useBlocker; useFetcher.
// Vite/React 19 — import from react-router-dom.
//
// ============================================================================

import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
  Link,
  NavLink,
  Outlet,
  useLoaderData,
  useActionData,
  useNavigation,
  useRouteError,
  useOutletContext,
  useSearchParams,
  useMatches,
  useFetcher,
  useBlocker,
  useNavigate,
  useParams,
  Navigate,
  redirect,
  defer,
  Await,
  Form,
  json,
  isRouteErrorResponse,
} from "react-router-dom";
import { Suspense, lazy, createContext, useContext, useState } from "react";

// --- Shared mock API (teaching) ---
async function fakeUser() {
  await new Promise((r) => setTimeout(r, 50));
  return { id: 1, name: "Jay" };
}
async function fakePosts() {
  await new Promise((r) => setTimeout(r, 100));
  return [{ id: 1, title: "Hello" }];
}

// -----------------------------------------------------------------------------
// Q1: createBrowserRouter + RouterProvider (data router entry)
//
// Kya karna hai:
// router = createBrowserRouter([{ path, element, loader, ... }])
// Root: <RouterProvider router={router} />
//
// Seedha matlab:
// Config array/object — loaders/actions attach yahan. BrowserRouter+Routes optional alt.
// -----------------------------------------------------------------------------
const rootRouter = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <RootError />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
    ],
  },
]);

function AppWithDataRouter() {
  return <RouterProvider router={rootRouter} />;
}

function RootLayout() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <Outlet />
    </>
  );
}
function HomePage() {
  return <h1>Home</h1>;
}
function AboutPage() {
  return <h1>About</h1>;
}

// -----------------------------------------------------------------------------
// Q2: Deep nested routes — tree of children
//
// Kya karna hai:
// Parent path + child path join. /dashboard/settings/profile
//
// Seedha matlab:
// Har level pe layout + Outlet. URL reflects hierarchy.
// -----------------------------------------------------------------------------
const nestedRouter = createBrowserRouter([
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "settings",
        element: <SettingsLayout />,
        children: [
          { index: true, element: <SettingsHome /> },
          { path: "profile", element: <ProfileSettings /> },
        ],
      },
    ],
  },
]);

function DashboardLayout() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Outlet />
    </div>
  );
}
function SettingsLayout() {
  return (
    <aside>
      <NavLink to="profile">Profile</NavLink>
      <Outlet />
    </aside>
  );
}
function SettingsHome() {
  return <p>Settings overview</p>;
}
function ProfileSettings() {
  return <p>Profile form</p>;
}

// -----------------------------------------------------------------------------
// Q3: Layout routes — shared chrome without path segment
//
// Kya karna hai:
// Parent sirf layout; child paths relative add hote hain.
//
// Seedha matlab:
// /shop + /shop/cart same ShopShell. Nav ek baar render.
// -----------------------------------------------------------------------------
// { path: '/shop', element: <ShopShell />, children: [...] }

// -----------------------------------------------------------------------------
// Q4: Index routes — parent exact URL default child
//
// Kya karna hai:
// { index: true, element: <DefaultPanel /> } — path string nahi.
//
// Seedha matlab:
// /dashboard/settings exact pe SettingsHome; /profile alag child.
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// Q5: [MID] Pathless layout route (layout without URL segment)
//
// Kya karna hai:
// Parent path="" — wraps siblings, URL me extra segment nahi.
//
// Seedha matlab:
// Auth wrapper ya analytics layout bina /auth prefix ke.
// -----------------------------------------------------------------------------
const pathlessRouter = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    children: [
      {
        element: <AuthShell />, // pathless layout
        children: [
          { path: "login", element: <LoginPage /> },
          { path: "register", element: <RegisterPage /> },
        ],
      },
    ],
  },
]);

function AuthShell() {
  return (
    <div className="auth-card">
      <Outlet />
    </div>
  );
}
function LoginPage() {
  return <h1>Login</h1>;
}
function RegisterPage() {
  return <h1>Register</h1>;
}

// -----------------------------------------------------------------------------
// Q6: Loaders — fetch before render + useLoaderData
//
// Kya karna hai:
// export async function loader() { return json(data); }
// Component: const data = useLoaderData()
//
// Seedha matlab:
// Route navigate → loader run → data ready → render. Waterfall kam.
// -----------------------------------------------------------------------------
async function postsLoader() {
  const posts = await fakePosts();
  return json({ posts });
}

function PostsPage() {
  const { posts } = useLoaderData();
  return (
    <ul>
      {posts.map((p) => (
        <li key={p.id}>{p.title}</li>
      ))}
    </ul>
  );
}

const postsRoute = {
  path: "posts",
  loader: postsLoader,
  element: <PostsPage />,
};

// -----------------------------------------------------------------------------
// Q7: [ADV] defer + Await + Suspense — slow data non-blocking
//
// Kya karna hai:
// loader return defer({ fast: x, slow: promise })
// UI: <Suspense><Await resolve={slow}>...</Await></Suspense>
//
// Seedha matlab:
// Critical data turant; heavy stream baad me. Remix/React Router pattern.
// -----------------------------------------------------------------------------
async function dashboardLoader() {
  const user = await fakeUser();
  const postsPromise = fakePosts();
  return defer({ user, posts: postsPromise });
}

function DashboardDeferred() {
  const { user, posts } = useLoaderData();
  return (
    <div>
      <p>Hi {user.name}</p>
      <Suspense fallback={<p>Loading posts…</p>}>
        <Await resolve={posts}>
          {(list) => (
            <ul>
              {list.map((p) => (
                <li key={p.id}>{p.title}</li>
              ))}
            </ul>
          )}
        </Await>
      </Suspense>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q8: Actions — Form method="post" + useActionData
//
// Kya karna hai:
// action async ({ request }) { const fd = await request.formData(); ... return json({ ok }); }
// <Form method="post"> + const result = useActionData()
//
// Seedha matlab:
// Mutation route level — revalidation automatic. onSubmit fetch manual kam.
// -----------------------------------------------------------------------------
async function contactAction({ request }) {
  const fd = await request.formData();
  const email = fd.get("email");
  if (!email) return json({ error: "Email required" }, { status: 400 });
  return json({ ok: true, message: "Sent!" });
}

function ContactPage() {
  const actionData = useActionData();
  return (
    <Form method="post">
      <input name="email" type="email" />
      <button type="submit">Send</button>
      {actionData?.error && <p role="alert">{actionData.error}</p>}
      {actionData?.ok && <p>{actionData.message}</p>}
    </Form>
  );
}

// -----------------------------------------------------------------------------
// Q9: useNavigation — pending / submitting UI
//
// Kya karna hai:
// const nav = useNavigation(); nav.state === 'loading' | 'submitting'
//
// Seedha matlab:
// Global spinner ya form disabled jab navigation chal rahi ho.
// -----------------------------------------------------------------------------
function GlobalPendingBar() {
  const navigation = useNavigation();
  const busy =
    navigation.state === "loading" || navigation.state === "submitting";
  if (!busy) return null;
  return <div aria-live="polite">Loading…</div>;
}

// -----------------------------------------------------------------------------
// Q10: errorElement + useRouteError
//
// Kya karna hai:
// Route pe errorElement. Loader throw → boundary. useRouteError() detail.
//
// Seedha matlab:
// try/catch har component me kam. Route-level error UI consistent.
// -----------------------------------------------------------------------------
function RootError() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>{error.status}</h1>
        <p>{error.statusText}</p>
        <p>{error.data?.message}</p>
      </div>
    );
  }
  return (
    <div>
      <h1>Oops</h1>
      <p>{error?.message ?? "Unknown error"}</p>
    </div>
  );
}

async function riskyLoader() {
  throw json({ message: "Not found" }, { status: 404 });
}

// -----------------------------------------------------------------------------
// Q11: [MID] Protected routes — loader redirect
//
// Kya karna hai:
// loader me token check → throw redirect('/login') ya return null + wrapper
//
// Seedha matlab:
// Render se pehle block — flash of protected content kam.
// -----------------------------------------------------------------------------
async function protectedLoader() {
  const user = await getSessionUser();
  if (!user) throw redirect("/login");
  return json({ user });
}

async function getSessionUser() {
  return null; // teaching stub
}

// -----------------------------------------------------------------------------
// Q12: Auth context + RequireAuth wrapper (component guard)
//
// Kya karna hai:
// AuthProvider + RequireAuth children wrap. Loader + component dono pattern.
//
// Seedha matlab:
// Client-only auth state → wrapper OK. SSR/hydration → loader better.
// -----------------------------------------------------------------------------
const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

function RequireAuth({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function ProtectedPage() {
  return (
    <RequireAuth>
      <h1>Secret</h1>
    </RequireAuth>
  );
}

// -----------------------------------------------------------------------------
// Q13: Outlet context — parent → deep child data bina prop drill
//
// Kya karna hai:
// Parent: <Outlet context={{ user }} />
// Child: const { user } = useOutletContext()
//
// Seedha matlab:
// Layout ne loader data — niche tabs ko context se do. Overuse mat.
// -----------------------------------------------------------------------------
function ParentWithContext() {
  const { user } = useLoaderData();
  return <Outlet context={{ user }} />;
}

function ChildUsesContext() {
  const { user } = useOutletContext();
  return <p>{user?.name}</p>;
}

// -----------------------------------------------------------------------------
// Q14: [MID] Search params advanced — multiple keys + setters
//
// Kya karna hai:
// useSearchParams(); setParams(prev => { prev.set('sort','name'); return prev; })
//
// Seedha matlab:
// Filters pagination URL me — share/bookmark. Object shorthand bhi chalega.
// -----------------------------------------------------------------------------
function ProductFilters() {
  const [params, setParams] = useSearchParams();
  const q = params.get("q") ?? "";
  const sort = params.get("sort") ?? "newest";

  function updateSort(next) {
    setParams((prev) => {
      prev.set("sort", next);
      return prev;
    });
  }

  return (
    <div>
      <input
        value={q}
        onChange={(e) =>
          setParams({ q: e.target.value, sort })
        }
      />
      <button type="button" onClick={() => updateSort("price")}>
        Sort price
      </button>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q15: Relative links — to=".." / to="settings"
//
// Kya karna hai:
// Link to="cart" relative current route. ".." parent up.
//
// Seedha matlab:
// Nested routes me full path hardcode mat. Route change safe.
// -----------------------------------------------------------------------------
function OrderDetailLinks() {
  return (
    <>
      <Link to="..">Back to orders</Link>
      <Link to="invoice">Invoice</Link>
    </>
  );
}

// -----------------------------------------------------------------------------
// Q16: useMatches + handle — breadcrumbs from route config
//
// Kya karna hai:
// Route handle: { crumb: (data) => 'Posts' }. useMatches() map crumbs.
//
// Seedha matlab:
// Meta UI route tree se derive — duplicate titles kam.
// -----------------------------------------------------------------------------
function Breadcrumbs() {
  const matches = useMatches();
  const crumbs = matches
    .filter((m) => m.handle?.crumb)
    .map((m) => ({
      label: m.handle.crumb(m.data),
      pathname: m.pathname,
    }));

  return (
    <nav aria-label="Breadcrumb">
      <ol>
        {crumbs.map((c, i) => (
          <li key={c.pathname}>
            {i > 0 && " / "}
            <Link to={c.pathname}>{c.label}</Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}

// Example route config snippet:
// { path: 'posts', loader: postsLoader, handle: { crumb: () => 'Posts' }, element: <PostsPage /> }

// -----------------------------------------------------------------------------
// Q17: Lazy route modules — code split per route
//
// Kya karna hai:
// const Admin = lazy(() => import('./Admin')); route element: <Suspense><Admin/></Suspense>
//
// Seedha matlab:
// Bundle chhota — admin tab load jab route hit. Router lazy + React.lazy pair.
// -----------------------------------------------------------------------------
const LazyAdmin = lazy(() =>
  Promise.resolve({ default: () => <h1>Admin panel</h1> })
);

function LazyAdminRoute() {
  return (
    <Suspense fallback={<p>Loading admin…</p>}>
      <LazyAdmin />
    </Suspense>
  );
}

// -----------------------------------------------------------------------------
// Q18: Scroll restoration note
//
// Kya karna hai:
// RouterProvider scroll restoration default on. Custom: ScrollRestoration component (RR 6.4+).
//
// Seedha matlab:
// SPA me back button pe scroll position ya top — product decision. Document karo.
// -----------------------------------------------------------------------------
// import { ScrollRestoration } from 'react-router-dom';
// Root layout: <ScrollRestoration getKey={(location) => location.pathname} />

// -----------------------------------------------------------------------------
// Q19: Splat routes — catch-all *
//
// Kya karna hai:
// path: 'docs/*' — rest URL params me. splat / * param name version pe depend.
//
// Seedha matlab:
// CMS pages / file paths. 404 child ya splat handler.
// -----------------------------------------------------------------------------
function DocsCatchAll() {
  const { "*": splat } = useParams();
  return <p>Doc path: {splat}</p>;
}

// { path: 'docs/*', loader: ({ params }) => json({ '*': params['*'] }), element: <DocsCatchAll /> }
// { path: '*', element: <NotFound /> } — global 404 last

// -----------------------------------------------------------------------------
// Q20: handle export for breadcrumbs / meta (route module pattern)
//
// Kya karna hai:
// Colocate: export async function loader() {}; export const handle = { crumb };
//
// Seedha matlab:
// Route module ek file — loader, action, component, meta handle sab.
// -----------------------------------------------------------------------------
export const postsRouteHandle = {
  crumb: (data) => data?.posts?.[0]?.title ?? "Posts",
};

// -----------------------------------------------------------------------------
// Q21: navigate relative — useNavigate({ relative: 'path' })
//
// Kya karna hai:
// navigate('..', { relative: 'path' }) ya navigate('../sibling')
//
// Seedha matlab:
// Programmatic same as relative Link. Form success → navigate('..').
// -----------------------------------------------------------------------------
function useGoUp() {
  const navigate = useNavigate();
  return () => navigate("..", { relative: "path" });
}

// -----------------------------------------------------------------------------
// Q22: [ADV] useBlocker — dirty form "Leave page?"
//
// Kya karna hai:
// const blocker = useBlocker(whenDirty); blocker.state === 'blocked' → confirm UI
//
// Seedha matlab:
// Unsaved changes guard. UX: custom modal + blocker.proceed / reset.
// -----------------------------------------------------------------------------
function DirtyFormBlocker() {
  const [dirty, setDirty] = useState(false);
  const blocker = useBlocker(dirty);

  return (
    <div>
      <input onChange={() => setDirty(true)} placeholder="Type to dirty" />
      {blocker.state === "blocked" && (
        <div role="dialog">
          <p>Unsaved changes. Leave?</p>
          <button type="button" onClick={() => blocker.proceed()}>
            Leave
          </button>
          <button type="button" onClick={() => blocker.reset()}>
            Stay
          </button>
        </div>
      )}
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q23: useFetcher — submit/load without navigation
//
// Kya karna hai:
// const fetcher = useFetcher(); fetcher.submit(formData, { method: 'post', action: '/vote' })
//
// Seedha matlab:
// Like button, optimistic UI — page URL same. fetcher.state pending.
// -----------------------------------------------------------------------------
function LikeButton({ postId }) {
  const fetcher = useFetcher();
  const liked = fetcher.formData?.get("liked") === "true";

  return (
    <fetcher.Form method="post" action={`/posts/${postId}/like`}>
      <input type="hidden" name="liked" value={String(!liked)} />
      <button type="submit" disabled={fetcher.state !== "idle"}>
        {liked ? "Unlike" : "Like"}
      </button>
    </fetcher.Form>
  );
}

// -----------------------------------------------------------------------------
// Q24: [ADV] Parallel loaders (Remix-style) — sibling routes
//
// Kya karna hai:
// Parent + child loaders parallel jab sibling branches navigate.
//
// Seedha matlab:
// Data router same level loaders run together — parent/child waterfall aware design.
// Heavy child → defer; siblings independent → parallel benefit.
// -----------------------------------------------------------------------------
const parallelRouter = createBrowserRouter([
  {
    path: "/",
    loader: async () => json({ layout: await fakeUser() }),
    element: <RootLayout />,
    children: [
      {
        path: "feed",
        loader: async () => json({ posts: await fakePosts() }),
        element: <PostsPage />,
      },
      {
        path: "sidebar",
        loader: async () => json({ widgets: [] }),
        element: <SidebarWidgets />,
      },
    ],
  },
]);

function SidebarWidgets() {
  const { widgets } = useLoaderData();
  return <aside>{widgets.length} widgets</aside>;
}

// -----------------------------------------------------------------------------
// Q25: [MID] Interview quick hits — data router vs classic
//
// Kya karna hai:
// loader vs useEffect; action vs fetch POST; when useFetcher vs Form navigate.
//
// Seedha matlab:
// Classic RR = client-only routing. Data APIs = data coupling + pending states.
// -----------------------------------------------------------------------------
const routingInterviewNotes = {
  loaderVsEffect:
    "Loader runs on navigation before paint; avoids loading spinner flash + race on fast nav.",
  actionVsOnSubmit:
    "Action tied to route; automatic revalidation of loaders on that route tree.",
  redirectVsNavigate:
    "throw redirect() in loader/action — server-style; Navigate component client guard.",
  useBlockerCaveat:
    "History API limits; not for hard browser close — beforeunload alag.",
  v7Note: "React Router 7 merges Remix; data APIs stay core mental model.",
};

// --- createRoutesFromElements alternative (JSX config) ---
const jsxRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<RootError />}>
      <Route index element={<HomePage />} />
      <Route path="about" element={<AboutPage />} />
      <Route path="posts" loader={postsLoader} element={<PostsPage />} />
      <Route path="contact" action={contactAction} element={<ContactPage />} />
    </Route>
  )
);

function AppWithJsxRouter() {
  return <RouterProvider router={jsxRouter} />;
}

export {
  AppWithDataRouter,
  AppWithJsxRouter,
  nestedRouter,
  pathlessRouter,
  parallelRouter,
  rootRouter,
  jsxRouter,
  DashboardLayout,
  SettingsLayout,
  AuthProvider,
  RequireAuth,
  ProtectedPage,
  PostsPage,
  postsLoader,
  DashboardDeferred,
  dashboardLoader,
  ContactPage,
  contactAction,
  GlobalPendingBar,
  RootError,
  protectedLoader,
  ParentWithContext,
  ChildUsesContext,
  ProductFilters,
  OrderDetailLinks,
  Breadcrumbs,
  LazyAdminRoute,
  DocsCatchAll,
  DirtyFormBlocker,
  LikeButton,
  routingInterviewNotes,
};
