// importando o knex
const knex = require('knex')
// importando as configurações
const configuration = require('../../knexfile')

// criando a conexão, development esta no arquivo do knex
const connection = knex(configuration.development)

// exportando a conexão
module.exports = connection;