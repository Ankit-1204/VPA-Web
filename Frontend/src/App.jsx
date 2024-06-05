import { useState } from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
import { useEffect } from 'react'
import { useContext } from 'react'
import './App.css'
import axios from 'axios'
axios.defaults.withCredentials=true
import { useNavigate } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import {UserContext,UserContextProvider} from '../context/context';
function App() {

const {user}=useContext(UserContext);
console.log(user)
  return (
    
    
   
    <Router>
      <Routes>
      <Route path='/signup' element= {!user?<SignUp/>:( <Navigate to="/home" replace />)}/>
      <Route path='/login' element= {!user?<Login/>:( <Navigate to="/home" replace />)}/>
      <Route path='/home' element= {!user?( <Navigate to="/login" replace />):<Home/>}/>
      <Route path='/' element={!user?( <Navigate to="/login" replace />) :( <Navigate to="/home" replace />)}/>
      </Routes>
    </Router>
   
    
    
  )
}

export default App
