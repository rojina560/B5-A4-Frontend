import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

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
                body: bookData
            }),
            invalidatesTags: ["Book"],
        })
    }),
})

export const { useGetAllBooksQuery, useGetSingleBookQuery, useAddBookMutation } = bookApi;
