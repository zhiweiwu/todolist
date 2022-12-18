import React,{useState,useContext,useEffect,useRef} from 'react'
import {auth} from './firebase'
import {AuthErrorCodes, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut} from'firebase/auth'
import{useNavigate} from 'react-router-dom'
const AuthContext= React.createContext()



export function useAuth(){
    return useContext(AuthContext) 
}
export function AuthProvider({children}){
  const navigate=useNavigate()
    const[error,setError]=useState('')
    const[loggedIn,setLoggedIn]=useState(false)
    const showLoginError=(error)=>{
      if (error.code==AuthErrorCodes.INVALID_PASSWORD){
       
        setError('password not match!')
       
        
      }
      else{
        setError(error.message)
      }
      
    }
    const loginAccount= async(inputemail,inputpassword)=>{
      const email=inputemail;
      const password=inputpassword;
      try{
          setError('')
        const userCredential= await signInWithEmailAndPassword(auth,email,password);
        setLoggedIn(true)
        console.log(userCredential.user);
        navigate('/todolist')
       
        
      }
      catch(error){
        console.log(error);
       showLoginError(error);
    
      }
    }

   const creatAccount= async(inputemail,inputpassword)=>{
      const email=inputemail;
      const password=inputpassword;
      try{
        const userCredential= await createUserWithEmailAndPassword(auth,email,password);
        console.log(userCredential.user);
        setLoggedIn(true)
        navigate('/todolist')
      }
      catch(error){
        console.log(error);
       
    
      }
    }

    const monitorAuthStateUser=async()=>{
      try{
        onAuthStateChanged(auth,user=>{
          if(user || setLoggedIn(true)){
            navigate('/todolist')
            console.log(setLoggedIn);
            console.log(user);
          }
        })
      }
      catch(error){
        console.log(error);
       
    
      }
    
    }
    const monitorAuthStateGuest=async()=>{
      try{
        onAuthStateChanged(auth,user=>{
          if(!user || setLoggedIn(false)){
            navigate('/')
            console.log(setLoggedIn);
            console.log(user);
          }
        })
      }
      catch(error){
        console.log(error);
       
    
      }
    
    }
    
    const logout=async()=>{
      try{
        await signOut(auth);  
        setLoggedIn(false)
        console.log('user logged out')
      }
      catch(error){
        console.log(error)
      }
    }


    const value={error,loginAccount,creatAccount,loggedIn,logout,monitorAuthStateUser,monitorAuthStateGuest}




return(
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
)
}
