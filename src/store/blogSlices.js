import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBlogs = createAsyncThunk(
    "blogs/fetchBlogs",
    async () => {
        const response = await axios.get("/blogs.json");
        return response.data;
    }
);

const blogSlice = createSlice({
    name: "blogs",
    initialState: {
        blogs: [],
        status: "idle",
        error: null,
    },
    reducers: {
        filterBlogs: (state, action) => {
            const searchTerm = action.payload.toLowerCase();
            state.blogs = state.blogs.filter(blog =>
                blog.title.toLowerCase().includes(searchTerm)
            );
        }
    },
    extraReducers: (builder) =>{
    builder
    .addCase(fetchBlogs.pending,(state)=>{
        state.status = "loading";
    })
    .addCase(fetchBlogs.fulfilled,(state,action)=>{
        state.status = "succeeded";
        state.blogs = action.payload.blogs;
    })
    .addCase(fetchBlogs.rejected,(state,action)=>{
    state.status = "failed";
    state.error = action.error.message;
    })
    
    
    },
});

export const { filterBlogs } = blogSlice.actions;
export default blogSlice.reducer;