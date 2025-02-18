// Importando express e dotenv
const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const port = process.env.PORTA;
const app = express();

app.use(express.json());

const bancoDados = [];

//Criar uma solicitação de orçamento
app.post('/orcamentos', (requisicao, resposta) => {
    try {
      const { id, nomeCliente, descricao, valor, prazo, status } = requisicao.body;
        if (!id || !nomeCliente || !descricao || !valor || !prazo || !status) {
          return resposta.status(200).json({mensagem: "Todos os dados devem ser preenchidos."})
        }
      const novoOrcamento = { id, nomeCliente, descricao, valor, prazo, status };
      bancoDados.push(novoOrcamento);
      resposta.status(201).json({ mensagem: "Orçamento criado com sucesso!" });
    } catch (error) {
      resposta.status(500).json({msg:"Erro ao criar orçamento.", erro: error.message})
    }
  });

  //Mostar todas as solicitações de orçamentos
  app.get('/orcamentos', (requisicao, resposta) => {
    try {
      if(bancoDados.length === 0){
        return resposta.status(200).json({mensagem:"O Banco de dados está vazio!"})
      }
      resposta.status(200).json(bancoDados);
    } catch (error) {
      resposta.status(500).json({msg:"Erro ao buscar orçamentos.", erro: error.message})
    }
  });

  //Buscar uma solicitação de orçamento específica usando o ID
  app.get('/orcamentos/:id', (requisicao, resposta) => {
    try {
      const id = requisicao.params.id;
      const orcamento = bancoDados.find(elemento => elemento.id === id);
      if (!orcamento) {
        return resposta.status(404).json({msg: "Orçamento não encontrado!"})
      }
      resposta.status(200).json(orcamento);
    } catch (error) {
      resposta.status(500).json({msg:"Erro ao buscar orcamento pelo id.", erro: error.message})
    }
  });

  //Atualizar uma solicitação de orçamento
  app.put('/orcamentos/:id', (requisicao, resposta) => {
    try {
      const id = requisicao.params.id;
      const {novoNomeCliente, novaDescricao, novoValor, novoPrazo, novoStatus} = requisicao.body;
  
      if(!id){
        return resposta.status(404).json({msg:"Informe um parâmetro!"})
      };
      const orcamento = bancoDados.find(elemento => elemento.id === id);
  
      if(!orcamento){
        return resposta.status(404).json({msg:"Solicitação de orçamento não encontrada."})
      };
      if (orcamento) {
        orcamento.nomeCliente = novoNomeCliente || orcamento.nomeCliente
        orcamento.descricao = novaDescricao || orcamento.descricao
        orcamento.valor = novoValor || orcamento.valor
        orcamento.prazo = novoPrazo || orcamento.prazo
        orcamento.status = novoStatus || orcamento.status
      }
      resposta.status(200).json({msg: "Orçamento atualizado com sucesso!"})
    } catch (error) {
      resposta.status(500).json({msg:"Erro ao editar orçamento.", erro: error.message})
    }
  })

  //Excluir uma solicitação de orçamento pelo id caso o cliente desista do pedido ou seja indeferido
  app.delete("/orcamentos/:id", (requisicao, resposta) =>{
    try {
      const id = requisicao.params.id;
    const index = bancoDados.findIndex(elemento => elemento.id === id);
    if (index === -1) {
      return resposta.status(404).json({msg: "Orçamento não encontrado!"})
    }
    bancoDados.splice(index, 1);
    resposta.status(200).json({msg:"Orçamento deletado com sucesso!"});
    } catch (error) {
      resposta.status(500).json({msg:"Erro ao deletar orçamento.", erro: error.message})
    }
  })
  


  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });
  