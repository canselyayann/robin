import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import alertify from 'alertifyjs';

export const fetchWishs = createAsyncThunk(
    "wishs/fetchWishs",
    async () => {
        const response = await axios.get("/wishs.json");
        return await response.data;
    }
)

const WishSlices = createSlice({
    name: "wish",
    initialState: {
        wishs: [],
        status: "idle",
        error: null,

    },
    reducers: {


        addToWish: (state, action) => {
          const product  = action.payload;
          let wishCart = [...state.wishs];
          const addedItem = wishCart.find((c) => c.product.id === product.id);
      
          if (addedItem) {
            // Eğer ürün zaten varsa, miktarı artırın
            alertify.error("Favori listenizde zaten  "+product.title + " ürünü var!");
          } else {
          console.log("favorilere eklenmeye çalışılan ürün: ");
          console.log(product);
            wishCart.push({ product: product });
            alertify.success(product.title + " favorilerinize eklendi!");
            console.log("favoriler eklendi");
            console.log(state.wishs);
          }
          state.wishs= wishCart;


        },
        removeToWish: (state,action)=>{
           
            const product= action.payload;
            console.log("çıkartılacak ürün: ");
            console.log(product);
            let wishcartnew = [...state.wishs];
            const item = wishcartnew.find((c)=>c.product.id==product.id)
            if(item){
                wishcartnew=wishcartnew.filter((c)=>c.product.id!==product.id);
                alertify.success(product.title + " favorilerden çıkarıldı!");
                state.wishs= wishcartnew;
            }
            
        }


     
      },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWishs.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchWishs.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.wishs = action.payload;
            })
            .addCase(fetchWishs.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.error.message;
            })
    }

})


export const {addToWish,removeToWish} = WishSlices.actions;
export default WishSlices.reducer;