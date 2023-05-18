import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "./assets/freshcart-logo.svg";
import Login from "../Login/Login";
function Nav({ deleteUser, user }) {
 
  const navigate = useNavigate();
  function logout() {
    console.log("logged out");
    localStorage.removeItem("user");

    deleteUser();

    navigate("/login");
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary position-fixed top-0 end-0 start-0" style={{zIndex:'99999'}}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">
            <img src={logo} alt="fresh card" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item active">
                <Link className="nav-link " aria-current="page" to="/home">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/brands">
                  Brands
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cart">
                  Cart
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {user?<>   <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <span className="nav-link logout" onClick={logout}>
                  Logout
                </span>
              </li></>:<><li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li></>}
           
              
              
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
