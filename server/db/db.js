import mon from "mongoose";

const userSchema = new mon.Schema({
    username:String,
    password:String
})

const tschema = new mon.Schema({
    title:String,
    description:String,
    userId:String
})

export const todoCollection = new mon.model('todo',tschema)
 export const Users = new mon.model('users',userSchema);

