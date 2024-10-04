import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for fetching contact data
export const fetchContact = createAsyncThunk(
  "contact/fetchContact",
  async () => {
    const response = await axios.get("/contact.json");
    return response.data; 
  }
);

const contactSlice = createSlice({
  name: "contact",
  initialState: {
    contact: [],
    newmail: [],
    maps: [],
    status: "idle",
    error: null,
  },
  reducers: {
    // Reducer to handle sending new mail
    sendToMail: (state, action) => {
      state.newmail.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContact.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchContact.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Make sure action.payload has 'contact' and 'maps' properties
        state.contact = action.payload.contact || [];
        state.maps = action.payload.maps || [];
      })
      .addCase(fetchContact.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { sendToMail } = contactSlice.actions; 
export default contactSlice.reducer; 
