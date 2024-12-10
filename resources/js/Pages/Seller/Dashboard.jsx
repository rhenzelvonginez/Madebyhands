import SellerAuthenticatedLayout from "@/Layouts/SellerAuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { format } from "date-fns";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

export default function Dashboard({ auth }) {
    const {
        totalSold,
        totalProducts,
        products,
        newOrdersCount,
        toProcess,
        unpaid,
        isInTransit,
        cancelled,
        soldOut,
        monthlySales,
    } = usePage().props;

    const formatData = (data) => {
        return data.map((item) => ({
            ...item,
            total_sales: parseFloat(item.total_sales),
            report_date: format(new Date(item.report_date), "MMMM yyyy"),
        }));
    };

    // Formatter function for tooltip
    const formatTooltipValue = (value) => {
        return value.toLocaleString(); // Add commas to the number
    };
    const formattedData = formatData(monthlySales);
    return (
        <>
            <SellerAuthenticatedLayout
                notificationCount={auth.notificationCount}
            >
                <Head title="Seller - Dashboard" />

                <div className="flex flex-col lg:flex-row gap-4  mx-auto">
                    <div>
                        <div className="py-3 px-5 rounded-xl min-w-[15rem] bg-white drop-shadow-lg">
                            <h1 className="whitespace-nowrap mt-2 font-bold text-lg text-mainText">
                                To do List
                            </h1>
                            <small className="text-slate-400 mb-4 -my-2">
                                Things you need to deal with
                            </small>
                            <div className=" flex gap-4 flex-row mt-4 lg:flex-col overflow-y-auto">
                                <div className="flex gap-2 flex-col items-center rounded-xl p-4 bg-sky-50">
                                    <span className="text-themeColor">
                                        {toProcess}
                                    </span>
                                    <h2 className=" font-bold text-mainText text-center">
                                        To-Process Shipment
                                    </h2>
                                </div>
                                <div className="flex gap-2 flex-col items-center rounded-xl p-4 bg-sky-50">
                                    <span className="text-themeColor">
                                        {isInTransit}
                                    </span>
                                    <h2 className=" font-bold text-mainText text-center">
                                        Processed Shipment
                                    </h2>
                                </div>
                                <div className="flex gap-2 flex-col items-center rounded-xl p-4 bg-sky-50">
                                    <span className="text-themeColor">
                                        {unpaid}
                                    </span>
                                    <h2 className=" font-bold text-mainText text-center">
                                        Unpaid
                                    </h2>
                                </div>
                                <div className="flex gap-2 flex-col items-center rounded-xl p-4 bg-sky-50">
                                    <span className="text-themeColor">
                                        {cancelled}
                                    </span>
                                    <h2 className=" font-bold text-mainText text-center">
                                        Cancelled Orders
                                    </h2>
                                </div>
                                <div className="flex gap-2 flex-col items-center rounded-xl p-4 bg-sky-50">
                                    <span className="text-themeColor">
                                        {soldOut}
                                    </span>
                                    <h2 className=" font-bold text-mainText text-center">
                                        Sold Out Products
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=" w-full flex gap-4 flex-col">
                        <div className=" flex gap-6">
                            <div className="py-3 px-5 rounded-xl w-full bg-white drop-shadow-lg">
                                <small className="text-slate-700 text-base font-semibold">
                                    New orders
                                </small>
                                <h1 className=" text-2xl font-bold text-themeColor">
                                    {newOrdersCount}
                                </h1>
                            </div>
                            <div className="py-3 px-5 rounded-xl w-full bg-white drop-shadow-lg">
                                <small className="text-slate-700 text-base font-semibold">
                                    Total sold
                                </small>
                                <h1 className=" text-2xl font-bold text-themeColor">
                                    {totalSold}
                                </h1>
                            </div>
                            <div className="py-3 px-5 rounded-xl w-full bg-white drop-shadow-lg">
                                <small className="text-slate-700 text-base font-semibold">
                                    Products
                                </small>
                                <h1 className=" text-2xl font-bold text-themeColor">
                                    {totalProducts}
                                </h1>
                            </div>
                            {/* <div className="py-3 px-5 rounded-xl w-full bg-white drop-shadow-lg">
                                <small className="text-slate-700 text-base font-semibold">
                                    Total Review
                                </small>
                                <h1 className=" text-2xl font-bold text-themeColor">
                                    23
                                </h1>
                            </div> */}
                        </div>
                        <div className="py-3 px-5 rounded-xl w-full bg-white drop-shadow-lg">
                            <div>
                                <div className=" mb-1 flex flex-col">
                                    <small>Total Sales Revenue Per Month</small>
                                </div>
                            </div>
                            <div style={{ width: "100%", height: 300 }}>
                                <ResponsiveContainer>
                                    <AreaChart
                                        data={formattedData}
                                        margin={{
                                            top: 10,
                                            right: 30,
                                            left: 0,
                                            bottom: 0,
                                        }}
                                    >
                                        <defs>
                                            <linearGradient
                                                id="colorUv"
                                                x1="0"
                                                y1="0"
                                                x2="0"
                                                y2="1"
                                            >
                                                <stop
                                                    offset="5%"
                                                    stopColor="#8884d8"
                                                    stopOpacity={0.8}
                                                />
                                                <stop
                                                    offset="95%"
                                                    stopColor="#8884d8"
                                                    stopOpacity={0}
                                                />
                                            </linearGradient>
                                        </defs>
                                        <XAxis dataKey="report_date" />
                                        <YAxis
                                            domain={[0, "auto"]}
                                            tickFormatter={(value) =>
                                                value.toLocaleString()
                                            }
                                        />
                                        <Tooltip
                                            formatter={(value) =>
                                                formatTooltipValue(value)
                                            } // Format tooltip values
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="total_sales"
                                            stroke="#8884d8"
                                            strokeWidth={3}
                                            fill="url(#colorUv)"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        <div className="py-3 px-5 rounded-xl w-full bg-white drop-shadow-lg">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Product Image
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Product Name
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Price
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Status
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Date Created
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {products == null
                                            ? "No Product yet."
                                            : products.data.map((product) => (
                                                  <tr key={product.id}>
                                                      <td className="px-6 py-1 whitespace-nowrap">
                                                          <img
                                                              src={
                                                                  product
                                                                      .images[0]
                                                                      .image_path
                                                              }
                                                              alt="Product"
                                                              className="w-10 h-10 object-cover"
                                                          />
                                                      </td>
                                                      <td className="px-6 py-4 whitespace-nowrap">
                                                          {product.product_name}
                                                      </td>
                                                      <td className="px-6 py-4 whitespace-nowrap">
                                                          PHP{" "}
                                                          {new Intl.NumberFormat().format(
                                                              product.price
                                                          )}
                                                      </td>
                                                      <td className="px-6 py-4 whitespace-nowrap">
                                                          <span
                                                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full  ${
                                                                  product.is_verified
                                                                      ? "bg-green-100 text-green-800"
                                                                      : "bg-red-100 text-red-800"
                                                              }`}
                                                          >
                                                              {product.is_verified
                                                                  ? "Verified"
                                                                  : "Not Verified"}
                                                          </span>
                                                      </td>
                                                      <td className="px-6 py-4 whitespace-nowrap">
                                                          {format(
                                                              new Date(
                                                                  product.created_at
                                                              ),
                                                              "MMM d, yyyy h:mm a"
                                                          )}
                                                      </td>
                                                  </tr>
                                              ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </SellerAuthenticatedLayout>
        </>
    );
}
