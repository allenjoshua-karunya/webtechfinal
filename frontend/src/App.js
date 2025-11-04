import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Adopt from "./pages/Adopt";
import MyPets from "./pages/MyPets";
import AdminDashboard from "./pages/AdminDashboard";
import UserHome from "./pages/UserHome";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/adopt" element={<Adopt />} />
        <Route path="/mypets" element={<MyPets />} />
        <Route path="/userhome" element={<UserHome />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
