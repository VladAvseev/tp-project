import React, { useEffect, useState } from "react";
import { DataGrid, GridRowParams } from "@mui/x-data-grid";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { getEmployees, createEmployee } from "../../api/employee";
import { useNavigate } from "react-router-dom";
import { IEmployee } from "../../interfaces/Employee.interface";

const Employees = () => {
  const [rows, setRows] = useState<IEmployee[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    position: "",
    salary: 0,
    status: "",
    childs: 0,
  });

  const navigate = useNavigate();

  const handleRowClick = (row: IEmployee) => {
    navigate(`/employees/${row.id}`);
  };

  const fetchEmployees = async () => {
    try {
      const data = await getEmployees();
      setRows(data);
    } catch (error) {
      console.error("Error loading employees:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDialogOpen = () => setOpenDialog(true);
  const handleDialogClose = () => setOpenDialog(false);

  const handleTextInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setNewEmployee((prev) => ({
      ...prev,
      [name!]: name === "salary" || name === "childs" ? Number(value) : value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setNewEmployee((prev) => ({
      ...prev,
      [name!]: value,
    }));
  };

  const handleCreateEmployee = async () => {
    try {
      await createEmployee(newEmployee); // Убираем преобразование, данные уже корректного типа
      setNewEmployee({
        name: "",
        position: "",
        salary: 0,
        status: "",
        childs: 0,
      }); // Очищаем поля
      fetchEmployees();
      handleDialogClose();
    } catch (error) {
      console.error("Error creating employee:", error);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.1 },
    { field: "name", headerName: "Имя", flex: 0.2 },
    { field: "position", headerName: "Должность", flex: 0.2 },
    { field: "salary", headerName: "Зарплата", flex: 0.2 },
    { field: "status", headerName: "Статус", flex: 0.2 },
    { field: "childs", headerName: "Дети", flex: 0.1 },
  ];

  return (
    <Container className="p-8 h-screen flex flex-col">
      <Typography variant="h4" gutterBottom>
        Список сотрудников
      </Typography>
      <div className="flex justify-end mb-2">
        <Button variant="contained" color="primary" onClick={handleDialogOpen}>
          Создать
        </Button>
      </div>
      <div className="w-full grow">
        <DataGrid
          rows={rows}
          columns={columns}
          onRowClick={(params: GridRowParams<IEmployee>) =>
            handleRowClick(params.row)
          }
        />
      </div>

      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        sx={{ "& .MuiDialog-paper": { minWidth: 400 } }}
      >
        <DialogTitle>Создать сотрудника</DialogTitle>
        <DialogContent>
          <TextField
            label="ФИО"
            name="name"
            type="text"
            value={newEmployee.name}
            onChange={handleTextInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Должность"
            name="position"
            type="text"
            value={newEmployee.position}
            onChange={handleTextInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Зарплата"
            name="salary"
            type="number"
            value={newEmployee.salary}
            onChange={handleTextInputChange}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="status-label">Статус</InputLabel>
            <Select
              labelId="status-label"
              name="status"
              value={newEmployee.status}
              onChange={handleSelectChange}
            >
              <MenuItem value="Холост">Холост</MenuItem>
              <MenuItem value="Женат">Женат</MenuItem>
              <MenuItem value="Разведен">Разведен</MenuItem>
              <MenuItem value="Вдова/вдовец">Вдова/вдовец</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Дети"
            name="childs"
            type="number"
            value={newEmployee.childs}
            onChange={handleTextInputChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Отменить
          </Button>
          <Button onClick={handleCreateEmployee} color="primary">
            Создать
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Employees;
