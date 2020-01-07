const routes = require('express').Router()
const multer = require('multer')
const multerConfig = require('./config/multer')
const Upload = require('../db/uploads')

routes.post('/posts', multer(multerConfig).single('file'), async(req, res) => {
    // const {originalname: name, size , filename: key} = req.file //desestruturação 
    const upload = await Upload.create({
        name: req.file.originalname,
        size: req.file.size,
        key: req.file.filename,
        url: ''
    })

    return res.json(upload)
})

module.exports = routes