import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { context } from "../App";


 export function AuthBtns(props) {
    
    const navigate = useNavigate();
    function handleSignup() {
        navigate('/signup');
    }
    function handleLogin() {
        navigate('/login');
    }
    function handleLogout() {
         localStorage.removeItem('token');
         navigate('/')
         props.setLogin(false);
    }
     return(
        <>
        {!props.login ?(
            <div className="authBtns">
            <button type="button" className="signupBtn authbtn" onClick={handleSignup}>Signup</button>
            <button type="button" className="loginBtn authbtn" onClick={handleLogin}>Login</button>
        </div>
        ):( 
            <div className="authBtns">
            <button type="button" className="logoutBtn authbtn" onClick={handleLogout}>Logout</button>
            </div>
        )}
        </>

        
     )
}


function Navbar() {
    const navigate = useNavigate();
    const { login , setLogin} = useContext(context);
    function home() {
        navigate('/');
    }
    
    return(
        
        <div className="navbar">
            <span className="navTitle" onClick={home}>Todo App</span>
             <AuthBtns login = {login} setLogin = {setLogin}/>
        </div>
    )
}
 export default Navbar;