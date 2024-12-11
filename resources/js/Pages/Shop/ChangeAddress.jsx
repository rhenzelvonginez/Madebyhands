import AddNewAddresssModal from "@/Components/Modal/AddNewAddresssModal";
import UserAuthenticatedLayout from "@/Layouts/UserAuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import { IoChevronBackCircle } from "react-icons/io5";


export default function ChangeAddress({ auth }) {
    const { currentUrl, addresses } = usePage().props
    console.log(addresses)
    const [isOpen, setIsOpen] = useState(false)

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return <>
        <UserAuthenticatedLayout user={auth.user}>
            <Head title="Change Address" />
            <AddNewAddresssModal isOpen={isOpen} onClose={closeModal} />
            <div className="p-4 mx-auto mt-4 rounded-lg border border-slate-200 max-w-4xg md:min-w-[50rem] md:p-8 md:mt-6 lg:mt-8 bg-slate-50 drop-shadow-xl">
                <div className="flex items-center justify-between w-full mb-4">
                    <Link
                        href={currentUrl}
                        className="flex items-center gap-2 text-2xl duration-200 cursor-pointer hover:text-themeColor"
                    >
                        <IoChevronBackCircle />
                        Back
                    </Link>{" "}
                    <h1 className="text-xl font-bold">Change Address</h1>
                </div>
                <div className="flex flex-col gap-3">
                    <div className="space-y-4">
                        {addresses?.length > 0 ? (
                            addresses.map((address) => (
                                <div
                                    key={address.id}
                                    className={`p-4 border rounded-md shadow-md flex justify-between items-center ${address.active ? '' : 'bg-gray-100 border-gray-300'
                                        }`}
                                >
                                    <div>
                                        <p className="font-semibold">{address.full_address}</p>
                                        {address.active ? (
                                            <span className="text-sm italic text-green-500">Active Address</span>
                                        ) : (
                                            <span className="text-sm italic text-gray-500">Inactive</span>
                                        )}
                                    </div>
                                    <div className="flex space-x-2">
                                        {!address.active && (
                                            <>
                                                <button
                                                    // onClick={() => handleSetActive(address.id)}
                                                    className="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
                                                >
                                                    Set as Active
                                                </button>


                                                <button
                                                    // onClick={() => handleDeleteAddress(address.id)}
                                                    className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                                                >
                                                    Delete
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500">No address found</p>
                        )}

                    </div>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-full px-4 py-2 duration-150 rounded-md text-themeColor hover:text-white hover:bg-themeColor"
                    >
                        Add New Address
                    </button>
                </div>
            </div>
        </UserAuthenticatedLayout>
    </>
}