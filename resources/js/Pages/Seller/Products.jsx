import SellerAuthenticatedLayout from "@/Layouts/SellerAuthenticatedLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import defaultProduct1 from "../../assets/img/product_1.png";
import InputLabel from "@/Components/InputLabel";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DefaultProductIcon from "../../assets/img/Default-Product-Placeholder.svg";

export default function Products({ auth }) {
    const { products, flash } = usePage().props;
    const [data, setData] = useState(products.data);

    const [status, setStatus] = useState('all');


    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const param = urlParams.get('status') || 'all';
        setStatus(param);
    }, []);


    const deleteSubmit = (e, id, name) => {
        e.preventDefault();
        if (
            !window.confirm(
                "Are you sure you want to delete this product '" + name + "'?"
            )
        ) {
            return;
        }
        router.delete(route("seller.destroy.product", id), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Delete Success");
            },
            onError: () => {
                toast.error("Error deleting the product");
            },
        });
    };

    const handleFilterStatus = (statusParam) => {
        setStatus(statusParam);
        const url = new URL(window.location);
        url.searchParams.set('status', statusParam);
        window.history.pushState(null, "", url);
        router.get(route('seller.products'), { status: statusParam }, {
            preserveState: true,
            replace: true,
        });
    };


    return (
        <>
            <SellerAuthenticatedLayout
                notificationCount={auth.notificationCount}
            >
                <Head title="Seller - Products" />
                <ToastContainer />
                <div>
                    <div className="flex items-center justify-between px-4 ">
                        <div className="flex items-center gap-1 ">
                            <InputLabel
                                htmlFor="filterbyStatus"
                                value="Filter by Status"
                            />
                            <select onChange={(e) => handleFilterStatus(e.target.value)}
                                id="filterByStatus"
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">All</option>
                                <option value="verified">Verified</option>
                                <option value="pending">Pending</option>
                            </select>
                        </div>

                        <Link
                            href={route("seller.showAddProduct")}
                            className="px-2 py-3 text-sm text-white rounded-lg bg-themeColor"
                        >
                            Add prodcut
                        </Link>
                    </div>

                    {data.length == 0 ? (
                        <div className="flex justify-center w-full">
                            <div className="w-full max-w-sm p-8 mt-10 text-center bg-white rounded-lg shadow-lg">
                                <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                                    No uploaded products yet
                                </h2>
                                <p className="text-gray-600">
                                    Click Add Products to start.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 lg:grid-cols-3">
                            {products.data.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex flex-col p-4 bg-white rounded-lg shadow-md"
                                >
                                    <img
                                        src={
                                            item.images.length == 0
                                                ? DefaultProductIcon
                                                : item.images[0].image_path
                                        }
                                        alt="Product"
                                        className="object-cover w-full h-48 rounded-t-lg"
                                    />
                                    <div className="flex-grow mt-4">
                                        <h2 className="text-lg font-semibold text-gray-900">
                                            {item.product_name}
                                        </h2>
                                        <p className="text-gray-700">
                                            Amount: Php {item.price}
                                        </p>
                                        <p className="text-gray-700">
                                            Status:
                                            <span
                                                className={
                                                    item.is_verified == 0
                                                        ? "text-red-700"
                                                        : "text-green-700"
                                                }
                                            >
                                                {item.is_verified == 0
                                                    ? " Pending"
                                                    : " Available"}
                                            </span>
                                        </p>
                                        <p className="text-gray-700">
                                            Date Created: 2024-07-20
                                        </p>
                                    </div>
                                    <div className="flex justify-end mt-4 space-x-2">
                                        <Link
                                            href={route(
                                                "seller.view.product",
                                                item.id
                                            )}
                                            className="px-4 py-2 text-white rounded bg-themeColor hover:bg-orange-500"
                                        >
                                            View
                                        </Link>

                                        <button
                                            onClick={(e) =>
                                                deleteSubmit(
                                                    e,
                                                    item.id,
                                                    item.product_name
                                                )
                                            }
                                            className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </SellerAuthenticatedLayout>
        </>
    );
}
