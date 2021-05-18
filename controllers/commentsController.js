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
        console.log(req.body)
        db.Comments.destroy({
            where: {id:req.body.commentId}
        })
        .then(function(data){
            return res.redirect(req.headers.referer)
        })
    }
}
module.exports = controller; 