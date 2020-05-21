var express=require('express');
var router=express.Router();
var path=require('path');
var session = require('express-session');

router.use(session({
	secret: "xYzUCAchitkara",
	resave: true,
	saveUninitialized: true
}));

router.use(express.static(path.join(__dirname,'.././public')));

router.get("/",(req,res)=>{
	if(req.session.isLogin)
		res.render("index.ejs",{login:true});
	else
    	res.render("index.ejs");
});

router.use('/upload',require('./api/upload'));
router.use('/classical',require('./api/classical'));
router.use('/party',require('./api/party'));
router.use('/pop',require('./api/pop'));
router.use('/retro',require('./api/retro'));
router.use('/rock',require('./api/rock'));
router.use('/auth',require('.././middlewares'));
router.use('/',require('./api/index'));

module.exports=router;