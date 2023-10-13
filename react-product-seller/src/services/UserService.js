import axios from "axios";
import { BASE_API_URL } from "../common/constants";
import { authHeader } from "./BaseService";
const API_URL = BASE_API_URL + "/users";

const UserService = {
  changeRole(role) {
    return axios.put(
      API_URL + "/change/" + role,
      {},
      {
        headers: authHeader(),
      }
    );
  },
};

export default UserService;
