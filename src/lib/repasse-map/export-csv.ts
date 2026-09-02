import type { RepasseCellValue, RepasseSheet } from "./types";

function csvValue(value: RepasseCellValue) {
  if (value === null) return "";
  const text = typeof value === "number" ? String(value).replace(".", ",") : value;
  return `"${text.replace(/"/g, '""')}"`;
}

function safePart(value: string) {
  return value.replace(/[^a-zA-Z0-9À-ÿ._-]+/g, "-").replace(/-+/g, "-");
}

function filenameDate(value: string) {
  const [year, month, day] = value.split("-");
  return `${day}.${month}.${year.slice(-2)}`;
}

export function exportRepasseSheetCsv(sheet: RepasseSheet, period: { start: string; end: string }) {
  const content = sheet.rows
    .map((row) => row.map((item) => csvValue(item.value)).join(";"))
    .join("\r\n");
  const blob = new Blob(["\uFEFF", content], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `Mapa de Repasses - ${filenameDate(period.start)} a ${filenameDate(period.end)} - ${safePart(sheet.name)}.csv`;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function downloadBase64File(base64: string, mimeType: string, filename: string) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index++) bytes[index] = binary.charCodeAt(index);
  const url = URL.createObjectURL(new Blob([bytes], { type: mimeType }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}
