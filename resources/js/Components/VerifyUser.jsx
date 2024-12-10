import { router, useForm } from "@inertiajs/react";
import { toast } from "react-toastify";
import SelectInput from "./SelectInput";
import InputError from "./InputError";
import TextArea from "./TextArea";
import { useEffect, useState } from "react";
import SpinnerLoading from "./SpinnerLoading";

export default function VerifyUser({ id, status, verified_at, onClose }) {
    const { errors, data, setData } = useForm({
        is_verified: status,
        message: "",
        verified_at: verified_at,
    });

    const closeModal = (e) => {
        e.preventDefault();
        onClose();
    };
    const [processing, setProcessing] = useState(false);

    const submit = (e) => {
        e.preventDefault();

        router.put(route("admin.update.seller.status", id), data, {
            onProgress: () => {
                setProcessing(true);
            },
            onSuccess: () => {
                setProcessing(false), onClose();
            },
            onError: () => {
                toast.error("Something went wrong"), setProcessing(false);
            },
        });
    };

    return (
        <>
            <div className="fixed top-0 left-0 w-full z-10 h-full bg-opacity-25 backdrop-blur-md flex justify-start bg-gray-900">
                <div className="bg-white h-fit mt-10 rounded-lg px-6 py-4 overflow-hidden shadow-lg w-full md:max-w-md mx-auto">
                    <form onSubmit={submit}>
                        <h2 className="text-center"> Seller Status</h2>
                        <div>
                            <label className="mr-2">Change status</label>
                            <SelectInput
                                className="my-2"
                                defaultValue={status === 0 ? "0" : "1"}
                                onChange={(e) =>
                                    setData("is_verified", e.target.value)
                                }
                            >
                                <option className="text-slate-900" value="0">
                                    Not Verified
                                </option>
                                <option className="text-slate-900" value="1">
                                    Verified
                                </option>
                            </SelectInput>
                        </div>

                        {errors.is_verified && (
                            <InputError
                                message={errors.is_verified}
                                className="mt-1"
                            />
                        )}
                        {status && data.is_verified == 1 ? (
                            <p className="m-2 py-2 text-sm bg-green-200 text-green-900 text-center">
                                This account is currently <b>VERIFIED</b>. If
                                you wish to unverify this account, please
                                provide a reason for doing so by adding a
                                message below after changing the status to
                                unverified.
                            </p>
                        ) : (
                            ""
                        )}

                        {data.is_verified == 0 && (
                            <div className="flex flex-col gap-1">
                                <p className="px-2 py-1 rounded-md bg-green-200 text-green-900 text-sm text-center">
                                    Does the seller require any revisions to
                                    their requirements? Add your message below.
                                </p>
                                <div className="w-full mt-2">
                                    <TextArea
                                        value={data.message}
                                        onChange={(e) =>
                                            setData("message", e.target.value)
                                        }
                                        className="mt-1 w-full"
                                        placeholder="Enter your message here..."
                                    />
                                    <InputError
                                        message={errors.message}
                                        className="mt-1"
                                    />
                                </div>
                            </div>
                        )}

                        <div className="flex gap-2 pt-2 items-center justify-end mt-2 border-t-2 ">
                            <button
                                className="text-red-800 border-2 hover:bg-red-800 hover:text-white border-red-800 px-2 py-1 rounded"
                                onClick={closeModal}
                            >
                                Cancel
                            </button>

                            <button
                                className="bg-blue-800 text-white px-2 py-1 rounded"
                                type="submit"
                                disabled={
                                    processing ||
                                    (data.is_verified == "1" && status == "1")
                                }
                            >
                                {processing ? (
                                    <div className="flex items-center gap-1">
                                        Processing <SpinnerLoading />
                                    </div>
                                ) : (
                                    "Update"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
