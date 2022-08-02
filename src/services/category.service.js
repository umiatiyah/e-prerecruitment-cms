import http from "../http-common";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

class CategoryService {
  getAll() {
    return http.get(API_URL+`/admin/category`, { headers: authHeader() });
  }

  getBobotCategory() {
    return http.get(API_URL+`/admin/bobot/category`, { headers: authHeader() });
  }

  get(id) {
    return http.get(API_URL+`/admin/category/${id}`, { headers: authHeader() });
  }

  add(name, min_score, duration, limit_question) {
    return http.post(API_URL+`/admin/category`, {name: name, min_score: parseInt(min_score), duration: parseInt(duration), limit_question: parseInt(limit_question)}, 
    { 
      headers: authHeader() 
    });
  }

  update(id, name, min_score, duration, limit_question) {
    return http.post(API_URL+`/admin/category/${id}`, {name: name, min_score: parseInt(min_score), duration: parseInt(duration), limit_question: parseInt(limit_question)},
    {
      headers: authHeader(),
    });
  }

  delete(id) {
    return http.delete(API_URL+`/admin/category/${id}`, { headers: authHeader() });
  }
}

export default new CategoryService();
