import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const bookApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://b5-a4-backend-sazid.vercel.app/api" }),
    tagTypes: ["Book"],
    endpoints: (builder) => ({
        getAllBooks: builder.query({
            query: () => "/books",
            providesTags: ["Book"],
        }),

        getSingleBook: builder.query({
            query: (id: string) => `/books/${id}`,
        }),

        addBook: builder.mutation({
            query: (bookData) => ({
                url: "/books",
                method: "POST",
                body: bookData,
            }),
            invalidatesTags: ["Book"],
        }),

        deleteBook: builder.mutation({
            query: (id: string) => ({
                url: `/books/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Book"],
        }),

        updateBook: builder.mutation({
            query: ({ id, ...updatedData }) => ({
                url: `/books/${id}`,
                method: "PUT",
                body: updatedData,
            }),
            invalidatesTags: ["Book"],
        }),
        getBorrowSummary: builder.query({
            query: () => '/borrow',
            providesTags: ["Book"],
        }),
        borrowBook: builder.mutation({
            query: (borrowData) => ({
                url: "/borrow",
                method: "POST",
                body: borrowData,
            }),
            invalidatesTags: ["Book"],
        }),
    }),
});

export const {
    useGetAllBooksQuery,
    useGetSingleBookQuery,
    useAddBookMutation,
    useDeleteBookMutation,
    useUpdateBookMutation,
    useBorrowBookMutation,
    useGetBorrowSummaryQuery
} = bookApi;
