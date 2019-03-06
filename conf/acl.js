var ACL = require('acl');
var aclconfig = require('./acl_conf');
var acl = new ACL(new ACL.memoryBackend());

acl.allow(aclconfig);


module.exports = acl;