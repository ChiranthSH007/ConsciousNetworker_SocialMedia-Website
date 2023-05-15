import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { SiFacebook, SiGithub, SiLinkedin } from "react-icons/si";
import {
  Box,
  Button,
  Center,
  Grid,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

export default function AuthPage() {
  const toast = useToast();
  const [user, setUser] = useState({}); //make it to global when need to use it ouside
  const [redirect, setRedirect] = useState(false);
  const CLIENT_ID = "daf0a114d4dac5dc9a75";
  const client_id = "86a0mhak6rvp60";
  const client_secret = "GQb2YUCnx7OfSPzT";
  const accessToken =
    "AQWfhGIYSpqJb-E5HEzc4jZFQwBOsTKCtQBEbzZYaRBwSxIYTrQzN1g5Y_GUrZckScilbtFAIP1lDxYj0ugjZYRS62waZNJVaj1NiV2gkEh3GR4VHHUiFB64jl51bFEJw6bb1YfMtryGXtlr8yxsCrWFaosNSg60sED9JxmYmvv4OmHovb3llYAC9e5YeC7BM7gtt8An0oDRGGkaET9l-5MnYl4FcbRwa0b2Mt422IlLjP-MnBWHlUwAITD3ceyul9UxMij5wkembPAZ4I19BIbGg2jqp5nqcDRVumTdjGqVSEwM00VI8YwBrXCEQGy4UPeWmdKPnMH0QHnUtWkppkewsJ9ghg";

  async function handleCallbackResponse(response) {
    console.log("Encoded JWT ID Token: " + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("googlesigninDiv").hidden = true;
    axios
      .post(
        "http://localhost:4000/googleauth",
        { userObj: userObject, access_token: response.credential },
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
                status: "loading",
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
  const responseFacebook = (response) => {
    console.log(response);
    axios
      .post(
        "http://localhost:4000/facebookauth",
        { userObj: response },
        {
          withCredentials: true,
        } //send data to server on 4000 port
      )
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setRedirect(true);
        } else {
          alert("Facebook Something went wrong");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  async function LoginwithLinkedin() {
    const authUrl =
      "https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=" +
      client_id +
      "&redirect_uri=http://localhost:3000/pagefeed&state=football&scope=r_liteprofile%20r_emailaddress";
    await axios
      .get("http://localhost:4000/linkedinauth")
      .then((response) => {
        console.log(response);
        window.location.href = authUrl;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function loginwithGithub() {
    window.location.assign(
      "https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID
    );
  }
  function HomeRoute() {
    window.location.href = "/";
  }
  return (
    <Box>
      <Center>
        <Grid templateColumns="repeat(5, 1fr)" gap={3}></Grid>
        <Stack direction={"column"} pt={"50px"} align={"center"}>
          <Image
            onClick={HomeRoute}
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
              h={"400px"}
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
                    <Text>Github</Text>
                  </Button>
                  <Button
                    w={"400px"}
                    onClick={LoginwithLinkedin}
                    colorScheme={"blue"}
                    leftIcon={<SiLinkedin />}
                  >
                    <Text>LinkedIn</Text>
                  </Button>
                  <FacebookLogin
                    appId="603052405152675"
                    autoLoad={true}
                    fields="name,email,picture"
                    callback={responseFacebook}
                    render={(renderProps) => (
                      <Button
                        w={"400px"}
                        colorScheme={"blue"}
                        onClick={renderProps.onClick}
                        leftIcon={<SiFacebook />}
                      >
                        <Text>Facebook</Text>
                      </Button>
                    )}
                  />
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Stack>
      </Center>
    </Box>
  );
}
