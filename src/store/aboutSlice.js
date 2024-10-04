import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk oluşturulması - verileri çekmek için
export const fetchAbout = createAsyncThunk(
    "about/fetchAbout",
    async () => {
        const response = await axios.get("/about.json");
        return response.data;
    }
)

const aboutSlice = createSlice({
    name: "about",
    initialState: {
        about: {},
        headings: {},
        content:{},
        status: "idle",
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAbout.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchAbout.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.about = action.payload;
                state.headings = action.payload.headings;
                state.content = action.payload.content;
            })
            .addCase(fetchAbout.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    }
});

export default aboutSlice.reducer;
