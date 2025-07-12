import { Link, NavLink } from "react-router";
import { useState } from "react";
import { HiMenu } from "react-icons/hi";
import { HiX } from "react-icons/hi";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { to: "/", label: "Home" },
        { to: "/books", label: "All Books" },
        { to: "/create-book", label: "Add Book" },
        { to: "/borrow-summary", label: "Borrow Summary" },
    ];

    const toggleMenu = () => setIsMenuOpen(prev => !prev);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <>
            {/* Top Navbar */}
            <div className="fixed top-0 left-0 w-full z-50 px-3 sm:px-4 md:px-6 lg:px-10 xl:px-12 py-3 md:py-4 flex justify-between items-center backdrop-blur-xs bg-white/80 rounded-b-2xl border-b-1 shadow-lg">
                {/* Logo & Title */}

                <Link to={"/"}>
                    <div className="flex items-center gap-4">
                        <img
                            className="h-12 w-12 md:h-16 md:w-16 rounded-full object-cover"
                            src="/book-logo.jpeg"
                            alt="Logo"
                        />
                        <h1 className=" font-caveat text-xl md:text-3xl font-bold text-gray-800">BOOKLY</h1>
                    </div>
                </Link>

                <div className="hidden md:flex items-center gap-6 border px-4 py-2 rounded-md  shadow-lg">
                    {navLinks.map(({ to, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={to === "/"}
                            className={({ isActive }) =>
                                ` text-sm px-2 py-1 transition-colors ${isActive
                                    ? "text-main underline underline-offset-4"
                                    : "text-gray-800 hover:text-purple-800 hover:underline underline-offset-4"
                                }`
                            }
                        >
                            {label}
                        </NavLink>
                    ))}
                </div>

                <button onClick={toggleMenu} className="md:hidden text-3xl text-gray-700">
                    {isMenuOpen ? <HiX/> : <HiMenu />}
                </button>
            </div>

            {isMenuOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/50"
                    onClick={closeMenu}
                />
            )}


            <div
                className={`fixed top-0 left-0 h-full w-60 bg-white z-60 shadow-lg transform transition-transform duration-300 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>

                <div className="flex items-center justify-between gap-3 px-3 sm:px-4 md:px-6 lg:px-10 xl:px-12 py-3 md:py-4  border-b">

                    <Link to={"/"}>
                        <div className="flex items-center gap-3">
                            <img
                                className="h-10 w-10 rounded-full object-cover"
                                src="/logo.jpg"
                                alt="Logo"
                            />
                            <h2 className="font-meddon text-xl font-bold text-gray-800">Bookio</h2>
                        </div>
                    </Link>

                    <button onClick={closeMenu} className="text-2xl text-gray-700">
                        <HiX/>
                    </button>

                </div>

                <div className="flex flex-col mt-4 px-6 gap-4">
                    {navLinks.map(({ to, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={to === "/"}
                            onClick={closeMenu}
                            className={({ isActive }) =>
                                ` font-medium transition-colors ${isActive
                                    ? "text-main underline underline-offset-4"
                                    : "text-gray-700 hover:text-purple-800"
                                }`
                            }
                        >
                            {label}
                        </NavLink>
                    ))}
                </div>
            </div>

        </>
    );
}
