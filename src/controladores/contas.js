const {contas, saques, depositos, transferencias} = require('../bancodedados');

let numero = 1;


const listarContasBancarias = async(req, res) => {
    res.status(200).json(contas);
}

const criarContaBancaria = async(req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
      
    const encontraCpf = contas.find((pessoa)=>{
        return pessoa.usuario.cpf===Number(cpf);
    })
    
    const encontraEmail = contas.find((pessoa)=>{
        return pessoa.usuario.email===email;
    })
      if(encontraCpf){
        return res.status(400).json({mensagem:"Já existe uma conta com o cpf informado!"})
      }
      if(encontraEmail){
        return res.status(400).json({mensagem:"Já existe uma conta com o email informado!"})
      }
        const novaConta = {
            numero,
            saldo:0,
            usuario:{nome, cpf,data_nascimento,telefone,email,senha}
            
        }
            numero++;
            contas.push(novaConta);
       
            return res.status(201).send();
     }
    
    const atualizarContaBancaria = async (req, res)=>{
        const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
        const {numeroConta} = req.params;
        
        const numeroContaValido= contas.find((conta)=>{
            return conta.numero===Number(numeroConta);
        });

        if(!numeroContaValido){
            return res.status(400).json({mensagem: "Número da conta Inválido!"})
        }
        const encontraCpf = contas.find((pessoa)=>{
            return pessoa.usuario.cpf===Number(cpf);
        })
        
        const encontraEmail = contas.find((pessoa)=>{
            return pessoa.usuario.email===email;
        })
          if(encontraCpf){
            return res.status(400).json({mensagem:"O CPF informado já existe cadastrado!"})
          }
          if(encontraEmail){
            return res.status(400).json({mensagem:"O Email informado já existe cadastrado!"})
          }
          
          numeroContaValido.usuario.nome=nome;
          numeroContaValido.usuario.cpf= cpf;
          numeroContaValido.usuario.data_nascimento=data_nascimento;
          numeroContaValido.usuario.telefone=telefone;
          numeroContaValido.usuario.email= email;
          numeroContaValido.usuario.senha=senha;

        return res.status(200).send();

    }
   
    const excluirConta = async(req, res)=>{
        const {numeroConta}= req.params
        const numeroContaValido= contas.find((conta)=>{
            return conta.numero===Number(numeroConta);
        });

        if(!numeroContaValido){
            return res.status(404).json({mensagem: "Número da conta Inválido!"})
        }
        if(numeroContaValido.saldo !== 0){
            
            return res.status(400).json({mensagem:"A conta só pode ser removida"+
            " se o saldo for zero!"})
        }

        const indiceConta = contas.findIndex((conta)=>{

            return conta.numero===Number(numeroConta)});

        
        contas.splice(indiceConta, 1);

        return res.status(204).send();
    }

const consultarSaldo = async(req, res)=>{
    const {numero_conta, senha} = req.query;
    const contaBancariaExiste= contas.find((conta)=>{
        return conta.numero===Number(numero_conta);
    });

    if(!contaBancariaExiste){
        return res.status(404).json({mensagem:"Conta bancária não encontrada"});
    }
    if(contaBancariaExiste.usuario.senha!==String(senha)){
        return res.status(403).json({mensagem:"Senha Incorreta!"})
    }
    
    res.status(200).json({saldo:contaBancariaExiste.saldo});
}

const consultarExtrato = async(req, res)=>{
    const {numero_conta, senha } = req.query

    const contaBancariaExiste= contas.find((conta)=>{
        return conta.numero===Number(numero_conta);
    });

    if(!contaBancariaExiste){
        return res.status(404).json({mensagem:"Conta bancária não encontrada"});
    }
    if(contaBancariaExiste.usuario.senha!==String(senha)){
        return res.status(403).json({mensagem:"Senha Incorreta!"})
    }

    const filtroDepositos = depositos.filter((deposito)=>{
        return deposito.numero_conta===Number(numero_conta);
    });

    const filtroSaques = saques.filter((saque)=>{
        return saque.numero_conta===Number(numero_conta);
    });
    const filtrarTransferenciasEnviadas=transferencias.filter((transferencia)=>{
        return transferencia.numero_conta_origem===Number(numero_conta);
    });

    const filtrarTransferenciasRecebidas=transferencias.filter((transferencia)=>{
        return transferencia.numero_conta_origem!==Number(numero_conta);
    });
    
    return res.status(200).json({depositos:filtroDepositos, 
    saques:filtroSaques, transferenciasEnviadas:filtrarTransferenciasEnviadas,
    transferenciasRecebidas:filtrarTransferenciasRecebidas});
}

module.exports = {
    listarContasBancarias,
    criarContaBancaria,
    atualizarContaBancaria,
    excluirConta,
    consultarSaldo,
    consultarExtrato
}