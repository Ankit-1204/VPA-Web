import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import theme from '../theme';
import {
  ChakraProvider,
  Button,
  Input,
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
  
    return (
      <ChakraProvider theme={theme}>
          <h1 className="animated">Welcome!!</h1>
          <h3 className="animated">To your Virtual Personal Assistant</h3>
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
  