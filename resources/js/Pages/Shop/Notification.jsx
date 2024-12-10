import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import UserAuthenticatedLayout from "@/Layouts/UserAuthenticatedLayout";
import { Head, router, usePage } from "@inertiajs/react";
export default function Notification({ auth }) {
    const { notifications } = usePage().props;
    const [notificationList, setNotificationList] = useState(notifications);
    const [isDeleting, setIsDeleting] = useState(null);
    const handleDelete = (id) => {
        setIsDeleting(id);
        router.delete(`/notifications/${id}`, {
            preserveScroll: true,
            onSuccess: (page) => {
                setNotificationList(page.props.notifications);
            },
            onError: () => {
                console.error("Failed to delete notification.");
            },
            onFinish: () => {
                setIsDeleting(null);
            },
        });
    };
    const handleMarkAsRead = (id) => {
        router.patch(
            `/notifications/${id}/mark-as-read`,
            {},
            {
                preserveScroll: true,
                onSuccess: (page) => {
                    setNotificationList(page.props.notifications);
                },
                onError: () => {
                    console.error("Failed to mark notification as read.");
                },
            }
        );
    };
    const handleMarkAsUnread = (id) => {
        router.patch(
            `/notifications/${id}/mark-as-unread`,
            {},
            {
                preserveScroll: true,
                onSuccess: (page) => {
                    setNotificationList(page.props.notifications);
                },
                onError: () => {
                    console.error("Failed to mark notification as unread.");
                },
            }
        );
    };
    return (
        <UserAuthenticatedLayout user={auth.user} notificationCount={auth.notificationCount}>
            <Head title="Customer - Notification" />
            <div className="max-w-2xl mx-auto p-4">
                <h2 className="text-2xl font-bold mb-4">Notifications</h2>
                <div className="space-y-4">
                    {notificationList.length === 0 && (
                        <p className="text-gray-500 text-center">
                            No rejected report notifications available.
                        </p>
                    )}
                    {notificationList.map((notification) => (
                        <div
                            key={notification.id}
                            className={`p-4 rounded shadow-lg ${notification.is_read
                                ? "bg-white text-mainText"
                                : "bg-themeColor text-white"
                                }`}
                        >
                            <h3 className="text-lg font-semibold">{notification.title}</h3>
                            <p>{notification.body}</p>
                            <div className="mt-2 flex items-center justify-between space-x-2">
                                <div className="flex space-x-2">
                                    {notification.is_read ? (
                                        <button
                                            onClick={() =>
                                                handleMarkAsUnread(
                                                    notification.id
                                                )
                                            }
                                            className="px-2 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-700"
                                        >
                                            Mark as Unread
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() =>
                                                handleMarkAsRead(
                                                    notification.id
                                                )
                                            }
                                            className="px-2 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-700"
                                        >
                                            Mark as Read
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDelete(notification.id)}
                                        disabled={isDeleting === notification.id}
                                        className="px-2 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-700"
                                    >
                                        {isDeleting === notification.id ? "Deleting..." : "Delete"}
                                    </button>
                                </div>
                                <small className="text-sm">
                                    {formatDistanceToNow(new Date(notification.created_at), {
                                        addSuffix: true,
                                    })}
                                </small>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </UserAuthenticatedLayout>
    );
}
