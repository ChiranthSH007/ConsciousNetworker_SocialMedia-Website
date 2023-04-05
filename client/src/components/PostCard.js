import {
  Image,
  Heading,
  Text,
  Avatar,
  Box,
  Center,
  Stack,
  useColorModeValue,
  Flex,
  IconButton,
  Badge,
} from "@chakra-ui/react";
import { BiLike, BiComment, BiShareAlt } from "react-icons/bi";

export default function Post({
  title,
  description,
  category,
  authorname,
  authorpic,
  image,
  createdAt,
}) {
  return (
    <>
      <Center py={6}>
        <Box
          maxW={"1000px"}
          bg={useColorModeValue("white", "gray.900")}
          boxShadow={"2xl"}
          rounded={"md"}
          h={"350px"}
          p={6}
          overflow={"hidden"}
        >
          <Flex>
            <Box
              h={"300px"}
              w={"300px"}
              bg={"gray.100"}
              rounded={"md"}
              boxShadow={"2xl"}
            >
              <Image
                h={"300px"}
                w={"300px"}
                rounded={"md"}
                src={image}
                alt="Post-Image"
                objectFit="fill"
              />
            </Box>
            <Box paddingStart={10}>
              <Flex gap={28} direction={"column"}>
                <Stack>
                  {/* <Text
                    color={"green.500"}
                    textTransform={"uppercase"}
                    fontWeight={800}
                    fontSize={"sm"}
                    letterSpacing={1.1}
                  >
                    Category
                  </Text> */}
                  <Badge colorScheme="green" width={"min-content"}>
                    {category}
                  </Badge>
                  <Heading
                    color={useColorModeValue("gray.700", "white")}
                    fontSize={"2xl"}
                    fontFamily={"body"}
                  >
                    {title}
                  </Heading>
                  <Text color={"gray.500"} noOfLines={4}>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam erat, sed diam voluptua. At vero eos et accusam et
                    justo duo dolores et ea rebum.
                  </Text>
                </Stack>
                <Stack direction={"row"} justify={"space-between"}>
                  <Stack direction={"row"} spacing={4} align={"center"}>
                    <Avatar
                      src={authorpic}
                      alt={"Author"}
                      position={"-moz-initial"}
                    />
                    <Stack direction={"column"} spacing={0} fontSize={"sm"}>
                      <Text fontWeight={600}>{authorname}</Text>
                      <Text color={"gray.500"}>{createdAt.slice(0, 10)}</Text>
                    </Stack>
                  </Stack>
                  <Stack direction={"row"} align={"center"}>
                    <IconButton
                      icon={<BiLike />}
                      position={"-moz-initial"}
                    ></IconButton>
                    <IconButton
                      icon={<BiComment />}
                      position={"-moz-initial"}
                    ></IconButton>
                    <IconButton
                      icon={<BiShareAlt />}
                      position={"-moz-initial"}
                    ></IconButton>
                  </Stack>
                </Stack>
              </Flex>
            </Box>
          </Flex>
        </Box>
      </Center>
    </>
    // <div className="posts">
    //   <div className="image">
    //     <img src={"http://localhost:4000/" + img} alt="reload"></img>
    //   </div>
    //   <div className="postdescription">{userpost}</div>
    //   <br />
    //   <br />
    // </div>
  );
}
