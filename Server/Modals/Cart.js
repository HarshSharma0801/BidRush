import mongoose from "mongoose";



const CartSchema = new mongoose.Schema({
    Owner:{type:mongoose.Schema.Types.ObjectId , ref:'User'},
    TotalPrice:{type:Number},
    TotalItems:{type:String},
    Items:[]

})


const Cart = mongoose.model('Carts' , CartSchema);

export default Cart