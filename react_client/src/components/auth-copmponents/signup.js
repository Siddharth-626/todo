import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const navigate = useNavigate();
    function handleSignup() {
         axios.post('http://localhost:3000/auth/signup',{username:username,password:password}).then(res =>{
            console.log('Signup:',res.data);
            navigate('/login')
         })
    }
    function updateUsername(e) {
        setUsername(e.target.value)
    }
    function updatePassword(e) {
        setPassword(e.target.value)
    }
    return (
        <div className="signup flex flex-col justify-center bg-slate-200 dark:bg-gray-800 rounded-lg mx-auto my-10 p-12 w-1/5">
            <span className="text-slate-950 dark:text-slate-200">SignUp</span><br></br>
            <label className="text-slate-950 dark:text-slate-200">UserName</label>
            <br></br>
            <input placeholder="Username" className="px-2.5 py-2.5 rounded-md" onChange={updateUsername} value={username}></input>
            <br></br>
            <label className="text-slate-950 dark:text-slate-200">password</label><br></br>
            <input placeholder="password" className=" px-2.5 py-2.5 rounded-md mb-5" type="password" onChange={updatePassword} value={password}></input><br></br>
            <button type="button" className="bg-red-600 p-3 rounded-md text-white" onClick={handleSignup}>SignUp</button>
        </div>
    )
}

export default Signup;