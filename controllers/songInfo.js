var mongoose = require('mongoose');
var songInfo = require('.././db/songInfo');
var ObjectId = require('mongodb').ObjectID;

exports.saveSong = (name,file,cb)=>
{
	var newsongInfo = new songInfo({
		originalname : name,
		title : (file.title==undefined)?"Unknown":file.title,
		artists : (file.artist==undefined)?"Unknown":file.artist,
		album : (file.album==undefined)?"Unknown":file.album,
		year : (file.year==undefined)?"Unknown":file.year,
		genre : (file.genre==undefined)?"Unknown":file.genre[0],
		picture : {
			data : (file.picture[0].data==undefined)?"0x00":file.picture[0].data
		}
	});
	newsongInfo.save()
	.then(savedData=>{
		cb(null,savedData);
	})
	.catch(err=>{
		cb(err);
	});
}

exports.getPicture = (id,cb)=>{
	songInfo.find({_id:ObjectId(id)},{picture:1})
	.exec((err,data)=>{
		if(err)
			cb(err);
		cb(null,data);
	});
}

exports.find = (cb)=>
{
	songInfo.find({},{picture:0})
	.exec((err,data)=>{
		if(err)
			cb(err);
		cb(null,data);
	})
}

exports.findByGenre = (genre,cb)=>
{
	songInfo.find({genre:{$regex: genre, $options: "$i"}},{picture:0})
	.exec((err,data)=>{
		if(err)
			cb(err);
		cb(null,data);
	})
}