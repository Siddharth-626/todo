import axios from "axios";
import { useContext, useEffect, useState } from "react";
import context from "../../utils/context ";


function Todoform(props) {
    const [tit,setTitle] = useState('');
    const [des,setDescription] = useState('');
    const { token } = useContext(context)
    function handleSave() {
        const data = {title:tit,description:des};

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
        <div className="bg-slate-200 dark:bg-gray-800 p-8 rounded-lg  mx-20 my-20 w-1/5  h-1/5">
            <span className="form-title text-slate-950 dark:text-slate-200">Add Your Todo Here</span><br></br>
            <label className="text-slate-950 dark:text-slate-200">Title</label><br></br>
            <input placeholder="Title" type="text" className="p-2.5 rounded mb-5" onChange={titChange} value={tit}></input><br></br>
            <label className="text-slate-950 dark:text-slate-200">Description</label><br></br>
            <input placeholder="Description" type="text" className="p-2.5 rounded mb-5" onChange={desChange} value={des}></input><br></br>
            <button type="button" className="bg-blue-600 text-white px-7 py-3 rounded float-right" onClick={handleSave} >{props.edit ? "Update" : "Save"}</button>
        </div>
    )
}

export default Todoform;