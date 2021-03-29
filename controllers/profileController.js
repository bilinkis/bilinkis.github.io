let controller = {
    main: function (){
        res.render('profile', {title: 'Página del usuario'});
    },
    edit:function (){
        res.render('profile-edit', {title: 'Página de edición'})
    }

}
module.exports = controller;