// ============================================================================
// 19 — Portals
// Level: MID  |  Sequence: pehle yeh, phir agla number
// ============================================================================
//
// LAYMAN: Portal = React tree me child yahan, DOM me kahin aur (body pe
// modal). Jaise kitchen order counter pe, dish table pe serve.
// createPortal(jsx, domNode) — events ab bhi React tree se bubble (logical).
//
// Use: modals, tooltips, toasts — overflow:hidden parent se bachna.
//
// KYUN: CSS stacking/overflow issues fix without breaking component tree.
// INTERVIEW: why portals; event bubbling through portals.
// Vite/React 19 project me use — teaching file.
//
// ============================================================================

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

// -----------------------------------------------------------------------------
// Q1: Modal via portal to document.body
//
// Kya karna hai:
// createPortal(<dialog/>, document.body)
//
// Seedha matlab:
// Modal DOM root pe — z-index/overflow safe.
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
// Kya karna hai:
// open tabhi portal mount.
//
// Seedha matlab:
// Band modal = portal unmount. Cleanup natural.
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
// Kya karna hai:
// Fixed corner portal for toasts.
//
// Seedha matlab:
// App kahin se toast — DOM ek jagah.
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
// Kya karna hai:
// document.getElementById("modal-root")
//
// Seedha matlab:
// index.html me <div id="modal-root"> alag root common pattern.
// -----------------------------------------------------------------------------
function PortalToRoot({ children }) {
  const node = document.getElementById("modal-root") || document.body;
  return createPortal(children, node);
}

// -----------------------------------------------------------------------------
// Q5: [MID] Events bubble in React tree
//
// Kya karna hai:
// Parent onClick portal child click pe fire ho sakta (React 17+ delegation).
//
// Seedha matlab:
// DOM alag, React parentage same. stopPropagation samajh ke use.
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
// Kya karna hai:
// Portal modal pe focus trap / Escape close — a11y zaroori.
//
// Seedha matlab:
// Portal sirf DOM move; accessibility alag kaam.
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
// Kya karna hai:
// typeof document === "undefined" pe null.
//
// Seedha matlab:
// Server pe body nahi. Client mount ke baad portal.
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
// Kya karna hai:
// Overflow hidden card se tooltip bahar.
//
// Seedha matlab:
// Same reason as modal — escape clipping.
// -----------------------------------------------------------------------------
function Tip({ text }) {
  return createPortal(<div className="tip">{text}</div>, document.body);
}

// -----------------------------------------------------------------------------
// Q9: Nested portal — modal ke andar tooltip
//
// Kya karna hai:
// Outer modal body pe; inner tooltip bhi body pe alag portal.
//
// Seedha matlab:
// Dono DOM alag jagah, React tree parent-child. Nested portals valid.
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
// Kya karna hai:
// e.stopPropagation() DOM pe; React synthetic parent onClick alag rule.
//
// Seedha matlab:
// Portal DOM bahar hai par React tree me andar — dono layers samjho.
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
// Q11: Body scroll lock jab modal open
//
// Kya karna hai:
// open pe document.body.style.overflow = "hidden"; close pe restore.
//
// Seedha matlab:
// Portal scroll trap nahi karta — scroll lock khud karo.
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
// Q12: [MID] Focus trap — tab loop modal ke andar
//
// Kya karna hai:
// Modal open pe pehla focusable element focus; Tab last se first pe loop.
//
// Seedha matlab:
// Keyboard users bahar na bhatak jayein — a11y must.
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
// Q13: Close pe focus wapas trigger button pe
//
// Kya karna hai:
// open se pehle document.activeElement save; close pe .focus() restore.
//
// Seedha matlab:
// Screen reader / keyboard flow natural rahe.
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
// Q14: [MID] aria-hidden background jab modal open
//
// Kya karna hai:
// #root pe aria-hidden="true" jab modal; cleanup pe hatao.
//
// Seedha matlab:
// Assistive tech sirf modal sunegi — background "mute".
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
// Kya karna hai:
// Har modal ka apna z-index level; confirm dialog modal ke upar.
//
// Seedha matlab:
// Portal same body pe — order + z-index se stack manage.
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
// Q16: [MID] Portal target ref se (dynamic container)
//
// Kya karna hai:
// useRef + useEffect se container node ready; tab createPortal.
//
// Seedha matlab:
// getElementById fixed nahi — component apna mount point bana sakta.
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
// Q17: Tooltip portal — overflow clip se bachna
//
// Kya karna hai:
// Card overflow:hidden; tooltip createPortal se body pe fixed position.
//
// Seedha matlab:
// Position calculate karo (getBoundingClientRect); render portal me.
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
// Q18: [ADV] React 17+ event delegation root pe
//
// Kya karna hai:
// document pe nahi — React root pe delegate; portal events tree me bubble.
//
// Seedha matlab:
// Interview: portal DOM alag, React hierarchy same — isliye parent onClick fire.
// -----------------------------------------------------------------------------
function DelegationNote() {
  return (
    <p>
      React 17+: events root container se attach — portal child ka click React
      parent tak bubble ho sakta hai.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q19: [ADV] SSR hydration — portal server pe null
//
// Kya karna hai:
// Server HTML me portal content nahi; client mount ke baad inject.
//
// Seedha matlab:
// Hydration mismatch avoid — client-only portal pattern (Q7 jaisa).
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
// Kya karna hai:
// Parent modal unmount → andar ke nested portals bhi cleanup.
//
// Seedha matlab:
// React unmount tree order follow — nested portal DOM nodes bhi hatao.
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
// Q21: [ADV] Portal vs position:fixed — kab kya?
//
// Kya karna hai:
// Fixed + high z-index kabhi kaafi; portal jab ancestor transform/overflow clip.
//
// Seedha matlab:
// Interview: stacking context / overflow:hidden parent → portal zaroori.
// -----------------------------------------------------------------------------
function PortalVsFixed() {
  return (
    <p>
      position:fixed kaafi jab parent clip na kare; portal jab modal DOM hierarchy
      se bahar chahiye.
    </p>
  );
}

// -----------------------------------------------------------------------------
// Q22: [ADV] Interview — portal checklist bolke sunao
//
// Kya karna hai:
// createPortal, events, SSR guard, focus trap, scroll lock, aria-modal.
//
// Seedha matlab:
// Mid interview answer: DOM escape + React tree preserve + a11y alag kaam.
// -----------------------------------------------------------------------------
function PortalChecklist() {
  return (
    <ol>
      <li>createPortal(jsx, domNode)</li>
      <li>Events React tree me bubble</li>
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
