import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Employees from "./pages/Employees/Employees";
import EmployeeDetail from "./pages/EmployeeDetail/EmployeeDetail";

function App() {
  return (
    <Routes>
      <Route path="/employees" element={<Employees />} />
      <Route path="/employees/:id" element={<EmployeeDetail />} />
    </Routes>
  );
}

export default App;
