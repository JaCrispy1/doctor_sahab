import React from "react";

import { Box, chakra, Flex, Icon, Image } from "@chakra-ui/react";
import { BsFillBriefcaseFill } from "react-icons/bs";
const HospitalDetails = (props) => {
  console.log(props);
  return (
    <Flex
      py={50}
      pl={50}
      w="full"
      alignItems="center"
      justifyContent="center"
      mt={"87px"}
    >
      <Box
        w="sm"
        mx="auto"
        bg="white"
        _dark={{
          bg: "gray.800",
        }}
        shadow="lg"
        rounded="lg"
        overflow="hidden"
      >
        <Image
          w="full"
          h={56}
          fit="cover"
          objectPosition="center"
          src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
          alt="avatar"
        />

        <Box py={4} px={6}>
          <chakra.h1
            fontSize="xl"
            fontWeight="bold"
            color="gray.800"
            _dark={{
              color: "white",
            }}
          >
            {props.details.name}
          </chakra.h1>

          <Flex
            alignItems="center"
            mt={4}
            color="gray.700"
            _dark={{
              color: "gray.200",
            }}
          >
            <Icon as={BsFillBriefcaseFill} h={6} w={6} mr={2} />

            <chakra.h1 px={2} fontSize="sm">
              {props.details.address}
            </chakra.h1>
          </Flex>

          <Flex
            alignItems="center"
            mt={4}
            color="gray.700"
            _dark={{
              color: "gray.200",
            }}
          >
            <Icon h={6} w={6} mr={2} />

            <chakra.h1 px={2} fontSize="sm">
              {props.details.city}
            </chakra.h1>
          </Flex>
          <Flex
            alignItems="center"
            mt={4}
            color="gray.700"
            _dark={{
              color: "gray.200",
            }}
          >
            <Icon h={6} w={6} mr={2} />

            <chakra.h1 px={2} fontSize="sm">
              {props.details.phone}
            </chakra.h1>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};

export default HospitalDetails;
