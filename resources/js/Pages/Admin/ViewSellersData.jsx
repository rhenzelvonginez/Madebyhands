import AdminAuthenticatedLayout from "@/Layouts/AdminAuthenticatedLayout";
import { Head, useForm, usePage, Link } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { IoIosArrowForward } from "react-icons/io";
import DefaultShopProfile from "../../assets/img/default_shop_profile.png";
import SpinnerLoading from "@/Components/SpinnerLoading";
import InputError from "@/Components/InputError";
import PermitPictureViewer from "@/Components/PermitPictureViewer";
import "react-toastify/dist/ReactToastify.css";
import VerifyUser from "@/Components/VerifyUser";
export default function ViewSellersData({ auth }) {
    const { seller, flash } = usePage().props;

    const { data, processing, setData, errors, put } = useForm({
        shop_name: seller.seller.shop_name || "",
        shop_address: seller.seller.shop_address || "",
        first_name: seller.first_name || "",
        last_name: seller.last_name || "",
        seller_address: seller.address || "",
        motto: seller.seller.motto || "",
    });
    const [isEditing, setIsEditing] = useState(false);
    const [isPermitViewerOpen, setIsPermitViewerOpen] = useState(false);

    const togglePermitViewer = () => {
        setIsPermitViewerOpen(!isPermitViewerOpen);
    };

    const handleEditClick = (e) => {
        e.preventDefault();
        setIsEditing(true);
    };

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    function formatDate(dateString) {
        const options = { month: "short", day: "numeric", year: "numeric" };
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", options);
    }

    const submit = (e) => {
        e.preventDefault();

        put(route("admin.update-seller", seller.id, data), {
            onSuccess: () => {
                setIsEditing(false);
            },

            onError: () => toast.error("Something went wrong"),
        });
    };

    const [openChangeStatusModal, setOpenChangeStatusModal] = useState(false);
    const openChangeStatus = () => {
        setOpenChangeStatusModal(!openChangeStatusModal);
    };
    // const [openVerifySellerModal, setOpenVerifySellerModal] = useState(false);
    // const openChangeStatusSeller = () => {
    //     setOpenVerifySellerModal(!openVerifySellerModal);
    // };    useEffect(() => {

    useEffect(() => {
        if (flash.message) {
            if (flash.message === "Change status success") {
                setOpenChangeStatusModal(false);
            }
            toast.success(flash.message);
        }
    }, [flash]);
    return (
        <>
            <AdminAuthenticatedLayout user={auth}>
                <Head title="Seller data" />
                <ToastContainer />

                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {openChangeStatusModal && (
                        <VerifyUser
                            onClose={() => {
                                setOpenChangeStatusModal(false);
                            }}
                            id={seller.id}
                            verified_at={seller.seller.verified_at}
                            status={seller.seller.is_verified}
                        />
                    )}

                    <form className="py-8" onSubmit={submit}>
                        <h2 className="text-xl flex items-center font-semibold leading-tight mb-6">
                            <Link
                                href={route("admin.sellers")}
                                className="duration-400 hover:text-mainText hover:underline"
                            >
                                Sellers List
                            </Link>{" "}
                            <IoIosArrowForward />
                            {seller.id}
                        </h2>
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="col-span-1 flex sm:col-span-2 text-center">
                                    <div className=" w-1/3">
                                        {" "}
                                        <img
                                            src={
                                                seller.seller
                                                    .profile_picture_path
                                                    ? seller.seller
                                                        .profile_picture_path
                                                    : DefaultShopProfile
                                            }
                                            // alt={seller.first_name}
                                            className=" w-40 h-40 rounded-full mx-auto"
                                        />
                                    </div>
                                    <div className="w-full flex gap-4">
                                        <div className=" w-full">
                                            <div className=" flex flex-col items-start">
                                                <label
                                                    htmlFor="shop_name"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Shop name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="shop_name"
                                                    value={data.shop_name || ""}
                                                    onChange={handleChange}
                                                    disabled={!isEditing}
                                                    className={`mt-1 block w-full rounded-md ${isEditing
                                                        ? "border-gray-300"
                                                        : "border-none bg-gray-100"
                                                        }`}
                                                />
                                                <InputError>asfarfa</InputError>
                                                {errors.shop_name && (
                                                    <InputError
                                                        className="mt-1"
                                                        message={
                                                            errors.shop_name
                                                        }
                                                    />
                                                )}
                                            </div>
                                            <div className=" flex flex-col items-start mt-4">
                                                <label
                                                    htmlFor="shop_address"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Shop Address
                                                </label>
                                                <input
                                                    type="text"
                                                    name="shop_address"
                                                    id="shop_address"
                                                    value={
                                                        data.shop_address || ""
                                                    }
                                                    onChange={handleChange}
                                                    disabled={!isEditing}
                                                    className={`mt-1 block w-full rounded-md ${isEditing
                                                        ? "border-gray-300"
                                                        : "border-none bg-gray-100"
                                                        }`}
                                                />
                                                {errors.shop_address && (
                                                    <InputError
                                                        className="mt-1"
                                                        message={
                                                            errors.shop_address
                                                        }
                                                    />
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex gap-2 flex-col">
                                            <div className=" flex flex-col items-start">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Status
                                                </label>
                                                <input
                                                    type="text"
                                                    value={
                                                        seller.seller
                                                            .is_verified == 1
                                                            ? "Verified"
                                                            : "Not Verified"
                                                    }
                                                    disabled
                                                    className={`mt-1 block w-full uppercase font-bold text-center rounded-md border-none  ${seller.seller
                                                        .is_verified
                                                        ? "text-green-900 bg-green-100"
                                                        : "bg-red-100 text-red-800"
                                                        }`}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-start mt-2 text-sm font-medium text-gray-700">
                                                    Joined
                                                </label>
                                                <input
                                                    type="text"
                                                    name="joined"
                                                    value={formatDate(
                                                        seller.seller.created_at
                                                    )}
                                                    disabled
                                                    className="mt-1 block w-full rounded-md bg-gray-100 border-none"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        name="first_name"
                                        value={data.first_name}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className={`mt-1 block w-full rounded-md ${isEditing
                                            ? "border-gray-300"
                                            : "border-none bg-gray-100"
                                            }`}
                                    />
                                    {errors.first_name && (
                                        <InputError
                                            className="mt-1"
                                            message={errors.first_name}
                                        />
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        name="last_name"
                                        value={data.last_name}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className={`mt-1 block w-full rounded-md ${isEditing
                                            ? "border-gray-300"
                                            : "border-none bg-gray-100"
                                            }`}
                                    />
                                    {errors.last_name && (
                                        <InputError
                                            className="mt-1"
                                            message={errors.last_name}
                                        />
                                    )}
                                </div>

                                <div className="col-span-1 sm:col-span-2">
                                    <label
                                        htmlFor="seller_address"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Seller Address
                                    </label>
                                    <input
                                        type="text"
                                        name="seller_address"
                                        id="sellerAddress"
                                        value={data.seller_address}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className={`mt-1 block w-full rounded-md ${isEditing
                                            ? "border-gray-300"
                                            : "border-none bg-gray-100"
                                            }`}
                                    />
                                    {errors.seller_address && (
                                        <InputError
                                            className="mt-1"
                                            message={errors.seller_address}
                                        />
                                    )}
                                </div>
                                <div className="flex gap-4 col-span-1 sm:col-span-2">
                                    <div className=" w-1/2">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                value={seller.email}
                                                disabled
                                                className="mt-1 block w-full rounded-md border-none bg-gray-100 "
                                            />
                                        </div>
                                        <div className="mt-4">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Years in selling
                                            </label>
                                            <input
                                                type="text"
                                                value={
                                                    seller.seller
                                                        .years_in_selling
                                                }
                                                disabled
                                                className="mt-1 block w-full rounded-md border-none bg-gray-100 "
                                            />
                                        </div>
                                    </div>
                                    <div className=" w-1/2 flex gap-6">
                                        <div className="w-fit">
                                            <div className=" ">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Permit
                                                </label>
                                                <span
                                                    className={`mt-1 block w-fit px-2 py-1 rounded-md ${seller.seller.has_permit
                                                        ? "bg-green-300 text-green-900"
                                                        : "bg-red-300 text-red-900"
                                                        }`}
                                                >
                                                    {seller.seller.has_permit
                                                        ? "Yes"
                                                        : "No"}
                                                </span>
                                            </div>{" "}
                                            <div className="mt-4">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    DTI
                                                </label>
                                                <span
                                                    className={`mt-1 block w-fit px-2 py-1 rounded-md ${seller.seller.has_DTI
                                                        ? "bg-green-300 text-green-900"
                                                        : "bg-red-300 text-red-900"
                                                        }`}
                                                >
                                                    {seller.seller.has_DTI
                                                        ? "Yes"
                                                        : "No"}
                                                </span>
                                            </div>
                                            <div className="mt-4">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Mayor's Business Permit
                                                </label>
                                                <span
                                                    className={`mt-1 block w-fit px-2 py-1 rounded-md ${seller.seller
                                                        .has_mayors_business_permit
                                                        ? "bg-green-300 text-green-900"
                                                        : "bg-red-300 text-red-900"
                                                        }`}
                                                >
                                                    {seller.seller
                                                        .has_mayors_business_permit
                                                        ? "Yes"
                                                        : "No"}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="">

                                            <div className="">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Paid Organizational Fee
                                                </label>
                                                <span
                                                    className={`mt-1 block w-fit px-2 py-1 rounded-md ${seller.seller
                                                        .has_paid_organizational_fee
                                                        ? "bg-green-300 text-green-900"
                                                        : "bg-red-300 text-red-900"
                                                        }`}
                                                >
                                                    {seller.seller
                                                        .has_paid_organizational_fee
                                                        ? "Yes"
                                                        : "No"}
                                                </span>
                                            </div>
                                            <div className="mt-4">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Barangay Clearance
                                                </label>
                                                <span
                                                    className={`mt-1 block w-fit px-2 py-1 rounded-md ${seller.seller
                                                        .has_barangay_clearance
                                                        ? "bg-green-300 text-green-900"
                                                        : "bg-red-300 text-red-900"
                                                        }`}
                                                >
                                                    {seller.seller
                                                        .has_barangay_clearance
                                                        ? "Yes"
                                                        : "No"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end space-x-2">
                                {isEditing && (
                                    <button
                                        className="text-red-800 border-2 hover:bg-red-800 hover:text-white border-red-800 px-2 py-1 rounded"
                                        onClick={() => setIsEditing(false)}
                                    >
                                        Cancel
                                    </button>
                                )}
                                <button
                                    onClick={openChangeStatus}
                                    type="button"
                                    className=" bg-orange-700 text-white px-4 py-2 rounded-md"
                                >
                                    Verify Seller
                                </button>
                                {isEditing ? (
                                    <div className="flex gap-2">
                                        <button
                                            disabled={processing}
                                            type="submit"
                                            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                                        >
                                            {processing ? (
                                                <div className="flex items-center gap-1">
                                                    Saving <SpinnerLoading />
                                                </div>
                                            ) : (
                                                "Save"
                                            )}
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={handleEditClick}
                                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                    >
                                        Edit
                                    </button>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            </AdminAuthenticatedLayout>
        </>
    );
}
