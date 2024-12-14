import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { IPayment } from "../interfaces/Payment.interface";
import {
  createPayment,
  getPaymentsByEmployee,
  deletePayment,
} from "../api/payment";

interface EmployeePaymentsProps {
  payments: IPayment[];
  setPayments: React.Dispatch<React.SetStateAction<IPayment[]>>;
  employeeId: string;
}

const EmployeePayments: React.FC<EmployeePaymentsProps> = ({
  payments,
  setPayments,
  employeeId,
}) => {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [newPayment, setNewPayment] = React.useState({
    dateStart: "",
    dateFinish: "",
  });

  const handleDialogOpen = () => setOpenDialog(true);
  const handleDialogClose = () => setOpenDialog(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPayment({ ...newPayment, [name]: value });
  };

  const handleAddPayment = async () => {
    try {
      const formattedPayment = {
        dateStart: `${newPayment.dateStart}T12:00:00`,
        dateFinish: `${newPayment.dateFinish}T12:00:00`,
        employeeId: Number(employeeId),
      };

      await createPayment(formattedPayment);
      const updatedPayments = await getPaymentsByEmployee(employeeId);
      setPayments(updatedPayments);
      handleDialogClose();
    } catch (error) {
      console.error("Error adding payment:", error);
    }
  };

  const paymentsColumns: GridColDef<IPayment>[] = [
    { field: "employeeid", headerName: "Employee ID", flex: 0.2 },
    {
      field: "datestart",
      headerName: "Дата начала",
      flex: 0.3,
      renderCell: ({ value }) => new Date(value).toLocaleDateString("ru-RU"),
    },
    {
      field: "datefinish",
      headerName: "Дата конца",
      flex: 0.3,
      renderCell: ({ value }) => new Date(value).toLocaleDateString("ru-RU"),
    },
    {
      field: "value",
      headerName: "Сумма",
      flex: 0.2,
      renderCell: ({ value }) => `${value.toLocaleString("ru-RU")} ₽`,
    },
    {
      field: "workdays",
      headerName: "Рабочие дни",
      flex: 0.15,
    },
    {
      field: "sickleavedays",
      headerName: "Больничные дни",
      flex: 0.15,
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

      <DataGrid rows={payments} columns={paymentsColumns} autoHeight />

      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        sx={{ "& .MuiDialog-paper": { minWidth: 400 } }}
      >
        <DialogTitle>Добавить выплату</DialogTitle>
        <DialogContent>
          <TextField
            label="Дата начала"
            name="dateStart"
            type="date"
            value={newPayment.dateStart}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Дата конца"
            name="dateFinish"
            type="date"
            value={newPayment.dateFinish}
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
          <Button onClick={handleAddPayment} color="primary">
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EmployeePayments;
