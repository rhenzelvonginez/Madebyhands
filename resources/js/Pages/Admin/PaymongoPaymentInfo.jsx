import AdminAuthenticatedLayout from "@/Layouts/AdminAuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function PaymongoPaymentInfo({ auth }) {
    const { id } = usePage().props;
    const [payment, setPayment] = useState();
    const [loading, setLoading] = useState(true);

    const fetchPaymentInfo = async () => {
        const options = {
            method: "GET",
            url: "https://api.paymongo.com/v1/payments/" + id,
            headers: {
                accept: "application/json",
                authorization:
                    "Basic c2tfdGVzdF9EWktndjZLbVJrMnBUTUdtVnlkNUdtTFA6c2tfdGVzdF9EWktndjZLbVJrMnBUTUdtVnlkNUdtTFA=",
            },
        };

        try {
            axios.request(options).then((response) => {
                console.log(response.data);
                setPayment(response.data.data);
                console.log("payment", payment);
                setLoading(false);
            });
        } catch (error) {
            console.log("Fetching data failed", error);
        }
    };

    useEffect(() => {
        fetchPaymentInfo();
    }, []);
    return (
        <>
            <AdminAuthenticatedLayout user={auth}>
                <Head title="Paymongo Payment Info" />
                {loading ? (
                    <div className="bg-white rounded-lg p-6 border w-fit mx-auto h-fit border-slate-200">
                        <div className="flex items-center justify-center ">
                            <div className="bg-themeColor h-4 w-4 rounded-full animate-pulse"></div>
                            <p className="ml-4 text-themeColor font-semibold text-lg">
                                Loading...
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="max-w-2xl mx-auto p-4 bg-white border border-slate-200 shadow-lg rounded-lg">
                        <div className="flex items-center justify-between flex-row-reverse">
                            <button
                                className="text-themeColor"
                                onClick={() => window.history.back()}
                            >
                                Go Back
                            </button>
                            <h2 className="text-xl font-bold mb-4">
                                Payment Details
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                            <div>
                                <p className="text-gray-600">Name</p>
                                <p className="font-semibold">
                                    {payment.attributes.billing.name}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-600">Email</p>
                                <p className="font-semibold">
                                    {payment.attributes.billing.email}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-600">Phone</p>
                                <p className="font-semibold">
                                    {payment.attributes.billing.phone}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-600">Payment ID</p>
                                <p className="font-semibold">{payment.id}</p>
                            </div>
                            <div>
                                <p className="text-gray-600">Amount</p>
                                <p className="font-semibold">
                                    {new Intl.NumberFormat("en-US", {
                                        style: "currency",
                                        currency: "PHP",
                                    }).format(payment.attributes.amount / 100)}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-600">Status</p>
                                <p className="font-semibold capitalize">
                                    {payment.attributes.status}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-600">Payment Method</p>
                                <p className="font-semibold capitalize">
                                    {payment.attributes.source.type}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-600">Payment Date</p>
                                <p className="font-semibold">
                                    {new Date(
                                        payment.attributes.created_at * 1000
                                    ).toLocaleString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: true,
                                    })}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-600">Description</p>
                                <p className="font-semibold">
                                    {payment.attributes.description}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-600">Fee</p>
                                <p className="font-semibold">
                                    {new Intl.NumberFormat("en-US", {
                                        style: "currency",
                                        currency: "PHP",
                                    }).format(payment.attributes.fee / 100)}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-600">Net Amount</p>
                                <p className="font-semibold">
                                    {new Intl.NumberFormat("en-US", {
                                        style: "currency",
                                        currency: "PHP",
                                    }).format(
                                        payment.attributes.net_amount / 100
                                    )}
                                </p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-400">
                            Last updated:{" "}
                            {new Date(
                                payment.attributes.updated_at * 1000
                            ).toLocaleString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                            })}
                        </p>
                    </div>
                )}
            </AdminAuthenticatedLayout>
        </>
    );
}
