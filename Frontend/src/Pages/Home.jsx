import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import {
    ChakraProvider,
    Button,
    Input,
    Box,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Flex,
    Text,
    useColorMode
} from '@chakra-ui/react';
import axios from 'axios';

const Home = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [events, setEvents] = useState([]);
    const [newEventTitle, setNewEventTitle] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedDateEvents, setSelectedDateEvents] = useState([]);
    const { colorMode, toggleColorMode } = useColorMode();

    const handleClick = (e) => {
        const date = e.dateStr;
        setSelectedDate(date);
        const dateEvents = events.filter(event => event.date === date);
        setSelectedDateEvents(dateEvents);
        onOpen();
    };

    const handleAddEvent = () => {
        if (newEventTitle) {
            const newEvent = { title: newEventTitle, date: selectedDate };
            setEvents([...events, newEvent]);
            setSelectedDateEvents([...selectedDateEvents, newEvent]);
            setNewEventTitle('');
            onClose();
        }
    };

    const handleRemoveEvent = (index) => {
        const eventToRemove = selectedDateEvents[index];
        const filteredEvents = events.filter(event => !(event.date === eventToRemove.date && event.title === eventToRemove.title));
        const filteredSelectedDateEvents = selectedDateEvents.filter((_, i) => i !== index);
        setEvents(filteredEvents);
        setSelectedDateEvents(filteredSelectedDateEvents);
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
            if (response.data.type === 'Schedule Meeting') {
                const { date, time } = response.data.datee;

                const dateObject = new Date(date.stringValue);
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
                }]);
            }
            if (response.data.type === 'Reschedule Meeting') {
                const { date1, time1, date, time } = response.data.datee;
                if (date1.stringValue === '' || time1.stringValue === '' || date.stringValue === '' || time.stringValue === '') {
                    console.log("please provide data correctly");
                    return {
                        msg: "please provide data correctly"
                    }
                }
                const dateOld = new Date(date.stringValue);
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

                const dateNew = new Date(date1.stringValue);
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
                        return { ...event, start: newDateTime };
                    }
                    return event;
                }));

            }
            if (response.data.type === 'Delete Meeting') {
                const { date, time } = response.data.datee;
                const dateObject = new Date(date.stringValue);
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
                setEvents(events.filter(event => event.start.toISOString() !== eventDateTime.toISOString()));
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <ChakraProvider>
            <Flex height="100vh">
                {/* Sidebar */}
                <Box width="20%" bg="gray.700" color="white" p={4} display="flex" flexDirection="column">
                    <Box mb={4}>
                        <Text fontSize="lg" mb={2}>Add Event</Text>
                        <Input
                            placeholder="Event Title"
                            value={newEventTitle}
                            onChange={(e) => setNewEventTitle(e.target.value)}
                            mb={2}
                            bg="gray.600"
                            color="white"
                        />
                        <Button colorScheme="teal" onClick={handleInputEvent} mb={2}>Add</Button>
                    </Box>
                    <Box>
                        <Text fontSize="lg" mb={2}>Select Recipient</Text>
                        <Input placeholder="Recipient Name" bg="gray.600" color="white" />
                    </Box>
                </Box>

                {/* Main content */}
                <Box width="80%" p={4} bg={colorMode === 'light' ? 'gray.100' : 'gray.700'} height="100vh" overflowY="auto">
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
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
                        eventColor={colorMode === 'light' ? '#3182CE' : '#90CDF4'}
                        height="auto"
                    />
                </Box>
            </Flex>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent bg={colorMode === 'light' ? 'white' : 'gray.800'} color={colorMode === 'light' ? 'black' : 'white'}>
                    <ModalHeader>Add Event</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input
                            placeholder="Event Title"
                            value={newEventTitle}
                            onChange={(e) => setNewEventTitle(e.target.value)}
                            mb={4}
                            bg={colorMode === 'light' ? 'gray.100' : 'gray.700'}
                            color={colorMode === 'light' ? 'black' : 'white'}
                            borderColor="gray.300"
                            _hover={{ borderColor: 'gray.400' }}
                        />
                        {selectedDateEvents.length > 0 && (
                            <Box>
                                <Text mb={2}>Events on {selectedDate}:</Text>
                                <ul>
                                    {selectedDateEvents.map((event, index) => (
                                        <li key={index}>
                                            {event.title}
                                            <Button ml={2} colorScheme="red" size="xs" onClick={() => handleRemoveEvent(index)}>Remove</Button>
                                        </li>
                                    ))}
                                </ul>
                            </Box>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="teal" mr={3} onClick={handleAddEvent}>
                            Add Event
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </ChakraProvider>
    );
};
 export default Home;


