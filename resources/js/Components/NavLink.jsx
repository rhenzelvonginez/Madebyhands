import { Link } from "@inertiajs/react";

export default function NavLink({
    active = false,
    className = "",
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                "inline-flex items-center px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none "
            }
        >
            <span
                className={`border-b-2 ${
                    active
                        ? "border-indigo-400"
                        : "border-transparent hover:border-gray-300 "
                }`}
            >
                {children}
            </span>
        </Link>
    );
}
