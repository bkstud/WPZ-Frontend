import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:3002/api", // Now it's local url
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
