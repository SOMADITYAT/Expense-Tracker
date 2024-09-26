import axios from "axios";

const API_URL = "http://localhost:8080"; 

export const fetchExpenses = async () => {
  const response = await axios.get(`${API_URL}/api/expenses`);
  return response.data;
};

export const addExpense = async (expenseData) => {
  const response = await axios.post(`${API_URL}/api/expenses`, expenseData);
  return response.data;
};

export const updateExpense = async (id, updatedExpense) => {
  const response = await axios.put(
    `${API_URL}/api/expenses/${id}`,
    updatedExpense
  );
  return response.data;
};

export const deleteExpense = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/api/expenses/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting expense:", error);
    throw error;
  }
};
