import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../../../redux/api"; // Import your Redux async action
import "./AddProduct.css";

function AddProduct() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    image: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Dispatch Redux async action
      await dispatch(
        createProduct({
          ...formData,
          price: Number(formData.price),
          stock: Number(formData.stock)
        })
      );

      // Optimistic UI update already happens via Redux store
      setMessage("✅ Product added successfully");

      setFormData({
        name: "",
        category: "",
        price: "",
        stock: "",
        image: ""
      });
    } catch (error) {
      setMessage(`❌ ${error.message || "Failed to add product"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product-container">
      <h1>Add Product</h1>

      <form className="add-product-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock Quantity"
          value={formData.stock}
          onChange={handleChange}
        />

        <input
          type="url"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default AddProduct;
