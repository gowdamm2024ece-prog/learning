import { Routes, Route, Navigate } from "react-router-dom";
import AdminDashboard from "../Pages/Admin/AdminDashboard/AdminDashboard";
import AllProducts from "../Pages/Admin/AllProducts/AllProducts";
import AddProducts from "../Pages/Admin/AddProducts/AddProducts";
import AllUsers from "../Pages/Admin/AllUsers/AllUsers";
import AllOrders from "../Pages/Admin/AllOrders/AllOrders";

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />}>
        <Route index element={<Navigate to="products/add" replace />} />
        <Route path="products" element={<AllProducts />} />
        <Route path="products/add" element={<AddProducts />} />
        <Route path="users" element={<AllUsers />} />
        <Route path="orders" element={<AllOrders />} />
      </Route>
    </Routes>
  );
}

export default AdminRoutes;
