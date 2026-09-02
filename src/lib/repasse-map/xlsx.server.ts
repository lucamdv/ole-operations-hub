import ExcelJS from "exceljs";
import type { Alignment, Borders, Fill, Font, Worksheet } from "exceljs";
import type { RepasseCell, RepasseSheet, RepasseWorkbook } from "./types";

const BLUE = "1F4E78";
const BLUE_DARK = "17365D";
const BLUE_LIGHT = "D9EAF7";
const GRAY = "E7E6E6";
const GRAY_LIGHT = "F3F4F6";
const WHITE = "FFFFFF";
const BLACK = "1F2937";

const thinBorder: Partial<Borders> = {
  top: { style: "thin", color: { argb: "B7C3D0" } },
  left: { style: "thin", color: { argb: "B7C3D0" } },
  bottom: { style: "thin", color: { argb: "B7C3D0" } },
  right: { style: "thin", color: { argb: "B7C3D0" } },
};

const centered: Partial<Alignment> = {
  vertical: "middle",
  horizontal: "center",
  wrapText: true,
};

function solid(argb: string): Fill {
  return { type: "pattern", pattern: "solid", fgColor: { argb } };
}

function setCellValue(target: ExcelJS.Cell, source: RepasseCell) {
  if (source.formula) {
    target.value = { formula: source.formula, result: source.value ?? 0 };
  } else {
    target.value = source.value;
  }
}

function populateSheet(worksheet: Worksheet, sheet: RepasseSheet) {
  sheet.columnWidths.forEach((width, index) => {
    worksheet.getColumn(index + 1).width = width;
  });
  for (let rowIndex = 0; rowIndex < sheet.rows.length; rowIndex++) {
    const row = worksheet.getRow(rowIndex + 1);
    for (let columnIndex = 0; columnIndex < sheet.rows[rowIndex]!.length; columnIndex++) {
      setCellValue(row.getCell(columnIndex + 1), sheet.rows[rowIndex]![columnIndex]!);
    }
  }
}

function styleSummary(worksheet: Worksheet) {
  worksheet.getColumn(9).hidden = true;
  worksheet.getRow(1).height = 30;
  for (let row = 2; row <= 30; row++) worksheet.getRow(row).height = 13.2;
  worksheet.getRow(31).height = 26.4;

  for (let row = 1; row <= 37; row++) {
    for (let column = 2; column <= 5; column++) {
      const cell = worksheet.getCell(row, column);
      cell.font = { name: "Arial", size: 10, color: { argb: BLACK } };
      cell.alignment = { vertical: "middle" };
    }
  }

  const title = worksheet.getCell("B1");
  title.font = { name: "Arial", size: 18, bold: true, color: { argb: BLUE_DARK } };

  for (const row of [6, 11, 19, 25]) {
    for (let column = 2; column <= 5; column++) {
      const target = worksheet.getCell(row, column);
      target.fill = solid(BLUE);
      target.font = { name: "Arial", size: 10, bold: true, color: { argb: WHITE } };
    }
  }

  for (const row of [9, 17, 23, 29]) {
    for (let column = 2; column <= 3; column++) {
      const target = worksheet.getCell(row, column);
      target.fill = solid(BLUE_LIGHT);
      target.font = { name: "Arial", size: 10, bold: true, color: { argb: BLUE_DARK } };
      target.border = thinBorder;
    }
  }

  for (const row of [7, 8, 9, 12, 13, 14, 15, 16, 17, 20, 21, 22, 23, 26, 27, 28, 29]) {
    worksheet.getCell(row, 3).numFmt = "$#,##0.00;[Red]-$#,##0.00";
  }
  for (const address of ["D8", "D13", "D14", "D15", "D21", "D26", "D27", "D28"]) {
    worksheet.getCell(address).numFmt = "0.00%";
  }

  for (let column = 2; column <= 5; column++) {
    const target = worksheet.getCell(31, column);
    target.fill = solid(BLUE_DARK);
    target.font = { name: "Arial", size: 12, bold: true, color: { argb: WHITE } };
    target.alignment = { vertical: "middle" };
    target.border = thinBorder;
  }
  worksheet.getCell("C31").numFmt = "$#,##0.00;[Red]-$#,##0.00";

  for (const row of [34, 35, 36]) {
    worksheet.getCell(row, 2).font = { name: "Arial", size: 10, bold: true };
    worksheet.getCell(row, 3).fill = solid(GRAY_LIGHT);
    worksheet.getCell(row, 3).border = thinBorder;
  }

  worksheet.pageSetup = {
    orientation: "portrait",
    paperSize: 9,
    fitToPage: true,
    fitToWidth: 1,
    fitToHeight: 1,
    margins: { left: 0.25, right: 0.25, top: 0.4, bottom: 0.4, header: 0.2, footer: 0.2 },
  };
}

function isoDate(value: unknown) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const parsed = new Date(`${value}T12:00:00.000Z`);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function styleAnalytic(worksheet: Worksheet, rowCount: number) {
  worksheet.mergeCells("B1:M1");
  worksheet.getRow(1).height = 72;
  worksheet.getRow(2).height = 32.25;
  worksheet.getCell("B1").fill = solid(BLUE_DARK);
  worksheet.getCell("B1").font = { name: "Arial", size: 14, bold: true, color: { argb: WHITE } };
  worksheet.getCell("B1").alignment = centered;

  for (let column = 2; column <= 13; column++) {
    const header = worksheet.getCell(2, column);
    header.fill = solid(BLUE);
    header.font = { name: "Arial", size: 9, bold: true, color: { argb: WHITE } };
    header.alignment = centered;
    header.border = thinBorder;
  }

  for (let row = 3; row <= rowCount; row++) {
    worksheet.getRow(row).height = 15.75;
    for (let column = 2; column <= 13; column++) {
      const target = worksheet.getCell(row, column);
      target.font = { name: "Arial", size: 10, color: { argb: BLACK } };
      target.border = thinBorder;
      target.alignment = { vertical: "middle", wrapText: false };
      if (row % 2 === 0) target.fill = solid(GRAY_LIGHT);
    }
    for (const column of [5, 11, 12, 13]) {
      const target = worksheet.getCell(row, column);
      const date = isoDate(target.value);
      if (date) target.value = date;
      target.numFmt = "dd/mm/yyyy";
    }
    for (const column of [8, 9, 10]) worksheet.getCell(row, column).numFmt = "$#,##0.0000";
    worksheet.getCell(row, 2).numFmt = "@";
    worksheet.getCell(row, 3).numFmt = "@";
    worksheet.getCell(row, 4).numFmt = "@";
    worksheet.getCell(row, 2).alignment = { vertical: "middle", wrapText: true };
    worksheet.getCell(row, 3).alignment = { vertical: "middle", wrapText: true };
    worksheet.getCell(row, 4).alignment = { vertical: "middle", wrapText: true };
  }
  worksheet.autoFilter = { from: "B2", to: `M${Math.max(3, rowCount)}` };
  worksheet.views = [{ state: "frozen", xSplit: 1, ySplit: 2, topLeftCell: "B3" }];
  worksheet.pageSetup = {
    orientation: "landscape",
    paperSize: 9,
    fitToPage: true,
    fitToWidth: 1,
    fitToHeight: 0,
    margins: { left: 0.2, right: 0.2, top: 0.35, bottom: 0.35, header: 0.2, footer: 0.2 },
  };
}

function styleRules(worksheet: Worksheet) {
  worksheet.mergeCells("A2:A3");
  worksheet.mergeCells("A4:A5");
  worksheet.getRow(1).height = 58.5;
  worksheet.getRow(4).height = 60.75;
  worksheet.getRow(5).height = 32.25;
  worksheet.getRow(6).height = 45.75;
  worksheet.getRow(7).height = 39.75;
  worksheet.getRow(8).height = 48.75;
  worksheet.getRow(9).height = 44.25;

  for (let row = 1; row <= 9; row++) {
    for (let column = 1; column <= 4; column++) {
      const target = worksheet.getCell(row, column);
      target.font = { name: "Arial", size: 8, color: { argb: BLACK } };
      target.alignment = { vertical: "middle", wrapText: true };
      target.border = thinBorder;
    }
  }
  for (let column = 1; column <= 4; column++) {
    const header = worksheet.getCell(1, column);
    header.fill = solid(GRAY);
    header.font = { name: "Arial", size: 8, bold: true, color: { argb: BLACK } };
    header.alignment = centered;
  }
  for (const row of [2, 5, 6]) worksheet.getCell(row, 2).numFmt = "0%";
  worksheet.pageSetup = {
    orientation: "landscape",
    paperSize: 9,
    fitToPage: true,
    fitToWidth: 1,
    fitToHeight: 1,
    margins: { left: 0.25, right: 0.25, top: 0.4, bottom: 0.4, header: 0.2, footer: 0.2 },
  };
}

export async function createRepasseXlsx(workbookModel: RepasseWorkbook) {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "OLÉ COPILOT";
  workbook.company = "Olé Life";
  workbook.subject = "Mapa de Repasse Excelsior para Olé";
  workbook.created = new Date(workbookModel.generatedAt);
  workbook.modified = new Date();
  workbook.calcProperties.fullCalcOnLoad = true;

  for (const sheet of workbookModel.sheets) {
    const worksheet = workbook.addWorksheet(sheet.name, {
      properties: { defaultRowHeight: 15.75 },
    });
    populateSheet(worksheet, sheet);
    if (sheet.id === "summary") styleSummary(worksheet);
    if (sheet.id === "analytic") styleAnalytic(worksheet, sheet.rows.length);
    if (sheet.id === "rules") styleRules(worksheet);
  }

  const buffer = await workbook.xlsx.writeBuffer();
  return Buffer.from(buffer);
}
