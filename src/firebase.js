import { initializeApp } from "firebase/app";
import React,{useState,useEffect,useRef} from 'react'
import {getAuth} from'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyDJtrojGHtnAGOf8N_qC5_iiIGI_0GniLk",
  authDomain: "react-project-3e442.firebaseapp.com",
  databaseURL: "https://react-project-3e442-default-rtdb.firebaseio.com",
  projectId: "react-project-3e442",
  storageBucket: "react-project-3e442.appspot.com",
  messagingSenderId: "333290840048",
  appId: "1:333290840048:web:07158b0cf54165f923c735"
  };
  
  // Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);


  
