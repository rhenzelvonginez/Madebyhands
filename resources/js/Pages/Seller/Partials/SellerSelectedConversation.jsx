import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { router, useForm, usePage } from "@inertiajs/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SellerSelectedConversation({ currentConvoParam }) {
    const [conversationData, setConversationData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { user } = usePage().props.auth;
    const { flash } = usePage().props;
    const receiverName = conversationData?.messages[0].receiver?.seller?.shop_name;
    const receiverId = conversationData?.messages[0].receiver_id
    const { processing, reset, post, data, setData } = useForm({
        message: '',
        reference: "",
        receiver_id: '',
    });


    const fetchConversation = async () => {
        setLoading(true);
        try {
            setData('conversation_id', currentConvoParam);
            const response = await axios.get('/get-convo', {
                params: { reference: currentConvoParam }
            });
            setConversationData(response.data);
            setError(null);
        } catch (err) {
            console.error("Error fetching conversation data:", err);
            toast.error('Something went wrong, try again later.')
            setError("Unable to load conversation data.");
        } finally {
            setLoading(false);
        }
    };
    const reFetchConversation = async () => {
        try {
            setData('conversation_id', currentConvoParam);
            const response = await axios.get('/get-convo', {
                params: { reference: currentConvoParam }
            });
            setConversationData(response.data);
            setError(null);
        } catch (err) {
            console.error("Error fetching conversation data:", err);
            setError("Unable to load conversation data.");
        }
    };

    useEffect(() => {
        if (conversationData && conversationData.messages.length > 0) {
            setData('receiver_id', conversationData.messages[0].sender_id);
        }
    }, [conversationData]);


    useEffect(() => {
        if (currentConvoParam) {
            fetchConversation();
        }
    }, [currentConvoParam]);

    const replyHandler = (e) => {
        e.preventDefault();
        console.log('submitted data', data);

        post(route('seller.reply.chat', data), {
            onSuccess: () => {
                reFetchConversation();
                setData('message', '');
            },
            onError: (errors) => {
                console.error("Error sending message:", errors);
                toast.error('Failed to send message.');
            }
        });

    };
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [conversationData]);
    return (
        <>
            <ToastContainer />
            {!currentConvoParam ? (
                <div className="flex items-center justify-center flex-grow p-4 bg-gray-50">
                    <p className="text-lg font-semibold text-gray-600">
                        Welcome to MadeByHands
                    </p>
                </div>
            ) : conversationData && !loading ? (
                <div className="relative flex flex-col w-full bg-slate-50">
                    <header className="p-4 text-gray-700 bg-white drop-shadow-sm">
                        <h1 className="text-2xl font-semibold">
                            {receiverName}
                        </h1>
                    </header>
                    <div className="max-h-[calc(100vh-12.65rem)] pb-6 pt-4 px-4 overflow-y-auto">
                        {conversationData.messages.map((data, index) => {
                            const is_sender = user.id === data.sender_id;
                            return (
                                <div key={index} className={`flex mb-4 cursor-pointer ${is_sender ? 'justify-end' : 'justify-start'}`}>
                                    {is_sender ? (
                                        <>
                                            <div className="flex gap-3 p-3 text-white rounded-lg drop-shadow-md bg-themeColor max-w-96">
                                                <p>{data.message}</p>
                                            </div>
                                            <div className="flex items-center justify-center ml-2 rounded-full bg-themeColor w-9 h-9">
                                                {data.sender.profile_picture_path ? (
                                                    <img
                                                        src={`/storage/${data.sender.profile_picture_path}`}
                                                        alt="Shop Picture"
                                                        className="object-cover w-full h-full rounded-full"
                                                    />
                                                ) : (
                                                    data.sender.first_name?.charAt(0)
                                                )}
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="flex items-center justify-center mr-2 rounded-full bg-themeColor w-9 h-9">
                                                {data.sender.profile_picture_path ? (
                                                    <img
                                                        src={`/storage/${data.sender.profile_picture_path}`}
                                                        alt="Shop Picture"
                                                        className="object-cover w-full h-full rounded-full"
                                                    />
                                                ) : (
                                                    data.sender.first_name?.charAt(0)
                                                )}
                                            </div>
                                            <div className="flex gap-3 p-3 bg-white rounded-lg drop-shadow-md max-w-96">
                                                <p className="text-gray-700">{data.message}</p>
                                            </div>
                                        </>
                                    )}
                                </div>
                            );
                        })}
                        {/* This is the scroll-to-bottom marker */}
                        <div ref={messagesEndRef} />
                    </div>

                    <footer className="absolute bottom-0 w-full p-4 bg-white border-t border-gray-300">
                        <div className="flex items-center">
                            {/* Textarea instead of input */}
                            <textarea
                                value={data.message}
                                onChange={(e) => setData('message', e.target.value)}
                                placeholder="Type a message..."
                                className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500 resize-none min-h-[50px]"
                            />
                            <button
                                disabled={data.message == ''}
                                type="button"
                                onClick={(e) => replyHandler(e)}
                                className="px-4 py-2 ml-2 text-white duration-150 ease-in-out bg-indigo-500 rounded-md hover:bg-indigo-600"
                            >
                                Send
                            </button>
                        </div>
                    </footer>
                </div>
            ) : (
                loading && (
                    <div className="flex items-center justify-center flex-grow p-4 bg-gray-50">
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 border-4 border-t-4 border-gray-300 rounded-full border-t-indigo-500 animate-spin"></div>
                            <p className="mt-3 text-lg font-semibold text-gray-600">
                                Loading data...
                            </p>
                        </div>
                    </div>
                )
            )}
        </>
    );
}
