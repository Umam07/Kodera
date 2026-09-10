"use client";

import React from "react";
import Editor, { OnMount } from "@monaco-editor/react";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  height?: string | number;
  readOnly?: boolean;
}

export function CodeEditor({
  value,
  onChange,
  language = "java",
  height = "260px",
  readOnly = false,
}: CodeEditorProps) {
  const handleEditorMount: OnMount = (editor, monaco) => {
    // Define Kodera Notebook light theme matching aesthetic
    monaco.editor.defineTheme("kodera-light", {
      base: "vs",
      inherit: true,
      rules: [
        { token: "comment", foreground: "7a8a6e", fontStyle: "italic" },
        { token: "keyword", foreground: "cb5521", fontStyle: "bold" },
        { token: "string", foreground: "1a3300" },
        { token: "number", foreground: "a855f7" },
        { token: "type", foreground: "0284c7", fontStyle: "bold" },
        { token: "identifier", foreground: "1a3300" },
      ],
      colors: {
        "editor.background": "#ffffff",
        "editor.foreground": "#1a3300",
        "editorLineNumber.foreground": "#b6b6b6",
        "editorLineNumber.activeForeground": "#1a3300",
        "editorCursor.foreground": "#1a3300",
        "editor.lineHighlightBackground": "#fcfaf5",
        "editor.selectionBackground": "#ffe95c60",
      },
    });

    monaco.editor.setTheme("kodera-light");
  };

  return (
    <div className="w-full overflow-hidden bg-white">
      <Editor
        height={height}
        language={language}
        value={value}
        onChange={(val) => onChange(val || "")}
        onMount={handleEditorMount}
        theme="vs"
        loading={
          <div className="h-[260px] flex items-center justify-center font-mono text-xs text-[#1a3300]/60 bg-white">
            <span>Memuat Monaco Java Editor...</span>
          </div>
        }
        options={{
          readOnly,
          minimap: { enabled: false },
          fontSize: 13,
          fontFamily: "var(--font-roboto-mono), ui-monospace, Menlo, monospace",
          lineNumbers: "on",
          lineNumbersMinChars: 3,
          glyphMargin: false,
          folding: false,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 4,
          insertSpaces: true,
          wordWrap: "on",
          padding: { top: 12, bottom: 12 },
          renderLineHighlight: "line",
          scrollbar: {
            verticalScrollbarSize: 6,
            horizontalScrollbarSize: 6,
          },
        }}
      />
    </div>
  );
}
