import SellerAuthenticatedLayout from "@/Layouts/SellerAuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";

export default function WalletTransactionList({ auth }) {
    const { walletTransactions } = usePage().props;
    return (
        <>
            <SellerAuthenticatedLayout
                user={auth}
                notificationCount={auth.notificationCount}
            >
                <Head title="WalletTransactionList" />
                <div className="p-6 bg-white shadow-lg w-full rounded-lg lg:max-w-xl lg:mx-auto">
                    <h1 className="font-semibold text-xl text-gray-800 mb-4">
                        Wallet Transactions
                    </h1>
                    <div className="space-y-2">
                        {walletTransactions.length == 0
                            ? "No Wallet transaction yet."
                            : walletTransactions.map((transaction) => (
                                  <div
                                      key={transaction.id}
                                      className="bg-slate-50 flex items-center justify-between border p-3 shadow-sm border-slate-200 rounded"
                                  >
                                      <div className="flex gap-1 flex-col">
                                          <small className="text-slate-500">
                                              Reference No.:
                                          </small>
                                          <span className="font-medium text-gray-900">
                                              {transaction.reference_number}
                                          </span>
                                      </div>
                                      <div className="flex gap-1 flex-col items-end">
                                          <span
                                              className={`font-medium p-1 capitalize ${
                                                  transaction.type ===
                                                  "withdrawal"
                                                      ? "bg-red-200 text-red-700"
                                                      : "bg-green-200 text-green-700"
                                              } rounded text-xs`}
                                          >
                                              {transaction.type ===
                                              "withdrawal_revert"
                                                  ? "withdrawal revert"
                                                  : transaction.type}
                                          </span>
                                          <span
                                              className={`font-medium ${
                                                  transaction.type ===
                                                  "withdrawal"
                                                      ? "text-red-600"
                                                      : "text-green-600"
                                              }`}
                                          >
                                              {transaction.type === "withdrawal"
                                                  ? "-"
                                                  : "+"}{" "}
                                              ₱
                                              {new Intl.NumberFormat().format(
                                                  transaction.amount
                                              )}
                                          </span>
                                      </div>
                                  </div>
                              ))}
                    </div>
                </div>
            </SellerAuthenticatedLayout>
        </>
    );
}
