import React from "react";
import { useParams } from "react-router-dom";
import { getEmployeeById, updateEmployee } from "../../api/employee";
import { getLeavesByEmployee } from "../../api/leave";
import {
  Container,
  Typography,
  Tabs,
  Tab,
  TextField,
  Button,
} from "@mui/material";
import { ILeave } from "../../interfaces/Leave.interface";
import { IEmployee } from "../../interfaces/Employee.interface";
import EmployeeLeaves from "../../components/EmployeeLeaves";
import { getBonusesByEmployee } from "../../api/bonus";
import EmployeeBonuses from "../../components/EmployeeBonuses";
import { IBonus } from "../../interfaces/Bonus.interface";
import { getPaymentsByEmployee } from "../../api/payment";
import EmployeePayments from "../../components/EmployeePayments";
import { IPayment } from "../../interfaces/Payment.interface";

const EmployeeDetail = () => {
  const { id } = useParams();
  const [employee, setEmployee] = React.useState<IEmployee | null>(null);
  const [leaves, setLeaves] = React.useState<ILeave[]>([]);
  const [bonuses, setBonuses] = React.useState<IBonus[]>([]);
  const [payments, setPayments] = React.useState<IPayment[]>([]);
  const [value, setValue] = React.useState<number>(0);
  const [formValues, setFormValues] = React.useState<IEmployee | null>(null);

  React.useEffect(() => {
    const fetchEmployee = async () => {
      try {
        if (!id) return;
        const data = await getEmployeeById(id);
        const leavesData = await getLeavesByEmployee(id);
        const bonusesData = await getBonusesByEmployee(id);
        const paymentsData = await getPaymentsByEmployee(id);
        setEmployee(data);
        setLeaves(leavesData);
        setBonuses(bonusesData);
        setPayments(paymentsData);
        setFormValues(data); // Устанавливаем начальные значения формы
      } catch (error) {
        console.error("Error loading employee details:", error);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev!,
      [name]: name === "salary" || name === "childs" ? Number(value) : value,
    }));
  };

  const handleUpdateEmployee = async () => {
    try {
      if (formValues) {
        await updateEmployee({ ...formValues, id: String(formValues.id) });
        setEmployee(formValues);
      }
    } catch (error) {
      console.error("Error updating employee:", error);
    }
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

      <Tabs value={value} onChange={handleChange} aria-label="employee tabs">
        <Tab label="Больничные" />
        <Tab label="Премии" />
        <Tab label="Отчеты о выплатах" />
        <Tab label="Редактировать" />
      </Tabs>

      {value === 0 && (
        <EmployeeLeaves
          employeeId={id!}
          leaves={leaves}
          setLeaves={setLeaves}
        />
      )}
      {value === 1 && (
        <EmployeeBonuses
          setBonuses={setBonuses}
          bonuses={bonuses}
          employeeId={id!}
        />
      )}
      {value === 2 && (
        <EmployeePayments
          setPayments={setPayments}
          payments={payments}
          employeeId={id!}
        />
      )}
      {value === 3 && (
        <div>
          <Typography variant="body1">Редактировать информацию</Typography>
          <form>
            <TextField
              label="ФИО"
              name="name"
              value={formValues?.name || ""}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Должность"
              name="position"
              value={formValues?.position || ""}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Зарплата"
              name="salary"
              value={formValues?.salary || ""}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              type="number"
            />
            <TextField
              label="Статус"
              name="status"
              value={formValues?.status || ""}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Дети"
              name="childs"
              value={formValues?.childs || ""}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              type="number"
            />
            <Button onClick={handleUpdateEmployee} color="primary">
              Обновить
            </Button>
          </form>
        </div>
      )}
    </Container>
  );
};

export default EmployeeDetail;
