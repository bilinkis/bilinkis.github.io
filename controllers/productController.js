let controller = {
    main: function (req,res){
        res.render('product', {title: 'Página de productos'});
    }, 
    add: function (req,res){
        res.render('product-add', {title: 'Agregar producto', path : req.originalUrl});
    }
}
module.exports = controller;