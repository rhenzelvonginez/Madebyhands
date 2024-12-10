import React, { useState } from "react";
import { usePage, router, Head } from "@inertiajs/react";
import { FaUserCircle } from "react-icons/fa";
import TextInput from "@/Components/TextInput"; // Assuming you have a TextInput component
import { toast, ToastContainer } from "react-toastify"; // For notifications
import UserAuthenticatedLayout from "@/Layouts/UserAuthenticatedLayout";
import Modal from "@/Components/Modal";
import DangerButton from "@/Components/DangerButton";
import DeleteUserProfileForm from "./Partials/DeleteUserProfileForm";
import UpdateUserProfileForm from "./Partials/UpdateUserProfileForm";
import UpdateUserPasswordForm from "./Partials/UpdateUserPasswordForm";

const UserProfile = ({ auth }) => {
    const { user } = usePage().props.auth;

    return (
        <UserAuthenticatedLayout user={user} cartNumber={auth.cartCount}>
            <Head title="Update Profile" />
            <ToastContainer />
            <div className="container mx-auto p-4 flex gap-4 md:gap-5 lg:gap-6 flex-col max-w-7xl">
                {/* bio data */}
                <UpdateUserProfileForm />

                {/* upadte password */}
                <UpdateUserPasswordForm />

                {/* delete form */}
                <DeleteUserProfileForm />
            </div>
        </UserAuthenticatedLayout>
    );
};

export default UserProfile;
