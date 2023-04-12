import axios from "axios";

export default class HttpService {
  constructor() {
    this.client = axios.create({
      baseURL: "http://localhost:8000/api",
    });

    // this.client.interceptors.request.use(function (req) {
    //   const token = localStorage.getItem("token");
    //   if (token) {
    //     console.log(token)
    //     req.headers["Authorization"] = `Bearer ${token}`;
    //   }
    //   return req;
    // });



    this.client.interceptors.request.use(function (req) {
      const token = localStorage.getItem("token");
      if (token) {
        req.headers["Authorization"] = `Bearer ${token}`;
      }
      return req;
    });
    
    this.client.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response.status === 401) {
          localStorage.removeItem("token");
        }
        return Promise.reject(error);
      }
    );
    



  }
}