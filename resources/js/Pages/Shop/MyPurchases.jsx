import UserAuthenticatedLayout from "@/Layouts/UserAuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { lazy, Suspense, useEffect, useState } from "react";
import {
    FaMoneyBillWave,
    FaShippingFast,
    FaBoxOpen,
    FaStar,
} from "react-icons/fa";
import { LuPackageCheck } from "react-icons/lu";
import { TbBasketCancel } from "react-icons/tb";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToPay = lazy(() => import("./Partials/ToPay"));
const ToShip = lazy(() => import("./Partials/TopShip"));
const ToReceive = lazy(() => import("./Partials/ToReceive"));
const Completed = lazy(() => import("./Partials/Completed"));
const ToRate = lazy(() => import("./Partials/ToRate"));
const Cancelled = lazy(() => import("./Partials/Cancelled"));

export default function MyPurchases({ auth }) {
    const { flash, purchases, myReviews } = usePage().props;

    const [activeTab, setActiveTab] = useState();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const param = urlParams.get("activeTab") || "toPay";
        setActiveTab(param);
    });

    const tabs = [
        { id: "toPay", label: "To Pay", icon: <FaMoneyBillWave /> },
        { id: "toShip", label: "To Ship", icon: <FaShippingFast /> },
        { id: "toReceive", label: "To Receive", icon: <FaBoxOpen /> },
        { id: "completed", label: "Completed", icon: <LuPackageCheck /> },
        { id: "toRate", label: "To Rate", icon: <FaStar /> },
        { id: "cancelled", label: "Cancelled", icon: <TbBasketCancel /> },
    ];

    const handleChangeTab = (tabId) => {
        setActiveTab(tabId);
        const url = new URL(window.location);
        url.searchParams.set("activeTab", tabId);
        window.history.pushState({ activeTab }, "", url);
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
            <UserAuthenticatedLayout
                user={auth.user}
                cartNumber={auth.cartCount}
            >
                <Head title="My Purchases" />
                <ToastContainer />
                <div className="lg:mx-auto max-w-7xl 2xl:min-w-[80rem] ">
                    <div className="py-6 mx-auto sm:px-6 lg:px-8">
                        <h1 className="mb-6 text-3xl font-bold">My Purchases</h1>

                        <div className="mb-6">
                            <ul className="flex justify-around overflow-y-auto border-b">
                                {tabs.map((tab) => (
                                    <li
                                        key={tab.id}
                                        className={`cursor-pointer p-4 flex-col md:flex-row text-slate-700 flex items-center space-x-2 transition-colors duration-200 ${activeTab === tab.id
                                            ? "border-b-2 border-themeColor text-themeColor"
                                            : "hover:text-themeColor"
                                            }`}
                                        onClick={(e) => handleChangeTab(tab.id)}
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
                                {activeTab === "toPay" && (
                                    <ToPay
                                        toPay={purchases.data
                                            .map((bulk) => ({
                                                ...bulk,
                                                items: bulk.items.filter(
                                                    (product) =>
                                                        product.status ==
                                                        "order placed" &&
                                                        !product.is_preparing &&
                                                        !product.is_ready_for_pickup &&
                                                        !product.is_picked_up &&
                                                        !product.is_in_transit &&
                                                        !product.is_out_for_delivery &&
                                                        !product.is_delivered &&
                                                        !product.is_cancelled
                                                ),
                                            }))
                                            .filter(
                                                (bulk) => bulk.items.length > 0
                                            )}
                                    />
                                )}
                                {activeTab === "toShip" && (
                                    <ToShip
                                        toShipData={purchases.data
                                            .map((bulk) => ({
                                                ...bulk,
                                                items: bulk.items.filter(
                                                    (product) =>
                                                        product.status ==
                                                        "pending" ||
                                                        product.status ==
                                                        "preparing"
                                                ),
                                            }))
                                            .filter(
                                                (bulk) => bulk.items.length > 0
                                            )}
                                    />
                                )}
                                {activeTab === "toReceive" && (
                                    <ToReceive
                                        toReceiveData={purchases.data
                                            .map((bulk) => ({
                                                ...bulk,
                                                items: bulk.items.filter(
                                                    (product) =>
                                                        product.status == "shipped"
                                                ),
                                            }))
                                            .filter(
                                                (bulk) => bulk.items.length > 0
                                            )}
                                    />
                                )}
                                {activeTab === "completed" && (
                                    <Completed
                                        completedData={purchases.data
                                            .map((bulk) => ({
                                                ...bulk,
                                                items: bulk.items.filter(
                                                    (product) =>
                                                        product.status ==
                                                        "delivered" &&
                                                        product.is_delivered
                                                ),
                                            }))
                                            .filter(
                                                (bulk) => bulk.items.length > 0
                                            )}
                                    />
                                )}
                                {activeTab === "toRate" && (
                                    <ToRate
                                        myReviewsData={myReviews.data}
                                        toRateData={purchases.data
                                            .map((bulk) => ({
                                                ...bulk,
                                                items: bulk.items.filter(
                                                    (product) =>
                                                        product.status ==
                                                        "delivered" &&
                                                        product.is_delivered &&
                                                        !product.is_rated
                                                ),
                                            }))
                                            .filter(
                                                (bulk) => bulk.items.length > 0
                                            )}
                                    />
                                )}
                                {activeTab === "cancelled" && (
                                    <Cancelled
                                        cancelled={purchases.data
                                            .map((bulk) => ({
                                                ...bulk,
                                                items: bulk.items.filter(
                                                    (product) =>
                                                        product.status ==
                                                        "cancelled" &&
                                                        product.is_cancelled
                                                ),
                                            }))
                                            .filter(
                                                (bulk) => bulk.items.length > 0
                                            )}
                                    />
                                )}
                            </Suspense>
                        </div>
                    </div></div>
            </UserAuthenticatedLayout>
        </>
    );
}
