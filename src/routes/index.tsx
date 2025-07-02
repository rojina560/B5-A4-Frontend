import { createBrowserRouter } from "react-router";
import MainLayout from "@/layouts/MainLayout";
import HomePage from "@/pages/HomePage";
import AllBooksPage from "@/pages/AllBooksPage";
import BorrowSummaryPage from "@/pages/BorrowSummaryPage";
import ErrorPage from "@/pages/ErrorPage";
import SingleBook from "@/pages/SingleBook"; // ✅ import your SingleBook page
import AddBookPage from "@/pages/AddBookPage";

const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                Component: HomePage,
            },
            {
                path: "books",
                children: [
                    {
                        index: true,
                        Component: AllBooksPage,
                    },
                    {
                        path: ":id",
                        Component: SingleBook,
                    },
                ],
            },
            {
                path: "create-book",
                Component: AddBookPage,
            },
            {
                path: "borrow-summary",
                Component: BorrowSummaryPage,
            },
        ],
    },
]);

export default router;
