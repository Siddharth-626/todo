import jwt from 'jsonwebtoken';
import exp from "express";
import {Users} from "../models/db.js";
import {SECRET} from "../middleware/auth_middleware.js";
const app = exp();
app.use(exp.json());


export const signup = async(req,res)=>{
    try {
        console.log("singup");
        const {username,password} = req.body;
        const user = await Users.findOne({username});
        if(user){
            throw new Error("User alredy exists");
        }
        const newUser = await new Users({username,password})
        await newUser.save();
        res.status(200).json()
        console.log("User Created sucessfully");
    } catch (error) {
        res.status(400).json(error);
        console.log("failed to add user",error);
    }
}

export const login = async(req,res)=>{
    try {
        const {username,password} = req.body;
        const user = await Users.findOne({username,password});
        if (user) {
            console.log(user._id);
            const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: '10h' });
            res.status(200).json(token)
          } else {
            throw new Error({message:"User Not found Sign up"})
          }
    } catch (error) {
        res.status(403).json(error.message); 
    }
}
