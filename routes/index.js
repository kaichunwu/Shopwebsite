var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.session.user){
        var items =[];
        var usr = req.session.user;
        if(usr.role=='seller'){
            mongo.ItemModel.find({username:usr.username},function (err, docs) {
                if(err) throw err;
                items = docs;
                res.render('index', { title: 'Shopping Website',user: req.session.user, items:items});
            })
        }
        else if(usr.role=='user'){
            mongo.ItemModel.find({},function (err, docs) {
                if(err) throw err;
                items = docs;
                res.render('index', { title: 'Shopping Website',user: req.session.user, items:items});
            })
        }else{
            res.render('index', { title: 'Shopping Website',user: req.session.user, items:items});
        }
    }
    else{
        //req.session.err = 'login first';
        //res.redirect('login');
        res.render('index', { title: 'Shopping Website'});
    }
});

router.route('/login').get(function (req,res) {
    if(req.session.user){
        res.redirect('/');
    }else{
        res.render('login',{title: 'Login First'});}
}).post(function (req,res) {
    var username = req.body.username;
    var password = req.body.password;
    var psw = getMD5Password(password);
    mongo.UserModel.find({username:username},function (err, docs) {
        if(err) throw err;
        if(docs.length==0){
            res.render('login',{title: 'LoginFirst',err: 'No username'});
        }else{
            var has = false;
            var rest;
            for(var i in docs){
                if(docs[i].password==psw) {
                    rest = i;
                    has = true;
                }
            }
            if(has){
                req.session.user = {
                    username: username,
                    role: docs[rest].role,
                    purl: docs[rest].purl
                };
                //console.log(req.session.user);
                res.redirect('/');
            }else{
                res.render('login',{title: 'LoginFirst',err: 'Password incorrect'});
            }
        }
    });
})

router.get('/logout',function (req,res) {
    req.session.user = null;
    req.session.error = null;
    res.render('logout',{title: 'User Logout'});
})

var mongo = require('../conf/MongoDB');
var getMD5Password = require('./signup').pswecd;

module.exports = router;
