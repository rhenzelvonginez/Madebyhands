import { Suspense, useEffect, useState } from "react";
import { lazy } from "react";

const ProcessingPreparing = lazy(() => import("./ProcessingPreparing"));
const ProcessingReadyForPickUp = lazy(() =>
    import("./ProcessingReadyForPickup")
);
const ProcessingForPickUp = lazy(() => import("./ProcessingPickedUp"));
export default function Processed({ processedData }) {
    const [activeProcessingTab, setActiveProcessingTab] = useState();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const category = ["inTransit", "outForDelivery"].includes(
            urlParams.get("activeProcessingTab")
        )
            ? "preparing"
            : urlParams.get("activeProcessingTab") || "preparing";

        setActiveProcessingTab(category);
    }, []);

    const handleTabChange = (tabId) => {
        setActiveProcessingTab(tabId);
        const url = new URL(window.location);
        url.searchParams.set("activeProcessingTab", tabId);
        window.history.pushState({}, "", url);
    };

    const tabs = [
        { id: "preparing", label: "Preparing" },
        { id: "readyForPickup", label: "Ready for Pickup" },
        { id: "forPickUp", label: "Already picked up" },
    ];

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
                    {activeProcessingTab === "preparing" && (
                        <ProcessingPreparing
                            processingPreparingData={processedData.filter(
                                (order) => {
                                    return (
                                        order.status === "preparing" &&
                                        order.is_preparing == true &&
                                        order.is_ready_for_pickup == false
                                    );
                                }
                            )}
                        />
                    )}
                    {activeProcessingTab === "readyForPickup" && (
                        <ProcessingReadyForPickUp
                            processingReadyForPickUpData={processedData.filter(
                                (order) => {
                                    return (
                                        order.status === "preparing" &&
                                        order.is_preparing == true &&
                                        order.is_ready_for_pickup == true &&
                                        order.is_picked_up == false
                                    );
                                }
                            )}
                        />
                    )}
                    {activeProcessingTab === "forPickUp" && (
                        <ProcessingForPickUp
                            processingForPickUpData={processedData.filter(
                                (order) => {
                                    return (
                                        order.status === "shipped" &&
                                        order.is_preparing == true &&
                                        order.is_ready_for_pickup == true &&
                                        order.is_picked_up == true &&
                                        order.is_in_transit == false
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
