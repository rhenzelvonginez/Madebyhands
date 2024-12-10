import UserAuthenticatedLayout from "@/Layouts/UserAuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";
import SelectedConversation from "./Partials/SelectedConversation";
import { HiDotsHorizontal } from "react-icons/hi";
import { toast, ToastContainer } from "react-toastify";

export default function Messages({ auth }) {
    const { conversations, flash } = usePage().props;
    const [selectedConvo, setSelectedConvo] = useState();
    const [selectedName, setSelectedName] = useState();
    const [hoveredConvo, setHoveredConvo] = useState(null);
    const { processing, errors, patch } = useForm();
    const [activeMenuIndex, setActiveMenuIndex] = useState(null);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const param = urlParams.get("currentConvo") || null;
        setSelectedConvo(param);
    }, [window.location.search]);

    const handleSelectedConversation = (tabId) => {
        setSelectedConvo(tabId);
        const url = new URL(window.location);
        url.searchParams.set("currentConvo", tabId);
        window.history.pushState({ selectedConvo }, "", url);
    };

    const handleDeleteConvo = (id) => {
        patch(route('customer.delete.convo', {
            convo_id: id
        }));
        console.log('deleted clicked!')
    }

    const handleSubMenu = (ref) => {
        if (activeMenuIndex == null) {
            setActiveMenuIndex(ref)
        } else {
            setActiveMenuIndex(null)
        }
    }

    useEffect(() => {
        if (flash.error == 'success') {
            toast.success(flash.message);
        } else {
            toast.error(flash.message)
            console.log(flash.message)
        }
    }, [flash]);



    return (
        <UserAuthenticatedLayout user={auth.user}>
            <ToastContainer />
            <Head title="Messages" />
            <div className="flex flex-grow w-full h-full bg-slate-200">
                <div className="border-r min-w-[30%] bg-slate-100 border-slate-200">
                    <header className="flex flex-col items-center justify-between p-4 text-white border-b border-gray-300 bg-slate-100">
                        <div className="mb-2 text-xl font-bold text-orange-600">Chat</div>
                        {/* Search Box */}
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-orange-600"
                        />
                    </header>

                    {/* Convo list */}
                    <div className={`p-1.5 max-h-[calc(100vh-14.800rem)] space-y-1 ${conversations && conversations.length >= 2 ? 'overflow-y-auto' : ''} mb-9`}>
                        <div className="overflow-visible">
                            {conversations == null || conversations.length == 0 ? (
                                <div className="flex items-center justify-center w-full p-4 text-center ">
                                    <h1 className="text-gray-700">No conversation yet.</h1>
                                </div>
                            ) : (
                                conversations.map((data, index) => (
                                    <div
                                        key={index}
                                        className={`flex items-center p-2 rounded-md ${selectedConvo == data.reference ? "bg-slate-300 cursor-default" : "hover:bg-gray-200 cursor-pointer"
                                            }`}
                                        onClick={() => {
                                            handleSelectedConversation(data.reference);
                                            setSelectedName(data.user1.seller.shop_name);
                                        }}
                                        onMouseEnter={() => setHoveredConvo(index)}
                                        onMouseLeave={() => setHoveredConvo(null)}
                                    >
                                        <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-lg text-white bg-yellow-500 rounded-full">
                                            {data.user1.seller.shop_picture_path ? (
                                                <img
                                                    src={`/storage/${data.user1.seller.shop_picture_path}`}
                                                    alt="Shop Picture"
                                                    className="object-cover w-full h-full rounded-full"
                                                />
                                            ) : (
                                                data.user1.seller?.shop_name?.charAt(0)
                                            )}
                                        </div>
                                        <div className="flex-grow ml-4">
                                            <p className="font-semibold text-gray-800">{data.user1.seller.shop_name}</p>
                                            <p className="text-sm text-gray-500">{data.last_message.message}</p>
                                            <div className="ml-auto text-xs text-gray-500">
                                                {formatDistanceToNow(new Date(data.updated_at), { addSuffix: true })}
                                            </div>
                                        </div>
                                        {hoveredConvo == index && (
                                            <div className="relative">
                                                <div
                                                    onClick={() => handleSubMenu(data.reference)}
                                                    className="p-2 mr-2 text-white rounded-full cursor-pointer bg-slate-400">
                                                    <HiDotsHorizontal />
                                                </div>

                                                {activeMenuIndex == data.reference && (
                                                    <div className="absolute right-0 z-10 w-32 p-2 bg-white border rounded shadow-lg h-fit top-10">
                                                        <button
                                                            onClick={() => handleDeleteConvo(data.id)}
                                                            className="w-full px-2 py-1 text-sm text-left text-red-600 rounded hover:bg-red-100"
                                                        >
                                                            Delete
                                                        </button>
                                                        <Link
                                                            href={`/shop/${data.user1.id}`}
                                                            className="block w-full px-2 py-1 text-sm text-left text-gray-800 rounded hover:bg-gray-100"
                                                        >
                                                            View Seller
                                                        </Link>
                                                    </div>

                                                )}
                                            </div>
                                        )}
                                    </div>
                                )))
                            }
                        </div>
                    </div>
                </div>
                <SelectedConversation
                    currentConvoParam={selectedConvo}
                />
            </div>

        </UserAuthenticatedLayout >
    );
}
