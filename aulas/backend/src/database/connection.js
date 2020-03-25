const knex = require('knex');
const configuration = require('../../knexfile');
const connection = knex(configuration.development); //CONEXÃO DE DESENVOLVIMENTO
module.exports = connection;