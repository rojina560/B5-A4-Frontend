import { Link } from "react-router";

export default function Footer() {
    const footerData = [
        {
            heading: "Quick Links",
            links: [
                { to: "/", label: "Home" },
                { to: "/books", label: "Books" },
                { to: "/borrow-summary", label: "Borrow Summary" },
            ],
        },
        {
            heading: "Services",
            links: [
                { to: "#", label: "Membership" },
                { to: "#", label: "E-books" },
                { to: "#", label: "Audiobooks" },
            ],
        },
        {
            heading: "About Us",
            links: [
                { to: "#", label: "Our Mission" },
                { to: "#", label: "Team" },
                { to: "#", label: "Careers" },
            ],
        },
        {
            heading: "Support",
            links: [
                { to: "#", label: "Help Center" },
                { to: "#", label: "FAQs" },
                { to: "#", label: "Feedback" },
            ],
        },
    ];

    return (
        <footer className="bg-gray-100 px-6 py-12">
            <div className="max-w-7xl mx-auto flex flex-col items-center gap-10">
                {/* Brand */}
                <div className="flex flex-col items-center gap-4">
                    <img
                        className="h-12 w-12 md:h-16 md:w-16 rounded-full object-cover"
                        src="/logo.jpg"
                        alt="Logo"
                    />
                    <h1 className="font-meddon text-2xl md:text-3xl font-bold text-gray-800">Bookio</h1>
                </div>

                {/* Dynamic Link Sections */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full px-4 text-center">
                    {footerData.map(({ heading, links }) => (
                        <div key={heading}>
                            <h2 className="mb-3 font-bold text-main underline uppercase">
                                {heading}
                            </h2>
                            <div className="flex flex-col space-y-2">
                                {links.map(({ to, label }) => (
                                    <Link
                                        key={label}
                                        to={to}
                                        className="text-sm md:text-base text-gray-700 hover:text-purple-800 hover:underline underline-offset-4 transition-all"
                                    >
                                        {label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <p className="text-sm text-gray-500 mt-6 text-center">
                    © {new Date().getFullYear()} Bookio. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
