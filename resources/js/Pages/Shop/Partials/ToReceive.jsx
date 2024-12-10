import { Link, useForm } from "@inertiajs/react";
import { useState } from "react";
export default function ToReceive({ toReceiveData }) {
    console.log(toReceiveData);
    const { patch, processing } = useForm();
    const [currentId, setCurrentId] = useState();
    const handleOrderReceived = (e, id) => {
        e.preventDefault();
        setCurrentId(id);
        patch(route("order.received", { id }));
    };
    return (
        <>
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-2">To Receive</h2>
                {toReceiveData.length == 0 ? "There is no to ship item" : ""}
                {toReceiveData.map((bulk) => {
                    return bulk.items.map((product) => (
                        <div
                            key={product.id}
                            className="bg-slate-50 shadow rounded-lg p-1 mb-6"
                        >
                            <Link
                                href={route(
                                    "order.details",
                                    product.order_item_id
                                )}
                                className="p-4 border flex w-full gap-2 flex-col lg:flex-row lg:items-center items-start lg:justify-between  rounded-lg bg-white "
                            >
                                <div className=" flex flex-row gap-3 items-center">
                                    <img
                                        className="w-24 h-24 object-cover"
                                        src={
                                            product.images.length === 0
                                                ? "DefaultProductIcon"
                                                : product.images[0].image_path
                                        }
                                        alt="Product"
                                    />

                                    <div>
                                        <p className="text-gray-700">
                                            Product Name: {product.product_name}
                                        </p>
                                        <p className="text-gray-700">
                                            Category: {product.category}
                                        </p>
                                        <p className="text-gray-700">
                                            Price:{" " + product.price}
                                        </p>
                                        <p className="text-gray-700">
                                            Quantity: {product.quantity}
                                        </p>
                                        <div className="uppercase text-xs py-1 px-2 bg-green-200 text-green-800 w-fit rounded-full">
                                            {product.is_out_for_delivery
                                                ? "Order is out for delivery!"
                                                : product.status}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2 w-full lg:w-fit lg:flex-col justify-between lg:justify-normal lg:items-end">
                                    <div className=" flex gap-2 ">
                                        <h1>Order Total:</h1>
                                        <p className=" text-themeColor">
                                            ₱{" "}
                                            {new Intl.NumberFormat().format(
                                                product.quantity * product.price
                                            )}
                                        </p>
                                    </div>
                                    {product.is_out_for_delivery ? (
                                        <button
                                            disabled={processing}
                                            onClick={(e) =>
                                                handleOrderReceived(
                                                    e,
                                                    product.id
                                                )
                                            }
                                            className="bg-themeColor duration-200 hover:bg-orange-500 ease-in-out  px-2 py-1 text-white rounded-md"
                                        >
                                            {currentId == product.id
                                                ? "Processing..."
                                                : "Order Received"}
                                        </button>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </Link>
                        </div>
                    ));
                })}
            </div>
        </>
    );
}
