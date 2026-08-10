// ============================================================================
// 35 — React 19 Document Metadata (title / meta in tree)
// Level: REACT19  |  Study in order: read this file first, then the next number
// ============================================================================
//
// SIMPLE: Before, in React SPAs we set document.title = '...' in useEffect,
// or used libraries like react-helmet.
//
// React 19: write <title>, <meta>, <link> directly INSIDE the component —
// React hoists and manages them in the document <head>.
//
// Think of each page component bringing its own nameplate (title);
// React puts it up at the front desk.
//
// WHY: Less effect soup; SSR/RSC friendly metadata story.
// INTERVIEW: client-only title vs RSC metadata; conflicting titles.
//
// ============================================================================

import { useState } from "react";

// -----------------------------------------------------------------------------
// Q1: Basic <title> inside page component
//
// In simple words:
// Route/page render → title tag component tree me.
// Browser tab text update.
// -----------------------------------------------------------------------------
export function AboutPage() {
  return (
    <>
      <title>About — MyApp</title>
      <h1>About</h1>
      <p>We build things.</p>
    </>
  );
}

// -----------------------------------------------------------------------------
// Q2: <meta> description / og tags
//
// In simple words:
// meta for SEO + social previews.
// In real production, frameworks (Next Metadata API) are also used —
// React 19 built-in = foundation.
// -----------------------------------------------------------------------------
export function ProductPage({ product }) {
  return (
    <>
      <title>{product.name} — Shop</title>
      <meta name="description" content={product.blurb} />
      <meta property="og:title" content={product.name} />
      <h1>{product.name}</h1>
    </>
  );
}

// -----------------------------------------------------------------------------
// Q3: [MID] Dynamic title with state
//
// In simple words:
// Title is also render output — state changes, title re-renders.
// Less need to sync document.title with useEffect.
// -----------------------------------------------------------------------------
export function CartTitle({ count }) {
  return (
    <>
      <title>{count ? `Cart (${count})` : "Cart"}</title>
      <h1>Your cart</h1>
    </>
  );
}

export function CartApp() {
  const [count, setCount] = useState(2);
  return (
    <div>
      <CartTitle count={count} />
      <button onClick={() => setCount((c) => c + 1)}>Add</button>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Q4: <link rel="stylesheet"> / canonical idea
//
// In simple words:
// declare link tags from the tree too.
// Careful: duplicate stylesheets — design system / bundler usually better.
// canonical URL meta/link SEO pattern.
// -----------------------------------------------------------------------------
export function Article({ slug, title }) {
  return (
    <>
      <title>{title}</title>
      <link rel="canonical" href={`https://example.com/a/${slug}`} />
      <article>
        <h1>{title}</h1>
      </article>
    </>
  );
}

// -----------------------------------------------------------------------------
// Q5: [MID] Conflict — what if two components set the title?
//
// In simple words:
// Last / deeper / framework precedence — depends on the environment.
// Practice: ONE page-level owner for title; do not leave random titles in children.
// Interview: "single source of truth for document title per route".
// -----------------------------------------------------------------------------
export function NestedTitlesBad() {
  return (
    <>
      <title>Parent</title>
      <ChildAlsoSetsTitle />
    </>
  );
}

function ChildAlsoSetsTitle() {
  return (
    <>
      <title>Child wins? depends</title>
      <p>Prefer one owner</p>
    </>
  );
}

// -----------------------------------------------------------------------------
// Q6: Old useEffect way (contrast)
//
// In simple words:
// It still works — but React 19 declarative metadata is cleaner.
// In SSR, effects run late — title flash possible; tree metadata is a better story.
// -----------------------------------------------------------------------------
export function OldTitleEffect() {
  // useEffect(() => { document.title = 'Old way'; }, []);
  return <p>Prefer &lt;title&gt; in React 19+</p>;
}

// -----------------------------------------------------------------------------
// Q7: [MID] Frameworks vs raw React 19
//
// In simple words:
// Next.js App Router: export metadata / generateMetadata — first-class.
// Vite SPA: React 19 title/meta tags helpful on client.
// Know which environment you are in — answer accordingly.
// -----------------------------------------------------------------------------
const environments = {
  nextAppRouter: "use Next metadata APIs primarily",
  spaVite: "React 19 <title>/<meta> in components works client-side",
};

// -----------------------------------------------------------------------------
// Q8: Accessibility — title meaningful
//
// In simple words:
// Do not leave "Document" in the tab — make the page purpose clear.
// Multi-page app: unique titles help screen reader users switching tabs.
// -----------------------------------------------------------------------------
export function GoodTitles() {
  return (
    <>
      <title>Settings — Profile — MyApp</title>
      <h1>Profile settings</h1>
    </>
  );
}

// -----------------------------------------------------------------------------
// Q9: [MID] Title update on route change — SPA
//
// Task:
// <title> per page component in React Router route element.
//
// In simple words:
// Route render → title in component tree → tab update.
// React 18: useEffect document.title on pathname change.
// React 19: declarative title in each route component cleaner.
// Trap: layout + page both set title — decide one owner (page usually wins).
// -----------------------------------------------------------------------------
export function DashboardRouteTitle() {
  return (
    <>
      <title>Dashboard — MyApp</title>
      <h1>Dashboard</h1>
    </>
  );
}

// -----------------------------------------------------------------------------
// Q10: og:image / twitter cards
//
// Task:
// <meta property="og:image" content="https://..." /> for social share.
//
// In simple words:
// Absolute URL prefer — relative OG images break on shares.
// React 18 react-helmet async similar tags.
// SSR/RSC: metadata in first HTML response is best — for crawlers.
// Client-only SPA: some bots weak JS — SSR still SEO win.
// -----------------------------------------------------------------------------
export function SharePage({ imageUrl, title }) {
  return (
    <>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:image" content={imageUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <h1>{title}</h1>
    </>
  );
}

// -----------------------------------------------------------------------------
// Q11: [MID] Multiple meta same name — trap
//
// Task:
// Two <meta name="description"> — precedence unclear; keep only one.
//
// In simple words:
// Same as duplicate title — single page-level SEO owner.
// React 18 helmet override rules similar confusion.
// Layout default description + page override — read your framework merge rules.
// When NOT: leave random SEO tags in child components.
// -----------------------------------------------------------------------------
export function DuplicateMetaTrap() {
  return (
    <>
      <meta name="description" content="Layout default" />
      <meta name="description" content="Page specific — avoid duplicate" />
      <p>Prefer one description owner per route</p>
    </>
  );
}

// -----------------------------------------------------------------------------
// Q12: lang attribute on html — who sets?
//
// Task:
// <html lang="en"> usually in root index.html or framework layout.
//
// In simple words:
// React 19 title/meta hoist; html lang often static shell.
// i18n route: framework may set lang per locale.
// React 18: same — rarely html lang from component tree.
// a11y: lang helps screen readers pronunciation.
// -----------------------------------------------------------------------------
export function LangNote() {
  return <p>html lang typically set in root template, not every page component.</p>;
}

// -----------------------------------------------------------------------------
// Q13: [MID] useEffect document.title migration
//
// Task:
// Old pattern: useEffect(() => { document.title = t }, [t]) → replace with <title>{t}</title>.
//
// In simple words:
// Remove effect cleanup title restore hacks when using declarative tags.
// React 18 effect runs after paint — title flash possible.
// React 19 tree metadata integrates with render commit story better.
// Keep effect for non-declarative APIs (analytics) only.
// -----------------------------------------------------------------------------
export function MigratedTitle({ pageName }) {
  return (
    <>
      <title>{pageName} — MyApp</title>
      <h1>{pageName}</h1>
    </>
  );
}

// -----------------------------------------------------------------------------
// Q14: robots noindex page
//
// Task:
// <meta name="robots" content="noindex, nofollow" /> staging/admin pages.
//
// In simple words:
// Declare from component tree — in admin route component.
// React 18 helmet equivalent.
// SSR important — client-only late inject weaker for crawlers.
// Don't noindex production by mistake — env guard.
// -----------------------------------------------------------------------------
export function StagingPage() {
  return (
    <>
      <meta name="robots" content="noindex, nofollow" />
      <title>Staging — internal</title>
      <p>Not for Google</p>
    </>
  );
}

// -----------------------------------------------------------------------------
// Q15: [MID] Next.js generateMetadata vs React 19 <title>
//
// Task:
// In Next App Router generateMetadata/export metadata is often preferred.
//
// In simple words:
// React 19 <title> in client components works; Next adds static optimization.
// React 18 Next: Head from next/head Pages router.
// Answer interview by environment: "Next metadata API vs raw React 19 tags".
// Both aim for the same goal — correct head per route.
// -----------------------------------------------------------------------------
const nextVsReact19Meta = {
  nextAppRouter: "export metadata / generateMetadata primary",
  rawReact19: "<title>/<meta> in component tree",
};

// -----------------------------------------------------------------------------
// Q16: favicon link rel="icon"
//
// Task:
// <link rel="icon" href="/favicon.ico" /> — page or root once.
//
// In simple words:
// Usually index.html once — avoid duplicate on every page.
// Per-section favicon rare — dynamic route possible teaching only.
// React 18 public folder static same.
// Duplicate link icons — browser picks one unpredictably.
// -----------------------------------------------------------------------------
export function FaviconNote() {
  return (
    <>
      <link rel="icon" href="/favicon.ico" />
      <p>Set favicon once at app shell when possible</p>
    </>
  );
}

// -----------------------------------------------------------------------------
// Q17: [MID] Client navigation title delay
//
// Task:
// SPA client route change — title updates on render, fast usually.
//
// In simple words:
// Slow route lazy load — title updates when page component mounts.
// React 18 same with effect title.
// Suspense fallback route — title from fallback or previous until resolve.
// UX: meaningful fallback title during load optional.
// -----------------------------------------------------------------------------
export function LazyRouteTitleNote() {
  return <p>Title updates when route component renders — after lazy chunk loads.</p>;
}

// -----------------------------------------------------------------------------
// Q18: Structured data JSON-LD — still script tag
//
// Task:
// SEO rich results: <script type="application/ld+json"> often in page still.
//
// In simple words:
// React 19 metadata tags cover title/meta/link — JSON-LD separate concern.
// React 18 same — helmet or manual script.
// dangerouslySetInnerHTML careful — sanitize static JSON only.
// RSC: colocate JSON-LD server component near data.
// -----------------------------------------------------------------------------
export function ArticleJsonLd({ article }) {
  const json = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
  });
  return (
    <>
      <title>{article.title}</title>
      <script type="application/ld+json">{json}</script>
      <article>{article.title}</article>
    </>
  );
}

// -----------------------------------------------------------------------------
// Q19: [ADV] When NOT declarative metadata in React
//
// Task:
// Fully static site — build-time HTML head enough; no runtime React title needed.
//
// In simple words:
// Marketing one-pager SSR pre-rendered — meta in template.
// React 19 win = dynamic per-user/per-route titles in SPA/SSR apps.
// CMS-driven head — framework layer may centralize better than scattered tags.
// Over-tagging every child component — anti-pattern.
// -----------------------------------------------------------------------------
const whenNotTreeMetadata = [
  "static prebuilt HTML sufficient",
  "framework central metadata API preferred",
  "deep child components tagging randomly",
];

// -----------------------------------------------------------------------------
// Q20: [MID] Hydration + title mismatch
//
// Task:
// Server render title "A"; client first render title "B" — mismatch warning possible.
//
// In simple words:
// Initial client render match server HTML head expectations.
// React 18 hydration mismatch similar with effect-set title timing.
// User-specific title: fetch on server or after mount consistently.
// Date in title — server/client TZ difference trap.
// -----------------------------------------------------------------------------
export function HydrationTitleSafe({ userName }) {
  return (
    <>
      <title>{userName ? `${userName} — MyApp` : "MyApp"}</title>
      <h1>Hello {userName ?? "guest"}</h1>
    </>
  );
}

// -----------------------------------------------------------------------------
// Q21: [ADV] Priority / precedence mental model
//
// Task:
// Deeper / later mounted title may override — exact rules implementation-dependent.
//
// In simple words:
// Do not rely on "child always wins" — explicit architecture.
// React 18 helmet prioritizeRegisteredMeta similar battles.
// Single RouteHead component pattern team-wide.
// Testing: assert document.title in E2E after navigation.
// -----------------------------------------------------------------------------
export function SingleOwnerPattern({ title, children }) {
  return (
    <>
      <title>{title}</title>
      {children}
    </>
  );
}

// -----------------------------------------------------------------------------
// Q22: [ADV] Interview — metadata React 18 vs 19
//
// Task:
// 18: useEffect + react-helmet; 19: <title>/<meta> in JSX tree hoist to head.
//
// In simple words:
// Benefits: declarative, SSR friendly, less effect soup.
// Traps: duplicate tags, wrong owner, client-only SEO limits.
// Frameworks layer on top (Next metadata).
// a11y unique titles per view still matter.
// link canonical absolute URLs; OG images absolute.
// -----------------------------------------------------------------------------
export const metadataInterviewSummary = {
  react18: "useEffect document.title / react-helmet",
  react19: "declarative title/meta/link in component tree",
  traps: ["duplicate title/meta", "multiple owners", "client-only crawlers", "TZ mismatch in dynamic titles"],
  practices: ["one head owner per route", "absolute OG URLs", "meaningful unique titles"],
};
