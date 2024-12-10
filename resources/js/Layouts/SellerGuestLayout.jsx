import GuestHeader from "./GuestHeader";

export default function SellerGuestLayout({ children, className = null }) {
    return (
        <div className="min-h-screen flex flex-col">
            <GuestHeader />
            <div
                className={
                    `bg-gray-100 flex-grow flex justify-center items-center` +
                    className
                }
            >
                <div className="bg-white h-fit my-6 lg:my-4 w-full md:w-[30rem] lg:w-[50rem] p-3 rounded-lg px-8 py-4 drop-shadow-md overflow-hidden sm:rounded-lg">
                    {children}
                </div>
            </div>
        </div>
    );
}
