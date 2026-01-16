import api from "./axios";

export const saveFinanceProfileApi = (data) => {
  return api.post("/finance/me", data);
};

export const getFinanceProfileApi = () => {
  return api.get("/finance/me");
};
