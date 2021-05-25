const db = require("../database/models");
const Op = db.Sequelize.Op;
const bcrypt = require("bcryptjs");

let controller = {
    main: function (req,res){
    let findUser = new Promise(function(resolve,reject){
        db.Users.findByPk(req.params.id)
        .then(function(data){
            if(data!==null){
            resolve(data);
        }else{
            return res.redirect('/404')
        }
        })
        .catch(function(err){
            reject();
        })
    })
    let findPosts = new Promise(function(resolve,reject){
        db.Posts.findAll({
            raw:true,
            where:{
                userId:req.params.id,
            }
        })
        .then(function(dataPosts){
            resolve(dataPosts);
            
        })

        .catch(function(err){
            reject()
        })
    })
    let findComments = new Promise(function(resolve,reject){
        db.Comments.findAll({
            raw:true,
            where: {
                userId:req.params.id
            },
            include: [{model:db.Posts, as:"Posts"}]
        })
        .then(function(data){
            resolve(data);
        })
        .catch(function(err){
            console.log(err);
            reject()
        })
    })
    let findFollow = new Promise(function(resolve,reject){
        if(res.locals.loggedIn == true){
            db.Followers.findOne({
                where:{followed:req.params.id,follower:res.locals.user.id},
                raw:true
            })
            .then(function(data){
                console.log(data);
                resolve(data);
            })
            .catch(function(err){
                reject()
                console.log(err);
            })
        } else{
            resolve("empty");
        }
    })
    let findAllFollowers = new Promise(function(resolve,reject){
        db.Followers.findAll({
            where:{followed:req.params.id},
            raw:true
        })
        .then(function(data){
            console.log(data);
            resolve(data)
        })
        .catch(function(err){
            console.log(err);
        })
    })
    let findAllFollowed = new Promise(function(resolve,reject){
        db.Followers.findAll({
            where:{follower:req.params.id},
            raw:true
        })
        .then(function(data){
            resolve(data)
        })
        .catch(function(err){
            reject();
            console.log(err)
        })
    })
    
    Promise.all([findUser,findPosts,findComments,findFollow,findAllFollowers,findAllFollowed])
    .then(function(values){
        
        return res.render('profile', {title:"Perfil", userData:values[0].dataValues, posts:values[1], comments:values[2],follows:values[3],followers:values[4],following:values[5]})
    })
    .catch(function(err){
        console.log(err);
    })
    },
    edit: function(req,res){
        if(res.locals.loggedIn == true){
        db.Users.findByPk(req.params.id)
        .then(function(data){
            return res.render('profile-edit-email', {title: "Cambiá tu email", user: data.dataValues, path: req.originalUrl,error:req.cookies.error})
        })
    } else{
        res.cookie("error", "needLogin", {maxAge:1000})
        return res.redirect('/login'); 
    }
    },
    storeEditEmail: function(req,res){
        console.log(req)
        db.Users.findOne({
            where: {email:req.body.email}
        })
        .then(function(user){
            if(user){
                res.cookie("error", "emailInUse", {maxAge:1000})
                res.redirect(req.headers.referer);
            }
            else{
                db.Users.update({
                    email:req.body.email,
                },{
                    where: {id:req.body.id}
                })
                 .then(function(data){
                    console.log(data)
                    res.redirect('/profile/'+ req.body.id);
                })
                .catch(function(err){
                    console.log(err)
                })
            }
        })
        
        
    },
    editPassword: function(req,res){
        if(res.locals.loggedIn == true){
        db.Users.findByPk(req.params.id)
        .then(function(data){
            return res.render('profile-edit-password', {title: "Cambiá tu password", user: data.dataValues, path: req.originalUrl})
        })
    } else{ res.cookie("error", "needLogin", {maxAge:1000});return res.redirect('/login');}
    },
    storeEditPassword: function(req,res){
        let passEncriptada = bcrypt.hashSync(req.body.password, 10)
        db.Users.update({
            password:passEncriptada,
        },{
            where: {id:req.body.id}
        })
         .then(function(data){
            console.log(data)
            res.redirect('/profile/'+ req.body.id);
        })
        .catch(function(err){
            console.log(err)
        })
        
    },
    delete: function(req, res){
        db.Comments.destroy({
            where:{userId:req.body.userId}
        })
        .then(function(){
            db.Followers.destroy({
                where:{follower:req.body.userId}
            })
        })
        .then(function(){
            db.Posts.destroy({
                where: {
                    userId: req.body.userId
                }
            })
        })
        .then(function(){
            db.Users.destroy({
                where: {
                    id: req.body.userId
                },
            })
            req.session.destroy();
            res.clearCookie("userId");
            res.clearCookie("loggedIn");
        })
        
        .then(function(){
            res.cookie("error", "erase", {maxAge:1000});
            return res.redirect('/register')
        })
        .catch(function(err){
            console.log(err)
        })
    },
    follow: function(req,res){
        if(res.locals.loggedIn == true){
        console.log(req.body);
        console.log(res.locals.user.id)
        db.Followers.create({
            followed: req.body.followed,
            follower: res.locals.user.id,
        })
        .then(function(data){
            db.Users.findOne({
                raw: true, 
                where: {id:req.body.followed}
            })
                .then(function (followedUser){
                    db.Users.update({
                        followers: followedUser.followers +1
                    },
                    {
                        where: {id:req.body.followed}
                    })
                    .then (function(){
                        db.Users.update({
                            following: res.locals.user.following +1
                        },
                        {
                            where: {id: res.locals.user.id}
                        })
                        .then(function(){
                            return res.redirect(req.headers.referer);
                        })
                    })
                })
            
           
        })
        .catch(function(err){
            console.log(err)
        })
    } else{
        res.cookie("error", "needLogin", {maxAge:1000});return res.redirect('/login');
    }
    },
    unfollow: function(req,res){
        if(res.locals.loggedIn == true){
        db.Followers.destroy({
            where:{followed:req.body.followed,follower:res.locals.user.id}
        })
        .then(function(data){
            return res.redirect(req.headers.referer);
        })
        .catch(function(err){
            console.log(err)
        })
    }else{
        res.cookie("error", "needLogin", {maxAge:1000});return res.redirect('/login');
    }
    },
    followers:function(req,res){
        let findUser = new Promise(function(resolve,reject){
            db.Users.findByPk(req.params.id)
            .then(function(data){
                if(data!==null){
                resolve(data);
            }else{
                return res.redirect('/404')
            }
            })
            .catch(function(err){
                reject();
            })
        });
        let findFollowers = new Promise(function(resolve,reject){
            db.Followers.findAll({
                where:{followed:req.params.id},
                raw:true,
                include:[{model:db.Users, as:"userFollower"}]
            })
            .then(function(data){
                resolve(data)
            })
            .catch(function(err){
                console.log(err)
                reject()
            })
        })
        Promise.all([findUser, findFollowers])
        .then(function(values){
            return res.render("followers",{title:"Seguidores",userData:values[0],followers:values[1]})
        })
    },
    following:function(req,res){
        let findUser = new Promise(function(resolve,reject){
            db.Users.findByPk(req.params.id)
            .then(function(data){
                if(data!==null){
                resolve(data);
            }else{
                return res.redirect('/404')
            }
            })
            .catch(function(err){
                reject();
            })
        });
        let findFollowers = new Promise(function(resolve,reject){
            db.Followers.findAll({
                where:{follower:req.params.id},
                raw:true,
                include:[{model:db.Users, as:"userFollowed"}]
            })
            .then(function(data){
                resolve(data)
            })
            .catch(function(err){
                console.log(err)
                reject()
            })
        })
        Promise.all([findUser, findFollowers])
        .then(function(values){
            return res.render("following",{title:"Seguidos",userData:values[0],following:values[1]})
        })
    }
}
module.exports = controller;