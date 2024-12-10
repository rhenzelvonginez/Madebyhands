import StarRating from "@/Components/StarRating";
import UserAuthenticatedLayout from "@/Layouts/UserAuthenticatedLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import AddToCart from "@/Components/AddToCart";
import Quantity from "@/Components/Quantity";
import ReviewComponent from "./Components/ReviewComponent";
import { FaStar } from "react-icons/fa";
import { FaShop } from "react-icons/fa6";
import CreateChatModal from "@/Components/CreateChatModal";
import ReportModal from "@/Components/ReportModal";

export default function ViewProduct({ auth, success }) {
    const { product } = usePage().props;
    const [isReportModalVisible, setReportModalVisible] = useState(false);
    const [reportStatus, setReportStatus] = useState('Report Item');
    const [currentPhoto, setCurrentPhoto] = useState(product.images[0].image_path);
    const changePhoto = (src) => {
        setCurrentPhoto(src);
    };
    const [modalOpen, setModalOpen] = useState(false);
    const [buyingQuantity, setBuyingQuantity] = useState(1);
    const handleQuantityChange = (newQuantity) => {
        setBuyingQuantity(newQuantity);
    };
    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };
    const handleBuyNow = (id) => {
        const item = {
            product_id: id,
            item_quantity: buyingQuantity,
        };
        router.get(route("checkout.show", { items: [item] }));
    };
    return (
        <UserAuthenticatedLayout user={auth.user} cartNumber={auth.cartCount}>
            <Head title={product.product_name} />
            {/* Modal */}
            <AddToCart
                isOpen={modalOpen}
                onClose={toggleModal}
                itemImage={product.images[0].image_path}
                price={product.price}
                stock={product.quantity}
                product_id={product.id}
                name={product.product_name}
                rating={product.rating}
            />
            <div className="py-2 bg-slate-50 max-h-max">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="container p-4 mx-auto">
                        <div className="flex flex-col lg:flex-row">
                            <div className="w-full lg:w-[40%] p-4">
                                <div className="p-3 rounded-md bg-slate-200">
                                    <div className="w-full aspect-w-1 aspect-h-1">
                                        <img
                                            src={currentPhoto}
                                            alt={`${product.product_name} Image`}
                                            className="object-cover w-full h-full rounded-md"
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-2 py-2 mt-2 overflow-x-auto">
                                    {product.images.map((image) => (
                                        <img
                                            key={image.id}
                                            onClick={() => changePhoto(image.image_path)}
                                            src={image.image_path}
                                            alt="Sample Image"
                                            className={`rounded-md h-20 w-20 ${currentPhoto === image.image_path ? "bg-secondaryColor" : "cursor-pointer"} object-cover p-2`}
                                        />
                                    ))}
                                </div>
                            </div>
                            {/* product details */}
                            <div className="w-full lg:w-[60%] px-4 md:px-10 mt-4 md:mt-0 h-full lg:h-[80vh] overflow-y-auto">
                                <h1 className="text-3xl font-semibold">
                                    {product.product_name}
                                </h1>
                                <Link
                                    href={route("shop.profile", product.seller.id)}
                                    className="flex items-center gap-1 mt-4 text-xl font-bold text-themeColor "
                                >
                                    <FaShop size={30} className="text-themeColor" />
                                    {product.seller.shop_name}
                                </Link>
                                <p className="mt-2 text-2xl text-green-600">
                                    Php {new Intl.NumberFormat().format(product.price)}
                                </p>
                                <StarRating rating={product.rating} />
                                <p className="mt-2 text-lg text-gray-700">{product.description}</p>
                                <div className="mt-4">
                                    <span className="font-semibold">Stocks:</span> {product.quantity}
                                </div>
                                <div>
                                    <span className="font-semibold">Sold:</span> {product.sold}
                                </div>
                                <div>
                                    <span className="font-semibold">Weight: </span>
                                    {Number(product.weight) < 1
                                        ? `${(Number(product.weight) * 1000).toFixed(0)} g`
                                        : `${Number(product.weight).toFixed(2)} kg`}
                                </div>
                                <div>
                                    {/* <div>
                                        <span className="font-semibold">Shipping Fee:</span>c Php.
                                    </div> */}
                                    <Quantity
                                        currentStock={product.quantity}
                                        quantity={1}
                                        onQuantityChange={handleQuantityChange}
                                    />
                                </div>
                                {/* add to cart component  & report button*/}
                                <div className="flex items-center justify-start gap-2 mt-2 md:mt-4">
                                    <button
                                        onClick={() => handleBuyNow(product.id)}
                                        disabled={product.quantity === 0}
                                        className="px-4 py-2 font-medium text-white transition duration-200 rounded-md bg-secondaryColor hover:bg-thirdColor-dark disabled:opacity-50"
                                    >
                                        Buy Now
                                    </button>
                                    <button
                                        onClick={toggleModal}
                                        className="px-4 py-2 text-white transition duration-200 rounded-md bg-secondaryColor hover:bg-secondaryColor-dark"
                                    >
                                        Add to Cart
                                    </button>
                                    {/* <Link className="px-4 py-2 font-medium text-white transition duration-200 rounded-md bg-secondaryColor hover:bg-thirdColor-dark disabled:opacity-50">
                                        Message Seller
                                    </Link> */}
                                    <CreateChatModal productData={product} />
                                    <button
                                        className="px-6 py-2 text-white bg-red-500 rounded-md"
                                        onClick={() => setReportModalVisible(true)}
                                    >
                                        {reportStatus}
                                    </button>
                                    <ReportModal
                                        productId={product.id}
                                        isReportModalVisible={isReportModalVisible}
                                        onClose={() => setReportModalVisible(false)}
                                    />
                                </div>
                                {product.quantity === 0 && (
                                    <div className="px-2 py-1 mt-2 text-xs text-red-600 bg-red-100 border-red-500 rounded-sm w-fit">
                                        This item is currently out of stock
                                    </div>
                                )}
                                {/* review area */}
                                <div className="pt-4 mt-6 border-t-2 border-slate-300">
                                    <div>
                                        <div className="flex items-center justify-between w-full">
                                            <h1 className="flex items-center gap-1 font-bold text-mainText">
                                                {product.rating + " "}
                                                <span><FaStar className="text-yellow-500 " /></span>
                                                Product Ratings
                                            </h1>
                                            {product.reviews.length <= 5 ? "" : (
                                                <Link className="duration-300 text-themeColor hover:text-orange-600">
                                                    View All
                                                </Link>
                                            )}
                                        </div>
                                        {product.reviews.length === 0
                                            ? "This product does not have any reviews yet."
                                            : product.reviews.map((review) => (
                                                <ReviewComponent data={review} key={review.id} />
                                            ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </UserAuthenticatedLayout>
    );
}
