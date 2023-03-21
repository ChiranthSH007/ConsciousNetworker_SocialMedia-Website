import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode"
import axios from 'axios';

export default function AuthPage(){
    
    const [ user, setUser] = useState({}); //make it to global when need to use it ouside 
    async function handleCallbackResponse(response){
      console.log("Encoded JWT ID Token: "+response.credential);
      var userObject = jwt_decode(response.credential);
      console.log(userObject);
      setUser(userObject);
      document.getElementById("signinDiv").hidden = true;
      axios.post('http://localhost:4000/googleauth', { username:userObject.name,email:userObject.email },//send data to server on 4000 port 
      ).then(response => {
        console.log(response);
        })
        .catch(err => {
            console.log(err);
        })
   }
  
    function handleSignOut(event){
      setUser({});
      document.getElementById("signinDiv").hidden = false; //to show the login button after signout
    }
  
    useEffect(() => {
  
      /*global google*/
      google.accounts.id.initialize({
        client_id: "114967761590-cnoplbn3sqo1art2auetnuffsbeglloe.apps.googleusercontent.com",
        callback: handleCallbackResponse
      });
  
      google.accounts.id.renderButton(
        document.getElementById("signinDiv"),
        {theme: "filled_blue", size:"large"}
      );
  
      google.accounts.id.prompt()
    }, []);
  
  
    return <div class="authdiv">
        <h1>Authentication Page</h1>
        <div id='signinDiv'></div>
        {
          Object.keys(user).length !== 0 &&
          <button onClick={(e) => handleSignOut(e)}>Signout</button>
        }
          { user &&
            <div>
              <img src={user.picture}></img>
              <h3>{user.name}</h3>
            </div>
          }
    </div>
}