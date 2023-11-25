import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import http from 'http';
import bodyParser from 'body-parser'
import Auth from './Controllers/Auth.js'
import Items from './Controllers/Items.js'
import SaveCart from './Controllers/Cart.js'
import StartSocket from './Controllers/Socket.js';
import Auction from './Controllers/AuctionItems.js';
import Payment from './Controllers/StripePayment.js';
import OrderItem from './Controllers/Order.js';


const app = express();

const PORT = process.env.PORT || 3000;


//Some Boiler Plate
app.use(express.json({
    limit: '50mb'
  }));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cors());
  
  
  //db
  mongoose.connect(process.env.Mongo_ConnectionString);
    
    const db = mongoose.connection;
    db.on("error", function () {
      console.log("Error Connecting");
    });
    
    
    db.on("open", function () {
      console.log("Successfull Connected to Database ");
    });

    //Routes

    app.use(Auth);
    app.use(Items);
    app.use(SaveCart);
    app.use(Auction);
    app.use(OrderItem);
    app.use(Payment);



    const server = http.createServer(app);

    StartSocket(server);

    server.listen(PORT , ()=>{
        console.log(`Server is running on ${PORT}`)
    })