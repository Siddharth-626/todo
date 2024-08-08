import React, {  useState } from 'react';
import './App.css';
import Navbar from './components/home-components/nav';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Landing from './components/home-components/landing';
import Signup from './components/auth-copmponents/signup';
import Login from './components/auth-copmponents/login';
import Todo from './components/todo-components/todo';
import context from './utils/context ';
function App() {
  const [login,setLogin] = useState(false);
  const token = localStorage.getItem('token');
  return (
    <div className="App">
      <context.Provider value={{login,setLogin,token}}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route  path='/todo' element={<Todo />}/>
        </Routes>
      </Router>
      </context.Provider>
    </div>
  );
}

export default App;
