export default function FinanceIncomeStatement({ weekly, monthly }) {
    return (
        <>
            <div className="container mx-auto p-4">
                <h2 className=" font-semibold ">
                    Weekly Sales Reports (3 Weeks)
                </h2>
                {weekly && weekly.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                            <thead>
                                <tr className="w-full bg-gray-100 border-b border-gray-200">
                                    <th className="py-2 px-4 text-left text-gray-600">
                                        Total Sales
                                    </th>
                                    <th className="py-2 px-4 text-left text-gray-600">
                                        Total Orders
                                    </th>
                                    <th className="py-2 px-4 text-left text-gray-600">
                                        Report Date
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {weekly.map((report) => (
                                    <tr
                                        key={report.id}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="py-2 px-4 border-b border-gray-200">
                                            PHP{" "}
                                            {parseFloat(
                                                report.total_sales
                                            ).toLocaleString()}
                                        </td>
                                        <td className="py-2 px-4 border-b border-gray-200">
                                            {report.total_orders}
                                        </td>
                                        <td className="py-2 px-4 border-b border-gray-200">
                                            {new Date(
                                                report.report_date
                                            ).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="bg-white border mt-2 border-gray-200 rounded-lg shadow-md p-4 text-center text-gray-600">
                        <p>No sales reports available.</p>
                    </div>
                )}
            </div>
            <div className="container  mx-auto p-4">
                <h2 className=" font-semibold ">
                    Monthly Sales Reports (3 Months)
                </h2>
                {monthly && monthly.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                            <thead>
                                <tr className="w-full bg-gray-100 border-b border-gray-200">
                                    <th className="py-2 px-4 text-left text-gray-600">
                                        Total Sales
                                    </th>
                                    <th className="py-2 px-4 text-left text-gray-600">
                                        Total Orders
                                    </th>
                                    <th className="py-2 px-4 text-left text-gray-600">
                                        Report Date
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {monthly.map((report) => (
                                    <tr
                                        key={report.id}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="py-2 px-4 border-b border-gray-200">
                                            PHP{" "}
                                            {parseFloat(
                                                report.total_sales
                                            ).toLocaleString()}
                                        </td>
                                        <td className="py-2 px-4 border-b border-gray-200">
                                            {report.total_orders}
                                        </td>
                                        <td className="py-2 px-4 border-b border-gray-200">
                                            {new Date(
                                                report.report_date
                                            ).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="bg-white border mt-2 border-gray-200 rounded-lg shadow-md p-4 text-center text-gray-600">
                        <p>No sales reports available.</p>
                    </div>
                )}
            </div>
        </>
    );
}
