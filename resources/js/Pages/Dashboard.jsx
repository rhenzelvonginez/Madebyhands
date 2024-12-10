import StarRating from "@/Components/StarRating";
import AuthenticatedLayout from "@/Layouts/UserAuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import frame_1 from "../assets/img/Frame_1.png";
import { useState } from "react";
import { FaShop } from "react-icons/fa6";

export default function Dashboard({ auth }) {
    const { sellerData, sellerProducts } = usePage().props;
    console.log(sellerData, sellerProducts);
    const [layout, setLayout] = useState("grid"); // State for layout type
    return (
        <AuthenticatedLayout user={auth.user} cartNumber={auth.cartCount}>
            <Head title="Home" />
            {/* first page full*/}
            <div className="lg:-mt-[5rem] z-10 h-screen w-full overflow-hidden -z-20 flex items-center justify-center ">
                <div className=" absolute left-[2rem] md:left-[5rem] lg:left-[10rem]  flex items-center ">
                    <div className="flex-col text-4xl md:text-6xl lg:text-8xl flex text-[#403E3E]">
                        <h1>Shell </h1>
                        <h1> Chandeliers</h1>
                        <Link
                            href={route("shop")}
                            className="text-3xl mt-4 hover:bg-slate-800 duration-300 rounded-full px-3 capitalize font-bold py-2 bg-[#403E3E] w-fit text-white"
                        >
                            Shop now
                        </Link>
                    </div>
                </div>
                <img
                    className="object-cover w-full h-full "
                    src={frame_1}
                    alt=""
                />
            </div>
            {/* 2nd page */}
            <div className="flex flex-col items-center w-full h-full p-6 bg-white ">
                <h1 className="py-8 text-4xl font-bold text-center ">
                    Discovery Pick
                </h1>
                <div className="flex flex-col items-center justify-center md:flex-row lg:items-start ">
                    <img
                        src="https://2.img-dpreview.com/files/p/E~C1000x0S4000x4000T1200x1200~articles/3925134721/0266554465.jpeg"
                        className="object-cover rounded-full  h-52 w-52"
                        alt=""
                    />
                    <div className="flex flex-col items-center mb-6 ml-8  lg:mb-0">
                        <Link
                            href={route("shop.profile", sellerData.id)}
                            className="flex items-center gap-1 mt-4 text-xl font-bold text-themeColor "
                        >
                            <FaShop size={30} className="text-themeColor" />
                            {sellerData.shop_name}
                        </Link>

                        <table className="min-w-full overflow-hidden">
                            <tr className="text-left">
                                <td className="pt-2 pr-6 font-bold ">Name</td>
                                <td className="pt-2 font-italic">
                                    {sellerData.user.first_name +
                                        " " +
                                        sellerData.user.last_name}
                                </td>
                            </tr>
                            <tr>
                                <td className="pt-2 pr-6 font-bold ">
                                    Location
                                </td>
                                <td className="pt-2 font-italic">
                                    {sellerData.shop_address}
                                </td>
                            </tr>
                            <tr>
                                <td className="pt-2 pr-6 font-bold ">Join</td>
                                <td className="pt-2 font-italic">
                                    {new Intl.DateTimeFormat("en-US", {
                                        month: "long",
                                        day: "2-digit",
                                        year: "numeric",
                                    }).format(new Date(sellerData.created_at))}
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div className="grid max-w-5xl grid-cols-2 gap-5 mt-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:mt-6 ">
                    {sellerProducts.data.map((product) => (
                        <Link
                            key={product.id}
                            href={route("view-product", product.id)}
                            className={`bg-gray-100 duration-300 hover:bg-gray-200 ease-in-out hover:-translate-y-3 drop-shadow-lg flex rounded relative overflow-hidden ${layout == "grid"
                                    ? "flex-col"
                                    : "flex-row h-[10rem]"
                                }`}
                        >
                            <div
                                className={` ${layout == "grid"
                                        ? "pt-[100%] w-full"
                                        : "w-[10rem] h-full aspect-1"
                                    } relative`}
                            >
                                <img
                                    src={
                                        product.images.length == 0
                                            ? DefaultProductIcon
                                            : product.images[0].image_path
                                    }
                                    alt={product.product_name + " Image"}
                                    className="absolute top-0 left-0 object-cover w-full h-full"
                                />

                                {/* Overlay for Out of Stock */}
                                {product.quantity === 0 && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                        <span className="text-lg font-semibold text-white">
                                            Out of Stock
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col justify-between w-full h-full p-4 text-center">
                                <p className="overflow-hidden line-clamp-2">
                                    {product.product_name}
                                </p>
                                <div
                                    className={`flex flex-col w-full ${layout == "grid"
                                            ? "items-center"
                                            : "items-start"
                                        }`}
                                >
                                    <StarRating rating={product.rating} />
                                    <div className="flex items-center justify-between w-full">
                                        <p className="font-semibold">
                                            Php{" "}
                                            {new Intl.NumberFormat().format(
                                                product.price
                                            )}
                                        </p>
                                        <small>Stock: {product.quantity}</small>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
