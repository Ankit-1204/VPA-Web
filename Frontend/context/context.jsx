import axios from 'axios';
import { createContext ,useState,useEffect} from 'react';

export const UserContext= createContext({})

export function UserContextProvider({children}){
    const [user,setUser]=useState(false);
    useEffect(()=>{
        if(!user){
            console.log(1);
            axios.get('http://localhost:8000/auth/profile').then(({data})=>{
                if(data){
                    console.log(2);
                    setUser(true);
                }
                else{
                    console.log(3);
                    setUser(false);
                }
                console.log(data)
            })
        }
    },[])
    return (
        <UserContext.Provider value={{user,setUser}}>
            {children}
        </UserContext.Provider>
    )
}