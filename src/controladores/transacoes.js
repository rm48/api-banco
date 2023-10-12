const {contas, depositos, saques, transferencias}= require("../bancodedados");

const depositar = async (req, res)=>{
    const {numero_conta, valor} = req.body;

    if(!numero_conta || !valor){
        return res.status(400).json({mensagem: "O número da conta e o valor"+
        "são obrigatórios!"});
    }

    const contaExiste = contas.find((conta)=>{
        return conta.numero===Number(numero_conta);
    })
    if(!contaExiste){
        return res.status(404).json({mensagem:"O número da conta não foi"+
    " encontrado"});
    }
    
    if(valor<=0){
        return res.status(400).json({mensagem:"Não permitimos depositos"+ 
        " de Valores negativos ou zerados"})
    }

    contaExiste.saldo +=valor;
   
    
    const registroDeposito = {
       
        data: new Date().toLocaleString(),
        numero_conta,
        valor
    }
    
    depositos.push(registroDeposito);
   
    return res.status(204).send()
   
}

const sacar = async (req, res)=>{
    const { numero_conta, valor, senha} = req.body;

    if(!numero_conta || !valor || !senha){
        return res.status(400).json({mensagem: "Todos os campos são"
        +" de preenchimento obrigátorio"});
    }
    const contaExiste = contas.find((conta)=>{
        return conta.numero===Number(numero_conta);
    })
    if(!contaExiste){
        return res.status(404).json({mensagem:"O número da conta não foi"+
    " encontrado"});
    }
    
    if(contaExiste.usuario.senha!==senha){
        return res.status(403).json({mensagem:"Senha Incorreta!"})
    }
    if(valor>contaExiste.saldo){
        
        return res.status(400).json({mensagem:"Não há saldo suficiente para este saque!"})
    }
    if(valor<0){
        return res.status(400).json({mensagem:"O valor não pode ser menor que zero!"});
    }

    contaExiste.saldo -=valor;
    const registroSaques = {
        data: new Date().toLocaleString(),
        numero_conta,
        valor
    }

    saques.push(registroSaques);
    
    return res.status(204).send();
    
}

const transferir = async (req, res) =>{
    const {numero_conta_origem, numero_conta_destino, valor, senha} = req.body;
    if(!numero_conta_origem || !numero_conta_destino ||!valor ||!senha){
        return res.status(400).json({mensagem: "Todos os campos são"
        +" de preenchimento obrigátorio"});
    }

    const contaBancariaOrigemExiste = contas.find((conta)=>{
        return conta.numero===Number(numero_conta_origem);
    })
    if(!contaBancariaOrigemExiste){
        return res.status(404).json({mensagem:"O número da conta de origem"+
    " não foi encontrado"});
    }
    if(contaBancariaOrigemExiste.usuario.senha!==senha){
        return res.status(403).json({mensagem:"Senha Incorreta!"})
    }

    if(valor>contaBancariaOrigemExiste.saldo){
        return res.status(400).json({mesagem:"Saldo Insuficiente!"})
    }

    const contaBancariaDestinoExiste = contas.find((conta)=>{
        return conta.numero===Number(numero_conta_destino);
    })
    if(!contaBancariaDestinoExiste){
        return res.status(404).json({mensagem:"O número da conta de destino"+
    "  não foi encontrado"});
    }

    contaBancariaOrigemExiste.saldo-=valor;
    contaBancariaDestinoExiste.saldo+=valor;

    const registroTransferencia = {
        data: new Date().toLocaleString(),
        numero_conta_origem,
        numero_conta_destino,
        valor
    }
    transferencias.push(registroTransferencia);
    
    return res.status(201).send();
}

module.exports = {
    depositar,
    sacar,
    transferir
}