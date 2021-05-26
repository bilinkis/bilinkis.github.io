const db = require("../database/models");
const Op = db.Sequelize.Op;

let controller = {
    main: function(req, res){
        let mostFollowed = new Promise(function(resolve, reject){
            db.Users.findAll({
                raw: true, 
                limit: 8,
                order: [ ['followers', 'DESC']],
            })
            .then(function(data){
                resolve(data);
            })
            .catch(function(error){
                reject();
                console.log(error);
            })
        })
        let following = new Promise(function(resolve, reject){
            db.Users.findAll({
                raw: true, 
                limit: 8,
                order: [ ['following', 'DESC']],
            })
            .then(function(data){
                resolve(data);
            })
            .catch(function(error){
                reject();
                console.log(error);
            })
        })
        let mostCommentsPosted = new Promise(function(resolve, reject){
            db.Users.findAll({
                raw: true, 
                limit: 8,
                order: [ ['commentsPosted', 'DESC']],
            })
            .then(function(data){
                resolve(data);
            })
            .catch(function(error){
                reject();
                console.log(error);
            })
        })
        let mostCommentsReceived = new Promise(function(resolve, reject){
            db.Users.findAll({
                raw: true, 
                limit: 8,
                order: [ ['commentsReceived', 'DESC']],
            })
            .then(function(data){
                resolve(data);
            })
            .catch(function(error){
                reject();
                console.log(error);
            })
        })
        let mostPosts = new Promise(function(resolve, reject){
            db.Posts.findAll({
                raw: true, 
                limit: 8,
                order: [ ['postsQuantity', 'DESC']],
                include:[{}]
            })
            .then(function(data){
                resolve(data);
            })
            .catch(function(error){
                reject();
                console.log(error);
            })
        })
        Promise.all([mostFollowed, following, mostCommentsPosted, mostCommentsReceived, mostPosts])
        .then(function(values){
            return res.render('ranking', {title: 'Ranking de usuarios', mostFollowed: values[0], following:values[1], mostCommentsPosted:values[2], mostCommentsReceived: values[3], mostPosts: values[4]})
        })
        .catch(function(error){
            console.log(error);
        })
    }

}

module.exports = controller;