import axios from "../services/api";
import { IEmployee } from "../interfaces/Employee";

export const getEmployees = async () => {
  try {
    const response = await axios.get<IEmployee[]>("/api/employee/get");
    return response.data;
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
};

export const getEmployeeById = async (id: string) => {
  try {
    const response = await axios.post<IEmployee>(`/api/employee/get_by_id`, {
      id,
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching employee with id ${id}:`, error);
    throw error;
  }
};
