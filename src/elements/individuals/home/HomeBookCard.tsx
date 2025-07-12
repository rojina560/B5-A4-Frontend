import { Link } from "react-router";
import type { IBookCardProps } from "@/types/types";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import BorrowModal from "@/elements/modals/BorrowModal";



export default function HomeBookCard({ book }: IBookCardProps) {
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow flex flex-col">
            <div className="p-4 flex flex-col flex-grow justify-between">
                <div className="text-center">
                    <h3 className="text-base font-semibold min-h-[3rem]">{book.title}</h3>
                    <p className="md:text-lg text-gray-500 font-sans mb-2 min-h-[4rem]">
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
                <div className="flex justify-between mt-2">
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
                <div className="flex justify-between items-center space-x-2 mt-3">
                    <Dialog>
                        <DialogTrigger asChild>
                            <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-2 py-1 rounded-md shadow transition-transform hover:scale-105">
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
    );
}
