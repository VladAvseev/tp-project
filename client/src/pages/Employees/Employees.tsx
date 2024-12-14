import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Container, Typography } from "@mui/material";
import { getEmployees } from "../../api/employee";

const Employees = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getEmployees();
        setRows(data);
      } catch (error) {
        console.error("Error loading employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Имя", width: 150 },
    { field: "position", headerName: "Должность", width: 150 },
    { field: "salary", headerName: "Зарплата", width: 150 },
    { field: "status", headerName: "Статус", width: 150 },
    { field: "childs", headerName: "Дети", width: 150 },
  ];

  return (
    <Container className="p-8 h-screen flex flex-col">
      <Typography variant="h4" gutterBottom>
        Список сотрудников
      </Typography>
      <div className="w-full grow">
        <DataGrid rows={rows} columns={columns} />
      </div>
    </Container>
  );
};

export default Employees;
