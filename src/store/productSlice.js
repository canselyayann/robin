import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk for fetching products
export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async () => {
        const response = await axios.get("/products.json");
        return response.data;
    }
);

const productSlice = createSlice({
    name: "products",
    initialState: {
        allproducts: [],  // Stores all products
        products: [],     // Stores filtered products
        status: "idle",
        error: null,
    },
    reducers: {
        filterProductsByCategoryId: (state, action) => {
            const categoryid = action.payload; // action.payload kategori ID'sini alır
            console.log("Filtreleme işlemi başladı, kategori id:" + categoryid);
            
            // state.allproducts dizisini doğru şekilde filtrelediğinizden emin olun
            if (categoryid) {
                if (categoryid === "on_sale") {
                    state.products = state.allproducts.filter(product =>
                        product.status.on_sale === true
                    );
                } else if (categoryid === "featured") {
                    state.products = state.allproducts.filter(product =>
                        product.status.featured === true
                    );
                } else if (categoryid === "new_arrival") {
                    state.products = state.allproducts.filter(product =>
                        product.status.new_arrival === true
                    );
                } else if (categoryid === "all") {
                    state.products = state.allproducts; // Tüm ürünleri göster
                } else {
                    console.log("Kategoriye yönlendiriliyor..");
                    state.products = state.allproducts.filter(product =>
                        product.categoryid==categoryid
                    );
                }
            }
        },
        setProducts: (state, action) => {
            state.allproducts = action.payload;
            state.products = action.payload; // Başlangıçta tüm ürünleri göster
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.allproducts = action.payload;
                state.products = action.payload; // İlk etapta tüm ürünleri göster
                console.log("Veriler yüklendi:", state.allproducts);

            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export const { filterProductsByCategoryId, setProducts } = productSlice.actions;
export default productSlice.reducer;
