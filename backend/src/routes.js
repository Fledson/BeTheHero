const express = require('express')
// importando as informações dos controllers
const OngController = require('./controllers/OngController')
const IncidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')


const routes = express.Router()

routes.post('/sessions', SessionController.login)

// Listar Ongs
routes.get('/ongs', OngController.index)
// Adicionar Ongs
routes.post('/ongs', OngController.create)

//Listando casos especificos de uma ong
routes.get('/profile', ProfileController.index)

// Listar casos
routes.get('/casos', IncidentController.index)
// Adicionar casos
routes.post('/casos', IncidentController.create)
routes.delete('/casos/:id', IncidentController.delete)


module.exports = routes





  /**
    * Rota: Caminho completo
    * Recurso: o que vai ser acessado
  **/

  /**
   * Métodos HTTP:
   * 
   * GET: Buscar informação
   * POST: Criar uma informação
   * PUT: Altera uma informação
   * DELETE: Deleta uma informação
   */

   /**
    * Tipos de Parametros
    * 
    * Query: Parametros nomeados enviados na rota apos o simbolo de ?, servem para filtros, paginação e etc (/users?nome=fledson)
    * Routes Params: Parametros utilizados para identificar recursos (/users/:id)
    * Request Body: o corpo da requisição, usado para criar e alterar recursos (é o que sobra)
    */

    /**
     * Driver: select * from usuarios
     * Query Builder: table('users').select('*').where()
     */