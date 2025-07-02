import AllBookCard from "@/elements/individuals/allBooks/AllBookCard";
import MainContainer from "@/layouts/MainContainer";
import { useGetAllBooksQuery } from "@/redux/api/baseApi";
import type { IBook } from "@/types/types";
import { BounceLoader } from "react-spinners";

export default function AllBooksPage() {
    const { data, isLoading, isError } = useGetAllBooksQuery(undefined, {
        pollingInterval: 3000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    });


    const books: IBook[] = data?.data
        ? [...data.data].reverse()
        : [];

    return (
        <MainContainer>
            <div>
                {/* Header */}
                <div className="text-center my-10 px-4">
                    <h1 className="text-xl md:text-3xl lg:text-4xl font-bold mb-2">
                        All Books
                    </h1>
                    <h2 className="text-base md:text-lg text-gray-600">
                        Browse our complete collection of books across all genres and categories. Discover your next great read today!
                    </h2>
                </div>
            </div>

            <div>

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
                                <AllBookCard key={book._id} book={book} />
                            ))}
                        </div>
                    )}
            </div>
        </MainContainer>
    )
}
