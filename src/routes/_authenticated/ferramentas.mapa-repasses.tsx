import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMemo, useState } from "react";
import {
  CalendarRange,
  Download,
  FileSpreadsheet,
  LoaderCircle,
  Plus,
  RefreshCcw,
  ShieldCheck,
  TableProperties,
  Trash2,
  TriangleAlert,
} from "lucide-react";
import { toast } from "sonner";
import { SpreadsheetGrid } from "@/components/repasse-map/spreadsheet-grid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { downloadBase64File, exportRepasseSheetCsv } from "@/lib/repasse-map/export-csv";
import {
  editRepasseStructure,
  repasseDocumentCount,
  summaryPreview,
  updateRepasseCell,
  type RepasseStructureAction,
} from "@/lib/repasse-map/core";
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

function columnName(index: number) {
  let name = "";
  for (let value = index + 1; value > 0; value = Math.floor((value - 1) / 26)) {
    name = String.fromCharCode(65 + ((value - 1) % 26)) + name;
  }
  return name;
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
  const [selection, setSelection] = useState<{
    sheetId: RepasseSheetId;
    rowIndex: number;
    columnIndex: number;
  } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const preview = result ? summaryPreview(result.workbook) : null;
  const activeSheet = result?.workbook.sheets.find((sheet) => sheet.id === activeSheetId);
  const selectedCell = selection?.sheetId === activeSheetId ? selection : null;
  const selectedDocument =
    activeSheetId === "analytic" || activeSheetId === "brokerAnalytic"
      ? String(activeSheet?.rows[selectedCell?.rowIndex ?? -1]?.[1]?.value ?? "").trim()
      : "";
  const baseRows = activeSheetId === "summary" ? 37 : activeSheetId === "rules" ? 10 : 2;
  const baseColumns = activeSheetId === "summary" ? 8 : activeSheetId === "rules" ? 4 : 16;
  const hasFreeCell =
    activeSheet?.rows[selectedCell?.rowIndex ?? -1]?.some(
      (item, index) => index >= baseColumns && item.value === null,
    ) ?? false;
  const selectedAddress = selectedCell
    ? `${columnName(selectedCell.columnIndex)}${selectedCell.rowIndex + 1}`
    : "nenhuma";

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
      setSelection(null);
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

  function handleStructureAction(action: RepasseStructureAction) {
    if (!result || !activeSheet || !selectedCell) return;
    const next = editRepasseStructure(
      result.workbook,
      activeSheetId,
      action,
      selectedCell.rowIndex,
      selectedCell.columnIndex,
    );
    if (next === result.workbook) {
      toast.error("Área protegida", {
        description: "Selecione uma linha de dados ou uma coluna/célula adicionada ao modelo.",
      });
      return;
    }
    setResult({ ...result, workbook: next });
    const nextSheet = next.sheets.find((item) => item.id === activeSheetId)!;
    const rowIndex =
      action === "addRow"
        ? activeSheetId === "analytic" || activeSheetId === "brokerAnalytic"
          ? Math.max(2, selectedCell.rowIndex + 1)
          : nextSheet.rows.length - 1
        : Math.min(selectedCell.rowIndex, nextSheet.rows.length - 1);
    const freeCell =
      activeSheet.rows[selectedCell.rowIndex]?.findIndex(
        (item, index) => index >= baseColumns && item.value === null,
      ) ?? -1;
    const columnIndex =
      action === "addCell" && freeCell >= 0
        ? freeCell
        : action === "addColumn" || action === "addCell"
          ? nextSheet.columnWidths.length - 1
          : Math.min(selectedCell.columnIndex, nextSheet.columnWidths.length - 1);
    setSelection({ sheetId: activeSheetId, rowIndex, columnIndex });
    toast.success(
      action === "removeDocument"
        ? "Documento removido do mapa"
        : action === "addCell"
          ? "Célula pronta para edição"
          : "Planilha atualizada",
    );
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
        description: "As quatro abas e suas edições foram incluídas.",
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
            <Metric
              label="Parcelas no mapa"
              value={String(repasseDocumentCount(result.workbook))}
            />
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
                onClick={() => {
                  if (!baseline) return;
                  setResult((current) =>
                    current ? { ...current, workbook: structuredClone(baseline) } : current,
                  );
                  setSelection(null);
                }}
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
            onActiveSheetChange={(id) => {
              setActiveSheetId(id);
              setSelection(null);
            }}
            onCellChange={handleCellChange}
            selectedCell={selectedCell}
            onSelectCell={(rowIndex, columnIndex) =>
              setSelection({ sheetId: activeSheetId, rowIndex, columnIndex })
            }
          />

          <section className="panel overflow-hidden p-0" aria-label="Ajustes da planilha">
            <div className="border-b border-border bg-surface-2/60 px-5 py-4">
              <h2 className="text-[14px] font-semibold">Ajustar {activeSheet?.name}</h2>
              <p className="mt-1 text-[11.5px] text-muted-foreground">
                Selecione uma célula na planilha acima. Local atual:{" "}
                <strong>{selectedAddress}</strong>. As alterações aparecem na prévia e nos arquivos
                exportados.
              </p>
            </div>
            <div className="grid gap-4 p-5 lg:grid-cols-2">
              <div className="space-y-3">
                <h3 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Adicionar
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={
                      !selectedCell ||
                      ((activeSheet?.columnWidths.length ?? 0) >= 32 && !hasFreeCell)
                    }
                    onClick={() => handleStructureAction("addCell")}
                  >
                    <Plus /> Célula vazia
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={!selectedCell}
                    onClick={() => handleStructureAction("addRow")}
                  >
                    <Plus /> Linha{" "}
                    {activeSheetId === "analytic" || activeSheetId === "brokerAnalytic"
                      ? "abaixo"
                      : "ao final"}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={!selectedCell || (activeSheet?.columnWidths.length ?? 0) >= 32}
                    onClick={() => handleStructureAction("addColumn")}
                  >
                    <Plus /> Coluna ao final
                  </Button>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Novas células e colunas são livres; as colunas originais mantêm os cálculos e
                  identificadores no lugar.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Remover
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={
                      !selectedCell ||
                      (selectedCell.columnIndex < baseColumns &&
                        selectedCell.rowIndex < baseRows) ||
                      ((activeSheetId === "analytic" || activeSheetId === "brokerAnalytic") &&
                        selectedCell.rowIndex >= 2 &&
                        selectedCell.columnIndex === 1)
                    }
                    onClick={() => handleStructureAction("removeCell")}
                  >
                    <Trash2 /> Célula
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={!selectedCell || selectedCell.rowIndex < baseRows}
                    onClick={() => handleStructureAction("removeRow")}
                  >
                    <Trash2 /> Linha
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={!selectedCell || selectedCell.columnIndex < baseColumns}
                    onClick={() => handleStructureAction("removeColumn")}
                  >
                    <Trash2 /> Coluna
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    disabled={!selectedDocument}
                    onClick={() => handleStructureAction("removeDocument")}
                  >
                    <Trash2 /> Documento{" "}
                    {selectedDocument ? `${selectedDocument.slice(0, 12)}…` : "selecionado"}
                  </Button>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Remover documento exclui todas as suas parcelas das duas abas analíticas. Use
                  “Descartar edições” para restaurar o mapa gerado.
                </p>
              </div>
            </div>
          </section>
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
