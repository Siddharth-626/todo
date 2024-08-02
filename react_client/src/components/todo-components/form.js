import axios from "axios";
import { useEffect, useState } from "react";


function Todoform(props) {
    const [tit,setTitle] = useState('');
    const [des,setDescription] = useState('');
    
    function handleSave() {
        const data = {title:tit,description:des};
        const token = localStorage.getItem('token');
        if(props.edit){
            console.log("edit");
            axios.put(`http://localhost:3000/todo/todos/${props.edit._id}`,data,{
                headers:{
                    'Authorization': `Bearer ${token}`,
                }
            }).then(res=>{
                console.log("Updated sucess:",res.data);
                props.getTodo();
            })
        }
        else{
            axios.post('http://localhost:3000/todo/todos',data,{
                headers:{
                    'Authorization': `Bearer ${token}`,
                }
            }).then(res=>{
                console.log("post sucess:",res.data);
                props.getTodo();
            })
        }
        setTitle('');
        setDescription('');
    }
    const titChange = (e)=>{
        setTitle(e.target.value);
    }
    const desChange = (e)=>{
        setDescription(e.target.value);
    }
    useEffect(()=>{
        if(props.edit){
            setTitle(props.edit.title);
            setDescription(props.edit.description);
        }
    },[props])

    return(
        <div className="todoform">
            <span className="form-title">Add Your Todo Here</span><br></br>
            <label>Title</label><br></br>
            <input placeholder="Title" type="text" className="todo-input" onChange={titChange} value={tit}></input><br></br>
            <label>Description</label><br></br>
            <input placeholder="Description" type="text" className="todo-input" onChange={desChange} value={des}></input><br></br>
            <button type="button" className="form-btn" onClick={handleSave} >{props.edit ? "Update" : "Save"}</button>
        </div>
    )
}

export default Todoform;