let controller = {
    login: function (req,res){
        return res.render('login', {title: 'Página de login', path: req.originalUrl});
    }, 
    register: function (req,res){
        return res.render('register', {title: 'Página de register', path : req.originalUrl});
    }
}
module.exports = controller;