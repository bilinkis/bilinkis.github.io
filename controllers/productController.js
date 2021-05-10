const db = require("../database/models");
const Op = db.Sequelize.Op;

let controller = {
    main: function (req,res){
        let posts = new Promise(function(resolve,reject){
            db.Posts.findByPk(req.params.id)
        .then(function(data){
            resolve(data);
            
        })
        .catch(function(err){
            reject();
            console.log(err);
        })
        })
        let comments = new Promise(function(resolve,reject){
            db.Comments.findAll({
                raw:true,
                where:{
                    productId: req.params.id,
                }
            })
            .then(function(data){
                
                resolve(data);
            })
            .catch(function(err){
                reject();
                console.log(err)
            })
        })
        
        Promise.all([posts,comments])
        .then(function(values){
            return res.render('product', {title:"Detalle de producto", posts:values[0], comments:values[1]})
        })
            
                
            .catch(function(err){
                console.log(err)
            })
                
                
                
                    
                
            
        

                
         
    }, 
    add: function (req,res){
        return res.render('product-add', {title: 'Agregar producto', path : req.originalUrl});
    }
}
module.exports = controller;