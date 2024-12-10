import Logo from "@/assets/icons/Logo.svg";
export default function GuestFooter() {
    return (
        <footer className="w-full flex flex-col text-slate-50 items-center justify-center p-4 bg-footer">
            <img className=" h-12" src={Logo} alt="Logo" />
            <h1 className="text uppercase  tracking-widest ">MadeByHands</h1>
            <span className=" text-xs  font-light text-slate-50">
                Copyright © Louis All Right Reserved.
            </span>
        </footer>
    );
}
