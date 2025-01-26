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
   git clone https://github.com/your-repo/bank-api.git
