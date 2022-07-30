import http from "../http-common";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

class DashboardService {
  count() {
    return http.get(API_URL+`/admin/dashboard`, { headers: authHeader() });
  }
}

export default new DashboardService();
