import axios from "../services/api";
import { IPayment } from "../interfaces/Payment.interface";

export const getPaymentsByEmployee = async (id: string) => {
  try {
    const response = await axios.post<IPayment[]>(
      "/api/payment/get_by_employee",
      {
        employeeId: id,
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
};

export const createPayment = async (payment: {
  dateStart: string;
  dateFinish: string;
  employeeId: string;
}) => {
  try {
    const response = await axios.post<IPayment>("/api/payment/create", payment);
    return response.data;
  } catch (error) {
    console.error("Error adding payment:", error);
    throw error;
  }
};