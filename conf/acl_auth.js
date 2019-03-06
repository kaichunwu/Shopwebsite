var acl = require('./acl');
var createError = require('http-errors');

var authuser = (req,res,next) => {
    var user = req.session.user;
    if(user){
        acl.isAllowed(user.username,req.originalUrl,['get','post']).then(
            allowed =>{
                // console.log(req.originalUrl);
                if(allowed){
                    next();
                }else {
                    next(createError(403));
                }
            }
        )
    }
    else{
        res.redirect('/login');
    }
}

var authadm = (req,res,next) => {
    var user = req.session.user;
    if(user){
        acl.isAllowed(user.username,req.originalUrl,['get','post','delete']).then(
            allowed =>{
                // console.log(req.originalUrl);
                if(allowed){
                    next();
                }else {
                    next(createError(403));
                }
            }
        )
    }
    else{
        res.redirect('/login');
    }
}

module.exports = {
    authuser: authuser,
    authadm: authadm
};