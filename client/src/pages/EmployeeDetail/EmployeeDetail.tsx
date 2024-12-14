import React from "react";
import { useParams } from "react-router-dom";
import { getEmployeeById } from "../../api/employee";
import { getLeavesByEmployee } from "../../api/leave";
import { Container, Typography, Tabs, Tab } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ILeave } from "../../interfaces/Leave.interface";
import { IEmployee } from "../../interfaces/Employee.interface";

const EmployeeDetail = () => {
  const { id } = useParams();
  const [employee, setEmployee] = React.useState<IEmployee | null>(null);
  const [leaves, setLeaves] = React.useState<ILeave[]>([]);
  const [value, setValue] = React.useState<number>(0);

  React.useEffect(() => {
    const fetchEmployee = async () => {
      try {
        if (!id) return;
        const data = await getEmployeeById(id);
        const leavesData = await getLeavesByEmployee(id);
        setEmployee(data);
        setLeaves(leavesData);
      } catch (error) {
        console.error("Error loading employee details:", error);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const leavesColumns: GridColDef<ILeave>[] = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.2,
    },
    {
      field: "datestart",
      headerName: "Начало",
      flex: 0.4,
      renderCell: ({ value }) => new Date(value).toLocaleDateString("ru-RU"),
    },
    {
      field: "datefinish",
      headerName: "Конец",
      flex: 0.4,
      renderCell: ({ value }) => new Date(value).toLocaleDateString("ru-RU"),
    },
  ];

  if (!employee) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="p-8 h-screen">
      <Typography variant="h4" gutterBottom>
        Детальная информация о сотруднике
      </Typography>

      <Typography variant="h6">{employee.name}</Typography>
      <Typography variant="body1">Должность: {employee.position}</Typography>
      <Typography variant="body1">Зарплата: {employee.salary}</Typography>
      <Typography variant="body1">Статус: {employee.status}</Typography>
      <Typography variant="body1">Дети: {employee.childs}</Typography>

      <Tabs value={value} onChange={handleChange} aria-label="employee tabs">
        <Tab label="Больничные" />
        <Tab label="Премии" />
        <Tab label="Отчеты о выплатах" />
        <Tab label="Редактировать" />
      </Tabs>

      {value === 0 && (
        <div>
          <DataGrid rows={leaves} columns={leavesColumns} />
        </div>
      )}
      {value === 1 && <div>Данные по премиям</div>}
      {value === 2 && <div>Данные об отчетах о выплатах</div>}
      {value === 3 && (
        <div>
          <Typography variant="body1">Редактировать информацию</Typography>
          <form>{/* форма для редактирования */}</form>
        </div>
      )}
    </Container>
  );
};

export default EmployeeDetail;
