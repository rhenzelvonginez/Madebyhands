import { Link } from "@inertiajs/react";

export default function Pagination({ links }) {
    return (
        <div className="flex items-center justify-center my-8">
            <nav aria-label="Page navigation example">
                <ul className="inline-flex -space-x-px">
                    {links.prev && (
                        <li>
                            <Link
                                href={links.prev}
                                className="px-3 py-2 leading-tight bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                            >
                                Previous
                            </Link>
                        </li>
                    )}
                    {links.first && links.prev && links.next && (
                        <li>
                            <Link
                                href={links.first}
                                className="px-3 py-2 leading-tight bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                            >
                                First
                            </Link>
                        </li>
                    )}
                    {links.next && (
                        <li>
                            <Link
                                href={links.next}
                                className="px-3 py-2 leading-tight bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                            >
                                Next
                            </Link>
                        </li>
                    )}
                    {links.last && links.prev && links.next && (
                        <li>
                            <Link
                                href={links.last}
                                className="px-3 py-2 leading-tight bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                            >
                                Last
                            </Link>
                        </li>
                    )}
                </ul>
            </nav>
        </div>
    );
}
