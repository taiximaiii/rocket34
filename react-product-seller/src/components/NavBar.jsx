import React from 'react'
import logo from "../logo.svg";
import { NavLink, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { clearCurrentUser } from '../store/reducers/userSlice';
import { Role } from '../models/Role';
const NavBar = () => {
    const currentUser = useSelector(state=>state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logout = ()=>{
        dispatch(clearCurrentUser());
        navigate('/login')
    }
  return (
    <nav className='navbar navbar-expand navbar-dark bg-dark'>
        <a href='https://reactjs.org' className='navbar-brand ms-1'>
            <img src={logo} className="App-logo" alt="logo" />
            React
        </a>
        <div className="navbar-nav me-auto">
            {
                currentUser?.role === Role.ADMIN &&
                <li className="nav-item">
                    <NavLink to="/admin" className="nav-link">Admin</NavLink>
                </li>    
            }
             
             <li className="nav-item">
                <NavLink to="/" className="nav-link">Home</NavLink>
             </li>
        </div>
        {
            !currentUser &&
            <div className="navbar-nav ms-auto">
                <li className="nav-item">
                    <NavLink to="/register" className="nav-link">Sign up</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/login" className="nav-link">Sign in</NavLink>
                </li>
            </div>
        }

        {
            currentUser &&
            <div className="navbar-nav ms-auto">
                <li className="nav-item">
                    <NavLink to="/profile" className="nav-link">{currentUser.name}</NavLink>
                </li>
                <li className="nav-item">
                    <a href='#' className="nav-link btn-primary" onClick={()=>logout()}>
                            Sign out
                    </a>
                
                </li>
            </div>
        }

        
    </nav>
  )
}

export default NavBar