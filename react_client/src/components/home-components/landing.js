import { useNavigate } from "react-router-dom";
import { AuthBtns } from "./nav";
import { useContext } from "react";
import context from "../../utils/context ";



function Landing() {
  const navigate = useNavigate();
    const {login} = useContext(context)
     const handleGetStarted = ()=>{
         navigate('/todo');
     }

    return(
        <div className="flex justify-center items-center h-screen text-white">
        <div className="max-w-1/2 text-center">
        <h1 className="text-8xl mb-5 text-slate-200 dark:text-slate-950">Welcome to Todo App</h1>
        <p className="text-3xl text-slate-200 dark:text-slate-950">Organize your tasks efficiently and boost your productivity.</p>
        {!login?(
            <div><AuthBtns /></div>
        ):(
          <div className="items-center">
                <button type="button" className="bg-blue-500 px-20 py-5  rounded m-5 text-md" onClick={handleGetStarted}>Get Started</button>
          </div>
        )}
     
      </div>
        </div>
    )
}

export default Landing;