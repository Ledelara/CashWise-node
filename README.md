# Bank API - Node.js, Prisma, Express, MongoDB, TypeScript

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
   git clone https://github.com/Ledelara/CashWise-node.git

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
  POST /api/auth/register - cadastrar usuário
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | **Obrigatório**. Nome de usuário |
| `email` | `string` | **Obrigatório**. Email de usuário |
| `password` | `string` | **Obrigatório**. Senha |
| `transactionPassword` | `string` | **Obrigatório**. Senha de transações financeiras|

```http
  POST /api/auth/login - autenticar usuário
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `email`      | `string` | **Obrigatório**. Email cadastrado |
| `password`      | `string` | **Obrigatório**. Senha cadastrada |


```http
  PUT api/auth/user/:id - editar dados do usuário
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `name` | `string` | **Obrigatório**. Nome de usuário |
| `email` | `string` | **Obrigatório**. Email de usuário |
| `password` | `string` | **Obrigatório**. Senha |
| `transactionPassword` | `string` | **Obrigatório**. Senha de transações financeiras|

```http
  DELETE api/auth/user/:id Excluir usuário
```
#### Rotas de usuário

```http
  GET api/user/statement/:userId - Resgatar extrato do usuário
```

```http
  POST api/user/:id/deposit - Insere saldo na conta do usuário
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `amount` | `Number` | **Obrigatório**. Valor do saldo |

```http
  POST api/user/transfer - Envia um valor de depósito para outro usuário
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `fromUserId` | `Number` | **Obrigatório**. ID do usuário de origem |
| `toAccountNumber` | `Number` | **Obrigatório**. Número da conta de destino |
| `amount` | `Number` | **Obrigatório**. Valor do saldo |

```http
  POST api/user/transaction - Cria o registro de uma transação (saque, depósito e transferência)
```

```http
  PUT api/user/withdraw/:id - Saca um valor da conta do usuário que está logado
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `amount` | `Number` | **Obrigatório**. Valor a ser sacado |

