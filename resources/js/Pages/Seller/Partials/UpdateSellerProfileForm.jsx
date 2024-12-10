import { useEffect, useRef, useState } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import DefaultUserIcon from "../../../assets/img/default_user_profile.png";
import DefaultShopIcon from "../../../assets/img/default_shop_profile.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UpdateSellerProfileForm() {
    const user = usePage().props.seller.data[0];
    const { flash } = usePage().props;

    const [preview, setPreview] = useState(user.profile_picture_path || null);
    const [previewShopProfile, setPreviewShopProfile] = useState(
        user.seller.shop_picture_path || null
    );

    const { data, setData, errors, post, processing, recentlySuccessful } =
        useForm({
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            address: user.address,
            profile_picture: user.profile_picture,
            new_profile_picture: null,
            shop_profile_picture: user.seller.shop_picture_path,
            new_shop_profile: null,
            phone_no: user.phone_no,
            shop_name: user.seller.shop_name,
            shop_address: user.seller.shop_address,
        });

    const updateProfile = (e) => {
        e.preventDefault();
        console.log("submitted data", data);
        post(route("seller.update.profile", data), {
            preserveScroll: true,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData("new_profile_picture", file);
            setPreview(URL.createObjectURL(file));
        }
    };
    const handleImageChangeNewShopProfile = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData("new_shop_profile", file);
            setPreviewShopProfile(URL.createObjectURL(file));
        }
    };

    useEffect(() => {
        if (flash.status) {
            toast.success(flash.message);
        } else {
            toast.error(flash.message);
        }
    }, [flash]);

    return (
        <section className="bg-slate-50 shadow-lg p-6 rounded-md">
            <ToastContainer />
            <div className="max-w-3xl">
                <h2 className="text-lg font-medium text-gray-900">
                    Profile Information
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p>

                <form onSubmit={updateProfile} className="mt-6 space-y-6">
                    <div className="flex gap-2 flex-col md:flex-row">
                        <div>
                            <InputLabel
                                htmlFor="profile_picture"
                                value="Profile Picture"
                            />
                            {preview ? (
                                <img
                                    src={preview}
                                    alt="Profile Preview"
                                    className="mt-2 h-24 md:w-32 w-24 md:h-32 lg:w-44 lg:h-44 rounded-full object-cover"
                                />
                            ) : (
                                <img
                                    src={
                                        data.profile_picture
                                            ? data.profile_picture
                                            : DefaultUserIcon
                                    }
                                    alt="Profile Preview"
                                    className="mt-2 h-24 md:w-32 w-24 md:h-32 lg:w-44 lg:h-44 rounded-full object-cover"
                                />
                            )}

                            <TextInput
                                id="profile_picture"
                                type="file"
                                accept="image/*"
                                className="mt-1 block w-full"
                                onChange={handleImageChange}
                            />

                            <InputError
                                message={errors.profile_picture}
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <InputLabel
                                htmlFor="shop_profile_picture"
                                value="Shop Picture"
                            />
                            {previewShopProfile ? (
                                <img
                                    src={previewShopProfile}
                                    alt="Profile Preview"
                                    className="mt-2 h-24 md:w-32 w-24 md:h-32 lg:w-44 lg:h-44 rounded-full object-cover"
                                />
                            ) : (
                                <img
                                    src={
                                        data.shop_profile_picture
                                            ? data.shop_profile_picture
                                            : DefaultShopIcon
                                    }
                                    alt="Profile Preview"
                                    className="mt-2 h-24 md:w-32 w-24 md:h-32 lg:w-44 lg:h-44 rounded-full object-cover"
                                />
                            )}

                            <TextInput
                                id="shop_profile_picture"
                                type="file"
                                accept="image/*"
                                className="mt-1 block w-full"
                                onChange={handleImageChangeNewShopProfile}
                            />

                            <InputError
                                message={errors.shop_profile_picture}
                                className="mt-2"
                            />
                        </div>
                    </div>

                    <div>
                        <InputLabel htmlFor="first_name" value="First name" />

                        <TextInput
                            id="first_name"
                            value={data.first_name}
                            onChange={(e) =>
                                setData("first_name", e.target.value)
                            }
                            type="text"
                            className="mt-1 block w-full"
                        />

                        <InputError
                            message={errors.first_name}
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor="last_name" value="Last name" />

                        <TextInput
                            id="last_name"
                            value={data.last_name}
                            onChange={(e) =>
                                setData("last_name", e.target.value)
                            }
                            type="text"
                            className="mt-1 block w-full"
                        />

                        <InputError
                            message={errors.last_name}
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor="email" value="Email address" />

                        <TextInput
                            id="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            type="email"
                            className="mt-1 block w-full"
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="phone_no" value="Phone number" />

                        <TextInput
                            id="phone_no"
                            value={data.phone_no}
                            onChange={(e) =>
                                setData("phone_no", e.target.value)
                            }
                            type="number"
                            className="mt-1 block w-full"
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="shop_name" value="Shop name" />

                        <TextInput
                            id="shop_name"
                            value={data.shop_name}
                            onChange={(e) =>
                                setData("shop_name", e.target.value)
                            }
                            type="text"
                            className="mt-1 block w-full"
                        />

                        <InputError
                            message={errors.shop_name}
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <InputLabel
                            htmlFor="shop_address"
                            value="Shop Address"
                        />

                        <TextInput
                            id="shop_address"
                            value={data.shop_address}
                            onChange={(e) =>
                                setData("shop_address", e.target.value)
                            }
                            type="text"
                            className="mt-1 block w-full"
                        />

                        <InputError
                            message={errors.shop_address}
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor="address" value="Seller Address" />

                        <TextInput
                            id="address"
                            value={data.address}
                            onChange={(e) => setData("address", e.target.value)}
                            type="text"
                            className="mt-1 block w-full"
                        />

                        <InputError message={errors.address} className="mt-2" />
                    </div>

                    <div className="flex items-center gap-4">
                        <PrimaryButton disabled={processing}>
                            {processing ? "Updating" : "Update"}
                        </PrimaryButton>

                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-gray-600">Saved.</p>
                        </Transition>
                    </div>
                </form>
            </div>
        </section>
    );
}
