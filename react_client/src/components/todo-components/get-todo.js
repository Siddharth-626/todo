import axios from "axios";
import { useEffect, useState } from "react";



function Gettodo(props) {
    const [data,setData] = useState([]);
    const token = localStorage.getItem('token');
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
        <div className="gettodo">
            <span className="gettodo-title"> Todo List </span>
            <ul >
                {data.map((item) => (

                    <li key={item._id}>{item.title} : {item.description}
                        <button className="editBtn" onClick={() => { updateTodo(item) }}>Edit</button>
                        <button className="deleteBtn" onClick={() => { deleteTodo(item) }}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Gettodo;