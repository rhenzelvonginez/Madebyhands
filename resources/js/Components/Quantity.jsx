import { useState, useEffect } from "react";

export default function Quantity({ quantity, currentStock, onQuantityChange }) {
    const [currentQuantity, setCurrentQuantity] = useState(quantity);

    const handleAdd = () => {
        if (currentQuantity < currentStock) {
            const newQuantity = currentQuantity + 1;
            setCurrentQuantity(newQuantity);
            onQuantityChange(newQuantity);
        }
    };

    const handleSubtract = () => {
        if (currentQuantity > 1) {
            const newQuantity = currentQuantity - 1;
            setCurrentQuantity(newQuantity);
            onQuantityChange(newQuantity);
        }
    };

    // useEffect(() => {
    //     console.log("Current Quantity:", currentQuantity);
    // }, [currentQuantity]);

    return (
        <>
            <strong className="text-md">Quantity:</strong>
            <div className="flex items-center text-white">
                <button
                    type="button"
                    className="bg-thirdColor rounded-l-xl font-bold py-2 px-4 rounded focus:outline-none focus:ring-2"
                    onClick={handleSubtract}
                    disabled={currentQuantity === 1}
                >
                    -
                </button>
                <span className="text-lg bg-thirdColor py-1 mx-1 px-4 font-semibold">
                    {currentQuantity}
                </span>
                <button
                    type="button"
                    className="bg-thirdColor rounded-r-xl font-bold py-2 px-4 rounded focus:outline-none focus:ring-2"
                    onClick={handleAdd}
                    disabled={currentQuantity === currentStock}
                >
                    +
                </button>
            </div>
        </>
    );
}
