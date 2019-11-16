var express = require('express');
var router = express.Router();

var multer = require('multer');
var upload = multer({
    storage : multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/images')
        },
        filename: function (req, file, cb) {
            //console.log(req);
            cb(null, file.originalname)
        }
    }),
    dest : "uploads/images"
});

/*
var storage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, '../../uploads/')
    },
    filename : function(req, file, cb){
        cb(null, file.originalname)
    }
});
*/
//var upload = multer({dest : "../../uploads/"});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('uploadTest', { title: 'Upload-Test' });
});


router.post('/upload', upload.single('image'), function(req,res){
    console.log(req);
    res.send({success : true, 'Uploaded! : ' : req.file  });
});


router.get('/download/:path', function (req, res){
    var path = req.params.path;
    console.log(path);
    res.download('uploads/images' + path, path);
});

module.exports = router;
