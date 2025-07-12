import { Link } from "react-router";

export default function BannerElement() {
    return (
        <div
            className="relative h-[40vh] sm:h-[50vh] md:h-[60vh] xl:h-[70vh] bg-fixed bg-center bg-cover flex items-center justify-center"
            style={{
                backgroundImage: "url('/library-cover.jpeg')",
            }}
        >
            <div className="absolute inset-0 bg-black/50 z-0" />

            <div className="relative z-10 text-center px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-6 sm:py-10">
                <h2 className="text-white text-base sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl font-semibold mb-4 sm:mb-6 font-caveat leading-snug">
                    "Books are the windows to worlds unseen, and readers the travelers of infinite journeys.
                </h2>

                <Link to={"/books"}>
                    <button className=" bg-main hover:bg-purple-800 text-white px-5  py-2 sm:py-3 rounded-md shadow-lg transition-transform hover:scale-101">
                        See Books
                    </button>
                </Link>
            </div>
        </div>
    );
}
