const {pool} = require('../../../config/database');

class ClienteModel{
    static async criar(nome_cliente, descricao, valor, prazo, status, data_criacao){
        const dados = [nome_cliente, descricao, valor, prazo, status, data_criacao];
        const consulta = `insert into orcamento(nome_cliente, descricao, valor, prazo, status, data_criacao)
                          values ($1, $2, $3, $4, $5, $6) returning *`;
        const novoOrcamento = await pool.query(consulta, dados);
        return novoOrcamento.rows;

    }
    static async editar(id, nome_cliente, descricao, valor, prazo, status, data_criacao){
        const dados = [id, nome_cliente, descricao, valor, prazo, status, data_criacao];
        const consulta = `update orcamento set nome_cliente = $2, descricao = $3, valor = $4, prazo = $5, status = $6, data_criacao = $7  where id = $1 returning *`;
        const orcamentoAtualizado = await pool.query(consulta, dados);
        return orcamentoAtualizado.rows;

    }
    static async listar(){
        const consulta = `select * from orcamento`;
        const orcamentos = await pool.query(consulta);
        return orcamentos.rows;
    }
    static async listarPorId(id){
        const dados = [id];
        const consulta = `select * from orcamento where id = $1`;
        const orcamento = await pool.query(consulta, dados);
        return orcamento.rows;
    }
    static async excluirPorId(id){
        const dados = [id];
        const consulta = `delete from orcamento where id = $1`;
        await pool.query(consulta, dados);

    }
    static async excluirTodos(){
        const consulta = `delete from orcamento`;
        await pool.query(consulta);
    }
}

module.exports = ClienteModel