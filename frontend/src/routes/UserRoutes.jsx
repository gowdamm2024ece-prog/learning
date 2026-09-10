import { Routes, Route, Navigate } from "react-router-dom";
import UserDashboard from "../Pages/User/UserDashboard/UserDashboard";
import UserOrders from "../Pages/User/UserOrders/UserOrders";
import Cart from "../Pages/User/Cart/Cart";

function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<UserDashboard />} />
      <Route path="/orders" element={<UserOrders />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
}

export default UserRoutes;
