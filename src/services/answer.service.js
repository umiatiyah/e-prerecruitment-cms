import http from "../http-common";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

class AnswerService {
  getAll() {
    return http.get(API_URL+`/admin/answer`, { headers: authHeader() });
  }

  get(id) {
    return http.get(API_URL+`/admin/answer/${id}`, { headers: authHeader() });
  }

  add(question_id, value, score) {
    return http.post(API_URL+`/admin/answer`, {question_id: parseInt(question_id), value: value, score: parseInt(score)},
    { 
      headers: authHeader() 
    });
  }

  update(id, question_id, value, score) {
    return http.post(API_URL+`/admin/answer/${id}`, {question_id: parseInt(question_id), value: value, score: parseInt(score)},
    {
      headers: authHeader(),
    });
  }

  delete(id) {
    return http.delete(API_URL+`/admin/answer/${id}`, { headers: authHeader() });
  }
}

export default new AnswerService();
