import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, editProduct } from "../../store/slices/productsSlice";
import { RootState } from "../../store/store";

const ProductModal = ({ onClose }: { onClose: () => void }) => {
  const product = useSelector((state: RootState) => state.products.selectedProduct);
  const dispatch = useDispatch();

  const [name, setName] = useState(product?.name || "");
  const [imageUrl, setImageUrl] = useState(product?.imageUrl || "");
  const [count, setCount] = useState(product?.count.toString() || "");
  const [weight, setWeight] = useState(product?.weight || "");
  const [width, setWidth] = useState(product?.size.width.toString() || "");
  const [height, setHeight] = useState(product?.size.height.toString() || "");
  const [error, setError] = useState("");

  useEffect(() => {
    if (product) {
      setName(product.name);
      setImageUrl(product.imageUrl);
      setCount(product.count.toString());
      setWeight(product.weight);
      setWidth(product.size.width.toString());
      setHeight(product.size.height.toString());
    }
  }, [product]);

  const handleSave = (): void => {
    const newProduct = {
      id: product?.id || Date.now(),
      name,
      imageUrl,
      count: Number(count),
      weight,
      size: { width: Number(width), height: Number(height) },
      comments: product?.comments || []
    };

    if (validateForm()) {
      if (product) {
        dispatch(editProduct(newProduct));
      } else {
        dispatch(addProduct(newProduct));
      }

      onClose();
    }
  };
  const validateForm = (): boolean => {
    if (!name || !imageUrl || !count || !weight || !width || !height) {
      setError("All fields are required!");
      return false;
    }
    setError("");
    return true;
  };

  return (
    <div className="modal">
      <h2>{product ? "Edit Product" : "Add Product"}</h2>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <input
        placeholder="Count"
        type="number"
        value={count}
        onChange={(e) => setCount(e.target.value)}
      />
      <input
        placeholder="Weight"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />
      <input
        placeholder="Width"
        type="number"
        value={width}
        onChange={(e) => setWidth(e.target.value)}
      />
      <input
        placeholder="Height"
        type="number"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
      />
      <button onClick={handleSave} disabled={!!error} >{product ? "Save" : "Add"}</button>
      <button onClick={onClose}>Cancel</button>
      
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default ProductModal;
