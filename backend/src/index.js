// importando o modulo express na variavel
const express = require('express')
const cors = require('cors')
const routes = require('./routes')

// instanciando a aplicação
const app = express()
//informando a aplicação que sera usado o formato JSON
app.use(cors()) //modulo de segurança
app.use(express.json())
app.use(routes)
// configurando a porta
app.listen(3333)
