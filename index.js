// Importando express e dotenv
const express = require('express');
const dotenv = require('dotenv');

//Importando o banco de dados
const {pool} = require('./src/config/database');

dotenv.config();

const port = process.env.PORTA;
const app = express();

app.use(express.json());


//Criar uma solicitação de orçamento
app.post('/orcamentos', async (requisicao, resposta) => {
    try {
      //apenas enviando a requisição para os servidor, ainda sem armazenar
      const { nome_cliente, descricao, valor, prazo, status, data_criacao } = requisicao.body; //desestrutura uma variável, transforma em um objeto.
      //verificando se todos os dados foram preenchidos
      if (!nome_cliente || !descricao || !valor || !prazo || !status || !data_criacao) {
      return resposta.status(200).json({mensagem: "Todos os dados devem ser preenchidos."})
    }
    //armazenando os dados da requisição
    const dados = [nome_cliente, descricao, valor, prazo, status, data_criacao]; //passa como array, não mais como objeto.
    const consulta = `insert into orcamento (nome_cliente, descricao, valor, prazo, status, data_criacao)
                      values ($1, $2, $3, $4, $5, $6) returning *`

    const resultado = await pool.query(consulta, dados);
    resposta.status(201).json({ mensagem: "Orçamento criado com sucesso!" });
    
    } catch (error) {
      resposta.status(500).json({msg:"Erro ao criar orçamento.", erro: error.message})
    }
  });

  //Mostar todas as solicitações de orçamentos
  app.get('/orcamentos', async (requisicao, resposta) => {
   try {
    const consulta = `select * from orcamento`;
    const orcamentos = await pool.query(consulta);

    //Verificando a quantidade de linhas
    if(orcamentos.rows.length === 0){
      return resposta.status(200).json({mensagem:"Banco de dados vazio!"})
    }
    resposta.status(200).json(orcamentos.rows);

   } catch (error) {
    resposta.status(500).json({msg:"Erro ao buscar orçamentos.", erro: error.message})
   }
   
  });


  //Buscar uma solicitação de orçamento específica usando o ID
  app.get('/orcamentos/:id', async (requisicao, resposta) => {
    try {
      const id = requisicao.params.id;
      const dados1 = [id];
      const consulta1 = `select * from orcamento where id = $1`
      const resultado1 = await pool.query(consulta1, dados1);

    if (resultado1.rows.length === 0) {
      return resposta.status(404).json({msg: "Orçamento não encontrado!"})
    }
    resposta.status(200).json(resultado1.rows[0]);
    } catch (error) {
      resposta.status(500).json({msg:"Erro ao buscar orcamento pelo id.", erro: error.message})
    }
  });

  //Atualizar uma solicitação de orçamento
  app.put('/orcamentos/:id', async (requisicao, resposta) => {
    try {
      const id = requisicao.params.id;
      const {novoNomeCliente, novaDescricao, novoValor, novoPrazo, novoStatus, novaDataCriacao} = requisicao.body;
  
      if(!id){
        return resposta.status(404).json({msg:"Informe um parâmetro!"})
      };
      //Verificar se tem o id no banco
      const dados1 = [id]
      const consulta = `select * from orcamento where id = $1`;
      const resultado = await pool.query(consulta, dados1)
      if (resultado.rows.length === 0) {
        return resposta.status(404).json({msg:"Orçamento não encontrado."})
      }

      //Alterar os dados
      const dados2 = [id, novoNomeCliente, novaDescricao, novoValor, novoPrazo, novoStatus, novaDataCriacao];
      const consulta2 = `update orcamento set nome_cliente = $2, descricao = $3, valor = $4, prazo = $5, status = $6, data_criacao = $7 where id = $1 returning *`
      await pool.query(consulta2, dados2);

      resposta.status(200).json({msg: "Orçamento atualizado com sucesso!"})

    } catch (error) {
      resposta.status(500).json({msg:"Erro ao editar orçamento.", erro: error.message})
    }
  })

  //Excluir uma solicitação de orçamento pelo id caso o cliente desista do pedido ou seja indeferido
  app.delete("/orcamentos/:id", async (requisicao, resposta) =>{
    try {
      const id = requisicao.params.id;
      const dados1 = [id]
      const consulta1 = `select * from orcamento where id = $1`
      const resultado1 = await pool.query(consulta1, dados1);

      if (resultado1.rows.length === 0) {
      return resposta.status(404).json({msg: "Orçamento não encontrado!"})
    }
    const dados2 = [id]
    const consulta2 = `delete from orcamento where id = $1`
    await pool.query(consulta2, dados2)
    resposta.status(200).json({msg:"Orçamento deletado com sucesso!"});

    } catch (error) {
      resposta.status(500).json({msg:"Erro ao deletar orçamento.", erro: error.message})
    }
  })

  //Excluir todas as solicitações
  app.delete("/orcamentos", async(requisicao, resposta) =>{
    try {
      const consulta = `delete from orcamento`
      await pool.query(consulta)
      resposta.status(200).json({msg:"Todos os orçamentos foram deletados com sucesso!"});
    } catch (error) {
      resposta.status(500).json({msg:"Erro ao deletar todos os orçamentos.", erro: error.message})
    }
  })


  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });
  