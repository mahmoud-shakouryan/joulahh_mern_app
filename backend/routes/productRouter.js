import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import Product from "../models/productModel.js";

const productRouter = express.Router();

productRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    console.log('umad tush')
    const products = await Product.find({}); // {} >>  all documents
    if(products){
      console.log('umad tu if')
      res.json(products);
    }else{
      console.log('umad tu else')
      res.status(404).send({ message: "Products Not Found!" });
    }
     
  })
);

productRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    const createdProducts = await Product.insertMany(data.products);
    res.json(createdProducts);
  })
);

productRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      return res.send({ product });
    } else {
      res.status(404).send({ message: "Product Not Found!" });
    }
  })
);

export default productRouter;
