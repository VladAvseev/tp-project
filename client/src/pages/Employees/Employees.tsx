import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Container, Typography } from "@mui/material";

const Employees = () => {
  const rows = [
    { id: 1, name: "John Doe", position: "Manager", department: "Sales" },
    { id: 2, name: "Jane Smith", position: "Developer", department: "IT" },
    {
      id: 3,
      name: "Alice Brown",
      position: "Designer",
      department: "Marketing",
    },
    {
      id: 3,
      name: "Alice Brown",
      position: "Designer",
      department: "Marketing",
    },
    {
      id: 3,
      name: "Alice Brown",
      position: "Designer",
      department: "Marketing",
    },
    {
      id: 3,
      name: "Alice Brown",
      position: "Designer",
      department: "Marketing",
    },
    {
      id: 3,
      name: "Alice Brown",
      position: "Designer",
      department: "Marketing",
    },
    {
      id: 3,
      name: "Alice Brown",
      position: "Designer",
      department: "Marketing",
    },
    {
      id: 3,
      name: "Alice Brown",
      position: "Designer",
      department: "Marketing",
    },
    {
      id: 3,
      name: "Alice Brown",
      position: "Designer",
      department: "Marketing",
    },
    {
      id: 3,
      name: "Alice Brown",
      position: "Designer",
      department: "Marketing",
    },
  ];

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "position", headerName: "Position", width: 150 },
    { field: "department", headerName: "Department", width: 150 },
  ];

  return (
    <Container className="p-8 h-screen">
      <Typography variant="h4" gutterBottom>
        Список сотрудников
      </Typography>
      <div className="w-full">
        <DataGrid rows={rows} columns={columns} />
      </div>
    </Container>
  );
};

export default Employees;
