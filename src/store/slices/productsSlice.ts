import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Size {
  width: number;
  height: number;
}
interface Comment {
  id: number;
  productId: number;
  description: string;
  date: string;
}

export interface Product {
  id: number;
  imageUrl: string;
  name: string;
  count: number;
  size: Size;
  weight: string;
  comments: Comment[];
}

interface ProductsState {
  products: Product[];
  selectedProduct: Product | null;
}

const initialState: ProductsState = {
  products: [
    {
      id: 1,
      imageUrl: "some url here",
      name: "Laptop",
      count: 4,
      size: { width: 200, height: 200 },
      weight: "2kg",
      comments: [
        { id: 1, productId: 1, description: "Great laptop!", date: "14:00 22.08.2021" },
      ],
    },
  ],
  selectedProduct: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    editProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) state.products[index] = action.payload;
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
    setSelectedProduct: (state, action: PayloadAction<Product | null>) => {
      state.selectedProduct = action.payload;
    },
    addComment: (state, action: PayloadAction<Comment>) => {
      const product = state.products.find((p) => p.id === action.payload.productId);
      if (product) {
        product.comments.push(action.payload);
      }
    },
    deleteComment: (state, action: PayloadAction<{ productId: number; commentId: number }>) => {
      const { productId, commentId } = action.payload;
      const product = state.products.find((p) => p.id === productId);
      if (product) {
        product.comments = product.comments.filter((comment) => comment.id !== commentId);
      }
    },
  },
});

export const { addProduct, editProduct, deleteProduct, setSelectedProduct, addComment, deleteComment } = productsSlice.actions;
export default productsSlice.reducer;
