# CashWise - API - Node.js, Prisma, Express, MongoDB, TypeScript

Este é um projeto de API para um aplicativo de banco, desenvolvido com Node.js, Prisma, Express, MongoDB e TypeScript. Ele permite o gerenciamento de usuários, login, transações financeiras como depósitos, saques e transferências, além de autenticação e proteção de rotas.

## Funcionalidades

- **Cadastro de usuário**: Permite a criação de novos usuários, com nome, e-mail, senha e senha de transação.
- **Login de usuário**: Autentica um usuário usando e-mail e senha, e gera um token JWT.
- **Atualização de usuário**: Permite ao usuário atualizar informações como nome, e-mail, senha e senha de transação.
- **Exclusão de usuário**: Permite excluir um usuário.
- **Depósito**: Permite adicionar saldo à conta do usuário.
- **Saque**: Permite ao usuário sacar uma quantia de sua conta.
- **Transferência**: Permite transferir saldo de uma conta para outra.
- **Extrato**: Exibe um extrato de transações realizadas por um usuário.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript.
- **Prisma**: ORM (Object Relational Mapping) para interagir com o banco de dados.
- **Express**: Framework para a criação da API.
- **MongoDB**: Banco de dados utilizado para armazenar os dados dos usuários e transações.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **JWT**: Para autenticação e geração de tokens de sessão.

## Estrutura do Projeto

- **controllers**: Contém os manipuladores de rotas (controllers) para cada funcionalidade (ex: cadastro, login, transações).
- **services**: Contém as lógicas de negócio, como criação de transações, atualização de saldo, etc.
- **routes**: Define as rotas para as APIs.
- **types**: Define interfaces e tipos para garantir uma boa tipagem no TypeScript.
- **.env**: Contém variáveis de ambiente, como a string de conexão com o MongoDB e a chave secreta para o JWT.
- **Prisma**: Gerencia o banco de dados usando o Prisma.

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/your-repo/bank-api.git

2. Instale as dependências

`npm install`

3. Crie o schema do Prisma

`npx prisma generate`
`npx prisma db push`

4. Execute a aplicação

`npm run dev`


## Endpoints

#### Autenticação

```http
  POST  - cadastrar usuário
  
  Local: /api/auth/register
  Deploy: https://cashwise-node.onrender.com/api/auth/register
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | **Obrigatório**. Nome de usuário |
| `email` | `string` | **Obrigatório**. Email de usuário |
| `password` | `string` | **Obrigatório**. Senha |
| `transactionPassword` | `string` | **Obrigatório**. Senha de transações financeiras|

```http
  POST - autenticar usuário
  
  Local: /api/auth/login
  Deploy: https://cashwise-node.onrender.com/api/auth/login
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `email`      | `string` | **Obrigatório**. Email cadastrado |
| `password`      | `string` | **Obrigatório**. Senha cadastrada |


```http
  PUT - editar dados do usuário
  
  Local: /api/auth/user/:id
  Deploy: https://cashwise-node.onrender.com/api/auth/user/:id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `name` | `string` | **Obrigatório**. Nome de usuário |
| `email` | `string` | **Obrigatório**. Email de usuário |
| `password` | `string` | **Obrigatório**. Senha |
| `transactionPassword` | `string` | **Obrigatório**. Senha de transações financeiras|

```http
  DELETE - Excluir usuário
  
  Local: /api/auth/user/:id
  Deploy: https://cashwise-node.onrender.com/api/auth/user/:id
```
#### Rotas de usuário

```http
  GET - Resgatar extrato do usuário

  Local: /api/user/statement/:userId
  Deploy: https://cashwise-node.onrender.com/api/user/statement/:userId
```

```http
  POST - Insere saldo na conta do usuário

  Local: /api/user/:id/deposit
  Deploy: https://cashwise-node.onrender.com/api/user/:id/deposit
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `amount` | `Number` | **Obrigatório**. Valor do saldo |
| `transactionPassword` | `string` | **Obrigatório**. Senha de transações |

```http
  POST - Envia um valor de depósito para outro usuário
  
  Local: /api/user/transfer
  Deploy: https://cashwise-node.onrender.com/api/user/transfer
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `fromUserId` | `Number` | **Obrigatório**. ID do usuário de origem |
| `toAccountNumber` | `string` | **Obrigatório**. Número da conta de destino |
| `amount` | `Number` | **Obrigatório**. Valor do saldo |
| `transactionPassword` | `string` | **Obrigatório**. Senha de transações |

```http
  POST - Cria o registro de uma transação (saque, depósito e transferência)
  
  Local: /api/user/transaction
  Deploy: https://cashwise-node.onrender.com/api/user/transaction/api/user/transaction
```

```http
  PUT - Saca um valor da conta do usuário que está logado

  Local: /api/user/withdraw/:id
  Deploy: https://cashwise-node.onrender.com/api/user/withdraw/:id/api/user/withdraw/:id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `amount` | `Number` | **Obrigatório**. Valor a ser sacado |
| `transactionPassword` | `string` | **Obrigatório**. Senha de transações |