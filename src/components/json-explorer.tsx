import { useState, useMemo } from "react";
import { Braces, ChevronRight, ChevronDown, Download } from "lucide-react";
import { cn } from "@/lib/utils";

interface JsonExplorerProps {
  data: unknown;
  /** Chaves já renderizadas em outro lugar — serão omitidas. */
  omitKeys?: string[];
  /** Título do bloco. */
  title?: string;
  /** Profundidade inicial expandida. */
  defaultDepth?: number;
}

interface JsonDocumentPanelProps {
  data: unknown;
  fileName: string;
  documentLabel: string;
}

function normalizeJsonFileName(fileName: string) {
  const safeName = fileName
    .trim()
    .replace(/[<>:"/\\|?*]/g, "-")
    .replace(/\s+/g, "-");
  const fallback = safeName || "documento";
  return fallback.toLowerCase().endsWith(".json") ? fallback : `${fallback}.json`;
}

function downloadJsonDocument(data: unknown, fileName: string) {
  const contents = JSON.stringify(data ?? null, null, 2);
  const blob = new Blob([contents], { type: "application/json;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = normalizeJsonFileName(fileName);
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}

export function JsonDocumentPanel({ data, fileName, documentLabel }: JsonDocumentPanelProps) {
  return (
    <div className="panel overflow-hidden">
      <div className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-primary/15 bg-primary/[0.055] text-primary">
            <Braces className="h-4 w-4" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <div className="text-[12.5px] font-semibold text-foreground">
              Dados técnicos do MOTOR OLÉ
            </div>
            <div className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground">
              JSON integral recebido da seguradora para este {documentLabel}.
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => downloadJsonDocument(data, fileName)}
          className="inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-lg border border-primary/20 bg-primary/[0.065] px-3.5 text-[11.5px] font-semibold text-primary transition hover:border-primary/35 hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
          aria-label={`Baixar JSON completo deste ${documentLabel}`}
        >
          <Download className="h-3.5 w-3.5" aria-hidden="true" />
          Baixar JSON completo
        </button>
      </div>
      <details className="group border-t border-border">
        <summary className="cursor-pointer list-none px-5 py-3.5 text-[11.5px] font-medium text-muted-foreground transition hover:bg-surface-2/45 hover:text-foreground">
          Visualizar estrutura do JSON
        </summary>
        <div className="border-t border-border p-4 sm:p-5">
          <JsonExplorer data={data} title={`${documentLabel} (raw)`} defaultDepth={1} />
        </div>
      </details>
    </div>
  );
}

export function JsonExplorer({ data, omitKeys = [], title, defaultDepth = 1 }: JsonExplorerProps) {
  const filtered = useMemo(() => {
    if (!data || typeof data !== "object" || Array.isArray(data)) return data;
    const obj = data as Record<string, unknown>;
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(obj)) {
      if (omitKeys.includes(k)) continue;
      if (v === null || v === undefined || v === "") continue;
      out[k] = v;
    }
    return out;
  }, [data, omitKeys]);

  const isEmpty =
    !filtered ||
    (typeof filtered === "object" && !Array.isArray(filtered) && Object.keys(filtered).length === 0);

  if (isEmpty) return null;

  return (
    <div className="panel">
      {title && (
        <div className="px-4 py-2.5 border-b border-border/60 flex items-center justify-between">
          <div className="text-[12px] font-semibold tracking-tight">{title}</div>
          <span className="text-[10px] font-mono text-muted-foreground uppercase">
            campos adicionais
          </span>
        </div>
      )}
      <div className="p-3 font-mono text-[12px]">
        <Node value={filtered} depth={0} defaultDepth={defaultDepth} />
      </div>
    </div>
  );
}

function Node({
  value,
  label,
  depth,
  defaultDepth,
}: {
  value: unknown;
  label?: string;
  depth: number;
  defaultDepth: number;
}) {
  const [open, setOpen] = useState(depth < defaultDepth);

  if (value === null || value === undefined) {
    return <Leaf label={label} text="—" muted />;
  }

  if (Array.isArray(value)) {
    if (value.length === 0) return <Leaf label={label} text="[]" muted />;
    return (
      <Collapsible
        label={label}
        summary={`[${value.length} itens]`}
        open={open}
        onToggle={() => setOpen(!open)}
      >
        {value.map((v, i) => (
          <Node key={i} label={`[${i}]`} value={v} depth={depth + 1} defaultDepth={defaultDepth} />
        ))}
      </Collapsible>
    );
  }

  if (typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>).filter(
      ([, v]) => v !== null && v !== undefined && v !== "",
    );
    if (entries.length === 0) return <Leaf label={label} text="{}" muted />;
    return (
      <Collapsible
        label={label}
        summary={`{${entries.length} campos}`}
        open={open}
        onToggle={() => setOpen(!open)}
      >
        {entries.map(([k, v]) => (
          <Node key={k} label={k} value={v} depth={depth + 1} defaultDepth={defaultDepth} />
        ))}
      </Collapsible>
    );
  }

  return <Leaf label={label} text={String(value)} />;
}

function Leaf({ label, text, muted }: { label?: string; text: string; muted?: boolean }) {
  return (
    <div className="flex items-baseline gap-2 py-0.5 pl-5">
      {label && <span className="text-muted-foreground shrink-0">{label}:</span>}
      <span className={cn("break-all", muted ? "text-muted-foreground/60" : "text-foreground")}>
        {text}
      </span>
    </div>
  );
}

function Collapsible({
  label,
  summary,
  open,
  onToggle,
  children,
}: {
  label?: string;
  summary: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="py-0.5">
      <button
        onClick={onToggle}
        className="flex items-center gap-1 text-left hover:text-foreground transition w-full"
      >
        {open ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
        {label && <span className="text-muted-foreground">{label}:</span>}
        <span className="text-muted-foreground/70">{summary}</span>
      </button>
      {open && <div className="ml-3 border-l border-border/40 pl-2">{children}</div>}
    </div>
  );
}
