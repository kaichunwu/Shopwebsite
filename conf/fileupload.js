var fs = require('fs');
var multer = require('multer');

var createdir = function(filedir){
    try{
        fs.accessSync(filedir);
    }catch(e){
        try {
            fs.mkdirSync(filedir);
        }catch (ee) {
            var dir = filedir;
            createdir(filedir.substring(0,filedir.lastIndexOf("/")));
            console.log(filedir);
            fs.mkdirSync(dir);
        }
    }
};

var uploadfile = function (uploaddir) {
    createdir(uploaddir);
    var storage = multer.diskStorage({
        destination: function (req,file,cb) {
            cb(null,uploaddir);
        },
        filename: function (req,file,cb) {
            // cb(null,file.fieldname + '-' +Date.now() + '-' + file.originalname);
            var orignalname = file.originalname;
            var suffix = orignalname.substring(orignalname.lastIndexOf('.'),orignalname.length);
            cb(null,file.fieldname + '-' +Date.now() + suffix);
        }
    });
    var upload = multer({ storage: storage});
    return upload;
}

module.exports = uploadfile;