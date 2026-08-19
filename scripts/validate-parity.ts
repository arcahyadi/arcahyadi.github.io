#!/usr/bin/env tsx
// Structural EN/ID parity checks. Translation quality still requires human review.
import { blogs } from "../src/content/blogs";
import { portfolio } from "../src/content/portfolio";
import {
  blogsIdBySlug,
  portfolioIdBySlug,
  type LocalizedContent,
} from "../src/i18n/content.id";

type Fence = { readonly lang: string; readonly body: string };

function fences(value: string): Fence[] {
  return [...value.matchAll(/```([^\n]*)\n([\s\S]*?)```/g)].map((match) => ({
    lang: match[1].trim(),
    body: match[2],
  }));
}

function withoutFences(value: string): string {
  return value.replace(/```[^\n]*\n[\s\S]*?```/g, "\n\n<FENCE>\n\n");
}

function blockSignature(value: string): string[] {
  return withoutFences(value)
    .trim()
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      const lines = block.split("\n").map((line) => line.trim()).filter(Boolean);
      if (block === "<FENCE>") return "FENCE";
      const heading = /^(#{1,6})\s/.exec(lines[0]);
      if (heading) return `H${heading[1].length}`;
      if (lines.every((line) => /^[-*_]{3,}$/.test(line))) return "HR";
      if (lines.every((line) => /^[-*+]\s/.test(line))) return `UL:${lines.length}`;
      if (lines.every((line) => /^\d+\.\s/.test(line))) return `OL:${lines.length}`;
      const unorderedItems = lines.filter((line) => /^[-*+]\s/.test(line)).length;
      if (unorderedItems > 0 && unorderedItems === lines.length - 1) return `P+UL:${unorderedItems}`;
      const orderedItems = lines.filter((line) => /^\d+\.\s/.test(line)).length;
      if (orderedItems > 0 && orderedItems === lines.length - 1) return `P+OL:${orderedItems}`;
      if (lines.length >= 2 && lines.every((line) => line.startsWith("|"))) {
        const columns = lines[0].split("|").filter((cell) => cell.trim()).length;
        return `TABLE:${lines.length}:${columns}`;
      }
      if (lines.every((line) => line.startsWith(">"))) return `QUOTE:${lines.length}`;
      if (lines.every((line) => /^<[^>]+>/.test(line))) return `HTML:${lines.length}`;
      return "P";
    });
}

function blocks(value: string): string[] {
  return withoutFences(value)
    .trim()
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean);
}

function urls(value: string): string[] {
  return [...value.matchAll(/https?:\/\/[^\s)"\]]+/g)].map((match) => match[0]).sort();
}

function inlineCode(value: string): string[] {
  return [...withoutFences(value).matchAll(/`([^`\n]+)`/g)].map((match) => match[1]).sort();
}

function numericFacts(value: string): string[] {
  const prose = withoutFences(value)
    .replace(/https?:\/\/[^\s)"\]]+/g, " ")
    .replace(/`[^`\n]+`/g, " ");
  return [...prose.matchAll(/\d+(?:[.:/-]\d+)*(?:\+|%|[A-Za-z]+)?/g)]
    .map((match) => match[0])
    .sort();
}

function firstDifference(left: string, right: string): number {
  let index = 0;
  while (index < Math.min(left.length, right.length) && left[index] === right[index]) index++;
  return index;
}

function sameMultiset(
  label: string,
  kind: string,
  left: readonly string[],
  right: readonly string[],
): void {
  if (JSON.stringify(left) !== JSON.stringify(right)) {
    fail(`${label} ${kind} differ\n  EN=${JSON.stringify(left)}\n  ID=${JSON.stringify(right)}`);
  }
}

let failures = 0;

function fail(message: string): void {
  console.error(`FAIL: ${message}`);
  failures++;
}

function validateEntry(label: string, en: LocalizedContent, id: LocalizedContent): void {
  const localizedEntries: readonly (readonly [string, LocalizedContent])[] = [
    ["EN", en],
    ["ID", id],
  ];
  for (const [locale, entry] of localizedEntries) {
    if (!entry.title.trim()) fail(`${label} ${locale} title is empty`);
    if (!entry.excerpt.trim()) fail(`${label} ${locale} excerpt is empty`);
    if (!entry.content.trim()) fail(`${label} ${locale} content is empty`);
  }

  const enFences = fences(en.content);
  const idFences = fences(id.content);
  if (enFences.length !== idFences.length) {
    fail(`${label} fence count EN=${enFences.length} ID=${idFences.length}`);
  }
  for (let index = 0; index < Math.max(enFences.length, idFences.length); index++) {
    const enFence = enFences[index];
    const idFence = idFences[index];
    if (!enFence || !idFence) continue;
    if (enFence.lang !== idFence.lang) {
      fail(`${label} fence ${index + 1} language EN=${enFence.lang} ID=${idFence.lang}`);
    }
    if (enFence.body !== idFence.body) {
      const difference = firstDifference(enFence.body, idFence.body);
      fail(
        `${label} fence ${index + 1} body differs at character ${difference}` +
          `\n  EN=${JSON.stringify(enFence.body.slice(difference, difference + 80))}` +
          `\n  ID=${JSON.stringify(idFence.body.slice(difference, difference + 80))}`,
      );
    }
  }

  const enSignature = blockSignature(en.content);
  const idSignature = blockSignature(id.content);
  if (JSON.stringify(enSignature) !== JSON.stringify(idSignature)) {
    fail(
      `${label} block structure differs` +
        `\n  EN=${JSON.stringify(enSignature)}` +
        `\n  ID=${JSON.stringify(idSignature)}`,
    );
  } else {
    const enBlocks = blocks(en.content);
    const idBlocks = blocks(id.content);
    for (let index = 0; index < enBlocks.length; index++) {
      const kind = enSignature[index];
      if (["FENCE", "HR"].includes(kind) || /^H[1-6]$/.test(kind) || kind.startsWith("TABLE")) continue;
      const enLength = enBlocks[index].replace(/\s/g, "").length;
      const idLength = idBlocks[index].replace(/\s/g, "").length;
      if (enLength >= 120 && idLength / enLength < 0.52) {
        fail(
          `${label} block ${index + 1} is suspiciously short ` +
            `(type=${kind}, EN=${enLength}, ID=${idLength}, ratio=${(idLength / enLength).toFixed(2)})`,
        );
      }
    }
  }

  sameMultiset(label, "URL multiset", urls(en.content), urls(id.content));
  sameMultiset(label, "inline-code multiset", inlineCode(en.content), inlineCode(id.content));
  sameMultiset(label, "numeric-fact multiset", numericFacts(en.content), numericFacts(id.content));
}

console.log("=== EN/ID content parity validation ===");
console.log(`Blogs: EN=${blogs.length}, ID=${Object.keys(blogsIdBySlug).length}`);
console.log(`Portfolio: EN=${portfolio.length}, ID=${Object.keys(portfolioIdBySlug).length}`);

if (blogs.length !== Object.keys(blogsIdBySlug).length) {
  fail(`blog entry count differs EN=${blogs.length} ID=${Object.keys(blogsIdBySlug).length}`);
}
if (portfolio.length !== Object.keys(portfolioIdBySlug).length) {
  fail(`portfolio entry count differs EN=${portfolio.length} ID=${Object.keys(portfolioIdBySlug).length}`);
}

for (const blog of blogs) {
  const id = blogsIdBySlug[blog.slug];
  validateEntry(`blog ${blog.slug}`, blog, id);
}

for (const item of portfolio) {
  const id = portfolioIdBySlug[item.slug];
  validateEntry(`portfolio ${item.slug}`, item, id);
}

const missingBlogs = blogs.map((blog) => blog.slug).filter((slug) => !(slug in blogsIdBySlug));
const missingPortfolio = portfolio.map((item) => item.slug).filter((slug) => !(slug in portfolioIdBySlug));
if (missingBlogs.length) fail(`missing blog translations: ${missingBlogs.join(", ")}`);
if (missingPortfolio.length) fail(`missing portfolio translations: ${missingPortfolio.join(", ")}`);

if (failures > 0) {
  console.error(`\n${failures} parity failure(s)`);
  process.exit(1);
}

console.log(
  `PASS: ${blogs.length} blogs and ${portfolio.length} portfolio entries verified ` +
    "(slug coverage, non-empty fields, block structure, all fences, URL/inline-code/numeric multisets, length guard).",
);
console.log("NOTE: semantic faithfulness is reviewed manually; deterministic checks cannot prove translation quality.");
