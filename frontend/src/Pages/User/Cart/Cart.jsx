import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../../redux/api";
import { change_user } from "../../../redux/actions";
import "./Cart.css";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currUser = useSelector((state) => state.curr_user);
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem('cartItems') || '[]')
  );
  const [loading, setLoading] = useState(false);

  const handleQuantityChange = (id, value) => {
    const qty = Math.max(1, Number(value) || 1);
    const updatedCart = cartItems.map(item =>
      item.product._id === id ? { ...item, quantity: qty } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  const handleRemoveFromCart = (productId) => {
    const updatedCart = cartItems.filter(item => item.product._id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  const handleOrderCart = async () => {
    if (cartItems.length === 0) {
      alert('Cart is empty!');
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        user: currUser._id,
        products: cartItems.map(item => ({
          product: item.product._id,
          quantity: item.quantity
        })),
        totalAmount: cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
      };

      await dispatch(createOrder(orderData));
      setCartItems([]);
      localStorage.removeItem('cartItems');
      alert('Order placed successfully!');
      navigate('/user');
    } catch (err) {
      alert('Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    dispatch(change_user(null));
    navigate('/');
  };

  const totalAmount = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="cart-page">
      <header className="cart-header">
        <h2>Shopping Cart</h2>
        <div className="cart-summary">
          <span>Logged in as: {currUser ? currUser.name : "Guest"}</span>
          <div className="header-buttons">
            <button className="dashboard-btn" onClick={() => navigate('/user')}>
              ← Back to Products
            </button>
            <button className="orders-btn" onClick={() => navigate('/user/orders')}>
              My Orders
            </button>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="cart-content">
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <h3>Your cart is empty</h3>
            <p>Add some products to get started!</p>
            <button className="continue-shopping" onClick={() => navigate('/user')}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map(({ product, quantity }) => (
                <div key={product._id} className="cart-item">
                  <img src={product.image} alt={product.name} className="cart-item-image" />
                  <div className="cart-item-details">
                    <h4>{product.name}</h4>
                    <p className="cart-item-price">₹{product.price}</p>
                  </div>
                  <div className="cart-item-quantity">
                    <label>Qty:</label>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => handleQuantityChange(product._id, e.target.value)}
                    />
                  </div>
                  <div className="cart-item-total">
                    ₹{product.price * quantity}
                  </div>
                  <button 
                    className="remove-btn" 
                    onClick={() => handleRemoveFromCart(product._id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-summary-section">
              <div className="cart-totals">
                <div className="total-items">Total Items: {totalItems}</div>
                <div className="total-amount">Total Amount: ₹{totalAmount}</div>
              </div>
              <button 
                className="order-btn" 
                onClick={handleOrderCart}
                disabled={loading}
              >
                {loading ? "Placing Order..." : `Place Order (₹${totalAmount})`}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;