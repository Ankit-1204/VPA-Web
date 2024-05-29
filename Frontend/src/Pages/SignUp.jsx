import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorMode,
  useColorModeValue,
  Link,
  IconButton,
  Checkbox,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { FaMoon, FaSun } from 'react-icons/fa';

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue('gray.100', 'gray.700');
  const toast = useToast();

  const handleCheckboxChange = (type) => () => {
    if (type === 'creating') {
      setIsCreating(true);
      setIsJoining(false);
    } else if (type === 'joining') {
      setIsCreating(false);
      setIsJoining(true);
    }
  };

  const handleSignUp = () => {
    if (!isCreating && !isJoining) {
      toast({
        title: "Selection required.",
        description: "Please select either 'Creating' or 'Joining'.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    // Handle sign-up logic here
  };

  return (
    <Flex minH={'100vh'} align={'center'} justify={'center'} bg={formBackground} position="relative">
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
        </Stack>
        <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.600')} boxShadow={'lg'} p={8}>
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input type="text" />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Last Name</FormLabel>
                  <Input type="text" />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} />
                <InputRightElement h={'full'}>
                  <Button variant={'ghost'} onClick={() => setShowPassword((showPassword) => !showPassword)}>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={5} direction="row" align="center">
              <Checkbox isChecked={isCreating} onChange={handleCheckboxChange('creating')}>
                Creating
              </Checkbox>
              <Checkbox isChecked={isJoining} onChange={handleCheckboxChange('joining')}>
                Joining
              </Checkbox>
            </Stack>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={handleSignUp}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user? <Link color={'blue.400'}>Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
      <IconButton
        aria-label="Toggle dark mode"
        icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
        position="fixed"
        bottom={4}
        right={4}
        onClick={toggleColorMode}
        colorScheme="teal"
      />
    </Flex>
  );
}
