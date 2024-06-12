import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

export const EventContext = createContext({});

export function EventContextProvider({children}){
    const [eventData,setEventData]=useState({});

    useEffect(()=>{
        const getEvents= async ()=>{
            try{
                const data= await axios.post('http://localhost:8000/events/schedule',{
                    title: "botMessage",
                    start: eventDateTime,
                    mail:userInfo.user.email,
                    teamId:userInfo.user.team,
                    id:userInfo.user.id
                })
                const scheduledEvent = data.data.event;
                console.log(7);
                console.log(scheduledEvent)
                setEvents(scheduledEvent);
            }catch(err){
                console.log(err);
            }
        }
        getEvents();
    },[]);
    return (
        <EventContext.Provider value={{ eventData,setEventData}}>
            {children}
        </EventContext.Provider>
    );
}