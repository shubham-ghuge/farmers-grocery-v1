import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const API_URL = "https://farmers-grocery-v2.herokuapp.com";

// const API_URL = "http://localhost:3000";

export const fetchProducts = createAsyncThunk('product/fetchProducts', async () => {
    const { data } = await axios.get(`${API_URL}/products`);
    return data;
})

export const fetchCategories = createAsyncThunk('product/fetchCategories', async () => {
    const { data } = await axios.get(`${API_URL}/products/category`);
    return data;
})

export const fetchCartData = createAsyncThunk('product/fetchCartData', async () => {
    const { data } = await axios.get(`${API_URL}/cart`);
    return data;
})

export const addInCart = createAsyncThunk("product/addInCart", async (productDetails) => {
    const { data } = await axios.post(`${API_URL}/cart`, productDetails)
    return data
})

export const removeFromCart = createAsyncThunk('product/removeFromCart', async (productId) => {
    const { data } = await axios.delete(`${API_URL}/cart/${productId}`)
    return data;
})

export const updateInCart = createAsyncThunk('product/updateInCart', async (productDetails) => {
    const { data } = await axios.post(`${API_URL}/cart`, productDetails)
    return data
})

export const fetchBag = createAsyncThunk('product/fetchBag', async () => {
    const { data } = await axios.get(`${API_URL}/wishlist`)
    return data;
})

export const addInBag = createAsyncThunk('product/addInBag', async (productId) => {
    const { data } = await axios.post(`${API_URL}/wishlist/${productId}`)
    return data;
})

export const removeFromBag = createAsyncThunk('product/removeFromBag', async (productId) => {
    const { data } = await axios.delete(`${API_URL}/wishlist/${productId}`)
    return data;
});

const initialState = {
    products: [],
    cart: [],
    bag: [],
    categories: [],
    cartSize: 0,
    bagSize: 0,
    loading: false,
    message: null,
    cartMessage: null,
    wishlistMessage: null,
    initialData: [],
    filterBySort: "",
    filterCategoryData: []
}

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        addProductInCart: (state, action) => {
            state.cart.push(action.payload)
        },
        setMessage: (state, action) => {
            state[action.payload] = null;
        },
        resetCart: (state) => {
            state.cart = []
        },
        resetCartSize: () => {
            state.cartSize = 0;
        },
        sortProducts: (state, action) => {
            state.filterBySort = action.payload
        },
        setProducts: (state, action) => {
            state.products = action.payload;
        },
        filterProducts: (state, action) => {
            const { id, status } = action.payload;
            state.filterCategoryData = status ? [...state.filterCategoryData, id] : state.filterCategoryData.filter(i => i !== id)
        },
        clearFilters: (state) => {
            state.products = state.initialData;
            state.filterBySort = "";
            state.filterCategoryData = [];
        }
    },
    extraReducers: {
        [fetchProducts.pending]: (state) => {
            state.loading = true;
        },
        [fetchProducts.fulfilled]: (state, action) => {
            const { response } = action.payload;
            state.products = response;
            state.initialData = response;
            state.loading = false;
        },
        [fetchProducts.rejected]: (state) => {
            state.loading = false;
            state.message = "error while fetching products,check your internet connection";
        },
        [fetchCategories.fulfilled]: (state, action) => {
            const { response } = action.payload;
            state.categories = response;
        },
        [fetchCartData.fulfilled]: (state, action) => {
            const { products } = action.payload.response;
            state.cart = products;
            state.cartSize = products.length;
            function getProductQuantity(id) {
                const product = products.find(i => i.productId === id)
                return product.quantity
            }
            const productInCart = (product) => products.find(i => i.productId === product._id)
            state.products = state.products.map(product => {
                if (productInCart(product)) {
                    product['isInCart'] = true;
                    product['quantity'] = getProductQuantity(product._id)
                    return product;
                }
                return product;
            });
        },
        [fetchCartData.rejected]: (state) => {
            state.message = "error while fetching cart products,check your internet connection";
        },
        [fetchBag.rejected]: (state) => {
            state.message = "error while fetching cart products,check your internet connection";
        },
        [addInCart.fulfilled]: (state, action) => {
            const { message, productDetails } = action.payload;
            const { productId } = productDetails;
            state.cartMessage = message;
            state.cart.push(productId)
            state.cartSize = state.cartSize + 1;
            state.products = state.products.map(i => {
                if (i._id === productId) {
                    i['isInCart'] = true;
                    return i
                }
                return i
            })
        },
        [addInCart.rejected]: (state) => {
            state.cartMessage = "error while adding product in cart,check your internet connection";
        },
        [removeFromCart.fulfilled]: (state, action) => {
            const { message, productId } = action.payload;
            state.cartSize = state.cartSize - 1;
            state.cartMessage = message;
            state.cart = state.cart.filter(i => i.productId !== productId)
            state.products.find(i => {
                if (i._id === productId) {
                    i.isInCart = false;
                }
            })
        },
        [removeFromCart.rejected]: (state) => {
            state.cartMessage = "error while removing product in cart,check your internet connection";
        },
        [updateInCart.fulfilled]: (state, action) => {
            const { message, productDetails } = action.payload;
            const { productId, quantity } = productDetails;
            state.cartMessage = message;
            state.products = state.products.map(i => {
                if (i._id === productId) {
                    i['quantity'] = quantity;
                    return i
                }
                return i
            })
        },
        [fetchBag.fulfilled]: (state, action) => {
            const { products } = action.payload.response;
            state.bag = products;
            state.bagSize = products.length;
            state.products = state.products.map(product => {
                if (products.includes(product._id)) {
                    product['isInBag'] = true;
                    return product;
                }
                return product;
            });
        },
        [addInBag.fulfilled]: (state, action) => {
            const { message, productId } = action.payload;
            state.message = message;
            state.bag.push(productId)
            state.bagSize = state.bagSize + 1;
            state.products = state.products.map(i => {
                if (i._id === productId) {
                    i['isInBag'] = true;
                    return i
                }
                return i
            })
        },
        [removeFromBag.fulfilled]: (state, action) => {
            const { message, productId } = action.payload;
            state.message = message;
            state.bagSize = state.bagSize - 1;
            state.bag = state.bag.filter(i => i !== productId)
            state.products = state.products.map(i => {
                if (i._id === productId) {
                    i['isInBag'] = false;
                    return i
                }
                return i
            })
        },

    }
});

export const { addProductInCart, setMessage, resetCart, resetCartSize, sortProducts, setProducts, filterProducts, clearFilters } = productSlice.actions;
export default productSlice.reducer;