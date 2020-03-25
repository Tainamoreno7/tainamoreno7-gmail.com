const crypto = require('crypto'); //Utilizar um metodo para gerar um numero aleatório
const connection = require('../database/connection') //operações com o banco de dados

module.exports = {
    async index(request, response) {
        const ongs = await connection('ongs').select('*');
        return response.json(ongs);

    }, //listar todas as ongs do banco de dados

    async create(request /**Guarda os dados que vem da requisição do usuário */ , response /**Retorna uma resposta para o usuário*/ ) {
        const { name, email, whatsapp, city, uf /**desestruturação para pegar os dados em cada variavel separada, evitando que o usuário preencha algo não desejado */ } = request.body;
        const id = crypto.randomBytes(4).toString('HEX'); //vai gerar 4 bytes de caractere aletorio que vai converter em hexadecimal
        await connection('ongs').insert({
                //inserção de dados
                id,
                name,
                email,
                whatsapp,
                city,
                uf,

            })
            //const body = request.body;//acessar os dados no corpo da requisição
            //const params /**para ver todos */ = request.params;
            //const params = request.query; //acessar as requisição de um usuario especifico
            //console.log(data); //mostrar no terminal
        return response.json({ id }); //retorna só o id
    }
}; //exportar os objetos com os metodos