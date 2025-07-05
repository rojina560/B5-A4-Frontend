import { FaEdit, FaTrash } from "react-icons/fa";
import type { IBookCardProps } from "@/types/types";
import { Link } from "react-router";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import DeleteBookModal from "@/elements/modals/DeleteBookModal";
import UpdateBookModal from "@/elements/modals/UpdateBookModal";
import BorrowModal from "@/elements/modals/BorrowModal";





export default function AllBookCard({ book }: IBookCardProps) {

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow flex flex-col">
            <div className="p-4 flex flex-col flex-grow justify-between">
                <div className="text-center">
                    <h3 className="text-base font-semibold min-h-[3rem]">{book.title}</h3>
                    <p className="md:text-lg text-gray-500 font-caveat mb-2 min-h-[4rem]">
                        {book.description
                            ? book.description.length > 70
                                ? book.description.slice(0, 60) + "..."
                                : book.description
                            : "No description available"}
                    </p>
                    <p className="text-xs md:text-sm mb-1">
                        <span className="font-bold">ISBN :</span> {book.isbn}
                    </p>
                    <p className="text-xs md:text-sm mb-1">
                        <span className="font-bold">Author :</span> {book.author}
                    </p>
                    <p className="text-xs md:text-sm mb-2">
                        <span className="font-bold">Genre :</span> {book.genre}
                    </p>
                </div>
                <div className="flex justify-between mt-2 mb-4">
                    <p className="text-xs md:text-sm mb-1">
                        Copies: <span className="font-medium">{book.copies}</span>
                    </p>
                    <p
                        className={`text-xs md:text-sm font-semibold ${book.available ? "text-green-600" : "text-red-500"
                            }`}
                    >
                        {book.available ? "Available" : "Unavailable"}
                    </p>
                </div>

                {/* Buttons Row */}
                <div className="flex justify-between items-center space-x-4">
                    {/* Left side: Edit & Delete Icons */}
                    <div className="flex space-x-3">

                        <div className="flex space-x-3">
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
                        </div>
                        {/* delete */}
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

                    {/* Right side: Borrow & View */}
                    <div className="flex space-x-2">
                        <Dialog>
                            <DialogTrigger asChild>
                                <button className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded-md shadow transition-transform hover:scale-105">
                                    Borrow
                                </button>
                            </DialogTrigger>
                            <BorrowModal book={book} />
                        </Dialog>

                        <Link to={`/books/${book._id}`}>
                            <button className="bg-main hover:bg-purple-800 text-white px-2 py-1 rounded-md shadow transition-transform hover:scale-105">
                                Details
                            </button>
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    );
}
