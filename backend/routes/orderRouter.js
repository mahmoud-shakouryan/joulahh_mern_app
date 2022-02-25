import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import Payment from '../models/paymentModel.js'
import { isAuth } from "../util.js";
import axios from 'axios';

const orderRouter = express.Router();


orderRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    if (req.body.orderItems.length === 0) {
      res.status(400).send({ message: "Cart Is Empty" });
    } else {
      const order = new Order({
        orderItems: req.body.orderItems,
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id, //isAuth va file'e util.
      });
      const createdOrder = await order.save(); // on object'e orderi ke to db dorost mikone ro bad az anjamesh mizarim tooye createdOrder, bekhatere hamin toosh masalan _id hast.
      res
        .status(201)
        .send({ message: "new order created", order: createdOrder });
    }
  })
);

orderRouter.get(
  '/mine',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
  })
);


// to in route dar vaghe ma tooye server hastim va mikhaim az server request post dashte bashim be zarinPal.
// va hamrahe in request bayad ye payloadi bashe ke zarinPal mikhad.
orderRouter.post('/pay', expressAsyncHandler(async (req, res) => {           //isAuth hatman anjam shavad
  try {                                                                            
    const params = {
      merchant_id:'6cded376-3063-11e9-a98e-005056a205be',
      amount:req.body.totalPrice,
      callback_url:'http://localhost:5000/api/orders/paycallback',   //bad az deploy bayad domain inja bashe
      description: 'purchase test'
    }
    const response = await axios.post('https://api.zarinpal.com/pg/v4/payment/request.json', params);
    if(response.data.status === 100){
       const newPayment = new Payment({
         user: req.user.id,       //bayad login karde bashe
         amount: req.body.amount,
         resNumber: response.data.Authority,                    //Authority >>> hamoon linkie ke zarinPal be ma mike
       });
       await newPayment.save();
       res.redirect(``)
    }
    else{
      res.redirect('/');// shayad beshe kollan goft res.redirect computer'e mabda ro mifrest jaee.ke inja servermoon mabdae ( zarinpal maghsad)       //???? be koja redirect
    }
  } catch (error) {
    console.log('orderRouter /pay route error >>>',error);
  }
}))

orderRouter.get('/paycallback', expressAsyncHandler(async (req, res)=>{          //baraye oonja ke kar tuye zarin pal tamoom shode va zarinpal miad tuye server tu in routi ke ma behesh elam mikonim.
  try{
    res.send({'message':'router working...'});

    console.log('/api/orders/paycallback')
  }
  catch(error){
    console.log('/api/orders/paycallback route error',error);
  }
}))


orderRouter.get(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: "Order Not Found" });               //in kojas in { message: 'order Not Found' } tu front mikhaim namayesh bedim
    }
  })
);






export default orderRouter;


