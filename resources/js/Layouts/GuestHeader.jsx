import Logo from "@/assets/icons/Logo.svg";
import { Link } from "@inertiajs/react";

export default function GuestHeader() {
    return (
        <header className="w-full flex items-center justify-center p-4  text-mainText bg-header">
            <img className=" h-12" src={Logo} alt="Logo" />
            <Link href="/" className="text-4xl font-medium">
                MadeByHands
            </Link>
        </header>
    );
}
