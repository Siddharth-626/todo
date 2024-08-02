import { useState } from "react";
import Todoform from "./form";
import Gettodo from "./get-todo";


function Todo() {
    const [edit,setEdit] = useState(null);
    const [get_todo,setGettodo] = useState(true);

    const getTodo= ()=>{
        setGettodo(get_todo ? false:true);
        setEdit(null)
    }
    const editTodo = (item)=>{
         setEdit(item);
    }
    return(
        <div className="todo">
             <Todoform edit = {edit} getTodo = {getTodo}/>
             <Gettodo get_todo={get_todo} editTodo = {editTodo}/>
        </div>
    )
}

export default Todo;