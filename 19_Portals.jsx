// ============================================================================
// 19 — Portals
// Level: MID  |  Sequence: read this file, then the next number
// ============================================================================
//
// SIMPLE: Portal = child lives in React tree here, but DOM renders somewhere else (body
// for modal). Like kitchen order at counter, dish served at table.
// createPortal(jsx, domNode) — events still bubble through React tree (logical).
//
// Use: modals, tooltips, toasts — escape overflow:hidden parent.
//
// WHY: CSS stacking/overflow issues fix without breaking component tree.
// INTERVIEW: why portals; event bubbling through portals.
// Use in a Vite + React 19 project — teaching file.
//
// ============================================================================

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

// -----------------------------------------------------------------------------
// Q1: Modal via portal to document.body
//
// Task:
// createPortal(<dialog/>, document.body)
//
// In simple words:
// Modal on DOM root — z-index/overflow safe.
// -----------------------------------------------------------------------------
function Modal({ children, onClose }) {
  return createPortal(
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body
  );
}

// -----------------------------------------------------------------------------
// Q2: Conditional portal
//
// Task:
// Portal mounts only when open.
//
// In simple words:
// Closed modal = portal unmount. Cleanup natural.
// -----------------------------------------------------------------------------
function App() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setOpen(true)}>Open</button>
      {open && (
        <Modal onClose={() => setOpen(false)}>
          <p>Hello portal</p>
        </Modal>
      )}
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q3: Toast container
//
// Task:
// Fixed corner portal for toasts.
//
// In simple words:
// App triggers toast from anywhere — DOM in one place.
// -----------------------------------------------------------------------------
function Toast({ message }) {
  return createPortal(
    <div className="toast">{message}</div>,
    document.body
  );
}

// -----------------------------------------------------------------------------
// Q4: Target node by id
//
// Task:
// document.getElementById("modal-root")
//
// In simple words:
// index.html has <div id="modal-root"> — common separate root pattern.
// -----------------------------------------------------------------------------
function PortalToRoot({ children }) {
  const node = document.getElementById("modal-root") || document.body;
  return createPortal(children, node);
}

// -----------------------------------------------------------------------------
// Q5: [MID] Events bubble in React tree
//
// Task:
// Parent onClick may fire on portal child click (React 17+ delegation).
//
// In simple words:
// DOM different, React parentage same. Use stopPropagation knowingly.
// -----------------------------------------------------------------------------
function ParentClick() {
  return (
    <div onClick={() => console.log("parent")}>
      <Modal onClose={() => {}}>
        <button>Click — parent may hear in React tree</button>
      </Modal>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q6: Focus trap note (a11y)
//
// Task:
// Portal modal needs focus trap / Escape close — a11y required.
//
// In simple words:
// Portal only moves DOM; accessibility is separate work.
// -----------------------------------------------------------------------------
function A11yModal({ onClose, children }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  return createPortal(
    <div role="dialog" aria-modal="true">
      {children}
    </div>,
    document.body
  );
}

// -----------------------------------------------------------------------------
// Q7: [MID] SSR: document check
//
// Task:
// typeof document === "undefined" → null.
//
// In simple words:
// No body on server. Portal after client mount.
// -----------------------------------------------------------------------------
function SafePortal({ children }) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  if (!ready) return null;
  return createPortal(children, document.body);
}

// -----------------------------------------------------------------------------
// Q8: Tooltip portal
//
// Task:
// Tooltip outside overflow hidden card.
//
// In simple words:
// Same reason as modal — escape clipping.
// -----------------------------------------------------------------------------
function Tip({ text }) {
  return createPortal(<div className="tip">{text}</div>, document.body);
}

// -----------------------------------------------------------------------------
// Q9: Nested portal — tooltip inside modal
//
// Task:
// Outer modal on body; inner tooltip also on body as separate portal.
//
// In simple words:
// Both DOM elsewhere, React tree parent-child. Nested portals valid.
// -----------------------------------------------------------------------------
function NestedPortalModal({ open, onClose }) {
  if (!open) return null;
  return createPortal(
    <div className="overlay">
      <div className="modal">
        <p>Modal content</p>
        {createPortal(<div className="tip">Nested tip</div>, document.body)}
        <button onClick={onClose}>Close</button>
      </div>
    </div>,
    document.body
  );
}

// -----------------------------------------------------------------------------
// Q10: [MID] DOM stopPropagation vs React bubble
//
// Task:
// e.stopPropagation() on DOM; React synthetic parent onClick different rule.
//
// In simple words:
// Portal DOM is outside but inside React tree — understand both layers.
// -----------------------------------------------------------------------------
function BubbleDemo() {
  return (
    <div onClick={() => console.log("React parent")}>
      <Modal onClose={() => {}}>
        <button onClick={(e) => e.stopPropagation()}>Stop DOM only</button>
      </Modal>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q11: Body scroll lock when modal open
//
// Task:
// open: document.body.style.overflow = "hidden"; close: restore.
//
// In simple words:
// Portal doesn't trap scroll — lock scroll yourself.
// -----------------------------------------------------------------------------
function ScrollLockModal({ open, onClose, children }) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);
  if (!open) return null;
  return createPortal(
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body
  );
}

// -----------------------------------------------------------------------------
// Q12: [MID] Focus trap — tab loop inside modal
//
// Task:
// Modal open: focus first focusable element; Tab loops last to first.
//
// In simple words:
// Keyboard users shouldn't wander outside — a11y must.
// -----------------------------------------------------------------------------
function FocusTrapModal({ onClose, children }) {
  const modalRef = useRef(null);
  useEffect(() => {
    const el = modalRef.current;
    if (!el) return;
    const focusables = el.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    focusables[0]?.focus();
    function onKey(e) {
      if (e.key !== "Tab" || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, []);
  return createPortal(
    <div ref={modalRef} role="dialog" aria-modal="true">
      {children}
      <button onClick={onClose}>Close</button>
    </div>,
    document.body
  );
}

// -----------------------------------------------------------------------------
// Q13: Return focus to trigger button on close
//
// Task:
// Save document.activeElement before open; .focus() restore on close.
//
// In simple words:
// Screen reader / keyboard flow stays natural.
// -----------------------------------------------------------------------------
function ReturnFocusModal({ open, onClose, triggerRef }) {
  const prevFocus = useRef(null);
  useEffect(() => {
    if (open) {
      prevFocus.current = document.activeElement;
    } else {
      prevFocus.current?.focus?.();
    }
  }, [open]);
  if (!open) return null;
  return createPortal(
    <div role="dialog">
      <p>Modal</p>
      <button onClick={onClose}>Done</button>
    </div>,
    document.body
  );
}

// -----------------------------------------------------------------------------
// Q14: [MID] aria-hidden background when modal open
//
// Task:
// #root aria-hidden="true" when modal; remove on cleanup.
//
// In simple words:
// Assistive tech only hears modal — background "muted".
// -----------------------------------------------------------------------------
function AriaHiddenModal({ open, onClose, children }) {
  useEffect(() => {
    const root = document.getElementById("root");
    if (!open || !root) return;
    root.setAttribute("aria-hidden", "true");
    return () => root.removeAttribute("aria-hidden");
  }, [open]);
  if (!open) return null;
  return createPortal(
    <div role="dialog" aria-modal="true">
      {children}
      <button onClick={onClose}>Close</button>
    </div>,
    document.body
  );
}

// -----------------------------------------------------------------------------
// Q15: Multiple modals — z-index stacking
//
// Task:
// Each modal its own z-index level; confirm dialog above modal.
//
// In simple words:
// Same body portal — manage stack with order + z-index.
// -----------------------------------------------------------------------------
function StackedModals() {
  const [confirm, setConfirm] = useState(false);
  return (
    <>
      {createPortal(
        <div style={{ zIndex: 1000 }} className="modal">Main modal</div>,
        document.body
      )}
      {confirm &&
        createPortal(
          <div style={{ zIndex: 1100 }} className="modal">
            Sure?
            <button onClick={() => setConfirm(false)}>OK</button>
          </div>,
          document.body
        )}
    </>
  );
}

// -----------------------------------------------------------------------------
// Q16: [MID] Portal target from ref (dynamic container)
//
// Task:
// useRef + useEffect until container node ready; then createPortal.
//
// In simple words:
// Not fixed getElementById — component can create its own mount point.
// -----------------------------------------------------------------------------
function DynamicPortalTarget({ children }) {
  const ref = useRef(null);
  const [node, setNode] = useState(null);
  useEffect(() => setNode(ref.current), []);
  return (
    <>
      <div ref={ref} id="dynamic-portal-root" />
      {node && createPortal(children, node)}
    </>
  );
}

// -----------------------------------------------------------------------------
// Q17: Tooltip portal — escape overflow clip
//
// Task:
// Card overflow:hidden; tooltip createPortal to body with fixed position.
//
// In simple words:
// Calculate position (getBoundingClientRect); render in portal.
// -----------------------------------------------------------------------------
function TooltipPortal({ anchorRef, text, show }) {
  const [pos, setPos] = useState({ top: 0, left: 0 });
  useEffect(() => {
    if (!show || !anchorRef.current) return;
    const r = anchorRef.current.getBoundingClientRect();
    setPos({ top: r.bottom + 4, left: r.left });
  }, [show, anchorRef]);
  if (!show) return null;
  return createPortal(
    <div className="tip" style={{ position: "fixed", ...pos }}>
      {text}
    </div>,
    document.body
  );
}

// -----------------------------------------------------------------------------
// Q18: [ADV] React 17+ event delegation on root
//
// Task:
// Not on document — React root delegates; portal events bubble in tree.
//
// In simple words:
// Interview: portal DOM different, React hierarchy same — parent onClick fires.
// -----------------------------------------------------------------------------
function DelegationNote() {
  return (
    <p>
      React 17+: events attach from root container — portal child click can
      bubble to React parent.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q19: [ADV] SSR hydration — portal null on server
//
// Task:
// Server HTML has no portal content; inject after client mount.
//
// In simple words:
// Avoid hydration mismatch — client-only portal pattern (like Q7).
// -----------------------------------------------------------------------------
function HydrationSafePortal({ children }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return createPortal(children, document.body);
}

// -----------------------------------------------------------------------------
// Q20: [ADV] Nested portal unmount order
//
// Task:
// Parent modal unmount → nested portals inside also cleanup.
//
// In simple words:
// React follows unmount tree order — nested portal DOM nodes removed too.
// -----------------------------------------------------------------------------
function UnmountOrderDemo() {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <button onClick={() => setOpen(false)}>Close all</button>
      {open && (
        <NestedPortalModal open onClose={() => setOpen(false)} />
      )}
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q21: [ADV] Portal vs position:fixed — when which?
//
// Task:
// Fixed + high z-index sometimes enough; portal when ancestor transform/overflow clip.
//
// In simple words:
// Interview: stacking context / overflow:hidden parent → portal needed.
// -----------------------------------------------------------------------------
function PortalVsFixed() {
  return (
    <p>
      position:fixed enough when parent doesn't clip; portal when modal must leave
      DOM hierarchy.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q22: [ADV] Interview — portal checklist to recite
//
// Task:
// createPortal, events, SSR guard, focus trap, scroll lock, aria-modal.
//
// In simple words:
// Mid interview answer: DOM escape + React tree preserve + a11y separate work.
// -----------------------------------------------------------------------------
function PortalChecklist() {
  return (
    <ol>
      <li>createPortal(jsx, domNode)</li>
      <li>Events bubble in React tree</li>
      <li>SSR: client-only mount</li>
      <li>Focus trap + return focus + Escape</li>
      <li>Scroll lock + aria-hidden background</li>
    </ol>
  );
}

export {
  Modal,
  App,
  Toast,
  PortalToRoot,
  ParentClick,
  A11yModal,
  SafePortal,
  Tip,
  NestedPortalModal,
  BubbleDemo,
  ScrollLockModal,
  FocusTrapModal,
  ReturnFocusModal,
  AriaHiddenModal,
  StackedModals,
  DynamicPortalTarget,
  TooltipPortal,
  DelegationNote,
  HydrationSafePortal,
  UnmountOrderDemo,
  PortalVsFixed,
  PortalChecklist,
};
