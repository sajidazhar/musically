var express = require('express');
var router = express.Router();
var path = require('path');
var multer = require('../.././middlewares/multer');
var mm = require('music-metadata');
var util = require('util');
var songInfo = require('../.././controllers/songInfo');

router.post('/',(req,res)=>{
	multer.upload(req,res,(err)=>{
		if(err)
			console.error(err.message);
		mm.parseFile(req.file.path)
		.then(metadata=>{
			songInfo.saveSong(req.file.originalname,metadata.common,(err,data)=>{
				if(err)
					console.error(err.message);
				res.redirect('back');
			});
		})
		.catch(err=>{
			console.error(err.message);
		})
	});
});

module.exports = router;