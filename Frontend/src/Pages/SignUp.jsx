import axios from 'axios';
import {toast} from 'react-hot-toast'
import { Link as RouterLink } from 'react-router-dom';
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
import { useNavigate } from 'react-router-dom';

  export default function SignUp() {
    const Navigate=useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData]=useState({
      firstName:"",
      lastName:"",
      email:"",
      password:"",
      teamId:""
    })
    const [isCreating, setIsCreating] = useState(false);
    const [isJoining, setIsJoining] = useState(false);
    const { colorMode, toggleColorMode } = useColorMode();
    const formBackground = useColorModeValue('gray.100', 'gray.700');
    const toas = useToast();
  
    const handleCheckboxChange = (type) => () => {
      if (type === 'creating') {
        setIsCreating(true);
        setIsJoining(false);
      } else if (type === 'joining') {
        setIsCreating(false);
        setIsJoining(true);
      }
    };
  
    const handleSignUp = async (e) => {
      e.preventDefault();
      const fn=data.firstName;
      const ln=data.lastName;
      const em=data.email;
      const ps=data.password;
      const mi=data.teamId;
      const jm=isJoining;
      if (!isCreating && !isJoining) {
        toas({
          title: "Selection required.",
          description: "Please select either 'Creating' or 'Joining'.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      try {
      const {data} = await axios.post('http://localhost:8000/auth/login',{
            firstName:fn,
            lastName:ln,
            email:em,
            password:ps,
            teamId:mi,
            isJoining:jm
      });
      if(data.error){
        toast.error(response.error);
      }
      else{
        console.log('abc');
        toast.success("Successfully registered !!");
        var delayInMilliseconds = 500; 

setTimeout(function() {navigate('/');
  
}, delayInMilliseconds);
      

      }
    } catch (error){
      console.log(error);
    }
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
                    <Input type="text" value={data.firstName} onChange={(e )=>setData({...data,firstName: e.target.value})}/>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName">
                    <FormLabel>Last Name</FormLabel>
                    <Input type="text" value={data.lastName} onChange={(e )=>setData({...data,lastName: e.target.value})}/>
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" value={data.email} onChange={(e )=>setData({...data,email: e.target.value})}/>
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? 'text' : 'password'} value={data.password} onChange={(e )=>setData({...data,password: e.target.value})}/>
                  <InputRightElement h={'full'}>
                    <Button variant={'ghost'} onClick={() => setShowPassword((showPassword) => !showPassword)}>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              {isJoining && (
                <FormControl id="email" isRequired>
                <FormLabel>Meeting ID</FormLabel>
                <Input type="text" />
              </FormControl>
              )}
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
                  Already a user? <Link color={'blue.400'} as={RouterLink} to={'http://localhost:5173/login'}>Login</Link>
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