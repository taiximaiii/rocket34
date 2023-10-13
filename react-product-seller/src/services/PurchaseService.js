import { BASE_API_URL } from "../common/constants";
import axios from "axios";
import { authHeader } from "./BaseService";
const API_URL = BASE_API_URL + "/purchases";

const PurchaseService = {
  savePurchase(purchase, productId) {
    return axios.post(API_URL, purchase, {
      headers: authHeader(),
      params: {
        productId: productId,
      },
    });
  },
  getAllPurchaseItem() {
    return axios.get(API_URL, {
      headers: authHeader(),
    });
  },
};
export default PurchaseService;
