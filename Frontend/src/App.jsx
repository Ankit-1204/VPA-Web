import { useState } from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './Pages/Home'

import Admin from './Pages/Admin'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
function App() {

  return (
    <Router>
    <Routes>
      <Route path='/admin' element={<Admin/>}/>
      <Route path='/admin' element={<Admin/>}/>
      <Route path='/' element={<Home/>}/>
    </Routes>
    </Router>
  )
}

export default App
