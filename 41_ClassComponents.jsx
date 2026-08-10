// ============================================================================
// 41 — Class Components (Legacy / Interview)
// Level: ADVANCED  |  Sequence: learn hooks first, then use this for interview revision
// ============================================================================
//
// SIMPLE: In old React, components were CLASSES — class Counter extends Component.
// Function components with hooks are standard now, but interviews and legacy codebases
// still ask about class lifecycle, setState, binding, and Error Boundaries.
//
// WHY: Understanding this makes hooks migration easier; Error Boundary is still class-only in the core API.
// INTERVIEW: lifecycle order, setState batching, bind trap, PureComponent shallow compare.
// Use in Vite/React 19 project — teaching file. (class API intentional here)
//
// ============================================================================

import {
  Component,
  PureComponent,
  createRef,
  createContext,
  useState,
} from "react";

// -----------------------------------------------------------------------------
// Q1: Component vs PureComponent
//
// Task:
// Component re-renders child on every parent re-render (default).
// PureComponent shallow compares props/state — same refs → skip render.
//
// In simple words:
// PureComponent = built-in shouldComponentUpdate with shallow compare.
// Does not detect deep nested object changes — mutation trap.
// -----------------------------------------------------------------------------
class PlainChild extends Component {
  render() {
    console.log("PlainChild render");
    return <p>{this.props.label}</p>;
  }
}

class PureChild extends PureComponent {
  render() {
    console.log("PureChild render");
    return <p>{this.props.label}</p>;
  }
}

class ParentPlainPure extends Component {
  state = { n: 0 };
  render() {
    return (
      <div>
        <button onClick={() => this.setState({ n: this.state.n + 1 })}>
          bump {this.state.n}
        </button>
        <PlainChild label="same" />
        <PureChild label="same" />
      </div>
    );
  }
}

// -----------------------------------------------------------------------------
// Q2: render, constructor + super(props)
//
// Task:
// Initialize state/refs in constructor; call super(props) first — otherwise this is undefined.
// render() must return JSX — required.
//
// In simple words:
// Class field state = {} also works (modern). You can bind handlers in the constructor too.
// -----------------------------------------------------------------------------
class Greeting extends Component {
  constructor(props) {
    super(props); // MUST before this.*
    this.state = { clicks: 0 };
  }
  render() {
    return (
      <h1>
        Hello {this.props.name}! Clicks: {this.state.clicks}
      </h1>
    );
  }
}

// -----------------------------------------------------------------------------
// Q3: this.state + setState (object + functional)
//
// Task:
// setState({ partial }) merges. Functional form: prevState => next.
//
// In simple words:
// Object form feels async — two setState calls in the same tick can use stale state.
// Functional updater is safe when you depend on previous state.
// -----------------------------------------------------------------------------
class CounterState extends Component {
  state = { count: 0 };
  inc = () => {
    this.setState({ count: this.state.count + 1 }); // object
    this.setState({ count: this.state.count + 1 }); // ❌ both read same base — only +1 total
  };
  incSafe = () => {
    this.setState((prev) => ({ count: prev.count + 1 })); // ✅
    this.setState((prev) => ({ count: prev.count + 1 })); // ✅ +2 total
  };
  render() {
    return (
      <div>
        <p>{this.state.count}</p>
        <button onClick={this.inc}>+1 object</button>
        <button onClick={this.incSafe}>+2 functional</button>
      </div>
    );
  }
}

// -----------------------------------------------------------------------------
// Q4: Binding — constructor bind vs arrow class fields
//
// Task:
// Pass this.handleClick to JSX — binding is required, otherwise this is undefined.
//
// In simple words:
// 3 ways: constructor bind, arrow class field, or arrow wrapper in render.
// Arrow class field is the cleanest in modern class code.
// -----------------------------------------------------------------------------
class BindDemo extends Component {
  // way 1 — constructor (legacy style)
  constructor(props) {
    super(props);
    this.onClickBound = this.onClickBound.bind(this);
  }
  onClickBound() {
    this.setState({ msg: "bound in constructor" });
  }

  // way 2 — arrow class field (auto-bound this)
  onClickArrow = () => {
    this.setState({ msg: "arrow field" });
  };

  state = { msg: "" };

  render() {
    return (
      <div>
        <p>{this.state.msg}</p>
        <button onClick={this.onClickBound}>Constructor bind</button>
        <button onClick={this.onClickArrow}>Arrow field</button>
        {/* way 3 — inline arrow (new fn each render — usually OK) */}
        <button onClick={() => this.setState({ msg: "inline" })}>Inline</button>
      </div>
    );
  }
}

// -----------------------------------------------------------------------------
// Q5: props vs state
//
// Task:
// props = read-only input from parent. state = component's own data.
//
// In simple words:
// Do not mutate props. Update state with setState. "Smart vs dumb" — same idea in classes.
// -----------------------------------------------------------------------------
class UserCard extends Component {
  state = { expanded: false };
  render() {
    const { name, role } = this.props; // read-only
    return (
      <div onClick={() => this.setState({ expanded: !this.state.expanded })}>
        <strong>{name}</strong> — {role}
        {this.state.expanded && <p>More details...</p>}
      </div>
    );
  }
}

// -----------------------------------------------------------------------------
// Q6: componentDidMount fetch
//
// Task:
// API call after mount — DOM is ready, good for initial data.
//
// In simple words:
// useEffect(() => {}, []) does the same job in hooks. Use a cancel flag or AbortController.
// -----------------------------------------------------------------------------
class UserFetch extends Component {
  state = { user: null, loading: true };
  componentDidMount() {
    let cancelled = false;
    fetch("https://jsonplaceholder.typicode.com/users/1")
      .then((r) => r.json())
      .then((user) => {
        if (!cancelled) this.setState({ user, loading: false });
      });
    this._cancel = () => {
      cancelled = true;
    };
  }
  componentWillUnmount() {
    this._cancel?.();
  }
  render() {
    if (this.state.loading) return <p>Loading...</p>;
    return <p>{this.state.user?.name}</p>;
  }
}

// -----------------------------------------------------------------------------
// Q7: componentDidUpdate + infinite loop trap
//
// Task:
// Compare prevProps/prevState and call setState conditionally.
//
// In simple words:
// setState on every update without a condition → infinite loop 💥
// Hooks: wrong useEffect deps = same trap.
// -----------------------------------------------------------------------------
class SyncProp extends Component {
  state = { mirror: "" };
  componentDidUpdate(prevProps) {
    if (prevProps.text !== this.props.text) {
      this.setState({ mirror: this.props.text.toUpperCase() });
    }
    // ❌ this.setState({ mirror: this.props.text }); // every time → loop
  }
  render() {
    return <p>{this.state.mirror}</p>;
  }
}

// -----------------------------------------------------------------------------
// Q8: componentWillUnmount cleanup
//
// Task:
// Remove timers, subscriptions, and listeners — avoid memory leaks.
//
// In simple words:
// Subscribe in didMount → unsubscribe in willUnmount. Symmetric cleanup.
// -----------------------------------------------------------------------------
class TimerClass extends Component {
  state = { sec: 0 };
  componentDidMount() {
    this.id = setInterval(() => {
      this.setState((s) => ({ sec: s.sec + 1 }));
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.id);
  }
  render() {
    return <p>Seconds: {this.state.sec}</p>;
  }
}

// -----------------------------------------------------------------------------
// Q9: shouldComponentUpdate
//
// Task:
// Manual render gate — return false to skip render.
//
// In simple words:
// PureComponent does this automatically with shallow compare.
// Custom deep compare is rare — prefer immutable data + PureComponent/memo.
// -----------------------------------------------------------------------------
class ManualSCU extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.value !== this.props.value;
  }
  render() {
    console.log("ManualSCU render");
    return <span>{this.props.value}</span>;
  }
}

// -----------------------------------------------------------------------------
// Q10: getDerivedStateFromProps (rare, anti-pattern note)
//
// Task:
// Static method — derive state from props. Pure, no side effects.
//
// In simple words:
// ⚠️ Often an anti-pattern: copying props into state. Prefer controlled OR key remount.
// Valid case: UI state that resets when a prop flips (rare).
// -----------------------------------------------------------------------------
class DerivedDemo extends Component {
  state = { draft: "" };
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.resetToken !== prevState.lastToken) {
      return { draft: "", lastToken: nextProps.resetToken };
    }
    return null; // no change
  }
  render() {
    return (
      <input
        value={this.state.draft}
        onChange={(e) => this.setState({ draft: e.target.value })}
      />
    );
  }
}

// -----------------------------------------------------------------------------
// Q11: getSnapshotBeforeUpdate
//
// Task:
// Snapshot BEFORE DOM update (scroll position). Use in didUpdate.
//
// In simple words:
// Preserve chat list scroll. Return value → componentDidUpdate 3rd arg.
// Ref + layout effect patterns are more common in hooks now.
// -----------------------------------------------------------------------------
class ChatList extends Component {
  listRef = createRef();
  getSnapshotBeforeUpdate(prevProps) {
    const el = this.listRef.current;
    if (prevProps.items.length < this.props.items.length && el) {
      return el.scrollHeight - el.scrollTop;
    }
    return null;
  }
  componentDidUpdate(_prevProps, _prevState, snapshot) {
    const el = this.listRef.current;
    if (snapshot != null && el) {
      el.scrollTop = el.scrollHeight - snapshot;
    }
  }
  render() {
    return (
      <ul ref={this.listRef} style={{ height: 120, overflow: "auto" }}>
        {this.props.items.map((m) => (
          <li key={m.id}>{m.text}</li>
        ))}
      </ul>
    );
  }
}

// -----------------------------------------------------------------------------
// Q12: Error boundary as class
//
// Task:
// getDerivedStateFromError + componentDidCatch — class only (core API).
//
// In simple words:
// Catches render/lifecycle errors. Not events/async — use try/catch there.
// See file 20 — class syntax revision here.
// -----------------------------------------------------------------------------
class ClassErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.error("ClassErrorBoundary", error, info.componentStack);
  }
  render() {
    if (this.state.hasError) return <p>Class boundary caught error.</p>;
    return this.props.children;
  }
}

function BuggyWidget({ crash }) {
  if (crash) throw new Error("class boundary test");
  return <p>Widget OK</p>;
}

class BoundaryDemo extends Component {
  state = { crash: false };
  render() {
    return (
      <ClassErrorBoundary>
        <button onClick={() => this.setState({ crash: true })}>Crash</button>
        <BuggyWidget crash={this.state.crash} />
      </ClassErrorBoundary>
    );
  }
}

// -----------------------------------------------------------------------------
// Q13: defaultProps / propTypes mention
//
// Task:
// defaultProps static; propTypes runtime dev check (prop-types package).
//
// In simple words:
// PropTypes less common in TS projects; default params / defaultProps still used.
// defaultProps on function components trending deprecated — use destructure defaults.
// -----------------------------------------------------------------------------
class Avatar extends Component {
  static defaultProps = {
    size: 40,
    alt: "avatar",
  };
  render() {
    const { src, size, alt } = this.props;
    return <img src={src} width={size} height={size} alt={alt} />;
  }
}
// PropTypes (in Vite: npm i prop-types):
// Avatar.propTypes = { src: PropTypes.string.isRequired, size: PropTypes.number };

// -----------------------------------------------------------------------------
// Q14: refs — createRef vs callback ref
//
// Task:
// createRef as instance field; callback ref fn (do not use legacy string refs).
//
// In simple words:
// Focus input: this.inputRef.current.focus(). Callback when unmount/remount is dynamic.
// -----------------------------------------------------------------------------
class FocusInput extends Component {
  inputRef = createRef();
  componentDidMount() {
    this.inputRef.current?.focus();
  }
  render() {
    return <input ref={this.inputRef} placeholder="auto focus" />;
  }
}

class CallbackRefDemo extends Component {
  state = { h: 0 };
  setRef = (node) => {
    if (node) this.setState({ h: node.offsetHeight });
  };
  render() {
    return (
      <div>
        <div ref={this.setRef} style={{ padding: 20, background: "#eee" }}>
          Measure me
        </div>
        <p>Height: {this.state.h}px</p>
      </div>
    );
  }
}

// -----------------------------------------------------------------------------
// Q15: Force update — when NOT to
//
// Task:
// this.forceUpdate() exists — almost never use.
//
// In simple words:
// Render should come from state/props change. forceUpdate = code smell.
// External mutable data? → copy into state or use subscription pattern.
// -----------------------------------------------------------------------------
class ForceBad extends Component {
  external = { n: 0 };
  tick = () => {
    this.external.n += 1;
    this.forceUpdate(); // ❌ smell — use setState instead
  };
  render() {
    return (
      <button onClick={this.tick}>External: {this.external.n}</button>
    );
  }
}

// -----------------------------------------------------------------------------
// Q16: Lifecycle order — mount / update / unmount (comment diagram)
//
// Task:
// Memorize this for interviews.
//
// In simple words:
//
// MOUNT (parent → child):
//   constructor → getDerivedStateFromProps → render →
//   child... → componentDidMount (child first, parent last)
//
// UPDATE:
//   getDerivedStateFromProps → shouldComponentUpdate → render →
//   getSnapshotBeforeUpdate → DOM update → componentDidUpdate
//
// UNMOUNT:
//   componentWillUnmount (child first, parent last)
//
// React 18+ Strict Mode DEV: extra mount/unmount/remount — tests cleanup.
// -----------------------------------------------------------------------------
const lifecycleOrderNote =
  "Mount: construct→render→didMount. Update: derive→SCU→render→snapshot→didUpdate. Unmount: willUnmount.";

// -----------------------------------------------------------------------------
// Q17: Class → hooks migration map
//
// Task:
// Mental translation table — interview gold.
//
// In simple words:
// constructor state     → useState / useReducer initial
// componentDidMount       → useEffect(() => {}, [])
// componentDidUpdate      → useEffect(() => {}, [deps])
// componentWillUnmount    → useEffect return cleanup
// shouldComponentUpdate   → React.memo + compare OR useMemo
// this.state              → useState/useReducer
// this.props              → function props arg
// context                 → useContext
// refs                    → useRef
// getDerivedStateFromProps → derived during render / key remount
// Error boundary          → still class (or lib)
// -----------------------------------------------------------------------------
const migrationMap = {
  componentDidMount: "useEffect(fn, [])",
  componentDidUpdate: "useEffect(fn, [deps])",
  componentWillUnmount: "useEffect(() => cleanup, [])",
  shouldComponentUpdate: "React.memo(Component, areEqual?)",
  state: "useState / useReducer",
  context: "useContext",
  refs: "useRef",
};

// -----------------------------------------------------------------------------
// Q18: Why industry moved to hooks
//
// Task:
// Conceptual — comment in code + small hook version.
//
// In simple words:
// 1) Logic reuse without HOC/render-prop nesting hell
// 2) Related lifecycle split across methods → one useEffect cluster
// 3) Classes: this binding confusion, bigger bundle, no compiler wins easy
// 4) Concurrent features designed around functions
// 5) Less boilerplate — same Counter 1/3 lines
// -----------------------------------------------------------------------------
function HookCounter({ initial = 0 }) {
  const [count, setCount] = useState(initial);
  return <button onClick={() => setCount((c) => c + 1)}>{count}</button>;
}

// -----------------------------------------------------------------------------
// Q19: Mixed class parent + function child
//
// Task:
// Class parent renders function child — normal React, no special API.
//
// In simple words:
// Legacy screen as class wrapper + new feature function components inside.
// Gradual migration pattern in real companies.
// -----------------------------------------------------------------------------
function ModernButton({ label, onClick }) {
  return <button onClick={onClick}>{label}</button>;
}

class LegacyShell extends Component {
  state = { count: 0 };
  render() {
    return (
      <div className="legacy-shell">
        <h2>Class shell</h2>
        <ModernButton
          label={`Count ${this.state.count}`}
          onClick={() => this.setState({ count: this.state.count + 1 })}
        />
      </div>
    );
  }
}

// -----------------------------------------------------------------------------
// Q20: setState batching in classes
//
// Task:
// React 18+ automatic batching — event handlers, promises, timeouts all batched.
//
// In simple words:
// Multiple setState → usually one re-render. Functional updaters chain safely.
// flushSync forces sync rarely — perf hit.
// -----------------------------------------------------------------------------
class BatchClass extends Component {
  state = { a: 0, b: 0 };
  onClick = () => {
    this.setState({ a: this.state.a + 1 });
    this.setState({ b: this.state.b + 1 });
    // React 18+: typically 1 render after both
  };
  render() {
    return (
      <button onClick={this.onClick}>
        {this.state.a},{this.state.b}
      </button>
    );
  }
}

// -----------------------------------------------------------------------------
// Q21: Context in class — static contextType
//
// Task:
// Assign ThemeContext to static contextType; read this.context.
//
// In simple words:
// Hooks: useContext. Class: contextType OR Context.Consumer wrapper (verbose).
// -----------------------------------------------------------------------------
const ThemeContextClass = createContext("light");

class ThemedPanel extends Component {
  static contextType = ThemeContextClass;
  render() {
    const theme = this.context;
    return <div data-theme={theme}>Panel theme: {theme}</div>;
  }
}

class ThemeProviderClass extends Component {
  state = { theme: "dark" };
  render() {
    return (
      <ThemeContextClass.Provider value={this.state.theme}>
        <ThemedPanel />
      </ThemeContextClass.Provider>
    );
  }
}

// -----------------------------------------------------------------------------
// Q22: [MID] Interview pitfalls — mutate state, forget bind
//
// Task:
// Show common mistakes + fix.
//
// In simple words:
// ❌ this.state.items.push(x); this.setState({ items: this.state.items })
// ✅ this.setState({ items: [...this.state.items, x] })
// ❌ <button onClick={this.handle}> — this undefined
// ✅ arrow field or bind
// -----------------------------------------------------------------------------
class PitfallDemo extends Component {
  state = { items: ["a"] };
  // ❌ handleBad() { this.setState(...) } without bind

  handleGood = () => {
    this.setState((prev) => ({
      items: [...prev.items, "b"], // immutable ✅
    }));
  };
  render() {
    return (
      <div>
        <ul>
          {this.state.items.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
        <button onClick={this.handleGood}>Add immutable</button>
      </div>
    );
  }
}

// -----------------------------------------------------------------------------
// Q23: PureComponent shallow compare demo
//
// Task:
// Same object reference prop → PureChild skips render.
// New object each time → will render.
//
// In simple words:
// style={{ color: "red" }} new object every time — PureComponent benefit zero.
// Pass stable reference or primitive props.
// -----------------------------------------------------------------------------
class ShallowDemo extends Component {
  state = { n: 0 };
  config = { color: "blue" }; // stable ref ✅
  render() {
    return (
      <div>
        <button onClick={() => this.setState({ n: this.state.n + 1 })}>
          parent {this.state.n}
        </button>
        <PureChild label="hi" meta={this.config} />
        <PureChild label="hi" meta={{ color: "red" }} /> {/* new each render ❌ */}
      </div>
    );
  }
}

// -----------------------------------------------------------------------------
// Q24: [ADV] Legacy UNSAFE_ lifecycle warning
//
// Task:
// UNSAFE_componentWillMount/ReceiveProps/Update — deprecated paths.
//
// In simple words:
// Strict Mode + future React may remove them. Migrate:
// willMount → constructor / componentDidMount
// willReceiveProps → getDerivedStateFromProps (careful) or derived render
// willUpdate → getSnapshotBeforeUpdate + didUpdate
// Codemods exist — in interview say "UNSAFE prefix = migrate".
// -----------------------------------------------------------------------------
const unsafeLifecycleNote =
  "UNSAFE_* lifecycles = legacy; use getDerivedStateFromProps, getSnapshotBeforeUpdate, or hooks.";

// -----------------------------------------------------------------------------
// Q25: Counter — class vs function (mental conversion)
//
// Task:
// Same counter both styles — learn side-by-side.
//
// In simple words:
// Class: state + bound handlers + optional lifecycle.
// Function: useState one-liner. Same behavior — different syntax.
// -----------------------------------------------------------------------------
class ClassCounter extends Component {
  state = { count: 0 };
  inc = () => this.setState((s) => ({ count: s.count + 1 }));
  dec = () => this.setState((s) => ({ count: s.count - 1 }));
  render() {
    return (
      <div>
        Class: {this.state.count}
        <button onClick={this.inc}>+</button>
        <button onClick={this.dec}>-</button>
      </div>
    );
  }
}

function FunctionCounter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      Function: {count}
      <button onClick={() => setCount((c) => c + 1)}>+</button>
      <button onClick={() => setCount((c) => c - 1)}>-</button>
    </div>
  );
}

function CounterCompare() {
  return (
    <div>
      <ClassCounter />
      <FunctionCounter />
    </div>
  );
}

// -----------------------------------------------------------------------------
// Quick revise: Error boundary class-only | bind this | setState merge/batch
// PureComponent shallow | migrate map | UNSAFE avoid | hooks won new code
// -----------------------------------------------------------------------------

export {
  ParentPlainPure,
  Greeting,
  CounterState,
  BindDemo,
  UserCard,
  UserFetch,
  SyncProp,
  TimerClass,
  ManualSCU,
  DerivedDemo,
  ChatList,
  ClassErrorBoundary,
  BoundaryDemo,
  Avatar,
  FocusInput,
  CallbackRefDemo,
  ForceBad,
  lifecycleOrderNote,
  migrationMap,
  HookCounter,
  LegacyShell,
  BatchClass,
  ThemeProviderClass,
  PitfallDemo,
  ShallowDemo,
  unsafeLifecycleNote,
  ClassCounter,
  FunctionCounter,
  CounterCompare,
};
