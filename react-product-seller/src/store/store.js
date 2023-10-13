import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import usersReducer from "./reducers/userSlice";
const persistConfig = {
  key: "main-root",
  storage,
};
const rootReducer = combineReducers({
  user: usersReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});
const Persistor = persistStore(store);

export { Persistor };
