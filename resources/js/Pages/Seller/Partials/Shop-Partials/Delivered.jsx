import { Suspense, useEffect, useState } from "react";
import { VscPackage } from "react-icons/vsc";
export default function Delivered({ processedData }) {
    console.log(processedData);

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {processedData.length == 0 ? (
                    <div className="flex flex-col items-center col-span-3 justify-center h-full text-center py-10">
                        <VscPackage size={80} className="text-themeColor" />
                        <h2 className="text-lg font-semibold text-gray-700">
                            No Pending Orders
                        </h2>
                        <p className="text-gray-500 mt-2">
                            You have no orders waiting to be processed.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
                        >
                            Refresh
                        </button>
                    </div>
                ) : (
                    processedData.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white border border-slate-300 p-4 rounded-lg shadow-md"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <img
                                    src={
                                        item.images == null ||
                                        item.images.length == 0
                                            ? DefaultProductIcon
                                            : item.images[0].image_path
                                    }
                                    alt={item.product_name}
                                    className="w-24 h-24 object-cover rounded-lg"
                                />
                                <div>
                                    <h3 className="text-lg font-semibold">
                                        {item.product_name}
                                    </h3>
                                    <p className="text-gray-600">
                                        Quantity: {item.quantity}
                                    </p>
                                    <p className="text-gray-600">
                                        Price: Php{" "}
                                        {new Intl.NumberFormat().format(
                                            item.amount
                                        )}
                                    </p>
                                </div>
                            </div>

                            <div className="mb-4 text-slate-800">
                                <h4 className="font-semibold">Buyer:</h4>
                                <p>{item.buyer_data.name}</p>
                                <p>{item.buyer_data.address}</p>
                                <p>{item.buyer_data.phone_no}</p>

                                <p>
                                    {new Date(
                                        item.buyer_data.created_at
                                    ).toLocaleString()}
                                </p>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <strong className="">Payment: </strong>
                                        <span className="uppercase">
                                            {" "}
                                            {item.buyer_data.payment_option}
                                        </span>{" "}
                                    </div>
                                    <div>#{item.order_item_id}</div>
                                </div>
                            </div>
                            <div className=" bg-green-500 text-white  p-1 text-center rounded ">
                                Item Delivered
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    );
}
