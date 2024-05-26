import React ,{ useState }  from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
function Home() {
    const [events, setEvents] = useState([]);
    const handleClick=(e)=>{
        const title=prompt("Enter the event.");
        if(title){
            const newEvent = { title: title, date: e.dateStr };
            setEvents([...events,newEvent]);
        }
    }
    return (
        <div>
        <h1>Hello</h1>
        <FullCalendar
        plugins={[dayGridPlugin,interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleClick}
        editable={true}
        />
        </div>
    )
}

export default Home;