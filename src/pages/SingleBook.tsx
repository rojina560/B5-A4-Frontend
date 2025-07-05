import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import BorrowModal from "@/elements/modals/BorrowModal";
import DeleteBookModal from "@/elements/modals/DeleteBookModal";
import UpdateBookModal from "@/elements/modals/UpdateBookModal";
import { useGetSingleBookQuery } from "@/redux/api/baseApi";
import type { IApiError } from "@/types/types";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useParams, Link } from "react-router";
import { BounceLoader } from "react-spinners";


export default function SingleBook() {
    const { id } = useParams();
    const { data, isLoading, isError, error } = useGetSingleBookQuery(id as string);

    if (isLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <BounceLoader color="#cebaec" size={80} />
            </div>
        );
    }

    const err = error as IApiError;

    if (isError) {
        return (
            <div className="min-h-screen flex justify-center items-center text-red-600 px-4 text-center">
                {err?.data?.message || "Failed to load book details."}
            </div>
        );
    }

    const book = data.data;

    return (
        <div className="max-w-4xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-10 text-center">
                <h1 className="text-3xl sm:text-4xl font-extrabold">
                    {book.title}
                </h1>
                <p className="text-lg sm:text-xl mt-2">
                    <span className="font-semibold">Author:</span> {book.author}
                </p>
            </div>

            {/* Book Details Card */}
            <div className="bg-white shadow-lg rounded-lg p-6 sm:p-10 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm sm:text-base">
                    <div className="text-center lg:text-left">
                        <p><span className="font-semibold">ISBN:</span> {book.isbn}</p>
                        <p className="mt-2"><span className="font-semibold">Genre:</span> {book.genre}</p>
                        <p className="mt-2"><span className="font-semibold">Copies:</span> {book.copies}</p>
                        <p className={`mt-2 ${book.available ? "text-green-600" : "text-red-500"}`}>
                            <span className="font-semibold text-black">Status:</span> {book.available ? "Available " : "Unavailable"}
                        </p>
                    </div>

                    <div className="text-center lg:text-left">
                        <h2 className="font-semibold mb-2">Description</h2>
                        <p className="text-gray-700 min-h[8rem] font-caveat">
                            {book.description || "No description available."}
                        </p>
                    </div>
                </div>

                {/* Action Buttons */}
                {/* <div className="flex flex-col sm:flex-row justify-center mt-8">
                    <div className="flex gap-4 justify-center sm:justify-end">
                        <Dialog>
                            <DialogTrigger asChild>
                                <button className="px-3 py-2 rounded-md bg-main text-white font-semibold hover:bg-purple-800 transition">
                                    Borrow
                                </button>
                            </DialogTrigger>
                            <BorrowModal book={book} />
                        </Dialog>
                        <Link to="/books">
                            <button className="px-3 py-2 rounded-md bg-gray-300 text-gray-700 font-semibold hover:bg-gray-400 transition">
                                Back to List
                            </button>
                        </Link>
                    </div>
                </div> */}
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-8 gap-4 flex-wrap">
                    {/* Edit & Delete */}
                    <div className="flex justify-center sm:justify-start gap-4">
                        <Dialog>
                            <DialogTrigger asChild>
                                <button
                                    aria-label="Edit book"
                                    className="text-yellow-500 hover:text-yellow-600 transition-transform hover:scale-110"
                                >
                                    <FaEdit size={22} />
                                </button>
                            </DialogTrigger>
                            <UpdateBookModal book={book} />
                        </Dialog>

                        <Dialog>
                            <DialogTrigger asChild>
                                <button
                                    aria-label="Delete book"
                                    className="text-red-600 hover:text-red-700 transition-transform hover:scale-110"
                                >
                                    <FaTrash size={18} />
                                </button>
                            </DialogTrigger>
                            <DeleteBookModal bookId={book._id} />
                        </Dialog>
                    </div>

                    {/* Borrow & Back */}
                    <div className="flex justify-center sm:justify-end gap-4 flex-wrap">
                        <Dialog>
                            <DialogTrigger asChild>
                                <button className="px-4 py-2 rounded-md bg-main text-white font-semibold hover:bg-purple-800 transition">
                                    Borrow
                                </button>
                            </DialogTrigger>
                            <BorrowModal book={book} />
                        </Dialog>

                        <Link to="/books">
                            <button className="px-4 py-2 rounded-md bg-gray-300 text-gray-700 font-semibold hover:bg-gray-400 transition">
                                Back to List
                            </button>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
}
