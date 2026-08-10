// ============================================================================
// 43 — Accessibility (a11y) Deep Dive
// Level: MID / ADV  |  Sequence: file 22 routing first, then this for UI polish
// ============================================================================
//
// SIMPLE: a11y = all users can use the app — keyboard-only, screen reader,
// low vision, motor issues. Semantic HTML first; ARIA only when a native element
// is not enough. Make a button a real button; do not use div with onClick.
//
// Screen reader = software that reads the page aloud (NVDA, VoiceOver, JAWS).
// Focus = where the keyboard cursor is — manage it on modal/route change.
//
// WHY: Legal (WCAG), SEO, better UX for everyone. Expected in mid+ interviews.
// INTERVIEW: button vs div; aria-* when; focus trap; getByRole testing.
// Vite/React 19 project — teaching file.
//
// ============================================================================

import {
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

// -----------------------------------------------------------------------------
// Q1: Semantic HTML first — do not make div soup
//
// Task:
// Use nav, main, header, footer, section, article, button, ul/li.
//
// In simple words:
// Browser and screen reader get structure for free. ARIA is not a band-aid.
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
// Task:
// For clickable things use <button> or <a href>. Use div only when you add role+keyboard.
//
// In simple words:
// Native button = Enter/Space, focusable, announces "button". Div = nothing.
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
// Q3: label + htmlFor — give the input a name
//
// Task:
// <label htmlFor={id}> makes a bigger click area + links the label for screen reader.
//
// In simple words:
// Placeholder is not a label. Visible label is best; otherwise use aria-label.
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
// Task:
// aria-label = hidden text string. aria-labelledby = existing element id(s).
//
// In simple words:
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
// Q5: aria-describedby — link extra hint / error
//
// Task:
// Input + hint/error element id → aria-describedby={hintId}.
//
// In simple words:
// Screen reader reads description after the label. Attach errors here.
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
// Task:
// Toast/status region: role="status" (polite) or role="alert" (assertive).
//
// In simple words:
// polite = finish current speech, then read. assertive = interrupt right away.
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
// Task:
// Modal open → focus inside; Tab loop; background inert (aria-modal).
//
// In simple words:
// Focus trap = Tab does not leave until close. Libraries (FocusTrap) help too.
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
// Q8: Close modal with Escape
//
// Task:
// keydown Escape → onClose. Return focus to trigger.
//
// In simple words:
// Expected keyboard pattern. onKeyDown on document or dialog.
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
// Task:
// 0 = in natural tab order. -1 = programmatic focus only (modal container).
//
// In simple words:
// Do not use positive tabIndex (tab order hack). Roving tabindex is common in lists.
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
// Task:
// On custom widgets stop Space default scroll; Enter/Space = activate.
//
// In simple words:
// Not needed on native button/link. Required on role="button".
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
// Q11: Skip link — keyboard users jump to main content
//
// Task:
// Hidden link at page top → #main-content. Visible on focus.
//
// In simple words:
// Skip repeated nav on every page. CSS off-screen until focus.
// -----------------------------------------------------------------------------
function SkipLink() {
  return (
    <a href="#main-content" className="skip-link">
      Skip to main content
    </a>
  );
}

// CSS (global or module):
// .skip-link { position:absolute; left:-9999px; }
// .skip-link:focus { left:1rem; top:1rem; z-index:9999; }

// -----------------------------------------------------------------------------
// Q12: Heading hierarchy — one h1, do not break order
//
// Task:
// One h1 per page; sections h2, sub h3. Do not skip levels (h2→h4).
//
// In simple words:
// Screen reader users navigate by headings. Visual size from CSS; keep tags semantic.
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
// Task:
// Meaningful img → alt describes it. Decorative → alt="" (screen reader skips).
//
// In simple words:
// Do not write "image of". If button has text, avoid redundant alt.
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
// Task:
// On error aria-invalid="true"; error span id → aria-errormessage.
//
// In simple words:
// Do not use color-only errors. Screen reader needs both invalid field and message.
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
// Task:
// disabled = no focus, no events. aria-disabled = looks disabled, focusable (explain why).
//
// In simple words:
// Real disabled is best. aria-disabled when you need a tooltip to explain why.
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
// Task:
// Modal close → focus trigger. Route change → focus heading or main (SPA).
//
// In simple words:
// Lost focus = keyboard user is lost. Restore in useEffect.
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
// Task:
// CSS @media (prefers-reduced-motion: reduce) { animation: none; }
//
// In simple words:
// Less motion for users with vestibular issues. matchMedia in JS works too.
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
// Task:
// Text 4.5:1 (normal), 3:1 large. UI components 3:1. Don't rely on color alone.
//
// In simple words:
// Check contrast in design/comments. Error = icon + text, not red alone.
// -----------------------------------------------------------------------------
// Design token example comment:
// --text-on-bg: #1a1a1a on #ffffff → ~16:1 ✅
// --muted-link: verify 4.5:1; use underline for links

// -----------------------------------------------------------------------------
// Q19: Landmark roles — main, nav, complementary
//
// Task:
// Semantic tags = landmarks auto. If missing use role="navigation" etc.
//
// In simple words:
// Screen reader jumps via landmark shortcuts. One main per page. Multiple nav = aria-label.
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
// Task:
// Hidden native input + styled label; or role="switch" + aria-checked.
//
// In simple words:
// Native <input type="checkbox"> is best. Custom needs keyboard + checked state sync.
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
// Task:
// Hide text visually, keep visible to screen reader. Extra context for icon buttons.
//
// In simple words:
// display:none / visibility:hidden hides from screen reader too — do not use.
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
// Task:
// eslint-plugin-jsx-a11y; jest-axe; query by role/name, not testId only.
//
// In simple words:
// getByRole('button', { name: /save/i }) = query like user + screen reader.
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
// Task:
// {...props} spread to DOM; forward aria-* + id.
//
// In simple words:
// Pass aria-label through wrapper Button. Do not strip unknown aria-*.
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
// Task:
// Remember what NOT to do: div buttons, placeholder-only labels, positive tabIndex.
//
// In simple words:
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
// Task:
// Revise: first rule of ARIA, focus, live regions, testing.
//
// In simple words:
// "Can you use this with keyboard only?" — always think demo-ready.
// -----------------------------------------------------------------------------
const interviewA11yChecklist = {
  firstRuleOfAria:
    "If a native HTML element/attribute works, use that — ARIA last.",
  wcagLevels: "A / AA (common product target) / AAA",
  focusVisible: ":focus-visible CSS — show for keyboard users, not mouse spam",
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
