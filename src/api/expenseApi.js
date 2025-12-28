import api from "./axios";

export const fetchExpensesApi = () => {
  return api.get("/expenses");
};

export const addExpenseApi = (data) => {
  return api.post("/expenses", data);
};

export const deleteExpenseApi = (id) => {
  return api.delete(`/expenses/${id}`);
};
