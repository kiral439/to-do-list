import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-type": "application/json"
  },
  timeout: 10000
});

export default {
  getTodos() {
    return apiClient.get("/todos");
  },
  postTodo(todos) {
    return apiClient.post("/todos", todos);
  }
};
