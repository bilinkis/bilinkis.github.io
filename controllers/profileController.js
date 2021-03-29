let controller = {
    main: function (req,res){
        res.render('profile', {title: 'Página del usuario'});
    },
    edit:function (req,res){
        res.render('profile-edit', {title: 'Página de edición'})
    }

}
module.exports = controller;