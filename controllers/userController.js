const db = require("../database/models");
const Op = db.Sequelize.Op;
const bcrypt = require("bcryptjs");
var multer = require("multer");
var fs = require("fs");
var path = require("path");
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "public/images/users");
  },
  filename: function (req, file, callback) {
    callback(null, "user-" + Date.now() + path.extname(file.originalname));
  },
});
var upload = multer({ storage: storage }).single("user_file");
let controller = {
  viewLogin: function (req, res) {
    if(res.locals.loggedIn == null){
      return res.render("login", {
        title: "Página de login",
        path: req.originalUrl,
        error: req.cookies.error,
      });
    } else{
        res.redirect('/profile/'+res.locals.user.id)
    }
    
  },
  viewRegister: function (req, res) {
    if (res.locals.loggedIn == null) {
      return res.render("register", {
        title: "Página de register",
        path: req.originalUrl,
        error: req.cookies.error
      });
    } else {
      return res.redirect("/profile/" + res.locals.user.id);
    }
  },
  login: function (req, res) {
    let data = req.body;

    let hashPassword = bcrypt.hashSync(req.body.user_password, 10);

    db.Users.findOne({
      raw: true,
      where: {
        email: data.user_email,
      },
    })
      .then(function (data) {
        console.log(data);
        if (data) {
            console.log(data);
          let checkPass = bcrypt.compareSync(
            req.body.user_password,
            data.password
          );
          console.log("pass:"+checkPass);
          if (checkPass == true) {
            if (req.body.rememberme != undefined) {
                res.cookie("userId", data.id, { maxAge: 1000 * 60 * 5 });
              }
            
            req.session.user = data;
            req.session.loggedIn = true;
            req.session.save();
            
            return res.redirect("/profile/" + data.id);
          } else {
            
            res.cookie("error", "nopassword", {maxAge:1000});
            return res.redirect("/login");
          }
        } else {
          console.log("no hay email");
          res.cookie("error", "noemail", {maxAge:1000});
          return res.redirect("/login");
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  },
  store: function (req, res) {
    upload(req, res, function (err) {
      if (err) {
        console.log(err);
      }
      let data = req.body;
      let passEncriptada = bcrypt.hashSync(req.body.password, 10);
      db.Users.findOne({
        where:{email:data.email}
      })
      .then(function(user){
        if(user == null){
          db.Users.create({
            name: data.name,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            gender: data.gender,
            password: passEncriptada,
            birthday: data.birthday,
            image: req.file.filename,
            followers: 0,
            following: 0,
            commentsPosted: 0,
            commentsReceived: 0,
            postsQuantity: 0
          })
          .then(function(){
            res.cookie("error", "registerOk", {maxAge:1000});
            return res.redirect("/login");
          })
          .catch(function(err){
            console.log(err)
          })
        } else{
          res.cookie("error", "registerNo", {maxAge:1000});
            return res.redirect("/login");
        }
      })
      .catch(function(err){
        console.log(err)
      })
      
    });
  },
  logout: function (req, res) {
    req.session.destroy();
    res.clearCookie("userId");
    res.clearCookie("loggedIn");
    return res.redirect("/");
  },
};
module.exports = controller;
