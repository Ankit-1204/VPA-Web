import { UserContext,UserContextProvider } from '../../context/context';
import React, { useState ,useContext} from 'react';
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
    Checkbox,
    Avatar,
    Menu,
    IconButton,
    MenuButton,
    MenuList,
    MenuItem
} from '@chakra-ui/react';
import { ChevronDownIcon, SunIcon, MoonIcon } from '@chakra-ui/icons';
import axios from 'axios';
import '../index.css';


const Home = () => {
    const {setUser,userInfo,setUserInfo}=useContext(UserContext);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [events, setEvents] = useState(userInfo.events);
    const [newEventTitle, setNewEventTitle] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedDateEvents, setSelectedDateEvents] = useState([]);
    const { colorMode, toggleColorMode } = useColorMode();
    const [selectedRecipients, setSelectedRecipients] = useState([]); 
  
    // const recipients = [
    //     'John Doe',
    //     'Jane Smith',
    //     'Alice Johnson',
    //     'Bob Brown',
    //     'Charlie Davis'
    // ];
    const colorOptions = [
        { name: 'Red', colorCode: '#E57373' },
        { name: 'Purple', colorCode: '#D8BFD8' },
        { name: 'Blue', colorCode: '#64B5F6' }
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
            const newEvent = { title: newEventTitle, date: selectedDate, color: selectedColor };
            setEvents([...events, newEvent]);
            setSelectedDateEvents([...selectedDateEvents, newEvent]);
            setNewEventTitle('');
            setSelectedRecipients([]);
            setSelectedColor('');
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

    const handleLogOut= async()=>{
        try{
            const response=await axios.post('http://localhost:8000/auth/logout',{});
            console.log(response.data);
            setUser(false);
        }catch(error){
            console.log(error);
        }
    }
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
            
        
          try{
            const todb=await axios.post('http://localhost:8000/events/schedule',{
                title: "botMessage",
                start: eventDateTime,
                mail:userInfo.user.email,
                teamId:userInfo.user.team,
                id:[userInfo.user.id, ...selectedRecipients]  
            })
            
                const scheduledEvent = todb.data.event;
                console.log(7)
                console.log(scheduledEvent)
                setUserInfo(prevState => ({
                    ...prevState,
                    events: [...prevState.events, scheduledEvent]
                }));
                    setEvents([...events, scheduledEvent]);
            
            }catch(error){
                console.log(error);
            }
          ;}
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
    
        //     setEvents(events.map(event => {
        //       console.log(event.start);
        //       console.log(oldDateTime);
        //       console.log(event.start.toISOString() === oldDateTime.toISOString());
        //       if (event.date.toISOString() === oldDateTime.toISOString()) {
        //           return { ...event, start:newDateTime };
        //       }
        //       return event;
        //   }));

        const eventToDelete = userInfo.events.filter(event => {
            return new Date(event.date).toISOString() === oldDateTime.toISOString();
        });
        if(eventToDelete && eventToDelete.length > 0){
        try{
            const todb=await axios.post('http://localhost:8000/events/schedule',{
                title: "botMessage",
                start: newDateTime,
                mail:userInfo.user.email,
                teamId:userInfo.user.team,
                id:[userInfo.user.id, ...selectedRecipients]  
            })
            
                const scheduledEvent = todb.data.event;
                console.log(7)
                console.log(scheduledEvent)
                setUserInfo(prevState => ({
                    ...prevState,
                    events: [...prevState.events, scheduledEvent]
                }));
                    setEvents([...events, scheduledEvent]);
            
            }catch(error){
                console.log(error);
            }
        
            
            console.log(eventToDelete);
            try {
                await axios.post('http://localhost:8000/events/delete',{
                    event:eventToDelete
                })
                setEvents(prevEvents => 
                    prevEvents.filter(event => 
                        !eventToDelete.some(ev => ev._id === event._id)
                    )
                );
                setUserInfo(prevState => ({
                    ...prevState,
                    events: prevState.events.filter(event => 
                        !eventToDelete.some(ev => ev._id === event._id)
                    )
                }));
            } catch (error) {
                console.error(error);
            }
            }
          }
          if(response.data.type==='Delete Meeting'){
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
            console.log(eventDateTime.toISOString());
           
            // setEvents(events.filter(event => event.date!== eventDateTime.toISOString()));
            const eventToDelete = userInfo.events.filter(event => {
                return new Date(event.date).toISOString() === eventDateTime.toISOString();
            });
            console.log(eventToDelete);
            try {
                await axios.post('http://localhost:8000/events/delete',{
                    event:eventToDelete
                })
                setEvents(prevEvents => 
                    prevEvents.filter(event => 
                        !eventToDelete.some(ev => ev._id === event._id)
                    )
                );
                setUserInfo(prevState => ({
                    ...prevState,
                    events: prevState.events.filter(event => 
                        !eventToDelete.some(ev => ev._id === event._id)
                    )
                }));
            } catch (error) {
                console.error(error);
            }
          }
      } catch (error) {
          console.error('Error:', error);
      }
    };
    return (
        <ChakraProvider>
            <Flex height="100vh">
                {/* Sidebar */}
                <Box width="20%" bg={colorMode === 'light' ? 'gray.700' : 'gray.800'} color="white" p={4} display="flex" flexDirection="column">
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
                        {userInfo.usersInTeam.filter(recipient => recipient._id !== userInfo.user.id).map((recipient, index) => (
                            <Checkbox
                                key={recipient._id}
                                isChecked={selectedRecipients.includes(recipient._id)}
                                onChange={() => handleRecipientChange(recipient._id)}
                                colorScheme="teal"
                                mb={2}
                            >
                                {recipient.firstName}
                            </Checkbox>
                        ))}
                    </Box>
                </Box>

                {/* Main content */}
                <Box width="80%" p={4} bg={colorMode === 'light' ? 'gray.100' : 'gray.700'} height="100vh" overflowY="auto">
                    <Flex justifyContent="space-between" alignItems="center" mb={4}>
                        <Text fontSize="2xl">Calendar</Text>
                        <Menu>
                        <IconButton
                                aria-label="Toggle dark mode"
                                icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                                onClick={toggleColorMode}
                                mr={4}
                            />
                            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} zIndex="1000">
                                <Avatar size="sm" name="User Profile" />
                            </MenuButton>
                            <MenuList zIndex="popover">
                                <MenuItem>{userInfo.user.email}</MenuItem>
                                <Button variant="link" onClick={handleLogOut}>
                                            Logout
                                </Button>
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
                        <Text mb={2}>Select Color:</Text>
                        <Flex mb={4}>
                            {colorOptions.map((colorOption, index) => (
                                <Box
                                    key={index}
                                    width="24px"
                                    height="24px"
                                    borderRadius="50%"
                                    bg={colorOption.colorCode}
                                    cursor="pointer"
                                    border={selectedColor === colorOption.colorCode ? '2px solid black' : '2px solid transparent'}
                                    onClick={() => setSelectedColor(colorOption.colorCode)}
                                    mr={2}
                                />
                            ))}
                        </Flex>
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

// import { UserContext,UserContextProvider } from '../../context/context';
// import React, { useState ,useContext} from 'react';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import interactionPlugin from '@fullcalendar/interaction';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import {
//     ChakraProvider,
//     Button,
//     Input,
//     Box,
//     Modal,
//     ModalOverlay,
//     ModalContent,
//     ModalHeader,
//     ModalFooter,
//     ModalBody,
//     ModalCloseButton,
//     useDisclosure,
//     Flex,
//     Text,
//     useColorMode,
//     Checkbox,
//     Avatar,
//     Menu,
//     MenuButton,
//     MenuList,
//     MenuItem
// } from '@chakra-ui/react';
// import { FiUser, FiMoon, FiSun } from 'react-icons/fi';
// import { ChevronDownIcon } from '@chakra-ui/icons';
// import axios from "axios";


// const Home = () => {
//     const {setUser,userInfo,setUserInfo}=useContext(UserContext);
//     const { isOpen, onOpen, onClose } = useDisclosure();
//     const { isOpen: isDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose } = useDisclosure();
//     const [events, setEvents] = useState(userInfo.events);
//     const [newEventTitle, setNewEventTitle] = useState('');
//     const [selectedDate, setSelectedDate] = useState('');
//     const [selectedColor, setSelectedColor] = useState('');
//     const [selectedDateEvents, setSelectedDateEvents] = useState([]);
//     const { colorMode, toggleColorMode } = useColorMode();
//     const [selectedRecipients, setSelectedRecipients] = useState([]); 
  
//     // const recipients = [
//     //     'John Doe',
//     //     'Jane Smith',
//     //     'Alice Johnson',
//     //     'Bob Brown',
//     //     'Charlie Davis'
//     // ];
//     const colorOptions = [
//         { name: 'Red', colorCode: '#E57373' },
//         { name: 'Purple', colorCode: '#D8BFD8' },
//         { name: 'Blue', colorCode: '#64B5F6' }
//     ];
//     // Function to handle checkbox change
//     const handleRecipientChange = (recipient) => {
//         if (selectedRecipients.includes(recipient)) {
//             setSelectedRecipients(selectedRecipients.filter(r => r !== recipient));
//         } else {
//             setSelectedRecipients([...selectedRecipients, recipient]);
//         }
//     };

//     const handleClick = (e) => {
//         const date = e.dateStr;
//         setSelectedDate(date);
//         const dateEvents = events.filter(event => event.date === date);
//         setSelectedDateEvents(dateEvents);
//         onOpen();
//     };

//     const handleAddEvent = () => {
//         if (newEventTitle) {
//             const newEvent = { title: newEventTitle, date: selectedDate, color: selectedColor };
//             setEvents([...events, newEvent]);
//             setSelectedDateEvents([...selectedDateEvents, newEvent]);
//             setNewEventTitle('');
//             setSelectedRecipients([]);
//             setSelectedColor('');
//             onClose();
//         }
//     };
//     const handleRemoveEvent = (index) => {
//         const eventToRemove = selectedDateEvents[index];
//         const filteredEvents = events.filter(event => !(event.date === eventToRemove.date && event.title === eventToRemove.title));
//         const filteredSelectedDateEvents = selectedDateEvents.filter((_, i) => i !== index);
//         setEvents(filteredEvents);
//         setSelectedDateEvents(filteredSelectedDateEvents);
//     };

//     const handleLogOut= async()=>{
//         try{
//             const response=await axios.post('http://localhost:8000/auth/logout',{});
//             console.log(response.data);
//             setUser(false);
//         }catch(error){
//             console.log(error);
//         }
//     }
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
            
        
//           try{
//             const todb=await axios.post('http://localhost:8000/events/schedule',{
//                 title: "botMessage",
//                 start: eventDateTime,
//                 mail:userInfo.user.email,
//                 teamId:userInfo.user.team,
//                 id:[userInfo.user.id, ...selectedRecipients]  
//             })
            
//                 const scheduledEvent = todb.data.event;
//                 console.log(7)
//                 console.log(scheduledEvent)
//                 setUserInfo(prevState => ({
//                     ...prevState,
//                     events: [...prevState.events, scheduledEvent]
//                 }));
//                     setEvents([...events, scheduledEvent]);
            
//             }catch(error){
//                 console.log(error);
//             }
//           ;}
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
    
//         //     setEvents(events.map(event => {
//         //       console.log(event.start);
//         //       console.log(oldDateTime);
//         //       console.log(event.start.toISOString() === oldDateTime.toISOString());
//         //       if (event.date.toISOString() === oldDateTime.toISOString()) {
//         //           return { ...event, start:newDateTime };
//         //       }
//         //       return event;
//         //   }));

//         const eventToDelete = userInfo.events.filter(event => {
//             return new Date(event.date).toISOString() === oldDateTime.toISOString();
//         });
//         if(eventToDelete && eventToDelete.length > 0){
//         try{
//             const todb=await axios.post('http://localhost:8000/events/schedule',{
//                 title: "botMessage",
//                 start: newDateTime,
//                 mail:userInfo.user.email,
//                 teamId:userInfo.user.team,
//                 id:[userInfo.user.id, ...selectedRecipients]  
//             })
            
//                 const scheduledEvent = todb.data.event;
//                 console.log(7)
//                 console.log(scheduledEvent)
//                 setUserInfo(prevState => ({
//                     ...prevState,
//                     events: [...prevState.events, scheduledEvent]
//                 }));
//                     setEvents([...events, scheduledEvent]);
            
//             }catch(error){
//                 console.log(error);
//             }
        
            
//             console.log(eventToDelete);
//             try {
//                 await axios.post('http://localhost:8000/events/delete',{
//                     event:eventToDelete
//                 })
//                 setEvents(prevEvents => 
//                     prevEvents.filter(event => 
//                         !eventToDelete.some(ev => ev._id === event._id)
//                     )
//                 );
//                 setUserInfo(prevState => ({
//                     ...prevState,
//                     events: prevState.events.filter(event => 
//                         !eventToDelete.some(ev => ev._id === event._id)
//                     )
//                 }));
//             } catch (error) {
//                 console.error(error);
//             }
//             }
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
//             console.log(eventDateTime.toISOString());
           
//             // setEvents(events.filter(event => event.date!== eventDateTime.toISOString()));
//             const eventToDelete = userInfo.events.filter(event => {
//                 return new Date(event.date).toISOString() === eventDateTime.toISOString();
//             });
//             console.log(eventToDelete);
//             try {
//                 await axios.post('http://localhost:8000/events/delete',{
//                     event:eventToDelete
//                 })
//                 setEvents(prevEvents => 
//                     prevEvents.filter(event => 
//                         !eventToDelete.some(ev => ev._id === event._id)
//                     )
//                 );
//                 setUserInfo(prevState => ({
//                     ...prevState,
//                     events: prevState.events.filter(event => 
//                         !eventToDelete.some(ev => ev._id === event._id)
//                     )
//                 }));
//             } catch (error) {
//                 console.error(error);
//             }
//           }
//       } catch (error) {
//           console.error('Error:', error);
//       }
//     };
//     return (
//         <ChakraProvider>
//             <Flex height="100vh">
//                 {/* Sidebar */}
//                 <Box width="20%" bg="gray.700" color="white" p={4} display="flex" flexDirection="column">
//                     <Box mb={4}>
//                         <Text fontSize="lg" mb={2}>Add Event</Text>
//                         <Input
//                             placeholder="Event Title"
//                             value={newEventTitle}
//                             onChange={(e) => setNewEventTitle(e.target.value)}
//                             mb={2}
//                             bg="gray.600"
//                             color="white"
//                         />
//                         <Button colorScheme="teal" onClick={handleInputEvent} mb={2}>Add</Button>
//                     </Box>
//                     <Box>
//                         <Text fontSize="lg" mb={2}>Select Recipient(s)</Text>
//                         {userInfo.usersInTeam.filter(recipient => recipient._id !== userInfo.user.id).map((recipient, index) => (
//                             <Checkbox
//                                 key={recipient._id}
//                                 isChecked={selectedRecipients.includes(recipient._id)}
//                                 onChange={() => handleRecipientChange(recipient._id)}
//                                 colorScheme="teal"
//                                 mb={2}
//                             >
//                                 {recipient.firstName}
//                             </Checkbox>
//                         ))}
//                     </Box>
//                 </Box>

//                 {/* Main content */}
//                 <Box width="80%" p={4} bg={colorMode === 'light' ? 'gray.100' : 'gray.700'} height="100vh" overflowY="auto">
//                     <Flex justifyContent="space-between" alignItems="center" mb={4}>
//                         <Text fontSize="2xl">Calendar</Text>
//                         <Menu>
//                             <MenuButton as={Button} rightIcon={<ChevronDownIcon />} zIndex="1000">
//                                 <Avatar size="sm" name="User Profile" />
//                             </MenuButton>
//                             <MenuList zIndex="popover">
//                                 <MenuItem>{userInfo.user.email}</MenuItem>
//                                 <Button variant="link" onClick={handleLogOut}>
//                                             Logout
//                                 </Button>
//                             </MenuList>
//                         </Menu>
//                     </Flex>
//                     <FullCalendar
//                         plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//                         initialView="dayGridMonth"
//                         events={events}
//                         dateClick={handleClick}
//                         editable={true}
//                         headerToolbar={{
//                             left: 'prev,next today',
//                             center: 'title',
//                             right: 'dayGridMonth,timeGridWeek,timeGridDay'
//                         }}
//                         buttonText={{
//                             today: 'Today',
//                             month: 'Month',
//                             week: 'Week',
//                             day: 'Day'
//                         }}
//                         eventColor={colorMode === 'light' ? '#3182CE' : '#90CDF4'}
//                         height="auto"
//                     />
//                 </Box>
//             </Flex>

//             <Modal isOpen={isOpen} onClose={onClose}>
//                 <ModalOverlay />
//                 <ModalContent bg={colorMode === 'light' ? 'white' : 'gray.800'} color={colorMode === 'light' ? 'black' : 'white'}>
//                     <ModalHeader>Add Event</ModalHeader>
//                     <ModalCloseButton />
//                     <ModalBody>
//                         <Input
//                             placeholder="Event Title"
//                             value={newEventTitle}
//                             onChange={(e) => setNewEventTitle(e.target.value)}
//                             mb={4}
//                             bg={colorMode === 'light' ? 'gray.100' : 'gray.700'}
//                             color={colorMode === 'light' ? 'black' : 'white'}
//                             borderColor="gray.300"
//                             _hover={{ borderColor: 'gray.400' }}
//                         />
//                         <Text mb={2}>Select Color:</Text>
//                         <Flex mb={4}>
//                             {colorOptions.map((colorOption, index) => (
//                                 <Box
//                                     key={index}
//                                     width="24px"
//                                     height="24px"
//                                     borderRadius="50%"
//                                     bg={colorOption.colorCode}
//                                     cursor="pointer"
//                                     border={selectedColor === colorOption.colorCode ? '2px solid black' : '2px solid transparent'}
//                                     onClick={() => setSelectedColor(colorOption.colorCode)}
//                                     mr={2}
//                                 />
//                             ))}
//                         </Flex>
//                         {selectedDateEvents.length > 0 && (
//                             <Box>
//                                 <Text mb={2}>Events on {selectedDate}:</Text>
//                                 <ul>
//                                     {selectedDateEvents.map((event, index) => (
//                                         <li key={index}>
//                                             {event.title}
//                                             <Button ml={2} colorScheme="red" size="xs" onClick={() => handleRemoveEvent(index)}>Remove</Button>
//                                         </li>
//                                     ))}
//                                 </ul>
//                             </Box>
//                         )}
//                     </ModalBody>
//                     <ModalFooter>
//                         <Button colorScheme="teal" mr={3} onClick={handleAddEvent}>
//                             Add Event
//                         </Button>
//                         <Button onClick={onClose}>Cancel</Button>
//                     </ModalFooter>
//                 </ModalContent>
//             </Modal>
//         </ChakraProvider>
//     );
// };

// export default Home;
