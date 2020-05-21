var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var songInfoSchema = Schema({
	originalname : {type: String},
	title : {type: String},
	artists : {type: String},
	album : {type: String},
	year : {type: String},
	genre : {type: String},
	picture : {
		format : {type: String, default: "image/jpeg"},
		type : {type: String, default: "Cover (front)"},
		description : {type: String, default: ""},
		data : {type: Buffer}
	}
});

var songInfo = mongoose.model("songinfos",songInfoSchema);
module.exports = songInfo;
