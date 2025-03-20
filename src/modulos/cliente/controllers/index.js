const ClienteModel = require('../models/index');

class ClienteController{
    static async criar(requisicao, resposta){
        try {
            //Fazer a requisação, passando os dados
            const {nome_cliente, descricao, valor, prazo, status, data_criacao} = requisicao.body;
            //verificar
            if (!nome_cliente || !descricao || !valor || !prazo || !status ||!data_criacao) {
                return resposta.status(400).json({mensagem: "Todos os campos devem ser fornecidos."})
              }

            const novoOrcamento = await ClienteModel.criar(nome_cliente, descricao, valor, prazo, status, data_criacao);
            resposta.status(201).json({mensagem: "Orçamento criado com sucesso!", orcamento: novoOrcamento});

        } catch (error) {
            resposta.status(500).json({mensagem: "Erro ao criar orçamento", erro:error.message});
        }
    }

    static async editar(requisicao, resposta){
        try {
            const id = requisicao.params.id;
            const {nome_cliente, descricao, valor, prazo, status, data_criacao} = requisicao.body;
            if (!nome_cliente || !descricao || !valor || !prazo || !status ||!data_criacao) {
                return  resposta.status(400).json({msg: "Todos os campos devem ser preenchidos!"})
            }
            const orcamento = await ClienteModel.editar(id, nome_cliente, descricao, valor, prazo, status, data_criacao);
            if (orcamento.length === 0) {
                return resposta.status(400).json({msg: "Orçamento não encontrado!"});
            }
            resposta.status(200).json({msg: "Orçamento editado com sucesso!"});
        
          } catch (error) {
            resposta.status(500).json({msg:"Erro ao editar o orçamento.", erro: error.message})
          }

    }

    static async listar(requisicao, resposta){
        try {
            const orcamentos = await ClienteModel.listar();
            if(orcamentos.length === 0){
                return resposta.status(400).json({mensagem:"Não existe nenhum orçamento no banco de dados."})
              }
              resposta.status(200).json(orcamentos);

        } catch (error) {
            resposta.status(500).json({msg:"Erro ao listar os orçamentos.", erro: error.message})
        }
    }

    static async listarPorId(requisicao, resposta){
        try {
            const id = requisicao.params.id;
            const orcamento = await ClienteModel.listarPorId(id);
            if (orcamento.length === 0) {
                return resposta.status(400).json({msg: "Orçamento não encontrado!"})
              }
            resposta.status(200).json(orcamento);
            
        } catch (error) {
            resposta.status(500).json({msg:"Erro ao buscar orçamento pelo id.", erro: error.message})
        }
    }

    static async excluirPorId(requisicao, resposta){
        try {
            const id = requisicao.params.id;
            const orcamento = await AlunoModel.listarPorId(id);
            if (orcamento.length === 0) {
            return resposta.status(404).json({msg: "Orçamento não encontrado!"})
            }
            await ClienteModel.excluirPorId(id)
            resposta.status(200).json({msg:"Orçamento deletado com sucesso!"});
        
        } catch (error) {
            resposta.status(500).json({msg:"Erro ao deletar orçamento.", erro: error.message})
        }
    }
    
    static async excluirTodos(requisicao, resposta){
        try {
            await ClienteModel.excluirTodos();
            resposta.status(200).json({msg:"Todos os orçamentos foram deletados com sucesso!"});
          } catch (error) {
            resposta.status(500).json({msg:"Erro ao deletar todos os orçamentos.", erro: error.message})
          }
    }
}

module.exports = ClienteController