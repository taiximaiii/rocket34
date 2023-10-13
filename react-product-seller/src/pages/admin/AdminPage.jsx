import React, { useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductService from "../../services/ProductService";
import { useEffect } from "react";
import "./AdminPage.css";

const AdminPage = () => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    ProductService.getAllProducts().then((response) => {
      setProductList(response.data);
      console.log(response.data);
    });
  }, []);

  const navigate = useNavigate();
  const deleteProduct = (product) => {
    ProductService.deleteProduct(product)
      .then(() => {
        setProductList(productList.filter((x) => x.id !== product.id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <div className="pt-5">
        <div className="card">
          <div className="card-header">
            <div className="row">
              <div className="col-6">
                <h3>All Products</h3>
              </div>
              <div className="col-6 text-end">
                <button
                  className="btn btn-primary"
                  onClick={() => navigate("/save")}
                >
                  Create Product
                </button>
              </div>
            </div>
          </div>
          <div className="card-body">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Date</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {productList.map((item, idx) => {
                  const isEven = item.id % 2 === 0;
                  const itemClass = isEven ? "even-product-id" : "";

                  return (
                    <tr key={item.id} className={itemClass}>
                      <th scope="row">{idx + 1}</th>
                      <td>{item.name}</td>
                      <td>{"$" + item.price}</td>
                      <td>{new Date(item.createTime).toLocaleDateString()}</td>
                      <td>
                        <button
                          className="btn-primary me-1"
                          onClick={() => navigate(`/edit/${item.id}`)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteProduct(item)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
