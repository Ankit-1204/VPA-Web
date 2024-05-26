import React, { useState } from 'react';
import { Box, Button, Input, VStack, HStack, useToast, ChakraProvider } from '@chakra-ui/react';
import { FaMicrophone } from 'react-icons/fa';

const SpeechInput = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');
  const toast = useToast();

  const handleSpeechInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
      toast({
        title: 'Speech recognition not supported.',
        description: 'Your browser does not support speech recognition.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      setInputValue(speechResult);
    };

    recognition.onerror = (event) => {
      toast({
        title: 'Error occurred in speech recognition.',
        description: event.error,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    };
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleEnter = () => {
    if (inputValue.trim()) {
      onSubmit(inputValue);
      setInputValue('');
    }
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} boxShadow="sm" width="100%" maxW="md" bg="white" mt={4}>
      <HStack spacing={2}>
        <Input
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter text or use speech input"
        />
        <Button onClick={handleSpeechInput} leftIcon={<FaMicrophone />} colorScheme="teal">
          Speak
        </Button>
        <Button onClick={handleEnter} colorScheme="blue">
          Enter
        </Button>
      </HStack>
    </Box>
  );
};

export default SpeechInput;
