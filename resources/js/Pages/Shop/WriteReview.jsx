import UserAuthenticatedLayout from "@/Layouts/UserAuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { FaStar } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import InputError from "@/Components/InputError";
import { toast, ToastContainer } from "react-toastify";
import { useEffect } from "react";

export default function WriteReview({ auth }) {
    const { item, flash } = usePage().props;

    const { post, errors, processing, data, setData } = useForm({
        review: "",
        orderId: item.id,
        qualityRating: 0,
        serviceRating: 0,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("rate.create", item.id));
    };

    useEffect(() => {
        if (flash.status == "success") {
            toast.success(flash.message);
        } else {
            toast.error(flash.message);
        }
    }, [flash]);

    return (
        <UserAuthenticatedLayout user={auth}>
            <Head title="Rate Product" />
            <ToastContainer />
            <div className="container mx-auto max-w-6xl p-4 md:p-8">
                <div className="bg-white p-6 rounded-md border border-slate-200 shadow-md">
                    {/* Product Details */}
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <img
                            src={item.images[0].image_path}
                            alt={item.product_name}
                            className="w-24 h-24 object-cover rounded-md"
                        />
                        <div>
                            <h2 className="text-xl font-semibold">
                                {item.product_name}
                            </h2>
                            <p className="text-gray-600">{item.category}</p>
                        </div>
                    </div>

                    {/* Rating Section */}
                    <div className="mt-8">
                        <h3 className="text-lg font-semibold">
                            Rate This Product
                        </h3>
                        <div className="mt-1">
                            <p className="font-semibold">Product Quality</p>
                            <div className="flex gap-2 mt-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <FaStar
                                        key={star}
                                        className={`cursor-pointer ${
                                            data.qualityRating >= star
                                                ? "text-yellow-500"
                                                : "text-gray-400"
                                        }`}
                                        onClick={() =>
                                            setData("qualityRating", star)
                                        }
                                    />
                                ))}
                            </div>
                            <InputError message={errors.qualityRating} />
                        </div>

                        <div className="mt-4">
                            <p className="font-semibold">Seller Service</p>
                            <div className="flex gap-2 mt-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <FaStar
                                        key={star}
                                        className={`cursor-pointer ${
                                            data.serviceRating >= star
                                                ? "text-yellow-500"
                                                : "text-gray-400"
                                        }`}
                                        onClick={() =>
                                            setData("serviceRating", star)
                                        }
                                    />
                                ))}
                            </div>
                            <InputError message={errors.serviceRating} />
                        </div>

                        <div className="mt-4">
                            <p className="font-semibold">Your Review</p>
                            <textarea
                                onChange={(e) =>
                                    setData("review", e.target.value)
                                }
                                className="w-full p-2 border rounded-md mt-2"
                                rows="4"
                                placeholder="Write your review here..."
                            ></textarea>
                            <InputError message={errors.review} />
                        </div>

                        <button
                            onClick={handleSubmit}
                            className="mt-6 w-full md:w-fit bg-themeColor text-white px-4 py-2 rounded-md hover:bg-orange-600 transition"
                        >
                            {processing ? "Submitting...." : "Submit Review"}
                        </button>
                    </div>
                </div>
            </div>
        </UserAuthenticatedLayout>
    );
}
