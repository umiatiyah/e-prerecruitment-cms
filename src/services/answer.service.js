import http from "../http-common";
import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://sheltered-meadow-71757.herokuapp.com";

class AnswerService {
  getAll() {
    return http.get("/admin/answer", { headers: authHeader() });
  }

  get(id) {
    return http.get(`/admin/answer/${id}`, { headers: authHeader() });
  }

  add(question_id, value, score) {
    return axios.post(API_URL+"/admin/answer", {question_id: parseInt(question_id), value: value, score: parseInt(score)},
    { 
      headers: authHeader() 
    });
  }

  update(id, question_id, value, score) {
    return http.post(`/admin/answer/${id}`, {question_id: parseInt(question_id), value: value, score: parseInt(score)},
    {
      headers: authHeader(),
    });
  }

  delete(id) {
    return http.delete(`/admin/answer/${id}`, { headers: authHeader() });
  }
}

export default new AnswerService();
