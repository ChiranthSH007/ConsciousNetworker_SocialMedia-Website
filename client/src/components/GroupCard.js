import { Box, Avatar, Text, Stack } from "@chakra-ui/react";

export default function GroupCard() {
  return (
    <>
      <Box mt={2} mb={3}>
        <Stack direction={"row"} align={"center"} spacing={5}>
          <Avatar
            size={"md"}
            src={"https://avatars0.githubusercontent.com/u/1164541?v=4"}
            alt={"Author"}
          />
          <Text fontWeight={600}>Meditation Group</Text>
        </Stack>
      </Box>
    </>
  );
}

//POst Card
//Image
//Title
//Category
//Desc
//Author

//event tile
//event name
//organizer
//desc
//time
//image
//
