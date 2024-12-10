import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
                manjari: ["Manjari", "sans-serif"],
                karla: ["Karla", "sans-serif"],
            },
            backgroundColor: {
                footer: "#222222",
                header: "#FFC8A9",
                secondaryColor: "#FF914D",
                thirdColor: "#222222",
                themeColor: "#FF914D",
            },
            textColor: {
                mainText: "#403E3E",
                themeColor: "#FF914D",
            },
            borderColor: {
                themeColor: "#FF914D",
            },
        },
    },

    plugins: [
        forms,
        require("@tailwindcss/aspect-ratio"),
        require("@tailwindcss/typography"),
    ],
};
