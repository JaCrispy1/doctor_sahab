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

const HistoryPage = () => {
  const id = localStorage.getItem("manager");
  console.log(id);
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
  const [fullNames, setFullNames] = useState("");
  const [phone, setPhone] = useState("");
  const [nmc, setNmc] = useState("");
  const [experience, setExperience] = useState("");
  const [special, setSpeciality] = useState("");
  const [qualification, setQualification] = useState("");
  const [specialityData, setSpecialityData] = useState([]);
  const [doctor, setDoctor] = useState(null);
  const [doctorData, setDoctorData] = useState(null);
  const [specailityHospital, setSpecialityHospital] = useState([]);
  const [fees, setFees] = useState("");

  useEffect(() => {
    const getSpecialityData = async () => {
      await fetch(`http://localhost:3000/api/user/getNoticeHospital/${id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setSpecialityData(data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getSpecialityData();
  }, [doctor]);

  useEffect(() => {
    const getSpecialityData = async () => {
      await fetch(`http://localhost:3000/api/user/getNoticeHospital/${id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data.data);
          setSpecialityHospital(data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getSpecialityData();
  }, []);

  const getDoctorData = async (doctorId) => {
    console.log(doctorId);
    try {
      const doctor = await fetch(
        `http://localhost:3000/api/manager/getDoctor/${doctorId}`
      );
      const doctorData = await doctor.json();
      setDoctorData(doctorData.doctor);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteDoctor = async (doctorId) => {
    try {
      await fetch(
        `http://localhost:3000/api/manager/deleteDoctor/${doctorId}`,
        {
          method: "DELETE",
        }
      );
      setDoctor((doctor) => !doctor);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
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
                {specailityHospital.map((item) => {
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
              md: 6,
            }}
            w={{
              base: 120,
              md: "full",
            }}
            textTransform="uppercase"
            bg={bg3}
            py={{
              base: 1,
              md: 6,
            }}
            px={{
              base: 2,
              md: 10,
            }}
            fontSize="md"
            fontWeight="bold"
          >
            <span>Hospital Id</span>
            <span>Speciality Name</span>
            <span>Phone Number</span>
            <span>Token Number</span>
            <span>Alloted</span>
            <chakra.span
              textAlign={{
                md: "right",
              }}
            >
              Price
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
                      md: 6,
                    }}
                    w="full"
                    py={2}
                    px={5}
                    borderBottomWidth="1px"
                  >
                    <span>{token.hospital.slice(0, 8)}</span>
                    <span>{token.speciality}</span>
                    <span>{token.phone}</span>
                    <span>{token.token}</span>
                    <span>{token.alloted}</span>

                    <span>{token.price}</span>
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

export default HistoryPage;
