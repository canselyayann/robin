import {configureStore} from '@reduxjs/toolkit'
import faqReducer from './faqSlices';
import contactReducer from './contactSlices'
import blogReducer from './blogSlices'
import aboutReducer from './aboutSlice'
import productReducer from './productSlice';
import categoryReducer from './categoriesSlice';
import cartReducer from './cartSlice'
import wishReducer from './wishSlice'

export const store = configureStore({
reducer : {
 faqs : faqReducer,
 contact : contactReducer,
 blog : blogReducer,
 about : aboutReducer,
 product : productReducer,
 category:categoryReducer,
 cart:cartReducer,
 wish:wishReducer
},

});