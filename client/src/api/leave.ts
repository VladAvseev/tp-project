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
