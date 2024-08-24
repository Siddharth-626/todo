import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import context from "../../utils/context ";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { setLogin } = useContext(context);
    function handleLogin() {
        axios.post('http://localhost:3000/auth/login',{username:username,password:password}).then(res =>{
            console.log('login-token:',res.data);
            const  token  = res.data;
            localStorage.setItem('token', token);
            navigate('/todo');
            setLogin(true);
         })
    }
    function updateUsername(e) {
        setUsername(e.target.value)
    }
    function updatePassword(e) {
        setPassword(e.target.value)
    }
    return (
        <div className="login flex flex-col justify-center bg-slate-200 dark:bg-gray-800 rounded-lg mx-auto my-10 p-12 w-1/5">
            <span className="text-slate-950 dark:text-slate-200">Login</span><br></br>
            <label className="text-slate-950 dark:text-slate-200">UserName</label>
            <br></br>
            <input placeholder="Username" className=" px-2.5 py-2.5 rounded-md mb-5" onChange={updateUsername} value={username}></input>
            <br></br>
            <label className="text-slate-950 dark:text-slate-200">password</label><br></br>
            <input placeholder="password" type="password" className=" px-2.5 py-2.5 rounded-md" onChange={updatePassword} value={password}></input><br></br>
            <button type="button" className="bg-green-600 p-3 rounded-md text-white" onClick={handleLogin}>Login</button>
        </div>
    )
}

export default Login;