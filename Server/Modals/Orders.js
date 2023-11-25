import mongoose from "mongoose";



const OrderSchema = new mongoose.Schema({
    Customer:{type:mongoose.Schema.Types.ObjectId , ref:'User'},
    name:{type:String},
    price:{type:String},
    image: {type:String},
    quantity:{type:String},
    Date:{type:String}
    

})


const Order = mongoose.model('Orders' , OrderSchema);

export default Order