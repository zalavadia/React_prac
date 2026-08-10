// ============================================================================
// 06 — Conditional Rendering
// Level: BASE  |  Sequence: read this file, then the next number
// ============================================================================
//
// SIMPLE: Sometimes show UI, sometimes do not — like a fridge light: on when door opens.
// In React use if/return, && , ternary (? :) to decide.
//
// && : if left is truthy, show right. Careful: 0 && <X /> → 0 on screen!
// Ternary: A ? <Yes /> : <No />. null return = show nothing.
//
// WHY: Loading, error, empty, auth — every real app uses conditionals.
// INTERVIEW: && pitfall with 0; early return; null vs false.
// Use in a Vite + React 19 project — teaching file (do not run with node alone).
//
// ============================================================================

// -----------------------------------------------------------------------------
// Q1: Ternary Show / Hide
//
// Task:
// loggedIn ? <Dash /> : <Login />
//
// In simple words:
// Two clear branches. Readable for A vs B.
// -----------------------------------------------------------------------------
function Gate({ loggedIn }) {
  return loggedIn ? <p>Dashboard</p> : <p>Please login</p>;
}

// -----------------------------------------------------------------------------
// Q2: && short show
//
// Task:
// unread > 0 && <Badge />
//
// In simple words:
// For "maybe show" only. No else branch.
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
// Task:
// if (loading) return <Spinner />; return <Data />
//
// In simple words:
// Avoid nested ternary. Guard clauses are clean.
// -----------------------------------------------------------------------------
function UserProfile({ loading, user }) {
  if (loading) return <p>Loading...</p>;
  if (!user) return <p>No user</p>;
  return <h2>{user.name}</h2>;
}

// -----------------------------------------------------------------------------
// Q4: return null
//
// Task:
// Feature flag off → component renders nothing.
//
// In simple words:
// null = nothing in DOM. Valid React return.
// -----------------------------------------------------------------------------
function BetaBanner({ enabled }) {
  if (!enabled) return null;
  return <aside>Beta feature!</aside>;
}

// -----------------------------------------------------------------------------
// Q5: [MID] && with number 0 pitfall
//
// Task:
// count && <p>{count}</p> — when count is 0, "0" shows on screen!
//
// In simple words:
// 0 is falsy but React renders 0. Fix: count > 0 && ...
// -----------------------------------------------------------------------------
function CartCount({ count }) {
  // BAD: {count && <span>{count}</span>}  → shows 0
  return <div>{count > 0 && <span>{count} items</span>}</div>;
}

// -----------------------------------------------------------------------------
// Q6: Multi-state UI machine (simple)
//
// Task:
// status: idle | loading | error | success — switch UI.
//
// In simple words:
// Real fetch UIs use this pattern. Enum-like string status.
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
// Task:
// isActive ? "tab on" : "tab" className.
//
// In simple words:
// Conditional styling is a cousin of conditional rendering.
// -----------------------------------------------------------------------------
function Tab({ isActive, label }) {
  return (
    <button className={isActive ? "tab on" : "tab"}>{label}</button>
  );
}

// -----------------------------------------------------------------------------
// Q8: [MID] Element variables
//
// Task:
// let content = ...; set with ifs; return <div>{content}</div>
//
// In simple words:
// Resolve complex conditions before JSX — more readable.
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
// Task:
// name && <Greeting /> — when name is "", understand the pattern.
//
// In simple words:
// "" is falsy, does not render — unlike 0. Still, explicit check is safer.
// -----------------------------------------------------------------------------
function Greeting({ name }) {
  return <div>{name ? <p>Hi {name}</p> : <p>Guest</p>}</div>;
}

// -----------------------------------------------------------------------------
// Q10: null vs false vs undefined
//
// Task:
// return false / null / undefined — all three show nothing on screen.
//
// In simple words:
// React skips these. false is common in && chains but not by accident.
// -----------------------------------------------------------------------------
function NothingReturns({ show }) {
  if (!show) return null; // preferred over false
  return <p>Visible</p>;
}

// -----------------------------------------------------------------------------
// Q11: Switch statement UI
//
// Task:
// switch (role) { case "admin": return <Admin />; ... }
//
// In simple words:
// When many branches, switch is readable. Always include default case.
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
// Task:
// const VIEWS = { list: <List />, grid: <Grid /> }; return VIEWS[mode]
//
// In simple words:
// Status/type → component map. Shorter than switch when mapping is simple.
// -----------------------------------------------------------------------------
const STATUS_UI = {
  idle: <p>Get started</p>,
  loading: <p>Loading...</p>,
  done: <p>Done!</p>,
};

function StatusFromMap({ status }) {
  return <div>{STATUS_UI[status] ?? STATUS_UI.idle}</div>;
}

// -----------------------------------------------------------------------------
// Q13: Empty state conditional
//
// Task:
// items.length === 0 ? <Empty /> : <List items={items} />
//
// In simple words:
// Empty list needs its own UI — do not show a blank screen.
// -----------------------------------------------------------------------------
function ItemPanel({ items }) {
  if (items.length === 0) {
    return <p className="empty">No items — add one!</p>;
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
// Task:
// error ? <ErrorBox onRetry={refetch} /> : children
//
// In simple words:
// Error branch should offer action — user should not get stuck.
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
// Task:
// a ? b ? c : d : e — do not write this; use early return or variables.
//
// In simple words:
// Nested ternary is hard to read. Use guard clauses or Q8 pattern.
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
// Task:
// !!value && <Badge /> or Boolean(value) && ...
//
// In simple words:
// Objects/arrays are truthy — empty [] can show wrong UI.
// Explicit length/count check is better.
// -----------------------------------------------------------------------------
function HasItems({ items }) {
  return <div>{items.length > 0 && <span>{items.length} items</span>}</div>;
}

// -----------------------------------------------------------------------------
// Q17: Conditional children wrapper
//
// Task:
// show ? <Card>{children}</Card> : children — optional layout wrap.
//
// In simple words:
// Sometimes only the wrapper is conditional; content stays the same.
// -----------------------------------------------------------------------------
function MaybeCard({ framed, children }) {
  if (!framed) return children;
  return <div className="card">{children}</div>;
}

// -----------------------------------------------------------------------------
// Q18: [MID] Exclusive UI — one tab at a time
//
// Task:
// activeTab state; render only matching panel.
//
// In simple words:
// Do not keep all panels in DOM hidden with CSS — unmount heavy panels.
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
// Task:
// display:none to hide vs {open && <Modal />} — preserve state?
//
// In simple words:
// Hidden = stays in DOM, form values kept. Unmount = wipe + less DOM.
// -----------------------------------------------------------------------------
function PreserveOrWipe({ open }) {
  // Hidden: <div style={{ display: open ? "block" : "none" }}><Form /></div>
  // Unmount: {open && <Form />} — form reset on close
  return open ? <form><input placeholder="Draft" /></form> : null;
}

// -----------------------------------------------------------------------------
// Q20: [MID] Animation mount tip
//
// Task:
// For enter animation: mount first, then add class — or CSS @keyframes on mount.
//
// In simple words:
// Conditional render creates new element — transition libraries work on this.
// -----------------------------------------------------------------------------
function FadeIn({ show }) {
  return show ? <div className="fade-in">Hello!</div> : null;
}

// -----------------------------------------------------------------------------
// Q21: [ADV] Exclusive UI state machine
//
// Task:
// view: "list" | "detail" | "edit" — render one view, others null.
//
// In simple words:
// Multiple booleans (showList && !showEdit) gets messy. One enum string is clean.
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
// Task:
// Off-screen content: aria-hidden="true" vs remove from DOM.
//
// In simple words:
// Screen readers: hidden content still in tab order is bad. Modal close → unmount + return focus.
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
// Task:
// user?.isAdmin && <AdminTools />
//
// In simple words:
// No crash on null user. Still watch && pitfall: check 0/"" separately.
// -----------------------------------------------------------------------------
function AdminTools({ user }) {
  return <div>{user?.isAdmin && <button>Delete all</button>}</div>;
}

// -----------------------------------------------------------------------------
// Q24: Fragment with conditional
//
// Task:
// return ( <> {a && <A />} {b && <B />} </> );
//
// In simple words:
// No extra wrapper div needed — Fragment. Multiple conditional siblings OK.
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
