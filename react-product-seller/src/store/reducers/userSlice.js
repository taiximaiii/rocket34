import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  password: "",
  name: "",
  role: "",
  token: "",
  id: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      localStorage.setItem("currentUser", JSON.stringify(action?.payload));
      return action?.payload;
    },
    clearCurrentUser: (state) => {
      localStorage.removeItem("currentUser");
      return null;
    },
  },
});

export const { setCurrentUser, clearCurrentUser } = userSlice.actions;
export default userSlice.reducer;
