import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { SiGithub } from "react-icons/si";
import { Box, Button, Center, Image, Stack, Text } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

export default function AuthPage() {
  const toast = useToast();
  const [user, setUser] = useState({}); //make it to global when need to use it ouside
  const [redirect, setRedirect] = useState(false);
  const CLIENT_ID = "daf0a114d4dac5dc9a75";
  async function handleCallbackResponse(response) {
    console.log("Encoded JWT ID Token: " + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("googlesigninDiv").hidden = true;
    axios
      .post(
        "http://localhost:4000/googleauth",
        { userObj: userObject },
        {
          withCredentials: true,
        } //send data to server on 4000 port
      )
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setRedirect(true);
        } else {
          alert("Google Something went wrong");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleSignOut(event) {
    setUser({});
    document.getElementById("googlesigninDiv").hidden = false; //to show the login button after signout
  }

  useEffect(() => {
    /*global google*/
    google.accounts.id.initialize({
      client_id:
        "114967761590-cnoplbn3sqo1art2auetnuffsbeglloe.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(
      document.getElementById("googlesigninDiv"),
      {
        theme: "filled_blue",
        width: "500px",
      }
    );

    // google.accounts.id.prompt();

    //Github OAuth Code
    //if code param exists just call getGitAccessTokenUserdata
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get("code");
    console.log(codeParam);

    if (codeParam) {
      async function getAccessToken() {
        await axios
          .get(
            "http://localhost:4000/getGitAccessTokenUserdata?code=" + codeParam,
            {
              withCredentials: true,
            }
          )
          .then((response) => {
            console.log(response);
            if (response.status === 200) {
              toast({
                title: "Account created.",
                description: "We've created your account for you.",
                status: "success",
                duration: 5000,
                isClosable: true,
              });
              setTimeout(() => {
                setRedirect(true);
              }, 2000);
            } else {
              alert("GitHub Something went wrong");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
      getAccessToken();
    }
  }, []);

  if (redirect) {
    return <Navigate to={"/pagefeed"} />;
  }

  function loginwithGithub() {
    window.location.assign(
      "https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID
    );
  }
  return (
    <Box>
      <Center>
        <Stack direction={"column"} pt={"50px"} align={"center"}>
          <Image
            src="./logonameblack.png"
            h={"70px"}
            w={"200px"}
            alt="logo_image"
          ></Image>
          <Stack
            direction={"row"}
            pt={"100px"}
            pr={"100px"}
            align={"center"}
            spacing={700}
          >
            <Image
              m={"auto"}
              src="./undraw_secure_login_pdn4.png"
              h={"450px"}
              w={"520px"}
              alt="logo_image"
            ></Image>
            boxShadow={"2xl"}
            <Box
              w={"500px"}
              bgColor={"#3f3d56"}
              h={"300px"}
              rounded={"lg"}
              boxShadow={"2xl"}
            >
              <Stack direction={"column"} p={"30px"} spacing={50}>
                <Text fontWeight={"bold"} fontSize={"30px"} color={"white"}>
                  Login/SignUp
                </Text>
                <Stack spacing={2} align={"center"} w={"full"}>
                  <div id="googlesigninDiv" className="googleButton"></div>

                  <Button
                    w={"400px"}
                    onClick={loginwithGithub}
                    colorScheme={"gray"}
                    leftIcon={<SiGithub />}
                  >
                    <Text>Send to Github</Text>
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Stack>
      </Center>
    </Box>
    // <div className="authdiv">
    //   <h1>Authentication Page</h1>
    //   <div id="googlesigninDiv"></div>
    //   {/* {Object.keys(user).length !== 0 && (
    //     <button onClick={(e) => handleSignOut(e)}>Signout</button>
    //   )}
    //   {user && (
    //     <div>
    //       <img src={user.picture}></img>
    //       <h3>{user.name}</h3>
    //     </div>
    //   )} */}
    //   <div className="gitSignindiv">
    //     <button onClick={loginwithGithub}>Login with Github</button>
    //   </div>
    // </div>
  );
}
