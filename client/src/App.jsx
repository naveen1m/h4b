import { Button } from "@mantine/core";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Room from "./pages/Room";
import Hero from "./pages/Hero";
import Login from "./pages/Login";


const App = () => {


  return (
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/room/:roomID" element={<Room />} />
      <Route path="/register" element={<PateintForm />} />
    </Routes>
  );

}

export default App;
