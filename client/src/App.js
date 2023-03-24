import "./App.css";
import AuthPage from "./components/AuthPage";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Header />}></Route>
      <Route path="/auth" element={<AuthPage />}></Route>
    </Routes>
  );
}

export default App;
