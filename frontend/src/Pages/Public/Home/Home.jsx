import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
     <div className="landing-container">
      <div className="landing-card">
        <h1 className="app-title">
          Smart Inventory & Order Management System
        </h1>

        <p className="app-description">
          Manage products, track inventory, monitor expiry dates, and handle
          orders efficiently with a secure and scalable platform.
        </p>

        <div className="btn-group">
          <Link to="/login" className="btn btn-login">
            Login
          </Link>

          <Link to="/register" className="btn btn-register">
            Register
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home