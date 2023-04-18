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
  useColorModeValue,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  PinInput,
  PinInputField,
  useDisclosure,
  Center,
  Divider,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ManagerLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("hello");
    const sentOtp = async () => {
      const response = await fetch(
        "http://localhost:3000/api/manager/sendOTP",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      const data = await response.json();
      if (data.otp) {
        onOpen();
      }
    };
    sentOtp();
  };

  const login = async (e) => {
    e.preventDefault();
    console.log(otp);
    try {
      const response = await fetch("http://localhost:3000/api/manager/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, otp }),
      });
      const data = await response.json();
      console.log(data);
      if (data.message === "Login Successful") {
        console.log(data.token);
        localStorage.setItem("manager", data.hospital._id);
        navigate("/manager");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Modal isOpen={isOpen} closeOnOverlayClick={false} onClose={onClose}>
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent alignItems={"center"} mt={"120px"}>
          <Stack
            spacing={4}
            w={"full"}
            s
            display={"flex"}
            maxW={"sm"}
            bg={useColorModeValue("white", "gray.700")}
            alignItems={"center"}
            p={8}
            my={19}
          >
            <Center>
              <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
                Verify your Email
              </Heading>
            </Center>
            <Center
              fontSize={{ base: "sm", sm: "md" }}
              color={useColorModeValue("gray.800", "gray.400")}
            >
              We have sent code to your email
            </Center>
            <Center
              fontSize={{ base: "sm", sm: "md" }}
              fontWeight="bold"
              color={useColorModeValue("gray.800", "gray.400")}
            >
              {email}
            </Center>
            <FormControl>
              <Center>
                <HStack>
                  <PinInput
                    onComplete={(value) => {
                      setOtp(value);
                    }}
                  >
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                  </PinInput>
                </HStack>
              </Center>
            </FormControl>
            <Stack
              spacing={6}
              w={"full"}
              display={"flex"}
              alignItems={"center"}
            >
              <HStack>
                {" "}
                <Text color={"blue.500"}>Did not receive otp ? </Text>{" "}
                <Link color={"blue.500"}> Resend OTP </Link>{" "}
              </HStack>
              s
              <Flex w={"full"} gap={5} as={"form"} onSubmit={login}>
                <Button
                  bg={"red.500"}
                  color={"white"}
                  width={"140px"}
                  _hover={{
                    bg: "red.400",
                  }}
                  onClick={onClose}
                >
                  Cancel
                </Button>

                <Button
                  bg={"green.500"}
                  color={"white"}
                  type="submit"
                  width={"140px"}
                  _hover={{
                    bg: "green.400",
                  }}
                >
                  Verify
                </Button>
              </Flex>
            </Stack>
          </Stack>
        </ModalContent>
      </Modal>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Welcome Manager
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
          w={"400px"}
          as="form"
          onSubmit={submitHandler}
        >
          <Stack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="md"
                type="submit"
                bg={"purple.400"}
                color={"white"}
                _hover={{
                  bg: "purple.500",
                }}
              >
                Sign In
              </Button>
            </Stack>
            <Divider border={"2px solid gray.200"} />
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
