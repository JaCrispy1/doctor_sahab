import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  HStack,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { EditIcon, SmallCloseIcon } from '@chakra-ui/icons';

export default function UserProfileEdit(){
  const phone = localStorage.getItem('phone') ? localStorage.getItem('phone') : null;
  const [userData, setUserData] = useState({});

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try{
  //       const response = await fetch("http://localhost:3000/api/user/data/"+phone);
  //       const data = await response.json();
  //       setUserData(data);
  //       console.log(data);
  //     }
  //     catch(err){
  //       console.log("hrlllo");
  //       console.log(err);
  //     }
  //   }
  //   fetchUser();
  // }, []);

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}>
        <Heading lineHeight={3.1} fontSize={{ base: '2xl', sm: '3xl' }} justifyContent={'center'}>
          {/* {
            userData.user.name
          } */}
        </Heading>
        <FormControl id="userName">
          <Stack direction={['column', 'row']} spacing={6}>
            <Center>
              <Avatar size="xl" src="https://bit.ly/sage-adebayo">
                <AvatarBadge
                  as={IconButton}
                  size="sm"
                  rounded="full"
                  top="-10px"
                  colorScheme="green"
                  aria-label="remove Image"
                  icon={<EditIcon />}
                />
              </Avatar>
            </Center>
            <Center w="full">
              <Button w="full">Edit Profile</Button>
            </Center>
          </Stack>
        </FormControl>
        <FormControl id="userName" isRequired>
          <FormLabel>User name</FormLabel>
          <Input
            placeholder="UserName"
            _placeholder={{ color: 'gray.500' }}
            type="text"
           
          />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Phone Number</FormLabel>
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: 'gray.500' }}
            type="email"
          
          />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Blood Group</FormLabel>
          <Input
            placeholder="B+"
            _placeholder={{ color: 'gray.500' }}
            type="email"
            
          />
        </FormControl>
        <Stack spacing={6} direction={['column', 'row']}>
          <Button
            bg={'red.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'red.500',
            }}>
            Cancel
          </Button>
          <Button
            bg={'green.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'green.500',
            }}>
            Save
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}