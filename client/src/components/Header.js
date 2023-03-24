import axios from "axios";
import { useEffect, useState } from "react";

export default function Header() {
  const [username, setUsername] = useState(null);
  useEffect(() => {
    async function fetchData() {
      await axios
        .get("http://localhost:4000/profile", {
          withCredentials: true,
        })
        .then((response) => {
          //console.log(response.data.uname);
          setUsername(response.data.uname);
        });
    }
    fetchData();
  }, []);

  function logout() {
    axios
      .post("http://localhost:4000/logout", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
      });
  }
  return (
    <div>
      <ul>
        <li>
          <a href="#home">Home</a>
        </li>
        <li>
          <a href="#news">News</a>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
        <li id="li1">
          <a classNme="active" href="#about">
            {username}
          </a>
        </li>
        <li id="li1">
          <button onClick={logout()}>Logout</button>
        </li>
      </ul>
    </div>
  );
}