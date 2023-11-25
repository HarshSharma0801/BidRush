import express from "express";
import AuthenticateToken from '../Middleware/AuthenticateUser.js';
import Order from "../Modals/Orders.js";
import jwt from "jsonwebtoken";

const Key = process.env.REFRESH;

const AuthenticateOrder = (req, res, next) => {
    const token = req.headers["main"];
  
    if (!token) {
      return res.sendStatus(401); // Unauthorized
    }
  
    jwt.verify(token, Key, (err, order) => {
      if (err) {
        return res.sendStatus(403); // Forbidden
      }
      req.order = order;
      next();
    });
  };

const OrderItem = express();

OrderItem.post("/Booking", async (req, res) => {
  const data = req.body;
  try {
    const OrderToken = jwt.sign({ data }, Key, { expiresIn: "5m" });
    res.json({ OrderToken: OrderToken, valid: true });
  } catch (error) {}
});

OrderItem.get( "/BookingData",AuthenticateToken,AuthenticateOrder, async (req, res) => {

    const BookingData = req.order.data;
    const id = req.user.ExistingUser._id ;
    const today = new Date();
    const date =
      today.getDate() +
      "/" +
      (today.getMonth() + 1) +
      "/" +
      today.getFullYear();
    const main = { ...BookingData, Customer: id, Date: date };

    await Order.insertMany(main);
    res.status(200).json({ data: "SUCCESS" });

    console.log("Api Call");
  }
);

export default OrderItem