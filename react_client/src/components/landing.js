import { useNavigate } from "react-router-dom";
import { AuthBtns } from "./nav";
import { useContext } from "react";
import { context } from "../App";



function Landing() {
  const navigate = useNavigate();
    const {login} = useContext(context)
     const handleGetStarted = ()=>{
         navigate('/todo');
     }

    return(
        <div className="landing-page">
        <div className="content">
        <h1>Welcome to Todo App</h1>
        <p>Organize your tasks efficiently and boost your productivity.</p>
        {!login?(
              <div className="authBtn_div"><AuthBtns /></div>
        ):(
          <div className="authBtn_div">
                <button type="button" className="get-startedBtn" onClick={handleGetStarted}>Get Started</button>
          </div>
        )}
     
      </div>
        </div>
    )
}

export default Landing;