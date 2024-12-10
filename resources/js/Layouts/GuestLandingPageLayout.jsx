import { useState, useEffect } from "react";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";
import UserCartIcon from "@/assets/icons/UserCartIcon.svg";
import Logo from "@/assets/icons/Logo.svg";
import { BsChatDots } from "react-icons/bs";

export default function GuestLandingPageLayout({ header, children }) {

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <nav className="z-30 bg-header border-b border-gray-100 shadow drop-shadow-md">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex justify-center w-full items-center p-2">
                        <div className="flex items-center shrink-0">
                            <Link
                                href="/home"
                                className="flex items-center gap-1 "
                            >
                                <img className="h-10 " src={Logo} alt="Logo" />
                                <h1 className="text-xl font-medium font-karla text-mainText">
                                    MadeByHands
                                </h1>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="px-4 py-6 mx-auto max-w-7xl font-karla sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}


            <main className="flex flex-col flex-grow">{children}</main>
        </div>
    );
}
