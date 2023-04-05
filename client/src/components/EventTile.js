import { Badge, Box, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function EventTile({
  index,
  usereventname,
  usereventdescription,
  usereventlocation,
  usereventtime,
  eventimg,
  usereventorgname,
  usereventorggmail,
  usereventcategory,
  _id,
  uid,
}) {
  const [regStatus, setRegStatus] = useState(null);

  useEffect(() => {
    async function checkReg() {
      await axios
        .post("http://localhost:4000/checkreg", {
          eid: _id,
          uid: uid,
        })
        .then((response) => {
          if (response.data != null) {
            // console.log("CheckRegistration Response" + response.data);
            console.log("times");
            setRegStatus(true);
          } else {
            setRegStatus(false);
          }
        });
    }

    checkReg();
  }, []);
  return (
    <Box
      h={"80px"}
      bg={useColorModeValue("#f2f3f8", "gray.900")}
      boxShadow={"2xs"}
      rounded={"md"}
      p={"10px"}
      mt={2}
      mb={2}
      overflow={"hidden"}
      justifyItems={"center"}
    >
      <Stack direction={"row"}>
        <Box
          mr={"10px"}
          h={"60px"}
          w={"50px"}
          bg={"green.500"}
          rounded={"md"}
          align={"center"}
        >
          <Stack direction={"column"} spacing={0}>
            <Text fontWeight={"bold"} color={"white"}>
              30
            </Text>
            <Text fontWeight={"bold"} color={"white"}>
              MAR
            </Text>
          </Stack>
        </Box>
        <Stack direction={"column"} align={"start"} spacing={0}>
          <Stack direction={"row"} justify={"space-between"} align={"center"}>
            <Text fontWeight={600}>Yoga</Text>
            {regStatus ? (
              <Badge colorScheme="green" width={"min-content"}>
                Regitsered
              </Badge>
            ) : (
              <Badge colorScheme={"blue"} width={"min-content"}>
                Upcomming
              </Badge>
            )}
          </Stack>
          <Stack direction={"row"}>
            <Text fontWeight={350}>Venue</Text>

            <Text fontWeight={350} color={"green"}>
              #meditation
            </Text>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
