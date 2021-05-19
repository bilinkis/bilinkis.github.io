const db = require("../database/models");
const Op = db.Sequelize.Op;
var multer = require('multer');
var fs = require('fs');
var path = require('path');
const Users = require("../database/models/Users");
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    
            callback(null, 'public/images/products');
        },
  filename: function (req, file, callback) {
    callback(null,  'product-' + Date.now() + path.extname(file.originalname));
  }
});
var upload = multer({ storage : storage}).single('product_file');



let controller = {
    main: function (req,res){
        let posts = new Promise(function(resolve,reject){
            db.Posts.findOne({
                where:{id:req.params.id},
                raw:true
            })
        .then(function(data){
            
            db.Users.findByPk(data.userId)
            .then(function(user){
                
                data.user = user.dataValues;
                resolve(data);
            })
            
            
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
                },
                include: [{model:db.Users, as:"user"}]
                
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
            console.log(values);
            return res.render('product', {title:"Detalle de producto", posts:values[0], comments:values[1]})
        })
            
                
            .catch(function(err){
                console.log(err)
            })
                
                
                
                    
                
            
        

                
         
    }, 
    add: function (req,res){
        if(res.locals.loggedIn == true){
        return res.render('product-add', {title: 'Agregar producto', path : req.originalUrl});
    }else{
        return res.redirect('/login')
    }
    },
    saveProduct: function(req,res){
        
        
        upload(req,res,function(err) {
            
        if(err) {
            console.log(err);
        }
        db.Posts.create({
            title: req.body.product_name,
            description: req.body.product_description,
            image: req.file.filename,
            userId: res.locals.user.id,
            comments:0,
        })
        .then(function(data){
            console.log(data);
        
    
            res.redirect('/product/'+ data.dataValues.id);
        })
        .catch(function(err){
            console.log(err)
        })
    });
        
        



           
            
        
        
    },
    edit: function(req,res){
        if (res.locals.loggedIn == true){
            db.Posts.findByPk(req.params.id)
        .then(function(data){
            return res.render('product-edit', {title: "Editar producto", product:data.dataValues, path: req.originalUrl})
        })
        }
        else {
            return res.redirect('/login')
        }
        
    },
    storeEdit: function(req,res){
            upload(req,res,function(err) {
            
                if(err) {
                    console.log(err);
                }
                if(req.body.product_file){
                db.Posts.update({
                    title:req.body.product_name,
                    description:req.body.product_description,
                    image:req.file.filename
                },{
                    where: {id:req.body.id}
                })
                .then(function(data){
                    console.log(data);
                
            
                    return res.redirect('/product/'+ req.body.id);
                })
                
                
                .catch(function(err){
                    console.log(err)
                
                })
            } else{
                db.Posts.update({
                    title:req.body.product_name,
                    description:req.body.product_description,
                },{
                    where: {id:req.body.id}
                })
                .then(function(data){
                    console.log(data);
                
            
                    return res.redirect('/product/'+req.body.id);
                })
                
                
                .catch(function(err){
                    console.log(err)
                
                })
            }
            })
        
            
                
                
            
        
        
},
delete: function(req, res){
    db.Comments.destroy({
        where:{productId:req.body.postId}
    }).then(function(){
        db.Posts.destroy({
            where: {
                id: req.body.postId
            },
            include:[{model:db.Comments, as:"Comments"}]
    })
    })
    
    .then(function(){
        return res.redirect('/')
    })
    .catch(function(err){
        console.log(err)
    })
}
}
module.exports = controller;