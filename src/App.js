
import './App.css';
import Signup from './signup';
import {Route,Routes } from 'react-router';
import WebNavbar from './nav';
import Login from './login';
import Forgotpassword from './forgotpassword';
import Todolist from './todolist';
import Weather from './weather';
import React,{useState,useEffect,useRef} from 'react';
import{Container} from 'react-bootstrap';
import NotFound from './NotFound'
import { AuthProvider } from './AuthContext';

function App() {
  const[name,setName]=useState('')
  const[num,setNum]=useState(0)
  const renderCount=useRef(0)
  const handlechange=(e)=>{setName(e.target.value)}
  useEffect(()=>{ renderCount.current++ })
 
  return (

    
    <AuthProvider>
    
  
   <WebNavbar />
    <Container className="d-flex  justify-content-center mt-5  "  >
    <Routes>
      <Route exact path='/' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/forgotpassword' element={<Forgotpassword />} />
      <Route path='/weather' element={<Weather />} />
      <Route path='/todolist' element={<Todolist />} />
      <Route path='*' element={<NotFound />} />
      </Routes>

    </Container></AuthProvider>
  );
}

export default App;
