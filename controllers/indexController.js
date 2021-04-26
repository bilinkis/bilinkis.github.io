let controller = {
    main: function (req, res){
        return res.render('index', {title: 'Index'});
    }
}
module.exports = controller;