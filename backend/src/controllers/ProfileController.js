const connection = require('../database/connection')

module.exports = {
  // pegar casos especificos de uma ong
  async index(request, response) {
    // pegando o id da ong que esta logada
    const ong_id = request.headers.authorization
    const caso_especifico = await connection('casos')
                                  .where('ong_id', ong_id)
                                  .select('*')
    return response.status(200).json(caso_especifico) //não esquecer de retornar a função
  }
}