Atividade sobre CRUD - Sistema de Gestão de Solicitações de Orçamento

Descrição

Este projeto é uma atividade prática para o desenvolvimento de um CRUD utilizando Node.js e Express. O sistema permite a gestão de solicitações de orçamento para reformas, incluindo operações de criação, leitura, atualização e exclusão.

Tecnologias Utilizadas

Node.js

Express

Dotenv

Instalação

Clone o repositório:

git clone https://github.com/seu-repositorio.git

Acesse a pasta do projeto:

cd nome-do-projeto

Instale as dependências:

npm install

Crie um arquivo .env e defina a porta:

PORTA=coloqueSuaPortaAqui

Inicie o servidor:

npm start

Endpoints da API

O sistema fornece endpoints para realizar operações CRUD em solicitações de orçamento. As requisições devem seguir o formato JSON e incluir os dados necessários para cada operação.

Endpoints disponíveis:

POST /orcamentos - Criar uma nova solicitação de orçamento.

GET /orcamentos - Obter todas as solicitações cadastradas.

GET /orcamentos/:id - Obter uma solicitação específica pelo ID.

PUT /orcamentos/:id - Atualizar informações de uma solicitação.

DELETE /orcamentos/:id - Remover uma solicitação do sistema.

Autor

Desenvolvido por Beatriz Collier