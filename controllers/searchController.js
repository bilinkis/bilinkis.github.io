let controller = {
    main: function (req,res){
        return res.render('search', {title: 'Resultados de busqueda', search:req.query.search});
    }

}
module.exports = controller;