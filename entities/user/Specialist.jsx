import { Avatar, Flex, Table } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Specialist = () => {
  const state = useLocation();
  const [specialist, setSpecialist] = useState([]);

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
          py={10}
          px={20}
        >
          <Flex alignItems={"center"} gap={10}>
            <Avatar size={"lg"} />
            <Flex direction={"column"}>
              <h1>{item.name}</h1>
              <h1>Speciality: {item.speciality}</h1>
              <h1>Qualification: {item.qualification}</h1>
              <h1>Experience: {item.experience}</h1>
            </Flex>
          </Flex>
          <Flex direction={"column"} justifyContent={"center"}>
            {item.available.map((available) => {
              return (
                <Flex gap={20}>
                  <h1>{available.date.slice(0, 10)}</h1>
                  <h1>{available.time}</h1>
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
