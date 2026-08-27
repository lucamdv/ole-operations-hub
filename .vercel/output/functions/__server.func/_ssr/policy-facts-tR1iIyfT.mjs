function safeJson(s) {
  try {
    return JSON.parse(s);
  } catch {
    return {};
  }
}
function toRaw(propostaRaw) {
  return typeof propostaRaw === "string" ? safeJson(propostaRaw) : propostaRaw ?? {};
}
function resolveProposta(raw) {
  if (raw.datas || raw.itens) return raw;
  for (const k of ["endosso_A", "endosso_B", "endosso_C", "endosso_D"]) {
    const wrapper = raw[k];
    if (!wrapper) continue;
    const inner = wrapper[`proposta_${k}`];
    const inside = inner?.proposta;
    if (inside && (inside.datas || inside.itens)) return inside;
  }
  return raw;
}
const day = (v) => typeof v === "string" && v.length >= 10 ? v.slice(0, 10) : null;
function resolveEmissao(raw) {
  for (const k of ["endosso_A", "endosso_B", "endosso_C", "endosso_D"]) {
    const wrapper = raw[k];
    if (wrapper && typeof wrapper.data_emissao === "string") return day(wrapper.data_emissao);
  }
  const proposta = resolveProposta(raw);
  const datas = proposta.datas ?? {};
  return day(datas.assinatura) ?? day(datas.conclusao_subscricao) ?? day(datas.registro_origem) ?? null;
}
function sumCoberturas(proposta) {
  let direto = 0;
  let total = 0;
  const itens = Array.isArray(proposta.itens) ? proposta.itens : [];
  for (const it of itens) {
    const coberturas = Array.isArray(it.coberturas) ? it.coberturas : [];
    for (const cob of coberturas) {
      const comps = Array.isArray(cob.composicao_premio_cobertura) ? cob.composicao_premio_cobertura : [];
      for (const c of comps) {
        const v = Number(c.valor_premio) || 0;
        total += v;
        if (c.tipo_premio === "DIRETO" && c.natureza_premio === "PREMIO") direto += v;
      }
    }
  }
  return { direto: round2(direto), total: round2(total) };
}
function policyFacts(propostaRaw) {
  const raw = toRaw(propostaRaw);
  const proposta = resolveProposta(raw);
  const datas = proposta.datas ?? {};
  const { direto } = sumCoberturas(proposta);
  return {
    inicio: day(datas.inicio_vigencia),
    fim: day(datas.fim_vigencia),
    emissao: resolveEmissao(raw),
    premioUsd: direto
  };
}
function issuanceFacts(propostaRaw) {
  const raw = toRaw(propostaRaw);
  const proposta = resolveProposta(raw);
  const emissao = resolveEmissao(raw);
  const pagamento = proposta.pagamento ?? {};
  const rawParcelas = Array.isArray(pagamento.parcelas) ? pagamento.parcelas : [];
  const parcelas = [];
  for (const parc of rawParcelas) {
    const comps = Array.isArray(parc.composicao_premio_parcela) ? parc.composicao_premio_parcela : [];
    let valor = 0;
    for (const c of comps) {
      valor += Number(c.valor_premio) || 0;
    }
    if (valor > 0) parcelas.push({ data: day(parc.data_vencimento), valor: round2(valor) });
  }
  const { direto, total } = sumCoberturas(proposta);
  return { emissao, parcelas, premioDiretoUsd: direto, premioTotalCoberturas: total };
}
function isActive(f, ref = /* @__PURE__ */ new Date()) {
  const today = ref.toISOString().slice(0, 10);
  if (!f.inicio) return false;
  if (f.inicio > today) return false;
  if (f.fim && f.fim < today) return false;
  return true;
}
function round2(n) {
  return Math.round(n * 100) / 100;
}
export {
  isActive,
  issuanceFacts,
  policyFacts
};
