# API-REST-BANCO 

Construção de uma  <strong>API</strong>, para realização de operações bancárias, seguindo a arquitetura <strong>REST.</strong>

<h2>Inicialização</h2>
Para inicializar o projeto no terminal com as dependências necessárias digite:

<li> npm install -D nodemon</li>
<li> npm install express</li>

<h2>Execução do Projeto </h2>

  O projeto pode ser executado utilizando o <strong>Insomnia</strong>
  <h2>Endpoints:</h2>

   ✅ Listar contas
   <strong style ="color:blue">GET</strong> `http://localhost:3000/contas?senha_banco=Bank1234`

   ✅ Criar conta
   <strong style ="color:green">POST</strong> `http://localhost:3000/contas`
   ```javascript
   {
    "nome": "José Neto",
    "cpf": "11122233344",
    "data_nascimento": "2000-01-10",
    "telefone": "32988776655",
    "email": "jneto@email.com",
    "senha": "12345"
}
```
 
   ✅ Atualizar  conta
   <strong style ="color:orange">PUT</strong> `http://localhost:3000/contas/:numeroConta/usuario`

   ✅ Excluir Conta
   <strong style ="color:red">DEL</strong> `http://localhost:3000/contas/:numeroConta`

   ✅ Saldo
   <strong style ="color:blue">GET</strong> `http://localhost:3000/contas/saldo?numero_conta=1&senha=12345`

   ✅ Depositar
   <strong style ="color:green">POST</strong>  `http://localhost:3000/transacoes/depositar`

   ✅ Sacar
   <strong style ="color:green">POST</strong>  `http://localhost:3000/transacoes/sacar`

   ✅ Tranferir
   <strong style ="color:green">POST</strong>  `http://localhost:3000/transacoes/transferir`

   ✅ Extrato
   <strong style ="color:blue">GET</strong> `http://localhost:3000/contas/extrato?numero_conta=1&senha=12345`

