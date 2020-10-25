const connection = require("../database/connection")

module.exports = {
  
  async login(request, response) {
    // PEGANDO A INFORMAÇÃO DO CORPO DA REQUISIÇÃO
    const { id } = request.body
    
    // CONSULTANDO NO BANCO
    const ong = await connection('ongs')
                      .where('id', id)
                      .select('name')
                      .first()

    // VENDO SE A ONG EXISTE
    if(!ong) {
      return response.status(400).json({ error: 'Ong não encontrada' })
    }

    return response.json(ong)
  }
}