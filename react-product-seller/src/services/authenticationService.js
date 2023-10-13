import { BASE_API_URL } from "../common/constants";
import axios from "axios";
export const BASE_URL = BASE_API_URL + "/authentication";
const authenticationService = {
  login(user) {
    return axios.post(BASE_URL + "/sign-in", user);
  },
  register(user) {
    return axios.post(BASE_URL + "/sign-up", user);
  },
};

export default authenticationService;
