// ============================================================================
// 43 — Accessibility (a11y) Deep Dive
// Level: MID / ADV  |  Sequence: pehle 22 routing, phir yeh UI polish ke liye
// ============================================================================
//
// LAYMAN: a11y = sab users app use kar saken — keyboard-only, screen reader,
// low vision, motor issues. Semantic HTML pehle; ARIA sirf jab native element
// kaafi na ho. Button ko button banao, div pe onClick mat.
//
// Screen reader = software jo page padhta hai (NVDA, VoiceOver, JAWS).
// Focus = keyboard cursor kahan hai — modal/route change pe manage karo.
//
// KYUN: Legal (WCAG), SEO, better UX sabke liye. Mid+ interviews me expected.
// INTERVIEW: button vs div; aria-* kab; focus trap; getByRole testing.
// Vite/React 19 project me use — teaching file.
//
// ============================================================================

import {
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

// -----------------------------------------------------------------------------
// Q1: Semantic HTML pehle — div soup mat banao
//
// Kya karna hai:
// nav, main, header, footer, section, article, button, ul/li use karo.
//
// Seedha matlab:
// Browser + screen reader ko structure free me milta hai. ARIA band-aid nahi.
// -----------------------------------------------------------------------------
function SemanticPage() {
  return (
    <>
      <header>
        <h1>Shop</h1>
        <nav aria-label="Main">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
          </ul>
        </nav>
      </header>
      <main id="main-content">
        <article>
          <h2>Featured product</h2>
          <p>Description here.</p>
        </article>
      </main>
      <footer>© 2026</footer>
    </>
  );
}

// -----------------------------------------------------------------------------
// Q2: button vs div onClick — keyboard + SR default
//
// Kya karna hai:
// Clickable cheez ke liye <button> ya <a href>. Div tab jab role+keyboard add karo.
//
// Seedha matlab:
// Native button = Enter/Space, focusable, "button" announce. Div = kuch nahi.
// -----------------------------------------------------------------------------
function GoodButton() {
  return <button type="button">Save</button>;
}

function BadDivButton() {
  // ❌ anti-pattern — avoid in real apps
  return <div onClick={() => {}}>Save</div>;
}

function DivAsButtonIfYouMust() {
  function onKeyDown(e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      // action
    }
  }
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => {}}
      onKeyDown={onKeyDown}
    >
      Save
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q3: label + htmlFor — input ko name do
//
// Kya karna hai:
// <label htmlFor={id}> se input click area bada + SR label link.
//
// Seedha matlab:
// Placeholder label nahi. Visible label best; nahi to aria-label.
// -----------------------------------------------------------------------------
function EmailField() {
  const id = useId();
  return (
    <div>
      <label htmlFor={id}>Email</label>
      <input id={id} name="email" type="email" autoComplete="email" />
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q4: aria-label vs aria-labelledby
//
// Kya karna hai:
// aria-label = hidden text string. aria-labelledby = existing element id(s).
//
// Seedha matlab:
// Icon-only button → aria-label="Close". Dialog title id → aria-labelledby.
// -----------------------------------------------------------------------------
function IconClose({ onClose }) {
  return (
    <button type="button" aria-label="Close dialog" onClick={onClose}>
      ×
    </button>
  );
}

function NamedByTitle({ titleId }) {
  return (
    <section aria-labelledby={titleId}>
      <h2 id={titleId}>Settings</h2>
    </section>
  );
}

// -----------------------------------------------------------------------------
// Q5: aria-describedby — extra hint / error link
//
// Kya karna hai:
// Input + hint/error element id → aria-describedby={hintId}.
//
// Seedha matlab:
// SR label ke baad description padhta hai. Errors yahan attach karo.
// -----------------------------------------------------------------------------
function PasswordWithHint() {
  const inputId = useId();
  const hintId = useId();
  return (
    <>
      <label htmlFor={inputId}>Password</label>
      <input
        id={inputId}
        type="password"
        aria-describedby={hintId}
      />
      <p id={hintId}>At least 8 characters.</p>
    </>
  );
}

// -----------------------------------------------------------------------------
// Q6: aria-live polite vs assertive — dynamic announcements
//
// Kya karna hai:
// Toast/status ke liye region: role="status" (polite) ya role="alert" (assertive).
//
// Seedha matlab:
// polite = current speech khatam, phir padho. assertive = turant interrupt.
// -----------------------------------------------------------------------------
function LiveStatus({ message }) {
  return (
    <p role="status" aria-live="polite" aria-atomic="true">
      {message}
    </p>
  );
}

function LiveAlert({ error }) {
  if (!error) return null;
  return (
    <div role="alert" aria-live="assertive">
      {error}
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q7: [MID] role="dialog" + focus trap basics
//
// Kya karna hai:
// Modal open → focus andar; Tab loop; background inert (aria-modal).
//
// Seedha matlab:
// Focus trap = Tab se bahar na nikle jab tak close. Libraries (FocusTrap) bhi.
// -----------------------------------------------------------------------------
function SimpleModal({ open, onClose, title, children }) {
  const dialogRef = useRef(null);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement;
    dialogRef.current?.focus();
    return () => prev?.focus?.();
  }, [open]);

  if (!open) return null;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      tabIndex={-1}
    >
      <h2 id={titleId}>{title}</h2>
      {children}
      <button type="button" onClick={onClose}>
        Close
      </button>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q8: Escape se modal close
//
// Kya karna hai:
// keydown Escape → onClose. Focus wapas trigger pe.
//
// Seedha matlab:
// Expected keyboard pattern. onKeyDown document ya dialog pe.
// -----------------------------------------------------------------------------
function ModalWithEscape({ open, onClose, children }) {
  useEffect(() => {
    if (!open) return;
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return <div role="dialog" aria-modal="true">{children}</div>;
}

// -----------------------------------------------------------------------------
// Q9: tabIndex 0 vs -1
//
// Kya karna hai:
// 0 = natural tab order me. -1 = programmatic focus only (modal container).
//
// Seedha matlab:
// tabIndex positive mat (tab order hack). Roving tabindex lists me common.
// -----------------------------------------------------------------------------
function RovingTabMenu({ items }) {
  const [active, setActive] = useState(0);
  return (
    <ul role="menubar">
      {items.map((label, i) => (
        <li key={label} role="none">
          <button
            type="button"
            role="menuitem"
            tabIndex={i === active ? 0 : -1}
            onFocus={() => setActive(i)}
          >
            {label}
          </button>
        </li>
      ))}
    </ul>
  );
}

// -----------------------------------------------------------------------------
// Q10: Keyboard Enter / Space handlers
//
// Kya karna hai:
// Custom widgets pe Space default scroll roko; Enter/Space = activate.
//
// Seedha matlab:
// Native button/link pe zarurat nahi. role="button" pe zaruri.
// -----------------------------------------------------------------------------
function CustomPressable({ onPress, children }) {
  function handleKey(e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onPress();
    }
  }
  return (
    <span role="button" tabIndex={0} onKeyDown={handleKey} onClick={onPress}>
      {children}
    </span>
  );
}

// -----------------------------------------------------------------------------
// Q11: Skip link — keyboard users ko main content jump
//
// Kya karna hai:
// Page top pe hidden link → #main-content. Focus pe visible.
//
// Seedha matlab:
// Har page pe nav repeat skip karo. CSS se off-screen until focus.
// -----------------------------------------------------------------------------
function SkipLink() {
  return (
    <a href="#main-content" className="skip-link">
      Skip to main content
    </a>
  );
}

// CSS (global ya module):
// .skip-link { position:absolute; left:-9999px; }
// .skip-link:focus { left:1rem; top:1rem; z-index:9999; }

// -----------------------------------------------------------------------------
// Q12: Heading hierarchy — ek h1, order mat todo
//
// Kya karna hai:
// Page me ek h1; sections h2, sub h3. Levels skip mat (h2→h4).
//
// Seedha matlab:
// SR users headings se navigate. Visual size CSS se, tag semantic rakho.
// -----------------------------------------------------------------------------
function HeadingOutline() {
  return (
    <main>
      <h1>Dashboard</h1>
      <section>
        <h2>Recent orders</h2>
        <h3>Today</h3>
      </section>
      <section>
        <h2>Profile</h2>
      </section>
    </main>
  );
}

// -----------------------------------------------------------------------------
// Q13: Alt text — decorative vs informative images
//
// Kya karna hai:
// Meaningful img → alt describe. Decorative → alt="" (SR skip).
//
// Seedha matlab:
// "image of" mat likho. Button me text ho to redundant alt avoid.
// -----------------------------------------------------------------------------
function ProductCard({ name, decorative }) {
  return (
    <article>
      {decorative ? (
        <img src="/hero.png" alt="" role="presentation" />
      ) : (
        <img src="/product.png" alt={`${name} — front view`} />
      )}
      <h2>{name}</h2>
    </article>
  );
}

// -----------------------------------------------------------------------------
// Q14: [MID] Form errors — aria-invalid + aria-errormessage
//
// Kya karna hai:
// Error pe aria-invalid="true"; error span id → aria-errormessage.
//
// Seedha matlab:
// Color-only error mat. SR ko field invalid + message dono chahiye.
// -----------------------------------------------------------------------------
function FieldWithError({ label, value, onChange, error }) {
  const inputId = useId();
  const errorId = useId();
  return (
    <div>
      <label htmlFor={inputId}>{label}</label>
      <input
        id={inputId}
        value={value}
        onChange={onChange}
        aria-invalid={error ? "true" : undefined}
        aria-errormessage={error ? errorId : undefined}
      />
      {error && (
        <span id={errorId} role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q15: disabled vs aria-disabled
//
// Kya karna hai:
// disabled = no focus, no events. aria-disabled = looks disabled, focusable (explain why).
//
// Seedha matlab:
// Real disabled best. aria-disabled tab jab tooltip se reason dena ho.
// -----------------------------------------------------------------------------
function SubmitRow({ canSubmit }) {
  return (
    <>
      <button type="submit" disabled={!canSubmit}>
        Pay
      </button>
      {/* aria-disabled pattern — still focusable, block in handler */}
      <button
        type="button"
        aria-disabled={!canSubmit}
        onClick={(e) => {
          if (!canSubmit) return;
          // pay
        }}
      >
        Pay (soft disabled)
      </button>
    </>
  );
}

// -----------------------------------------------------------------------------
// Q16: [MID] Focus management after route / modal close
//
// Kya karna hai:
// Modal band → trigger focus. Route change → heading ya main focus (SPA).
//
// Seedha matlab:
// Focus kho gaya = keyboard user lost. useEffect me restore karo.
// -----------------------------------------------------------------------------
function RouteFocusMain() {
  const mainRef = useRef(null);
  useEffect(() => {
    mainRef.current?.focus();
  }, []); // pathname dep in real router
  return (
    <main ref={mainRef} tabIndex={-1} id="main-content">
      <h1>Page title</h1>
    </main>
  );
}

// -----------------------------------------------------------------------------
// Q17: prefers-reduced-motion — animation respect
//
// Kya karna hai:
// CSS @media (prefers-reduced-motion: reduce) { animation: none; }
//
// Seedha matlab:
// Vestibular issues wale users ko motion kam. JS se matchMedia bhi.
// -----------------------------------------------------------------------------
function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const fn = () => setReduce(mq.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return reduce;
}

function MotionSafeSpinner() {
  const reduce = usePrefersReducedMotion();
  return (
    <span aria-hidden={reduce} className={reduce ? "static-icon" : "spin"} />
  );
}

// -----------------------------------------------------------------------------
// Q18: Color contrast note (WCAG)
//
// Kya karna hai:
// Text 4.5:1 (normal), 3:1 large. UI components 3:1. Don't rely on color alone.
//
// Seedha matlab:
// Comment/design me contrast check. Error = icon + text, sirf red mat.
// -----------------------------------------------------------------------------
// Design token example comment:
// --text-on-bg: #1a1a1a on #ffffff → ~16:1 ✅
// --muted-link: verify 4.5:1; use underline for links

// -----------------------------------------------------------------------------
// Q19: Landmark roles — main, nav, complementary
//
// Kya karna hai:
// Semantic tags = landmarks auto. Missing pe role="navigation" etc.
//
// Seedha matlab:
// SR landmark shortcut se jump. Ek main per page. Multiple nav = aria-label.
// -----------------------------------------------------------------------------
function Landmarks() {
  return (
    <>
      <nav aria-label="Primary">...</nav>
      <main>...</main>
      <aside aria-label="Related links">...</aside>
    </>
  );
}

// -----------------------------------------------------------------------------
// Q20: [ADV] Accessible custom checkbox / switch
//
// Kya karna hai:
// Hidden native input + styled label; ya role="switch" + aria-checked.
//
// Seedha matlab:
// Native <input type="checkbox"> best. Custom me keyboard + checked state sync.
// -----------------------------------------------------------------------------
function AccessibleSwitch({ checked, onChange, label }) {
  const id = useId();
  return (
    <label htmlFor={id} style={{ display: "flex", gap: 8 }}>
      <input
        id={id}
        type="checkbox"
        role="switch"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        aria-checked={checked}
      />
      {label}
    </label>
  );
}

function CustomCheckbox({ checked, onChange, label }) {
  const id = useId();
  return (
    <>
      <input
        id={id}
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <label htmlFor={id}>{label}</label>
    </>
  );
}

// -----------------------------------------------------------------------------
// Q21: Screen-reader-only CSS (.sr-only / .visually-hidden)
//
// Kya karna hai:
// Text visually hide, SR ko visible. Icon buttons ke extra context.
//
// Seedha matlab:
// display:none / visibility:hidden SR se bhi chhupa deta — mat use.
// -----------------------------------------------------------------------------
const srOnlyStyles = {
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0,0,0,0)",
  whiteSpace: "nowrap",
  border: 0,
};

function SrOnlyExample() {
  return (
    <button type="button">
      <span aria-hidden>🔍</span>
      <span style={srOnlyStyles}>Search products</span>
    </button>
  );
}

// -----------------------------------------------------------------------------
// Q22: [MID] Testing mindset — axe + RTL getByRole
//
// Kya karna hai:
// eslint-plugin-jsx-a11y; jest-axe; query by role/name, not testId only.
//
// Seedha matlab:
// getByRole('button', { name: /save/i }) = user + SR jaisa query.
// -----------------------------------------------------------------------------
// import { render, screen } from '@testing-library/react';
// import { axe, toHaveNoViolations } from 'jest-axe';
// expect.extend(toHaveNoViolations);
//
// test('dialog accessible', async () => {
//   const { container } = render(<SimpleModal open title="Hi" />);
//   expect(screen.getByRole('dialog')).toBeInTheDocument();
//   expect(await axe(container)).toHaveNoViolations();
// });

function testingChecklist() {
  return [
    "Tab through whole flow — focus visible?",
    "Screen reader sample (VoiceOver/NVDA) once per feature",
    "axe DevTools / jest-axe in CI",
    "getByRole over getByTestId for a11y-critical UI",
  ];
}

// -----------------------------------------------------------------------------
// Q23: React 19 — aria-* props on custom components
//
// Kya karna hai:
// {...props} spread DOM tak; aria-* + id forward karo.
//
// Seedha matlab:
// Wrapper Button me aria-label pass-through. Don't strip unknown aria-*.
// -----------------------------------------------------------------------------
function Button({ children, ...props }) {
  return (
    <button type="button" {...props}>
      {children}
    </button>
  );
}

// Usage: <Button aria-expanded={open} aria-controls={panelId}>Menu</Button>

// React 19: ref as prop on function components — focus management easier (file 34).

// -----------------------------------------------------------------------------
// Q24: [ADV] Common anti-patterns — interview red flags
//
// Kya karna hai:
// Yaad karo kya NA karna: div buttons, placeholder-only labels, positive tabIndex.
//
// Seedha matlab:
// "We added aria everywhere" without semantics = fail.
// -----------------------------------------------------------------------------
const a11yAntiPatterns = [
  "div/span onClick without role + keyboard",
  "aria-label on every div (div soup + ARIA)",
  "tabIndex={1} for 'important' buttons",
  "color-only state (red border, no text)",
  "autoplay video/audio without control",
  "role='button' on <button> (redundant)",
  "aria-hidden on focusable elements",
  "preventDefault on Tab inside modal (broken trap)",
];

// -----------------------------------------------------------------------------
// Q25: [MID] Interview checklist — quick answers
//
// Kya karna hai:
// Revise: first rule of ARIA, focus, live regions, testing.
//
// Seedha matlab:
// "Can you use this with keyboard only?" — hamesha demo ready soch.
// -----------------------------------------------------------------------------
const interviewA11yChecklist = {
  firstRuleOfAria:
    "If native HTML element + attribute kaam kare, use that — ARIA last.",
  wcagLevels: "A / AA (common product target) / AAA",
  focusVisible: ":focus-visible CSS — keyboard users ko dikhe, mouse spam na",
  hiddenContent:
    "aria-hidden=true decorative; never on interactive or main content",
  mobile: "Touch targets ~44px; same semantics as desktop",
  legal: "ADA, EAA (EU), Section 508 — know they exist",
};

export {
  SemanticPage,
  GoodButton,
  DivAsButtonIfYouMust,
  EmailField,
  IconClose,
  NamedByTitle,
  PasswordWithHint,
  LiveStatus,
  LiveAlert,
  SimpleModal,
  ModalWithEscape,
  RovingTabMenu,
  CustomPressable,
  SkipLink,
  HeadingOutline,
  ProductCard,
  FieldWithError,
  SubmitRow,
  RouteFocusMain,
  usePrefersReducedMotion,
  MotionSafeSpinner,
  Landmarks,
  AccessibleSwitch,
  CustomCheckbox,
  SrOnlyExample,
  testingChecklist,
  Button,
  a11yAntiPatterns,
  interviewA11yChecklist,
};
