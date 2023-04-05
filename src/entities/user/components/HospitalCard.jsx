import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
} from "@chakra-ui/react";

import { useNavigate, useLocation } from "react-router-dom";

const IMAGE =
  "https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80";

export default function HospitalCard(props) {
  const navigate = useNavigate();

  return (
    <Center py={12}>
      <Box
        role={"group"}
        p={6}
        maxW={"330px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"lg"}
        pos={"relative"}
        transition={"all .5s ease"}
        zIndex={1}
        _hover={{
          transform: "scale(1.02)",
          transition: "all .5s ease",
          boxShadow: "2xl",
        }}
        onClick={() => navigate(`/hospital/${props.id}`, { state: props })}
      >
        <Box
          rounded={"lg"}
          mt={-12}
          pos={"relative"}
          height={"230px"}
          _after={{
            transition: "all .3s ease",
            content: '""',
            w: "full",
            h: "full",
            pos: "absolute",
            top: 5,
            left: 0,
            backgroundImage: `url(${IMAGE})`,
            filter: "blur(20px)",
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: "blur(20px)",
            },
          }}
        >
          <Image
            rounded={"lg"}
            height={230}
            width={282}
            objectFit={"cover"}
            src={IMAGE}
          />
        </Box>
        <Stack pt={10} align={"center"}>
          <Heading fontSize={"lg"} fontFamily={"body"} fontWeight={500}>
            {props.name}
          </Heading>
          <Text color={"gray.500"} fontSize={"sm"}>
            {props.address}
          </Text>
        </Stack>
      </Box>
    </Center>
  );
}
