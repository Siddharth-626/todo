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
        <div className="signup">
            <span>SignUp</span><br></br>
            <label>UserName</label>
            <br></br>
            <input placeholder="Username" className="auth_input" onChange={updateUsername} value={username}></input>
            <br></br>
            <label>password</label><br></br>
            <input placeholder="password" className="auth_input" type="password" onChange={updatePassword} value={password}></input><br></br>
            <button type="button" className="authbtn authsignup" onClick={handleSignup}>SignUp</button>
        </div>
    )
}

export default Signup;