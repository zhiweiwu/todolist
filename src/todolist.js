import { useState,useEffect } from 'react'
import {Form,Button,Card, FormText} from 'react-bootstrap'
import {useAuth} from './AuthContext'
import InputGroup from 'react-bootstrap/InputGroup';
import ListGroup from 'react-bootstrap/ListGroup';
import check from './img/check.svg';
import x from './img/x.svg';
import './App.css';

function Todolist(){
    const[input,setInput]=useState('')
    const[todos,setTodos]=useState([])
    const[listColor,setListColor]=useState("primary")
    const[complete,SetComplete]=useState(false)
    const completedCondition=()=>{SetComplete(!complete)}
    const colorContainer=['primary','secondary','success','danger','warning','info','dark']
    const ramdomColor=()=>{ return Math.floor(Math.random() * 7
      )
    }
    const comleteTodo=id=>{
      setTodos(
        todos.map((item)=>{
          if(item.id===id){
            return{...item,checked:!item.checked}
          }
          return item
        })
      )
      

    }
    const removeTodo=id=>{
      const removeArr=[...todos].filter(todo=>todo.id!==id);
      setTodos(removeArr);
    }
    const {logout,monitorAuthStateGuest}=useAuth()
    useEffect(()=>{
        monitorAuthStateGuest()
    },[])
    const handleSubmit=e=>{e.preventDefault();
      
    }
    const handleChange=e=>{
      setInput(e.target.value)
    }
    const addTodo=todo=>{
      if( !todo || /^\s*$/.test(todo)){
        setInput('A bad plan is better than no plan')
        
        return
      }
      else{
        
        const newTodos={
          id:Math.random(),
          todo:todo,
          color:ramdomColor(),
          checked:false
        }
        setTodos([...todos,newTodos])
        setInput('');
        console.log(...todos)
      }
    }
    return(
      
        <Card className="d-flex align-items-stretch justify-content-center mt-5  "  border="secondary" style={{ width: '40rem' , minHeight:'17rem'}}>
        <Card.Body  xs={16} className='w-575'>
            
            <h2 className=' d-flex justify-content-center'>TODO LIST</h2>
            <hr/>
            
            <h2 className="todoFont d-flex justify-content-center my-4">What's the plan for Today?</h2>
        <InputGroup className="mb-3">
        <Form.Control
          placeholder="Input schedule for today"
          aria-label="schedule"
          aria-describedby="basic-addon2"
          value={input}
          onChange={handleChange}
        />
        <Button onClick={()=>addTodo(input)} variant="outline-secondary" id="button-addon2">
          Add 
        </Button><i className="bi bi-check"></i>
      </InputGroup>
      <ListGroup>
        {todos.map((todo)=>(
          <ListGroup.Item key={todo.id} className={ "d-flex justify-content-between " + (todo.checked ? "checked":"")}  variant={colorContainer[todo.color]}>{todo.todo}<div><img onClick={()=>comleteTodo(todo.id)} alt='checked'src={check} title='ccomplete'/><img onClick={()=>removeTodo(todo.id)}src={x} title='ccomplete'/></div></ListGroup.Item>

        ))}

    </ListGroup>
            <div className=" d-flex justify-content-center  mt-5 ">
            <Button onClick={logout}variant="primary" size="md" type="submit">
            
            LOG OUT
            </Button>
            </div>
            
        </Card.Body>
    </Card>
    )}
    
    export default Todolist
