import express from 'express'
import AuctionItem from '../Modals/AuctionItem.js';

const Auction = express();



Auction.get('/auctionitems' , async(req,res)=>{

    try {
        const items = await AuctionItem.find({});
        res.status(200).json({valid:true,items:items});
        
    } catch (error) {
        console.log(error)
    }
})

export default Auction