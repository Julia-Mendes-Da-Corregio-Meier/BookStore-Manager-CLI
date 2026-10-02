# BookStore Manager CLI

Sistema de gerenciamento de livraria executado pelo terminal, desenvolvido em Node.js, TypeScript e PostgreSQL.

O projeto permite cadastrar e gerenciar autores, livros e clientes, além de controlar empréstimos, devoluções e gerar relatórios sobre os dados cadastrados.

---

## 📚 Sobre o projeto

O BookStore Manager CLI foi desenvolvido como projeto avaliativo do Módulo 01, com o objetivo de aplicar conceitos de:

- TypeScript
- Node.js
- Programação Orientada a Objetos
- PostgreSQL
- SQL
- CRUD
- `async/await`
- Tratamento de erros com `try/catch`
- Arquitetura em camadas
- Separação de responsabilidades
- Clean Code
- Princípios de organização e manutenção de código

A aplicação funciona diretamente pelo terminal e utiliza o PostgreSQL para persistência dos dados.

---

## 🚀 Tecnologias utilizadas

- Node.js
- TypeScript
- PostgreSQL
- `pg`
- `dotenv`
- `tsx`

---

## 🗂️ Estrutura do projeto

O projeto é organizado em camadas para separar as responsabilidades da aplicação.

```text
src/
├── controllers/
├── database/
│   ├── connection.ts
│   ├── criarBanco.ts
│   ├── migrate.ts
│   └── schema.sql
├── menus/
├── models/
├── repositories/
├── services/
└── main.ts
```

### Responsabilidade das principais camadas

**Models**  
Representam as entidades utilizadas pelo sistema, como autores, livros, clientes e empréstimos.

**Repositories**  
Responsáveis pela comunicação com o banco de dados e pela execução das consultas SQL.

**Services**  
Contêm as regras de negócio e validações da aplicação.

**Controllers**  
Fazem a ligação entre as operações do menu e os serviços.

**Menus**  
Responsáveis pela interação com o usuário através do terminal.

**Database**  
Contém a conexão com o PostgreSQL, o script de criação das tabelas e os scripts de inicialização do banco.

**Main**  
Ponto de entrada da aplicação, responsável por iniciar o sistema.

---

## 🗄️ Banco de dados

O projeto utiliza PostgreSQL.

O banco possui as seguintes tabelas:

### Autores

Armazena os autores cadastrados.

### Livros

Armazena os livros e suas informações, incluindo:

- título
- ano de publicação
- quantidade disponível
- autor relacionado

### Clientes

Armazena os clientes cadastrados, com nome e e-mail.

### Empréstimos

Relaciona livros e clientes e registra:

- livro emprestado
- cliente
- data do empréstimo
- data da devolução

As tabelas possuem chaves primárias e estrangeiras para garantir o relacionamento entre os dados.

---

## ⚙️ Pré-requisitos

Antes de executar o projeto, é necessário ter instalado:

- Node.js
- PostgreSQL
- Git

---

## 📥 Instalação

Clone o repositório:

```bash
git clone https://github.com/Julia-Mendes-Da-Corregio-Meier/BookStore-Manager-CLI.git
```

Entre na pasta:

```bash
cd BookStore-Manager-CLI
```

Instale as dependências:

```bash
npm install
```

---

## 🔐 Configuração do banco

O projeto utiliza variáveis de ambiente para realizar a conexão com o PostgreSQL.

Crie um arquivo `.env` na raiz do projeto.

Exemplo:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=sua_senha
DB_NAME=bookstore_manager
```

Substitua `sua_senha` pela senha configurada no PostgreSQL.

> O arquivo `.env` não deve ser enviado para o GitHub.

---

## 🏗️ Inicialização do banco de dados

O projeto possui comandos próprios para preparar o banco.

### 1. Criar o banco

```bash
npm run db:create
```

Esse comando verifica se o banco definido no `.env` já existe.

Caso não exista, o banco é criado automaticamente.

Caso já exista, nenhuma alteração é realizada.

### 2. Criar as tabelas

```bash
npm run db:migrate
```

Esse comando executa o arquivo:

```text
src/database/schema.sql
```

e cria as tabelas necessárias para a aplicação.

As tabelas utilizam `CREATE TABLE IF NOT EXISTS`, permitindo executar a migração novamente sem tentar recriar tabelas que já existem.

---

## ▶️ Executando o projeto

### Modo de desenvolvimento

```bash
npm run dev
```

### Compilar o projeto

```bash
npm run build
```

### Executar a versão compilada

```bash
npm start
```

---

## 📋 Fluxo recomendado para executar o projeto

Depois de clonar o repositório, o fluxo recomendado é:

```bash
npm install
npm run db:create
npm run db:migrate
npm run build
npm start
```

---

## 📖 Funcionalidades

### 👤 Autores

- Cadastrar autor
- Listar autores
- Buscar autor por ID
- Atualizar autor
- Excluir autor

### 📚 Livros

- Cadastrar livro
- Listar livros
- Buscar livro por ID
- Atualizar livro
- Excluir livro
- Relacionar livro a um autor
- Controlar quantidade disponível

### 👥 Clientes

- Cadastrar cliente
- Listar clientes
- Buscar cliente por ID
- Atualizar cliente
- Excluir cliente
- Validar nome
- Permitir cadastro sem e-mail
- Impedir e-mails duplicados

### 📦 Empréstimos

- Realizar empréstimo
- Listar empréstimos
- Buscar empréstimo por ID
- Listar empréstimos com detalhes
- Registrar devolução
- Verificar disponibilidade do livro
- Relacionar empréstimo a cliente e livro

---

## 📊 Relatórios

O sistema possui os seguintes relatórios:

1. Livros disponíveis
2. Livros emprestados
3. Livros cadastrados por autor
4. Quantidade de empréstimos por livro
5. Clientes com empréstimos ativos

As consultas utilizam recursos SQL como `INNER JOIN`, `LEFT JOIN`, `GROUP BY`, `ORDER BY`, `COUNT` e outras operações necessárias para gerar os resultados.

---

## 🛡️ Validações e tratamento de erros

A aplicação possui tratamento de erros para evitar encerramentos inesperados durante a utilização.

Entre os cenários tratados estão:

- Cadastro com nome vazio
- Nome contendo números
- E-mail duplicado
- Busca de registro inexistente
- Exclusão de registro inexistente
- Tentativa de empréstimo com livro indisponível
- Tentativa de utilizar cliente ou livro inexistente
- Erros de comunicação com o banco de dados

---

## 🧱 Arquitetura

A aplicação utiliza uma arquitetura em camadas, separando:

```text
Menu
  ↓
Controller
  ↓
Service
  ↓
Repository
  ↓
PostgreSQL
```

Essa organização facilita a manutenção, a reutilização e a separação das responsabilidades do sistema.

---

## 🌿 Git e branches

O desenvolvimento do projeto foi organizado utilizando Git e branches.

Branches utilizadas:

- `main`
- `develop`
- `feat/autores`
- `feat/livros`
- `feat/clientes`
- `feat/emprestimos`
- `feat/relatorios`
- `feat/database`
- `docs/readme`

O desenvolvimento foi realizado principalmente na branch `develop`, com posterior integração da versão final na `main`.

---

## 📌 Kanban

Link do Kanban do projeto:

**(https://github.com/users/Julia-Mendes-Da-Corregio-Meier/projects/1/views/1)**

---

## 🎥 Vídeo de apresentação

Vídeo de apresentação do projeto:

**COLE_AQUI_O_LINK_DO_VIDEO**

---

## 👩‍💻 Autora

**Julia Mendes da Corregio Meier**

Projeto desenvolvido individualmente como parte do Módulo 01.

---

## 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos.