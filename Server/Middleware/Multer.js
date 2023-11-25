import multer from 'multer'

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null , '../Client/src/UploadedImages')
    },
    filename:(req,file,cb) =>{
        cb(null,file.fieldname + Date.now()+file.originalname )
    }

})


const Upload = multer({
    storage:storage
})

export default Upload