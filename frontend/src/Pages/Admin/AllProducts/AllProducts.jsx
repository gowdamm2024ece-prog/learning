import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  deleteProduct,
  updateProduct
} from "../../../redux/api";
import "./AllProducts.css";

function AllProducts() {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products);

  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    price: "",
    stock: "",
    image: ""
  });

  // Fetch products
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Delete product
  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  // Start editing
  const handleEdit = (product) => {
    setEditId(product._id);
    setEditData({
      name: product.name,
      price: product.price,
      stock: product.stock,
      image: product.image || ""
    });
  };

  // Update product
  const handleUpdate = () => {
    dispatch(updateProduct(editId, editData));
    setEditId(null);
  };

  return (
    <div className="all-products-container">
      <h2>All Products</h2>

      <table className="products-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price (₹)</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td>
                {editId === product._id ? (
                  <input
                    type="url"
                    placeholder="Image URL"
                    value={editData.image}
                    onChange={e =>
                      setEditData({ ...editData, image: e.target.value })
                    }
                  />
                ) : (
                  product.image ? (
                    <img src={product.image} alt={product.name} className="product-image" />
                  ) : (
                    "No Image"
                  )
                )}
              </td>
              <td>
                {editId === product._id ? (
                  <input
                    value={editData.name}
                    onChange={e =>
                      setEditData({ ...editData, name: e.target.value })
                    }
                  />
                ) : (
                  product.name
                )}
              </td>

              <td>
                {editId === product._id ? (
                  <input
                    type="number"
                    value={editData.price}
                    onChange={e =>
                      setEditData({ ...editData, price: e.target.value })
                    }
                  />
                ) : (
                  product.price
                )}
              </td>

              <td>
                {editId === product._id ? (
                  <input
                    type="number"
                    value={editData.stock}
                    onChange={e =>
                      setEditData({ ...editData, stock: e.target.value })
                    }
                  />
                ) : (
                  product.stock
                )}
              </td>

              <td>
                {editId === product._id ? (
                  <>
                    <button className="save-btn" onClick={handleUpdate}>
                      Save
                    </button>
                    <button
                      className="cancel-btn"
                      onClick={() => setEditId(null)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllProducts;
