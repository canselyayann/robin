import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios';
import alertify from 'alertifyjs';
import productSlice from './productSlice';

export const CartItemFetch = createAsyncThunk(
    "CartItems/fetchCartItems",
    async () => {
        const response = await axios.get("/cart.json")
        return response.data;
    }
)

const cartItemSlice = createSlice({
name:"cart",
initialState:{
    cartItems:[],
    status:"idle",
    error:null,
    productid:0
},
reducers: {
    addToCart: (state, action) => {
      const  product  = action.payload;
      let newCart = [...state.cartItems];
      const addedItem = newCart.find((c) => c.product.id === product.id);
  
      if (addedItem) {
        // Eğer ürün zaten varsa, miktarı artırın
        addedItem.quantity += 1;
        alertify.success("Sepetinizdeki "+product.title + " miktarı 1 adet artırıldı!");
      } else {
        console.log(product);
        // Eğer ürün sepette yoksa, sepete ekleyin
        newCart.push({ product: product, quantity: 1 });
        alertify.success(product.title + " sepetinize eklendi!");
      }
     state.cartItems= newCart;
      // Yeni durumu döndürün
     console.log(state.cartItems);
    },
    removeToCart: (state,action)=>{
    const product = action.payload;
    const newCart = state.cartItems.filter((c) => c.product.id !== product.id);
    state.cartItems=(newCart);
    alertify.error(product.title + " removed from cart!");
    }
  },
  
extraReducers: (builder)=>{
    builder 
    .addCase(CartItemFetch.pending,(state)=>{
        state.status="loading";
    })
    .addCase(CartItemFetch.fulfilled,(state,action)=>{
        state.status="succeeded";
        state.cartItems=action.payload;
    })
    .addCase(CartItemFetch.rejected,(state,action)=>{
    state.status="failed";
    state.error=action.error.message;       
})
}
})

export const {addToCart,removeToCart} = cartItemSlice.actions;
export default cartItemSlice.reducer;