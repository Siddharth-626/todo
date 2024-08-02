
import exp from "express"
import {authjwt,SECRET} from "../middleware/auth_middleware.js";
import { addTodo, deleteTodo } from "../controler/todo_controler.js";
import { getTodo } from "../controler/todo_controler.js";
import { updateTodo } from "../controler/todo_controler.js";

const router = exp.Router()
router.use(exp.json())

router.post('/todos',authjwt,addTodo)
router.get('/todos',authjwt,getTodo)
router.put('/todos/:id',authjwt,updateTodo)
router.delete('/todos/:id',authjwt,deleteTodo)
export default router;