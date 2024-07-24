import exp from "express";
import jwt from "jsonwebtoken";

 export const SECRET = "Sec3rt"; 
const app = exp();

 export const authjwt = (req,res,next)=> {
         try {
                
                const authHeader = req.headers.authorization;
                if(authHeader){
                        const token = authHeader.split(' ')[1];
                        console.log(token);
                        if(!token){
                                console.log("token not found");
                        }
                        jwt.verify(token,SECRET,(err,user)=>{
                                if(err){
                                     console.log(err);
                                     return res.sendStatus(403); 
                                }
                                console.log("Auth Sucess");
                                req.userId = user.id;
                                console.log(user.id);
                                next();
                        })
                }else{
                        res.sendStatus(401)
                }
         } catch (error) {
                res.sendStatus(403);  
         }

 }