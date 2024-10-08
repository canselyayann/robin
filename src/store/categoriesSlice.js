import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Kategorileri fetch eden thunk
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const response = await axios.get("/categories.json");
    console.log(response.data);
    return response.data;
  }
);

// Kategori slice'ını oluşturma
const categorySlice = createSlice({
  name: "category",
  initialState: {
    status: 'idle',
    error: null,
    categories: [] 
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded"; // 'succeded' yerine 'succeeded'
        state.categories = action.payload.categories; 
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  }
});

export default categorySlice.reducer;
