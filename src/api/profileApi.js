import api from "./axios";

export const getProfileApi = () => {
  return api.get("/profile/me");
};

export const updateProfileApi = (data) => {
  return api.put("/profile/me", data);
};
