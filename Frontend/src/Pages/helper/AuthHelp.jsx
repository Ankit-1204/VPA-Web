import { useEffect, useState ,useNavigate} from "react";
import axios from "axios";

const AuthHelper=()=>{
const [islogin,setLogin]=useState(false);
useEffect(()=>{
  const logStatus= async ()=>{
    try{
      const response= await axios.get('http://localhost:8000/auth/profile');
      if(response.data){
         setLogin(true);
      }
    }catch(error){
      console.log(error);
    }
  }
  logStatus();
},[]);
return islogin;
};

export default AuthHelper;