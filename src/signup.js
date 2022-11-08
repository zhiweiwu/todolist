import { FirebaseError } from 'firebase/app'
import React,{useState,useEffect,useRef} from 'react'
import{Route,Routes,Link} from 'react-router-dom'
import {Form,Button,Card} from 'react-bootstrap'
import {useForm} from 'react-hook-form'
import {useAuth} from './AuthContext'

function Signup(){
   // const[fname,setFname]=useState('')
   // const[email,setEmail]=useState('')
   // const[password,setPassword]=useState('')
   const {creatAccount,monitorAuthStateUser}=useAuth()
   useEffect(()=>{
    monitorAuthStateUser()
},[])
   
     const {register ,handleSubmit,formState:{errors,isSubmitSuccessful}} =useForm({mode:'onChange',defaultValues:{firstName:"",email:"",password:""}})
    const onSubmit = data => {console.log(data.firstName);creatAccount(data.email,data.password);};
   
    console.log(errors,'issuccessful',isSubmitSuccessful)
    return (
        <Card  className="d-flex align-items-stretch justify-content-center mt-5  "  border="secondary" style={{ width: '20rem' , minHeight:'25rem'}}>
            <Card.Body  xs={16} className='w-575'>
                <h2 className=''>Sign up</h2>
                <hr/>
                <Form  onSubmit={handleSubmit(onSubmit)} className=" ">
                <Form.Group className=" mx-1 d-grid gap-2" controlId="formBasicFname">
                <Form.Label>First name</Form.Label>
                <Form.Control {...register("firstName",{required:'this is required' , minLength:{value:3,message:'name should be at least 3 characters '} ,pattern: {value:/^[A-Za-z]+$/i ,message:'please input vaild name'}})}  type="text" placeholder="Enter first name" />
                <p className="errorMsg">{errors.firstName?.message}</p>
                </Form.Group>
                <Form.Group className=" mx-1 d-grid gap-1" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control {...register("email",{required:'this is required', pattern: {value:/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/ ,message:'please input vaild email'}})}  type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                
                </Form.Text>
                <p className="errorMsg">{errors.email?.message}</p>
                </Form.Group>
                
                <Form.Group className=" mx-1 d-grid gap-2" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control {...register("password",{required:'this is required',minLength:{value:8,message:'Password should be at-least 8 characters.'}})} type="password" placeholder="Password" />
                <p className="errorMsg">{errors.password?.message}</p>
                </Form.Group>
              
                <div className=" d-grid gap-2">
                <Button variant="primary" size="md" type="submit">
                
                LOG IN
                </Button>
                </div>
                <div className="mt-3"> 
                <Link to="/">Already got an account?</Link> 
                </div>
                </Form>
            </Card.Body>
        </Card>
            )


                }
export default Signup