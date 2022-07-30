import http from "../http-common";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

class ValuationService {
  getAll() {
    return http.get(API_URL+`/admin/valuation`, { headers: authHeader() });
  }
}

export default new ValuationService();
