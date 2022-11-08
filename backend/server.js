const express=require('express');
const cors=require('cors');
const mongoose= require('mongoose');
const app=express();
app.use(cors());
app.use(express.json());

app.get('/hello',(req,res)=>{
    res.send('hello world')
})

app.listen(8000,()=>{
console.log('server started on 8000')
})
