let controller = {
    main: function (req, res){
        res.render('index', {title: 'Index'});
    }
}
module.exports = controller;