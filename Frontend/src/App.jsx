import { useState } from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
import { useEffect } from 'react'
import { useContext } from 'react'
import './App.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import {UserContext,UserContextProvider} from '../context/context';
function App() {
  
const [islogin,setLogin]=useState(false);
useEffect(()=>{
  const logStatus= async ()=>{
    try{
      const response= await axios.get('http://localhost:8000/auth/profile');
      if(response.data){
         setLogin(true);
      }
    }catch(error){
      console.log(error);
    }
  }
  logStatus();
},[]);
  return (
    
    <Router>
    <Routes>
      <Route path='/signup' element={islogin==true?( <Navigate to="/" replace />) :<SignUp/>}/>
      <Route path='/login' element={islogin==true?( <Navigate to="/" replace />) :<Login/>}/>
      <Route path='/' element= {<Home/>}/>
    </Routes>
    </Router>
    
  )
}

export default App
