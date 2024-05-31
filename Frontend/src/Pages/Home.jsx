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
    IconButton,
    Container
} from '@chakra-ui/react';
import { FiUser, FiMoon, FiSun } from 'react-icons/fi';

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

    return (
        <ChakraProvider>
            <Flex direction="column" minHeight="100vh">
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

                <Container maxW="container.lg" flex="1" mt={4} mb={16}>
                    <Box bg={colorMode === 'light' ? 'gray.100' : 'gray.700'} p={4} borderRadius="md" boxShadow="md">
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
                            <Button ml={2} colorScheme="teal" onClick={handleAddEvent}>Add Event</Button>
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
                            eventColor='#3182CE'
                            height="auto"
                        />
                    </Box>
                </Container>

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
                                            <li key={index}>{event.title}</li>
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
                            <Button colorScheme="teal" mr={3} onClick={onDrawerClose}>
                                Close
                            </Button>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>

                <Box as="footer" width="100%" bg="blue.900" color="white" py={4}>
                    <Flex justifyContent="center">
                        <Text fontSize="md">© 2024 Onlybank. All rights reserved.</Text>
                    </Flex>
                </Box>

                <IconButton
                    icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
                    isRound
                    size="lg"
                    position="fixed"
                    bottom={12}
                    right={4}
                    onClick={toggleColorMode}
                    colorScheme="teal"
                />
            </Flex>
        </ChakraProvider>
    );
};

export default Home;
