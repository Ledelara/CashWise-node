
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
| `transactionPassword` | `string` | **Obrigatório**. Senha de transações |

```http
  POST api/user/transfer - Envia um valor de depósito para outro usuário
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `fromUserId` | `Number` | **Obrigatório**. ID do usuário de origem |
| `toAccountNumber` | `string` | **Obrigatório**. Número da conta de destino |
| `amount` | `Number` | **Obrigatório**. Valor do saldo |
| `transactionPassword` | `string` | **Obrigatório**. Senha de transações |

```http
  POST api/user/transaction - Cria o registro de uma transação (saque, depósito e transferência)
```

```http
  PUT api/user/withdraw/:id - Saca um valor da conta do usuário que está logado
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `amount` | `Number` | **Obrigatório**. Valor a ser sacado |
| `transactionPassword` | `string` | **Obrigatório**. Senha de transações |