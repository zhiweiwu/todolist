import { useState,useEffect  } from "react";import {Form,Button,Card, FormText,InputGroup,input} from 'react-bootstrap'
import './weather.css';
import clear from './img/sun.png';
import rain from './img/rain.png';
import clound from './img/cloud.png';

function Weather(){

    const[cdata,setCdata]=useState([]);
    const[fdata,setFdata]=useState([]);
    const[location,SetLocation]=useState('');
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const days = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let date=new Date();
    const fDays=[];
    const getFiveDay=()=>{
     // const days = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      let cDay= date.getDay();
      let day=0;
      while(day<=5){
        
       
        if(cDay>=7){ cDay=0}
        fDays.push(days[cDay]);
        day++;cDay++;
       
      }
      return fDays;
      

    }

 
    
   const fetchForecastApi=()=>{
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=10afb3037e01889a9f47c44a7c8612af&units=metric`)
    .then((res) => res.json())
   // .then((res)=>{if(res.status==404){SetLocation('dsdsd')}})
    .then((fdata)=>{
        
        setFdata(fdata);console.log({fdata});
    })
    .catch((err) => {
        console.log(err.message);
     });
    }
    const fetchCurrentApi=()=>{
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=10afb3037e01889a9f47c44a7c8612af&units=metric`)
      .then((res) => res.json())
     // .then((res)=>{if(res.status==404){SetLocation('dsdsd')}})
      .then((cdata)=>{
          
          setCdata(cdata);console.log({cdata});
      })
      .catch((err) => {
          console.log(err.message);
       });
      }

    const handleKeyDown=(e)=>{
        if(e.key==='Enter'){fetchForecastApi() ;fetchCurrentApi()
        return }
    }
    const handleChange=e=>{
        SetLocation(e.target.value)
        console.log({location})
      }
  
    
    return <Card className=" weather_Container  rounded">
        <Card.Body className="text-white ">
        <h2  className="d-flex justify-content-center">Weather Forecast</h2>
   {console.log({location})} 
       
        <InputGroup size="md" className="searchBar d-flex justify-content-center  my-4 ">
        <Form.Control
          placeholder="Please Input city,country code to search for a weather"
          aria-label="schedule"
          aria-describedby="basic-addon2"
          value={location}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
    
        />

      </InputGroup>
     
        <p className="d-flex justify-content-center cColor">{days[date.getDay()]+','+date.getDate()+' '+month[date.getMonth()]+' '+date.getFullYear()+ ' '+'| Local Time:'+ ('0'+date.getHours()).slice(-2)+':'+('0'+date.getMinutes()).slice(-2)}</p>
       {fdata.city ?<p className="d-flex justify-content-center cFont"> {fdata.city.name }，{fdata.city.country}</p> : null}
       {cdata.weather?<p className="d-flex justify-content-center wColor"> {cdata.weather[0].main }</p> : null}
       <div  className="d-flex justify-content-around mt-5">
      {cdata.weather?cdata.weather[0].main=='Clouds'?<img className="imgSize"src={clound}></img>: cdata.weather[0].main=='Rain'?<img className="imgSize"src={rain}></img>: cdata.weather[0].main=='Clear'?<img className="imgSize"src={clear}></img>:null :null}
      {cdata.main ?<p className="d-flex justify-content-center fFont"> {cdata.main.temp.toFixed(0) }°</p> : null}
    
      </div><br></br>
      <p className="hFont">HOURLY FORECAST</p>
      <hr/>
      <div className="d-flex justify-content-around cColor">
      <p>{('0'+date.getHours()).slice(-2)+':'+('0'+date.getMinutes()).slice(-2)}</p> <p>{('0'+(1+date.getHours())).slice(-2)+':'+('0'+date.getMinutes()).slice(-2)}</p> <p>{('0'+(2+date.getHours())).slice(-2)+':'+('0'+date.getMinutes()).slice(-2)}</p> <p>{('0'+(3+date.getHours())).slice(-2)+':'+('0'+date.getMinutes()).slice(-2)}</p> <p>{('0'+(4+date.getHours())).slice(-2)+':'+('0'+date.getMinutes()).slice(-2)}</p> 
      </div>
      <div className="d-flex justify-content-around cColor">
      {cdata.weather?cdata.weather[0].main=='Clouds'?<img className="sImgSize"src={clound}></img>: cdata.weather[0].main=='Rain'?<img className="sImgSize"src={rain}></img>: cdata.weather[0].main=='Clear'?<img className="sImgSize"src={clear}></img>:null :null}     {fdata.list?fdata.list[0].weather[0].main=='Clouds'?<img className="sImgSize"src={clound}></img>: fdata.list[0].weather[0].main=='Rain'?<img className="sImgSize"src={rain}></img>: fdata.list[0].weather[0].main=='Clear'?<img className="sImgSize"src={clear}></img>:null :null}  {fdata.list?fdata.list[1].weather[0].main=='Clouds'?<img className="sImgSize"src={clound}></img>: fdata.list[1].weather[0].main=='Rain'?<img className="sImgSize"src={rain}></img>: fdata.list[1].weather[0].main=='Clear'?<img className="sImgSize"src={clear}></img>:null :null}  {fdata.list?fdata.list[2].weather[0].main=='Clouds'?<img className="sImgSize"src={clound}></img>: fdata.list[2].weather[0].main=='Rain'?<img className="sImgSize"src={rain}></img>: fdata.list[2].weather[0].main=='Clear'?<img className="sImgSize"src={clear}></img>:null :null}{fdata.list?fdata.list[3].weather[0].main=='Clouds'?<img className="sImgSize"src={clound}></img>: fdata.list[3].weather[0].main=='Rain'?<img className="sImgSize"src={rain}></img>: fdata.list[3].weather[0].main=='Clear'?<img className="sImgSize"src={clear}></img>:null :null}

    </div>
    <div className="d-flex justify-content-around cColor mt-4">
      <p>{cdata.main ?cdata.main.temp.toFixed(0)+'°':null }</p> <p>{fdata.list ?fdata.list[0].main.temp.toFixed(0)+'°':null }</p> <p>{fdata.list ?fdata.list[1].main.temp.toFixed(0)+'°':null }</p> <p>{fdata.list ?fdata.list[2].main.temp.toFixed(0)+'°':null }</p> <p>{fdata.list ?fdata.list[3].main.temp.toFixed(0)+'°':null }</p> 
      </div>

      <p className="hFont">DAILY FORECAST</p>
      <hr/>
      <div className="d-flex justify-content-around cColor">
      <p>{getFiveDay()[0]}</p> <p>{getFiveDay()[1]}</p> <p>{getFiveDay()[2]}</p> <p>{getFiveDay()[3]}</p> <p>{getFiveDay()[4]}</p> 
      </div>
      <div className="d-flex justify-content-around cColor">
      {cdata.weather?cdata.weather[0].main=='Clouds'?<img className="sImgSize"src={clound}></img>: cdata.weather[0].main=='Rain'?<img className="sImgSize"src={rain}></img>: cdata.weather[0].main=='Clear'?<img className="sImgSize"src={clear}></img>:null :null}     {fdata.list?fdata.list[7].weather[0].main=='Clouds'?<img className="sImgSize"src={clound}></img>: fdata.list[7].weather[0].main=='Rain'?<img className="sImgSize"src={rain}></img>: fdata.list[7].weather[0].main=='Clear'?<img className="sImgSize"src={clear}></img>:null :null}  {fdata.list?fdata.list[14].weather[0].main=='Clouds'?<img className="sImgSize"src={clound}></img>: fdata.list[14].weather[0].main=='Rain'?<img className="sImgSize"src={rain}></img>: fdata.list[14].weather[0].main=='Clear'?<img className="sImgSize"src={clear}></img>:null :null}  {fdata.list?fdata.list[28].weather[0].main=='Clouds'?<img className="sImgSize"src={clound}></img>: fdata.list[28].weather[0].main=='Rain'?<img className="sImgSize"src={rain}></img>: fdata.list[28].weather[0].main=='Clear'?<img className="sImgSize"src={clear}></img>:null :null} {fdata.list?fdata.list[38].weather[0].main=='Clouds'?<img className="sImgSize"src={clound}></img>: fdata.list[38].weather[0].main=='Rain'?<img className="sImgSize"src={rain}></img>: fdata.list[38].weather[0].main=='Clear'?<img className="sImgSize"src={clear}></img>:null :null}
    </div>
    <div className="d-flex justify-content-around cColor mt-4">
      <p>{fdata.list ?fdata.list[1].main.temp.toFixed(0)+'°':null }</p> <p>{fdata.list ?fdata.list[9].main.temp.toFixed(0)+'°':null }</p> <p>{fdata.list ?fdata.list[14].main.temp.toFixed(0)+'°':null }</p> <p>{fdata.list ?fdata.list[24].main.temp.toFixed(0)+'°':null }</p> <p>{fdata.list ?fdata.list[36].main.temp.toFixed(0)+'°':null }</p> 
      </div>


    </Card.Body>
    </Card>
   

    }
    
    export default Weather