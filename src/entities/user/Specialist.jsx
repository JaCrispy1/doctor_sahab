import { Avatar, Button, Flex, Text, Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Divider,
 } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Specialist = () => {
  const state = useLocation();
  const [specialist, setSpecialist] = useState([]);
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(
    {
      name: "",
      speciality: "",
      hospital: "",
      experience: "",
      rating: "",
      fees: "",
    },
  );
    
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    const getSpecialist = async () => {
      const response = await fetch(
        `http://localhost:3000/api/manager/getSpecialityDoctors`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            hospital: state.state.hospital,
            specialist: state.state.specialist,
          }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setSpecialist(data.doctors);
        });
    };
    getSpecialist();
  }, []);

  return (
    <Flex
      direction={"column"}
      w={"full"}
      alignItems={"center"}
      gap={20}
      my={20}
    >
      {specialist.map((item) => (
        <Flex
          w={"70%"}
          justifyContent={"space-between"}
          boxShadow={"lg"}
          px={10}
          py={5}
        >
            <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} size={"4xl"}>
            <ModalOverlay />
            <ModalContent>
              <ModalCloseButton />
              <ModalBody>
              <Flex alignItems={"center"} gap={10} py={"20"} px={"20"}>
                <Flex gap={5} alignItems={"center"} borderRight={"1px solid black"} pr={"50px"}>
                  <Avatar size={"2xl"} />
                  <Flex direction={"column"}>
                  <Text fontSize={"lg"} fontWeight={"500"}>{doctor.name}</Text>
                  <Text fontSize={"md"} fontWeight={"400"} color={"gray.600"}>{doctor.speciality}</Text>
                  <Text fontSize={"md"} fontWeight={"400"} color={"gray.600"}>Experience: {doctor.experience} years</Text>
                <Flex>
                </Flex>
                <Button variant={"outline"} border={"2px solid purple"} color={"purple"} borderRadius={"none"} _hover={{
                  bg: "purple.500",
                  color: "white",
                }} colorScheme={"purple.400"} fontSize={"14px"} h={"30px"} mt={"3"}>Review Doctor</Button>
                </Flex>
                </Flex>
              </Flex>
              </ModalBody>
              
            </ModalContent>
          </Modal>
        
          <Flex alignItems={"center"} gap={10}>
            <Avatar size={"2xl"} onClick={() => {
              console.log(item)
              setDoctor(item)
              onOpen()
            }}/>
            <Flex direction={"column"}>
              <Text fontSize={"lg"} fontWeight={"500"}>{item.name}</Text>
              <Text fontSize={"md"} fontWeight={"400"} color={"gray.600"}>{item.speciality}</Text>
              <Text fontSize={"md"} fontWeight={"400"} color={"gray.600"}>Experience: {item.experience} years</Text>
              <Button variant={"outline"} colorScheme={"purple.400"} fontSize={"14px"} h={"30px"} mt={"3"} onClick={() => {
                console.log(item)
                setDoctor(item)
                onOpen()
              }}>View Profile</Button>

            </Flex>
          </Flex>
          <Flex direction={"column"} justifyContent={"center"} gap={2}>
          <Flex justifyContent={"space-between"}><Text fontSize={"md"} fontWeight={"500"} color={"gray.600"}>Available Date:</Text> 
          <Text fontSize={"md"} fontWeight={"500"} color={"gray.600"}>Available Time:</Text></Flex>        
            {item.available.map((available) => {
              return (
                <Flex gap={20} alignItems={"center"}>
                  <Button w={"120px"} bg={"gray.100"} color={"black"} disabled>{available.date}</Button>
                  <Button w={"120px"} bg={"purple.400"} color={"white"} _hover={{
                    bg: "purple.500",
                  }} onClick={() => {
                    navigate("/checkout", {
                      state: {
                        doctor: item,
                        date: available.date,
                        time: available.time,
                      },
                    });
                  }}>{available.time}</Button>
                </Flex>
              );
            })}
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
};
export default Specialist;
