import { useState } from 'react';
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorMode,
    useColorModeValue,
    IconButton,
  } from '@chakra-ui/react';
  import { FaMoon, FaSun } from 'react-icons/fa';
  import axios from 'axios';
  import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
  export default function Login() {
    const { colorMode, toggleColorMode } = useColorMode();
    const Navigate=useNavigate();
    const formBackground = useColorModeValue('gray.100', 'gray.700');
    const [data, setData]=useState({
      email:"",
      password:"",
    })
    const handleLogin= async(e)=>{
        e.preventDefault();
        const em=email;
        const ps=password;

        try{
          const {data}=await axios.post('http://localhost:8000/auth/login',{
            email:em,
            password:ps
          })
          if(data.error){
            toast.error(data.error);
          }
          else{
            toast.success("Login is successful!");
            var delay=500;
            setTimeout(()=>Navigate('/'),delay)
          }
        }catch(error){
          console.log(error);
        }
    }
    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={formBackground}
        position="relative">
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.600')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="email" value={data.email} onChange={(e)=>{setData({...data,email:e.target.value})}}/>
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" value={data.password} onChange={(e)=>{setData({...data,password:e.target.value})}}/>
              </FormControl>
              <Text align="center">
                Don't have an account? <Link color="blue.400" as={RouterLink} to={'http://localhost:5173/signup'}>Sign up</Link>
              </Text>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                </Stack>
                <Button
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                    onClick={handleLogin}>
                  Sign in
                </Button>
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
          colorScheme="teal"
          onClick={toggleColorMode}
        />
      </Flex>
    );
  }
  