import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "/login/admin", {
        email,
        password,
      })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
          localStorage.setItem("user_id", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  getCurrentUserID() {
    return JSON.parse(localStorage.getItem("user_id"));
  }
}

export default new AuthService();
