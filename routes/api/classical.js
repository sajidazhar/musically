var express=require('express');
var router=express.Router();
var path=require('path');

var auth = require('../.././middlewares/auth');
var songInfo = require('../.././controllers/songInfo');

router.use(express.static(path.join(__dirname,'.././public')));

router.get("/",auth,(req,res,next)=>{
	songInfo.findByGenre("Classical",(err,data)=>{
		if(err)
			console.error(err.message);
		res.render("classical.ejs",{data:data});
	});
});

module.exports=router;