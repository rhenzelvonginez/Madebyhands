import { useEffect, useState } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import GuestFooter from "@/Layouts/GuestFooter";
import axios from "axios";
import RegisterLayout from "@/Layouts/RegisterLayout";

export default function Register() {
    const { flash } = usePage().props;
    const { data, setData, post, processing, errors, reset, setError } = useForm({
        first_name: "",
        last_name: "",
        address: "",
        phone_no: "",
        email: "",
        password: "",
        password_confirmation: "",
        region: "",
        province: "",
        city_municipality: "",
        barangay: "",
        full_address: "",
    });
    useEffect(() => {
        setData('full_address', `${data.barangay}, ${data.city_municipality}, ${data.province}, ${data.region}`)
    }, [data.region, data.province, data.city_municipality, data.barangay])
    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);



    const [regions, setRegions] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [citiesMunicipalities, setCitiesMunicipalities] = useState([]);
    const [barangays, setBarangays] = useState([]);
    // for saving selection data
    const [selectedRegions, setSelectedRegions] = useState();
    const [selectedProvinces, setSelectedProvinces] = useState();
    const [selectedCitiesMunicipalities, setSelectedCitiesMunicipalities] = useState();
    const [selectedBarangays, setSelectedBarangays] = useState();

    useEffect(() => {
        // Fetch Regions
        axios
            .get("https://psgc.cloud/api/regions")
            .then((res) => setRegions(res.data))
            .catch((err) => console.log("Error fetching regions:", err));
    }, []);

    useEffect(() => {
        // Fetch Provinces based on selected Region
        if (data.region) {
            axios
                .get(`https://psgc.cloud/api/regions/${data.region}/provinces`)
                .then((res) => setProvinces(res.data))
                .catch((err) => console.log("Error fetching provinces:", err));
        } else {
            setProvinces([]);
        }
    }, [selectedRegions]);

    useEffect(() => {
        // Fetch Cities/Municipalities based on selected Province
        if (data.province) {
            axios
                .get(
                    `https://psgc.cloud/api/provinces/${data.province}/cities-municipalities`
                )
                .then((res) => setCitiesMunicipalities(res.data))
                .catch((err) =>
                    console.log("Error fetching cities/municipalities:", err)
                );
        } else {
            setCitiesMunicipalities([]);
        }
    }, [selectedProvinces]);

    useEffect(() => {
        // Fetch Barangays based on selected City/Municipality
        if (data.city_municipality) {
            axios
                .get(
                    `https://psgc.cloud/api/cities-municipalities/${data.city_municipality}/barangays`
                )
                .then((res) => setBarangays(res.data))
                .catch((err) => console.log("Error fetching barangays:", err));
        } else {
            setBarangays([]);
        }
    }, [selectedCitiesMunicipalities]);

    const submit = (e) => {
        e.preventDefault();
        try {
            if (!data.region || !data.province || !data.city_municipality || !data.barangay) {
                setError({
                    region: !data.region ? "Region is required." : undefined,
                    province: !data.province ? "Province is required." : undefined,
                    city_municipality: !data.city_municipality
                        ? "City/Municipality is required."
                        : undefined,
                    barangay: !data.barangay ? "Barangay is required." : undefined,
                });
                return;
            }
            // return console.log('submitted data', data)
            // If no errors, submit the form
            post(route("register"));
        } catch (error) {
            console.log(error)
        }

    };
    return (
        <>
            <RegisterLayout>
                <Head title="Register" />
                <h1 className="py-4 text-3xl font-bold uppercase text-mainText">
                    Create account
                </h1>
                <form onSubmit={submit} className="w-full">
                    {/* Name Fields */}
                    <div className="flex flex-col gap-3 sm:mt-3 md:mt-2 lg:gap-5 md:flex-row">
                        <div className="w-full md:w-1/2">
                            <InputLabel htmlFor="fname" value="First name" />

                            <TextInput
                                id="fname"
                                name="first_name"
                                value={data.first_name}
                                className="block w-full mt-1"
                                autoComplete="first_name"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("first_name", e.target.value)
                                }
                                required
                            />

                            <InputError
                                message={errors.first_name}
                                className="mt-2"
                            />
                        </div>
                        <div className="w-full md:w-1/2">
                            <InputLabel htmlFor="lname" value="Last name" />

                            <TextInput
                                id="lname"
                                name="last_name"
                                value={data.last_name}
                                className="block w-full mt-1"
                                autoComplete="last_name"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("last_name", e.target.value)
                                }
                                required
                            />

                            <InputError message={errors.lname} className="mt-2" />
                        </div>
                    </div>
                    {/* email number */}
                    <div className="flex flex-col gap-3 sm:mt-0 md:mt-3 lg:mt-5 lg:gap-5 md:flex-row">
                        <div className="w-full md:w-1/2">
                            <InputLabel htmlFor="email" value="Email" />

                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="block w-full mt-1"
                                autoComplete="username"
                                onChange={(e) => setData("email", e.target.value)}
                                required
                            />

                            <InputError message={errors.email} className="mt-2" />
                        </div>
                        <div className="w-full md:w-1/2">
                            <InputLabel htmlFor="phone_no" value="Phone Number" />

                            <TextInput
                                id="phone_no"
                                type="number"
                                name="phone_no"
                                value={data.phone_no}
                                className="block w-full mt-1"
                                autoComplete="username"
                                onChange={(e) =>
                                    setData("phone_no", e.target.value)
                                }
                                required
                            />

                            <InputError
                                message={errors.phone_no}
                                className="mt-2"
                            />
                        </div>
                    </div>
                    {/* password */}
                    <div className="flex flex-col gap-3 sm:mt-0 md:mt-3 lg:mt-5 lg:gap-5 md:flex-row">
                        <div className="w-full md:w-1/2">
                            <InputLabel htmlFor="password" value="Password" />

                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="block w-full mt-1"
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
                        <div className="w-full md:w-1/2">
                            <InputLabel
                                htmlFor="password_confirmation"
                                value="Confirm Password"
                            />

                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="block w-full mt-1"
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData("password_confirmation", e.target.value)
                                }
                                required
                            />

                            <InputError
                                message={errors.password_confirmation}
                                className="mt-2"
                            />
                        </div>
                    </div>
                    {/* Address Fields */}
                    <div className="flex flex-col gap-3 sm:mt-0 md:mt-3 lg:mt-5 lg:gap-5 md:flex-row">
                        <div className="w-full md:w-1/2">
                            <InputLabel htmlFor="region" value="Region" />
                            <select
                                id="region"
                                value={selectedRegions}
                                onChange={(e) => {
                                    setSelectedRegions(e.target.value);
                                    setData(
                                        "region",
                                        regions.find((region) => region.code === e.target.value)?.name
                                    );
                                }}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            >
                                <option value="">Select Region</option>
                                {regions.map((region) => (
                                    <option key={region.code} value={region.code}>
                                        {region.name}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.region} className="mt-2" />
                        </div>

                        <div className="w-full md:w-1/2">
                            <InputLabel htmlFor="province" value="Province" />
                            <select
                                id="province"
                                value={selectedProvinces}
                                onChange={(e) => {
                                    setSelectedProvinces(e.target.value);
                                    setData(
                                        "province",
                                        provinces.find((province) => province.code === e.target.value)?.name
                                    );
                                }}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            >
                                <option value="">Select Province</option>
                                {provinces.map((province) => (
                                    <option
                                        key={province.code}
                                        value={province.code}
                                    >
                                        {province.name}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.province} className="mt-2" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 mb-4 sm:mt-0 md:mt-3 lg:mt-5 lg:gap-5 md:flex-row">
                        <div className="w-full md:w-1/2">
                            <InputLabel
                                htmlFor="city_municipality"
                                value="City/Municipality"
                            />
                            <select
                                id="city_municipality"
                                value={selectedCitiesMunicipalities}
                                // onChange={(e) =>
                                //     setData("city_municipality", e.target.value)
                                // }
                                onChange={(e) => {
                                    setSelectedCitiesMunicipalities(e.target.value);
                                    setData(
                                        "city_municipality",
                                        citiesMunicipalities.find((city) => city.code === e.target.value)?.name
                                    );
                                }}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            >
                                <option value="">Select City/Municipality</option>
                                {citiesMunicipalities.map((city) => (
                                    <option key={city.code} value={city.code}>
                                        {city.name}
                                    </option>
                                ))}
                            </select>
                            <InputError
                                message={errors.city_municipality}
                                className="mt-2"
                            />
                        </div>

                        <div className="w-full md:w-1/2">
                            <InputLabel htmlFor="barangay" value="Barangay" />
                            <select
                                id="barangay"
                                value={selectedBarangays}
                                onChange={(e) => {
                                    setSelectedBarangays(e.target.value);
                                    setData(
                                        "barangay",
                                        barangays.find((brgy) => brgy.code === e.target.value)?.name
                                    );
                                }}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            >
                                <option value="">Select Barangay</option>
                                {barangays.map((barangay) => (
                                    <option key={barangay.code} value={barangay.code}>
                                        {barangay.name}
                                    </option>
                                ))}
                            </select>
                            <InputError
                                message={errors.barangay}
                                className="mt-2"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                        <Link
                            href={route("login")}
                            className="text-sm text-gray-600 underline hover:text-gray-900"
                        >
                            Already registered?
                        </Link>
                        <PrimaryButton disabled={processing}>Register</PrimaryButton>
                    </div>

                    <div className="flex items-center justify-center w-full pt-4 mt-6 text-sm border-t-2 border-gray-200">
                        <Link
                            href="/create-seller-account"
                            className="hover:text-slate-700 hover:font-medium"
                        >
                            Become a seller
                        </Link>
                    </div>
                </form>
            </RegisterLayout>
            <GuestFooter />
        </>
    );
}
