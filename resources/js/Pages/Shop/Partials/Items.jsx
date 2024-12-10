import StarRating from "@/Components/StarRating";
import { Link } from "@inertiajs/react";
import DefaultProductIcon from "../../../assets/img/Default-Product-Placeholder.svg";

export default function Items({ products }) {
    const layout = "grid";

    return (
        <>
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
                        className={`bg-gray-100 duration-700 hover:bg-gray-200 ease-in-out hover:-translate-y-3 drop-shadow-lg flex rounded relative overflow-hidden ${
                            layout == "grid" ? "flex-col" : "flex-row h-[10rem]"
                        }`}
                    >
                        <div
                            className={` ${
                                layout == "grid"
                                    ? "pt-[100%] w-full"
                                    : "w-[10rem] h-full"
                            } relative`}
                        >
                            <img
                                src={
                                    product.images == null
                                        ? DefaultProductIcon
                                        : product.images[0].image_path
                                }
                                alt={product.product_name + " Image"}
                                className="absolute top-0 left-0 w-full h-full object-cover"
                            />
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
                                <StarRating rating={product.rating} />
                                <div className="flex items-center w-full justify-between">
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
        </>
    );
}
