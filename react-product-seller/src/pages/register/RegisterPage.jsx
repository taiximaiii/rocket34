import React from "react";
import { useState } from "react";
import User from "../../models/User";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import authenticationService from "../../services/authenticationService";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUserCircle} from '@fortawesome/free-solid-svg-icons'
import './Register.css';
const RegisterPage = () => {
  const initalUser = new User("", "", "");
  const [user, setUser] = useState(initalUser);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const currentUser = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    
    if (currentUser?.id) {
      navigate("/profile");
    }
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  const handleRegister = (e) => {
    e.preventDefault()
    setSubmitted(true);
    if (!user.username || !user.password || !user.name) {
      return;
    }
    setLoading(true);
    authenticationService
      .register(user)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        if (error?.response?.status === 409) {
          setErrorMessage("username or password is not valid");
        } else {
          setErrorMessage("unexpected error occurred");
        }
        setLoading(false);
      });
  };
  return (
    <div className="container mt-5">
      <div className="card ms-auto me-auto p-3 shadow-lg custom-card">
        <FontAwesomeIcon icon={faUserCircle} className="ms-auto me-auto user-icon" />
        {errorMessage&&
          <div className="alert alert-danger">
            {errorMessage}
          </div>
        }
        <form onSubmit={(e)=>handleRegister(e)}
              noValidate
              className={submitted?'was-validated':''}>
          <div className="form-group">
            <label htmlFor="name">Fullname:</label>
            <input type="text" name="name" id="name" className="form-control" 
                    value={user.name}
                    onChange={e=>handleChange(e)}
                    placeholder="name"
                    required/>
            <div className="invalid-feedback">
              Fullname is required
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input type="text" name="username" id="username" className="form-control" 
                    value={user.username}
                    onChange={e=>handleChange(e)}
                    placeholder="Username"
                    required/>
            <div className="invalid-feedback">
              Username is required
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" id="password" className="form-control" 
                    value={user.password}
                    onChange={e=>handleChange(e)}
                    placeholder="password"
                    required/>
            <div className="invalid-feedback">
              Password is required
            </div>
          </div>

          <button className="btn btn-info w-100 mt-3" disabled={loading}>
            SignUp
          </button>

        </form>
        <Link className="btn btn-link" style={{color:"darkgray"}} to="/login">
          I have account already
        </Link>
        
      </div>
    </div>
  );
};

export default RegisterPage;
