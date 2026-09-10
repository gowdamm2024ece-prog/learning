import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchOrders } from "../../../redux/api";
import { change_user } from "../../../redux/actions";
import "./UserOrders.css";

function UserOrders() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orders = useSelector((state) => state.orders || []);
  const currUser = useSelector((state) => state.curr_user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      setLoading(true);
      await dispatch(fetchOrders());
      setLoading(false);
    };
    loadOrders();
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(change_user(null));
    navigate('/');
  };

  const userOrders = orders.filter(order => order.user?._id === currUser?._id || order.user === currUser?._id);

  return (
    <div className="user-orders">
      <header className="user-orders__header">
        <h2>My Orders</h2>
        <div className="user-orders__summary">
          <span>Logged in as: {currUser ? currUser.name : "Guest"}</span>
          <div className="header-buttons">
            <button className="back-btn" onClick={() => navigate('/user')}>
              ← Back to Dashboard
            </button>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="orders-container">
        {loading ? (
          <p>Loading orders...</p>
        ) : userOrders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          userOrders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <h4>Order #{order._id.slice(-6)}</h4>
                <span className={`order-status ${order.status}`}>
                  {order.status.toUpperCase()}
                </span>
              </div>
              <div className="order-items">
                {order.products.map((item, index) => (
                  <div key={index} className="order-item">
                    <span>{item.product?.name || 'Product'} × {item.quantity}</span>
                    <span>₹{item.product?.price ? (item.product.price * item.quantity) : 'N/A'}</span>
                  </div>
                ))}
              </div>
              <div className="order-total">
                <strong>Total: ₹{order.totalAmount}</strong>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default UserOrders;