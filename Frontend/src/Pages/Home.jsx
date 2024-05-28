/*import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import theme from '../theme';
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
    const [selectedDateEvents, setSelectedDateEvents] = useState([]);

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
                    <Button ml={4} colorScheme="blue" onClick={handleAddEvent}>Enter</Button>
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
                <ModalContent bg="blue.900" color="white">
                    <ModalHeader>Add Event</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input
                            placeholder="Event Title"
                            value={newEventTitle}
                            onChange={(e) => setNewEventTitle(e.target.value)}
                        />
                        {selectedDateEvents.length > 0 && (
                            <Box mt={4}>
                                <h3>Events on {selectedDate}:</h3>
                                <ul>
                                    {selectedDateEvents.map((event, index) => (
                                        <li key={index}>{event.title}</li>
                                    ))}
                                </ul>
                            </Box>
                        )}
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

export default Home;*/
import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import theme from '../theme';
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
    Text
} from '@chakra-ui/react';
import { FiUser } from 'react-icons/fi';

const Home = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose } = useDisclosure();
    const [events, setEvents] = useState([]);
    const [newEventTitle, setNewEventTitle] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedDateEvents, setSelectedDateEvents] = useState([]);

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

    return (
        <ChakraProvider theme={theme}>
            <Flex justifyContent="space-between" alignItems="center" p={4} bg="blue.800" color="white">
                <Box>
                    <h1 className="animated">Welcome!!</h1>
                    <h2 className="animated">To your Virtual Personal Assistant</h2>
                </Box>
                <Button leftIcon={<FiUser />} colorScheme="blue" onClick={onDrawerOpen}>
                    Profile
                </Button>
            </Flex>
            <div className="calendar-container">
                <Box mt={4} p={4} bg="blue.800" color="white">
                    <Input
                        placeholder="Input from user"
                        value={newEventTitle}
                        onChange={(e) => setNewEventTitle(e.target.value)}
                    />
                    <Button ml={4} colorScheme="blue" onClick={handleAddEvent}>Enter</Button>
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
                    eventColor='#378006'
                />
            </div>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent bg="blue.900" color="white">
                    <ModalHeader>Add Event</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input
                            placeholder="Event Title"
                            value={newEventTitle}
                            onChange={(e) => setNewEventTitle(e.target.value)}
                        />
                        {selectedDateEvents.length > 0 && (
                            <Box mt={4}>
                                <h3>Events on {selectedDate}:</h3>
                                <ul>
                                    {selectedDateEvents.map((event, index) => (
                                        <li key={index}>{event.title}</li>
                                    ))}
                                </ul>
                            </Box>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleAddEvent}>
                            Add Event
                        </Button>
                        <Button  onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Drawer isOpen={isDrawerOpen} placement="right" onClose={onDrawerClose}>
                <DrawerOverlay />
                <DrawerContent  bg="blue.900">
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
                        <Button mr={3} onClick={onDrawerClose}>
                            Close
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </ChakraProvider>
    );
};

export default Home;


  