import { useForm } from '@inertiajs/react';

function ReportModal({ productId, isReportModalVisible, onClose }) {
    const { data, setData, post, reset, errors } = useForm({
        product_id: productId,
        reason: '',
        details: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (data.reason === 'Other' && data.details.trim() === '') {
            alert('Please specify the reason in the details field.');
            return;
        }
        post('/reports', {
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };
    return (
        isReportModalVisible && (
            <div className="fixed inset-0 bg-slate-800 bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
                    <h3 className="text-lg font-semibold mb-4">Why are you reporting this product?</h3>
                    <p className="text-sm text-gray-600 mb-3">
                        Please select a reason below and provide additional details to help us understand the issue better.
                    </p>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="reason"
                                        value="Misleading information"
                                        onChange={(e) => setData('reason', e.target.value)}
                                        className="mr-2"
                                    />
                                    Misleading information
                                </label>
                            </div>
                            <div>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="reason"
                                        value="Prohibited item"
                                        onChange={(e) => setData('reason', e.target.value)}
                                        className="mr-2"
                                    />
                                    Prohibited item
                                </label>
                            </div>
                            <div>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="reason"
                                        value="Counterfeit product"
                                        onChange={(e) => setData('reason', e.target.value)}
                                        className="mr-2"
                                    />
                                    Counterfeit product
                                </label>
                            </div>
                            <div>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="reason"
                                        value="Offensive content"
                                        onChange={(e) => setData('reason', e.target.value)}
                                        className="mr-2"
                                    />
                                    Offensive content
                                </label>
                            </div>
                            <div>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="reason"
                                        value="Pricing issue"
                                        onChange={(e) => setData('reason', e.target.value)}
                                        className="mr-2"
                                    />
                                    Pricing issue
                                </label>
                            </div>
                            <div>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="reason"
                                        value="Poor quality/damaged item"
                                        onChange={(e) => setData('reason', e.target.value)}
                                        className="mr-2"
                                    />
                                    Poor quality/damaged item
                                </label>
                            </div>
                            <div>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="reason"
                                        value="Fraudulent seller"
                                        onChange={(e) => setData('reason', e.target.value)}
                                        className="mr-2"
                                    />
                                    Fraudulent seller
                                </label>
                            </div>
                            <div>
                                <label className="flex items-center mb-2">
                                    <input
                                        type="radio"
                                        name="reason"
                                        value="Other"
                                        onChange={(e) => setData('reason', e.target.value)}
                                        className="mr-2"
                                    />
                                    Other (please specify)
                                </label>
                                {data.reason === 'Other' && (
                                    <div>
                                        <textarea
                                            value={data.details}
                                            onChange={(e) => setData('details', e.target.value)}
                                            placeholder="Provide additional details..."
                                            className="w-full p-2 border rounded"
                                            maxLength={300}
                                        />
                                        <label className="text-sm font-medium text-slate-500">
                                            {data.details.length}/300
                                        </label>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="mt-4 flex justify-end space-x-2">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 bg-gray-200 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-500 text-white rounded"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    );
}

export default ReportModal;
