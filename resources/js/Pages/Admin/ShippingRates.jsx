import { useState } from "react";
import { useForm } from "@inertiajs/react";
import AdminAuthenticatedLayout from "@/Layouts/AdminAuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { HiPencilSquare } from "react-icons/hi2";
import { BsTrash2Fill } from "react-icons/bs";
import TextInput from "@/Components/TextInput";
import ShippingRateInput from "@/Components/ShippingRatesInput";

export default function ShippingRates({ auth }) {
    const { shipping_data } = usePage().props;
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedRate, setSelectedRate] = useState(null);
    const { data, setData, put, processing, errors } = useForm({
        weight_min: "",
        weight_max: "",
        ncr: "",
        luzon: "",
        visayas: "",
        mindanao: "",
        island: "",
    });

    const openModal = (rate) => {
        setSelectedRate(rate);
        setData(rate);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedRate(null);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        put(`/admin/shipping-rates/${selectedRate.id}`, {
            onSuccess: () => closeModal(),
        });
    };

    return (
        <>
            <AdminAuthenticatedLayout user={auth}>
                <Head title="Shipping Rates" />
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 font-medium text-left text-gray-600 border-b">
                                    Weight
                                </th>
                                <th className="px-6 py-3 font-medium text-left text-gray-600 border-b">
                                    NCR
                                </th>
                                <th className="px-6 py-3 font-medium text-left text-gray-600 border-b">
                                    Luzon
                                </th>
                                <th className="px-6 py-3 font-medium text-left text-gray-600 border-b">
                                    Visayas
                                </th>
                                <th className="px-6 py-3 font-medium text-left text-gray-600 border-b">
                                    Mindanao
                                </th>
                                <th className="px-6 py-3 font-medium text-left text-gray-600 border-b">
                                    Island
                                </th>
                                <th className="px-6 py-3 font-medium text-left text-gray-600 border-b">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {shipping_data
                                ? shipping_data.map((data) => (
                                    <tr
                                        key={data.id}
                                        className="transition-colors hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-3 text-gray-800 border-b whitespace-nowrap">
                                            {`${(data.weight_min * 1000).toFixed(0)}g (${data.weight_min}kg) - ${(data.weight_max * 1000).toFixed(0)}g (${data.weight_max}kg)`}
                                        </td>
                                        <td className="px-6 py-3 text-gray-800 border-b whitespace-nowrap">
                                            {`₱${data.ncr}`}
                                        </td>
                                        <td className="px-6 py-3 text-gray-800 border-b whitespace-nowrap">
                                            {`₱${data.luzon}`}
                                        </td>
                                        <td className="px-6 py-3 text-gray-800 border-b whitespace-nowrap">
                                            {`₱${data.visayas}`}
                                        </td>
                                        <td className="px-6 py-3 text-gray-800 border-b whitespace-nowrap">
                                            {`₱${data.mindanao}`}
                                        </td>
                                        <td className="px-6 py-3 text-gray-800 border-b whitespace-nowrap">
                                            {`₱${data.island}`}
                                        </td>
                                        <td className="px-6 py-3 text-gray-800 border-b whitespace-nowrap">
                                            <button
                                                className="p-2 mr-1 text-white duration-200 ease-in-out bg-blue-800 rounded hover:bg-blue-900"
                                                onClick={() => openModal(data)}
                                            >
                                                <HiPencilSquare />
                                            </button>
                                            <button
                                                type="button"
                                                className="p-2 text-white duration-200 ease-in-out bg-red-800 rounded hover:bg-red-900"
                                            >
                                                <BsTrash2Fill />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                                : (
                                    <tr>
                                        <td colSpan="7" className="text-center py-6">No data available.</td>
                                    </tr>
                                )}
                        </tbody>
                    </table>
                </div>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="w-full max-w-lg p-6 bg-white rounded-2xl shadow-lg">
                            <h2 className="text-xl font-bold">Edit Shipping Rate</h2>
                            <form onSubmit={handleUpdate} className="mt-4 ">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                                    <ShippingRateInput
                                        label="Weight Min(kg)"
                                        value={data.weight_min}
                                        onChange={(e) => setData("weight_min", e.target.value)}
                                        error={errors.weight_min}
                                        name="weight_min"
                                    />
                                    <ShippingRateInput
                                        label="Weight Max(kg)"
                                        value={data.weight_max}
                                        onChange={(e) => setData("weight_max", e.target.value)}
                                        error={errors.weight_max}
                                        name="weight_max"
                                    />
                                    <ShippingRateInput
                                        label="NCR"
                                        value={data.ncr}
                                        onChange={(e) => setData("ncr", e.target.value)}
                                        error={errors.ncr}
                                        name="ncr"
                                    />
                                    <ShippingRateInput
                                        label="Luzon"
                                        value={data.luzon}
                                        onChange={(e) => setData("luzon", e.target.value)}
                                        error={errors.luzon}
                                        name="luzon"
                                    />
                                    <ShippingRateInput
                                        label="Visayas"
                                        value={data.visayas}
                                        onChange={(e) => setData("visayas", e.target.value)}
                                        error={errors.visayas}
                                        name="visayas"
                                    />
                                    <ShippingRateInput
                                        label="Mindanao"
                                        value={data.mindanao}
                                        onChange={(e) => setData("mindanao", e.target.value)}
                                        error={errors.mindanao}
                                        name="mindanao"
                                    />
                                    <ShippingRateInput
                                        label="Island"
                                        value={data.island}
                                        onChange={(e) => setData("island", e.target.value)}
                                        error={errors.island}
                                        name="island"
                                    />
                                </div>
                                <div className="flex justify-end space-x-2 mt-5">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                                    >
                                        Update
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </AdminAuthenticatedLayout>
        </>
    );
}
