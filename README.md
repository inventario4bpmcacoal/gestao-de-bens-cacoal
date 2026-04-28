# 📦 Bens de Consumo — 4º BPM Cacoal / PMRO

Sistema de controle de estoque de bens de consumo do **4º Batalhão de Polícia Militar — Cacoal / Rondônia**.

Desenvolvido em **Google Apps Script** (backend) + **GitHub Pages** (frontend).

---

## 🗂️ Estrutura do Repositório

```
├── index.html       → Página inicial / landing
├── login.html       → Tela de login
├── dashboard.html   → Painel principal (estoque, entradas, saídas, alertas)
├── config.js        → Configurações e camada de API
└── README.md
```

---

## ⚙️ Configuração Inicial

### 1. Apps Script — adicionar `api.gs`

No projeto do Apps Script da planilha de Bens de Consumo:

1. Abra **Extensões → Apps Script**
2. Clique no **+** ao lado de "Arquivos"
3. Crie um novo arquivo chamado `api`
4. Cole o conteúdo do arquivo `api.gs` (camada de API externa com `doPost`)
5. **Reimplante** o Web App:
   - Implantar → Gerenciar implantações → Nova implantação
   - Tipo: **App da Web**
   - Executar como: **Eu**
   - Quem pode acessar: **Qualquer pessoa**
   - Copie a **URL de implantação**

### 2. GitHub Pages — configurar URL

Abra o arquivo `config.js` e substitua:

```js
API_URL: 'https://script.google.com/macros/s/SEU_DEPLOYMENT_ID_AQUI/exec',
```

Pela URL copiada no passo anterior.

### 3. Ativar GitHub Pages

No repositório:
- **Settings → Pages**
- Source: **Deploy from a branch**
- Branch: `main` / pasta: `/ (root)`
- Salvar

O sistema estará disponível em:
```
https://inventario4bpmcacoal.github.io/inventario4bpm/
```

---

## 🔐 Acesso Inicial

| Campo      | Valor       |
|-----------|-------------|
| Matrícula | `ADMIN`     |
| Senha     | `admin123`  |

> ⚠️ **Troque a senha imediatamente após o primeiro acesso!**

---

## 🏢 Setores Configurados

- P1 - PESSOAL
- P2 - INTELIGÊNCIA
- P3 - OPERAÇÕES
- P4 - LOGÍSTICA
- P5 - COMUNICAÇÃO SOCIAL
- CMDO - COMANDANTE
- SUBCOMANDANTE
- ALMOXARIFADO
- INFORMÁTICA
- POLICIAMENTO OSTENSIVO
- ADMINISTRATIVO

> Para adicionar novos setores: no Apps Script, execute a função `adicionarSetor()`.

---

## 🚀 Funcionalidades

- ✅ Login com autenticação SHA-256
- ✅ Dashboard com contadores e alertas
- ✅ Cadastro e gestão de produtos
- ✅ Registro de entradas de estoque
- ✅ Registro de saídas por setor
- ✅ Alertas de estoque abaixo do mínimo
- ✅ Memória de cálculo mensal e anual
- ✅ Gerenciamento de usuários (perfis ADMIN/OPERADOR)

---

## 👨‍💻 Idealizador

**CB QPPM CAIO — Mat. 100095091**  
Polícia Militar do Estado de Rondônia — 4º BPM Cacoal
