import { Button } from "@mantine/core";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Room from "./pages/Room";
import Hero from "./pages/Hero";
import PatientForm from "./pages/PatientForm";
import Register from "./pages/Register";

const App = () => {


  return (
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/room/:roomID" element={<Room />} />
      <Route path="/patientregister" element={<PatientForm />} />
      <Route path="/register" element={<Register />} />

    </Routes>
  );

}

export default App;
