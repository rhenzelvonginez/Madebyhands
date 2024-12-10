import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

export default function Cancelled({ canceledData }) {
    console.log("cancelled data ", canceledData);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenId, setIsOpenId] = useState();

    const toggleDropdown = (id) => {
        setIsOpen(!isOpen);
        setIsOpenId(id);
    };
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {canceledData.length == 0 ? (
                    <div className=" mt-4 bg-blue-100 text-blue-800 p-3 col-span-3  w-full max-w-md mx-auto rounded-lg border text-center border-blue-500">
                        No Cancelled orders found.
                    </div>
                ) : (
                    canceledData.map((item) => (
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
                                <div>
                                    <strong className="">Payment: </strong>
                                    <span className="uppercase">
                                        {" "}
                                        {item.buyer_data.payment_option}
                                    </span>{" "}
                                </div>
                                <p>
                                    {new Date(
                                        item.buyer_data.created_at
                                    ).toLocaleString()}
                                </p>
                            </div>

                            <div
                                onClick={() => toggleDropdown(item.id)}
                                className="w-full bg-slate-100 cursor-pointer flex items-center justify-between px-4 font-bold  text-slate-800 p-2 rounded-lg"
                            >
                                Order Cancelled
                                {isOpen && item.id == isOpenId ? (
                                    <IoIosArrowUp size={20} />
                                ) : (
                                    <IoIosArrowDown size={20} />
                                )}
                            </div>
                            <div
                                className={`mt-2 p-2 bg-themeColor text-white border rounded-lg shadow-md transition-all duration-300 ease-in-out ${
                                    isOpen && item.id === isOpenId
                                        ? "max-h-40 opacity-100"
                                        : "max-h-0 opacity-0 overflow-hidden"
                                }`}
                            >
                                <p className="font-semibold">
                                    Reason for Cancellation:
                                </p>
                                <p className="capitalize">
                                    {item.cancelled_reason}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    );
}
