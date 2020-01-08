const routes = require('express').Router()
const multer = require('multer')
const multerConfig = require('./config/multer')
const Upload = require('../db/uploads')

// exibir posts
routes.get('/posts', async (req, res) => {
    const posts = await Upload.findAll()
    return res.json(posts)
})

//criar posts 
routes.post('/posts', multer(multerConfig).single('file'), async (req, res) => {
    const { originalname: name, size, key, location: url = "" } = req.file; //desestruturação 
    const upload = await Upload.create({
        name,
        size,
        key,
        url
    })

    return res.json(upload)
})

//deletar posts
routes.delete('/posts/:id', (req, res) => {
    let id = req.params.id;
    Upload.findByPk(id).then(post => {
        post.destroy().then(() => {
            res.send('Poste deletaado')
        })
    }).catch(err => {

    })
})

module.exports = routes