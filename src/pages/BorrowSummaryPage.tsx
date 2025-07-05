'use client';

import { BounceLoader } from 'react-spinners';
import { useGetBorrowSummaryQuery } from '@/redux/api/baseApi';
import type { BorrowSummaryEntry, IApiError } from '@/types/types';

export default function BorrowSummaryPage() {
    const { data, isLoading, isError, error } = useGetBorrowSummaryQuery(undefined);

    const err = error as IApiError;
    const summaryList: BorrowSummaryEntry[] = data?.data || [];
    // const reversedSummaryList = [...summaryList].reverse();

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <div className="text-center my-10 px-4 max-w-4xl mx-auto">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-2 text-gray-900">
                    Book Borrow Summary
                </h1>
                <h2 className="text-base sm:text-lg md:text-xl text-gray-600 max-w-xl mx-auto">
                    Explore the latest additions to our collection
                </h2>
            </div>


            {isLoading ? (
                <div className="flex justify-center items-center py-20">
                    <BounceLoader color="#8b5cf6" size={80} />
                </div>
            ) : isError ? (
                <div className="text-center text-red-600 text-lg mb-10">
                    {err?.data?.message || 'Failed to load borrow summary.'}
                </div>
            ) : summaryList.length === 0 ? (
                <p className="text-center text-gray-500 text-lg">No borrow data available.</p>
            ) : (
                <>
                    {/* Table for md+ screens */}
                    <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-300 shadow-sm">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-main/5">
                                <tr className='text-sm'>
                                    <th className="px-6 py-3 text-left  font-semibold text-main uppercase ">
                                        Title
                                    </th>
                                    <th className="px-6 py-3 text-left  font-semibold text-main uppercase ">
                                        ISBN
                                    </th>
                                    <th className="px-6 py-3 text-right font-semibold text-main uppercase">
                                        Total Borrowed
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100 text-sm">
                                {summaryList.map((entry) => (
                                    <tr
                                        key={entry.book.isbn}
                                        className="hover:bg-gray-50 transition-colors cursor-pointer"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap ">
                                            {entry.book.title}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap ">{entry.book.isbn}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right  ">
                                            {entry.totalQuantity}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Cards for small screens */}
                    <div className="md:hidden space-y-5">
                        {summaryList.map((entry) => (
                            <div
                                key={entry.book.isbn}
                                className="border border-gray-300 rounded-lg p-5 shadow hover:shadow-lg transition-shadow bg-white"
                            >
                                <h2 className="text-lg font-semibold text-purple-700 truncate">{entry.book.title}</h2>
                                <p className="text-gray-600 mt-1 truncate">
                                    <span className="font-semibold">ISBN:</span> {entry.book.isbn}
                                </p>
                                <p className="text-right font-bold text-gray-900 text-xl mt-3">
                                    {entry.totalQuantity}
                                </p>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
