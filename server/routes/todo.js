
import exp from "express"
import {todoCollection} from "../db/db.js"
import {authjwt,SECRET} from "../middleware/auth_middleware.js";

const router = exp.Router()
router.use(exp.json())




router.post('/todos',authjwt, async (req, res) => {
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
})


// router.get('/', (req,res) => {

// })
router.get('/todos',authjwt, async (req, res) => {
    const userId = req.userId;
    console.log(userId);
    try {
        const data = await todoCollection.find({userId}).exec();
        console.log("Get success:");
        res.status(200).json(data);
    } catch(err) {
        console.log("Get failure:", err);
        res.status(400).json(err);
    }
})

const validateUser = async(userId)=>{
    const user = await todoCollection.findOne({ userId: userId });
    if (user.id == userId) {
        console.log("user");
      return true;
    }
    return false;
}
router.put('/todos/:id',authjwt, async (req, res) => {
    try {
        if( validateUser(req.userId)){
            const entry = await todoCollection.findByIdAndUpdate(req.params.id, 
            req.body, {new:true});
            console.log("Updated:", entry);
            res.status(200).json(entry);
        }
        else{
            res.status(400).json({message:"user not valid"});
        }
        
    } catch(err) {
        console.log("Update failure:", req.params.id,err);
        res.status(400).json(err);
    }
})

router.delete('/todos/:id',authjwt, async (r, p) => {
    try {
        await todoCollection.findByIdAndDelete(r.params.id);
        p.status(200).json({message: `Deleted ${r.params.id} succesfully`});
    } catch(err) {
        console.log("Deleted failure:");
        p.status(400).json(err);
    }
})

export default router;