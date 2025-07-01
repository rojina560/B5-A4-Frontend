import MainLayout from "@/layouts/MainLayout";
import AllBooksPage from "@/pages/AllBooksPage";
import BorrowSummaryPage from "@/pages/BorrowSummaryPage";
import ErrorPage from "@/pages/ErrorPage";
import HomePage from "@/pages/HomePage";
import { createBrowserRouter } from "react-router";



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
                Component: AllBooksPage,
            },
            {
                path: "borrow-summary",
                Component: BorrowSummaryPage,
            },
        ],
    },
]);


export default router;
