
import { useState } from "react";
import AllBookCard from "@/elements/individuals/allBooks/AllBookCard";
import MainContainer from "@/layouts/MainContainer";
import { useGetAllBooksQuery } from "@/redux/api/baseApi";
import type { IBook } from "@/types/types";
import { BounceLoader } from "react-spinners";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
    PaginationEllipsis,
} from "@/components/ui/pagination";

const ITEMS_PER_PAGE = 12;

export default function AllBooksPage() {
    const [currentPage, setCurrentPage] = useState(1);

    const { data, isLoading, isError } = useGetAllBooksQuery(undefined, {
        pollingInterval: 3000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    });

    const allBooks: IBook[] = data?.data ? [...data.data].reverse() : [];

    const totalPages = Math.ceil(allBooks.length / ITEMS_PER_PAGE);

    const paginatedBooks = allBooks.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <MainContainer>
            <div className="text-center my-10 px-4">
                <h1 className="text-xl md:text-3xl lg:text-4xl font-bold mb-2">
                    All Books
                </h1>
                <h2 className="text-base md:text-lg text-gray-600">
                    Browse our complete collection of books across all genres and
                    categories. Discover your next great read today!
                </h2>
            </div>

            <div>
                {isLoading ? (
                    <div className="flex justify-center items-center py-10">
                        <BounceLoader color="#cebaec" size={80} />
                    </div>
                ) : isError ? (
                    <div className="flex justify-center items-center text-red-600">
                        Failed to load books.
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 px-4">
                            {paginatedBooks.map((book) => (
                                <AllBookCard key={book._id} book={book} />
                            ))}
                        </div>

                        <div className="flex justify-center mb-10">
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            href="#"
                                            onClick={() => handlePageChange(currentPage - 1)}
                                        />
                                    </PaginationItem>

                                    {/* First Page */}
                                    <PaginationItem>
                                        <PaginationLink
                                            href="#"
                                            isActive={currentPage === 1}
                                            onClick={() => handlePageChange(1)}
                                        >
                                            1
                                        </PaginationLink>
                                    </PaginationItem>


                                    {currentPage > 2 && totalPages > 3 && (
                                        <PaginationItem>
                                            <PaginationEllipsis />
                                        </PaginationItem>
                                    )}

                                    {currentPage > 1 && currentPage < totalPages && (
                                        <PaginationItem>
                                            <PaginationLink
                                                href="#"
                                                isActive
                                                onClick={() => handlePageChange(currentPage)}
                                            >
                                                {currentPage}
                                            </PaginationLink>
                                        </PaginationItem>
                                    )}

                                    {/* Last Page */}
                                    {totalPages > 1 && (
                                        <PaginationItem>
                                            <PaginationLink
                                                href="#"
                                                isActive={currentPage === totalPages}
                                                onClick={() => handlePageChange(totalPages)}
                                            >
                                                {totalPages}
                                            </PaginationLink>
                                        </PaginationItem>
                                    )}

                                    <PaginationItem>
                                        <PaginationNext
                                            href="#"
                                            onClick={() => handlePageChange(currentPage + 1)}
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    </>
                )}
            </div>
        </MainContainer>
    );
}
