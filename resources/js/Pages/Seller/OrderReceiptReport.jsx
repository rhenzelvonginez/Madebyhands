import SellerAuthenticatedLayout from "@/Layouts/SellerAuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";

export default function OrderReceiptReport({ auth }) {
    const { orders } = usePage().props;

    return (
        <>
            <SellerAuthenticatedLayout
                user={auth}
                notificationCount={auth.notificationCount}
            >
                <Head title="Order Receipt Report" />
                <div className="container mx-auto p-6">
                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
                        Order Receipt Report
                    </h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {orders.map((order) => (
                            <div
                                key={order.id}
                                className="bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden"
                            >
                                <div className="p-6">
                                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                        Order #{order.reference_number}
                                    </h2>
                                    <p className="text-gray-600 mb-1">
                                        <span className="font-medium">
                                            Buyer:
                                        </span>{" "}
                                        {order.buyers_name}
                                    </p>
                                    <p className="text-gray-600 mb-1">
                                        <span className="font-medium">
                                            Product:
                                        </span>{" "}
                                        {order.product_name}
                                    </p>
                                    <p className="text-gray-600 mb-1">
                                        <span className="font-medium">
                                            Amount:
                                        </span>{" "}
                                        ₱{order.amount}
                                    </p>
                                    <p className="text-gray-600 mb-1">
                                        <span className="font-medium">
                                            Payment Method:
                                        </span>{" "}
                                        {order.payment_method}
                                    </p>

                                    <p className="text-gray-600 mb-1">
                                        <span className="font-medium">
                                            Date:
                                        </span>{" "}
                                        {new Date(
                                            order.created_at
                                        ).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </SellerAuthenticatedLayout>
        </>
    );
}
