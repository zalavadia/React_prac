#!/usr/bin/env node
/**
 * Rebuild docs/topics-data.js from ALL teaching files (01–47).
 * Usage: node docs/generate-topics-data.js
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const OUT = path.join(__dirname, "topics-data.js");

const SECTIONS = [
  {
    level: "BASE",
    files: [
      ["01_WhatIsReactAndJSX.jsx", "01 — What Is React And JSX"],
      ["02_FunctionalComponents.jsx", "02 — Functional Components"],
      ["03_Props.jsx", "03 — Props"],
      ["04_UseState.jsx", "04 — useState"],
      ["05_EventsHandling.jsx", "05 — Events Handling"],
      ["06_ConditionalRendering.jsx", "06 — Conditional Rendering"],
      ["07_ListsAndKeys.jsx", "07 — Lists And Keys"],
      ["08_FormsControlled.jsx", "08 — Forms Controlled"],
      ["09_UseEffect.jsx", "09 — useEffect"],
      ["10_UseRef.jsx", "10 — useRef"],
    ],
  },
  {
    level: "MID",
    files: [
      ["11_UseContext.jsx", "11 — useContext"],
      ["12_UseReducer.jsx", "12 — useReducer"],
      ["13_CustomHooks.jsx", "13 — Custom Hooks"],
      ["14_LiftingStateUp.jsx", "14 — Lifting State Up"],
      ["15_ChildrenComposition.jsx", "15 — Children Composition"],
      ["16_UseMemoUseCallback.jsx", "16 — useMemo / useCallback"],
      ["17_ReactMemo.jsx", "17 — React.memo"],
      ["18_UseLayoutEffect.jsx", "18 — useLayoutEffect"],
      ["19_Portals.jsx", "19 — Portals"],
      ["20_ErrorBoundaries.jsx", "20 — Error Boundaries"],
      ["21_SuspenseAndLazy.jsx", "21 — Suspense And Lazy"],
      ["22_RoutingBasics.jsx", "22 — Routing Basics"],
      ["23_DataFetchingPatterns.jsx", "23 — Data Fetching Patterns"],
      ["24_ReRenderPerformance.jsx", "24 — Re-render Performance"],
      ["25_ControlledVsUncontrolled.jsx", "25 — Controlled vs Uncontrolled"],
      ["26_ReconciliationAndKeys.jsx", "26 — Reconciliation And Keys"],
      ["27_StrictModeAndEffects.jsx", "27 — Strict Mode And Effects"],
    ],
  },
  {
    level: "REACT19",
    files: [
      ["28_React19_Overview.jsx", "28 — React 19 Overview"],
      ["29_React19_FormActions.jsx", "29 — Form Actions"],
      ["30_React19_useActionState.jsx", "30 — useActionState"],
      ["31_React19_useFormStatus.jsx", "31 — useFormStatus"],
      ["32_React19_useOptimistic.jsx", "32 — useOptimistic"],
      ["33_React19_useHook.jsx", "33 — use() Hook"],
      ["34_React19_RefAsProp.jsx", "34 — Ref As Prop"],
      ["35_React19_DocumentMetadata.jsx", "35 — Document Metadata"],
      ["36_React19_ContextAsProvider.jsx", "36 — Context As Provider"],
      ["37_ServerComponentsIntro.jsx", "37 — Server Components Intro"],
      ["38_ServerActions.jsx", "38 — Server Actions"],
      ["39_ReactCompilerAndEffectEvent.jsx", "39 — Compiler And useEffectEvent"],
    ],
  },
  {
    level: "INTERVIEW",
    files: [
      ["40_MidLevelInterviewQuestions.jsx", "40 — Mid-Level Interview Questions"],
    ],
  },
  {
    level: "ADVANCED",
    files: [
      ["41_ClassComponents.jsx", "41 — Class Components (Legacy)"],
      ["42_TypeScriptAndReact.tsx", "42 — TypeScript + React"],
      ["43_AccessibilityA11y.jsx", "43 — Accessibility (a11y)"],
      ["44_AdvancedRouting.jsx", "44 — Advanced Routing"],
      ["45_ConcurrentTransitions.jsx", "45 — Concurrent / Transitions"],
      ["46_AuthAndFormsLibs.jsx", "46 — Auth + React Hook Form + Zod"],
      ["47_Zustand.jsx", "47 — Zustand"],
    ],
  },
];

function stripCommentLine(line) {
  if (line.startsWith("// ")) return line.slice(3);
  if (line === "//") return "";
  if (line.startsWith("//")) return line.slice(2);
  return line;
}

function extractHeaderMeta(src) {
  const lines = src.split("\n").slice(0, 22);
  const body = [];
  for (const line of lines) {
    if (line.startsWith("// ===")) continue;
    if (line.startsWith("//")) body.push(stripCommentLine(line));
    else if (line.trim() === "") continue;
    else break;
  }
  const text = body.join("\n").trim();
  const kya = (body.find((l) => l.startsWith("LAYMAN:")) || body[0] || "")
    .replace(/^LAYMAN:\s*/, "")
    .slice(0, 140);
  return { intro: text, detail: text, kya };
}

function parseQuestions(src) {
  const lines = src.split("\n");
  const sep = /^\/\/ -{10,}\s*$/;
  const qLine = /^\/\/ (Q\d+:.*)$/;
  const questions = [];
  let i = 0;

  while (i < lines.length) {
    if (!sep.test(lines[i])) {
      i++;
      continue;
    }
    let j = i + 1;
    while (j < lines.length && lines[j].trim() === "") j++;
    if (j >= lines.length || !qLine.test(lines[j])) {
      i++;
      continue;
    }

    const title = lines[j].replace(/^\/\/ /, "").trim();
    j++;
    const commentLines = [];
    while (j < lines.length && !sep.test(lines[j])) {
      if (lines[j].startsWith("//")) commentLines.push(stripCommentLine(lines[j]));
      else if (lines[j].trim() !== "") break;
      j++;
    }
    if (j < lines.length && sep.test(lines[j])) j++;

    const codeLines = [];
    while (j < lines.length) {
      if (sep.test(lines[j])) {
        let k = j + 1;
        while (k < lines.length && lines[k].trim() === "") k++;
        if (k < lines.length && qLine.test(lines[k])) break;
        codeLines.push(lines[j]);
        j++;
        continue;
      }
      if (lines[j].startsWith("export {") || lines[j].startsWith("// ===")) break;
      // keep export function/const as part of solution when inline
      codeLines.push(lines[j]);
      j++;
    }

    while (codeLines.length && codeLines[codeLines.length - 1].trim() === "") {
      codeLines.pop();
    }
    // trim trailing bare export { block if we somehow got it
    let code = codeLines.join("\n").replace(/\nexport\s*\{[\s\S]*$/m, "").trim();

    questions.push({
      title,
      explain: commentLines.join("\n").trim(),
      code: "",
    });
    questions.push({
      title: "Example / Solution",
      explain: code
        ? "Working solution — padho; Vite project me try karo."
        : "Conceptual — teaching file me comments dekho.",
      code: code || "// see teaching file comments",
    });

    i = j;
  }
  return questions;
}

function buildItem(file, title) {
  const full = path.join(ROOT, file);
  if (!fs.existsSync(full)) {
    throw new Error("Missing file: " + file);
  }
  const src = fs.readFileSync(full, "utf8");
  const header = extractHeaderMeta(src);
  const questions = parseQuestions(src);
  return {
    file,
    title,
    kya: header.kya,
    detail: header.detail,
    intro: header.intro,
    questions,
  };
}

function main() {
  const topics = [];
  let totalQ = 0;

  for (const section of SECTIONS) {
    const items = [];
    for (const [file, title] of section.files) {
      const item = buildItem(file, title);
      const qCount = item.questions.filter((q) => /^Q\d+:/.test(q.title)).length;
      totalQ += qCount;
      console.log(section.level, file, "→", qCount, "Qs");
      if (qCount < 20) console.warn("  WARN: <20 questions");
      items.push(item);
    }
    topics.push({ level: section.level, items });
  }

  fs.writeFileSync(OUT, "const TOPICS = " + JSON.stringify(topics, null, 2) + ";\n");
  console.log("\nWrote", OUT);
  console.log("Total questions:", totalQ);
  console.log(
    "Sections:",
    topics.map((t) => t.level + ":" + t.items.length).join(", ")
  );
}

main();
