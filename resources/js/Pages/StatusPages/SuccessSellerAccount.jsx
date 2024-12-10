import SellerGuestLayout from "@/Layouts/SellerGuestLayout";
import { Head, Link } from "@inertiajs/react";
import { GrLinkPrevious } from "react-icons/gr";

export default function SuccessSellerAccount({}) {
    return (
        <>
            <SellerGuestLayout className="h-fit">
                <Head title="Pending Account" />
                <div className="text-center mt-10 px-4">
                    <h1 className="text-3xl font-bold text-green-800 mb-4">
                        Account Created Successfully
                    </h1>
                    <p className="text-gray-600 mb-6">
                        Thank you for applying as a seller. Your account has
                        been successfully created. Our Administrative Team will
                        review your details shortly. We appreciate your patience
                        during this process. Please note that the email you
                        provided will receive notifications regarding your
                        application status.
                    </p>
                    <p className="text-gray-600 mb-6">
                        You will receive an email notification once your account
                        has been reviewed and approved.
                    </p>
                    <div className="flex items-center justify-center mb-10">
                        <Link
                            className="px-3 flex duration-300 hover:bg-orange-500 items-center gap-1 w-fit py-2 bg-themeColor rounded-md text-white"
                            href={route("login")}
                        >
                            <GrLinkPrevious />
                            Go back to Login
                        </Link>
                    </div>
                </div>
            </SellerGuestLayout>
        </>
    );
}
