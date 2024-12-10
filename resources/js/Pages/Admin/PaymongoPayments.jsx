import { Head, Link, usePage } from "@inertiajs/react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminAuthenticatedLayout from "@/Layouts/AdminAuthenticatedLayout";

export default function PaymongoPayments({ auth }) {
    const { paymongoSecretKey } = usePage().props;
    const [beforeCursor, setBeforeCursor] = useState();
    const [afterCursor, setAfterCursor] = useState();
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [loading, setLoading] = useState(true);
    const [paymongoData, setPaymongoData] = useState();
    const [error, setError] = useState();
    const [nextCount, setCountNext] = useState(0);
    const [fetching, setFetching] = useState(false); // To handle multiple fetches

    const handleRowsPerPageChange = (e) => {
        setRowsPerPage(e.target.value);
    };

    const fetchPayments = async (direction = "next") => {
        setFetching(true); // Start fetching
        try {
            const params = {
                limit: rowsPerPage,
                ...(direction === "next" &&
                paymongoData &&
                paymongoData.data.length > 0
                    ? { after: afterCursor }
                    : {}),
                ...(direction === "prev" && paymongoData && beforeCursor
                    ? { before: beforeCursor }
                    : {}),
            };

            console.log(params);

            const response = await axios.request({
                method: "GET",
                url: "https://api.paymongo.com/v1/payments",
                params: params,
                headers: {
                    accept: "application/json",
                    authorization: paymongoSecretKey,
                },
            });

            console.log(response.data);
            setPaymongoData(response.data);
            setBeforeCursor(
                response.data.data.length > 0 ? response.data.data[0].id : ""
            );
            setAfterCursor(
                response.data.has_more
                    ? response.data.data[response.data.data.length - 1].id
                    : ""
            );
            setLoading(false);
        } catch (error) {
            console.error("Error fetching payments:", error);
            setError(
                `${error.response.status} - ${error.response.data.errors[0].code} - ${error.response.data.errors[0].detail}`
            );
            setLoading(false);
        } finally {
            setFetching(false); // End fetching
        }
    };

    useEffect(() => {
        fetchPayments(); // Fetch on initial render
    }, [rowsPerPage]);

    return (
        <>
            <AdminAuthenticatedLayout user={auth}>
                <Head title="Paymongo Payments" />
                <div className="w-full flex items-center justify-between">
                    <h1 className="text-2xl font-bold mb-4">
                        Income Statement
                    </h1>
                    <div className="mb-4 flex w-fit items-center">
                        <label
                            htmlFor="rowsPerPage"
                            className="mr-2 whitespace-nowrap"
                        >
                            Rows per page:
                        </label>
                        <select
                            id="rowsPerPage"
                            value={rowsPerPage}
                            onChange={handleRowsPerPageChange}
                            className="border w-full appearance-none border-gray-300 rounded-md p-2 pr-8 custom-select-arrow"
                        >
                            <option value={10}>10</option>
                            <option value={15}>15</option>
                            <option value={20}>20</option>
                        </select>
                    </div>
                </div>
                <div className="p-4 bg-white shadow-md rounded-lg max-w-7xl mx-auto overflow-x-auto">
                    {loading && (
                        <div className="flex items-center justify-center h-64">
                            <div className="bg-themeColor h-4 w-4 rounded-full animate-pulse"></div>
                            <p className="ml-4 text-themeColor font-semibold text-lg">
                                Loading...
                            </p>
                        </div>
                    )}
                    {error && <p className="text-red-500">{error}</p>}
                    {!loading && !error && (
                        <>
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Wallet ID
                                        </th>
                                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Type
                                        </th>
                                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Amount
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Reference Number
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Date Created
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {paymongoData.data.map((payment) => (
                                        <tr key={payment.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <Link
                                                    className="duration-100 ease-in hover:underline hover:text-themeColor"
                                                    href={route(
                                                        "paymongo.payment.info",
                                                        payment.id
                                                    )}
                                                >
                                                    {payment.id}
                                                </Link>
                                            </td>
                                            <td className="px-3 py-4 capitalize whitespace-nowrap">
                                                {payment.attributes.source.type}
                                            </td>
                                            <td className="px-3 py-4 capitalize whitespace-nowrap">
                                                <div className="text-green-600 text-center rounded-lg border border-green-500 bg-green-100">
                                                    {payment.attributes.status}
                                                </div>
                                            </td>
                                            <td className="px-3 py-4 whitespace-nowrap">
                                                {new Intl.NumberFormat(
                                                    "en-US",
                                                    {
                                                        style: "currency",
                                                        currency: "PHP",
                                                    }
                                                ).format(
                                                    payment.attributes.amount /
                                                        100
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {payment.attributes.description}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {new Date(
                                                    payment.attributes
                                                        .created_at * 1000
                                                ).toLocaleString("en-US", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                    hour12: true,
                                                })}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className="flex justify-center gap-2 items-center mt-4">
                                {beforeCursor && nextCount !== 0 && (
                                    <button
                                        onClick={() => {
                                            fetchPayments("previous");
                                            setCountNext((prev) => prev - 1);
                                        }}
                                        className="px-4 py-2 bg-gray-500 text-white rounded-md"
                                    >
                                        Previous
                                    </button>
                                )}
                                {paymongoData.has_more && (
                                    <button
                                        onClick={() => {
                                            fetchPayments("next");
                                            setCountNext((prev) => prev + 1);
                                        }}
                                        className="px-4 py-2 duration-200 ease-in-out hover:bg-orange-500 bg-themeColor text-white rounded-md"
                                    >
                                        Next
                                    </button>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </AdminAuthenticatedLayout>
        </>
    );
}
