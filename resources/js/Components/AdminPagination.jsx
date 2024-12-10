import { Link } from "@inertiajs/react";
import React from "react";

const AdminPagination = ({ links }) => {
    const baseClasses = "mx-1 px-4 py-2 border rounded-md";
    const enabledClasses =
        "bg-white text-gray-700 border-gray-300 hover:bg-gray-100";
    const disabledClasses =
        "bg-gray-200 text-gray-400 border-gray-200 pointer-events-none";

    return (
        <div className="flex justify-center items-center my-4 space-x-2">
            <Link
                href={links.first || "#"}
                className={`${baseClasses} ${
                    links.first ? enabledClasses : disabledClasses
                }`}
            >
                First
            </Link>
            <Link
                href={links.prev || "#"}
                className={`${baseClasses} ${
                    links.prev ? enabledClasses : disabledClasses
                }`}
            >
                Previous
            </Link>
            <Link
                href={links.next || "#"}
                className={`${baseClasses} ${
                    links.next ? enabledClasses : disabledClasses
                }`}
            >
                Next
            </Link>
            <Link
                href={links.last || "#"}
                className={`${baseClasses} ${
                    links.last ? enabledClasses : disabledClasses
                }`}
            >
                Last
            </Link>
        </div>
    );
};

export default AdminPagination;
