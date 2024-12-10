import Pagination from "@/Components/Pagination";
import StarRating from "@/Components/StarRating";
import GuestLandingPageLayout from "@/Layouts/GuestLandingPageLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { FaShop } from "react-icons/fa6";
import { BsGrid3X3GapFill } from "react-icons/bs";
import { TbListDetails } from "react-icons/tb";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";

export default function Index({ queryParams = null }) {
    const { sellerData, sellerProducts } = usePage().props;
    const { products = [], categories } = usePage().props;
    queryParams = queryParams || {};

    const [currentCategory, setCurrentCategory] = useState();
    const [layout, setLayout] = useState("grid"); // State for layout type

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get("category") || "all";
        setCurrentCategory(category);
    }, []);

    const searchFieldProduct = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route("shop"), queryParams);
    };

    const findByCategory = (category, value) => {
        setCurrentCategory(value);
        if (value && value !== "all") {
            queryParams[category] = value;
        } else {
            delete queryParams[category];
        }
        router.get(route("shop"), queryParams);
    };

    const onKeyPress = (name, e) => {
        if (e.key == "Enter") {
            searchFieldProduct(name, e.target.value);
        }
    };

    const toggleLayout = () => {
        setLayout((prevLayout) => (prevLayout === "grid" ? "list" : "grid"));
    };
    return <>
        <GuestLandingPageLayout>
            <Head title="Shop" />
            {/* Discovery pick content here */}
            <div className="flex flex-col items-center w-full h-full p-4 bg-white ">
                <h1 className="py-8 text-4xl font-bold text-center ">
                    Discovery Pick
                </h1>
                <div className="flex flex-col items-center justify-center md:flex-row lg:items-start ">
                    {sellerData.shop_picture_path ? (
                        <img
                            src={`storage/${sellerData.shop_picture_path}`}
                            className="object-cover rounded-full h-32 w-32"
                            alt=""
                        />
                    ) : (
                        <div
                            className={`flex items-center justify-center w-32 h-32 rounded-full bg-[#ff9800] text-white text-5xl font-semibold `}>
                            {sellerData.shop_name.charAt(0).toUpperCase()}
                        </div>
                    )}


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

            {/* shop content here */}
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="container p-4 mx-auto">
                        <div className="flex flex-col md:flex-row">
                            <div className="w-full p-4 overflow-y-auto bg-white md:w-1/3 lg:w-1/4 md:overflow-hidden">
                                <div className="mb-4">
                                    <h2 className="mb-1 text-lg font-semibold">
                                        Categories
                                    </h2>
                                    <div className="flex space-x-2 overflow-x-scroll md:block md:overflow-x-hidden md:space-x-0 md:space-y-2">
                                        <ul className="flex gap-2 md:flex-col lg:gap-0 text-mainText">
                                            <li
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    findByCategory(
                                                        "category",
                                                        "all"
                                                    );
                                                }}
                                                className={`mb-1 whitespace-nowrap duration-200 ease-in-out cursor-pointer p-2 rounded-lg ${currentCategory == "all"
                                                    ? "bg-themeColor text-slate-100"
                                                    : "hover:bg-themeColor bg-gray-50 hover:text-slate-100"
                                                    }`}
                                            >
                                                All
                                            </li>
                                            {categories.map((category) => (
                                                <li
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        findByCategory(
                                                            "category",
                                                            category.category_name
                                                        );
                                                    }}
                                                    key={category.id}
                                                    className={`mb-1 whitespace-nowrap duration-200 ease-in-out cursor-pointer p-2 rounded-lg ${currentCategory ==
                                                        category.category_name
                                                        ? "bg-themeColor text-slate-100"
                                                        : "hover:bg-themeColor bg-gray-50 hover:text-slate-100"
                                                        }`}
                                                >
                                                    {category.category_name}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full px-4 pb-4 bg-white md:w-2/3 lg:w-3/4">
                                <div className="flex items-center w-full gap-2 mb-3">
                                    <span className="font-bold">Search</span>
                                    <TextInput
                                        defaultValue={queryParams.name}
                                        onKeyPress={(e) => {
                                            onKeyPress("name", e);
                                        }}
                                        className="w-full"
                                        placeholder="Enter to search product..."
                                    />
                                </div>

                                <div className="flex items-center justify-between w-full mb-2">
                                    <div className="flex items-center gap-2">
                                        <BsGrid3X3GapFill
                                            className={`cursor-pointer ${layout == "grid"
                                                ? "text-themeColor"
                                                : "text-slate-800"
                                                }`}
                                            size={30}
                                            onClick={toggleLayout}
                                        />
                                        <TbListDetails
                                            className={`cursor-pointer ${layout == "list"
                                                ? "text-themeColor"
                                                : "text-slate-800"
                                                }`}
                                            size={30}
                                            onClick={toggleLayout}
                                        />
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-gray-500 whitespace-nowrap">
                                            Sort by:
                                        </span>
                                        <SelectInput
                                            className="w-full"
                                            defaultValue={
                                                queryParams.filterProducts
                                            }
                                            onChange={(e) =>
                                                searchFieldProduct(
                                                    "filterProducts",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option
                                                className="text-slate-900"
                                                value="product-posted"
                                            >
                                                Product Posted
                                            </option>
                                            <option
                                                className="text-slate-900"
                                                value="top-selling"
                                            >
                                                Top Selling
                                            </option>
                                            <option
                                                className="text-slate-900"
                                                value="a-z"
                                            >
                                                A-Z
                                            </option>
                                            <option
                                                className="text-slate-900"
                                                value="z-a"
                                            >
                                                Z-A
                                            </option>
                                            <option
                                                className="text-slate-900"
                                                value="highest-rating"
                                            >
                                                Highest Rating
                                            </option>
                                            <option
                                                className="text-slate-900"
                                                value="price-h-l"
                                            >
                                                Price: High to Low
                                            </option>
                                            <option
                                                className="text-slate-900"
                                                value="price-l-h"
                                            >
                                                Price: Low to High
                                            </option>
                                        </SelectInput>
                                    </div>
                                </div>

                                <div
                                    className={`grid ${layout === "grid"
                                        ? "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                                        : "grid-cols-1"
                                        } gap-5 mt-3 md:mt-6`}
                                >
                                    {products.data.map((product) => (
                                        <Link
                                            key={product.id}
                                            href={route(
                                                "view-product",
                                                product.id
                                            )}
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
                                                        product.images.length ==
                                                            0
                                                            ? DefaultProductIcon
                                                            : product.images[0]
                                                                .image_path
                                                    }
                                                    alt={
                                                        product.product_name +
                                                        " Image"
                                                    }
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
                                                    <StarRating
                                                        rating={product.rating}
                                                    />
                                                    <div className="flex items-center justify-between w-full">
                                                        <p className="font-semibold">
                                                            Php{" "}
                                                            {new Intl.NumberFormat().format(
                                                                product.price
                                                            )}
                                                        </p>
                                                        <small>
                                                            Stock:{" "}
                                                            {product.quantity}
                                                        </small>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>

                                <Pagination
                                    links={products.links}
                                    className="pb-4"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLandingPageLayout>
    </>
}
