const { search } = require("../app");
const db = require("../database/models");
const op = db.Sequelize.Op;
let controller = {
    main: function (req,res){
        let search = req.query.search;
        db.Posts.findAll({
            where: [
            { title: { [op.like]:  '%'+search+'%' }}
            ]
        })
        .then(function(resultados){
            return res.render('search', {title: 'Resultados de búsqueda', search: search});
        })
        .catch(function(error){
            console.log(error)
        })
    }

}
module.exports = controller;