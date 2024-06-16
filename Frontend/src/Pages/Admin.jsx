
import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  Heading,
  Textarea,
  Button,
  Checkbox,
  VStack,
  HStack,
  Text,
  Flex,
  Spacer,
  Link,
  IconButton,
  useColorMode,
} from '@chakra-ui/react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

const App = () => {
  const [command, setCommand] = useState('');
  const [selectedRecipients, setSelectedRecipients] = useState([]);
  const [commandsList, setCommandsList] = useState([]);
  const { colorMode, toggleColorMode } = useColorMode();

  const recipients = ['Employee 1', 'Employee 2', 'Employee 3', 'Employee 4', 'Employee 5','Employee 6', 'Employee 7', 'Employee 8', 'Employee 9', 'Employee 10'];

  const handleCommandChange = (e) => setCommand(e.target.value);

  const handleRecipientChange = (recipient) => {
    setSelectedRecipients((prev) =>
      prev.includes(recipient)
        ? prev.filter((item) => item !== recipient)
        : [...prev, recipient]
    );
  };

  const handleCommandSubmit = () => {
    setCommandsList((prev) => [...prev, { command, recipients: selectedRecipients }]);
    setCommand('');
    setSelectedRecipients([]);
  };

  const employeeDetails = {
    name: 'Employee 1',
    position: 'Software Engineer',
    schedule: [
      { day: 'Monday', hours: 8 },
      { day: 'Tuesday', hours: 7 },
      { day: 'Wednesday', hours: 8 },
      { day: 'Thursday', hours: 6 },
      { day: 'Friday', hours: 7 },
    ],
  };

  return (
    <ChakraProvider>
      <Box>
        <Flex as="nav" bg="teal.500" p={4} color="white" align="center">
          <Heading as="h1" size="lg">Admin Dashboard</Heading>
          <Spacer />
          <HStack spacing={4}>
            <Link href="#commands">Commands</Link>
            <Link href="#employee-details">Employee Details</Link>
            <IconButton
              aria-label="Toggle theme"
              icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
            />
          </HStack>
        </Flex>
        <Box p={4}>
          <VStack spacing={8} align="stretch">
            <Box id="commands" w="full" p={6} borderWidth={1} borderRadius="md" boxShadow="md">
              <Heading as="h2" size="lg" mb={4}>Command Box</Heading>
              <Textarea
                placeholder="Enter your command here..."
                value={command}
                onChange={handleCommandChange}
                mb={4}
              />
              <Box h="150px" overflowY="auto" mb={4}>
                <VStack align="start">
                  {recipients.map((recipient) => (
                    <Checkbox
                      key={recipient}
                      isChecked={selectedRecipients.includes(recipient)}
                      onChange={() => handleRecipientChange(recipient)}
                    >
                      {recipient}
                    </Checkbox>
                  ))}
                </VStack>
              </Box>
              <Button mt={4} colorScheme="teal" onClick={handleCommandSubmit}>Submit Command</Button>
            </Box>
            <Box w="full" p={6} borderWidth={1} borderRadius="md" boxShadow="md">
              <Heading as="h2" size="lg" mb={4}>Commands for Recipients</Heading>
              <VStack align="stretch">
                {commandsList.map((item, index) => (
                  <Box key={index} p={4} borderWidth={1} borderRadius="md" boxShadow="sm">
                    <Text><strong>Command:</strong> {item.command}</Text>
                    <Text><strong>Recipients:</strong> {item.recipients.join(', ')}</Text>
                  </Box>
                ))}
              </VStack>
            </Box>
            <Box id="employee-details" w="full" p={6} borderWidth={1} borderRadius="md" boxShadow="md">
              <Heading as="h2" size="lg" mb={4}>Employee Details</Heading>
              <Text><strong>Name:</strong> {employeeDetails.name}</Text>
              <Text><strong>Position:</strong> {employeeDetails.position}</Text>
              <Box mt={4} h="300px">
                <ResponsiveContainer>
                  <BarChart data={employeeDetails.schedule}>
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="hours" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </Box>
          </VStack>
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default App;


