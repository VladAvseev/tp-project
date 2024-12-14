import axios from "../services/api";
import { IBonus } from "../interfaces/Bonus.interface";
import { ILeave } from "../interfaces/Leave.interface";

export const getBonusesByEmployee = async (id: string) => {
  try {
    const response = await axios.post<IBonus[]>("/api/bonus/get_by_employee", {
      employeeId: id,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
};

export const addBonus = async (bonus: {
  date: string;
  value: number;
  employeeId: string;
}) => {
  try {
    const response = await axios.post<ILeave>("/api/bonus/create", bonus);
    return response.data;
  } catch (error) {
    console.error("Error adding bonus:", error);
    throw error;
  }
};

export const deleteBonus = async (id: string) => {
  try {
    const response = await axios.post(`/api/bonus/delete`, { id });
    return response.data;
  } catch (error) {
    console.error("Error deleting bonus:", error);
  }
};
