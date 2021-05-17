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
        
        let data= req.body;
        
        let hashPassword = bcrypt.hashSync(req.body.user_password, 10)
        
        db.Users.findOne({
            raw:true,
            where:{
                email: data.user_email,
                
            }
        })
        .then(function(data){
            console.log(data)
            if(data != null){
            let checkPass = bcrypt.compareSync(req.body.user_password,data.password);
            if(checkPass = true){
                req.session.user = data;
                req.session.loggedIn = true;
                res.redirect('/profile/'+data.id)
            }
            else{
                console.log(hashPassword)
                console.log(data.password)
            }
            
        }
        else{
            console.log("no hay user");
        }
        
            
        })
        .catch(function(err){
            console.log(err);
        })
        
    },
    store: function(req,res){
        let data = req.body;
        let passEncriptada = bcrypt.hashSync(data.password, 10)
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