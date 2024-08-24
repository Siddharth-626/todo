import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import context from "../../utils/context ";


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
    return (
        <>
            {!props.login ? (
                <div className="flex gap-2 justify-center">
                    <button type="button" className="bg-red-600 rounded-md py-2 px-4 text-white" onClick={handleSignup}>Signup</button>
                    <button type="button" className="bg-green-600 rounded-md py-2 px-4 text-white" onClick={handleLogin}>Login</button>
                </div>
            ) : (
                <div className="flex gap-2">
                    <button type="button" className="bg-yellow-500 rounded-md py-2 px-4 text-white" onClick={handleLogout}>Logout</button>
                </div>
            )}
        </>


    )
}

function Theme() {
    const { darkMode, setDarkMode } = useContext(context);
    function toggleTheme() {
        setDarkMode(!darkMode)
    }
    return (
        <div className="">
            <span className="m-3 text-xl text-slate-950 dark:text-slate-200">{!darkMode ? "LightMode":"DarkMode" }</span>
            <label className="inline-block w-10 h-5 relative mt-2">
                <input type="checkbox" className="hidden" onChange={toggleTheme} checked={darkMode === true} />
                <span
                    className={`slider absolute cursor-pointer top-0 left-0 right-0 bottom-0 transition-all duration-400 rounded-full ${darkMode === true ? 'bg-blue-500' : 'bg-gray-300'}`}
                ></span>
                <span
                    className={`absolute content-[''] h-4 w-4 left-0.5 bottom-0.5 bg-white transition-all duration-400 rounded-full transform ${darkMode === true ? 'translate-x-5' : ''}`}
                ></span>
            </label>
        </div>
    )
}

function Navbar() {
    const navigate = useNavigate();
    const { login, setLogin } = useContext(context);
    function home() {
        navigate('/');
    }

    return (

        <div className="flex justify-between bg-slate-50 dark:bg-black font-sans gap-5 p-5 mx-2:">
            <span className="text-2xl cursor-pointer text-slate-900 dark:text-slate-100" onClick={home}>Todo App</span>
            <Theme />
            <AuthBtns login={login} setLogin={setLogin} />
        </div>
    )
}
export default Navbar;