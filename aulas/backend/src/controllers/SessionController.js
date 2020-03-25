const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { id } = request.body; //vai buscar no corpo da requisição

        const ong = await connection('ongs') //buscar a ong no banco
            .where('id', id) //verificar se id é igual a que recebeu 
            .select('name') //selecionar e retonar o nome para o frontend
            .first(); //Assim não retorna uma array só retorna um resultado

        if (!ong) { // se não existir, retornar o erro de algo deu errado
            return response.status(400).json({ error: 'No ONG found with this ID' });
        }

        return response.json(ong);
    }
}