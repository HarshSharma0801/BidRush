import express from 'express'
import Item from '../Modals/Item.js'
import Upload from '../Middleware/Multer.js';
import AuthenticateToken from '../Middleware/AuthenticateUser.js';
import cloudinary from "cloudinary";

const Items = express();

cloudinary.config({ 
  cloud_name: process.env.Cloudinary_Name, 
  api_key: process.env.Cloudinary_APIKEY, 
  api_secret: process.env.Cloudinary_SECRET,
  secure: true
});


Items.post("/cloudinary", async (req, res) => {
  try {
    const files = req.body;
    const Photos = [];
    for (let i = 0; i < files.length; i++) {
       const uploadPhoto = await cloudinary.v2.uploader
       .upload(files[i] , {
        upload_preset:'BidRush',
        folder: 'BidRush',
        use_filename: true,
        overwrite:false

       });
     Photos.push( {url: uploadPhoto.url , photoId: uploadPhoto.public_id});

        
    }
    res.status(200).send(Photos);

  } catch (error) {
    console.log(error);
  }
});




Items.post('/additem', AuthenticateToken ,  async(req,res)=>{

     const OwnerId  = req.user.ExistingUser._id ;
     const {ItemName , description , features , price , category , Images} = req.body;
    

     const ItemData = {
        Owner:OwnerId,
        ItemName:ItemName,
        category:category,
        description:description,
        price:price,
        features:features,
        Images: Images,
     }

    try {
        await Item.create(ItemData);
        console.log("added");
        res.status(200).json({valid:true});
    } catch (error) {
        console.log(error)
    }


})


Items.get('/items' , async(req , res)=>{

  try {
    
    const items = await Item.find({});
    res.status(200).json({items:items})
    
  } catch (error) {
    console.log(error)
  }


})

Items.get('/singleitem/:id' , async(req,res)=>{
  



  try {
    const id = req.params.id ;
  
    const item = await Item.findById(id);
    res.status(200).json({valid:true , item:item});

  } catch (error) {
    
  }
})

export default Items


