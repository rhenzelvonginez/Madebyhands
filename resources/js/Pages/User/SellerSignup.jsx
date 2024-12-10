import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import SpinnerLoading from "@/Components/SpinnerLoading";
import TextInput from "@/Components/TextInput";
import GuestFooter from "@/Layouts/GuestFooter";
import GuestLayout from "@/Layouts/GuestLayout";
import SellerGuestLayout from "@/Layouts/SellerGuestLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

export default function SellerSignup() {
    const { flash } = usePage().props;
    useEffect(() => {
        if (flash.message) {
            toast.error(flash.message);
        }
    }, [flash]);
    console.log(flash);
    const { data, processing, setData, errors, post, reset } = useForm({
        first_name: "",
        last_name: "",
        email: "",
        phone_no: "",
        address: "",
        password: "",
        password_confirmation: "",
        years_in_selling: "below 11 months",
        has_permit: false,
        has_dti: "",
        has_mayors_business_permit: "",
        has_paid_org_fee: "",
        has_barangay_clearance: "",
        has_bir: "",
    });

    // useEffect(() => {
    //     return () => {
    //         reset("password", "password_confirmation");
    //     };
    // }, []);

    const createSellerAccount = (e) => {
        e.preventDefault();
        post(route("create.seller"));
    };
    return (
        <>
            <ToastContainer />
            <SellerGuestLayout className="py-4 md:py-6 lg:py-8">
                <Head title="Become a seller" />
                <h1 className=" font-bold text-3xl text-center py-4  uppercase text-mainText">
                    Become a Seller
                </h1>
                <div className=" flex flex-col w-full">
                    <h1 className=" font-bold text-xl text-slate-800 py-2 border-b-2  border-gray-200 w-full">
                        Personal Details
                    </h1>
                    <form onSubmit={createSellerAccount} method="post">
                        <div className=" flex w-full flex-col lg:flex-row gap-2 mt-3">
                            <div className=" w-full">
                                <InputLabel
                                    htmlFor="fname"
                                    value="First name"
                                />
                                <TextInput
                                    id="fname"
                                    name="fname"
                                    value={data.first_name}
                                    className="mt-1 block w-full"
                                    autoComplete="first_name"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("first_name", e.target.value)
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.first_name}
                                    className="mt-1"
                                />
                            </div>
                            <div className=" w-full">
                                <InputLabel htmlFor="lname" value="Last name" />
                                <TextInput
                                    id="lname"
                                    name="lname"
                                    value={data.last_name}
                                    className="mt-1 block w-full"
                                    autoComplete="lname"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("last_name", e.target.value)
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.last_name}
                                    className="mt-1"
                                />
                            </div>
                        </div>
                        <div className="mt-4 flex w-full flex-col lg:flex-row gap-2">
                            <div className="w-full">
                                <InputLabel htmlFor="email" value="Email" />
                                <TextInput
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    autoComplete="email"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.email}
                                    className="mt-1"
                                />
                            </div>
                            <div className="w-full">
                                <InputLabel
                                    htmlFor="phone_no"
                                    value="Phone Number"
                                />
                                <TextInput
                                    type="text"
                                    id="phone_no"
                                    name="phone_no"
                                    value={data.phone_no}
                                    className="mt-1 block w-full"
                                    autoComplete="phone_no"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("phone_no", e.target.value)
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.phone_no}
                                    className="mt-1"
                                />
                            </div>
                        </div>
                        <div className="mt-4 flex w-full flex-col lg:flex-row gap-2">
                            <div className="w-full">
                                <InputLabel
                                    htmlFor="password"
                                    value="Password"
                                />

                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full"
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            </div>

                            <div className="w-full">
                                <InputLabel
                                    htmlFor="password_confirmation"
                                    value="Confirm Password"
                                />

                                <TextInput
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="mt-1 block w-full"
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        setData(
                                            "password_confirmation",
                                            e.target.value
                                        )
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.password_confirmation}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className=" w-full mt-4">
                            <InputLabel htmlFor="address" value="Address" />

                            <TextInput
                                id="address"
                                name="address"
                                value={data.address}
                                className="mt-1 block w-full"
                                autoComplete="address"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("address", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.address}
                                className="mt-1"
                            />
                        </div>
                        {/* select option */}
                        <div className=" mt-4">
                            <h1 className=" font-bold text-xl text-slate-800">
                                How many years have you been selling?
                            </h1>
                            <SelectInput
                                defaultValue={data.years_in_selling}
                                onChange={(e) =>
                                    setData("years_in_selling", e.target.value)
                                }
                            >
                                <option
                                    className="text-slate-900"
                                    value="below 11 months"
                                    defaultValue
                                >
                                    Below 11 months
                                </option>
                                <option
                                    className="text-slate-900"
                                    value="1 year"
                                >
                                    1 year
                                </option>
                                <option
                                    className="text-slate-900"
                                    value="2 years"
                                >
                                    2 years
                                </option>
                                <option
                                    className="text-slate-900"
                                    value="more than 3 year"
                                >
                                    more than 3 years
                                </option>
                            </SelectInput>
                            <InputError
                                message={errors.years_in_selling}
                                className="mt-1"
                            />
                        </div>
                        <div className="mt-4 flex flex-col lg:flex-row items-start w-full gap-2">
                            <div className=" w-full">
                                <h1 className=" font-bold text-xl text-slate-800 whitespace-nowrap">
                                    Do you have permit?
                                </h1>
                                <div className=" flex w-full items-center gap-2 mt-1">
                                    <Checkbox
                                        id="hasPermit"
                                        onChange={(e) =>
                                            setData(
                                                "has_permit",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <InputLabel
                                        className="cursor-pointer"
                                        value="Yes, I already have permit."
                                        htmlFor="hasPermit"
                                    />
                                </div>
                                <InputError
                                    message={errors.has_permit}
                                    className="mt-1"
                                />
                            </div>

                        </div>
                        <div className="mt-4">
                            <h1 className=" font-bold text-xl text-slate-800 whitespace-nowrap">
                                Check all the requirement if completed.
                            </h1>
                            <div className="flex flex-col lg:flex-row gap-0 lg:gap-4">
                                <div className="">
                                    <div className=" flex w-full items-center gap-2 mt-1">
                                        <Checkbox
                                            id="dti"
                                            onChange={(e) => {
                                                setData(
                                                    "has_dti",
                                                    e.target.value
                                                );
                                            }}
                                        />
                                        <InputLabel
                                            className="cursor-pointer"
                                            value="DTI"
                                            htmlFor="dti"
                                        />
                                    </div>
                                    <InputError
                                        message={errors.has_dti}
                                        className="mt-1"
                                    />
                                    <div className=" flex w-full items-center gap-2 mt-1">
                                        <Checkbox
                                            onChange={(e) => {
                                                setData(
                                                    "has_mayors_business_permit",
                                                    e.target.value
                                                );
                                            }}
                                            id="mayorsbusinesspermit"
                                        />
                                        <InputLabel
                                            className="cursor-pointer"
                                            value="Mayor's Business Permit"
                                            htmlFor="mayorsbusinesspermit"
                                        />
                                    </div>
                                    <InputError
                                        message={
                                            errors.has_mayors_business_permit
                                        }
                                        className="mt-1"
                                    />
                                    <div className=" flex w-full items-center gap-2 mt-1">
                                        <Checkbox
                                            id="paidOrganizationalFee"
                                            onChange={(e) => {
                                                setData(
                                                    "has_paid_org_fee",
                                                    e.target.value
                                                );
                                            }}
                                        />
                                        <InputLabel
                                            className="cursor-pointer"
                                            value="Paid Organizational Fee"
                                            htmlFor="paidOrganizationalFee"
                                        />
                                    </div>
                                    <InputError
                                        message={errors.has_paid_org_fee}
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <div className=" flex w-full items-center gap-2 mt-1">
                                        <Checkbox
                                            id="barangayClearance"
                                            onChange={(e) => {
                                                setData(
                                                    "has_barangay_clearance",
                                                    e.target.value
                                                );
                                            }}
                                        />
                                        <InputLabel
                                            className="cursor-pointer"
                                            value="Barangay Clearance"
                                            htmlFor="barangayClearance"
                                        />
                                    </div>
                                    <InputError
                                        message={errors.has_barangay_clearance}
                                        className="mt-1"
                                    />
                                    <div className=" flex w-full items-center gap-2 mt-1">
                                        <Checkbox
                                            id="BIRRegistration"
                                            onChange={(e) => {
                                                setData(
                                                    "has_bir",
                                                    e.target.value
                                                );
                                            }}
                                        />
                                        <InputLabel
                                            className="cursor-pointer"
                                            value="BIR Registration"
                                            htmlFor="BIRRegistration"
                                        />
                                    </div>
                                    <InputError
                                        message={errors.has_bir}
                                        className="mt-1"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className=" py-3 mt-4 flex items-center justify-start lg:justify-end gap-2 border-t-2 border-slate-200 w-full">
                            <Link
                                className="px-2  py-1 border-slate-500 text-slate-500 hover:bg-slate-500 duration-200 hover:text-white border rounded"
                                href="/"
                            >
                                Cancel
                            </Link>
                            <button
                                disabled={processing}
                                className=" px-2 py-1 duration-200 hover:bg-orange-600 text-white bg-themeColor rounded"
                                type="submit"
                            >
                                {" "}
                                {processing ? (
                                    <SpinnerLoading />
                                ) : (
                                    "Create an account"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </SellerGuestLayout>
            <GuestFooter></GuestFooter>
        </>
    );
}
