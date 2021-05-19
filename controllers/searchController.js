//const { search } = require("../app");
const db = require("../database/models");
const op = db.Sequelize.Op;
let controller = {
    main: function (req,res){
        let buscador = req.query.search;
        db.Posts.findAll({
            where: [
            { title: { [op.like]:  '%'+buscador+'%' }}
            ],
            raw:true,
            include: [{model:db.Users, as:"user"}]
        })
        .then(function(resultados){
            console.log(resultados)
            return res.render('search', {title: 'Resultados de búsqueda', buscador: resultados, query: req.query.search});
        })
        .catch(function(error){
            console.log(error)
        })
    }

}
module.exports = controller;