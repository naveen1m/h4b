import { Button } from "@mantine/core";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Room from "./pages/Room";
import Hero from "./pages/Hero";
import PatientForm from "./pages/PatientForm";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/room/:roomID" element={<Room />} />
      <Route path="/register" element={<PatientForm />} />
    </Routes>
  );

}

export default App;
