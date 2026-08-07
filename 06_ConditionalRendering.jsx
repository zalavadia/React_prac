// ============================================================================
// 06 — Conditional Rendering
// Level: BASE  |  Sequence: pehle yeh, phir agla number
// ============================================================================
//
// LAYMAN: Kabhi UI dikhao, kabhi mat dikhao — jaise fridge light: door khuli
// to on. React me if/return, && , ternary (? :) se decide.
//
// && : left truthy ho to right dikhao. Careful: 0 && <X /> → 0 screen pe!
// Ternary: A ? <Yes /> : <No />. null return = kuch mat dikhao.
//
// KYUN: Loading, error, empty, auth — har real app conditional.
// INTERVIEW: && pitfall with 0; early return; null vs false.
// Vite/React 19 project me use — teaching file.
//
// ============================================================================

// -----------------------------------------------------------------------------
// Q1: Ternary Show / Hide
//
// Kya karna hai:
// loggedIn ? <Dash /> : <Login />
//
// Seedha matlab:
// Do clear branches. Readable for A vs B.
// -----------------------------------------------------------------------------
function Gate({ loggedIn }) {
  return loggedIn ? <p>Dashboard</p> : <p>Please login</p>;
}

// -----------------------------------------------------------------------------
// Q2: && short show
//
// Kya karna hai:
// unread > 0 && <Badge />
//
// Seedha matlab:
// Sirf "maybe show" ke liye. Else branch nahi.
// -----------------------------------------------------------------------------
function Inbox({ unread }) {
  return (
    <div>
      Inbox
      {unread > 0 && <span className="badge">{unread}</span>}
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q3: Early return loading
//
// Kya karna hai:
// if (loading) return <Spinner />; return <Data />
//
// Seedha matlab:
// Nested ternary avoid. Guard clauses clean.
// -----------------------------------------------------------------------------
function UserProfile({ loading, user }) {
  if (loading) return <p>Loading...</p>;
  if (!user) return <p>No user</p>;
  return <h2>{user.name}</h2>;
}

// -----------------------------------------------------------------------------
// Q4: return null
//
// Kya karna hai:
// Feature flag off → component kuch render na kare.
//
// Seedha matlab:
// null = DOM me kuch nahi. Valid React return.
// -----------------------------------------------------------------------------
function BetaBanner({ enabled }) {
  if (!enabled) return null;
  return <aside>Beta feature!</aside>;
}

// -----------------------------------------------------------------------------
// Q5: [MID] && with number 0 pitfall
//
// Kya karna hai:
// count && <p>{count}</p> — count 0 pe "0" dikhega!
//
// Seedha matlab:
// 0 falsy hai lekin React 0 render karta hai. Fix: count > 0 && ...
// -----------------------------------------------------------------------------
function CartCount({ count }) {
  // BAD: {count && <span>{count}</span>}  → shows 0
  return <div>{count > 0 && <span>{count} items</span>}</div>;
}

// -----------------------------------------------------------------------------
// Q6: Multi-state UI machine (simple)
//
// Kya karna hai:
// status: idle | loading | error | success — switch UI.
//
// Seedha matlab:
// Real fetch UIs yahi pattern. Enum-like string status.
// -----------------------------------------------------------------------------
function FetchUI({ status, data, error }) {
  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>Error: {error}</p>;
  if (status === "success") return <pre>{JSON.stringify(data)}</pre>;
  return <p>Idle — click fetch</p>;
}

// -----------------------------------------------------------------------------
// Q7: Toggle with conditional class
//
// Kya karna hai:
// isActive ? "tab on" : "tab" className.
//
// Seedha matlab:
// Conditional styling bhi rendering ka cousin.
// -----------------------------------------------------------------------------
function Tab({ isActive, label }) {
  return (
    <button className={isActive ? "tab on" : "tab"}>{label}</button>
  );
}

// -----------------------------------------------------------------------------
// Q8: [MID] Element variables
//
// Kya karna hai:
// let content = ...; ifs se set; return <div>{content}</div>
//
// Seedha matlab:
// Complex conditions JSX se pehle resolve — readable.
// -----------------------------------------------------------------------------
function Message({ type }) {
  let content;
  if (type === "ok") content = <p className="ok">Saved</p>;
  else if (type === "warn") content = <p className="warn">Check</p>;
  else content = <p>Info</p>;
  return <div>{content}</div>;
}

// -----------------------------------------------------------------------------
// Q9: Empty string && pitfall
//
// Kya karna hai:
// name && <Greeting /> — name "" ho to kuch nahi, lekin pattern samjho.
//
// Seedha matlab:
// "" falsy hai, render nahi hota — 0 se alag. Still explicit check safe.
// -----------------------------------------------------------------------------
function Greeting({ name }) {
  return <div>{name ? <p>Hi {name}</p> : <p>Guest</p>}</div>;
}

// -----------------------------------------------------------------------------
// Q10: null vs false vs undefined
//
// Kya karna hai:
// return false / null / undefined — teeno screen pe kuch nahi.
//
// Seedha matlab:
// React inhe skip karta hai. false common in && chains by accident nahi.
// -----------------------------------------------------------------------------
function NothingReturns({ show }) {
  if (!show) return null; // preferred over false
  return <p>Visible</p>;
}

// -----------------------------------------------------------------------------
// Q11: Switch statement UI
//
// Kya karna hai:
// switch (role) { case "admin": return <Admin />; ... }
//
// Seedha matlab:
// Bahut branches ho to switch readable. Default case zaroor.
// -----------------------------------------------------------------------------
function RolePanel({ role }) {
  switch (role) {
    case "admin":
      return <p>Admin panel</p>;
    case "editor":
      return <p>Editor panel</p>;
    default:
      return <p>Guest view</p>;
  }
}

// -----------------------------------------------------------------------------
// Q12: Enum map object pattern
//
// Kya karna hai:
// const VIEWS = { list: <List />, grid: <Grid /> }; return VIEWS[mode]
//
// Seedha matlab:
// Status/type → component map. Switch se chhota jab simple mapping ho.
// -----------------------------------------------------------------------------
const STATUS_UI = {
  idle: <p>Start karo</p>,
  loading: <p>Loading...</p>,
  done: <p>Done!</p>,
};

function StatusFromMap({ status }) {
  return <div>{STATUS_UI[status] ?? STATUS_UI.idle}</div>;
}

// -----------------------------------------------------------------------------
// Q13: Empty state conditional
//
// Kya karna hai:
// items.length === 0 ? <Empty /> : <List items={items} />
//
// Seedha matlab:
// Empty list alag UI — sirf "kuch nahi" mat dikhao blank screen.
// -----------------------------------------------------------------------------
function ItemPanel({ items }) {
  if (items.length === 0) {
    return <p className="empty">Koi item nahi — add karo!</p>;
  }
  return (
    <ul>
      {items.map((it) => (
        <li key={it.id}>{it.name}</li>
      ))}
    </ul>
  );
}

// -----------------------------------------------------------------------------
// Q14: Error state with retry
//
// Kya karna hai:
// error ? <ErrorBox onRetry={refetch} /> : children
//
// Seedha matlab:
// Error branch me action do — user stuck na rahe.
// -----------------------------------------------------------------------------
function DataShell({ error, onRetry, children }) {
  if (error) {
    return (
      <div>
        <p>Fail: {error}</p>
        <button onClick={onRetry}>Retry</button>
      </div>
    );
  }
  return children;
}

// -----------------------------------------------------------------------------
// Q15: Nested ternary avoid
//
// Kya karna hai:
// a ? b ? c : d : e — mat likho; early return ya variables use karo.
//
// Seedha matlab:
// Nested ternary padhna mushkil. Guard clauses ya Q8 jaisa pattern.
// -----------------------------------------------------------------------------
function NestedAvoid({ loading, error, data }) {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  if (!data) return <p>No data</p>;
  return <p>{data.title}</p>;
}

// -----------------------------------------------------------------------------
// Q16: Boolean coercion pitfall
//
// Kya karna hai:
// !!value && <Badge /> ya Boolean(value) && ...
//
// Seedha matlab:
// Object/array truthy hain — empty [] bhi show karwa sakta hai galat UI.
// Explicit length/count check better.
// -----------------------------------------------------------------------------
function HasItems({ items }) {
  return <div>{items.length > 0 && <span>{items.length} items</span>}</div>;
}

// -----------------------------------------------------------------------------
// Q17: Conditional children wrapper
//
// Kya karna hai:
// show ? <Card>{children}</Card> : children — layout wrap optional.
//
// Seedha matlab:
// Kabhi sirf wrapper conditional; content same rahe.
// -----------------------------------------------------------------------------
function MaybeCard({ framed, children }) {
  if (!framed) return children;
  return <div className="card">{children}</div>;
}

// -----------------------------------------------------------------------------
// Q18: [MID] Exclusive UI — tabs ek time pe ek
//
// Kya karna hai:
// activeTab state; sirf matching panel render.
//
// Seedha matlab:
// Sab panels DOM me mat rakho hidden CSS se — heavy panels unmount karo.
// -----------------------------------------------------------------------------
function Tabs({ tabs, activeId }) {
  const active = tabs.find((t) => t.id === activeId);
  return (
    <div>
      <nav>{tabs.map((t) => <button key={t.id}>{t.label}</button>)}</nav>
      {active && <section>{active.content}</section>}
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q19: [MID] CSS hidden vs conditional unmount
//
// Kya karna hai:
// display:none se hide vs {open && <Modal />} — state preserve?
//
// Seedha matlab:
// Hidden = DOM me rahe, state/form values bache. Unmount = wipe + less DOM.
// -----------------------------------------------------------------------------
function PreserveOrWipe({ open }) {
  // Hidden: <div style={{ display: open ? "block" : "none" }}><Form /></div>
  // Unmount: {open && <Form />} — form reset on close
  return open ? <form><input placeholder="Draft" /></form> : null;
}

// -----------------------------------------------------------------------------
// Q20: [MID] Animation mount tip
//
// Kya karna hai:
// enter animation ke liye pehle mount, phir class add — ya CSS @keyframes on mount.
//
// Seedha matlab:
// Conditional render se element naya aata hai — transition libraries isi pe kaam karti.
// -----------------------------------------------------------------------------
function FadeIn({ show }) {
  return show ? <div className="fade-in">Hello!</div> : null;
}

// -----------------------------------------------------------------------------
// Q21: [ADV] Exclusive UI state machine
//
// Kya karna hai:
// view: "list" | "detail" | "edit" — ek hi view render, baaki null.
//
// Seedha matlab:
// Multiple booleans (showList && !showEdit) messy. Ek enum string clean.
// -----------------------------------------------------------------------------
function ViewRouter({ view, item }) {
  if (view === "list") return <ul><li>Items...</li></ul>;
  if (view === "detail") return <article>{item?.title}</article>;
  if (view === "edit") return <form><input defaultValue={item?.title} /></form>;
  return null;
}

// -----------------------------------------------------------------------------
// Q22: [ADV] Accessibility — aria-hidden vs unmount
//
// Kya karna hai:
// Off-screen content: aria-hidden="true" vs remove from DOM.
//
// Seedha matlab:
// Screen readers: hidden still in tab order bad. Modal close → unmount + focus return.
// -----------------------------------------------------------------------------
function AccessibleModal({ open, onClose }) {
  if (!open) return null;
  return (
    <div role="dialog" aria-modal="true">
      <p>Modal content</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q23: Optional chaining in conditions
//
// Kya karna hai:
// user?.isAdmin && <AdminTools />
//
// Seedha matlab:
// Null user pe crash nahi. Still && pitfall: 0/"" check alag se.
// -----------------------------------------------------------------------------
function AdminTools({ user }) {
  return <div>{user?.isAdmin && <button>Delete all</button>}</div>;
}

// -----------------------------------------------------------------------------
// Q24: Fragment with conditional
//
// Kya karna hai:
// return ( <> {a && <A />} {b && <B />} </> );
//
// Seedha matlab:
// Extra wrapper div nahi chahiye to Fragment. Multiple conditional siblings OK.
// -----------------------------------------------------------------------------
function MultiConditional({ showA, showB }) {
  return (
    <>
      {showA && <p>A</p>}
      {showB && <p>B</p>}
    </>
  );
}

export {
  Gate,
  Inbox,
  UserProfile,
  BetaBanner,
  CartCount,
  FetchUI,
  Tab,
  Message,
  Greeting,
  NothingReturns,
  RolePanel,
  StatusFromMap,
  ItemPanel,
  DataShell,
  NestedAvoid,
  HasItems,
  MaybeCard,
  Tabs,
  PreserveOrWipe,
  FadeIn,
  ViewRouter,
  AccessibleModal,
  AdminTools,
  MultiConditional,
};
