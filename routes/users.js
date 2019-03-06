var express = require('express');
var router = express.Router();
var mongo = require('../conf/MongoDB');

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
    mongo.ChartModel.find({username:req.session.user.username},function (err, docs) {
        if(err) throw err;
        if(docs.length!=0){
            res.render('user',{title: 'Shop Chart',user: req.session.user, chart: docs[0]});
        }else{
            res.render('user',{title: 'Shop Chart',user: req.session.user});
        }
    })

});

router.get('/submit',function (req, res, next) {
    var id = req.query;
    mongo.ChartModel.findOneAndDelete(id,function (err, adventure) {
        if(err) throw err;
        // if(adventure.length!=0)
        res.render('submit',{title: 'Payment Complete',user:req.session.user})
    })
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

router.post('/add',function (req, res, next) {
    var item = {
        _id: req.body.id,
        username: req.body.username,
        name: req.body.name,
        price: req.body.price,
        amount: req.body.amount
    };
    mongo.ItemModel.findOne({_id: req.body.id},function (err, adventure) {
        if(err) throw err;
        if(adventure.length!=0){
            adventure.amount -= req.body.amount;
            if(adventure.amount>0){
                adventure.save();
            }else{
                mongo.ItemModel.findOneAndDelete({_id: req.body.id}).exec();
            }
        }
    })
    mongo.ChartModel.find({username:req.session.user.username},function (err, docs) {
        if(err) throw err;
        var chart;
        if(docs.length==0){
            chart = {
                username: req.session.user.username,
                items: [item],
                price: item.price*item.amount
            };
            mongo.ChartModel(chart).save(function (err) {
                if(err){
                    throw err;
                    res.render('error');
                }else {
                    console.log('Chart Saved');
                    res.render('submit', {title: 'Chart Saved',user:req.session.user});
                }
            })
        }else{
            chart = docs[0];
            chart.items.push(item);
            chart.price = chart.price + item.price*item.amount;
            mongo.ChartModel.findOneAndUpdate({_id:chart._id},chart,{},function (err) {
                if(err){
                    throw err;
                    res.render('error');
                }else {
                    console.log('Chart Updated');
                    res.render('submit',{title: 'Chart Updated',user: req.session.user});
                }
            })
        }
    })
});

module.exports = router;
