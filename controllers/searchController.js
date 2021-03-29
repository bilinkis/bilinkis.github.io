let controller = {
    main: function (req,res){
        res.render('search', {title: 'Resultados de busqueda'});
    }

}
module.exports = controller;