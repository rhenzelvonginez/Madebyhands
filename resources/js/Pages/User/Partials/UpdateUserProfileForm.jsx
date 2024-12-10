import { useRef, useState } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import DefaultUserIcon from "../../../assets/img/default_user_profile.png";

export default function UpdateUserProfileForm() {
    const user = usePage().props.auth.user;
    const [preview, setPreview] = useState(user.profile_picture_path || null);
    console.log(user);
    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        address: user.address,
        profile_picture: user.profile_picture_path,
        new_profile_picture: null,
        phone_no: user.phone_no,
    });

    console.log("links is: ", data.profile_picture);

    const updateProfile = (e) => {
        e.preventDefault();
        // console.log("submitted data", data);
        post(route("user.update.info", data), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData("new_profile_picture", file);
            setPreview(URL.createObjectURL(file));
        }
    };

    return (
        <section className="bg-slate-50 shadow-lg p-6 rounded-md">
            <div className="max-w-3xl">
                <h2 className="text-lg font-medium text-gray-900">
                    Profile Information
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p>

                <form onSubmit={updateProfile} className="mt-6 space-y-6">
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
                                        ? `/storage${data.profile_picture}`
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
                        <InputLabel htmlFor="address" value="Address" />

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
