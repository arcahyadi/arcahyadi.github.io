#!/usr/bin/env tsx
// Deterministic parity validation: slug coverage, headings/blocks, URLs, fence count/lang, executable fence equality
import { blogs } from "../src/content/blogs";
import { portfolio } from "../src/content/portfolio";
import { blogsIdBySlug, portfolioIdBySlug } from "../src/i18n/content.id";

function fences(s: string) {
  return [...s.matchAll(/```(\w*)\n([\s\S]*?)```/g)].map((m) => ({ lang: m[1] || "", body: m[2] }));
}
function headings(s: string) {
  return [...s.matchAll(/^#{1,6}\s.+$/gm)].map((m) => m[0].trim());
}
function urls(s: string) {
  return [...new Set([...s.matchAll(/https?:\/\/[^\s\)"\]]+/g)].map((m) => m[0]))].sort();
}

let failures = 0;
function fail(msg: string) {
  console.error(`FAIL: ${msg}`);
  failures++;
}

console.log("=== Parity validation ===");
console.log(`EN blogs: ${blogs.length}, ID blogs: ${Object.keys(blogsIdBySlug).length}`);
console.log(`EN portfolio: ${portfolio.length}, ID portfolio: ${Object.keys(portfolioIdBySlug).length}`);

for (const b of blogs) {
  const id = (blogsIdBySlug as Record<string, { content: string }>)[b.slug];
  if (!id) {
    fail(`blog missing ID slug: ${b.slug}`);
    continue;
  }
  const enF = fences(b.content);
  const idF = fences(id.content);
  if (enF.length !== idF.length) fail(`blog ${b.slug} fence count EN=${enF.length} ID=${idF.length}`);
  for (let i = 0; i < Math.max(enF.length, idF.length); i++) {
    const e = enF[i], f = idF[i];
    if (!e || !f) {
      fail(`blog ${b.slug} fence ${i} missing`);
      continue;
    }
    if (e.lang !== f.lang) fail(`blog ${b.slug} fence ${i} lang EN=${e.lang} ID=${f.lang}`);
    // Executable fences must be byte-for-byte identical (commands/options would break if translated)
    const executableLangs = new Set(["bash", "routeros", "cron", "python"]);
    if (executableLangs.has(e.lang) || e.lang === "") {
      if (e.body !== f.body) {
        let di = 0;
        while (di < Math.min(e.body.length, f.body.length) && e.body[di] === f.body[di]) di++;
        fail(
          `blog ${b.slug} fence ${i} lang=${e.lang || "(none)"} body diff at ${di} EN=${JSON.stringify(e.body.slice(di, di + 60))} ID=${JSON.stringify(f.body.slice(di, di + 60))}`
        );
      }
    }
  }
  const enH = headings(b.content), idH = headings(id.content);
  if (enH.length !== idH.length) fail(`blog ${b.slug} heading count EN=${enH.length} ID=${idH.length}`);
  const enU = urls(b.content), idU = urls(id.content);
  if (JSON.stringify(enU) !== JSON.stringify(idU)) fail(`blog ${b.slug} URL set EN=${JSON.stringify(enU)} ID=${JSON.stringify(idU)}`);
}

for (const p of portfolio) {
  const id = (portfolioIdBySlug as Record<string, { content: string }>)[p.slug];
  if (!id) {
    fail(`portfolio missing ID slug: ${p.slug}`);
    continue;
  }
  const enF = fences(p.content), idF = fences(id.content);
  if (enF.length !== idF.length) fail(`portfolio ${p.slug} fence count EN=${enF.length} ID=${idF.length}`);
  for (let i = 0; i < Math.max(enF.length, idF.length); i++) {
    const e = enF[i], f = idF[i];
    if (!e || !f) continue;
    if (e.lang !== f.lang) fail(`portfolio ${p.slug} fence ${i} lang EN=${e.lang} ID=${f.lang}`);
    if (e.body !== f.body) fail(`portfolio ${p.slug} fence ${i} body diff`);
  }
  const enU = urls(p.content), idU = urls(id.content);
  if (JSON.stringify(enU) !== JSON.stringify(idU)) fail(`portfolio ${p.slug} URL set EN=${JSON.stringify(enU)} ID=${JSON.stringify(idU)}`);
}

// Strict slug coverage: every EN slug must have ID
const missingBlogs = blogs.map((b) => b.slug).filter((s) => !(s in blogsIdBySlug));
const missingPortfolio = portfolio.map((p) => p.slug).filter((s) => !(s in portfolioIdBySlug));
if (missingBlogs.length) fail(`missing blog translations: ${missingBlogs.join(", ")}`);
if (missingPortfolio.length) fail(`missing portfolio translations: ${missingPortfolio.join(", ")}`);

if (failures === 0) {
  console.log("PASS: all 9 blogs and 5 portfolio entries parity verified (fences, headings, URLs)");
  process.exit(0);
} else {
  console.error(`\n${failures} parity failure(s)`);
  process.exit(1);
}
