
const validarSenha = (req, res, next) => {
    const { senha_banco } = req.query;

    if (senha_banco !== "Bank1234") {
        return res.status(401).json({ mensagem: "A senha do banco informada é inválida!" });
    }

    next();
}
const TodosOsCamposPreenchidosParaCriarConta = (req, res, next) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        return res.status(400).json({ mensagem: "Todos os campos são obrigátorios" });
    }

    next();
}
const TodosOsCamposPreenchidosParaAtualizarConta = (req, res, next) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        return res.status(400).json({ mensagem: "Todos os campos são obrigátorios" });
    }
    next();
}
const verificarNumeroContaSenhaForamInformados = (req, res, next) => {
    const { numero_conta, senha } = req.query;

    if (!numero_conta) {
        return res.status(400).json({
            mensagem: "O preenchimento do Numero da Conta" +
                " é obrigátorio"
        });
    }
    if (!senha) {
        return res.status(400).json({
            mensagem: "O Prechimento da senha" +
                " é obrigátorio"
        });
    }
    next();
}

module.exports = {
    validarSenha,
    verificarNumeroContaSenhaForamInformados,
    TodosOsCamposPreenchidosParaCriarConta,
    TodosOsCamposPreenchidosParaAtualizarConta,

}