import http from "../http-common";
import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://sheltered-meadow-71757.herokuapp.com";

class AdminService {
  getAll() {
    return http.get(API_URL+`/admin/list`, { headers: authHeader() });
  }

  get(id) {
    return http.get(API_URL+`/admin/detail/${id}`, { headers: authHeader() });
  }

  add(name, email) {
    return axios.post(API_URL+`/admin/create`, {name: name, email: email}, { headers: authHeader() });
  }

  update(id, name, email) {
    return axios.post(API_URL+`/admin/update/${id}`, {name: name, email: email}, { headers: authHeader() });
  }

  delete(id) {
    return http.delete(API_URL+`/admin/delete/${id}`, { headers: authHeader() });
  }
}

export default new AdminService();
