// src/redux/features/modal/modalSlice.ts
import type { IModalState } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";



const initialState: IModalState = {
    isAddBookModalOpen: false,
};

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        openAddBookModal: (state) => {
            state.isAddBookModalOpen = true;
        },
        closeAddBookModal: (state) => {
            state.isAddBookModalOpen = false;
        },
    },
});

export const { openAddBookModal, closeAddBookModal } = modalSlice.actions;

export default modalSlice.reducer;
