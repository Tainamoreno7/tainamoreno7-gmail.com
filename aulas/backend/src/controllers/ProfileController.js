const connection = require('../database/connection');

module.exports = {
    async index(request, response) {

        const ong_id = request.headers.authorization; //Tudo que caracteriza o contexto da requisição no cabeçalho
        const incidents = await connection('incidents')
            .where('ong_id', ong_id)
            .select('*');

        return response.json(incidents);

    }
}