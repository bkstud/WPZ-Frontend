import axios from "axios";

const BACKEND_ADDRESS = process.env.REACT_APP_BACKEND_ADDRESS || "http://localhost"
const BACKEND_PORT = process.env.REACT_APP_BACKEND_PORT || "3002"

const http = axios.create({
  baseURL: BACKEND_ADDRESS + ":" + BACKEND_PORT + "/api",
  headers: {
    "Content-Type": "application/json",
  },
  transformRequest: [
    data => {
      return JSON.stringify(data);
    },
  ],
  transformResponse: [
    data => {
      return JSON.parse(data);
    },
  ],
});

export default http;
