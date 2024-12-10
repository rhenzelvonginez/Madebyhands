import UserAuthenticatedLayout from "@/Layouts/UserAuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import Items from "../Partials/Items";
import { IoBagCheckOutline } from "react-icons/io5";

export default function Success({ auth }) {
    const { orderId, products } = usePage().props;
    return (
        <>
            <UserAuthenticatedLayout user={auth.user}>
                <Head title={orderId + ` Success`} />
                <div className="max-w-5xl mx-auto my-4">
                    <div className="flex flex-col items-center justify-center w-full p-8 text-center rounded-lg shadow-lg bg-slate-50">
                        <IoBagCheckOutline
                            size={50}
                            className="text-green-600"
                        />
                        <h1 className="mb-2 text-2xl font-bold text-green-700">
                            Purchase Successful!
                        </h1>
                        <p className="mb-6 text-gray-500">
                            Thank you for your purchase. Your order has been
                            successfully placed.
                        </p>
                        <div className="flex flex-col items-center justify-center w-full gap-4 lg:flex-row">
                            <Link href={route("shop")} className="block">
                                <button className="w-full px-4 py-2 font-bold text-white transition duration-300 ease-in-out rounded bg-themeColor hover:bg-themeDark ">
                                    Shop
                                </button>
                            </Link>
                            <Link
                                href={route("user.myPurchases")}
                                className="block"
                            >
                                <button className="w-full px-4 py-2 font-bold text-gray-700 transition duration-300 ease-in-out bg-gray-200 rounded hover:bg-gray-300">
                                    My Purchases
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="mt-2">
                        <Items products={products} />
                    </div>
                </div>
            </UserAuthenticatedLayout>
        </>
    );
}
