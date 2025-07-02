import { Link } from "react-router";
import BannerElement from "@/elements/individuals/home/BannerElement";
import MainContainer from "@/layouts/MainContainer";

// ✅ Updated recent books using your new format
const recentBooks = [
    {
        _id: "6857c607b0a419163470b7aa",
        title: "Cosmos",
        author: "Carl Sagan",
        genre: "SCIENCE",
        isbn: "9780345539438",
        description: "A journey through space and time by Carl Sagan.",
        copies: 3,
        available: true,
        createdAt: "2025-06-20T12:00:00Z",
        updatedAt: "2025-06-25T08:30:00Z",
    },
    {
        _id: "6857c607b0a419163470b7ab",
        title: "Sapiens: A Brief History of Humankind",
        author: "Yuval Noah Harari",
        genre: "HISTORY",
        isbn: "9780062316097",
        description: "Explores the history and evolution of humans.",
        copies: 15,
        available: true,
        createdAt: "2025-06-22T08:59:51.393Z",
        updatedAt: "2025-07-01T18:42:55.318Z",
    },
    {
        _id: "6857c607b0a419163470b7ac",
        title: "The Selfish Gene",
        author: "Richard Dawkins",
        genre: "BIOLOGY",
        isbn: "9780199291151",
        description: "A groundbreaking work on evolutionary biology.",
        copies: 2,
        available: true,
        createdAt: "2025-06-21T11:20:00Z",
        updatedAt: "2025-06-28T10:00:00Z",
    },
    {
        _id: "6857c607b0a419163470b7ad",
        title: "Thinking, Fast and Slow",
        author: "Daniel Kahneman",
        genre: "PSYCHOLOGY",
        isbn: "9780374533557",
        description: "An exploration of human thought and decision-making.",
        copies: 4,
        available: false,
        createdAt: "2025-06-23T15:10:00Z",
        updatedAt: "2025-07-01T09:45:00Z",
    },
];

export default function HomePage() {
    return (
        <div>
            {/* Banner */}
            <BannerElement />

            {/* Main Content */}
            <MainContainer>
                {/* Header */}
                <div className="text-center my-10 px-4">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
                        Recently Released Books
                    </h1>
                    <h2 className="text-base md:text-lg text-gray-600">
                        Explore the latest additions to our collection
                    </h2>
                </div>

                {/* Book Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 px-4">
                    {recentBooks.map((book) => (
                        <div
                            key={book._id}
                            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow flex flex-col"
                        >
                            {/* <img
                                src="/DummyBook.jpg"
                                alt={book.title}
                                className="w-full h-52 object-cover"
                            /> */}
                            <div className="p-4 flex flex-col flex-grow justify-between">
                                <div className="text-center">
                                    <h3 className=" text-base font-semibold min-h-[3rem] text-center">
                                        {book.title}
                                    </h3>
                                    <p className="md:text-lg text-gray-500 font-caveat mb-2 min-h-[4rem]">
                                        {book.description.length > 70
                                            ? book.description.slice(0, 60) + "..."
                                            : book.description}
                                    </p>
                                    <p className="text-xs md:text-sm mb-1"> <span className="font-bold">Author :</span> {book.author}</p>
                                    <p className="text-xs md:text-sm mb-2"><span className="font-bold">Genre :</span> {book.genre}</p>
                                </div>
                                <div className="flex justify-between mt-2 ">
                                    <p className="text-xs md:text-sm mb-1">
                                        Copies: <span className="font-medium">{book.copies}</span>
                                    </p>
                                    <p className={`text-xs md:text-sm font-semibold  ${book.available ? "text-green-600" : "text-red-500"}`}>
                                        {book.available ? "Available" : "Not Available"}
                                    </p>
                                </div>
                                <div>
                                    <Link to={"/books"}>
                                        <button className=" bg-main hover:bg-purple-800 text-white px-5  py-2 sm:py-2 w-full mt-4 rounded-md shadow-lg transition-transform hover:scale-101">
                                            View Book
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>

                {/* See All Button */}
                <div className="text-center mb-16">
                    <Link to="/books">
                        <button className="bg-main hover:bg-purple-800 text-white px-5 py-2 sm:py-3 rounded-md shadow-lg transition-transform hover:scale-105">
                            See More
                        </button>
                    </Link>
                </div>
            </MainContainer>
        </div>
    );
}
