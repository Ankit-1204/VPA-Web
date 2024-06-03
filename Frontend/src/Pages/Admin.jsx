
// src/App.js
import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  Flex,
  Heading,
  Input,
  List,
  ListItem,
  Text,
  IconButton,
  Icon,
  Grid,
  GridItem,
  Button,
  useDisclosure,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import { SearchIcon, BellIcon } from '@chakra-ui/icons';
import { FaChartBar, FaChartLine, FaChartPie } from 'react-icons/fa';

const employees = [
  { id: 1, name: 'John Doe', events: ['Joined the company', 'Promoted to Manager'] },
  { id: 2, name: 'Jane Smith', events: ['Joined the company', 'Completed Project X'] },
];

function App() {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [command, setCommand] = useState('');
  const [employeeEvents, setEmployeeEvents] = useState({});

  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleCommandSubmit = () => {
    if (selectedEmployee) {
      setEmployeeEvents((prevEvents) => ({
        ...prevEvents,
        [selectedEmployee.id]: [
          ...(prevEvents[selectedEmployee.id] || []),
          command,
        ],
      }));
      setCommand('');
    }
  };

  return (
    <ChakraProvider>
      <Flex direction="column" height="100vh">
        {/* Header */}
        <Flex as="header" width="100%" padding="4" bg="blue.700" color="white" align="center" justify="space-between">
          <Heading size="md">NOVUS AdminPanel</Heading>
          <Box width="40%">
            <Input placeholder="Search..." bg="white" color="black" />
          </Box>
          <Flex align="center">
            <IconButton icon={<BellIcon />} variant="ghost" aria-label="Notifications" color="white" />
            <Box marginLeft="4" textAlign="right">
              <Text>Wikolla</Text>
              <Text fontSize="sm">Administrator</Text>
            </Box>
          </Flex>
        </Flex>

        {/* Main content */}
        <Flex flex="1">
          {/* Sidebar */}
          <Box width="250px" bg="blue.700" color="white" p={4} display="flex" flexDirection="column">
            <List spacing={3}>
              <ListItem cursor="pointer">Dashboard</ListItem>
              <ListItem cursor="pointer">Components</ListItem>
              <ListItem cursor="pointer">UI Elements</ListItem>
              <ListItem cursor="pointer">Widgets</ListItem>
              <ListItem cursor="pointer">Mailbox</ListItem>
              <ListItem cursor="pointer">Tables</ListItem>
              <ListItem cursor="pointer">Forms</ListItem>
              <ListItem cursor="pointer">Pages</ListItem>
              <ListItem cursor="pointer">Charts</ListItem>
            </List>
          </Box>

          {/* Dashboard Content */}
          <Box flex="1" p={4} bg="blue.50">
            <Grid templateColumns="repeat(3, 1fr)" gap={4}>
              <GridItem colSpan={1}>
                <Box bg="blue.300" p={4} borderRadius="md">
                  <Heading size="md">Today Sales</Heading>
                  <Text fontSize="2xl" mt={2}>45</Text>
                </Box>
              </GridItem>
              <GridItem colSpan={1}>
                <Box bg="gray.300" p={4} borderRadius="md">
                  <Heading size="md">Today Visitors</Heading>
                  <Text fontSize="2xl" mt={2}>80</Text>
                </Box>
              </GridItem>
              <GridItem colSpan={1}>
                <Box bg="orange.300" p={4} borderRadius="md">
                  <Heading size="md">Today Orders</Heading>
                  <Text fontSize="2xl" mt={2}>51</Text>
                </Box>
              </GridItem>
            </Grid>
            <Grid templateColumns="repeat(3, 1fr)" gap={4} mt={4}>
              <GridItem colSpan={1}>
                <Box bg="white" p={4} borderRadius="md" boxShadow="md">
                  <Heading size="sm" mb={4}>Bar Chart Example</Heading>
                  <Icon as={FaChartBar} boxSize={24} color="blue.700" />
                </Box>
              </GridItem>
              <GridItem colSpan={1}>
                <Box bg="white" p={4} borderRadius="md" boxShadow="md">
                  <Heading size="sm" mb={4}>Line Chart Example</Heading>
                  <Icon as={FaChartLine} boxSize={24} color="blue.700" />
                </Box>
              </GridItem>
              <GridItem colSpan={1}>
                <Box bg="white" p={4} borderRadius="md" boxShadow="md">
                  <Heading size="sm" mb={4}>Pie Chart Example</Heading>
                  <Icon as={FaChartPie} boxSize={24} color="blue.700" />
                </Box>
              </GridItem>
            </Grid>
            <Box mt={4}>
              <Heading size="md" mb={4}>Employees</Heading>
              <List spacing={3}>
                {employees.map((employee) => (
                  <ListItem
                    key={employee.id}
                    cursor="pointer"
                    onClick={() => handleEmployeeClick(employee)}
                    bg="white"
                    p={4}
                    borderRadius="md"
                    boxShadow="md"
                  >
                    {employee.name}
                  </ListItem>
                ))}
              </List>
            </Box>
            {selectedEmployee && (
              <Box mt={4}>
                <Heading size="md">{selectedEmployee.name}</Heading>
                <FormControl mt={4} display="flex" alignItems="center">
                  <Input
                    placeholder="Enter command"
                    value={command}
                    onChange={(e) => setCommand(e.target.value)}
                  />
                  <Button ml={2} onClick={handleCommandSubmit}>
                    Enter
                  </Button>
                </FormControl>
                <Text mt={4}>Events:</Text>
                <List spacing={2} mt={2}>
                  {[
                    ...(selectedEmployee.events || []),
                    ...(employeeEvents[selectedEmployee.id] || []),
                  ].map((event, index) => (
                    <ListItem key={index}>{event}</ListItem>
                  ))}
                </List>
              </Box>
            )}
          </Box>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}

export default App;

