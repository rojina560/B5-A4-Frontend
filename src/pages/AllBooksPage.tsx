import { useState } from "react";
import { Link } from "react-router";
import MainContainer from "@/layouts/MainContainer";
import { useGetAllBooksQuery } from "@/redux/api/baseApi";
import type { IBook } from "@/types/types";
import { BounceLoader } from "react-spinners";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
    PaginationEllipsis,
} from "@/components/ui/pagination";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import DeleteBookModal from "@/elements/modals/DeleteBookModal";
import UpdateBookModal from "@/elements/modals/UpdateBookModal";
import BorrowModal from "@/elements/modals/BorrowModal";

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
                    <div className="w-full overflow-x-auto mb-10 rounded-lg border border-gray-300 shadow-sm">
                        <table className="min-w-full w-full table-auto border-collapse rounded-md shadow">
                            <thead className="bg-main/5 text-left sticky top-0 z-10">
                                <tr>
                                    <th className="px-4 py-3 text-sm font-semibold text-main uppercase whitespace-nowrap min-w-max">Title</th>
                                    <th className="px-4 py-3 text-sm font-semibold text-main uppercase whitespace-nowrap min-w-max">Author</th>
                                    <th className="px-4 py-3 text-sm font-semibold text-main uppercase whitespace-nowrap min-w-max">Genre</th>
                                    <th className="px-4 py-3 text-sm font-semibold text-main uppercase whitespace-nowrap min-w-max">ISBN</th>
                                    <th className="px-4 py-3 text-sm font-semibold text-main uppercase min-w-[200px]">Description</th>
                                    <th className="px-4 py-3 text-sm font-semibold text-main uppercase whitespace-nowrap min-w-max">Copies</th>
                                    <th className="px-4 py-3 text-sm font-semibold text-main uppercase whitespace-nowrap min-w-max">Status</th>
                                    <th className="px-4 py-3 text-sm font-semibold text-main uppercase whitespace-nowrap min-w-max text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 text-sm">
                                {paginatedBooks.map((book) => (
                                    <tr key={book._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-4 py-2 whitespace-nowrap min-w-max">{book.title}</td>
                                        <td className="px-4 py-2 whitespace-nowrap min-w-max">{book.author}</td>
                                        <td className="px-4 py-2 whitespace-nowrap min-w-max">{book.genre}</td>
                                        <td className="px-4 py-2 whitespace-nowrap min-w-max">{book.isbn}</td>
                                        <td className="px-4 py-3 whitespace-normal break-words font-caveat">
                                            {book.description
                                                ? book.description.length > 50
                                                    ? book.description.slice(0, 50) + "..."
                                                    : book.description
                                                : "No description"}
                                        </td>
                                        <td className="px-4 py-2 whitespace-nowrap min-w-max">{book.copies}</td>
                                        <td className="px-4 py-2 whitespace-nowrap min-w-max ">
                                            {book.available ? (
                                                <span className="text-green-600">Available</span>
                                            ) : (
                                                <span className="text-red-500">Unavailable</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-2 whitespace-nowrap min-w-max">
                                            <div className="flex flex-wrap gap-2">
                                                {/* Edit */}
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <button
                                                            className="text-yellow-500 hover:text-yellow-600 transition-transform hover:scale-110"
                                                            aria-label="Edit"
                                                        >
                                                            <FaEdit />
                                                        </button>
                                                    </DialogTrigger>
                                                    <UpdateBookModal book={book} />
                                                </Dialog>

                                                {/* Delete */}
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <button
                                                            className="text-red-600 hover:text-red-700 transition-transform hover:scale-110"
                                                            aria-label="Delete"
                                                        >
                                                            <FaTrash />
                                                        </button>
                                                    </DialogTrigger>
                                                    <DeleteBookModal bookId={book._id} />
                                                </Dialog>

                                                {/* Borrow */}
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <button className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-xs">
                                                            Borrow
                                                        </button>
                                                    </DialogTrigger>
                                                    <BorrowModal book={book} />
                                                </Dialog>

                                                {/* Details */}
                                                <Link to={`/books/${book._id}`}>
                                                    <button className="bg-main hover:bg-purple-800 text-white px-2 py-1 rounded text-xs">
                                                        Details
                                                    </button>
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center mb-10">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        href="#"
                                        onClick={() => handlePageChange(currentPage - 1)}
                                    />
                                </PaginationItem>

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
        </MainContainer>
    );
}
