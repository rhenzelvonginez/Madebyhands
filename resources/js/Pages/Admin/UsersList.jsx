import AdminAuthenticatedLayout from "@/Layouts/AdminAuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";

export default function UsersList({ auth }) {
    const { users } = usePage().props;

    return (
        <>
            <AdminAuthenticatedLayout user={auth}>
                <Head title="Users Panel" />
                {JSON.stringify(users, null, 2)}
            </AdminAuthenticatedLayout>
        </>
    );
}
