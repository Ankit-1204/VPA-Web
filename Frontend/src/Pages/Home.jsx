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
        const response = await fetch('http://localhost:8000/api/webhook', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              query: msg,
              sessionId: '123465'
          })
      });

      if (!response.ok) {
          throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Sent and received');
      console.log(data);
      const botMessage = data.fulfillmentText;
      console.log(botMessage);
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
  