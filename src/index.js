require('dotenv').config()

const express = require('express')
const app = express()
const morgan = require('morgan')
const path = require('path')

app.use(express.json())
app.use(require('./routes'))
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use('/files',express.static(path.resolve(__dirname,'../tmp/uploads')))

app.listen(8085, console.log('Servidor rodando na porta 8085'))