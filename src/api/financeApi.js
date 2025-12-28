import api from "./axios";

export const saveFinanceProfileApi = (data) => {
  return api.post("/finance/me", data);
};

export const checkFinanceProfileApi = () => {
  return api.get("/finance/exists");
};

export const getFinanceProfileApi = () => {
  return api.get("/finance/me");
};
