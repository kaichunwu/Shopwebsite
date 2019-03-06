var express = require('express');
var router = express.Router();

/* signup index */
router.get('/',function (req,res) {
    if(req.session.user){
        res.redirect('/');
    }else{
        res.render('signup',{title: 'Create An Account Here'});
    }
})

var uploaddir = './public/uploadfile/user';
var uploadfile = require('../conf/fileupload');
var upload = uploadfile(uploaddir);

router.post('/photo',upload.single('file') ,function (req,res,next) {
    var file = req.file;
    var type = file.mimetype;
    // console.log('Type: %s',type);
    // console.log('Path: %s',file.path);
    if(type.indexOf('image') > -1){
        res.send(file.path.replace('public/',''));
    }else {
        res.redirect('/signup');
    }
})

router.post('/test',function (req,res) {
    console.log(req.body);
    res.render('signup',{title: 'Signup here'});
})

var acl = require('../conf/acl');
var mongo = require('../conf/MongoDB');
router.post('/submit',function (req,res) {
    var psw = getMD5Password(req.body.password);
    console.log(psw);
    var usr = {
        username: req.body.username,
        password: psw,
        role: req.body.role,
        birthdate: req.body.birth,
        purl: req.body.purl
    };
    mongo.UserModel.findOne({username:usr.username},function (err, adventure) {
        if(err) throw err;
        if(adventure!=null){
            res.render('signup',{title: 'Create An Account Here',errs:'Same Username has existed'});
        }else{
            mongo.UserModel(usr).save(function (err) {
                if(err){
                    throw err;
                    res.render('error');
                }else {
                    console.log('User Saved');
                    acl.addUserRoles(usr.username, usr.role);
                    res.render('logout', {title: 'User Saved'});
                }
            })
        }
    });

})

var crypto = require('crypto');
function getMD5Password(orgi){
    var md5 = crypto.createHash('md5');
    md5.update(orgi);
    var d = md5.digest('hex');
    return d;
}

module.exports = {
    router: router,
    pswecd: getMD5Password
};