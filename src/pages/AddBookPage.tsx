import { Link } from "react-router";
import MainContainer from "@/layouts/MainContainer";
import { useGetAllBooksQuery } from "@/redux/api/baseApi";
import { BounceLoader } from "react-spinners";
import type { IApiError, IBook } from "@/types/types";
import HomeBookCard from "@/elements/individuals/home/HomeBookCard";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import AddBookModal from "@/elements/modals/AddBookModal";
import { closeAddBookModal, openAddBookModal } from "@/redux/features/modalState/modalState";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import type { RootState } from "@/redux/store";
import { CircleFadingPlus } from "lucide-react";

export default function AddBookPage() {
    const dispatch = useAppDispatch();
    const open = useAppSelector((state: RootState) => state.modal.isAddBookModalOpen);

    const { data, isLoading, isError, error } = useGetAllBooksQuery(undefined, {
        pollingInterval: 3000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    });

    const books: IBook[] = data?.data
        ? [...data.data].reverse().slice(0, 8)
        : [];


    const err = error as IApiError;


    return (
        <MainContainer>
            <div
                className="relative h-[40vh] sm:h-[50vh] md:h-[60vh] xl:h-[70vh] bg-[url('/banner.jpeg')] bg-fixed bg-center bg-cover flex items-center justify-center rounded-xl overflow-hidden mb-10"
            >
                <div className="absolute inset-0 bg-black/50" />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4 z-10">
                    <h2 className="text-lg md:text-3xl lg:text-4xl font-bold mb-2">
                        Want to share a new book?
                    </h2>
                    <p className="mb-6 text-sm md:text-lg ">
                        Click below to add your book to the library collection
                    </p>
                    {/* for modal */}
                    <Dialog open={open} onOpenChange={(val) => !val && dispatch(closeAddBookModal())}>
                        <DialogTrigger asChild>
                            <button onClick={() => dispatch(openAddBookModal())} className="text-sm md:text-lg flex items-center gap-2 px-3 py-3 bg-main hover:bg-purple-800 transition rounded-lg text-white font-semibold shadow-lg">
                                <CircleFadingPlus />
                                Add Book
                            </button>
                        </DialogTrigger>
                        <AddBookModal />
                    </Dialog>

                </div>
            </div>

            {/* All Books Section */}
            <div className="text-center my-6">
                <h2 className="text-xl md:text-3xl lg:text-4xl font-bold mb-2">Recent Added Books</h2>
                <p className="text-base md:text-lg text-gray-600">Below is the list of all books in the collection</p>
            </div>

            <div>
                {isLoading ? (
                    <div className="flex justify-center items-center py-10">
                        <BounceLoader color="#cebaec" size={80} />
                    </div>
                ) : isError ?
                    <div className="flex justify-center items-center text-red-600 mb-6">
                        {err?.data?.message || "Failed to load book details."}
                    </div>
                    : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 px-4">
                            {books.map((book) => (
                                <HomeBookCard key={book._id} book={book} />
                            ))}
                        </div>
                    )}
            </div>
            {
                books.length > 7 ? <>
                    <div className="text-center mb-16">
                        <Link to="/books">
                            <button className="bg-main hover:bg-purple-800 text-white px-5 py-2 sm:py-3 rounded-md shadow-lg transition-transform hover:scale-105">
                                See More
                            </button>
                        </Link>
                    </div>
                </> : <> </>
            }
        </MainContainer>
    );
}
