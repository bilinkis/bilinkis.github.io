const db = require("../database/models");
const Op = db.Sequelize.Op;
const mkdirp = require('mkdirp')
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
            for(let i=0;i<values[1].length;i++){
                db.Users.findByPk(values[1][i].userId)
                .then(function(data){
                    values[1][i].user = data.dataValues;
                    console.log(values[1][i])
                })
            }
            return res.render('product', {title:"Detalle de producto", posts:values[0], comments:values[1]})
        })
            
                
            .catch(function(err){
                console.log(err)
            })
                
                
                
                    
                
            
        

                
         
    }, 
    add: function (req,res){
        return res.render('product-add', {title: 'Agregar producto', path : req.originalUrl});
    },
    saveProduct: function(req,res){
        console.log(req.files.product_file.name)
        db.Posts.create({
            title: req.body.product_name,
            description: req.body.product_description,
            image: req.files.product_file.name,
            userId: '1',
            comments:0,
        })
        .then(function(data){
            console.log(data);
        req.files.product_file.mv('public/images/products/'+req.files.product_file.name)
        .then(function(file){
            res.redirect('/product/'+ data.dataValues.id);
        })
        .catch(function(err){
            console.log(err)
        })
})


           
            
        
        .catch(function(err){
            console.log(err);
        })
    },
    edit:function(req,res){
        db.Posts.findByPk(req.params.id)
        .then(function(data){
            return res.render('product-edit', {title: "Editar producto", product:data.dataValues, path: req.originalUrl})
        })
    },
    storeEdit:function(req,res){
        db.Posts.update({
            title:req.body.product_name,
            description:req.body.product_description,
            image:req.files.product_file.name
        },{
            where: {id:req.body.id}
        })
         .then(function(data){
            console.log(data)
            req.files.product_file.mv('public/images/products/'+req.files.product_file.name)
        .then(function(file){
            res.redirect('/product/'+ req.body.id);
        })
        .catch(function(err){
            console.log(err)
        })
        })
    }
}
module.exports = controller;