import AdminAuthenticatedLayout from "@/Layouts/AdminAuthenticatedLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import DefaultPicture from "../../assets/img/default_user_profile.png";
import { MdRemoveRedEye } from "react-icons/md";
import { BsTrash2Fill } from "react-icons/bs";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import ModalImage from "react-modal-image";
import Pagination from "@/Components/Pagination";

export default function SellersList({ auth }) {
    const { users, flash } = usePage().props;

    console.log(users);

    useEffect(() => {
        if (flash.status === "success") {
            toast.success(flash.message);
        } else if (flash.status === "error") {
            toast.error(flash.message);
        } else {
            toast.info(flash.message);
        }
    }, [flash]);

    const [currentStatus, setCurrentStatus] = useState();

    const [searchName, setSearchName] = useState("");

    const handleFilterChange = (filter) => {
        setCurrentStatus(filter);

        router.get(
            route("admin.sellers", { sortByStatus: filter, name: searchName })
        );
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const status = urlParams.get("sortByStatus") || "all";
        const search = urlParams.get("name") || "";
        setCurrentStatus(status);
        setSearchName(search);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        const value = e.target.value;
        setSearchName(value);
        if (value == "") {
            router.get(
                route("admin.sellers", {
                    sortByStatus: currentStatus,
                    name: "",
                })
            );
        }
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        router.get(
            route("admin.sellers", {
                sortByStatus: currentStatus,
                name: searchName,
            })
        );
    };

    const deleteSellerData = (e, id, name) => {
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
        router.delete(route("admin.destroy.sellerdata", id));
    };

    return (
        <>
            <AdminAuthenticatedLayout user={auth.user}>
                <ToastContainer />
                <Head title="Sellers List" />
                <div className="flex items-center justify-between mb-4">
                    <div className="p-4">
                        <button
                            className={`px-4 py-2 ${currentStatus === "all"
                                ? "bg-themeColor text-white"
                                : "bg-white text-slate-600 hover:bg-slate-600 duration-150 hover:text-white"
                                } rounded`}
                            onClick={() => handleFilterChange("all")}
                        >
                            All
                        </button>
                        <button
                            className={`ml-2 px-4 py-2 ${currentStatus === "verified"
                                ? "bg-themeColor text-white"
                                : "bg-white text-slate-600 hover:bg-slate-600 duration-150 hover:text-white"
                                } rounded`}
                            onClick={() => handleFilterChange("verified")}
                        >
                            Verified
                        </button>
                        <button
                            className={`ml-2 px-4 py-2 ${currentStatus === "unverified"
                                ? "bg-themeColor text-white"
                                : "bg-white text-slate-600 hover:bg-slate-600 duration-150 hover:text-white"
                                } rounded`}
                            onClick={() => handleFilterChange("unverified")}
                        >
                            Unverified
                        </button>
                    </div>
                    <form onSubmit={handleSearchSubmit} className="p-4">
                        <input
                            type="text"
                            value={searchName}
                            onChange={handleSearch}
                            placeholder="Search by name"
                            className="px-4 py-2 border rounded-lg"
                        />
                        <button
                            type="submit"
                            className="px-4 py-2 ml-2 text-white rounded-lg bg-themeColor"
                        >
                            Search
                        </button>
                    </form>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Profile</th>
                                <th className="px-4 py-2">Seller Name</th>
                                <th className="px-4 py-2">Seller Address</th>
                                <th className="px-4 py-2">Joined</th>
                                <th className="px-4 py-2">Status</th>
                                <th className="px-4 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.data.map((user) => (
                                <tr
                                    key={user.id}
                                    className="text-center border-t"
                                >
                                    <td className="px-4 py-2">
                                        <ModalImage
                                            small={
                                                user.profile_picture_path
                                                    ? user.profile_picture_path
                                                    : DefaultPicture
                                            }
                                            large={
                                                user.profile_picture_path
                                                    ? user.profile_picture_path
                                                    : DefaultPicture
                                            }
                                            alt={user.first_name}
                                            className="w-12 h-12 mx-auto rounded-full"
                                        />
                                    </td>
                                    <td className="px-4 py-2">
                                        <Link
                                            className="duration-200 hover:underline"
                                            href={route(
                                                "admin.view-seller",
                                                user.id
                                            )}
                                        >
                                            {user.name}
                                        </Link>
                                    </td>
                                    <td className="px-4 py-2">
                                        {user.address}
                                    </td>
                                    <td className="px-4 py-2">
                                        {user.created_at}
                                    </td>
                                    <td className="px-4 py-2">
                                        {user.status ? (
                                            <span className="px-2 py-1 text-sm font-semibold text-green-700 bg-green-200 rounded-full">
                                                Verified
                                            </span>
                                        ) : (
                                            <span className="px-2 py-1 text-sm font-semibold text-red-700 bg-red-200 rounded-full">
                                                Unverified
                                            </span>
                                        )}
                                    </td>

                                    <td className="px-4 py-2">
                                        <Link
                                            href={route(
                                                "admin.view-seller",
                                                user.id
                                            )}
                                        >
                                            <button className="p-2 mr-1 text-white duration-200 ease-in-out bg-blue-800 rounded hover:bg-blue-900">
                                                <MdRemoveRedEye />
                                            </button>
                                        </Link>
                                        <button
                                            type="button"
                                            onClick={(e) =>
                                                deleteSellerData(
                                                    e,
                                                    user.id,
                                                    user.name
                                                )
                                            }
                                            className="p-2 text-white duration-200 ease-in-out bg-red-800 rounded hover:bg-red-900"
                                        >
                                            <BsTrash2Fill />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Pagination links={users.links} />
                </div>
            </AdminAuthenticatedLayout>
        </>
    );
}
