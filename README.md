# Conversor de Moedas

Aplicação web interativa, desenvolvida em React.js e estilizada com React-Bootstrap, voltada para a conversão de valores monetários e consulta de cotações cambiais atualizadas em tempo real.

---

## 📌 Contexto do Projeto
* **Disciplina:** Programação Web Fullstack (AS64A - Projeto 1)
* **Instituição:** Universidade Tecnológica Federal do Paraná (UTFPR) — Campus Cornélio Procópio
* **Docente:** Profª. Drª. Juliana Costa Silva
* **Desenvolvedoras:**
  * Anny Vitoria (Camada de Dados, Context API, AJAX/Fetch, Tratamento de Erros e Deploy)
  * Isabelle Lays (Interface do Usuário, Formulários, Validações Pré-envio e Otimização com `useMemo`)

---

## 💻 Funcionalidades do Sistema
* **Consulta de Cotações:** Carregamento automático das principais taxas de câmbio internacionais com base no Real Brasileiro.
* **Conversão de Câmbio:** Conversão dinâmica entre diferentes pares de moedas por meio de requisições parametrizadas à API.
* **Validação Pré-envio:** Bloqueio e sinalização visual na interface em caso de valores inválidos, campos vazios ou moedas idênticas.
* **Tratamento de Erros Pós-envio:** Interceptação e exibição de alertas para falhas de conexão ou retornos HTTP da API.
* **Tabela Otimizada com `useMemo`:** Listagem e filtragem de taxas cambiais.

---

## 🛠 Tecnologias e Ferramentas
* **Frontend:** [React.js](https://react.dev/) com JSX e hooks nativos
* **Build Tool:** [Vite](https://vitejs.dev/)
* **Biblioteca de Componentes:** [React-Bootstrap](https://react-bootstrap.netlify.app/)
* **Gerenciamento de Estado:** [Context API](https://react.dev/reference/react/createContext) (`CambioContext.jsx`) para comunicação global sem *prop drilling*
* **Requisições Assíncronas:** AJAX via `fetch` nativo com cabeçalhos de autenticação
* **API de Câmbio Externa:** [APILayer Exchange Rates Data API](https://apilayer.com/marketplace/exchangerates_data-api) (endpoints `/latest` e `/convert`)

---

## 📁 Estrutura de Pastas
```text
conversor-moedas/
├── index.html
├── package.json
├── vite.config.js
├── README.md
├── public/
└── src/
    ├── App.jsx
    ├── App.css
    ├── main.jsx
    ├── index.css
    ├── components/
    │   ├── AlertaStatus.jsx
    │   ├── Cabecalho.jsx
    │   ├── FormularioConversor.jsx
    │   ├── ResultadoConversao.jsx
    │   └── TabelaCotacoes.jsx
    └── contexts/
        └── CambioContext.jsx
```

---

## 🚀 Como Executar Localmente

### Pré-requisitos
* [Node.js](https://nodejs.org/) instalado.
* Git configurado.

### Passo a passo
1. Clone o repositório:
   ```bash
   git clone https://github.com/Annyyzinha/Cambio-de-Moedas.git
   cd Cambio-de-Moedas
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure a variável de ambiente:
   Crie um arquivo `.env.local` na raiz do projeto e insira sua chave da APILayer:
   ```env
   VITE_APILAYER_KEY=sua_chave_apilayer_aqui
   ```

4. Execute o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
   Acesse a aplicação no navegador em `http://localhost:5173`.

---

## 🌐 Publicação (Deploy)
* **Ambiente de Produção:** [https://fluffy-conkies-64d296.netlify.app](https://fluffy-conkies-64d296.netlify.app)