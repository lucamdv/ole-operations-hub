const SISTEMAS_ORIGEM = {
  "1000": "Excelsior Seguros",
  "1001": "OnPoint",
  "1002": "Azos",
  "1003": "Justos",
  "1004": "Ebix",
  "1009": "Olé",
  "1010": "Editor de Propostas",
  "1011": "RCP",
  "1012": "Residência - Poupex/Proseg",
  "1013": "Faturamento DEHAB",
  "1014": "Yolo Coliving",
  "1030": "Automações PIPE"
};
const sistemaOrigemLabel = (codigo) => {
  if (codigo === null || codigo === void 0) return null;
  const k = String(codigo);
  return SISTEMAS_ORIGEM[k] ? `${SISTEMAS_ORIGEM[k]} [${k}]` : k;
};
const TIPO_PESSOA_LABEL = {
  NATURAL: "Pessoa física",
  JURIDICA: "Pessoa jurídica"
};
const NATUREZA_PREMIO_LABEL = {
  PREMIO: "Prêmio",
  IMPOSTO: "Impostos",
  CUSTOS: "Custos",
  INTERMEDIACAO: "Intermediação"
};
const isObj = (v) => !!v && typeof v === "object" && !Array.isArray(v);
const asArr = (v) => Array.isArray(v) ? v : [];
const asStr = (v) => {
  if (v === null || v === void 0 || v === "") return null;
  if (typeof v === "string") return v;
  if (typeof v === "number" || typeof v === "boolean") return String(v);
  return null;
};
const asNum = (v) => {
  if (v === null || v === void 0 || v === "") return null;
  const n = typeof v === "number" ? v : parseFloat(String(v));
  return Number.isFinite(n) ? n : null;
};
function unwrapProposta(input) {
  if (!isObj(input))
    return {
      proposta: {},
      envelope: null,
      isWrapperVazio: true,
      tipoEndosso: null,
      numeroDocumento: null
    };
  if (Array.isArray(input.itens) || Array.isArray(input.partes) || input.datas) {
    return {
      proposta: input,
      envelope: null,
      isWrapperVazio: false,
      tipoEndosso: null,
      numeroDocumento: null
    };
  }
  for (const k of Object.keys(input)) {
    if (!k.startsWith("endosso_")) continue;
    const letra = k.slice("endosso_".length).toUpperCase();
    const tipoEndosso = letra === "A" || letra === "B" || letra === "C" ? letra : null;
    const env = input[k];
    if (!isObj(env)) continue;
    const numeroDocumento = asStr(env.numero_documento_seguradora) ?? asStr(env.numero_apolice_seguradora);
    for (const k2 of Object.keys(env)) {
      if (!k2.startsWith("proposta_endosso_")) continue;
      const wrap = env[k2];
      if (isObj(wrap)) {
        const inner = isObj(wrap.proposta) ? wrap.proposta : wrap;
        const vazio = !(Array.isArray(inner.itens) || Array.isArray(inner.partes));
        return {
          proposta: inner,
          envelope: env,
          isWrapperVazio: vazio,
          tipoEndosso,
          numeroDocumento
        };
      }
    }
    return {
      proposta: {},
      envelope: env,
      isWrapperVazio: true,
      tipoEndosso,
      numeroDocumento
    };
  }
  return {
    proposta: input,
    envelope: null,
    isWrapperVazio: true,
    tipoEndosso: null,
    numeroDocumento: null
  };
}
function parseDocumento(numero, tipoEndosso = null) {
  const seq = numero.slice(-6);
  const base = numero.slice(0, -6) + "000000";
  const tipo = seq === "000000" ? "APOLICE" : "ENDOSSO";
  return {
    tipo,
    tipoEndosso: tipo === "ENDOSSO" ? tipoEndosso : null,
    sequencial: seq,
    numeroApolice: base,
    numeroCompleto: numero
  };
}
function normalizeEndossoNum(raw) {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "000000";
  return digits.padStart(6, "0");
}
function parseDados(p, env) {
  return {
    numeroPropostaSeguradora: asStr(p.numero_proposta_seguradora) ?? asStr(env?.numero_apolice_seguradora ?? null),
    idPropostaOrigem: asStr(p.id_proposta_origem),
    idProduto: asStr(p.id_produto),
    idProdutoOrigem: asStr(p.id_produto_origem),
    grupoSusep: asStr(p.codigo_grupo_susep_principal),
    ramoSusep: asStr(p.codigo_ramo_susep_principal),
    sistemaOrigem: sistemaOrigemLabel(asStr(p.sistema_origem)),
    subscritor: asStr(p.id_subscritor_origem),
    resultadoSubscricao: asStr(p.resultado_subscricao),
    tipoApolice: asStr(p.tipo_apolice),
    emissaoCondicionadaPagamento: typeof p.emissao_condicionada_pagamento === "boolean" ? p.emissao_condicionada_pagamento : null,
    condicoesGerais: asArr(p.codigos_condicoes_gerais).map((v) => asStr(v)).filter((v) => !!v)
  };
}
function parseDatas(p, env) {
  const d = isObj(p.datas) ? p.datas : {};
  return {
    inicioVigencia: asStr(d.inicio_vigencia),
    fimVigencia: asStr(d.fim_vigencia),
    assinatura: asStr(d.assinatura),
    conclusaoSubscricao: asStr(d.conclusao_subscricao),
    registroOrigem: asStr(d.registro_origem),
    protocoloOrigem: asStr(d.protocolo_origem),
    // Em endossos o `data_emissao` vem no envelope (`endosso_X.data_emissao`);
    // na apólice base ele é mesclado pelo callback diretamente na proposta.
    dataEmissao: asStr(env?.data_emissao ?? null) ?? asStr(p.data_emissao)
  };
}
function parseEndereco(e) {
  return {
    tipo: asStr(e.tipo_endereco),
    logradouro: asStr(e.rua) ?? asStr(e.logradouro),
    numero: asStr(e.numero),
    complemento: asStr(e.complemento),
    bairro: asStr(e.bairro),
    cidade: asStr(e.cidade),
    estado: asStr(e.estado),
    cep: asStr(e.cep),
    pais: asStr(e.pais)
  };
}
function parsePartes(p) {
  return asArr(p.partes).filter(isObj).map((parte) => ({
    id: asStr(parte.id_pessoa) ?? asStr(parte.id_pessoa_origem) ?? crypto.randomUUID(),
    papel: asStr(parte.papel_parte) ?? "—",
    tipo: asStr(parte.tipo_parte) ?? "—",
    nome: asStr(parte.nome_pessoa) ?? "Sem nome",
    tipoPessoa: asStr(parte.tipo_pessoa),
    nacionalidade: asStr(parte.pais_nacionalidade),
    exposicaoPolitica: asStr(parte.exposicao_politica),
    dataNascimentoFundacao: asStr(parte.data_nascimento_fundacao),
    documentos: asArr(parte.documentos_identificacao).filter(isObj).map((d) => ({
      tipo: asStr(d.tipo_identificacao) ?? "DOC",
      valor: asStr(d.valor_identificacao) ?? "",
      pais: asStr(d.pais_identificacao)
    })),
    contatos: asArr(parte.informacao_contato).filter(isObj).map((c) => ({
      tipo: asStr(c.tipo_contato) ?? "—",
      valor: asStr(c.valor_contato) ?? ""
    })),
    enderecos: asArr(parte.enderecos).filter(isObj).map(parseEndereco)
  }));
}
function parseCobertura(c) {
  const datas = isObj(c.datas) ? c.datas : {};
  const composicao = asArr(c.composicao_premio_cobertura).filter(isObj).map((l) => ({
    natureza: asStr(l.natureza_premio) ?? "—",
    tipo: asStr(l.tipo_premio) ?? "—",
    moeda: asStr(l.moeda_premio) ?? "BRL",
    valor: asNum(l.valor_premio) ?? 0,
    valorBRL: asNum(l.valor_premio_brl) ?? 0,
    idPessoaOrigem: asStr(l.id_pessoa_origem)
  }));
  const totalPremioBRL = composicao.filter((l) => l.natureza === "PREMIO").reduce((acc, l) => acc + l.valorBRL, 0);
  return {
    nome: asStr(c.nome_cobertura) ?? "Cobertura",
    codigo: asStr(c.codigo_cobertura),
    grupoSusep: asStr(c.codigo_grupo_susep),
    ramoSusep: asStr(c.codigo_ramo_susep),
    processoSusep: asStr(c.numero_processo_susep),
    abrangenciaGeografica: asStr(c.abrangencia_geografica),
    inicioVigencia: asStr(datas.inicio_vigencia_cobertura),
    fimVigencia: asStr(datas.fim_vigencia_cobertura),
    limites: asArr(c.limites).filter(isObj).map((l) => ({
      tipoLimite: asStr(l.tipo_limite_cobertura),
      tipoObrigacao: asStr(l.tipo_obrigacao),
      moeda: asStr(l.moeda_limite_cobertura),
      valor: asNum(l.valor_limite_cobertura),
      valorBRL: asNum(l.valor_limite_cobertura_brl)
    })),
    beneficiarios: asArr(c.beneficiarios).filter(isObj).map((b) => ({
      id: asStr(b.id_pessoa_beneficiario) ?? asStr(b.id_beneficiario) ?? crypto.randomUUID(),
      parentesco: asStr(b.parentesco_beneficiario),
      participacao: asNum(b.participacao_beneficiario)
    })),
    composicaoPremio: composicao,
    totalPremioBRL
  };
}
function parseItens(p) {
  return asArr(p.itens).filter(isObj).map((it) => ({
    numero: asNum(it.numero_item),
    tipoObjeto: asStr(it.descricao_tipo_objeto) ?? asStr(it.codigo_tipo_objeto),
    classeRisco: asStr(it.classe_risco_item),
    dadosItem: isObj(it.dados_item) ? it.dados_item : null,
    coberturas: asArr(it.coberturas).filter(isObj).map(parseCobertura)
  }));
}
function parsePagamento(p) {
  const pg = isObj(p.pagamento) ? p.pagamento : {};
  const parcelas = asArr(pg.parcelas).filter(isObj).map((parc) => {
    const comp = asArr(parc.composicao_premio_parcela).filter(isObj);
    const totalBRL2 = comp.reduce((acc, l) => acc + (asNum(l.valor_premio_brl) ?? 0), 0);
    const totalMoeda = comp.reduce((acc, l) => acc + (asNum(l.valor_premio) ?? 0), 0);
    const moeda = comp.length > 0 ? asStr(comp[0].moeda_premio) ?? "BRL" : "BRL";
    return {
      numero: asNum(parc.numero_parcela),
      vencimento: asStr(parc.data_vencimento) ?? asStr(parc.vencimento),
      valor: totalMoeda || null,
      valorBRL: totalBRL2 || null,
      moeda,
      agenteCobrador: asStr(parc.agente_cobrador)
    };
  });
  const totalBRL = parcelas.reduce((acc, p2) => acc + (p2.valorBRL ?? 0), 0);
  return { parcelas, totalBRL };
}
function parseCotacoes(p) {
  return asArr(p.cotacao_moeda).filter(isObj).map((c) => ({
    moeda: asStr(c.moeda) ?? "—",
    taxaCambio: asNum(c.taxa_cambio) ?? 0,
    dataCotacao: asStr(c.data_cotacao),
    identificador: asStr(c.identificador)
  }));
}
function parseLimiteApolice(p) {
  if (!isObj(p.limite_maximo_apolice)) return null;
  const l = p.limite_maximo_apolice;
  return {
    moeda: asStr(l.moeda_limite_total),
    valor: asNum(l.valor_limite_total),
    valorBRL: asNum(l.valor_limite_total_brl)
  };
}
function parseCancelamento(proposta, tipoEndosso) {
  if (tipoEndosso !== "B" && tipoEndosso !== "C") return null;
  const motivo = asStr(proposta.motivo_endosso);
  const descricao = asStr(proposta.descricao_motivo_endosso);
  const cancelado = asStr(proposta.numero_endosso_cancelado);
  const pagamento = asStr(proposta.pagamento);
  if (!motivo && !descricao && !cancelado && !pagamento) return null;
  return {
    motivo,
    descricaoMotivo: descricao,
    numeroEndossoCancelado: cancelado,
    pagamento
  };
}
function parseMotivoEndosso(proposta, envelope) {
  const fontes = [proposta];
  if (envelope) {
    for (const k of Object.keys(envelope)) {
      if (!k.startsWith("proposta_endosso_")) continue;
      const wrap = envelope[k];
      if (isObj(wrap)) fontes.push(wrap);
    }
  }
  const pick = (campo) => {
    for (const f of fontes) {
      const v = asStr(f[campo]);
      if (v) return v;
    }
    return null;
  };
  const codigo = pick("motivo_endosso");
  const descricao = pick("descricao_motivo_endosso");
  const tipoCancelamento = pick("tipo_cancelamento");
  const numeroEndossoCancelado = pick("numero_endosso_cancelado");
  const pagamento = pick("pagamento");
  if (!codigo && !descricao && !tipoCancelamento) return null;
  return { codigo, descricao, tipoCancelamento, numeroEndossoCancelado, pagamento };
}
function translateProposta(input) {
  const { proposta, envelope, isWrapperVazio, tipoEndosso, numeroDocumento } = unwrapProposta(input);
  return {
    motivoEndosso: parseMotivoEndosso(proposta, envelope),
    dadosGerais: parseDados(proposta, envelope),
    datas: parseDatas(proposta, envelope),
    partes: parsePartes(proposta),
    itens: parseItens(proposta),
    pagamento: parsePagamento(proposta),
    cotacoes: parseCotacoes(proposta),
    limiteApolice: parseLimiteApolice(proposta),
    cancelamento: parseCancelamento(proposta, tipoEndosso),
    tipoEndosso,
    numeroDocumento,
    raw: proposta,
    isWrapperVazio
  };
}
function findSeguradoNome(input) {
  const { proposta } = unwrapProposta(input);
  const partes = parsePartes(proposta);
  return partes.find((p) => p.papel === "SEGURADO")?.nome ?? null;
}
function computePremioTotal(input) {
  const { proposta } = unwrapProposta(input);
  const pg = isObj(proposta.pagamento) ? proposta.pagamento : {};
  let total = 0;
  let moeda = null;
  for (const parc of asArr(pg.parcelas).filter(isObj)) {
    for (const l of asArr(parc.composicao_premio_parcela).filter(isObj)) {
      total += asNum(l.valor_premio) ?? 0;
      if (!moeda) moeda = asStr(l.moeda_premio);
    }
  }
  return { valor: total, moeda: moeda ?? "BRL" };
}
const computePremioLiquido = computePremioTotal;
const translate = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  computePremioLiquido,
  computePremioTotal,
  findSeguradoNome,
  normalizeEndossoNum,
  parseDocumento,
  translateProposta,
  unwrapProposta
}, Symbol.toStringTag, { value: "Module" }));
export {
  NATUREZA_PREMIO_LABEL as N,
  TIPO_PESSOA_LABEL as T,
  translate as a,
  normalizeEndossoNum as n,
  parseDocumento as p,
  translateProposta as t,
  unwrapProposta as u
};
