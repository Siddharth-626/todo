import axios from "axios";
import { useContext, useEffect, useState } from "react";
import context from "../../utils/context ";



function Gettodo(props) {
    const [data,setData] = useState([]);
    const { token } = useContext(context)
    function getData() {
        axios.get('http://localhost:3000/todo/todos',{
            headers:{
                 'Authorization': `Bearer ${token}`
            }
        }).then(res=>{
                console.log('Get Data',res.data);
                setData(res.data);
        })
    }
    
    useEffect(()=>{
        getData();
     },[props])
    
    const updateTodo = (item)=>{
        props.editTodo(item);
    } 

    const deleteTodo = (item)=>{
        console.log('deldete');
         axios.delete(`http://localhost:3000/todo/todos/${item._id}`,{
            headers:{
                'Authorization': `Bearer ${token}`
           }
         }).then(res=>{
            console.log("Delete sucess",res.data);
            getData();
         })
         
    }
    return(
        <div className="bg-slate-200 dark:bg-slate-800 p-8 rounded-md mx-20 my-20 w-1/4">
            <span className="ml-64 text-3xl text-slate-950 dark:text-slate-200"> Todo List </span>
            <ul >
                {data.map((item) => (

                    <li className="text-slate-950 dark:text-slate-200" key={item._id}>{item.title} : {item.description}
                        <button className=" mx-6 bg-green-600 text-white px-8 py-2 rounded" onClick={() => { updateTodo(item) }}>Edit</button>
                        <button className=" bg-red-600 text-white px-7 py-2 rounded" onClick={() => { deleteTodo(item) }}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Gettodo;