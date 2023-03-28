import React, { useEffect } from "react";
import { useState } from "react";

import {
  Flex,
  IconButton,
  Button,
  Stack,
  Icon,
  useColorModeValue,
  SimpleGrid,
  chakra,
  ButtonGroup,
  Badge,
  InputGroup,
  InputLeftElement,
  Input,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  useDisclosure,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  HStack,
  Text,
} from "@chakra-ui/react";
import { AiFillEdit } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { SearchIcon } from "@chakra-ui/icons";

const TableDoctor = () => {
  const data = [
    {
      name: "Daggy",
      created: "7 years ",
      speciality: "Cardiology",
    },
    {
      name: "Anubra",
      created: "10 years",
      speciality: "Neurology",
    },
    {
      name: "Josef",
      created: "20 years",
      speciality: "Gastroenterology",
    },
    {
      name: "Sage",
      created: "5 years",
      speciality: "Neurology",
    },
  ];
  const speciality = [
    {
      id: 1,
      name: "Cardiology",
      description:
        "Cardiology is a branch of medicine dealing with disorders of the heart as well as parts of the circulatory system.",
      image:
        "https://www.heart.org/-/media/images/heart/conditions/cardiovascular-disease/cardiovascular-disease-condition-cardiolo",
    },
    {
      id: 2,
      name: "Neurology",
      description:
        "Neurology is a branch of medicine dealing with disorders of the nervous system.",
      image:
        "https://www.heart.org/-/media/images/heart/conditions/cardiovascular-disease/cardiovascular-disease-condition-cardiolo",
    },
    {
      id: 3,
      name: "Gastroenterology",
      description:
        "Gastroenterology is a branch of medicine focused on the digestive system and its disorders.",
      image:
        "https://www.heart.org/-/media/images/heart/conditions/cardiovascular-disease/cardiovascular-disease-condition-cardiolo",
    },
    {
      id: 4,
      name: "Dermatology",
      description:
        "Dermatology is a branch of medicine dealing with the skin, nails, hair and its diseases.",
      image:
        "https://www.heart.org/-/media/images/heart/conditions/cardiovascular-disease/cardiovascular-disease-condition-cardiolo",
    },
    {
      id: 5,
      name: "Oncology",
      description: "Oncology is a branch of medicine that deals with cancer.",
      image:
        "https://www.heart.org/-/media/images/heart/conditions/cardiovascular-disease/cardiovascular-disease-condition-cardiolo",
    },
    {
      id: 6,
      name: "Ophthalmology",
      description:
        "Ophthalmology is a branch of medicine and surgery which deals with the anatomy, physiology and diseases of the eye.",
      image:
        "https://www.heart.org/-/media/images/heart/conditions/cardiovascular-disease/cardiovascular-disease-condition-cardiolo",
    },
    {
      id: 7,
      name: "Orthopedics",
      description:
        "Orthopedics is a branch of surgery concerned with conditions involving the musculoskeletal system.",
      image:
        "https://www.heart.org/-/media/images/heart/conditions/cardiovascular-disease/cardiovascular-disease-condition-cardiolo",
    },
    {
      id: 8,
      name: "Urology",
      descption:
        "Urology is a branch of medicine that deals with the urinary tracts of males and females, and the reproductive system of males.",
      image:
        "https://www.heart.org/-/media/images/heart/conditions/cardiovascular-disease/cardiovascular-disease-condition-cardiolo",
    },
    {
      id: 9,
      name: "Pediatrics",
      description: "Pediatrics is a branch of medicine dealing with children.",
      image:
        "https://www.heart.org/-/media/images/heart/conditions/cardiovascular-disease/cardiovascular-disease-condition-cardiolo",
    },
    {
      id: 10,
      name: "Psychiatry",
      description:
        "Psychiatry is the medical specialty devoted to the diagnosis, prevention, study, and treatment of mental disorders.",
      image:
        " https://www.heart.org/-/media/images/heart/conditions/cardiovascular-disease/cardiovascular-disease-condition-cardiolo",
    },
    {
      id: 11,
      name: "Gynecology",
      description: "",
      image:
        "https://www.heart.org/-/media/images/heart/conditions/cardiovascular-disease/cardiovascular-disease-condition-cardiolo",
    },
    {
      id: 12,
      name: "Endocrinology",
      description:
        "Endocrinology is a branch of medicine dealing with the endocrine system, its diseases, and its specific secretions known as hormones.",
      image:
        "https://www.heart.org/-/media/images/heart/conditions/cardiovascular-disease/cardiovascular-disease-condition-cardiolo",
    },
  ];

  const bg = useColorModeValue("white", "gray.800");
  const bg2 = useColorModeValue("white", "gray.800");
  const bg3 = useColorModeValue("gray.100", "gray.700");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [search, setSearch] = useState(null);
  const [fullNames, setFullNames] = useState("");
  const [phone, setPhone] = useState("");
  const [nmc, setNmc] = useState("");
  const [experience, setExperience] = useState("");
  const [special, setSpeciality] = useState("");
  const [qualification, setQualification] = useState("");
  const [specialityData, setSpecialityData] = useState([]);
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const getSpecialityData = async () => {
      await fetch(
        "http://localhost:3000/api/manager/getDoctors/640c1b8ee6a03542520045c0"
      )
        .then((res) => res.json())
        .then((data) => {
          setSpecialityData(data.doctors);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getSpecialityData();
  }, [doctor]);

  const onChangeHandler = (text) => {
    setSearch(text);
    // if (!text) {
    //   setDoctor((doctor) => !doctor);
    // }
    // setSpecialityData(
    // specialityData.filter((item) =>
    //     item.speciality.toLowerCase().includes(text.toLowerCase())
    //   )
    // );
  };

  const addDoctor = async () => {
    const doctor = {
      hospital: "640c1b8ee6a03542520045c0",
      name: fullNames,
      phone: phone,
      nmc: nmc,
      experience: experience,
      speciality: special,
      qualification: qualification,
      available: [
        {
          id: 1,
        },
        {
          id: 2,
        },
        {
          id: 3,
        },
      ],
    };

    console.log(doctor);

    await fetch("http://localhost:3000/api/manager/createDoctor/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(doctor),
    })
      .then((res) => res.json())
      .then((data) => {
        onClose();
        setDoctor((doctor) => !doctor);
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  const onSearchHandler = (text) => {
    if (text.length === 0) {
      setDoctor((doctor) => !doctor);
    } else {
      const newData = specialityData.filter((hospital) => {
        return hospital.name.toLowerCase().includes(text.toLowerCase());
      });
      setSpecialityData(newData);
    }
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            display={"flex"}
            justifyContent={"center"}
            my={5}
            borderBottom={"1px solid "}
            borderColor={"gray.200"}
          >
            <Text fontSize={"25px"} textTransform={"uppercase"}>
              Add Doctor
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6} display={"flex"} flexDirection={"column"} gap={5}>
            <HStack>
              <FormControl isRequired>
                <FormLabel>Full Name</FormLabel>
                <Input
                  onChange={(e) => {
                    setFullNames(e.target.value);
                  }}
                  placeholder="Enter full name"
                />
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>Phone Number</FormLabel>
                <Input
                  placeholder="Enter your number"
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
              </FormControl>
            </HStack>
            <HStack>
              <FormControl isRequired>
                <FormLabel> NMC Number</FormLabel>
                <Input
                  onChange={(e) => {
                    setNmc(e.target.value);
                  }}
                  placeholder="Enter your NMC no"
                />
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>Experience Year</FormLabel>
                <Input
                  placeholder="Enter your experienced year"
                  onChange={(e) => {
                    setExperience(e.target.value);
                  }}
                />
              </FormControl>
            </HStack>
            <HStack>
              <FormControl isRequired>
                <FormLabel>Speciality</FormLabel>
                <Select
                  placeholder="Select option"
                  bg={"white"}
                  onChange={(e) => {
                    setSpeciality(e.target.value);
                  }}
                >
                  {speciality.map((item) => {
                    return (
                      <option key={item.id} value={item.name}>
                        {item.name}
                      </option>
                    );
                  })}
                </Select>
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>Qualification</FormLabel>
                <Input
                  placeholder="Enter your qualification"
                  onChange={(e) => {
                    setQualification(e.target.value);
                  }}
                />
              </FormControl>
            </HStack>
          </ModalBody>

          <ModalFooter
            borderTop={"1px solid"}
            borderColor={"gray.200"}
            display={"flex"}
            justifyContent={"end"}
          >
            <Button
              bg={"red.400"}
              color={"white"}
              onClick={onClose}
              _hover={{
                bg: "red.500",
              }}
              mr={3}
            >
              Cancel
            </Button>
            <Button
              bg={"green.600"}
              color={"white"}
              _hover={{
                bg: "green.500",
              }}
              colorScheme="blue"
              onClick={() => {
                addDoctor();
                onClose();
              }}
            >
              Add Doctor
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Flex
        w="full"
        bg="#edf3f8"
        _dark={{
          bg: "#3e3e3e",
        }}
        alignItems="center"
        justifyContent="center"
        direction={"column"}
      >
        <Flex my={50} w={"full"} justifyContent={"space-between"} gap={5}>
          <Flex w={"full"} gap={2}>
            <Flex w={"250px"}>
              <Select
                placeholder="Select option"
                bg={"white"}
                onChange={(e) => {
                  onChangeHandler(e.currentTarget.value);
                }}
              >
                {speciality.map((item) => {
                  return (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  );
                })}
              </Select>
            </Flex>
            <Flex w={"700px"}>
              <InputGroup bg={"white"} rounded={"md"}>
                <InputLeftElement
                  pointerEvents="none"
                  children={<SearchIcon />}
                />
                <Input
                  type="text"
                  placeholder="Search"
                  focusBorderColor="#8c81ea"
                  onChange={(e) => onSearchHandler(e.target.value)}
                />
              </InputGroup>
            </Flex>
          </Flex>
          <Button
            bg={"#8c81ea"}
            color={"white"}
            _hover={{
              bg: "purple.600",
            }}
            onClick={onOpen}
          >
            Add Doctor
          </Button>
        </Flex>
        <Stack
          direction={{
            base: "column",
          }}
          w="full"
          bg={{
            md: bg,
          }}
          shadow="lg"
        >
          <SimpleGrid
            spacingY={3}
            columns={{
              base: 1,
              md: 4,
            }}
            w={{
              base: 120,
              md: "full",
            }}
            textTransform="uppercase"
            bg={bg3}
            py={{
              base: 1,
              md: 4,
            }}
            px={{
              base: 2,
              md: 10,
            }}
            fontSize="md"
            fontWeight="bold"
          >
            <span>Name</span>
            <span>Speciality</span>
            <span>Experience</span>

            <chakra.span
              textAlign={{
                md: "right",
              }}
            >
              Actions
            </chakra.span>
          </SimpleGrid>
          {specialityData !== null ? (
            specialityData.map((token, tid) => {
              return (
                <Flex
                  direction={{
                    base: "row",
                    md: "column",
                  }}
                  bg={bg2}
                  key={tid}
                >
                  <SimpleGrid
                    spacingY={3}
                    columns={{
                      base: 1,
                      md: 4,
                    }}
                    w="full"
                    py={2}
                    px={10}
                    borderBottomWidth="1px"
                  >
                    <span>{token.name}</span>
                    <span>{token.speciality}</span>
                    <chakra.span
                      textOverflow="ellipsis"
                      overflow="hidden"
                      whiteSpace="nowrap"
                    >
                      {token.experience}
                    </chakra.span>

                    <Flex
                      justify={{
                        md: "end",
                      }}
                    >
                      <ButtonGroup variant="solid" size="sm" spacing={3}>
                        <IconButton
                          colorScheme="green"
                          icon={<AiFillEdit />}
                          aria-label="Edit"
                        />
                        <IconButton
                          colorScheme="red"
                          variant="outline"
                          icon={<BsFillTrashFill />}
                          aria-label="Delete"
                        />
                      </ButtonGroup>
                    </Flex>
                  </SimpleGrid>
                </Flex>
              );
            })
          ) : (
            <> No Doctor Data</>
          )}
        </Stack>
      </Flex>
    </>
  );
};

export default TableDoctor;
