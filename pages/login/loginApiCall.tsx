import axios from "axios";

const url = "/api/auth/login";

const login = (data: FormData) => {
  return axios.post(url, data);
}

export default login;