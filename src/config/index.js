import axios from "axios";
//  we are not using the service manager, as this is a simple task,
const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

export default axiosInstance;
