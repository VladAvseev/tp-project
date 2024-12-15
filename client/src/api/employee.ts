import axios from "../services/api";
import { IEmployee } from "../interfaces/Employee.interface";

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

export const createEmployee = async (employee: {
  name: string;
  position: string;
  salary: number;
  status: string;
  childs: number;
}) => {
  try {
    const response = await axios.post<IEmployee>(
      `/api/employee/create`,
      employee,
    );
    return response.data;
  } catch (error) {
    console.error(`Error creating employee:`, error);
    throw error;
  }
};
