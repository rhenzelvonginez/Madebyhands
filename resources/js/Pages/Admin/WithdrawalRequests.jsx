import AdminAuthenticatedLayout from "@/Layouts/AdminAuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "@/Components/Modal"; // Adjust the import path as necessary

const WithdrawalRequests = ({ auth }) => {
    const { requestsLists, flash } = usePage().props;
    const [filter, setFilter] = useState("pending");
    const [activeTab, setActiveTab] = useState();

    // State to manage modal visibility and details
    const [showModal, setShowModal] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);

    const { data, setData, post, processing, reset } = useForm({
        status: "",
    });

    console.log(selectedRequest);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const param = urlParams.get("activeTab") || "pending";
        setActiveTab(param);
        setFilter(param);
    }, []);

    const filteredRequests = requestsLists.filter((request) => {
        if (filter === "all") return true;
        return request.status === filter;
    });

    const handleChangeTab = (tabId) => {
        setActiveTab(tabId);
        const url = new URL(window.location);
        url.searchParams.set("activeTab", tabId);
        window.history.pushState({ activeTab }, "", url);
    };

    const handleButtonClick = (status, id, amount) => {
        post(route("withdrawal.request.update", { id, status, amount }));
    };

    const handleRejectButton = (e, status, id, name, amount) => {
        e.preventDefault();

        if (
            !window.confirm(
                "Are you sure you want to reject the request from " +
                    name +
                    " with a total amount of PHP " +
                    amount +
                    "?"
            )
        ) {
            return;
        }

        post(route("withdrawal.request.update", { id, status, amount }));
    };

    const handleViewDetails = (request) => {
        setSelectedRequest(request);
        setShowModal(true);
    };

    useEffect(() => {
        if (flash.status === "success") {
            toast.success(flash.message);
        } else if (flash.message) {
            toast.info(flash.message);
        }
    }, [flash]);

    return (
        <AdminAuthenticatedLayout user={auth}>
            <ToastContainer />
            <Head title="Withdrawal Requests" />
            <div className="container mx-auto p-6">
                <h2 className="text-3xl font-bold mb-8 text-gray-800">
                    Withdrawal Requests
                </h2>

                {/* Filter Buttons */}
                <div className="mb-6 flex space-x-2">
                    <button
                        className={`px-5 py-2 rounded-lg font-semibold ${
                            activeTab === "all"
                                ? "bg-blue-600 text-white shadow-md"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                        onClick={() => {
                            handleChangeTab("all");
                            setFilter("all");
                        }}
                    >
                        All
                    </button>

                    <button
                        className={`px-5 py-2 rounded-lg font-semibold ${
                            activeTab === "pending"
                                ? "bg-blue-600 text-white shadow-md"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                        onClick={() => {
                            handleChangeTab("pending");
                            setFilter("pending");
                        }}
                    >
                        Pending
                    </button>
                    <button
                        className={`px-5 py-2 rounded-lg font-semibold ${
                            activeTab === "approved"
                                ? "bg-blue-600 text-white shadow-md"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                        onClick={() => {
                            handleChangeTab("approved");
                            setFilter("approved");
                        }}
                    >
                        Approved
                    </button>
                    <button
                        className={`px-5 py-2 rounded-lg font-semibold ${
                            activeTab === "rejected"
                                ? "bg-blue-600 text-white shadow-md"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                        onClick={() => {
                            handleChangeTab("rejected");
                            setFilter("rejected");
                        }}
                    >
                        Rejected
                    </button>
                </div>

                {/* Withdrawal Requests Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="py-3 px-6 border-b text-left text-gray-600 font-medium">
                                    Seller
                                </th>
                                <th className="py-3 px-6 border-b text-left text-gray-600 font-medium">
                                    Amount
                                </th>
                                <th className="py-3 px-6 border-b text-left text-gray-600 font-medium">
                                    Status
                                </th>
                                <th className="py-3 px-6 border-b text-left text-gray-600 font-medium">
                                    Created At
                                </th>
                                <th className="py-3 px-6 border-b text-left text-gray-600 font-medium">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRequests.map((request) => (
                                <tr
                                    key={request.id}
                                    className="hover:bg-gray-50 transition-colors"
                                >
                                    <td className="py-3 px-6 border-b whitespace-nowrap text-gray-800">
                                        {request.seller_data.user.first_name +
                                            " " +
                                            request.seller_data.user.last_name}
                                    </td>
                                    <td className="py-3 px-6 border-b text-gray-800">
                                        PHP {request.amount.toLocaleString()}
                                    </td>
                                    <td className="py-3 px-6 border-b capitalize text-gray-800">
                                        {request.status}
                                    </td>
                                    <td className="py-3 px-6 border-b text-gray-800">
                                        {format(
                                            new Date(request.created_at),
                                            "MMMM d, yyyy h:mm a"
                                        )}
                                    </td>
                                    <td className="py-3 px-6 border-b">
                                        <div className="flex space-x-2">
                                            {request.status === "pending" && (
                                                <>
                                                    <button
                                                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                                                        onClick={() =>
                                                            handleButtonClick(
                                                                "approved",
                                                                request.id,
                                                                request.amount
                                                            )
                                                        }
                                                        disabled={processing}
                                                    >
                                                        Approve
                                                    </button>
                                                    <button
                                                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
                                                        onClick={(e) =>
                                                            handleRejectButton(
                                                                e,
                                                                "rejected",
                                                                request.id,
                                                                request
                                                                    .seller_data
                                                                    .user
                                                                    .first_name,
                                                                request.amount.toLocaleString()
                                                            )
                                                        }
                                                        disabled={processing}
                                                    >
                                                        Reject
                                                    </button>
                                                </>
                                            )}
                                            <button
                                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                                                onClick={() =>
                                                    handleViewDetails(request)
                                                }
                                            >
                                                View
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal for Viewing Details */}
            {showModal && (
                <Modal
                    show={showModal}
                    onClose={() => setShowModal(false)}
                    maxWidth="md"
                >
                    <div className="p-6 bg-white rounded-lg shadow-lg">
                        <h3 className="text-2xl font-semibold mb-4 border-b pb-2 text-gray-800">
                            Account Details
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <span className="font-medium text-gray-700">
                                    Account Name:
                                </span>
                                <span className="text-gray-900">
                                    {selectedRequest.account_name}
                                </span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="font-medium text-gray-700">
                                    Account Number:
                                </span>
                                <span className="text-gray-900">
                                    {selectedRequest.account_number}
                                </span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="font-medium text-gray-700">
                                    Payment Method:
                                </span>
                                <span className="text-gray-900">
                                    {selectedRequest.payment_method}
                                </span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="font-medium text-gray-700">
                                    Date Requested:
                                </span>
                                <span className="text-gray-900">
                                    {format(
                                        new Date(selectedRequest.created_at),
                                        "MMMM d, yyyy h:mm a"
                                    )}
                                </span>
                            </div>
                            {selectedRequest.status !== "pending" ? (
                                <div className="flex items-center space-x-2">
                                    <span className="font-medium text-gray-700">
                                        Date of Withdrawal{" "}
                                        {selectedRequest.status == "rejected"
                                            ? "Rejected"
                                            : "Sent"}
                                        :
                                    </span>
                                    <span className="text-gray-900">
                                        {format(
                                            new Date(
                                                selectedRequest.updated_at
                                            ),
                                            "MMMM d, yyyy h:mm a"
                                        )}
                                    </span>
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                        <button
                            className="mt-6 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 font-medium"
                            onClick={() => setShowModal(false)}
                        >
                            Close
                        </button>
                    </div>
                </Modal>
            )}
        </AdminAuthenticatedLayout>
    );
};

export default WithdrawalRequests;
