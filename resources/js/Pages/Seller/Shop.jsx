import SellerAuthenticatedLayout from "@/Layouts/SellerAuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { lazy, useEffect, useState } from "react";
import { FaMoneyBillWave, FaShippingFast, FaBoxOpen } from "react-icons/fa";
import { LuPackageCheck } from "react-icons/lu";
import { TbBasketCancel } from "react-icons/tb";
import { Suspense } from "react-is";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const IncomingOrders = lazy(() =>
    import("./Partials/Shop-Partials/IncomingOrders")
);
const ToReceive = lazy(() => import("./Partials/Shop-Partials/ToReceive"));
const Processed = lazy(() => import("./Partials/Shop-Partials/Processed"));
const Delivered = lazy(() => import("./Partials/Shop-Partials/Delivered"));
const Cancelled = lazy(() => import("./Partials/Shop-Partials/Cancelled"));

export default function Shop({ auth }) {
    const { flash, orders } = usePage().props;

    const [activeTab, setActiveTab] = useState();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get("activeTab") || "incomingOrders";
        setActiveTab(category);
    }, []);

    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
        const url = new URL(window.location);
        url.searchParams.set("activeTab", tabId);
        window.history.pushState({}, "", url);
    };
    const tabs = [
        {
            id: "incomingOrders",
            label: "Incoming Orders",
            icon: <FaMoneyBillWave />,
        },
        { id: "processed", label: "Processed", icon: <FaShippingFast /> },
        { id: "toReceive", label: "To Receive", icon: <FaBoxOpen /> },
        { id: "delivered", label: "Delivered", icon: <LuPackageCheck /> },
        { id: "cancelled", label: "Cancelled", icon: <TbBasketCancel /> },
    ];

    useEffect(() => {
        if (flash.status == "success") {
            toast.success(flash.message);
        } else {
            toast.error(flash.message);
        }
    }, [flash]);

    return (
        <>
            <SellerAuthenticatedLayout
                user={auth}
                notificationCount={auth.notificationCount}
            >
                <Head title="Seller - Dashboard" />
                <ToastContainer />
                <div className="container mx-auto p-6">
                    <div className="bg-white shadow-md rounded-lg p-6 pt-2">
                        {/* tab area */}
                        <div className="">
                            <ul className="flex justify-around border-b overflow-y-auto">
                                {tabs.map((tab) => (
                                    <li
                                        key={tab.id}
                                        className={`cursor-pointer p-4 flex-col md:flex-row text-slate-700 flex items-center space-x-2 transition-colors duration-200 ${
                                            activeTab === tab.id
                                                ? "border-b-2 border-themeColor text-themeColor"
                                                : "hover:text-themeColor"
                                        }`}
                                        onClick={() => handleTabChange(tab.id)}
                                    >
                                        {tab.icon}
                                        <span className="whitespace-nowrap">
                                            {tab.label}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="space-y-4">
                            <Suspense fallback={<div>Loading...</div>}>
                                {activeTab === "incomingOrders" && (
                                    <IncomingOrders
                                        incomingOrdersData={orders.data.filter(
                                            (order) => {
                                                return (
                                                    order.status ===
                                                        "order placed" &&
                                                    !order.is_preparing &&
                                                    !order.is_ready_for_pickup &&
                                                    !order.is_picked_up &&
                                                    !order.is_in_transit &&
                                                    !order.is_out_for_delivery &&
                                                    !order.is_delivered &&
                                                    !order.is_cancelled
                                                );
                                            }
                                        )}
                                    />
                                )}
                                {activeTab === "processed" && (
                                    <Processed
                                        processedData={orders.data.filter(
                                            (order) => {
                                                return (
                                                    (order.status ===
                                                        "preparing" ||
                                                        order.status ===
                                                            "shipped") &&
                                                    order.is_cancelled == false
                                                );
                                            }
                                        )}
                                    />
                                )}
                                {activeTab === "toReceive" && (
                                    <ToReceive
                                        processedData={orders.data.filter(
                                            (order) => {
                                                return (
                                                    order.status == "shipped" &&
                                                    order.is_cancelled == false
                                                );
                                            }
                                        )}
                                    />
                                )}
                                {activeTab === "delivered" && (
                                    <Delivered
                                        processedData={orders.data.filter(
                                            (order) => {
                                                return (
                                                    order.status ==
                                                        "delivered" &&
                                                    order.is_delivered &&
                                                    order.is_cancelled == false
                                                );
                                            }
                                        )}
                                    />
                                )}
                                {activeTab === "cancelled" && (
                                    <Cancelled
                                        canceledData={orders.data.filter(
                                            (order) => {
                                                return (
                                                    order.status ===
                                                        "cancelled" &&
                                                    order.is_cancelled
                                                );
                                            }
                                        )}
                                    />
                                )}
                            </Suspense>
                        </div>
                    </div>
                </div>
            </SellerAuthenticatedLayout>
        </>
    );
}
