import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { change_user } from "../../../redux/actions";
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(change_user(null));
    navigate('/');
  };

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <div className="admin-header">
          <h2>Admin Panel</h2>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <NavLink to="products" className="admin-link">
          All Products
        </NavLink>

        <NavLink to="products/add" className="admin-link">
          Add Product
        </NavLink>

        <NavLink to="users" className="admin-link">
          All Users
        </NavLink>

        <NavLink to="orders" className="admin-link">
          All Orders
        </NavLink>
      </div>

      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminDashboard;
