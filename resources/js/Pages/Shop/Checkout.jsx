import UserAuthenticatedLayout from "@/Layouts/UserAuthenticatedLayout";
import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import { FaLocationDot } from "react-icons/fa6";
import ModalImage from "react-modal-image";
import DefaultProductIcon from "../../assets/img/Default-Product-Placeholder.svg";
import SpinnerLoading from "@/Components/SpinnerLoading";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { IoChevronBackCircleSharp } from "react-icons/io5";
import InputError from "@/Components/InputError";

export default function Checkout({ auth }) {
    const { products, flash, props } = usePage().props;
    const name = auth.user.first_name + " " + auth.user.last_name;

    const phone_no = auth.user.phone_no;
    const address = auth.user.address;
    console.log(products);

    const totalItems = products.reduce(
        (acc, item) => acc + parseInt(item.buying_quantity),
        0
    );

    const totalPrice = products.reduce(
        (acc, item) => acc + item.product.price * item.buying_quantity,
        0
    );
    const { data, setData, errors, processing, post } = useForm({
        name: name,
        address: address,
        phone_no: phone_no,
        total: totalPrice,
        payment_method: "cod",
        email: auth.user.email,
        current_url: window.location.href,
        cart_items: products
            .map((item) => {
                if (item.cart_id) {
                    return {
                        cart_id: item.cart_id,
                    };
                } else {
                    return null;
                }
            })
            .filter((item) => item !== null),
        items: products.map((item) => ({
            product_id: item.product.id,
            quantity: item.buying_quantity,
            price: item.product.price,
            shop_name: "testing",
            seller_id: item.seller.id,
            product_name: item.product.product_name,
            category: item.product.category,
        })),
    });

    // const [processing, setProcessing] = useState(false);

    const handleChange = (e) => {
        setData({
            ...data,
            payment_method: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("checkout.store"), data, {
            onSuccess: () => {
                toast.success("Checkout complete");
            },
            onError: () => {
                toast.error("ERROR in submitting");
            },
        });
    };

    useEffect(() => {
        if (flash.message) {
            toast.info(flash.message);
        }
    }, [flash]);
    console.log(products)
    return (
        <UserAuthenticatedLayout user={auth.user}>
            <Head title="Checkout" />
            <ToastContainer />
            <div className="max-w-2xl p-6 mx-auto my-6 bg-white border border-gray-200 shadow-lg md:rounded-lg">
                <div className="flex items-center justify-between ">
                    <button
                        className="flex items-center gap-1 font-bold uppercase duration-200 ease-out cursor-pointer hover:text-themeColor text-mainText"
                        onClick={() => window.history.back()}
                    >
                        <IoChevronBackCircleSharp /> back
                    </button>
                    <h1 className="text-xl font-bold text-center text-gray-800">
                        Checkout
                    </h1>
                </div>
                <form onSubmit={handleSubmit} className="mt-6" method="POST">
                    <div className="p-4 bg-gray-100 rounded-lg">
                        <div className="flex items-center justify-between">
                            <h2 className="flex items-center gap-2 mb-2 text-2xl font-semibold text-gray-700">
                                <FaLocationDot className="text-gray-600" /> Delivery
                                Address
                            </h2>
                            <button disabled className="duration-300 ease-in-out hover:text-themeColor">Change Address</button>
                        </div>
                        <div className="text-gray-600">
                            {name} | {phone_no}
                        </div>
                        <div className="text-gray-600">{address}</div>
                    </div>

                    <h2 className="mt-6 text-2xl font-semibold text-gray-800">
                        Product Details
                    </h2>
                    <div className="mt-4 space-y-4">
                        {/* list of checking out products */}

                        {products.map((item, index) => (
                            <div className="flex items-center justify-between p-4 border border-gray-300 rounded-lg bg-gray-50">
                                <div className="flex items-center gap-3">
                                    <ModalImage
                                        className="object-cover w-24 h-24"
                                        small={
                                            item.images.data.length == 0
                                                ? DefaultProductIcon
                                                : item.images.data[0].image_path
                                        }
                                        large={
                                            item.images.data.length == 0
                                                ? DefaultProductIcon
                                                : item.images.data[0].image_path
                                        }
                                    />
                                    <div>
                                        <p className="font-semibold text-gray-700">
                                            {item.product.product_name}
                                        </p>
                                        <Link
                                            href={route(
                                                "shop.profile",
                                                item.seller.id
                                            )}
                                            className="text-gray-500 duration-100 ease-in-out hover:text-themeColor"
                                        >
                                            Shop: {item.seller.shop_name}
                                        </Link>
                                        <p className="text-gray-500">
                                            Category: {item.product.category}
                                        </p>
                                        <p className="text-gray-700">
                                            Price: Php{" " + item.product.price}
                                        </p>
                                        <p className="text-gray-500">
                                            Quantity: {item.buying_quantity}
                                        </p>
                                        <p className="text-gray-500">
                                            Weight:  {Number(item.product.weight) < 1
                                                ? `${(Number(item.product.weight) * 1000).toFixed(0)} g`
                                                : `${Number(item.product.weight).toFixed(2)} kg`}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-xl font-bold text-gray-800">
                                    Php
                                    {" " +
                                        new Intl.NumberFormat().format(
                                            item.product.price *
                                            item.buying_quantity
                                        )}
                                </p>
                            </div>
                        ))}
                    </div>

                    <h2 className="mt-6 text-2xl font-semibold text-gray-800">
                        Order Summary
                    </h2>
                    <div className="flex justify-between mt-2 font-semibold text-gray-700">
                        <span>Total Shipping Fee: </span>
                    </div>
                    <div className="flex justify-between mt-2 font-semibold text-gray-700">
                        <span>Total Items:</span>
                        <span>{totalItems}</span>
                    </div>
                    <div className="flex justify-between mt-2 font-semibold text-gray-700">
                        <span>Total Price:</span>
                        <span>
                            Php
                            {" " + new Intl.NumberFormat().format(totalPrice)}
                        </span>
                    </div>

                    <h2 className="mt-6 text-2xl font-semibold text-gray-800">
                        Payment Option
                    </h2>
                    <div className="flex flex-col mt-4">
                        <label className="flex items-center mb-2">
                            <input
                                type="radio"
                                name="payment_method"
                                value="cod"
                                checked={data.payment_method === "cod"}
                                onChange={handleChange}
                                className="mr-1"
                            />
                            Cash on Delivery
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="payment_method"
                                value="gcash/paymaya"
                                checked={
                                    data.payment_method === "gcash/paymaya"
                                }
                                onChange={handleChange}
                                className="mr-2"
                            />
                            GCash/ Paymaya
                        </label>

                        {errors.payment_method && (
                            <InputError message={errors.payment_method} />
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full p-3 mt-6 text-white transition duration-200 bg-blue-600 rounded-lg shadow-md hover:bg-blue-700"
                    >
                        {processing ? (
                            <div className="flex items-center justify-center w-full gap-2 ">
                                Placing Order <SpinnerLoading />
                            </div>
                        ) : (
                            "Place Order"
                        )}
                    </button>
                </form>
            </div>
        </UserAuthenticatedLayout>
    );
}
