const express = require('express');
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({

    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}_${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage: storage

})

const route = express.Router();
route.post('/singlupload', upload.single('profile'), (req, resp) => {

    resp.status(201).json({status: true, url:req.file.filename});


    // resp.status(201).json({status: true, url: `http://localhost:3000/images/${req.file.filename}`});

});

route.post('/multipulImage', upload.array('array', 10), function (req, res, next) {
    if (next()) {
        console.log('next');
        console.log(next);
    }

    const file_names = [];
    for (let i = 0; i < req.files.length; i++) {
        file_names.push(req.files[i]['filename'])
    }

    res.status(201).json({data: {file_names}});
});

module.exports = route;
