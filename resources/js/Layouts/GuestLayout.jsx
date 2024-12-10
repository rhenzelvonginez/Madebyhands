import { Link } from "@inertiajs/react";
import GuestHeader from "./GuestHeader";

export default function Guest({ children }) {
    return (
        <div className="flex flex-col min-h-screen">
            <GuestHeader />
            <main className="flex flex-col items-center justify-center flex-grow bg-gray-100">
                <div className="flex flex-col items-center justify-center w-full px-8 py-4 my-12 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg ">
                    {children}
                </div>
            </main>
        </div>
    );
}
