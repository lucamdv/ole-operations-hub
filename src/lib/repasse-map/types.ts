export type RepasseCellValue = string | number | null;

export interface RepasseCell {
  value: RepasseCellValue;
  /** Fórmulas conhecidas do modelo. Uma edição manual substitui a fórmula. */
  formula?: string;
}

export type RepasseSheetId = "summary" | "analytic" | "rules";

export interface RepasseSheet {
  id: RepasseSheetId;
  name: string;
  rows: RepasseCell[][];
  columnWidths: number[];
}

export interface RepasseWorkbook {
  period: {
    start: string;
    end: string;
  };
  generatedAt: string;
  sourceRows: number;
  sheets: RepasseSheet[];
}

export interface RepasseGenerationStats {
  billingReceived: number;
  settledActiveInPeriod: number;
  documentsConsulted: number;
  rowsGenerated: number;
  ignoredOutsidePeriod: number;
  ignoredInactiveOrUnsettled: number;
}

export interface RepasseGenerationResult {
  workbook: RepasseWorkbook;
  stats: RepasseGenerationStats;
  warnings: string[];
}

export interface RepasseXlsxExport {
  filename: string;
  mimeType: string;
  base64: string;
}
