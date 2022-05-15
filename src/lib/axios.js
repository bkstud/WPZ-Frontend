import axios from "axios";

const BACKEND_ADDRESS = process.env.REACT_APP_BACKEND_ADDRESS || "http://localhost"
const BACKEND_PORT = process.env.REACT_APP_BACKEND_PORT || "3002"
const URL = BACKEND_ADDRESS + ":" + BACKEND_PORT

const http = axios.create({
  baseURL: URL + "/api",
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
