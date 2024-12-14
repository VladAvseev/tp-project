import React from "react";
import { useParams } from "react-router-dom";
import { getEmployeeById } from "../../api/employee";
import { getLeavesByEmployee, addLeave } from "../../api/leave";
import {
  Container,
  Typography,
  Tabs,
  Tab,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ILeave } from "../../interfaces/Leave.interface";
import { IEmployee } from "../../interfaces/Employee.interface";

const EmployeeDetail = () => {
  const { id } = useParams();
  const [employee, setEmployee] = React.useState<IEmployee | null>(null);
  const [leaves, setLeaves] = React.useState<ILeave[]>([]);
  const [value, setValue] = React.useState<number>(0);
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  const [newLeave, setNewLeave] = React.useState({
    dateStart: "",
    dateFinish: "",
  });

  React.useEffect(() => {
    const fetchEmployee = async () => {
      try {
        if (!id) return;
        const data = await getEmployeeById(id);
        const leavesData = await getLeavesByEmployee(id);
        setEmployee(data);
        setLeaves(leavesData);
        console.log(leavesData);
      } catch (error) {
        console.error("Error loading employee details:", error);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewLeave({ ...newLeave, [name]: value });
  };

  const handleAddLeave = async () => {
    try {
      if (!id) return;

      const formattedLeave = {
        dateStart: `${newLeave.dateStart}T00:00:00`,
        dateFinish: `${newLeave.dateFinish}T00:00:00`,
      };

      await addLeave({ ...formattedLeave, employeeId: id });
      const updatedLeaves = await getLeavesByEmployee(id);
      setLeaves(updatedLeaves);
      handleDialogClose();
    } catch (error) {
      console.error("Error adding leave:", error);
    }
  };

  const leavesColumns: GridColDef<ILeave>[] = [
    { field: "id", headerName: "ID", flex: 0.2 },
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
          <div className={"flex justify-end"}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleDialogOpen}
              sx={{ mb: 2 }}
            >
              Добавить
            </Button>
          </div>

          <DataGrid rows={leaves} columns={leavesColumns} />
          <Dialog
            open={openDialog}
            onClose={handleDialogClose}
            sx={{
              "& .MuiDialog-paper": {
                minWidth: 400,
              },
            }}
          >
            <DialogTitle>Добавить больничный</DialogTitle>
            <DialogContent>
              <TextField
                label="Дата начала"
                name="dateStart"
                type="date"
                value={newLeave.dateStart}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                label="Дата конца"
                name="dateFinish"
                type="date"
                value={newLeave.dateFinish}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose} color="secondary">
                Отменить
              </Button>
              <Button onClick={handleAddLeave} color="primary">
                Сохранить
              </Button>
            </DialogActions>
          </Dialog>
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
