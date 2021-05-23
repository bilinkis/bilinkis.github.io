const db = require("../database/models");
const Op = db.Sequelize.Op;
let controller = {
    main: function (req, res){
        let findLatestProducts = new Promise(function(resolve,reject){
            db.Posts.findAll({
                raw:true,
            limit: 8,
            order: [ [ 'id', 'DESC' ]],
            include:[{model:db.Users,as:"user"}]
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
                order: [ [ 'comments', 'DESC' ]],
                include:[{model:db.Users,as:"user"}]

            })
            .then(function(data){
                resolve(data);
            })
            .catch(function(err){
                reject();
                console.log(err);
            })
        })
        let findPostsByFollowed = new Promise(function(resolve,reject){
            if(res.locals.loggedIn == true){
            db.Followers.findAll({
                raw:true,
                where:{follower:res.locals.user.id},
                include:[{model:db.Posts,as:"Posts"},{model:db.Users,as:"author"}]
            })
            .then(function(following){
            console.log(following)
            resolve(following)
            })
            .catch(function(err){
                console.log(err);
                reject();
            })
        } else{
            resolve("notLogged")
        }
        })
        Promise.all([findLatestProducts,findMostCommented,findPostsByFollowed])
        .then(function(values){
            
            return res.render('index', {title: 'Home', latestProducts:values[0], mostCommented:values[1],followingPosts:values[2]});
        })
        .catch(function(err){
            console.log(err);
        })
        
    },
    error404: function(req,res){
        return res.render('404',{title:"Error 404!"})
    }
}
module.exports = controller;