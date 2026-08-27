import { j as jspdf_node_minExports } from "../_libs/jspdf.mjs";
import { t as toPng } from "../_libs/html-to-image.mjs";
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
async function exportChartsPdf(nodes, periodLabel) {
  if (nodes.length === 0) return;
  const doc = new jspdf_node_minExports.jsPDF({ orientation: "landscape", unit: "pt", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 36;
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    const title = node.dataset.title ?? `Gráfico ${i + 1}`;
    const dataUrl = await toPng(node, {
      pixelRatio: 2,
      backgroundColor: getComputedStyle(node).backgroundColor || "#0b0f1a",
      cacheBust: true
    });
    if (i > 0) doc.addPage();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(15, 23, 42);
    doc.text(title, margin, margin);
    const img = new Image();
    img.src = dataUrl;
    await new Promise((r) => {
      img.onload = () => r();
      img.onerror = () => r();
    });
    const maxW = pageW - margin * 2;
    const maxH = pageH - margin * 2 - 30;
    const ratio = Math.min(maxW / img.width, maxH / img.height);
    const w = img.width * ratio;
    const h = img.height * ratio;
    const x = (pageW - w) / 2;
    const y = margin + 16;
    doc.addImage(dataUrl, "PNG", x, y, w, h);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(
      `OLÉ COPILOT — Analytics  ·  ${periodLabel ? `Período: ${periodLabel}  ·  ` : ""}${(/* @__PURE__ */ new Date()).toLocaleString("pt-BR")}`,
      margin,
      pageH - 16
    );
    doc.text(`Página ${i + 1} de ${nodes.length}`, pageW - margin, pageH - 16, {
      align: "right"
    });
  }
  doc.save(`analytics-graficos-${stamp()}.pdf`);
}
export {
  exportChartsPdf
};
