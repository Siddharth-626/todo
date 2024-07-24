import exp from "express";
import mon from "mongoose";
import dot from "dotenv";
import todo from "./routes/todo.js"
import auth from "./routes/auth.js"
import cors from "cors"
const app = exp();
dot.config();
app.use(exp.json())
app.use(cors())

app.use('/auth',auth)
app.use('/todo',todo);

const connect = async () => {
    try {
        await mon.connect(process.env.MONGO);
        console.log("Connection to DB successfull");
    } catch(err) {
        console.log("Error while connecting to DB:", err);
    }
}

app.listen(process.env.PORT,()=>{
    connect();
    console.log("Server is running");
})