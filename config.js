// =============================================================================
//  config.js — CONFIGURAÇÃO DO SISTEMA
//  GitHub Pages — Bens de Consumo | 4º BPM Cacoal / PMRO
//
//  ⚠️  IMPORTANTE: Após adicionar api.gs e reimplantar o Apps Script,
//                  cole o novo URL de implantação abaixo.
// =============================================================================

const BC_CONFIG = {
  // URL do Apps Script — cole aqui após reimplantar com api.gs
  API_URL: 'https://script.google.com/macros/s/SEU_DEPLOYMENT_ID_AQUI/exec',

  // Duração da sessão no localStorage (ms) — 8 horas
  SESSION_DURATION: 8 * 60 * 60 * 1000,

  // Identificação do batalhão
  BATALHAO: '4º BPM',
  CIDADE:   'Cacoal',
  ESTADO:   'Rondônia',

  // Versão do sistema
  VERSION: '1.0'
};

// =============================================================================
//  CAMADA DE API — todas as chamadas passam por aqui
//  Usa fetch() POST para comunicar com o Apps Script (doPost)
// =============================================================================
const bcApi = {
  async call(fn, ...args) {
    const resp = await fetch(BC_CONFIG.API_URL, {
      method: 'POST',
      body: JSON.stringify({ fn, args }),
      headers: { 'Content-Type': 'text/plain' } // evita preflight CORS
    });
    if (!resp.ok) throw new Error('HTTP ' + resp.status);
    return resp.json();
  },

  // Autenticação
  login:             (mat, senha)            => bcApi.call('login', mat, senha),
  logout:            (token)                 => bcApi.call('logout', token),
  verificarSessao:   (token)                 => bcApi.call('verificarSessao', token),
  renovarSessao:     (tk, mat, ng, pf)       => bcApi.call('renovarSessao', tk, mat, ng, pf),

  // Produtos
  listarProdutos:    ()                      => bcApi.call('listarProdutos'),
  carregarDashboard: ()                      => bcApi.call('carregarDashboard'),
  registrarEntrada:  (dados)                 => bcApi.call('registrarEntrada', dados),
  registrarSaida:    (dados)                 => bcApi.call('registrarSaida', dados),
  cadastrarProduto:  (dados)                 => bcApi.call('cadastrarProduto', dados),
  atualizarProduto:  (cod, dados)            => bcApi.call('atualizarProduto', cod, dados),
  excluirProduto:    (cod)                   => bcApi.call('excluirProduto', cod),
  listarSecoes:      ()                      => bcApi.call('listarSecoes'),

  // Usuários
  listarUsuarios:    (token)                 => bcApi.call('listarUsuarios', token),
  cadastrarUsuario:  (token, dados)          => bcApi.call('cadastrarUsuario', token, dados),
  alterarStatusUsr:  (token, mat, status)    => bcApi.call('alterarStatusUsr', token, mat, status),
  redefinirSenha:    (token, mat, senha)     => bcApi.call('redefinirSenha', token, mat, senha),
  alterarSenha:      (token, atual, nova)    => bcApi.call('alterarSenha', token, atual, nova),
};

// =============================================================================
//  GERENCIADOR DE SESSÃO — usa localStorage (persiste entre abas)
// =============================================================================
const bcSessao = {
  salvar(token, usuario) {
    const dados = { token, usuario, expira: Date.now() + BC_CONFIG.SESSION_DURATION };
    localStorage.setItem('bc_sessao_4bpm', JSON.stringify(dados));
  },
  carregar() {
    try {
      const raw = localStorage.getItem('bc_sessao_4bpm');
      if (!raw) return null;
      const dados = JSON.parse(raw);
      if (Date.now() > dados.expira) { this.limpar(); return null; }
      return dados;
    } catch { return null; }
  },
  limpar() { localStorage.removeItem('bc_sessao_4bpm'); },
  get token()   { return this.carregar()?.token   || null; },
  get usuario() { return this.carregar()?.usuario || null; }
};
