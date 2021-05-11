//const { search } = require("../app");
const db = require("../database/models");
const op = db.Sequelize.Op;
let controller = {
    main: function (req,res){
        let buscador = req.query.search;
        db.Posts.findAll({
            where: [
            { title: { [op.like]:  '%'+buscador+'%' }}
            ]
        })
        .then(function(resultados){
            return res.render('search', {title: 'Resultados de búsqueda', buscador: resultados, query: req.query.search});
        })
        .catch(function(error){
            console.log(error)
        })
    }

}
module.exports = controller;