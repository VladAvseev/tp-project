import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { IBonus } from "../interfaces/Bonus.interface";
import { addBonus, deleteBonus, getBonusesByEmployee } from "../api/bonus";

interface EmployeeBonusesProps {
  employeeId: string;
  bonuses: IBonus[];
  setBonuses: React.Dispatch<React.SetStateAction<IBonus[]>>;
}

const EmployeeBonuses: React.FC<EmployeeBonusesProps> = ({
  employeeId,
  bonuses,
  setBonuses,
}) => {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [newBonusValue, setNewBonusValue] = React.useState("");

  const handleDialogOpen = () => setOpenDialog(true);
  const handleDialogClose = () => setOpenDialog(false);

  const handleAddBonus = async () => {
    try {
      const today = new Date().toISOString();
      const newBonus = {
        employeeId,
        value: parseInt(newBonusValue, 10),
        date: today,
      };
      await addBonus(newBonus);
      const updatedBonuses = await getBonusesByEmployee(employeeId);
      setBonuses(updatedBonuses);
      handleDialogClose();
    } catch (error) {
      console.error("Error adding bonus:", error);
    }
  };

  const handleDeleteBonus = async (id: number) => {
    try {
      await deleteBonus(String(id));
      const updatedBonuses = await getBonusesByEmployee(employeeId);
      setBonuses(updatedBonuses);
    } catch (error) {
      console.error("Error deleting bonus:", error);
    }
  };

  const bonusesColumns: GridColDef<IBonus>[] = [
    { field: "id", headerName: "ID", flex: 0.2 },
    {
      field: "date",
      headerName: "Дата",
      flex: 0.4,
      renderCell: ({ value }) => new Date(value).toLocaleDateString("ru-RU"),
    },
    {
      field: "value",
      headerName: "Сумма",
      flex: 0.4,
      renderCell: ({ value }) => `${value.toLocaleString("ru-RU")} ₽`,
    },
    {
      field: "actions",
      headerName: "Действия",
      flex: 0.3,
      sortable: false,
      renderCell: (params) => (
        <IconButton
          color="error"
          onClick={() => handleDeleteBonus(params.row.id)}
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

      <DataGrid rows={bonuses} columns={bonusesColumns} autoHeight />

      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        sx={{ "& .MuiDialog-paper": { minWidth: 400 } }}
      >
        <DialogTitle>Добавить премию</DialogTitle>
        <DialogContent>
          <TextField
            label="Сумма"
            type="number"
            value={newBonusValue}
            onChange={(e) => setNewBonusValue(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Отменить
          </Button>
          <Button
            onClick={handleAddBonus}
            color="primary"
            disabled={!newBonusValue}
          >
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EmployeeBonuses;
