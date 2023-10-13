import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PurchaseService from "../../services/PurchaseService";
import { useDispatch, useSelector } from "react-redux";
import { Role } from "../../models/Role";
import UserService from "../../services/UserService";
import { clearCurrentUser } from "../../store/reducers/userSlice";
import "./ProfilePage.css";
const ProfilePage = () => {
  const [purchaseList, setPurchaseList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const currentUser = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    PurchaseService.getAllPurchaseItem().then((res) => {
      setPurchaseList(res.data);
    });
  }, []);
  const changeRole = () => {
    const newRole = currentUser.role === Role.ADMIN ? Role.USER : Role.ADMIN;
    UserService.changeRole(newRole)
      .then(() => {
        dispatch(clearCurrentUser());
        navigate("/login");
      })
      .catch(() => {
        setErrorMessage("Unexpected error occurred");
      });
  };
  return (
    <div className="container">
      <div className="pt-5">
        {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}
        <div className="card">
          <div className="card-header">
            <div className="row">
              <div className="col-6">
                <h3>All Purchase Items</h3>
              </div>
              <div className="col-6 text-end">
                Current role is <strong>{currentUser?.role}</strong>
                <button
                  className="btn btn-primary change-role-button"
                  onClick={() => changeRole()}
                >
                  Change Role
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
                </tr>
              </thead>
              <tbody>
                {purchaseList.map((item, idx) => (
                  <tr key={idx}>
                    <th scope="row">{idx + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{new Date(item.purchaseTime).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
