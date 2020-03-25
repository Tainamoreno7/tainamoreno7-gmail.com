https: //github.com/Tainamoreno7/semanaomniStack11.gitconst express = require('express'); //Importando o modulo express para dentro da variavel express
    const cors = require('cors');
const routes = require('./routes'); //importar as routas de dentro do arquivo routes ./ para referenciar um caminho relativo sendo a mesma pasta do arquivo index 

const app = express(); //Aplicação terá as rotas 

app.use(cors()); //permitir que todas as aplicações frontend tenha acesso a esse backend
app.use(express.json());
app.use(routes);
/*
 *ROta/ Recurso
 */
/*
 * Métodos HTTP:
 * GET: Buscar/listar uma informação do back-end - para acessar a rota no navegador
 * POST: Criar uma informação no back-end
 * PUT: Alterar uma informação no back-end
 * DELETE: Deletar uma informação no back-end
 */
/*
 * Tipos de parâmetros 
 * Query Params: Parâmetros nomeaddos enviados na rota após "?" (servem para filtro,paginação - ?page=2&name=Tainá)
 * Route Params: Parâmetros utilizados pra identicar recursos, ex: dados de um unico recurso (usuário)
 * Request Body: Corpo da Requisição, utilizado para criar ou alterar recursos.
 * 
 */

/**
 * SQL: MySQL, SQLite, PostgreSQL...
 * NoSQL?: MongoDB, CouchDB
 */
/**
 * Comunicação com Banco de dados
 * Driver: SELECT * FROM users
 * Query Builder: table('user').select('*').where()
 */



app.listen(3333); //ouvindo a aplicação na porta 3333