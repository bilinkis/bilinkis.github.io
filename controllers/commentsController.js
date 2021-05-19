const db = require("../database/models");
const Op = db.Sequelize.Op;
let controller = {
    save: function(req,res){
        db.Comments.create({
            userId: res.locals.user.id,
            comment:req.body.comment,
            productId: req.body.id,
            
        })
        .then(function(data){
            db.Posts.findByPk(req.body.id)
            .then(function(post){
                db.Posts.update({
                    comments: post.dataValues.comments + 1,
                },{
                    where:{id:req.body.id}
                })
                .then(function(){
                    res.redirect(req.headers.referer)
                })
            })
            
        })
    },
    delete: function(req,res){ 
        console.log(req.body)
        db.Comments.destroy({
            where: {id:req.body.commentId}
        })
        .then(function(data){
            db.Posts.findByPk(req.body.postId)
            .then(function(post){
                db.Posts.update({
                    comments: post.dataValues.comments -1,
                },{
                    where:{id:req.body.postId}
                })
            })
            .then(function(){
                return res.redirect(req.headers.referer)
            })
            
            
        })
        .catch(function(err){
            console.log(err)
        })
    }
}
module.exports = controller; 