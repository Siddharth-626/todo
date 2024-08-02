
import {todoCollection} from "../models/db.js"


export const addTodo = async (req, res) => {
    const data = { title: req.body.title, description: req.body.description,userId : req.userId};

    try {
        const entry = new todoCollection(data);
        await entry.save();
        res.status(200).json(data);
        console.log("Added successfully:", data);
    } catch (err) {
        console.log(err);
        res.status(400).json({message:"Add failed"});
    }
}


export const getTodo = async (req, res) => {
    const userId = req.userId;
    console.log(userId);
    try {
        const data = await todoCollection.find({userId}).exec();
        console.log("Get success:",data);
        res.status(200).json(data);
    } catch(err) {
        console.log("Get failure:", err);
        res.status(400).json(err);
    }
}


export const updateTodo = async (req, res) => {
    try {
            const entry = await todoCollection.findByIdAndUpdate(req.params.id, 
            req.body, {new:true});
            console.log("Updated:", entry);
            res.status(200).json(entry);
        
    } catch(err) {
        console.log("Update failure:", req.params.id,err);
        res.status(400).json(err);
    }
}
export const deleteTodo = async (r, p) => {
    try {
        await todoCollection.findByIdAndDelete(r.params.id);
        p.status(200).json({message: `Deleted ${r.params.id} succesfully`});
    } catch(err) {
        console.log("Deleted failure:");
        p.status(400).json(err);
    }
}