let controller = {
    main: function (){
        res.render('product', {title: 'Página de productos'});
    }, 
    add: function (){
        res.render('product-add', {title: 'Agregar producto'});
    }
}
module.exports = controller;