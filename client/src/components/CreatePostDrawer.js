import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Stack,
  Box,
  Textarea,
  FormLabel,
  Select,
  Input,
  FormControl,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

export default function CreatePostDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();
  const [files, setfiles] = useState("");
  const [title, settitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");

  const [redirect, setredirect] = useState("");
  //   const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  //   const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [userName, setUserName] = useState(null);
  const [userPic, setUserPic] = useState(null);

  useEffect(() => {
    async function fetchData() {
      await axios
        .get("http://localhost:4000/profile", {
          withCredentials: true,
        })
        .then((response) => {
          if (response.data != null) {
            setUserPic(response.data.upic);
            setUserName(response.data.uname);
          }
        });
    }
    fetchData();
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setfiles(base64);
  };
  async function createNewPost(ev) {
    // const data = new FormData();
    // data.set("title", title);
    // data.set("imageFile", files);
    ev.preventDefault();

    axios
      .post(
        "http://localhost:4000/newpost",
        {
          title: title,
          desc: desc,
          categ: category,
          authorname: userName,
          authorpic: userPic,
          image: files,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          console.log("Uploaded");
          setTimeout(() => {
            onClose();
          }, 5000);
        } else {
        }
      })
      .catch((err) => {
        console.log(err);
      });
    //   const resp = await fetch("http://localhost:4000/newpost", {
    //     method: "POST",
    //     body: data,
    //     credentials: "include",
    //   });
    //   if (resp.ok) {
    //     setShowSuccessAlert(true);
    //     setTimeout(() => {
    //       setredirect(true);
    //     }, 5000);
    //   } else {
    //     setShowErrorAlert(true);
    //   }
  }

  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileRead = new FileReader();
      fileRead.readAsDataURL(file);
      fileRead.onload = () => {
        resolve(fileRead.result);
      };
      fileRead.onerror = (error) => {
        reject(error);
      };
    });
  }

  return (
    <>
      <Button variant={"solid"} colorScheme="green" onClick={onOpen}>
        Create New Post
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
        size={"md"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Create New Post</DrawerHeader>

          <DrawerBody>
            <FormControl onSubmit={createNewPost} isRequired>
              <Stack spacing="24px">
                <Box>
                  <FormLabel htmlFor="username" fontWeight={650}>
                    Post Title
                  </FormLabel>
                  <Input
                    value={title}
                    ref={firstField}
                    id="title"
                    placeholder="Enter the Post Title"
                    onChange={(ev) => settitle(ev.target.value)}
                  />
                </Box>
                <Box>
                  <FormLabel htmlFor="desc" fontWeight={650}>
                    Description
                  </FormLabel>
                  <Textarea
                    value={desc}
                    id="desc"
                    h={"300px"}
                    onChange={(ev) => setDesc(ev.target.value)}
                  />
                </Box>

                <Box>
                  <FormLabel htmlFor="category" fontWeight={650}>
                    Category
                  </FormLabel>
                  <Select
                    placeholder="Select Category"
                    value={category}
                    id="owner"
                    onChange={(ev) => setCategory(ev.target.value)}
                  >
                    <option value="segun">Segun Adebayo</option>
                    <option value="kola">Kola Tioluwani</option>
                    <option value="kola">Kola Tioluwani</option>
                    <option value="kola">Kola Tioluwani</option>
                    <option value="kola">Kola Tioluwani</option>
                    <option value="kola">Kola Tioluwani</option>
                    <option value="kola">Kola Tioluwani</option>
                  </Select>
                </Box>
                <Box>
                  <FormLabel htmlFor="img" fontWeight={650}>
                    Image
                  </FormLabel>
                  <Input type="file" onChange={(ev) => handleFileUpload(ev)} />
                </Box>
              </Stack>
            </FormControl>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button
              variant={"solid"}
              colorScheme={"red"}
              mr={3}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              variant={"solid"}
              colorScheme={"green"}
              onClick={createNewPost}
            >
              Submit
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
