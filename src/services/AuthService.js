import HttpService from "./HttpService";

class AuthService extends HttpService {
  async login(credentials) {
    const { data } = await this.client.post("/login", credentials);
    if(data.status == 'success'){
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
    }
    return data;
  }
  async register(userData) {
    const { data } = await this.client.post("/register", userData);
    localStorage.setItem("token", data.token);
    localStorage.setItem("userId", data.userId);
  }

  async logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    await this.client.post("/logout");
  }
}

const authService = new AuthService();
export default authService;