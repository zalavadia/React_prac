#!/usr/bin/env node
/**
 * Parses teaching JSX/TSX (Q comment block + solution after closing ---)
 * and merges ADVANCED section into topics-data.js
 *
 * Usage: node docs/generate-advanced-topics.js
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const TOPICS_PATH = path.join(__dirname, "topics-data.js");

const ADVANCED_FILES = [
  { file: "41_ClassComponents.jsx", title: "41 — Class Components (Legacy)" },
  { file: "42_TypeScriptAndReact.tsx", title: "42 — TypeScript + React" },
  { file: "43_AccessibilityA11y.jsx", title: "43 — Accessibility (a11y)" },
  { file: "44_AdvancedRouting.jsx", title: "44 — Advanced Routing" },
  { file: "45_ConcurrentTransitions.jsx", title: "45 — Concurrent / Transitions" },
  { file: "46_AuthAndFormsLibs.jsx", title: "46 — Auth + React Hook Form + Zod" },
  { file: "47_Zustand.jsx", title: "47 — Zustand" },
];

function stripCommentLine(line) {
  if (line.startsWith("// ")) return line.slice(3);
  if (line === "//") return "";
  if (line.startsWith("//")) return line.slice(2);
  return line;
}

function extractHeaderMeta(src) {
  const lines = src.split("\n").slice(0, 20);
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

/**
 * Format in curriculum files:
 *   // -------------
 *   // Qn: title
 *   // comments...
 *   // -------------
 *   <solution code>
 *   // -------------
 *   // Qn+1: ...
 */
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
    // Peek next non-empty after separator
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
    // expect closing separator
    if (j < lines.length && sep.test(lines[j])) j++;

    const codeLines = [];
    while (j < lines.length) {
      if (sep.test(lines[j])) {
        // look ahead: if next Q, stop; else include? stop before next Q block
        let k = j + 1;
        while (k < lines.length && lines[k].trim() === "") k++;
        if (k < lines.length && qLine.test(lines[k])) break;
        // separator not for next Q — rare; include and continue
        codeLines.push(lines[j]);
        j++;
        continue;
      }
      if (lines[j].startsWith("export {") || lines[j].startsWith("export default")) break;
      if (lines[j].startsWith("// ===")) break;
      codeLines.push(lines[j]);
      j++;
    }

    while (codeLines.length && codeLines[codeLines.length - 1].trim() === "") {
      codeLines.pop();
    }
    const code = codeLines.join("\n").trim();
    const explain = commentLines.join("\n").trim();

    questions.push({ title, explain, code: "" });
    questions.push({
      title: "Example / Solution",
      explain: code
        ? "Working solution — read it, then try it in a Vite project."
        : "Conceptual — see the comments in the teaching file.",
      code: code || "// see teaching file comments",
    });

    i = j;
  }
  return questions;
}

function buildItem(meta) {
  const src = fs.readFileSync(path.join(ROOT, meta.file), "utf8");
  const header = extractHeaderMeta(src);
  const questions = parseQuestions(src);
  return {
    file: meta.file,
    title: meta.title,
    kya: header.kya,
    detail: header.detail,
    intro: header.intro,
    questions,
  };
}

function main() {
  const items = ADVANCED_FILES.map(buildItem);
  for (const item of items) {
    const qCount = item.questions.filter((q) => /^Q\d+:/.test(q.title)).length;
    console.log(item.file, "→", qCount, "Qs");
    if (qCount < 15) {
      console.warn("  WARN: expected ~20+ questions");
    }
  }

  let existing = fs.readFileSync(TOPICS_PATH, "utf8");
  const fn = new Function(existing + "\n; return TOPICS;");
  const topics = fn().filter((t) => t.level !== "ADVANCED");
  topics.push({ level: "ADVANCED", items });

  fs.writeFileSync(
    TOPICS_PATH,
    "const TOPICS = " + JSON.stringify(topics, null, 2) + ";\n"
  );
  console.log(
    "Wrote topics-data.js —",
    topics.map((t) => t.level + ":" + t.items.length).join(", ")
  );
}

main();
