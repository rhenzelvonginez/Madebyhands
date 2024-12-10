import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import { BsGrid3X3GapFill, BsStarFill } from "react-icons/bs";
import { TbListDetails } from "react-icons/tb";
import DefaultProductIcon from "../../assets/img/Default-Product-Placeholder.svg";
import UserAuthenticatedLayout from "@/Layouts/UserAuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import StarRating from "@/Components/StarRating";
import SelectInput from "@/Components/SelectInput";
import Pagination from "@/Components/Pagination";

const ShopProfile = ({ auth, queryParams = null }) => {
    const [layout, setLayout] = useState("grid"); // State for layout type
    const toggleLayout = () => {
        setLayout((prevLayout) => (prevLayout === "grid" ? "list" : "grid"));
    };
    const [currentCategory, setCurrentCategory] = useState();
    const { sellerData, products, sellersCategory } = usePage().props;
    queryParams = queryParams || {};
    const [searchTerm, setSearchTerm] = useState(queryParams.search || "");
    const findByCategory = (category, value) => {
        setCurrentCategory(value);
        const url = new URL(window.location);

        url.searchParams.set("category", value);
        url.searchParams.set("search", searchTerm); // Keep the current search term

        window.location.href = url.toString();
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        const url = new URL(window.location);

        url.searchParams.set("search", e.target.value);
        url.searchParams.set("category", currentCategory || "all");

        window.location.href = url.toString();
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get("category") || "all";
        const search = urlParams.get("search") || "";
        setCurrentCategory(category);
        setSearchTerm(search);
    }, []);

    return (
        <UserAuthenticatedLayout user={auth} cartNumber={auth.cartCount}>
            <Head title="Profile" />
            <div className="container mx-auto p-4 mt-2 md:mt-4 lg:mt-8">
                <div className="flex flex-col md:flex-row mb-8 md:gap-2 lg:gap-6">
                    {/* Shop Profile Section */}
                    <div className="w-full md:w-1/3 lg:w-1/4 bg-white border border-slate-200 h-fit p-4 rounded-lg shadow-md mb-4 md:mb-0">
                        <div className="text-center mb-4">
                            <img
                                className="w-24 h-24 rounded-full mx-auto"
                                src={DefaultProductIcon}
                                alt="Shop Profile"
                            />
                            <h2 className="text-2xl font-semibold mt-2">
                                {sellerData.shop_name}
                            </h2>
                            <p className="text-gray-600 mt-1">
                                {sellerData.shop_address}
                            </p>
                        </div>
                        {/* category of seller */}
                        <div className="mb-4">
                            <h2 className="font-semibold text-lg mb-1">
                                Categories
                            </h2>
                            <div className="flex md:block overflow-x-scroll md:overflow-x-hidden space-x-2 md:space-x-0 md:space-y-2">
                                <ul className="flex md:flex-col gap-2 lg:gap-0 text-mainText">
                                    <li
                                        onClick={(e) => {
                                            e.preventDefault();
                                            findByCategory("category", "all");
                                        }}
                                        className={`mb-1 whitespace-nowrap duration-200 ease-in-out cursor-pointer p-2 rounded-lg ${
                                            currentCategory == "all"
                                                ? "bg-themeColor text-slate-100"
                                                : "hover:bg-themeColor bg-gray-50 hover:text-slate-100"
                                        }`}
                                    >
                                        All
                                    </li>
                                    {sellersCategory.map((category, index) => (
                                        <li
                                            key={index}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                findByCategory(
                                                    "category",
                                                    category
                                                );
                                            }}
                                            className={`mb-1 whitespace-nowrap duration-200 ease-in-out cursor-pointer p-2 rounded-lg ${
                                                currentCategory == category
                                                    ? "bg-themeColor text-slate-100"
                                                    : "hover:bg-themeColor bg-gray-50 hover:text-slate-100"
                                            }`}
                                        >
                                            {category}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Products Section */}
                    <div className="w-full md:w-2/3 lg:w-3/4 px-4   ">
                        {/* search */}
                        <div className="w-full flex items-center mb-3 gap-2">
                            <span className="font-bold">Search</span>
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder={
                                        "Search product in " +
                                        sellerData.shop_name
                                    }
                                    value={searchTerm}
                                    onChange={handleSearch}
                                />
                                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            </div>
                        </div>

                        <div className="flex w-full justify-between items-center mb-2">
                            <div className="flex items-center gap-2">
                                <BsGrid3X3GapFill
                                    className={`cursor-pointer ${
                                        layout == "grid"
                                            ? "text-themeColor"
                                            : "text-slate-800"
                                    }`}
                                    size={30}
                                    onClick={toggleLayout}
                                />
                                <TbListDetails
                                    className={`cursor-pointer ${
                                        layout == "list"
                                            ? "text-themeColor"
                                            : "text-slate-800"
                                    }`}
                                    size={30}
                                    onClick={toggleLayout}
                                />
                            </div>
                            {/* <div className="flex items-center space-x-2">
                                <span className="text-gray-500 whitespace-nowrap">
                                    Sort by:
                                </span>
                                <SelectInput
                                    className="w-full"
                                    defaultValue={queryParams.filterProducts}
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
                                </SelectInput>
                            </div> */}
                        </div>

                        <div
                            className={`grid ${
                                layout === "grid"
                                    ? "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                                    : "grid-cols-1"
                            } gap-5 mt-3 md:mt-6`}
                        >
                            {products.data.map((product) => (
                                <Link
                                    key={product.id}
                                    href={route("view-product", product.id)}
                                    className={`bg-gray-100 duration-300 hover:bg-gray-200 ease-in-out hover:-translate-y-3 drop-shadow-lg flex rounded relative overflow-hidden ${
                                        layout == "grid"
                                            ? "flex-col"
                                            : "flex-row h-[10rem]"
                                    }`}
                                >
                                    <div
                                        className={` ${
                                            layout == "grid"
                                                ? "pt-[100%] w-full"
                                                : "w-[10rem] h-full aspect-1"
                                        } relative`}
                                    >
                                        <img
                                            src={
                                                product.images.length == 0
                                                    ? DefaultProductIcon
                                                    : product.images[0]
                                                          .image_path
                                            }
                                            alt={
                                                product.product_name + " Image"
                                            }
                                            className="absolute top-0 left-0 w-full h-full object-cover"
                                        />

                                        {/* Overlay for Out of Stock */}
                                        {product.quantity === 0 && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                                <span className="text-white text-lg font-semibold">
                                                    Out of Stock
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-4 text-center flex flex-col w-full h-full justify-between">
                                        <p className="line-clamp-2 overflow-hidden">
                                            {product.product_name}
                                        </p>
                                        <div
                                            className={`flex flex-col w-full ${
                                                layout == "grid"
                                                    ? "items-center"
                                                    : "items-start"
                                            }`}
                                        >
                                            <StarRating
                                                rating={product.rating}
                                            />
                                            <div className="flex items-center w-full justify-between">
                                                <p className="font-semibold">
                                                    Php{" "}
                                                    {new Intl.NumberFormat().format(
                                                        product.price
                                                    )}
                                                </p>
                                                <small>
                                                    Stock: {product.quantity}
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        {/* pagination */}
                        <Pagination links={products.links} className="-mb-4" />
                    </div>
                </div>
            </div>
        </UserAuthenticatedLayout>
    );
};

export default ShopProfile;
