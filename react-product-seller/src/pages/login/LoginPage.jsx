import React from 'react'
import User from '../../models/User';
import { useState,useEffect } from 'react'
import { useNavigate,Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import authenticationService from '../../services/authenticationService';
import { setCurrentUser } from '../../store/reducers/userSlice';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUserCircle} from '@fortawesome/free-solid-svg-icons'
const LoginPage = () => {
  const initalUser = new User("", "", "");
  const [user, setUser] = useState(initalUser);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const currentUser = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

  const handleLogin = (e)=>{
    e.preventDefault();
    setSubmitted(true);
    if(!user.username||!user.password){
      return;
    }
    setLoading(true);
    authenticationService.login(user).then(response=>{
      dispatch(setCurrentUser(response.data));
      navigate('/profile');
    }).catch(error=>{
      setErrorMessage("username or password is not valid")
    })
     
  }

  return (
     <div className="container mt-5">
      <div className="card ms-auto me-auto p-3 shadow-lg custom-card">
        <FontAwesomeIcon icon={faUserCircle} className="ms-auto me-auto user-icon" />
        {errorMessage&&
          <div className="alert alert-danger">
            {errorMessage}
          </div>
        }
        <form onSubmit={(e)=>handleLogin(e)}
              noValidate
              className={submitted?'was-validated':''}>
          
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
            Sign In
          </button>

        </form>
        <Link className="btn btn-link" style={{color:"darkgray"}} to="/register">
          Create new account
        </Link>
        
      </div>
    </div>
  )
}

export default LoginPage