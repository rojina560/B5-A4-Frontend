import { configureStore } from "@reduxjs/toolkit";
import { bookApi } from "./api/baseApi";

import modalReducer from "./features/modalState/modalState";


export const store = configureStore({
    reducer: {
        modal: modalReducer,
        [bookApi.reducerPath]: bookApi.reducer
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(bookApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch