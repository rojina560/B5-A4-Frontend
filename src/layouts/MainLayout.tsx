import Footer from "@/elements/shared/Footer";
import Navbar from "@/elements/shared/Navbar";
import { Outlet } from "react-router";


export default function MainLayout() {
    return (

        <div>
            <Navbar />
            <div className='pt-20 sm:pt-20 md:pt-24 lg:pt-28 xl:pt-32 min-h-[calc(100vh-68px)] font-libertinus'>
                <Outlet />
            </div>
            <Footer />
        </div>

    )
}
