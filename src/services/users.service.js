import http from "../http-common";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

class UsersService {
  getAll() {
    return http.get(API_URL+`/admin/user`, { headers: authHeader() });
  }

  get(id) {
    return http.get(API_URL+`/admin/user/${id}`, { headers: authHeader() });
  }

  add(name, email, nik) {
    return http.post(API_URL+`/admin/user`, {name: name, email: email, nik: nik}, { headers: authHeader() });
  }

  update(id, name, email, nik) {
    return http.post(API_URL+`/admin/user/${id}`, {name: name, email: email, nik: nik}, { headers: authHeader() });
  }

  delete(id) {
    return http.delete(API_URL+`/admin/user/${id}`, { headers: authHeader() });
  }
}

export default new UsersService();
