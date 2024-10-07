# 🚀 hackathon-grupo-3

🤖 **Equipe:** TASK-TERMINATORS  🧠✨

Bem-vindo ao repositório do projeto **hackathon-grupo-3**, desenvolvido pela equipe Test-AI-3 para resolver desafios com uma API capaz de interagir com um banco de dados, utilizando Clean Architecture e princípios SOLID.

---

## 📋 Funcionalidades

Este projeto tem um único endpoint que recebe um prompt e responde com uma consulta ao banco de dados, retornando informações relevantes com base nos dados armazenados.

## 🛠️ Ferramentas Utilizadas

- **Node.js** - Ambiente de execução JavaScript para o backend.
- **Express.js** - Framework para criar e gerenciar a API.
- **dotenv** - Gerenciamento de variáveis de ambiente.
- **axios** - Cliente HTTP para realizar a integração com a API da OpenAI.
- **azion/sql** - Biblioteca fictícia para conexão com o banco de dados.

## 🗂️ Estrutura do Projeto

O projeto está estruturado conforme Clean Architecture e os princípios do SOLID, com camadas separadas para **Controllers**, **Services**, **Repositories** e **Config**.

### Estrutura de Pastas
node-api/ 
├── src/
│ ├── config/ 
│ │ └── database.js 
│ ├── controllers/ 
│ │ └── promptController.js 
│ ├── repositories/ 
│ │ └── promptRepository.js 
│ ├── services/ 
│ │ └── promptService.js 
│ ├── routes/ 
│ │ └── promptRoutes.js 
│ ├── app.js 
│ └── index.js
├── .env 
├── package.json 
└── README.md

## 🚀 Executando o Projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) instalado (versão 14 ou superior)
- Gerenciador de pacotes **npm** (ou **yarn**)
- **Chave de API** da OpenAI
- **Token de Acesso** da Azion

### Passo a Passo

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/seu-usuario/hackathon-grupo-3.git
   cd hackathon-grupo-3
   ```
2. **Instale as dependências**:

   ```bash
   npm install
   ```
3. **Crie um arquivo `.env` na raiz do projeto**:

   ```bash
    TOKEN_AZION=seu_token_aqui
    DB_NAME=nome_do_banco
    NODE_ENV=development
    PORT=3000
    OPENAI_API_KEY=sua_chave_openai_aqui
    ```

4. **Execute o projeto**:

   ```bash
   npm start
   ```
5. **Acesse o endpoint da API:**:

   ```bash
    http://localhost:3000/prompt   
   ```
9. **Teste a API pelo test-endpoint.http**:

   ```bash
    instale a extensão REST Client no VSCode
    clique com o botão direito no arquivo test-endpoint.http e selecione "Send Request"
    ```
