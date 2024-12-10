import { useState, useEffect } from "react";
import StarRating from "./StarRating";
import Quantity from "./Quantity";
import { useForm, router, usePage } from "@inertiajs/react";
import SpinnerLoading from "./SpinnerLoading";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddToCart({
    isOpen,
    onClose,
    name,
    stock,
    price,
    itemImage,
    rating,
    product_id,
}) {
    const [isVisible, setIsVisible] = useState(true);
    const [userQuantity, setUserQuantity] = useState(0);

    useEffect(() => {
        setIsVisible(isOpen);
    }, [isOpen]);

    const handleKeyDown = (e) => {
        if (e.key === "Escape") {
            onClose();
        }
    };

    useEffect(() => {
        if (isVisible) {
            document.addEventListener("keydown", handleKeyDown);
        } else {
            document.removeEventListener("keydown", handleKeyDown);
        }
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isVisible, onClose]);

    const closeModal = () => {
        setIsVisible(false);
        onClose();
    };

    const handleQuantityChange = (newQuantity) => {
        setData("quantity", newQuantity);
    };

    const { data, post, errors, setData, processing } = useForm({
        product_id: product_id,
        quantity: userQuantity,
    });

    const { flash } = usePage().props;

    const submitToCart = (e) => {
        e.preventDefault();

        post(route("cart.store"), {
            onSuccess: () => {
                toast.success(
                    flash.message || "Item added to cart successfully!"
                );
                sleep(100);
                closeModal();
            },
            onError: () => {
                toast.error("Something went wrong");
                sleep(500);
                closeModal();
            },
        });
    };

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    return (
        <>
            <ToastContainer />
            {isVisible && (
                <div
                    className={`fixed inset-0 flex items-center backdrop-blur-md justify-center bg-gray-900 bg-opacity-50 z-50 transition-opacity ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                        }`}
                >
                    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
                        <h2 className="mb-4 text-xl font-bold">Add to cart</h2>
                        <form onSubmit={submitToCart} method="post">
                            <div className="flex gap-2">
                                <img
                                    src={itemImage}
                                    alt="Sample Image"
                                    className="rounded-md h-[12rem] w-[12rem] cursor-pointer object-cover"
                                />
                                <div className="px-3 grow">
                                    <input
                                        type="text"
                                        disabled
                                        value={name}
                                        hidden
                                    />
                                    <h1 className="text-xl font-bold text-slate-800">
                                        {name}
                                    </h1>
                                    <StarRating rating={rating} />
                                    <p>
                                        Stocks: <span>{stock}</span>
                                    </p>
                                    <Quantity
                                        quantity={userQuantity}
                                        currentStock={stock}
                                        onQuantityChange={handleQuantityChange}
                                    />
                                    <p className="mt-1 text-2xl">
                                        Price:
                                        <span> Php {price}</span>
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center justify-end w-full mt-2">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-4 py-2 mr-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                                >
                                    Close
                                </button>
                                <button
                                    disabled={processing}
                                    type="submit"
                                    className="flex items-center gap-2 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                                >
                                    {!processing ? (
                                        "Add to cart"
                                    ) : (
                                        <SpinnerLoading loadingInfo="Adding to cart" />
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
