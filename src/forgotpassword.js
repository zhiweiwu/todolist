import React,{useState,useEffect,useRef} from 'react'
import { FirebaseError } from 'firebase/app'
import {Form,Button,Card} from 'react-bootstrap'
import {showLoginError,auth} from './firebase'
import {AuthErrorCodes, createUserWithEmailAndPassword, getAuth,sendPasswordResetEmail,signInWithEmailAndPassword} from'firebase/auth';
import {useForm} from 'react-hook-form'
import{Route,Routes,Link} from 'react-router-dom'
import {useAuth} from './AuthContext'
import Signup from './signup';
function Forgotpassword(){
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const[error,setError]=useState('')
    const {register ,handleSubmit,formState:{errors,isSubmitSuccessful}} =useForm({mode:'onChange',defaultValues:{email:"",password:""}})
    const onSubmit = data => {console.log(data);resetpassword(data.email); };
    const {monitorAuthStateUser}=useAuth()
    const resetpassword= async(inputemail)=>{
        const email=inputemail;
        try{
            setError('')
          const userCredential= await sendPasswordResetEmail(auth,inputemail);
          setError('The link has been sent! please check your email box for further instructions')
        }
        catch(error){
            setError('')
          console.log(error);
          //setError('Failed to reset password')
          setError('Failed to reset password---'+error.message)
      
        }
      }

      
      useEffect(()=>{
        monitorAuthStateUser()
    },[])

 
    console.log(errors)

    return (
        <div>

        <Card className="d-flex align-items-stretch justify-content-center mt-5  "  border="secondary" style={{ width: '20rem' , minHeight:'18rem'}}>
            <Card.Body  xs={16} className='w-575'>
                <h2 className=''>Password Reset</h2>
                <hr/>
                <Form onSubmit={handleSubmit(onSubmit)}  className=" ">
                <Form.Group className=" mx-1 d-grid gap-1" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control {...register("email",{required:'this is required', pattern: {value:/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/ ,message:'please input vaild email'}})}  type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                
                </Form.Text>
                <p className="errorMsg">{errors.email?.message}</p>
                </Form.Group>
                <p className="errorMsg">{error}</p> 
                <div className="d-grid gap-2">
                <Button variant="primary" size="md" type="submit">
                
                Reset Password
                </Button>
                </div>
                <div className="mt-4"> Need an account?
                <Link to="/signup">  Sign in</Link>
                </div>
                </Form>
            </Card.Body>
        </Card>
        
        </div>
            )


                }
export default Forgotpassword