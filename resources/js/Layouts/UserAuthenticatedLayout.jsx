import { useState, useEffect } from "react";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";
import { IoMdNotificationsOutline } from "react-icons/io";
import UserCartIcon from "@/assets/icons/UserCartIcon.svg";
import Logo from "@/assets/icons/Logo.svg";
import { BsChatDots } from "react-icons/bs";

export default function UserAuthenticatedLayout({
    user,
    cartNumber,
    header,
    children,
    notificationCount,
}) {
    const [cartCount, setCartCount] = useState(
        cartNumber == null ? 0 : cartNumber
    );

    useEffect(() => {
        setCartCount(cartNumber);
    }, [cartNumber]);
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    const [notification, setNotification] = useState(
        notificationCount == null ? null : notificationCount
    );

    useEffect(() => {
        setNotification(notificationCount);
    }, [notificationCount]);
    return (
        <div className="flex flex-col min-h-screen bg-white">
            <nav className="z-30 bg-white border-b border-gray-100 shadow drop-shadow-md">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center shrink-0">
                            <Link
                                href="/home"
                                className="flex items-center gap-1 "
                            >
                                <img className="h-12 " src={Logo} alt="Logo" />
                                <h1 className="font-medium font-karla text-mainText">
                                    MadeByHands
                                </h1>
                            </Link>
                        </div>

                        <div className="hidden space-x-8 uppercase font-manjari text-mainText sm:-my-px sm:ms-10 sm:flex">
                            <NavLink
                                href={route("dashboard")}
                                active={route().current("dashboard")}
                            >
                                Home
                            </NavLink>

                            <NavLink
                                href={route("shop")}
                                active={route().current("shop")}
                            >
                                Shop
                            </NavLink>
                            <NavLink
                                href={route("user.myPurchases")}
                                active={route().current("user.myPurchases")}
                            >
                                My Purchases
                            </NavLink>
                        </div>
                        <div className="items-center justify-between hidden gap-3 md:flex sm:ms-6">
                            <NavLink href={route("user-cart")}>
                                <div className="relative ">
                                    <span className="absolute text-sm font-bold -top-2 -right-2">
                                        {cartCount == 0 ? "" : cartCount}
                                    </span>
                                    <img
                                        className="h-6 "
                                        src={UserCartIcon}
                                        alt="cart icon"
                                    />
                                </div>
                            </NavLink>
                            <NavLink href={route("message.index")}>
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
                                    href={route("notification.show")}
                                >
                                    <IoMdNotificationsOutline size={20} />
                                </NavLink>
                            </div>
                            <div className="relative ">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out bg-white border border-transparent rounded-md hover:text-gray-700 focus:outline-none"
                                            >
                                                {user.first_name}
                                                <svg
                                                    className="ms-2 -me-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content className="z-40">
                                        <Dropdown.Link
                                            className="z-40"
                                            href={route("user.profile")}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            className="z-40"
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
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
                    <div className="pt-2 space-y-1">
                        <ResponsiveNavLink
                            href={route("dashboard")}
                            active={route().current("dashboard")}
                        >
                            Dashboard
                        </ResponsiveNavLink>
                    </div>
                    <div className="pt-2 space-y-1">
                        <ResponsiveNavLink
                            href={route("message.index")}
                            active={route().current("message.index")}
                        >
                            Messages
                        </ResponsiveNavLink>
                    </div>
                    <div className="pt-2space-y-1">
                        <ResponsiveNavLink
                            className="flex items-center "
                            href={route("user-cart")}
                            active={route().current("user-cart")}
                        >
                            Cart
                            <div
                                className={`ml-2 text-slate-700 rounded-full h-5 text-xs  flex items-center justify-center p-0.5 w-5 `}
                            >
                                {" "}
                                {cartCount == 0 ? "" : cartCount}
                            </div>
                        </ResponsiveNavLink>
                    </div>
                    <div className="pt-2space-y-1">
                        <ResponsiveNavLink
                            href={route("shop")}
                            active={route().current("shop")}
                        >
                            Shop
                        </ResponsiveNavLink>
                    </div>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink
                            href={route("user.myPurchases")}
                            active={route().current("user.myPurchases")}
                        >
                            My Purchases
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <div className="px-4">
                            <div className="text-base font-medium text-gray-800">
                                {/* {user.user.first_name} */}
                            </div>
                            <div className="text-sm font-medium text-gray-500">
                                {/* {user.user.email} */}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route("user.profile")}>
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
                    <div className="px-4 py-6 mx-auto max-w-7xl font-karla sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}


            <main className="flex flex-col flex-grow">{children}</main>
        </div>
    );
}
