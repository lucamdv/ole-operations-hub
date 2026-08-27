import { j as jspdf_node_minExports } from "../_libs/jspdf.mjs";
import { a as autoTable } from "../_libs/jspdf-autotable.mjs";
import "fs";
import "path";
import "../_libs/react.mjs";
import "../_libs/fflate.mjs";
import "../_libs/fast-png.mjs";
import "../_libs/iobuffer.mjs";
import "../_libs/pako.mjs";
import "../_libs/html2canvas.mjs";
import "../_libs/dompurify.mjs";
import "../_libs/canvg.mjs";
import "../_libs/core-js.mjs";
import "../_libs/babel__runtime.mjs";
import "../_libs/raf.mjs";
import "../_libs/performance-now.mjs";
import "../_libs/rgbcolor.mjs";
import "../_libs/svg-pathdata.mjs";
import "../_libs/stackblur-canvas.mjs";
function pad(n) {
  return n.toString().padStart(2, "0");
}
function stamp(d = /* @__PURE__ */ new Date()) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}`;
}
function exportEndorsementsCsv(rows) {
  const header = "PolicyNumber;last_sequencial_endosso_used";
  const body = rows.map((r) => `${r.policy_number};${r.last_sequencial_endosso_used ?? ""}`).join("\n");
  const blob = new Blob([`\uFEFF${header}
${body}
`], {
    type: "text/csv;charset=utf-8;"
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `ultimos-endossos-${stamp()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
function exportEndorsementsPdf(rows, generatedAt) {
  const doc = new jspdf_node_minExports.jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, pageWidth, 64, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Extrator de Últimos Endossos", 40, 30);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(
    `${rows.length} apólices  ·  gerado em ${(/* @__PURE__ */ new Date()).toLocaleString("pt-BR")}${generatedAt ? `  ·  extração de ${new Date(generatedAt).toLocaleString("pt-BR")}` : ""}`,
    40,
    46
  );
  autoTable(doc, {
    startY: 84,
    head: [["PolicyNumber", "last_sequencial_endosso_used"]],
    body: rows.map((r) => [r.policy_number, String(r.last_sequencial_endosso_used ?? "—")]),
    styles: { fontSize: 8, cellPadding: 4, textColor: [15, 23, 42] },
    headStyles: { fillColor: [15, 23, 42], textColor: [255, 255, 255], fontSize: 8 },
    alternateRowStyles: { fillColor: [241, 245, 249] },
    columnStyles: { 1: { halign: "right" } },
    margin: { left: 40, right: 40 }
  });
  doc.save(`ultimos-endossos-${stamp()}.pdf`);
}
export {
  exportEndorsementsCsv,
  exportEndorsementsPdf
};
