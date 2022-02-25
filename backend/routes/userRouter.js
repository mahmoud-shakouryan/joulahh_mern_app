import express from 'express';
import expressAsyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import data from '../data.js';
import User from '../models/userModel.js';
import { isAuth } from "../util.js";

const userRouter = express.Router();

userRouter.get('/seed', expressAsyncHandler(async(req, res)=>{
    const createdUsers = await User.insertMany(data.users);        // kole araye ya objecthaye toosh???
    res.send({createdUsers : createdUsers})
}))

userRouter.post('/signin', expressAsyncHandler(async (req, res)=>{
    const user = await User.findOne({email : req.body.email})
    if(user){
        const token = jwt.sign({_id:user._id,name:user.name,email:user.email,isAdmin:user.isAdmin}, process.env.JWT_SECRET || 'somethingsupersecret',{expiresIn:'30d'})    // oon || 'somethingsuper..' baraye ine ke chon onn variable too github nist age ye nafar dige clone kard error nade.
        if(bcrypt.compareSync(req.body.password,user.password)){
          return  res.send({
                _id:user.id,
                name:user.name,
                email:user.email,
                isAdmin:user.isAdmin,
                token:token
            })
        }
    }
    res.status(401).json({message : 'invalid password or email'});
}));

userRouter.post('/register', expressAsyncHandler(async(req, res) => {
    const user = new User({name:req.body.name, email: req.body.email, password: bcrypt.hashSync(req.body.password, 8)});
    // alan in bala user shode ye mongoose object ke az kelase User , instance gereftim.
    const createdUser = await user.save();   // in promise return mikone yani result pas mide yadet bashe pas mishe masalan be _id access dasht ba inke hamin alan too db dorost karde.
    const token = jwt.sign({_id:createdUser._id,name:createdUser.name,email:createdUser.email,isAdmin:createdUser.isAdmin}, process.env.JWT_SECRET || 'somethingsupersecret',{expiresIn:'30d'}) 
    res.send({
        _id:createdUser.id,
        name:createdUser.name,
        email:createdUser.email,
        isAdmin:createdUser.isAdmin,
        token:token
    })

}));

// PROFILE UPDATE
userRouter.put('/profile', isAuth, expressAsyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id);
    if(user){
        user.name = req.body.name || user.name;   //client didn't enter any name in the input 
        user.email = req.body.email || user.email; 
        if(req.body.password){
            user.password = bcrypt.hashSync(req.body.password, 8);
        }
        const updatedUser = await user.save();
        const token = jwt.sign({_id:updatedUser._id,name:updatedUser.name,email:updatedUser.email,isAdmin:updatedUser.isAdmin}, process.env.JWT_SECRET || 'somethingsupersecret',{expiresIn:'30d'})
        res.send({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: token
        })


    }
}))

userRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if(user){
        res.send(user);
    }
    else{
        res.status(404).send({message:'User Not Found'});
    }
}));

export default userRouter;