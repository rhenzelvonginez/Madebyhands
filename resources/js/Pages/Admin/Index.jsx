import AdminAuthenticatedLayout from "@/Layouts/AdminAuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { IoAnalyticsSharp } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { ImArrowUpRight } from "react-icons/im";
import { ImUser } from "react-icons/im";
import DefaultPicture from "../../assets/img/default_shop_profile.png";

import {
    BarChart,
    Bar,
    Rectangle,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { useState } from "react";
import Modal from "@/Components/Modal";
import ModalImage from "react-modal-image";
import { format } from "date-fns";

export default function Index({ auth }) {
    const {
        products,
        totalSellers,
        totalCustomer,
        monthlyCustomerReport,
        monthlyPaymentReport,
    } = usePage().props;

    const currentMonthCustomers =
        monthlyCustomerReport.length > 0
            ? monthlyCustomerReport[0].customers_count
            : 0;
    const currentMonthIncome =
        monthlyPaymentReport.length > 0
            ? monthlyPaymentReport[0].total_payments
            : 0;

    const previousMonthCustomers =
        monthlyCustomerReport.length > 1
            ? monthlyCustomerReport[1].customers_count
            : 0;
    const previousMonthIncome =
        monthlyPaymentReport.length > 1
            ? monthlyPaymentReport[1].total_payments
            : 0;

    const customerGrowth =
        previousMonthCustomers > 0
            ? ((currentMonthCustomers - previousMonthCustomers) /
                  previousMonthCustomers) *
              100
            : 0;
    const incomeGrowth =
        previousMonthIncome > 0
            ? ((currentMonthIncome - previousMonthIncome) /
                  previousMonthIncome) *
              100
            : 0;

    const data = monthlyCustomerReport.map((item, index) => ({
        name: format(new Date(item.month), "MMMM yyyy"),
        users: item.customers_count,
        sales: parseFloat(monthlyPaymentReport[index]?.total_payments) || 0,
    }));

    // Formatter function for tooltip
    const formatTooltipValue = (value) => {
        return value.toLocaleString();
    };

    console.log(data);

    return (
        <>
            <AdminAuthenticatedLayout user={auth.user}>
                <Head title="Admin - Dashboard" />

                <div className="flex gap-4 flex-col">
                    {/* bar chart container */}
                    <div className="flex gap-2 bg-[#222222] w-full p-6 text-slate-50 rounded-xl drop-shadow">
                        <div>
                            <h1 className="tracking-widest">INCOMES</h1>
                            <div className="py-4">
                                <h1 className="font-thin flex gap-1 items-center tracking-widest">
                                    <IoAnalyticsSharp />
                                    This Month
                                </h1>
                                <p className="font-bold text-3xl">
                                    Php{" "}
                                    {parseFloat(
                                        currentMonthIncome
                                    ).toLocaleString()}
                                </p>
                                <small
                                    className={`flex gap-1 items-center ${
                                        incomeGrowth >= 0
                                            ? "text-green-400"
                                            : "text-red-400"
                                    }`}
                                >
                                    <ImArrowUpRight
                                        className={
                                            incomeGrowth < 1
                                                ? "rotate-[180deg]"
                                                : ""
                                        }
                                    />
                                    {incomeGrowth.toFixed(2)}%
                                </small>
                            </div>
                            <div className="py-4 border-t-2 border-slate-700">
                                <h1 className="font-thin flex gap-1 items-center tracking-widest">
                                    <ImUser />
                                    New Customer
                                    {currentMonthCustomers >= 1 ? "" : "s"}
                                </h1>
                                <p className="font-bold text-3xl">
                                    {currentMonthCustomers.toLocaleString()}{" "}
                                    Customer
                                    {currentMonthCustomers >= 1 ? "" : "s"}
                                </p>
                                <small
                                    className={`flex gap-1 items-center ${
                                        customerGrowth >= 0
                                            ? "text-green-400"
                                            : "text-red-400"
                                    }`}
                                >
                                    <ImArrowUpRight
                                        className={
                                            customerGrowth < 1
                                                ? "rotate-[180deg]"
                                                : ""
                                        }
                                    />{" "}
                                    {customerGrowth.toFixed(2)}%
                                </small>
                            </div>
                        </div>
                        <div className="flex-1">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    width={700}
                                    height={280}
                                    data={data}
                                    margin={{
                                        top: 5,
                                        right: 5,
                                        left: 5,
                                        bottom: 5,
                                    }}
                                >
                                    <YAxis yAxisId="left" />
                                    <XAxis dataKey="name" />
                                    <YAxis
                                        yAxisId="right"
                                        orientation="right"
                                    />
                                    <Tooltip
                                        wrapperStyle={{
                                            backgroundColor: "#443434",
                                            color: "black",
                                        }}
                                        formatter={(value) =>
                                            formatTooltipValue(value)
                                        } // Format tooltip values
                                    />
                                    <Legend />
                                    <Bar
                                        yAxisId="left"
                                        barSize={15}
                                        dataKey="users"
                                        fill="#D9D9D9"
                                    />
                                    <Bar
                                        yAxisId="right"
                                        barSize={15}
                                        dataKey="sales"
                                        fill="#676767"
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="gap-4 flex flex-col lg:flex-row">
                        {/* top selling product container */}
                        <div className="p-6 rounded-xl bg-[#EDEDED]  w-full lg:w-[60%]">
                            <h1 className="font-semibold">
                                Top Selling Products
                            </h1>

                            <div className="mt-2 flex gap-5 flex-col">
                                {products.data.map((product) => (
                                    <div
                                        key={product.id}
                                        className="flex gap-4 items-center"
                                    >
                                        <ModalImage
                                            className="w-10 h-10 object-cover"
                                            small={
                                                product.images.length == 0
                                                    ? DefaultPicture
                                                    : product.images[0]
                                                          .image_path
                                            }
                                            large={
                                                product.images.length == 0
                                                    ? DefaultPicture
                                                    : product.images[0]
                                                          .image_path
                                            }
                                            alt="product_img"
                                        />
                                        <h1>{product.product_name}</h1>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* sellers and customer count container */}
                        <div className="flex gap-4 flex-col w-full lg:w-[40%] ">
                            <div className="p-6 rounded-xl text-center w-full  text-white bg-[#FFA800]">
                                <div className=" flex items-center justify-center gap-6">
                                    <FaUsers size={80} />
                                    <div>
                                        <strong className=" text-4xl">
                                            {totalSellers}
                                        </strong>
                                        <div>
                                            Seller
                                            {totalSellers === 1 ? "" : "s"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 rounded-xl text-center w-full text-white bg-[#FF7575]">
                                <div className="flex items-center justify-center gap-6">
                                    <FaUser size={60} />
                                    <div>
                                        <strong className=" text-4xl">
                                            {totalCustomer}
                                        </strong>
                                        <div>
                                            Customer
                                            {totalCustomer === 1 ? "" : "s"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AdminAuthenticatedLayout>
        </>
    );
}
