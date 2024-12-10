import { useEffect, useRef, useState } from "react";

const TextArea = ({ value, onChange, placeholder }) => {
    const [textareaValue, setTextareaValue] = useState(value || "");
    const textareaRef = useRef(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto"; // Reset height
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set height based on scrollHeight
        }
    }, [textareaValue]);

    const handleChange = (event) => {
        setTextareaValue(event.target.value);
        if (onChange) {
            onChange(event);
        }
    };

    return (
        <textarea
            ref={textareaRef}
            value={textareaValue}
            onChange={handleChange}
            placeholder={placeholder}
            className="resize-none overflow-hidden px-3 w-full py-2 border rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        />
    );
};

export default TextArea;
