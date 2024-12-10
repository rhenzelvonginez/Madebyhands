import { Suspense, useEffect, useState } from "react";
import { lazy } from "react";

const ToReceiveInTransit = lazy(() => import("./ToReceiveInTransit"));
const ToReceiveOutForDelivery = lazy(() => import("./ToReceiveOutForDelivery"));

export default function ToReceive({ processedData }) {
    const [activeProcessingTab, setActiveProcessingTab] = useState();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const category = ["preparing", "readyForPickup", "forPickUp"].includes(
            urlParams.get("activeProcessingTab")
        )
            ? "inTransit"
            : urlParams.get("activeProcessingTab") || "inTransit";

        setActiveProcessingTab(category);
    }, []);

    const handleTabChange = (tabId) => {
        setActiveProcessingTab(tabId);
        const url = new URL(window.location);
        url.searchParams.set("activeProcessingTab", tabId);
        window.history.pushState({}, "", url);
    };

    const tabs = [
        { id: "inTransit", label: "In Transit" },
        { id: "outForDelivery", label: "Out for Delivery" },
    ];

    // const test = processedData.filter((order) => {
    //     return (
    //         order.status === "preparing" &&
    //         // order.status === "shipped" &&
    //         order.is_preparing == true &&
    //         order.is_ready_for_pickup == true &&
    //         order.is_picked_up == true &&
    //         order.is_in_transit == true &&
    //         order.is_out_for_delivery == true &&
    //         order.is_delivered == false
    //     );
    // });

    // console.log("to receive parent", test);

    return (
        <>
            {/* tab area */}
            <div>
                <ul className="flex justify-around border-b overflow-y-auto">
                    {tabs.map((tab) => (
                        <li
                            key={tab.id}
                            className={`cursor-pointer p-4 flex-col md:flex-row text-slate-700 flex items-center space-x-2 transition-colors duration-200 ${
                                activeProcessingTab === tab.id
                                    ? "border-b-2 border-themeColor text-themeColor"
                                    : "hover:text-themeColor"
                            }`}
                            onClick={() => handleTabChange(tab.id)}
                        >
                            <span className="whitespace-nowrap">
                                {tab.label}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
            {/* content area */}
            <div className="space-y-4">
                <Suspense fallback={<div>Loading...</div>}>
                    {activeProcessingTab === "inTransit" && (
                        <ToReceiveInTransit
                            toReceiveInTransitData={processedData.filter(
                                (order) => {
                                    return (
                                        order.status === "shipped" &&
                                        order.is_preparing == true &&
                                        order.is_ready_for_pickup == true &&
                                        order.is_picked_up == true &&
                                        order.is_in_transit == true &&
                                        order.is_out_for_delivery == false
                                    );
                                }
                            )}
                        />
                    )}
                    {activeProcessingTab === "outForDelivery" && (
                        <ToReceiveOutForDelivery
                            toReceiveOutForDeliveryData={processedData.filter(
                                (order) => {
                                    return (
                                        order.status === "shipped" &&
                                        order.is_preparing == true &&
                                        order.is_ready_for_pickup == true &&
                                        order.is_picked_up == true &&
                                        order.is_in_transit == true &&
                                        order.is_out_for_delivery == true &&
                                        order.is_delivered == false
                                    );
                                }
                            )}
                        />
                    )}
                </Suspense>
            </div>
        </>
    );
}
