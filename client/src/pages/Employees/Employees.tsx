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
  FormHelperText,
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

  const [formErrors, setFormErrors] = useState({
    name: "",
    position: "",
    salary: "",
    status: "",
    childs: "",
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

    const validatedValue =
      name === "salary" || name === "childs" ? Number(value) : value;

    let error = "";

    if (
      (name === "name" || name === "position") &&
      typeof validatedValue === "string" &&
      !/^[а-яА-Я\s]+$/.test(validatedValue)
    ) {
      error = "Можно использовать только буквы и пробелы";
    }

    if (
      name === "salary" &&
      typeof validatedValue === "number" &&
      validatedValue <= 0
    ) {
      error = "Зарплата должна быть больше 0";
    }

    setNewEmployee((prev) => ({
      ...prev,
      [name!]: validatedValue,
    }));

    setFormErrors((prev) => ({
      ...prev,
      [name!]: error,
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
      await createEmployee(newEmployee);
      setNewEmployee({
        name: "",
        position: "",
        salary: 0,
        status: "",
        childs: 0,
      });
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
          <FormControl fullWidth margin="normal" error={!!formErrors.name}>
            <TextField
              label="ФИО"
              name="name"
              type="text"
              value={newEmployee.name}
              onChange={handleTextInputChange}
              fullWidth
              margin="normal"
            />
            {formErrors.name && (
              <FormHelperText>{formErrors.name}</FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth margin="normal" error={!!formErrors.position}>
            <TextField
              label="Должность"
              name="position"
              type="text"
              value={newEmployee.position}
              onChange={handleTextInputChange}
              fullWidth
              margin="normal"
            />
            {formErrors.position && (
              <FormHelperText>{formErrors.position}</FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth margin="normal" error={!!formErrors.salary}>
            <TextField
              label="Зарплата"
              name="salary"
              type="number"
              value={newEmployee.salary}
              onChange={handleTextInputChange}
              fullWidth
              margin="normal"
            />
            {formErrors.salary && (
              <FormHelperText>{formErrors.salary}</FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth margin="normal" error={!!formErrors.status}>
            <InputLabel id="status-label">Статус</InputLabel>
            <Select
              labelId="status-label"
              name="status"
              value={newEmployee.status}
              onChange={handleSelectChange}
              fullWidth
            >
              <MenuItem value="Холост">Холост</MenuItem>
              <MenuItem value="Женат">Женат</MenuItem>
              <MenuItem value="Разведен">Разведен</MenuItem>
              <MenuItem value="Вдова/вдовец">Вдова/вдовец</MenuItem>
            </Select>
            {formErrors.status && (
              <FormHelperText>{formErrors.status}</FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth margin="normal" error={!!formErrors.childs}>
            <TextField
              label="Дети"
              name="childs"
              type="number"
              value={newEmployee.childs}
              onChange={handleTextInputChange}
              fullWidth
              margin="normal"
            />
            {formErrors.childs && (
              <FormHelperText>{formErrors.childs}</FormHelperText>
            )}
          </FormControl>
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
