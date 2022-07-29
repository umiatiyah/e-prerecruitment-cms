import http from "../http-common";
import authHeader from "./auth-header";

const API_URL = "https://sheltered-meadow-71757.herokuapp.com";

class HistoryService {
  getAll() {
    return http.get(API_URL+`/admin/history`, { headers: authHeader() });
  }
}

export default new HistoryService();
