import axios from "axios";

/**
 * Here the baseURL will be changed depending upon the
 * backend server.
 */
const baseUrl = "http://dnc0cmt2n557n.cloudfront.net";

export default axios.create({
  baseURL: baseUrl,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const requestAPI = axios.create({
  baseURL: baseUrl,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export { requestAPI };
