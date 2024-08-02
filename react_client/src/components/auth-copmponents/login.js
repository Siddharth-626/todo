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
        <div className="login">
            <span>Login</span><br></br>
            <label>UserName</label>
            <br></br>
            <input placeholder="Username" className="auth_input" onChange={updateUsername} value={username}></input>
            <br></br>
            <label>password</label><br></br>
            <input placeholder="password" type="password" className="auth_input" onChange={updatePassword} value={password}></input><br></br>
            <button type="button" className="authbtn authlogin" onClick={handleLogin}>Login</button>
        </div>
    )
}

export default Login;