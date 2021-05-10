const db = require("../database/models");
const Op = db.Sequelize.Op;
let controller = {
    main: function (req, res){
        let findLatestProducts = new Promise(function(resolve,reject){
            db.Posts.findAll({
            limit: 8,
            order: [ [ 'id', 'DESC' ]]
    })
            .then(function(data){
            resolve(data);
            })
            .catch(function(err){
                reject();
                console.log(err);
            })
        })
        let findMostCommented = new Promise(function(resolve,reject){
            db.Posts.findAll({
                raw:true,
                limit:8,
                order: [ [ 'comments', 'DESC' ]]

            })
            .then(function(data){
                resolve(data);
            })
            .catch(function(err){
                reject();
                console.log(err);
            })
        })
        Promise.all([findLatestProducts,findMostCommented])
        .then(function(values){
            console.log(values[0].title)
            return res.render('index', {title: 'Home', latestProducts:values[0], mostCommented:values[1]});
        })
        .catch(function(err){
            console.log(err);
        })
        
    }
}
module.exports = controller;