import { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { Product, setSelectedProduct } from "../store/slices/productsSlice";
import { Link } from "react-router-dom";

import ProductModal from "./modals/ProductModal";
import DeleteProductModal from "./modals/DeleteProductModal";

const ProductsPage = () => {
  const products = useSelector((state: RootState) => state.products.products);
  const dispatch = useDispatch();
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const sortProducts = useCallback((products: Product[], direction: 'asc' | 'desc') : Product[] => {
    return [...products].sort((a, b) => {
      const nameComparison = a.name.localeCompare(b.name);
      if (nameComparison !== 0) {
        return direction === 'asc' ? nameComparison : -nameComparison;
      }

      return direction === 'asc' ? a.count - b.count : b.count - a.count;
    });
  }, []);

  const sortedProducts = sortProducts(products, sortDirection);

  const handleAddProduct = (): void => {
    dispatch(setSelectedProduct(null));
    setShowAddModal(true);
  };

  const handleDeleteProduct = (product: Product): void => {
    dispatch(setSelectedProduct(product));
    setShowDeleteModal(true);
  };

  return (
    <div>
      <h1>Products</h1>
      
      <button onClick={handleAddProduct}>Add Product</button>

      <select 
        value={sortDirection} 
        onChange={(e) => setSortDirection(e.target.value as 'asc' | 'desc')}
      >
        <option value="asc">Sort Ascending</option>
        <option value="desc">Sort Descending</option>
      </select>

      <ul>
        {sortedProducts.map((product) => (
          <li key={product.id}>
            <Link to={`/product/${product.id}`}>{product.name}</Link>
            <button onClick={() => handleDeleteProduct(product)}>Delete</button>
          </li>
        ))}
      </ul>

      {showAddModal && <ProductModal onClose={() => setShowAddModal(false)} />}
      {showDeleteModal && <DeleteProductModal onClose={() => setShowDeleteModal(false)} />}
    </div>
  );
};

export default ProductsPage;
