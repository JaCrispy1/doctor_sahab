import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Flex,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import { SearchIcon } from "@chakra-ui/icons";

const IMAGE =
  "https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80";

export default function SpecialityCard(props) {
  const navigate = useNavigate();

  console.log(props);

  return (
    <Center>
      <Box
        as={Flex}
        w={"full"}
        rounded={"lg"}
        pos={"relative"}
        flexDirection={"column"}
        transition={"all .5s ease"}
        _hover={{
          transform: "scale(1.02)",
          transition: "all .5s ease",
          boxShadow: "2xl",
        }}
        onClick={() =>
          navigate("/specialist", {
            state: {
              hospital: props.hospital,
              specialist: props.name,
            },
          })
        }
      >
        <Image
          rounded={"lg"}
          height={150}
          width={150}
          objectFit={"cover"}
          src={IMAGE}
        />
        <Stack pt={2} align={"center"}>
          <Heading fontSize={"lg"} fontFamily={"body"} fontWeight={500}>
            {props.name}
          </Heading>
          <Text color={"gray.500"} fontSize={"sm"}>
            {props.doctors} Doctors
          </Text>
        </Stack>
      </Box>
    </Center>
  );
}
