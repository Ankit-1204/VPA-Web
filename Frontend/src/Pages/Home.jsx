/*import React ,{ useState }  from "react";
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
        <div class="calendar-container">
        <h1 class="animated">Welcome!!</h1>
        <h3 class="animated">To your Virtual Personal Assistant</h3>
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

export default Home;*/
import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import theme from '../theme';
import axios from 'axios';
import {
    ChakraProvider,
    Button,
    Input,
    Box,   // Import Flex from Chakra UI
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure
  } from '@chakra-ui/react';
const Home = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [events, setEvents] = useState([]);
    const [newEventTitle, setNewEventTitle] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
  
    const handleClick = (e) => {
      console.log(e.dateStr)
      setSelectedDate(e.dateStr);
      onOpen();
    };
  
    const handleAddEvent = () => {
      if (newEventTitle) {
        const newEvent = { title: newEventTitle, date: selectedDate };
        setEvents([...events, newEvent]);
        setNewEventTitle('');
        onClose();
      }
    };
    const handleInputEvent = async () => {
      const msg = newEventTitle;
      
      setNewEventTitle('');
      console.log(msg);
      try {
          const response = await axios.post('http://localhost:8000/api/webhook', {
              query: msg,
              sessionId: '123465',
          });
          console.log('sent and received');
          console.log(response.data.type);
          if(response.data.type==='Schedule Meeting'){
            const {date,time}=response.data.datee;

            const dateObject=new Date(date.stringValue);
            const year = dateObject.getFullYear();
            const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); 
            const day = dateObject.getDate().toString().padStart(2, '0');
            const dat = `${year}-${month}-${day}`;

            const timeObject = new Date(time.stringValue.substring(0, 19));

            const hours = timeObject.getHours().toString().padStart(2, '0');
            const minutes = timeObject.getMinutes().toString().padStart(2, '0');
            const seconds = timeObject.getSeconds().toString().padStart(2, '0');
            const tim = `${hours}:${minutes}:${seconds}`;
            const eventDateTime = new Date(`${dat}T${tim}`);
            
            setEvents([...events, {
              title: "botMessage",
              start: eventDateTime
          }]);}
          if(response.data.type==='Reschedule Meeting'){
            const {date1,time1,date,time}=response.data.datee;
            if(date1.stringValue ==='' || time1.stringValue ==='' || date.stringValue ==='' ||time.stringValue ==='' ){
              console.log("please provide data correctly");
              return{
                msg:"please provide data correctly"
              }
            }
            const dateOld=new Date(date.stringValue);
            const year = dateOld.getFullYear();
            const month = (dateOld.getMonth() + 1).toString().padStart(2, '0'); 
            const day = dateOld.getDate().toString().padStart(2, '0');
            const dat = `${year}-${month}-${day}`;

            const timeOld = new Date(time.stringValue.substring(0, 19));

            const hours = timeOld.getHours().toString().padStart(2, '0');
            const minutes = timeOld.getMinutes().toString().padStart(2, '0');
            const seconds = timeOld.getSeconds().toString().padStart(2, '0');
            const tim = `${hours}:${minutes}:${seconds}`;
            const oldDateTime = new Date(`${dat}T${tim}`); 
            
            const dateNew=new Date(date1.stringValue);
            const nyear = dateNew.getFullYear();
            const nmonth = (dateNew.getMonth() + 1).toString().padStart(2, '0'); 
            const nday = dateNew.getDate().toString().padStart(2, '0');
            const ndat = `${nyear}-${nmonth}-${nday}`;

            const timeNew = new Date(time1.stringValue.substring(0, 19));

            const nhours = timeNew.getHours().toString().padStart(2, '0');
            const nminutes = timeNew.getMinutes().toString().padStart(2, '0');
            const nseconds = timeNew.getSeconds().toString().padStart(2, '0');
            const ntim = `${nhours}:${nminutes}:${nseconds}`;
            const newDateTime = new Date(`${ndat}T${ntim}`);  

            setEvents(events.map(event => {
              console.log(event.start);
              console.log(oldDateTime);
              console.log(event.start.toISOString() === oldDateTime.toISOString());
              if (event.start.toISOString() === oldDateTime.toISOString()) {
                  return { ...event, start:newDateTime };
              }
              return event;
          }));
            
          }
      } catch (error) {
          console.error('Error:', error);
      }
  };
    return (
      
      <ChakraProvider theme={theme}>
          <h1 className="animated">Welcome!!</h1>
          <h2 className="animated">To your Virtual Personal Assistant</h2>
          <div className="calendar-container">
        <Box mt={4} p={4} bg="blue.800" color="white">
         <Input
        placeholder="Input from user"
        value={newEventTitle}
        onChange={(e) => setNewEventTitle(e.target.value)}
        />
         <Button ml={4} colorScheme="blue" onClick={handleInputEvent}>Enter</Button>
         </Box>

          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events}
            dateClick={handleClick}
            editable={true}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            buttonText={{
              today: 'Today',
              month: 'Month',
              week: 'Week',
              day: 'Day'
            }}
            eventColor='#378006' // Default event color
          />
          </div>


          
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent bg="blue.800" color="white" >
              <ModalHeader>Add Event</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Input
                  placeholder="Event Title"
                  value={newEventTitle}
                  onChange={(e) => setNewEventTitle(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={handleAddEvent}>
                  Add Event
                </Button>
                <Button variant="ghost" onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
      </ChakraProvider>
    );
  };
  
export default Home;
  