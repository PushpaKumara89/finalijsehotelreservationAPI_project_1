const fs = require('fs');

const deleteImage = (req,res) =>{
    let ff=req.headers.file_names
    if (ff.includes("imgno")){
        return
    }
    fs.unlink('upload/images/'+req.headers.file_names,function (err){
        if(err===null){
            res.status(201).json({status:true,massage:"Deleted"});
        }else {
            res.status(400).json({status:false,massage:"Files missing"});
        }
    });
}
module .exports ={deleteImage}
