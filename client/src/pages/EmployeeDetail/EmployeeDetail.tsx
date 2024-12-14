import React from "react";
import { useParams } from "react-router-dom";
import { getEmployeeById } from "../../api/employee";
import {
  Container,
  Typography,
  Tabs,
  Tab,
  TextField,
  Button,
} from "@mui/material";
import { IEmployee } from "../../interfaces/Employee";

const EmployeeDetail = () => {
  const { id } = useParams();
  const [employee, setEmployee] = React.useState<IEmployee | null>(null);
  const [value, setValue] = React.useState<number>(0);

  React.useEffect(() => {
    const fetchEmployee = async () => {
      try {
        if (!id) return;
        const data = await getEmployeeById(id);
        setEmployee(data);
      } catch (error) {
        console.error("Error loading employee details:", error);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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

      {/* Вкладки */}
      <Tabs value={value} onChange={handleChange} aria-label="employee tabs">
        <Tab label="Больничные" />
        <Tab label="Премии" />
        <Tab label="Отчеты о выплатах" />
        <Tab label="Редактировать" />
      </Tabs>

      {/* Контент вкладок */}
      {value === 0 && <div>Данные по больничным</div>}
      {value === 1 && <div>Данные по премиям</div>}
      {value === 2 && <div>Данные об отчетах о выплатах</div>}
      {value === 3 && (
        <div>
          <Typography variant="body1">Редактировать информацию</Typography>
          <form>
            <TextField
              label="Имя"
              name="name"
              value={employee.name || ""}
              fullWidth
              margin="normal"
              disabled
            />
            <TextField
              label="Должность"
              name="position"
              value={employee.position || ""}
              fullWidth
              margin="normal"
              disabled
            />
            <TextField
              label="Зарплата"
              name="salary"
              value={employee.salary || ""}
              fullWidth
              margin="normal"
              disabled
            />
            <TextField
              label="Статус"
              name="status"
              value={employee.status || ""}
              fullWidth
              margin="normal"
              disabled
            />
            <TextField
              label="Дети"
              name="childs"
              value={employee.childs || ""}
              fullWidth
              margin="normal"
              disabled
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Сохранить изменения
            </Button>
          </form>
        </div>
      )}
    </Container>
  );
};

export default EmployeeDetail;
