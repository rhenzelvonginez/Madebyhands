import React from 'react';

const ShippingRatesInput = ({ label, value, onChange, error, name }) => {
    return (
        <div>
            <label className="block font-medium text-gray-700">{label}</label>
            <input
                type="number"
                name={name}
                value={value}
                onChange={onChange}
                className="w-full px-4 py-2 border rounded-md"
            />
            {error && <div className="text-red-500">{error}</div>}
        </div>
    );
};

export default ShippingRateInput;
