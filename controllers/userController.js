let controller = {
    login: function (req,res){
        res.render('login', {title: 'Página de login'});
    }, 
    register: function (req,res){
        res.render('register', {title: 'Página de register', path : req.originalUrl});
    }
}
module.exports = controller;