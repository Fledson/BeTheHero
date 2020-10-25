const { count } = require('../database/connection')
const connection = require('../database/connection')

module.exports = {

  //  ================= Listando os casos ===================== 
  async index(request, response) {

    // ================ Configuração de paginação =============
        // criando a paginação
        const {page = 1} = request.query
        // Contando a quantidade de registros de casos
        const [total] = await connection('casos').count()
        //passsando o total de registros usando o cabecalho de resposta
        response.header('X-Total-Count', total['count(*)'])
    // ============= Fim de configuração de paginação =========
    
    // A constante casos recebe a consulta feita (sintaxe do knex)
    const casos = await connection('casos')
      .join('ongs', 'ongs.id', '=', 'casos.ong_id')
      .limit(5) //defindo o limite por pagina
      .offset((page - 1) * 5) //pulando registro por pagina
      .select([
        'casos.*',
        'ongs.name', 
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf'
      ])
    // retorna a consulta em formato JSON
    return response.json(casos)
  },


  //  ================= Criando os casos ===================== 
  async create(request, response) {
    // pegando os dados separados
    const { title, description, value } = request.body
    // pegando o id da ong logada no momento
    const ong_id = request.headers.authorization

    // pegando o id de criação da ONG e armazenando na variavel id
    // comando de insert 
    const [id] = await connection('casos').insert({
      title,
      description,
      value,
      ong_id,
    })

    return response.json({ id })
  },

  //  ================= Deletando os casos ===================== 
  async delete(request, response) {
    // pegando o id que vem no request
    const { id } = request.params
    // pegando o id da ong que esta logada no momento headers.authorization
    const ong_id = request.headers.authorization

    //  Buscando um caso de dentro da tabela "CASOS"
    const caso = await connection('casos')
      .where('id', id) //onde o id for igual ao id passado
      .select('ong_id') // seleciona apenas a coluna especificado
      .first() // retorna apenas o primeiro

    // verificando se o caso pertence a ong que esta logada no momento
    if (caso.ong_id !== ong_id ) {
      // usando o HTTP status, 401 é não autorizado
      // em caso de duvidas consultar a lista no google
      return response.status(401).json({ error: 'Operação não é permitida.' })
    }

    // comando para deletar o caso selecionado
    await connection('casos').where('id', id).delete()
    // o status 204 retorna uma resposta sem conteuro para o front
    return response.status(204).send()
  }
}