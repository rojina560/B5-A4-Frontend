export default function BannerElement() {
    return (
        <div
            className="relative h-[40vh] sm:h-[50vh] md:h-[60vh] xl:h-[70vh] bg-fixed bg-center bg-cover flex items-center justify-center"
            style={{
                backgroundImage: "url('/Banner.jpg')",
            }}
        >
            <div className="absolute inset-0 bg-black/50 z-0" />

            <div className="relative z-10 text-center px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-6 sm:py-10">
                <h2 className="text-white text-base sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl font-semibold mb-4 sm:mb-6 font-meddon leading-snug">
                    "A reader lives a thousand lives before he dies... The man who never reads lives only one."
                </h2>

                <button className="mt-2 sm:mt-4 bg-purple-700 hover:bg-purple-800 text-white font-semibold px-5 sm:px-6 md:px-8 py-2 sm:py-3 rounded-full shadow-lg transition-transform hover:scale-105 text-sm sm:text-base md:text-lg">
                    See All Books
                </button>
            </div>
        </div>
    );
}
