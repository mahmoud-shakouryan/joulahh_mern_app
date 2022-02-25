import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js";
import orderRouter from "./routes/orderRouter.js";
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import path from 'path';

//const __dirname = path.resolve();         // baraye raf'e errore>>> dirname is not defined in ES module scope
dotenv.config();      
const app = express();
app.use(helmet());                         //ruye hameye req ha miad va header haye khasi ro ezafe mikone be hameye res ha ke barmigardoonim.
app.use(compression());


app.use(express.json()); 
app.use(express.urlencoded({extended : true}));
//const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@joulahhcluster.rxqh9.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?retryWrites=true&w=majority`;
const MONGODB_URI = `mongodb+srv://mahmoud-shakouryan:TarYDvaALJVMQ8w@joulahhcluster.rxqh9.mongodb.net/joulahh?retryWrites=true&w=majority`;

app.use(cors());
// app.use('/images',express.static(path.join(__dirname,'images')));
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });

app.use('/api/users',userRouter); 
app.use('/api/products',productRouter);
app.use('/api/orders', orderRouter);
app.use((err, req, res, next) => {   //age router'e tuye expressAsyncHandler be error resid express miare inja va khob maloome ke error ro be front end mifreste
    res.status(500).send({message : err.message})
})

// serve static assets if in production
// if(process.env.NODE_ENV){
//   app.use(express.static('../frontend/build'));        //set static folder
//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'));
//   })
// }






let port = process.env.PORT || 8080;     //oon port hamoonie ke bad az deployment , hosting provider baramoon mizare
mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    app.listen(port);     // app.listen(5000); >>> start listening  incoming requests
    console.log("connected to mongo and port");
  })
  .catch((err) => {
    console.log("mongoose.connect error >>> ", err);
  });
