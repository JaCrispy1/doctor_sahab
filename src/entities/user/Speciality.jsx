import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Flex, InputGroup, InputLeftElement, Input } from "@chakra-ui/react";
import SpecialityCard from "./components/SpecialityCard";
import { SearchIcon } from "@chakra-ui/icons";
import HospitalDetails from "./components/HospitalDetails";
const Speciality = () => {
  const { id } = useParams();
  const { state } = useLocation();
  console.log(state);

  // const speciality = [
  //   {
  //     id: 1,
  //     name: "Cardiology",
  //     description:
  //       "Cardiology is a branch of medicine dealing with disorders of the heart as well as parts of the circulatory system.",
  //     image:
  //       "https://www.heart.org/-/media/images/heart/conditions/cardiovascular-disease/cardiovascular-disease-condition-cardiolo",
  //   },
  //   {
  //     id: 2,
  //     name: "Neurology",
  //     description:
  //       "Neurology is a branch of medicine dealing with disorders of the nervous system.",
  //     image:
  //       "https://www.heart.org/-/media/images/heart/conditions/cardiovascular-disease/cardiovascular-disease-condition-cardiolo",
  //   },
  //   {
  //     id: 3,
  //     name: "Gastroenterology",
  //     description:
  //       "Gastroenterology is a branch of medicine focused on the digestive system and its disorders.",
  //     image:
  //       "https://www.heart.org/-/media/images/heart/conditions/cardiovascular-disease/cardiovascular-disease-condition-cardiolo",
  //   },
  //   {
  //     id: 4,
  //     name: "Dermatology",
  //     description:
  //       "Dermatology is a branch of medicine dealing with the skin, nails, hair and its diseases.",
  //     image:
  //       "https://www.heart.org/-/media/images/heart/conditions/cardiovascular-disease/cardiovascular-disease-condition-cardiolo",
  //   },
  //   {
  //     id: 5,
  //     name: "Oncology",
  //     description: "Oncology is a branch of medicine that deals with cancer.",
  //     image:
  //       "https://www.heart.org/-/media/images/heart/conditions/cardiovascular-disease/cardiovascular-disease-condition-cardiolo",
  //   },
  //   {
  //     id: 6,
  //     name: "Ophthalmology",
  //     description:
  //       "Ophthalmology is a branch of medicine and surgery which deals with the anatomy, physiology and diseases of the eye.",
  //     image:
  //       "https://www.heart.org/-/media/images/heart/conditions/cardiovascular-disease/cardiovascular-disease-condition-cardiolo",
  //   },
  //   {
  //     id: 7,
  //     name: "Orthopedics",
  //     description:
  //       "Orthopedics is a branch of surgery concerned with conditions involving the musculoskeletal system.",
  //     image:
  //       "https://www.heart.org/-/media/images/heart/conditions/cardiovascular-disease/cardiovascular-disease-condition-cardiolo",
  //   },
  //   {
  //     id: 8,
  //     name: "Urology",
  //     descption:
  //       "Urology is a branch of medicine that deals with the urinary tracts of males and females, and the reproductive system of males.",
  //     image:
  //       "https://www.heart.org/-/media/images/heart/conditions/cardiovascular-disease/cardiovascular-disease-condition-cardiolo",
  //   },
  //   {
  //     id: 9,
  //     name: "Pediatrics",
  //     description: "Pediatrics is a branch of medicine dealing with children.",
  //     image:
  //       "https://www.heart.org/-/media/images/heart/conditions/cardiovascular-disease/cardiovascular-disease-condition-cardiolo",
  //   },
  //   {
  //     id: 10,
  //     name: "Psychiatry",
  //     description:
  //       "Psychiatry is the medical specialty devoted to the diagnosis, prevention, study, and treatment of mental disorders.",
  //     image:
  //       " https://www.heart.org/-/media/images/heart/conditions/cardiovascular-disease/cardiovascular-disease-condition-cardiolo",
  //   },
  //   {
  //     id: 11,
  //     name: "Gynecology",
  //     description: "",
  //     image:
  //       "https://www.heart.org/-/media/images/heart/conditions/cardiovascular-disease/cardiovascular-disease-condition-cardiolo",
  //   },
  //   {
  //     id: 12,
  //     name: "Endocrinology",
  //     description:
  //       "Endocrinology is a branch of medicine dealing with the endocrine system, its diseases, and its specific secretions known as hormones.",
  //     image:
  //       "https://www.heart.org/-/media/images/heart/conditions/cardiovascular-disease/cardiovascular-disease-condition-cardiolo",
  //   },
  // ];

  const [special, setSpecial] = React.useState([]);

  const [search, setSearch] = React.useState(false);

  useEffect(() => {
    const getSpeciality = async () => {
      const response = await fetch(
        `http://localhost:3000/api/manager/getSpeciality/${id}`
      )
        .then((res) => res.json())
        .then((data) => {
          setSpecial(data.speciality);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getSpeciality();
  }, [search]);

  const searchHandler = (e) => {
    const search = e.target.value;
    if (search.length === 0) {
      setSearch((search) => !search);
    } else {
      const filtered = special.filter((special) => {
        return special.name.toLowerCase().includes(search.toLowerCase());
      });
      setSpecial(filtered);
    }
  };

  return (
    <Flex justifyContent={"space-between"} mb={20}>
      <Flex
        w={"25%"}
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        height={"full"}
      >
        <HospitalDetails details={state} />
      </Flex>
      <Flex w={"65%"} direction={"column"} alignItems={"start"}>
        {/* <h1>Speciality</h1>
        <h2>{id}</h2> */}
        <Flex my={50} w={"790px"} justifyContent={"start"}>
          <InputGroup>
            <InputLeftElement pointerEvents="none" children={<SearchIcon />} />
            <Input
              type="text"
              placeholder="Search"
              focusBorderColor="#8c81ea"
              onChange={(e) => searchHandler(e)}
            />
          </InputGroup>
        </Flex>
        <Flex wrap={"wrap"} w={"80%"} justifyContent={"start"} gap={16}>
          {special.map((special) => (
            <SpecialityCard
              key={special.id}
              name={special.name}
              doctors={10}
              hospital={id}
            />
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Speciality;
