var express = require('express');
var router=express.Router();
var path=require('path');

router.use(express.static(path.join(__dirname,'.././public')));

router.use('/google',require('./google/passport'));
router.use('/facebook',require('./facebook/passport'));

module.exports = router;