import axios from "axios";

export default axios.create({
  baseURL: process.env.REACT_APP_EXPRESS_SERVER_URL
    ? process.env.REACT_APP_EXPRESS_SERVER_URL
    : "http://localhost:8082",
});
