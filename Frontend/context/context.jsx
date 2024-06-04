import axios from 'axios';
import { createContext ,useState,useEffect} from 'react';

const userContext=createContext({});

const userContextset= ({children})=>{
    const [state,setState]=useState(null);
    useEffect(()=>{
        const data=axios.post('/login')
    })
}