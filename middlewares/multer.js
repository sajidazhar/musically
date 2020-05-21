var multer=require('multer');

function sanitizeFile(file, cb) {
    let fileExts = ['mp3'];
    let isAllowedExt = fileExts.includes(file.originalname.split('.')[1].toLowerCase());
    let isAllowedMimeType = file.mimetype.startsWith("audio/");
    if(isAllowedExt && isAllowedMimeType){
        return cb(null ,true);
    }
    else{
        cb('Error: File type not allowed!');
    }
}

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/music');
    },
    filename: function(req,file,cb) {
        cb(null,file.originalname);
    }
});
   
exports.upload = multer({ storage: storage ,
    fileFilter: function (req, file, cb) {
        sanitizeFile(file, cb);
    }
}).single('song');