// ============================================================================
// 41 — Class Components (Legacy / Interview)
// Level: ADVANCED  |  Sequence: hooks seekho pehle, phir yeh interview revise
// ============================================================================
//
// LAYMAN: Purane React me components CLASS the — class Counter extends Component.
// Ab hooks wale function components standard hain, par interviews + legacy codebases
// me class lifecycle, setState, binding, Error Boundaries ab bhi poochte hain.
//
// KYUN: Samjho to hooks migration easy; Error Boundary ab bhi class-only core API.
// INTERVIEW: lifecycle order, setState batching, bind trap, PureComponent shallow compare.
// Vite/React 19 project me use — teaching file. (class API yahan intentional)
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
// Kya karna hai:
// Component har parent re-render pe child render (default).
// PureComponent shallow compare props/state — same refs → skip render.
//
// Seedha matlab:
// PureComponent = built-in shouldComponentUpdate with shallow compare.
// Deep nested object change detect nahi — mutation trap.
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
// Kya karna hai:
// constructor me state/refs init; super(props) pehle — warna this undefined.
// render() JSX return — required.
//
// Seedha matlab:
// Class field state = {} bhi chalega (modern). Constructor me bind bhi yahan.
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
// Kya karna hai:
// setState({ partial }) merge hota hai. Functional: prevState => next.
//
// Seedha matlab:
// Object form async feel — do setState same tick me stale ho sakta.
// Functional updater safe jab purani state pe depend.
// -----------------------------------------------------------------------------
class CounterState extends Component {
  state = { count: 0 };
  inc = () => {
    this.setState({ count: this.state.count + 1 }); // object
    this.setState({ count: this.state.count + 1 }); // ❌ dono same base — +1 hi
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
// Kya karna hai:
// this.handleClick ko JSX me dena — bind zaroori warna this undefined.
//
// Seedha matlab:
// 3 tareeke: constructor bind, arrow class field, ya render me arrow wrapper.
// Arrow class field sabse clean modern class code me.
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
// Kya karna hai:
// props = parent se read-only input. state = component ka khud ka data.
//
// Seedha matlab:
// props mutate mat. state setState se. "Smart vs dumb" — class me bhi same idea.
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
// Kya karna hai:
// Mount ke baad API call — DOM ready, good for initial data.
//
// Seedha matlab:
// Hooks me useEffect(() => {}, []) same job. Cancel flag ya AbortController use karo.
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
// Kya karna hai:
// prevProps/prevState compare karke conditional setState.
//
// Seedha matlab:
// Har update pe bina condition setState → infinite loop 💥
// Hooks: useEffect deps galat = same trap.
// -----------------------------------------------------------------------------
class SyncProp extends Component {
  state = { mirror: "" };
  componentDidUpdate(prevProps) {
    if (prevProps.text !== this.props.text) {
      this.setState({ mirror: this.props.text.toUpperCase() });
    }
    // ❌ this.setState({ mirror: this.props.text }); // har bar → loop
  }
  render() {
    return <p>{this.state.mirror}</p>;
  }
}

// -----------------------------------------------------------------------------
// Q8: componentWillUnmount cleanup
//
// Kya karna hai:
// Timers, subscriptions, listeners hatao — memory leak na ho.
//
// Seedha matlab:
// didMount me subscribe → willUnmount me unsubscribe. Symmetric cleanup.
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
// Kya karna hai:
// Manual render gate — return false skip render.
//
// Seedha matlab:
// PureComponent yeh automatically shallow karta hai.
// Custom deep compare rare — prefer immutable data + PureComponent/memo.
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
// Kya karna hai:
// Static method — props se state derive. Pure, no side effects.
//
// Seedha matlab:
// ⚠️ Anti-pattern aksar: prop copy state me. Prefer controlled OR key remount.
// Valid: UI state jo prop flip pe reset ho (rare).
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
// Kya karna hai:
// DOM update se PEHLE snapshot (scroll position). didUpdate me use.
//
// Seedha matlab:
// Chat list scroll preserve. Return value → componentDidUpdate 3rd arg.
// Hooks me ref + layout effect patterns common ab.
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
// Kya karna hai:
// getDerivedStateFromError + componentDidCatch — sirf class (core API).
//
// Seedha matlab:
// Render/lifecycle errors pakadta. Events/async nahi — try/catch wahan.
// See file 20 — yahan class syntax revise.
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
// Kya karna hai:
// defaultProps static; propTypes runtime dev check (prop-types package).
//
// Seedha matlab:
// TS projects me PropTypes kam; default params / defaultProps ab bhi.
// defaultProps function components pe deprecated direction — destructure defaults.
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
// PropTypes (Vite me: npm i prop-types):
// Avatar.propTypes = { src: PropTypes.string.isRequired, size: PropTypes.number };

// -----------------------------------------------------------------------------
// Q14: refs — createRef vs callback ref
//
// Kya karna hai:
// createRef instance field; callback ref fn (legacy string refs mat use).
//
// Seedha matlab:
// Focus input: this.inputRef.current.focus(). Callback jab unmount/remount dynamic ho.
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
// Kya karna hai:
// this.forceUpdate() exists — almost never use.
//
// Seedha matlab:
// State/props change se render aana chahiye. forceUpdate = code smell.
// External mutable data? → state me copy ya subscription pattern.
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
// Kya karna hai:
// Yaad kar interview me bolne ke liye.
//
// Seedha matlab:
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
// React 18+ Strict Mode DEV: mount/unmount/remount extra — cleanup test.
// -----------------------------------------------------------------------------
const lifecycleOrderNote =
  "Mount: construct→render→didMount. Update: derive→SCU→render→snapshot→didUpdate. Unmount: willUnmount.";

// -----------------------------------------------------------------------------
// Q17: Class → hooks migration map
//
// Kya karna hai:
// Mental translation table — interview gold.
//
// Seedha matlab:
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
// Kya karna hai:
// Conceptual — code me comment + chhota hook version.
//
// Seedha matlab:
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
// Kya karna hai:
// Class parent render me function child — normal React, no special API.
//
// Seedha matlab:
// Legacy screen class wrapper + new feature function components andar.
// Gradual migration pattern real companies me.
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
// Kya karna hai:
// React 18+ automatic batching — event handlers, promises, timeouts sab.
//
// Seedha matlab:
// Multiple setState → usually ek re-render. Functional updaters chain safe.
// flushSync force sync rare — perf hit.
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
// Kya karna hai:
// ThemeContext assign static contextType; this.context read.
//
// Seedha matlab:
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
// Kya karna hai:
// Common galatiyan dikhao + fix.
//
// Seedha matlab:
// ❌ this.state.items.push(x); this.setState({ items: this.state.items })
// ✅ this.setState({ items: [...this.state.items, x] })
// ❌ <button onClick={this.handle}> — this undefined
// ✅ arrow field ya bind
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
// Kya karna hai:
// Same object reference prop → PureChild skip render.
// New object each time → render hoga.
//
// Seedha matlab:
// style={{ color: "red" }} har bar naya object — PureComponent faida zero.
// Stable reference ya primitive props pass karo.
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
// Kya karna hai:
// UNSAFE_componentWillMount/ReceiveProps/Update — deprecated paths.
//
// Seedha matlab:
// Strict Mode + future React me hata sakte. Migrate:
// willMount → constructor / componentDidMount
// willReceiveProps → getDerivedStateFromProps (careful) ya derived render
// willUpdate → getSnapshotBeforeUpdate + didUpdate
// Codemods exist — interview me "UNSAFE prefix = migrate" bolo.
// -----------------------------------------------------------------------------
const unsafeLifecycleNote =
  "UNSAFE_* lifecycles = legacy; use getDerivedStateFromProps, getSnapshotBeforeUpdate, or hooks.";

// -----------------------------------------------------------------------------
// Q25: Counter — class vs function (mental conversion)
//
// Kya karna hai:
// Same counter dono style — side-by-side seekho.
//
// Seedha matlab:
// Class: state + bound handlers + lifecycle optional.
// Function: useState one-liner. Behavior same — syntax different.
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
