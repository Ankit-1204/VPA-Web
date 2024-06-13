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
    useColorMode,
    Checkbox, // Import Checkbox from Chakra UI
    Avatar,
    Menu,
    MenuButton,
    MenuList,
    MenuItem
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import axios from 'axios';

const Home = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [events, setEvents] = useState([]);
    const [newEventTitle, setNewEventTitle] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedDateEvents, setSelectedDateEvents] = useState([]);
    const { colorMode, toggleColorMode } = useColorMode();
    const [selectedRecipients, setSelectedRecipients] = useState([]); // State for multiple recipients

    const recipients = [
        'John Doe',
        'Jane Smith',
        'Alice Johnson',
        'Bob Brown',
        'Charlie Davis'
    ];

    // Function to handle checkbox change
    const handleRecipientChange = (recipient) => {
        if (selectedRecipients.includes(recipient)) {
            setSelectedRecipients(selectedRecipients.filter(r => r !== recipient));
        } else {
            setSelectedRecipients([...selectedRecipients, recipient]);
        }
    };

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
        // Handle input event logic here
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
                        <Text fontSize="lg" mb={2}>Select Recipient(s)</Text>
                        {recipients.map((recipient, index) => (
                            <Checkbox
                                key={index}
                                isChecked={selectedRecipients.includes(recipient)}
                                onChange={() => handleRecipientChange(recipient)}
                                colorScheme="teal"
                                mb={2}
                            >
                                {recipient}
                            </Checkbox>
                        ))}
                    </Box>
                </Box>

                {/* Main content */}
                <Box width="80%" p={4} bg={colorMode === 'light' ? 'gray.100' : 'gray.700'} height="100vh" overflowY="auto">
                    <Flex justifyContent="space-between" alignItems="center" mb={4}>
                        <Text fontSize="2xl">Calendar</Text>
                        <Menu>
                            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} zIndex="1000">
                                <Avatar size="sm" name="User Profile" />
                            </MenuButton>
                            <MenuList zIndex="popover">
                                <MenuItem>Profile</MenuItem>
                                <MenuItem>Settings</MenuItem>
                                <MenuItem>Logout</MenuItem>
                            </MenuList>
                        </Menu>
                    </Flex>
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

