const express = require('express')
const app = express()
const morgan = require('morgan')
const Upload = require('../db/uploads')

app.use(express.json())
app.use(require('./routes'))
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.listen(8085, console.log('Servidor rodando na porta 8085'))