var express=require('express');
var path=require('path');
var router=express.Router();

var passport=require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

var userInfo = require('../.././controllers/userInfo');
var mail = require('.././nodemailer');

router.use(passport.initialize());
router.use(passport.session());

passport.use(new GoogleStrategy({
        clientID: process.env.Google_clientID,
        clientSecret: process.env.Google_clientSecret,
        callbackURL: "https://music-soft.herokuapp.com/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
        userInfo.find(profile._json.email,(err,user)=>{
            if(err)
                cb(err);
            if(user.length==0)
            {
                userInfo.saveUser(profile._json.name,profile._json.email,(err,data)=>{
                    if(err)
                        cb(err);
                    else
                    {
                        if(data.email.localeCompare(process.env.emilID)!=0)
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
                                user.push(data);
                                cb(null,user);
                            });
                        }
                        else
                        {
                            user.push(data);
                            cb(null,user);
                        }
                    }
                });
            }
            else
            {
                return cb(null,user);
            }
        });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});
  
passport.deserializeUser(function(user, done) {
    done(null, user);
});

router.get('/',passport.authenticate('google',{
    scope:[
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
    ]})
);

router.get('/callback',passport.authenticate('google',{failureRedirect:'/?error=nologin'}),(req,res)=>{
    if(req.user.length!=0)
    {
        req.session.isLogin=1; 
    }
    res.redirect('/');
});

module.exports=router;