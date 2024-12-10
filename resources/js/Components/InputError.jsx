export default function InputError({ message, className = "", ...props }) {
    return message ? (
        <p
            {...props}
            className={
                "text-xs text-red-600 w-fit bg-red-50 p-1 rounded " + className
            }
        >
            {message}
        </p>
    ) : null;
}
