import { BASE_API_URL } from "../common/constants";
import axios from "axios";
import { authHeader } from "./BaseService";
const API_URL = BASE_API_URL + "/products";

const ProductService = {
  saveProduct(product) {
    return axios.post(API_URL, product, {
      headers: authHeader(),
    });
  },

  deleteProduct(product) {
    return axios.delete(API_URL + "/" + product.id, {
      headers: authHeader(),
    });
  },

  getAllProducts() {
    return axios.get(API_URL);
  },

  getProduct(id) {
    return axios.get(API_URL + "/" + id, {
      headers: authHeader(),
    });
  },

  editProduct(id, product) {
    return axios.put(API_URL + "/edit/" + id, product, {
      headers: authHeader(),
    });
  },
};
export default ProductService;
