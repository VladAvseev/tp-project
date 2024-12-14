import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { ILeave } from "../interfaces/Leave.interface";
import { addLeave, getLeavesByEmployee, deleteLeave } from "../api/leave";

interface EmployeeLeavesProps {
  employeeId: string;
  leaves: ILeave[];
  setLeaves: React.Dispatch<React.SetStateAction<ILeave[]>>;
}

const EmployeeLeaves: React.FC<EmployeeLeavesProps> = ({
  employeeId,
  leaves,
  setLeaves,
}) => {
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  const [newLeave, setNewLeave] = React.useState({
    dateStart: "",
    dateFinish: "",
  });

  const handleDialogOpen = () => setOpenDialog(true);
  const handleDialogClose = () => setOpenDialog(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewLeave({ ...newLeave, [name]: value });
  };

  const handleAddLeave = async () => {
    try {
      const formattedLeave = {
        dateStart: `${newLeave.dateStart}T12:00:00`,
        dateFinish: `${newLeave.dateFinish}T12:00:00`,
      };

      await addLeave({ ...formattedLeave, employeeId });
      const updatedLeaves = await getLeavesByEmployee(employeeId);
      setLeaves(updatedLeaves);
      handleDialogClose();
    } catch (error) {
      console.error("Error adding leave:", error);
    }
  };

  const handleDeleteLeave = async (id: string) => {
    try {
      await deleteLeave(id);
      const updatedLeaves = await getLeavesByEmployee(employeeId);
      setLeaves(updatedLeaves);
    } catch (error) {
      console.error("Error deleting leave:", error);
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
    {
      field: "actions",
      headerName: "Действия",
      flex: 0.3,
      sortable: false,
      renderCell: (params) => (
        <IconButton
          color="error"
          onClick={() => handleDeleteLeave(String(params.row.id))}
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-end">
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
        sx={{ "& .MuiDialog-paper": { minWidth: 400 } }}
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
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Дата конца"
            name="dateFinish"
            type="date"
            value={newLeave.dateFinish}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
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
  );
};

export default EmployeeLeaves;
