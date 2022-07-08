import { configureStore } from '@reduxjs/toolkit';
import authorReducer from '../features/author/authorSlice';
import genresReducer from '../features/genres/genresSlice';
import authReducer from '../features/auth/authSlice';
import bookReducer from '../features/books/bookSlice';
import orderReducer from '../features/orders/orderSlice'

export const store = configureStore({
  reducer: {
    auth:authReducer,
    author: authorReducer,
    genre:genresReducer,
    book:bookReducer,
    order:orderReducer
  },
});
