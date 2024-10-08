import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchFaq = createAsyncThunk(
    "faq/fetchFaq",
    async () => {
        const response = await axios.get("/faq.json");
        return response.data.faqs;
    }
);


const faqSlice = createSlice({
   name : "faq",
   initialState: {
    faqs: [],
    status: "idle",
    error: null,
   },
   reducers: {},
   extraReducers: (builder) =>{
  builder
  .addCase(fetchFaq.pending, (state) =>{
    state.status = "loading";
  })
  .addCase(fetchFaq.fulfilled,(state,action) =>{
    state.status = "succeeded";
    state.faqs = action.payload;
  })
  .addCase(fetchFaq.rejected,(state,action)=>{
    state.status ="failed";
    state.error=action.error.message;

  });

   }
   

    
});

export default faqSlice.reducer;