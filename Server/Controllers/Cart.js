import express from 'express'
import AuthenticateToken from '../Middleware/AuthenticateUser.js';
import Cart from '../Modals/Cart.js';


const SaveCart = express();


SaveCart.post('/savecart' ,AuthenticateToken,async(req,res)=>{
      
   const user = req.user;
   const data = req.body

  const id = user.ExistingUser._id;
   
    try {
       
        const ExistingCart = await Cart.findOne({Owner:id});
        if(ExistingCart){
            await Cart.findByIdAndUpdate(ExistingCart._id , {
                Owner:id,
                TotalPrice:data.totalPrice,
                TotalItems:data.totalItems,
                Items:data.items
            });
            res.status(200).json({valid:true});
        }
        else{
       
            await Cart.create(     {
                Owner:id,
                TotalPrice:data.totalPrice,
                TotalItems:data.totalItems,
                Items:data.items
            })
            
            res.status(200).json({valid:true});

        }

       

    } catch (error) {
        console.log(error);
    }
})



SaveCart.get('/getcart' ,AuthenticateToken ,async(req,res)=>{

    const user = req.user;
    const id = user.ExistingUser._id;

    try {
        const existingCart = await Cart.findOne({Owner:id});
        if(existingCart){
            res.status(200).json({valid:true , cart:existingCart})
        }
        else{
            res.status(200).json({valid:false})

        }
        
    } catch (error) {
        console.log(error)
    }

})

export default SaveCart
