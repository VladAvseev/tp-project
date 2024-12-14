import axios from "../services/api";

export const getEmployees = async () => {
  try {
    const response = await axios.get("/api/employee/get");
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
};
