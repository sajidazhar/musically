var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userInfoSchema = Schema({
	name : {type: String},
	email : {type: String},
	password : {type: String}
});

var userInfo = mongoose.model("userinfos",userInfoSchema);
module.exports = userInfo;