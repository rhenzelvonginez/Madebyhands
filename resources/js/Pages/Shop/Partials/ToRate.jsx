import { usePage } from "@inertiajs/react";
import { lazy, Suspense, useEffect, useState } from "react";

const ToRateList = lazy(() => import("./ToRateList"));
const MyReviews = lazy(() => import("./ToRateMyReviews"));

export default function ToRate({ toRateData, myReviewsData }) {
    const { flash } = usePage().props;

    const [activeRateTab, setActiveRateTab] = useState();
    const tabs = [
        { id: "toRate", label: "To Rate" },
        { id: "myReviews", label: "My Reviews" },
    ];

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const params = urlParams.get("activeRateTab") || "toRate";
        setActiveRateTab(params);
    });

    const handleChangeTab = (tabId) => {
        setActiveRateTab(tabId);
        const url = new URL(window.location);
        url.searchParams.set("activeRateTab", tabId);
        window.history.pushState({ activeRateTab }, "", url);
    };

    return (
        <div className="bg-white px-4 pb-4 -pt-4 rounded-lg shadow-md">
            <div className="mb-6">
                <ul className="flex justify-around border-b overflow-y-auto">
                    {tabs.map((tab) => (
                        <li
                            key={tab.id}
                            className={`cursor-pointer pb-4 flex-col md:flex-row text-slate-700 flex items-center space-x-2 transition-colors duration-200 ${
                                activeRateTab === tab.id
                                    ? "border-b-2 border-themeColor text-themeColor"
                                    : "hover:text-themeColor"
                            }`}
                            onClick={(e) => handleChangeTab(tab.id)}
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
                <Suspense fallback={<div>Loading....</div>}>
                    {activeRateTab == "toRate" && (
                        <ToRateList data={toRateData} />
                    )}
                    {activeRateTab == "myReviews" && (
                        <MyReviews data={myReviewsData} />
                    )}
                </Suspense>
            </div>
        </div>
    );
}
