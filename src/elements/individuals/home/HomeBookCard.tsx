import { Link } from "react-router";
import type { IBook } from "@/types/types";

interface BookCardProps {
    book: IBook;
}

export default function HomeBookCard({ book }: BookCardProps) {
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
                <div className="flex justify-between mt-2">
                    <p className="text-xs md:text-sm mb-1">
                        Copies: <span className="font-medium">{book.copies}</span>
                    </p>
                    <p
                        className={`text-xs md:text-sm font-semibold ${book.available ? "text-green-600" : "text-red-500"
                            }`}
                    >
                        {book.available ? "Available" : "Not Available"}
                    </p>
                </div>
                <Link to="/books">
                    <button className="bg-main hover:bg-purple-800 text-white px-5 py-2 sm:py-2 w-full mt-4 rounded-md shadow-lg transition-transform hover:scale-101">
                        View Book
                    </button>
                </Link>
            </div>
        </div>
    );
}
