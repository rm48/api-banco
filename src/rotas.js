const express = require("express");
const {verificarNumeroContaSenhaForamInformados,
         validarSenha, TodosOsCamposPreenchidosParaCriarConta,
        TodosOsCamposPreenchidosParaAtualizarConta}= require("./intermediarios");

const {listarContasBancarias,
        criarContaBancaria, 
        atualizarContaBancaria,
        excluirConta,
        consultarSaldo,
        consultarExtrato} = require('./controladores/contas');

const {depositar, sacar, transferir} = require('./controladores/transacoes');

const rotas = express();

rotas.get("/contas",validarSenha, listarContasBancarias);
rotas.post("/contas", TodosOsCamposPreenchidosParaCriarConta,
criarContaBancaria);
rotas.put("/contas/:numeroConta/usuario",
TodosOsCamposPreenchidosParaAtualizarConta, atualizarContaBancaria);
rotas.delete("/contas/:numeroConta", excluirConta);
rotas.post("/transacoes/depositar", depositar);
rotas.post("/transacoes/sacar", sacar);
rotas.post("/transacoes/transferir", transferir);
rotas.get("/contas/saldo", verificarNumeroContaSenhaForamInformados,consultarSaldo);
rotas.get('/contas/extrato', verificarNumeroContaSenhaForamInformados, consultarExtrato);

module.exports = rotas;