import { memo, useEffect, useMemo, useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { coerceRepasseEditedCell, formatRepasseCell } from "@/lib/repasse-map/core";
import type {
  RepasseCell,
  RepasseCellValue,
  RepasseSheet,
  RepasseSheetId,
} from "@/lib/repasse-map/types";
import { cn } from "@/lib/utils";

interface SpreadsheetGridProps {
  sheets: RepasseSheet[];
  activeSheetId: RepasseSheetId;
  onActiveSheetChange: (sheetId: RepasseSheetId) => void;
  onCellChange: (
    sheetId: RepasseSheetId,
    rowIndex: number,
    columnIndex: number,
    value: RepasseCellValue,
  ) => void;
  selectedCell: { rowIndex: number; columnIndex: number } | null;
  onSelectCell: (rowIndex: number, columnIndex: number) => void;
}

function columnName(index: number) {
  let output = "";
  for (let value = index + 1; value > 0; value = Math.floor((value - 1) / 26)) {
    output = String.fromCharCode(65 + ((value - 1) % 26)) + output;
  }
  return output;
}

interface SpreadsheetRowProps {
  sheet: RepasseSheet;
  row: RepasseCell[];
  rowIndex: number;
  template: string;
  onCellChange: SpreadsheetGridProps["onCellChange"];
  selectedCell: SpreadsheetGridProps["selectedCell"];
  onSelectCell: SpreadsheetGridProps["onSelectCell"];
}

const SpreadsheetRow = memo(function SpreadsheetRow({
  sheet,
  row,
  rowIndex,
  template,
  onCellChange,
  selectedCell,
  onSelectCell,
}: SpreadsheetRowProps) {
  const isHeader =
    ((sheet.id === "analytic" || sheet.id === "brokerAnalytic") &&
      (rowIndex === 0 || rowIndex === 1)) ||
    (sheet.id === "rules" && rowIndex === 0);
  return (
    <div className="grid min-w-max" style={{ gridTemplateColumns: `42px ${template}` }}>
      <button
        type="button"
        onClick={() => onSelectCell(rowIndex, selectedCell?.columnIndex ?? 1)}
        className="sticky left-0 z-20 flex h-8 items-center justify-center border-b border-r border-slate-300 bg-slate-100 font-mono text-[10px] text-slate-500 hover:bg-primary/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400"
      >
        {rowIndex + 1}
      </button>
      {row.map((item, columnIndex) => (
        <div
          key={columnIndex}
          className={cn(
            "h-8 border-b border-r border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-950",
            isHeader && "bg-[#1f4e78] dark:bg-[#17365d]",
          )}
        >
          <input
            key={`${sheet.id}-${rowIndex}-${columnIndex}-${String(item.value)}`}
            defaultValue={formatRepasseCell(sheet, rowIndex, columnIndex)}
            aria-label={`${sheet.name}, célula ${columnName(columnIndex)}${rowIndex + 1}`}
            onFocus={() => onSelectCell(rowIndex, columnIndex)}
            title={item.formula ? `Fórmula: =${item.formula}` : undefined}
            onBlur={(event) => {
              if (event.currentTarget.value === formatRepasseCell(sheet, rowIndex, columnIndex))
                return;
              const next = coerceRepasseEditedCell(
                sheet,
                rowIndex,
                columnIndex,
                event.currentTarget.value,
              );
              if (next !== item.value) onCellChange(sheet.id, rowIndex, columnIndex, next);
            }}
            className={cn(
              "h-full w-full bg-transparent px-2 font-mono text-[11px] text-slate-800 outline-none transition focus:bg-blue-50 focus:ring-2 focus:ring-inset focus:ring-blue-500 dark:text-slate-100 dark:focus:bg-blue-950/50",
              selectedCell?.rowIndex === rowIndex &&
                selectedCell.columnIndex === columnIndex &&
                "bg-primary/5 ring-2 ring-inset ring-primary",
              isHeader && "font-sans font-semibold text-white",
              item.formula && !isHeader && "text-blue-700 dark:text-blue-300",
            )}
          />
        </div>
      ))}
    </div>
  );
});

export function SpreadsheetGrid({
  sheets,
  activeSheetId,
  onActiveSheetChange,
  onCellChange,
  selectedCell,
  onSelectCell,
}: SpreadsheetGridProps) {
  const sheet = sheets.find((item) => item.id === activeSheetId) ?? sheets[0]!;
  const template = useMemo(
    () => sheet.columnWidths.map((width) => `${Math.max(76, width * 7)}px`).join(" "),
    [sheet.columnWidths],
  );
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const virtualize = sheet.rows.length > 80;
  const rowVirtualizer = useVirtualizer({
    count: virtualize ? sheet.rows.length : 0,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => 32,
    overscan: 8,
  });

  useEffect(() => {
    if (!selectedCell || !scrollRef.current) return;
    const container = scrollRef.current;
    if (virtualize) rowVirtualizer.scrollToIndex(selectedCell.rowIndex, { align: "auto" });
    const widths = sheet.columnWidths.map((width) => Math.max(76, width * 7));
    const left =
      42 + widths.slice(0, selectedCell.columnIndex).reduce((sum, width) => sum + width, 0);
    const right = left + (widths[selectedCell.columnIndex] ?? 0);
    if (left < container.scrollLeft) container.scrollLeft = left;
    else if (right > container.scrollLeft + container.clientWidth) {
      container.scrollLeft = right - container.clientWidth;
    }
  }, [selectedCell, sheet.columnWidths, virtualize, rowVirtualizer]);

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
      <div className="flex flex-col gap-3 border-b border-border bg-surface-2/60 px-3 py-3 md:flex-row md:items-center md:justify-between">
        <Tabs
          value={sheet.id}
          onValueChange={(value) => onActiveSheetChange(value as RepasseSheetId)}
        >
          <TabsList className="h-auto max-w-full justify-start gap-1 overflow-x-auto bg-transparent p-0">
            {sheets.map((item) => (
              <TabsTrigger
                key={item.id}
                value={item.id}
                className="border border-transparent px-3 py-1.5 text-[11px] data-[state=active]:border-border"
              >
                {item.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <div className="flex items-center gap-2 text-[10.5px] text-muted-foreground">
          <span className="h-2 w-2 rounded-sm bg-blue-600" />
          Células azuis contêm fórmulas do modelo
        </div>
      </div>

      <div
        ref={scrollRef}
        className="max-h-[65dvh] overflow-auto overscroll-contain"
        style={{ contain: "paint" }}
      >
        <div
          className="sticky top-0 z-30 grid min-w-max"
          style={{ gridTemplateColumns: `42px ${template}` }}
        >
          <div className="sticky left-0 z-40 h-7 border-b border-r border-slate-300 bg-slate-200 dark:border-slate-700 dark:bg-slate-800" />
          {sheet.columnWidths.map((_, index) => (
            <button
              type="button"
              key={index}
              onClick={() =>
                onSelectCell(
                  selectedCell?.rowIndex ??
                    (sheet.id === "summary" ? 6 : sheet.id === "rules" ? 1 : 2),
                  index,
                )
              }
              className="flex h-7 items-center justify-center border-b border-r border-slate-300 bg-slate-100 font-mono text-[10px] font-semibold text-slate-600 hover:bg-primary/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
            >
              {columnName(index)}
            </button>
          ))}
        </div>
        {virtualize ? (
          <div className="relative min-w-max" style={{ height: rowVirtualizer.getTotalSize() }}>
            {rowVirtualizer.getVirtualItems().map((virtualRow) => (
              <div
                key={virtualRow.key}
                className="absolute left-0 top-0 min-w-max"
                style={{ transform: `translateY(${virtualRow.start}px)` }}
              >
                <SpreadsheetRow
                  sheet={sheet}
                  row={sheet.rows[virtualRow.index]!}
                  rowIndex={virtualRow.index}
                  template={template}
                  onCellChange={onCellChange}
                  selectedCell={selectedCell}
                  onSelectCell={onSelectCell}
                />
              </div>
            ))}
          </div>
        ) : (
          sheet.rows.map((row, rowIndex) => (
            <SpreadsheetRow
              key={rowIndex}
              sheet={sheet}
              row={row}
              rowIndex={rowIndex}
              template={template}
              onCellChange={onCellChange}
              selectedCell={selectedCell}
              onSelectCell={onSelectCell}
            />
          ))
        )}
      </div>
    </div>
  );
}
