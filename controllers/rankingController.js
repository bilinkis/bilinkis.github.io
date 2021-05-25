const db = require("../database/models");
const Op = db.Sequelize.Op;

let controller = {
    main: function(req, res){
        return res.render('ranking')
    }

}

module.exports = controller;