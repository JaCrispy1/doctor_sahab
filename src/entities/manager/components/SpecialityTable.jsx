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
  VStack,
} from "@chakra-ui/react";
import { AiFillEdit } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { SearchIcon } from "@chakra-ui/icons";

const SpecailityTable = () => {
  const id = localStorage.getItem("manager");
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
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const [search, setSearch] = useState(null);
  const [specialityName, setspecialityName] = useState("");
  const [specialityDescription, setSpecialityDescription] = useState("");
  const [specialityData, setSpecialityData] = useState([]);
  const [editDoctor, setEditDoctor] = useState({
    name: "",
    description: "",
  });

  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const getSpecialityData = async () => {
      await fetch(
        `http://localhost:3000/api/manager/getHospitalSpeciality/${id}`
      )
        .then((res) => res.json())
        .then((data) => {
          setSpecialityData(data.speciality);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getSpecialityData();
  }, [doctor]);

  const addCategory = async () => {
    const data = {
      hospitalId: id,
      name: specialityName,
      description: specialityDescription,
    };
    console.log(data);
    await fetch("http://localhost:3000/api/manager/addHospitalSpeciality", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        onClose();
        setDoctor((doctor) => !doctor);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteHospitalSpeciality = async (id) => {
    await fetch(
      `http://localhost:3000/api/manager/deleteHospitalSpeciality/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ hospitalId: id }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setDoctor((doctor) => !doctor);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editHospitalSpeciality = async (id) => {
    const data = {
      hospitalId: id,
      name: editDoctor.name,
      description: editDoctor.description,
    };
    try {
      const res = await fetch(
        `http://localhost:3000/api/manager/updateHospitalSpeciality/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      setDoctor((doctor) => !doctor);
    } catch (err) {
      console.log(err);
    }
  };

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
              Add Speciality
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6} display={"flex"} flexDirection={"column"} gap={5}>
            <VStack>
              <FormControl isRequired>
                <FormLabel>Speciality Name</FormLabel>
                <Input
                  onChange={(e) => {
                    setspecialityName(e.target.value);
                  }}
                  placeholder="Enter Speciality"
                />
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>Description</FormLabel>
                <Input
                  placeholder="Enter Description"
                  onChange={(e) => {
                    setSpecialityDescription(e.target.value);
                  }}
                />
              </FormControl>
            </VStack>
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
                addCategory();
                onClose();
              }}
            >
              Add Category
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isEditOpen} onClose={onEditClose} size={"xl"}>
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
              Edit Speciality
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6} display={"flex"} flexDirection={"column"} gap={5}>
            <VStack>
              <FormControl isRequired>
                <FormLabel>Speciality Name</FormLabel>
                <Input
                  onChange={(e) => {
                    setEditDoctor(() => {
                      return {
                        ...editDoctor,
                        name: e.target.value,
                      };
                    });
                  }}
                  value={editDoctor.name}
                  placeholder="Enter Speciality"
                />
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel> Enter Description</FormLabel>
                <Input
                  placeholder="Description"
                  onChange={(e) => {
                    setEditDoctor(() => {
                      return {
                        ...editDoctor,
                        description: e.target.value,
                      };
                    });
                  }}
                  value={editDoctor.description}
                />
              </FormControl>
            </VStack>
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
                editHospitalSpeciality(editDoctor._id);
                onEditClose();
              }}
            >
              Save Category
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
            Add Category
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
              md: 2,
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
            <span> Category Name</span>

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
                      md: 2,
                    }}
                    w="full"
                    py={2}
                    px={10}
                    borderBottomWidth="1px"
                  >
                    <span>{token.name}</span>

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
                          onClick={() => {
                            setEditDoctor(() => {
                              return {
                                ...editDoctor,
                                _id: token._id,
                                name: token.name,
                                description: token.description,
                              };
                            });
                            onEditOpen();
                          }}
                        />
                        <IconButton
                          colorScheme="red"
                          variant="outline"
                          icon={<BsFillTrashFill />}
                          aria-label="Delete"
                          onClick={() => {
                            console.log(token);
                            deleteHospitalSpeciality(token._id);
                          }}
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

export default SpecailityTable;
