import http from "../http-common";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

class QuestionService {
  getAll() {
    return http.get(API_URL+`/admin/question`, { headers: authHeader() });
  }

  get(id) {
    return http.get(API_URL+`/admin/question/${id}`, { headers: authHeader() });
  }

  add(category_id, value, is_active) {
    return http.post(API_URL+"/admin/question", {category_id: parseInt(category_id), value: value, is_active: is_active},
    { 
      headers: authHeader() 
    });
  }

  update(id, category_id, value, is_active) {
    return http.post(API_URL+`/admin/question/${id}`, {category_id: parseInt(category_id), value: value, is_active: is_active},
    {
      headers: authHeader(),
    });
  }

  delete(id) {
    return http.delete(API_URL+`/admin/question/${id}`, { headers: authHeader() });
  }
}

export default new QuestionService();
