import mongoose from "mongoose";



const AuctionItemSchema = new mongoose.Schema({
   
    Itemname:{type:String},
    startBid:{type:String},
    currentBid:{type:String},
    Image:{type:String},

})


const AuctionItem  = mongoose.model('AuctionItems' ,AuctionItemSchema );

export default AuctionItem