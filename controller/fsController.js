const fs = require('fs');

const deleteImage = (req,res) =>{

    fs.unlink('upload/images/'+req.headers.file_names,function (err){

    });
}
module .exports ={deleteImage}
