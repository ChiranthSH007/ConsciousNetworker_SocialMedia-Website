import "./App.css";
import AuthPage from "./pages/AuthPage";
import { Route, Routes } from "react-router-dom";
import PageFeed from "./components/HomePage";
import Events from "./pages/EventsPage";
import Profile from "./pages/ProfilePage";
import Layout from "./components/Layout";
import CreatePost from "./pages/CreatePostPage";

function App() {
  return (
    <Routes>
      <Route path="/auth" index element={<AuthPage />}></Route>
      <Route path="/" element={<Layout />}>
        <Route path="/pagefeed" element={<PageFeed />}></Route>
        <Route path="/events" element={<Events />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/createpost" element={<CreatePost />}></Route>
      </Route>
    </Routes>
  );
}

export default App;

/* 
we’re using a fragment (<> ... </>) to wrap the two components. 
This allows us to pass multiple elements as children of the Route without adding any extra DOM elements. 
*/
