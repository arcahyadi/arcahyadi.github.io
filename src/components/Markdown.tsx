// Markdown — minimal renderer for blog/portfolio content (no extra deps)
// Supports: headings, paragraphs, bold, inline code, links, lists, tables, code fences, hr, blockquote, raw HTML (mermaid)

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function inlineToHtml(s: string): string {
  let out = escapeHtml(s);
  // inline code `...`
  out = out.replace(/`([^`]+?)`/g, '<code class="px-1 py-0.5 bg-[var(--color-background-weak)] border border-[var(--color-border-weak)] rounded text-[12px] font-mono break-words">$1</code>');
  // bold **...**
  out = out.replace(/\*\*([^*]+?)\*\*/g, '<strong class="font-semibold text-[var(--color-text-strong)]">$1</strong>');
  // links [label](url) — handle before image
  out = out.replace(/\[([^\]]+?)\]\(([^)]+?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="underline decoration-[var(--color-border-weak)] hover:text-[var(--color-text-strong)]">$1</a>');
  // autolink bare urls (optional)
  return out;
}

export function Markdown({ content }: { content: string }) {
  const lines = content.split("\n");
  const nodes: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  const push = (el: React.ReactNode) => {
    nodes.push(<span key={key++} className="contents">{el}</span>);
  };

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed === "") {
      i++;
      continue;
    }

    // code fence
    if (trimmed.startsWith("```")) {
      const lang = trimmed.slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      const code = codeLines.join("\n");
      push(
        <pre className="my-4 overflow-x-auto rounded border border-[var(--color-border-weak)] bg-[var(--color-background-weak)] p-4 text-[12px] leading-relaxed">
          <code className="font-mono whitespace-pre text-[var(--color-text-strong)]">{code}</code>
          {lang ? <span className="mt-2 block text-[10px] font-mono text-[var(--color-text-weak)]">{lang}</span> : null}
        </pre>
      );
      continue;
    }

    // raw HTML block (mermaid / div)
    if (trimmed.startsWith("<div") || trimmed.startsWith("</div") || trimmed.startsWith("<table") || trimmed.startsWith("<p") || trimmed.startsWith("<span")) {
      const htmlLines: string[] = [];
      // collect consecutive html-ish lines (including mermaid content line like "graph LR")
      // Heuristic: if we start with <div, consume until we have balanced </div> or empty line boundary
      let openDivs = 0;
      let started = false;
      while (i < lines.length) {
        const l = lines[i];
        const t = l.trim();
        if (t === "" && started && openDivs === 0) break;
        if (t.startsWith("<div")) {
          openDivs += (t.match(/<div/g) || []).length;
          started = true;
        }
        if (t.startsWith("</div")) {
          openDivs -= (t.match(/<\/div/g) || []).length;
        }
        // mermaid inner lines like "graph LR" are not html but part of mermaid block — keep them until closing div
        htmlLines.push(l);
        i++;
        if (started && openDivs <= 0 && t.includes("</div>")) break;
        // safety: if we started html and next line is markdown heading, stop
        if (started && openDivs === 0 && htmlLines.length > 2) {
          // peek next line — if it's markdown, break
          const next = lines[i]?.trim() ?? "";
          if (next.startsWith("#") || next.startsWith("```") || next.startsWith("| ") || next.startsWith("- ")) break;
        }
        // avoid infinite
        if (htmlLines.length > 40) break;
      }
      const html = htmlLines.join("\n");
      // if it contains mermaid, render as styled pre instead of raw (mermaid needs JS)
      if (html.includes('class="mermaid"') || html.includes("class='mermaid'")) {
        const mermaidContent = html.replace(/<[^>]+>/g, "").trim();
        push(
          <div key={key++} className="my-4 rounded border border-[var(--color-border-weak)] bg-[var(--color-background-weak)] p-4 overflow-x-auto">
            <p className="text-[10px] font-mono tracking-widest uppercase text-[var(--color-text-weak)] mb-2">diagram · mermaid</p>
            <pre className="text-[12px] font-mono leading-relaxed text-[var(--color-text-strong)] whitespace-pre">{mermaidContent}</pre>
          </div>
        );
      } else {
        push(<div key={key++} dangerouslySetInnerHTML={{ __html: html }} className="my-4" />);
      }
      continue;
    }

    // hr
    if (trimmed === "---" || trimmed === "***" || trimmed === "___") {
      push(<hr key={key++} className="my-6 border-[var(--color-border-weak)]" />);
      i++;
      continue;
    }

    // heading
    if (trimmed.startsWith("#")) {
      const m = trimmed.match(/^(#{1,6})\s+(.*)$/);
      if (m) {
        const level = m[1].length;
        const text = m[2];
        const html = inlineToHtml(text);
        const cls = "font-bold text-[var(--color-text-strong)] tracking-tight";
        if (level === 1) push(<h1 dangerouslySetInnerHTML={{ __html: html }} className={`${cls} text-[22px] mt-8 mb-3`} />);
        else if (level === 2) push(<h2 dangerouslySetInnerHTML={{ __html: html }} className={`${cls} text-[18px] mt-8 mb-3`} />);
        else if (level === 3) push(<h3 dangerouslySetInnerHTML={{ __html: html }} className={`${cls} text-[15px] mt-6 mb-2`} />);
        else push(<h4 dangerouslySetInnerHTML={{ __html: html }} className={`${cls} text-[14px] mt-6 mb-2`} />);
        i++;
        continue;
      }
    }

    // blockquote
    if (trimmed.startsWith(">")) {
      const bqLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        bqLines.push(lines[i].replace(/^\s*>\s?/, ""));
        i++;
      }
      const text = bqLines.join(" ");
      push(<blockquote key={key++} dangerouslySetInnerHTML={{ __html: inlineToHtml(text) }} className="my-4 border-l-2 border-[var(--color-border-weak)] pl-4 italic text-[var(--color-text)]" />);
      continue;
    }

    // table — detect header row with | and separator row with ---
    if (trimmed.startsWith("|") && i + 1 < lines.length && lines[i + 1].includes("---")) {
      const headerCells = trimmed.split("|").map((c) => c.trim()).filter(Boolean);
      i += 2; // skip header + separator
      const rows: string[][] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        const cells = lines[i].split("|").map((c) => c.trim()).filter(Boolean);
        rows.push(cells);
        i++;
      }
      push(
        <div key={key++} className="my-4 overflow-x-auto rounded border border-[var(--color-border-weak)]">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-[var(--color-background-weak)] text-left">
              <tr>
                {headerCells.map((c, idx) => (
                  <th key={idx} dangerouslySetInnerHTML={{ __html: inlineToHtml(c) }} className="px-3 py-2 font-semibold text-[var(--color-text-strong)] border-b border-[var(--color-border-weak)] whitespace-nowrap" />
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, ri) => (
                <tr key={ri} className="border-b border-[var(--color-border-weak)] last:border-0">
                  {r.map((c, ci) => (
                    <td key={ci} dangerouslySetInnerHTML={{ __html: inlineToHtml(c) }} className="px-3 py-2 text-[var(--color-text)] align-top" />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    // unordered list
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ") || /^\d+\.\s/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length) {
        const t = lines[i].trim();
        if (t.startsWith("- ") || t.startsWith("* ")) {
          items.push(t.slice(2));
          i++;
        } else if (/^\d+\.\s/.test(t)) {
          items.push(t.replace(/^\d+\.\s/, ""));
          i++;
        } else if (t === "") {
          i++;
          break;
        } else {
          // continuation line (wrapped)
          if (items.length > 0) items[items.length - 1] += " " + t;
          i++;
        }
        // peek next — if not list item, break
        const nxt = lines[i]?.trim() ?? "";
        if (nxt !== "" && !nxt.startsWith("- ") && !nxt.startsWith("* ") && !/^\d+\.\s/.test(nxt) && !nxt.startsWith("|")) {
          // if next is not list, but we are in list block, allow one empty? already handled
          if (nxt.startsWith("#") || nxt.startsWith("```") || nxt.startsWith(">")) break;
          // if next is plain paragraph, break list
          if (nxt !== "" && !nxt.startsWith("-") && !nxt.startsWith("*")) {
            // check if it's continuation — if indented, keep
            if (!lines[i].startsWith("  ")) break;
          }
        }
      }
      const ordered = /^\d+\.\s/.test(trimmed);
      if (ordered) {
        push(
          <ol key={key++} className="my-4 list-decimal pl-6 space-y-1 text-sm leading-relaxed text-[var(--color-text)]">
            {items.map((it, idx) => (
              <li key={idx} dangerouslySetInnerHTML={{ __html: inlineToHtml(it) }} />
            ))}
          </ol>
        );
      } else {
        push(
          <ul key={key++} className="my-4 list-disc pl-6 space-y-1 text-sm leading-relaxed text-[var(--color-text)]">
            {items.map((it, idx) => (
              <li key={idx} dangerouslySetInnerHTML={{ __html: inlineToHtml(it) }} />
            ))}
          </ul>
        );
      }
      continue;
    }

    // paragraph — collect consecutive non-empty non-special lines
    {
      const paraLines: string[] = [];
      while (i < lines.length) {
        const t = lines[i].trim();
        if (t === "") break;
        if (t.startsWith("#") || t.startsWith("```") || t.startsWith("|") || t.startsWith("- ") || t.startsWith("* ") || /^\d+\.\s/.test(t) || t.startsWith(">") || t === "---" || t.startsWith("<div")) break;
        paraLines.push(lines[i]);
        i++;
      }
      const text = paraLines.join(" ").trim();
      if (text) {
        push(<p key={key++} dangerouslySetInnerHTML={{ __html: inlineToHtml(text) }} className="my-3 text-[14px] leading-relaxed text-[var(--color-text)]" />);
      }
      continue;
    }
  }

  return <div className="markdown-content">{nodes}</div>;
}
