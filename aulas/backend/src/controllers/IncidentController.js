const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query; //buscar Query, utilizado na URL como ?

        const [count] /**retornar apenas a primeira posição */ = await connection('incidents').count(); //retorna uma array
        //console.log(count);

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id') //relacionar dados de duas tabelas
            .limit(5) //limitar a buscar para 5 incidents
            .offset((page - 1) * 5) //pular 5 registro por pagina
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.city',
                'ongs.uf'
            ]);
        response.header('X-Total-Count', count['count(*)']); //o resulta retorna no cabeçalho

        return response.json(incidents);
    },


    async create(request, response) {
        const { title, description, value } = request.body
        const ong_id = request.headers.authorization; //Tudo que caracteriza o contexto da requisição

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });
        return response.json({ id });
    },
    async delete(request, response) {
        const { id } = request.params; //pegar o id no paramento de rotas
        const ong_id = request.headers.authorization; //buscar o id da ong, para poder verificar se o incidente corresponde o incident criada pela ong
        const incident = await connection('incidents') //buscar o incident
            .where('id', id) //buscar um incident especifico, onde o id corresponde ao descrito no id
            .select('ong_id') //selecionar a coluna ong
            .first(); //retornar apenas um registro

        if (incident.ong_id != ong_id) { //verificação se o ong for diferente da aplicação que esta logada 
            return response.status(401).json({ error: 'operation not permitted.' }); //retorna um erro trocando o status do http para 401 não autorizado, com formato json
        }
        await connection('incidents').where('id', id).delete(); //deletando do banco

        return response.status(204).send(); //resposta que deu sucesso mas sem conteudo - send em
    }

};