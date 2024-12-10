import AdminPagination from "@/Components/AdminPagination";
import Dropdown from "@/Components/Dropdown";
import AdminAuthenticatedLayout from "@/Layouts/AdminAuthenticatedLayout";
import { Head, router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PermissionPanel({ auth }) {
    const { products, flash, sellersData, selectedSeller } = usePage().props;

    const [isProcessing, setIsProcessing] = useState(null);
    const [isDeleting, setIsDeleting] = useState(null);


    useEffect(() => {
        if (flash.status == "error") {
            toast.error(flash.message);
            setIsProcessing(null);
        } else {
            toast.success(flash.message);
            setIsProcessing(null);
        }
    }, [flash]);

    const handleDelete = (e, id, name) => {
        e.preventDefault();

        if (
            !window.confirm(
                "Are you sure you want to delete this seller named " +
                name +
                "?"
            )
        ) {
            return;
        }
        setIsDeleting(id);
        router.delete(route("admin.destroy.product", { id: id, name: name }), {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const toggleVerification = (e, id, status, name) => {
        e.preventDefault();
        if (
            !window.confirm(
                `Are you sure you want to ${status ? "unverify" : "verify"
                } ${name}?`
            )
        ) {
            return;
        }
        setIsProcessing(id);
        const response = router.patch(route("admin.permission.toggleVerification", id), {
            preserveState: true,
            preserveScroll: true,
            onFinish: () => {
                setIsProcessing(null);
                console.log("onfinish" + isProcessing);
            },
            onSuccess: () => {
                setIsProcessing(null);
                console.log("onsuccess" + isProcessing);
            },
            onError: () => {
                console.log("error");
                setIsProcessing(null);
                console.log("onerror" + isProcessing);
            },
        });
    };


    const [currentSeller, setCurrentSeller] = useState();
    const [currentStatus, setCurrentStatus] = useState('unverified');

    const handleFilterBySeller = (e) => {
        const sellerId = e.target.value === 'all' ? 'all' : e.target.value;

        setCurrentSeller(sellerId)

        router.get(route('admin.permission'), {
            sortBySeller: sellerId,
            status: currentStatus
        }, {
            preserveScroll: true,
            preserveState: true,
            replace: true,
        });
    };
    const handleFilterByStatus = (e) => {
        const status = e.target.value === 'unverified' ? 'unverified' : e.target.value;
        setCurrentStatus(status)

        router.get(route('admin.permission'), {
            sortBySeller: currentSeller,
            status: status
        }, {
            preserveScroll: true,
            preserveState: true,
            replace: true,
        });
    };


    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const seller = urlParams.get("sortBySeller") || "unverified";
        const status = urlParams.get("status") || "all";
        setCurrentSeller(seller);
        setCurrentStatus(status);
    }, []);


    console.log(sellersData);

    return (
        <>
            <AdminAuthenticatedLayout user={auth.user}>
                <Head title="Admin permission" />
                <ToastContainer />

                <h2
                    className="p-4 font-bold text-center uppercase rounded-lg bg-header"
                >
                    <h2>Permission List</h2>

                </h2>
                <div className="flex gap-4 mt-2">
                    {/* filter by seller */}
                    <div className="flex items-center mb-4 w-fit">
                        <label
                            htmlFor="seller"
                            className="mr-2 whitespace-nowrap"
                        >
                            Seller:
                        </label>
                        <select
                            id="seller"
                            value={currentSeller}
                            onChange={handleFilterBySeller}
                            className="w-full p-2 pr-8 border border-gray-300 rounded-md appearance-none custom-select-arrow"
                        >
                            {/* <option selected value={currentSeller}>{currentSeller}</option> */}
                            <option value={'all'}>All</option>
                            {sellersData.map((seller) => (
                                <option key={seller.id} value={seller.id}>{seller.name}</option>
                            ))}
                        </select>
                    </div>
                    {/* filter by status */}
                    <div className="flex items-center mb-4 w-fit">
                        <label
                            htmlFor="status"
                            className="mr-2 whitespace-nowrap"
                        >
                            Status:
                        </label>
                        <select
                            id="status"
                            value={currentStatus}
                            onChange={handleFilterByStatus}
                            className="w-full p-2 pr-8 border border-gray-300 rounded-md appearance-none custom-select-arrow"
                        >
                            {/* <option selected value={currentSeller}>{currentSeller}</option> */}
                            <option value={'all'}>All</option>
                            <option value={'verified'}>Verified</option>
                            <option value={'unverified'}>Unverified</option>

                        </select>
                    </div>
                </div>

                <div className="flex flex-col gap-6 mt-3">
                    {products.data.map((product) => (
                        <div
                            key={product.id}
                            className="flex flex-col items-center p-4 space-y-4 rounded-lg shadow-lg bg-slate-100 sm:flex-row sm:space-y-0 sm:space-x-4"
                        >
                            <img
                                src={
                                    product.images && product.images.length > 0
                                        ? product.images[0].image_path
                                        : ""
                                }
                                alt={product.name}
                                className="object-cover w-32 h-32 rounded"
                            />
                            <div className="flex-1">
                                <h2 className="text-xl font-semibold">
                                    {product.product_name}
                                </h2>
                                <p className="text-gray-500">
                                    Seller: {product.seller.seller_name}
                                </p>
                                <p className="text-gray-500">
                                    Date Created: {product.created_at}
                                </p>
                                <p className="text-gray-500">
                                    Status:
                                    <span
                                        className={
                                            product.is_verified
                                                ? "text-green-500"
                                                : "text-red-500"
                                        }
                                    >
                                        {product.is_verified
                                            ? " Verified"
                                            : " Pending"}
                                    </span>
                                </p>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    disabled={isProcessing != null}
                                    onClick={(e) =>
                                        toggleVerification(
                                            e,
                                            product.id,
                                            product.is_verified,
                                            product.product_name
                                        )
                                    }
                                    className={`px-4 py-2 text-sm rounded  ${product.is_verified
                                        ? "bg-green-500 hover:bg-green-600 "
                                        : "bg-yellow-500 hover:bg-yellow-600"
                                        } text-white`}
                                >
                                    {product.is_verified
                                        ? "Mark as Unverified"
                                        : "Mark as Verified"}
                                </button>
                                <button
                                    onClick={(e) =>
                                        handleDelete(
                                            e,
                                            product.id,
                                            product.product_name
                                        )
                                    }
                                    disabled={isDeleting !== null}
                                    className={`px-4 py-2 text-sm bg-red-500  text-white rounded ${isDeleting !== null
                                        ? "cursor-wait"
                                        : "hover:bg-red-600 cursor-pointer"
                                        }`}
                                >
                                    {isDeleting === product.id
                                        ? "Deleting..."
                                        : "Delete"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                {products.links == null ? (
                    ""
                ) : (
                    <div className="mt-2 mb-6 ">
                        <AdminPagination links={products.links} />
                    </div>
                )}
            </AdminAuthenticatedLayout>
        </>
    );
}
