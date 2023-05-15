import {
  Grid,
  GridItem,
  Text,
  Box,
  useColorModeValue,
  Stack,
  Center,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import EventTile from "../components/EventTile";
import GroupCard from "../components/GroupCard";
import Post from "../components/PostCard";
import SkeletonPost from "../components/SkeletonPost";

export default function PageFeed() {
  const [posts, setposts] = useState([]);
  const [uid, setUid] = useState(null);
  const [Event, getEvent] = useState([]);

  const groups = [
    "Mediation Group",
    "Yoga Group",
    "Mediation Group",
    "Yoga Group",
    "Yoga Group",
    "Yoga Group",
    "Yoga Group",
  ];
  useEffect(() => {
    async function fetchData() {
      await axios
        .get("http://localhost:4000/profile", {
          withCredentials: true,
        })
        .then((response) => {
          console.log(response);
          setUid(response.data.id);
        })
        .catch(async (err) => {
          const queryString = window.location.search;
          const urlParams = new URLSearchParams(queryString);
          const code = urlParams.get("code");
          console.log("this is the code: " + code);
          try {
            const response = await axios.get(
              "http://localhost:4000/linkedinauth?code=" + code,
              {
                withCredentials: true,
              }
            );
            fetchData();
            window.location.reload();
            console.log(response.data);
          } catch (error) {
            console.log(error);
            //window.location.href="/auth"
          }
          if (code == "") window.location.href = "/auth";
        });
    }
    fetchData();
    fetch("http://localhost:4000/getpost").then((response) => {
      response.json().then((posts) => {
        setposts(posts);
        console.log(posts);
      });
    });
    fetch("http://localhost:4000/getevent").then((response) => {
      response.json().then((Event) => {
        getEvent(Event);
        console.log(Event);
      });
    });
  }, []);

  return (
    <div className="bgColor">
      <Box pt={20}>
        <Grid templateColumns="repeat(5, 1fr)" gap={3}>
          <GridItem colSpan={1} h="auto">
            <Box
              position={"fixed"}
              bg={useColorModeValue("white", "gray.900")}
              boxShadow={"2xl"}
              rounded={"md"}
              width={"375px"}
              minHeight={"87vh"}
              maxHeight={"87vh"}
              p={15}
              mt={5}
              ml={5}
              overflowY="auto"
              __css={{
                "&::-webkit-scrollbar": {
                  w: "2",
                },
                "&::-webkit-scrollbar-track": {
                  w: "6",
                },
                "&::-webkit-scrollbar-thumb": {
                  borderRadius: "10",
                  bg: `gray.100`,
                },
              }}
            >
              <Text color={"gray.600"} fontWeight={"bold"} mb={5}>
                Motivational Quotes
              </Text>
              {/* <div>
                {groups.map((groups) => (
                  <GroupCard {...groups} />
                ))}
              </div> */}
            </Box>
          </GridItem>
          <GridItem colSpan={3} h="auto">
            {posts.length > 0 ? (
              <div>
                {posts.length > 0 &&
                  posts.map((post) => <Post {...post} uid={uid} />).reverse()}
              </div>
            ) : (
              <Box>
                <SkeletonPost />
              </Box>
            )}
          </GridItem>
          <GridItem colStart={5} colEnd={6}>
            <Stack position={"fixed"}>
              {/* <Box
                bg={useColorModeValue("white", "gray.900")}
                boxShadow={"2xl"}
                rounded={"md"}
                maxHeight={"400px"}
                width={"full"}
                p={15}
                mb={2}
                mt={3}
                overflowY="auto"
                __css={{
                  "&::-webkit-scrollbar": {
                    w: "2",
                  },
                  "&::-webkit-scrollbar-track": {
                    w: "6",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    borderRadius: "10",
                    bg: `gray.100`,
                  },
                }}
              >
                <Text color={"gray.600"} fontWeight={"bold"}>
                  Registered Events
                </Text>
                <div>
                  {groups.map((groups) => (
                    <EventTile {...groups} />
                  ))}
                </div>
              </Box> */}
              <Box
                bg={useColorModeValue("white", "gray.900")}
                boxShadow={"2xl"}
                rounded={"md"}
                width={"350px"}
                maxHeight={"400px"}
                p={15}
                mt={5}
                overflowY="auto"
                __css={{
                  "&::-webkit-scrollbar": {
                    w: "2",
                  },
                  "&::-webkit-scrollbar-track": {
                    w: "6",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    borderRadius: "10",
                    bg: `gray.100`,
                  },
                }}
              >
                <Text color={"gray.600"} fontWeight={"bold"}>
                  Events
                </Text>
                <div>
                  {Event.length > 0 &&
                    Event.map((post) => (
                      <EventTile {...post} uid={uid} />
                    )).reverse()}
                </div>
              </Box>
            </Stack>
          </GridItem>
        </Grid>
      </Box>
    </div>
  );
}
// need to split the array of events before going to seperate tiles
//store the eventids in user collection
