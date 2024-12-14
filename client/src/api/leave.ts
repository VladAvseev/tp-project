import axios from "../services/api";
import { ILeave } from "../interfaces/Leave.interface";

export const getLeavesByEmployee = async (id: string) => {
  try {
    const response = await axios.post<ILeave[]>("/api/leave/get_by_employee", {
      employeeId: id,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
};

export const addLeave = async (leave: {
  dateStart: string;
  dateFinish: string;
  employeeId: string;
}) => {
  try {
    const response = await axios.post<ILeave>("/api/leave/create", leave);
    return response.data;
  } catch (error) {
    console.error("Error adding leave:", error);
    throw error;
  }
};

export const deleteLeave = async (id: string) => {
  try {
    const response = await axios.post(`/api/leave/delete`, { id });
    return response.data;
  } catch (error) {
    console.error("Error deleting leave:", error);
  }
};
