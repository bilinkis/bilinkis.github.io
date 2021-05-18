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
            res.redirect(req.headers.referer)
        })
    },
    delete: function(req,res){
        db.Comments.delete({
            userId: res.locals.user.id,
            comment: req.body.comment,
            productId: req.body.id
        })
        .then(function(data){
            return res.redirect('/product/' + posts.id )
        })
    }
}
module.exports = controller; 