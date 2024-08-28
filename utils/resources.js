import axios from "axios";
import { parseCookies } from "nookies";

const baseUrl = process.env.API_URL;
const { token } = parseCookies(null, "token");

const getAll = (uri) => {
  return axios.get(`${baseUrl}/${uri}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": process.env.BASE_URL,
      "Access-Control-Allow-Credentials": "true",
    },
  });
};

export { getAll };
