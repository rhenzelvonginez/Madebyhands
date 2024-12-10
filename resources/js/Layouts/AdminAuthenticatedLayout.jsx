import { useState, useEffect } from "react";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";
import Logo from "@/assets/icons/Logo.svg";
import { FaUserGear } from "react-icons/fa6";
import { TbLogout } from "react-icons/tb";
export default function AdminAuthenticatedLayout({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);
    return (
        <>
            <div className="min-h-screen bg-white">
                <nav className="bg-white border-b border-gray-100 shadow drop-shadow-md">
                    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex items-center gap-6 ">
                                <div className="flex items-center shrink-0">
                                    <Link
                                        href="/"
                                        className="flex items-center gap-1 "
                                    >
                                        <img
                                            className="h-12 "
                                            src={Logo}
                                            alt="Logo"
                                        />
                                        <h1>MADEBYHANDS</h1>
                                    </Link>
                                </div>

                                <div className="hidden space-x-8 uppercase sm:-my-px sm:ms-10 sm:flex">
                                    <NavLink
                                        href={route("admin.index")}
                                        active={route().current("admin.index")}
                                    >
                                        Home
                                    </NavLink>
                                    <NavLink
                                        href={route("admin.sellers")}
                                        active={route().current(
                                            "admin.sellers"
                                        )}
                                    >
                                        Sellers
                                    </NavLink>{" "}
                                    {/* <NavLink
                                        href={route("admin.users")}
                                        active={route().current("admin.users")}
                                    >
                                        Users
                                    </NavLink> */}
                                    <NavLink
                                        href={route("admin.permission", {
                                            sortBySeller: 'all',
                                            status: 'unverified'
                                        })}
                                        active={route().current("admin.permission")}
                                    >
                                        Permission
                                    </NavLink>

                                    <NavLink
                                        href={route("paymongo.payments")}
                                        active={route().current(
                                            "paymongo.payments"
                                        )}
                                    >
                                        Paymongo
                                    </NavLink>
                                    <NavLink
                                        href={route(
                                            "widthdrawal.request.index"
                                        )}
                                        active={route().current(
                                            "widthdrawal.request.index"
                                        )}
                                    >
                                        Requests
                                    </NavLink>
                                    <NavLink
                                        href={route(
                                            "admin.reportedProducts"
                                        )}
                                        active={route().current(
                                            "admin.reportedProducts"
                                        )}
                                    >
                                        Reported Products
                                    </NavLink>
                                    <NavLink
                                        href={route(
                                            "admin.get.shipping-rates"
                                        )}
                                        active={route().current(
                                            "admin.get.shipping-rates"
                                        )}
                                    >
                                        Shipping Rates
                                    </NavLink>
                                </div>
                            </div>
                            <div className="flex gap-3 sm:items-center sm:ms-6">
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
                                href={route("admin.index")}
                                active={route().current("admin.index")}
                            >
                                Dashboard
                            </ResponsiveNavLink>
                        </div>

                        <div className="pt-4 pb-1 border-t border-gray-200">
                            <div className="px-4">
                                <div className="text-base font-medium text-gray-800">
                                    {/* {user.first_name == null
                                        ? user.first_name
                                        : "Admin"} */}
                                </div>
                                <div className="text-sm font-medium text-gray-500">
                                    {/* {user.email} */}
                                </div>
                            </div>

                            <div className="mt-3 space-y-1">
                                {/* <ResponsiveNavLink href={route("profile.edit")}>
                                    Profile
                                </ResponsiveNavLink> */}
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

                <main className="container p-4 mx-auto ">{children}</main>
            </div>
        </>
    );
}
