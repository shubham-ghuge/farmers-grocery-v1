import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const API_URL = "https://farmers-grocery-v2.herokuapp.com";

export const fetchProducts = createAsyncThunk('product/fetchProducts', async () => {
    const { data } = await axios.get(`${API_URL}/products`);
    return data;
})

export const fetchCartData = createAsyncThunk('product/fetchCartData', async () => {
    const { data } = await axios.get(`${API_URL}/cart`);
    return data;
})

export const fetchWishlistData = createAsyncThunk('product/fetchWishlistData', async () => {
    const { data } = await axios.get(`${API_URL}/wishlist`);
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

const initialState = {
    products: [],
    cart: [],
    bag: [],
    loading: false,
    message: null
}

const productSlice = createSlice({
    name: "product",
    initialState,
    reducer: {
        addProductInCart: (state, action) => {
            state.cart.push(action.payload)
        }
    },
    extraReducers: {
        [fetchProducts.pending]: (state) => {
            state.loading = true;
        },
        [fetchProducts.fulfilled]: (state, action) => {
            state.products = action.payload.response;
            state.loading = false;
        },
        [fetchProducts.rejected]: (state) => {
            state.loading = false;
            state.message = "error while fetching products,check your internet connection";
        },
        [fetchCartData.fulfilled]: (state, action) => {
            const { products } = action.payload.response;
            state.cart = products;
            const cartProductIds = products.map(i => i.productId);
            state.products = state.products.map(product => {
                if (cartProductIds.includes(product._id)) {
                    product['isInCart'] = true;
                    product['quantity'] = 1;
                    return product;
                }
                return product;
            });
        },
        [fetchCartData.rejected]: (state) => {
            state.message = "error while fetching cart products,check your internet connection";
        },
        [fetchWishlistData.fulfilled]: (state, action) => {
            state.bag = action.payload.response;
        },
        [fetchWishlistData.rejected]: (state) => {
            state.message = "error while fetching cart products,check your internet connection";
        },
        [addInCart.fulfilled]: (state, action) => {
            const { message, productDetails } = action.payload;
            const { productId } = productDetails
            state.message = message;
            state.cart.push(productId)
            state.products = state.products.map(i => {
                if (i._id === productId) {
                    i['isInCart'] = true;
                    return i
                }
                return i
            })
        },
        [addInCart.rejected]: (state) => {
            state.message = "error while adding product in cart,check your internet connection";
        },
        [removeFromCart.fulfilled]: (state, action) => {
            const { message, productId } = action.payload
            state.message = message;
            state.cart = state.cart.filter(i => i.productId !== productId)
            state.products.find(i => {
                if (i._id === productId) {
                    i.isInCart = false;
                }
            })
        },
        [removeFromCart.rejected]: (state) => {
            state.message = "error while removing product in cart,check your internet connection";
        },
        [updateInCart.fulfilled]: (state, action) => {
            const { message, productDetails } = action.payload;
            const { productId, quantity } = productDetails
            state.message = message;
            state.products = state.products.map(i => {
                if (i._id === productId) {
                    i['quantity'] = quantity;
                    return i
                }
                return i
            })
        },
    }
});

export const { addProductInCart } = productSlice.actions;
export default productSlice.reducer;