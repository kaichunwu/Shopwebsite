var mongoose = require('mongoose');
mongoose.connect('mongodb://user:password1@ds155815.mlab.com:55815/shop-e-commerce',{useNewUrlParser: true},function (err) {
    if(err) console.log(err);
});

mongoose.set('useFindAndModify', false);
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({
    id:ObjectId,
    username:String,
    password:String,
    role:String,
    birthdate:Date,
    purl:String
});
const UserModel = mongoose.model('User',User);

var acl = require('./acl');
UserModel.find({},function (err,docs) {
    if(err) throw err;
    for(var i in docs){
        acl.addUserRoles(docs[i].username,docs[i].role);
    }
})

// var sv = UserModel({username:'hhhhh',role:'body'}).save(function(err) {
//     if(err) throw err;
//     console.log('item save');
// });
// UserModel.findOne({body:'body'},function(err,adventure){
//   console.log(adventure);
// });

const Item = new Schema({
    id:ObjectId,
    username:String,
    name:String,
    price:Number,
    amount:Number,
    description:String,
    purl: String
});
const ItemModel = mongoose.model('Item',Item);

const Chart = new Schema({
    id:ObjectId,
    username:String,
    items:[Item],
    price:Number
});
const ChartModel = mongoose.model('Chart',Chart);

module.exports = {
    UserModel: UserModel,
    ItemModel: ItemModel,
    ChartModel: ChartModel
};