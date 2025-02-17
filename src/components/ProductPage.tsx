import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { addComment, setSelectedProduct } from "../store/slices/productsSlice";
import ProductModal from "./modals/ProductModal";
import Comments from "./Comments";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const product = useSelector((state: RootState) =>
    state.products.products.find((p) => p.id === Number(id))
  );

  const [commentText, setCommentText] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);

  if (!product) {
    return <p>Product not found. <Link to="/">Go back to all products.</Link></p>;
  }

  const handleAddComment = () => {
    if (commentText.trim() !== "") {
      const newComment = {
        id: Date.now(),
        productId: product.id,
        description: commentText,
        date: new Date().toLocaleString(),
      };
      dispatch(addComment(newComment));
      setCommentText("");
    }
  };

  return (
    <>
      <h1><Link to="/">← Back to All Products</Link></h1>
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <img src={product.imageUrl} alt={product.name} className="w-full h-64 object-cover rounded-md" />
        <h1 className="text-2xl font-bold mt-4">{product.name}</h1>
        <p className="text-gray-600 mt-2">Weight: {product.weight}</p>
        <p className="text-gray-600">Size: {product.size.width}x{product.size.height}sm</p>
        <p className="text-gray-700 font-semibold mt-2">Available: {product.count}</p>

        <button onClick={() => {
          dispatch(setSelectedProduct(product))
          setShowEditModal(true)
        }}>Edit Product</button>

        <Comments comments={product.comments} productId={product.id} /> 

        <div className="mt-4">
          <textarea
            className="w-full p-2 border rounded-md"
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
            onClick={handleAddComment}
          >
            Add Comment
          </button>
        </div>
      </div>

      {showEditModal && <ProductModal onClose={() => setShowEditModal(false)} />}
    </>
  );
};

export default ProductPage;
