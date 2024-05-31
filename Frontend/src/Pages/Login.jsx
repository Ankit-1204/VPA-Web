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
  
  export default function Login() {
    const { colorMode, toggleColorMode } = useColorMode();
    const formBackground = useColorModeValue('gray.100', 'gray.700');
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
                <Input type="email" />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" />
              </FormControl>
              <Text align="center">
                Don't have an account? <Link color="blue.400">Sign up</Link>
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
                  }}>
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
  