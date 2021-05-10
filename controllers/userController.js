const db = require("../database/models");
const Op = db.Sequelize.Op;
const bcrypt = require("bcryptjs");
let controller = {
    viewLogin: function (req,res){
        return res.render('login', {title: 'Página de login', path: req.originalUrl});
    }, 
    viewRegister: function (req,res){
        return res.render('register', {title: 'Página de register', path : req.originalUrl});
    },
    login:function(req,res){
        console.log(req.body);
        let data= req.body;
        
        let hashPassword = bcrypt.hashSync(req.body.user_password, 10)
        
        db.Users.findAll({
            where:{
                email:data.user_email,
                password:hashPassword,
            }
        })
        .then(function(data){
            if(data.length != 0)
            {
            res.redirect('/profile/'+data[0].id)
        }
        else{
            res.redirect('/login')
        }
            
        })
        .catch(function(err){
            console.log(err);
        })
        
    },
    store:function(req,res){
        let data = req.body;
        let passEncriptada = bcrypt.hashSync('data.password', 10)
        db.Users.create({
            name: data.name,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            gender: data.gender,
            password: passEncriptada,
            birthday: data.birthday
        });
        return res.redirect('/')

    }
}
module.exports = controller;