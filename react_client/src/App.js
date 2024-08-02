import React, { createContext, useState } from 'react';
import './App.css';
import Navbar from './components/nav';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Landing from './components/landing';
import Signup from './components/auth-copmponents/signup';
import Login from './components/auth-copmponents/login';
import Todo from './components/todo-components/todo';
 export const context = createContext();
function App() {
  const [login,setLogin] = useState(false);

  return (
    <div className="App">
      <context.Provider value={{login,setLogin}}>
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
