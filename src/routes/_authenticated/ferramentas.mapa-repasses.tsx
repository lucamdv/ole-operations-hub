import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMemo, useState } from "react";
import {
  CalendarRange,
  Download,
  FileSpreadsheet,
  LoaderCircle,
  RefreshCcw,
  ShieldCheck,
  TableProperties,
  TriangleAlert,
} from "lucide-react";
import { toast } from "sonner";
import { SpreadsheetGrid } from "@/components/repasse-map/spreadsheet-grid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { downloadBase64File, exportRepasseSheetCsv } from "@/lib/repasse-map/export-csv";
import { summaryPreview, updateRepasseCell } from "@/lib/repasse-map/core";
import { exportRepasseMapXlsx, generateRepasseMap } from "@/lib/repasse-map.functions";
import type {
  RepasseCellValue,
  RepasseGenerationResult,
  RepasseSheetId,
  RepasseWorkbook,
} from "@/lib/repasse-map/types";

export const Route = createFileRoute("/_authenticated/ferramentas/mapa-repasses")({
  head: () => ({
    meta: [
      { title: "Gerador de Mapas de Repasse · OLÉ COPILOT" },
      {
        name: "description",
        content: "Gere mapas de repasse por data de quitação das parcelas da Excelsior.",
      },
    ],
  }),
  component: RepasseMapPage,
});

function previousMonthPeriod() {
  const today = new Date();
  const first = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const last = new Date(today.getFullYear(), today.getMonth(), 0);
  const localIso = (date: Date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  return { start: localIso(first), end: localIso(last) };
}

function money(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);
}

function RepasseMapPage() {
  const initialPeriod = useMemo(previousMonthPeriod, []);
  const generateFn = useServerFn(generateRepasseMap);
  const exportFn = useServerFn(exportRepasseMapXlsx);
  const [start, setStart] = useState(initialPeriod.start);
  const [end, setEnd] = useState(initialPeriod.end);
  const [result, setResult] = useState<RepasseGenerationResult | null>(null);
  const [baseline, setBaseline] = useState<RepasseWorkbook | null>(null);
  const [activeSheetId, setActiveSheetId] = useState<RepasseSheetId>("summary");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const preview = result ? summaryPreview(result.workbook) : null;
  const activeSheet = result?.workbook.sheets.find((sheet) => sheet.id === activeSheetId);

  async function handleGenerate() {
    if (!start || !end || start > end) {
      toast.error("Período inválido", { description: "Confira as datas inicial e final." });
      return;
    }
    setIsGenerating(true);
    try {
      const next = await generateFn({ data: { start, end } });
      setResult(next);
      setBaseline(structuredClone(next.workbook));
      setActiveSheetId("summary");
      toast.success("Mapa gerado", {
        description: `${next.stats.rowsGenerated} parcela(s) quitada(s) no período.`,
      });
    } catch (error) {
      toast.error("Não foi possível gerar o mapa", {
        description: error instanceof Error ? error.message : String(error),
        duration: 20_000,
      });
    } finally {
      setIsGenerating(false);
    }
  }

  function handleCellChange(
    sheetId: RepasseSheetId,
    rowIndex: number,
    columnIndex: number,
    value: RepasseCellValue,
  ) {
    setResult((current) =>
      current
        ? {
            ...current,
            workbook: updateRepasseCell(current.workbook, sheetId, rowIndex, columnIndex, value),
          }
        : current,
    );
  }

  async function handleXlsxExport() {
    if (!result) return;
    setIsExporting(true);
    try {
      const file = await exportFn({ data: { workbook: result.workbook } });
      downloadBase64File(file.base64, file.mimeType, file.filename);
      toast.success("XLSX exportado", {
        description: "As três abas e suas edições foram incluídas.",
      });
    } catch (error) {
      toast.error("Falha ao exportar XLSX", {
        description: error instanceof Error ? error.message : String(error),
      });
    } finally {
      setIsExporting(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-primary">
              Ferramentas
            </span>
            <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
            <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
              Financeiro
            </span>
          </div>
          <h1 className="page-title flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5 text-primary" />
            Gerador de Mapas de Repasse
          </h1>
          <p className="mt-1 max-w-3xl text-[12.5px] leading-relaxed text-muted-foreground">
            Consulta cobranças por data de quitação, reconcilia o resultado com o banco, cruza a
            data de emissão e monta o arquivo no padrão contratual da Olé.
          </p>
        </div>

        <div className="flex flex-wrap items-end gap-2 rounded-xl border border-border bg-surface p-3 shadow-sm">
          <label className="space-y-1 text-[10.5px] font-medium text-muted-foreground">
            Início
            <Input
              type="date"
              value={start}
              max={end || undefined}
              onChange={(event) => setStart(event.target.value)}
              className="h-9 w-[150px] text-[12px]"
            />
          </label>
          <label className="space-y-1 text-[10.5px] font-medium text-muted-foreground">
            Fim
            <Input
              type="date"
              value={end}
              min={start || undefined}
              onChange={(event) => setEnd(event.target.value)}
              className="h-9 w-[150px] text-[12px]"
            />
          </label>
          <Button
            className="h-9 gap-2 text-[12px]"
            disabled={isGenerating}
            onClick={handleGenerate}
          >
            {isGenerating ? <LoaderCircle className="animate-spin" /> : <TableProperties />}
            {isGenerating ? "Gerando…" : "Gerar mapa"}
          </Button>
        </div>
      </div>

      {!result ? (
        <div className="panel relative overflow-hidden px-6 py-16 text-center">
          <div className="absolute inset-x-1/3 top-0 h-28 bg-primary/10 blur-3xl" />
          <CalendarRange className="relative mx-auto h-9 w-9 text-primary" />
          <h2 className="relative mt-4 text-[16px] font-semibold">Defina a competência do mapa</h2>
          <p className="relative mx-auto mt-1 max-w-lg text-[12.5px] leading-relaxed text-muted-foreground">
            O período considera a data de quitação de forma inclusiva. O banco recupera parcelas
            pagas no período mesmo quando o vencimento original ficou fora dele.
          </p>
        </div>
      ) : (
        <>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <Metric label="Linhas elegíveis" value={String(result.stats.rowsGenerated)} />
            <Metric
              label="Documentos consultados"
              value={String(result.stats.documentsConsulted)}
            />
            <Metric label="Prêmio total pago" value={money(preview?.premioTotalPago ?? 0)} />
            <Metric
              label="Total do repasse"
              value={money(preview?.excelsiorLiquido ?? 0)}
              emphasis
            />
          </div>

          <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface px-3 py-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-2 text-[11.5px] text-muted-foreground">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-success" />
              <span>
                Quitações totais por data_quitacao entre{" "}
                <strong>{result.workbook.period.start}</strong> e{" "}
                <strong>{result.workbook.period.end}</strong>, reconciliadas com o Supabase. Edite
                qualquer célula abaixo antes de exportar.
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="ghost"
                size="sm"
                disabled={!baseline}
                onClick={() =>
                  baseline &&
                  setResult((current) =>
                    current ? { ...current, workbook: structuredClone(baseline) } : current,
                  )
                }
              >
                <RefreshCcw /> Descartar edições
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={!activeSheet}
                onClick={() =>
                  activeSheet && exportRepasseSheetCsv(activeSheet, result.workbook.period)
                }
              >
                <Download /> CSV da aba
              </Button>
              <Button size="sm" disabled={isExporting} onClick={handleXlsxExport}>
                {isExporting ? <LoaderCircle className="animate-spin" /> : <FileSpreadsheet />}
                {isExporting ? "Preparando…" : "Exportar XLSX"}
              </Button>
            </div>
          </div>

          {result.warnings.length > 0 ? (
            <div className="flex items-start gap-2 rounded-xl border border-warning/30 bg-warning/10 p-3 text-[11.5px] text-muted-foreground">
              <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
              <span>
                {result.warnings.length} documento(s) ficaram sem data de emissão. Os demais dados
                foram mantidos e podem ser corrigidos manualmente na grade.
              </span>
            </div>
          ) : null}

          <SpreadsheetGrid
            sheets={result.workbook.sheets}
            activeSheetId={activeSheetId}
            onActiveSheetChange={setActiveSheetId}
            onCellChange={handleCellChange}
          />
        </>
      )}
    </div>
  );
}

function Metric({
  label,
  value,
  emphasis = false,
}: {
  label: string;
  value: string;
  emphasis?: boolean;
}) {
  return (
    <div className="panel p-4">
      <div className="text-[10.5px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div
        className={
          emphasis
            ? "mt-1 text-[20px] font-semibold text-primary"
            : "mt-1 text-[20px] font-semibold"
        }
      >
        {value}
      </div>
    </div>
  );
}
