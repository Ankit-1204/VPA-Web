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
import { Navigate } from 'react-router-dom'
import {UserContext} from '../context/context';
function App() {

const {user,setUser,loading}=useContext(UserContext);

useEffect(()=>{
  const checkLogin=async ()=>{
    try{
      const response=await axios.get('http://localhost:8000/auth/profile')
      if(response.data){
        setUser(true);
      }
      else{
        setUser(false);
      }
    }catch(error){
      console.log(error);
    }
  }
  checkLogin();
},[])
console.log(user)

if (loading) {
  return <div>Loading...</div>; 
}
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
