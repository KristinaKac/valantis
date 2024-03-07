import { configureStore } from '@reduxjs/toolkit';
import { productReducer } from './slices/productAPI';

const store = configureStore({
    reducer: {
        productReducer
    }
})

export default store;