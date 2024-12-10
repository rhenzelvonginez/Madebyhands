import InputError from "@/Components/InputError";
import UserAuthenticatedLayout from "@/Layouts/UserAuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { IoChevronBackCircle } from "react-icons/io5";
export default function CancelOrder({ auth }) {
    const { id } = usePage().props;
    const [selectedReason, setSelectedReason] = useState("");
    const [otherReason, setOtherReason] = useState("");

    const handleReasonChange = (event) => {
        setSelectedReason(event.target.value);
    };

    const handleOtherReasonChange = (event) => {
        setOtherReason(event.target.value);
    };

    useEffect(() => {
        setData("selected_reason", selectedReason);
    }, [selectedReason]);

    useEffect(() => {
        setData("other_reason", otherReason);
    }, [otherReason]);

    const { patch, processing, errors, data, setData } = useForm({
        orderId: id,
        selected_reason: selectedReason,
        other_reason: otherReason,
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        const cancelReason =
            selectedReason === "others" ? otherReason : selectedReason;
        console.log("Cancel Reason:", cancelReason);
        patch(route("order.cancel", data));
    };

    return (
        <UserAuthenticatedLayout user={auth}>
            <Head title="Cancel Order - " />
            <div className="max-w-lg mx-auto p-4 md:p-8 mt-4 md:mt-6 lg:mt-8 bg-slate-50 drop-shadow-xl rounded-lg">
                <div className="w-full mb-4 flex items-center justify-between">
                    <Link
                        href={route("user.myPurchases")}
                        className="items-center hover:text-themeColor text-2xl duration-200 cursor-pointer flex gap-2"
                    >
                        <IoChevronBackCircle />
                        Back
                    </Link>{" "}
                    <h1 className="text-xl font-bold">Cancel Order</h1>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <input
                                id="address"
                                type="radio"
                                value="need to change delivery address"
                                checked={
                                    selectedReason ===
                                    "need to change delivery address"
                                }
                                onChange={handleReasonChange}
                                className="mr-2"
                            />
                            <label htmlFor="address" className="text-gray-700">
                                Need to change delivery address
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                id="quantity"
                                type="radio"
                                value="need to modify quantity"
                                checked={
                                    selectedReason === "need to modify quantity"
                                }
                                onChange={handleReasonChange}
                                className="mr-2"
                            />
                            <label htmlFor="quantity" className="text-gray-700">
                                Need to modify quantity
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                id="payment"
                                type="radio"
                                value="payment procedure too troublesome"
                                checked={
                                    selectedReason ===
                                    "payment procedure too troublesome"
                                }
                                onChange={handleReasonChange}
                                className="mr-2"
                            />
                            <label htmlFor="payment" className="text-gray-700">
                                Payment procedure too troublesome
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                id="cheaper"
                                type="radio"
                                value="found cheaper elsewhere"
                                checked={
                                    selectedReason === "found cheaper elsewhere"
                                }
                                onChange={handleReasonChange}
                                className="mr-2"
                            />
                            <label htmlFor="cheaper" className="text-gray-700">
                                Found cheaper elsewhere
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                id="no-buy"
                                type="radio"
                                value="dont want to buy anymore"
                                checked={
                                    selectedReason ===
                                    "dont want to buy anymore"
                                }
                                onChange={handleReasonChange}
                                className="mr-2"
                            />
                            <label htmlFor="no-buy" className="text-gray-700">
                                Don't want to buy anymore
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                id="others"
                                type="radio"
                                value="others"
                                checked={selectedReason === "others"}
                                onChange={handleReasonChange}
                                className="mr-2"
                            />
                            <label htmlFor="others" className="text-gray-700">
                                Others
                            </label>
                        </div>
                        {selectedReason === "others" && (
                            <div>
                                <textarea
                                    className="w-full p-2 border border-gray-300 rounded mt-2"
                                    placeholder="Please specify the reason"
                                    value={otherReason}
                                    onChange={handleOtherReasonChange}
                                    rows="3"
                                />
                                <InputError
                                    message={errors.other_reason}
                                ></InputError>
                            </div>
                        )}
                    </div>
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-themeColor text-white py-2 mt-4 rounded hover:bg-orange-600 transition-colors"
                    >
                        {processing ? "Cancelling order..." : "Cancel Order"}
                    </button>
                </form>
            </div>
        </UserAuthenticatedLayout>
    );
}
