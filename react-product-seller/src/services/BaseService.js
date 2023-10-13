// import axios from "axios";
import { store } from "../store/store";
// import { clearCurrentUser } from "../store/reducers/userSlice";

export const authHeader = () => {
  const currentUser = store.getState().user;
  return {
    "Content-Type": "application/json",
    Authorization: "Bearer " + currentUser?.token,
  };
};
