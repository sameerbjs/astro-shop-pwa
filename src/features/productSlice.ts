
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  categories: string[];
  selectedCategory: string | null;
  searchQuery: string;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  selectedProduct: Product | null;
}

const initialState: ProductState = {
  products: [],
  filteredProducts: [],
  categories: [],
  selectedCategory: null,
  searchQuery: '',
  status: 'idle',
  error: null,
  selectedProduct: null,
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await fetch('https://fakestoreapi.com/products');
  return await response.json();
});

export const fetchCategories = createAsyncThunk('products/fetchCategories', async () => {
  const response = await fetch('https://fakestoreapi.com/products/categories');
  return await response.json();
});

export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchProductsByCategory',
  async (category: string) => {
    const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
    return await response.json();
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id: number) => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    return await response.json();
  }
);

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.filteredProducts = filterProducts(state);
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.filteredProducts = filterProducts(state);
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchProducts
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
        state.filteredProducts = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch products';
      })
      
      // Handle fetchCategories
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      
      // Handle fetchProductsByCategory
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
        state.filteredProducts = filterProducts(state);
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch products by category';
      })
      
      // Handle fetchProductById
      .addCase(fetchProductById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch product';
      });
  },
});

// Helper function to filter products based on category and search query
const filterProducts = (state: ProductState): Product[] => {
  let result = state.products;
  
  // Filter by category if selected
  if (state.selectedCategory) {
    result = result.filter(product => product.category === state.selectedCategory);
  }
  
  // Filter by search query if present
  if (state.searchQuery.trim()) {
    const query = state.searchQuery.toLowerCase().trim();
    result = result.filter(product => 
      product.title.toLowerCase().includes(query) || 
      product.description.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    );
  }
  
  return result;
};

export const { setSelectedCategory, clearSelectedProduct, setSearchQuery } = productSlice.actions;

export default productSlice.reducer;
