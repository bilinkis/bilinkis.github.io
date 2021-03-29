let controller = {
    login: function (){
        res.render('login', {title: 'Página de login'});
    }, 
    register: function (){
        res.render('register', {title: 'Página de register'});
    }
}
module.exports = controller;