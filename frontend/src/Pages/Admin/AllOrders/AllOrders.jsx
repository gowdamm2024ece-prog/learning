import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, updateOrder, deleteOrder } from "../../../redux/api";
import "./AllOrders.css";

function AllOrders() {
  const dispatch = useDispatch();
  const orders = useSelector(state => state.orders);
  const [editingStatus, setEditingStatus] = useState({});

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await dispatch(updateOrder(orderId, { status: newStatus }));
      setEditingStatus({});
    } catch (err) {
      alert('Failed to update order status');
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this order?")) {
      dispatch(deleteOrder(id));
    }
  };

  return (
    <div className="all-orders-container">
      <h2>All Orders</h2>

      <table className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User</th>
            <th>Total (₹)</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>{order._id.slice(-6)}</td>
              <td>{order.user?.name || "N/A"}</td>
              <td>{order.totalAmount}</td>
              <td>
                {editingStatus[order._id] ? (
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    onBlur={() => setEditingStatus({})}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Yet to Deliver">Yet to Deliver</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                ) : (
                  <span 
                    className={`status-badge ${order.status.toLowerCase().replace(' ', '-')}`}
                    onClick={() => setEditingStatus({[order._id]: true})}
                  >
                    {order.status}
                  </span>
                )}
              </td>
              <td>
                <button
                  className="edit-btn"
                  onClick={() => setEditingStatus({[order._id]: true})}
                >
                  Edit Status
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(order._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllOrders;
