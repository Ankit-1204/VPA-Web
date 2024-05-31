import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
// const handleAddEvent = () => {
//       if (newEventTitle) {
//         const newEvent = { title: newEventTitle, date: selectedDate };
//         setEvents([...events, newEvent]);
//         setNewEventTitle('');
//         onClose();
//       }
//     };
//     const handleInputEvent = async () => {
//       const msg = newEventTitle;
      
//       setNewEventTitle('');
//       console.log(msg);
//       try {
//           const response = await axios.post('http://localhost:8000/api/webhook', {
//               query: msg,
//               sessionId: '123465',
//           });
//           console.log('sent and received');
//           console.log(response.data.type);
//           if(response.data.type==='Schedule Meeting'){
//             const {date,time}=response.data.datee;

//             const dateObject=new Date(date.stringValue);
//             const year = dateObject.getFullYear();
//             const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); 
//             const day = dateObject.getDate().toString().padStart(2, '0');
//             const dat = `${year}-${month}-${day}`;

//             const timeObject = new Date(time.stringValue.substring(0, 19));

//             const hours = timeObject.getHours().toString().padStart(2, '0');
//             const minutes = timeObject.getMinutes().toString().padStart(2, '0');
//             const seconds = timeObject.getSeconds().toString().padStart(2, '0');
//             const tim = `${hours}:${minutes}:${seconds}`;
//             const eventDateTime = new Date(`${dat}T${tim}`);
            
//             setEvents([...events, {
//               title: "botMessage",
//               start: eventDateTime
//           }]);}
//           if(response.data.type==='Reschedule Meeting'){
//             const {date1,time1,date,time}=response.data.datee;
//             if(date1.stringValue ==='' || time1.stringValue ==='' || date.stringValue ==='' ||time.stringValue ==='' ){
//               console.log("please provide data correctly");
//               return{
//                 msg:"please provide data correctly"
//               }
//             }
//             const dateOld=new Date(date.stringValue);
//             const year = dateOld.getFullYear();
//             const month = (dateOld.getMonth() + 1).toString().padStart(2, '0'); 
//             const day = dateOld.getDate().toString().padStart(2, '0');
//             const dat = `${year}-${month}-${day}`;

//             const timeOld = new Date(time.stringValue.substring(0, 19));

//             const hours = timeOld.getHours().toString().padStart(2, '0');
//             const minutes = timeOld.getMinutes().toString().padStart(2, '0');
//             const seconds = timeOld.getSeconds().toString().padStart(2, '0');
//             const tim = `${hours}:${minutes}:${seconds}`;
//             const oldDateTime = new Date(`${dat}T${tim}`); 
            
//             const dateNew=new Date(date1.stringValue);
//             const nyear = dateNew.getFullYear();
//             const nmonth = (dateNew.getMonth() + 1).toString().padStart(2, '0'); 
//             const nday = dateNew.getDate().toString().padStart(2, '0');
//             const ndat = `${nyear}-${nmonth}-${nday}`;

//             const timeNew = new Date(time1.stringValue.substring(0, 19));

//             const nhours = timeNew.getHours().toString().padStart(2, '0');
//             const nminutes = timeNew.getMinutes().toString().padStart(2, '0');
//             const nseconds = timeNew.getSeconds().toString().padStart(2, '0');
//             const ntim = `${nhours}:${nminutes}:${nseconds}`;
//             const newDateTime = new Date(`${ndat}T${ntim}`);  

//             setEvents(events.map(event => {
//               console.log(event.start);
//               console.log(oldDateTime);
//               console.log(event.start.toISOString() === oldDateTime.toISOString());
//               if (event.start.toISOString() === oldDateTime.toISOString()) {
//                   return { ...event, start:newDateTime };
//               }
//               return event;
//           }));
            
//           }
//           if(response.data.type==='Delete Meeting'){
//             const {date,time}=response.data.datee;
//             const dateObject=new Date(date.stringValue);
//             const year = dateObject.getFullYear();
//             const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); 
//             const day = dateObject.getDate().toString().padStart(2, '0');
//             const dat = `${year}-${month}-${day}`;

//             const timeObject = new Date(time.stringValue.substring(0, 19));

//             const hours = timeObject.getHours().toString().padStart(2, '0');
//             const minutes = timeObject.getMinutes().toString().padStart(2, '0');
//             const seconds = timeObject.getSeconds().toString().padStart(2, '0');
//             const tim = `${hours}:${minutes}:${seconds}`;
//             const eventDateTime = new Date(`${dat}T${tim}`);
//             setEvents(events.filter(event => event.start.toISOString()!== eventDateTime.toISOString()));
//           }
//       } catch (error) {
//           console.error('Error:', error);
//       }
//   };