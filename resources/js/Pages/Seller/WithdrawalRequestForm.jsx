import InputError from "@/Components/InputError";
import SellerAuthenticatedLayout from "@/Layouts/SellerAuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import React, { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WithdrawalRequestForm = ({ auth }) => {
    const { balance, flash } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        amount: "",
        payment_method: "",
        account_name: "",
        account_number: "",
    });

    const handleAmountChange = (e) => {
        const value = e.target.value.replace(/,/g, "");
        if (!isNaN(value)) {
            setData("amount", value);
        }
    };

    const formatAmount = (value) => {
        return new Intl.NumberFormat().format(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("seller.store.withdraw"), {
            onSuccess: () => {
                reset();
            },
            onError: () => {
                // Handle error (e.g., display a notification)
            },
        });
    };

    useEffect(() => {
        if (flash.status == "success") {
            toast.success(flash.message);
        } else {
            toast.info(flash.message);
        }
    }, [flash]);

    return (
        <SellerAuthenticatedLayout
            user={auth}
            notificationCount={auth.notificationCount}
        >
            <Head title="Request withdraw" />
            <ToastContainer />
            <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-mainText mb-4">
                    Request Withdrawal
                </h2>

                <div className="w-full text-xl text-gray-800 font-bold flex items-center justify-end">
                    PHP {new Intl.NumberFormat().format(balance)}
                </div>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label
                            htmlFor="amount"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Amount
                        </label>
                        <input
                            type="text"
                            id="amount"
                            name="amount"
                            value={formatAmount(data.amount)}
                            onChange={handleAmountChange}
                            onFocus={(e) => (e.target.value = data.amount)}
                            onBlur={(e) =>
                                (e.target.value = formatAmount(data.amount))
                            }
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm appearance-none"
                            placeholder="0"
                        />
                    </div>
                    {errors.amount && (
                        <InputError
                            className="w-full mt-2 mb-4"
                            message={errors.amount}
                        />
                    )}

                    {/* Payment Method Selection */}
                    <div className="mt-4">
                        <label
                            htmlFor="payment_method"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Payment Method
                        </label>
                        <select
                            id="payment_method"
                            name="payment_method"
                            value={data.payment_method}
                            onChange={(e) =>
                                setData("payment_method", e.target.value)
                            }
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="">Select Payment Method</option>
                            <option value="gcash">GCash</option>
                            <option value="maya">Maya</option>
                        </select>
                    </div>
                    {errors.payment_method && (
                        <InputError
                            className="w-full mt-2 mb-4"
                            message={errors.payment_method}
                        />
                    )}

                    {/* Account Name */}
                    <div className="mt-4">
                        <label
                            htmlFor="account_name"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Account Name
                        </label>
                        <input
                            type="text"
                            id="account_name"
                            name="account_name"
                            value={data.account_name}
                            onChange={(e) =>
                                setData("account_name", e.target.value)
                            }
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Account Name"
                        />
                    </div>
                    {errors.account_name && (
                        <InputError
                            className="w-full mt-2 mb-4"
                            message={errors.account_name}
                        />
                    )}

                    {/* Account Number */}
                    <div className="mt-4">
                        <label
                            htmlFor="account_number"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Account Number
                        </label>
                        <input
                            type="text"
                            id="account_number"
                            name="account_number"
                            value={data.account_number}
                            onChange={(e) =>
                                setData("account_number", e.target.value)
                            }
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Account Number"
                        />
                    </div>
                    {errors.account_number && (
                        <InputError
                            className="w-full mt-2 mb-4"
                            message={errors.account_number}
                        />
                    )}

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full px-4 py-2 my-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-400"
                    >
                        {processing ? "Submitting..." : "Submit Request"}
                    </button>
                </form>
            </div>
        </SellerAuthenticatedLayout>
    );
};

export default WithdrawalRequestForm;
