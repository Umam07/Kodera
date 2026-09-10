import React from "react";

/**
 * Parses inline formatting tokens:
 * - **bold** -> <strong>
 * - `code`   -> <code>
 * - *italic* -> <em>
 */
export function renderFormattedText(text: string): React.ReactNode {
  if (!text) return null;

  const regex = /(\*\*[\s\S]*?\*\*|`[^`]+`|\*[^*]+?\*)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const raw = match[0];
    const key = `${match.index}-${raw}`;

    if (raw.startsWith("**") && raw.endsWith("**") && raw.length >= 4) {
      parts.push(
        <strong key={key} className="font-bold text-[#1a3300]">
          {raw.slice(2, -2)}
        </strong>
      );
    } else if (raw.startsWith("`") && raw.endsWith("`") && raw.length >= 2) {
      parts.push(
        <code
          key={key}
          className="px-1.5 py-0.5 bg-white border border-[#b6b6b6] rounded-[4px] font-mono text-xs text-[#cb5521] font-semibold mx-0.5 select-text"
        >
          {raw.slice(1, -1)}
        </code>
      );
    } else if (raw.startsWith("*") && raw.endsWith("*") && raw.length >= 2) {
      parts.push(
        <em key={key} className="italic text-[#1a3300]">
          {raw.slice(1, -1)}
        </em>
      );
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

/**
 * Full Markdown Renderer for educational content:
 * - Markdown Tables with responsive horizontal scroll
 * - Structured Info Cards (#### Header + Bullets)
 * - Headings (###, ####)
 * - Callout Banners (> note)
 * - Ordered & Unordered lists
 */
export function MarkdownRenderer({ content }: { content: string }) {
  if (!content) return null;

  const rawBlocks = content.split(/\n\s*\n/);

  return (
    <div className="space-y-5 text-[#1a3300] text-sm sm:text-base leading-relaxed">
      {rawBlocks.map((rawBlock, blockIdx) => {
        const lines = rawBlock
          .split("\n")
          .map((l) => l.trimEnd())
          .filter(Boolean);
        if (lines.length === 0) return null;

        const firstLine = lines[0].trim();

        // 1. Markdown Table
        if (
          lines.length >= 2 &&
          lines[0].includes("|") &&
          /^\|?\s*:?-+:?\s*(\|?\s*:?-+:?\s*)+\|?$/.test(lines[1].trim())
        ) {
          const parseRow = (l: string) =>
            l
              .trim()
              .replace(/^\||\|$/g, "")
              .split("|")
              .map((c) => c.trim());

          const headers = parseRow(lines[0]);
          const rows = lines.slice(2).map(parseRow);

          return (
            <div
              key={blockIdx}
              className="overflow-x-auto my-6 border-2 border-[#1a3300] rounded-[10px] bg-white shadow-2xs"
            >
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-[#fcfaf5] border-b-2 border-[#1a3300] font-mono text-[#1a3300]">
                    {headers.map((h, hIdx) => (
                      <th
                        key={hIdx}
                        className="py-3 px-3.5 font-bold uppercase tracking-wider text-[11px] whitespace-nowrap"
                      >
                        {renderFormattedText(h)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f1f1f1]">
                  {rows.map((r, rIdx) => (
                    <tr
                      key={rIdx}
                      className="hover:bg-[#ffe95c]/10 transition-colors"
                    >
                      {r.map((cell, cIdx) => (
                        <td
                          key={cIdx}
                          className="py-2.5 px-3.5 leading-relaxed align-top"
                        >
                          {renderFormattedText(cell)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }

        // 2. Structured Card Block (#### Header + property bullet items)
        if (
          lines.length > 1 &&
          firstLine.startsWith("#### ") &&
          lines.slice(1).some((l) => /^\s*[-*]\s+/.test(l))
        ) {
          const cardTitle = firstLine.replace(/^####\s+/, "");
          const bulletLines = lines
            .slice(1)
            .filter((l) => /^\s*[-*]\s+/.test(l))
            .map((l) => l.replace(/^\s*[-*]\s+/, ""));

          return (
            <div
              key={blockIdx}
              className="bg-white border-2 border-[#1a3300] rounded-[12px] p-4 sm:p-5 my-4 shadow-2xs transition-all hover:border-[#1a3300]"
            >
              {/* Card Header Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#b6b6b6]/40 pb-3 mb-3.5">
                <div className="font-bricolage font-bold text-base sm:text-lg text-[#1a3300]">
                  {renderFormattedText(cardTitle)}
                </div>
              </div>

              {/* Card Body Elements */}
              <div className="space-y-2.5">
                {bulletLines.map((item, itemIdx) => {
                  const isUseCase =
                    item.includes("**Use Case Terbaik**:") ||
                    item.includes("**Use Case**:");
                  const isContoh =
                    item.includes("**Contoh**:") ||
                    item.includes("**Contoh Sintaks**: ");

                  if (isUseCase) {
                    return (
                      <div
                        key={itemIdx}
                        className="p-3 bg-[#d5f5c2]/40 border border-[#1a3300]/25 rounded-[6px] text-xs sm:text-sm text-[#1a3300] leading-relaxed"
                      >
                        <div className="font-bold text-xs uppercase tracking-wider text-[#1a3300] mb-1 flex items-center gap-1.5">
                          <span>🎯 Use Case Terbaik:</span>
                        </div>
                        <div className="text-[#1a3300]/90">
                          {renderFormattedText(
                            item.replace(/\*\*Use Case (Terbaik)?\*\*:\s*/, "")
                          )}
                        </div>
                      </div>
                    );
                  }

                  if (isContoh) {
                    return (
                      <div
                        key={itemIdx}
                        className="p-2.5 bg-[#fcfaf5] border border-[#b6b6b6] rounded-[6px] text-xs sm:text-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                      >
                        <span className="font-mono text-[11px] font-bold text-[#1a3300]/70 uppercase">
                          Contoh Kode:
                        </span>
                        <div className="font-mono font-semibold text-[#1a3300]">
                          {renderFormattedText(
                            item.replace(/\*\*Contoh( Sintaks)?\*\*:\s*/, "")
                          )}
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={itemIdx}
                      className="text-xs sm:text-sm text-[#1a3300]/90 flex items-start gap-2 pt-0.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1a3300] shrink-0 mt-2" />
                      <div className="leading-relaxed">
                        {renderFormattedText(item)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        }

        // 3. Heading 3: ### Heading
        if (firstLine.startsWith("### ")) {
          return (
            <h3
              key={blockIdx}
              className="font-bricolage text-xl sm:text-2xl font-bold text-[#1a3300] pt-5 pb-2 border-b border-[#1a3300]/20 mt-8 mb-4 tracking-tight"
            >
              {renderFormattedText(firstLine.slice(4))}
            </h3>
          );
        }

        // 4. Heading 4: #### Subheading (standalone)
        if (firstLine.startsWith("#### ")) {
          return (
            <h4
              key={blockIdx}
              className="font-inter text-base font-bold text-[#1a3300] pt-3 mt-4 mb-1"
            >
              {renderFormattedText(firstLine.slice(5))}
            </h4>
          );
        }

        // 5. Blockquote / Callout: > note
        if (firstLine.startsWith("> ")) {
          const calloutText = lines
            .map((l) => l.replace(/^>\s*/, ""))
            .join(" ");
          return (
            <div
              key={blockIdx}
              className="p-3.5 sm:p-4 bg-[#ffe95c]/25 border-l-4 border-[#1a3300] rounded-r-[8px] text-xs sm:text-sm text-[#1a3300] my-4 leading-relaxed"
            >
              {renderFormattedText(calloutText)}
            </div>
          );
        }

        const hasList = lines.some((line) => /^\s*([-*]|\d+\.)\s+/.test(line));

        if (!hasList) {
          return (
            <p key={blockIdx} className="text-[#1a3300]/90 leading-relaxed">
              {renderFormattedText(lines.join(" "))}
            </p>
          );
        }

        // Segment block into separate paragraphs and list items
        const segments: {
          type: "paragraph" | "list";
          isOrdered?: boolean;
          items?: string[];
          text?: string;
        }[] = [];
        let currentPara: string[] = [];
        let currentList: string[] = [];
        let currentIsOrdered = false;

        for (const line of lines) {
          const isUnordered = /^\s*[-*]\s+/.test(line);
          const isOrdered = /^\s*\d+\.\s+/.test(line);

          if (isUnordered || isOrdered) {
            if (currentPara.length > 0) {
              segments.push({ type: "paragraph", text: currentPara.join(" ") });
              currentPara = [];
            }
            currentIsOrdered = isOrdered;
            currentList.push(line.replace(/^\s*([-*]|\d+\.)\s+/, ""));
          } else {
            if (currentList.length > 0) {
              segments.push({
                type: "list",
                isOrdered: currentIsOrdered,
                items: currentList,
              });
              currentList = [];
            }
            currentPara.push(line);
          }
        }

        if (currentPara.length > 0) {
          segments.push({ type: "paragraph", text: currentPara.join(" ") });
        }
        if (currentList.length > 0) {
          segments.push({
            type: "list",
            isOrdered: currentIsOrdered,
            items: currentList,
          });
        }

        return (
          <div key={blockIdx} className="space-y-3">
            {segments.map((seg, segIdx) => {
              if (seg.type === "paragraph" && seg.text) {
                return (
                  <p
                    key={segIdx}
                    className="text-[#1a3300]/90 leading-relaxed font-medium"
                  >
                    {renderFormattedText(seg.text)}
                  </p>
                );
              }
              if (seg.type === "list" && seg.items) {
                return (
                  <ul key={segIdx} className="space-y-2.5 my-2.5 pl-1">
                    {seg.items.map((item, itemIdx) => (
                      <li
                        key={itemIdx}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-[#1a3300]/90"
                      >
                        {seg.isOrdered ? (
                          <span className="w-5 h-5 flex items-center justify-center bg-[#ffe95c] border border-[#1a3300] rounded-[4px] font-mono font-bold text-[11px] shrink-0 text-[#1a3300] mt-0.5">
                            {itemIdx + 1}
                          </span>
                        ) : (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#1a3300] shrink-0 mt-2" />
                        )}
                        <div className="leading-relaxed flex-1">
                          {renderFormattedText(item)}
                        </div>
                      </li>
                    ))}
                  </ul>
                );
              }
              return null;
            })}
          </div>
        );
      })}
    </div>
  );
}
