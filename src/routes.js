const routes = require('express').Router()
const multer = require('multer')
const multerConfig = require('./config/multer')
const Upload = require('../db/uploads')

// exibir posts
routes.get('/posts',async (req,res)=>{
    const posts = await Upload.findAll()
    return res.json(posts)
})

//criar posts 
routes.post('/posts', multer(multerConfig).single('file'), async(req, res) => {
    // const {originalname: name, size , filename: key} = req.file //desestruturação 
    const upload = await Upload.create({
        name: req.file.originalname,
        size: req.file.size,
        key: req.file.filename,
        url: req.file.location || '' 
    })

    return res.json(upload)
})

//deletar posts
routes.get('/posts/:id',(req,res)=>{
    Upload.destroy({
        where:{
            id: req.params.id
        }
    }).then(()=>{
        res.send('Post deletado')
    })
    
})

module.exports = routes