import UserAuthenticatedLayout from "@/Layouts/UserAuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { RiBillLine } from "react-icons/ri";
import { MdOutlinePayments } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { LuPackageCheck } from "react-icons/lu";
import { MdOutlineStarRate } from "react-icons/md";
import { IoChevronBackCircle } from "react-icons/io5";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function OrderDetais({ auth }) {
    const { data, flash } = usePage().props;
    console.log(data);
    const { processing, patch } = useForm();
    const [currentId, setCurrentId] = useState();

    const handleOrderReceived = (e, id) => {
        e.preventDefault();
        setCurrentId(id);

        patch(route("order.received", { id }), {
            onFinish: () => {
                setCurrentId(null);
            },
        });
    };
    useEffect(() => {
        if (flash.status == "success") {
            toast.success(flash.message);
        } else {
            toast.error(flash.message);
        }
    }, [flash]);
    return (
        <>
            <UserAuthenticatedLayout user={auth}>
                <Head title="No. - Order Details" />
                <ToastContainer />
                <div className="max-w-4xl mx-auto p-4">
                    <div className="bg-white shadow-md rounded-md p-4 mb-6">
                        <div className="flex flex-col sm:flex-row items-center justify-between">
                            <div className="flex items-center justify-between  w-full  text-gray-500">
                                <Link
                                    href={route("user.myPurchases")}
                                    className="items-center hover:text-themeColor duration-200 cursor-pointer flex gap-2"
                                >
                                    <IoChevronBackCircle />
                                    Back
                                </Link>
                                <span className="text-sm">
                                    <strong> ORDER ID:</strong>{" "}
                                    {data.order_item_id} |
                                    <span className="uppercase text-red-500 ml-2 font-semibold">
                                        {data.status}
                                    </span>
                                </span>
                            </div>
                        </div>

                        <div className="mt-4 lg:mt-6">
                            <div className="relative flex justify-between items-center">
                                {/* Progress Line */}
                                <div className="absolute top-[1rem] left-[2rem] right-[2rem] h-1.5 bg-themeColor"></div>{" "}
                                {/* Order Placed */}
                                <div className="relative z-10 flex flex-col items-center">
                                    <div className="bg-themeColor flex items-center justify-center rounded-full w-10 h-10">
                                        <RiBillLine
                                            className="text-white"
                                            size={25}
                                        />
                                    </div>
                                    <span className="text-xs mt-2 text-gray-500 text-center min-h-[2rem]">
                                        Order Placed
                                    </span>
                                </div>
                                {/* Order Paid */}
                                <div className="relative z-20 flex flex-col items-center">
                                    <div
                                        className={` flex items-center justify-center rounded-full w-10 h-10 ${
                                            data.status == "pending" ||
                                            "preparing"
                                                ? "bg-themeColor text-white"
                                                : "border-2 bg-white border-themeColor"
                                        }`}
                                    >
                                        <MdOutlinePayments size={25} />
                                    </div>
                                    <span className="text-xs mt-2 text-gray-500 text-center min-h-[2rem]">
                                        Order Paid (
                                        <span className="uppercase">
                                            {data.order.payment_option}
                                        </span>
                                        )
                                    </span>
                                </div>
                                {/* Order Shipped Out */}
                                <div className="relative z-10 flex flex-col items-center">
                                    <div
                                        className={` flex items-center justify-center rounded-full w-10 h-10 ${
                                            data.status == "shipped" ||
                                            data.status == "delivered"
                                                ? "bg-themeColor "
                                                : "border-2 bg-white border-themeColor text-themeColor"
                                        }`}
                                    >
                                        <TbTruckDelivery
                                            size={25}
                                            className={`${
                                                data.is_picked_up
                                                    ? "text-white"
                                                    : "text-themeColor"
                                            }`}
                                        />
                                    </div>

                                    <span className="text-xs mt-2 text-gray-500 text-center min-h-[2rem]">
                                        Order Shipped Out
                                    </span>
                                </div>
                                {/* Order Received */}
                                <div className="relative z-10 flex flex-col items-center">
                                    <div
                                        className={` flex items-center justify-center rounded-full w-10 h-10 ${
                                            data.is_out_for_delivery
                                                ? "bg-themeColor "
                                                : "border-2 bg-white border-themeColor"
                                        }`}
                                    >
                                        <LuPackageCheck
                                            size={25}
                                            className={`${
                                                data.is_out_for_delivery
                                                    ? "text-white"
                                                    : "text-themeColor"
                                            }`}
                                        />
                                    </div>

                                    <span className="text-xs mt-2 text-gray-500 text-center min-h-[2rem]">
                                        Out for Delivery
                                    </span>
                                </div>
                                {/* Order Completed */}
                                <div className="relative z-10 flex flex-col items-center">
                                    <div
                                        className={` flex items-center justify-center rounded-full w-10 h-10 ${
                                            data.is_delivered
                                                ? "bg-themeColor "
                                                : "border-2 bg-white border-themeColor"
                                        }`}
                                    >
                                        <MdOutlineStarRate
                                            size={25}
                                            className={`${
                                                data.is_delivered
                                                    ? "text-white"
                                                    : "text-themeColor"
                                            }`}
                                        />
                                    </div>
                                    <span className="text-xs mt-2 text-gray-500 text-center min-h-[2rem]">
                                        Order Completed
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white shadow-md rounded-md p-4 mb-6">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            Delivery Address
                        </h3>
                        <p className="text-sm text-gray-500">
                            {data.order.name}
                            <br /> {data.order.address} <br />{" "}
                            {data.order.phone_no}
                        </p>
                    </div>

                    <div className="bg-white shadow-md rounded-md p-4">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">
                            Shipment Tracking
                        </h3>
                        <div className="overflow-auto">
                            <ul className="text-sm text-gray-500 space-y-4">
                                {data.is_cancelled ? (
                                    <li className="text-red-600 font-semibold">
                                        <span>Out for Delivery:</span>{" "}
                                        {new Date(
                                            data.is_cancelled_date
                                        ).toLocaleDateString()}{" "}
                                        {new Date(
                                            data.is_cancelled_date
                                        ).toLocaleTimeString()}
                                        - Your cancelled your order.
                                    </li>
                                ) : (
                                    ""
                                )}
                                {data.is_delivered ? (
                                    <li className="text-green-600 font-semibold">
                                        <span>Item Received:</span>{" "}
                                        {new Date(
                                            data.is_delivered_date
                                        ).toLocaleDateString()}{" "}
                                        {new Date(
                                            data.is_delivered_date
                                        ).toLocaleTimeString()}
                                        - Your order has been delivered
                                        successfully.
                                    </li>
                                ) : (
                                    ""
                                )}
                                {data.is_out_for_delivery ? (
                                    <li>
                                        <span className="text-blue-500 font-semibold">
                                            Out for Delivery:
                                        </span>{" "}
                                        {new Date(
                                            data.is_out_for_delivery_date
                                        ).toLocaleDateString()}{" "}
                                        {new Date(
                                            data.is_out_for_delivery_date
                                        ).toLocaleTimeString()}
                                        - Your order is out for delivery and
                                        will arrive soon.
                                    </li>
                                ) : (
                                    ""
                                )}
                                {data.is_in_transit ? (
                                    <li>
                                        <span className="text-blue-500 font-semibold">
                                            In transit:
                                        </span>{" "}
                                        {new Date(
                                            data.is_in_transit_date
                                        ).toLocaleDateString()}{" "}
                                        {new Date(
                                            data.is_in_transit_date
                                        ).toLocaleTimeString()}
                                        - Your order is currently in transit to
                                        your destination {data.order.address}.
                                    </li>
                                ) : (
                                    ""
                                )}
                                {data.is_picked_up ? (
                                    <li>
                                        <span className="text-blue-500 font-semibold">
                                            Order pick up:
                                        </span>{" "}
                                        {new Date(
                                            data.is_picked_up_date
                                        ).toLocaleDateString()}{" "}
                                        {new Date(
                                            data.is_picked_up_date
                                        ).toLocaleTimeString()}
                                        - Your order has been successfully
                                        picked up by the courier and its on way
                                        to your address.
                                    </li>
                                ) : (
                                    ""
                                )}
                                {data.is_ready_for_pickup ? (
                                    <li>
                                        <span className="text-blue-500 font-semibold">
                                            To be pickup by the courier:
                                        </span>{" "}
                                        {new Date(
                                            data.is_ready_for_pickup_date
                                        ).toLocaleDateString()}{" "}
                                        {new Date(
                                            data.is_ready_for_pickup_date
                                        ).toLocaleTimeString()}
                                        - Your order is ready for pickup by the
                                        courier.
                                    </li>
                                ) : (
                                    ""
                                )}
                                {data.is_preparing ? (
                                    <li>
                                        <span className="text-blue-500 font-semibold">
                                            Order is Preparing:
                                        </span>{" "}
                                        {new Date(
                                            data.is_preparing_date
                                        ).toLocaleDateString()}{" "}
                                        {new Date(
                                            data.is_preparing_date
                                        ).toLocaleTimeString()}
                                        - Your order is being prepared and will
                                        be ready soon.
                                    </li>
                                ) : (
                                    ""
                                )}

                                <li>
                                    <span className="text-blue-500 font-semibold">
                                        Order placed:
                                    </span>{" "}
                                    {new Date(
                                        data.created_at
                                    ).toLocaleDateString()}{" "}
                                    {new Date(
                                        data.created_at
                                    ).toLocaleTimeString()}
                                    - Your package is being prepared for
                                    shipment and will soon be in transit to its
                                    final destination.
                                </li>
                            </ul>
                        </div>
                        <p className="text-sm text-gray-400 mt-4">
                            Tracking Number:{" "}
                            <span className="text-gray-600">
                                {data.tracking_number == null
                                    ? "Waiting for seller to put the tracking number"
                                    : data.tracking_number}
                            </span>
                        </p>
                    </div>
                    {data.is_out_for_delivery ? (
                        <button
                            disabled={processing || data.is_delivered}
                            onClick={(e) => handleOrderReceived(e, data.id)}
                            className={`mt-4 mb-6 w-full px-2 py-1 text-white rounded-md ${
                                data.is_delivered
                                    ? " bg-orange-600 cursor-default"
                                    : " duration-200 bg-themeColor  hover:bg-orange-500 ease-in-out "
                            }`}
                        >
                            {currentId == data.id
                                ? "Processing..."
                                : "Order Received"}
                        </button>
                    ) : (
                        ""
                    )}
                </div>
            </UserAuthenticatedLayout>
        </>
    );
}
