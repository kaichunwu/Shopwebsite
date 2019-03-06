var express = require('express');
var router = express.Router();
var mongo = require('../conf/MongoDB');

/* GET users listing. */
router.get('/', function(req, res, next) {
    // res.send('respond with a resource');
    res.render('seller',{title: 'Shop',user: req.session.user});
});

var uploaddir = './public/uploadfile/item';
var uploadfile = require('../conf/fileupload');
var upload = uploadfile(uploaddir);

router.post('/photo',upload.single('file'),function (req, res, next) {
    var file = req.file;
    var type = file.mimetype;
    if(type.indexOf('image') > -1){
        res.send(file.path.replace('public/',''));
    }
});

router.post('/submit',function (req, res, next) {
    var item = {
        username:req.session.user.username,
        name: req.body.name,
        price: req.body.price,
        amount: req.body.amount,
        description: req.body.description,
        purl: req.body.purl
    };
    // console.log(item);
    if(req.body.id!=undefined&&req.body.id!=null){
        // item._id = req.body.id;
        // console.log(item);
        mongo.ItemModel.updateOne({_id:req.body.id},item,{multi: false},function (err) {
            if(err){
                throw err;
                res.render('error');
            }else {
                console.log('Item Saved');
                res.render('submit',{title: 'Submit Item Success',user: req.session.user});
            }
        })
    }else {
        mongo.ItemModel(item).save(function (err) {
            if (err) {
                throw err;
                res.render('error');
            } else {
                console.log('Item Saved');
                res.render('submit', {title: 'Submit Item Success',user: req.session.user});
            }
        })
    }
});

router.get('/show',function (req, res, next) {
   var id = req.query;
   // console.log(id);
   mongo.ItemModel.findOne(id,function (err, adventure) {
       if(err) throw err;
       var item = adventure;
       res.render('show',{title: 'Item Show Page',item:item,user: req.session.user});
   })
});

router.get('/modify',function (req, res, next) {
    var id = req.query;
    // console.log(id);
    mongo.ItemModel.findOne(id,function (err, adventure) {
        if(err) throw err;
        var item = adventure;
        res.render('seller',{title: 'Item Modify Page',item:item,user: req.session.user});
    })
});

module.exports = router;