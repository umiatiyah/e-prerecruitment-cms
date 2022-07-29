import http from "../http-common";
import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://sheltered-meadow-71757.herokuapp.com";

class CategoryService {
  getAll() {
    return http.get("/admin/category", { headers: authHeader() });
  }

  get(id) {
    return http.get(`/admin/category/${id}`, { headers: authHeader() });
  }

  add(name, min_score, duration, limit_question) {
    return axios.post(API_URL+"/admin/category", {name: name, min_score: parseInt(min_score), duration: parseInt(duration), limit_question: parseInt(limit_question)}, 
    { 
      headers: authHeader() 
    });
  }

  update(id, name, min_score, duration, limit_question) {
    return http.post(`/admin/category/${id}`, {name: name, min_score: parseInt(min_score), duration: parseInt(duration), limit_question: parseInt(limit_question)},
    {
      headers: authHeader(),
    });
  }

  delete(id) {
    console.log("ID",id);
    return http.delete(`/admin/category/${id}`, { headers: authHeader() });
  }
}

export default new CategoryService();
