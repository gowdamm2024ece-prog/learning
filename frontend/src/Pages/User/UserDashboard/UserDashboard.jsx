// src/pages/user/UserDashboard.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProducts, createOrder } from "../../../redux/api";
import { change_user } from "../../../redux/actions";
import "./UserDashboard.css";

function UserDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const products = useSelector((state) => state.products || []);
  const currUser = useSelector((state) => state.curr_user);

  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem('cartItems') || '[]')
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      await dispatch(fetchProducts());
      setLoading(false);
    };
    loadProducts();
  }, [dispatch]);

  const handleQuantityChange = (id, value) => {
    const qty = Math.max(1, Number(value) || 1);
    setCartItems((prev) => {
      const exists = prev.find((item) => item.product._id === id);
      if (!exists) {
        // quantity edited before clicking "Add" – keep just temp value
        return [...prev, { product: products.find((p) => p._id === id), quantity: qty }];
      }
      return prev.map((item) =>
        item.product._id === id ? { ...item, quantity: qty } : item
      );
    });
  };

  const getQuantityForProduct = (id) => {
    const item = cartItems.find((i) => i.product._id === id);
    return item ? item.quantity : 1;
  };

  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.product._id === product._id);
      let updatedCart;
      if (exists) {
        updatedCart = prev.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [...prev, { product, quantity: 1 }];
      }
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems((prev) => prev.filter(item => item.product._id !== productId));
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    dispatch(change_user(null));
    navigate('/');
  };

  const handleOrderCart = async () => {
    if (cartItems.length === 0) {
      alert('Cart is empty!');
      return;
    }

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
      alert('Order placed successfully!');
    } catch (err) {
      alert('Failed to place order');
    }
  };

  return (
    <div className="user-dashboard">
      <header className="user-dashboard__header">
        <h2>Available Products</h2>
        <div className="user-dashboard__summary">
          <span>Logged in as: {currUser ? currUser.name : "Guest"}</span>
          <span>Cart items: {totalItems}</span>
          <div className="header-buttons">
            <button className="cart-btn" onClick={() => navigate('/user/cart')}>
              View Cart ({totalItems})
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

      <div className="user-dashboard__grid">
        {loading ? (
          <p>Loading products...</p>
        ) : products.length === 0 ? (
          <p>No products available.</p>
        ) : (
          products.map((p) => (
            <div key={p._id} className="user-dashboard__card">
            <img
              src={p.image}
              alt={p.name}
              className="user-dashboard__image"
            />
            <h4 className="user-dashboard__name">{p.name}</h4>
            <p className="user-dashboard__price">₹{p.price}</p>

            <div className="user-dashboard__quantity-row">
              <label>Qty:</label>
              <input
                type="number"
                min="1"
                value={getQuantityForProduct(p._id)}
                onChange={(e) => handleQuantityChange(p._id, e.target.value)}
              />
            </div>

            <button
              className="user-dashboard__add-btn"
              onClick={() => handleAddToCart(p)}
            >
              Add to Cart
            </button>
            </div>
          ))
        )}
      </div>

      {/* simple preview; next step is Cart page that reads cartItems from Redux or context */}
      <section className="user-dashboard__cart-preview">
        <div className="cart-header">
          <h3>Cart Preview</h3>
          {cartItems.length > 0 && (
            <button className="view-cart-btn" onClick={() => navigate('/user/cart')}>
              View Full Cart (₹{cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)})
            </button>
          )}
        </div>
        {cartItems.length === 0 ? (
          <p>No items in cart.</p>
        ) : (
          <div className="cart-preview-items">
            {cartItems.slice(0, 3).map(({ product, quantity }) => (
              <div key={product._id} className="preview-item">
                <span>{product.name} × {quantity}</span>
                <span>₹{product.price * quantity}</span>
              </div>
            ))}
            {cartItems.length > 3 && (
              <p className="more-items">...and {cartItems.length - 3} more items</p>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

export default UserDashboard;
