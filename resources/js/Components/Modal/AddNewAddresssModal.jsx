import { useState } from "react";
import Modal from "../Modal";
import { useEffect } from "react";
import InputLabel from "../InputLabel";
import InputError from "../InputError";
import { useForm } from "@inertiajs/react";

export default function AddNewAddresssModal({ isOpen, onClose }) {
    const [regions, setRegions] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [citiesMunicipalities, setCitiesMunicipalities] = useState([]);
    const [barangays, setBarangays] = useState([]);
    // for saving selection data
    const [selectedRegions, setSelectedRegions] = useState();
    const [selectedProvinces, setSelectedProvinces] = useState();
    const [selectedCitiesMunicipalities, setSelectedCitiesMunicipalities] = useState();
    const [selectedBarangays, setSelectedBarangays] = useState();

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

    return (
        <Modal show={isOpen} maxWidth="lg" onClose={onClose}>

            <div className="flex items-center justify-between mb-4">
                <h1 className="text-lg font-semibold">Add New Address</h1>
                <button
                    onClick={onClose}
                    type="button"
                    className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                >
                    Close
                </button>
            </div>
            <form>
                <div className="flex flex-col gap-3 sm:mt-0 md:mt-3 lg:mt-5 lg:gap-5 ">
                    <div className="w-full ">
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

                    <div className="w-full ">
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
                <div className="flex flex-col gap-3 mb-4 sm:mt-0 md:mt-3 lg:mt-5 lg:gap-5 ">
                    <div className="w-full ">
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

                    <div className="w-full ">
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
            </form>

        </Modal>
    );
}
