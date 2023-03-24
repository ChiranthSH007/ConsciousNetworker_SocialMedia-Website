import "./App.css";
import AuthPage from "./components/AuthPage";
import { Route, Routes } from "react-router-dom";
import PageFeed from "./components/PageFeed";
import Events from "./components/Events";
import Profile from "./components/Profile";
import Layout from "./components/Layout";
import CreatePost from "./components/uploads/CreatePost";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
      <Route path='/' index element={<AuthPage />}></Route>
      <Route path='/pagefeed' element={<PageFeed/>}></Route>
      <Route path='/events' element={<Events/>}> </Route>
      <Route path='/profile' element={<Profile/>}></Route>
      <Route path='/createpost' element={<CreatePost/>}></Route>
      </Route>
    </Routes>
  );
}

export default App;


/* 
we’re using a fragment (<> ... </>) to wrap the two components. 
This allows us to pass multiple elements as children of the Route without adding any extra DOM elements. 
*/