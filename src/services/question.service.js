import http from "../http-common";
import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://sheltered-meadow-71757.herokuapp.com";

class QuestionService {
  getAll() {
    return http.get("/admin/question", { headers: authHeader() });
  }

  get(id) {
    return http.get(`/admin/question/${id}`, { headers: authHeader() });
  }

  add(category_id, value, is_active) {
    return axios.post(API_URL+"/admin/question", {category_id: parseInt(category_id), value: value, is_active: is_active},
    { 
      headers: authHeader() 
    });
  }

  update(id, category_id, value, is_active) {
    return http.post(`/admin/question/${id}`, {category_id: parseInt(category_id), value: value, is_active: is_active},
    {
      headers: authHeader(),
    });
  }

  delete(id) {
    console.log("ID",id);
    return http.delete(`/admin/question/${id}`, { headers: authHeader() });
  }
}

export default new QuestionService();
