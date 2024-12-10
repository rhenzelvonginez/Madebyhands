import { useState, useEffect } from "react";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";
import UserChatIcon from "@/assets/icons/UserChatIcon.svg";
import { TbLogout } from "react-icons/tb";
import Logo from "@/assets/icons/Logo.svg";
import { IoNotifications } from "react-icons/io5";
import { FaUserGear } from "react-icons/fa6";
import { BsChatDots } from "react-icons/bs";


export default function SellerMessageLayout({
    user,
    header,
    notificationCount,
    children,
}) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    const [notification, setNotification] = useState(
        notificationCount == null ? null : notificationCount
    );

    useEffect(() => {
        setNotification(notificationCount);
    }, [notificationCount]);

    return (
        <div className="min-h-screen bg-slate-50">
            <nav className="bg-white border-b border-gray-100 shadow drop-shadow-md">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center shrink-0">
                            <Link href="/" className="flex items-center gap-1 ">
                                <img className="h-12 " src={Logo} alt="Logo" />
                                <h1>MADEBYHANDS</h1>
                            </Link>
                        </div>

                        <div className="hidden space-x-8 uppercase sm:-my-px sm:ms-10 sm:flex">
                            <NavLink
                                href={route("seller.dashboard")}
                                active={route().current("seller.dashboard")}
                            >
                                Dashboard
                            </NavLink>
                            <NavLink
                                href={route("seller.finance")}
                                active={route().current("seller.finance")}
                            >
                                Finance
                            </NavLink>
                            <NavLink
                                href={route("seller.shop")}
                                active={route().current("seller.shop")}
                            >
                                Your Shop
                            </NavLink>
                            <NavLink
                                href={route("seller.products")}
                                active={route().current("seller.products")}
                            >
                                Products
                            </NavLink>
                        </div>

                        <div className="hidden gap-2 md:flex sm:items-center sm:ms-6">
                            <NavLink href={route("seller.messages.index")}>
                                <div className="relative ">
                                    {/* <span className="absolute text-sm font-bold -top-2 -right-2">
                                        {cartCount == 0 ? "" : cartCount}
                                    </span> */}
                                    <BsChatDots size={20} />
                                </div>
                            </NavLink>
                            <div className="relative flex items-center justify-center">
                                {notification == 0 || notification == null ? (
                                    ""
                                ) : (
                                    <small className="absolute -top-0.5 -right-0.5 z-10 text-white text-[0.50rem] bg-slate-900 p-1 flex items-center justify-center h-4 w-4 rounded-lg border-2 border-white">
                                        {notification}
                                    </small>
                                )}
                                <NavLink
                                    href={route("seller.showNotification")}
                                >
                                    <IoNotifications size={20} />
                                </NavLink>
                                {/* <div className="absolute -top-1 -right-1 p-0.5 bg-slate-600 rounded-full text-xs text-white">
                                    23
                                </div> */}
                            </div>
                            <NavLink href={route("seller.profile")}>
                                <FaUserGear size={20} />
                            </NavLink>
                            <NavLink
                                method="post"
                                href={route("logout")}
                                as="button"
                            >
                                <TbLogout size={22} />
                            </NavLink>
                        </div>

                        <div className="flex items-center -me-2 sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState
                                    )
                                }
                                className="inline-flex items-center justify-center p-2 text-gray-400 transition duration-150 ease-in-out rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500"
                            >
                                <svg
                                    className="w-6 h-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? "block" : "hidden") +
                        " sm:hidden"
                    }
                >
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink
                            href={route("seller.dashboard")}
                            active={route().current("seller.dashboard")}
                        >
                            Dashboard
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route("seller.finance")}
                            active={route().current("seller.finance")}
                        >
                            Finance
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route("seller.shop")}
                            active={route().current("seller.shop")}
                        >
                            Your Shop
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route("seller.products")}
                            active={route().current("seller.products")}
                        >
                            Products
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route("seller.profile")}>
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route("logout")}
                                as="button"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main
                className="-z-20"
            >
                {children}
            </main>
        </div>
    );
}
