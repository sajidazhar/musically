var mongoose = require('mongoose');
var userInfo = require('.././db/userInfo');
var ObjectId = require('mongodb').ObjectID;
var bcrypt = require('bcrypt');
var generator =require('generate-password');

exports.saveUser = (name,email,cb)=>{
	var password = generator.generate({
		length: 10,
		numbers: true
	});
	var newuserInfo = new userInfo({
		name: name,
		email: email,
		password: bcrypt.hashSync(password,10)
	});
	newuserInfo.save()
	.then(savedData=>{
		savedData.password=password;
		cb(null,savedData);
	})
	.catch(err=>{
		cb(err);
	});
}

exports.find = (email,cb)=>{
	userInfo.find({email: email})
	.exec((err,data)=>{
		if(err)
			cb(err);
		cb(null,data);
	});
}