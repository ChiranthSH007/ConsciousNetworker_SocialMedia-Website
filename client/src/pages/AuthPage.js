import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { SiGithub } from "react-icons/si";
import { Box, Button, Center, Stack, Text } from "@chakra-ui/react";

export default function AuthPage() {
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
              setRedirect(true);
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
      <Center p={8}>
        <Stack spacing={2} align={"center"} maxW={"md"} w={"full"}>
          <div id="googlesigninDiv" className="googleButton"></div>
          {/* Google */}
          {/* <Button
            w={"full"}
            variant={"outline"}
            leftIcon={<FcGoogle />}
            onClick={handleCallbackResponse}
          >
            <Center>
              <Text>Sign in with Google</Text>
            </Center>
          </Button> */}
          {/* Messenger */}
          <Button
            w={"full"}
            onClick={loginwithGithub}
            colorScheme={"gray"}
            leftIcon={<SiGithub />}
          >
            <Text>Send to Github</Text>
          </Button>
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
