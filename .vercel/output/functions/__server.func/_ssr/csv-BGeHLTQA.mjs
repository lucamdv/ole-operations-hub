const CSV_SEP = ";";
function csvEscape(value) {
  if (value === null || value === void 0) return "";
  const s = String(value);
  return /[";\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}
function csvRow(cells) {
  return cells.map(csvEscape).join(CSV_SEP);
}
function csvDocument(rows) {
  return "\uFEFF" + rows.map(csvRow).join("\r\n") + "\r\n";
}
function csvNumber(value, decimals = 2) {
  if (value === null || value === void 0 || value === "") return "";
  const n = typeof value === "number" ? value : Number(String(value).replace(",", "."));
  if (!Number.isFinite(n)) return "";
  return n.toFixed(decimals).replace(".", ",");
}
function csvDate(value) {
  if (!value) return "";
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);
  if (m) return `${m[3]}/${m[2]}/${m[1]}`;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  const p = (n) => String(n).padStart(2, "0");
  return `${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()}`;
}
function csvDateTime(value) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).replace(",", "");
}
export {
  CSV_SEP,
  csvDate,
  csvDateTime,
  csvDocument,
  csvEscape,
  csvNumber,
  csvRow
};
