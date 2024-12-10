import AdminAuthenticatedLayout from "@/Layouts/AdminAuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import { useState } from "react";

export default function Index({ auth, reports }) {
    const [toast, setToast] = useState(null);
    const [toastType, setToastType] = useState("success");
    const handleVerify = (reportId) => {
        router.post(`/admin/reports/${reportId}/verify`, {}, {
            onSuccess: () => {
                setToast("Report verified and product disabled.");
                setToastType("success");
                setTimeout(() => setToast(null), 3000);
            },
            onError: (error) => {
                console.error("Error verifying report:", error);
                setToast("Error verifying report.");
                setToastType("error");
                setTimeout(() => setToast(null), 3000);
            },
        });
    };
    const handleReject = (reportId) => {
        router.post(`/admin/reports/${reportId}/reject`, {}, {
            onSuccess: () => {
                setToast("Report rejected.");
                setToastType("error");
                setTimeout(() => setToast(null), 3000);
            },
            onError: (error) => {
                console.error("Error rejecting report:", error);
                setToast("Error rejecting report.");
                setToastType("error");
                setTimeout(() => setToast(null), 3000);
            },
        });
    };
    return (
        <>
            <AdminAuthenticatedLayout user={auth.user}>
                <Head title="Admin - Reported Products" />
                <h1 className="text-2xl font-bold mb-6 text-gray-800">Reported Products</h1>
                {/* Toast Notification */}
                {toast && (
                    <div
                        className={`fixed top-4 right-4 p-2 text-white rounded-lg shadow-lg z-50 ${toastType === "success" ? "bg-green-500" : "bg-red-500"
                            }`}
                    >
                        {toast}
                    </div>
                )}
                <div className="border rounded-lg shadow-lg p-6 overflow-x-auto">
                    <table className="w-full border-collapse ">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="border-b px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                    Product Image
                                </th>
                                <th className="border-b px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                    Product Name
                                </th>
                                <th className="border-b px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                    Seller Name
                                </th>
                                <th className="border-b px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                    Reason
                                </th>
                                <th className="border-b px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                    Details
                                </th>
                                <th className="border-b px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                    Reported At
                                </th>
                                <th className="border-b px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {reports.map((report) => (
                                <tr
                                    key={report.id}
                                    className="hover:bg-gray-100 transition duration-200"
                                >
                                    <td className="border-b px-4 py-3">
                                        <img
                                            src={
                                                report.product.images &&
                                                    report.product.images.length > 0
                                                    ? report.product.images[0].image_path
                                                    : "/placeholder.png"
                                            }
                                            alt={report.product?.product_name || "Product Image"}
                                            className="object-cover w-24 h-24 rounded-lg shadow"
                                        />
                                    </td>
                                    <td className="border-b px-4 py-3 text-gray-700">
                                        {report.product?.product_name || "Product Not Found"}
                                    </td>
                                    <td className="border-b px-4 py-3 text-gray-700">
                                        {report.product?.seller?.shop_name || "Seller Not Found"}
                                    </td>
                                    <td className="border-b px-4 py-3 text-gray-700">
                                        {report.reason}
                                    </td>
                                    <td className="border-b px-4 py-3 text-gray-700">
                                        {report.details || "No details"}
                                    </td>
                                    <td className="border-b px-4 py-3 text-gray-700">
                                        {new Intl.DateTimeFormat("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            hour12: true,
                                        }).format(new Date(report.created_at))}
                                    </td>
                                    <td className="border-b px-4 py-3">
                                        <div className="flex space-x-2 flex-wrap gap-4 sm:flex-nowrap">
                                            <button
                                                onClick={() => handleVerify(report.id)}
                                                className="px-4 py-2 text-sm bg-green-500 text-white rounded-md hover:bg-green-600 transition text-nowrap w-full sm:w-auto"
                                            >
                                                Accept Report
                                            </button>
                                            <button
                                                onClick={() => handleReject(report.id)}
                                                className="px-4 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition text-nowrap w-full sm:w-auto"
                                            >
                                                Reject Report
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </AdminAuthenticatedLayout>
        </>
    );
}
