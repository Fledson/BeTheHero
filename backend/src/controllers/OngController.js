// importando a ferramenta
const crypto = require('crypto')
// importando a conexão nos arquivos que precisa de conexão com o banco
const connection = require('../database/connection')

module.exports = {
    //  ================= Listando as Ongs ===================== 
    async index(require, response) {
      //Select trazendo todas as ongs (Sintaxe do Knex)
      const ongs = await connection('ongs').select('*')
      //Retornando os dados em Json
      return response.json(ongs)
    },

    //  ================= Criando as Ongs ===================== 
    async create(request, response) {
      // pegando os dados usando desistruturação
    const { name, email, whatsapp, city, uf } = request.body

    // usando o crypto para gerar um numero aleatorio para o ID (ver documentação)
    const id = crypto.randomBytes(4).toString('HEX')

    // inserindo dados
    await connection('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf,
    })

    return response.json({ id })
  }
}