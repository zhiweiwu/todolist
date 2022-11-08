import React,{useState,useEffect,useRef} from 'react'
import { FirebaseError } from 'firebase/app'
import {Form,Button,Card} from 'react-bootstrap'
import {loginAccount,showLoginError,auth} from './firebase'
import {useForm} from 'react-hook-form'
import{Link} from 'react-router-dom'
import Signup from './signup';
import {useAuth} from './AuthContext'
function Login(){
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const {register ,handleSubmit,formState:{errors,isSubmitSuccessful}} =useForm({mode:'onChange',defaultValues:{email:"",password:""}})
    const {error,loginAccount,monitorAuthStateUser}=useAuth()
    const onSubmit = data => {console.log(data);loginAccount(data.email,data.password); };
  
 
    console.log(errors)
    useEffect(()=>{
        monitorAuthStateUser()
    },[])

    return (
        <div>


        <Card className="d-flex align-items-stretch justify-content-center mt-5  "  border="secondary" style={{ width: '20rem' , minHeight:'25rem'}}>
            <Card.Body  xs={16} className='w-575'>
                <h2 className=''>Log In</h2>
                <hr/>
                <Form onSubmit={handleSubmit(onSubmit)}  className=" ">
                <Form.Group className=" mx-1 d-grid gap-1" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control {...register("email",{required:'this is required', pattern: {value:/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/ ,message:'please input vaild email'}})}  type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
               
                </Form.Text>
                <p className="errorMsg">{errors.email?.message}</p>
                </Form.Group>

                <Form.Group className="mb-4 mx-1 d-grid gap-2" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control {...register("password",{required:'this is required',minLength:{value:8,message:'Password should be at-least 8 characters.'}})} type="password" placeholder="Password" />
                <p className="errorMsg">{errors.password?.message}<br/>{error}</p> 
                </Form.Group>
           
                <div className="d-grid gap-2">
                <Button variant="primary" size="md" type="submit">
                
                LOG IN
                </Button>
                </div>
                <div className="mt-2"> 
                <Link to="/signup"> Don't have an account?</Link> <br/> <Link to="/forgotpassword">Forgot password?</Link>
                </div>
                </Form>
            </Card.Body>
        </Card>
        
        </div>
            )


                }
export default Login