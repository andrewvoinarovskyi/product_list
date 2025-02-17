import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../../store/slices/productsSlice";
import { RootState } from "../../store/store";

const DeleteProductModal = ({ onClose }: { onClose: () => void }) => {
  const dispatch = useDispatch();
  const product = useSelector((state: RootState) => state.products.selectedProduct);

  const handleDelete = (): void => {
    if (product) {
      dispatch(deleteProduct(product.id));
      onClose();
    }
  };

  return (
    <div className="modal">
      <h2>Are you sure you want to delete this product?</h2>
      <p>{product?.name}</p>
      <div>
        <button onClick={handleDelete}>Yes, Delete</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default DeleteProductModal;
