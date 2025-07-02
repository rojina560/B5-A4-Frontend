import { Link } from "react-router";
import BannerElement from "@/elements/individuals/home/BannerElement";
import MainContainer from "@/layouts/MainContainer";
import { useGetAllBooksQuery } from "@/redux/api/baseApi";
import type { IBook } from "@/types/types";

import { BounceLoader } from "react-spinners";
import HomeBookCard from "@/elements/individuals/home/HomeBookCard";

export default function HomePage() {
    const { data, isLoading, isError } = useGetAllBooksQuery(undefined, {
        pollingInterval: 3000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    });


    const books: IBook[] = data?.data
        ? [...data.data].reverse().slice(0, 8)
        : [];


    return (
        <div>
            {/* Banner */}
            <BannerElement />

            {/* Main Content */}
            <MainContainer>
                {/* Header */}
                <div className="text-center my-10 px-4">
                    <h1 className="text-xl md:text-3xl lg:text-4xl font-bold mb-2">
                        Recently Released
                    </h1>
                    <h2 className="text-base md:text-lg text-gray-600">
                        Explore the latest additions to our collection
                    </h2>
                </div>

                {/* Book Cards or Loading */}
                {isLoading ? (
                    <div className="flex justify-center items-center py-10">
                        <BounceLoader color="#cebaec" size={80} />
                    </div>
                ) : isError ?
                    <div className="flex justify-center items-center text-red-600">
                        Failed to load books.
                    </div> : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 px-4">
                            {books.map((book) => (
                                <HomeBookCard key={book._id} book={book} />
                            ))}
                        </div>
                    )}

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


