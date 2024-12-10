import { Link } from "@inertiajs/react";
export default function Completed({ completedData }) {
    console.log(completedData);
    return (
        <>
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-2">Order Received</h2>
                {completedData.length == 0 || completedData == null
                    ? "There is no to ship item"
                    : ""}
                {completedData.map((bulk) => {
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
                                            Order Received
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
                                </div>
                            </Link>
                        </div>
                    ));
                })}
            </div>
        </>
    );
}
