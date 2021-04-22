let controller = {
    main: function (req,res){
        res.render('profile', {title: 'Página del usuario'});
    },
    edit:function (req,res){
        res.render('profile-edit-email', {title: 'Cambiá tu email', path: req.originalUrl});
    },
    editPassword: function (req,res){
        res.render('profile-edit-password',{title: 'Cambiá tu contraseña', path: req.originalUrl})

}
}
module.exports = controller;