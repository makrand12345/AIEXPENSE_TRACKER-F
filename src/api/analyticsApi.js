import api from "./axios";

export const getAnalyticsOverview = () => {
  return api.get("/analytics/overview");
};
