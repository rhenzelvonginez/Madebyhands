import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import SpinnerLoading from "@/Components/SpinnerLoading";
import SellerAuthenticatedLayout from "@/Layouts/SellerAuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export default function AddProduct({ auth }) {
    const { processing, setData, data, errors, post } = useForm({
        product_name: "",
        quantity: "",
        price: "",
        description: "",
        category: "",
        images: [],
    });
    const { categories, flash } = usePage().props;

    // State to manage selected images
    const [images, setImages] = useState([]);

    // Create a ref for the file input field
    const fileInputRef = useRef(null);

    // Handle file input change
    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        if (data.images.length + files.length > 5) {
            alert("You can only upload up to 5 images.");
            return;
        }
        setData("images", [...data.images, ...files]);
    };

    const handleRemoveImage = (index) => {
        setData(
            "images",
            data.images.filter((_, i) => i !== index)
        );
    };

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (flash?.status === "success") {
            toast.success(
                <div dangerouslySetInnerHTML={{ __html: flash.message }} />
            );
        } else if (flash?.status === "error") {
            toast.error(
                <div dangerouslySetInnerHTML={{ __html: flash.message }} />
            );
        }
    }, [flash]);

    const submitProduct = (e) => {
        e.preventDefault();
        setLoading(true);
        post(route("seller.addproduct", data), {
            onSuccess: (response) => {
                setTimeout(() => {
                    setLoading(false);
                    setData({
                        product_name: "",
                        quantity: "",
                        description: "",
                        category: "",
                        price: "",
                        images: [],
                    });

                    // Reset the file input field
                    if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                    }
                }, 100);
            },
            onError: (errors) => {
                setTimeout(() => {
                    setLoading(false);
                }, 100);
            },
        });
    };

    return (
        <>
            <SellerAuthenticatedLayout user={auth}>
                <Head title="Seller - Add product" />
                <ToastContainer />
                {loading && (
                    <div className="fixed inset-0 z-50 bg-gray-500 bg-opacity-75 backdrop-blur-sm flex items-center justify-center">
                        <div className="bg-white w-[40%] p-6 rounded-lg shadow-lg">
                            <p className="text-lg text-center font-semibold text-gray-800 mb-4">
                                Please wait, your product is being added. This
                                might take a few moments.
                            </p>
                            <div className="relative w-full h-2 bg-gray-200 rounded overflow-hidden">
                                <div className="absolute top-0 left-0 h-full w-[200%] bg-themeColor rounded loading-bar"></div>
                            </div>
                        </div>
                    </div>
                )}
                <div className="max-w-4xl mx-auto ">
                    <div className="my-2">
                        <Link
                            href={route("seller.products")}
                            className=" font-bold text-xl text-mainText"
                        >
                            Go back
                        </Link>
                    </div>
                    <div className="p-6 bg-white rounded-lg shadow-md">
                        <h2 className="text-mainText text-2xl font-semibold mb-4">
                            Create New Product
                        </h2>
                        <form
                            onSubmit={submitProduct}
                            encType="multipart/form-data"
                        >
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Product Name
                                </label>
                                <input
                                    value={data.product_name}
                                    onChange={(e) =>
                                        setData("product_name", e.target.value)
                                    }
                                    type="text"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    required
                                />
                                {errors.product_name && (
                                    <InputError
                                        className="mt-1"
                                        message={errors.product_name}
                                    />
                                )}
                            </div>

                            <div className="md:flex gap-4">
                                <div className="mb-4 w-full">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Price
                                    </label>
                                    <input
                                        value={data.price}
                                        onChange={(e) =>
                                            setData("price", e.target.value)
                                        }
                                        type="number"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                        required
                                    />
                                    {errors.price && (
                                        <InputError
                                            className="mt-1"
                                            message={errors.price}
                                        />
                                    )}
                                </div>
                                <div className="mb-4 w-full">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Quantity
                                    </label>
                                    <input
                                        value={data.quantity}
                                        onChange={(e) =>
                                            setData("quantity", e.target.value)
                                        }
                                        type="number"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                        required
                                    />
                                    {errors.quantity && (
                                        <InputError
                                            className="mt-1"
                                            message={errors.quantity}
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Description
                                </label>
                                <textarea
                                    value={data.description}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    required
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                ></textarea>
                                {errors.description && (
                                    <InputError
                                        className="mt-1"
                                        message={errors.description}
                                    />
                                )}
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Category
                                </label>

                                <SelectInput
                                    className="w-full"
                                    defaultValue={data.years_in_selling}
                                    onChange={(e) => {
                                        setData("category", e.target.value);
                                    }}
                                >
                                    <option
                                        value=""
                                        className="text-slate-900 w-full"
                                        defaultValue
                                    >
                                        Select Category
                                    </option>
                                    {categories.map((category) => (
                                        <option
                                            key={category.id}
                                            value={category.category_name}
                                            className="text-slate-900 w-full"
                                        >
                                            {category.category_name}
                                        </option>
                                    ))}
                                </SelectInput>
                                {errors.category && (
                                    <InputError
                                        className="mt-1"
                                        message={errors.category}
                                    />
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Images
                                </label>
                                <input
                                    ref={fileInputRef} // Attach the ref to the input
                                    maxLength={5}
                                    type="file"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    multiple
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    disabled={data.images.length >= 5}
                                />
                                <small className="text-gray-500">
                                    You can upload up to 5 images. Please ensure
                                    that each image has a 1:1 aspect ratio or is
                                    in a square format.
                                </small>
                                {errors.images && (
                                    <InputError
                                        className="mt-1"
                                        message={errors.images}
                                    />
                                )}
                                <div className="flex flex-wrap gap-4 mt-4">
                                    {data.images.map((image, index) => (
                                        <div
                                            key={index}
                                            className="relative w-36 h-36 mr-2 mb-2"
                                        >
                                            <img
                                                src={URL.createObjectURL(image)}
                                                alt={`Preview ${index}`}
                                                className="w-full h-full object-cover rounded"
                                            />
                                            <button
                                                type="button"
                                                className="absolute -top-2 -right-2 w-fit h-fit bg-red-600 text-white px-2 rounded-full"
                                                onClick={() =>
                                                    handleRemoveImage(index)
                                                }
                                            >
                                                &times;
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-center justify-end mt-4">
                                <button
                                    disabled={processing}
                                    type="submit"
                                    className="px-4 py-2  bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    {processing ? (
                                        <div className="flex flex-row items-center gap-1">
                                            Processing <SpinnerLoading />
                                        </div>
                                    ) : (
                                        "Create Product"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </SellerAuthenticatedLayout>
        </>
    );
}
