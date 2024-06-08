import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

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
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Flex,
    Avatar,
    Text,
    Heading,
    useColorMode,
    IconButton
} from '@chakra-ui/react';
import { FiUser, FiMoon, FiSun } from 'react-icons/fi';
import axios from "axios";


const Home = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose } = useDisclosure();
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

    const handleLogout = () => {
        console.log("User logged out");
        // Add your logout logic here
    };

    return (
        <ChakraProvider>
            <Box width="100%" bg="blue.900" color="white" py={4} px={24}>
                <Flex justifyContent="space-between" alignItems="center">
                    <Box>
                        <Heading size="lg">Welcome</Heading>
                        <Text fontSize="md">To your Virtual Personal Assistant</Text>
                    </Box>
                    <Button leftIcon={<FiUser />} colorScheme="teal" onClick={onDrawerOpen}>
                        Profile
                    </Button>
                </Flex>
            </Box>

            <Flex justifyContent="center" mt={4} p={4}>
                <Box width={{ base: '100%', md: '70%', lg: '60%' }} bg={colorMode === 'light' ? 'gray.100' : 'gray.700'} p={4} borderRadius="md" boxShadow="md">
                    <Flex mb={4}>
                        <Input
                            placeholder="Add new event"
                            value={newEventTitle}
                            onChange={(e) => setNewEventTitle(e.target.value)}
                            bg={colorMode === 'light' ? 'white' : 'gray.600'}
                            color={colorMode === 'light' ? 'black' : 'white'}
                            borderColor="gray.300"
                            _hover={{ borderColor: 'gray.400' }}
                        />
                        <Button ml={2} colorScheme="teal" onClick={handleInputEvent}>Add Event</Button>
                    </Flex>

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

            <Drawer isOpen={isDrawerOpen} placement="right" onClose={onDrawerClose}>
                <DrawerOverlay />

                <DrawerContent bg="blue.900" color="white">
                    <DrawerCloseButton />
                    <DrawerHeader>Profile</DrawerHeader>

                    <DrawerBody>
                        <Flex direction="column" alignItems="center" mt={4}>
                            <Avatar size="xl" name="User Name" src="https://bit.ly/broken-link" />
                            <Text mt={4} fontSize="xl">User Name</Text>
                            <Text mt={2} fontSize="md">user@example.com</Text>
                        </Flex>
                    </DrawerBody>

                    <DrawerFooter>
                        <Button colorScheme="teal" mr={3} onClick={handleLogout}>
                            Logout
                        </Button>
                        <Button colorScheme="teal" mr={3} onClick={onDrawerClose}>
                            Close
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>

            <IconButton
                icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
                isRound
                size="lg"
                position="fixed"
                bottom={4}
                right={4}
                onClick={toggleColorMode}
                colorScheme="teal"
            />
        </ChakraProvider>
    );
};

export default Home;

import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {
    ChakraProvider,
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
    Heading,
    Input,
    Button,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Avatar,
    IconButton,
    useColorMode,
    extendTheme
} from '@chakra-ui/react';
import { FiUser, FiMoon, FiSun } from 'react-icons/fi';
import axios from 'axios';

const theme = extendTheme({
    colors: {
        purple: {
            900: '#240046',
            800: '#3C096C',
            700: '#5A189A',
            600: '#7B2CBF',
            500: '#9D4EDD',
            400: '#C77DFF',
            300: '#E0AAFF',
            200: '#F3E8FF',
            100: '#FAF0FF'
        }
    },
    styles: {
        global: {
            body: {
                bg: 'purple.900',
                color: 'white',
            },
        },
    },
});

const localizer = momentLocalizer(moment);

const Home = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose } = useDisclosure();
    const [events, setEvents] = useState([]);
    const [newEventTitle, setNewEventTitle] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedDateEvents, setSelectedDateEvents] = useState([]);
    const { colorMode, toggleColorMode } = useColorMode();

    const handleSelectSlot = (slotInfo) => {
        setSelectedDate(slotInfo.start);
        const dateEvents = events.filter(event => moment(event.start).isSame(slotInfo.start, 'day'));
        setSelectedDateEvents(dateEvents);
        onOpen();
    };

    const handleAddEvent = () => {
        if (newEventTitle) {
            const newEvent = { title: newEventTitle, start: selectedDate, end: selectedDate };
            setEvents([...events, newEvent]);
            setSelectedDateEvents([...selectedDateEvents, newEvent]);
            setNewEventTitle('');
            onClose();
        }
    };

    const handleRemoveEvent = (index) => {
        const eventToRemove = selectedDateEvents[index];
        const filteredEvents = events.filter(event => !(event.start === eventToRemove.start && event.title === eventToRemove.title));
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
                    start: eventDateTime,
                    end: eventDateTime
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
                        return { ...event, start: newDateTime, end: newDateTime };
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

    const handleLogout = () => {
        console.log("User logged out");
    };

    return (
        <ChakraProvider theme={theme}>
            <Flex height="100vh" overflow="hidden">
                <Box width="20%" bg="purple.700" color="white" py={4} px={2}>
                    <Heading size="md" textAlign="center" mb={4}>2020</Heading>
                    <Box>
                        {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month, index) => (
                            <Button key={index} variant="ghost" width="100%" justifyContent="start" mb={2}>
                                {month}
                            </Button>
                        ))}
                    </Box>
                </Box>
                <Box flex="1" p={4} bg="purple.800" color="white">
                    <Flex justifyContent="space-between" alignItems="center" mb={4}>
                        <Heading size="lg">Calendar</Heading>
                        <Button leftIcon={<FiUser />} onClick={onDrawerOpen}>My Profile</Button>
                        <IconButton
                            icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
                            onClick={toggleColorMode}
                            isRound
                            size="lg"
                        />
                    </Flex>
                    <Calendar
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: '70vh', color: 'black' }}
                        selectable
                        onSelectSlot={handleSelectSlot}
                    />
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent bg="purple.800">
                            <ModalHeader>{selectedDate.toDateString()}</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                {selectedDateEvents.length === 0 ? (
                                    <Text>No events for this date</Text>
                                ) : (
                                    selectedDateEvents.map((event, index) => (
                                        <Flex key={index} justifyContent="space-between" alignItems="center" mb={2}>
                                            <Text>{event.title}</Text>
                                            <Button size="sm" colorScheme="red" onClick={() => handleRemoveEvent(index)}>Remove</Button>
                                        </Flex>
                                    ))
                                )}
                            </ModalBody>
                            <ModalFooter>
                                <Input
                                    placeholder="New Event"
                                    value={newEventTitle}
                                    onChange={(e) => setNewEventTitle(e.target.value)}
                                    color="white"
                                    bg="purple.700"
                                    mr={3}
                                />
                                <Button colorScheme="teal" onClick={handleAddEvent}>Add Event</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </Box>
                <Drawer isOpen={isDrawerOpen} placement="right" onClose={onDrawerClose}>
                    <DrawerOverlay>
                        <DrawerContent bg="purple.700">
                            <DrawerCloseButton />
                            <DrawerHeader>My Profile</DrawerHeader>
                            <DrawerBody>
                                <Flex direction="column" alignItems="center">
                                    <Avatar size="xl" mb={4} />
                                    <Text mb={2}>User Name</Text>
                                    <Button colorScheme="teal" onClick={handleLogout}>Logout</Button>
                                </Flex>
                            </DrawerBody>
                            <DrawerFooter>
                                <Button variant="outline" mr={3} onClick={onDrawerClose}>Cancel</Button>
                                <Button colorScheme="blue">Save</Button>
                            </DrawerFooter>
                        </DrawerContent>
                    </DrawerOverlay>
                </Drawer>
            </Flex>
        </ChakraProvider>
    );
};

export default Home;
