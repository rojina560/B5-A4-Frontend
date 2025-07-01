import Footer from "@/elements/shared/Footer";
import Navbar from "@/elements/shared/Navbar";
import { Outlet } from "react-router";


export default function MainLayout() {
    return (

        <div>
            <Navbar />
            <div className='pt-24 min-h-[calc(100vh-68px)]'>
                <Outlet />
            </div>
            <Footer />
        </div>

    )
}
