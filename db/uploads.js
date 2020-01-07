const Sequelize = require('sequelize');
const sequelize = new Sequelize('uploadrocket', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql'
  });

const Post =  sequelize.define('upload',{
    name: {
        type: Sequelize.STRING
    },
    size:{
        type: Sequelize.INTEGER
    },
    key:{
        type: Sequelize.STRING
    },
    url:{
        type: Sequelize.STRING
    }

})

//Post.sync({force:true})

module.exports = Post