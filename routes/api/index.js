var express = require('express');
var router = express.Router();
var path = require('path');
var bcrypt = require('bcrypt');

var songInfo = require('../.././controllers/songInfo');
var userInfo = require('../.././controllers/userInfo');
var mail = require('../.././middlewares/nodemailer');

router.get("/img/:id",(req,res)=>{
	songInfo.getPicture(req.params.id,(err,data)=>{
		res.setHeader('Content-Type','image/jpeg');
		res.send(data[0].picture.data);
	});
});

router.get("/logout",(req,res)=>{
	req.session.destroy();
	res.redirect("/");
});

router.post("/login",(req,res)=>{
	userInfo.find(req.body.uname,(err,user)=>{
		if(err)
			console.error(err.message);
		if(user.length!=0&&bcrypt.compareSync(req.body.psw,user[0].password))
		{
			req.session.isLogin=1;
			res.redirect("/");
		}
		else
			res.redirect("/");
	});
});

router.post("/signup",(req,res)=>{
	userInfo.saveUser(req.body.fullname,req.body.uname,(err,data)=>{
		if(err)
			console.error(err.message);
		else
		{
			var mailOptions = {
	            from: process.env.user,
	            to: data.email,
	            subject: 'Succesful registration on MusicSoft',
	            html: '<h3>Welcome to MusicSoft.</h3><br><b>Username:</b> '+data.email+'<br><b>Password:</b> '+data.password
	        };
	        mail.sendMail(mailOptions,(err,info)=>{
	            if(err)
	                cb(err);
	            res.redirect("/");
	        });
		}
	})
});

module.exports = router;