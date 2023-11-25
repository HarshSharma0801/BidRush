import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
    Owner:{type:mongoose.Schema.Types.ObjectId , ref:'User'},
    ItemName:{type:String},
    description:{type:String},
    price:{type:String},
    category:{type:String},
    features:[String],
    Images: [String],

})


const Item = mongoose.model('Items' , ItemSchema);

export default Item